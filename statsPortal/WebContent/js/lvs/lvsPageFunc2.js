function fn_board2_sync() {
	fn_board2_html_gen().then(function() {

		let dataKey = mapInfo.dataKind
		
		fn_board2_tooltip_event();
		fn_board2_eventListener();
		
		fn_board2_topslider_chart(dataKey);
		
		fn_board2_tab4_1_chart(dataKey);
		
		fn_board2_3_init_chart();
		
		fn_board2_4_init_top();
		fn_board2_4_init_bottom();
		
		if(mapInfo.data_kind_rec[mapInfo.board2Kind].length > 4) fn_init_slider2();

		// add 클릭 이벤트 함수
		fn_board2_activeItems();
		
	})
}


function fn_board2_html_gen() {
	return new Promise(function(resolve) {

		let boardTop = fn_board2_html_tab_top();
		let boardBottom = fn_board2_html_tab_bottom();
		let extend_data_02 = extend_data_02_temp +""  ;
		
		extend_data_02 = extend_data_02.replaceAll('#extend_data_02_slider_item#', boardTop) ;
	    extend_data_02 = extend_data_02.replaceAll('#extend_data_02_tab4_1#', boardBottom.extend_data_02_tab4_1) ;	     
	    extend_data_02 = extend_data_02.replaceAll('#extend_data_02_tab4_2#', boardBottom.extend_data_02_tab4_2) ;	     
	    extend_data_02 = extend_data_02.replaceAll('#extend_data_02_tab4_3#', boardBottom.extend_data_02_tab4_3) ;	     
	    extend_data_02 = extend_data_02.replaceAll('#extend_data_02_tab4_4#', boardBottom.extend_data_02_tab4_4) ;
	    
	    $(".extend_data_02").empty();
		$(".extend_data_02").html(extend_data_02);
		
		return resolve();
	})
	
}

// 지표 선택, 탭 선택 
function fn_board2_activeItems() {
	let lastTab, lastRcmdItem;
	
	let rcmdItem = document.querySelectorAll('.rcmdItem');
	let tabItem = document.querySelectorAll('.tabs4.tabCommon li a');
	let rcmdIndex = mapInfo.data_kind_rec[mapInfo.board2Kind].indexOf(mapInfo.lastRcmdItem);
	let pageNum = Math.floor(rcmdIndex / 4);
	
	let rcmdActiveItem;
	
	$('.rcmdItem').removeClass('active');
	
	if(mapInfo.lastRcmdItem == null) {
		($("#tabType2Content").hasClass('slick-initialized'))
			? 	$($('.slick-current .rcmdItem')[0]).addClass('active')
			:	$($('.rcmdItem')[0]).addClass('active');
		
		return;  
	} 
		
	if($("#tabType2Content").hasClass('slick-initialized')) { 
		
		$('#tabType2Content').slick('slickGoTo',pageNum);  // 슬라이더 이동
		$(".slick-current").find('.rcmdItem').each(function(i,element) {
			if($(element).attr('data-ids') == mapInfo.lastRcmdItem) 	$(element).addClass('active');
		})
    	
    } else {
    	
    	rcmdItem.forEach(function(element){
    		if($(element).attr('data-ids') == mapInfo.lastRcmdItem) 	$(element).addClass('active'); 
    	})
    	
    }
	
}


// 추천지표 상단 html 생성
function fn_board2_html_tab_top() {
	return fn_make_slick_sliderBoard2Content();
}

