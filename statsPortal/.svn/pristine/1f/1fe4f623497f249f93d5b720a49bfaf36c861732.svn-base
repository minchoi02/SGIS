/**
 * 구인 현황 분석 샘플 스크립트
 * 경로 : 일자리 맵 서비스 > 구인 현황 분석 > 
 * 
 * history : 
 *	2018.09.17	ywKim	신규
 *
 * author : ywKim
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$workRoadSelection = W.$workRoadSelection || {};
	
	$workRoadSelection.ui = {	
		toggleDuration : 100,		// 토글 애니메이션 동작 시간
		paramsList : [],
		selectedItem : null,
		showNumber_click : null,
		background_color : "",
		border_color : "",
		
		/**
		 * @name         : 화면 띄우기
		 * @description  : 
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		show : function(pParams) {
			$workRoad.ui.showLayer('#wrmSelection');
			
			//2019-01-15 검색조건 생성시 추가된 항목 바로 검색 처리.
			var $li = null;
			if (typeof pParams != 'undefined') {
				$li = $workRoadSelection.ui.add(pParams);
			}
			
			var $btn = $('#wrmSelection .toggle-btn');
			var ck = $btn.hasClass('on');
			if (!ck) {
				$workRoadSelection.ui.toggle();
			}
			
			if (pParams.showNumber_click != undefined) {
				$workRoadSelection.ui.showNumber_click = pParams.showNumber_click;
			}
			
			//2019-01-15 검색조건 생성시 추가된 항목 바로 검색 처리.
			if ($li != null) {
				var $lvThis = $li.find(".ellipsis");
				$lvThis.trigger("dblclick");
			}
		},
		/**
		 * @name         : 화면 닫기
		 * @description  : 
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		hide : function() {
			$workRoad.ui.hideLayer('#wrmSelection');
		},
		/*
		 * @name         : layout
		 * @description  : 레이어 위치 조정
		 * @date         : 2019.01.09 
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param	pLeft	: 레이어의 좌측 위치
		 * @param	pTop	: 레이어의 상단 위치 (defalt: undefined)
		 */
		layout : function(pLeft, pTop) {
			var $that = $("#wrmSelection");
			
			var style = {};
			style.left = pLeft + "px";
			if (pTop != undefined) {
				style.top = pTop + "px";
			}

			$that.stop().animate(style, 200);
			
			//시각화 위치 조정
			if(pLeft != 0) $("#view1 .sop-left .sop-control").stop().animate({left : "80px"}, 200);
			else $("#view1 .sop-left .sop-control").stop().animate({left : pLeft + "px"}, 200);
		},
		/*
		 * 항목을 추가, 삭제할때 레이어 높이가 자동 증가하는데
		 * 이때 최대 높이가 되면 그 때부터는 스크롤 기능이 적용된다.
		 * 그러기 위해 항목을 추가, 삭제 전에는 article (스크롤적용 태그)의 높이를 무효화시켜야한다. 
		 */
		beforItemChange : function() {
			$('#wrmSelection .cont-box article').css('height', '');
		},
		/*
		 * 항목을 추가, 삭제할때 레이어 높이가 자동 증가하는데
		 * 이때 최대 높이가 되면 그 때부터는 스크롤 기능이 적용된다.
		 * 그러기 위해 항목을 추가, 삭제 전에는 article (스크롤적용 태그)의 높이를 고정시켜야 한다. 
		 */
		afterItemChange : function() {
			var th = $('#wrmSelection').height();
			var num = parseInt(th);
			num -= 70;
			$('#wrmSelection .cont-box article').css('height', num + 'px');
		},
		add : function (pParams) {
			$workRoadSelection.ui.beforItemChange();
			
			$workRoadSelection.ui.paramsList.unshift(pParams);
			
			var $li = $workRoadSelection.ui.createItem(pParams);
			$('.cont-box ul').prepend($li);
			
			$workRoadSelection.ui.afterItemChange();
			
			//2019-01-15 검색조건 생성시 추가된 항목 바로 검색 처리.
			return $li;
		},
		remove : function (pIndex) {
			$workRoadSelection.ui.beforItemChange();
			
			$('.cont-box ul').children('li').eq(pIndex).remove();
			$workRoadSelection.ui.paramsList.slice(pIndex, 1);
			$workRoadSelection.ui.afterItemChange();
		},
		clear : function () {
			$workRoadSelection.ui.paramsList.length = 0;
			$('.cont-box ul').empty();
		},
		createItem : function (pParams) {
			var $li = $('<li/>');
			$li.addClass('dragItem');
			$li.addClass('ui-draggable');
			$li.attr('id', 'dragItem_' + $workRoadSelection.ui.paramsList.length);
			$li.attr('aria-disabled', 'false');
			
			var html = '';
			var tooltip = (typeof pParams.tooltip != 'undefined') ? pParams.tooltip : '';
			var text = (typeof pParams.text != 'undefined') ? pParams.text : '';
//			var id = curSelectedDetailStatsType + '-' + $workRoadSelection.ui.paramsList.length;
			
			html += '<a href="javascript:void(0)" class="ellipsis drag on" title="' + tooltip + '">';
//			html += '<a href="javascript:void(0)" id="API_0301-0" class="ellipsis drag on" title="' + tmpTitle + '">';
			html += '	<span class="text">' + text + '</span>';
//			html += '	<span class="atdrc_yn" style="display:none;">' + atdrc_yn + '</span>';
			html += '</a>';
			
			html += '<a href="javascript:void(0)" class="sqdel">';
			html += '	<img src="/img/um/btn_closel01.png" alt="삭제" class="mCS_img_loaded">';
			html += '</a>';
			
			$li.html(html);
			
			return $li;
		},
		
		
		/**
		 * @name         : 화면 토글 (보이기/숨기기)
		 * @description  : 
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		toggle : function () {
			var $btn = $('#wrmSelection .toggle-btn');
			var ck = $btn.hasClass('on');
			var $this = $('#wrmSelection');
			var $bar = $('#wrmSelection .topbar');
			var $cont = $('#wrmSelection .cont-box');

			var offset = 2;		// 콜백함수 처리에 필요한 변수 / 콜백함수 2개중 하나만 처리되도록
			var callback = function(ck) {
				offset--;
				if (offset == 0) {
					if (ck) {
					} else {
						// 몸체 보이기 스타일
						$cont.removeClass('background');
						$this.css('border', '1px solid #213967');
						$this.removeClass('background');
						
						// 몸체 투명도 복원
						$this.css('background-color', $workRoadSelection.ui.background_color);
						$this.css('border-color', $workRoadSelection.ui.border_color);
					
						// 항목 너비 최대 설정
						$cont.find('ul').css('width', '100%');
					}
				}
			};
			
			if (ck) {
				// 몸체 투명도 백업
				//$workRoadSelection.ui.background_color = $this.css('background-color');
				//$workRoadSelection.ui.border_color = $this.css('border-color');
				
				$btn.removeClass('on');
				
				// 몸체 숨기기 스타일
				$this.css('background', 'transparent');
				$this.css('border', '1px solid transparent');						
				//$cont.css('background', 'white');
				
				// 항목 너비 고정
				$cont.find('ul').css('width', $cont.css('width'));				
				
				// 몸체 숨기기
				$bar.stop().animate({width: '0px'}, $workRoadSelection.ui.toggleDuration, function() { callback(ck); });
				$cont.stop().animate({width: '0px'}, $workRoadSelection.ui.toggleDuration, function() { callback(ck); });
			} else {
				
				$btn.addClass('on');

				// 몸체 보이기
				$bar.stop().animate({width: '100%'}, $workRoadSelection.ui.toggleDuration, function() { callback(ck); });
				$cont.stop().animate({width: '100%'}, $workRoadSelection.ui.toggleDuration, function() { callback(ck); });
			}
		},
	};	
	
	$workRoadSelection.event = {
			/**
			 * @name		 : 이벤트 바인딩 
			 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
			 * @date		 : 2018.09.17
			 * @author		 : ywKim
			 * @history 	 :
			 * 		2018.09.17	ywKim	신규
			 */
			setUIEvent: function() {
				console.log("$workRoadSelection.event.setUIEvent() called.");
				
				// 토글(선택항목) 버튼
				$workRoad.event.set("click", "#wrmSelection .toggle-btn", function() {
					$workRoadSelection.ui.toggle();
				});
				// 통계 표출 버튼 토글
				$workRoad.event.set("click", "#wrmSelection .stats-toggle-btn", function() {
					
					var ck = $(this).hasClass("on");
					if (ck) {
						$(this).removeClass("on");
						$(this).text("off");
					} else {
						$(this).addClass("on");
						$(this).text("on");
					}
					
					if ($workRoadSelection.ui.showNumber_click != null) {
						$workRoadSelection.ui.showNumber_click(!ck);
					}
					
					// 2019.03.13 접근log 생성
					srvLogWrite('D0', '04', '05', '00', '', $(this).text());
				});
				// 항목 더블 클릭
				$workRoad.event.set("dblclick", "#wrmSelection .cont-box .ellipsis", function() {
					// 선택
					if ($workRoadSelection.ui.selectedItem != null) {
						$workRoadSelection.ui.selectedItem.removeClass("M_on");
					}							
					$workRoadSelection.ui.selectedItem = $(this);
					$(this).addClass("M_on");
					
					// 콜백 실행
					var idx = $(this).closest("li").index();
					var item = $workRoadSelection.ui.paramsList[idx];
					
					if (typeof item.item_click != "undefined") {
						item.item_click(item);
					}

					// 2019.03.13 접근log 생성
					var slwDeptCd = ""; 
					var slwParams = "";
					slwParams += 'sido_cd=' + $("#current-sido-select").find("option:selected").val() +',';
					slwParams += 'sgg_cd='  + $("#current-sgg-select").find("option:selected").val();
					srvLogWrite('D0', '04', '02', '01', '', slwParams);
					
					// 2019.03.13 접근log 생성 ::: 지역선택
					slwParams = "";
					$("input[name='rd_unit_type']").each(function() {
						if($(this).prop("checked")) {
							slwParams += $(this).val() + ',';
						}
					});
					if(slwParams != "") {
						slwParams = slwParams.substring(0,slwParams.length-1);
						srvLogWrite('D0', '04', '02', '02', '', slwParams);
					}
					
					// 2019.03.13 접근log 생성 :::  분석대상선택
					slwParams = "";
					$("input[name='INDCLA']").each(function() {
						if($(this).prop("checked")) {
							slwParams += $(this).val() + ',';
						}
					});
					if(slwParams != "") {
						slwParams = slwParams.substring(0,slwParams.length-1);
						srvLogWrite('D0', '04', '02', '03', '', slwParams);						
					}
					
					// 분석조건
					// 2019.03.13 접근log 생성 ::: 업종별 수
					slwParams = "";
					$("input[name='RCRJSS']").each(function() {
						if($(this).prop("checked")) {
							slwParams += $(this).val() + ',';
						}
					});
					if(slwParams != "") {
						slwParams = slwParams.substring(0,slwParams.length-1);
						srvLogWrite('D0', '04', '02', '04', '', slwParams);
					}

					// 2019.03.13 접근log 생성 ::: 기업형태별 수
					slwParams = "";
					$("input[name='ENTTYP']").each(function() {
						if($(this).prop("checked")) {
							slwParams += $(this).val() + ',';
						}
					});
					if(slwParams != "") {
						slwParams = slwParams.substring(0,slwParams.length-1);
						srvLogWrite('D0', '04', '02', '05', '', slwParams);
					}

					// 2019.03.13 접근log 생성 ::: 고용형태별 수
					slwParams = "";
					$("input[name='EMPTYP']").each(function() {
						if($(this).prop("checked")) {
							slwParams += $(this).val() + ',';
						}
					});

					if(slwParams != "") {
						slwParams = slwParams.substring(0,slwParams.length-1);
						srvLogWrite('D0', '04', '02', '06', '', slwParams);
					}

					// 2019.03.13 접근log 생성 ::: 임금수준별 수
					slwDeptCd = "";
					slwParams = ""; 
					$("input[name='WAGETY']").each(function() {
						if($(this).prop("checked")) {
							slwDeptCd += $(this).val();
						}
					});
					switch(slwDeptCd) {
						case "H":
							slwParams += $("#current-salary-select-1").find("option:selected").val();
							break;
						case "D":
							slwParams += $("#current-salary-select-2").find("option:selected").val();
							break;
						case "M":
							slwParams += $("#current-salary-select-3").find("option:selected").val();
							break;
						case "Y":
							slwParams += $("#current-salary-select-4").find("option:selected").val();
							break;
					}

					if(slwParams != "") {
						srvLogWrite('D0', '04', '02', '07', slwDeptCd, slwParams);
					}

					// 2019.03.13 접근log 생성 ::: 요구 학력별 수
					slwParams = ""; 
					$("input[name='ACDMCR']").each(function() {
						if($(this).prop("checked")) {
							slwParams += $(this).val() + ',';
						}
					});

					if(slwParams != "") {
						slwParams = slwParams.substring(0,slwParams.length-1);
						srvLogWrite('D0', '04', '02', '08', '', slwParams);
					}

					// 2019.03.13 접근log 생성 ::: 요구 경력별 수
					slwParams = ""; 
					$("input[name='CAREER']").each(function() {
						if($(this).prop("checked")) {
							slwParams += $(this).val() + ',';
						}
					});
					if(slwParams != "") {
						slwParams = slwParams.substring(0,slwParams.length-1);
						srvLogWrite('D0', '04', '02', '09', '', slwParams);
					}
					
					/* 2019.03.19 기간설정 ::: 요청에 의한 숨김
					slwParams = $("#saSubMenu #current-term-select").val() + "~오늘";
					srvLogWrite('D0', '04', '02', '10', '', slwParams);
					*/
				});
				
				// 항목 삭제
				$workRoad.event.set("click", "#wrmSelection .cont-box .sqdel", function() {
					var $li = $(this).closest("li");
					var idx = $li.index();
					
					$workRoadSelection.ui.remove(idx);
//					$li.remove();
				});
				
//				//통계버튼창 드래그
//				var top = $(".buttonBar").offset().top - 104;
//				$(".buttonBar").draggable({
//					containment : [0, 100, $(".containerBox").width()-100, $(".containerBox").height()-100],
//					start : function(e, ui) {
//						var left = $(".sqListBox.sq03").offset().left;
//						if (!$(".sideQuick.sq03").hasClass("dragStart") && parseInt(left) < 0) {
//							$(".sqListBox.sq03").hide();
//						}
//						$(".sideQuick.sq03").addClass("dragStart");
//						$(".sqListBox.sq03").stop().animate({"left":"0px"},0);
//					}
//				});
//				$(".sqListBox > .sqTabs").dblclick(function() {
//					$(".buttonBar").stop().animate({"left":"0px","top":""+top+""}, 50);
//					if ($(".sideQuick.sq03").hasClass("dragStart")) {
//						$(".sideQuick.sq03").removeClass("dragStart");
//					}
//				});
//
//				
//				//선택항목 클릭 시
//		        $workRoad.event.set("click",".sideQuick.sq03", function(){
//					var isDrag = $(this).hasClass("dragStart");
//					var on = $(this).hasClass("on");
//					if(!on){
//						$(this).addClass("on");
//						if (isDrag) {
//							if ($(this).next(".sqListBox").is(":visible")) {
//								$(".sqListBox.sq03").hide();
//							}else {
//								$(".sqListBox.sq03").show();
//								$("#mCSB_3_container").width("220px");
//								$("#mCSB_4_container").width("220px");
//							}
//						}else {
//							$(".sqListBox.sq03").show();
//							$(this).next(".sqListBox").stop().animate({"left":$saSubMenu.ui.sqlListBoxLeft},200);
//						}
//					}else{
//						$(this).removeClass("on");
//						if (isDrag) {
//							if ($(this).next(".sqListBox").is(":visible")) {
//								$(".sqListBox.sq03").hide();
//							}else {
//								$(".sqListBox.sq03").show();
//								$("#mCSB_3_container").width("220px");
//								$("#mCSB_4_container").width("220px");
//							}
//						}else {
//							$(".sqListBox.sq03").show();
//							$(this).next(".sqListBox").stop().animate({"left":"-550px"},200);
//						}
//					}
//				});				
//				
//				
//				
//				
//				
//				
//				$workRoad.event.set("click", "#saCloseSampleLayer", function() {
//					$workRoadSelection.ui.hide();
//				});			
			
				//투명도 설정 바
				$("#wrmSelection_dataSlider_item").slider({
			    	range: "min",
			        min: 0.2,
			        max: 1,
			        value: 1,
			        step : 0.2,
			        slide: function( event, ui ) {  //ui.value
			        	$workRoadSelection.ui.background_color = "rgba(255,255,255,"+ui.value+")";
			        	$workRoadSelection.ui.border_color = "rgba(33, 57, 103,"+ui.value+")";
			        	$("#wrmSelection").css("background-color", "rgba(255,255,255,"+ui.value+")");
			        	$("#wrmSelection").css("border-color", "rgba(33, 57, 103,"+ui.value+")");
			        	
			        	// 2019.03.13 접근log 생성
			        	srvLogWrite('D0', '04', '04', '00', '', '투명도='+ui.value);
				    }
			    });
				
			}	
	}
	
}(window, document));