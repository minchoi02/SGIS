var bFromData = null; 
var bFromData2 = null;
var test =1;
var checkCd = "00";
var mapfirst = 0;
let mapMode = 1;
let rankMenuFlag = false;
let isJobFirst = false;
let joblastPage = 0;
let selectJobAdmCd = "";
let resetFomData1 ="";
let resetFomData2 ="";
let mainYear = "2020";
let seleteTitle = "";
let selectTap = "kind";
let lastJobCode1 = "";
let lastJobCode2 = "";
let lastJobCodeNm1 = "";
let lastJobCodeNm2 = "";
let sigenlKindList = [];


let selectInfoData = "";
let sigenlComList = [];
let sigenlBizList = [];
let sigenlOpenColseList = [];
let sigenlYmageList = [];
let sigenlLndList = [];
let sigenlComRankList = "";
let sigenlBizRankList = "";
let sigenlOpenColseRankList = "";
let sigenlYmageRankList = "";
let sigenlLndRankList = "";


let selectYearType = "slider";

let togetherMenu = new Map(); 



$(document).ready(function(){
	if(accessToken == "" || accessToken == "none" )	accessTokenInfo();
	
	resetFomData1 =  $('#searchFrom').html();
	resetFomData2 = $('#togetherSearchFrom').html();
	
	$('.sop-bottom.sop-left').css('z-index', 90);
	$('.sop-bottom.sop-right').css('z-index', 80);
	
	bFromData = $('#searchFrom').serialize();
	bFromData2= $('#togetherSearchFrom').serialize();
	$(".selected").click(function(){
		if(!$(this).siblings('.optionContainer').hasClass('active')){
			$(".selected").siblings('.optionContainer').removeClass('active');
			$(".selected").removeClass('active');
		}
		$(this).siblings('.optionContainer').toggleClass('active');
		$(this).toggleClass('active');
	
	});
	
	//$(".rankWrapper").hide();
	
	
	$('.searchRadioOption').click(function(){
		setLastCode("99999999");
		var radio  = $(this).find('input[type=radio]');
		var label  = $(this).find('label').text();
		var data = radio.val();
		var name = radio.attr('name');
		
		// mxpd 2022.11.30 : 도시화 경계 선택 시 준비중 alert 띄우고 return;
		if(name == 'bord_type' && data == 5 && label == '도시화' ) {
			alert("도시화 경계를 이용한 서비스는 준비중입니다.");
			return;
		}
		
		
		var searchInput = $('#searchFrom').find("input[name='"+name+"']");
		var parentDiv =  $(this).parent('.optionContainer').parent('.selectBox');
		
		if(data == searchInput.val()){
			$(parentDiv).find('.active').toggleClass('active');	
			return; 
		}
		
		setFlagF(true);
		
		searchInput.val(data);
		$(parentDiv).find('.active').toggleClass('active');
		$(parentDiv).find('.selected').find('.text').html(label);
		
		if(data ==1 && name == "category"){
			$('#searchArea').val(1);
			$sbrActiveMap.ui.mapList[0].setZoomMap(1);
		}
		
		if(!checkFormData()){
			resetAtearinfo(true);
			setDetailSetting();
			$sbrActiveMap.ui.mapList[0].getMapPolygon();
		}
		
		if(name == "detail_search_theme"){
			selectAllfalse(true);
		}
		
		if(data ==2 && name == "category"){
			$(".sliderContainer").show();
			$('#searchFrom').html(resetFomData1);
			$('#searchCategory').val(2);
			setRightbtnMode(2);
			$('#configTitle').html("조건별 지역찾기");
			$('.selectBox.icon.area').find("label[for='area1']").text("시군구");
			$('.selectBox.icon.area').find('.selected ').find('.text').html("시군구");
			document.querySelector('.selectBox.icon.area.tip-bottom')._tippy.setContent('전국의 시군구를 확인할 수 있습니다.')
			
			resetFrom();
			$('#searchTitle2').html("시군구");
			closeLeftAll();
			clearFilterAll();
			resetRankExpand();
			$sbrActiveMap.ui.mapList[0].setZoomMap(1);
			
		}else if(data ==1 && name == "category"){
			$(".sliderContainer").hide();
			$('#searchFrom').html(resetFomData1);
			setRightbtnMode(1);
			resetFrom();
			resetRankExpand();
			$('#configTitle').html("지도로 생태분석");
			$('.selectBox.icon.area').find("label[for='area1']").text("행정구역");
			$('.selectBox.icon.area').find('.selected ').find('.text').html("행정구역");
			document.querySelector('.selectBox.icon.area.tip-bottom')._tippy.setContent('행정구역 및 테마경계별 기업 통계를 확인할 수 있습니다.')
			$('#searchTitle2').html("행정구역");
			
		}
		
		document.querySelector('.selectBox.icon.area.tip-bottom').hide();
		
		if(name == 'category' || name == 'bord_type') {
			tooltipControl[tooltipMap[label]]();
			return false;
		}
		
		
		if(name == 'year') {
			let selectedRankData = sMap.map.rankData.find(item => item.bord_cd == $("#searchAdmCd").val());
			selectedRankData.base_year = data;
			if(!$('#popupLayout1').is(':visible')){
				showRankDetail(selectedRankData.bord_cd	,selectedRankData.x_coor,selectedRankData.y_coor,selectedRankData.addr);
			}
			return false;
		}
		
		
		
		
		
	});
	
	$('#tipDiv1').show();
	
	
	$('.searchRadioOption2').click(function(){
		setLastCode("99999999");
		
		let iconName = $(this).find('i').attr('class');
		$("#rightSelectArea").find('.selectBox.icon.halfGubun').find('.selected.halfGubun').find('.icon').removeClass().addClass(`icon ${iconName}`);
		
		var radio  = $(this).find('input[type=radio]');
		var label  = $(this).find('label').text();
		var data = radio.val();
		var name = radio.attr('name');
		
		
		var searchInput = $('#togetherSearchFrom').find("input[name='"+name+"']");
		var parentDiv =  $(this).parent('.optionContainer').parent('.selectBox');
		
		if(data == searchInput.val()){
			$(parentDiv).find('.active').toggleClass('active');	
			return;
		}
		
		setFlagF(true);
		
		searchInput.val(data);
		$(parentDiv).find('.active').toggleClass('active');
	
		$(parentDiv).find('.selected').find('.text').html(label);
		setDetailSetting();
		
		if(!checkFormData2()){
			resetAtearinfo(true);
			$sbrActiveMap.ui.mapList[1].getMapPolygon();
		}
		
		closeLeftAll();
		
	});
	
	
	$('.searchRadioOption3').click(function(){
		
		
		var radio  = $(this).find('input[type=radio]');
		var label  = $(this).find('label').text();
		var data = radio.val();
		var name = radio.attr('name');
		
		//alert(name);
		var searchInput = $('#searchFrom').find("input[name='"+name+"']");
		var parentDiv =  $(this).parent('.optionContainer').parent('.selectBox');
		
		if(data == searchInput.val()){
			$(parentDiv).find('.active').toggleClass('active');	
			return;
		}
		
		if(name=="custom"){
			$('#searchCustom').val(data);
			setTimeout(function() {
				getLinCartData("year");
			}, 50);
		}else{
			setLastYear($(parentDiv).find('.selected').find('.text').html());
			searchInput.val(data);
			setChart("year");
		}
		
		$(parentDiv).find('.active').toggleClass('active');
		$(parentDiv).find('.selected').find('.text').html(label);
		
		//closeLeftAll();
		
	});
	
	$('#areaSearchBtn').click(function(){
		resetBizMode();
		if(selectAreaOpenPopup()){
			
			if($(this).hasClass("active")){
				$(this).removeClass('active');
				$('#divAreaPopup').hide();	
				$sbrActiveMap.ui.mapList[0].gMap.setMinZoom(1);
			}else{
				$(this).toggleClass('active');
				selectAreaOpenPopup();
				$('#divAreaPopup').show();
			}
		}
		
	});
	
	
	
	$('#companySearChBtn').click(function(){
		$('#divAreaPopup').hide();
		if($(this).hasClass("active")){
			$(this).removeClass('active');
			resetSubMode();
		}else{
			$(this).toggleClass('active');
			$('#companyPopup').show();
		}
	});
	
	$('#companySearChBtn2').click(function(){
		setLastCode("99999999");
		$('#divAreaPopup1').hide();
		if(selectAreaOpenPopup2()){
			if($(this).hasClass("active")){
				resetSubMode();
			}else{
				$(this).toggleClass('active');
				$('#companyPopup1').show();
			}
			
		}
		
	});
	
	setRightbtnMode(1);
	
	$('.bizCodeTitle').click(function(){
		$(this).find('i').toggleClass('active');
		$(this).siblings('ul').toggle();
	});
	
	$('.bizCodeOpen').click(function(){
		var obj = $(this).parent('ul').siblings('.optionAcc');
		obj.find('.bizCodeTitle').find('i').removeClass('active');
		obj.find('ul').show();
	});
	
	$('.bizCodeClose').click(function(){
		
		var obj = $(this).parent('ul').siblings('.optionAcc');
		
		var totalCount = obj.find('.bizCocdeList').find('i').length; 
		var openCount = obj.find('.bizCocdeList').find('i.active').length; 
		
		console.log(totalCount);
		console.log(openCount);
		
		
		if(totalCount == openCount && $(this).closest('#resultJobListBtn').length == 1) {
			$("#resultJobCodeBtn").click()
			return false; 
		}
		
		if(totalCount == openCount) $('.bizMenuTitle').click(); 
		else{
			obj.find('.bizCodeTitle').find('i').removeClass('active');
			obj.find('.bizCodeTitle').find('i').toggleClass('active');
			obj.find('ul').hide();
		}
		
	});
	
	$('.bizCodeSelect').click(function(){
		var data1 = $(this).find('.valueBiz1').val();
		var data2 = $(this).find('.valueBiz2').val();
		var name1 = $(this).find('.nameBiz1').val();
		var name2 = $(this).find('.nameBiz2').val();
		
		$('.bizCodeSelect').find('i').removeClass('active');
		$(this).find('i').toggleClass('active');
		$('.bizMenuTitle').find('.text').html(name2);
		//$('#searchFrom').find('input[name=biz_cd]').val(data);
		$('#searchFrom').find('input[name=kisc_cd_1]').val(data1);
		$('#searchFrom').find('input[name=kisc_cd_2]').val(data2);
		$('#searchksic_1_nm').val(name1);
		$('#searchksic_2_nm').val(name2);
		
		
		$(".selected").siblings('.optionContainer').removeClass('active');
		$(".selected").removeClass('active');	
		
		if(!checkFormData()){
			resetAtearinfo(true);
			setFlagF(true);
			$sbrActiveMap.ui.mapList[0].getMapPolygon();
		}
		
		// 지역분석창 확인
		if($(".leftContent.rankResult").css('display') == 'none')	return false;
		
		let selectedRankData = sMap.map.rankData.find(item => item.bord_cd == $("#searchAdmCd").val());			
		selectedRankData.kisc_cd_1 = data1;
		selectedRankData.kisc_cd_2 = data2;
		
		showRankDetail(selectedRankData.bord_cd
				,selectedRankData.x_coor
				,selectedRankData.y_coor
				,selectedRankData.addr);
		
		return false;	
		
		
	});
	
	
	
	$('.bizCodeSelect2').click(function(){
		
		
		var data1 = $(this).find('.valueBiz1').val();
		var data2 = $(this).find('.valueBiz2').val();
		var name1 = $(this).find('.nameBiz1').val();
		var name2 = $(this).find('.nameBiz2').val();
		
		$('.bizCodeSelect2').find('i').removeClass('active');
		
		$(this).find('i').toggleClass('active');
		$('#searchFrom').find('input[name=kisc_cd_1]').val(data1);
		$('#searchFrom').find('input[name=kisc_cd_2]').val(data2);
		
		//$(".selected").siblings('.optionContainer').removeClass('active');
		//$(".selected").removeClass('active');
		$('#searchksic_1_nm').val(name1);		
		$('#searchksic_2_nm').val(name2);

		gubunTrigger($('#resultJobCodeBtn'));
		
		$('#popupJobTitle').html(name1 +" > "+name2);
		showAllResult("resultMode");
		
		/*if(!checkFormData()){
			resetAtearinfo(true);
			setFlagF(true);
			$sbrActiveMap.ui.mapList[0].getMapPolygon();
		}*/
		
	});
	
	//setRank("00");
	//설정초기화
	setDetailSetting();
	//랭킹 보이는거 초기화
	rankExpandSet();
	
	//$sbrActiveMap.ui.mapList[0].getMapPolygon();
	
	$("body").on("click",".colorck li>a",function(){
		$sbrActiveMap.ui.mapList[0].getMapPolygon();
	});
	
	$("body").on("click",function(){
		
		var flag = $('.subTopMenu').siblings('.selectBox ').find('.optionContainer').hasClass('active');
		
	});
	
	$('#leftMainMenuBtnList').click(function(){
		reSetMenuBtn();	
	});
	$('.mainTopMenu').click(function(){
		//reSetMenuBtn();	
	});
	
	 
	
	
	 // 세대 옵션 최대 3개 
    $('input[name="homeGroup"]').on('click', (e) => {
        let count = $("input:checked[name='homeGroup']").length
        if(count > 3) {
            alert('세대 선택은 최대 3개까지 할 수 있습니다.')
            $(e.target).prop('checked',false);
        }
    })
    
    // 유형 옵션 최대 3개 
    $('input[name="houseGroup"]').on('click', (e) => {
        let count = $("input:checked[name='houseGroup']").length
        if(count > 3) {
            alert('유형 선택은 최대 3개까지 할 수 있습니다.')
            $(e.target).prop('checked',false);
        }
    })

    // 함께보기 주제 선택 변경 UI셀렉트 박스 
    $('input[name=halfGubun]').on('click', e => {
        selectBoxChange(e.target);
    })
	
    
    
    $('#popupLayout1').mouseover(function(e){
    	$('.popup.rankResult').show();
    });
    
    $('#popupLayout1').mouseout(function(e){
    	$('.popup.rankResult').hide();
    });
    
    $('#mapRgn_box').mouseout(function(e){
    	$('.popup.rankResult').hide();
    });
    
    
  //설정 탭 
    $('ul.tab.options li').click((item) => {
        $(item.target).parent('.tab').children('li').removeClass("on")
        $(item.target).addClass('on')
    })
    
    
    var iWidth = $(window).width();
	var iHeight = $(window).height();
    
    
    if (iHeight >=1080||iWidth >=1920) { //1920*1080
			$('#div_target').css({
				position : 'absolute',
				top : '52.5%',
				left : '49.5%',
				width : '20px',
				height : '20px',
				margin : $('#div_target').height()/2*-1+"0 0"+$('#div_target').width()/2*-1,
				"z-index" : '4'
			});
			//보고서 출력시 중심점 마커 표시x
			$("#div_target").attr('data-html2canvas-ignore', 'true');
		
	}else{ //1920*1080 아래
			$('#div_target').css({
				position : 'absolute',
				top : '53.5%',
				left : '49%',
				width : '20px',
				height : '20px',
				margin : $('#div_target').height()/2*-1+"0 0"+$('#div_target').width()/2*-1,
				"z-index" : '4'
			});
			//보고서 출력시 중심점 마커 표시x
			$("#div_target").attr('data-html2canvas-ignore', 'true');
	}
    
    
    
    $(".sliderContainer").hide();
    
    
    $('#jobListDiv').scroll(function(){
    	var scrollTop = $(this).scrollTop();
        var innerHeight = $(this).innerHeight();
        var scrollHeight = $(this).prop('scrollHeight');
        
        if (scrollTop + innerHeight >= scrollHeight) {
        	//최하단
        	setJobList(selectJobAdmCd,joblastPage);
        }
    	
    });
    
    //시작시 지도그리기
    $sbrActiveMap.ui.mapList[0].getMapPolygon();

	//rankViewMode(); // mxpd 2022.11.28 : 초기화면에서 지역순위 보이도록 설정
	
	
/*	$('#houseArea1').change(function(){
		setAreaSizeText($(this).val(),$('#houseArea2').val());
	});
	
	$('#houseArea2').change(function(){
		setAreaSizeText($('#houseArea1').val(),$(this).val());
		
	});*/
	
	$('#companyPopup1').mouseover(function(){
		$sbrActiveMap.ui.mapList[0].gMap.scrollWheelZoom.disable();
	});
	
	$('#companyPopup1').mouseout(function(){
		$sbrActiveMap.ui.mapList[0].gMap.scrollWheelZoom.enable();
	});
	
	
	$('#companyPopup').mouseover(function(){
		$sbrActiveMap.ui.mapList[0].gMap.scrollWheelZoom.disable();
	});
	
	$('#companyPopup').mouseout(function(){
		$sbrActiveMap.ui.mapList[0].gMap.scrollWheelZoom.enable();
	});
	
	$('.bizListDiv').click(function(){
		if($(this).find('i').hasClass("active")){
			$(this).find('i').removeClass("active");
			$(this).siblings('.child').show();
		}else{
			$(this).find('i').addClass("active");
			$(this).siblings('.child').hide();
		}
	});
	
	
	//툴팁
	tippy('.tip-bottom', {placement: 'bottom',maxWidth:500});
	tippy('.tip-right', {placement: 'right'});
	
	let container = document.querySelectorAll(".tip-bottom");

    // 셀렉트 박스 서브메뉴 툴팁 버블링 제거
    container.forEach(function(el) {
        el.addEventListener("mouseout", (e) => {        	
            if (e.target._tippy && e.target != el)  el._tippy.hide();
            if($(el).children('.selected').hasClass('active')) el._tippy.hide(); // active 상태일때 hide
        });
    })
    
    document.querySelectorAll(".tip-bottom [data-tippy-content]").forEach((el) => {
        el.addEventListener("mouseenter", (e) => {
            el._tippy.show();
        });
    });
	
    
    $('.lgTypeList').parent('li').hide();
});

