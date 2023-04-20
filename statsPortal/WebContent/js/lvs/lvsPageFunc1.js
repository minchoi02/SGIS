 
// await/sync 사용 불가 -> 콜벡 체이닝으로 변경
function fn_async_run_board1() {
	
	// 1. 우리동네 상황판 container html 생성  fn_makeHtml_board1()
	// 2. 우리동네 상황판 content fn_set_board_top_type1_promise()
	// 3. 큐 렌더러(fn_init_slider_promise, fn_tabContent2_slider_chart_promise) 
	// 4. 슬라이드 타이머, 슬라이더 페이지 이동
	// 5. fn_init_slider_promise => 슬라이더 onloaded(afterChange) => 툴팁, 이벤트 리스너 등록  
	
	// 1. 우리동네 상황판 container html 생성  fn_makeHtml_board1()
	fn_makeHtml_board1().done(function(res_html) {
		
		let extend_data_01 = extend_data_01_temp +""  ;
		extend_data_01 = extend_data_01.replaceAll('#slick_sliderContent#', res_html); // 생성된 container Html 치환     
		
		$(".extend_data_01").empty();
		$(".extend_data_01").html(extend_data_01); 		
		$('.boardLoading').show();

		// 2. 우리동네 상황판 content fn_set_board_top_type1_promise()
		fn_set_board_top_type1_promise().then(function(inner_html) {
			
			let yearData = mapInfoData[mapInfo.region_cd][mapInfo.dataKind]['yearData'];
			let statData = mapInfoData[mapInfo.region_cd]
			$(".extend_data_01 .main").empty();
			$(".extend_data_01 .main").html(inner_html);
			
			if (mapInfo.data_kind2_list.indexOf(mapInfo.dataKind) > 0) fn_tabContent2_chart(yearData);
			else 	fn_tabContent2_single_chart(yearData);
			
			//fn_board_tooltip_event() // 툴팁 이벤트 리스너
						
			//3. 슬라이더 초기화, 상단 차트 렌더 queue
			let fn_queue = [fn_init_slider_promise(),fn_tabContent2_slider_chart_promise(statData)]
			
			let combineQueue = $.when.apply($,fn_queue);
			
			combineQueue.done(function() {
				
				let pageInfo = fn_getSliderNumber(mapInfo.dataKind);				
				// 4. 타이머, 슬라이더 페이지 이동 및 선택
				if(pageInfo.pageNum !== null) {			 
					$(".slick_slider").slick('slickGoTo',pageInfo.pageNum);
					$(".slick-slide.slick-current.slick-active").find('.slider_item').eq(pageInfo.sliderIndex).addClass('active').click();
				}
				
				(mapInfo.sliderTimerPlay == 'map' || mapInfo.sliderTimerPlay == 'viewMode') 
					? sliderTimerPause()
					: sliderTimerStart()
								
				//fn_init_event_config() // 클래스, 이벤트 제어
				$('.slick_slider').slick('refresh')
			})
			
		})
	})
}

// 우리동네 상황판 html layout Promise
function fn_makeHtml_board1() {
	let deferred = $.Deferred();
	if (!mapInfoData[mapInfo.region_cd]) {
		alert("데이터가 존재하지 않습니다.");
		return;
	}
	
	fn_make_slick_sliderContent_promise().then(function(result) {
		deferred.resolve(result);
	})

	return deferred.promise();
}

// 우리동네 상황판 html layout 생성
function fn_make_slick_sliderContent_promise() {
	return new Promise(function(resolve, reject) {		
		
		let obj = mapInfo.data_kind[mapInfo.view_cd];
		let cnt = 0;

		let objList = fn_board_data_mapping(obj);

		let pageCnt = Math.ceil(objList.length / 6);
		let result = "";
		for (let i = 0; i < pageCnt; i++) {
			var slick_sliderContent = slick_sliderContent_temp + "";

			let id = "sliderContent" + pageCnt;
			slick_sliderContent = slick_sliderContent.replaceAll('#sliderContentId#', id);
			slick_sliderContent = slick_sliderContent.replaceAll('#slick_sliderContent_item#',fn_make_slick_sliderContent_item_inner(i, objList));
			result = result + slick_sliderContent;

			if (i == pageCnt - 1) resolve(result);
		}
	});
}