// 추천지표 하단 html 생성
function fn_board2_html_tab_bottom() {
	
	let dataKey =  mapInfo.dataKind;
	let statData =  mapInfoRecData[mapInfo.region_cd];
	let curAreaName,curAreaUpName;
	
	if (mapInfo.region_cd==""){
		alert(mapInfo.region_cd + " 지역 선택 오류가 발생했습니다.");
		return ;
	}
	 
	if (!statData) {
		alert(mapInfo.region_cd + " 데이터 존재 하지 않습니다.");
		return ;
	}
	 

	if (mapInfo.view_cd=="sido") {
		curAreaName = $("#curSido").html() ;
		curAreaUpName = "전국" ;			 
	} else  {
		curAreaName = $("#curSido").html()+" "+$("#curSgg").html() ;
		curAreaUpName = $("#curSido").html() ;			 
	}
	 
	const obj = statData[mapInfo.board2Kind][dataKey] ;
	const obj2 = {"adm_nm": curAreaName, "adm_up_nm": curAreaUpName};
	
	// tab4_1
	let extend_data_02_tab4_1 = extend_data_02_tab4_1_temp +""  ;
	extend_data_02_tab4_1 = fn_temp_replaceAll(extend_data_02_tab4_1, obj) ;
	
	// tab4_2
	let extend_data_02_tab4_select  =  fn_make_select_option(obj["yearData"],obj["base_year"] );		 
	let extend_data_02_tab4_2 = extend_data_02_tab4_2_temp +""  ;

	extend_data_02_tab4_2 = extend_data_02_tab4_2.replaceAll("#extend_data_02_tab4_2_select#",extend_data_02_tab4_select);
	 
	extend_data_02_tab4_2 = fn_temp_replaceAll(extend_data_02_tab4_2, obj) ;
	extend_data_02_tab4_2 = fn_temp_replaceAll(extend_data_02_tab4_2, obj2) ;
	
	// tab4_3
	let extend_data_02_tab4_3 = extend_data_02_tab4_3_temp +""  ;
	extend_data_02_tab4_3 = extend_data_02_tab4_3.replaceAll("#extend_data_02_tab4_3_select#",extend_data_02_tab4_select);
	 
	extend_data_02_tab4_3 = fn_temp_replaceAll(extend_data_02_tab4_3, obj);
	extend_data_02_tab4_3 = fn_temp_replaceAll(extend_data_02_tab4_3, obj2);
	
	// tab4_4
	let extend_data_02_tab4_4 = extend_data_02_tab4_4_temp +""  ;
	let extend_data_02_tab4_4_row1 = extend_data_02_tab4_4_row_temp +""  ;
	let extend_data_02_tab4_4_row2 = extend_data_02_tab4_4_row_temp +""  ;
	 
	// todo 모드에 따라 수정하자
	obj2["rowNo"] = 'row1';
	extend_data_02_tab4_4_row1 = fn_temp_replaceAll(extend_data_02_tab4_4_row1, obj) ;		 
	extend_data_02_tab4_4_row1 = fn_temp_replaceAll(extend_data_02_tab4_4_row1, obj2) ;
	 
	obj2["rowNo"] = 'row2';
	obj2["adm_nm"] = curAreaUpName ;	 
	extend_data_02_tab4_4_row2 = fn_temp_replaceAll(extend_data_02_tab4_4_row2, obj) ;		 
	extend_data_02_tab4_4_row2 = fn_temp_replaceAll(extend_data_02_tab4_4_row2, obj2) ;
	 
	extend_data_02_tab4_4 = extend_data_02_tab4_4.replaceAll("#extend_data_02_tab4_4_row1#",extend_data_02_tab4_4_row1);
	extend_data_02_tab4_4 = extend_data_02_tab4_4.replaceAll("#extend_data_02_tab4_4_row2#",extend_data_02_tab4_4_row2);
	 
	 
	extend_data_02_tab4_4 = fn_temp_replaceAll(extend_data_02_tab4_4, obj2) ;		 
	 
	let vrs_region_popup = vrs_region_popup_temp +""  ;
	vrs_region_popup = fn_temp_replaceAll(vrs_region_popup, obj) ;
	extend_data_02_tab4_4 = extend_data_02_tab4_4.replaceAll('#vrsRegionPopup#', vrs_region_popup) ;
	
	return {extend_data_02_tab4_1,extend_data_02_tab4_2,extend_data_02_tab4_3,extend_data_02_tab4_4};
} 

