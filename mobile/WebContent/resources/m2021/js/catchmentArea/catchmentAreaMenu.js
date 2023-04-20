/**
 * 생활권역서비스 화면에 대한 클래스
 * 
 * history : 2021/08/25 초기 작성 
 * 
 */
(function (W, D) {
	W.$catchmentAreaMenu = W.$catchmentAreaMenu || {};
	
	
	$(document).ready(
		function(){
			$catchmentAreaMenu.event.setUIEvent();
			$catchmentAreaMenu.ui.initializeUI('');
			$catchmentAreaMenu.ui.reqScopeInfo();
		//	$catchmentAreaMenu.ui.selfSelect();
			$catchmentAreaMenu.ui.settingGridScopeList();//상세보기 조건 설정
			$catchmentAreaMenu.ui.reqSettingInfo("lifeBiz");
		}
		
	);
	
	$(document).on("click", '#searchwordBtn, #searchwordBtn_2', function() {
		//25글자 이내로 검색( jsp에도 maxlength해뒀기에 25자까지 가능)
		var deny_pattern = /[^(가-힣a-zA-Z0-9)]/;
		var schWord = $("#search_text").val().replace(/ /g,'');
		if(deny_pattern.test(schWord) && $('#map_search_btn').hasClass('on')){
    		$('#default-layer').show();
		    $('#modal_body  > p').html("영문,숫자,한글만 입력가능합니다.");
    		$('.dim').show();
    		return;
    	}
		
		if($("#search_text").val().length == 25){
			return ;
		}
		if($("#map_facility_search_btn").hasClass("on") ){
			// 시설 유형 검색시 버튼 선택 하지않으면 (유형을 선택해 주세요) show()
			if($('.option__btn.selected').val() == 25 || $('.option__btn.selected').val() == undefined || $('.option__btn.selected').length == 0 ){
				$("#facility_notice").show();
			}else{
				$("#facility_notice").hide();
				var factypeCd = $('.map__facility__list .option__btn.selected').attr('id');
				$catchmentAreaMenu.ui.requestForPoiSearch('A', 'sgis', factypeCd);
				$("#back_btn").show(); // back 버튼		 
				
			}
		}else if($("#map_search_btn").hasClass("on")){
			$("#search_notice").hide();
			if($("#search_text").val().length != 0){						
				$catchmentAreaMenu.ui.requestForPoiSearch('A', 'ngii', '');
				$("#back_btn").show(); // back 버튼		
			}else{
				$("#search_notice").show();
				return;
			}	
		}
		$('.map__result__sort button').removeClass('on');
		$('#search_accuracy').addClass('on');
		$('#catchmentArea_search_div').hide();
		srvLogWrite('O0', '12', '04', '02', schWord, '');
	});
	 
	// 버튼 이동시 기존에 에러 알려주는 텍스트 삭제
	$(document).on("click", "#map_search_btn", function() {
		$('#searchwordBtn').text('검색');
		$("#facility_notice").hide();		
	});
	
	
	$catchmentAreaMenu.ui = {
			selectIndex : 1,
			poiList0A : [],
			t_default : [],
			d_default : [],
			r_default : [],
			t_default_data : [],
			d_default_data : [],
			r_default_data : [],	
			t_rndm: [],
			d_rndm: [],
			r_rndm: [],
			t_rndm_grid: [],
			d_rndm_grid: [],
			r_rndm_grid: [],
			scope_info: [],
			bg_color : ["bg-red","bg-purple", "bg-green","bg-orange"],
			rndmScopeInfo : [],
			selectRangeArr : [],
			boundarySize_1 : 0, // 격자를 그리기 전에 미리 지도에 그려진 도형의 면적을 저장하는 변수
			map1PoiMarkerMap : {},
			selectPolygonPointsArr : [],
			statDataOption : [],
			rndmFlag : false,
			curSearchWord : null,
			curSearchList : null,
			curSearchList_worker : null,
			curSelectedItem : null,
			schMinDepth : 1,
			reportSelectRange : 0, //보고서 출력시 선택한 범위 갯수
			tempText : "",
			reportPopup : null,
			selMapLocTxt : "",
			mapHeight : "",
			mapWidth : "",
			curPageNo : 1,
			curpageSize : 999,
			girdCnt : 0,
			gridMapRequestor : '',
			geoMap_area : [],
			geoMap_area_grid : null,
			gridTypeUnit: {pops:'인구 수', family: '가구 수 ', house: '주택 수', copr_bus: '사업체 수', copr_worker: '종사자 수', idlv:'공시지가'},
			gridTypeAttrNm: {
				pops: 		 {sum: 'tot_sum_ppltn_cnt', avg: 'tot_avg_ppltn_cnt'},
				family: 	 {sum: 'tot_sum_family_cnt', avg: 'tot_avg_family_cnt'},
				house: 		 {sum: 'tot_sum_resid_cnt', avg: 'tot_avg_resid_cnt'},
				copr_bus: 	 {sum: 'tot_sum_copr_cnt', avg: 'tot_avg_copr_cnt'},
				copr_worker: {sum: 'tot_sum_employee_cnt', avg: 'tot_avg_employee_cnt'},
				idlv: 		 {sum: 'tot_olnlp', avg: 'tot_avg_olnlp'}
			},
			pop01SecSet : {
				area	: "sec01",
				pops	: "sec02",
				family	: "sec03",
				house	: "sec04",
				copr	: "sec05",
				employee	: "sec06"						
			},
			dStatType : "",
			dItemIds : [],
			dItemLbls : [],
			callersInfo : null,
			report_clear : false,
			grid_30km : false,
			people_selected_menu : null,
			people_selected : null,
			family_selected : [],
			house_selected_menu : null,
			house_selected : [],
			copr_selected_menu01 : ['H'],
			copr_selected01 : ['501'],
			copr_selected_menu02 : ['H'],
			copr_selected02 : ['501'],
			worker_selected_menu01 : ['H'],
			worker_selected01 : ['501'],
			worker_selected_menu02 : ['H'],
			worker_selected02 : ['501'],
			search_accuracy_list : [],
			search_accuracy_list_search : [],
			search_distance_list : [],
			search_distance_list_search : [],
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
						area : param.area,
						polygonPoints : param.polygonPoints,
						radius : param.radius,
						statType : param.statType,
						gender : param.gender,
						ageFromCd : param.ageFromCd,
						ageToCd : param.ageToCd,
						householdType : param.householdType,
						rd_resid_type : param.rd_resid_type,
						ksic_3_cd : param.ksic_3_cd,
						isLifeBiz : param.isLifeBiz,
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
			 * @name         : reqSetParams2
			 * @description  : 통계정보 파라미터를 설정한다.
			 * 
			 */
			reqSetParams2 : function (api_id, tmpParam) {
				var params = {
						api_id : api_id,
						area : tmpParam.area,
						srvAreaType : tmpParam.srvAreaType,
						radius : tmpParam.radius,
						workGb : tmpParam.workGb,
						async : tmpParam.async,
						base_year : tmpParam.base_year,
						copr_base_year : tmpParam.copr_base_year,
						rangeType : tmpParam.rangeType,
						rangeVal : tmpParam.rangeVal,						
						index : tmpParam.index,
						indexText : tmpParam.indexText,
						selText : tmpParam.selText,
						classDeg : tmpParam.classDeg,
						grid_level : tmpParam.grid_level,
						grid_level_nm : tmpParam.grid_level_nm,
						statType : tmpParam.statType,
						gender : tmpParam.gender,
						//ageCd : tmpParam.ageCd,
						ageFromCd : tmpParam.ageFromCd,
						ageToCd : tmpParam.ageToCd,
						householdType : tmpParam.householdType,
						rd_resid_type : tmpParam.rd_resid_type,
						ksic_3_cd : tmpParam.ksic_3_cd,
						grdstatType : tmpParam.grdstatType,
						const_year : tmpParam.const_year,
						house_area_cd : tmpParam.house_area_cd,
						schCondNm : tmpParam.schCondNm,
						unit : tmpParam.unit,
						identifier : tmpParam.identifier, 
						// 특성별 통계용
						pops_cond : tmpParam.pops_cond,
						family_cond : tmpParam.family_cond,
						house_cond : tmpParam.house_cond,
						copr_cond : tmpParam.copr_cond,
						employee_cond : tmpParam.employee_cond,
						pops_cond_nm : tmpParam.pops_cond_nm,
						family_cond_nm : tmpParam.family_cond_nm,
						house_cond_nm : tmpParam.house_cond_nm,
						copr_cond_nm : tmpParam.copr_cond_nm,
						employee_cond_nm : tmpParam.employee_cond_nm,
						sufid : tmpParam.sufid,
						rangeCd : tmpParam.rangeCd,						
						// 코드 조회용
						codeInfo : {
							processGb : tmpParam.processGb,			// sel:선택박스 처리
							elemId : tmpParam.elemId,
							bClassCd : tmpParam.bClassCd,
							sClassCd : tmpParam.sClassCd,
							cdExp : tmpParam.cdExp
						},
						stats_class_gb : tmpParam.stats_class_gb // 특성별 통계용_단위별 구분(인구)
				};
				
				return params;				
			},
			/**
			 * 
			 * @name         : reqSetParams_KSIC
			 * @description  : 오픈api 요청 시 전달되는 파라미터를 설정한다.
			 * 
			 */
			reqSetParams_KSIC : function (api_id, param) {

				var params = {
						api_id : api_id,
						async : param.async,
						workGb : param.workGb,			// T:트리용, S:검색용, D:상세 
						depth : param.depth,
						classDeg : param.classDeg,
						classCd : param.classCd,
						schWord : param.schWord,
						schClassCd : param.schClassCd,
						schMinDepth : param.schMinDepth,
						pageNo : param.pageNo,
						pageSize : param.pageSize,
						mainKsicCd : param.mainKsicCd,		// 상세 조회용 산업대분류 코드
						treeRecallYn : param.treeRecallYn,	// 상세 조회용
						ksicCd : param.ksicCd			// 상세 조회용 산업분류 코드
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
				var api_id_ksic = typeof options === 'string' ? options : options.api_id;

				//if 	    (api_id == "API_202006") $catchmentAreaMainApi.request.getSrvAreaGridStatDataList(options); //영향권 통계정보 조회
				if (api_id == "API_202007") $catchmentAreaMainApi.request.getGridSrvAreaGridStatDataList(options);//격자  통계정보 조회
				else if (api_id == "API_202010") $catchmentAreaMainApi.request.getGridSrvAreaDataBoardList(options);//데이터보드 : 격자 통계정보 조회
				else if (api_id == "API_202092") $catchmentAreaMainApi.request.getServiceAreaStatistics(options);	//영향권 통계정보 조회
				else if (api_id == "API_202097") $catchmentAreaMainApi.request.getGridStatDataList(options);//격자통계 통합(bsca) 조회				
				else if (api_id == "API_202013") $catchmentAreaMainApi.request.reportSrvAreaStats(options);
				else if (api_id == "API_202014") $catchmentAreaMainApi.request.reportGridAreaStats(options);
				else if (api_id == "API_202082") $catchmentAreaMainApi.request.getSettingInfo(options);		//생활권역 설정정보 조회
				else if (api_id == "API_202090") $catchmentAreaMainApi.request.getScopeInfo(options);		//생활권역 임의값 범위정보 조회.
				else if (api_id_ksic == "API_202081") $catchmentAreaMainApi.request.getKSICinfo(options);
				else alert("requestOpenApi 설정해라");
				
				$catchmentAreaMainApi.request.pageCallReg();		// 페이지 호출통계
			},
			
			/**
			 * 
			 * @name         : initializeUI
			 * @description  : 초기정보를 설정한다.
			 * 
			 */
			initializeUI : function(flag) {
				
				$catchmentAreaMenu.ui.setBaseYearBox('1', 'A');
				$catchmentAreaMenu.ui.setBaseYearBox('2', 'B');
				$catchmentAreaMenu.ui.setBaseYearBox('3', 'A');
				
				$catchmentAreaMenu.ui.setBaseYearBox('4','A');
				$catchmentAreaMenu.ui.setBaseYearBox('5','B');
				$catchmentAreaMenu.ui.setBaseYearBox('6','A');
			},
			
			/**
			 * 
			 * @name         : getTypeUnit
			 * @description  : 데이터보드 조회 데이터에서 type과 coprTypr에 따른 
			 * @param {string} type 타입명
			 * @param {string} 사업체 및 종사자 구별 타입명
			 * 
			 */
			getTypeUnit : function (type,coprType) {
			    var result = "";
			    if(type == 'copr'){//사업체
			        if(coprType == "copr"){
			            result = this.gridTypeUnit['copr_bus'];
			        }else if(coprType == 'employee'){
			            result = this.gridTypeUnit['copr_worker'];
			        }
			    }else{// 사업체 외
					result = this.gridTypeUnit[type];
			    }
			    
			    return result;
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
				
				param.mode = schMode;
				var locCd, locNm; 
				
				locCd = $("#currentMapMyLocation_name").attr("value");
//				locNm = $("#currentMapMyLocation_name").text();
				
				//2022-10-17 위치 txt 수정
				locNmTxt = $("#currentMapMyLocation_name").html();
				var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>'; // 2022.09.26 송은미 svg 추가
				const message = locNmTxt;
				const arr = message.split(svg);
				
				locNm = arr[0]+" "+arr[1]+" "+arr[2];
		
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
					var locNms = locNm.split(" ");
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
					alert("알림1", "시군구를 선택해 주십시오.");
					return false;						
				}else{
					if(param.sggCd.length > 3){
						param.sggCd = param.sggCd.substr(0, 3);
					}
				}

				if(param.emdCd != undefined && param.emdCd != null){
					if(param.emdCd.length > 2){
						param.emdCd = param.emdCd.substr(0, 2);
					}						
				}
				var remainCnt = 0;
				var identifier = new Date().getTime();
				param.identifier = identifier;
				
				if(pRequestTo == 'ngii'){			
					$catchmentAreaMask.startProcess(identifier,remainCnt);
					$catchmentAreaMenu.ui.searchFullPlaceListApi(pWorkPos, '', 1, param);	
				}else if(pRequestTo == 'sgis'){ 					
					param.workPos = pWorkPos;
					param.factypeCd = pFactypeCd;
					param.async = false;
					$catchmentAreaMenu.ui.setfacilityTypeSearchDatailList(param);
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
				sopPortalfacilityTypeSearchListObj.addParam("classDeg", $catchmentAreaMap.ui.classDeg);
				sopPortalfacilityTypeSearchListObj.addParam("copr_base_year", $catchmentAreaMap.ui.statsBaseYear02[0]);
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
					url : "/ServiceAPI/OpenAPI3/catchmentArea/facilityTypeSearchList.json",
					options : {
						params : params,
						url : "/ServiceAPI/OpenAPI3/catchmentArea/facilityTypeSearchList.json"
					}
				});				
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
						$catchmentAreaMenu.ui.poiList0B.length = 0;
						schWord = $("#search_text").val();
					}
					poiList = $catchmentAreaMenu.ui.poiList0B;
				}else{
					if(curPage == 1){
						$catchmentAreaMenu.ui.poiList0A.length = 0;						
						schWord = $("#search_text").val();
					}
					poiList = $catchmentAreaMenu.ui.poiList0A;
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
											poiInfos.push(jibunAdres);
											poiInfos.push(i);
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
			            		//$catchmentAreaMask.startProcess(identifier, totCount);
			            	}
			            	
			            	if(Number(totCount) > (pageRowCnt * curPage)){
			            		$catchmentAreaMenu.ui.searchFullPlaceListApi(pWorkPos, header.find("keyword").text(), (curPage + 1), pParam, identifier);
			            	}else{
			            		$catchmentAreaMenu.ui.makePoiList(pWorkPos, 1);
			            		$catchmentAreaMask.endUnitWork(param);
			            	}
			            	
			            }else{
			            	var responseMessage = header.find("responseMessage").text();
			            	console.log("responseCode:" + responseCode + ", responseMessage:" + responseMessage);
			            	$catchmentAreaMenu.ui.makePoiList(pWorkPos, 1);
			            }
			        },
			        error : function(xhr, ajaxSettings, thrownError){
			        	console.log("error");
			        }
			    });
			},
			settingGridScopeList : function(){
				var sopPortalgetGridScopeListObj = new sop.portal.sopPortalgetGridScopeList.api();
				sopPortalgetGridScopeListObj.request({
					method : "POST",
					async : true,
					url : "/ServiceAPI/OpenAPI3/catchmentArea/getGridScopeList.json",
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
					poiList = $catchmentAreaMenu.ui.poiList0B;
					
					$rstListDiv = $("#spatialSearchWordDiv");
					$pagingDiv = $("#spatialSearchWordDiv1Page");
					
					pagingId = 'pagingDivB';
					mapId = 1;
				}else{
					poiList = $catchmentAreaMenu.ui.poiList0A;
					
					$rstListDiv = $("#rstSearchDataDiv");
					$pagingDiv = $("#rstSearchDataDiv1Page");
					
					pagingId = 'pagingDivA';
					mapId = 0;
				}

				$("#menu_1").css("display", "none");
				$("#menu_1").removeClass("active");
				$("#menu_3").css("display", "none");
				$("#menu_3").removeClass("active");
				$("#menu_2").css("display", "block");
				$("#menu_2").addClass("active");

				
				$rstListDiv.html("");
				$pagingDiv.html("");
				$rstListDiv.show();
				$pagingDiv.show();				
				
				var htmlStr = "";
				var htmlPage = "";
				if(poiList.length == 0){
					
					$('.map__slideup p').text('검색 결과');
					$('.map__slideup h3').text($("#search_text").val() + ' : 0 건');
					htmlStr += '                              <li>';
        			htmlStr += '                                 <div>';
        			htmlStr += '                                    <h4>현재  지도 위치의 시·군·구에서는 <br>검색 결과가 없습니다.</h4>';
        			htmlStr += '                                 </div>';
        			htmlStr += '                              </li>';
        			$('#menu_2 > p').hide();
				}else{					
					var totCount = poiList.length;
					$('.map__slideup p').text('검색 결과');	
					$('.map__slideup h3').text($("#search_text").val() + ' : ' + totCount +'건');
					$catchmentAreaMenu.ui.search_accuracy_list_search = [];
					
					$.each(poiList, function(index, item){
						$catchmentAreaMenu.ui.search_accuracy_list_search.push([item[0],item[1],item[2],item[3],item[4],item[5]]);
            			var name = item[0];
            			var roadAdres = item[1];
            			var x_coor = item[2];
            			var y_coor = item[3];
            			var jibunAdres = item[4];
            			
						htmlStr += '                     <li id = "sufid_' + index + '" name = "'+ name +'" jibunAdres = "'+ jibunAdres +'" roadAdres = "'+ roadAdres +'" x_coor = "'+ x_coor +'" y_coor = "'+ y_coor +'" >';
            			htmlStr += '                                 <div>';
            			htmlStr += '                                    <h4>'+name+'</h4>';
            			htmlStr += '                                    <p>'+roadAdres+'</p>';
            			htmlStr += '                                 </div>';
            			htmlStr += '                                 <button type="button">';
            			htmlStr += '                                    <img src="/mobile/resources/m2021/images/map/i_pin--off.png" alt="Map Point">';
            			htmlStr += '                                 </button>';
            			htmlStr += '                              </li>';
            			if(x_coor !== undefined && y_coor !== undefined){
							var map = $catchmentAreaMap.ui.map;
							var markerIcon = sop.icon({
								iconUrl: contextPath +"/resources/m2021/images/map/i_pin--on.png",
								iconAnchor: [12.5, 40 ],
								iconSize: [ 25, 40 ],
								infoWindowAnchor: [1, -34],
							});
							
							var marker = sop.marker([ x_coor, y_coor ], {icon : markerIcon});			
							map.markers2.addLayer(marker);
							marker.on({
								click : function (e) {
									$('#sufid_' + index).trigger('click');
								}									
							});
            			}
					});
				}
				$('.map__result__list').html(htmlStr);
				$('#search_text_previous').attr('value',$('#search_text').val());
			},
			/**
			 * 
			 * @name         : clearLayers
			 * @description  : 지도 위 레이어를 삭제한다(마커제외)
			 * 
			 */
			clearLayers : function(mapId){	
				mapId = mapId ? mapId : 0;
				var map = $catchmentAreaMap.ui.getMap(mapId);
				var drawObj = null;
				if(mapId === 0){
					drawObj = $catchmentAreaMap.draw;
					if(($catchmentAreaMenu.ui.report_clear)){
						drawObj = $catchmentAreaReport.draw;
					} 
				}else if(mapId ===1){
					drawObj = $catchmentAreaMap.draw_report;
					if(($catchmentAreaMenu.ui.report_clear)){
						drawObj = $catchmentAreaReport.draw_report;
					} 
				}
				map.markers2.clearLayers(); //반경 기준 레이어
				map.clearToolTip();		//툴팁 초기화
				drawObj.removePolygon(); //주행시간 기준 레이어
				map.clearDataOverlay(); //격자도형 초기화				
			},
			
			/**
			 * 
			 * @name         : clearLayers
			 * @description  : 지도 위 레이어를 삭제한다(마커제외)
			 * 
			 */
			clearLayers_report : function(){	
				var map = $catchmentAreaMap.ui.getMap(1);
				var drawObj = null;
				drawObj = $catchmentAreaMap.draw_report;

				map.clearToolTip();		//툴팁 초기화
				map.markers.clearLayers(); //반경 기준 레이어
				drawObj.removePolygon(); //주행시간 기준 레이어
				map.clearDataOverlay(); //격자도형 초기화				
			},
			
			typeAllRemoveClass : function(type){
			  
				if(type == "all"){
					$("#type_t").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
					$("#type_d").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
					$("#type_r").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
				}else if(type == "t"){
					$("#type_d").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
					$("#type_r").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
				}else if(type == "d"){
					$("#type_t").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
					$("#type_r").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
				}else {
					$("#type_t").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
					$("#type_d").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
				}
				
			},
			
			typeAllRemoveClass_grid : function(type){
				  
				if(type == "all"){
					$("#type_t_grid").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
					$("#type_d_grid").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
					$("#type_r_grid").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
				}else if(type == "t"){
					$("#type_d_grid").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
					$("#type_r_grid").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
				}else if(type == "d"){
					$("#type_t_grid").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
					$("#type_r_grid").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
				}else {
					$("#type_t_grid").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
					$("#type_d_grid").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   $("#"+selectId).removeClass("active");
			    	});
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
				if($('#default_type_select button.on').text() == "영역 내 정보 조회"){
					if(pRngGb == "T"){
						sectionId = "type_t";
					}else if(pRngGb == "D"){
						sectionId = "type_d";
					}else if(pRngGb == "R"){
						sectionId = "type_r";
					}
					
					if(sectionId !== undefined){
						// 모두 지우고 시작
						$('#type_t > li').removeClass('bg0 bg1 bg2 bg3');
						$('#type_d > li').removeClass('bg0 bg1 bg2 bg3');
						$('#type_r > li').removeClass('bg0 bg1 bg2 bg3');
						
						var activeNo = 0;
						var areas = $('#' + sectionId).children('li');					
						$.each(areas, function(idx, item){
							
							if($(item).hasClass('active')){
								
								$(item).addClass('bg' + activeNo);
								activeNo = activeNo + 1;
							}						
						});					
					}	
				}else if($('#default_type_select button.on').text() == "격자 분포 조회"){
					if(pRngGb == "T"){
						sectionId = "type_t_grid";
					}else if(pRngGb == "D"){
						sectionId = "type_d_grid";
					}else if(pRngGb == "R"){
						sectionId = "type_r_grid";
					}
					
					if(sectionId !== undefined){
						// 모두 지우고 시작
						$('#type_t_grid > li').removeClass('bg0 bg1 bg2 bg3');
						$('#type_d_grid > li').removeClass('bg0 bg1 bg2 bg3');
						$('#type_r_grid > li').removeClass('bg0 bg1 bg2 bg3');
						
						var activeNo = 0;
						var areas = $('#' + sectionId).children('li');					
						$.each(areas, function(idx, item){
							
							if($(item).hasClass('active')){
								
								$(item).addClass('bg' + activeNo);
								activeNo = activeNo + 1;
							}						
						});					
					}	
				}
				
			},
			/**
			 * 
			 * @name         : setRangeDisplay
			 * @description  : (영역설정 화면에서)생활권역 도형 색상과 동일하게 버튼의 배경색상을 변경한다.
			 * 
			 */
			setRangeDisplay_grid: function(pRngGb){
				
				var sectionId; 
				if(pRngGb == "T"){
					sectionId = "type_t_grid";
				}else if(pRngGb == "D"){
					sectionId = "type_d_grid";
				}else if(pRngGb == "R"){
					sectionId = "type_r_grid";
				}
				
				if(sectionId !== undefined){
					// 모두 지우고 시작
					$('#type_t_grid > li').removeClass('bg0 bg1 bg2 bg3');
					$('#type_d_grid > li').removeClass('bg0 bg1 bg2 bg3');
					$('#type_r_grid > li').removeClass('bg0 bg1 bg2 bg3');
					
					var activeNo = 0;
					var areas = $('#' + sectionId).children('li');					
					$.each(areas, function(idx, item){
						
						if($(item).hasClass('active')){
							
							$(item).addClass('bg' + activeNo);
							activeNo = activeNo + 1;
						}						
					});					
				}	
			},
			/**
			 * 
			 * @name         : getSumAndAvgAttrNm
			 * @description  : 데이터보드 조회 데이터에서 type과 coprTypr에 따른 "합계"와 "평균"에 대한 속성 이름을 가져온다. 
			 * @param {string} type 타입명
			 * @param {string} 사업체 및 종사자 구별 타입명
			 * 
			 */
			getSumAndAvgAttrNm : function(type,coprType) {
				var result = null;
			    if(type == 'copr'){//사업체
			        if(coprType == "copr"){
			            result = this.gridTypeAttrNm['copr_bus'];
			        }else if(coprType == 'employee'){
			            result = this.gridTypeAttrNm['copr_worker'];
			        }
			    }else{// 사업체 외
					result = this.gridTypeAttrNm[type];
			    }
			    
			    if(!result) {throw new Error('존재하지 않는 type입니다');}
			    
			    return result;
			},
			/**
			 * 
			 * @name         : reqScopeInfo
			 * @description  : 생활권역 임의값영역 설정정보 요청
			 * 
			 */
			reqScopeInfo : function() {
				var param = {};
				param.classDeg = $catchmentAreaMenu.ui.classDeg;
				
				var options = $catchmentAreaMenu.ui.reqSetParams("API_202090", param);
				$catchmentAreaMenu.ui.requestOpenApi(options);
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
					url : "/ServiceAPI/OpenAPI3/catchmentArea/getSrvareaScopeList.json",
					options : {
						callback : function(t,d,r,a){
							$catchmentAreaMenu.ui.t_default= t;
							$catchmentAreaMenu.ui.d_default= d;
							$catchmentAreaMenu.ui.r_default= r;
							
							//초기값 세팅
							$("#type_t").children("li").each(function(){
					    		   var selectId = $(this).attr("id");
					    		   var selectVal = $(this).attr("data-value");
					    		   $.each(t, function(index, item){
					    			   if(selectVal == item){
					    				   $("#"+selectId).addClass("active");
						    		   }
					    		   });
					    	});
							
							$("#type_t_grid").children("li").each(function(){
					    		   var selectId = $(this).attr("id");
					    		   var selectVal = $(this).attr("data-value");
					    		   $.each([300], function(index, item){
					    			   if(selectVal == item){
					    				   $("#"+selectId).addClass("active");
						    		   }
					    		   });
					    	});
							// 도형색상과 일치
							$catchmentAreaMenu.ui.setRangeDisplay('T');
							$catchmentAreaMenu.ui.setRangeDisplay_grid('T');
						}
					}
				});
			},
			/**
			 * 
			 * @name         : settingSrvAreaTimeMap
			 * @description  : 주행시간기준에 대한 세팅을 한다.
			 * 
			 */
			settingSrvAreaTimeMap : function(x_coordinate, y_coordinate, flag){
				if(flag){
					$catchmentAreaMenu.ui.clearLayers();// 레이어 초기화  qw 1 : 클리어 만들어야해
					var defaultTime = $catchmentAreatMenu.ui.t_default;
					//x좌표, y좌표, defult값 여부,맵 id(오른쪽 0)/(왼쪽 1),주행시간(0)/주행거리(1)
					$catchmentAreaMap.arcgis.event.calculateSearchArea(x_coordinate, y_coordinate, defaultTime, 0,0)
					
				}else{
					$catchmentAreaMenu.ui.clearLayers();// 레이어 초기화 qw 1 
					var areaMins = [];
						
					if($("#default_type_select button.on").val() == 0){
							if($('#fixed_selected').hasClass('on'))  {
								$("#type_t").children("li").each(function(){// 고정 값 선택 부분 
						    		   var on = $(this).hasClass("active");
						    		   if(on){
						    			   areaMins.push($(this).attr('data-value'));
						    			   $catchmentAreaMenu.ui.scope_info.push(($(this).attr('data-value')/60) + ',');
						    		   }
						    	});
		
							} else if ($('#directly_selected').hasClass('on')){// 직접 입력 부분 
									for(var a = 0; a < $catchmentAreaMenu.ui.t_rndm.length; a++){
											areaMins.push($catchmentAreaMenu.ui.t_rndm[a]);
											$catchmentAreaMenu.ui.scope_info.push(($catchmentAreaMenu.ui.t_rndm[a]/60) + ',');
										}
							}
						}else if($("#default_type_select button.on").val() == 1){
							if($('#grid_fixed_selected').hasClass('on'))  {
								$("#type_t_grid").children("li").each(function(){// 고정 값 선택 부분 
						    		   var on = $(this).hasClass("active");
						    		   if(on){
						    			   areaMins.push($(this).attr('data-value'));
						    			   $catchmentAreaMenu.ui.scope_info.push(($(this).attr('data-value')/60) +',');
						    		   }
						    	});
		
							} else if ($('#grid_directly_selected').hasClass('on')){// 직접 입력 부분 
									for(var a = 0; a < $catchmentAreaMenu.ui.t_rndm_grid.length; a++){
											areaMins.push($catchmentAreaMenu.ui.t_rndm_grid[a]);
											$catchmentAreaMenu.ui.scope_info.push(($catchmentAreaMenu.ui.t_rndm_grid[a]/60) + ',');
										}
							}
					}
					//x좌표, y좌표, defult값 여부,맵 id(오른쪽 0)/(왼쪽 1),주행시간(0)/주행거리(1)
					$catchmentAreaMap.arcgis.event.calculateSearchArea(x_coordinate, y_coordinate, areaMins, 0,0)
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
					$catchmentAreaMenu.ui.clearLayers();// 레이어 초기화
					var defaultDistances = $catchmentAreaMenu.ui.d_default;
					//x좌표, y좌표, defult값 여부,맵 id(오른쪽 0)/(왼쪽 1),주행시간(0)/주행거리(1)
					$catchmentAreaMap.arcgis.event.calculateSearchArea(x_coordinate, y_coordinate, defaultDistances, 0,1)
					
				}else{
					$catchmentAreaMenu.ui.clearLayers();// 레이어 초기화 qw 1 
					var areaDistances = [];
					
					if($('#default_type_select button.on').val() == 0){
						if($('#fixed_selected').hasClass('on'))  {
							$("#type_d").children("li").each(function(){// 고정 값 선택 부분 
					    		   var on = $(this).hasClass("active");
					    		   if(on){
					    			   areaDistances.push($(this).attr('data-value'));
					    			   $catchmentAreaMenu.ui.scope_info.push(($(this).attr('data-value')/1000) + ',');
					    		   }
					    	});
						} else if ($('#directly_selected').hasClass('on')){// 직접 입력 부분 
								for(var a = 0; a < $catchmentAreaMenu.ui.d_rndm.length; a++){
									areaDistances.push($catchmentAreaMenu.ui.d_rndm[a]);
									$catchmentAreaMenu.ui.scope_info.push(($catchmentAreaMenu.ui.d_rndm[a]/1000) + ',');
								}
						}
					}else if($('#default_type_select button.on').val() == 1){
						if($('#grid_fixed_selected').hasClass('on'))  {
							$("#type_d_grid").children("li").each(function(){// 고정 값 선택 부분 
					    		   var on = $(this).hasClass("active");
					    		   if(on){
					    			   areaDistances.push($(this).attr('data-value'));
					    			   $catchmentAreaMenu.ui.scope_info.push(($(this).attr('data-value')/1000) + ',');
					    		   }
					    	});
						} else if ($('#grid_directly_selected').hasClass('on')){// 직접 입력 부분 
								for(var a = 0; a < $catchmentAreaMenu.ui.d_rndm_grid.length; a++){
									areaDistances.push($catchmentAreaMenu.ui.d_rndm_grid[a]);
									$catchmentAreaMenu.ui.scope_info.push(($catchmentAreaMenu.ui.d_rndm_grid[a]/1000) + ',');
								}
						}
					}
					//x좌표, y좌표, defult값 여부,맵 id(오른쪽 0)/(왼쪽 1),주행시간(0)/주행거리(1)
					$catchmentAreaMap.arcgis.event.calculateSearchArea(x_coordinate, y_coordinate, areaDistances, 0,1);
				}
				
			},
			
		
			/**
			 * 
			 * @name         : settingCircleMap
			 * @description  : 반경기준에 대한 세팅을 한다.
			 * 
			 */
			settingCircleMap : function(x_coordinate, y_coordinate, flag){
				$catchmentAreaMenu.ui.selectRangeArr = []; //초기화
				
				if(flag){
					$catchmentAreaMenu.ui.clearLayers();// 레이어 초기화
					$catchmentAreaMenu.ui.geoMap_area = [];
					var map = $catchmentAreaMap.ui.getMap();
					var defaultRange = $catchmentAreaMenu.ui.r_default;
					if(defaultRange.length > 0){
						endIdx = defaultRange.length - 1;	
						//default 값 세팅
						for(var i=endIdx; i>-1; i--){
							$catchmentAreaMenu.ui.setCircleMarker(x_coordinate, y_coordinate, defaultRange[i], 0, i, endIdx); 
							$catchmentAreaMenu.ui.selectRangeArr.unshift(defaultRange[i]);					
						}						
					}
				}else{
					$catchmentAreaMenu.ui.clearLayers();// 레이어 초기화
					$catchmentAreaMenu.ui.geoMap_area = [];
					var selectRange = [];
					if($('#default_type_select button.on').val() == 0){
						if($('#fixed_selected').hasClass('on'))  {
							$("#type_r").children("li").each(function(){// 고정 값 선택 부분 
					    		   var on = $(this).hasClass("active");
					    		   if(on){
					    			   $catchmentAreaMenu.ui.selectRangeArr.push($(this).attr('data-value'));
					    			   selectRange.push($(this).attr('data-value'));
					    			   $catchmentAreaMenu.ui.scope_info.push(($(this).attr('data-value')/1000) + ',');
					    		   }
					    	});
						} else if ($('#directly_selected').hasClass('on')){// 직접 입력 부분 
							for(var a = 0; a < $catchmentAreaMenu.ui.r_rndm.length; a++){
								$catchmentAreaMenu.ui.selectRangeArr.push($catchmentAreaMenu.ui.r_rndm[a]);
								$catchmentAreaMenu.ui.scope_info.push(($catchmentAreaMenu.ui.r_rndm[a]/1000) + ',');
								selectRange.push($catchmentAreaMenu.ui.r_rndm[a]);
							}
						}
					} else if($('#default_type_select button.on').val() == 1){
						if($('#grid_fixed_selected').hasClass('on'))  {
							$("#type_r_grid").children("li").each(function(){// 고정 값 선택 부분 
					    		   var on = $(this).hasClass("active");
					    		   if(on){
					    			   $catchmentAreaMenu.ui.selectRangeArr.push($(this).attr('data-value'));
					    			   $catchmentAreaMenu.ui.scope_info.push(($(this).attr('data-value')/1000) + ',');
					    			   selectRange.push($(this).attr('data-value'));
					    		   }
					    	});
						} else if ($('#grid_directly_selected').hasClass('on')){// 직접 입력 부분 
							for(var a = 0; a < $catchmentAreaMenu.ui.r_rndm_grid.length; a++){
								$catchmentAreaMenu.ui.selectRangeArr.push($catchmentAreaMenu.ui.r_rndm_grid[a]);
								 $catchmentAreaMenu.ui.scope_info.push(($catchmentAreaMenu.ui.r_rndm_grid[a]/1000) + ',');
								selectRange.push($catchmentAreaMenu.ui.r_rndm_grid[a]);
							}
						}
						var base_year = $catchmentAreaMap.ui.getBaseYear('4');
				    	var range = $catchmentAreaMenu.ui.getRangeType();
				    	$catchmentAreaMenu.ui.settingGridAreaMap(base_year, range);
					}
					if(selectRange.length > 0){
						endIdx = selectRange.length - 1;
						for(var i=endIdx; i>-1; i--){
							$catchmentAreaMenu.ui.setCircleMarker(x_coordinate, y_coordinate, selectRange[i], 0, i, endIdx);
						}						
					}
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
				}

				var circle = new sop.circle(sop.utmk(x_coordinate,y_coordinate), radiusVal,{
					stroke : true,
					weight : 1.5,
					opacity : 0.7,
					fill : true,
					fillColor : $catchmentAreaMap.ui.saShpColor[shpColorIdx],
					fillOpacity : 0.3,
					color : $catchmentAreaMap.ui.saShpColor[shpColorIdx],
					clickable : true
				});

				var map = $catchmentAreaMap.ui.getMap(mapId);	// mapId 인자값 추가
				map.markers2.addLayer(circle);

				circle.on({
					click : function (e) {						
						var geoData = {};
						geoData.rangeType = "C";
						geoData.rangeVal = radiusVal;
						$catchmentAreaMap.callbackFunc.didMouseClickPolygon(e, geoData, 'saShp', map);
					}
				});
	        	
				var outerBounds = circle.getBounds();
	        	if(outerBounds != undefined && outerBounds != null){
	        		map.gMap.fitBounds(outerBounds);
	        	}
			},
			/**
			 * 
			 * @name         : setCircleMarker
			 * @description  : 반경기준 : 리보트 전용 써클마커 생성한다.
			 * 
			 */
			setCircleMarker_report : function(x_coordinate, y_coordinate, radiusVal, mapId, currIdx, endIdx, selectIdx){ // 지도 구별을 위해 mapId 파라미터 추가 - 박상언 2020-10-21 추가

				mapId = mapId ? mapId : 0;	// mapId가 undefined, null, 0 값이 들어오면 0으로 초기화.
				var shpColorIdx = $('#menu_4_button button.on').attr('data-index');
				
				var param = {};
				param.geoX = x_coordinate;
				param.geoY = y_coordinate;
				param.geoRadius = radiusVal;
				param.colorIdx = shpColorIdx;
				
				$catchmentAreaObj.setCircleInfo(param);

				var circle = new sop.circle(sop.utmk(x_coordinate,y_coordinate), radiusVal,{
					stroke : true,
					weight : 1.5,
					opacity : 0.7,
					fill : true,
					fillColor : $catchmentAreaMap.ui.saShpColor[shpColorIdx],
					fillOpacity : 0.3,
					color : $catchmentAreaMap.ui.saShpColor[shpColorIdx],
					clickable : true
				});

				var map = $catchmentAreaMap.ui.getMap(mapId);	// mapId 인자값 추가
				map.markers.addLayer(circle);

				if(currIdx === endIdx){
					var outerBounds = circle.getBounds();
		        	if(outerBounds != undefined && outerBounds != null){
		        		map.gMap.fitBounds(outerBounds);
		        	}
				}
			},
			createEmptyOnePieChart : function (targetId) {
				
				// 기본크기 대상 : familyChart, popCChart, familyCChart, houseCChart
				var chtWidth = 210;		
				var chtHeight = 140;
				if(targetId == 'popChart'){
					chtWidth = 205; 
					chtHeight = 140; 
				}else if(targetId == 'houseChart'){
					chtWidth = 205;
					chtHeight = 140;
				}else if(targetId == 'coprChart' || targetId == 'workerChart' || targetId == 'coprCChart' || targetId == 'workerCChart'){
					chtWidth = 210;
					chtHeight = 170;
				}

				var statData = [];
				var statColors = ['#E9E9E9'];
				statData.push({name : "검색결과 없음", y : 100});

				$("#"+targetId).highcharts({
						chart: {
			  				type: 'pie',
			  				spacingTop: 0,
			  				spacingRight: 0,
			  				spacingBottom: 0,
			  				spacingLeft: 0,
			  				width: chtWidth,
			  				height: chtHeight
			  			},
			  			title: {
			  				text : ''
			  			},
			  			tooltip: {
			  		        pointFormat: ''
			  		    },
			  			exporting: {
			  		        enabled: false
			  		    },
			  			plotOptions: {
							pie: {
								allowPointSelect: true,
							    cursor: 'pointer',
							    dataLabels: {
							        enabled: false
							    }
		                   }
		               },
		               series: [{
			  				size: '100%',
			  			    innerSize: '50%',
			  				data: statData,
			  				colors : statColors
			  			}]
					});
			},
			
			getRangeType : function(){
				var rangeType
				if($('#default_type_select button.on').val() == 0){
					if($("#fixed_selected").hasClass("on")){
						rangeType = $("input[name='stats_radio']:checked").attr("id");
					}else if($("#directly_selected").hasClass("on")){
						var rangeType = $("input[name='stats_radio']:checked").attr("id");
						if ($('#area_setting_directly .on a').attr("id") == "rndstats01"){
							rangeType = "stats_radio_t"
						}else if ($('#area_setting_directly .on a').attr("id") == "rndstats02"){
							rangeType = "stats_radio_d"
						}else if ($('#area_setting_directly .on a').attr("id") == "rndstats03"){
							rangeType = "stats_radio_r"
						}
					}
				}else if($('#default_type_select button.on').val() == 1){
					if($("#grid_fixed_selected").hasClass("on")){
						rangeType = $("input[name='stats_radio_grid']:checked").attr("id");
					}else if($("#grid_directly_selected").hasClass("on")){
						if ($("#grid_setting_directly li:eq(0)").hasClass("on")){
							rangeType = "stats_radio_t_grid"
						}else if ($("#grid_setting_directly li:eq(1)").hasClass("on")){
							rangeType = "stats_radio_d_grid"
						}else if ($("#grid_setting_directly li:eq(2)").hasClass("on")){
							rangeType = "stats_radio_r_grid"
						}
					}
				}
				return rangeType;
			},
			
			getRangeVal : function(pType, pNo){
				// pType : 01-영역 내 전체 정보, 02-격자 분포, 03-상세분석
				var rangeVal = "";
				var $statsType;
				
				if(pType == "01"){
					var seq = pNo - 1;
					$statsType = $('#statsType01');
					
					if($statsType != undefined && $statsType != null){
						rangeVal = $statsType.find('li.active').eq(seq).find('a').attr('data-value');
					}					
				}else{
					if(pType == "02"){
						$statsType = $('#statsType02');
					}else if(pType == "03"){
						$statsType = $('#statsType02'); 
					}
					
					if($statsType != undefined && $statsType != null){
						rangeVal = $statsType.find('li.active').find('a').attr('data-value');
					}					
				}

				return rangeVal;
			},
			/**
			 * 
			 * @name         : setScopeInfo
			 * @description  : 임의값 영역 설정을 구성한다.
			 * 
			 */
			setScopeInfo : function(res, options) {
				var scope_type = '';
				var scope_type_grid = '';
				var list = res.result.list;
				var i = 0;
				
				// 1. 멤버변수에 list 저장.
				$catchmentAreaMenu.ui.rndmScopeInfo = list;
				
				// 2. 초기 셋팅(콤보박스 구성)
				$.each(list, function(index, item) {
					var typeName = item.s_class_cd_nm.split(' ')[0];					
					scope_type += '<li data-value = '+ index +'> <a href = "#" id="rndstats0'+ ++i +'"  data-value = "'+ (i-1) +'">'+typeName +'</a> </li>';
					scope_type_grid += '<li data-value = '+ index +'> <a href = "#" id="rndstats0'+ i +'_grid"  data-value = "'+ (i-1) +'">'+typeName +'</a> </li>';
				});
				$('#area_setting_directly').html(scope_type);
				$('#grid_setting_directly').html(scope_type_grid);
				
				$('#rndstats01').trigger('click');
				
				$('#rndstats01_grid').trigger('click');
			},
			
			settingStatisticsDataList : function(){
				var html = "";
				var areaSettingNm = "";
				var rangeType = $catchmentAreaMenu.ui.getRangeType();
				var rndmFlag = $catchmentAreaMenu.ui.rndmFlag;
				
				if(rndmFlag) {
					if(rangeType == "stats_radio_t"){
						for(var a = 0; a < $("#area_setting_selected_1 .active").length; a++){
							html += '<button type = "button"'
					    	html += 'data-value="'+$("#area_setting_selected_1 li:eq("+a+") .active").val()+ '"data-index="' + a   +  '"data-name="'+$("#area_setting_selected_1 li:eq("+a+") .active").text() +'분">'+$("#area_setting_selected_1 li:eq("+a+") .active").text()+'분</a>' 
					    	html += '</button>'	
						}
						areaSettingNm = "주행시간";
					}else if(rangeType == "stats_radio_d"){
						for(var a = 0; a < $("#area_setting_selected_2 .active").length; a++){
							html += '<button type = "button"'
					    	html += 'data-value="'+$("#area_setting_selected_2 li:eq("+a+") .active").val()+ '"data-index="' + a   +  '"data-name="'+$("#area_setting_selected_2 li:eq("+a+") .active").text()+'km">'+$("#area_setting_selected_2 li:eq("+a+") .active").text()+'km</a>' 
					    	html += '</button>'	
						}
						areaSettingNm = "주행거리";
					}else if (rangeType == "stats_radio_r"){					
						for(var a = 0; a < $("#area_setting_selected_3 .active").length; a++){
							html += '<button type = "button"'
					    	html += 'data-value="'+$("#area_setting_selected_3 li:eq("+a+") .active").val()+ '"data-index="' + a   +  '"data-name="'+$("#area_setting_selected_3 li:eq("+a+") .active").text()+ 'km">'+$("#area_setting_selected_3 li:eq("+a+") .active").text()+'km</a>' 
					    	html += '</button>'	
						}
						areaSettingNm = "반경";
					}
				} else {
					if(rangeType == "stats_radio_t"){
						$("#type_t li").siblings('.active').each(function(i){
				    		   var on = $(this).hasClass("active");
				    		   if(on){
				    			   html += '<button type = "button"'
					    		   html += 'id="select_'+$(this).attr("id")+'" data-value="'+$(this).attr("data-value")+  '"data-index="' + i   +  '"data-name="'+$(this).text()+'">'+$(this).text()+'</a>' 
					    		   html += '</button>'	
				    		   }
				    	});
						areaSettingNm = "주행시간";
					}else if(rangeType == "stats_radio_d"){
						$("#type_d li").siblings('.active').each(function(i){
							  var on = $(this).hasClass("active");
				    		   if(on){
				    			   html += '<button type = "button"'
					    		   html += 'id="select_'+$(this).attr("id")+'" data-value="'+$(this).attr("data-value")+  '"data-index="' + i   +  '"data-name="'+$(this).text()+'">'+$(this).text()+'</a>' 
					    		   html += '</button>'	
							  }
				    	});
						areaSettingNm = "주행거리";
					}else if (rangeType == "stats_radio_r"){					
						$("#type_r li").siblings('.active').each(function(i){
							  var on = $(this).hasClass("active");
				    		   if(on){
				    			   html += '<button type = "button"'
					    		   html += 'id="select_'+$(this).attr("id")+'" data-value="'+$(this).attr("data-value")+  '"data-index="' + i   +  '"data-name="'+$(this).text()+'">'+$(this).text()+'</a>' 
					    		   html += '</button>'	
				    		   }
				    	});
						areaSettingNm = "반경";
					}
				}
				
				
				
				$("#menu_4_button").html(html);
				$("#standard_text").html(areaSettingNm);
				$("#area_standard").html($(".map__result__tit > h3").text() + ' 기준  <span class="color-red"><b id = "life-industry_area">주행거리 0.5km</b></span> 영역 면적' );

			},
			/**
			 * 
			 * @name         : settiongGridDataBoard
			 * @description  : 격자 데이터 보드
			 * 
			 */
			settiongGridDataBoard : function(result, options){
				$catchmentAreaMap.ui.isReportShow = true;
				$catchmentAreaMap.ui.isReportType = "grid";
				$catchmentAreaMenu.ui.statDataOption = options;
				
				var type = options.params.statType;
				var unit = options.params.unit;
				var coprType = options.params.grdstatType;
   			 	var base_year = options.params.base_year;		
   			 	var rangeType = $catchmentAreaMenu.ui.getRangeType();
   			 	
   			 	/*타이틀정보*/
				var grid_area_setting = "";
				
				if(rangeType == "stats_radio_t_grid"){
					grid_area_setting = '주행시간 ' + (options.params.rangeVal / 60) + '분';
				}else if(rangeType == "stats_radio_d_grid"){
					grid_area_setting = '주행거리 ' + (options.params.rangeVal / 1000) + 'km';
				}else if(rangeType == "stats_radio_r_grid"){
					grid_area_setting = '반경 ' + (options.params.rangeVal / 1000) + 'km';
				}
				$("#titleYearTxt_2").html(options.params.base_year + "년");
				
				var statSuffix = "";
				var statCalMetd = "합계";
				$('#grid_source_text').html('통계청, 「인구주택총조사」');
				$('#total_source_txt').html('기초자료 : 통계청, 「인구주택총조사」');
				if(type == "pops"){//인구
					statSuffix = "인구 ";
				}else if(type == "family"){//가구
					statSuffix = "가구 ";
				}else if(type == "house"){//주택
					statSuffix = "주택 ";
				}else if(type == "copr"){//사업체
					if(coprType == "copr"){
						statSuffix = "사업체 ";
					}else{
						statSuffix = "종사자 ";
					}
					$('#grid_source_text').html('통계청, 「전국사업체조사」');
					$('#total_source_txt').html('기초자료 : 통계청, 「전국사업체조사」');
				}else if(type == "idlv"){//공시지가
					statSuffix = "공시지가";
				}
				
				statSuffix = this.getTypeUnit(type,coprType);
				$("#grid_statCalcMethod_txt").html(statCalMetd + "(" + unit + ")");
				$("#grid_bordRange_txt").html(result.itgSgg);

				if(type == "idlv"){
					$("#grid_statTitle_txt").html(statSuffix); //통계주제
					$("#grid_statTitle_txt2").html(statSuffix);
				}else{
					$("#grid_statTitle_txt").html(statSuffix + "[" + options.params.schCondNm + "]");
					$("#grid_statTitle_txt2").html(statSuffix + "[" + options.params.schCondNm + "]");
				}
				
				
				$('#grid_graph_title').html('영역 내 전체 총 ' + statSuffix + ' 변화' + '<span>(단위: '+ unit +')</span>');
				$('#grid_graph_title').attr('data-subj', chartTitleText);
				$("#grid_graph_schCond").html('조회 조건 : ' + options.params.schCondNm);
				var gridCnt, gridArea;
				var baseYearGridStat = result.gridStat.filter(function(item, index, originalArr){
					return item.base_year == base_year;
				})[0];

				var attrNm = this.getSumAndAvgAttrNm(type,coprType);				
				
				if(baseYearGridStat === undefined){
					$("#grid_totSum").html("0 " + unit);
					gridCnt = '0';
					gridArea = '0';					
				}else{
					$("#grid_totSum").html($catchmentAreaMap.ui.comma(baseYearGridStat[attrNm.sum]) + " " + unit);
					gridCnt = baseYearGridStat.grid_cnt;
					gridArea = baseYearGridStat.grid_area;
				}
				
								
				var gridLevelNm = options.params.grid_level;
				$("#grid_size_txt").html(gridLevelNm + " * " + gridLevelNm);
				
				$("#grid_select_area").html($('#map_area_name_text').text());
				$("#grid_area_setting").text(grid_area_setting);
				
				$("#grid_count_txt").html($catchmentAreaMap.ui.comma(gridCnt) + " 개");
				$("#grid_area_txt").html($catchmentAreaMap.ui.comma((Number(gridArea) * Number(gridCnt) / 1000000).toFixed(2)) + " ㎢");
				
				/*차트*/
				var chartTitleText = "";
				var statYear = [];
				var statData2 = [];
				chartTitleText = this.getTypeUnit(type,coprType);

				//통계정보를 sort한다.
				if (result.gridStat != null && result.gridStat.length > 0) {
					result.gridStat = result.gridStat.sort(function(a, b) {
						return parseFloat(a["base_year"])-parseFloat(b["base_year"]);
					});
				}
				
				$.each(result.gridStat, function(index, item){
					statYear.push(item.base_year + " 년");
					statData2.push(Number(item[attrNm.sum]));
					
	    		});
				
				var statYear_2015;
				var statData2_2015;
				if($('#statistics_topic_grid option:selected').val() == 'people' || $('#statistics_topic_grid option:selected').val() == 'family' || $('#statistics_topic_grid option:selected').val() == 'house'){
					statYear_2015 = statYear.slice(-5);
					statData2_2015 = statData2.slice(-5);
				}else{
					statYear_2015 = statYear.slice(-4);
					statData2_2015 = statData2.slice(-4);
				}
				$catchmentAreaMenu.ui.createBarChart('gridStatChart_right', statYear_2015 ,statData2_2015 ,chartTitleText, $(window).width()*0.8, 205);
			},
			createEmptySolidGaugeChart : function (targetId) {

				var chtWidth = $(window).width()*0.9;		
				var chtHeight = 140;
				var title_text;
				var unitNm = "명";
				if(targetId == 'familyChart' || targetId == 'familyDChart' || targetId == 'familyDChart_02'){
					unitNm = "가구";
				}else if(targetId == 'houseChart' || targetId == 'houseDChart' || targetId == 'houseDChart02' || targetId == 'houseDChart03'  || targetId == 'houseDChart04' ){
					unitNm = "호";
				}else if(targetId == 'coprChart' || targetId == 'coprDChart' || (targetId == 'copr_work_DChart' && $('#statistics_topic option:selected').val() == 'copr')|| (targetId == 'copr_work_DChart02' && $('#statistics_topic option:selected').val() == 'copr')){ 
					unitNm = "개";
				}
				
				var $lgnd = $("#"+targetId).closest('.txt_box01').siblings('.txt_box03').find('.cr02'); 
				$lgnd.css("background", $catchmentAreaMap.ui.saShpColor[2]);
				title_text = "<br>영역 내 전체 <br> 0"+ unitNm;
			
				$("#"+targetId).highcharts({
				    chart: {
				        type: 'solidgauge',
				        spacing: [14, 10, 11, 10],
						width: chtWidth,
						height: chtHeight
				    },

				    title: {
		  				text : title_text,
				    	textsize : "12px",
				    	align : 'center',
				    	verticalAlign : 'middle'
		  			},

				    pane: {
				        center: ['50%', '85%'],
				        size: '140%',
				        startAngle: -90,
				        endAngle: 90,
				        background: {
				            backgroundColor: '#EEE',
				            innerRadius: '67%',
				            outerRadius: '100%',
				            shape: 'arc'
				        }
				    },

				    exporting: {
				        enabled: false
				    },

				    tooltip: {
				        enabled: false
				    },

				    yAxis: {
				        lineWidth: 0,
				        tickWidth: 0,
				        minorTickInterval: null,
				        min: 0,
				        max: 100,				        
				        title: {
				            text: ''
				        },
				        labels: {
				        	enabled: false
				        }
				    },

				    plotOptions: {
				        solidgauge: {
				            dataLabels: {
				                y: 5,
				                borderWidth: 0,
				                useHTML: true
				            }
				        }
				    },

				    credits: {
				        enabled: false
				    },

				    series: [{
				        name: '',
				        data: [0],
				        dataLabels: {
				        	enabled: false
				        }				        
				    }]				    
				});
			},
			
			/**
			 * 
			 * @name         : resetAreaDataboard
			 * @description  : 영역 내 전체정보 데이터보드를 정리한다.
			 * 
			 */
			resetAreaDataboard : function(pSecGb, pContGb, pIsClear, pIsBlockShow) {
				// pContGb : B-기본 통계, C-세부항목별 통계

				var $rootSec = $("." + $catchmentAreaMenu.ui.pop01SecSet[pSecGb]);
				if($rootSec.length > 0){
					if(pIsClear){
						var $contSec;						
						if(pContGb == "B"){
							$contSec = $rootSec.find('.div_basic');
						}else if(pContGb == "C"){
							$contSec = $rootSec.find('.div_chartr');
						}						
						if($contSec !== undefined && $contSec !== null && $contSec.length > 0){							
							var $resetTxtTgt = $contSec.find('[data-reset]');
							$.each($resetTxtTgt, function(index, item){
								$(item).html($(item).attr('data-reset'));	
							});						
	
							var $resetChtTgt = $contSec.find('.reset.chart');
							$.each($resetChtTgt, function(index, item){
								if($(item).highcharts() !== undefined && $(item).highcharts() !== null){
									$(item).highcharts().destroy();
								}
								
								var chtId = $(item).attr('id');
								if(pContGb == "B"){
									$catchmentAreaMenu.ui.createEmptyOnePieChart(chtId);
								}else if(pContGb == "C"){
									$catchmentAreaMenu.ui.createEmptySolidGaugeChart(chtId);
								}												
							});
							
							var $resetClrTgt = $contSec.find('[data-reset-clr]');
							$.each($resetClrTgt, function(index, item){
								$(item).css("background", $(item).attr('data-reset-clr'));	
							});
						}
						
						var $totSec = $rootSec.find('.div_tot');						
						if($totSec !== undefined && $totSec !== null && $totSec.length > 0){
							var $resetTxtTgt = $totSec.find('[data-reset]');
							$.each($resetTxtTgt, function(index, item){
								$(item).html($(item).attr('data-reset'));	
							});								
						}
					}
					
					if(pIsBlockShow){
						$rootSec.find(".div_block").show();
					}else{
						$rootSec.find(".div_block").hide();
					}
				}				
			},
			
			/**
			 * 
			 * @name         : requestSrvAreaStatsData
			 * @description  : 영향권 통계정보를 요청한다.
			 * 
			 */
			requestSrvAreaStatsData : function(pCategory, pPageNo){ 
				// pCategory: 0-전체, 1-인구/가구/주택, 2-사업체/종사자
				// pPageNo: 1~4
				
				var param = {};
				var area = ""; 
				var radius;
				var rangeType = $catchmentAreaMenu.ui.getRangeType();
				var rangeVal = $('#menu_4_button').find(".on").attr('data-value'); // 수정
				param.rangeType = rangeType;
				param.rangeVal = rangeVal;
				var shpArea = $catchmentAreaObj.getShapeArea(rangeType, rangeVal);
				pPageNo = $('#menu_4_button button.on').index() + 1;
				
				if($catchmentAreaMenu.ui.selectPolygonPointsArr.length != 0){
					if(rangeType == "stats_radio_t" || rangeType == "stats_radio_d"){
						var selectIndex = $catchmentAreaMenu.ui.selectPolygonPointsArr.length - pPageNo;
						var polyPoints = $catchmentAreaMenu.ui.selectPolygonPointsArr[selectIndex];
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
					}else if(rangeType == "stats_radio_r"){
						area = 'POINT(';
						area += $catchmentAreaMenu.ui.selectCoordinate_x + " " + $catchmentAreaMenu.ui.selectCoordinate_y;
						area += ')';
						radius = $("#menu_4_button .on").attr('data-value');					
						param.area = area;
						param.radius = radius;
						param.srvAreaType = 2;
					}
				}
				
				if(area != ""){
					// areaSize:면적, pops:인구, family:가구, house:주택, copr:사업체/종사자, s3:인구/가구/주택
					param.base_year = $catchmentAreaMap.ui.getBaseYear("1");
					param.copr_base_year = $catchmentAreaMap.ui.getBaseYear("2");
					param.classDeg = $catchmentAreaMap.ui.classDeg;
					
					if(shpArea == undefined || shpArea == null || shpArea === 0){
						// 생활권역 도형정보에 면적 정보가 없으면(도형 및 면적 정보가 없을 경우는 없어야 함), 서버에 요청
						if(pCategory == '0'){										
							param.workGb = "areaSize";
							param.async = true;
	
							var storedInfo = $catchmentAreaObj.getStatisticsInfo("S01", param, "");
							if(storedInfo.addCnt > 0){					
								$catchmentAreaMap.ui.processWithStoredInfo("S01", storedInfo);
							}else{
								var params = $catchmentAreaMenu.ui.reqSetParams("API_202092", param);
								$catchmentAreaMenu.ui.requestOpenApi(params);
							}
						}
					}else{
						// 면적 정보가 있으면, 그리드 크기 결정
						var gLvl = $catchmentAreaMap.ui.getGridLevel(shpArea);
						param.grid_level = gLvl;
						
						$("#areaSize").html($catchmentAreaMap.ui.comma((Number(shpArea) / 1000000).toFixed(2)) + "㎢");
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
						storedInfo = $catchmentAreaObj.getStatisticsInfo("S01", param, "");
						if(storedInfo.addCnt > 0){
							$catchmentAreaMask.endUnitWork(identifier);
							$catchmentAreaMap.ui.processWithStoredInfo("S01", storedInfo);
						}else{
							params = $catchmentAreaMenu.ui.reqSetParams("API_202092", param);
							$catchmentAreaMenu.ui.requestOpenApi(params);
						}						
						
						param.workGb = "family";
						storedInfo = $catchmentAreaObj.getStatisticsInfo("S01", param, "");
						if(storedInfo.addCnt > 0){
							$catchmentAreaMask.endUnitWork(identifier);
							$catchmentAreaMap.ui.processWithStoredInfo("S01", storedInfo);
						}else{
							params = $catchmentAreaMenu.ui.reqSetParams("API_202092", param);
							$catchmentAreaMenu.ui.requestOpenApi(params);
						}
						
						param.workGb = "house";
						storedInfo = $catchmentAreaObj.getStatisticsInfo("S01", param, "");
						if(storedInfo.addCnt > 0){
							$catchmentAreaMask.endUnitWork(identifier);
							$catchmentAreaMap.ui.processWithStoredInfo("S01", storedInfo);
						}else{
							params = $catchmentAreaMenu.ui.reqSetParams("API_202092", param);
							$catchmentAreaMenu.ui.requestOpenApi(params);
						}
					}
					
					if(pCategory == '2' || pCategory == '0'){					
						var params;
						param.workGb = "copr";
						
						var storedInfo = $catchmentAreaObj.getStatisticsInfo("S01", param, "");
						if(storedInfo.addCnt > 0){
							$catchmentAreaMask.endUnitWork(identifier);
							$catchmentAreaMap.ui.processWithStoredInfo("S01", storedInfo);
						}else{						
							params = $catchmentAreaMenu.ui.reqSetParams("API_202092", param);
							$catchmentAreaMenu.ui.requestOpenApi(params);
						}
					}
				}
			},
			createOnePieChart : function (target, statData, statColors, pWidth, pHeight) {
				console.log(target);
				var unitNm = "명";
				if(target == 'familyChart' || target == 'familyCChart'){
					unitNm = "가구";
				}else if(target == 'houseChart' || target == 'houseCChart'){
					unitNm = "호";
				}else if(target == 'coprChart' || target == 'coprCChart'){
					unitNm = "개";
				}

				$("#"+target).highcharts({
						chart: {
			  				type: 'pie',
			  				spacingTop: 0,
			  				spacingRight: 0,
			  				spacingBottom: 0,
			  				spacingLeft: 0,
			  				width: pWidth,
			  				height: pHeight
			  			},
			  			title: {
			  				text : ''
			  			},
			  			tooltip: {
			  		        pointFormat: '<b>{point.y} ' + unitNm + '</b><br/>{point.percentage:.1f} %'
			  		    },
			  			exporting: {
			  		        enabled: false
			  		    },
			  			plotOptions: {
							pie: {
								allowPointSelect: true,
							    cursor: 'pointer',
							    dataLabels: {
							        enabled: false
							    }
		                   }
		               },
		               series: [{
			  				size: '100%',
			  			    innerSize: '50%',
			  				data: statData,
			  				colors : statColors
			  			}]
					});
			},
			
			createTotalTxt : function() {
				var rst = "";
				var schWord = $catchmentAreaMenu.ui.curSearchWord;
				if(schWord === undefined || schWord === null){
					schWord = "";
				}
				
				if(schWord.length > 0){
					rst = "'" + schWord + "' 검색결과 전체";
				}else{
					rst = "검색결과 전체";
				}
				
				return rst;		
			},
			
			/**
			 * 
			 * @name         : setEmptyList
			 * @description  : 빈 검색 결과를 구성한다.
			 * 
			 */
			setEmptyList : function() {
				
				$catchmentAreaMenu.ui.curSearchList = null;
				$catchmentAreaMenu.ui.curSearchList_worker = null;
				$catchmentAreaMenu.ui.curSelectedItem = null;
					
				var totalCount = 0;
				var $rootCtnr
				var rootCtrl = "";
				
				if($('#default_type_select button.on').attr("value") == 0){
					if($("#statistics_topic option:selected").attr("value") == "copr"){
						$rootCtnr = $('#copr_detail_condition_korea');
						$('#ksic_notice_copr').hide();
					}else if($("#statistics_topic option:selected").attr("value") == "worker"){
						$rootCtnr = $('#worker_detail_condition_korea');
						$('#ksic_notice_worker').hide();
					}
				}else if($('#default_type_select button.on').attr("value") == 1){
					if($("#statistics_topic_grid option:selected").attr("value") == "copr"){
						$rootCtnr = $('#copr_detail_condition_korea');
						$('#ksic_notice_copr').hide();
					}else if($("#statistics_topic_grid option:selected").attr("value") == "worker"){
						$rootCtnr = $('#worker_detail_condition_korea');
						$('#ksic_notice_worker').hide();
					}
				}
				
				$rootCtnr.find('tbody[id=list] *').remove();

				var listElement = '<tr class="noData"><td colspan="3">검색 결과가 없습니다.</td></tr>';
				$rootCtnr.find('tbody[id=list]').append(listElement);
				
				$rootCtnr.find('.ksicTotalTxt').html($catchmentAreaMenu.ui.createTotalTxt());
				$rootCtnr.find('.ksicTotalCnt').html(totalCount);

				$rootCtnr.find('span[class=list] *').remove();
				$('#search_notice_nosel').hide();
				
				//$catchmentAreaKSIC.ui.toggleDisplay("list");			
			},
			//생활권역 설정 (직접입력)
			selfSelect : function (){
			    $('.self-select__con')
			        .hide()
			        .first()
			        .show();
			    $('.self-select__tab li').on('click', function (e) {
			        var cnt = $(this).index();
			        $(this).addClass('on');
			        $('.self-select__tab li').not(this).removeClass('on');
			        $('.self-select__con')
			            .hide()
			            .eq(cnt)
			            .stop()
			            .fadeIn();
			    });
			    $('.self-select__form').on('click', function (e) {

			    });
			},
			
			
			setPoiMapping : function(ksic_5_cd, selectBoxDomId){	// 상세분석 기능에서도 사용해야 함으로 파라미터(isDetail) 추가 - 박상언 2020-10-20 추가
				var getPoiMappingObj = new sop.portal.catchmentAreagetPoiMapping.api();
				getPoiMappingObj.addParam("ksic_5_cd", ksic_5_cd);
				getPoiMappingObj.request({
					method : "POST",
					async : true,
					url : "/ServiceAPI/OpenAPI3/catchmentArea/getPoiMappingList.json",
					options : {
						selectBoxDomId : selectBoxDomId
					}
				});
			},
			
			/**
			 * 
			 * @name         : setServiceAreaHeaderData
			 * @description  : 영향권 데이터 보드의 헤더정보를 표시한다.
			 * 
			 */
			setServiceAreaHeaderData : function(){ 
				var rangeType = $catchmentAreaMenu.ui.getRangeType();
				
				titleTypeTxt = titleTypeTxt + $("#statsType01 ul li").children("a")[$catchmentAreaDataBoard.ui.selectIndex-1].innerHTML;
				$("#titleTypeTxt_1").html(titleTypeTxt);
				$("#sec01RangeTxt").html(titleTypeTxt + ' 영역 면적');
				$("#sec01GridTxt").html('');
			},
			/**
			 * 
			 * @name         : setServiceAreaStatisticsData
			 * @description  : 영향권 통계정보 표출(데이터 보드)
			 * 
			 */
			setServiceAreaStatisticsData : function(result, options){
				$catchmentAreaMap.ui.isReportShow = true;
				$catchmentAreaMap.ui.isReportType = "srv";
				$catchmentAreaMenu.ui.isReportType = "srv";
				$catchmentAreaMenu.ui.statDataOption = options;
				
				var params = options.params;
				if(params.workGb == "areaSize"){
					//면적
					$("#areaSize").html($catchmentAreaMap.ui.comma((Number(result.areaSize[0].area_size) / 1000000).toFixed(2)) + "㎢");
				}
				
				if(params.workGb == "pops" || params.workGb == "s3"){
					if(result.pops[0] === null || result.pops[0].popsTotOgl == 0){
						$("#manPerBar").css("height", "100%");
						$("#womanPerBar").css("height", "86%");
						$catchmentAreaMenu.ui.resetAreaDataboard("pops", "B", true, true);
					}else{
						$(".sec02 .div_block").hide();
						
						//인구 - 차트
						var popsData = [];
						//var popsColor = ['#D66B44','#E28E49', '#EBA04E', '#F0AF52', '#F6BD58', '#F9CC60', '#FCDA70', '#FDE48B', '#FEEEB0', '#FEF4CC', '#FFFAE3'];
						var popsColor = ['#D66B44','#E28E49', '#EBA04E', '#F0AF52', '#F6BD58', '#F9CC60', '#FCDA70', '#FDE48B', '#FEEEB0'];
						popsData.push({name : "0~9세 인구", y : result.pops[0].age_1_cnt});
						popsData.push({name : "10~19세 인구", y : result.pops[0].age_2_cnt});
						popsData.push({name : "20~29세 인구", y : result.pops[0].age_3_cnt});
						popsData.push({name : "30~39세 인구", y : result.pops[0].age_4_cnt});
						popsData.push({name : "40~49세 인구", y : result.pops[0].age_5_cnt});
						popsData.push({name : "50~59세 인구", y : result.pops[0].age_6_cnt});
						popsData.push({name : "60~69세 인구", y : result.pops[0].age_7_cnt});
						popsData.push({name : "70~79세 인구", y : result.pops[0].age_8_cnt});
						popsData.push({name : "80세 이상 인구", y : result.pops[0].age_9_cnt});
	//					popsData.push({name : "90~99세 인구", y : result.pops[0].age_10_cnt});
	//					popsData.push({name : "100세이상 인구", y : result.pops[0].age_11_cnt});
		
						$catchmentAreaMenu.ui.createOnePieChart('popChart', popsData, popsColor, 210, 140);
					
						//인구 - 텍스트
						var totPpltnCnt = result.pops[0].tot_ppltn_cnt;
						var totPpltnCnt2 = result.pops[0].tot_ppltn_cnt2;
						var totPpltnCntOgl = result.pops[0].popsTotOgl;
						var popsArray = [result.pops[0].age_1_cnt, result.pops[0].age_2_cnt, result.pops[0].age_3_cnt, result.pops[0].age_4_cnt, result.pops[0].age_5_cnt, 
							result.pops[0].age_6_cnt,result.pops[0].age_7_cnt, result.pops[0].age_8_cnt, result.pops[0].age_9_cnt];
						var maxPop = Math.max.apply(null, popsArray); //최대값
						var perPop = (maxPop / totPpltnCnt * 100).toFixed(1); //백분율(반올림)
						if(isNaN(perPop)){
							perPop = 0;
						}
						var perPopTxt = "";
						$.each(popsData, function(index, item){
							if(item.y == maxPop){
								perPopTxt = item.name;
							}
						});
						var manCnt = result.pops[0].man_cnt;
						var womanCnt = result.pops[0].woman_cnt;
						var totalCnt = manCnt + womanCnt;
						
						$("#totPops").html($catchmentAreaMap.ui.comma(totalCnt) + '<span class="sa_txt04">명</span>');
						$("#perPopTxt").attr('data-total-ogl', totalCnt);												
						$("#perPopTxt").html('전체 인구 '+ $catchmentAreaMap.ui.comma(totalCnt) +'명 중  <span class= "color-red">'+perPopTxt + '<b>'+perPop+'%</b></span>');
						
						$("#manTtlCnt").html($catchmentAreaMap.ui.comma(manCnt) + "명");
						$("#womanTtlCnt").html($catchmentAreaMap.ui.comma(womanCnt) + "명");
						
						// 전체 인구에 대한 남여 인구 비율(변경)
						var manPer = (manCnt / totPpltnCnt2 * 100).toFixed(2);
						var womanPer = (womanCnt / totPpltnCnt2 * 100).toFixed(2);
						if((manPer + womanPer) > 100){
							if(manPer > womanPer){
								womanPer = womanPer - ((manPer + womanPer) - 100);
							}else if(womanPer > manPer){
								manPer = manPer - ((manPer + womanPer) - 100);
							}
						}
						$("#manPer").html(manPer + '%');
						$("#womanPer").html(womanPer + '%');
	
						if(manCnt > womanCnt){
							$("#manPerBar").css("height", "100%");
							$("#womanPerBar").css("height", (womanCnt / manCnt * 100 * 0.86).toFixed(0) + "%");						
						}else if(manCnt < womanCnt){
							$("#manPerBar").css("height", (manCnt / womanCnt * 100).toFixed(0) + "%");
							$("#womanPerBar").css("height", "86%");						
						}else{
							$("#manPerBar").css("height", "100%");
							$("#womanPerBar").css("height", "86%");
						}
						$('#perPopSquareTxt').html('전체 인구 '+ $catchmentAreaMap.ui.comma(totalCnt) +'명 중  <span class = "color-red">남자 '+manPer+ '%, 여자 ' + womanPer + '%</span>');
						$("#popBaseYear").html('(' + params.base_year + '년 기준)');
						
						// 인구 통계정보만 도형 툴팁용으로 사용
						var param = {};
						param.rangeType = params.rangeType;
						param.rangeVal = params.rangeVal;
						param.workGb = params.workGb;
						param.statsYear = params.base_year;
						param.statsVal = totalCnt;
						$catchmentAreaObj.addAttrToGeoInfo(param);
					}
				}
				
				if(params.workGb == "family" || params.workGb == "s3"){
					if(result.family[0] === null || result.family[0].familyTotOgl == 0){
						$catchmentAreaMenu.ui.resetAreaDataboard("family", "B", true, true); 
					}else{
						$(".sec03 .div_block").hide();
						
						//가구 - 차트
						var familyData = [];
						var familyColor = ['#ED5980', '#ffaa01','#7DB6E9'];
						familyData.push({name : "친족 가구", y : result.family[0].family_3_cnt});
						familyData.push({name : "1인 가구", y : result.family[0].family_1_cnt});
						familyData.push({name : "비친족 가구", y : result.family[0].family_2_cnt});
						
						
						
						$catchmentAreaMenu.ui.createOnePieChart('familyChart', familyData, familyColor, 210, 140);
						
						//가구 - 텍스트
						var familyArray = [result.family[0].family_1_cnt, result.family[0].family_2_cnt, result.family[0].family_3_cnt];
						var maxfamily = Math.max.apply(null, familyArray); //최대값
						var perfamily = (maxfamily / result.family[0].tot_family_cnt * 100).toFixed(1); //백분율(반올림)
						if(isNaN(perfamily)){
							perfamily = 0;
						}
						var perfamilyTxt = "";
						$.each(familyData, function(index, item){
							if(item.y == maxfamily){
								perfamilyTxt = item.name;
							}
						});
						
						$("#perFamilyTxt").attr('data-total', result.family[0].tot_family_cnt);
						$("#perFamilyTxt").attr('data-total-ogl', result.family[0].familyTotOgl);												
						$("#perFamilyTxt").html('전체 가구 수 ' + $catchmentAreaMap.ui.comma(result.family[0].familyTotOgl) + '가구 중 <span class = "color-red"> ' +perfamilyTxt  + '<b>'+perfamily+'%</b></span>');
						
					}
				}
				
				if(params.workGb == "house" || params.workGb == "s3"){
					if(result.house[0] === null || result.house[0].houseTotOgl  == 0){
						$catchmentAreaMenu.ui.resetAreaDataboard("house", "B", true, true);
					}else{
						$(".sec04 .div_block").hide();
						
						//주택 - 차트
						var houseData = [];
						var houseColor = ['#7DB6E9','#ffaa01','#93EC85','#fed747', '#35908F'];		// 주택이외의 거처: #ED5980
						houseData.push({name : "단독주택", y : result.house[0].house_1_cnt});
						houseData.push({name : "아파트", y : result.house[0].house_2_cnt});
						houseData.push({name : "연립주택", y : result.house[0].house_3_cnt});
						houseData.push({name : "다세대주택", y : result.house[0].house_4_cnt});
						houseData.push({name : "비거주용 건물 내주택", y : result.house[0].house_5_cnt});
						$catchmentAreaMenu.ui.createOnePieChart('houseChart', houseData, houseColor, 210, 140);
						
						//주택 - 텍스트
						var houseArray = [result.house[0].house_1_cnt, result.house[0].house_2_cnt, result.house[0].house_3_cnt, 
							result.house[0].house_4_cnt, result.house[0].house_5_cnt];		// result.house[0].house_6_cnt
						var maxhouse = Math.max.apply(null, houseArray); //최대값
						var perhouse = (maxhouse / result.house[0].tot_house_cnt * 100).toFixed(1); //백분율(반올림)
						if(isNaN(perhouse)){
							perhouse = 0;
						}
						var perhouseTxt = "";
						$.each(houseData, function(index, item){
							if(item.y == maxhouse){
								perhouseTxt = item.name;
							}
						});
						
						$("#perHouseTxt").attr('data-total', result.house[0].tot_house_cnt);
						$("#perHouseTxt").attr('data-total-ogl', result.house[0].houseTotOgl);													
						$("#perHouseTxt").html('전체 주택 수 ' +$catchmentAreaMap.ui.comma(result.house[0].houseTotOgl) + '호 중 <span class = "color-red">' +perhouseTxt + '<b>'+perhouse+'%</b></span>');
						$("#houseBaseYear").html('(' + params.base_year + '년 기준)');
					}
				}

				if(params.workGb == "copr"){
					var colorPalette = ['#D66B44','#ffaa01','#fed747','#D8C8B2','#0B2E5D','#2A7AC1','#7DB6E9','#91e8e1','#CBE9F0','#B82647','#ED5980','#D584B9','#F1B49A','#35908F','#6AB048','#90ed7d','#bdce3b','#6A5BA8','#8085e9','#434348','#7A7D7F'];
					var isRandomColor = false;
					
					//사업체&종사자 공통
					var coprDataTemp = deepCopy(result.copr);
					var coprData = [];
					var coprChartData = [];
					var totCoprCntOgl = 0;
					var totCoprCntForCalc;
					var workerData = [];
					var workerChartData = [];
					var totWorkerCntOgl = 0;
					var totWorkerCntForCalc;
					var clrIdx = 0;

					$.each(coprDataTemp, function(index, item){
						if(item.name == "전체"){							
							totCoprCntOgl = item.corp_cnt;
							totWorkerCntOgl = item.employee_cnt;
						}else if(item.name == "bsca_전체"){							
							totCoprCntForCalc = item.corp_cnt;
							totWorkerCntForCalc = item.employee_cnt;
						}else{
							coprData.push({name : item.name, y : item.corp_cnt, clr : clrIdx});
							workerData.push({name : item.name, y : item.employee_cnt, clr : clrIdx});
						}
						
						clrIdx = clrIdx + 1;
						if(clrIdx === colorPalette.length){
							clrIdx = 0;
						}
					});
					
					//사업체
					var totCoprCnt = 0;
					if(totCoprCntOgl === undefined || totCoprCntOgl === null){
						totCoprCntOgl = 0;
					}
					if(totCoprCntForCalc === undefined || totCoprCntForCalc === null){
						totCoprCntForCalc = totCoprCntOgl;	//바꾸지 말것
					}
					totCoprCnt = totCoprCntForCalc;		//totCoprCnt = totCoprCntOgl;
					
					coprData.sort(function (a, b) {
						return a.y > b.y ? -1 : a.y < b.y ? 1 : 0;						
					});

					var coprLoopCnt = coprData.length; 
					if(coprLoopCnt > 0){
						$(".sec05 .div_block").hide();
						
						var coprChartColor = new Array();						
						var top3CoprLoopCnt = (coprLoopCnt >= 3) ? 3 : coprLoopCnt;
						var top7CoprLoopCnt = (coprLoopCnt >= 3) ? 3 : coprLoopCnt;		// 7 -> 3
						var top3Coprcnt = 0;
						var top7Coprcnt = 0;
						for(var i=0; i < top7CoprLoopCnt; i++){		// top7 까지만
							if(i < top3CoprLoopCnt){
								// top3 합
								top3Coprcnt += coprData[i].y;
							}
							top7Coprcnt += coprData[i].y;
							coprChartData.push(coprData[i]);
							if(isRandomColor){
								coprChartColor.push(colorPalette[coprData[i].clr]);
							}else{
								coprChartColor.push(colorPalette[i]);								
							}
						}
						if(totCoprCnt < top3Coprcnt){
							// 머시기로 구한 총합이 탑3합보다 작으면  
							totCoprCnt = top3Coprcnt;
						}
						if(totCoprCnt < top7Coprcnt){
							// 머시기로 구한 총합이 탑7합보다 작으면  
							totCoprCnt = top7Coprcnt;
						}
						
						// top7 나머지
						var etcCoprCnt = totCoprCnt - top7Coprcnt;
						coprChartData.push({name : '기타 사업체', y : etcCoprCnt});
						coprChartColor.push('#E9E9E9');

						$catchmentAreaMenu.ui.createOnePieChart('coprChart', coprChartData, coprChartColor, 210, 140);
						
						// top3 범례 문구
						var perTotCopr, perCopr, eleCopr,sum_copr = 0;
						var $coprLgnd = $(".pop_statistics.pop_chk01 .sec05 .div_basic .txt_box03");
						for(var i=0; i < 3; i++){
							eleCopr = "top" + (i+1) + "_copr_txt";
							if(i < top3CoprLoopCnt){
								perTotCopr = (coprData[i].y / totCoprCnt  * 100).toFixed(1);
								if(isNaN(perTotCopr) || !isFinite(perTotCopr)){
									perTotCopr = 0;
								}
								perCopr = ( coprData[i].y / top3Coprcnt * 100).toFixed(1);
								if(isNaN(perCopr) || !isFinite(perCopr)){
									perCopr = 0;
								}
							
								$("#" + eleCopr).html((i+1) + '. '+ coprData[i].name + ' (전체 대비 '+perTotCopr+' %)');
								sum_copr += parseFloat($catchmentAreaMap.ui.comma(perTotCopr));
								if(isRandomColor){
									$coprLgnd.find('.cr0' + (i+1)).css("background", colorPalette[coprData[i].clr]);
								}else{
									$coprLgnd.find('.cr0' + (i+1)).css("background", colorPalette[i]);
								}
							}else{
								$("#" + eleCopr).html((i+1) + '. 사업체 통계 없음');
								$coprLgnd.find('.cr0' + (i+1)).css("background", "#d4d4d4");
							}
						}
						
						$("#totCopr").html('전체 사업체 수 '+$catchmentAreaMap.ui.comma(totCoprCntOgl)+'개 중 <span class = "color-red"> TOP3 사업체 <b>'+sum_copr.toFixed(1)+'%</b>'); //총사업체수
						$("#totCopr").attr('data-total', totCoprCnt);
						$("#totCopr").attr('data-total-ogl', totCoprCntOgl);
						$("#top3CoprPerAmongAll").html($catchmentAreaMap.ui.comma(top3Coprcnt) + "개");
						$("#coprBaseYear").html('(' + params.copr_base_year + '년 기준)');
					}else{
						// 화면 정리
						$catchmentAreaMenu.ui.resetAreaDataboard("copr", "B", true, true);
					}

					//종사자
					var totWorkercnt = 0;
					if(totWorkerCntOgl === undefined || totWorkerCntOgl === null){
						totWorkerCntOgl = 0;
					}
					if(totWorkerCntForCalc === undefined || totWorkerCntForCalc === null){
						totWorkerCntForCalc = totWorkerCntOgl;	//바꾸지 말것
					}
					totWorkercnt = totWorkerCntForCalc;		//totWorkercnt = totWorkerCntOgl;					

					workerData.sort(function (a, b) {
						return a.y > b.y ? -1 : a.y < b.y ? 1 : 0;						
					});

					var workerLoopCnt = workerData.length;
					if(workerLoopCnt > 0){
						$(".sec06 .div_block").hide();
						
						var workerChartColor = new Array();	
						var top3WorkerLoopCnt = (workerLoopCnt >= 3) ? 3 : workerLoopCnt;
						var top7WorkerLoopCnt = (workerLoopCnt >= 3) ? 3 : workerLoopCnt;		// 7 -> 3
						var top3Workercnt = 0;
						var top7Workercnt = 0;
						for(var i=0; i < top7WorkerLoopCnt; i++){		// top7 까지만
							if(i < top3WorkerLoopCnt){
								// top3 합
								top3Workercnt += workerData[i].y;
							}
							top7Workercnt += workerData[i].y;
							workerChartData.push(workerData[i]);
							if(isRandomColor){
								workerChartColor.push(colorPalette[workerData[i].clr]);
							}else{
								workerChartColor.push(colorPalette[i]);
							}
						}
						if(totWorkercnt < top3Workercnt){
							totWorkercnt = top3Workercnt;
						}
						if(totWorkercnt < top7Workercnt){
							totWorkercnt = top7Workercnt;
						}

						// top7 나머지
						var etcWorkerCnt = totWorkercnt - top7Workercnt;
						workerChartData.push({name : '기타 사업체', y : etcWorkerCnt});
						workerChartColor.push('#E9E9E9');
						
						$catchmentAreaMenu.ui.createOnePieChart('workerChart', workerChartData, workerChartColor, 210, 140);

						// top3 범례 문구
						var perTotWorker, perWorker, eleWorker, sum_worker = 0;
						var $workerLgnd = $(".pop_statistics.pop_chk01 .sec06 .div_basic .txt_box03");
						for(var i=0; i < 3; i++){
							eleWorker = "top" + (i+1) + "_worker_txt"; 
							if(i < top3WorkerLoopCnt){
								perTotWorker = (workerData[i].y / totWorkercnt  * 100).toFixed(1);
								if(isNaN(perTotWorker) || !isFinite(perTotWorker)){
									perTotWorker = 0;
								}
								perWorker = ( workerData[i].y / top3Workercnt * 100).toFixed(1);	
								if(isNaN(perWorker) || !isFinite(perWorker)){
									perWorker = 0;
								}
							
								$("#" + eleWorker).html((i+1) + '. '+ workerData[i].name + ' (전체 대비 '+perTotWorker+' %)');
								if(perTotWorker != undefined){
									sum_worker += parseFloat($catchmentAreaMap.ui.comma(perTotWorker));					
								}
								if(isRandomColor){
									$workerLgnd.find('.cr0' + (i+1)).css("background", colorPalette[workerData[i].clr]);
								}else{
									$workerLgnd.find('.cr0' + (i+1)).css("background", colorPalette[i]);
								}
							}else{
								$("#" + eleWorker).html((i+1) + '. 종사자 통계 없음');
								$workerLgnd.find('.cr0' + (i+1)).css("background", "#d4d4d4");
							}
						}

						$("#totWorker").html('전체 종사자 수 '+$catchmentAreaMap.ui.comma(totWorkerCntOgl) +'명 중 <span class = "color-red">TOP3 종사자 <b>'+sum_worker.toFixed(1)+'%</b></span>');//총종사자수
						$("#totWorker").attr('data-total', totWorkercnt);
						$("#totWorker").attr('data-total-ogl', totWorkerCntOgl);
						$("#top3WorkerPerAmongAll").html($catchmentAreaMap.ui.comma(top3Workercnt) + "명");
						
						$("#workerBaseYear").html('(' + params.copr_base_year + '년 기준)');
					}else{
						// 화면 정리
						$catchmentAreaMenu.ui.resetAreaDataboard("employee", "B", true, true);
					}			
				}
			},
			setBaseYearBox : function(pSelGb, pListGb, detailSelectBoxId, isDetailYear){
				// pSelGb: 1-영향권(인구/가구/주택), 2-영향권(사업체/종사자), 3-격자, 
				//							   4-그 외    ex) 상세분석(공간+시간), 상세분석(상관관계), 단 4번은 detailSelectBoxId 값, 즉 정확하게 해당 selectBox의 값을 줘야한다.	- pse 2020-10-20 작성
				//							   5-상관관계 분석
				// pListGb: A-인구/가구/주택, B-사업체/종사자, C-공시지가
				var $selObj;
				if(pSelGb == '1'){
					$selObj = $('#bYearSel01'); 
				}else if(pSelGb == '2'){
					$selObj = $('#bYearSel02'); 
				}else if(pSelGb == '3'){
					$selObj = $('#bYearSel03'); 
				}else if(pSelGb == '4') {
					$selObj = $('#bYearSel04');
				}else if(pSelGb == '5'){
					$selObj = $('#bYearSel05'); 
				}else if(pSelGb == '6'){
					$selObj = $('#bYearSel06'); //격자년도
				}
				if($selObj != null && $selObj!= undefined){
					$selObj.empty();
					var years;
					if(pListGb == 'A'){
						years = $catchmentAreaMap.ui.statsBaseYear01;												
					}else if(pListGb == 'B'){
						years = $catchmentAreaMap.ui.statsBaseYear02;												
					}else if(pListGb == 'C'){
						years = $catchmentAreaMap.ui.statsBaseYear03;												
					}
					
					for (var i = 0; i < years.length; i++) {				
						$selObj.append('<option value="'+years[i]+'">'+years[i]+'</option>');
					}
					
					if(!isDetailYear) {
						$selObj.val(years[0]).prop("selected", true);
						if(pSelGb == '1'){	
				        	var param = {};
				        	param.processGb = "sel";
				        	param.elemId = "#house_detail_menu_02 div";
				        	param.bClassCd = "SA" + years[1];
				        	
				        	$catchmentAreaMap.ui.getCodeData(param);
						}						
						
						if(pSelGb == '3' || pSelGb == '4'){						
							$selObj.trigger("change");
						}						
					}
				}
			},
			
			backBtn_common : function(flag){
				$('#slide-area .btn-slideup span').hide();
				if(flag == undefined){
					$(".map__search").animate({
		                'height' : '95%'
		            },400,function(){
		                $(".map__slideup").prop("style","box-shadow: 0px 1px 4px 0px rgb(133 133 133 / 35%);");
		                $(".swiper_menu.active").css("display", "block");
		            });
		            //지도 안 움직이는 오류 때문에 추가
		            $(".map__below").animate({
		                'height' : '90%'
		            },400,function(){
		                $(".swiper_menu.active").css("display", "block");
		                $(".map__facility__con").css("height", $(".map__search").css("height")*0.8);
		            });
		            $('.slide_down').css("display","block");
				}
	            $("#menu_4").removeClass("active");
	    		$("#menu_3").removeClass("active");
	    		$("#menu_2").removeClass("active");
	    		$("#menu_1").removeClass("active");
	    		
	    		$("#menu_4").css("display","none");
	    		$("#menu_3").css("display","none");
	    		$("#menu_2").css("display","none");
	    		$("#menu_1").css("display","none");
			},
			
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
				param.classDeg = $catchmentAreaMap.ui.classDeg;
				
				var options = $catchmentAreaMenu.ui.reqSetParams("API_202082", param);
				$catchmentAreaMenu.ui.requestOpenApi(options);
			},
			/**
			 * 
			 * @name         : setLifeBizList
			 * @description  : 생활업종 목록을 구성한다.
			 * 
			 */
			setLifeBizList : function(res, options) {
				var list = res.result.list;
				var html_cont = '<p id = "header_text">조회할 사업체 업종을 선택해 주십시오. </p>';
				html_cont += '<h4>주요 생활 업종</h4>';
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
							html_mem_cont += '</div>';
							
							html_cont = html_cont + html_mem_title + html_mem_cont;
						}						
						//음식 소매업 서비스 부분 (대분류)
						
						html_mem_title = '<div class ="select-ui">';
						html_mem_title += '<button type = "button" href="javascript:void(0);" class="roundTextBox" data-big-theme-cd="' + item.theme_cd + '">' + item.theme_cd_nm + ' (' + item.mem_cnt+ ') <img src="/mobile/resources/m2021/images/i_select--ui.png" alt="'+item.theme_cd_nm+'"></button>';
						html_mem_cont = '';
						upper_cd = item.theme_cd;
						upper_nm = item.theme_cd_nm;
					}else if(item.lvl === '2'){
						if(html_mem_cont === ''){
							html_mem_cont += '<div class="select-ui__con" data-big-theme-cd="' + upper_cd + '">';// select-ui__con
							html_mem_cont += '<ul class="life-industry__change__list">';
							html_mem_cont += '<li>';
							//목록 밑에 (소분류) ex 한식 중식 일식 분식
							html_mem_cont += '<a class="mightOverflow" data-ksic-sel-cd="' + item.theme_cd + '" data-ksic-sel-nm="' + item.theme_cd_nm + '">' + item.theme_cd_nm + '</a>';
							html_mem_cont += '</li>';	
							if(nxtItem !== undefined && nxtItem !== null && nxtItem["lvl"] === '2'){
								html_mem_cont += '<li>';
								html_mem_cont += '<a class="mightOverflow" data-ksic-sel-cd="' + nxtItem.theme_cd + '" data-ksic-sel-nm="' + nxtItem.theme_cd_nm + '">' + nxtItem.theme_cd_nm + '</a>';
								html_mem_cont += '</li>';	
							}
						}else{
							html_mem_cont += '<li>';
							html_mem_cont += '<a class="mightOverflow" data-ksic-sel-cd="' + item.theme_cd + '" data-ksic-sel-nm="' + item.theme_cd_nm + '">' + item.theme_cd_nm + '</a>';
							html_mem_cont += '</li>';	
							if(nxtItem !== undefined && nxtItem !== null && nxtItem["lvl"] === '2'){
								html_mem_cont += '<li>'
								html_mem_cont += '<a class="mightOverflow" data-ksic-sel-cd="' + nxtItem.theme_cd + '" data-ksic-sel-nm="' + nxtItem.theme_cd_nm + '">' + nxtItem.theme_cd_nm + '</a>';
								html_mem_cont += '</li>';		
							}
													
						}
						
						if(nxtItem !== undefined && nxtItem !== null && nxtItem["lvl"] === '2'){
							i++;
						}
					}
				}

				if(html_mem_cont !== ''){
					html_mem_cont += '</ul>';
					html_mem_cont += '</div>';
					html_mem_cont += '</div>';
					html_mem_cont += '<div>';
					html_mem_cont += '<p id = info_test_coor>주요 생활 업종은 한국표준산업분류(10차)를 일상생활에서 쉽게 이해할 수 있는 명칭을 사용해 재분류하였습니다.<br>업종 검색에서 한국산업표준분류 조회 기능을 이용하시면 더 많은 정보를 볼 수 있습니다.<p>';
					html_mem_cont += '</div>';
					
					html_cont = html_cont + html_mem_title + html_mem_cont;
				}
				
				
				$("#copr_detail_condition .life-industry__change__con").html(html_cont);
				$("#worker_detail_condition .life-industry__change__con").html(html_cont);
				
				$('.life-industry__change__con button').on('click', function (e) {
			        if($(this).hasClass('on')){
			            $(this).removeClass('on');
			            $(this).find('img').css('transform','rotate(-90deg)');
			            $(this).next().stop().slideUp();
			        }else{
			            $(this).addClass('on');
			            $(this).next().stop().slideDown();
			            $(this).find('img').css('transform','rotate(0deg)');
			            $('.life-industry__change__con button').not(this).next().stop().slideUp();
			            $('.life-industry__change__con button').not(this).removeClass('on');
			            $('.life-industry__change__con button').not(this).find('img').css('transform','rotate(-90deg)');
			        }	
			    });
				$('.select-ui__con .life-industry__change__list li a').on('click', function (e) {
					if($(this).hasClass('on')){
						$(this).removeClass('on');
					}else{
						$(".select-ui__con .life-industry__change__list li a").removeClass('on');
						$(this).addClass('on');
					}	
				});
			},
			/**
			 * 
			 * @name         : searchKSIClist
			 * @description  : 검색 조건을 만족하는 한국표준산업분류 목록을 요청한다.
			 * 
			 */
			searchKSIClist : function(pObj) {
				var param = pObj;
				if(param === undefined || param === null){
					param = {};								
				}
				
				// searchKSIClist 에서 지정(화면 내 설정해주는 곳이 없어서)
				param.workGb = "S";
				
				if(!param.hasOwnProperty("classDeg")){
					param.classDeg = $catchmentAreaMap.ui.classDeg;
				}
				if(!param.hasOwnProperty("pageSize")){
					param.pageSize = $catchmentAreaMenu.ui.curpageSize;
				}
				// searchKSIClist 에서 지정 end
				
				if(!param.hasOwnProperty("pageNo")){
					param.pageNo = $catchmentAreaMenu.ui.curPageNo;
				}
				if(!param.hasOwnProperty("schWord")){
					param.schWord = $catchmentAreaMenu.ui.curSearchWord;
				}
				if(!param.hasOwnProperty("schMinDepth")){
					param.schMinDepth = $catchmentAreaMenu.ui.schMinDepth;
				}

				var options = $catchmentAreaMenu.ui.reqSetParams_KSIC("API_202081", param);
				$catchmentAreaMenu.ui.requestOpenApi(options);
			},
			/**
			 * 
			 * @name         : setGridDetailConfigure
			 * @description  : 격자상세조건을 파라미터로 들어온 객체에 부여해준다.
			 * 
			 */
			createSolidGaugeChart : function (target, itemCnt, totCnt, pWidth, pHeight , area_tot) {
				var series_enabled = false;
				var unitNm = "명";
				var tooltip_enabled = false;
				var dataLabels_enabled = true;
				var pass = false;
				if(target == 'familyChart' || target == 'familyCChart' || target == 'familyDChart_02'){
					unitNm = "가구";
				}else if(target == 'houseChart' || target == 'houseCChart' || target == 'houseDChart02' || target == 'houseDChart03'  || target == 'houseDChart04' ){
					unitNm = "호";
				}else if(target == 'coprChart' || target == 'coprCChart' || (target == 'copr_work_DChart' && $('#statistics_topic option:selected').val() == 'copr') || (target == 'copr_work_DChart02' && $('#statistics_topic option:selected').val() == 'copr')){
					unitNm = "개";
				}
				if(target == 'popDChart' || target == 'popChart_Gender' || target == 'familyDChart_02' || target == 'houseDChart02' || target == 'houseDChart03' || target == 'houseDChart04'){
					$('#static_from, #static_from_family, #static_from_house_all, #static_from_house_year, #static_from_size').html('<b class = "color-red">기초자료 </b>: 통계청, 「인구주택총조사」');
					if(target == 'houseDChart02'){
						$('#static_from_size').show();
						//$('#static_from_house_all').show();
					}else if(target == 'houseDChart03'){
						$('#static_from_size').hide();
						$('#static_from_house_year').show();
					}else if(target == 'houseDChart04'){
						$('#static_from_size').show();						
					}
				}else{
					$('#static_from_all').html('<b class = "color-red">기초자료</b> : 통계청, 「전국사업체조사」');
				}
				
				var seriesColors = [];
				var ratio = (itemCnt / totCnt * 100).toFixed(1);
				var backgroundColor = "#EEE"
				if(isNaN(ratio)){
					ratio = 0;
				}
				var $lgnd = $("#"+target).siblings('.txt_box03').find('.cr02');
				var title_text = "전체";
				var data;
				var serise_color;
				
				if(target == "popChart_Gender"){
					seriesColors.push("#95ceff");
					$lgnd.css("background", $catchmentAreaMap.ui.saShpColor[0]);
					
					if($('#people_age_unit > a.on').text() === '전체'){
						title_text += "<br>영역 내 전체 <br>"+ $catchmentAreaMap.ui.comma(area_tot) + unitNm;						
					}else{					
						title_text += "<br>영역 내 "+ $(".age_select_con > button.on").text() +" <br>"+ $catchmentAreaMap.ui.comma(area_tot) + unitNm;
					}
					
					$('#highcharts-79').css('height','140px !important')
					var men = (itemCnt[1] / (itemCnt[1] + itemCnt[0]))*100;					
					var women = (itemCnt[0] / (itemCnt[1] + itemCnt[0]))*100;
					serise_data = [[String(women.toFixed(1)) + "%",itemCnt[0] ], [ String(men.toFixed(1)) + "%" , itemCnt[1] ]];
					serise_color = ["#95ceff","#EF595C"];
					pass = true;
					dataLabels_enabled = false;
				}else if(target == "houseDChart"){
					serise_color = ["#60bc4c","#ffaa01","#ed5980"];
					pass =true;
				}else{
					if(target == "familyDChart_02" || target == "houseDChart02" || target == "houseDChart03" || target == "houseDChart04" || target == "copr_work_DChart" || target == "copr_work_DChart02"){
						$(".selected_option_text").text("선택한 조건 : " + $("#detail_condtion_txt").text() + ' ' +ratio + '%');
						
						var standard_date = $("#bYearSel03 option:selected").val();
						var condition_date = $("#house_detail_menu_02 > .distance_select__con > button.on").text();
						var year_landsize = $("#house_detail_floor_area > button.on").text();
						var coor_work = $("#detail_condtion_txt").text();
						
						series_enabled = true;
						
						if(target == "familyDChart_02"){
							$(".dChartTextHl02").html('선택한 세대 구성의 가구 수 : <b> ' + $catchmentAreaMap.ui.comma(itemCnt) +'가구</b>');
						}else if(target == "houseDChart02"){						
							if($(".distance_select__con > button.on").text() == "전체" || $("#detail_condtion_txt").text() == "주택유형(전체)"){
								$(".dChartTextHl02").text('주택 종류별 규모');
							}else{
								$(".dChartTextHl02").html('선택한 주택 종류의 주택 수 : <b> '+ $catchmentAreaMap.ui.comma(itemCnt) +'호</b>');
								title_text = "<br>영역 내 전체 <br>"+ $catchmentAreaMap.ui.comma(totCnt) + unitNm;
							}
						}else if(target == "houseDChart03"){
							$(".dChartTextHl03").html("주택 건축 연도 " + condition_date +" 주택 수 : <b>" + $catchmentAreaMap.ui.comma(itemCnt) +"호</b>" );
							$(".selected_option_text").html(standard_date +"년 기준 건축 연도가 " + condition_date +"인 주택 구성비 " +((itemCnt/totCnt)*100).toFixed(1) +"%</b>" );
							$("#houseTotTitle").html(standard_date+"년 기준 주택 종류별 주택 수"); //SGIS4_220215_생활권역 수정
						}else if(target == "houseDChart04"){
							$(".dChartTextHl03").html("주택 연면적 "+ year_landsize + "이하 주택 수 : <b>"+ $catchmentAreaMap.ui.comma(itemCnt) + "호</b>" );
							$(".selected_option_text").html("기준 연도 " + standard_date +"년 연면적 " + year_landsize + "인 주택 구성비" +((itemCnt/totCnt)*100).toFixed(1) +"%</b>" );
						}else if(target == "copr_work_DChart" || target == "copr_work_DChart02"){
							if($('#statistics_topic option:selected').attr('data-stat-type') == 'copr'){
								$(".dChartTextHl03").html(coor_work + " 사업체 수 : <b>" +  $catchmentAreaMap.ui.comma(itemCnt) + "개<b>");
								$("#coprTotTitle").html($(".select-ui > button.on").text().split(" ")[0] + " 업종 사업체 수 " );
								$(".selected_option_text").html(coor_work + "  <b>  "  +((itemCnt/totCnt)*100).toFixed(1) +"%</b>"); 
								$(".dcopr_or_employee_txt").text(" 사업체");
							}else if($('#statistics_topic option:selected').attr('data-stat-type') == 'employee'){
								$(".dChartTextHl03").html(coor_work + " 종사자 수 : <b>" +  $catchmentAreaMap.ui.comma(itemCnt) + "명<b>");
								$("#coprTotTitle").html($(".select-ui > button.on").text().split(" ")[0] + " 업종 종사자 수 " );
								$(".selected_option_text").html(coor_work + "  <b>  "  +((itemCnt/totCnt)*100).toFixed(1) +"%</b>");
								$(".dcopr_or_employee_txt").text(" 종사자");
							}
						}
					}
					
					if(ratio <= 20){
						seriesColors.push($catchmentAreaMap.ui.saShpColor[2]);
						$lgnd.css("background", $catchmentAreaMap.ui.saShpColor[2]);
						$(".selected_option_bg").css("background", $catchmentAreaMap.ui.saShpColor[2]);
					}else if(ratio <= 70){
						seriesColors.push($catchmentAreaMap.ui.saShpColor[3]);
						$lgnd.css("background", $catchmentAreaMap.ui.saShpColor[3]);
						$(".selected_option_bg").css("background", $catchmentAreaMap.ui.saShpColor[3]);
					}else{
						seriesColors.push($catchmentAreaMap.ui.saShpColor[0]);
						$lgnd.css("background", $catchmentAreaMap.ui.saShpColor[0]);
						$(".selected_option_bg").css("background", $catchmentAreaMap.ui.saShpColor[0]);
					}
					title_text = "<br>영역 내 전체 <br>"+ $catchmentAreaMap.ui.comma(totCnt) + unitNm;
					pass = false;
				}
				
				if(pass){
					$("#"+target).highcharts({ 
						chart: {
			  				type: 'pie',
			  				spacing: [-20, 0, 20, 0],		// [14, 10, 11, 10]
							width: pWidth,
							height: pHeight*1.5
			  			},
			  			title: {
			  				text : title_text,
					    	textsize : "12px",
					    	align : 'center',
					    	verticalAlign : 'middle'
			  			},
			  			tooltip: {
			  				enabled : false
			  		    },
			  			exporting: {
			  		        enabled: false
			  		    },
			  			plotOptions: {
			  				pie: {
							      dataLabels: {
							    	  enabled: dataLabels_enabled,
						                distance: -20,
						                style: {
						                    color: '#333333',
						                    fontweight : '"Noto Sans KR", sans-serif'
						                }
							      },
							      startAngle: -90,
							      endAngle: 90,
							      center: ['50%', '75%'],
							      size: '110%'
							    }
		               },
		               series: [{
			  				size: '100%',
			  			    innerSize: '67%',
			  			    colors : serise_color,
						    data: serise_data 
			  			}]
					});
				
				}else{
					$("#"+target).highcharts({
					    chart: {
					        type: 'solidgauge',
					        spacing: [-20, 0, 20, 0],		// [14, 10, 11, 10]
							width: pWidth,
							height: pHeight
					    },

					    title: {
					    	text : title_text,
					    	textsize : "12px",
					    	align : 'center',
					    	verticalAlign : 'middle'
					    },

					    pane: {
					        center: ['50%', '85%'],
					        size: '130%',
					        startAngle: -90,
					        endAngle: 90,
					        background: {
					            backgroundColor: backgroundColor,
					            innerRadius: '67%',
					            outerRadius: '100%',
					            shape: 'arc'
					        }
					    },

					    exporting: {
					        enabled: false
					    },

					    tooltip: {
					        enabled: false
					    },

					    yAxis: {
					        lineWidth: 0,
					        tickWidth: 0,
					        minorTickInterval: null,
					        min: 0,
					        max: (totCnt < itemCnt ? itemCnt : totCnt),				        
					        title: {
					            text: ''
					        },
					        labels: {
					            //y: 16
					        	enabled: false
					        }
					    },

					    plotOptions: {
					        solidgauge: {
					            dataLabels: {
					                y: 5,
					                borderWidth: 0,
					                useHTML: true
					            }
					        }
					    },

					    credits: {
					        enabled: false
					    },
					    
					    series: [{
					        name: '',
					        radius: '100%',
					        innerRadius: '67%',
					        data: [{
					        	y: itemCnt
					        }],
					        colors: seriesColors,
					        dataLabels: {
					        	enabled: false,
					            format:
					                '<div style="text-align:left">' +
					                '<span style="font-size:15px">'+ ratio +'%</span>' +
					                '</div>'
					        },
					        tooltip: {
					            valueSuffix: ' ' + unitNm
					        }
					    }]	
		    			    
					});
				}	
				
			},createTable_house : function(totdata,selected_data){
				
				var selected;
				var html_area = " ";
				var min = 0;
				var per = 0.0;
				var html_selected = '';
				
				html_area += "<tr class = 'on'>"
				html_area += '<td colspan="2">영역 내 전체</td>  ';
				html_area += ' <td> ' + $catchmentAreaMap.ui.comma(totdata) + '</td> ';
				html_area += ' <td>100.0</td> ';
				html_area += '</tr>';
				html_area += "<tr class = 'on' id = 'selected_house_table'>";
				html_area += '</tr>';
				for(var a = 0; a < $("#house_detail_type button.on").length; a++){
					selected = $("#house_detail_type button.on:eq("+a+")");
					html_area += "<tr>			";
					html_area += "<td></td>		";
					if(selected.text() == "단독주택"){
						min += selected_data["h01_cnt"];
						per += selected_data["h01_cnt"]/totdata;
						html_area += "<td>단독주택   </td>		";
						html_area += "<td>"+$catchmentAreaMap.ui.comma(selected_data["h01_cnt"]) +"   </td>		";
						html_area += "<td>"+ ((selected_data["h01_cnt"]/totdata)*100).toFixed(1) +"   </td>		";

					}else if(selected.text() == "아파트"){
						min += selected_data["h02_cnt"];
						per += selected_data["h02_cnt"]/totdata;
						html_area += "<td>아파트   </td>		";
						html_area += "<td>"+$catchmentAreaMap.ui.comma(selected_data["h02_cnt"]) +"   </td>		";
						html_area += "<td>"+ ((selected_data["h02_cnt"]/totdata)*100).toFixed(1) +"   </td>		";

					}
					else if(selected.text() == "연립주택"){
						min += selected_data["h03_cnt"];
						per += selected_data["h03_cnt"]/totdata;
						html_area += "<td>연립주택   </td>		";
						html_area += "<td>"+$catchmentAreaMap.ui.comma(selected_data["h03_cnt"]) +"   </td>		";
						html_area += "<td>"+ ((selected_data["h03_cnt"]/totdata)*100).toFixed(1) +"   </td>		";

					}else if(selected.text() == "다세대주택"){
						min += selected_data["h04_cnt"];
						per += selected_data["h04_cnt"]/totdata;
						html_area += "<td>다세대주택   </td>		";
						html_area += "<td>"+$catchmentAreaMap.ui.comma(selected_data["h04_cnt"]) +"   </td>		";
						html_area += "<td>"+ ((selected_data["h04_cnt"]/totdata)*100).toFixed(1) +"   </td>		";

					}else if(selected.text() == "비 거주용 건물내 주택"){
						min += selected_data["h05_cnt"];
						per += selected_data["h05_cnt"]/totdata;
						html_area += "<td>비 거주용 건물내 주택   </td>		";
						html_area += "<td>"+$catchmentAreaMap.ui.comma(selected_data["h05_cnt"]) +"   </td>		";
						html_area += "<td>"+ ((selected_data["h05_cnt"]/totdata)*100).toFixed(1) +"   </td>		";

					}
					
					html_area += "</tr>";
				}
				html_area += "<tr class = 'on' id = 'selected_house_table_unselected'>";
				html_area += "<td colspan='2'>선택하지 않은 조건</td>";
				html_area += "<td>"+ $catchmentAreaMap.ui.comma(totdata - min) +"</td>";
				html_area += "<td>"+ (100.0 - (per*100)).toFixed(1) +"</td>";
				html_area += "</tr>";
				$('#house_table_tbody').html(html_area);
				
				html_selected += '<td colspan="2">선택한 조건 </td>  ';
				html_selected += '<td> ' + $catchmentAreaMap.ui.comma(min) + '</td> ';
				html_selected += '<td>' + ((per*100)).toFixed(1)+'</td> ';
				$('#selected_house_table').html(html_selected);
				
				var color = $('.selected_option_bg').css('background');
				$('#selected_house_table').css('background', color);
				$('#selected_house_table_unselected').css('background', '#f7f7f7');
			},
			createTable_family : function(totdata,selected_data){
				
				var selected;
				var html_area = " ";
				var min = 0;
				var per = 0.0;
				var html_selected = '';
				
				html_area += "<tr class = 'on'>"
				html_area += '<td colspan="2">영역 내 전체</td>  ';
				html_area += '<td> ' + $catchmentAreaMap.ui.comma(totdata) + '</td> ';
				html_area += '<td>100.0</td> ';
				html_area += '</tr>';
				
				html_area += "<tr class = 'on' id = 'selected_furniture_table'>"
			    html_area += '</tr>'

			    	for(var a = 0; a < $(".furniture_select.on").length; a++){
					selected = $(".furniture_select.on:eq("+a+")");
					html_area += "<tr>			";
					html_area += "<td></td>		";
					if(selected.text() == "전체"){
						var tot = selected_data["f04_cnt"] + selected_data["f05_cnt"] + selected_data["f06_cnt"] + selected_data["f07_cnt"];
						html_area += "<td>친족 가구(전체)   </td>		";
						html_area += "<td>"+ $catchmentAreaMap.ui.comma(tot) +"   </td>		";
						html_area += "<td>"+ ((tot/totdata)*100).toFixed(1) +"   </td>		";
					}if(selected.text() == "1세대"){
						min += selected_data["f04_cnt"];
						per += selected_data["f04_cnt"]/totdata;
						html_area += "<td>친족 가구(1세대)   </td>		";
						html_area += "<td>"+ $catchmentAreaMap.ui.comma(selected_data["f04_cnt"]) +"   </td>		";
						html_area += "<td>"+ ((selected_data["f04_cnt"]/totdata)*100).toFixed(1) +"   </td>		";

					}else if(selected.text() == "2세대"){
						min += selected_data["f05_cnt"];
						per += selected_data["f05_cnt"]/totdata;
						html_area += "<td>친족 가구(2세대)   </td>		";
						html_area += "<td>"+$catchmentAreaMap.ui.comma(selected_data["f05_cnt"]) +"   </td>		";
						html_area += "<td>"+ ((selected_data["f05_cnt"]/totdata)*100).toFixed(1) +"   </td>		";

					}else if(selected.text() == "3세대"){
						min += selected_data["f06_cnt"];
						per += selected_data["f06_cnt"]/totdata;
						html_area += "<td>친족 가구(3세대)   </td>		";
						html_area += "<td>"+$catchmentAreaMap.ui.comma(selected_data["f06_cnt"]) +"   </td>		";
						html_area += "<td>"+ ((selected_data["f06_cnt"]/totdata)*100).toFixed(1) +"   </td>		";

					}else if(selected.text() == "4세대 이상"){
						min += selected_data["f07_cnt"];
						per += selected_data["f07_cnt"]/totdata;
						html_area += "<td>친족 가구(4세대)   </td>		";
						html_area += "<td>"+$catchmentAreaMap.ui.comma(selected_data["f07_cnt"]) +"   </td>		";
						html_area += "<td>"+ ((selected_data["f07_cnt"]/totdata)*100).toFixed(1) +"   </td>		";

					}else if(selected.text() == "비친족 가구"){
						min += selected_data["f02_cnt"];
						per += selected_data["f02_cnt"]/totdata;
						html_area += "<td>비친족 가구	   </td>		";
						html_area += "<td>"+$catchmentAreaMap.ui.comma(selected_data["f02_cnt"]) +"   </td>		";
						html_area += "<td>"+ ((selected_data["f02_cnt"]/totdata)*100).toFixed(1) +"   </td>		";

					}else if(selected.text() == "1인 가구"){
						min += selected_data["f01_cnt"];
						per += selected_data["f01_cnt"]/totdata;
						html_area += "<td>1인 가구		   </td>		";
						html_area += "<td>"+$catchmentAreaMap.ui.comma(selected_data["f01_cnt"]) +"   </td>		";
						html_area += "<td>"+ ((selected_data["f01_cnt"]/totdata)*100).toFixed(1) +"   </td>		";

					}
					html_area += "</tr>";
				}
				html_area += "<tr class = 'on' id = 'selected_furniture_table_unselected'>";
				html_area += "<td colspan='2'>선택하지 않은 조건</td>";
				html_area += "<td>"+ $catchmentAreaMap.ui.comma(totdata - min) +"</td>";
				html_area += "<td>"+ (100.0 - (per*100)).toFixed(1) +"</td>";
				html_area += "</tr>";
				
				$('#family_table_tbody').html(html_area);
			
				html_selected += '<td colspan="2">선택한 조건 </td>  ';
				html_selected += '<td> ' + $catchmentAreaMap.ui.comma(min) + '</td> ';
				html_selected += '<td>' + ((per*100)).toFixed(1)+'</td> ';
				$('#selected_furniture_table').html(html_selected);
				var color = $('.selected_option_bg').css('background');
				$('#selected_furniture_table').css('background', color);
				$('#selected_furniture_table_unselected').css('background', '#f7f7f7');
				
			},
			createTable_copr : function(coprCategories,coprData,dataType){
				
				var html_area = " ";
				var classification = [];
				var unit = '';
				var table_unit = '';
				if(dataType == 'copr'){
					unit = '사업체 수';
					table_unit = '개';
				}else if(dataType == 'employee'){
					unit = '종사자 수';
					table_unit = '명';
				}
				
				if(coprCategories.length > 5){
					for(var i = 0; i < coprCategories.length; i++){
						classification.push(coprCategories[i]);
					}
				}else{
					classification = ['대분류','중분류','소분류','세분류','세세분류'];
				}
				$('#copr_table_unit').text(unit);
				$('#copr_employee_table_unit').text('(단위 : '+ table_unit +')');
				for(var a = 0; a < coprCategories.length; a++){
					selected = $(".furniture_select.on:eq("+a+")");
					if(a == coprCategories.length-1){
						html_area += "<tr id = 'selected_copr_table'>			";
					}else{
						html_area += "<tr>			";
					}
					html_area += '<td>'+ classification[a]+'</td>';
					html_area += '<td colspan="2" class = "text-align-left">'+ coprCategories[a] +'</td>';
					html_area += '<td>'+ coprData[a] +'</td>';
					html_area += '</tr>';
				}
				$('#copr_table_tbody').html(html_area);
				
				var color = $('.selected_option_bg').css('background');
				$('#selected_copr_table').css('background', color);
			},
			/**
			 * 
			 * @name         : settingGridAreaMap
			 * @description  : 격자맵
			 * 
			 */
			settingGridAreaMap : function(base_year, rangeType){

				$catchmentAreaMenu.ui.clearLayers();
				var polyPoints = [];
				var param  = {};
				param.base_year = base_year;
				param.classDeg = $catchmentAreaMap.ui.classDeg; 
				var gridLvl = $("input:radio[name=grid_level_radio]:checked").attr("data-gridLevelDiv");
				if(gridLvl == undefined || gridLvl == null){
					caMessageAlert.open("알림", "격자크기를 선택해주십시오.");
					return false;					
				}				
				param.grid_level = gridLvl;
				param.grid_level_nm = $("input:radio[name=grid_level_radio]:checked").attr("grid_level_radio");
				this.gridMapRequestor = "grid";
				
				var rangeVal;
				if($('#grid_standard_btn button.on').val() == 0){
					if(rangeType == "stats_radio_t_grid"){
						rangeVal = $("#type_t_grid li.active").attr('data-value');
					}else if(rangeType == "stats_radio_d_grid"){
						rangeVal = $("#type_d_grid li.active").attr('data-value');
					}else if(rangeType == "stats_radio_r_grid"){
						rangeVal = $("#type_r_grid li.active").attr('data-value');
					}
				}else if($('#grid_standard_btn button.on').val() == 1){
					if(rangeType == "stats_radio_t_grid"){
						rangeVal = $('#grid_setting_selected_1 .self-select__circle.bg-red.active').attr("data-value");
					}else if(rangeType == "stats_radio_d_grid"){
						rangeVal = $('#grid_setting_selected_2 .self-select__circle.bg-red.active').attr("data-value");
					}else if(rangeType == "stats_radio_r_grid"){
						rangeVal = $('#grid_setting_selected_3 .self-select__circle.bg-red.active').attr("data-value");
					}
				}
				param.rangeType = rangeType;
				param.rangeVal = rangeVal;
				
				
				param.statType = $("#statistics_topic_grid option:selected").attr("data-stat-type");
				this.setGridStatConfigure(param,'gridSetting');
				var identifier = new Date().getTime();								
				param.identifier = identifier;
				var remainCnt = 2;		// 통합 조회로 바꾸면 1로 수정

				if(rangeType == "stats_radio_t_grid" || rangeType == "stats_radio_d_grid"){
					var selectLength = 0;
					var polygonPoints = $catchmentAreaMenu.ui.selectPolygonPointsArr[selectLength];
					
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
					var params_1 = $catchmentAreaMenu.ui.reqSetParams("API_202007", param);
					$catchmentAreaMenu.ui.requestOpenApi(params_1);
					
					//데이터보드 통계조회
					var params_2 = $catchmentAreaMenu.ui.reqSetParams("API_202010", param);
					$catchmentAreaMenu.ui.requestOpenApi(params_2);
					
				}else{
					//포인트, 반경기준
					var selectRange = $catchmentAreaMenu.ui.selectRangeArr[0];
					var area = 'POINT('
						area += $catchmentAreaMenu.ui.selectCoordinate_x + " " + $catchmentAreaMenu.ui.selectCoordinate_y;
						area += ')';
						
					param.area = area;
					param.radius = selectRange;
					param.srvAreaType = 2;
					
					//지도 통계조회
					var params_1 = $catchmentAreaMenu.ui.reqSetParams("API_202007", param);
					$catchmentAreaMenu.ui.requestOpenApi(params_1);
					
					//데이터보드 통계조회
					var params_2 = $catchmentAreaMenu.ui.reqSetParams("API_202010", param);
					$catchmentAreaMenu.ui.requestOpenApi(params_2);
					
				}
	
			},
			setGridStatConfigure : function(param) {	//{statType:"pops"} , gridSettingForDetail
				
				var schCondNm = "";
				var show1, show2;
				if(param.statType == "pops"){//인구
					//성별
					if($('#menu_5').hasClass('active')){
						var simple = $("#people_detail_condition .point__radio.d-flex input[name = people]:checked");
						show1 = "성별";
						$("#people_detail_condition .point__radio.d-flex input[name = people]:checked").attr('data-value');
						
						if($("#people_detail_condition .point__radio.d-flex input[name = people]:checked").attr('data-value') != "00"){
							param.gender = simple.attr('data-value'); 
							show1 = show1 + "(" + $("label[for='"+simple.attr("id")+"'] p").text() + ")";
						}else{
							show1 = show1 + "(전체)";
						}
					}
					//연령
					show2 = "연령";

					if($("#people_age_unit a:eq(1)").hasClass("on")){
						param.ageFromCd = $("#5_age_unit div button.on").attr("data-value");
						show2 = show2 + "(" + $("#5_age_unit div button.on").text() + ")";
						$catchmentAreaMenu.ui.dStatType = "age_5";
					}else if($("#people_age_unit a:eq(2)").hasClass("on")){
						var selAgeVal = $("#10_age_unit div button.on").attr("data-value");
						var ageVals = selAgeVal.split('_');						
						if(ageVals.length >= 2){
							param.ageFromCd = ageVals[0];
							param.ageToCd = ageVals[1];							
						}else if(ageVals.length == 1){
							param.ageFromCd = ageVals[0];
						}

						show2 = show2 + "(" + $("#10_age_unit div button.on").text() + ")";
						$catchmentAreaMenu.ui.dStatType = "age_10";
					}else if($("#people_age_unit a:eq(3)").hasClass("on")){
						var selAgeVal = $("#important_age_unit div button.on").attr("data-value");	
						var ageVals = selAgeVal.split('_');						
						if(ageVals.length >= 2){
							param.ageFromCd = ageVals[0];
							param.ageToCd = ageVals[1];							
						}else if(ageVals.length == 1){
							param.ageFromCd = ageVals[0];
						}
						
						show2 = show2 + "(" + $("#important_age_unit div button.on").text() + ")";
						$catchmentAreaMenu.ui.dStatType = "age_define";
					}else{
						show2 = show2 + "(전체)";
					}
					if($('#default_type_select button.on').val() == 0){
						schCondNm = show2; 
					}else if($('#default_type_select button.on').val() == 1){
						schCondNm = show1 + ' ' + show2;
					}
					
					param.filterParam = "ppltn_cnt";
					param.unit = "명";
				}else if(param.statType == "family"){//가구
					show1 = "";
					if($("#furniture_all").hasClass("on")) {
						show1 = "전체가구";
					}else{
						var $selList = $(".furniture_select.on");
						var householdType = "";
						var relative = [];
						var unrelative = [];
						var relative_str = "친족가구(";
						var unrelative_str = "";
						var length = $selList.length -2;
						$selList.each(function(){
							if($(this).attr("data-value") !== undefined && $(this).attr("data-value") !== ""){
								householdType += $(this).attr("data-value") + ",";
								if($(this).text() == '1세대' || $(this).text() == '2세대' || $(this).text() == '3세대' || $(this).text() == '4세대 이상'){
									relative.push($(this).text());
								}else{
									unrelative.push($(this).text());
								}
							}
						});
						
						if(relative.length > 0){
							for(var a = 0; a < relative.length; a++){
								relative_str += relative[a];
								if(a == (relative.length - 1)){
									relative_str += '),';
								}else{
									relative_str += ',';
								}
							}
							show1 += relative_str;
						}
						
						if(unrelative.length > 0){
							for(var a = 0; a < unrelative.length; a++){
								unrelative_str += unrelative[a] + ',';
							}
							show1 += unrelative_str;
						}
						
						if(householdType != ""){
							householdType = householdType.substr(0, householdType.length - 1);
							show1 = show1.substr(0, show1.length - 1);
						}
						
						param.householdType = householdType;
					}
					
					schCondNm = "세대구성(" + show1 + ")";
					param.filterParam = "family_cnt";
					param.unit = "가구";
				}else if(param.statType == "house"){//주택
					show1 = "";
					if($("#house_detail_condition_menu a.on").attr("data-value") == "1"){
						var $cyOpt = $("#house_detail_menu_02 .distance_select__con.col-4 button.on");
						if($cyOpt.attr("data-value") != ""){
							param.const_year = $cyOpt.attr("data-value");
							
							show1 = "건축년도(" + $cyOpt.text() + ")";
						}
						//$catchmentAreaMenu.ui.dStatType = "const_year";
					}else if($("#house_detail_condition_menu a.on").attr("data-value") == "2"){
						var $cyOpt = $("#house_detail_menu_03 div button.on");
						if($cyOpt.attr("data-value") != ""){
							param.house_area_cd = $cyOpt.attr("data-value");
							
							show1 = "연면적(" + $cyOpt.text() + ")";
						}
						$catchmentAreaMenu.ui.dStatType = "area";
					}else{
						if($("#house_detail_menu_01 div button.on").length !== 0 ) {	
							var $selList = $("#house_detail_menu_01 div").children("button.on");
							var rdResidType = "";
							
							$selList.each(function(){
								rdResidType += $(this).attr("data-value") + ",";
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
						show1 = "주택유형(" + show1 + ")";		
						$catchmentAreaMenu.ui.dStatType = "resid_type";
					}
					
					schCondNm = show1;					
					
					param.filterParam = "resid_cnt";
					param.unit = "호";
	
				}else if(param.statType == "copr" || param.statType == "employee"){		//사업체 or 종사자
					
					param.grdstatType = param.statType;
					var $li;
					
					param.isLifeBiz = "N";
					if((($("input[name='industry_area']:checked").attr("id") == "industry1_grid") && ($('#menu_5').hasClass('active')))||(($("input[name='industry']:checked").attr("id") == "industry1") && ($('#menu_4').hasClass('active')))){	//주요생활업종			
						if(param.statType == "copr"){
							var $selItm = $('#copr_detail_condition .life-industry__change__con li > a.on'); 						
							if($selItm.length > 0){
								param.ksic_3_cd = $selItm.attr("data-ksic-sel-cd");							
								show1 = $selItm.attr("data-ksic-sel-nm");							
							}
							param.isLifeBiz = "Y";
						}else if(param.statType == "employee"){
							var $selItm = $('#worker_detail_condition .life-industry__change__con li > a.on'); 						
							if($selItm.length > 0){
								param.ksic_3_cd = $selItm.attr("data-ksic-sel-cd");							
								show1 = $selItm.attr("data-ksic-sel-nm");							
							}
							param.isLifeBiz = "Y";
						}
						
					}else if((($("input[name='industry_area']:checked").attr("id") == "industry2_grid") && ($('#menu_5').hasClass('active')))||(($("input[name='industry']:checked").attr("id") == "industry2") && ($('#menu_4').hasClass('active')))){//산업분류 검색
						if(param.statType == "copr"){
							var $selItm = $("#copr_detail_condition_korea .point__radio.d-flex input[name = 'industry-select']:checked");
							if($selItm.length > 0){
								var ksic_3_cd = $("input[name='industry-select']:checked").attr("data-ksic-sel-cd");
								if(ksic_3_cd.length > 2){
									ksic_3_cd = ksic_3_cd.substr(2,ksic_3_cd.length);
								}
								param.ksic_3_cd = ksic_3_cd;
								show1 = $("input[name='industry-select']:checked").attr("data-ksic-sel-nm");
							}	
						}else if(param.statType == "employee"){
							var $selItm = $("#worker_detail_condition_korea .point__radio.d-flex input[name = 'industry-select-worker']:checked");
							if($selItm.length > 0){
								var ksic_3_cd = $("input[name='industry-select-worker']:checked").attr("data-ksic-sel-cd");
								if(ksic_3_cd.length > 2){
									ksic_3_cd = ksic_3_cd.substr(2,ksic_3_cd.length);
								}
								param.ksic_3_cd = $("input[name='industry-select-worker']:checked").attr("data-ksic-sel-cd");
								show1 = $("input[name='industry-select-worker']:checked").attr("data-ksic-sel-nm");
							}	
						} 
											
					}else if(($("input[name='industry_area']:checked").attr("id") == "industry3_grid")){
						if(param.statType == "copr"){	
							show1 = "사업체(전체)";
						}else if(param.statType == "employee"){
							show1 = "종사자(전체)";
						}
					}
					
					schCondNm = show1;

					if(param.grdstatType == "copr"){
						param.filterParam = "copr_cnt";
						param.unit = "개";
					}else if(param.grdstatType == "employee"){
						param.filterParam = "employee_cnt";	
						param.unit = "명";
						param.statType = "copr";		// 맞춰줘야 함
					}
				
					
				}else if(param.statType == "idlv"){//공시지가	
					param.filterParam = "olnlp";
					param.unit = "원";					
				}
				
				param.schCondNm = schCondNm;
				param.show1 = show1;
				param.show2 = show2;
			},
			getKSIClist : function(pObj){
				var param = pObj;
				if(param === undefined || param === null){
					param = {};				
				}
				param.workGb = "T";

				if(!param.hasOwnProperty("depth")){
					param.depth = 0;
				}
				if(!param.hasOwnProperty("classDeg")){
					param.classDeg = $catchmentAreaMenu.ui.classDeg;
				}
				
				var options = $catchmentAreaMenu.ui.reqSetParams_KSIC("API_202081", param);
				$catchmentAreaMenu.ui.requestOpenApi(options);
			},
			/**
			 * 
			 * @name         : setList
			 * @description  : 한국표준산업분류 목록(검색 결과)을 구성한다.
			 * 
			 */
			setList : function(res, options) {
				var totalCount = res.result.total_count;
				var list = res.result.list;
				
				
				var pageNo = options.params.pageNo;
				var pageSize = options.params.pageSize;

				var $rootCtnr;
				
				if($('#default_type_select button.on').val() == 0){
					if($("#statistics_topic option:selected").attr("value") == "copr"){
						$catchmentAreaMenu.ui.curSearchList = res.result.list;
						$rootCtnr = $('#copr_detail_condition_korea');
						$('#ksic_notice_copr').show();
					}else if($("#statistics_topic option:selected").attr("value") == "worker"){
						$catchmentAreaMenu.ui.curSearchList_worker = res.result.list;
						$rootCtnr = $('#worker_detail_condition_korea');
						$('#ksic_notice_worker').show();
					}
				}else if($('#default_type_select button.on').val() == 1){
					if($("#statistics_topic_grid option:selected").attr("value") == "copr"){
						$catchmentAreaMenu.ui.curSearchList = res.result.list;
						$rootCtnr = $('#copr_detail_condition_korea');
						$('#ksic_notice_copr').show();
					}else if($("#statistics_topic_grid option:selected").attr("value") == "worker"){
						$catchmentAreaMenu.ui.curSearchList_worker = res.result.list;
						$rootCtnr = $('#worker_detail_condition_korea');
						$('#ksic_notice_worker').show();
					}
				}
				$rootCtnr.find('tbody[id=list] *').remove();

				var listElement = '';
				for(var i = 0; i < list.length; i++) { //검색된 데이터 넣기
					
					var searchStr = options.params.schWord;
					var replaceStr = searchStr;
					var class_nm_h = list[i].class_nm.split(searchStr).join(replaceStr);
					var class_code_h = list[i].class_code.split(searchStr).join(replaceStr);
					
					listElement += '<tr>';
					listElement += '<td>';
                        
					listElement += '<div class="point__radio d-flex">'; 
					if($('#default_type_select button.on').val() == 0){
						if($('#statistics_topic option:selected').val() == 'copr'){
							if(list[i].main_class_code != list[i].class_code){
								listElement += '<input type="radio" class="form-radio detailcondition_radio"  data-ksic-sel-cd = "'+list[i].main_class_code + ':' + class_code_h +'" data-ksic-sel-nm = "'+ class_nm_h +'" id="industry-select'+ (((pageNo - 1) * pageSize) + (i + 1)) +'" name="industry-select" title="">';

							}else {	
								listElement += '<input type="radio" class="form-radio detailcondition_radio"  data-ksic-sel-cd = "'+ list[i].main_class_code +'" data-ksic-sel-nm = "'+ class_nm_h +'" id="industry-select'+ (((pageNo - 1) * pageSize) + (i + 1)) +'" name="industry-select" title="">';
							}
							listElement += '<label for="industry-select' +(((pageNo - 1) * pageSize) + (i + 1)) + '">';
						}else if ($('#statistics_topic option:selected').val() == 'worker'){
							if(list[i].main_class_code != list[i].class_code){
								listElement += '<input type="radio" class="form-radio detailcondition_radio"  data-ksic-sel-cd = "'+list[i].main_class_code + ':' + class_code_h +'" data-ksic-sel-nm = "'+ class_nm_h +'" id="industry-select'+ (((pageNo - 1) * pageSize) + (i + 1)) +'-worker" name="industry-select-worker" title="">';

							}else {	
								listElement += '<input type="radio" class="form-radio detailcondition_radio"  data-ksic-sel-cd = "'+ list[i].main_class_code +'" data-ksic-sel-nm = "'+ class_nm_h +'" id="industry-select'+ (((pageNo - 1) * pageSize) + (i + 1)) +'-worker" name="industry-select-worker" title="">';
							}
							listElement += '<label for="industry-select' +(((pageNo - 1) * pageSize) + (i + 1)) + '-worker">';
						}
					}else if($('#default_type_select button.on').val() == 1){
						if($('#statistics_topic_grid option:selected').val() == 'copr'){
							if(list[i].main_class_code != list[i].class_code){
								listElement += '<input type="radio" class="form-radio detailcondition_radio"  data-ksic-sel-cd = "'+list[i].main_class_code + ':' + class_code_h +'" data-ksic-sel-nm = "'+ class_nm_h +'" id="industry-select'+ (((pageNo - 1) * pageSize) + (i + 1)) +'" name="industry-select" title="">';

							}else {	
								listElement += '<input type="radio" class="form-radio detailcondition_radio"  data-ksic-sel-cd = "'+ list[i].main_class_code +'" data-ksic-sel-nm = "'+ class_nm_h +'" id="industry-select'+ (((pageNo - 1) * pageSize) + (i + 1)) +'" name="industry-select" title="">';
							}
							listElement += '<label for="industry-select' +(((pageNo - 1) * pageSize) + (i + 1)) + '">';
						}else if ($('#statistics_topic_grid option:selected').val() == 'worker'){
							if(list[i].main_class_code != list[i].class_code){
								listElement += '<input type="radio" class="form-radio detailcondition_radio"  data-ksic-sel-cd = "'+list[i].main_class_code + ':' + class_code_h +'" data-ksic-sel-nm = "'+ class_nm_h +'" id="industry-select'+ (((pageNo - 1) * pageSize) + (i + 1)) +'-worker" name="industry-select-worker" title="">';

							}else {	
								listElement += '<input type="radio" class="form-radio detailcondition_radio"  data-ksic-sel-cd = "'+ list[i].main_class_code +'" data-ksic-sel-nm = "'+ class_nm_h +'" id="industry-select'+ (((pageNo - 1) * pageSize) + (i + 1)) +'-worker" name="industry-select-worker" title="">';
							}
							listElement += '<label for="industry-select' +(((pageNo - 1) * pageSize) + (i + 1)) + '-worker">';
						}
					}
					
					listElement += '<span></span>';
					listElement += '</label>';
					listElement += '</div>';
					listElement += '</td>';
					listElement += '<td>';
					listElement += '<div class="d-flex justify-content-between align-items-center">';
					listElement += '<div>';
					if(list[i].main_class_code != list[i].class_code){
						listElement += '<p class="left">' + list[i].main_class_code + ': ' + class_code_h + '</p>'; //분류 코드
						listElement += '<p class="left">' + class_nm_h + '</p>'; //분류항목명
					}else{
						listElement += '<p class="left">' + list[i].main_class_code + '</p>';
						listElement += '<p class="left">' + class_nm_h + '</p>'; //분류항목명
					}
					listElement += '</div>';
					listElement += '<div>';
					listElement += ' <button type = "button" class = "jinggle" ><img src="/mobile/resources/m2021/images/i_select--ui.png" alt="검색결과 더보기"> </button>';
					listElement += '</div>';
					
					listElement += '</div>'; 
					listElement += '<div class = "detail" id = "detail_info"  style = "display:none;">';
					listElement += '</div>';
					listElement += '</td>';
					listElement += '</tr>';
				}
				$rootCtnr.find('tbody[id=list]').append(listElement); // 검색된 데이터 
				
				$rootCtnr.find('.ksicTotalTxt').html($catchmentAreaMenu.ui.createTotalTxt()); //검색한 txt
				$rootCtnr.find('.ksicTotalCnt').html(totalCount); // 검색된 수
				//$catchmentAreaKSIC.ui.toggleDisplay("list");
			},
			createBarChart : function (target, statYear ,statData ,titleText, width, height) {
				
				var catNm = "격자 당 평균 ";
				if(target == 'gridStatChart_right'){
					catNm = "격자 내 전체  ";
				}
				
	            Highcharts.setOptions({
	               lang: {
	                   thousandsSep: ",",
	                }
	            });
	            
				$("#"+target).highcharts({
					chart: {
						type: 'column',
		  				spacingRight: 0,
		  				spacingLeft: 0,
		  				width: width,
		  				height: height
		  			},
		  			legend: {
		  	            enabled: false
		  	        },		  			
		  			title: {
		  				text : ''
		  			},
		  			xAxis: {
		  				categories: statYear
		  			},
		  			yAxis: {
		  				min: 0,
		  	            title: {
		  	                enabled: false
		  	            },
		  			},		  			
		  			exporting: {
		  		        enabled: false
		  		    },
		  		    plotOptions: {
		  		        column: {
		  		            pointPadding: 0.2,
		  		            borderWidth: 0,
		  		            maxPointWidth: 30,
							dataLabels: {
								enabled: true,
								format: "{y:,.0f}" // 천단위 콤마
							}		  		            
		  		        }
		  		    },		  		    
		  			series: [{		  				
		  				name: titleText,
		  				data: statData
		  			}]
				});
				
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
				var pageNo = parseInt($("#menu_4_button button.on").attr('data-index'))+1;
				var area = ""; 
				var radius;
				var rangeType = $catchmentAreaMenu.ui.getRangeType();
				var rangeVal = $catchmentAreaMenu.ui.getRangeVal('01', pageNo);

				if(rangeType == "stats_radio_t" || rangeType == "stats_radio_d"){
					var selectIndex = $catchmentAreaMenu.ui.selectPolygonPointsArr.length - pageNo;
					var polyPoints = $catchmentAreaMenu.ui.selectPolygonPointsArr[selectIndex];
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
				}else if(rangeType == "stats_radio_r"){
					area = 'POINT(';
					area += $catchmentAreaMenu.ui.selectCoordinate_x + " " + $catchmentAreaMenu.ui.selectCoordinate_y;
					area += ')';
					radius = $("#menu_4_button .on").attr('data-value');
					
					param.area = area;
					param.radius = radius;
					param.srvAreaType = 2;
				}				
				
				if(area != ""){
					// pops:인구, family:가구, house:주택, copr:사업체/종사자, s3:인구/가구/주택
					param.base_year = $catchmentAreaMap.ui.getBaseYear("3");
					param.copr_base_year = $catchmentAreaMap.ui.getBaseYear("3");
					param.classDeg = $catchmentAreaMap.ui.classDeg;
					param.rangeType = rangeType;
					param.rangeVal = rangeVal;
					
					// TO-DO : grid_level 계산하기
					var shpArea = $catchmentAreaObj.getShapeArea(rangeType, rangeVal);
					var gLvl = $catchmentAreaMap.ui.getGridLevel(shpArea);
					param.grid_level = gLvl;
					
					// 마스크
					var identifier = new Date().getTime();
					param.identifier = identifier;
					var remainCnt = loopCnt;

					$catchmentAreaMask.startProcess(identifier, remainCnt);
					
					if($catchmentAreaMenu.ui.dStatType != ""){
						param.stats_class_gb = $catchmentAreaMenu.ui.dStatType;
					}

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
	    			   
	    			   
	    			  // $catchmentAreaMask.startProcess(identifier);

	    			   params = $catchmentAreaMenu.ui.reqSetParams2("API_202094", param);
	    			   params[memCondCd] = itemId;
	    			   params[memCondCd + "_nm"] = itemLbl;	    			   
		    			   
	    			   var storedInfo = $catchmentAreaObj.getStatisticsInfo("S02", params, memCondCd);
	    			   if(storedInfo.addCnt > 0){
	    				   $catchmentAreaMap.ui.processWithStoredInfo("S02", storedInfo);
	    			   }else{							
	    				   $catchmentAreaMap.ui.requestOpenApi(params);
	    			   }
		    	   }					
				}				
			},
			//세부조건 설정 상세통계정보 - 해당 세부항목에 대한 전체 데이터
			setChkDetailAllData : function(dataType, params, statData){
				var width = $(window).width()*0.9;
				if(dataType == 'pops'){
					var popsData  = [];
					var popsCategories  = [];
					
					if($("#people_age_unit a:eq(1)").hasClass("on")){//5세 단위
						$("#popTotTitle").html("영역 내 5세 단위 인구 수");
						
						popsCategories = ['0~4세 인구', '5~9세 인구', '10~14세 인구', '15~19세 인구', '20~24세 인구', '25~29세 인구', '30~34세 인구', '35~39세 인구'
							, '40~44세 인구', '45~49세 인구', '50~54세 인구', '55~59세 인구', '60~64세  인구', '65~69세  인구', '70~74세  인구', '75~79세  인구', '80~84세  인구'
							, '85~89세  인구', '90세이상 인구'];
						if(statData == null){
							popsData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
						}else{
							popsData = [statData[0].age_1_cnt == null ? 0 : statData[0].age_1_cnt, statData[0].age_2_cnt == null ? 0 : statData[0].age_2_cnt
									, statData[0].age_3_cnt == null ? 0 : statData[0].age_3_cnt, statData[0].age_4_cnt == null ? 0 : statData[0].age_4_cnt
									, statData[0].age_5_cnt == null ? 0 : statData[0].age_5_cnt, statData[0].age_6_cnt == null ? 0 : statData[0].age_6_cnt
									, statData[0].age_7_cnt == null ? 0 : statData[0].age_7_cnt, statData[0].age_8_cnt == null ? 0 : statData[0].age_8_cnt
									, statData[0].age_9_cnt == null ? 0 : statData[0].age_9_cnt, statData[0].age_10_cnt == null ? 0 : statData[0].age_10_cnt
									, statData[0].age_11_cnt == null ? 0 : statData[0].age_11_cnt, statData[0].age_12_cnt == null ? 0 : statData[0].age_12_cnt
									, statData[0].age_13_cnt == null ? 0 : statData[0].age_13_cnt, statData[0].age_14_cnt == null ? 0 : statData[0].age_14_cnt
									, statData[0].age_15_cnt == null ? 0 : statData[0].age_15_cnt, statData[0].age_16_cnt == null ? 0 : statData[0].age_16_cnt
									, statData[0].age_17_cnt == null ? 0 : statData[0].age_17_cnt, statData[0].age_18_cnt == null ? 0 : statData[0].age_18_cnt
									, statData[0].age_19_cnt == null ? 0 : statData[0].age_19_cnt];
						}

					}else if($("#people_age_unit a:eq(2)").hasClass("on")){//10세 단위
						$("#popTotTitle").html("영역 내 10세 단위 인구 수");
						
						popsCategories = ['0~9세 인구', '10~19세 인구', '20~29세 인구', '30~39세 인구', '40~49세 인구', '50~59세 인구', '60~69세 인구'
							, '70~79세 인구', '80~89세 인구', '90세이상 인구'];
						
						if(statData == null){
							popsData = [0,0,0,0,0,0,0,0,0,0];
						}else{
							popsData = [statData[0].age_1_cnt == null ? 0 : statData[0].age_1_cnt, statData[0].age_2_cnt == null ? 0 : statData[0].age_2_cnt
									, statData[0].age_3_cnt == null ? 0 : statData[0].age_3_cnt, statData[0].age_4_cnt == null ? 0 : statData[0].age_4_cnt
									, statData[0].age_5_cnt == null ? 0 : statData[0].age_5_cnt, statData[0].age_6_cnt == null ? 0 : statData[0].age_6_cnt
									, statData[0].age_7_cnt == null ? 0 : statData[0].age_7_cnt, statData[0].age_8_cnt == null ? 0 : statData[0].age_8_cnt
									, statData[0].age_9_cnt == null ? 0 : statData[0].age_9_cnt, statData[0].age_10_cnt == null ? 0 : statData[0].age_10_cnt
									];
						}

					}else{//주요구간
						$("#popTotTitle").html("영역 내 주요구간 인구 수");
						
						popsCategories = ['0~14세 인구', '20~34세 인구', '35~64세 인구', '15~64세 인구', '65세이상 인구', '80세이상 인구'];
						
						if(statData == null){
							popsData = [0,0,0,0,0,0,0];
						}else{
							popsData = [statData[0].age_1_cnt == null ? 0 : statData[0].age_1_cnt, statData[0].age_2_cnt == null ? 0 :  statData[0].age_2_cnt
									, statData[0].age_3_cnt == null ? 0 : statData[0].age_3_cnt, statData[0].age_4_cnt == null ? 0 : statData[0].age_4_cnt
									, statData[0].age_5_cnt == null ? 0 : statData[0].age_5_cnt, statData[0].age_6_cnt == null ? 0 : statData[0].age_6_cnt];
						}

					}
					$catchmentAreaMenu.ui.setChkDetailAllBarChart(dataType, "popTotDChart", popsCategories, popsData, width, 370);
				}else if(dataType == 'family'){
					var familyPieData = [];
					var familyPieData_ALL = [];
					if(statData == null){
						familyPieData.push({name : "친족 가구", y : 0});
						familyPieData.push({name : "1인 가구", y : 0});
						familyPieData.push({name : "비친족 가구", y : 0});						
						
						familyPieData_ALL.push({name : "친족 가구", y : 0});
						familyPieData_ALL.push({name : "1인 가구", y : 0});
						familyPieData_ALL.push({name : "비친족 가구", y : 0});						
						
						var familyCategories = ['1세대 가구', '2세대 가구', '3세대 가구', '4세대 이상'];
						var familyData = [0, 0, 0, 0];
					}else{
						//파이차트
						var family_01 = String(((statData[0].f03_cnt / (statData[0].f01_cnt + statData[0].f02_cnt + statData[0].f03_cnt))*100).toFixed(1))+"%"
						var family_02 = String(((statData[0].f01_cnt / (statData[0].f01_cnt + statData[0].f02_cnt + statData[0].f03_cnt))*100).toFixed(1))+"%"
						var family_03 = String(((statData[0].f02_cnt / (statData[0].f01_cnt + statData[0].f02_cnt + statData[0].f03_cnt))*100).toFixed(1))+"%"
						familyPieData_ALL.push({name : family_01, y : statData[0].f03_cnt  == null ? 0 : statData[0].f03_cnt});
						familyPieData_ALL.push({name : family_02, y : statData[0].f01_cnt == null ? 0 : statData[0].f01_cnt});
						familyPieData_ALL.push({name : family_03, y : statData[0].f02_cnt  == null ? 0 : statData[0].f02_cnt});						
						
						familyPieData.push({name : "친족 가구", y : statData[0].f03_cnt  == null ? 0 : statData[0].f03_cnt});
						familyPieData.push({name : "1인 가구", y : statData[0].f01_cnt == null ? 0 : statData[0].f01_cnt});
						familyPieData.push({name : "비친족 가구", y : statData[0].f02_cnt  == null ? 0 : statData[0].f02_cnt});						
						
						//bar차트
						var familyCategories = ['1세대 가구', '2세대 가구', '3세대 가구', '4세대 이상'];
						var familyData = [statData[0].f04_cnt == null ? 0 : statData[0].f04_cnt, statData[0].f05_cnt == null ? 0 : statData[0].f05_cnt
							, statData[0].f06_cnt == null ? 0 : statData[0].f06_cnt, statData[0].f07_cnt == null ? 0 : statData[0].f07_cnt];
						
						var familyColor = ['#60bc4c', '#ffaa01', '#ED5980'];
					}
					
					
					if($("#detail_condtion_txt").text() == "가구(전체) "){
						$catchmentAreaMenu.ui.dTotPieChart_ALL('family', familyPieData_ALL, 'familyDChart', width, 140, familyColor);
						$catchmentAreaMenu.ui.createBarChart('familyTotDChart', familyCategories, familyData, '', width, 180);
					}
					
				}else if(dataType == 'house'){
					var houseData  = [];
					var house_ALL = [];
					var houseCategories  = [];
					if(statData == null){
						if(params.stats_class_gb == 'area'){//연면적
							houseCategories = ['20㎡ 이하', '20㎡ ~ 40㎡', '40㎡ ~ 60㎡', '60㎡ ~ 85㎡', '85㎡ ~ 100㎡',
								'100㎡ ~ 130㎡', '130㎡ ~ 165㎡', '165㎡ ~ 230㎡', '230㎡ 초과'];
							houseData = [0,0,0,0,0,0,0,0,0];
						}else{
							houseCategories = ['단독주택', '아파트', '연립주택', '다세대주택', '비거주용 건물 내 주택'];
							houseData = [0,0,0,0,0];
						}
					}else{
						if(params.stats_class_gb == 'area'){//연면적
							houseCategories = ['20㎡ 이하', '20㎡ ~ 40㎡', '40㎡ ~ 60㎡', '60㎡ ~ 85㎡', '85㎡ ~ 100㎡',
								'100㎡ ~ 130㎡', '130㎡ ~ 165㎡', '165㎡ ~ 230㎡', '230㎡ 초과'];
							houseData = [statData[0].h01_cnt  == null ? 0 : statData[0].h01_cnt, statData[0].h02_cnt == null ? 0 : statData[0].h02_cnt
								, statData[0].h03_cnt == null ? 0 : statData[0].h03_cnt, statData[0].h04_cnt  == null ? 0 : statData[0].h04_cnt
								, statData[0].h05_cnt == null ? 0 : statData[0].h05_cnt, statData[0].h06_cnt == null ? 0 : statData[0].h06_cnt
								, statData[0].h07_cnt == null ? 0 : statData[0].h07_cnt, statData[0].h08_cnt == null ? 0 : statData[0].h08_cnt
								, statData[0].h09_cnt == null ? 0 : statData[0].h09_cnt];
							$catchmentAreaMenu.ui.setChkDetailAllBarChart(dataType, "houseTotDBarChart02", houseCategories, houseData, width, 410);
						}else{
							var house_01 = String(((statData[0].h01_cnt / (statData[0].h01_cnt + statData[0].h02_cnt + statData[0].h03_cnt + statData[0].h04_cnt + statData[0].h05_cnt))*100).toFixed(1))+"%"
							var house_02 = String(((statData[0].h02_cnt / (statData[0].h01_cnt + statData[0].h02_cnt + statData[0].h03_cnt + statData[0].h04_cnt + statData[0].h05_cnt))*100).toFixed(1))+"%"
							var house_03 = String(((statData[0].h03_cnt / (statData[0].h01_cnt + statData[0].h02_cnt + statData[0].h03_cnt + statData[0].h04_cnt + statData[0].h05_cnt))*100).toFixed(1))+"%"
							var house_04 = String(((statData[0].h04_cnt / (statData[0].h01_cnt + statData[0].h02_cnt + statData[0].h03_cnt + statData[0].h04_cnt + statData[0].h05_cnt))*100).toFixed(1))+"%"
							var house_05 = String(((statData[0].h05_cnt / (statData[0].h01_cnt + statData[0].h02_cnt + statData[0].h03_cnt + statData[0].h04_cnt + statData[0].h05_cnt))*100).toFixed(1))+"%"
							
							house_ALL.push({name : house_01, y : statData[0].h01_cnt == null ? 0 : statData[0].h01_cnt});
							house_ALL.push({name : house_02, y : statData[0].h02_cnt == null ? 0 : statData[0].h02_cnt});
							house_ALL.push({name : house_03, y : statData[0].h03_cnt == null ? 0 : statData[0].h03_cnt});
							house_ALL.push({name : house_04, y : statData[0].h04_cnt == null ? 0 : statData[0].h04_cnt});
							house_ALL.push({name : house_05, y : statData[0].h05_cnt == null ? 0 : statData[0].h05_cnt});
							
							houseCategories = ['단독주택', '아파트', '연립주택', '다세대주택', '비거주용 건물 내 주택'];
							houseData  = [statData[0].h01_cnt == null ? 0 : statData[0].h01_cnt, statData[0].h02_cnt == null ? 0 : statData[0].h02_cnt
								, statData[0].h03_cnt == null ? 0 : statData[0].h03_cnt, statData[0].h04_cnt == null ? 0 : statData[0].h04_cnt , statData[0].h05_cnt == null ? 0 : statData[0].h05_cnt];
							var houseColor = ['#29aac4','#60bc4c','#4502e0' ,'#ffaa01', '#ED5980'];
							$catchmentAreaMenu.ui.dTotPieChart_ALL('house', house_ALL, 'houseDChart', width, 140, houseColor);
							$catchmentAreaMenu.ui.createBarChart('houseTotDChart', houseCategories, houseData, '', width, 180);
							$catchmentAreaMenu.ui.setChkDetailAllBarChart(dataType, "houseTotDBarChart", houseCategories, houseData, width, 410);
						}
					}
					
					
					
					
				}else if(dataType == 'copr'){
					var coprCategories = [];
					var coprData = [];
					
					if(statData.length == 1){//소분류, 세분류, 세세분류
						if(statData[0].hasOwnProperty('ksic_5_cd')){//세세분류
							coprCategories.push(statData[0].ksic_1_cd +'.' + statData[0].ksic_1_cd_nm);
							coprCategories.push(statData[0].ksic_2_cd +'.' + statData[0].ksic_2_cd_nm);
							coprCategories.push(statData[0].ksic_3_cd +'.' + statData[0].ksic_3_cd_nm);
							coprCategories.push(statData[0].ksic_4_cd +'.' + statData[0].ksic_4_cd_nm);
							coprCategories.push(statData[0].ksic_5_cd +'.' + statData[0].ksic_5_cd_nm);
							
							coprData.push(statData[0].ksic_1_cnt);
							coprData.push(statData[0].ksic_2_cnt);
							coprData.push(statData[0].ksic_3_cnt);
							coprData.push(statData[0].ksic_4_cnt);
							coprData.push(statData[0].ksic_5_cnt);
						}else if(statData[0].hasOwnProperty('ksic_4_cd')){//세분류
							coprCategories.push(statData[0].ksic_1_cd +'.' + statData[0].ksic_1_cd_nm);
							coprCategories.push(statData[0].ksic_2_cd +'.' + statData[0].ksic_2_cd_nm);
							coprCategories.push(statData[0].ksic_3_cd +'.' + statData[0].ksic_3_cd_nm);
							coprCategories.push(statData[0].ksic_4_cd +'.' + statData[0].ksic_4_cd_nm);
							
							coprData.push(statData[0].ksic_1_cnt);
							coprData.push(statData[0].ksic_2_cnt);
							coprData.push(statData[0].ksic_3_cnt);
							coprData.push(statData[0].ksic_4_cnt);
						}else{//소분류
							coprCategories.push(statData[0].ksic_1_cd +'.' + statData[0].ksic_1_cd_nm);
							coprCategories.push(statData[0].ksic_2_cd +'.' + statData[0].ksic_2_cd_nm);
							coprCategories.push(statData[0].ksic_3_cd +'.' + statData[0].ksic_3_cd_nm);
							
							coprData.push(statData[0].ksic_1_cnt);
							coprData.push(statData[0].ksic_2_cnt);
							coprData.push(statData[0].ksic_3_cnt);
						}	
					}else{//대분류, 중분류
						statData.sort(function (a, b) {
							return a.grp_id < b.grp_id ? -1 : a.grp_id > b.grp_id ? 1 : 0;					
						});
						
						$.each(statData, function(idx, item){
							coprCategories.push(item.grp_nm);
							coprData.push(item.copr_cnt);
						});	
					}
					
					$('#copr_view_chart').hide();
					$('#copr_view_table').hide();
					if(coprCategories.length <= 5){
						$catchmentAreaMenu.ui.createTable_copr(coprCategories, coprData, dataType);
						$('#copr_view_table').show();
					}else{
						$catchmentAreaMenu.ui.setChkDetailAllBarChart(dataType, "copr_maincategory_DChart", coprCategories, coprData, width, 370);
						$('#copr_view_chart').show();
					}
					$catchmentAreaMenu.ui.setChkDetailAllBarChart(dataType, "copr_work_TotDBarChart", coprCategories, coprData, width, 410);
				}else{
					var employeeCategories = [];
					var employeeData = [];
					
					if(statData.length == 1){//소분류, 세분류, 세세분류
						if(statData[0].hasOwnProperty('ksic_5_cd')){//세세분류
							employeeCategories.push(statData[0].ksic_1_cd +'.' + statData[0].ksic_1_cd_nm);
							employeeCategories.push(statData[0].ksic_2_cd +'.' + statData[0].ksic_2_cd_nm);
							employeeCategories.push(statData[0].ksic_3_cd +'.' + statData[0].ksic_3_cd_nm);
							employeeCategories.push(statData[0].ksic_4_cd +'.' + statData[0].ksic_4_cd_nm);
							employeeCategories.push(statData[0].ksic_5_cd +'.' + statData[0].ksic_5_cd_nm);
							
							employeeData.push(statData[0].ksic_1_cnt);
							employeeData.push(statData[0].ksic_2_cnt);
							employeeData.push(statData[0].ksic_3_cnt);
							employeeData.push(statData[0].ksic_4_cnt);
							employeeData.push(statData[0].ksic_5_cnt);
						}else if(statData[0].hasOwnProperty('ksic_4_cd')){//세분류
							employeeCategories.push(statData[0].ksic_1_cd +'.' + statData[0].ksic_1_cd_nm);
							employeeCategories.push(statData[0].ksic_2_cd +'.' + statData[0].ksic_2_cd_nm);
							employeeCategories.push(statData[0].ksic_3_cd +'.' + statData[0].ksic_3_cd_nm);
							employeeCategories.push(statData[0].ksic_4_cd +'.' + statData[0].ksic_4_cd_nm);
							
							employeeData.push(statData[0].ksic_1_cnt);
							employeeData.push(statData[0].ksic_2_cnt);
							employeeData.push(statData[0].ksic_3_cnt);
							employeeData.push(statData[0].ksic_4_cnt);
						}else{//소분류
							employeeCategories.push(statData[0].ksic_1_cd +'.' + statData[0].ksic_1_cd_nm);
							employeeCategories.push(statData[0].ksic_2_cd +'.' + statData[0].ksic_2_cd_nm);
							employeeCategories.push(statData[0].ksic_3_cd +'.' + statData[0].ksic_3_cd_nm);
							
							employeeData.push(statData[0].ksic_1_cnt);
							employeeData.push(statData[0].ksic_2_cnt);
							employeeData.push(statData[0].ksic_3_cnt);
						}	
					}else{//대분류, 중분류
						statData.sort(function (a, b) {
							return a.grp_id < b.grp_id ? -1 : a.grp_id > b.grp_id ? 1 : 0;
						});
						
						$.each(statData, function(idx, item){
							employeeCategories.push(item.grp_nm);
							employeeData.push(item.employee_cnt);
						});	
					}
					$('#copr_view_chart').hide();
					$('#copr_view_table').hide();
					if(employeeCategories.length <= 5){
						$catchmentAreaMenu.ui.createTable_copr(employeeCategories, employeeData, dataType);
						$('#copr_view_table').show();
					}else{
						$catchmentAreaMenu.ui.setChkDetailAllBarChart(dataType, "copr_maincategory_DChart", employeeCategories, employeeData, width, 370);
						$('#copr_view_chart').show();
					}
					$catchmentAreaMenu.ui.setChkDetailAllBarChart(dataType, "copr_work_TotDBarChart", employeeCategories, employeeData, width, 410);
				}
			},
			showChkDetailDiv : function(dataType){
				
				$("#detail_data_people").hide();
				$("#detail_data_family").hide();
				$("#detail_data_house").hide();
				$("#detail_data_copr").hide();
				
				$("#detail_data_family_ALL").hide();
				$("#detail_data_family_NOTALL").hide();
				$("#detail_data_housetype_ALL").hide();
				$("#detail_data_housetype_NOTALL").hide();
				$("#detail_data_houseyear").hide();
				$("#detail_data_housearea").hide();
				$("#detail_data_copr_life").hide();
				$("#detail_data_copr_industry").hide();
				
				if(dataType == "pops"){//인구
					$("#detail_data_people").show();
				}else if(dataType == "family"){//가구
					$("#detail_data_family").show();
					if($("#detail_condtion_txt").text() == "가구(전체) "){
						$("#detail_data_family_ALL").show();
					}else{
						$("#detail_data_family_NOTALL").show();
					}
				}else if(dataType == "house"){//주택
					$("#detail_data_house").show();
					if($("#house_detail_condition_menu a.on").attr("data-value") == 0){
						if($("#detail_condtion_txt").text() == "주택유형(전체)"){
							$("#detail_data_housetype_ALL").show();
						}else {
							$("#detail_data_housetype_NOTALL").show();
						}
					}else if($("#house_detail_condition_menu a.on").attr("data-value") == 1){
						$("#detail_data_houseyear").show();
					}else if($("#house_detail_condition_menu a.on").attr("data-value") == 2){
						$("#detail_data_housearea").show();
					}
					
				}else if(dataType == "copr"){//사업체
					$(".copr_work_subject_txt").text('사업체');
					$("#detail_data_copr").show();
					if($('#default_type_select').val() == 0){
						if($('input:radio[id=industry1]').is(':checked')){
							$("#detail_data_copr_life").show();
						}else if($('input:radio[id=industry2]').is(':checked')){
							$("#detail_data_copr_industry").show();
						}
					}else if($('#default_type_select').val() == 1){
						if($('input:radio[id=industry1_grid]').is(':checked')){
							$("#detail_data_copr_life").show();
						}else if($('input:radio[id=industry2_grid]').is(':checked')){
							$("#detail_data_copr_industry").show();
						}
					}
					
				}else if(dataType == "employee"){//종사자
					$(".copr_work_subject_txt").text('종사자');
					$("#detail_data_copr").show();
					if($('#default_type_select').val() == 0){
						if($('input:radio[id=industry1]').is(':checked')){
							$("#detail_data_copr_life").show();
						}else if($('input:radio[id=industry2]').is(':checked')){
							$("#detail_data_copr_industry").show();
						}
					}else if($('#default_type_select').val() == 1){
						if($('input:radio[id=industry1_grid]').is(':checked')){
							$("#detail_data_copr_life").show();
						}else if($('input:radio[id=industry2_grid]').is(':checked')){
							$("#detail_data_copr_industry").show();
						}
					}
					
				}else{
				}
			},
			setChkDetailAllBarChart : function(dataType, target, xCategories, statData, pWidth, pHeight){
				var unitNm = "명";
				if(dataType == 'family'){
					unitNm = "가구";
				}else if(dataType == 'house'){
					unitNm = "호";
				}else if(dataType == 'copr'){
					unitNm = "개";
				}
				if(target == 'copr_work_TotDBarChart' || target == 'copr_work_TotDBarChart02'){
					$('#copr_chart_unit').text('(단위 : '+ unitNm +')');
				}else if(target == 'copr_maincategory_DChart'){
					$('#copr_maincategory').text('(단위 : '+ unitNm +')');
					if(unitNm == "명"){
						$('#copr_maincategory_title').text('산업 대분류별 종사자 수');
					}else{
						$('#copr_maincategory_title').text('산업 대분류별 사업체 수');
					}
					
				}
				
				//$('#statistics_topic option:selected').val() == 'copr')
				if(xCategories !== undefined && xCategories !== null){
					for(var i = 0; i < xCategories.length; i++) {
						xCategories[i] = xCategories[i].replace(/ /gi, "&nbsp;");
					}
				}
				Highcharts.setOptions({
		               lang: {
		                   thousandsSep: ",",
		                }
		        });
				
				$("#"+target).highcharts({
					chart: {
		  				type: 'bar',
		  				width: pWidth,
		  				height: pHeight,
		  				spacingRight : 20,
		  				marginRight: 20
		  			},
		  			title: {
		  				text : ''
		  			},
		  			tooltip: {
		  		        pointFormat: '<b>{point.y} ' + unitNm + '</b>',
		  		        useHTML: true
		  		    },
		  			exporting: {
		  		        enabled: false
		  		    },
		  		    xAxis : {
						categories: xCategories,
						labels : { 
							rotation : 0,
							useHTML : true,
						}
					},
					yAxis : {
						min : 0,
						title : {
							text : ''
						}
					
					},
		  			plotOptions: {
		  				bar : {
		  					dataLabels:{
		  						allowOverlap : true,
		  						enabled : true,
		  						format: '{y:,.0f}',
		  						color : 'rgb(0,0,0)',
		  						borderColor: '#FF0000'
		  					}
		  				}
	               },
	               legend : {
	            	   enabled: false
	               },
	               
	               series: [{
		  				data: statData,
		  			}]
				});
			},
			/**
			 * 
			 * @name         : prechkForReqGridStat
			 * @description  : 그리드 통계 호출전에 격자 크기를 체크한다.
			 * 
			 */
			prechkForReqGridStat : function(){

				var gLvl = $("#grid_size_select li").children("input.active").data("data-gridLevelDiv");
				var gLvlNm = $("#grid_size_select li").children("input.active").text();
				var gLvlNo = $catchmentAreaMenu.ui.getGridValueAsNum(gLvl);
				var chkMsg = "";
				
				if(gLvlNo >= 0){
					var rangeType = $catchmentAreaMenu.ui.getRangeType();
					var rangeVal = $('.self-select__circle.must_one_circle.active.bg-red').attr('data-value');
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
			//세부조건 설정 상세통계정보 - 세부조건 설정한 데이터
			setChkDeatailData : function(pData, pOpt){		
				var sData = pData;
				var params = pOpt.params;
				var sItems;
				var sItem;
				var width = $(window).width()*0.9;
				
				//인구
				if(sData.hasOwnProperty('pops')){
					$("#popTotBtn a").removeClass("active");
					var gender = $('input:radio[name=people]:checked').attr("data-value");
					if(gender == 00){
						sItems = sData.pops;
					}else{
						sItems = sData.pops_gender;
					}
					var sItems2;//성별
					var isClear = true;
					var totcnt_num;
					var totCnt;	// 표출 총값
					var itemCnt = 0;
					
					if(sItems != null){
						sItems2 = sData.pops_gender;//성별
						totcnt_num = $("#totPops").text().replace(',','');
						totCnt = sData.pops_class[0].tot_ppltn_cnt;	// 표출 총값
						if(totCnt > 0){
							if(sItems instanceof Array && sItems.length > 0){		
								if(gender == 00){
									sItem = sItems[0];
								}else if(gender == 1){
									sItem = sItems[1];
								}else if(gender == 2){
									sItem = sItems[0];
								}
								
								if(sItem !== undefined && sItem !== null){
									itemCnt = Number(sItem["ppltn_cnt"]);
									if(!isNaN(itemCnt)){
										isClear = false;
										
										if(itemCnt > totCnt || params["pops_cond"] == "pops_all_all"){	// 1개뿐인 표출 항목이 표출 총값보다 크면
											itemCnt = totCnt;
										}								
										//세부조건 - 상세보기
										$catchmentAreaMenu.ui.createSolidGaugeChart('popDChart', itemCnt, totCnt, width, 140 , $catchmentAreaMap.ui.comma(itemCnt));
									}
								}
							}
						}
					}
					

					var itemNm = params["pops_cond_nm"];
					if(itemNm != undefined && itemNm != null){
						itemNm = itemNm.substring((itemNm.indexOf(":") + 1), itemNm.length).trim();
					}
					var itemNm_replace = itemNm.replace('연령(','').replace(')','');
					
					$("#popChart_Gender_title").html(itemNm + "의 성별 인구");
					var width = $(window).width()*0.9;
					//세부조건 - 남녀
					var popTot = 0;
					var men_pop = 0;
					var women_pop = 0;
					var gender = $('input:radio[name=people]:checked').val();
					var gender_data = [];
					var gender_nm = '';
					var area_tot;
					if(sItems2 instanceof Array && sItems2.length > 0){
						
						$.each(sItems2, function(idx, item){
							var itemCnt = Number(item.ppltn_cnt);
							popTot += parseInt(item.ppltn_cnt);
							if(!isNaN(itemCnt)){
								if(item.base_year == "1"){
									$("#gender_number li p:eq(0)").html("남자 "+$catchmentAreaMap.ui.comma(itemCnt) + "명   ");
									men_pop = itemCnt;
									gender_data.push(men_pop);
								}else{
									$("#gender_number li p:eq(1)").html("여자 " + $catchmentAreaMap.ui.comma(itemCnt) + "명 ");
									women_pop = itemCnt;
									gender_data.push(women_pop);
								}
							}
						});
					}
					
					area_tot = sData.pops_class[0].tot_ppltn_cnt;
					$catchmentAreaMenu.ui.createSolidGaugeChart('popChart_Gender', gender_data, popTot, width, 140 , area_tot);
					if(gender == 00){
					}else if(gender == 1){
						popTot = men_pop;
						gender_nm = '성별(남자) '
					}else if(gender == 2){
						popTot = women_pop;
						gender_nm = '성별(여자) '
					}
					var percent_pop = popTot/parseInt(totcnt_num)*100
					if($('#people_age_unit .on').attr('data-value') == 0){
						$("#dPopType").html(gender_nm + itemNm_replace + " 연령 인구 구성비  100%");
					}else{
						$("#dPopType").html(gender_nm + itemNm_replace + " 연령 인구 구성비  " + percent_pop.toFixed(1)+"%");
					}
					 
					$("#dPopitemCnt").html(gender_nm + itemNm_replace + " 연령 인구 수 : " + $catchmentAreaMap.ui.comma(popTot)+"명"); 
					
					//데이터 null
					if(isClear){
						$(".selected_option_text").text('선택한 조건 : ' + $('#detail_condtion_txt').text());
						$("#dPopType").html(gender_nm + itemNm_replace + " 연령 인구 구성비  0%");
						$("#dMen").html('0');
						$("#dWoman").html('0');
						
						$catchmentAreaMenu.ui.createEmptySolidGaugeChart('popDChart');
						$catchmentAreaMenu.ui.createEmptySolidGaugeChart('popChart_Gender');
					}
					
					$catchmentAreaMenu.ui.setChkDetailAllData('pops', params, sData.pops_class);
				}
				
				//가구
				if(sData.hasOwnProperty('family')){
					sItems = sData.family;
					var area_data; 
					var isClear = true;
					var isBlockShow = true;
					var totCnt;	// 표출 총값tot_house_cnt
					
					if(sItems != null){
						area_data = sData.family_class[0];
						totCnt = sData.family_class[0].tot_family_cnt;
						if(totCnt > 0){
							isBlockShow = false;
							if(sItems instanceof Array && sItems.length > 0){
								sItem = sItems[0];
								if(sItem !== undefined && sItem !== null){
									var itemCnt = Number(sItem["family_cnt"]);
									if(!isNaN(itemCnt)){
										isClear = false;
		
										if(itemCnt > totCnt){
											itemCnt = totCnt;
										}

										$catchmentAreaMenu.ui.createSolidGaugeChart('familyDChart_02', itemCnt, totCnt, width, 140,$catchmentAreaMap.ui.comma(totCnt)); 
										$catchmentAreaMenu.ui.createTable_family(totCnt,area_data); 
										$("#dFamilyitemCnt").html($catchmentAreaMap.ui.comma(itemCnt));											
									}
								}
							}else{
								$(".dChartTextHl02").html('선택한 세대 구성의 가구 수 : <b> 0 가구</b>');
								$("#dFamilyitemCnt").html($catchmentAreaMap.ui.comma(itemCnt));
								$catchmentAreaMenu.ui.createTable_family(totCnt,area_data); 
							}
						}
					}
					

					var itemNm = params["family_cond_nm"];
					if(itemNm != undefined && itemNm != null){
						itemNm = itemNm.substring((itemNm.indexOf(":") + 1), itemNm.length).trim();
					}
					$("#dFamilyType").html(itemNm);
					
					//데이터 null
					if(isClear){
						$(".selected_option_text").text('선택한 조건 : ' + $('#detail_condtion_txt').text());
						$catchmentAreaMenu.ui.createEmptySolidGaugeChart('familyDChart');
						$catchmentAreaMenu.ui.createEmptySolidGaugeChart('familyDChart_02');
					}
					
					//bar 차트.. 호출
					$catchmentAreaMenu.ui.setChkDetailAllData('family', params, sData.family_class);
				}
				
				//주택
				if(sData.hasOwnProperty('house')){
					sItems = sData.house;
					var area_data;
					var isClear = true;
					var isBlockShow = true;
					var totCnt;	// 표출 총값
					
					if(sItems != null){
						area_data = sData.house_class[0];
						totCnt = sData.house_class[0].tot_house_cnt;
						if(totCnt > 0){
							isBlockShow = false;
							if(sItems instanceof Array && sItems.length > 0){
								sItem = sItems[0];
								if(sItem !== undefined && sItem !== null){
									var itemCnt = Number(sItem["resid_cnt"]);
									if(!isNaN(itemCnt)){
										isClear = false;
		
										if(itemCnt > totCnt){
											itemCnt = totCnt;
										}
										
										if($("#house_detail_condition_menu a.on").attr("data-value") == 0){
											$catchmentAreaMenu.ui.createSolidGaugeChart('houseDChart02', itemCnt, totCnt, width, 140);
											$catchmentAreaMenu.ui.createTable_house(totCnt,area_data);
										}else if($("#house_detail_condition_menu a.on").attr("data-value") == 1){
											$catchmentAreaMenu.ui.createSolidGaugeChart('houseDChart03', itemCnt, totCnt, width, 140);
										}else if($("#house_detail_condition_menu a.on").attr("data-value") == 2){
											$catchmentAreaMenu.ui.createSolidGaugeChart('houseDChart04', itemCnt, totCnt, width, 140);
										}
									}
								}
							}
						}
					}
					

					var itemNm = params["house_cond_nm"];
					if(itemNm != undefined && itemNm != null){
						itemNm = itemNm.substring((itemNm.indexOf(":") + 1), itemNm.length).trim();
					}
					$("#dHouseType").html(itemNm);	
					
					//데이터 null
					if(isClear){
						var standard_date = $("#bYearSel03 option:selected").val();
						var condition_date = $("#house_detail_menu_02 > .distance_select__con > button.on").text();
						$(".selected_option_text").text('선택한 조건 : ' + $('#detail_condtion_txt').text());
						$(".dChartTextHl03").html("주택 건축 연도 " + condition_date +" 주택 수 : <b>0호</b>" );
						$(".selected_option_text").text(standard_date +"년 기준 건축 연도가 " + condition_date +"인 주택 구성비 " +"0%" );
						
						$catchmentAreaMenu.ui.createEmptySolidGaugeChart('houseDChart');
						$catchmentAreaMenu.ui.createEmptySolidGaugeChart('houseDChart02');
						$catchmentAreaMenu.ui.createEmptySolidGaugeChart('houseDChart03');
						$catchmentAreaMenu.ui.createEmptySolidGaugeChart('houseDChart04');
					}
					$catchmentAreaMenu.ui.setChkDetailAllData('house', params, sData.house_class);
				}
				
				//사업체
				if(sData.hasOwnProperty('copr')){
					sItems = sData.copr;
					var isClear = true;
					var totCnt = Number($("#totCopr").attr('data-total-ogl'));;	// 표출 총값
					
					if(totCnt > 0){
						isBlockShow = false;
						if(sItems instanceof Array && sItems.length > 0){
							sItem = sItems[0];
							if(sItem !== undefined && sItem !== null){
								var itemCnt = Number(sItem["copr_cnt"]);
								if(!isNaN(itemCnt)){
									isClear = false;
	
									if(itemCnt > totCnt){
										itemCnt = totCnt;
									}
									if($('input:radio[id=industry1]').is(':checked')){
										$catchmentAreaMenu.ui.createSolidGaugeChart('copr_work_DChart', itemCnt, totCnt, width, 140);
									}else if($('input:radio[id=industry2]').is(':checked')){
										$catchmentAreaMenu.ui.createSolidGaugeChart('copr_work_DChart02', itemCnt, totCnt, width, 140);
									}
								}
							}
						}else{
							$(".dChartTextHl03").html($("#detail_condtion_txt").text() + ' 사업체 수 : <b> 0개</b>');
						}
					}

					var itemNm = params["copr_cond_nm"];
					if(itemNm != undefined && itemNm != null){
						itemNm = itemNm.substring((itemNm.indexOf(":") + 1), itemNm.length).trim();
					}
					$("#dCoprType").html(itemNm);
					
					//데이터 null
					if(isClear){
						$(".selected_option_text").text('선택한 조건 : ' + $('#detail_condtion_txt').text());
						$catchmentAreaMenu.ui.createEmptySolidGaugeChart('copr_work_DChart');
						$catchmentAreaMenu.ui.createEmptySolidGaugeChart('copr_work_DChart02');
					}
					
					$catchmentAreaMenu.ui.setChkDetailAllData('copr', params, sData.copr_class);
				}
				
				//종사자
				if(sData.hasOwnProperty('employee')){
					sItems = sData.employee;
					var isClear = true;
					var isBlockShow = true;
					var totCnt = Number($("#totWorker").attr('data-total-ogl'));	// 표출 총값
					
					if(totCnt > 0){
						isBlockShow = false;
						if(sItems instanceof Array && sItems.length > 0){
							sItem = sItems[0];
							if(sItem !== undefined && sItem !== null){
								var itemCnt = Number(sItem["employee_cnt"]);
								if(!isNaN(itemCnt)){
									isClear = false;
									
									if(itemCnt > totCnt){
										itemCnt = totCnt;
									}
									if($('input:radio[id=industry1]').is(':checked')){
										$catchmentAreaMenu.ui.createSolidGaugeChart('copr_work_DChart', itemCnt, totCnt, width, 140);
									}else if($('input:radio[id=industry2]').is(':checked')){
										$catchmentAreaMenu.ui.createSolidGaugeChart('copr_work_DChart02', itemCnt, totCnt, width, 140);
									}
								}
							}
						}else{
							$(".dChartTextHl03").html($("#detail_condtion_txt").text() + ' 종사자 수 : <b> 0명</b>');
						}
					}

					var itemNm = params["employee_cond_nm"];
					if(itemNm != undefined && itemNm != null){
						itemNm = itemNm.substring((itemNm.indexOf(":") + 1), itemNm.length).trim();
					}
					$("#dEmployeeType").html(itemNm);
					
					if(isClear){
						$(".selected_option_text").text('선택한 조건 : ' + $('#detail_condtion_txt').text());
						$catchmentAreaMenu.ui.createEmptySolidGaugeChart('copr_work_DChart');
						$catchmentAreaMenu.ui.createEmptySolidGaugeChart('copr_work_DChart02');
					}
					
					$catchmentAreaMenu.ui.setChkDetailAllData('employee', params, sData.employee_class);
				}
				
			
			},
			setDetailDataBoard : function(divType, dataType){
				$("#detail_data_popup").show();
	        	$("#data_popup").hide();
				
				var dataTitle = "";
				var dataYear = "";
				var rangeType = $catchmentAreaMenu.ui.statDataOption.params.rangeType;
				var rangeVal = $catchmentAreaMenu.ui.statDataOption.params.rangeVal;

				if(dataType == "pops"){//인구
					dataTitle = "인구";
					dataYear = $("#bYearSel03").val();
				}else if(dataType == "family"){//가구
					dataTitle = "가구";
					dataYear = $("#bYearSel03").val();
				}else if(dataType == "house"){//주택
					dataTitle = "주택";
					dataYear = $("#bYearSel03").val();
				}else if(dataType == "copr"){//사업체
					dataTitle = "사업체";
					dataYear = $("#bYearSel03").val();
				}else{//종사자
					dataTitle = "종사자";
					dataYear = $("#bYearSel03").val();
				}
				
				$("#datail_data_type").html(dataTitle);
				$("#datail_data_year").html("("+ dataYear + "년 기준)");

				if(!$('.dtlCond_chk.on').is(':visible') || divType == "basic"){ //기본통계 on
					//기본정보보기
					$("#chkDetail").hide();
					$("#basicDetail").show();
					
					$catchmentAreaDataBoard.ui.basicDatailData(dataType, dataYear, rangeType, rangeVal);
				}else{ // 주제별 통계 on
					//세부조선 설정 보기
					$("#basicDetail").hide();
					$("#chkDetail").show();
					
					$catchmentAreaDataBoard.ui.showChkDetailDiv(dataType);
				}
			},
			area_search : function() {
				$catchmentAreaMenu.ui.dStatType = "";
				var itemIds = [];
				var itemLbls = [];
				var param = {};
				var condBx = $("#statistics_topic option:selected");
        		param.statType = condBx.attr('data-stat-type'); 
        		$catchmentAreaMenu.ui.setGridStatConfigure(param)
        		var itemId = param.statType;		//종사자의 경우 condBxType와 param.statType 값이 달라짐.
				var itemLbl = "";
        		
				if(condBx.val() == "people"){
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
				}else if(condBx.val() == "family"){
					var householdTypeCvs = (param.householdType == undefined ? 'all' : param.householdType);
					itemId = itemId + "_" + householdTypeCvs;
					itemLbl = "가구 : " + param.schCondNm;
				}else if(condBx.val() == "house"){
					var rdResidTypeCvs = (param.rd_resid_type == undefined ? 'all' : param.rd_resid_type);
					var constYearCvs = (param.const_year == undefined ? 'all' : param.const_year);
					var houseAreaCdCvs = (param.house_area_cd == undefined ? 'all' : param.house_area_cd);					
					itemId = itemId + "_" + rdResidTypeCvs + "_" + constYearCvs + "_" + houseAreaCdCvs;
					itemLbl = "주택 : " + param.schCondNm;
				
				}else if(condBx.val() == "copr" || condBx.val() == "worker"){
					var ksic3CdCvs;
					ksic3CdCvs = (param.ksic_3_cd == undefined ? 'all' : param.ksic_3_cd);
					if($('input:radio[id=industry2]').is(':checked') && condBx.val() == "worker"){
						if(1 < ksic3CdCvs.length && ksic3CdCvs != 'all'){
							ksic3CdCvs = ksic3CdCvs.substring(2);
						}
					}
					
					itemId = itemId + "_" + param.grdstatType + "_" + ksic3CdCvs + "_" + param.isLifeBiz;
					if(param.grdstatType == "copr"){
						itemLbl = "사업체 : " + param.schCondNm;
					}else if(param.grdstatType == "employee"){
						itemLbl = "종사자 : " + param.schCondNm;
					}	
				}
				
				itemIds.push(itemId);
				itemLbls.push(itemLbl);
				
				if(itemIds.length > 0){
					$catchmentAreaMenu.ui.requestCharacteristicsStats(itemIds, itemLbls);
				}

			},
			
			dTotPieChart : function(dataType, data, target, pWidth, pHeight, statColors){
				var unitNm = "명";
				if(dataType == 'family'){
					unitNm = "가구";
				}else if(dataType == 'house'){
					unitNm = "호";
				}else if(dataType == 'copr'){
					unitNm = "개";
				}

				$("#"+target).highcharts({
					chart: {
		  				type: 'pie',
		  				width: pWidth,
		  				height: pHeight,
		  				marginRight: 120,
		  			},
		  			title: {
		  				text : ''
		  			},
		  			tooltip: {
		  		        pointFormat: '<b>{point.y} ' + unitNm + '</b><br/>{point.percentage:.1f} %'
		  		    },
		  			exporting: {
		  		        enabled: false
		  		    },
		  			plotOptions: {
						pie: {
							allowPointSelect: true,
						    cursor: 'pointer',
						    dataLabels: {
						    	distance: 5,
						        format: '{y:,.0f}' + unitNm,
						        style :{
						        	fontSize : "13px"
						        }
						    },
						    showInLegend: true
	                   },
	               },
	               legend: {
	            	   enabled: true,
	                   align: 'right',
	                   verticalAlign: 'top',
	                   layout: 'vertical',
	                   x: 0,
	                   y: 50
	               },
	               series: [{
		  				size: '100%',
		  			    innerSize: '50%',
		  				data: data,
		  				colors : statColors
		  			}]
				});
			},
			dTotPieChart_ALL : function(dataType, data, target, pWidth, pHeight, statColors){
				var unitNm = "명";
				var tot;
				var title_text;
				if(dataType == 'family'){
					unitNm = "가구";
					$("#familyType01").text("친족   " + $catchmentAreaMap.ui.comma(data[0].y) + " 가구  ");
					$("#familyType02").text("1인 가구   " + $catchmentAreaMap.ui.comma(data[1].y) + " 가구  ");
					$("#familyType03").text("비친족   " + $catchmentAreaMap.ui.comma(data[2].y) + " 가구  ");
					
					tot = data[0].y + data[1].y +data[2].y;
					title_text = "영역 내 전체 <br>" + $catchmentAreaMap.ui.comma(tot) + "가구";
				}else if(dataType == 'house'){
					unitNm = "호";
					$("#houseType01").text("단독주택   " + $catchmentAreaMap.ui.comma(data[0].name));
					$("#houseType02").text("아파트   " + $catchmentAreaMap.ui.comma(data[1].name));
					$("#houseType03").text("연립주택   " + $catchmentAreaMap.ui.comma(data[2].name));
					$("#houseType04").text("다세대 주택   " + $catchmentAreaMap.ui.comma(data[3].name));
					$("#houseType05").text("비거주용 건물 내 주택  " + $catchmentAreaMap.ui.comma(data[4].name));
					
				}else if(dataType == 'copr'){
					unitNm = "개";
				}
				

				$("#"+target).highcharts({
					chart: {
		  				type: 'pie',
		  				width: pWidth,
		  				height: pHeight*1.5,
		  			},
		  			title: {
		  				text : title_text,
		  				textsize : "12px",
				    	align : 'center',
				    	verticalAlign : 'middle'
		  			},
		  			tooltip: {
		  				enabled : false
		  		    },
		  			exporting: {
		  		        enabled: false
		  		    },
		  		  plotOptions: {
		  				pie: {
						      dataLabels: {
						    	  enabled: true,
					                distance: 0,
					                style: {
					                    color: '#333333',
					                    fontweight : '"Noto Sans KR", sans-serif',
					                    fontSize : "13px"
					                }
						      },
						      showInLegend: true,
						      startAngle: -90,
						      endAngle: 90,
						      center: ['50%', '75%'],
						      size: '100%'
						    }
	               },
	               legend: {
	            	   enabled: false,
	                   align: 'left',
	                   verticalAlign: 'Bottom',
	                   layout: 'vertical',
	                   x: 0,
	                   y: 350
	               },
	               series: [{
		  				size: '100%',
		  			    innerSize: '67%', 
		  				data: data,
		  				colors : statColors
		  			}]
				});
			},
			didSelectKSICItem : function(pObj, add_list){
				if(pObj !== undefined && pObj !== null){
					var selObj = pObj;
					var selKsicCode = selObj["ksicCode"];
					var classDepth = selKsicCode.length;
					var classList = ["mainCl", "middleCl", "subCl", "subDiv1", "subDiv2"];
					
					if(selObj["params"] !== undefined && selObj["params"] !== null){
						if(selObj.params["workGb"] == "gridStat_copr" || selObj.params["workGb"] == "gridStat_employee" || selObj.params["workGb"] == "areaStat_copr" || selObj.params["workGb"] == "areaStat_employee"){		
							var $div;
							$div = add_list;
							var clsNms = "";
							if(classDepth === 1){
								clsNms = selObj["ksicCodeNm"];
							}else{
								clsNms = selObj["superKsicCodeNm"].split(":");
							}
							var loopCnt = classList.length;
							if(selObj.mainKsicCd == selObj.ksicCode){
								loopCnt = 0;
							}
							var html = "";
							html += '<p>[상위 산업분류 정보]</p>'
							if(loopCnt == 0 ){
								html += '<p>'+ selObj["mainKsicCd"] + "." + clsNms +'</p>';
							}else{
								html += '<p>'+ selObj["mainKsicCd"] + "." + clsNms[0] +'</p>';
								for(var i=0; i<loopCnt; i++){
									if(clsNms[i+1] != null || clsNms[i+1] != undefined){
										html += '<p>'+ selKsicCode.substring(0, (i + 2)) + "." + clsNms[i+1] +'</p>';
									}else if(i == (loopCnt - 1)){
										html += '<p>'+ selKsicCode.substring(0, (i + 2)) + "." + selObj["ksicCodeNm"] +'</p>';
									}
								}
							}
							$div.html(html);
							$div.css("display","block");
						}
					}
				}
			},
			//리포트
			   /**
			 * @name         : setReport
			 * @description  : 영향권 통계정보 세팅.
			 */
			setReport : function(){
				var tempText = "";
				var tempIndex = [];
				$catchmentAreaMenu.ui.selMapLocTxt = $("#map_area_name_text").text();
				$catchmentAreaMenu.ui.mapHeight = $(".mapArea").css('height');
				$catchmentAreaMenu.ui.mapWidth = $(".mapArea").css('width');
				$catchmentAreaMenu.ui.clearLayers_report();				
				var index = parseInt($("#menu_4_button > button.on").attr('data-index'));
				var indexText = $("#menu_4_button > button.on").attr('data-name');
				
				$catchmentAreaMenu.ui.reportSelectRange = 1;
				var selText = $("#menu_4_button > button.on").attr('data-name');
				tempIndex.push(index);
				
				if($catchmentAreaMap.ui.isReportType == "srv"){

					$catchmentAreaMenu.ui.requstSrvAreaReportData(index, indexText, selText);					
				}
				
				if($catchmentAreaMap.ui.isReportType == "srv"){
					//생활권역 다시 그림
					$catchmentAreaMenu.ui.setReportMap(tempIndex, $catchmentAreaMenu.ui.getRangeType());
				}
				
				tempText += indexText + " ";
				$catchmentAreaMenu.ui.tempText = tempText;
				
				$catchmentAreaMap.ui.reportRangeText = tempText;
				// $catchmentAreaMenu.ui.reportLoad가 먼저 실행되는 경우 때문에 catchmentAreaApi.js sop.portal.getSrvAreaReportStatis.api로 이동 
				/*var width = $(window).width();
				var height = $(window).height();
				$catchmentAreaMenu.ui.reportPopup = window.open("catchmentareaMap_report.sgis", "reportPrint","width=" + width + ", height="+height +", scrollbars=yes");*/
			},
			   /**
			 * @name         : requstSrvAreaReportData
			 * @description  : 영향권 통계정보를 요청한다.
			 */			
			requstSrvAreaReportData : function(pPageNo, indexText, selText) {
				var param = {};
				var area = ""; 
				var radius;
				var rangeType = $catchmentAreaMenu.ui.getRangeType();
				
				if(rangeType == "stats_radio_d" || rangeType == "stats_radio_t" ){
					var selectIndex = $('#menu_4_button button').length - pPageNo -1;
					var polyPoints = $catchmentAreaMenu.ui.selectPolygonPointsArr[selectIndex];
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
				}else if(rangeType == "stats_radio_r"){
					area = 'POINT(';
					area += $catchmentAreaMenu.ui.selectCoordinate_x + " " + $catchmentAreaMenu.ui.selectCoordinate_y;
					area += ')';
					// 버튼 선택된 값으로 크기 설정
					radius = $("#menu_4_button button.on").attr("data-value");
					param.area = area;
					param.radius = radius;
					param.srvAreaType = 2;
				}
				
				if(area != ""){
					var identifier;
					
					if(param.identifier !== undefined && param.identifier !== null ){
						identifier = param.identifier;
					}else{
						identifier = new Date().getTime();
					}
					
					var remainCnt = $catchmentAreaMenu.ui.tempText.length;

					param.identifier = identifier;
					param.workGb = "all";
					param.async = true;
					param.base_year = $catchmentAreaMap.ui.getBaseYear("1");
					param.copr_base_year = $catchmentAreaMap.ui.getBaseYear("2");
					param.classDeg = $catchmentAreaMap.ui.classDeg;
					param.index = pPageNo;
					param.indexText = indexText;
					param.selText = selText;
					var params;
					params = $catchmentAreaMenu.ui.reqSetParams2("API_202013", param);
					$catchmentAreaMenu.ui.requestOpenApi(params);
					$catchmentAreaMask.endUnitWork(param.identifier);
				}
		    },
			reportLoad : function(result, option){
				//param4
				var param, statsData = [];
				var locationText, rangeText, yearText, rangeTypeText = "";
				var rangeType = $catchmentAreaMenu.ui.getRangeType();
				//mapId 확인
				var mapId = 0;
				
				
				param = {
						mapList : $catchmentAreaMap.ui.mapList[1],
						rndmFlag : $catchmentAreaMenu.ui.rndmFlag,
						x_coor : $catchmentAreaMenu.ui.selectCoordinate_x,
						y_coor : $catchmentAreaMenu.ui.selectCoordinate_y,
						mapHeight : $catchmentAreaMenu.ui.mapHeight,
						mapWidth : $catchmentAreaMenu.ui.mapWidth,
						statLocation : $catchmentAreaMenu.ui.selMapLocTxt,
						base_year : option.params.base_year,
						copr_base_year : option.params.copr_base_year,
						reportType : $catchmentAreaMap.ui.isReportType,
						index : option.params.index,
						rangeType : rangeType,
						indexText : option.params.indexText,
						selText : option.params.selText,
						mapId : mapId
					};
				
				//보고서용으로 정보필터
				if($catchmentAreaMap.ui.isReportType == "srv"){ //영향권
					$catchmentAreaMenu.ui.srvAreaStatDataFilter(result, function(data){
						statsData = data;					
					});
				}
				
				var dataList = {
						params : param
						,stats : statsData
				};					
				
				
				if(dataList.params.indexText == dataList.params.selText){
					setTimeout(function() {
						var popup = $catchmentAreaMenu.ui.reportPopup.$catchmentAreaReport.ui;
						popup.setData(dataList, option);
					}, 1500);
				}
				
			
			},
			/**
			 * @name         : srvAreaStatDataFilter
			 * @description  : 영향권 보고서정도 필터
			 */
				srvAreaStatDataFilter : function(data, callback) {
					var result = [];
					var areaSize = "";
					var totPopCnt = 0;
					var totGenderCnt = 0;
					var totFamilyCnt = 0;
					var totHouseCnt = 0;
					var popsDatas = [];
					var genderDatas = [];
					var familyDatas = [];
					var houseDatas = [];
					var coprData = [];
					var coprDatas = [];
					var totCoprCnt = 0;
					var totCoprCntOgl = 0;
					var top3CoprCnt = 0;
					var tempCoprCnt = 0;
			    	var top3_coprData = [];
			    	var tempCoprData = [];
			    	var totCoprData = [];
			    	var workerData = [];
			    	var workerDatas = [];
					var totWorkerCnt = 0;
					var totWorkerCntOgl = 0;
					var top3WorkerCnt = 0;
					var tempWorkerCnt = 0;
			    	var top3_workerData = [];
			    	var tempWorkerData = [];
			    	var totWorkerData = [];
					var top3LoopCnt = 0;
					
					//면적
			    	areaSize = (Number(data.areaSize[0].area_size) / 1000000).toFixed(2);
			    	if(data.pops[0] != null){
			    		
			    		totPopCnt = data.pops[0].popsTotOgl;
						totGenderCnt = data.pops[0].popsTotOgl;
						
						popsDatas.push({name : "0~9세 인구", y : data.pops[0].age_1_cnt});
				    	popsDatas.push({name : "10~19세 인구", y : data.pops[0].age_2_cnt});
				    	popsDatas.push({name : "20~29세 인구", y : data.pops[0].age_3_cnt});
				    	popsDatas.push({name : "30~39세 인구", y : data.pops[0].age_4_cnt});
				    	popsDatas.push({name : "40~49세 인구", y : data.pops[0].age_5_cnt});
				    	popsDatas.push({name : "50~59세 인구", y : data.pops[0].age_6_cnt});
				    	popsDatas.push({name : "60~69세 인구", y : data.pops[0].age_7_cnt});
				    	popsDatas.push({name : "70~79세 인구", y : data.pops[0].age_8_cnt});
				    	popsDatas.push({name : "80세 이상 인구", y : data.pops[0].age_9_cnt});
				    	
				    	genderDatas.push({name : "남", y : data.pops[0].man_cnt});
				    	genderDatas.push({name : "여", y : data.pops[0].woman_cnt});
			    		
			    	}
			    	if(data.family[0] != null){
						totFamilyCnt = data.family[0].familyTotOgl;
						familyDatas.push({name : "친족 가구", y : data.family[0].family_3_cnt});
						familyDatas.push({name : "1인 가구", y : data.family[0].family_1_cnt});
				    	familyDatas.push({name : "비친족 가구", y : data.family[0].family_2_cnt});
				    	
					}
			    	if(data.house[0] != null){
						totHouseCnt = data.house[0].houseTotOgl;
						
						houseDatas.push({name : "단독주택", y : data.house[0].house_1_cnt});
				    	houseDatas.push({name : "아파트", y : data.house[0].house_2_cnt});
				    	houseDatas.push({name : "연립주택", y : data.house[0].house_3_cnt});
				    	houseDatas.push({name : "다세대주택", y : data.house[0].house_4_cnt});
				    	houseDatas.push({name : "비거주용 건물 내주택", y : data.house[0].house_5_cnt});
					}
			    	
			    	
			    	if(data.copr != null){
			    		//사업체
				    	var coprDataTemp = deepCopy(data.copr);

						coprDataTemp.sort(function (a, b) {
							return a.corp_cnt > b.corp_cnt ? -1 : a.corp_cnt < b.corp_cnt ? 1 : 0;						
						});
						$.each(coprDataTemp, function(index, item){
							if(index == 0){
								totCoprCntOgl = item.corp_cnt;
							}else{
								coprData.push({name : item.name , y : item.corp_cnt});
							}						
						});
						
						if(totCoprCntOgl === undefined){
							totCoprCnt = 0;
						}else{
							totCoprCnt = totCoprCntOgl;
						}
						
						totCoprData = [{name : '전체' , y : totCoprCnt}];
						
						//top3
						var coprLoopCnt = coprData.length;
						if(coprLoopCnt > 0){
							top3LoopCnt = (coprLoopCnt >= 3) ? 3 : coprLoopCnt;
						
							for(var i=0; i < top3LoopCnt; i++){							
								top3_coprData[i] = coprData[i];
								top3CoprCnt += coprData[i].y;
								totCoprData.push(top3_coprData[i])
							}
							
							if(totCoprCnt < top3CoprCnt){
								totCoprCnt = top3CoprCnt;
							}
							
							//top3 나머지
							tempCoprCnt = totCoprCnt - top3CoprCnt;
							tempCoprData = [{name : '기타 사업체', y : tempCoprCnt}];
							
							coprDatas = top3_coprData;
							coprDatas.push({name : '기타 사업체', y : tempCoprCnt});
							totCoprData.push({name : '기타 사업체', y : tempCoprCnt});
						}
						
				    	//종사자
						var workerDataTemp = deepCopy(data.copr);
						
						workerDataTemp.sort(function (a, b) {
							return a.employee_cnt > b.employee_cnt ? -1 : a.employee_cnt < b.employee_cnt ? 1 : 0;						
						});
						
						$.each(workerDataTemp, function(index, item){
							if(index == 0){
								totWorkerCntOgl = item.employee_cnt;
							}else{						
								workerData.push({name : item.name , y : item.employee_cnt});
							}						
						});
						
						if(totWorkerCntOgl === undefined){
							totWorkerCnt = 0;
						}else{
							totWorkerCnt = totWorkerCntOgl;
						}
						
						totWorkerData = [{name : '전체' , y : totWorkerCnt}]
						
						//top3
						var workerLoopCnt = workerData.length;

						if(workerLoopCnt > 0){
							top3LoopCnt = (workerLoopCnt >= 3) ? 3 : workerLoopCnt;
							
							for(var i=0; i < top3LoopCnt; i++){
								top3_workerData[i] = workerData[i];
								top3WorkerCnt += workerData[i].y;
								totWorkerData.push(top3_workerData[i])
							}
							
							if(totWorkerCnt < top3WorkerCnt){
								// 머시기로 구한 총합이 탑3합보다 작으면  
								totWorkerCnt = top3WorkerCnt;
							}
							
							//top3 나머지
							tempWorkerCnt = totWorkerCnt - top3WorkerCnt;	
							tempWorkerData = [{name : '기타 사업체', y : tempWorkerCnt}];
							workerDatas = top3_workerData;
							workerDatas.push({name : '기타 사업체', y : tempWorkerCnt});
							totWorkerData.push({name : '기타 사업체', y : tempWorkerCnt});
						}
			    	}
			    	result.push({name : "areaSize" , data : areaSize});
			    	result.push({name : "popsDatas" , data : popsDatas});
			    	result.push({name : "genderDatas" , data : genderDatas});
			    	result.push({name : "familyDatas" , data : familyDatas});
			    	result.push({name : "houseDatas" , data : houseDatas});
			    	result.push({name : "top3_coprData" , data : top3_coprData});
			    	result.push({name : "tempCoprData" , data : tempCoprData});
			    	result.push({name : "totCoprData" , data : totCoprData});
			    	result.push({name : "top3_workerData" , data : top3_workerData});
			    	result.push({name : "tempWorkerData" , data : tempWorkerData});
			    	result.push({name : "totWorkerData" , data : totWorkerData});
			    	result.push({name : "totPopCnt" , data : totPopCnt});
			    	result.push({name : "totGenderCnt" , data : totGenderCnt});
			    	result.push({name : "totFamilyCnt" , data : totFamilyCnt});
			    	result.push({name : "totHouseCnt" , data : totHouseCnt});
			    	result.push({name : "coprDatas" , data : coprDatas});
			    	result.push({name : "workerDatas" , data : workerDatas});

			    	if (callback != undefined && callback != null && callback instanceof Function) {
							callback.call(undefined, result);
					}		    		    	
			},
			setReportMap : function(selectIndex, type){
				
				var reportMap = $catchmentAreaMap.ui.mapList[1];
				
		    	var x = $catchmentAreaMenu.ui.selectCoordinate_x;
		    	var y = $catchmentAreaMenu.ui.selectCoordinate_y;
		    	var outerBounds; //제일마지막 도형		    	
		    	
		    	$catchmentAreaMap.ui.map_report.mapMove(x, y, reportMap);
		    	
		    	if(type == "stats_radio_d" || type == "stats_radio_t"){
		    	var drawObj = $catchmentAreaMap.draw_report;
			    	
			    var shapeOptions = [{
		        		stroke : true,
		        		weight : 1.5,
		        		opacity : 0.7,
		        		fill : true,
		        		fillColor : $catchmentAreaMap.ui.saShpColor[3],
		        		fillOpacity : 0.3,
		        		color : $catchmentAreaMap.ui.saShpColor[3],
		        		clickable : true
		        	},{
		        		stroke : true,
		        		weight : 1.5,
		        		opacity : 0.7,
		        		fill : true,
		        		fillColor : $catchmentAreaMap.ui.saShpColor[2],
		        		fillOpacity : 0.3,
		        		color : $catchmentAreaMap.ui.saShpColor[2],
		        		clickable : true
		        	},{
		        		stroke : true,
		        		weight : 1.5,
		        		opacity : 0.7,
		        		fill : true,
		        		fillColor : $catchmentAreaMap.ui.saShpColor[1],
		        		fillOpacity : 0.3,
		        		color : $catchmentAreaMap.ui.saShpColor[1],
		        		clickable : true
		        	},{
		        		stroke : true,
		        		weight : 1.5,
		        		opacity : 0.7,
		        		fill : true,
		        		fillColor : $catchmentAreaMap.ui.saShpColor[0],
		        		fillOpacity : 0.3,
		        		color : $catchmentAreaMap.ui.saShpColor[0],
		        		clickable : true
		        	}];
			    
			    var polyPoints;
		    	
		    	for(var i = selectIndex.length; i>0; i--){
		    		
		    		var tempIndex = ($catchmentAreaMenu.ui.selectPolygonPointsArr.length)-selectIndex[i-1] -1;
		    		var polyPoints = $catchmentAreaMenu.ui.selectPolygonPointsArr[tempIndex]; 
		    		
		    		drawObj._polygon = new sop.Polygon(polyPoints, shapeOptions[(shapeOptions.length - i)]);
					drawObj._polygonGroup.addLayer(drawObj._polygon);
					
		    		if(i == selectIndex.length){
		    			outerBounds = drawObj._polygon.getBounds();
		    		}
		    	}
		    	drawObj.polygon();
		    	drawObj.map.gMap.fitBounds(outerBounds);
		    	//마커 찍기
		    	$catchmentAreaMenu.ui.creatSimpleSearchMarker(x, y, 1);
	    	}else{
	    		
	    		var radius = $('#menu_4_button button.on').attr('data-value');
	    		$catchmentAreaMap.ui.creatSearchPoiMarker_report(x,y); 
    			$catchmentAreaMenu.ui.setCircleMarker_report(x, y, radius, 1);
	    	}
	    	
	    	
	    },
	    /**
		 * 
		 * @name         : creatSearchPoiMarker
		 * @description  : 아무 기능도 없는 마커를 그린다.
		 * @parameter	 : x축, y축, 맵 아이디
		 */
		creatSimpleSearchMarker: function(x, y, mapId) {
			if(mapId === undefined) {
				console.error('mapId 인자값을 넣어주셔야 합니다.');
				return;
			}
			$catchmentAreaMap.ui.map_report.markers.clearLayers(); //마커 초기화
			if(mapId === 0) {
				$catchmentAreaMenu.ui.selectCoordinate_x = x;
				$catchmentAreaMenu.ui.selectCoordinate_y = y;					
			}else if(mapId == 1){
				$catchmentAreaMenu.ui.selectCoordinate_x = x;
				$catchmentAreaMenu.ui.selectCoordinate_y = y;
			}
			
			var map = $catchmentAreaMap.ui.getMap(mapId);
			
			
			var map = $catchmentAreaMap.ui.map_report;
			var markerIcon = sop.icon({
				iconUrl: contextPath +"/resources/m2021/images/map/i_pin--on.png",
				iconAnchor: [12.5, 40 ],
				iconSize: [ 25, 40 ],
				infoWindowAnchor: [1, -34],
			});
			
			var marker = sop.marker([ x, y ], {icon : markerIcon});								
			map.markers.addLayer(marker);
		},
			/**
			 * @name         : doCapture
			 * @description  : 보고서의 이미지를 캡쳐한다.
			 */
			doCapture : function(targetId, callback) {
		    	html2canvas($(targetId)[0], {
		    		scale:2,
					logging: false,
					useCORS: false,
					proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
				}).then(function(canvas) {
					if (callback != undefined && callback != null && callback instanceof Function) {
						var data = canvas.toDataURL();
						callback.call(undefined, data);
					}else{
						var a = document.createElement('a');
	    				a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	    				a.download = "report.png";
	    				a.click();
					}
		    	});
		    },
		
		    grid_exception : function() {
		    	if($catchmentAreaMenu.ui.grid_30km){
		    		$('#500m_grid_rd').trigger('click');
				}
		    	var x_coordinate =  $catchmentAreaMenu.ui.selectCoordinate_x; 
				var y_coordinate =  $catchmentAreaMenu.ui.selectCoordinate_y; 
				var scopeType;
				var pass = false;
				var type = '';
				var scope = '';
				$catchmentAreaMenu.ui.grid_30km = false;
		    	if($("#grid_fixed_selected").hasClass("on")){
			    	scopeType = $("input:radio[name='stats_radio_grid']:checked").attr("id");
					if(scopeType == 'stats_radio_t_grid'){
						type = '주행시간';
						$catchmentAreaMenu.ui.settingSrvAreaTimeMap(x_coordinate, y_coordinate, false);
					}else if(scopeType == 'stats_radio_d_grid'){
						type = '주행거리';
						$catchmentAreaMenu.ui.settingSrvAreaDistanceMap(x_coordinate, y_coordinate, false);
					}else if(scopeType == 'stats_radio_r_grid'){
						type = '반경';
						$catchmentAreaMenu.ui.settingCircleMap(x_coordinate, y_coordinate, false);
					} 
					pass = true;
					$catchmentAreaMenu.ui.rndmFlag = false;
		    	} else if($("#grid_directly_selected").hasClass("on")){
			    	if($("#grid_setting_directly .on a").attr("id") == "rndstats01_grid"){
						type = '주행시간';
						$catchmentAreaMenu.ui.t_rndm_grid = [];
						$catchmentAreaMenu.ui.t_rndm_grid.push($('#grid_setting_selected_1 .self-select__circle.bg-red.active').attr("data-value"));
						$catchmentAreaMenu.ui.settingSrvAreaTimeMap(x_coordinate, y_coordinate, false);
					}else if($("#grid_setting_directly .on a").attr("id") == "rndstats02_grid"){
						type = '주행거리';
						$catchmentAreaMenu.ui.d_rndm_grid = [];
						$catchmentAreaMenu.ui.d_rndm_grid.push($('#grid_setting_selected_2 .self-select__circle.bg-red.active').attr("data-value"));
						$catchmentAreaMenu.ui.settingSrvAreaDistanceMap(x_coordinate, y_coordinate, false);
					}else if($("#grid_setting_directly .on a").attr("id") == "rndstats03_grid"){
						type = '반경';
						$catchmentAreaMenu.ui.r_rndm_grid = [];
						$catchmentAreaMenu.ui.r_rndm_grid.push($('#grid_setting_selected_3 .self-select__circle.bg-red.active').attr("data-value"));
						$catchmentAreaMenu.ui.settingCircleMap(x_coordinate, y_coordinate, false);
					}
					pass = true;
					$catchmentAreaMenu.ui.rndmFlag = true;
		    	}
		    	
		    	
				var scope_info_str = '';	 
				for(var a = 0; a < $catchmentAreaMenu.ui.scope_info.length; a++){
				  scope_info_str += $catchmentAreaMenu.ui.scope_info[a];
				}
				  scope = scope_info_str.slice(0,-1);
				  
				if(type == '주행거리' || type == '반경'){
				   scope += 'km';
				}else{
				   scope += '분';
				}
				if(pass){
					   $('#slide-area .btn-slideup span').hide();
					   $(".map__result__tit > p").text("영역 내 통계정보");
					   //2022-10-18 이벤트 추가
					   $('.map__result__tit').removeClass('on');
					   $(".map__below").animate({
					   		//2022-10-18 height 수정
				            'height' : '50px'
				         // 'height' : '90px'
				        },400,function(){
				            $(".map__slideup").prop("style","box-shadow: 0px 1px 4px 0px rgb(133 133 133 / 35%);");
				            $(".map__form").css("display", "block");
				            $(".map__result__con").css("display", "block");
				            $(".life-industry").css("display", "block");
				        });
				   	 
				       $(".map__search").animate({
				       		//2022-10-18 height 수정
				           'height' : '50px'
				         // 'height' : '90px'  
				       },400,function(){
				           $(".map__slideup").prop("style","box-shadow: none;");
				           $(".map__form").css("display", "none");
				           $(".map__result__con").css("display", "none");
				           $(".life-industry").css("display", "none");
				       });
				       
				       $('.slide_up').css("display","block");
				       $('#menu_3').removeClass('active');
				       $('#menu_3').hide();
				       
				       $('#searchPoi').hide();
				       $('#searchPoi_restart').show();
				       $('#setting_info_display p:eq(0)').text(type);
				       $('#setting_info_display p:eq(1)').text(scope);
				       $('#setting_info_display').show();
				       if($('#default_type_select button.on').val() == 0){
				    	   $('#menu_4').addClass('active');
					       $('#menu_4').show();
					       $catchmentAreaMenu.ui.settingStatisticsDataList();
				     	   $('#menu_4_button button').eq(0).trigger('click');
				       }else if($('#default_type_select button.on').val() == 1){
				    	   $('#menu_5').addClass('active');
					       $('#menu_5').show();
				       }
			    }
		    }
	};
	$catchmentAreaMenu.callbackFunc = {
			
	};
	$catchmentAreaMenu.event = {
			setUIEvent : function() {
				var body = $("body");				
				body.on("click", ".map__facility__list .option__btn", function(){
					$(this).toggleClass("selected");
					if($(".option__btn .selected")){
						$('.option__btn').not($(this)).removeClass('selected');
					}
					srvLogWrite('O0', '12', '04', '02', $(this).text(), '');
		    	});
				
				//주행시간 기준
			    body.on("click", "#stats01",function(){
			    	   $catchmentAreaMenu.ui.typeAllRemoveClass("all");
			    	   
			    	   var x_coordinate = $catchmentAreaMenu.ui.selectCoordinate_x //x좌표
			    	   var y_coordinate = $catchmentAreaMenu.ui.selectCoordinate_y //y좌표
			    	   var defaultVal = $catchmentAreaMenu.ui.t_default;
			    	   
			    	   $('.stats_radio.area').prop('checked',false);
			    	   $(this).siblings('input').prop('checked',true);
			    	   
			    	   $("#type_t").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   var selectVal = $(this).attr("data-value");
			    		   $.each(defaultVal, function(index, item){
			    			   if(selectVal == item){
			    				   $("#"+selectId).addClass("active");
				    		   }
			    		   });
			    	   });
			    	   
					   // 도형색상과 일치
			    	   $catchmentAreaMenu.ui.setRangeDisplay('T');
			    });
			    
			    body.on("click", "#stats01_grid",function(){
			    	$catchmentAreaMenu.ui.typeAllRemoveClass_grid("all");
			    	
			    	var x_coordinate = $catchmentAreaMenu.ui.selectCoordinate_x //x좌표
			    	var y_coordinate = $catchmentAreaMenu.ui.selectCoordinate_y //y좌표
			    	var defaultVal = $catchmentAreaMenu.ui.t_default;
			    	
			    	$('.stats_radio.grid').prop('checked',false);
			    	$(this).siblings('input').prop('checked',true);
			    	$($("#type_t_grid li:eq(0)")).addClass("active");
			    	// 도형색상과 일치
			    	$catchmentAreaMenu.ui.setRangeDisplay_grid('T');
			    });
			    body.on("click", "#stats02",function(){
			    	$catchmentAreaMenu.ui.typeAllRemoveClass("all");
			    	   
			    	   var x_coordinate = $catchmentAreaMenu.ui.selectCoordinate_x //x좌표
			    	   var y_coordinate = $catchmentAreaMenu.ui.selectCoordinate_y //y좌표
			    	   var defaultVal = [500,1000,2000,3000];
			    	   
			    	   $('.stats_radio.area').prop('checked',false);
			    	   $(this).siblings('input').prop('checked',true);
			    	   
			    	   $("#type_d").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   var selectVal = $(this).attr("data-value");
			    		   $.each(defaultVal, function(index, item){
			    			   if(selectVal == item){
			    				   $("#"+selectId).addClass("active");
				    		   }
			    		   });
			    	   });
			    	   
					   // 도형색상과 일치
			    	   $catchmentAreaMenu.ui.setRangeDisplay('D');
			    });
			    
			    body.on("click", "#stats02_grid",function(){
			    	$catchmentAreaMenu.ui.typeAllRemoveClass_grid("all");
			    	   
			    	   var x_coordinate = $catchmentAreaMenu.ui.selectCoordinate_x //x좌표
			    	   var y_coordinate = $catchmentAreaMenu.ui.selectCoordinate_y //y좌표
			    	   var defaultVal = [500,1000,2000,3000];
			    	   
			    	   $('.stats_radio.grid').prop('checked',false);
			    	   $(this).siblings('input').prop('checked',true);
			    	   $($("#type_d_grid li:eq(0)")).addClass("active");
			    	   
					   // 도형색상과 일치
			    	   $catchmentAreaMenu.ui.setRangeDisplay_grid('D');
			    });
			    
			    body.on("click", "#stats03",function(){
			    	   $catchmentAreaMenu.ui.typeAllRemoveClass("all");
			    	   
			    	   var x_coordinate = $catchmentAreaMenu.ui.selectCoordinate_x //x좌표
			    	   var y_coordinate = $catchmentAreaMenu.ui.selectCoordinate_y //y좌표
			    	   var defaultVal = [500,1000,2000,3000];
			    	   
			    	   $('.stats_radio.area').prop('checked',false);
			    	   $(this).siblings('input').prop('checked',true);
			    	   
			    	   $("#type_r").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   var selectVal = $(this).attr("data-value");
			    		   $.each(defaultVal, function(index, item){
			    			   if(selectVal == item){
			    				   $("#"+selectId).addClass("active");
				    		   }
			    		   });
			    	   });
			    	   
					   // 도형색상과 일치
			    	   $catchmentAreaMenu.ui.setRangeDisplay('R');
			    });
			    
			    body.on("click", "#stats03_grid",function(){
			    	   $catchmentAreaMenu.ui.typeAllRemoveClass_grid("all");
			    	   
			    	   var x_coordinate = $catchmentAreaMenu.ui.selectCoordinate_x //x좌표
			    	   var y_coordinate = $catchmentAreaMenu.ui.selectCoordinate_y //y좌표
			    	   var defaultVal = [500,1000,2000,3000];
			    	   
			    	   $('.stats_radio.grid').prop('checked',false);
			    	   $(this).siblings('input').prop('checked',true);
			    	   $($("#type_r_grid li:eq(0)")).addClass("active");
			    	   
					   // 도형색상과 일치
			    	   $catchmentAreaMenu.ui.setRangeDisplay_grid('R');
			    });
			    body.on("click","input:radio[name='stats_radio']:radio[id='stats01']",function(){
			    	   if($(this).hasClass('noSel')){ return false; }
			    	   
			    	   $catchmentAreaMenu.ui.typeAllRemoveClass("all");
			    	   
			    	   var x_coordinate = $catchmentAreaMenu.ui.selectCoordinate_x //x좌표
			    	   var y_coordinate = $catchmentAreaMenu.ui.selectCoordinate_y //y좌표
			    	   var defaultVal = $catchmentAreaMenu.ui.d_default;
			    	   
			    	   $("#type_d").children("li").each(function(){
			    		   var selectId = $(this).attr("id");
			    		   var selectVal = $(this).attr("data-value");
			    		   $.each(defaultVal, function(index, item){
			    			   if(selectVal == item){
			    				   $("#"+selectId).addClass("active");
				    		   }
			    		   });
			    	   });
			    	   
					   // 도형색상과 일치
					   $catchmentAreaMenu.ui.setRangeDisplay('D');
						
			    });
			    
			    
			    //주행시간 기준 토글 하나씩 선택시 이벤트
			    body.on("click", "#type_t li", function(){

			    	   if($('#stats01').hasClass('noSel')){ return false; }
			    	   
			    	   $catchmentAreaMenu.ui.typeAllRemoveClass("t");
			    	   var radioId = $(this).parents('div').children('div').children('input').attr('id');
			    	   var selectLength = 0;	    	   
			    	   var on = $(this).hasClass("active");
			    	   var radio_length = $("#type_t li.active").length;
			    	   var selectId = $(this).attr("id");
			    	   var x_coordinate = $catchmentAreaMap.ui.selectCoordinate_x //x좌표
			    	   var y_coordinate = $catchmentAreaMap.ui.selectCoordinate_y //y좌표
			    	   
			    	   if($('input:radio[name="stats_radio"]:radio[id="'+radioId +'"]').is(':checked')){
			    	   }else{
				    	   $("input:radio[name='stats_radio']:radio[id='"+radioId+"']").prop("checked", true);
			    	   }
			    	   
			    	   //선택 갯수 확인
			    	   $("#type_t").children("a").each(function(){
			    		   var lengthOn = $(this).hasClass("active");
			    		   if(lengthOn){
			    			   selectLength++;			    			   
			    		   }
			    	   });
			    	   
			    	   if(on){
			    		   $("#"+selectId).removeClass("active");
			    		   if(radio_length == 1){
			    			   $('#default-layer').show();
			    			   $('#modal_body  > p').html("동일 기준에서 1개 이상 선택해 주십시오.<br>(1~4개 선택 가능)");
				    		   $('.dim').show();
				    		   $(this).addClass("active bg0");
				    		   return false;
			    		   }
			    	   }else{
			    		   if(selectLength >= 4  ){
			    			   $('#default-layer').show();
			    			   $('#modal_body  > p').html("동일 기준에서<br>1개~4개까지 선택할 수 있습니다.");			    			   
				    		   $('.dim').show();				    		
				    		   return false;
				    	   }else{
				    		   $("#"+selectId).addClass("active")
				    		   $("#stats_radio_t").prop('checked',true);
				    	   }
			    		   
			    	   }
						// 도형색상과 일치
						$catchmentAreaMenu.ui.setRangeDisplay('T');
			    });
			    
			   // 격자 주행시간 기준 토글 하나씩 선택시 이벤트
			    body.on("click", "#type_t_grid li", function(){
			    	var x_coordinate = $catchmentAreaMenu.ui.selectCoordinate_x //x좌표
			    	var y_coordinate = $catchmentAreaMenu.ui.selectCoordinate_y //y좌표
			    	
			    	$("#type_t_grid li").removeClass("active");
			    	$(this).addClass("active")
		    		$("#stats_radio_t_grid").prop('checked',true);
			    	  
					// 도형색상과 일치
					$catchmentAreaMenu.ui.setRangeDisplay_grid('T');
					
					if($(this).attr("data-value") != '' || $(this).attr("data-value") != undefined || $(this).attr("data-value")!= null){
			    		var areaMins = [];
			    		areaMins.push($(this).attr("data-value"));
			    		$catchmentAreaMap.arcgis.event.calculateSearchArea(x_coordinate, y_coordinate, areaMins, 99,0);
			    	}
			    });
			   
			   //주행거리 기준 토글 하나씩 선택시 이벤트
			    body.on("click", "#type_d li", function(){
			    	   if($('#stats02').hasClass('noSel')){ return false; }
			    	   
			    	   $catchmentAreaMenu.ui.typeAllRemoveClass("d");
			    	   var radioId = $(this).parents('div').children('div').children('input').attr('id');
			    	   var selectLength = 0;
			    	   var radio_length = $("#type_d li.active").length;
			    	   var on = $(this).hasClass("active");
			    	   var selectId = $(this).attr("id");
			    	   var x_coor = $catchmentAreaMenu.ui.selectCoordinate_x //x좌표
			    	   var y_coor = $catchmentAreaMenu.ui.selectCoordinate_y //y좌표
			    	   
			    	   if($('input:radio[name="stats_radio"]:radio[id="'+radioId +'"]').is(':checked')){
			    	   }else{
				    	   $("input:radio[name='stats_radio']:radio[id='"+radioId+"']").prop("checked", true);

			    	   }
			    	 //선택 갯수 확인
			    	   $("#type_d").children("li").each(function(){
			    		   var lengthOn = $(this).hasClass("active");
			    		   if(lengthOn){
			    			   selectLength++;
			    		   }
			    	   });
			    	   
			    	   if(on){
			    		   $("#"+selectId).removeClass("active");
			    		   if(radio_length == 1){			    			   
			    			   $('#default-layer').show();
			    			   $('#modal_body  > p').html("동일 기준에서 1개 이상 선택해 주십시오.<br>(1~4개 선택 가능)");
				    		   $('.dim').show();
				    		   $(this).addClass("active bg0");
				    		   return false;
			    		   }
			    	   }else{
			    		   if(selectLength >= 4){
			    			   $('#default-layer').show();
			    			   $('#modal_body  > p').html("동일 기준에서<br>1개~4개까지 선택할 수 있습니다.");	
			    			  $('.dim').show();
			    			  return false;
				    	   }else{
				    		   $("#"+selectId).addClass("active")
				    	   }
			    	   }
			    	   
			    	   // 도형색상과 일치
			    	   $catchmentAreaMenu.ui.setRangeDisplay('D');		    	   
			    });
			    
			  //격자 주행거리 기준 토글 하나씩 선택시 이벤트
			    body.on("click", "#type_d_grid li", function(){
			    	var x_coordinate = $catchmentAreaMenu.ui.selectCoordinate_x //x좌표
			    	var y_coordinate = $catchmentAreaMenu.ui.selectCoordinate_y //y좌표
			    	
			    	$("#type_d_grid li").removeClass("active");
			    	$(this).addClass("active")
		    		$("#stats_radio_d_grid").prop('checked',true);
			        // 도형색상과 일치
			        $catchmentAreaMenu.ui.setRangeDisplay_grid('D');	
			        
			        if($(this).attr("data-value") != '' || $(this).attr("data-value") != undefined || $(this).attr("data-value")!= null){
			    		var areaMins = [];
			    		areaMins.push($(this).attr("data-value"));
			    		$catchmentAreaMap.arcgis.event.calculateSearchArea(x_coordinate, y_coordinate, areaMins, 99,1);
			    	}
			    });
			       //반경 기준 토글 하나씩 선택시 이벤트
			    body.on("click", "#type_r li", function(){
			    	   $catchmentAreaMenu.ui.typeAllRemoveClass("r");
			    	   var radioId = $(this).parents('div').children('div').children('input').attr('id');
			    	   var selectLength = 0;
			    	   var radio_length = $("#type_r li.active").length;
			    	   var on = $(this).hasClass("active");
			    	   var selectId = $(this).attr("id");
			    	   var x_coor = $catchmentAreaMenu.ui.selectCoordinate_x //x좌표
			    	   var y_coor = $catchmentAreaMenu.ui.selectCoordinate_y //y좌표
			    	   
			    	   if($('input:radio[name="stats_radio"]:radio[id="'+radioId +'"]').is(':checked')){
			    	   }else{
				    	   $("input:radio[name='stats_radio']:radio[id='"+radioId+"']").prop("checked", true);
			    	   }
			    	   
			    	   //선택 갯수 확인
			    	   $("#type_r").children("li").each(function(){
			    		   var lengthOn = $(this).hasClass("active");
			    		   if(lengthOn){
			    			   selectLength++;
			    		   }
			    	   });
			    	   
			    	   if(on){
			    		   $("#"+selectId).removeClass("active");
			    		   if(radio_length == 1){
			    			   $('#default-layer').show();
			    			   $('#modal_body  > p').html("동일 기준에서 1개 이상 선택해 주십시오.<br>(1~4개 선택 가능)");
				    		   $('.dim').show();
				    		   $(this).addClass("active bg0");
				    		   return false;
			    		   	}
			    	   }else{
			    		   if(selectLength >= 4){
			    			   $('#default-layer').show();
			    			   $('#modal_body  > p').html("동일 기준에서<br>1개~4개까지 선택할 수 있습니다.");			    			 
			    			   $('.dim').show();
			    			   return false;
				    	   }else{
				    		   $("#"+selectId).addClass("active")
				    	   }
			    	   }
			    	   
			    	   // 도형색상과 일치
			    	   $catchmentAreaMenu.ui.setRangeDisplay('R');		    	   
			    });   
			    
			    //격자 반경 기준 토글 하나씩 선택시 이벤트
			    body.on("click", "#type_r_grid li", function(){
			    	   $("#type_r_grid li").removeClass("active");
				       $(this).addClass("active")
			    	   $("#stats_radio_r_grid").prop('checked',true);
			    	   // 도형색상과 일치
			    	   $catchmentAreaMenu.ui.setRangeDisplay_grid('R');	
			    	   $catchmentAreaMenu.ui.geoMap_area_grid = (Number($(this).attr("data-value")) * Number($(this).attr("data-value")) * 3.14/1000000).toFixed(2);
			    	  			    	
			    });
			    
			    body.on("click", "#people_age_unit a", function(){
			    	if($(this).hasClass("on")){
			    		
			    	}else{
			    		$(this).siblings().removeClass("on");
			    		$(this).addClass("on");
			    	}
			    	
			    	if($(this).attr("data-value") == "0"){
			    		$("#detail_condition_nothing").show();
			    		$("#5_age_unit").hide();
			    		$("#10_age_unit").hide();
			    		$("#important_age_unit").hide();
			    		$("#5_age_unit button").removeClass("on");
			    		$("#10_age_unit button").removeClass("on");
			    		$("#important_age_unit button").removeClass("on");
			    	}else if($(this).attr("data-value") == "1"){
			    		$("#detail_condition_nothing").hide();
			    		$("#5_age_unit").show();
			    		$("#10_age_unit").hide();
			    		$("#important_age_unit").hide();
			    		$("#5_age_unit button:eq(0)").addClass("on");
			    		$("#10_age_unit button").removeClass("on");
			    		$("#important_age_unit button").removeClass("on");
			    	}else if($(this).attr("data-value") == "2"){
			    		$("#detail_condition_nothing").hide();
			    		$("#5_age_unit").hide();
			    		$("#10_age_unit").show();
			    		$("#important_age_unit").hide();
			    		$("#10_age_unit button:eq(0)").addClass("on");
			    		$("#5_age_unit button").removeClass("on");
			    		$("#important_age_unit button").removeClass("on");
			    	}else if($(this).attr("data-value") == "3"){
			    		$("#detail_condition_nothing").hide();
			    		$("#5_age_unit").hide();
			    		$("#10_age_unit").hide();
			    		$("#important_age_unit").show();
			    		$("#important_age_unit button:eq(0)").addClass("on");	
			    		$("#5_age_unit button").removeClass("on");
			    		$("#10_age_unit button").removeClass("on");
			    	}
			    });   
			    
			    body.on("click", "#house_detail_condition_menu a", function(){
			    	if($(this).hasClass("on")){
			    		
			    	}else{
			    		$(this).siblings().removeClass("on");
			    		$(this).addClass("on");
			    	}
			    	
			    	if($(this).attr("data-value") == "0"){
			    		$("#house_detail_menu_03").hide();
			    		$("#house_detail_menu_02").hide();
			    		$("#house_detail_menu_01").show();
			    		$("#house_detail_menu_02 button").removeClass("on");
			    		$("#house_detail_floor_area button").removeClass("on");
			    		if($('#house_detail_all_check').hasClass('active')){
			    			
			    		}else{
			    			if($('#house_detail_type button.on').length != 5){
			    				$('#house_detail_all_check').trigger('click');
			    			}
			    		}
			    		
			    	}else if($(this).attr("data-value") == "1"){
			    		$("#house_detail_menu_03").hide();
			    		$("#house_detail_menu_01").hide();
			    		$("#house_detail_menu_02").show();
			    		$("#house_detail_menu_02 button:eq(0)").addClass("on");
			    		$("#house_detail_floor_area button").removeClass("on");
			    	}else if($(this).attr("data-value") == "2"){
			    		$("#house_detail_menu_01").hide();
			    		$("#house_detail_menu_02").hide();
			    		$("#house_detail_menu_03").show();
			    		$("#house_detail_floor_area button:eq(0)").addClass("on");
			    		$("#house_detail_menu_02 button").removeClass("on");
			    	}
			    	
			    });   
			    
			    $('#search_text').bind('keydown',function (e){
			    	if(e.keyCode === 13 && e.srcElement.type != 'textarea'){
			    		$('#searchwordBtn').trigger('click');
			    		return false;
			    	}
			    	return true;
			    });
			    
			    body.on("click", "#search_text_previous", function(e){
			    	$('#search_text').attr('value',$('#search_text_previous').val());
			    	$("#catchmentArea_search_div").show();
			    });
			    
			    body.on("click", "#ksicSearchBtn_worker", function(e){
		        	var schWord = $("#ksicSearchWord_worker").val().replace(/ /g,'');
		        	var deny_pattern = /[^(가-힣a-zA-Z0-9)]/;
		        	if(deny_pattern.test(schWord)){
		        		$('#default-layer').show();
		    		    $('#modal_body  > p').html("영문,숫자,한글만 입력가능합니다.");
			    		$('.dim').show();
		        	}else{
		        		if(schWord !== undefined && schWord !== null && schWord.length > 1){
			        		$("#search_notice_mintwo_worker").hide();
			        		$("#search_notice_noword_worker").hide();	
			        		$catchmentAreaMenu.ui.curSearchWord = schWord;
			        		$catchmentAreaMenu.ui.callersInfo = "areaStat_employee";
			        		$catchmentAreaMenu.ui.curPageNo = 1;		
			        		$catchmentAreaMenu.ui.searchKSIClist();		        		
			        	}else if(schWord.length < 2){
			        		$("#search_notice_mintwo_worker").show();
			        		$("#search_notice_noword_worker").hide();	
			        		if(schWord.length === 0){
			        			$("#search_notice_noword_worker").show();		
			        			return;
			        		}
			        		return;
			        	}
		        	}
		        	
		        });
			    
			    $('#ksicSearchWord_worker').bind('keydown',function (e){
			    	if(e.keyCode === 13){
			    		$('#ksicSearchBtn_worker').trigger('click');
			    	}
			    });
			    body.on("click", "#ksicSearchBtn_copr", function(e){
		        	var schWord = $("#ksicSearchWord_copr").val().replace(/ /g,'');
		        	
		        	var deny_pattern = /[^(가-힣a-zA-Z0-9)]/;
		        	if(deny_pattern.test(schWord)){
		        		$('#default-layer').show();
		    		    $('#modal_body  > p').html("영문,숫자,한글만 입력가능합니다.");
			    		$('.dim').show();
		        	}else{
		        		if(schWord !== undefined && schWord !== null && schWord.length > 1){
			        		$("#search_notice_mintwo").hide();
			        		$("#search_notice_noword").hide();	
			        		$catchmentAreaMenu.ui.curSearchWord = schWord;
			        		$catchmentAreaMenu.ui.callersInfo = "areaStat_copr";
			        		$catchmentAreaMenu.ui.curPageNo = 1;		
			        		$catchmentAreaMenu.ui.searchKSIClist();		        		
			        	}else if(schWord.length < 2){
			        		$("#search_notice_mintwo").show();
			        		$("#search_notice_noword").hide();	
			        		if(schWord.length === 0){
			        			$("#search_notice_noword").show();		
			        			return;
			        		}
			        		return;
			        	}
		        	}
		        	
		        });
			    
			    $('#ksicSearchWord_copr').bind('keydown',function (e){
			    	if(e.keyCode === 13){
			    		$('#ksicSearchBtn_copr').trigger('click');
			    	}
			    });
			    
			    body.on("click", ".jinggle", function(e){
			    	var this_button = $(this).parent('div').parent('div').parent('td').parent('tr').children('td:eq(0)').children('div').children('input');		
			    	this_button.prop('checked',true);
			    	if($(this).hasClass('active')){
			    		$('.jinggle').removeClass('active');
			    		$('.detail').css("display","none");
			    	}else{
			    		$('.jinggle').removeClass('active');
			    		$(this).addClass('active');
			    		$('.detail').css("display","none");
			    		var schList;
			    		if($('#statistics_topic option:selected').val() == 'copr'|| $('#statistics_topic_grid option:selected').val() == 'copr'){
			    			schList = $catchmentAreaMenu.ui.curSearchList;
			    		}else if($('#statistics_topic option:selected').val() == 'worker' || $('#statistics_topic_grid option:selected').val() == 'worker'){
			    			schList = $catchmentAreaMenu.ui.curSearchList_worker;
			    		}
			    		
			    		
				    	var selIdx = $(this).parent('div').parent('div').parent('td').parent('tr').index();
				    	var add_list = $(this).parent('div').parent('div').parent('td').children('.detail');
				    	if(schList !== undefined && schList !== null){
				    		var ksicCd = schList[selIdx].class_code;
	    	        		var ksicNm = schList[selIdx].class_nm;
	    	        		var mainKsicCd = schList[selIdx].main_class_code;
	    	        		var superKsicCodeNm = schList[selIdx].super_class_nm;
	    	        		var rtnObj = {};
	    	        		rtnObj.ksicCode = ksicCd.trim();
	    	        		rtnObj.ksicCodeNm = ksicNm;
	    	        		rtnObj.mainKsicCd = mainKsicCd.trim();
	    	        		rtnObj.superKsicCodeNm = superKsicCodeNm;
	    	        		var rtnObj_gb = {};
	    	        		rtnObj_gb.workGb = $catchmentAreaMenu.ui.callersInfo;
	    	        		rtnObj.params = rtnObj_gb;
				    	}
				    	
				    	$catchmentAreaMenu.ui.didSelectKSICItem(rtnObj,add_list);
			    	}
		        });
				/*********** 중심시설유형 검색 Start **********/
				(function () {
					$class("sop.portal.facilityTypeSearchList.api").extend(sop.portal.absAPI).define({
						onSuccess : function (status, res, options) {
							var result =  res.result;
							var params = options.params;
							var htmlStr = "";
							if(result != undefined && result != ""){
								if(params.workPos == 'B'){
									// 필요하면 기능 추가 
								}else{
									var totCount = result.length;
									$('.map__slideup p').text('시설 유형 선택 결과');	
									$('.map__slideup h3').text($('.map__facility__list .option__btn.selected').text() + ' : ' + totCount +'건');
									
									$catchmentAreaMenu.ui.search_accuracy_list = [];
									$.each(result, function(index, item){
										var name = item.corp_nm;
										var roadAdres = item.naddr;
										var x_coor = item.x_coordinate;
										var y_coor = item.y_coordinate;
										var ksic_5_cd = item.ksic_5_cd;
										$catchmentAreaMenu.ui.search_accuracy_list.push([index,item.sufid,name,roadAdres,x_coor,y_coor,ksic_5_cd]);
										
										htmlStr += '                              <li id = "sufid_'+item.sufid +'"name = "'+ name +'" roadAdres = "'+ roadAdres +'" x_coor = "'+ x_coor +'" y_coor = "'+ y_coor +'" index = "'+ index +'" ksic_5_cd = "'+ksic_5_cd+'" >';
				            			htmlStr += '                                 <div>';
				            			htmlStr += '                                    <h4>'+name+'</h4>';
				            			htmlStr += '                                    <p>'+roadAdres+'</p>';
				            			htmlStr += '                                 </div>';
				            			htmlStr += '                                 <button type="button">';
				            			htmlStr += '                                    <img src="/mobile/resources/m2021/images/map/i_pin--off.png" alt="Map Point">';
				            			htmlStr += '                                 </button>';
				            			htmlStr += '                              </li>';
					            			if(item.x_coordinate !== undefined && item.y_coordinate !== undefined){
												var that = item;
												var map = $catchmentAreaMap.ui.map;
												var markerIcon = sop.icon({
													iconUrl: contextPath +"/resources/m2021/images/map/i_pin--on.png",
													iconAnchor: [12.5, 40 ],
													iconSize: [ 25, 40 ],
													infoWindowAnchor: [1, -34],
												});
												
												var marker = sop.marker([ item.x_coordinate, item.y_coordinate ], {icon : markerIcon});								
												map.markers2.addLayer(marker);
												
												marker.on({
													click : function (e) {
														$('#sufid_' + that.sufid).trigger('click');
													}									
												});								
											}
										});
									}
								}else{
									$('.map__slideup p').text('시설 유형 선택 결과');	
									$('.map__slideup h3').text($('.map__facility__list .option__btn.selected').text() + ' : 0 건');
									htmlStr += '                              <li>';
				        			htmlStr += '                                 <div>';
				        			htmlStr += '                                    <h4>현재  지도 위치의 시·군·구에서는 <br> 선택한 시설  유형에 대한 검색 결과가 없습니다.</h4>';
				        			htmlStr += '                                 </div>';
				        			htmlStr += '                              </li>';
				        			$('#menu_2 > p').hide();
								}
							
							$('.map__result__list').html(htmlStr);
							$("#menu_1").css("display", "none");
							$("#menu_1").removeClass("active");
							$("#menu_3").css("display", "none");
							$("#menu_3").removeClass("active");
							$("#menu_2").css("display", "block");
							$("#menu_2").addClass("active");

						},
						onFail : function (status) {
							
						}
					});
				}());
				/*********** 중심시설유형 검색 End **********/
				/*********** 시설유형에 따른 생활권역 범위 검색 Start **********/
				(function () {
					$class("sop.portal.getSrvareaScopeList.api").extend(sop.portal.absAPI).define({
						onSuccess : function (status, res, options) {
							var result =  res.result;
							var html_type_1 = "";
							var html_type_2 = "";
							var html_type_3 = "";
							
							var html_type_1_grid = "";
							var html_type_2_grid = "";
							var html_type_3_grid = "";
							
							var t_default = [];
							var d_default = [];
							var r_default = [];
							$.each(result, function(index, item){
								if(item.scope_type == '01'){
									t_default.push(item.cd_exp);
									html_type_1 += '<li href="javascript:void(0);" id='+item.scope_cd +' data-value='+item.cd_exp+'>'+item.s_class_cd_nm+'</li>';
									html_type_1_grid += '<li href="javascript:void(0);" id='+item.scope_cd + "_grid" +' data-value='+item.cd_exp+'>'+item.s_class_cd_nm+'</li>';
								}else if(item.scope_type == '02'){
									d_default.push(item.cd_exp);
									html_type_2 += 	'<li href="javascript:void(0);" id='+item.scope_cd+' data-value='+item.cd_exp+'>'+item.s_class_cd_nm+'</li>';
									html_type_2_grid += 	'<li href="javascript:void(0);" id='+item.scope_cd + "_grid" +' data-value='+item.cd_exp+'>'+item.s_class_cd_nm+'</li>';
								}else{
									r_default.push(item.cd_exp);
									html_type_3 += 	'<li href="javascript:void(0);" id='+item.scope_cd+' data-value='+item.cd_exp+'>'+item.s_class_cd_nm+'</li>';
									html_type_3_grid += 	'<li href="javascript:void(0);" id='+item.scope_cd + "_grid" + ' data-value='+item.cd_exp+'>'+item.s_class_cd_nm+'</li>';
								}
							});
							$("#type_t").html(html_type_1);
							$("#type_d").html(html_type_2);
							$("#type_r").html(html_type_3);
							
							$("#type_t_grid").html(html_type_1_grid);
							$("#type_d_grid").html(html_type_2_grid);
							$("#type_r_grid").html(html_type_3_grid);

							if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
								options.callback.call(undefined, t_default, d_default, r_default);
							}
						},
						onFail : function (status) {
							
						}
					});
				}());
				/*********** 시설유형에 따른 생활권역 범위 검색 End **********/
			}
	
	};
	
	
	
	$(document).on("click", ".map__result__list li", function() {
		srvLogWrite('O0', '12', '04', '02', $('.option__btn.selected').text()+" : "+$(this).attr("name"), '');
		var name = $(this).attr("name");
		var roadAdres = $(this).attr("roadadres");
		var x_coor = $(this).attr("x_coor");
		var y_coor = $(this).attr("y_coor");
		var jibunAdres = $(this).attr("jibunadres");
		var ksic_5_cd = $(this).attr("ksic_5_cd");
		
		if($(this).hasClass('on')){
            $(this).removeClass('on');
            $(this).children().find('img').attr('src','/mobile/resources/m2021/images/map/i_pin--off.png');
        }else{
            $(this).addClass('on');
            $(this).children().find('img').attr('src','/mobile/resources/m2021/images/map/i_pin--on.png');
            $('.map__result__list li').not(this).removeClass('on');
            $('.map__result__list li').not(this).children().find('img').attr('src','/mobile/resources/m2021/images/map/i_pin--off.png');
        }	
		$('#slide-area .btn-slideup span').hide();
		//2022-10-18 이벤트 추가
		$('.map__result__tit').removeClass('on');
		$(".map__below").animate({
			//2022-10-18 height 수정
            'height' : '50px'
          //  'height' : '90px'
        },400,function(){
            $(".map__slideup").prop("style","box-shadow: 0px 1px 4px 0px rgb(133 133 133 / 35%);");
            $(".map__form").css("display", "block");
            $(".map__result__con").css("display", "block");
            $(".life-industry").css("display", "block");
        });
		
		 $(".map__search").animate({
		 	//2022-10-18 height 수정
             'height' : '50px'
           //  'height' : '90px'
         },400,function(){
             $(".map__slideup").prop("style","box-shadow: none;");
             $(".map__form").css("display", "none");
             $(".map__result__con").css("display", "none");
             $(".life-industry").css("display", "none");
         });
		
		 $('.slide_up').css("display","block");
		$catchmentAreaMap.ui.moveTargetArea(name,roadAdres,x_coor,y_coor,null,0,"m1",null,null,jibunAdres);

	});
	
	$(document).on("click", "#back_btn", function() {
		if($("#menu_2").hasClass("active")){ // menu_1 <- menu_2
			$catchmentAreaMenu.ui.backBtn_common();
			$catchmentAreaMap.ui.map.markers.clearLayers();
			$catchmentAreaMap.ui.map.markers2.clearLayers();
			$catchmentAreaMenu.ui.search_accuracy_list_search = [];
			$catchmentAreaMenu.ui.search_accuracy_list = [];
			$("#menu_1").addClass("active");
    		$("#menu_1").css("display","block");
    		$("#setting_info_display").css("display","none");
    		$("#back_btn").hide();
    		$('#menu_2 > p').show();
    		$("#searchPoi_restart").hide();
    		$("#searchPoi").show();
    		$(".map__result__tit > p").text("지점 선택");
    		$(".map__result__tit > h3").text("통계를 조회할 지점을 선택해 주십시오.");
    		//2022-10-18 초기화 이벤트 추가
    		$("#map_area_name_text").text("통계를 조회할 지점을 선택해 주십시오.");
    		$('.option__btn').removeClass('selected');
    		$(".map__result__tit").addClass("on");
		}else if($("#menu_3").hasClass("active")){ // menu_1 <- menu_3
			$catchmentAreaMenu.ui.backBtn_common();
			$catchmentAreaMenu.ui.clearLayers();
			$catchmentAreaMap.ui.map.markers.clearLayers();
			$catchmentAreaMap.ui.map.markers2.clearLayers();
			$("#menu_1").addClass("active");
    		$("#menu_1").css("display","block");  	
    		$("#setting_info_display").css("display","none");
    		$("#back_btn").hide();
    		$("#searchPoi_restart").hide();
    		$("#searchPoi").show();
    		$(".map__result__tit > p").text("지점 선택");
    		$(".map__result__tit > h3").text("통계를 조회할 지점을 선택해 주십시오.");
    		//2022-10-18 초기화 이벤트 추가
    		$("#map_area_name_text").text("통계를 조회할 지점을 선택해 주십시오.");
    		$('.option__btn').removeClass('selected');
    		$(".map__result__tit").addClass("on");
		}else if($("#menu_4").hasClass("active")){ // menu_3 <- menu_4
			$catchmentAreaMenu.ui.backBtn_common();
			$("#menu_3").addClass("active");
			$(".map__result__tit > p").text("생활권역 설정");
    		$("#menu_3").css("display","block");
    		$("#setting_info_display").css("display","none");
    		//2022-10-18 이벤트 추가
    		$(".map__result__tit").addClass("on");
		}else if($("#menu_5").hasClass("active")){ // menu_3 <- menu_5
			$catchmentAreaMenu.ui.backBtn_common();
			$(".map__result__tit > p").text("생활권역 설정");
			$("#menu_3").addClass("active");
    		$("#menu_3").css("display","block");
    		$("#setting_info_display").css("display","none");
    		$('#grid_click').hide();
    		//2022-10-18 이벤트 추가
    		$(".map__result__tit").addClass("on");
		}
		
	});
	$(document).on("click", "#map_search_btn", function() {
		srvLogWrite('O0', '12', '04', '01', '주소 검색', '');
		$('#map_search_div').css("display","block");
		$('#map_facility_search_div').css("display","none");
		$('#doroname_text').show();
		$('#facility_notice02').show();
		if(!$("#map_search_btn").hasClass("on")){
			$("#map_search_btn").addClass("on");
		}
		$("#map_facility_search_btn").removeClass("on");
		
	});
	
    
	$(document).on("click", "#yesorno_submit", function() {
		$('#default_yesorno').hide();
		$catchmentAreaMenu.ui.grid_exception();
	});
	$(document).on("click", "#map_facility_search_btn", function() {
		srvLogWrite('O0', '12', '04', '01', '시설 유형 선택', '');
		$('#map_search_div').css("display","none");
		$('#map_facility_search_div').css("display","block");
		$('#searchwordBtn').text('선택');	
		$('#doroname_text').hide();
		$('#search_text').text('');
		$('#facility_notice02').hide();
		if(!$("#map_facility_search_btn").hasClass("on")){
			$("#map_facility_search_btn").addClass("on");
		}
		$("#map_search_btn").removeClass("on");
		
	});
		//최단거리순
	$(document).on("click", ".map__result__sort > button", function() { 
		$('.map__result__sort .on').removeClass('on');
		$(this).addClass("on");
		var id = $(this).attr("id");
		var parent = $(".map__result__list");
		var length = $(".map__result__list li").length;
		var shortest_index = [];
		
		var list = $catchmentAreaMenu.ui.search_accuracy_list; //시설유형
		var list_search = $catchmentAreaMenu.ui.search_accuracy_list_search;
		var list_diff = [];
		var list_distance = [];
		
		if(list_search.length == 0 && $('#map_search_btn').hasClass('on')){ 
			return;
		}else if(list.length == 0 && $('#map_facility_search_btn').hasClass('on')){
			return;
		}
		
		if($('#map_search_btn').hasClass('on')){ // 검색
			if($(this).attr("id") == 'search_accuracy'){ // 검색 정확도순
				var htmlStr  = '';
				$.each(list_search, function(index, item){
					var name = item[0];
        			var roadAdres = item[1];
        			var x_coor = item[2];
        			var y_coor = item[3];
        			var jibunAdres = item[4];
					
					htmlStr += '                              <li id = "sufid_'+index +'"name = "'+ name + '" jibunAdres = "'+ jibunAdres + '" roadAdres = "'+ roadAdres +'" x_coor = "'+ x_coor +'" y_coor = "'+ y_coor +'" index = "'+ index +'" >';
					htmlStr += '                                 <div>';
        			htmlStr += '                                    <h4>'+name+'</h4>';
        			htmlStr += '                                    <p>'+roadAdres+'</p>';
        			htmlStr += '                                 </div>';
        			htmlStr += '                                 <button type="button">';
        			htmlStr += '                                    <img src="/mobile/resources/m2021/images/map/i_pin--off.png" alt="Map Point">';
        			htmlStr += '                                 </button>';
        			htmlStr += '                              </li>';
	        		
				});
				//다시 리스트 그려주기
				$('.map__result__list').html(htmlStr);
			}else{ // 최단 거리순
				if(get_cookie("lc_info_agree_yn") == 'Y'){
					$catchmentAreaMap.ui.getCurrentLocation(function(p_center, p_flag, p_msg, p_msg2){
						if(p_flag == true){
							$catchmentAreaMap.ui.my_x = p_center[0];
							$catchmentAreaMap.ui.my_y = p_center[1];
							for(var i = 0; i < list_search.length; i++){
								var diff_x = (list_search[i][2] - $catchmentAreaMap.ui.my_x) * (list_search[i][2] - $catchmentAreaMap.ui.my_x);
								var diff_y = (list_search[i][3] - $catchmentAreaMap.ui.my_y) * (list_search[i][3] - $catchmentAreaMap.ui.my_y);
								var diff = Math.sqrt(diff_x + diff_y);
								list_diff.push([list_search[i][5],diff]);
							}
							
							list_diff.sort((a,b) => (a[1] - b[1]));
							
							$catchmentAreaMenu.ui.search_distance_list_search = [];
							for(var a = 0; a <list_diff.length; a++){
								for(var b = 0; b < list_diff.length; b++){
									if(list_diff[a][0] == list_search[b][5]){
										$catchmentAreaMenu.ui.search_distance_list_search.push(list_search[b]);
									}
								}
							}
							
							var htmlStr  = '';
							$.each($catchmentAreaMenu.ui.search_distance_list_search, function(index, item){
								var name = item[0];
		            			var roadAdres = item[1];
		            			var x_coor = item[2];
		            			var y_coor = item[3];
		            			var jibunAdres = item[4];
		            			
								htmlStr += '                     <li id = "sufid_' + index + '" name = "'+ name +'" jibunAdres = "'+ jibunAdres +'" roadAdres = "'+ roadAdres +'" x_coor = "'+ x_coor +'" y_coor = "'+ y_coor +'" >';
		            			htmlStr += '                                 <div>';
		            			htmlStr += '                                    <h4>'+name+'</h4>';
		            			htmlStr += '                                    <p>'+roadAdres+'</p>';
		            			htmlStr += '                                 </div>';
		            			htmlStr += '                                 <button type="button">';
		            			htmlStr += '                                    <img src="/mobile/resources/m2021/images/map/i_pin--off.png" alt="Map Point">';
		            			htmlStr += '                                 </button>';
		            			htmlStr += '                      </li>';
			            		
							});
							//다시 리스트 그려주기
							$('.map__result__list').html(htmlStr);
						}
					});
				}else{
					$(".location__agree").show();
				}
			}
		}else if($('#map_facility_search_btn').hasClass('on')){ // 시설 유형 선택
			if($(this).attr("id") == 'search_accuracy'){ // 검색 정확도순
				var htmlStr  = '';
				$.each(list, function(index, item){
					var name = item[2];
					var roadAdres = item[3];
					var x_coor = item[4];
					var y_coor = item[5];
					var ksic_5_cd = item[6];
					
					htmlStr += '                              <li id = "sufid_'+item[1] +'"name = "'+ name +'" roadAdres = "'+ roadAdres +'" x_coor = "'+ x_coor +'" y_coor = "'+ y_coor +'" index = "'+ index +'" ksic_5_cd = "'+ksic_5_cd+'" >';
	    			htmlStr += '                                 <div>';
	    			htmlStr += '                                    <h4>'+name+'</h4>';
	    			htmlStr += '                                    <p>'+roadAdres+'</p>';
	    			htmlStr += '                                 </div>';
	    			htmlStr += '                                 <button type="button">';
	    			htmlStr += '                                    <img src="/mobile/resources/m2021/images/map/i_pin--off.png" alt="Map Point">';
	    			htmlStr += '                                 </button>';
	    			htmlStr += '                              </li>';
	        		
				});
				//다시 리스트 그려주기
				$('.map__result__list').html(htmlStr);
			}else{ // 최단 거리순
				if(get_cookie("lc_info_agree_yn") == 'Y'){
					$catchmentAreaMap.ui.getCurrentLocation(function(p_center, p_flag, p_msg, p_msg2){
						if(p_flag == true){
							$catchmentAreaMap.ui.my_x = p_center[0];
							$catchmentAreaMap.ui.my_y = p_center[1];
							for(var i = 0; i < list.length; i++){
								var diff_x = (list[i][4] - $catchmentAreaMap.ui.my_x) * (list[i][4] - $catchmentAreaMap.ui.my_x);
								var diff_y = (list[i][5] - $catchmentAreaMap.ui.my_y) * (list[i][5] - $catchmentAreaMap.ui.my_y);
								var diff = Math.sqrt(diff_x + diff_y);
								list_diff.push([list[i][0],diff]);
							}
							
							list_diff.sort((a,b) => (a[1] - b[1]));
							
							$catchmentAreaMenu.ui.search_distance_list = [];
							for(var a = 0; a <list_diff.length; a++){
								for(var b = 0; b < list_diff.length; b++){
									if(list_diff[a][0] == list[b][0]){
										$catchmentAreaMenu.ui.search_distance_list.push(list[b]);
									}
								}
							}
							
							var htmlStr  = '';
							$.each($catchmentAreaMenu.ui.search_distance_list, function(index, item){
								var name = item[2];
								var roadAdres = item[3];
								var x_coor = item[4];
								var y_coor = item[5];
								var ksic_5_cd = item[6];
								
								htmlStr += '                              <li id = "sufid_'+item[1] +'"name = "'+ name +'" roadAdres = "'+ roadAdres +'" x_coor = "'+ x_coor +'" y_coor = "'+ y_coor +'" index = "'+ index +'" ksic_5_cd = "'+ksic_5_cd+'" >';
		            			htmlStr += '                                 <div>';
		            			htmlStr += '                                    <h4>'+name+'</h4>';
		            			htmlStr += '                                    <p>'+roadAdres+'</p>';
		            			htmlStr += '                                 </div>';
		            			htmlStr += '                                 <button type="button">';
		            			htmlStr += '                                    <img src="/mobile/resources/m2021/images/map/i_pin--off.png" alt="Map Point">';
		            			htmlStr += '                                 </button>';
		            			htmlStr += '                              </li>';
			            		
							});
							//다시 리스트 그려주기
							$('.map__result__list').html(htmlStr);
						}
					});
				}else{
					$(".location__agree").show();
				}
			}
		}
	});
	
	$(document).on("click", "#information_check", function(){		
		var x_coordinate =  $catchmentAreaMenu.ui.selectCoordinate_x; 
		var y_coordinate =  $catchmentAreaMenu.ui.selectCoordinate_y; 
		var scopeType;
		var pass = false;
		var type = '';
		var scope = '';
		$catchmentAreaMenu.ui.scope_info = [];
		if($('#default_type_select button.on').val() == 0){ // 영역 내 정보 조회
			if($("#fixed_selected").hasClass("on")){ // 고정값
				var selected = $("#type_t li.active").length + $("#type_d li.active").length + $("#type_r li.active").length; 
				if(selected == 0){
					$('.modal.default-layer').show();
					$('.dim').show();
				}else{
					scopeType = $("input:radio[name='stats_radio']:checked").attr("id");
					if(scopeType == 'stats_radio_t'){
						type = '주행시간';
						$catchmentAreaMenu.ui.settingSrvAreaTimeMap(x_coordinate, y_coordinate, false);
					}else if(scopeType == 'stats_radio_d'){
						type = '주행거리';
						$catchmentAreaMenu.ui.settingSrvAreaDistanceMap(x_coordinate, y_coordinate, false);
					}else if(scopeType == 'stats_radio_r'){
						type = '반경';
						$catchmentAreaMenu.ui.settingCircleMap(x_coordinate, y_coordinate, false);
					} 
					pass = true;
					$catchmentAreaMenu.ui.rndmFlag = false;
				}
				
			}else if($("#directly_selected").hasClass("on")){//직접 입력			
				if($("#area_setting_directly li:eq(0)").hasClass("on") && $("#area_setting_selected_1 .self-select__circle.active").length == 0){	
					//modal 사용시 html만 수정하면 사용가능함.
					 $('#default-layer').show();
	  			     $('#modal_body > p').html("조회할 주행시간 기준을<br> 1개 이상 입력해 주십시오.<br>(1개~4개까지 선택 가능)");
		    		 $('.dim').show();
		    		 return false;
				}else if($("#area_setting_directly li:eq(1)").hasClass("on") && $("#area_setting_selected_2 .self-select__circle.active").length == 0){
					$('#default-layer').show();
	 			     $('#modal_body > p').html("조회할 주행거리 기준을<br> 1개 이상 입력해 주십시오.<br>(1개~4개까지 선택 가능)");
		    		 $('.dim').show();
		    		 return false;
				}else if($("#area_setting_directly li:eq(2)").hasClass("on") && $("#area_setting_selected_3 .self-select__circle.active").length == 0){
					 $('#default-layer').show();
				     $('#modal_body > p').html("조회할 반경 기준을<br> 1개 이상 입력해 주십시오.<br>(1개~4개까지 선택 가능)");
		    		 $('.dim').show();
		    		 return false;
				}else{
					if($("#area_setting_directly .on a").attr("id") == "rndstats01"){
						type = '주행시간';
						$catchmentAreaMenu.ui.settingSrvAreaTimeMap(x_coordinate, y_coordinate, false);
					}else if($("#area_setting_directly .on a").attr("id") == "rndstats02"){
						type = '주행거리';
						$catchmentAreaMenu.ui.settingSrvAreaDistanceMap(x_coordinate, y_coordinate, false);
					}else if($("#area_setting_directly .on a").attr("id") == "rndstats03"){
						type = '반경';
						$catchmentAreaMenu.ui.settingCircleMap(x_coordinate, y_coordinate, false);
					}
					pass = true;
					$catchmentAreaMenu.ui.rndmFlag = true;
				}
				
			}
			$('#setting_total_btn button:eq(0)').trigger('click');
		}else if($('#default_type_select button.on').val() == 1){ // 격자 분포 조회
			
			if($("#grid_fixed_selected").hasClass("on")){ // 고정값
				var selected = $("#type_t_grid li.active").length + $("#type_d_grid li.active").length + $("#type_r_grid li.active").length;
				if($('#detail_condtion_txt_grid').text() == '' || $('#detail_condtion_txt_grid').text() == null || $('#detail_condtion_txt_grid').text() == undefined || $('#detail_condtion_txt').text() == "()"){
					if($('#statistics_topic_grid option:checked').val() == 'copr' || $('#statistics_topic_grid option:checked').val() == 'worker'){
						if($('input:radio[id=industry2_grid]').is(':checked')){
							$('#modal_body  > p').html("통계 주제에 대한 <br>세부조건을 선택해 주십시오.<br>'선택 '버튼을 클릭하면  <br>산업 분류를 검색·선택할 수 있습니다.");
							$('#default-layer').show();
							$('.dim').show();
							return;
						}
					}
				}else if($catchmentAreaMenu.ui.geoMap_area_grid > 50 && $('#500m_grid_rd').hasClass('active')){
					$('#default_yesorno > p').html("50km² 초과 면적을 500m 격자 크기로 조회할 경우 1분 이상 소요될 수 있습니다.");
				    $('#default_yesorno').show();
		    		$('.dim').show();
		    		return
				}else if($catchmentAreaMenu.ui.geoMap_area_grid > 30 && $('#100m_grid_rd').hasClass('active')){
					$catchmentAreaMenu.ui.grid_30km = true;
				    $('#default_yesorno > p').html("30km² 초과 면적은 100m 격자 크기로 조회가 불가능 합니다.<br> <b class = 'color-red'>격자 크기를 500m로 변경하여 조회하시겠습니까?  </b>"); 
				    $('#default_yesorno').show();
		    		$('.dim').show();
		    		return
				}else if($catchmentAreaMenu.ui.geoMap_area_grid > 10 && $('#100m_grid_rd').hasClass('active')){
					$('#default_yesorno > p').html("10km² 초과 면적을 100m 격자 크기로 조회할 경우 1분 이상 소요될 수 있습니다.");
				    $('#default_yesorno').show();
		    		$('.dim').show();
		    		return
				}
				
				scopeType = $("input:radio[name='stats_radio_grid']:checked").attr("id");
				if(scopeType == 'stats_radio_t_grid'){
					type = '주행시간';
					$catchmentAreaMenu.ui.settingSrvAreaTimeMap(x_coordinate, y_coordinate, false);
				}else if(scopeType == 'stats_radio_d_grid'){
					type = '주행거리';
					$catchmentAreaMenu.ui.settingSrvAreaDistanceMap(x_coordinate, y_coordinate, false);
				}else if(scopeType == 'stats_radio_r_grid'){
					type = '반경';
					$catchmentAreaMenu.ui.settingCircleMap(x_coordinate, y_coordinate, false);
				} 
				pass = true;
				$catchmentAreaMenu.ui.rndmFlag = false;
			
				
			}else if($("#grid_directly_selected").hasClass("on")){//직접 입력	
				if($('#detail_condtion_txt_grid').text() == '' || $('#detail_condtion_txt_grid').text() == null || $('#detail_condtion_txt_grid').text() == undefined || $('#detail_condtion_txt').text() == "()"){
					if($('#statistics_topic_grid option:checked').val() == 'copr' || $('#statistics_topic_grid option:checked').val() == 'worker'){
						if($('input:radio[id=industry2_grid]').is(':checked')){
							$('#modal_body  > p').html("통계 주제에 대한 <br>세부조건을 선택해 주십시오.<br>'선택 '버튼을 클릭하면  <br>산업 분류를 검색·선택할 수 있습니다.");
							$('#default-layer').show();
							$('.dim').show();
							return;
						}
					}
				}else if($("#grid_setting_directly li:eq(0)").hasClass("on") && $("#grid_setting_selected_1 .self-select__circle.bg-red.active").length == 0){	
	  			     $('#modal_body > p').html("조회할 주행시간 기준을<br> 입력해 주십시오.<br>");
	  		     	 $('#default-layer').show();
		    		 $('.dim').show(); 
		    		 return;
				}else if($("#grid_setting_directly li:eq(1)").hasClass("on") && $("#grid_setting_selected_2 .self-select__circle.bg-red.active").length == 0){
	 			     $('#modal_body > p').html("조회할 주행거리 기준을<br> 입력해 주십시오.");
	 			     $('#default-layer').show();
		    		 $('.dim').show();
		    		 return;
				}else if($("#grid_setting_directly li:eq(2)").hasClass("on") && $("#grid_setting_selected_3 .self-select__circle.bg-red.active").length == 0){
				     $('#modal_body > p').html("조회할 반경 기준을<br> 입력해 주십시오.");
				     $('#default-layer').show();
		    		 $('.dim').show();
		    		 return;
				}else if($('#statistics_topic_grid option:selected').val() == 'copr' && $('#detail_condtion_txt_grid').text() == ""){
					 $('#modal_body > p').html("통계 주제에 대한 세부조건을 선택해 주십시오. <br>'선택 '버튼을 클릭하면  산업 분류를 검색·선택할 수 있습니다.");
				     $('#default-layer').show();
		    		 $('.dim').show();
		    		 return;
				}else if($('#statistics_topic_grid option:selected').val() == 'worker' && $('#detail_condtion_txt_grid').text() == ""){
					 $('#modal_body > p').html("통계 주제에 대한 세부조건을 선택해 주십시오. <br>'선택 '버튼을 클릭하면  산업 분류를 검색·선택할 수 있습니다.");
				     $('#default-layer').show();
		    		 $('.dim').show();
		    		 return;
				}else{
					
					var x_coordinate = $catchmentAreaMenu.ui.selectCoordinate_x //x좌표
			    	var y_coordinate = $catchmentAreaMenu.ui.selectCoordinate_y //y좌표
			    	
			    	var areaMins = [];
			    	if($("#grid_setting_directly li:eq(0)").hasClass("on")){
			    		areaMins.push($('#grid_setting_selected_1 .self-select__circle.bg-red.active').attr("data-value"));
			        	$catchmentAreaMap.arcgis.event.calculateSearchArea(x_coordinate, y_coordinate, areaMins, 99,0);
			    	}else if($("#grid_setting_directly li:eq(1)").hasClass("on")){
			    		areaMins.push($('#grid_setting_selected_2 .self-select__circle.bg-red.active').attr("data-value"));
			    		$catchmentAreaMap.arcgis.event.calculateSearchArea(x_coordinate, y_coordinate, areaMins, 99,1);
			    	}else if($("#grid_setting_directly li:eq(2)").hasClass("on")){
			    		$catchmentAreaMenu.ui.geoMap_area_grid = (Number($('#grid_setting_selected_3 .self-select__circle.bg-red.active').attr("data-value")) * Number($('#grid_setting_selected_3 .self-select__circle.bg-red.active').attr("data-value")) * 3.14/1000000).toFixed(2);
			    	}
			    		
					
					if($catchmentAreaMenu.ui.geoMap_area_grid > 30 && $('#100m_grid_rd').hasClass('active')){
						$catchmentAreaMenu.ui.grid_30km = true;
					    $('#default_yesorno > p').html("30km² 초과 면적은 100m 격자 크기로 조회가 불가능 합니다.<br> <b class = 'color-red'>격자 크기를 500m로 변경하여 조회하시겠습니까?  </b>"); 
					    $('#default_yesorno').show();
			    		$('.dim').show();
			    		return
					}else if($catchmentAreaMenu.ui.geoMap_area_grid > 10 && $('#100m_grid_rd').hasClass('active')){
						$('#default_yesorno > p').html("10km² 초과 면적을 100m 격자 크기로 조회할 경우 1분 이상 소요될 수 있습니다.");
					    $('#default_yesorno').show();
			    		$('.dim').show();
			    		return
					}else if($catchmentAreaMenu.ui.geoMap_area_grid > 50 && $('#500m_grid_rd').hasClass('active')){
						$('#default_yesorno > p').html("50km² 초과 면적을 500m 격자 크기로 조회할 경우 1분 이상 소요될 수 있습니다.");
					    $('#default_yesorno').show();
			    		$('.dim').show();
			    		return
					}
					
					if($("#grid_setting_directly .on a").attr("id") == "rndstats01_grid"){
						type = '주행시간';
						$catchmentAreaMenu.ui.t_rndm_grid = [];
						$catchmentAreaMenu.ui.t_rndm_grid.push($('#grid_setting_selected_1 .self-select__circle.bg-red.active').attr("data-value"));
						$catchmentAreaMenu.ui.settingSrvAreaTimeMap(x_coordinate, y_coordinate, false);
					}else if($("#grid_setting_directly .on a").attr("id") == "rndstats02_grid"){
						type = '주행거리';
						$catchmentAreaMenu.ui.d_rndm_grid = [];
						$catchmentAreaMenu.ui.d_rndm_grid.push($('#grid_setting_selected_2 .self-select__circle.bg-red.active').attr("data-value"));
						$catchmentAreaMenu.ui.settingSrvAreaDistanceMap(x_coordinate, y_coordinate, false);
					}else if($("#grid_setting_directly .on a").attr("id") == "rndstats03_grid"){
						type = '반경';
						$catchmentAreaMenu.ui.r_rndm_grid = [];
						$catchmentAreaMenu.ui.r_rndm_grid.push($('#grid_setting_selected_3 .self-select__circle.bg-red.active').attr("data-value"));
						$catchmentAreaMenu.ui.settingCircleMap(x_coordinate, y_coordinate, false);
					}
					pass = true;
					$catchmentAreaMenu.ui.rndmFlag = true;
				}
				
			}
		}
		
		
	   var scope_info_str = '';	 
	   for(var a = 0; a < $catchmentAreaMenu.ui.scope_info.length; a++){
		   scope_info_str += $catchmentAreaMenu.ui.scope_info[a];
	   }
	   scope = scope_info_str.slice(0,-1);
	   
	   if(type == '주행거리' || type == '반경'){
		   scope += 'km';
	   }else{
		   scope += '분';
	   }
	   if(pass){
		   $('#slide-area .btn-slideup span').hide();
		   $(".map__result__tit > p").text("영역 내 통계정보");
		   //2022-10-18 이벤트 추가
		   $('.map__result__tit').removeClass('on');
		   $(".map__below").animate({
		   	//2022-10-18 height 수정
	            'height' : '50px'
	       	//	'height' : '90px'
	        },400,function(){
	            $(".map__slideup").prop("style","box-shadow: 0px 1px 4px 0px rgb(133 133 133 / 35%);");
	            $(".map__form").css("display", "block");
	            $(".map__result__con").css("display", "block");
	            $(".life-industry").css("display", "block");
	        });
	   	 
	       $(".map__search").animate({
	       	//2022-10-18 height 수정
	           'height' : '50px'
	       	//	'height' : '90px'    
	       },400,function(){
	           $(".map__slideup").prop("style","box-shadow: none;");
	           $(".map__form").css("display", "none");
	           $(".map__result__con").css("display", "none");
	           $(".life-industry").css("display", "none");
	       });
	       
	       $('.slide_up').css("display","block");
	       $('#menu_3').removeClass('active');
	       $('#menu_3').hide();
	       
	       $('#searchPoi').hide();
	       $('#searchPoi_restart').show();
	       $('#setting_info_display p:eq(0)').text(type);
	       $('#setting_info_display p:eq(1)').text(scope);
	       $('#setting_info_display').show();
	       if($('#default_type_select button.on').val() == 0){
	    	   $('#menu_4').addClass('active');
		       $('#menu_4').show();
		       $catchmentAreaMenu.ui.settingStatisticsDataList();
	     	   $('#menu_4_button button').eq(0).trigger('click');
	     	   srvLogWrite('O0', '12', '04', '05', type+" / "+scope, '');
	       }else if($('#default_type_select button.on').val() == 1){
	    	   $('#menu_5').addClass('active');
		       $('#menu_5').show();
		       srvLogWrite('O0', '12', '04', '05', type+" / "+scope+" / "+$("#grid_size_select li").children("input.active").text(), '');
	       }
	       

	   }
   	   
		
	});
	
	$(document).on("click", "#area_standard_btn button", function() {
		$('.default-select__type').find('.on').removeClass('on');
		$(this).addClass('on');
	
		if($(this).attr('id') == 'fixed_selected'){
			$('#input_standard').hide();
			$('#selected_standard').show();
		}else if($(this).attr('id') == 'directly_selected'){
			$('#selected_standard').hide();
			$('#input_standard').show();
		}
	});
	$(document).on("click", ".roundTextBox.on", function() {
		if(!$(this).siblings('.select-ui__con').find("ul > li > a").hasClass('on')){
			$(this).siblings('.select-ui__con').find("ul > li:eq(0) > a").trigger('click');
		}
	});
	
	$(document).on("click", "#grid_standard_btn button", function() {
		$('#grid_standard_btn').find('.on').removeClass('on');
		$(this).addClass('on');
		
		if($(this).attr('id') == 'grid_fixed_selected'){
			$('#grid_input_standard').hide();
			$('#grid_selected_standard').show();
		}else if($(this).attr('id') == 'grid_directly_selected'){
			$('#grid_selected_standard').hide();
			$('#grid_input_standard').show();
		}
	});
	$(document).on("click", "#menu_4_button > button", function() {
		$(this).addClass('on');
		$(this).siblings().removeClass('on');
		
		var html = "";
		html += $('#standard_text').text();
		html += " ";
		html += $(this).text();
		$('#life-industry_area').html(html);
		
		var html_notice = "";
		var grid = "";
		var index = $('#menu_4_button button').length - 1 - $(this).attr('data-index');
		
		if($catchmentAreaMenu.ui.geoMap_area.length != 0){
			var area = $catchmentAreaMenu.ui.geoMap_area[index]/1000000;
			if(area < 30){
				grid = "100m 격자 기반";
			}else if(area >= 30){
				grid = "500m 격자 기반";
			}
		}
		html_notice += $('#standard_text').text() + $('#menu_4_button button.on').attr("data-name") + " 통계정보 기준 : " + grid;
		$('.grid_unit_info').html(html_notice);
		//$('.area-notice__info.update_info > li:eq(0)').html(html_notice);
	    $catchmentAreaMenu.ui.requestSrvAreaStatsData('0', 1);

		$('#statistics_check_btn').trigger('click');
	});
	
	$(document).on("click", "#area_standard_btn button", function() {
			
		$("#area_standard_btn button").removeClass("on");
		$(this).addClass("on");
		
		if($("#area_standard_btn button.on").val() == 0){
			$("#subject_statistics").hide();
			$("#normal_statistics").show();
			
		}else if($("#area_standard_btn button.on").val() == 1){
			$("#normal_statistics").hide();
			$("#subject_statistics").show();
			$(".life-industry__btn button").trigger("click");
			
		}
	});

	$(document).on("click", "#setting_total_btn button", function() {
		
		$("#setting_total_btn button").removeClass("on");
		$(this).addClass("on");
		
		if($("#setting_total_btn button.on").val() == 0){
			$("#subject_statistics").hide();
			$("#normal_statistics").show();
			
		}else if($("#setting_total_btn button.on").val() == 1){
			$("#normal_statistics").hide();
			$("#subject_statistics").show();
		}
	});
	
	$(document).on("click", "#house_detail_condition_select .life-industry__tab__con.one_select div button", function() {
		if($(this).hasClass("on")){
			$(this).removeClass("on");
		}else{
			$("#house_detail_condition_select div div button").removeClass("on");
			$(this).addClass("on");
		}
	});
	
	$(document).on("click", "#grid_size_select li input", function() {
		$("#grid_size_select li input").removeClass("active");
		$(this).addClass("active");
		
		if($(this).attr("id") == '1km_grid_rd'){
			$('#1km_under_detail').css('display',"none");
			$('#1km_detail').show();
			if(($('#statistics_topic_grid option:selected').attr('value') == 'copr') || ($('#statistics_topic_grid option:selected').attr('value') == 'worker')){
				$("#if_worker_copr_show_grid").show();
				$catchmentAreaMenu.ui.setBaseYearBox('6', 'B');
			}
		}else{
			$("#industry3_grid").prop("checked",true);
			$('#1km_detail').css('display',"none");
			$('#1km_under_detail').css('display',"block");
			//SGIS4_220215_생활권역 수정 시작
			$("#if_worker_copr_show_grid").hide();
			if($("#statistics_topic_grid option:selected").val() == "people"){
				$('#people1').trigger("click");
				$("#people_age_unit a:eq(0)").trigger("click");
				$("#detail_condtion_txt_grid").text("연령(전체)");
			}else if($("#statistics_topic_grid option:selected").val() == "family"){
				if($("input:checkbox[name=furniture_all]").is(":checked") == false) {   
					$("#furniture_all").trigger("click");
				}
				$("#detail_condtion_txt_grid").text("가구(전체) ");
			}else if($("#statistics_topic_grid option:selected").val() == "house"){
				$("#house_detail_condition_menu a:eq(0)").trigger("click");
				$("#house_detail_all_check").trigger("click");
				$("#detail_condtion_txt_grid").text("주택유형(전체)");
			}else if($("#statistics_topic_grid option:selected").val() == "copr"){
				$("#industry3_grid").prop("checked",true);
				$("#detail_condtion_txt_grid").text("사업체(전체)");
			}else if($("#statistics_topic_grid option:selected").val() == "worker"){
				$("#industry3_grid").prop("checked",true);
				$("#detail_condtion_txt_grid").text("종사자(전체)");
			}
			//SGIS4_220215_생활권역 수정 끝
			if(($('#statistics_topic_grid option:selected').attr('value') == 'copr') || ($('#statistics_topic_grid option:selected').attr('value') == 'worker')){
				$catchmentAreaMenu.ui.setBaseYearBox('6', 'B');
			}else{
				$catchmentAreaMenu.ui.setBaseYearBox('6', 'A');
			}
		}
	});

	$(document).on("click", "#house_detail_type button", function() {
		if($(this).hasClass("on")){
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
		}
		
		if($("#house_detail_type button.on").length < 5){
			if($("#house_detail_all_check").hasClass("active")){
				$("#house_detail_all_check").trigger("click");
				$("#house_detail_all_check").removeClass("active");
			}
		}else{
			$("#house_detail_all_check").trigger("click");
			$("#house_detail_all_check").addClass("active");
		}
		
	});
	
	$(document).on("click", "#house_detail_all_check", function() {
		
		$("#house_detail_type button").removeClass("on");
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
			$("#house_detail_type button").addClass("on");
		}
				
		
	});
	
	$(document).on("change","#statistics_topic", function() {
		if($(this).val() == "copr" || $(this).val() == "worker"){
			$("#if_worker_copr_show").show();
			$catchmentAreaMenu.ui.setBaseYearBox('3', 'B');
		}else{
			$("#if_worker_copr_show").hide();
			$catchmentAreaMenu.ui.setBaseYearBox('3', 'A');
		}
		
		if($("#statistics_topic option:selected").val() == "people"){
			$("#people_age_unit a:eq(0)").trigger("click");
			$("#detail_condtion_txt").text("연령(전체)");
		}else if($("#statistics_topic option:selected").val() == "family"){
			if($("input:checkbox[name=furniture_all]").is(":checked") == false) {   
				$("#furniture_all").trigger("click");
			}
			$("#detail_condtion_txt").text("가구(전체) ");
		}else if($("#statistics_topic option:selected").val() == "house"){
			$("#house_detail_condition_menu a:eq(0)").trigger("click");
			if($('#house_detail_type button.on').length != 5){
				$("#house_detail_all_check").trigger("click");
			}
			$("#detail_condtion_txt").text("주택유형(전체)");
		}else if($("#statistics_topic option:selected").val() == "copr"){
			$('#industry1').trigger("click");
			
			if(!$('#copr_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.copr_selected_menu01 +']').hasClass('on')){
				$('#copr_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.copr_selected_menu01 +']').trigger('click');
			}
			if(!$('#copr_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.copr_selected01 +']').hasClass('on')){
				$('#copr_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.copr_selected01 +']').trigger('click');
			}
			$("#copr_detail_submit01").trigger("click");
		}else if($("#statistics_topic option:selected").val() == "worker"){
			$('#industry1').trigger("click");
			
			if(!$('#worker_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.worker_selected_menu01 +']').hasClass('on')){
				$('#worker_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.worker_selected_menu01 +']').trigger('click');
			}
			if(!$('#worker_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.worker_selected01 +']').hasClass('on')){
				$('#worker_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.worker_selected01 +']').trigger('click');
			}
			$("#worker_detail_submit01").trigger("click");
		}
	}); 
	
	$(document).on("change","#bYearSel03,#bYearSel06", function() {
		var param = {};
    	param.processGb = "sel";
    	param.elemId = "#house_detail_menu_02 div";
    	param.bClassCd = "SA" + this.value;
    	
    	$catchmentAreaMap.ui.getCodeData(param);	
	}); 
	
	$(document).on("change","#statistics_topic_grid", function() {
		if($(this).val() == "copr"|| $(this).val() == "worker"){
			$catchmentAreaMenu.ui.setBaseYearBox('6', 'B');
		}else{
			$catchmentAreaMenu.ui.setBaseYearBox('6', 'A');
		}
		
		if($("#1km_grid_rd").hasClass('active') && ($(this).val() == "copr"|| $(this).val() == "worker")){
			$("#if_worker_copr_show_grid").show();
		}else{
			$("#if_worker_copr_show_grid").hide();
		}
		if($("#statistics_topic_grid option:selected").val() == "people"){
			$("#people_age_unit a:eq(0)").trigger("click");
			$("#detail_condtion_txt_grid").text("연령(전체)");
		}else if($("#statistics_topic_grid option:selected").val() == "family"){
			if($("input:checkbox[name=furniture_all]").is(":checked") == false) {   
				$("#furniture_all").trigger("click");
			}
			$("#detail_condtion_txt_grid").text("가구(전체) ");
		}else if($("#statistics_topic_grid option:selected").val() == "house"){
			$("#house_detail_condition_menu a:eq(0)").trigger("click");
			$("#house_detail_all_check").trigger("click");
			$("#detail_condtion_txt_grid").text("주택유형(전체)");
		}else if($("#statistics_topic_grid option:selected").val() == "copr"){
			$("#industry3_grid").prop("checked",true);
			$("#detail_condtion_txt_grid").text("사업체(전체)");
		}else if($("#statistics_topic_grid option:selected").val() == "worker"){
			$("#industry3_grid").prop("checked",true);
			$("#detail_condtion_txt_grid").text("종사자(전체)");
		}
		
	}); 
	
	$(document).on("click", "#industry1", function() {
		if($("#statistics_topic option:selected").val() == 'copr'){
			if(!$('#copr_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.copr_selected_menu01 +']').hasClass('on')){
				$('#copr_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.copr_selected_menu01 +']').trigger('click');
			}
			if(!$('#copr_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.copr_selected01 +']').hasClass('on')){
				$('#copr_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.copr_selected01 +']').trigger('click');
			}
			$("#copr_detail_submit01").trigger("click");
		}else if($("#statistics_topic option:selected").val() == 'worker'){
			if(!$('#worker_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.worker_selected_menu01 +']').hasClass('on')){
				$('#worker_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.worker_selected_menu01 +']').trigger('click');
			}
			if(!$('#worker_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.worker_selected01 +']').hasClass('on')){
				$('#worker_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.worker_selected01 +']').trigger('click');
			}
			$("#worker_detail_submit01").trigger("click");
		}
	});
	
	$(document).on("click", "#industry1_grid", function() {
		if($("#statistics_topic_grid option:selected").val() == 'copr'){
			if(!$('#copr_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.copr_selected_menu02 +']').hasClass('on')){
				$('#copr_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.copr_selected_menu02 +']').trigger('click');
			}
			if(!$('#copr_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.copr_selected02 +']').hasClass('on')){
				$('#copr_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.copr_selected02 +']').trigger('click');
			}
			$("#copr_detail_submit01").trigger("click");
		}else if($("#statistics_topic_grid option:selected").val() == 'worker'){
			if(!$('#worker_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.worker_selected_menu02 +']').hasClass('on')){
				$('#worker_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.worker_selected_menu02 +']').trigger('click');
			}
			if(!$('#worker_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.worker_selected02 +']').hasClass('on')){
				$('#worker_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.worker_selected02 +']').trigger('click');
			}
			$("#worker_detail_submit01").trigger("click");
		}
	});
	$(document).on("click", "#industry2", function() {
		
		if($("#statistics_topic option:selected").val() == 'copr'){
			if($("#copr_detail_condition_korea .jinggle.active").length > 0){
				$("#copr_detail_submit02").trigger('click');
			}else{
				$("#detail_condtion_txt").text('');
			}
		}else if($("#statistics_topic option:selected").val() == 'worker'){
			if($("#worker_detail_condition_korea .jinggle.active").length > 0){
				$("#worker_detail_submit02").trigger('click');
			}else{
				$("#detail_condtion_txt").text('');
			}

		}
	});
	
	$(document).on("click", "#industry2_grid", function() {
		
		if($("#statistics_topic_grid option:selected").val() == 'copr'){
			if($("#copr_detail_condition_korea .jinggle.active").length > 0){
				$("#copr_detail_submit02").trigger('click');
			}else{
				$("#detail_condtion_txt_grid").text('');
			}
		}else if($("#statistics_topic_grid option:selected").val() == 'worker'){
			if($("#worker_detail_condition_korea .jinggle.active").length > 0){
				$("#worker_detail_submit02").trigger('click');
			}else{
				$("#detail_condtion_txt_grid").text('');
			}

		}
	});
	
	$(document).on("click", "#industry3_grid", function() {
		if($("#statistics_topic_grid option:selected").val() == 'copr'){
			$("#detail_condtion_txt_grid").text('사업체(전체)');
		}else if($("#statistics_topic_grid option:selected").val() == 'worker'){
			$("#detail_condtion_txt_grid").text('종사자(전체)');
		}
	});
	
	$(document).on("click", ".detail_condition_change", function() {
		var selected;

		if($("#default_type_select button.on").val() == 0){
			selected = $("#statistics_topic option:selected").val();
		}else if ($("#default_type_select button.on").val() == 1){
			selected = $("#statistics_topic_grid option:selected").val();
		}
		$('#people_detail_condition').addClass("on");
		if(selected == 'people'){
			if($('#menu_3').hasClass('active')){
				$('#detail_change_pop_gender_view').show();
			}else{
				$("input:radio[name='people']:radio[id='people1']").prop('checked', true); 
				$('#detail_change_pop_gender_view').hide();
			}
			$("#people_detail_condition").show();	
			$catchmentAreaMenu.ui.people_selected_menu = $('#people_age_unit a.on').attr('data-value'); 
			$catchmentAreaMenu.ui.people_selected = $('.pop_unit_div .on').attr('data-value');
		}else if(selected == 'family'){
			$("#family_detail_condition").show();
			$catchmentAreaMenu.ui.family_selected = [];
			for(var a = 0; a < $('.furniture_selected_save.on').length; a++){
				$catchmentAreaMenu.ui.family_selected.push($('.furniture_selected_save.on:eq('+a+')').attr('data-value'));
			}
		}else if(selected == 'house'){
			$("#house_detail_condition").show();
			$catchmentAreaMenu.ui.house_selected_menu = $('#house_detail_condition_menu a.on').attr("data-value");
			$catchmentAreaMenu.ui.house_selected = [];
			for(var a = 0; a < $('.house_select button.on').length; a++){
				$catchmentAreaMenu.ui.house_selected.push($('.house_select button.on:eq('+a+')').attr('data-value'));
			}
		}else if(selected == 'copr'){
			if($('#default_type_select button.on').val() == 0){
				if($('input:radio[id=industry1]').is(':checked')){
					$("#copr_detail_condition").show();
					$('#copr_detail_condition div #header_text').text('조회할 사업체 업종을 선택해 주십시오.');
					
					if(!$('#copr_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.copr_selected_menu01 +']').hasClass('on')){
						$('#copr_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.copr_selected_menu01 +']').trigger('click');
					} 
					if(!$('#copr_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.copr_selected01 +']').hasClass('on')){
						$('#copr_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.copr_selected01 +']').trigger('click');
					}
				}else if($('input:radio[id=industry2]').is(':checked')){
					$("#copr_detail_condition_korea").show(); 
				}
			}else if($('#default_type_select button.on').val() == 1){
				if($('input:radio[id=industry1_grid]').is(':checked')){
					$("#copr_detail_condition").show();
					if(!$('#copr_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.copr_selected_menu02 +']').hasClass('on')){
						$('#copr_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.copr_selected_menu02 +']').trigger('click');
					}
					if(!$('#copr_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.copr_selected02 +']').hasClass('on')){
						$('#copr_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.copr_selected02 +']').trigger('click');
					}
				}else if($('input:radio[id=industry2_grid]').is(':checked')){
					$("#copr_detail_condition_korea").show();
				}
			}
			
		}else if(selected == 'worker'){
			if($('#default_type_select button.on').val() == 0){
				if($('input:radio[id=industry1]').is(':checked')){
					$("#worker_detail_condition").show();
					$('#worker_detail_condition div #header_text').text('조회할 종사자 업종을 선택해 주십시오.');
					
					if(!$('#worker_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.worker_selected_menu01 +']').hasClass('on')){
						$('#worker_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.worker_selected_menu01 +']').trigger('click');
					}
					if(!$('#worker_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.worker_selected01 +']').hasClass('on')){
						$('#worker_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.worker_selected01 +']').trigger('click');
					}
				}else if($('input:radio[id=industry2]').is(':checked')){
					$("#worker_detail_condition_korea").show();
				}
			}else if($('#default_type_select button.on').val() == 1){
				if($('input:radio[id=industry1_grid]').is(':checked')){
					$("#worker_detail_condition").show();
					
					if(!$('#worker_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.worker_selected_menu02 +']').hasClass('on')){
						$('#worker_detail_condition .select-ui button[data-big-theme-cd = '+ $catchmentAreaMenu.ui.worker_selected_menu02 +']').trigger('click');
					}
					if(!$('#worker_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.worker_selected02 +']').hasClass('on')){
						$('#worker_detail_condition .life-industry__change__list li a[data-ksic-sel-cd = '+ $catchmentAreaMenu.ui.worker_selected02 +']').trigger('click');
					}
				}else if($('input:radio[id=industry2_grid]').is(':checked')){
					$("#worker_detail_condition_korea").show();
				}
			}
			
		}
	});
	
	$(document).on("click", "#statistics_check_btn", function() {
		if($("#setting_total_btn button.on").val() == 0){
			$(".pfh_year").text($("#bYearSel01 option:selected").val());
			$(".cbcw_year").text($("#bYearSel02 option:selected").val());
	    	$catchmentAreaMenu.ui.requestSrvAreaStatsData('1', $catchmentAreaMenu.ui.selectIndex);
	    	$catchmentAreaMenu.ui.requestSrvAreaStatsData('2', $catchmentAreaMenu.ui.selectIndex);
	    	$("#detail_total").hide();
	    	$("#basic_total").show();
			
		}else if($("#setting_total_btn button.on").val() == 1){
			var pass = true;
			if($("#statistics_topic option:selected").val() == "people"){
				$(".pfh_year_detail").text($("#bYearSel03 option:selected").val());
				$catchmentAreaMenu.ui.area_search();
				$catchmentAreaMenu.ui.showChkDetailDiv("pops");
				$("#bYearSel01").val($("#bYearSel03 option:selected").val()).prop("selected",true);
				$catchmentAreaMenu.ui.requestSrvAreaStatsData('1', $catchmentAreaMenu.ui.selectIndex);
			}else if($("#statistics_topic option:selected").val() == "family"){
				$(".pfh_year_detail").text($("#bYearSel03 option:selected").val());
				$catchmentAreaMenu.ui.area_search();
				$catchmentAreaMenu.ui.showChkDetailDiv("family");
				
				$("#bYearSel01").val($("#bYearSel03 option:selected").val()).prop("selected",true);
				$catchmentAreaMenu.ui.requestSrvAreaStatsData('1', $catchmentAreaMenu.ui.selectIndex);
			}else if($("#statistics_topic option:selected").val() == "house"){
				$(".pfh_year_detail").text($("#bYearSel03 option:selected").val());
				$catchmentAreaMenu.ui.area_search();
				$catchmentAreaMenu.ui.showChkDetailDiv("house");
				
				$("#bYearSel01").val($("#bYearSel03 option:selected").val()).prop("selected",true);
				$catchmentAreaMenu.ui.requestSrvAreaStatsData('1', $catchmentAreaMenu.ui.selectIndex);
			}else if($("#statistics_topic option:selected").val() == "copr"){
				if($('#detail_condtion_txt').text() == '' || $('#detail_condtion_txt').text() == null || $('#detail_condtion_txt').text() == undefined || $('#detail_condtion_txt').text() == "()"){
					$('#modal_body  > p').html("통계 주제에 대한 <br>세부조건을 선택해 주십시오.<br>'선택 '버튼을 클릭하면  <br>산업 분류를 검색·선택할 수 있습니다.");
					$('#default-layer').show();
					$('.dim').show();
					pass = false;
				}else{
					$(".pfh_year_detail").text($("#bYearSel03 option:selected").val());
					$catchmentAreaMenu.ui.area_search();
					$catchmentAreaMenu.ui.showChkDetailDiv("copr");
					$("#bYearSel02").val($("#bYearSel03 option:selected").val()).prop("selected",true);
					$catchmentAreaMenu.ui.requestSrvAreaStatsData('2', $catchmentAreaMenu.ui.selectIndex);
				}
			}else if($("#statistics_topic option:selected").val() == "worker"){
				if($('#detail_condtion_txt').text() == '' || $('#detail_condtion_txt').text() == null || $('#detail_condtion_txt').text() == undefined || $('#detail_condtion_txt').text() == "()"){
					$('#modal_body  > p').html("통계 주제에 대한 <br>세부조건을 선택해 주십시오.<br>'선택 '버튼을 클릭하면  <br>산업 분류를 검색·선택할 수 있습니다.");
					$('#default-layer').show();
					$('.dim').show();
					pass = false;
				}else{
					$(".pfh_year_detail").text($("#bYearSel03 option:selected").val());
					$catchmentAreaMenu.ui.area_search();
					$catchmentAreaMenu.ui.showChkDetailDiv("employee");
					$("#bYearSel02").val($("#bYearSel03 option:selected").val()).prop("selected",true);
					$catchmentAreaMenu.ui.requestSrvAreaStatsData('2', $catchmentAreaMenu.ui.selectIndex);
				}
			}
			
			if(pass){
				$(".pfh_year").text($("#bYearSel01 option:selected").val());
				$(".cbcw_year").text($("#bYearSel02 option:selected").val());
				
				$("#detail_total").show();
		    	$("#basic_total").hide();
			}
			
		}
		

	});
	
	$(document).on("click", "#interval_table .distance_select__con.col-4 button", function() {
		var button = $("#interval_table .distance_select__con.col-4 button.on"); 
		
		if($('#default_type_select button.on').attr('value') == 0){
			if(button.length < 4){
				$("#interval_table .modal__body div p:eq(1)").hide();
				if($(this).hasClass("on")){
					$(this).removeClass("on");
				}else{
					$(this).addClass("on");
				}
			}else if (button.length == 4){
				if($(this).hasClass("on")){
					$(this).removeClass("on");
				}else{
					$("#interval_table .modal__body div p:eq(1)").show();
				}
			}
		}else if($('#default_type_select button.on').attr('value') == 1){
			$('#interval_table .distance_select__con.col-4 button').removeClass("on");
			$(this).addClass("on")
		}
		
	});
	
	$(document).on("click", ".age_select_con button", function() {
		
		$(".age_select_con button").removeClass("on");
		$(this).addClass("on");
		
	});
	
	$(document).on("click", ".detailcondition_radio", function() {
		var this_button = $(this).parent('div').parent('td').parent('tr').children('td:eq(1)').children('div').children('div:eq(1)').children('button');
		this_button.trigger('click');
	
	});
	
	$(document).on("click", "#default_type_select button", function() {
		if($(this).hasClass('on')){

		}else{
			$("#default_type_select button").removeClass('on');
			$(this).addClass('on');
		}
		
		if($("#default_type_select button.on").text()  == "영역 내 정보 조회"){
			$(".default-select").show();
			$(".type-select").hide();
			var type = '';
			if($('input[name=stats_radio]:checked').attr("id") == "stats_radio_t"){
				type = 'T';
			}else if($('input[name=stats_radio]:checked').attr("id") == "stats_radio_d"){
				type = 'D';
			}else if($('input[name=stats_radio]:checked').attr("id") == "stats_radio_r"){
				type = 'R';
			}
			$catchmentAreaMenu.ui.setRangeDisplay(type);
		}else if($("#default_type_select button.on").text()  == "격자 분포 조회"){
			$(".default-select").hide();
			$(".type-select").show();
		}
	});
	
	$(document).on("click", "#people_detail_submit", function() {
		var html = "";
		if($('#menu_3').hasClass('active')){
			html += "성별";
			if($("input[name='people']:checked").attr('data-value') == "00"){
				html += "(전체)";
			}else if($("input[name='people']:checked").attr('data-value') == "1"){
				html += "(남자)";
			}else if($("input[name='people']:checked").attr('data-value') == "2"){
				html += "(여자)";
			}
		}
		html += "연령";
		if($("#people_age_unit a.on").attr("data-value") == "0"){
			html += "(전체)";
		}else{
			html += "(" +$("#people_detail_condition .age_select_con button.on").text() + ")";
		}
		if($('#default_type_select button.on').val() == 0){
			$("#detail_condtion_txt").text(html);
		}else if($('#default_type_select button.on').val() == 1){
			$("#detail_condtion_txt_grid").text(html);
		}
		$("#people_detail_condition").hide();
	});
	$(document).on("click", "#people_detail_cancel", function() {
		$('#people_age_unit a[data-value = '+ $catchmentAreaMenu.ui.people_selected_menu +']').trigger('click');
		if($catchmentAreaMenu.ui.people_selected_menu != '0'){
			$('.age_select_con button[data-value = '+ $catchmentAreaMenu.ui.people_selected +']').trigger('click');
		}
		//2022-12-15 이벤트 추가
		$("#people_detail_condition").hide();
	});
	
	$(document).on("click", "#family_detail_submit", function() {
		var html = "";
		if($("input:checkbox[name=furniture_all]").is(":checked")){
			html += "가구(전체) ";
		}else{
			if($("#family_furniture_all").hasClass("on")){
				html += "친족 가구(전체) ";
			}else{
				if($("#family_furniture button.on").length > 0){
				html += "친족 가구(";
				for(var a = 0; a < $("#family_furniture button.on").length; a++){
					html += $("#family_furniture button.on:eq("+ a +")").text();
					if(a != $("#family_furniture button.on").length-1){
						html += ",";
					}
				}
				html += ") ";
				}
			}
			if($("#nofamily").hasClass("on")){
				html += "비친족 가구 ";
			}
			 if($("#onefamily").hasClass("on")){
					html += "1인 가구 ";
				}
		}
		if($('#default_type_select button.on').val() == 0){
			$("#detail_condtion_txt").text(html);
		}else if($('#default_type_select button.on').val() == 1){
			$("#detail_condtion_txt_grid").text(html);
		}
	});
	
	$(document).on("click", "#family_detail_cancel", function() {
		$('.furniture_selected_save.on').removeClass('on');
		for(var a = 0; a < $catchmentAreaMenu.ui.family_selected.length ; a++){
			$('.family_furniture_select button[data-value = '+ $catchmentAreaMenu.ui.family_selected[a] +']').trigger('click');
		}
		//2022-12-15 이벤트 추가
		$("#family_detail_condition").hide();
	});
	
	$(document).on("click", "#house_detail_submit", function() {
		var html = "";
		var val = $("#house_detail_condition_menu a.on").attr("data-value");
		if(val == "0"){
			if($("#house_detail_all_check").hasClass("active")){
				html += "주택유형(전체)";
			}else{
				html += "주택유형(";
				for(var a = 0; a < $("#house_detail_menu_01 div button.on").length; a++){
					if(a == $("#house_detail_menu_01 div button.on").length-1){
						html += $("#house_detail_menu_01 div button.on:eq("+a+")").text();
					}else{
						html += $("#house_detail_menu_01 div button.on:eq("+a+")").text() + " ,";
					}
				}
				html += ")";
			}
		}else if(val == "1"){
			html += "건축연도(";
			html += $("#house_detail_menu_02 div button.on").text();
			html += ")";
		}else if(val == "2"){
			html += "연면적(";
			html += $("#house_detail_menu_03 div button.on").text();
			html += ")";
		}
		
		
		if($('#default_type_select button.on').val() == 0){
			$("#detail_condtion_txt").text(html);
		}else if($('#default_type_select button.on').val() == 1){
			$("#detail_condtion_txt_grid").text(html);
		}
		$("#house_detail_condition").hide();
	});
	
	$(document).on("click", "#house_detail_cancel", function() {
		$('.house_select button.on').removeClass('on');
		$('#house_detail_condition_menu a[data-value = '+ $catchmentAreaMenu.ui.house_selected_menu +']').trigger('click');
		
		if($catchmentAreaMenu.ui.house_selected_menu == "0"){
			$('#house_detail_all_check').trigger('click');
		}
		for(var a = 0; a < $catchmentAreaMenu.ui.house_selected.length ; a++){
			if($catchmentAreaMenu.ui.house_selected_menu == "0"){
				$('#house_detail_type button[data-value = '+ $catchmentAreaMenu.ui.house_selected[a] +']').trigger('click');
			}else{
				$('.house_because_cancel button[data-value = '+ $catchmentAreaMenu.ui.house_selected[a] +']').trigger('click');
			}
		}
		//2022-12-15 이벤트 추가
		$("#house_detail_condition").hide();
	});
	
	$(document).on("click", "#copr_detail_submit01", function() {
		var html = "";
		var val =$("#copr_detail_condition .select-ui a.on");
		if(val.parents("div").attr("data-big-theme-cd") == "H"){
			html += "음식";
		}else if (val.parents("div").attr("data-big-theme-cd") == "C"){
			html += "소매업";
		}else if (val.parents("div").attr("data-big-theme-cd") == "D"){
			html += "생활서비스";
		}else if (val.parents("div").attr("data-big-theme-cd") == "G"){
			html += "숙박";
		}else if (val.parents("div").attr("data-big-theme-cd") == "F"){
			html += "여가생활";
		}else if (val.parents("div").attr("data-big-theme-cd") == "I"){
			html += "교육";
		}else if (val.parents("div").attr("data-big-theme-cd") == "J"){
			html += "의료";
		}else if (val.parents("div").attr("data-big-theme-cd") == "K"){
			html += "공공";
		}
		html += "(" + val.text() + ")";
		
		if($('#default_type_select button.on').val() == 0){
			$("#detail_condtion_txt").text(html);
			$catchmentAreaMenu.ui.copr_selected_menu01  = [val.parents("div").attr("data-big-theme-cd")];
			$catchmentAreaMenu.ui.copr_selected01 = [val.attr("data-ksic-sel-cd")];
		}else if($('#default_type_select button.on').val() == 1){
			$("#detail_condtion_txt_grid").text(html);
			$catchmentAreaMenu.ui.copr_selected_menu02 = [val.parents("div").attr("data-big-theme-cd")];
			$catchmentAreaMenu.ui.copr_selected02 = [val.attr("data-ksic-sel-cd")];
		}
		
		
		$("#copr_detail_condition").hide();
	});
	
	$(document).on("click", ".area-notice__btn.more-detail, .option__text", function() {
		$('#catchmentArea_map_use_info').show();
	});
	
	$(document).on("click", "#copr_detail_submit02", function() {
		var html = "";
		var checked = $("#copr_detail_condition_korea input[name='industry-select']:checked");
		if(checked.length == 0){
			$('#search_notice_nosel').show();
		}else{
			html += checked.attr("data-ksic-sel-nm");
			html += "(" + checked.attr("data-ksic-sel-cd") + ")";
			
			if($('#default_type_select button.on').val() == 0){
				$("#detail_condtion_txt").text(html);
			}else if($('#default_type_select button.on').val() == 1){
				$("#detail_condtion_txt_grid").text(html);
			}
			$("#copr_detail_condition_korea").hide();
			$('#search_notice_nosel').hide();
		}
	});
	$(document).on("click", "#worker_detail_submit01", function() {
		var html = "";
		var val =$("#worker_detail_condition .select-ui a.on");
		if(val.parents("div").attr("data-big-theme-cd") == "H"){
			html += "음식";
		}else if (val.parents("div").attr("data-big-theme-cd") == "C"){
			html += "소매업";
		}else if (val.parents("div").attr("data-big-theme-cd") == "D"){
			html += "생활서비스";
		}else if (val.parents("div").attr("data-big-theme-cd") == "G"){
			html += "숙박";
		}else if (val.parents("div").attr("data-big-theme-cd") == "F"){
			html += "여가생활";
		}else if (val.parents("div").attr("data-big-theme-cd") == "I"){
			html += "교육";
		}else if (val.parents("div").attr("data-big-theme-cd") == "J"){
			html += "의료";
		}else if (val.parents("div").attr("data-big-theme-cd") == "K"){
			html += "공공";
		}
		html += "(" + val.text() + ")";

		if($('#default_type_select button.on').val() == 0){
			$("#detail_condtion_txt").text(html);
			$catchmentAreaMenu.ui.worker_selected_menu01  = [val.parents("div").attr("data-big-theme-cd")];
			$catchmentAreaMenu.ui.worker_selected01 = [val.attr("data-ksic-sel-cd")];
		}else if($('#default_type_select button.on').val() == 1){
			$("#detail_condtion_txt_grid").text(html);
			$catchmentAreaMenu.ui.worker_selected_menu02 = [val.parents("div").attr("data-big-theme-cd")];
			$catchmentAreaMenu.ui.worker_selected02 = [val.attr("data-ksic-sel-cd")];
		}
		$("#worker_detail_condition").hide();
	});
	
	$(document).on("click", "#worker_detail_submit02", function() {
		var html = "";
		var checked = $("#worker_detail_condition_korea input[name='industry-select-worker']:checked");
		if(checked.length == 0){
			$('#search_notice_nosel_worker').show();
		}else{
			html += checked.attr("data-ksic-sel-nm");
			html += "(" + checked.attr("data-ksic-sel-cd") + ")";
			if($('#default_type_select button.on').val() == 0){
				$("#detail_condtion_txt").text(html);
			}else if($('#default_type_select button.on').val() == 1){
				$("#detail_condtion_txt_grid").text(html);
			}
			$("#worker_detail_condition_korea").hide();
			$('#search_notice_nosel_worker').hide();
		}
	});
	
	$(document).on("click", "#family_detail_submit", function() {
		$("#family_detail_condition").hide();
	});
	
	$(document).on("click", ".must_one_circle", function() {
		$(".must_one_circle").removeClass("active");
		$(".must_one_circle").removeClass("bg-red");
		$(this).addClass("active");
		$(this).addClass("bg-red");
	});
	
	$(document).on("click", "#furniture_all", function() {
		if($("input:checkbox[name=furniture_all]").is(":checked")){
			$(".furniture_select").addClass('on');
		}else{
			$(".furniture_select").removeClass('on');
		}
	
	});

	$(document).on("click", "#area_search_cancel", function() {
		$('#catchmentArea_search_div').hide();
	});
	
	$(document).on("click", ".furniture__btn", function() {
		if($(this).hasClass("on")){
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
		}
		
		if($('#family_furniture button.on').length == 4){
			$('#family_furniture_all').addClass('on');
		}else{
			$('#family_furniture_all').removeClass('on');
		}
		
		if($('.furniture__btn.on').length == 7){
			$("input:checkbox[name=furniture_all]").prop('checked',true);
		}else if($('.furniture__btn.on').length == 0){
			$('#furniture_all').trigger('click');
		}else{
			$("input:checkbox[name=furniture_all]").prop('checked',false);
		}
		
	});
	
	
	$(document).on("click", "#interval_table_check", function(e) {
		var button = $("#interval_table .modal__body .distance_select__con.col-4 .on"); 		
		var html_grid = '';
		var count = 0;
	
		if(button.length == 0 ){	
			$("#interval_table_check").attr("disabled", true);
			$("#interval_table .modal__body div p:eq(0)").show();
			$("#interval_table_check").attr("disabled", false);
			$("#interval_table").show();
		}else{			
			$("#interval_table .modal__body div p:eq(0)").hide();
			$("#interval_table .modal__body div p:eq(1)").hide();
			
			if($("#default_type_select button.on").val() == 0){ // 기본 통계 
				if($('#area_setting_directly .on a').attr("id") == "rndstats01"){
					$('#area_setting_selected_1 .self-select__form li div div').attr("data-value",'');
					$('#area_setting_selected_1 .self-select__form li div div').text('입력');
					$('#area_setting_selected_1 .self-select__form li div div').attr("class",'self-select__circle');
					
					$catchmentAreaMenu.ui.t_rndm = [];
					for(var i = 0; i < button.length; i++){
						$catchmentAreaMenu.ui.t_rndm.push(button.eq(i).val()); 
					}
					for(var i = 0; i < $catchmentAreaMenu.ui.t_rndm.length; i++){
						$('#area_setting_selected_1 .self-select__form li:eq('+i+') div div').attr("data-value",$catchmentAreaMenu.ui.t_rndm[i]);
						$('#area_setting_selected_1 .self-select__form li:eq('+i+') div div').text($catchmentAreaMenu.ui.t_rndm[i]/60);
						$('#area_setting_selected_1 .self-select__form li:eq('+i+') div div').addClass($catchmentAreaMenu.ui.bg_color[i]);
						$('#area_setting_selected_1 .self-select__form li:eq('+i+') div div').addClass("active");
					}
					
					
				}else if($('#area_setting_directly .on a').attr("id") == "rndstats02"){
					$('#area_setting_selected_2 .self-select__form li div div').attr("data-value",'');
					$('#area_setting_selected_2 .self-select__form li div div').text('입력');
					$('#area_setting_selected_2 .self-select__form li div div').attr("class",'self-select__circle');
					
					$catchmentAreaMenu.ui.d_rndm = [];
					for(var i = 0; i < button.length; i++){
						$catchmentAreaMenu.ui.d_rndm.push(button.eq(i).val());
					}
					for(var i = 0; i < $catchmentAreaMenu.ui.d_rndm.length; i++){
						$('#area_setting_selected_2 .self-select__form li:eq('+i+') div div').attr("data-value",$catchmentAreaMenu.ui.d_rndm[i]);
						$('#area_setting_selected_2 .self-select__form li:eq('+i+') div div').text($catchmentAreaMenu.ui.d_rndm[i]/1000);
						$('#area_setting_selected_2 .self-select__form li:eq('+i+') div div').addClass($catchmentAreaMenu.ui.bg_color[i]);
						$('#area_setting_selected_2 .self-select__form li:eq('+i+') div div').addClass("active");
					}
	
				}else if($('#area_setting_directly .on a').attr("id") == "rndstats03"){
					$('#area_setting_selected_3 .self-select__form li div div').attr("data-value",'');
					$('#area_setting_selected_3 .self-select__form li div div').text('입력');
					$('#area_setting_selected_3 .self-select__form li div div').attr("class",'self-select__circle');
					
					$catchmentAreaMenu.ui.r_rndm = [];
					for(var i = 0; i < button.length; i++){
						$catchmentAreaMenu.ui.r_rndm.push(button.eq(i).val());
					}
					for(var i = 0; i < $catchmentAreaMenu.ui.r_rndm.length; i++){
						$('#area_setting_selected_3 .self-select__form li:eq('+i+') div div').attr("data-value",$catchmentAreaMenu.ui.r_rndm[i]);
						$('#area_setting_selected_3 .self-select__form li:eq('+i+') div div').text($catchmentAreaMenu.ui.r_rndm[i]/1000);
						$('#area_setting_selected_3 .self-select__form li:eq('+i+') div div').addClass($catchmentAreaMenu.ui.bg_color[i]);
						$('#area_setting_selected_3 .self-select__form li:eq('+i+') div div').addClass("active");
					}
	
				}
			}else if ($("#default_type_select button.on").val() == 1){ // 격자 통계
				if($('#grid_setting_directly .on a').attr("id") == "rndstats01_grid"){
					$('#grid_setting_selected_1 .self-select__form li div div').attr("data-value",'');
					$('#grid_setting_selected_1 .self-select__form li div div').text('입력');
					$('#grid_setting_selected_1 .self-select__form li div div').attr("class",'self-select__circle');
					
					$catchmentAreaMenu.ui.t_rndm_grid = [];
					for(var i = 0; i < button.length; i++){
						$catchmentAreaMenu.ui.t_rndm_grid.push(button.eq(i).val()); 
					}
					for(var i = 0; i < $catchmentAreaMenu.ui.t_rndm_grid.length; i++){
						$('#grid_setting_selected_1 .self-select__form li:eq('+i+') div div').attr("data-value",$catchmentAreaMenu.ui.t_rndm_grid[i]);
						$('#grid_setting_selected_1 .self-select__form li:eq('+i+') div div').text($catchmentAreaMenu.ui.t_rndm_grid[i]/60);
						$('#grid_setting_selected_1 .self-select__form li:eq('+i+') div div').addClass($catchmentAreaMenu.ui.bg_color[i]);
						$('#grid_setting_selected_1 .self-select__form li:eq('+i+') div div').addClass("active");
					}
				}else if($('#grid_setting_directly .on a').attr("id") == "rndstats02_grid"){
					$('#grid_setting_selected_2 .self-select__form li div div').attr("data-value",'');
					$('#grid_setting_selected_2 .self-select__form li div div').text('입력');
					$('#grid_setting_selected_2 .self-select__form li div div').attr("class",'self-select__circle');
					
					$catchmentAreaMenu.ui.d_rndm_grid = [];
					for(var i = 0; i < button.length; i++){
						$catchmentAreaMenu.ui.d_rndm_grid.push(button.eq(i).val()); 
					}
					for(var i = 0; i < $catchmentAreaMenu.ui.d_rndm_grid.length; i++){
						$('#grid_setting_selected_2 .self-select__form li:eq('+i+') div div').attr("data-value",$catchmentAreaMenu.ui.d_rndm_grid[i]);
						$('#grid_setting_selected_2 .self-select__form li:eq('+i+') div div').text($catchmentAreaMenu.ui.d_rndm_grid[i]/1000);
						$('#grid_setting_selected_2 .self-select__form li:eq('+i+') div div').addClass($catchmentAreaMenu.ui.bg_color[i]);
						$('#grid_setting_selected_2 .self-select__form li:eq('+i+') div div').addClass("active");
					}
	
				}else if($('#grid_setting_directly .on a').attr("id") == "rndstats03_grid"){
					$('#grid_setting_selected_3 .self-select__form li div div').attr("data-value",'');
					$('#grid_setting_selected_3 .self-select__form li div div').text('입력');
					$('#grid_setting_selected_3 .self-select__form li div div').attr("class",'self-select__circle');
					
					$catchmentAreaMenu.ui.r_rndm_grid = [];
					for(var i = 0; i < button.length; i++){
						$catchmentAreaMenu.ui.r_rndm_grid.push(button.eq(i).val()); 
					}
					for(var i = 0; i < $catchmentAreaMenu.ui.r_rndm_grid.length; i++){
						$('#grid_setting_selected_3 .self-select__form li:eq('+i+') div div').attr("data-value",$catchmentAreaMenu.ui.r_rndm_grid[i]);
						$('#grid_setting_selected_3 .self-select__form li:eq('+i+') div div').text($catchmentAreaMenu.ui.r_rndm_grid[i]/1000);
						$('#grid_setting_selected_3 .self-select__form li:eq('+i+') div div').addClass($catchmentAreaMenu.ui.bg_color[i]);
						$('#grid_setting_selected_3 .self-select__form li:eq('+i+') div div').addClass("active");
					}
	
				}
			}
			$('#information_check').attr("disabled", false);
			$('.modal').hide();
			$('.dim').hide();
		}
		
	});
	
    
    $(document).on("click", "#grid_setting_directly li", function() {
    	var cnt = $(this).index();
        $(this).addClass('on');
        $('.self-select__tab.grid_setting li').not(this).removeClass('on');
        $('.self-select__con.grid_setting')
            .hide()
            .eq(cnt)
            .stop()
            .fadeIn();
        
        var val = $("#grid_setting_directly li.on a").attr("data-value");
    	var item = $catchmentAreaMenu.ui.rndmScopeInfo[val];
		var max = (parseFloat)(item.max_scope_value); //최대
	    var min = (parseFloat)(item.min_scope_value); //최소
	    var intrvl = (parseFloat)(item.scope_intrvl); //간격
	    var tdCount = (parseFloat)(max-min+intrvl)/intrvl;//반복횟수
	    var html = '';
	    var unit = '';
	    if(val == 0){
	    	unit = '분';
	    }else{
	    	unit = 'km';
	    }
	    
	    for(var a = 0; a < 4; a++){
		    html += '<li>';
		    html += '<div>';
		    html += ' <div class="self-select__circle"></div>';
		    html += '<span>'+ unit +'</span>';
		    html += '</div>';
		    html += '</li>';
	    }
	    $('#grid_distribution_group').html(html);
	    
	    if(val == 0){
	    	$('.self-select__info.grid_setting li:eq(0) p').text(min + "분");
	    	$('.self-select__info.grid_setting li:eq(1) p').text(max + "분");
	    	$('.self-select__info.grid_setting li:eq(2) p').text(intrvl + "분");
	    	if($('#grid_setting_selected_1 .self-select__circle.bg-red.active').length > 0){
	    		$('#grid_setting_selected_1 .self-select__circle').trigger('click');
		    	$('#interval_table_check').trigger('click');
	    	}
	    }else if(val == 1){
	    	$('.self-select__info.grid_setting li:eq(0) p').text(min + "km");
	    	$('.self-select__info.grid_setting li:eq(1) p').text(max + "km");
	    	$('.self-select__info.grid_setting li:eq(2) p').text(intrvl + "km");
	    	if($('#grid_setting_selected_2 .self-select__circle.bg-red.active').length > 0){
	    		$('#grid_setting_selected_2 .self-select__circle').trigger('click');
		    	$('#interval_table_check').trigger('click');
	    	}
	    }else if(val == 2){
	    	$('.self-select__info.grid_setting li:eq(0) p').text(min + "km");
	    	$('.self-select__info.grid_setting li:eq(1) p').text(max + "km");
	    	$('.self-select__info.grid_setting li:eq(2) p').text(intrvl + "km");
	    	if($('#grid_setting_selected_3 .self-select__circle.bg-red.active').length > 0){
	    		$('#grid_setting_selected_3 .self-select__circle').trigger('click');
		    	$('#interval_table_check').trigger('click');
	    	}
	    }
    	
    });
    
    $(document).on("click", "#grid_distribution .must_one_circle", function() { // 영역 넓이 계산 하기
    	var x_coordinate = $catchmentAreaMenu.ui.selectCoordinate_x //x좌표
    	var y_coordinate = $catchmentAreaMenu.ui.selectCoordinate_y //y좌표
    	if($(this).attr("data-value") != '' || $(this).attr("data-value") != undefined || $(this).attr("data-value")!= null){
    		var areaMins = [];
    		areaMins.push($(this).attr("data-value"));
    		if($("#grid_setting_directly li:eq(0)").hasClass("on")){
        		$catchmentAreaMap.arcgis.event.calculateSearchArea(x_coordinate, y_coordinate, areaMins, 99,0);
    		}else if($("#grid_setting_directly li:eq(1)").hasClass("on")){
    			$catchmentAreaMap.arcgis.event.calculateSearchArea(x_coordinate, y_coordinate, areaMins, 99,1);
    		}else if($("#grid_setting_directly li:eq(2)").hasClass("on")){
    			$catchmentAreaMenu.ui.geoMap_area_grid = (Number($(this).attr("data-value")) * Number($(this).attr("data-value")) * 3.14/1000000).toFixed(2);
    		}
    		
    	}
    });
   
    $(document).on("click", "#area_setting_directly li", function() {
    	var cnt = $(this).index();
        $(this).addClass('on');
        $('.self-select__tab.area_setting li').not(this).removeClass('on');
        $('.self-select__con.area_setting')
            .hide()
            .eq(cnt)
            .stop()
            .fadeIn();
        
        var val = $("#area_setting_directly li.on a").attr("data-value");
    	var item = $catchmentAreaMenu.ui.rndmScopeInfo[val];
		var max = (parseFloat)(item.max_scope_value); //최대
	    var min = (parseFloat)(item.min_scope_value); //최소
	    var intrvl = (parseFloat)(item.scope_intrvl); //간격
	    var tdCount = (parseFloat)(max-min+intrvl)/intrvl;//반복횟수
	    $('.self-select__info.area_setting li p').text('');
	    
	    if(val == 0){
	    	$('.self-select__info.area_setting li:eq(0) p').text(min + "분");
	    	$('.self-select__info.area_setting li:eq(1) p').text(max + "분");
	    	$('.self-select__info.area_setting li:eq(2) p').text(intrvl + "분");
	    	if($('#area_setting_selected_1 .self-select__circle.bg-red.active').length > 0){
	    		$('#area_setting_selected_1 .self-select__circle').trigger('click');
		    	$('#interval_table_check').trigger('click');
	    	}
	    }else if(val == 1){
	    	$('.self-select__info.area_setting li:eq(0) p').text(min + "km");
	    	$('.self-select__info.area_setting li:eq(1) p').text(max + "km");
	    	$('.self-select__info.area_setting li:eq(2) p').text(intrvl + "km");
	    	if($('#area_setting_selected_2 .self-select__circle.bg-red.active').length > 0){
	    		$('#area_setting_selected_2 .self-select__circle').trigger('click');
		    	$('#interval_table_check').trigger('click');
	    	}
	    }else if(val == 2){
	    	$('.self-select__info.area_setting li:eq(0) p').text(min + "km");
	    	$('.self-select__info.area_setting li:eq(1) p').text(max + "km");
	    	$('.self-select__info.area_setting li:eq(2) p').text(intrvl + "km");
	    	if($('#area_setting_selected_3 .self-select__circle.bg-red.active').length > 0){
	    		$('#area_setting_selected_3 .self-select__circle').trigger('click');
		    	$('#interval_table_check').trigger('click');
	    	}
	    }
    	
    });
    
	$(document).on("click", ".self-select__form.input_circle li div div", function() {
		var stand; 
		var val;
		var circle;
		var circle_val = [];
		if($("#default_type_select button.on").val() == 0){
			stand = $("#area_setting_directly li.on a").text(); 
			val = $("#area_setting_directly li.on a").attr("data-value");
		}else if($("#default_type_select button.on").val() == 1){
			stand = $("#grid_setting_directly li.on a").text(); 
			val = $("#grid_setting_directly li.on a").attr("data-value");
		}
		var item = $catchmentAreaMenu.ui.rndmScopeInfo[val];
	    var unit = item.unit_nm;
		var max = (parseFloat)(item.max_scope_value); //최대
	    var min = (parseFloat)(item.min_scope_value); //최소
	    var intrvl = (parseFloat)(item.scope_intrvl); //간격
	    var tdCount = (parseFloat)(max-min+intrvl)/intrvl;//반복횟수
		var html = '';
		var num = 0;
		var menu;
		if($('#default_type_select button.on').val() == '0'){
			if($('#area_setting_directly li.on').attr('data-value') == '0'){
				circle = $('#area_setting_selected_1 .self-select__form.input_circle li div div.active');
				menu = 1;
			}else if($('#area_setting_directly li.on').attr('data-value') == '1'){
				circle = $('#area_setting_selected_2 .self-select__form.input_circle li div div.active');
				menu = 2;
			}else if($('#area_setting_directly li.on').attr('data-value') == '2'){
				circle = $('#area_setting_selected_3 .self-select__form.input_circle li div div.active');
				menu = 3;
			}
			for(var i = 0; i < circle.length; i ++){
				circle_val.push($('#area_setting_selected_'+ menu +' .self-select__form.input_circle li div div.active:eq('+ i +')').attr("data-value"));
			}
		}else if($('#default_type_select button.on').val() == '1'){
			if($('#grid_setting_directly li.on').attr('data-value') == '0'){
				circle = $('#grid_setting_selected_1 .self-select__form.input_circle li div div.active');
				menu = 1;
			}else if($('#grid_setting_directly li.on').attr('data-value') == '1'){
				circle = $('#grid_setting_selected_2 .self-select__form.input_circle li div div.active');
				menu = 2;
			}else if($('#grid_setting_directly li.on').attr('data-value') == '2'){
				circle = $('#grid_setting_selected_3 .self-select__form.input_circle li div div.active');
				menu = 3;
			}
			for(var i = 0; i < circle.length; i ++){
				circle_val.push($('#grid_setting_selected_'+ menu +' .self-select__form.input_circle li div div.active:eq('+ i +')').attr("data-value"));
			}
		}
		
		
		
		if(stand == "주행시간"){
			$('#interval_table form .modal__header h3').text('주행시간 간격 선택');
			$('#interval_table form .modal__body span').text('(단위: '+ unit +')');
			
			for(var i=0; i<tdCount; i++) {
			   if(circle_val[num] == (min + intrvl*i)*60){
				   html += '<button type = "button" value = "'+ (min + intrvl*i)*60 +'" class = "on"> ' + (min + intrvl*i)+ '</button>'; 
				   num++;
			   }else{
				   html += '<button type = "button" value = "'+ (min + intrvl*i)*60 +'"> ' + (min + intrvl*i)+ '</button>';	
			   }
			   
 		    }
			$('#interval_table form .modal__body .distance_select__con.col-4').html(html);
		}else if(stand == "주행거리"){
			$('#interval_table form .modal__header h3').text('주행거리 간격 선택');
			$('#interval_table form .modal__body span').text('(단위: '+ unit +')');
			for(var i=0; i<tdCount; i++) {
				if(circle_val[num] == (min + intrvl*i)*1000){
					html += '<button type = "button" value = "'+ (min + intrvl*i)*1000 +'" class = "on"> ' + (min + intrvl*i)+ '</button>';
					   num++;
				}else{
					html += '<button type = "button" value = "'+ (min + intrvl*i)*1000 +'"> ' + (min + intrvl*i)+ '</button>';
				}
	 		}
			$('#interval_table form .modal__body .distance_select__con.col-4').html(html);
		}else if(stand == "반경"){
			$('#interval_table form .modal__header h3').text('반경 간격 선택');
			$('#interval_table form .modal__body span').text('(단위: '+ unit +')');
			for(var i=0; i<tdCount; i++) {
				if(circle_val[num] == (min + intrvl*i)*1000){
					 html += '<button type = "button" value = "'+ (min + intrvl*i)*1000 +'" class = "on"> ' + (min + intrvl*i)+ '</button>';
					 num++;
				}else{
					 html += '<button type = "button" value = "'+ (min + intrvl*i)*1000 +'"> ' + (min + intrvl*i)+ '</button>';
				}
				  	
	 	    }
			$('#interval_table form .modal__body .distance_select__con.col-4').html(html);
		}
		$('#information_check').attr("disabled", true);
		$('#interval_table').show();
		
	});
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
					//SGIS4_생활권역_수정 시작
					if(item.b_class_cd == 'SRVA20'){ //인구 5세
						html_type_1 += '<button type = "button" data-value="'+item.cd_exp+'">'+item.s_class_cd_nm+'</button>';
					}else if(item.b_class_cd == 'SRVA03'){ //주택
						if(item.s_class_cd != '10'){		// 주택이외의 거처 제외
							if(item.s_class_cd_nm.length > 5){
								html_type_3 += '<button type = "button" data-value="'+item.s_class_cd+'">'+item.s_class_cd_nm+'</button>';
							}else{
								html_type_3 += '<button type = "button" data-value="'+item.s_class_cd+'">'+item.s_class_cd_nm+'</button>';
							}
						}
					}else if(item.b_class_cd == 'SRVA21'){ //인구 10세
						html_type_6 += '<button type = "button" data-value="'+item.cd_exp+'">'+item.s_class_cd_nm+'</button>';						
					}else if(item.b_class_cd == 'SRVA18'){ //인구 주요구간
						html_type_7 += '<button type = "button" data-value="'+item.cd_exp+'">'+item.s_class_cd_nm+'</button>';
					}else if(item.b_class_cd == 'SRVA19'){
						html_type_8 += '<button type = "button" data-value="'+item.s_class_cd+'">'+item.s_class_cd_nm+'</button>';
					}
					//SGIS4_생활권역_수정 끝
				});
				
				$("#5_age_unit div").append(html_type_1);
				$("#10_age_unit div").append(html_type_6);
				$("#important_age_unit div").append(html_type_7);				
				$("#house_detail_type").append(html_type_3);
				$("#house_detail_floor_area").append(html_type_8);//연면적				
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 격자통계조건 설정 리스트 End **********/
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
							$('#select_age5_area').val(result[0].ppltn_stat_dflt_slctn).prop("selected",true);
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
	/**
	 * @name : get_cookie
	 * @description : 쿠키 조회
	 * @date : 2020.06.09
	 * @author : 한광희
	 * @history :
	 * @param :
	 */
	function get_cookie(p_name) {
		var lvResultData = "";
		// ajax 시작
		$.ajax({
		    url: contextPath + "/m2019/login/getCookie.json",
		    type: 'post',
		    dataType : 'json',
		    async: false,
		    data: {
		    	name : p_name
		    },
		    beforeSend: function (xhr, settings) {
		    	var csrfSafeMethod = function(method) {
					return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
				}
				if (!sgisServiceApiRegexp.test(settings.url)&&!csrfSafeMethod(settings.type) && !this.crossDomain) {
					xhr.setRequestHeader("_csrf", "${_csrf.token}");
					if(settings.data){
						if(settings.data instanceof FormData){
							xhr.setRequestHeader("X-CSRF-TOKEN", csrf_token);
						}else{
							if(settings.data.indexOf(csrf_name+"=")==-1){
								settings.data+="&"+csrf_name+"="+csrf_token;
							}
						}
					}else{
						settings.data+=csrf_name+"="+csrf_token;
					}
				}
			}
		}).done(function (res) { // 완료
			if(res.errCd == "0") {
				lvResultData = res.result.resultData;
			}else if(res.errCd == "-401") {
				//common_alert(res.errMsg);
			}else{
				//common_alert(res.errMsg);
			}
		}).fail(function (res) { // 실패
			//common_alert(errorMessage);
		}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
			//common_loading(false);
		});
		// ajax 끝
		return lvResultData;
	}

	/**
	 * @name : set_cookie
	 * @description : 쿠키 저장
	 * @date : 2020.06.09
	 * @author : 한광희
	 * @history :
	 * @param :
	 */
	function set_cookie(p_name, p_value, p_expires_day) {
		// ajax 시작
		$.ajax({
		    url: contextPath + "/m2019/login/setCookie.json",
		    type: 'post',
		    dataType : 'json',
		    async: false,
		    data: {
		    	name : p_name,
		    	value : p_value,
		    	expires_day : p_expires_day
		    },
		    beforeSend: function (xhr, settings) {
		    	var csrfSafeMethod = function(method) {
					return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
				}
				if (!sgisServiceApiRegexp.test(settings.url)&&!csrfSafeMethod(settings.type) && !this.crossDomain) {
					xhr.setRequestHeader("_csrf", "${_csrf.token}");
					if(settings.data){
						if(settings.data instanceof FormData){
							xhr.setRequestHeader("X-CSRF-TOKEN", csrf_token);
						}else{
							if(settings.data.indexOf(csrf_name+"=")==-1){
								settings.data+="&"+csrf_name+"="+csrf_token;
							}
						}
					}else{
						settings.data+=csrf_name+"="+csrf_token;
					}
				}
			}
		});
		// ajax 끝
	}

}(window, document));
