<%
/**************************************************************************************************************************
* Program Name	: 총조사시각화 Main
* File Name		: totSurvMain.jsp
* Comment		:
* History		:
*	2020.08.03	곽제욱	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<script src="/js/administStats/lodash.js"></script>
<script src="/js/plugins/jquery.min.js"></script>
<script src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>
<script src="/js/totSurv/inMoreDetail/inMoreDetailMap.js"></script>
<script src="/js/totSurv/jquery.mCustomScrollbar.concat.min.js"></script> 
<link rel="stylesheet" href="/css/totSurv/inMoreDetail/style.css" />
<link rel="stylesheet" href="/css/totSurv/common.css" />
<link rel="stylesheet" href="/css/totSurv/map.css" /> <!--  2020-12-11 [곽제욱] 맵 css 적용 --> <!-- 20210225 박은식 경로 수정 -->
<link rel="stylesheet" href="/css/totSurv/reset.css" />
<link rel="stylesheet" href="/css/totSurv/jquery.mCustomScrollbar.css" />
<!-- 소주제 툴팁 -->
<style type="text/css">
li .tooltip {
  display: none;
  animation: tooltipAni 1s;
  transition: opacity 0.5s;
  position: absolute;
  top: 5px;
  left: 5px;
  background: #fff;
}

li:hover .tooltip {
  display: block;
}

/*20201012 박은식 IE에서 input range 이동 시 생기는  tooltip 제거 START*/
input[type=range]::-ms-tooltip {
    display: none;
}

#mapToolTipTable table {
	width: auto!important;
}
/*20201012 박은식 IE에서 input range 이동 시 생기는  tooltip 제거 END*/
</style>


<!-- 2020-10-19 [주형식] 차트변경 팝업화면 추가 START -->
<style>
    #chart_modal {
        display: none;
        background-color: #454d5a;
        border: 1px solid #888;
        border-radius: 5px;
    }

    #chart_modal .modal_close_btn {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    /*20210226 박은식 튜토리얼 css추가 START*/
    .tutoClose {
	    left: 1070px;
	    position: absolute;
	    bottom: 35px;
	    color: #FFFFFF;
	    background: rgb(0,0,0,0);
	    font-size: 20px;
	    border: 1px solid black;
	    font-weight: bold;
	    border-radius: 8px;
    }
    
    .tutoText {
    	position: absolute;
	    bottom: 40px;
	    left: 1110px;
	    font-size: 16px;
	    color: #FFFFFF;
	    font-weight: bold;
    }
    /*20210226 박은식 튜토리얼 css추가 END*/
</style>
<!-- 2020-10-19 [주형식] 차트변경 팝업화면 추가 END -->


<!-- SNS 공유 (카카오스토리) -->
<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>

<!-- SNS 공유 자료 클릭시 모바일 첫 페이지로 링크됨 -->
<!-- <meta property="og:url" content="/view/totSurv/populationDash"> -->
<meta property="og:url" content="/view/totSurv">
<!-- <meta property="og:image" content="/view/totSurv/populationDash"> -->
<meta property="og:image" content="/view/totSurv/totSurvImage" />
<meta property="og:description" content="총조사시각화" />
<meta property="og:title" content="[총조사시각화]개인 관심주제에 맞는 공간통계정보를 제공합니다." />
<meta property="og:type" content="article">
<!-- <meta property="og:article:author" content="총조사시각화"> -->
<!-- <meta property="og:article:author:url" content="/view/totSurv/populationDash"> -->


<!-- 2020-10-13 START -->
<c:if test="${type=='locgov'}">
<style>
.container{top: 45px;}
.commonTotSurvBack_modal {top:0;}
.commonTotSurvPopupWrap {top:calc(50% - 120px) !important;}
</style>
</c:if>
<!-- 2020-10-13 END -->
<script>