//하단만 변경하기
function fn_init_board_type2_bottom(){	
	 let dataKey =  mapInfo.dataKind;
	 
	 let boardBottom = fn_board2_html_tab_bottom();
	 
    $("#tab4_1").empty();
	 $("#tab4_1").html(boardBottom.extend_data_02_tab4_1);
	 
    $("#tab4_2").empty();
	 $("#tab4_2").html(boardBottom.extend_data_02_tab4_2);
	 
    $("#tab4_3").empty();
	 $("#tab4_3").html(boardBottom.extend_data_02_tab4_3);
	 
    $("#tab4_4").empty();
	 $("#tab4_4").html(boardBottom.extend_data_02_tab4_4);
	 
	 fn_board2_tab4_1_chart(dataKey);
	 fn_board2_3_init_chart();   //
	 fn_board2_4_init_top();
	 fn_board2_4_init_bottom();		 
	 
	 $('#tab4_chart1').highcharts().reflow() // 추천지표 변화그래프
	 $('#tab4_chart3').highcharts().reflow()  // 추천지표 지역내 순위
	 
	 if(!$("#vrsChartId_row1").attr('data-highcharts-chart') == undefined) $('#vrsChartId_row1').highcharts().reflow()  
	 if(!$("#vrsChartId_row2").attr('data-highcharts-chart') == undefined) $('#vrsChartId_row2').highcharts().reflow()
    
    fn_board2_activeItems();
		
}

// 추천지표 이벤트 리스너
function fn_board2_eventListener() {
	
	let rcmdItems = [...document.querySelectorAll('.extend_data_02 .rcmdItem')];
	let tabItems = [...document.querySelectorAll('.tabs4.tabCommon li a')];
	
	rcmdItems.map(function(item) {
			item.addEventListener('click',function(){
	    	
	    	let target;
	    	if($(event.target).hasClass('rcmdItem')) 	target = $(event.target)
	    	else 										target = $(event.target).closest('.rcmdItem')
	    	
	    	mapInfo.lastRcmdItem = $(target).attr('data-ids'); 
	    	
	        let num =  parseInt($(event.target).closest('.rcmdItem').find('span.num').text())-1 ;
	        mapInfo.dataKind =mapInfo.data_kind_rec[mapInfo.board2Kind][num];
	      	fn_slider_click2(mapInfo.dataKind);
	    })
	})
	
	tabItems.map(function(item){
		item.addEventListener('click',function(){
	        let activeTab = $(this).attr("rel");
	        $(this).parent().siblings("li").removeClass("active");
	        $(this).parent().addClass("active");
	        $(this).data('tabName');
	        $(this).closest('.tab_container4').children('.tab4').hide();
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
	        
	        if(activeTab == "tab4_1")  $('#tab4_chart1').highcharts().reflow() // 추천지표
																				// 변화그래프
	        else if(activeTab == "tab4_2") {
	        	  if (mapInfo.map21) mapInfo.map21.remove();
	    	   	  mapInfo.map21 = sop.map("map_board2_1",mapInfo.options);
	       		  mapInfo.map21.setView(sop.utmk(mapInfo.x2, mapInfo.y2), mapInfo.level);
	       		  fn_setDataForLayer42(1,'2020');
	       		  
	        	  if (mapInfo.map22) mapInfo.map22.remove();           		  
	       	   	  mapInfo.map22 = sop.map("map_board2_2",mapInfo.options);
	       		  mapInfo.map22.setView(sop.utmk(mapInfo.x2, mapInfo.y2), mapInfo.level);
	       		  fn_setDataForLayer42(2,'2020');
	       		  
	        	  if (mapInfo.map23) mapInfo.map23.remove();           		  
	       	   	  mapInfo.map23 = sop.map("map_board2_3",mapInfo.options);
	       		  mapInfo.map23.setView(sop.utmk(mapInfo.x2, mapInfo.y2), mapInfo.level);
	       		  fn_setDataForLayer42(3,'2020');
	        }            
	        else if(activeTab == "tab4_3") $('#tab4_chart3').highcharts().reflow()  
	        else if(activeTab == "tab4_4") {                                        
	        	if(!$("#vrsChartId_row1").attr('data-highcharts-chart') == undefined) $('#vrsChartId_row1').highcharts().reflow()  
	       	 	if(!$("#vrsChartId_row2").attr('data-highcharts-chart') == undefined) $('#vrsChartId_row2').highcharts().reflow()	            
	        } else if (activeTab == "tab5_3") $("#popupChart1").highcharts().reflow()
	    })
	})

}
	
	
// 보드 툴팁이벤트
function fn_board2_tooltip_event(){
	let id = "board2_tooltip_layer";    	
	let content_items = mapInfo.data_kind_rec[mapInfo.board2Kind];
	let contents_temp =`
		<h5 class="title">#name#</h5>
		<p class="desc">#desc#</p>
		<div class="badge">
		  <span class="level active">#levelName#</span>
		  <span class="year">#yearList#</span>
		</div>
	`;
	
	
	content_items.map(function(name, index) {
		
		let findId = "tooltipBoard2Id" + parseInt(index+1);
		let contents = contents_temp + "" ;		
		let obj = document.querySelectorAll(findId);
		let statObj = mapInfo.data_comments2[mapInfo.data_kind_rec[mapInfo.board2Kind][index]];
		
		if (obj==null || obj==undefined) return ;
		if(!statObj) return false;
		
		contents = fn_temp_replaceAll(contents_temp, statObj);
    	
    	$("#"+findId).hover(function(e) {
    		getTooltipPosition(event,id,contents, showTooltip)
    	},function(e){
    		$("#"+id).css('display',"none");
    	})
		
	})

}