function getSignalBizOpenClose() {
	
	if($('#searchCategory').val() == 2){
		$('#searchZoom').val("4");
	}
	
	var formData = $('#searchFrom').serialize();

	$.ajax({
		method: "POST",
		async: true,
		url: "/view/sbrStats/sbrBizOpenClose",
		data: formData,
		dataType: "JSON",
		success: (res) => {
			setSignalBizOpenClose(res);
		}
	})
}

function setSignalBizOpenClose(res,selectData) {
	
	let bizData = getSignalData(res,selectData,"openColse");
	
	sigenlKindList.openClose = bizData.base_key;
	
	
	let condition = bizData.base_key;
	
	let ratio = bizData.base_value;
	
	switch (condition) {
		case 'KIND1':
			contents = `<span class="signalValue">개업이 폐업보다
						 <span class="point">${ratio}</span>% 강세</span>`;
			break;
		case 'KIND2':
			contents = `<span class="signalValue">폐업이 개업보다
						<span class="point">${ratio}</span>% 강세</span>`;
			break;
		case 'KIND3':
			contents = `<span class="signalValue">개업과 폐업 기업수가 비슷한
						<span class="point">정체</span> 상태</span>`;
			break;
		case 'KIND4':
			contents = `<span class="signalValue">폐업이 없는 개업률
						<span class="point">${ratio}</span>% 청정지역</span>`;
			break;
		case 'KIND5':
			contents = `<span class="signalValue">개업이 없는 폐업률</span>
						<span class="point"> ${ratio}</span>% 위험지역 </span>`;
			break;
		case 'KIND6':
			contents = `<span class="signalValue">개업과 폐업 기업이 없는
						<span class="point">정체</span> 상태</span>`;
			break;
		default:
			contetns = `(확인필요) 데이터 없음`;
			break;
	}

	// let html = `<span class="signalValue">${contents}</span>`

	$('#signalOpenClose').find('.signalValue').remove();
	$('#signalOpenClose').find('.icon_chart').after(contents);
}

function getSignalTrendBiz() {
	var formData = $('#searchFrom').serialize();
	// console.log("sbr.js -> getSignalTrendBiz : " + formData); 
	$.ajax({
		method: "POST",
		async: true,
		url: "/view/sbrStats/sbrSignalTrendBiz",
		data: formData,
		dataType: "json",
		success: function(res) {
			// ksic_2_nm 이 3년 연속 평균 sub1 증가 추세
			setSignalTrendBiz(res);
		}
	});
}

function setSignalTrendBiz(res,selectData) {
	
	let bizData = getSignalData(res,selectData,"biz");
	
	sigenlKindList.biz = bizData.base_key;
	
	let condition = bizData.base_key;
	let bizName = bizData.ksic_2_nm; // 글자수 줄임 등 조정 필요
	let bizTrendRatio = bizData.base_value;
	let contents = "";	
	
	bizTrendRatio = Math.abs(bizTrendRatio);
	bizTrendRatio = getCash(bizTrendRatio);

	switch (condition) {
		case 'KIND1':
			contents = `<span class="signalValue"> <span class="point" id="signelBizTitle">${bizName}</span> 이 
			<br> 3년 연속 평균 <span class="point">${bizTrendRatio}</span>% 증가 추세</span>`;
			break;
		case 'KIND2':
			contents = `<span class="signalValue"> <span class="point" id="signelBizTitle">${bizName}</span> 이 
			<br> 2년 연속 평균 <span class="point">${bizTrendRatio}</span>% 증가 추세</span>`;
			break;
		case 'KIND3':
			contents = `<span class="signalValue"> <span class="point" id="signelBizTitle">${bizName}</span> 이 
			<br> 전년 대비 <span class="point">${bizTrendRatio}</span>% 증가</span>`;
			break;
		case 'KIND4':
			contents = `<span class="signalValue"> <span class="point" id="signelBizTitle">${bizName}</span> 이 
			<br> 전년 대비 <span class="point">${bizTrendRatio}</span>% 감소</span>`;
			break;
		case 'KIND5':
			contents = `<span class="signalValue"> <span class="point" id="signelBizTitle">${bizName}</span> 이 
			<br> <span class="point">${bizTrendRatio}</span>%로 가장많이 위치</span>`;
			break;
		default:
			contetns = `(확인필요) 데이터 없음`;
			break;
	}

	
	$('#signalTrend').find('.signalValue').remove();
	$('#signalTrend').find('.icon_house').after(contents);
}

function getSignalData(res,selectData,type){
	var data = "";
	
	var base_key = "";
	var cdList = [];
	
	res.forEach(function(item,index){
		if(selectData.bord_cd == item.bord_cd){
			data = item;
			base_key = item.base_key;
		}else{
			cdList.push(item.bord_cd)
		}
	});
	
	
	if(type == "com"){
		sigenlComRankList  = {'bord_cd' : cdList,'base_key':base_key };
	}else if(type == "biz"){
		sigenlBizRankList  = {'bord_cd' : cdList,'base_key':base_key };
	}else if(type == "ymage"){
		sigenlYmageRankList = {'bord_cd' : cdList,'base_key':base_key };
	}else if(type == "openColse"){
		sigenlOpenColseRankList = {'bord_cd' : cdList,'base_key':base_key };
	}else if(type == "lnd"){
		sigenlLndRankList = {'bord_cd' : cdList,'base_key':base_key };

	}
	
	return  data;
	
}