var selectTreeDataUrl = "/view/totSurv/proxy.json?https://kosis.kr/statisticsList/selectTreeData.do?vwcd=MT_ZTITLE&themaAll=false";
//var selectTreeDataUrl = "/view/totSurv/proxy.json?http://kosis.kr/statisticsList/selectTreeData.do?vwcd=MT_ZTITLE&themaAll=false";
//var selectTreeDataUrl = "http://kosis.kr/statisticsList/selectTreeData.do?vwcd=MT_ZTITLE&themaAll=false";
$(document).ready(function() {
	$(".item").hide();
	/*트리맵 스크롤*/
	$(".col01 .panel_body .treemap").mCustomScrollbar({
	    axis:"y",
	    theme:"light",
	    autoHideScrollbar: true
	});
	/*col3 스크롤*/
	$(".col03 .panel_body .ringt_panel").mCustomScrollbar({
	    axis:"y",
	    theme:"light",
	    autoHideScrollbar: true
	});
	
	/*트리맵 스크롤*/
	$(".panel .panel_body .treemap").mCustomScrollbar({
	    axis:"y",
	    theme:"light",
	    autoHideScrollbar: true
	});
	
	$(".subDivL-Body").mCustomScrollbar({
	    axis:"y",
	    theme:"light",
	    autoHideScrollbar: true
	});
	
	$("#commonTotSurv_popup_confirm_close").click(function() {
		$("#commonTotSurv_popup_back").hide();
		$("#commonTotSurv_popup_confirm").hide();
	});
	$("#commonTotSurv_popup_alert_close").click(function() {
		$("#commonTotSurv_popup_back").hide();
		$("#commonTotSurv_popup_alert").hide();
	});
	$("#lifeEnvironment_close").click(function() {
		$("#commonTotSurv_popup_back").hide();
		$("#lifeEnvironment").hide();
	});
	$("#commonTotSurv_popup_area_detail_close").click(function() {
		$("#commonTotSurv_popup_back").hide();
		$("#common_popup_area_click").hide();
	});

	$('.container').scroll(function(){
		var $thisTop = $(this).scrollTop();
		$('.fixed-col').css('top',$thisTop+'px');
	});

	/*트리맵*/
	$('.treemap .de-ti').on('click',function(){
		var $parent = $(this).parent('li');
	});
	
	
	/*트리맵 스크롤*/
	/*
	$(".panel .panel_body .treemap .searchList").mCustomScrollbar({
	    axis:"y",
	    theme:"light",
	    autoHideScrollbar: true
	});
	*/
	/*트리맵 스크롤*/
	$(".col01 .panel_body .searchList").mCustomScrollbar({
	    axis:"y",
	    theme:"light",
	    autoHideScrollbar: true
	});
	
	$(document).on("click", ".treemap li:not(.last)", function(e) {
		$(this).parent().siblings().children().children().css("color","#666666");
		$('.lastCat').css("color","#666666");
		
		if($(this).parent().hasClass("last")){
			$(this).children().css("color","#fd2862");
		}
	});
	
	$(document).on("click", ".treemap li:not(.last) strong", function(e) {
		e.stopPropagation();		
		$(".breadcrumb").html("");		
		let elemt = this;
		
		if($(this).parent().hasClass("active")) {
			//if(!$(this).parent().hasClass("first_li")){
				$(this).parent().removeClass("active");
			//}
		} else {
			$.ajax({
				url: selectTreeDataUrl + "&rootId=" + $(this).parent().data("itmid") + "&lev=" + parseInt($(this).parent().data("lvl")+1),
			    type: 'post',
			    dataType : 'json',
			    async: false,
			}).done(function (res) { // 완료
				if(res != null) {
					var str = "";
					
					for(var i=0; i<res.resultTreeList.length; i++) {
						if(res.resultTreeList[i].name.indexOf("전국편") == -1 &&
								res.resultTreeList[i].name.indexOf("특성편") == -1 &&
								res.resultTreeList[i].name.indexOf("기업체편") == -1) {
							if(res.resultTreeList[i].tblId != undefined) {
								for(var k=0; k<$inMoreDetail.ui.tblList.length; k++) {
									if($inMoreDetail.ui.tblList[k] != null && $inMoreDetail.ui.tblList[k] != undefined) {
										if($inMoreDetail.ui.tblList[k].tblId == res.resultTreeList[i].tblId) {
											str += "<ul class='last'>";
											str += "	<li data-tblid='" + res.resultTreeList[i].tblId + "' data-orgid='" + res.resultTreeList[i].orgId + "' data-source='" + res.resultTreeList[i].deptNm + "' data-name='"+ res.resultTreeList[i].name +"' title='"+res.resultTreeList[i].name+"' >";
											
											if(res.resultTreeList[i].name.length > 20){
												str += "		<span class='lastCat'><img src='/img/statsPotal/tree_icon_file.png' style='vertical-align: text-top;' />"+ '&nbsp;&nbsp;' + res.resultTreeList[i].name.substr(0,20) + "..." + "</span>";
											}else{
												str += "		<span class='lastCat'><img src='/img/statsPotal/tree_icon_file.png' style='vertical-align: text-top;' />"+ "&nbsp;&nbsp;" + res.resultTreeList[i].name + "</span>";
											}

											//str += "		<strong class='de-ti'><i class='tree_ico'><span class='ir_wa'>열기/닫기</span></i>" + res.resultTreeList[i].name + "</strong>";
											str += "	</li>";
											str += "</ul>";
											break;
										}	
									}
								}
							} else {
								for(var k=0; k<$inMoreDetail.ui.listIdList.length; k++) {
									if($inMoreDetail.ui.listIdList[k] != null && $inMoreDetail.ui.listIdList[k] != undefined) {
										if($inMoreDetail.ui.listIdList[k].listId.indexOf(res.resultTreeList[i].treeId.replace(/[|]/g, "")) != -1) {
											str += "<ul>";
											str += "	<li data-itmid='" + res.resultTreeList[i].id + "' data-lvl='" + res.resultTreeList[i].lvl + "'>";
											str += "		<strong class='de-ti'><i class='tree_ico'><span class='ir_wa'>열기/닫기</span></i>" + res.resultTreeList[i].name + "</strong>";
											str += "	</li>";
											str += "</ul>";
											break;
										}	
									}
								}
							}
						}
					}
					$(elemt).not(":first").remove();
					$(elemt).parent().append(str);
					$(elemt).parent().addClass("active");	
				}
				if($('.first_li').eq(0).data().loading){
					$(elemt).parent().find('ul>li:first>strong').click();
					$(elemt).parent().find('ul>li:first>span').click();
					//$(elemt).click();
					if($(elemt).parent().parent().hasClass('last')){
					}
				}
			}).fail(function (res) { // 실패
				//commonTotSurv_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//$statsMeMain.ui.loading(false);
			});	
		}
		var title = [], str = "";
		if($(this).parent().hasClass("active")) {
			title = $.merge($(this).parent().not().parents("li.active"), $(this).parent());
		} else {
			title = $(this).parent().not().parents("li.active");
		}
		title.sort(function(a, b) { return parseInt(a.dataset.lvl) - parseInt(b.dataset.lvl); });
		for(var i=0; i<title.length; i++) {
			let pathImg = "<img class='pathImg' src='/img/ico/ico_last01.png'/>";
			//str = $(title).children("strong").text().replace(/열기\/닫기/g, pathImg).substring(3);
			str = $(title).children("strong").text().replace(/열기\/닫기/g, pathImg);
		}
		$(".breadcrumb").html(str);
	});
	
	$(document).on("click", ".treemap ul.last", function(e) {
		e.stopPropagation();
		$(".treemap li.active, .treemap ul.active").removeClass("active");
		$(elemt).addClass("active");
	});
	
	$(document).on("click", ".container .search button.search_btn", function() {
		fnKeywordSearchList();
	});
	
	$(document).on("keyup", ".container .search input#searchKeyword", function() {
		if(event.keyCode == "13") {
			fnKeywordSearchList();
		}
	});
	
	var fnKeywordSearchList = function() {
		/* let treeSearchListUrl = contextPath + "/view/totSurv/proxy.json?https://kosis.kr/statisticsList/selectSearchTreeData.do?" +
		"vwcd=MT_ZTITLE&searchKeyword=" + $("#searchKeyword").val() + "&searchCondition=list&themaAll=false&pageNo=1";
		$.ajax({
			url: treeSearchListUrl,
		    type: 'get',
		    dataType : 'json',
		    async: false,
		}).done(function (res) { // 완료
			let kindOfArr = [], existPathArr = [], str = "", existMenuObjList = {};
			$(".searchList").empty();
			let resCnt = 0;
			for(var i=0; i<res.resultSearchList.length; i++) {
				if(res.resultSearchList[i].pathListId.indexOf("A_4") != -1 //인구총조사
						|| res.resultSearchList[i].pathListId.indexOf("I1_15") != -1	//경제총조사
						|| res.resultSearchList[i].pathListId.indexOf("K1_10") != -1	//농림어업총조사
						|| res.resultSearchList[i].pathListId.indexOf("J1_3") != -1) {	//주택총조사
					resCnt++;
				}
			}
			str += "<div class='treemap mCustomScrollbar _mCS_1 mCS-autoHide mCS_no_scrollbar'>"; 
			str += "<div class='mCustomScrollBox mCS-light mCSB_vertical mCSB_inside' tabindex='0' >"; 
			str += "<div class='mCSB_container' style='position:relative; top:0; left:0;' dir='ltr'>"; 
			str += "<em>\'" + $("#searchKeyword").val() + "\'</em>" + "에 대한 검색결과가 <em>" + resCnt + "</em>건입니다.";
			if(resCnt != 0){
			str += "<div style='margin: 10px 0px 10px 0px;'>목록</div>";
			}else{
			str += "<div style='margin: 10px 0px 10px 0px;cursor: pointer;' onclick='returnMain()'>되돌아가기</div>"
			}
			str += "<ul class='resultList'>";
			for(var i=0; i<res.resultSearchList.length; i++) {
				if(res.resultSearchList[i].pathListId.indexOf("A_4") != -1 //인구총조사
						|| res.resultSearchList[i].pathListId.indexOf("I1_15") != -1	//경제총조사
						|| res.resultSearchList[i].pathListId.indexOf("K1_10") != -1	//농림어업총조사
						|| res.resultSearchList[i].pathListId.indexOf("J1_3") != -1) {	//주택총조사
					
					let itmId = res.resultSearchList[i].pathListId.split(";");

					for(var j=0; j<$inMoreDetail.ui.listIdList.length; j++) {
						if($inMoreDetail.ui.listIdList[j] != null && $inMoreDetail.ui.listIdList[j] != undefined) {
							if($inMoreDetail.ui.listIdList[j].listId.indexOf(itmId[itmId.length-2].split(".")[0]) != -1) {
								str += "<li class='list' data-itmid='"+itmId[itmId.length-2]+"' data-lv='"+res.resultSearchList[i].lvl+"' style='display: block;margin-bottom: 13px;color: rgb(253, 40, 98);cursor: pointer;font-size: 12px;' >";
								str += "	<a href='javascript:void(0);' onclick='fnSearchResultListMove(\"" + res.resultSearchList[i].pathListId + "\"); return false;'>";
								str += res.resultSearchList[i].pathListNm.replace($("#searchKeyword").val(),"<em>" + $("#searchKeyword").val() + "</em>");
								str += "	</a>";
								str += "</li>";
							}
						}
					}
				}
			}
			str += "</ul>";
			str += "</div>";
			str += "<div id='scollSea' class='mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical' style='display: block;'>";
			str += "<div class='mCSB_draggerContainer'>";
 			str += "<div class='mCSB_dragger'>";
			str += "<div class='mCSB_dragger_bar' style='line-height: 30px;'></div>";
			str += "</div>";
			str += "<div class='mCSB_draggerRail'></div>";
			str += "</div>";
			str += "</div>";
			str += "</div>";
			str += "</div>";
			$(".treemap").hide();
			$(".searchList").show().html(str);
		}).fail(function (res) { // 실패
			//commonTotSurv_alert(errorMessage);
		}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
			//$statsMeMain.ui.loading(false);
		});		 */

		srvLogWrite("P0", "09", "06", "02", $totSurvMain.ui.selectedThema, $("#searchKeyword").val());

		let resCnt = 0;
		for(let i=0; i<$inMoreDetail.ui.listIdList.length; i++) {
			if($inMoreDetail.ui.listIdList[i] != null && $inMoreDetail.ui.listIdList[i] != undefined) {
				if($inMoreDetail.ui.listIdList[i].listNm.indexOf($("#searchKeyword").val()) != -1) {
					resCnt++;
				}
			}
		}
		
		let str = "";
		str += "<div class='treemap mCustomScrollbar _mCS_1 mCS-autoHide mCS_no_scrollbar'>"; 
		str += "<div class='mCustomScrollBox mCS-light mCSB_vertical mCSB_inside' tabindex='0' style='overflow-y:auto;'>"; 
		str += "<div class='mCSB_container' style='position:relative; top:0; left:0;' dir='ltr'>"; 
		str += "<em>\'" + $("#searchKeyword").val() + "\'</em>" + "에 대한 검색결과가 <em>" + resCnt + "</em>건입니다.";
		if(resCnt != 0){
		str += "<div style='margin: 10px 0px 10px 0px;'>목록</div>";
		}else{
		str += "<div style='margin: 10px 0px 10px 0px;cursor: pointer;' onclick='returnMain()'>되돌아가기</div>"
		}
		str += "<ul class='resultList'>";
		for(let i=0; i<$inMoreDetail.ui.listIdList.length; i++) {
			if($inMoreDetail.ui.listIdList[i] != null && $inMoreDetail.ui.listIdList[i] != undefined) {
				if($inMoreDetail.ui.listIdList[i].listNm.indexOf($("#searchKeyword").val()) != -1) {
					let pathListId = $inMoreDetail.ui.listIdList[i].listId.split(" > ").reduce(function(a, b, c, d) { 
						if(c==1) { 
							return a = a + "." + c + ";" + b + "." + (c+1) + ";" 
						} else { 
							return a += b + "." + (c+1) + ";" 
						} 
					});
					str += "<li class='list' data-itmid='"+pathListId+"' data-lv='"+pathListId.split(";").length+"' style='display: block;margin-bottom: 13px;color: rgb(253, 40, 98);cursor: pointer;font-size: 12px;' >";
					str += "	<a href='javascript:void(0);' onclick='fnSearchResultListMove(\"" + pathListId + "\"); return false;' style='line-height:1.2;'>";
					str += $inMoreDetail.ui.listIdList[i].listNm.replace($("#searchKeyword").val(),"<em>" + $("#searchKeyword").val() + "</em>");
					str += "	</a>";
					str += "</li>";
				}
			}
		}
		str += "</ul>";
		str += "</div>";
		str += "<div id='scollSea' class='mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical' style='display: none;'>";
		str += "<div class='mCSB_draggerContainer'>";
			str += "<div class='mCSB_dragger'>";
		str += "<div class='mCSB_dragger_bar' style='line-height: 30px;'></div>";
		str += "</div>";
		str += "<div class='mCSB_draggerRail'></div>";
		str += "</div>";
		str += "</div>";
		str += "</div>";
		str += "</div>";
		$(".treemap").hide();
		$(".searchList").show().html(str);
	}
	
	$(document).on("click", ".sideMenuArea #container .searchList .head div", function() {	
		$(".searchList").hide();
		$(".treemap").show();
	});
	
	$(document).on("click", ".treemap ul.last li", function(e) {
		e.stopPropagation();
		$(".treemap ul.last").removeClass("active");
		
		//통계표 목록 클릭시 기관부서 및 통계표 ID 설정
		$inMoreDetail.ui.selectedOrgId = $(this).data("orgid");
		$inMoreDetail.ui.selectedTblId = $(this).data("tblid");
		$inMoreDetail.ui.selectedItemId = $(this).parents(".first_li").data("itmid");
		
		let tblist = $inMoreDetail.ui.selectedTblId;
		let itlist = $inMoreDetail.ui.selectedItemId;
		
		if(itlist == "J1_3"){
			if(tblist == "DT_1KI1510"    || tblist == "DT_1KI1511"
				|| tblist == "DT_1KI1510_10" || tblist == "DT_1KI1511_10"
				|| tblist == "DT_1KI2002"    || tblist == "DT_1KI2003"){
					$( "#sbx_sido" ).prop( "disabled", false );
					if( tblist == "DT_1KI1511" ||  tblist == "DT_1KI1511_10" ||  tblist == "DT_1KI2003"){
						$( "#sbx_sgg" ).prop( "disabled", false );
						$( "#sbx_emd" ).prop( "disabled", false );
					}else{
						$( "#sbx_sgg" ).prop( "disabled", true );
						$( "#sbx_emd" ).prop( "disabled", true );
					}
				}else{
					$( "#sbx_sido" ).prop( "disabled", true );
					$( "#sbx_sgg" ).prop( "disabled", true );
					$( "#sbx_emd" ).prop( "disabled", true );
				}
		}else{
			$( "#sbx_sido" ).prop( "disabled", false );
			$( "#sbx_sgg" ).prop( "disabled", false );
			$( "#sbx_gg" ).prop( "disabled", false );
			$( "#sbx_emd" ).prop( "disabled", false );
		}
		
		$(".popTitle").html("");
		var str = $(this).data("name");
		
		str = str.replace("열기\/닫기",'');
		//var str = $(this).text();
		//str = str.replace("열기\/닫기",'');
		
		$(".tblNm").html(str);
		$(".desc.source").html($(this).data("source"));
		
		//$(".popTitle").html(str);
		
		//통계표 세부항목 팝업 설정
		$.ajax({
			method: "POST",
			async: false,	// 반드시 동기처리 해야 함
			url: contextPath + "/ServiceAPI/totSurv/common/getTotSurvDetail.json",
			data: { "orgId": $inMoreDetail.ui.selectedOrgId,"tblId": $inMoreDetail.ui.selectedTblId }, // 
			dataType: "json",
			success: function(res) {
				var str = "";
				if(res.result.tmsData.length == 0) { // 년도별 자료가 없을 경우
					str += "년도별 자료가 존재하지 않습니다.";
				}
				if(str != "") {
					str += "\n";
				}
				if(res.result.resultData.length == 0) { // 표특성항목이 없을 경우
					str += "표특성항목이 존재하지 않습니다.";
				}
				if( str != "") {
					alert(str);
					$('.col02_pop').removeClass('active'); // 통계표 세부항목 팝업제거
					return false;
				}
				
				var startYear = Number(res.result.tmsData[0].start_year); 	// 시작년도
				var endYear = Number(res.result.tmsData[0].end_year);		// 종료년도
				var updtCycle = res.result.tmsData[0].updt_cycle;			// 생성주기
				
				var optsStr = "", chrOptsStr = "";
				for(var i=endYear; i>=startYear; i=i-Number(updtCycle)){
					optsStr += "<option value='" + i + "'>" + i + "</option>";
				}
				$("#tmsYears").html(optsStr);								// 년도
				
				let tblNm = "";
				for(var i=0; i<res.result.resultData.length; i++) {
					let chartNm = res.result.resultData[i].chart_nm;
					chrOptsStr += "<option value='" + res.result.resultData[i].itm_id + "' data-chartord='" + res.result.resultData[i].chart_ord + "'>" + chartNm + "</option>";
				}
// 				$("#sbx_ksic").html("<option value='" + res.result.resultData[0].itm_id + "' data-chartord='" + res.result.resultData[0].chart_ord + "'>" + res.result.resultData[0].obj_nm + "</option>");								
				$("#chrItmList").html(chrOptsStr);
				
				$('.col02_pop').addClass('active');
				if($('.first_li').eq(0).data().loading){
					setTimeout(function(){
						$inMoreDetail.ui.selectedOrgId = 101;
						$('.col02_pop.active button').click();
					},800);
					
					$('.first_li').eq(0).data().loading = false;
				}
				
			},
			error: function(e) {
				alert('failed');
			}
		});
		$(this).parent().addClass("active");
	});
	
	$('.col02_pop .pop_close').on('click',function(){
		$('.col02_pop').removeClass('active');
	});
	
	
	
	//통계표 정보 보기
	$(".col02_pop .foot button").on("click", function() {
		clickFunc();
	});
	
	var clickFunc = function(){
		$(".item").show();
		/* fnGetChartData();
		initSelectedParams();
		fnDrawContent(); */
		// selectbox 초기화
		$("#sbx_sido").val("00");
		$("#sbx_sgg").val("000");
		$("#sbx_gg").val("000");
		$("#sbx_emd").val("000");
		$("#sbx_sgg").children().not(":first").remove();
		$("#sbx_gg").children().not(":first").remove();
		$("#sbx_emd").children().not(":first").remove();
		$("#sbx_gg").parents("dl").css('display','none');
		$('.switch_box select').css('width',150);
		$(".title.charItmMapTitle.green").text($("#tmsYears option:selected").text());
		$(".title.charItmMapTitle.blue").text($("#chrItmList option:selected").text());
		$(".title.charItmMapTitle.green").show();
		$(".title.charItmMapTitle.blue").show();
		
		// 지도 소제목 지우기
		//$("#itmDiv").css("display", "none");
		//$('.col02_pop').removeClass('active');

		$totSurvMain.ui.selectedArea = "";
		$inMoreDetailMap.ui.mapToggleId = "";
		$inMoreDetail.ui.admCd = "";
		
		if($inMoreDetail.ui.selectedObj != undefined && $inMoreDetail.ui.selectedObj != "") {
    		$inMoreDetail.ui.chartToggleYn = "N";
    		$inMoreDetail.ui.selectedObj = "";
    		$("#itmDiv").css("display", "none");
    		$("#itmDiv").html("");
    		
    		$(".colorck li>a:eq(0)").click();
		}
		
		//var str = $(".treemap ul.last.active li span").text();
		var str = $(".treemap ul.last.active li").data('name');
		str = str.replace("열기\/닫기",'');
		
		$(".tblNm").html(str);
		/*
		if($inMoreDetail.ui.selectedObj != undefined && $inMoreDetail.ui.selectedObj != "") {
			if($inMoreDetail.ui.selectedObj[0].series != null){
				$inMoreDetail.ui.selectedObj[0].update({ color: $totSurvMain.ui.selectedTempColor });
				$inMoreDetail.ui.selectedObj[0].select(false);
			}
		}
		*/
		
		if($totSurvMain.ui.selectedArea == "") {
			$totSurvMain.ui.selectedArea = "00";	
		}
		
		$inMoreDetail.event.setDispOptions();
		
		$inMoreDetail.ui.selectedChartOrd = $("#chrItmList option:selected").data("chartord");
		let chartData = $inMoreDetail.ui.dispOptions[$inMoreDetail.ui.selectedChartOrd];
		
		srvLogWrite("P0", "09", "06", "03", $totSurvMain.ui.selectedThema, 'orgId='+$inMoreDetail.ui.selectedOrgId+',tblId='+$inMoreDetail.ui.selectedTblId+',chartOrd='+$inMoreDetail.ui.selectedChartOrd );

		//통계표 세부항목 팝업 설정
		$.ajax({
			method: "POST",
			async: false,	// 반드시 동기처리 해야 함
			url: contextPath + "/ServiceAPI/totSurv/common/getTotSurvCharItmList.json",
			data: { "orgId": $inMoreDetail.ui.selectedOrgId,"tblId": $inMoreDetail.ui.selectedTblId, "chartOrd": $inMoreDetail.ui.selectedChartOrd }, // 
			dataType: "json",
			success: function(res) {
				$inMoreDetail.ui.selectedCharItmId = "";
				for(var i=0; i<res.result.resultList.length; i++) {
					if(i==0) {
						$inMoreDetail.ui.selectedCharItmId += res.result.resultList[i].itm_id;
					} else {
						$inMoreDetail.ui.selectedCharItmId += "," + res.result.resultList[i].itm_id;
					}
				}
				
				// 기본 파라미터 설정
				$inMoreDetail.ui.ajax.params = {			
					surv_year_list: $("#tmsYears option:selected").val()		// 수록시점
					, org_id_list: $inMoreDetail.ui.selectedOrgId					// 조직번호
					, tbl_id_list: $inMoreDetail.ui.selectedTblId					// 통계표 ID
					, list_var_ord_list: "" 									// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
					, char_itm_id_list: $inMoreDetail.ui.selectedCharItmId	// 표특성항목
					, adm_cd:  ""// 지역코드
					, prt_type: "total"												// 출력방식 total:계 else 모두		
					, category: $inMoreDetailMap.ui.category							// 카테고리
					, odr_col_list: "DTVAL_CO"									// 정렬기준
					, odr_type: "DESC"											// 내림차순, 오름차순
				};	
				
				// 설정된 옵션을 이용해 ITEM 파라미터 추가
				fn_bindItmList(chartData);
				
				getSidoListOpt($("#tmsYears option:selected").val());
				
				$inMoreDetail.event.allChange("1");
			}
		});
	};
	
	/* $(".switch_box #sbx_sido").on("click", function() {
		$totSurvMain.ui.selectedArea = $inMoreDetail.ui.admLv.split("_")[1] + ":" + $("#sbx_sido option:selected").val();
		$inMoreDetail.event.allChange("1");
	}); */
	
	var initSelectedParams = function() {
		$inMoreDetailMap.ui.selectedItmLv1 = "";					// 항목 1
		$inMoreDetailMap.ui.selectedItmLv2 = "";					// 항목 2
		$inMoreDetailMap.ui.selectedItmLv3 = "";					// 항목 3
		$inMoreDetailMap.ui.selectedItmLv4 = "";					// 항목 4
		$inMoreDetailMap.ui.selectedItmLv5 = "";
	}
	
	$("#sbx_sido").on("change", function() {
		let chartOrd = $("#chrItmList option:selected").data("chartord");
		//$totSurvMain.ui.selectedArea = "l" + $inMoreDetail.ui.dispOptions[chartOrd][0].regionVarOrd + ":" + $("#sbx_sido option:selected").val();
		$totSurvMain.ui.selectedArea = $("#sbx_sido option:selected").val();
		//$inMoreDetailMap.ui.mapToggleId = $("#sbx_sido option:selected").val();
		$inMoreDetail.ui.admCd = $inMoreDetailMap.ui.mapToggleId;
	
		srvLogWrite("P0", "09", "06", "05", $totSurvMain.ui.selectedThema, 'adm_cd='+$totSurvMain.ui.selectedArea);

		//if($("#sbx_sgg option:selected").val()=="000"){
		//}else{
			if($("#sbx_gg").children().not(":first").length > 0) {
				$("#sbx_gg").children().not(":first").remove();
			}
			$("#sbx_gg").parents("dl").css('display','none');
			$('.switch_box select').css('width',150);
			$('#sbx_sgg,#sbx_gg').val('000').prop("selected", true);
			getSggListOpt();
			$("select#sbx_emd option").remove();
			$("#sbx_emd").append("<option value='000'>전체(읍면동)</option>");
			$inMoreDetail.event.allChange("1");
		//}
	});
	
	$("#sbx_sgg").on("change", function() {
		let chartOrd = $("#chrItmList option:selected").data("chartord");
		//$totSurvMain.ui.selectedArea = $inMoreDetail.ui.admLv.split("_")[1] + ":" + $("#sbx_sido option:selected").val();
		//$inMoreDetailMap.ui.mapToggleId = $("#sbx_sido option:selected").val() + $("#sbx_sgg option:selected").val();
		//$totSurvMain.ui.selectedArea = $("#sbx_sido option:selected").val();
		$inMoreDetail.ui.admCd = $inMoreDetailMap.ui.mapToggleId;
		$totSurvMain.ui.selectedArea = $("#sbx_sido option:selected").val() + $("#sbx_sgg option:selected").val(); 

		srvLogWrite("P0", "09", "06", "05", $totSurvMain.ui.selectedThema, 'adm_cd='+$totSurvMain.ui.selectedArea);

		//$totSurvMain.ui.selectedArea = $("#sbx_sido option:selected").val();
		/*
		if($("#sbx_emd option:selected").val()=="000"){
			$inMoreDetail.event.allChange("3");
		}else{
			$('#sbx_emd').val('000').prop("selected", true);
			$inMoreDetail.event.allChange("1");
		}
		*/
		if($("#sbx_gg").children().not(":first").length > 0) {
			$("#sbx_gg").children().not(":first").remove();
		}
		if($inMoreDetail.ui.tempGg[$(this).val()]){
			var sggOpt = "";
			for(var key in $inMoreDetail.ui.tempGg[$(this).val()]){
				var tsgg = $inMoreDetail.ui.tempGg[$(this).val()][key];
				sggOpt += "<option value=\""+tsgg.sgg_cd+"\" data-coor-x=\""+tsgg.x_coor+"\" data-coor-y=\""+tsgg.y_coor+"\">"+tsgg.sgg_nm+"</option>";
			}
			$("#sbx_gg").append(sggOpt).parents("dl").css('display','inline-block');
			$('.switch_box select').css('width',130);
		}else{
			$("#sbx_gg").append(sggOpt).parents("dl").css('display','none');
			$('.switch_box select').css('width',150);
		}
		$('#sbx_emd').val('000').prop("selected", true);
		$inMoreDetail.event.allChange("1");
		getEmdListOpt();
	});
	
	$("#sbx_gg").on("change", function() {
		let chartOrd = $("#chrItmList option:selected").data("chartord");
		$inMoreDetail.ui.admCd = $inMoreDetailMap.ui.mapToggleId;
		$('#sbx_emd').val('000').prop("selected", true);
		$inMoreDetail.event.allChange("1");
		getEmdListOpt();
	});
	
	$("#sbx_emd").on("change", function() {
		let chartOrd = $("#chrItmList option:selected").data("chartord");
		//$totSurvMain.ui.selectedArea = $inMoreDetail.ui.admLv.split("_")[1] + ":" + $("#sbx_sido option:selected").val();
		//$totSurvMain.ui.selectedArea = $("#sbx_sido option:selected").val();
		//$inMoreDetailMap.ui.mapToggleId = $("#sbx_sido option:selected").val() + $("#sbx_sgg option:selected").val() + $("#sbx_emd option:selected").val();
		$inMoreDetail.ui.admCd = $inMoreDetailMap.ui.mapToggleId;
		$totSurvMain.ui.selectedArea = $inMoreDetailMap.ui.mapToggleId;

		srvLogWrite("P0", "09", "06", "05", $totSurvMain.ui.selectedThema, 'adm_cd='+$totSurvMain.ui.selectedArea);

		$inMoreDetail.event.allChange("1");
	});
	
	$(".switch_box .slider").on("click", function() {
		if($(this).hasClass("grid")) {
			$(this).removeClass("grid");
		} else {
			$(this).addClass("grid");
		}
		clickFunc();
	});	
	
	$(".emChart").on("click", function() {
		$(".switch_box .slider").addClass("grid");
		clickFunc();
	});

	$(".emGrid").on("click", function() {
		$(".switch_box .slider").removeClass("grid");
		clickFunc();
	}); 

	//통계표 세부항목 팝업 설정
	$.ajax({
		method: "POST",
		async: false,	// 반드시 동기처리 해야 함
		url: contextPath + "/view/totSurv/getAllStblList.do", 
		dataType: "json",
		success: function(res) {
			$inMoreDetail.ui.tblList = res.allTblIdList;
			$inMoreDetail.ui.listIdList = res.allListIdList;
		}
	});
	
	//$('.first_li')[0].click();
	$('#clickE strong').click();
	
	$(document).on("click", ".link-kosis.link-btn", function() {
		var url = $inMoreDetail.ui.dispOptions[$("#chrItmList option:selected").data("chartord")][0].stattbUrl
		var options = 'top=10, left=10, width=1280, height=960, status=no, menubar=no, toolbar=no, resizable=no';
	    window.open(url, "", options);
	});
	
	$(document).on("click", "a.source_link", function() {
		var url = "https://meta.narastat.kr/metasvc/index.do?orgId=101&kosisYn=Y";
		if($inMoreDetail.itlist == "A_4") {
			url += "&confmNo=101001";	
		} else if($inMoreDetail.itlist == "I1_15") {
			url += "&confmNo=101002";	
		} else if($inMoreDetail.itlist == "K1_10") {
			url += "&confmNo=101041";	
		} else if($inMoreDetail.itlist == "J1_3") {
			url += "&confmNo=101071";	
		}
		
		var options = 'top=10, left=10, width=1280, height=960, status=no, menubar=no, toolbar=no, resizable=no';
	    window.open(url, "", options);
	});
});
//ready 끝

