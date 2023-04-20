
	//AJAX 통신 시작
	$(document).ajaxStart(function() {
		$("#board1_tooltip_layer").hide();
		$("#board2_tooltip_layer").hide();		
		$(".loading").show();
	    $('html').css("cursor", "wait"); 
	});
	//AJAX 통신 종료
	$(document).ajaxStop(function() {
		$(".loading").hide();
	    $('html').css("cursor", "auto"); 
	});

   //왼쪽 메뉴 초기화 하는 함수 
    function fn_init_left_menu(){
	     //let main_contents_condition1 = main_contents_condition_temp1 +"" ;
	     let main_contents_condition1 = "" ;	     
    	 
	     //let main_contents_condition2 = main_contents_condition_temp2 +"" ;
	     let main_contents_condition2 = "" ;	     
	     
	     $(".main_contents_all_stat_condition").empty();
		 $(".main_contents_all_stat_condition").append(main_contents_condition1);
		 $(".main_contents_all_stat_condition").append(main_contents_condition2);	
		 
		 $(".checkbox_listWrap").empty();
	     $(".checkbox_listWrap").html(fn_data_kind_all_menu());
	     setTimeout(fn_left_tooltip_event,200);
    }
    
    
    //툴팁이벤트
    function fn_left_tooltip_event(){
    	const hint = document.querySelectorAll('.tooltip');
	    let i=1 ;
    	hint.forEach(function(hintTarget){
    	    let tipText = $(hintTarget).data('tip');

	        let findId = "tooltip"+i ;    	    
	        let id = "tipLayer"+i ;
	        
	        $("#"+findId).mouseover(function(e){
    	        let divX = e.pageX ;
    	        let divY = e.pageY;
    	        $("#"+id).css({'display':'block',
    	                            'left':divX,
    	                            'top':divY,
    	                            'position':'absolute'});
	        });
	        
	        $("#"+findId).mouseout(function(e){
    	        $("#"+id).css('display',"none");
    	    });
    	    i++ ;
    	});
    }
    
    //보드 툴팁이벤트
    function fn_board_tooltip_event(){
    	let id = "board1_tooltip_layer";
    	let contents_temp =`<h5 class="title">#name#</h5><p class="desc">#desc#</p>`;
    	
    	for(let i=1; i<=28; i++){
        	let findId = "tooltipBoardId" + i;
        	const obj = document.querySelectorAll(findId);
        	if (obj==null || obj==undefined) continue ;
        	let dataKind = mapInfo.data_kind[mapInfo.view_cd][i-1] ;
        	
        	let contentsObj = mapInfo.data_comments1[dataKind] ;
        	let contents = contents_temp + "" ;
        	//let contentsObj = {name:obj.dataset.name, levelName:obj.dataset.name,yearList:obj.dataset.name, comments:obj.dataset.name } ;
        	contents = fn_temp_replaceAll(contents, contentsObj);

        	$("#"+findId).hover(function(e) {        		
        		getTooltipPosition(event,id,contents, showTooltip)
        	},function(e){
        		$("#"+id).css('display',"none");
        	})
 
    	}
    }
    
    
    
    // 주소변경시 실행되는 함수
    function fn_curArea(boardType){    	
    	let seekCd = mapInfo.region_cd.substr(0,5);
		$.ajax({
              url : openApiPath + "/OpenAPI3/boundary/hadmarea.geojson?accessToken="+mapInfo.accessToken+"&year="+mapInfo.base_year+"&adm_cd="+ seekCd,
              type : "get",
				success: function (res, status) {
					// layer add 
					if (res.errMsg !="Success") {
						alert('  경계 데이터 조회 실패입니다. 잠시후에 시도해주세요');
						return ;
					}
					mapInfo.oriArea = res;   //경계는 저장만 한다.
					
				    if (mapInfo.boardType=='board1') {
						fn_getStatistic();   //색지도는 데이터를 가지고 온다음.
					    fn_init_board_type1();  //  오른쪽 상황판 그리기
				    } else if (mapInfo.boardType=='board2') {
						fn_getStatistic();   //색지도는 데이터를 가지고 온다음.    // todo				    	
					    fn_init_board_type2();  //  오른쪽 상황판 그리기 				    	
				    } else if (mapInfo.boardType=='board3') {				    	
						fn_getStatistic();   //색지도는 데이터를 가지고 온다음.    // todo				    	
				    }
				},
				complete : function(){

				    
			    },
			});
    }
    
    // 집계구 경계가져오는 함수
    function fn_curRegArea(adm_cd, menu){
		$.ajax({
              url : openApiPath + "/OpenAPI3/boundary/statsarea.geojson?accessToken="+mapInfo.accessToken+"&adm_cd="+ adm_cd,
              type : "get",
				success: function (res, status) {
					// layer add 
					if (res.errMsg !="Success") {
						alert('  집계구 경계 데이터 조회 실패입니다. 잠시후에 시도해주세요');
						return ;
					}
					mapInfo.oriArea2 = res;   //경계는 저장만 한다.
					if (menu=="tab5_1"){
						fn_tab5_1_setLayer(res);						
					}
				},
				complete : function(){
			    },
			});
    }
    
    
    function fn_data_kind_all_menu(){
    	let result = "" ;
    	let i=1 ;
    	

    	for (let id in mapInfo.data_kind_all) {
    		
    		let check_box_html = main_contents_checkbox_list_temp+ "" ;
    		let tooltip_html   = main_contents_checkbox_list_tooltip_temp+ "" ;
    		let checkedTxt = (i==1)?"checked":"";
    		
    		
    	    let obj = mapInfo.data_kind_all[id];
    	    
    	    
    		if ( mapInfo.board2Kind != obj.kind) continue ;   //같은 카테고리가 아니면 무시
    		
    	    
    	    let obj2 = {extypeId:"extype"+ i, exType: obj.type.toLowerCase()+"Type",tooltipId:"tooltip"+i, tipLayer:"tipLayer"+i,  checked:checkedTxt, statType:id, comments:obj.desc };
    		check_box_html = fn_temp_replaceAll(check_box_html, obj) ;
    		check_box_html = fn_temp_replaceAll(check_box_html, obj2) ;
    		
    		tooltip_html = fn_temp_replaceAll(tooltip_html, obj) ;
    		tooltip_html = fn_temp_replaceAll(tooltip_html, obj2) ;
    		
    		result = result + check_box_html ;
    		result = result + tooltip_html ;    		
    		i++ ;
    	}
    	result = "<form>" + result + "</form>" ; 
    	
    	return result ;
    }
    
    //우리동네상환판
    function fn_board1_fullData(mode=""){    	
    	
        if (mapInfoData !=undefined && mapInfoData[mapInfo.region_cd] !=undefined) {
			if (mode=="") {
				   fn_curArea('board1');   //걍계부터 그리자
			} else {
				fn_getStatistic();   //색지도는 데이터를 가지고 온다음.				
			    fn_init_board_type1();  //  오른쪽 상황판 그리기
			}
			return ;
        } 
    	
    	let infoDiv_cd = (mapInfo.view_cd=='sido')?'2':'3' ;  //시도모드이면 시군구 정보 시군구모드 읍면동 정보
    	const obj = {
    			        boardType: 'board1'
    			    ,   baseYear: mapInfo.base_year
	    			,  thisYear: mapInfo.this_year
	    			, lastYear: mapInfo.last_year
	    			, viewCd: mapInfo.view_cd
	    			, regionCd: mapInfo.region_cd
	    			, sidoCd: mapInfo.sido_cd
	    			, sggCd: mapInfo.sgg_cd
	    			, emdongCd: mapInfo.emdong_cd	    		
	    			, infoDiv: infoDiv_cd 
	    			, list : mapInfo.data_kind[mapInfo.view_cd]
    				, yearList : mapInfo.year_list
    			} ;
    	
    	$.ajax({
            url : "/view/lvs/dataList" ,
            data: JSON.stringify(obj),
            dataType: "json",
            contentType: "application/json; charset=UTF-8",            
            type : "POST",            	
				success: function (res, status) {
					if (res[0].errMsg !="Success") {
						alert(' 통계 데이터 조회 실패입니다. 잠시후에 시도해주세요');
						return ;
					}
					
					mapInfoData[mapInfo.region_cd] = res[0][mapInfo.region_cd];
					
			   		//mapInfo.map.setView(sop.utmk(mapInfo.x2, mapInfo.y2), mapInfo.level);
				},
				complete : function(){					
					if (mode=="") {
					   fn_curArea('board1');   //걍계부터 그리자
					} else {
						fn_getStatistic();   //색지도는 데이터를 가지고 온다음.    // todo
						mapInfo.sliderTimerPlay = 'map' 						
					    fn_init_board_type1();  //  오른쪽 상황판 그리기
					}
			    },
			});
    }    
    
    //추천지표
    function fn_board2_fullData(){
		//읍면동 모드
    	let infoDiv_cd = (mapInfo.view_cd=="sido")?"2":"3";
        let seekcode = mapInfo.region_cd ;
        let viewCd   = mapInfo.view_cd ;
        
        //로딩한 사실이 있으면 캐시사용

        const mapInfoRecDataCopy = mapInfoRecData ;
        
        if (mapInfoRecData !=undefined 
        		&& mapInfoRecData[seekcode] !=undefined
        		&& mapInfoRecData[seekcode][mapInfo.board2Kind] !=undefined
        ) {
   			 fn_curArea('board2');   //걍계부터 그리자
			 return ;
        }
       
    	const obj = {
		               boardType: 'board2'    
		            , board2Kind: mapInfo.board2Kind  
    			    ,  baseYear: mapInfo.base_year
	    			,  thisYear: mapInfo.this_year
	    			, lastYear: mapInfo.last_year
	    			, viewCd: viewCd 
	    			, regionCd: seekcode
	    			, sidoCd: mapInfo.sido_cd
	    			, sggCd: mapInfo.sgg_cd
	    			, emdongCd: ''    //	    		
	    			, infoDiv: infoDiv_cd
	    			, list : mapInfo.data_kind_rec[mapInfo.board2Kind]
    				, yearList : mapInfo.year_list
    				, orderCd: mapInfo.data_kind_rec[mapInfo.board2Kind][0]
    				, orderMethod: ' desc '	
    			} ;

              //   행정구역 데이터 존재하면 바로 리셋모드
    	
    	$.ajax({
            url : "/view/lvs/dataRecList" ,
            data: JSON.stringify(obj),
            dataType: "json",
            contentType: "application/json; charset=UTF-8",            
            type : "POST",
				success: function (res, status) {
					if (res[0].errMsg !="Success") {
						alert(' 통계 데이터 조회 실패입니다. 잠시후에 시도해주세요');
						return ;
					}
					//키생성
					if (mapInfoRecData[mapInfo.region_cd]==undefined) mapInfoRecData[mapInfo.region_cd] = {} ;
					if (mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind] ==undefined) mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind] = {} ;					
						
					mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind] = res[0][mapInfo.region_cd][mapInfo.board2Kind]  ;
			   		//mapInfo.map.setView(sop.utmk(mapInfo.x2, mapInfo.y2), mapInfo.level);
					
				},
				complete : function(){
					//alert("막자");
					 fn_curArea('board2');   //걍계부터 그리자
			    },
			});
    }
    
    
    // 모든 지표보기 파라메티 설정
    function fn_setBoard3DataParam(){
    	let seekcode = "";
    	if      (mapInfo.view_cd =="sido")  {
    		seekcode = mapInfo.sido_cd ;
    		infoDiv = "1";
    	} else if (mapInfo.view_cd =="sgg") {
    		seekcode = mapInfo.sido_cd + mapInfo.sgg_cd ;
    		infoDiv = "2";
    	} else if (mapInfo.view_cd =="emdong") {
    		infoDiv = "3";    		
    		//seekcode = mapInfo.sido_cd + mapInfo.sgg_cd + mapInfo.emdong_cd ;
    		seekcode = mapInfo.sido_cd + mapInfo.sgg_cd ;    		
    	}
    	
    	const obj = {
    			   boardType: 'board3'    
			    ,  borderYear: mapInfo.base_year
	 			, viewCd: mapInfo.view_cd
	 			, regionCd: seekcode
	 			, sidoCd: mapInfo.sido_cd
	 			, sggCd: mapInfo.sgg_cd
	 			, emdongCd: mapInfo.emdong_cd
	 			, sidoNm: mapInfo.sido_nm
	 			, sggNm: mapInfo.sgg_nm
	 			, emdongNm: mapInfo.emdong_nm
	 			, thisYear: mapInfo.this_year
	 			, yearList : mapInfo.year_list
	 			, infoDiv: infoDiv
			} ;
    	
    	return obj ;
    }
    
    
    //추천지표
    function fn_board3_fullData(key){   	
    	
		if(!key) mapInfo.dataKind = key;
    	
    	//읍면동 모드
//    	if (key==null || key==undefined)
//            mapInfo.dataKind = Object.keys(mapInfo.data_kind_all)[0];
//     	else 
//     		mapInfo.dataKind = key ;
    	
		 fn_curArea('board3');   //걍계부터 그리자
		 
    }
    
    // 모든지표불려오기   //임시로 불러오기
    function fn_get_board3_data(key,cur_year=""){    	
    	
    	mapInfo.dataKind = key ;
        mapInfo.boardType = "board3";
        //데이터가 존재하면 
        
         /* 캐시기능막기
        if (mapInfoAllData[mapInfo.region_cd] && mapInfoAllData[mapInfo.region_cd][mapInfo.dataKind]){
        	$("#curStat").html(mapInfo.data_kind_all[mapInfo.dataKind].name);
			fn_setDataForLayer3(mapInfo.dataKind);  //색지도 표시				
			fn_init_board_type3();  //보드표시
        }*/
        
        const obj = fn_setBoard3DataParam() ;  //파라메터 수정
        obj.datakind = mapInfo.dataKind ;

        if (cur_year!="") {
        	obj.queryYear=cur_year ;
        }
        
        mapInfo.region_cd = obj.regionCd ;

        if (!mapInfoAllData[mapInfo.region_cd]){
        	mapInfoAllData[mapInfo.region_cd] =  {} ;
        }
        
    	$.ajax({
            url : "/view/lvs/dataStatList" ,
            data: JSON.stringify(obj),
            dataType: "json",
            contentType: "application/json; charset=UTF-8",            
            type : "POST",
				success: function (res, status) {
					if (res[0].errMsg !="Success") {
						alert(' 통계 데이터 조회 실패입니다. 잠시후에 시도해주세요');
						return ;
					}
					
					mapInfoAllData[mapInfo.region_cd][mapInfo.dataKind] = res[0][mapInfo.region_cd]  ;
					//널짜 선택기능이 있는 것들만
					if(cur_year !="") mapInfoAllData[mapInfo.region_cd][mapInfo.dataKind].cur_year = cur_year ; 
					
		        	$("#curStat").html(mapInfo.data_kind_all[mapInfo.dataKind].name);
					fn_setDataForLayer3(mapInfo.dataKind);  //색지도 표시										
					fn_init_board_type3();  //보드표시
				},
				complete : function(){
			    },
			});
    }
    
    
    //토큰발행요청
    function fn_init_map(){
    	let initMapTimer;
    	if (accessToken!="none"){
    		mapInfo.accessToken = accessToken ;
    		fn_init_map2();
    		
    	} else {
    		
    		if(mapInfo.accessToken != "none") clearTimeout(initMapTimer)
    		if(mapInfo.failCnt>=10){
    			alert("인증정보가 존재하지 않습니다. 잠시후에 실행해주세요");
    			return ;
    		}
    		mapInfo.failCnt++ ;    		
    		accessTokenInfo();
    		initMapTimer = setTimeout(function() {
    			fn_init_map2();
    		},1000);  //1초뒤에 실행
    		
    	}
    }
    
    
    //토큰발행요청
    //개발 시 
    function fn_init_map_dev(){
    	$.ajax({
            url : openApiPath + "/OpenAPI3/auth/authentication.json" +
            		"?consumer_key="+mapInfo.consumer_key+"&consumer_secret="+mapInfo.consumer_secret,
            type : "get",
				success: function (res, status) {
					mapInfo.accessToken = res.result.accessToken;//토큰을 가져온다.
					fn_init_map2();  
				},
				complete : function(){
			    },
			});
    }

    
    function fn_init_slider2(){
    	$('#tabType2Content').slick({
            dots: true,
            speed: 300,
            arrows:false,
            autoplay: false,
            autoplaySpeed: 12000,
    	});
    }
    
    function fn_data_display(obj){
        $(this).toggleClass("active");

        mapInfo.mode = (mapInfo.mode=="hide"?"show":"hide"); 
        
		if  (mapInfo.boardType=="board1")
			  fn_setDataForLayer1(mapInfo.dataKind);
		else if (mapInfo.boardType=="board2")
			 fn_setDataForLayer2(mapInfo.dataKind);
		else if (mapInfo.boardType=="board3")
			 fn_setDataForLayer3(mapInfo.dataKind);			
    }
    
    
    function fn_init_event_config() {
        $('.location_more').click(function () {
          if (!$(this).hasClass("active")) {
            $(this).addClass("active");

          } else {
            $(this).removeClass("active");
          }
          //$('.location_more_box').toggle();

          $('.location_more_box').show();
          $('.location_more_box').removeClass("active");
          
        
        });

        $('#btn_close').click(function () {
          $('.location_more_box').hide();
          $('.location_more').removeClass("active");
        });
  	
  	
      // 팝업 레이어 닫기
      
      $(".layer_close").click(function (e) {
          $(e.target).closest('.popup_layer').hide();
      }) ;
      
      fn_tabComon_event_config();
      
      $('.extend_data_01 .slider_item').mouseout(function (event) {
	        $("#board1_tooltip_layer").css('display',"none");
	        $("#board2_tooltip_layer").css('display',"none");	        
      });
      
      $('.extend_data_02 .rcmdItem').mouseout(function (event) {
	        $("#board1_tooltip_layer").css('display',"none");
//	        $("#board2_tooltip_layer").css('display',"none");	        
      });
      
    
    }
    
    
    //소지역탭에 대한 이벤트 등록 doka9999999
    function fn_tab5Comon_event_config(mode) {
    	$(".tabs5.tabCommon li a").off("click");
    	
        $(".tabs5.tabCommon li a").click(function () {
            let activeTab = $(this).attr("rel");
            let tabName = $(this).data('tabname')
            $(this).parent().siblings("li").removeClass("active");
            $(this).parent().addClass("active");
            
            if(activeTab=="tab5_1") {
            	$("#tab5_2").hide();
            	$("#tab5_3").hide();
            	$("#tab5_1").show();        	
            } else if (activeTab=="tab5_2") {
            	$("#tab5_1").hide();
            	$("#tab5_3").hide();
            	$("#tab5_2").show();        	
            } else if (activeTab=="tab5_3") {
            	$("#tab5_1").hide();
            	$("#tab5_2").hide();
            	$("#tab5_3").show();
            	fn_tab5_3_display();            	
            }
        });
    }
    
    //tab5_1차트 보여주기
    function fn_tab5_1_display(){
      if(mapInfo.map2) mapInfo.map2.remove();
   	  mapInfo.map2 = sop.map("mapWrapper2",mapInfo.options);	   	   	  
	  mapInfo.map2.setView(sop.utmk(mapInfo.x, mapInfo.y), mapInfo.level);
	  // 집계구경계가져오기
	  fn_tab5_1_getRegArea();
    } 
    
    //집계구 경계가져오기
    function fn_tab5_1_getRegArea(){
    	//아작스 데이터가져오기
    	if (mapInfo.emdong_cd.length==7) mapInfo.emdong_cd = mapInfo.emdong_cd+"0";
    	//alert(mapInfo.emdong_cd + "집계구 경계가져오기");
    	fn_curRegArea(mapInfo.emdong_cd, "tab5_1");    	
     } 
    
    //경계 보여주기 및 색지도 보기 호출
    function fn_tab5_1_setLayer(result){
		if (mapInfo.sopArea2) {
			mapInfo.sopArea2.remove();
	 	    mapInfo.sopArea2 = null;
	 	    mapInfo.sopArea2 = undefined ;
		}
			
     	mapInfo.sopArea2 = sop.geoJson(result).addTo(mapInfo.map2);
     	mapInfo.map2.fitBounds(mapInfo.sopArea2.getBounds());
     	let regionCd = mapInfo.region_cd ;     	
     	if (mapInfo.emdong_cd.length>=7) regionCd = mapInfo.emdong_cd ;
 
    	const obj = {
	    			  thisYear: mapInfo.this_year
	    			, viewCd: mapInfo.view_cd
	    			, regionCd: regionCd
	    			, sidoCd: mapInfo.sido_cd
	    			, sggCd: mapInfo.sgg_cd
	    			, emdongCd: mapInfo.emdong_cd
	    			, datakind: mapInfo.dataKind
    			} ;
    	
    	//집계구 통계
    	$.ajax({
            url : "/view/lvs/dataRecListByReg" ,
            data: JSON.stringify(obj),
            dataType: "json",
            contentType: "application/json; charset=UTF-8",            
            type : "POST",            	
				success: function (res, status) {
					// layer add 

					if (res[0].errMsg !="Success") {
						alert('  집계구 경계 데이터 조회 실패입니다. ');
						return ;
					}
					
					fn_tab5_1_showColorLayer(res[0].data);						
				},
				complete : function(){
			    },
			});
     }
    
    //tab5_3차트 보여주기
    function fn_tab5_3_display(){
        let title = mapInfo.data_comments2[mapInfo.dataKind].name ;

        let stat =mapInfoRecData ;
        //let region_cd =  mapInfo.emdong_cd ;   //doka 임시로 동단위로 보자
        let region_cd =  mapInfo.region_cd.substr(0,5);
        let statData = mapInfoRecData[region_cd][mapInfo.board2Kind][mapInfo.dataKind].yearData ;
        fn_combiLineColumn('popupChart1', statData);
    	
    }
    
    function fn_tabComon_event_config(mode) {
    	if(!mode){
    		$(".tabCommon li a").off("click");
    	}
    	
        $(".tabCommon li a").click(function () {
            let activeTab = $(this).attr("rel");
            let tabName = $(this).data('tabname')
            $(this).parent().siblings("li").removeClass("active");
            $(this).parent().addClass("active");
            
            
//            if(tabName == "tab2") {
//            	$(".tab_container2").children('.tab_content2').hide();  // 우리동네 상황판 차트, 테이블
//            }
            
            
            //if (activeTab=="tab2_2"){ fn_get_region_compare_data(); return ;            }
            if (tabName == "tab3") $(this).closest('.tab_container').siblings('.tab_content3').hide(); // 추천지표보기, 모든지표 보기
            // else if (tabName == "tab4") $(this).closest('.tab_container4').children('.tab4').hide(); // 추천지표 (변화그래프, 지역내 순위, 변화지도, 타 지자체 비교)
            else if (tabName == "tab5") $(this).closest('.tab_container5').children('.tab_content5').hide(); // 소지역보기 팝업 (집계구보기, 변화지도, 변화그래프)
            else if (tabName == "tab6") $(this).closest('.result_box').children('.step_box').hide();
            else if (tabName == "tab8" || tabName == "tab9") $(this).closest('.tabCommon').siblings('.tabContent').children('li').hide();
            
            if(!activeTab) {
                activeTab = $(this).data('tab') ;
                $(this).closest('.tabCommon').siblings('.tabContent').children('li').each(function(i,item) {
                    $(item).removeClass('active')
                    $(item).hide()
                    if(activeTab == $(item).data('link')) {
                        $(item).show();
                        $(item).addClass('active')
                    }
                })
            } else {
                $("#" + activeTab).fadeIn(10);
            }

        });
    }
    
    
    
    //상황판 유사지역 스토리텔링
    function fn_get_region_compare_data(){
			//읍면동 모드
    	    let obj = {} ;
	    	obj.viewCd = mapInfo.view_cd;
	    	obj.regionCd = mapInfo.region_cd;
	    	obj.sidoCd = mapInfo.sido_cd ;
	    	obj.sggCd = mapInfo.sgg_cd ;	    	
	    	obj.baseYear = mapInfo.base_year ;  // 경계
	    	obj.datakind = mapInfo.dataKind ;
	    	obj.thisYear = mapInfo.this_year ;
	    	obj.lastYear = mapInfo.last_year ;
	    	obj.emdongCd = mapInfo.emdong_cd ;
	    	obj.infoDiv  = (mapInfo.view_cd=="sido")?"2":"3";
	    	
	    	//동단위모드라면 
	    	if (mapInfo.view_cd =="emdong"){
	    		fn_region_compare_dong_data_disp();	    		
	    		return ;
	    	}
	    	
	    	$.ajax({
	            url : "/view/lvs/dataCompareRegion" ,
	            data: JSON.stringify(obj),
	            dataType: "json",
	            contentType: "application/json; charset=UTF-8",            
	            type : "POST",
	            beforeSend: function() {
	            	$(".loading").hide();
	            },
				success: function (res, status) {
					if(res[0].errCd=="0") {
						fn_region_compare_data_disp(res[0].data[0]);
					}
				},
				complete : function(){
				},
	    	});
    }
    
    
    //비교지역 설명하는 함수
    function fn_region_compare_data_disp(dataObj) {
      let temp = `          
           <p>#name# 증가가 가장 큰 지역은<span class='local_txt'><#larger#></span> 순입니다.</p>
           <p>#name# 증가율이 가장 큰 지역은<span class='local_txt'><#larger2#></span> 순입니다.</p>
           <p>#name# 감소가 가장 큰 지역은<span class='local_txt'><#smaller#></span> 순입니다.</p>
           <p>#name# 감소율이 가장 큰 지역은<span class='local_txt'><#smaller2#></span> 순입니다.</p>` ;
      
        dataObj.name = mapInfo.data_comments1[mapInfo.dataKind].name ; 
    	$("#tab2_2").html(fn_temp_replaceAll(temp, dataObj));
    	//$("#tab2_2").show();
    }
    
    
    //동단위 안내 멘트
    function fn_region_compare_dong_data_disp(dataObj) {
        let temp = `          
             <p>현재 통계는 읍면동까지만 조회가 가능하여 선택된 지역의 집계구 증가, 증가율, 감소, 감소율 요약 정보를 볼 수 없습니다.</p>` ;
      	$("#tab2_2").html(temp);
      	$("#tab2_2").show();
      }
    
    
    //팝업처리  doka99999
    function fn_openPopup (type, param) {
        if (type == 'type1') { // 메인페이지 이동
            $(".popup_layer.type1").show();
        } else if (type == "type2") {  // 소지역 보기 팝업
        	//데이터를 가져와서 띄어야 함.
        	/*
        	if(mapInfo.view_cd !="emdong"){
        		alert("읍면동 지역을 선택한 후에 소지역 통계를 조회할 수 있습니다.")
        		return ;
        	}
        	*/
        	
        	if(mapInfo.emdong_cd.length <7){
        		alert("읍면동 지역을 선택한 후에 소지역 통계를 조회할 수 있습니다.")
        		return ;
        	}
        	
        	
        	 let popup_layer_type2_success = popup_layer_type2_success_temp + "";
        	 let objDong = {name:mapInfo.emdong_nm, dataNm:mapInfo.data_comments2[mapInfo.dataKind].name};
        	 popup_layer_type2_success = fn_temp_replaceAll(popup_layer_type2_success, objDong);
        	 
        	 //세번째 탭에 대한 데이터 가져오기(변화그래프)
        	 
        	 $("#popup_layer_type2").empty();
        	 $("#popup_layer_type2").html(popup_layer_type2_success);
        	 
        	 $("#popup_layer_type2").show() // 소지역 보기 팝업 오픈
        	 
        	 fn_tab5_1_display(); //첫번째 탭에 맵을 보여줌.
        	 fn_tab5Comon_event_config(); //이벤트 등록
        }
    }
    
    function fn_board2_popup_close(){
    	$("#popup_layer_type2").hide();
    }
    
	 function fn_init_map2(){
		 if (accessToken !="none") mapInfo.accessToken=accessToken ;
			
		if (mapInfo.accessToken =="none"){
			accessTokenInfo();
			setTimeout(fn_init_map,1000);  // 1초뒤에 실행
			return ;
		}

		let url = window.location.href+"" ;
		if (url.indexOf('localhost')>=0 || url.indexOf('https')>=0)		mapInfo.secure_mode = true ;
		if (mapInfo.secure_mode && navigator.geolocation) {
		   		
	   		navigator.geolocation.getCurrentPosition(function (position) {
	   			var utmkXY = new sop.LatLng (position.coords.latitude, position.coords.longitude);
	   			mapInfo.x = utmkXY.x;
	   	  	  	mapInfo.y = utmkXY.y ;
	   	  	  	mapInfo.x2 = parseFloat(parseFloat(mapInfo.x) )  ;
	   	  	  	mapInfo.y2 = parseFloat(parseFloat(mapInfo.y) )  ;
	   	  	  	var container = this._container = sop.DomUtil.get("mapWrapper");
		   	  	  
			  if (!container) {
				  // throw new Error('Map container not found.');
				  console.log("Map container not found.");
			  } else if (container._sop) {
				  // throw new Error('Map container is already initialized.');
				  console.log("Map container is already initialized.");					
			  } else {
				  mapInfo.map = sop.map("mapWrapper",mapInfo.options);
			  }
			  	  
			  mapInfo.map.setView(sop.utmk(mapInfo.x2, mapInfo.y2), mapInfo.level);
			  console.log("위치정보 기능이 켜져있습니다.")
			  getReverseGeo();
		   		  
	   		},function(error){
	   			
  	    	  console.log("위치정보 기능이 꺼져있습니다. 기본위치로 설정됩니다.")
  	    	  mapInfo.map = sop.map("mapWrapper",mapInfo.options);
   			  mapInfo.map.setView(sop.utmk(mapInfo.x, mapInfo.y), mapInfo.level);
   			  mapInfo.map.dragging.enable();		   		  		   		  
   			  getReverseGeo();
	   		});
		   		
		} else {
			console.log("위치정보 api를 지원하지 않습니다.")
	   	   	mapInfo.map = sop.map("mapWrapper",mapInfo.options);
	   		mapInfo.map.setView(sop.utmk(mapInfo.x, mapInfo.y), mapInfo.level);
	   		mapInfo.map.dragging.enable();	   		
	   		getReverseGeo();
	   	}

   	  }
	 
	 function checkMapCurrentPosition() {
		 let deferred = $.Deferred();
		 
		 let check = false ; 
  	     navigator.geolocation.getCurrentPosition(function (position) {
	   	      var utmkXY = new sop.LatLng (position.coords.latitude, position.coords.longitude);
	   	  	  mapInfo.x = utmkXY.x;
	   	  	  mapInfo.y = utmkXY.y ;
	   	  	  mapInfo.x2 = parseFloat(parseFloat(mapInfo.x) )  ;
	   	  	  mapInfo.y2 = parseFloat(parseFloat(mapInfo.y) )  ;
	   	  	  
	   	  	var container = this._container = sop.DomUtil.get("mapWrapper");
			if (!container) {
				//throw new Error('Map container not found.');
				console.log("Map container not found.");
			} else if (container._sop) {
				//throw new Error('Map container is already initialized.');
				console.log("Map container is already initialized.");					
			} else {
		   	   	 mapInfo.map = sop.map("mapWrapper",mapInfo.options);
			}

	   		  mapInfo.map.setView(sop.utmk(mapInfo.x2, mapInfo.y2), mapInfo.level);
	   		  
	   		 getReverseGeo();		   		 
	   		 check = true ;
	   		 deferred.resolve(check);
  	      });
		 
		 return deferred.promise()
	 }
	 
     //일괄변환함수하나 만들자
     //숫자|| 문자##
     
     function fn_temp_replaceAll(temp,data){
    	 let result = temp + "" ;
    	 for(key in data) {
    		 if (typeof(data[key])=="object") continue ; 
 		    let tag = "#"+key+"#";
		    let tag2 = "||"+key+"||";
		    
		    result = result.replaceAll(tag, data[key]);
		    result = result.replaceAll(tag2, fn_numberFormat(data[key]));		    


    	 }
    	 return result;
     }
     
     
	 function fn_init_board_type1(itemNum=null,pageNum=null){
		 fn_async_run_board1();
	 }
	 
	 
	 //두번째 상황판그리기
	 function fn_init_board_type2(num){
		 
		 fn_board2_sync();
		 
	 }
	 
	 
	 
	 function fn_get_data_nm(boardType,num,mode){
		 let dataKey  ;	
		 let statData  ;
		 let region_cd = mapInfo.region_cd;
		 if (mapInfo.view_cd=="emdong") region_cd = mapInfo.sido_cd + mapInfo.sgg_cd;
		 
		 if(boardType=="board1") {
			 dataKey =  mapInfo.data_kind[mapInfo.view_cd][num] ;
			 statData = mapInfoData[region_cd] ;			 
		 } else if (boardType=="board2"){
			 let key =  mapInfo.board2_data_kind_rec[num];
			 dataKey =  mapInfo.data_kind_rec[key][num] ;
 			 statData = mapInfoRecData[region_cd] ;
		 } else if (boardType=="board3"){
			 dataKey = mapInfo.dataKind ;
			 statData = mapInfoAllData[region_cd][dataKey] ;
		 }
		 
		 if (mode=="dataKey"){
			 return dataKey ;
		 } else if (mode=="statData"){
			 return statData ;
		 }
		 
		 return dataKey;
	 }
	 
	 function fn_getCensusYearData(obj2, dataKind){
		 const obj = obj2 ;
		 for(let i=0; i<obj.length; i++){
			 for(let j=0; j<obj.length-1; j++){
				 if (obj[j][dataKind]<obj[j+1][dataKind]){
					 const tempObj = obj[j] ;
					 obj[j] = obj[j+1] ;
					 obj[j+1] = tempObj ;
				 }
			 }
		 }   //버블정렬 내림차순으로 정렬

		 const resultObj = {category:[], data:[]} ;
		 for(let i=0; i<obj.length; i++){
			 resultObj.category[i] = obj[i]["adm_nm"] ;
			 resultObj.data[i]     = obj[i][dataKind] ;			 
		 }
		 return resultObj  ;
	 }
	 
	 
	 function fn_getCensusYearCmpData(obj, dataKind){
		 const resultObj = {category:[], data:[]} ;
		 for(let i=0; i<obj.length; i++){
			 resultObj.category[i] = obj[i]["base_year"] ;
			 resultObj.data[i]     = obj[i][dataKind] ;			 
		 }
		 return resultObj  ;
	 }
	 
	 function fn_setBoard2DataParam(queryYear){
    	 let infoDiv_cd = (mapInfo.view_cd=="sido")?"2":"3";
    	 let infoDiv_cd_board2 = (mapInfo.view_cd=="sido")?"1":"2";		
         let seekcode = mapInfo.sido_cd +""+ mapInfo.sgg_cd +"";
         if (queryYear==null||queryYear==undefined) queryYear = mapInfo.this_year ; 
		 
		 const obj ={
	               boardType: 'board2'    
			             , board2Kind: mapInfo.board2Kind  
	    			    ,  baseYear: mapInfo.base_year
		    			,  thisYear: queryYear
		    			, lastYear: mapInfo.last_year
		    			, viewCd: mapInfo.view_cd
		    			, regionCd: seekcode
		    			, sidoCd: mapInfo.sido_cd
		    			, sggCd: mapInfo.sgg_cd
		    			, emdongCd: mapInfo.emdong_cd	    		
		    			, infoDiv: infoDiv_cd
		    			, list : mapInfo.data_kind[mapInfo.view_cd]
	    				, yearList : mapInfo.year_list
	    			} ;
		return obj ; 
		 
	   }
	 
	    function fn_board2_3_init_chart_getData(queryYear){
			//읍면동 모드
	    	const obj = fn_setBoard2DataParam(queryYear);
	    	obj.viewCd = (mapInfo.view_cd=="sido")?"sido":"sgg";
	    	obj.regionCd = (mapInfo.view_cd=="sido")?obj.regionCd.substr(0,2):obj.regionCd.substr(0,5);
	    	obj.infoDiv = (mapInfo.view_cd=="sido")?"2":"3";
	    	obj.datakind = mapInfo.dataKind ;  //대소문자 조심
	    	obj.queryYear = queryYear ;
	    	obj.thisYear = queryYear ;
	    	
	    	$.ajax({
	            url : "/view/lvs/dataRecListByYear" ,
	            data: JSON.stringify(obj),
	            dataType: "json",
	            contentType: "application/json; charset=UTF-8",            
	            type : "POST",
					success: function (res, status) {
				        const resultObj =fn_getCensusYearData(res,mapInfo.dataKind);
				        let chartData = { "title": $("#curStat").html(), "category": resultObj.category, "data": resultObj.data } ;// 변화그래프 탭 차트
				        fn_combiColumn('tab4_chart3', chartData) //  차트 아아디 + 데이터
					},
					complete : function(){
				    },
				});
	    }
	    
	    
	    ///
	    function fn_board1_region_getData(){
			//읍면동 모드
	    	const obj = fn_setBoard2DataParam(queryYear);
	    	obj.viewCd = (mapInfo.view_cd=="sido")?"sido":"sgg";
	    	obj.regionCd = (mapInfo.view_cd=="sido")?obj.regionCd.substr(0,2):obj.regionCd.substr(0,5);
	    	obj.infoDiv = (mapInfo.view_cd=="sido")?"2":"3";
	    	
	    	return ;
	    	
	    	$.ajax({
	            url : "/view/lvs/dataRegionGetList" ,
	            data: JSON.stringify(obj),
	            dataType: "json",
	            contentType: "application/json; charset=UTF-8",            
	            type : "POST",
					success: function (res, status) {
				        const resultObj =fn_getCensusYearData(res,mapInfo.dataKind);
				        let chartData = { "title": $("#curStat").html(), "category": resultObj.category, "data": resultObj.data } ;// 변화그래프 탭 차트
				        fn_combiLineColumn('tab4_chart3', chartData) //  차트 아아디 + 데이터
					},
					complete : function(){
				    },
				});
	    }
	    
	    
	    function fn_board2_4_vrs_chart_getData(cd, div, rowNo, regionTitle, rowValue){
	    	
			//읍면동 모드
	    	const obj = fn_setBoard2DataParam();
			obj["regionCd"] = cd ;
			obj["infoDiv"] = div ;
			
	    	$.ajax({
	            url : "/view/lvs/dataCensusIndexYearList" ,
	            data: JSON.stringify(obj),
	            dataType: "json",
	            contentType: "application/json; charset=UTF-8",            
	            type : "POST",
					success: function (res, status) {
						
						let dataName = "";
						if (rowValue == "row1") 		dataName = "yearData" 
						else if(rowValue == "row2")		dataName = "yearDataUp"
							
						 const item = Object.assign({}, mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][mapInfo.dataKind][dataName]);  // yearDataup
						 item.data = fn_data_downsize(item.data) ;
						 if (rowNo=="row1")
							 item.originTitle = (mapInfo.view_cd=="sgg")?$("#curSido").html()+" " +$("#curSido").html():$("#curSgg").html();
					     else if(rowNo=="row2")    
						    item.originTitle = (mapInfo.view_cd=="sgg")?$("#curSido").html():"전국";
						    
						    
						 item["vrsTitle"] = regionTitle ;
				         const vrsItem =fn_getCensusYearCmpData(res,mapInfo.dataKind);
				         vrsItem.data = fn_data_downsize(vrsItem.data) ;
				        
				        let chartId ="" ;
				        let tableId  ="" ;
				        
					     if(rowNo == "row1") { 
					         chartId = 'vrsChartId_row1';
					         tableId = 'vrs2TableId_row1';
					     } else if (rowNo == "row2") { 
					         chartId = 'vrsChartId_row2';
					         tableId = 'vrs2TableId_row2';
					     };
					     
						 fn_board2_4_init_chart(chartId, item, vrsItem);
						 $("#"+tableId).html(fn_board2_4_init_table(vrsItem));
				        
					},
					complete : function(){
				    },
				});
	    }
	    
	 
	 //합산 
	 function fn_tot_sum(obj){
		 let sum=0;
		 for(let i=0; i<obj.length; i++){
			 sum += obj[i];
		 }
		 return sum ;
	 }
	 
	 //세번째 모든 지표보기
	 function fn_init_board_type3(){
		 let dataKind =  mapInfo.dataKind ;
		 
	     //const objInfo = Object.assign({}, mapInfo.data_kind_all[dataKind]);  // 깊은복사
	     	     
	     const objInfo = JSON.parse(JSON.stringify(mapInfo.data_kind_all[dataKind]));	     

	     if (mapInfo.view_cd=="sido")
	    	 objInfo["region_name"] = mapInfo.sido_nm;
	     else if (mapInfo.view_cd=="sgg")
	    	 objInfo["region_name"] = mapInfo.sido_nm + " " + mapInfo.sgg_nm;
	     else if (mapInfo.view_cd=="emdong")
	    	 objInfo["region_name"] = mapInfo.sido_nm + " " + mapInfo.sgg_nm + " " + mapInfo.emdong_nm;
	     
	     const objStat = mapInfoAllData[mapInfo.region_cd][dataKind];
	     
	     objInfo["tot_sum"] = fn_tot_sum(objStat.data);
	     objInfo["display_large"] = (mapInfo.boardSize=="large")?"block":"none" ;   //  큰창     
	     objInfo["display_small"] =(mapInfo.boardSize=="small")?"block":"none" ; ;   // 작은창
	     
			 
		 let extend_data_03 = extend_data_03_temp + "" ;
		 extend_data_03 = fn_temp_replaceAll(extend_data_03, objInfo);
		 
		 let exboardType = "" ;
		 
		 
		 if      (objInfo.type =="A") exboardType = extend_data_03_typeA_temp + "" ;
		 else if (objInfo.type =="B") { 
			 exboardType = extend_data_03_typeB_temp + "" ;
			 exboardType = exboardType.replaceAll("#yearlist#",fn_extend_data_03_typeB_yearlist(objStat));
		 }
		 else if (objInfo.type =="C") { 
			 exboardType = extend_data_03_typeC_temp + "" ;		 
			 exboardType = exboardType.replaceAll("#yearlist#",fn_extend_data_03_typeB_yearlist(objStat));			 
		 }
		 else if (objInfo.type =="D") exboardType = extend_data_03_typeD_temp + "" ;
		 
		 extend_data_03 = extend_data_03.replaceAll("#exboardType#", exboardType);
	     $(".extend_data_03").empty();
		 $(".extend_data_03").html(extend_data_03);
		 
		 fn_extend_data_03_init_chart(objInfo,objStat);
		 fn_tabComon_event_config("remove");		 

	 }
	 

	 //년도 표시아이콘 만들기
	 function fn_extend_data_03_typeB_yearlist(objStat){
		 if (!objStat.yearlist) return "<li></li>" ;
		 let temp = `<li #active# onclick="fn_board3_type2('#year#')" id="data_03_typeB_#year#">#year#</li>`;
		 let result = "";
		 
		 if (!objStat.cur_year){
			 objStat.cur_year =  objStat.yearlist[objStat.yearlist.length-1] ;			 
		 }
		 
		 for(let i=0; i<objStat.yearlist.length; i++){
			 let temp1 = temp + "" ;
			 let activeTxt = (objStat.yearlist[i]==objStat.cur_year)?` class="active" `:""; 
			 const obj = {year:objStat.yearlist[i], active:activeTxt};
			 result = result + fn_temp_replaceAll(temp1,obj);
		 }

		 return result;
	 }
	 
	 //년도 표시아이콘 만들기
	 function fn_extend_data_03_typeC_yearlist(objStat){
		 if (!objStat.yearlist) return "<li></li>" ;
		 let temp = `<li #active# onclick="fn_board3_type3('#year#')" id="data_03_typeC_#year#">#year#</li>`;
		 let result = "";
		 
		 if (!objStat.cur_year){
			 objStat.cur_year =  objStat.yearlist[objStat.yearlist.length-1] ;			 
		 }
		 
		 for(let i=0; i<objStat.yearlist.length; i++){
			 let temp1 = temp + "" ;
			 let activeTxt = (objStat.yearlist[i]==objStat.cur_year)?` class="active" `:""; 
			 const obj = {year:objStat.yearlist[i], active:activeTxt};
			 result = result + fn_temp_replaceAll(temp1,obj);
		 }

		 return result;
	 }
	 
	 
	 
	 //데이터를 다시 가져와서, 색지도 그리고, 오른쪽 보드 다시 그린다.
	 function fn_board3_type2(year){
		 fn_get_board3_data(mapInfo.dataKind,year);
	 }
	 
	 function fn_board3_type3(year){
		 fn_get_board3_data(mapInfo.dataKind,year);
	 }
	 
	 
	 
	 
	 //테이블 높이 재조정
	 function fn_extend_data_03_bType_init_height_calc(type){
		 
		 type =  type.charAt(0).toLowerCase() + type.slice(1);		 		 
		 let deferred = $.Deferred();
		 
         // let type = "bType"
         let parentTarget = $(".extend_data_03 .main .main_wrap");
         let conatinerHeight = $(parentTarget).height() - $(parentTarget).children('.headerWrap').outerHeight() - $(parentTarget).children('.text').outerHeight() - 15  // padding 15    
         let sectionType = $('.main_wrap').find('.' + type); // sectionHeight
         
         let headerHeight = $(sectionType).children('.section.chartArea').find('.accHeader').eq(0).outerHeight(true);
         let tabHeight = $(sectionType).children('.section.chartArea').find('.tabCommon').eq(0).outerHeight(true);
         let yearHeight = $(sectionType).children('.section.year').outerHeight(true);
         let chartType = $(".exboardType." + type).find('.chart_wrap');
         let tableType = $(".exboardType." + type).find('.table_wrap');
         
         let chartHeight = 0;
       
         if (type == 'aType') chartHeight = conatinerHeight - headerHeight - 10 // padding
         else if (type == 'bType' || type == 'cType') chartHeight = conatinerHeight - headerHeight - tabHeight - yearHeight - 30 // margin
         else if (type == 'dType') chartHeight = conatinerHeight - headerHeight - tabHeight - 20 // padding         
         
         $(".exboardType." + type).css('height', conatinerHeight)
         $(chartType).css('height', chartHeight)
         $(tableType).css('height', chartHeight)
         
         deferred.resolve();
		 return deferred.promise();
		 
	 }
	 
	 function fn_replace_focus_dong(tmepObj){
		 let num = -1 ;
		 for(i=0; i<tmepObj.category.length; i++){
			 if(tmepObj.category[i]==mapInfo.emdong_nm){
				 num =i ;
				 break ;
			 }
		 }
		 return num ;
	 }
	 
      //고경남
	 function fn_extend_data_03_init_chart(objInfo, objStat){
		// 컬럼+라인 더미데이터
		 //깊은복사
		 
		 let typeParam = `${objInfo.type}Type`;
		 
		 $.when(fn_extend_data_03_bType_init_height_calc(typeParam))
		 .done(function() {
			 
		 		if (objInfo.type=="A") {
		 		   fn_columnLineLarge('chartAId',objStat) // chartId , data
		 		 } else if (objInfo.type=="B") {
		 	        $("#chartBId").css('height', objStat.length * 25); // 행 갯수에 따라 높이 조절 (고정폭 25 * 데이터 길이)
		 	        
		 		    //const objStat2 = Object.assign({}, objStat);  // 깊은복사
		 		    const objStat2 = JSON.parse(JSON.stringify(objStat));
		 		   
		 	        if(mapInfo.view_cd=="emdong"){
		 	        	let num = fn_replace_focus_dong(objStat2);   // 바 차트
		 			    const copyData = objStat2.data.slice();
		 	        	if (num>=0){
		 	        		const obj ={y:objStat2.data[num]+0, color:'red'};
		 	        		copyData[num] =obj ;
		 	        	}
		 		        objStat2.data = copyData.slice();	        	
		 	        }
		 	        
		 	        fn_barLarge('chartBId',objStat2);   // 바 차트 	        
		 		    fn_makeEx3BoardTable1('bType_table',objStat.tableData); // 바 차트 테이블	        

		 	        
		 		 } else if (objInfo.type=="C") {
		 		        $("#cType_chart1").css('height', objStat.length * 25) // 행 갯수에 따라 높이 조절 (고정폭 25 * 데이터 길이)
		 		        $("#cType_chart2").css('height', objStat.length * 25) // 행 갯수에 따라 높이 조절 (고정폭 25 * 데이터 길이)
		 		        
		 			    //const objStat2 = Object.assign({}, objStat);  // 깊은복사
		 		        const objStat2 = JSON.parse(JSON.stringify(objStat));
		 		       
		 		        if(mapInfo.view_cd=="emdong"){
		 		        	let num = fn_replace_focus_dong(objStat2);   // 바 차트
		 				    const copyData = objStat2.data.slice();
		 		        	if (num>=0){
		 		        		const obj ={y:objStat2.data[num]+0, color:'red'};
		 		        		copyData[num] =obj ;
		 		        	}
		 			        objStat2.data = copyData.slice();	        	
		 		        }
		 		        
		 		        fn_barLarge('cType_chart1',objStat2);   // 바 차트	        
		 		        fn_makeEx3BoardTable1('cType_table1', objStat.tableData) // 바 차트 테이블
		 		        fn_solidgauge('cType_chart2',objStat.tableData2)  // 서클 게이지 차트 
		 		        fn_makeEx3BoardTable2('cType_table2', objStat.tableData2) // 서클 게이지 테이블
		 		        
		 		        $("#cType_table1").css('height', objStat.tableData.length * 25) ;// 행 갯수에 따라 높이 조절 (고정폭 25 * 데이터 길이)		        
		 		        
		 		 } else if (objInfo.type=="D") {
		 			 
		 			   //console.log(objStat) ;
		 			   //debugger ;
		 		        //$("#dType_chart").css('height', objStat.tableData.length * 25) // 행 갯수에 따라 높이 조절 (고정폭 25 * 데이터 길이)
		 		        //$("#dType_table").css('height', (objStat.tableData.length-5) * 25) // 행 갯수에 따라 높이 조절 (고정폭 25 * 데이터 길이)
		 			   
		 		        $("#dType_chart").css('height', objStat.subDiv.length * 25) // 행 갯수에 따라 높이 조절 (고정폭 25 * 데이터 길이)
		 		        $("#dType_table").css('height', (objStat.subDiv.length-5) * 25) // 행 갯수에 따라 높이 조절 (고정폭 25 * 데이터 길이)
		 		        
		 		        let objStatData = {category:[],data:[], title: ""} ;
		 		        

		 		        for (let i=0; i<objStat.subDiv.length; i++){
		 		        	objStatData.category[i] = objStat.subDiv[i].adm_nm ;
		 		        	objStatData.data[i] = objStat.subDiv[i].data ;
		 		        	objStatData.title = objStat.subDiv[i].title ;
		 		        }
		 			   
		 		        
		 		        fn_barLarge('dType_chart',objStatData);   // 바 차트 
		 		        fn_makeEx3BoardTable1('dType_table', objStat.subDiv); // 바 차트 테이블
		 		        
		 		 }
		 		
		 		
		 	})
		 
		 
	 }
	 //테이블그리기 
	 function fn_makeEx3BoardTable1(id,data){
		 let html_temp = `<tr>
			 			<td #style#>#adm_nm#</td>
			 			<td #style#>#region_cd#</td>
			 			<td #style#>#rnk#</td>
			 			<td #style#>||val||</td>
			 			<td #style#>#rt#</td>
			 		  </tr>`;
		 
		    let result = "" ;
		   
		    data.forEach(function(obj) {
		    	
		        let html =  html_temp + "" ;
		        if (mapInfo.view_cd =="emdong" && mapInfo.emdong_nm == obj.adm_nm) {
		        	obj.style = ` style="background-color:yellow;" `; 	
		        } else {
		        	obj.style = "" ;
		        }
		        html = fn_temp_replaceAll(html_temp,obj);
		        result = result + html ;
		    });
	        $("#"+id).append(result) ;
		}
	 
	// 전체지표 상위지역비교 데이터 보기 테이블 생성
	 function fn_makeEx3BoardTable2(id,data) {
	     data.forEach(function(element){
	         let html = "";
	         html += '<tr>'
	         html += '<td>'+element.title+'</td>'
	         html += '<td>'+element.data+'</td>'
	         html += '</tr>'
	         $("#"+id).append(html)
	     });
	 }	 
	 
	 
	 /**
	  * 추천지표 타 지자체 비교 비교지역 추가 버튼 클릭 이벤트
	  * @param {element} obj 클릭 대상 엘리먼트
	  * @returns 지역 이름
	  */
	  
	 function fn_openVrsRegionPopup(obj) {
		 
		 let hasChart = $(obj).closest('.title').siblings('.content').find('.chartArea > div').attr('data-highcharts-chart');
		 if(hasChart == undefined) {
			 alert("비교지역을 추가할 수 없습니다.");
			 return;
		 }
		 
		 fn_makeSelect("board2_sido_select", mapInfo.sidoObj, mapInfo.sido_cd, "<option selected='selected' disabled >시/도</option>" );
		 fn_makeSelect("board2_sgg_select", mapInfo.sggObj, "", "<option selected='selected' value='0'>시/군/구</option>" );
		 

	     $("#vrsRegionElement").val($(obj).data('target'))
	     $("#vrsRegionNmElement").val($(obj).data('admnm'))	     
	     
	     $(".vrsRegionPopup").show();
	     $(".vrsRegionPopup").css('left',event.layerX)
	     $(".vrsRegionPopup").css('top',event.layerY)

	 }

	 // 비교지역선택 팝업 닫기
	 function fn_selectVrsRegionPopupClose() {
	     $(".vrsRegionPopup").hide();
	 }
	 
	 // 비교지역 선택하여 차트 및 테이블 그리기
	 function fn_vrsRegionPopupSelect() {
	     $(".vrsRegionPopup").hide();
	     let targetValue = $("#vrsRegionElement").val();   //row1 or row2
	     let targetNm =  $("#vrsRegionNmElement").val();   //row1 or row2

	     let nameLevel1 = $('select[name=level1] option:selected').text();  // 시도 네임
	     let nameLevel2 = $('select[name=level2] option:selected').text();  // 시군구 네임
	     let nameLevel3 = $('select[name=level3] option:selected').text();  // 읍면동 네임
	     
	     let cd1 = $('select[name=level1] option:selected').val();  // 시도 네임
	     let cd2 = $('select[name=level2] option:selected').val();  // 시군구 네임
	     let cd3 = $('select[name=level3] option:selected').val();  // 읍면동 네임
	     
	     
	     if(nameLevel1 == "시/도") nameLevel1 = "";
	     if(nameLevel2 == "시/군/구") nameLevel2 = "";
	     if(nameLevel3 == "읍/면/동") nameLevel3 = "";
	     
	     if(nameLevel1 == "") {
	         alert("지역을 선택해주세요.") 
	         return false;
	     }
	     
	     let infoDiv ="1" ;
	     let selectRegionName = nameLevel1;
	     let cd = cd1 ;
	     
	     if(nameLevel2 !="" && nameLevel3 == ""){
	    	 infoDiv ="2";
	         selectRegionName = nameLevel1+ " " + nameLevel2;
	         cd = cd2 ;
	     }
	     
	     if(nameLevel2!="" && nameLevel3 != ""){
	    	 infoDiv ="3";
	    	 selectRegionName = nameLevel1 + " " + nameLevel2+ " " +nameLevel3;
	    	 cd = cd3 ;
	     }
	     

	     
	     if(targetValue == "row1") {
	         $(".row1Target").css('display','flex');;
	         $(".row1Target").children('.regionName').html(selectRegionName)
	         $("#row1_vrs_off").hide();
	         $("#row1_vrs_on").show();
	     } else if (targetValue == "row2") {
	         $(".row2Target").css('display','flex');;
	         $(".row2Target").children('.regionName').html(selectRegionName)
	         $("#row2_vrs_off").hide();
	         $("#row2_vrs_on").show();
	     }  
	     
	     $(".vrsRegionPopup").hide();	     
	     fn_board2_4_vrs_chart_getData(cd,infoDiv,targetValue,selectRegionName,targetValue);
	 }
	 
	 /**
	  * 추천지표 타 지자체 비교 비교지역 삭제
	  * @param {string} row 대상 구분 파라미터
	  */
	 function fn_vrsRegionDelete(row) {
	    let chartId; 
	    if(row == "row1") {
	        $(".row1Target").hide();
	        $("#row1_vrs_on").hide();
	        $("#row1_vrs_off").show();
	         chartId = "vrsChartId_row1";

	    } else if (row == "row2") {
	        $(".row2Target").hide();
	        $("#row2_vrs_on").hide();
	        $("#row2_vrs_off").show();
	         chartId = "vrsChartId_row2";
	    }

	     $("#"+chartId).highcharts().series[1].setData();
	     $("#"+chartId).highcharts().series[1].name = ""
	 }
	 
	 
	 function fn_changeLocation(mode){
		    fn_getSggInfo($("#sido_select option:selected").val(), 'all');
	 }
	 
	 function fn_changeLocation_board2(mode){
		 if (mode=="sido")  //시도정보가 변경되면
		    fn_getSggInfo($("#board2_sido_select option:selected").val(), 'board2_sub');
		 else if (mode=="sgg") //시군구정보가 변경되면
		    fn_getEmdongInfo($("#board2_sgg_select option:selected").val(), 'board2_sub');
	 }
	 
	 
	 
	 
	 function selectViewMode(mode){
		 var obj = null ;
		 var seekCode = "" ;
		 
		 $('.subCounty').hide();
		 
		 if(mapInfo.boardType == 'board1') {
			 mapInfo.sliderTimerPlay = 'viewMode'
		 }
		
		 
		 if(mode==1) {
			 $('.province').addClass('active');  // 시도
			 $('.county').removeClass('active');  //시군구
			 $('.subCounty').removeClass('active');  //읍면동
			 obj = mapInfo.sidoObj;
			 mapInfo.view_cd = "sido";
			 mapInfo.region_cd = mapInfo.sido_cd ;			 
			 mapInfo.emdong_cd = "" ;
			 mapInfo.emdong_nm = "" ;			 
		 } else if (mode==2) {
			 $('.province').removeClass('active');
			 $('.county').addClass('active');			 
			 $('.subCounty').removeClass('active');
			 mapInfo.view_cd = 'sgg';
			 obj = mapInfo.sggObj;		
			 mapInfo.region_cd = mapInfo.sido_cd + mapInfo.sgg_cd ;
			 mapInfo.emdong_cd = "" ;
			 mapInfo.emdong_nm = "" ;			 
			 $("#sgg_select").val(mapInfo.region_cd).prop("selected", true); //값이  시군구 선택
		 } else if (mode==3) {
			 $('.province').removeClass('active');
			 $('.county').removeClass('active');			 
			 $('.subCounty').addClass('active');
			 $('.subCounty').show();
			 mapInfo.view_cd = 'emdong';			 
			 obj = mapInfo.sggObj;		
			 mapInfo.region_cd = mapInfo.emdong_cd;


		 }
		 
		 for(let i=0; i< obj.length; i++){
			 if (obj[i].cd == mapInfo.region_cd ){
				 mapInfo.x =  obj[i].x_coor ;
				 mapInfo.y =  obj[i].y_coor ;
	 	  	     mapInfo.x2 = parseFloat(parseFloat(mapInfo.x) )  ;
	  	  	     mapInfo.y2 = parseFloat(parseFloat(mapInfo.y) )  ;
			 }
		 }
		 
		 $("#btn_close").trigger("click");
		 
		   //일단경계를 지운다.
	     if (mode!=3){		 
	        fn_setFixedMapView(mapLocationInfo[mapInfo.region_cd]);   // 맵의크기 위치값을 보정한다
	     }
	     
	     let runMode="" ;
	     if (mode==3){
	    	 //데이터만 다시 가져온다.
	    	 runMode = "dataBoardOnly";
	     }
	     if      (mapInfo.boardType=="board1") fn_board1_fullData(runMode); // 모드에 따라 경계, 색지도, 보드 그리는 것을 선택한다.
	     else if (mapInfo.boardType=="board2") fn_board2_fullData(); // 경계 다시 그리기
	     else if (mapInfo.boardType=="board3") fn_board3_fullData(); // 경계 다시 그리기
		 
	 }
	 
	 
	 // board타입에 따른 분기
	 function fn_redrawMap(){		 
		 
		 //선택된 시도/시군구 여부에 따라 x, y좌표를 알아온다.
		 if ($("#sgg_select option:selected").val()=="0"){
			 alert("시군구를 선택해주세요");
			 return ;
		 }
		 
		 mapInfo.sido_cd = $("#sido_select option:selected").val() ;
		 mapInfo.sgg_cd = $("#sgg_select option:selected").val().substr(-3) ;
		 mapInfo.sido_nm = $("#sido_select option:checked").text() ; 
		 mapInfo.sgg_nm = $("#sgg_select option:checked").text() ;
		 
		 mapInfo.view_cd = "sgg";

		 selectViewMode(2);
		 $("#curSido").html(mapInfo.sido_nm);
		 $("#curSgg").html(mapInfo.sgg_nm);		 
		 $('#btn_close').trigger("click");
	 }
	 
	 
	 function getToken(){
		 //https://sgisapi.kostat.go.kr
		 //openApiPath

			$.ajax({
	              url : openApiPath + "/OpenAPI3/auth/authentication.json" +
	              		"?consumer_key="+mapInfo.consumer_key+"&consumer_secret="+mapInfo.consumer_secret,
	              type : "get",
					success: function (res, status) {
						mapInfo.accessToken = res.result.accessToken;

					},
					complete : function(){
						getReverseGeo();
				    },
					
				});
	 }

	 
	 
	 function getReverseGeo(){
		 if (mapInfo.accessToken ==null || accessToken == null){
			 alert("토큰 정보가 없습니다. ");
			 return ;
		 }
		 
		 if (mapInfo.accessToken ==null ){
			 mapInfo.accessToken = accessToken ;
		 }
		 
		 
		 var url_str = openApiPath + "/OpenAPI3/addr/rgeocode.json?accessToken="+mapInfo.accessToken+"&x_coor="+mapInfo.x+"&y_coor="+mapInfo.y+"&addr_type=20" ;
	 
			$.ajax({
  	              url : url_str ,	              				
	              type : "get",
					success: function (res, status) {
						if (res.errMsg !="Success") {
							alert('주소데이터 조회 실패입니다. 잠시후에 시도해주세요');
							return ;
						}
						mapInfo.addrObj = res.result[0] ;
						mapInfo.sido_cd = mapInfo.addrObj.sido_cd ;
						mapInfo.sido_nm = mapInfo.addrObj.sido_nm ;
						mapInfo.sgg_cd = mapInfo.addrObj.sgg_cd ;
						mapInfo.sgg_nm = mapInfo.addrObj.sgg_nm ;
						mapInfo.emdong_cd = mapInfo.addrObj.emdong_cd ;
						mapInfo.emdong_nm = mapInfo.addrObj.emdong_nm ;
						
						
						if (mapInfo.view_cd=="sido")
						    mapInfo.region_cd  = mapInfo.sido_cd ;
						else if (mapInfo.view_cd=="sgg")
						    mapInfo.region_cd  = mapInfo.sido_cd + mapInfo.sgg_cd ;
						else if (mapInfo.view_cd=="emdong")
						    mapInfo.region_cd  = mapInfo.sido_cd + mapInfo.sgg_cd + mapInfo.emdong_cd;						
						
						$("#curSido").html(mapInfo.sido_nm);
						$("#curSgg").html(mapInfo.sgg_nm);
						$("#curEmd").html("");						
						
						fn_setFixedMapView(mapLocationInfo[mapInfo.region_cd]);   // 맵의크기 위치값을 보정한다 
				   		
						fn_getSidoInfo();   // 
						//getArea();  //지도그리기
						fn_board1_fullData();   //전체데이터가져오기						
 
					},
					complete : function(){
				    },
				});
	 }
	 
	 function fn_setFixedMapView(objXY){
		 let x2,y2,level ;
		 if (objXY != undefined) {
			 x = objXY['x2'];
			 y = objXY['y2'];
			 mapInfo.level = objXY['level']; 
		 } else {
			 //좌우크기를 감안, 해상도를 감안해서  위치 및 레벨을 조정한다.
			 x =  mapInfo.x ;
			 y =  mapInfo.y ;
			 
			 if (mapInfo.view_cd=="sido")
				 mapInfo.level = 4 ;
			 else 
				 mapInfo.level = 5 ;
		 }
		 
	     mapInfo.map.setView(sop.utmk(x, y), mapInfo.level);		 
	 }
	 
	 function displayAddrInfo(){
			if (mapInfo.view_cd =="sido") { 
				fn_makeSelect("sgg_select", mapInfo.sggObj, "0", "<option selected='selected' value='0'>시/군/구</option>" );
			} else if(mapInfo.view_cd =="sgg") {
				$("#myFullAddr").html(mapInfo.addrObj.sido_nm + " " + mapInfo.addrObj.sgg_nm);
				fn_makeSelect("sgg_select", mapInfo.sggObj, mapInfo.region_cd, "<option selected='selected' value='0'>시/군/구</option>" );				
			}
//			else if(mapInfo.view_cd =="emdong")  $("#myFullAddr").html(mapInfo.addrObj.full_addr);
			else if(mapInfo.view_cd =="emdong")  $("#myFullAddr").html(mapInfo.addrObj.sido_nm + " " + mapInfo.addrObj.sgg_nm); // 시도 주소 노출 수정		

	 }
	 
	 function fn_getSidoInfo(){
			$.ajax({
	              url : openApiPath + "/OpenAPI3/addr/stage.json?accessToken="+mapInfo.accessToken,	              				
	              type : "get",
					success: function (res, status) {
						if (res.errMsg !="Success") {
							alert('시도 정보 데이터 조회 실패입니다. 잠시후에 시도해주세요');
							return ;
						}
						
						mapInfo.sidoObj = res.result ;
						fn_makeSelect("sido_select",mapInfo.sidoObj, mapInfo.addrObj.sido_cd, "<option selected='selected' disabled >시/도</option>" );
						fn_getSggInfo(mapInfo.addrObj.sido_cd,'all');						
					},
					complete : function(){
				    },
				});
	 }
	 
	 function fn_getSggInfo(cd, mode){
			$.ajax({
	              url :  openApiPath + "/OpenAPI3/addr/stage.json?accessToken="+mapInfo.accessToken+"&cd="+cd,	              				
	              type : "get",
					success: function (res, status) {
						if (res.errMsg !="Success") {
							alert('시군구 정보 데이터 조회 실패입니다. 잠시후에 시도해주세요');
							return ;
						}
						mapInfo.sggObj = res.result ;						
						if (mode=="all") {   //메인 주소창 변경
							mapInfo.sggObj = res.result ;							
						} else if (mode=="board2_sub") {  //타지자체 비교하는 주소창 변경
							mapInfo.board2_sggObj = res.result ;
							mapInfo.board2_emdongObj = {};
						}
						
						displaySggCombo(mode);
						
					},
					complete : function(){
				    },
				});
	 }
	 
	 function fn_getEmdongInfo(cd, mode){
			$.ajax({
	              url :  openApiPath + "/OpenAPI3/addr/stage.json?accessToken="+mapInfo.accessToken+"&cd="+cd,	              				
	              type : "get",
					success: function (res, status) {
						if (res.errMsg !="Success") {
							alert('시군구 정보 데이터 조회 실패입니다. 잠시후에 시도해주세요');
							return ;
						}
						
						if (mode=="board2_sub") {
							mapInfo.board2_emdongObj = res.result ;
						}
						
						displayEmdongCombo(mode);
						
					},
					complete : function(){
				    },
				});
	 }
	 
	 
     //
	 function displaySggCombo(mode){
		   if (mode=="all") {
			  fn_makeSelect("sgg_select", mapInfo.sggObj, mapInfo.sgg_cd, "<option selected='selected' value='0'>시/군/구</option>" );
		   }  else if(mode=="board2_sub") {
			  fn_makeSelect("board2_sgg_select", mapInfo.board2_sggObj, '', "<option selected='selected' value='0'>시/군/구</option>" );
			  fn_makeSelect("board2_emdong_select", {},'', "<option selected='selected' value='0'>읍/면/동</option>" );			  
		   }
	 }
     
     //
	 function displayEmdongCombo(mode){
		 if(mode=="board2_sub") {
			  fn_makeSelect("board2_emdong_select",mapInfo.board2_emdongObj,'', "<option selected='selected' value='0'>읍/면/동</option>" );
		 }
	 }
	 
	 function fn_makeSelect(id,obj,curValue,preOption){
		 $("#"+id).empty();
	     $("#"+id).append(preOption);
         for (var i=0; i<obj.length; i++ ) {
        	 let selected = "" ;
        	 if (obj[i].cd == curValue) selected = " selected " ;
	         $("#"+id).append("<option value='"+obj[i].cd+"' "+selected+">" + obj[i].addr_name+"</option>");
	      }			
	 }
	 
	 
	 //현재 영역선택
	 function fn_selectDong1(cd, nm) {
 		 if   (mapInfo.view_cd=="sido") {
			 mapInfo.sgg_cd = cd.substr(-3) ;
			 $("#curSgg").html(nm);			 
			 selectViewMode(2);
		 } else  {
			 mapInfo.view_cd="emdong";
			 mapInfo.emdong_cd = cd ;
			 $("#curEmd").html(nm);
			 selectViewMode(3);			 
			 //fn_dongReDisplay();
		 } 
	 }
	 
	 //보드 현재 영역선택
	 function fn_selectDong2(cd, nm) {
 		 if   (mapInfo.view_cd=="sido") {
			 mapInfo.sgg_cd = cd.substr(-3) ;
			 $("#curSgg").html(nm);			 
			 selectViewMode(2);
		 } else  {
			 mapInfo.view_cd="emdong";
			 mapInfo.emdong_cd = cd ;
			 mapInfo.emdong_nm = nm ;
			 $("#curEmd").html(nm);
			 selectViewMode(3);			 
			 //fn_dongReDisplay();   
		 } 
	 }
	 
	 //현재 영역선택
	 function fn_selectDong3(cd, nm) {
 		 if   (mapInfo.view_cd=="sido") {
			 mapInfo.sgg_cd = cd.substr(-3) ;
			 $("#curSgg").html(nm);			 
			 selectViewMode(2);
		 } else  {
			 mapInfo.view_cd="emdong";
			 mapInfo.emdong_cd = cd ;
			 mapInfo.emdong_nm = nm ;
			 $("#curEmd").html(nm);
			 $('.province').removeClass('active');
			 $('.county').removeClass('active');			 
			 $('.subCounty').addClass('active');
			 $('.subCounty').show();
			 obj = mapInfo.sggObj;		
			 fn_setDataForLayer3(mapInfo.dataKind);  //색지도 표시				
			 fn_init_board_type3();  //보드표시
		 } 
	 }
	 
	 function fn_dongReDisplay(){
		 $('.province').removeClass('active');
		 $('.county').removeClass('active');			 
		 $('.subCounty').addClass('active');
		 $('.subCounty').show();
		 mapInfo.view_cd = 'sgg';			 
		 obj = mapInfo.sggObj;		
		 fn_getStatistic() ;
	 }
	 
	 //통계올리기
	 function fn_getStatistic(){
		if  (mapInfo.boardType=="board1") {
			fn_setDataForLayer1(mapInfo.dataKind);
		} else if (mapInfo.boardType=="board2") {
			fn_setDataForLayer2(mapInfo.dataKind);
		} else if (mapInfo.boardType=="board3") {
			fn_get_board3_data(mapInfo.dataKind,""); //데이터가져오고 맵그리고, 데이터보드 처리하고			
		} 
	 }
	 
	 function fn_number_format(str){
		 if (str=="N/A") return ;
		 return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	 }

	 //경계를 지우고 다시 경계를 그린다.
	 function fn_reset_areaLayer(){
		//경계는 있으면 지운다. 
		if (mapInfo.sopArea) {
			mapInfo.sopArea.remove();
	 	    mapInfo.sopArea = null;
	 	    mapInfo.sopArea = undefined ;
		}
			
     	mapInfo.sopArea = sop.geoJson(mapInfo.oriArea).addTo(mapInfo.map);
	 }
	 
	 function fn_setDataForLayer1(dataKind){
			//let target = mapInfoData[mapInfo.region_cd]["censusIndex"] ;

			let conComplite = {} ;
			let key, value, strToolTip;
			
			
			//경계를 다시 그린다.
			fn_reset_areaLayer() ;
			
			/*
			if (!mapInfoData[mapInfo.region_cd] 
				|| mapInfoData[mapInfo.region_cd][mapInfo.dataKind]
				|| mapInfoData[mapInfo.region_cd][mapInfo.dataKind]["name"] 			
			) return ;
			*/
			

			
			let dataKindNm  = mapInfoData[mapInfo.region_cd][mapInfo.dataKind]["name"] ;
			let unitNm = mapInfoData[mapInfo.region_cd][mapInfo.dataKind]["unit"] ;
			let target = mapInfoData[mapInfo.region_cd][mapInfo.dataKind]["subDiv"] ;
				

			//경계에 대한 데이터가 없으면 색지도를 그리지 않는다.
			if (!target) return ; 
			
			for (var idx=0; idx<target.length; idx++) {
				conComplite[target[idx].region_cd] = target[idx];     
			}
			
			var objectList = new Array();
			
			mapInfo.sopArea.eachLayer(function (layer) {
				let location = "" ;
				key = layer.feature.properties.adm_cd + "";
				if(mapInfo.view_cd == "sido") location = mapInfo.sido_nm ; 
				else if(mapInfo.view_cd == "sgg") location = mapInfo.sido_nm +" " +mapInfo.sgg_nm ;
				else if(mapInfo.view_cd == "emdong") location = mapInfo.sido_nm +" " +mapInfo.sgg_nm ;
				
				let dongCheck = true ;
				if (!conComplite[key]) {
					dongCheck = false ;
				}
				
				let nm =  "" ; // 값으로 전달
				let cd = key + "" ; // 값으로 전달 ;
				
				if (dongCheck) {
					value = conComplite[key] ;
					nm =  value.adm_nm + "" ; // 값으로 전달
					strToolTip = '<div class="mapTooltip">';
					strToolTip += `<p class="location">${location} ${nm}</p>`;
					strToolTip += `<p class="data">${value.base_year}년 ${dataKindNm} : ${fn_number_format(value[dataKind])}(${unitNm})</p>`;			
					strToolTip += '</div>';
				} else {
					nm =  layer.feature.properties.adm_nm + "";
					strToolTip = '<div class="mapTooltip">';
					strToolTip += `<p class="location">${nm}</p>`;
					strToolTip += `<p class="data">N/A</p>`;			
					strToolTip += '</div>';
				}

				// 우리동네 상황판 지도 툴팁 html
				layer.bindToolTip(strToolTip);
				
				
				//데이터가 있는 경우에만
				if (dongCheck) layer.on("click",function(e){fn_selectDong1(cd, nm);});
				layer.on("mouseover",function(e){
					layer.setStyle({
						weight : 7,
						color : mapInfo.borderColor[0],
						opacity: 0.9,
						width:1.75
					 });
					}
				);
				
				
				layer.on("mouseout",function(e){
					if (cd == mapInfo.emdong_cd){
						weight_val = 5 ;
						borderColor = mapInfo.borderColor[0] ;
					} else {
						weight_val = 1 ;
						borderColor = mapInfo.borderColor[mapInfo.borderColor.length-1] ;						
					}
					
					layer.setStyle({
						weight : weight_val,
						color : borderColor,
						opacity: 1,
						width:1.75
					});
					}
				);
				
				
				let  rNUm =  (dongCheck==true)?fn_number_format(value[dataKind]):"N/A" ;
				
				if (mapInfo.mode=="show") 
					layer.setCaption({title:rNUm, color:"black"});
				
				var object = new Object();
				if (dongCheck==true) object.value = value[dataKind];
				else                 object.value = null ;
				
				object.admCd = key;
				objectList.push(object);
			});
			

			var legend = fn_calLegend(objectList);						
			fn_areaFillColor(objectList,legend);
			
	 }
	 
	 
	 function fn_setDataForLayer2(){
			//경계를 다시 그린다.

			//경계에 대한 데이터가 없으면 색지도를 그리지 않는다.
			//doka to do  doka9999999999999999999
			let obj = mapInfoRecData[mapInfo.region_cd] ;
			if (!obj){
				alert("데이터가 존재하지 않습니다.");
				return ;
			}
			
			if(mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][mapInfo.dataKind]==null) return ;
			let base_year = mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][mapInfo.dataKind]["base_year"];
			
			if (base_year.length>5){
				alert(base_year + "연도 자리수 오류");
				return ;
			}
			
			if (mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][mapInfo.dataKind]["subDiv"][base_year]== null) {
				alert("하위 행정구역에 대한 통계정보가 존재하지 않습니다.");
				return ;				
			}
			
			//일단경계만 다시 그리자
			fn_reset_areaLayer() ;
			
			let dataKind = mapInfo.dataKind ;
		   
			let target = mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][mapInfo.dataKind]["subDiv"][base_year] ;  // todo
			let conComplite = {} ;
			let key, value, strToolTip;
			let dataKindNm = mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][mapInfo.dataKind]["name"] ;
			let unitNm = mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][mapInfo.dataKind]['unit']			
			
			for (var idx=0; idx<target.length; idx++) {
				conComplite[target[idx].region_cd] = target[idx];     
			}
			
			var objectList = new Array();
			
			mapInfo.sopArea.eachLayer(function (layer) {
				key = layer.feature.properties.adm_cd;
				value = conComplite[key];
				

				//if (!value) { return; }
				let location = "";
				
				if(mapInfo.view_cd == "sido") location = `${mapInfo.sido_nm}` 
				else if(mapInfo.view_cd == "sgg") location = `${mapInfo.sido_nm} ${mapInfo.sgg_nm} `
				else if(mapInfo.view_cd == "emdong") location = `${mapInfo.sido_nm} ${mapInfo.sgg_nm}`
					
				let dongCheck = true ;
				if (!conComplite[key]) {
					dongCheck = false ;
				}
				
				let nm =  "" ; // 값으로 전달
				let cd = key + "" ; // 값으로 전달 ;
				
				if (dongCheck) {
					value = conComplite[key] ;
					nm =  value.adm_nm + "" ; // 값으로 전달
					strToolTip = '<div class="mapTooltip">';
					strToolTip += `<p class="location">${location} ${nm}</p>`;
					strToolTip += `<p class="data">${base_year}년 ${dataKindNm} : ${fn_number_format(value[dataKind])}(${unitNm})</p>`;			
					strToolTip += '</div>';
				} else {
					nm =  layer.feature.properties.adm_nm + "";
					strToolTip = '<div class="mapTooltip">';
					strToolTip += `<p class="location">${nm}</p>`;
					strToolTip += `<p class="data">N/A</p>`;			
					strToolTip += '</div>';
				}

				// 추천지표보기 지도 툴팁 html
				layer.bindToolTip(strToolTip);
					
				if (dongCheck) layer.on("click",function(e){fn_selectDong2(cd, nm);});				
				
				layer.on("mouseover",function(e){
					layer.setStyle({
						weight : 7,
						color : mapInfo.borderColor[0],
						opacity: 0.9,
						width:1.75
					 });
					}
				);
				
				layer.on("mouseout",function(e){
					if (cd == mapInfo.emdong_cd) weight_val = 5 ;
					else weight_val = 1 ;
					
					layer.setStyle({
						weight : weight_val,
						color : mapInfo.borderColor[mapInfo.borderColor.length-1],
						opacity: 1,
						width:1.75
					});
					}
				);
				
				let  rNUm =  (dongCheck==true)?fn_number_format(value[dataKind]):"N/A" ;
				
				if (mapInfo.mode=="show") 
					layer.setCaption({title:rNUm, color:"black"});
				
				var object = new Object();
				if (dongCheck==true) object.value = value[dataKind];
				else                 object.value = null ;
				object.admCd = key;
				objectList.push(object);
			});
			
			//var legend = calculateLegend(objectList);
			var legend = fn_calLegend(objectList);
			fn_areaFillColor(objectList,legend);
			
		 
	 }
	 
	 function fn_setDataForLayer3(){
			//경계를 다시 그린다.
			fn_reset_areaLayer() ;
			//경계에 대한 데이터가 없으면 색지도를 그리지 않는다.
			
			
            if(mapInfoAllData[mapInfo.region_cd] == null) return ;
			if(mapInfoAllData[mapInfo.region_cd][mapInfo.dataKind]==null) return ;
			if(mapInfoAllData[mapInfo.region_cd][mapInfo.dataKind]["subDiv"]== null) return ;
			
				  
			let dataKind = mapInfo.dataKind ;
			let target = mapInfoAllData[mapInfo.region_cd][mapInfo.dataKind]["subDiv"] ;  // todo			
			let conComplite = {} ;
			let key, value, strToolTip;
			let dataKindNm = mapInfoAllData[mapInfo.region_cd][mapInfo.dataKind]["title"] ;
			let base_year = (mapInfo.data_kind_all[mapInfo.dataKind].baseYear)? mapInfo.data_kind_all[mapInfo.dataKind].baseYear:"-"; 
			let unitNm =  (mapInfo.data_kind_all[mapInfo.dataKind].unit)? mapInfo.data_kind_all[mapInfo.dataKind].unit:"-";
			
			for (var idx=0; idx<target.length; idx++) {
				let tempKey = target[idx].region_cd ;
				conComplite[tempKey] = target[idx];
			}
			
			var objectList = new Array();
			
			mapInfo.sopArea.eachLayer(function (layer) {
				key = layer.feature.properties.adm_cd;
				value = conComplite[key];
				
				let location = "";
				if(mapInfo.view_cd == "sido") location = `${mapInfo.sido_nm}` 
				else if(mapInfo.view_cd == "sgg") location = `${mapInfo.sido_nm} ${mapInfo.sgg_nm} `
				else if(mapInfo.view_cd == "emdong") location = `${mapInfo.sido_nm} ${mapInfo.sgg_nm}`
					
				let dongCheck = true ;
				if (!conComplite[key]) {
					dongCheck = false ;
				}
				
				let nm =  "" ; // 값으로 전달
				let cd = key + "" ; // 값으로 전달 ;
					
				if (dongCheck) {
					value = conComplite[key] ;
					nm =  value.adm_nm + "" ; // 값으로 전달
					strToolTip = '<div class="mapTooltip">';
					strToolTip += `<p class="location">${location} ${nm}</p>`;
					strToolTip += `<p class="data">${base_year}년 ${dataKindNm} : ${fn_number_format(value['val'])}(${unitNm})</p>`;			
					strToolTip += '</div>';
				} else {
					nm =  layer.feature.properties.adm_nm + "";
					strToolTip = '<div class="mapTooltip">';
					strToolTip += `<p class="location">${nm}</p>`;
					strToolTip += `<p class="data">N/A</p>`;			
					strToolTip += '</div>';
				}
				layer.bindToolTip(strToolTip);				
				
				if (dongCheck) layer.on("click",function(e){fn_selectDong3(cd, nm);});				

				layer.on("mouseover",function(e){
					layer.setStyle({
						weight : 7,
						color : mapInfo.borderColor[0],
						opacity: 0.9,
						width:1.75
					 });
					}
				);
				
				layer.on("mouseout",function(e){
					if (cd == mapInfo.emdong_cd) weight_val = 5 ;
					else weight_val = 1 ;
					
					layer.setStyle({
						weight : weight_val,
						color : mapInfo.borderColor[mapInfo.borderColor.length-1],
						opacity: 1,
						width:1.75
					});
					}
				);

				
				let  rNUm =  (dongCheck==true)?fn_number_format(value['val']):"N/A" ;
				
				if (mapInfo.mode=="show") 
					layer.setCaption({title:rNUm, color:"black"});
				
				var object = new Object();
				if (dongCheck==true) object.value = value['val'];
				else                 object.value = null ;

				object.admCd = key;
				objectList.push(object);
			});
			
			//var legend = calculateLegend(objectList);
			var legend = fn_calLegend(objectList);						
			fn_areaFillColor(objectList,legend);					 
		 
	 }
	 
	 
	 //추천지표 지역변화보기  doka8888888
	 function fn_setDataForLayer42(mapNum,year){
			//let target = mapInfoData[mapInfo.region_cd]["censusIndex"] ;
			//경계를 다시 그린다.

			if (mapNum==1 &&  mapInfo.sopArea21) {
				mapInfo.sopArea21.remove();
		 	    mapInfo.sopArea21 = null;
		 	    mapInfo.sopArea21 = undefined ;
			}
			
			if (mapNum==1) {			
				mapInfo.sopArea21 = sop.geoJson(mapInfo.oriArea).addTo(mapInfo.map21);
		     	mapInfo.map21.fitBounds(mapInfo.sopArea21.getBounds());
			}
			
			
			if (mapNum==2 &&   mapInfo.sopArea22) {
				mapInfo.sopArea22.remove();
		 	    mapInfo.sopArea22 = null;
		 	    mapInfo.sopArea22 = undefined ;
			}
			if (mapNum==2) {			
				mapInfo.sopArea22 = sop.geoJson(mapInfo.oriArea).addTo(mapInfo.map22);
	     	    mapInfo.map22.fitBounds(mapInfo.sopArea22.getBounds());
			}
			
			if (mapNum==3 &&   mapInfo.sopArea23) {
				mapInfo.sopArea23.remove();
		 	    mapInfo.sopArea23 = null;
		 	    mapInfo.sopArea23 = undefined ;
			}
			if (mapNum==3) {			
				mapInfo.sopArea23 = sop.geoJson(mapInfo.oriArea).addTo(mapInfo.map23);
	     	    mapInfo.map23.fitBounds(mapInfo.sopArea23.getBounds());
			}

			//경계에 대한 데이터가 없으면 색지도를 그리지 않는다.
			//데이타 맵핑은 다시 해보자
			
			let dataKind = mapInfo.dataKind ;
			   
			let target = mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][mapInfo.dataKind]["subDiv"][year] ;  // todo
			let conComplite = {} ;
			let key, value, strToolTip;
			let dataKindNm = mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][mapInfo.dataKind]["name"] ;
			let unitNm = mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][mapInfo.dataKind]['unit']			
			
			for (var idx=0; idx<target.length; idx++) {
				conComplite[target[idx].region_cd] = target[idx];     
			}
			
			var objectList = new Array();
			var sopAreaObj ;
			if (mapNum==1)  sopAreaObj = mapInfo.sopArea21;
			else if (mapNum==2)  sopAreaObj = mapInfo.sopArea22;			
			else if (mapNum==3)  sopAreaObj = mapInfo.sopArea23;

			
			sopAreaObj.eachLayer(function (layer) {
				key = layer.feature.properties.adm_cd;
				value = conComplite[key];
				

				//if (!value) { return; }
				let location = "";
				
				if(mapInfo.view_cd == "sido") location = `${mapInfo.sido_nm}` 
				else if(mapInfo.view_cd == "sgg") location = `${mapInfo.sido_nm} ${mapInfo.sgg_nm} `
				else if(mapInfo.view_cd == "emdong") location = `${mapInfo.sido_nm} ${mapInfo.sgg_nm}`
					
				let dongCheck = true ;
				if (!conComplite[key]) {
					dongCheck = false ;
				}
				
				let nm =  "" ; // 값으로 전달
				let cd = key + "" ; // 값으로 전달 ;
				
				if (dongCheck) {
					value = conComplite[key] ;
					nm =  value.adm_nm + "" ; // 값으로 전달
					strToolTip = '<div class="mapTooltip">';
					strToolTip += `<p class="location">${location} ${nm}</p>`;
					strToolTip += `<p class="data">${year}년 ${dataKindNm} : ${fn_number_format(value[dataKind])}(${unitNm})</p>`;			
					strToolTip += '</div>';
				} else {
					nm =  layer.feature.properties.adm_nm + "";
					strToolTip = '<div class="mapTooltip">';
					strToolTip += `<p class="location">${nm}</p>`;
					strToolTip += `<p class="data">N/A</p>`;			
					strToolTip += '</div>';
				}

				// 추천지표보기 지도 툴팁 html
				layer.bindToolTip(strToolTip);
					
				if (dongCheck) layer.on("click",function(e){fn_selectDong2(cd, nm);});				
				
				layer.on("mouseover",function(e){
					layer.setStyle({
						weight : 7,
						color : mapInfo.borderColor[0],
						opacity: 0.9,
						width:1.75
					 });
					}
				);
				
				layer.on("mouseout",function(e){
					if (cd == mapInfo.emdong_cd) weight_val = 5 ;
					else weight_val = 1 ;
					
					layer.setStyle({
						weight : weight_val,
						color : mapInfo.borderColor[mapInfo.borderColor.length-1],
						opacity: 1,
						width:1.75
					});
					}
				);
				
				let  rNUm =  (dongCheck==true)?fn_number_format(value[dataKind]):"N/A" ;
				
				if (mapInfo.mode=="show") 
					layer.setCaption({title:rNUm, color:"black"});
				
				var object = new Object();
				if (dongCheck==true) object.value = value[dataKind];
				else                 object.value = null ;
				object.admCd = key;
				objectList.push(object);
			});
			
			//var legend = calculateLegend(objectList);
			var legend = fn_calLegend(objectList);
			fn_areaFillColor(objectList,legend);
			
		 
			
	 }
	 
	 
	 //추천지표 집계구 색지도보여주기
	 function fn_tab5_1_showColorLayer(result){
		 
		    if(!result) return ;
			let conComplite = {} ;
			let key, value, strToolTip,location;
			let dataKindNm = mapInfo.data_comments2[mapInfo.dataKind]["name"] ; 
			let unitNm = mapInfo.data_comments2[mapInfo.dataKind]["unit"] ;				
			
			let target = result ;
			
			for (var idx=0; idx<target.length; idx++) {
				let adm_cd2 = target[idx].adm_cd ;
				if (adm_cd2.length==13){
					let preCd   = adm_cd2.substr(0,7);
					let postCd  = adm_cd2.substr(-6);
					adm_cd2 = preCd + "0"+ postCd ; 
				}
				conComplite[adm_cd2] = target[idx];     
			}
			
			var objectList = new Array();
			
			if(mapInfo.view_cd == "sido") location = `${mapInfo.sido_nm}` 
				else if(mapInfo.view_cd == "sgg") location = `${mapInfo.sido_nm} ${mapInfo.sgg_nm} `
				else if(mapInfo.view_cd == "emdong") location = `${mapInfo.sido_nm} ${mapInfo.sgg_nm}`
			
			
			mapInfo.sopArea2.eachLayer(function (layer) {
				key = layer.feature.properties.adm_cd;

				
				let dongCheck = true ;
				if (!conComplite[key]) {
					dongCheck = false ;
				}
				
				let nm =  "" ; // 값으로 전달
				let cd = key + "" ; // 값으로 전달 ;
				
				if (dongCheck) {
					value = conComplite[key] ;
					let cur_year;
					(value.cur_year) ? cur_year = value.cur_year : cur_year = "-";
					
					let nm = mapInfo.emdong_nm  + "(" + cd + ")" ;  //값으로 전달
					let val = fn_number_format(value.val) ;
					strToolTip = '<div class="mapTooltip">';
					strToolTip += `<p class="location">${location} ${nm}</p>`;
					strToolTip += `<p class="data">${cur_year}년 ${dataKindNm} : ${val}${unitNm}</p>`;
					strToolTip += '</div>';
				} else {
					nm =  layer.feature.properties.adm_nm + "";
					strToolTip = '<div class="mapTooltip">';
					strToolTip += `<p class="location">${nm}</p>`;
					strToolTip += `<p class="data">N/A</p>`;			
					strToolTip += '</div>';
				}
				
				
				layer.bindToolTip(strToolTip);
				
				layer.on("mouseover",function(e){
					layer.setStyle({
						weight : 7,
						color : mapInfo.borderColor[0],
						opacity: 0.9,
						width:1.75
					 });
					}
				);
				
				layer.on("mouseout",function(e){
					if (cd == mapInfo.emdong_cd){
						weight_val = 5 ;
						borderColor = mapInfo.borderColor[0] ;
					} else {
						weight_val = 1 ;
						borderColor = mapInfo.borderColor[mapInfo.borderColor.length-1] ;						
					}
					
					layer.setStyle({
						weight : weight_val,
						color : borderColor,
						opacity: 1,
						width:1.75
					});
					}
				);
				
				
				let  rNUm =  (dongCheck==true)?fn_number_format(value.val):"N/A" ;
				
				if (mapInfo.mode=="show") 
					layer.setCaption({title:rNUm, color:"black"});
				
				var object = new Object();
				if (dongCheck==true) object.value = value.val;
				else                 object.value = null ;

				object.admCd = key;
				objectList.push(object);
			});
			
			//var legend = calculateLegend(objectList);
			var legend = fn_calLegend(objectList);						
			fn_areaFillColor(objectList,legend, "map2");
	 }
	 
	 
	function fn_calLegend(objectList){
		let minVal = -99999;
		let maxVal = -99999;
		let arithmeticVal = 0.00 ;
		let arData = [] ;
		
		if(objectList == null || objectList.length == 0){
			return arData;
		}
		
		let objectListCopy =  objectList ;
		
		for(let i=0; i<objectList.length; i++){
			if (objectList[i].value == null) continue ;
			if (minVal== -99999 || objectList[i].value < minVal)
			    minVal  = parseFloat(parseFloat(objectList[i].value).toFixed(2));				
			
			if (maxVal== -99999 || objectList[i].value >= maxVal)
			    maxVal  = parseFloat(parseFloat(objectList[i].value).toFixed(2));
		}
		
		if (minVal==-99999) minVal = 0 ;
		if (maxVal==-99999) maxVal = 0 ;		
		arithmeticVal = parseFloat(parseFloat((maxVal - minVal)/7).toFixed(2));
		
		// 646.00 맥시멈
		// 382.00 미니엄
		//  37.71 구간범위 
		//arData[0] = minVal ;
		//console.log(minVal);
		//console.log(maxVal);
		//console.log(arithmeticVal);
		
		for(let i=0; i<6; i++){
			arData[i] = parseFloat(parseFloat((i+1)*arithmeticVal+minVal).toFixed(2));
		}
		
		arData[6] = arData[5]; 
		
		return arData ;
	}
	 
		
	function fn_areaFillColor(objectList,legend, mode="map1"){
		
		 var objLayer ; 
		 if (mode=="map1") { 
			 objLayer = mapInfo.sopArea ;
		 } else  if (mode=="map2") { 
			 objLayer = mapInfo.sopArea2 ;
		 }
		 

		 
			
		  objLayer.eachLayer(function (layer) {
				var admCd = layer.feature.properties.adm_cd;
				
				for(var i =0; i < objectList.length; i++){
					if(objectList[i].admCd == admCd){
						var pos = -1 ;
						let inputVal = objectList[i].value ;
						let legendCopy = legend ;						
						
						if (inputVal !=null){
							for(var j=0; j<legend.length; j++){
								if (inputVal > legend[legend.length-1]) {
									pos = legend.length-1 ;
									break ;
								} else if (inputVal <= legend[j]) { 
									pos = j ;
									break ;
								} 
							}
						 }
						
						var  weight_val = 2 ;
						if (admCd == mapInfo.emdong_cd) weight_val = 5 ;
 
						//let opactiy = (1+pos)* 0.125 ;
						
						let opactiy = 0.7 ;
						
						layer.setStyle({
							weight : weight_val,
							color : mapInfo.borderColor[mapInfo.borderColor.length-1],
							fillColor : (pos==-1)?mapInfo.legendEmptyColor[0]:mapInfo.legendColor[pos],
							fillOpacity : opactiy,    //투명도
							opacity: 1,
							width:1.75
						});
						
						/*
						 * 						    stroke: rgb(102, 102, 102);
						    stroke-opacity: 1;
						    stroke-width: 1.75;
						    stroke-linecap: round;
						    stroke-linejoin: round;

						 */
						
						/*
						weight : layer.options.weight,
						color : layer.options.color,
						dashArray : layer.options.dashArray,
						fillOpacity : layer.options.fillOpacity,
						fillColor : fillColor
						*/
						
					}
				}
			});
		}
		
	 

	 function  fn_hichart_option(){
		    Highcharts.setOptions({

		        chart: {style: {fontFamily: 'Pretendard'}},
		        lang:{thousandsSep: ','},
		        title: {text: ' '},
		        subtitle: {text: ''},
		        yAxis: {
		            title: {text: ''},
		            labels: {enabled : false},
		        },
		        credits: {enabled: false},
		        exporting : {enabled : false},
		        xAxis: {
		            labels: {
		                style: {
		                    color: '#666',
		                    fontSize:'12px',
		                    fontWeight: '400',
		                    letterSpacing: '-1px',
		                }
		            },
		            categories: ["",""]
		        },
		        tooltip: {
		       	 headerFormat: '<b>{point.x}</b><br/>'
		        },
		        legend: {
		            layout: "horizontal",
		            verticalAlign: "bottom",
		            align: "center",
		            // itemWidth: 200,
		            symbolWidth: 8,
		            symbolHight: 8,
		            floating: false,
		            borderWidth: 0,
		            backgroundColor: "#FFFFFF",
		            shadow: false,
		            itemStyle: {
		                color: "#333",
		                align: "center"
		            }
		        },
		        plotOptions: {
		            series: {
		                marker: {
		                    enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
		                },
		                dataLabels: {
		                    enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
		                    allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
		                }
		            }
		        }
		    }) ;
	 }
	 
	 function  fn_tabContent2_chart(statData){
		 Highcharts.chart('tab_content2_chart', {
			    chart : {
			        height : '145px',
			        marginTop: 0,
			        marginBottom:25,
			        backgroundColor:'transparent'
			    },
			    legend: {enabled:false},
			    plotOptions: {series: {dataLabels: {enabled:false}}},
			    xAxis:{
			            categories:statData['year'],
					    labels: {
			                allowOverlap: true,              
			                autoRotation: [0],              
			                style: {              	
			                  fontSize:'12px',			                
			                  wordBreak: 'break-all',
			                  textOverflow: 'allow'
			                }
			            }
			    },
			    yAxis:{visible:false},
			    
			    series: [{
			                type:'column',
			                name: statData['title1'],
			                data: statData['title1_data'],			                
			                color: mapInfo.colorPl[0]  },
			            {
			                type:'column',
			                name: statData['title2'],
			                data: statData['title2_data'],
			                color: mapInfo.colorPl[1]},
			            {
			                type: 'spline',
			                name: '합계',
			                data: statData['tot_data'],
			                color: mapInfo.colorPl[2],
			                marker: {
			                    lineWidth: 2,
			                    lineColor: mapInfo.colorPl[2],
			                    fillColor: 'white'
			                }
			            }
			        ]
			});
	   }
	 
	 function  fn_tabContent2_single_chart(statData){
		 Highcharts.chart('tab_content2_chart', {
			    chart : {
			        height : '145px',
			        marginTop: 10,
			        marginBottom:25
			    },
			    legend: {enabled:false},
			    plotOptions: {series: {dataLabels: {enabled:false}}},
			    xAxis:{
			            categories:statData['year'] 
			    },
			    yAxis:{visible:false},
			    
			    series: [
			    	
			            {
			                type: 'spline',
			                name: '합계',
			                data: statData['tot_data'],
			                color: mapInfo.colorPl[2],
			                marker: {
			                    lineWidth: 2,
			                    lineColor: mapInfo.colorPl[2],
			                    fillColor: 'white'
			                }
			            }
			        ]
			});
	   }
	 
	 /**
	  * 디폴트 시군구 모드 돌리는 함수
	  * 
	  */	 
	 function fn_defaultMode(){
		 $('.province').removeClass('active');
		 $('.county').addClass('active');			 
		 $('.subCounty').removeClass('active');
		 $('.subCounty').hide();
		 
		 mapInfo.view_cd = 'sgg';
		 obj = mapInfo.sggObj;		
		 mapInfo.region_cd = mapInfo.sido_cd + mapInfo.sgg_cd ;
		 mapInfo.emdong_cd = "" ;
		 mapInfo.emdong_nm = "" ;			 
		 $("#sgg_select").val(mapInfo.region_cd).prop("selected", true); //값이  시군구 선택
 	 }
	 
	 
	 /**
	  * 데이터 확장보드 컨트롤러
	  * @param {Element} obj this 
	  * @param {string} type type1: 우리동네 상황판, type2: 테마별 추천지표, type3: 테마별 모든지표
	  * @param {string} target 하위 지표 선택 파라미터 
	  */
	 
	  
	 function fn_boardController(obj, type, target) {
			 let boardTitle = "데이터보드";
	         let sub = $(obj).data('link') // sub1 추천지표, sub2 모든지표 보기
		 
//			 if (sub =="tab3" || sub =="tab4" || sub =="tab5"){
//	        	 alert("시범서비스에는 지원하지 않는 메뉴입니다.");	            	 
//	        	 return ;
//	         }
		 
		    function removeType1Class() { $('#btn_extend').removeClass('active')}
 		    function removeType2Class() { $('#tabIndicator li').removeClass('active')}
 		    function removeType3Class() { $('#tabIndicatorSub li').removeClass('active')}
		 

	         $(".extendBoard").hide();
	         
	         fn_defaultMode(); //시군구 모드로 전환처리함.

	         if(type == 'type1') { 
	             boardTitle = "우리동네 상황판";
	             mapInfo.sliderTimerPlay = null;
	             
	             $(".extend_data_01").show();
	             $(".data_player").show();
	             $(".tab_content3").hide();
	             mapInfo.boardType = 'board1' ;
			     mapInfo.dataKind = mapInfo.data_kind[mapInfo.view_cd][0];
			     
	             $(obj).addClass('active')
	             removeType2Class();
	             removeType3Class()
	             $('.tab_container').hide();
	             fn_board1_fullData();
	             
	         } else if (type == "type2") {
	        	 
	        	 sliderTimerInit();        	 
	        	 let lastEleIndex;
	        	 let activeKindNum = $("#tabIndicator li.active").index()
	        	 lastEleIndex = ($(obj).attr('data-link') == 'tab0')
					        		? $("#tabIndicator").find('li.active').index()
					        		: $(obj).parent('li').index();
	        	 
	             //  추천지표  타이틀 클릭
	             $(".extend_data_02").show();
	             $(".data_player").hide();  //자동슬라이더 감추기 
	             $(".tab_content3").hide();
	             
	             removeType1Class();  
	             removeType2Class();	             
	             removeType3Class();
	             
	             
	             if (sub=="tab0"){
	            	 mapInfo.board2Kind = mapInfo.board2_data_kind_rec[activeKindNum] ;  // 첫번째 카테고리
	            	 mapInfo.dataKind = mapInfo.data_kind_rec[mapInfo.board2Kind][0];// 첫번째 지표	             	 
	            	 //$('#tabIndicator li:first-child').addClass('active')	            	 
	             } else if(sub.substr(0,3)=="tab"){         
	            	 let num = parseInt(sub.substr(-1)) ;
	            	 mapInfo.board2Kind = mapInfo.board2_data_kind_rec[num-1] ;
	            	 mapInfo.dataKind = mapInfo.data_kind_rec[mapInfo.board2Kind][0];// 첫번째 지표	            	 
	            	 //$('#tabIndicator li:nth-child('+num+')').addClass('active')	            	 
	             }
	             
	             $("#tabIndicator").children('li').eq(lastEleIndex).addClass('active');
	             
	             mapInfo.boardType = 'board2' ;	             
            	 $('#tabIndicatorSub li:nth-child(1)').addClass('active')
	             
	             $('.tab_container').show();
            	 
            	 mapInfo.lastRcmdItem = null;
                 mapInfo.lastRcmdTab = null;
                 
	             fn_board2_fullData();

	         } else if (type == "type3" && sub == "sub2") {
	        	// 타이머 정지 
	        	 sliderTimerInit();
	        	 
	             //viewAllIndicator(target); // 인구가구, 주거교통 옵션값 보여주기
	        	 
	        	 let lastEle = $("#tabIndicator").find('li.active');
	             
	             $(".extend_data_03").show(); 
	             $(".data_player").hide();
	             
	             mapInfo.boardType = 'board3' ;
	             mapInfo.dataKind = Object.keys(mapInfo.data_kind_all)[0];
	             
	             
	             removeType2Class();
	             removeType3Class();
	             $(lastEle).addClass('active');
	             $(obj).closest('li').addClass('active');
		         fn_init_left_menu();   //주소변경시 왼쪽 메뉴도 동적으로 변경필요 
		         fn_get_board3_data(mapInfo.dataKind,"");
	             
	         }
	         $("#exBoardTitle").text(boardTitle);
	   }	
	 
	 
	 
	 //시간지연함수
	 function fn_sleep(ms) {
		  const wakeUpTime = Date.now() + ms;
		  while (Date.now() < wakeUpTime) {}
	 }
  	   
  	// 보드 확대, 축소
  	 function fn_toggleBoard(){
  		 fn_sleep(200);
  		 
  	     let boardSts = $("#extendBoard").hasClass('active');
  	     (boardSts) ? mapInfo.boardState = 'before_Large' : mapInfo.boardState = 'before_Small';
  	     $("#extendBoard").toggleClass('active');
  	     $(".control_foot").toggleClass('extend');
  	     
  	     $('.slick_slider').slick('refresh')
  	   
//  	     setTimeout(function() {  	    	
//  	     	 // -> eventListener
//	  	    if(!boardSts) fn_slider1_chart_reflow()	  	    
//  	     },300)
  	     
  	     setTimeout(function() {
  	    	// 슬라이더 동작시에만 refresh  	    	
  	    	if($('#tabType2Content').hasClass('slick-initialized')) $('#tabType2Content').slick('refresh')
  	     },300)
  	     
  	     // 확대, 축소일 때 처리해야할 것들
  	      if(boardSts) {   //큰창
  	    	  mapInfo.boardSize = "small" ;
  	          $("#extend_data_03").css("display","none");
  	          $("#extend_data_03_small").css("display","block");
  	      } else {
  	    	  mapInfo.boardSize = "large" ;
  	    	  $(".boardLoading").show(); 
  	          //$("#extend_data_03").css("display","block");
  	          //$("#extend_data_03_small").css("display","none");
  	    	  //alert("board3 실행한다.");
  	          //fn_board3_fullData(mapInfo.dataKind); 
  	      }
	        	     
  	 }
  	   	 
	      
      function fn_numberFormat(x){
          if (!x) return 0;
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      
      
      function fn_getSliderNumber(key) {

    	 let obj = mapInfo.data_kind[mapInfo.view_cd] ;		 
 		 let objList = fn_board_data_mapping(obj)
 		 let sliderIndex, pageNum; 
 		 if(objList.indexOf(key) == -1) {
 			 sliderIndex = 0;
 			 pageNum = 0;
 		 } else {
 			 sliderIndex = objList.indexOf(key) % 6 ;
 	 		 pageNum = Math.floor((objList.indexOf(	key)) / 6)
 		 }
 		 return {sliderIndex, pageNum}
 		 
      }
      
      function showTooltip(tipInfo) {    	  
      	$(`#${tipInfo.id}`).empty();    	        
        $(`#${tipInfo.id}`).html(tipInfo.contents);
        $(`#${tipInfo.id}`).css('left',tipInfo.divX)
        $(`#${tipInfo.id}`).css('top',tipInfo.divY)
      	$(`#${tipInfo.id}`).css('display','block')
      }
      
      function getTooltipPosition(e, id,contents, callback) {
      	let divX;
          let divY = e.pageY;        
          (window.innerWidth > (e.clientX + $("#"+id).outerWidth())) ? divX = e.pageX + 15: divX = (e.pageX - $("#"+id).outerWidth()) - 15;
          callback({id,contents,divX,divY})
      }
      
      
      