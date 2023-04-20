
var max_width         = 1920;
var max_height        = 1080;
var inner_width       = 0;
var inner_height      = 0;
var inner_half_width  = 0;
var inner_half_height = 0;
var img_left          = 0;
var img_top           = 0;
var img_pop_left      = 0;
var img_pop_top       = 0;
var menu_dep0_top     = 103;
var menu_dep1_top     = 140;
var menu_dep2_top     = 175;
var wrTimer;
var map_width         = 1536;

var tutoCurrentPage   =  0;               // 튜토리얼: 현재 페이지
var tutoLastPage      = 39;               // 튜토리얼: 최종 페이지
var tutoPointIdx      =  0;

function setInnerSize(){ // ① 튜토리얼 시작, ② resized 시, 사용
	inner_width       = window.innerWidth  > max_width  ? max_width  : window.innerWidth ;
	inner_height      = window.innerHeight > max_height ? max_height : window.innerHeight;
	inner_half_width  = inner_width /2;
	inner_half_height = inner_height/2;
}

function readyTutorial() {
	
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
			alert("<통계주제도> 화면으로 돌아가겠습니다.");
			window.close();
		}

	} else {
        startTutorial();
	}

}

function startTutorial() {

	$(document).ready(function(){
		setInnerSize();
		posiInfo(tutoPointIdx);
		showTutorialWrapper();
		reloadPage();
		setBtnRight();
		$("#tuto_tm_start_btn04").hide();
		// 한번에 가자~*
//		movePage(22);
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
				posiInfo(tutoPointIdx);
				setBtnRight();
				reloadPage();
				showTutorialWrapper();
				showLegend();
	});

	function showTutorialWrapper(){
	    $(".tutorialWrapper").css("width", inner_width);
		$(".tutorialWrapper").show();
	    $("#headerTutorial").css("left", (inner_width - $("#headerTutorial").width()) / 2);
		$("#headerTutorial").show();
	}

	function setBtnRight(){
		$("#right_1").hide();
		$("#right_emd").hide();

//		if(inner_width - map_width < 0){
			img_left = inner_width -39 ;
//		} else {
//			img_left = (inner_width - map_width)/2 + map_width - 39;
//		}
		$("#right_1").css("left", img_left);
		$("#right_1").css("top" , menu_dep2_top + 10);
		$("#right_1").css("z-index", 4100);
		$("#right_1").show();

		$("#right_emd").css("left", img_left);
		$("#right_emd").css("top" , menu_dep2_top + 55);
		$("#right_emd").css("z-index", 4101);
		$("#right_emd").show();
	}

	/**************************************************************************
	 * posiInfo
	 **************************************************************************/
	var posi    = "";
	var width   = 0;
	var height  = 0;
	var tutoImg = [$("#tutorialText"   ), $("#tutorialText"   ), $("#tutorialText"), $("#pcs_0_3"           ), $("#pcs_0_2"        ),
	               $("#tutorialText"   ), $("#tutorialText"   ), $("#tutorialText"), $("#tutorialText"      ), $("#btn_1_14_0"     ),
	               $("#tutorialText"   ), $("#right_expand_on"), $("#pcs_1_14_emd"), $("#right_reduction_on"), $("#btn_1_03_0"     ),
	               $("#pcs_1_03_1"     ), $("#pcs_1_03_2"     ), $("#pcs_1_03_3"  ), $("#tutorialText"      ), $("#btn_1_05_0"     ),
	               $("#pcs_1_05_2"     ), $("#pcs_1_05_3_on"  ), $("#btn_1_12_0"  ), $("#tutorialText"      ), $("#top2_report"    ),
	               $("#pop_1_12_2"     ), $("#pcs_3_00_0"     ), $("#btn_3_08_0"  ), $("#btn_3_03_0"        ), $("#right_expand_on"),
	               $("#tutorialText"   ), $("#pcs_5_00_0"     ), $("#btn_5_03_0"  ), $("#pcs_5_03_1"        ), $("#btn_5_02_0"     ),
	               $("#right_expand_on"), $("#btn_5_04_0"     ), $("#pcs_5_04_1"  ), $("#tutorialText"      )
	               ];
	var pointImg = [1, 1, 1, 4, 4,
	                1, 1, 1, 1, 3,
	                1, 2, 4, 2, 1,
	                1, 2, 1, 1, 1,
	                4, 4, 3, 1, 2,
	                1, 1, 1, 1, 2,
	                1, 4, 1, 2, 1,
	                2, 1, 2, 1];

	function posiInfo(i) {
		tutoPointIdx = i;

		if (i < 1) {
			$("#toPoint_1").hide();
			$("#toPoint_2").hide();
			$("#toPoint_3").hide();
			$("#toPoint_4").hide();
		} else if ( i == 1 || i == 2 || i == 5 || i == 6 || i == 7 || i == 8 || i == 10 || i == 18 || i == 23 || i == 30 || i == 38){ //'다음'버튼
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
		movePage(tutoCurrentPage - 1);
	}
	function nextPage(){
		movePage(tutoCurrentPage + 1);
	}
	function reloadPage(){
		movePage(tutoCurrentPage);
	}

	function movePage(targetPage) {
		console.log("*** targetPage : "+ targetPage);

		tutoCurrentPage = targetPage;
		setInnerSize();

		posiInfo(-1);
		$("#tutorialText .title, #tutorialText .content, #tutorialText #moveButtonDiv, #tutorialText #prev, #tutorialText #next").empty();

		// 상단 및 좌측 메뉴
		$("#top1").hide();
		$("#top2").hide();

		$("#top2").css("left", 0);
		$("#top2").css("top" , menu_dep1_top);
		$("#top2").css("z-index" , 1);
		$("#top2").show();

		$("#top1_left").css("left", 0);
		$("#top1_left").css("top" , menu_dep0_top + 1);
		$("#top1_left").css("z-index" , 1);
		$("#top1_left").show();
		
//		if(inner_width - map_width < 0){
			img_left = inner_width - $("#top1_right").width();
//		} else {
//			img_left = (inner_width - map_width)/2 + map_width - $("#top1_right").width();
//		}
		$("#top1_right").css("left", img_left);
		$("#top1_right").css("top" , menu_dep0_top + 1);
		$("#top1_right").css("z-index" , 1);
		$("#top1_right").show();
		
		$("#tuto_start_btn_2").css("left", img_left - $("#tuto_start_btn_2").width() - 5);
		
		$("#pcs_grey").css("left", 0);
		$("#pcs_grey").css("top" , menu_dep2_top);
		$("#pcs_grey").css("width"  , 2000);
		$("#pcs_grey").css("height" , 1000);
		$("#pcs_grey").css("z-index" , 1);
		$("#pcs_grey").show();

		$("#left_1_0").hide();
		$("#left_3_0").hide();
		$("#left_4_0").hide();

		if (targetPage<27){ //인구와 가구

			$("#left_1_0").css("left", 0);
			$("#left_1_0").css("top" , menu_dep2_top );
			$("#left_1_0").css("z-index", 3);
			$("#left_1_0").show();

		} else if (26<targetPage && targetPage<32){ //복지와 문화

			$("#left_3_0").css("left", 0);
			$("#left_3_0").css("top" , menu_dep2_top );
			$("#left_3_0").css("z-index", 3);
			$("#left_3_0").show();

		} else if (31<targetPage){ //환경과 안전

			$("#left_5_0").css("left", 0);
			$("#left_5_0").css("top" , menu_dep2_top );
			$("#left_5_0").css("z-index", 3);
			$("#left_5_0").show();
		}


		$("#pcs_1").css("left", $("#left_1_0").width() + $("#left_1_11").width());
		$("#pcs_1").css("top" , menu_dep2_top + 360);
		$("#pcs_1").css("z-index", 4000);
		$("#pcs_1").show();

		$("#bottom_1_left").css("left", 3);
		$("#bottom_1_left").css("top" , inner_height - $("#bottom_1_left").height());
		$("#bottom_1_left").css("z-index" , 40000);
		$("#bottom_1_left").show();

		switch (targetPage) {
		case 0:
			/* 숨기기(next) */

			$("#top2_1_11").css("left", 95);
			$("#top2_1_11").css("top" , menu_dep1_top );
			$("#top2_1_11").css("z-index", 100);
			$("#top2_1_11").show();

			img_left = (inner_width - map_width)/2;
			$("#map_1_11_1").css("left", img_left);
			$("#map_1_11_1").css("top" , menu_dep2_top );
			$("#map_1_11_1").css("z-index", 2);
			$("#map_1_11_1").show();

			$("#left_1_11").css("left", $("#left_1_0").width());
			$("#left_1_11").css("top" , menu_dep2_top );
			$("#left_1_11").css("z-index", 103);
			$("#left_1_11").show();

			$("#left_1_11_1").css("left", $("#left_1_0").width() + $("#left_1_11").width());
			$("#left_1_11_1").css("top" , menu_dep2_top );
			$("#left_1_11_1").css("z-index", 104);
			$("#left_1_11_1").show();

			setBtnRight();

			$("#tutorialText").append("<div class=\"title\"><p><span style=\"margin-left:5px;\"><통계주제도> 첫 사용을 환영합니다!</span></p></div>"
									+ "<div class=\"content\">"
									+ "<p><통계주제도>는 통계와 관련하여 주요주제에 따른 관심사별 통계정보를 <br>"
									+ "손쉽게 확인할 수 있는 서비스입니다."
									+ "</p></div>");
            posiInfo(targetPage);

			/* 숨기기(next) */

			break;

        case 1:
            /* 숨기기(prev) */

			img_left = (inner_width - map_width)/2;
			$("#map_1_11_1").css("left", img_left);
			
            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "○ 인구와 가구, 주거와 교통, 복지와 문화, 노동과 경제, 환경과 안전의 5가지 카테고리에 따라 <br>"
                                    + "     관심있는 통계를 주제도화한 서비스입니다. <br>"
                                    + "○ <u>사회적 이슈 및 트렌드를 반영</u>하여 총 90종 이상의 주제도를 제공하고 있고, <br>"
                                    + "    <u>사회 흐름에 따라 지속적으로 추가</u>됩니다. <br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#pcs_0_1").hide();

            break;


        case 2:
            /* 숨기기(prev) */

			img_left = (inner_width - map_width)/2;
			$("#map_1_11_1").css("left", img_left);
			
			$("#pcs_0_1").css("left", 0);
			$("#pcs_0_1").css("top" , menu_dep2_top );
			$("#pcs_0_1").css("z-index", 201);
			$("#pcs_0_1").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "우선 ①<화면구성>에 관하여 설명 드린 후, 화면구성요소와 함께 ②<주제도 성격별 사용법>, <br>"
                                    + "③<기타 특이한 주제도>순으로 안내해 드리겠습니다. <br>"
                                    + " <br>"
                                    + "화면의 좌측에는 ‘주제도 카테고리’ 및 ‘주제도 목록’이 위치합니다. <br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#pcs_0_2").hide();
			$("#pcs_0_3").hide();

            break;


        case 3:
            /* 숨기기(prev) */

			img_left = (inner_width - map_width)/2;
			$("#map_1_11_1").css("left", img_left);
			$("#pcs_0_1").hide();

			$("#pcs_0_2").css("left", 0);
			$("#pcs_0_2").css("top" , menu_dep1_top - 3);
			$("#pcs_0_2").css("z-index", 301);
			$("#pcs_0_2").show();

			$("#pcs_0_3").css("left", $("#left_1_0").width() + $("#left_1_11").width() - 3);
			$("#pcs_0_3").css("top" , menu_dep2_top + 360 - 3);
			$("#pcs_0_3").css("z-index", 4001);
			$("#pcs_0_3").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "<u>‘주제도 목록’</u> 버튼은  <br>"
                                    + "‘주제도 카테고리 및 주제도 목록’의 [숨김] 또는 [보이기] 기능을 교대로 수행합니다.<br>"
                                    + "현재 상태에서 ‘주제도 목록’버튼을 선택하시면<br>"
                                    + "[숨김] 처리됩니다.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#left_1_0").show();
			$("#left_1_11").show();
			$("#left_1_11_1").css("left", $("#left_1_0").width() + $("#left_1_11").width());
			$("#pcs_1").show();
    		$("#bottom_1_left").show();
			hideLegend();

            break;


        case 4:
            /* 숨기기(prev) */
			$("#pcs_0_3").hide();

			img_left = (inner_width - map_width)/2;
			$("#map_1_11_1").css("left", img_left);
			
			$("#left_1_0").hide();
			$("#left_1_11").hide();
			$("#pcs_1").hide();
			$("#bottom_1_left").hide();

			$("#left_1_11_1").css("left", 0);

			$("#pcs_0_2").show();
			showLegend();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "다시 한 번  ‘주제도 목록’버튼을 선택하시면<br>"
                                    + "‘주제도 카테고리 및 주제도 목록’이 다시 나타나게 됩니다.<br>"
                                    + " <br>"
                                    + " <br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#top2_1_11").css("left", 95);
			$("#top2_1_11").css("top" , menu_dep1_top);
			$("#top2_1_11").css("z-index", 100);
			$("#top2_1_11").css("border", "0px outset red");
			$("#pcs_2").hide();

            break;


        case 5:
            /* 숨기기(prev) */
			$("#pcs_0_2").hide();

			img_left = (inner_width - map_width)/2;
			$("#map_1_11_1").css("left", img_left);
			
			$("#left_1_0").show();
			$("#left_1_11").show();
			$("#pcs_1").show();
			$("#bottom_1_left").show();
			hideLegend();

			$("#left_1_11_1").css("left", $("#left_1_0").width() + $("#left_1_11").width());

			$("#top2_1_11").css("left", 92);
			$("#top2_1_11").css("top" , menu_dep1_top - 3);
			$("#top2_1_11").css("border", "3px outset red");
			$("#top2_1_11").css("z-index", 501);

			$("#pcs_2").css("left", 286);
			$("#pcs_2").css("top" , menu_dep1_top);
			$("#pcs_2").css("z-index", 502);
			$("#pcs_2").show();

			$("#tooltip_1").css("left", $("#pcs_2").position().left + $("#pcs_2").width() + 6);
			$("#tooltip_1").css("top" , menu_dep1_top);
			$("#tooltip_1").css("z-index", 502);

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "현재 선택된 주제도명이 나타나는 <u>‘주제도 제목’</u>란 입니다.<br>"
                                    + " <br>"
                                    + "주제도 제목 우측의 <u>‘ToolTip 버튼’(ⓘ)</u>에 마우스포인터를 올려보세요.<br>"
                                    + "선택하신 주제도에 대한 도움말이 나타납니다.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#left_1_11_1").css("left",$("#left_1_0").width() + $("#left_1_11").width());
			$("#left_1_11_1").css("top" , menu_dep2_top);
			$("#left_1_11_1").css("border", "0px outset red");

            break;


        case 6:
            /* 숨기기(prev) */
			$("#top2_1_11").css("left", 95);
			$("#top2_1_11").css("top" , menu_dep1_top);
			$("#top2_1_11").css("border", "0px outset red");
			$("#pcs_2").hide();

			img_left = (inner_width - map_width)/2;
			$("#map_1_11_1").css("left", img_left);
			
			$("#left_1_11_1").css("left", $("#left_1_0").width() + $("#left_1_11").width() - 3);
			$("#left_1_11_1").css("top" , menu_dep2_top - 3);
			$("#left_1_11_1").css("border", "3px outset red");

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "<u>‘주제도 설정’</u>창은<br>"
                                    + "통계선택, 지역경계 선택, 지도 유형, 통계표출 등의 통계정보 표현을 설정합니다.<br>"
                                    + "설정을 변경하시면 지도에 바로 반영됩니다.<br>"
                                    + "<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
            break;


        case 7:
            /* 숨기기(prev) */
        	
			img_left = (inner_width - map_width)/2;
			$("#map_1_11_1").css("left", img_left);
			
			$("#left_1_11_1").css("left",$("#left_1_0").width() + $("#left_1_11").width());
			$("#left_1_11_1").css("top" , menu_dep2_top);
			$("#left_1_11_1").css("border", "0px outset red");

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "그 외에도 조회된 화면을 출력할 수 있도록 도와주는  ‘보고서 보기’,<br>"
                                    + "‘증감주제도 및 시계열주제도’에서 제공되는 ‘데이터보드’ 기능 등이 있습니다.<br>"
                                    + " <br>"
                                    + "지금부터 <화면구성>요소를 이용한 <u><주제도 성격별 사용법></u>을 안내해 드리겠습니다.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
            break;


        case 8:
            /* 숨기기(prev) */

			img_left = (inner_width - map_width)/2;
			$("#map_1_11_1").css("left", img_left);
			
            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "<통계주제도>들은 주제도의 성격에 따라<br>"
                                    + "① 색상타입 주제도, ② 증감타입 주제도, ③ 시계열타입 주제도, ④ 분할타입 주제도, <br>"
                                    + "⑤ POI 타입 주제도 와 같이<br>"
                                    + "5가지 타입으로 구분됩니다. 순서대로 살펴보겠습니다.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#btn_1_14_0").hide();
			$("#btn_1_14_1").hide();

            break;


        case 9:
            /* 숨기기(prev) */

			$("#top2_1_11").show();
			img_left = (inner_width - map_width)/2;
			$("#map_1_11_1").css("left", img_left);
			$("#map_1_11_1").show();
			$("#left_1_11").show();
			$("#left_1_11_1").show();

			$("#btn_1_14_0").css("left", $("#left_1_11").position().left + 6);
			$("#btn_1_14_0").css("top" , menu_dep2_top + 477);
			$("#btn_1_14_0").css("z-index", 901);
			$("#btn_1_14_0").show();

			$("#btn_1_14_1").css("left", $("#btn_1_14_0").position().left + $("#btn_1_14_0").width() + 6);
			$("#btn_1_14_1").css("top" , menu_dep2_top + 494);
			$("#btn_1_14_1").css("z-index", 902);

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "손가락이 가리키는 곳을 따라가 보면서 설명을 시작하도록 하겠습니다.<br>"
                                    + " <br>"
                                    + "[① 색상타입 주제도 ]에 해당하는 화면으로 이동하겠습니다.<br>"
                                    + "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘노령화 지수’를 선택</strong>하세요.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#top2_1_14").hide();
			$("#map_1_14_1").hide();
			$("#left_1_14").hide();
			$("#left_1_14_1").hide();
			$("#pcs_1_14_1").hide();

            break;


        case 10:
            /* 숨기기(prev) */
			$("#top2_1_11").hide();
			$("#map_1_11_1").hide();
			$("#left_1_11").hide();
			$("#left_1_11_1").hide();
			$("#btn_1_14_0").hide();
			$("#btn_1_14_1").hide();

			$("#top2_1_14").css("left", 95);
			$("#top2_1_14").css("top" , menu_dep1_top );
			$("#top2_1_14").css("z-index", 1000);
			$("#top2_1_14").show();

			img_left = (inner_width - map_width)/2;
			$("#map_1_14_1").css("left", img_left);
			$("#map_1_14_1").css("top" , menu_dep2_top );
			$("#map_1_14_1").css("z-index", 2);
			$("#map_1_14_1").show();

			$("#left_1_14").css("left", $("#left_1_0").width());
			$("#left_1_14").css("top" , menu_dep2_top );
			$("#left_1_14").css("z-index", 1002);
			$("#left_1_14").show();

			$("#left_1_14_1").css("left", $("#left_1_0").width() + $("#left_1_14").width());
			$("#left_1_14_1").css("top" , menu_dep2_top );
			$("#left_1_14_1").css("z-index", 1003);
			$("#left_1_14_1").show();

			img_left = $("#map_1_14_1").position().left + 732;
			img_top  = $("#map_1_14_1").position().top  + 231;
			$("#pcs_1_14_1").css("left", img_left);
			$("#pcs_1_14_1").css("top" , img_top);
			$("#pcs_1_14_1").css("z-index", 1004);
			$("#pcs_1_14_1").show();

			$("#pcs_1_14_1_tip").css("left", $("#pcs_1_14_1").position().left +  $("#pcs_1_14_1").width() + 6);
			$("#pcs_1_14_1_tip").css("top" , $("#pcs_1_14_1").position().top + 10);
			$("#pcs_1_14_1_tip").css("z-index", 1005);

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "[색상타입 주제도]는 행정구역별 통계 정보를 색상으로 표현하는 기본형태입니다.<br>"
                                    + " <br>"
                                    + "<u>시도 경계 안으로 마우스포인터를 이동</u>하시면<br>"
                                    + "해당 시도의 ‘노령화지수 비율’이 툴팁으로 제공됩니다.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#right_expand_on").hide();

            break;


        case 11:
            /* 숨기기(prev) */
			$("#pcs_1_14_1").hide();

			img_left = (inner_width - map_width)/2;
			$("#map_1_14_1").css("left", img_left);
			$("#map_1_14_1").show();
			$("#left_1_14_1").show();

			img_left = $("#right_emd").position().left - 3;
			img_top  = $("#right_emd").position().top  - 3;
			$("#right_expand_on").css("left", img_left);
			$("#right_expand_on").css("top" , img_top);
			$("#right_expand_on").css("z-index", 4102);
			$("#right_expand_on").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "‘주제도 설정’창의 ‘지역경계’설정 기능을 확인해 보겠습니다. <br>"
                                    + "<u>[자동]</u>버튼의 기능은 지도의 확대 ·축소 시 경계 및 통계를 자동으로 변경하여주며,<br>"
                                    + "<u>[시도/ 시군구/읍면동]</u>은 지도의 확대 ·축소에 상관없이 ‘선택한 지역경계’로 유지됩니다.<br>"
                                    + "지역경계가 ‘자동’인 상태에서 <strong style=\"color:#ee7c1a; font-weight:bold;\">‘확대’버튼을 선택</strong>하세요.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#pcs_1_14_emd").hide();
			$("#map_1_14_2").hide();
			$("#pcs_1_14_2").hide();
			$("#pcs_1_14_2_tip").hide();

            break;


        case 12:
            /* 숨기기(prev) */
			$("#map_1_14_1").hide();
			$("#right_expand_on").hide();

			img_left = (inner_width - map_width)/2;
			$("#map_1_14_2").css("left", img_left);
			$("#map_1_14_2").css("top" , menu_dep2_top );
			$("#map_1_14_2").css("z-index", 2);
			$("#map_1_14_2").show();

			$("#left_1_14_1").show();
			$("#top2_1_14").show();

			img_left = $("#left_1_14_1").position().left + 225;
			img_top  = menu_dep2_top + 95;
			$("#pcs_1_14_emd").css("left", img_left);
			$("#pcs_1_14_emd").css("top" , img_top);
			$("#pcs_1_14_emd").css("z-index", 1201);
			$("#pcs_1_14_emd").show();

			img_left = $("#map_1_14_2").position().left + 916;
			img_top  = $("#map_1_14_2").position().top  + 204;
			$("#pcs_1_14_2").css("left", img_left);
			$("#pcs_1_14_2").css("top" , img_top);
			$("#pcs_1_14_2").css("z-index", 3);
			$("#pcs_1_14_2").show();

			$("#pcs_1_14_2_tip").css("left", $("#pcs_1_14_2").position().left +  $("#pcs_1_14_2").width() + 6);
			$("#pcs_1_14_2_tip").css("top" , $("#pcs_1_14_2").position().top + 40);
			$("#pcs_1_14_2_tip").css("z-index", 4);

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "지도의 중심지역을 기준으로 확대되는 지역의<br>"
                                    + "지역경계가 ‘시도 -> 시군구 -> 읍면동’으로 자동변경 됩니다.<br>"
                                    + "이번에는 지역경계를 고정시켜보겠습니다. <strong style=\"color:#ee7c1a; font-weight:bold;\">‘읍면동’버튼을 선택</strong>하세요.<br>"
                                    + "(※ 전국의 읍면동 단위 통계를 불러오므로 다소 시간이 걸립니다.)<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#map_1_14_3").hide();
			$("#right_reduction_on").hide();
			$("#left_1_14_2").hide();

            break;


        case 13:
            /* 숨기기(prev) */
			$("#map_1_14_2").hide();
			$("#left_1_14_1").hide();
			$("#pcs_1_14_emd").hide();
			$("#pcs_1_14_2").hide();
			$("#pcs_1_14_2_tip").hide();

			img_left = (inner_width - map_width)/2;
			$("#map_1_14_3").css("left", img_left);
			$("#map_1_14_3").css("top" , menu_dep2_top );
			$("#map_1_14_3").css("z-index", 2);
			$("#map_1_14_3").show();

			$("#left_1_14_2").css("left", $("#left_1_0").width() + $("#left_1_14").width());
			$("#left_1_14_2").css("top" , menu_dep2_top );
			$("#left_1_14_2").css("z-index", 1301);
			$("#left_1_14_2").show();

			img_left = $("#right_emd").position().left - 3;
			img_top  = $("#right_emd").position().top  + $("#right_emd").height() - $("#right_reduction_on").height() - 3;
			$("#right_reduction_on").css("left", img_left);
			$("#right_reduction_on").css("top" , img_top);
			$("#right_reduction_on").css("z-index", 4102);
			$("#right_reduction_on").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "지역경계가 전국의 ‘읍면동’으로 고정되었습니다.<br>"
                                    + "통계범위가 ‘세종특별자치시’에서 ‘전국’으로 변경되어 ‘노령화지수의 최고/최저’ 값이 다시 설정되고<br>"
                                    + "그 영향으로 지도의 색상이 변경됩니다.<br>"
                                    + "화면을 축소해 보겠습니다. <strong style=\"color:#ee7c1a; font-weight:bold;\">‘축소’버튼을 선택</strong>하세요. <br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#map_1_14_4").hide();
			$("#btn_1_03_0").hide();
			$("#btn_1_03_1").hide();

            break;


        case 14:
            /* 숨기기(prev) */
			$("#map_1_14_3").hide();
			$("#right_reduction_on").hide();

			$("#top2_1_14").show();

			img_left = (inner_width - map_width)/2;
			$("#map_1_14_4").css("left", img_left);
			$("#map_1_14_4").css("top" , menu_dep2_top );
			$("#map_1_14_4").css("z-index", 2);
			$("#map_1_14_4").show();

			$("#left_1_14").show();
			$("#left_1_14_2").show();

			$("#left_1_03").css("left", $("#left_1_0").width());
			$("#left_1_03").css("top" , menu_dep2_top );
			$("#left_1_03").css("z-index", 1401);
			$("#left_1_03").show();

			$("#btn_1_03_0").css("left", $("#left_1_03").position().left + 3);
			$("#btn_1_03_0").css("top" , menu_dep2_top + 104);
			$("#btn_1_03_0").css("z-index", 1402);
			$("#btn_1_03_0").show();

			$("#btn_1_03_1").css("left", $("#btn_1_03_0").position().left + $("#btn_1_03_0").width() + 6);
			$("#btn_1_03_1").css("top" , menu_dep2_top + 121);
			$("#btn_1_03_1").css("z-index", 1403);

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "지도가 축소되어도 지역경계는 ‘읍면동’으로 고정되어 있습니다. <br>"
                                    + "이것으로 [① 색상타입 주제도] 설명을 마치고,<br>"
                                    + "[② 증감타입 주제도] 설명을 위해 화면을 이동하겠습니다.<br>"
                                    + "주제도 목록에서 <strong style=\"color:#ee7c1a; font-weight:bold;\">‘인구변화’를 선택</strong>하세요.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#top2_1_03").hide();
			$("#map_1_03_1").hide();
			$("#left_1_03").hide();
			$("#left_1_03_1").hide();
			$("#pcs_1_03_1").hide();
			$("#databoard_1_03_1").hide();

            break;


        case 15:
            /* 숨기기(prev) */
			$("#top2_1_14").hide();
			$("#map_1_14_4").hide();
			$("#left_1_14").hide();
			$("#left_1_14_2").hide();
			$("#btn_1_03_0").hide();
			$("#btn_1_03_1").hide();

			$("#top2_1_03").css("left", 95);
			$("#top2_1_03").css("top" , menu_dep1_top );
			$("#top2_1_03").css("z-index", 1000);
			$("#top2_1_03").show();

			img_left = (inner_width - map_width)/2;
			$("#map_1_03_1").css("left", img_left);
			$("#map_1_03_1").css("top" , menu_dep2_top );
			$("#map_1_03_1").css("z-index", 2);
			$("#map_1_03_1").show();

			$("#left_1_03").css("left", $("#left_1_0").width());
			$("#left_1_03").css("top" , menu_dep2_top );
			$("#left_1_03").css("z-index", 1501);
			$("#left_1_03").show();

			$("#left_1_03_1").css("left", $("#left_1_0").width() + $("#left_1_03").width());
			$("#left_1_03_1").css("top" , menu_dep2_top );
			$("#left_1_03_1").css("z-index", 1502);
			$("#left_1_03_1").show();

			$("#pcs_1_03_1").css("left", $("#left_1_03_1").position().left + 121);
			$("#pcs_1_03_1").css("top" , $("#left_1_03_1").position().top  + 49);
			$("#pcs_1_03_1").css("z-index", 1503);
			$("#pcs_1_03_1").show();

			img_left = $("#right_emd").position().left - $("#databoard_1_03_1").width() - 10;
			$("#databoard_1_03_1").css("left", img_left);
			$("#databoard_1_03_1").css("top" , menu_dep1_top);
			$("#databoard_1_03_1").css("z-index", 1504);
			$("#databoard_1_03_1").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "[② 증감타입 주제도] 는<br>"
                                    + "시점이 다른 두 데이터의 증감을 이용하여 지역별 증가 또는 감소여부를 표출하고<br>"
                                    + "년도별로 데이터의 증감여부를 차트로 표출합니다.<br>"
                                    + "연도별 증감을 확인하기 위해 <strong style=\"color:#ee7c1a; font-weight:bold;\">통계선택의 ‘증감률(%)’버튼을 선택</strong>하세요.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#map_1_03_2").hide();
			$("#left_1_03_2").hide();
			$("#pcs_1_03_2").hide();
			$("#databoard_1_03_2").hide();

            break;


        case 16:
            /* 숨기기(prev) */
			$("#map_1_03_1").hide();
			$("#left_1_03_1").hide();
			$("#pcs_1_03_1").hide();
			$("#databoard_1_03_1").hide();

			img_left = (inner_width - map_width)/2;
			$("#map_1_03_2").css("left", img_left);
			$("#map_1_03_2").css("top" , menu_dep2_top );
			$("#map_1_03_2").css("z-index", 2);
			$("#map_1_03_2").show();

			$("#left_1_03_2").css("left", $("#left_1_0").width() + $("#left_1_03").width());
			$("#left_1_03_2").css("top" , menu_dep2_top );
			$("#left_1_03_2").css("z-index", 1601);
			$("#left_1_03_2").show();

			$("#pcs_1_03_2").css("left", img_left      + 681);
			$("#pcs_1_03_2").css("top" , menu_dep2_top + 308);
			$("#pcs_1_03_2").css("z-index", 1602);
			$("#pcs_1_03_2").show();

			img_left = $("#right_emd").position().left - $("#databoard_1_03_2").width() - 10;
			$("#databoard_1_03_2").css("left", img_left);
			$("#databoard_1_03_2").css("top" , menu_dep1_top);
			$("#databoard_1_03_2").css("z-index", 1603);
			$("#databoard_1_03_2").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "‘인구 변화’통계를 지도와 데이터보드에서 ‘증감률(%)’ 데이터로 확인하실 수 있습니다.<br>"
                                    + "(※ 데이터보드는 ‘증감’ 및 ‘시계열’ 타입의 주제도에 제공됩니다.)<br>"
                                    + "지역을 클릭하면 해당지역의 증감현황을 보실 수 있습니다.<br>"
                                    + "지도에서 <strong style=\"color:#ee7c1a; font-weight:bold;\">‘충청남도’를 선택</strong>하세요.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#pcs_1_03_3").hide();
			$("#databoard_1_03_3").hide();

            break;


        case 17:
            /* 숨기기(prev) */
			$("#pcs_1_03_2").hide();
			$("#databoard_1_03_2").hide();

			img_left = (inner_width - map_width)/2;
			$("#map_1_03_2").css("left", img_left);
			$("#map_1_03_2").show();
			$("#left_1_03_2").show();

			img_left = $("#right_emd").position().left - $("#databoard_1_03_3").width() - 10;
			$("#databoard_1_03_3").css("left", img_left);
			$("#databoard_1_03_3").css("top" , menu_dep1_top);
			$("#databoard_1_03_3").css("z-index", 1702);
			$("#databoard_1_03_3").show();

			$("#pcs_1_03_3").css("left", $("#left_1_03_2").position().left + 173);
			$("#pcs_1_03_3").css("top" , $("#left_1_03_2").position().top  + 95);
			$("#pcs_1_03_3").css("z-index", 1703);
			$("#pcs_1_03_3").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "‘충청남도’의 ‘연도별 인구증감률(%)’을 데이터보드에서 자세히 확인하실 수 있습니다.<br>"
                                    + "이번에는 지역경계를 변경해보겠습니다.<br>"
                                    + "<strong style=\"color:#ee7c1a; font-weight:bold;\">지역경계를 ‘시군구’로 선택</strong>하세요.<br>"
                                    + "(※ 전국의 시군구 단위로 조회되므로 다소 시간이 걸립니다.)<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#map_1_03_3").hide();
			$("#left_1_03_3").hide();
			$("#databoard_1_03_4").hide();

            break;

        case 18:
            /* 숨기기(prev) */
			$("#map_1_03_2").hide();
			$("#left_1_03_2").hide();
			$("#pcs_1_03_3").hide();
			$("#databoard_1_03_3").hide();

			img_left = (inner_width - map_width)/2;
			$("#map_1_03_3").css("left", img_left);
			$("#map_1_03_3").css("top" , menu_dep2_top );
			$("#map_1_03_3").css("z-index", 2);
			$("#map_1_03_3").show();

			$("#left_1_03_3").css("left", $("#left_1_0").width() + $("#left_1_03").width());
			$("#left_1_03_3").css("top" , menu_dep2_top );
			$("#left_1_03_3").css("z-index", 1801);
			$("#left_1_03_3").show();