var clickHref = function(){
	window.open($inMoreDetail.ui.dispOptions[1][0].stattbUrl);
}

var returnMain = function(){
	$(".treemap").show();
	$(".searchList").hide();
}

var fnSearchResultListMove = function(pathListId) {
	var parsePath = pathListId.split(";");
	for(var i=0; i<parsePath.length; i++) {
		var itmId = parsePath[i].split(".")[0];
		var itmLv = parsePath[i].split(".")[1];
		
		//var tblList = $(".sideMenuArea #container .treemap li:not(.last)");		
		var tblList = $(".treemap li:not(.last)");		
		for(var j=0; j<tblList.length; j++) {
			let tblElemt = tblList[j];
			if(itmId == $(tblList[j]).data("itmid") && itmLv == $(tblList[j]).data("lvl")) {
				$.ajax({
					url: selectTreeDataUrl + "&rootId=" + itmId + "&lev=" + parseInt(parseInt(itmLv)+1),
				    type: 'post',
				    dataType : 'jsonp',
				    async: false,
				}).done(function (res) { // 완료
					if(res != null) {
						var str = "";
						for(var i=0; i<res.resultTreeList.length; i++) {
							if(res.resultTreeList[i].tblId != null) {
								str += "<ul class='last'>";
								/*
								str += "	<li>";
								str += "		<span>" + res.resultTreeList[i].name + "</span>";
								str += "	</li>";
								*/
								str += "	<li data-tblid='" + res.resultTreeList[i].tblId + "' data-orgid='" + res.resultTreeList[i].orgId + "' data-source='" + res.resultTreeList[i].stattbSourc + "' data-name='"+ res.resultTreeList[i].name +"' title='"+res.resultTreeList[i].name+"' >";
								
								if(res.resultTreeList[i].name.length > 20){
									str += "		<span class='lastCat'><img src='/img/statsPotal/tree_icon_file.png' style='vertical-align: text-top;' />"+ '&nbsp;&nbsp;' + res.resultTreeList[i].name.substr(0,20) + "..." + "</span>";
								}else{
									str += "		<span class='lastCat'><img src='/img/statsPotal/tree_icon_file.png' style='vertical-align: text-top;' />"+ "&nbsp;&nbsp;" + res.resultTreeList[i].name + "</span>";
								}

								str += "	</li>";
								str += "</ul>";		
							} else {						
								str += "<ul>";
								str += "	<li data-itmid='" + res.resultTreeList[i].id + "' data-lvl='" + res.resultTreeList[i].lvl + "'>";
								str += "		<strong class='de-ti'><i class='tree_ico'><span class='ir_wa'>열기/닫기</span></i>" + res.resultTreeList[i].name + "</strong>";
								str += "	</li>";
								str += "</ul>";							
							}
						}
						$(tblElemt).children().not(":first").remove();
						$(tblElemt).append(str);
						$(tblElemt).addClass("active");
						
						$(".searchList").hide();
						$(".treemap").show();
					}
				}).fail(function (res) { // 실패
					//commonTotSurv_alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//$statsMeMain.ui.loading(false);
				});
			}	
		}
	}
}

