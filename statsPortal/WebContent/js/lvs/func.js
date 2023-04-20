// 지역변화분석지도 신규 펑선 작성
// 작성자 : 고경남
// 작성일 : 22.10.13
$(function () {
	


    toggleExtendBoard(document.getElementById('btn_extend')) // 초기 확장보드 설정

    //우리동네 상황판 차트 / 데이터 탭 
    // $(".tabs2 li a, .tabs4 li a").click(function () {
    //     let activeTab = $(this).attr("rel");
    //     let tabName = $(this).data('tabname')
    //     $(this).parent().siblings("li").removeClass("active");
    //     $(this).parent().addClass("active"); 
        
    //     if(tabName == "tab2")  $(".tab_container2").children('.tab_content2').hide();
    //     else if (tabName == "tab4") $(this).closest('.tab_container4').children('.tab4').hide();

    //      $("#" + activeTab).fadeIn(10);
    // });



})


// 우리동네 상황판 토글 
toggleExtendBoard = (obj) => {

    const extendBoard = document.getElementById('extendBoard') // 확장보드
    let boardSts = extendBoard.classList.contains('active') // true : open , false: close;

    // type1 (우리동네 현황판)
    // type2 (인구가구, 복지문화, 주거교통, 안전환경, 노동경제)
    // type3 (추천지표, 모든지표)
    let extendType = $(obj).data('type')

    // board1 우리동네 현황판
    // tab1 인구가구, tab2 복지문화, tab3 주거 교통, tab4 안전환경, tab5 노동 경제
    // sub1 추천지표, sub2 모든지표
    let tabName = $(obj).data('link') // boardType1 우리동네 현황판, boardType2 추천지표
     

    function removeType1Class() { $('#btn_extend').removeClass('active')};
    function removeType2Class() { $('#tabIndicator li').removeClass('active')};
    function removeType3Class()  { $('#tabIndicatorSub li').removeClass('active')};
    
    
    // 클래스 Toggle
    switch(extendType) {
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
            $(obj).closest('li').addClass('active');
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

    if(!boardSts) {
        extendBoard.classList.add('active');
        $(".control_foot").addClass('extend') 
    } 
    

    // 보드 타입 
    $(extendBoard).children('div').each((index ,item) => {
        let boardTarget = "";

        if(extendType == "type1") boardTarget = "board1"
        else                        boardTarget = "board2"

        if(boardTarget == $(item).data('attr')) $(item).show();
        else $(item).hide();
        
        if($(item).data('attr') == 'header') $(item).show();
    
    })

    // 추천지표, 모든지표 대표 5개 항목 
    if(extendType == 'type2') {
        makeType2Conent(tabName)
    }

}

// 탭2 실행부
const makeType2Conent = (type) => {

    const dummyData1 = [
        {"gubun":"인구가구","title":"총 인구","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,541323,451231]},
        {"gubun":"인구가구","title":"남자인구","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,654321,456123]},
        {"gubun":"인구가구","title":"여자인구","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,456123,546123]},
        {"gubun":"인구가구","title":"가구","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,554123,546123]},
        {"gubun":"인구가구","title":"1인 가구 변화","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,321654,521365]},
        {"gubun":"인구가구","title":"65세 이상 1인 가구 변화","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,412563,541236]},
        {"gubun":"인구가구","title":"15세 미만 유소년 인구 변화","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,412563,632541]},
        {"gubun":"인구가구","title":"65세 이상 고령자 인구 변화","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,341256,521463]}
    ]
    const dummyData2 = [
        {"gubun":"주거교통","title":"주택(호)","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구"],"chartData":[456789,451263]},
        {"gubun":"주거교통","title":"단독주택","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구"],"chartData":[456789,521463]},
        {"gubun":"주거교통","title":"아파트현황","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구"],"chartData":[456789,632541]},
        {"gubun":"주거교통","title":"1인당 자동차 등록대수","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구"],"chartData":[456789,325416]}
    ]

    const dummyData3 = [
        {"gubun":"복지문화","title":"보육업체 현황","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,521463,632541]},
        {"gubun":"복지문화","title":"보건시설 1개당 65세 이상 노인","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,412563,325416]},
        {"gubun":"복지문화","title":"교원 1인당 학생수","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,632541,632541]},
        {"gubun":"복지문화","title":"어린이집 분포 현황","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,521463,325416]}
    ]

    const dummyData4 = [
        {"gubun":"노동경제","title":"사업체수","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구"],"chartData":[456789,412563]},
        {"gubun":"노동경제","title":"종사자수","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구"],"chartData":[456789,254163]},
        {"gubun":"노동경제","title":"고용율","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구"],"chartData":[456789,325416]},
        {"gubun":"노동경제","title":"재정자립도 현황","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구"],"chartData":[456789,521463]}
    ]

    const dummyData5 = [
        {"gubun":"안전환경","title":"보행자 교통사고 발생 현황","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,456789,456789]},
        {"gubun":"안전환경","title":"무더위 쉼터 현황","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,456789,456789]},
        {"gubun":"안전환경","title":"도시공원 분포 현황","totalCount":469426,"baseYear":"2022-06","unit":"명","category":["대전","서구","둔산동"],"chartData":[456789,456789,456789]}
    ]

    // 
    let dataGroup = {"인구가구":dummyData1,"주거교통":dummyData2,"복지문화":dummyData3,"노동경제":dummyData4,"안전환경":dummyData5}
    let name = "";

    if(type == "tab1") name = "인구가구";
    else if(type == "tab2") name = "주거교통";
    else if(type == "tab3") name = "복지문화";
    else if(type == "tab4") name = "노동경제";
    else if(type == "tab5") name = "안전환경";
    
    $("#tabType2Content").empty(); // 탭 내용 지우기
    tab2ContentSync(dataGroup[name]);
    

    
}

function tab2ContentSync (data) {
    
    let ids = makeType2Html(data); // 항목별 html 생성
    // 각 항목별 차트 생성
    if(ids.length != data.length) return false;
    ids.forEach((i,index) => {
        layerColumnType2(ids[index],data[index])
    })

    // 하단 높이 지정 
    $(".extend_data_02 .main_sec02").css("height","calc((100% - 20px) - "+$(".extend_data_02 .main_sec01").height()+"px")
    
    // 하단 탭별 차트 

    // 초기 탭 설정 
    $("#tab4_1").show();

    // 변화그래프 더미 데이터
    const dummyData6 = {"title":"1인 가구 수(가구)","category":[2000,2005,2010,2015,2016,2017,2018,2019,2020],"data":[33760,44608,52538,58872,56602,64932,61414,71702]}
    combiLineColumn('tab4_chart1',dummyData6)
}

// 인구가구, 주거교통, 복지문화, 노동경제, 안전환경 탭 콘텐츠 생성
const makeType2Html = (data) => {
    return new Promise((resolve, reject) => {
        let chartIds = [];
        data.forEach((item, index) => {
            let html = "";

            html += '<div class="content">';
            html += '<h5>'+item.title+'</h5>';
            html += '<img src="image/icon/icon-tooltip.png" alt="">';
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
        }) 

        resolve(chartIds)
    }) 

}


// 우리동네 상황판 닫기
closeExtendBoard = () => {
    document.getElementById('extendBoard').classList.remove('active');
    $(".control_foot").removeClass('extend') 
}


// 팁 이벤트 리스너
const hint = document.querySelectorAll('.tooltip')
hint.forEach((hintTarget) => {
    let tipText = $(hintTarget).data('tip');

    hintTarget.addEventListener('mouseover',(e) => {
        let divX = e.pageX 
        let divY = e.pageY

        $("#tipLayer").html(tipText)
        $("#tipLayer").css({'display':'block',
                            'left':divX,
                            'top':divY,
                            'position':'absolute'})
    })

    hintTarget.addEventListener('mouseout',(e) => {
        $("#tipLayer").html()
        $("#tipLayer").css('display',"none")
    })

    
})


// // 넘버 포멧
// const numberFormat = (x) => {
//     if(!x) return 0;
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// // 슬라이더 기능구현
// async function startSliderItemSync (sliderData,parentId) {
  
//   const chartIds = await makeSliderHtml(sliderData,parentId); 
//   const items = await getSliderItems()
  
//   // todo render Chart 
//   makeSliderChart(chartIds,sliderData)
//   makeSliderHover(items);

//   $('.slick_slider').slick({
//     dots: true,
//     speed: 300,
//     prevArrow:".arrows > .prev_arrow",
//     nextArrow:".arrows > .next_arrow",
//     autoplay: false,
//     autoplaySpeed: 2000
//   });
// }

// 슬라이더 html 생성
// const makeSliderHtml = (dataSet, parentId) => {
//   return new Promise((resolve, reject) => {

    
//     let chartIdAr = [];
//     dataSet.forEach((item, index) =>{


//       let html = "";
//       html += '<li class="slider_item">';
//       html += '<div class="item_heading">';
//       html += '<h5>'+item.title+'</h5>';
//       html += '<img src="image/icon/icon-tooltip.png" alt="">';
//       html += '<span>'+item.unit+'</span>';
//       html += '</div>';
//       html += '<div class="item_content">';
//       html += '<ul>';
//       html += '<li>';
//       html += '<div class="this_year">';
//       html += '<h6>'+item.lastYearName+'</h6>';
//       html += '<p>'+numberFormat(item.lastYearData)+'</p>';
//       html += '</div>';
//       html += '<div class="last_year">';
//       html += '<h6>'+item.nowYearName+'</h6>';
//       html += '<p>'+numberFormat(item.nowYearData)+'</p>';
//       html += '</div>';
//       html += '</li>';
//       html += '<li>';
//       html += '<div class="chart">';
//       if(item.type == "donut") html += '<div id="'+item.id+'_'+index+'" style="height:70px">';
//         else                  html += '<div id="'+item.id+'_'+index+'" style="height:100px">';
//       html += '</div>';
//       if(item.type == "donut") {
//         html += '<div>';
//         html += '<span class="cr01">'+item.graphDataName1+'</span>';
//         html += '<strong>'+numberFormat(item.graphData1)+'</strong>';
//         html += '</div> ';
//         html += '<div>';
//         html += '<span class="cr02">'+item.graphDataName2+'</span>';
//         html += '<strong>'+numberFormat(item.graphData2)+'</strong>';
//         html += '</div>';
//       }
//       html += '</li>';
//       html += '</ul>';
//       html += '</div>';
//       html += '</li>';
//       // $("#"+parentId).html("");
//       $("#"+parentId).append(html)å
//       chartIdAr.push(item.id+'_'+index)
//     })
//     resolve(chartIdAr);
//   })
// }

// // 슬라이더 아이템 가져오기
// const getSliderItems = () => {
//   return new Promise((resolve) => {resolve(document.querySelectorAll('.slider_item'))})
// }


// // 우리동네 현황판 차트 그리기.
// const makeSliderChart = (ids,data) => {
//   return new Promise((resolve) => {
//     data.forEach((item,index) => {
//         if(item.type == 'donut') layerDonut(ids[index],item)
//         else if (item.type == 'column') layerColumn(ids[index],item)
//         else if (item.type == 'map') layerMap(ids[index],item)
//         else if (item.type == 'pie') layerPie(ids[index],item)
//         else if (item.type == 'line') layerLine(ids[index],item)
//         else console.log("nothing")
//       })

//       resolve();
//   })
// }

// // 슬릭 슬라이더 무브
// $('.slick_slider').on('afterChange', function(event, slick, currentSlide, nextSlide){

//     let targetId = 'sliderContent'+currentSlide
//     let dataName = "sliderData"+currentSlide
    
//     startSliderItemSync(sliderData[currentSlide],targetId)
// }); 