function setAreaSizeText(area1,area2){
	
	var cal1 = getCash(Math.ceil(Number(area1)*0.3025*10)/10);
	var cal2 = 0;
	
	var text = "";
	
	if(area2 == "+"){
		text = "( "+cal1+"평 초과 ~ )";
	}else{
		cal2 = getCash(Math.ceil(Number(area2)*0.3025*10)/10);
		text = "( "+cal1+"평 초과 ~ 약 "+cal2+"평 이하 )";
	}
	
	$('#houseAreaText').html(text);
	
}


function reSetMenuBtn(){
	$('.selectBox').find('.optionContainer').removeClass('active');
	$('.selectBox').find('.selected').removeClass('active');
	
	$('#rightSelectArea').find('.selectBox ').find('.selected').removeClass('active');
	
}

function reSetTopMenu(){
	
}

function helpTabBtn(){
	closeLeftAll();
	reSetMenuBtn();
	setleftBtn(3);
	$('#helpTab').show();
}

function checkFormData(){
	var formData = $('#searchFrom').serialize();
	
	sMap.map.selectMapType = $('#searchArea').val();
	sMap.map.mapCategory = $('#searchCategory').val();
	
	
	if(mapMode != $('#searchCategory').val() && $('#searchCategory').val() !="" ){
		mapMode = $('#searchCategory').val();
	}
	
	
	if(bFromData == formData){
		return true;
	}else{
		//동작리셋
		resetBizMode(); // 기업위치 리셋
		
		bFromData = formData;
		return false;
	}
}

function checkFormData2(){
	var formData = $('#togetherSearchFrom').serialize();
	
	
	if(bFromData2 == formData){
		return true;
	}else{
		//동작리셋
		resetBizMode(); // 기업위치 리셋
		
		bFromData2 = formData;
		return false;
	}
}


function naviPopupSelect(obj){
	console.log(obj);
}

function rankViewMode() {
	
  $("#regionRankBtn").toggleClass('active')
  $(".navRank").toggleClass('mini')
  $(".rankWrapper").toggle();
  resetSidoWrapper();
  reSetMenuBtn();  
}



function rankExpand() {
	
	if ($(".rankWrapper").hasClass('isScroll')) {
        $(".rankWrapper, .naviWrapper").addClass('isScroll')
        $(".rankWrapper").removeClass('isScroll')
        $('.rankList.table li').show();
        $(".rankBtn .btnLine p").text("축소보기");
        
        rankMenuFlag = true;
        rankResize();    
    } else {
    	$(".rankWrapper").addClass('isScroll')
        $(".rankBtn .btnLine p").text("펼쳐보기");        
    	rankMenuFlag = false;
        $('.rankWrapper').css("height","");
    }
	 
}

function resetRankExpand() {
	
	$(".rankWrapper, .naviWrapper").addClass('isScroll');
	$(".rankWrapper").removeClass('isScroll');
	$(".rankWrapper").addClass('isScroll');
	$(".rankBtn .btnLine p").text("펼쳐보기");        
	rankMenuFlag = false;
    $('.rankWrapper').css("height","");
		 
}

function setRankMenuFlag(flag){
	
	rankMenuFlag = flag;
}

function getRankMenuFlag(){
	
	return rankMenuFlag;
}


function selectRankLi(obj){
	$('#ranklistUl').find('li').removeClass("active");
	$(obj).addClass("active");
	
}

function rankExpandSet(){
	
	var rankCount =$('.rankList.table li').length; 
	if(rankCount <= 10){
		$('.rankBtn').hide();
		return;
	}else{
		$('.rankBtn').show();
	}
		
}

function rankResize(){
	 let wrapper = $('.rankWrapper');
     var rankCount =$('.rankList.table li').length ;
     var rankSize = (rankCount * 31) + 97;
     var minSize = (10 * 31) + 97;
     
     if(rankSize  < minSize) rankSize = minSize;
     
     wrapper.css("height",rankSize +"px"); 
}



function resetSidoWrapper(){
	$(".rankWrapper, .naviWrapper").removeClass('expand1')
    $(".rankBtn .btnLine p").text("펼쳐보기");

    $('.rankList.table li').each(function(index, item){
      if($(item).hasClass('add')) $(item).remove();
    });
}


function getCodeList(code){
	
	jQuery.ajax({
		type:"POST",
		url: "/view/sbrStats/codeList",
		data: {codeId: code},
		dataType:"json",
		async: true,
		success:function(data){
			
			return data;
		},
		error:function(data) {
			
			return "faill";
		}
	});
	
}

//설정 토글
function toggleSetting(){
	reSetMenuBtn();
    $(".leftContent").not('.settingBox').hide();
    $(".filter li.setting button").toggleClass('active');
    $(".settingBox").toggle();
    $('.settingBox').children('.container').scrollTop(0)
}


//지역랭킹 아이템 클릭
function showRankDetail(data,x,y,title){
	
	if($('#searchCategory').val() == 2) setAreaInfoMode(true);
	$(".leftSub").hide();
	startLoadRank();
	//return;
    // 지역랭킹 오버 일때 나오는 팝업 화면
	seleteTitle = title;	
	closeLeftAll();
	reSetMenuBtn();
	$('#loadDiv').show();
	
	$('.section.signal').find("li").removeClass("active");
	
	if(!isNaN(x) && x != ""){
		$sbrActiveMap.ui.mapList[0].moveMap(x,y);
		setXY(x,y);
	}
	
	var flag = false;
	
	sMap.map.rankData.forEach(function(item,index){
		if(item.bord_cd == data){
			console.log(item);
			if(item.value > 4)flag = true;
			else if(item.ent_co > 4)flag = true;
		}
	});
	
	if(!flag){
		$('#loadDiv').hide();
		alert("기업 수가 3미만인 지역은 지역분석을 제공하지 않습니다.");
		return ;
	}
	
	
	var areaType = $('#searchArea').val();
	
	if(areaType == 4){
		$('#arrowSbr').show();
	}else{
		$('#arrowSbr').hide();
	}
	
	
	$('#searchAdmCd').val(data);
	sMap.map.selectAdmCd = data;
	
	// mxpd 2022.11.13 : "leftContent rankResult popup" set data
	let selectedRankData = sMap.map.rankData.find(item => item.bord_cd == data);	 
	
	
	isJobFirst = true;
	joblastPage = 0;
	selectJobAdmCd = data;
	

	
	
	setChartAdmCd(data);
	settChartTitle(title);
	
	setLodFlag1(false);
	setLodFlag2(false);
	
	$(".leftContent.rankResult").show();
	
	//일자리
	setTimeout(function() {
		setJobList(data,0);
	}, 50);
	
	//시그널 데이터
	setTimeout(function() {
		setLeftSideData(selectedRankData);
	}, 50);
	
	//차트 데이터
	setTimeout(function() {
		getLeftCartData(data);
	}, 50);
	
	
	
	if($('#searchArea').val() != 1){
		$('#leftJobBtn').hide();
	}	
	$('#loadDiv').hide();	
	selectRankLi($('#rankScroll'+data));
	
	
	/*setTimeout(function() {*/
		$('#loadDiv').hide();
/*		stopInterval(interval);
	}, 5000);
*/	
	$sbrActiveMap.ui.mapList[0].setSelectRank(data);
	$('#loadDiv').hide();
	
	$('#leftMain1').scrollTop(0);
}


//상세보기 로딩바 
function startLoadRank(){
	
	
	//시그널 로딩
	$('.signalContent').hide();
	$('#signalLosdBar').show();
	
	//차트1 로딩
	$('.rankChar1').hide();
	$('.chartLoadBar1').show();
	
	//차트2 로딩
	$('.rankChar2').hide();
	$('.chartLoadBar2').show();
	
	//차트3 로딩
	$('.rankChar3').hide();
	$('.chartLoadBar3').show();
	
	//차트4 로딩
	$('.rankChar4').hide();
	$('.chartLoadBar4').show();
	
}

function stopInterval(obj){
	clearTimeout(obj);
}

function getMaketInfo(){
	
	
	setTimeout(function() {
		getMaketIndoDAta(sMap.map.selectAdmCd);
	}, 50);
	
}

function setJobList(code,page){
	
	
	var rankData = sMap.map.rankData;
	var addr = "";
	
	rankData.forEach(function(item,index){
		if(item.bord_cd == code){
			addr = item.addr;
		}
	});
	
	$.ajax({
		method: "POST",
		async: true,
		url: "/view/sbrStats/sbrjobList",
		data: {"adm_cd":code,"pageNumber":joblastPage, "bord_type":$("#searchArea").val()},
		dataType: "json",
		success: function(res) {
			
			if(res.length <1 ) return;
			
			var titlehtml = "";
			var totalCount = res.length; 
			if(res[0].total != null)totalCount = res[0].total;
			
			if(isJobFirst){
				$('#jobCountSpan').html(getCash(totalCount));
				
				titlehtml += "<article class=\"title\">";
				titlehtml += "	<span class=\"bold\">"+addr+"</span>의<br>선택 업종 관련 <span  class=\"bold\">"+getCash(totalCount)+"건</span> 구인정보목록";
				titlehtml += "</article>";
				
				$('#jobListDiv').html("");
				$('#jobListDiv').append(titlehtml);
				
				var endBtn ="<div class=\"close\" onclick=\"closeLeft(this)\"><i class=\"closeBtn\"></i></div>";
				$('#jobListDiv').append(endBtn);
				
			}
			
			
			res.forEach(function(item,index){
				
				var jobLink = "";
				if(item.jo_data_div == "W"){
					jobLink ="https://www.work.go.kr/empInfo/empInfoSrch/detail/empDetailAuthView.do?callPage=detail&wantedAuthNo="+item.jo_data_key;
				}else if(item.jo_data_div == "I"){
					jobLink ="https://job.incruit.com/jobdb_info/jobpost.asp?job="+item.jo_data_key;
				}else if(item.jo_data_div == "S"){
					jobLink ="https://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx="+item.jo_data_key; 
				}

				
				var endDAte = "'"+item.clos_dt+"'";
				
				var html = "";
				html += "<article class=\"content\">";
				html += "  <a href=\""+jobLink+"\" target=\"_blank\"><p class=\"title\">"+item.recru_nm+"</p></a>";
				html += "  <ul class=\"info\">";
				html += "    <li>"+item.corp_nm+"</li>";
				html += "    <li class=\"date\">"+endDAte+" 마감</li>";
				html += "  </ul>";
				html += "  <ul class=\"tagWrap\">";
				html += "    <li>"+item.career_nm+"</li>";
				html += "    <li>"+item.acdmcr_nm+"</li>";
				html += "  </ul>";
				html += "</article>";
				$('#jobListDiv').append(html);
				
				joblastPage = item.job_row_number;
			});
			
			if(isJobFirst){
				$('#jobListDiv').scrollTop(0);
			}
			
			isJobFirst= false;
			 
			
		}
	});

}