let fn_bindItmList = function(data) {
	let char_itm_id_list = "", ovL1List = "", ovL2List = "", ovL3List = "", ovL4List = "",
			ovL5List = "", ovL6List = "", ovL7List = "", ovL8List = "";
	for(var i=0; i<data.length; i++) {
		if(data[i].varOrd == "0") {
			if(char_itm_id_list != "") {
				char_itm_id_list += "," + data[i].itmId;
			}  else {
				char_itm_id_list += data[i].itmId;
			}
		} else if(data[i].varOrd == "1") {
			if(ovL1List != "") {
				ovL1List += "," + data[i].itmId;
			} else {
				ovL1List += data[i].itmId;
			}
		} else if(data[i].varOrd == "2") {
			if(ovL2List != "") {
				ovL2List += "," + data[i].itmId;
			} else {
				ovL2List += data[i].itmId;
			}
		} else if(data[i].varOrd == "3") {
			if(ovL3List != "") {
				ovL3List += "," + data[i].itmId;
			} else {
				ovL3List += data[i].itmId;
			}
		} else if(data[i].varOrd == "4") {
			if(ovL4List != "") {
				ovL4List += "," + data[i].itmId;
			} else {
				ovL4List += data[i].itmId;
			}
		} else if(data[i].varOrd == "5") {
			if(ovL5List != "") {
				ovL5List += "," + data[i].itmId;
			} else {
				ovL5List += data[i].itmId;
			}
		} else if(data[i].varOrd == "6") {
			if(ovL6List != "") {
				ovL6List += "," + data[i].itmId;
			} else {
				ovL6List += data[i].itmId;
			}
		} else if(data[i].varOrd == "7") {
			if(ovL7List != "") {
				ovL7List += "," + data[i].itmId;
			} else {
				ovL7List += data[i].itmId;
			}
		} else if(data[i].varOrd == "8") {
			if(ovL8List != "") {
				ovL8List += "," + data[i].itmId;
			} else {
				ovL8List += data[i].itmId;
			}
		}
	}
	
	$inMoreDetail.ui.ajax.params.char_itm_id_list = char_itm_id_list;
	$inMoreDetail.ui.ajax.params.ov_l1_list = ovL1List;
	$inMoreDetail.ui.ajax.params.ov_l2_list = ovL2List;
	$inMoreDetail.ui.ajax.params.ov_l3_list = ovL3List;
	$inMoreDetail.ui.ajax.params.ov_l4_list = ovL4List;
	$inMoreDetail.ui.ajax.params.ov_l5_list = ovL5List;
	$inMoreDetail.ui.ajax.params.ov_l6_list = ovL6List;
	$inMoreDetail.ui.ajax.params.ov_l7_list = ovL7List;
	$inMoreDetail.ui.ajax.params.ov_l8_list = ovL8List;
}
</script>

