//liudandan
var menuItemOn = null;
$(function(){
	//liudandan
	menuItemOn = $(".menuCnm li a.on").parent().index(); 
	naviEvent01(); 	 
});

function naviEvent01(){ 
	$(".menuCnm li a").mouseover(function(){
		var inx = $(this).parent().index(); 
		$(".menuCnm li a").removeClass("on");
		$(this).addClass("on"); 
		if(inx == 0){
			var submenu = [
				{ "subj":"API 이용통계", "link":"/s-portalcnm/html/MN/APIStat.html" },	
				{ "subj":"페이지 방문통계", "link":"/s-portalcnm/html/MN/SRVStat.html" },	
				{ "subj":"검색어 통계", "link":"/s-portalcnm/html/MN/RELStat.html" }
			], posleft = 0;
		}else if(inx == 1){
			var submenu = [
				{ "subj":"인증키 현황", "link":"/s-portalcnm/html/AK/USESRVStat.html" },
				{ "subj":"업로드 데이터 현황", "link":"/s-portalcnm/html/AK/UPLOADData.html" }
			], posleft =180;
		}else if(inx == 2){
			var submenu = [
				{ "subj":"주제도", "link":"/s-portalcnm/html/DT/themaMapManage.html" },
				{ "subj":"통계 커뮤니티맵", "link":"/s-portalcnm/html/DT/Community.html" },
				{ "subj":"KOSIS 목록관리", "link":"/s-portalcnm/html/DT/KOSISManage.html" },	
				{ "subj":"공공데이터 관리", "link":"/s-portalcnm/html/DT/PUBDataManage.html" },
				/*{ "subj":"우수활용 사례", "link":"/s-portalcnm/html/MB/manager.html" },*/
				{ "subj":"배너관리", "link":"/s-portalcnm/html/DT/BannerManage.html" },
				
				
				{ "subj":"자료제공 관리", "link":"/s-portalcnm/contents/gsks/gsks_01_04.jsp" },
				
				
				
			], posleft = 150;
		}else if(inx == 3){
			var submenu = [
			    { "subj":"연관어 정보관리", "link":"/s-portalcnm/html/DT/RELManage.html" },
			    { "subj":"즐겨찾는 통계관리", "link":"/s-portalcnm/html/DT/THBookManage.html" },
			    { "subj":"설명문구 관리", "link":"/s-portalcnm/html/DT/EXPTTIPManage.html" },
			    { "subj":"통계항목 관리", "link":"/s-portalcnm/html/DT/THMetaManage.html" },
			    { "subj":"접근 관리", "link":"/s-portalcnm/html/DT/AccessManage.html" }
			], posleft = 350;
		}else if(inx == 4){
			var submenu = [
			    { "subj":"통계포탈", "link":"/s-portalcnm/html/QA/boardManage.html" },	
				{ "subj":"개발자 사이트", "link":"/s-portalcnm/html/QA/DevQASearch.html" }
			], posleft = 660;
		}else if(inx == 5){
			var submenu = [
				{ "subj":"일반회원", "link":"/s-portalcnm/html/MB/member.html" },	
				{ "subj":"관리자", "link":"/s-portalcnm/html/MB/manager.html" },
				{ "subj":"마이페이지", "link":"/s-portalcnm/html/CM/myPage.html"/*"link":"/s-portalcnm/html/CM/myPage.html"*/ }
			], posleft = 720;
		}
		var ul = "<ul style='left:"+posleft+"px'>";
		for(i=0; i<submenu.length; i++){
			ul += "<li><a href="+submenu[i].link+">"+submenu[i].subj+"</a>";
		}
		ul += "</ul>"; 
		$(".subMenu").show().empty().append(ul);

		$(".contents, .defaultbox, .mapContents").mouseenter(function(){
			$(".subMenu").hide();
			$(".menuCnm li a").removeClass("on");
			//liudandan
			$(".menuCnm li").eq(menuItemOn).children("a").addClass("on");
		});
	});
}

$(function(){
	$(".btn, .apiTable03 tr td a, .popup").click(function(){ 
			$(".popupWrapper").css("display","block"); 
	});
});
$(function(){
	$(".cancel, .myXbtn").click(function(){ 
			$(".popupWrapper").css("display","none"); 
	});
});
