// 튜토리얼
function biz_readyTutorial() {	
//	setCookie("confirmMsg", "done", 365);
	var iWidth = $(window).width();
	var iHeight = $(window).height();
	if (iWidth > 1920 || iHeight > 1080) {
		var warnMsg = confirm("튜토리얼 최대,최적의 해상도는 1920x1080입니다.\n\n"
				+ "튜토리얼이 제대로 실행되지 않을 수 있습니다.\n\n" + "그래도 실행 하시겠습니까?");
		if (warnMsg == 1) {
			$(".tutorialWrapper").show();
			biz_startTutorial();
		} else {
			alert("생활업종 통계지도 화면으로 돌아가겠습니다.");
			window.close();
		}
	} else {
		srvLogWrite('G1', '11', '02', '00', '', '생활업종 튜토리얼');
		biz_startTutorial();
	}
}

function biz_startTutorial() {
	if($(window).height()>=1080||$(window).width()>=1920){
		$("#toPoint_db3").css("top","540px");
	}else{
		$("#toPoint_db3").css("bottom","320px");		
	}
//	var board_height_ = $("#dataBoardImgDiv").height();
	$(document).keyup(function(event) {
		if (window.event.keyCode == 27) {
			closeTutorial();
		}
	})

	$(window).resize(function() {

		if (this.resizeTO) {
			clearTimeout(this.resizeTO);
		}
		this.resizeTO = setTimeout(function() {
			$(this).trigger('resizeEnd');
		}, 100);

	});
	$(window).on('resizeEnd',function() {
				$("#dataBoardImgDiv").css("top", 138);
				var iWidth_ = $(window).width();
				var iHeight_ = $(window).height();
				if (iWidth_ > 1920 || iHeight_ > 1080 || iWidth_ < 800
						|| iHeight_ < 600) {
					var warnMsg = confirm("튜토리얼 최대,최적의 해상도는 1920x1080입니다.\n\n"
							+ "튜토리얼이 제대로 실행되지 않을 수 있습니다.\n\n"
							+ "그래도 실행 하시겠습니까?");
					if (warnMsg == 1) {
						return false;
					} else {
						alert("생활업종 통계지도 화면으로 돌아가겠습니다.");
						location.href = "/view/bizStats/bizStatsMap";
					}
				}
			});
	tutorial_log();	
	$("#tuto_start_btn").hide();
	$(".tutorialWrapper").show();
	$("#mainMenuImg").show();
	$("#headerTutorial").show();

	var mainMenuChk = 0;
	var cleanChk = 0;
	var addrChk = 0;
	var okChk = 0;
	var clipChk = 0;
	var jobOpenChk = 0;
	// mng_s 20200617 김건민 (문구 수정함)
	$("#tutorialText").append("<div class=\"title\">"
					+ "<p><span style=\"margin-left:5px;\">생활업종 통계지도 첫 사용을 환영합니다!</span></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					// 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지와 도움말 현행화 (pse)
					//+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">생활업종 통계지도</strong>는 음식점, 소매업, 생활서비스, 숙박업 등 국민생활과 밀접한 36종의 주요<br>"
					+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">생활업종 통계지도</strong>는 음식, 소매업, 생활서비스, 여가생활 등 국민생활과 밀접한 "+$themeCdCommon.smallThemeCdList.length+"종의 주요<br>" // 2020년 SGIS고도화 3차(테마코드) - 전체 테마코드 개수를 DB에 실제 있는 데이터의 개수와 일치(pse)
					// 2020년 SGIS고도화 3차(테마코드) 끝 - 이미지와 도움말 현행화 (pse)
					+ "생활업종에 대한 다양한 통계정보를 조회할 수 있는 서비스입니다.</strong><br>"
					+ "먼저 시도 단위의 생활업종현황을 살펴보겠습니다. <strong style=\"color:#ee7c1a;  font-weight:bold;\">통계메뉴를 클릭해 주세요.</strong>"
					+ "</p></div>");
	// mng_s 20200617 김건민 
	var posi = "";
	var width = 0;
	var height = 0;
	var tutoImg = [$("#mainMenuImg"),
	               $("#sidoBizMainImg"),$("#sidoBizPoiImg1"),$("#bizSidoButton"),/*$("#sidoBizDbFoodImg")*/$("#bizSidoLqSelect"),$("#mainMenuImg"),
	               // 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지와 현행화 (pse)
	               //$("#sggBizMainImg"),$("#restaurantImg"),$("#cafeImg"),$("#addrSearchImg"),$("#okImg"),
	               $("#sggBizMainImg"),$("#restaurantImg_2020"),$("#cafeImg"),$("#addrSearchImg"),$("#okImg"),
	               // 2020년 SGIS고도화 3차(테마코드) 끝 - 이미지 현행화 (pse)
	               $("#sggMapInfoImg"),/*$("#chickenImg")*/$("#pageClipImg"),$("#mainMenuImg"),$("#areaBizMainImg"),$("#serviceImg"),
	               $("#pcImg"),$("#areaHeatSido"),$("#areaHeatSgg"),$("#heatRadiusImg"),$("#pcInfoImg1"),
	               $("#mainMenuImg"),$("#lqBizImg"),$("#lqImgFood"),$("#lqImg0"),$("#lqImg3"),
	               $("#lqImg5"),$("#mainMenuImg"),$("#searchBizMainImg"),$("#companyCntImg"),$("#ccOption"),
	               $("#employeeImg"),$("#searchBtnImg"),/*$("#addrSearchImg"),$("#okImg"),$("#dragBizImg"),*/$("#compareImg"),$("#galmaDetailBtn"),$("#pageClipImg"),
	               $("#pageClipImg"),$("#searchJobGraphImg"),$("#mainMenuImg"),$("#jobOpenImg"),$("#jobOpenImg2"),
	               $("#jobOpenImg3"),$("#map_btn"),$("#mainMenuImg"), $("#left_btn"), $("#jobOpenImg2"),
	               $("#jobOpenImg3"),$("#dataBoardCloseImg3"),
	               /*190423 방민정 수정 후보지정보 추가 시작*/
	               $("#areaInfo_btn"),$("#area_btn_1"),$("#area_btn_3"),$("#area_btn_4"),
	               $("#area_btn_6"),$("#addsearch_btn")];
					/*190423 방민정 수정 후보지정보 추가 끝*/
	var pointImg = [4,
	                4,2,1,2,4,
	                4,4,4,4,1,
	                2,2,4,4,4,
	                4,2,2,4,1,
	                4,4,4,2,4,
	                4,4,1,4,2,
	                2,2,2,1,2,
	                2,4,4,4,4,
	                4,4,4,4,2,
	                /*190423 방민정 수정 후보지정보 추가 시작*/
	                2,2,4,4,4,4];
					/*190423 방민정 수정 후보지정보 추가 끝*/
	var tutoIndex = 0;
	function posiInfo(i) {
		tutoIndex = i;

		if (i < 0) {
			$("#toPoint_1").hide();
			$("#toPoint_2").hide();
			$("#toPoint_3").hide();
			$("#toPoint_4").hide();
		} else {
			posi = tutoImg[i].position();
			width = tutoImg[i].width() / 2;
			height = tutoImg[i].height() / 2;
			pointInfo(i, true);
		}

		$(window).resize(function() {
//			var board_re_height_ = $("#dataBoardImgDiv").height();
//			if (board_re_height_ > board_height_) {
//				$("#dataBoardImgDiv").css("height", board_height_);
//			} else {
//				$("#dataBoardImgDiv").css("height", $(window).height());
//			}
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
			posiInfo(tutoIndex);
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
				$("#toPoint_1").css("top", posi.top - 15);
				$("#toPoint_1").css("left", posi.left - 70);
				$("#toPoint_2").css("top", posi.top - 15);
				$("#toPoint_2").css("left", posi.left - 70);
				$("#toPoint_3").css("top", posi.top - 15);
				$("#toPoint_3").css("left", posi.left - 70);
				$("#toPoint_4").css("top", posi.top - 15);
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
				$("#toPoint_1").css("top", posi.top - 15);
				$("#toPoint_1").css("left", posi.left + (width * 2));
				$("#toPoint_2").css("top", posi.top - 15);
				$("#toPoint_2").css("left", posi.left + (width * 2));
				$("#toPoint_3").css("top", posi.top - 15);
				$("#toPoint_3").css("left", posi.left + (width * 2));
				$("#toPoint_4").css("top", posi.top - 15);
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
				top : posi.top - 15,
				left : posi.left - 70
			}, 500, "", function() {
				$(this).animate({
					top : posi.top - 15,
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
				top : posi.top - 15,
				left : posi.left + (width * 2)
			}, 500, "", function() {
				$(this).animate({
					top : posi.top - 15,
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

	$("#mainMenuImg").click(function(){
		tutorial_log();
		if(mainMenuChk == 0){
			//fullMode(document.documentElement);
			$("#mainMenuImg").hide();
			//$(".sideQuick.sq02").addClass("on");
			//$("#map_left_btn").css("left","280px");
			//$("#map_left_btn").css("width","40px");
			//$("#map_left_btn>span").css("display","none");
			$(".sideQuick.sq02").trigger("click");
			//$(".step00").css("left",0);
			$("#sidoBizMainImg").show();
			mainMenuChk = 1;
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
							+ "<p></p>"
							+ "</div>"
							+ "<div class=\"content\">"
							+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">시도별 생활업종 현황을 클릭해 보세요.</strong>"
							+ "</p></div>");
			posiInfo(1);
		}else if(mainMenuChk == 1){
			$("#sidoBizDataBoardImg3").hide();
			$("#bizMapImg2").hide();
			$("#mainMenuImg").hide();
			$("#sidoBizLqDataBoardImg").hide();
			//$(".sideQuick.sq02").trigger("click");
			$("#sggBizMainImg").show();
			//$(".sq02").addClass("on");
			//$("#map_left_btn").css("left","280px");
			//$("#map_left_btn").css("width","40px");
			//$("#map_left_btn>span").css("display","none");
			$(".step00").css("left",0);
			mainMenuChk = 2;
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
							+ "<p></p>"
							+ "</div>"
							+ "<div class=\"content\">"
							+ "<p>이제 시군구 단위로 생활업종 현황을 살펴보겠습니다.<br>" 
							+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">시군구별 생활업종 현황을 클릭해 주세요.</strong>"
							+ "</p></div>");
			posiInfo(6);
		}else if(mainMenuChk == 2){
			$("#bizRedLegend1").hide();
			$("#bizMapImg4").hide();
			$("#bizMapImg5").hide();
			$("#sggMapInfoImg2").hide();
			$("#sggBizDataBoardImg2").hide();
			$("#sidoBizDataBoardImg3").hide();
			$(".icon02").removeClass("on");
			$(".sq02").trigger("click");
			//$(".stepBox>a:eq(0)").removeClass("on");
			$("#mainMenuImg").hide();
			$("#areaBizMainImg").show();
			//$(".sq02").addClass("on");
			//$("#map_left_btn").css("left","280px");
			//$("#map_left_btn").css("width","40px");
			//$("#map_left_btn>span").css("display","none");
			//$(".step01").css("left",0);
			mainMenuChk = 3;
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>이제 업종별 밀집도 현황을 열지도 형태로 확인해보겠습니다.<br>" 
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">업종 밀집도 현황을 클릭해 주세요.</strong>"
					+ "</p></div>");
			posiInfo(14);
		}else if(mainMenuChk == 3){
			$("#areaBizDataBoardImg5").hide();
			$("#bizMapImg14").hide();
			$("#areaHeatLegend2").hide();
			// 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지 수정
			//$("#pcInfoImg2").hide();
			$("#pcInfoImg2_2020").hide();
			// 2020년 SGIS고도화 3차(테마코드) 끝 - 이미지 수정
			$(".sq02").trigger("click");
			$("#mainMenuImg").hide();
			$("#lqBizImg").show();
			//$(".icon03").removeClass("on");
			//$(".stepBox>a:eq(0)").removeClass("on");
			//$(".sq02").addClass("on");
			//$("#map_left_btn").css("left","280px");
			//$("#map_left_btn").css("width","40px");
			//$("#map_left_btn>span").css("display","none");
			//$(".step01").css("left",0);
			//$("#searchBizMainImg").show();
			mainMenuChk = 4;
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">업종별 입지계수를 클릭해 주세요.</strong>"
					+ "</p></div>");
			posiInfo(22);
		}else if(mainMenuChk == 4){
			$("#areaBizDataBoardImg5").hide();
			$("#bizMapImg14").hide();
			$("#areaHeatLegend2").hide();
			// 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지 수정
			//$("#pcInfoImg2").hide();
			$("#pcInfoImg2_2020").hide();
			// 2020년 SGIS고도화 3차(테마코드) 끝 - 이미지 수정
			$("#lqImg6").hide();
			$("#lqImg7").hide();
			$("#mainMenuImg").hide();
			//$(".sq02").trigger("click");
			
			/*$(".icon03").removeClass("on");
			$(".stepBox>a:eq(0)").removeClass("on");
			$(".sq02").addClass("on");
			//$("#map_left_btn").css("left","280px");
			$("#map_left_btn").css("width","40px");
			$("#map_left_btn>span").css("display","none");
			$(".step01").css("left",0);*/
			$("#searchBizMainImg").show();
			mainMenuChk = 7;/*190423 방민정 수정 후보지정보 수정*/
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">조건별 지역찾기를 선택해 주세요.</strong>"
					+ "</p></div>");
			posiInfo(28);
		}else if(mainMenuChk == 5){
			$("#searchBizDataBoardImg5, #bizMapImg13, #redLegendInfo1").hide();
			$("#mainMenuImg").hide();
			$(".sq02").trigger("click");
			/*$(".icon05").removeClass("on");
			$(".stepBox>a:eq(0)").removeClass("on");
			$(".sq02").addClass("on");
			$("#map_left_btn").css("left","280px");
			$("#map_left_btn").css("width","40px");
			$("#map_left_btn>span").css("display","none");
			$(".step01").css("left",0);*/
			mainMenuChk = 7;/*190423 방민정 수정 후보지정보 수정*/
			
			//mng_s 20200427 이진호, 튜토리얼 현행화
			//해상도에 따른 분기처리
			//$("#jobOpenImg").show();
			if($(window).height()>=1080||$(window).width()>=1920){
				$("#jobOpenImg").show();
			}else{
				$("#jobOpenImg").show();
				$("#jobOpenImg").css({
					top : '545px'
				});
			}
			//mng_e 20200427 이진호
			
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>다음으로 지자체 인허가 통계 관련 기능을 살펴보겠습니다.<br> "
					+ "지방자치단체에서 인허가 하는 업종별 데이터 중 생활업종과 관련된 업종의 데이터를 이용해서<br>"
					+ "업종별 개업 현황과 업종별 뜨는 지역 정보를 제공합니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">업종별 개업 현황 메뉴를 클릭해주세요.</strong>"
					+ "</p></div>");
			posiInfo(39);
		}else if(mainMenuChk == 6){
			$("#mainMenuImg").hide();
			$("#map").hide();
			$("#jobOpenDataBoardImg_1").hide();
			$("#areaHeatLegend").hide();
			/*$(".step01").css("left",0);
			$(".icon05").removeClass("on");*/
			
			//mng_s 20200427 이진호 , 튜토리얼 현행화
			//$("#left_btn").show();
			if($(window).height()>=1080||$(window).width()>=1920){
				$("#left_btn").show();
			}else{
				$("#left_btn").css({
					display : '',
					top : '610px'
				});
			}
			//mng_e 20200427 이진호
			
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">지자체 인허가 통계의 업종별 뜨는 지역 메뉴를 클릭해주세요.</strong>"
					+ "</p></div>");
			posiInfo(44);
		}//190423 방민정  후보지 정보보기 추가 시작
		else if(mainMenuChk == 7){
			$("#searchBizDataBoardImg5, #bizMapImg13, #redLegendInfo1").hide();
			$("#mainMenuImg").hide();
			$(".sq02").trigger("click");
			mainMenuChk = 5;
			
			//mng_s 20200427 이진호 , 튜토리얼 현행화
			//$("#areaInfo_btn").show();
			if($(window).height()>=1080||$(window).width()>=1920){
				$("#areaInfo_btn").show();
			}else{
				$("#areaInfo_btn").css({
					display : '',
					top : '543px',
					right : '1435px'
				});
			}
			//mng_e 20200427 이진호
			
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">후보지 정보보기를 클릭해주세요.</strong>"
					+ "</p></div>");
			posiInfo(45);
		}
		//190423 방민정  후보지 정보보기 추가 끝
	});
	$("#sidoBizMainImg").click(function(){
		tutorial_log();
		$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
		$("#sidoBizMainImg").hide();
		$("#bizMapImg1").show();
		$("#sidoBizPoiImg1").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p>시도 단위의 전국지도가 보입니다.<br>" 
						+ "지도에서 원하는 지역을 선택하면 해당 지역의 상세정보를 조회할 수 있습니다.<br>"
						// 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지와 도움말이 상이함. 서울에서 경기도로 수정 (pse)
						//+"<strong style=\"color:#ee7c1a;  font-weight:bold;\">서울을 클릭해 보세요.</strong>"
						+"<strong style=\"color:#ee7c1a;  font-weight:bold;\">경기도를 클릭해 보세요.</strong>"
						// 2020년 SGIS고도화 3차(테마코드) 끝 - 이미지와 도움말이 상이함. 서울에서 경기도로 수정 (pse)
						+ "</p></div>");
		posiInfo(2);
	});
	$("#sidoBizPoiImg1").click(function(){
		tutorial_log();
		$("#sidoBizPoiImg1").hide();
		$("#bizMapImg1").hide();
		$("#bizMapImg2").show();
		$("#bizSidoButton").show();
		//$("#sidoBizDataBoardImg").show();
		//$("#sidoBizDbFoodImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		// mng_s 20200617 김건민 (문구 수정함.)
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>각 파이를 클릭하면 구체적인 <strong style=\"color:#0040ff;  font-weight:bold;\">생활업종 사업체 숫자와 비율</strong>을 볼 수 있습니다.<br>"
			// 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지와 도움말이 상이해서 수정(pse)
			//+ "서울특별시의 경우 다른 지역과 마찬가지로 음식점, 소매업 비율이 높게 나타나고 있습니다.<br>"
			+ "경기도의 경우 다른 지역과 마찬가지로 음식과 소매업  사업체의 비율이 높게 나타나고 있습니다.<br>"
			// 2020년 SGIS고도화 3차(테마코드) 끝 - 이미지와 도움말이 상이해서 수정(pse)
			+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">지역통계 데이터보기 버튼을 클릭하면 더 상세한 내용을 볼 수 있습니다.</strong></div>");
		// mng_e 20200617 김건민
		/*$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>서울지역의 생활업종 분류별 현황정보와 생활업종 지표별 순위정보를 볼 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">음식점 항목를 클릭해 보세요.</strong>"
				+ "</p></div>");*/
		posiInfo(3);
	});
	$("#bizSidoButton").click(function(){
		tutorial_log();
		$("#sidoBizDataBoardImg").hide();
		$("#sidoBizDbFoodImg").hide();
		$("#sidoBizDataBoardImg2").show();
		
		//mng_s 20200424 이진호 , 튜토리얼 현행화
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#bizSidoLqSelect").show();
		}else{
			$("#bizSidoLqSelect").show();
			$("#bizSidoLqSelect").css({
				top : '272px',
				left : '1090px'
			});
		}
		//mng_e 20200424 이진호
		
		$("#bizSidoButton").hide();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지와 도움말이 상이해서 수정(pse)
				//+ "<p>서울특별시의 종합현황 파이차트를 보여줍니다.<br>"
				//+ "음식점 업종의 사업체가 가장 많은 것을 알 수 있습니다.<br>"
				+ "<p>경기도의 종합현황 파이차트를 보여줍니다.<br>"
				+ "음식 업종의 사업체가 가장 많은 것을 알 수 있습니다.<br>"
				// 2020년 SGIS고도화 3차(테마코드) 끝 - 이미지와 도움말이 상이해서 수정(pse)
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">업종별 입지계수 현황을 클릭해 주세요.</strong>"
				+ "</p></div>");
		posiInfo(4);
	});
	$("#bizSidoLqSelect").click(function(){
		tutorial_log();
		$("#bizSidoButton").hide();
		$("#sidoBizDataBoardImg2").hide();
		$("#bizSidoLqSelect").hide();
		$("#sidoBizLqDataBoardImg").show();
		$("#mainMenuImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		// mng_s 20200617 김건민 (문구 수정함)
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지와 도움말이 상이해서 수정(pse)
				//+ "<p>서울특별시의 입지계수 현황 차트를 보여줍니다.<br>"
				//+ "생활서비스, 소매업, 음식점 업종의 집적도가 높은 것을 알 수 있습니다.<br>"
				+ "<p>경기도의 입지계수 현황 차트를 보여줍니다.<br>"
				+ "생활서비스, 여가생활, 음식, 교육 업종의 집적도가 높은 것을 알 수 있습니다.<br>"
				// 2020년 SGIS고도화 3차(테마코드) 끝 - 이미지와 도움말이 상이해서 수정(pse)
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">통계메뉴를 클릭해 주세요.</strong>"
				+ "</p></div>");
		// mng_e 20200617 김건민
		posiInfo(5);
	});
	/*$("#sidoBizDbFoodImg").click(function(){
		tutorial_log();
		$("#sidoBizDataBoardImg").hide();
		$("#sidoBizDbFoodImg").hide();
		$("#sidoBizDataBoardImg2").show();
		$("#pageClipImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>음식점 분류에 포함된 생활업종의 구성현황을 파이그래프로 보여줍니다.<br>"
				+ "역시 한식 업종의 사업체가 가장 많은 것을 알 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">파이그래프를 닫아 보세요.</strong>"
				+ "</p></div>");
		posiInfo(4);
	});*/
	$("#pageClipImg").click(function(){
		tutorial_log();
		/*if(clipChk == 0){
			$("#sidoBizDataBoardImg2").hide();
			$("#pageClipImg").hide();
			$("#sidoBizDataBoardImg3").show();
//			$("#cleanImg").show();
//			$("#cleanImg").css("right","122px");
			
			$("#mainMenuImg").show();
			
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>데이터보드 하단에 생활업종 지표별 순위정보를 보여줍니다.<br>"
					+ "조금전에 선택한 음식점 분류 기준으로 사업체 수, 비율, 증감 등의 지표에 대해서 업종별 순위를 <br>"
					+ "그래프로 볼 수 있습니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">통계메뉴를 클릭해 주세요.</strong>"
					+ "</p></div>");
			clipChk = 1;
			posiInfo(5);
		}*/
		if(clipChk == 0){
			$("#sggBizDataBoardImg1").hide();
			$("#pageClipImg").hide();
			$("#sidoBizDataBoardImg3").show();
//			$("#cleanImg").show();
//			$("#cleanImg").css("right","122px");
			
			$("#mainMenuImg").show();
			
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>데이터보드 하단에 생활업종 지표별 순위정보를 보여줍니다.<br>"
					+ "조금전에 선택한 음식점 분류 기준으로 사업체 수, 업종비율, 거주인구, 직장인구 등의 지표에 대해서 지역별 순위를 그래프로 볼 수 있습니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">통계메뉴를 클릭해 주세요.</strong>"
					+ "</p></div>");
			clipChk = 1;
			posiInfo(13);
		}else if(clipChk == 1){
			$("#pageClipImg").css("top","327px");
			$("#searchBizDataBoardImg2").hide();
			$("#searchBizDataBoardImg3").show();
			clipChk = 2;
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">한번더 메뉴를 클릭하여 닫아 주세요.</strong>"
					+ "</p></div>");
			posiInfo(36);
		}else if(clipChk == 2){
			$("#pageClipImg").hide();
			$("#searchBizDataBoardImg3").hide();
			$("#searchBizDataBoardImg4").show();
			$("#searchJobGraphImg").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>지역 종합현황정보 보기에서는 선택한 지역의 다양한 생활업종 현황을 그래프로 볼 수 있습니다.<br>"
					+ "데이터보드에서 각 지표를 클릭하면 됩니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">소상공인 업종별 증감을 눌러 주세요.</strong>"
					+ "</p></div>");
			posiInfo(37);
		}
	});
	$("#sggBizMainImg").click(function(){
		tutorial_log();
		$bizStatsLeftMenu.ui.setDetailStatsPanel('jobArea');
		$("#sggBizMainImg").hide();
		// 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지 현행화 (pse)
		//$("#restaurantImg").show();
		$("#restaurantImg_2020").show();
		// 2020년 SGIS고도화 3차(테마코드) 끝 - 이미지 현행화 (pse)
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>시군구 단위의 전국지도가 보입니다.<br>"
				+ "여기서 업종을 선택하면 해당업종의 전국 현황을 알 수 있습니다.<br>"
				+ "서울에서 카페가 가장 많은 지역은 어디인지 찾아보겠습니다.<br>"
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지와 설명 일치시키기 (pse)
				//+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">음식점을 클릭해 주세요.</strong>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">음식을 클릭해 주세요.</strong>"
				// 2020년 SGIS고도화 3차(테마코드) 끝 - 이미지와 설명 일치시키기 (pse)
				+"</p></div>");
		posiInfo(7);
	});
	
	// 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지 현행화 (pse)
	//$("#restaurantImg").click(function(){
	$("#restaurantImg_2020").click(function(){
	// 2020년 SGIS고도화 3차(테마코드) 끝 - 이미지 현행화 (pse)		
		tutorial_log();
		$(".stepBox>a:eq(0)").addClass("on");		
		$(".stepBox>div:eq(0)").css("display","block");		
		// 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지 현행화 (pse)
		//$("#restaurantImg").hide();
		$("#restaurantImg_2020").hide();
		// 2020년 SGIS고도화 3차(테마코드) 끝 - 이미지 현행화 (pse)
		$("#cafeImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">카페를 클릭해 주세요.</strong>"
				+"</p></div>");
		posiInfo(8);
	});
	$("#cafeImg").click(function(){
		tutorial_log();
		$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
		$("#cafeImg").hide();
		$("#bizRedLegend1").show();
		$("#bizMapImg3").show();
		$("#addrSearchImg").show();
		$("#addrSearchImg").css("border-style", "outset");
		$("#addrSearchImg").css("cursor", "pointer");
		$("#addrSearchImg").css("border-width", 3);
		$("#addrSearchImg").css("border-color", "red");
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>카페 업종에 대한 시군구 단위의 전국 사업체 현황이 색상지도로 표출됩니다.<br>"
				+ "서울지역을 자세히 보기 위해 지역을 바꿔보겠습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">지역선택 콤보박스를 클릭해 주세요.</strong><br>"
				+ "<strong style=\"color:#ff0000;  font-weight:bold;\">(마우스를 이용해서 지도이동 및 확대도 가능합니다.)</strong>"
				+"</p></div>");
		posiInfo(9);
	});
	$("#addrSearchImg").click(function(){
		tutorial_log();
		if(addrChk == 0){
			$("#addrChoiceImg3").show();
			$("#addrSearchImg").css("border", 0);
			$("#addrSearchImg").css("margin", 3);
			$("#okImg").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">서울특별시 강남구를 선택해 주세요.</strong>"
					+"</p></div>");
			posiInfo(10);
			addrChk = 1;
		}/*else if(addrChk == 1){
			$("#addrChoiceImg4").show();
			$("#addrSearchImg").css("border", 0);
			$("#addrSearchImg").css("margin", 3);
			$("#okImg").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">대전광역시 서구를 선택해 주세요.</strong>"
					+"</p></div>");
			posiInfo(28);
		}*/
	});
	$("#okImg").click(function(){
		tutorial_log();
		if(okChk == 0){
			$("#okImg").hide();
			$("#bizMapImg3").hide();
			$("#addrSearchImg").hide();
			$("#addrChoiceImg3").hide();
			$("#bizMapImg4").show();
			$("#sggMapInfoImg").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>지도에서 원하는 시군구 지역을 선택하면 해당 지역의 상세정보를 조회할 수 있습니다.<br>" 
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">강남구를 클릭해 주세요.</strong>"
					+"</p></div>");
			posiInfo(11);
			okChk = 1;
		}/*else if(okChk == 1){
			$("#addrSearchImg").hide();
			$("#addrChoiceImg4").hide();
			$("#bizMapImg11").hide();
			$("#okImg").hide();
			$("#dragBizImg").show();
			$("#dropZone").show();
			$("#bizMapImg11_1").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">통계버튼을 대전 서구로 끌어다 놓아주세요.</strong>"
					+ "</p></div>");
			posiInfo(29);
		}*/
	});
	$("#sggMapInfoImg").mouseover(function(){
		$("#sggMapInfoTooltip").show();
	});
	$("#sggMapInfoImg").mouseout(function(){
		$("#sggMapInfoTooltip").hide();
	});
	$("#sggMapInfoImg").click(function(){
		tutorial_log();
		$("#sggMapInfoImg").hide();
		$("#okImg").hide();
		$("#sggBizDataBoardImg1").show();
		$("#pageClipImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>각 항목의 우측 버튼을 누르면 항목별 상세그래프를 확인할 수 있습니다.<br>"
				+ "사업체수 뿐만 아니라 업종비율, 거주인구, 종사자수 등 다양한 지표로 비교해 볼 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">데이터보드 하단의 정보를 살펴보기 위해 상단 영역을 닫아주세요.</strong>"
				+"</p></div>");
		posiInfo(12);
	});
	$("#chickenImg").click(function(){
		tutorial_log();
		$("#mainMenuImg").show();
		$("#chickenImg").hide();
		$("#bizMapImg4").hide();
		$("#sggBizDataBoardImg1").hide();
		$("#sggMapInfoImg").hide();
		$("#bizMapImg5").show();
		$("#sggMapInfoImg2").show();
		$("#sggBizDataBoardImg2").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">통계메뉴를 클릭하세요.</strong>"
				+"</p></div>");
		posiInfo(13);
	});
	$("#sggMapInfoImg2").mouseover(function(){
		$("#sggMapInfoTooltip2").show();
	});
	$("#sggMapInfoImg2").mouseout(function(){
		$("#sggMapInfoTooltip2").hide();
	});
	$("#areaBizMainImg").click(function(){
		tutorial_log();
		$bizStatsLeftMenu.ui.setDetailStatsPanel('jobChange');
		$(".stepBox>a:eq(0)").removeClass("on");
		$(".stepBox>div:eq(0)").css("display","none");	
		$("#areaBizMainImg").hide();
		$("#serviceImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		// mng_s 20200619 (문구 수정함)
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지와 도움말이 상이함 (pse)
				//+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">생활서비스를 클릭해 주세요.</strong>"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">여가생활를 클릭해 주세요.</strong>"
				// 2020년 SGIS고도화 3차(테마코드) 끝 - 이미지와 도움말이 상이함 (pse)
				+"</p></div>");
		// mng_e 20200619 김건민
		posiInfo(15);
	});