// mxpd 2022.11.13 : 지역랭킹 클릭 시 왼쪽 팝업 메뉴 open & fill data
function setLeftSideData(data) {
	var formData = $('#searchFrom').serialize();
	
	// 1. 선택된 도시, 연도, 업종 binding
	$('#regionName').html(data.addr);
	$('#maketTitle').html(data.addr);
	settChartTitle(data.addr);
	
	$('#year').html(data.base_year);

	var selectedBizName = data.kisc_cd_1 == '0' ? '전체업종' :  $('.selected.bizMenuTitle').text();
	$('#bizName').html(selectedBizName); // item.뭐를가져와야 업종코드지?

	// d. 청장년인구 증가율
	//setYouthCountSignal(data);

	// 0. leftSideMenu 에 필요한 Data를 가져온다.
	var infoData =data; 
	
	$.ajax({
		method: "POST",
		async: true,
		url: "/view/sbrStats/sbrRegionSignalDataList",
		data: formData,
		dataType: "json",
		success: function(res) {
			
			selectInfoData = infoData;

			// a. 100대 대기업 위치
			setRankSignal(res.com,infoData);
			sigenlComList = res.comListData;
			
			//대세업종
			setSignalTrendBiz(res.biz,infoData);
			sigenlBizList = res.bizListData;
			
			//개폐업 정보
			setSignalBizOpenClose(res.openClose,infoData);
			sigenlOpenColseList = res.openColseListData;
			
			//청장년 정보
			setYouthCountSignal(res.ymage,infoData);
			sigenlYmageList = res.ymageListData;
			
			//토지 정보
			setAverageLandPriceSignal(res.lnd,infoData);
			sigenlLndList = res.lndListData;
			
			
			
			$('#signalLosdBar').hide();
			$('.signalContent').show();
			
			setTimeout(function() {
				setLodFlag2(true);
			}, 1000);
			
			
		}
	});
	
}

function setLeftSideData2(data) {
	var formData = $('#searchFrom').serialize();

	$.ajax({
		method: "POST",
		async: true,
		url: "/view/sbrStats/sbrYouthCount",
		data: formData,
		dataType: "json",
		success: function(res) {

			//console.log(res);
			
			//장년층
			 var peop = res.ymage;
			 var admCd = data.bord_cd;
			 //console.log(data.bord_cd);
			 var data1 = "";
			 peop.forEach(function(item,index){
				 if(item.bord_cd == admCd){
					 data1 = item;
				 }
			 });
			 
			 
			 if(data1 == ""){
				 data1 = {'base_val':0,'base_key':"KIND6"}
		     }
			 
			 var html = "";
			     html += "청장년 인구" + getUpDownTitle(data1);
			     if(data1.base_val != 0)html += "<span class=\"point\" id=\"youthRatio\">"+data1.base_val+"%</span>"+getUpDownTitle2(data1);
			   
			$('#peopleLeftTitle').html(html);
			
			
			//토지가격 현황
			 var lnd = res.lnd;
			 var data2 = "";
			 lnd.forEach(function(item,index){
				 if(item.bord_cd == admCd){
					 data2 = item;
				 }
			 });
			 
			 
			 var html2 = "";
			     html2 += "토지 공시지가" + getUpDownTitle(data2);
			     html2 += "<span class=\"point\">"+getCash(Math.ceil(data2.base_val/10000))+"만원</span>"+getUpDownTitle2(data2);
			$('#areaLeftTitle').html(html2);
			
			
		}
	});
	
}

function getUpDownTitle(data){
	if(data.base_key == "KIND1") return "3년 연속 평균";
	else if(data.base_key == "KIND2") return "2년 연속 평균";
	else if(data.base_key == "KIND3") return "전년대비 평균";
	else if(data.base_key == "KIND4") return "전년대비 평균";
	else if(data.base_key == "KIND5") return "평균";
	else if(data.base_key == "KIND6") return "없음";
	return data;
}

function getUpDownTitle2(data){
	if(data.base_key == "KIND1") return "증가 추세";
	else if(data.base_key == "KIND2") return "증가 추세";
	else if(data.base_key == "KIND3") return "증가";
	else if(data.base_key == "KIND4") return "감소";
	else if(data.base_key == "KIND5") return "";
	else if(data.base_key == "KIND6") return "";
	return data;
}

function getSignalAverageLandPrice() {
	var formData = $('#searchFrom').serialize();
	$.ajax({
		method: "POST",
		async: true,
		url: "/view/sbrStats/getSbrSignalLandPrice",
		data: formData,
		dataType: "json",
		success: function(res) {
			setAverageLandPriceSignal(res);
		}
	});
}

function setAverageLandPriceSignal(res,selectData) {
	
	let bizData = getSignalData(res,selectData,"lnd");
	
	sigenlKindList.lnd = bizData.base_key;
	
	let condition = bizData.base_key;
	let result = bizData.base_val;
	let contents ="";
	
	result = Math.ceil(result/100);
	result = Math.abs(result);
	result = getCash(result);

	switch (condition) {
		case 'KIND1':
			contents = `<span class="signalValue">토지 공시지가 3년 연속
						 <span class="point">${result}</span>만원 증가 추세</span>`;
			break;
		case 'KIND2':
			contents = `<span class="signalValue">토지 공시지가 2년 연속
			<span class="point">${result}</span>만원 증가 추세</span>`;
			break;
		case 'KIND3':
			contents = `<span class="signalValue">토지 공시지가 전년대비
			<span class="point">${result}</span>만원 증가</span>`;
			break;
		case 'KIND4':
			contents = `<span class="signalValue">토지 공시지가 전년대비
			<span class="point">${result}</span>만원 감소</span>`;
			break;
		case 'KIND5':
			contents = `<span class="signalValue">토지 공시지가 평균
			<span class="point"> ${result}</span>만원 </span>`;
			break;
		case 'KIND6':
			contents = `<span class="signalValue">토지 공시지가 
			<span class="point">없음</span> </span>`;
			break;
		default:
			contents = `<span class="signalValue">데이터 없음
			<span class="point">[확인필요]</span> </span>`;
			break;
	}

	let html = `<span class="signalValue">${contents}</span>`

	$('#signalLandPrice').find('.signalValue').remove();
	$('#signalLandPrice').find('.icon_area').after(html);
}

function getSignalYouthPeopleCount() {
	
	if($('#searchCategory').val() == 2){
		$('#searchZoom').val("4");
	}
	
	var formData = $('#searchFrom').serialize();
	
	
	$.ajax({
		method: "POST",
		async: true,
		url: "/view/sbrStats/sbrSignalYouthCount",
		data: formData,
		dataType: "json",
		success: function(res) {

			setYouthCountSignal(res);
		}
	});
}

function setYouthCountSignal(res,selectData) {
	
	let bizData = getSignalData(res,selectData,"ymage");
	
	sigenlKindList.ymage = bizData.base_key;
	
	let condition = bizData.base_key; // 글자수 줄임 등 조정 필요
	let result = bizData.base_val;
	let contents ="";
	
	result = Math.abs(result);
	result = getCash(result);

	
	

	switch (condition) {
		case 'KIND1':
			contents = `<span class="signalValue">청장년 인구 3년 연속
						 <span class="point">${result}</span>% 증가 추세</span>`;
			break;
		case 'KIND2':
			contents = `<span class="signalValue">청장년 인구 2년 연속
			<span class="point">${result}</span>% 증가 추세</span>`;
			break;
		case 'KIND3':
			contents = `<span class="signalValue">청장년 인구 전년대비
			<span class="point">${result}</span>% 증가</span>`;
			break;
		case 'KIND4':
			contents = `<span class="signalValue">청장년 인구 전년대비
			<span class="point">${result}</span>% 감소</span>`;
			break;
		case 'KIND5':
			contents = `<span class="signalValue">지역 인구 중 청장년 인구비율
			<span class="point"> ${result}</span>% 차지 </span>`;
			break;
		case 'KIND6':
			contents = `<span class="signalValue">청장년 인구
			<span class="point">없음</span></span>`;
			break;
		default:
			contetns = `(확인필요) 데이터 없음`;
			break;
	}

	// let html = `<span class="signalValue">${contents}</span>`

	$('#signalYouthPeople').find('.signalValue').remove();
	$('#signalYouthPeople').find('.icon_people').after(contents);
}

function setOpenCloseSignal(res) {

	let trendPrefix = '개업과 폐업 기업이 없는 정체 상태';
	let trendRatio = 0.0;
	if (res.ent_opbiz_co > res.ent_clsbiz_co) {
		trendPrefix = '개업이 폐업보다';
		trendRatio = res.ent_tot / res.ent_clsbiz_co;
	} else if (res.ent_opbiz_co < res.ent_clsbiz_co) {
		trendPrefix = '폐업이 개업보다';
		trendRatio = res.ent_tot / res.ent_clsbiz_co;
	} else if (res.ent_opbiz_co == res.ent_clsbiz_co) {
		if (res.ent_opbiz_co > 0) {
			trendPrefix = '개업과 페업 기업수가 비슷한 정체 상태';
		} else {
			// open, close = 0
		}
	} else if (res.ent_opbiz_co > 0 && res.ent_clsbiz_co == 0) {
		trendPrefix = '폐업이 없는 개업률';
		trendRatio = res.ent_tot / res.ent_clsbiz_co;
	} else if (res.ent_opbiz_co == 0 && res.ent_clsbiz_co > 0) {
		trendPrefix = '개업이 없는 폐업률';
		trendRatio = res.ent_tot / res.ent_clsbiz_co;
	} else {
	}

	let trendRatiotext = String(trendRatio.toFixed(1)) + '%';
	$('#openCloseTrend').html(trendPrefix);
	$('#openCloseRatio').html(trendRatiotext);
}

function setRankSignal(res,selectData) {
	
	var i = 1;
	
	var listData = "";
	
	
	let bizData = getSignalData(res,selectData,"com");
	
	sigenlKindList.com = bizData.base_key;
	
	if (bizData.base_key == "KIND1") {
		$('#topBizSize').html('매출 100대 대기업');
		$('#topBizCount').html(bizData.base_value);
	} else if (bizData.base_key == "KIND2") {
		$('#topBizSize').html('매출 500대 대기업');
		$('#topBizCount').html(bizData.base_value);
	} else if (bizData.base_key == "KIND3") {
		$('#topBizSize').html('매출 1000대 대기업');
		$('#topBizCount').html(bizData.base_value);
	} else {
		$('#topBizSize').html('중견,중소,소상공인');
		$('#topBizCount').html(bizData.base_value);
	}
	
	
	
	
}