//실제 로딩된 데이터릂 기반 슬라이더를 만든다.
function fn_make_slick_sliderContent_item_inner(pageNo, objList) {

	let result = "";
	let code = mapInfo.region_cd;

	for (let i = 0; i < 6; i++) {

		let num = parseInt(pageNo * 6 + i + 1);
		if (num > objList.length)	break;

		let key = objList[num - 1];
		let mode = (mapInfo.data_kind2_list.indexOf(key) > 0) ? "kind2": "kind1";

		let item = mapInfoData[code][key];
		var id = "chartId" + num;
		var tipLayerId = "tooltipBoardId" + num;
		var tipLayerDispId = "tipLayerDispId" + num;

		var slick_sliderContent_item = (mapInfo.data_kind2_list.indexOf(key) > 0) ? slick_sliderContent_item_temp: slick_sliderContent_item_temp2 + "";
		slick_sliderContent_item = fn_temp_replaceAll(slick_sliderContent_item,item);
		slick_sliderContent_item = slick_sliderContent_item.replaceAll("#sliderContent_item_chartId#", id);
		slick_sliderContent_item = slick_sliderContent_item.replaceAll("#num#",key);
		slick_sliderContent_item = slick_sliderContent_item.replaceAll("#tipLayerId#", tipLayerId);

		result = result + slick_sliderContent_item;
	}

	return result;
}

// 우리동네 상황판 차트 layout hmlt 생성
function fn_set_board_top_type1_promise() {
	return new Promise(function(resolve, reject) {
	
//		function dummy() {};
//		
//		dummy.prototype.lastyear = null;				
//		dummy.prototype.lastyearkey1 = null;				
//		dummy.prototype.lastyearkey2 = null;
//		dummy.prototype.lastyearva = null;				
//		dummy.prototype.lastyearval1 = null;				
//		dummy.prototype.lastyearval2 = null;				
//		dummy.prototype.name = "-";
//		dummy.prototype.thisyear = null;
//		dummy.prototype.thisyearkey1 = null;
//		dummy.prototype.thisyearkey2 = null;
//		dummy.prototype.thisyearval = "";
//		dummy.prototype.thisyearval1 = "";
//		dummy.prototype.thisyearval2 =  "";
//		dummy.prototype.unit = "-";
//		
//		let temp = new dummy();
		
		let dataKey = mapInfo.dataKind;
		let statData = mapInfoData[mapInfo.region_cd];
		let extend_data_01_main_sec01 = extend_data_01_main_sec01_temp + "";
		let extend_data_01_main_sec02 = extend_data_01_main_sec02_temp + "";
		let extend_data_01_main_sec01_type2 = extend_data_01_main_sec01_type2_temp + "";
		
		
		// 지역레벨 이동간에 지표가 없을 경우 맵핑을 하지 못한다. 
		

		extend_data_01_main_sec01 = fn_temp_replaceAll(extend_data_01_main_sec01,statData[dataKey]);
		extend_data_01_main_sec02 = fn_temp_replaceAll(extend_data_01_main_sec02,statData[dataKey]);
		let mode = (mapInfo.data_kind2_list.indexOf(dataKey) > 0) ? "kind2": "kind1";

		if (mode == "kind2") {
			extend_data_01_main_sec01_type2 = fn_temp_replaceAll(extend_data_01_main_sec01_type2, statData[dataKey]);
		} else {
			extend_data_01_main_sec01_type2 = "";
		}

		extend_data_01_main_sec01 = extend_data_01_main_sec01.replaceAll('#extend_data_01_main_sec01_type2#',extend_data_01_main_sec01_type2); //두개짜리 처리
		let extend_data_01_sub = extend_data_01_sub_temp + "";
		extend_data_01_sub = extend_data_01_sub.replaceAll('#extend_data_01_main_sec01#', extend_data_01_main_sec01);
		extend_data_01_sub = extend_data_01_sub.replaceAll('#extend_data_01_main_sec02#', extend_data_01_main_sec02);
		//extend_data_01  = extend_data_01.replaceAll('#extend_data_01_sub#', extend_data_01_sub) ;
		
		return resolve(extend_data_01_sub);
	})
	
}

function fn_init_slider_promise(){
	
	return new Promise(function(resolve,reject) {

		if ($('.slick_slider').hasClass('slick-initialized')) {			
			$('.slick_slider').slick('refresh')
			return resolve();
		}
		
		$('.slick_slider').slick({
			dots : true,
			speed : 300,
			prevArrow : ".arrows > .prev_arrow",
			nextArrow : ".arrows > .next_arrow",
			autoplay : false,
			autoplaySpeed : 13000
		});
		
				
		$('.slick-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){			
			
			// 슬라이드 아이템 이벤트 등록
			let items = $(".slick_slider").find('.slick-current').find('.slider_item');			
			$(items).each(function(index,item) {
				
				if(!$(item).hasClass('bind'))  {
					item.addEventListener('click',function() {				
						sliderItemClickEvent(item)
					})
				}   
				
				$(item).addClass('bind');   // 이벤트 중복방지를 위한 클래스
			})
			
			// 툴팁 등록
			fn_board_tooltip_event();
			
			// 차트 reflow
			fn_slider1_chart_reflow();
			
			$(".boardLoading").hide();
			$(event.target).css('visibility','visible')			
			
	    });
		
		if(mapInfo.boardState != 'before_Small') {
			$(".boardLoading").hide();
			$('.slick_slider').css('visibility','visible')
		}
	
		mapInfo.boardState = '';
		
		return resolve();
		
	})
}

