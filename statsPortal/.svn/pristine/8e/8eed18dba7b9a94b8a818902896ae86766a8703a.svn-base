var inner_width       = 0;
var inner_height      = 0;
var inner_half_width  = 0;
var inner_half_height = 0;
var img_left          = 0;
var img_top           = 0;
var img_pop_left      = 0;
var img_pop_top       = 0;
var menu_dep0_top     = 101;
var menu_dep1_top     = 138;
var menu_dep2_top     = 175;
var wrTimer;
var legendDepth       = 0;
var callYn            = false;

function setInnerSize(){ // ① 튜토리얼 시작, ② resized 시, 사용
	var max_width     = 1920;
	var max_height    = 1080;
	
	inner_width       = window.innerWidth  > max_width  ? max_width  : window.innerWidth ;
	inner_height      = window.innerHeight > max_height ? max_height : window.innerHeight;
	inner_half_width  = inner_width /2;
	inner_half_height = inner_height/2;
}

function readyTutorial() {


	/* 한번에 가자~*/
//	$("#btn_20").trigger("click");

	
	var iWidth = $(window).width();
	var iHeight = $(window).height();
	
	if ( iWidth > 1920 || iHeight > 1080) {
		var warnMsg = confirm("튜토리얼 최대,최적의 해상도는 1920x1080입니다.\n\n"
				            + "튜토리얼이 제대로 실행되지 않을 수 있습니다.\n\n"
				            + "그래도 실행 하시겠습니까?");

		if (warnMsg == 1) {
			$(".tutorialWrapper").show();
            startTutorial();
		} else {
			alert("<일자리 맵> 화면으로 돌아가겠습니다.");
			window.close();
			return;
		}

	} else {
        startTutorial();
	}

}