function setSignelSubTap(data,rankData,selectData,onType){
	
	$('#salesDataList').html("");
	
	var contentTitle = "";
	contentTitle += "<article class=\"title\">";
	contentTitle += "  <span class=\"bold\">"+selectData.addr+"</span>의<br> <span class=\"bold\">기업 분포</span>와 유사한지역";
	contentTitle += "</article>";
	
	$('#salesDataList').append(contentTitle);
	
	var rankList = rankData.bord_cd;
	var base_key = rankData.base_key;
	
		
		data.forEach(function(item,index){
			
				
				var contents = "";
			    contents += "<article class=\"content\">";
			    contents += "<p class=\"title\" onclick=\"showRankDetail('"+item.bord_cd+"','"+item.x_coor+"','"+item.y_coor+"','"+item.addr+"')\">"+item.addr+"</p>";
			    contents += "<ul>";
			    //<span >위치<span>
			    var on ="";
			    if(onType == "1") on = "on";

			    
			    if (item.companytype == "KIND1") {
			    	contents += "<li class=\""+on+"\"><i class=\"icon_sales\"></i>매출 100대 대기업 <span class=\"bold\">"+item.comdata+"개</span> 위치</li>";	
				} else if (item.companytype == "KIND2") {
					contents += "<li class=\""+on+"\"><i class=\"icon_sales\"></i>매출 500대 대기업 <span class=\"bold\">"+item.comdata+"개</span> 위치</li>";
				} else if (item.companytype == "KIND3") {
					contents += "<li class=\""+on+"\"><i class=\"icon_sales\"></i>매출 100대 대기업 <span class=\"bold\">"+item.comdata+"개</span> 위치</li>";
				} else { 
					contents += "<li class=\""+on+"\"><i class=\"icon_sales\"></i>중견,중소,소상공인 <span class=\"bold\">"+item.comdata+"%</span> 위치</li>";
				}
			    
			    
			    var signelBizTitle = $('#signelBizTitle').html();
			    
			    var on ="";
			    if(onType == "2") on = "on";
			    
			    switch (item.biztype) {
				case 'KIND1':
					contents += "<li class=\""+on+"\"><i class=\"icon_house\"></i><span class=\"bold\">"+signelBizTitle+"</span>이 3년 연속 평균 <span class=\"bold\">"+item.bizdata+"%</span> 증가</li>";
					break;
				case 'KIND2':
					contents += "<li class=\""+on+"\"><i class=\"icon_house\"></i><span class=\"bold\">"+signelBizTitle+"</span>이 2년 연속 평균 <span class=\"bold\">"+item.bizdata+"%</span> 증가</li>";
					break;
				case 'KIND3':
					contents += "<li class=\""+on+"\"><i class=\"icon_house\"></i><span class=\"bold\">"+signelBizTitle+"</span>이 전년 대비 <span class=\"bold\">"+item.bizdata+"%</span> 증가</li>";
					break;
				case 'KIND4':
					contents += "<li class=\""+on+"\"><i class=\"icon_house\"></i><span class=\"bold\">"+signelBizTitle+"</span>이 전년 대비 <span class=\"bold\">"+item.bizdata+"%</span> 감소</li>";
					break;
				case 'KIND5':
					contents += "<li class=\""+on+"\"><i class=\"icon_house\"></i><span class=\"bold\">"+signelBizTitle+"</span>이 <span class=\"bold\">"+item.bizdata+"%</span>로 가장많이 위치</li>";
					break;
				default:
					contetns += `(확인필요) 데이터 없음`;
					break;
			    }
			    
			    var on ="";
			    if(onType == "3") on = "on";
			    
			    switch (item.openclosetype) {
				case 'KIND1':
					contents += "<li class=\""+on+"\"><i class=\"icon_chart\"></i>개업이 폐업보다<span class=\"bold\">"+item.opencolsedata+"%</span> 강세</li>";
					break;
				case 'KIND2':
					contents += "<li class=\""+on+"\"><i class=\"icon_chart\"></i>폐업이 개업보다<span class=\"bold\">"+item.opencolsedata+"%</span> 강세</li>";
					break;
				case 'KIND3':
					contents += "<li class=\""+on+"\"><i class=\"icon_chart\"></i>개업과 폐업 기업수가 비슷한 <span class=\"bold\">정체</span> 상태</li>";
					break;
				case 'KIND4':
					contents += "<li class=\""+on+"\"><i class=\"icon_chart\"></i>폐업이 없는 개업률<span class=\"bold\">"+item.opencolsedata+"%</span> 청정지역</li>";
					break;
				case 'KIND5':
					contents += "<li class=\""+on+"\"><i class=\"icon_chart\"></i>개업이 없는 폐업률<span class=\"bold\">"+item.opencolsedata+"%</span> 위험지역</li>";
					break;
				case 'KIND6':
					contents += "<li class=\""+on+"\"><i class=\"icon_chart\"></i>개업과 폐업 기업이 없는<span class=\"bold\">정체</span> 상태</li>";
					break;
				default:
					contetns += `(확인필요) 데이터 없음`;
					break;
			    }
			    
			    
			    var on ="";
			    if(onType == "4") on = "on";
			    switch (item.ymagetype) {
				case 'KIND1':
					contents += "<li class=\""+on+"\"><i class=\"icon_people\"></i>청장년 인구 3년 연속 <span class=\"bold\">"+item.ymagedata+"%</span> 증가 추세</li>";
					break;
				case 'KIND2':
					contents += "<li class=\""+on+"\"><i class=\"icon_people\"></i>청장년 인구 2년 연속 <span class=\"bold\">"+item.ymagedata+"%</span> 증가 추세</li>";
					break;
				case 'KIND3':
					contents += "<li class=\""+on+"\"><i class=\"icon_people\"></i>청장년 인구 전년대비 <span class=\"bold\">"+item.ymagedata+"%</span> 증가 추세</li>";
					break;
				case 'KIND4':
					contents += "<li class=\""+on+"\"><i class=\"icon_people\"></i>청장년 인구 전년대비 <span class=\"bold\">"+item.ymagedata+"%</span> 감소</li>";
					break;
				case 'KIND5':
					contents += "<li class=\""+on+"\"><i class=\"icon_people\"></i>지역 인구 중 청장년 인구비율 <span class=\"bold\">"+item.ymagedata+"%</span> 차지</li>";
					break;
				case 'KIND6':
					contents += "<li class=\""+on+"\"><i class=\"icon_people\"></i>청장년 인구 <span class=\"bold\">없음</span></li>";
					break;
				default:
					contetns += `(확인필요) 데이터 없음`;
					break;
			    }
			    
			    
			    var lndResult = Math.ceil(item.lnddata/100);
			    lndResult = Math.abs(lndResult);
			    lndResult = getCash(lndResult);

			    var on ="";
			    if(onType == "5") on = "on";
			    
				switch (item.lndtype) {
					case 'KIND1':
						contents += "<li class=\""+on+"\"><i class=\"icon_area\"></i>토지 공시지가 3년 연속<span class=\"bold\">"+lndResult+" 만원 증가 추세</span></li>";
						break;
					case 'KIND2':
						contents += "<li class=\""+on+"\"><i class=\"icon_area\"></i>토지 공시지가 2년 연속<span class=\"bold\">"+lndResult+" 만원 증가 추세</span></li>";
						break;
					case 'KIND3':
						contents += "<li class=\""+on+"\"><i class=\"icon_area\"></i>토지 공시지가 전년대비<span class=\"bold\">"+lndResult+" 만원 증가</span></li>";
						break;
					case 'KIND4':
						contents += "<li class=\""+on+"\"><i class=\"icon_area\"></i>토지 공시지가 전년대비<span class=\"bold\">"+lndResult+" 만원 감소</span></li>";
						break;
					case 'KIND5':
						contents += "<li class=\""+on+"\"><i class=\"icon_area\"></i>토지 공시지가 평균<span class=\"bold\">"+lndResult+" 만원</span></li>";
						break;
					case 'KIND6':
						contents += "<li class=\""+on+"\"><i class=\"icon_area\"></i>토지 공시지가 <span class=\"bold\">없음</span></li>";
						break;
					default:
						contetns += `(확인필요) 데이터 없음`;
						break;
				}
			    
			    
			    
			    
			    contents += "</ul>";
			    contents += "</article>";
			    
			    $('#salesDataList').append(contents);
			    
			
			
		});
		
	
	
	
	var contentBottom = "";
    contentBottom += " <div class=\"close\" onclick=\"closeLeft(this)\"><i class=\"closeBtn\"></i></div>";
    contentBottom += "</div>";
    $('#salesDataList').append(contentBottom);
	
	
	
}


function optionDetail(obj,type){
	setLastCode("99999999");
	setFlagF(true);
	
	var tab = $(obj).parents("li").parents('ul').siblings('.tab');
	var subData = "";
	var subOjb = "";
	var selectData = [];
	var input = obj;
	
	if(type == 1){
		
		tab  = $(obj).parents("ul");
		var temp = tab.siblings('.content').find('input').eq(0);
		
		if($('input[name='+name+']:checked').is(':checked') == false){
			temp.attr('checked','true');
		}
		
		input = temp;
		
		
		
		resetDitelOption($(input).attr("class"),$(input).attr("type"));
		
		subOjb = $(obj).find('input');
		subData = $(obj).find('input').val()+"_";
		
		
		if($(input).attr("type") =="checkbox"){
			var name = $(input).attr("name");
			$('input[name="'+name+'"]:checked').each(function(){
				selectData.push(subData+$(this).val());
			});
		}else{
			var mainData = $(obj).val();
			selectData.push(subData+mainData);
		}
		
		
		
	}else{
		
		if(tab.length >0 ){
			subOjb = tab.find('.on').find('input');
			subData = subOjb.val();
		}
		
		resetDitelOption($(obj).attr("class"),$(obj).attr("type"));
		
		if(subOjb != ""){
			tab.children('li').removeClass("on")
			subOjb.parents("li").addClass("on");
			
			subData = subData+"_";
		}
		
		
		
		if($(obj).attr("type") =="checkbox"){
			var name = $(obj).attr("name");
			$('input[name="'+name+'"]:checked').each(function(){
				selectData.push(subData+$(this).val());
			});
		}else{
			var mainData = $(obj).val();
			selectData.push(subData+mainData);
		}
		
	}
	

	
    	
	$('#searchOptionList').val(selectData);
	$('#searchSettingValue1').val("");
	$('#searchSettingValue2').val("");
	$('#searchSettingValue3').val("");
	
	
	if(!checkFormData()){
		resetAtearinfo(true);
		setFlagF(true);	
		$sbrActiveMap.ui.mapList[0].getMapPolygon();
	}
}


function optionDetail2(obj,type){
	setLastCode("99999999");
	setFlagF(true);
	
	var tab = $(obj).parents("li").parents('ul').siblings('.tab');
	var name = $(obj).attr('name');
	var subData = "";
	var subOjb = "";
	var input = obj;
	
	if(type == 1){
		
		tab  = $(obj).parents("ul");
		var temp = tab.siblings('.content').find('input').eq(0);
		name =  temp.attr('name');
		
		console.log(temp);
		console.log($('input[name='+name+']:checked').val());
		console.log($('input[name='+name+']:checked').is(':checked'));
		if($('input[name='+name+']:checked').is(':checked'))input = $('input[name='+name+']:checked');
		else                                                input = temp;
		
		input.attr('checked','true');
		
		resetDitelOption($(input).attr("class"),$(input).attr("type"));
		
		subOjb = $(obj).find('input');
		subData = $(obj).find('input').val();
		
	}else{
		
		if(tab.length > 0 ){
			subOjb = tab.find('.on').find('input');
			subData = subOjb.val();
		}
		
		resetDitelOption($(input).attr("class"),$(input).attr("type"));
		
		if(subOjb != ""){
			tab.children('li').removeClass("on")
			subOjb.parents("li").addClass("on");
			subData = subData;
		}
		
	}
	
	//resetDitelOption($(input).attr("class"),$(input).attr("type"));
	
	if(name == "settingPpltn"){
		$('#searchSettingValue1').val("1");
		$('#searchSettingValue2').val(subData);
		$('#searchSettingValue3').val($(input).val());
	}else if(name == "settingLnd"){
		$('#searchSettingValue1').val("2");
		$('#searchSettingValue2').val(subData);
		$('#searchSettingValue3').val($(input).val());
	}else{
		$('#searchSettingValue1').val("");
		$('#searchSettingValue2').val("");
		$('#searchSettingValue3').val("");
	}
    	
	$('#searchOptionList').val("");
	
	if(!checkFormData()){
		resetAtearinfo(true);
		setFlagF(true);	
		$sbrActiveMap.ui.mapList[0].getMapPolygon();
	}
} 


function resetDitelOption(className,type){
	
	var index = 9;
	var flag = true;
	if(type == "checkbox") flag = false;
	
	for(var i=1; i<=9 ;i++){
		var name = 'optionInput'+i;
		if(name != className )$('.'+name).prop("checked",false);
	}
	
	var tab = $('ul.tab.options li').parent('.tab');
	
		tab.children('li').removeClass("on");
		tab.each(function(){
			$(this).children('li').eq(0).addClass("on");
		})
}

