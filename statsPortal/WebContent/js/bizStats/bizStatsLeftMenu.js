/**
 * 생활업종 통계지도 Left 메뉴(조회조건)에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/11/03  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 * 20190502 반영예정
 */
(function(W, D) {
	W.$bizStatsLeftMenu = W.$bizStatsLeftMenu || {};
	$(document).ready(function() {
		$bizStatsLeftMenu.event.setUIEvent();	//UI에 사용되는 이벤트를 설정한다.
		$bizStatsLeftMenu.ui.commonDataList();		//공공데이터, 나의데이터 목록
		$.cssHooks.backgroundColor = {
			    get: function(elem) {
			        if (elem.currentStyle)
			            var bg = elem.currentStyle["backgroundColor"];
			        else if (window.getComputedStyle)
			            var bg = document.defaultView.getComputedStyle(elem,
			                null).getPropertyValue("background-color");
			        if (bg.search("rgb") == -1)
			            return bg;
			        else {
			            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			            function hex(x) {
			                return ("0" + parseInt(x).toString(16)).slice(-2);
			            }
			            if(bg != null) {
			            	return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
			            } else {
			            	return "#fff";
			            }
			        }
			    }
		};
		
		$.cssHooks.color = {
			    get: function(elem) {
			        if (elem.currentStyle)
			            var bg = elem.currentStyle["color"];
			        else if (window.getComputedStyle)
			            var bg = document.defaultView.getComputedStyle(elem,
			                null).getPropertyValue("color");
			        if (bg.search("rgb") == -1)
			            return bg;
			        else {
			            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			            function hex(x) {
			                return ("0" + parseInt(x).toString(16)).slice(-2);
			            }
			            if(bg != null) {
			            	return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
			            } else {
			            	return "#fff";
			            }
			        }
			    }
		};
		
		//mng_s
		var sel_val_before = $("#select_job_best_from").val();
		var sel_val = "";
		$("#select_job_best_from").change(
				function() {
					sel_val = $("#select_job_best_from").val();
					
					var from = "";
					// mng_s 20220112_김건민
					if(sel_val == 20201) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20200101'>2020년 1월 1일";
					} else if(sel_val == 20202) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20200401'>2020년 4월 1일";
					} else if(sel_val == 20203) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20200701'>2020년 7월 1일";
					} else if(sel_val == 20204) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20201001'>2020년 10월 1일";
					} else if(sel_val == 20211) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20210101'>2021년 1월 1일";
					} else if(sel_val == 20212) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20210401'>2021년 4월 1일";
					} else if(sel_val == 20213) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20210701'>2021년 7월 1일";
					} else if(sel_val == 20214) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20211001'>2021년 10월 1일";
					}
					// mng_e 20220112_김건민
					
					if(  $("#select_job_best_from").val() - $("#select_job_best_to").val() > 0 ) {
						
						$("#select_job_best_from").val(sel_val_before); //시작의 경우 첫번째 값으로 세팅한다.
						//from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160101'>2016년 1월 1일";
						//from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170101'>2017년 1월 1일";
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20200101'>2020년 1월 1일";
						messageAlert.open("알림", "시작 기간은 종료 기간보다 클 수 없습니다.");
						$("#job_best_from").html(from);
						$bizStatsLeftMenu.ui.job_best_from_reload_val = from;
						return false;
					}
					
					
					$("#job_best_from").html(from); 
					
					$bizStatsLeftMenu.ui.job_best_from_reload_val = from;
					
				}
		).change();
		
		var sel_val_before2 = $("#select_job_best_to").val();
		var sel_val2 = "";
		$("#select_job_best_to").change(
				function() {
					sel_val2 = $("#select_job_best_to").val();
					
					var to = "";
					// mng_s 20220112 김건민
					if(sel_val2 == 20201) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20200331'>2020년 03월 31일<br>";
					} else if(sel_val2 == 20202) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20200630'>2020년 06월 30일<br>";
					} else if(sel_val2 == 20203) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20200930'>2020년 09월 30일<br>";
					} else if(sel_val2 == 20204) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20201231'>2020년 12월 31일<br>";
					} else if(sel_val2 == 20211) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20210331'>2021년 03월 31일<br>";
					} else if(sel_val2 == 20212) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20210630'>2021년 06월 30일<br>";
					} else if(sel_val2 == 20213) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20210930'>2021년 09월 30일<br>";
					} else if(sel_val2 == 20214) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20211231'>2021년 12월 30일<br>";
					}
					// mng_e 20220112 김건민
					
					if(  $("#select_job_best_from").val() - $("#select_job_best_to").val() > 0 ) {
						$("#select_job_best_to").val(sel_val_before2); //종료의 경우 맨 마지막 값으로 세팅한다.
						// mng_s 20220112 김건민
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20211231'>2021년 12월 31일<br>"; //종료의 경우 맨 마지막 값으로 세팅한다.
						// mng_e 20220112 김건민
						messageAlert.open("알림", "종료 기간은 시작 기간보다 작을 수 없습니다.");
						$("#job_best_to").html(to);
						$bizStatsLeftMenu.ui.job_best_to_reload_val = to;
						return false;
					}
					
					$("#job_best_to").html(to);
					
					$bizStatsLeftMenu.ui.job_best_to_reload_val = to;
				}
		).change();
		
		//mng_s
		var tmpValues = null;
		$("#slider-range_job_best").slider({
			orientation: "vertical",
			range: true,
			//min:0,
			max:70, //데이터 추가될 경우 각 분기별로 10씩 더하면 된다.
			values: [0, 70],
			step:10, //값은 10단위로 변경 되므로 이 값은 앞으로 변경할 필요 없을 것같다.
			slide: function(event, ui){
				//console.log("[bizStatsLeftMenu.js] ui.values[1] [" + ui.values[1]);
				//슬라이더의 아랫쪽게 ui.values[0] 이다.
				var from = "";
				if(ui.values[1] == 110) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150101'>2015년 1월 1일";
				} else if(ui.values[1] == 100) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150401'>2015년 4월 1일";
				} else if(ui.values[1] == 90) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150701'>2015년 7월 1일";
				} else if(ui.values[1] == 80) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20151001'>2015년 10월 1일";
				} else if(ui.values[1] == 70) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160101'>2016년 1월 1일";
				} else if(ui.values[1] == 60) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160401'>2016년 4월 1일";
				} else if(ui.values[1] == 50) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160701'>2016년 7월 1일";
				} else if(ui.values[1] == 40) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20161001'>2016년 10월 1일";
				} else if(ui.values[1] == 30) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170101'>2017년 1월 1일";
				} else if(ui.values[1] == 20) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170401'>2017년 4월 1일";
				} else if(ui.values[1] == 10) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170701'>2017년 7월 1일";
				} else if(ui.values[1] == 0) {
					from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20171001'>2017년 10월 1일";
				}
				var to = "";
				if(ui.values[0] == 110) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150101'>2015년 1월 1일<br>";
				} else if(ui.values[0] == 100) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150331'>2015년 3월 31일<br>";
				} else if(ui.values[0] == 90) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150630'>2015년 6월 30일<br>";
				} else if(ui.values[0] == 80) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150930'>2015년 9월 30일<br>";
				} else if(ui.values[0] == 70) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20151231'>2015년 12월 31일<br>";
				} else if(ui.values[0] == 60) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160331'>2016년 3월 31일<br>";
				} else if(ui.values[0] == 50) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160630'>2016년 6월 30일<br>";
				} else if(ui.values[0] == 40) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160930'>2016년 9월 30일<br>";
				} else if(ui.values[0] == 30) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20161231'>2016년 12월 31일<br>";
				} else if(ui.values[0] == 20) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170331'>2017년 3월 31일<br>";
				} else if(ui.values[0] == 10) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170630'>2017년 6월 30일<br>";
				} else if(ui.values[0] == 0) {
					to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170930'>2017년 9월 30일<br>";
				}
				
				
				$("#job_best_from").html(from); 
				$("#job_best_to").html(to);
				
				$bizStatsLeftMenu.ui.job_best_from_reload_val = from;
				$bizStatsLeftMenu.ui.job_best_to_reload_val = to;
				
			},
			start : function(e, ui) {
	        	tmpValues = ui.values;
	        },
	        stop : function(e, ui) {
        		if (ui.values[0] == ui.values[1]) { //슬라이더의 값이 같을 경우 한 단계 튕겨낸다.
        			if (tmpValues[0] != ui.values[0]) {
        				$("#slider-range_job_best").slider("values", 0, ui.values[1]-10);
        				
        				//슬라이더의 아랫쪽게 ui.values[0] 이다.
    					var from = "";
    					if(ui.values[1] == 110) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150101'>2015년 1월 1일";
    					} else if(ui.values[1] == 100) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150401'>2015년 4월 1일";
    					} else if(ui.values[1] == 90) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150701'>2015년 7월 1일";
    					} else if(ui.values[1] == 80) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20151001'>2015년 10월 1일";
    					} else if(ui.values[1] == 70) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160101'>2016년 1월 1일";
    					} else if(ui.values[1] == 60) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160401'>2016년 4월 1일";
    					} else if(ui.values[1] == 50) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160701'>2016년 7월 1일";
    					} else if(ui.values[1] == 40) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20161001'>2016년 10월 1일";
    					} else if(ui.values[1] == 30) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170101'>2017년 1월 1일";
    					} else if(ui.values[1] == 20) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170401'>2017년 4월 1일";
    					} else if(ui.values[1] == 10) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170701'>2017년 7월 1일";
    					} else if(ui.values[1] == 0) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20171001'>2017년 10월 1일";
    					}
    					var to = "";
    					if(ui.values[0] == 110) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150331'>2015년 3월 31일<br>";
    					} else if(ui.values[0] == 100) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150630'>2015년 6월 30일<br>";
    					} else if(ui.values[0] == 90) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150930'>2015년 9월 30일<br>";
    					} else if(ui.values[0] == 80) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20151231'>2015년 12월 31일<br>";
    					} else if(ui.values[0] == 70) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160331'>2016년 3월 31일<br>";
    					} else if(ui.values[0] == 60) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160630'>2016년 6월 30일<br>";
    					} else if(ui.values[0] == 50) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160930'>2016년 9월 30일<br>";
    					} else if(ui.values[0] == 40) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20161231'>2016년 12월 31일<br>";
    					} else if(ui.values[0] == 30) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170331'>2017년 3월 31일<br>";
    					} else if(ui.values[0] == 20) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170630'>2017년 6월 30일<br>";
    					} else if(ui.values[0] == 10) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170930'>2017년 9월 30일<br>";
    					}
        				
    					
    					
    					$("#job_best_from").html(from); 
    					$("#job_best_to").html(to);
    					
    					$bizStatsLeftMenu.ui.job_best_from_reload_val = from;
    					$bizStatsLeftMenu.ui.job_best_to_reload_val = to;
        				
        			}else {
        				$("#slider-range_job_best").slider("values", 1, ui.values[0]+10);
        				
        				//슬라이더의 아랫쪽게 ui.values[0] 이다.
        				//상단의 슬라이더를 움직여서 같은 값이 됐을 경우 상단의 슬라이더를 밀어내고 input type 값도 한단계 밀어낸다.
    					var from = "";
    					if(ui.values[1] == 100) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150101'>2015년 1월 1일";
    					} else if(ui.values[1] == 90) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150401'>2015년 4월 1일";
    					} else if(ui.values[1] == 80) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150701'>2015년 7월 1일";
    					} else if(ui.values[1] == 70) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20151001'>2015년 10월 1일";
    					} else if(ui.values[1] == 60) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160101'>2016년 1월 1일";
    					} else if(ui.values[1] == 50) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160401'>2016년 4월 1일";
    					} else if(ui.values[1] == 40) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160701'>2016년 7월 1일";
    					} else if(ui.values[1] == 30) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20161001'>2016년 10월 1일";
    					} else if(ui.values[1] == 20) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170101'>2017년 1월 1일";
    					} else if(ui.values[1] == 10) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170401'>2017년 4월 1일";
    					} else if(ui.values[1] == 0) {
    						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170701'>2017년 7월 1일";
    					}
    					
    					var to = "";
    					if(ui.values[0] == 110) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150101'>2015년 1월 1일<br>";
    					} else if(ui.values[0] == 100) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150331'>2015년 3월 31일<br>";
    					} else if(ui.values[0] == 90) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150630'>2015년 6월 30일<br>";
    					} else if(ui.values[0] == 80) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150930'>2015년 9월 30일<br>";
    					} else if(ui.values[0] == 70) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20151231'>2015년 12월 31일<br>";
    					} else if(ui.values[0] == 60) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160331'>2016년 3월 31일<br>";
    					} else if(ui.values[0] == 50) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160630'>2016년 6월 30일<br>";
    					} else if(ui.values[0] == 40) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160930'>2016년 9월 30일<br>";
    					} else if(ui.values[0] == 30) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20161231'>2016년 12월 31일<br>";
    					} else if(ui.values[0] == 20) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170331'>2017년 3월 31일<br>";
    					} else if(ui.values[0] == 10) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170630'>2017년 6월 30일<br>";
    					} else if(ui.values[0] == 0) {
    						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170930'>2017년 9월 30일<br>";
    					}
    					
    					
    					$("#job_best_from").html(from); 
    					$("#job_best_to").html(to);
    					
    					$bizStatsLeftMenu.ui.job_best_from_reload_val = from;
    					$bizStatsLeftMenu.ui.job_best_to_reload_val = to;
        				
        			}
	        	} else { //슬라이더 값이 겹치지 않았을 경우
	        		//슬라이더의 아랫쪽게 ui.values[0] 이다.
	        		var from = "";
					if(ui.values[1] == 110) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150101'>2015년 1월 1일";
					} else if(ui.values[1] == 100) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150401'>2015년 4월 1일";
					} else if(ui.values[1] == 90) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20150701'>2015년 7월 1일";
					} else if(ui.values[1] == 80) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20151001'>2015년 10월 1일";
					} else if(ui.values[1] == 70) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160101'>2016년 1월 1일";
					} else if(ui.values[1] == 60) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160401'>2016년 4월 1일";
					} else if(ui.values[1] == 50) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20160701'>2016년 7월 1일";
					} else if(ui.values[1] == 40) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20161001'>2016년 10월 1일";
					} else if(ui.values[1] == 30) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170101'>2017년 1월 1일";
					} else if(ui.values[1] == 20) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170401'>2017년 4월 1일";
					} else if(ui.values[1] == 10) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170701'>2017년 7월 1일";
					} else if(ui.values[1] == 0) {
						from = "<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20171001'>2017년 10월 1일";
					}
					var to = "";
					if(ui.values[0] == 110) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150101'>2015년 1월 1일<br>";
					} else if(ui.values[0] == 100) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150331'>2015년 3월 31일<br>";
					} else if(ui.values[0] == 90) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150630'>2015년 6월 30일<br>";
					} else if(ui.values[0] == 80) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20150930'>2015년 9월 30일<br>";
					} else if(ui.values[0] == 70) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20151231'>2015년 12월 31일<br>";
					} else if(ui.values[0] == 60) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160331'>2016년 3월 31일<br>";
					} else if(ui.values[0] == 50) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160630'>2016년 6월 30일<br>";
					} else if(ui.values[0] == 40) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20160930'>2016년 9월 30일<br>";
					} else if(ui.values[0] == 30) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20161231'>2016년 12월 31일<br>";
					} else if(ui.values[0] == 20) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170331'>2017년 3월 31일<br>";
					} else if(ui.values[0] == 10) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170630'>2017년 6월 30일<br>";
					} else if(ui.values[0] == 0) {
						to = "<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20170930'>2017년 9월 30일<br>";
					}
					
					
					$("#job_best_from").html(from); 
					$("#job_best_to").html(to);
					
					$bizStatsLeftMenu.ui.job_best_from_reload_val = from;
					$bizStatsLeftMenu.ui.job_best_to_reload_val = to;
	        	}
	        }
		});
		
		$("#slider-range_job_best a").first().css("background-image","url(/img/im/slider_handle.png)");
		//console.log("========================= [bizStatsLeftMenu.js] ===========================");
		
		//mng_e
		
		//mng_s 20210430 ldj 좌측 메뉴 초기화
		$("#map_left_btn").click();
		//mng_e
		
		
	});
	
	$bizStatsLeftMenu.ui = {
			searchbtnCnt : 0, // 버튼생성 카운트
			curSelectedStatsType : null, // 현재 선택된 통계분류(Intro, 업종별 지역현황 등)
			arParamList : [], // 생성된 조회버튼에 매칭된 파라미터 정보배열
			mapColor : ["#0478cb", "#9ED563", "#FF0066"],		//지도 별 고유 색상
			curSearchBtnArray : { "one":"", "two":"", "three":"" },	//지도를 조회한 버튼 아이디
			curSelectedCompany : "H",		//사업체 업종선택 			// 2020년 SGIS고도화 3차(테마코드) - 변수값 수정 (pse)
			//curSelectedCompany : "food",		//사업체 업종선택	// 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리
			jobBestSido : "", //mng_s 업종별 뜨는 지역 관심지역 시도==>데이터보드에 보여줄 변수
			jobBestSgg : "",  //mng_s 업종별 뜨는 지역 관심지역 시군구==>데이터보드에 보여줄 변수
			job_best_from_reload_val : "", //mng_s
			job_best_to_reload_val : "", //mng_s
			job_best_from_poi : "", //mng_s
			job_best_to_poi : "", //mng_s
			job_best_themeCd : "", //mng_s
			srvTempValue : "", //mng_s 20190401 김건민(srvLog 변수)
			srvLogLeftMenuNm : "", //mng_s 20190402 김건민
			srvLogAreaInfoNm : "",
			
			/**
			 * 
			 * @name         : doIntro
			 * @description  : 인트로서비스를 보여준다.
			 * @date         : 2015. 11. 03.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doSidoIntro : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId);
				var map = $bizStatsMap.ui.mapList[mapId];
				map.isBlankLayer = true;
				map.isMultiSelectedBound = true;
				setTimeout(function() {
					$bizStatsMap.ui.doSidoIntro();
				}, 300);
			},
			//////박길섭//////////
			doSidoWorkerIntro : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId);
				var map = $bizStatsMap.ui.mapList[mapId];
				map.isBlankLayer = true;
				map.isMultiSelectedBound = true;
				setTimeout(function() {
					$bizStatsMap.ui.doSidoWorkerIntro();
				}, 300);
			},
			
			
			/**
			 * 
			 * @name         : doCompanySidoIntro
			 * @description  : 업종별 지역현황 정보를 보여준다.
			 * @date         : 2015. 11. 03.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doCompanySidoIntro : function () {
				var mapId = parseInt($bizStatsMap.ui.curMapId);
				var map = $bizStatsMap.ui.mapList[mapId];
				//console.log($bizStatsMap.ui.mapList.length);
				//console.log($bizStatsMap.ui.mapList);
				map.isBlankLayer = true;
				map.isMultiSelectedBound = true;
				setTimeout(function() {
					$bizStatsMap.ui.doCompanySidoIntro();
				}, 300);
			},
			
			/**
			 * 
			 * @name         : doCompanyDensityIntro
			 * @description  : 업종밀집도 정보를 보여준다.
			 * @date         : 2016. 06. 10.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doCompanyDensityIntro : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId);
				var map = $bizStatsMap.ui.mapList[mapId];
				setTimeout(function() {
					$bizStatsMap.ui.doCompanyDensityIntro();
				}, 300);
			},
			
			/**
			 * 
			 * @name         : doCompanyOpenIntro
			 * @description  : 지자체 인허가
			 * @date         : 
			 * @author	     : 
			 * @history 	 :
			 */
			doCompanyOpenIntro : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId);
				var map = $bizStatsMap.ui.mapList[mapId];
				
				//alert("[bizStatsLeftMenu.js] doCompanyOpenIntro() mapId [" + mapId);
				//alert("[bizStatsLeftMenu.js] doCompanyOpenIntro() map [" + map);
				//alert("[bizStatsLeftMenu.js] doCompanyOpenIntro() $bizStatsMap.ui.share_info_type [" + $bizStatsMap.ui.share_info_type);
				
				
				setTimeout(function() {
					$bizStatsMap.ui.doCompanyOpenIntro();
				}, 300);
			
			},
			
			/**
			 * 
			 * @name         : doCompanyBestIntro
			 * @description  : 업종별 뜨는 지역
			 * @date         : 
			 * @author	     : 
			 * @history 	 : mng_s
			 */
			doCompanyBestIntro : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId);
				var map = $bizStatsMap.ui.mapList[mapId];
				
				//alert("[bizStatsLeftMenu.js] doCompanyOpenIntro() mapId [" + mapId);
				//alert("[bizStatsLeftMenu.js] doCompanyOpenIntro() map [" + map);
				//alert("[bizStatsLeftMenu.js] doCompanyOpenIntro() $bizStatsMap.ui.share_info_type [" + $bizStatsMap.ui.share_info_type);
				
				
				setTimeout(function() {
					$bizStatsMap.ui.doCompanyBestIntro();
				}, 300);
			
			},
			
			//mng_s
			/**
			 * @name              : getSidoList
			 * @description       : 시도리스트
			 * @date              : 2015. 12. 09. 
			 * @author            : 나광흠
			 * @history           :
			 * @param type        : 'inter-recommend' 관심지역
			 * @param defaultSido : 처음 셋팅해줄 시도 코드
			 * @param defaultSgg  : 처음 셋팅해줄 시군구 코드
			 * @param callback    : callback
			 */
			getSidoList: function(type,defaultSido,defaultSgg,callback) {
				$("#"+type+"-sido-select,#"+type+"-sgg-select").prop("disabled",true);
				$.ajax({
					method: "POST",
					async: true,
					url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
					data: {
						base_year: $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].bnd_year
					},
					dataType: "json",
					success: function(res) {
						$("#"+type+"-sido-select").empty();
						if(res.errCd=="0"){
							$("#"+type+"-sido-select").append($("<option/>",{text:"전국",value:"00",selected:(defaultSido=="00"),"data-coor-x":"990480.875","data-coor-y":"1815839.375"}));
							$.each(res.result.sidoList,function(cnt,node){
								if(defaultSido==node.sido_cd){
									$bizStatsLeftMenu.ui.getSggList(type,node.sido_cd,defaultSgg,callback);
								}
								$("#"+type+"-sido-select").append($("<option/>",{text:node.sido_nm,value:node.sido_cd,selected:(defaultSido==node.sido_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor}));
							});
							//if(!$bizStatsMap.ui.hasText(defaultSido)||defaultSido=="00"){
							if(defaultSido=="00"){
								$bizStatsLeftMenu.ui.getSggList(type,"00",defaultSgg,callback);
							}
						}else if(res.errCd=="-401"){
							accessTokenInfo(function() {
								$bizStatsLeftMenu.ui.getSidoList(type,defaultSido,defaultSgg,callback);
							});
						}
						$("#"+type+"-sido-select,#"+type+"-sgg-select").prop("disabled",false);
					},
					error: function(e) {
						$("#"+type+"-sido-select,#"+type+"-sgg-select").prop("disabled",false);
					}
				});
			},
			
			/**
			 * @name             : getSggList
			 * @description      : 시군구리스트
			 * @date             : 2015. 12. 09. 
			 * @author           : 나광흠
			 * @history          :
			 * @param type       : 'current' 주거현황보기 'inter-recommend' 추천지역찾기의 관심지역 
			 * @param sido_cd    : 시도 코드
			 * @param defaultSgg : 처음 셋팅해줄 시군구 코드
			 * @param callback   : callback
			 */
			getSggList: function(type,sido_cd,defaultSgg,callback) {
				$("#"+type+"-sgg-select").prop("disabled",true);
				$.ajax({
					method: "POST",
					async: true,
					url: contextPath + "/ServiceAPI/map/sggAddressList.json",
					data: {
						sido_cd: sido_cd,
						base_year: $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].bnd_year
					},
					dataType: "json",
					success: function(res) {
						$("#"+type+"-sgg-select").empty();
						if(res.errCd=="0"){
							$("#"+type+"-sgg-select").append($("<option/>",{text:"전체",value:"999","data-coor-x":"990480.875","data-coor-y":"1815839.375"}));
							/*
							if(defaultSgg==="999"){
								$bizStatsLeftMenu.getStandardAreaList(sido_cd,"999");
							}
							*/
							$.each(res.result.sggList,function(cnt,node){
								//if(type=="stand-recommend"&&defaultSgg==node.sgg_cd){
								//	$bizStatsLeftMenu.getStandardAreaList(sido_cd,node.sgg_cd);
								//}
								$("#"+type+"-sgg-select").append($("<option/>",{text:node.sgg_nm,value:node.sgg_cd,selected:(defaultSgg==node.sgg_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor}));
							});
						}else if(res.errCd=="-401"){
							accessTokenInfo(function() {
								$bizStatsLeftMenu.ui.getSggList(type,sido_cd,defaultSgg);
							});
						}
						$("#"+type+"-sgg-select").prop("disabled",false);
						//$bizStatsLeftMenu.setSubmitTooltipContent();
						if(typeof callback === "function"){
							callback();
						}
					},
					error: function(e) {
						$("#"+type+"-sgg-select").prop("disabled",false);
						//$bizStatsLeftMenu.setSubmitTooltipContent();
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : doNormalMapInit
			 * @description  : 지도를 노말지도로 초기화한다.
			 * @date         : 2015. 11. 05.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doNormalMapInit : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId);
				//console.log("doNormalMapInit = " + mapId);
				var map = $bizStatsMap.ui.mapList[mapId];
				//console.log($bizStatsMap.ui.mapList.length);
				//console.log($bizStatsMap.ui.mapList);
				map.isBlankLayer = false;
				map.isMultiSelectedBound = false;
				setTimeout(function() {
					$bizStatsMap.ui.doNormalMapInit();
				}, 300);
			},

			/**
			 * 
			 * @name         : addSearchBtn
			 * @description  : 조건검색버튼을 생성한다.
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			addSearchBtn : function() {
				if(this.btnLimitCnt()) {
					//일반 버튼일 경우 파라미터 유효성 검사
					if(this.btnValidationCheck(this.curSelectedStatsType)) {
						var api_id = this.setParams(this.curSelectedStatsType);
						this.createSearchBtn(api_id); // 버튼생성
						this.searchbtnCnt++;
						
						// mng_s 20190401 김건민
						if(api_id == 'areaInfo'){
							//srvLogWrite('G1', '03', '06', '01', '', '');
							srvLogWrite('G1', '08', '02', '00', '', '');
						}
						// mng_e 20190401 김건
						
						/*$(".quickBox.step00").stop().animate({"left":"-280px"},200);
						$(".quickBox.sq02").removeClass("on");
						$(".nav-sidebar").stop().animate({"left":"-80px"},200);
						//$(".expand").stop().animate({"left":"-140px"},200);
						$(".quickBox.step02").stop().animate({"left":"-280px"},200);
						$(".quickBox.step03").stop().animate({"left":"-720px"},200);*/
						var adm_cd="";
						var adm_nm="";
						if($("#current-sgg-select").val()=="000"){
							adm_cd=$("#current-sido-select").val();
							adm_nm=$("#current-sido-select option:selected").text();
						}
						//조회버튼은 최대 10개만 가능
						else{
							adm_cd=$("#current-sido-select").val()+$("#current-sgg-select").val()+$("#current-emd-select").val();
							adm_nm=$("#current-sido-select option:selected").text()+" "+$("#current-sgg-select option:selected").text()+" "+$("#current-emd-select option:selected").text()
						}
						var map=$bizStatsMap.ui.mapList[0];
						var x_coor="";
						var y_coor="";
						var data={
								adm_cd:adm_cd,
								adm_nm:adm_nm,
							};
						if($("#current-sgg-select option:selected").attr("x-coor")==undefined){//조건별 지역찾기에서 시도만 선택일 경우
							/*if($(".icon04>a").hasClass("on")){
								messageAlert.open("알림","생활업종후보지정보는 시/군/구, 읍/면/동 단위에서 조회할 수 있습니다.");
								$("#searchBtnResultRgn").find("ul li").remove();
							}*/
							/*else if($("#openStatus1>a").hasClass("on")){
								messageAlert.open("알림","우리동네 생활업종은 시/군/구 단위에서 조회할수 있습니다.");
							}*/
							if($("#openStatus1>a").hasClass("on")){
								x_coor=$("#current-sido-select option:selected").attr("x-coor");
								y_coor=$("#current-sido-select option:selected").attr("y-coor");
								$(".nav-sidebar").stop().animate({"left":"-80px"},200);
								$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
							}
							
							//return false;
						}
						else if($("#current-emd-select option:selected").attr("x-coor")==undefined){//시군구까지 선택일 경우
							x_coor=$("#current-sgg-select option:selected").attr("x-coor");
							y_coor=$("#current-sgg-select option:selected").attr("y-coor");
							if($(".menuAutoClose label").hasClass("on")){
								$(".nav-sidebar").stop().animate({"left":"-80px"},200);
								//$(".expand").stop().animate({"left":"-140px"},200);
							}
							$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
						}
						else{//읍면동까지 선택일 경우
							x_coor=$("#current-emd-select option:selected").attr("x-coor");
							y_coor=$("#current-emd-select option:selected").attr("y-coor");
							if($(".menuAutoClose label").hasClass("on")){
								$(".nav-sidebar").stop().animate({"left":"-80px"},200);
								//$(".expand").stop().animate({"left":"-140px"},200);
							}
							$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
						}
						map.mapMove([x_coor,y_coor], 2);
						var source = $("#searchBtnResultRgn").find("ul li").eq($("#searchBtnResultRgn").find("ul li").length -1);
						$bizStatsMap.callbackFunc.didMapDropEnd(undefined,source,undefined,data,map);
						$("#searchBtnResultRgn").find("ul li").remove();
						
						
						
						/*if($("#current-sgg-select option:selected").attr("x-coor")!=undefined){
						map.mapMove([x_coor,y_coor], 2);
						
						setTimeout(function() { //2017.02.23
							map.mapMove([x_coor,y_coor], 5, true);
							setTimeout(function() {
								var source = $("#searchBtnResultRgn").find("ul li").eq($("#searchBtnResultRgn").find("ul li").length -1 );
								$(source).trigger("dblclick");
							},200);
						},500);
						if (adm_cd.length >= 5) {
							adm_cd = adm_cd.substring(0,5);
							map.setZoom(5);
						}else if (adm_cd.length = 2) {	//시도 레벨
							adm_cd = adm_cd.substring(0,2);
							map.setZoom(2);
						}
						setTimeout(function() {
							$(".sqdel").trigger();
						},1500);
						var source = $("#searchBtnResultRgn").find("ul li").eq($("#searchBtnResultRgn").find("ul li").length -1);
						$bizStatsMap.callbackFunc.didMapDropEnd(undefined,source,undefined,data,map);
						$("#searchBtnResultRgn").find("ul li").remove();
						}*/
						
					}
				}
				$("#mCSB_2_container").css("width","290px");
			},
			
			/**
			 * 
			 * @name         : btnLimitCnt
			 * @description  : 버튼갯수 
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */
			btnLimitCnt : function() {
				var cnt = $("#searchBtnResultRgn").find("li:visible").length;
				if(cnt > 9) {
					messageAlert.open("알림", "버튼은 최대 10개까지 생성 가능합니다.");
					return false;
				}
				return true;
			},
			
			/**
			 * 
			 * @name         : getBtnCnt
			 * @description  : 버튼갯수 
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */
			getBtnCnt : function() {
				var cnt = $("#searchBtnResultRgn").find("li:visible").length;
			},
			
			/**
			 * 
			 * @name         : createSearchBtn
			 * @description  : 조건버튼을 실제로 생성한다.(버튼 타이틀생성/버튼생성)
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param curSelectedStatsType : 선택된 통계정보 타입
			 */
			createSearchBtn : function(curSelectedStatsType) {
				// 버튼타이틀생성
				var btnTitle = null;
				var unit = null;
				var showData = null;
				
				//통계버튼 보이기
				var sq03 = $(".sideQuick.sq03");
				if(!sq03.hasClass("on")){
					$(".sideQuick.sq03").click();
				}

				//console.log("~~~~~~~~~~~~this.arParamList")
				//console.log(this.arParamList)
				
				
				for (var i = 0; i < this.arParamList.length; i++) {
					if (this.arParamList[i].idx == this.searchbtnCnt) {
						var names = this.arParamList[i].names;
						if (Object.prototype.toString.call(names) === "[object Array]") {
							btnTitle = names.join(" + ");
						}else {
							btnTitle = names;
						}
						unit = this.arParamList[i].unit;
						showData = this.arParamList[i].filterParam;
						this.arParamList[i]["title"] = btnTitle;
						break;
					}
				}
				
				//타이틀
				var tmpTitle = btnTitle + " ("+ unit +")";
				
				//버튼생성
				var html = "<li class='dragItem' id='dragItem_"+this.searchbtnCnt+"'>" +
									"<a href='javascript:void(0)' id='"+this.curSelectedStatsType + "-" + this.searchbtnCnt+"' class='ellipsis drag on' title='"+tmpTitle+"'>" +
										"<div class='text'>"+tmpTitle+"</div>" +
									"</a>" +
									"<a href='javascript:$bizStatsLeftMenu.ui.deleteSearchBtn("+this.searchbtnCnt+");' class='sqdel'><img src='/img/um/btn_closel01.png' alt='삭제' /></a>" +
								"</li>";
				$("#searchBtnResultRgn ul").prepend(html);
				
				//버튼 드래그설정
				$(".dragItem").draggable({ 
					revert : "invalid",
					helper : "clone",
					cursor : "pointer",
					zIndex : 100,
					cursorAt : {left : -5},
					appendTo : "body",
					start : function(e, ui) {
					},
					drag : function(e, ui) {
						$(".sqListBox.sq03 .mCSB_container, .sqListBox.sq03 .sqList, .sqListBox.sq03 .mCustomScrollBox,.sqListBox.sq03 .mCSB_container_wrapper").css("overflow", "hidden");
					},
					stop : function(e, ui) {
						$(".sqListBox.sq03 .mCSB_container, .sqListBox.sq03 .sqList, .sqListBox.sq03 .mCustomScrollBox,.sqListBox.sq03 .mCSB_container_wrapper").css("overflow", "hidden");
					}
				});
				
				//조건버튼 드래그, 더블클릭 설정
				this.searchModeSetting();
				
				//버튼 카운트
				this.getBtnCnt();
			},
			
			/**
			 * 
			 * @name         : searchModeSetting
			 * @description  : 조건버튼 드래그, 더블클릭 설정. 
			 * @date         : 2015. 11. 10.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type : drag, doubleClick
			 */
			searchModeSetting : function(type) {
				$(".dragItem").draggable( "enable" );	//드랍 허용
				$(".ui-state-disabled, .ui-widget-content .ui-state-disabled, .ui-widget-header .ui-state-disabled").css({"opacity":1});	//disabled일때 흐려짐현상 없앰
				//더블클릭 이벤트
				$(".dragItem").dblclick(function(event) {
					var id = $("#"+event.currentTarget.id).find("a").attr("id");
					var index = id.split("-")[1];
					var tmpParam = "";
					for(var i = 0; i < $bizStatsLeftMenu.ui.arParamList.length; i ++) {
						if($bizStatsLeftMenu.ui.arParamList[i].idx == index) {
							tmpParam = $bizStatsLeftMenu.ui.arParamList[i];
						}
					}
					// 더블클릭 시, 콜백 호출
					$bizStatsMap.callbackFunc.didMapDoubleClick(id, tmpParam);
				});
				
				//원클릭 이벤트	/*2016-03-17 수정*/
				//9월 서비스
				/*$(".dragItem").mousedown(function(event) {
					var id = $("#"+event.currentTarget.id).find("a").attr("id");
					var name = id.split("-")[0];
					//업종밀집도 변화, 지역 종합정보, 창업지역검색 일 경우 줌레벨을 시군구 레벨로 변경
					if(name == "jobChange" || name == "areaInfo" || name == "areaSearch") {
						if($bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].zoom < 4) {	//시도 레벨일 경우
							$bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].setZoom(4);	//시군구 레벨로 변경
						}
					}
				});
*/				
				this.updateSearchBtnEffect(this.curSearchBtnArray["one"], 0);
				this.updateSearchBtnEffect(this.curSearchBtnArray["two"], 1);
				this.updateSearchBtnEffect(this.curSearchBtnArray["three"], 2);
			},
			
			/**
			 * 
			 * @name         : updateSearchBtnEffect
			 * @description  : 해당 조건버튼의 색상 및 깜빡임 효과. 
			 * @date         : 2015. 11. 10.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param btn_id : 조회 버튼 아이디 (element id)
			 * @param map_id : 지도 번호 (0, 1, 2)
			 */
			updateSearchBtnEffect : function(btn_id, map_id) {
				//모든 버튼 색상 초기화
				$("#searchBtnResultRgn ul li").each(function() {
					$(this).find("a").removeClass("M_on");
					$(this).find("a").css("background-color", "");	//해당 버튼 배경 없애기
				});
				
				//드랍된 버튼 아이디 저장
				if(map_id == "0") {
					this.curSearchBtnArray["one"] = btn_id;
				} else if(map_id == "1") {
					this.curSearchBtnArray["two"] = btn_id;
				} else if(map_id == "2") {
					this.curSearchBtnArray["three"] = btn_id;
				}
				
				//원래 드랍됐었던 조회버튼
				if(this.curSearchBtnArray["one"] != "") {
					$bizStatsLeftMenu.event.dragAnimate(this.curSearchBtnArray["one"], this.mapColor[0]);
				}
				if(this.curSearchBtnArray["two"] != "") {
					$bizStatsLeftMenu.event.dragAnimate(this.curSearchBtnArray["two"], this.mapColor[1]);
				}
				if(this.curSearchBtnArray["three"] != "") {
					$bizStatsLeftMenu.event.dragAnimate(this.curSearchBtnArray["three"], this.mapColor[2]);
				}
				
				//분할 화면에 같은 버튼을 조회했을 경우
				if(this.curSearchBtnArray["one"] != "" && (this.curSearchBtnArray["one"] == this.curSearchBtnArray["two"])) {
					$bizStatsLeftMenu.event.dragAnimate(this.curSearchBtnArray["one"], "#394955");
				}
				if(this.curSearchBtnArray["two"] != "" && (this.curSearchBtnArray["two"] == this.curSearchBtnArray["three"])) {
					$bizStatsLeftMenu.event.dragAnimate(this.curSearchBtnArray["two"], "#394955");
				}
				if(this.curSearchBtnArray["three"] != "" && (this.curSearchBtnArray["three"] == this.curSearchBtnArray["one"])) {
					$bizStatsLeftMenu.event.dragAnimate(this.curSearchBtnArray["three"], "#394955");
				}
			},
			
			/**
			 * 
			 * @name         : setParams
			 * @description  : 조건버튼으로 만들어진 통계정보에 대한 파라미터정보를 설정한다. 
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param curSelectedStatsType : 선택된 통계정보 타입
			 */
			setParams : function(curSelectedStatsType) {
				var tmpArParams = new Array();
				var tmpArNoneParams = new Array();		//API 조회조건에 사용되지 않는 파라미터
				var tmpArParamName = new Array(); // 선택된 파라미터이름 정보
				var filterParam = null;
				var unit = null;
				var filterName = null;
				var themeNm = "";
				var conditions = []; // 후보지역 조건설정
				
				//업종밀집도 변화
				if (curSelectedStatsType == "jobChange") {
					var fullName = null;
					var tmpNames = [];
					
					filterParam = $(".jobArea_stepBox label.on").prev("input").val();
					fullName = $(".jobArea_stepBox label.on").text();
					tmpNames.push($.trim(fullName));
					unit = "개";
					
					if (tmpNames.length > 0) {
						tmpArParamName.push(tmpNames.join());
					}
					
					tmpArParams.push({
						key : "theme_cd",
						value : $(".jobArea_stepBox label.on").prev("input").val()
					});
					
					tmpArParams.push({
						key : "year",
						value : dataYear
					});
				}
				
				//지자체 인허가
				else if (curSelectedStatsType == "jobOpen") {
					var fullName = null;
					var tmpNames = [];
					
					filterParam = $(".jobArea_stepBox label.on").prev("input").val();
					fullName = $(".jobArea_stepBox label.on").text();
					tmpNames.push($.trim(fullName));
					unit = "개";
					
					if (tmpNames.length > 0) {
						tmpArParamName.push(tmpNames.join());
					}
					
					tmpArParams.push({
						key : "theme_cd",
						value : $(".jobArea_stepBox label.on").prev("input").val()
					});
					
					tmpArParams.push({
						key : "year",
						value : dataYear
					});
				}
				
				//업종별 뜨는 지역 mng_s
				else if (curSelectedStatsType == "jobBest") {
					var fullName = null;
					var tmpNames = [];
					
					filterParam = $(".jobArea_stepBox label.on").prev("input").val();
					fullName = $(".jobArea_stepBox label.on").text();
					$bizStatsMap.ui.jobBestTitle = fullName;
					tmpNames.push($.trim(fullName));
					unit = "개";
					
					if (tmpNames.length > 0) {
						tmpArParamName.push(tmpNames.join());
					}
					
					tmpArParams.push({
						key : "theme_cd",
						value : $(".jobArea_stepBox label.on").prev("input").val()
					});
					
					tmpArParams.push({
						key : "year",
						value : dataYear
					});
					
					tmpArParams.push({
						key : "jb_sido_cd",
						value : $("#inter-recommend-sido-select").val()
					});
					
					tmpArParams.push({
						key : "jb_ssg_cd",
						value : $("#inter-recommend-ssg-select").val()
					});
					
					tmpArParams.push({
						key : "param_job_best_from",
						value : $("#param_job_best_from").val()
					});
					
					tmpArParams.push({
						key : "param_job_best_to",
						value : $("#param_job_best_to").val()
					});

				}
				
				//지역 종합정보
				else if (curSelectedStatsType == "areaInfo") {
					tmpArParamName.push("생활업종후보지정보");
					unit = "개";
				}
				
				//조건 설정에 따른 지역 검색
				else if (curSelectedStatsType == "areaSearch") {
					unit = "개";
					
					// 사업체 업종
					if($("#companyTabDiv").is(":visible")) {
						var tmpThemeCd = "";
						var tmpThemeNm = "";
						var smallThemeDetail = null;	// 2020년 SGIS고도화 3차(테마코드) - 코드 추가 (pse)
						
						// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존코드 주석처리, 새로운 대분류 코드 활용을 위한 코드 추가 (pse)
						/*
						//요식업
						if(this.curSelectedCompany == "food") {
							$("input[name='rd_sch_food']").each(function() {
								if($(this).attr("checked") == "checked") {
									tmpThemeCd = $(this).val();
									tmpThemeNm = "요식업-"+$(this).next().text();
								}
							});
							
						//도소매
						} else if(this.curSelectedCompany == "retail") {
							$("input[name='rd_sch_retail']").each(function() {
								if($(this).attr("checked") == "checked") {
									tmpThemeCd = $(this).val();
									tmpThemeNm = "도소매-"+$(this).next().text();
								}
							});
							
						//서비스
						} else if(this.curSelectedCompany == "service") {
							$("input[name='rd_sch_service']").each(function() {
								if($(this).attr("checked") == "checked") {
									tmpThemeCd = $(this).val();
									tmpThemeNm = "서비스-"+$(this).next().text();
								}
							});
							
						//숙박업
						} else if(this.curSelectedCompany == "hotel") {
							$("input[name='rd_sch_hotel']").each(function() {
								if($(this).attr("checked") == "checked") {
									tmpThemeCd = $(this).val();
									tmpThemeNm = "숙박업-"+$(this).next().text();
								}
							});
						}
						*/
						
						tmpThemeCd = $('#companyTabDiv .noneDefault div[class^="cm"]:visible').find('input[type="checkbox"][checked="checked"]').val();
						if(!tmpThemeCd) {	// 2020-12-01 추가 , 에러를 내서 모든 동작을 멈추게 한다. return으로는 멈추지 못한다.
							alert('반드시 하나의 테마를 선택하셔야 합니다.');
							throw new Error('반드시 하나의 테마를 선택하셔야 합니다.');
						}	
						smallThemeDetail = $themeCdCommon.findSmallThemeDetail(tmpThemeCd);
						tmpThemeNm = smallThemeDetail.b_theme_cd_nm +"-"+smallThemeDetail.s_theme_cd_nm;
						// 2020년 SGIS고도화 3차(테마코드) 끝 - 기존코드 주석처리, 새로운 대분류 코드 활용을 위한 코드 추가 (pse)
						
						themeNm = tmpThemeNm;
						tmpArParams.push({
							key : "theme_cd",
							value : tmpThemeCd
						});
					}
					
					// 사업체 수
					if($("#companyCountDiv").is(":visible")) {
						var corp_cnt = $("#companyCount").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(corp_cnt);

						tmpArParamName.push("사업체 수-"+tmpNm+" (" + themeNm + ")");
						tmpArParams.push({
							key : "corp_cnt",
							value : corp_cnt
						});
						conditions.push({category: "사업체 수("+themeNm+")", value: tmpNm});
					}
					
					// 사업체 증감
					if($("#companyIncreaseDiv").is(":visible")) {
						var rate_change = $("#companyIncrease").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderLowAvgHigh(rate_change);
						
						tmpArParamName.push("사업체 증감-"+tmpNm+" (" + themeNm + ")");
						tmpArParams.push({
							key : "rate_change",
							value : rate_change
						});
						conditions.push({category: "사업체 증감("+themeNm+")", value: tmpNm});
					}
					
					// 직장인구
					if($("#jobPeopleDiv").is(":visible")) {
						var ppl_val = $("#jobPeople").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(ppl_val);
						
						tmpArParams.push({
							key : "ppl_type",
							value : "2"
						});
						
						tmpArParamName.push("직장인구-"+tmpNm);
						tmpArParams.push({
							key : "ppl_val",
							value : ppl_val
						});
						
						conditions.push({category: "직장인구", value: tmpNm});
					}
					
					// 거주인구
					if($("#stayPeopleDiv").is(":visible")) {
						var ppl_val = $("#stayPeople").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(ppl_val);
						
						tmpArParams.push({
							key : "ppl_type",
							value : "1"
						});
						
						tmpArParamName.push("거주인구-"+tmpNm);
						tmpArParams.push({
							key : "ppl_val",
							value : ppl_val
						});
						
						conditions.push({category: "거주인구", value: tmpNm});
					}
					
					// 성별인구
					if($("#genderPeopleDiv").is(":visible")) {
						var pplGender = $("input[name='population_gender']:checked");
						var pplGenderVal = $("#genderPeople").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(pplGenderVal);
						
						tmpArParams.push({
							key : "ppl_gender_type",
							value : $(pplGender).val()
						});
						
						tmpArParamName.push("성별인구-"+tmpNm+" ("+$(pplGender).next().text()+")");
						tmpArParams.push({
							key : "ppl_gender_val",
							value : pplGenderVal
						});
						
						conditions.push({category: "성별인구("+$(pplGender).next().text()+")", value: tmpNm});
					}
					
					// 연령별인구
					if($("#agePeopleDiv").is(":visible")) {
						var pplAgeVal = $("#agePeople").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(pplAgeVal);
						
						var pplAge = [];						
						var tmpNames = [];
						$("input[name='rd_age']").each(function() {
							if($(this).attr("checked") == "checked") {
								pplAge.push($(this).val());
								tmpNames.push($(this).next().text());
							}
						});
						
						tmpArParams.push({
							key : "ppl_age_type",
							value : pplAge.join(",")
						});
						
						tmpArParamName.push("인구연령-"+tmpNm+" ("+tmpNames.join(",")+")");
						tmpArParams.push({
							key : "ppl_age_val",
							value : pplAgeVal
						});
						
						conditions.push({category: "연령" + ((tmpNames.length > 1) ? "(복합)" : "("+tmpNames[0]+")"), value: tmpNm});
					}
					
					// 가구유형
					if($("#householdDiv").is(":visible")) {
						var familyType = "";
						var familyVal = $("#household").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(familyVal);
						
						$("input[name='household_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								familyType = $(this);
							}
						});
						
						tmpArParams.push({
							key : "family_type",
							value : $(familyType).val()
						});
						
						tmpArParamName.push("가구-"+tmpNm+" ("+$(familyType).next().text()+")");
						tmpArParams.push({
							key : "family_val",
							value : familyVal
						});
						
						conditions.push({category: "가구" + $(familyType).next().text(), value: tmpNm});
					}
					
					// 점유형태
					if($("#occupyTypeDiv").is(":visible")) {
						var occupyType = "";
						var occupyVal = $("#occupyType").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(occupyVal);
						
						$("input[name='ocptn_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								occupyType = $(this);
							}
						});
						
						tmpArParams.push({
							key : "occupy_type",
							value : $(occupyType).val()
						});
						
						tmpArParamName.push("점유형태-"+tmpNm+" ("+$(occupyType).next().text()+")");
						tmpArParams.push({
							key : "occupy_val",
							value : occupyVal
						});
						
						conditions.push({category: "점유형태(" + $(occupyType).next().text() + ")", value: tmpNm});
					}
					
					// 거주 주택
					if($("#houseLivingTypeDiv").is(":visible")) {
						var houseType = "";
						$("input[name='house_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								houseType = $(this);
							}
						});
						
						tmpArParamName.push($(houseType).next().text());
						tmpArParams.push({
							key : "house_type",
							value : $(houseType).val()
						});
					}
					
					//해당 주택 수
					if($("#houseTypeDiv").is(":visible")) {
						var houseVal = $("#houseType").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(houseVal);
						
						tmpArParamName.push("주택 수-"+tmpNm);
						tmpArParams.push({
							key : "house_val",
							value : houseVal
						});
						
						conditions.push({category: "주택 수("+$(houseType).next().text()+")", value: tmpNm});
					}
					
					//아파트 시세
					if($("#apartPriceDiv").is(":visible")) {
						var apartPrice = $("#apartPrice").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(apartPrice);
						
						tmpArParamName.push("공시지가정도-"+tmpNm);
						tmpArParams.push({
							key : "apartprice",
							value : apartPrice
						});
						
						conditions.push({category: "공시지가", value: tmpNm});
					}
					
					//노후 주택
					if($("#oldHouseDiv").is(":visible")) {
						var oldHouse = $("#oldHouse").slider("value");
						var tmpNm = $bizStatsLeftMenu.Util.sliderSmallAvgBig(oldHouse);
						
						tmpArParamName.push("노후주택 수-"+tmpNm);
						tmpArParams.push({
							key : "house_old_val",
							value : oldHouse
						});
						
						conditions.push({category: "노후주택 수("+$(houseType).next().text()+")", value: tmpNm});
					}
				}
				
				this.arParamList.push({
					idx : this.searchbtnCnt,
					params : tmpArParams,
					noneParams : tmpArNoneParams,
					names : tmpArParamName,
					filterParam : filterParam,
					unit : unit,
					conditions : conditions
				});
				return curSelectedStatsType;
			},
			
			
			/////////////////////////////////////박길섭 2018.08.10//////////////////////////////////////
			mapDataStandardChange : function(){
				$(".remove_chart").remove();
				$(".sop-infowindow").remove();
				var type="";
				var ck = $("#standardButton").hasClass("off");
				var _timer = parseInt($(".timeSelect").val())*1000;
				if(ck){
					$("#standardButton").removeClass("off");
					$("#standardButton").find(".ball").stop().animate({"left":"48px"},200,'easeOutExpo');
					$("#standardButton").find(".txt").stop().animate({"left":"4px"},200,'easeOutExpo');
					/*_introTable = setInterval(function(){
						fnObj.introTable();
					},_timer);*/
					type = 'company';
				}else{
					$("#standardButton").addClass("off");
					$("#standardButton").find(".ball").stop().animate({"left":"2px"},200,'easeOutExpo');
					$("#standardButton").find(".txt").stop().animate({"left":"34px"},200,'easeOutExpo');
					/*clearInterval(_introTable);*/
					type = 'worker';
				}
				var menuType = {
						"intro"	:0,
						"lqMap"	:1
				};
				
				
				////console.log($bizStatsDataBoard.ui.mapData[this.map_id].options.params.theme_cd);
				switch(menuType[$bizStatsLeftMenu.ui.curSelectedStatsType]){
					case 0:
					/*var map = $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId];
					$bizStatsMap.ui.clearIntroData(map);
					map.mapMode = "intro";
					map.mapMove([1007770, 1855549], 2);*/
					//시도별 기술업종현황 조회 
						if(type == "company"){
							$bizStatsMap.ui.lqMap.type='corp';
							this.doSidoIntro();
						}else{
							$bizStatsMap.ui.lqMap.type='worker';
							this.doSidoWorkerIntro();
						//$bizStatsMap.ui.doSidoIntro();
						//$technicalBizMapApi.request.openApiTechSidoWorkerInfo(map);
						}
						
							break;
					case 1:
						if(type == "company"){
								$bizStatsMap.ui.lqMap.type='corp';
								$bizStatsDataBoard.ui.doLqMapValue(type);
						}else{
								$bizStatsMap.ui.lqMap.type='worker';
								$bizStatsDataBoard.ui.doLqMapValue(type);
						
						}
					break;
				}
			},
			//////////////////////////////////////////////////////////////////////////////
			/**
			 * 
			 * @name         : setDetailStatsPanel
			 * @description  : 특정 통계버튼을 생성했을 때, 해당 통계에 대한 세부통계조건선택뷰를 생성한다.
			 * @date         : 2015. 11. 03. 2017.09.03
			 * @author	     : 김성현, 박길섭 수정
			 * @history 	 :
			 * @param type   : 현재 선택된 통계타입
			 */
			setDetailStatsPanel : function(type) {
				// mng_s 20190404 김건민
				$bizStatsLeftMenu.ui.srvLogLeftMenuNm = type;
				// mng_e 20190404 김건민
				// mng_s 20200722 김건민 (left 메뉴 닫기 때문에 추가함.)
				$(".quickBox .bottom > a.stepClose").addClass("on");
				$(".step02 .bottom > a.stepClose").stop().animate({"right":"-25px"},200);
				$(".step02 .bottom > a.stepClose").show();
				$(".step00 .bottom > a.stepClose").removeClass("on");
				$(".step03 .bottom > a.stepClose").removeClass("on");
				//$(".step02 .bottom > a.stepClose").removeClass("on");
				// mng_e 20200722 김건민
				$(".MapBefore").hide();
				$bizStatsMap.ui.lqMap.tooltip=null;//입지계수를 위한 툴팁을 출력하기위해 전역변수 선언
				$(".reportSee").show();
				if(!$(".title-list").eq(4).find("a").hasClass("on")&&!$(".title-list").eq(7).find("a").hasClass("on")){
					$('.step03').animate({"left":"-1000px"}, 200);
				}
				$(".bizLeftMenu2").show();
				$(".techLeftMenu2").hide();
				$(".step00").stop().animate({"left":"-360px"},200);
				$("#company").addClass("on");
				$("#worker").removeClass("on");
				$(".mid-nav-list li a").removeClass("on");
				$(".sideQuick.sq02").addClass("on");
				$(".mid-nav-list").hide();
				$(".nav-list li a").removeClass("on");
				// 2019-04-17 djlee 수정 시작
				$(".sensus9").hide(); 
				$(".sensus10").show();
				$(".censusTabs a").removeClass("on");
				$(".censusTabs a").each(function(i , elem){
					if($(this).html()== '10차'){
						$(this).addClass("on");
					}
				});
				$(".sensus9 a").removeClass("on");
				$(".sensus10 a").removeClass("on");
				$(".sensus10 a").each(function(i , elem){
					// mng_s 20200217 김건민 (사업체 2018년으로 수정 변경)
					if($(this).html()==companyDataYear){
						$(this).addClass("on");
					}
					// mng_e 20200217 김건민 
				});
				// 2019-04-17 djlee 수정 끝
				$("#qmdlList01>ul>li").removeClass("on");
				$bizStatsDataBoard.ui.chartDataList[0] = undefined;//보고서데이터 초기화  
				$bizStatsDataBoard.ui.mapData[0].options.params = undefined;//보고서데이터 초기화  
				$bizStatsMap.ui.lqMap.lqLayerInfo=null;//입지계수 현황 지도에서 해당 지역보기가 시도로 다시뜨게 하기위해 박길섭 추가
				//$(".leftArea").animate();//레프트메뉴 보여주는것
				////console.log($(".remove_chart").length + " ============================== 00");
				$("#mapDataStandard").css("right", "135px");///////박길섭추가
				$(".remove_chart").remove();
				$(".sop-infowindow").remove();
				this.curSelectedStatsType = type;
				
				//데이터보드 초기화
				$bizStatsDataBoard.ui.initDataBoard();
				
				//좌측 메뉴의 순서대로 숫자를 지정해야 하므로 중간에 메뉴가 들어가면
				//숫자를 모두 바꿔주어야 한다. 아니면 숫자별로 if/else를 해주면 되는데 그냥 숫자를 바꿔주는게 낳을듯...
				var menuType = {
					"intro" : 0,					//Intro) 17개 시도별 생활업종현황
					"jobArea"  : 1,				//업종별 지역현황
					"jobChange"  : 2,			//업종밀집도 변화
					"lqMap"		: 10,			//업종별 입지계수 지도
					"areaSearch" 	 : 3,	//창업지역검색
					"areaInfo" 	 : 4,			//지역 종합정보
					"publicData" 	 : 7,		//공공데이터
					"userData"	 : 8,			//나의 데이터
					"jobOpen" : 5, 	//지자체 인허가통계 (업종별 개업 현황)
					"jobBest" : 6, 	//업종별 뜨는 지역
					};
				
				var titleType = {
					"intro" : "Intro) 17개 시도별 생활업종현황",
					"jobArea"  : "생활업종 선택하기",
					"jobChange" 		 : "생활업종 선택하기",
					"areaSearch" 	 : "관심지표 선택",	
					"areaInfo" 	 : "생활업종후보지정보",				
					"publicData" 	 : "공공데이터 조회",	
					"userData"	 : "나의 데이터 불러오기",
					"jobOpen"	 : "지자체 인허가 업종 선택하기",
					"jobBest"	 : "관심지역 및 기간 선택하기" , //업종별 뜨는 지역인데 2뎁스의 타이틀을 넣는다.
					"lqMap"		: "생활업종 선택하기"
				}
				
				var inx = menuType[type];
				
				$bizStatsMap.ui.menuType = inx;
				
				$("#submenuTitle").text(titleType[type]);
				// mng_s 20190401 김건민
				//$("#submenuTitle_stop03").text("지자체인허가 업종 선택하기");//다른 메뉴는 2뎁스까지 밖에 없지만 업종별 뜨는 지역만 3뎁스여서 이렇게 처리함.
				$("#submenuTitle_stop03").text("상세 조건 선택하기");
				// mng_e 20190401 김건민
				$("#depth1Menu").find("li").removeClass("on");
				//업종별 입지계수 지도 추가로 인한 박길섭 수정
				var lqMenuType = {
						"intro" : 0,					//Intro) 17개 시도별 생활업종현황
						"jobArea"  : 1,				//업종별 지역현황
						"jobChange"  : 2,			//업종밀집도 변화
						"lqMap"		: 3,			//업종별 입지계수 지도
						"areaSearch" 	 : 4,	//창업지역검색
						"areaInfo" 	 : 5,			//지역 종합정보
						"publicData" 	 : 8,		//공공데이터
						"userData"	 : 9,			//나의 데이터
						"jobOpen" : 6, 	//지자체 인허가통계 (업종별 개업 현황)
						"jobBest" : 7, 	//업종별 뜨는 지역
						};
				$("#depth1Menu").find("li:eq("+lqMenuType[type]+")").addClass("on");
				//////////////////////
				$(".totalResult").hide();
				$("#jobOpen_use_info").hide();
				
				//버튼생성 삭제
				$(".buttonMakeBtnClass").hide();
				if(!$bizStatsMap.ui.quickBoxShowYn || $bizStatsMap.ui.quickBoxShowYn !="N"){
					if(menuType[type] == 0){
						 if($(".menuAutoClose label").hasClass("on")){
							// mng_s 20190405 김건민
							$("#companyTabDiv").hide();
							$("#companyCountDiv").hide();
							$("#companyIncreaseDiv").hide();
							$("#jobPeopleDiv").hide();
							$("#stayPeopleDiv").hide();
							$("#genderPeopleDiv").hide();
							$("#agePeopleDiv").hide();
							$("#householdDiv").hide();
							$("#occupyTypeDiv").hide();
							$("#houseLivingTypeDiv").hide();
							$("#houseTypeDiv").hide();
							$("#apartPriceDiv").hide();
							$("#oldHouseDiv").hide();
							// mng_e 20190405 김건민
							$(".nav-sidebar").stop().animate({"left":"-80px"},200);
							//$(".expand").stop().animate({"left":"-60px"},200);
						 }
						
					}
					else if(menuType[type] == 4){
						$("#submenuTitle_stop03").empty();
						$("#submenuTitle_stop03").append("후보지 선택하기");
						$("#hideClose").show();
						$("#companyTabDiv").hide();
						$("#companyCountDiv").hide();
						$("#companyIncreaseDiv").hide();
						$("#jobPeopleDiv").hide();
						$("#stayPeopleDiv").hide();
						$("#genderPeopleDiv").hide();
						$("#agePeopleDiv").hide();
						$("#householdDiv").hide();
						$("#occupyTypeDiv").hide();
						$("#houseLivingTypeDiv").hide();
						$("#houseTypeDiv").hide();
						$("#apartPriceDiv").hide();
						$("#oldHouseDiv").hide();
						$(".nav-sidebar").stop().animate({"left":"0px"},200);
						//$(".expand").stop().animate({"left":"80px"},200);
						//$(".quickBox.step01").stop().animate({"left" : "-300px"} , 200);
						$(".quickBox.step02").stop().animate({"left":"-700px"},200);
						$(".quickBox.step03").stop().animate({"left":"80px"},200);
					}
					else if(menuType[type] >= 1&&menuType[type] < 3||menuType[type]==10){
						// mng_s 20190405 김건민
						$("#companyTabDiv").hide();
						$("#companyCountDiv").hide();
						$("#companyIncreaseDiv").hide();
						$("#jobPeopleDiv").hide();
						$("#stayPeopleDiv").hide();
						$("#genderPeopleDiv").hide();
						$("#agePeopleDiv").hide();
						$("#householdDiv").hide();
						$("#occupyTypeDiv").hide();
						$("#houseLivingTypeDiv").hide();
						$("#houseTypeDiv").hide();
						$("#apartPriceDiv").hide();
						$("#oldHouseDiv").hide();
						// mng_e 20190405 김건민
						$("#hideClose").show();
						$(".nav-sidebar").stop().animate({"left":"0px"},200);
						//$(".expand").stop().animate({"left":"80px"},200);
						$(".quickBox.step02").stop().animate({"left":"80px"},200);
					}
					else if(menuType[type] == 3){
						// mng_s 20190405 김건민
						$("#companyTabDiv").hide();
						$("#companyCountDiv").hide();
						$("#companyIncreaseDiv").hide();
						$("#jobPeopleDiv").hide();
						$("#stayPeopleDiv").hide();
						$("#genderPeopleDiv").hide();
						$("#agePeopleDiv").hide();
						$("#householdDiv").hide();
						$("#occupyTypeDiv").hide();
						$("#houseLivingTypeDiv").hide();
						$("#houseTypeDiv").hide();
						$("#apartPriceDiv").hide();
						$("#oldHouseDiv").hide();
						// mng_e 20190405 김건민
						$(".reportSee").hide();
						$("#hideClose").show();
						$(".nav-sidebar").stop().animate({"left":"0px"},200);
						//$(".expand").stop().animate({"left":"80px"},200);
						$(".quickBox.step02").stop().animate({"left":"80px"},200);
					}
					else if(menuType[type] == 6){
						// mng_s 20190405 김건민
						$("#companyTabDiv").hide();
						$("#companyCountDiv").hide();
						$("#companyIncreaseDiv").hide();
						$("#jobPeopleDiv").hide();
						$("#stayPeopleDiv").hide();
						$("#genderPeopleDiv").hide();
						$("#agePeopleDiv").hide();
						$("#householdDiv").hide();
						$("#occupyTypeDiv").hide();
						$("#houseLivingTypeDiv").hide();
						$("#houseTypeDiv").hide();
						$("#apartPriceDiv").hide();
						$("#oldHouseDiv").hide();
						// mng_e 20190405 김건민
						$("#hideClose").show();
						$(".nav-sidebar").stop().animate({"left":"0px"},200);
						//$(".expand").stop().animate({"left":"80px"},200);
						//$(".quickBox.step01").stop().animate({"left" : "-300px"} , 200);
						$(".quickBox.step02").stop().animate({"left":"80px"},200);
						$("#hideClose").hide();
						$(".quickBox.step03").stop().animate({"left":"360px"},200);
					}
					else if(menuType[type] == 5){
						// mng_s 20190405 김건민
						$("#companyTabDiv").hide();
						$("#companyCountDiv").hide();
						$("#companyIncreaseDiv").hide();
						$("#jobPeopleDiv").hide();
						$("#stayPeopleDiv").hide();
						$("#genderPeopleDiv").hide();
						$("#agePeopleDiv").hide();
						$("#householdDiv").hide();
						$("#occupyTypeDiv").hide();
						$("#houseLivingTypeDiv").hide();
						$("#houseTypeDiv").hide();
						$("#apartPriceDiv").hide();
						$("#oldHouseDiv").hide();
						// mng_e 20190405 김건민
						$("#hideClose").show();
						$(".nav-sidebar").stop().animate({"left":"0px"},200);
						//$(".expand").stop().animate({"left":"80px"},200);
						$(".quickBox.step02").stop().animate({"left":"80px"},200);
						$(".quickBox.step03").stop().animate({"left":"-300px"},200);
					}
					/*//Intro 제외 2depth열기, 3depth, 4dpeht 닫기
					if(menuType[type] != 0 && menuType[type] != 4 ) {
						if(menuType[type] == 6) { //업종별 뜨는 지역은 3depth
							$(".sideQuick.sq02").stop().animate({"left":"0"},200);
							$(".nav-sidebar").stop().animate({"left":"0px"},200);
							//$(".expand").stop().animate({"left":"80px"},200);
							$(".quickBox.step01").stop().animate({"left" : "-300px"} , 200);
							$(".quickBox.step02").stop().animate({"left":"140px"},200);
							$("#hideClose").hide();
							$(".quickBox.step03").stop().animate({"left":"420px"},200);
							
						}
						else {
							$(".quickBox.step00").stop().animate({"left":"-240px"},200);
							$(".nav-sidebar").stop().animate({"left":"0px"},200);
							//$(".expand").stop().animate({"left":"80px"},200);
							$(".quickBox.step01").stop().animate({"left" : "-300px"} , 200);
							$(".sideQuick.sq02").stop().animate({"left":"0"},200);
							$(".quickBox.step02").stop().animate({"left":"140px"},200);
							$(".quickBox.step03").stop().animate({"left":"-300px"},200);
						}
						
					}
					else if(menuType[type] == 0||menuType[type] == 2){
						$(".nav-sidebar").stop().animate({"left":"-80px"},200);
					}
					else {
						$(".nav-sidebar").stop().animate({"left":"-80px"},200);
						$(".sideQuick.sq02").stop().animate({"left":"0"},200);
						$(".quickBox.step02").stop().animate({"left":"0px"},200);
						$(".quickBox.step03").stop().animate({"left":"-300px"},200);
					}*/
				}
				$bizStatsMap.ui.quickBoxShowYn = "";
				var mapId = parseInt($bizStatsMap.ui.curMapId);
				var map = $bizStatsMap.ui.mapList[mapId];
				//공유
				var shareInfo = new share.shareInfo(map, $bizStatsMap.ui);
				map.shareInfo = shareInfo;
				
				//alert("[bizStatsLeftMenu.js] menuType[type] [" + menuType[type]);
				$(".ul-area> li").removeClass("on");
				if(menuType[type] == 2){
					
					// 2020년 SGIS고도화 3차(테마코드) 시작 - 왼쪽 메뉴 중에서 업종 밀집도 변화는 "전체"가 없다.
					/*
					$("#step1").find("li").eq(0).hide();
					$("#step2").find("li").eq(0).hide();
					$("#step3").find("li").eq(0).hide();
					$("#step4").find("li").eq(0).hide();
					*/
					
					$("li.themeAll").hide();
					// 2020년 SGIS고도화 3차(테마코드) 끝
				}
				else{
					
					// 2020년 SGIS고도화 3차(테마코드) 시작
					/*
					$("#step1").find("li").eq(0).show();
					$("#step2").find("li").eq(0).show();
					$("#step3").find("li").eq(0).show();
					$("#step4").find("li").eq(0).show();
					*/
					
					$("li.themeAll").show();
					// 2020년 SGIS고도화 3차(테마코드) 끝
				}
				$(".buttonBar.ui-draggable").css("left","-1000px");//박길섭추가
				switch(menuType[type]) {
					//Intro) 17개 시도별 생활업종현황
					case 0:
						//$("#attributeMenu1").show();
						$(".nav-list li").eq(0).find("a").addClass("on");
						$(".menu_left").hide();
						//$(".menu1").show();
						//$(".nav-sidebar").find("ul>li>a").addClass("on");
						/*//$(".menu1").find("ul>li").removeClass("on");*/
						$(".mid-nav-list li:nth-child(1) a").css("height","180px");
						//$(".menu3").find("ul>li").removeClass("on");
						//$(".menu2").find("ul>li").removeClass("on");
						$(".icon01").addClass("on");
						this.doSidoIntro();
						$(".mid-nav-list li").eq(1).find("a").addClass("on");
						$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
						///////////박길섭////////////////
						$("#mapDataStandard").show();
						/*if($bizStatsMap.ui.lqMap.type == "worker"){
							$("#standardButton").removeClass("off");
							$("#standardButton").find(".ball").animate({"left":"48px"},200,'easeOutExpo');
							$("#standardButton").find(".txt").animate({"left":"4px"},200,'easeOutExpo');
							
						}*/
						//////////////////////////////
						break;
						
					//업종별 지역현황
					case 1:
						$(".sop-interactive").hide();
						//$("#attributeMenu1").show();
						//$(".nav-list li").eq(0).find("a").addClass("on");
						$(".nav-list li").eq(1).find("a").addClass("on");
						$(".menu_left").hide();
						//$(".menu1").show();
						$(".mid-nav-list li:nth-child(1) a").css("height","180px");
						/*//$(".menu1").find("ul>li").removeClass("on");*/
						//$(".menu3").find("ul>li").removeClass("on");
						//$(".menu2").find("ul>li").removeClass("on");
						$(".icon02").addClass("on");
						$(".mid-nav-list li").eq(2).find("a").addClass("on");
						this.doCompanySidoIntro();
						/*if($(".sop-interactive").css("stroke-width","1.75")){
							$(".sop-interactive").css("display","none");
						}*/
						$(".jobArea_stepBox label").removeClass("on");
						$(".jobArea_stepBox input").removeAttr("checked");
						$(".totalResult.tr01").show();
						///////////박길섭////////////////
						$("#mapDataStandard").hide();
						//////////////////////////////
						break;
						
					//업종밀집도 변화
					case 2:
						//$("#attributeMenu1").show();
						//$(".nav-list li").eq(0).find("a").addClass("on");
						$(".nav-list li").eq(2).find("a").addClass("on");
						$(".menu_left").hide();
						//$(".menu1").show();
						//$(".menu2").find("ul>li").removeClass("on");
						//$(".menu3").find("ul>li").removeClass("on");
						$(".mid-nav-list li:nth-child(1) a").css("height","180px");
						/*$(".menu4").find("ul>li").removeClass("on");*/
						$(".icon03").addClass("on");
						$(".mid-nav-list li").eq(3).find("a").addClass("on");
						this.doNormalMapInit();
						this.doCompanyDensityIntro();
						$(".jobArea_stepBox label").removeClass("on");
						$(".jobArea_stepBox input").removeAttr("checked");
						$(".totalResult.tr01").show();
						///////////박길섭////////////////
						$("#mapDataStandard").hide();
						//////////////////////////////
						//버튼생성 보이기
						//$("#buttonMakeBtn02").show();
						break;
						
						//창업지역검색
					case 3:
						$("#emdName").hide();
						$("#current-emd-select").hide();
						//$("#attributeMenu2").show();
						//$("#attributeMenu2 li").eq(1).find("a").addClass("on");
						$(".wonList01>li>a").removeClass("on");
						$bizStatsMap.ui.setTitle("조건별 지역찾기",1);
						$(".mid-nav-list li:nth-child(1) a").css("height","180px");
						$bizStatsLeftMenu.request.getDoSidoList(function() {
							$bizStatsLeftMenu.request.getDoSggList("11", function() {
							});
						});
						//$bizStatsLeftMenu.request.getDoEmdList("11","230","");
						//$(".nav-list li").eq(1).find("a").addClass("on");
						$(".nav-list li").eq(4).find("a").addClass("on");//2019-04-16 박길섭
						$(".menu_left").hide();
						//$(".menu2").show();
						//$(".menu1").find("ul>li").removeClass("on");
						//$(".menu3").find("ul>li").removeClass("on");
						/*$(".menu4").find("ul>li").removeClass("on");*/
						$("#openStatus1").addClass("on");
						//$(".buttonBar.ui-draggable").css("left","0px");//박길섭추가
						$(".buttonBar").show();
						
						this.doNormalMapInit();
						$(".totalResult.tr0"+parseInt(inx+2)).show();
						
						//버튼생성 보이기
						$("#buttonMakeBtn01").show();
						///////////박길섭////////////////
						$("#mapDataStandard").hide();
						//////////////////////////////
						break;	
						
					//지역 종합정보
					case 4:
						$("#emdName").show();
						$("#current-emd-select").show();
						//$("#attributeMenu2 li").eq(2).find("a").addClass("on");
						//$("#attributeMenu2").show();
						$("#job_recommend_3depth").css("display","block");
						$("#job_recommend_3depth_btn").css("display","block");
						$bizStatsMap.ui.setTitle("후보지 정보 보기",1);
						$(".mid-nav-list li:nth-child(1) a").css("height","180px");
						$bizStatsLeftMenu.request.getDoSidoList(function() {
							$bizStatsLeftMenu.request.getDoSggList("11", function() {
							});
						});
						$bizStatsLeftMenu.request.getDoEmdList("11","230","");
						//$(".nav-list li").eq(1).find("a").addClass("on");
						$(".nav-list li").eq(5).find("a").addClass("on");//2019-04-16 박길섭
						$(".menu_left").hide();
						//$(".menu2").show();
						//$(".menu1").find("ul>li").removeClass("on");
						//$(".menu3").find("ul>li").removeClass("on");
						/*$(".menu4").find("ul>li").removeClass("on");*/
						$(".icon04").addClass("on");
						//$(".buttonBar.ui-draggable").css("left","0px");//박길섭추가
						$(".buttonBar").show();
						this.doNormalMapInit();
						//$bizStatsLeftMenu.ui.addSearchBtn();
//						$(".totalResult.tr0"+parseInt(inx+1)).show();
						///////////박길섭////////////////
						$("#mapDataStandard").hide();
						//////////////////////////////
						//버튼생성 보이기
//						$("#buttonMakeBtn02").show();
						break;

					//공공데이터
					case 7:
						this.doNormalMapInit();
						$(".totalResult.tr06").show();
						///////////박길섭////////////////
						$("#mapDataStandard").hide();
						//////////////////////////////
						break;
						
					//나의 데이터
					case 8:
						this.doNormalMapInit();
						$(".totalResult.tr07").show();
						///////////박길섭////////////////
						$("#mapDataStandard").hide();
						//////////////////////////////
						break;
					
					//지자체 인허가(업종별 개업 현황)
					case 5:
						//$("#attributeMenu3").show();
						//$("#attributeMenu3 li").eq(1).find("a").addClass("on");
						//$(".nav-list li").eq(2).find("a").addClass("on");
						$(".nav-list li").eq(6).find("a").addClass("on");//2019-04-16 박길섭
						$(".menu_left").hide();
						//$(".menu3").show();
						$(".mid-nav-list li:nth-child(1) a").css("height","245px");
						//$(".menu1").find("ul>li").removeClass("on");
						//$(".menu2").find("ul>li").removeClass("on");
						/*$(".menu4").find("ul>li").removeClass("on");*/
						$("#openStatus2").addClass("on");
						this.doNormalMapInit();
						this.doCompanyOpenIntro();
						$(".jobArea_stepBox label").removeClass("on");
						$(".jobArea_stepBox input").removeAttr("checked");
						$(".totalResult.tr08").show();
						$("#jobOpen_use_info").show();
						///////////박길섭////////////////
						$("#mapDataStandard").hide();
						//////////////////////////////
						break;
					
					//업종별 뜨는 지역
					case 6:
						//$("#attributeMenu3").show();
						//$("#attributeMenu3 li").eq(2).find("a").addClass("on");
						//$(".nav-list li").eq(2).find("a").addClass("on");
						$(".nav-list li").eq(7).find("a").addClass("on");//2019-04-16 박길섭
						$(".menu_left").hide();
						//$(".menu3").show();
						//$(".menu1").find("ul>li").removeClass("on");
						//$(".menu2").find("ul>li").removeClass("on");
						/*$(".menu4").find("ul>li").removeClass("on");*/
						$(".icon08").addClass("on");
						$(".mid-nav-list li:nth-child(1) a").css("height","245px");
						this.doNormalMapInit();
						this.doCompanyBestIntro();
						$(".jobArea_stepBox label").removeClass("on");
						$(".jobArea_stepBox input").removeAttr("checked");
						$(".totalResult.tr09").show();
						$(".totalResult.tr10").show();
						//$("#jobBest_use_info").show();
						$("#job_recommend_3depth").hide(); //생활업종 후보지 검색의 3뎁스 메뉴 하이드
						$("#job_recommend_3depth_btn").hide(); ////생활업종 후보지 검색의 3뎁스 검색버튼생성 하이드
						///////////박길섭////////////////
						$("#mapDataStandard").hide();
						//////////////////////////////
						
						$bizStatsLeftMenu.ui.getSidoList("inter-recommend", "00", "999");
						
						if ($bizStatsLeftMenu.ui.job_best_from_reload_val=="") { //최초 로딩시
							$("#job_best_from").html("<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170101'>2017년 1월 1일"); 
							$("#job_best_to").html("<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20171231'>2017년 12월 31일");
						} else { //한번이상 조회했을 경우 이전에 조회된 기간을 다시 세팅한다.
							$("#job_best_from").html($bizStatsLeftMenu.ui.job_best_from_reload_val); 
							$("#job_best_to").html($bizStatsLeftMenu.ui.job_best_to_reload_val);
						}
						
						
						$bizStatsMap.ui.jobBestTitle = $(".jobArea_stepBox label.on").text();
						
						break;
					case 10: // 업종별 입지계수 지도
						$("#lqMapBizCate").show();
						$bizStatsMap.ui.lqMap.tooltip="lqMap";
						//$("#attributeMenu1").show();
						$bizStatsMap.ui.setTitle("업종별 입지계수 지도",1);
						//$(".nav-list li").eq(0).find("a").addClass("on");
						$(".nav-list li").eq(3).find("a").addClass("on");
						$(".menu_left").hide();
						//$(".menu1").show();
						$(".mid-nav-list li:nth-child(1) a").css("height","180px");
						/*//$(".menu1").find("ul>li").removeClass("on");*/
						//$(".menu3").find("ul>li").removeClass("on");
						//$(".menu2").find("ul>li").removeClass("on");
						$(".icon09").addClass("on");
						this.doNormalMapInit();
						map.mapMove([1007770, 1855549], 2);
						map.gMap.setMaxZoom(12);
						map.gMap.setMinZoom(2);
						map.gMap.scrollWheelZoom.enable();
						$(".buttonBar").hide();
						$(".mid-nav-list li").eq(4).find("a").addClass("on");
//						$bizStatsMap.ui.lqMap.year='2017';//년도 초기화 나중에 수정필요//2019-04-12 박길섭
						// mng_s 20200217 김건민 (사업체 년도 수정)
						$bizStatsMap.ui.lqMap.year=companyDataYear;//년도 초기화 나중에 수정필요//2019-04-12 박길섭
						// mng_e 20200217 김건민
						$("#lqInfoYearSettingList > li > a").removeClass("on");
						$("#lqInfoYear_2016 > a").addClass("on");
						$("#countryOrSido").hide();
						map.mapMode = "color";
						$("#bizLqPrevButton").hide();
						$("#lqIncreaseTab").hide();
						//$bizStatsMap.ui.setChangeColorMode();
//						this.doLqMap();
						$(".jobArea_stepBox label").removeClass("on");
						$(".jobArea_stepBox input").removeAttr("checked");
						$(".totalResult.tr01").show();
						//$bizStatsMap.ui.whiteMap = false;
						///////////박길섭////////////////
						$("#mapDataStandard").show();
						/*if($bizStatsMap.ui.lqMap.type == "worker"||$bizStatsMap.ui.lqMap.type=="worker_lq"){
							$("#standardButton").removeClass("off");
							$("#standardButton").find(".ball").animate({"left":"48px"},200,'easeOutExpo');
							$("#standardButton").find(".txt").animate({"left":"4px"},200,'easeOutExpo');
						}*/
						//////////////////////////////
						break;
						
						
				}
			},
			
			//////////////////////////////////////////////////////////////////////////////
			/**
			 * 
			 * @name         : setDetailStatsPanel2
			 * @description  : 조건별 지역찾기의 결과에서 데이터보드의 지역상세정보보기 버튼 클릭시 후보지 정보보기로 넘어가야 되서 추가함
			 * @date         : 20190403
			 * @author	     : 김준하
			 * @history 	 :
			 * @param type   : 현재 선택된 통계타입 areaInfo 	 : 4//후보지 정보보기
			 */
			setDetailStatsPanel2 : function(type) {
				$(".MapBefore").hide();
				$bizStatsMap.ui.lqMap.tooltip=null;//입지계수를 위한 툴팁을 출력하기위해 전역변수 선언
				$(".reportSee").show();
				if(!$(".title-list").eq(4).find("a").hasClass("on")&&!$(".title-list").eq(7).find("a").hasClass("on")){
					$('.step03').animate({"left":"-1000px"}, 200);
				}
				$(".bizLeftMenu2").show();
				$(".techLeftMenu2").hide();
				$(".step00").stop().animate({"left":"-360px"},200);
				$("#company").addClass("on");
				$("#worker").removeClass("on");
				$(".mid-nav-list li a").removeClass("on");
				$(".sideQuick.sq02").addClass("on");
				$(".mid-nav-list").hide();
				$(".nav-list li a").removeClass("on");
				$("#qmdlList01>ul>li").removeClass("on");
				//$bizStatsDataBoard.ui.chartDataList[0] = undefined;//보고서데이터 초기화  
				//$bizStatsDataBoard.ui.mapData[0].options.params = undefined;//보고서데이터 초기화  
				$bizStatsMap.ui.lqMap.lqLayerInfo=null;//입지계수 현황 지도에서 해당 지역보기가 시도로 다시뜨게 하기위해 박길섭 추가
				$("#mapDataStandard").css("right", "135px");///////박길섭추가
				$(".remove_chart").remove();
				$(".sop-infowindow").remove();
				this.curSelectedStatsType = type;
				
				//데이터보드 초기화
				//$bizStatsDataBoard.ui.initDataBoard();
				
				//좌측 메뉴의 순서대로 숫자를 지정해야 하므로 중간에 메뉴가 들어가면
				//숫자를 모두 바꿔주어야 한다. 아니면 숫자별로 if/else를 해주면 되는데 그냥 숫자를 바꿔주는게 낳을듯...
				var menuType = {
					"intro" : 0,					//Intro) 17개 시도별 생활업종현황
					"jobArea"  : 1,				//업종별 지역현황
					"jobChange"  : 2,			//업종밀집도 변화
					"lqMap"		: 10,			//업종별 입지계수 지도
					"areaSearch" 	 : 3,	//창업지역검색
					"areaInfo" 	 : 4,			//지역 종합정보
					"publicData" 	 : 7,		//공공데이터
					"userData"	 : 8,			//나의 데이터
					"jobOpen" : 5, 	//지자체 인허가통계 (업종별 개업 현황)
					"jobBest" : 6, 	//업종별 뜨는 지역
					};
				
				var titleType = {
					"intro" : "Intro) 17개 시도별 생활업종현황",
					"jobArea"  : "생활업종 선택하기",
					"jobChange" 		 : "생활업종 선택하기",
					"areaSearch" 	 : "관심지표 선택",	
					"areaInfo" 	 : "생활업종후보지정보",				
					"publicData" 	 : "공공데이터 조회",	
					"userData"	 : "나의 데이터 불러오기",
					"jobOpen"	 : "지자체 인허가 업종 선택하기",
					"jobBest"	 : "관심지역 및 기간 선택하기" , //업종별 뜨는 지역인데 2뎁스의 타이틀을 넣는다.
					"lqMap"		: "생활업종 선택하기"
				}
				
				var inx = menuType[type];
				
				$bizStatsMap.ui.menuType = inx;
				
				$("#submenuTitle").text(titleType[type]);
				// mng_s 20190401 김건민
				//$("#submenuTitle_stop03").text("지자체인허가 업종 선택하기");//다른 메뉴는 2뎁스까지 밖에 없지만 업종별 뜨는 지역만 3뎁스여서 이렇게 처리함.
				$("#submenuTitle_stop03").text("상세 조건 선택하기");
				// mng_e 20190401 김건민
				$("#depth1Menu").find("li").removeClass("on");
				//업종별 입지계수 지도 추가로 인한 박길섭 수정
				var lqMenuType = {
						"intro" : 0,					//Intro) 17개 시도별 생활업종현황
						"jobArea"  : 1,				//업종별 지역현황
						"jobChange"  : 2,			//업종밀집도 변화
						"lqMap"		: 3,			//업종별 입지계수 지도
						"areaSearch" 	 : 4,	//창업지역검색
						"areaInfo" 	 : 5,			//지역 종합정보
						"publicData" 	 : 8,		//공공데이터
						"userData"	 : 9,			//나의 데이터
						"jobOpen" : 6, 	//지자체 인허가통계 (업종별 개업 현황)
						"jobBest" : 7, 	//업종별 뜨는 지역
						};
				$("#depth1Menu").find("li:eq("+lqMenuType[type]+")").addClass("on");
				//////////////////////
				$(".totalResult").hide();
				$("#jobOpen_use_info").hide();
				
				//버튼생성 삭제
				$(".buttonMakeBtnClass").hide();
				if(!$bizStatsMap.ui.quickBoxShowYn || $bizStatsMap.ui.quickBoxShowYn !="N"){
					if(menuType[type] == 0){
						 if($(".menuAutoClose label").hasClass("on")){
							 $(".nav-sidebar").stop().animate({"left":"-80px"},200);
							 //$(".expand").stop().animate({"left":"-60px"},200);
						 }
						
					}
					else if(menuType[type] == 4){
						$("#submenuTitle_stop03").empty();
						$("#submenuTitle_stop03").append("후보지 선택하기");
						$("#hideClose").show();
						$("#companyTabDiv").hide();
						$("#companyCountDiv").hide();
						$("#companyIncreaseDiv").hide();
						$("#jobPeopleDiv").hide();
						$("#stayPeopleDiv").hide();
						$("#genderPeopleDiv").hide();
						$("#agePeopleDiv").hide();
						$("#householdDiv").hide();
						$("#occupyTypeDiv").hide();
						$("#houseLivingTypeDiv").hide();
						$("#houseTypeDiv").hide();
						$("#apartPriceDiv").hide();
						$("#oldHouseDiv").hide();
						$(".nav-sidebar").stop().animate({"left":"0px"},200);
						//$(".expand").stop().animate({"left":"80px"},200);
						//$(".quickBox.step01").stop().animate({"left" : "-300px"} , 200);
						$(".quickBox.step02").stop().animate({"left":"-700px"},200);
						$(".quickBox.step03").stop().animate({"left":"80px"},200);
					}
					else if(menuType[type] >= 1&&menuType[type] < 3||menuType[type]==10){
						$("#hideClose").show();
						$(".nav-sidebar").stop().animate({"left":"0px"},200);
						//$(".expand").stop().animate({"left":"80px"},200);
						$(".quickBox.step02").stop().animate({"left":"80px"},200);
					}
					else if(menuType[type] == 3){
						$(".reportSee").hide();
						$("#hideClose").show();
						$(".nav-sidebar").stop().animate({"left":"0px"},200);
						//$(".expand").stop().animate({"left":"80px"},200);
						$(".quickBox.step02").stop().animate({"left":"80px"},200);
					}
					else if(menuType[type] == 6){
						$("#hideClose").show();
						$(".nav-sidebar").stop().animate({"left":"0px"},200);
						//$(".expand").stop().animate({"left":"80px"},200);
						//$(".quickBox.step01").stop().animate({"left" : "-300px"} , 200);
						$(".quickBox.step02").stop().animate({"left":"80px"},200);
						$("#hideClose").hide();
						$(".quickBox.step03").stop().animate({"left":"360px"},200);
					}
					else if(menuType[type] == 5){
						$("#hideClose").show();
						$(".nav-sidebar").stop().animate({"left":"0px"},200);
						//$(".expand").stop().animate({"left":"80px"},200);
						$(".quickBox.step02").stop().animate({"left":"80px"},200);
						$(".quickBox.step03").stop().animate({"left":"-300px"},200);
					}
					
				}
				$bizStatsMap.ui.quickBoxShowYn = "";
				var mapId = parseInt($bizStatsMap.ui.curMapId);
				var map = $bizStatsMap.ui.mapList[mapId];
				//공유
				var shareInfo = new share.shareInfo(map, $bizStatsMap.ui);
				map.shareInfo = shareInfo;
				
				//alert("[bizStatsLeftMenu.js] menuType[type] [" + menuType[type]);
				$(".ul-area> li").removeClass("on");
				if(menuType[type] == 2){
					$("#step1").find("li").eq(0).hide();
					$("#step2").find("li").eq(0).hide();
					$("#step3").find("li").eq(0).hide();
					$("#step4").find("li").eq(0).hide();
				}
				else{
					$("#step1").find("li").eq(0).show();
					$("#step2").find("li").eq(0).show();
					$("#step3").find("li").eq(0).show();
					$("#step4").find("li").eq(0).show();
				}
				$(".buttonBar.ui-draggable").css("left","-1000px");//박길섭추가
				switch(menuType[type]) {
					//Intro) 17개 시도별 생활업종현황
					case 0:
						$(".nav-list li").eq(0).find("a").addClass("on");
						$(".menu_left").hide();
						$(".mid-nav-list li:nth-child(1) a").css("height","180px");
						$(".icon01").addClass("on");
						this.doSidoIntro();
						$(".mid-nav-list li").eq(1).find("a").addClass("on");
						$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
						///////////박길섭////////////////
						$("#mapDataStandard").show();
						//////////////////////////////
						break;
						
					//업종별 지역현황
					case 1:
						$(".sop-interactive").hide();
						$(".nav-list li").eq(1).find("a").addClass("on");
						$(".menu_left").hide();
						$(".mid-nav-list li:nth-child(1) a").css("height","180px");
						$(".icon02").addClass("on");
						$(".mid-nav-list li").eq(2).find("a").addClass("on");
						this.doCompanySidoIntro();
						$(".jobArea_stepBox label").removeClass("on");
						$(".jobArea_stepBox input").removeAttr("checked");
						$(".totalResult.tr01").show();
						///////////박길섭////////////////
						$("#mapDataStandard").hide();
						//////////////////////////////
						break;
						
					//업종밀집도 변화
					case 2:
						$(".nav-list li").eq(2).find("a").addClass("on");
						$(".menu_left").hide();
						$(".mid-nav-list li:nth-child(1) a").css("height","180px");
						$(".icon03").addClass("on");
						$(".mid-nav-list li").eq(3).find("a").addClass("on");
						this.doNormalMapInit();
						this.doCompanyDensityIntro();
						$(".jobArea_stepBox label").removeClass("on");
						$(".jobArea_stepBox input").removeAttr("checked");
						$(".totalResult.tr01").show();
						///////////박길섭////////////////
						$("#mapDataStandard").hide();
						//////////////////////////////
						//버튼생성 보이기
						break;
						
						//창업지역검색
					case 3:
						$("#emdName").hide();
						$("#current-emd-select").hide();
						$(".wonList01>li>a").removeClass("on");
						$bizStatsMap.ui.setTitle("조건별 지역찾기",1);
						$(".mid-nav-list li:nth-child(1) a").css("height","180px");
						$bizStatsLeftMenu.request.getDoSidoList(function() {
							$bizStatsLeftMenu.request.getDoSggList("11", function() {
							});
						});
						$(".nav-list li").eq(3).find("a").addClass("on");//2019-03-13 박길섭
						$(".menu_left").hide();
						$("#openStatus1").addClass("on");
						$(".buttonBar").show();
						
						this.doNormalMapInit();
						$(".totalResult.tr0"+parseInt(inx+2)).show();
						
						//버튼생성 보이기
						$("#buttonMakeBtn01").show();
						///////////박길섭////////////////
						$("#mapDataStandard").hide();
						//////////////////////////////
						break;	
						
					//지역 종합정보
					case 4:
						$("#emdName").show();
						$("#current-emd-select").show();
						$("#job_recommend_3depth").css("display","block");
						$("#job_recommend_3depth_btn").css("display","block");
						$bizStatsMap.ui.setTitle("후보지 정보 보기",1);
						$(".mid-nav-list li:nth-child(1) a").css("height","180px");
						$bizStatsLeftMenu.request.getDoSidoList(function() {
							$bizStatsLeftMenu.request.getDoSggList("11", function() {
							});
						});
						$bizStatsLeftMenu.request.getDoEmdList("11","230","");
						$(".nav-list li").eq(4).find("a").addClass("on");//2019-03-13 박길섭
						$(".menu_left").hide();
						$(".icon04").addClass("on");
						$(".buttonBar").show();
						//this.doNormalMapInit();
						$(".totalResult.tr0"+parseInt(inx+1)).show();
						///////////박길섭////////////////
						$("#mapDataStandard").hide();
						//////////////////////////////
						//버튼생성 보이기
//						$("#buttonMakeBtn02").show();
						break;

					//공공데이터
					case 7:
						this.doNormalMapInit();
						$(".totalResult.tr06").show();
						///////////박길섭////////////////
						$("#mapDataStandard").hide();
						//////////////////////////////
						break;
						
					//나의 데이터
					case 8:
						this.doNormalMapInit();
						$(".totalResult.tr07").show();
						///////////박길섭////////////////
						$("#mapDataStandard").hide();
						//////////////////////////////
						break;
					
					//지자체 인허가(업종별 개업 현황)
					case 5:
						$(".nav-list li").eq(5).find("a").addClass("on");//2019-03-13 박길섭
						$(".menu_left").hide();
						$(".mid-nav-list li:nth-child(1) a").css("height","245px");
						$("#openStatus2").addClass("on");
						this.doNormalMapInit();
						this.doCompanyOpenIntro();
						$(".jobArea_stepBox label").removeClass("on");
						$(".jobArea_stepBox input").removeAttr("checked");
						$(".totalResult.tr08").show();
						$("#jobOpen_use_info").show();
						///////////박길섭////////////////
						$("#mapDataStandard").hide();
						//////////////////////////////
						break;
					
					//업종별 뜨는 지역
					case 6:
						$(".nav-list li").eq(6).find("a").addClass("on");//2019-03-13 박길섭
						$(".menu_left").hide();
						$(".icon08").addClass("on");
						$(".mid-nav-list li:nth-child(1) a").css("height","245px");
						this.doNormalMapInit();
						this.doCompanyBestIntro();
						$(".jobArea_stepBox label").removeClass("on");
						$(".jobArea_stepBox input").removeAttr("checked");
						$(".totalResult.tr09").show();
						$(".totalResult.tr10").show();
						$("#job_recommend_3depth").hide(); //생활업종 후보지 검색의 3뎁스 메뉴 하이드
						$("#job_recommend_3depth_btn").hide(); ////생활업종 후보지 검색의 3뎁스 검색버튼생성 하이드
						///////////박길섭////////////////
						$("#mapDataStandard").hide();
						//////////////////////////////
						
						$bizStatsLeftMenu.ui.getSidoList("inter-recommend", "00", "999");
						
						if ($bizStatsLeftMenu.ui.job_best_from_reload_val=="") { //최초 로딩시
							$("#job_best_from").html("<input type='hidden' id='param_job_best_from' name='param_job_best_from' value='20170101'>2017년 1월 1일"); 
							$("#job_best_to").html("<input type='hidden' id='param_job_best_to' name='param_job_best_to' value='20171231'>2017년 12월 31일");
						} else { //한번이상 조회했을 경우 이전에 조회된 기간을 다시 세팅한다.
							$("#job_best_from").html($bizStatsLeftMenu.ui.job_best_from_reload_val); 
							$("#job_best_to").html($bizStatsLeftMenu.ui.job_best_to_reload_val);
						}
						
						
						$bizStatsMap.ui.jobBestTitle = $(".jobArea_stepBox label.on").text();
						
						break;
					case 10: // 업종별 입지계수 지도
						$("#lqMapBizCate").show();
						$bizStatsMap.ui.lqMap.tooltip="lqMap";
						$bizStatsMap.ui.setTitle("업종별 입지계수 지도",1);
						$(".nav-list li").eq(3).find("a").addClass("on");
						$(".menu_left").hide();
						$(".mid-nav-list li:nth-child(1) a").css("height","180px");
						$(".icon09").addClass("on");
						this.doNormalMapInit();
						map.mapMove([1007770, 1855549], 2);
						map.gMap.setMaxZoom(12);
						map.gMap.setMinZoom(2);
						map.gMap.scrollWheelZoom.enable();
						$(".buttonBar").hide();
						$(".mid-nav-list li").eq(4).find("a").addClass("on");
						$bizStatsMap.ui.lqMap.year='2016';//년도 초기화 나중에 수정필요
						$("#lqInfoYearSettingList > li > a").removeClass("on");
						$("#lqInfoYear_2016 > a").addClass("on");
						$("#countryOrSido").hide();
						map.mapMode = "color";
						$("#bizLqPrevButton").hide();
						$("#lqIncreaseTab").hide();
						$(".jobArea_stepBox label").removeClass("on");
						$(".jobArea_stepBox input").removeAttr("checked");
						$(".totalResult.tr01").show();
						///////////박길섭////////////////
						$("#mapDataStandard").show();
						//////////////////////////////
						break;
						
						
				}
			},
			
			/**
			 * 
			 * @name         : companyTab
			 * @description  : 사업체 업종선택 탭 선택시.
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type   : 현재 선택된 탭
			 */
			companyTab : function(type) {
				this.curSelectedCompany = type;
			},
			
			/**
			 * 
			 * @name         : deleteSearchBtn
			 * @description  : 생성된 조건검색버튼을 삭제한다.
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param searchbtnCnt   : 조회버튼 고유값
			 */
			deleteSearchBtn : function(value) {
				var btn_id = $("#dragItem_" + value).find("a").attr("id");
				$("#dragItem_" + value).remove();

				// 삭제된 조회버튼의 파라미터정보를 삭제한다.
				for (var i = 0; i < this.arParamList.length; i++) {
					if (this.arParamList[i].idx == value) {
						this.arParamList.splice(this.arParamList.indexOf(this.arParamList[i]), 1);
						break;
					}
				}
				
				//지도를 조회한 버튼 아이디 초기화
				if(this.curSearchBtnArray["one"] == btn_id) {
					this.curSearchBtnArray["one"] = "";
				}
				if(this.curSearchBtnArray["two"] == btn_id) {
					this.curSearchBtnArray["two"] = "";
				}
				if(this.curSearchBtnArray["three"] == btn_id) {
					this.curSearchBtnArray["three"] = "";
				}

				//버튼 카운트
				this.getBtnCnt();
			},
			
			/**
			 * 
			 * @name         : btnValidationCheck
			 * @description  : 조건버튼으로 만들어진 통계정보에 대한 파라미터정보 유효성 검사. 
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param curSelectedStatsType : 선택된 통계정보 타입
			 */
			btnValidationCheck : function(curSelectedStatsType) {
				//창업지역검색
				if (curSelectedStatsType == "areaSearch") {
					
					if($(".wonList01").find(".on").length > 5) {
						messageAlert.open("알림", "최대 5개까지만 선택 가능합니다.");
						return false;
					}else if ($(".wonList01").find(".on").length == 0) {
						messageAlert.open("알림", "최소 1개이상 조건을 선택하세요.");
						return false;
					}
					
					//사업체수, 사업체증감이 선택되어 있을경우
					if($("#companyCountAtag").hasClass("on") || $("#companyIncreaseAtag").hasClass("on")) {
						var str = "";
						// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존코드 주석처리 (pse)
						/*
						//요식업
						if(this.curSelectedCompany == "food") {
							$("input[name='rd_sch_food']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
							
						//도소매
						} else if(this.curSelectedCompany == "retail") {
							$("input[name='rd_sch_retail']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
						
						//서비스
						} else if(this.curSelectedCompany == "service") {
							$("input[name='rd_sch_service']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
						
						//숙박업
						} else if(this.curSelectedCompany == "hotel") {
							$("input[name='rd_sch_hotel']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
						}
						*/
						// 2020년 SGIS고도화 3차(테마코드) 끝 - 기존코드 주석처리 (pse)
						if($("input[type='checkbox'][name^='rd_sch'][checked='checked']").length) { str = "check";	} // 2020년 SGIS고도화 3차(테마코드) - 조건별 지역찾기에서 왼쪽 메뉴의 input name 파라미터 값이 새로운 대분류 코드를 사용하면서 변화되어, 코드 추가  (pse)
						
						if(str == "") {
							messageAlert.open("알림", "사업체 업종은 필수입니다.");
							return false;
						}
					}
					
					// 성별인구
					if($("#genderPeopleAtag").hasClass("on")) {
						var str = "";
						$("input[name='population_gender']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "성별은 필수입니다.");
							return false;
						}
					}
					
					// 연령별인구
					if($("#agePeopleAtag").hasClass("on")) {
						var str = "";
						$("input[name='rd_age']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "연령은 필수입니다.");
							return false;
						}
					}
					
					// 가구유형
					if($("#householdAtag").hasClass("on")) {
						var str = "";
						$("input[name='household_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "세대구성은 필수입니다.");
							return false;
						}
					}
					
					//점유형태
					if($("#occupyTypeAtag").hasClass("on")) {
						var str = "";
						$("input[name='ocptn_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "점유형태는 필수입니다.");
							return false;
						}
					}
					
					//거주주택, 노후주택이 선택되어 있을 경우
					if($("#houseTypeAtag").hasClass("on") || $("#oldHouseAtag").hasClass("on") ) {
						var str = "";
						$("input[name='house_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "거주주택 유형은 필수입니다.");
							return false;
						}
					}
				}
				
				//창업지역검색
				else if (curSelectedStatsType == "jobChange") {
					var str = "";
					$(".jobArea_stepBox input").each(function() {
						if($(this).attr("checked") == "checked") {
							str = "check";
						}
					});
					if(str == "") {
						messageAlert.open("알림", "생활업종을 선택하세요.");
						return false;
					}
				}
					
				return true;
			},
			
			/**
			 * 
			 * @name         : areaSearchCondition
			 * @description  : 창업지역 찾기 선택
			 * @date         : 2015. 11. 04.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type : 선택된 통계정보 타입
			 */
			areaSearchCondition : function(type) {
				
				/*var checkLength = 0;
				$(".wonList01").each(function(i,item_list){
					$(item_list).find('li>a').each(function(j,item){
						var aItem = item.getElementsByTagName("a");
						//console.log(aItem);
					})
				});*/
//				//console.log(type);
				var wonList01 = document.getElementById("wonList01");
				var liItems = wonList01.getElementsByTagName("li");
				var onCount = 0;
				for(var i =0; i < liItems.length; i ++){
					var aItem = liItems[i].getElementsByTagName("a")[0].className;
					//var aId = liItems[i].getElementsByTagName("a")[0].className;
					if(aItem == "on"){
						onCount = onCount + 1;
					}
				}
//				//console.log(onCount);
				
				if(onCount > 5) {
					messageAlert.open("알림", "최대 5개까지만 선택 가능합니다.");
					if($("#currentAtag").hasClass("on")) {
							$("#currentAtag").removeClass("on");
						}
				}else if ($(".wonList01").find(".on").length == 0) {
					messageAlert.open("알림", "최소 1개이상 조건을 선택하세요.");
					
					//mng_s 20190403 업종통계지도 > 조건별지역찾기 > 메뉴선택 후 선택 해제시 
					//3depth의 선택조건이 그대로 남아있어서 모두 해제하는 코드를 삽입함.
					$("#companyTabDiv").hide();
					$("#companyCountDiv").hide();
					$("#companyIncreaseDiv").hide();
					$("#jobPeopleDiv").hide();
					$("#stayPeopleDiv").hide();
					$("#genderPeopleDiv").hide();
					$("#agePeopleDiv").hide();
					$("#householdDiv").hide();
					$("#occupyTypeDiv").hide();
					$("#houseLivingTypeDiv").hide();
					$("#houseTypeDiv").hide();
					$("#apartPriceDiv").hide();
					$("#oldHouseDiv").hide();
					
					//$("#job_recommend_3depth").css("display","none");
					//$("#job_recommend_3depth_btn").css("display","none");
					
					return false;
				}
				
				
				if($("#"+type+"Atag").hasClass("on")) {
					$("#"+type+"Div").show();
					//직장인구일 경우 거주인구, 성별, 연령별 해제
					if(type == "jobPeople") {
						$("#stayPeopleAtag").removeClass("on");
						$("#genderPeopleAtag").removeClass("on");
						$("#agePeopleAtag").removeClass("on");
						$("#stayPeopleDiv").hide();
						$("#genderPeopleDiv").hide();
						$("#agePeopleDiv").hide();
						
					//거주인구, 성별, 연령별일 경우 직장인구 해제
					} else if(type == "stayPeople" || type == "genderPeople" || type == "agePeople") {
						$("#jobPeopleAtag").removeClass("on");
						$("#jobPeopleDiv").hide();
					}
				} else {
					$("#"+type+"Div").hide();
				}
				
				//사업체수, 사업체증감이 선택되어 있을경우
				if($("#companyCountAtag").hasClass("on") || $("#companyIncreaseAtag").hasClass("on")) {
					$("#companyTabDiv").show();		//사업체 업종 선택 필수
				} else {
					$("#companyTabDiv").hide();
				}
					
				//거주주택, 노후주택이 선택되어 있을 경우
				if($("#houseTypeAtag").hasClass("on") || $("#oldHouseAtag").hasClass("on") ) {
					$("#houseLivingTypeDiv").show();		//사업체 업종 선택 필수
				} else {
					$("#houseLivingTypeDiv").hide();
				}
				
				//3Depth 열기
				this.viewThreeDepth();
			},
			
			/**
			 * 
			 * @name         : viewThreeDepth
			 * @description  : 3Depth 메뉴를 show
			 * @date         : 2015. 11. 03. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			viewThreeDepth : function() {
				//메뉴버튼
				if(!$(".wonList01>li>a").hasClass("on")){
					messageAlert.open("알림", "최소 1개이상 조건을 선택하세요.");
					return;
				}
				// mng_s 20200723 김건민
				$(".quickBox .bottom > a.stepClose").addClass("on");
				$(".step00 .stepClose").removeClass("on");
				// mng_e 20200723 김건민
				$("#hideClose").hide();
				$("#job_recommend_3depth").css("display","block");
				$("#job_recommend_3depth_btn").css("display","block");
				$(".sideQuick.sq02").stop().animate({"left":"0"},200);
				$("#areaSearchDetailDiv").stop().animate({"left":"360px"},200);
			},
			
			/**
			 * 
			 * @name         : commonDataList
			 * @description  : 공공데이터, 나의데이터 목록 가져오기
			 * @date         : 2015. 12. 09. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			commonDataList : function() {
				$publicDataBoard.ui.leftMenuList($bizStatsMap.ui);		//공공데이터 목록
				$mydataDataBoard.ui.delegateSetting($bizStatsMap.ui);			//나의데이터 세팅
				$publicDataBoard.ui.delegateSetting($bizStatsMap.ui);				//공공데이터 세팅
			},
			
			/**
			 * 
			 * @name         : doMaxSize
			 * @description  : 맵을 최대화한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doMaxSize : function() {
				$bizStatsMap.ui.doMaxSize();
			},
			
			/**
			 * 
			 * @name         : doAddMap
			 * @description  : 맵을 추가한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doAddMap : function() {
				$bizStatsMap.ui.doAddMap();
			},
			
			/**
			 * 
			 * @name         : doCombineMap
			 * @description  : 범례결합창을 표출한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doCombineMap : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId) + 1;
				$bizStatsMap.ui.doCombineMap(mapId);
			},
			
			/**
			 * 
			 * @name         : doBookMark
			 * @description  : 북마크를 수행한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doBookMark : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId) + 1;
				$bizStatsMap.ui.doBookMark(mapId);
			},
			
			/**
			 * 
			 * @name         : doShare
			 * @description  : 공유를 수행한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doShare : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId) + 1;
				$bizStatsMap.ui.doShare(mapId);
			},
			
			/**
			 * 
			 * @name         : doReport
			 * @description  : 보고서를 생성한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReport : function() {
				var mapId = parseInt($bizStatsMap.ui.curMapId) + 1;
				$bizStatsMap.ui.reportDataSet(mapId);
			},
			
			/**
			 * 
			 * @name         : doHelp
			 * @description  : 도움말 페이지로 링크한다.
			 * @date         : 2015. 11. 02. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doHelp : function() {
				messageAlert.open("알림", "준비중입니다.");
			},
			
			/**
			 * 
			 * @name         : showNumberClick
			 * @description  : 통계값 표출유무 버튼 클릭 시
			 * @date         : 2016. 01. 14. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			showNumberClick : function() {
				var map_id = $bizStatsMap.ui.curMapId;
				var legend = $bizStatsMap.ui.mapList[map_id].legend;
				//통계표출 on일 경우 off로 변경
				if(legend.numberData) {
					$("#showNumberBtn").removeClass("on");
					$("#showNumberBtn").text("off");
				} else {	//통계표출 off일 경우 on으로 변경
					$("#showNumberBtn").addClass("on");
					$("#showNumberBtn").text("on");
				}
				//통계값 표출유무 설정 호출
				legend.showNumberData();
			},
			
			/**
			 * 
			 * @name         : showNumberSetting
			 * @description  : 통계값 표출유무 연동 (범례에서 선택 시, 지도 선택 시)
			 * @date         : 2016. 01. 14. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			showNumberSetting : function() {
				var map_id = $bizStatsMap.ui.curMapId;
				var legend = $bizStatsMap.ui.mapList[map_id].legend;
				//통계표출 on일 경우
				if(legend.numberData) {
					$("#showNumberBtn").addClass("on");
					$("#showNumberBtn").text("on");
				} else {	//통계표출 off일 경우
					$("#showNumberBtn").removeClass("on");
					$("#showNumberBtn").text("off");
				}
			},
			
			/**
			 * @name		: changeFindingType
			 * @description	: 조회타입설정 변경
			 * @date		: 2016.08.19
			 * @author		: 김재상
			*/
			changeFindingType : function(type){
				var map_id = $bizStatsMap.ui.curMapId;
				var legend = $bizStatsMap.ui.mapList[map_id].legend;
				
				$(".sqTabs>a").removeClass("on");
				// 통계버튼목록
				if(type == 1){
					$(".sqTabs>a#statisbtn").addClass("on");
				// 드래그앤드롭
				}else if(type == 2){
					$(".sqTabs>a#dragbtn").addClass("on");
				}
			},
			
			/**
			 * @name		: getCurSearchParam
			 * @description	: 현재 조회중인 버튼 반환
			 * @date		: 2016.08.19
			 * @author		: 김재상
			 */
			getCurSearchParam : function(){
				
				var firstMapParamIdx = parseInt($bizStatsLeftMenu.ui.curSearchBtnArray.one.split("-")[1]);
				var secondMapParamIdx = parseInt($bizStatsLeftMenu.ui.curSearchBtnArray.two.split("-")[1]);
				var thirdMapParamIdx = parseInt($bizStatsLeftMenu.ui.curSearchBtnArray.three.split("-")[1]);
				var arParamList = $bizStatsLeftMenu.ui.arParamList;
				
				var curSearchParam = {};
				
				for(var i=0; i<arParamList.length; i++){
					switch(arParamList[i].idx){
						case firstMapParamIdx:
							curSearchParam.one = arParamList[i];
							break;
						case secondMapParamIdx:
							curSearchParam.two = arParamList[i];
							break;
						case thirdMapParamIdx:
							curSearchParam.three = arParamList[i];
							break;
					} 
				}
				
				return curSearchParam;
			}
			
			
			
	};
	$bizStatsLeftMenu.request={
			/**
			 * @name             : getDoSidoList
			 * @description      : 시도정보를 가져온다.
			 * @date             : 2017. 08. 10.
			 * @author	         : 권차욱
			 * @history 	     :
			 * @param sidoCd     : 시도코드
			 * @param callback   : 콜백정보
			 */
			getDoSidoList: function(callback) {
				$.ajax({
					method: "POST",
					async: true,
					url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
					data: {
						base_year: bndYear
					},
					dataType: "json",
					success: function(res) {
						var sidoList = res.result.sidoList;
						if (sidoList != undefined || sidoList != null) {
							$("#current-sido-select").empty();
							var html = "";
							for (var i=0; i<sidoList.length; i++) {
								html += "<option value='"+sidoList[i].sido_cd+"' x-coor='"+sidoList[i].x_coor+"' y-coor='"+sidoList[i].y_coor+"' admCd='"+sidoList[i].sido_cd+"'>";
								html += sidoList[i].sido_nm;
								html += "</option>";
							}
							$("#current-sido-select").append(html);
							
							if (callback != undefined && 
									callback != null && 
									callback instanceof Function) {
									callback.call(undefined, sidoList);
							}
						}
					},
					error: function(e) {

					}
				});
			},
			
			/**
			 * @name             : getDoSggList
			 * @description      : 시도정보를 가져온다.
			 * @date             : 2017. 08. 10.
			 * @author	         : 권차욱
			 * @history 	     :
			 * @param sidoCd     : 시도코드
			 * @param callback   : 콜백정보
			 */
			getDoSggList: function(sidoCd, callback) {
				$.ajax({
					method: "POST",
					async: true,
					url: contextPath + "/ServiceAPI/map/sggAddressList.json",
					data: {
						sido_cd : sidoCd,
						base_year: bndYear
					},
					dataType: "json",
					success: function(res) {
						var sggList = res.result.sggList;
						if (sggList != undefined || sggList != null) {
							$("#current-sgg-select").empty();
							if($("#openStatus1>a").hasClass("on")){
								var html = "<option value='000'>전체</option>";
								//var html = "<option value='' admCd='"+sidoCd+"'>전체</option>";
							}
							else{
								var html = "";
							}
							for (var i=0; i<sggList.length; i++) {
								var admCd = sidoCd + sggList[i].sgg_cd;
								html += "<option value='"+sggList[i].sgg_cd+"' x-coor='"+sggList[i].x_coor+"' y-coor='"+sggList[i].y_coor+"' admCd='"+admCd+"'>";
								html += sggList[i].sgg_nm;
								html += "</option>";
							}
							$("#current-sgg-select").append(html);
							
							//비자치구여부 체크시
							if ($("#atdrcYn").is(":checked")) {
								$policyWritePopup.ui.setAtdrcList(sidoCd);
							}
							
							if (callback != undefined && 
									callback != null && 
									callback instanceof Function) {
									callback.call(undefined, sidoCd, res);
							}
						}
					},
					error: function(e) {

					}
				});
			},
			
			/**
			 * @name             : getDoEmdList
			 * @description      : 읍면동정보를 가져온다.
			 * @date             : 2017. 08. 10.
			 * @author	         : 권차욱
			 * @history 	     :
			 * @param sidoCd     : 시도코드
			 * @param sggCd      : 시군구코드
			 * @param callback   : 콜백정보
			 */
			getDoEmdList: function(sidoCd, sggCd, callback) {
				$.ajax({
					method: "POST",
					async: true,
					url: contextPath + "/ServiceAPI/map/admAddressList.json",
					data: {
						sido_cd : sidoCd,
						sgg_cd : sggCd,
						base_year: bndYear
					},
					dataType: "json",
					success: function(res) {
						var admList = res.result.admList;
						if (admList != undefined || admList != null) {
							$("#current-emd-select").empty();
							var html = "<option value='' admCd='"+sidoCd+sggCd+"'>전체</option>";
							for (var i=0; i<admList.length; i++) {
								var admCd = sidoCd + sggCd + admList[i].emdong_cd;
								html += "<option value='"+admList[i].emdong_cd+"' x-coor='"+admList[i].x_coor+"' y-coor='"+admList[i].y_coor+"' admCd='"+admCd+"'>";
								html += admList[i].emdong_nm;
								html += "</option>";
							}
							$("#current-emd-select").append(html);
							
							if (callback != undefined && 
									callback != null && 
									callback instanceof Function) {
									callback.call(undefined, sidoCd, res);
							}
						}
					},
					error: function(e) {

					}
				});
			}
			
		};
	$bizStatsLeftMenu.Util = {
			/**
			 * 
			 * @name         : sliderSmallAvgBig
			 * @description  : 적은지역, 평균지역, 많은지역
			 * @date         : 2015. 12. 08. 
			 * @author	     : 김성현
			 * @param 		: type	1:적은지역, 2:평균지역, 3:많은지역
			 * @history 	 :
			 */
			sliderSmallAvgBig : function(type) {
				var returnStr = "";
				if(type == "1") {
					returnStr = "적은지역";
				} else if(type == "2") {
					returnStr = "평균지역";
				} else if(type == "3") {
					returnStr = "많은지역";
				}
				return returnStr;
			},
	
			/**
			 * 
			 * @name         : sliderLowAvgHigh
			 * @description  : 낮은지역, 평균지역, 높은지역
			 * @date         : 2015. 12. 09. 
			 * @author	     : 김성현
			 * @param 		: type	1:낮은지역, 2:평균지역, 3:높은지역
			 * @history 	 :
			 */
			sliderLowAvgHigh : function(type) {
				var returnStr = "";
				if(type == "1") {
					returnStr = "낮은지역";
				} else if(type == "2") {
					returnStr = "평균지역";
				} else if(type == "3") {
					returnStr = "높은지역";
				}
				return returnStr;
			}
	};
	$bizStatsLeftMenu.event = {
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : Left 메뉴 UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2015. 10. 06. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */	
			setUIEvent : function() {
				var body = $("body");
				
				$(".sqTabs").find(".mCSB_container").css("width", "292px");
				
				//슬라이드 세팅
				this.slideValue(".sliderDefault");
				// mng_s 20200722 김건민 (left 메뉴 닫기)
				$(".sideQuick.sq02").addClass("on");
				$(".quickBox .bottom > a.stepClose").addClass("on");
				// mng_e 20200722 김건민
		    	//스크롤 생성
		    	$(".normalBox").mCustomScrollbar({axis:"xy",advanced: { autoExpandHorizontalScroll: true }});
		    	$(".resultSearchListScroll, .sqListBox.sq03 .sqList").mCustomScrollbar({axis:"xy"});
		    	$(".scrollBox, .dataSideScroll, .scrolls, .mapResultList").mCustomScrollbar({
		        	axis:"xy",
		        	callbacks: {
		        		whileScrolling:function() {
		        			//3Detph 가 안보이는 버그 해결책
		        			if($(".quickBox.step03").find(".mCSB_container").position() != undefined) {
		        				if($(".quickBox.step03").find(".mCSB_container").position().left >= 1000) {
		        					$(".quickBox.step03").find(".mCSB_container").css("left", "0px");
			    				}	
		        			}
		        		}
		        	}
		        });
		    	

		    	
		    	// mng_s 20190404 김건민
		    	body.on("click", ".areaInfoChangeTab", function(){
		    		for(i = 0; i < $(".areaInfoChangeTab li>a").length; i++){		    		
		    			if($(".areaInfoChangeTab li>a:eq("+(i)+")").hasClass("on")){
		    				var themeNm = $('.areaInfoChangeTab li>a').children('.on').prevObject[i].text;
			    			console.log(themeNm);
		    			}
		    		}
		    	}); 
		    	
		    	
		    	body.on("click", "#standardButton", function(){
		    		if($bizStatsLeftMenu.ui.srvLogLeftMenuNm == 'intro'){
		    			srvLogWrite('G1', '03', '02', '00', '', '');
		    		}else if($bizStatsLeftMenu.ui.srvLogLeftMenuNm == 'lqMap'){
		    			srvLogWrite('G1', '06', '03', '01', '', '');
		    		}
		    	});
		  		    	
		    	body.on("click", ".jumArea", function(){
		    		if($bizStatsLeftMenu.ui.srvLogLeftMenuNm == 'jobChange'){
						srvLogWrite('G1', '05', '03', '04', '', '');
					 }else if($bizStatsLeftMenu.ui.srvLogLeftMenuNm == 'jobOpen'){
						srvLogWrite('G1', '09', '04', '04', '', '');
					}
		    	});
		    	
		    	body.on("click", ".heatArea", function(){
					if($bizStatsLeftMenu.ui.srvLogLeftMenuNm == 'jobChange'){
						srvLogWrite('G1', '05', '03', '03', '', '');
					}else if($bizStatsLeftMenu.ui.srvLogLeftMenuNm == 'jobOpen'){
						srvLogWrite('G1', '09', '04', '03', '', '');
					}
		    	})
		    	
		    	// 점 색상 클릭시 log
		    	body.on("click", ".colorck", function(){
		    		if($bizStatsLeftMenu.ui.srvLogLeftMenuNm == 'jobChange'){
		    			srvLogWrite('G1', '05', '03', '04', '', '');
		    		}else if($bizStatsLeftMenu.ui.srvLogLeftMenuNm == 'jobOpen'){
						srvLogWrite('G1', '09', '04', '04', '', '');
					}
		    	});
		    	
		    	
		    	// 지도 클릭시
		    	body.on("click", ".sop-zoom-animated", function(){
		    		if($bizStatsLeftMenu.ui.srvLogLeftMenuNm == 'jobChange'){
		    			srvLogWrite('G1', '05', '03', '01', '', '');
		    		}else if($bizStatsLeftMenu.ui.srvLogLeftMenuNm == 'areaSearch'){
		    			srvLogWrite('G1', '07', '03', '01', '', '');
		    		}else if($bizStatsLeftMenu.ui.srvLogLeftMenuNm == 'jobOpen'){
		    			srvLogWrite('G1', '09', '04', '01', '', '');
		    		}else{
		    			if($("#btnList_1 .tb_inner").hasClass("off")){
		    				srvLogWrite('G1', '11', '04', '02', '', '');
		    			}else if ($("#btnList_1 .tb_trade").hasClass("off")){
		    				srvLogWrite('G1', '11', '05', '02', '', '');
		    			}
		    			
		    		}
		    	});

		    	// mng_e 20190404 김건민
		    	
		    	
		    	
		    	//시도 콤보박스 이벤트 박길섭 추가
				body.on("change", "#current-sido-select", function(){
					//$policyStaticMapLeftmenu.event.closeAnimate(2);
					var sido_cd = $(this).val();
					$bizStatsLeftMenu.request.getDoSggList(sido_cd,"");
					setTimeout(function() {
						var sgg_cd = $("#current-sgg-select").val();
						$bizStatsLeftMenu.request.getDoEmdList(sido_cd,sgg_cd,"");
					}, 500);
					//$bizStatsLeftMenu.ui.getCategoryCnt(adm_cd);   // 2017.09.07 [개발팀] 수정
					//$policyStaticMap.ui.setMapPosition();
				});
				
				//시군구 콤보박스 이벤트 박길섭 추가
				body.on("change", "#current-sgg-select", function(){
//					$policyStaticMapLeftmenu.event.closeAnimate(2);
					var sido_cd = $("#current-sido-select").val();
					var sgg_cd = $(this).val();
					if(sgg_cd==''){
						sgg_cd="000";
					}
					//var sigungu = $("#current-sgg-select option:selected").attr("data-adm_cd");
					$bizStatsLeftMenu.request.getDoEmdList(sido_cd,sgg_cd,"");
					//$policyStaticMap.ui.setMapPosition();
				});
		        //조건설정 항목 선택하기 클릭 시
		        body.on("click", ".wonList01 li:not(.disabled) a", function(){    
		    		var ck = $(this).hasClass("on");
		    		if(!ck){
		    			$(this).addClass("on");
		    		}else{
		    			$(this).removeClass("on");
		    		}
		    	});
		        
		        //창업지역검색 - 사업체 업종 선택
		        body.on("click",".cateMenu li a",function(){
		    		var inx = $(this).parent("li").index();
		    		$(this).parents(".cateMenu").eq(0).nextAll("div").hide();
		    		$(this).parents(".stepBox").eq(0).find(".cm0"+parseInt(inx+1)).show();
		            $(this).parents(".cateMenu").eq(0).children("li").removeClass("on");
		            $(this).parents("li").eq(0).addClass("on");
		        });  
				
				//통계메뉴 클릭 시
				body.on("click", ".sideQuick.sq02", function(){
					if($("#openStatus1").hasClass("on")||$(".icon04").hasClass("on")){
						//$(".buttonBar.ui-draggable").css({"left":"360px","top":"0px"});//박길섭추가
					}
					var on = $(this).hasClass("on");
					//$(".nav-list li>a").removeClass("on");
					if($(this).hasClass("on")){
						$bizStatsLeftMenu.event.stepCloseAnimate2(parseInt($(this).index(".stepClose"))+1, "pass");
						//$(".expand").animate({"left":"-60px"},200);
						$(".nav-sidebar").animate({"left":"-80px"},200);
					}
					else{
						$(".sideQuick.sq02").addClass("on");
						if($(".nav-list li").eq(0).find("a").hasClass("on")){
							
						}
						if($(".icon01>a").hasClass("on")){
							$(".nav-list li>a").removeClass("on");
							$(".nav-list li").eq(0).find("a").addClass("on");
							$(".menu_left").hide();
							//$(".menu1").show();
							$(".nav-sidebar").stop().animate({left : "0px"} , 200);
							//$(".expand").stop().animate({"left":"80px"},200);
							$(".quickBox.step01.sub").stop().animate({left : "80px"} , 200);
						}
						else if($(".icon04>a").hasClass("on")){
							$(".nav-list li>a").removeClass("on");
							$(".nav-list li").eq(5).find("a").addClass("on");//2019-04-16 박길섭
							$(".nav-sidebar").stop().animate({left : "0px"} , 200);
							$(".quickBox.step01.sub").stop().animate({left : "80px"} , 200);
							$(".menu_left").hide();
							//$(".menu2").show();
							//$(".expand").stop().animate({"left":"80px"},200);
							$(".quickBox.step03").stop().animate({"left":"80px"},200);
						}
						else if($("#openStatus2>a").hasClass("on")){
							$(".nav-list li>a").removeClass("on");
							$(".nav-list li").eq(6).find("a").addClass("on");//2019-04-16 박길섭
							$(".nav-sidebar").stop().animate({left : "0px"} , 200);
							//$(".expand").stop().animate({left : "80px"} , 200);
							$(".quickBox.step02").stop().animate({left : "80px"} , 200);
						}
						else if($(".icon02>a").hasClass("on")){
							$(".nav-list li>a").removeClass("on");
							$(".nav-list li").eq(1).find("a").addClass("on");
							$(".nav-sidebar").stop().animate({left : "0px"} , 200);
							//$(".expand").stop().animate({left : "80px"} , 200);
							$(".quickBox.step02").stop().animate({left : "80px"} , 200);
						}
						else if($(".icon03>a").hasClass("on")){
							$(".nav-list li>a").removeClass("on");
							$(".nav-list li").eq(2).find("a").addClass("on");
							$(".nav-sidebar").stop().animate({left : "0px"} , 200);
							//$(".expand").stop().animate({left : "80px"} , 200);
							$(".quickBox.step02").stop().animate({left : "80px"} , 200);
						}
						else if($(".icon09>a").hasClass("on")){
							$(".nav-list li>a").removeClass("on");
							$(".nav-list li").eq(3).find("a").addClass("on");
							$(".nav-sidebar").stop().animate({left : "0px"} , 200);
							//$(".expand").stop().animate({left : "80px"} , 200);
							$(".quickBox.step02").stop().animate({left : "80px"} , 200);
						// mng_s 20190315_김건민
						}else if($(".icon05>a").hasClass("on")){
							$(".nav-list li>a").removeClass("on");
							$(".nav-list li").eq(4).find("a").addClass("on");
							$(".nav-sidebar").stop().animate({left : "0px"} , 200);
							//$(".expand").stop().animate({left : "80px"} , 200);
							$(".quickBox.step02").stop().animate({left : "80px"} , 200);
						}
						// mng_e 20190315_김건민	
						else if($("#openStatus1>a").hasClass("on")){
							if($(".es").hasClass("on")){
								$(".es").removeClass("on");
								$bizStatsLeftMenu.ui.setDetailStatsPanel("areaSearch");
								return false;
							}
							$(".nav-list li>a").removeClass("on");
							$(".nav-list li").eq(4).find("a").addClass("on");//2019-04-16 박길섭
							$(".nav-sidebar").stop().animate({left : "0px"} , 200);
							//$(".expand").stop().animate({left : "80px"} , 200);
							$(".quickBox.step02").stop().animate({left : "80px"} , 200);
							if($("#wonList01").find("li>a").hasClass("on")){
								$(".quickBox.step03").stop().animate({left : "360px"} , 400);
								//$(".buttonBar.ui-draggable").css("left","700px");//박길섭추가
							}
						}
						else if($(".icon08>a").hasClass("on")){
							$(".nav-list li>a").removeClass("on");
							$(".nav-list li").eq(7).find("a").addClass("on");//2019-04-16 박길섭
							$(".nav-sidebar").stop().animate({left : "0px"} , 200);
							//$(".expand").stop().animate({left : "80px"} , 200);
							$(".quickBox.step02").stop().animate({left : "80px"} , 200);
							$(".quickBox.step03").stop().animate({left : "360px"} , 400);
							
						}
						else{
								if($(".nav-list li").eq(0).find("a").hasClass("on")){
									$(".nav-sidebar").stop().animate({left : "0px"} , 200);
									//$(".quickBox.step01").stop().animate({left : "80px"} , 200);
									//$(".menu2").hide();
									//$(".menu3").hide();
								}
								else if($(".nav-list li").eq(1).find("a").hasClass("on")){
									$(".nav-sidebar").stop().animate({left : "0px"} , 200);
									//$(".quickBox.step01").stop().animate({left : "80px"} , 200);
									//$(".menu1").hide();
									//$(".menu3").hide();
								}
								else if($(".nav-list li").eq(2).find("a").hasClass("on")){
									$(".nav-sidebar").stop().animate({left : "0px"} , 200);
									//$(".quickBox.step01").stop().animate({left : "80px"} , 200);
									//$(".menu1").hide();
									//$(".menu2").hide();
								}
								else{
									$(".quickBox.step00").stop().animate({"left":"0px"},200);
								}
								//$(".shadow").show(); 
								//$(this).find("span").hide();//통계메뉴 글자 보이게
								//$(this).addClass("on").css("width","80px");
								$(this).addClass("on");
								$(this).find("img").css("padding-top", "0px");
								
							//$(".sideQuick.sq02").stop().animate({"left":"0px"},200);
							
						}
					}
						/*if(!on){
							//$(".sideQuick.sq02").stop().animate({"left":"0px"},200);
							$(".quickBox.step00").stop().animate({"left":"0px"},200);
							//$(".shadow").show(); 
							$(this).find("span").hide();
							$(this).addClass("on").css("width","34px");
							$(this).find("img").css("padding-top", "4px");
						}else{ 
							$bizStatsLeftMenu.event.stepCloseAnimate(1, "pass"); 
							$(this).find("span").show();
							$(this).removeClass("on").css("width","34px");
							 $(".quickBox.step02").removeClass("join");
							 $(this).find("img").css("padding-top", "");
						} */
					
				}); 
				
				//선택항목 클릭 시
				body.on("click",".sideQuick.sq03", function(){
					var isDrag = $(this).hasClass("dragStart");
					var on = $(this).hasClass("on");
					if(!on){
						$(this).addClass("on");
						if (isDrag) {
							if ($(this).next(".sqListBox").is(":visible")) {
								$(".sqListBox.sq03").hide();
							}else {
								$(".sqListBox.sq03").show();
								$("#mCSB_3_container").width("292px");
								$("#mCSB_4_container").width("292px");
							}
						}else {
							$(".sqListBox.sq03").show();
							$(this).next(".sqListBox").stop().animate({"left":"0px"},200);
						}
					}else{
						$(this).removeClass("on");
						if (isDrag) {
							if ($(this).next(".sqListBox").is(":visible")) {
								$(".sqListBox.sq03").hide();
							}else {
								$(".sqListBox.sq03").show();
								$("#mCSB_3_container").width("292px");
								$("#mCSB_4_container").width("292px");
							}
						}else {
							$(".sqListBox.sq03").show();
							$(this).next(".sqListBox").stop().animate({"left":"-550px"},200);
						}
					}
				});
				
				//닫기 버튼 클릭 시
				body.on("click",".stepClose",function(){
					//$bizStatsLeftMenu.event.stepCloseAnimate2(parseInt($(this).index(".stepClose"))+1, "pass");
					// mng_s 20200722 김건민 (left 메뉴 닫기 버튼 수정함.)
					var on = $(this).hasClass("on");
					if(!on){
						// 처름 메인 left 메뉴 화면
						if($(".step00 .stepClose").hasClass("on")){
							$(".sideQuick.sq02").addClass("on");
							$(".step00 .bottom > a.stepClose").addClass("on");
							$(".step00 .bottom > a.stepClose").css("right","-25px");
							$(".step02 .bottom > a.stepClose").hide();
							$(".quickBox.step00").stop().animate({"left":"0"},200);
						}else{
							if(!$(".step02 .stepClose").hasClass("on")){
								$(".sideQuick.sq02").addClass("on");
								$(".step02 .bottom > a.stepClose").addClass("on");
								$(".step02 .bottom > a.stepClose").css("right","-25px");
								$(".step02 .bottom > a.stepClose").show();
								$(".nav-sidebar").stop().animate({"left":"0px"},200);
								$(".quickBox.step02").stop().animate({"left":"80px"},200);
							}else{
								$(".sideQuick.sq02").addClass("on");
								$(".step03 .bottom > a.stepClose").addClass("on");
								$(".step03 .bottom > a.stepClose").css("right","-25px");
								$(".nav-sidebar").stop().animate({"left":"0px"},200);
								$(".quickBox.step02").stop().animate({"left":"80px"},200);
								$(".quickBox.step03").stop().animate({"left":"360px"},200);
							}
						}
						
					}else{
						if($(".step00 .stepClose").hasClass("on")){
							if($(".list_btn").hasClass("on")){
								$(".step02 .bottom > a.stepClose").removeClass("on");
								$(".step02 .bottom > a.stepClose").css("right","-177px");
								$(".step02 #hideClose").show();
								$(".sideQuick.sq02").removeClass("on");
								$(".quickBox.step00").stop().animate({"left":"-430px"},200);
							}/*else if($(".sideQuick.sq02").hasClass("on")){
								$(".step02 .bottom > a.stepClose").removeClass("on");
								$(".step02 .bottom > a.stepClose").css("right","-868px");
								$(".step02 #hideClose").show();
								$(".sideQuick.sq02").removeClass("on");
								$(".quickBox.step00").stop().animate({"left":"-430px"},200);
							}*/else{
								$(".step02 .bottom > a.stepClose").removeClass("on");
								$(".step02 .bottom > a.stepClose").css("right","-52px");
								//$(".step02 .bottom > a.stepClose").show();
								$(".step02 #hideClose").show();
								$(".sideQuick.sq02").removeClass("on");
								$(".quickBox.step00").stop().animate({"left":"-430px"},200);
							}
							
						}else if($(".step03 .stepClose").hasClass("on")){
							$(".sideQuick.sq02").removeClass("on");
							$(".step03 .bottom > a.stepClose").removeClass("on");
							$(".step03 .bottom > a.stepClose").css("right","-375px");
							$(".nav-sidebar").stop().animate({"left":"-80px"},200);
							$(".quickBox.step02").stop().animate({"left":"-430px"},200);
							$(".quickBox.step03").stop().animate({"left":"-630px"},200);							
						}else{
							$(".sideQuick.sq02").removeClass("on");
							$(".step02 .bottom > a.stepClose").removeClass("on");
							$(".step02 .bottom > a.stepClose").stop().animate({"right":"-175px"}, 200);
							//$(".step03 .bottom > a.stepClose").addClass("on");
							$(".nav-sidebar").stop().animate({"left":"-80px"},200);
							$(".quickBox.step02").stop().animate({"left":"-430px"},200);
						}
					}
					// mng_e 20200722 김건민
				}); 
				
				/*body.on("click",".technicalul li>a",function(){
					var type = $(this).data("type");
					$(".nav-list li").find("a").removeClass("on");
					$(".nav-sidebar").stop().animate({left : "0"} , 200);
					$(".quickBox.step00").stop().animate({left : "-240px"} , 200);
					$(".quickBox.step01").stop().animate({left : "80px"} , 200);
					$(".nav-list li").eq(type-1).find("a").addClass("on");
					//console.log("type = " + type);
					$(".menu_left").hide();
					$(".menu"+type).show();
				});*/
				
				/*body.on("click",".technical li>a",function(){
					if($("#openStatus1").hasClass("on")||$(".icon04").hasClass("on")){
						//$(".buttonBar.ui-draggable").css({"left":"360px","top":"0px"});//박길섭추가
					}
					var type=$(this).data("type");
					$(".nav-list li>a").removeClass("on");
					$(".nav-list li").eq(type-1).find("a").addClass("on");
					//$(".expand").stop().animate({"left":"-240px"},200);
					$(".quickBox.step02").stop().animate({"left":"-240px"},200);
					$(".quickBox.step03").stop().animate({"left":"-500px"},200);
					$(".ul-area> li").removeClass("on");
					//console.log($(this).data("type"));
					var type = $(this).data("type");
					$(".quickBox.step01").stop().animate({left : "80px"} , 200);
					//console.log(type);
					$(".menu_left").hide();
					$(".menu"+type).show();
					
				});*/
				
				
				
				//조건 상세설정 열고 닫기
				body.on("click","a.roundTextBox",function(){
					
					// mng_s 20190401 김건민
					$bizStatsLeftMenu.ui.srvTempValue = $(this).text();
					// mng_e 20190401 김건민
					
					$("a.roundTextBox").each(function(){
						$(this).removeClass("on");
						$(this).children("input").prop("checked", false);
						$(this).next(".joinDefault").hide(); 
					});
					
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).children("input").prop("checked", true);
						$(this).next(".joinDefault").show();
					}else{
						$(this).removeClass("on");
						$(this).children("input").prop("checked", false);
						$(this).next(".joinDefault").hide(); 
					}
					
					
					
					
			    });
				
				//업종별 지역현황 - 생활업종 선택하기
				body.on("click",".jobArea_stepBox label",function(){
					if($(".menuAutoClose label").hasClass("on")){
						//$(".expand").animate({"left":"-60px"},200);//박길섭 추가
						$(".nav-sidebar").animate({"left":"-80px"},200);//박길섭 추가
					}
					$(".ul-area> li").removeClass("on");//박길섭 추가
					$(".jobArea_stepBox label").removeClass("on");
					$(".jobArea_stepBox input").removeAttr("checked");
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
					$(".qmdl2 dd ul>li").removeClass("on");
					
					//업종밀집도 변화일 경우 버튼 생성
					if($bizStatsLeftMenu.ui.curSelectedStatsType == "jobChange") {
						$(".MapBefore").hide();
						var dataBoard = $bizStatsDataBoard.ui;
						var id = $(this).attr("for");
						var themeCd = $("#"+id).val();
						
						//alert("themeCd [" + themeCd); //ex)한식의 경우 : 5001
						
						var themeNm = $(this).text();
						var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
						
						// mng_s 20190401 김건민
						var srvLogJobChangeNm = $bizStatsLeftMenu.ui.srvTempValue;
						
						if(srvLogJobChangeNm == "음식점(11종)"){
							srvLogWrite('G1', '05', '02', '01', themeNm, '');
						}else if(srvLogJobChangeNm == "도소매(11종)"){
							srvLogWrite('G1', '05', '02', '02', themeNm, '');
						}else if(srvLogJobChangeNm == "서비스(11종)"){
							srvLogWrite('G1', '05', '02', '03', themeNm, '');
						}else{
							srvLogWrite('G1', '05', '02', '04', themeNm, '');
						}
						// mng_e 20190401 김건민
						
						
						//데이터보드 조회조건이 undefined일 경우 초기화
						if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
							dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
						}
						dataBoard.mapData[dataBoard.map_id].options.dataBoard.jobAreaThemeCd = themeCd;	//테마코드
						//$bizStatsMap.ui.doReqCompanyDensity(themeCd, themeNm);
						$bizStatsMap.ui.setTitle("업종밀집도변화 > "+themeNm, viewId);
						$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
						$bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].mapMove([1007770, 1855549], 2);
						
						// mng_s 20201202 김건민  (업종밀집도 변화에서  poi정보 까지 표출 하고 Left메뉴에서 다른 테마 업종 선택 하면  그전에 조회된  poi가 표출 되어서 오류 수정함.)
						setTimeout(function(){
							$bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].openApiBoundarySido($bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].bnd_year);
							//최초조회 시 전국정보 팝업
							var options = {
									params : {
										adm_cd : null,
										adm_nm : '전국',
										map : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId],
										year : companyDataYear
									},
									dataBoard : {
										jobAreaThemeCd : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd
									},
									etc : {
										themeCd : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd,
										curPolygonCode : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].curPolygonCode,
										year : companyDataYear,
									}
							}
							$bizStatsDataBoard.ui.updateDataBoard(options, "jobChange");
						}, 300);
						// mng_e 20201202 김건민 
					}
					
					//================================================================================
					//지자체 인허가 클릭시
					else if($bizStatsLeftMenu.ui.curSelectedStatsType == "jobOpen") {
						$(".MapBefore").hide();
						var dataBoard = $bizStatsDataBoard.ui;
						var id = $(this).attr("for");
						var themeCd = $("#"+id).val();
						
						//alert("[bizStatsLeftMenu.js]  themeCd [" + themeCd);
						
						var themeNm = $(this).text();
						var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
						
						// mng_s 20190401 김건민
						var srvLogJobOpenNm = $bizStatsLeftMenu.ui.srvTempValue;
						
						if(srvLogJobOpenNm == "문화체육(5종)"){
							srvLogWrite('G1', '09', '02', '00', themeNm, '');
						}else if(srvLogJobOpenNm == "관광(6종)"){
							srvLogWrite('G1', '09', '02', '00', themeNm, '');
						}else if(srvLogJobOpenNm == "식품(25종)"){
							srvLogWrite('G1', '09', '02', '00', themeNm, '');
						}else if(srvLogJobOpenNm == "소상공인(17종)"){
							srvLogWrite('G1', '09', '02', '00', themeNm, '');
						}else{
							srvLogWrite('G1', '09', '02', '00', themeNm, '');
						}
						// mng_e 20190401 김건민
						
						//데이터보드 조회조건이 undefined일 경우 초기화
						if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
							dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
						}
						dataBoard.mapData[dataBoard.map_id].options.dataBoard.jobAreaThemeCd = themeCd;	//테마코드
						//$bizStatsMap.ui.doReqCompanyDensity(themeCd, themeNm);
						$bizStatsMap.ui.setTitle("업종별 개업 현황 > "+themeNm, viewId);
						$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
						$bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].mapMove([1007770, 1855549], 2);
						
						//최초조회 시 전국정보 팝업
						var options = {
								params : {
									adm_cd : null,
									adm_nm : '전국',
									map : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId],
									year : companyDataYear + 1  //지자체 기준년도는 (사업체 기준년도 + 1) 이다.
								},
								dataBoard : {
									jobAreaThemeCd : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd
								},
								etc : {
									themeCd : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd,
									curPolygonCode : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].curPolygonCode,
									year : companyDataYear + 1,   //지자체 기준년도는 (사업체 기준년도 + 1) 이다.
								}
						}
						$bizStatsDataBoard.ui.updateDataBoard(options, "jobOpen");
					}
					
					//================================================================================
					//업종별 뜨는 지역 클릭시
					else if($bizStatsLeftMenu.ui.curSelectedStatsType == "jobBest") {
						var dataBoard = $bizStatsDataBoard.ui;
						var id = $(this).attr("for");
						var themeCd = $("#"+id).val();
						var themeNm = $(this).text();
						var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
						
						var param_sido_cd = $("#inter-recommend-sido-select").val();
						var param_sgg_cd = $("#inter-recommend-sgg-select").val();
						var param_job_best_from = $("#param_job_best_from").val();
						var param_job_best_to = $("#param_job_best_to").val();
						
						// mng_s 20190401 김건민
						var srvLogJobBestNm = $bizStatsLeftMenu.ui.srvTempValue;
						
						if(srvLogJobBestNm == "문화체육(5종)"){
							srvLogWrite('G1', '10', '02', '00', themeNm, '');
						}else if(srvLogJobBestNm == "관광(6종)"){
							srvLogWrite('G1', '10', '02', '00', themeNm, '');
						}else if(srvLogJobBestNm == "식품(25종)"){
							srvLogWrite('G1', '10', '02', '00', themeNm, '');
						}else if(srvLogJobBestNm == "소상공인(17종)"){
							srvLogWrite('G1', '10', '02', '00',  themeNm, '');
						}else{
							srvLogWrite('G1', '10', '02', '00', themeNm, '');
						}
						// mng_e 20190401 김건민
						
						
						$bizStatsLeftMenu.ui.job_best_from_poi = $("#param_job_best_from").val();
						$bizStatsLeftMenu.ui.job_best_to_poi = $("#param_job_best_to").val();
						$bizStatsLeftMenu.ui.job_best_themeCd = themeCd;
						
						$bizStatsLeftMenu.ui.jobBestSido = $("#inter-recommend-sido-select option:selected").text();
						$bizStatsLeftMenu.ui.jobBestSgg = $("#inter-recommend-sgg-select option:selected").text();
						
						//console.log("[bizStatsLeftMenu.js]  themeCd [" + themeCd);
						//console.log("[bizStatsLeftMenu.js]  param_sido_cd [" + param_sido_cd);
						//console.log("[bizStatsLeftMenu.js]  param_sgg_cd [" + param_sgg_cd);
						//console.log("[bizStatsLeftMenu.js]  param_job_best_from [" + param_job_best_from);
						//console.log("[bizStatsLeftMenu.js]  param_job_best_to [" + param_job_best_to);
						
						//데이터보드 조회조건이 undefined일 경우 초기화
						if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
							dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
						}
						dataBoard.mapData[dataBoard.map_id].options.dataBoard.jobAreaThemeCd = themeCd;	//테마코드
						//$bizStatsMap.ui.doReqCompanyDensity(themeCd, themeNm);
						$bizStatsMap.ui.setTitle("업종별 뜨는 지역 > "+themeNm, viewId);
						$(".jobBestTitle").html(themeNm+" 뜨는 지역");
						$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
						$bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].mapMove([1007770, 1855549], 2);
						
						//최초조회 시 전국정보 팝업
						var options = {
								params : {
									adm_cd : null,
									adm_nm : '전국',
									map : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId],
									year : companyDataYear + 1,  //지자체 기준년도는 (사업체 기준년도 + 1) 이다.
									param_sido_cd : param_sido_cd,
									param_sgg_cd : param_sgg_cd,
									param_job_best_from : param_job_best_from,
									param_job_best_to : param_job_best_to
								},
								dataBoard : {
									jobAreaThemeCd : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd
								},
								etc : {
									themeCd : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd,
									curPolygonCode : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].curPolygonCode,
									year : companyDataYear + 1,   //지자체 기준년도는 (사업체 기준년도 + 1) 이다.
								}
						}
						$bizStatsDataBoard.ui.updateDataBoard(options, "jobBest");
					}
					
					
					//업종별 지역현황 항목 선택
					else if ($bizStatsLeftMenu.ui.curSelectedStatsType == "jobArea") {
						if($("#sggFeatureMajorBtn02").hasClass("on")){
							$("#sggFeatureMajorBtn a").removeClass("on");
							$("#sigunguLctTab").hide();
							$(".view").show();
							//$("#sigunguTabs").show();		// 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리
							$("[id^=sigunguTabs]").show();	// 2020년 SGIS고도화 3차(테마코드) - HTML 변경에 따른 id값 검색 수정 (pse)
							//$(".view2").show();
							$("#sigunguClassChartArea01").show();
							$("#sigunguClassChartArea02").show();
							$(".divChartMiddle").show();
							$("#sigunguClassChartArea03").show();
							$("#sigunguClassChartArea04").show();
							$("#sggFeatureMajorBtn02").removeClass("on");
							$("#sggFeatureMajorBtn01").addClass("on");
						}
						$(".bizCateMenu").find("a").removeClass("on");
						$bizStatsDataBoard.ui.initDataBoard();
						var dataBoard = $bizStatsDataBoard.ui;
						var id = $(this).attr("for");
						var themeCd = $("#"+id).val();
						var themeNm = $(this).text();
						var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
						
						// mng_s 20190401 김건민
						var srvLogJobAreaNm = $bizStatsLeftMenu.ui.srvTempValue;
						
						// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 srvLogWrite메서드 호출 분기문 주석처리 및 수정(pse)
						/*
						if(srvLogJobAreaNm == "음식점(11종)"){
							srvLogWrite('G1', '04', '02', '01', themeNm, '');
						}else if(srvLogJobAreaNm == "도소매(11종)"){
							srvLogWrite('G1', '04', '02', '02', themeNm, '');
						}else if(srvLogJobAreaNm == "서비스(11종)"){
							srvLogWrite('G1', '04', '02', '03', themeNm, '');
						}else{
							srvLogWrite('G1', '04', '02', '04', themeNm, '');
						}
						// mng_e 20190401 김건민
						*/
						$themeCdCommon.bigThemeCdList.forEach(function(item,index){
						    var str = item.b_theme_cd_nm+'('+item.s_theme_count+'개)'; 
						    if(srvLogJobAreaNm === str)  {
						        srvLogWrite('G1', '04', '02', String(index+1), themeNm, '');
						    }
						});
						// 2020년 SGIS고도화 3차(테마코드) 끝 (pse)
						
						//데이터보드 조회조건이 undefined일 경우 초기화
						if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
							dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
						}
						dataBoard.mapData[dataBoard.map_id].options.dataBoard.jobAreaThemeCd = themeCd;	//테마코드
						
						// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 코드 주석처리 (pse)
						/*
						if(themeCd==1000||themeCd==2000||themeCd==4000||themeCd==5000){
							$bizStatsMap.ui.doReqSggMap(themeCd, themeNm, "corp_cnt");//지도에 범례함수 띄움 
						} 
						*/
						// 2020년 SGIS고도화 3차(테마코드) 끝 - 기존 코드 주석처리 (pse)
						
						// 2020년 SGIS고도화 3차(테마코드) 시작 - 새로운 테마코드 대분류에 의한 if문 분기 작성(pse)
						if($themeCdCommon.isBigThemeCd(themeCd)) {
							$bizStatsMap.ui.doReqSggMap(themeCd, themeNm, "corp_cnt");//지도에 범례함수 띄움 
						}
						// 2020년 SGIS고도화 3차(테마코드) 끝 - 새로운 테마코드 대분류에 의한 if문 분기 작성(pse)
						else{
							$bizStatsMap.ui.doReqSidoCompany("", themeCd, themeNm, 0);//지도에 범례함수 띄움 
						}
						//$bizStatsDataBoard.ui.jobAreaTypeClick('corp_cnt',themeCd);
						$bizStatsMap.ui.setTitle("시군구 생활업종 현황 > "+themeNm, viewId);
						$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
						
					}
					//업종별 입지계수 지도  박길섭 추가
					else if($bizStatsLeftMenu.ui.curSelectedStatsType == "lqMap"){
						if($("#worker").hasClass("on")){
							$("#company").addClass("on");
							$("#worker").removeClass("on");
						}
//						var mapId = parseInt($bizStatsMap.ui.curMapId);
//						var map = $bizStatsMap.ui.mapList[mapId];
						var dataBoard = $bizStatsDataBoard.ui;
						var id = $(this).attr("for");
						var themeCd = $("#"+id).val();
						var themeNm = $(this).text();
						var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
						
						// mng_s 20190401 김건민
						var srvLogJobAreaNm = $bizStatsLeftMenu.ui.srvTempValue;
						
						if(srvLogJobAreaNm == "음식점(11종)"){
							srvLogWrite('G1', '06', '02', '01', themeNm, '');
						}else if(srvLogJobAreaNm == "도소매(11종)"){
							srvLogWrite('G1', '06', '02', '02', themeNm, '');
						}else if(srvLogJobAreaNm == "서비스(11종)"){
							srvLogWrite('G1', '06', '02', '03', themeNm, '');
						}else{
							srvLogWrite('G1', '06', '02', '04', themeNm, '');
						}
						
						
						if(dataBoard.mapData[dataBoard.map_id].options.dataBoard == undefined) {
							dataBoard.mapData[dataBoard.map_id].options.dataBoard = {};
						}
						
						
						dataBoard.mapData[dataBoard.map_id].options.dataBoard.lqMapThemeCd = themeCd;	//테마코드
						//$bizStatsMap.ui.doReqSidoCompany("", "5002", "중식", 0);//지도에 범례함수 띄움 박길섭
						
						
						//map.legend.valPerSlice = map.legend.calculateLegend("null");
						//최초조회 시 전국정보 팝업
						var options = {
								params : {
									adm_cd : null,
									adm_nm : '전국',
									map : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId],
									year : companyDataYear
								},
								dataBoard : {
									jobAreaThemeCd : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.jobAreaThemeCd
								},
								etc : {
									themeCd : $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.lqMapThemeCd,
									curPolygonCode : $bizStatsMap.ui.mapList[$bizStatsMap.ui.curMapId].curPolygonCode,
									year : companyDataYear,
									from : 'leftmenu',
								}
						};
						$bizStatsMap.ui.lqMap.lqLayerInfo=null;
						$("#bizLqPrevButton").hide();
						$("#lqIncreaseTab").hide();
						$bizStatsMap.ui.doLqMap(themeCd, themeNm,"corp");//지도에 범례함수 띄움 박길섭 
						$bizStatsMap.ui.setTitle("업종별 입지계수 지도 > "+themeNm, viewId);
						$bizStatsDataBoard.ui.updateDataBoard(options, "lqMap");
						$("#mCSB_6_container").css("top","0px");//데이터보드 화면 css 조정
						$("#mCSB_6_container").css("left","0px");
						//map.setStatsData("normal", res, showData, unit);
						$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
						
					}
					
					
					
					
			    });
				
				//mng_s
				//시도 이벤트
				$("body").on("change","select[id$=-sido-select]",function(){
					$bizStatsLeftMenu.ui.getSggList($(this).data("type"),$(this).val(),"");
					
				});
				
				//위치중심 공공데이터 선택
				body.on("click",".publicData_stepBox label",function(){
					$(".publicData_stepBox label").removeClass("on");
					$(".publicData_stepBox input").removeAttr("checked");
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
					$bizStatsLeftMenu.event.stepCloseAnimate(1, "check");
					
					//조회 실행
					var type = $(this).prev().val();
					$publicDataBoard.ui.updatePublicData(type);
			    });
				
				//단일 라디오버튼 선택 (li 안에 input 여러개)
				body.on("click",".radioStepBox label",function(){
					var ck = $(this).hasClass("on");
					
					//2016.03.21 수정, 라이오버튼 중복선택 해제방지
					var elParent = $(this).parent().parent();
					if (elParent.attr("class").indexOf("validationStepBox") != -1) {
						if (ck) {
							return;
						}
					}
					
					$(this).parent().find("label").removeClass("on");
					$(this).parent().find("input").removeAttr("checked");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{ 
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
			    });
				
				//단일 라디오버튼 선택 (li 안에 input 한개, 두개)
				body.on("click",".radioStepOneBox label",function(){
					var ck = $(this).hasClass("on");
					
					//2016.03.21 수정, 라이오버튼 중복선택 해제방지
					var elParent = $(this).parent().parent();
					if (elParent.attr("class").indexOf("validationStepBox") != -1) {
						if (ck) {
							return;
						}
					}
					
					$(this).parent().parent().find("label").removeClass("on");
					$(this).parent().parent().find("input").removeAttr("checked");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{ 
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
			    });
				
				//다중 라디오버튼 선택
				body.on("click",".multiCheckBox label",function(){
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
					
					//2016.03.21 수정, 다중선택에서 최소 하나는 disable되지 않도록 변경
					if ($(".multiCheckBox .on").length == 0) {
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}
					
			    });
				
				//하단 패밀리사이트
				body.on("click","#bottomService",function(){
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$("#bottomServiceLayer").show();
					}else{
						$(this).removeClass("on");
						$("#bottomServiceLayer").hide();
					}
				});
				
				/*//통계메뉴바 자동 닫기
				body.on("click",".menuAutoClose label",function(){
					var ck = $(this).hasClass("on");
					$(this).parent().find("label").removeClass("on");
					$(this).parent().find("input").removeAttr("checked");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{ 
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
			    });*/
				//통계메뉴바 자동 닫기
				body.on("click",".menuAutoClose label",function(){
					var ck = $(this).hasClass("on");
					$(".menuAutoClose label").parent().find("label").removeClass("on");
					$(".menuAutoClose label").parent().find("input").removeAttr("checked");
					if(!ck){
						$(".menuAutoClose label").addClass("on");
						$(".menuAutoClose label").prev().attr("checked", "checked");
					}else{ 
						$(".menuAutoClose label").removeClass("on");
						$(".menuAutoClose label").prev().removeAttr("checked");
					}
			    });
				
				body.on("click","#company,#worker",function(){
					$(".remove_chart").remove();
					$(".sop-infowindow").remove();
					var type=" ";
					if($("#company").hasClass("on")){
						$("#company").removeClass("on");
						$("#worker").addClass("on");
						type = 'worker';
					}
					else{
						$("#worker").removeClass("on");
						$("#company").addClass("on");
						type = 'company';
					}
					var menuType = {
							"intro"	:0,
							"lqMap"	:1
					};
					switch(menuType[$bizStatsLeftMenu.ui.curSelectedStatsType]){
						case 0:
						//시도별 기술업종현황 조회 
							if(type == "company"){
								$bizStatsMap.ui.lqMap.type='corp';
								$bizStatsLeftMenu.ui.doSidoIntro();
							}else{
								$bizStatsMap.ui.lqMap.type='worker';
								$bizStatsLeftMenu.ui.doSidoWorkerIntro();
							}
							
								break;
						case 1:
							if(type == "company"){
									$bizStatsMap.ui.lqMap.type='corp';
									$bizStatsDataBoard.ui.doLqMapValue(type);
							}else{
									$bizStatsMap.ui.lqMap.type='worker';
									$bizStatsDataBoard.ui.doLqMapValue(type);
							}
						break;
					}
				});
				body.on("click",".list_btn",function(){
					// mng_s 20200723 김건민
					$(".quickBox .bottom > a.stepClose").addClass("on");
					$(".list_btn").addClass("on");
					$(".step03 .stepClose").removeClass("on");
					$(".quickBox.step02").stop().animate({"left":"-430px"},200);
					$(".quickBox.step03").stop().animate({"left":"-630px"},200);
					// mng_e 20200723  김건민
					$(".nav-sidebar").stop().animate({"left":"-80px"},200);
					//$(".expand").stop().animate({"left":"-140px"},200);
					//$bizStatsLeftMenu.event.stepCloseAnimate2("","");
					$(".quickBox.step00").stop().animate({"left":"0px"},200);
					$(".sideQuick.sq02").addClass("on");
					$(".nav-list li").find("a").removeClass("on");
					$("#qmdlList01>ul>li").removeClass("on");
				});
				//통계버튼창 드래그
				var top = $(".buttonBar").offset().top - 104;
				$(".buttonBar").draggable({
					//containment : "parent"
					start : function(e, ui) {
						var left = $(".sqListBox.sq03").offset().left;
						if (!$(".sideQuick.sq03").hasClass("dragStart") && parseInt(left) < 0) {
							$(".sqListBox.sq03").hide();
						}
						$(".sideQuick.sq03").addClass("dragStart");
						$(".sqListBox.sq03").stop().animate({"left":"0px"},0);
					}
				});
				$(".sqListBox > .sqTabs").dblclick(function() {
					$(".buttonBar").animate({"left":"0px","top":""+top+""}, 50);
					if ($(".sideQuick.sq03").hasClass("dragStart")) {
						$(".sideQuick.sq03").removeClass("dragStart");
					}
				});
			},
			
			/**
			 * 
			 * @name         : stepCloseAnimate
			 * @description  : 왼쪽 메뉴 닫기 애니메이션.
			 * @date         : 2015. 10. 08. 
			 * @author	     : 김성현
			 * @param : inx, type (check : 통계메뉴바 자동닫기 체크,		 pass : 강제 닫기) 
			 * @history 	 :
			 */
			stepCloseAnimate : function(inx, type){  
				var time = 300;
			    var fx = '.quickBox'; 
			    var btn = '.sideQuick.sq02';
			    if($(".menuAutoClose label").hasClass("on")){
			    		$(fx+'.step04').animate({"left":"-1000px"}, time);
				        $(fx+'.step03').animate({"left":"-1000px"}, time);
				        $(fx+'.step02').animate({"left":"-1120px"}, time);
				        //$(fx+'.step01').animate({"left":"-300px"}, time);
				        $(fx+'.step00').animate({"left":"-300px"}, time);
				        $(btn).stop().animate({"left":"0"},time).removeClass("on");
				        //$(btn).find("span").show();
				        $(".shadow").hide();
			    }
			    else{
			    	if($(".title-list>li").eq(0).find("a").hasClass("on")){
			    		$('.nav-sidebar').animate({"left":"0px"}, time);
			    		$(fx+'.step04').animate({"left":"-1000px"}, time);
				        $(fx+'.step03').animate({"left":"-1000px"}, time);
				        $(fx+'.step02').animate({"left":"-1120px"}, time);
				        //$(fx+'.step01').animate({"left":"-300px"}, time);
				        $(fx+'.step00').animate({"left":"-300px"}, time);
			    	}
			    	
			    }
			    /*$(fx).queue("step04", function(){ 
			    	//$(btn).stop().animate({"left":"840px"},time);
			        $(fx+'.step04').animate({"left":"-280px"}, time);
			        $(fx+'.step02').animate({"left":"-1200px"}, time);
			        $(fx+'.step03').animate({"left":"-300px"}, time);
			        $(".ul-area> li").removeClass("on");
			        $(btn).css("width","34px");
			    }); 
			    $(fx).queue("step03", function(){
			    	$(fx+'.step04').css({"left":"-280px"});
			        //$(btn).stop().animate({"left":"560px"},time);
			    	$(fx+'.step02').animate({"left":"-1200px"}, time);
			        $(fx+'.step03').animate({"left":"-300px"}, time);
			        $(fx+'.step01').animate({"left":"-300px"}, time);
			        $(".ul-area> li").removeClass("on");
			        $(btn).css("width","34px");
			    }); 
			    $(fx).queue("step02", function(){
			    	$(fx+'.step04, '+fx+'.step03').css({"left":"-300px"});
			        //$(btn).stop().animate({"left":"280px"},time);
			    	$(fx+'.step01').animate({"left":"-300px"}, time);
			    	$(fx+'.step02').animate({"left":"-300px"}, time);
			        $(fx+'.step00').animate({"left":"-280px"}, time);
			        $('.nav-sidebar').animate({"left":"-140px"}, time);
			        $(".sideQuick.sq02").removeClass("on");
			        $(btn).css("width","34px");
			        
			    }); 
			    $(fx).queue("step01", function(){
			    	$(fx+'.step04, '+fx+'.step03, '+fx+'.step02').css({"left":"-300px"});
			        $(btn).stop().animate({"left":"0"},time).removeClass("on");
			        $(fx+'.step02').animate({"left":"-1120px"}, time);
			        $(fx+'.step01').animate({"left":"-300px"}, time);
			        $(fx+'.step00').animate({"left":"-280px"}, time);
			        //$(btn).find("span").show();
			        $(btn).css("width","34px");
			        $(".shadow").hide();
			    });
			   $(fx).dequeue("step0"+inx); */
			},
			stepCloseAnimate2 : function(inx, type){
				if($("#openStatus1").hasClass("on")||$(".icon04").hasClass("on")){
					//$(".buttonBar.ui-draggable").css({"left":"0px","top":"0px"});//박길섭추가
				}
				var time = 300;
			    var fx = '.quickBox'; 
			    var btn = '.sideQuick.sq02';
			    $(fx+'.step04').animate({"left":"-1000px"}, time);
		        $(fx+'.step03').animate({"left":"-1000px"}, time);
		        $(fx+'.step02').animate({"left":"-1120px"}, time);
		        //$(fx+'.step01').animate({"left":"-300px"}, time);
		        $(fx+'.step00').animate({"left":"-300px"}, time);
		        $(btn).stop().animate({"left":"0"},time).removeClass("on");
		        //$(btn).find("span").show();
		        $(".shadow").hide();
			},
			/**
			 * 
			 * @name         : slideValue
			 * @description  : 슬라이드 바 컨트롤.
			 * @date         : 2015. 11. 04. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			slideValue : function(selector) { 
			    $(selector).slider({ 
			        min: 1,
			        max: 3
			    });
			    $(selector).slider("value", 2);
			},
			
			/**
			 * 
			 * @description  : 통계버튼 그라데이션 효과.
			 * @date         : 2015. 10. 14. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			dragAppend : function(selector, bgColor) {
				$(selector).css("background-color", bgColor);
				$(selector).addClass("M_on");
			},
			dragAnimate : function(btn_id, bgColor) {
				var selector = $("#"+btn_id);
				this.dragAppend(selector, bgColor);
			}
	};

}(window, document));