function startTutorial() {  
	$("#tuto_wr_start_btn").hide()
	
	$(document).ready(function(){
		setInnerSize();
		posiInfo($workRoad.ui.tutoPointIdx);
		showTutorialWrapper();
		reloadPage();
	});
	
	$(document).keyup(function(event) {
		if (window.event.keyCode == 27) { // ESC
			closeTutorial();
		}
	});

	$(window).resize(function() {

		if (this.resizeTO) {
			clearTimeout(this.resizeTO);
		}
		this.resizeTO = setTimeout(function() {
			$(this).trigger('resizeEnd');
		}, 100);

	});
	$(window).on(
			'resizeEnd',
			function() {	
				setInnerSize();
				posiInfo($workRoad.ui.tutoPointIdx);
				reloadPage();
				showTutorialWrapper();
				set2Btn9();	
				showLegend();
	});
	
	function showTutorialWrapper(){
	    $(".tutorialWrapper").css("width", inner_width);
		$(".tutorialWrapper").show();
	    $("#headerTutorial").css("left", (inner_width - $("#headerTutorial").width()) / 2);
		$("#headerTutorial").show();
	}
	
	function set2Btn9(){		
		if(1 < $workRoad.ui.tutoCurrentPage){
			$("#2_btn_9").css("left", inner_width - $("#2_btn_9").width() - 3);
			$("#2_btn_9").css("top" , 182);
			$("#2_btn_9").css("z-index", 4);
			$("#2_btn_9").show();			
		}
	}
	
	/**************************************************************************
	 * posiInfo
	 **************************************************************************/
	var posi    = "";
	var width   = 0;
	var height  = 0;
	var tutoImg = [$("#tutorialText"), $("#btn_01")      , $("#btn_02")      , $("#btn_03")      , $("#btn_04")      , 
	               $("#2_btn_06")    , $("#2_btn_07")    , $("#2_btn_08")    , $("#2_btn_09")    , $("#2_btn_10")    ,  
	               $("#tutorialText"), $("#btn_06")      , $("#tutorialText"), $("#btn_07")      , $("#btn_08")      ,  
	               $("#btn_09")      , $("#btn_marker")  , $("#btn_10")      , $("#btn_11")      , $("#btn_12")      ,
	               $("#tutorialText"), $("#btn_13")      , $("#btn_14")      , $("#btn_15")      , $("#btn_16")      , 
	               $("#btn_17")      , $("#btn_18")      , $("#btn_19")      , $("#btn_20")      , $("#tutorialText"), 
	               $("#btn_21")      , $("#btn_22")      , $("#btn_23")      , $("#btn_24")      , $("#btn_25")      , 
	               $("#btn_26")      , $("#tutorialText"), $("#btn_27")      , $("#btn_28")      , $("#btn_29")      , 
	               $("#btn_35")      , $("#btn_36")      , $("#btn_37")      , $("#btn_30")      , $("#btn_31")      , 
	               $("#tutorialText")];
	var pointImg = [4, 4, 4, 4, 4, 
	                2, 2, 2, 2, 2,  
	                1, 4, 1, 2, 4, 
	                2, 4, 4, 4, 4, 
	                1, 4, 4, 4, 4, 
	                2, 2, 4, 4, 1,
	                4, 4, 4, 4, 2,
	                4, 1, 4, 4, 4, 
	                4, 4, 4, 2, 4, 
	                1];

	function posiInfo(i) {
		$workRoad.ui.tutoPointIdx = i;

		if (i < 1) {
			$("#toPoint_1").hide();
			$("#toPoint_2").hide();
			$("#toPoint_3").hide();
			$("#toPoint_4").hide();
		} else if (i == 0 || i == 10 || i == 12 || i == 20 || i == 29 || i == 36 || i == 45){
			posi = tutoImg[i].position();
			width = inner_half_width + 250;
			height = tutoImg[i].height() / 2;
			pointInfo(i, true);
		} else {
			posi = tutoImg[i].position();
			width = tutoImg[i].width() / 2;
			height = tutoImg[i].height() / 2;
			pointInfo(i, true);
		}

		$(window).resize(function() {
			$("#toPoint_1").hide();
			$("#toPoint_2").hide();
			$("#toPoint_3").hide();
			$("#toPoint_4").hide();

			if (this.resizeTO) {
				clearTimeout(this.resizeTO);
			}
			this.resizeTO = setTimeout(function() {
				$(this).trigger('resizeEnd');
			}, 300);

		});
		$(window).on('resizeEnd', function() {
		});
	}

	function pointInfo(i, clicked) {
		if (clicked) {
			$("#toPoint_1").hide();
			$("#toPoint_2").hide();
			$("#toPoint_3").hide();
			$("#toPoint_4").hide();

			$("#toPoint_1").clearQueue().stop();
			$("#toPoint_2").clearQueue().stop();
			$("#toPoint_3").clearQueue().stop();
			$("#toPoint_4").clearQueue().stop();

			switch (pointImg[i]) {
			case 1:
				$("#toPoint_1").css("top", posi.top + (height * 2));
				$("#toPoint_1").css("left", posi.left + width);
				$("#toPoint_2").css("top", posi.top + (height * 2));
				$("#toPoint_2").css("left", posi.left + width);
				$("#toPoint_3").css("top", posi.top + (height * 2));
				$("#toPoint_3").css("left", posi.left + width);
				$("#toPoint_4").css("top", posi.top + (height * 2));
				$("#toPoint_4").css("left", posi.left + width);
				break;
			case 2:
				$("#toPoint_1").css("top", posi.top + (tutoImg[i].height() - $("#toPoint_1").height()) / 2 - 6);
				$("#toPoint_1").css("left", posi.left - 70);
				$("#toPoint_2").css("top", posi.top + (tutoImg[i].height() - $("#toPoint_2").height()) / 2 - 6);
				$("#toPoint_2").css("left", posi.left - 70);
				$("#toPoint_3").css("top", posi.top + (tutoImg[i].height() - $("#toPoint_3").height()) / 2 - 6);
				$("#toPoint_3").css("left", posi.left - 70);
				$("#toPoint_4").css("top", posi.top + (tutoImg[i].height() - $("#toPoint_4").height()) / 2 - 6);
				$("#toPoint_4").css("left", posi.left - 70);
				break;
			case 3:
				$("#toPoint_1").css("top", posi.top - (height * 4));
				$("#toPoint_1").css("left", posi.left + width);
				$("#toPoint_2").css("top", posi.top - (height * 4));
				$("#toPoint_2").css("left", posi.left + width);
				$("#toPoint_3").css("top", posi.top - (height * 4));
				$("#toPoint_3").css("left", posi.left + width);
				$("#toPoint_4").css("top", posi.top - (height * 4));
				$("#toPoint_4").css("left", posi.left + width);
				break;
			case 4:
				$("#toPoint_1").css("top", posi.top + (tutoImg[i].height() - $("#toPoint_1").height()) / 2 - 6);
				$("#toPoint_1").css("left", posi.left + (width * 2));
				$("#toPoint_2").css("top", posi.top + (tutoImg[i].height() - $("#toPoint_2").height()) / 2 - 6);
				$("#toPoint_2").css("left", posi.left + (width * 2));
				$("#toPoint_3").css("top", posi.top + (tutoImg[i].height() - $("#toPoint_3").height()) / 2 - 6);
				$("#toPoint_3").css("left", posi.left + (width * 2));
				$("#toPoint_4").css("top", posi.top + (tutoImg[i].height() - $("#toPoint_4").height()) / 2 - 6);
				$("#toPoint_4").css("left", posi.left + (width * 2));
				break;
			}
		}

		var pointId = "#toPoint_" + pointImg[i];

		switch (pointImg[i]) {
		case 1:
			$(pointId).animate({
				top : posi.top + (height * 2),
				left : posi.left + width
			}, 500, "", function() {
				$(this).animate({
					top : posi.top + (height * 2) + 10,
					left : posi.left + width
				}, 500, "", function() {
					pointInfo(i, false);
				});
			});
			break;
		case 2:
			$(pointId).animate({
				top : posi.top + (tutoImg[i].height() - $("#toPoint_2").height()) / 2 - 6,
				left : posi.left - 70
			}, 500, "", function() {
				$(this).animate({
					top : posi.top + (tutoImg[i].height() - $("#toPoint_2").height()) / 2 - 6,
					left : posi.left - 80
				}, 500, "", function() {
					pointInfo(i, false);
				});
			});
			break;
		case 3:
			$(pointId).animate({
				top : posi.top - (height * 4),
				left : posi.left + width
			}, 500, "", function() {
				$(this).animate({
					top : posi.top - (height * 4) - 10,
					left : posi.left + width
				}, 500, "", function() {
					pointInfo(i, false);
				});
			});
			break;
		case 4:
			$(pointId).animate({
				top : posi.top + (tutoImg[i].height() - $("#toPoint_4").height()) / 2 - 6,
				left : posi.left + (width * 2)
			}, 500, "", function() {
				$(this).animate({
					top : posi.top + (tutoImg[i].height() - $("#toPoint_4").height()) / 2 - 6,
					left : posi.left + (width * 2) + 10
				}, 500, "", function() {
					pointInfo(i, false);
				});
			});
			break;
		}
		if (clicked) {
			$(pointId).show();
		}
	}
	$("body").on("click","#prev",function(){
		prevPage();
	});

	$("body").on("click","#next",function(){
		nextPage();
	});

	
	function prevPage(){
		movePage($workRoad.ui.tutoCurrentPage - 1);
	}
	function nextPage(){
		movePage($workRoad.ui.tutoCurrentPage + 1);
	}
	function reloadPage(){
		movePage($workRoad.ui.tutoCurrentPage);
	}

	function movePage(targetPage) {
		console.log("*** targetPage : "+ targetPage);
		
		$workRoad.ui.tutoCurrentPage = targetPage;
		setInnerSize();
			
		posiInfo(-1);
		$("#tutorialText .title, #tutorialText .content, #tutorialText #moveButtonDiv, #tutorialText #prev, #tutorialText #next").empty();

		// 상단 및 좌측 메뉴 제어
		$("#img_top_11").hide();
		$("#img_top_12").hide();
		$("#img_top_13").hide();
		$("#img_top_14").hide();

		$("#menu_left_1_1").hide();
		$("#menu_left_1_2").hide();
		$("#menu_left_1_3").hide();
		$("#menu_left_1_4").hide();

		$("#img_top_databoard").hide();	
		
		
		if (targetPage < 2){ //첫화면
			$("#img_main_pop").show();
			
		} else if (2<=targetPage && targetPage<=19){ //일자리보기	
			legendDepth = 0; //화면에 안 보임	
			
			$("#img_top_12").css("left", 0);
			$("#img_top_12").css("top" , menu_dep1_top);
			$("#img_top_12").css("z-index" , 1);
			$("#img_top_12").show();
			
			$("#menu_left_1_2").css("left", 0);
			$("#menu_left_1_2").css("top" , menu_dep2_top);
			$("#menu_left_1_2").css("z-index" , 1400);
			$("#menu_left_1_2").show();
			
		} else if (19<targetPage && targetPage<=28){ //오늘의 구인현황
			legendDepth = 1; // 좌측 1단계 메뉴
			
			$("#img_top_11").css("left", 0);
			$("#img_top_11").css("top" , menu_dep1_top);
			$("#img_top_11").css("z-index" , 2);
			$("#img_top_11").show();
			
			$("#menu_left_1_1").css("left", 0);
			$("#menu_left_1_1").css("top" , menu_dep2_top);
			$("#menu_left_1_1").css("z-index" , 2400);
			$("#menu_left_1_1").show();
			
		} else if (28<targetPage && targetPage<=37){ //구인 현황분석
			legendDepth = 1;
			
			$("#img_top_13").css("left", 0);
			$("#img_top_13").css("top" , menu_dep1_top);
			$("#img_top_13").css("z-index" , 3);
			$("#img_top_13").show();
			
			$("#menu_left_1_3").css("left", 0);
			$("#menu_left_1_3").css("top" , menu_dep2_top);
			$("#menu_left_1_3").css("z-index" , 3300);
			$("#menu_left_1_3").show();
			
		} else if (37<targetPage){ //일자리 통계분석
			legendDepth = 2; // 좌측 2단계 메뉴
			
			$("#img_top_14").css("left", 0);
			$("#img_top_14").css("top" , menu_dep1_top);
			$("#img_top_14").css("z-index" , 4);
			$("#img_top_14").show();
			
			$("#menu_left_1_4").css("left", 0);
			$("#menu_left_1_4").css("top" , menu_dep2_top);
			$("#menu_left_1_4").css("z-index" , 4300);
			$("#menu_left_1_4").show();	
		}		

		
		if (2 <= targetPage && targetPage <= $workRoad.ui.tutoLastPage){
			$("#img_top_databoard").css("left", inner_width - $("#img_top_databoard").width() );
			$("#img_top_databoard").css("top" , menu_dep1_top);
			$("#img_top_databoard").css("z-index" , 5);
			$("#img_top_databoard").show();

			
		}
		
		switch (targetPage) {
		case 0:
			/* 숨기기(next) */
			
			img_left = inner_half_width - ($("#map_0_1").width()/2) + $("#menu_left_1_2").width();
			img_left = (0 < img_left) ? 0 : img_left;
			$("#map_0_1").css("left", img_left);
			$("#map_0_1").css("top" , menu_dep2_top );
			$("#map_0_1").css("z-index", 1);
			$("#map_0_1").show();

			$("#img_main_pop").show();
			
			img_left = (inner_width  - $("#img_main_pop").width())/2;
			img_top  = (inner_height - menu_dep2_top -  $("#img_main_pop").height())/2;
			if (img_top < 10) img_top  = 10;
			$("#img_main_pop").css("left", img_left);
			$("#img_main_pop").css("top" , img_top);
			$("#img_main_pop").css("z-index", 2);
			$("#img_main_pop").show();
			
			$("#tutorialText").append("<div class=\"title\"><p><span style=\"margin-left:5px;\"><일자리 맵> 첫 사용을 환영합니다!</span></p></div>"
									+ "<div class=\"content\">"
									+ "<p><일자리 맵>은 <strong style=\"color:#0040ff; font-weight:bold;\">인크루트와 워크넷과 사람인의 구인·구직 정보를 기초로 하여<br>"
									+ "<b>[오늘의 구인현황, 일자리 보기, 구인현황 분석, 일자리 통계분석]</b>의 서비스</strong>를 제공합니다."
									+ "</p></div>");
			
			/* 숨기기(next) */
			$("#btn_01").hide();
					
			break;

		case 1:		
			
			/* 숨기기(next) */
			$("#map_0_1").hide();
			$("#img_main_pop").hide();
			
			img_left = inner_half_width - ($("#map_0_1").width()/2) + $("#menu_left_1_2").width();
			img_left = (0 < img_left) ? 0 : img_left;
			$("#map_0_1").css("left", img_left);
			$("#map_0_1").css("top" , menu_dep2_top );
			$("#map_0_1").css("z-index", 1);
			$("#map_0_1").show();
			
			img_left = (inner_width  - $("#img_main_pop").width())/2;
			img_top  = (inner_height - menu_dep2_top -  $("#img_main_pop").height())/2;
			if (img_top < 10) img_top  = 10;
			$("#img_main_pop").css("left", img_left);
			$("#img_main_pop").css("top" , img_top);
			$("#img_main_pop").css("z-index", 2);
			$("#img_main_pop").show();
			
			img_left = inner_width/2 + 70;
			img_top  = img_top + 572;
			$("#btn_01").css("left",img_left);
			$("#btn_01").css("top" ,img_top);
			$("#btn_01").css("z-index", 101);
			$("#btn_01").show();

			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>손가락이 가리키는 곳을 따라가 보면서 설명을 시작하도록 하겠습니다.<br>"
									+ "첫 화면은 일일의 ‘전체구인, 신규구인, 마감구인’정보와<br>"
									+ "각 메뉴로 연결된 링크가 있습니다.<br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">'일자리 보기' 메뉴로 이동하기 위해, 해당 링크를 선택합니다.</strong>"
									+ "&nbsp;</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#map_2_2").hide();
			$("#img_top_12").hide();
			$("#subMenu21").hide();
			$("#img_top_databoard").hide();
			$("#2_btn_1_on").hide();
			$("#btn_02").hide();
			hide_2_buttons();			
			
			break;
			
		case 2:
			/* 숨기기(prev) */
			$("#map_0_1").hide();
			$("#img_main_pop").hide();
			$("#btn_01").hide();
			hide_2_buttons();	
			
			img_left = inner_half_width - ($("#map_2_1").width()/2) + $("#menu_left_1_2").width();
			if ($("#menu_left_1_2").width() < img_left){
				img_left = $("#menu_left_1_2").width();
			}
			$("#map_2_2").css("left", img_left);
			$("#map_2_2").css("top" , menu_dep2_top );
			$("#map_2_2").css("z-index", 2);
			$("#map_2_2").show();
			
			$("#subMenu21").css("left", $("#menu_left_1_2").width() + 1);
			$("#subMenu21").css("top" , menu_dep2_top);
			$("#subMenu21").css("z-index", 300);
			$("#subMenu21").show();
			
			show_2_buttons();			

			var img_top = (inner_height - 336) < 310 ? 310 : (inner_height - 336);
			$("#2_btn_1_on").css("left", inner_width - $("#2_btn_1_on").width() - 7);
			$("#2_btn_1_on").css("top" , img_top );
			$("#2_btn_1_on").css("z-index", 509);
			$("#2_btn_1_on").show();
			
			$("#btn_02").css("left", 0);
			$("#btn_02").css("top" , menu_dep2_top + 103);
			$("#btn_02").css("z-index", 1500);
			$("#btn_02").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>[일자리보기]는 매일 수집한 워크넷과 인크루트와 사람인의 채용정보를 지도 위에서 볼 수 있습니다. <br>"
									+ "인트로 화면에서 [일자리보기]를 선택하거나, 본 화면에서 [내주변일자리]를 선택하면 <br>"
									+ "화면과 같이, 접속한 지역의 일자리를 조회할 수 있습니다.<br>"
									+ "기본화면으로 조회해 보겠습니다. <strong style=\"color:#ee7c1a; font-weight:bold;\">‘일자리보기’를 선택합니다.</strong><br>"
									+ "</p></div>");
			

			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#map_2_0").hide();
			$("#btn_01").hide();
			$("#btn_03").hide();
			
			break;

		case 3:
			/* 숨기기(prev) */
			$("#map_2_2").hide();
			$("#subMenu21").hide();
			$("#2_btn_1_on").hide();
			$("#btn_02").hide();
			hide_2_buttons();
			
			show_2_buttons();			
			
			img_left = inner_half_width - ($("#map_2_0").width()/2) + $("#menu_left_1_2").width();
			if ($("#menu_left_1_2").width() < img_left){
				img_left = $("#menu_left_1_2").width();
			}
			$("#map_2_0").css("left", img_left);
			$("#map_2_0").css("top" , menu_dep2_top );
			$("#map_2_0").css("z-index", 2);
			$("#map_2_0").show();
			
			$("#btn_03").css("left", img_left + 906);
			$("#btn_03").css("top" , menu_dep2_top + 55);
			$("#btn_03").css("z-index", 301);
			$("#btn_03").show();	
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "‘일자리보기’메뉴의 기본화면입니다.<br>"
									+ "[전국]의 모든 일자리가 나타납니다.<br>"
									+ "지역의 POI를 클릭하면 해당 지역의 일자리 목록이 조회됩니다.<br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘강원도의 POI’를 선택하겠습니다.</strong><br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#map_2_1").hide();
			$("#subMenu20").hide();
			$("#btn_04").hide();	
			
			break;
			
		case 4:
			/* 숨기기(prev) */
			$("#map_2_0").hide();
			$("#btn_03").hide();
			hide_2_buttons();
			
			show_2_buttons();			
			
			img_left = inner_half_width - ($("#map_2_1").width()/2) + $("#menu_left_1_2").width();
			if ($("#menu_left_1_2").width() < img_left){
				img_left = $("#menu_left_1_2").width();
			}
			$("#map_2_1").css("left", img_left);
			$("#map_2_1").css("top" , menu_dep2_top );
			$("#map_2_1").css("z-index", 2);
			$("#map_2_1").show();
			
			$("#subMenu20").css("left", $("#menu_left_1_2").width() + 1);
			$("#subMenu20").css("top" , menu_dep2_top);
			$("#subMenu20").css("z-index", 401);
			$("#subMenu20").show();

			$("#btn_04").css("left", $("#menu_left_1_2").width() + 206);
			$("#btn_04").css("top" , menu_dep2_top + 7 );
			$("#btn_04").css("z-index", 402);
			$("#btn_04").show();						
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "'강원도'의 일자리가 목록으로 나타납니다.<br>"
									+ " <br>"
									+ "상세검색에서 '희망지역'을 '대전광역시 서구'로 변경해 보겠습니다.<br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘상세검색’ 버튼을 선택합니다.</strong><br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#2_pop_01").hide();
			$("#2_btn_06").hide();
			$("#2_pop_b1").hide();
			
			break;

		case 5:

			/* 숨기기(prev) */
