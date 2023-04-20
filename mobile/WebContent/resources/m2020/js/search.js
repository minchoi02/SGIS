(function(W, D) {
	W.$searchList = W.$searchList || {};
	$(document).ready(function() {
		$("#search-form").submit(function() {
			srvLogWrite('O0', '52', '04', '02', $("#searchKeyword").val(), '');
			if ($searchList.searchValidate()) {
				location.href = contextPath+"/m2020/map/search.sgis?keywords=" + $("#searchKeyword").val();
			}
			return false;
		});
		$searchList.initialize();
	});
	$searchList = {
		addressAdmCd : "",
		openApiRelSearchParam: [], //OpenAPI 연관검색어 검색 파라미터
		openApiGeocodeParam: [], //OpenAPI 지오코딩 검색 파라미터
		emptyRequestCnt: 0,
		sKeyword: null, //전체 검색어
		addressKeyword: null, //검색어의 앞단어(주소)
		searchKeyword: null, //검색어의 뒷단어(검색어)
		x: "989674", //X좌표
		y: "1818313", //Y좌표
		initialize: function() {
			$searchList.sKeyword = getParameter("keywords")?decodeURIComponent(getParameter("keywords")):"";
			
			
			if($searchList.sKeyword == ""){
				$("#searchKeyword").val("");				
				return false;
			}else{
				$("#searchKeyword").val($searchList.sKeyword);
				$searchList.keywordSplit();
			}
			
		},
		//검색어 자르기
		keywordSplit: function() {
			if (this.searchValidate()) {
				this.sKeyword = $("#searchKeyword").val();
				this.sKeyword = this.sKeyword.replace(/(^\s*)|(\s*$)/gi, "");
				this.sKeyword = this.sKeyword.replace(/ +/g, " ");
				var arrayKey = this.sKeyword.split(" ");

				this.addressKeyword = arrayKey[0];
				this.searchKeyword = arrayKey[1];

				//결과없음 카운트 초기화
				$searchList.emptyRequestCnt = 0;
				
				if (arrayKey.length < 2) {
					//연관검색어 검색
					$searchList.openApiRelSearch(this.sKeyword);
					//지오코딩 검색
					$searchList.openApiGeocode(this.sKeyword);
					this.searchKeyword = this.sKeyword;
					workSearch(this.sKeyword);
					$searchList.getList("1", this.sKeyword);
				} else {
					//연관검색어 검색
					$searchList.openApiRelSearch(this.searchKeyword);
					//지오코딩 검색
					$searchList.openApiGeocode(this.addressKeyword);
					workSearch(this.sKeyword);
					$searchList.getList("1", this.sKeyword);
				}
			}
		},
		//검색어 유효성 검사
		searchValidate: function() {
			var searchword = $("#searchKeyword").val();			
			var arrayKey = searchword.split(" ");
			if (searchword == "") {
				common_alert("검색어를 입력하세요.",function(){
					$("#searchKeyword").focus();
				});
				return false;
			}
			return true;
		},
		checkRequestEmptyCnt: function() {
			$searchList.emptyRequestCnt++;
			if ($searchList.emptyRequestCnt < 6) {
				return;
			}
			var searchKeyword = $("#searchKeyword").val();
			
			$("#article-wrap").show();
			$("#article-wrap").html(
				'<div class="SearchCount NoResult">' +
				'<strong class="Word">' + $searchList.searchKeyword + '</strong>에 대한 검색결과가 없습니다.' +
				'<ul>' +
				'<li>단어의 철자가 정확한지 확인해 보세요.</li>' +
				'<li>한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.</li>' +
				'<li>검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해 보세요.</li>' +
				'<li>[지역명] 띄워쓰기 [키워드]로 검색어를 입력해 보세요.</li>' +
				'</ul>' +
				'</div>'
			);
		},
		// OpenAPI 지오코딩 검색
		openApiGeocode: function(address) {
			var obj = new sop.openApi.geocode.api();
			obj.addParam("accessToken", accessToken);
			obj.addParam("address", encodeURIComponent(encodeURIComponent(address)));
			obj.request({
				method: "GET",
				async: true,
				url: openApiPath + "/OpenAPI3/addr/geocode.json"
			});
			this.openApiGeocodeParam = [];
			this.openApiGeocodeParam.push(address);
		},
		openApiReverseGeoCode: function(division, url, title) {
			var obj = new sop.openApi.ReverseGeoCodeSearch.api();
			obj.addParam("accessToken", accessToken);
			obj.addParam("addr_type", "20");
			obj.addParam("x_coor", this.x);
			obj.addParam("y_coor", this.y);

			obj.request({
				method: "GET",
				async: true,
				url: openApiPath + "/OpenAPI3/addr/rgeocode.json",
				options: {
					target: this,
					url: url,
					title: title,
					division: division
				}
			});
		},
		// OpenAPI 연관검색어 검색
		openApiRelSearch: function(searchword) {
			var sopOpenApiRelsearchObj = new sop.openApi.relsearch.api();
			sopOpenApiRelsearchObj.addParam("accessToken", accessToken);
			sopOpenApiRelsearchObj.addParam("searchword", encodeURIComponent(encodeURIComponent(searchword)));
			sopOpenApiRelsearchObj.request({
				method: "GET",
				async: true,
				url: openApiPath + "/OpenAPI3/search/relword.json"
			});
			this.openApiRelSearchParam = [];
			this.openApiRelSearchParam.push(searchword);
		},
		allMakeLists : function(){
			$searchList.openApiSOP.makeLists();
			$searchList.serviceApiThematic.makeLists();
			$searchList.serviceApiStatsMeCatalog.makeLists();
		},
		getKeyword : function(){
			var arrayKey = $searchList.sKeyword.split(" ");
			if (arrayKey.length < 2) {
				return $searchList.sKeyword;
			} else {
				return $searchList.searchKeyword;
			}
		},
		//인터렉티브맵 검색결과
		openApiSOP:{
			page : 1,
			pageSize : 5,
			makeLists : function(){
				var obj = new sop.openApi.sopsearch.api();
				obj.addParam("accessToken", accessToken);
				obj.addParam("searchword", encodeURIComponent(encodeURIComponent($searchList.getKeyword())));
				obj.addParam("pagenum", this.page-1);
				obj.request({
					method: "GET",
					async: true,
					url: openApiPath + "/OpenAPI3/search/sop.json"
				});
			}
		},
		// ServiceAPI 통계주제도 검색
		serviceApiThematic:{
			page : 1,
			pageSize : 5,
			makeLists : function(searchword){
				var obj = new sop.openApi.thematicsearch.api();
				obj.addParam("title", encodeURIComponent($searchList.getKeyword()));
				obj.addParam("resultCnt", this.pageSize);
				obj.addParam("p", parseInt(this.page)-1);
				obj.request({
					method: "POST",
					async: true,
					url: sgisContextPath + "/ServiceAPI/thematicMap/GetThematicMapList.json"
				});
			}
		},
		
		// ServiceAPI My통계로 카탈로그 검색
		serviceApiStatsMeCatalog:{
			page : 1,
			pageSize : 5,
			makeLists : function(searchword){
				var obj = new sop.openApi.statsMeCatalogSearch.api();
				obj.addParam("searchword", encodeURIComponent($searchList.getKeyword()));
				obj.addParam("resultCnt", 5);
				obj.addParam("pagenum", parseInt(this.page)-1);
				obj.request({
					method: "POST",
					async: true,
					url: sgisContextPath + "/ServiceAPI/statsMe/map/getPotalStatsMeCatalogList.json"
				});
			}
		},
		
		///////////////////////////
		/**
		 * @name        : getList
		 * @description : 리스트
		 * @date        : 2016. 03. 21. 
		 * @author      : 나광흠
		 * @history     :
		 * @param type  : 타입
		 */
		getList : function(page, search){
			var type = "all";
			var obj = new sop.openApi.communityList.api();
			obj.addParam("bnd_year", "2016");
			obj.addParam("page", page);
			obj.addParam("from_ce", "C");
			if(search){
				obj.addParam("keywords", search);
			}
			obj.addParam("pageSize",5);
			obj.addParam("type", type);
			obj.request({
				method: "POST",
				async: false,
				url: contextPath + "/communityList.json",
				options:{
					type : type
				}
			});
		},
		
		getCmmntyList:{
			page : 1,
			pageSize : 5,
			makeLists : function(searchword){
				$searchList.getList($searchList.getCmmntyList.page, $searchList.getKeyword());
			}
		},
		
		
		
		/////////////////////
		
	};
	/*********** OpenAPI 연관검색어 검색 Start **********/
	(function() {
		$class("sop.openApi.relsearch.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				if (res.errCd == "0") {
					var result = res.result;
					if(result.length > 0){
						$("#related-word-div").show();
						// 연관검색어 건수
						var relatedWordHtml = "";
						relatedWordHtml += "<h5>연관검색어</h5><span>("+result.length+"건)";
						$("#related-word-cnt").html(relatedWordHtml);
						$("#related-word").empty();
						for (var i = 0; i < (result.length > 4 ? 4 : result.length); i++) {
							$("#related-word").append(
								$("<tr/>").append(
									$("<td/>").append(
										$("<a/>", {
											href: contextPath+"/m2020/map/search.sgis?keywords=" + result[i].rel_search_word,
											text: result[i].rel_search_word,
											onclick:  "javascript:srvLogWrite('O0', '52', '04', '03', '연관검색어||"+result[i].rel_search_word+"', '');"
										})
									)
								)
							);
						}						
					}
				} else if (res.errCd == "-401") {
					accessTokenInfo(function(){
						$searchList.openApiRelSearch($searchList.openApiRelSearchParam[0])
					});
				} else if (res.errCd == -100) {
					setTimeout($searchList.checkRequestEmptyCnt(), 300);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** OpenAPI 연관검색어 검색 End **********/
	/*********** OpenAPI SOP 검색 Start **********/
	(function() {
		$class("sop.openApi.sopsearch.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				var tableName = "sopListTable";
				//$("#" + tableName).empty();
				if (res.errCd == "0") {
					var result = res.result;
					if (result.totalcount > 0) {						
						$("#sopListTableDiv").show();						
						// 대화형 통계지도 검색결과
						var sopListTableCntHtml = "";
						sopListTableCntHtml += "<h5>내 주변 통계 검색결과</h5><span>("+result.totalcount+"건)";
						$("#sopListTableCnt").html(sopListTableCntHtml);
						
						$.each(result.resultdata, function(cnt,node) {
							var url = node.url.substring(0,node.url.indexOf("?"));
							var type = {
								totalindex:"0301",
								population:"0302",
								company:"0304",
								household:"0305",
								house:"0306",
								farmhousehold:"0307",
								forestryhousehold:"0308",
								fisheryhousehold:"0309",
								householdmember:"0310",
								kosis:"kosis"
							};
							
							var typeParameter = "type=API_"+type[url.substring(url.lastIndexOf("/")+1,url.length)]+"&";
							$("#" + tableName).append(
								$("<tr/>").append(
									$("<td/>").append(
										$("<a/>", {
											html: node.nm
										}).click(function(){
											srvLogWrite('O0', '52', '04', '03', '내 주변 통계||'+node.nm+'', '');
											if(type[url.substring(url.lastIndexOf("/")+1,url.length)]=="kosis"){
												common_alert("kosis데이터는 모바일에서 조회할 수 없습니다");
											}else{
												//$searchList.openApiReverseGeoCode("sop", "/map/interactive.sgis?"+typeParameter+node.url.substring(node.url.indexOf("?")+1),node.nm);
												$searchList.openApiReverseGeoCode("sop", "/m2020/map/current/currentMap.sgis?"+typeParameter+node.url.substring(node.url.indexOf("?")+1),node.nm);
												
											}
											return false;
										})
									)
								)
							);
						});
						if(result.totalcount > 5){
							if($("#sopListTable tbody tr").length == result.totalcount){
								$("#sopListTableMoreBtn").hide();
							} else {								
								$("#sopListTableMoreBtn").show();
								morePaging("#sopListTableMoreBtn", result.totalcount, $searchList.openApiSOP, "page");								
							}
						}
					}
				} else if (res.errCd == "-401") {
					accessTokenInfo(function(){
						$searchList.openApiSOP.makeLists();
					});
				} else if (res.errCd == "-100") {
					setTimeout($searchList.checkRequestEmptyCnt(), 300);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** OpenAPI SOP 검색 End **********/
	/*********** ServiceAPI 통계주제도 검색 Start **********/
	(function() {
		$class("sop.openApi.thematicsearch.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				var tableName = "themeListTable";
				if (res.errCd == "0") {
					//통계주제도
					if (res.result.themeMapInfoListCount > 0) {
						$("#themeListTableDiv").show();						
						// 통계주제도 검색결과
						var themeListTableCntHtml = "";
						themeListTableCntHtml += "<h5>통계주제도 검색결과</h5><span>("+res.result.themeMapInfoListCount+"건)";
						$("#themeListTableCnt").html(themeListTableCntHtml);
						
						$.each(res.result.themeMapInfoList, function(cnt,node) {
							$("#" + tableName).append(
								$("<tr/>").append(
									$("<td/>").append(
										$("<a/>", {
											href: contextPath+"/m2020/map/thematic/thematicMap.sgis?category="+node.category+"&id="+node.stat_thema_map_id,
											html: node.title,
											onclick:  "javascript:srvLogWrite('O0', '52', '04', '03', '통계주제도||"+node.title+"', '');"
										})
									)
								)
							);
						});
						if(res.result.themeMapInfoListCount > 5){
							if($("#themeListTable tbody tr").length == res.result.themeMapInfoListCount){
								$("#themeListTableMoreBtn").hide();
							} else {								
								$("#themeListTableMoreBtn").show();
								morePaging("#themeListTableMoreBtn", res.result.themeMapInfoListCount, $searchList.serviceApiThematic, "page");								
							}							
						}
					} else {
						setTimeout($searchList.checkRequestEmptyCnt(), 300);
					}
				} else if (res.errCd == "-100") {
					setTimeout($searchList.checkRequestEmptyCnt(), 300);
				}
			},
			onFail: function(status) {}
		});
	}());
	/*********** ServiceAPI 통계주제도 검색 End **********/
	/*********** OpenAPI 지오코딩 검색 Start **********/
	(function() {
		$class("sop.openApi.geocode.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				if (res.errCd == "0") {
					var result = res.result;
					for (var i = 0; i < result.resultdata.length; i++) {
						var dongCd = "";
						if (result.resultdata[i].addr_type == "1") { //시도
							dongCd = "00";
						} else if (result.resultdata[i].addr_type == "2") { //시군구
							dongCd = "00000";
						} else {
							dongCd = "0000000"; //읍면동
						}

						var arrayKey = $searchList.sKeyword.split(" ");
						if (arrayKey.length < 2) {
							$searchList.addressAdmCd = "";
							$searchList.x = "962202";
							$searchList.y = "1839421";
						} else {
							$searchList.addressAdmCd = dongCd;
							$searchList.x = result.resultdata[i].x;
							$searchList.y = result.resultdata[i].y;
						}

						break;
					}
				} else if (res.errCd == "-401") {
					accessTokenInfo(function(){
						$searchList.openApiGeocode($searchList.openApiGeocodeParam[0])
					});
				} else if (res.errCd == "-100") {
					$searchList.addressAdmCd = "";
					$searchList.x = "962202";
					$searchList.y = "1839421";
				}

				$searchList.allMakeLists();
			},
			onFail: function(status) {
				$searchList.allMakeLists();
			}
		});
	}());
	/*********** OpenAPI 지오코딩 검색 End **********/

	/** ********* OpenAPI 리버스지오코딩 Start ********* */
	(function() {
		$class("sop.openApi.ReverseGeoCodeSearch.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				var that = options.target;
				if (res.errCd == "0") {
					var result = res.result[0];
					if ($searchList.addressAdmCd != "") {
						if (options.division == "sop") { //SOP
							if(hasText($searchList.addressAdmCd)){
								if ($searchList.addressAdmCd.length == 2) {
									$searchList.addressAdmCd = result.sido_cd;
								} else if ($searchList.addressAdmCd.length == 5) {
									$searchList.addressAdmCd = result.sido_cd + result.sgg_cd;
								} else if ($searchList.addressAdmCd.length == 7) {
									$searchList.addressAdmCd = result.sido_cd + result.sgg_cd + result.emdong_cd;
								} else {
									$searchList.addressAdmCd = "00";
								}
							}else{
								$searchList.addressAdmCd = "00";
							}
						} else { //KOSIS
							common_alert("모바일에선 kosis데이터를 조회할 수 없습니다");
							return;
						}
					}
					window.location.href = contextPath+options.url +
						"&adm_cd=" + $searchList.addressAdmCd +
						"&x=" + $searchList.x +
						"&y=" + $searchList.y +
						"&title=" + options.title;

				} else if (res.errCd == "-401") {
					accessTokenInfo(function(){
						that.openApiReverseGeoCode(options.division, options.url, options.title)
					});
				} else {
					window.location.href = options.url +
						"&adm_cd=" + $searchList.addressAdmCd +
						"&x=" + $searchList.x +
						"&y=" + $searchList.y +
						"&title=" + options.title;
				}
			},
			onFail: function(status) {}
		});
	}());
	/** ********* OpenAPI 리버스지오코딩. End ********* */
	
	
	/*********** 소통지도 리스트 시작 **********/
	(function() {
		$class("sop.openApi.communityList.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				var tableName = "communityTable";
				//$("#" + tableName).empty();
				if(res.errCd == "0") {
					if(res.result.total != 0){
						$("#communityTableDiv").show();
						// 지역현안 소통지도 검색결과
						var communityTableCntHtml = "";
						communityTableCntHtml += "<h5>지역현안 소통지도</h5><span>("+res.result.total+"건)";
						$("#communityTableCnt").html(communityTableCntHtml);
						
						$.each(res.result.list,function(cnt,node){
							$("#" + tableName).append(
								$("<tr/>").append(
									$("<td/>").append(
										$("<a/>", {
											html: node.cmmnty_map_nm,
										}).click(function(){
											apiLogWrite2("K1",node.cmmnty_map_id,node.cmmnty_map_nm,"없음","00","없음");
											location.href = "javascript:srvLogWrite('O0', '52', '04', '03', '지역현안소통지도||"+node.cmmnty_map_nm+"', '');"+contextPath+"/m2020/map/community/map/communityMap.sgis?id="+node.cmmnty_map_id;
										})
									)
								)
							);
						});
					}
					
					if(res.result.total !=0){
						if(res.result.total > 5){
							if($("#communityTable tbody tr").length == res.result.total){
								$("#communityTableMoreBtn").hide();
							} else {								
								$("#communityTableMoreBtn").show();
								morePaging("#communityTableMoreBtn", res.result.total, $searchList.getCmmntyList, "page");								
							}
						}
					}else{
						setTimeout($searchList.checkRequestEmptyCnt(), 300);
					}
				}else{
					common_alert(res.errMsg);
				}
			},
			onFail: function(status) {
				common_alert(errorMessage);
			}
		});
	}());
	/*********** 소통지도 리스트 종료 **********/
	
	/*********** ServiceAPI My통계로 카탈로그 검색 START **********/
	(function() {
	    $class("sop.openApi.statsMeCatalogSearch.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	var tableName = "statsMeCatalogListTable";
				if (res.errCd == "0") {
					// My통계로
					if (res.result.statsMeCatalogCount > 0) {
						$("#statsMeCatalogListTableDiv").show();						
						// 통계주제도 검색결과
						var statsMeCatalogListTableCntHtml = "";
						statsMeCatalogListTableCntHtml += "<h5>My통계로(路) 검색결과</h5><span>("+res.result.statsMeCatalogCount+"건)";	// 2020.09.08[한광희] My통계로 한문 추가
						$("#statsMeCatalogListTableCnt").html(statsMeCatalogListTableCntHtml);
						
						$.each(res.result.statsMeCatalogList, function(cnt,node) {
							$("#" + tableName).append(
								$("<tr/>").append(
									$("<td/>").append(
										$("<a/>", {
											href: contextPath+"/m2020/map/statsMe/statsMeMap.sgis?stat_data_id="+node.stat_data_id+"&stat_data_srv_nm="+node.stat_data_srv_nm,
											html: node.stat_data_srv_nm,
											onclick:  "javascript:srvLogWrite('O0', '52', '04', '03', 'My통계로||"+node.stat_data_srv_nm+"', '');"
										})
									)
								)
							);
						});
						if(res.result.statsMeCatalogCount > 5){
							if($("#statsMeCatalogListTable tbody tr").length == res.result.statsMeCatalogCount){
								$("#statsMeCatalogListTableMoreBtn").hide();
							} else {								
								$("#statsMeCatalogListTableMoreBtn").show();
								morePaging("#statsMeCatalogListTableMoreBtn", res.result.statsMeCatalogCount, $searchList.serviceApiStatsMeCatalog, "page");								
							}
						}
					} else {
						setTimeout($searchList.checkRequestEmptyCnt(), 300);
					}
				} else if (res.errCd == "-100") {
					setTimeout($searchList.checkRequestEmptyCnt(), 300);
				}
	        },
	        onFail : function(status) {
	        	common_alert(errorMessage);
	        }
	    });
	}());
	/*********** ServiceAPI My통계로 카탈로그 검색 END **********/
	
	
	
	
}(window, document));

