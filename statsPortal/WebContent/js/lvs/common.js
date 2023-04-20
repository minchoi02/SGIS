const dummyData1 = [
    {"gubun":"인구가구","title":"총 인구","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,541323,451231]},
    {"gubun":"인구가구","title":"남자인구","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,654321,456123]},
    {"gubun":"인구가구","title":"여자인구","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,456123,546123]},
    {"gubun":"인구가구","title":"가구","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,554123,546123]},
    {"gubun":"인구가구","title":"1인 가구 변화","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,321654,521365]},
    {"gubun":"인구가구","title":"65세 이상 1인 가구 변화","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,412563,541236]},
    {"gubun":"인구가구","title":"15세 미만 유소년 인구 변화","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,412563,632541]},
    {"gubun":"인구가구","title":"65세 이상 고령자 인구 변화","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,341256,521463]}
];

const dummyData2 = [
    {"gubun":"주거교통","title":"주택(호)","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구"],"chartData":[456789,451263]},
    {"gubun":"주거교통","title":"단독주택","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구"],"chartData":[456789,521463]},
    {"gubun":"주거교통","title":"아파트현황","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구"],"chartData":[456789,632541]},
    {"gubun":"주거교통","title":"1인당 자동차 등록대수","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구"],"chartData":[456789,325416]}
];

const dummyData3 = [
    {"gubun":"복지문화","title":"보육업체 현황","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,521463,632541]},
    {"gubun":"복지문화","title":"보건시설 1개당 65세 이상 노인","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,412563,325416]},
    {"gubun":"복지문화","title":"교원 1인당 학생수","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,632541,632541]},
    {"gubun":"복지문화","title":"어린이집 분포 현황","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,521463,325416]}
];

const dummyData4 = [
    {"gubun":"노동경제","title":"사업체수","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구"],"chartData":[456789,412563]},
    {"gubun":"노동경제","title":"종사자수","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구"],"chartData":[456789,254163]},
    {"gubun":"노동경제","title":"고용율","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구"],"chartData":[456789,325416]},
    {"gubun":"노동경제","title":"재정자립도 현황","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구"],"chartData":[456789,521463]}
];

const dummyData5 = [
    {"gubun":"안전환경","title":"보행자 교통사고 발생 현황","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,456789,456789]},
    {"gubun":"안전환경","title":"무더위 쉼터 현황","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,456789,456789]},
    {"gubun":"안전환경","title":"도시공원 분포 현황","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,456789,456789]}
];


const watcher = (variable, callback) => new Proxy (variable, {
    set: (obj, prop, value ) => {
        obj[prop] = value;
        // event 중지 처리
        
        callback(obj)
    },
    get: (obj, prop) => {        
        return obj[prop]
    }
})

let boardState = {board: "", theme: "", tabs: ""};
let tabState = {tabName: "", tabLink: ""}
let boardWatcher = watcher(boardState, state => console.log(state))
let tabWatcher = watcher(tabState, state => console.log(state))



$(function () {

    //startSliderItemSync(sliderData[0], 'sliderContent0');
    

})




function exboardType2Sync(theme,target="") {
    let data = getThemeData(theme);
    let ids =  exboardType2Html(data);
    let activeTarget = "" // 데이터보드 추천지표 첫번째 선택 아이템 
    
    ids.forEach((i,index) => {
        fn_layerColumnType2(ids[index],data[index]); // 차트 생성
    })

    // 슬라이더
    if(data.length > 4) {
        exboardType2Slider();
        activeTarget = $('#tabType2Content').find('.slick-active').find('.rcmdItem').eq(0)
    } else {
        activeTarget = $('#tabType2Content').find('.rcmdItem').eq(0)
    }

    // // 변화그래프 기본 show
    $("#tab4_1").show();

    // 탭별 차트 렌더러
    rcmdItemSelector(activeTarget);
}

function getThemeData (theme) {
        // ajax로 변경 
        let dataGroup = {"인구가구":dummyData1,"주거교통":dummyData2,"복지문화":dummyData3,"노동경제":dummyData4,"안전환경":dummyData5};
        let name = "";

        if(theme == "tab1") name = "인구가구";
        else if(theme == "tab2") name = "주거교통";
        else if(theme == "tab3") name = "복지문화";
        else if(theme == "tab4") name = "노동경제";
        else if(theme == "tab5") name = "안전환경";
        
        return dataGroup[name] ;
}

/*
* 데이터보드 테마별 주요지표 html 생성
* @param {json} data 
* @return 차트 아이디 array
*/

function exboardType2Html(data) {
       let chartIds = [];
       $("#tabType2Content").empty();
       
       data.forEach((item, index) => {
           let html = "";

           html += '<div class="content rcmdItem" onclick="rcmdItemSelector(this)">'; // 아이템 이벤트 클릭 
           html += '<div class="head">'
           html += '<h5>'+item.title+'</h5>';
           html += '<img src="image/icon/icon-tooltip.png" alt="">';
           html += '</div>'
           html += '<p>'+numberFormat(item.totalCount)+'</p>';
           html += '<ul class="chart_box">';
           html += '<li><img class="family_base" src="image/icon/icon-img01.png" alt=""></li>';
           html += '<li class="chart">';
           html += '<div id="type2ChartId'+index+'" style="width:120px; height:70px"></div>';
           html += '</li>';
           html += '</ul>';
           html += '<div class="base_year">';
           html += '<span>기준 '+item.baseYear+'</span>';
           html += '<span>(단위:'+item.unit+')</span>';
           html += '</div>';
           html += '</div>';

           
           $("#tabType2Content").append(html);
           chartIds.push("type2ChartId"+index);
       }) ; 

      return  chartIds ;
}



function boardClassController(obj,type) {

    removeType1Class = () => { $('#btn_extend').removeClass('active')}
    removeType2Class = () => { $('#tabIndicator li').removeClass('active')}
    removeType3Class = () => { $('#tabIndicatorSub li').removeClass('active')}
    
    // 클래스 Toggle
    switch(type) {
        case "type1":  
            $(obj).addClass('active')
            removeType2Class();
            removeType3Class()
            $('.tab_container').hide();
            break;
        case "type2":
            removeType1Class();
            removeType2Class();
            removeType3Class();
            $(obj).addClass('active');
            $('#tabIndicatorSub li:first-child').addClass('active')
            $('.tab_container').show();
            break;
        case "type3":
            removeType3Class();
            $(obj).closest('li').addClass('active');
            break;
        default:
            break;
    }
}

// 보드 확대, 축소
function toggleBoard(){
    let boardSts = $("#extendBoard").hasClass('active');
    $("#extendBoard").toggleClass('active');
    
    
    $(".control_foot").toggleClass('extend'); 
    
    
    setTimeout(function() {
    	$('.slick_slider').slick('refresh')     
    },500)
    
    setTimeout(function() {
    	$('#tabType2Content').slick('refresh')     
    },500)
    
   
      
    // board status 

    // 확대, 축소일 때 처리해야할 것들
     if(boardSts) {   //큰창
         $("#extend_data_03").css("display","none");
         $("#extend_data_03_small").css("display","block");    	 
     } else {
         $("#extend_data_03").css("display","block");
         $("#extend_data_03_small").css("display","none");    	 
     }
}


// 넘버 포멧
function numberFormat(x){
    if (!x) return 0;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// 임시 랜덤 호출
function makeRandomData(min,max) {
    return Math.floor((Math.random() * (max - min)) + min)
}


/**
 * 팝업 호출 함수
 * @param {string} type 팝업 타입, 클래스에 같이 사용, type1:메인화면 이동 팝업 ,type2: 소지역보기 팝업
 * @param {*} param 지역명 + 선택된 지표의 파라미터 전달
 */
function openPopup(type, param) {
    if(type == 'type1') { // 메인페이지 이동
      $(".popup_layer.type1").show();
    }else  if(type == "type2") {  // 소지역 보기 팝업


        let mapStatus = true // 맵 상태가 소지역일때 false, 소지역 이상일때 true 

        if(!mapStatus) { 
            $(".popup_layer.failed").show()
            return false;
        }

        $(".popup_layer.type2.success").show() // 소지역 보기 팝업 오픈 
        
        // chart render 
        let title = "임시타이틀"
        let dummyData = {"title":title,"category":[],"data":[]} // 변화그래프 탭 차트
        let count = makeRandomData(5,12);
        for(i=0; i<count; i++){
            dummyData.category.push(2010+i);
            dummyData.data.push(makeRandomData(100,500))
        }

        combiLineColumn('popupChart1',dummyData);
    }
}


function accordian(obj){
    $(obj).toggleClass('active')
    $(obj).siblings('.accContent').slideToggle(300)

}

// 모든지표보기 인구가구, 주거교통 옵션박스 셀렉터
function viewAllIndicator(param){
    $(".resultAcc").hide();
    $(".resultAcc").each((i,item) => {
        if($(item).data('link') == param) $(item).show();
    })

}

// 모든지표보기 이너 탭
function themeInnerTab(param){
    $(".tabBox").hide();
    $(".tabBox").each((i,item) => {        
        if(param == $(item).data('tabname')) $(item).show();
    })

    if(param == "theme1AgeRanger") {
        ageRangeSlider.destroy();
        ageRangeSlider.init();
    }

    
}




const ageRangeSlider = new rSlider({
    target: '#ageRangeSlider',
    values: [0, 20, 40, 60, 80, 100],
    range: true,
    tooltip: true,
    scale: true,
    labels: true,
    set: [20, 60]
});


const theme2SizeSlider = new rSlider({
    target: '#theme2SizeSlider',
    values: [0, 20, 40, 60, 85, 100, 130, 165, 230],
    range: true,
    tooltip: true,
    scale: true,
    labels: true,
    set: [20, 100]
});


/**
 * 
 */
const hint = document.querySelectorAll('.tooltip') ;
hint.forEach((hintTarget, index) => {
    hintTarget.addEventListener('mouseover',(e) => {
        
        let divX = e.pageX + 20
        let divY = e.pageY 
        let title = $(e.target).data('title');
        let desc = $(e.target).data('desc');
        let level = $(e.target).data('level');
        let year = $(e.target).data('year');

        setTimeout(() => {
            $("#tipLayer").children('.title').text(title)
            $("#tipLayer").children('.desc').text(desc)
            $("#tipLayer").children('.level').text(level)
            $("#tipLayer").children('.year').text(year)
            $("#tipLayer").css({'display':'block',
                                'left':divX,
                                'top':divY,
                                'position':'absolute'})
        }, 500)
    })

    hintTarget.addEventListener('mouseout',(e) => {
        
        $("#tipLayer").children('.title').text("");
        $("#tipLayer").children('.desc').text("");
        $("#tipLayer").children('.level').text("");
        $("#tipLayer").children('.year').text("");
        $("#tipLayer").css('display',"none")
    })

    
})