//			$("#btn_01").hide();
			$("#btn_04").hide();
			hide_2_buttons();
			
			show_2_buttons();	
			img_left = inner_half_width - ($("#map_2_1").width()/2) + $("#menu_left_1_2").width();
			if ($("#menu_left_1_2").width() < img_left){
				img_left = $("#menu_left_1_2").width();
			}
			$("#map_2_1").css("left", img_left);
			$("#map_2_1").css("top" , menu_dep2_top );
			$("#map_2_1").css("z-index", 2);
			$("#map_2_1").show();

			img_top = inner_half_height- $("#2_pop_01").height()/2 - 4;
			if(img_top < menu_dep1_top) img_top = menu_dep1_top + 2;
			$("#2_pop_01").css("left", inner_half_width - $("#2_pop_01").width() /2 - 4);
			$("#2_pop_01").css("top" , img_top);
			$("#2_pop_01").css("z-index", 502);
			$("#2_pop_01").show();
			
			img_left = $("#2_pop_01").position().left;
			if(inner_height < ($("#2_pop_01").position().top + $("#2_pop_01").height())){
				img_top  = inner_height - $("#2_pop_b1").height();
			} else {
				img_top  = $("#2_pop_01").position().top + $("#2_pop_01").height() - $("#2_pop_b1").height();
			}
			$("#2_pop_b1").css("left", img_left);
			$("#2_pop_b1").css("top" , img_top);
			$("#2_pop_b1").css("z-index", 503);
			$("#2_pop_b1").show();

			img_left = $("#2_pop_01").position().left;
			img_top  = $("#2_pop_01").position().top;
			$("#2_btn_06").css("left", img_left + 144);
			$("#2_btn_06").css("top" , img_top  + 63);
			$("#2_btn_06").css("z-index", 504);
			$("#2_btn_06").show();

			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "희망지역으로 '시도'를 변경하겠습니다.<br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘전체’를 선택합니다.</strong> <br>"
									+ " <br><br>"
									+ "</p></div>");
			posiInfo(targetPage);

			/* 숨기기(next) */
			$("#2_pop_02").hide();
			$("#2_btn_07").hide();	
			
			break;

		case 6:
			/* 숨기기(prev) */
			$("#2_pop_01").hide();
			$("#2_btn_06").hide();
			
			img_top = inner_half_height- $("#2_pop_02").height()/2 - 4;
			if(img_top < menu_dep1_top) img_top = menu_dep1_top + 2;
			$("#2_pop_02").css("left", inner_half_width - $("#2_pop_02").width() /2 - 4);
			$("#2_pop_02").css("top" , img_top);
			$("#2_pop_02").css("z-index", 602);
			$("#2_pop_02").show();
			$("#2_pop_b1").hide();
			
			img_left = $("#2_pop_02").position().left;
			if(inner_height < ($("#2_pop_02").position().top + $("#2_pop_02").height())){
				img_top  = inner_height - $("#2_pop_b1").height();
			} else {
				img_top  = $("#2_pop_02").position().top + $("#2_pop_02").height() - $("#2_pop_b1").height();
			}
			$("#2_pop_b1").css("left", img_left);
			$("#2_pop_b1").css("top" , img_top);
			$("#2_pop_b1").css("z-index", 603);
			$("#2_pop_b1").show();

			img_left = $("#2_pop_02").position().left;
			img_top  = $("#2_pop_02").position().top;
			$("#2_btn_07").css("left", img_left + 146);
			$("#2_btn_07").css("top" , img_top  + 196);
			$("#2_btn_07").css("z-index", 604);
			$("#2_btn_07").show();

			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘대전광역시’를 선택합니다.</strong> <br>"
									+ " <br><br><br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#2_pop_03").hide();
			$("#2_btn_08").hide();	
			
			break;

		case 7:
			/* 숨기기(prev) */
			$("#2_pop_02").hide();
			$("#2_btn_07").hide();	
			
			img_top = inner_half_height- $("#2_pop_03").height()/2 - 4;
			if(img_top < menu_dep1_top) img_top = menu_dep1_top + 2;
			$("#2_pop_03").css("left", inner_half_width - $("#2_pop_03").width() /2 - 4);
			$("#2_pop_03").css("top" , img_top);
			$("#2_pop_03").css("z-index", 702);
			$("#2_pop_03").show();
			$("#2_pop_b1").hide();
			
			img_left = $("#2_pop_03").position().left;
			if(inner_height < ($("#2_pop_03").position().top + $("#2_pop_03").height())){
				img_top  = inner_height - $("#2_pop_b1").height();
			} else {
				img_top  = $("#2_pop_03").position().top + $("#2_pop_03").height() - $("#2_pop_b1").height();
			}
			$("#2_pop_b1").css("left", img_left);
			$("#2_pop_b1").css("top" , img_top);
			$("#2_pop_b1").css("z-index", 703);
			$("#2_pop_b1").show();

			img_left = $("#2_pop_03").position().left;
			img_top  = $("#2_pop_03").position().top;
			$("#2_btn_08").css("left", img_left + 487);
			$("#2_btn_08").css("top" , img_top  + 63);
			$("#2_btn_08").css("z-index", 704);
			$("#2_btn_08").show();

			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "이번엔 '시군구'를 변경하겠습니다.<br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘전체’를 선택합니다.</strong> <br>"
									+ " <br><br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#2_pop_04").hide();
			$("#2_btn_09").hide();	
			
			break;

		case 8:
			/* 숨기기(prev) */
			$("#2_pop_03").hide();
			$("#2_btn_08").hide();
			$("#2_pop_b1").hide();
			
			img_top = inner_half_height- $("#2_pop_04").height()/2 - 4;
			if(img_top < menu_dep1_top) img_top = menu_dep1_top + 2;
			$("#2_pop_04").css("left", inner_half_width - $("#2_pop_04").width() /2 - 4);
			$("#2_pop_04").css("top" , img_top);
			$("#2_pop_04").css("z-index", 802);
			$("#2_pop_04").show();
			
			img_left = $("#2_pop_04").position().left;
			if(inner_height < ($("#2_pop_04").position().top + $("#2_pop_04").height())){
				img_top  = inner_height - $("#2_pop_b1").height();
			} else {
				img_top  = $("#2_pop_04").position().top + $("#2_pop_04").height() - $("#2_pop_b1").height();
			}
			$("#2_pop_b1").css("left", img_left);
			$("#2_pop_b1").css("top" , img_top);
			$("#2_pop_b1").css("z-index", 803);
			$("#2_pop_b1").show();

			img_left = $("#2_pop_04").position().left;
			img_top  = $("#2_pop_04").position().top;
			$("#2_btn_09").css("left", img_left + 489);
			$("#2_btn_09").css("top" , img_top  + 145);
			$("#2_btn_09").css("z-index", 804);
			$("#2_btn_09").show();

			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘서구’를 선택합니다.</strong> <br>"
									+ " <br><br><br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#2_pop_05").hide();
			$("#2_btn_10").hide();	
			
			break;

		case 9:
			/* 숨기기(prev) */
			$("#map_2_1").hide();
			$("#2_pop_04").hide();
			$("#2_btn_09").hide();	
			$("#2_pop_b1").hide();
			
			show_2_buttons();	
			img_left = inner_half_width - ($("#map_2_1").width()/2) + $("#menu_left_1_2").width();
			if ($("#menu_left_1_2").width() < img_left){
				img_left = $("#menu_left_1_2").width();
			}
			$("#map_2_1").css("left", img_left);
			$("#map_2_1").css("top" , menu_dep2_top );
			$("#map_2_1").css("z-index", 2);
			$("#map_2_1").show();

			$("#subMenu20").show();
			
			img_top = inner_half_height- $("#2_pop_05").height()/2 - 4;
			if(img_top < menu_dep1_top) img_top = menu_dep1_top + 2;
			$("#2_pop_05").css("left", inner_half_width - $("#2_pop_05").width() /2 - 4);
			$("#2_pop_05").css("top" , img_top);
			$("#2_pop_05").css("z-index", 902);
			$("#2_pop_05").show();
			
			img_left = $("#2_pop_05").position().left;
			if(inner_height < ($("#2_pop_05").position().top + $("#2_pop_05").height())){
				img_top  = inner_height - $("#2_pop_b1").height();
			} else {
				img_top  = $("#2_pop_05").position().top + $("#2_pop_05").height() - $("#2_pop_b1").height();
			}
			$("#2_pop_b1").css("left", img_left);
			$("#2_pop_b1").css("top" , img_top);
			$("#2_pop_b1").css("z-index", 903);
			$("#2_pop_b1").show();
			
			img_left = $("#2_pop_b1").position().left;
			img_top  = $("#2_pop_b1").position().top;
			$("#2_btn_10").css("left", img_left + 284);
			$("#2_btn_10").css("top" , img_top  + 7);
			$("#2_btn_10").css("z-index", 904);
			$("#2_btn_10").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "희망지역 설정을 마치셨으면<br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘검색’버튼을 선택합니다.</strong> <br>"
									+ " <br><br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#map_2_2").hide();
			$("#2_subMenu1").hide();
			
			break;

		case 10:
			/* 숨기기(prev) */
			$("#map_2_1").hide();
			$("#subMenu20").hide();
			$("#2_pop_05").hide();
			$("#2_btn_10").hide();	
			$("#2_pop_b1").hide();
			hide_2_buttons();
			
			img_left = inner_half_width - ($("#map_2_2").width()/2) + $("#menu_left_1_2").width();
			if ($("#menu_left_1_2").width() < img_left){
				img_left = $("#menu_left_1_2").width();
			}
			$("#map_2_2").css("left", img_left);
			$("#map_2_2").css("top" , menu_dep2_top );
			$("#map_2_2").css("z-index", 2);
			$("#map_2_2").show();
			
			show_2_buttons();
			
			$("#2_subMenu1").css("left", $("#menu_left_1_2").width() + 1);
			$("#2_subMenu1").css("top" , menu_dep2_top);
			$("#2_subMenu1").css("z-index", 502);
			$("#2_subMenu1").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "인크루트와 워크넷과 사람인에 등록된 구인정보가 목록으로 나타납니다. <br>"
									+ "보기선택 창에서 ‘정렬기준’을 변경하실 수 있고, <br>"
									+ "목록의 회사명에 포함된 아이콘을 선택하시거나 ‘모집내용의 제목’을 선택하시면 <br>"
									+ "인크루트 또는 워크넷 또는 사람인의 구인정보 창이 나타납니다."
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#btn_06").hide();
			
			break;

		case 11:
			/* 숨기기(prev) */
			$("#map_2_2").hide();
			$("#2_subMenu1").hide();
			hide_2_buttons();
			
			img_left = inner_half_width - ($("#map_2_2").width()/2) + $("#menu_left_1_2").width();
			if ($("#menu_left_1_2").width() < img_left){
				img_left = $("#menu_left_1_2").width();
			}
			$("#map_2_2").css("left", img_left);
			$("#map_2_2").css("top" , menu_dep2_top );
			$("#map_2_2").css("z-index", 2);
			$("#map_2_2").show();
			
			show_2_buttons();
			
			$("#2_subMenu1").css("left", $("#menu_left_1_2").width() + 1);
			$("#2_subMenu1").css("top" , menu_dep2_top);
			$("#2_subMenu1").css("z-index", 502);
			$("#2_subMenu1").show();
			
			$("#btn_06").css("left",731);
			$("#btn_06").css("top",328);
			$("#btn_06").css("z-index", 503);
			$("#btn_06").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "구인상세정보를 보기 위해<br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘상세 및 통계보기’버튼을 선택합니다.</strong>"
									+ "<br><br><br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#map_2_3").hide();	
			$("#2_subMenu2").hide();	
			$("#2_databoard1").hide();
			$("#btn_07").hide();		
			
			break;

		case 12:

			/* 숨기기(prev) */
			$("#btn_06").hide();
			$("#map_2_2").hide();
			$("#2_subMenu1").hide();			
			hide_2_buttons();
			
			img_left = inner_half_width - ($("#map_2_3").width()/2) + $("#menu_left_1_2").width();
			if ($("#menu_left_1_2").width() < img_left){
				img_left = $("#menu_left_1_2").width();
			}
			$("#map_2_3").css("left", img_left);
			$("#map_2_3").css("top" , menu_dep2_top );
			$("#map_2_3").css("z-index", 2);
			$("#map_2_3").show();
						
			$("#2_subMenu2").css("left", $("#menu_left_1_2").width() + 1);
			$("#2_subMenu2").css("top" , menu_dep2_top);
			$("#2_subMenu2").css("z-index", 602);
			$("#2_subMenu2").show();

			move_2_buttons($("#2_databoard1").width());	
			
			$("#2_databoard1").css("left", inner_width - $("#2_databoard1").width());
			$("#2_databoard1").css("top" , menu_dep1_top );
			$("#2_databoard1").css("z-index", 603);
			$("#2_databoard1").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "지도상에 해당 업체의 위치가 표시되며, <br>"
									+ "데이터보드에는 해당 구인정보와 함께 <br>"
									+ "[생활환경 종합, 종사자 규모별 소득현황, 해당 업종 일자리 추이, 업종별 연령별 평균소득현황,<br>"
									+ "업종별 연령별 중위소득 현황]의 정보가 제공됩니다."
									+ "</p></div>");
			posiInfo(targetPage);			

			/* 숨기기(next) */
			$("#btn_07").hide();		
			
			break;

		case 13:

			/* 숨기기(prev) */	
			$("#btn_07").hide();			
			hide_2_buttons();
			
			img_left = inner_half_width - ($("#map_2_3").width()/2) + $("#menu_left_1_2").width();
			if ($("#menu_left_1_2").width() < img_left){
				img_left = $("#menu_left_1_2").width();
			}
			$("#map_2_3").css("left", img_left);
			$("#map_2_3").css("top" , menu_dep2_top );
			$("#map_2_3").css("z-index", 2);
			$("#map_2_3").show();
						
			$("#2_subMenu2").css("left", $("#menu_left_1_2").width() + 1);
			$("#2_subMenu2").css("top" , menu_dep2_top);
			$("#2_subMenu2").css("z-index", 602);
			$("#2_subMenu2").show();

			move_2_buttons($("#2_databoard1").width());	
			
			$("#2_databoard1").css("left", inner_width - $("#2_databoard1").width());
			$("#2_databoard1").css("top" , menu_dep1_top );
			$("#2_databoard1").css("z-index", 603);
			$("#2_databoard1").show();
			
			$("#btn_07").css("left", inner_width - $("#btn_07").width() - 4);
			$("#btn_07").css("top" , menu_dep1_top - 4);
			$("#btn_07").css("z-index", 604);
			$("#btn_07").show();			

			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "이번에는 지도에서 바로 구인정보를 확인해보겠습니다.<br>"
									+ "<br>"
									+ "먼저 <strong style=\"color:#ee7c1a; font-weight:bold;\">데이터보드를 닫겠습니다.</strong><br>"
									+ "<br>"
									+ "</p></div>");
			posiInfo(targetPage);			

			/* 숨기기(next) */
			$("#btn_08").hide();
			
			break;

		case 14:

			/* 숨기기(prev) */
			$("#map_2_3").hide();
			$("#2_databoard1").hide();
			$("#btn_07").hide();	
			$("#2_subMenu2").hide();
			hide_2_buttons();
			
			img_left = inner_half_width - ($("#map_2_3").width()/2) + $("#menu_left_1_2").width();
			if ($("#menu_left_1_2").width() < img_left){
				img_left = $("#menu_left_1_2").width();
			}
			$("#map_2_3").css("left", img_left);
			$("#map_2_3").css("top" , menu_dep2_top );
			$("#map_2_3").css("z-index", 2);
			$("#map_2_3").show();
			
			$("#2_subMenu2").css("left", $("#menu_left_1_2").width() + 1);
			$("#2_subMenu2").css("top" , menu_dep2_top);
			$("#2_subMenu2").css("z-index", 702);
			$("#2_subMenu2").show();
			
			show_2_buttons();
			
			$("#btn_08").css("left", $("#2_subMenu2").width() + $("#menu_left_1_2").width() - $("#btn_08").width() - 4);
			$("#btn_08").css("top" , menu_dep2_top -4);
			$("#btn_08").css("z-index", 703);
			$("#btn_08").show();

			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">주메뉴를 닫습니다.</strong> <br>"
									+ " <br>"
									+ " <br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);

			/* 숨기기(next) */
			$("#btn_09").hide();
			$("#map_2_btn1").hide();
			
			break;

		case 15:

			/* 숨기기(prev) */
			$("#map_2_3").hide();
			$("#2_subMenu2").hide();
			$("#btn_08").hide();
			hide_2_buttons();		

			show_2_buttons();
			
			img_left = inner_half_width - ($("#map_2_3").width()/2) + $("#menu_left_1_2").width();
			if ($("#menu_left_1_2").width() < img_left){
				img_left = $("#menu_left_1_2").width();
			}
			$("#map_2_3").css("left", img_left);
			$("#map_2_3").css("top" , menu_dep2_top );
			$("#map_2_3").css("z-index", 2);
			$("#map_2_3").show();

			$("#map_2_btn1").css("left", $("#menu_left_1_2").width() + 1);
			$("#map_2_btn1").css("top" , menu_dep2_top + 1);
			$("#map_2_btn1").css("z-index", 1499);
			$("#map_2_btn1").show();
			
			$("#btn_09").css("left", inner_width - $("#2_btn_9").width() - 7);
			$("#btn_09").css("top" , 179);
			$("#btn_09").css("z-index", 1110);
			$("#btn_09").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "지도를 확대하기 위해 <br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘마우스 휠 이용↑’</strong> 또는 우측 상단의 <strong style=\"color:#ee7c1a; font-weight:bold;\">‘확대버튼’</strong>을 선택합니다.<br>"
									+ " <br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
		    
			/* 숨기기(next) */
			$("#map_2_4").hide();
			$("#btn_marker").hide();
			
			break;

		case 16:

			/* 숨기기(prev) */
			$("#map_2_3").hide();
			$("#btn_09").hide();
			hide_2_buttons();		

			show_2_buttons();
			
			img_left = inner_half_width - ($("#map_2_4").width()/2) + $("#menu_left_1_2").width();
			if ($("#menu_left_1_2").width() < img_left){
				img_left = $("#menu_left_1_2").width();
			}
			$("#map_2_4").css("left", img_left);
			$("#map_2_4").css("top" , menu_dep2_top );
			$("#map_2_4").css("z-index", 2);
			$("#map_2_4").show();
			
			$("#btn_marker").css("left", img_left + 482);
			$("#btn_marker").css("top" , menu_dep2_top + 385);
			$("#btn_marker").css("z-index", 1602);
			$("#btn_marker").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "원하는 채용업체가 보일때까지 지도를 확대하신 후, <br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">업체의 마커를 선택합니다. </strong> <br>"
									+ "<br><br>"
									+ "</p></div>");
			posiInfo(targetPage);

			/* 숨기기(next) */
			$("#map_2_5").hide();
			$("#btn_10").hide();
			
			break;

		case 17:

			/* 숨기기(prev) */
			$("#map_2_4").hide();
			$("#btn_marker").hide();
			hide_2_buttons();		

			show_2_buttons();
			
			img_left = inner_half_width - ($("#map_2_5").width()/2) + $("#menu_left_1_2").width();
			if ($("#menu_left_1_2").width() < img_left){
				img_left = $("#menu_left_1_2").width();
			}
			$("#map_2_5").css("left", img_left);
			$("#map_2_5").css("top" , menu_dep2_top );
			$("#map_2_5").css("z-index", 2);
			$("#map_2_5").show();
			
			$("#btn_10").css("left", img_left + 363);
			$("#btn_10").css("top" , menu_dep2_top + 315);
			$("#btn_10").css("z-index", 1702);
			$("#btn_10").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">툴팁을 선택합니다. </strong> <br><br><br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);

			/* 숨기기(next) */
			$("#map_2_6").hide();
			$("#map_2_5_databoard1").hide();
			$("#btn_11").hide();
			break;

		case 18:

			/* 숨기기(prev) */
			$("#map_2_5").hide();
			$("#btn_10").hide();
			hide_2_buttons();
			
			img_left = inner_half_width - ($("#map_2_6").width()/2) + $("#menu_left_1_2").width();
			if ($("#menu_left_1_2").width() < img_left){
				img_left = $("#menu_left_1_2").width();
			}
			$("#map_2_6").css("left", img_left);
			$("#map_2_6").css("top" , menu_dep2_top );
			$("#map_2_6").css("z-index", 2);
			$("#map_2_6").show();

			move_2_buttons($("#2_databoard1").width());	
			
			$("#map_2_5_databoard1").css("left", inner_width - $("#map_2_5_databoard1").width());
			$("#map_2_5_databoard1").css("top" , menu_dep1_top );
			$("#map_2_5_databoard1").css("z-index", 1002);
			$("#map_2_5_databoard1").show();
			
			$("#btn_11").css("left", inner_width - $("#map_2_5_databoard1").width() + 10);
			$("#btn_11").css("top" , menu_dep1_top + 413);
			$("#btn_11").css("z-index", 1003);
			$("#btn_11").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "선택하신 업체의 구인 상세정보가 데이터보드에 나타납니다. <br>"
									+ "원구인정보를 보기 위해서 표의 <strong style=\"color:#ee7c1a; font-weight:bold;\">‘모집내용’ 제목을 선택</strong>해보겠습니다.<br>"
									+ "<br><br>"
									+ "</p></div>");
			posiInfo(targetPage);

			/* 숨기기(next) */
			$("#map_2_5_img1").hide();
			$("#btn_12").hide();
			
			break;
			
		case 19:
			/* 숨기기(prev) */
			$("#map_2_6").hide();
			$("#map_2_5_databoard1").hide();
			$("#btn_11").hide();
			$("#map_2_btn1").hide();
			hide_2_buttons();
			
			img_left = inner_half_width - ($("#map_2_6").width()/2) + $("#menu_left_1_2").width();
			if ($("#menu_left_1_2").width() < img_left){
				img_left = $("#menu_left_1_2").width();
			}
			$("#map_2_6").css("left", img_left);
			$("#map_2_6").css("top" , menu_dep2_top );
			$("#map_2_6").css("z-index", 2);
			$("#map_2_6").show();

			move_2_buttons($("#2_databoard1").width());	
			
			$("#map_2_btn1").css("left", $("#menu_left_1_2").width() + 1);
			$("#map_2_btn1").css("top" , menu_dep2_top + 1);
			$("#map_2_btn1").css("z-index", 1101);
			$("#map_2_btn1").show();
			
			$("#map_2_5_databoard1").css("left", inner_width - $("#map_2_5_databoard1").width());
			$("#map_2_5_databoard1").css("top" , menu_dep1_top );
			$("#map_2_5_databoard1").css("z-index", 1102);
			$("#map_2_5_databoard1").show();
			
			img_left = (inner_width  - $("#map_2_5_img1").width())/2;
			if(img_left <  $("#menu_left_1_2").width()) img_left =  $("#menu_left_1_2").width() + 5;
			$("#map_2_5_img1").css("left", img_left);
			$("#map_2_5_img1").css("top" , menu_dep2_top + 50);
			$("#map_2_5_img1").css("z-index", 4500);
			$("#map_2_5_img1").show();
			
			$("#btn_12").css("left", 0);
			$("#btn_12").css("top" , menu_dep2_top - 3);
			$("#btn_12").css("z-index", 1500);
			$("#btn_12").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "워크넷이나 인크루트나 사람인에 등록된 구인정보를 새 창에서 보실 수 있습니다.<br>"
									+ " <br>"
									+ "다음은 [오늘의 구인 현황]에 대하여 알아보겠습니다.<br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">[오늘의 구인현황]을 선택합니다.</strong><br>"
									+ "</p></div>");
			posiInfo(targetPage);

			/* 숨기기(next) */
			$("#1_subMenu1").hide();
			$("#map_1_1").hide();
			$("#1_subMenu_1").hide();
			hideLegend();
			break;

			
		case 20:
			/* 숨기기(prev) */
			$("#map_2_3").hide();
			$("#map_2_4").hide();
			$("#map_2_6").hide();
			$("#map_2_5_img1").hide();
			$("#map_2_btn1").hide();
			$("#map_2_5_databoard1").hide();
			$("#btn_12").hide();
			$("#map_2_5").hide();
			$("#2_btn_9").hide();		

			img_left = inner_half_width - ($("#map_1_1").width()/2) + $("#menu_left_1_1").width();
			if ($("#menu_left_1_1").width() < img_left){
				img_left = $("#menu_left_1_1").width();
			}
			$("#map_1_1").css("left", img_left);
			$("#map_1_1").css("top" , menu_dep2_top );
			$("#map_1_1").css("z-index", 2);
			$("#map_1_1").show();
			
			showLegend();
			
			$("#1_subMenu_1").css("left", $("#menu_left_1_1").width() + 1);
			$("#1_subMenu_1").css("top" , menu_dep2_top);
			$("#1_subMenu_1").css("z-index",1202);
			$("#1_subMenu_1").show();	
			
			$("#2_btn_9").css("left", inner_width - $("#2_btn_9").width() - 3);
			$("#2_btn_9").css("top" , 182);
			$("#2_btn_9").css("z-index", 4300);
			$("#2_btn_9").show();		
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>"
									+ "‘오늘의 구인현황’  화면입니다. 워크넷과 인크루트와 사람인에 올라온 구인업체수와 인원수를<br>"
									+ "전국/시도/시군구별로 확인할 수 있습니다.<br>"
									+ "주 메뉴에는 ‘구인업체/구직자’ 정보가 표와 차트로 나타납니다.<br>"
									+ "<br>"
									+ "</p></div>");
			posiInfo(targetPage);

			/* 숨기기(next) */
			$("#btn_13").hide();
			
			break;

		case 21 :
			/* 숨기기(prev) */
			$("#map_1_1").hide();
			$("#1_subMenu_1").hide();
			$("#btn_13").hide();


			img_left = inner_half_width - ($("#map_1_1").width()/2) + $("#menu_left_1_1").width();
			if ($("#menu_left_1_1").width() < img_left){
				img_left = $("#menu_left_1_1").width();
			}
			$("#map_1_1").css("left", img_left);
			$("#map_1_1").css("top" , menu_dep2_top );
			$("#map_1_1").css("z-index", 2);
			$("#map_1_1").show();
			
			$("#1_subMenu_1").css("left", $("#menu_left_1_1").width() + 1);
			$("#1_subMenu_1").css("top" , menu_dep2_top);
			$("#1_subMenu_1").css("z-index",1302);
			$("#1_subMenu_1").show();

			$("#btn_13").css("left",  $("#menu_left_1_1").width() + 14);
			$("#btn_13").css("top" , menu_dep2_top + 59);
			$("#btn_13").css("z-index", 1303);
			$("#btn_13").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "좀 더 상세한 정보를 조회하기 위해, 대상 지역을 ‘대전광역시’로 설정해 보겠습니다.<br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘전체’를 선택합니다.</strong><br>"
									+ "<br>"
									+ "<br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#1_subMenu_2").hide();
			$("#btn_14").hide();
			
			break;

		case 22 :
			/* 숨기기(prev) */
			$("#map_1_1").hide();
			$("#1_subMenu_1").hide();
			$("#btn_13").hide();


			img_left = inner_half_width - ($("#map_1_1").width()/2) + $("#menu_left_1_1").width();
			if ($("#menu_left_1_1").width() < img_left){
				img_left = $("#menu_left_1_1").width();
			}
			$("#map_1_1").css("left", img_left);
			$("#map_1_1").css("top" , menu_dep2_top );
			$("#map_1_1").css("z-index", 2);
			$("#map_1_1").show();
			
			$("#1_subMenu_1").css("left", $("#menu_left_1_1").width() + 1);
			$("#1_subMenu_1").css("top" , menu_dep2_top);
			$("#1_subMenu_1").css("z-index",1402);
			$("#1_subMenu_1").show();

			$("#1_subMenu_2").css("left", $("#menu_left_1_1").width() + 18);
			$("#1_subMenu_2").css("top" , menu_dep2_top + 62);
			$("#1_subMenu_2").css("z-index",1403);
			$("#1_subMenu_2").show();	
			
			$("#btn_14").css("left",  $("#menu_left_1_1").width() + 16);
			$("#btn_14").css("top" , menu_dep2_top + 190);
			$("#btn_14").css("z-index", 1404);
			$("#btn_14").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘대전광역시’를 선택합니다.</strong> <br>"
									+ "<br>"
									+ " <br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#map_1_2").hide();
			$("#1_subMenu_3").hide();	
			$("#btn_15").hide();
			
			break;

		case 23 :
			/* 숨기기(prev) */
			$("#map_1_1").hide();
			$("#1_subMenu_1").hide();
			$("#1_subMenu_2").hide();	
			$("#btn_14").hide();

			img_left = inner_half_width - ($("#map_1_2").width()/2) + $("#menu_left_1_1").width();
			if ($("#menu_left_1_1").width() < img_left){
				img_left = $("#menu_left_1_1").width();
			}
			$("#map_1_2").css("left", img_left);
			$("#map_1_2").css("top" , menu_dep2_top );
			$("#map_1_2").css("z-index", 2);
			$("#map_1_2").show();
			
			$("#1_subMenu_3").css("left", $("#menu_left_1_1").width() + 1);
			$("#1_subMenu_3").css("top" , menu_dep2_top);
			$("#1_subMenu_3").css("z-index",1502);
			$("#1_subMenu_3").show();	
			
			$("#btn_15").css("left",  $("#menu_left_1_1").width() + 464);
			$("#btn_15").css("top" , menu_dep2_top + 320);
			$("#btn_15").css("z-index", 1503);
			$("#btn_15").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "대전광역시의 ‘구인업체수/구인자수‘ 정보가 나타납니다.<br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">그래프의 ‘전체구인자수’ 꺾은선을 선택</strong>하여, ‘상세메뉴’로 이동합니다. <br>"
									+ " <br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#1_subMenu_4").hide();	
			$("#btn_16").hide();
			break;

		case 24 :
			/* 숨기기(prev) */
			$("#1_subMenu_3").hide();
			$("#btn_15").hide();	
			

			img_left = inner_half_width - ($("#map_1_2").width()/2) + $("#menu_left_1_1").width();
			if ($("#menu_left_1_1").width() < img_left){
				img_left = $("#menu_left_1_1").width();
			}
			$("#map_1_2").css("left", img_left);
			$("#map_1_2").css("top" , menu_dep2_top );
			$("#map_1_2").css("z-index", 2);
			$("#map_1_2").show();
			
			$("#1_subMenu_4").css("left", $("#menu_left_1_1").width() + 1);
			$("#1_subMenu_4").css("top" , menu_dep2_top);
			$("#1_subMenu_4").css("z-index",1602);
			$("#1_subMenu_4").show();	
			
			$("#btn_16").css("left",  $("#menu_left_1_1").width() + 570);
			$("#btn_16").css("top" , menu_dep2_top + 96);
			$("#btn_16").css("z-index", 1603);
			$("#btn_16").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "상세메뉴 <strong style=\"color:#ee7c1a; font-weight:bold;\">그래프의 포인트를 선택</strong>하면 해당일자의 ‘구인’정보가 지도에 나타납니다. <br>"
									+ " <br>"
									+ " <br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#map_1_3").hide();
			$("#1_subMenu_5").hide();	
			$("#btn_17").hide();
			
			break;

		case 25 :
			/* 숨기기(prev) */
			$("#map_1_2").hide();
			$("#1_subMenu_4").hide();	
			$("#btn_16").hide();
			
			img_left = inner_half_width - ($("#map_1_3").width()/2) + $("#menu_left_1_1").width();
			if ($("#menu_left_1_1").width() < img_left){
				img_left = $("#menu_left_1_1").width();
			}
			$("#map_1_3").css("left", img_left);
			$("#map_1_3").css("top" , menu_dep2_top );
			$("#map_1_3").css("z-index", 2);
			$("#map_1_3").show();
			
			$("#1_subMenu_5").css("left", $("#menu_left_1_1").width() + 1);
			$("#1_subMenu_5").css("top" , menu_dep2_top);
			$("#1_subMenu_5").css("z-index",1702);
			$("#1_subMenu_5").show();	
			
			$("#btn_17").css("left", inner_width - $("#btn_17").width());
			$("#btn_17").css("top" , menu_dep1_top );
			$("#btn_17").css("z-index", 1703);
			$("#btn_17").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "조회된 전체 정보를 확인하기 위해 <strong style=\"color:#ee7c1a; font-weight:bold;\">‘데이터보드’를 선택합니다.</strong><br>"
									+ " <br>"
									+ " <br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#1_databoard_1").hide();
			$("#btn_18").hide();
			
			$("#2_btn_9").css("z-index", 4300);
			
			break;

		case 26 :
			/* 숨기기(prev) */		
			$("#map_1_3").hide();
			$("#1_subMenu_5").hide();
			$("#btn_17").hide();
			$("#2_btn_9").css("z-index", 0);
		
			img_left = inner_half_width - ($("#map_1_3").width()/2) + $("#menu_left_1_1").width();
			if ($("#menu_left_1_1").width() < img_left){
				img_left = $("#menu_left_1_1").width();
			}
			$("#map_1_3").css("left", img_left);
			$("#map_1_3").css("top" , menu_dep2_top );
			$("#map_1_3").css("z-index", 2);
			$("#map_1_3").show();
			
			$("#1_subMenu_5").css("left", $("#menu_left_1_1").width() + 1);
			$("#1_subMenu_5").css("top" , menu_dep2_top);
			$("#1_subMenu_5").css("z-index",1802);
			$("#1_subMenu_5").show();
			
			$("#1_databoard_1").css("left", inner_width - $("#1_databoard_1").width());
			$("#1_databoard_1").css("top" , menu_dep1_top );
			$("#1_databoard_1").css("z-index", 1803);
			$("#1_databoard_1").show();		
			
			$("#btn_18").css("left", inner_width - $("#btn_18").width() - 68);
			$("#btn_18").css("top" , menu_dep1_top + 395 );
			$("#btn_18").css("z-index", 1804);
			$("#btn_18").show();		
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "데이터보드 그래프에서  <strong style=\"color:#ee7c1a; font-weight:bold;\">‘서구’를 선택</strong>하면  지도상의 ‘서구’에 해당정보가 나타납니다. <br>"
									+ " <br>"
									+ " <br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#map_1_4").hide();
			$("#1_databoard_2").hide();	
			$("#btn_19").hide();		
			break;

		case 27 :
			/* 숨기기(prev) */
			$("#map_1_3").hide();
			$("#1_subMenu_5").hide();
			$("#1_databoard_1").hide();
			$("#btn_18").hide();	

			img_left = inner_half_width - ($("#map_1_4").width()/2) + $("#menu_left_1_1").width();
			if ($("#menu_left_1_1").width() < img_left){
				img_left = $("#menu_left_1_1").width();
			}
			$("#map_1_4").css("left", img_left);
			$("#map_1_4").css("top" , menu_dep2_top );
			$("#map_1_4").css("z-index", 2);
			$("#map_1_4").show();
			
			$("#1_subMenu_5").css("left", $("#menu_left_1_1").width() + 1);
			$("#1_subMenu_5").css("top" , menu_dep2_top);
			$("#1_subMenu_5").css("z-index",1902);
			$("#1_subMenu_5").show();
			
			$("#1_databoard_2").css("left", inner_width - $("#1_databoard_2").width());
			$("#1_databoard_2").css("top" , menu_dep1_top );
			$("#1_databoard_2").css("z-index", 1903);
			$("#1_databoard_2").show();		

			$("#btn_19").css("left", inner_width - 275);
			$("#btn_19").css("top" , menu_dep1_top + 266 );
			$("#btn_19").css("z-index", 1904);
			$("#btn_19").show();	
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘표’를 선택합니다.</strong> <br>"
									+ " <br>"
									+ " <br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#1_databoard_3").hide();	
			$("#btn_20").hide();	
			
			break;

		case 28 :
			/* 숨기기(prev) */
			$("#map_1_4").hide();
			$("#1_subMenu_5").hide();
			$("#1_databoard_2").hide();	
			$("#btn_19").hide();		


			img_left = inner_half_width - ($("#map_1_4").width()/2) + $("#menu_left_1_1").width();
			if ($("#menu_left_1_1").width() < img_left){
				img_left = $("#menu_left_1_1").width();
			}
			$("#map_1_4").css("left", img_left);
			$("#map_1_4").css("top" , menu_dep2_top );
			$("#map_1_4").css("z-index", 2);
			$("#map_1_4").show();
			
			$("#1_subMenu_5").css("left", $("#menu_left_1_1").width() + 1);
			$("#1_subMenu_5").css("top" , menu_dep2_top);
			$("#1_subMenu_5").css("z-index",1902);
			$("#1_subMenu_5").show();
			
			$("#1_databoard_3").css("left", inner_width - $("#1_databoard_3").width());
			$("#1_databoard_3").css("top" , menu_dep1_top );
			$("#1_databoard_3").css("z-index", 2001);
			$("#1_databoard_3").show();		
			
			$("#btn_20").css("left", 0);
			$("#btn_20").css("top" , 395 );
			$("#btn_20").css("z-index", 2402);
			$("#btn_20").show();	
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "‘대전광역시’의 시군구별 구인정보가 표 형태로 나타나며,<br>"
									+ "‘엑셀다운’버튼을 누르면, 표를 다운로드 받으실 수 있습니다. <br>"
									+ "이번에는 [구인 현황분석]메뉴에 대하여 알아보겠습니다.<br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">[구인 현황분석]을 선택합니다.</strong>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#map_3_1").hide();	
			$("#3_subMenu_1").hide();
			$("#3_subMenu_b1").hide();
			$("#btn_white").hide();
			
			$("#2_btn_9").css("z-index", 0);
			
			break;
			