function fn_slider1_chart_reflow() {    	  
	if(!$("#extendBoard").hasClass('active')) return false;
    	  
	let chartIds = [];
	$(".slick-current.slick-active").find(".chart").each(function(index, item) {
		let id = $(item).children('div').attr('id');
		
		// 자식요소 차트 체크
		if(document.querySelector(`#${id} div`) != null)   $(`#${id}`).highcharts().reflow();
	})
}

function fn_tabContent2_slider_chart_promise(statData){
	
	 // 사업체 수 임시 트리맵 데이터 가공  (고경남)
//	 let mapData = []
//	 statData.corp_cnt.subDiv.forEach(function(item,index) {
//		 tempData = {
//		 "colorValue":index,  		// 컬러 표시 벨류 
//		 "value":item.corp_cnt, 	// 수치 
//		 "name": item.adm_nm    	// 표시 네임 
//		 }
//		 mapData = [...mapData,tempData]
//	 })
	 
	 // 총 가구 임시 도넛차트 형태 데이터 가공		 
//	 let pieData = [];
//	 statData.tot_family.yearData.tot_data.every(function(item,index){
//		 pieData = [...pieData,{"name":statData.tot_family.yearData.year[index],"y":item}]
//		 if(index == 4) return false
//		 else return true
//	 })		 
	
	let dataKindObj = mapInfo["data_kind"][mapInfo.view_cd];		 
	let obj = mapInfo.data_kind[mapInfo.view_cd];
	let objList = fn_board_data_mapping(obj);

	for (let i = 0; i < objList.length; i++) {
		let id = "chartId" + parseInt(i + 1);
		let type = mapInfo.chartType[objList[i]];
		let item = mapInfoData[mapInfo.region_cd][objList[i]];

		if (type == 'donut') 		fn_layerDonut(id, item);
		else if (type == 'column')	fn_layerColumn(id, item);
		else if (type == 'map')		fn_layerMap(id, item);
		// else if (type == 'map') fn_layerMap(id, mapData); // 임시 맵 데이터 가공 처리
		// else if (type == 'pie') fn_layerPie(id, pieData);
		else if (type == 'pie')		fn_layerPie(id, item);
		else if (type == 'line')	fn_layerLine(id, item);
		else						console.log("nothing");
	}
		 

}

// 슬라이더 아이템 맵핑 
function fn_board_data_mapping(obj) {

	if (!obj) return;

	const objList = [];
	for (let i = 0; i < obj.length; i++) {
		if (mapInfoData[mapInfo.region_cd][obj[i]]) {
			let objStat = mapInfoData[mapInfo.region_cd][obj[i]];
			if (objStat.name && objStat.thisyearval) {
				objList.push(obj[i]);
			}
		}
	}
	return objList;
}

// 슬라이더 클릭 이벤트 동작
function fn_slider_click(dataKey){    	
	mapInfo.boardType=="board1";
	//step1 색지도 변경
	fn_getStatistic(dataKey);  //색지도다시 그리기
	//step2 맵 상단 변경
	obj = mapInfoData[mapInfo.region_cd][dataKey] ;
	$("#curStat").html(obj.name);
	
	//step3 오른쪽 상단 변경
	fn_set_board_top_type1();
}