<!-- SGIS 공통 JS -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop.css" />
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-easyui-1.4/sop-src.sync.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/jquery.sha256.js"></script>
	<script src="${pageContext.request.contextPath}/js/plugins/durian-v2.0.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/sop.portal.absAPI.js"></script>
	<script src="${pageContext.request.contextPath}/js/totSurv/inMoreDetail/map.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/common.js"></script>
	<script src="${pageContext.request.contextPath}/js/totSurv/legendInfo.js"></script>
	<script src="/js/plugins/jquery.wheelcolorpicker.js"></script>
	<script src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/wheelcolorpicker.css"/>
    <script src="${pageContext.request.contextPath}/js/plugins/jquery.wheelcolorpicker.js"></script>
<title>[총조사시각화]총조사 시각화 메인화면입니다.</title>
</head>
<body>
<!-- 2020.10.14[한광희] 상단 메뉴 추가 START -->
<!-- 2020.10.20 [곽제욱] 상단 메뉴 주석처리 START -->
<!--
<div class="tot_wrap" style="background-color:#363A46; height:28px; width:100%; z-index:501">
	<div id="narrow_wide_1" class="top_box narrow" style="width:1100px;">
		<div class="global_nav">
			<ul>
				<li><a href="/view/totSurv/totSurvMain" class="tm_totSurv" style="z-index:20; width: 120px; box-shadow: 2px -2px 3px rgba(0,0,0,0.2);"></a></li>
				<li><a href="/view/index?param=0" class="tm_sgis" style="background-color:#868b9a; left:110px; z-index:10; width: 145px; box-shadow: 3px -1px 3px rgba(0,0,0,0.2)"></a></li>
				<li><a href="/view/statsMe/statsMeMain" class="tm_my" style="background-color: #868b9a; z-index:0; left: 245px; width: 150px;"></a></li>
			</ul>
		</div>
	</div>