function selectAllfalse(flag){
	
	var index = 9;
	
	for(var i=1; i<=9 ;i++){
		var name = 'optionInput'+i;
		$('.'+name).prop("checked",false);
	}
	
	var tab = $('ul.tab.options li').parent('.tab');
	
	tab.children('li').removeClass("on");
	tab.each(function(){
		$(this).children('li').eq(0).addClass("on");
	})
	
	
	if(flag == true){
		setLastCode("99999999");
		setFlagF(true);
		$('#searchOptionList').val("");
		
		var formData = $('#searchFrom').serialize();
		bFromData = formData;
		
		$('#searchOptionList').val("");
		$('#searchSettingValue1').val("");
		$('#searchSettingValue2').val("");
		$('#searchSettingValue3').val("");
		$sbrActiveMap.ui.mapList[0].getMapPolygon();
	}
	
	
}


//지역랭킹 결과조회 지역시그널 클릭 이벤트
function openSignal(obj){
    const target =$(obj).data('content');

    $('.rankResult .signal li').removeClass('active')
    $(obj).addClass('active');
    
    $('#salesDataList').scrollTop(0);
    
    if(target == "sales"){
       setSignelSubTap(sigenlComList,sigenlComRankList,selectInfoData,1);
	    $(".leftSub").hide();
	    $('#signelDiv').show();
    }else if(target == "house"){
        setSignelSubTap(sigenlOpenColseList,sigenlBizRankList,selectInfoData,2);
 	    $(".leftSub").hide();
 	    $('#signelDiv').show();
    }else if(target == "chart"){
        setSignelSubTap(sigenlBizList,sigenlOpenColseRankList,selectInfoData,3);
 	    $(".leftSub").hide();
 	    $('#signelDiv').show();
    }else if(target == "people"){
        setSignelSubTap(sigenlYmageList,sigenlYmageRankList,selectInfoData,4);
 	    $(".leftSub").hide();
 	    $('#signelDiv').show();
    }else if(target == "area"){
        setSignelSubTap(sigenlLndList,sigenlLndRankList,selectInfoData,5);
 	    $(".leftSub").hide();
 	    $('#signelDiv').show();
    }else if(target == "job"){
        $(".leftSub").hide();
	    $(".leftSub").each((i, item) => {
	        if($(item).data('content') == target) $(item).show();
	    });
    }else{
    	alert("준비중입니다.");
    }
}


//종합분석 탭

function layerBoxTab(obj){
	
	if(selectTap == $(obj).data("tab")) return;
    var tabName = $(obj).data('tab');
    
  
    selectTap = tabName;
    $(".layerLg .menuWrap .tab li").removeClass('active');
    $(obj).addClass('active');
    $('#allResult .container > .content').each((i, item) => {
        $(item).hide();
        if(tabName == $(item).data('content')) $(item).show();
    })
    
    if($(obj).data("tab") == "company"){
    	setMapChart();
    	$('#resultJobListBtn').show();
    	$('#popupJobTitle').show();
    	
    }else if($(obj).data("tab") == "kind"){
    	setRechart();	
    	$('#resultJobListBtn').show();
    	$('#popupJobTitle').show();
    }else{
    	$('#resultJobListBtn').hide();
    	$('#popupJobTitle').hide();
    }
    
    if($(obj).data("tab") == "area"){
    	openDifferAreaMap();
    }
    
}


//종합분석 > 공간분석 > 맵 레이어
function openDifferAreaMap(){
    $(".differArea .mapArea").show();
    setAreaMpa();
}
function closeDifferAreaMap(){
    $(".differArea .mapArea").hide();
}
 


//좌측 컨텐츠 닫기
function closeLeft(leftContent,mode){
    // 설정 버튼 초기화
    $(".filter li.setting button").removeClass('active');
    $(leftContent).closest('.leftContent, .leftSub').hide();

    if(mode == "area"){
    	$('#loadDiv').hide();
    	resetAtearinfo(false);
    }
    
    // 기업 화면 동작 
    if(!$('body').hasClass('half')) {
    	if($(leftContent).closest('.leftContent').hasClass('rankResult')) {    		
    		tooltipControl[tooltipMap[$("#categoryTitleSpan").text()]]();
    	}
    } 
}

//팝업 닫기
function closePopup(popup){
    $(popup).closest('.popup').hide();
}

function closeResult(){
	$('#mainTabBtn').click();
    $(".layerOverlay").hide();
    $("#allResult").hide();
    $('#searchksic_1_cd').val(lastJobCode1);
    $('#searchksic_2_cd').val(lastJobCode2);
    $('#searchksic_1_nm').val(lastJobCodeNm1);
    $('#searchksic_2_nm').val(lastJobCodeNm2);
    resetYear();
}

//종합분석 팝업 열기
function showAllResult(flag){
    $(".layerOverlay").show();
    $("#allResult").show();
    $('#reportTitle').html(seleteTitle);

    // 초기 로딩시 초기화
    if(flag == undefined) {
    	    
    	let defalutYearText = $("#infoYearBtn").children().eq(0).children('label').text();
    	let defalutThemeText = $('#allResult .selectBox.icon.companyCount').children('.optionContainer').children('.option').eq(0).children('label').text()
    	let defalutThemeInput = $('#allResult .selectBox.icon.companyCount').children('.optionContainer').children('.option').eq(0).children('input')
    	let data = defalutThemeInput.val();
		let name = defalutThemeInput.attr('name');
		
        $('#searchYear').val(defalutYearText) // 연도 초기화
        $('#allResult .selectBox.icon.companyCount').children('.selected').children('.text').text(defalutThemeText) // 텍스트
		
		let searchInput = $('#searchFrom').find("input[name='"+name+"']");
		if(name=="custom"){
			$('#searchCustom').val(data);
			setTimeout(function() {
				getLinCartData();
			}, 50);
		}
		
    }
    
    
    
    if($('#searchksic_2_nm').val() == "") $('#searchksic_2_nm').val("전체업종");
    $('#popupJobTitle').html($('#searchksic_2_nm').val());
    mainYear = $('#searchYear').val();    
    
    if(flag != "resultMode"){
	    lastJobCode1 = $('#searchksic_1_cd').val();
	    lastJobCode2 = $('#searchksic_2_cd').val();
	    lastJobCodeNm1 = $('#searchksic_1_nm').val();
	    lastJobCodeNm2 = $('#searchksic_2_nm').val();
    }
    
    resetYear();
    setLastYear($('#searchYear').val());
    setChart('no');
    resetResultBtn(0);
}


function setBizCodeAction(){
	$('.bizCodeTitle').click(function(){
		$(this).find('i').toggleClass('active');
		$(this).siblings('ul').toggle();
	});	
	
	
	$('.bizCodeSelect2').click(function(){
		var data1 = $(this).find('.valueBiz1').val();
		var data2 = $(this).find('.valueBiz2').val();
		var name1 = $(this).find('.nameBiz1').val();
		var name2 = $(this).find('.nameBiz2').val();
		
		$('.bizCodeSelect2').find('i').removeClass('active');
		
		$(this).find('i').toggleClass('active');
		$('#searchFrom').find('input[name=kisc_cd_1]').val(data1);
		$('#searchFrom').find('input[name=kisc_cd_2]').val(data2);
		
		$('#searchksic_1_nm').val(name1);		
		$('#searchksic_2_nm').val(name2);

		gubunTrigger($('#resultJobCodeBtn'));
		
		$('#popupJobTitle').html(name1 +" > "+name2);
		showAllResult("resultMode");
	});
}


function isSbrEmpty(str){
	
	if(typeof str == "undefined" || str == null || str == "")
		return true;
	else
		return false ;
}

function resetYear(){
	$('#searchYear').val(mainYear);
	$('#resultTitle1').html(mainYear);
}

//좌측 컨텐츠 전체 닫기(초기화)
function closeLeftAll(){
    $(".leftContent").hide();
    $(".leftSub").hide();
    $("#signelDiv").hide();
    $('#areaPopupDiv').hide();
    $('#areaPopupDiv2').hide();
    
}

function clearFilterAll() {
	console.log("filter result");
}


function setNaviPopupArea(obj){

}






function getCash(str){
	
	if(str == "N/A") return str;
	
	if(str == null || str == 0) return 0;
	else if(!isNaN(str))return str.toLocaleString(navigator.language);
	else          return 0;
}

function resetSubMode(){
	$('#areaSearchBtn').removeClass('active');
	$('#companySearChBtn2').removeClass('active');
	$('#divAreaPopup').hide();	
	$('#companyPopup').hide();
	resetBizMode();
}
function setCompayMap(){
	
	// 기업 초기 화면으로 리턴.	
	location.href = '/view/sbrStats/sbrStatsMain';	
	return false;
	
	
	$('body').removeClass('half');
	
	if($sbrActiveMap.ui.mapList[1] != null ){
		var lMap = $sbrActiveMap.ui.mapList[0].gMap;
		var rMap = $sbrActiveMap.ui.mapList[1].gMap;
		lMap.unsync(rMap);
		rMap.unsync(lMap);
	}
	
	setleftBtn(1);
	setRightbtnMode(1);
	reSetMenuBtn();
	resetSubMode();
	closeLeftAll();
	
	$(".navRank").removeClass('mini');
	$(".navRank").addClass('mini');
	
	$('.mainTopMenu').show();
	$('.subTopMenu').hide();
	$('.mainTopMenuDiv').css("width","calc(100% - 80px)");
	$('.subTopMenuDiv').hide();
	
	
	$('#mapRgn_box').css("width","100%");
	$('#togetherMapDiv').hide();
	
	$('.dataWithView').hide();
	$('#mapRgn_box2').hide();
	
	$('.selectBox.icon.area').show();
	
	
	$sbrActiveMap.ui.mapList[0].setZoomMap(1);
	$sbrActiveMap.ui.mapList[0].update();
	$sbrActiveMap.ui.isTogether = false;
	//$sbrActiveMap.ui.mapList[1].remove();
	
	
	
	
	//$sbrActiveMapApi.event.mapUnSyncEvent();
	//rankViewMode();
	
	  $("#regionRankBtn").removeClass('active');
	  $(".navRank").removeClass('mini')
	
	  $("#regionRankBtn").addClass('active');
	  $(".navRank").addClass('mini')
	  $(".rankWrapper").show();
	  $("#tipDiv1").show();
	  
	  $sbrActiveMap.ui.mapList[0].gMap.dragging.enable();
	  
	  
}

// mxpd 2022.11.25 : bizname by code
// function getBizNameByCode(code1, code2) {

// }