/*	$("#restaurantOnImg").click(function(){
		tutorial_log();
		$("#restaurantOnImg").hide();		
		$("#serviceImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">서비스를 클릭해 주세요.</strong>"
				+"</p></div>");
		posiInfo(16);
	});*/
	$("#serviceImg").click(function(){
		tutorial_log();
		$("#serviceImg").hide();
		// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존코드 주석처리 및 대체 코드 추가 (pse)
		/*
		$(".stepBox>a:eq(2)").addClass("on");		
		$(".stepBox>div:eq(2)").css("display","block");	
		*/
		$(".stepBox>a[data-big-theme-cd='F']").addClass("on");	
		$(".stepBox>div[data-big-theme-cd='F']").css("display","block");
		// 2020년 SGIS고도화 3차(테마코드) 끝 - 기존코드 주석처리 및 대체 코드 추가 (pse)
		$("#pcImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">pc방을 선택해 주세요.</strong>"
				+"</p></div>");
		posiInfo(16);
	});
	$("#pcImg").click(function(){
		tutorial_log();
		$("#pcImg").hide();
		$("#bizMapImg6").show();
		$("#areaHeatLegend").show();
		$("#areaBizDataBoardImg1").show();
		$("#areaHeatSido").show();
		$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>선택한 PC방 업종에 대한 사업체현황이 전국의 열지도로 보여집니다.<br> "
				+ "대도시를 중심으로 골고루 분포되어 있는 것을 볼 수 있고, <br>"
			    + "데이터보드에는 PC방 사업체현황이 시계열별 그래프로 표출되고 있습니다.<br>"
			    + "지도화면에서 지역을 선택하면 해당 지역의 상세정보를 조회할 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">서울을 클릭해 보겠습니다.</strong>"
				+"</p></div>");
		posiInfo(17);
	});
	$("#areaHeatSido").click(function(){
		tutorial_log();
		$("#bizMapImg6").hide();
		$("#areaBizDataBoardImg1").hide();
		$("#areaHeatSido").hide();
		$("#areaBizDataBoardImg2").show();
		$("#bizMapImg7").show();
		$("#areaHeatSgg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>서울내에서의 분포가 더 세밀한 열지도로 그려집니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">강남구를 클릭하여 한 번 더 지도를 확대해 보세요.</strong>"
				+"</p></div>");
		posiInfo(18);
	});
	$("#areaHeatSgg").click(function(){
		tutorial_log();
		$("#areaBizDataBoardImg2").hide();
		$("#bizMapImg7").hide();
		$("#areaHeatSgg").hide();
		$("#bizMapImg8").show();
		$("#heatRadiusImg").show();
		$("#areaBizDataBoardImg3").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>열지도의 시각화 정도를 좌측 하단 범례에서 조절할 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">반지름을 40으로 키워볼까요?.</strong>"
				+"</p></div>");
		posiInfo(19);
	});
	$("#heatRadiusImg").click(function(){
		tutorial_log();
		$("#areaBizDataBoardImg3").hide();
		$("#bizMapImg8").hide();
		$("#heatRadiusImg").hide();
		$("#areaHeatLegend").hide();
		$("#bizMapImg9").show();
		$("#areaHeatLegend2").show();
		$("#area2006Img").show();
		
		//mng_s 20200424 이진호, 튜토리얼 현행화
		//$("#dataBoardImgDiv").show();
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#dataBoardImgDiv").show();
			//  2020년 SGIS고도화 3차(테마코드) 시작 - 기존 코드 주석처리
			/*
			$("#dataBoardImgDiv").css({"background-image":"url(/img/tutorial/areaBizDataBoardImg4.png)","background-position":"top"});
			$("#area2006Img").css("top","627px");
			*/
			//  2020년 SGIS고도화 3차(테마코드) 끝 - 기존 코드 주석처리
			//  2020년 SGIS고도화 3차(테마코드) 시작 - 대체 코드 추가
			$("#dataBoardImgDiv").css({"background-image":"url(/img/tutorial/areaBizDataBoardImg3_2020.png)","background-position":"top"}); // areaBizDataBoardImg4_2020.png ==> areaBizDataBoardImg3_2020.png 으로 수정 (2020-11-27) pse
			$("#area2006Img").css("top","734px").css("left","85px");
			//  2020년 SGIS고도화 3차(테마코드) 끝 - 대체 코드 추가
		}else{
			$("#dataBoardImgDiv").show();
			$("#dataBoardImgDiv").css({
				//"background-image":"url(/img/tutorial/areaBizDataBoardImg4.png)","background-position":"bottom", //  2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리, 이미지 변경을 위함
				"background-image":"url(/img/tutorial/areaBizDataBoardImg4_2020.png)","background-position":"bottom",	// 2020년 SGIS고도화 3차(테마코드) - 이미지 변경을 위함
				height : '600px',
				top : '170px'
			});
			$("#area2006Img").css("bottom","234px");
		}
		//mng_e 20200424 이진호
		
		if($(window).height()>=1080||$(window).width()>=1920){
			tPoint1_1();
		}else{
			tPoint1();
		}
		function tPoint1() {
			$("#toPoint_db3").animate({
				right : 450,
				bottom : 320
			}, 500, "", function() {
				$(this).animate({
					right : 450,
					bottom : 340
				}, 500, "", function() {
					tPoint1();
				});
			});
		}
		function tPoint1_1() {
			$("#toPoint_db3").animate({
				//right : 450,			// 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석
				//top : 540				// 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석
				right : 370,			// 2020년 SGIS고도화 3차(테마코드) - 기존 이미지를 새 이미지로 대체함에 따른 위치 변동
				top : 670				//  2020년 SGIS고도화 3차(테마코드) - 기존 이미지를 새 이미지로 대체함에 따른 위치 변동
			}, 500, "", function() {
				$(this).animate({
					//right : 450,		// 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석
					//top : 550			// 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석
					right : 370,		//  2020년 SGIS고도화 3차(테마코드) - 기존 이미지를 새 이미지로 대체함에 따른 위치 변동
					top : 680			//  2020년 SGIS고도화 3차(테마코드) - 기존 이미지를 새 이미지로 대체함에 따른 위치 변동
				}, 500, "", function() {
					tPoint1_1();
				});
			});
		}
		$("#toPoint_db3").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>우측 데이터보드에는 시간에 따른 PC방의 증감을 볼 수 있는데,<br>"
				+ " 조회년도에서 연도를 선택하면 과거 데이터를 볼 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">2017년을 선택해 보세요.</strong>"		// 2020년 SGIS고도화 3차(테마코드) - 2006 년 ==> 2017 년 (pse)
				+"</p></div>");
		posiInfo(-1);
	});
	$("#area2006Img").click(function(){
		tutorial_log();
		$("#dataBoardImgDiv").hide();
		$("#areaBizDataBoardImg5").show();
		$("#toPoint_db3").hide();
		$("#bizMapImg9").hide();
		$("#area2006Img").hide();
		$("#bizMapImg10").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>현재에 비해 PC방이 많죠?<br>"
				+ "이 상태에서 마우스를 이용해서 지도를 더 확대하면 개별 PC방의 위치를 확인할 수 있습니다.<br>"
				+ "<strong style=\"color:#ff0000;  font-weight:bold;\">마우스 휠을 위로 돌려 지도를 확대해 주세요.</strong>"
				+"</p></div>");
		posiInfo(-1);
	});
	
	$("body").on("mousewheel DOMMouseScroll",function(e){
		if($("#bizMapImg10").is(":visible")){	
			var E = e.originalEvent;
			if(E.deltaY < 0){
				tutorial_log();
				$("#bizMapImg10").hide();
				$("#bizMapImg14, #pcInfoImg1").show();					
				$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
				$("#tutorialText").append("<div class=\"title\">"
						+ "<p></p>"
						+ "</div>"
						+ "<div class=\"content\">"
						+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">점을 클릭하면 사업체 이름을 볼 수 있습니다.</strong></p></div>");
				posiInfo(20);
			}
		}
	});
	
	$("#pcInfoImg1").click(function(){
		tutorial_log();
		$("#pcInfoImg1").hide();
		// 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지 수정(pse)
		//$("#pcInfoImg2").show();
		$("#pcInfoImg2_2020").show();
		// 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지 수정 (pse)
		$("#mainMenuImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>이제 생활업종 창업을 고려하는 경우 후보지 선정에 참고할 수 있는 기능을 보겠습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">통계메뉴를 클릭해 주세요.</strong></p></div>");
		posiInfo(21);
	});
	$("#lqBizImg").click(function(){
		tutorial_log();
		$("#lqBizImg").hide();
		$("#lqImgFood").show();
		/*$("#searchBizMainImg").hide();
		$("#companyCntImg").show();
		*/
		$bizStatsLeftMenu.ui.setDetailStatsPanel('lqMap');
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>"
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지와 내용이 상이해서 수정 (pse)
				//+"<strong style=\"color:#ee7c1a;  font-weight:bold;\">음식점 업종 ‘카페'를 클릭해 보겠습니다.</strong>"
				+"<strong style=\"color:#ee7c1a;  font-weight:bold;\">음식 업종을 클릭해 보겠습니다.</strong>"
				// 2020년 SGIS고도화 3차(테마코드) 끝 - 이미지와 내용이 상이해서 수정 (pse)
				+ "</p></div>");
		posiInfo(23);
	});
	$("#lqImgFood").click(function(){
		tutorial_log();
		$("#lqImgFood").hide();
		// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 코드 주석처리 및 대체 코드 작성(pse)
		/*
		$(".stepBox>a:eq(2)").removeClass("on");
		$(".stepBox>div:eq(2)").css("display","none");	
		$(".stepBox>a:eq(0)").addClass("on");		
		$(".stepBox>div:eq(0)").css("display","block");		
		*/
		$(".stepBox>a[data-big-theme-cd='F']").removeClass("on");
		$(".stepBox>div[data-big-theme-cd='F']").css("display","none");	
		$(".stepBox>a[data-big-theme-cd='H']").addClass("on");
		$(".stepBox>div[data-big-theme-cd='H']").css("display","block");
		// 2020년 SGIS고도화 3차(테마코드) 끝 - 기존 코드 주석처리 및 대체 코드 작성(pse)
		$("#lqImg0").show();
		/*$("#searchBizMainImg").hide();
		$("#companyCntImg").show();
		*/
		$bizStatsLeftMenu.ui.setDetailStatsPanel('lqMap');
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>"
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 이미지와 내용이 상이해서 수정 (pse)
				//+"<strong style=\"color:#ee7c1a;  font-weight:bold;\">음식점 업종을 클릭해 보겠습니다.</strong>"
				+"<strong style=\"color:#ee7c1a;  font-weight:bold;\">음식 업종 중에서 '카페'를 클릭해 보겠습니다.</strong>"
				// 2020년 SGIS고도화 3차(테마코드) 끝 - 이미지와 내용이 상이해서 수정 (pse)
				+ "</p></div>");
		posiInfo(24);
	});
	$("#lqImg0").click(function(){
		tutorial_log();
		$("#lqImg0").hide();
		$("#lqImg1").show();
		
		//mng_s 20200424 이진호 , 튜토리얼 현행화
		//$("#lqImg2").show();
		$("#lqImg2").hide();
		//mng_e 20200424 이진호
		
		$("#lqImg3").show();
		/*$("#searchBizMainImg").hide();
		$("#companyCntImg").show();
		*/
		$bizStatsLeftMenu.ui.setDetailStatsPanel('lqMap');
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>앞에서 선택한 첨단기술업종에 대한 입지계수 정보가 색상지도로 표출되고 있습니다."
				+ "기본적으로 전국 시도기준의 입지계수 정보가 표출되고, 시군구 레벨까지 조회할 수 있습니다. 데이터보드에는 각 지역별 입지계수 정보가 사업체/종사자로 구분되어 차트로 표출되고 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">좀 더 자세히 보기 위해 서울특별시를 클릭해 주세요.</strong>"
				+ "</p></div>");
		posiInfo(25);
	});
	$("#lqImg3").click(function(){
		tutorial_log();
		$("#lqImg1").hide();
		$("#lqImg2").hide();
		$("#lqImg3").hide();
		$("#lqImg4").show();
		$("#lqImg5").show();
		/*$("#searchBizMainImg").hide();
		$("#companyCntImg").show();
		*/
		$bizStatsLeftMenu.ui.setDetailStatsPanel('lqMap');
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>선택한 서울지역에 대한 상세 현황정보가 팝업형태로 보여집니다.<br>"
				+"<strong style=\"color:#ee7c1a;  font-weight:bold;\">좀 더 자세히 알아보기 위해서 해당지역 상세정보 보기 버튼을 클릭해 보겠습니다.</strong>"
				+ "</p></div>");
		posiInfo(26);
	});
	$("#lqImg5").click(function(){
		tutorial_log();
		$("#lqImg4").hide();
		$("#lqImg5").hide();
		$("#lqImg6").show();
		$("#lqImg7").show();
		$("#mainMenuImg").show();
		/*$("#searchBizMainImg").hide();
		$("#companyCntImg").show();
		*/
		$bizStatsLeftMenu.ui.setDetailStatsPanel('lqMap');
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>지도화면이 선택한 서울지역 기준의 입지계수 지도로 변경되었습니다.<br>"
				+ "데이터보드에서는 서울지역의 연도별 입지계수 변화 그래프가 추가되었고, 하단에는 서울지역 내 시군구 단위의 입지계수 차트가 보여집니다.<br>"
				+"<strong style=\"color:#ee7c1a;  font-weight:bold;\">통계메뉴를 클릭해 주세요.</strong>"
				+ "</p></div>");
		posiInfo(27);
	});
	$("#searchBizMainImg").click(function(){
		tutorial_log();
		$("#searchBizMainImg").hide();
		$("#companyCntImg").show();
		$bizStatsLeftMenu.ui.setDetailStatsPanel('areaSearch');
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">생활업종 후보지 검색</strong>은 창업시 고려할 요소를 지정해 선택하면, 해당 지역에서 가장 지표에 부합하는 지역을 3개까지 추천해 주는 기능입니다.<br>"
				+ "한식의 경우를 예로 들어보겠습니다. 전략에 따라 한식업종이 몰려있는 지역 또는 없는 지역을 선택할 수 있겠지요."
				+ "이 튜토리얼에서는 한식업종이 없는 지역으로 고르겠습니다.<br>"
				+"<strong style=\"color:#ee7c1a;  font-weight:bold;\">‘사업체수’를 클릭해 보겠습니다.</strong>"
				+ "</p></div>");
		posiInfo(29);
	});
	$("#companyCntImg").click(function(){
		tutorial_log();
		$("#companyCntImg").hide();
		$("#companyCountAtag").addClass("on");
		$bizStatsLeftMenu.ui.areaSearchCondition('companyCount');
		
		//mng_s 20200424 이진호 , 튜토리얼 현행화
		//$("#ccOption").show();
		//mng_e 20200424 이진호
		// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존소스 주석처리 및 새로운 소스로 전환, IE에서  시군구에 서구가 선택이 안되는 문제...(pse) 
		/*setTimeout(function() {
			$("#current-sido-select").val("25").prop("selected", true);
			$bizStatsLeftMenu.request.getDoSggList("25", function() {
			});
			setTimeout(function() {
				$("#current-sgg-select").val("030").prop("selected", true);
			},50);
			},100);*/
		$("#current-sido-select").val("25").prop("selected", true);
		$bizStatsLeftMenu.request.getDoSggList("25", function() {
			$("#current-sgg-select").val("030").prop("selected", true);
		});
		// 2020년 SGIS고도화 3차(테마코드) 끝 - 기존소스 주석처리 및 새로운 소스로 전환, IE에서  시군구에 서구가 선택이 안되는 문제...(pse) 
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		//mng_s 20200424 이진호 , 튜토리얼 현행화
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#ccOption").show();
		}else{
			$('#condi_select').show();
			$("#ccOption").show();
			$("#ccOption").css({
				top : '580px',
				left : '365px'
			});
		};
		//mng_e 20200424 이진호
		
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">대상지역을 대전광역시 서구로 선택하고 업종에서 ‘한식’을 선택하고 사업체수가 적은지역으로 선택하겠습니다.</strong>"
				+ "</p></div>");
		posiInfo(30);
	});
	$("#ccOption").click(function(){
		tutorial_log();
		$("#ccOption").hide();
		$("#companyCount>a").css("left",0);
		$("#employeeImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>수요자가 많은 지역을 선정하는 것도 중요하지요.<br>"
				+ "직장인에게 점심을 주로 파는 식당의 경우 직장인구가 많은 지역이 유리할 것입니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">직장인구를 클릭해 주세요.</strong>"
				+ "</p></div>");
		posiInfo(31);
	});
	$("#employeeImg").click(function(){
		tutorial_log();
		$("#employeeImg").hide();
		$("#jobPeopleAtag").addClass("on");
		$bizStatsLeftMenu.ui.areaSearchCondition('jobPeople');
		
		//mng_s 20200424 이진호
		//$("#searchBtnImg").show();
		//mng_e 20200424 이진호
		
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">이제 조건버튼 생성을 눌러주세요.</strong>"
				+ "</p></div>");
		posiInfo(32);
		
		//mng_s 20200424 이진호, 튜토리얼 현행화
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#searchBtnImg").show();
		}else{
			$("#searchBtnImg").show();
			$("#searchBtnImg").css({
				bottom : '2px'
			});
			$('#condi_select_2').show();
		}
		//mng_e 20200424 이진호
		
	});
	$("#searchBtnImg").click(function(){
		tutorial_log();
		
		//mng_s 20200424 이진호, 튜토리얼 현행화
		$('#condi_select_2').hide();
		$('#condi_select').hide();
		$('#bizMapImg12').hide();
		//mng_e 20200424 이진호
		
		$("#searchBtnImg").hide();
		$bizStatsLeftMenu.event.stepCloseAnimate2("", "");
		$(".nav-sidebar").animate({"left":"-200px"},200);
		$("#bizMapImg12").show();
		$("#searchBizDataBoardImg1").show();
		$("#redLegendInfo1").show();
		$("#compareImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>대전 서구에서 조건에 가장 맞는 지역이 3개까지 추천되었습니다.<br>" 
				+ "데이터보드에서 ‘비교하기’ 버튼을 눌러 세 지역의 특성을 비교해 보겠습니다<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">비교하기 버튼을 클릭해 주세요.</strong>"
				+ "</p></div>");
		posiInfo(33);
	});
	/*$("#searchBtnImg").click(function(){
		tutorial_log();
		$("#searchBtnImg").hide();
		$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
		$("#redLegendInfo1").show();
		$("#bizMapImg11").show();
		$("#addrSearchImg").show();
		$("#addrSearchImg").css({"top":"102px","left":"144px","cursor":"pointer"});
		$("#addrSearchImg").css("border-style", "outset");
		$("#addrSearchImg").css("border-width", 3);
		$("#addrSearchImg").css("border-color", "red");
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">지역선택 콤보박스를 클릭해 주세요.</strong>"
				+ "</p></div>");
		posiInfo(27);
	});*/
	/*$("#dragBizImg").draggable({
		helper : "clone"
	});
	$("#dropZone").droppable({
		accept : "#dragBizImg",
		drop : function(e){
			tutorial_log();
			$("#bizMapImg11_1").hide();
			$("#dragBizImg").hide();
			$("#dropZone").hide();
			$("#bizMapImg12").show();
			$("#searchBizDataBoardImg1").show();
			$("#redLegendInfo1").show();
			$("#compareImg").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>대전 서구에서 조건에 가장 맞는 지역이 3개까지 추천되었습니다.<br>" 
					+ "데이터보드에서 ‘비교하기’ 버튼을 눌러 세 지역의 특성을 비교해 보겠습니다<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">비교하기 버튼을 클릭해 주세요.</strong>"
					+ "</p></div>");
			posiInfo(30);
		}
	});*/
	$("#compareImg").click(function(){
		tutorial_log();
		$("#searchBizDataBoardImg1").hide();
		$("#redLegendInfo1").hide();
		$("#bizMapImg12").hide();
		$("#compareImg").hide();
		$("#tuto_dimbox").show();
		$("#compareInfoImg").show();
		$("#xxImg").show();
		tPoint2();
		function tPoint2() {
			$("#toPoint_db2").animate({
				left : 980,
				top : 0
			}, 500, "", function() {
				$(this).animate({
					left : 1000,
					top : 0
				}, 500, "", function() {
					tPoint2();
				});
			});
		}
		$("#toPoint_db2").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>세 지역의 특성을 방사형 그래프로 간단히 비교해 볼 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">창을 닫아 주세요.</strong>"
				+ "</p></div>");
		posiInfo(-1);
	});
	$("#xxImg").click(function(){
		tutorial_log();
		$("#tuto_dimbox").hide();
		$("#compareInfoImg").hide();
		$("#xxImg").hide();
		$("#redLegendInfo1").show();
		$("#searchBizDataBoardImg1").show();
		$("#bizMapImg12").show();
		$("#galmaMapImg").show();
		$("#galmaDetailBtn").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>추천된 지역을 하나씩 클릭하여 현황을 볼 수도 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">변동의 지역상세보기를 클릭해 주세요.</strong>"
				+ "</p></div>");
		posiInfo(34);
	});
	$("#galmaDetailBtn").click(function(){
		tutorial_log();
		$("#searchBizDataBoardImg1").hide();
		$("#bizMapImg12").hide();
		$("#galmaMapImg").hide();
		$("#galmaDetailBtn").hide();
		$("#bizMapImg13").show();
		$("#searchBizDataBoardImg2").show();
		$("#pageClipImg").show();
		$("#pageClipImg").css("top","287px");
		$("#redBizLegend1").hide();
		$("#redBizLegend2").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>후보지 검색결과와 지역특성정보가 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">메뉴를 클릭하여 닫아 주세요.</strong>"
				+ "</p></div>");
		posiInfo(35);
	});
	$("#galmaMapImg").mouseover(function(){
		$("#galmaTooltip").show();
	});
	$("#galmaMapImg").mouseout(function(){
		$("#galmaTooltip").hide();
	});
	
	$("#searchJobGraphImg").click(function(){
		tutorial_log();
		$("#searchJobGraphImg").hide();
		$("#searchBizDataBoardImg4").hide();
		$("#searchBizDataBoardImg5").show();
		$("#mainMenuImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">통계메뉴를 클릭해 주세요.</strong>"
				+ "</p></div>"); 
		posiInfo(38);
	});

	$("#jobOpenImg").click(function(){
		tutorial_log();
		$("#jobOpenImg").hide();
		$bizStatsLeftMenu.ui.setDetailStatsPanel('jobOpen');
		$("#jobOpenImg2").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>지자체 인허가 데이터는 5가지 분류 총 56개 업종에 대해서 통계정보를 제공합니다.<br>" 
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">주유소 개업현황을 알아보기 위해 산업고용 항목을 클릭해주세요.</strong>"
				+ "</p></div>");
		posiInfo(40);
	});
	
	$("#jobOpenImg2").click(function(){
		tutorial_log();
		if(jobOpenChk  == 0){
			$("#jobOpenImg2").hide();
			$(".tr08 .stepBox>a").last().addClass("on");
			$(".tr08 .stepBox>div").last().css("display","block");
			$("#jobOpenImg3").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">석유판매업(주유소)을 클릭해 주세요.</strong>"
					+ "</p></div>");
			posiInfo(41);
		}else{
			$("#jobOpenImg2").hide();
			$(".tr10 .stepBox>a").last().addClass("on");
			$(".tr10 .stepBox>div").last().css("display","block");
			$("#jobOpenImg3").show();
			jobOpenChk = 2;
			$("#jobOpenImg3").css("left","357px");
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p><strong style=\"color:#ee7c1a;  font-weight:bold;\">석유판매업(주유소)을 클릭해 주세요.</strong>"
					+ "</p></div>");
			posiInfo(46);
		}
	});
	
	$("#jobOpenImg3").click(function(){
		tutorial_log();
		if(jobOpenChk == 0){
			$("#jobOpenImg3").hide();
			$("#jobOpenImg").hide();
			$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
			$("#bizMapImg15, #areaHeatLegend, #jobOpenDataBoardImg").show();
			$("#map_btn").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>지도화면에 전국의 석유판매업(주유소) 업종의 개업현황이 열지도 형태로 표출되고, <br>"
					+ "데이터보드에서는 전국 기준의 최근 분기별 개업 현황이 차트로 표출됩니다.<br>"
					+ "지도화면에서 시도를 선택하면 해당 시도 단위로 상세하게 통계를 조회할 수 있습니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">인천광역시를 클릭보세요.</strong>"
					+ "</p></div>"); 
			posiInfo(42);
		}else{
			$("#jobOpenImg3").hide();
			$("#left_btn").hide();
			$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
			$("#map_2").hide();
			$("#map_6").show();
			$("#map_3, #jobOpenDataBoardImg_2").show();
			$("#dataBoardCloseImg3").show();
			$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
			$("#tutorialText").append("<div class=\"title\">"
					+ "<p></p>"
					+ "</div>"
					+ "<div class=\"content\">"
					+ "<p>데이터보드에는 검색 조건에 해당하는 상위 3개의 읍면동 지역이 리스트로 표출되고, 각각의<br>"
					+ "지역에서 기간 중 개업한 업체 수 정보가 표출됩니다.<br>"
					+ "지도화면에서는 상위 3개 지역 중 최상위의 지역이 표출됩니다.<br>"
					+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">데이터보드를 닫아주세요.</strong>"
					+ "</p></div>"); 
			posiInfo(47);			
		}
	});
	$("#map_btn").click(function(){
		tutorial_log();
		$("#map_btn").hide();
		$("#bizMapImg15, #areaHeatLegend, #jobOpenDataBoardImg").hide();
		$("#areaHeatLegend").show();
		$("#map").show();
		$("#jobOpenDataBoardImg_1").show();
		mainMenuChk = 6;
		$("#mainMenuImg").show();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>지도화면과 데이터보드에서 표출되는 통계 기준이 인천광역시로 변경된 것을 볼 수 있습니다.<br>"
				+ "계속해서 지도화면에서 시군구, 읍면동 단위까지 단계적으로 선택하면 보다 상세하게 통계를<br>"
				+ "조회할 수 있습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">메인메뉴를 클릭보세요.</strong>"
				+ "</p></div>"); 
		posiInfo(43);
	});
	$("#left_btn").click(function(){
		tutorial_log();
		$("#left_btn").hide();
		$bizStatsLeftMenu.ui.setDetailStatsPanel('jobBest');
		jobOpenChk = 1;
		$("#jobOpenImg2").show();
		$("#jobOpenImg2").css("left","364px");
		
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>업종별 뜨는 지역은 지자체 인허가 업종에 대해서 관심지역, 기간 기준으로 가장 뜨는 지역을<br>"
				+ "찾아주는 기능입니다.<br>"
				+ "지역, 기간은 기본값으로 하고 업종을 선택해보겠습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">산업고용 분류를 클릭해주세요.</strong>"
				+ "</p></div>"); 
		posiInfo(45);
	});
	//190423  후보지정보 보기 추가
	$("#areaInfo_btn").click(function(){
		tutorial_log();
		$("#areaInfo_btn").hide();
		$bizStatsLeftMenu.ui.setDetailStatsPanel('areaInfo');
		
		//mng_s 20200427 이진호, 튜토리얼 현행화
		//$("#area_btn_1").show();
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#area_btn_1").show();
		}else{
			$("#area_btn_1").css({
				display : '',
				top : '258px',
				left : '-4px'
			});
		}
		//mng_e 20200427 이진호
		
		
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>대상지역을 선택해 보겠습니다. 대전 서구를 기준으로 설정해 보겠습니다.<br>"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">시도 버튼을 클릭해주세요</strong>"
				+ "</p></div>"); 
		//posiInfo(45);
	});
	$("#area_btn_1").click(function(){
		$("#area_btn_1").hide();
		
		//mng_s 20200427 이진호, 튜토리얼 현행화
		//해상도 분기
		//$("#area_btn_2").show();
		//$("#area_btn_3").show();
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#area_btn_2").show();
			$("#area_btn_3").show();
		}else{
			$("#area_btn_2").css({
				display : '',
				top : '258px',
				right : '1250px'
			});
			$("#area_btn_3").css({
				display : '',
				top : '365px',
				right : '1247px'
			});
		}
		//mng_e 20200427 이진호
		
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'대전광역시'를 클릭해주세요.</strong>"
				+ "</p></div>"); 
		//posiInfo(45);
	});
	$("#area_btn_3").click(function(){
		$("#area_btn_2").hide();
		$("#area_btn_3").hide();
		$("#current-sido-select").val("25").prop("selected", true);
		$bizStatsLeftMenu.request.getDoSggList(25, "");
		
		//mng_s 20200427 이진호, 튜토리얼 현행화
		//해상도에 따른 분기처리
		//$("#area_btn_4").show();
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#area_btn_4").show();
		}else{
			$("#area_btn_4").css({
				display : '',
				top : '292px',
				right : '1250px'
			});
		}
		//mng_e 20200427 이진호
		
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">시군구버튼을 클릭해주세요.</strong>"
				+ "</p></div>"); 
		//posiInfo(45);
	});
	$("#area_btn_4").click(function(){
		$("#area_btn_4").hide();
		
		//mng_s 20200427 이진호, 튜토리얼 현행화
		//해상도에 따른 분기처리
		//$("#area_btn_5").show();
		//$("#area_btn_6").show();
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#area_btn_5").show();
			$("#area_btn_6").show();
		}else{
			$("#area_btn_5").css({
				display : '',
				top : '295px',
				right  : '1250px'
			});
			
			$("#area_btn_6").css({
				display : '',
				top : '350px',
				right : '1249px'
			});
		}
		//mng_e 20200427 이진호
		
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'서구'를 클릭해주세요.</strong>"
				+ "</p></div>"); 
		//posiInfo(45);
	});
	$("#area_btn_6").click(function(){
		$("#area_btn_5").hide();
		$("#area_btn_6").hide();
		$("#current-sido-select").val("25").prop("selected", true);
		$("#current-sgg-select").val("030").prop("selected", true);
		
		//mng_s 20200427 이진호, 튜토리얼 현행화
		//해상도에 따른 분기처리
		//$("#addsearch_btn").show();
		if($(window).height()>=1080||$(window).width()>=1920){
			$("#addsearch_btn").css({
				display : '',
				//top : '886px',	// 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리
				//top: '885px',		// 2020년 SGIS고도화 3차(테마코드) - 이미지 위치 수정
				left : '182px',
				bottom : '19px'
			});
		}else{
			$("#addsearch_btn").css({
				display : '',
				//top : '640px',
				left : '180px',
				bottom : '19px'
			});
		}
		//mng_e 20200427 이진호
		
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'조건검색'을 클릭해주세요.</strong>"
				+ "</p></div>"); 
		//posiInfo(45);
	});
	$("#addsearch_btn").click(function(){
		$("#addsearch_btn").hide();
		$("#mainMenuImg").show();
		$bizStatsLeftMenu.ui.addSearchBtn();
		
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p>데이터보드에 해당지역에 대한 '지역 특성정보'와 '지역 종합현황정보'를 볼 수 있습니다.<br>"
				+ "<p>'지역특성정보 보기'는 지역특성정보를 각 지표에 대해서 방사형그래프 형태로 보여주고 있습니다.<br>"
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 문구 변경 (pse)
				//+ "<p>소상공인 업종별 사업체 비율'에 대해서 막대그래프 또는 표 그래프로 볼 수 있습니다.<br>"
				//+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'통계메뉴'를 클릭해주세요.</strong>"
				+ "<p>그외에도 해당지역에 대한 '소상공인 업종별 사업체 비율'을 막대그래프 또는 표 그래프로 볼 수 <br>있습니다. "
				+ "<strong style=\"color:#ee7c1a;  font-weight:bold;\">'통계메뉴'를 클릭해주세요.</strong>"
				// 2020년 SGIS고도화 3차(테마코드) 끝 - 문구 변경 (pse)
				+ "</p></div>"); 
		//posiInfo(45);
	});
	//190423 방민정 후보지정보 추가 끝
	$("#dataBoardCloseImg3").click(function(){
		tutorial_log();
		$("#dataBoardCloseImg3").hide();
		$("#jobOpenDataBoardImg_2").hide();
		$("#tutorialText .title, #tutorialText .content, #tutorialText #next").empty();
		$("#tutorialText").append("<div class=\"title\">"
				+ "<p><span style=\"margin-left:5px;\">생활업종 통계지도 튜토리얼을 마치신 것을 축하합니다.!</span></p>"
				+ "</div>"
				+ "<div class=\"content\">"
				+ "<p><strong style=\"color:#ff0000;  font-weight:bold;\">(10초 후에 '생활업종 통계지도'로 이동합니다.)</strong></p></div>");
		posiInfo(-1);
		setTimeout(function(){
			location.href = "/view/bizStats/bizStatsMap";
		}, 10000)
	});
	posiInfo(0);
}