</div>
 -->
<!-- 2020.10.20 [곽제욱] 상단 메뉴 주석처리 END -->
<!-- 2020.10.14[한광희] 상단 메뉴 추가 END -->
<!-- header START -->
  <div class="Topheader" style="display: none;">
    <h1 class="Wrap">총조사 시각화 서비스</h1>
  </div>
  <!-- header END-->
<!-- 좌측메뉴 -->
<jsp:include page="/view/totSurv/totSurvLeft"></jsp:include>
<!-- 헤더 -->
<jsp:include page="/view/totSurv/inMoreDetail/inMoreDetailHeader"></jsp:include>

<!-- 2021.02.24[신예리] 튜토리얼 화면 START -->
<div class="populationDashTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()"></button>
</div>

<!-- 2021.08.04[이영호] 경총 추가 -->
<div class="ecnmyDashTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()"></button>
</div>

<div class="houseDashTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()"></button>
</div>

<div class="houseHoldDashTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()"></button>
</div>

<div class="farmDashTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()"></button>
</div>

<div class="forestryDashTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()"></button>
</div>

<div class="fisheryDashTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()"></button>
</div>

<div class="populationTmsTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()"></button>
</div>

<div class="totSurvDetailTuto none">
	<button type="button" class="TutoCloseBtn" onclick="hideTuto()">닫기</button>
</div>

<!-- 2021.02.24[신예리] 튜토리얼 화면 END -->

<!-- 상세메뉴 sideNav -->
<!-- 2020.10.27[신예리] side 영역 Toggle Btn START -->
		<button type="button" class="sideMenuToggleBtn" id="detail_sub" style="display:none;" title="상세페이지 메뉴 토글"></button>
<!-- 2020.10.27[신예리] side 영역 Toggle Btn END -->
	<div id="content">
		<div class="container">
			<div class="com_col col01">
				<div class="panel">
					<div class="panel_head">
						<h3>통계표 목록</h3>
						<div class="search">
							<input type="text" id="searchKeyword" placeholder="통계표명 검색">	
							<button type="button" title="검색" class="search_btn"></button>
						</div>
					</div>
					<div class="panel_body">
						<div class="treemap">
							<ul>
								<li class="first_li" id="clickE" data-itmid="A_4" data-lvl="2" data-loading="true">
									<strong class="de-ti" ><i class="tree_ico"><span class="ir_wa">열기/닫기</span></i>인구총조사</strong>					
								</li>
								<li class="first_li" data-itmid="I1_15" data-lvl="2">
									<strong class="de-ti"><i class="tree_ico"><span class="ir_wa">열기/닫기</span></i>주택총조사</strong>					
								</li>
								<li class="first_li" data-itmid="K1_10" data-lvl="2">
									<strong class="de-ti"><i class="tree_ico"><span class="ir_wa">열기/닫기</span></i>농림어업총조사</strong>					
								</li>
								<li class="first_li" data-itmid="J1_3" data-lvl="2">
									<strong class="de-ti"><i class="tree_ico"><span class="ir_wa">열기/닫기</span></i>경제총조사</strong>					
								</li>
							</ul>								
						</div>
						<div class="searchList" style="height: 100%;display: none">			
						</div>
					</div>
				</div>
			</div>
			
			<div class="com_col col02" id="container_panel2">
				<div class="panel">
					<div class="panel_head">
						<h3 class="click_name">지도 
							<span id="areaDiv">전국</span>
							<span id="yearDiv" class="title charItmMapTitle green" style="display:none;">2020</span>
							<span id="titleDiv" class="title charItmMapTitle blue" style="display:none;">총인구</span>
						</h3>
					</div>
					<div class="panel_body" style="z-index: 2;">
						<div>
			      			<div class="Map totSurvMap" id="mapArea">
		    				</div>
	    				</div>
    				</div>
				</div>
			</div>
			
			<div class="com_col col03" id="container_panel3">
				<div class="panel_head">
				
	   				<div class="col02_pop">
						<div class="head">
							<h3 class="sm">통계표 세부항목 선택</h3>
						</div>
						<div class="body">
							<!-- <p class="popTitle">시·도별/산업소분류별/조직형태별 총괄</p> -->
							<div class="pop_sel">
								<dl>
									<dt>항목</dt>
									<dd>
										<select name="chrItmList" id="chrItmList">
											<option value=""></option>
										</select>
									</dd>
								</dl>