//			if(inner_width - map_width < 0){
				img_left = inner_width - $("#databoard_1_03_4").width();
//			} else {
//				img_left = (inner_width - map_width)/2 + map_width - $("#databoard_1_03_4").width();
//			}
			$("#databoard_1_03_4").css("left", img_left);
			$("#databoard_1_03_4").css("top" , menu_dep1_top);
			$("#databoard_1_03_4").css("z-index", 1802);
			$("#databoard_1_03_4").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "지역경계가 ‘시군구’ 단위로 변경됩니다.<br>"
                                    + "시도별/시군구별/읍면동별 전국지도 전국레벨에서는 그래프를 지원하지 않으므로<br>"
                                    + "데이터보드는 자동으로 [접기]상태가 됩니다.<br>"
                                    + "이것으로 [② 증감타입 주제도] 설명을 마치겠습니다.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#btn_1_05_0").hide();
			$("#btn_1_05_1").hide();

            break;


        case 19:
            /* 숨기기(prev) */

			$("#top2_1_03").show();

			img_left = (inner_width - map_width)/2;
			$("#map_1_03_3").css("left", img_left);
			$("#map_1_03_3").show();
			$("#left_1_03").show();
			$("#left_1_03_3").show();

			$("#btn_1_05_0").css("left", $("#left_1_03").position().left + 2);
			$("#btn_1_05_0").css("top" , menu_dep2_top + 173);
			$("#btn_1_05_0").css("z-index", 1901);
			$("#btn_1_05_0").show();

			$("#btn_1_05_1").css("left", $("#btn_1_05_0").position().left + $("#btn_1_05_0").width() + 5);
			$("#btn_1_05_1").css("top" , menu_dep2_top + 190);
			$("#btn_1_05_1").css("z-index", 1902);

