(function(W, D) {
	W.$thematic = W.$thematic || {};
	$(document).ready(function(){
		accessTokenInfo();
		$thematic.event.setUIEvent();
		$("#barchart-area").hide(); 
		$("#listTitleArea").html("인구와 가구");
		
		srvLogWrite("M0","04", "01", "01", "", "");
		
		
		$(".menuListToggle1").click(function(){ 
			//	mapAreaToggle();
				if($(".itemArea1").css("display")=="block"){
					$(".itemArea1").hide();
					
				}else{
					$(".itemArea1").show();
				}
			})
			$(".statList").click(function(){ 
				$thematic.event.showItemBox();
				if($(this).hasClass("CTGR_001")){
				srvLogWrite("M0","04", "01", "01", "", "");
					$("#listTitleArea").html("인구와 가구");
					$("#CTGR_001").trigger("click");
				$thematic.ui.serviceGb = "CTGR_001";
			}else if($(this).hasClass("CTGR_002")){
				
				srvLogWrite("M0","04", "01", "02", "", "");
				
				$("#listTitleArea").html("주거와 교통");
				$("#CTGR_002").trigger("click");
				$thematic.ui.serviceGb = "CTGR_002";
			}else if($(this).hasClass("CTGR_003")){
				
				srvLogWrite("M0","04", "01", "03", "", "");
				
				$("#listTitleArea").html("복지와 문화");
				$("#CTGR_003").trigger("click");
				$thematic.ui.serviceGb = "CTGR_003";
			}else if($(this).hasClass("CTGR_004")){
				
				srvLogWrite("M0","04", "01", "04", "", "");
				
				$("#listTitleArea").html("노동과 경제");
				$("#CTGR_004").trigger("click");
				$thematic.ui.serviceGb = "CTGR_004";
			}else if($(this).hasClass("CTGR_005")){
				
				srvLogWrite("M0","04", "01", "05", "", "");
				
				$("#listTitleArea").html("건강과 안전");
				$("#CTGR_005").trigger("click");
				$thematic.ui.serviceGb = "CTGR_005";
			}else if($(this).hasClass("CTGR_006")){
				
				srvLogWrite("M0","04", "01", "06", "", "");
				
				$("#listTitleArea").html("환경과 기후");
				$("#CTGR_006").trigger("click");
				$thematic.ui.serviceGb = "CTGR_006";
			}
			$(".itemArea1").hide();
			$(".itemArea2").hide();
		})
		$(".menuListToggle2").click(function(){ 
			//	mapAreaToggle();
			if($(".itemArea2").css("display")=="block"){
				$(".itemArea2").hide();
			}else{
				$(".itemArea2").show();
			}
		})
		$("#chartTableArea").click(function(){ 
			$("#chart-area-button").trigger("click");
			//$("#barchart-area").css({position:"absolute"}); 
		//	$(".menuListToggle1").hide();
		//	$("#chartTableArea").hide();
			$("#barchart-area").show();
			$("#barchart-area").css({position:"relative"}); 
			
			
		})
		$(".chartAreaCloseBtn").click(function(){ 
			$("#map-area-button").trigger("click");
			$(".menuListToggle1").show();
			$("#chartTableArea").show();
			$("#barchart-area").hide(); 
			
		});
		
		$("#sidoSelect").change(function(){
			getAddress($(this).val(), "sggSelect");
		});
		$("#sggSelect").change(function(){
			
			getAddress($("#sidoSelect").val()+$(this).val(), "emdSelect");
		});
		
		
		getAddress2();
		
		console.log("[mobile thematic.js] getParameter(\"ref_adm_id\") [" + getParameter("ref_adm_id"));
		var map = new sMap.map();
		if(getParameter("ref_adm_id")==null && getParameter("ref_adm_id") == undefined){
			map.openApiReverseGeoCode2(map.getCurrentLocation());
		}
		if(getParameter("serviceGb")==null && getParameter("serviceGb") == undefined){
		}else{
			
			if(getParameter("serviceGb")=="CTGR_001"){
				$("#listTitleArea").html("인구와 가구");
				$("#CTGR_001").trigger("click");
				$thematic.ui.serviceGb = "CTGR_001";
			}else if(getParameter("serviceGb")=="CTGR_002"){
				$("#listTitleArea").html("주거와 교통");
				$("#CTGR_002").trigger("click");
				$thematic.ui.serviceGb = "CTGR_002";
			}else if(getParameter("serviceGb")=="CTGR_003"){
				$("#listTitleArea").html("복지와 문화");
				$("#CTGR_003").trigger("click");
				$thematic.ui.serviceGb = "CTGR_003";
			}else if(getParameter("serviceGb")=="CTGR_004"){
				$("#listTitleArea").html("노동과 경제");
				$("#CTGR_004").trigger("click");
			}else if(getParameter("serviceGb")=="CTGR_005"){
				$("#listTitleArea").html("건강과 안전");
				$("#CTGR_005").trigger("click");
			}else if(getParameter("serviceGb")=="CTGR_006"){
				$("#listTitleArea").html("환경과 기후");
				$("#CTGR_006").trigger("click");
			}
		}
		
	});
	
	
	function getAddress(sido_cd, objId){
		
		console.log("[mobile thematic.js] getAddress(sido_cd, objId)");
		
		var sggCd = null;
		$("#" + objId).html("");
		
			$.ajax({
				method: "GET",
				async: false,
				url: openApiPath + "/OpenAPI3/addr/stage.json",
				data: {
					accessToken:accessToken,
					cd: sido_cd,
					pg_yn: "0"
				},
				dataType: "json",
				success: function(res) {
					if(res.errCd=="0"&&res.result.length>0){
						for(var i=0; i<res.result.length; i++){
							var addr_name = res.result[i].addr_name;
							var cd = res.result[i].cd;
							
							if(objId == "sggSelect"){
								cd = cd.substring(2,5);
							}else if(objId = "emdSelect"){
								cd = cd.substring(5,7);
							} 
							
							var x_coor = res.result[i].x_coor;
							var y_coor = res.result[i].y_coor;
							
							var str="<option value="+ cd + " data-x=" + x_coor + " data-y=" + x_coor   +">" + addr_name + "</option>";
							/*
							<option value="00" data-x="990480.875" data-y="1815839.375">전국</option>
							 */
							$("#" + objId).append(str);
						}
					}
				},
				error: function(e) {}
			});
	}
	var paramSidoCd;
	var paramSggCd;
	var paramEmdCd;
	function getAddress2(){
		
		console.log("[mobile thematic.js] getAddress2()");
		
			$.ajax({
				method: "GET",
				async: false,
				url: openApiPath + "/OpenAPI3/addr/stage.json",
				data: {
					accessToken:accessToken,
					pg_yn: "0"
				},
				dataType: "json",
				success: function(res) {
					if(res.errCd=="0"&&res.result.length>0){
						for(var i=0; i<res.result.length; i++){
							// 주소 할 차례
							
							var addr_name = res.result[i].addr_name;
							var cd = res.result[i].cd;
							
							var x_coor = res.result[i].x_coor;
							var y_coor = res.result[i].y_coor;
							
							var str="<option value="+ cd + " data-x=" + x_coor + " data-y=" + x_coor   +">" + addr_name + "</option>";
								/*
								<option value="00" data-x="990480.875" data-y="1815839.375">전국</option>
								*/
							$("#sidoSelect").append(str);
						}
					}

					
					if(getParameter("ref_adm_id")!=null && getParameter("ref_adm_id") != ""){
						
						paramSidoCd = getParameter("ref_adm_id").substring(0, 2);
						paramSggCd = getParameter("ref_adm_id").substring(2, 5);
						paramEmdCd = getParameter("ref_adm_id").substring(5, 7);
						$("#sidoSelect").val(paramSidoCd).prop("selected", true);
						getAddress3(paramSidoCd, "sggSelect");
					}
				},
				error: function(e) {}
			});
	}
	function getAddress3(sido_cd, objId){
		
		console.log("[mobile thematic.js] getAddress3(sido_cd, objId)");
		
		var sggCd = null;
			$.ajax({
				method: "GET",
				async: false,
				url: openApiPath + "/OpenAPI3/addr/stage.json",
				data: {
					accessToken:accessToken,
					cd: sido_cd,
					pg_yn: "0"
				},
				dataType: "json",
				success: function(res) {
					if(res.errCd=="0"&&res.result.length>0){
						for(var i=0; i<res.result.length; i++){
							var addr_name = res.result[i].addr_name;
							var cd = res.result[i].cd;
							
							if(objId == "sggSelect"){
								cd = cd.substring(2,5);
							}else if(objId = "emdSelect"){
								cd = cd.substring(5,7);
							} 
							
							var x_coor = res.result[i].x_coor;
							var y_coor = res.result[i].y_coor;
							
							var str="<option value="+ cd + " data-x=" + x_coor + " data-y=" + x_coor   +">" + addr_name + "</option>";
							/*
							<option value="00" data-x="990480.875" data-y="1815839.375">전국</option>
							 */
							$("#" + objId).append(str);
						}
						if(objId == "sggSelect"){
							$("#" + objId).val(paramSggCd).prop("selected", true);
							getAddress3(paramSidoCd + paramSggCd, "emdSelect");
						}
						
						if(objId == "emdSelect"){
							$("#" + objId).val(paramEmdCd).prop("selected", true);
						}
					}
				},
				error: function(e) {}
			});
	}
	
	
	
	
	
	
	$thematic.ui = {
		serviceGb : "CTGR_001",	//서비스 구분 
		data : null,//데이터
		parameter : null,//파라미터
		option : null,//옵션
		/**
		 * @name           : createMapSettingBox
		 * @description    : 지도 변경해주는 옵션들의 박스 생성
		 * @date           : 2016. 03. 22. 
		 * @author	       : 나광흠
		 * @history        :
		 * @param delegate : delegate
		 * @param map      : 지도
		 */
		createMapSettingBox : function(delegate,map){
			var hasLeft = thematicInfo.leftSepNm !=null && thematicInfo.leftSepUnit !=null && thematicInfo.leftSepNm.length > 0 && thematicInfo.leftSepUnit.length > 0; 
			var hasRight = thematicInfo.rightSepNm !=null && thematicInfo.rightSepUnit!=null && thematicInfo.rightSepNm.length > 0 && thematicInfo.rightSepUnit.length > 0;
			if(thematicInfo.themaMapType=="04"){
				thematicInfo.rightSepNm = "수";
				thematicInfo.rightSepChartTitle = thematicInfo.leftSepChartTitle;
				
				
				var unitRegexp = thematicInfo.leftSepChartTitle.match(/\((.+)\)/);
				if(unitRegexp&&unitRegexp.length>1){
					thematicInfo.rightSepUnit = unitRegexp[1];
				}
				hasRight = true;
			}
			if(thematicInfo.yearList&&thematicInfo.yearList.length>0){
				var year = $("<select/>",{"class":"original"}).change(function(){
					if(thematicInfo.bordFixYn=="N"){
						delegate.map.bnd_year = $(this).val();
					}
					delegate.search(map);
				});
				var yearList = $("<li/>",{"id":"base_year_"+map.id,"class":"sgis","style":thematicInfo.themaMapType=="05"?"":"display:none;"}).append($("<span/>",{"text":"년도선택"}),year);
				$.each(thematicInfo.yearList,function(cnt,node){
					var selected = thematicInfo.statDataBaseYear==node;
					if(thematicInfo.bordFixYn=="N"&&selected){
						map.bnd_year = node;
					}
					year.append($("<option/>",{"selected":selected,"value":node,"text":node}));
				});
				map.mapControlButton.addChildren(yearList);
			}
			var statButton = $("<li/>",{"id":"stat_sel_"+map.id,"class":"sgis","style":(hasLeft&&hasRight?"":"display:none;")}).append($("<span/>",{"text":"통계 선택"}));
			function createLeft(){
				if (hasLeft){
					var optionArrary = [];
					if(thematicInfo.leftSepUnit){
						optionArrary.push(thematicInfo.leftSepUnit);
					}
					if(thematicInfo.sepMapLeftSepUnit){
						optionArrary.push(thematicInfo.sepMapLeftSepUnit);
					}
					statButton.append($("<a/>",{"href":"#","class":"on","data-id":"left","text":thematicInfo.leftSepNm+(optionArrary.length>0?"("+optionArrary.join()+")":"")}).click(function(){
						
						srvLogWrite("M0","04", "03", "03", thematicInfo.leftSepNm, "");
						
						$(this).parent().find("a").removeClass("on");
						$(this).addClass("on");
						if(thematicInfo.themaMapType=="05"){
							$("#base_year_"+map.id).show();
						}else{
							$("#base_year_"+map.id).hide();
						}
						delegate.changeItem(map);
					}));
				}
			}
			function createRight(){
				if (hasRight){
					var optionArrary = [];
					if(thematicInfo.rightSepUnit){
						optionArrary.push(thematicInfo.rightSepUnit);
					}
					if(thematicInfo.sepMapRightSepUnit){
						optionArrary.push(thematicInfo.sepMapRightSepUnit);
					}
					statButton.append($("<a/>",{"href":"#","class":(!hasLeft?"on":""),"data-id":"right","data-type":thematicInfo.themaMapType=="04"?"number":"","text":thematicInfo.rightSepNm+(optionArrary.length>0?"("+optionArrary.join()+")":"")}).click(function(){
						srvLogWrite("M0","04", "03", "03", thematicInfo.rightSepNm, "");
						$(this).parent().find("a").removeClass("on");
						$(this).addClass("on");
						if(/04|05/.test(thematicInfo.themaMapType)){
							$("#base_year_"+map.id).show();
						}else{
							$("#base_year_"+map.id).hide();
						}
						delegate.changeItem(map);
					}));
				}
			}
			if(thematicInfo.themaMapType=="04"){
				createRight();
				createLeft();
			}else{
				createLeft();
				createRight();
				if(thematicInfo.themaMapType=="05"&&thematicInfo.addDataDispYn==="Y"){
					$(map.mapControlButton._div).children(".box").width("310px")
					statButton.append($("<a/>",{"href":"#","data-id":"left","data-type":"pc","text":thematicInfo.sepMapLeftSepNm+(hasText(thematicInfo.sepMapLeftSepUnit)?"("+thematicInfo.sepMapLeftSepUnit+")":"")}).click(function(){
						$(this).parent().find("a").removeClass("on");
						$(this).addClass("on");
						$("#base_year_"+map.id).hide();
						delegate.changeItem(map);
					}));
				}
			}
			map.mapControlButton.addChildren(statButton);
		},
		/**
		 * @name           : setInitZoom
		 * @description    : 최대,최소 줌 레벨 지정
		 * @date           : 2016. 03. 22. 
		 * @author	       : 나광흠
		 * @history        :
		 * @param map      : 지도
		 */
		setInitZoom : function(map){
			if(thematicInfo.maxExpnsnLevel=="01"){
				map.gMap.setMaxZoom(3);
			}else if(thematicInfo.maxExpnsnLevel=="02"){
				map.gMap.setMaxZoom(5);
			}else if(thematicInfo.maxExpnsnLevel=="03"){
				if(thematicInfo.poiDispYn==="Y"){
					map.gMap.setMaxZoom(11);
				}else{
					map.gMap.setMaxZoom(8);
				}
			}else if(thematicInfo.maxExpnsnLevel=="04"){
				map.gMap.setMaxZoom(11);
			}
			if(thematicInfo.themaMapType=="07"){
				if(thematicInfo.minRedctnLevel == "01"){
					map.gMap.setMinZoom(3);
				}else if(thematicInfo.minRedctnLevel == "02"){
					map.gMap.setMinZoom(5);
				}else if(thematicInfo.minRedctnLevel == "03"){
					map.gMap.setMinZoom(8);
				}else if(thematicInfo.minRedctnLevel == "04"){
					map.gMap.setMinZoom(10);
				}
			}
		},
		
		/**
		 * @name                      : getData
		 * @description               : 데이터 얻기
		 * @date                      : 2016. 03. 22. 
		 * @author	                  : 나광흠
		 * @history                   :
		 * @param map                 : 지도객체
		 * @param adm_cd              : 행정동 코드
		 * @param thema_map_data_id   : 테마 아이디
		 * @param stat_data_base_year : 통계 검색 년도
		 * @param callback            : callback
		 */
		getData : function(map,adm_cd,thema_map_data_id,stat_data_base_year,callback){
			
			var url = sgisContextPath+"/ServiceAPI/thematicMap/GetThemaMapData.json";
			var data = {
				adm_cd:adm_cd,
				thema_map_data_id:thema_map_data_id,
				stat_data_base_year:stat_data_base_year,
				area_type : "auto"	
			};
			if(thematicInfo.themaMapType=="04"&&$("#stat_sel_"+map.id+">a.on").data("id")=="right"){
				url = sgisContextPath+"/ServiceAPI/thematicMap/getThemaMapDataForChart.json"
				data.data_year = data.stat_data_base_year;
				delete data.stat_data_base_year;
			}
			$.ajax({
				type: "GET",
				url: url,
				data:data,
				dataType: "json",
				async : false,
				success: function(res) {
					if(res.errCd=="0"){
						if(typeof callback === "function"){
							callback(res);
						}
					}else if(res.errCd=="-100"){
						common_alert("데이터가 존재하지 않습니다");
					}else{
						common_alert(res.errMsg);
					}
				},
				error: function(xhr, status, errorThrown) {
					common_alert(errorMessage);
				}
			});
		}
	};
	$thematic.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 03. 22. 
		 * @author	     : 나광흠
		 * @history      :
		 * @param
		 */
		setUIEvent: function() {
			if(W.thematicInfo){
				setMaptitle($("#map-title>h3"),thematicInfo.title);
				$("#chartTitleArea").html(thematicInfo.title);
			}
			$("#title_sort").change(function(){
				var checked = $(this).is(":checked");
				
				srvLogWrite("M0","04", "01", "07", "", "");
				
				$(".Open_Type1 ul[id^=LIST_CTGR_]").each(function(cnt,node){
					var element = [];
					$.each($(node).children("li"),function(c,n){
						element.push({
							node : n,
							title : $(n).data("title"),
							order : $(n).data("order")
						});
					});
					element.sort(dynamicSort((checked?"title":"order")+"",false));
					$.each(element,function(){
						$(this.node).appendTo($(node));
					});
				});
			});
		},
		/**
		 * @name        : showItemBox
		 * @description : 통계주제도 리스트 열기
		 * @date        : 2016. 03. 22. 
		 * @author	    : 나광흠
		 * @history     :
		 */
		showItemBox : function(){
			$("#thematicSubmenu").show();
			$thematic.event.setItemBoxHeight();
			return false;
		},
		/**
		 * @name        : setItemBoxHeight
		 * @description : 통계주제도 리스트 박스 높이 변경
		 * @date        : 2016. 03. 22. 
		 * @author	    : 나광흠
		 * @history     :
		 */
		setItemBoxHeight : function(){
			var etcHeight = $("#thematicSubmenu>.Open_Type1>h3").outerHeight(true)+$("#thematicSubmenu>.Open_Type1>.Subject>nav").outerHeight(true);
			var windowHeight = $(window).height()-$("div.Header").outerHeight(true);
			var itemHeight = ($("#LIST_"+$(".Subject>nav>a.M_on").attr("id")).children().length*51)+etcHeight;
			$("#thematicSubmenu>.Open_Type1").height(Math.max(itemHeight,windowHeight));
			return false;
		}
	};
}(window, document));