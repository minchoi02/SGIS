var tempInitialSlide = 0;	// 상단 Menu swiper 위치 값

(function(W, D) {
	W.$thematic = W.$thematic || {};

	var thematicInfo;

	$(document).ready(function(){
		accessTokenInfo();
		$thematic.event.setUIEvent();

		$(".leftCol .btnNavThematic").click(function(){
			var svg = '<svg width="12" height="8" viewBox="0 0 14 8"   xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z" /></svg>';
	    	if(!$(this).hasClass('active')){
        		$(this).addClass('active');
        		$(".nav-layer").css("display","block");
        		$("#result_list").css("display","none");
        		$(".leftCol .maptit04").removeClass("active");
        		$("#common_popup_area").css("display","none");
        	}else{
        		$(this).removeClass('active');
        		$(".nav-layer").css("display","none");
        		//$("#common_popup_area").css("display","block");
        	}
        });
		$(".leftCol .maptit04").click(function(){
			if(!$(this).hasClass('active')){
        		$(this).addClass('active');
        		$("#result_list").css("display","block");
        		$(".nav-layer").css("display","none");
        		$(".leftCol .btnNavThematic").removeClass("active");
        		$("#common_popup_area").css("display","none");
        	}else{
        		$(this).removeClass('active');
        		$("#result_list").css("display","none");
        		//$("#common_popup_area").css("display","block");
        	}
        });
		$(".selectArea").click(function(){
			if(!$(".nav-layer").hasClass('active')){
				$(".nav-layer").css("display","none");
        		$(".leftCol .btnNavThematic").removeClass("active");
        		$(".leftCol .maptit04").removeClass("active");
        		$("#result_list").css("display","none");
        	}else{
        		$(this).removeClass('active');
        	}
        });
		
		/*$(".swiper-slide").click(function(){*/
		$(".nav-layer li").click(function(){
			var svg = '<svg width="12" height="8" viewBox="0 0 14 8"   xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z" /></svg>';
			if($(this).attr('id')=="CTGR_001"){
				srvLogWrite('O0', '08', '02', '00', '인구와 가구', '');
			}else if($(this).attr('id')=="CTGR_002"){
				srvLogWrite('O0', '08', '02', '00', '주거와 교통', '');
			}else if($(this).attr('id')=="CTGR_003"){
				srvLogWrite('O0', '08', '02', '00', '복지와 문화', '');
			}else if($(this).attr('id')=="CTGR_004"){
				srvLogWrite('O0', '08', '02', '00', '노동과 경제', '');
			}else if($(this).attr('id')=="CTGR_005"){
				srvLogWrite('O0', '08', '02', '00', '건강과 안전', '');
			}else if($(this).attr('id')=="CTGR_006"){
				srvLogWrite('O0', '08', '02', '00', '환경과 기후', '');
			}
			unSelectService();

			$(this).each(function (){
				var sId = "#"+ this.id;
				$("#thematicCatalogKwrd").val("");	// 2020.09.15[한광희] 결과내 검색 초기화
				$("#selectThematicCatalogSorting option:eq(0)").prop("selected", true);	// 2020.09.16[한광희] 정렬 초기화
				if(sId == "#CTGR_001"){
					$("#themaResultTit").text("인구와 가구에 관련된 통계");	// 2020.09.08[한광희] 띄어쓰기 수정
					$(".leftCol .btnNavThematic").html("인구와 가구"+svg); // 2022.09.19[송은미] 지표명 추가
					$(sId).addClass("on4");
					$thematic.ui.serviceGb = "CTGR_001";

					$thematic.ui.statsThemeMapListData('');
				}
				else if(sId == "#CTGR_002"){
					$("#themaResultTit").text("주거와 교통에 관련된 통계");	// 2020.09.08[한광희] 띄어쓰기 수정
					$(".leftCol .btnNavThematic").html("주거와 교통"+svg);
					$(sId).addClass("on4");
					$thematic.ui.serviceGb = "CTGR_002";

					$thematic.ui.statsThemeMapListData('');
				}
				else if(sId == "#CTGR_003"){
					$("#themaResultTit").text("복지와 문화에 관련된 통계");	// 2020.09.08[한광희] 띄어쓰기 수정
					$(".leftCol .btnNavThematic").html("복지와 문화"+svg);
					$(sId).addClass("on4");
					$thematic.ui.serviceGb = "CTGR_003";

					$thematic.ui.statsThemeMapListData('');
				}
				else if(sId == "#CTGR_004"){
					$("#themaResultTit").text("노동과 경제에 관련된 통계");	// 2020.09.08[한광희] 띄어쓰기 수정
					$(".leftCol .btnNavThematic").html("노동과 경제"+svg);
					$(sId).addClass("on4");
					$thematic.ui.serviceGb = "CTGR_004";

					$thematic.ui.statsThemeMapListData('');
				}
				else if(sId == "#CTGR_005"){
					$("#themaResultTit").text("건강과 안전에 관련된 통계");	// 2020.09.08[한광희] 띄어쓰기 수정
					$(".leftCol .btnNavThematic").html("건강과 안전"+svg);
					$(sId).addClass("on4");
					$thematic.ui.serviceGb = "CTGR_005";

					$thematic.ui.statsThemeMapListData('');
				}
				else if(sId == "#CTGR_006"){
					$("#themaResultTit").text("환경과 기후에 관련된 통계");
					$(".leftCol .btnNavThematic").html("환경과 기후"+svg);
					$(sId).addClass("on4");
					$thematic.ui.serviceGb = "CTGR_006";

					$thematic.ui.statsThemeMapListData('');
				}
			});

			// 2022-09-16  송은미 통계 팝업  클릭이벤트 추가
			$(".nav-layer li").on("click", function() {
				$(".nav-layer").css("display","none");
				$(".leftCol .btnNavThematic").removeClass('active');
			});

			// 2022-09-19  송은미 팝업 닫기 추가
			$("#thematic_popup_area_close").click(function() {
				//팝업 숨김
				$("#thematicListDiv").css("display","none");
				$(".maptit04").removeClass("active");
			});

			// 2022-09-19  송은미 click 이벤트 추가
			$(".maptit04").click(function(){
				$("#thematicListDiv").css({
					display:"block",
					 swipeUp:function(event, direction) {
			            	$thematic.ui.thematicListPopupToggle(true);
			            }
				})


			});
			//2022-10-05 [송은미] click 이벤트 변경
			$(".gridrow_left").click(function(){
				$(".maptit04").removeClass("active");
			});

			/** 2020.09.21[한광희] 통계주제도 메뉴 선택시 해당 메뉴 첫번째 항목 조회 START */
			// 검색된 리스트에서 첫번재 항목 검색
			if($('.gridheader_conThematic').length != 0){
				$('.gridheader_conThematic').eq(0).find(".gridrow_left").find(".List").get(0).click();
				// 해당 지표로 스크롤 이동
				$("#list_div").stop().animate({
					scrollTop: $("#list_div").find("li.on").offset().top-$("#list_div").find("ul").offset().top
				}, 801);
			};
			/** 2020.09.21[한광희] 통계주제도 메뉴 선택시 해당 메뉴 첫번째 항목 조회 END */
		});

		// 지도에서 isMapCaptionToggleControl false시 분할뷰가 안되어 히든처리
		$(".control_item").attr("style", "display:none");

		/** 메인 화면 링크를 통한 메뉴 swiper 위치 조정 START */
		// 메인 화면에서 Menu명 클릭시 상단 메뉴 swiper 위치 설정
		if(menuIndex != ""){
			tempInitialSlide = menuIndex;
		}

		/** 2020.08.31[한광희] 메인화면 검색화면에서 link 추가시 상단 메뉴 swiper 위치 설정 START */
		if(category == "CTGR_001"){
			tempInitialSlide = 0;
		} else if(category == "CTGR_002"){
			tempInitialSlide = 1;
		} else if(category == "CTGR_003"){
			tempInitialSlide = 2;
		} else if(category == "CTGR_004"){
			tempInitialSlide = 3;
		} else if(category == "CTGR_005"){
			tempInitialSlide = 4;
		} else if(category == "CTGR_006"){
			tempInitialSlide = 5;
		}
		/** 2020.08.31[한광희] 메인화면 검색화면에서 link 추가시 상단 메뉴 swiper 위치 설정 END */

		var swiper = new Swiper('.swiper-container', {
	        slidesPerView: 3.2,
	        spaceBetween: 10,
	        initialSlide : tempInitialSlide,
	        pagination: {
	          el: '.swiper-pagination',
	          clickable: true,
	        },
		});
		/** 메인 화면 링크를 통한 메뉴 swiper 위치 조정 END */

		$thematic.ui.createThematicList();	// 2020.09.10[한광희] 통계주제도 화면 로딩시 메뉴 및 통계 선택
	});

	function unSelectService(){
		$("#CTGR_001").removeClass("on4");
		$("#CTGR_002").removeClass("on4");
		$("#CTGR_003").removeClass("on4");
		$("#CTGR_004").removeClass("on4");
		$("#CTGR_005").removeClass("on4");
		$("#CTGR_006").removeClass("on4");
	}

	$thematic.ui = {
		serviceGb : "CTGR_001",	//서비스 구분
		data : null,//데이터
		parameter : null,//파라미터
		option : null,//옵션
		/** 2020.09.10[한광희] 위치 미동의시 기본위치 설정 추가 START */
		my_x : 989749.2142006928, // x
		my_y : 1817802.41717, // y
		my_sido_cd : "25", // 시도코드
		my_sido_nm : "대전광역시", // 시도명
		my_sgg_cd : "030", // 시군구코드
		my_sgg_nm : "서구", // 시군구명
		my_emdong_cd : "60", // 읍면동코드
		my_emdong_nm : "둔산2동", // 읍면동명
		/** 2020.09.10[한광희] 위치 미동의시 기본위치 설정 추가 END */
		my_adm_cd : "2503060",	// 현재위치 코드
		searchAdmCd : null, // 선택한 관심지역코드
		search_x : null,	// 선택한 지역 x 좌표
		search_y : null,	// 선택한 지역 y 좌표
		zoomLevel : null,	// 선택한 지역 줌 레벨

		/**
		 * @name           : createThematicList
		 * @description    : 통계주제도 화면 로딩시 메뉴 및 통계 선택
		 * @date           : 2020.08.11
		 * @author	       : 한광희
		 * @history        :
		 */
		createThematicList : function(){
			// 조회
			if(selItem != ""){
				// 파라메터 있음
				if(selItem.startsWith("CTGR_00")){
					$("#" + selItem).trigger("click");
				}
			}
			else{
				// 파라메터 : category=CTGR_001&id=oqrEJzwryv201601211158069778qDoxqxpMF
				if(category != "" && id != ""){
					$thematic.ui.serviceGb = category;
					$thematic.ui.statsThemeMapListData('');	// 2020.08.31[한광희] 전체 목록에서 해당 지표 선택하도록 수정

					unSelectService();
					if(category == "CTGR_001"){
						$('#CTGR_001').addClass("on4");
					}
					else if(category == "CTGR_002"){
						$('#CTGR_002').addClass("on4");
					}
					else if(category == "CTGR_003"){
						$('#CTGR_003').addClass("on4");
					}
					else if(category == "CTGR_004"){
						$('#CTGR_004').addClass("on4");
					}
					else if(category == "CTGR_005"){
						$('#CTGR_005').addClass("on4");
					}
					else if(category == "CTGR_006"){
						$('#CTGR_006').addClass("on4");
					}
				}
				else{
					$('#CTGR_001').trigger("click");
				}
			}
			// 검색된 리스트에서 첫번재 항목 검색
			if($('.gridheader_conThematic').length != 0){
				/** 2020.08.31[한광희] 전체 목록에서 해당 지표 선택 및 스크롤 이동하도록 수정 START */
				if(id != ""){
					$(".gridheader_conThematic").removeClass("on");
					$("#"+id).addClass("on");
					// 해당 지표로 스크롤 이동
					$("#list_div").stop().animate({
						scrollTop: $("#list_div").find("li.on").offset().top-$("#list_div").find("ul").offset().top
					}, 801);
					// 해당 지표 클릭 이벤트 호출
					srvLogWrite('O0', '08', '01', '00', $("#"+id).find(".gridrow_left").find(".List").text(), $("#"+id).attr('id'));
					$("#"+id).find(".gridrow_left").find(".List").get(0).click();
				} else {
					srvLogWrite('O0', '08', '01', '00', $('.gridheader_conThematic').eq(0).find(".gridrow_left").find(".List").text(), $('.gridheader_conThematic').eq(0).attr('id'));
					$('.gridheader_conThematic').eq(0).find(".gridrow_left").find(".List").get(0).click();
					// 해당 지표로 스크롤 이동
					$("#list_div").stop().animate({
						scrollTop: $("#list_div").find("li.on").offset().top-$("#list_div").find("ul").offset().top
					}, 801);
				}
				/** 2020.08.31[한광희] 전체 목록에서 해당 지표 선택 및 스크롤 이동하도록 수정 END */
			}
		},

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
			$("#statsType").empty();	// 통계선택 초기화
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
				// 년도 selectbox 초기화
				$("#base_year,#base_year2").empty();
				// 2022-11-17 reverse 추가
				$.each(thematicInfo.yearList.reverse(),function(cnt,node){
					var selected = thematicInfo.statDataBaseYear==node;
					if(thematicInfo.bordFixYn=="N"&&selected){
						map.bnd_year = node;
					}
					/** 2020.09.08[한광희] 9016년도 제외 처리 START */
					if(node != "9016"){
						if(thematicInfo.themaMapDataId == "credit_card_amount"){
							$('#base_year2').append($("<option/>",{"selected":selected,"value":node,"text":"20"+node+"년"}));
						}else{
							$('#base_year').append($("<option/>",{"selected":selected,"value":node,"text":node}));
						}
					}
					/** 2020.09.08[한광희] 9016년도 제외 처리 END */
				});

				// 년도 선택 이벤트
				var year = $("#base_year").change(function(){
					if(thematicInfo.bordFixYn=="N"){
						delegate.map.bnd_year = $(this).val();
					}
					delegate.search(map);
				});
			}



			/** 2020.09.15[한광희] 코로나19 추가 START */
			if(thematicInfo.monthList&&thematicInfo.monthList.length>0){
				if(thematicInfo.themaMapDataId == "credit_card_amount"){
					// 기준월 selectbox 초기화
					$("#base_month2").empty();

					$.each(thematicInfo.monthList,function(cnt,node){
						var selected = thematicInfo.statDataBaseMonth==node;

						$('#base_month2').append($("<option/>",{"selected":selected,"value":node,"text":node+"월"}));
					});
				}else{
					// 기준월 selectbox 초기화
					$("#base_month").empty();

					$.each(thematicInfo.monthList,function(cnt,node){
						var selected = thematicInfo.statDataBaseMonth==node;

						$('#base_month').append($("<option/>",{"selected":selected,"value":node,"text":node+"월"}));
					});
				}
			}

			if(thematicInfo.dayList&&thematicInfo.dayList.length>0){
				// 기준일 selectbox 초기화
				$("#base_day").empty();

				$.each(thematicInfo.dayList,function(cnt,node){
					var selected = thematicInfo.statDataBaseDay==node;

					$('#base_day').append($("<option/>",{"selected":selected,"value":node,"text":node+"일"}));
				});
			}
			/** 2020.09.15[한광희] 코로나19 추가 END */

			function createLeft(){
				if (hasLeft){
					$("#stats_left").show();
					var optionArrary = [];
					if(thematicInfo.leftSepUnit){
						optionArrary.push(thematicInfo.leftSepUnit);
					}
					if(thematicInfo.sepMapLeftSepUnit){
						optionArrary.push(thematicInfo.sepMapLeftSepUnit);
					}
					$("#statsType").append(
						$("<li/>", {"style":"display:block;", "class":"on"}).append(
							$("<a/>",{"href":"#","class":"on","data-id":"left","text":thematicInfo.leftSepNm+(optionArrary.length>0?"("+optionArrary.join()+")":"")}).click(function(){
								srvLogWrite('O0', '08', '03', '00', thematicInfo.leftSepNm, '');
								$(this).parent().parent().find("li").removeClass("on");
								$(this).parent().parent().find("a").removeClass("on");
								$(this).parent().addClass("on");
								$(this).addClass("on");

								// mng_s 2020. 12. 24 j.h.Seok 통계주제도 통합
								/** 2020.09.15[한광희] 코로나19 추가 START */
								if(thematicInfo.themaMapType == "05" || thematicInfo.themaMapType == "15"){
//								if(thematicInfo.themaMapType=="05"){
									if(thematicInfo.themaMapDataId == "COVID19"){
										$('#yesrSel').hide();
										$('#yesrSel2').show();
										$('#yesrSel3').hide();
									}else if(thematicInfo.themaMapDataId == "covid_vacc_data"){
										$('#yesrSel').hide();
										$('#yesrSel2').show();
										$('#yesrSel3').hide();
									}else	if(thematicInfo.themaMapDataId == "credit_card_amount"){
										$('#yesrSel3').show();
										$('#yesrSel').hide();
										$('#yesrSel2').hide();
									} else {
										$('#yesrSel').show();
										$('#yesrSel2').hide();
										$('#yesrSel3').hide();
									}
								}else{
									$('#yesrSel').hide();
									$('#yesrSel2').hide();
									$('#yesrSel3').hide();
								}
								/** 2020.09.15[한광희] 코로나19 추가 END */
								// mng_e 2020. 12. 24 j.h.Seok 통계주제도 통합
								if(thematicInfo.statThemaMapId == "RZ3pr7Maou20201106160851389D0RGtYCGpW"){
									$thematic.ui.changeThemaStats(delegate, map);
								}else{
									delegate.changeItem(map, thematicInfo);
								}
//								delegate.changeItem(map);
							})
						)
					);

					// mng_s 2020. 12. 24 j.h.Seok 통계주제도 통합
					/** 2020.09.15[한광희] 코로나19 추가 START */
					if(thematicInfo.themaMapType == "05" || thematicInfo.themaMapType == "15"){
//					if(thematicInfo.themaMapType=="05"){
						if(thematicInfo.themaMapDataId == "COVID19"){
							$('#yesrSel').hide();
							$('#yesrSel2').show();
							$('#yesrSel3').hide();
						}else if(thematicInfo.themaMapDataId == "covid_vacc_data"){
							$('#yesrSel').hide();
							$('#yesrSel2').show();
							$('#yesrSel3').hide();
						}else	if(thematicInfo.themaMapDataId == "credit_card_amount"){
							$('#yesrSel3').show();
							$('#yesrSel').hide();
							$('#yesrSel2').hide();
						} else {
							$('#yesrSel').show();
							$('#yesrSel2').hide();
							$('#yesrSel3').hide();
						}
					}else{
						$('#yesrSel').hide();
						$('#yesrSel2').hide();
						$('#yesrSel3').hide();
					}
					/** 2020.09.15[한광희] 코로나19 추가 END */
					// mng_e 2020. 12. 24 j.h.Seok 통계주제도 통합

				} else {
					$("#stats_left").hide();
				}
			}
			function createRight(){
				if (hasRight){
					$("#stats_right").show();
					var optionArrary = [];
					if(thematicInfo.statThemaMapId == "QNj43PFUT220190612100733746ocaFOXLaj3"){
						thematicInfo.rightSepUnit = "십만명당,건";
					}
					if(thematicInfo.rightSepUnit){
						optionArrary.push(thematicInfo.rightSepUnit);
					}
					if(thematicInfo.sepMapRightSepUnit){
						optionArrary.push(thematicInfo.sepMapRightSepUnit);
					}
					$("#statsType").append(
						$("<li/>", {"style":"display:block;", "class":(!hasLeft?"on":"")}).append(
								$("<a/>",{"href":"#","class":(!hasLeft?"on":""),"data-id":"right","data-type":thematicInfo.themaMapType=="04"?"number":"","text":thematicInfo.rightSepNm+(optionArrary.length>0?"("+optionArrary.join()+")":"")}).click(function(){
									srvLogWrite('O0', '08', '03', '00', thematicInfo.rightSepNm, '');
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									// mng_s 2020. 12. 24 j.h.Seok 통계주제도 통합
									/** 2020.09.15[한광희] 코로나19 추가 START */
									if(/04|05/.test(thematicInfo.themaMapType) || thematicInfo.themaMapType == "15"){
//									if(/04|05/.test(thematicInfo.themaMapType)){
										if(thematicInfo.themaMapDataId == "COVID19"){
											$('#yesrSel').hide();
											$('#yesrSel2').show();
											$('#yesrSel3').hide();
										}else if(thematicInfo.themaMapDataId == "covid_vacc_data"){
											$('#yesrSel').hide();
											$('#yesrSel2').show();
											$('#yesrSel3').hide();
										}else	if(thematicInfo.themaMapDataId == "credit_card_amount"){
											$('#yesrSel3').show();
											$('#yesrSel').hide();
											$('#yesrSel2').hide();
										} else {
											$('#yesrSel').show();
											$('#yesrSel2').hide();
											$('#yesrSel3').hide();
										}
									}else{
										$('#yesrSel').hide();
										$('#yesrSel2').hide();
										$('#yesrSel3').hide();
									}
									/** 2020.09.15[한광희] 코로나19 추가 END */
									// mng_e 2020. 12. 24 j.h.Seok 통계주제도 통합
									if(thematicInfo.statThemaMapId == "RZ3pr7Maou20201106160851389D0RGtYCGpW"){
										$thematic.ui.changeThemaStats(delegate, map);
									}else{
										delegate.changeItem(map, thematicInfo);
									}
//									delegate.changeItem(map);
							})
						)
					);

					// mng_s 2020. 12. 24 j.h.Seok 통계주제도 통합
					/** 2020.09.15[한광희] 코로나19 추가 START */
					if(/04|05/.test(thematicInfo.themaMapType) || thematicInfo.themaMapType == "15"){
//					if(/04|05/.test(thematicInfo.themaMapType)){
						if(thematicInfo.themaMapDataId == "COVID19"){
							$('#yesrSel').hide();
							$('#yesrSel2').show();
							$('#yesrSel3').hide();
						}else if(thematicInfo.themaMapDataId == "covid_vacc_data"){
							$('#yesrSel').hide();
							$('#yesrSel2').show();
							$('#yesrSel3').hide();
						}else	if(thematicInfo.themaMapDataId == "credit_card_amount"){
							$('#yesrSel3').show();
							$('#yesrSel').hide();
							$('#yesrSel2').hide();
						} else {
							$('#yesrSel').show();
							$('#yesrSel2').hide();
							$('#yesrSel3').hide();
						}
					}else{
						$('#yesrSel').hide();
						$('#yesrSel2').hide();
						$('#yesrSel3').hide();
					}
					/** 2020.09.15[한광희] 코로나19 추가 END */
					// mng_e 2020. 12. 24 j.h.Seok 통계주제도 통합

				} else {
					$("#stats_right").hide();
				}
			}

			if(thematicInfo.themaMapType=="04"){
				createRight();
				createLeft();
			}else{
				createLeft();
				createRight();

				// mng_s 2020. 12. 24 j.h.Seok 통계주제도 통합
				if((thematicInfo.themaMapType == "05" || thematicInfo.themaMapType == "15") && thematicInfo.addDataDispYn == "Y"){
//				if(thematicInfo.themaMapType=="05"&&thematicInfo.addDataDispYn=="Y"){
					$("#statsType").append(
						$("<li/>", {"style":"display:block;"}).append(
							$("<a/>",{"href":"#","data-id":"left","data-type":"pc","text":thematicInfo.sepMapLeftSepNm+(hasText(thematicInfo.sepMapLeftSepUnit)?"("+thematicInfo.sepMapLeftSepUnit+")":"")}).click(function(){
								srvLogWrite('O0', '08', '03', '00',thematicInfo.sepMapLeftSepNm, '');
								$(this).parent().parent().find("li").removeClass("on");
								$(this).parent().parent().find("a").removeClass("on");
								$(this).parent().addClass("on");
								$(this).addClass("on");
								$('#yesrSel').hide();
								$('#yesrSel2').hide();	// 2020.09.15[한광희] 코로나19 추가
								$('#yesrSel3').hide();
								delegate.changeItem(map, thematicInfo);
							})
						)
					);
				}
				// mng_e 2020. 12. 24 j.h.Seok 통계주제도 통합
			}
			$("#change_covid_thema").hide();
			$("#change_covid_thema_item li").remove();
			// mng_s 2020. 12. 24 j.h.Seok 통계주제도 통합
			if(thematicInfo.themaMapType == "13" || thematicInfo.themaMapType == "15") {
				$("#change_stat_thema").show();
				$("#change_stat_thema_item li").remove();
				$("#select_dataType").hide();

				$thematic.ui.changeThemaStats(delegate, map);
			}else if(thematicInfo.statThemaMapId == "2qAx0jvYOk20180802165500441EHhhaQZQaK" || thematicInfo.statThemaMapId == "OuQf1ZhcWo20190822091422257GkbDsfsZHi" || thematicInfo.statThemaMapId == "3SnEYaTafC20181127142830568kSyMYbSg3S"){
				$("#select_dataType").show();
			}else if(thematicInfo.statThemaMapId == "8mjCr1kWql20201123140825772vKMjQsNcRw"){
				$("#change_stat_thema").show();
				$("#change_stat_thema_item li").remove();
				$("#select_dataType").hide();

				$thematic.ui.changeThemaStats(delegate, map);
			}else if(thematicInfo.statThemaMapId == "uHaX8JJqyh20201014110114231lgMgsJnINP"){
				$("#change_stat_thema").show();
				$("#change_stat_thema_item li").remove();
				$("#select_dataType").hide();

				$thematic.ui.changeThemaStats(delegate, map);
			}else if(thematicInfo.statThemaMapId == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
				$("#change_stat_thema").show();
				$("#change_stat_thema_item li").remove();
				$("#select_dataType").hide();

				$thematic.ui.changeThemaStats(delegate, map);
			}else if(thematicInfo.statThemaMapId == "RZ3pr7Maou20201106160851389D0RGtYCGpW"){
				$("#change_stat_thema").show();
				$("#change_stat_thema_item li").remove();
				$("#select_dataType").hide();

				$thematic.ui.changeThemaStats(delegate, map);
			}else if(thematicInfo.statThemaMapId == "wPsSdFX8Wt20210520161423833UZjHClj5U3"){
				$("#change_stat_thema").show();
				$("#change_stat_thema_item li").remove();
				$("#select_dataType").hide();

				$thematic.ui.changeThemaStats(delegate, map);
			}else if(thematicInfo.statThemaMapId == "sAXkcVzk5V202007141335257355ued9032uw"){
				$("#change_covid_thema").show();
				$("#change_covid_thema_item li").remove();
				$("#change_stat_thema").hide();
				$("#change_stat_thema_item li").remove();
				$("#select_dataType").hide();

				$thematic.ui.changeThemaStats(delegate, map);
			}else {
				$("#select_dataType").hide();
				$("#change_stat_thema").hide();
				$("#statsType").css("display", "");
			}
			// mng_e 2020. 12. 24 j.h.Seok 통계주제도 통합
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
			/** 2020.09.15[한광희] 코로나19 추가 START */
			if(thema_map_data_id == "COVID19"){
				map.mapMove([990480.875, 1815839.375], 1);
				var url = contextPath+"/m2020/thematic/selectCovid19ThematicMapData.json";
				var data = {
					stat_data_base_year:stat_data_base_year,
					stat_data_base_month:$("#base_month option:selected").val(),
					stat_data_base_day:$("#base_day option:selected").val()
				};
				var type = "POST";
			}else if(thema_map_data_id == "covid_vacc_data"){
				map.mapMove([990480.875, 1815839.375], 1);
				if($("#statsType li:eq(0)").hasClass("on")){
					covid_vacc_cd = $("#change_stat_thema_item a.on").attr("id").substr(-2,1);
				}else{
					covid_vacc_cd = $("#change_stat_thema_item a.on").attr("id").substr(-1,1);
				}
				var url = contextPath+"/m2020/thematic/selectCovid19VaccThematicMapData.json";
				var data = {
						stat_data_base_year:stat_data_base_year,
						stat_data_base_month:$("#base_month option:selected").val(),
						stat_data_base_day:$("#base_day option:selected").val(),
						covid_vacc_cd : covid_vacc_cd
				};
				var type = "POST";
			}else {
				var type = "GET";
				var url = sgisContextPath+"/ServiceAPI/thematicMap/GetThemaMapData.json";
				if(thema_map_data_id == "cancer_data"){
					var cancer_type_lv = $("#change_stat_thema_item a.on").attr("id").substr(-1,1);
					var data = {
							adm_cd:adm_cd,
							thema_map_data_id:thema_map_data_id,
							stat_data_base_year:stat_data_base_year,
							area_type : "auto",
							cancer_type_div_cd : cancer_type_lv,
							base_year : stat_data_base_year
					};
				}else if(thema_map_data_id == "infection_data"){
						var icd_clst_nm = $("#change_stat_thema_item a.on").text();
						var data = {
								adm_cd:adm_cd,
								thema_map_data_id:thema_map_data_id,
								stat_data_base_year:stat_data_base_year,
								area_type : "auto",
								chart_disp_order : "0",
								base_year : stat_data_base_year,
								icd_clst_nm : icd_clst_nm
						};
				}else if(thema_map_data_id == "weather_data"){
					var weather_type_cd = $("#change_stat_thema_item a.on").attr("id").substr(-1,1);
					var data = {
							adm_cd:adm_cd,
							thema_map_data_id:thema_map_data_id,
							stat_data_base_year:stat_data_base_year,
							area_type : "auto",
							weather_type_cd : weather_type_cd,
							base_year : stat_data_base_year
					};
				}else if(thema_map_data_id == "car_accident_data"){
					var caracc_type_cd = $("#change_stat_thema_item a.on").attr("id").substr(-1,1);
					var data = {
							adm_cd:adm_cd,
							thema_map_data_id:thema_map_data_id,
							stat_data_base_year:stat_data_base_year,
							area_type : "auto",
							caracc_type_cd : caracc_type_cd,
							base_year : stat_data_base_year
					};
				}else{
					var data = {
							adm_cd:adm_cd,
							thema_map_data_id:thema_map_data_id,
							stat_data_base_year:stat_data_base_year,
							area_type : "auto"
					};
				}
				if(thematicInfo.themaMapType=="04"&&$("#statsType>li>a.on").data("id")=="right"){
					url = sgisContextPath+"/ServiceAPI/thematicMap/getThemaMapDataForChart.json"
					data.data_year = data.stat_data_base_year;
					delete data.stat_data_base_year;
				}
			}
			/** 2020.09.15[한광희] 코로나19 추가 END */

			$.ajax({
				type: type,	// 2020.09.15[한광희] 코로나19 추가
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
				/*error: function(xhr, status, errorThrown) {
					common_alert(errorMessage);
				}*/
			});
		},

		/**
		 * @name : statsThemeMapListData
		 * @description : 통계주제도 목록 조회
		 * @date : 2020.07.06
		 * @author : 주형식
		 * @history :
		 */
		statsThemeMapListData : function(id){

			var searchText = $("#thematicCatalogKwrd").val();

			// 초기화
			$("#list_div").html("");
			//2022-10-13 [송은미] 이벤트 추가
			$(".maptit04").removeClass("active");

			var dataParams = {
					cate_id : $thematic.ui.serviceGb,
					resultCnt : 5,
					title : searchText,
					sort_type: $("#selectThematicCatalogSorting option:selected").val(),
					id : id ,
					p : 0,}

			if($thematic.ui.my_adm_cd != null && $thematic.ui.my_adm_cd != ""){
				dataParams.ref_adm_id = $thematic.ui.my_adm_cd;
			} else {
				dataParams.ref_adm_id = "999";
			}

			$.ajax({
				type: "POST",
				url : contextPath + "/m2020/thematic/selectThematicList.json",
				dataType: 'json',
				async: false,
				data:dataParams,
			    success: function(res){
			    	if(res.errCd == 0){
			    		var lifeCateHtml = "";
						var resultList = res.result;
						var category = resultList.category;

						var num = category.substring(6,8);
						var txt = "<div style='margin-top:25px;height:43px;' align='center'>검색 결과가 없습니다.</div>";

						if(resultList.themeMapInfoList.length == 0){
							/** 2020.08.31[한광희] 목록 스크롤 이동을 위한 수정 START */
							$("#list_div").html("");
							$("#list_div").append(txt);
							/** 2020.08.31[한광희] 목록 스크롤 이동을 위한 수정 END */
						}

						$("#list_cnt").text(appendCommaToNumber(resultList.themeMapInfoList.length) +" 건");
						var html = $thematic.ui.getThemeListHtml(resultList);

						/** 2020.09.15[한광희] 사용하지 않는 소스 주석처리 START */
						//List를 붙인다.
						/*$("#"+num).html("");
						$("#"+num).html(html);*/

						/*if (resultList.themeMapInfoList.length < 1) {
							$('#list'+num).hide();
							var tempHeight = $("#"+num).height() + $("#list"+num).height() + 100;
						}else {
							$('#list'+num).show();
							var tempHeight = $("#"+num).height() + $("#list"+num).height() + 100;
						}	*/

						/*var tempId = '#icon';
						var tempIndex = $thematic.ui.calledType;
						tempId += tempIndex;*/
						/** 2020.09.15[한광희] 사용하지 않는 소스 주석처리 END */
			    	} else {
						common_alert('failed!');
					}
				} ,
				error:function(err) {
					common_alert(err.responseText);
				}
			});
		},

		// 리스트 뿌리기
		getThemeListHtml : function (themeListObj) {
			var themeListObjHml = "";
			var root, tmp, tmpExp, popTitle3;

			/** 2020.08.31[한광희] 목록 스크롤 이동을 위한 수정 START */
			root = $("#list_div");
			/** 2020.08.31[한광희] 목록 스크롤 이동을 위한 수정 END */

			themeListObj = themeListObj.themeMapInfoList;

			themeListObjHml = '<ul>'
			for ( var i = 0; i < themeListObj.length; i++) {
				themeListObjHml += '<li class="gridheader_conThematic" id="'+themeListObj[i].statThemaMapId+'">';	// 2020.08.31[한광희] 전체 목록에서 특정 지표 선택을 위한 id 추가
				/** 2020-09-17 [곽제욱] 환경과안전-코로나 지표인 경우 코로나 팝업 제공 START */
				if(themeListObj[i].statThemaMapId=="sAXkcVzk5V202007141335257355ued9032uw") {
					themeListObjHml += '<div class="gridrow_left" onclick=\'javascript:$thematic.ui.coronaPopup("'+ themeListObj[i].statThemaMapId +'");\'>';
				} else {
					themeListObjHml += '<div class="gridrow_left" onclick=\'javascript:$thematic.ui.listTitleClickEvent("'+ themeListObj[i].statThemaMapId +'");\'>';
				}
				/** 2020-09-17 [곽제욱] 환경과안전-코로나 지표인 경우 코로나 팝업 제공 END */
				themeListObjHml += '<h2><a class="List" href="javascript:void(0);" style="word-break: keep-all;">' + themeListObj[i].title;	// 통계명칭	// 2020.09.08[한광희] 개행 수정
				/*themeListObjHml += '</a></h2>';*/
				/*2022-11-02 수정*/
				if(themeListObj[i].leftSepValue != undefined && themeListObj[i].leftSepValue != null && themeListObj[i].leftSepValue != ""){
					themeListObjHml += '<span>'+'('+ themeListObj[i].leftSepValue +')'+ '</span>';
				} else {
					themeListObjHml += '<span></span>';
				}
				themeListObjHml += '</a>'
				//themeListObjHml += '<button type="button" class="thematic_moreInfo" onclick=\"javascript:$thematic.ui.listHelpClickEvent("'+themeListObj[i].themaExp+'");\">' + '</button>'
				
				themeListObjHml += '</h2>';
				themeListObjHml += '<div class="gridrow_list">'
				var str = "";
				// 시도,시군구,읍면동,집계구 설정(공통)
				/*if(themeListObj[i].maxExpnsnLevel == '01') {
					str += '<span class="dataKeyword keyword'+ themeListObj[i].maxExpnsnLevel+'">시도</span>'
				} else if(themeListObj[i].maxExpnsnLevel == '02') {
					str += '<span class="dataKeyword keyword'+ themeListObj[i].maxExpnsnLevel+'">시군구</span>'
				} else if(themeListObj[i].maxExpnsnLevel == '03') {
					str += '<span class="dataKeyword keyword'+ themeListObj[i].maxExpnsnLevel+'">읍면동</span>'
				} else if(themeListObj[i].maxExpnsnLevel == '04'){*/
				
				if(themeListObj[i].maxExpnsnLevel == '01') {
					str += '<span>시도</span>'
				} else if(themeListObj[i].maxExpnsnLevel == '02') {
					str += '<span>시군구</span>'
				} else if(themeListObj[i].maxExpnsnLevel == '03') {
					str += '<span>읍면동</span>'
				} else if(themeListObj[i].maxExpnsnLevel == '04'){
					/*str += '<span class="dataKeyword keyword'+ themeListObj[i].maxExpnsnLevel+'">집계구</span>'*/
					str += '<span>집계구</span>'
				}

				// 주제도 유형 정보
				if(themeListObj[i].type=='02'){
					var classType = 'type05';
					if(themeListObj[i].dispMethod == '색상'){
						classType = 'type05';
					}else if(themeListObj[i].dispMethod == '증감'){
						classType = 'type06';
					}else if(themeListObj[i].dispMethod == '시계열'){
						classType = 'type07';
					}else if(themeListObj[i].dispMethod == '분할뷰'){
						classType = 'type09';
					}else if(themeListObj[i].dispMethod == 'POI'){
						classType = 'type10';
					}
					// 예전 데이터의 경우 disp_mthd 와 max_expnsn으로 박스표시
					str += '<span class="dataKeyword keyword ' + classType + '>'+ themeListObj[i].dispMethod + '</span>';
				}else{
					// theme_map_type이 다른경우 max_expnsn

					// mng_s 2020. 12. 24 j.h.Seok 통계주제도 통합
					/*if(themeListObj[i].type == '03' || themeListObj[i].type == '13'){
//						if(themeListObj[i].type == '03'){
							str += '<span class="dataKeyword keyword05">색상</span>'
						}else if(themeListObj[i].type == '04'){
							str += '<span class="dataKeyword keyword06">증감</span>';
						}else if(themeListObj[i].type == '05' || themeListObj[i].type == '15'){
//						}else if(themeListObj[i].type == '05'){
							str += '<span class="dataKeyword keyword07">시계열</span>';
						}else if(themeListObj[i].type == '06'){
							str += '<span class="dataKeyword keyword09">분할뷰</span>';
						}else if(themeListObj[i].type == '07'){
							str += '<span class="dataKeyword keyword10">POI</span>';
						}*/
					if(themeListObj[i].type == '03' || themeListObj[i].type == '13'){
//					if(themeListObj[i].type == '03'){
						str += '<span>색상</span>'
					}else if(themeListObj[i].type == '04'){
						str += '<span>증감</span>';
					}else if(themeListObj[i].type == '05' || themeListObj[i].type == '15'){
//					}else if(themeListObj[i].type == '05'){
						str += '<span>시계열</span>';
					}else if(themeListObj[i].type == '06'){
						str += '<span>분할뷰</span>';
					}else if(themeListObj[i].type == '07'){
						str += '<span>POI</span>';
					}
					// mng_e 2020. 12. 24 j.h.Seok 통계주제도 통합
				}
				
				//데이터 년도
				/*str += '<span class="dataKeyword keyword08">'+themeListObj[i].yearInfo+'</span>';*/
				str += '<span>'+themeListObj[i].yearInfo+'</span>';
				themeListObjHml +=  str + '</div>';
				 /*2022-11-02 수정*/
				themeListObjHml += '</div>';
				/*themeListObjHml += '<div class="gridrow_right">';*/

				/** 2020.09.02[한광희] 통계주제도 위치 미동의시 통계수치 undefined 오류 수정 START */
				// 수치
				/*if(themeListObj[i].leftSepValue != undefined && themeListObj[i].leftSepValue != null && themeListObj[i].leftSepValue != ""){
					themeListObjHml += '<span>' + themeListObj[i].leftSepValue + '</span>';
				} else {
					themeListObjHml += '<span></span>';
				}*/
				/** 2020.09.02[한광희] 통계주제도 위치 미동의시 통계수치 undefined 오류 수정 END */

				// 도움말 버튼

				//2022.09.27 주용민
				tmpExp = (""+themeListObj[i].themaExp).replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/&quot;/gi,'"').replace(/&amp;/gi,"&").replace(/&#039;/gi,"'").replace(/&#034;/gi,'"');
				//2022.09.27 주용민
				/*themeListObjHml += '<button type="button" class="thematic_moreInfo" onclick=\"javascript:$thematic.ui.listHelpClickEvent("'+themeListObj[i].themaExp+'");\">' + '</button>';*/
				/*themeListObjHml += '</div>';*/
				
				popTitle3 = themeListObj[i].title;				
				themeListObjHml += "<button type=\"button\" class=\"thematic_moreInfo\" onclick=\"javascript:$thematic.ui.listHelpClickEvent('"+tmpExp +"', '"+popTitle3 +"');\">" + "</button>";
				themeListObjHml += '</li>';
			}
			themeListObjHml += '</ul>';
			tmp = $(themeListObjHml);
			root.append(tmp);

			$("#list_cnt").text(appendCommaToNumber(themeListObj.length) +" 건");

			return root;
		},
		/** 2020-09-17 [곽제욱] 코로나 팝업관련 로직 START */
		coronaPopup: function(statThemaMapId){
			// 1일간 더이상 이창을 열지않음 체크하지 않았을경우 팝업 호출
			if(common_get_cookie("lc_info_covide19_yn") != "Y"){
				// 코로나19 현황판 조회
				if(statThemaMapId =="sAXkcVzk5V202007141335257355ued9032uw"){
					common_loading(true); // 로딩바
					$.ajax({
						type: "POST",
						url : contextPath + "/m2020/thematic/selectCovid19Stats.json",
						dataType: 'json',
						async: false,
						data:{stat_thema_map_id:statThemaMapId},
					    success: function(res){
					    	if(res.errCd == 0){
					    		// 팝업 1일간 허용여부 쿠키 확인
					    		if(common_get_cookie("lc_info_covide19_yn") != "Y"){
					    			var covid19Data = res.result.covid19Stats[0];

						    		$("#today").html(covid19Data.base_month+"."+covid19Data.base_day+". 00시 기준, 1.3 이후 누적");		// 기준날짜
						    		$("#todaycnt").html(appendCommaToNumber(covid19Data.todaycnt));	// 일일 확진자
						    		$("#localocccnt").html(appendCommaToNumber(covid19Data.localocccnt));	// 국내 발생
						    		$("#overflowcnt").html(appendCommaToNumber(covid19Data.overflowcnt));	// 해외 유입

						    		var tempDefcnt = covid19Data.defcnt;	// 확진환자
						    		var tempIncDefcnt = covid19Data.inc_defcnt;	// 확진환자-증감률
						    		var tempIsolclearcnt = covid19Data.isolclearcnt;	// 완치
						    		var tempIncIsolclearcnt = covid19Data.inc_isolclearcnt;	// 완치-증감률
						    		var tempIsolingcnt = covid19Data.isolingcnt;	// 치료중
						    		var tempIncIsolingcnt = covid19Data.inc_isolingcnt;	// 치료중-증감률
						    		var tempDeathcnt = covid19Data.deathcnt;	// 사망
						    		var tempIncDeathcnt = covid19Data.inc_deathcnt;	// 사망-증감률

						    		// 확진환자
						    		$("#defcnt").empty();
						    		var defcntHtml = "";
						    		defcntHtml += "<h4 class='CColor_txt00'>"+appendCommaToNumber(tempDefcnt)+"</h4>";
						    		if(tempIncDefcnt > 0){
						    			defcntHtml += "<spand class='td_up'>"+appendCommaToNumber(tempIncDefcnt)+" ▲</h4>";
						    		} else if(tempIncDefcnt < 0){
						    			defcntHtml += "<spand class='td_down'>"+appendCommaToNumber(tempIncDefcnt)+" ▼</h4>";
						    		} else {
						    			defcntHtml += "<spand class='td_equals'> - </h4>";
						    		}
						    		$("#defcnt").append(defcntHtml);

						    		// 완치
						    		$("#isolclearcnt").empty();
						    		var isolclearcntHtml = "";
						    		isolclearcntHtml += "<h4 class='CColor_txt01'>"+appendCommaToNumber(tempIsolclearcnt)+"</h4>";
						    		if(tempIncIsolclearcnt > 0){
						    			isolclearcntHtml += "<spand class='td_up'>"+appendCommaToNumber(tempIncIsolclearcnt)+" ▲</h4>";
						    		} else if(tempIncIsolclearcnt < 0){
						    			isolclearcntHtml += "<spand class='td_down'>"+appendCommaToNumber(tempIncIsolclearcnt)+" ▼</h4>";
						    		} else {
						    			isolclearcntHtml += "<spand class='td_equals'> - </h4>";
						    		}
						    		$("#isolclearcnt").append(isolclearcntHtml);

						    		// 치료중
						    		$("#isolingcnt").empty();
						    		var isolingcntHtml = "";
						    		isolingcntHtml += "<h4 class='CColor_txt02'>"+appendCommaToNumber(tempIsolingcnt)+"</h4>";
						    		if(tempIncIsolingcnt > 0){
						    			isolingcntHtml += "<spand class='td_up'>"+appendCommaToNumber(tempIncIsolingcnt)+" ▲</h4>";
						    		} else if(tempIncIsolingcnt < 0){
						    			isolingcntHtml += "<spand class='td_down'>"+appendCommaToNumber(tempIncIsolingcnt)+" ▼</h4>";
						    		} else {
						    			isolingcntHtml += "<spand class='td_equals'> - </h4>";
						    		}
						    		$("#isolingcnt").append(isolingcntHtml);

						    		// 사망
						    		$("#deathcnt").empty();
						    		var deathcntHtml = "";
						    		deathcntHtml += "<h4 class='CColor_txt03'>"+appendCommaToNumber(tempDeathcnt)+"</h4>";
						    		if(tempIncDeathcnt > 0){
						    			deathcntHtml += "<spand class='td_up'>"+appendCommaToNumber(tempIncDeathcnt)+" ▲</h4>";
						    		} else if(tempIncDeathcnt < 0){
						    			deathcntHtml += "<spand class='td_down'>"+appendCommaToNumber(tempIncDeathcnt)+" ▼</h4>";
						    		} else {
						    			deathcntHtml += "<spand class='td_equals'> - </h4>";
						    		}
						    		$("#deathcnt").append(deathcntHtml);

						    		$("#common_popup_back").parent().show();
						    		$("#coronaStatsPop").show();
					    		}
					    	} else {
								common_alert('failed!');
							}
						} ,
						error:function(err) {
							common_alert(err.responseText);
						}
					});
					common_loading(false); // 로딩바
				}
			} else {
				$thematic.ui.listTitleClickEvent("sAXkcVzk5V202007141335257355ued9032uw")
			}
		},
		/** 2020-09-17 [곽제욱] 코로나 팝업관련 로직 END */

		//코로나 예방접종현황 팝업관련
		coronaPopup2: function () {
			common_loading(true); // 로딩바
			$.ajax({
				type: "POST",
				url : contextPath + "/m2020/thematic/selectCovid19VaccStats.json",
				dataType: 'json',
				async: false,
				data:{stat_thema_map_id:'sAXkcVzk5V202007141335257355ued9032uw'},
			    success: function(res){
			    	if(res.errCd == 0){
			    		var covid19VaccData = res.result.covid19VaccStats[0];
			    		$("#today2").html(covid19VaccData.base_month+"."+covid19VaccData.base_day+". 00시 기준");		// 기준날짜
			    		$("#num1").html(appendCommaToNumber(covid19VaccData.total_fst_lnocl_cnt) + "명");
			    		$("#num2").html(appendCommaToNumber(covid19VaccData.today_fst_lnocl_cnt) + "명");
			    		$("#num3").html(appendCommaToNumber(covid19VaccData.bfrt_fst_lnocl_cnt) + "명");
			    		$("#num4").html(appendCommaToNumber(covid19VaccData.total_scd_lnocl_cnt) + "명");
			    		$("#num5").html(appendCommaToNumber(covid19VaccData.today_scd_lnocl_cnt) + "명");
			    		$("#num6").html(appendCommaToNumber(covid19VaccData.bfrt_scd_lnocl_cnt) + "명");
			    		$("#num7").html(appendCommaToNumber(covid19VaccData.total_third_lnocl_cnt) + "명");
			    		$("#num8").html(appendCommaToNumber(covid19VaccData.today_third_lnocl_cnt) + "명");
			    		$("#num9").html(appendCommaToNumber(covid19VaccData.bfrt_third_cnt) + "명");
			    	}
			    }
			});
		},
		//코로나 예방접종현황 팝업관련

		listTitleClickEvent: function (statThemaMapId) {
			$("#showNumberBtn").removeClass("on");
			common_loading(true); // 로딩바	//2020.09.15[한광희] 로딩바 추가
			/** 2020.09.03[한광희] 통계주제도 분할뷰 수정 START */
			// 범례버튼 class 삭제
			$('.databtn02').removeClass("on");
			// 범례 숨김
			$('.tooltipbox').css('visibility', 'hidden');
			/** 2020.09.03[한광희] 통계주제도 분할뷰 수정 END */

			$.ajax({
				type: "POST",
				url : contextPath + "/m2020/thematic/selectThematicMapData.json",
				dataType: 'json',
				async: false,
				data:{stat_thema_map_id:statThemaMapId},
			    success: function(res){

			    	if(res.errCd == 0){

			    		thematicInfo = res.result.themeMapInfoList;

			    		/** 2020.09.15[한광희] 코로나19 추가 START */
						if(thematicInfo.statThemaMapId =="sAXkcVzk5V202007141335257355ued9032uw"){
							var type = $("#statsType").find("a.on").data("id");
							/** 2020.09.17[곽제욱] 코로나19 지표title 세팅시 undefined 인 경우 초기값 세팅 START */
							if(thematicInfo[type+"SepNm"]!=null && thematicInfo[type+"SepNm"]!=""){
								$(".maptit04").text(thematicInfo.title+" ("+thematicInfo[type+"SepNm"]+")");
							} else {
								$(".maptit04").text(thematicInfo.title+" (신규)");
							}
							/** 2020.09.17[곽제욱] 코로나19 지표title 세팅시 undefined 인 경우 초기값 세팅 END */
						} else {
							// 선택된 값
							/*$('.maptit04').text(thematicInfo.title);*/
							var svg = '<svg width="12" height="8" viewBox="0 0 14 8"  xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z" /></svg>';
				    		$('.maptit04').html(thematicInfo.title+svg);
						}
						/** 2020.09.15[한광희] 코로나19 추가 END */

						// mng_s 2020. 12. 24 j.h.Seok 통계주제도 통합
			    		/*
			    		 * thematicInfo.themaMapType에 따른 테마주제도
							01 : 삭제될 타입
							02 : 예전 타입인데 pplDistHeat(인구분포현황) 을 제외한 나머진 사용하지 않음
							03 : 색상
							04 : 증감
							05 : 시계열
							06 : 분할뷰
							07 : POI

							추가 내용
							13 : 통합 색상 타입
							15 : 통합 시계열 타입
			    		 */

			    		if(/0(3|4|5|7)/.test(thematicInfo.themaMapType) || /1(3|5)/.test(thematicInfo.themaMapType)){
//		    			if(/0(3|4|5|7)/.test(thematicInfo.themaMapType)){
			    			$('#singleMap').show();
			    			$('#leftmap').hide();
			    			$('#rightmap').hide();

			    			sop.DomUtil.get('singleMap')._sop = false;
			    			$("#btnrvTotletop").show();	// 범례 버튼 활성화

			    			// mng_s 2021. 01. 07 j.h.Seok 주제도 항목 선택 시 로딩바 추가
			    			$thematic.ui.thematicListPopupToggle(false);
			    			common_loading(true); // 로딩바
			    			// mng_e 2021. 01. 07 j.h.Seok 주제도 항목 선택 시 로딩바 추가

			    			$partitionMap.ui.leftMap = null;
			    			$partitionMap.ui.rightmap = null;
			    			$partitionMap.ui.leftmapCurData = null;
			    			$partitionMap.ui.rightmapCurData = null;
				    		$singleMap.event.setUIEvent();

				    		/** 2020.09.08[한광희] 분할뷰 범례 중첩 수정 START */
				    		$(".currenPositionWrap").prop("style", "margin-bottom:0%;");
				    		/*$("#dataWrap").prop("style", "margin-bottom:0%; bottom:45px;"); // 현재위치 영역, 우측 버튼 영역 정렬 맞춤 2020.09.04 신예리 수정 /*2020.09.09 [신예리] 싱글맵 현재위치 영역 margin 값 수정*/
				    		$("#dataWrap").prop("style", "margin-bottom:0%; bottom:15px;");
				    		$("#showNumberBtn").prop("style", "margin-bottom:0%;");
				    		//$("#btnrvTotletop").prop("style", "margin-bottom:110%;"); /*2020.09.09 [신예리] 싱글맵 버튼 영역 margin 값 수정*/
				    		/** 2020.09.08[한광희] 분할뷰 범례 중첩 수정 END */
				    		common_loading(false); // 로딩바
			    		}
			    		else if(thematicInfo.themaMapType=='06'){
			    			$('#singleMap').hide();
			    			$('#leftmap').show();
			    			$('#rightmap').show();

			    			sop.DomUtil.get('leftmap')._sop = false;
			    			sop.DomUtil.get('rightmap')._sop = false;
			    			$("#btnrvTotletop").hide();	// 범례 버튼 비활성화

			    			// mng_s 2021. 01. 07 j.h.Seok 주제도 항목 선택 시 로딩바 추가
			    			$thematic.ui.thematicListPopupToggle(false);
			    			common_loading(true); // 로딩바
			    			// mng_e 2021. 01. 07 j.h.Seok 주제도 항목 선택 시 로딩바 추가

			    			$singleMap.ui.map = null;
			    			$singleMap.ui.curData = null;
			    			$partitionMap.event.setUIEvent();

			    			/** 2020.09.08[한광희] 분할뷰 범례 중첩 수정 START */
			    			$(".currenPositionWrap").prop("style", "margin-bottom:0%;"); /*2020.09.09 [신예리] 분할뷰 현재위치 영역 margin 값 수정*/
			    			$("#dataWrap").prop("style", "margin-bottom:15%; bottom:0px;"); /*2020.09.09 [신예리] 분할뷰 버튼 영역 margin 값 수정*/
			    			$("#showNumberBtn").prop("style", "margin-bottom:147%;");
			    			$(".infoWindow").prop("style", "margin-top:40px; font: 12px / 14px Arial, Helvetica, sans-serif; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 15px; border-radius: 5px; opacity: 0.8;");
			    			/** 2020.09.08[한광희] 분할뷰 범례 중첩 수정 END */
			    			// 톱니바퀴 옵션 안보이도록
			    			$(".control_item").prop("style", "display:none");
			    			common_loading(false); // 로딩바
			    		}
			    		// mng_e 2020. 12. 24 j.h.Seok 통계주제도 통합

			    	} else {
						common_alert('failed!');
					}
				} ,
				error:function(err) {
					common_alert(err.responseText);
				}
			});
			/** 2020.09.17[곽제욱] 코로나19 관련 분리 START */
			/** 2020.09.15[한광희] 코로나19 추가 START */
			/*
			// 코로나19 현황판 조회
			if(statThemaMapId =="sAXkcVzk5V202007141335257355ued9032uw"){
				common_loading(true); // 로딩바
				$.ajax({
					type: "POST",
					url : contextPath + "/m2020/thematic/selectCovid19Stats.json",
					dataType: 'json',
					async: false,
					data:{stat_thema_map_id:statThemaMapId},
				    success: function(res){
				    	if(res.errCd == 0){
				    		// 팝업 1일간 허용여부 쿠키 확인
				    		if(common_get_cookie("lc_info_covide19_yn") != "Y"){
				    			var covid19Data = res.result.covid19Stats[0];

					    		$("#today").html(covid19Data.base_month+"."+covid19Data.base_day+". 00시 기준, 1.3 이후 누적");		// 기준날짜
					    		$("#todaycnt").html(appendCommaToNumber(covid19Data.todaycnt));	// 일일 확진자
					    		$("#localocccnt").html(appendCommaToNumber(covid19Data.localocccnt));	// 국내 발생
					    		$("#overflowcnt").html(appendCommaToNumber(covid19Data.overflowcnt));	// 해외 유입

					    		var tempDefcnt = covid19Data.defcnt;	// 확진환자
					    		var tempIncDefcnt = covid19Data.inc_defcnt;	// 확진환자-증감률
					    		var tempIsolclearcnt = covid19Data.isolclearcnt;	// 완치
					    		var tempIncIsolclearcnt = covid19Data.inc_isolclearcnt;	// 완치-증감률
					    		var tempIsolingcnt = covid19Data.isolingcnt;	// 치료중
					    		var tempIncIsolingcnt = covid19Data.inc_isolingcnt;	// 치료중-증감률
					    		var tempDeathcnt = covid19Data.deathcnt;	// 사망
					    		var tempIncDeathcnt = covid19Data.inc_deathcnt;	// 사망-증감률

					    		// 확진환자
					    		$("#defcnt").empty();
					    		var defcntHtml = "";
					    		defcntHtml += "<h4 class='CColor_txt00'>"+appendCommaToNumber(tempDefcnt)+"</h4>";
					    		if(tempIncDefcnt > 0){
					    			defcntHtml += "<spand class='td_up'>"+appendCommaToNumber(tempIncDefcnt)+" ▲</h4>";
					    		} else if(tempIncDefcnt < 0){
					    			defcntHtml += "<spand class='td_down'>"+appendCommaToNumber(tempIncDefcnt)+" ▼</h4>";
					    		} else {
					    			defcntHtml += "<spand class='td_equals'> - </h4>";
					    		}
					    		$("#defcnt").append(defcntHtml);

					    		// 완치
					    		$("#isolclearcnt").empty();
					    		var isolclearcntHtml = "";
					    		isolclearcntHtml += "<h4 class='CColor_txt01'>"+appendCommaToNumber(tempIsolclearcnt)+"</h4>";
					    		if(tempIncIsolclearcnt > 0){
					    			isolclearcntHtml += "<spand class='td_up'>"+appendCommaToNumber(tempIncIsolclearcnt)+" ▲</h4>";
					    		} else if(tempIncIsolclearcnt < 0){
					    			isolclearcntHtml += "<spand class='td_down'>"+appendCommaToNumber(tempIncIsolclearcnt)+" ▼</h4>";
					    		} else {
					    			isolclearcntHtml += "<spand class='td_equals'> - </h4>";
					    		}
					    		$("#isolclearcnt").append(isolclearcntHtml);

					    		// 치료중
					    		$("#isolingcnt").empty();
					    		var isolingcntHtml = "";
					    		isolingcntHtml += "<h4 class='CColor_txt02'>"+appendCommaToNumber(tempIsolingcnt)+"</h4>";
					    		if(tempIncIsolingcnt > 0){
					    			isolingcntHtml += "<spand class='td_up'>"+appendCommaToNumber(tempIncIsolingcnt)+" ▲</h4>";
					    		} else if(tempIncIsolingcnt < 0){
					    			isolingcntHtml += "<spand class='td_down'>"+appendCommaToNumber(tempIncIsolingcnt)+" ▼</h4>";
					    		} else {
					    			isolingcntHtml += "<spand class='td_equals'> - </h4>";
					    		}
					    		$("#isolingcnt").append(isolingcntHtml);

					    		// 사망
					    		$("#deathcnt").empty();
					    		var deathcntHtml = "";
					    		deathcntHtml += "<h4 class='CColor_txt03'>"+appendCommaToNumber(tempDeathcnt)+"</h4>";
					    		if(tempIncDeathcnt > 0){
					    			deathcntHtml += "<spand class='td_up'>"+appendCommaToNumber(tempIncDeathcnt)+" ▲</h4>";
					    		} else if(tempIncDeathcnt < 0){
					    			deathcntHtml += "<spand class='td_down'>"+appendCommaToNumber(tempIncDeathcnt)+" ▼</h4>";
					    		} else {
					    			deathcntHtml += "<spand class='td_equals'> - </h4>";
					    		}
					    		$("#deathcnt").append(deathcntHtml);

					    		$("#common_popup_back").parent().show();
					    		$("#coronaStatsPop").show();
				    		}
				    	} else {
							common_alert('failed!');
						}
					} ,
					error:function(err) {
						common_alert(err.responseText);
					}
				});
				common_loading(false); // 로딩바
			} */
			/** 2020.09.15[한광희] 코로나19 추가 END */
			/** 2020.09.17[곽제욱] 코로나19 관련 분리 END */
			// 현재위치
			//$('#myMapLocation').trigger("click");	// 2020.09.10[한광희] 호출 필요 없어 주석처리

		},

		getThematicInfo: function () {
			return thematicInfo;
		},

		/*
		 * 설명 팝업
		 */
		listHelpClickEvent : function (themaExp, popTitle3) {
			$("#thematicMap_moreInfo .popHeadTitle").html(popTitle3);
			$('#thematicMap_moreInfo .popContent p').empty().html(themaExp);
			$('#thematicMap_moreInfo').show();
			$(".aside_back").parent().show();	// 팝업 배경 표출

		},

		/**
		 * @name         : setPositionText
		 * @description  : 위치 텍스트 변경
		 * @date         : 2019.08.22
		 * @author	     : 김남민
		 * @history 	 :
		 * @param        :
		 */
		setPositionText : function() {
			//변수 선언
			var lv_adm_nm = "전국";
			var lv_sido = $("#statsMePopupArea_sido");
			var lv_sido_cd = $("#statsMePopupArea_sido").val();
			var lv_sido_nm = $("#statsMePopupArea_sido option:selected").text();
			var lv_sgg = $("#statsMePopupArea_sgg");
			var lv_sgg_cd = $("#statsMePopupArea_sgg").val();
			var lv_sgg_nm = $("#statsMePopupArea_sgg option:selected").text();
			var lv_emdong = $("#statsMePopupArea_emdong");
			var lv_emdong_cd = $("#statsMePopupArea_emdong").val();
			var lv_emdong_nm = $("#statsMePopupArea_emdong option:selected").text();

			//데이터 정리
			lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm + " " + lv_emdong_nm;
			if(lv_sido_cd == "99") lv_adm_nm = lv_sido_nm;
			else if(lv_sgg_cd == "999") lv_adm_nm = lv_sido_nm;
			else if(lv_emdong_cd == "99") lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm;

			// 지도 화면에 현재접속지역 셋팅
			if($thematic.ui.mapRegion == "sido") {
				$("#statsMeMapMapArea").text("전국");
			}
			else {
				$("#statsMeMapMapArea").text(lv_adm_nm);
			}
		}

		/** 2020.09.09[한광희] 통계주제도 화면 수정 START */
		/**
		 * @name : thematicListPopupToggle
		 * @description : 통계주제도 목록 팝업 토글
		 * @date : 2020.09.08
		 * @author : 한광희
		 * @history :
		 * @param :
		 * 		p_flag : true/false => 표시/감춤
		 */
		, thematicListPopupToggle : function(p_flag){
			//표시
			if(p_flag == true) {
				$("#thematicListDiv").css("top",$(window).outerHeight(true)+"px");
				$("#thematicListDiv").animate({
					top : 100
				},400,function(){
					$("#thematicCatalogBtn").prop("style","position: relative;"); /*2020.09.09[신예리] 버튼 상단에 배치되도록 css 추가*/
					$("#thematicListDiv").show();
					// 해당 지표로 스크롤 이동

					/** 2020.09.15[한광희] 스크립트 오류 수정 START */
					if($(".gridheader_conThematic").hasClass("on")){
						$("#list_div").stop().animate({
							scrollTop: $("#list_div").find("li.on").offset().top-$("#list_div").find("ul").offset().top
						}, 801);
					}
					/** 2020.09.15[한광희] 스크립트 오류 수정 END */
				});
			}
			//감춤
			else {
				$("#thematicListDiv").animate({
					top : $(window).outerHeight(true)
				},200,function(){
					$("#thematicCatalogBtn").prop("style","position:absolute; bottom: 0;"); /*2020.09.09[신예리] 버튼 하단에 배치되도록 css 추가*/
					$("#thematicListDiv").hide();
				});
			}
		}
		/** 2020.09.09[한광희] 통계주제도 화면 수정 END */

		/** 2020.09.10[한광희] 통계주제도 관심지역 이동 설정 START */
		/**
		 * @name : thematicIntrstAreaMoveSetting
		 * @description : 통계주제도 관심지역 이동 설정
		 * @date : 2020.09.10
		 * @author : 한광희
		 * @history :
		 * @param :
		 */
		, thematicIntrstAreaMoveSetting : function(){
			var zoomLevel = 1;	// 2020.09.15[한광희] 줌레벨 수정
			var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>'; // 2022.09.22[송은미] svg 추가
			// 시도데이터, 시군구데이터, 읍면동데이터 확인후
			if($thematic.ui.my_sido_cd != "99" && $thematic.ui.my_sido_cd != "00") {	// 2020.09.15[한광희] 시도코드 조건 추가
				zoomLevel = 4;
			}
			if($thematic.ui.my_sgg_cd != "999") {
				zoomLevel = 6;
			}
			if($thematic.ui.my_emdong_cd != "00"){
				zoomLevel = 9;
			}

			/** 2020.09.15[한광희] 전국데이터 조회 수정 START */
			if($thematic.ui.my_sido_cd == "00"){
				if($('#singleMap').is(':visible')){
					$singleMap.ui.setCurLocation($thematic.ui.my_sido_cd, "", "");
					$singleMap.ui.map.curPolygonCode = '1';
				}
				else{
					$partitionMap.ui.setCurLocation($thematic.ui.my_sido_cd, "", "");
					$partitionMap.ui.leftmap.curPolygonCode = '1';
					$partitionMap.ui.rightmap.curPolygonCode = '1';
				}
			} else if($thematic.ui.my_sido_cd != "00" && $thematic.ui.my_sgg_cd == "999"){
				if($('#singleMap').is(':visible')){
					$singleMap.ui.setCurLocation($thematic.ui.my_sido_cd, "", "");
					$singleMap.ui.map.curPolygonCode = '2';
				}
				else{
					$partitionMap.ui.setCurLocation($thematic.ui.my_sido_cd, "", "");
					$partitionMap.ui.leftmap.curPolygonCode = '2';
					$partitionMap.ui.rightmap.curPolygonCode = '2';
				}
			}
			else if($thematic.ui.my_sido_cd != "00" && $thematic.ui.my_sgg_cd != "999"){
				if($('#singleMap').is(':visible')){
					$singleMap.ui.setCurLocation($thematic.ui.my_sido_cd, $thematic.ui.my_sgg_cd, "");
					$singleMap.ui.map.curPolygonCode = '3';
				}
				else{
					$partitionMap.ui.setCurLocation($thematic.ui.my_sido_cd, $thematic.ui.my_sgg_cd, "");
					$partitionMap.ui.leftmap.curPolygonCode = '2';
					$partitionMap.ui.rightmap.curPolygonCode = '2';
				}
			}
			else if($thematic.ui.my_sido_cd != "00" && $thematic.ui.my_sgg_cd != "999" && $thematic.ui.my_emdong_cd != "00"){
				$singleMap.ui.setCurLocation($thematic.ui.my_sido_cd, $thematic.ui.my_sgg_cd, $thematic.ui.my_emdong_cd);

				if(!$('#singleMap').is(':visible')){
					$partitionMap.ui.setCurLocation($thematic.ui.my_sido_cd, $thematic.ui.my_sgg_cd, $thematic.ui.my_emdong_cd);
					$partitionMap.ui.leftmap.curPolygonCode = '3';
					$partitionMap.ui.rightmap.curPolygonCode = '3';
				}
			}
			/** 2020.09.15[한광희] 전국데이터 조회 수정 END */


			if($('#singleMap').is(':visible')){
				$singleMap.ui.map.mapMove([$thematic.ui.my_x, $thematic.ui.my_y], zoomLevel ,false);
			}
			else{
				$partitionMap.ui.leftmap.mapMove([$thematic.ui.my_x, $thematic.ui.my_y], zoomLevel ,false);
				$partitionMap.ui.rightmap.mapMove([$thematic.ui.my_x, $thematic.ui.my_y], zoomLevel ,false);
			}

			//내 위치 텍스트
			/*$("#thematicMapMyLocation_name").text($thematic.ui.my_sido_nm+" "+$thematic.ui.my_sgg_nm+" "+$thematic.ui.my_emdong_nm);*/
			 /*2022-11-02 수정*/
			/*$("#thematicMapMyLocation_name").html($thematic.ui.my_sido_nm+ svg +$thematic.ui.my_sgg_nm+ svg +$thematic.ui.my_emdong_nm);*/
			
			if($thematic.ui.my_sido_cd == "00"){
				$("#thematicMapMyLocation_name").html($thematic.ui.my_sido_nm);
			}else if($thematic.ui.my_sido_cd != "00" && $thematic.ui.my_sgg_cd == "999" && $thematic.ui.my_emdong_cd == "00"){
				$("#thematicMapMyLocation_name").html($thematic.ui.my_sido_nm);
			}else if($thematic.ui.my_sido_cd != "00" && $thematic.ui.my_sgg_cd != "999" && $thematic.ui.my_emdong_cd == "00"){
				$("#thematicMapMyLocation_name").html($thematic.ui.my_sido_nm+ svg +$thematic.ui.my_sgg_nm);
			}else{
				$("#thematicMapMyLocation_name").html($thematic.ui.my_sido_nm+ svg +$thematic.ui.my_sgg_nm+ svg +$thematic.ui.my_emdong_nm);
			};

			// 현재 위치로 이동
			if($('#singleMap').is(':visible')){
				$singleMap.ui.search($singleMap.ui.map);	// 데이터 조회
			}
			else{
				$partitionMap.ui.search($partitionMap.ui.leftmap);
				$partitionMap.ui.search($partitionMap.ui.rightmap);
			}
		}
		/** 2020.09.10[한광희] 통계주제도 관심지역 이동 설정 END */

		// mng_s 2020. 12. 24 j.h.Seok 통계주제도 통합
		/**
		 * @name : changeThemaStats
		 * @description : 통합통계주제도 처리를 위한 함수
		 * @date : 2020. 12. 28
		 * @author : 네이버시스템
		 * @history :
		 * @param : delegate, map
		 */
		, changeThemaStats : function(delegate, map) {
			if(thematicInfo.themaMapType == "13") {
				if(thematicInfo.statThemaMapId == "M5DKMyEHJu20201130172257318wIEwIyKL8x") {
					// 인구 천명당 전체산업 현황
					$("#change_stat_thema_item").append(
						$("<li/>", {"style":"display:block;", "class":"on"}).append(
							$("<a/>",{"href":"#","class":"on", "text":"산업현황"}).click(function(){
								$(this).parent().parent().find("li").removeClass("on");
								$(this).parent().parent().find("a").removeClass("on");
								$(this).parent().addClass("on");
								$(this).addClass("on");

								thematicInfo.themaMapDataId = "kosis_psnby_1000_biz_cnt";
								thematicInfo.leftSepTtipTitle = "인구 천명당 사업체 수";
								thematicInfo.leftSepUnit = "개";

								delegate.changeItem(map);
							})
						),
						$("<li/>", {"style":"display:block;"}).append(
							$("<a/>",{"href":"#", "text":"종사자수"}).click(function(){
								$(this).parent().parent().find("li").removeClass("on");
								$(this).parent().parent().find("a").removeClass("on");
								$(this).parent().addClass("on");
								$(this).addClass("on");

								thematicInfo.themaMapDataId = "kosis_psnby_1000_employee_cnt";
								thematicInfo.leftSepTtipTitle = "인구 천명당 종사자 수";
								thematicInfo.leftSepUnit = "명";
								delegate.changeItem(map);
							})
						)
					);
				}
			} else if(thematicInfo.themaMapType == "15") {
				if(thematicInfo.statThemaMapId == "uDwMJtEFMv202012011643473308MxEquqzIL") {
					// 통근통학 인구변화
					$("#change_stat_thema_item").append(
						$("<li/>", {"style":"display:block;", "class":"on"}).append(
							$("<a/>",{"href":"#","class":"on", "text":"시군구내"}).click(function(){
								$(this).parent().parent().find("li").removeClass("on");
								$(this).parent().parent().find("a").removeClass("on");
								$(this).parent().addClass("on");
								$(this).addClass("on");

								thematicInfo.themaMapDataId = "kosis_samenss_sgg_in_atndf_atndsk_ppltn_cnt_per";

								thematicInfo.leftSepTtipTitle = "인구수";
								thematicInfo.leftSepUnit = "명";

								thematicInfo.rightSepTtipTitle = "인구비율";
								thematicInfo.rightSepUnit = "%";

								delegate.changeItem(map);
							})
						),
						$("<li/>", {"style":"display:block;"}).append(
							$("<a/>",{"href":"#", "text":"타시군구"}).click(function(){
								$(this).parent().parent().find("li").removeClass("on");
								$(this).parent().parent().find("a").removeClass("on");
								$(this).parent().addClass("on");
								$(this).addClass("on");

								thematicInfo.themaMapDataId = "kosis_in_otr_sgg_atndf_atndsk_ppltn_cnt_per";

								thematicInfo.leftSepTtipTitle = "인구수";
								thematicInfo.leftSepUnit = "명";

								thematicInfo.rightSepTtipTitle = "인구비율";
								thematicInfo.rightSepUnit = "%";

								delegate.changeItem(map);
							})
						),
						$("<li/>", {"style":"display:block;"}).append(
							$("<a/>",{"href":"#", "text":"대중교통"}).click(function(){
								$(this).parent().parent().find("li").removeClass("on");
								$(this).parent().parent().find("a").removeClass("on");
								$(this).parent().addClass("on");
								$(this).addClass("on");

								thematicInfo.themaMapDataId = "kosis_tfcmn_atndf_atndsk_ppltn_cnt_per";

								thematicInfo.leftSepTtipTitle = "인구수";
								thematicInfo.leftSepUnit = "명";

								thematicInfo.rightSepTtipTitle = "인구비율";
								thematicInfo.rightSepUnit = "%";

								delegate.changeItem(map);
							})
						)
					);
				} else if(thematicInfo.statThemaMapId == "vtGnsKvxDD20201208103200888xDu9wqLppt") {
					// 노지과수(4종) 재배면적 변화
					$("#change_stat_thema").hide();
					$("#statsType li").remove();
					$("#statsType").css("display", "inline-table");

					$("#statsType").append(
						$("<li/>", {"style":"display:block;", "class":"on"}).append(
							$("<a/>",{"href":"#","class":"on", "text":"사과"}).click(function(){
								$(this).parent().parent().find("li").removeClass("on");
								$(this).parent().parent().find("a").removeClass("on");
								$(this).parent().addClass("on");
								$(this).addClass("on");

								thematicInfo.themaMapDataId = "kosis_apple_pear_ctvt_area";
								$("#statsType").find("a.on").data("id", "left");
								delegate.changeItem(map);
							})
						),
						$("<li/>", {"style":"display:block;"}).append(
							$("<a/>",{"href":"#", "text":"배"}).click(function(){
								$(this).parent().parent().find("li").removeClass("on");
								$(this).parent().parent().find("a").removeClass("on");
								$(this).parent().addClass("on");
								$(this).addClass("on");

								thematicInfo.themaMapDataId = "kosis_apple_pear_ctvt_area";
								$("#statsType").find("a.on").data("id", "right");
								delegate.changeItem(map);
							})
						),
						$("<li/>", {"style":"display:block;"}).append(
							$("<a/>",{"href":"#", "text":"포도"}).click(function(){
								$(this).parent().parent().find("li").removeClass("on");
								$(this).parent().parent().find("a").removeClass("on");
								$(this).parent().addClass("on");
								$(this).addClass("on");

								thematicInfo.themaMapDataId = "kosis_grape_peach_ctvt_area";
								$("#statsType").find("a.on").data("id", "left");
								delegate.changeItem(map);
							})
						),
						$("<li/>", {"style":"display:block;"}).append(
							$("<a/>",{"href":"#", "text":"복숭아"}).click(function(){
								$(this).parent().parent().find("li").removeClass("on");
								$(this).parent().parent().find("a").removeClass("on");
								$(this).parent().addClass("on");
								$(this).addClass("on");

								thematicInfo.themaMapDataId = "kosis_grape_peach_ctvt_area";
								$("#statsType").find("a.on").data("id", "right");
								delegate.changeItem(map);
							})
						)
					);

					thematicInfo.themaMapDataId = "kosis_apple_pear_ctvt_area";
					$("#statsType").find("a.on").data("id", "left");
					delegate.changeItem(map);
				} else if(thematicInfo.statThemaMapId == "DpwHKoIME020201208110725432IJM0KuKKGK") {
					// 노지채소(6종) 재배면적 변화
					$("#change_stat_thema").hide();
					$("#statsType li").remove();
					$("#statsType").css("display", "inline-table");

					$("#statsType").append(
						$("<li/>", {"style":"display:block;", "class":"on"}).append(
							$("<a/>",{"href":"#","class":"on", "text":"고추"}).click(function(){
								$(this).parent().parent().find("li").removeClass("on");
								$(this).parent().parent().find("a").removeClass("on");
								$(this).parent().addClass("on");
								$(this).addClass("on");

								thematicInfo.themaMapDataId = "kosis_redpepper_scallion_ctvt_area";
								$("#statsType").find("a.on").data("id", "left");
								delegate.changeItem(map);
							})
						),
						$("<li/>", {"style":"display:block;"}).append(
							$("<a/>",{"href":"#", "text":"파"}).click(function(){
								$(this).parent().parent().find("li").removeClass("on");
								$(this).parent().parent().find("a").removeClass("on");
								$(this).parent().addClass("on");
								$(this).addClass("on");

								thematicInfo.themaMapDataId = "kosis_redpepper_scallion_ctvt_area";
								$("#statsType").find("a.on").data("id", "right");
								delegate.changeItem(map);
							})
						),
						$("<li/>", {"style":"display:block;"}).append(
							$("<a/>",{"href":"#", "text":"마늘"}).click(function(){
								$(this).parent().parent().find("li").removeClass("on");
								$(this).parent().parent().find("a").removeClass("on");
								$(this).parent().addClass("on");
								$(this).addClass("on");

								thematicInfo.themaMapDataId = "kosis_garlic_onion_ctvt_area";
								$("#statsType").find("a.on").data("id", "left");
								delegate.changeItem(map);
							})
						),
						$("<li/>", {"style":"display:block;"}).append(
							$("<a/>",{"href":"#", "text":"양파"}).click(function(){
								$(this).parent().parent().find("li").removeClass("on");
								$(this).parent().parent().find("a").removeClass("on");
								$(this).parent().addClass("on");
								$(this).addClass("on");

								thematicInfo.themaMapDataId = "kosis_garlic_onion_ctvt_area";
								$("#statsType").find("a.on").data("id", "right");
								delegate.changeItem(map);
							})
						),
						$("<li/>", {"style":"display:block;"}).append(
							$("<a/>",{"href":"#", "text":"배추"}).click(function(){
								$(this).parent().parent().find("li").removeClass("on");
								$(this).parent().parent().find("a").removeClass("on");
								$(this).parent().addClass("on");
								$(this).addClass("on");

								thematicInfo.themaMapDataId = "kosis_daikon_cabbage_ctvt_area";
								$("#statsType").find("a.on").data("id", "right");
								delegate.changeItem(map);
							})
						),
						$("<li/>", {"style":"display:block;"}).append(
							$("<a/>",{"href":"#", "text":"무"}).click(function(){
								$(this).parent().parent().find("li").removeClass("on");
								$(this).parent().parent().find("a").removeClass("on");
								$(this).parent().addClass("on");
								$(this).addClass("on");

								thematicInfo.themaMapDataId = "kosis_daikon_cabbage_ctvt_area";
								$("#statsType").find("a.on").data("id", "left");
								delegate.changeItem(map);
							})
						)
					);

					thematicInfo.themaMapDataId = "kosis_redpepper_scallion_ctvt_area";
					$("#statsType").find("a.on").data("id", "left");
					delegate.changeItem(map);
				}
			}else if(thematicInfo.themaMapType == "05" && thematicInfo.statThemaMapId == "8mjCr1kWql20201123140825772vKMjQsNcRw") {

				$("#change_stat_thema_item").append(
					$("<li/>", {"style":"display:block;", "class":"on"}).append(
						$("<a/>",{"href":"#","class":"on", "text":"터미널/주차장"}).click(function(){
							$(this).parent().parent().find("li").removeClass("on");
							$(this).parent().parent().find("a").removeClass("on");
							$(this).parent().addClass("on");
							$(this).addClass("on");

							thematicInfo.themaMapDataId = "kosis_trmnl_bcycl_cnt_per";
							delegate.changeItem(map);
						})
					),
					$("<li/>", {"style":"display:block;"}).append(
						$("<a/>",{"href":"#", "text":"보유자전거"}).click(function(){
							$(this).parent().parent().find("li").removeClass("on");
							$(this).parent().parent().find("a").removeClass("on");
							$(this).parent().addClass("on");
							$(this).addClass("on");

							thematicInfo.themaMapDataId = "kosis_hold_bcycl_cnt_per";
							delegate.changeItem(map);
						})
					),
					$("<li/>", {"style":"display:block;"}).append(
						$("<a/>",{"href":"#", "text":"대여실적"}).click(function(){
							$(this).parent().parent().find("li").removeClass("on");
							$(this).parent().parent().find("a").removeClass("on");
							$(this).parent().addClass("on");
							$(this).addClass("on");

							thematicInfo.themaMapDataId = "kosis_lend_acmslt_cnt_per";
							delegate.changeItem(map);
						})
					)
				);
				thematicInfo.themaMapDataId = "kosis_trmnl_bcycl_cnt_per";
				delegate.changeItem(map);
			}else if(thematicInfo.themaMapType == "05" && thematicInfo.statThemaMapId == "uHaX8JJqyh20201014110114231lgMgsJnINP") {
				$("#change_stat_thema_item").append(
						$("<li/>", {"style":"display:block;", "class":"on"}).append(
								$("<a/>",{"id":"cancer0","href":"#","class":"on", "text":"전체암"}).click(function(){
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									thematicInfo.themaMapDataId = "cancer_data";
									delegate.changeItem(map);
								})
						),
						$("<li/>", {"style":"display:block;"}).append(
								$("<a/>",{"id":"cancer1","href":"#", "text":"폐암"}).click(function(){
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									thematicInfo.themaMapDataId = "cancer_data";
									delegate.changeItem(map);
								})
						),
						$("<li/>", {"style":"display:block;"}).append(
								$("<a/>",{"id":"cancer2","href":"#", "text":"위암"}).click(function(){
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									thematicInfo.themaMapDataId = "cancer_data";
									delegate.changeItem(map);
								})
						),
						$("<li/>", {"style":"display:block;"}).append(
								$("<a/>",{"id":"cancer3","href":"#", "text":"간암"}).click(function(){
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									thematicInfo.themaMapDataId = "cancer_data";
									delegate.changeItem(map);
								})
						),
						$("<li/>", {"style":"display:block;"}).append(
								$("<a/>",{"id":"cancer4","href":"#", "text":"대장암"}).click(function(){
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									thematicInfo.themaMapDataId = "cancer_data";
									delegate.changeItem(map);
								})
						),
						$("<li/>", {"style":"display:block;"}).append(
								$("<a/>",{"id":"cancer5","href":"#", "text":"유방암"}).click(function(){
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									thematicInfo.themaMapDataId = "cancer_data";
									delegate.changeItem(map);
								})
						)
				);
//				thematicInfo.themaMapDataId = "cancer_data";
//				delegate.changeItem(map);
			}else if(thematicInfo.themaMapType == "05" && thematicInfo.statThemaMapId == "MmLSKu8PgQ20201022173339083sOVy6YCGQj") {
					$("#change_stat_thema_item").append(
						$("<li/>", {"style":"display:block;", "class":"on"}).append(
								$("<a/>",{"id":"infection1","href":"#","class":"on", "text":"제1군"}).click(function(){
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									thematicInfo.themaMapDataId = "infection_data";
									delegate.changeItem(map);
								})
						),
						$("<li/>", {"style":"display:block;"}).append(
								$("<a/>",{"id":"infection2","href":"#", "text":"제2군"}).click(function(){
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									thematicInfo.themaMapDataId = "infection_data";
									delegate.changeItem(map);
								})
						),
						$("<li/>", {"style":"display:block;"}).append(
								$("<a/>",{"id":"infection3","href":"#", "text":"제3군"}).click(function(){
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									thematicInfo.themaMapDataId = "infection_data";
									delegate.changeItem(map);
								})
						),
						$("<li/>", {"style":"display:block;"}).append(
								$("<a/>",{"id":"infection4","href":"#", "text":"제4군"}).click(function(){
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									thematicInfo.themaMapDataId = "infection_data";
									delegate.changeItem(map);
								})
						)
					);
//				thematicInfo.themaMapDataId = "infection_data";
//				delegate.changeItem(map);
				}else if(thematicInfo.themaMapType == "05" && thematicInfo.statThemaMapId == "RZ3pr7Maou20201106160851389D0RGtYCGpW") {
					$("#change_stat_thema_item li").remove();
					if($("#statsType li:eq(0)").hasClass("on")){
						$("#change_stat_thema_item").append(
							$("<li/>", {"style":"display:block;", "class":"on"}).append(
									$("<a/>",{"id":"weather1","href":"#","class":"on", "text":"평균"}).click(function(){
										$(this).parent().parent().find("li").removeClass("on");
										$(this).parent().parent().find("a").removeClass("on");
										$(this).parent().addClass("on");
										$(this).addClass("on");

										thematicInfo.themaMapDataId = "weather_data";
										delegate.changeItem(map);
									})
							),
							$("<li/>", {"style":"display:block;"}).append(
									$("<a/>",{"id":"weather2","href":"#", "text":"최고"}).click(function(){
										$(this).parent().parent().find("li").removeClass("on");
										$(this).parent().parent().find("a").removeClass("on");
										$(this).parent().addClass("on");
										$(this).addClass("on");

										thematicInfo.themaMapDataId = "weather_data";
										delegate.changeItem(map);
									})
							),
							$("<li/>", {"style":"display:block;"}).append(
									$("<a/>",{"id":"weather3","href":"#", "text":"최저"}).click(function(){
										$(this).parent().parent().find("li").removeClass("on");
										$(this).parent().parent().find("a").removeClass("on");
										$(this).parent().addClass("on");
										$(this).addClass("on");

										thematicInfo.themaMapDataId = "weather_data";
										delegate.changeItem(map);
									})
							)
						);
					}else{
						$("#change_stat_thema_item").append(
							$("<li/>", {"style":"display:block;", "class":"on"}).append(
									$("<a/>",{"id":"weather4","href":"#","class":"on", "text":"합계 강수"}).click(function(){
										$(this).parent().parent().find("li").removeClass("on");
										$(this).parent().parent().find("a").removeClass("on");
										$(this).parent().addClass("on");
										$(this).addClass("on");

										thematicInfo.themaMapDataId = "weather_data";
										delegate.changeItem(map);
									})
							),
							$("<li/>", {"style":"display:block;"}).append(
									$("<a/>",{"id":"weather5","href":"#", "text":"일일 최대"}).click(function(){
										$(this).parent().parent().find("li").removeClass("on");
										$(this).parent().parent().find("a").removeClass("on");
										$(this).parent().addClass("on");
										$(this).addClass("on");

										thematicInfo.themaMapDataId = "weather_data";
										delegate.changeItem(map);
									})
							)
						);
					}
//				thematicInfo.themaMapDataId = "weather_data";
//				delegate.changeItem(map);
			}else if(thematicInfo.themaMapType == "05" && thematicInfo.statThemaMapId == "wPsSdFX8Wt20210520161423833UZjHClj5U3") {
				$("#change_stat_thema_item").append(
						$("<li/>", {"style":"display:block;", "class":"on"}).append(
								$("<a/>",{"id":"caracc0","href":"#","class":"on", "text":"전체 사고"}).click(function(){
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									thematicInfo.themaMapDataId = "car_accident_data";
									delegate.changeItem(map);
								})
						),
						$("<li/>", {"style":"display:block;"}).append(
								$("<a/>",{"id":"caracc1","href":"#", "text":"사망 사고"}).click(function(){
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									thematicInfo.themaMapDataId = "car_accident_data";
									delegate.changeItem(map);
								})
						),
						$("<li/>", {"style":"display:block;"}).append(
								$("<a/>",{"id":"caracc2","href":"#", "text":"중상 사고"}).click(function(){
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									thematicInfo.themaMapDataId = "car_accident_data";
									delegate.changeItem(map);
								})
						),
						$("<li/>", {"style":"display:block;"}).append(
								$("<a/>",{"id":"caracc3","href":"#", "text":"경상 사고"}).click(function(){
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									thematicInfo.themaMapDataId = "car_accident_data";
									delegate.changeItem(map);
								})
						),
						$("<li/>", {"style":"display:block;"}).append(
								$("<a/>",{"id":"caracc4","href":"#", "text":"부상 신고"}).click(function(){
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									thematicInfo.themaMapDataId = "car_accident_data";
									delegate.changeItem(map);
								})
						)
					);
//					thematicInfo.themaMapDataId = "car_accident_data";
//					delegate.changeItem(map);
				}else if(thematicInfo.themaMapType == "05" && thematicInfo.statThemaMapId == "sAXkcVzk5V202007141335257355ued9032uw") {
					$("#change_covid_thema_item").append(
						$("<li/>", {"style":"display:block;", "class":"on"}).append(
								$("<a/>",{"id":"covidThema1","href":"#","class":"on", "text":"발생 현황"}).click(function(){
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									thematicInfo.themaMapDataId = "COVID19";
									delegate.changeItem(map);
								})
						),
						$("<li/>", {"style":"display:block;"}).append(
								$("<a/>",{"id":"covidThema2","href":"#", "text":"예방접종 현황"}).click(function(){
									$(this).parent().parent().find("li").removeClass("on");
									$(this).parent().parent().find("a").removeClass("on");
									$(this).parent().addClass("on");
									$(this).addClass("on");

									thematicInfo.themaMapDataId = "covid_vacc_data";
									delegate.changeItem(map);
								})
						)
					);
					thematicInfo.themaMapDataId = "COVID19";
					delegate.changeItem(map);
				}
		}
		// mng_e 2020. 12. 24 j.h.Seok 통계주제도 통합
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

		    $('body').on('click','.popup_tab li',function(){
		    	$(".popup_tab li").removeClass("on");
		    	$(this).addClass("on");
		        if($(".con1").hasClass("on")){
		        	$("#today,#popTitle1").show();
		        	$("#today2,#popTitle2").hide();
		        	$("#covidConBox2").hide();
		        	$("#covidConBox1").show();
		        	$(".con1").addClass("on");
		        }else if($(".con2").hasClass("on")){
		        	$(".con2").addClass("on");
		        	$("#today,#popTitle1").hide();
		        	$("#today2,#popTitle2").show();
		        	$("#today2,#num1,#num2,#num3,#num4,#num5,#num6,#num7,#num8,#num9").empty();
		        	$("#covidConBox1").hide();
		        	$("#covidConBox2").css("display","flex");
		        	$thematic.ui.coronaPopup2();
		        }
		      });

/*			$("#thematicCatalogBtn").swipe({
	            threshold : 10,
	            //펼치기
	            swipeUp:function(event, direction) {
		            *//** 2020.09.09[한광희] 통계주제도 화면 수정 START *//*
	               //$("#result_list").animate({height: 280},300);
	            	$thematic.ui.thematicListPopupToggle(true);
	            	*//** 2020.09.09[한광희] 통계주제도 화면 수정 END *//*
	            },
	            //접기
	            swipeDown:function(event, direction) {
	            	*//** 2020.09.09[한광희] 통계주제도 화면 수정 START *//*
	               //$("#result_list").animate({height: 0},300);
	            	$thematic.ui.thematicListPopupToggle(false);
	            	*//** 2020.09.09[한광희] 통계주제도 화면 수정 END *//*
	            },
	            //클릭
	            tap:function(event, target) {
	            	*//** 2020.09.09[한광희] 통계주제도 화면 수정 START *//*
	            	if($("#thematicListDiv").css("display") == "block"){
		            	$thematic.ui.thematicListPopupToggle(false);
		                $(".swiperBtn").removeClass("close"); // 버튼 화살표 변경되도록 class 추가
		            } else {
		                $thematic.ui.thematicListPopupToggle(true);
		                $(".swiperBtn").addClass("close"); // 버튼 화살표 변경되도록 class 추가removeClass
		            }
	               *//** 2020.09.09[한광희] 통계주제도 화면 수정 END *//*
	            }
	         });*/

			$("#themeSearchBtn").click(function () {
				srvLogWrite('O0', '08', '04', '00', $("#thematicCatalogKwrd").val(), '');
				$thematic.ui.statsThemeMapListData('');
			});
			
			//[2022.10.24] 검색 엔터 이벤트 추가
			$("body").on("keydown", ".search-result", function(key){
				if(key.keyCode == 13) { //키의 코드가 13번일 경우 실행 (13번은 엔터키)
					srvLogWrite('O0', '08', '04', '00', $("#thematicCatalogKwrd").val(), '');
					$thematic.ui.statsThemeMapListData('');
				}
			});

			// 도움말 팝업 닫기/확인 버튼 클릭
			$('.btn_popClose, .btn_popType3').click(function(){
				$(".aside_back").parent().hide();	// 팝업 배경 숨김
				$('#thematicMap_moreInfo').hide();
			});


			/**
			 *
			 * @name         : showNumberClick
			 * @description  : 통계값 표출유무 버튼 클릭 시
			 * @date         : 2020.07.10
			 * @author	     : 주형식
			 * @history 	 :
			 */
			$("#showNumberBtn").click(function(){
				//통계표출 on일 경우 off로 변경
				/** 2020.09.09[한광희] 통계표출 수정 START */
				if($("#singleMap").css("display") == "block"){
					if($singleMap.ui.map.showCaption) {
						$('.databtn01').removeClass("on");
						srvLogWrite('O0', '51', '04', '00', 'OFF', '');
						if($('#singleMap').is(':visible')){
							$singleMap.ui.map.removeCaption();
						}
					} else {	//통계표출 off일 경우 on으로 변경
						$(".databtn01").addClass("on");
						srvLogWrite('O0', '51', '04', '00', 'ON', '');
						if($('#singleMap').is(':visible')){
							$singleMap.ui.map.setCaption();
						}
					}
				} else {
					// 파티션맵
					if($partitionMap.ui.leftmap.showCaption) {
						$('.databtn01').removeClass("on");
						srvLogWrite('O0', '51', '04', '00', 'OFF', '');
						$partitionMap.ui.leftmap.removeCaption();
						$partitionMap.ui.rightmap.removeCaption();
					}
					else{
						$(".databtn01").addClass("on");
						srvLogWrite('O0', '51', '04', '00', 'ON', '');
						$partitionMap.ui.leftmap.setCaption();
						$partitionMap.ui.rightmap.setCaption();
					}
				}
				/** 2020.09.09[한광희] 통계표출 수정 END */
			});


			/**
			 *
			 * @name         : btnrvTotletop
			 * @description  : 범례 버튼 클릭 시
			 * @date         : 2020.07.28
			 * @author	     : 주형식
			 * @history 	 :
			 */
			$("#btnrvTotletop").click(function(){
				srvLogWrite('O0', '51', '05', '01', '', '');
				if($(".databtn02").hasClass("on")){
					$('.databtn02').removeClass("on");
					// 범례
					$('.tooltipbox').css('visibility', 'hidden');
				}
				else{
					$('.databtn02').addClass("on");
					// 범례
					$('.tooltipbox').css('visibility', 'visible');
				}
			});
			
			
			
			// 범례 버튼 클릭
			$("body").on("click", "#legendInfoBtn", function(){
				srvLogWrite('O0', '51', '05', '01', '', '');
				if ($('.tooltipbox').css('visibility') == 'hidden'){
					$(this).addClass("on");
					$('.tooltipbox').css('visibility', 'visible');
				} else {
					$(this).removeClass("on");
					$('.tooltipbox').css('visibility', 'hidden');
				}
			});
			

			/**
			 *
			 * @name         : reverseBtn
			 * @description  : reverseBtn 버튼 클릭 시
			 * @date         : 2020.07.28
			 * @author	     : 주형식
			 * @history 	 :
			 */
			$("#reverseBtn").click(function(){
				$singleMap.ui.map.legend.reverseColor();
			});


			// 관심지역 설정 클릭 이벤트
			$(".selectArea").click(function(){
				common_area(
						"emdong",	// 관심지역 표출 범위
						$thematic.ui.my_sido_cd,
						$thematic.ui.my_sgg_cd,
						$thematic.ui.my_emdong_cd,
						// 변경
						function(x_coor, y_coor, sido_cd, sido_nm, sgg_cd, sgg_nm, emdong_cd, emdong_nm) {

							//변수 입력
							$thematic.ui.my_x = x_coor;
							$thematic.ui.my_y = y_coor;
							$thematic.ui.my_sido_cd = sido_cd;
							$thematic.ui.my_sido_nm = sido_nm;
							$thematic.ui.my_sgg_cd = sgg_cd;
							$thematic.ui.my_sgg_nm = sgg_nm;
							$thematic.ui.my_emdong_cd = emdong_cd;
							$thematic.ui.my_emdong_nm = emdong_nm;

							$thematic.ui.thematicIntrstAreaMoveSetting();	// 2020.09.10[한광희] 기존 소스 함수로 변경

							// 2022.09.22[송은미] svg 추가
							 /*2022-11-02 수정*/
							var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';
							/*$("#thematicMapMyLocation_name").html($thematic.ui.my_sido_nm+ svg +$thematic.ui.my_sgg_nm+ svg +$thematic.ui.my_emdong_nm);*/
							
							if($thematic.ui.my_sido_cd == "00"){
								$("#thematicMapMyLocation_name").html($thematic.ui.my_sido_nm);
							}else if($thematic.ui.my_sido_cd != "00" && $thematic.ui.my_sgg_cd == "999" && $thematic.ui.my_emdong_cd == "00"){
								$("#thematicMapMyLocation_name").html($thematic.ui.my_sido_nm);
							}else if($thematic.ui.my_sido_cd != "00" && $thematic.ui.my_sgg_cd != "999" && $thematic.ui.my_emdong_cd == "00"){
								$("#thematicMapMyLocation_name").html($thematic.ui.my_sido_nm+ svg +$thematic.ui.my_sgg_nm);
							}else{
								$("#thematicMapMyLocation_name").html($thematic.ui.my_sido_nm+ svg +$thematic.ui.my_sgg_nm+ svg +$thematic.ui.my_emdong_nm);
							};
							
						},
						// 취소
						function() {
						}
						);
				
			});


			//현재위치로 이동 버튼
			$(document).on("click", "#myMapLocation", function() {
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 START */
				var map;
				if($('#singleMap').is(':visible')){
					map = $singleMap.ui.map;
				}
				else{
					map = $partitionMap.ui.leftmap;
				}
				//위치동의 팝업 호출
				common_localtion(
					//지도변수
					map,
					//위치 동의함
					function(my_x, my_y, my_sido_cd, my_sido_nm, my_sgg_cd, my_sgg_nm, my_emdong_cd, my_emdong_nm) {
						//변수 입력
						$thematic.ui.my_x = my_x;
						$thematic.ui.my_y = my_y;
						$thematic.ui.my_sido_cd = my_sido_cd;
						$thematic.ui.my_sido_nm = my_sido_nm;
						$thematic.ui.my_sgg_cd = my_sgg_cd;
						$thematic.ui.my_sgg_nm = my_sgg_nm;
						$thematic.ui.my_emdong_cd = my_emdong_cd;
						$thematic.ui.my_emdong_nm = my_emdong_nm;
						$thematic.ui.my_adm_cd = my_sido_cd+my_sgg_cd+my_emdong_cd;

						$thematic.ui.thematicIntrstAreaMoveSetting();

						// 2022.09.22[송은미] svg 추가
						var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';
						$("#thematicMapMyLocation_name").html($thematic.ui.my_sido_nm+ svg +$thematic.ui.my_sgg_nm+ svg +$thematic.ui.my_emdong_nm);
					},
					//위치 미동의함
					function() {
					}
				);
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 END */
			});


			// 임시 년도 및 통계 선택 클릭 이벤트
			$("#yearStatSelectInfoBtn").click(function(){
				if($('#yearStatSelectInfo').is(':visible')){
					$('#yearStatSelectInfo').hide();
					$("#yearStatSelectInfoBtn").removeClass("on");
				}
				else{
					$('#yearStatSelectInfo').show();
					$("#yearStatSelectInfoBtn").addClass("on");
				}

			});

			// 주제별 정렬 변경에 따른 이벤트
			$("body").on("change", "#selectThematicCatalogSorting", function(){
				if($("#selectThematicCatalogSorting option:selected").val() == "favorite"){
					srvLogWrite('O0', '08', '06', '00', '인기순', '');
				}else if($("#selectThematicCatalogSorting option:selected").val() == "alphabet"){
					srvLogWrite('O0', '08', '06', '00', '가나다순', '');
				}
				$thematic.ui.statsThemeMapListData('');

				// 검색된 리스트에서 첫번재 항목 검색
				if($('.gridheader_conThematic').length != 0){
					$('.gridheader_conThematic').eq(0).find(".gridrow_left").find(".List").get(0).click();
					/** 2020.08.31[한광희] 목록 스크롤 이동 추가 START */
					// 해당 지표로 스크롤 이동
					$("#list_div").stop().animate({
						scrollTop: $("#list_div").find("li.on").offset().top-$("#list_div").find("ul").offset().top
					}, 801);
					/** 2020.08.31[한광희] 목록 스크롤 이동 추가 END */
				}
			});

			// 선택된 목록 표시
			$("body").on("click", ".gridheader_conThematic", function(){
				srvLogWrite('O0', '08', '05', '00', $(this).find('.List').text(), $(this).attr('id'));
				$(".gridheader_conThematic").removeClass("on");
				$(this).addClass("on");
				//2022-10-13 [송은미] 이벤트 추가
				$(".leftCol .maptit04").removeClass("active");
			});

			//생활환경 정보 이미지 클릭
			$(document).on("click", "#lifeEnvironmentToggle", function() {
				srvLogWrite('O0', '51', '02', '01', '', '');
				var lvThis = $(this);
				// 표시
				if(lvThis.hasClass("infoOff")) {
					lifeEnvironmentToggle(true, $thematic.ui.my_sido_cd, $thematic.ui.my_sgg_cd, $thematic.ui.my_emdong_cd);
				}
				// 감춤
				else {
					lifeEnvironmentToggle(false);
				}
			});

			//생활환경 정보 상세보기
			$(document).on("click", "#lifeEnvironmentPopup_open", function() {
				srvLogWrite('O0', '51', '02', '02', '', '');
				var lvThis = $(this);
				var lvSidoCd = lvThis.attr("sido_cd");
				var lvSggCd = lvThis.attr("sgg_cd");
				var lvEmdongCd = lvThis.attr("emdong_cd");
				if(lvSidoCd == "null") lvSidoCd = "";
				if(lvSggCd == "null") lvSggCd = "";
				if(lvEmdongCd == "null") lvEmdongCd = "";
				if(lvSidoCd != undefined && lvSidoCd != null && lvSidoCd != "" && lvSidoCd != "99") {
					lifeEnvironmentPopupSelect(lvSidoCd, lvSggCd, lvEmdongCd);
				}
			});

			//생활환경 팝업 닫기
			$(document).on("click", "#lifeEnvironmentPopup_close", function() {
				lifeEnvironmentPopupToggle(false);
			});

			//생활환경 팝업 구분 선택
			$(document).on("click", "#lifeEnvironmentPopup_list > ul > li.infoMenu", function() {
				var lvThis = $(this);
				var lvThisIndex = lvThis.data("index");
				var lvThisText = lvThis.children("a").text();

				//메뉴 선택
				$("#lifeEnvironmentPopup_list > ul > li.infoMenu").removeClass("on");
				lvThis.addClass("on");

				//화면 표시
				$("#lifeEnvironmentPopup div.infoPage").hide();
				$("#lifeEnvironmentPopup_page_"+lvThisIndex).show();
			});

			/** 2020.09.09[한광희] 범례, 통계년도, 통계선택 닫기(X) 버튼 추가 START */
			// 범례 닫기 버튼 이벤트
			$("body").on("click", "#dataRemarks_close", function(){
				$("#btnrvTotletop").removeClass("on");
				$('.tooltipbox').css('visibility', 'hidden');
			});

			// 통계년도, 통계선택 닫기 버튼 이벤트
			$("body").on("click", "#yearStatSelectInfo_close", function(){
				$('#yearStatSelectInfo').hide();
				$("#yearStatSelectInfoBtn").removeClass("on");
			});
			/** 2020.09.09[한광희] 범례, 통계년도, 통계선택 닫기(X) 버튼 추가 END */

			/** 2020.09.15[한광희] 코로나19 추가 START */
			// 코로나19 월 선택
			$("body").on("change", "#base_month", function(){
				var data = {
						stat_data_base_year:$("#base_year option:selected").val(),
						stat_data_base_month:$("#base_month option:selected").val()
					};
				$.ajax({
					type: 'post',
					url: contextPath+"/m2020/thematic/selectCovid19DayData.json",
					data:data,
					dataType: "json",
					async : false,
					success: function(res) {
						if(res.errCd=="0"){
							// 기준일 selectbox 초기화
							$("#base_day").empty();
							var tempListCnt = res.result.dayList.length
							$.each(res.result.dayList,function(cnt,node){
								var selected = tempListCnt==cnt+1;

								$('#base_day').append($("<option/>",{"selected":selected,"value":node,"text":node+"일"}));
							});

							$singleMap.ui.search($singleMap.ui.map);	// 데이터 조회
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
			});

			$("body").on("change", "#base_year2", function(){
				var data = {
						stat_data_base_year:$("#base_year2 option:selected").val(),
				};
				$.ajax({
					type: 'post',
					url: contextPath+"/m2020/thematic/selectCreditCardMonthData.json",
					data:data,
					dataType: "json",
					async : false,
					success: function(res) {
						if(res.errCd=="0"){
							// 기준일 selectbox 초기화
							$("#base_month2").empty();
							var tempListCnt = res.result.monthList.length
							$.each(res.result.monthList,function(cnt,node){
								var selected = tempListCnt==cnt+1;

								$('#base_month2').append($("<option/>",{"selected":selected,"value":node,"text":node+"월"}));
							});

							$singleMap.ui.search($singleMap.ui.map);	// 데이터 조회
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
			});

			// 코로나19 일자 선택
			$("body").on("change", "#base_day", function(){
				$singleMap.ui.search($singleMap.ui.map);	// 데이터 조회
			});

			// 개인카드 사용금액 일자 선택
			$("body").on("change", "#base_month2", function(){
				$singleMap.ui.search($singleMap.ui.map);	// 데이터 조회
			});

			// 코로나19 현황판 닫기 이벤트
			$("body").on("click", "#coronaStatsPop_close", function(){
				$("#common_popup_back").parent().hide();
				$("#coronaStatsPop").hide();
				$thematic.ui.listTitleClickEvent("sAXkcVzk5V202007141335257355ued9032uw") // 2020-09-17 [곽제욱] 코로나 상황판 닫기버튼 클릭시 지표데이터 호출
			});

			// 코로나19 현황판 1일간 열지 않기 클릭
			$("body").on("click", "#coronaStatsPop_check", function(){
				common_set_cookie("lc_info_covide19_yn", "Y", 1); // 쿠키
				$("#common_popup_back").parent().hide();
				$("#coronaStatsPop").hide();
				$thematic.ui.listTitleClickEvent("sAXkcVzk5V202007141335257355ued9032uw") // 2020-09-17 [곽제욱] 코로나 상황판 1일간 보지않기 클릭시 지표데이터 호출
			});
			/** 2020.09.15[한광희] 코로나19 추가 END */

			// 네트워크주제도 기준시간 선택
			$("body").on("change", "#select_dataType_item", function(){
				$singleMap.ui.search($singleMap.ui.map);	// 데이터 조회
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
		},

		getEarthquake : function(){
			$.ajax({
				type: "GET",
				url: sgisContextPath + "/ServiceAPI/thematicMap/getEarthquake.json",
				async : false,
				data : {
					base_year : $("#base_year >option:selected").text()
				},
				success: function(res) {

					for(var i=0; i<$singleMap.ui.map.newMarkers.length; i++){
						$singleMap.ui.map.gMap.removeLayer($singleMap.ui.map.newMarkers[i]);
					}
					$singleMap.ui.map.newMarkers = [];

					for (var i = 0; i < res.result.length; i++) {
						var _markerIcon = sop.icon({
							iconUrl : '/img/marker/redCirlce.png',
							iconSize : [ 10, 10 ],
							zindex : 5
						});

						var _marker = sop.marker([ res.result[i].x_coord, res.result[i].y_coord ], { icon : _markerIcon, zIndexOffset : 999});

//						_marker.bindInfoWindow(res.result[i].x_coord + ", " + res.result[i].y_coord);

						$singleMap.ui.map.newMarkers.push(_marker);
						_marker.addTo($singleMap.ui.map.gMap);

					}
				},
				dataType: "json",
				error:function(e){}
			});
		}
	};



	$thematic.formatter = {
		searchWordValidation : function (text) {
			if (!sop.Util.isUndefined(text) && text.length < 1) {
				$thematic.isSearch = false;
				$thematic.ui.statsThemeMapListData('');
				return false;
			}

			if (sop.Util.isUndefined(text) || !text.length > 0) {
				common_alert('검색어가 입력되지 않습니다.');
				return false;
			}

			if (sop.Util.isUndefined(text) || !text.length > 1) {
				common_alert('최소 2자 이상의 검색어가 필요합니다.');
				return false;
			}

			if (!IsValid("formInput", text)) {
				return false;
			}
			return true;
		}
	};


}(window, document));