<!-- 								<dl> -->
<!-- 									<dt>&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt> -->
<!-- 									<dd> -->
<!-- 										<select name="sbx_ksic" id="sbx_ksic"> -->
<!-- 											<option value=""></option> -->
<!-- 										</select> -->
<!-- 									</dd> -->
<!-- 								</dl> -->
								<dl>
									<dt>년도</dt>
									<dd>
										<select name="tmsYears" id="tmsYears">
											<option value=""></option>
										</select>
									</dd>
								</dl>
							</div>
							<div class="foot">
								<button type="button">통계정보 보기</button>
							</div>
							<span class="pop_close">
								 <span class="ir_wa"></span>
							</span>
						</div>
					</div>
					<div class="col02_pop">
						<div class="head">
							<h3 class="sm">통계표 세부지역 선택</h3>
						</div>
						<div class="body">
							<div class="pop_sel">
								<dl>
									<dt>시도</dt>
									<dd>
										<select id="sbx_sido" disabled="true">
							  				<option value="00">전국</option>
							  			</select>
							  		</dd>
							  	</dl>
							  	<dl>
							  		<dt>시군구</dt>
							  		<dd>
							  			<select id="sbx_sgg" disabled="true">
							  				<option value="000">전체(시군구)</option>
							  			</select>
							  		</dd>
							  	</dl>
				  				<dl style="display: none;">
							  		<dt>시군구</dt>
							  		<dd>
							  			<select id="sbx_gg" disabled="true">
							  				<option value="000">전체(군구)</option>
							  			</select>
							  		</dd>
							  	</dl>
				  				<dl>
							  		<dt>시군구</dt>
							  		<dd>
							  			<select id="sbx_emd" disabled="true">
							  				<option value="000">전체(읍면동)</option>
							  			</select>
							  		</dd>
							  	</dl>
							  </div>
						</div>
					</div>
					<!-- <div class="left">
						<div class="switch_box">
			            	<label class="switch" id="">
		                        <input type="checkbox">
		                        <span class="slider round"></span>
		                        <div class="txt">
		                        	<em class="emChart">차트</em>
		                        	<em class="emGrid">표</em>
		                        </div>
		                    </label>
				  			<select id="sbx_sido" disabled="true">
				  				<option value="00">전국</option>
				  			</select>				  			
				  			<select id="sbx_sgg" disabled="true">
				  				<option value="000">전체(시군구)</option>
				  			</select>
				  			<select id="sbx_gg" disabled="true" style="display:none;">
				  				<option value="000">전체(군구)</option>
				  			</select>
				  			<select id="sbx_emd" disabled="true">
				  				<option value="000">전체(읍면동)</option>
				  			</select>
			            </div>
                    </div> -->
	            </div>
	            
	            <div class="panel_body">
	            	<!-- <div class="breadcrumb right">
                    </div> -->
                    
	            	<div class="ringt_panel"  >
						<div class="item" id="description">
							<ul>
<!-- 								<li>통계표 명 : <span class="desc tblNm">시·도별/산업소분류별/조직형태별 총괄</span>&nbsp;&nbsp;&nbsp;<a href="#" target='_blank' class="link-kosis link-btn" onclick="javascript: clickHref();">KOSIS 통계표 보기</a></li> -->
								<li>통계표 명 : <span class="desc tblNm">시·도별/산업소분류별/조직형태별 총괄</span>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" class="link-kosis link-btn">KOSIS 통계표 보기</a></li>
			            		<li>출처 : <span class="desc source">통계청, 경제총조사</span>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" class="source_link" style="color:blue;font-weight:bold;">통계설명자료 보기</a></li>	
							</ul>
						</div>
						
						<div id="chart_panel1">
							<div class="item">
								<div class="sub-L"></div>
								<div class="sub-R"></div>
							</div>
							<div class="chart_inner">
								<div id="inMoreDetailCorpCountOfIndustryChart" class="box_item">
								</div>
							</div>
							<div class="chartToolTip">
							</div>
						</div>
						
						<div style="padding-top:10px;" id="chart_panel2">
							<div class="item"  id="title2">
								<div class="sub-L"></div>
								<div class="sub-R"></div>
							</div>
							<div id="timeSeriesCorpCountIndustryChart" class="box_item">
							</div>
							<div class="chartToolTip">
							</div>
						</div>
						
						<div style="padding-top:10px;" id="chart_panel3">
							<div class="item" id="title3">
								<div class="sub-L"></div>
								<div class="sub-R"></div>
							</div>
							<div id="industryOfAreaChart" class="box_item">
							</div>
							<div id="industryOfAreaChart2" class="box_item" style="display:none;">
							</div>
							<div class="chartToolTip">
							</div>
						</div>
						
						<div style="padding-top:10px;" id="chart_panel4">
							<div class="item" id="title4">
								<div class="sub-L"></div>
								<div class="sub-R"></div>
							</div>
							<div id="dataGrid_panel1" class="box_item" style="overflow-x:auto;">
							</div>
							<div class="chartToolTip">
							</div>
						</div>
	            	</div>
	            </div>
			</div>
		</div>
	</div>
	
	<div class="DataNone" name="tiemTableNone" style="text-align: center;">
	<img src="/images/totSurv/ChartNone.png" alt="선택하신 지역에 대한 정보가 없습니다." style="margin-top: 25px;margin-bottom:25px" />
	<p style="margin-top: 15px;">통계표가 선택되지 않았거나 통계 정보가 없습니다.</p>
</div>
<!-- 사용자 동적영역 생성 -->
<!-- <div class="container" id="divContent">