function setTogetherMap(){
	$('body').addClass('half')
	reSetMenuBtn();
	setFlagF(true);
	setLastCode("9999");
	//카테고리 초기화
	$('#searchCategory').val("1");
	$("#categoryTitleSpan").html("지도로 생태분석");
	resetFrom();
	$(".sliderContainer").hide();
	$('#searchFrom').html(resetFomData1);
	sMap.map.mapCategory = 1;
	
	$sbrActiveMap.ui.isTogether = true;
	setFlagF(true);
	
	//동작리셋
	resetSubMode();
	
	
	//구역 초기화
	$('#searchArea').val(1);
	
	$('#searchSettingValue1').val("");
	$('#searchSettingValue2').val("");
	$('#searchSettingValue3').val("");
	
	$('.selectBox.icon.area').find('.selected ').find('.text').html("행정구역");
	$('.selectBox.icon.area').hide();
	$("#signelDiv").hide();
	closeLeftAll();
	setleftBtn(2);
	setRightbtnMode(3);
	
	
	var center = $sbrActiveMap.ui.mapList[0].center;
	
	$('#mapRgn_box2').show();
	
	$('.mainTopMenu').hide();
	$('.subTopMenu').show();
	$('.mainTopMenuDiv').css("width","calc(50% - 40px)");
	$('.subTopMenuDiv').show();
	
	
	$('#mapRgn_box').css("width","50%");
	$('#togetherMapDiv').show();
	
	
	
	$sbrActiveMap.ui.mapList[0].gMap.remove();
	$sbrActiveMap.ui.mapList[0] = null;
	$sbrActiveMap.ui.createMap("mapRgn_1", 0);
	$sbrActiveMap.ui.mapList[0].update();
	
	
	if($sbrActiveMap.ui.mapList[1] != null ){
		$sbrActiveMap.ui.mapList[1].gMap.remove();
		$sbrActiveMap.ui.mapList[1] = null;
	}
	
	$sbrActiveMap.ui.createMap("mapRgn_2", 1);
	
	$('.dataWithView').show();
	
	$(".navRank").removeClass('mini')
	$(".rankWrapper").hide();
	 
	//좌표 재설정
	$sbrActiveMap.ui.mapList[0].getMapPolygon();
	
	
	//moveMap
	//$sbrActiveMap.ui.mapList[1].moveMapCenter($sbrActiveMap.ui.mapList[0].center,1);
	
	var lMap = $sbrActiveMap.ui.mapList[0].gMap;
	var rMap = $sbrActiveMap.ui.mapList[1].gMap;
	lMap.sync(rMap);
	rMap.sync(lMap);

	//lMap.dragging.disable();
	//rMap.dragging.disable();
	
	
	$('.sop-bottom.sop-left').css('z-index', 80);
	$('.sop-bottom.sop-right').css('z-index', 80);
	
	//$sbrActiveMapApi.event.mapSyncEvent();
	
	$('.lgTypeList').parent('li').hide();
	//$('.legendPopEvent').parent('li').hide();
	
}

function  setleftBtn(number){
	$('#leftMainMenuBtnList').find("li").removeClass("active");
	
	$('#leftMainMenuBtnList').find("li").eq(number).addClass("active");
}


function showDataWithViewPopup(){
	

	
	var detailSearchTheme  = ["","기업이많은","개업이 많은","폐업이 많은","활동기업이 많은","비활동기업이 많은","생존율이 높은","영업기간이 높은","성장기업이 많은"];
	var detailSearchTheme2 = ["","전체 기업수","전체 개업수","전체 폐업수","전체 활동기업수","전체 비활동기업수","평균 생존율","평균 영업기간","평균 성장율"];
	var detailSearchTheme3 = ["","기업","개업","폐업","활동기업","비활동기업","생존율","영업기간","성장율"];

	
    $(".layerOverlay").show();
    $("#dataWithViewPopup").show();
    $('#loadDiv').show();
    //팝업 타이틀 변경
    
    var adminCode = $('#searchAdmCd').val();
    var mainTitle = "전국";
    if(adminCode != "00"){
    	var arearInfo = getReCode();
    	if(adminCode.length == 5 )mainTitle = arearInfo.result[0].sido_nm;
    	else if(adminCode.length == 7 || adminCode.lenght == 8 )mainTitle = arearInfo.result[0].sido_nm+" "+arearInfo.result[0].sgg_nm;
    }
    
    $('#mainToPopupTitle').html(mainTitle+" 데이터 함께보기");
    
    
    
    //detailSearchTheme;
    var theme = $('#searchTheme').val();
    var theme2 = $('#togetherSearchFrom').find("input[name=halfGubun]").val();
    
    $('#toPopupTitle2').html(detailSearchTheme[theme]);
    $('#toPopupTitle3').html(detailSearchTheme2[theme]);
    $('#toPopupTitle4').html(detailSearchTheme3[theme]);
    
    
    
    setTimeout(function() {
    	getToChartData();
	}, 50);
    
}
function hideDataWithViewPopup(){
	$(".layerOverlay").hide();
    $("#dataWithViewPopup").hide();
}





selectBoxChange = (obj) => {

    const group =  {
            "people":['year','sex','age'],
            "home":['year','homeGroup'],
            "house":['year','type','bulidYear','allAreaSize'],
            "other":['farmType','year2','sexType2','age']
        }

        let filterName = $(obj).data('filter')
        $("#rightSelectArea > li").not('.halfGubun').hide();

        group[filterName].forEach((item) => {
            $("#rightSelectArea > li").each((i, target) => {
                if(target.classList.contains(item))  $(target).show()
            })
        })

}

let checkFalg1 = false;
let checkFalg2 = false;
let checkFalg3 = false;
let checkFalg4 = false;
let checkFalg5 = false;

// 연령 선택 옵션 토글
toggleCustomOption = (param, type, obj) => {
	
    switch (type) {
        case "age" :
            if(param == 'hide') { // 선택하지 않음
                $('.selectBox.age .tab').removeClass('active');
                $('.selectBox.age ul.tabContent li').not('.btnWrap').hide()
                checkFalg1 = false;
                
            } else if (param == 'show') { // 연령선택
                $('.selectBox.age ul.tab').addClass('active');
                $('.selectBox.age ul.tabContent li:first-child').show();
                checkFalg1 = true;
                var menu = togetherMenu.get("ageSlider");
    			if(menu != null )menu.destroy();
                makeAgeSlider('ageSlider','ageSliderContent')
                
            }
            break;
        case "homeGroup" :
            if(param == 'hide'){
            	$(obj).closest('.selectBox').find('.tabContent li:first-child').hide();
            	checkFalg2 = false;
            }
             else if (param == 'show'){
            	 $(obj).closest('.selectBox').find('.tabContent li:first-child').show();
            	 checkFalg2 = true;
            }
            break;
        case "bulidYear" :
            if(param == 'hide'){
            	$(obj).closest('.selectBox').find('.tabContent li:first-child').hide();
            	checkFalg3 = false;
            }
             else if (param == 'show'){
            	 $(obj).closest('.selectBox').find('.tabContent li:first-child').show();
            	 checkFalg3 = true;
            }
            break;
        case "allAreaSize" :
            if(param == 'hide'){
                $(obj).closest('.selectBox').find('.tabContent li:first-child').hide();
            }
             else if (param == 'show'){
                $(obj).closest('.selectBox').find('.tabContent li:first-child').show();
                makeAgeSlider2('allAreaSizeSlider','allAreaSizeSliderContent')
             }
            break;
        case "houseGroup" :
            if(param == 'hide'){
                $(obj).closest('.selectBox').find('.tabContent li:first-child').hide();
                checkFalg5 = false;
            }else if (param == 'show'){
                $(obj).closest('.selectBox').find('.tabContent li:first-child').show();
                checkFalg5 = true;
            }
            break;
        default: 
            if(param == 'hide')          $(obj).closest('.selectBox').find('.tabContent li:first-child').hide();
             else if (param == 'show')    $(obj).closest('.selectBox').find('.tabContent li:first-child').show();
            break;
    }
    
    
    if(param == 'hide'){
    	//$('#togetherSearchFrom').find("input[name=age_from]").val("");
    	//$('#togetherSearchFrom').find("input[name=age_to]").val("");
    	checkFalg = false;
    }
}



// 연령 선택 탭 
selectAgeTab = (obj, param = "slider") => {
    let tabName = param
    $(".selectBox .tab li").removeClass('active');
    $(obj).addClass('active');
    
    selectYearType = param;
    
    //if(param == 'slider' ) makeAgeSlider('sliderSelect','sliderContent');

    $(obj).closest('.tab').siblings('.tabContent').children('li').each((i, item) => {
        $(item).hide();
        if($(item).data('content') == tabName) $(item).show();
        if($(item).hasClass('btnWrap')) $(item).show();
        //checkFalg
    })
}

// 슬라이더 생성
makeAgeSlider = (id,parent="") => {
    // 돔 있는지 확인

	let sliderInput = "";
	let setValue = ['10','90'];
	
    if($("#"+id).length < 1) { // 슬라이더 객체 생성
    	sliderInput = document.createElement('input');
        sliderInput.setAttribute('id',id)
        sliderInput.setAttribute('type','text');
        $("."+parent).append(sliderInput);
        
    }else{
    	sliderInput = $('#'+id);
    	//alert(sliderInput.val());
    	var values = sliderInput.val().split(",");
    	setValue = [];
    	setValue = [values[0],values[1]];
    	console.log(values);
    	console.log(setValue);
    	//setValue = [20,30];
    	
    }
    
    var slider =  new rSlider({
        target: '#'+ id,
        values: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90','100', "100+"],
        range: true,
        tooltip: true,
        scale: true,
        labels: false,
        set: setValue,
        onChange:(value)=> {
        	var age = value.split(",");
        	$('#minAge').val(age[0]);
        	if(age[1] == "100+") {
        		$('#maxAge').val("999");
        		$('#maxAge').hide();
        		$('#maxAgeSpan').hide();
        		
        	}else{
        		$('#maxAge').val(age[1]);
        		$('#maxAge').show();
        		$('#maxAgeSpan').show();
        	}
        	checkFalg = true;
        }
    });
    togetherMenu.set(id,slider);
    setAgeBtnAction();
}

function setAgeBtnAction(){
	
	//최소값 이벤트 초기화
	var events = $._data($('#minAge')[0], "events");
	var hasEvents = (events != null);
	if(hasEvents)$('#minAge').off("change");
	
	$('#minAge').change(function(){
		var minValue = $(this).val();
		var maxValue = $('#maxAge').val();
		var menu = togetherMenu.get("ageSlider");
		
		if(maxValue == 999)maxValue = "100+";
		if(Number(minValue) >=  Number(maxValue)){
			maxValue = minValue
			$('#maxAge').val(minValue);
		}
		
		menu.setValues(minValue,maxValue);
		
	});
	
	//최대값 이벤트 초기화
	var events2 = $._data($('#maxAge')[0], "events");
	var hasEvents2 = (events != null);
	if(hasEvents2)$('#maxAge').off("change");
	
	$('#maxAge').change(function(){
		var minValue = $('#minAge').val();
		var maxValue = $(this).val();
		var menu = togetherMenu.get("ageSlider");
		
		if(maxValue == 999)maxValue = "100+";
		if(Number(minValue) >=  Number(maxValue)){
			maxValue = minValue
			$('#maxAge').val(minValue);
		}
		
		menu.setValues(minValue,maxValue);
	});
}



//슬라이더 생성
makeAgeSlider2 = (id,parent="") => {
    // 돔 있는지 확인
    if($("#"+id).length < 1) { // 슬라이더 객체 생성

        let sliderInput = document.createElement('input');
        sliderInput.setAttribute('id',id)
        sliderInput.setAttribute('type','text');
        $("."+parent).append(sliderInput);

        var slider =  new rSlider({
				            target: '#'+ id,
				            values: ['0', '20', '40', '60', '85', '100', '130', '165', '230',"+"],
				            range: true,
				            tooltip: true,
				            scale: true,
				            labels: false,
				            set: ['0', '20'],
				            onChange:(value)=> {
				            	var area = value.split(",");
				            	
				            	
				            	$('#houseArea1').val(area[0]);
				            	
				            	if(area[1] == "+") {
				            		$('#houseArea2').val("300");
				            		$('#houseArea2').hide();
				            		$('#maxHouseAreaSpan').hide();
				            	}else{
				            		$('#houseArea2').val(area[1]);
				            		$('#houseArea2').show();
				            		$('#maxHouseAreaSpan').show();
				            	}
				            	setAreaSizeText(area[0],area[1]);
				            	checkFalg3 = true;
				            	
				            }
				        });
        
        togetherMenu.set(id,slider);
        setHouseAreaBtnAction();
    } 
}