/*********************************************************************************************************************/
/*            [메뉴: 구인현황분석]                                                                                       */
/*********************************************************************************************************************/
		case 29 :
			/* 숨기기(prev) */
			$("#map_1_4").hide();
			$("#1_subMenu_5").hide();
			$("#1_databoard_3").hide();		
			$("#btn_20").hide();	

			show_2_buttons();
			
			$("#2_btn_9").css("z-index", 4300);

			img_left = inner_half_width - ($("#map_3_1").width()/2) + $("#menu_left_1_3").width();
			if ($("#menu_left_1_3").width() < img_left){
				img_left = $("#menu_left_1_3").width();
			}
			$("#map_3_1").css("left", img_left);
			$("#map_3_1").css("top" , menu_dep2_top );
			$("#map_3_1").css("z-index", 2);
			$("#map_3_1").show();	
			
			$("#3_subMenu_1").css("left", $("#menu_left_1_3").width() + 1);
			$("#3_subMenu_1").css("top" , menu_dep2_top);
			$("#3_subMenu_1").css("z-index",2102);
			$("#3_subMenu_1").show();	
			
			$("#btn_white").css("left", $("#3_subMenu_1").position().left );
			$("#btn_white").css("top" , $("#3_subMenu_1").position().top + 580);
			$("#btn_white").css("z-index", 2103);
			$("#btn_white").show();
			
			$("#3_subMenu_b1").css("left", $("#menu_left_1_3").width() + 1);
			$("#3_subMenu_b1").css("top" , inner_height - $("#3_subMenu_b1").height());
			$("#3_subMenu_b1").css("z-index",2104);
			$("#3_subMenu_b1").show();	
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "[구인 현황분석]에서는 업종 직종 등의 선택 조건에 따라<br>"
									+ "일의 구인수와 업체 수를 조회할 수 있습니다.<br>"
									+ "어떠한 일자리가 있는지 ‘해당분류 세부항목’에 조건을 넣어 검색해보기로 하겠습니다.<br>"
									+ "<br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#btn_21").hide();	

			break;

		case 30 :
			/* 숨기기(prev) */		

			img_left = inner_half_width - ($("#map_3_1").width()/2) + $("#menu_left_1_3").width();
			if ($("#menu_left_1_3").width() < img_left){
				img_left = $("#menu_left_1_3").width();
			}
			$("#map_3_1").css("left", img_left);
			$("#map_3_1").css("top" , menu_dep2_top );
			$("#map_3_1").css("z-index", 2);
			$("#map_3_1").show();	
			
			$("#3_subMenu_1").css("left", $("#menu_left_1_3").width() + 1);
			$("#3_subMenu_1").css("top" , menu_dep2_top);
			$("#3_subMenu_1").css("z-index",2102);
			$("#3_subMenu_1").show();	
			
			$("#btn_white").css("left", $("#3_subMenu_1").position().left );
			$("#btn_white").css("top" , $("#3_subMenu_1").position().top + 580);
			$("#btn_white").css("z-index", 2103);
			$("#btn_white").show();
			
			$("#3_subMenu_b1").css("left", $("#menu_left_1_3").width() + 1);
			$("#3_subMenu_b1").css("top" , inner_height - $("#3_subMenu_b1").height());
			$("#3_subMenu_b1").css("z-index",2104);
			$("#3_subMenu_b1").show();	

			$("#btn_21").css("left", $("#menu_left_1_3").width() + 9);
			$("#btn_21").css("top" , menu_dep2_top + 140 );
			$("#btn_21").css("z-index", 2103);
			$("#btn_21").show();	
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "전국의 일자리를 대상으로 조회할 것이므로 ‘지역선택’은 하지 않습니다.<br>"
									+ "‘분석대상선택’에서는 <strong style=\"color:#ee7c1a; font-weight:bold;\">‘구인수’를 선택합니다.</strong><br>"
									+ "<br><br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#btn_22").hide();	
			break;

		case 31 :
			/* 숨기기(prev) */
			$("#map_3_1").hide();		
			$("#3_subMenu_1").hide();
			$("#3_subMenu_b1").hide();
			$("#btn_21").hide();			

			img_left = inner_half_width - ($("#map_3_1").width()/2) + $("#menu_left_1_3").width();
			if ($("#menu_left_1_3").width() < img_left){
				img_left = $("#menu_left_1_3").width();
			}
			$("#map_3_1").css("left", img_left);
			$("#map_3_1").css("top" , menu_dep2_top );
			$("#map_3_1").css("z-index", 2);
			$("#map_3_1").show();		
			
			$("#3_subMenu_1").css("left", $("#menu_left_1_3").width() + 1);
			$("#3_subMenu_1").css("top" , menu_dep2_top);
			$("#3_subMenu_1").css("z-index",2201);
			$("#3_subMenu_1").show();	
			
			$("#btn_white").css("left", $("#3_subMenu_1").position().left );
			$("#btn_white").css("top" , $("#3_subMenu_1").position().top + 580);
			$("#btn_white").css("z-index", 2202);
			$("#btn_white").show();
			
			$("#3_subMenu_b1").css("left", $("#menu_left_1_3").width() + 1);
			$("#3_subMenu_b1").css("top" , inner_height - $("#3_subMenu_b1").height());
			$("#3_subMenu_b1").css("z-index",2203);
			$("#3_subMenu_b1").show();	

			$("#btn_22").css("left", $("#menu_left_1_3").width() + 7);
			$("#btn_22").css("top" , menu_dep2_top + 224 );
			$("#btn_22").css("z-index", 2204);
			$("#btn_22").show();	
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "분석조건에서는 <strong style=\"color:#ee7c1a; font-weight:bold;\">‘업종별 수’를 선택합니다.</strong><br>"
									+ " <br>"
									+ " <br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#3_subMenu_2").hide();	
			$("#3_subMenu_b2").hide();	
			$("#btn_23").hide();		
			
			break;

		case 32 :
			/* 숨기기(prev) */
			$("#3_subMenu_1").hide();
			$("#3_subMenu_b1").hide();
			$("#btn_22").hide();	

			show_2_buttons();
			
			img_left = inner_half_width - ($("#map_3_1").width()/2) + $("#menu_left_1_3").width();
			if ($("#menu_left_1_3").width() < img_left){
				img_left = $("#menu_left_1_3").width();
			}
			$("#map_3_1").css("left", img_left);
			$("#map_3_1").css("top" , menu_dep2_top );
			$("#map_3_1").css("z-index", 2);
			$("#map_3_1").show();	
			
			$("#3_subMenu_2").css("left", $("#menu_left_1_3").width() + 1);
			$("#3_subMenu_2").css("top" , menu_dep2_top);
			$("#3_subMenu_2").css("z-index",2302);
			$("#3_subMenu_2").show();	
			
			$("#btn_white").css("left", $("#3_subMenu_2").position().left );
			$("#btn_white").css("top" , $("#3_subMenu_2").position().top + 580);
			$("#btn_white").css("z-index", 2303);
			$("#btn_white").show();
			
			$("#3_subMenu_b2").css("left", $("#menu_left_1_3").width() + 1);
			$("#3_subMenu_b2").css("top" , inner_height - $("#3_subMenu_b1").height());
			$("#3_subMenu_b2").css("z-index",2304);
			$("#3_subMenu_b2").show();	
			img_left = $("#3_subMenu_b2").position().left;
			img_top  = $("#3_subMenu_b2").position().top ;
			
			$("#btn_23").css("left", img_left + 404);
			$("#btn_23").css("top" , img_top  + 8  );
			$("#btn_23").css("z-index", 2305);
			$("#btn_23").show();	
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "나타난 분석세부항목 창에서 <strong style=\"color:#ee7c1a; font-weight:bold;\">하단의 ‘통계보기’버튼을 선택합니다.</strong><br>"
									+ " <br>"
									+ " <br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#map_3_2").hide();	
			$("#3_subMenu_4").hide();
			$("#btn_24").hide();
			$("#2_btn_8").hide();			
			
			break;

		case 33 :
			/* 숨기기(prev) */
			$("#map_3_1").hide();	
			$("#3_subMenu_2").hide();
			$("#3_subMenu_b2").hide();
			$("#btn_23").hide();	
			$("#2_btn_9").hide();	
			$("#btn_white").hide();			

			img_left = inner_half_width - ($("#map_3_2").width()/2) + $("#menu_left_1_3").width();
			if ($("#menu_left_1_3").width() < img_left){
				img_left = $("#menu_left_1_3").width();
			}
			$("#map_3_2").css("left", img_left);
			$("#map_3_2").css("top" , menu_dep2_top );
			$("#map_3_2").css("z-index", 2);
			$("#map_3_2").show();	
			
			$("#3_subMenu_4").css("left", $("#menu_left_1_3").width() + 1);
			$("#3_subMenu_4").css("top" , menu_dep2_top);
			$("#3_subMenu_4").css("z-index",2402);
			$("#3_subMenu_4").show();
			
			$("#btn_24").css("left", $("#menu_left_1_3").width() + 362);
			$("#btn_24").css("top" , menu_dep2_top + 3 );
			$("#btn_24").css("z-index", 2403);
			$("#btn_24").show();	
			
			$("#2_btn_8").css("left", inner_width - $("#2_btn_8").width() - 5);
			$("#2_btn_8").css("top" , 182);
			$("#2_btn_8").css("z-index", 4300);
			$("#2_btn_8").show();			
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "선택항목 창에는 선택한 검색조건이 목록으로 나타나게 되며,<br>"
									+ "해당 검색 결과가 지도 위에 나타납니다. <br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">통계표출 버튼을 선택</strong>하시면 지도 위에 통계수치가 나타납니다.<br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#map_3_3").hide();	
			$("#3_subMenu_5").hide();	
			$("#btn_25").hide();
			$("#3_tooltip_0").hide();
			$("#3_tooltip_1").hide();	
			
			break;

		case 34 :
			/* 숨기기(prev) */
			$("#map_3_2").hide();	
			$("#3_subMenu_4").hide();
			$("#btn_24").hide();	
			$("#2_btn_8").hide();		

			img_left = inner_half_width - ($("#map_3_3").width()/2) + $("#menu_left_1_3").width();
			if ($("#menu_left_1_3").width() < img_left){
				img_left = $("#menu_left_1_3").width();
			}
			$("#map_3_3").css("left", img_left);
			$("#map_3_3").css("top" , menu_dep2_top );
			$("#map_3_3").css("z-index", 2);
			$("#map_3_3").show();	

			$("#3_tooltip_0").css("left", img_left + 984);
			$("#3_tooltip_0").css("top" , menu_dep2_top + 274);
			$("#3_tooltip_0").css("z-index", 2501);
			$("#3_tooltip_0").show();	

			$("#3_tooltip_1").css("left", inner_half_width - ($("#3_tooltip_1").width()/2) + $("#menu_left_1_3").width() + 355);
			$("#3_tooltip_1").css("top" , menu_dep2_top + 374);
			$("#3_tooltip_1").css("z-index", 2502);
			$("#3_tooltip_1").hide();	

			$("#3_subMenu_5").css("left", $("#menu_left_1_3").width() + 1);
			$("#3_subMenu_5").css("top" , menu_dep2_top);
			$("#3_subMenu_5").css("z-index",2503);
			$("#3_subMenu_5").show();	

			$("#2_btn_8").css("left", inner_width -  $("#2_btn_8").width() - 5);
			$("#2_btn_8").css("top" , 182);
			$("#2_btn_8").css("z-index", 2504);
			$("#2_btn_8").show();	
			
			$("#btn_25").css("left", inner_width - $("#btn_25").width());
			$("#btn_25").css("top" , menu_dep1_top );
			$("#btn_25").css("z-index", 2505);
			$("#btn_25").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "시도 경계에 마우스를 올리시면 툴팁 정보를 확인하실 수 있습니다.<br>"
									+ "데이터보드를 선택하면 시도 단위의 데이터를 차트 또는 표 형태로 보실 수 있습니다.<br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">데이터보드를 선택합니다.</strong>"
									+ " <br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#3_databoard_1").hide();		
			$("#btn_26").hide();				
			
			break;

		case 35 :
			/* 숨기기(prev) */
			$("#map_3_3").hide();		
			$("#btn_25").hide();
			$("#3_tooltip_0").hide();
			$("#3_tooltip_1").hide();	

			$("#2_btn_9").css("z-index", 0);

			img_left = inner_half_width - ($("#map_3_3").width()/2) + $("#menu_left_1_3").width();
			if ($("#menu_left_1_3").width() < img_left){
				img_left = $("#menu_left_1_3").width();
			}
			$("#map_3_3").css("left", img_left);
			$("#map_3_3").css("top" , menu_dep2_top );
			$("#map_3_3").css("z-index", 2);
			$("#map_3_3").show();	
			
			$("#3_databoard_1").css("left", inner_width - $("#3_databoard_1").width());
			$("#3_databoard_1").css("top" , menu_dep1_top );
			$("#3_databoard_1").css("z-index", 2601);
			$("#3_databoard_1").show();	
			
			$("#2_btn_8").css("left", inner_width - $("#3_databoard_1").width() - $("#2_btn_8").width() -5);
			$("#2_btn_8").css("top" , 182);
			$("#2_btn_8").css("z-index", 2602);
			$("#2_btn_8").show();	
			
			$("#btn_26").css("left", inner_width - $("#btn_26").width() - 372);
			$("#btn_26").css("top" , menu_dep1_top + 510 );
			$("#btn_26").css("z-index", 2603);
			$("#btn_26").show();				
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "차트에서 <strong style=\"color:#ee7c1a; font-weight:bold;\">‘충청남도’를 선택</strong>하시면,  지도상에도 충청남도의 툴팁 정보가 나타납니다.<br>"
									+ " <br>"
									+ " <br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#map_3_4").hide();	
			$("#3_databoard_2").hide();	
			$("#btn_27").hide();	
			
			break;

		case 36 :
			/* 숨기기(prev) */
			$("#map_3_3").hide();
			$("#3_databoard_1").hide();	
			$("#btn_26").hide();		

			img_left = inner_half_width - ($("#map_3_4").width()/2) + $("#menu_left_1_3").width();
			if ($("#menu_left_1_3").width() < img_left){
				img_left = $("#menu_left_1_3").width();
			}
			$("#map_3_4").css("left", img_left);
			$("#map_3_4").css("top" , menu_dep2_top );
			$("#map_3_4").css("z-index", 2);
			$("#map_3_4").show();	
			
			$("#3_databoard_2").css("left", inner_width - $("#3_databoard_1").width());
			$("#3_databoard_2").css("top" , menu_dep1_top );
			$("#3_databoard_2").css("z-index", 2601);
			$("#3_databoard_2").show();	
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "‘선택항목’ 창에 나타나는 <u>기존의 검색조건 항목</u>을 더블클릭하시면 <br>"
									+ "해당 검색조건으로 언제든 재검색 하실 수 있습니다.<br>"
									+ " <br>"
									+ "<br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */	
			$("#btn_27").hide();	
			$("#btn_28").hide();	
			
			break;

		case 37 :
			/* 숨기기(prev) */	
			hideLegend();
			$("#3_subMenu_5").hide();		

			img_left = inner_half_width - ($("#map_3_4").width()/2) + $("#menu_left_1_3").width();
			if ($("#menu_left_1_3").width() < img_left){
				img_left = $("#menu_left_1_3").width();
			}
			$("#map_3_4").css("left", img_left);
			$("#map_3_4").css("top" , menu_dep2_top );
			$("#map_3_4").css("z-index", 2);
			$("#map_3_4").show();	
			
			$("#3_subMenu_5").css("left", $("#menu_left_1_3").width() + 1);
			$("#3_subMenu_5").css("top" , menu_dep2_top);
			$("#3_subMenu_5").css("z-index",2503);
			$("#3_subMenu_5").show();	
			
			showLegend();
			
			$("#3_databoard_2").css("left", inner_width - $("#3_databoard_1").width());
			$("#3_databoard_2").css("top" , menu_dep1_top );
			$("#3_databoard_2").css("z-index", 2601);
			$("#3_databoard_2").show();	
			
			$("#btn_27").css("left", 0);
			$("#btn_27").css("top" , 501 );
			$("#btn_27").css("z-index", 3300);
			$("#btn_27").show();	
			
			$("#2_btn_8").css("left", inner_width - $("#3_databoard_1").width() - $("#2_btn_8").width() - 5);
			$("#2_btn_8").css("top" , 182);
			$("#2_btn_8").css("z-index", 4300);
			$("#2_btn_8").show();	
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "다음으로 [일자리 통계분석] 메뉴에 대하여 알아보겠습니다.<br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">[일자리 통계분석]을 선택합니다.</strong><br>"
									+ " <br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#map_4_1").hide();
			$("#4_left_2_1").hide();
			$("#4_subMenu_1").hide();
			$("#btn_09").hide();	
			$("#btn_28").hide();	

			$("#2_btn_9").css("z-index", 0);
			
			break;

		case 38 :
			/* 숨기기(prev) */
			$("#map_3_4").hide();
			$("#3_subMenu_5").hide();	
			$("#3_databoard_2").hide();	
			$("#btn_27").hide();
			$("#2_btn_8").hide();		
			hideLegend();	

			$("#2_btn_9").css("z-index", 4300);
			
			img_left = inner_half_width - ($("#map_4_1").width()/2) + $("#menu_left_1_4").width();
			if ($("#menu_left_1_4").width() < img_left){
				img_left = $("#menu_left_1_4").width();
			}
			$("#map_4_1").css("left", img_left);
			$("#map_4_1").css("top" , menu_dep2_top );
			$("#map_4_1").css("z-index", 2);
			$("#map_4_1").show();	
			
			showLegend();
			
			showLeftMenu2();
			show_2_buttons();
			
			$("#4_subMenu_1").css("left", $("#menu_left_1_4").width() + $("#4_left_2_1").width() + 1);
			$("#4_subMenu_1").css("top" , menu_dep2_top);
			$("#4_subMenu_1").css("z-index", 2803);
			$("#4_subMenu_1").show();	
			
			$("#btn_28").css("left", $("#menu_left_1_4").width() + $("#4_left_2_1").width() + 86);
			$("#btn_28").css("top" , 359 );
			$("#btn_28").css("z-index", 2806);
			$("#btn_28").show();	
						
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "일자리현황의 고용률 통계가 자동 검색됩니다.<br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">주요지표에서 ‘취업자수’를 선택합니다.</strong>"
									+ " <br>"
									+ " <br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#4_subMenu_2").hide();	
			$("#btn_29").hide();
			$("#4_tooltip_0").hide();	
			$("#4_tooltip_1").hide();	
			$("#2_btn_8").hide();				
			
			break;

		case 39 :
			/* 숨기기(prev) */
			$("#map_4_1").hide();		
			$("#4_subMenu_1").hide();
			$("#btn_28").hide();
			
			img_left = inner_half_width - ($("#map_4_1").width()/2) + $("#menu_left_1_4").width();
			if ($("#menu_left_1_4").width() < img_left){
				img_left = $("#menu_left_1_4").width();
			}
			$("#map_4_1").css("left", img_left);
			$("#map_4_1").css("top" , menu_dep2_top );
			$("#map_4_1").css("z-index", 2);
			$("#map_4_1").show();		
			
			$("#4_subMenu_2").css("left", $("#menu_left_1_4").width() + $("#4_left_2_1").width() + 1);
			$("#4_subMenu_2").css("top" , menu_dep2_top);
			$("#4_subMenu_2").css("z-index", 3401);
			$("#4_subMenu_2").show();	

			$("#4_tooltip_0").css("left", $("#menu_left_1_4").width() + $("#4_left_2_1").width() + 847);
			$("#4_tooltip_0").css("top" , menu_dep2_top + 70);
			$("#4_tooltip_0").css("z-index", 3402);
			$("#4_tooltip_0").show();
			img_left = $("#4_tooltip_0").position().left;	
			img_top  = $("#4_tooltip_0").position().top ;

			$("#4_tooltip_1").css("left", img_left - 29);

			$("#4_tooltip_1").css("top" , img_top  + 56);
			$("#4_tooltip_1").css("z-index", 3403);
			$("#4_tooltip_1").hide();	
			

			img_left = $("#4_subMenu_2").position().left;	
			img_top  = $("#4_subMenu_2").position().top ;
			$("#btn_29").css("left", img_left + 513 );
			$("#btn_29").css("top" , img_top  + 382 );
			$("#btn_29").css("z-index", 3404);
			$("#btn_29").show();		
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "취업자수에 관한 정보가 우측의 차트에 나타납니다. <br>"
									+ "차트에 마우스를 올리면 해당 월의 취업자수가 툴팁으로 표시됩니다. <br>"
									+ "취업자수에 관한 통계를 조회해 보겠습니다.<br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">하단의 ‘통계보기’를 선택합니다.</strong><br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#map_4_2").hide();	
			$("#4_pop_1").hide();	
			$("#btn_35").hide();	
			
			break;

		case 40 :
			
			/* 숨기기(prev) */
			$("#btn_29").hide();
						
			img_left = inner_half_width - ($("#map_4_1").width()/2) + $("#menu_left_1_4").width();
			if ($("#menu_left_1_4").width() < img_left){
				img_left = $("#menu_left_1_4").width();
			}
			$("#map_4_1").css("left", img_left);
			$("#map_4_1").css("top" , menu_dep2_top );
			$("#map_4_1").css("z-index", 2);
			$("#map_4_1").show();				
			
			$("#4_pop_1").css("z-index", 3501);
			$("#4_pop_1").show();	
			img_left = $("#menu_left_1_4").width() + $("#4_left_2_1").width() + ($("#4_subMenu_2").width() - $("#4_pop_1").width())/2 ;
			img_top  = $("#map_4_1").position().top + 200;
			if(inner_height < img_top + $("#4_pop_1").height()) img_top = inner_height - $("#4_pop_1").height() - 10;
			$("#4_pop_1").css("left", img_left);
			$("#4_pop_1").css("top" , img_top );
			img_pop_left = $("#4_pop_1").position().left;
			img_pop_top  = $("#4_pop_1").position().top ;
									
			$("#btn_35").css("left", img_pop_left + 65);
			$("#btn_35").css("top" , img_pop_top + 107);
			$("#btn_35").css("z-index", 3502);
			$("#btn_35").show();		
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "세부 분류창이 나타납니다.<br>"
									+ "연령이 50~59세인 경우를 조회해 보겠습니다.<br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘연령별’을 선택합니다.</strong><br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#4_pop_2").hide();
			$("#btn_36").hide();		
			
			break;

		case 41 :
			/* 숨기기(prev) */
			$("#4_pop_1").hide();	
			$("#btn_35").hide();
			$("#map_4_1").hide();			
			
			img_left = inner_half_width - ($("#map_4_1").width()/2) + $("#menu_left_1_4").width();
			if ($("#menu_left_1_4").width() < img_left){
				img_left = $("#menu_left_1_4").width();
			}
			$("#map_4_1").css("left", img_left);
			$("#map_4_1").css("top" , menu_dep2_top );
			$("#map_4_1").css("z-index", 2);
			$("#map_4_1").show();			
			
			$("#4_pop_2").css("left", img_pop_left);
			$("#4_pop_2").css("top" , img_pop_top );
			$("#4_pop_2").css("z-index", 3601);
			$("#4_pop_2").show();	
			
			$("#btn_36").css("left", img_pop_left + 357);
			$("#btn_36").css("top" , img_pop_top  + 143);
			$("#btn_36").css("z-index", 3602);
			$("#btn_36").show();		
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">'50~59세'를 선택합니다.</strong><br>"
									+ " <br>"
									+ " <br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#4_pop_3").hide();	
			$("#btn_37").hide();	
			
			break;

		case 42 :
			/* 숨기기(prev) */
			$("#4_pop_2").hide();
			$("#btn_36").hide();
			$("#map_4_1").hide();			
			
			img_left = inner_half_width - ($("#map_4_1").width()/2) + $("#menu_left_1_4").width();
			if ($("#menu_left_1_4").width() < img_left){
				img_left = $("#menu_left_1_4").width();
			}
			$("#map_4_1").css("left", img_left);
			$("#map_4_1").css("top" , menu_dep2_top );
			$("#map_4_1").css("z-index", 2);
			$("#map_4_1").show();			
			
			$("#4_subMenu_2").show();					
			$("#4_tooltip_0").show();					
			
			$("#4_pop_3").css("left", img_pop_left);
			$("#4_pop_3").css("top" , img_pop_top );
			$("#4_pop_3").css("z-index", 3701);
			$("#4_pop_3").show();
			
			$("#btn_37").css("left", img_pop_left + 217);
			$("#btn_37").css("top" , img_pop_top  + 228);
			$("#btn_37").css("z-index", 3703);
			$("#btn_37").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">'통계보기'를 선택합니다.</strong><br>"
									+ " <br>"
									+ " <br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#map_4_2").hide();				
			$("#4_subMenu_3").hide();
			$("#btn_30").hide();	
			
			$("#2_btn_9").css("z-index", 4200);
			
			break;
			
		case 43 :
			/* 숨기기(prev) */
			$("#map_4_1").hide();	
			$("#4_pop_3").hide();	
			$("#btn_37").hide();
			$("#4_subMenu_2").hide();
			$("#4_tooltip_0").hide();	
			$("#4_tooltip_1").hide();		
			
			img_left = inner_half_width - ($("#map_4_2").width()/2) + $("#menu_left_1_4").width();
			if ($("#menu_left_1_4").width() < img_left){
				img_left = $("#menu_left_1_4").width();
			}
			$("#map_4_2").css("left", img_left);
			$("#map_4_2").css("top" , menu_dep2_top );
			$("#map_4_2").css("z-index", 2);
			$("#map_4_2").show();	
			
			$("#4_subMenu_3").css("left", $("#menu_left_1_4").width() + $("#4_left_2_1").width() + 1);
			$("#4_subMenu_3").css("top" , menu_dep2_top);
			$("#4_subMenu_3").css("z-index", 3001);
			$("#4_subMenu_3").show();
			
			$("#btn_30").css("left", inner_width - $("#btn_30").width());
			$("#btn_30").css("top" , menu_dep1_top );
			$("#btn_30").css("z-index", 3003);
			$("#btn_30").show();	
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "전국의 취업자수에 관한 상세 그래프와 시도별 통계정보가 지도위에 나타납니다.<br>"
									+ "지도위의 정보는 가장 최근 정보가 나타나게 됩니다. <br>"
									+ "보다 자세한 통계를 확인하고자 하신다면, <strong style=\"color:#ee7c1a; font-weight:bold;\">데이터보드를 선택합니다.</strong><br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#4_databoard_1").hide();	
			$("#btn_31").hide();
			move_2_buttons(0);

			$("#2_btn_9").css("z-index", 4300);
			
			break;

		case 44 :
			/* 숨기기(prev) */
			$("#map_4_2").hide();	
			$("#4_subMenu_3").hide();	
			$("#btn_30").hide();

			$("#2_btn_9").css("z-index", 0);
			

			img_left = inner_half_width - ($("#map_4_2").width()/2) + $("#menu_left_1_4").width();
			if ($("#menu_left_1_4").width() < img_left){
				img_left = $("#menu_left_1_4").width();
			}
			$("#map_4_2").css("left", img_left);
			$("#map_4_2").css("top" , menu_dep2_top );
			$("#map_4_2").css("z-index", 2);
			$("#map_4_2").show();	
			
			$("#4_subMenu_3").css("left", $("#menu_left_1_4").width() + $("#4_left_2_1").width() + 1);
			$("#4_subMenu_3").css("top" , menu_dep2_top);
			$("#4_subMenu_3").css("z-index", 3101);
			$("#4_subMenu_3").show();	

			$("#4_databoard_1").css("left", inner_width - $("#4_databoard_1").width());
			$("#4_databoard_1").css("top" , menu_dep1_top );
			$("#4_databoard_1").css("z-index", 3102);
			$("#4_databoard_1").show();	
			img_left = $("#4_databoard_1").position().left;
			img_top  = $("#4_databoard_1").position().top ;
			
			move_2_buttons($("#4_databoard_1").width());
			
			$("#btn_31").css("left", img_left + 110);
			$("#btn_31").css("top" , img_top  + 547);
			$("#btn_31").css("z-index", 3103);
			$("#btn_31").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "데이터보드의 차트에서 <strong style=\"color:#ee7c1a; font-weight:bold;\">대전광역시를 선택해 보세요.</strong><br>"
									+ " <br>"
									+ " <br>"
									+ " <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			$("#map_4_3").hide();	
			$("#4_databoard_2").hide();	
			
			break;

		case 45 :
			/* 숨기기(prev) */
			$("#map_4_2").hide();	
			$("#4_databoard_1").hide();		
			$("#btn_31").hide();


			img_left = inner_half_width - ($("#map_4_2").width()/2) + $("#menu_left_1_4").width();
			if ($("#menu_left_1_4").width() < img_left){
				img_left = $("#menu_left_1_4").width();
			}
			$("#map_4_3").css("left", img_left);
			$("#map_4_3").css("top" , menu_dep2_top );
			$("#map_4_3").css("z-index", 2);
			$("#map_4_3").show();	
			
			$("#4_databoard_2").css("left", inner_width - $("#4_databoard_2").width());
			$("#4_databoard_2").css("top" , menu_dep1_top );
			$("#4_databoard_2").css("z-index", 3201);
			$("#4_databoard_2").show();
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ "차트에서 선택한 지역의 정보가 지도 위에 툴팁으로 나타나게 됩니다.<br>"
									+ "<br><br><br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */

			if(wrTimer != 'undefined'){
				clearTimeout(wrTimer);
			}

			$("#2_btn_9").css("z-index", 0);

			break;

		case 46 :
			$("#tutorialText").append("<div class=\"title\"><p><일자리 맵> 튜토리얼을 마쳤습니다. 축하드립니다.</p></div>"
									+ "<div class=\"content\">"
									+ "<p><strong style=\"color:#ff0000;  font-weight:bold;\">(10초 후에 <일자리 맵>으로 이동합니다.)<br> <br></p>"
									+ "</div>");
			
			wrTimer = setTimeout(function(){
						  location.href = "/view/workRoad/main";
					  }, 10000)
				
			break;

		default :
			/* 숨기기(prev) */
			
			$("#tutorialText").append("<div class=\"title\">"
									+ "<p></p>"
									+ "</div>"
									+ "<div class=\"content\">"
									+ "<p>" 
									+ " <br>"
									+ " <br>"
									+ " <br>"
									+ " <br>"
									+ "<strong style=\"color:#ee7c1a; font-weight:bold;\"> </strong> <br>"
									+ "</p></div>");
			posiInfo(targetPage);
			
			/* 숨기기(next) */
			break;

		}

		var ttText = "<div class=\"button\" id=\"moveButtonDiv\" style=\"left:-6px; top:-8px;\">";
		$("#tutorialText").append();
		if(0 < targetPage){
			ttText += "<a href=\"#\"><button id=\"prev\" type=\"button\" alt=\"이전\" style=\"top: -16px; width:60px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0; font-size: 14px;\">이전</button></a> &nbsp;&nbsp;";
		}

		if(targetPage < $workRoad.ui.tutoLastPage){
			ttText += "<a href=\"#\"><button id=\"next\" type=\"button\" alt=\"다음\" style=\"top: -16px; width:60px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0; font-size: 14px;\">다음</button></a>";				
		} else {
			ttText += "<button type=\"button\" alt=\"\" style=\"top: -16px; width:60px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #ffffff; font-size: 14px;\">&nbsp;&nbsp;&nbsp;&nbsp;</button>";				
		}
		ttText += "</div>";
		$("#tutorialText").append(ttText);
	}

	$("#btn_01").click(function() { nextPage(); });
	$("#btn_02").click(function() { nextPage(); });
	$("#btn_03").click(function() { nextPage(); });
	$("#btn_04").click(function() { nextPage(); });
	$("#2_btn_06").click(function() { nextPage(); });
	$("#2_btn_07").click(function() { nextPage(); });
	$("#2_btn_08").click(function() { nextPage(); });
	$("#2_btn_09").click(function() { nextPage(); });
	$("#2_btn_10").click(function() { nextPage(); });
	$("#btn_06").click(function() { nextPage(); });
	$("#btn_07").click(function() { nextPage(); });
	$("#btn_08").click(function() { nextPage(); });
	$("#btn_09").click(function() { nextPage(); });
	$("#btn_10").click(function() { nextPage(); });
	$("#btn_11").click(function() { nextPage(); });
	$("#btn_12").click(function() { nextPage(); });
	$("#btn_13").click(function() { nextPage(); });
	$("#btn_14").click(function() { nextPage(); });
	$("#btn_15").click(function() { nextPage(); });
	$("#btn_16").click(function() { nextPage(); });
	$("#btn_17").click(function() { nextPage(); });
	$("#btn_18").click(function() { nextPage(); });
	$("#btn_19").click(function() { nextPage(); });
	$("#btn_20").click(function() { nextPage(); });
	$("#btn_21").click(function() { nextPage(); });
	$("#btn_22").click(function() { nextPage(); });
	$("#btn_23").click(function() { nextPage(); });
	$("#btn_24").click(function() { nextPage(); });
	$("#btn_25").click(function() { nextPage(); });
	$("#btn_26").click(function() { nextPage(); });
	$("#btn_27").click(function() { nextPage(); });
	$("#btn_28").click(function() { nextPage(); });
	$("#btn_29").click(function() { nextPage(); });
	$("#btn_30").click(function() { nextPage(); });
	$("#btn_31").click(function() { nextPage(); });
	$("#btn_32").click(function() { nextPage(); });
	$("#btn_33").click(function() { nextPage(); });
	$("#btn_34").draggable({
		helper : "clone"	
	});
	$("#btn_35").click(function() { nextPage(); });
	$("#btn_36").click(function() { nextPage(); });
	$("#btn_37").click(function() { nextPage(); });
	$("#btn_marker").click(function() { nextPage(); });
	$("#btn_blank").droppable({
		accept: "#btn_34",
		drop : function(e) {
			nextPage();
		}
	});

	$("#3_tooltip_0").mouseover(function(){
		$("#3_tooltip_1").show();
	});
	$("#3_tooltip_0").mouseout(function(){
		$("#3_tooltip_1").hide();
	});

	$("#4_tooltip_0").mouseover(function(){
		$("#4_tooltip_1").show();
	});
	$("#4_tooltip_0").mouseout(function(){
		$("#4_tooltip_1").hide();
	});

	$("html, body").on("mousewheel DOMMouseScroll", function(e){
		var delta = 0;
		var flag = 0;

		if($workRoad.ui.tutoCurrentPage == 15) {
			if(!e) e = window.event;

			if(e.wheelDelta){ /* IE/Chrome/Opera */
				delta = e.wheelDelta / 120;
				if(window.opera) delta = -delta;
				
			} else if (e.detail){ /* fireFox */
				delta = -e.detail / 3;		
				
			} else if (0 < e.deltaY){
				delta = e.deltaY;				
			}

			if($workRoad.ui.tutoCurrentPage == 15 && 0 < delta){           // ↑ 위로					   
				$workRoad.ui.tutoCurrentPage = $workRoad.ui.tutoCurrentPage + 1;
				reloadPage();
			}
		}
	});
}


