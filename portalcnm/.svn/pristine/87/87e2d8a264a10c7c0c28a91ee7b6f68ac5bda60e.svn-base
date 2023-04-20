//liudandan
var menuItemOn = null;
jQuery(function(){
	//liudandan
	menuItemOn = jQuery(".menuCnm li a.on").parent().index(); 
	naviEvent01();

	if($('#gsksFooterWrapper').length == 0) {
		$('.footerWrapper').html(createFooterHtml());	
	} else {
		$('#gsksFooterWrapper').html(createFooterHtml2());
	}
});

function naviEvent01(){ 
	jQuery(".menuCnm li a").mouseover(function(){
		var inx = jQuery(this).parent().index(); 
		jQuery(".menuCnm li a").removeClass("on");
		jQuery(this).addClass("on"); 
		// 19년반영 시작
		var width = 960;
		if(inx == 0){
			var submenu = [
				{ "subj":"총괄이용현황", "link":"/s-portalcnm/html/MN/totUseStat.html" },	
				{ "subj":"API 이용통계", "link":"/s-portalcnm/html/MN/APIStat.html" },	
				{ "subj":"페이지 방문통계", "link":"/s-portalcnm/html/MN/serviceUseStat.html" },	//20180221	
				{ "subj":"검색어 통계", "link":"/s-portalcnm/html/MN/RELStat.html" },
				{ "subj":"통계소통지도 통계", "link":"/s-portalcnm/html/MN/CommunityStat.html" }//20160527나광흠 추가
			], posleft = 0;width = 960;
		}else if(inx == 1){
			var submenu = [
				{ "subj":"인증키 현황", "link":"/s-portalcnm/html/AK/USESRVStat.html" },
				{ "subj":"업로드 데이터 현황", "link":"/s-portalcnm/html/AK/UPLOADData.html" }
			], posleft =180;
		}else if(inx == 2){
			var submenu = [
			    { "subj":"정책통계지도", "link":"/s-portalcnm/html/DT/policyCategoryManager.html" },
				{ "subj":"주제도", "link":"/s-portalcnm/html/DT/themaMapManage.html" },
				{ "subj":"통계 소통지도", "link":"/s-portalcnm/html/DT/Community.html" },
				{ "subj":"KOSIS 목록관리", "link":"/s-portalcnm/html/DT/KOSISManage.html" },	
				{ "subj":"공공데이터 관리", "link":"/s-portalcnm/html/DT/PUBDataManage.html" },
				/*{ "subj":"우수활용 사례", "link":"/s-portalcnm/html/MB/manager.html" },*/
				{ "subj":"배너관리", "link":"/s-portalcnm/html/DT/BannerManage.html" },
				{ "subj":"자료제공 관리", "link":"/s-portalcnm/contents/gsks/gsks_01_04.jsp" },
				{ "subj":"통계갤러리 관리", "link":"/s-portalcnm/html/DT/Gallerylist.html" },
				{ "subj":"모바일 서비스 관리", "link":"/s-portalcnm/html/DT/MobileManage.html" },
				{ "subj":"My통계로", "link":"/s-portalcnm/ststistics/ststisticsUSLifeCycleMng.do" }, // 2020-02-19 수정
				//2019-07-30 [김남민] 관리자 > 서비스 관리 > 일자리 맵 > 일자리 통계정보 집계. START
				{ "subj":"일자리 맵", "link":"/s-portalcnm/html/DT/WorkRoadStatsInfoSm.html" },
				//2019-07-30 [김남민] 관리자 > 서비스 관리 > 일자리 맵 > 일자리 통계정보 집계. END
				// 2020년 SGIS고도화 3차 시작
				//], posleft = 100,width = 1225;	//주석
				//,{ "subj":"총조사시각화", "link":"/s-portalcnm/ststistics/ststisticsUSTotalSurveyMng.do" } // 2020년 SGIS고도화 3차 총조사시각화 관리자 - 총조사시각화 메뉴 생성(pse)
				{ "subj":"생활권역 통계지도 관리", "link":"/s-portalcnm/srvAreaMng/srvAreaSetInfoMng.do" }, // 2020년 SGIS고도화 3차 배후권 관리자
				// 2020년 SGIS고도화 3차 끝
				//2021년 SGIS4 도시화 시작
				{ "subj":"도시화 분석 지도", "link":"/s-portalcnm/urban/urbanServiceManage.do"}
				//2021년 SGIS4 도시화 끝
				], posleft = 30,width = 1400;	//총조사시각화 메뉴 안보이는 것을 방지하기 설정변경  posleft : 100 ==> 30, width :1225 ==> 1400(pse)
		}else if(inx == 3){
			var submenu = [
			    { "subj":"연관어 정보관리", "link":"/s-portalcnm/html/DT/RELManage.html" },
			    { "subj":"즐겨찾는 통계관리", "link":"/s-portalcnm/html/DT/THBookManage.html" },
			    { "subj":"설명문구 관리", "link":"/s-portalcnm/html/DT/EXPTTIPManage.html" },
			    { "subj":"통계항목 관리", "link":"/s-portalcnm/html/DT/THMetaManage.html" },
			    { "subj":"접근 관리", "link":"/s-portalcnm/html/DT/AccessManage.html" }
			], posleft = 350,width = 960;
		}else if(inx == 4){
			var submenu = [
			    { "subj":"통계포탈", "link":"/s-portalcnm/html/QA/boardManage.html" },	
				{ "subj":"개발자 사이트", "link":"/s-portalcnm/html/QA/DevboardManage.html" },
				{ "subj":"에듀", "link":"/s-portalcnm/html/QA/eduBoardManage.html" },
			    { "subj":"운영이력관리", "link":"/s-portalcnm/html/QA/reqBoardList.html" }
			], posleft = 600,width = 960;
		}else if(inx == 5){
			var submenu = [
				{ "subj":"일반회원", "link":"/s-portalcnm/html/MB/member.html" },	
				{ "subj":"관리자", "link":"/s-portalcnm/html/MB/manager.html" },
				{ "subj":"마이페이지", "link":"/s-portalcnm/html/CM/myPage.html"/*"link":"/s-portalcnm/html/CM/myPage.html"*/ }
			], posleft = 720,width = 960;
		}
		var ul = "<ul style='left:"+posleft+"px; width : "+width+"px'>";
		for(i=0; i<submenu.length; i++){
			ul += "<li><a href="+submenu[i].link+">"+submenu[i].subj+"</a>";
		}
		ul += "</ul>";
		jQuery(".subMenu").css({"width": width});
		// 19년반영 끝
		jQuery(".subMenu").show().empty().append(ul);

		jQuery(".contents, .defaultbox, .mapContents").mouseenter(function(){
			jQuery(".subMenu").hide();
			jQuery(".menuCnm li a").removeClass("on");
			//liudandan
			jQuery(".menuCnm li").eq(menuItemOn).children("a").addClass("on");
		});
	});
}