function setHouseAreaBtnAction(){
	
	//최소값 이벤트 초기화
	var events = $._data($('#houseArea1')[0], "events");
	var hasEvents = (events != null);
	if(hasEvents)$('#houseArea1').off("change");
	
	$('#houseArea1').change(function(){
		var minValue = $(this).val();
		var maxValue = $('#houseArea2').val();
		var menu = togetherMenu.get("allAreaSizeSlider");
		
		if(maxValue == '300')maxValue = "+";
		if(Number(minValue) >=  Number(maxValue)){
			maxValue = minValue
			$('#maxAge').val(minValue);
		}
		
		menu.setValues(minValue,maxValue);
		
	});
	
	//최대값 이벤트 초기화
	var events2 = $._data($('#houseArea2')[0], "events");
	var hasEvents2 = (events != null);
	if(hasEvents2)$('#houseArea2').off("change");
	
	$('#houseArea2').change(function(){
		var minValue = $('#houseArea1').val();
		var maxValue = $(this).val();
		var menu = togetherMenu.get("allAreaSizeSlider");
		
		if(maxValue == '300')maxValue = "+";
		if(Number(minValue) >=  Number(maxValue)){
			maxValue = minValue
			$('#maxAge').val(minValue);
		}
		
		menu.setValues(minValue,maxValue);
	});
}



function closeCustomSelectBox(obj,type){
	
	if(obj ==1){	
		
		if(type == "close"){
			$('.optionContainerDiv').removeClass('active');
		}if(checkFalg1){
			console.log(selectYearType);
			if(selectYearType == slider ){
				$('#togetherSearchFrom').find("input[name=age_from]").val($('#minAge').val());
				$('#togetherSearchFrom').find("input[name=age_to]").val($('#maxAge').val());	
			}else{
				var data = $('input[name=ageList]:checked').val();
				data = data.split(',');
				$('#togetherSearchFrom').find("input[name=age_from]").val(data[0]);
				$('#togetherSearchFrom').find("input[name=age_to]").val(data[1]);
			}
		}else{
			$('#togetherSearchFrom').find("input[name=age_from]").val("");
			$('#togetherSearchFrom').find("input[name=age_to]").val("");
		}
		
		
		
	}else if(obj ==2) { 
		if(type == "close"){
			$('.optionContainerDiv').removeClass('active');
		}if(checkFalg2){
			var selectData = [];
			$("input[name=homeGroup]:checked").each(function(){
				selectData.push($(this).val());
			});
			$('#togetherSearchFrom').find("input[name=household_type]").val(selectData);
		}else{
			$('#togetherSearchFrom').find("input[name=household_type]").val("");
		}
	}else if(obj ==3) { 
		if(type == "close"){
			$('.optionContainerDiv').removeClass('active');
			/*var checkVal = $('#togetherSearchFrom').find("input[name=rd_const_year]").val();
			alert(checkVal);
			$("input[name=rdConstYears]").attr('checked', false);
			$("input[name=rdConstYears]").each(function(){
				if($(this).val() == checkVal){
					alert($(this).val());
					$(this).attr('checked', true);
				}
			});*/
			
		}if(checkFalg3){
			$('#togetherSearchFrom').find("input[name=rd_const_year]").val($("input[name=rdConstYears]:checked").val());
		}else{
			$('#togetherSearchFrom').find("input[name=rd_const_year]").val("");
		}
	}else if(obj ==4) { 
		if(type == "close"){
			$('.optionContainerDiv').removeClass('active');
		}if(checkFalg3){
			
			$('#togetherSearchFrom').find("input[name=rd_const_year]").val($("input[name=rdConstYears]:checked").val());
		}else{
			$('#togetherSearchFrom').find("input[name=rd_const_year]").val("");
		}
	}else if(obj == 5) { 
		if(type == "close"){
			$('.optionContainerDiv').removeClass('active');
		}if(checkFalg5){
			var selectData = [];
			$("input[name=houseGroup]:checked").each(function(){
				selectData.push($(this).val());
			});
			$('#togetherSearchFrom').find("input[name=house_type]").val(selectData);
		}else{
			$('#togetherSearchFrom').find("input[name=house_type]").val("");
		}
	}
	
	
	if(!checkFormData2()){
		resetAtearinfo(true);
		setLastCode("99999999");
		setFlagF(true);
		$sbrActiveMap.ui.mapList[1].getMapPolygon();
	}
	
	
	$('.optionContainerDiv').removeClass('active');
	
}



//지역분석 기업규모별 매출액
rankStatusTab = (obj) => {
    $(obj).parent('.tab').children('div').removeClass('active');
    $(obj).addClass('active')
    const tabName = $(obj).data('tab');
    $(obj).closest('ul').children('.tabContent').each((index, item) => {
        $(item).hide();
        if(tabName == $(item).data('content')) $(item).show();
    })
    
    if(tabName == "company")leftCompanyChart(1);
    else if(tabName == "cost")leftCompanyChart(2);
    else if(tabName == "people")leftCompanyChart(3);
    else if(tabName == "ceo")leftCartDataCompanyPeople(1);
    else if(tabName == "worker")leftCartDataCompanyPeople(2);
    
    
}


function show_helpSub(){
	$(".leftSub.helpIndicator").show();
	$('.leftSub.sbrHelp').hide();
	$('.leftSub.withHelp').hide();
}

function show_sbrHelp () {
	$(".leftSub.helpIndicator").hide();
	$('.leftSub.sbrHelp').show();
	$('.leftSub.withHelp').hide();
}
function show_withHelp () {
	$(".leftSub.helpIndicator").hide();
	$('.leftSub.sbrHelp').hide();
	$('.leftSub.withHelp').show();
}

function close_helpSub(obj) {
    $(obj).closest('.helpSub').hide();
}

function setaaa(){
	//sliderContainer
}

function resetFrom(){
	
	$('#searchTitle1').html("2020");	
	$('#searchTitle2').html("행정구역");
	// $('#searchTitle3').html("표준산업분류(10차)");
	$('#searchTitle3').html("전체업종");
	$('#searchTitle4').html("기업이 많은");
	$('#gadgeText').html("기업이많은");
	
	$('#searchksic_1_cd').val("0");
	$('#searchksic_2_cd').val("00");
	
	$('#searchSettingValue1').val("");
	$('#searchSettingValue2').val("");
	$('#searchSettingValue3').val("");
	
	$('.bizCodeBody').find('.radio').each(function(){
		$(this).removeClass("active");
	});
	
	$('.bizCodeBody').find('.child').each(function(){
		$(this).hide();
	});
	
	$('.bizCodeBody').find('i.accTarget').each(function(){
		$(this).removeClass("active");
		$(this).addClass("active");
	});
	
	
	
}


function perNumberSet(data){
	
	if(data == "N/A") return data;
	
	data = data+"";
	
	if(data.indexOf('.')<0){
		return data+".00";
	}
	
	var number = data.split('.');
	
	var number1 = number[0];
	var number2 = number[1];
	
	number2 = number2+"00";
	number2 = number2.substring(0,2);

	return number1+"."+number2;
}

function printHtml(){
	
	var radioV 	= "01"; // 01 : 현재 화면 크기 , 02 : 사용자 지정
	var x 		= 0; // html2canvas의 x
	var y 		= 0 ;// html2canvas의 y
	var target  = $("#printDiv"); // 지도 객체
	var offSet = target.offset();
	
	var org_w 	= target.innerWidth(); 		// 지도의 화면 크기
	var org_h 	= target.innerHeight(); 	// 지도의 화면 크기

	if(radioV == '01'){
		//width 	= $(window).width();
		//height 	= $(window).height();
		width 	= 1200;
		height 	= 800;
	}
	
	
	var option = {
		x : offSet.left 	,
		y : offSet.top	,
		width : parseInt(width),
		height : parseInt(height),
        proxy: "/statexp/ServiceAPI/statsExpMap/html2canvasproxy.jsonp" 	
	};
	

	html2canvas(target[0], option).then(function(canvas) {
		downloadURI(canvas , "" , width , height);
		canvas  = null;
		target  = null;
		option = null;
		return false;
	});
}



function downloadURI(canvas , type , width , height) {
	var link = document.createElement("a");
	var tapName = "업종분석";
	
	if(selectTap =="kind"){
		tapName = "업종분석";
	}else if(selectTap =="company"){
		tapName = "기업분석";
	}else if(selectTap =="area"){
		tapName = "공간분석";
	}
	
	
    link.download = seleteTitle+" "+tapName+".png";
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
	
}

function resetAtearinfo(flag){
	setArearMode($sbrActiveMap.ui.mapList[0],false);
	if(!flag)$sbrActiveMap.ui.mapList[0].getMapPolygon();
	$sbrActiveMap.ui.adminCdList = null;
	$sbrActiveMap.ui.adminCdList = [];
	resetToast();
	//rankViewMode();
}

function resetToast(){
	if ($("#toast1").css('display') === 'block' ){
		$("#toast1").slideToggle(300);
	}else if($("#toast2").css('display') === 'block'){
		$("#toast2").slideToggle(300);
	}else if($("#toast3").css('display') === 'block'){
		$("#toast3").slideToggle(300);
	}else if($("#toast4").css('display') === 'block'){
		$("#toast4").slideToggle(300);
	}
}

function clsoseRank(){
	if($('.rankWrapper.expand.isScroll').css('display') === 'block')rankViewMode();
}

function gubunTrigger(obj){
	 resetResultBtn(1);
	 $(obj).parent('.gubun').toggleClass('active');
	 $(obj).siblings('.optionContainer').toggle();
	 
	 
}

function resetResultBtn(type){
	
	 if(type != 1 && $('#resultJobListBtn').hasClass('active')){
		 $('#resultJobListBtn').removeClass('active');
		 $('#resultJobCodeBtn').siblings('.optionContainer').hide();
	 }
	
	 if(type != 2 && $('#infoYearBtn').hasClass('active')){
		 $('#infoYearBtn').removeClass('active');
		 $('#infoYearBtn').siblings('.selected').removeClass('active');
	 }
	 
	 if(type != 3 && $('#customBtnDiv').find('.optionContainer').hasClass('active')){
		 $('#customBtnDiv').find('.optionContainer').removeClass('active');
		 $('#customBtnDiv').find('.selected').removeClass('active');
	 }
	 
	 
}


function infoYearClick(){
	//$('#resultJobListBtn').removeClass('active');
	//$('#resultJobListBtn').find('.optionContainer').hide();
	
	resetResultBtn(2);
	
}

function resetBizMode(){
	$('#companySearChBtn2').removeClass('active');
	$('#companyPopup1').hide();
	$sbrActiveMap.ui.mapList[0].gMap.setMinZoom(1);
	setBizSelectMode(false);
	$sbrActiveMap.ui.mapList[0].removeMarker();
}

function mapNoticeOpen () {
	$("#notice_mini_pop, .layerOverlay").show()
} 

function mapNoticeClose () {
	$("#notice_mini_pop, .layerOverlay").hide()
}


let tooltipMap = {
		"지도로 생태분석" : "MAP_STATUS_ANALYSIS",
		"조건별 지역찾기" : "FIND_REGION_CONDITION",
		"행정구역" : "CHANGE_BOUNDARY",
		"산업단지" : "CHANGE_BOUNDARY",
		"상권" : "CHANGE_BOUNDARY",
		"전통시장" : "CHANGE_BOUNDARY",
		"도시화" : "CHANGE_BOUNDARY",
		"시군구" : "CHANGE_BOUNDARY"
}

let tooltipControl = {
	MAP_STATUS_ANALYSIS() {
		$("#tipDiv2").hide();
		$("#tipDiv1").show();
	},
	FIND_REGION_CONDITION() {
		$("#tipDiv1").hide();
		$("#tipDiv2").show();
	},
	CHANGE_BOUNDARY() {		
		let categoryStatus = $("#categoryTitleSpan").text();
		this[tooltipMap[categoryStatus]]();
	}
}

