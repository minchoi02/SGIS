
const watcher = (variable, callback) => new Proxy (variable, {
    set: (obj, prop, value ) => {
        obj[prop] = value;
        obj['parent'] = '';
        

        // 인구가구, 주거교통 서브 탭 
        if(value == "type2" || value == "type3") {
            obj['parent'] = value
        }


        callback(obj)
    },
    get: (obj, prop) => {        
        return obj[prop]
    }
})

let boardState = {boardSts: "",name:"", theme: "", tabs: ""};
let tabState = {tabType: ""}
let boardWatcher = watcher(boardState, state => {
    // console.log("state",state)
    boardViewer()
})
let tabWatcher = watcher(tabState, state => {
    console.log(tabState, state)
    tabViewer(menuConfig[state.tabType], tabState.parent)
})


const menuConfig = {
    "type1": {
        "depth":1,
        "name":"우리동네상황판",
        "subTitle":"",
        "tabId":"tabType1",        
        "exboard":"exboard1"
    },
    "type2": {
        "depth":1,
        "name":"테마별지표",
        "subTitle":"인구가구",
        "tabId":"tabType2",                
        "param":""
    },
    "type3": {
        "depth":1,
        "name":"테마별지표",
        "subTitle":"주거교통",
        "tabId":"tabType3",
        "param":""
    },
    "type4": {
        "depth":1,
        "name":"테마별지표",
        "subTitle":"복지문화",
        "tabId":"tabType4",
        "param":""
    },
    "type5": {
        "depth":1,
        "name":"테마별지표",
        "subTitle":"노동경제",
        "tabId":"tabType5",
        "param":""
    },
    "type6": {
        "depth":1,
        "name":"테마별지표",
        "subTitle":"안전환경",
        "tabId":"tabType6",
        "param":""
    },
    "type7": {
        "depth":2,
        "name":"추천지표보기",
        "tabId":"tabType7",
        "contentId":"",
        "param":""
    },
    "type8": {
        "depth":2,
        "name":"모든지표보기",
        "tabId":"tabType8",
        "contentId":"",
        "param":""
    }
    


}
let theme = "";
const tabViewer = (object, parent) => {
    
    // boardtype 
    // boardname
    // boardtheme
    // boardtabs
    console.log("parent",parent)

    boardState.theme = object.theme
    // console.log("object.subTitle",object.subTitle)
    if(object.subTitle != undefined) boardState.theme = object.subTitle
    console.log("boardState.theme",boardState.theme)
    {
        boardState.boardSts = "",
        boardState.name = object.name,
        boardState.tabs = ""
    }

    // depth레벨 클래스 리무브
    if(object.depth == 1)  $('.depth1').removeClass('active');
    else                    $('.depth2').removeClass('active');
    
    $("#"+object.tabId).addClass('active'); 

    // 테마별 지표 일때 하위 지표 표시
    if(object.name == "테마별지표" || object.depth == 2) $("#tabIndicatorSub").show();
    else                            $("#tabIndicatorSub").hide();

    // 테마별 지표일때 추천지표 클래스 추가 
    if(object.name == "테마별지표") {
        $("#tabType7, #tabType8").removeClass('active');
        $("#tabType7").addClass('active')
    }
    
    if(object.depth == 2) {
        $("#tabType7, #tabType8").removeClass('active');
        $("#"+object.tabId).addClass('active')
        // $("#sub2").show()

       
        
    }

    if(object.name == "모든지표보기") {
        let themeId = "";
        // depth2 일때 theme active 를 가져와야한다.
        // $("#tabIndicator li").each((i,item) => {
        //     if($(item).hasClass('active')) themeId = $(item).attr('id')
        // })
        
        
        // if(themeId = "type2") {
        //     $("#sub").children('div:nth-child(1)').show();
        // } else if (themeId = "type3") {

        // }

        console.log(boardState)
    }

    

    // 모든지표보기, 추천지표 일때 선택된 테마 값 가져오기

    // get / set 변동이 일어날 때 마다 감지해야한다.?
    

    // 이벤트별
    // - 지도 맵 클릭, 네비게이션 맵 클릭, 지역변경 버튼 클릭
    // - 데이터보드의 아이템 클릭
    // - 우리동네 상황판, 테마별, 모든지표보기 항목 클릭 

    // 보드상태(확장, 축소), 지역위치, 데이터 항목, 데이터보드 타입, 지도 위치

    // 블럭 쌓기 모습?

    // class : 전역변수에 설정된 값을 불러온다.
    // concreteClass : 기능에 대한 인터페이스? -> 전역변수 구분값 분리, 데이터 로드, 차트, 슬라이더
    // decorate : 공통(데이터 불러오기 or 가져오기) 
    // concreateDecorator : 차트 그리기, 슬라이더, 

    // 보드 객체 생성
    // 이벤트 발생 트리커
    // 전역변수 검사 이후 종류 파악 -> 데이터 불러오기
    // 이벤트 이후에 
    // -> 내용 부분을 지우고 다시 그린다. (이벤트 요소마다 데이터를 불러오는 부분부터 실행한다.?)  board/innerHtml 
    // 



    

    // 보드 셋팅 이후 
    // boardWatcher
    // board: '', theme: '', tabs: ''
    // boardWatcher(object[object])

    // boardtype 1 / boardtype 2 / boardtype3 
    // 
    
}
const boardViewer = () => {
    console.log(boardState)
}