// 추천지표 상단 차트 생성
function fn_board2_topslider_chart(dataKey){
	 let obj = mapInfo.data_kind_rec[mapInfo.board2Kind] ; 	

	 for (let i=0; i<obj.length; i++){
		 var num = parseInt(i)+1 ;
		 var chartid = "chartBoard2Id" + num ;
		 var key = obj[i];			 
		 let item = mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][key];  
		 fn_layerColumnType2(chartid,item, mapInfo.view_cd);
	 }
}

// 변화그래프 차트 생성
function fn_board2_tab4_1_chart(dataKey){
	 let item = mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][dataKey]["yearData"];		 
	 var chartid = "tab4_chart1";		 
	 fn_combiLineColumn(chartid,item);
}

// 추천지표 상단 슬라이더 아이템 html
function fn_make_slick_sliderBoard2Content(){
	 let obj = mapInfo.data_kind_rec[mapInfo.board2Kind] ;   
	 let result = "" ;
	 
	 for (let i=0; i<obj.length; i++){
		 var num = parseInt(i)+1 ;
		 var key = obj[i];
		 var id = "chartBoard2Id" + num ;
		 var tipLayerId = "tooltipBoard2Id" + num ;
		 
		 let firstDiv = "", lastDiv ="" ;
		 if (i%4==0) firstDiv = "<div class='sliderStart'>";
		 if (i%4==3) lastDiv = "</div>";			 
		 let extend_data_02_slider_item = firstDiv + extend_data_02_slider_item_temp +""  ;
		 
		 let item = mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][key];
		 
		 
		 extend_data_02_slider_item = fn_temp_replaceAll(extend_data_02_slider_item, item) ;
		 extend_data_02_slider_item = extend_data_02_slider_item.replaceAll("#itemName#",key);
		 extend_data_02_slider_item = extend_data_02_slider_item.replaceAll("#chartId#",id);			 
		 extend_data_02_slider_item = extend_data_02_slider_item.replaceAll("#num#",num);
		 extend_data_02_slider_item = extend_data_02_slider_item.replaceAll("#tipLayerId#",tipLayerId);
		 
		 result = result + extend_data_02_slider_item + lastDiv ;
		 
	 }
	 return result ;
}

// 지역내 순위 차트 생성
function fn_board2_3_init_chart(queryYear){
    if(queryYear==undefined||queryYear==null) 
    	queryYear= mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][mapInfo.dataKind]["base_year"];
    
    if (mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][mapInfo.dataKind]["subDiv"][queryYear]==null){
    	fn_board2_3_init_chart_getData(queryYear);
    	return ;
    }
    
    const obj = mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][mapInfo.dataKind]["subDiv"][queryYear];
    const resultObj =fn_getCensusYearData(obj,mapInfo.dataKind);
    
    let chartData = { "title": $("#curStat").html(), "category": resultObj.category, "data": resultObj.data } ;// 변화그래프, 탭 차트
    fn_combiColumn('tab4_chart3', chartData) 
    
}