//통계용어 설명
function workSearch(searchKwd){
	var word = decodeURIComponent(searchKwd);
	var word_idx = word.indexOf("=")+1;
	var post_title = word.substr(word_idx);
	var elementList = $("<tr/>", {});
		$.ajax({
			type : "POST",
			data : {"post_title" : post_title},
			url: sgisContextPath + "/ServiceAPI/board/boardLists_Word.json",
			success:function(data){
				console.log(data);
				var wordListLength = 0;
				var resultData = data.result;
				$.each(resultData.post_title_list,function(i){
					var ptitle_word_ex = resultData.post_title_list[i].post_content;
					var ptitle_word = resultData.post_title_list[i].post_title;
					var ptitle_word_start_idx = ptitle_word.indexOf("[");
					var ptitle_word_end_idx;
					var ptitle_word_kr;
					var ptitle_word_en;
					if(ptitle_word_start_idx >= 0 ){
						ptitle_word_end_idx = ptitle_word.indexOf("]")-ptitle_word_start_idx-1;
						ptitle_word_kr = ptitle_word.substr(0,ptitle_word_start_idx).trim();
						ptitle_word_en = ptitle_word.substr(ptitle_word_start_idx+1,ptitle_word_end_idx).trim();
					}else{
						ptitle_word_start_idx = ptitle_word.length;
						ptitle_word_kr = ptitle_word.substr(0,ptitle_word_start_idx).trim();
						ptitle_word_en = "";
					} 
					
					if(post_title == ptitle_word_kr){
						wordListLength++;
						
						$(elementList).append(
							$("<td/>").append(
								$("<a/>", {
									html: ptitle_word + "<br />" + ptitle_word_ex
								})
							)
						);
					}
				});
				
				if(wordListLength > 0){
					$("#wordTableDiv").show();
					// 통계용어 설명 검색결과
					var wordTableCntHtml = "";
					wordTableCntHtml += "<h5>통계용어 설명</h5><span>("+wordListLength+"건)";
					$("#wordTableCnt").html(wordTableCntHtml);
					$("#wordTable").append(elementList);
					
				}else{
					setTimeout($searchList.checkRequestEmptyCnt(), 300);
				}
			},
			error:function(error){
	//				alert("에러"); 
			}
	});
}