jQuery(function(){
	jQuery(".btn, .apiTable03 tr td a, .popup").click(function(){ 
			jQuery(".popupWrapper").css("display","block"); 
			/** 19년반영 시작 **/
			jQuery(".popupWrapperKeyWord").css("display","none"); 
			jQuery(".popupWrapperSubKeyWord").css("display","none"); 
			jQuery(".popupWrapperInterests").css("display","none"); 
			jQuery(".popupWrapperService").css("display","none"); 
			jQuery(".popupWrapperLifeCycle").css("display","none"); 
			jQuery(".popupWrapperAdvice").css("display","none"); 
			jQuery(".popupWrapperDatainterests").css("display","none"); 
			/** 19년반영 끝 **/
			/**2020년 SGIS고도화 3차 배후권 시작*/
			jQuery(".corpPopupWrapper").css("display","none");
			jQuery(".poiPopupWrapper").css("display","none"); 
			jQuery(".addPopupWrapper").css("display","none"); 
			jQuery(".upperPopupWrapper").css("display","none"); 
			jQuery(".gridPopupWrapper").css("display","none"); 
			jQuery(".scopePopupWrapper").css("display","none");
			/**2020년 SGIS고도화 3차 배후권 끝*/
	});
});
jQuery(function(){
	jQuery(".cancel, .myXbtn").click(function(){
			/**2020년 SGIS고도화 3차 배후권 시작*/
			//jQuery(".popupWrapper").css("display","none"); //20200423 운영자 페이지 닫기 버튼 안되서 수정 (주석처리)
			jQuery("div[class^='popupWrapper']").css("display","none");	 //20200423 운영자 페이지 닫기 버튼 안되서 수정 (코드추가) 
			jQuery("div[class^='corpPopupWrapper']").css("display","none");
			jQuery("div[class^='poiPopupWrapper']").css("display","none");
			jQuery("div[class^='addPopupWrapper']").css("display","none");
			jQuery("div[class^='upperPopupWrapper']").css("display","none");
			jQuery("div[class^='gridPopupWrapper']").css("display","none");
			jQuery("div[class^='scopePopupWrapper']").css("display","none");
			/**2020년 SGIS고도화 3차 배후권 끝*/
	});
});
//2021년 SGIS4 도시화 시작
jQuery(function(){
	jQuery(".cancel, .save, .urbanXbtn").click(function(){
		jQuery("div[class^='upperPopupWrapper']").css("display","none");
		jQuery("div[class^='scopePopupWrapper']").css("display","none");
		$(".mainIdSave ").text('저장');
	});
});
//2021년 SGIS4 도시화 끝


function createFooterHtml() {
	var cursor = "";
	
	cursor += "<div class='footer'>";
	cursor += "<p class='footerLogo'><img src='/s-portalcnm/html/include/img/pic/pic_logo.png' alt='footer logo'/></p>"; //19년반영
	cursor += "<p class='footerLogo'><img src='./../include/img/pic/pic_logo.png' alt='footer logo'/></p>";
	cursor += "<p class='footerFont'>";
	cursor += "대전광역시 서구 청사로 189 통계청콜센터 TEL : 02-2012-9114 / SGIS 담당자 TEL : 042-481-2342 / 자료제공담당자 TEL : 042-481-2438<br/>copyright statistics korea. all rights reserved. since 1996";
	cursor += "</p>";
	cursor += "</div>";

	return cursor;
}

function createFooterHtml2() { //자료제공 관리용 gsks
	var cursor = "";
	
	cursor += "<div class='footer'>";
	cursor += "<p class='footerLogo'><img src='/s-portalcnm/html/include/img/pic/pic_logo.png' alt='footer logo'/></p>";
	cursor += "<p class='footerFont'>";
	cursor += "대전광역시 서구 청사로 189 통계청콜센터 TEL : 02-2012-9114 / SGIS 담당자 TEL : 042-481-2342 / 자료제공담당자 TEL : 042-481-2438<br/>copyright statistics korea. all rights reserved. since 1996";
	cursor += "</p>";
	cursor += "</div>";

	return cursor;
}