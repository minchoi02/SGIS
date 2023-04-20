/**
 * 생활권역서비스 화면에 대한 클래스
 * 
 * history : 2020/06/16 초기 작성 version : 1.0 see : 원형(/js/interactive/interactiveMapApi.js)
 * 
 */
function closePopup3(searchWordId){
	var resultDiv = $('#spatialSearchWordDiv');
	var resultPageDiv = $('#spatialSearchWordDiv1Page');
	$(resultDiv).hide();
	$(resultPageDiv).hide();
	//$("#rstSearchDataDiv2").hide();
	//$("#rstSearchDataDiv2Page").hide();
}
(function(W, D) {
	W.$catchmentAreaLeftMenu = W.$catchmentAreaLeftMenu || {};

	$(document).ready(
		function() {
			var sidoNm, sggNm, emdongNm = "";

			$catchmentAreaLeftMenu.event.setUIEvent();		//UI에 사용되는 이벤트를 설정한다.
			//SGIS4_1027_생활권역 시작
			//$catchmentAreaLeftMenu.ui.setSido();
			$catchmentAreaLeftMenu.ui.setFirstAddress('25', '030', '60'); //(지역 selectBox 대전 서구 둔산 2동 설정)
			//SGIS4_1027_생활권역 끝
			
			//210416 지자체연계서비스 추가 시작
			//$catchmentAreaLeftMenu.ui.getLocation(); //현재위치 가져오기
			$catchmentAreaMain.ui.setParamMap(); //지자체연계서비스 관련 이벤트
			//210416 지자체연계서비스 추가 끝
			
			$("#schTypeGbA01").prop("checked", true);
			$("#schTypeGbB01").prop("checked", true);
			
			/*--------------------- 상세분석 개발(초기 설정) 시작 - 박상언(pse) ---------------------*/
			$catchmentAreaLeftMenu.ui.setSpatialSido();
			/*--------------------- 상세분석 개발(초기 설정) 끝 - 박상언(pse) ----------------------*/
			
			//통계 상세정보 설정
			$catchmentAreaLeftMenu.ui.settingGridScopeList();//격자통계조건 설정
			
			$catchmentAreaLeftMenu.ui.initializeUI("");
			
			$("#sido, #sido_spatial").change(function(e){	// 공통적인 selectBox에 대한 동작을 알고리즘 변경 - 박상언 2020-10-20 작성
				srvLogWrite('Q0','01','02','00',this.value,'');
				var isDetail = this.id === 'sido' ? false : true; 
				var sggDomId = !isDetail ? 'sigungu' : 'sgg_spatial';
				var emdDomId = !isDetail ? 'emdong' : 'emd_spatial';
				
				$catchmentAreaLeftMenu.ui.clearLocataionBox(sggDomId);
				$catchmentAreaLeftMenu.ui.clearLocataionBox(emdDomId);
				$catchmentAreaLeftMenu.ui.setSgg(this.value, isDetail);
				if(!isDetail){ sidoNm = $("#sido option:selected").text(); }
			});
			
			$("#sigungu, #sgg_spatial").change(function(){	// 공통적인 selectBox에 대한 동작을 알고리즘 변경 - 박상언 2020-10-20 작성
				var isDetail = this.id === 'sigungu' ? false : true;
				var emdDomId = !isDetail ? 'emdong' : 'emd_spatial';
				$catchmentAreaLeftMenu.ui.clearLocataionBox(emdDomId);
				
				if(this.value != '0'){
					var sidoCd   = $(this).prev().val();
					var sigunguCd = this.value.split("/")[0];					
					srvLogWrite('Q0','01','02','00',sidoCd.concat(sigunguCd),'');
					
					//var sidoCd= $("#sido option:selected").attr("value");
					$catchmentAreaLeftMenu.ui.setEmd(sidoCd, sigunguCd, isDetail);
					if(!isDetail){ sggNm = $("#sigungu option:selected").text(); }
					
					var x_coor = this.value.split("/")[1];
					var y_coor = this.value.split("/")[2];
					if(sidoCd == '31' && sigunguCd == '270'){
						x_coor = '969473.1111391311';
						y_coor = '1982022.5928528588';
					}
					
					var mapId		= !isDetail ? 0 : 1;
					$catchmentAreaLeftMenu.ui.mapMove(x_coor, y_coor, mapId);
				}
			});
			
			$("#emdong, #emd_spatial").change(function(){		// 공통적인 selectBox에 대한 동작을 알고리즘 변경 - 박상언 2020-10-20 작성
				if(this.value != '0'){
					var isDetail 	= this.id === 'emdong' ? false : true;
					var sidoNm_		= !isDetail ? sidoNm : $('#sido_spatial option:selected').text();
					var sggNm_ 		= !isDetail ? sggNm : $('#sgg_spatial option:selected').text();
					var emdongNm_ 	= !isDetail ? $("#emdong option:selected").text() : $('#sgg_spatial option:selected').text();
					var mapId		= !isDetail ? 0 : 1;
					
					$catchmentAreaLeftMenu.ui.mapMove(this.value.split("/")[1], this.value.split("/")[2], mapId);
					
					if(!isDetail){ 
						$catchmentAreaLeftMenu.ui.selectemdCd = this.value.split("/")[0];
						emdongNm = $("#emdong option:selected").text(); 
						//$catchmentAreaLeftMenu.ui.setLocation(sidoNm_, sggNm_, emdongNm_); //현재지도 위치 호출		// mapMove에서 처리되는 함수임. 주석처리 - 박상언 2020-10-20
						srvLogWrite('Q0','01','02','00',$("#sido, #sido_spatial").val().concat($("#sigungu, #sgg_spatial").val().split("/")[0],this.value.split("/")[0]),'');
					} else {
						//$catchmentAreaLeftMenu.ui.setLocation(sidoNm_, sggNm_, emdongNm_, true);
					}
				}
				
			});

			$("#searchWord").keydown(function(e){
				if(e.keyCode == 13){					
					$("#searchWordBtn").trigger("click");
				}
			});
			
			$("#searchWordBtn").click(function(){
				srvLogWrite('Q0','02','02','01',$("#searchWord").val(),'');
				if($("#searchWord").val().length != 0){
					//$catchmentAreaLeftMenu.ui.searchPlaceApi(true, 1);
					$catchmentAreaLeftMenu.ui.requestForPoiSearch('A', 'ngii', '');
				}else{
					$("#rstSearchDataDiv").hide();
					$("#rstSearchDataDiv1Page").hide();
				}				
			});
			
			$("#searchPoi").click(function(){
				if($("#searchPoi").hasClass("active")){
					$catchmentAreaLeftMenu.ui.useMarker = false;
					$("#searchPoi").removeClass("active");
					$('#mapRgn_1').removeClass('selMapIco');
				}else{
					var map = $catchmentAreaMain.ui.getMap();
						console.log(map.zoom);
					//$('html').css({'cursor':'url(/images/catchmentArea/h2_ico.png), auto'});
	//				$catchmentAreaLeftMenu.ui.creatPoiMarker();
	//				$(this).addClass('on');
					if(map.zoom == 0 || map.zoom == 1 || map.zoom == 2 || map.zoom == 3){
						caMessageAlert.open("알림", "현재 지도레벨에서는 정확한 지점 선택할 수 없습니다.<br/>지도를 확대한 다음 다시 지점을 선택해주세요.");
						return false;
					}else{
						$catchmentAreaLeftMenu.ui.useMarker = true;
						$("#searchPoi").addClass("active");
						$('#mapRgn_1').addClass('selMapIco');
					}
				}
			});		
			
			/*--------------------- 상세분석 개발(이벤트 매핑) 시작 - 박상언(pse) ---------------------*/
			$("#spatialSearchWord").keydown(function(e){
				if(e.keyCode == 13){
					$('#searchWordBtn_sp').trigger('click');
			    }
			});
			
			$("#searchWordBtn_sp").click(function(){
				if($("#spatialSearchWord").val().trim().length != 0){
		        	// 검색 한곳과 관련된 위치가 있는지 팝업으로 보여준다.
		            //$catchmentAreaLeftMenu.ui.searchSpatialPlaceApi(true, 1,"spatialSearchWord");
		            $catchmentAreaLeftMenu.ui.requestForPoiSearch('B', 'ngii', '');
		        }else{
		            $("#data_for_spatialSearchWord").hide();
		            $("#dataPage_for_spatialSearchWord").hide();
		        }		
			});

			// 2번 째 지도에 마커를 그려준다. ( = 지도 검색 )
			$("#searchPoi_spatial").click(function(e){
				e.preventDefault();	// 이미 href="javascript:void(0)"이 있긴 하지만 안전빵을 위해서 작성했다.

			    var map = $catchmentAreaMain.ui.getMap(1);	// 2번째 지도 정보를 읽어온다. 읽은 지도는 sMap 객체다.
			    
			    if(map.zoom <= 3){
			        caMessageAlert.open("알림", "현재 지도레벨에서는 정확한 지점 선택할 수 없습니다.<br/>지도를 확대한 다음 다시 지점을 선택해주세요.");
			        return;
			    } else {
			    	if($(this).hasClass('active')) {
			    		$catchmentAreaLeftMenu.ui.useMarker2 = false;
			    		$("#searchPoi_spatial").removeClass("active");
			    		$('#mapRgn_2').removeClass('selMapIco');
			    	} else {
			    		$catchmentAreaLeftMenu.ui.useMarker2 = true;
			    		$("#searchPoi_spatial").addClass("active");
			    		$('#mapRgn_2').addClass('selMapIco');
			    	}
			    }
			});
			
			/*--------------------- 상세분석 개발(이벤트 매핑) 끝 - 박상언(pse) ----------------------*/
			
			//상세분석 상관관계 : 선택 조건 추가 
			$("#pop08_add").click(function(){
				// 조건별 통계 보기 : 탭별(사업체/종사자는 각각)로 조건 1개씩 가능(= 총 5개)
				// 상관관계 : 탭 구분없이 총 4개 가능
				var limitCnt = 0;
				if($catchmentAreaLeftMenu.ui.whoisPop08sCaller == "thief"){
					limitCnt = 5;					
				}else if($catchmentAreaLeftMenu.ui.whoisPop08sCaller == "bully"){
					limitCnt = 4;					
				}

				if($("#pop08_select").children(".selc_box").size() >= limitCnt){
					caMessageAlert.open("알림", "최대 " + limitCnt + "개의 조건 선택이 가능합니다.");
					return false;
				}
				
				$catchmentAreaLeftMenu.ui.addSelectedCondition();
			});
			
			$("#schTypeGbA01,#schTypeGbB01").click(function(){
				srvLogWrite('Q0','02','01','00','행정구역','');	
			});
			$("#schTypeGbA02,#schTypeGbB02").click(function(){
				srvLogWrite('Q0','02','01','00','지도화면','');	
			});
			
			(function(){
				
				var statsBaseYear01 = $catchmentAreaMain.ui.statsBaseYear01;
				var statsBaseYear02 = $catchmentAreaMain.ui.statsBaseYear02;
				var statsBaseYear03 = $catchmentAreaMain.ui.statsBaseYear03;
				var concateStatsBaseYear = statsBaseYear01.concat(statsBaseYear02).concat(statsBaseYear03);
				
				var noDuplicate = concateStatsBaseYear.sort(function(a,b){ return b-a}).reduce(function(acc,current){
				    if(acc.indexOf(current) == -1) acc.push(current);
				    return acc; 
				}, []);
				
				var selectBox = $(document.querySelectorAll('#year_select1, #year_select2'));
				selectBox.empty();
				selectBox.append('<option value="">선택하세요</option>');
				noDuplicate.forEach(function(item,index){
				    selectBox.append('<option value="'+item+'">'+item+'</option>');
				});
			})();
			
			
			// 일부 메뉴 감추기 (임시용)
			// SGIS4_생활권역 시작
			/*
			$('#pops a.dep_btn01').removeClass('w51');
			$('#pops a.dep_btn01').addClass('w70');			
			$('#family a.dep_btn02').removeClass('w51');
			$('#family a.dep_btn02').addClass('w70');
			$('#house a.dep_btn03').removeClass('w51');
			$('#house a.dep_btn03').addClass('w70');			
			$('#copr a.dep_btn04').removeClass('w118');
			$('#copr a.dep_btn04').addClass('w137');
			*/
			// SGIS4_생활권역 끝
			$('#idlv a.dep_btn05').addClass('hiddenMem');
			
			$('#detailedAnal01 > a').removeClass('w118');
			$('#detailedAnal01 > a').addClass('w174');
			$('#detailedAnal02 > a').removeClass('w118');
			$('#detailedAnal02 > a').addClass('w174');
			$('#detailedAnal03 > a').addClass('hiddenMem');

			$('#gridSettingForDetail a.dep_btn01').removeClass('w51');
			$('#gridSettingForDetail a.dep_btn01').addClass('w70');			
			$('#gridSettingForDetail a.dep_btn02').removeClass('w51');
			$('#gridSettingForDetail a.dep_btn02').addClass('w70');
			$('#gridSettingForDetail a.dep_btn03').removeClass('w51');
			$('#gridSettingForDetail a.dep_btn03').addClass('w70');			
			$('#gridSettingForDetail a.dep_btn04').removeClass('w118');
			$('#gridSettingForDetail a.dep_btn04').addClass('w137');
			$('#gridSettingForDetail a.dep_btn05').addClass('hiddenMem');
			// 일부 메뉴 감추기 (임시용)
			
			
			$catchmentAreaLeftMenu.event.resizePopup();
			
			$('#menuButton').trigger('click');
			
			// SGIS4_생활권역 시작
			// jingle
			//$catchmentAreaLeftMenu.ui.reqSettingInfo("recmd");
			$catchmentAreaLeftMenu.ui.reqSettingInfo("lifeBiz");
			// SGIS4_생활권역 끝
			
			// SGIS4_1025_생활권역_임의영역 시작
			$catchmentAreaLeftMenu.ui.reqScopeInfo();
			// SGIS4_1025_생활권역_임의영역 끝
			
	});
	
	$catchmentAreaLeftMenu.ui = {
			
			selectSidoCd : "",
			selectSggCd : "",
			selectemdCd : "",
			selectCoordinate_x : "",
			selectCoordinate_y : "",
			selectCoordinate_x_2 : "",	// 박상언 2020-10-15 작성
			selectCoordinate_y_2 : "",	// 박상언 2020-10-15 작성
			selectAreaType : "",
			curLeftPage : "",			// 1:area, 2:sisul, 3:year, 4:statistics
			selMapLocTxt : "",
			selMapLocGb : "",			// A:주소, B:시설 ( 필요 없는 듯 .. )
			t_default : [],
			d_default : [],
			r_default : [],
			selectPolygonPointsArr : [],
			selectPolygonPointsArr2 : [],
			selectRangeArr : [],
			selectRangeArr2 : [],
			useMarker : false,
			useMarker2 : false,		// 화면이 반으로 갈라지면서 나뉠 때 우측에 있는 지도에서 지도 검색을 하기 위한 변수다. ( 박상언 2020-10-15 작성 )
			isFirstLoad : true,
			isFirstLoad2 : true,	// 속성 추가 - sop.portal.catchmentAreaEmdAllAddress.api 에서 지도가 분리되었을 때, 지도를 구별하기 위해 사용( 박상언 2020-10-13 작성 )
			officesMapping : {"11":"020", "21":"130", "22":"010", "23":"050", "24":"020", "25":"030", "26":"020", "29":"010", "31":"013", "32":"010", "33":"041", "34":"360", "35":"011", "36":"420", "37":"040", "38":"111", "39":"010"},
			map2SearchMarker: null,	// 속성 추가 - 지도 2에 마커가 그려져있는지 여부를 알기 위해서 속성 추가 - 박상언 2020-10-22 작성
			leftMenuToggleSave: "gridDataType01", 	// 속성 추가 - 영향권,격자,상세분석 토글버튼 선택시 선택했던 것을 기억하는 것이다 - 박상언 2020-10-22 작성
			gridMapRequestor : '',	// 속성 추가 - 지도에 격자 그려지는 때의 [ 격자 혹은 상세분석의 토글버튼 ] 중에서 어떤 것을 선택하는지를 보여준다. 
									// settingGridAreaMap 호출시에는 "grid", setSyncGrid 호출시에는 "detailAnalysis" 문자열을 저장한다.
									// 그리고 이 속성은 격자가 그려지면 해당 격자에 대한 클릭 이벤트에서 사용된다. 더 정확히는 catchmentAreaMain.js ==> didSelectedPolygon에서 쓰인다.
			boundarySize_1	 : 0,	// 격자를 그리기 전에 미리 지도에 그려진 도형의 면적(넓이)를 저장하는 변수다. 오직 기존지도(mapId = 0)에 도형이 그려질 때만 값이 할당되는 변수다. 절대로 다른 곳에서는 값이 할당되어서는 안된다. (gis.service.divisionVerifyRouteServiceAreaUsingOA.api => onSuccess 에서 할당)
			boundarySize_2	 : 0,	// 오직 새로운 지도(mapId = 1)에 도형이 그려질 때만 값이 할당되는 변수다.
			poiList0A : [],
			poiList0B : [],
			whoisPop08sCaller : "",		// (멀티선택)조건설정창의 호출자 : thief-영향권 특성별, bully-상관관계 분석
			map1PoiMarkerMap: {},		// 지도1 시설유형에 대한 마커
			map2PoiMarkerMap: {},		// 지도2 시설유형에 대한 마커
			
			// SGIS4_1025_생활권역_임의영역 시작
//			영역별 최대최소 설정정보 : [];
			rndmScopeInfo : [],
			rndmFlag : false,	//SGIS4_1028_생활권역
			// SGIS4_1025_생활권역_임의영역 끝
			
			/**
			 * 
			 * @name         : initializeUI
			 * @description  : 초기정보를 설정한다.
			 * 
			 */
			initializeUI : function(flag) {
				this.curLeftPage = "1";
//				this.map1PoiMarkerMap = {};
//				this.map1PoiMarkerMap.selMarker = null;
//				this.map2PoiMarkerMap = {};
//				this.map2PoiMarkerMap.selMarker = null;
				
				$('#gridSettingLess1k').hide();
				$('#gridSettingForDetailLess1k').hide();
				$('.mogb_chk.off.basic').trigger('click');
				$('.coprD_chk.on').trigger('click');
				// SGIS4_생활권역 시작
				//SGIS4_1025_생활권역 시작
				$('.search_wrap.statistics .chk_01 a[data-grdstat-type="tabFavorites"]').trigger('click');
				$('.search_wrap.statistics .chk_02 a[data-grdstat-type="tabAll"]').trigger('click');
				//SGIS4_1025_생활권역 끝
				// SGIS4_생활권역 끝
				
				// 상세조건(5세단위) 클릭 시작
				//SGIS4_생활권역 시작
//				$('.age_single_mem').attr('disabled', true);
//	    		$('.div_age_single5 > .age_single_chk.off').hide();
//	    		$('.div_age_single5 > .age_single_chk.on').show();
//	    		$('.div_age_single5 > .age_single_mem').attr('disabled', false);
//	    		$('.age_range_mem').attr('disabled', true);
//	    		$(".age_range_slider_mem").slider("disable");
				$('.div_age_single5 > .age_single_chk.off').trigger('click');
	    		//SGIS4_생활권역 끝	
	    		// 상세조건(5세단위) 클릭 끝
	    		// 상세조건(주택)
	    		$('.constYear_mem').attr('disabled', true);
	    		$('.houseBdspace_mem').attr('disabled', true);
	    		$(".houseBdspace_slider_mem").slider("disable");	    		
	    		// 상세조건(주택)
			},
			
			/**
			 * 
			 * @name         : clearUI
			 * @description  : 화면을 정리한다.
			 * 
			 */
			clearUI : function(pFlag) {
				// pFlag : 왼쪽메뉴의 화면 번호 (1-첫화면, 2-시설유형 목록 화면, 3-영역설정 화면, 4-통계 화면)
				
				this.selMapLocTxt = "";
				this.selMapLocGb = "";
				
				// 왼쪽 메뉴 화면의 주요 화면들은 모두 닫으므로, 표출할 화면은 이 함수 호출자에서 활성화
				$('.search_wrap').removeClass('active');							// 왼쪽 메뉴창 4개(area, sisul, year, statistics), spatial_sisul은 아래랑 겹치네..
				$('#date_search_box').removeClass('active');						// 연도설정 팝업창
				$('#spatial_position_search_box').removeClass('active');			// 상세분석 위치선택 팝업창
				$('#facilityTypeSearchDatail_for_spatial').removeClass('active');	// 상세분석 시설유형 선택 팝업창
				$('#detail_condition_select_box').removeClass('active');			// 상세분석 조건선택 팝업창
				$('#correlation_popup').removeClass('active');						// 멀티 조건선택 팝업창
				$('#detail_analysis_tab > li').removeClass('active');				// 상세분석 비교분석 탭이 선택된 상태로 변경(1)
				$('#detailedAnal01').addClass('active');							// 상세분석 비교분석 탭이 선택된 상태로 변경(2)
				$('#totalSearchResult > ul > li').removeClass('active');			// 시설유형 목록 선택행 지우기
				$('#totalSearchResult_sp > ul > li').removeClass('active');			// (비교분석)시설유형 목록 선택행 지우기
				
				//SGIS4_1025_생활권역 시작 (나의 데이터 관련 이벤트 초기화)
		    	$(".location .cate02_sp").show();
		    	$(".location .cate02").show();
		    	$("#myDataList > li").removeClass('active');
		    	//SGIS4_1025_생활권역 끝
		    	$("#spatial_myDataList > li").removeClass('active'); //SGIS4_1028_생활권역 추가
			},

			/**
			 * 
			 * @name         : initializePop08
			 * @description  : 멀티 선택 조건창을 초기화한다.
			 * 
			 */
			initializePop08 : function() {
				
				$('#gridSettingForSel > li').removeClass('active');
				$('#gridSettingForSel > li:first-child').addClass('active');
				
				var titlePrefix = ""; 
				if($catchmentAreaLeftMenu.ui.whoisPop08sCaller == "bully"){
					titlePrefix = "상관관계 분석";
					$('#pop08_limitMsg').html(' (최대 4개의 조건 선택)');
					$('#pop08_li05').show();					
					$('.layer_pop08 .grid_setting .grid_depth1 > li > a').removeClass('mem4');
					$('.layer_pop08 .grid_setting .grid_depth1 > li > a').addClass('mem5');					
				}else{
					titlePrefix = "주제별";
					$('#pop08_limitMsg').html(' (최대 5개, 주제별 1개의 조건 선택)');
					$('#pop08_li05').hide();
					$('.layer_pop08 .grid_setting .grid_depth1 > li > a').removeClass('mem5');
					$('.layer_pop08 .grid_setting .grid_depth1 > li > a').addClass('mem4');					
				}
				
				$('#pop08_popTitle').html(titlePrefix + ' 조건 설정');
			},
			
			chgStyleForRangeSet : function(pFlag) {
				if(pFlag == "Y"){
					$('#stats01').removeClass('noSel');
					$('#type_t').removeClass('noSel');
			    	$('#stats02').removeClass('noSel');
			    	$('#type_d').removeClass('noSel');
				}else if(pFlag == "N"){
			    	$('#stats01').addClass('noSel');
			    	$('#type_t').addClass('noSel');
			    	$('#stats02').addClass('noSel');
			    	$('#type_d').addClass('noSel');
				}
			},
			
			/**
			 * 
			 * @name         : reqSetParams
			 * @description  : 통계정보 파라미터를 설정한다.
			 * 
			 */
			reqSetParams : function (api_id, param) {
				
				var params = {
						api_id : api_id,
						classDeg : param.classDeg,
						filter : param.filterParam,
						unit : param.unit,
						base_year : param.base_year,
						copr_base_year : param.copr_base_year,
						rangeType : param.rangeType,
						rangeVal : param.rangeVal,
						grid_level : param.grid_level,
						grid_level_nm : param.grid_level_nm,
						schCondNm : param.schCondNm,
						srvAreaType : param.srvAreaType,
						zoom : param.zoom,
						//shpArea : param.shpArea,
						area : param.area,
						polygonPoints : param.polygonPoints,
						radius : param.radius,
						statType : param.statType,
						gender : param.gender,
						//ageCd : param.ageCd,
						ageFromCd : param.ageFromCd,
						ageToCd : param.ageToCd,
						householdType : param.householdType,
						rd_resid_type : param.rd_resid_type,
						ksic_3_cd : param.ksic_3_cd,
						//SGIS4_생활권역 시작
						isLifeBiz : param.isLifeBiz,
						//SGIS4_생활권역 끝
						grdstatType : param.grdstatType,
						async : param.async,
						workGb : param.workGb,
						mapId : param.mapId,
						const_year : param.const_year,
						house_area_cd : param.house_area_cd,
						show1 : param.show1,
						show2 : param.show2,
						identifier : param.identifier,
						sufid : param.sufid,
						rangeCd : param.rangeCd
				};	
				
				return params;				
			},
			
			/**
			 * 
			 * @name         : requestOpenApi
			 * @description  : 통계정보를 요청한다.
			 * 
			 */
			requestOpenApi : function(options) {
				console.log("[catchmentAreaLeftMenu.js] requestOpenApi() api_id [" + options.api_id);

				var api_id = options.api_id;
				//if 	    (api_id == "API_202006") $catchmentAreaMainApi.request.getSrvAreaGridStatDataList(options); //영향권 통계정보 조회
				if (api_id == "API_202007") $catchmentAreaMainApi.request.getGridSrvAreaGridStatDataList(options);//격자  통계정보 조회
				else if (api_id == "API_202010") $catchmentAreaMainApi.request.getGridSrvAreaDataBoardList(options);//데이터보드 : 격자 통계정보 조회
				else if (api_id == "API_202092") $catchmentAreaMainApi.request.getServiceAreaStatistics(options);	//영향권 통계정보 조회
				else if (api_id == "API_202097") $catchmentAreaMainApi.request.getGridStatDataList(options);//격자통계 통합(bsca) 조회				
				//SGIS4_생활권역 시작
				else if (api_id == "API_202082") $catchmentAreaMainApi.request.getSettingInfo(options);		//생활권역 설정정보 조회
				//SGIS4_생활권역 끝				
				// SGIS4_1025_생활권역_임의영역 시작
				else if (api_id == "API_202090") $catchmentAreaMainApi.request.getScopeInfo(options);		//생활권역 임의값 범위정보 조회.
				// SGIS4_1025_생활권역_임의영역 끝
				else alert("requestOpenApi 설정해라");
				
				pageCallReg();		// 페이지 호출통계
			},
			
			/**
			 * 
			 * @name         : setLocation
			 * @description  : 현재지도위치를 변경한다.
			 * 
			 */
			setLocation : function(locObj, isMap2){	// 파라미터 isMap2 추가 - 추가로 생성되는 지도에 대한 구별을 위함(박상언, 2020-10-13 작성)
				var locationText = locObj.sido_nm + " " + locObj.sgg_nm + " " + locObj.emdong_nm;
				var locationCd = locObj.sido_cd + locObj.sgg_cd + locObj.emdong_cd;
				var locationNm = locObj.sido_nm + "|" + locObj.sgg_nm + "|" + locObj.emdong_nm;
				
				if(isMap2 === true) {
					$("#spatialSearchHeader").text(locationText);
					$("#spatialSearchHeader").attr("data-loc-cd", locationCd);
					$("#spatialSearchHeader").attr("data-loc-nm", locationNm);					
					$("#mapLocation_sp").text(locationText);
					return;
				}
				
				$("#mapLocation_1").text(locationText);
				$("#mapLocation_1").attr("data-loc-cd", locationCd);
				$("#mapLocation_1").attr("data-loc-nm", locationNm);
				$("#mapLocation_2").text(locationText);
				//$("#mapLocation_3").text(locationText);
				//$("#mapLocation_4").text(locationText);
			},
			
			/**
			 * 
			 * @name         : setLocationSelectBox
			 * @description  : 지도 화면 이동시 지역선택 selectBox 변경(arguments : sidocd, sggcd, emdongcd)
			 * 
			 */
			setLocationSelectBox : function(){
				if(arguments.length == 1){
					$("#sido").val(arguments[0]).attr("selected", "selected")
				}else if(arguments.length == 2){
					$("#sido").val(arguments[0]).attr("selected", "selected")
					$("#sigungu").val(arguments[1]).attr("selected", "selected")
				}else{
					$("#sido").val(arguments[0]).attr("selected", "selected");
					$("#sigungu").val(arguments[1]).attr("selected", "selected");
					if(arguments[2] != undefined){
						$("#emdong").val(arguments[2]).attr("selected", "selected");
					}else{
						$("#emdong").val("0").attr("selected", "selected");
					}
					
				}
			},
			
			/**
			 * 
			 * @name         : setLocationSelectBox2
			 * @description  : 지도 화면 이동시 지역선택 selectBox 변경(arguments : sidocd, sggcd, emdongcd)
			 * 
			 */
			setLocationSelectBox2 : function(sidoCd, sggCd, emdCd, isMap2){
				
				var sido = isMap2 ? $('#sido_spatial') : $("#sido");
				var sgg = isMap2 ? $('#sgg_spatial') : $("#sigungu");
				var emd = isMap2 ? $('#emd_spatial') : $("#emdong");
				
				sido.val(sidoCd).attr("selected", "selected");
				sgg.val(sggCd).attr("selected", "selected");
				emd.val(emdCd).attr("selected", "selected");
				
			},
			
			/**
			 * 
			 * @name         : setSido
			 * @description  : 시도 selectbox를 세팅한다.
			 * 
			 */
			setSido : function() {
				var sidoAddressObj = new sop.portal.catchmentAreaSidoAddress.api();
				sidoAddressObj.addParam("base_year", "2019");
				sidoAddressObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/map/sidoAddressList.json",
					options : {
						target : this
					}
				});
			},
			
			/**
			 * 
			 * @name         : setSgg
			 * @description  : 시군구 selectbox를 세팅한다.
			 * 
			 */
			setSgg : function(sidoCd, isDetail) {
				$catchmentAreaLeftMenu.ui.selectSidoCd = sidoCd;
				var sggAddressObj = new sop.portal.catchmentAreaSggAddress.api();
				sggAddressObj.addParam("base_year", "2019");
				sggAddressObj.addParam("sido_cd", sidoCd);
				sggAddressObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/map/sggAddressList.json",
					options : {
						target : this,
						isDetail : isDetail
					}
				});
			},

			/**
			 * 
			 * @name         : setEmd
			 * @description  : 읍면동 selectbox를 세팅한다.
			 * 
			 */
			setEmd : function(sidoCd ,sggCd, isDetail) {
				$catchmentAreaLeftMenu.ui.selectSidoCd = sidoCd;
				$catchmentAreaLeftMenu.ui.selectSggCd = sggCd;
				var emdAddressObj = new sop.portal.catchmentAreaEmdAddress.api();
				emdAddressObj.addParam("base_year", "2019");
				emdAddressObj.addParam("sido_cd", sidoCd);
				emdAddressObj.addParam("sgg_cd", sggCd);
				emdAddressObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/map/admAddressList.json",
					options : {
						target : this,
						isDetail : isDetail
					}
				});
			},
			// SGIS4_1027_생활권역 (지역 selectBox 대전 서구 둔산 2동 설정) 시작
			setFirstAddress : function(sidoCd ,sggCd, emdCd){
				$catchmentAreaLeftMenu.ui.selectSidoCd = sidoCd;
				$catchmentAreaLeftMenu.ui.selectSggCd = sggCd;
				$catchmentAreaLeftMenu.ui.selectemdCd = emdCd;
				
				var firstAddressObj = new sop.portal.catchmentAreafirstAddress.api();
				firstAddressObj.addParam("base_year", "2019");
				firstAddressObj.addParam("sido_cd", sidoCd);
				firstAddressObj.addParam("sgg_cd", sggCd);
				firstAddressObj.addParam("dong_cd", emdCd);
				
				firstAddressObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/map/allAddressList.json",
					options : {
						target : this
					}
				});
			},
			// SGIS4_1027_생활권역 (지역 selectBox 대전 서구 둔산 2동 설정) 끝
			/**
			 * 
			 * @name         : mapMove
			 * @description  : x,y좌표에 따라 맵이 움직인다.
			 * 
			 */
			mapMove : function(x_coor, y_coor, mapId, animate, zoom){
				var map = $catchmentAreaMain.ui.getMap(mapId);
				if(!map) {
					console.error('존재하지 않는 지도입니다');
					return;
				}
				var mapZm = zoom | map.zoom;
				if(mapZm < 6){
					mapZm = 8;
				}
				if(!animate) animate = null;
				
				map.mapMove([ x_coor, y_coor ], mapZm, animate);
			},
			
			/**
			 * 
			 * @name         : searchPlaceApi
			 * @description  : 검색 API
			 * 
			 */
			searchPlaceApi : function(enterTf, page){

				if(enterTf){
				    $("#rstSearchDataDiv").html("");
				    $("#rstSearchDataDiv").show();
				    $("#rstSearchDataDiv1Page").show();
				    $.ajax({
				        type: "GET",
				        url: "https://map.ngii.go.kr/openapi/search.xml",
				        data: {
				            target:"poi",
				            //apikey:"iRZU9B0q0cc-Sli4OUVssw",
				            //apikey:"681A8A4458D8640F67284FF671EC2359",
							apikey:"E83672BED4060203EEE31799616A1199",	//운영 반영시 해당 url로 테스트 한다
							//apikey:"924F124D2B4E0FD86234D75A9F4C271D",
				            onePageRows:"10",
				            currentPage:page,
				            keyword:$("#searchWord").val()
				        },
				        dataType : "jsonp",
				        crossDomain:true,
				        success: function(result) {
				            var xmlData = jQuery.parseXML(result.xmlStr);
				            var header = $(xmlData).find("header");
				            var responseCode = header.find("responseCode").text();
				            var responseMessage = header.find("responseMessage").text();
				            
				            var closeBtn = "<input type='button' onclick='closePopup2();' style='cursor: pointer; background:url(/img/common/popup_close_x.png) no-repeat left top; background-size:contain; width:10px; height:10px; text-indent:-1000px; overflow:hidden; border:none; position:absolute; right:10px; top:10px;'>";
					            if(responseCode!="0"&&responseCode!="100"){
					                $("#rstSearchDataDiv").html(responseMessage);
					            }else{
					                var htmlStr = "";
					                var poiArry = $(xmlData).find("contents").find("poi");
					                var totCount = $(xmlData).find("totalCount").text();
					                if(poiArry.length==0){
					                	var errHtml = "";
					                	if($("input:checkbox[id='schTypeGbA01']").is(":checked")){
					                		errHtml = "현재 시군구에 해당하는 검색결과가 없습니다.";
					                	}else{
					                		errHtml = "현재 보이는 화면 내에서는 해당하는 검색결과가 없습니다.";
					                	}
					                    $("#rstSearchDataDiv").html(errHtml+"<input type='button' onclick='closePopup2();' style='cursor: pointer; background:url(/img/common/popup_close_x.png) no-repeat left top; background-size:contain; width:10px; height:10px; text-indent:-1000px; overflow:hidden; border:none; position:absolute; right:10px; top:10px;'>");
					    				var htmlPage = "<br><br><br><br><br><br><br><br><br><br><br><br><div id='sopPaging' class='pagenation searchPagenation' align='center' style='width: 100%; margin-top:6px;'><span class='pages'></span></div><div style='height:5px;'></div>";
					    				$("#rstSearchDataDiv1Page").html(htmlPage);
					                }else{
					                		htmlStr += "<p style='font-weight:bold'>검색결과 : " + totCount + "건</p>";
					                		htmlStr += closeBtn;
					                		htmlStr+="<table id='tb_result'>";
					                		
					                		for(var i=0;i<poiArry.length;i++){
					                			var name = $(poiArry[i]).find("name").text();
					                			var roadAdres = $(poiArry[i]).find("roadAdres").text();
					                			if(name.length> 20){
					                				name = name.substring(0,18) + "...";
					                			}
					                			
					                			if(roadAdres.length> 23){
					                				roadAdres = roadAdres.substring(0,21) + "...";
					                			}
					                			var text11 = "'"+$(poiArry[i]).find("name").text()+"'";
					                			var text22 = "'"+$(poiArry[i]).find("roadAdres").text()+"'";
					                			
					                			htmlStr+="<tr style='height:21px'>";
					                			htmlStr+="<td style='width:48%; cursor:pointer; border-right:1px solid #d3d3d3;'><a class='mightOverflow' style='margin-left:10px;max-width:260px;' onclick='javascript:$catchmentAreaLeftMenu.ui.moveTargetArea(\"" + $(poiArry[i]).find("name").text() + "\", \"" + $(poiArry[i]).find("roadAdres").text() + "\","+$(poiArry[i]).find("x").text()+","+$(poiArry[i]).find("y").text()+");closePopup2();'>"+ name +"</a></td>";
					                			htmlStr+="<td style='cursor:pointer;'><a class='mightOverflow' style='max-width:260px;' onclick='javascript:$catchmentAreaLeftMenu.ui.moveTargetArea(\"" + $(poiArry[i]).find("name").text() + "\", \"" + $(poiArry[i]).find("roadAdres").text() + "\","+$(poiArry[i]).find("x").text()+","+$(poiArry[i]).find("y").text()+");closePopup2();'>&nbsp; "+ roadAdres +"</a></td>";	// 코드 수정 - 박상언 2020-10-15 작성
					                			htmlStr+="</tr>";
					                		}
					                		htmlStr+="</table>";
					                		
					                		$("#rstSearchDataDiv").html(htmlStr);
					                		
					                		
					                		var htmlPage = "<br><br><br><br><br><br><br><br><br><br><br><br><div id='sopPaging1' class='pagenation searchPagenation' align='center' style='width: 100%; margin-top:40px;'><span class='pages'></span></div><div style='height:5px;'></div>";
					                		$("#rstSearchDataDiv1Page").html(htmlPage);
					                		if(parseInt(totCount) > 5){
					        					sopCurrentPageIndex1 = page-1;
					        					$catchmentAreaLeftMenu.ui.sopPaging1(parseInt(totCount), sopCurrentPageIndex1);
					        				}
					                		
					                		$("#tb_result tr").click(function(){
												var tr = $(this);
												var td = tr.children();
												var area = td.eq(0).text();
												
												$('#searchWord').val(area);
												//$catchmentAreaLeftMenu.ui.setLocation(area); //현재 지도 위치 변경 - 주석처리. moveTargetArea가 동작해서 현재위치가 자동적으로 바뀜. 수동적으로 setLocation 호출 필요X
											});
				                }
				            }
				          },
				        error : function(xhr, ajaxSettings, thrownError){
				        	console.log("error");
				        }
				    });
				}

			},

			/**
			 * 
			 * @name         : requestForPoiSearch
			 * @description  : POI 찾기 요청
			 * 
			 */
			requestForPoiSearch : function(pWorkPos, pRequestTo, pFactypeCd){
				// pWorkPos: A-왼쪽메뉴의 검색, B-상세분석에서의 검색
				// pRequestTo: ngii-외부 api 요청, sgis-내부 요청
				var schMode = "region";
				var param = {};
				var $schTypeGb01;
				var $schTypeGb02;
				
				if(pWorkPos == 'B'){
					$schTypeGb01 = $('#schTypeGbB01'); 
					$schTypeGb02 = $('#schTypeGbB02');					
				}else{
					$schTypeGb01 = $('#schTypeGbA01'); 
					$schTypeGb02 = $('#schTypeGbA02');					
				}
				
				if($schTypeGb02.is(':checked')){
					schMode = "screen";
					
					var map = (pWorkPos == 'B') ? $catchmentAreaMain.ui.getMap(1) : $catchmentAreaMain.ui.getMap(0);
//					if(pRequestTo == 'sgis'){
//						var curZoom = map.zoom;
//						if(curZoom < 6){
//							caMessageAlert.open("알림", "현재 지도 레벨에서는 선택될 유형 시설이 너무 많습니다.<br/>지도를 확대한 다음 시설 유형을 선택해주세요.");
//							return false;							
//						}
//					}

					var mapBounds = map.gMap.getBounds();
				
					param.mode = schMode;					
					param.southWestX = mapBounds._southWest.x;
					param.southWestY = mapBounds._southWest.y;
					param.northEastX = mapBounds._northEast.x;
					param.northEastY = mapBounds._northEast.y;				

				}else{					
					param.mode = schMode;
					var locCd, locNm; 
					if(pWorkPos == 'B'){
						locCd = $("#spatialSearchHeader").attr("data-loc-cd");
						locNm = $("#spatialSearchHeader").attr("data-loc-nm");
					}else{		
						locCd = $("#mapLocation_1").attr("data-loc-cd");
						locNm = $("#mapLocation_1").attr("data-loc-nm");
					}

					param.sidoCd = '0';
					param.sggCd = '0';
					param.emdCd = '0';
					
					if(locCd !== undefined){
						if(locCd.length >= 7){
							param.sidoCd = locCd.substr(0, 2);
							param.sggCd = locCd.substr(2, 3);
							//param.emdCd = locCd.substr(5, 2);		// 시군구 기준 검색(읍면동 무시)							
						}else if(locCd.length >= 5){
							param.sidoCd = locCd.substr(0, 2);
							param.sggCd = locCd.substr(2, 3);								
						}else if(locCd.length >= 2){
							param.sidoCd = locCd.substr(0, 2);
						}
					}
					
					if(locNm !== undefined){
						var locNms = locNm.split('|');
						if(locNms.length >= 3){
							param.sidoNm = locNms[0];
							param.sggNm = locNms[1];
							//param.emdNm = locNms[2];				// 시군구 기준 검색(읍면동 무시)									
						}else if(locNms.length >= 2){
							param.sidoNm = locNms[0];
							param.sggNm = locNms[1];								
						}else if(locNms.length >= 1){
							param.sidoNm = locNms[0];							
						}							
					}					
					
					if(param.sggCd == undefined || param.sggCd == null || param.sggCd == '0'){
						caMessageAlert.open("알림", "시군구를 선택해 주세요.");
						return false;						
					}else{
						if(param.sggCd.length > 3){
							param.sggCd = param.sggCd.substr(0, 3);
						}
					}
					
//					if(pRequestTo == 'sgis'){
//						if(param.emdCd == undefined || param.emdCd == null || param.emdCd == '0'){
//							caMessageAlert.open("알림", "읍면동을 선택해 주세요.");
//							return false;						
//						}
//					}

					if(param.emdCd != undefined && param.emdCd != null){
						if(param.emdCd.length > 2){
							param.emdCd = param.emdCd.substr(0, 2);
						}						
					}
				}
				
				if(pRequestTo == 'ngii'){					
					$catchmentAreaLeftMenu.ui.searchFullPlaceListApi(pWorkPos, '', 1, param);					
				}else if(pRequestTo == 'sgis'){					
					param.workPos = pWorkPos;
					param.factypeCd = pFactypeCd;
					param.async = false;
					$catchmentAreaLeftMenu.ui.setfacilityTypeSearchDatailList(param);
				}				
			},
			
			/**
			 * 
			 * @name         : searchFullPlaceListApi
			 * @description  : 검색 API
			 * 
			 */
			searchFullPlaceListApi : function(pWorkPos, pSrchWord, pPage, pParam, pIdentifier){
				// pWorkPos: A-왼쪽메뉴의 검색, B-상세분석에서의 검색
				var pageRowCnt = 1000;
				var curPage = Number(pPage);				
				var schWord = pSrchWord;
				var param = pParam;
				var poiList;
				var identifier;
				if(pIdentifier !== undefined && pIdentifier !== null){
					identifier = pIdentifier;
				}else{
					identifier = new Date().getTime();
				}
				
				if(pWorkPos == 'B'){
					if(curPage == 1){
						$catchmentAreaLeftMenu.ui.poiList0B.length = 0;
						schWord = $("#spatialSearchWord").val();
					}
					poiList = $catchmentAreaLeftMenu.ui.poiList0B;
				}else{
					if(curPage == 1){
						$catchmentAreaLeftMenu.ui.poiList0A.length = 0;						
						schWord = $("#searchWord").val();
					}
					poiList = $catchmentAreaLeftMenu.ui.poiList0A;
				}

			    $.ajax({
			        type: "GET",
			        url: "https://map.ngii.go.kr/openapi/search.xml",
			        data: {
			            target:"poi",
			            //apikey:"iRZU9B0q0cc-Sli4OUVssw",
			            //apikey:"681A8A4458D8640F67284FF671EC2359",
						apikey:"E83672BED4060203EEE31799616A1199",	//운영 반영시 해당 url로 테스트 한다
						//apikey:"924F124D2B4E0FD86234D75A9F4C271D",
			            onePageRows:pageRowCnt,
			            currentPage:curPage,
			            keyword:schWord
			        },
			        dataType : "jsonp",
			        crossDomain:true,
			        success: function(result) {
			        	var xmlData = jQuery.parseXML(result.xmlStr);
			            var header = $(xmlData).find("header");
			            var responseCode = header.find("responseCode").text();
			            
			            if(responseCode == "0"){			            	
			            	var poiArry = $(xmlData).find("contents").find("poi");
			            	var poiLen = poiArry.length; 
			            	var schMode = param.mode;
			            	var southWestX, southWestY, northEastX, northEastY;
			            	
			            	if(schMode == 'screen'){
			            		southWestX = Number(param.southWestX);
			            		southWestY = Number(param.southWestY);
			            		northEastX = Number(param.northEastX);
			            		northEastY = Number(param.northEastY);
			            	}
			            	
			            	if(poiLen > 0){
			            		for(var i=0; i<poiLen; i++){

									var name = $(poiArry[i]).find("name").text();
									var roadAdres = $(poiArry[i]).find("roadAdres").text();
									var jibunAdres = $(poiArry[i]).find("jibunAdres").text();
									var x_coor = $(poiArry[i]).find("x").text();
									var y_coor = $(poiArry[i]).find("y").text();									
									
									if(schMode == 'region'){
										// 행정구역으로 필터링
										// 행정구역에 해당하는 응답값 예시 : <jibunAdres>대전광역시 서구 갈마동 114-26</jibunAdres>
										// 시군구 레벨까지만 비교 (읍면동 명칭이 다름 : sgis는 갈마1동/갈마2동 이고 응답값은 갈마동) 
										if(jibunAdres.indexOf(param.sidoNm + " " + param.sggNm) == 0){
											var poiInfos = [];
											poiInfos.push(name);
											poiInfos.push(roadAdres);
											poiInfos.push(x_coor);
											poiInfos.push(y_coor);
											
											poiList.push(poiInfos);
										}
									}else if(schMode == 'screen'){
										// 화면 경계로 필터링
										var x_coor_num = Number(x_coor);
										var y_coor_num = Number(y_coor);
										if((x_coor_num > southWestX && x_coor_num < northEastX) && (y_coor_num > southWestY && y_coor_num < northEastY)){
											var poiInfos = [];
											poiInfos.push(name);
											poiInfos.push(roadAdres);
											poiInfos.push(x_coor);
											poiInfos.push(y_coor);
											
											poiList.push(poiInfos);											
										}										
									}											            			
			            		}			            		
			            	}

			            	var totCount = header.find("totalCount").text();
			            	if(curPage == 1){
			            		$catchmentAreaMask.startProcess(identifier, totCount);
			            	}
			            	
			            	if(Number(totCount) > (pageRowCnt * curPage)){
			            		$catchmentAreaLeftMenu.ui.searchFullPlaceListApi(pWorkPos, header.find("keyword").text(), (curPage + 1), pParam, identifier);
			            	}else{
			            		$catchmentAreaLeftMenu.ui.makePoiList(pWorkPos, 1);
			            	}
			            	
			            	$catchmentAreaMask.endUnitWork(identifier, poiLen);
			            }else{
			            	var responseMessage = header.find("responseMessage").text();
			            	console.log("responseCode:" + responseCode + ", responseMessage:" + responseMessage);
			            	
			            	$catchmentAreaLeftMenu.ui.makePoiList(pWorkPos, 1);
			            	$catchmentAreaMask.endUnitWork(identifier, 0);
			            }
			        },
			        error : function(xhr, ajaxSettings, thrownError){
			        	console.log("error");
			        	$catchmentAreaMask.endUnitWork(identifier, 0);
			        }
			    });
			},

			/**
			 * 
			 * @name         : makePoiList
			 * @description  : POI 검색 결과를 화면에 표출한다.
			 * 
			 */
			makePoiList : function(pWorkPos, pPage){
				// pWorkPos: A-왼쪽메뉴의 검색, B-상세분석에서의 검색

				var poiList;
				var $rstListDiv;
				var $pagingDiv;
				var pagingId;
				var mapId;
				
				if(pWorkPos == 'B'){
					poiList = $catchmentAreaLeftMenu.ui.poiList0B;
					
					$rstListDiv = $("#spatialSearchWordDiv");
					$pagingDiv = $("#spatialSearchWordDiv1Page");
					
					pagingId = 'pagingDivB';
					mapId = 1;
				}else{
					poiList = $catchmentAreaLeftMenu.ui.poiList0A;
					
					$rstListDiv = $("#rstSearchDataDiv");
					$pagingDiv = $("#rstSearchDataDiv1Page");
					
					pagingId = 'pagingDivA';
					mapId = 0;
				}
				
				$rstListDiv.html("");
				$pagingDiv.html("");
				$rstListDiv.show();
				$pagingDiv.show();				
				
				var htmlStr = "";
				var htmlPage = "";
				var closeBtn = "<input type='button' onclick='$catchmentAreaLeftMenu.ui.closeSchRstPopup(\"" + pWorkPos + "\");' style='cursor: pointer; background:url(/img/common/popup_close_x.png) no-repeat left top; background-size:contain; width:10px; height:10px; text-indent:-1000px; overflow:hidden; border:none; position:absolute; right:10px; top:10px;'>";
				if(poiList.length == 0){
					htmlStr = "검색결과가 없습니다.";
					htmlStr += closeBtn;
					htmlPage = "<br><br><br><br><br><br><br><br><br><br><br><br><div class='pagenation searchPagenation' align='center' style='width: 100%; margin-top:6px;'><span class='pages'></span></div><div style='height:5px;'></div>";
    				
    				$rstListDiv.html(htmlStr);
    				$pagingDiv.html(htmlPage);
				}else{					
					var totCount = poiList.length;
						
            		htmlStr += "<p style='font-weight:bold'>검색결과 : " + totCount + "건</p>";
            		htmlStr += closeBtn;
            		htmlStr += "<table id='tb_result'>";

    				var onePageRows = 10;
    				var curPage = Number(pPage);
    				var startIdx = (curPage - 1) * onePageRows;
    				var endIdx = startIdx + onePageRows - 1;
    				if(endIdx > (totCount - 1)){
    					endIdx = totCount - 1;
    				}
    				
            		for(var i=startIdx; i<=endIdx; i++){ 
            			var poiInfos = poiList[i];
            			var name = poiInfos[0];
            			var roadAdres = poiInfos[1];
            			var x_coor = poiInfos[2];
            			var y_coor = poiInfos[3];
            			
            			htmlStr += "<tr style='height:21px'>";
            			htmlStr += "<td style='width:48%; cursor:pointer; border-right:1px solid #d3d3d3;'><a class='mightOverflow' style='margin-left:10px;max-width:260px;' onclick='javascript:$catchmentAreaLeftMenu.ui.moveTargetArea(\"" + name + "\", \"" + roadAdres + "\","+ x_coor +","+ y_coor +", null, " + mapId + ", \"M1\");$catchmentAreaLeftMenu.ui.closeSchRstPopup(\"" + pWorkPos + "\");'>"+ name +"</a></td>";
            			htmlStr += "<td style='cursor:pointer;'><a class='mightOverflow' style='max-width:260px;' onclick='javascript:$catchmentAreaLeftMenu.ui.moveTargetArea(\"" + name + "\", \"" + roadAdres + "\","+ x_coor +","+ y_coor +", null, " + mapId + ", \"M1\");$catchmentAreaLeftMenu.ui.closeSchRstPopup(\"" + pWorkPos + "\");'>&nbsp; "+ roadAdres +"</a></td>";
            			htmlStr += "</tr>";
            		}
            		htmlStr += "</table>";
            		
            		htmlPage = "<br><br><br><br><br><br><br><br><br><br><br><br><div id='" + pagingId + "' class='pagenation searchPagenation' align='center' style='width: 100%; margin-top:40px;'><span class='pages'></span></div><div style='height:5px;'></div>";
            		
            		$rstListDiv.html(htmlStr);
            		$pagingDiv.html(htmlPage);

            		if(totCount > 10){
    					$catchmentAreaLeftMenu.ui.makePaging(pWorkPos, totCount, curPage);
    				}
				}
			},

			/**
			 * 
			 * @name         : closeSchRstPopup
			 * @description  : POI 검색 결과창을 닫는다.
			 * 
			 */
			closeSchRstPopup : function(pWorkPos){				
				if(pWorkPos == 'B'){
					$("#spatialSearchWordDiv").hide();
					$("#spatialSearchWordDiv1Page").hide();
					
					$catchmentAreaLeftMenu.ui.poiList0B.length = 0;
				}else{
					$("#rstSearchDataDiv").hide();
					$("#rstSearchDataDiv1Page").hide();
					
					$catchmentAreaLeftMenu.ui.poiList0A.length = 0;
				}				
			},
			
			/**
			 * 
			 * @name         : makePaging
			 * @description  : 검색 div 페이징을 한다.
			 * 
			 */
			makePaging: function(pWorkPos, pTotCnt, pPage) {
				var pageSize = 10;				
				var totalPage = Math.ceil(pTotCnt / pageSize);
				var pagingId;
				if(pWorkPos == 'B'){			
					pagingId = 'pagingDivB';
				}else{				
					pagingId = 'pagingDivA';
				}
				
				$('#' + pagingId + ' .pages').paging({
					current: pPage,
					length : 10,
					max: totalPage,
					itemClass : 'page',
					itemCurrent : 'current',
					format : '{0}',
					next : '&gt;',
					prev : '&lt;',
					first : '&lt;&lt;',
					last : '&gt;&gt;',
					onclick:function(e, page){
						$catchmentAreaLeftMenu.ui.makePoiList(pWorkPos, page)
					}
				});
			},
			
			/**
			 * 
			 * @name         : searchReverseGeoApi
			 * @description  : 검색 리버스지오코딩 API
			 * 
			 */
			searchReverseGeoApi : function(select_x, select_y, targetPOI){
				srvLogWrite('Q0','02','03','00',select_x +','+select_y,'');
				$.ajax({
			        type: "GET",
			        url: "https://map.ngii.go.kr/openapi/search.xml",
			        data: {
			        	x : select_x,
			        	y : select_y,
			            target:"reverseGeo",
			            //apikey:"iRZU9B0q0cc-Sli4OUVssw",
			            //apikey:"681A8A4458D8640F67284FF671EC2359",
						apikey:"E83672BED4060203EEE31799616A1199",	//운영 반영시 해당 url로 테스트 한다
						//apikey:"924F124D2B4E0FD86234D75A9F4C271D",
			        },
			        dataType : "jsonp",
			        crossDomain:true,
			        success: function(result) {
			            var xmlData = jQuery.parseXML(result.xmlStr);
			            var header = $(xmlData).find("header");
			            var responseCode = header.find("responseCode").text();
			            var responseMessage = header.find("responseMessage").text();
			            var jibunAdres = '';
			            var roadAdres = '';
			            var html ="";
			            if(responseCode!="0"&&responseCode!="100"){
			            	jibunAdres = responseMessage;
			            }else{
			            	if($(xmlData).find("contents").find("jibunAdres").length==0){
			            		var errHtml = "";
			                	if($("input:checkbox[id='schTypeGbA01']").is(":checked")){
			                		errHtml = "현재 시군구에 해당하는 검색결과가 없습니다.";
			                	}else{
			                		errHtml = "현재 보이는 화면 내에서는 해당하는 검색결과가 없습니다.";
			                	}
			            		roadAdres = errHtml;
			            	}else{
			            		jibunAdres = $(xmlData).find("contents").find("jibun").find("jibunAdres").text();
			            		roadAdres = $(xmlData).find("contents").find("road").find("roadAdres").text();
			            	}
			            }

			            $catchmentAreaLeftMenu.ui.searchFacilitiesList(select_x, select_y, targetPOI, roadAdres, jibunAdres);
			           
			          },
			        error : function(xhr, ajaxSettings, thrownError){
			        	console.log("error");
			        }
			    });
			},
			
			/**
			 * 
			 * @name         : searchFacilitiesList
			 * @description  : 검색 리버스지오코딩 API
			 * 
			 */
			rgeocoding : function(select_x, select_y){
				var data = "?accessToken="+accessToken+"&addr_type=10"+"&x_coor="+select_x+"&y_coor="+select_y;
									var full_addr;
									$.ajax({
										"url" : openApiPath + "/OpenAPI3/addr/rgeocode.json" + data	,		    
										"type" : "GET",
										"async" : false,
										"success" : function(res) {
															if(res.errCd == '0'){
																full_addr = res.result[0].full_addr;
															}
															
															
														}
									});
									return full_addr;
									
			},
			
			searchFacilitiesList : function(select_x, select_y, targetPOI, roadAdres, jibunAdres){
				
				var rgecode = this.rgeocoding(select_x,select_y);
				
				var	point = 'POINT('
					point += select_x + " " + select_y;
					point += ')';

				// 변수 및 할당 추가 (시작) - 박상언 2020-10-15 작성
				var mapId = $(targetPOI._map._container).data('mapId');
				var poiSelectBtnDomId = ""; 
				var sel_addr1_id = "";
				var sel_addr2_id = "";
				if(mapId === 0) {
					poiSelectBtnDomId = "poiSelectButten";
					sel_addr1_id = "sel_addr1";
					sel_addr2_id = "sel_addr2";
					
					if(roadAdres !== null && roadAdres !== undefined && roadAdres != '검색결과가 없습니다.' && roadAdres != ""){
						$catchmentAreaObj.tobeSelected_locRdAdres = roadAdres;
					}else{
						roadAdres = rgecode;
						$catchmentAreaObj.tobeSelected_locRdAdres = roadAdres;
					}
				} else if(mapId === 1){
					poiSelectBtnDomId = "poiSelectButten2";
					sel_addr1_id = "sel_addr1_2";
					sel_addr2_id = "sel_addr2_2";
					
					if(roadAdres !== null && roadAdres !== undefined && roadAdres != '검색결과가 없습니다.' && roadAdres != ""){
						$catchmentAreaObj.tobeSelected_target_locRdAdres = roadAdres;
					}		
				}
				// 변수 및 할당 추가 (끝) - 박상언 2020-10-15 작성
				
				var sopPortalgetPtFcltsObj = new sop.portal.sopPortalgetPtFcltsList.api();
				sopPortalgetPtFcltsObj.addParam("point", point);
				sopPortalgetPtFcltsObj.request({
					method : "POST",
					async : false,
					url : contextPath + "/ServiceAPI/OpenAPI3/catchmentArea/getPointFacilitiesList.json",
					options : {
						callback : function(result){							
							
							if((jibunAdres === undefined || jibunAdres === null || jibunAdres === "") && (result === undefined)){
								// 지번주소 없으면 도로명도 없는걸로
								messageAlert.open("알림", "선택한 지점은 주소가 없는 곳입니다.<br/>다른 곳을 선택하여 주시기 바랍니다.");
								return;
							}

							var html ="";
							 	html += '<div class="layer_pop04">';
					            html += 	'<div class="sec01" value="'+select_x+'/'+select_y+'">';
					            html += 		'<input type="radio" id="'+sel_addr1_id+'" name="addr_radio" checked><label for="'+sel_addr1_id+'" class="radio_txt">주소선택</label> ';	// 박상언 2020-10-15 작성
					            html += 		'<span class="addr_road">도로명</span>';
					            if(roadAdres != "" && roadAdres != null && roadAdres != undefined){
					            	html += 		'<span class="addr_road_txt">'+roadAdres+'</span>';
					            }else{
					            	html += 		'<span class="addr_road_txt">검색결과가 없습니다</span>';							
					            }
					            html += 		'<span class="addr_road2">지번</span>';
								html += 		'<span class="addr_road2_txt">'+jibunAdres+'</span>';
								html += 	'</div>';
								html += 	'<div class="sec02">';
								html += 		'<input type="radio" id="'+sel_addr2_id+'" name="addr_radio"><label for="'+sel_addr2_id+'" class="radio_txt">시설선택</label>';	// 박상언 2020-10-15 작성
								html += 		'<div class="scroll_wrap scroll_05 mt10">';
								html += 			'<ul id="sec02List">';
								if(result != undefined){
									$.each(result, function(index, item){
										html += 		'<li id="'+item.ksic_5_cd+'"><a href="javascript:void(0);" id="sufid_'+item.sufid+'" value="'+item.x+'/'+item.y+'">'+item.corp_nm+'</a></li>';
									});
								}else{
									html += 			'<li><a href="javascript:void(0);">검색결과가 없습니다.</a></li>';
								}
								html += 			'</ul>';
								html += 		'</div>';
								html += 	'</div>';
								html +=		'<div class="btn_wrap">';
								html +=			'<a href="javascript:void(0);" class="sa_btn_select" id="'+poiSelectBtnDomId+'" style="color:#fff">선택</a>';
								html +=			'<a href="javascript:void(0);" class="sa_btn_cancel" id="cancelPoiButten" data-map-id="'+mapId+'" style="color:#fff">취소</a>';
								html +=		'</div>';
								html += '</div>';
								
								var opt = {closeButton: false};
								targetPOI.bindInfoWindow(html, opt).openInfoWindow();
								targetPOI.unbindInfoWindow();
								
								//$(".scroll_wrap").mCustomScrollbar("destroy");
								$(".scroll_wrap").mCustomScrollbar();
						}
					}
				});
									
				
			},
			
			/**
			 * 
			 * @name         : reverseOnSelectChange
			 * @description  : 맵 이동 시 시도/시군구/읍면동 셀렉트박스 변경한다.
			 * 
			 */
			reverseOnSelectChange : function(map, callback){ //210416 지자체연계서비스 추가(callback)
				if(map.id === 2){
					// 보고서용 맵이 하나 추가되었는데...
					return;
				}

				var sopPortalAllAddressObj = new sop.portal.catchmentAreaEmdAllAddress.api();
				sopPortalAllAddressObj.addParam("sido_cd", map.curSidoCd);
				sopPortalAllAddressObj.addParam("sgg_cd", map.curSiggCd);
				
				if(map.curDongCd != ""){
					sopPortalAllAddressObj.addParam("dong_cd", map.curDongCd);
				}				
				sopPortalAllAddressObj.addParam("base_year", map.bnd_year);
				
				sopPortalAllAddressObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/map/allAddressList.json",
					options : {
						target : this,
						mapId : map.id,		// options 객체에 속성(mapId) 추가 - 지도가 둘로 나뉘었을 때, 구별을 주기 위한 id값 ( 박상언, 2020-10-13 작성 )
						callback : callback//210416 지자체연계서비스 추가(callback)
					}
				});
			},
			
			/**
			 * 
			 * @name         : moveTargetArea
			 * @description  : 해당 좌표로 화면 및 마커를 생성한다.
			 * 
			 */
			moveTargetArea : function(name, roadAdres, x, y ,poiMappingval, mapId, callerGb, zoom, sufid){
				srvLogWrite('Q0','02','02','02',name,'');
				if(!mapId) mapId = 0;

				
				if(mapId === 0) {
					$catchmentAreaLeftMenu.ui.selectCoordinate_x = x;
					$catchmentAreaLeftMenu.ui.selectCoordinate_y = y;					
				} else if(mapId === 1) {
					$catchmentAreaLeftMenu.ui.selectCoordinate_x_2 = x;
					$catchmentAreaLeftMenu.ui.selectCoordinate_y_2 = y;
				}				
				
				$catchmentAreaLeftMenu.ui.mapMove(x, y, mapId, null, zoom);
				$catchmentAreaLeftMenu.ui.creatSearchPoiMarker(name, roadAdres, x, y, poiMappingval, mapId, callerGb, sufid);
			},
			
			/**
			 * 
			 * @name         : simpleMoveTargetArea
			 * @description  : creatSearchPoiMarker를 간략화한 메소드다. creatSearchPoiMarker를 통해서 마커를 생성하지 않는다. 
			 * 				   그냥 아무 기능도 없는 마커가 그려지도록 한다.
			 * @parameter	 : x축, y축, 맵 아이디, 지도 이동시 애니메이션 효과 여부 , 마커 생성 여부  
			 */ 
			simpleMoveTargetArea : function(x,y,mapId,animate, createMarker) {
				
				if(!mapId) mapId = 0;

				if(!animate) animate = null;
				
				
				$catchmentAreaLeftMenu.ui.mapMove(x, y, mapId, animate);

				if(createMarker) {
					this.creatSimpleSearchMarker(x,y,mapId);
				}
				
			},
			
			/**
			 * 
			 * @name         : creatSearchPoiMarker
			 * @description  : 검색 후 마크생성를 생성한다.
			 * 
			 */
			creatSearchPoiMarker : function(name, roadAdres, x_coordinate, y_coordinate , poiMappingval, mapId, callerGb, sufid){	// 파라미터 (mapId) 추가 - 박상언 2020-10-14 작성
				var map = $catchmentAreaMain.ui.getMap(mapId);	// 인자값 (mapId) 추가 - 박상언 2020-10-14 작성
				var mapId = map.id;								// 변수 추가 - 박상언 2020-10-14 작성
				var pointSelectButtenId = mapId == 0 ? "pointSelectButten" : "pointSelectButten2";	// 변수 추가 - 박상언 2020-10-14 작성
				//map.markers.clearLayers(); //마커 초기화
				
				//var on = $(this).hasClass("on"); 
				var markerIcon = sop.icon({
					iconUrl: '/img/marker/thema_marker_default.png',
					shadowUrl: '/img/marker/theme_shadow.png',
					iconAnchor: [12.5, 40 ],
					iconSize: [ 25, 40 ],
					infoWindowAnchor: [1, -34]
				});
				
				var marker = sop.marker([ x_coordinate, y_coordinate ], {
					icon: markerIcon
				});
				
				map.markers.addLayer(marker);	

				if(mapId === 0){
					$catchmentAreaObj.setTobeSelectedLoc(name, roadAdres, marker);
				}else if(mapId === 1){
					$catchmentAreaObj.setTobeSelectedTargetLoc(name, roadAdres, marker);					
					$catchmentAreaLeftMenu.ui.map2SearchMarker = marker;		// 해당 마커 자체를 저장한다. 후에 지도 2에 마커가 그려져있는지를 알기 위해서다.
				}
				
				var selSufid = ""; 
				if(callerGb == "M3"){
					selSufid = sufid;
				}

				var html ="";
				html += 	'<div class="layer_pop03" value="'+poiMappingval+'" data-caller-gb="'+callerGb+'">';
				html += 		'<h4 class="sa_h4">'+name+'</h4>';
				html += 		'<h5 class="sa_h5">[ '+roadAdres+' ]</h5>';
				html += 		'<a href="#" class="sa_btn_select" style="color:#fff" id="'+pointSelectButtenId+'" value="'+x_coordinate+'/'+y_coordinate+'/'+name+'" data-sufid="'+selSufid+'">선택</a>'; // 지도에 따른 dom id값 값 주입 - 박상언 2020-10-14 작성
				html += 		'<a href="#" class="sa_btn_cancel" data-map-id="'+mapId+'" style="color:#fff">취소</a>';	// data 속성 추가 - 박상언 2020-10-14 작성
				html += 	'</div>';
				
				var opt = {closeButton: false};
				marker.bindInfoWindow(html, opt).openInfoWindow();
				marker.unbindInfoWindow();
			},
			
			/**
			 * 
			 * @name         : creatSearchPoiMarker
			 * @description  : 아무 기능도 없는 마커를 그린다.
			 * @parameter	 : x축, y축, 맵 아이디
			 */
			creatSimpleSearchMarker: function(x,y,mapId) {
				if(mapId === undefined) {
					console.error('mapId 인자값을 넣어주셔야 합니다.');
					return;
				}
				
				if(mapId === 0) {
					$catchmentAreaLeftMenu.ui.selectCoordinate_x = x;
					$catchmentAreaLeftMenu.ui.selectCoordinate_y = y;					
				} else if(mapId === 1) {
					$catchmentAreaLeftMenu.ui.selectCoordinate_x_2 = x;
					$catchmentAreaLeftMenu.ui.selectCoordinate_y_2 = y;
				}
				
				var map = $catchmentAreaMain.ui.getMap(mapId);
				
				
				
				var markerIcon = sop.icon({
					iconUrl: '/img/marker/thema_marker_default.png',
					shadowUrl: '/img/marker/theme_shadow.png',
					iconAnchor: [12.5, 40 ],
					iconSize: [ 25, 40 ]
					//infoWindowAnchor: [1, -34]
				});
				
				var marker = sop.marker([ x, y ], {
					icon: markerIcon
				});
				
				map.markers.clearLayers(); //마커 초기화
				map.markers.addLayer(marker);
				
				// 해당 마커 자체를 저장한다. 후에 지도 2에 마커가 그려져있는지를 알기 위해서다.
				if(mapId === 1) $catchmentAreaLeftMenu.ui.map2SearchMarker = marker;
			},
			
			/**
			 * 
			 * @name         : creatPoiMarker
			 * @description  : 마크생성버튼 클릭 후 검색 이벤트
			 * 
			 */
//			creatPoiMarker : function(){
//				var map = $catchmentAreaMain.ui.getMap();
//				map.markers.clearLayers(); //마커 초기화
//				
//				var on = $(this).hasClass("on"); 
//				
//				var markerIcon = sop.icon({
//					iconUrl: '/img/marker/thema_marker_default.png',
//					shadowUrl: '/img/marker/theme_shadow.png',
//					iconAnchor: [12.5, 40 ],
//					iconSize: [ 25, 40 ],
//					infoWindowAnchor: [1, -34]
//				});
//				if(!on){
//					map.gMap.on('click', function(e){
//						var marker = new sop.marker(e.utmk, 
//								{icon : markerIcon 
//							});
//						//주소검색
//						$catchmentAreaLeftMenu.ui.searchReverseGeoApi(e.utmk.x, e.utmk.y, marker);
//						
//						$catchmentAreaLeftMenu.ui.selectCoordinate_x = e.utmk.x;
//						$catchmentAreaLeftMenu.ui.selectCoordinate_y = e.utmk.y
//						map.markers.addLayer(marker);
//						 
//					});
//				}
//			},
			
			/**
			 * 
			 * @name         : getLocation
			 * @description  : 현재 위치 가져온다.
			 * 
			 */
			getLocation : function () {

				var center = [989674, 1818313];			// 대전 정부 청사
				var map = $catchmentAreaMain.ui.getMap();
				
				if (navigator.geolocation){
					navigator.geolocation.getCurrentPosition(function (position) {
						var utmkXY = new sop.LatLng(position.coords.latitude, position.coords.longitude);
						center = [ utmkXY.x, utmkXY.y ];
						var data = "?accessToken="+accessToken+"&addr_type=20"+"&x_coor="+center[0]+"&y_coor="+center[1];
						$.ajax({
							"url" : openApiPath + "/OpenAPI3/addr/rgeocode.json" + data	,		    
							"type" : "GET",
							"success" : function(data) {
												if(data.errCd=="-100" || data.errCd == "-401"){
													console.log("-100");
													map.mapMove(center, map.zoom); // 오류 해결(ERR03) : 지도 위치 정보 제공 클릭 후 지도 이동이 일어나지 않음
													map.openApiReverseGeoCode([ center[0], center[1] ]);
												}
												// 오류 해결(ERR03) 시작 : 지도 위치 정보 제공 클릭 후 지도 이동이 일어나지 않음
												else {
													map.mapMove(center, map.zoom);
												}
												// 오류 해결(ERR03) 끝 : 지도 위치 정보 제공 클릭 후 지도 이동이 일어나지 않음
											},
						"async" : "false",
						"dataType" : "json",
						"error": function(x,o,e){
								map.mapMove([ 989674, 1818313 ], map.zoom);	
								map.openApiReverseGeoCode([ 989674, 1818313 ]);
							}
						});						
				}, function (error) {
					map.mapMove([ 989674, 1818313 ], map.zoom);
					map.openApiReverseGeoCode([ 989674, 1818313 ]);
					console.log("브라우져가 기능을 제공하지 않습니다.");
					});
				}else{
					$catchmentAreaLeftMenu.ui.mapMove(989674,1818313);
					console.log("브라우져가 기능을 제공하지 않습니다.");	// 오류 해결(ERR03) : 지도 위치 정보 제공 클릭 후 지도 이동이 일어나지 않음
				}
			},
			
			/**
			 * 
			 * @name         : setfacilityTypeSearchDatailList
			 * @description  : 중심 시설유형으로 찾기 선택 후 상세보기 리스트 조회
			 * 
			 */
			setfacilityTypeSearchDatailList : function(pParam){

				var params = pParam;
				var mode = params.mode;
				var area = "";
				
				if(mode == 'screen'){					
					area = 'RECTANGLE(';
					area += params.southWestX + ' ' + params.southWestY + ',';
					area += params.northEastX + ' ' + params.northEastY;
					area += ')';					
				}

				var sopPortalfacilityTypeSearchListObj = new sop.portal.facilityTypeSearchList.api();
				sopPortalfacilityTypeSearchListObj.addParam("mode", mode);
				sopPortalfacilityTypeSearchListObj.addParam("factypeCd", params.factypeCd);
				sopPortalfacilityTypeSearchListObj.addParam("classDeg", $catchmentAreaMain.ui.classDeg);
				sopPortalfacilityTypeSearchListObj.addParam("copr_base_year", $catchmentAreaMain.ui.statsBaseYear02[0]);
				if(mode == 'screen'){
					sopPortalfacilityTypeSearchListObj.addParam("area", area);
				}else{
					sopPortalfacilityTypeSearchListObj.addParam("sidoCd", params.sidoCd);
					sopPortalfacilityTypeSearchListObj.addParam("sggCd", params.sggCd);
					sopPortalfacilityTypeSearchListObj.addParam("emdCd", params.emdCd);
				}
				
				var async = false;
				if (params.async != undefined && params.async) {
					async = params.async;
				}

				sopPortalfacilityTypeSearchListObj.request({
					method : "POST",
					async : async,
					url : contextPath + "/ServiceAPI/OpenAPI3/catchmentArea/facilityTypeSearchList.json",
					options : {
						params : params,
						url : "/ServiceAPI/OpenAPI3/catchmentArea/facilityTypeSearchList.json"
					}
				});				
			},
			
			/**
			 * 
			 * @name         : getSufidCoordinate
			 * @description  : 중심 시설유형으로 찾기 선택 후 상세보기 리스트 조회 - 해당리스트 x,y 좌표 조회한다.
			 * 
			 */
			getSufidCoordinate : function(sufid, name, roadAdres, poiMapingval, mapId){
			
				var sopPortalgetSufidCoordinateObj = new sop.portal.getSufidCoordinate.api();
				sopPortalgetSufidCoordinateObj.addParam("sufid", sufid);
				sopPortalgetSufidCoordinateObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/OpenAPI3/catchmentArea/getSufidCoordinate.json",
					options : {
						callback : function(x,y,c){
							
							if(!mapId) mapId = 0;
							var thatMap = $catchmentAreaMain.ui.getMap(mapId);
							thatMap.markers.clearLayers(); //마커 초기화
							
							if(mapId === 0) {
								var selItm = $catchmentAreaLeftMenu.ui.map1PoiMarkerMap['selMarker'];
								if(selItm !== undefined && selItm !== null && !thatMap.markers3.hasLayer(selItm)){
									thatMap.markers3.addLayer(selItm);
								}
								
								var selMarker = $catchmentAreaLeftMenu.ui.map1PoiMarkerMap['sufid_' + sufid];
								$catchmentAreaLeftMenu.ui.map1PoiMarkerMap['selMarker'] = selMarker;
								$catchmentAreaMain.ui.getMap(mapId).markers3.removeLayer(selMarker);								
							}else if(mapId === 1) {
								var selItm = $catchmentAreaLeftMenu.ui.map2PoiMarkerMap['selMarker'];
								if(selItm !== undefined && selItm !== null && !thatMap.markers3.hasLayer(selItm)){
									thatMap.markers3.addLayer(selItm);
								}								
								
								var selMarker = $catchmentAreaLeftMenu.ui.map2PoiMarkerMap['sufid_' + sufid];
								$catchmentAreaLeftMenu.ui.map2PoiMarkerMap['selMarker'] = selMarker;
								$catchmentAreaMain.ui.getMap(mapId).markers3.removeLayer(selMarker);								
							}
							
							$catchmentAreaLeftMenu.ui.moveTargetArea(name, roadAdres, x, y, poiMapingval, mapId, "M3", 12, sufid);
						}
					}
				});
			},
			
			/**
			 * 
			 * @name         : getSrvareaScopeList
			 * @description  : 시설물 조건에 대한 생활권역 영역설정에 대한 리스트를 조회한 후 화면에 표출한다.
			 * 
			 */
			getSrvareaScopeList : function(factypeCd, x_coordinate , y_coordinate){
				var sopPortalgetSrvareaScopeListObj = new sop.portal.getSrvareaScopeList.api();
					sopPortalgetSrvareaScopeListObj.addParam("factype_cd", factypeCd);
				sopPortalgetSrvareaScopeListObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/OpenAPI3/catchmentArea/getSrvareaScopeList.json",
					options : {
						callback : function(t,d,r,a){
							$catchmentAreaLeftMenu.ui.t_default= t;
							$catchmentAreaLeftMenu.ui.d_default= d;
							$catchmentAreaLeftMenu.ui.r_default= r;
							//생활권역조회
							$catchmentAreaLeftMenu.ui.settingSrvAreaTimeMap(x_coordinate, y_coordinate, true);
							
							//초기값 세팅
							$("#type_t").children("a").each(function(){
					    		   var selectId = $(this).attr("id");
					    		   var selectVal = $(this).attr("value");
					    		   $.each(t, function(index, item){
					    			   if(selectVal == item){
					    				   $("#"+selectId).addClass("active");
						    		   }
					    		   });
					    	});
							
							// 도형색상과 일치
							$catchmentAreaLeftMenu.ui.setRangeDisplay('T');
						}
					}
				});
			},
			
			/**
			 * 
			 * @name         : getSearchScopeList
			 * @description  : 검색한 POI 에 대한 생활권역 영역설정에 대한 리스트를 조회한 후 화면에 표출한다.
			 * 
			 */
			getSearchScopeList : function(x_coordinate , y_coordinate){
				var sopPortalgetSearchScopeListObj = new sop.portal.getSearchScopeList.api();
					sopPortalgetSearchScopeListObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/OpenAPI3/catchmentArea/getSearchScopeList.json",
					options : {
						callback : function(t,d,r){
							$catchmentAreaLeftMenu.ui.t_default= t;
							$catchmentAreaLeftMenu.ui.d_default= d;
							$catchmentAreaLeftMenu.ui.r_default= r;
							//생활권역조회
							$catchmentAreaLeftMenu.ui.settingSrvAreaTimeMap(x_coordinate, y_coordinate, true);
							
							//초기값 세팅
							$("#type_t").children("a").each(function(){
					    		   var selectId = $(this).attr("id");
					    		   var selectVal = $(this).attr("value");
					    		   $.each(t, function(index, item){
					    			   if(selectVal == item){
					    				   $("#"+selectId).addClass("active");
						    		   }
					    		   });
					    	});
							
							// 도형색상과 일치
							$catchmentAreaLeftMenu.ui.setRangeDisplay('T');
						}
					
					}
				});
			},
			/**
			 * 
			 * @name         : settingSrvAreaMap
			 * @description  : 영향권맵
			 * 
			 */
			settingSrvAreaMap : function(flag, index){
				$catchmentAreaLeftMenu.ui.clearLayers();
				
				var base_year = $catchmentAreaLeftMenu.ui.getBaseYear();
				var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
				var x = $catchmentAreaLeftMenu.ui.selectCoordinate_x;
				var y = $catchmentAreaLeftMenu.ui.selectCoordinate_y;
				
				if(rangeType == "stats01"){//주행시간 기준
					$catchmentAreaLeftMenu.ui.settingSrvAreaTimeMap(x, y, flag);
				}else if(rangeType == "stats02"){//주행거리 기준
					$catchmentAreaLeftMenu.ui.settingSrvAreaDistanceMap(x, y, flag);
				}else{//반경기준
					$catchmentAreaLeftMenu.ui.settingCircleMap(x, y, flag);
				}
				
				//영향권 통계조회
//				$catchmentAreaLeftMenu.ui.settingStatisticsData(base_year, rangeType, index);
				$catchmentAreaDataBoard.event.getDataBoard(1);
			},
			
			/**
			 * 
			 * @name         : settingSrvAreaTimeMap
			 * @description  : 주행시간기준에 대한 세팅을 한다.
			 * 
			 */
			settingSrvAreaTimeMap : function(x_coordinate, y_coordinate, flag){
				if(flag){
					$catchmentAreaLeftMenu.ui.clearLayers();// 레이어 초기화
					var defaultTime = $catchmentAreaLeftMenu.ui.t_default;
					//x좌표, y좌표, defult값 여부,맵 id(오른쪽 0)/(왼쪽 1),주행시간(0)/주행거리(1)
					$catchmentAreaMain.arcgis.event.calculateSearchArea(x_coordinate, y_coordinate, defaultTime, 0,0)
					
				}else{
					$catchmentAreaLeftMenu.ui.clearLayers();// 레이어 초기화
					var areaMins = [];
					// SGIS4_1025_생활권역_임의영역 시작
					if($('#fixed_rndm').attr('value') == 'fixed')  {
						$("#type_t").children("a").each(function(){
				    		   var on = $(this).hasClass("active");
				    		   if(on){
				    			   areaMins.push($(this).attr('value'));
				    		   }
				    	});
					} else {
						$("#dynamicTbody a").each(function(){// SGIS4_생활권역_임의영역 수정
							var on = $(this).hasClass("active");
							if(on){
								areaMins.push($(this).attr('value'));
							}
						});
					}
					// SGIS4_1025_생활권역_임의영역 끝
					//x좌표, y좌표, defult값 여부,맵 id(오른쪽 0)/(왼쪽 1),주행시간(0)/주행거리(1)
					$catchmentAreaMain.arcgis.event.calculateSearchArea(x_coordinate, y_coordinate, areaMins, 0,0)
				}
			},
			
			/**
			 * 
			 * @name         : settingSrvAreaDistanceMap
			 * @description  : 주행거리기준에 대한 세팅을 한다.
			 * 
			 */
			settingSrvAreaDistanceMap : function(x_coordinate, y_coordinate, flag){
				if(flag){
					$catchmentAreaLeftMenu.ui.clearLayers();// 레이어 초기화
					var defaultDistances = $catchmentAreaLeftMenu.ui.d_default;
					//x좌표, y좌표, defult값 여부,맵 id(오른쪽 0)/(왼쪽 1),주행시간(0)/주행거리(1)
					$catchmentAreaMain.arcgis.event.calculateSearchArea(x_coordinate, y_coordinate, defaultDistances, 0,1)
					
				}else{
					$catchmentAreaLeftMenu.ui.clearLayers();// 레이어 초기화
					var areaDistances = [];
					// SGIS4_1025_생활권역_임의영역 시작
					
					if($('#fixed_rndm').attr('value') == 'fixed')  {
						$("#type_d").children("a").each(function(){
							var on = $(this).hasClass("active");
							if(on){
								areaDistances.push($(this).attr('value'));
							}
						});
					} else {
						$("#dynamicTbody a").each(function(){ // SGIS4_생활권역_임의영역 수정
							var on = $(this).hasClass("active");
							if(on){
								areaDistances.push($(this).attr('value'));
							}
						});
					}
					// SGIS4_1025_생활권역_임의영역 끝
					//x좌표, y좌표, defult값 여부,맵 id(오른쪽 0)/(왼쪽 1),주행시간(0)/주행거리(1)
					$catchmentAreaMain.arcgis.event.calculateSearchArea(x_coordinate, y_coordinate, areaDistances, 0,1)
				}
				
			},
			
			/**
			 * 
			 * @name         : settingCircleMap
			 * @description  : 반경기준에 대한 세팅을 한다.
			 * 
			 */
			settingCircleMap : function(x_coordinate, y_coordinate, flag){
				$catchmentAreaLeftMenu.ui.selectRangeArr = []; //초기화
				
				var endIdx;
				if(flag){
					$catchmentAreaLeftMenu.ui.clearLayers();// 레이어 초기화
					var map = $catchmentAreaMain.ui.getMap();
					var defaultRange = $catchmentAreaLeftMenu.ui.r_default;
					
					if(defaultRange.length > 0){
						endIdx = defaultRange.length - 1;	
						//default 값 세팅
						for(var i=endIdx; i>-1; i--){
							$catchmentAreaLeftMenu.ui.setCircleMarker(x_coordinate, y_coordinate, defaultRange[i], 0, i, endIdx);
							$catchmentAreaLeftMenu.ui.selectRangeArr.unshift(defaultRange[i]);							
						}						
//						$.each(defaultRange, function(index, item){					
//							$catchmentAreaLeftMenu.ui.setCircleMarker(x_coordinate, y_coordinate, item, 0, index, endIdx);
//							$catchmentAreaLeftMenu.ui.selectRangeArr.push(item);
//						});
					}
				}else{
					$catchmentAreaLeftMenu.ui.clearLayers();// 레이어 초기화
					var selectRange = [];
					
					// SGIS4_1025_생활권역_임의영역 시작
					if($('#fixed_rndm').attr('value') == 'fixed') {
						$("#type_r").children("a").each(function(){
				    		   var on = $(this).hasClass("active");
				    		   if(on){
				    			   selectRange.push($(this).attr('value'));
				    			   $catchmentAreaLeftMenu.ui.selectRangeArr.push($(this).attr('value'));
				    		   }
				    	});
					} else {
						$("#dynamicTbody a").each(function(){ // SGIS4_생활권역_임의영역 수정
							var on = $(this).hasClass("active");
							if(on){
								selectRange.push($(this).attr('value'));
								$catchmentAreaLeftMenu.ui.selectRangeArr.push($(this).attr('value'));
							}
						});
					}
					
					if(selectRange.length > 0){
						endIdx = selectRange.length - 1;
						for(var i=endIdx; i>-1; i--){
							$catchmentAreaLeftMenu.ui.setCircleMarker(x_coordinate, y_coordinate, selectRange[i], 0, i, endIdx);
						}						
//						$.each(selectRange, function(index, item){						
//							$catchmentAreaLeftMenu.ui.setCircleMarker(x_coordinate, y_coordinate, item, 0, index, endIdx);
//						});
					}
					// SGIS4_1025_생활권역_임의영역 끝
				}				
			},
			
			/**
			 * 
			 * @name         : setCircleMarker
			 * @description  : 반경기준 : 써클마커 생성한다.
			 * 
			 */
			setCircleMarker : function(x_coordinate, y_coordinate, radiusVal, mapId, currIdx, endIdx, selectIdx){ // 지도 구별을 위해 mapId 파라미터 추가 - 박상언 2020-10-21 추가

				mapId = mapId ? mapId : 0;	// mapId가 undefined, null, 0 값이 들어오면 0으로 초기화.
				var shpColorIdx = currIdx;
				if(selectIdx !== undefined){
					shpColorIdx = selectIdx;
				}
				
				var param = {};
				param.geoX = x_coordinate;
				param.geoY = y_coordinate;
				param.geoRadius = radiusVal;
				param.colorIdx = shpColorIdx;
				
				if(mapId === 0){
					$catchmentAreaObj.setCircleInfo(param);
				}else if(mapId === 1){
					$catchmentAreaObj.setTargetCircleInfo(param);
				}

				var circle = new sop.circle(sop.utmk(x_coordinate,y_coordinate), radiusVal,{
					stroke : true,
					weight : 1.5,
					opacity : 0.7,
					fill : true,
					fillColor : $catchmentAreaMain.ui.saShpColor[shpColorIdx],
					fillOpacity : 0.3,
					color : $catchmentAreaMain.ui.saShpColor[shpColorIdx],
//					clusterOption : false,
//					zIndexOffset: 10000,
					clickable : true
				});

				var map = $catchmentAreaMain.ui.getMap(mapId);	// mapId 인자값 추가
				map.markers2.addLayer(circle);

				circle.on({
					mouseover : function (e) {

						var layer = e.target;
						var color = "#457bf5";  //#434348
//						var fillColor = layer.options.fillColor;								

						layer.setStyle({
							color : color,
							fillOpacity : 0.5
						});

						//layer._hideToolTip();
						var geoData = {};
						geoData.rangeType = "C";
						geoData.rangeVal = radiusVal;
						$catchmentAreaMain.callbackFunc.didMouseOverPolygon(e, geoData, 'saShp', map);
					},
					mouseout : function (e) {

						var layer = e.target;
						var color = layer.options.fillColor;

						layer.setStyle({
							color : color,
							fillOpacity : 0.3
						});
						
						if(layer.tooltip){
							layer._hideToolTip();
						}
					},
					click : function (e) {						
						var geoData = {};
						geoData.rangeType = "C";
						geoData.rangeVal = radiusVal;
						$catchmentAreaMain.callbackFunc.didMouseClickPolygon(e, geoData, 'saShp', map);
					}
				});
	        	
				if(currIdx === endIdx){
					var outerBounds = circle.getBounds();
		        	if(outerBounds != undefined && outerBounds != null){
		        		map.gMap.fitBounds(outerBounds);
		        	}
				}
				
				//SGIS4_1210 추가 시작
	        	if($catchmentAreaDataBoard.ui.selectIndex > 0){
	        		if(currIdx == 0){
	        			circle.setStyle({
							//weight : weight,
							color : "#000000",
							//dashArray : dashArray,
							fillOpacity : 0.5,
							//fillColor : "#000000"
						});
	        		}
	        	}
	        	//SGIS4_1210 추가 끝
			},
			
			/**
			 * 
			 * @name         : settingStatisticsData
			 * @description  : 통계정보를 요청하기전 세팅작업을 한다.(영향권)
			 * 
			 */
//			settingStatisticsData : function(base_year, rangeType, index){
//				if(rangeType == "stats01" || rangeType == "stats02"){
//					var selectIndex = ($catchmentAreaLeftMenu.ui.selectPolygonPointsArr.length)-index;
//					var polyPoints = $catchmentAreaLeftMenu.ui.selectPolygonPointsArr[selectIndex];
//					var area = "";
//					area = 'POLYGON((';
//					for(var i = 0; i < polyPoints.length; i++) {
//						area += polyPoints[i][0] + " " + 
//						polyPoints[i][1] + ",";
//						
//						if(i == polyPoints.length - 1) {
//							area += polyPoints[i][0] + " " + 
//							polyPoints[i][1];
//						}					
//					}					
//					area += '))';
//					
//					var param  = {};
//					param.base_year = base_year
//					param.area = area;
//					param.srvAreaType = 1;	
//					
//					var params = $catchmentAreaLeftMenu.ui.reqSetParams("API_202006", param);
//					$catchmentAreaLeftMenu.ui.requestOpenApi(params);
//				}else{
//					var area = 'POINT('
//						area += $catchmentAreaLeftMenu.ui.selectCoordinate_x + " " + $catchmentAreaLeftMenu.ui.selectCoordinate_y;
//						area += ')';
//					var radius = $catchmentAreaLeftMenu.ui.selectRangeArr[index-1];
//					var param  = {};
//					param.base_year = base_year
//					param.area = area;
//					param.radius = radius
//					param.srvAreaType = 2;
//					
//					var params = $catchmentAreaLeftMenu.ui.reqSetParams("API_202006", param);
//					$catchmentAreaLeftMenu.ui.requestOpenApi(params);
//				}
//			},

			/**
			 * 
			 * @name         : requestSrvAreaStatsData
			 * @description  : 영향권 통계정보를 요청한다.
			 * 
			 */
			requestSrvAreaStatsData : function(pCategory, pPageNo){
				// pCategory: 0-전체, 1-인구/가구/주택, 2-사업체/종사자
				// pPageNo: 1~4
				
				$catchmentAreaDataBoard.ui.setServiceAreaHeaderData();
				var selectPolygonlen = 0; //SGIS4_1210 추가
				var param = {};
				var area = ""; 
				var radius;
				var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
				var rangeVal = $catchmentAreaLeftMenu.ui.getRangeVal('01', pPageNo);
				param.rangeType = rangeType;
				param.rangeVal = rangeVal;
				var shpArea = $catchmentAreaObj.getShapeArea(rangeType, rangeVal);
				srvLogWrite('Q0','03','02','01','선택 기준 값 - '+(rangeVal/60)+'분','');
				// 시설 유형으로 지점 선택이면, 사전 생성 격자번호 사용
//				if($catchmentAreaObj.selected_modeOfUse == "M3"){
//					var rangeCd = $catchmentAreaLeftMenu.ui.getRangeCd('01', pPageNo);
//					if(rangeCd !== ""){
//						param.sufid = $catchmentAreaObj.selected_sufid;
//						param.rangeCd = rangeCd;
//					}
//				}

				if(rangeType == "stats01" || rangeType == "stats02"){
					var selectIndex = $catchmentAreaLeftMenu.ui.selectPolygonPointsArr.length - pPageNo;
					var polyPoints = $catchmentAreaLeftMenu.ui.selectPolygonPointsArr[selectIndex];
					area = 'POLYGON((';
					for(var i = 0; i < polyPoints.length; i++) {
						area += polyPoints[i][0] + " " + 
						polyPoints[i][1] + ",";
						
						if(i == polyPoints.length - 1) {
							area += polyPoints[i][0] + " " + 
							polyPoints[i][1];
						}					
					}					
					area += '))';
					
					param.area = area;
					param.srvAreaType = 1;
					
					selectPolygonlen = $catchmentAreaLeftMenu.ui.selectPolygonPointsArr.length; //SGIS4_1210 추가
				}else if(rangeType == "stats03"){
					area = 'POINT(';
					area += $catchmentAreaLeftMenu.ui.selectCoordinate_x + " " + $catchmentAreaLeftMenu.ui.selectCoordinate_y;
					area += ')';
					radius = $catchmentAreaLeftMenu.ui.selectRangeArr[pPageNo-1];
					
					param.area = area;
					param.radius = radius;
					param.srvAreaType = 2;
					
					selectPolygonlen = $catchmentAreaLeftMenu.ui.selectRangeArr.length; //SGIS4_1210 추가
				}

				if(area != ""){
					// areaSize:면적, pops:인구, family:가구, house:주택, copr:사업체/종사자, s3:인구/가구/주택
					// var param01 = $.extend({}, param);
					param.base_year = $catchmentAreaMain.ui.getBaseYear("1");
					param.copr_base_year = $catchmentAreaMain.ui.getBaseYear("2");
					param.classDeg = $catchmentAreaMain.ui.classDeg;
					
					if(shpArea == undefined || shpArea == null || shpArea === 0){
						// 생활권역 도형정보에 면적 정보가 없으면(도형 및 면적 정보가 없을 경우는 없어야 함), 서버에 요청
						if(pCategory == '0'){										
							param.workGb = "areaSize";
							param.async = true;
	
							var storedInfo = $catchmentAreaObj.getStatisticsInfo("S01", param, "");
							if(storedInfo.addCnt > 0){					
								$catchmentAreaMain.ui.processWithStoredInfo("S01", storedInfo);
							}else{
								var params = $catchmentAreaLeftMenu.ui.reqSetParams("API_202092", param);
								$catchmentAreaLeftMenu.ui.requestOpenApi(params);
							}
						}
					}else{
						// 면적 정보가 있으면, 그리드 크기 결정
						var gLvl = $catchmentAreaMain.ui.getGridLevel(shpArea);
						param.grid_level = gLvl;
						//param.shpArea = shpArea;
						
						$("#areaSize").html($catchmentAreaDataBoard.ui.comma((Number(shpArea) / 1000000).toFixed(2)) + "㎢");
						$("#sec01AreaTxt").html($("#mapLocation_4").text()+' 기준');
					}
					
					var identifier = new Date().getTime();
					var remainCnt = 1;
					if(pCategory == '0'){
						remainCnt = 4;
					}else if(pCategory == '1'){
						remainCnt = 3;
					}
					
					param.identifier = identifier;
					$catchmentAreaMask.startProcess(identifier, remainCnt);
					
					if(pCategory == '1' || pCategory == '0'){
						var params;
						var storedInfo;

						param.workGb = "pops";
						//param.async = true;
						storedInfo = $catchmentAreaObj.getStatisticsInfo("S01", param, "");
						if(storedInfo.addCnt > 0){
							$catchmentAreaMask.endUnitWork(identifier);
							$catchmentAreaMain.ui.processWithStoredInfo("S01", storedInfo);
						}else{
							params = $catchmentAreaLeftMenu.ui.reqSetParams("API_202092", param);
							$catchmentAreaLeftMenu.ui.requestOpenApi(params);
						}						
						
						param.workGb = "family";
						//param.async = true;
						storedInfo = $catchmentAreaObj.getStatisticsInfo("S01", param, "");
						if(storedInfo.addCnt > 0){
							$catchmentAreaMask.endUnitWork(identifier);
							$catchmentAreaMain.ui.processWithStoredInfo("S01", storedInfo);
						}else{
							params = $catchmentAreaLeftMenu.ui.reqSetParams("API_202092", param);
							$catchmentAreaLeftMenu.ui.requestOpenApi(params);
						}
						
						param.workGb = "house";
						//param.async = true;
						storedInfo = $catchmentAreaObj.getStatisticsInfo("S01", param, "");
						if(storedInfo.addCnt > 0){
							$catchmentAreaMask.endUnitWork(identifier);
							$catchmentAreaMain.ui.processWithStoredInfo("S01", storedInfo);
						}else{
							params = $catchmentAreaLeftMenu.ui.reqSetParams("API_202092", param);
							$catchmentAreaLeftMenu.ui.requestOpenApi(params);
						}
						
/*						
						param.workGb = "s3";
						if(pCategory == '1'){
							param.async = false;
						}else{
							param.async = true;
						}
						
						storedInfo = $catchmentAreaObj.getStatisticsInfo("S01", param, "");
						if(storedInfo.addCnt > 0){						
							$catchmentAreaMain.ui.processWithStoredInfo("S01", storedInfo);
						}else{
							params = $catchmentAreaLeftMenu.ui.reqSetParams("API_202092", param);
							$catchmentAreaLeftMenu.ui.requestOpenApi(params);
						}
*/						
					}
					
					if(pCategory == '2' || pCategory == '0'){					
						var params;
						param.workGb = "copr";
						//param.async = false;
						
						var storedInfo = $catchmentAreaObj.getStatisticsInfo("S01", param, "");
						if(storedInfo.addCnt > 0){
							$catchmentAreaMask.endUnitWork(identifier);
							$catchmentAreaMain.ui.processWithStoredInfo("S01", storedInfo);
						}else{						
							params = $catchmentAreaLeftMenu.ui.reqSetParams("API_202092", param);
							$catchmentAreaLeftMenu.ui.requestOpenApi(params);
						}
					}
				}
				
				$catchmentAreaMain.ui.selectPolygonHighlight(rangeType, selectPolygonlen, pPageNo);//SGIS4_1210_데이터보드에서 보는 통계에 대한 도형 하이라이트 추가
			},

			/**
			 * 
			 * @name         : requestCharacteristicsStats
			 * @description  : 특성별 통계정보를 요청한다.
			 * 
			 */
			requestCharacteristicsStats : function(pIds, pNms){
				
				if(!pIds instanceof Array || !pNms instanceof Array){
					return false;
				}
				
				var loopCnt = pIds.length;
				if(!(loopCnt > 0 && loopCnt == pNms.length)){
					return false;
				}

				var param = {};
				var pageNo = $catchmentAreaDataBoard.ui.selectIndex;
				var area = ""; 
				var radius;
				var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
				var rangeVal = $catchmentAreaLeftMenu.ui.getRangeVal('01', pageNo);

				if(rangeType == "stats01" || rangeType == "stats02"){
					var selectIndex = $catchmentAreaLeftMenu.ui.selectPolygonPointsArr.length - pageNo;
					var polyPoints = $catchmentAreaLeftMenu.ui.selectPolygonPointsArr[selectIndex];
					area = 'POLYGON((';
					for(var i = 0; i < polyPoints.length; i++) {
						area += polyPoints[i][0] + " " + 
						polyPoints[i][1] + ",";
						
						if(i == polyPoints.length - 1) {
							area += polyPoints[i][0] + " " + 
							polyPoints[i][1];
						}					
					}					
					area += '))';
					
					param.area = area;
					param.srvAreaType = 1;
				}else if(rangeType == "stats03"){
					area = 'POINT(';
					area += $catchmentAreaLeftMenu.ui.selectCoordinate_x + " " + $catchmentAreaLeftMenu.ui.selectCoordinate_y;
					area += ')';
					radius = $catchmentAreaLeftMenu.ui.selectRangeArr[pageNo-1];
					
					param.area = area;
					param.radius = radius;
					param.srvAreaType = 2;
				}				
				
				if(area != ""){
					// pops:인구, family:가구, house:주택, copr:사업체/종사자, s3:인구/가구/주택
					param.base_year = $catchmentAreaMain.ui.getBaseYear("1");
					param.copr_base_year = $catchmentAreaMain.ui.getBaseYear("2");
					param.classDeg = $catchmentAreaMain.ui.classDeg;
					param.rangeType = rangeType;
					param.rangeVal = rangeVal;
					
					// TO-DO : grid_level 계산하기
					var shpArea = $catchmentAreaObj.getShapeArea(rangeType, rangeVal);
					var gLvl = $catchmentAreaMain.ui.getGridLevel(shpArea);
					param.grid_level = gLvl;
					
					// 마스크
					var identifier = new Date().getTime();
					param.identifier = identifier;
					var remainCnt = loopCnt;

					$catchmentAreaMask.startProcess(identifier, remainCnt);
					//SGIS4_1025_생활권역 시작
					if($catchmentAreaDataBoard.ui.dStatType != ""){
						param.stats_class_gb = $catchmentAreaDataBoard.ui.dStatType;
					}
					//SGIS4_1025_생활권역 끝

					var itemId, itemLbl, memCondCd, params;
					for(var i=0; i<loopCnt; i++){
		    		   itemId = pIds[i];
		    		   itemLbl = pNms[i];	        			
		    			   
	    			   if(itemId.startsWith("pops_")){
	    				   //인구 관련 조건
	    				   memCondCd = "pops_cond";
	    			   }else if(itemId.startsWith("family_")){
	    				   //가구 관련 조건
	    				   memCondCd = "family_cond";
	    			   }else if(itemId.startsWith("house_")){
	    				   //주택 관련 조건
	    				   memCondCd = "house_cond";
	    			   }else if(itemId.startsWith("copr_copr_")){
	    				   //사업체 관련 조건
	    				   memCondCd = "copr_cond";
	    			   }else if(itemId.startsWith("copr_employee_")){
	    				   //종사자 관련 조건
	    				   memCondCd = "employee_cond";
	    			   }
	    			   
	    			   params = $catchmentAreaMain.ui.reqSetParams("API_202094", param);
	    			   params[memCondCd] = itemId;
	    			   params[memCondCd + "_nm"] = itemLbl;	    			   
		    			   
	    			   var storedInfo = $catchmentAreaObj.getStatisticsInfo("S02", params, memCondCd);
	    			   if(storedInfo.addCnt > 0){
	    				   $catchmentAreaMask.endUnitWork(identifier);
	    				   $catchmentAreaMain.ui.processWithStoredInfo("S02", storedInfo);
	    			   }else{							
	    				   $catchmentAreaMain.ui.requestOpenApi(params);
	    			   }
		    	   }					
				}				
			},
			
			/**
			 * 
			 * @name         : requestGridStatsData
			 * @description  : 격자 통계정보를 요청한다.
			 * 
			 */
			requestGridStatsData : function(){
				
			},
			
			/**
			 * 
			 * @name         : sopPaging1
			 * @description  : 검색 div 페이징을 한다.
			 * 
			 */
			sopPaging1: function(totalCount, currentIndex) {
				var pageSize = 10;				
				var totalPage = Math.ceil( totalCount / pageSize);			
				$('#sopPaging1 .pages').paging({
					current:currentIndex+1,
					length : 10,
					max:totalPage,
					itemClass : 'page',
					itemCurrent : 'current',
					format : '{0}',
					next : '&gt;',
					prev : '&lt;',
					first : '&lt;&lt;',
					last : '&gt;&gt;',
					onclick:function(e,page){
						sopCurrentPageIndex1 = page-1;
						
						$catchmentAreaLeftMenu.ui.searchPlaceApi($("#searchWord").val(),  page)
					}
				});
			},
			
			/**
			 * 
			 * @name         : clearLayers
			 * @description  : 지도 위 레이어를 삭제한다(마커제외)
			 * 
			 */
			clearLayers : function(mapId){	// 지도 구별을 위해 파라미터 추가 - 박상언 2020-10-21 추가
				mapId = mapId ? mapId : 0;
				var map = $catchmentAreaMain.ui.getMap(mapId);
				var drawObj = null;
				if(mapId === 0) drawObj = $catchmentAreaMain.draw;
				else if(mapId === 1) drawObj = $catchmentAreaMain.draw2;
				else if(mapId === 2) drawObj = $catchmentAreaMain.draw3;
				
				map.clearToolTip();		//툴팁 초기화
				map.markers2.clearLayers(); //반경 기준 레이어
				drawObj.removePolygon(); //주행시간 기준 레이어
				map.clearDataOverlay(); //격자도형 초기화				
			},
			
			typeAllRemoveClass : function(type){
				
				if(type == "all"){
					$("#type_t").children("a").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
					$("#type_d").children("a").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
					$("#type_r").children("a").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
				}else if(type == "t"){
					$("#type_d").children("a").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
					$("#type_r").children("a").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
				}else if(type == "d"){
					$("#type_t").children("a").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
					$("#type_r").children("a").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
				}else {
					$("#type_t").children("a").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
					$("#type_d").children("a").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
				}
				
			},
			
			settingStatisticsDataList : function(){
				var html = "";
				var areaSettingNm = "";
				var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
				//SGIS4_1025_생활권역_임의영역 시작
				var rndmFlag = $catchmentAreaLeftMenu.ui.rndmFlag;
				var scopeType =  $('input[name=rndscopeType]:checked').val(); // SGIS4_생활권역_임의영역 수정
				var rndmScopeInfo = $catchmentAreaLeftMenu.ui.rndmScopeInfo[scopeType];

				if(rndmFlag) {
					$("#dynamicTbody a").each(function(){// SGIS4_생활권역_임의영역 수정
			    		   var on = $(this).hasClass("active");
			    		   if(on){
			    		   		html += '<li>'
			    		   		html += '<a href="javascript:void(0);" id="select_'+$(this).attr("id")+'" value="'+$(this).attr("value")+'">'+$(this).text()+'</a>' //SGIS4_생활권역_임의영역 수정
								html += '</li>'	
			    		   }
			    		   areaSettingNm = rndmScopeInfo.s_class_cd_nm;
			    	});
				} else {
					if(rangeType == "stats01"){
						$("#type_t").children("a").each(function(){
				    		   var on = $(this).hasClass("active");
				    		   if(on){
				    		   		html += '<li>'
				    		   		html += '<a href="javascript:void(0);" id="select_'+$(this).attr("id")+'" value="'+$(this).attr("value")+'">'+$(this).text()+'</a>'
									html += '</li>'	
				    		   }
				    	});
						areaSettingNm = "주행시간 기준";
					}else if(rangeType == "stats02"){
						$("#type_d").children("a").each(function(){
				    		   var on = $(this).hasClass("active");
				    		   if(on){
				    		   		html += '<li>'
				    		   		html += '<a href="javascript:void(0);" id="select_'+$(this).attr("id")+'" value="'+$(this).attr("value")+'">'+$(this).text()+'</a>'
									html += '</li>'
				    		   }
				    	});
						areaSettingNm = "주행거리 기준";
					}else{					
						$("#type_r").children("a").each(function(){
				    		   var on = $(this).hasClass("active");
				    		   if(on){
				    		   		html += '<li style="float: left;">'
				    		   		html += '<a href="javascript:void(0);" id="select_'+$(this).attr("id")+'" value="'+$(this).attr("value")+'">'+$(this).text()+'</a>'
									html += '</li>'
				    		   }
				    	});
						areaSettingNm = "반경 기준";
					}
					//SGIS4_1025_생활권역_임의영역 끝
				}
				$("#statsType01 ul").html(html);
				$("#statsType02 ul").html(html);
				$("#statsType03 ul").html(html);
				
				$("#areaSettingNm").html(areaSettingNm);

				$catchmentAreaLeftMenu.event.setSataRangeUIEvent();
			},

			/**
			 * 
			 * @name         : prechkForReqGridStat
			 * @description  : 그리드 통계 호출전에 격자 크기를 체크한다.
			 * 
			 */
			prechkForReqGridStat : function(){

				var gLvl = $(".grid_size").children("a.active").data("gridLevelDiv");
				var gLvlNm = $(".grid_size").children("a.active").text();
				var gLvlNo = $catchmentAreaLeftMenu.ui.getGridValueAsNum(gLvl);
				var chkMsg = "";
				
				if(gLvlNo >= 0){
					var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
					var rangeVal = $catchmentAreaLeftMenu.ui.getRangeVal('02');
					var shpArea = $catchmentAreaObj.getShapeArea(rangeType, rangeVal);
					
					if(shpArea > 0){
						// 향후 추가되는 그리드에 대해선 알아서 고쳐써, 어느 크기에 느려질지 어찌 알겠누
						if(gLvlNo <= 200){		// 선택한 그리드가 200m 이하 일 때
							if(shpArea > 10000000){		// shpArea > 10km2 and
								chkMsg = "10㎢ 초과 면적을 " + gLvlNm + " 격자 크기로 조회할 경우, 시간이 다소 소요됩니다.<br/>진행하시겠습니까?";
							}							
						}else if(gLvlNo <= 500){		// 선택한 그리드가 200m 초과 500m 이하 일 때
							if(shpArea > 50000000){		// shpArea > 50km2 and
								chkMsg = "50㎢ 초과 면적을 " + gLvlNm + " 격자 크기로 조회할 경우, 시간이 다소 소요됩니다.<br/>진행하시겠습니까?";
							}	
						}	
					}
				}
				
				return chkMsg;
			},
			
			/**
			 * 
			 * @name         : settingGridAreaMap
			 * @description  : 격자맵
			 * 
			 */
			settingGridAreaMap : function(base_year, rangeType, index){
				
				// 주제별 총값 제공 여부 확인
				var isLimitedMode = false;
				if($('#gridSettingLess1k').is(':visible')){
					isLimitedMode = true;
				}
				
				// 주제별 총값 제공 화면이 off이면(1k 이상 격자가 선택된 상태)
				if(!isLimitedMode){
					if(!$catchmentAreaLeftMenu.ui.checkGridStatConfigure('gridSetting', true)){
						return;
					}					
				}				

				$catchmentAreaLeftMenu.ui.clearLayers();
				var polyPoints = [];
				var param  = {};
				param.base_year = base_year;
				param.classDeg = $catchmentAreaMain.ui.classDeg; 
				var gridLvl = $(".grid_size").children("a.active").data("gridLevelDiv");
				if(gridLvl == undefined || gridLvl == null){
					caMessageAlert.open("알림", "격자크기를 선택해주세요.");
					return false;					
				}				
				param.grid_level = gridLvl;
				param.grid_level_nm = $(".grid_size").children("a.active").text();
				this.gridMapRequestor = "grid";
				
				var rangeVal = $catchmentAreaLeftMenu.ui.getRangeVal('02');
				param.rangeType = rangeType;
				param.rangeVal = rangeVal;
				
				// 시설 유형으로 지점 선택이면, 사전 생성 격자번호 사용
//				if($catchmentAreaObj.selected_modeOfUse == "M3"){
//					var rangeCd = $catchmentAreaLeftMenu.ui.getRangeCd('02');
//					if(rangeCd !== ""){
//						param.sufid = $catchmentAreaObj.selected_sufid;
//						param.rangeCd = rangeCd;
//					}
//				}

				//민정 수정중 크기에 따라로 변경
				//격자크기 100m는 zoom레벨 10, 1km는 zoom레벨 8
//				if(param.grid_level == 100){
//					param.zoom = 10;
//				}else{
//					param.zoom = 8;
//				}
				
				//통계타입 : 인구 pops , 가구 family , 주택 house, 사업체 copr , 공시지가 idlv
				if(isLimitedMode){
					param.statType = $("#gridSettingLess1k").children("li.active").attr("data-stat-type");
					this.setGridStatConfigureLess1k(param,'gridSettingLess1k');
				}else{
					param.statType = $("#gridSetting").children("li.active").attr("id");
					//격자상세조건
					this.setGridStatConfigure(param,'gridSetting');
				}

				//this.getGridShowingInfo(param, this.gridMapRequestor);	// 툴팁에서 데이터를 보여줄 때 필요한 것들을 param에 저장한다.
				
				//param.async = false;
				var identifier = new Date().getTime();								
				param.identifier = identifier;
				var remainCnt = 2;		// 통합 조회로 바꾸면 1로 수정

				if(rangeType == "stats01" || rangeType == "stats02"){
					var selectLength = ($catchmentAreaLeftMenu.ui.selectPolygonPointsArr.length)-index
					var polygonPoints = $catchmentAreaLeftMenu.ui.selectPolygonPointsArr[selectLength];
					
					var area = "";
					area = 'POLYGON((';
					for(var i = 0; i < polygonPoints.length; i++) {
						area += polygonPoints[i][0] + " " + 
						polygonPoints[i][1] + ",";
						
						if(i == polygonPoints.length - 1) {
							area += polygonPoints[i][0] + " " + 
							polygonPoints[i][1];
						}					
					}					
					area += '))';
					param.area = area;
					param.polygonPoints = polygonPoints;
					param.srvAreaType = 1;

					$catchmentAreaMask.startProcess(identifier, remainCnt);
					
					//지도 통계조회
					var params_1 = $catchmentAreaLeftMenu.ui.reqSetParams("API_202007", param);
					$catchmentAreaLeftMenu.ui.requestOpenApi(params_1);
					
					//데이터보드 통계조회
					var params_2 = $catchmentAreaLeftMenu.ui.reqSetParams("API_202010", param);
					$catchmentAreaLeftMenu.ui.requestOpenApi(params_2);
					
					//통합 조회
//					var params_3 = $catchmentAreaLeftMenu.ui.reqSetParams("API_202097", param);
//					$catchmentAreaLeftMenu.ui.requestOpenApi(params_3);

				}else{
					//포인트, 반경기준
					var selectRange = $catchmentAreaLeftMenu.ui.selectRangeArr[index-1];
					var area = 'POINT('
						area += $catchmentAreaLeftMenu.ui.selectCoordinate_x + " " + $catchmentAreaLeftMenu.ui.selectCoordinate_y;
						area += ')';
						
					param.area = area;
					param.radius = selectRange;
					param.srvAreaType = 2;

					$catchmentAreaMask.startProcess(identifier, remainCnt);
					
					//지도 통계조회
					var params_1 = $catchmentAreaLeftMenu.ui.reqSetParams("API_202007", param);
					$catchmentAreaLeftMenu.ui.requestOpenApi(params_1);
					
					//데이터보드 통계조회
					var params_2 = $catchmentAreaLeftMenu.ui.reqSetParams("API_202010", param);
					$catchmentAreaLeftMenu.ui.requestOpenApi(params_2);
					
					//통합 조회
//					var params_3 = $catchmentAreaLeftMenu.ui.reqSetParams("API_202097", param);
//					$catchmentAreaLeftMenu.ui.requestOpenApi(params_3);
				}
	
			},
			
			/**
			 * 
			 * @name         : requestCorrelationAnalysis
			 * @description  : 상세보기 - 상관관계 분석에 대한 API 요청을 한다.
			 * 
			 */
			requestCorrelationAnalysis : function(pIds, pNms){

			    if(!pIds instanceof Array || !pNms instanceof Array){
			        return false;
			    }

			    var loopCnt = pIds.length;
			    if(!(loopCnt > 0 && loopCnt == pNms.length)){
			        return false;
			    }

			    var param = {};
			    //var pageNo = $catchmentAreaDataBoard.ui.selectIndex;
			    var pageNo = $('#statsType03 > ul li.active').index() + 1;
			    var area = ""; 
			    var radius;
			    var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
			    var rangeVal = $catchmentAreaLeftMenu.ui.getRangeVal(rangeType, pageNo);

			    if(rangeType == "stats01" || rangeType == "stats02"){
			        var selectIndex = $catchmentAreaLeftMenu.ui.selectPolygonPointsArr.length - pageNo;
			        var polyPoints = $catchmentAreaLeftMenu.ui.selectPolygonPointsArr[selectIndex];


			        area = 'POLYGON((';
			        for(var i = 0; i < polyPoints.length; i++) {
			            area += polyPoints[i][0] + " " + 
			                polyPoints[i][1] + ",";

			            if(i == polyPoints.length - 1) {
			                area += polyPoints[i][0] + " " + 
			                    polyPoints[i][1];
			            }					
			        }					
			        area += '))';

			        param.area = area;
			        param.srvAreaType = 1;
			    }else if(rangeType == "stats03"){
			        area = 'POINT(';
			        area += $catchmentAreaLeftMenu.ui.selectCoordinate_x + " " + $catchmentAreaLeftMenu.ui.selectCoordinate_y;
			        area += ')';
			        radius = $catchmentAreaLeftMenu.ui.selectRangeArr[pageNo-1];

			        param.area = area;
			        param.radius = radius;
			        param.srvAreaType = 2;
			    }				

			    if(area != ""){
			        // pops:인구, family:가구, house:주택, copr:사업체/종사자, s3:인구/가구/주택
			        param.base_year = "2019";//$catchmentAreaMain.ui.getBaseYear("6");
			        param.copr_base_year = companyDataYear;//$catchmentAreaMain.ui.getBaseYear("2");
			        param.classDeg = $catchmentAreaMain.ui.classDeg;
			        param.rangeType = rangeType;
			        param.rangeVal = rangeVal;
			    }

			    var shpArea = $catchmentAreaObj.getShapeArea(rangeType, rangeVal);
			    var gLvl = "1k";//$catchmentAreaMain.ui.getGridLevel(shpArea);
			    param.grid_level = gLvl;


			    var identifier = new Date().getTime();
			    param.identifier = identifier;
			    var remainCnt = loopCnt;

			    //$catchmentAreaMask.startProcess(identifier, remainCnt);	

			    var itemId, itemLbl, memCondCd, params;

			    // pIds, pNms 같은 인덱스상에는 각 pIds에 필요한 params 를 넣는다.
			    var complexOption = [];
			    for(var i=0; i<loopCnt; i++){
			        itemId = pIds[i];
			        itemLbl = pNms[i];

			        if(itemId.startsWith("pops_")){
			            //인구 관련 조건
			            memCondCd = "pops_cond";
			        }else if(itemId.startsWith("family_")){
			            //가구 관련 조건
			            memCondCd = "family_cond";
			        }else if(itemId.startsWith("house_")){
			            //주택 관련 조건
			            memCondCd = "house_cond";
			        }else if(itemId.startsWith("copr_copr_")){
			            //사업체 관련 조건
			            memCondCd = "copr_cond";
			        }else if(itemId.startsWith("copr_employee_")){
			            //종사자 관련 조건
			            memCondCd = "employee_cond";
			        }

			        params = $catchmentAreaMain.ui.reqSetParams("API_202095", param);
			        params[memCondCd] = itemId;
			        params[memCondCd + "_nm"] = itemLbl;
			        params["itemId"] = itemId;
			        params["itemLbl"] = itemLbl;

			        complexOption.push(params);
			    }

			    $catchmentAreaMain.ui.requestOpenApi("API_202095", complexOption);
			},
			
			//격자통계조건 설정
			settingGridScopeList : function(){
				var sopPortalgetGridScopeListObj = new sop.portal.sopPortalgetGridScopeList.api();
				sopPortalgetGridScopeListObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/OpenAPI3/catchmentArea/getGridScopeList.json",
				});
			},	 
			
			getBaseYear : function(){
				var base_year = "2018"
				return base_year;
			},
			
			// SGIS4_1025_생활권역_임의영역 시작
			getRangeType : function(){
				if($catchmentAreaLeftMenu.ui.rndmFlag) { 
					var id = $('input[name=rndscopeType]:checked').attr("id"); // SGIS4_생활권역_임의영역 수정
					var rangeType = id.substring(3,10); // 선택된 기준구분의 value값 // SGIS4_생활권역_임의영역 수정
				} else {
					var rangeType = $("input[name='stats_radio']:checked").attr("id");
				}
				return rangeType;
				
//				var rangeType = $("input[name='stats_radio']:checked").attr("id");
//				return rangeType;
			},
			// SGIS4_1025_생활권역_임의영역 끝
			
			getRangeVal : function(pType, pNo){
				// pType : 01-영역 내 전체 정보, 02-격자 분포, 03-상세분석
				var rangeVal = "";
				var $statsType;
				
				if(pType == "01"){
					var seq = pNo - 1;
					$statsType = $('#statsType01');
					
					if($statsType != undefined && $statsType != null){
						rangeVal = $statsType.find('li.active').eq(seq).find('a').attr('value');
					}					
				}else{
					if(pType == "02"){
						$statsType = $('#statsType02');
					}else if(pType == "03"){
						$statsType = $('#statsType02'); //SGIS4_1025_생활권역_상세분석 상세분석이 격자분포로 이사가서 수정 
					}
					
					if($statsType != undefined && $statsType != null){
						rangeVal = $statsType.find('li.active').find('a').attr('value');
					}					
				}

				return rangeVal;
			},
			
			//SGIS4_1028_생활권역 시작
			/**
			 * 
			 * @name         : getRangeVal2
			 * @description  : 영역설정 단계에서의 선택된 기준값을 반환한다.
			 * 
			 */			
			getRangeVal2 : function(pNo){
				var rangeVal = "";
				var $bowl;
				var rndmFlag = $catchmentAreaLeftMenu.ui.rndmFlag;
				var seq = pNo - 1;
				
				if(rndmFlag){
					$bowl = $('#dynamicTbody');
					if($bowl != undefined && $bowl != null){
						rangeVal = $bowl.find('a.active').eq(seq).attr('value');
					}					
				}else{
					var rangeType = $("input[name='stats_radio']:checked").attr("id");
					if(rangeType == "stats01"){
						$bowl = $('#type_t');
					}else if(rangeType == "stats02"){
						$bowl = $('#type_d');
					}else if(rangeType == "stats03"){
						$bowl = $('#type_r');
					}
					if($bowl != undefined && $bowl != null){
						rangeVal = $bowl.find('a.active').eq(seq).attr('value');
					}
				}

				return rangeVal;
			},			
			//SGIS4_1028_생활권역 끝			

			/**
			 * 
			 * @name         : getRangeCd
			 * @description  : 사전생성 대상에 해당하면 범위 코드값을 반환한다.
			 * 
			 */
			getRangeCd : function(pType, pNo){
				// pType : 01-영역 내 전체 정보, 02-격자 분포, 03-상세분석
				var rangeCd = "";
				var rangeTmpCd = "";
				var rangeVal = "";
				var $statsType;
				
				if(pType == "01"){
					var seq = pNo - 1;
					$statsType = $('#statsType01');
					
					if($statsType != undefined && $statsType != null){
						rangeVal = $statsType.find('li.active').eq(seq).find('a').attr('value');
						rangeTmpCd = $statsType.find('li.active').eq(seq).find('a').attr('id').split('_')[1];
					}					
				}else{
					if(pType == "02"){
						$statsType = $('#statsType02');
					}else if(pType == "03"){
						$statsType = $('#statsType03');
					}
					
					if($statsType != undefined && $statsType != null){
						rangeVal = $statsType.find('li.active').find('a').attr('value');
						rangeTmpCd = $statsType.find('li.active').find('a').attr('id').split('_')[1];
					}					
				}
			
			    // 주행시간은 900(15분, 20분) 이상, 주행거리 및 반경은 4000(4km, 5km) 이상
				if(rangeTmpCd.startsWith('T')){
					if(Number(rangeVal) >= 900){
						rangeCd = rangeTmpCd;
					}
				}else{
					if(Number(rangeVal) >= 4000){
						rangeCd = rangeTmpCd;
					}
				}

				return rangeCd;				
			},
			
			/*----------------------------- 상세분석 기능 개발(메소드 작성) 시작 - 박상언(pse) ----------------------------------- */
			/**
			 * 
			 * @name         : setSyncGrid
			 * @description  : 상세 분석에서 그리는 지도 및 데이터보드 생성 과정을 담은 메소드이다.
			 * 
			 */
			setSyncGrid : function(isLimitedMode, detailSelectOption){
				// 기본 Validation Check
				//if(!$catchmentAreaLeftMenu.ui.checkGridStatConfigure('gridSettingForDetail', true)) return;
				
				detailSelectType = detailSelectOption || null;
				
				var this_ = this;
				var common = this.setGridCommonConfig(isLimitedMode);
				
				var map1 = $catchmentAreaMain.ui.getMap(0);
				var map2 = $catchmentAreaMain.ui.getMap(1);
				
				// 깊은 복사를 통해서 좌, 우의 지도에서 사용할 파라미터를 담은 객체를 만든다.
				var leftMapOption = $.extend(true, {}, common); 
				var rightMapOption = $.extend(true, {}, common);
				
				this.setGridDiffConfig(0,leftMapOption);
				this.setGridDiffConfig(1,rightMapOption);
				if(detailSelectType) {
					if(detailSelectType.type == 'year') {
						leftMapOption['base_year']  = detailSelectType.base_year1;
						rightMapOption['base_year'] = detailSelectType.base_year2;
						common['requestFromYear'] = true;
						common['yearVSyear'] = [detailSelectType.base_year1 + ' : ' + detailSelectType.base_year2];
						common['left_base_year'] = detailSelectType.base_year1;
						common['right_base_year'] = detailSelectType.base_year2;
					}
				}
				
				var rangeVal = $catchmentAreaLeftMenu.ui.getRangeVal('03');
				leftMapOption.rangeVal = rangeVal;
				//SGIS4_1025_생활권역 시작
				leftMapOption.radius = $catchmentAreaLeftMenu.ui.selectRangeArr[$('#statsType02 > ul > li.active').index()]; // 상세분석 반경으로 선택시 radius 파라미터 초기화되서 추가
				rightMapOption.rangeVal = rangeVal;
				rightMapOption.radius = $catchmentAreaLeftMenu.ui.selectRangeArr[$('#statsType02 > ul > li.active').index()]; // 상세분석 반경으로 선택시 radius 파라미터 초기화되서 추가
				//SGIS4_1025_생활권역 끝
				
				
				var polygonPoints_0 = leftMapOption.polygonPoints
				var polygonPoints_1 = rightMapOption.polygonPoints
				
				console.log(leftMapOption);
				console.log(rightMapOption);
				
				// 로딩화면이 보이도록 한다.
				$('#layer_pop07_cancel').trigger('click');	// 반드시 setGridCommonConfig가 호출된 이후에 실행한다. 안그러면 [주택 탭] 선택 후  setGridStatConfigure 메소드를 거칠 때  건축년도, 연면적에 대한 값이 무시된다.
				var useForBlock = new gis.service.absAPI();
				useForBlock.onBlockUIPopup();
				
				// 두 개의 AJAX 에서 모두 결괏값을 받으면 아래의 then(function(result){~}) 이 실행된다.
				// AJAX 요청 중에서 하나라도 실패하면 catch(function(error){~}) 로 간다.
				Promise.all([
					$catchmentAreaMainApi.request.getGridInfo(leftMapOption),
					$catchmentAreaMainApi.request.getGridInfo(rightMapOption)
				]).then(function(result){	// 좌측, 우측 격자에 대한 모든 데이터를 읽은 후 이 함수가 실행된다.
					
					console.log(result);
					// 좌측 지도든 우측 지도든 조회되는 데이터가 없으면 비교분석의 진행을 막는다. [START]
					var whichMap = null;
					var leftDataEmpty  = !result[0].result.result;
					var rightDataEmpty = !result[1].result.result;
					if(leftDataEmpty || rightDataEmpty) {
						var errorMapName = (leftDataEmpty && rightDataEmpty) ? "양쪽 지도" : (leftDataEmpty ? "좌측 지도" : "우측 지도" );
						//SGIS4_1027_생활권역 시작
						var errorMsg = errorMapName  
										+ "에 검색결과가 존재하지 않습니다.<br>" 
										+ "비교를 위해서는 양쪽 모두 조회되는<br>"
										+ "데이터가 존재해야 합니다.";
						caMessageAlert.open("알림", errorMsg);
						throw new Error(errorMapName +"에 조회되는 데이터가 없음, 상세비교 불가, 프로그래밍적으로 필요한 에러임, 오류 아님.");
						//SGIS4_1027_생활권역 끝
					}
					// 좌측 지도든 우측 지도든 조회되는 데이터가 없으면 비교분석의 진행을 막는다. [END]
					var ajaxResult1 = result[0].result;
					var ajaxResult2 = result[1].result;
					
					var type = "";
					if(common.rangeType === "stats01") {
						type = "time";
					} else if(common.rangeType === "stats02") {
						type = "distance"
					} else if(common.rangeType === "stats03") {
						type = "circle";
					}
					
					this_.clearLayers(0);
					this_.clearLayers(1);
					
					ajaxResult1['show1'] = common['show1'];
					ajaxResult1['show2'] = common['show2'];
					ajaxResult2['show1'] = common['show1'];
					ajaxResult2['show2'] = common['show2'];
					
					leftMapOption.filter = leftMapOption.filterParam;	// 기존 $catchmentAreaMainApi.request.setGridData 코드에서 사용하기 위한 작업이다.
					rightMapOption.filter = rightMapOption.filterParam;	// 기존 $catchmentAreaMainApi.request.setGridData 코드에서 사용하기 위한 작업이다.

					$catchmentAreaMain.ui.createSrvAreaShape(leftMapOption.rangeType, leftMapOption.rangeVal, leftMapOption.mapId);
					if(common['requestFromYear']) {					
						$catchmentAreaMain.ui.createSrvAreaShape(leftMapOption.rangeType, leftMapOption.rangeVal, rightMapOption.mapId, 'Y');
					}else{
						$catchmentAreaMain.ui.createSrvAreaShape(rightMapOption.rangeType, rightMapOption.rangeVal, rightMapOption.mapId);
					}
					
					// 격자 지도에 필요한 GeoJson을 읽어온다. 그리고 읽어온 후에는 격자 지도를 앞서 구한 데이터와 매핑을 하여 격자 지도를 그린다.
					// 주의 )  아래 메소드는 운이 안 좋으면 오래 걸린다. 격자에 대한 geojson을 불러오는 과정과 그 geojson 하나하나를 데이터를 맺어줘야 하다보니 시간이 오래 걸린다. 
					//       추가로 100m 격자를 사용하는 경우가 잦아서 더 시간이 많이 걸린다.
					return Promise.all([
						$catchmentAreaMainApi.request.setGridData(ajaxResult1,	{params : leftMapOption,  url:"/ServiceAPI/OpenAPI3/catchmentArea/getGridSrvAreaGridStatDataList.json"}, type, 0, true),
						$catchmentAreaMainApi.request.setGridData(ajaxResult2,	{params : rightMapOption, url:"/ServiceAPI/OpenAPI3/catchmentArea/getGridSrvAreaGridStatDataList.json"}, type, 1, true)
					]);
					
					
				}).then(function(result){	// 왼쪽, 오른쪽 "격자 지도"가 모두 그려지면 이 함수가 실행된다. legendCopy를 사용하기 위함이다.
					
					var map1 = result[0];
					var map2 = result[1];
					var map1OriginalLegendBoundary = map1.legend.valPerSlice[0].slice();
					var map2OriginalLegendBoundary = map2.legend.valPerSlice[0].slice();
					
					result[1].legend.legendCopy(0, true); // 오른쪽 격자 지도는 왼쪽 격자에서 사용되는 범례 구간을 사용해서 새로이 격자 지도를 색칠된다.
					
					// map1 이나 map2나 valPerSlice[0] 배열이 같은 값들을 갖는다. legendCopy로 인해서 두 개의 valPerSlice가 같아 지기 때문이다.
					// 그러니 map1.legend.valPerSlice[0] 쓰든 map2.legend.valPerSlice[0]를 쓰든 , 그것은 본인 자유다.
					var legendArr = map1.legend.valPerSlice[0].slice();
					var fixedLegendVal1 = cLegendInfo.catchmentAreaLegendInfo.fixed_legend_data_duplicate_remain1.slice(); 
					var fixedLegendVal2 = cLegendInfo.catchmentAreaLegendInfo.fixed_legend_data_duplicate_remain2.slice();
					
					// 각각 데이터에 대한 정보를
					var dataCntPerSection1 = this_.cntDataByLegendSection(legendArr, fixedLegendVal1);
					var dataCntPerSection2 = this_.cntDataByLegendSection(legendArr, fixedLegendVal2);
					
					// 데이터 보드에 사용될 데이터를 구해온다. 마지막 Promise.resolve은 다음 then의 콜백 함수의 result에 넣기 위한 것이다. 데이터보드의 차트를 그릴 때 필요하다.
					return Promise.all([
						new Promise(function(resolve,reject){  $catchmentAreaMainApi.request.getGridSrvAreaDataBoardList(leftMapOption,  {resolve:resolve, reject:reject}) }),
						new Promise(function(resolve,reject){  $catchmentAreaMainApi.request.getGridSrvAreaDataBoardList(rightMapOption, {resolve:resolve, reject:reject}) }),
						Promise.resolve([dataCntPerSection1, dataCntPerSection2]),
						Promise.resolve([map1OriginalLegendBoundary, map2OriginalLegendBoundary])
					]);
				}).then(function(result){ // 여기서 데이터 보드를 그린다.
					common['cntPerLegend'] = result[2];
					common['originalLegendBoundary'] = result[3];
					$catchmentAreaDataBoard.ui.settingDetailGridDataBoard(result[0].result, result[1].result, common);
					$catchmentAreaDataBoard.event.getDataBoard(3);
					useForBlock.onBlockUIClose();
					useForBlock = common = leftMapOption = rightMapOption = this_ = null;	// 클로저 데이터 모~두 해제
				}).catch(function(error){
					console.error('setSyncGrid Promise Error!!');
					console.error(error.stack);// error.stack 은 ie11부터 지원한다. 그냥 error를 출력하면 어디서 에러가 났는지 알기가 조금 힘들다.
					useForBlock.onBlockUIClose();
					useForBlock = common = leftMapOption = rightMapOption = this_ = null;	// 클로저 데이터 모~두 해제
				});
				
				// finally는 IE에서 동작을 안함. IE 제발 없어져라.
				
				
			},
			
			/**
			 * 
			 * @name         : cntDataByLegendSection
			 * @description  : 범례 구간별로 실제 데이터가 몇개 되는지를 세어서 배열에 담아 반환한다.
			 * 				   
			 */
			cntDataByLegendSection : function(legendArr, dataArr) {
				
				var tmp = [];
				var dataSlice = $catchmentAreaMain.ui.getMap(0).legend.calCntPerGugan2(legendArr,dataArr);	// map.id 가 0이든 1이든 상관없다. 결국 calCntPerGugan2는 똑같이 동작한다.
				var legendSection = "";
				dataSlice.forEach(function(item, i){
					
					if(i == 0) {
				    	legendSection = legendArr[i+1] +' 이하';
				    } else if (i == (dataSlice.length - 1)) {
				    	legendSection = legendArr[i] + ' 초과' 
				    } else {
				    	legendSection = legendArr[i] + ' ~ ' + legendArr[i+1]
				    }
				    var result = {
				    		legendSection : legendSection
				    }
				    result['cnt'] = item;
				    tmp[i] = result;
				});
				/*
				legendArr.forEach(function(boundary,i){
				    if(i === legendArr.length - 1) return;
				    
				    var isLastLoop = i === legendArr.length - 2;	// 마지막 루프를 도는 것인지 확인한다.
				    
				    var min = i === 0 ? legendArr[i] - 1 : legendArr[i];
				    var max = isLastLoop ? Infinity : legendArr[i+1];	// 마지막 루프에서 legendArr의 맨 끝 값, 즉 가장 큰값을 사용하는 것을 방지한다. 대신 Infinity를 사용한다.
				    var acc = 0;
				    
				    if(i == 0) {
				    	legendSection = legendArr[i+1] +' 이하';
				    } else if (isLastLoop) {
				    	legendSection = legendArr[i] + ' 초과' 
				    } else {
				    	legendSection = legendArr[i] + ' ~ ' + legendArr[i+1]
				    }
				    var result = {
				    		legendSection : legendSection
				    }
				    
				    // 하나의 범례 구간에 대해서 데이터 배열에서 해당 구간에 부합하는 데이터가 있으면 acc++;
				    dataArr.forEach(function(item,index){
				        if((item > min)  &&  (item <= max)) acc++;
				    });
				    
				    result['cnt'] = acc;
				    tmp[i] = result;
				    
				});
				*/
				return tmp;
			},
			
			/**
			 * 
			 * @name         : setGridCommonConfig
			 * @description  : 상세분석에서 양쪽 지도에 각각 격자 데이터를 얻어오기 위해 AJAX 요청을 할 때, 공통적으로 사용하는 조건값들
			 * 
			 */
			setGridCommonConfig : function(isLimitedMode){
				
				this.gridMapRequestor = "detailAnalysis";
				
				var option  = {};
				
				option.accessToken = accessToken;
				
				option.base_year = $catchmentAreaMain.ui.getBaseYear('4');	// 상세 분석 조건 설정에서 사용하는 기준 연도를 읽어온다.

				option.rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
				
				option.classDeg = $catchmentAreaMain.ui.classDeg;	// 산업분류 10차 코드를 담은 멤버 변수, 추가!
				//SGIS4_1025_생활권역_상세분석 시작
				option.grid_level = $('.grid_size > a.btn_size.active').attr('data-grid-level-div'); // 격자크기 
				
				option.grid_level_nm = $('.grid_size > a.btn_size.active').attr('data-grid-level-div'); //격자크기 
				
				if(isLimitedMode){
					//option.statType = $("#gridSettingForDetailLess1k").children("li.active").attr("data-stat-type"); 
					//this.setGridStatConfigureLess1k(option,'gridSettingForDetailLess1k');
		
					option.statType = $("#gridSettingLess1k").children("li.active").attr("data-stat-type"); 
					this.setGridStatConfigureLess1k(option,'gridSettingLess1k');
				}else{
					//option.statType = $("#gridSettingForDetail").children("li.active").attr("data-stat-type");
					//this.setGridStatConfigure(option,'gridSettingForDetail');
					option.statType = $("#gridSetting").children("li.active").attr("data-stat-type");
					this.setGridStatConfigure(option,'gridSetting');
				
				}

				//this.getGridShowingInfo(option,this.gridMapRequestor);
				
				// 상세분석이 격자 분포 안 쪽으로 옮기면서 격자 크기 계산하지 않고 격자분포에서 선택한 거리로 사용하므로 주석처리
				/*var areaValue1 = this.calculateArea(option.rangeType, this.getDetailValue(), 0); 
				var areaValue2 = this.calculateArea(option.rangeType, this.getDetailValue(), 1);
				
				// 더 큰 영역값을 가진 것을 기준으로 한다. 이유. 엄청 큰 영역 ==> 격자 1k 짜리 씀, 엄청 작은 영역 ==> 격자 100m 짜리 씀 , 그런데 100m 짜리로 공통으로 격자를 쓰면? "엄청 큰 영역"을 격자 조회하다 서버 터진다.
				if(areaValue1 >= areaValue2) {
					this.setGridLevelAndName(areaValue1, option)
				} else {
					this.setGridLevelAndName(areaValue2, option);
				}*/
				//SGIS4_1025_생활권역_상세분석 끝
				return option;
			},
			
			/**
			 * 
			 * @name         : setGridDiffConfig
			 * @description  : 상세분석에서 양쪽 지도에 각각 격자 데이터를 얻어오기 위해 AJAX 요청을 할 때, 지도 아이디에 따라서 사용해야될 조건값이 다를 때 사용하는 메소드.
			 * 
			 */
			setGridDiffConfig : function(mapId, option){
				option.mapId = mapId ? mapId : 0;
				var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
				var selectCoor_X = this['selectCoordinate_x'+(mapId === 1 ? '_2' : '')];	// 다름
				var selectCoor_Y = this['selectCoordinate_y'+(mapId === 1 ? '_2' : '')];	// 다름
				var pageNo = -1;
				if(mapId == 0) {
					//SGIS4_1025_생활권역_상세분석 시작
					//pageNo = $('#statsType03 > ul > li.active').index() + 1;  
					pageNo = $('#statsType02 > ul > li.active').index() + 1; // 동글뱅이 -> 격자분포 동글뱅이
					//SGIS4_1025_생활권역_상세분석 끝
				} else if(mapId == 1) {
					pageNo = 1;
				}
				var selectPolygonPointsArr = $catchmentAreaLeftMenu.ui['selectPolygonPointsArr' +(mapId === 1 ? '2' : '')] ;
				var polygonPoints = selectPolygonPointsArr[selectPolygonPointsArr.length - pageNo];
				
				if(rangeType == "stats01" || rangeType == "stats02"){
					var area = "";
					area = 'POLYGON((';
					for(var i = 0; i < polygonPoints.length; i++) {
						area += polygonPoints[i][0] + " " + 
						polygonPoints[i][1] + ",";
						
						if(i == polygonPoints.length - 1) {
							area += polygonPoints[i][0] + " " + 
							polygonPoints[i][1];
						}
					}
					area += '))';
					
					option.area = area;
					option.polygonPoints = polygonPoints;
					option.srvAreaType = 1;
					
					
				} else if(rangeType == "stats03"){
					
					var selectRange = this.getDetailValue();
					var area = 'POINT('+ selectCoor_X + " " + selectCoor_Y +')';
					
					option.area = area;
					option.radius = selectRange;
					option.srvAreaType = 2;
					
				}
				
				return option;
				
			},
			
			setGridLevelAndName : function(areaValue, option) {
				var grid_level = "";
				var grid_level_nm = "";
				
				if(areaValue <= $catchmentAreaMain.ui.maxAreaUsing100mGrid){	// x <= 30㎢
					grid_level = "100m";
					grid_level_nm = "100m";
				} else {
					grid_level = "500m";
					grid_level_nm = "500m";
				}
				
				option.grid_level = grid_level;
				option.grid_level_nm = grid_level_nm;
			},
			
			/**
			 * 
			 * @name         : calculateArea
			 * @description  : 격자맵을 그릴때 사용되며, 해당 도형이 갖고 있는 너비를 구한다.
			 * @parameter	 : rangeType(주행시간,주행거리,반경에 대한 참조값), value (값, 시간, 거리 혹은 반경이 될 수도 있는 값)
			 */
			calculateArea : function(rangeType, value, mapId){
				
				var result = 0;
				
				// 주행 시간 기준 + 주행 거리 기준
				if(rangeType === 'stats01' || rangeType === 'stats02'){
					if(mapId === 0) {
						return this.boundarySize_1;
					} else if(mapId === 1) {
						return this.boundarySize_2;
					} else {
						throw new Error('No Such MapId Exists!');
					}
				} 
				// 반경 기준
				else if(rangeType === 'stats03') {
					value  = Number(value);
					result = Math.PI * value;
				}
				
				return Math.round(result);	// 반올림해서 반환
			},
			
			/**
			 * 
			 * @name         : getDetailValue
			 * @description  : 상세분석에서 설정한 값을 읽어온다.
			 * 
			 */
			getDetailValue : function() {
				return $('#statsType03 li.active a').attr('value');
			},
			

			/**
			 * 
			 * @name         : checkGridStatConfigure
			 * @description  : 격자상세조건을 적용하기 전에 먼저 validation check를 해주는 메소드이다.
			 * 
			 */
			checkGridStatConfigure : function(ulDomId, pAllowAll) {
				// pAllowAll : [조건별 통계 보기]에서만 예외 존재, 전체 조건을 허용하지 않음
				
				//SGIS4_1025_생활권역 시작
				//현재(21.10.00) 요구에 맞춰 정리(미선택 시 알림, pAllowAll가 false로 오는 경우 미사용 등등)
				
				var alertMsg = "";				
				var selectedTab = $('#'+ulDomId+' li[data-stat-type].active');
				var selectedTabData = selectedTab.attr('data-stat-type');
				var isUnselected = false;
				
				if(selectedTabData == "pops"){//인구
//					if(!pAllowAll){
////						if(!$("#"+ulDomId+" .div_age_range .age_range_chk.on").is(':visible')){
////							// 연령 구간 선택을 하지 않았다면(연령 구간 선택은 무조건 값이 존재하므로 검사에서 제외)
////							// 성별은 전체 허용, 나이(select 박스) 선택여부만 체크 
////							if($("#"+ulDomId+" .select_age option:selected").attr("value") == "00"){
////								if($("#"+ulDomId+" .select_genger option:selected").attr("value") == "00"){								
////									alertMsg = "해당 분석조건 설정에서는 전체 인구로 조회할 수 없습니다.<br/>성별 또는 연령대를 선택해 주세요.";
////								}
////							}							
////						}
//						
//						if($("#"+ulDomId+" .div_age_all .age_all_chk.on").is(':visible')){
//							if($("#"+ulDomId+" .select_genger option:selected").attr("value") == "00"){								
//								alertMsg = "해당 분석조건 설정에서는 전체 인구로 조회할 수 없습니다.<br/>성별 또는 연령대를 선택해 주세요.";
//							}
//						}						
//					}
				}else if(selectedTabData == "family"){//가구
//					if(!pAllowAll){
//						if($("#"+ulDomId+" .gridFamilyList a.active").length === 0 ) {
//							alertMsg = "해당 분석조건 설정에서는 전체 가구로 조회할 수 없습니다.<br/>세대구성(다중선택) 조건을 선택해 주세요.";
//						}
//					}
//					// 그 외는 미 선택 시 전체인걸로 변경
////					if($("#"+ulDomId+" .gridFamilyList a.active").length === 0 ) {
////						alertMsg = "선택하신 세대구성(다중선택) 조건이 없습니다";
////					}
					if($("#"+ulDomId+" .gridFamilyList a.active").length === 0 ) {
						isUnselected = true;
					}
				}else if(selectedTabData == "house"){//주택
					// 건축년도를 조건으로 체크했다면
					if($("#"+ulDomId+" .div_constYear .con_chk.on").is(':visible')){
						var $cyOpt = $("#"+ulDomId+" .select_constYear option:selected");
						if($cyOpt.attr("value") == ""){
							alertMsg = "건축년도 조건을 선택하였습니다.<br/>조건으로 지정할 건축년도 값을 선택해 주세요.";
						}
					}else if($("#"+ulDomId+" .div_houseBdspace .con_chk.on").is(':visible')){
						var $cyOpt = $("#"+ulDomId+" .selct_houseTotArea option:selected");
						if($cyOpt.attr("value") == ""){
							alertMsg = "연면적 조건을 선택하였습니다.<br/>조건으로 지정할 연면적 값을 선택해 주세요.";
						}	
					//SGIS4_1210 수정 시작
					}else if($("#"+ulDomId+" .div_houseType .con_chk.on").is(':visible')){
//						if(!pAllowAll){
//							if($("#"+ulDomId+" .gridHouseList a.active").length === 0 ) {
//								alertMsg = "해당 분석조건 설정에서는 전체 주택종류로 조회할 수 없습니다.<br/>주택종류(다중선택) 조건을 선택해 주세요.";
//							}
//						}	
						if($("#"+ulDomId+" .gridHouseList a.active").length === 0 ) {
							alertMsg = "주택종류 조건을 선택하였습니다.<br/>조건으로 지정할 주택종류(다중선택)를 선택해 주세요.";
						}
					}else{
						isUnselected = true;
					}
					//SGIS4_1210 수정 끝					
					
					// 그 외는 미 선택 시 전체인걸로 변경
//					if($("#"+ulDomId+" .gridHouseList a.active").length === 0 ){
//						alertMsg = "선택하신 주택종류(다중선택) 조건이 없습니다";
//					}
				}else if(selectedTabData == "copr" || selectedTabData == "employee"){	//사업체 or 종사자
					/* 유효성 검사대상 없음
					if($('#'+ulDomId+' li[data-stat-type="copr"] a[data-grdstat-type].active').length == 0) {
						alertMsg = "통계구분(사업체 또는 종사자)을 선택해 주세요.<br/>";
					}

					if($('#' + ulDomId + ' .coprD_chk.on').is(':visible')){
						var firstSelectOption = $('#'+ulDomId+' li[data-stat-type="copr"] select.detailSelectBox.first option:selected');
						var secondSelectOption = $('#'+ulDomId+' li[data-stat-type="copr"] select.detailSelectBox.second option:selected');

						if($('#'+ulDomId+' li[data-stat-type="copr"] a[data-large-class].active').length == 0) {
							alertMsg = alertMsg + "선택하신 사업체/종사자의 분야가 없습니다.<br/>교육, 문화, 생활, 공공 중에서 하나를 선택해주세요.";
						} else if(firstSelectOption.val() == "" || firstSelectOption.length == 0 || secondSelectOption.val() == "" || secondSelectOption.length == 0) {
							alertMsg = alertMsg + "중분류/소분류를 선택해주세요";
						}
					}else{
						if(!pAllowAll){
							alertMsg = alertMsg + "해당 분석조건 설정에서는 총 사업체/종사자로 조회할 수 없습니다.<br/>세부 조건을 선택해 주세요.";
						}
					}
					*/

					var $li;					
					if(selectedTabData == "copr"){
						$li = $('#'+ulDomId+' li[data-stat-type="copr"]');
					}else if(selectedTabData == "employee"){
						$li = $('#'+ulDomId+' li[data-stat-type="employee"]');
					}
					
					var tabNm = $li.find('a[data-grdstat-type].active').attr("data-grdstat-type");
					if(tabNm == "tabFavorites"){						
						var $selItm = $li.find('.lifeBizList .lifeBizBox li > span.active');						
						if($selItm.length === 0){
//							alertMsg = "주요 생활업종 세부 항목을 선택해 주세요.";
							isUnselected = true;
						}
					}else if(tabNm == "tabIndustryClass"){
						var $selItm = $li.find('.classCont .clsSet.sel');
						if($selItm.length === 0){
//							alertMsg = "한국산업표준분류 세부 항목을 선택해 주세요.";
							isUnselected = true;
						}					
					}					
				}
				
//				else if(selectedTabData == "idlv"){//공시지가
//					if($('#'+ulDomId+' li[data-stat-type="idlv"] a.active').length === 0) {
//						alertMsg = "공시지가 조건을 하나 선택하세요.";
//					}
//				}

				if(isUnselected){
					var unSelMsg = "세부 조건을 한 개이상 선택하여 주시기 바랍니다.";
					caMessageAlert.open("알림", unSelMsg);					
					return false;
				}else{
					if(alertMsg) {
						caMessageAlert.open("알림", alertMsg);
						return false;
					}
				}
				
				return true;
				
				//SGIS4_1025_생활권역 끝
			},
			
			/**
			 * 
			 * @name         : setGridDetailConfigure
			 * @description  : 격자상세조건을 파라미터로 들어온 객체에 부여해준다.
			 * 
			 */
			setGridStatConfigure : function(param, ulDomId) {	//{statType:"pops"} , gridSettingForDetail
				
				var schCondNm = "";
				var show1, show2;
				if(param.statType == "pops"){//인구
					//성별
					show1 = "성별";
					if($("#"+ulDomId+" .select_genger option:selected").attr("value") != "00"){
						param.gender = $("#"+ulDomId+" .select_genger option:selected").attr("value");
						show1 = show1 + "(" + $("#"+ulDomId+" .select_genger option:selected").text() + ")";
					}else{
						show1 = show1 + "(전체)";
					}
					//연령
					show2 = "연령";
//					if($("#"+ulDomId+" .div_age_range .age_range_chk.on").is(':visible')){
//
//						var tmpAgeFrom = parseInt($("#"+ulDomId+" .selct_age_from option:selected").attr("value"));
//						var tmpAgeTo = parseInt($("#"+ulDomId+" .selct_age_to option:selected").attr("value"));
//						
//						if (tmpAgeFrom >= 100) {
//							tmpAgeFrom = 100;
//						}
//						if (tmpAgeTo > 100) {							
//							show2 = show2 + "(" + tmpAgeFrom + "세 이상)";
//						}else {
//							show2 = show2 + "(" + tmpAgeFrom + "세 이상 " + tmpAgeTo + "세 미만)";
//						}
//						
//						// 공통코드(SRVA01)로
//						var charLen = 2;
//						var tmpFromCd = "01";
//						var tmpToCd = "01";
//						
//						var tmpCd = tmpAgeFrom / 5;
//						if(tmpCd != 0){
//							tmpCd = (tmpCd + 1) + '';
//							tmpFromCd = (tmpCd.length >= charLen ? tmpCd : new Array(charLen - tmpCd.length + 1).join('0') + tmpCd);							
//						}
//						
//						tmpCd = tmpAgeTo / 5;
//						if(tmpCd != 0){
//							tmpCd = tmpCd + '';
//							tmpToCd = (tmpCd.length >= charLen ? tmpCd : new Array(charLen - tmpCd.length + 1).join('0') + tmpCd);							
//						}					
//
//						param.ageFromCd = tmpFromCd;
//						param.ageToCd = tmpToCd;
//					}else{						
//						if($("#"+ulDomId+" .div_age_single5 .age_single_chk.on").is(':visible') && $("#"+ulDomId+" .select_age option:selected").attr("value") != "00"){
//							param.ageFromCd = $("#"+ulDomId+" .select_age option:selected").attr("value");
//							show2 = show2 + "(" + $("#"+ulDomId+" .select_age option:selected").text() + ")";
//						}else{
//							show2 = show2 + "(전체)";
//						}						
//					}

					//SGIS4_생활권역 시작
					if($("#"+ulDomId+" .div_age_single5 .age_single_chk.on").is(':visible') 
							|| $("#"+ulDomId+" .div_age_single5 .age_single_chk.on").hasClass('currDp')){
					//SGIS4_생활권역 끝	
						param.ageFromCd = $("#"+ulDomId+" .select_age5 option:selected").attr("value");
						show2 = show2 + "(" + $("#"+ulDomId+" .select_age5 option:selected").text() + ")";
						//SGIS4_1025_생활권역 시작
						$catchmentAreaDataBoard.ui.dStatType = "age_5";
						//SGIS4_1025_생활권역 끝
					//SGIS4_생활권역 시작	
					}else if($("#"+ulDomId+" .div_age_single10 .age_single_chk.on").is(':visible')
							|| $("#"+ulDomId+" .div_age_single10 .age_single_chk.on").hasClass('currDp')){
					//SGIS4_생활권역 끝
						var selAgeVal = $("#"+ulDomId+" .div_age_single10 option:selected").attr("value");
						var ageVals = selAgeVal.split('_');						
						if(ageVals.length >= 2){
							param.ageFromCd = ageVals[0];
							param.ageToCd = ageVals[1];							
						}else if(ageVals.length == 1){
							param.ageFromCd = ageVals[0];
						}

						show2 = show2 + "(" + $("#"+ulDomId+" .div_age_single10 option:selected").text() + ")";
						//SGIS4_1025_생활권역 시작
						$catchmentAreaDataBoard.ui.dStatType = "age_10";
						//SGIS4_1025_생활권역 끝
					//SGIS4_생활권역 시작	
					}else if($("#"+ulDomId+" .div_age_singleRnd .age_single_chk.on").is(':visible')
							|| $("#"+ulDomId+" .div_age_singleRnd .age_single_chk.on").hasClass('currDp')){
					//SGIS4_생활권역 끝	
						var selAgeVal = $("#"+ulDomId+" .div_age_singleRnd option:selected").attr("value");	
						var ageVals = selAgeVal.split('_');						
						if(ageVals.length >= 2){
							param.ageFromCd = ageVals[0];
							param.ageToCd = ageVals[1];							
						}else if(ageVals.length == 1){
							param.ageFromCd = ageVals[0];
						}
						
						show2 = show2 + "(" + $("#"+ulDomId+" .div_age_singleRnd option:selected").text() + ")";
						//SGIS4_1025_생활권역 시작
						$catchmentAreaDataBoard.ui.dStatType = "age_define";
						//SGIS4_1025_생활권역 끝
					}else{
						show2 = show2 + "(전체)";
					}
					
					//SGIS4_1025_생활권역 시작
					if(ulDomId == "areaSetting"){
						schCondNm = show2;
					}else{
						schCondNm = show2 + " + " + show1;
					}
					//SGIS4_1025_생활권역 끝
					param.filterParam = "ppltn_cnt";
					param.unit = "명";
					srvLogWrite('Q0','03','03','03',JSON.stringify(param),'');
				}else if(param.statType == "family"){//가구
					show1 = "";
					// 미 선택 시 전체인걸로 변경
					// if(!$("#"+ulDomId+" .gridFamilyList").children('a[value="00"]').hasClass('active')){
					
					//SGIS4_1025_생활권역 시작
					if($("#"+ulDomId+" .gridFamilyList a.active").length !== 0 ) {	

						if($("#"+ulDomId+" .gridFamilyList a").length === $("#"+ulDomId+" .gridFamilyList a.active").length) {
							show1 = "가구(전체)";
						}else{
							var $selList = $("#"+ulDomId+" .gridFamilyList a.active");
							var householdType = "";
							var individualList = [];
							
							$selList.each(function(){
								if($(this).attr("value") !== undefined && $(this).attr("value") !== ""){
									householdType += $(this).attr("value") + ",";
									//show1 = show1 + $(this).text() + ",";
								}
								
								if(!$(this).hasClass('bundle_main') && !$(this).hasClass('bundle_sub')){
									individualList.push($(this).text());
								}
							});
							
							if(householdType != ""){
								householdType = householdType.substr(0, householdType.length - 1);
								//show1 = show1.substr(0, show1.length - 1);
							}
							
							param.householdType = householdType;
							
							// show1 ...
							var bundleList = [];
							var $subList = $("#"+ulDomId+" .gridFamilyList a.bundle_sub.active");
							$subList.each(function(){								
								bundleList.push($(this).text().replace(' 가구',''));
							});
							
							if(bundleList.length > 0){
								show1 = show1 + "친족 가구(" + bundleList.join(", ") + ")";
							}
							
							if(individualList.length > 0){
								if(show1.length > 0){
									show1 = show1 + ", " + individualList.join(", "); 
								}else{
									show1 = individualList.join(", ");
								}								
							}
						}
					}else{
						show1 = "가구(전체)";
					}
					
					schCondNm = show1;
					//SGIS4_1025_생활권역 끝
					
					param.filterParam = "family_cnt";
					param.unit = "가구";
					srvLogWrite('Q0','03','03','04',JSON.stringify(param),'');
				}else if(param.statType == "house"){//주택
					show1 = "";
// 20210112: 배타적 선택으로 변경(주석 처리된 기존 소스는 3가지 조건 동시 선택)
/*					
					// 미 선택 시 전체인걸로 변경
					// if(!$("#"+ulDomId+" .gridHouseList").children('a[value="00"]').hasClass('active')){
					if($("#"+ulDomId+" .gridHouseList a.active").length !== 0 ) {	
						var $selList = $("#"+ulDomId+" .gridHouseList").children("a.active");
						var rdResidType = "";
						
						$selList.each(function(){
							rdResidType += $(this).attr("value") + ",";
							show1 = show1 + $(this).text() + ",";
						});
						
						if(rdResidType != ""){
							rdResidType = rdResidType.substr(0, rdResidType.length - 1);
							show1 = show1.substr(0, show1.length - 1);
						}
						
						param.rd_resid_type = rdResidType;
					}else{
						show1 = "전체주택";
					}
					show1 = "주택종류(" + show1 + ")";
					
					if($("#"+ulDomId+" .div_constYear .con_chk.on").is(':visible')){
						var $cyOpt = $("#"+ulDomId+" .select_constYear option:selected");
						if($cyOpt.attr("value") != ""){
							param.const_year = $cyOpt.attr("value");
							
							show1 = show1 + " + 건축년도(" + $cyOpt.text() + ")";
						}
					}
					
					if($("#"+ulDomId+" .div_houseBdspace .con_chk.on").is(':visible')){
						// interactiveLeftMenu.js line:904
						var $fromOpt = $("#"+ulDomId+" .selct_hta_from option:selected");   
						var $toOpt = $("#"+ulDomId+" .selct_hta_to option:selected");
						var fromOptVal = $fromOpt.val();
						var toOptVal = $toOpt.val();
						var houseAreaCd = [];
						
						if (parseInt(fromOptVal) >= 230) {
							fromOptVal = 230;
						}
						
						// 화면은 초과/이하, 여긴 이상/미만 ??
						if (parseInt(toOptVal) >= 300) {
							toOptVal = 9999;
							show1 = show1 + " + 연면적(" + fromOptVal + "㎡ 이상)";
						}else {
							show1 = show1 + " + 연면적(" + fromOptVal + "㎡ 이상 ~" + toOptVal + "㎡ 미만)";
						}
						
						var dataSet = {
								 0 : "01",
								20 : "02",
								40 : "03",
								60 : "04",
								85 : "05",
							   100 : "06",
							   130 : "07",
							   165 : "08",
							   230 : "09",
							  9999 : "10"		// db에는 99 인듯
						};
						
						var fromData = parseInt(dataSet[fromOptVal]);
						var toData = parseInt(dataSet[toOptVal]);
						
						for (var i = 0; i < (toData - fromData); i++) {
							var code = "0" + (fromData + i);
							houseAreaCd.push(code);
						}
						
						param.house_area_cd = houseAreaCd.join(",");
					}
*/
					//SGIS4_생활권역 시작
					if($("#"+ulDomId+" .div_constYear .con_chk.on").is(':visible')
							|| $("#"+ulDomId+" .div_constYear .con_chk.on").hasClass('currDp')){
					//SGIS4_생활권역 끝
						var $cyOpt = $("#"+ulDomId+" .select_constYear option:selected");
						if($cyOpt.attr("value") != ""){
							param.const_year = $cyOpt.attr("value");
							
							show1 = "건축년도(" + $cyOpt.text() + ")";
						}
					//SGIS4_생활권역 시작	
					}else if($("#"+ulDomId+" .div_houseBdspace .con_chk.on").is(':visible')
							|| $("#"+ulDomId+" .div_houseBdspace .con_chk.on").hasClass('currDp')){
					//SGIS4_생활권역 끝	
// 범위 선택 일때						
						// interactiveLeftMenu.js line:904
//						var $fromOpt = $("#"+ulDomId+" .selct_hta_from option:selected");   
//						var $toOpt = $("#"+ulDomId+" .selct_hta_to option:selected");
//						var fromOptVal = $fromOpt.val();
//						var toOptVal = $toOpt.val();
//						var houseAreaCd = [];
//						
//						if (parseInt(fromOptVal) >= 230) {
//							fromOptVal = 230;
//						}
//						
//						// 화면은 초과/이하, 여긴 이상/미만 ??
//						if (parseInt(toOptVal) >= 300) {
//							toOptVal = 9999;
//							show1 = "연면적(" + fromOptVal + "㎡ 이상)";
//						}else {
//							show1 = "연면적(" + fromOptVal + "㎡ 이상 ~" + toOptVal + "㎡ 미만)";
//						}
//						
//						var dataSet = {
//								 0 : "01",
//								20 : "02",
//								40 : "03",
//								60 : "04",
//								85 : "05",
//							   100 : "06",
//							   130 : "07",
//							   165 : "08",
//							   230 : "09",
//							  9999 : "10"		// db에는 99 인듯
//						};
//						
//						var fromData = parseInt(dataSet[fromOptVal]);
//						var toData = parseInt(dataSet[toOptVal]);
//						
//						for (var i = 0; i < (toData - fromData); i++) {
//							var code = "0" + (fromData + i);
//							houseAreaCd.push(code);
//						}
//						
//						param.house_area_cd = houseAreaCd.join(",");
// 범위 선택 일때							
						var $cyOpt = $("#"+ulDomId+" .selct_houseTotArea option:selected");
						if($cyOpt.attr("value") != ""){
							param.house_area_cd = $cyOpt.attr("value");
							
							show1 = "연면적(" + $cyOpt.text() + ")";
						}
						//SGIS4_1025_생활권역 시작
						$catchmentAreaDataBoard.ui.dStatType = "area";
						//SGIS4_1025_생활권역 끝
					}else{
						//SGIS4_1025_생활권역 시작
						if($("#"+ulDomId+" .gridHouseList a.active").length !== 0 && 
								($("#"+ulDomId+" .gridHouseList a").length !== $("#"+ulDomId+" .gridHouseList a.active").length)) {	
							var $selList = $("#"+ulDomId+" .gridHouseList").children("a.active");
							var rdResidType = "";
							
							$selList.each(function(){
								rdResidType += $(this).attr("value") + ",";
								show1 = show1 + $(this).text() + ",";
							});
							
							if(rdResidType != ""){
								rdResidType = rdResidType.substr(0, rdResidType.length - 1);
								show1 = show1.substr(0, show1.length - 1);
							}
							
							param.rd_resid_type = rdResidType;							
						}else{
							show1 = "전체";
						}
						
						show1 = "주택종류(" + show1 + ")";	
						//SGIS4_1025_생활권역 끝
						$catchmentAreaDataBoard.ui.dStatType = "resid_type";
					}
					
					schCondNm = show1;					
					
					param.filterParam = "resid_cnt";
					param.unit = "호";
					srvLogWrite('Q0','03','03','05',JSON.stringify(param),'');
	
				//SGIS4_생활권역 시작	
				}else if(param.statType == "copr" || param.statType == "employee"){		//사업체 or 종사자
					
					param.grdstatType = param.statType;
					var $li;
					
					if(param.grdstatType == "copr"){
						$li = $('#'+ulDomId+' li[data-stat-type="copr"]');
					}else if(param.grdstatType == "employee"){
						$li = $('#'+ulDomId+' li[data-stat-type="employee"]');
					}
					
					var tabNm = $li.find('a[data-grdstat-type].active').attr("data-grdstat-type");
					param.isLifeBiz = "N";
					//SGIS4_1025_생활권역 시작
					if(tabNm == "tabFavorites"){						
						//var $selItm = $li.find('.favorlist li.active');
						var $selItm = $li.find('.lifeBizList .lifeBizBox li > span.active');						
						if($selItm.length > 0){
							param.ksic_3_cd = $selItm.attr("data-ksic-sel-cd");							
							show1 = "생활업종(" + $selItm.attr("data-ksic-sel-nm") + ")";							
						}/*else{
							show1 = "전체";
						}*/
						param.isLifeBiz = "Y";
					}else if(tabNm == "tabIndustryClass"){
						var $selItm = $li.find('.classCont .clsSet.sel');
						if($selItm.length > 0){
							param.ksic_3_cd = $selItm.closest('.classCont').attr("data-ksic-sel-cd");
							show1 = "산업분류(" + $selItm.closest('.classCont').attr("data-ksic-sel-cd") + ". " + $selItm.closest('.classCont').attr("data-ksic-sel-nm") + ")";							
						}/*else{
							show1 = "전체";
						}*/						
					}else if(tabNm == "tabAll"){						
						if(param.statType == "copr"){	
							show1 = "사업체(전체)";
						}else if(param.statType == "employee"){
							show1 = "종사자(전체)";
						}						
					}
					//SGIS4_1025_생활권역 끝
					schCondNm = show1;

					if(param.grdstatType == "copr"){
						param.filterParam = "copr_cnt";
						param.unit = "개";
						srvLogWrite('Q0','03','03','06',JSON.stringify(param),'');
					}else if(param.grdstatType == "employee"){
						param.filterParam = "employee_cnt";	
						param.unit = "명";
						param.statType = "copr";		// 맞춰줘야 함
						srvLogWrite('Q0','03','03','07',JSON.stringify(param),'');
					}
				
/*					
					param.grdstatType = $("#"+ulDomId+" a[data-grdstat-type].active").attr("data-grdstat-type");
					if($('#' + ulDomId + ' .coprD_chk.on').is(':visible')){
						param.ksic_3_cd = $("#"+ulDomId+" .detailSelectBox.second option:selected").attr("value");
						show1 = $("#"+ulDomId+" .detailSelectBox.second option:selected").text();
					}else{
						show1 = "전체";
					}					
										
					schCondNm = show1;
					if(param.grdstatType == "copr"){
						param.filterParam = "copr_cnt";
						param.unit = "개";
						srvLogWrite('Q0','03','03','06',JSON.stringify(param),'');
					}else{
						param.filterParam = "employee_cnt";	
						param.unit = "명";
						srvLogWrite('Q0','03','03','07',JSON.stringify(param),'');
					}
*/					
				//SGIS4_생활권역 끝
					
				}else if(param.statType == "idlv"){//공시지가	
					param.filterParam = "olnlp";
					param.unit = "원";					
				}
				
				param.schCondNm = schCondNm;
				param.show1 = show1;
				param.show2 = show2;
			},
			
			setGridStatConfigureLess1k : function(param, ulDomId) {
				//setGridStatConfigure 의 전체 선택일때랑 동일
				
				var schCondNm = "";
				var show1, show2;
				
				if(param.statType == "pops"){//인구

					show1 = "성별(전체)";
					show2 = "연령(전체)";
					schCondNm = show2 + " + " + show1;
					param.filterParam = "ppltn_cnt";
					param.unit = "명";
				}else if(param.statType == "family"){//가구
					
					//SGIS4_1025_생활권역 시작
					show1 = "가구(전체)";					
					schCondNm = show1;
					//SGIS4_1025_생활권역 끝
					param.filterParam = "family_cnt";
					param.unit = "가구";
				}else if(param.statType == "house"){//주택
					
					//SGIS4_1025_생활권역 시작
					show1 = "주택(전체)";
					//SGIS4_1025_생활권역 끝
					schCondNm = show1;					
					param.filterParam = "resid_cnt";
					param.unit = "호";
				}else if(param.statType == "copr"){//사업체					
					
					param.grdstatType = "copr";
					//SGIS4_1025_생활권역 시작
					show1 = "사업체(전체)";
					//SGIS4_1025_생활권역 끝
					schCondNm = show1;
					param.filterParam = "copr_cnt";
					param.unit = "개";
				}else if(param.statType == "employee"){//종사자					
					
					param.grdstatType = "employee";
					//SGIS4_1025_생활권역 시작
					show1 = "종사자(전체)";
					//SGIS4_1025_생활권역 끝
					schCondNm = show1;
					param.filterParam = "employee_cnt";
					param.unit = "명";
					
					param.statType = "copr";		// 맞춰줘야 함
				}else if(param.statType == "idlv"){//공시지가
					
					param.filterParam = "olnlp";
					param.unit = "원";					
				}
				
				param.schCondNm = schCondNm;
				param.show1 = show1;
				param.show2 = show2;				
			},
			
			/**
			 * 
			 * @name         : setSpatialSido
			 * @description  : 상세분석 > 위치설정 > 시도 selectbox를 세팅한다. setSido와 완전히 같은 코드지만 기존 코드를 건드리기 싫어서 복붙했다.
			 * 
			 */
			setSpatialSido : function() {
				var sidoAddressObj = new sop.portal.catchmentAreaSpatialSidoAddress.api();
				sidoAddressObj.addParam("base_year", "2019");
				sidoAddressObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/map/sidoAddressList.json",
					options : {
						target : this
					}
				});
			},
			
			/**
			 * 
			 * @name         : setSpatialSgg
			 * @description  : 상세분석 > 위치설정 > 시군구 selectbox를 세팅한다. 
			 * 
			 */
			setSpatialSgg : function(sidoCd) {
				//$catchmentAreaLeftMenu.ui.selectSidoCd = sidoCd;
				var sggAddressObj = new sop.portal.catchmentAreaSpatialSggAddress.api();
				sggAddressObj.addParam("base_year", "2019");
				sggAddressObj.addParam("sido_cd", sidoCd);
				sggAddressObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/map/sggAddressList.json",
					options : {
						target : this
					}
				});
			},
			
			/**
			 * 
			 * @name         : setSpatialEmd
			 * @description  : 상세분석 > 위치설정 > 읍면동 selectbox를 세팅한다. 
			 * 
			 */
			setSpatialEmd : function(sidoCd ,sggCd) {
				//$catchmentAreaLeftMenu.ui.selectSidoCd = sidoCd;
				//$catchmentAreaLeftMenu.ui.selectSggCd = sggCd;
				var emdAddressObj = new sop.portal.catchmentAreaSpatialEmdAddress.api();
				emdAddressObj.addParam("base_year", "2019");
				emdAddressObj.addParam("sido_cd", sidoCd);
				emdAddressObj.addParam("sgg_cd", sggCd);
				emdAddressObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/map/admAddressList.json",
					options : {
						target : this
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : setfacilityTypeSearchSpatialDatailList_spatial (setfacilityTypeSearchDatailList 와 같은 함수, 독립성을 위해 따로 작성)
			 * @description  : 상세기능 > 공간분석 > 위치 검색창에서 중심 시설유형으로 찾기 선택 후 상세보기 리스트 조회
			 * 
			 */
//			setfacilityTypeSearchDatailListForSpatial : function(areaCd, factypeCd){
//				var sopPortalfacilityTypeSearchListObj = new sop.portal.facilityTypeSearchListForSpatial.api();
//				sopPortalfacilityTypeSearchListObj.addParam("area_cd", areaCd);
//				sopPortalfacilityTypeSearchListObj.addParam("factype_cd", factypeCd);
//				sopPortalfacilityTypeSearchListObj.request({
//					method : "POST",
//					async : false,
//					url : contextPath + "/ServiceAPI/OpenAPI3/catchmentArea/facilityTypeSearchList.json"
//				});
//			},
			
			/**
			 * @name  : setDetailConditionSelectBoxWithLClass
			 * @description : 상세분석 > 공간분석 + 시간분석 > 조건 상세 설정 창 > 사업체 및 종사자 탭 > 첫 번째 selectBox 에 option을 동적으로 넣어주는 메소드
			 * @param : lClass 	( 대분류값 ), 
			 * 			element( 어느 Div의 selectBox인지를 결정하는 파라미터, 이렇게 하는 이유는 비슷한 기능이 격자분석 > 조건 설정 창도 있기 때문이다.)
			 */
			setDetailConditionSelectBoxWithLClass : function(lClass, element) {
				// 복잡한 API를 만들어서 하지 않았다. 단순하게 Controller에 ResponseBody를 통해서 작업했다.
				// 단순히 UI를 좀 꾸며주는 수준이어서 이렇게 했다.
				
				$.ajax({
				    url: 'getCensusInfoGroupByLClass.do',
				    dataType:'json',		// 받는 데이터 형식은 JSON으로
				    data: {lClass:lClass, classDeg:$catchmentAreaMain.ui.classDeg},	// 보내는 파라미터
				    type: 'get',
				    success: function(result){
				        var selectBox = $(element);
				        selectBox.empty();
				        selectBox.append('<option value="">선택하세요</option>');
				        result.forEach(function(item,index){
				        	selectBox.append('<option value="'+item.ksic_2_cd+'">'+item.ksic_2_nm+'</option>');
				        });
				    }, 
				    error: function(request,status,error) {
				    	console.error("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				    }
				});
			},
			
			/**
			 * @name  : setDetailConditionSelectBoxWithKsicCd
			 * @description : 상세분석 > 공간분석 + 시간분석 > 조건 상세 설정 창 > 사업체 및 종사자 탭 > 두 번째 selectBox 에 option을 동적으로 넣어주는 메소드
			 * @param : ksic_cd	( ksic_2_cd 값 ), 
			 * 			element( 어느 Div의 selectBox인지를 결정하는 파라미터, 이렇게 하는 이유는 비슷한 기능이 격자분석 > 조건 설정 창도 있기 때문이다 )
			 */
			setDetailConditionSelectBoxWithKsicCd : function(ksic_2_cd, element) {
				// 복잡한 API를 만들어서 하지 않았다. 단순하게 Controller에 ResponseBody를 통해서 작업했다.
				// 단순히 UI를 좀 꾸며주는 수준이어서 이렇게 했다.
				
				$.ajax({
				    url: 'getKsicThirdCdAndName.do',
				    dataType:'json',
				    data: {ksic_2_cd:ksic_2_cd, classDeg:$catchmentAreaMain.ui.classDeg},
				    type: 'get',
				    success: function(result){
				        var selectBox = $(element);
				        selectBox.empty();
				        selectBox.append('<option value="">선택하세요</option>');
				        result.forEach(function(item,index){
				        	selectBox.append('<option value="'+item.ksic_3_cd+'">'+item.ksic_3_nm+'</option>');
				        });
				    }, 
				    error: function(request,status,error) {
				    	console.error("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				    }
				});
			},
			
			/**
			 * 
			 * @name         : 	searchSpatialPlaceApi (searchPlaceApi 와 같은 코드, 약간만 수정)
			 * 
			 * @description  : 	검색 API, 상세분석에서 위치 검색에서 input[type=text] 에서 사용한다. 
			 * 				   	(searchPlaceApi와 코드 중복이지만 기존 코드의 내용이 너무 복잡해지는 거 같아서 따로 메소드 생성함)
			 *
			 * @Parameter	 : 	enterIf (엔터 여부)
			 * 					page (현재 페이지 번호)
			 * 					searchWordId (검색어가 있는 input[type=text]의 아이디)
			 */
			searchSpatialPlaceApi : function(enterTf, page, searchWordId){
				
				var searchWord = $('#'+searchWordId).val().trim();
				var resultDiv = $('#'+searchWordId+'Div');
				var resultPageDiv = $('#'+searchWordId+'Div1Page');
				
				if(enterTf){
				    $(resultDiv).html("");
				    $(resultDiv).show();
				    $(resultPageDiv).show();
				    $.ajax({
				        type: "GET",
				        url: "https://map.ngii.go.kr/openapi/search.xml",
				        data: {
				            target:"poi",
				            //apikey:"iRZU9B0q0cc-Sli4OUVssw",
				            //apikey:"681A8A4458D8640F67284FF671EC2359",
							apikey:"E83672BED4060203EEE31799616A1199",	//운영 반영시 해당 url로 테스트 한다
							//apikey:"924F124D2B4E0FD86234D75A9F4C271D",
				            onePageRows:"10",
				            currentPage:page,
				            keyword:searchWord
				        },
				        dataType : "jsonp",
				        crossDomain:true,
				        success: function(result) {
				            var xmlData = jQuery.parseXML(result.xmlStr);
				            var header = $(xmlData).find("header");
				            var responseCode = header.find("responseCode").text();
				            var responseMessage = header.find("responseMessage").text();

				            var closeBtn = "<input type='button' onclick='closePopup3();' style='cursor: pointer; background:url(/img/common/popup_close_x.png) no-repeat left top; background-size:contain; width:10px; height:10px; text-indent:-1000px; overflow:hidden; border:none; position:absolute; right:10px; top:10px;'>";
					            if(responseCode!="0"&&responseCode!="100"){
					                $(resultDiv).html(responseMessage);
					            }else{
					                var htmlStr = "";
					                var poiArry = $(xmlData).find("contents").find("poi");
					                var totCount = $(xmlData).find("totalCount").text();
					                if(poiArry.length==0){
					                	var errHtml = "";
					                	if($("input:checkbox[id='schTypeGbA01']").is(":checked")){
					                		errHtml = "현재 시군구에 해당하는 검색결과가 없습니다.";
					                	}else{
					                		errHtml = "현재 보이는 화면 내에서는 해당하는 검색결과가 없습니다.";
					                	}
					                    $(resultDiv).html(errHtml+"<input type='button' onclick='closePopup3();' style='cursor: pointer; background:url(/img/common/popup_close_x.png) no-repeat left top; background-size:contain; width:10px; height:10px; text-indent:-1000px; overflow:hidden; border:none; position:absolute; right:10px; top:10px;'>");
					    				var htmlPage = "<br><br><br><br><br><br><br><br><br><br><br><br><div id='sopPaging' class='pagenation searchPagenation' align='center' style='width: 100%; margin-top:6px;'><span class='pages'></span></div><div style='height:5px;'></div>";
					    				$(resultPageDiv).html(htmlPage);
					                }else{
					                		htmlStr += "<p style='font-weight:bold'>검색결과 : " + totCount + "건</p>";
					                		htmlStr += closeBtn;
					                		htmlStr+="<table id='tb_result'>";
					                		
					                		for(var i=0;i<poiArry.length;i++){
					                			var name = $(poiArry[i]).find("name").text();
					                			var roadAdres = $(poiArry[i]).find("roadAdres").text();
					                			if(name.length> 20){
					                				name = name.substring(0,18) + "...";
					                			}
					                			
					                			if(roadAdres.length> 23){
					                				roadAdres = roadAdres.substring(0,21) + "...";
					                			}
					                			var text11 = "'"+$(poiArry[i]).find("name").text()+"'";
					                			var text22 = "'"+$(poiArry[i]).find("roadAdres").text()+"'";
					                			
					                			htmlStr+="<tr style='height:21px'>";
					                			htmlStr+="<td style='width:48%; cursor:pointer; border-right:1px solid #d3d3d3;'><a style='margin-left:10px;' onclick='javascript:$catchmentAreaLeftMenu.ui.moveTargetArea(\"" + $(poiArry[i]).find("name").text() + "\", \"" + $(poiArry[i]).find("roadAdres").text() + "\","+$(poiArry[i]).find("x").text()+","+$(poiArry[i]).find("y").text()+",null,1);closePopup3();'>"+ name +"</a></td>";
					                			htmlStr+="<td style='cursor:pointer;'><a onclick='javascript:$catchmentAreaLeftMenu.ui.moveTargetArea(\"" + $(poiArry[i]).find("name").text() + "\", \"" + $(poiArry[i]).find("roadAdres").text() + "\","+$(poiArry[i]).find("x").text()+","+$(poiArry[i]).find("y").text()+",null,1);closePopup3();'>&nbsp; "+ roadAdres +"</a></td>";
					                			htmlStr+="</tr>";
					                			
					                		}
					                		htmlStr+="</table>";
					                		
					                		$(resultDiv).html(htmlStr);
					                		
					                		
					                		var htmlPage = "<br><br><br><br><br><br><br><br><br><br><br><br><div id='sopPaging1' class='pagenation searchPagenation' align='center' style='width: 100%; margin-top:40px;'><span class='pages'></span></div><div style='height:5px;'></div>";
					                		$(resultPageDiv).html(htmlPage);
					                		if(parseInt(totCount) > 5){
					        					sopCurrentPageIndex1 = page-1;
					        					$catchmentAreaLeftMenu.ui.sopSpatialPaging1(parseInt(totCount), sopCurrentPageIndex1, searchWordId);
					        				}
					                		
					                		$("#tb_result tr").click(function(){
												var tr = $(this);
												var td = tr.children();
												var area = td.eq(0).text();
												$('#spatialSearchWord').val(area);
											});
					                		
					                		
					                		/*if(after && (typeof after === 'function')) {
					                			after.call(null);
					                		}
					                		*/
				                }
				            }
			            },
				        error : function(xhr, ajaxSettings, thrownError){
				        	console.log("error");
				        }
				    });
				}

			}, 
			
			/**
			 * 
			 * @name         : sopSpatialPaging1 ( sopPaging1 와 같은 코드 )
			 * @description  : 검색 div 페이징을 한다.
			 * 
			 */
			sopSpatialPaging1: function(totalCount, currentIndex, searchWordId) {
				var searchWord = $('#'+searchWordId).val().trim();
				var pageSize = 10;				
				var totalPage = Math.ceil( totalCount / pageSize);			
				$('#sopPaging1 .pages').paging({
					current:currentIndex+1,
					length : 10,
					max:totalPage,
					itemClass : 'page',
					itemCurrent : 'current',
					format : '{0}',
					next : '&gt;',
					prev : '&lt;',
					first : '&lt;&lt;',
					last : '&gt;&gt;',
					onclick:function(e,page){
						sopCurrentPageIndex1 = page-1;
						//enterTf, page, searchWordId, after
						$catchmentAreaLeftMenu.ui.searchSpatialPlaceApi(searchWord
																		, page
																		, searchWordId
																		);
					}
				});
			},
			
			setPoiMapping : function(ksic_5_cd, selectBoxDomId){	// 상세분석 기능에서도 사용해야 함으로 파라미터(isDetail) 추가 - 박상언 2020-10-20 추가
				var getPoiMappingObj = new sop.portal.catchmentAreagetPoiMapping.api();
				getPoiMappingObj.addParam("ksic_5_cd", ksic_5_cd);
				getPoiMappingObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/OpenAPI3/catchmentArea/getPoiMappingList.json",
					options : {
						selectBoxDomId : selectBoxDomId
					}
				});
			},
			
			/**
			 * 
			 * @name         : 	beforeDetailAnalysis
			 * @description  : 	상세기능을 시작하기에 앞서서 지우거나 혹은 생성해야 하는 것들을 모아놓은 메소드이다. 
			 * 					상세기능 토글버튼, 상세기능 [공간,시간,상관관계] 탭을 눌렀을 때 호출된다.
			 * 
			 */
			beforeDetailAnalysis : function(){
				// 좌측, 우측 지도 모두 지운다.
				this.clearLayers(0);	// 좌측 지도를 마커만 제외하고 다 지운다.
				
				if($catchmentAreaMain.ui.getMap(1)) {
					this.clearLayers(1);	// 오른쪽 지도도 마찬가지.
				}
				
				// 우측 지도 상단에 있는 파란 [위치 혹은 연도] 박스의 내용을 "--"로 변경하고, 왼쪽 메뉴에 표기했던 값들을 모두 "미지정"으로 바꿔준다.
				$('.divs_wrap02 div[class ^= divs] > span:nth-child(2n-1)').text("--");
				$('#leftMapOnTopYearTxt1').text('--');
				$('#detail_location_compare_2').text("미지정");
				$('#detail_year_compare_1').text("미지정");
				$('#detail_year_compare_2').text("미지정");
				//$('#year_select1, #year_select2').val('');//SGIS4_1025_생활권역_상세분석  	
				$('#year_select2').val(''); //SGIS4_1025_생활권역_상세분석  연도1이 초기화 되어서 수정
			},
			
			/**
			 * 
			 * @name         : 	setDetailMapping
			 * @description  : 	상세기능에서 지도에 뭔가를 그릴 때, 그 과정을 정리한 메소드이다.
			 * 
			 */
			setDetailMapping : function() {
				var rangeType = this.getRangeType();			// 앞에서 선택한 영향권을 참조
				var leftMapX  = this.selectCoordinate_x;	// 좌측 지도의 선택된 지점의 x좌표
				var leftMapY  = this.selectCoordinate_y;	// 좌측 지도의 선택된 지점의 y좌표
				var rigthMapX = this.selectCoordinate_x_2;		// 우측 지도의 선택된 지점의 x좌표, coorInfo[0] 와 같은 값
				var rigthMapY = this.selectCoordinate_y_2;		// 우측 지도의 선택된 지점의 y좌표 , coorInfo[1] 와 같은 값
				//SGIS4_1025_생활권역_상세분석 시작
				//var selectValue = $('#statsType03 li.active a').attr('value');		// 상세분석에서 선택한 값이다. 
				//var selectIdx = $('#statsType03 > ul > li').index($('#statsType03 li.active')); 
				
				var selectValue = $('#statsType02 li.active a').attr('value');		// 상세분석에서 선택한 값이다. // 격자분포 안으로 이사가서 수정
				var selectIdx = $('#statsType02 > ul > li').index($('#statsType02 li.active'));
				//SGIS4_1025_생활권역_상세분석 끝 
				
				// 일단 좌우 지도에 그려져있던 게 있으면 지운다.
				$catchmentAreaLeftMenu.ui.clearLayers(0);
				$catchmentAreaLeftMenu.ui.clearLayers(1);
				
				if(rangeType == "stats01") {	// 주행시간 기준
					//x좌표, y좌표, defult값 여부,맵 id(오른쪽 0)/(왼쪽 1),주행시간(0)/주행거리(1)
					$catchmentAreaMain.arcgis.event.calculateSearchArea(leftMapX, leftMapY, [selectValue],0,0, selectIdx);
					$catchmentAreaMain.arcgis.event.calculateSearchArea(rigthMapX, rigthMapY, [selectValue],1,0, selectIdx);
				} else if(rangeType == "stats02") {	// 주행거리 기준
					//x좌표, y좌표, defult값 여부,맵 id(오른쪽 0)/(왼쪽 1),주행시간(0)/주행거리(1)
					$catchmentAreaMain.arcgis.event.calculateSearchArea(leftMapX, leftMapY, [selectValue],0,1, selectIdx);
					$catchmentAreaMain.arcgis.event.calculateSearchArea(rigthMapX, rigthMapY, [selectValue],1,1, selectIdx);
				} else if(rangeType == "stats03") {	// 반경 기준
					var radius = selectValue;
					//x좌표, y좌표, defult값 여부,맵 id(오른쪽 0)/(왼쪽 1),주행시간(0)/주행거리(1)
					$catchmentAreaLeftMenu.ui.setCircleMarker(leftMapX,leftMapY,radius,0, 0, 0, selectIdx);	// 좌측 지도에 대해서 원을 그려준다.
					$catchmentAreaLeftMenu.ui.setCircleMarker(rigthMapX,rigthMapY,radius,1, 0, 0, selectIdx);	// 우측 지도에 대해서 원을 그려준다.
				}
			},
			
//			getGridShowingInfo : function(param, gridRequestor) {
//				var ulDomId = "";
//				if(gridRequestor === 'grid') {
//					ulDomId = "gridSetting";
//				} else if(gridRequestor === 'detailAnalysis') {
//					ulDomId = "gridSettingForDetail"
//				}
//				var type = param.statType;
//				if(type === 'pops') {
//					param['show1'] = $('#'+ulDomId+' .select_genger option:selected').text();
//					param['show2'] = $('#'+ulDomId+' .select_age option:selected').text();
//				} else if(type === 'family') {
//					param['show1'] = $('#'+ulDomId+' .gridFamilyList a.active').text();
//				} else if(type === 'house') {
//					param['show1'] = $('#'+ulDomId+' .gridHouseList a.active').text();
//				} else if(type === 'copr') {
//					param['show1'] = $('#'+ulDomId+' a[data-large-class].active').text();
//					param['show2'] = $('#'+ulDomId+' a[data-grdstat-type].active').text();
//				} else if(type === 'idlv') {
//					param['show1'] = $('#'+ulDomId+' li[data-stat-type="idlv"] a.active').text();
//				} else {
//					throw new Error('해당 되는 type이 없습니다');
//				}
//				
//			},
			
			// 격자 및 상세분석 조건 설정에서 어떤 조건 (인구, 가구, 주택, 사업체 및 종사자, 공시지가)을 선택했는지에
			// 따라서 기준년도 목록을 가져온다. 격자의 domId = 'gridSetting' , 상세분석의 domId
			getBaseYearList : function(domId) {
				var selectedLi = $('#'+domId +' li.active'); 
				var selectType = selectedLi.attr('data-stat-type');
				var yearList = null;
				
				if(selectType === 'pops' || selectType === 'family' || selectType === 'house') {
					yearList = $catchmentAreaMain.ui.statsBaseYear01;
				} else if(selectType === 'copr') {
					yearList = $catchmentAreaMain.ui.statsBaseYear02;
				} else if(selectType === 'idlv') {
					yearList = $catchmentAreaMain.ui.statsBaseYear03;
				}
				
				return yearList;
			},
			
			// 작업중11111
			setDetailConditionByBaseYear : function(){
				var selectBaseYear1 = $('#year_select1 option:selected').val();
				var selectBaseYear2 = $('#year_select2 option:selected').val();
				// 연도가 더 낮은 것을 기준으로 한다.
				var lowerBaseYear = selectBaseYear1 >= selectBaseYear2 ? selectBaseYear2 : selectBaseYear1;
				// 두 값 모두 만족하는 것만 탭을 활성화
				
				var by1 = $catchmentAreaMain.ui.statsBaseYear01;
				var by2 = $catchmentAreaMain.ui.statsBaseYear02;
				var by3 = $catchmentAreaMain.ui.statsBaseYear03;
				
				var isBlock1 = false;
				var isBlock2 = false;
				var isBlock3 = false;
				
				if(by1.indexOf(selectBaseYear1) == -1 || by1.indexOf(selectBaseYear2) == -1) {
					$('#gridSettingForDetail li[data-stat-type] > a[data-base-year-depends="1"]').addClass('disable');
					$('#gridSettingForDetailLess1k li[data-stat-type] > a[data-base-year-depends="1"]').addClass('disable');					
				}
				
				if(by2.indexOf(selectBaseYear1) == -1 || by2.indexOf(selectBaseYear2) == -1) {
					$('#gridSettingForDetail li[data-stat-type] > a[data-base-year-depends="2"]').addClass('disable');
					$('#gridSettingForDetailLess1k li[data-stat-type] > a[data-base-year-depends="2"]').addClass('disable');
				}
				
				if(by3.indexOf(selectBaseYear1) == -1 || by3.indexOf(selectBaseYear2) == -1) {
					$('#gridSettingForDetail li[data-stat-type] > a[data-base-year-depends="3"]').addClass('disable');
				}
				
				return lowerBaseYear;
				
			},
			
			/*----------------------------- 상세분석 기능 개발(메소드 작성) 끝 - 박상언(pse) ----------------------------------- */
			
			clearLocataionBox : function(target){ 
				$('#'+target).empty();
				if(target == 'sigungu' || target == 'sgg_spatial'){
					$('#'+target).append("<option value='0'>시군구 선택</option>");
				}else{
					$('#'+target).append("<option value='0'>읍면동 선택</option>");
				}
			},
			
			// 선택된 조건 추가
			addSelectedCondition : function(){

				var isThief = false;
				var isAllowAll = true;
				if($catchmentAreaLeftMenu.ui.whoisPop08sCaller == 'thief'){
					isThief = true;
					isAllowAll = false;
				}
				
				if(!$catchmentAreaLeftMenu.ui.checkGridStatConfigure('gridSettingForSel', isAllowAll)) return;

				var selectedTabNm = $('#gridSettingForSel li[data-stat-type].active').attr('data-stat-type');
				var param = {};
				param.statType = selectedTabNm; 
				$catchmentAreaLeftMenu.ui.setGridStatConfigure(param, 'gridSettingForSel');
				
				var itemId = selectedTabNm;
				var itemLbl = "";
				if(selectedTabNm == "pops"){//인구
					
					var genderCvs = (param.gender == undefined ? 'all' : param.gender);
					if(param.ageToCd == undefined){
						if(param.ageFromCd == undefined){
							itemId = itemId + "_" + genderCvs + "_all";
						}else{
							itemId = itemId + "_" + genderCvs + "_" + param.ageFromCd;
						}						
					}else{
						itemId = itemId + "_" + genderCvs + "_" + param.ageFromCd + "_" + param.ageToCd;
					}
					itemLbl = "인구 : " + param.schCondNm;
				}else if(selectedTabNm == "family"){//가구
					
					var householdTypeCvs = (param.householdType == undefined ? 'all' : param.householdType);
					itemId = itemId + "_" + householdTypeCvs;
					itemLbl = "가구 : " + param.schCondNm;
				}else if(selectedTabNm == "house"){//주택
					
					var rdResidTypeCvs = (param.rd_resid_type == undefined ? 'all' : param.rd_resid_type);
					var constYearCvs = (param.const_year == undefined ? 'all' : param.const_year);
					var houseAreaCdCvs = (param.house_area_cd == undefined ? 'all' : param.house_area_cd);					
					itemId = itemId + "_" + rdResidTypeCvs + "_" + constYearCvs + "_" + houseAreaCdCvs;
					itemLbl = "주택 : " + param.schCondNm;
				}else if(selectedTabNm == "copr"){//사업체 및 종사자
					
					var ksic3CdCvs = (param.ksic_3_cd == undefined ? 'all' : param.ksic_3_cd);
					itemId = itemId + "_" + param.grdstatType + "_" + ksic3CdCvs;
					if(param.grdstatType == "copr"){
						itemLbl = "사업체 : " + param.schCondNm;
					}else if(param.grdstatType == "employee"){
						itemLbl = "종사자 : " + param.schCondNm;
					}
					
				}else if(selectedTabNm == "idlv"){//공시지가

					itemLbl = "공시지가";
				}
				
				if($catchmentAreaLeftMenu.ui.checkDuplicates(itemId)){
					caMessageAlert.open("알림", "이미 선택한 조건입니다. 확인 후 다시 선택해 주세요.");
					return;
				}
				
				if(isThief){
					if($catchmentAreaLeftMenu.ui.checkMaximum(itemId, 1)){
						caMessageAlert.open("알림", "같은 주제(인구/가구/주택/사업체/종사자)에 대한 조건을 이미 선택하였습니다.<br/>변경을 원하실 경우, 해당 주제의 선택한 조건을 삭제하세요.");
						return;
					}					
				}

				var html = $catchmentAreaLeftMenu.ui.createSelcBox(itemId, itemLbl);
				$("#pop08_select").append(html);					
			},
			
			/**
			 * 
			 * @name         : createSelcBox
			 * @description  : 선택된 조건에 대한 HTML 작성
			 * 
			 */
			createSelcBox : function(pId, pLbl){
				var html = "";

				html += "<li class='selc_box' id='" + pId + "'>";
				html += "<p class='mightOverflow' style='width: 100px;'>" + pLbl + "</p>";
				html += "<a href='javascript:void(0);'><img src='/images/catchmentArea/close_small.png' class='close_small'></a>";
				html += "</li>";
				
				return html;				
			},
			
			/**
			 * 
			 * @name         : checkDuplicates
			 * @description  : 선택된 조건에 대한 중복 확인
			 * 
			 */
			checkDuplicates : function(pId, pLimit){
				var chkRst = false;
				
				if($("#pop08_select li.selc_box[id='" + pId + "']").length){
					chkRst = true;
				}
				
//				var loopCnt = $("#pop08_select").children(".selc_box").size();				
//				for(var i=0; i<loopCnt; i++){
//					if(pId == $("#pop08_select").children(".selc_box").eq(i).attr("id")){
//						chkRst = true;
//						break;
//					}
//				}
				
				return chkRst;
			},

			/**
			 * 
			 * @name         : checkMaximum
			 * @description  : 같은 카테고리에 속하는 검색조건수 제한
			 * 
			 */
			checkMaximum : function(pId, pLimit){
				var chkRst = false;
				
				if(pLimit > 0){
					var idSplit = pId.split('_');
					if(idSplit.length > 0){
						var prefix = idSplit[0];
						if(prefix == "copr"){
							prefix = prefix  + "_" + idSplit[1];
						}
						prefix = prefix + "_";
						
						if($("#pop08_select li.selc_box[id^='" + prefix + "']").length >= pLimit){
							chkRst = true;
						}
					}
				}
				
				return chkRst;
			},

			/**
			 * 
			 * @name         : decideSearchConditions
			 * @description  : 선택된 통계조건을 부모창에 전달한다.
			 * 
			 */
			decideSearchConditions : function(){
				
				var isThief = false;
				if($catchmentAreaLeftMenu.ui.whoisPop08sCaller == 'thief'){
					isThief = true;
				}
				
				var html = "";
				var itemId = "";
				var itemLbl = "";
				var loopCnt = $("#pop08_select > li.selc_box").size();
				if(isThief){					
					for(var i=0; i<loopCnt; i++){
						itemId = $("#pop08_select > li.selc_box").eq(i).attr("id");
						itemLbl = $("#pop08_select > li.selc_box").eq(i).find('p').text();
						html += "<li data-characteristics-cond='" + itemId + "'>";
						html += "<a href='javascript:void(0);' class='mightOverflow'>" + itemLbl + "</a>";
						html += "</li>";
					}
					
					$("#schCondByChaList > ul").empty();
					$("#schCondByChaList > ul").append(html);
				}else{
					var btnWidthCss = "pm91_4B";
					if(loopCnt == 3){
						btnWidthCss = "pm91_3B";
					}else if(loopCnt == 2){
						btnWidthCss = "pm91_2B";
					}else if(loopCnt == 1){
						btnWidthCss = "pm91_1B";
					}

					for(var i=0; i<loopCnt; i++){
						itemId = $("#pop08_select > li.selc_box").eq(i).attr("id");
						itemLbl = $("#pop08_select > li.selc_box").eq(i).find('p').text();						
						html += '<a href="javascript:void(0);" class="btn01 ' + btnWidthCss + ' mightOverflow noTogl" data-correlation-cond="' + itemId + '">' + itemLbl + '</a>';
					}
					$("#schCondByCorrelList").empty();
					$("#schCondByCorrelList").append(html);

// 리스트로
//					for(var i=0; i<loopCnt; i++){
//						itemId = $("#pop08_select > li.selc_box").eq(i).attr("id");
//						itemLbl = $("#pop08_select > li.selc_box").eq(i).find('p').text();
//						html += "<li data-correlation-cond='" + itemId + "'>";
//						html += "<a href='javascript:void(0);'>" + itemLbl + "</a>";
//						html += "</li>";
//					}
//					
//					$("#schCondByCorrelList > ul").empty();
//					$("#schCondByCorrelList > ul").append(html);					
				}
			},

			/**
			 * 
			 * @name         : syncSearchConditions
			 * @description  : 부모창의 통계조건을 조건설정 화면의 선택된 조건 목록에 표시한다.
			 * 
			 */
			syncSearchConditions : function(pGb){
				
				// (필요 시)부모창의 통계조건으로 조건설정 화면의 조건설정(select박스, 슬라이드바  등)까지 동기화하는 함수 작성
				// syncDetailedSettings();
				
				var html = "";
				var itemId = "";
				var itemLbl = "";				
				var loopCnt = 0;
				
	        	if(pGb == "thief"){
	        		loopCnt = $("#schCondByChaList > ul > li").size();
	        		for(var i=0; i<loopCnt; i++){
						itemId = $("#schCondByChaList > ul > li").eq(i).attr("data-characteristics-cond");
						if(itemId != undefined && itemId != null && itemId != ""){
							itemLbl = $("#schCondByChaList > ul > li").eq(i).find('a').text();	        			
		        			html += $catchmentAreaLeftMenu.ui.createSelcBox(itemId, itemLbl);
						}
	        		}
	        	}else if(pGb == "bully"){	        		
	        		loopCnt = $("#schCondByCorrelList > a").size();
	        		for(var i=0; i<loopCnt; i++){
						itemId = $("#schCondByCorrelList > a").eq(i).attr("data-correlation-cond");
						if(itemId != undefined && itemId != null && itemId != ""){
							itemLbl = $("#schCondByCorrelList > a").eq(i).text();	        			
		        			html += $catchmentAreaLeftMenu.ui.createSelcBox(itemId, itemLbl);
						}
	        		}
	        	}
	        	
        		$("#pop08_select").empty();
        		$("#pop08_select").append(html);	        	
			},
			
			/**
			 * 
			 * @name         : goFirstLeftMenu
			 * @description  : 왼쪽메뉴의 첫 페이지로 이동한다.
			 * 
			 */
			goFirstLeftMenu : function(){
	        	// 영역 > 첫페이지로	        	
				$('#areaSettingMenu').addClass('active');
				$('#statisticsDateMenu').removeClass('active');
				//$('.search_result').show();

				// 화면에서 정리해야 할 대상은 아래 함수들에 추가할 것
				$catchmentAreaLeftMenu.ui.clearUI("1");
				$('.search_wrap.area').addClass('active');
				$catchmentAreaDataBoard.ui.clearUI("1");
				var paramObj = {};
				paramObj.pageNo = "1";
				$catchmentAreaMain.ui.clearUI(paramObj);
				
				$catchmentAreaMain.ui.doToggleMap();
				$catchmentAreaDataBoard.ui.selectIndex = 0 //SGIS4_1210 추가
			},

			/**
			 * 
			 * @name         : reqGridLayout
			 * @description  : 서비스가 가능한 격자가 표출되도록 한다.
			 * 
			 */
			reqGridLayout : function(){
    			$('.grid_size > a.btn_size').removeClass('active');
    			$catchmentAreaLeftMenu.ui.setGridDisplay();
    			
    			var len = $('.grid_size > a.btn_size:visible').size();
    			if(len > 0){
    				//$('.grid_size > a.btn_size:visible').eq(len - 1).addClass('active');
    				//$('.grid_size > a.btn_size:visible').eq(len - 1).trigger('click');
    				$('.grid_size > a.btn_size:visible').eq(0).trigger('click');
    			}				
			},
			
			/**
			 * 
			 * @name         : setGridDisplay
			 * @description  : 범위(도형 면적)에 따른 서비스가 가능한 격자단위를 결정한다.
			 * 
			 */
			setGridDisplay : function(){
				
				var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
				var rangeVal = $catchmentAreaLeftMenu.ui.getRangeVal('02');
				var shpArea = $catchmentAreaObj.getShapeArea(rangeType, rangeVal);
				
				var gLvlMap = $catchmentAreaMain.ui.getGridLevelToDisplay(shpArea);
				if(gLvlMap.hasOwnProperty('min') && gLvlMap.hasOwnProperty('max')){
					var minVal = Number(gLvlMap.min);
					var maxVal = Number(gLvlMap.max);					
					var $grids = $('.grid_size > a.btn_size');
					var loopCnt = $grids.size();
					var $grid, gLvl, gLvlNo;
					for(var i=0; i<loopCnt; i++){
						$grid = $grids.eq(i);
						gLvl = $grid.attr('data-grid-level-div');
						
						// 100m, 500m, 1k 등으로 코드화 했을 때 유효(향후 격자 추가 시 작동하려면)
						gLvlNo = $catchmentAreaLeftMenu.ui.getGridValueAsNum(gLvl);
						if(gLvlNo < 0){
							gLvlNo = 1000;	// 기본값 1k
						}
						
						if(gLvlNo >= minVal && gLvlNo <= maxVal){
							$grid.show();
						}else{
							$grid.hide();
						}
					}
				}
			},			

			/**
			 * 
			 * @name         : setRangeDisplay
			 * @description  : (영역설정 화면에서)생활권역 도형 색상과 동일하게 버튼의 배경색상을 변경한다.
			 * 
			 */
			setRangeDisplay : function(pRngGb){
				
				var sectionId; 
				if(pRngGb == "T"){
					sectionId = "type_t";
				}else if(pRngGb == "D"){
					sectionId = "type_d";
				}else if(pRngGb == "R"){
					sectionId = "type_r";
				}
				
				if(sectionId !== undefined){
					// 모두 지우고 시작
					$('#type_t > a').removeClass('bg0 bg1 bg2 bg3');
					$('#type_d > a').removeClass('bg0 bg1 bg2 bg3');
					$('#type_r > a').removeClass('bg0 bg1 bg2 bg3');
					
					var activeNo = 0;
					var areas = $('#' + sectionId).children('a');					
					$.each(areas, function(idx, item){
						
						if($(item).hasClass('active')){
							
							$(item).addClass('bg' + activeNo);
							activeNo = activeNo + 1;
						}						
					});					
				}	
			},
			
			//SGIS4_1025_생활권역_임의영역 시작
			/**
			 * 
			 * @name         : setrndRangeDisplay
			 * @description  : (임의영역설정 화면에서)생활권역 도형 색상과 동일하게 버튼의 배경색상을 변경한다.
			 * 
			 */
			setrndRangeDisplay : function(){
				
				var sectionId = "dynamicTbody"; 
				
				if(sectionId !== undefined){
					// 모두 지우고 시작
					$('#dynamicTbody > a').removeClass('bg0 bg1 bg2 bg3');
				
					var activeNo = 0;
					var areas = $('#dynamicTbody').children('a');					
					$.each(areas, function(idx, item){
						
						if($(item).hasClass('active')){
							
							$(item).addClass('bg' + activeNo);
							activeNo = activeNo + 1;
						}						
					});					
				}	
			},
			//SGIS4_1025_생활권역_임의영역 끝
			/**
			 * 
			 * @name         : setStatsRangeDisplay
			 * @description  : (통계 화면에서)생활권역 도형 색상과 동일하게 버튼의 배경색상을 변경한다.
			 * 
			 */
			setStatsRangeDisplay : function(pRngGb){
				
				var sectionId; 
				if(pRngGb == "1"){
					sectionId = "statsType01";
				}else if(pRngGb == "2"){
					sectionId = "statsType02";
				}else if(pRngGb == "3"){
					sectionId = "statsType03";
				}
				
				if(sectionId !== undefined){
					// 본인만 지우고 시작
					$('#' + sectionId + ' > ul > li').removeClass('bg0 bg1 bg2 bg3');
					
					var areas = $('#' + sectionId + ' > ul > li');					
					$.each(areas, function(idx, item){
						
						if($(item).hasClass('active')){
							
							$(item).addClass('bg' + idx);
						}						
					});					
				}	
			},
			
			getGridValueAsNum : function(pVal){
				
				var rstNo = -1;
				if(pVal !== undefined && pVal !== null){				
					var gLvlNo = pVal.replace(/[^0-9]/g,'');
					if(gLvlNo != undefined && gLvlNo != null){
						if(pVal.indexOf('k') > -1){
							rstNo = Number(gLvlNo) * 1000;	
						}else if(pVal.indexOf('m') > -1){
							rstNo = Number(gLvlNo);	
						}
					}
				}
				
				return rstNo;
			},
			
			setSearchListPoi : function(list, mapId){
				var map = $catchmentAreaMain.ui.getMap(mapId);
				map.markers.clearLayers();
				
				var markerIcon = sop.icon({
					iconUrl: '/images/catchmentArea/list_poi.png',
					shadowUrl: '/img/marker/theme_shadow.png',
					iconAnchor: [12.5, 40 ],
					iconSize: [ 25, 40 ],
					infoWindowAnchor: [1, -34]
				});
				
				var sopPortalgetListPoiObj = new sop.portal.getSearchListPoi.api();
				sopPortalgetListPoiObj.addParam("sufid", list);
				
				sopPortalgetListPoiObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/OpenAPI3/catchmentArea/getSearchListPoi.json",
					options : {
						callback : function(t,d){
							$.each(t, function(index, item){
								var marker = sop.marker([ item.x_coordinate, item.y_coordinate ], {
									icon: markerIcon
								});
								
								map.markers.addLayer(marker);
				    		});
						}
					
					}
				});
			},		// SGIS4_1025_생활권역_임의영역
			
			// SGIS4_1025_생활권역_임의영역 시작			
			/**
			 * 
			 * @name         : reqScopeInfo
			 * @description  : 생활권역 임의값영역 설정정보 요청
			 * 
			 */
			reqScopeInfo : function() {
				var param = {};
				param.classDeg = $catchmentAreaMain.ui.classDeg;
				
				var options = $catchmentAreaLeftMenu.ui.reqSetParams("API_202090", param);
				$catchmentAreaLeftMenu.ui.requestOpenApi(options);
			},
			// SGIS4_1025_생활권역_임의영역 끝
			
			//SGIS4_생활권역 시작
			
			/**
			 * 
			 * @name         : reqSettingInfo
			 * @description  : 생활권역 설정정보 요청
			 * 
			 */
			reqSettingInfo : function(pWorkGb) {
				// pWorkGb: recmd-즐겨찾기, lifeBiz-생활업종
				var param = {};
				param.workGb = pWorkGb;
				param.classDeg = $catchmentAreaMain.ui.classDeg;
				
				var options = $catchmentAreaLeftMenu.ui.reqSetParams("API_202082", param);
				$catchmentAreaLeftMenu.ui.requestOpenApi(options);
			},
			
			/**
			 * 
			 * @name         : setRecmdList
			 * @description  : 한국표준산업분류 추천 목록을 구성한다.
			 * 
			 */
			setRecmdList : function(res, options) {
				var list = res.result.list;
				var html_cont = '<ul>';
					
				$.each(list, function(index, item){
					//html_cont += '<a href="javascript:void(0);" class="btn_sub mightOverflow" data-ksic-sel-cd="'+item.ksic_cd+'">' + item.ksic_cd + "." + item.ksic_nm +'</a>';
					
					var ksic_path = item.ksic_path.replace(/:/g,' > ');
					html_cont += '<li data-ksic-sel-cd="'+item.ksic_cd+'" data-ksic-sel-nm="'+item.ksic_nm+'">';
					html_cont += '<a href="#"><span class="li_nm mightOverflow">' + item.ksic_nm + '</span><br><span class="li_cd">' + item.ksic_cd + '</span><span class="li_path mightOverflow">' + ksic_path + '</span></a>';
					html_cont += '</li>';
				});
				
				html_cont += '</ul>';
				
				$(".favorlist").html(html_cont);	
			},

			/**
			 * 
			 * @name         : setLifeBizList
			 * @description  : 생활업종 목록을 구성한다.
			 * 
			 */
			setLifeBizList : function(res, options) {
				var list = res.result.list;
				//SGIS4_1025_생활권역 시작
				var html_cont = '<div class="lifeBizHead"><span></span></div><div class="lifeBizBox">';
				var html_mem_title = '';
				var html_mem_cont = '';
				var upper_cd = '';
				var upper_nm = '';				
				
				var loopCnt = list.length;
				for(var i=0; i<loopCnt; i++){
					var item = list[i];					
					var nxtItem;
					if((i + 1) < loopCnt){
						nxtItem = list[i + 1]; 
					}

					if(item.lvl === '1'){
						if(html_mem_cont !== ''){
							html_mem_cont += '</ul>';
							html_mem_cont += '</div>';
							
							html_cont = html_cont + html_mem_title + html_mem_cont;
						}						
						
						html_mem_title = '<a href="javascript:void(0);" class="roundTextBox" data-big-theme-cd="' + item.theme_cd + '">' + item.theme_cd_nm + ' (' + item.mem_cnt+ ')</a>';
						html_mem_cont = '';
						upper_cd = item.theme_cd;
						upper_nm = item.theme_cd_nm;
					}else if(item.lvl === '2'){
						if(html_mem_cont === ''){
							html_mem_cont += '<div class="lifeBizItmBox" data-big-theme-cd="' + upper_cd + '">';
							html_mem_cont += '<ul>';
							//전체 주석
							//html_mem_cont += '<li>';
							//html_mem_cont += '<span data-ksic-sel-cd="' + upper_cd + '" data-ksic-sel-nm="' + upper_nm + ' 전체">전체</span>';							
							//html_mem_cont += '</li>';
							html_mem_cont += '<li>';
							html_mem_cont += '<span class="mightOverflow" data-ksic-sel-cd="' + item.theme_cd + '" data-ksic-sel-nm="' + item.theme_cd_nm + '">' + item.theme_cd_nm + '</span>';
							if(nxtItem !== undefined && nxtItem !== null && nxtItem["lvl"] === '2'){
								html_mem_cont += '<span class="mightOverflow" data-ksic-sel-cd="' + nxtItem.theme_cd + '" data-ksic-sel-nm="' + nxtItem.theme_cd_nm + '">' + nxtItem.theme_cd_nm + '</span>';
							}
							html_mem_cont += '</li>';							
						}else{
							html_mem_cont += '<li>';
							html_mem_cont += '<span class="mightOverflow" data-ksic-sel-cd="' + item.theme_cd + '" data-ksic-sel-nm="' + item.theme_cd_nm + '">' + item.theme_cd_nm + '</span>';
							if(nxtItem !== undefined && nxtItem !== null && nxtItem["lvl"] === '2'){
								html_mem_cont += '<span class="mightOverflow" data-ksic-sel-cd="' + nxtItem.theme_cd + '" data-ksic-sel-nm="' + nxtItem.theme_cd_nm + '">' + nxtItem.theme_cd_nm + '</span>';
							}
							html_mem_cont += '</li>';							
						}
						
						if(nxtItem !== undefined && nxtItem !== null && nxtItem["lvl"] === '2'){
							i++;
						}
					}
				}
				//SGIS4_1025_생활권역 끝

				if(html_mem_cont !== ''){
					html_mem_cont += '</ul>';
					html_mem_cont += '</div>';
					
					html_cont = html_cont + html_mem_title + html_mem_cont;
				}
				
				html_cont += '</div>';
				
				$(".lifeBizList").html(html_cont);	
			},			
			
			// SGIS4_1025_생활권역_임의영역 시작
			/**
			 * 
			 * @name         : setScopeInfo
			 * @description  : 임의값 영역 설정을 구성한다.
			 * 
			 */
			setScopeInfo : function(res, options) {
				var scope_type = '';
				var list = res.result.list;
				var i = 0;
				
				// 1. 멤버변수에 list 저장.
				$catchmentAreaLeftMenu.ui.rndmScopeInfo = list;
				
				// 2. 초기 셋팅(콤보박스 구성)
				//SGIS4_생활권역_임의영역 수정 시작
				$.each(list, function(index, item) {
					var typeName = item.s_class_cd_nm.split(' ')[0];					
					scope_type += '<li><input type="radio" id="rndstats0'+ ++i +'" name="rndscopeType" value = "'+ (i-1) +'"><label for="rndstats0'+ i +'"><img src="/images/catchmentArea/toc_ico0'+ i +'.png" class="toc_ico"> '+typeName +'</label></li>';
				});
				$('#rndscopeType').html(scope_type);
				
				// 3. triger('change')
				$('#rndstats01').trigger('click');
				//SGIS4_생활권역_임의영역 수정 끝
			},
			// SGIS4_1025_생활권역_임의영역 끝

			/**
			 * 
			 * @name         : initClassCont
			 * @description  : 산업분류 선택화면을 초기화한다.
			 * 
			 */
			initClassCont : function(bowl) {				
				if(bowl.length === 1){
					var $bowl = bowl;
					$bowl.attr("data-ksic-sel-cd", "");
					$bowl.attr("data-ksic-sel-nm", "");
					//SGIS4_0629_생활권역 시작
					$bowl.attr("data-ksic-sel-main-cd", "");
					//SGIS4_0629_생활권역 끝
					
					var onList = $bowl.find('.clsSet');
					$.each(onList, function(idx, item){						
//						$(item).find('.li_conts').removeClass("sel");
//						$(item).find('.li_conts').addClass("unSel");
						
						$(item).removeClass("sel");
						$(item).addClass("unSel");
						$(item).attr("data-ksic-sel-cd", "");
						$(item).attr("data-ksic-sel-nm", "");						
//						if(idx < 2){
//							$(item).find('.li_conts').html("-");					
//						}else{
//							$(item).find('.li_conts').html("미선택");
//						}
						$(item).find('.li_conts').html("미선택");
					});	
				}		
			},

			/**
			 * 
			 * @name         : checkAreaStatConfigure
			 * @description  : 영역 내 세부항목별 조건을 적용하기 전에 먼저 validation check를 해주는 메소드이다.
			 * 
			 */
			checkAreaStatConfigure : function(pRootCtnr) {
				//SGIS4_1025_생활권역 시작
				
				// 전체 조회조건 불허 => (21.10.00)전체 허용으로 변경
				var alertMsg = "";
				var $rootCtnr = pRootCtnr;
				var loopCnt = $rootCtnr.find(".ara_chk_bx > a").size();
				var isUnselected = false;

				for(var i=0; i<loopCnt; i++){
					var $chkBx = $rootCtnr.find(".ara_chk_bx > a").eq(i);
		        	if($chkBx.hasClass('active')){		        		
		        		var $condBx = $rootCtnr.find(".ara_cond_bx > li").eq(i);
		        		var condBxType = $condBx.attr('data-stat-type');

						if(condBxType == "pops"){//인구								
							if(!$condBx.find(".div_age_single5 .age_single_chk.on").hasClass('currDp')
									&& !$condBx.find(".div_age_single10 .age_single_chk.on").hasClass('currDp')
									&& !$condBx.find(".div_age_singleRnd .age_single_chk.on").hasClass('currDp')
									){
//								if($condBx.find(".select_genger option:selected").attr("value") == "00"){								
//									alertMsg += "<br/>[인구] 성별 또는 연령대를 선택해 주세요.";
//								}
								
								isUnselected = true;
							}
						}else if(condBxType == "family"){//가구
							if($condBx.find(".gridFamilyList a.active").length === 0) {
//								alertMsg += "<br/>[가구] 세대구성(다중선택) 조건을 선택해 주세요.";
								isUnselected = true;
							}
//							else if($condBx.find(".gridFamilyList a").length === $condBx.find(".gridFamilyList a.active").length) {
//								alertMsg += "<br/>[가구] 전체(세대구성 전체 선택) 조건으로 조회할 수 없습니다.";
//							}
						}else if(condBxType == "house"){//주택
							// 건축년도를 조건으로 체크했다면
							if($condBx.find(".div_constYear .con_chk.on").hasClass('currDp')){
								var $cyOpt = $condBx.find(".select_constYear option:selected");
								if($cyOpt.attr("value") == ""){
									alertMsg += "[주택] 건축년도 조건을 선택하였습니다.<br/>조건값을 선택해 주세요.";
								}
							}else if($condBx.find(".div_houseBdspace .con_chk.on").hasClass('currDp')){
								var $cyOpt = $condBx.find(".selct_houseTotArea option:selected");
								if($cyOpt.attr("value") == ""){
									alertMsg += "[주택] 연면적 조건을 선택하였습니다.<br/>조건값을 선택해 주세요.";
								}	
							//SGIS4_1210 수정 시작	
							}else if($condBx.find(".div_houseType .con_chk.on").hasClass('currDp')){
								if($condBx.find(".gridHouseList a.active").length === 0 ) {
									alertMsg += "[주택] 주택종류 조건을 선택하였습니다.<br/>주택종류(다중선택)를 선택해 주세요.";		
								}						
							}else{
								isUnselected = true;
							}
							//SGIS4_1210 수정 끝
						}else if(condBxType == "copr" || condBxType == "employee"){	//사업체 or 종사자
							var sectorNm = "사업체";
							if(condBxType == "employee"){
								sectorNm = "종사자";
							}
							var tabNm = $condBx.find('a[data-grdstat-type].active').attr("data-grdstat-type");
							if(tabNm == "tabFavorites"){						
								//var $selItm = $condBx.find('.favorlist li.active');
								var $selItm = $condBx.find('.lifeBizList .lifeBizBox li > span.active');
								if($selItm.length === 0){
//									alertMsg += "<br/>[ " + sectorNm + "] 주요 생활업종 세부 항목을 선택해 주세요.";
									isUnselected = true;
								}
							}else if(tabNm == "tabIndustryClass"){
								var $selItm = $condBx.find('.classCont .clsSet.sel');
								if($selItm.length === 0){
//									alertMsg += "<br/>[" + sectorNm + "] 한국산업표준분류 세부 항목을 선택해 주세요.";
									isUnselected = true;
								}
							}
						}		        		
		        	}						
				}				

				if(isUnselected){
					var unSelMsg = "세부 조건을 한 개이상 선택하여 주시기 바랍니다.<br/>총괄정보를 보기 위해서는 '세부 조건 설정' 체크를 해제하여 주시기 바랍니다.";
					caMessageAlert.open("알림", unSelMsg);					
					return false;
				}else{
					if(alertMsg) {
//						alertMsg = "영역 통계 세부항목 설정에서는<br/>전체(세부 조건항목 미선택) 조건으로 조회할 수 없습니다.<br/>" + alertMsg;
						caMessageAlert.open("알림", alertMsg);
						return false;
					}
				}
				
				return true;
				
				//SGIS4_1025_생활권역 끝
			},
			
			moveScroll : function() {
				$(".search_wrap.statistics .scroll_wrap.scroll_02").mCustomScrollbar('scrollTo', 'bottom');
			},		//SGIS4_1025_생활권역 수정
			//SGIS4_생활권역 끝
			
			//SGIS4_1025_생활권역 시작
			/**
			 * 
			 * @name         : getMyDataList
			 * @description  : 나의데이터 리스트를 불러온다.
			 * 
			 */
			getMyDataList : function(userId, mapId, terget){
				console.log("getMyDataList 호출");
				console.log(mapId);
				var sopPortalGetMyDataListObj = new sop.portal.getMyDataList.api();
				sopPortalGetMyDataListObj.addParam("userId", userId);
				sopPortalGetMyDataListObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/OpenAPI3/catchmentArea/getMyDataList.json",
					options : {
						callback : function(result){
							$("#"+terget+"List").empty();
							
							if(result.length == 0){//나의 데이터 없을때
								$("#"+terget+"_2").show();
								$("#"+terget+"_1").hide();
								$("#"+terget+"_3").hide();
							}else{
								var html = "";
								
								for (var i = 0; i < result.length; i++) {
									var elem = result[i];
									html += "<li>";
									//SGIS4_1028_생활권역 시작
									html += "	<a onclick='javascript:$catchmentAreaLeftMenu.ui.getMyDataCoordinate(\"" + elem.DATA_ID + "\", "+ mapId + ", \""+ terget + "\")';>"+ elem.DATA_TITLE +"<br>"
									//SGIS4_1028_생활권역 끝
									html += "	<span class='user_id'>" + elem.USR_ID + "</span>";
									html += "	<span class='mydata_date'>" + elem.upload_dt + "</span>";
									html += "	</a>";
									html += "</li>";
								}
								$("#"+terget+"List").html(html);
								$("#"+terget+"_3").show();
								$("#"+terget+"_1").hide();
								$("#"+terget+"_2").hide();
								
							}
						}
					}
				});
			},
			
			/**
			 * 
			 * @name         : getMyDataCoordinate
			 * @description  : 나의데이터 업로드데이터 리스트를 불러온다.
			 * 
			 */
			getMyDataCoordinate : function(dataId, mapId, target){		//SGIS4_1028_생활권역
				//console.log(dataId);
				//console.log(mapId);
				var sopPortalMyDataCoordinateObj = new sop.portal.myDataCoordinate.api();
				sopPortalMyDataCoordinateObj.addParam("dataId", dataId);
				sopPortalMyDataCoordinateObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/OpenAPI3/catchmentArea/getMyDataCoordinate.json",
					options : {
						callback : function(result){
							var infoData = result.mainData;
							var upLoadData = result.uploadData;
							var filterData = [];
							
							//SGIS4_1028_생활권역 시작
							var screenGb = "";			// A:지점영역 선택화면, B:공간비교 선택화면
							var searchGb = "boundary";	// sgg:행정구역 기준 검색, boundary:화면 내 검색  
							if(target == "myData"){
								screenGb = "A";
							}else if(target == "spatial_myData"){
								screenGb = "B";
							}							
							
							var locCd;
							if(screenGb == "A"){
								if($("input:radio[id='schTypeGbA01']").is(":checked")){
									locCd = $("#mapLocation_1").attr("data-loc-cd");
									searchGb = "sgg";
								}								
							}else if(screenGb == "B"){
								if($("input:radio[id='schTypeGbB01']").is(":checked")){
									locCd = $("#spatialSearchHeader").attr("data-loc-cd");
									searchGb = "sgg";
								}
							}
							
							if(searchGb == "sgg"){
			            		if(locCd !== undefined && locCd !== null && locCd.length >= 5){
			            			var locSggCd = locCd.substring(0, 5); 

									$.each(upLoadData, function(index, item){
										if(item["ADM_CD"] !== undefined && item["ADM_CD"] !== null && item["ADM_CD"].startsWith(locSggCd)){
											filterData.push(item);
										}
									});
			            		}								
							}else if(searchGb == "boundary"){
			            		var map = $catchmentAreaMain.ui.getMap(mapId);
			            		var mapBounds = map.gMap.getBounds();

								var southWestX = Number(mapBounds._southWest.x);
								var southWestY = Number(mapBounds._southWest.y);
								var northEastX = Number(mapBounds._northEast.x);
								var northEastY = Number(mapBounds._northEast.y);
								
								$.each(upLoadData, function(index, item){
									var x_coor = Number(item.GEO_X);
									var y_coor = Number(item.GEO_Y);
									
									if((x_coor > southWestX && x_coor < northEastX) && (y_coor > southWestY && y_coor < northEastY)){
										filterData.push(item);
									}
								});								
							}
							//SGIS4_1028_생활권역 끝
							
							$catchmentAreaLeftMenu.ui.setMyUploadDataList(infoData, filterData, mapId);
						}
					}
				});
			},
			
			setMyUploadDataList : function(infoData, uploadData, mapId){
				//SGIS4_1029_생활권역 시작
				var markerIcon = sop.icon({
					iconUrl: '/images/catchmentArea/list_poi.png',
					shadowUrl: '/img/marker/theme_shadow.png',
					iconAnchor: [16, 32 ],
					iconSize: [ 32, 32 ],
					infoWindowAnchor: [1, -34]
				});
				//SGIS4_1029_생활권역 끝
				
				if(uploadData.length != 0){
						
					map = $catchmentAreaMain.ui.getMap(mapId);
					map.markers3.clearLayers();
					if(mapId == 0){
						$catchmentAreaLeftMenu.ui.map1PoiMarkerMap = {};
					}else{
						$catchmentAreaLeftMenu.ui.map2PoiMarkerMap = {};
					}

					var html = '<ul class="res_li_sp">';
					$.each(uploadData, function(index, item){
						var InfoMap = JSON.parse(item.USR_DATA);
						html += '<li id="myData_'+item.SEQ+'" data-x='+item.GEO_X+' data-y='+item.GEO_Y+' data-map-id='+mapId+'>';
						html += 	'<span class="sa_txt01"><a class="mightOverflow" href="#">'+InfoMap.C+'</a></span>';
						html += 	'<span class="txt02">나의 데이터</span>';
						html += 	'<div class="txt03">'+InfoMap.D+'</div>';
						html += '</li>';
							
						var that = item;
						var marker = sop.marker([ item.GEO_X, item.GEO_Y ], {
							icon: markerIcon
						});								
						map.markers3.addLayer(marker);
						if(mapId == 0){
							$catchmentAreaLeftMenu.ui.map1PoiMarkerMap['myData_' + item.SEQ] = marker;
						}else{
							$catchmentAreaLeftMenu.ui.map2PoiMarkerMap['myData_' + item.SEQ] = marker;
						}
						marker.on({
							click : function (e) {
								//SGIS4_1029_생활권역 시작
								var thatMap = $catchmentAreaMain.ui.getMap(mapId);
								thatMap.markers.clearLayers(); //마커 초기화										
								
								if(mapId == 0){
									var selItm = $catchmentAreaLeftMenu.ui.map1PoiMarkerMap['selMarker'];
								}else{
									var selItm = $catchmentAreaLeftMenu.ui.map2PoiMarkerMap['selMarker'];
								}
								
								if(selItm !== undefined && selItm !== null && !thatMap.markers3.hasLayer(selItm)){
									thatMap.markers3.addLayer(selItm);
								}
								if(mapId == 0){
									$catchmentAreaLeftMenu.ui.map1PoiMarkerMap['selMarker'] = e.target;
								}else{
									$catchmentAreaLeftMenu.ui.map2PoiMarkerMap['selMarker'] = e.target;
								}
								
								thatMap.markers3.removeLayer(e.target);
									
								if(mapId == 0){
									$('#totalSearchResult li[id="myData_' + item.SEQ + '"]').trigger('click');
										
									var selItemTop = $('#totalSearchResult li[id="myData_' + item.SEQ + '"]').position().top;										
									$('#totalSearchResult li[id="myData_' + item.SEQ + '"]').closest("div.scroll_06").mCustomScrollbar("scrollTo", selItemTop);
								}else{
									$('#totalSearchResult_sp li[id="myData_' + item.SEQ + '"]').trigger('click');
										
									var selItemTop = $('#totalSearchResult_sp li[id="myData_' + item.SEQ + '"]').position().top;										
									$('#totalSearchResult_sp li[id="myData_' + item.SEQ + '"]').closest("div.scroll_10").mCustomScrollbar("scrollTo", selItemTop);
								}
								//SGIS4_1029_생활권역 끝	
							}									
						});
					});
						
					if(mapId == 0){
						$("#totalSearchResult").empty();
						$('.search_wrap').removeClass('active');
						$('.search_wrap.sisul').addClass('active');
							
						$(".location .cate01").text("나의데이터");
						$(".location .cate02").hide();
						//$(".location .cate02").text(infoData.DATA_TITLE);
						$(".location .cate03").text(infoData.DATA_TITLE+"("+uploadData.length+")");
						$("#totalSearchResult").html(html);
					}else{
						$('#totalSearchResult_sp').empty();
						$('#spatial_position_search_box').removeClass('active');
						$('#facilityTypeSearchDatail_for_spatial').addClass('active');
							
						$(".location .cate01_sp").text("나의데이터");
						$(".location .cate02").hide();
						//$(".location .cate02").text(infoData.DATA_TITLE);
						$(".location .cate03").text(infoData.DATA_TITLE+"("+uploadData.length+")");
						
						$("#totalSearchResult_sp").html(html);
					}
				}else{
					
					
					var msg = "";
					
					if(mapId == 0){
						if($("input:radio[id='schTypeGbA01']").is(":checked")){
							msg ="현재 시군구에는 나의 데이터가 존재하지 않습니다."; 
						}else{
							msg = "현재 보이는 화면 내에서는 나의 데이터가 존재하지 않습니다.";
						}
						
						$("#totalSearchResult").empty();
						$('.search_wrap').removeClass('active');
						$('.search_wrap.sisul').addClass('active');
						
						$(".location .cate01").text("나의데이터");
						$(".location .cate02").hide();
						//$(".location .cate02").text(infoData.DATA_TITLE);
						$(".location .cate03").text(infoData.DATA_TITLE+"("+uploadData.length+")");
						
						html ='<ul class="res_li"><li><span class="sa_txt01">' + msg+ '</span></li></ul>';		
						$("#totalSearchResult").html(html);
					}else{
						if($("input:radio[id='schTypeGbB01']").is(":checked")){
							msg ="현재 시군구에는 나의 데이터가 존재하지 않습니다."; 
						}else{
							msg = "현재 보이는 화면 내에서는 나의 데이터가 존재하지 않습니다.";
						}
						
						$('#totalSearchResult_sp').empty();
						$('#spatial_position_search_box').removeClass('active');
						$('#facilityTypeSearchDatail_for_spatial').addClass('active');
						
						$(".location .cate01_sp").text("나의데이터");
						$(".location .cate02_sp").hide();
						//$(".location .cate02_sp").text(infoData.DATA_TITLE);
						$(".location .cate03_sp").text(infoData.DATA_TITLE+"("+uploadData.length+")");
						
						html ='<ul class="res_li_sp"><li><span class="sa_txt01">' + msg+ '</span></li></ul>';		
						$("#totalSearchResult_sp").html(html);	
					}
				}
			},	//SGIS4_1028_생활권역
			//SGIS4_1025_생활권역 끝
			//SGIS4_1028_생활권역 시작
			/**
			 * 
			 * @name         : clickStatisticsDataBtn
			 * @description  : [통계정보 보기] 버튼 클릭에 대한 처리
			 * 
			 */
			clickStatisticsDataBtn : function(pRangeType) {
				//id = 'statisticsDataBtn' 클릭 이벤트핸들에서 옮겨옴
				
				srvLogWrite('Q0','02','10','00','','');
				// 제일 먼저 임의값인지 아닌지 rndmFlag 설정하기.
				$catchmentAreaLeftMenu.ui.rndmFlag = $('#fixed_rndm').val() == 'rndm' ? true : false;	
	    	   
				// 유효성 체크
				var rangeType = pRangeType;
				var sectionId = "";
				var chkMsg = "";
//		    	   if($catchmentAreaLeftMenu.ui.rndmFlag) {
	    		   
//		    	   } else {
	    		   if(rangeType == "stats01"){
		    		   sectionId = "type_t";
		    	   }else if(rangeType == "stats02"){
		    		   sectionId = "type_d";
		    	   }else if(rangeType == "stats03"){
		    		   sectionId = "type_r";
		    	   }
	    		   if(sectionId == ""){
		    		   chkMsg = "영역(시간/거리/반경) 기준을 선택해 주세요.";
		    	   }else{
		    		   if($catchmentAreaLeftMenu.ui.rndmFlag) {
//			    			   $("#dynamicTbody tr").children("td").each(function(){
//									var on = $(this).hasClass("active");
		    			   if($("#dynamicTbody > a.active").length === 0){ //SGIS4_생활권역_임의영역 수정
			    			   chkMsg = "최소 1개, 최대 4개의 영역을 선택해 주세요.";
			    		   }
		    		   } else {
		    			   if($("#" + sectionId + " > a.active").length === 0){
			    			   chkMsg = "최소 1개, 최대 4개의 영역을 선택해 주세요."; //SGIS4_생활권역_임의영역 수정
			    		   }
		    		   }
		    	   }
//		    	   }
			   //SGIS4_1025_생활권역_임의영역 끝
	    	   
	    	   if(chkMsg !== ""){
	    		   caMessageAlert.open("알림", chkMsg);
	    		   return;
	    	   }		    	   
	    	   
//		    	   var base_year = $catchmentAreaMain.ui.getBaseYear("1", "L", "");
//		    	   var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
//		    	  
//		    	   //주행거리 기준 영향권 통계값 가져오기
//		    	   $catchmentAreaLeftMenu.ui.settingStatisticsData(base_year,rangeType, 1);//년도, 그리드레벨, 초기값(1,2,3,4), 

	    	   //통계정보 dispaly 이벤트
	    	   $catchmentAreaLeftMenu.ui.settingStatisticsDataList();
	    	   $("#areaSettingMenu").removeClass('active');
	    	   $("#statisticsDateMenu").addClass('active');
	    	   $(".search_wrap.area").removeClass('active');
	    	   $(".search_wrap.sisul").removeClass('active');
	    	   $(".search_wrap.year").removeClass('active');		    	   	    	   
	    	   $(".search_wrap.statistics").addClass('active');
	    	   //SGIS4_1025_생활권역 시작
	    	   if($(".search_wrap.statistics .whAraDtlChk > .dtlCond_chk.on").is(':visible')){
	    		   $(".search_wrap.statistics .whAraDtlChk > .dtlCond_chk.on").trigger("click");
        		}
	    	   //SGIS4_1025_생활권역 끝	
	    	   $("#btnList_1").show();
    	   
//		    	   var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
//		    	   var $rangeFirstItm;
//		    	   var rangeFirstIdx;
//		    	   if(rangeType == "stats01"){		    		   
//		    		   $rangeFirstItm = $("#type_t > a.active").first();		    		   
//		    		   rangeFirstIdx = $("#type_t > a.active").index($rangeFirstItm); 
//		    	   }else if(rangeType == "stats02"){		    		   
//		    		   $rangeFirstItm = $("#type_d > a.active").first();		    		   
//		    		   rangeFirstIdx = $("#type_d > a.active").index($rangeFirstItm);
//		    	   }else if(rangeType == "stats03"){		    		   
//		    		   $rangeFirstItm = $("#type_r > a.active").first();		    		   
//		    		   rangeFirstIdx = $("#type_r > a.active").index($rangeFirstItm);   		   
//		    	   }
//		    	   $catchmentAreaDataBoard.ui.setSelectIndex(rangeFirstIdx);
	    	   $catchmentAreaDataBoard.ui.setSelectIndex(1);

	    	   $catchmentAreaLeftMenu.ui.requestSrvAreaStatsData('0', 1);
	    	   
	    	   //영향권 데이터보드 호출
	    	   $catchmentAreaDataBoard.event.getDataBoard(1);
			   srvLogWrite('Q0','03','01','00','','');				
			}
			//SGIS4_1028_생활권역 끝
			
			//SGIS4_1124_시설유형 추가 관련(x,y좌표 바로 가지고 와서 마커랑 위치, 팝업창 생성) 시작
			, setfacilityTypeListPoint : function(sufid, name, roadAdres, x_coor, y_coor , mapId, poiMapingval){
				if(!mapId) mapId = 0;
				var thatMap = $catchmentAreaMain.ui.getMap(mapId);
				thatMap.markers.clearLayers(); //마커 초기화
				
				if(mapId === 0) {
					var selItm = $catchmentAreaLeftMenu.ui.map1PoiMarkerMap['selMarker'];
					if(selItm !== undefined && selItm !== null && !thatMap.markers3.hasLayer(selItm)){
						thatMap.markers3.addLayer(selItm);
					}
					
					var selMarker = $catchmentAreaLeftMenu.ui.map1PoiMarkerMap['sufid_' + sufid];
					$catchmentAreaLeftMenu.ui.map1PoiMarkerMap['selMarker'] = selMarker;
					$catchmentAreaMain.ui.getMap(mapId).markers3.removeLayer(selMarker);								
				}else if(mapId === 1) {
					var selItm = $catchmentAreaLeftMenu.ui.map2PoiMarkerMap['selMarker'];
					if(selItm !== undefined && selItm !== null && !thatMap.markers3.hasLayer(selItm)){
						thatMap.markers3.addLayer(selItm);
					}								
					
					var selMarker = $catchmentAreaLeftMenu.ui.map2PoiMarkerMap['sufid_' + sufid];
					$catchmentAreaLeftMenu.ui.map2PoiMarkerMap['selMarker'] = selMarker;
					$catchmentAreaMain.ui.getMap(mapId).markers3.removeLayer(selMarker);								
				}
				
				$catchmentAreaLeftMenu.ui.moveTargetArea(name, roadAdres, x_coor, y_coor, poiMapingval, mapId, "M3", 12, sufid);
			}
			//SGIS4_1124_시설유형 추가 관련 끝
	};

	$catchmentAreaLeftMenu.callbackFunc = {
		//SGIS4_생활권역 시작
			didSelectKSICItem : function(pObj) {
				if(pObj !== undefined && pObj !== null){
					var selObj = pObj;
					var selKsicCode = selObj["ksicCode"];
					var classDepth = selKsicCode.length;
					var classList = ["mainCl", "middleCl", "subCl", "subDiv1", "subDiv2"];
					
					if(selObj["params"] !== undefined && selObj["params"] !== null){
						// 격자분포
						if(selObj.params["workGb"] == "gridStat_copr" || selObj.params["workGb"] == "gridStat_employee" || selObj.params["workGb"] == "areaStat_copr" || selObj.params["workGb"] == "areaStat_employee"){		
							var $div;
							if(selObj.params["workGb"] == "gridStat_copr"){
								$div = $('.search_result.chk_02 li[data-stat-type="copr"] div.classCont');
							}else if(selObj.params["workGb"] == "gridStat_employee"){
								$div = $('.search_result.chk_02 li[data-stat-type="employee"] div.classCont');
							}else if(selObj.params["workGb"] == "areaStat_copr"){
								$div = $('.search_result.chk_01 li[data-stat-type="copr"] div.classCont');
							}else if(selObj.params["workGb"] == "areaStat_employee"){
								$div = $('.search_result.chk_01 li[data-stat-type="employee"] div.classCont');
							}
							var clsNms = "";
							if(classDepth === 1){
								clsNms = selObj["ksicCodeNm"];
							}else{
								clsNms = selObj["superKsicCodeNm"].split(":");
							}
							var loopCnt = classList.length;
							for(var i=0; i<loopCnt; i++){
//								$div.find('.' + classList[i] + ' .li_conts').removeClass("sel");
//								$div.find('.' + classList[i] + ' .li_conts').removeClass("unSel");
								
								$div.find('.' + classList[i]).removeClass("sel");
								$div.find('.' + classList[i]).removeClass("unSel");
								$div.find('.' + classList[i]).attr("data-ksic-sel-cd", "");
								//SGIS4_0629_생활권역 시작
								$div.find('.' + classList[i]).attr("data-ksic-sel-nm", "");
								$div.find('.' + classList[i]).attr("data-ksic-sel-main-cd", "");
								//SGIS4_0629_생활권역 끝
								
								if(classDepth === (i+1)){
									$div.find('.' + classList[i] + ' .li_conts').html(selObj["ksicCode"] + "." + selObj["ksicCodeNm"]);
//									$div.find('.' + classList[i] + ' .li_conts').addClass("sel");
									$div.find('.' + classList[i]).addClass("sel");
									
									$div.attr("data-ksic-sel-cd", selObj["ksicCode"]);
									$div.attr("data-ksic-sel-nm", selObj["ksicCodeNm"]);
									//SGIS4_0629_생활권역 시작
									$div.attr("data-ksic-sel-main-cd", selObj["mainKsicCd"]);
									//SGIS4_0629_생활권역 끝
									$div.find('.' + classList[i]).attr("data-ksic-sel-cd", selObj["ksicCode"]);
									$div.find('.' + classList[i]).attr("data-ksic-sel-nm", selObj["ksicCodeNm"]);									
								}else if(classDepth > (i+1)){
									if(i === 0){
										$div.find('.' + classList[i] + ' .li_conts').html(selObj["mainKsicCd"] + "." + clsNms[i]);
										
										$div.find('.' + classList[i]).attr("data-ksic-sel-cd", selObj["mainKsicCd"]);
										$div.find('.' + classList[i]).attr("data-ksic-sel-nm", clsNms[i]);										
									}else{
										$div.find('.' + classList[i] + ' .li_conts').html(selKsicCode.substring(0, (i + 1)) + "." + clsNms[i]);
										
										$div.find('.' + classList[i]).attr("data-ksic-sel-cd", selKsicCode.substring(0, (i + 1)));
										$div.find('.' + classList[i]).attr("data-ksic-sel-nm", clsNms[i]);
									}
								}else{
									$div.find('.' + classList[i] + ' .li_conts').html("미선택");
//									$div.find('.' + classList[i] + ' .li_conts').addClass("unSel");
									$div.find('.' + classList[i]).addClass("unSel");
								}
							}
							
							// SGIS4_1025_생활권역 시작
							$("#stats_search_btn").trigger("click");
							// SGIS4_1025_생활권역 끝
						}
					}
				}
			}
		//SGIS4_생활권역 끝			
	};
	
	$catchmentAreaLeftMenu.event = {
			
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : Left 메뉴 UI에서 사용하는 이벤트 및 초기설정을 수행한다.
			 * 
			 */	
			setUIEvent : function() {
				var body = $("body");
				
				//메뉴열기
		        body.on("click", "#menuButton", function(){
		        	$(".shadow_group").css("display","block");
		        	$('#areaSettingMenu').removeClass('active');
		        	$('#statisticsDateMenu').removeClass('active');
		        	$("#menuButton").css("display","none");
		        	
		        	if($catchmentAreaLeftMenu.ui.curLeftPage == "2"){
		        		$('#areaSettingMenu').addClass('active');
		        		$('.search_wrap.sisul').addClass('active');
		        	}else if($catchmentAreaLeftMenu.ui.curLeftPage == "3"){
		        		$('#areaSettingMenu').addClass('active');
		        		$('.search_wrap.year').addClass('active');
		        	}else if($catchmentAreaLeftMenu.ui.curLeftPage == "4"){
		        		$('#statisticsDateMenu').addClass('active');
		        		$('.search_wrap.statistics').addClass('active');		        		
		        		$catchmentAreaMain.ui.doToggleMap();
		        	}else{
		        		$('#areaSettingMenu').addClass('active');
			        	$('.search_wrap.area').addClass('active');
			        	$('.search_result').show();		        		
		        	}
		    	});
		        
		        //퍼블... start
		        body.on("click", "#areaSettingMenu", function(){
		        	srvLogWrite('Q0','01','05','00','','');
		        	if($('.search_wrap.area').is(':visible')){		        		
		        		
			        	$(".shadow_group").css("display","none");
			        	$("#menuButton").css("display","block");

						$catchmentAreaLeftMenu.ui.clearUI("1");
						$catchmentAreaDataBoard.ui.clearUI("1");
						var paramObj = {};
						paramObj.pageNo = "1";						
						$catchmentAreaMain.ui.clearUI(paramObj);

	        			$catchmentAreaLeftMenu.ui.curLeftPage = "1";
	        			
	        			$catchmentAreaMain.ui.doToggleMap();
		        	}else{
			        	var existFlag = $catchmentAreaObj.chkExistData();		        	
			        	if(existFlag == "0"){
			        		$catchmentAreaLeftMenu.ui.goFirstLeftMenu();
			        		$("#btnList_1").hide();
			        	}else{
			        		caMessageConfirm.open(
								 "알림", 
								 "해당 버튼을 누를 경우, 선택된 지점·영역 및 통계정보가 초기화됩니다.<br>" +
								 "진행하시겠습니까?",
								 btns = [
									{
									    title : "예",
									    fAgm : null,
									    disable : false,
									    func : function(opt) {
									    	$catchmentAreaObj.clearObj();
									    	$catchmentAreaLeftMenu.ui.goFirstLeftMenu();
									    	$("#btnList_1").hide();
									    }
									 },
									 
								     {
									   title : "아니오",
									   fAgm : null,
									   disable : false,
									   func : function(opt) { return; }
								     }   
								 ]
							);		        		
			        	}
		        	}
		    	});
		        
		        body.on("click", "#statisticsDateMenu", function(){
					srvLogWrite('Q0','01','06','00','','');
		        	if($catchmentAreaObj.chkExistData() == "0"){
		        		caMessageAlert.open("알림", "통계정보를 조회할 위치·영역을 먼저 선택하세요.");
		        		return false;
		        	}
		        		
		        	if($('.search_wrap.year').is(':visible')){
		        		$('#statisticsDataBtn').trigger('click');
		        	}else if($('.layer_pop06').hasClass('active')|| $('.search_wrap.spatial_sisul').hasClass('active')){
		        		$('.layer_pop06').removeClass('active');
		        		$('.search_wrap.spatial_sisul').removeClass('active');
		        		$('.search_wrap.statistics').addClass('active');
		        	}

		        	// 통계로의 이동 가능여부를 확인하는 부분 구현 후 내용 수정  
//		        	$('.search_wrap').removeClass('active');
//		    		$('.search_wrap.statistics').addClass('active');
//		    		$(this).addClass('active');
//		    		$('#areaSettingMenu').removeClass('active');
		    	});
		        
		        body.on("click", "div.select > a", function(){
		        	$(this).next('ul').toggle();
		        	return false;
		    	});
		        
		        /*
		        body.on("click", "div.select > ul > li", function(){
		        	$(this).parent().hide().parent('div.select').children('a').text($(this).text());
		        	$(this).parent().hide().parent('div.select').children('a').attr("value",$(this).attr("value"));
		    		//$(this).prependTo($(this).parent());
		    	});
		    	*/
		        /*
		        body.on("click", ".ex_select", function(){
	        		$('.search_result').show();
	        		return false;
		        });
		        */
		        
		        /* 통계 종목 선택 이벤트*/
		        body.on("click", ".chk_group > ul > li > a", function(){
		        	//var isOn = $(this).closest('.chk').find('.btn_toggle.on').hasClass('active'); // 자신의 On 버튼을 클릭해서 Off로 만들면, 지금 이 방식으로는 안됨...
		        	var isOn = $(this).closest('.chk').find('.btn_toggle.on').is(':visible');	// On 버튼이 토글된 상태에서만 동글뱅이를 선택할 수 있게 수정
		        	if(isOn) {	// On 버튼이 활성화되어 있으면...
		        	if(!$(this).parents('.chk').hasClass('chk_01')) {
		        		//격자, 상세분석 클릭이벤트
			        	if($(this).parent('li').hasClass('active')){
			        		// 반드시 하나는 선택된 상태여야 한다. - pse 2020-10-22 추가
			        		if($(this).closest('ul').find('li.active').length == 1) {
			        			return;
			        		}
			    			$(this).parent('li').removeClass('active');
			    		}else {
			    			$(this).parent('li').addClass('active');
			    			$(this).parent('li').siblings('li').removeClass('active');
			    			
			    			// 테스트 2020-11-10 시작
			    			$('.close_btn03').trigger('click');
			    			$('.pop_btn01').hide();
			    			// 테스트 2020-11-10 끝
			    			// 아래 if문의 내용은 다음과 같다.
			    			// ( 상세분석의 토글버튼이 ON ) and ( map2에 현재 검색 마커가 존재 ) ==> true
			    			if(!$('#gridDataType03').is(':visible') && $catchmentAreaMain.ui.getMap2SearchMarker()){
			    				$catchmentAreaLeftMenu.ui.setDetailMapping();
			    			}
			    		}
			        	
			        	//격자
			    		if($(this).parents('.chk_group').attr('id') == "statsType02"){
			    			srvLogWrite('Q0','03','03','01','선택 기준 값 - 시간/'+$(this).text(),'');
			    			$catchmentAreaLeftMenu.ui.reqGridLayout();
			    			// 도형색상과 일치
			    			$catchmentAreaLeftMenu.ui.setStatsRangeDisplay("2");
							//SGIS4_1025_생활권역_상세정보 시작
			    			if($('#gridDataType02').next().is(':visible') && $("#gridDataType03.btn_toggle.off").hasClass('active')) {	// 격자 토글버튼이 선택된 상태일 때만 동작하도록 한다. - pse 2020-10-22 추가
			    				$("#stats_search_btn").trigger("click"); 			    				
			    			}
			    			//SGIS4_1025_생활권역_상세정보 끝
			    			
			    		}else if($(this).parents('.chk_group').attr('id') == "statsType03"){
			    			// 도형색상과 일치
			    			$catchmentAreaLeftMenu.ui.setStatsRangeDisplay("3");
			    		}

			    	}else{//영향권
			    		// 범위 변경은 이전 페이지(영역 설정)에서만 가능
			    		caMessageAlert.open("알림", "영역 변경은 이전 [영역 설정] 화면에서 가능합니다.");
//			    		if($(this).parent('li').hasClass('active')){
//			    			$(this).parent('li').removeClass('active');
//			    		}else {
//			    			$(this).parent('li').addClass('active');
//			    		}
			    	}
		        	}
		        });

		        /* 거리 체크 */
		        body.on("click", ".btn_toggle", function(){
		        	//SGIS4_1025_생활권역_상세분석 시작
		        	//격자분포 안에 있는 공간적/시간적 비교분석 토글버튼
		        	if($(this).attr("id") == "gridDataType03"){
		        		if($(this).hasClass("off")){
			        		$('#gridDataType03.off').hide(); // 토글 버튼
			        		$('#gridDataType03.on').show();
			        		$('#gridDataType03.on').addClass('active');
			        		$('#gridDataType03.off').removeClass('active');
			        		$('#detail_analysis_tab').addClass('active');
			        		$("#year_select1").val($('#bYearSel06 option:selected').val()).prop("selected",true);
			        		$('.divs_wrap02 div[class ^= divs] > span:nth-child(2n-1)').text("--");
							$('#leftMapOnTopYearTxt1').text('--');
			        		$('#detail_location_compare_2').text("미지정");
			        		$('#detail_year_compare_2').text("미지정");
	    					$('#year_select2').val('');
			         		if($("#detailedAnal02").hasClass("active")){
				        		$("#bYearSel06").attr("disabled", true);
			         		}
			        		$('.mT20').show();
		    				$("#btnList_1").hide(); //상세보기 할때 보고서버튼 숨김
			        		$catchmentAreaDataBoard.ui.clearUI();
			        		$catchmentAreaMain.ui.doToggleMap();
			        		$catchmentAreaLeftMenu.ui.moveScroll();
			        	}else{
			        		$('.mT20').hide();
			        		$('#gridDataType03.on').hide();
			        		$('#gridDataType03.off').show();
			        		$('#gridDataType03.off').addClass('active');
			        		$('#detail_analysis_tab').removeClass('active');			        		
			        		$('#gridDataType03.on').removeClass('active');
			        		$("#bYearSel06").attr("disabled", false);	
			        		
		    				$("#btnList_1").show(); 
			        		$catchmentAreaMain.ui.doToggleMap();
			        		$("#grid_search_btn").trigger("click");

			        	}
		        	}else{
			        	//SGIS4_1025_생활권역_상세분석 끝
			        	$('.btn_toggle.on').hide();
			        	$('.btn_toggle.off').show();
			        	$(this).hide();
			    		$(this).siblings('.btn_toggle').show();
			    		$(this).siblings('.btn_toggle').addClass('active');
	
		    			//상세분석 관련 팝업 닫기
		    			$('.chk_03_mem').removeClass('active');
		    			
		    			// On 버튼이 아닐 때는 동글뱅이가 연하게 표시하기 (1)
		    			$.each($('.chk_group'), function(index,item){
			    		    $('#'+ item.id + ' > ul > li').css('opacity','0.5');
			    		});
			    		
			    		// more 클릭 이벤트에서 이사옴
		    			$(this).parents('.chk').siblings('.chk').removeClass('active');
		    			if($(this).siblings('.btn_toggle').hasClass('on')){
		    				$(this).parents('.chk').addClass('active');
		    			}
		    			
		    			//SGIS4_1025_생활권역 시작
		    			$('#stats_search_btn').addClass('noActive');
		    			//SGIS4_1025_생활권역 끝
			    				    
			    		if($(this).attr("id") == "gridDataType01"){//영향권
			    			// SGIS4_1025_생활권역_상세분석 시작
			    			if($('#gridDataType03.on').hasClass("active")){ //상세분석 기능 열어놓은채로 영역 내 전체 정보 기능을 실행하면 맵이 분할된 상태가 유지되어 추가 
			    				$('#gridDataType03.on').removeClass('active');
			    				$('#detailedAnal01').removeClass('active'); 
			    			    $('#detailedAnal02').removeClass('active');
			    			    $('.grid_depth1.mH180').removeClass('active');
			    			    $('#gridDataType02_2').removeClass('active');
			    			    $('.chk_result.mT20').hide();
			    			    $catchmentAreaMain.ui.doToggleMap();
			    			}
			    			$('#gridDataType02_2').removeClass('active'); // 격자분포 -> 영역 내 전체 정보 후 세부 조건 설정 체크박스 누를때 맵이 사라지는 현상 막기위해 추가
			    			// SGIS4_1025_생활권역_상세분석 끝
			    			if(!$(".more.more_bt01").hasClass("active")){
			    				$(".more.more_bt01").trigger("click");
			    				$("#btnList_1").show(); //상세보기 할때 보고서버튼 보이기
			    			}else{
			    				//$catchmentAreaLeftMenu.event.resizePopup();
			    			}
			    			$catchmentAreaLeftMenu.ui.settingSrvAreaMap(false, 1);
			    			$catchmentAreaMain.ui.isReportType = "srv";
		
			    		}else if($(this).attr("id") == "gridDataType02"){//격자
			    			$("#gridDataType03.btn_toggle.off").addClass("active"); //SGIS4_1025_생활권역_상세분석 추가
			    			if(!$(".more.more2").hasClass("active")){
			    				$(".more.more2").trigger("click");
			    				// ul 태그의 높이를 "인구" 높이로 다시 초기화
			    				//document.querySelector('#gridSetting').className = 'clearfix grid_depth1 h260';		    				
			    				$("#btnList_1").show(); //상세보기 할때 보고서버튼 보이기
				    			//SGIS4_1025_생활권역 시작
				    			$('#stats_search_btn').removeClass('noActive');
				    			//SGIS4_1025_생활권역 끝
				    			$("#bYearSel06").attr("disabled", false); //SGIS4_1025_생활권역_상세분석
			    			}else{
			    				//$catchmentAreaLeftMenu.event.resizePopup();
			    			}
	// 해당영역의 최소 격자단위로 변경
			    			if(!$("#wrapper .pop_statistics.pop_chk02").is(':visible')){
			    				$catchmentAreaDataBoard.ui.clearUI();
			    			}
			    			$("#grid_search_btn").trigger("click");
	/*		    			
			    			//격자 초기값
			    			var range = $catchmentAreaLeftMenu.ui.getRangeType();
			    			var base_year = $catchmentAreaMain.ui.getBaseYear('3');
			    			var index = $("#statsType02 ul").children(".active").index()+1; //index 1부터 시작..
			    			
			    			// 선택된 면적에 따라 적정 격자 표출
			    			//$catchmentAreaLeftMenu.ui.reqGridLayout();
	
			    			// on버튼 활성화 시에는 느려도 간다(prechkForReqGridStat 미호출)		    			
			    			$catchmentAreaLeftMenu.ui.settingGridAreaMap(base_year, range, index);
			    			
			    			//격자 데이터 보드 호출
			    			 $catchmentAreaDataBoard.event.getDataBoard(2);
	*/		    			 
			    		}else if($(this).attr("id") == "gridDataType03"){//상세
			    			if(!$(".more.more_bt03").hasClass("active")){
			    				$(".more.more_bt03").trigger("click");
			    				$("#btnList_1").hide(); //상세보기 할때 보고서버튼 숨김
			    				if($catchmentAreaLeftMenu.ui.leftMenuToggleSave !== 'gridDataType03') {	// 자기 토글 버튼을 2번 연속으로 눌렀을 때는 반응하지 않게 한다.
			    					$catchmentAreaLeftMenu.ui.beforeDetailAnalysis();					
			    				}
			    			}else{
			    				//$catchmentAreaLeftMenu.event.resizePopup();
			    			}
			    			
			    			$catchmentAreaDataBoard.ui.clearUI();
			    		}else{
			    			//SGIS4_1025_생활권역_상세분석 시작
			    			if($('#gridDataType02_2').hasClass("active")){ //상세분석 기능 열어놓은채로 격자 분포 기능을 닫으면 맵이 분할된 상태가 유지되어 추가 
			    				$('#gridDataType03.on').removeClass('active');
			    				$('#detailedAnal01').removeClass('active'); 
			    			    $('#detailedAnal02').removeClass('active');
			    			    
			    			    $catchmentAreaMain.ui.doToggleMap();
			    		
			    			}
			    			//SGIS4_1025_생활권역_상세분석 끝
			    			//다 접는 이벤트... 걸어야됨
			    			$('.chk').removeClass('active');
			    			$('.more').removeClass('active');
					    	$('.chk_result').hide();
					    	$catchmentAreaLeftMenu.event.resizePopup();
					    	$catchmentAreaLeftMenu.ui.leftMenuToggleSave = $(this).prev().attr('id');
			    			return false;
			    		}
			    		
			    		$catchmentAreaLeftMenu.event.resizePopup();
			    		$catchmentAreaLeftMenu.ui.leftMenuToggleSave = $(this).attr("id");
			    		
			    		// On 버튼이 아닐 때는 동글뱅이가 연하게 표시하기 (2)
			    		$(this).closest('.search_result')
			    				.find('.chk_group > ul > li')
			    				.css('opacity','');
		        	}
		        });
		        
		        /* 화살표 클릭시 상세 확장 */
		        body.on("click", ".more", function(e){
		        	// on/off 버튼으로 이동
		        	//$(this).parents('.chk').siblings('.chk').removeClass('active');
			    	//$(this).parents('.chk').toggleClass('active');
		        	
		        	if($(this).parents('.chk').children('.btn_toggle.off').is(':visible')){
		        		return;
		        	}
		        	
			    	$(this).parents('.chk').children('.chk_result').toggle();
			    	//SGIS4_생활권역 시작
			    	var $sec01 = $(this).parents('.chk.chk_01');
			    	if($sec01.length === 1){	// 영역 내 전체정보 에서만
			    		if($sec01.children('.chk_result').is(':visible')){
			    			//SGIS4_1025_생활권역 시작
//			    			var $span = $sec01.find('.whAraLeft .switchBox .txt1'); 
//			    			if(!$span.hasClass('active')){
//			    				$span.trigger('click');
//			    			}
			    			var $chkBox = $sec01.find('.whAraLeft .dtlCond_chk.on'); 
			    			if($chkBox.is(':visible')){
			    				$chkBox.trigger('click');
			    			}
			    			//SGIS4_1025_생활권역 끝
			    		}			    		
			    	}			    	
			    	//SGIS4_생활권역 끝
			    	$(this).parents('.chk').siblings('.chk').children().children('.more').removeClass('active');
			    	$(this).parents('.chk').siblings('.chk').children('.chk_result').hide();
			    	$(this).toggleClass('active');
			    	$catchmentAreaLeftMenu.event.resizePopup();
			    	
			    	// 상세분석 (ON 상태) --> 화살표로 닫기를 하면 지도가 우측 지도가 사라지는 문제 해결
			    	// "영역 내 전체 정보", "격자 분포" 모두 화살표를 눌러도 지도에는 변화가 없음, 상세분석도 통일성을 위해서 추가함.
			    	/*
			    	if(!$(this).hasClass('active')){
                        return;
                    };
                    */
			    	//지도 분할여부 처리
			    	$catchmentAreaMain.ui.doToggleMap();
		        });
		        
		        /* 영향권 선택 토글 */
		        body.on("click", ".chk_result > .scroll_wrap ul > li > a", function(){
		        	$(this).parents('li').toggleClass('active');
		    		if($('.chk_result > .scroll_wrap ul > li.active').length == $('.chk_result > .scroll_wrap ul > li').length){
		    			$('.all_chk.on').hide();
		    			$('.all_chk.off').show();
		    		}else{
		    			$('.all_chk.on').show();
		    			$('.all_chk.off').hide();
		    		}
		        });
		        
		        /* 영향권 선택 전체선택 및 해제 */
		        body.on("click", ".all_chk.on", function(){
		        	$('.chk_result > .scroll_wrap ul > li').addClass('active');
		    		$(this).hide();
		    		$(this).siblings('.all_chk.off').show();
		        });
		        
		        body.on("click", ".all_chk.off", function(){
		        	$('.chk_result > .scroll_wrap ul > li').removeClass('active');
		    		$(this).hide();
		    		$(this).siblings('.all_chk.on').show();
		        });

		        body.on("click", ".age_range_chk.on", function(){
		        	if(!$(this).is(':visible')){
		        		return;
		        	}		        	
		        	
		    		$(this).hide();
		    		$(this).siblings('.age_range_chk.off').show();
		    		
		    		$(this).closest('ul.grid_depth1').find('.age_range_mem').attr('disabled', true);
		    		$(this).closest('ul.grid_depth1').find('.age_range_slider_mem').slider("disable");

		    		//$(this).closest('div.div_age_range').siblings('div.div_age_single5').children('a.age_single_chk.off').trigger('click');		    		
		        });
		        
		        body.on("click", ".age_range_chk.off", function(){
		        	if(!$(this).is(':visible')){
		        		return;
		        	}
		        	
		    		$(this).hide();
		    		$(this).siblings('.age_range_chk.on').show();
		    		
		    		$(this).closest('ul.grid_depth1').find('.age_range_mem').attr('disabled', false);
		    		$(this).closest('ul.grid_depth1').find('.age_range_slider_mem').slider("enable");
		    		
		    		$(this).closest('div.div_age_range').siblings('div.div_age_single5').children('a.age_single_chk.on').trigger('click');			    		
		        });
		        
		        body.on("click", ".age_single_chk.on", function(){
		    		$(this).hide();
		    		$(this).siblings('.age_single_chk.off').show();	
		    		//SGIS4_생활권역 시작
		    		$(this).removeClass('currDp');
		    		$(this).siblings('.age_single_chk.off').addClass('currDp');
		    		//SGIS4_생활권역 끝		    		
		    		
		    		if($(this).siblings('.age_single_mem')){
		    			$(this).siblings('.age_single_mem').attr('disabled', true);
		    		}
		    		
		    		$(this).closest('div.grid_wrap02').find('.age_all_chk.off').hide();
		    		$(this).closest('div.grid_wrap02').find('.age_all_chk.on').show();
		        });
		        
		        body.on("click", ".age_single_chk.off", function(){		        	
		    		$(this).hide();
		    		var thatOn = $(this).siblings('.age_single_chk.on');
		    		thatOn.show();
		    		//SGIS4_생활권역 시작
		    		$(this).removeClass('currDp');
		    		$(this).siblings('.age_single_chk.on').addClass('currDp');
		    		//SGIS4_생활권역 끝		    		

		    		if($(this).siblings('.age_single_mem')){
		    			$(this).siblings('.age_single_mem').attr('disabled', false);
		    		}

					var onList = $(this).closest('div.grid_wrap02').find('.age_single_chk.on').not(thatOn);
					$.each(onList, function(idx, item){
						if($(item).is(':visible')){	
				    		$(item).hide();
				    		$(item).siblings('.age_single_chk.off').show();
				    		//SGIS4_생활권역 시작
				    		$(item).removeClass('currDp');
				    		$(item).siblings('.age_single_chk.off').addClass('currDp');				    		
				    		//SGIS4_생활권역 끝
				    		
				    		if($(item).siblings('.age_single_mem')){
				    			$(item).siblings('.age_single_mem').attr('disabled', true);
				    		}				    		
						}
					});
					
		    		$(this).closest('div.grid_wrap02').find('.age_all_chk.on').hide();
		    		$(this).closest('div.grid_wrap02').find('.age_all_chk.off').show();
		        });		        

//		        body.on("click", ".age_all_chk.on", function(){
//					var onList = $(this).closest('div.grid_wrap02').find('.age_single_chk.on');
//					var onCnt = 0;
//					$.each(onList, function(idx, item){						
//						if($(item).is(':visible')){							
//							onCnt = onCnt + 1;
//						}						
//					});
//					
//					if(onCnt !== 0){
//			    		$(this).hide();
//			    		$(this).siblings('.age_all_chk.off').show();						
//					}					
//		        });

		        body.on("click", ".age_all_chk.off", function(){
		        	$(this).hide();
		    		$(this).siblings('.age_all_chk.on').show();

					var onList = $(this).closest('div.grid_wrap02').find('.age_single_chk.on');
					$.each(onList, function(idx, item){
						if($(item).is(':visible')){	
				    		$(item).hide();
				    		$(item).siblings('.age_single_chk.off').show();
				    		//SGIS4_생활권역 시작
				    		$(item).removeClass('currDp');
				    		$(item).siblings('.age_single_chk.off').addClass('currDp');				    		
				    		//SGIS4_생활권역 끝
				    		
				    		if($(item).siblings('.age_single_mem')){
				    			$(item).siblings('.age_single_mem').attr('disabled', true);
				    		}
						}
					});
		        });
		        
		        body.on("click", ".con_chk.on", function(){
		        	if(!$(this).is(':visible')){
		        		return;
		        	}		        	
		        	
		    		$(this).hide();
		    		$(this).siblings('.con_chk.off').show();
		    		//SGIS4_생활권역 시작
		    		$(this).removeClass('currDp');
		    		$(this).siblings('.con_chk.off').addClass('currDp');
		    		//SGIS4_생활권역 끝	

		    		//SGIS4_1210 추가 시작
		    		if($(this).closest('div').hasClass('div_constYear')){
		    			$(this).closest('ul.grid_depth1').find('.constYear_mem').attr('disabled', true);
		    		}else if($(this).closest('div').hasClass('div_houseBdspace')){
			    		$(this).closest('ul.grid_depth1').find('.houseBdspace_mem').attr('disabled', true);
			    		$(this).closest('ul.grid_depth1').find('.houseBdspace_slider_mem').slider("disable");
		    		}else if($(this).closest('div').hasClass('div_houseType')){
			    		$(this).closest('ul.grid_depth1').find('.gridHouseList a').removeClass('active');
		    			$(this).closest('ul.grid_depth1').find('.gridHouseList a').addClass('noSel');
		    		}
		    		//SGIS4_1210 추가 끝
		        });
		        
		        body.on("click", ".con_chk.off", function(){
		        	if(!$(this).is(':visible')){
		        		return;
		        	}		        	
		        	
		    		$(this).hide();
		    		$(this).siblings('.con_chk.on').show();
		    		//SGIS4_생활권역 시작
		    		$(this).removeClass('currDp');
		    		$(this).siblings('.con_chk.on').addClass('currDp');
		    		//SGIS4_생활권역 끝			    		

		    		//SGIS4_1210 추가 시작
		    		if($(this).closest('div').hasClass('div_constYear')){
		    			$(this).closest('ul.grid_depth1').find('.constYear_mem').attr('disabled', false);
		    			
		    			$(this).closest('ul.grid_depth1').find('div.div_houseType').children('a.con_chk.on').trigger('click');
		    			$(this).closest('ul.grid_depth1').find('div.div_houseBdspace').children('a.con_chk.on').trigger('click');
		    			
			    		$(this).closest('ul.grid_depth1').find('.gridHouseList a').removeClass('active');
			    		$(this).closest('ul.grid_depth1').find('.gridHouseList a').addClass('noSel');		    			
		    		}else if($(this).closest('div').hasClass('div_houseBdspace')){
			    		$(this).closest('ul.grid_depth1').find('.houseBdspace_mem').attr('disabled', false);
			    		$(this).closest('ul.grid_depth1').find('.houseBdspace_slider_mem').slider("enable");
			    		
			    		$(this).closest('ul.grid_depth1').find('div.div_houseType').children('a.con_chk.on').trigger('click');
			    		$(this).closest('ul.grid_depth1').find('div.div_constYear').children('a.con_chk.on').trigger('click');
			    		
			    		$(this).closest('ul.grid_depth1').find('.gridHouseList a').removeClass('active');
			    		$(this).closest('ul.grid_depth1').find('.gridHouseList a').addClass('noSel');			    		
		    		}else if($(this).closest('div').hasClass('div_houseType')){
		    			$(this).closest('ul.grid_depth1').find('.gridHouseList a').removeClass('noSel');
		    			
		    			$(this).closest('ul.grid_depth1').find('div.div_constYear').children('a.con_chk.on').trigger('click');
		    			$(this).closest('ul.grid_depth1').find('div.div_houseBdspace').children('a.con_chk.on').trigger('click');
		    		}
		    		//SGIS4_1210 추가 끝
		        });
		        
		        body.on("click", ".coprD_chk.on", function(){
		    		$(this).hide();
		    		$(this).siblings('.coprD_chk.off').show();
		    		
		    		$(this).parent().find('div.copr_theme_con').hide();
		    		$(this).closest('.grid_depth1').addClass('h130');
		    		$(this).closest('.grid_depth1').removeClass('h280');
		    		
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting"){
		        		$catchmentAreaLeftMenu.event.resizePopup();
		        	}		    		
		        });
		        
		        body.on("click", ".coprD_chk.off", function(){
		    		$(this).hide();
		    		$(this).siblings('.coprD_chk.on').show();
		    		
		    		$(this).parent().find('div.copr_theme_con').show();
		    		$(this).closest('.grid_depth1').addClass('h280');
		    		$(this).closest('.grid_depth1').removeClass('h130');
		    		
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting"){
		        		$catchmentAreaLeftMenu.event.resizePopup();
		        	}		    		
		        });
		        
		        body.on("click", ".mogb_chk.on", function(){
		        	// 해제
		    		$(this).hide();
		    		
		    		if($(this).hasClass('character')){
		    			$('.mogb_chk.off.character').show();
		    			$('.mogb_chk.off.basic').hide();
		    			$('.mogb_chk.on.basic').show();		    			
		    			$('.vwMode_btn_box').hide();
		    			$('.multi_cond_box.vwMode').hide();
		    			
		    			// TO-DO : 화면 전환 전에 총괄 통계가 없으면 불러와야 함
		    			
		    			$catchmentAreaDataBoard.ui.adjustPop01Board("all", false);
		    		}else{
		    			$('.mogb_chk.off.basic').show();
		    			$('.mogb_chk.off.character').hide();
		    			$('.mogb_chk.on.character').show();
		    			$('.vwMode_btn_box').show();
		    			$('.multi_cond_box.vwMode').show();
		    			

		    			var listCnt = $("#schCondByChaList > ul > li[data-characteristics-cond != '']").size();
		    			if(listCnt > 0){
		    				$('#characteristics_search_btn').trigger('click');
		    			}		    			
		    		}
		    		
		    		$catchmentAreaLeftMenu.event.resizePopup();		    		
		        });
		        
		        body.on("click", ".mogb_chk.off", function(){
		        	// 선택
		    		$(this).hide();
		    		
		    		if($(this).hasClass('character')){
		    			$('.mogb_chk.on.character').show();
		    			$('.mogb_chk.on.basic').hide();
		    			$('.mogb_chk.off.basic').show();		    			
		    			$('.vwMode_btn_box').show();
		    			$('.multi_cond_box.vwMode').show();
		    			
		    			var listCnt = $("#schCondByChaList > ul > li[data-characteristics-cond != '']").size();
		    			if(listCnt > 0){
		    				$('#characteristics_search_btn').trigger('click');
		    			}
		    		}else{
		    			$('.mogb_chk.on.basic').show();
		    			$('.mogb_chk.on.character').hide();
		    			$('.mogb_chk.off.character').show();
		    			$('.vwMode_btn_box').hide();
		    			$('.multi_cond_box.vwMode').hide();
		    			
		    			// TO-DO : 화면 전환 전에 총괄 통계가 없으면 불러와야 함
		    			
		    			$catchmentAreaDataBoard.ui.adjustPop01Board("all", false);
		    		}
		    		
		    		$catchmentAreaLeftMenu.event.resizePopup();
		        });	
		        
		        /* 격자 - 격자 크기 선택 */
		        body.on("click", ".btn_size", function(){
		        	srvLogWrite('Q0','03','03','02','선택 격자크기 값 - '+$(this).text(),'');
		        	//var preGLvl = $('.grid_size > a.btn_size.active').attr('data-grid-level-div');
		        	
		        	$(this).toggleClass('active');
		    		$(this).siblings('.btn_size').removeClass('active');
		    		
		    		var gLvl = $('.grid_size > a.btn_size.active').attr('data-grid-level-div');
		    		if(gLvl !== undefined){
	
						var gLvlNo = $catchmentAreaLeftMenu.ui.getGridValueAsNum(gLvl);
						if(gLvlNo < 1000){
							if($('#gridSetting').is(':visible')){
								$('#gridSetting').hide();
								$('#gridSettingLess1k').show();
								
								var selNm = $('#gridSetting > li.active').attr('data-stat-type');
								$('#gridSettingLess1k > li[data-stat-type="' + selNm + '"] > a').trigger('click');
								
								$catchmentAreaLeftMenu.event.resizePopup();
							}
						}else{
							if($('#gridSettingLess1k').is(':visible')){
								$('#gridSettingLess1k').hide();
								$('#gridSetting').show();
								
								var selNm = $('#gridSettingLess1k > li.active').attr('data-stat-type');
								//SGIS4_생활권역 시작
//								if(selNm == 'employee'){
//									selNm = "copr";
//								}
								//SGIS4_생활권역 끝
								$('#gridSetting > li[data-stat-type="' + selNm + '"] > a').trigger('click');
							}
						}
		        	}
		        });
		        
		        body.on("click", ".btn01", function(){		        	
		        	if($(this).hasClass('noTogl') || $(this).hasClass('noSel')){
		        		return false;
		        	}

		        	$(this).toggleClass('active');
		        	
		        	if($(this).hasClass('allowM')){
		        		
		        		if($(this).attr("value") == "00"){
		        			if($(this).hasClass('active')){
		        				$(this).siblings('.btn01').removeClass('active');
		        			}		        		
		        		}else{
		        			if($(this).hasClass('active')){
		        				$(this).siblings('.btn01[value="00"]').removeClass('active');
		        			}		        			
		        		}		        		
		        	}else{
		        		$(this).siblings('.btn01').removeClass('active');
		        	}
		        });
		        
		        body.on("click", ".btn02", function(){
		        	$(this).toggleClass('active');
		    		$(this).siblings('.btn02').removeClass('active');
		        });

		        body.on("click", ".btn03", function(){
		        	$(this).toggleClass('active');
		    		$(this).siblings('.btn03').removeClass('active');
		        });
		        
		        body.on("click", ".btn05, .btn05_sub", function(){		        	
		        	$(this).toggleClass('active');
		        	
		        	var isBundleMain = $(this).hasClass('bundle_main');
		        	var isBundleSub = $(this).hasClass('bundle_sub');
		        	
		        	if(isBundleMain || isBundleSub){
			        	var $bundle = $(this).closest('.bundle');
			        	if($bundle !== undefined){
				        	var bundleNm = $(this).attr('data-bundle-nm');				        	
				        	if(isBundleMain){	
				        		if($(this).hasClass('active')){				        			
				        			$bundle.find('.bundle_sub[data-bundle-nm="' + bundleNm + '"]').addClass('active');				        			
				        		}else{
				        			$bundle.find('.bundle_sub[data-bundle-nm="' + bundleNm + '"]').removeClass('active');
				        		}		        		
				        	}else if(isBundleSub){	
				        		if($(this).hasClass('active')){
				        			if($bundle.find('.bundle_sub[data-bundle-nm="' + bundleNm + '"]').length === $bundle.find('.bundle_sub.active[data-bundle-nm="' + bundleNm + '"]').length){
				        				$bundle.find('.bundle_main[data-bundle-nm="' + bundleNm + '"]').addClass('active');
				        			}				        			
				        		}else{
				        			$bundle.find('.bundle_main[data-bundle-nm="' + bundleNm + '"]').removeClass('active');
				        		}	
				        	}
			        	}
		        	}
		        });
		        
		        body.on("click", ".mustBeOne", function(){
		        	if($(this).hasClass('active')){
		        		$(this).siblings('.mustBeOne').removeClass('active');
		        	}else{
		        		$(this).addClass('active');
		        		$(this).siblings('.mustBeOne').removeClass('active');		        		
		        	}
		        });
		        
		        /* 격자 통계 조건 설정 */
		        body.on("click", ".grid_depth1 > li > a", function(){

    				
		        	
		        	if(!$(this).hasClass('disable')) {
		        		var checkActive = $(this).parent().hasClass('active');
		        		$(this).parents('li').addClass('active');
		        		$(this).parents('li').siblings('li').removeClass('active');
    				}
		    		
		    		// 상세기능에서도 공통으로 사용하기 위해서 다움의 코드를 추가(시작) - 박상언 2020-10-20 작성
		    		var detailPopup = $(this).closest('#detail_condition_select_box, #correlation_popup');	// 상세분석(공간) 팝업에서 사용된다. 상관관계 팝업은 정확히 모르겠지만, 일단 추가해둔다.
		    		var detailSelectBoxId = "";
		    		if(detailPopup.length !== 0) {
		    			detailSelectBoxId = detailPopup.find('select[id^=bYearSel]').attr('id'); 
		    		}
		    		// 상세기능에서도 공통으로 사용하기 위해서 다움의 코드를 추가(끝) - 박상언 2020-10-20 작성
		    		
//	    			if($(this).parents('div.chk_03').length > 0) {	//SGIS4_1025_생활권역_상세분석  주석처리
		    		//SGIS4_1025_생활권역 시작
	    			if($(this).parents('div.grid_setting_02').length > 0) {	//SGIS4_1025_생활권역_상세분석  상세분석에서 탭을 선택시
	    			//SGIS4_1025_생활권역 끝	
	    				/*if(!checkActive) {
	    					$('.divs_wrap02 div[class ^= divs] > span:nth-child(2n-1)').text("--");
	    					$('#detail_location_compare_2').text("미지정");
	    					$('#detail_year_compare_2').text("미지정");
	    					var rightMap = $catchmentAreaMain.ui.getMap(1);
	    					if(rightMap) {rightMap.markers.clearLayers();}
	    				}*/
	    				checkActive = false; //SGIS4_1025_생활권역_상세분석
    					if(!checkActive) {
    						$catchmentAreaLeftMenu.ui.beforeDetailAnalysis();
    						// 필요 변수 설정
    						var leftMap = $catchmentAreaMain.ui.getMap(0);
    						var rightMap = $catchmentAreaMain.ui.getMap(1);
    						var id = this.parentElement.id;
    						var leftMapX = 0;
    						var leftMapY = 0;
    						var animate = true;
    						var options = {};
    						
    						// 미리 지우고 초기화할 것들에 대한 작업을 해준다.
    						$('.divs_wrap02 div[class ^= divs] > span:nth-child(2n-1)').text("--");
	    					$('#detail_location_compare_2').text("미지정");
	    					$('#detail_year_compare_2').text("미지정");
	    					$('#year_select2').val('');
    						
	    					
	    					
							if(rightMap) {	// rightMap이 존재한다면!
								
								if(id == 'detailedAnal01') { // ===> 공간적 비교분석 탭 클릭
									leftMapX = leftMap.center[0];
									leftMapY = leftMap.center[1];
									$("#bYearSel06").attr("disabled", false); //SGIS4_1025_생활권역_상세분석 추가
									// 기존 우측 지도에 있던 마커 지우고, 지도의 중심을 좌측 지도와 같게 한다.
									rightMap.markers.clearLayers();	
									$('.divs_wrap02 > divs01 ');
									$catchmentAreaLeftMenu.ui.simpleMoveTargetArea(leftMapX, leftMapY, rightMap.id, animate, false);	// 마지막 인자값은 마커 생성 여부다.
									
								} else if(id == 'detailedAnal02') {	// ===> 시간적 비교분석 탭 클릭
									rightMap.markers.clearLayers();	
									$('#spatial_position_search_box .close').trigger('click');
									$("#bYearSel06").attr("disabled", true); //SGIS4_1025_생활권역_상세분석 추가
									// 우측 지로를 좌측 지도의 마커 지점과 같은 지점으로 이동 후, 이동한 지도 중심에 마커 추가
									leftMapX = $catchmentAreaLeftMenu.ui.selectCoordinate_x;
									leftMapY = $catchmentAreaLeftMenu.ui.selectCoordinate_y;
									$catchmentAreaLeftMenu.ui.simpleMoveTargetArea(leftMapX,leftMapY, leftMap.id, animate);
									$catchmentAreaLeftMenu.ui.simpleMoveTargetArea(leftMapX, leftMapY, rightMap.id, animate, true);
									// 도형 그리기 [ 주행시간, 주행거리, 반경 ]
									$catchmentAreaLeftMenu.ui.setDetailMapping();
								}
								
							} else if(!rightMap && ((id ==='detailedAnal01') || (id ==='detailedAnal02'))) {	// 지도가 없으면서 현재 선택된것이 공간분석, 시간분석인 경우는 
																												// 상관분석을 클릭했다가 공간분석 혹은 시간 분석을 클릭했을 때이다.
								console.error('상관관계 클릭 후 ==> ');
								if(id ==='detailedAnal01') {
									options.isDetailSpatial = true;
									/*
									options.callbackFunc = function(x,y,option_){
										
									};*/
								} else if(id ==='detailedAnal02'){
									options.isDetailYear = true;
									options.callbackFunc = function(x, y){
										$catchmentAreaLeftMenu.ui.simpleMoveTargetArea(x, y, 0);
										$catchmentAreaLeftMenu.ui.simpleMoveTargetArea(x, y, 1);
										// 도형 그리기 [ 주행시간, 주행거리, 반경 ]
										$catchmentAreaLeftMenu.ui.setDetailMapping();
									};
								}
							}
    						
    					}
	    				
	    				$catchmentAreaMain.ui.doToggleMap(options);
	    			//SGIS4_1025_생활권역 시작	
	    			}else if($(this).parents('div.grid_setting_01').length > 0 || detailSelectBoxId) {
	    			//SGIS4_1025_생활권역 끝	    				
	    				
	    				var number = detailSelectBoxId ? '4' : '3';	// 상세기능에서도 공통으로 사용하기 위해서 다움의 코드를 추가 - 박상언 2020-10-20 작성
	    				
	    				//SGIS4_생활권역 시작
	    				if($(this).hasClass('dep_btn04') || $(this).hasClass('dep_btn06')){
	    				//SGIS4_생활권역 끝	
	    					$catchmentAreaDataBoard.ui.setBaseYearBox(number, 'B', detailSelectBoxId);		// 상세기능에서도 공통으로 사용하기 위해서 다움의 코드를 추가 - 박상언 2020-10-20 작성
	    					//SGIS4_1027_생활권역 시작
	    					$catchmentAreaDataBoard.ui.setBaseYearBox('6', 'B');
	    					$catchmentAreaDataBoard.ui.setBaseYearBox('7', 'B');
	    					//SGIS4_1027_생활권역 끝
	    				}else if($(this).hasClass('dep_btn05')){
	    					$catchmentAreaDataBoard.ui.setBaseYearBox(number, 'C', detailSelectBoxId);		// 상세기능에서도 공통으로 사용하기 위해서 다움의 코드를 추가 - 박상언 2020-10-20 작성
	    				}else{
	    					var isDetailYear = detailSelectBoxId && ($('#detail_analysis_tab li.active').data('detailAnalType') === 'year');
	    					$catchmentAreaDataBoard.ui.setBaseYearBox(number, 'A', detailSelectBoxId, isDetailYear);		// 상세기능에서도 공통으로 사용하기 위해서 다움의 코드를 추가 - 박상언 2020-10-20 작성
	    					//SGIS4_1027_생활권역 시작
	    					$catchmentAreaDataBoard.ui.setBaseYearBox('6', 'A');
	    					$catchmentAreaDataBoard.ui.setBaseYearBox('7', 'A');
	    					//SGIS4_1027_생활권역 끝
	    				}
	    			}
		        });
		        
		        body.on("click", ".grid_depth_less1k > li > a", function(){

		        	if(!$(this).hasClass('disable')) {
		        		$(this).parents('li').addClass('active');
		        		$(this).parents('li').siblings('li').removeClass('active');
    				}

    				if($(this).hasClass('dep_btn72')){
    					$catchmentAreaDataBoard.ui.setBaseYearBox('3', 'B');
    					//SGIS4_1027_생활권역 시작
    					$catchmentAreaDataBoard.ui.setBaseYearBox('6', 'B');
    					$catchmentAreaDataBoard.ui.setBaseYearBox('7', 'B');
    					//SGIS4_1027_생활권역 끝    					
    				}else{
    					$catchmentAreaDataBoard.ui.setBaseYearBox('3', 'A');
    					//SGIS4_1027_생활권역 시작
    					$catchmentAreaDataBoard.ui.setBaseYearBox('6', 'A');
    					$catchmentAreaDataBoard.ui.setBaseYearBox('7', 'A');
    					//SGIS4_1027_생활권역 끝    					
    				}
    				//SGIS4_1025_생활권역_상세분석 시작
    				if($(this).hasClass('dep_btn72')){
    					$catchmentAreaDataBoard.ui.setBaseYearBox('4', 'B', 'bYearSel04');
    				}else{
    					$catchmentAreaDataBoard.ui.setBaseYearBox('4', 'A', 'bYearSel04');
    				}
    				//SGIS4_1025_생활권역_상세분석 끝
		        });
		        
		        body.on("click", ".grid_depth2_less1k > li > a", function(){

		        	if(!$(this).hasClass('disable')) {
		        		$(this).parents('li').addClass('active');
		        		$(this).parents('li').siblings('li').removeClass('active');
    				}

    				if($(this).hasClass('dep_btn72')){
    					$catchmentAreaDataBoard.ui.setBaseYearBox('4', 'B', 'bYearSel04');
    				}else{
    					$catchmentAreaDataBoard.ui.setBaseYearBox('4', 'A', 'bYearSel04');
    				}
		        });		        
		        
		        /* 색상선택 팝업 색 선택시 */
		        body.on("click", ".color_list li > a", function(){
		        	$(this).parents('li').addClass('active');
		    		$(this).parents('li').siblings('li').removeClass('active');
		    		$('.choice_now').css('background',$(this).css('background'));
		        });
		        
		        /* 시설선택 */
		        body.on("click", ".sec02 .scroll_wrap ul > li > a", function(){
		        	$('.sec02 .scroll_wrap ul > li > a ').removeClass('active');
		        	$(this).toggleClass('active');
		    		
		        	$("input:radio[name='addr_radio']:radio[id='sel_addr2']").attr("checked",true);
		        });
		        
		        
		        body.on("click", "#area_popbtn", function(){
		        	//$('.layer_pop05').hide();
		        	//$('.layer_pop06').show();
		        	$('.spatial_sisul').removeClass('active');
		        	$('.layer_pop05').removeClass('active');
		        	
		        	// 우측지도에 대한 위치설정 팝업을 왼쪽 메뉴 위치로 
		        	$('.search_wrap.statistics').removeClass('active');
		        	$catchmentAreaLeftMenu.ui.curLeftPage = "4";		        	
		        	$('.layer_pop06').addClass('active');
		        	
		        	// 2020-12-09 : 상세분석(공간적 비교분석)에서 위치 설정을 통해서  마커와 도형이 양쪽 지도에 그려진 상태에서
		        	// 다시 위치 지정을 할 수 있는데, 이때 마커만 찍으면 전에 그렸던 도형이 여전히 지도 2에 존재한다. 
		        	// 이상해보여서 "위치설정" 버튼을 다시 눌렀을 때, 상세분석(공간적 비교분석)에 맨 처음 들어올 때의 상태로 되돌려 놓기로 했다. 
		        	// 코드 추가 시작
		        	// 1. 양쪽 지도의 도형들을 모두 지운다
		        	$catchmentAreaLeftMenu.ui.clearLayers(0);  
		        	$catchmentAreaLeftMenu.ui.clearLayers(1);
		        	// 2. 우측 지도의 화면 상단에 있는 표기된 위치와 좌측 메뉴의 위치2의 위치를 미지정으로 수정한다.
		        	$('.divs_wrap02 > .divs01 > span:eq(1)') .text('--');
		        	$('#detail_location_compare_2').text('미지정');
		        	// 3. 마커 지우기
		        	var map = $catchmentAreaMain.ui.getMap(1);
		        	map.markers.clearLayers(); //마커 초기화
		        	// 코드 추가 끝
		        });
		        
		        body.on("click", ".close_btn_spatial", function(){
		        	$('.spatial_sisul').removeClass('active');
		        	$('.layer_pop05').removeClass('active');
		        	$('.layer_pop06').removeClass('active');
		        	$('.search_wrap.statistics').addClass('active');		        	
		        	$(this).parent('div[class^="layer_pop"]').removeClass('active');
		        });
		        
		        body.on("click", ".search_wrap.spatial_sisul .close", function(){
		        	$('.search_wrap.spatial_sisul').removeClass('active');
		        	$('.search_wrap.statistics').addClass('active');
		        	
					$catchmentAreaMain.ui.getMap(1).markers.clearLayers();
					$catchmentAreaMain.ui.getMap(1).markers3.clearLayers();
					$(".sop-pane.sop-infowindow-pane").empty(); //마커 정보창 닫기		        	
		        });
		        
		        body.on("click", "#year_popbtn", function(){
		        	//$('.layer_pop06').hide();
		        	//$('.layer_pop05').show();
		        	$('.spatial_sisul').removeClass('active');
		        	$('.layer_pop06').removeClass('active');
		        	$('.layer_pop05').addClass('active');
		        });
		        
		        body.on("click","div[class^='layer_pop'] .close",function(e){
		        	$(this).parent('div[class^="layer_pop"]').removeClass('active');
		        	
		        	if($(this).parent('div[class^="layer_pop"]').hasClass('layer_pop06')){
		        		$('.search_wrap.statistics').addClass('active');
		        		//SGIS4_1025_생활권역 시작
		        		$catchmentAreaLeftMenu.ui.moveScroll();
		        		//SGIS4_1025_생활권역 끝
		        	}		        	
		        });
		        /*
		        body.on("click", ".layer_pop05 .close", function(){
//		        	$('.layer_pop05').hide();
		        	$('.layer_pop05').removeClass('active');
		        });
		        
		        body.on("click", ".layer_pop06 .close", function(){
//		        	$('.layer_pop06').hide();
		        	$('.layer_pop06').removeClass('active');
		        });
		        */
		        
		        //SGIS4_1025_생활권역 시작
		        body.on("click", ".dep_btn01", function(){
		        	if($(this).closest('.grid_depth1').attr("id") == "areaSetting"){
			        	$(this).closest('.grid_depth1').addClass('h190');
			        	$(this).closest('.grid_depth1').removeClass('h130 h160 h265 h280 h330 h370');
		        	}else{
			        	$(this).closest('.grid_depth1').addClass('h265');
			        	$(this).closest('.grid_depth1').removeClass('h130 h160 h190 h280 h330 h370');		        		
		        	}
		        	
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting" || $(this).closest('.grid_depth1').attr("id") == "areaSetting"){
		        		$catchmentAreaLeftMenu.event.resizePopup();
		        	}
		        	
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting"){
		        		$catchmentAreaLeftMenu.ui.moveScroll();
		        	}
		        });
		        
		        body.on("click", ".dep_btn02", function(){
		        	$(this).closest('.grid_depth1').addClass('h190');
		        	$(this).closest('.grid_depth1').removeClass('h130 h160 h265 h280 h330 h370');//SGIS_4_수정
		        	
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting" || $(this).closest('.grid_depth1').attr("id") == "areaSetting"){
		        		$catchmentAreaLeftMenu.event.resizePopup();
		        	}
		        	
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting"){
		        		$catchmentAreaLeftMenu.ui.moveScroll();
		        	}
		        });
		        body.on("click", ".dep_btn03", function(){
		        	$(this).closest('.grid_depth1').addClass('h280');
		        	$(this).closest('.grid_depth1').removeClass('h130 h160 h190 h265 h330 h370');//SGIS_4_수정
		        	
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting" || $(this).closest('.grid_depth1').attr("id") == "areaSetting"){
		        		$catchmentAreaLeftMenu.event.resizePopup();
		        	}
		        	
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting"){
		        		$catchmentAreaLeftMenu.ui.moveScroll();
		        	}
		        });		        
		        
		        body.on("click", ".dep_btn04, .dep_btn06", function(){
		        	if($(this).parent().find('.coprD_chk').length > 0){
			        	if($(this).parent().find('.coprD_chk.off').is(':visible')){
				        	$(this).closest('.grid_depth1').addClass('h130');
				        	$(this).closest('.grid_depth1').removeClass('h190 h265 h280 h330 h370');//SGIS_4_수정		        		
			        	}else{
				        	$(this).closest('.grid_depth1').addClass('h280');
				        	$(this).closest('.grid_depth1').removeClass('h130 h190 h265 h330 h370');//SGIS_4_수정
			        	}
		        	}else{
		        		if($(this).parent().find('a[data-grdstat-type="tabAll"]').hasClass('active')){
				        	$(this).closest('.grid_depth1').addClass('h160');
				        	$(this).closest('.grid_depth1').removeClass('h130 h190 h265 h280 h330 h370');//SGIS_4_수정
		        		}else if($(this).parent().find('a[data-grdstat-type="tabIndustryClass"]').hasClass('active')){
				        	$(this).closest('.grid_depth1').addClass('h330');
				        	$(this).closest('.grid_depth1').removeClass('h130 h160 h190 h265 h280 h370');	//SGIS_4_수정	
		        		}else{
				        	$(this).closest('.grid_depth1').addClass('h370');
				        	$(this).closest('.grid_depth1').removeClass('h130 h160 h190 h265 h280 h330');//SGIS_4_수정
		        		}
		        	}
		        	
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting" || $(this).closest('.grid_depth1').attr("id") == "areaSetting"){
		        		$catchmentAreaLeftMenu.event.resizePopup();
		        	}
		        	
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting"){
		        		$catchmentAreaLeftMenu.ui.moveScroll();
		        	}
		        });
		        
		        body.on("click", ".dep_btn05", function(){
		        	$(this).closest('.grid_depth1').removeClass('h130 h160 h190 h265 h280 h330 h370');//SGIS_4_수정
		        	
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting"){
		        		$catchmentAreaLeftMenu.event.resizePopup();
		        	}
		        	
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting"){
		        		$catchmentAreaLeftMenu.ui.moveScroll();
		        	}
		        });
		        //SGIS4_1025_생활권역 끝		        
		        
		        body.on("click", ".more2", function(){
		        	//SGIS4_생활권역 시작
		        	$('.chk_02 .grid_depth1 > li').removeClass('active');
		    		$('.chk_02 .grid_depth1 > li:first-child').addClass('active');
		    		//SGIS4_생활권역 끝
		    		$('.more2').closest('div.chk_02').find('.dep_btn01').trigger('click');
		    		
		    		if($(".more2").hasClass("active")){
		    			// 선택된 면적에 따라 적정 격자 표출
		    			$catchmentAreaLeftMenu.ui.reqGridLayout();		    			
		    		}
		        });
		      //퍼블... end
		        
		        //최소화
		        body.on("click", ".close_btn", function(){
		        	$('.search_wrap.area').removeClass('active');
		        	$('.search_wrap.sisul').removeClass('active');
		        	$('.search_wrap.year').removeClass('active');
		    		$('.search_wrap.statistics').removeClass('active');
		    		$('#statisticsDateMenu').removeClass('active');
		    		
		    		$(".shadow_group").css("display","none");
		        	$("#menuButton").css("display","block");
		        	
		        	if($(this).closest('div.search_wrap')){
		        		var $cloDiv = $(this).closest('div.search_wrap');
		        		
		        		if($cloDiv.hasClass("area")){
		        			$catchmentAreaLeftMenu.ui.curLeftPage = "1";
		        		}else if($cloDiv.hasClass("sisul")){
		        			$catchmentAreaLeftMenu.ui.curLeftPage = "2";
		        		}else if($cloDiv.hasClass("year")){
		        			$catchmentAreaLeftMenu.ui.curLeftPage = "3";
		        		}else if($cloDiv.hasClass("statistics")){
		        			$catchmentAreaLeftMenu.ui.curLeftPage = "4";
		        		}		        		
		        	}		        	
		    	});
		        
		        //영역설정 메뉴 open 이벤트
//		        body.on("click", "#areaSettingMenu", function(){
//		        	$("#areaSetting").css("display","block");
//	        		$("#statisticsDataSetting").css("display","none");
//		    	});
		        
		        
		        //중심유형으로 찾기 
		        body.on("click", "#facilityTypeSearch .option_btn", function(){

		        	if($('#schTypeGbA02').is(':checked')){
						var map = $catchmentAreaMain.ui.getMap(0);
						var curZoom = map.zoom;
						if(curZoom < 6){		// 집계구 -> 읍면동으로 확대(20201202)

//							caMessageConfirm.open(
//				    			 "알림", 
//				    			 "지도의 확대/축소 레벨이 집계구부터 이용할 수 있습니다.<br>" +
//				    			 "[집계구로 확대] 버튼을 누르면 집계구 레벨로 이동합니다.",
//				    			 btns = [
//									{
//									    title : "집계구로 확대",
//									    fAgm : null,
//									    disable : false,
//									    func : function(opt) {
//									    	// mapMove
//									    }
//									 },
//									 
//				    			     {
//									   title : "알림창 닫기",
//									   fAgm : null,
//									   disable : false,
//									   func : function(opt) {}
//				    			     }   
//				    			 ]
//					    	);							

							caMessageAlert.open("알림", "현재 지도 레벨에서는 선택될 유형 시설이 너무 많습니다.<br/>지도를 확대한 다음 시설 유형을 선택해주세요.");
							return false;							
						}		        		
		        	}else if($('#schTypeGbA01').is(':checked')){
// 읍면동 -> 시군구로 확대(20201202)		        		
//						var emdCd = $("#emdong option:selected").val();
//						if(emdCd == undefined || emdCd == null || emdCd == '0'){
//							caMessageAlert.open("알림", "읍면동을 선택해 주세요.");
//							return false;						
//						}						
		        	}		        	
		        	
		        	var factypeCd = this.id;
					
					if($(this).parents()[0].id == "SAL001"){
						srvLogWrite('Q0','02','04','01','교육 - '+$(this).text(),'');
					}else if($(this).parents()[0].id == "SAL002"){
						srvLogWrite('Q0','02','05','01','문화 - '+$(this).text(),'');
					}else if($(this).parents()[0].id == "SAL003"){
						srvLogWrite('Q0','02','06','01','생활 - '+$(this).text(),'');
					}else if($(this).parents()[0].id == "SAL004"){
						srvLogWrite('Q0','02','07','01','공공 - '+$(this).text(),'');
					}
		        	//읍면동 기준으로 검색
		        	//var searchArea = $("#sido option:selected").val() + $("#sigungu option:selected").val().substr(0, 3) + $("#emdong option:selected").val().substr(0, 2);
		        	var cate02 = $("#"+this.id).parent().attr("value");
		        	var cate03 = $("#"+this.id).data("factypeNm");
		        	$(".cate02").text(cate02)
					$(".cate02").removeClass().addClass("cate02");
					$(".cate02").addClass($(this).parents()[0].id);
					$(".cate03").addClass(factypeCd);
		        	$(".cate03").text(cate03)
		        	$("#ftsdText").val(factypeCd);
		        	
		        	//목록조회 초기화
					$("#totalSearchResult").empty();
					
		        	//목록조회
		        	//$catchmentAreaLeftMenu.ui.setfacilityTypeSearchDatailList(searchArea, factypeCd);
		        	$catchmentAreaLeftMenu.ui.requestForPoiSearch('A', 'sgis', factypeCd);
		        	
		        	$('.search_wrap').removeClass('active');
		        	$('.search_wrap.sisul').addClass('active');
		    	});
		        
		        //중심시설유형 상세보기 리스트 클릭
		        body.on("click", "#totalSearchResult > ul > li", function(){
		        	//SGIS4_1025_생활권역 시작
		        	//나의데이터
		        	if($("#totalSearchResult > ul > li[id^='myData_']").length > 0){
		        		return false;
		        	}
		        	//SGIS4_1025_생활권역 끝
		        	
		        	//마커 지우기
//		        	var map = $catchmentAreaMain.ui.getMap(0);
//		        	map.markers.clearLayers(); //마커 초기화
		        	
		        	var sufid = this.id.split("_")[1]; //SGIS4_1029_생활권역
		        	var name = $(this).children('span')[0].innerText;//사업체명
		        	var roadAdres =$(this).children('div')[0].innerText;//주소

		        	//SGIS4_1124_시설유형 추가 관련 시작
		        	if('E0003' == $(this).attr('value') || 'E0004' == $(this).attr('value')){
		        		var x_coor = $(this).attr('data-map-x');
		        		var y_coor = $(this).attr('data-map-y');
		        		
		        		$catchmentAreaLeftMenu.ui.setfacilityTypeListPoint(sufid, name, roadAdres, x_coor, y_coor, 0, $(this).attr('value'));
		        		return false;
		        	}
		        	//SGIS4_1124_시설유형 추가 관련 끝
		        	
					if($(".cate02").hasClass("SAL001")){
						srvLogWrite('Q0','02','04','02',name,'');
					}else if($(".cate02").hasClass("SAL002")){
						srvLogWrite('Q0','02','05','02',name,'');
					}else if($(".cate02").hasClass("SAL003")){
						srvLogWrite('Q0','02','06','02',name,'');
					}else if($(".cate02").hasClass("SAL004")){
						srvLogWrite('Q0','02','07','02',name,'');
					}
			    	
			    	$catchmentAreaLeftMenu.ui.getSufidCoordinate(sufid, name, roadAdres, this.value);
			    	
			    	$('#totalSearchResult > ul > li').removeClass('active');
			    	$(this).addClass('active');
			    });
		        
		       //뒤로가기
		       body.on("click", ".back_btn", function(){
				   srvLogWrite('Q0','01','07','00','','');
		    	   $catchmentAreaMain.ui.isReportShow = false;
		    	   var $swDiv = $(this).parent().parent('div.search_wrap');
		    	   
		    	   //SGIS4_1025_생활권역 시작 (나의 데이터 관련 이벤트 초기화)
		    	   $(".location .cate02_sp").show();
		    	   $(".location .cate02").show();
		    	   $("#myDataList > li").removeClass('active');
		    	   //SGIS4_1025_생활권역 끝
		    	   $("#spatial_myDataList > li").removeClass('active'); //SGIS4_1028_생활권역 추가
		    	   
		    	   if($swDiv.hasClass("sisul")){
		    		   $swDiv.removeClass('active');	    	   
		    		   $('.search_wrap.area').addClass('active');
		    		   $("#btnList_1").hide();
		    		   
		    		   $catchmentAreaMain.ui.getMap(0).markers.clearLayers();
		    		   $catchmentAreaMain.ui.getMap(0).markers3.clearLayers();
		    		   $(".sop-pane.sop-infowindow-pane").empty(); //마커 정보창 닫기
		    	   }else if($swDiv.hasClass("year")){
			        	var existFlag = $catchmentAreaObj.chkExistData();		        	
			        	if(existFlag == "0"){
			        		$catchmentAreaLeftMenu.ui.goFirstLeftMenu();
			        	}else{
			        		caMessageConfirm.open(
								 "알림", 
								 "해당 버튼을 누를 경우, 선택된 지점·영역 및 통계정보가 초기화됩니다.<br>" +
								 "진행하시겠습니까?",
								 btns = [
									{
									    title : "예",
									    fAgm : null,
									    disable : false,
									    func : function(opt) {
									    	$catchmentAreaObj.clearObj();
									    	$catchmentAreaLeftMenu.ui.goFirstLeftMenu();	// 첫페이지로 ('.search_wrap.sisul'이 이전 페이지였는지 구분가능하면 수정)
									    	$("#btnList_1").hide();
									    }
									 },
									 
								     {
									   title : "아니오",
									   fAgm : null,
									   disable : false,
									   func : function(opt) { return; }
								     }   
								 ]
							);		        		
			        	}		    		   
		    	   }else if($swDiv.hasClass("statistics")){
		    		   $catchmentAreaMain.ui.clearPolygonHighlight();
		    		   $('#areaSettingMenu').addClass('active');
		    		   $('#statisticsDateMenu').removeClass('active');
		    		   $("#btnList_1").hide();

		    		   // 화면에서 정리해야 할 대상은 아래 함수들에 추가할 것
		    		   $catchmentAreaLeftMenu.ui.clearUI("3");
		    		   $('.search_wrap.year').addClass('active');
		    		   $catchmentAreaDataBoard.ui.clearUI("3");
		    		   
		    		   //SGIS4_1025_생활권역_상세분석 시작
		    		   $('.mT20').hide(); //상세분석기능을 켜놓고 뒤로가기 후 다시 들어왔을 때 맵이 두개로 토글되는 현상을 막기위해 추가
		    		   $('#gridDataType03.on').removeClass('active');
		    		   //SGIS4_1025_생활권역_상세분석 끝 
		    		   if($swDiv.find('.chk_02').hasClass('active')){
		    			   var paramObj = {};
		    			   paramObj.pageNo = "3";
		    			   $catchmentAreaMain.ui.clearUI(paramObj);
		    			   
		    			   // 클릭 이벤트 핸들러에서 가져옴.(저장된 도형정보를 이용해 그리는걸로...)
							var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
							var x_coordinate = $catchmentAreaLeftMenu.ui.selectCoordinate_x; //x좌표
							var y_coordinate = $catchmentAreaLeftMenu.ui.selectCoordinate_y; //y좌표							
							if(rangeType == "stats01"){
								$catchmentAreaLeftMenu.ui.settingSrvAreaTimeMap(x_coordinate, y_coordinate, false);
							}else if(rangeType == "stats02"){
								$catchmentAreaLeftMenu.ui.settingSrvAreaDistanceMap(x_coordinate, y_coordinate, false);
							}else if(rangeType == "stats03"){
								$catchmentAreaLeftMenu.ui.settingCircleMap(x_coordinate, y_coordinate, false);
							}
							// 클릭 이벤트 핸들러에서 가져옴.
		    		   }
		    		   
		    		   $catchmentAreaMain.ui.doToggleMap();
		    		   
		    	   } else if($swDiv.hasClass("spatial_sisul")) {	// pse 추가
		    		   $swDiv.removeClass('active');
		    		   $('#spatial_position_search_box').addClass('active');
		    		   
		    		   $catchmentAreaMain.ui.getMap(1).markers.clearLayers();
		    		   $catchmentAreaMain.ui.getMap(1).markers3.clearLayers();
		    		   $(".sop-pane.sop-infowindow-pane").empty(); //마커 정보창 닫기
		    	   }
		       });
		       
		       //지도 위 선택 버튼 클릭 이벤트
		       body.on("click", "#pointSelectButten", function(){
		    	   srvLogWrite('Q0','02','08','00',$('.sa_h4').text(),'');
		    	   var locInfos = $(this).attr("value").split("/");
		    	   if(locInfos.length >= 3){

		    		   var callerGb = $(this).parent('div.layer_pop03').attr('data-caller-gb');
		    		   var selSufid = "";
		    		   if(callerGb == "M3"){
		    			   selSufid = $(this).attr("data-sufid");
		    			   $('#totalSearchResult > ul > li').removeClass('active');
		    		   }
			    	   $catchmentAreaObj.setSelectedLoc(locInfos[0], locInfos[1], callerGb, selSufid);
			    	   $catchmentAreaObj.addMouseOverOnMarker(0);
			    	   
			    	   $catchmentAreaLeftMenu.ui.selMapLocTxt = locInfos[2];
			    	   $catchmentAreaLeftMenu.ui.selMapLocGb = "B";
			    	   $("#mapLocation_3").text($catchmentAreaLeftMenu.ui.selMapLocTxt);
			    	   $("#mapLocation_4").text($catchmentAreaLeftMenu.ui.selMapLocTxt);		    	   
			    	   $('#detail_location_compare_1').text($catchmentAreaLeftMenu.ui.selMapLocTxt);
			    	   $(".divs_wrap01 > .divs01 > span").eq(1).text($catchmentAreaLeftMenu.ui.selMapLocTxt);
			    	   
			    	   //시설물에 따른 영역설정 리스트 조회 - 검색 혹은 중심시설로 검색한 후 Marker가 그려진다. 그 Marker에서 선택하기를 눌렀을 때, 검색이냐 혹은 중심시설이냐에 따라 분기된다.
			    	   if($("#ftsdText").val() != null && $("#ftsdText").val() != ''){	// 문제점! : 먼저 중심시설유형으로 검색 후에 검색으로 Maker를 그리고 시도하면, 이 첫번째 if문에 들어옴.
			    		   $catchmentAreaLeftMenu.ui.getSrvareaScopeList($("#ftsdText").val(), locInfos[0], locInfos[1]);
			    	   }else{
			    		   $catchmentAreaLeftMenu.ui.getSearchScopeList(locInfos[0], locInfos[1]);
			    	   }
				       // SGIS4_1025_생활권역_임의영역 시작
			    	   // 고정값 초기화
			    	   $("input:radio[name='stats_radio']").prop("checked", false);
			    	   $("input:radio[name='stats_radio']:radio[id='stats01']").prop("checked", true);
			    	   // 임의값 초기화
			    	   if($('#fixed_rndm').val() == 'rndm')
			    		   $('#fixed_rndm').trigger('click');
			    	   $('#rndstats01').trigger('click'); //SGIS4_생활권역_임의영역 수정
			    	   $("#dynamicTbody a").each(function(){ //SGIS4_생활권역_임의영역 수정
			    		   $(this).removeClass('active');	
			    	   });
			    	   
				       // SGIS4_1025_생활권역_임의영역 끝
			    	   
			    	   if($("#menuButton").is(':visible')){
							$(".shadow_group").css("display","block");
							$('#areaSettingMenu').addClass('active');
							$('#statisticsDateMenu').removeClass('active');
							$("#menuButton").css("display","none");
			    	   }
			    	   $('.search_wrap.area').removeClass('active');
			    	   $('.search_wrap.sisul').removeClass('active');			    	   
			    	   $('.search_wrap.year').addClass('active');
						//SGIS4_1025_생활권역 시작
						$('#rndmDiv').hide();
						$('#fixedDiv').show();
						$('#fixed_rndm').val('fixed');
						$("label[for='fixed_rndm']").text('임의값으로 영역 설정');						
						//SGIS4_1025_생활권역 끝			    	   
						//SGIS4_1130_추가 시작
						// 영역 설정 기본값,세부설정 UI 초기값으로 세팅
						$(".selectType").removeClass("on");
						$(".selectType.st01").addClass("on");
						//SGIS4_1130_추가 끝
			    	   $catchmentAreaLeftMenu.ui.chgStyleForRangeSet("Y");
		
			    	   //격자통계에서 매핑 이벤트
			    	   $catchmentAreaLeftMenu.ui.setPoiMapping($(this).parent('div').attr('value'));
			    
			    	   $catchmentAreaMain.ui.getMap(0).markers3.clearLayers();
			    	   $(".sop-pane.sop-infowindow-pane").empty(); //마커 정보창 닫기 
		    	   }else{
		    		   caMessageAlert.open("알림", "선택된 위치에 대한 정보가 정확하지 않습니다.");
		    	   }
		       });
		       
		       //두 번째 지도 위의 [ 마커 > 선택 버튼 ] 클릭 이벤트  - 박상언 2020-10-14 작성
		       body.on("click", "#pointSelectButten2", function(){

		    	   var locInfos = $(this).attr("value").split("/");
		    	   if(locInfos.length >= 3){

		    		   var callerGb = $(this).parent('div.layer_pop03').attr('data-caller-gb');
		    		   var selSufid = "";
		    		   if(callerGb == "M3"){
		    			   selSufid = $(this).attr("data-sufid");
		    			   $('#totalSearchResult_sp > ul > li').removeClass('active');
		    		   }		    		   
			    	   $catchmentAreaObj.setSelectedTargetLoc(locInfos[0], locInfos[1], callerGb, selSufid);
			    	   $catchmentAreaObj.addMouseOverOnMarker(1);
			    	   
			    	   var selMapLocTxt = locInfos[2];
			    	   var selMapLocGb  = "B";
			    	   var x_coor = locInfos[0];
			    	   var y_coor = locInfos[1];
			    	   
			    	   
			    	   //detail_location_compare_1
			    	   //detail_location_compare_2
			    	   $('#detail_location_compare_2').text(selMapLocTxt);			// 상세분석 창에 지정한 위치 이름을 붙여넣어준다.
			    	   $(".divs_wrap02 > .divs01 > span").eq(1).text(selMapLocTxt);	// 지도 위의 2번째 위치에 대한 것
			    	   
			    	   
			    	   // 검색창 닫기
			    	   $('#spatial_position_search_box').removeClass('active');
			    	   $('#facilityTypeSearchDatail_for_spatial').removeClass('active');			    	   
			    	   $('.search_wrap.statistics').addClass('active');
			    	   //SGIS4_1025_생활권역 시작
			    	   $catchmentAreaLeftMenu.ui.moveScroll();
			    	   //SGIS4_1025_생활권역 끝
			    	   
			    	   $catchmentAreaMain.ui.getMap(1).markers3.clearLayers();
			    	   // 마커 정보창 닫기
			    	   $(".sop-pane.sop-infowindow-pane").empty();
	
			    	   //공간분석 조건에서 [인구]의 기본값 세팅
			    	   $catchmentAreaLeftMenu.ui.setPoiMapping($(this).parent('div').attr('value'),'select_age5_detail');
			    	   
			    	   // x좌표, y좌표 값을  span#detail_location_compare_2 에 저장
			    	   //$('#detail_location_compare_2').attr('data-coor',[x_coor, y_coor]);	// data-coor = "1000,2000" ... 이런식으로 저장됨
			    	   
			    	   //$('#spatial_position_search_box').removeClass('active');
	//		    	   $('.search_wrap.sisul').removeClass('active');	
	//		    	   $('.search_wrap.year').addClass('active');
			    	   
			    	   $catchmentAreaLeftMenu.ui.setDetailMapping();
		    	   }else{
		    		   caMessageAlert.open("알림", "선택된 위치에 대한 정보가 정확하지 않습니다.");
		    	   }		    	   
		       });
		       
		     //지도 위 선택 버튼 클릭 이벤트
		       body.on("click", "#poiSelectButten", function(){
		    	   //시설물에 따른 영역설정 리스트 조회
		    	   var selLoc = "";
		    	   var select_x = "";
		    	   var select_y = "";

		    	   if($("input[name='addr_radio']:checked").attr("id") == "sel_addr1"){
		    		   select_x = $(".sec01").attr("value").split("/")[0];
		    		   select_y = $(".sec01").attr("value").split("/")[1];
			    		$catchmentAreaLeftMenu.ui.getSearchScopeList(select_x, select_y);			    		
			    		$catchmentAreaLeftMenu.ui.selMapLocGb = "A";
//			    		selLoc = $(".layer_pop04 .sec01 .addr_road2_txt").text();
			    		selLoc = $(this).closest('.layer_pop04').find('.sec01 > .addr_road2_txt').text();	// 난해해 보이지만 툴팁창에서 주소선택 > 지번의 텍스트를 가져온 것이다. - 박상언 2020-10-16 작성
		    	   }else{
		    			var poimappingval = "";
		    			// 시설물에 대한 유효성 검사를 추가 + 알고리즘 수정 (시작) - 박상언 2020-10-15 작성
		    			var list = $("#sec02List > li > a");
		    			var selectedFacility =  $("#sec02List > li > a.active");		    			
		    			var xyCoorInfo = null;
		    			
		    			if(list[0].text === '검색결과가 없습니다.') {
		    	            caMessageAlert.open("알림", "시설물에 대한 검색 결과물이 없습니다.");
		    	            return;
		    	        } else if(selectedFacility.length != 1) {
		    	        	caMessageAlert.open("알림", "하나의 시설물을 선택하셔야 합니다.");
		    	        	return;
		    	        }
		    			
		    			xyCoorInfo = selectedFacility.attr('value');	// a 태그이므로 $(~).val() 로 값을 읽지  X, attr 사용해야 함.
		    			
		    			select_x = xyCoorInfo.split("/")[0];
		    			select_y = xyCoorInfo.split("/")[1];
		    			poimappingval = selectedFacility.parent('li').attr('id');
		    			selLoc = selectedFacility.text();
		    	        // 시설물에 대한 유효성 검사를 추가 + 알고리즘 수정  (끝) - 박상언 2020-10-15 작성

		    			/*
		    			$("#sec02List > li > a").each(function(){
		    				var on = $(this).hasClass("active");
		    				if(on){
		    					select_x = $(this).attr("value").split("/")[0];
		    					select_y = $(this).attr("value").split("/")[1];
		    					poimappingval = $(this).parent('li').attr('id');
		    					selLoc = $(this).text();
		    				}
		    			});
		    			*/
		    	        
		    			$catchmentAreaLeftMenu.ui.selMapLocGb = "B";
		    			//격자통계에서 매핑 이벤트
		    			$catchmentAreaLeftMenu.ui.setPoiMapping(poimappingval);

		    			$catchmentAreaLeftMenu.ui.getSearchScopeList(select_x, select_y);
		    		}
		    	   
		    	   $catchmentAreaObj.setSelectedLoc(select_x, select_y, 'M2', "");
		    	   $catchmentAreaObj.tobeSelected_locNm = selLoc;
		    	   $catchmentAreaObj.addMouseOverOnMarker(0);
		    	   
		    	   $catchmentAreaLeftMenu.ui.selMapLocTxt = selLoc;
		    	   $("#mapLocation_3").text(selLoc);
		    	   $("#mapLocation_4").text(selLoc);
		    	   $('#detail_location_compare_1').text(selLoc);
		    	   $(".divs_wrap01 > .divs01 > span").eq(1).text(selLoc);
		    	   
		    	   $("input:radio[name='stats_radio']").prop("checked", false);
		    	   $("input:radio[name='stats_radio']:radio[id='stats01']").prop("checked",true);

		    	   if($("#menuButton").is(':visible')){
						$(".shadow_group").css("display","block");
						$('#areaSettingMenu').addClass('active');
						$('#statisticsDateMenu').removeClass('active');
						$("#menuButton").css("display","none");
		    	   }
		    	   $('.search_wrap.area').removeClass('active');
		    	   $('.search_wrap.sisul').removeClass('active');	
		    	   $('.search_wrap.year').addClass('active');
					//SGIS4_1025_생활권역 시작
					$('#rndmDiv').hide();
					$('#fixedDiv').show();
					$('#fixed_rndm').val('fixed');
					$("label[for='fixed_rndm']").text('임의값으로 영역 설정');						
					//SGIS4_1025_생활권역 끝		    	   
					//SGIS4_1130_추가 시작
					// 영역 설정 기본값,세부설정 UI 초기값으로 세팅
					$(".selectType").removeClass("on");
					$(".selectType.st01").addClass("on");
					//SGIS4_1130_추가 끝
		    	   $catchmentAreaLeftMenu.ui.chgStyleForRangeSet("Y");

		    	   $(".sop-pane.sop-infowindow-pane").empty(); //마커 정보창 닫기 
		       });
		       
		       //새로 생성된 지도 위 선택 버튼 클릭 이벤트 - 박상언 2020-10-16 작성
		       body.on("click", "#poiSelectButten2", function(){
		    	   //시설물에 따른 영역설정 리스트 조회
		    	   var selLoc = "";
		    	   var popup = $(this).closest('.layer_pop04');	// 상대위치로 dom을 찾는다. 이유는 현재 만든 팝업창이 기존 지도에도 있을 수 있기 때문이다. 만약을 위해서다.
		    	   var addrBox = popup.find('.sec01');
		    	   var coorInfo = addrBox .attr('value').split('/');
		    	   var addr = addrBox.find('.addr_road2_txt').text();
		    	   
		    	   var facilityBox = popup.find('.sec02');
		    	   if(popup.find('input[type="radio"]:checked').attr("id") === 'sel_addr2_2') {
						var list = facilityBox.find("#sec02List > li > a");
						var selectedFacility =  facilityBox.find("#sec02List > li > a.active");		    			
						var poimappingval = selectedFacility.parent('li').attr('id');
						
						if(list[0].text === '검색결과가 없습니다.') {
		    	            caMessageAlert.open("알림", "시설물에 대한 검색 결과물이 없습니다.");
		    	            return;
		    	        } else if(selectedFacility.length != 1) {
		    	        	caMessageAlert.open("알림", "하나의 시설물을 선택하셔야 합니다.");
		    	        	return;
		    	        }
						coorInfo = selectedFacility.attr('value').split('/');
						$catchmentAreaLeftMenu.ui.setPoiMapping(poimappingval, 'select_age5_detail');
						addr = selectedFacility.text();
		    	   }
		    	   
		    	   if(coorInfo instanceof Array && coorInfo.length >= 2){
		    		   $catchmentAreaObj.setSelectedTargetLoc(coorInfo[0], coorInfo[1], 'M2', "");
		    	   }
		    	   $catchmentAreaObj.tobeSelected_target_locNm = addr;
		    	   $catchmentAreaObj.addMouseOverOnMarker(1);
		    	   
		    	   $('.divs_wrap02 > .divs01 > span').eq(1).text(addr);
		    	   $('#detail_location_compare_2').text(addr);
		    	   //$('#detail_location_compare_2').attr("data-coor",coorInfo);
		    	   
		    	   $('#spatial_position_search_box').removeClass('active');
		    	   $(".sop-pane.sop-infowindow-pane").empty(); //마커 정보창 닫기 
		    	   $('.search_wrap.statistics').addClass('active');
		    	   //SGIS4_1025_생활권역 시작
		    	   $catchmentAreaLeftMenu.ui.moveScroll();
		    	   //SGIS4_1025_생활권역 끝
		    	   
		    	   $catchmentAreaLeftMenu.ui.setDetailMapping();
		    	   
		       });
		       
		       //주행시간 기준
		       body.on("click","#stats01",function(){
		    	   
		    	   if($(this).hasClass('noSel')){ return false; }
		    	   
		    	   $catchmentAreaLeftMenu.ui.typeAllRemoveClass("all");
		    	   
		    	   var x_coordinate = $catchmentAreaLeftMenu.ui.selectCoordinate_x //x좌표
		    	   var y_coordinate = $catchmentAreaLeftMenu.ui.selectCoordinate_y //y좌표
		    	   var defaultVal = $catchmentAreaLeftMenu.ui.t_default;
		    	   
		    	   $("#type_t").children("a").each(function(){
		    		   var selectId = $(this).attr("id");
		    		   var selectVal = $(this).attr("value");
		    		   $.each(defaultVal, function(index, item){
		    			   if(selectVal == item){
		    				   $("#"+selectId).addClass("active");
			    		   }
		    		   });
		    	   });
		    	   
				   // 도형색상과 일치
				   $catchmentAreaLeftMenu.ui.setRangeDisplay('T');
					
		    	   $catchmentAreaLeftMenu.ui.settingSrvAreaTimeMap(x_coordinate, y_coordinate, true);
		       });
		       
		     //주행시간 기준
		       body.on("click","#stats02",function(){
		    	   
		    	   if($(this).hasClass('noSel')){ return false; }
		    	   
		    	   $catchmentAreaLeftMenu.ui.typeAllRemoveClass("all");
		    	   
		    	   var x_coordinate = $catchmentAreaLeftMenu.ui.selectCoordinate_x //x좌표
		    	   var y_coordinate = $catchmentAreaLeftMenu.ui.selectCoordinate_y //y좌표
		    	   var defaultVal = $catchmentAreaLeftMenu.ui.d_default;
		    	   console.log($catchmentAreaLeftMenu.ui.d_default);
		    	   $("#type_d").children("a").each(function(){
		    		   var selectId = $(this).attr("id");
		    		   var selectVal = $(this).attr("value");
		    		   $.each(defaultVal, function(index, item){
		    			   if(selectVal == item){
		    				   $("#"+selectId).addClass("active");
			    		   }
		    		   });
		    	   });
		    	   
		    	   // 도형색상과 일치
		    	   $catchmentAreaLeftMenu.ui.setRangeDisplay('D');
		    	   
		    	   $catchmentAreaLeftMenu.ui.settingSrvAreaDistanceMap(x_coordinate, y_coordinate, true);
		       });
		       
		       //반경기준
		       body.on("click","#stats03",function(){
		    	   $catchmentAreaLeftMenu.ui.typeAllRemoveClass("all");
		    	   
		    	   var x_coordinate = $catchmentAreaLeftMenu.ui.selectCoordinate_x //x좌표
		    	   var y_coordinate = $catchmentAreaLeftMenu.ui.selectCoordinate_y //y좌표
		    	   var defaultVal = $catchmentAreaLeftMenu.ui.r_default;
		    	   
		    	   $("#type_r").children("a").each(function(){
		    		   var selectId = $(this).attr("id");
		    		   var selectVal = $(this).attr("value");
		    		   $.each(defaultVal, function(index, item){
		    			   if(selectVal == item){
		    				   $("#"+selectId).addClass("active");
			    		   }
		    		   });
		    	   });
		    	   
		    	   // 도형색상과 일치
		    	   $catchmentAreaLeftMenu.ui.setRangeDisplay('R');
		    	   
		    	   $catchmentAreaLeftMenu.ui.settingCircleMap(x_coordinate, y_coordinate, true);
		       });
		       
		       // SGIS4_1025_생활권역_임의영역 시작
		       // 임의값, 고정값으로 영역 설정
		       body.on("click", "#fixed_rndm", function(){
		    	   var selectValue = $(this).val();
		    	   
		    	   // 고정값 영역 설정.
		    	   if(selectValue == 'rndm') {
		    		   $(this).val('fixed');
			    	   //SGIS4_1028_생활권역 시작
			    	   $catchmentAreaLeftMenu.ui.rndmFlag = false;
			    	   //SGIS4_1028_생활권역 끝		    		   
		    		   $("label[for='fixed_rndm']").text('임의값으로 영역 설정');
		    		   $('#rndmDiv').hide();
			    	   $('#fixedDiv').show();
			    	   var x_coordinate = $catchmentAreaLeftMenu.ui.selectCoordinate_x //x좌표
			    	   var y_coordinate = $catchmentAreaLeftMenu.ui.selectCoordinate_y //y좌표
			    	   var scopeType = $("input:radio[name='stats_radio']:checked").attr("id"); // 타입  
			    	   if(scopeType == 'stats01') {
			    		   $catchmentAreaLeftMenu.ui.settingSrvAreaTimeMap(x_coordinate, y_coordinate, false);
			    	   }else if(scopeType == 'stats02'){
			    		   $catchmentAreaLeftMenu.ui.settingSrvAreaDistanceMap(x_coordinate, y_coordinate, false);
			    	   }else if(scopeType == 'stats03'){
			    		   $catchmentAreaLeftMenu.ui.settingCircleMap(x_coordinate, y_coordinate, false);
			    	   }
		    	   } else { // 임의값 영역 설정.
		    		   $(this).val('rndm');
		    		   //SGIS4_1028_생활권역 시작
			    	   $catchmentAreaLeftMenu.ui.rndmFlag = true;
			    	   //SGIS4_1028_생활권역 끝
		    		   $("label[for='fixed_rndm']").text('고정값으로 영역 설정');
		    		   
		    		   //
		    		   if($('#stats01').hasClass('noSel')){		    			   
		    			   $('#rndstats01').addClass('noSel');		    			   
		    		   }else{
		    			   $('#rndstats01').removeClass('noSel');
		    		   }
		    		   if($('#stats02').hasClass('noSel')){
		    			   $('#rndstats02').addClass('noSel');
		    		   }else{
		    			   $('#rndstats02').removeClass('noSel');
		    		   }
		    		   
		    		   if(!$('#rndstats01').hasClass('noSel')){	
		    			   $('#rndstats01').trigger('click');
		    		   }else if(!$('#rndstats02').hasClass('noSel')){	
		    			   $('#rndstats02').trigger('click');
		    		   }else{
		    			   $('#rndstats03').trigger('click');
		    		   }

		    		   $('#fixedDiv').hide();
			    	   $('#rndmDiv').show();
			    	   var x_coordinate = $catchmentAreaLeftMenu.ui.selectCoordinate_x //x좌표
			    	   var y_coordinate = $catchmentAreaLeftMenu.ui.selectCoordinate_y //y좌표
			    	   var scopeType = $("input[name = rndscopeType]:checked").val();  // 타입  // SGIS4_생활권역_임의영역 수정
			    	   if(scopeType == 0) {
			    		   $catchmentAreaLeftMenu.ui.settingSrvAreaTimeMap(x_coordinate, y_coordinate, false);
			    	   }else if(scopeType == 1){
			    		   $catchmentAreaLeftMenu.ui.settingSrvAreaDistanceMap(x_coordinate, y_coordinate, false);
			    	   }else if(scopeType == 2){
			    		   $catchmentAreaLeftMenu.ui.settingCircleMap(x_coordinate, y_coordinate, false);
			    	   }
		    	   }
		    	   // check 된 거 풀기.
		    	   $(this).attr("checked", false);
		       });
		       
		       // 임의값으로 영역 설정 - 테이블<td> 선택시
		       body.on("click", "#dynamicTbody a", function(){
		    	   
		    	   var scopeType = $("input[name = rndscopeType]:checked").val(); // 선택된 기준구분의 value값
		    	   var selectLength = 0;
		    	   var on = $(this).hasClass("active");
		    	   var x_coor = $catchmentAreaLeftMenu.ui.selectCoordinate_x //x좌표
		    	   var y_coor = $catchmentAreaLeftMenu.ui.selectCoordinate_y //y좌표
		    	   
		    	   //선택 갯수 확인
		    	   $("#dynamicTbody a").each(function(){ // SGIS4_생활권역_임의영역 수정
		    		   var lengthOn = $(this).hasClass("active");
		    		   if(lengthOn){
		    			   selectLength++;
		    		   }
		    	   });
		    	   
		    	   if($(this).text() != undefined && $(this).text() != null && $(this).text() != "") {
			    	   if(on){
			    		   $(this).removeClass("active");
			    		   if(scopeType == 0) {
			    			   $catchmentAreaLeftMenu.ui.settingSrvAreaTimeMap(x_coor, y_coor, false);
			    		   } else if(scopeType == 1) {
			    			   $catchmentAreaLeftMenu.ui.settingSrvAreaDistanceMap(x_coor, y_coor, false);
			    		   } else if(scopeType == 2) {
			    			   $catchmentAreaLeftMenu.ui.settingCircleMap(x_coor, y_coor, false);
			    		   }
			    	   } else {
			    		   if(selectLength >= 4){
				    		   caMessageAlert.open("알림", "최대 4개 선택이 가능합니다.");
				    		   return false;
				    	   }else{
				    		   $(this).addClass("active");
				    		   if(scopeType == 0) {
				    			   $catchmentAreaLeftMenu.ui.settingSrvAreaTimeMap(x_coor, y_coor, false);
				    		   } else if(scopeType == 1) {
				    			   $catchmentAreaLeftMenu.ui.settingSrvAreaDistanceMap(x_coor, y_coor, false);
				    		   } else if(scopeType == 2) {
				    			   $catchmentAreaLeftMenu.ui.settingCircleMap(x_coor, y_coor, false);
				    		   }
				    	   }
			    	   }
			    	   $catchmentAreaLeftMenu.ui.setrndRangeDisplay(); //SGIS4_생활권역_임의영역 수정
		    	   }
		    	   
		    	   
		       });
		       
		       body.on("click", "#rndscopeType input", function(){		    	   
		    	   if($(this).hasClass('noSel')){
		    		   return false;
		    	   }
		    	   var item = $catchmentAreaLeftMenu.ui.rndmScopeInfo[this.value];
		    	   
		    	   var scope_type = '';
		    	   var rndm_setS = $('.rndm_sec01 .rndm_setS');
		    	   var table_html = '';
	    		   var typeName = item.s_class_cd_nm.split(' ')[0];
	    		   var unit = item.unit_nm;
	    		   var max = (parseFloat)(item.max_scope_value); //최대
	    		   var min = (parseFloat)(item.min_scope_value); //최소
	    		   var intrvl = (parseFloat)(item.scope_intrvl); //간격
	    		   var tdCount = (parseFloat)(max-min+intrvl)/intrvl;//반복횟수
	    		   var row = (tdCount%5 == 0) ? (parseInt)(tdCount/5) : (parseInt)(tdCount/5)+1;
	    		   var col = 5;
	    		   var resCount = (tdCount%5);
	    		   var start = min;
	    		   var tdValue = (this.value == 0) ? 60 : 1000;
						
	    		   rndm_setS.eq(0).html(min+' '+unit);
	    		   rndm_setS.eq(1).html(max+' '+unit);
	    		   rndm_setS.eq(2).html(intrvl+' '+unit);
						
	    		   $('#rndm_table b').html(typeName+' 간격 선택');
	    		   $('#unitSpan').html('(단위 : '+ unit +')');
					    		   
	    		   for(var i = 0; i <tdCount; i++){
	    			   table_html += '<a href="javascript:void(0);" value='+(start * tdValue)+'>'+start + unit +'</a>';
	    			   start += intrvl;
	    		   }

							
	    		   $('#dynamicTbody').html(table_html);
		       });

		       body.on("change", "#scopeType", function(){ 
		    	   var item = $catchmentAreaLeftMenu.ui.rndmScopeInfo[this.value];
		    	   
		    	   var scope_type = '';
		    	   var rndm_setS = $('.rndm_sec01 .rndm_setS');
		    	   var table_html = '';
	    		   var typeName = item.s_class_cd_nm.split(' ')[0];
	    		   var unit = item.unit_nm;
	    		   var max = (parseFloat)(item.max_scope_value);
	    		   var min = (parseFloat)(item.min_scope_value);
	    		   var intrvl = (parseFloat)(item.scope_intrvl);
	    		   var tdCount = (parseFloat)(max-min+intrvl)/intrvl;
	    		   var row = (tdCount%5 == 0) ? (parseInt)(tdCount/5) : (parseInt)(tdCount/5)+1;
	    		   var col = 5;
	    		   var resCount = (tdCount%5);
	    		   var start = min;
	    		   var tdValue = (this.value == 0) ? 60 : 1000;
						
	    		   rndm_setS.eq(0).html(min+' '+unit);
	    		   rndm_setS.eq(1).html(max+' '+unit);
	    		   rndm_setS.eq(2).html(intrvl+' '+unit);
	    		   rndm_setS.eq(3).html(unit);
						
	    		   $('#rndm_table b').html(typeName+' 간격 선택');
	    		   $('#unitSpan').html('(단위 : '+ unit +')');
	    		   
	    		   for(var i=0; i<row; i++) {
	    			   table_html += '<tr>';
	    			   for(var j=0; j<col; j++) {
	    				   table_html += '<td';
	    				   if(i==0 && col-resCount != 0 && resCount != 0) {
	    					   table_html += '>';
	    					   resCount++;
	    				   } else {
	    					   table_html += ' value=' +(start * tdValue)+ '>';
	    					   table_html += start;
	    					   start += intrvl;
	    				   }
	    				   table_html += '</td>';
	    			   }
	    			   table_html += '</tr>';
	    		   }
							
	    		   $('#dynamicTbody').html(table_html);
		       });
		       // SGIS4_1025_생활권역_임의영역 끝
		       
		       // SGIS4_1025_생활권역_임의영역 시작
		       //통계데이터 보기
		       body.on("click", "#statisticsDataBtn", function(){
		    	   //SGIS4_1028_생활권역 시작
		    	   var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
		    	   var rangeVal = $catchmentAreaLeftMenu.ui.getRangeVal2(1);		        	
		    	   var shpArea = $catchmentAreaObj.getShapeArea(rangeType, rangeVal);
		    	   shpArea = Number(shpArea);
		        	
		        	if(shpArea > $catchmentAreaMain.ui.maxAreaUsingService){
		        		caMessageConfirm.open(
								 "알림", 
								 "면적이 " + ($catchmentAreaMain.ui.maxAreaUsingService / 1000000) + "㎢ 이상인 영역에 대해서는 다소 시간이 걸릴 수 있습니다.<br>" +
								 "진행하시겠습니까?",
								 btns = [
									{
									    title : "예",
									    fAgm : null,
									    disable : false,
									    func : function(opt) {
									    	$catchmentAreaLeftMenu.ui.clickStatisticsDataBtn(rangeType);
									    }
									 },
									 
								     {
									   title : "아니오",
									   fAgm : null,
									   disable : false,
									   func : function(opt) { return; }
								     }   
								 ]
							);		        		
		        	}else{		        	
		        		$catchmentAreaLeftMenu.ui.clickStatisticsDataBtn(rangeType);
		        	}		    	   
				   //SGIS4_1028_생활권역 끝
		       });
		       
		       //주행시간 기준 토글 하나씩 선택시 이벤트
		       body.on("click", "#type_t a", function(){
		    	   srvLogWrite('Q0','02','09','01','','');
		    	   if($('#stats01').hasClass('noSel')){ return false; }
		    	   
		    	   $catchmentAreaLeftMenu.ui.typeAllRemoveClass("t");
		    	   var radioId = $(this).parents('div').children('input').attr('id');
		    	   var selectLength = 0;	    	   
		    	   var on = $(this).hasClass("active");
		    	   var selectId = $(this).attr("id");
		    	   var x_coordinate = $catchmentAreaLeftMenu.ui.selectCoordinate_x //x좌표
		    	   var y_coordinate = $catchmentAreaLeftMenu.ui.selectCoordinate_y //y좌표
		    	   
		    	   $("input:radio[name='stats_radio']").prop("checked", false);
		    	   $("input:radio[name='stats_radio']:radio[id='"+radioId+"']").prop("checked", true);
		    	   
		    	   //선택 갯수 확인
		    	   $("#type_t").children("a").each(function(){
		    		   var lengthOn = $(this).hasClass("active");
		    		   if(lengthOn){
		    			   selectLength++;
		    		   }
		    	   });

		    	   if(on){
		    		   $("#"+selectId).removeClass("active");
		    		   $catchmentAreaLeftMenu.ui.settingSrvAreaTimeMap(x_coordinate, y_coordinate, false);
		    	   }else{
		    		   if(selectLength >= 4){
			    		   caMessageAlert.open("알림", "최소 1개, 최대 4개 선택이 가능합니다."); //SGIS4_1025_생활권역_임의영역 수정
			    		   return false;
			    	   }else{
			    		   $("#"+selectId).addClass("active")
			    		   $catchmentAreaLeftMenu.ui.settingSrvAreaTimeMap(x_coordinate, y_coordinate, false);
			    	   }
		    	   }
		    	   
					// 도형색상과 일치
					$catchmentAreaLeftMenu.ui.setRangeDisplay('T');
		       });
		       
		       //주행거리 기준 토글 하나씩 선택시 이벤트
		       body.on("click", "#type_d a", function(){
		    	   srvLogWrite('Q0','02','09','02','','');
		    	   if($('#stats02').hasClass('noSel')){ return false; }
		    	   
		    	   $catchmentAreaLeftMenu.ui.typeAllRemoveClass("d");
		    	   var radioId = $(this).parents('div').children('input').attr('id');
		    	   var selectLength = 0;
		    	   var on = $(this).hasClass("active");
		    	   var selectId = $(this).attr("id");
		    	   var x_coor = $catchmentAreaLeftMenu.ui.selectCoordinate_x //x좌표
		    	   var y_coor = $catchmentAreaLeftMenu.ui.selectCoordinate_y //y좌표
		    	   
		    	   $("input:radio[name='stats_radio']").prop("checked", false);
		    	   $("input:radio[name='stats_radio']:radio[id='"+radioId+"']").prop("checked", true);
		    	   
		    	 //선택 갯수 확인
		    	   $("#type_d").children("a").each(function(){
		    		   var lengthOn = $(this).hasClass("active");
		    		   if(lengthOn){
		    			   selectLength++;
		    		   }
		    	   });
		    	   
		    	   if(on){
		    		   $("#"+selectId).removeClass("active");
		    		   $catchmentAreaLeftMenu.ui.settingSrvAreaDistanceMap(x_coor, y_coor, false);
		    	   }else{
		    		   if(selectLength >= 4){
			    		   caMessageAlert.open("알림", "최대 4개 선택이 가능합니다.");
			    		   return false;
			    	   }else{
			    		   $("#"+selectId).addClass("active")
			    		   $catchmentAreaLeftMenu.ui.settingSrvAreaDistanceMap(x_coor, y_coor, false);
			    	   }
		    	   }
		    	   
		    	   // 도형색상과 일치
		    	   $catchmentAreaLeftMenu.ui.setRangeDisplay('D');		    	   
		       });
		       
		       //반경 기준 토글 하나씩 선택시 이벤트
		       body.on("click", "#type_r a", function(){
				   srvLogWrite('Q0','02','09','03','','');
		    	   $catchmentAreaLeftMenu.ui.typeAllRemoveClass("r");
		    	   var radioId = $(this).parents('div').children('input').attr('id');
		    	   var selectLength = 0;
		    	   var on = $(this).hasClass("active");
		    	   var selectId = $(this).attr("id");
		    	   var x_coor = $catchmentAreaLeftMenu.ui.selectCoordinate_x //x좌표
		    	   var y_coor = $catchmentAreaLeftMenu.ui.selectCoordinate_y //y좌표
		    	   
		    	   $("input:radio[name='stats_radio']").prop("checked", false);
		    	   $("input:radio[name='stats_radio']:radio[id='"+radioId+"']").prop("checked", true);
		    	   
		    	   //선택 갯수 확인
		    	   $("#type_r").children("a").each(function(){
		    		   var lengthOn = $(this).hasClass("active");
		    		   if(lengthOn){
		    			   selectLength++;
		    		   }
		    	   });
		    	   
		    	   if(on){
		    		   $("#"+selectId).removeClass("active");
		    		   $catchmentAreaLeftMenu.ui.settingCircleMap(x_coor, y_coor, false);
		    	   }else{
		    		   if(selectLength >= 4){
			    		   caMessageAlert.open("알림", "최대 4개 선택이 가능합니다.");
			    		   return false;
			    	   }else{
			    		   $("#"+selectId).addClass("active")
			    		   $catchmentAreaLeftMenu.ui.settingCircleMap(x_coor, y_coor, false);
			    	   }
		    	   }
		    	   
		    	   // 도형색상과 일치
		    	   $catchmentAreaLeftMenu.ui.setRangeDisplay('R');		    	   
		       });
		       
		       body.on("click", ".sa_btn_cancel", function(){
		    	  // 박상언 2020-10-14 작성 (시작)
		    	  var mapId = $(this).data('mapId');
		    	  if(mapId) { mapId = +mapId; }	// 정수로 변환
		    	  else  { mapId = 0; }
		    	  // 박상언 2020-10-14 작성 (끝)
		    	  
		    	  $(this).parents(".sop-infowindow").remove();
		    	  var map = $catchmentAreaMain.ui.getMap(mapId);// 지도 구별을 위한 mapId 인자값 추가 - 박상언 2020-10-14 작성
		    	  map.markers.clearLayers(); //마커 초기화
		    	  
		    	  var callerGb = $(this).parent('div.layer_pop03').attr('data-caller-gb');
		    	  if(callerGb === "M3" || callerGb === "M4"){	//SGIS4_1029_생활권역
		    		  if(mapId === 0){
		    			  map.markers3.addLayer($catchmentAreaLeftMenu.ui.map1PoiMarkerMap['selMarker']);
		    			  $('#totalSearchResult > ul > li').removeClass('active');
		    		  }else if(mapId === 1){
		    			  map.markers3.addLayer($catchmentAreaLeftMenu.ui.map2PoiMarkerMap['selMarker']);
		    			  $('#totalSearchResult_sp > ul > li').removeClass('active');
		    		  }		    		  
		    	  }		    	  
		       });
		       
		       //격자통계 상세정보 조회(확인버튼)
		       body.on("click", "#grid_search_btn", function(){
		    	   
		    	   	var chkMsg = $catchmentAreaLeftMenu.ui.prechkForReqGridStat();
					if(chkMsg != ""){
						caMessageConfirm.open(
								 "알림", 
								 chkMsg,
								 btns = [
									{
									    title : "예",
									    fAgm : null,
									    disable : false,
									    func : function(opt) {
											var base_year = $catchmentAreaMain.ui.getBaseYear('3');
											var range = $catchmentAreaLeftMenu.ui.getRangeType();
											var index = $("#statsType02 ul").children(".active").index()+1; //index 1부터 시작..
											$catchmentAreaLeftMenu.ui.settingGridAreaMap(base_year, range, index);
									    }
									 },
									 
								     {
									   title : "아니오",
									   fAgm : null,
									   disable : false,
									   func : function(opt) {
									    	return;							   
									   }
								     }   
								 ]
							);						
					}else{
				    	   var base_year = $catchmentAreaMain.ui.getBaseYear('3');
				    	   var range = $catchmentAreaLeftMenu.ui.getRangeType();
				    	   var index = $("#statsType02 ul").children(".active").index()+1; //index 1부터 시작..
				    	   $catchmentAreaLeftMenu.ui.settingGridAreaMap(base_year, range, index);
					}
			   });

		       //특성별 통계 조회(확인버튼)
		       body.on("click", "#characteristics_search_btn", function(){
		    	   
		    	   
//		    	   caMessageAlert.open("알림", "12월 30일 (수) 오픈예정입니다.");
//		    	   return;
		    	   
		    	   
		    	   
//		    	   var param = {};
//		    	   var memCondCd = "";
		    	   var itemId = "";
		    	   var itemIds = [];
		    	   var itemLbl = "";
		    	   var itemLbls = [];
		    	   var loopCnt = $("#schCondByChaList > ul > li").size();
		    	   for(var i=0; i<loopCnt; i++){
		    		   itemId = $("#schCondByChaList > ul > li").eq(i).attr("data-characteristics-cond");
		    		   if(itemId != undefined && itemId != null && itemId != ""){
		    			   itemLbl = $("#schCondByChaList > ul > li").eq(i).find('a').text();	        			
		    			   
		    			   itemIds.push(itemId);
		    			   itemLbls.push(itemLbl);
		    			   
//		    			   if(itemId.startsWith("pops_")){
//		    				   //인구 관련 조건
//		    				   memCondCd = "pops_cond";
//		    			   }else if(itemId.startsWith("family_")){
//		    				   //가구 관련 조건
//		    				   memCondCd = "family_cond";
//		    			   }else if(itemId.startsWith("house_")){
//		    				   //주택 관련 조건
//		    				   memCondCd = "house_cond";
//		    			   }else if(itemId.startsWith("copr_copr_")){
//		    				   //사업체 관련 조건
//		    				   memCondCd = "copr_cond";
//		    			   }else if(itemId.startsWith("copr_employee_")){
//		    				   //종사자 관련 조건
//		    				   memCondCd = "employee_cond";
//		    			   }
//		    			   
////		    			   if(param.hasOwnProperty(memCondCd)){
////		    				   param[memCondCd] = param[memCondCd] + "|" + itemId;
////		    				   param[memCondCd + "_nm"] = param[memCondCd + "_nm"] + "|" + itemLbl;
////		    			   }else{
////		    				   param[memCondCd] = itemId;
////		    				   param[memCondCd + "_nm"] = itemLbl;
////		    			   }
//		    			   // 카테고리별로 1개만 허용키로 함
//	    				   param[memCondCd] = itemId;
//	    				   param[memCondCd + "_nm"] = itemLbl;		    			   
		    		   }
		    	   }
		    	   
		    	   if(itemIds.length > 0){
		    		   $catchmentAreaLeftMenu.ui.requestCharacteristicsStats(itemIds, itemLbls);
		    	   }else{
		    		   caMessageAlert.open("알림", "[조건설정] 버튼을 클릭하여, 통계 조건을 선택해 주세요.");
		    	   }
			   });		       

		       /*--------------------- 상세분석 기능 개발(setUIEvent 내에 이벤트 핸들러 작성) 시작 - 박상언(pse) ---------------------*/
			   
		       //공간분석 > 위치 설정 > 중심유형으로 찾기 
		       body.on("click", "#facilityTypeSearch_for_Spatial .option_btn", function(){
		    	   console.log('clicked');
		    	   console.log(this);

		        	if($('#schTypeGbB02').is(':checked')){
						var map = $catchmentAreaMain.ui.getMap(1);
						var curZoom = map.zoom;
						if(curZoom < 6){		// 집계구 -> 읍면동으로 확대(20201202)
							caMessageAlert.open("알림", "현재 지도 레벨에서는 선택될 유형 시설이 너무 많습니다.<br/>지도를 확대한 다음 시설 유형을 선택해주세요.");
							return false;							
						}		        		
		        	}else if($('#schTypeGbB01').is(':checked')){
// 읍면동 -> 시군구로 확대(20201202)		        		
//						var emdCd = $("#emd_spatial option:selected").val();
//						if(emdCd == undefined || emdCd == null || emdCd == '0'){
//							caMessageAlert.open("알림", "읍면동을 선택해 주세요.");
//							return false;						
//						}						
		        	}	

		    	   //var check = true;
		    	   var factypeCd = this.id;
		    	   
		    	    // 유효성 검사 ==> 시군구 selectBox가 선택되었는지 확인
//		    	   if($('#sgg_spatial').val() === '0') {
//		    		   caMessageAlert.open("알림", "주변시설 검색은 시군구를 중심으로 검색합니다.<br/>시군구까지 선택을 하시고 다시 시도하세요.");
//		    		   return;
//		    	   }
		    	   /*
		    	    $('#spatial_position_search_box .search_select .selct_02').each(function(index,item){
		    	    	if(item.value === '') {
		    	    		caMessageAlert.open("알림", "위치를 먼저 지정해주셔야 합니다.");
		    	    		check = false;
		    	    		return false;
		    	    	}
		    	    });
		    	    
		    	    if(!check) return;
		    	    */
		    	    //읍면동 기준으로 검색
		    	    // 시군구 레벨로 검색한다.
		        	//var searchArea = $("#sido_spatial option:selected").val() + $("#sgg_spatial option:selected").val().substr(0, 3)/* + $("#emd_spatial option:selected").val().substr(0, 2)*/;
		        	var cate02 = $(this).parent().attr("value");
		        	var cate03 = $(this).data("factypeNm");
		        	//var searchVal = $("#"+this.id).text();
		        	
		        	//유형별 텍스트
		        	$(".cate02_sp").text(cate02);
		        	$(".cate03_sp").text(cate03);
		        	$("#ftsdText_sp").val(factypeCd);
		        	
		        	//console.log(cate02,cate03,factypeCd,searchArea);
		        	//목록조회 초기화
					//$("#totalSearchResult").empty();
		        	$('#totalSearchResult_sp').empty();
		        	
		        	//목록조회
		        	//$catchmentAreaLeftMenu.ui.setfacilityTypeSearchDatailList(searchArea, factypeCd);
		        	//$catchmentAreaLeftMenu.ui.setfacilityTypeSearchDatailListForSpatial(searchArea, factypeCd);
		        	$catchmentAreaLeftMenu.ui.requestForPoiSearch('B', 'sgis', factypeCd);
		        	
		        	//$('.search_wrap.area').removeClass('active');
		        	//$('.search_wrap.sisul').addClass('active');
		        	$('#spatial_position_search_box').removeClass('active');
		        	$('#facilityTypeSearchDatail_for_spatial').addClass('active');
		       });
		       
		       
		       // 중심시설유형 상세보기 리스트 클릭
		        body.on("click", "#totalSearchResult_sp > ul > li", function(){
		        	//SGIS4_1025_생활권역 시작
		        	//나의데이터
		        	if($("#totalSearchResult_sp > ul > li[id^='myData_']").length > 0){
		        		return false;
		        	}
		        	//SGIS4_1025_생활권역 끝
		        	var sufid = this.id.split("_")[1]; //SGIS4_1029_생활권역
		        	var name = $(this).children('span')[0].innerText;//사업체명
		        	var roadAdres =$(this).children('div')[0].innerText;//주소
		        	
		        	//SGIS4_1124_시설유형 추가 관련 시작
		        	if('E0003' == $(this).attr('value') || 'E0004' == $(this).attr('value')){
		        		var x_coor = $(this).attr('data-map-x');
		        		var y_coor = $(this).attr('data-map-y');
		        		
		        		$catchmentAreaLeftMenu.ui.setfacilityTypeListPoint(sufid, name, roadAdres, x_coor, y_coor, 1, $(this).attr('value'));
		        		return false;
		        	}
		        	//SGIS4_1124_시설유형 추가 관련 끝
		        	
		        	$catchmentAreaLeftMenu.ui.getSufidCoordinate(sufid, name, roadAdres, this.value, 1);	// 2번째 지도에서 사용하기 위해서 마지막 인자값으로 두번째 지도의  id 값을 넣어준다.
			    
			    	$('#totalSearchResult_sp > ul > li').removeClass('active');
			    	$(this).addClass('active');
		        });
		       
		        body.on("click", ".lclas_btn_group", function(){
		        	var detailSelectBoxs = $(this).parent().find('.detailSelectBox');
		        	detailSelectBoxs.each(function(index,item){
		        		$(item).empty();
		        		$(item).append('<option value="">선택하세요</option>');
		        	});
		        	detailSelectBoxs[0].disabled = false;
		        	detailSelectBoxs[1].disabled = true;
		        	$catchmentAreaLeftMenu.ui.setDetailConditionSelectBoxWithLClass(this.getAttribute("data-large-class"), detailSelectBoxs[0]);
			    });
		        
		        body.on("change", ".detailSelectBox.first", function(){	        	
		        	$secdSelBox = $(this).closest('div.grid_wrap02').find('select.detailSelectBox.second');
		        	$secdSelBox.attr('disabled', false);
		        	$catchmentAreaLeftMenu.ui.setDetailConditionSelectBoxWithKsicCd(this.value, $secdSelBox);
			    });
		        
		        body.on('mouseenter', '.mightOverflow',function(e){
		        	var $this = $(this);

		            if(this.offsetWidth < this.scrollWidth && !$this.attr('title')){
		                $this.attr('title', $this.text());
		            } else {
		            	$this.removeAttr('title');
		            }
		        });
		        
		        body.on('mouseleave', '.mightOverflow',function(e){
		        	$(this).removeAttr('title');
		        });
		        

		        body.on('click','#detail_year_btn_select',function(e){
		        	var layer_pop = $(this).closest('#date_search_box');
		        	var selectedYear1 = layer_pop.find('#year_select1 option:selected').val();
		        	var selectedYear2 = layer_pop.find('#year_select2 option:selected').val();
		        	
		        	if(selectedYear1 ==='') {
		        		caMessageAlert.open("알림", "연도1을 선택해주세요.");
		        		return;
		        	} else if(selectedYear2 === '') {
		        		caMessageAlert.open("알림", "연도2을 선택해주세요.");
		        		return;
		        	}
		        	
		        	$('#detail_year_compare_1').text(selectedYear1);
		        	$('#detail_year_compare_2').text(selectedYear2);
		        	$('#leftMapOnTopYearTxt1').text(selectedYear1);
		        	$('#leftMapOnTopYearTxt2').text(selectedYear2);
		        	
		        	console.error('이거는 조건 선택창에서 선택 눌렀을 때 호출 되도록 변경, 순서 뒤집기  - 2');
		        	$(layer_pop).removeClass('active');
		        	
		        	var lowerYear = $catchmentAreaLeftMenu.ui.setDetailConditionByBaseYear();

		        	// 영향권 면적에 따라 총값만 제공토록 처리
					var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
					var rangeVal = $catchmentAreaLeftMenu.ui.getRangeVal('03');
					var shpArea = $catchmentAreaObj.getShapeArea(rangeType, rangeVal);
					var shpAreaR = $catchmentAreaObj.getShapeArea(rangeType, rangeVal, "T");
					if(shpArea > shpAreaR){	// 적은 면적 기준으로 적용
						shpArea = shpAreaR;
					}
					
					if(shpArea > 100000000){			// 100㎢ 초과
						$('#gridSettingForDetailLess1k').hide();
						$('#gridSettingForDetail').show();
						
//						var selNm = $('#gridSettingForDetailLess1k > li.active').attr('data-stat-type');
//						$('#gridSettingForDetail > li[data-stat-type="' + selNm + '"] > a').trigger('click');
						$('#gridSettingForDetail > li:first > a').trigger('click');
					}else{
						$('#gridSettingForDetail').hide();
						$('#gridSettingForDetailLess1k').show();
						
//						var selNm = $('#gridSettingForDetail > li.active').attr('data-stat-type');
//						$('#gridSettingForDetailLess1k > li[data-stat-type="' + selNm + '"] > a').trigger('click');
						$('#gridSettingForDetailLess1k > li:first > a').trigger('click');
					}		        	

		        	$('#detail_condition_select_box').addClass('active');
		        	$('#bYearSel04').val(lowerYear).trigger('change');
		        });
		        
		        body.on('click','#detail_year_btn_cancel',function(e){
		        	var layer_pop = $(this).closest('#date_search_box');
		        	layer_pop.find('.close').trigger('click');
		        	$('#block_containerBox').hide();
		        	
		        });
		        
		        body.on('click','#pop08_confirm',function(e){		        	
		        	if($("#pop08_select").children(".selc_box").size() == 0){
		        		caMessageAlert.open("알림", "조회할 통계 조건을 선택해 주세요.");
		        		return false;
		        	}else{
		        		$catchmentAreaLeftMenu.ui.decideSearchConditions();
		        	}
		        	
		        	var layer_pop = $(this).closest('.layer_pop08');
		        	layer_pop.find('.close').trigger('click');
		        });
		        
		        body.on('click','#pop08_cancel',function(e){
		        	var layer_pop = $(this).closest('.layer_pop08');
		        	layer_pop.find('.close').trigger('click');
		        });
		        
		        
		        body.on('click','#layer_pop07_cancel',function(e){
		        	var layer_pop = $(this).closest('.layer_pop07');
		        	layer_pop.find('.close').trigger('click');
		        });
		        
		        body.on('click','div[class^=layer_pop] > a.close',function(e){
		        	var layer_pop = $(this.parentElement);
		        	var layer_pop_id = layer_pop.attr('id');
		        	layer_pop.removeClass('active');
		        	$('#wrapper #gridSettingForDetail li[data-stat-type] > a.disable').removeClass('disable'); // 비활성화 모두 없애기
		        	$('#wrapper #gridSettingForDetailLess1k li[data-stat-type] > a.disable').removeClass('disable'); // 비활성화 모두 없애기
		        	
		        	if(layer_pop_id === 'correlation_popup') {
		        		$('#block_containerBox').hide();
		        	} else if(layer_pop_id === 'detail_condition_select_box') {
		        		$('#block_containerBox').hide();
		        	} else if(layer_pop_id === 'date_search_box') {
//		        		$('#detail_condition_select_box').css('z-index','10001');
		        		$('#block_containerBox').hide();
		        	}
		        	
		        });

		        body.on('click','#correlation_popbtn, #characteristics_popbtn',function(e){

		        	
		        	
		        	
//		           if($(this).attr('id') == 'characteristics_popbtn'){        	
//			    	   caMessageAlert.open("알림", "12월 30일 (수) 오픈예정입니다.");
//			    	   return;
//		           }
			    	   
			    	   
			    	   
			    	   
			    	   
		        	var workGb = "thief";
		        	var bYear = "";
		        	if($(this).attr('id') == 'correlation_popbtn'){
		        		workGb = "bully";
		        		bYear = $("#bYearSel05 option:selected").val();		// TO-DO: 상관관계쪽은 기준년도가 정해지면 수정 할 것
		        	}else{
		        		bYear = $("#bYearSel01 option:selected").val();
		        	}
		        	
		        	// 현재 선택된 기준년도에 맞는 건축년도 호출
		        	var param = {};
		        	param.processGb = "sel";
		        	param.elemId = "#gridSettingForSel .select_constYear";
		        	param.bClassCd = "SA" + bYear;
		        	$catchmentAreaMain.ui.getCodeData(param);
		        	
		        	if(workGb != $catchmentAreaLeftMenu.ui.whoisPop08sCaller){
		        		// 이전 호출자와 다르면 
		        		$catchmentAreaLeftMenu.ui.whoisPop08sCaller = workGb;
		        		
		        		// 팝업 초기화 할 것(선택 조건 목록 지운다던가,, 공시지가 탭 on/off 등등)
		        		$catchmentAreaLeftMenu.ui.initializePop08();
		        		
		        		// 선택된 조건 목록을 호출자 목록과 동기화
		        		$catchmentAreaLeftMenu.ui.syncSearchConditions(workGb);
		        	}		        	
		        	
		        	$('.layer_pop08').addClass('active');
		        	$('#block_containerBox').show();
		        });
		        
		        body.on('click','#detailAnalysisViewBtn',function(e){
		        	
		        	// 2. 현재 상세 분석하고자 하는 주제를 알아낸다. 공간 분석인지, 시간 분석인지, 산관 분석인지...
//		        	var analysisType = $('.search_result.chk_03 li[id^=detailedAnal].active'); //SGIS4_1025_생활권역_상세분석 주석처리
		        	var analysisType = $('.grid_depth1.mH180.active li[id^=detailedAnal].active'); //SGIS4_1025_생활권역_상세분석 시작
		        	var typeNum		 = analysisType.attr('id').substr(-2);	// id의 끝 번호가 [ 공간분석 = '01' / 시간분석 = '02' / 상관분석 = '03' ] 이다. 
		        	
		        	
		        	// 3. 각 상세분석의 주제별로 분기를 만든다.
		        	if(typeNum == 1 || typeNum == 2) {
		        		/*** 공간적 비교분석 관련 코드 작성 ***/
		        		
		        		//$('#detail_condition_select_box .dep_btn01').trigger('click') //SGIS4_1025_생활권역_상세분석 선택한 년도가 초기화 되어서 주석처리
		        		$('#block_containerBox').show();						// 다른 건 클릭하지 못하도록 배경에 까만색을 칠해준다.

		        		if(typeNum == 1) {
		        			// 1. [공간적 비교분석, 시간적 비교분석, 상관간계분석] 공통 유효성 검사
				        	if($('#detail_location_compare_2').text() === '미지정') {
				        		$('#block_containerBox').hide(); // 오류 해결(ERR01) : 공간적 비교분석 => 위치 설정 X => 상세분석 보기 => 알람창 => $('#block_containerBox') 가  계속 남음. 
				        		caMessageAlert.open("알림", "위치를 먼저 설정해주시기 바랍니다.");
				        		return;
				        	}

				        	// 영향권 면적에 따라 총값만 제공토록 처리
							var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
							var rangeVal = $catchmentAreaLeftMenu.ui.getRangeVal('03');
							var shpArea = $catchmentAreaObj.getShapeArea(rangeType, rangeVal);
							var shpAreaR = $catchmentAreaObj.getShapeArea(rangeType, rangeVal, "T");
							if(shpArea > shpAreaR){	// 적은 면적 기준으로 적용
								shpArea = shpAreaR;
							}
							
							if(shpArea > 100000000){			// 100㎢ 초과
								$('#gridSettingForDetailLess1k').hide();
								$('#gridSettingForDetail').show();
								
//								var selNm = $('#gridSettingForDetailLess1k > li.active').attr('data-stat-type');
//								$('#gridSettingForDetail > li[data-stat-type="' + selNm + '"] > a').trigger('click');
								$('#gridSettingForDetail > li:first > a').trigger('click');
							}else{
								$('#gridSettingForDetail').hide();
								$('#gridSettingForDetailLess1k').show();
								
//								var selNm = $('#gridSettingForDetail > li.active').attr('data-stat-type');
//								$('#gridSettingForDetailLess1k > li[data-stat-type="' + selNm + '"] > a').trigger('click');
								$('#gridSettingForDetailLess1k > li:first > a').trigger('click');
							}

				        	$('#detail_condition_select_box').addClass('active');	// 오직 상세 분석 조건 설정 창만 건들 수 있다. 예외적으로 데이터보드는 막지 않았다. 필요하면 나중에 막도록 하겠다.
				        	$('#bYearSel04').show();								
		        		} else {
		        			// 연도설정 선택 팝업
		        			$('#bYearSel04').hide();
//		        			$('#year_select1, #year_select2').val('');
//		        			$('#date_search_box').addClass('active');

		        			// 이하는 #detail_year_btn_select 클릭 이벤트 핸들러에서 가져옴
				        	var selectedYear1 = $('#year_select1 option:selected').val();
				        	var selectedYear2 = $('#year_select2 option:selected').val();
				        	
				        	if(selectedYear1 ==='') {
				        		$('#block_containerBox').hide();
				        		caMessageAlert.open("알림", "연도1을 선택해주세요.");
				        		return;
				        	} else if(selectedYear2 === '') {
				        		$('#block_containerBox').hide();
				        		caMessageAlert.open("알림", "연도2을 선택해주세요.");
				        		return;
				        	} else if(selectedYear1 === selectedYear2) {
				        		$('#block_containerBox').hide();
				        		caMessageAlert.open("알림", "연도1, 연도2가 동일합니다.");
				        		return;
				        	}
				        	
				        	$('#detail_year_compare_1').text(selectedYear1);
				        	$('#detail_year_compare_2').text(selectedYear2);
				        	$('#leftMapOnTopYearTxt1').text(selectedYear1);
				        	$('#leftMapOnTopYearTxt2').text(selectedYear2);

				        	var lowerYear = $catchmentAreaLeftMenu.ui.setDetailConditionByBaseYear();

				        	// 영향권 면적에 따라 총값만 제공토록 처리
							var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
							var rangeVal = $catchmentAreaLeftMenu.ui.getRangeVal('03');
							var shpArea = $catchmentAreaObj.getShapeArea(rangeType, rangeVal);
							var shpAreaR = $catchmentAreaObj.getShapeArea(rangeType, rangeVal, "T");
							if(shpArea > shpAreaR){	// 적은 면적 기준으로 적용
								shpArea = shpAreaR;
							}
							
							if(shpArea > 100000000){			// 100㎢ 초과
								$('#gridSettingForDetailLess1k').hide();
								$('#gridSettingForDetail').show();
								
//								var selNm = $('#gridSettingForDetailLess1k > li.active').attr('data-stat-type');
//								$('#gridSettingForDetail > li[data-stat-type="' + selNm + '"] > a').trigger('click');
								$('#gridSettingForDetail > li:first > a').trigger('click');
							}else{
								$('#gridSettingForDetail').hide();
								$('#gridSettingForDetailLess1k').show();
								
//								var selNm = $('#gridSettingForDetail > li.active').attr('data-stat-type');
//								$('#gridSettingForDetailLess1k > li[data-stat-type="' + selNm + '"] > a').trigger('click');
								$('#gridSettingForDetailLess1k > li:first > a').trigger('click');
							}		        	

				        	$('#detail_condition_select_box').addClass('active');
				        	$('#bYearSel04').val(lowerYear).trigger('change');		        			
		        		}
		        		
		        		//$('#detail_condition_select_box .dep_btn01').trigger('click')
		        		//$('#block_containerBox').show();						// 다른 건 클릭하지 못하도록 배경에 까만색을 칠해준다.
		        		//$('#detail_condition_select_box').addClass('active');	// 오직 상세 분석 조건 설정 창만 건들 수 있다. 예외적으로 데이터보드는 막지 않았다. 필요하면 나중에 막도록 하겠다.
		        		
		        		
		        	} else if(typeNum == 3) {
		        		var loopCnt = $("#schCondByCorrelList > a").size();
		        		if(loopCnt >= 2){
		        			
		        			//var itemId, itemLbl;
		        			var itemId, itemLbl;
	        	            var itemId = "";
	        	            var itemIds = [];
	        	            var itemLbl = "";
	        	            var itemLbls = [];
			        		for(var i=0; i<loopCnt; i++){
								itemId = $("#schCondByCorrelList > a").eq(i).attr("data-correlation-cond");
								if(itemId != undefined && itemId != null && itemId != ""){
									itemLbl = $("#schCondByCorrelList > a").eq(i).text();	        			
									itemIds.push(itemId);
				                    itemLbls.push(itemLbl);
								}
			        		}
			        		
			        		// 배열로 담든,, 스트링으로 붙이든
		        			
			        		// 여기서 화면 정리해서 열고 모래시계 돌리든지,, 서버에서 요청 결과 수령 후 열든지 
			        		 $catchmentAreaLeftMenu.ui.requestCorrelationAnalysis(itemIds, itemLbls);
		        			//$catchmentAreaDataBoard.event.getDataBoard(5);
		        			
		        		}else{
		        			caMessageAlert.open("알림", "상관분석 할  정보를 2가지 이상 선택해 주세요.");
		        			return false;
		        		}
		        	}
		        	
		        	
		        	// 4. 공통적으로 끝맺어야 할 코드가 생기면 이 아래에 추가
		        	
		        	
		        });
		        
		      
		        // 상세분석 --> 격자상세 조건 창의 [선택 ] 버튼에 대한 이벤트
		        body.on('click','#layer_pop07_select',function(e){
		        	//SGIS4_1025_생활권역_상세분석 시작 격자분포에 있는 격자 통계 조건 설정을 같이 써서 수정
		        	//var analysisType = $('.search_result.chk_03 li[id^=detailedAnal].active'); //주석처리 
		        	var analysisType = $('.grid_depth1.mH180.active li[id^=detailedAnal].active'); 
		        	var typeNum		 = analysisType.attr('id').substr(-2);	// id의 끝 번호가 [ 공간분석 = '01' / 시간분석 = '02' ] 이다. 

					var isLimitedMode = false;
					//if($('#gridSettingForDetailLess1k').is(':visible')){ //주석처리
					if($('#gridSettingLess1k').is(':visible')){ 
						isLimitedMode = true; 
					}
					//SGIS4_1025_생활권역_상세분석 끝
		        	if(typeNum == 1) {
		        		// 주제별 총값 제공 상태이면 유효성 체크 안함
		        		if(!isLimitedMode){
		        			if(!$catchmentAreaLeftMenu.ui.checkGridStatConfigure('gridSettingForDetail', true)) return;
		        		}
		        		$catchmentAreaLeftMenu.ui.setSyncGrid(isLimitedMode);
	        			$(this).next().trigger('click');	// 취소버튼 클릭 ( 창닫기 )
		        	} else if (typeNum == 2) {
		        		if(!isLimitedMode){
		        			if(!$catchmentAreaLeftMenu.ui.checkGridStatConfigure('gridSettingForDetail', true)) return;
		        		}
//		        		$('#detail_condition_select_box').css('z-index','9999');	// 원래는 10001
//		        		var yearList = $catchmentAreaLeftMenu.ui.getBaseYearList('gridSettingForDetail');
//		        		$('#date_search_box').addClass('active');
//		        		
//		        		$('#year_select1, #year_select2').empty();
//		        		$('#year_select1, #year_select2').append($('<option></option>').val(0).html('연도 선택'))
//		        		$.each(yearList, function(index, item) {
//		        		    $('#year_select1, #year_select2').append($('<option></option>').val(item).html(item));
//		        		});
		        		var selectedYear1 = $('#year_select1 option:selected').val();
		        		var selectedYear2 = $('#year_select2 option:selected').val()
		        		$catchmentAreaLeftMenu.ui.setSyncGrid(isLimitedMode, {type:'year', base_year1 : selectedYear1, base_year2: selectedYear2});
		        		
		        	}
		        });
		        
		       /*--------------------- 상세분석 기능 개발(setUIEvent 내에 이벤트 핸들러 작성) 끝 - 박상언(pse) ---------------------*/
		        
		      //상세분석 상관관계 : 선택 조건 삭제
		        body.on('click','.close_small',function(e){
					$(this).closest('li.selc_box').remove();					
		        });
		        
		        body.on("change", "#bYearSel06", function(e){
		        	var param = {};
		        	param.processGb = "sel";
		        	param.elemId = "#gridSetting .select_constYear";
		        	param.bClassCd = "SA" + this.value;
		        	
		        	$catchmentAreaMain.ui.getCodeData(param);
		        });
		        
		        body.on("change", "#bYearSel04", function(e){
		        	var param = {};
		        	param.processGb = "sel";
		        	param.elemId = "#gridSettingForDetail .select_constYear";
		        	param.bClassCd = "SA" + this.value;
		        	
		        	$catchmentAreaMain.ui.getCodeData(param);
		        });

// 범위선택 제거와 관련하여 슬라이드바는 js에서 여기만 주석처리		        
//		        this.slideValue("populationAgeFrom", "populationAgeTo", "#slider-range_age1", "세", 105);
//		        this.slideValue("populationAgeFrom2", "populationAgeTo2", "#slider-range_age2", "세", 105);
//		        this.slideValue("populationAgeFrom3", "populationAgeTo3", "#slider-range_age3", "세", 105);
//		        this.slideValue("houseTotAreaFrom", "houseTotAreaTo", "#slider-range_area1", "㎡", 9);
//		        this.slideValue("houseTotAreaFrom2", "houseTotAreaTo2", "#slider-range_area2", "㎡", 9);
//		        this.slideValue("houseTotAreaFrom3", "houseTotAreaTo3", "#slider-range_area3", "㎡", 9);

		        //SGIS4_생활권역 시작
		        body.on('click','#ksicCoprGrdBtn',function(e){		        	
		        	var option = {};
		        	option.workGb = "gridStat_copr";
		        	//SGIS4_0629_생활권역 시작
		        	$rootCtnr = $(this).closest(".classCont");		        	
		        	option.jingle = $rootCtnr.attr("data-ksic-sel-cd");
		        	option.mainJingle = $rootCtnr.attr("data-ksic-sel-main-cd");
					//SGIS4_0629_생활권역 끝
		        	$catchmentAreaKSIC.ui.openUI($catchmentAreaLeftMenu, option);
		        });
		        
		        body.on('click','#ksicEmplGrdBtn',function(e){
		        	var option = {};
		        	option.workGb = "gridStat_employee";		        	
		        	//SGIS4_0629_생활권역 시작
		        	$rootCtnr = $(this).closest(".classCont");		        	
		        	option.jingle = $rootCtnr.attr("data-ksic-sel-cd");
		        	option.mainJingle = $rootCtnr.attr("data-ksic-sel-main-cd");
		        	//SGIS4_0629_생활권역 끝
		        	$catchmentAreaKSIC.ui.openUI($catchmentAreaLeftMenu, option);					
		        });
		        
		        body.on('click','#ksicCoprAraBtn',function(e){		        	
		        	var option = {};
		        	option.workGb = "areaStat_copr";
		        	//SGIS4_0629_생활권역 시작
		        	$rootCtnr = $(this).closest(".classCont");		        	
		        	option.jingle = $rootCtnr.attr("data-ksic-sel-cd");
		        	option.mainJingle = $rootCtnr.attr("data-ksic-sel-main-cd");
		        	//SGIS4_0629_생활권역 끝
		        	$catchmentAreaKSIC.ui.openUI($catchmentAreaLeftMenu, option);					
		        });
		        
		        body.on('click','#ksicEmplAraBtn',function(e){
		        	var option = {};
		        	option.workGb = "areaStat_employee";
		        	//SGIS4_0629_생활권역 시작
		        	$rootCtnr = $(this).closest(".classCont");		        	
		        	option.jingle = $rootCtnr.attr("data-ksic-sel-cd");
		        	option.mainJingle = $rootCtnr.attr("data-ksic-sel-main-cd");
		        	//SGIS4_0629_생활권역 끝
		        	$catchmentAreaKSIC.ui.openUI($catchmentAreaLeftMenu, option);					
		        });
		        
		        body.on('click','.btn_clearKSIC',function(e){
		        	var $bowl = $(e.target).closest('.classCont');
		        	$catchmentAreaLeftMenu.ui.initClassCont($bowl);					
		        });
		        
		        body.on('click','a[data-grdstat-type="tabFavorites"]',function(e){
		        	var $li = $(this).closest('li');
		        	//SGIS4_1025_생활권역 시작
		        	$li.find('.allCont').hide();		        	
		        	$li.find('.classCont').hide();
		        	$li.find('.favorCont').show();
		        	
		    		$(this).closest('.grid_depth1').addClass('h370');
		    		$(this).closest('.grid_depth1').removeClass('h160 h330');
		    		
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting" || $(this).closest('.grid_depth1').attr("id") == "areaSetting"){
		        		$catchmentAreaLeftMenu.event.resizePopup();
		        	}
		        	
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting"){
		        		$catchmentAreaLeftMenu.ui.moveScroll();
		        	}
		        	//SGIS4_1025_생활권역 끝
		        });
		        
		        body.on('click','a[data-grdstat-type="tabIndustryClass"]',function(e){
		        	var $li = $(this).closest('li'); 
		        	//SGIS4_1025_생활권역 시작
		        	$li.find('.allCont').hide();		        	
		        	$li.find('.favorCont').hide();
		        	$li.find('.classCont').show();
		        	
		    		$(this).closest('.grid_depth1').addClass('h330');
		    		$(this).closest('.grid_depth1').removeClass('h160 h370');
		    		
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting" || $(this).closest('.grid_depth1').attr("id") == "areaSetting"){
		        		$catchmentAreaLeftMenu.event.resizePopup();
		        	}
		        	
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting"){
		        		$catchmentAreaLeftMenu.ui.moveScroll();
		        	}
		        	
		        	if($li.find('#ksicCoprGrdBtn').length === 1){
		        		$('#ksicCoprGrdBtn').trigger('click');
		        	}else if($li.find('#ksicEmplGrdBtn').length === 1){
		        		$('#ksicEmplGrdBtn').trigger('click');
		        	}else if($li.find('#ksicCoprAraBtn').length === 1){
		        		$('#ksicCoprAraBtn').trigger('click');
		        	}else if($li.find('#ksicEmplAraBtn').length === 1){
		        		$('#ksicEmplAraBtn').trigger('click');
		        	}		        	
		        	//SGIS4_1025_생활권역 끝
		        });

		        body.on("click", ".favorlist .btn_sub", function(){
		        	$(this).toggleClass('active');
		        	$(this).siblings('.btn_sub').removeClass('active');
		        });
		        
		        body.on("click", "#wrapper .chk_result .scroll_wrap .favorlist ul > li > a", function(){		        	
		        	$(this).closest('li').toggleClass('active');
		        	$(this).closest('li').siblings('li').removeClass('active');

		        });
		        
		        body.on("click", ".whAraLeft a.switchBox span", function(){
		        	if($(this).hasClass('active')){
		        		$(this).removeClass('active');
		        		$(this).siblings('span').addClass('active');
		        		
		        		if($(this).hasClass('txt1')){
		        			$('.area_setting').show();
		        		}else if($(this).hasClass('txt2')){
		        			$('.area_setting').hide();
		        			$catchmentAreaDataBoard.ui.adjustPop01Board("all", false);
		        		}
		        	}else{
		        		$(this).siblings('span').removeClass('active');
		        		$(this).addClass('active');
		        		
		        		if($(this).hasClass('txt1')){
		        			$('.area_setting').hide();
		        			$catchmentAreaDataBoard.ui.adjustPop01Board("all", false);
		        		}else if($(this).hasClass('txt2')){
		        			$('.area_setting').show();
		        		}
		        	}
		        	
		        	//SGIS4_1025_생활권역 시작
		        	if($('.area_setting').is(':visible')){		        		
		        		if($(".area_setting .ara_cond_bx > li.active").length > 0){		        			
		        			$(".area_setting .ara_cond_bx > li.active > a").trigger('click');
		        		}
		        	}else{
		        		$catchmentAreaLeftMenu.event.resizePopup();
		        	}
		        	//SGIS4_1025_생활권역 끝
		        });

		        body.on("click", ".ara_pops_chk, .ara_family_chk, .ara_house_chk, .ara_copr_chk, .ara_employee_chk", function(){		        	
		        	$(this).toggleClass('active');
		        	
		        	// 클릭 시 유효성 검사 없고, 조회(area_search_btn) 버튼 클릭 시 유효성 검사
		        });
		        
				//영역 내 세부항목별 조회
				body.on("click", "#area_search_btn", function(){
					//SGIS4_1025_생활권역 시작
					$catchmentAreaDataBoard.ui.dStatType = "";
					//SGIS4_1025_생활권역 끝
					
					var $rootCtnr = $(this).closest(".area_setting");
					//SGIS4_1025_생활권역 시작
					$rootCtnr.find(".ara_chk_bx > a").removeClass('active');					
					var selIdx = $rootCtnr.find(".ara_cond_bx > li.active").index();
					$rootCtnr.find(".ara_chk_bx > a").eq(selIdx).addClass('active');
					//SGIS4_1025_생활권역 끝

					if($rootCtnr.find(".ara_chk_bx > a.active").length > 0){
						
						// addSelectedCondition 을 따라서
						
		        		if(!$catchmentAreaLeftMenu.ui.checkAreaStatConfigure($rootCtnr)) return;
		        		
						var itemIds = [];
						var itemLbls = [];
		        		var loopCnt = $rootCtnr.find(".ara_chk_bx > a").size();
						for(var i=0; i<loopCnt; i++){
							var $chkBx = $rootCtnr.find(".ara_chk_bx > a").eq(i);
				        	if($chkBx.hasClass('active')){
				        		
				        		var $condBx = $rootCtnr.find(".ara_cond_bx > li").eq(i);
				        		var condBxType = $condBx.attr('data-stat-type');
				        		var param = {};
				        		param.statType = condBxType; 
				        		$catchmentAreaLeftMenu.ui.setGridStatConfigure(param, 'areaSetting');				        		

								var itemId = param.statType;		//종사자의 경우 condBxType와 param.statType 값이 달라짐.
								var itemLbl = "";
								if(condBxType == "pops"){//인구
									
									var genderCvs = (param.gender == undefined ? 'all' : param.gender);
									if(param.ageToCd == undefined){
										if(param.ageFromCd == undefined){
											itemId = itemId + "_" + genderCvs + "_all";
										}else{
											itemId = itemId + "_" + genderCvs + "_" + param.ageFromCd;
										}						
									}else{
										itemId = itemId + "_" + genderCvs + "_" + param.ageFromCd + "_" + param.ageToCd;
									}
									itemLbl = "인구 : " + param.schCondNm;
								}else if(condBxType == "family"){//가구
									
									var householdTypeCvs = (param.householdType == undefined ? 'all' : param.householdType);
									itemId = itemId + "_" + householdTypeCvs;
									itemLbl = "가구 : " + param.schCondNm;
								}else if(condBxType == "house"){//주택
									
									var rdResidTypeCvs = (param.rd_resid_type == undefined ? 'all' : param.rd_resid_type);
									var constYearCvs = (param.const_year == undefined ? 'all' : param.const_year);
									var houseAreaCdCvs = (param.house_area_cd == undefined ? 'all' : param.house_area_cd);					
									itemId = itemId + "_" + rdResidTypeCvs + "_" + constYearCvs + "_" + houseAreaCdCvs;
									itemLbl = "주택 : " + param.schCondNm;
								}else if(condBxType == "copr" || condBxType == "employee"){//사업체 및 종사자
									
									var ksic3CdCvs = (param.ksic_3_cd == undefined ? 'all' : param.ksic_3_cd);
									itemId = itemId + "_" + param.grdstatType + "_" + ksic3CdCvs + "_" + param.isLifeBiz;
									
									if(param.grdstatType == "copr"){
										itemLbl = "사업체 : " + param.schCondNm;
									}else if(param.grdstatType == "employee"){
										itemLbl = "종사자 : " + param.schCondNm;
									}									
								}
				        		
				        		$chkBx.attr("data-characteristics-cond", itemId);
				        		$chkBx.attr("data-characteristics-cond-nm", itemLbl);				        		

								itemIds.push(itemId);
								itemLbls.push(itemLbl);
				        		
				        	}else{
				        		$chkBx.attr("data-characteristics-cond", "");
				        		$chkBx.attr("data-characteristics-cond-nm", "");
				        	}						
						}
						
						if(itemIds.length > 0){
							$catchmentAreaLeftMenu.ui.requestCharacteristicsStats(itemIds, itemLbls);
							//SGIS4_1025_생활권역 시작
							$catchmentAreaDataBoard.ui.setDetailDataBoard("chk", condBxType);
							$catchmentAreaDataBoard.ui.dItemIds = itemIds;
				    		$catchmentAreaDataBoard.ui.dItemLbls = itemLbls;
				    		//SGIS4_1025_생활권역 끝
						}
					}else{
						messageAlert.open("알림", "조회하려는 부문(인구/가구/주택/사업체/종사자)을 1개 이상 선택해 주세요.");
						return;						
					}
				});

		        body.on("click", ".lifeBizList .roundTextBox", function(){		        	
		        	$(this).toggleClass('active');

					var $rootCtnr = $(this).closest(".lifeBizList");
					$rootCtnr.find(".roundTextBox").not($(this)).removeClass('active');
					$rootCtnr.find(".lifeBizItmBox").hide();
					
		        	if($(this).hasClass('active')){
		        		$(this).next().show();		// lifeBizItmBox
		        	}
		        	
		        	$catchmentAreaLeftMenu.ui.moveScroll();
		        });

//		        body.on("click", ".lifeBizItmBox li input:radio", function(e){
//		        	
//		        	var $rootCtnr = $(this).closest(".lifeBizItmBox");
//		        	$rootCtnr.find("ul > li > input").not($(this)).prop('checked', false);
//		        	$rootCtnr.find("ul > li > input").not($(this)).data('storedValue', false);
//
//		        	var previousValue = $(this).data('storedValue');
//		            if (previousValue) {
//		                $(this).prop('checked', !previousValue);
//		                $(this).data('storedValue', !previousValue);
//		            }else{
//						$(this).data('storedValue', true);
//						$(this).prop('checked', true);
//		            }	        	
//		        	
//		        	$catchmentAreaLeftMenu.ui.moveScroll();
//		        });
		        
		        //SGIS4_1025_생활권역 시작
//		        body.on("click", ".lifeBizItmBox > ul > li", function(e){
//		        	
//		        	var $rootCtnr = $(this).closest(".lifeBizBox");
//		        	$rootCtnr.find(".lifeBizItmBox > ul > li").not($(this)).removeClass('active');
//		        	$(this).toggleClass('active');    	
//		        	
//		        	//$catchmentAreaLeftMenu.ui.moveScroll();		        	
//		        });
		        
		        body.on("click", ".lifeBizItmBox > ul > li > span", function(e){
		        	
		        	var $rootCtnr = $(this).closest(".lifeBizBox");
		        	$rootCtnr.find(".lifeBizItmBox > ul > li > span").not($(this)).removeClass('active');
		        	$(this).toggleClass('active');
		        	
		        	$rootCtnr.find(".roundTextBox").removeClass('jingleSel');
		        	if($(this).hasClass('active')){
		        		$(this).closest(".lifeBizItmBox").prev(".roundTextBox").addClass('jingleSel');
		        		var xprtmxm = $(this).closest(".lifeBizItmBox").prev(".roundTextBox").html() + " > " + $(this).html(); 
		        		$(this).closest(".lifeBizList").find(".lifeBizHead > span").html(xprtmxm);
		        		$(this).closest(".lifeBizList").find(".lifeBizHead > span").show();
		        	}else{
		        		$(this).closest(".lifeBizList").find(".lifeBizHead > span").html("");
		        		$(this).closest(".lifeBizList").find(".lifeBizHead > span").hide();
		        	}
		        	
		        	//$catchmentAreaLeftMenu.ui.moveScroll();		        	
		        });
		        //SGIS4_1025_생활권역 끝
		        
		        body.on("click", ".classCont .clsSet", function(e){

		        	var selCd = $(this).attr("data-ksic-sel-cd");
		        	if(selCd !== undefined && selCd !== null && selCd !== ""){

			        	$rootCtnr = $(this).closest(".classCont");			        	

			        	$rootCtnr.find('.clsSet').removeClass("sel");
			        	$(this).addClass("sel");
			        	
			        	$rootCtnr.attr("data-ksic-sel-cd", selCd);
			        	$rootCtnr.attr("data-ksic-sel-nm", $(this).attr("data-ksic-sel-nm"));					
		        	}
					
		        });
		        		        
		        body.on("click", ".favorCont .favor_i", function(e){
		        	$('#help-indicator').show();
		        });
		        //SGIS4_생활권역 끝
		        //SGIS4_1025_생활권역 시작
		        body.on("click", ".dtlCond_chk.on", function(){
		    		$(this).hide();
		    		$(this).siblings('.dtlCond_chk.off').show();

		        	$rootCtnr = $(this).closest(".whAraLeft");
		        	$rootCtnr.find('a.switchBox span.txt1').trigger("click");
		        	
		        	$('#stats_search_btn').addClass('noActive');
		        	
//		        	if($("#detail_data_popup").is(':visible')){
//		        		$(".detail_back_btn").trigger('click');
//		        	}
		        	$catchmentAreaDataBoard.ui.changeScreenForAreaDataboard(false);
		        });
		        
		         body.on("click", ".dtlCond_chk.off", function(){
		    		$(this).hide();
		    		$(this).siblings('.dtlCond_chk.on').show();
		    		
		    		$rootCtnr = $(this).closest(".whAraLeft");
		        	$rootCtnr.find('a.switchBox span.txt2').trigger("click");
		        	
		        	$('#stats_search_btn').removeClass('noActive');
		        });
		        
		        body.on("click", "#stats_search_btn", function(e){
		        	if($('.search_wrap.statistics .chk_01').hasClass('active')){		        		
		        		if($(".search_wrap.statistics .whAraDtlChk > .dtlCond_chk.on").is(':visible')){
		        			$("#area_search_btn").trigger("click");
		        		}else{
		        			// 숨길까
		        		}
		        	}else if($('.search_wrap.statistics .chk_02').hasClass('active')){ 
		        		//SGIS4_생활권역_상세분석 시작 조회 버튼 누를 떄 상세분석일 경우 조건 추가
		        		if($('#detail_analysis_tab').hasClass('active')){ 
		        			var analysisType = $('.grid_depth1.mH180.active li[id^=detailedAnal].active'); //SGIS4_생활권역
				        	var typeNum		 = analysisType.attr('id').substr(-2);	// id의 끝 번호가 [ 공간분석 = '01' / 시간분석 = '02' ] 이다.
							var isLimitedMode = false;
				          
				        	if(typeNum == 1){ //공간적 비교분석 예외처리
				        		if($('#detail_location_compare_2').text() === '미지정') {
					        		$('#block_containerBox').hide(); // 오류 해결(ERR01) : 공간적 비교분석 => 위치 설정 X => 상세분석 보기 => 알람창 => $('#block_containerBox') 가  계속 남음. 
					        		caMessageAlert.open("알림", "위치를 먼저 설정해주시기 바랍니다.");
					        		return;
					        	}
				        	}else if(typeNum == 2){ //시간적 비교분석 예외처리
				        		var selectedYear1 = $('#year_select1 option:selected').val();
					        	var selectedYear2 = $('#year_select2 option:selected').val();
					        	
					        	//데이터 보드에 연도 갖고오기위해 사용
					        	$('#detail_year_compare_1').text(selectedYear1); 
					        	$('#detail_year_compare_2').text(selectedYear2);
					        	$('#leftMapOnTopYearTxt1').text(selectedYear1);
					        	$('#leftMapOnTopYearTxt2').text(selectedYear2);
					        	
				        		if(selectedYear1 ==='') {
					        		$('#block_containerBox').hide();
					        		caMessageAlert.open("알림", "연도1을 선택해주세요.");
					        		return;
					        	} else if(selectedYear2 === '') {
					        		$('#block_containerBox').hide();
					        		caMessageAlert.open("알림", "연도2을 선택해주세요.");
					        		return;
					        	} else if(selectedYear1 === selectedYear2) {
					        		$('#block_containerBox').hide();
					        		caMessageAlert.open("알림", "연도1, 연도2가 동일합니다.");
					        		return;
					        	}	
				        	}
				           		
				        
							if($('#gridSettingLess1k').is(':visible')){ //SGIS4_생활권역
								isLimitedMode = true; 
							}
							$catchmentAreaDataBoard.ui.clearUI();
				        	if(typeNum == 1) {
				        		// 주제별 총값 제공 상태이면 유효성 체크 안함
				        		if(!isLimitedMode){
				        			if(!$catchmentAreaLeftMenu.ui.checkGridStatConfigure('gridSetting', true)) return;
				        		}				        		
			        			$catchmentAreaLeftMenu.ui.setSyncGrid(isLimitedMode);
				        	} else if (typeNum == 2) {
				        		if(!isLimitedMode){
				        			if(!$catchmentAreaLeftMenu.ui.checkGridStatConfigure('gridSetting', true)) return;
				        		}
        		        		var selectedYear1 = $('#year_select1 option:selected').val();
				        		var selectedYear2 = $('#year_select2 option:selected').val()
				        		$catchmentAreaLeftMenu.ui.setSyncGrid(isLimitedMode, {type:'year', base_year1 : selectedYear1, base_year2: selectedYear2});
					        	
				        		}
		        		}else{
		        			$("#grid_search_btn").trigger("click");
		        		}
		        		//SGIS4_생활권역_상세분석 끝
		        	}
		        });

		        body.on('click','a[data-grdstat-type="tabAll"]',function(e){
		        	var $li = $(this).closest('li'); 
		        	$li.find('.classCont').hide();
		        	$li.find('.favorCont').hide();
		        	$li.find('.allCont').show();
		        	
		    		$(this).closest('.grid_depth1').addClass('h160');
		    		$(this).closest('.grid_depth1').removeClass('h330 h370');
		    		
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting" || $(this).closest('.grid_depth1').attr("id") == "areaSetting"){
		        		$catchmentAreaLeftMenu.event.resizePopup();
		        	}
		        	
		        	if($(this).closest('.grid_depth1').attr("id") == "gridSetting"){
		        		$catchmentAreaLeftMenu.ui.moveScroll();
		        	}		        	
		        });

		        //나의데이터 리스트
		        body.on("click", "#totalSearchResult > ul > li[id^='myData_'], #totalSearchResult_sp > ul > li[id^='myData_']", function(){
		        	var name = $(this).children('span')[0].innerText;//명
		        	var roadAdres = $(this).children('div')[0].innerText;//주소
		        	var mapId = Number($(this).attr("data-map-id")); //맵 아이디
		        	var x_coor = $(this).attr("data-x");
		        	var y_coor = $(this).attr("data-y");
		        	
		        	if(mapId == 0){
		        		$('#totalSearchResult > ul > li').removeClass('active');
		        	}else{
		        		$('#totalSearchResult_sp > ul > li').removeClass('active');
		        	}
			    	
			    	$(this).addClass('active');
			    	
			    	//SGIS4_1029_생활권역 시작
			    	//getSufidCoordinate 함수의 callback 부분을 가져옴
			    	var myDataSeq = this.id.split("_")[1];
					var thatMap = $catchmentAreaMain.ui.getMap(mapId);
					thatMap.markers.clearLayers(); //마커 초기화
					
					if(mapId === 0) {
						var selItm = $catchmentAreaLeftMenu.ui.map1PoiMarkerMap['selMarker'];
						if(selItm !== undefined && selItm !== null && !thatMap.markers3.hasLayer(selItm)){
							thatMap.markers3.addLayer(selItm);
						}
						
						var selMarker = $catchmentAreaLeftMenu.ui.map1PoiMarkerMap['myData_' + myDataSeq];
						$catchmentAreaLeftMenu.ui.map1PoiMarkerMap['selMarker'] = selMarker;
						$catchmentAreaMain.ui.getMap(mapId).markers3.removeLayer(selMarker);								
					}else if(mapId === 1) {
						var selItm = $catchmentAreaLeftMenu.ui.map2PoiMarkerMap['selMarker'];
						if(selItm !== undefined && selItm !== null && !thatMap.markers3.hasLayer(selItm)){
							thatMap.markers3.addLayer(selItm);
						}								
						
						var selMarker = $catchmentAreaLeftMenu.ui.map2PoiMarkerMap['myData_' + myDataSeq];
						$catchmentAreaLeftMenu.ui.map2PoiMarkerMap['selMarker'] = selMarker;
						$catchmentAreaMain.ui.getMap(mapId).markers3.removeLayer(selMarker);								
					}
					
			    	$catchmentAreaLeftMenu.ui.moveTargetArea(name, roadAdres, x_coor, y_coor, null, mapId, "M4", 12, myDataSeq);
			    	//SGIS4_1029_생활권역 끝
			    });
		        //SGIS4_1025_생활권역 끝
		        
		        //SGIS4_1124_영역설정 토글 시작
		        body.on("click", ".selectType.st01 , .selectType.st02", function(){
		        	if(!$(this).hasClass('on')) {
		        		$(".selectType").removeClass("on");
		        		$(this).addClass("on");
		        		$("#fixed_rndm").trigger("click");
		        	}
		        });
		      //SGIS4_1124_영역설정 토글 끝
			},

			/**
			 * 
			 * @name         : slideValue
			 * @description  : 슬라이드 바 컨트롤.
			 * @date         : 2015. 10. 08. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			slideValue : function(from, to, slider, etc, limit) {
			    var domFrom = "#"+from;
			    var domTo = "#"+to;
			    var domSlider = slider;
			    var min = 1;
			    var step = 1;
			    var tmpValues = null;
			    var tmpHouseSpaceList = [0, 20, 40, 60, 85, 100, 130, 165, 230, 300];
			    var values = null;
			    
			    if (from == "populationAgeFrom" || from == "populationAgeFrom2" || from == "populationAgeFrom3") {
			    	min = 0;
			    	
			    	//9월서비스 20160729 권차욱 수정
			    	step = 5;
			    	values = [10, 65];
			    }else if (from == "houseTotAreaFrom" || from == "houseTotAreaFrom2" || from == "houseTotAreaFrom3") {
			    	min = 0;
			    	
			    	//9월서비스 20160729 권차욱 수정
			    	step = 1;
			    	values = [0, 1];
			    }
			    
			    var data = 0;
				for (var i=min; i<=limit; i++) {
					//9월서비스 20160729 권차욱 수정
					if (from == "populationAgeFrom" || from == "populationAgeFrom2" || from == "populationAgeFrom3") {
						data = i;
						if (i != 0 && i%5 != 0) {
							continue;
						}
					}
					var tmpText = i + etc;
					if (from == "houseTotAreaFrom" || from == "houseTotAreaFrom2" || from == "houseTotAreaFrom3") {
						data = tmpHouseSpaceList[i];
					    tmpText = tmpHouseSpaceList[i]+etc;
					}
					if (i == limit) {
						tmpText = (limit-5)+"+"; //2016.10.19 lbdms
						if (from == "houseTotAreaFrom" || from == "houseTotAreaFrom2" || from == "houseTotAreaFrom3") {
							tmpText = tmpHouseSpaceList[i-1]+"+";
						}
					} 
					
			        $(domFrom).append($("<option>", { 
			            value: data,
			            text : tmpText
			        }));
			        $(domTo).append($("<option>", { 
			            value: data,
			            text : tmpText
			        }));
			    }
				
				if (from == "populationAgeFrom" || from == "populationAgeFrom2" || from == "populationAgeFrom3") {
					$(domFrom).val("10");
			    	$(domTo).val("65");
				}else {
					$(domFrom).val("0");
			    	$(domTo).val("20");
			    	$("."+from).text("약 "+(0/3.3).toFixed(1)+"평");
				    $("."+to).text("약 "+(20/3.3).toFixed(1)+"평");
				}
				
				//2016.09.09 9월 서비스
			    $(domFrom).change(function(){
			    	var spaceTo = $(domTo).val();
			    	var id = $(this).attr("id");

			    	if (id == "populationAgeFrom" || id == "populationAgeFrom2" || id == "populationAgeFrom3") {
				        if (parseInt($(this).val()) >= parseInt(spaceTo)) {
				        	 $(this).val(parseInt(spaceTo)-5);
				        	 
				        }
				        $(domSlider).slider("values", 0, $(this).val());
			    	}else if (id == "houseTotAreaFrom" || id == "houseTotAreaFrom2" || id == "houseTotAreaFrom3") {
			    		if (parseInt($(this).val()) >= parseInt(spaceTo)) {
			    			var idx = $(domTo).prop("selectedIndex");
				    		idx = idx-1;
				    		var toData = $(domTo+ " option:eq("+idx+")").val();
				        	$(this).val(toData);
				        }
			    		var idx = 0;
			    		for (var i=0; i<tmpHouseSpaceList.length; i++) {
			    			if (tmpHouseSpaceList[i] == $(this).val()) {
			    				idx = i;
			    				break;
			    			}
			    		}
			    		$(domSlider).slider("values", 0, idx);
			    		$("."+from).text("약 "+($(this).val()/3.3).toFixed(1)+"평");
			    	}

			    	//2016.09.09 9월 서비스 
			        var fromData = $(this).val();
			        $(domTo+ " option").each(function() {
			        	$(this).show();
			        	if (parseInt(fromData) >= parseInt($(this).val())) {
			        		$(this).hide();
			        	}
			        });
			    });
			    //2016.09.09 9월 서비스
			    $(domTo).change(function(){
			        var spaceFrom = $(domFrom).val();
			        var id = $(this).attr("id");
			        
			        if (id == "populationAgeTo" || id == "populationAgeTo2" || id == "populationAgeTo3") {
			        	if (parseInt($(this).val()) <= parseInt(spaceFrom)) {
				            $(this).val(parseInt(spaceFrom)+5);
				        }
			        	
			        	//2016.10.19 lbdms
			        	if (parseInt($(this).val()) > 100) {
			        		$(domTo).hide();
			        		if (id == "populationAgeTo") {
			        			$("#ageToText").hide();
			        		}else if (id == "populationAgeTo2") {
			        			$("#ageToText2").hide();
			        		}else {
			        			$("#ageToText3").hide();
			        		}
			        	}else {
			        		$(domTo).show();
			        		if (id == "populationAgeTo") {
			        			$("#ageToText").show();
			        		}else if (id == "populationAgeTo2") {
			        			$("#ageToText2").show();
			        		}else {
			        			$("#ageToText3").show();
			        		}
			        	}
			        	$(domSlider).slider("values", 1,  $(this).val());
			        }else if (id == "houseTotAreaTo" || id == "houseTotAreaTo2" || id == "houseTotAreaTo3") {
			        	if (parseInt($(this).val()) <= parseInt(spaceFrom)) {
			        		var idx = $(domFrom).prop("selectedIndex");
				    		idx = idx+1;
				    		var fromData = $(domFrom+ " option:eq("+idx+")").val();
				        	$(this).val(fromData);
			        	}
			        	var idx = 0;
			    		for (var i=0; i<tmpHouseSpaceList.length; i++) {
			    			if (tmpHouseSpaceList[i] == $(this).val()) {
			    				idx = i;
			    				break;
			    			}
			    		}
			    		$(domSlider).slider("values", 1, idx);
			        	$("."+to).text("약 "+($(this).val()/3.3).toFixed(1)+"평");
			        }
			    });
			    
			    //2016.09.09 9월 서비스 
			    $(domTo).click(function(){
			    	 var fromData = $(domFrom).val();
			    	 $(domTo+ " option").each(function() {
				        $(this).show();
				        if (parseInt(fromData) >= parseInt($(this).val())) {
				        	$(this).hide();
				        }
				      });
			    });
			    $(domSlider).slider({
			        range: true,
			        min: min,
			        max: limit,
			        
			        //9월서비스 20160729 권차욱 수정
			        step : step,
			        
			        values : values,
			        slide : function(e, ui) {
			        	if (from == "populationAgeFrom" || from == "populationAgeFrom2" || from == "populationAgeFrom3" ) {
			        		//2016.10.19 lbdms
			        		if (ui.values[1] == limit) {
			        			$(domTo).hide();
			        			if (from == "populationAgeFrom") {
			        				$("#ageToText").hide();
			        			}else if (from == "populationAgeFrom2") {
			        				$("#ageToText2").hide();
			        			}else {
			        				$("#ageToText3").hide();
			        			}					    	
			        		}else {
			        			$(domTo).show();
			        			if (from == "populationAgeFrom") {
			        				$("#ageToText").show();
			        			}else if (from == "populationAgeFrom2") {
			        				$("#ageToText2").show();
			        			}else {
			        				$("#ageToText3").show();
			        			}					    	
			        		}
			        		
			        		$(domFrom).val(ui.values[0]);
						    $(domTo).val(ui.values[1]);	
						    
			        	}else if (from == "houseTotAreaFrom" || from == "houseTotAreaFrom2" || from == "houseTotAreaFrom3") {
				        	if (ui.values[1] == limit) {
				        		$(domTo).hide();
				        		if (from == "houseTotAreaFrom") {
				        			$("#houseTotAreaToText").hide();
								    $(".houseTotAreaToText").hide();
								    $(".houseTotAreaTo").hide();
				        		}else if (from == "houseTotAreaFrom2") {
				        			$("#houseTotAreaToText2").hide();
								    $(".houseTotAreaToText2").hide();
								    $(".houseTotAreaTo2").hide();
				        		}else {
				        			$("#houseTotAreaToText3").hide();
								    $(".houseTotAreaToText3").hide();
								    $(".houseTotAreaTo3").hide();
				        		}
				        	}else {
				        		$(domTo).show();
				        		if (from == "houseTotAreaFrom") {
				        			$("#houseTotAreaToText").show();
								    $(".houseTotAreaToText").show();
								    $(".houseTotAreaTo").show();
				        		}else if (from == "houseTotAreaFrom2") {
				        			$("#houseTotAreaToText2").show();
								    $(".houseTotAreaToText2").show();
								    $(".houseTotAreaTo2").show();
				        		}else {
				        			$("#houseTotAreaToText3").show();
								    $(".houseTotAreaToText3").show();
								    $(".houseTotAreaTo3").show();
				        		}
				        	}
				        		
				        	$(domFrom).val(tmpHouseSpaceList[ui.values[0]]);
							$(domTo).val(tmpHouseSpaceList[ui.values[1]]);	
							$("."+from).text("약 "+(tmpHouseSpaceList[ui.values[0]]/3.3).toFixed(1)+"평");
					        $("."+to).text("약 "+(tmpHouseSpaceList[ui.values[1]]/3.3).toFixed(1)+"평");
				        }
			        },
			        //9월서비스 20160729 권차욱 수정
			        start : function(e, ui) {
			        	if (from == "populationAgeFrom" 		|| 
				        	from == "populationAgeFrom2" || 
				        	from == "populationAgeFrom3"         		|| 
				        	from == "houseTotAreaFrom"  		||
				        	from == "houseTotAreaFrom2"  		||
				        	from == "houseTotAreaFrom3") {
			        		tmpValues = ui.values;
			        	}
			        },
			        stop : function(e, ui) {
			        	if (from == "populationAgeFrom" || from == "populationAgeFrom2" || from == "populationAgeFrom3") {
			        		if (ui.values[0] == ui.values[1]) {
			        			if (tmpValues[0] != ui.values[0]) {
			        				$(domSlider).slider("values", 0, ui.values[1]-5);
			        				$(domFrom).val(ui.values[1]-5);
								    $(domTo).val(ui.values[1]);	
			        			}else {
			        				$(domSlider).slider("values", 1, ui.values[0]+5);
			        				$(domTo).val(ui.values[0]+5);
								    $(domFrom).val(ui.values[0]);	
			        			}
				        	}
			        	}else if (from == "houseTotAreaFrom" || from == "houseTotAreaFrom2" || from == "houseTotAreaFrom3") {
			        		if (ui.values[0] == ui.values[1]) {
			        			if (tmpValues[0] != ui.values[0]) {
			        				$(domSlider).slider("values", 0, ui.values[1]-1);
			        				$(domFrom).val(tmpHouseSpaceList[ui.values[1]-1]);
								    $(domTo).val(tmpHouseSpaceList[ui.values[1]]);	
			        			}else {
			        				$(domSlider).slider("values", 1, ui.values[0]+1);
			        				$(domTo).val(tmpHouseSpaceList[ui.values[0]+1]);
								    $(domFrom).val(tmpHouseSpaceList[ui.values[0]]);	
			        			}
				        	}
			        	}
			        }
			    });
 			},
 			
			setSataRangeUIEvent : function(){
				
				//초기 세팅 start
				setTimeout(function(){$("#gridDataType01").trigger("click")}, 200);
				/*
				$(".search_result.chk.chk_01 .btn_toggle.off").css('display', 'none');
				$(".search_result.chk.chk_01 .btn_toggle.on").css('display', 'block');
				$(".search_result.chk.chk_01 .btn_toggle.on").addClass('active');
				$(".more.more_bt01").addClass('active');
				$(".search_result.chk.chk_01").addClass('active');
				$(".search_result.chk.chk_01").children(".chk_result").css('display', 'block');
				*/
				//초기 세팅 end
				
				$("#statsType01 > ul").children("li").each(function(index, item){
					var selectId = $(this).attr("id");
					$("#statsType01 > ul > li").addClass("active");
				});
				// 도형색상과 일치
				$catchmentAreaLeftMenu.ui.setStatsRangeDisplay("1");
				
				$("#statsType02 > ul").children("li").each(function(index, itesm){
					if(index == 0){
						$("#statsType02 > ul > li").eq(index).addClass("active");
					}
				});
				// 도형색상과 일치
				$catchmentAreaLeftMenu.ui.setStatsRangeDisplay("2");
				
				$("#statsType03 > ul").children("li").each(function(index, item){
					if(index == 0){
						$("#statsType03 > ul > li").eq(index).addClass("active");
					}
				});
				// 도형색상과 일치
				$catchmentAreaLeftMenu.ui.setStatsRangeDisplay("3");
			},
			
			resizePopup : function(){
				// TO-DO : 호출시점 체크
				
				var $winH = $(window).height() - 150;
				$chk = $('.chk');
			 	$scr_1 = $('.scroll_01');
			 	$scr_2 = $('.scroll_02');
				$scr_3 = $('.scroll_03');
				$scr_4 = $('.scroll_04');
				$scr_5 = $('.scroll_05');
				$scr_6 = $('.scroll_06');
				$scr_7 = $('.scroll_07');
				$scr_8 = $('.scroll_08');
				$scr_9 = $('.scroll_09');
				$scr_10 = $('.scroll_10');
				$scr_11 = $('.scroll_11');
				$scr_12 = $('.scroll_12'); //SGIS4_1025_생활권역 추가
				$scr_13 = $('.scroll_13'); //SGIS4_1025_생활권역 추가
				$scrH_1 = $('.scroll_01').height();
				$scrH_2 = $('.scroll_02').height();
				$scrH_3 = $('.scroll_03').height();
				$scrH_4 = $('.scroll_04').height();
				$scrH_5 = $('.scroll_05').height();
				$scrH_6 = $('.scroll_06').height();
				$scrH_7 = $('.scroll_07').height();
				$scrH_8 = $('.scroll_08').height();
				$scrH_9 = $('.scroll_09').height();
				$scrH_10 = $('.scroll_10').height();
				$scrH_11 = $('.scroll_11').height();
				$scrH_12 = $('.scroll_12').height(); //SGIS4_1025_생활권역 추가
				$chkH_1 = $('.chk_01').height();
				$chkH_2 = $('.chk_02').height();
				$chkH_3 = $('.chk_03').height();
				//SGIS4_1025_생활권역 시작
				//$chkH = $chkH_1+$chkH_2+$chkH_3;
				$chkH = $chkH_1+$chkH_2;
				//SGIS4_1025_생활권역 끝
				
				if($chk.hasClass('active') && $winH+1000 > $scrH_2){
					// 상세분석 포함 시: $scr_2.css({height:$chkH+110 + 'px', maxHeight:$winH-154+'px'});
					//SGIS4_1025_생활권역 시작
					if($('.search_wrap.statistics .stats_footer').is(':visible')){
						$scr_2.css({height:$chkH+74 + 'px', maxHeight:$winH-200+'px'});
					}else{
						$scr_2.css({height:$chkH+74 + 'px', maxHeight:$winH-154+'px'});
					}
					//SGIS4_1025_생활권역 끝
				}else if(!$chk.hasClass('active')){
					// 상세분석 포함 시: $scr_2.css({height:450+'px', maxHeight:$winH-154+'px'});
					$scr_2.css({height:300+'px', maxHeight:$winH-154+'px'});
				}
				$scr_1.css({height:$winH-340 + 'px', maxHeight:463+'px'});		// maxHeight:($scrH_1 > ($winH-340) ? ($scrH_1+5) : ($winH-340 + 5))+'px'
				$scr_3.css({height:$winH-80 + 'px', maxHeight:830+'px'});
				$scr_9.css({height:$winH-80 + 'px', maxHeight:1300+'px'});
				$scr_4.css({height:$winH-100 + 'px', maxHeight:703+'px'});
				$scr_5.css({height:$winH-140 + 'px', maxHeight:163+'px'});
				$scr_6.css({height:$winH-190 + 'px', maxHeight:650+'px'});
				$scr_7.css({height:170 + 'px'});
				$scr_8.css({height:$winH-340 + 'px', maxHeight:490+'px'});		// $scr_8.css({height:330 + 'px'});
				$scr_10.css({height:$winH-190 + 'px', maxHeight:650+'px'});
				$scr_11.css({height:$winH-340 + 'px', maxHeight:390+'px'});
				$scr_12.css({height:$winH-180 + 'px', maxHeight:630+'px'}); //SGIS4_1025_생활권역 추가
				$scr_13.css({height:$winH-400 + 'px', maxHeight:270+'px'}); //SGIS4_1025_생활권역 추가
			}
			
	};
	
	/*********** 시도 검색 Start **********/
	(function () {
		$class("sop.portal.catchmentAreaSidoAddress.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				if (result.sidoList != undefined) {
					$.each(result.sidoList, function(index, item){
						$('#sido').append("<option value="+item.sido_cd+">"+item.sido_nm+"</option>");
					});
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 시도 검색 End **********/
	/*********** 시군구 검색 Start **********/
	(function () {
		$class("sop.portal.catchmentAreaSggAddress.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				var sggDomId = options.isDetail ? "sgg_spatial" : "sigungu";
				if (result.sggList != undefined) {
					var selSggCd;
					var sggSelVal;
					if($catchmentAreaLeftMenu.ui.officesMapping != undefined && $catchmentAreaLeftMenu.ui.officesMapping != null){
						var selSidoCd = options.target.selectSidoCd;
						if(selSidoCd != undefined && selSidoCd != null){
							selSggCd = $catchmentAreaLeftMenu.ui.officesMapping[selSidoCd];
						}
					}					
					
					$.each(result.sggList, function(index, item){
						$('#'+sggDomId).append("<option value="+item.sgg_cd+"/"+item.x_coor+"/"+item.y_coor+">"+item.sgg_nm+"</option>");
						
						if(selSggCd != undefined && selSggCd != null){
							if(item.sgg_cd == selSggCd){
								sggSelVal = item.sgg_cd+"/"+item.x_coor+"/"+item.y_coor;
							}							
						}
					});					
					
					if(sggSelVal != undefined && sggSelVal != null){
						$('#'+sggDomId).val(sggSelVal).prop("selected", true);
						
						$('#'+sggDomId).trigger("change");						
					}	
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 시군구 검색 End **********/
	/*********** 읍면동 검색 Start **********/
	(function () {
		$class("sop.portal.catchmentAreaEmdAddress.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				var emdDomId = options.isDetail ? "emd_spatial" : "emdong";
				if (result.admList != undefined) {
					$.each(result.admList, function(index, item){
						$('#'+emdDomId).append("<option value="+item.emdong_cd+"/"+item.x_coor+"/"+item.y_coor+">"+item.emdong_nm+"</option>");
					});
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 읍면동 검색 End **********/
	/*********** 시도/시군구/읍면동 일괄 검색 Start **********/
	(function () {
		$class("sop.portal.catchmentAreaEmdAllAddress.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result =  res.result;
				var sido_cd, sido_nm,sgg_cd, sgg_nm, emdong_cd,emdong_nm, coordinate= "";
				var mapId = options.mapId;		// 변수(mapId) 추가 - 지도가 분할 되었을 때 구분하기 위한 변수. (박성언, 2020-10-13 작성)
				var $sggDom = mapId == 0 ? $('#sigungu') : $('#sgg_spatial');	//  (박성언, 2020-10-14 작성)
				var $emdDom = mapId == 0 ? $('#emdong') : $('#emd_spatial');	//  (박성언, 2020-10-14 작성)
				var selectX, selectY //210416 지자체연계서비스 추가
				
				if (res.errCd == "0") {
					var isFst = $catchmentAreaLeftMenu.ui.isFirstLoad;
					var isFst2 = $catchmentAreaLeftMenu.ui.isFirstLoad2;	// (박성언, 2020-10-13 작성)
					/*if(isFst2 && (mapId === 1)) {
						$('#sgg_spatial').empty();
						$('#emd_spatial').empty();
					}*/
					
					for ( var i = 0; i < result.sidoList.length; i++) {
						var elem = result.sidoList[i];
						if (elem.sido_cd == result.sido_cd) {
							sido_cd = elem.sido_cd;
							sido_nm = elem.sido_nm;
						}
					}
					if (result.sggList != undefined) {
						//지도 변경 시 위치관련 콤보를 동기화하지 않는다.
						if( (isFst && (mapId === 0)) || ( isFst2 && (mapId === 1) ) ){		// (박성언, 2020-10-14 작성)
							$sggDom.empty();
							$sggDom.append("<option value='0'>시군구 선택</option>");
						}
						for( var j = 0; j < result.sggList.length; j++){
							var elem = result.sggList[j];
							//지도 변경 시 위치관련 콤보를 동기화하지 않는다.
							if( (isFst && (mapId === 0)) || ( isFst2 && (mapId === 1) ) ){
								$sggDom.append("<option value="+elem.sgg_cd+"/"+elem.x_coor+"/"+elem.y_coor+">"+elem.sgg_nm+"</option>");
							}
							
							if (elem.sgg_cd == result.sgg_cd) {
								sgg_cd = elem.sgg_cd+"/"+elem.x_coor+"/"+elem.y_coor;
								sgg_nm = elem.sgg_nm;
								selectX = elem.x_coor;//210416 지자체연계서비스 추가
								selectY = elem.y_coor;//210416 지자체연계서비스 추가
							}
						}
					}
					
					if (result.admList != undefined) {
						//지도 변경 시 위치관련 콤보를 동기화하지 않는다.
						if( (isFst && (mapId === 0)) || (isFst2 && (mapId === 1) ) ){		// (박성언, 2020-10-14 작성, 추가 수정 2020-10-20)
							$emdDom.empty();
							$emdDom.append("<option value='0'>읍면동 선택</option>");
						}
						for( var z = 0; z < result.admList.length; z++){
							var elem = result.admList[z];
							//지도 변경 시 위치관련 콤보를 동기화하지 않는다.
							if( (isFst && (mapId === 0)) || ( isFst2 && (mapId === 1) ) ){		// (박성언, 2020-10-14 작성)
								$emdDom.append("<option value="+elem.emdong_cd+"/"+elem.x_coor+"/"+elem.y_coor+">"+elem.emdong_nm+"</option>");
							}
							
							if (elem.emdong_cd == result.dong_cd) {
								emdong_cd = elem.emdong_cd+"/"+elem.x_coor+"/"+elem.y_coor;
								emdong_nm = elem.emdong_nm;
								coordinate = elem.x_coor+"/"+elem.y_coor;
								selectX = elem.x_coor;//210416 지자체연계서비스 추가
								selectY = elem.y_coor;//210416 지자체연계서비스 추가
							}
							
						}
					}
					//지도 변경 시 위치관련 콤보를 동기화하지 않는다.
					
					if(isFst && (mapId === 0)){
						$catchmentAreaLeftMenu.ui.setLocationSelectBox(sido_cd, sgg_cd, emdong_cd);
						$catchmentAreaLeftMenu.ui.isFirstLoad = false;
					}
					
					$catchmentAreaLeftMenu.ui.isFirstLoad = false;
					
					if(isFst2 && (mapId === 1)) {	// 지도2가 처음 로딩되는 거면서 현재 이 API를 호출한 지도가 두 번째 지도이면...
						$catchmentAreaLeftMenu.ui.setLocationSelectBox2(sido_cd, sgg_cd, emdong_cd, true);
						$catchmentAreaLeftMenu.ui.isFirstLoad2 = false;
					}
					
					var locObj = {};
					locObj.sido_cd = result.sido_cd;
					locObj.sido_nm = sido_nm;
					locObj.sgg_cd = result.sgg_cd;
					locObj.sgg_nm = sgg_nm;
					locObj.emdong_cd = result.dong_cd;
					locObj.emdong_nm = emdong_nm;

					$catchmentAreaLeftMenu.ui.setLocation(locObj, mapId === 1 ? true : false);
					
					//210416 지자체연계서비스 추가 시작
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, selectX, selectY);
					}
					//210416 지자체연계서비스 추가 끝
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 시도/시군구/읍면동 일괄 검색 End **********/
	/*********** 중심시설유형 검색 Start **********/
	(function () {
		$class("sop.portal.facilityTypeSearchList.api").extend(gis.service.absAPI).define({
			onSuccess : function (status, res, options) {
				var result =  res.result;
				var params = options.params;
				var html = "";
				//var sufidList = [];
				if(result != undefined && result != ""){
					
					var markerIcon = sop.icon({
						iconUrl: '/images/catchmentArea/list_poi.png',
						shadowUrl: '/img/marker/theme_shadow.png',
						iconAnchor: [16, 32 ],
						iconSize: [ 32, 32 ],
						infoWindowAnchor: [1, -34]
					});					
					
					var map;
					if(params.workPos == 'B'){

						map = $catchmentAreaMain.ui.getMap(1);
						map.markers3.clearLayers();
						$catchmentAreaLeftMenu.ui.map2PoiMarkerMap = {};	//SGIS4_1029_생활권역
						
						html = '<ul class="res_li_sp">';
						$.each(result, function(index, item){
							//sufidList.push(item.sufid);
							html += '<li id="sufid_'+item.sufid+'" value="'+item.ksic_5_cd+'" data-map-x="'+item.x_coordinate+'" data-map-y="'+item.y_coordinate+'">'; //SGIS4_1124_시설유형 관련 수정
							html += 	'<span class="sa_txt01"><a class="mightOverflow" href="#">'+item.corp_nm+'</a></span>';
							html += 	'<span class="txt02">'+$("#ftsdText_sp").text()+'</span>';
							html += 	'<div class="txt03">'+item.naddr+'</div>';
							html += '</li>';
							
							if(item.x_coordinate !== undefined && item.y_coordinate !== undefined){
								var that = item;
								var marker = sop.marker([ item.x_coordinate, item.y_coordinate ], {
									icon: markerIcon
								});								
								map.markers3.addLayer(marker);
								
								$catchmentAreaLeftMenu.ui.map2PoiMarkerMap['sufid_' + that.sufid] = marker;
								marker.on({
									click : function (e) {
										var thatMap = $catchmentAreaMain.ui.getMap(1);
										thatMap.markers.clearLayers(); //마커 초기화										

										var selItm = $catchmentAreaLeftMenu.ui.map2PoiMarkerMap['selMarker'];
										if(selItm !== undefined && selItm !== null && !thatMap.markers3.hasLayer(selItm)){
											thatMap.markers3.addLayer(selItm);
										}
										$catchmentAreaLeftMenu.ui.map2PoiMarkerMap['selMarker'] = e.target;
										thatMap.markers3.removeLayer(e.target);
										$('#totalSearchResult_sp li[id="sufid_' + that.sufid + '"]').trigger('click');
										
										var selItemTop = $('#totalSearchResult_sp li[id="sufid_' + that.sufid + '"]').position().top;										
										$('#totalSearchResult_sp li[id="sufid_' + that.sufid + '"]').closest("div.scroll_10").mCustomScrollbar("scrollTo", selItemTop);
									}									
								});								
							}
						});
						html += '</ul>';
						
						$("#totalSearchResult_sp").html(html);
						$("#ftsdText_sp").text($("#ftsdText_sp").text() + " (" + result.length + ")");
					}else{
						
						map = $catchmentAreaMain.ui.getMap(0);
						map.markers3.clearLayers();
						$catchmentAreaLeftMenu.ui.map1PoiMarkerMap = {};
						
						html = '<ul class="res_li">';
						$.each(result, function(index, item){
							//sufidList.push(item.sufid);
							html += '<li id="sufid_'+item.sufid+'" value="'+item.ksic_5_cd+'" data-map-x="'+item.x_coordinate+'" data-map-y="'+item.y_coordinate+'">';//SGIS4_1124_시설유형 관련 수정
							html += 	'<span class="sa_txt01"><a class="mightOverflow" href="#">'+item.corp_nm+'</a></span>';
							html += 	'<span class="txt02">'+$("#ftsdText").text()+'</span>';
							html += 	'<div class="txt03">'+item.naddr+'</div>';
							html += '</li>';
							
							if(item.x_coordinate !== undefined && item.y_coordinate !== undefined){
								var that = item;
								var marker = sop.marker([ item.x_coordinate, item.y_coordinate ], {
									icon: markerIcon
								});								
								map.markers3.addLayer(marker);
								
								$catchmentAreaLeftMenu.ui.map1PoiMarkerMap['sufid_' + that.sufid] = marker;								
								marker.on({
									click : function (e) {
										var thatMap = $catchmentAreaMain.ui.getMap(0);
										thatMap.markers.clearLayers(); //마커 초기화
										
										var selItm = $catchmentAreaLeftMenu.ui.map1PoiMarkerMap['selMarker'];
										if(selItm !== undefined && selItm !== null && !thatMap.markers3.hasLayer(selItm)){
											thatMap.markers3.addLayer(selItm);
										}
										$catchmentAreaLeftMenu.ui.map1PoiMarkerMap['selMarker'] = e.target;
										thatMap.markers3.removeLayer(e.target);
										$('#totalSearchResult li[id="sufid_' + that.sufid + '"]').trigger('click');
										
										var selItemTop = $('#totalSearchResult li[id="sufid_' + that.sufid + '"]').position().top;										
										$('#totalSearchResult li[id="sufid_' + that.sufid + '"]').closest("div.scroll_06").mCustomScrollbar("scrollTo", selItemTop);
										
									}									
								});
							}								
						});
						html += '</ul>';
						
						$("#totalSearchResult").html(html);
						$("#ftsdText").text($("#ftsdText").text() + " (" + result.length + ")");
					}
//					if(params.workPos == 'B'){
//						$catchmentAreaLeftMenu.ui.setSearchListPoi(sufidList, 1);
//					}else{
//						$catchmentAreaLeftMenu.ui.setSearchListPoi(sufidList, 0);
//					}
					
				}else{
					var msg = "현재 시군구에는 해당 시설 유형이 존재하지 않습니다.";
					if(params.mode == 'screen'){
						msg = "현재 보이는 화면 내에서는 해당 시설 유형이 존재하지 않습니다."
					}
					
					if(params.workPos == 'B'){
						html ='<ul class="res_li_sp"><li><span class="sa_txt01">' + msg+ '</span></li></ul>';		
						$("#totalSearchResult_sp").html(html);	// 오타 수정 ##totalSearchResult_sp ==> #totalSearchResult_sp				
					}else{
						html ='<ul class="res_li"><li><span class="sa_txt01">' + msg+ '</span></li></ul>';		
						$("#totalSearchResult").html(html);						
					}
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 중심시설유형 검색 End **********/
	/*********** 중심시설유형 검색 - 좌표 검색 Start **********/
	(function () {
		$class("sop.portal.getSufidCoordinate.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result =  res.result;
				var x_coordinate = result[0].x_coordinate;
				var y_coordinate = result[0].y_coordinate;

				if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
					options.callback.call(undefined, x_coordinate, y_coordinate);
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 중심시설유형 검색 - 좌표 검색 End **********/
	/*********** 시설유형에 따른 생활권역 범위 검색 Start **********/
	(function () {
		$class("sop.portal.getSrvareaScopeList.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result =  res.result;
				var html_type_1 = "";
				var html_type_2 = "";
				var html_type_3 = "";
				var t_default = [];
				var d_default = [];
				var r_default = [];
				$.each(result, function(index, item){
					if(item.scope_type == '01'){
						if(item.dflt_slctn_yn == 'Y'){
							t_default.push(item.cd_exp);
						}
						html_type_1 += '<a href="javascript:void(0);" id='+item.scope_cd+' value='+item.cd_exp+'>'+item.s_class_cd_nm+'</a>';
					}else if(item.scope_type == '02'){
						if(item.dflt_slctn_yn == 'Y'){
							d_default.push(item.cd_exp);
						}
						html_type_2 += 	'<a href="javascript:void(0);" id='+item.scope_cd+' value='+item.cd_exp+'>'+item.s_class_cd_nm+'</a>';
					}else{
						if(item.dflt_slctn_yn == 'Y'){
							r_default.push(item.cd_exp);
						}
						html_type_3 += 	'<a href="javascript:void(0);" id='+item.scope_cd+' value='+item.cd_exp+'>'+item.s_class_cd_nm+'</a>';
					}
				});
				$("#type_t").html(html_type_1);
				$("#type_d").html(html_type_2);
				$("#type_r").html(html_type_3);

				if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
					options.callback.call(undefined, t_default, d_default, r_default);
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 시설유형에 따른 생활권역 범위 검색 End **********/
	/*********** 검색에 따른 생활권역 범위 검색 Start **********/
	(function () {
		$class("sop.portal.getSearchScopeList.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result =  res.result;
				var html_type_1 = "";
				var html_type_2 = "";
				var html_type_3 = "";
				$.each(result, function(index, item){
					if(item.scope_type == '01'){
						html_type_1 += '<a href="javascript:void(0);" id='+item.scope_cd+' value='+item.cd_exp+'>'+item.s_class_cd_nm+'</a>';
					}else if(item.scope_type == '02'){
						html_type_2 += '<a href="javascript:void(0);" id='+item.scope_cd+' value='+item.cd_exp+'>'+item.s_class_cd_nm+'</a>';
					}else{
						html_type_3 += '<a href="javascript:void(0);" id='+item.scope_cd+' value='+item.cd_exp+'>'+item.s_class_cd_nm+'</a>';
					}
				});
				$("#type_t").html(html_type_1);
				$("#type_d").html(html_type_2);
				$("#type_r").html(html_type_3);

				if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
					options.callback.call(undefined, [300,600,900,1200], [1000,2000,3000], [1000,2000,3000]);
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 검색에 따른 생활권역 범위 검색 End **********/
	/*********** 포인트검색에 따른 시설물 검색 Start **********/
	(function () {
		$class("sop.portal.sopPortalgetPtFcltsList.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				result = res.result;

				if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
					options.callback.call(undefined, result);
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 포인트검색에 따른 시설물 검색 End **********/
	/*********** 격자통계조건 설정 리스트 Start **********/
	(function () {
		$class("sop.portal.sopPortalgetGridScopeList.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				result = res.result;
				var html_type_1 = ''; //인구 5세
				var html_type_2 = ''; //가구
				var html_type_3 = ''; //주택
				var html_type_4 = ''; //사업체 및 종사자
				var html_type_5 = ''; //공시지가
				var html_type_6 = ''; //인구 10세
				var html_type_7 = ''; //인구 주요구간
				var html_type_8 = ''; //주택 연면적
					
				$.each(result, function(index, item){
					//SGIS4_1210_생활권역 시작
					if(item.b_class_cd == 'SRVA20'){ //인구 5세   
						html_type_1 += '<option value="'+item.cd_exp+'">'+item.s_class_cd_nm+'</option>';
//					}else if(item.b_class_cd == 'SRVA02'){ //가구
//						html_type_2 += '<a href="javascript:void(0);" class="btn01 pm91_1over3 allowM" value="'+item.s_class_cd+'">'+item.s_class_cd_nm+'</a>';
					}else if(item.b_class_cd == 'SRVA03'){ //주택
						if(item.s_class_cd != '10'){		// 주택이외의 거처 제외
							if(item.s_class_cd_nm.length > 5){
								html_type_3 += '<a href="javascript:void(0);" class="btn01 pm92_2T allowM noSel" value="'+item.s_class_cd+'">'+item.s_class_cd_nm+'</a>';
							}else{
								html_type_3 += '<a href="javascript:void(0);" class="btn01 pm92 allowM noSel" value="'+item.s_class_cd+'">'+item.s_class_cd_nm+'</a>';
							}
						}
					}else if(item.b_class_cd == 'SRVA21'){ //인구 10세
						//SGIS4_1210_생활권역 끝
						html_type_6 += '<option value="'+item.cd_exp+'">'+item.s_class_cd_nm+'</option>';						
					}else if(item.b_class_cd == 'SRVA18'){ //인구 주요구간
						html_type_7 += '<option value="'+item.cd_exp+'">'+item.s_class_cd_nm+'</option>';
					}else if(item.b_class_cd == 'SRVA19'){
						html_type_8 += '<option value="'+item.s_class_cd+'">'+item.s_class_cd_nm+'</option>';
					}
				});
				
				$(".select_age5").append(html_type_1);
				$(".select_age10").append(html_type_6);
				$(".select_ageRnd").append(html_type_7);				
				//$(".gridFamilyList").append(html_type_2);				
				$(".gridHouseList").append(html_type_3);
				$(".selct_houseTotArea").append(html_type_8);				
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 격자통계조건 설정 리스트 End **********/
	
	/*--------------------- 상세분석 기능 개발(API 결과 함수 등록) 시작 - 박상언(pse) ---------------------*/
	// 상세 설정 > 공간분석의 위치설정 > 시도 SelectBox 세팅
	(function () {
		$class("sop.portal.catchmentAreaSpatialSidoAddress.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				if (result.sidoList != undefined) {
					$.each(result.sidoList, function(index, item){
						$('#sido_spatial').append("<option value="+item.sido_cd+">"+item.sido_nm+"</option>");
					});
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	
	
	// 상세 설정 > 공간분석의 위치설정 > 시군구 SelectBox 세팅
	(function () {
		$class("sop.portal.catchmentAreaSpatialSggAddress.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				if (result.sggList != undefined) {
					$.each(result.sggList, function(index, item){
						$('#sgg_spatial').append("<option value="+item.sgg_cd+">"+item.sgg_nm+"</option>");
					});
				}
				// 시군구에 대한 option을 모두 append 되면 append 된것중 첫번째 값을 기준으로 읍면동도 같이 조회해서 읍면동 selectBox도 채워준다.
				// 시군구, 읍면동 selectBox의 싱크를 맞춰주기 위해서 이렇게 한다.
				$catchmentAreaLeftMenu.ui.setSpatialEmd($('#sido_spatial').val(),$('#sgg_spatial').val());
			},
			onFail : function (status) {
				
			}
		});
	}());
	
	// 상세 설정 > 공간분석의 위치설정 > 시군구 SelectBox 세팅
	(function () {
		$class("sop.portal.catchmentAreaSpatialEmdAddress.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				if (result.admList != undefined) {
					/*$('#emd_spatial').append("<option value=''>선택하세요</option>")*/
					$.each(result.admList, function(index, item){
						$('#emd_spatial').append("<option value="+item.emdong_cd+"/"+item.x_coor+"/"+item.y_coor+">"+item.emdong_nm+"</option>");
					});
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	
	// 공간분석 > 위치검색 > 중심시설유형 검색
//	(function () {
//		$class("sop.portal.facilityTypeSearchListForSpatial.api").extend(sop.portal.absAPI).define({
//			onSuccess : function (status, res, options) {
//				var result =  res.result;
//				if(result != undefined && result != ""){
//					var html ="";
//					html += '<ul class="res_li_sp">';
//						$.each(result, function(index, item){
//							html += '<li id="sufid_'+item.sufid+'" value="'+item.ksic_5_cd+'">';
//							html += 	'<span class="sa_txt01"><a href="#">'+item.corp_nm+'</a></span>';
//							html += 	'<span class="txt02">'+$("#ftsdText").text()+'</span>';
//							html += 	'<div class="txt03">'+item.naddr+'</div>';
//							html += '</li>';
//						});
//					html += '</ul>';
//					$("#totalSearchResult_sp").html(html);	//차이점2
//				}else{
//					var html ="<a>현재 시군구에는 해당 시설 유형이 존재하지 않습니다.<a>";		
//					$("#totalSearchResult_sp").html(html);	//차이점3
//				}
//			},
//			onFail : function (status) {
//				
//			}
//		});
//	}());
	/*--------------------- 상세분석 기능 개발(API 결과 함수 등록) 끝 - 박상언(pse) ---------------------*/
	/*********** 격자통계 매핑 리스트 Start **********/
	(function () {
		$class("sop.portal.catchmentAreagetPoiMapping.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var ageSelectBoxId = options.selectBoxDomId ? options.selectBoxDomId : 'select_age5';
				if(res.errCd != -100){
					var result = res.result;
					if(result[0].ppltn_stat_dflt_slctn != null && result[0].ppltn_stat_dflt_slctn != "" && result[0].ppltn_stat_dflt_slctn != undefined){
						$('#'+ageSelectBoxId).val(result[0].ppltn_stat_dflt_slctn).prop("selected",true);
						
						if(ageSelectBoxId == 'select_age5'){
							$('#select_age5_pop08').val(result[0].ppltn_stat_dflt_slctn).prop("selected",true);
							//SGIS4_생활권역 시작
							$('#select_age5_area').val(result[0].ppltn_stat_dflt_slctn).prop("selected",true);
							//SGIS4_생활권역 끝
						}
					}
				}else{
					console.log("검색결과가 존재하지 않습니다.");
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 시설유형 검색리스트 Poi 좌표 검색 Start **********/
	(function () {
		$class("sop.portal.getSearchListPoi.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result =  res.result;

				if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
					options.callback.call(undefined, res.result);
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 시설유형 검색리스트 Poi 좌표 검색 End **********/
	//SGIS4_1025_생활권역 시작
	/*********** 나의 데이터 목록 Start **********/
	(function () {
		$class("sop.portal.getMyDataList.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {			
				if(res.errCd == "0"){
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, res.result);
					}
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 나의 데이터 목록 End **********/
	/*********** 나의 데이터 좌표 정보 조회 Start **********/
	(function () {
		$class("sop.portal.myDataCoordinate.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				
				if(res.errCd == "0"){
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, res.result);
					}
				}
				
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 나의 데이터 좌표 정보 조회 End **********/
	//SGIS4_1025_생활권역 끝
	//SGIS4_1027_생활권역 시작	
	/*********** 지역 selectBox 대전 서구 둔산 2동 설정 Start **********/
	(function () {
		$class("sop.portal.catchmentAreafirstAddress.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				
				if(res.errCd == "0"){
					var result =  res.result;
					
					if (result.sidoList != undefined) {
						$.each(result.sidoList, function(index, item){
							if(item.sido_cd == result.sido_cd){
								$('#sido').append("<option value="+item.sido_cd+" selected>"+item.sido_nm+"</option>");
							}else{
								$('#sido').append("<option value="+item.sido_cd+">"+item.sido_nm+"</option>");
							}
						});
					}
					
					if(result.sggList != undefined){
						$.each(result.sggList, function(index, item){
							if(item.sgg_cd == result.sgg_cd){
								$('#sigungu').append("<option value="+item.sgg_cd+"/"+item.x_coor+"/"+item.y_coor+" selected>"+item.sgg_nm+"</option>");
							}else{
								$('#sigungu').append("<option value="+item.sgg_cd+"/"+item.x_coor+"/"+item.y_coor+">"+item.sgg_nm+"</option>");
							}
						});	
					}
					
					if(result.admList != undefined){
						$.each(result.admList, function(index, item){
							if(item.emdong_cd == result.dong_cd){
								$('#emdong').append("<option value="+item.emdong_cd+"/"+item.x_coor+"/"+item.y_coor+" selected>"+item.emdong_nm+"</option>");
							}else{
								$('#emdong').append("<option value="+item.emdong_cd+"/"+item.x_coor+"/"+item.y_coor+">"+item.emdong_nm+"</option>");
							}
						});
					}
					
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, res.result);
					}
				}
				
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 지역 selectBox 대전 서구 둔산 2동 설정 End **********/
	//SGIS4_1027_생활권역 끝
	$(W).resize(function(){
		$catchmentAreaLeftMenu.event.resizePopup();
	});	
}(window, document));