function fn_board2_4_init_top(){
	 const item = Object.assign({}, mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][mapInfo.dataKind]["yearData"]);
	 item.data = fn_data_downsize(item.data) ;
	 item.originTitle = (mapInfo.view_cd=="sgg")?$("#curSido").html()+" " +$("#curSgg").html():$("#curSido").html();
	 let vrsItem = [];
	 item.vrsTitle ="" ;		 
	 fn_board2_4_init_chart("vrsChartId_row1", item, vrsItem);
	 $("#vrsTableId_row1").html(fn_board2_4_init_table(item));
	 
    $(".row1Target").hide();
    $("#row1_vrs_on").hide();
    $("#row1_vrs_off").show();
	 
}

function fn_board2_4_init_bottom(){
	 const item = Object.assign({}, mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][mapInfo.dataKind]["yearDataUp"]);  // yearDataup
	 item.data = fn_data_downsize(item.data) ;
	 item.originTitle = (mapInfo.view_cd=="sgg")?$("#curSido").html():"전국";		 
	 item.vrsTitle ="" ;
	 let vrsItem = [];
	 fn_board2_4_init_chart("vrsChartId_row2", item, vrsItem);
	 $("#vrsTableId_row2").html(fn_board2_4_init_table(item));

    $(".row2Target").hide();
    $("#row2_vrs_on").hide();
    $("#row2_vrs_off").show();
    
    
}

function fn_board2_4_init_chart(id,item, vrsItem){
    // 더미 데이터 생성
    let vrsChart1Data = {"title":item.title,"category":item.category,
                    "originTitle":item.originTitle,
                    "vrsTitle": item.vrsTitle,
                    "originData":item.data,
                    'vrsData':vrsItem.data}; // 타 자자체 비교 탭 차트
    
    // 데이터 없을 때 생성
    if(!item.data.length) {
    	let noData = document.createElement('p');
    	let text = document.createTextNode( '데이터가 없습니다.' );
    	noData.appendChild( text );
    	noData.style.cssText = "color: #999;text-align: center;display: flex;align-items: center;justify-content: center;height: 100%";    	    	
    	document.getElementById(id).appendChild(noData);    	
    	return false;
    }
    
    fn_multiAxisLineColumn(id,vrsChart1Data)
}

// 타 지자체 비교 테이블 초기화
function fn_board2_4_init_table(item){
	let result ="";
	for(let i=0; i<item.data.length; i++){
		result = result + "<tr><td>"+item.category[i]+"</td><td>"+fn_numberFormat(item.data[i])+"</td></tr>\n";
	}
	return result;
}

function fn_data_downsize(data){
	 let resultData = [];
	 
	 if (!data) return resultData ;
	 
	 for(let i=0; i<data.length; i++){
		 if (fn_isInt(data[i]))
			 resultData[i] = parseInt(data[i]/1000);
		 else 
			 resultData[i] = parseFloat(data[i]/1000);				 
	 }
	 
	 return resultData;
}

function fn_isInt(n) {
	   return n % 1 === 0;
}

// 연도 선택 html 
function fn_make_select_option(yearData, thisYear){
	 const option_temp = "<option value='#code#' #selected# >#val#년</option>";
	 const arr  = yearData.category ; 
	 var result = "" ;
	 
	 for(let i=arr.length-1; i>=0; i--){
		 const selectObj = {code:arr[i],selected:(thisYear==arr[i])?"selected":"",val:arr[i] };
		 const option_html = option_temp +"";
		 result = result + fn_temp_replaceAll(option_html, selectObj);
	 }
	 return result ;
}


function fn_slider_click2(dataKey){
	// alert('정리하자'); 색지도 다시 그리자
	// step1 색지도 변경
	mapInfo.boardType=="board2";    	
	fn_getStatistic(dataKey);  // 색지도다시 그리기
	// step2 맵 상단 변경
	let obj = mapInfoRecData[mapInfo.region_cd][mapInfo.board2Kind][dataKey] ;
	$("#curStat").html(obj.name);
	
	// 데이터하단을 그리자 작은 모드일때는 다시 조정해야 함.
	fn_init_board_type2_bottom();
	
}

// 지역내 순위 연도 변경 이벤트
function data_02_tab4_3(thisObj){
	 fn_board2_3_init_chart($("select[name=tab4_3_year]").val())		 
}