function fn_set_board_top_type1(){
	let dataKey =  mapInfo.dataKind ;		 
	let statData = mapInfoData[mapInfo.region_cd] ;
    let extend_data_01_main_sec01 = extend_data_01_main_sec01_temp +"" ;
    let extend_data_01_main_sec02 = extend_data_01_main_sec02_temp +"" ;
    let extend_data_01_main_sec01_type2  = extend_data_01_main_sec01_type2_temp +"" ;	     
    
    extend_data_01_main_sec01 =  fn_temp_replaceAll(extend_data_01_main_sec01,statData[dataKey]) ;	     
    extend_data_01_main_sec02 =  fn_temp_replaceAll(extend_data_01_main_sec02,statData[dataKey]) ;
	let mode = (mapInfo.data_kind2_list.indexOf(dataKey)>0)?"kind2":"kind1" ;
	 
	if (mode == "kind2"){
		extend_data_01_main_sec01_type2  =  fn_temp_replaceAll(extend_data_01_main_sec01_type2,statData[dataKey]) ;			 
	} else {
		extend_data_01_main_sec01_type2 ="" ;
	}
	 
	extend_data_01_main_sec01 =  extend_data_01_main_sec01.replaceAll('#extend_data_01_main_sec01_type2#', extend_data_01_main_sec01_type2) ;   //두개짜리 처리
	let extend_data_01_sub = extend_data_01_sub_temp +""  ;
	extend_data_01_sub  = extend_data_01_sub.replaceAll('#extend_data_01_main_sec01#', extend_data_01_main_sec01) ; 
	extend_data_01_sub = extend_data_01_sub.replaceAll('#extend_data_01_main_sec02#', extend_data_01_main_sec02) ;    
    
    $(".extend_data_01 .main").empty();
	$(".extend_data_01 .main").html(extend_data_01_sub);
	 
	if (mapInfo.data_kind2_list.indexOf(dataKey)>0)		fn_tabContent2_chart(statData[dataKey]['yearData']);
	else												fn_tabContent2_single_chart(statData[dataKey]['yearData']);
	 
	$('.tabs2.tabCommon li a').click(function() {
		let activeTab = $(this).attr("rel");
		$(this).parent().siblings("li").removeClass("active");
        $(this).parent().addClass("active");
		 
		$(".tab_container2").children('.tab_content2').hide();  // 우리동네 상황판 차트, 테이블
		$(`#${activeTab}`).show();
		 
		if (activeTab=="tab2_2") {
			fn_get_region_compare_data(); 
			return ;
		}
		 
	})
}


// 우리동네 상황판 슬라이더 무버
function sliderTimer(items="") {
	
	let timerDelay;
	let itemLength = items.length // 우리동네 상황판 슬라이더 아이템 갯수
	  
    if(!mapInfo.sliderTimerSts) return; // 슬라이더 정지, 퍼즈 상태 확인
	if(mapInfo.sliderTimerCount > 5) clearTimeout(mapInfo.siiderTimer)
	  
    mapInfo.sliderTimerCount++;
    
    $(items).removeClass('active')
    $(items).eq(mapInfo.sliderTimerCount-1).addClass('active') // 슬라이더가 멈춘다.
    
    if(mapInfo.sliderTimerCount <= itemLength) {
    	
    	mapInfo.siiderTimer = setTimeout(sliderTimer, 4000,items)
  	  
    } else {    	
        $(".slick_slider").slick('slickNext');
        mapInfo.sliderTimerCount = 0;
        getSliderItem(sliderTimer);
        
    }
    
    sliderItemPlayEvent(mapInfo.sliderTimerCount);
    
}       

// 우리동네 상황판 슬라이더 스타트
function sliderTimerStart(items="") {
	  
	mapInfo.sliderTimerSts = true;    	  
	$('.data_player.play').hide();
	$('.data_player.pause').show();
	
    if(!items)	getSliderItem(sliderTimer);        
    else		sliderTimer(items);
	  
}  

// 우리동네 상황판 슬라이더 멈춤
function sliderTimerPause () {
	
	clearTimeout(mapInfo.siiderTimer) // 이벤트 초기화
	$('.data_player.pause').hide();
	$('.data_player.play').show();
    mapInfo.sliderTimerSts = false;
	  
}

function getSliderItem (callback) {
	callback($(".slick_slider > div > div > div.slick-current > div > div").children('.slider_item').get())    	  
}

function sliderTimerInit() {
	mapInfo.sliderTimerPlay = null;
	mapInfo.sliderTimerSts = false; 
	mapInfo.sliderTimerCount = 0;
	sliderTimerPause();
}

function sliderItemPlayEvent(index) {
	let key = $(".slick_slider > div > div > div.slick-current > div > div").children('.slider_item').eq(index-1).find('span.num').text().trim().replaceAll('"','') ;
	mapInfo.dataKind = key ;		
	
	fn_slider_click(mapInfo.dataKind);
}

function sliderItemClickEvent(element) {
	
	mapInfo.sliderTimerCount = ($(element).hasClass('.slider_item')) 
		? $(element).index() +1 
	  	: $(element).closest('.slider_item').index() + 1;
				
	sliderTimerPause();
	$('.extend_data_01 .slider_item').removeClass('active');
	($(element).hasClass('.slider_item'))
		? $(element).addClass('active')
		: $(element).closest('.slider_item').addClass('active');
  	
	let key = $(element).closest('.slider_item').find('span.num').text().trim().replaceAll('"','');
	mapInfo.dataKind = key ;
		
	fn_slider_click(mapInfo.dataKind);    	  
}