//			if(inner_width - map_width < 0){
				img_left = inner_width - $("#databoard_1_03_4").width();
//			} else {
//				img_left = (inner_width - map_width)/2 + map_width - $("#databoard_1_03_4").width();
//			}
			$("#databoard_1_03_4").css("left", img_left);

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "[③ 시계열타입 주제도] 설명을 위해 화면을 이동하겠습니다.<br>"
                                    + "주제도 목록에서 <strong style=\"color:#ee7c1a; font-weight:bold;\">‘주민등록인구 현황’을 선택</strong>하세요.<br>"
                                    + " <br>"
                                    + " <br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#top2_1_05").hide();
			$("#map_1_05_1").hide();
			$("#left_1_05").hide();
			$("#left_1_05_1").hide();
			$("#pcs_1_05_1").hide();
			$("#pcs_1_05_2").hide();
			$("#databoard_1_05_1").hide();

            break;


        case 20:
            /* 숨기기(prev) */
			$("#top2_1_03").hide();
			$("#btn_1_05_0").hide();
			$("#btn_1_05_1").hide();
			$("#map_1_03_3").hide();
			$("#left_1_03").hide();
			$("#left_1_03_3").hide();
			$("#databoard_1_03_4").hide();

			$("#top2_1_05").css("left", 95);
			$("#top2_1_05").css("top" , menu_dep1_top );
			$("#top2_1_05").css("z-index", 1000);
			$("#top2_1_05").show();

			img_left = (inner_width - map_width)/2;
			$("#map_1_05_1").css("left", img_left);
			$("#map_1_05_1").css("top" , menu_dep2_top );
			$("#map_1_05_1").css("z-index", 2);
			$("#map_1_05_1").show();

			img_left = $("#map_1_05_1").position().left + 716; //경기도
			img_top  = $("#map_1_05_1").position().top  + 175;
			$("#pcs_1_05_1").css("left", img_left);
			$("#pcs_1_05_1").css("top" , img_top );
			$("#pcs_1_05_1").css("z-index", 2001);
			$("#pcs_1_05_1").show();

			$("#pcs_1_05_1_tip").css("left", $("#pcs_1_05_1").position().left +  $("#pcs_1_05_1").width() + 6);
			$("#pcs_1_05_1_tip").css("top" , $("#pcs_1_05_1").position().top + 40);
			$("#pcs_1_05_1_tip").css("z-index", 2002);

			$("#left_1_05").css("left", $("#left_1_0").width());
			$("#left_1_05").css("top" , menu_dep2_top );
			$("#left_1_05").css("z-index", 2003);
			$("#left_1_05").show();

			$("#left_1_05_1").css("left", $("#left_1_0").width() + $("#left_1_05").width());
			$("#left_1_05_1").css("top" , menu_dep2_top );
			$("#left_1_05_1").css("z-index", 2004);
			$("#left_1_05_1").show();

			$("#pcs_1_05_2").css("left", $("#left_1_05_1").position().left + 61); //년도선택창
			$("#pcs_1_05_2").css("top" , $("#left_1_05_1").position().top  + 88);
			$("#pcs_1_05_2").css("z-index", 2005);
			$("#pcs_1_05_2").show();


			img_left = $("#right_emd").position().left - $("#databoard_1_05_1").width() - 10;
			$("#databoard_1_05_1").css("left", img_left);
			$("#databoard_1_05_1").css("top" , menu_dep1_top);
			$("#databoard_1_05_1").css("z-index", 2006);
			$("#databoard_1_05_1").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "[③ 시계열타입 주제도]는 시점에 따른 변화를 표출하기 위한 주제도 타입입니다.<br>"
                                    + "각 시점별로 색상타입 통계를 조회할 수 있으며, 해당 지역의 시점별 정보 변화를 차트로 표출합니다.<br>"
                                    + " <br>"
                                    + "‘주제도 설정’에서 <strong style=\"color:#ee7c1a; font-weight:bold;\">‘년도선택’ 창을 클릭</strong>합니다.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#pcs_1_05_3").hide();
			$("#pcs_1_05_3_on").hide();

            break;


        case 21:
            /* 숨기기(prev) */
			$("#pcs_1_05_1").hide();
			$("#pcs_1_05_2").hide();

			$("#top2_1_05").show();

			img_left = (inner_width - map_width)/2;
			$("#map_1_05_1").css("left", img_left);
			$("#map_1_05_1").show();
			$("#left_1_05_1").show();
			$("#pcs_1_05_3").show();
			$("#pcs_1_05_3_on").show();

			img_left = $("#right_emd").position().left - $("#databoard_1_05_1").width() - 10;
			$("#databoard_1_05_1").css("left", img_left);
			$("#databoard_1_05_1").show();

			$("#pcs_1_05_3").css("left", $("#left_1_05_1").position().left + 72);
			$("#pcs_1_05_3").css("top" , $("#left_1_05_1").position().top  + 98);
			$("#pcs_1_05_3").css("z-index", 2101);
			$("#pcs_1_05_3").show();

			$("#pcs_1_05_3_on").css("left", $("#left_1_05_1").position().left + 69);
			$("#pcs_1_05_3_on").css("top" , $("#left_1_05_1").position().top  + 146);
			$("#pcs_1_05_3_on").css("z-index", 2102);
			$("#pcs_1_05_3_on").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "원하시는 년도를 선택하여 해당 년도의 통계를 확인하실 수 있습니다.<br>"
                                    + " <br>"
                                    + "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘2015’를 선택</strong>합니다.<br>"
                                    + " <br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#map_1_05_2").hide();
			$("#left_1_05_2").hide();
			$("#databoard_1_05_2").hide();
			$("#btn_1_12_0").hide();
			$("#btn_1_12_1").hide();

            break;


        case 22:
            /* 숨기기(prev) */
			$("#map_1_05_1").hide();
			$("#left_1_05_1").hide();
			$("#pcs_1_05_3").hide();
			$("#pcs_1_05_3_on").hide();
			$("#databoard_1_05_1").hide();

			$("#top2_1_05").show();

			img_left = (inner_width - map_width)/2;
			$("#map_1_05_2").css("left", img_left);
			$("#map_1_05_2").css("top" , menu_dep2_top );
			$("#map_1_05_2").css("z-index", 2);
			$("#map_1_05_2").show();

			$("#left_1_05").show();

			$("#left_1_05_2").css("left", $("#left_1_0").width() + $("#left_1_05").width());
			$("#left_1_05_2").css("top" , menu_dep2_top );
			$("#left_1_05_2").css("z-index", 2201);
			$("#left_1_05_2").show();

			img_left = $("#right_emd").position().left - $("#databoard_1_05_2").width() - 10;
			$("#databoard_1_05_2").css("left", img_left);
			$("#databoard_1_05_2").css("top" , menu_dep1_top);
			$("#databoard_1_05_2").css("z-index", 2202);
			$("#databoard_1_05_2").show();

			img_left = $("#left_1_0").width() + 4;
			img_top  = menu_dep2_top  + 413;
			$("#btn_1_12_0").css("left", img_left); //출생 및 사망 현황
			$("#btn_1_12_0").css("top" , img_top);
			$("#btn_1_12_0").css("opacity" , "0.6");
			$("#btn_1_12_0").css("z-index", 2203);
			$("#btn_1_12_0").show();

			img_left = $("#left_1_0").width() + $("#btn_1_12_0").width() + 9;
			img_top  = menu_dep2_top + 420;
			$("#btn_1_12_1").css("left", img_left);
			$("#btn_1_12_1").css("top" , img_top);
			$("#btn_1_12_1").css("z-index", 2204);

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "‘2015’년도의 ‘주민등록 인구 현황’이 지도와 데이터보드에 조회됩니다.<br>"
                                    + " <br>"
                                    + "이번에는 [④ 분할타입 주제도]  설명을 위한 화면으로 이동하겠습니다. <br>"
                                    + "주제도 목록에서 <strong style=\"color:#ee7c1a; font-weight:bold;\">‘출생 및 사망 현황’을 선택</strong>하세요.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#top2_1_12").hide();
			$("#map_1_12_1").hide();
			$("#left_1_12").hide();
			$("#left_1_12_1").hide();
			$("#pcs_1_12_0_L").hide();
			$("#pcs_1_12_0_R").hide();

			$("#left_1_0").show();
			$("#pcs_1").show();
			$("#bottom_1_left").show();
			hideLegend();

            break;


        case 23:
            /* 숨기기(prev) */
			$("#top2_1_05").hide();
			$("#map_1_05_2").hide();
			$("#left_1_05").hide();
			$("#left_1_05_2").hide();
			$("#databoard_1_05_2").hide();
			$("#btn_1_12_0").hide();
			$("#btn_1_12_1").hide();

			$("#top2_1_12").css("left", 95);
			$("#top2_1_12").css("top" , menu_dep1_top );
			$("#top2_1_12").css("z-index", 1000);
			$("#top2_1_12").show();

			img_left = (inner_width - $("#map_1_12_1").width())/2;
			$("#map_1_12_1").css("left", img_left);
			$("#map_1_12_1").css("top" , menu_dep2_top );
			$("#map_1_12_1").css("z-index", 2);
			$("#map_1_12_1").show();

			$("#pcs_1_12_0_L").css("left", $("#map_1_12_1").position().left + 540);
			$("#pcs_1_12_0_L").css("top" , menu_dep2_top + 397);
			$("#pcs_1_12_0_L").css("z-index", 2301);
			$("#pcs_1_12_0_L").show();

			$("#pcs_1_12_0_R").css("left", $("#map_1_12_1").position().left + 1228);
			$("#pcs_1_12_0_R").css("top" , menu_dep2_top + 398);
			$("#pcs_1_12_0_R").css("z-index", 2302);
			$("#pcs_1_12_0_R").show();

			$("#left_1_12").css("left", $("#left_1_0").width());
			$("#left_1_12").css("top" , menu_dep2_top );
			$("#left_1_12").css("z-index", 2303);
			$("#left_1_12").show();

			$("#left_1_12_1").css("left", $("#left_1_0").width() + $("#left_1_12").width());
			$("#left_1_12_1").css("top" , menu_dep2_top );
			$("#left_1_12_1").css("z-index", 2304);
			$("#left_1_12_1").show();

			showLegend();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "[④ 분할타입 주제도]는 두 데이터를 직접 비교할 수 있는 주제도 타입입니다.<br>"
                                    + "연관성 있거나 연관성이 높은 것으로 추정되는 데이터를 지역별로 비교할 수 있도록 표출합니다.<br>"
                                    + "<strong style=\"color:#ee7c1a; font-weight:bold;\">시도 경계 안으로 마우스포인터를 이동</strong>하시면, 해당 시도의 ‘출생 및 사망 현황’을<br>"
                                    + "각 지도의 상단에서 확인 및 비교하실 수 있습니다.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#top2_report").hide();

            break;


        case 24:
            /* 숨기기(prev) */

			$("#top2_1_12").show();

			img_left = (inner_width - $("#map_1_12_1").width())/2;
			$("#map_1_12_1").css("left", img_left);
			$("#map_1_12_1").show();

			$("#pcs_1_12_0_L").css("left", $("#map_1_12_1").position().left + 540);
			$("#pcs_1_12_0_L").show();

			$("#pcs_1_12_0_R").css("left", $("#map_1_12_1").position().left + 1228);
			$("#pcs_1_12_0_R").show();

