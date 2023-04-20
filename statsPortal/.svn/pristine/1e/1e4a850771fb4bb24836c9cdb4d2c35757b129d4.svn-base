// 튜토리얼
function readyTutorial() {

	// srvLogWrite("C0", "07", "04", "00", "", ""); //튜토리얼 start

	// setCookie("confirmMsg", "done", 365);
	var iWidth = $(window).width();
	var iHeight = $(window).height();
	if (iWidth > 1920 || iHeight > 1080) {
		var warnMsg = confirm("튜토리얼 권장 해상도는 1920x1080이며, 최소 해상도는 1280x1024입니다.\n\n"
				+ "해상도가 낮은 화면의 경우 튜토리얼이 제대로 보이지 않을 수 있습니다.\n\n" + "그래도 실행 하시겠습니까?\n\n"
				+"  [확인] : 그대로 진행\n\n" +"  [취소] : 튜토리얼 종료 및 생활권역 통계지도 홈페이지 첫 화면 이동");
		if (warnMsg == 1) {
			$(".tutorialWrapper").show();
			$('.tutorial_wrap').hide();
			startTutorial();
		} else {
			alert("통계지도 화면으로 돌아가겠습니다.");
			window.close();
			$('.tutorial_wrap').hide();
		}
	} else {
		$('.tutorial_wrap').hide();
		startTutorial();
	}
}

