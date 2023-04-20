/**
 * 통계주제도
 * 
 * 
 * 
 */

(function (W, D) {
	W.$thematicSearch01 = W.$thematicSearch01 || {};
	var pageSize=4;
//	var $thematicSearch01 = [];
	var categoryList = [];
	
	$(document).ready(function () {
		console.log(makeRandomThirtySevenDigitString ());
		//카테고리 정보를 가져온다.
		$thematicSearch01.request.getCategory();
//		$thematicSearch01.request.getCategoryList();
		
		//var url = statsPotalDomain + "/view/board/qnaAndRequest?type=thema&categoryCd=THEMRQ";
		var url = statsPotalDomain + "/view/board/qnaAndRequestThema";//방민정수정
		var tempHtml = "<div align='right' style='min-height:36px;'><a href=" + url + " style='color: #3c9cd7;' onclick=$javascript:srvLogWrite(\'B0\',\'01\',\'04\',\'00\',\'\',\'\');><img src='/img/tm/img_thematicUser.png' alt='요청하기' style='width:40px; height:33px; margin: 0px 0px -10px 0px;'/><b> 통계주제도 요청하기</a></b></div>";
		
		$('.thematicSubTitle').append(tempHtml);
		
		//서치 flag
		$thematicSearch01.isSearch = false;
		
		$("#excelBtn").click(function(){
    		srvLogWrite("B0","01","03","00","","");
			window.open('https://sgis.kostat.go.kr/upload/map/thematicMapList.xlsx');
		});
		
		$("#themeSearchBtn").click(function () {
    		srvLogWrite("B0","01","02","00","","");
			$(".board_area li,.board_area div").remove();
			$thematicSearch01.ui.isFirst = false;
			$thematicSearch01.isSearch = true;
			var searchText = $("#atc-kwd").val();
			var validation = $thematicSearch01.formatter.searchWordValidation(searchText);
			if (validation) {
				$(this).addClass("cOn");
				$thematicSearch01.search = {
					title : searchText,
				};
				$thematicSearch01.request.getCategoryList();
			}
			
		});
		
		//mousedown 마우스버튼 눌렀을때
		$("#atc-kwd").mousedown(function () {
			$(this).val("");
		});
		
		//text입력 후 엔터를 쳤을때
		$("#atc-kwd").bind("keydown", function (event) {
			//event.which는 키보드키 또는 마우스 이벤트를 나타낸다.
			if (event.which === 13) {
				$("#themeSearchBtn").click();
			}
		});	
		
		$thematicSearch01.formatter.createInfoTooltip(".theme_tooltip");
		
	}); //onload 끝
	
	$thematicSearch01.ui = {
			pageSize : pageSize,
			currendPageIndex : 0,
			calledType : "01",
			isFirst : true,
			
			pagenation : function (totalCnt, pageSize, currentPageNum, thema_map_category) {
				var resNum = totalCnt % pageSize ? 1 : 0;
				var showPageSize = parseInt(totalCnt / pageSize) + resNum;
				
				//ex) CTGR_001 이면 뒤의 두자리를 때서 pagenation 테그 넘버링을 한다.
				var num = thema_map_category.substring(6,8);				
				
				if(showPageSize < 2) {
					$('#list'+num+' .pages').hide();
				} else {
//					$('.pagenation'+num+' .pages').show();
					$('#list'+num+' .pages').show();
				}
				
//				$('.pagenation'+num+' .pages').paging({
					$('#list'+num+' .pages').paging({
					current : currentPageNum,
					max : showPageSize,
					itemClass : 'page',
					itemCurrent : 'current',
					format : '{0}',
					next : '&gt;',
					prev : '&lt;',
					first : '&lt;&lt;',
					last : '&gt;&gt;',
					onclick : function (e, page) { // 페이지 선택 시
						$thematicSearch01.ui.isFirst = false;
						$thematicSearch01.ui.currendPageIndex = page;
						$thematicSearch01.request.getCategoryList1(thema_map_category, page);
						
					}
				});
			},
			
			setThemaType : function(type) {
				$thematicSearch01.ui.calledType = type;
			}
		
		}; //$thematicSearch01.ui end
	
	
	//search에는 null 값 입력
	$thematicSearch01.search = {};
	
	$thematicSearch01.request = {
			
			// 초기 테마리스트 정보 
			getCategoryList : function () {
				var requestParam = {
				//초기값 = 4;
					resultCnt : pageSize,
					categoryList : JSON.stringify(categoryList)
					
				};
				
				if ($thematicSearch01.isSearch) {
					if (!sop.Util.isUndefined($thematicSearch01.search.title) && $thematicSearch01.search.title.length > 0) {
						//특수문자까지 encode한다. ex) "/" 이러면 서버에서는 인식을 하지 못한다. 
						requestParam.title = encodeURIComponent($thematicSearch01.search.title);
					}
				}
				
				$statsPotal.api.thematicMap.getStatsThemeMapList({
					param : requestParam,
					method : 'POST',
					success : $thematicSearch01.response.successThemaStatList
				});
			},
			
			// 해당 cate_id의 page의 리스트를 가져온다.
			getCategoryList1 : function (cate_id, p) {
				var requestParam = {
					cate_id : cate_id,
					resultCnt : pageSize,
				};
				
				if (p!= 0) {
					requestParam.p = p - 1;
				}
				else {
					requestParam.p = p;
				}
				
				if ($thematicSearch01.isSearch) {
					if (!sop.Util.isUndefined($thematicSearch01.search.title) && $thematicSearch01.search.title.length > 0) {
						requestParam.title = encodeURIComponent($thematicSearch01.search.title);
					}
				}
				
				$statsPotal.api.thematicMap.getStatsThemeMapList({
					param : requestParam,
					method : 'POST',
					success : $thematicSearch01.response.successThemaStatList1
				});
			},
			
			// mng_s 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
			getCategorySortList : function (cate_id, p, sort_type) {
				var requestParam = {
					cate_id : cate_id,
					resultCnt : pageSize,
					sort_type : sort_type
				};
				
				if (p!= 0) {
					requestParam.p = p - 1;
				}
				else {
					requestParam.p = p;
				}
				
				if ($thematicSearch01.isSearch) {
					if (!sop.Util.isUndefined($thematicSearch01.search.title) && $thematicSearch01.search.title.length > 0) {
						requestParam.title = encodeURIComponent($thematicSearch01.search.title);
					}
				}
				
				$statsPotal.api.thematicMap.getStatsThemeMapList({
					param : requestParam,
					method : 'POST',
					success : $thematicSearch01.response.successThemaStatList1
				});
			},
			// mng_e 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
			
			// 테마 정보 (좌측 큰 주제) 
			//
			getCategory : function () {
				$statsPotal.api.thematicMap.getCategory({
					method : 'POST',
					success : $thematicSearch01.response.successCateList
				});
			}
		
		}; //request end
	
	$thematicSearch01.response = {
			successCateList : function (stats, res) {
				// 좌측 카탈로그 리스트 받아서 붙이기 
				if (res.errCd === 0) {
					categoryList = res.result.cateList;
					
					
					for ( var i = 0; i < categoryList.length; i++) {
							var html = $thematicSearch01.formatter.getCateHtml(categoryList[i]);
							//searchResultBox에 생성한 html을 붙인다.							
							$('#searchResultBox #board_area_'+(i+1)).append(html);
						
					}	
					
					$thematicSearch01.request.getCategoryList();
				}
			},

			sleepForScroll : function (num){
				var now = new Date();
				var stop = now.getTime() + num;
				while(true){
					now = new Date();
					if(now.getTime() > stop)return;
				}
			},
			
			successThemaStatList : function (stats, res) {
				if (res.errCd === 0) {
					if(res.result.returnOnlyPage) {
						// 처음 페이지 만들때
						
						for(var i=0;i<categoryList.length;i++){
							$thematicSearch01.ui.pagenation(res.result.count[i], $thematicSearch01.ui.pageSize, res.result.currentPage,res.result.categoryList[i]);
						}
						
						//ctgr_001의 count를 조회하고
						
						//getCategoryList1 은 무엇인지?? 페이지를 눌렀을때 리스트를 띄움.
						
						$('.board_tabs3 span').empty();
						for(var i=0;i<categoryList.length;i++){
							$thematicSearch01.request.getCategoryList1(res.result.categoryList[i], res.result.currentPage);							
							$('#board_tabs_'+(i+1)+(i+1)).append(res.result.count[i] + " 종");
							if($("#themeSearchBtn").hasClass("cOn")){
								if(res.result.count[i]==0){
									$('#board_tabs_'+(i+1)).removeClass("active");
								}else{
									$('#board_tabs_'+(i+1)).addClass("active");
									$('.board_area').hide();
									$('#board_area_'+(i+1)).show();
								}
							}
						}
						if($(".board_tabs2 a.active").length > 1){
							$(".board_tabs2 a:not(.active:eq(0))").not().removeClass("active");
							$(".board_tabs2 a.active:eq(0)").trigger("click");
						}
					} else {
						// 얘는 뭐냐?

//						var resultList = res.result;			     
//						//리스트붙이고
//						var lifeCateListHtml = $thematicSearch01.formatter.getThemeListHtml(resultList.themeMapInfoList);
//						$("#lifeList").html(lifeCateListHtml);
//						//공간만들고
//						var tempHeight = $(".life").find(".section").height() + $(".life").find(".pagenation1").height();
//						$(".life").find(".category").height(tempHeight);
//		
//						var healthCateListHtml = $thematicSearch01.formatter.getThemeListHtml(resultList.themeMapInfoList);
//						$("#healthList").html(healthCateListHtml);
//						
//						tempHeight = $(".health").find(".section").height() + $(".health").find(".pagenation2").height();
//						$(".health").find(".category").height(tempHeight);
//						
//						var cultureCateListHtml = $thematicSearch01.formatter.getThemeListHtml(resultList.themeMapInfoList);
//						$("#cultureList").html(cultureCateListHtml);
//						
//						tempHeight = $(".culture").find(".section").height() + $(".culture").find(".pagenation3").height();
//						$(".culture").find(".category").height(tempHeight);
//						
//						var saftyCateListHtml = $thematicSearch01.formatter.getThemeListHtml(resultList.themeMapInfoList);
//						$("#saftyList").html(saftyCateListHtml);
//						
//						tempHeight = $(".environment").find(".section").height() + $(".environment").find(".pagenation4").height();
//						$(".environment").find(".category").height(tempHeight);
					}
				}
			},

			successThemaStatList1 : function (stats, res) {
				if (res.errCd === 0) {
					var lifeCateHtml = "";
					var resultList = res.result;
					var category = resultList.category;
					
					var num = category.substring(6,8);
					var txt = "<div style='margin-top:25px;height:43px;' align='center'>검색 결과가 없습니다.</div>";
						
					if(resultList.themeMapInfoList.length == 0){
						if(resultList.category == "CTGR_001"){
							$("#board_area_1").append(txt);
						}else if(resultList.category == "CTGR_002"){
							$("#board_area_2").append(txt);
						}else if(resultList.category == "CTGR_003"){
							$("#board_area_3").append(txt);
						}else if(resultList.category == "CTGR_004"){
							$("#board_area_4").append(txt);
						}else if(resultList.category == "CTGR_005"){
							$("#board_area_5").append(txt);
						}else if(resultList.category == "CTGR_006"){
							$("#board_area_6").append(txt);
						}
						
					}
					var html = $thematicSearch01.formatter.getThemeListHtml(resultList.themeMapInfoList);
					
					//List를 붙인다.
					$("#"+num).html(html);
					
					if (resultList.themeMapInfoList.length < 1) {
						$('#list'+num).hide();
						var tempHeight = $("#"+num).height() + $("#list"+num).height() + 100;
					}else {						
						$('#list'+num).show();
						var tempHeight = $("#"+num).height() + $("#list"+num).height() + 100;					
					}				
				}
				
				var tempId = '#icon';
				var tempIndex = $thematicSearch01.ui.calledType;
				tempId += tempIndex;
				
				
				//상단 메뉴 클릭시 해당 주제로 스크롤해서 내려가는 기능
//				var tempScroll = $(tempId).offset().top;
//				if($thematicSearch01.ui.isFirst) {
//					$('body,html').animate({
//						scrollTop: tempScroll
//				    }, 300);
//				}
				
				
			}
		}; //response end
	
	
	
	
	$thematicSearch01.formatter = {
			searchWordValidation : function (text) {
				if (!sop.Util.isUndefined(text) && text.length < 1) {
					$thematicSearch01.isSearch = false;
					$thematicSearch01.request.getCategoryList();
					return false;
				}
				
				if (sop.Util.isUndefined(text) || !text.length > 0) {				
					messageAlert.open('', '검색어가 입력되지 않습니다.');
					return false;
				}
				
				if (sop.Util.isUndefined(text) || !text.length > 1) {				
					messageAlert.open('', '최소 2자 이상의 검색어가 필요합니다.');
					return false;
				}
				
				if (!IsValid("formInput", text)) {
					return false;
				}
				return true;
			},
			
			// mng_s 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
			refreshThemaList : function(select_obj) {
				var categoryId = select_obj.id.substring(0, 8);
				
				if(categoryId == "CTGR_001"){
					$("#board_area_1 li").remove();
				}else if(categoryId == "CTGR_002"){
					$("#board_area_2 li").remove();
				}else if(categoryId == "CTGR_003"){
					$("#board_area_3 li").remove();
				}else if(categoryId == "CTGR_004"){
					$("#board_area_4 li").remove();
				}else if(categoryId == "CTGR_005"){
					$("#board_area_5 li").remove();
				}else if(categoryId == "CTGR_006"){
					$("#board_area_6 li").remove();
				}
				
				$thematicSearch01.request.getCategorySortList(categoryId, 0, select_obj.value);
			},
			// mng_e 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
				
			getCateHtml : function (cateObj) {
				var cateListHtml = '';
				var num = cateObj.thema_map_category.substring(6,8);
				var exp = '';
				if (cateObj.exp.length > 22) {
					exp = cateObj.exp.substring(0, 22);
					exp += '</br>';
					exp += cateObj.exp.substring(22, cateObj.exp.length);
				}
				else {
					exp = cateObj.exp;
				}
				// 2016. 12. 22 수정
				var imgUrl = cateObj.category_icon_url;
				
				// mng_s 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
				var selectId = cateObj.thema_map_category + "_sort";
				var sortTooltipText = "";
				sortTooltipText += "정렬 방식 설명 </br>";
				sortTooltipText += "</br>";
				sortTooltipText += "추천순 정렬	:	실 생활에 유용한 추천 정보 순서 </br>";
				sortTooltipText += "인기순 정렬	:	최근 1달동안 조회수가 높은 순서 </br>";
				sortTooltipText += "가나다순 정렬	:	제목의 오름차순 순서 </br>";
				
				cateListHtml += '<h2 class="ptit" style="border-top:solid 3px #00498f; color:#4f87b6; font-size:18px; line-height:3;">'+exp;
				cateListHtml += '&nbsp&nbsp&nbsp <select id = ' + selectId + ' style="-webkit-appearance: menulist; color:#4f87b6; font-size:15px; line-height:3; padding: 5px; cursor: pointer;" ';
				cateListHtml += 'onchange="javascript:$thematicSearch01.formatter.refreshThemaList(this)";>';
				cateListHtml += '<option value="recommend">추천순 정렬</option> <option value="favorite">인기순 정렬</option> <option value="alphabet">가나다순 정렬</option> </select>';
//				cateListHtml += '<a class="theme_sort_tooltip" title="' + sortTooltipText + '"><img  src="/img/ico/ico_help05.png" width="20" height="20" alt="정렬방식 도움말 팝업" style="cursor: pointer; margin-top: 20px; margin-left: 15px;"/></a>';
				cateListHtml += '</h2><hr>';
				
//				cateListHtml += '<h2 class="ptit" style="border-top:solid 3px #00498f; color:#4f87b6; font-size:18px; line-height:3;">'+exp+'</h2><hr>';
				// mng_e 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가
				
//				cateListHtml += '<div class="fl" style="background-image: url('+imgUrl+');" id="icon'+num+'" >';
//				cateListHtml += '<h4 class="tit">'+cateObj.category_nm+'</h4>';
//				cateListHtml += '<p class="txt01">'+cateObj.en+'</p>';
//				cateListHtml += '<p class="txt02">'+exp+'</p>';
//				cateListHtml += '</div>';
//					
//				// 앞의 숫자가 0이면 01->1로 바꿔 넣는다.
//				if(num.substring(0,1)=='0'){
//					cateListHtml += '<div class="fr" id="fr'+num+'">';
//				}else{
//					cateListHtml += '<div class="fr" id="fr'+num+'">';
//				}
//				cateListHtml += '<ul class="thematicSearchList">';
//				cateListHtml += '<li>';
//				cateListHtml += '<div class="section">';					
//				cateListHtml += '<div id="'+num+'"></div>';
//				cateListHtml += '<div id="list'+num+'" class="pagenation" align="center" style="width: 100%;height:30px;">';
//				cateListHtml += '<span class="pages"> <a href="" class="page">1</a></span></div></div</li></ul></div>';				
				
				return cateListHtml;
			},
			// 리스트 뿌리기
			getThemeListHtml : function (themeListObj) {
//				if(themeListObj.length < 1) {
//					return "<div align='center'>검색 결과가 없습니다.</div>";					
//				} else {
					var themeListObjHml = "";
					var root, tmp;						
					 
					for ( var i = 0; i < themeListObj.length; i++) {
						if(themeListObj[i].category == "CTGR_001"){
							root = $("#board_area_1");
						}else if(themeListObj[i].category == "CTGR_002"){
							root = $("#board_area_2");
						}else if(themeListObj[i].category == "CTGR_003"){
							root = $("#board_area_3");
						}else if(themeListObj[i].category == "CTGR_004"){
							root = $("#board_area_4");
						}else if(themeListObj[i].category == "CTGR_005"){
							root = $("#board_area_5");
						}else if(themeListObj[i].category == "CTGR_006"){
							root = $("#board_area_6");
						}
					}
					for ( var i = 0; i < themeListObj.length; i++) {
						themeListObjHml = "<li>";
						
//						themeListObjHml += '<div class="thematicLink">';
						themeListObjHml += '<table class="thematicLink" style="width:100%;"><tr>';
						themeListObjHml += '<td style="width:5%;text-align:center;">'+(i+1)+'</td>';
						if(themeListObj[i].thema_map_type=="02"){
//							themeListObjHml += '<a id="'+themeListObj[i].stat_thema_map_id+'" href="/view/thematicMap/thematicMapMainOld?stat_thema_map_id=' + themeListObj[i].stat_thema_map_id + '&theme=' + themeListObj[i].category + '&mapType=' + themeListObj[i].thema_map_type + '">';
							themeListObjHml += '<td style="width:40%;padding-left:20px;"><a id="'+themeListObj[i].stat_thema_map_id+'" href="/view/thematicMap/thematicMapMainOld?stat_thema_map_id=' + themeListObj[i].stat_thema_map_id + '&theme=' + themeListObj[i].category + '&mapType=' + themeListObj[i].thema_map_type + '">';
						}else{
							// mapType이 2가 아니면
//							themeListObjHml += '<a id="'+themeListObj[i].stat_thema_map_id+'" href="/view/thematicMap/thematicMapMain?stat_thema_map_id=' + themeListObj[i].stat_thema_map_id + '&theme=' + themeListObj[i].category + '&mapType=' + themeListObj[i].thema_map_type + '">';
							if(themeListObj[i].category == "CTGR_001"){
								themeListObjHml += '<td style="width:40%;padding-left:20px;"><a id="'+themeListObj[i].stat_thema_map_id+'" onclick="javascript:srvLogWrite(\'B0\',\'02\',\'01\',\'00\',\''+themeListObj[i].title+'\',\'id=' + themeListObj[i].stat_thema_map_id + '&mapType' + themeListObj[i].thema_map_type + '\');" href="/view/thematicMap/thematicMapMain?stat_thema_map_id=' + themeListObj[i].stat_thema_map_id + '&theme=' + themeListObj[i].category + '&mapType=' + themeListObj[i].thema_map_type + '">';
							}else if(themeListObj[i].category == "CTGR_002"){
								themeListObjHml += '<td style="width:40%;padding-left:20px;"><a id="'+themeListObj[i].stat_thema_map_id+'" onclick="javascript:srvLogWrite(\'B0\',\'02\',\'02\',\'00\',\''+themeListObj[i].title+'\',\'id=' + themeListObj[i].stat_thema_map_id + '&mapType' + themeListObj[i].thema_map_type + '\');" href="/view/thematicMap/thematicMapMain?stat_thema_map_id=' + themeListObj[i].stat_thema_map_id + '&theme=' + themeListObj[i].category + '&mapType=' + themeListObj[i].thema_map_type + '">';
							}else if(themeListObj[i].category == "CTGR_003"){
								themeListObjHml += '<td style="width:40%;padding-left:20px;"><a id="'+themeListObj[i].stat_thema_map_id+'" onclick="javascript:srvLogWrite(\'B0\',\'02\',\'03\',\'00\',\''+themeListObj[i].title+'\',\'id=' + themeListObj[i].stat_thema_map_id + '&mapType' + themeListObj[i].thema_map_type + '\');" href="/view/thematicMap/thematicMapMain?stat_thema_map_id=' + themeListObj[i].stat_thema_map_id + '&theme=' + themeListObj[i].category + '&mapType=' + themeListObj[i].thema_map_type + '">';
							}else if(themeListObj[i].category == "CTGR_004"){
								themeListObjHml += '<td style="width:40%;padding-left:20px;"><a id="'+themeListObj[i].stat_thema_map_id+'" onclick="javascript:srvLogWrite(\'B0\',\'02\',\'04\',\'00\',\''+themeListObj[i].title+'\',\'id=' + themeListObj[i].stat_thema_map_id + '&mapType' + themeListObj[i].thema_map_type + '\');" href="/view/thematicMap/thematicMapMain?stat_thema_map_id=' + themeListObj[i].stat_thema_map_id + '&theme=' + themeListObj[i].category + '&mapType=' + themeListObj[i].thema_map_type + '">';
							}else if(themeListObj[i].category == "CTGR_005"){
								themeListObjHml += '<td style="width:40%;padding-left:20px;"><a id="'+themeListObj[i].stat_thema_map_id+'" onclick="javascript:srvLogWrite(\'B0\',\'02\',\'05\',\'00\',\''+themeListObj[i].title+'\',\'id=' + themeListObj[i].stat_thema_map_id + '&mapType' + themeListObj[i].thema_map_type + '\');" href="/view/thematicMap/thematicMapMain?stat_thema_map_id=' + themeListObj[i].stat_thema_map_id + '&theme=' + themeListObj[i].category + '&mapType=' + themeListObj[i].thema_map_type + '">';
							}else if(themeListObj[i].category == "CTGR_006"){
								themeListObjHml += '<td style="width:40%;padding-left:20px;"><a id="'+themeListObj[i].stat_thema_map_id+'" onclick="javascript:srvLogWrite(\'B0\',\'02\',\'06\',\'00\',\''+themeListObj[i].title+'\',\'id=' + themeListObj[i].stat_thema_map_id + '&mapType' + themeListObj[i].thema_map_type + '\');" href="/view/thematicMap/thematicMapMain?stat_thema_map_id=' + themeListObj[i].stat_thema_map_id + '&theme=' + themeListObj[i].category + '&mapType=' + themeListObj[i].thema_map_type + '">';
							}
						}
						themeListObjHml += themeListObj[i].title;
//						themeListObjHml += '</a>';
						themeListObjHml += '</a>';
						themeListObjHml += '<a class="theme_tooltip" title="'+$.trim(themeListObj[i].thema_exp)+'"><img  src="/img/ico/ico_help05.png" width="20" height="20" alt="' + themeListObj[i].title + ' 도움말 팝업" style="cursor: pointer; margin:-2px 0 -4px 10px;"/></a></td>';
//						themeListObjHml += '<a class="theme_tooltip" title="'+$.trim(themeListObj[i].thema_exp)+'"><img  src="/img/ico/ico_help05.png" width="20" height="20" alt="' + themeListObj[i].title + ' 도움말 팝업" style="cursor: pointer; margin:-2px 0 -4px 10px;"/></a>';
//						themeListObjHml += '<a class="theme_tooltip" title="'+$.trim(themeListObj[i].thema_exp)+'"><img  src="/img/ico/ico_help05.png" width="20" height="20" alt="' + themeListObj[i].title + ' 도움말 팝업" style="cursor: pointer; margin:-2px 0 0 10px;"/></a><br><br>';
						
						var str = "";
						var str2 = "";
						
						// 시도,시군구,읍면동,집계구 설정(공통)
						if(themeListObj[i].max_expnsn_level == '01') {
							str += '<span class="spbox type01" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">시도</span>';
						} else if(themeListObj[i].max_expnsn_level == '02') {
							str += '<span class="spbox type02" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">시군구</span>';
						} else if(themeListObj[i].max_expnsn_level == '03') {
							str += '<span class="spbox type03" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">읍면동</span>';
						} else if(themeListObj[i].max_expnsn_level == '04'){
							str += '<span class="spbox type04" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">집계구</span>';
						}
						
						// 주제도 유형 정보
						if(themeListObj[i].thema_map_type=='02'){
							
							var classType = 'type05';
							if(themeListObj[i].disp_method == '색상'){
								classType = 'type05';
							}else if(themeListObj[i].disp_method == '증감'){
								classType = 'type06';
							}else if(themeListObj[i].disp_method == '시계열'){
								classType = 'type07';
							}else if(themeListObj[i].disp_method == '분할뷰'){
								classType = 'type09';
							}else if(themeListObj[i].disp_method == 'POI'){
								classType = 'type10';
							}	
							// 예전 데이터의 경우 disp_mthd 와 max_expnsn으로 박스표시
							str += '<span class="spbox ' + classType + '" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">'+themeListObj[i].disp_method+'</span>';
					
						}else{
							// theme_map_type이 다른경우 max_expnsn
							
							// mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
//							if(themeListObj[i].thema_map_type == '03'){
							if(themeListObj[i].thema_map_type == '03' || themeListObj[i].thema_map_type == '13'){
							// mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
								
								str += '<span class="spbox type05" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">색상</span>'
							}else if(themeListObj[i].thema_map_type == '04'){
								str += '<span class="spbox type06" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">증감</span>';
							}
							
							// mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
//							else if(themeListObj[i].thema_map_type == '05'){
							else if(themeListObj[i].thema_map_type == '05' || themeListObj[i].thema_map_type == '15'){
							// mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
								
								str += '<span class="spbox type07" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">시계열</span>';
							}else if(themeListObj[i].thema_map_type == '06'){
								str += '<span class="spbox type09" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">분할뷰</span>';
							}else if(themeListObj[i].thema_map_type == '07'){
								str += '<span class="spbox type10" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">POI</span>';
							}			
						}			
						
						//데이터 년도
						str += '<span class="spbox type08" style="cursor:pointer;" onclick="javascript:$thematicSearch01.formatter.goThematicMapPage(\''+themeListObj[i].stat_thema_map_id+'\');">'+themeListObj[i].year_info+'</span></td>';
//						str += "</br></br>";
						
						if(themeListObj[i].rel_stat_info == "통계개발원, 생애주기별 주요특성 및 변화분석(2014. 11)") {
							//2017.03.17 통계주제도 ie에서 출처 잘리는 현상 : margin-top:5px 추가
							//실제 ie에서 재현이 안됨
							str2 += '<div class="thematicEtc" style="margin-left:0px;margin-top:-5px;"><a href="http://kostat.go.kr/portal/korea/kor_nw/2/1/index.board?bmode=read&bSeq=&aSeq=332081&pageNo=1&rowNum=10&navCount=10&currPg=&sTarget=title&sTxt=%EC%83%9D%EC%95%A0%EC%A3%BC%EA%B8%B0" target="_blank">';
							str2 += '<span style="font-size: 12px;margin-top:-5px;">';
							str2 += "출처 : " + themeListObj[i].rel_stat_info;
							str2 += '</span>';
							str2 += '</a></div>';
						} else {
							str2 += "출처 : " + themeListObj[i].rel_stat_info;
						}
						
//						themeListObjHml += '<p class="date" style="margin-left: 30px;">' + str + ' </p>';
						themeListObjHml += '<td style="width:30%;padding-left:20px;><span class="date" style="margin-left: 30px;">' + str + ' </span></td>';
						themeListObjHml += '<td style="width:30%;padding-left:20px;"><span style="font-size:11px;color:#999999;">'+str2+'</span></td>';
						themeListObjHml += '</tr>';
						themeListObjHml += '</table>';
//						themeListObjHml += '</div><hr>';
//						themeListObjHml += '</div>';
						themeListObjHml += '</li>';
						
						tmp = $(themeListObjHml);
						root.append(tmp);
					}
					
					return root;
//				}
			},
			
			createInfoTooltip : function(tmp) {
				$(document).tooltip({ 
					open: function( event, ui ) {
					},
					position: {
						     my: "left+10 top", at: "right top", 
						     using: function( position, feedback ) {
						    	 if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
						    		 $( this ).css( position ).prepend("<span class='subj'></span>");
						    	 }else {
						    		 $( this ).css( position ); 
						    	 }
						    	  
						         $( "<div>" )
						           .addClass( feedback.vertical )
						           .addClass( feedback.horizontal )
						           .appendTo( this );
						     }
					},
					content: function () {
						var title = $(this).attr("title");
						title = title.replace(/&lt;p&gt;/gi, '');
						title = title.replace(/&lt;p&gt;/gi, '');
						title = title.replace(/&lt;/gi, '<');
						title = title.replace(/&gt;/gi, '>');
						title = title.replace(/&quot;/gi, '');
						$(this).attr("title", title); 
						return $(this).prop('title');
				    }
				});

			},
			
			goThematicMapPage : function(cls) {
				window.location.href = $("#"+cls).attr("href");
			}
		};
	
	
	
}(window, document));