</div> -->
	<!-- 2020-10-22 [주형식] z-index 9999 -> 99999로 변경 -->
	
	<!-- 2020-10-06 [곽제욱] z-index 적용을 위한 맵툴팁 영역 START -->
	<!-- 2020-10-22 [주형식] z-index 9999 -> 99999로 변경 -->
	<div id="mapToolTipTable" style="background: rgba(255, 255, 255, 1); border-radius: 10px;border-width: 4px; display: block; position: absolute;  display:none; z-index: 99999;">
		<table style="margin:10px;">
			<tbody>
				<tr>
					<td colspan="3" class="admName" style="font-size: 14px; font-weight: bold;" id="toolAdmNm">경기도</td> <!-- 20201202 박은식 color 삭제 -->
				</tr>
				<tr style="height:5px">
					<td></td><td></td><td></td> <!-- 2020.11.20[신예리] 웹접근성으로 인한 셀 추가 -->
				</tr>
				<tr>
					<td colspan="3" id="toolAdmData">13,300,900 (명)</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- 2020-10-06 [곽제욱] z-index 적용을 위한 맵툴팁 영역 END -->

	<!-- 2020-10-13 [곽제욱] 타일맵 툴팁을 위한 영역 START -->
	<div class="TileMaptoolTip">
	</div>
	<!-- 2020-10-13 [곽제욱] 타일맵 툴팁을 위한 영역 END -->

	<!-- 2020-10-07 [곽제욱] 차트 공통툴팁 영역 START -->
	<div class="chartCommontoolTip">

	</div>

	<!-- 2020-10-07 [곽제욱] 차트 공통툴팁 영역 START -->
	<div class="chartPoptoolTip" style="z-index:10000;">

	</div>

	<!-- 2020-10-07 [곽제욱] 차트 공통툴팁 영역 START -->
	<!-- 2020-10-08 [박은식] 공통팝업 영역 START -->
	<!-- 팝업 배경 START -->
	<div class="commonTotSurvBack_modal" id="commonTotSurv_popup_back" style="display:none;"></div>
  	<!-- 팝업 배경 END -->
	<!-- 확인 팝업 START -->
	<div id="commonTotSurv_popup_confirm" class="commonTotSurvPopupWrap" style="left: calc(50% - 120px); top: 100px; width: 330px; display: none;"> 	<!-- 2020-10-13 [신예리] 공통팝업 영역 위치 수정 -->
			<div class="commonTotSurvPopTit" style="background-color: #363A46;">
				<h1>알림 팝업</h1>
				<button type="button" class="commonTotSurvPopcloseBtn" id="commonTotSurv_popup_confirm_close" title="팝업 닫기"></button>
			</div>
			<div class="commonTotSurvPopCon">
				<p class="commonTotSurvPopContxt" id="commonTotSurv_popup_confirm_message">현재 위치 정보를 저장 하시겠습니까?</p>
				<div class="commonTotSurvPopBtnBoxCurrent">
						<button id="commonTotSurv_popup_confirm_ok" class="commonTotSurvPopOk" type="button">확인</button>
						<button id="commonTotSurv_popup_confirm_cancel" class="commonTotSurvPopCancle" type="button">취소</button>
					</div>
			</div>
	</div>
	<!-- 확인 팝업 END -->
	<!-- 알림 팝업 START -->
	<div id="commonTotSurv_popup_alert" class="commonTotSurvPopupWrap" style="left: calc(50% - 120px); top: calc(50% - 120px); width: 330px; display: none;">  	<!-- 2020-10-13 [신예리] 공통팝업 영역 위치 수정 -->
			<div class="commonTotSurvPopTit" style="background-color: #363A46;">
				<h1>알림 팝업</h1>
				<button type="button" class="commonTotSurvPopcloseBtn" id="commonTotSurv_popup_alert_close" title="팝업 닫기"></button>
			</div>
			<div class="commonTotSurvPopCon">
				<p class="commonTotSurvPopContxt" id="commonTotSurv_popup_alert_message">비밀 번호를 입력하세요.</p>
				<div class="commonTotSurvPopBtnBoxCurrent"  >
					<button class="commonTotSurvPopOk" id="commonTotSurv_popup_alert_ok" type="button">확인</button>
				</div>
			</div>
	</div>
	<!-- 알림 팝업 END -->
	<!-- 2020-10-08 [박은식] 공통팝업 영역 END -->


	<!-- 2020-10-19 [주형식] 차트변경 팝업화면 추가 START -->
	<div id="chart_modal" class="chart_modal">
		<div class="popTit" style="background-color: #363A46;">
  			<h1><span id="popupTitle"> 차트 유형</span></h1>
			 <button type="button" class="popcloseBtn modal_close_btn" onclick="" title="팝업 닫기"></button>
	   	</div>
		<div id="chartKind" class="chartKindBar">
		<!-- 바(가로)차트 &nbsp;&nbsp; 바(세로)차트 &nbsp;&nbsp; 차트3 &nbsp;&nbsp; 차트4 -->
			<button type="button" class="chartKind00" title="막대 그래프(가로)"></button>
			<button type="button" class="chartKind01" title="막대 그래프(세로)"></button>
			<button type="button" class="chartKind02" title="꺽은선 그래프"></button>
<!-- 			<button type="button" class="chartKind03" title="히스토그램"></button> -->
			<button type="button" class="chartKind04" title="방사형"></button>
			<button type="button" class="chartKind05" title="파이차트"></button>
			<button type="button" class="chartKind06" title="막대 그래프(백분율)"></button>
			<button type="button" class="chartKind07" title="막대 그래프(세로 누적)"></button>
			<button type="button" class="chartKind08" title="막대 그래프(가로 누적)"></button>
			<button type="button" class="chartKind09" title="다중 꺽은선 그래프"></button>
			<button type="button" class="chartKind10" title="꺽은선,막대 그래프"></button>
			<button type="button" class="chartKind11" title="막대 그래프(좌우 비교)"></button>
			<button type="button" class="chartKind12" title="면적차트"></button>
			<button type="button" class="chartKind13" title="그룹 막대 그래프(세로)"></button>
			<button type="button" class="chartKind14" title="다중 방사형"></button>
			<button type="button" class="chartKind15" title="버플차트"></button>

			<!-- 2020.10.28 공통차트 이미지 저장 버튼 추가 -->
			<button type="button" id="cmmChartSave" class="cmmChartSave" title="차트 이미지 저장"></button> <!-- 2020.11.20[신예리] 웹접근성으로 인해 text 삭제 -->

		</div>
		<div class="chartCon" id="chartDiv" style="background-color: white !important;"> <!-- 2020.11.03[신예리] important 위치 수정 --> <!-- 20201117 박은식 class 변경 -->
		</div>
	</div>
	<!-- 2020-10-19 [주형식] 차트변경 팝업화면 추가 END -->

	<!-- 20201020 박은식 도움말 툴팁 영역 MAIN으로 이동 START -->
	<div class="ToolTip helpToolTipDiv moreInfoTool" id="helpTooltip" style="background-color:#fff; z-index:5000;"></div><!-- 20201022 박은식 팝업 z-index 추가(debug mode 아닐 경우 툴팁이 뜨지 않음) -->
	<!-- 20201020 박은식 도움말 툴팁 영역 MAIN으로 이동 END -->


	<!-- 2020.10.21[신예리] 공유하기 팝업 START -->
	<div id="commonSharepopup" class="commonTotSurvPopupWrap" style="left: calc(50% - 120px); top: 100px; width: 560px; display: none;"> <!-- 2020-10-13 [신예리] 공통팝업 영역 위치 수정 --> <!-- 2020-11-13 [신예리] 밴드 버튼 추가로 인한 너비 수정 -->
			<div class="commonTotSurvPopTit" style="background-color: #363A46;">
				<h1>SNS 공유</h1>
				<button type="button" class="commonTotSurvPopcloseBtn" id="commonTotSurv_Sns_close" title="팝업 닫기"></button> <!-- 2020.11.20[신예리] 웹접근성으로 인한 id 변경 -->
			</div>
			<div class="commonTotSurvPopCon">
				 <div class="shareWrap">
					 <div class="shareRow mt10">
					 	<h4 style="margin-right: 10px; color: #fff;">URL내용 : </h4>
					 	<label class="sr_only" for="shareUrl">URL 입력</label>
		              	<input id="shareUrl" type="text" placeholder="http://" readonly="readonly"/>
					 </div>
					 <div class="shareRow mt20">
						 <button type="button" class="kakao" title="카카오 스토리 공유하기">카카오 스토리</button>
	              		 <button type="button" class="twitter" title="트위터 공유하기">트위터</button>
	              		 <button type="button" class="face" title="페이스북 공유하기">페이스북</button>
	              		 <button type="button" class="band" title="밴드 공유하기">네이버 밴드</button>
					 </div>
					 <div class="shareRowBtn mt20">
			              <button type="button" class="urlcopy">URL 복사하기</button>
			              <button type="button" class="txtClose">닫기</button>
		            </div>
				 </div>
			</div>
	</div>
	<!-- 2020.10.21[신예리] 공유하기 팝업 END -->


	<!-- 2020.10.22[신예리] 상세페이지 지역 선택 팝업 START -->
	<div class="commonTotSurvBack_modal" id="commonTotSurvDetail_popup_back" style="display:none;"></div>
	<div id="detailSidoselectPop" class="commonTotSurvPopupWrap" style="left: calc(50% - 120px); top: calc(50% - 120px); width: 330px; display: none;">
			<div class="commonTotSurvPopTit" style="background-color: #363A46;">
				<h1>지역 선택</h1>
				<button type="button" class="commonTotSurvPopcloseBtn" id="commonTotSurv_detailSidoselectPop_close" title="팝업 닫기"></button>
			</div>
			<div class="commonTotSurvPopCon">

				<div class="popSelect">
					<select id="areaPopup_sido">
						<!-- <option value="전국">전국</option>
						<option value="서울특별시">서울특별시</option>
						<option value="부산광역시">부산광역시</option>
						<option value="대구광역시">대구광역시</option>
						<option value="인천광역시">인천광역시</option> -->
					</select>
					<select id="areaPopup_sgg">
						<!-- <option value="전체">전체</option>
						<option value="강남구">강남구</option>
						<option value="강동구">강동구</option>
						<option value="강북구">강북구</option>
						<option value="강서구">강서구</option> -->
					</select>
				</div>
				<div class="commonTotSurvPopBtnBoxCurrent"  >
					<button class="commonTotSurvPopOk" id="commonTotSurv_detailSidoselectPop_ok" type="button">확인</button>
				</div>
			</div>
	</div>
</body>
</html>