function startTutorial() {

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
	$(window).on(
			'resizeEnd',
			function() {
				$("#dataBoardImgDiv").css("top", 138);
				var iWidth_ = $(window).width();
				var iHeight_ = $(window).height();
				if (iWidth_ > 1920 || iHeight_ > 1080 || iWidth_ < 800
						|| iHeight_ < 600) {
					var warnMsg = confirm("튜토리얼 권장 해상도는 1920x1080이며, 최소 해상도는 1280x1024입니다.\n\n"
							+ "해상도가 낮은 화면의 경우 튜토리얼이 제대로 보이지 않을 수 있습니다.\n\n" + "그래도 실행 하시겠습니까?\n\n"
							+"  [확인] : 그대로 진행\n\n" +"  [취소] : 튜토리얼 종료 및 생활권역 통계지도 홈페이지 첫 화면 이동");
					if (warnMsg == 1) {
						return false;
					} else {
						alert("생활권역 통계지도 화면으로 돌아가겠습니다.");
						location.href = "/view/catchmentArea/main";

					}
				}
			});

	$("#tuto_start_btn").hide();
	var addrChk = 0;
	var okChk = 0;
	var zoomOutChk = 0;
	var dbChk = 0;
	var showdbChk = 0;
	var closedbChk = 0;
	var cleanChk = 0;
	var poiBtnChk = 0;
	$(".tutorialWrapper").show();
	/*
	 * if($(window).height()>=1080||$(window).width()>=1920){
	 * $("#tuto_end_btn").css("left", -4); }else{
	 * $("#tuto_end_btn").css("right", 363); }
	 */
	$("#srvIndexBtn").show();
	$("#headerTutorial").show();
	$("#tutorialText").css("height", "183px");
	$("#tutorialText")
			.append(
					"<div class=\"title\">"
							+ "<p><span style=\"margin-left:5px;\">생활권역 통계지도 첫 사용을 환영합니다!</span></p>"
							+ "</div>"
							+ "<div class=\"content\">"
							+ "<p>생활권역 통계지도 서비스는 <br><strong style=\"color:#ee7c1a;  font-weight:bold;\">지점을 선택하면 차량 주행시간, 차량 주행거리, 반경 등을 기준으로 영역을 생성하고,<br>"
							+ "그 영역의 통계정보를 제공합니다.</strong>"
							+ "<br><br><strong style=\"color:#0040ff;  font-weight:bold;\">손가락</strong>이 가리키는 곳을 따라가 보면서 설명을 시작하도록 하겠습니다."
							+ "</p></div>");

	var posi = "";
	var width = 0;
	var height = 0;

	var tutoImg = [ $("#srvIndexBtn"), $("#areabtn01_1"), $("#areabtn01_3"),
			$("#areabtn02_1"), $("#areabtn02_3"), $("#areabtn03_1"), $("#areabtn03_3")
			, $("#serchSizeBtn"), $("#krwdSearchBtn_1"), $("#krwdSearchBtn_2"), $("#krwdSearchBtn_3")
			, $("#poiSearchBtn_1"), $("#poiSearchBtn_2"), $("#poiSearchBtn_3"), $("#factypebtn_1")
			, $("#factypebtn_2"), $("#factypebtn_3"), $("#srvAreaTypebtn_1"), $("#srvAreaTypebtn_2"), $("#srvAreaTypebtn_3")
			, $("#srvAreaTypebtn_4"), $("#databoardBtn_1"), $("#databoardBtn_2_1")
			, $("#databoardBtn_3"), $("#reportbtn_1"), $("#reportbtn_2")
			, $("#reportbtn_3"), $("#reportbtn_5"), $("#gridmenubtn_1"), $("#gridmenubtn_2"), $("#gridmenubtn_3")
			, $("#gridmenubtn_3_2"), $("#gridmenubtn_4"), $("#gridmenubtn_4_2"), $("#gridmenubtn_5"), $("#gridmenubtn_6")];
	var pointImg = [ 4, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 4, 4, 3, 3, 4, 2, 4, 4,
			4, 3, 2, 1, 1, 2, 1, 3, 4, 1, 2, 1, 2, 3, 4, 4, 1];

	function posiInfo(i) {
		// $catchmentAreaMain.ui.tutoIndex = i;

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
			//posiInfo($interactiveMap.ui.tutoIndex);
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
				$("#toPoint_1").css("top", posi.top + (height * 2) + 20); 
				$("#toPoint_1").css("left", posi.left + width);
				$("#toPoint_2").css("top", posi.top + (height * 2));
				$("#toPoint_2").css("left", posi.left + width);
				$("#toPoint_3").css("top", posi.top + (height * 2));
				$("#toPoint_3").css("left", posi.left + width);
				$("#toPoint_4").css("top", posi.top + (height * 2));
				$("#toPoint_4").css("left", posi.left + width);
				break;
			case 2:
				$("#toPoint_1").css("top", posi.top - 20);
				$("#toPoint_1").css("left", posi.left - 100);
				$("#toPoint_2").css("top", posi.top - 20);
				$("#toPoint_2").css("left", posi.left - 100);
				$("#toPoint_3").css("top", posi.top - 20);
				$("#toPoint_3").css("left", posi.left - 100);
				$("#toPoint_4").css("top", posi.top - 20);
				$("#toPoint_4").css("left", posi.left - 100);
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
				$("#toPoint_1").css("top", posi.top - 20);
				$("#toPoint_1").css("left", posi.left + (width * 2));
				$("#toPoint_2").css("top", posi.top - 20);
				$("#toPoint_2").css("left", posi.left + (width * 2));
				$("#toPoint_3").css("top", posi.top - 20);
				$("#toPoint_3").css("left", posi.left + (width * 2));
				$("#toPoint_4").css("top", posi.top - 20);
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

	$("#srvIndexBtn")
			.click(
					function() {
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p>(1) 지점 선택</p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>처음 서비스를 접속하면, 접속 지역의 읍면동을 기준으로 지도가 표출됩니다.</p>"
												+ "<p>(내 위치 접근 허용을 동의하지 않을 경우, 정부대전청사를 기준으로 표출됩니다.)</p><br>"
												+ "<p>우선, 상단의 행정구역을 변경하여 지도의 중심지역을 변경해보겠습니다.</p>"
												+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">'대전광역시 서구 갈마1동'</strong>으로 이동하겠습니다.</p></div>");
						$("#srvIndexBtn").hide();
						$('#menuButton').trigger('click');// 메뉴펼치기

						$("#areabtn01_1").show();
						posiInfo(1); // 손가락모양
					});
	$("#areabtn01_1")
			.click(
					function() {
						$("#tutorialText").css("height", "70px");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>시도를 클릭하고,<strong style=\"color:#0040ff;  font-weight:bold;\"> 대전광역시</strong>를 선택합니다. "
												+ "</p></div>");
						$("#areabtn01_1").hide();
						$("#areabtn01_2").show();
						$("#areabtn01_3").show();
						posiInfo(2);
					});
	$("#areabtn01_3")
			.click(
					function() {
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText").append(
								"<div class=\"title\">" + "<p></p>" + "</div>"
										+ "<div class=\"content\">"
										+ "<p>시군구를 클릭합니다.</p></div>");
						$("#areabtn01_2").hide();
						$("#areabtn01_3").hide();
						$("#areabtn02_1").show();
						$("#sido").val("25").prop("selected", true);// 대전광역시 선택
						posiInfo(3);
					});
	$("#areabtn02_1")
			.click(
					function() {
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">서구</strong>를 선택합니다. "
												+ "</p></div>");
						$("#areabtn02_1").hide();
						$("#areabtn02_2").show();
						$("#areabtn02_3").show();
						posiInfo(4);
					});
	$("#areabtn02_3")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText").append(
								"<div class=\"title\">" + "<p></p>" + "</div>"
										+ "<div class=\"content\">"
										+ "<p>읍면동을 클릭합니다.</p></div>");
						$("#areabtn02_2").hide();
						$("#areabtn02_3").hide();
						$("#areabtn03_1").show();
						$("#sigungu option:eq(3)").prop("selected", true);// 서구

						//ie에서 select 안됨.
						if($("#sigungu option:selected").val() != "030/986095.7802222816/1809248.75161"){
							$("#sigungu").html("<option value='030/986095.7802222816/1809248.75161'>서구</option>");
						}
						// 선택
						posiInfo(5);
					});
	$("#areabtn03_1")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">갈마1동</strong>을 선택합니다. "
												+ "</p></div>");
						$("#areabtn03_1").hide();
						$("#areabtn03_2").show();
						$("#areabtn03_3").show();
						posiInfo(6);
					});
	$("#areabtn03_3")
			.click(
					function() {
						$("#tutorialText").css("height", "185px");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>이렇게 시도, 시군구, 읍면동을 선택하여 지도 중심지역을  설정할 수 있습니다.<br>이제, 다양한 방법으로 지점을 선택해보겠습니다.</p><br>"
												+ "<p>[지점 선택] ① 검색 <br>" 
												+ "상단에 지정된 행정구역 기준으로 '검색'을 통해 중심점을 지정해 보도록 하겠습니다.</p><br>"
												+ "<p>해당 <strong style=\"color:#0040ff;  font-weight:bold;\">라디오</strong> 아이콘을 눌러 주세요.<br>"
												+ "</p></div>");
						$("#areabtn03_2").hide();
						$("#areabtn03_3").hide();
						$("#serchSizeBtn").show();
						$("#emdong option:eq(3)").prop("selected", true);// 갈마1동
						
						//ie에서 select 안됨.
						if($("#emdong option:selected").val() != "64/988059.33975608/1816779.69776"){
							$("#emdong").html("<option value='64/988059.33975608/1816779.69776'>갈마1동</option>");
							$catchmentAreaLeftMenu.ui.mapMove(988059.33975608, 1816779.69776, 0);
						}
						// 선택
						posiInfo(7);
					});
	$("#serchSizeBtn")
			.click(
					function() {
						$("#tutorialText").css("height", "132px");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>검색어를 입력하여 해당 검색어에 대한 지점을 선택하는 기능입니다.</p><br>"
												+ "<p>‘갈마초등학교’를 입력해 보겠습니다.<br><strong style=\"color:#0040ff;  font-weight:bold;\">'돋보기'</strong>아이콘을 눌러 주세요.<br>"
												+ "</p></div>");

						$("#searchWord").val("갈마초등학교"); // 검색어 갈마초등학교로 설정
						$("#serchSizeBtn").hide();
						$("#krwdSearchBtn_1").show();

						posiInfo(8);
					});
	$("#krwdSearchBtn_1")
			.click(
					function() {
						$("#tutorialText").css("height", "70px");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">'대전갈마초등학교'</strong>를 클릭합니다."
												+ "</p></div>");

						$("#krwdSearchBtn_1").hide();
						$('#searchWordBtn').trigger('click');// 검색어로 검색하기
						$("#krwdSearchBtn_2").show();
						
						posiInfo(9);
					});
	$("#krwdSearchBtn_2")
			.click(
					function() {
						$("#tutorialText").css("height", "112px");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>지점을 선택하는 다른 방법을 보여드리겠습니다.</p><br>"
												+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">취소</strong>버튼을 선택해 주세요.</p></div>");

						$catchmentAreaLeftMenu.ui.moveTargetArea("대전갈마초등학교",
								"대전광역시 서구 월평동로 2", 988292.9442, 1817673.1346,
								null, 0, "M1");
						$catchmentAreaLeftMenu.ui.closeSchRstPopup("A");

						$("#krwdSearchBtn_2").hide();
						

						setTimeout(function() {
							$("#krwdSearchBtn_3").show();
							var obj = $("#pointSelectButten").offset();
							$("#krwdSearchBtn_3").css("top", (obj.top-2) + "px");
							$("#krwdSearchBtn_3").css("left", (obj.left+105) + "px");
							
							posiInfo(10);
						},300);
					});
	$("#krwdSearchBtn_3")
			.click(
					function() {
						$("#tutorialText").css("height", "128px");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>[지점선택] ② 지도에서 직접 선택<br>"
												+ "<p>지점 선택을 지도에서 직접 선택할 수 있습니다.<br><br>"
												+ "<strong style=\"color:#0040ff;  font-weight:bold;\">마커</strong>버튼을 클릭해 주세요."
												+ "</p></div>");

						$("#krwdSearchBtn_3").hide();
						$("#poiSearchBtn_1").show();

						$(".sa_btn_cancel").parents(".sop-infowindow").remove();
						var map = $catchmentAreaMain.ui.getMap(0);
						map.markers.clearLayers();
						
						posiInfo(11);
					});
	$("#poiSearchBtn_1")
			.click(
					function() {
						$("#tutorialText").css("height", "70px");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>"
												+ "<strong style=\"color:#0040ff;  font-weight:bold;\">'정부대전청사'</strong>를 클릭합니다."
												+ "</p></div>");

						$("#poiSearchBtn_1").hide();

						$("#searchPoi").trigger('click');
						
						var map = $catchmentAreaMain.ui.getMap(0);
						var markerIcon = sop.icon({
							iconUrl : '/img/marker/thema_marker_default.png',
							shadowUrl : '/img/marker/theme_shadow.png',
							iconAnchor : [ 12.5, 40 ],
							iconSize : [ 25, 40 ],
							infoWindowAnchor : [ 1, -34 ]
						});

						var marker = sop.marker([ 989674, 1818313 ], {
							icon : markerIcon
						});

						map.markers.addLayer(marker);
						
						
						setTimeout(function() {
							$("#poiSearchBtn_2").show();
							var obj = $(".sop-marker-icon.sop-zoom-animated.sop-interactive").offset();
							$("#poiSearchBtn_2").css("top", (obj.top) + "px");
							$("#poiSearchBtn_2").css("left", (obj.left-45) + "px");
							
							posiInfo(12);
						},300);
						
					});
	$("#poiSearchBtn_2")
			.click(
					function() {
						$("#tutorialText").css("height", "128px");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>해당 지점에 대하여 주소를 기준으로 선택하거나, 시설을 기준으로 선택할 수 있습니다.</p><br>"
												+ "<p>또 다른 지점 선택 기능을 보여드리겠습니다.<br><strong style=\"color:#0040ff;  font-weight:bold;\">취소</strong>버튼을 클릭해 주세요.</p></div>");
						$("#poiSearchBtn_2").hide();
						
						
						var map = $catchmentAreaMain.ui.getMap(0);
						map.markers.clearLayers();
						
						var markerIcon = sop.icon({
							iconUrl : '/img/marker/thema_marker_default.png',
							shadowUrl : '/img/marker/theme_shadow.png',
							iconAnchor : [ 12.5, 40 ],
							iconSize : [ 25, 40 ],
							infoWindowAnchor : [ 1, -34 ]
						});

						var marker = sop.marker([ 989674, 1818313 ], {
							icon : markerIcon
						});

						map.markers.addLayer(marker);

						$catchmentAreaLeftMenu.ui.searchReverseGeoApi(989674,
								1818313, marker);
						
						setTimeout(function() {
							$("#poiSearchBtn_3").show();
							var obj = $("#cancelPoiButten").offset();
							
							$("#poiSearchBtn_3").css("top", obj.top + "px");
							$("#poiSearchBtn_3").css("left", obj.left + "px");
							
							posiInfo(13);
						},600);
					});
	$("#poiSearchBtn_3")
			.click(
					function() {
						$("#tutorialText").css("height", "145px");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>[지점선택] ③ 시설 유형으로 지점 선택<br>"
												+ "전국사업체조사 결과의 산업분류 및 공공데이터 등을 참고하여<br>교육, 문화, 생활, 공공 등으로 시설 유형을 분류한 지점을 선택하는 기능입니다.</p>"
												+ "<p><br><strong style=\"color:#0040ff;  font-weight:bold;\">어린이집</strong>버튼을 클릭해 주세요.</p></div>");
						$("#poiSearchBtn_3").hide();
						$("#factypebtn_1").show();

						$(".sa_btn_cancel").parents(".sop-infowindow").remove();
						var map = $catchmentAreaMain.ui.getMap(0);
						map.markers.clearLayers();
						
						posiInfo(14);
					});
	$("#factypebtn_1")
			.click(
					function() {
						$("#tutorialText").css("height", "113px");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>현재 행정구역(시군구) 기준인 대전광역시 서구를 기준으로 어린이집 목록이 나타납니다.<br><br>"
												+ "<strong style=\"color:#0040ff;  font-weight:bold;\">EBS 딩동댕 어린이집</strong>을 선택해 주세요."
												+ "</p></div>");

						$("#factypebtn_1").hide();
						$("#factypebtn_2").show();

						$("#SA0001").trigger('click');
						
						posiInfo(15);
					});
	$("#factypebtn_2")
			.click(
					function() {
						$("#tutorialText").css("height", "141px");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p>(2) 영역 생성</p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>선택한 지점을 바탕으로 영역을 생성해 보겠습니다.</p>"
												+ "<br><p><strong style=\"color:#0040ff;  font-weight:bold;\">선택</strong>버튼을 클릭해 주세요.</p></div>");
						$("#factypebtn_2").hide();

						var map = $catchmentAreaMain.ui.getMap(0);
						map.markers.clearLayers(); // 마커 초기화

						$catchmentAreaLeftMenu.ui.moveTargetArea(
								'EBS 딩동댕 어린이집', '대전광역시 서구 청사서로 70',
								988956.906599998, 1818505.79040003, 87210, 0,
								"M3", 12);
						
						setTimeout(function() {
							$("#factypebtn_3").show();
							var obj = $("#pointSelectButten").offset();
							
							$("#factypebtn_3").css("top", obj.top + "px");
							$("#factypebtn_3").css("left", obj.left + "px");
							
							posiInfo(16);
						},300);
					});
	$("#factypebtn_3")
			.click(
					function() {
						$("#tutorialText").css("height", "113px");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>지점을 선택하면 기본적으로 차량 주행시간을 기준으로 영역을 생성합니다.</p>"
												+ "<p><br><strong style=\"color:#0040ff;  font-weight:bold;\">주행거리 기준 라디오</strong>버튼을 클릭해 주세요</p></div>");
						$("#factypebtn_3").hide();
						$("#srvAreaTypebtn_1").show();

						$("#pointSelectButten").trigger('click');
						
						posiInfo(17);
					});
	$("#srvAreaTypebtn_1")
			.click(
					function() {
						$("#tutorialText").css("height", "141px");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>주행거리 기준으로 생활권역 영역이 표시되는 것을 확인할 수 있습니다.</p>"
												+ "<p>기본적으로 지정된 거리 외 다른 버튼을 눌러 하나씩 선택할 수 있습니다.<br><br>"
												+ "다시 주행시간 기준으로 통계정보를 보도록 하겠습니다.<br><strong style=\"color:#0040ff;  font-weight:bold;\">주행시간 기준 라디오</strong>버튼을 클릭해 주세요.</p></div>");
												//+ "<p>각각 하나씩 선택하실수 있습니다.<br><strong style=\"color:#0040ff;  font-weight:bold;\">0.5㎢</strong>버튼을 클릭해 주세요.</p></div>");
						$("#srvAreaTypebtn_1").hide();
						//$("#srvAreaTypebtn_2").show();
						$("#srvAreaTypebtn_3").show();
						$("#stats02").trigger('click');
						
						//posiInfo(18);
						posiInfo(19);
					});
	/*
	$("#srvAreaTypebtn_2")
			.click(
					function() {
						tutorial_log();
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>반경 기준으로 생활권역 영역이 설정됩니다.<br>지도에 보시면 반경 기준으로 생활권역 영역이 표시되는 것을 확인 할 수 있습니다.</p>"
												+ "<p>주행시간 기준으로 통계정보를 보도록 하겠습니다.<br><strong style=\"color:#0040ff;  font-weight:bold;\">주행시간 기준</strong>을 클릭해주세요.</p></div>");

						$("#srvAreaTypebtn_2").hide();
						$("#srvAreaTypebtn_3").show();
						$("#R01").trigger('click');
							
						posiInfo(19);
					});
	*/
	$("#srvAreaTypebtn_3")
			.click(
					function() {
						$("#tutorialText").css("height", "70px");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">통계정보 보기</strong>를 클릭해 주세요.<br></p></div>");
						$("#srvAreaTypebtn_3").hide();
						$("#srvAreaTypebtn_4").show();
						
						var obj = $("#statisticsDataBtn").offset();
							
						$("#srvAreaTypebtn_4").css("top", obj.top + "px");
						$("#srvAreaTypebtn_4").css("left", obj.left + "px");
							
						
						$("#stats01").trigger('click');
						
						posiInfo(20);
					});
	$("#srvAreaTypebtn_4")
			.click(
					function() {
						$("#tutorialText").css("height", "160px");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p>(3) 통계자료 조회</p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>선택한 영역 중 가장 작은 영역에 해당하는 면적, 인구, 가구, 주택, 사업체, 종사자에 대한 통계정보를 우선적으로 볼 수 있습니다.</p><br>"
												+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">다음</strong> 버튼을 통해 선택한 두 번째 영역에 대한 통계정보를 볼 수 있습니다.</p></div>");
						$("#srvAreaTypebtn_4").hide();
						$("#databoardBtn_1").show();
						
						$("#statisticsDataBtn").trigger('click');
						
						posiInfo(21);
					});
	$("#databoardBtn_1")
			.click(
					function() {
						$("#tutorialText").css("height", "113px");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>인구/가구/주택 또는 사업체/종사자의 기준 연도를 변경하여 통계정보를 볼 수 있습니다.</p><br>"
												+ "<p>인구/가구/주택의 <strong style=\"color:#0040ff;  font-weight:bold;\">2019</strong>를 클릭하세요.</p></div>");
						
						$("#databoardBtn_1").hide();
						$("#databoardBtn_2_1").show();
						
						$("#nextBtn").trigger('click');
						
						posiInfo(22);
					});
	$("#databoardBtn_2_1")
	.click(
			function() {
				$(
						"#tutorialText .title, #tutorialText .content, #tutorialText #next")
						.empty();
				$("#tutorialText")
						.append(
								"<div class=\"title\">"
										+ "<p></p>"
										+ "</div>"
										+ "<div class=\"content\">"
										+ "<p>인구/가구/주택의 기준 연도를 2018년도로 변경하겠습니다.</p>"
										+ "<br><p><strong style=\"color:#0040ff;  font-weight:bold;\">2018</strong>을 클릭해 주세요.</p></div>");
				
				$("#databoardBtn_2_1").hide();
				$("#databoardBtn_2").show();
				$("#databoardBtn_3").show();
				
				posiInfo(23);
			});
	$("#databoardBtn_3")
			.click(
					function() {
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>보고서 기능을 살펴보도록 하겠습니다.</p>"
												+ "<p><br><strong style=\"color:#0040ff;  font-weight:bold;\">보고서</strong>버튼을 클릭하세요.</p></div>");
						
						$("#databoardBtn_2").hide();
						$("#databoardBtn_3").hide();
						$("#reportbtn_1").show();
						//$("#databoardBtn_3").show();
						
						$("#bYearSel01").val("2018");
						$catchmentAreaLeftMenu.ui.requestSrvAreaStatsData('1', 2);
						
						posiInfo(24);
					});
	$("#reportbtn_1")
			.click(
					function() {
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>보고서 표출 범위를 선택합니다.<p>"
												+ "<p><br><strong style=\"color:#0040ff;  font-weight:bold;\">체크박스</strong>를 클릭해 주세요.</p></div>");
						
						$("#reportbtn_1").hide();
						$("#reportbtn_2").show();
						
						$catchmentAreaMain.ui.getReport();
						setTimeout(function() {
							$("#reportbtn_2").show();
							var obj = $('[data-index="0"]').offset();
							$("#reportbtn_2").css("top", (obj.top) + "px");
							$("#reportbtn_2").css("left", (obj.left) + "px");
							posiInfo(25);
						},300);
					});
	$("#reportbtn_2")
			.click(
					function() {
							$("#tutorialText").css("height", "70px");
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p><strong style=\"color:#0040ff;  font-weight:bold;\">출력</strong> 버튼을 클릭해 주세요</p></div>");
							
							$("#reportbtn_2").hide();
							
							$('input:checkbox[name="reportRange"]').eq(0).attr("checked", true);
							
							var obj = $("#reportSelectBtn").offset();
							$("#reportbtn_3").show();
							$("#reportbtn_3").css("top", (obj.top) + "px");
							$("#reportbtn_3").css("left", (obj.left+2) + "px");
							
							posiInfo(26);
					});
	$("#reportbtn_3")
			.click(
					function() {
							$("#tutorialText").css("height", "133px");
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p>선택한 범위의 통계정보가 보고서 형식으로 표출됩니다.<br>"
													+ "인쇄 버튼을 통해 인쇄가 가능합니다.<br><br><strong style=\"color:#0040ff;  font-weight:bold;\">닫기</strong> 버튼을 클릭해 주세요.<br>"
													+ "</p></div>");
							
							$("#reportbtn_3").hide();
							$("#reportbtn_4").show();
							$("#reportbtn_5").show();
							
							$catchmentAreaMain.ui.colseReportPopup();
							
							posiInfo(27);
					});
	$("#reportbtn_5")
			.click(
					function() {
							$("#tutorialText").css("height", "113px");
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p>'격자 단위 통계정보'는 해당 영역의 격자 및 통계정보를 볼 수 있습니다.<br>"
													+ "<br><strong style=\"color:#0040ff;  font-weight:bold;\">'ON/OFF'</strong> 버튼을 클릭해 주세요.</p></div>");
							
							$("#reportbtn_4").hide();
							$("#reportbtn_5").hide();
							$("#gridmenubtn_1").show();
							
							posiInfo(28);
					});
	$("#gridmenubtn_1")
			.click(
					function() {
							$("#tutorialText").css("height", "133px");
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p>격자 분포 화면에서는 격자 크기, 통계 기준연도, 통계 항목 등 조건을 설정하여 통계정보를 볼 수 있습니다.</p><br>"
													+ "<p>1km 격자 기반의 2018년도 기준 인구에 대하여 성별은 ‘전체‘, 연령은 ‘0-4세‘로 설정해보겠습니다.<br>"
													+ "<strong style=\"color:#0040ff;  font-weight:bold;\">'1km'</strong>버튼을 클릭해 주세요.</p></div>");
							
							$("#gridmenubtn_1").hide();
							$("#gridmenubtn_2").show();
							
							$('.btn_toggle.on').hide();
				        	$('.btn_toggle.off').show();
				        	
							$(".search_result.chk.chk_01").removeClass('active');
							$(".search_result.chk.chk_02").addClass('active');
							
							$("#gridDataType02").hide();
							$("#gridDataType02").siblings('.btn_toggle.on').show();
							$("#gridDataType02").siblings('.btn_toggle.on').hasClass('active');
							
							$(".search_result.chk.chk_02").children('.chk_result').show();
							$catchmentAreaLeftMenu.event.resizePopup();
							
							posiInfo(29);
					});
	$("#gridmenubtn_2")
			.click(
					function() {
						$("#tutorialText").css("height", "113px");
						$(
								"#tutorialText .title, #tutorialText .content, #tutorialText #next")
								.empty();
						$("#tutorialText")
								.append(
										"<div class=\"title\">"
												+ "<p></p>"
												+ "</div>"
												+ "<div class=\"content\">"
												+ "<p>통계 기준 연도를 설정합니다.<br><br>"
												+ "<strong style=\"color:#0040ff;  font-weight:bold;\">'2019'</strong>를 클릭합니다.<br>"
												+ "</p></div>");
						
						$("#gridmenubtn_2").hide();
						$("#gridmenubtn_3").show();
						
						$('[data-grid-level-div="1k"').addClass('active');
						
						posiInfo(30);
				});
	$("#gridmenubtn_3")
			.click(
					function() {
						$(
						"#tutorialText .title, #tutorialText .content, #tutorialText #next")
						.empty();
				$("#tutorialText")
						.append(
								"<div class=\"title\">"
										+ "<p></p>"
										+ "</div>"
										+ "<div class=\"content\">"
										+ "<p>통계 기준 연도를 <strong style=\"color:#0040ff;  font-weight:bold;\">'2018'</strong>로 선택합니다.<br>"
										+ "</p></div>");
				
				$("#gridmenubtn_3").hide();
				$("#gridmenubtn_3_1").show();
				$("#gridmenubtn_3_2").show();
				
				posiInfo(31);
		});
	
	$("#gridmenubtn_3_2")
			.click(
					function() {
						$(
						"#tutorialText .title, #tutorialText .content, #tutorialText #next")
						.empty();
				$("#tutorialText")
						.append(
								"<div class=\"title\">"
										+ "<p></p>"
										+ "</div>"
										+ "<div class=\"content\">"
										+ "<p>인구, 가구, 주택, 사업체 및 종사자에 대한 격자 통계 조건을 설정하여 격자 분포를 볼 수 있습니다<br>"
										+ "<br><strong style=\"color:#0040ff;  font-weight:bold;\">'조회'</strong>버튼을 클릭해주세요.<br>"
										+ "</p></div>");
				
				$("#gridmenubtn_3_1").hide();
				$("#gridmenubtn_3_2").hide();
				//$("#gridmenubtn_4").show();
				$("#gridmenubtn_6").show();
				
				$("#bYearSel06").val("2018").prop("selected", true);
				
				//posiInfo(32);
				posiInfo(35);
		});
	/*
	$("#gridmenubtn_4")
			.click(
					function() {
						$(
						"#tutorialText .title, #tutorialText .content, #tutorialText #next")
						.empty();
				$("#tutorialText")
						.append(
								"<div class=\"title\">"
										+ "<p></p>"
										+ "</div>"
										+ "<div class=\"content\">"
										+ "<p>성별의 '남자'로 선택 해 보도록 하겠습니다.<br>"
										+ "<br>"
										+ "<strong style=\"color:#0040ff;  font-weight:bold;\">'남자'</strong>버튼을 클릭해주세요.<br>"
										+ "</p></div>");
				
				$("#gridmenubtn_4").hide();
				$("#gridmenubtn_4_1").show();
				$("#gridmenubtn_4_2").show();
				
				posiInfo(33);
		});
	$("#gridmenubtn_4_2")
			.click(
					function() {
						$(
						"#tutorialText .title, #tutorialText .content, #tutorialText #next")
						.empty();
				$("#tutorialText")
						.append(
								"<div class=\"title\">"
										+ "<p></p>"
										+ "</div>"
										+ "<div class=\"content\">"
										+ "<p>연령은 전체로 선택 해 보도록 하겠습니다.<br>"
										+ "<br>"
										+ "<strong style=\"color:#0040ff;  font-weight:bold;\">'체크박스'</strong>버튼을 클릭해주세요.<br>"
										+ "</p></div>");
				
				$("#gridmenubtn_4_1").hide();
				$("#gridmenubtn_4_2").hide();
				$("#gridmenubtn_5").show();
				
				$("#select_genger").val("1").prop("selected", true);
				
				posiInfo(34);
		});
		
	$("#gridmenubtn_5")
			.click(
					function() {
						$(
						"#tutorialText .title, #tutorialText .content, #tutorialText #next")
						.empty();
				$("#tutorialText")
						.append(
								"<div class=\"title\">"
										+ "<p></p>"
										+ "</div>"
										+ "<div class=\"content\">"
										+ "<p>격자 통계 조건 설정을 하여 해당 영역에 대한 격자 통계를 보실 수 있습니다.<br>"
										+ "<br>"
										+ "<strong style=\"color:#0040ff;  font-weight:bold;\">'조회'</strong>버튼을 클릭해주세요.<br>"
										+ "</p></div>");
				
				$("#gridmenubtn_5").hide();
				$("#gridmenubtn_6").show();
				
				$(".age_all_chk.off").trigger('click');
				
				posiInfo(35);
		});	
		*/
	$("#gridmenubtn_6")
			.click(
					function() {
							$("#tutorialText").css("height", "113px");
							$(
									"#tutorialText .title, #tutorialText .content, #tutorialText #next")
									.empty();
							$("#tutorialText")
									.append(
											"<div class=\"title\">"
													+ "<p><span style=\"margin-left:5px;\"><생활권역 통계지도> 튜토리얼을 마치겠습니다.</span></p>"
													+ "</div>"
													+ "<div class=\"content\">"
													+ "<p><strong style=\"color:#ff0000;  font-weight:bold;\">(10초 후에 '생활권역 통계지도' 첫 화면으로 이동합니다.)");
							
							$("#gridmenubtn_6").hide();
							$("#grid_search_btn").trigger('click');
							posiInfo(-1);
							setTimeout(
									function() {
										location.href = "/view/catchmentArea/main";
							}, 10000);
					});

	posiInfo(0);
}

function closeTutorial() {
	if(confirm("튜토리얼을 종료하시겠습니까?")){
		// mng_s 20200113 이진호 / opener의 유무에 따른 동작 설정하게 변경
		if (opener) {
			window.close();
		} else {
			location.href = "/view/catchmentArea/main";
		}
	} 
}

/*
 * function getCookie(name) { var nameOfCookie = name + "="; var x = 0; while (x <=
 * document.cookie.length) { var y = (x + nameOfCookie.length); if
 * (document.cookie.substring(x, y) == nameOfCookie) { if ((endOfCookie =
 * document.cookie.indexOf(";", y)) == -1) endOfCookie = document.cookie.length;
 * return unescape(document.cookie.substring(y, endOfCookie)); } x =
 * document.cookie.indexOf(" ", x) + 1; if (x == 0) break; } return ""; }
 * 
 * function setCookie(name, value, expiredays) { var todayDate = new Date();
 * todayDate.setDate(todayDate.getDate() + expiredays); document.cookie = name +
 * "=" + escape(value) + "; path=/; expires=" + todayDate.toUTCString() + ";" }
 */

function tutorial_log() {
	//apiLogWrite2("A0", "A28", "대화형통계지도 튜토리얼", "없음", "00", "없음");
}