// 더미 데이터
// id 차트 생성 아이디 html 만들때 + index 로 식별
// type : 차트 타입 -> 차트 생성 때 매칭 dount, line, column, map, pie
const sliderData = [
    [{ "id": "ar1_", "type": "donut", "title": "총인구", "unit": "(단위:명)", "lastYearData": 471258, "nowYearData": 469426, "lastYearName": "2021년", "nowYearName": "2022년", "graphDataName1": "남자", "graphDataName2": "여자", "graphData1": 230978, "graphData2": 205875 },
    { "id": "ar1_", "type": "line", "title": "사망자수", "unit": "(단위:명)", "category": [2018, 2019, 2020, 2021, 2022], "dataName": "사망자수", "dataCount": [456, 789, 999, 555, 666], "lastYearData": 471258, "nowYearData": 469426, "lastYearName": "2021년", "nowYearName": "2022년" },
    { "id": "ar1_", "type": "column", "title": "1인가구", "unit": "(단위:명)", "category": [2018, 2019, 2020, 2021, 2022], "dataName": "1인가구", "dataCount": [123, 456, 789, 999, 1023], "lastYearData": 471258, "nowYearData": 469426, "lastYearName": "2021년", "nowYearName": "2022년" },
    { "id": "ar1_", "type": "map", "title": "사업체 수", "unit": "(단위:개)", "lastYearData": 425775, "nowYearData": 413547, "lastYearName": "2021년", "nowYearName": "2022년", "dataSeries": [{ "name": "A", "value": 10, "colorValue": 1 }, { "name": "A", "value": 20, "colorValue": 2 }, { "name": "A", "value": 30, "colorValue": 3 }, { "name": "A", "value": 40, "colorValue": 4 }] },
    { "id": "ar1_", "type": "pie", "title": "신혼부부 수", "unit": "(단위:명)", "lastYearData": 471258, "nowYearData": 469426, "lastYearName": "2021년", "nowYearName": "2022년", "graphDataName1": "2021년", "graphDataName2": "2022년", "graphData1": 230978, "graphData2": 205875 },
    { "id": "ar1_", "type": "donut", "title": "총인구", "unit": "(단위:명)", "lastYearData": 425775, "nowYearData": 413547, "lastYearName": "2021년", "nowYearName": "2022년", "graphDataName1": "남자", "graphDataName2": "여자", "graphData1": 267785, "graphData2": 244755 }
    ],
    [{ "id": "idName", "type": "donut", "title": "총인구", "unit": "(단위:명)", "lastYearData": 112548, "nowYearData": 365123, "lastYearName": "2021년", "nowYearName": "2022년", "graphDataName1": "남자", "graphDataName2": "여자", "graphData1": 456123, "graphData2": 123456 },
    { "id": "idName", "type": "donut", "title": "page2", "unit": "(단위:명)", "lastYearData": 132544, "nowYearData": 398751, "lastYearName": "2021년", "nowYearName": "2022년", "graphDataName1": "남자", "graphDataName2": "여자", "graphData1": 654321, "graphData2": 321456 },
    { "id": "idName", "type": "donut", "title": "page2", "unit": "(단위:명)", "lastYearData": 124456, "nowYearData": 361231, "lastYearName": "2021년", "nowYearName": "2022년", "graphDataName1": "남자", "graphDataName2": "여자", "graphData1": 654321, "graphData2": 987654 },
    { "id": "idName", "type": "donut", "title": "page2", "unit": "(단위:명)", "lastYearData": 123654, "nowYearData": 135875, "lastYearName": "2021년", "nowYearName": "2022년", "graphDataName1": "남자", "graphDataName2": "여자", "graphData1": 654123, "graphData2": 789456 },
    { "id": "idName", "type": "donut", "title": "page2", "unit": "(단위:명)", "lastYearData": 187995, "nowYearData": 675654, "lastYearName": "2021년", "nowYearName": "2022년", "graphDataName1": "남자", "graphDataName2": "여자", "graphData1": 654654, "graphData2": 654321 },
    { "id": "idName", "type": "donut", "title": "page2", "unit": "(단위:명)", "lastYearData": 135485, "nowYearData": 136871, "lastYearName": "2021년", "nowYearName": "2022년", "graphDataName1": "남자", "graphDataName2": "여자", "graphData1": 654321, "graphData2": 123456 }
    ]]