//			if(inner_width - map_width < 0){
				img_left = inner_width;
//			} else {
//				img_left = (inner_width - map_width)/2 + map_width;
//			}
			$("#top2_report").css("left", img_left - 89);
			$("#top2_report").css("top" , menu_dep0_top - 1);
			$("#top2_report").css("opacity", "0.5");
			$("#top2_report").css("z-index", 2401);
			$("#top2_report").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "‘보고서 보기’ 버튼을 이용하시면<br>"
                                    + "화면에 조회된 내용을 보고서 형태로 출력하실 수 있습니다.<br>"
                                    + "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘보고서 보기’ 버튼을 선택하세요.</strong><br>"
                                    + " <br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#pop_1_12_1").hide();
			$("#pop_1_12_2").hide();

            break;


        case 25:
            /* 숨기기(prev) */
			$("#top2_report").hide();

			$("#top2_1_12").show();

			img_left = (inner_width - $("#map_1_12_1").width())/2;
			$("#map_1_12_1").css("left", img_left);
			$("#map_1_12_1").show();

			$("#pcs_1_12_0_L").css("left", $("#map_1_12_1").position().left + 540);
			$("#pcs_1_12_0_L").show();

			$("#pcs_1_12_0_R").css("left", $("#map_1_12_1").position().left + 1228);
			$("#pcs_1_12_0_R").show();

			$("#pop_1_12_1").css("left", inner_half_width - $("#pop_1_12_1").width()/2);
			$("#pop_1_12_1").css("top" , menu_dep2_top + 50);
			$("#pop_1_12_1").css("z-index", 2501);
			$("#pop_1_12_1").show();

			$("#pop_1_12_2").css("left", inner_half_width - $("#pop_1_12_1").width()/2 + 757);
			$("#pop_1_12_2").css("top" , menu_dep2_top + 50 + 75);
			$("#pop_1_12_2").css("z-index", 2502);
			$("#pop_1_12_2").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "① ‘PDF 파일로 다운로드’ 받으시거나 ② 직접 ‘인쇄’하실 수 있습니다.<br>"
                                    + "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘닫기’ 버튼을 선택</strong>합니다.<br>"
                                    + " <br>"
                                    + " <br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#pcs_3_00_0").hide();

            break;


        case 26:
            /* 숨기기(prev) */
			$("#pop_1_12_1").hide();
			$("#pop_1_12_2").hide();


			$("#top2_1_12").show();

			img_left = (inner_width - $("#map_1_12_1").width())/2;
			$("#map_1_12_1").css("left", img_left);
			$("#map_1_12_1").show();
			$("#left_1_12").show();
			$("#left_1_12_1").show();

			$("#pcs_1_12_0_L").css("left", $("#map_1_12_1").position().left + 540);
			$("#pcs_1_12_0_L").show();

			$("#pcs_1_12_0_R").css("left", $("#map_1_12_1").position().left + 1228);
			$("#pcs_1_12_0_R").show();

			$("#pcs_3_00_0").css("left", 0);
			$("#pcs_3_00_0").css("top" , menu_dep2_top + 123);
			$("#pcs_3_00_0").css("z-index", 2604);
			$("#pcs_3_00_0").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "[④ 분할타입 주제도] 설명을 마치고<br>"
                                    + "이번에는 [⑤ POI타입 주제도] 설명을 위해 화면을 이동하겠습니다.<br>"
                                    + " <br>"
                                    + "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘복지와 문화’를 선택</strong>하세요.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#left_3").hide();
			$("#btn_3_08_0").hide();
			$("#btn_3_08_1").hide();

            break;


        case 27:
            /* 숨기기(prev) */
			$("#pcs_3_00_0").hide();
			$("#left_1_12").hide();

			$("#top2_1_12").show();

			img_left = (inner_width - $("#map_1_12_1").width())/2;
			$("#map_1_12_1").css("left", img_left);
			$("#map_1_12_1").show();

			$("#pcs_1_12_0_L").css("left", $("#map_1_12_1").position().left + 540);
			$("#pcs_1_12_0_L").show();

			$("#pcs_1_12_0_R").css("left", $("#map_1_12_1").position().left + 1228);
			$("#pcs_1_12_0_R").show();

			$("#left_3").css("left", $("#left_1_0").width());
			$("#left_3").css("top" , menu_dep2_top );
			$("#left_3").css("z-index", 2701);
			$("#left_3").show();

			$("#left_1_12").show();
			$("#left_1_12_1").show();

			//mng_s 20210415 이진호, 튜토리얼 현행화/위치수정
			//$("#btn_3_08_0").css("left", $("#left_3").position().left + 2);
			$("#btn_3_08_0").css("left", $("#left_3").position().left + 5);
			$("#btn_3_08_0_1").css('display', 'none');
			//mng_e 20210415 이진호
			
			$("#btn_3_08_0").css("top" , menu_dep2_top + 275);
			$("#btn_3_08_0").css("z-index", 2702);
			$("#btn_3_08_0").show();

			$("#btn_3_08_1").css("left", $("#btn_3_08_0").position().left + $("#btn_3_08_0").width() + 6);
			$("#btn_3_08_1").css("top" , menu_dep2_top + 290);
			$("#btn_3_08_1").css("z-index", 2703);

			$("#pcs_1_12_0_L").show();
			$("#pcs_1_12_0_R").show();
			showLegend();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘보육업체 현황’ 을 선택</strong>합니다.<br>"
                                    + " <br>"
                                    + " <br>"
                                    + " <br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#top2_3_08").hide();
			$("#map_3_08_1").hide();
			$("#left_3_08").hide();
			$("#left_3_08_1").hide();
			$("#pcs_3_08_1").hide();
			$("#pcs_3_08_2").hide();
			$("#btn_3_03_0").hide();
			$("#btn_3_03_1").hide();

            break;


        case 28:
            /* 숨기기(prev) */
			$("#top2_1_12").hide();
			$("#left_3").hide();
			$("#btn_3_08_0").hide();
			$("#btn_3_08_1").hide();

			$("#map_1_12_1").hide(); //출생및사망현황
			$("#left_1_12_1").hide();
			$("#pcs_1_12_0_L").hide();
			$("#pcs_1_12_0_R").hide();
			$("#left_1_0").show();
			$("#pcs_1").show();
			$("#bottom_1_left").show();
			hideLegend();

			$("#top2_3_08").css("left", 95);
			$("#top2_3_08").css("top" , menu_dep1_top );
			$("#top2_3_08").css("z-index", 1000);
			$("#top2_3_08").show();

			img_left = (inner_width - map_width)/2;
			$("#map_3_08_1").css("left", img_left);
			$("#map_3_08_1").css("top" , menu_dep2_top );
			$("#map_3_08_1").css("z-index", 2);
			$("#map_3_08_1").show();

			img_left = $("#map_3_08_1").position().left;
			
			//mng_s 20210415 이진호, 튜토리얼 현행화 / 위치 수정
			//$("#pcs_3_08_1").css("left", img_left + 758); //마커
			//$("#pcs_3_08_1").css("top" , menu_dep2_top + 356);
			$("#pcs_3_08_1").css("left", img_left + 873); //마커
			$("#pcs_3_08_1").css("top" , menu_dep2_top + 168);
			//mng_e 20210415 이진호
			
			$("#pcs_3_08_1").css("z-index", 2801);
			$("#pcs_3_08_1").css("opacity", 0.5);
			if( $("#pcs_3_08_2").css("display") == "none"){
				$("#pcs_3_08_1").show();
			}
			
			//mng_s 이진호, 튜토리얼 현행화 / 위치 수정
			//$("#pcs_3_08_2").css("left", img_left + 650); //마커tip
			//$("#pcs_3_08_2").css("top" , menu_dep2_top + 300);
			$("#pcs_3_08_2").css({
				"left": img_left + 726 + 'px',
				"top" : menu_dep2_top + 32 + 'px'
			});
			//mng_e 20210415 이진호
			
			$("#pcs_3_08_2").css("z-index", 2802);

			$("#left_3_08").css("left", $("#left_3_0").width());
			$("#left_3_08").css("top" , menu_dep2_top );
			$("#left_3_08").css("z-index", 2803);
			$("#left_3_08").show();

			$("#btn_3_03_0").css("left", $("#left_3_08").position().left + 2);
			$("#btn_3_03_0").css("top" , menu_dep2_top + 108);
			$("#btn_3_03_0").css("z-index", 2805);
			$("#btn_3_03_0").show();

			$("#btn_3_03_1").css("left", $("#btn_3_03_0").position().left + $("#btn_3_03_0").width() + 6);
			$("#btn_3_03_1").css("top" , menu_dep2_top + 115);
			$("#btn_3_03_1").css("z-index", 2806);
			
			//mng_s 20210415 이진호, 튜토리얼 현행화 / 이미지 추가 및 수정
			$("#btn_3_08_0_1").css({
				'display' 	: '',
				'border' 	: '0px',
				'top'		: menu_dep2_top + 276 + 'px',
				'left' 		: $("#left_3_08").position().left + 8 +'px',
				'z-index' 	: '2803'
					
			});
			//mng_e 20214015 이진호

			//mng_s 20210415 이진호, 튜토리얼 현행화 / 이미지 변경에 따른 설명 문구 수정
            //$("#tutorialText").append("<div class=\"title\">"
                                   // + "<p></p>"
                                   // + "</div>"
                                   //+ "<div class=\"content\">"
                                   // + "<p>"
                                   //+ "보육업체 분포도가 POI 형태로 나타나며, 마커를 선택하시면 해당 보육업체명이 나타납니다.<br>"
                                   // + "<주제도 성격별 사용법>의 안내를 마쳤습니다.<br>"
                                   // + "지금부터는 <u><기타 독특한 주제도></u> 몇몇을 안내해 드리겠습니다.<br>"
                                   //+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘응급의료시설 접근현황’을 선택</strong>합니다.<br>"
                                   // + "</p></div>");
			$("#tutorialText").append(
					"<div class=\"title\">"
						+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
						+ "<p>"
							+ "보육업체 현황은 파이차트 형태로 나타나며, 지역의 파이차트를 선택하시면 해당 지역에 대한 정보가 나타납니다.<br>"
							+ "지금부터는 <u><기타 독특한 주제도></u> 몇몇을 안내해 드리겠습니다.<br>"
							+ "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘응급의료시설 접근현황’을 선택</strong>합니다.<br>"
						+ "</p></div>");
			//mng_e 20210415 이진호
			
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#top2_3_03").hide();
			$("#map_3_03_1").hide();
			$("#left_3_03").hide();
			$("#left_3_03_1").hide();
			$("#pcs_3_03_1").hide();
			$("#right_expand_on").hide();

            break;


        case 29:
            /* 숨기기(prev) */
			$("#top2_3_08").hide();
			$("#map_3_08_1").hide();
			$("#left_3_08").hide();
			$("#left_3_08_1").hide();
			$("#pcs_3_08_1").hide();
			$("#pcs_3_08_2").hide();
			$("#btn_3_03_0").hide();
			$("#btn_3_03_1").hide();

			$("#top2_3_03").css("left", 95);
			$("#top2_3_03").css("top" , menu_dep1_top );
			$("#top2_3_03").css("z-index", 1000);
			$("#top2_3_03").show();

			img_left = (inner_width - map_width)/2;
			$("#map_3_03_1").css("left", img_left);
			$("#map_3_03_1").css("top" , menu_dep2_top );
			$("#map_3_03_1").css("z-index", 2);
			$("#map_3_03_1").show();

			$("#left_3_03").css("left", $("#left_3_0").width());
			$("#left_3_03").css("top" , menu_dep2_top );
			$("#left_3_03").css("z-index", 2901);
			$("#left_3_03").show();

			$("#left_3_03_1").css("left", $("#left_3_0").width() + $("#left_3_03").width());
			$("#left_3_03_1").css("top" , menu_dep2_top );
			$("#left_3_03_1").css("z-index", 2902);
			$("#left_3_03_1").show();

			$("#pcs_3_03_1").css("left", $("#right_emd").position().left - $("#pcs_3_03_1").width() + 34); //범례
			$("#pcs_3_03_1").css("top" , inner_height - $("#pcs_3_03_1").height() - 5);
			$("#pcs_3_03_1").css("z-index", 2903);
			$("#pcs_3_03_1").show();

			img_left = $("#right_emd").position().left - 3;
			img_top  = $("#right_emd").position().top  - 3;
			$("#right_expand_on").css("left", img_left);
			$("#right_expand_on").css("top" , img_top);
			$("#right_expand_on").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "응급의료시설로부터 차로 이동시간별 인구현황을 확인하고, <br>"
                                    + "해당 영역을 지도에서 확인할 수 있는 ‘응급의료시설 접근현황’주제도는<br>"
                                    + "‘네트워크데이터’ 정보가 기본 선택되어 있습니다.<br>"
                                    + "화면을 확대해 보겠습니다. <strong style=\"color:#ee7c1a; font-weight:bold;\">‘화면확대’버튼을 선택</strong>합니다.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#map_3_03_2").hide();
			$("#pcs_3_03_2").hide();

            break;


        case 30:
            /* 숨기기(prev) */
			$("#map_3_03_1").hide();
			$("#right_expand_on").hide();

			$("#top2_3_03").show();

			img_left = (inner_width - map_width)/2;
			$("#map_3_03_2").css("left", img_left);
			$("#map_3_03_2").css("top" , menu_dep2_top );
			$("#map_3_03_2").css("z-index", 2);
			$("#map_3_03_2").show();

			$("#pcs_3_03_2").css("left", $("#map_3_03_2").position().left + 693); //신성동
			$("#pcs_3_03_2").css("top" , menu_dep2_top + 129);
			$("#pcs_3_03_2").css("opacity", 0.5);
			$("#pcs_3_03_2").css("z-index", 3001);
			$("#pcs_3_03_2").show();

			$("#pcs_3_03_2_tip").css("left", $("#pcs_3_03_2").position().left +  $("#pcs_3_03_2").width() + 6);
			$("#pcs_3_03_2_tip").css("top" , $("#pcs_3_03_2").position().top + 70);
			$("#pcs_3_03_2_tip").css("z-index", 3002);

			$("#left_3_03").css("z-index", 3003);
			$("#left_3_03_1").css("z-index", 3004);

			$("#pcs_3_03_1").css("left", $("#right_emd").position().left - $("#pcs_3_03_1").width() + 34); //범례
			$("#pcs_3_03_1").css("top" , inner_height - $("#pcs_3_03_1").height() - 5);
			$("#pcs_3_03_1").css("z-index", 3005);
			$("#pcs_3_03_1").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "‘응급의료시설’의 접근현황은 색상으로, 위치는 <u>POI</u>로 조회됩니다.<br>"
                                    + "<u>지역경계 안으로 마우스포인터를 이동</u>하시면 ‘접근시간별 인구수’가 툴팁으로 제공됩니다.<br>"
                                    + "마커를 선택하시면 해당 응급의료시설 명을 보실 수 있습니다.<br>"
                                    + " <br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#pcs_5_00_0").hide();

            break;


        case 31:
            /* 숨기기(prev) */

			$("#top2_3_03").show();

			img_left = (inner_width - map_width)/2;
			$("#map_3_03_2").css("left", img_left);
			$("#map_3_03_2").show();

			$("#left_3_03").show();
			$("#left_3_03_1").show();

			$("#pcs_3_03_2").css("left", $("#map_3_03_2").position().left + 693); //신성동
			$("#pcs_3_03_2_tip").css("left", $("#pcs_3_03_2").position().left +  $("#pcs_3_03_2").width() + 6);

			$("#pcs_5_00_0").css("left", 0);
			$("#pcs_5_00_0").css("top" , menu_dep2_top + 249);
			$("#pcs_5_00_0").css("z-index", 3101);
			$("#pcs_5_00_0").show();

			$("#pcs_3_03_1").css("left", $("#right_emd").position().left - $("#pcs_3_03_1").width() + 34); //범례
			$("#pcs_3_03_1").css("top" , inner_height - $("#pcs_3_03_1").height() - 5);
			$("#pcs_3_03_1").css("z-index", 3102);
			$("#pcs_3_03_1").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + " ‘환경과 안전’카테고리의 ‘소방시설 접근현황’ 역시 네트워크데이터로 표출되는 주제도입니다.<br>"
                                    + " <br>"
                                    + "다른 특이한 주제도를 살펴보겠습니다.<br>"
                                    + "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘환경과 안전’버튼을 선택</strong>합니다.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#left_5_0").hide();
			$("#left_5_03").hide();
			$("#btn_5_03_0").hide();
			$("#btn_5_03_1").hide();

            break;


        case 32:
            /* 숨기기(prev) */
			$("#pcs_5_00_0").hide();
			$("#left_3_03").hide();

			$("#top2_3_03").show();

			img_left = (inner_width - map_width)/2;
			$("#map_3_03_2").css("left", img_left);
			$("#map_3_03_2").show();
			$("#left_3_03_1").show();
			$("#pcs_3_03_2").css("left", $("#map_3_03_2").position().left + 693); //신성동
			$("#pcs_3_03_2").show();
			$("#pcs_3_03_2_tip").css("left", $("#pcs_3_03_2").position().left +  $("#pcs_3_03_2").width() + 6);

			$("#pcs_3_03_1").css("left", $("#right_emd").position().left - $("#pcs_3_03_1").width() + 34); //범례
			$("#pcs_3_03_1").css("top" , inner_height - $("#pcs_3_03_1").height() - 5);
			$("#pcs_3_03_1").css("z-index", 3201);
			$("#pcs_3_03_1").show();

			$("#left_5_0").css("left", 0);
			$("#left_5_0").css("top" , menu_dep2_top );
			$("#left_5_0").css("z-index", 3201);
			$("#left_5_0").show();

			$("#left_5_03").css("left", $("#left_5_0").width());
			$("#left_5_03").css("top" , menu_dep2_top );
			$("#left_5_03").css("z-index", 3202);
			$("#left_5_03").show();

			$("#btn_5_03_0").css("left", $("#left_5_0").width() + 4);
			$("#btn_5_03_0").css("top" , menu_dep2_top + 104);
			$("#btn_5_03_0").css("z-index", 3203);
			$("#btn_5_03_0").show();

			$("#btn_5_03_1").css("left", $("#btn_5_03_0").position().left + $("#btn_5_03_0").width() + 6);
			$("#btn_5_03_1").css("top" , menu_dep2_top + 119);
			$("#btn_5_03_1").css("z-index", 3204);

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘생활안전사고 출동건수’를 선택</strong>합니다.<br>"
                                    + "<br>"
                                    + "<br>"
                                    + "<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#top2_5_03").hide();
			$("#map_5_03_1").hide();
			$("#left_5_03_1").hide();
			$("#pcs_5_03_1").hide();
			$("#pcs_5_03_2").hide();

            break;


        case 33:
            /* 숨기기(prev) */
			$("#top2_3_03").hide();
			$("#map_3_03_2").hide();
			$("#left_3_03_1").hide();
			$("#btn_5_03_0").hide();
			$("#btn_5_03_1").hide();
			$("#pcs_3_03_1").hide(); //응급의료시설 접근현황 범례
			$("#pcs_3_03_2").hide();

			$("#top2_5_03").css("left", 95);
			$("#top2_5_03").css("top" , menu_dep1_top );
			$("#top2_5_03").css("z-index", 1000);
			$("#top2_5_03").show();

			img_left = (inner_width - map_width)/2;
			$("#map_5_03_1").css("left", img_left);
			$("#map_5_03_1").css("top" , menu_dep2_top );
			$("#map_5_03_1").css("z-index", 2);
			$("#map_5_03_1").show();

			$("#left_5_03_1").css("left", $("#left_5_0").width() + $("#left_5_03").width());
			$("#left_5_03_1").css("top" , menu_dep2_top );
			$("#left_5_03_1").css("z-index", 3301);
			$("#left_5_03_1").show();

			$("#pcs_5_03_1").css("left", $("#map_5_03_1").position().left + 904);
			$("#pcs_5_03_1").css("top" , menu_dep2_top + 453 );
			$("#pcs_5_03_1").css("z-index", 3302);
			$("#pcs_5_03_1").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "시도별 안전사고 출동건수에 대한 통계가 ‘파이차트’형태로 제공됩니다.<br>"
                                    + "(‘복지와 문화’ 카테고리의 ‘보육업체 취약인구 현황’에서도 ‘파이차트’형태의 통계를 제공합니다.)<br>"
                                    + " <br>"
                                    + "파이차트 중 <strong style=\"color:#ee7c1a; font-weight:bold;\">‘부산광역시’를 선택</strong>합니다.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#map_5_03_2").hide();
			$("#btn_5_02_0").hide();
			$("#btn_5_02_1").hide();

            break;


        case 34:
            /* 숨기기(prev) */
			$("#map_5_03_1").hide();
			$("#pcs_5_03_1").hide();
			$("#pcs_5_03_2").hide();

			$("#top2_5_03").show();

			img_left = (inner_width - map_width)/2;
			$("#map_5_03_2").css("left", img_left);
			$("#map_5_03_2").css("top" , menu_dep2_top );
			$("#map_5_03_2").css("z-index", 2);
			$("#map_5_03_2").show();

			$("#left_5_03").show();
			$("#left_5_03_1").show();

			$("#btn_5_02_0").css("left", $("#left_5_0").width() + 4);
			$("#btn_5_02_0").css("top" , menu_dep2_top + 74);
			$("#btn_5_02_0").css("z-index", 3401);
			$("#btn_5_02_0").show();

			$("#btn_5_02_1").css("left", $("#btn_5_02_0").position().left + $("#btn_5_02_0").width() + 6);
			$("#btn_5_02_1").css("top" , menu_dep2_top + 89);
			$("#btn_5_02_1").css("z-index", 3402);

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "파이차트의 각 색상을 설명하는 ‘사고유형별 세부 통계’가 나타납니다.<br>"
                                    + " <br>"
                                    + "이번에는 색상타입과 POI타입이 동시에 제공되는 주제도를 살펴보겠습니다.<br>"
                                    + "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘무더위 쉼터 현황’을 선택</strong>합니다.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#top2_5_02").hide();
			$("#map_5_02_1").hide();
			$("#left_5_02").hide();
			$("#left_5_02_1").hide();
			$("#right_expand_on").hide();
			$("#pcs_5_02_1").hide();
			$("#pcs_5_02_1_tip").hide();

            break;


        case 35:
            /* 숨기기(prev) */
			$("#top2_5_03").hide();
			$("#map_5_03_2").hide();
			$("#btn_5_02_0").hide();
			$("#btn_5_02_1").hide();
			$("#left_5_03").hide();
			$("#left_5_03_1").hide();

			$("#top2_5_02").css("left", 95);
			$("#top2_5_02").css("top" , menu_dep1_top );
			$("#top2_5_02").css("z-index", 1000);
			$("#top2_5_02").show();

			img_left = (inner_width - map_width)/2;
			$("#map_5_02_1").css("left", img_left);
			$("#map_5_02_1").css("top" , menu_dep2_top );
			$("#map_5_02_1").css("z-index", 2);
			$("#map_5_02_1").show();

			$("#pcs_5_02_1").css("left", $("#map_5_02_1").position().left + 762); //강원도
			$("#pcs_5_02_1").css("top" , menu_dep2_top + 140);
			$("#pcs_5_02_1").css("z-index", 3501);
			$("#pcs_5_02_1").show();

			$("#pcs_5_02_1_tip").css("left", $("#pcs_5_02_1").position().left +  $("#pcs_5_02_1").width() + 6);
			$("#pcs_5_02_1_tip").css("top" , $("#pcs_5_02_1").position().top + 70);
			$("#pcs_5_02_1_tip").css("z-index", 3502);

			$("#left_5_02").css("left", $("#left_5_0").width());
			$("#left_5_02").css("top" , menu_dep2_top );
			$("#left_5_02").css("z-index", 3503);
			$("#left_5_02").show();

			$("#left_5_02_1").css("left", $("#left_5_0").width() + $("#left_5_02").width());
			$("#left_5_02_1").css("top" , menu_dep2_top );
			$("#left_5_02_1").css("z-index", 3504);
			$("#left_5_02_1").show();

			img_left = $("#right_emd").position().left - 3;
			img_top  = $("#right_emd").position().top  - 3;
			$("#right_expand_on").css("left", img_left);
			$("#right_expand_on").css("top" , img_top);
			$("#right_expand_on").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "‘시도/시군구/읍면동’의 경우에는 색상으로만 통계를 표출합니다.<br>"
                                    + "원하는 지역의 ‘집계구’ 경계가 나타날 때까지 지도를 확대하시면<br>"
                                    + "무더위 쉼터의 위치를 확인하실 수 있습니다.<br>"
                                    + "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘확대’버튼을 클릭</strong>합니다.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#map_5_02_2").hide();
			$("#btn_5_04_0").hide();
			$("#btn_5_04_1").hide();

            break;


        case 36:
            /* 숨기기(prev) */
			$("#map_5_02_1").hide();
			$("#right_expand_on").hide();
			$("#pcs_5_02_1").hide();
			$("#pcs_5_02_1_tip").hide();

			$("#top2_5_02").show();

			img_left = (inner_width - map_width)/2;
			$("#map_5_02_2").css("left", img_left);
			$("#map_5_02_2").css("top" , menu_dep2_top );
			$("#map_5_02_2").css("z-index", 2);
			$("#map_5_02_2").show();

			$("#left_5_02").show();
			$("#left_5_02_1").show();

			$("#btn_5_04_0").css("left", $("#left_5_0").width() + 1);
			$("#btn_5_04_0").css("top" , menu_dep2_top + 140);
			$("#btn_5_04_0").css("opacity", "0.5");
			$("#btn_5_04_0").css("z-index", 3601);
			$("#btn_5_04_0").show();

			$("#btn_5_04_1").css("left", $("#btn_5_04_0").position().left + $("#btn_5_04_0").width() + 6);
			$("#btn_5_04_1").css("top" , menu_dep2_top + 155);
			$("#btn_5_04_1").css("z-index", 3602);

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "무더위 쉼터의 위치가 POI 형태로 나타납니다.<br>"
                                    + "이와 같은 주제도로는 ‘도서관 분포 현황’,  ‘보건시설 1개당 65세 이상 노인인구’가 있습니다.<br>"
                                    + "이번에는 지진발생분포지역 주제도를 살펴보겠습니다.<br>"
                                    + "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘지진발생분포지역’을 선택</strong>합니다.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#top2_5_04").hide();
			$("#map_5_04_1").hide();
			$("#left_5_04").hide();
			$("#left_5_04_1").hide();
			$("#pcs_5_04_1").hide();
			$("#databoard_5_04_1").hide();

            break;


        case 37:
            /* 숨기기(prev) */
			$("#top2_5_02").hide();
			$("#map_5_02_2").hide();
			$("#left_5_02").hide();
			$("#left_5_02_1").hide();
			$("#btn_5_04_0").hide();
			$("#btn_5_04_1").hide();

			$("#top2_5_04").css("left", 95);
			$("#top2_5_04").css("top" , menu_dep1_top );
			$("#top2_5_04").css("z-index", 1000);
			$("#top2_5_04").show();

			img_left = (inner_width - map_width)/2;
			$("#map_5_04_1").css("left", img_left);
			$("#map_5_04_1").css("top" , menu_dep2_top );
			$("#map_5_04_1").css("z-index", 2);
			$("#map_5_04_1").show();

			$("#left_5_04").css("left", $("#left_5_0").width());
			$("#left_5_04").css("top" , menu_dep2_top );
			$("#left_5_04").css("z-index", 3701);
			$("#left_5_04").show();

			$("#left_5_04_1").css("left", $("#left_5_0").width() + $("#left_5_04").width());
			$("#left_5_04_1").css("top" , menu_dep2_top );
			$("#left_5_04_1").css("z-index", 3701);
			$("#left_5_04_1").show();

			$("#pcs_5_04_1").css("left", $("#map_5_04_1").position().left + 828); //경상북도
			$("#pcs_5_04_1").css("top" , menu_dep2_top + 292);
			$("#pcs_5_04_1").css("z-index", 3702);
			$("#pcs_5_04_1").show();

			$("#pcs_5_04_1_tip").css("left", $("#pcs_5_04_1").position().left +  $("#pcs_5_04_1").width() + 6);
			$("#pcs_5_04_1_tip").css("top" , $("#pcs_5_04_1").position().top + 70);
			$("#pcs_5_04_1_tip").css("z-index", 3803);

			img_left = $("#right_emd").position().left - $("#databoard_5_04_1").width() - 10;
			$("#databoard_5_04_1").css("left", img_left);
			$("#databoard_5_04_1").css("top" , menu_dep1_top);
			$("#databoard_5_04_1").css("z-index", 3704);
			$("#databoard_5_04_1").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "지진 발생위치가 붉은 점으로 표시되며, 지진발생 수는 색상으로 나타납니다.<br>"
                                    + "지역의 ‘연도별 지진발생 수’를 자세히 알아보기 위해<br>"
                                    + "<strong style=\"color:#ee7c1a; font-weight:bold;\">‘경상북도’를 선택</strong>합니다.<br>"
                                    + " <br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */
			$("#pcs_5_04_2").hide();
			$("#databoard_5_04_2").hide();

            break;

        case 38:
            /* 숨기기(prev) */
			$("#pcs_5_04_1").hide();
			$("#databoard_5_04_1").hide();

			$("#top2_5_04").show();

			img_left = (inner_width - map_width)/2;
			$("#map_5_04_1").css("left", img_left);
			$("#map_5_04_1").show();

			$("#pcs_5_04_2").css("left", $("#map_5_04_1").position().left + 824); //경상북도
			$("#pcs_5_04_2").css("top" , menu_dep2_top + 293);
			$("#pcs_5_04_2").css("z-index", 3801);
			$("#pcs_5_04_2").show();

			$("#pcs_5_04_1_tip").css("left", $("#pcs_5_04_2").position().left +  $("#pcs_5_04_2").width() + 6);

			img_left = $("#right_emd").position().left - $("#databoard_5_04_2").width() - 10;
			$("#databoard_5_04_2").css("left", img_left);
			$("#databoard_5_04_2").css("top" , menu_dep1_top);
			$("#databoard_5_04_2").css("z-index", 3803);
			$("#databoard_5_04_2").show();

            $("#tutorialText").append("<div class=\"title\">"
                                    + "<p></p>"
                                    + "</div>"
                                    + "<div class=\"content\">"
                                    + "<p>"
                                    + "데이터보드에 ‘경상북도’의 ‘연도별 지진발생 수’가 나타납니다.<br>"
                                    + " <br>"
                                    + "‘복지와 문화’ 카테고리의 ‘문화재 현황’주제도에서는<br>"
                                    + "문화재관리지도를 서비스합니다. 둘러보시기를 추천드립니다.<br>"
                                    + "</p></div>");
            posiInfo(targetPage);

            /* 숨기기(next) */

			if(wrTimer != 'undefined'){
				clearTimeout(wrTimer);
			}

            break;

		case 39:

			$("#top2_5_04").show();

			img_left = (inner_width - map_width)/2;
			$("#map_5_04_1").css("left", img_left);
			$("#map_5_04_1").show();

			$("#pcs_5_04_2").css("left", $("#map_5_04_1").position().left + 824); //경상북도
			$("#pcs_5_04_2").show();

			$("#pcs_5_04_1_tip").css("left", $("#pcs_5_04_2").position().left +  $("#pcs_5_04_2").width() + 6);

			img_left = $("#right_emd").position().left - $("#databoard_5_04_2").width() - 10;
			$("#databoard_5_04_2").css("left", img_left);
			$("#databoard_5_04_2").show();

			$("#tutorialText").append("<div class=\"title\"><p><통계주제도> 튜토리얼을 마쳤습니다. 축하드립니다!</p></div>"
									+ "<div class=\"content\">"
									+ "<p><strong style=\"color:#ff0000;  font-weight:bold;\">(10초 후에 <통계주제도> 첫화면으로 이동합니다.)<br> <br></p>"
									+ "</div>");

			wrTimer = setTimeout(function(){
				
						  //mng_s 20200422 이진호
						  //튜토리얼 모든 단계가 끝나면 통계주제도 서비스로 이동하게 
						  location.href = "/view/thematicMap/thematicMapMain?stat_thema_map_id=FlM5JUWj0T20181120214718029IpoBrl4UVw&theme=CTGR_001&mapType=04";
						  //document.location.reload();
						  //mng_e 20200422 이진호
						  
						  
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
                                    + "<strong style=\"color:#ee7c1a; font-weight:bold;\"></strong>"
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

		if(targetPage < tutoLastPage){
			ttText += "<a href=\"#\"><button id=\"next\" type=\"button\" alt=\"다음\" style=\"top: -16px; width:60px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #457AB0; font-size: 14px; cursor:point;\">다음</button></a>";
		} else {
			ttText += "<button type=\"button\" alt=\"\" style=\"top: -16px; width:60px; height:28px; margin:0 1px 0 1px; line-height:19px; color: #ffffff; background-color: #ffffff; font-size: 14px; cursor:default;\" disabled>&nbsp;&nbsp;&nbsp;&nbsp;</button>";
		}
		ttText += "</div>";
		$("#tutorialText").append(ttText);
	}

	$("#btn_1_14_0"        ).click(function() { nextPage(); });
	$("#pcs_0_2"           ).click(function() { nextPage(); });
	$("#pcs_0_3"           ).click(function() { nextPage(); });
	$("#right_expand_on"   ).click(function() { nextPage(); });
	$("#right_reduction_on").click(function() { nextPage(); });
	$("#pcs_1_14_emd"      ).click(function() { nextPage(); });
	$("#btn_1_03_0"        ).click(function() { nextPage(); });
	$("#btn_1_03_1"        ).click(function() { nextPage(); });
	$("#pcs_1_03_1"        ).click(function() { nextPage(); });
	$("#pcs_1_03_2"        ).click(function() { nextPage(); });
	$("#pcs_1_03_3"        ).click(function() { nextPage(); });
	$("#btn_1_05_0"        ).click(function() { nextPage(); });
	$("#pcs_1_05_2"        ).click(function() { nextPage(); });
	$("#pcs_1_05_3_on"     ).click(function() { nextPage(); });
	$("#btn_1_12_0"        ).click(function() { nextPage(); });
	$("#top2_report"       ).click(function() { nextPage(); });
	$("#pop_1_12_2"        ).click(function() { nextPage(); });
	$("#pcs_3_00_0"        ).click(function() { nextPage(); });
	$("#btn_3_08_0"        ).click(function() { nextPage(); });
	$("#btn_3_03_0"        ).click(function() { nextPage(); });
	$("#pcs_5_00_0"        ).click(function() { nextPage(); });
	$("#btn_5_03_0"        ).click(function() { nextPage(); });
	$("#pcs_5_03_1"        ).click(function() { nextPage(); });
	$("#btn_5_02_0"        ).click(function() { nextPage(); });
	$("#btn_5_04_0"        ).click(function() { nextPage(); });
	$("#pcs_5_04_1"        ).click(function() { nextPage(); });


	$("#btn_1_14_0").mouseover(function(){   $("#btn_1_14_1").show();   });
	$("#btn_1_14_0").mouseout (function(){   $("#btn_1_14_1").hide();   });

	$("#btn_1_03_0").mouseover(function(){   $("#btn_1_03_1").show();   });
	$("#btn_1_03_0").mouseout (function(){   $("#btn_1_03_1").hide();   });

	$("#btn_1_05_0").mouseover(function(){   $("#btn_1_05_1").show();   });
	$("#btn_1_05_0").mouseout (function(){   $("#btn_1_05_1").hide();   });

	$("#btn_1_12_0").mouseover(function(){   $("#btn_1_12_1").show();   });
	$("#btn_1_12_0").mouseout (function(){   $("#btn_1_12_1").hide();   });

	$("#btn_3_08_0").mouseover(function(){   $("#btn_3_08_1").show();   });
	$("#btn_3_08_0").mouseout (function(){   $("#btn_3_08_1").hide();   });

	$("#btn_3_03_0").mouseover(function(){   $("#btn_3_03_1").show();   });
	$("#btn_3_03_0").mouseout (function(){   $("#btn_3_03_1").hide();   });

	$("#btn_5_03_0").mouseover(function(){   $("#btn_5_03_1").show();   });
	$("#btn_5_03_0").mouseout (function(){   $("#btn_5_03_1").hide();   });

	$("#btn_5_02_0").mouseover(function(){   $("#btn_5_02_1").show();   });
	$("#btn_5_02_0").mouseout (function(){   $("#btn_5_02_1").hide();   });

	$("#btn_5_04_0").mouseover(function(){   $("#btn_5_04_1").show();   });
	$("#btn_5_04_0").mouseout (function(){   $("#btn_5_04_1").hide();   });

	$("#pcs_2").mouseover(function(){
		$("#tooltip_1").show();
	});
	$("#pcs_2").mouseout(function(){
		$("#tooltip_1").hide();
	});
	$("#pcs_1_14_1").mouseover(function(){
		$("#pcs_1_14_1_tip").show();
	});
	$("#pcs_1_14_1").mouseout(function(){
		$("#pcs_1_14_1_tip").hide();
	});
	$("#pcs_1_14_2").mouseover(function(){
		$("#pcs_1_14_2_tip").show();
	});
	$("#pcs_1_14_2").mouseout(function(){
		$("#pcs_1_14_2_tip").hide();
	});

	$("#pcs_1_03_2").mouseover(function(){
		$("#pcs_1_03_2_tip").css("left", $("#pcs_1_03_2").position().left +  $("#pcs_1_03_2").width() + 6);
		$("#pcs_1_03_2_tip").css("top" , $("#pcs_1_03_2").position().top + 10);
		$("#pcs_1_03_2_tip").css("z-index", 1605);
		$("#pcs_1_03_2_tip").show();
	});
	$("#pcs_1_03_2").mouseout(function(){
		$("#pcs_1_03_2_tip").hide();
	});


	$("#pcs_1_05_1").mouseover(function(){
		$("#pcs_1_05_1_tip").show();
	});
	$("#pcs_1_05_1").mouseout(function(){
		$("#pcs_1_05_1_tip").hide();
	});

	$("#pcs_1_12_0_L").mouseover(function(){
		$("#pcs_1_12_1_L").css("left", inner_width/2- $("#pcs_1_12_1_L").width() - 20);
		$("#pcs_1_12_1_L").css("top" , menu_dep2_top + 5);
		$("#pcs_1_12_1_L").css("z-index", 2804);
		$("#pcs_1_12_1_L").show();

		$("#pcs_1_12_1_R").css("left", inner_width/2 + 20);
		$("#pcs_1_12_1_R").css("top" , menu_dep2_top + 5);
		$("#pcs_1_12_1_R").css("z-index", 2805);
		$("#pcs_1_12_1_R").show();
	});
	$("#pcs_1_12_0_L").mouseout(function(){
		$("#pcs_1_12_1_L").hide();
		$("#pcs_1_12_1_R").hide();
	});
	$("#pcs_1_12_0_R").mouseover(function(){
		$("#pcs_1_12_0_L").mouseover();
	});
	$("#pcs_1_12_0_R").mouseout(function(){
		$("#pcs_1_12_0_L").mouseout();
	});

	$("#pcs_3_08_1").click(function() {
		$("#pcs_3_08_1").hide();
		$("#pcs_3_08_2").show();
	});

	$("#pcs_3_03_2").mouseover(function(){
		$("#pcs_3_03_2_tip").show();
	});
	$("#pcs_3_03_2").mouseout(function(){
		$("#pcs_3_03_2_tip").hide();
	});

	$("#pcs_5_02_1").mouseover(function(){
		$("#pcs_5_02_1_tip").show();
	});
	$("#pcs_5_02_1").mouseout(function(){
		$("#pcs_5_02_1_tip").hide();
	});

	$("#pcs_5_04_1").mouseover(function(){
		$("#pcs_5_04_1_tip").show();
	});
	$("#pcs_5_04_1").mouseout(function(){
		$("#pcs_5_04_1_tip").hide();
	});

	$("#pcs_5_04_2").mouseover(function(){
		$("#pcs_5_04_1_tip").show();
	});
	$("#pcs_5_04_2").mouseout(function(){
		$("#pcs_5_04_1_tip").hide();
	});

}