// [메뉴2 : 일자리보기] 버튼
function show_2_buttons(){
	setInnerSize();
		
	$("#2_btn_9").css("left", inner_width - $("#2_btn_9").width() - 5);
	$("#2_btn_9").css("top" , 182 );
	$("#2_btn_9").css("z-index", 1109);
	$("#2_btn_9").show();
}
		
function move_2_buttons(databoard_width){
	setInnerSize();
	
	$("#2_btn_9").css("left", inner_width - $("#2_btn_9").width() - 7 - databoard_width);
	$("#2_btn_9").show();	
}

function hide_2_buttons(){
	$("#2_btn_9").hide();
}

function closeTutorial() {
	var closeMsg = confirm("튜토리얼을 종료하시겠습니까?");
	if (closeMsg) {
//		location.href = "/view/workRoad/todayStatus";
		window.close();
	} else {
		return false;
	}
}

function showLegend(){
	$("#img_legend").hide();
	
	if(legendDepth == 1 || legendDepth == 2){
		img_left = (legendDepth == 1) ? $("#menu_left_1_1").width() + 10 : $("#menu_left_1_1").width() + $("#4_left_2_1").width() + 10;
		img_top = inner_height - $("#img_legend").height() - 15;
		if(img_top < menu_dep2_top) img_top = menu_dep2_top + 1;

		$("#img_legend").css("left", img_left);
		$("#img_legend").css("top" , img_top);
		$("#img_legend").css("z-index", 3);
		$("#img_legend").show();
	}
}

function hideLegend(){
	$("#img_legend").hide();
}

function showLeftMenu2(){	
	$("#4_left_2_1").css("left", $("#menu_left_1_4").width());
	$("#4_left_2_1").css("top" , menu_dep2_top);
	$("#4_left_2_1").css("z-index" , 3);
	$("#4_left_2_1").show();
}