// 데이터보드 상태값 가져오기
// let boardState

$(function () {

    startSliderItemSync(sliderData[0], 'sliderContent0');
    
    // 팝업 레이어 닫기
    $(".layer_close").on('click', (e) => {
        $(e.target).closest('.popup_layer').hide();
    })

    // $(".tabCommon li a").click(function () {
    //     let activeTab = $(this).attr("rel");
    //     let tabName = $(this).data('tabname')
    //     $(this).parent().siblings("li").removeClass("active");
    //     $(this).parent().addClass("active"); 
        
    //     if(tabName == "tab2")  $(".tab_container2").children('.tab_content2').hide();  // 우리동네 상황판 차트, 테이블
    //     else if (tabName == "tab3") $(this).closest('.tab_container').siblings('.tab_content3').hide(); // 추천지표보기, 모든지표 보기
    //     else if (tabName == "tab4") $(this).closest('.tab_container4').children('.tab4').hide(); // 추천지표 (변화그래프, 지역내 순위, 변화지도, 타 지자체 비교)
    //     else if (tabName == "tab5") $(this).closest('.tab_container5').children('.tab_content5').hide(); // 소지역보기 팝업 (집계구보기, 변화지도, 변화그래프)
    //     else if (tabName == "tab6") $(this).closest('.result_box').children('.step_box').hide();
    //     else if (tabName == "tab8" || tabName == "tab9") $(this).closest('.tabCommon').siblings('.tabContent').children('li').hide();
        
    //     if(!activeTab) {
    //         activeTab = $(this).data('tab')
    //         $(this).closest('.tabCommon').siblings('.tabContent').children('li').each((i,item) => {
    //             $(item).removeClass('active')
    //             $(item).hide()
    //             if(activeTab == $(item).data('link')) {
    //                 $(item).show();
    //                 $(item).addClass('active')
    //             }
    //         })
    //     } else {
    //         $("#" + activeTab).fadeIn(10);
    //     }
        
        
        
    //     if(activeTab == "tab4_1")  $('#tab4_chart1').highcharts().reflow() // 추천지표 변화그래프
    //     else if(activeTab == "tab4_3") $('#tab4_chart3').highcharts().reflow()  // 추천지표 지역내 순위
    //     else if(activeTab == "tab4_4") {                                         // 추천지표 타 지자체 비교
    //         $('#vrsChart1').highcharts().reflow()
    //         $('#vrsChart2').highcharts().reflow()
    //     } else if (activeTab == "tab5_3") $("#popupChart1").highcharts().reflow() // 소지역보기 변화그래프

    // });

    // 

    

})