function closeTutorial() {

	var closeMsg = confirm("튜토리얼을 종료하시겠습니까?");
	if (closeMsg) {
	//	setCookie("confirmMsg", "done", 365);
		window.close();
	} else {
		return false;
	}
}

/*function getCookie(name) {
	var nameOfCookie = name + "=";
	var x = 0;
	while (x <= document.cookie.length) {
		var y = (x + nameOfCookie.length);
		if (document.cookie.substring(x, y) == nameOfCookie) {
			if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
				endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(" ", x) + 1;
		if (x == 0)
			break;
	}
	return "";
}

function setCookie(name, value, expiredays) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = name + "=" + escape(value) + "; path=/; expires="
			+ todayDate.toUTCString() + ";"
}*/

function tutorial_log(){
	apiLogWrite2('B0', 'B37', '우리동네 생활업종 튜토리얼', '없음', '00', '없음');
}

function fullMode(element)
{
    if("fullscreenEnabled" in document || "webkitFullscreenEnabled" in document || "mozFullScreenEnabled" in document || "msFullscreenEnabled" in document) 
    {
        if(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
        {
            if("requestFullscreen" in element) 
            {
                element.requestFullscreen();
            } 
            else if ("webkitRequestFullscreen" in element) 
            {
                element.webkitRequestFullscreen();
            } 
            else if ("mozRequestFullScreen" in element) 
            {
                element.mozRequestFullScreen();
            } 
            else if ("msRequestFullscreen" in element) 
            {
                element.msRequestFullscreen();
            }
        }
    }
    else
    {
        console.log("User doesn't allow full screen");
    }
}