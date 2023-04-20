/**
 * 
 */
(function (W, D) {
	W.$thematicMapMain = W.$thematicMapMain || {};
	
	$(document).ready(function () {
		if($("#themeticFrame").length == 0 ){
			var frame = document.createElement("iframe");
			$(frame).addClass("map_dummy").attr("frameborder","0").attr("src" , "").attr("id" , "themeticFrame").attr("title","themeticFrame").css({"width":"100%" , "position":"relatice"});
			$("header").after($(frame));
		}
		
		// thematicMap.html 파라미터 갖고오기
		//stat_thema_map_id=' + themeListObj[i].stat_thema_map_id + '&theme=' + themeListObj[i].category + '&mapType=' + themeListObj[i].thema_map_type & title = ""
		$thematicMapMain.param = getAllParameter();
		if ($thematicMapMain.param.stat_thema_map_id) {
			// StatthemamappLists 조회
			$thematicMapMain.request.getStatsThemeMapList($thematicMapMain.param, null, "normal"); // map
		}else if ($thematicMapMain.param.id) {
			$thematicMapMain.bookmarkId = $thematicMapMain.param.id;
		}
		
		// mng_s 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
		if ($thematicMapMain.param.CTGRS) {
			// "CTGR_001:recommend|CTGR_002:favorite|CTGR_003:alphabet|CTGR_004:recommend|CTGR_005:favorite"
			var tempArr = $thematicMapMain.param.CTGRS.split(",");
			for(var i = 0; i < tempArr.length; i++) {
				var key = tempArr[i].substring(0, tempArr[i].indexOf(":"));
				var val = tempArr[i].substring(tempArr[i].indexOf(":") + 1);
				$thematicMapMain.request.sortType[key] = val;
			}
		}
		// mng_e 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
		
		
		var widthSize = $(window).width();
		if (widthSize > 1260) {
			var value = parseInt(widthSize / 2 - 500);
			if (value < 0) {
				value = 0;
			}
			
			$("#mapNavi2").css("margin-left", value);
			
		}else{
			$("#mapNavi2").css("margin-left", '100px');
		}
		
		// map size
		var mapheight = $("body").height();
		var headheight = $("header").height();
		
		$(".map_dummy").css("height", mapheight-104 + "px");
		$("#header").css("margin-bottom", "0px");
		
		$(window).resize(function () {
			var widthSize = $(window).width();
			var heightSize = $(window).height();
			if (widthSize > 1260) {
				var value = parseInt(widthSize / 2 - 500);
				if (value < 0) {
					value = 0;
				}
				
				$("#mapNavi2").css("margin-left", value);
				
			}else{
				$("#mapNavi2").css("margin-left", '100px');
			}
			$(".map_dummy").css("height", heightSize-104 + "px");
		});	
	});
	
	$thematicMapMain.ui = {
			mainParams : null,
			
			/**
			 * 
			 * @name         : doAnalysisShareInfo
			 * @description  : 공유된 정보를 분석하여, 통계정보를 조회한다.
			 * @date         : 2015. 11. 16. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param key    : 공유ID
			 */
			doAnalysisShareInfo : function (type, data) {
				if (data.param_info) {
					data["param_info"] = JSON.parse(data.param_info);
					$thematicMapMain.data = data;
					$thematicMapMain.request.getStatsThemeMapList(data.param_info.paramInfo, null, "bookmark"); // map
				}
			}
	};
	
	$thematicMapMain.request = {
		// mng_s 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
		sortType : {CTGR_001 : "recommend"
					, CTGR_002 : "recommend"
					, CTGR_003 : "recommend"
					, CTGR_004 : "recommend"
					, CTGR_005 : "recommend"
					, CTGR_006 : "recommend"},
		// mng_e 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
						
		getStatsThemeMapList : function (paramObj, searchParam, type) {
			var requestParam = {
				stat_thema_map_id : paramObj.stat_thema_map_id
			};
			$thematicMapMain.param = paramObj;
			$thematicMapMain.param["type"] = type;
			
			//mng_s djlee 지자체 연계 20210430
			
			if(document.location.href.indexOf("type=full") > 0) {
				$thematicMapMain.param["screenType"] = 'full';
			}
			//mng_e
			$statsPotal.api.thematicMap.getStatsThemeMapListByThematicId({
				param : requestParam,
				method : 'POST',
				success : $thematicMapMain.response.successStatsThemeMapList
			});
		}
	};
	$thematicMapMain.response = {
		successStatsThemeMapList : function (status, res) {
			if (res.errCd === 0) {
				var themaInfo = res.result.themeMapInfoList;
				$thematicMapMain.themaInfo = themaInfo;
				
				// Frame URL 설정
				if ($thematicMapMain.param.mapType == '01') { 
					// 테마 주제도
//					$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame03" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id);
				} else if ($thematicMapMain.param.mapType == '02') {
					//1인가구 증가
					// 하기 조건절에 배열로 오는 이유를 모르겠음
//					if($thematicMapMain.param.stat_thema_map_id=="tpJ7rCwppD20141030095222504MzKtvExLrF"){
//						$("#themeticFrame").attr("src", "/view/thematicMap/others/singleFamily/singleFamily" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id);
//					}
					//예전 주제도 형식//&theme='+themeListObj[i].category+'&stat_thema_map_id='+themeListObj[i].stat_thema_map_id
//					$("#themeticFrame").attr("src", $thematicMapMain.param.stat_thema_map_file_url+"?stat_thema_map_id="+$thematicMapMain.param.stat_thema_map_id+"&theme="+$thematicMapMain.param.theme+"&mapType="+$thematicMapMain.param.mapType);
				} else if ($thematicMapMain.param.mapType == '03') {
					// 색상형
					if($thematicMapMain.param.screenType == 'full' ){
					// 시계열형
						$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame03" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType+ "&type=full");
					}
					else {
						$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame03" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType);
					}
					
				} else if ($thematicMapMain.param.mapType == '04') {
					// 증감형
					//mng_s djlee 지자체연계 20210430
					if($thematicMapMain.param.screenType == 'full' ){
						//$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame04" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType + "&type=full");
						if($thematicMapMain.param.areaCode != '' && $thematicMapMain.param.areaCode != null ){
							
							$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame04" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType + "&type=full&areaCode="+ $thematicMapMain.param.areaCode);
						}else {
							console.log("areaCode:::null:::"+$thematicMapMain.param.areaCode);
							$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame04" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType + "&type=full");
						}
					}else {
						if($thematicMapMain.param.areaCode != '' && $thematicMapMain.param.areaCode != null ){
							$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame04" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType + "&areaCode="+ $thematicMapMain.param.areaCode);
						}else {
							console.log("areaCode:::null:::"+$thematicMapMain.param.areaCode);
							$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame04" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType );
						}
					}
					//mng_e
				} else if ($thematicMapMain.param.mapType == '05') {
					
					if($thematicMapMain.param.screenType == 'full' ){
					// 시계열형
					$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame05" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType+ "&type=full");
					}
					else {
						$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame05" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType);
					}
				} else if ($thematicMapMain.param.mapType == '06') {
					if($thematicMapMain.param.screenType == 'full' ){
					// 시계열형
						$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame06" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType+ "&type=full");
					}
					else {
						$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame06" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType);
					}
				} else if ($thematicMapMain.param.mapType == '07') {
					// 분할형
					if($thematicMapMain.param.screenType == 'full' ){
					
						$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame07" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType+ "&type=full");
					}
					else {
						$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame07" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType);
					}
					
				}
				
				// mng_s 2020. 11. 30 j.h.Seok 통계주제도 통합
				else if ($thematicMapMain.param.mapType == '13') {
					// 색상형 (두 개의 주제도 통합)
					if($thematicMapMain.param.screenType == 'full' ){
						$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame13" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType+ "&type=full");
					}
					else {
						$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame13" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType);
					}
					
				} else if ($thematicMapMain.param.mapType == '15') {
					// 시계열형 (두 개의 주제도 통합)
					if($thematicMapMain.param.screenType == 'full' ){
						$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame15" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType+ "&type=full");
					}
					else {
						$("#themeticFrame").attr("src", "/view/thematicMap/thematicMapFrame15" + "?stat_thema_map_id=" + $thematicMapMain.param.stat_thema_map_id + "&theme=" + $thematicMapMain.param.thema + "&mapType=" + $thematicMapMain.param.mapType);
						
					}
					
				}
				// mng_e 2020. 11. 30 j.h.Seok 통계주제도 통합
			}
		}
	};
	
	/* window console.log 문제해결 */
	if (!window.console) {
		console = {
			log : function () {
			}
		};
	}
}(window, document));

function getSession(auth) {
	var timer = setInterval(function() {
		if ($("#themeticFrame").get(0).contentWindow.AuthInfo) {
			console.log($("#themeticFrame").get(0).contentWindow.AuthInfo);
			$("#themeticFrame").get(0).contentWindow.AuthInfo.authStatus = auth.authStatus;
			clearInterval(timer);
		}
	},200);
};