/**
 * 데이터 확장보드 컨트롤러
 * @param {Element} obj this 
 * @param {string} type type1: 우리동네 상황판, type2: 테마별 추천지표, type3: 테마별 모든지표
 * @param {string} target 하위 지표 선택 파라미터 
 */
const boardController = (obj, type,target="") => {

    let boardTitle = "데이터보드";
    let sub = $(obj).data('link') // sub1 추천지표, sub2 모든지표 보기
    

    $(".extendBoard").hide(); 
    
    
    // 추천지표 테마 가져오기
    if(!target) {
        $("#tabIndicator").children('li').each((i, item) => {
            if($(item).hasClass('active')) target = $(item).data('link')
        })
    }


    if(type == 'type1') { 

        boardTitle = "우리동네 상황판";
        $(".extend_data_01").show();
        $(".data_player").show();
        $(".tab_content3").hide();
        startSliderItemSync(sliderData[0], 'sliderContent0');

    } else if (type == "type2") {

        // 테마별 지표 
        $(".extend_data_02").show();
        $(".data_player").hide(); 
        $(".tab_content3").hide();
        exboardType2Sync(target);
        
    } else if (type == "type3" && sub == "sub1") {

        // 추천지표 
        $(".extend_data_02").show();
        $(".data_player").hide(); 
        $(".tab_content3").hide();
        exboardType2Sync(target);

    } else if (type == "type3" && sub == "sub2") {

        // 모든지표 
        viewAllIndicator(target); // 인구가구, 주거교통 옵션값 보여주기

        $(".extend_data_03").show(); 
        $(".data_player").hide();

        if(target == "tab1") {  // 인구가구 모든지표
            ageRangeSlider.destroy();
            ageRangeSlider.init();
        } else if (target == "tab2"){ // 주거교통 모든지표
            setTimeout(() => {
                theme2SizeSlider.destroy();
                theme2SizeSlider.init();
            },1000)
        }
        
        // 
        $(".checkbox_listWrap .checkbox_list:first-child .list_text input").prop('checked',true)
        // allIndicatorSelector(type)
        excuteIndicator('aType')
    }


    $("#exBoardTitle").text(boardTitle);
    boardClassController(obj,type);


}


const boardClassController = (obj,type) => {

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
const toggleBoard = () => {

    let boardSts = $("#extendBoard").hasClass('active');
    $("#extendBoard").toggleClass('active');
    $(".control_foot").toggleClass('extend');
    $('.slick_slider').slick('refresh')  // slider refresh

    // board status 

    // 확대, 축소일 때 처리해야할 것들
    // if(boardSts) {

    // }
}


// 넘버 포멧
const numberFormat = (x) => {
    if (!x) return 0;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// 임시 랜덤 호출
const makeRandomData = (min,max) => {
    return Math.floor((Math.random() * (max - min)) + min)
}


/**
 * 팝업 호출 함수
 * @param {string} type 팝업 타입, 클래스에 같이 사용, type1:메인화면 이동 팝업 ,type2: 소지역보기 팝업
 * @param {*} param 지역명 + 선택된 지표의 파라미터 전달
 */
const openPopup = (type, param) => {
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


const accordian = (obj) => {
    $(obj).toggleClass('active')
    $(obj).siblings('.accContent').slideToggle(300)

}

// 모든지표보기 인구가구, 주거교통 옵션박스 셀렉터
const viewAllIndicator = (param) => {
    $(".resultAcc").hide();
    $(".resultAcc").each((i,item) => {
        if($(item).data('link') == param) $(item).show();
    })

}

// 모든지표보기 이너 탭
const themeInnerTab = (param) => {
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
const hint = document.querySelectorAll('.tooltip') 
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