function closeTutorial() {
	$("#tuto_tm_start_btn04").show();
	var closeMsg = confirm("튜토리얼을 종료하시겠습니까?");
	if (closeMsg) {
//		location.href = "/view/thematicMap/thematicMapMain?stat_thema_map_id=FlM5JUWj0T20181120214718029IpoBrl4UVw&theme=CTGR_001&mapType=04";
//		document.location.reload();
		window.close();
	} else {
		return false;
	}
}

function showLegend(){

	switch(tutoCurrentPage){
	case 4:
		$("#legend_1").hide();

		img_left = 15;
		img_top = inner_height - $("#legend_1").height() - 15;
		if(img_top < menu_dep2_top) img_top = menu_dep2_top + 1;

		$("#legend_1").css("left", img_left);
		$("#legend_1").css("top" , img_top);
		$("#legend_1").css("z-index", 3);
		$("#legend_1").show();
		break;
	case 23:
	case 24:
	case 25:
	case 26:
	case 27:
//		img_left = inner_half_width - ($("#map_1_12_1").width()/2) + 15;
//		if(img_left < 95) img_left = 95;
		img_top = inner_height - $("#legend_2").height() - 15;
		if(img_top < menu_dep2_top) img_top = menu_dep2_top + 1;
		img_left = $("#left_1_0").width() + 15;
		$("#legend_2").css("left", img_left);
		$("#legend_2").css("top" , img_top);
		$("#legend_2").css("z-index", 3);
		$("#legend_2").show();

		img_left = inner_width/2 + 22;
//		img_left = $("#map_1_12_1").position().left + $("#map_1_12_1").width()/2 + 15;
		img_top = inner_height - $("#legend_3").height() - 15;
		if(img_top < menu_dep2_top) img_top = menu_dep2_top + 1;
		$("#legend_3").css("left", img_left);
		$("#legend_3").css("top" , img_top);
		$("#legend_3").css("z-index", 3);
		$("#legend_3").show();
		break;
	}

}

function hideLegend(){
	$("#legend_1").hide();
	$("#legend_2").hide();
	$("#legend_3").hide();
}
