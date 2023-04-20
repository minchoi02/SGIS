/**
 * 메인화면에 대한 클래스
 *
 * history : 네이버시스템(주), 1.0, 2014/08/29 초기 작성 author : 권차욱, 김성현, 석진혁 version :
 * 1.0`kii see :
 * 20190502 목요일 운영반영예정
 */

    var openApiPath = "//sgisapi.kostat.go.kr";
    var contextPath = "";    //djlee 20190614 수정

    function setMainRecentLists(obj) {
    var title = '메인페이지 화면';
    var zoomLevel = '00';
    var adm_nm = '없음';

    // 인터랙티브맵 최근목록
    var interactive = obj.interactive_lists;
    var html = "";
    var titleHtml ="";
    if(interactive.length != 0 && interactive.length != undefined) {
        for(var i = 0; i < interactive.length; i++) {
            var post_title = interactive[i].title;
            var hot_icon_yn = interactive[i].hot_icon_yn;
            if(interactive[i].title.length > 50){
                    post_title = interactive[i].title.substring(0, 50) + "...";
            }
            if(i == 0){
                titleHtml += "<li><a style='color:#fff;' href='" + interactive[i].url + "'>"
                           +"<span class='cate' id='cate'>● </span>"+ "<span id='postTit" + i +"'>"+post_title +"</span></a></li>";
                $(".roundBox2").html(titleHtml);
            }
            html += "<li id='interLists'><a id='interColor' href='" + interactive[i].url + "'>"
                  + "<span class='cate2'>● </span>"+ "<span id='postTit" + i +"'>"+post_title;
            if(hot_icon_yn == 'Y') {
                html += "<img name=\"hotissue\" src=\"/img/ico/hotissueicon2.png\" style=\"margin-bottom:-3px;\" alt='핫이슈'>"; //2017.12.12 [개발팀]
            }
            html += "</span></a></li>";
        }
        $("#inter").html(html);

        for(var i = 0; i < interactive.length; i++) { //생성된 html 리스너 생성 및 로그처리
            $("#postTit"+i).click(function() {
                apiLogWrite2("G0", "G01", "메인페이지 화면", $(this).text(), "00", "없음");
            });
        }
    }

    // 통계주제도 최근목록(관리자사이트 즐겨찾는 통계관리 링크) 김희철 수정
    var thema = obj.thema_lists;
    html = "";
    titleHtml = "";
    if(thema.length != 0 && thema.length != undefined) {
        for(var i = 0; i < thema.length; i++) {
            var categoryText = getCategoryText(thema[i].category);
            var post_title = thema[i].title;
            var hot_icon_yn  = thema[i].hot_icon_yn;
            if(i == 0){
                if (thema[i].category != undefined) {
                    if(thema[i].title.length > 20){
                         post_title = thema[i].title.substring(0, 20) + "...";
                     }
                    titleHtml += "<li><a style='color:#fff;' href='" + thema[i].url + "'>"
                        + "<span class='cate'>"+thema[i].category_nm+"</span>"+"<span class='themaTit' id='themaTilte'>"+post_title + "</span></a></li>";
                }
            $(".roundBox").html(titleHtml);
            }

            $(".roundBox a").unbind().bind("click",function(){
                apiLogWrite2("G0", "G1B", title, $(this).text(), zoomLevel, adm_nm);
            });
            if (thema[i].category != undefined) {
                html += "<li id='themaLists'><a id='themaColor' href='" + thema[i].url + "'>"
                    + "<span class='cate' >"+thema[i].category_nm+"</span>"+"<span class='themaTit' id='themaTilte'>"+thema[i].title;
                if(hot_icon_yn == 'Y') {
                    html += "<img name=\"hotissue\" src=\"/img/ico/hotissueicon2.png\" style=\"margin-bottom:-3px;\" alt='핫이슈'>"; //2017.12.12 [개발팀]
                }

                html += "</span></a></li>";
            }
        }
        $("#thema").append(html);

        $(".themaTit").click(function() {
            apiLogWrite2("G0", "G11", "메인페이지 화면", $(this).text(), "00", "없음");
        });
    }

        // 이미지 배너등록
        var banner = obj.banner_lists;
        var idx =0;

        for(var i=0; i<banner.length; i++){
            var bannerAltText = getImgAltText(idx);
            var tempLinkUrl = "javascript:void(0)";

            var $slide = $("<li>",{id : "slick-slide0"+i});
            $(".sbList").append( $slide );

            if( banner[i] === undefined ){
                var html = "<a href='javascript:void(0)'><img src='src=/img/pic/pic_banner.png' alt='"+bannerAltText+"' /></a>";
                $slide.append(html);
            }else{
                if(banner[i].link_url === undefined) {
                    banner[i].link_url = tempLinkUrl;
                }
                if(idx == 0){
                    //2017.12.12 [개발팀] 접근성 시정조치
                    var html = "<a href='" + banner[i].link_url + "'><img src='/s-portalcnm/upload/temp/" + banner[i].post_title_en + "' alt='"+ banner[i].post_title +"' onError=\"this.src='/img/pic/pic_banner.png';\"/></a>";
                    $slide.append(html);
                }else{
                    //2017.12.12 [개발팀] 접근성 시정조치
                    var html = "<a href='" + banner[i].link_url + "'><img src='/s-portalcnm/upload/temp/" + banner[i].post_title_en + "' alt='"+ banner[i].post_title +"' onError=\"this.src='/img/pic/pic_banner0"+i+".png';\"/></a>";
                    $slide.append(html);
                }
            }
            idx++;
        }

        $('.sbList').slick({
            dots : true,
            autoplay : true,
            autoplaySpeed : 3000,
            pauseOnDotsHover : true
        });
        // djlee 2019-07-22 추가 끝
    }

    // djlee 2019-07-22 추가
    function getImgAltText(idx) {
        switch (idx) {
        case 0:
            return "기존 통계지리정보서비스에서 더욱 새로워진 SGIS+ plus 서비스를 통해 사용편의성 강화는 물론 주거지분석맵, 지역현안 소통지도 등의 신규 서비스를 이용하실수 있습니다.";
        case 1:
            return "기존 서비스의 사용자 기능 고도화를 통해 다양한 데이터 조회방식을 적용하였습니다. 또한 주거지 통계지도, 지역현안 소통지도 등 주제별 컨텐츠가 새롭게 편성 되었습니다. 통계청만의 차별화된 GIS기반통계정보를 경험해보세요.";
        case 2:
            return "통계정보의 조회 기능이 대폭 강화되었으며, 다양한 시각화 기능들이 적용되어 다양한 방식으로 서비스를 활용 및 응용할 수 있어 보다 강력하고 다채로운 통계정보조회가 가능해졌습니다.";
        case 3:
            return "통계청의 센서스 통계와 함께 외부의 공공데이터를 함계 지도 위에 시각화할수 있으며, 사용자가 수집한 개인데이터도 지도 위에서 함께 적용하여 새로운 GIS기반의 정보를 융합, 생성할 수 있습니다.";
        }
    }
    // djlee 2019-07-22 추가 끝
//djlee 20190614 수정 끝

//djlee 20190614 수정 시작
    function getCategoryText(text) {
        switch (text) {
        case "CTGR_001":
            return "인구와 주거";
        case "CTGR_002":
            return "주거와 교통";
        case "CTGR_003":
            return "복지와 문화";
        case "CTGR_004":
            return "노동과 경제";
        case "CTGR_005":
            return "건강과 안전";
        case "CTGR_006":
        	return "환경과 기후";
        }
    }

    function openPopup( url, opt, target, width, height ){
    	target = ( target ? target : "" );
    	opt = ( opt ? opt : "toolbar=0,status=0,fullscreen=0,menubar=0,scrollbars=1,resizable=0" );

    	if( width && height ){
    		opt = opt+",width="+width+",height="+height;
			var popupX = ( window.screen.width / 2 ) - ( width / 2 );
			var popupY = ( window.screen.height / 2 ) - ( height / 2 );
			opt += ',left='+popupX+',top='+popupY;
    	}

    	window.open(url, target, opt);
	}

	function popOxQuiz(){
		window.open('/jsp/event/quiz/quiz.jsp','','width=820,height=950,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=1,resizable=0');
	}

    function logWriteAndMove(fClass1Cd, fClass2Cd, fClass3Cd, fClass4Cd, detCd, param, url, newWindow){
    	// mng_s 이금은 2021.08.04(수) 추가
    	var srvParam = { fClass1Cd: fClass1Cd, fClass2Cd: fClass2Cd, fClass3Cd: fClass3Cd, fClass4Cd: fClass4Cd};

        if((detCd != null && detCd != '') && (param != null && param != '')){
            srvParam = { fClass1Cd: fClass1Cd, fClass2Cd: fClass2Cd, fClass3Cd: fClass3Cd, fClass4Cd: fClass4Cd, detCd: detCd, param: param };
        } else if (detCd != null && detCd != ''){
            srvParam = { fClass1Cd: fClass1Cd, fClass2Cd: fClass2Cd, fClass3Cd: fClass3Cd, fClass4Cd: fClass4Cd, detCd: detCd };
        } else if (param != null && param != ''){
            srvParam = { fClass1Cd: fClass1Cd, fClass2Cd: fClass2Cd, fClass3Cd: fClass3Cd, fClass4Cd: fClass4Cd, param: param };
        }

        jQuery.ajax({
            type:"POST",
            url: "/ServiceAPI/common/SRVLogWrite.json",
            data: srvParam,
            dataType:"json",
            async: true,
            success:function(data){
            },
            error:function(data) {
            }
        });
    	// mng_e 이금은 2021.08.04(수) 추가

    	if(newWindow){
            window.open(url);
        }else{
            location.href=url;
        }
    }

    //djlee 20190614 수정 끝
    $includeSearch = {};
    $includeSearch.ui = {
        //현재 화면에 따른 대메뉴 강조
        menuUnderline : function() {
            var url = document.location.href;
            if(url.indexOf("/view/thematicMap") > -1) { //통계주제도
                $(".gnb").find("li:eq(0)").addClass("on");
            } else if(url.indexOf("/view/map/interactiveMap") > -1) { //대화형통계지도
                $(".gnb").find("li:eq(1)").addClass("on");
            } else if(url.indexOf("/view/bizStats/") > -1 || url.indexOf("/view/community") > -1 || url.indexOf("/view/house/houseAnalysisMap") > -1) { //활용사례, 통계커뮤니티맵
                $(".gnb").find("li:eq(2)").addClass("on");
            } else if(url.indexOf("/view/board/") > -1) { //알림마당
                $(".gnb").find("li:eq(4)").addClass("on");
            }
        },
        //연관검색 화면으로 이동
        moveSearchList : function() {
            srvLogWrite("A0", "02", "14", "00", "", "");
            apiLogWrite2("F0","F60","Header 메뉴 클릭 로그","검색","00","없음");
            var val = $("#searchKeyword").val();
            var arrayKey = val.split(" ");
            if(val == "") {
                messageAlert.open("알림", "검색어를 입력하세요.");
            } else {
                window.location.href = contextPath + "/view/common/searchList?searchKeyword=" + val;
            }
        },
        searchHide : function() {
            $(".searchPop").slideUp(10);
            $(".headerContents form").removeClass("on");
        }
    };

    var ajaxCustom = {
        send : function(opt){
            $.ajax({
                method : opt.method ? opt.method : "POST",
                async : opt.async === false ? opt.async : true,
                url : contextPath + opt.url,
                data : opt.data ,
                success : function(res){
                    if(opt.callback && opt.callback instanceof Function){
                        opt.callback(res);
                    }
                },error : function(){
                    console.log(arguments)
                }
            });
        }
    }

function apiLogWrite2(type, api_id, title, parameter, zoomLevel, adm_nm) {
    var obj = {};
    obj["type"] = type;
    obj["api_id"] = api_id;
    obj["title"] = title;
    obj["parameter"] = parameter;//encodeURIComponent(parameter);
    obj["zoomLevel"] = zoomLevel;
    obj["adm_nm"] = adm_nm;
    ajaxCustom.send({data : obj , url : "/ServiceAPI/common/APILogWrite.json"})
}

function srvLogWrite(fClass1Cd, fClass2Cd, fClass3Cd, fClass4Cd, detCd, param){
    var obj = {};
    obj["fClass1Cd"] = fClass1Cd;
    obj["fClass2Cd"] = fClass2Cd;
    obj["fClass3Cd"] = fClass3Cd;
    obj["fClass4Cd"] = fClass4Cd;
    if(detCd != null && detCd != '')obj["detCd"] = detCd;
    if(param != null && param != '')obj["param"] = param;
    ajaxCustom.send({data : obj , url : "/ServiceAPI/common/SRVLogWrite.json"});
}

$(function() {
    // openWin('Popup_main');
    $(window).on("keydown.disableScroll", function(e) {
        var eventKeyArray = [ 38, 40 ];
        for (var i = 0; i < eventKeyArray.length; i++) {
            if (e.keyCode === eventKeyArray[i]) {
                e.preventDefault();
                return;
            }
        }
    });

    var param_year = '2020'; //2021-10-15 이금은  (base_year=param_year)
    var corp_year  = '2019'; //2021-05-25 이금은
    var bord_year  = '2021'; //2021-10-15 이금은

    function positionClick(sido,sgg){
        var data =  {
                sido_cd : sido,
                sgg_cd : sgg,
                data_year : corp_year,//2019-03-13 박길섭
                bord_year : bord_year//2019-03-13 박길섭
        };

        ajaxCustom.send({method : "GET" ,data : data , url : "/ServiceAPI/thematicMap/getMainPopsgg.json" , callback : function(res){
            if (res.errCd == "0") {
                if(res.result.detailInfo.length == 0){
                    $(".value1 , .value2 , .value3 , .value4 , .value5 , .value6").text("0");
                }
                $(res.result.detailInfo).each(function(index , elem){
                    $(".value1").text(elem.total);
                    $(".value2").text(elem.malecnt);
                    $(".value3").text(elem.femalecnt);
                    $(".value4").text(elem.house_total);
                    $(".value5").text(elem.corp_total);
                    $(".value6").text(elem.employee_total);
                });
            }
        }});

        $(".allMap map area").each(function(){
            if(sido == $(this).data("code")){
                var areaName = $(this).data("area-name");
                $(".allMap-view img").attr("src","../images/map/"+areaName+".png");
                $(this).trigger("click");
            }
        });

        // 2019-07-15 이동진 수정시작
        var insideName;
        if(insideOpen)clearTimeout(insideOpen);
        $(".mapDetail-point area").each(function(){
            var code = $(this).data("code") + "";
            var codeArr = [];
            if(code){
                if(code.indexOf(",") > 0){
                    codeArr = code.split(",");
                } else{
                    codeArr.push(code);
                }
                for(var i = 0 ; i < codeArr.length ; i++){
                    if((sido + "" + sgg) == codeArr[i]){
                        var insideName = $(this).data("inside-name");
                        if($(this).is("[data-inside-name]")){ // 값이 있으면 [구] 지도 보여짐
                            insideOpen = setTimeout(function(){
                                if($("."+insideName).css("display") == 'none'){
                                    $(".mapInside").hide();
                                    $("."+insideName).show();
                                }
                                var areaName = $(this).data("area-num");
                                $(this).closest(".mapInside").find(".inside-view img").attr("src","../images/map/"+areaName+".png");
                                $(".mapInside area").each(function(){
                                    var code1 = $(this).data("code") + "";
                                    if((sido + "" + sgg) == code1){
                                        var areaName = $(this).data("area-num");
                                        if($(this).closest(".mapInside").find(".inside-view img").length == 0){
                                            var t = $("."+insideName);
                                            var code     = t.data("code");
                                            var usemap     = t.data("usemap");

                                            var img = $("<img>").data("code" , code).attr("src" , "../images/map/"+areaName+".png").attr("usemap" , usemap);
                                            img.load(function(){
                                                $(".mapInside").hide();
                                                t.show();
                                            });
                                            t.find(".inside-view").append(img);
                                        }else{
                                            $(this).closest(".mapInside").find(".inside-view img").attr("src","../images/map/"+areaName+".png");
                                        }
                                        return false;
                                    }
                                });

                            },300);
                        }else{ // [data-inside-name] 값이 없으면 [광역시/도] 영역 이미지 변경
                            $(".mapInside").hide();
                            var areaName = $(this).data("area-num");
                            $(this).closest(".mapDetail").find(".mapDetail-view img").attr("src","../images/map/"+areaName+".png");
                        }
                    }
                }
            }
            // 2019-07-15 이동진 수정 끝

        });

    }



    $(document).ready(function(){

		apiLogWrite2('M0', 'M01', '외부에서 페이지 유입', document.location.href, '00', '없음');

        $("body").on("click",".mapArea-select .btn_prev",function(){
            srvLogWrite("A0", "03", "01", "01", "", "");
            $(".navi-content .scrl-second li").each(function(index , elem){
                if($(elem).hasClass("li-on")){

                    if(0 < $(this).index()){
                        $(this).prev().trigger("click");
                        setTimeout(function(){
                            $(".navi-confirm").trigger("click");
                        } , 1000);
                        return false;
                    }

                    if(0 == $(this).index()){
                        $(".navi-content .scrl-first li").each(function(index , elem){
                            if($(elem).hasClass("li-on")){
                                $(this).prev().trigger("click");
                                setTimeout(function(){
                                    $(".navi-confirm").trigger("click");
                                } , 1000);
                                return false;
                            }
                        });
                    }
                }
            });
        });

        $(".mapArea-select .btn_next").on("click",function(){
            srvLogWrite("A0", "03", "01", "02", "", "");
            nextSgg();
        });

        //확인 버튼
        $("body").on("click",".navi-confirm",function(){
            var sido , sido_title , sgg , sgg_title;

            $(".navi-content .scrl-first li").each(function(index , elem){
                if($(elem).hasClass("li-on")){
                    sido = $(elem).data("sido");
                    sido_title = $(elem).data("sidotitle");
                }
            });
            $(".navi-content .scrl-second li").each(function(index , elem){
                if($(elem).hasClass("li-on")){
                    sgg = $(elem).data("sgg");
                    sgg_title = $(elem).data("sggtitle");
                }
            });
            $(".navi-content").hide();
            $(".section_select").text(sido_title + " " + sgg_title);

            positionClick(sido , sgg);



        });

        //닫기 버튼
        $("body").on("click",".navi-cancel",function(){
            $(".navi-content").hide();
        });

        // 시군구 클릭시 이벤트
        $("body").on("click",".navi-content .scrl-first li",function(){
            $(".navi-content .scrl-first li").removeClass("li-on");
            $(this).addClass("li-on");
            getSggList($(this).data("sido"));
        });
        // 시도 클릭시 이벤트
        $("body").on("click",".navi-content .scrl-second li",function(){
            $(".navi-content .scrl-second li").removeClass("li-on");
            $(this).addClass("li-on");
        });

    });

    var html = "<div class='interactiveSelect_main' id='location'></div>";
    html += "    <div class='navi-content' id='content'>";
    html += "        <div class='scrl-first'>";
    html += "            <ul id='sido'>";
    html += "            </ul>";
    html += "        </div>";
    html += "        <div class='scrl-second'>";
    html += "            <ul id='sgg'>";
    html += "            </ul>";
    html += "        </div>";
    html += "        <div class='navi-action'>";
    html += "            <img id='navi-confirm' src='/img/popup/btn_confirm.png' alt='확인' style='cursor: pointer;'>";
    html += "            <img id='navi-cancel' src='/img/popup/btn_close.png' alt='닫기' style='cursor: pointer;'>";
    html += "        <img id='addr_magni' src='/img/popup/magni_plus.png' alt='돋보기' style='cursor: pointer;'></img>";
    html += "        </div>";
    html += "    </div>";
    $("#mapNavi_1").html(html);

    //현재 위치 조회
    //2019-03-14 박길섭 시작
    if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success,error);//위치정보 조회 위치정보를 허용일 때 success 차단일때 error
    }else {
        console.log("브라우져가 기능을 제공하지 않습니다.");
    }
    function success(position){//성공일때는 현위치로 위치를 잡음
        Proj4js.reportError = function(msg) { alert(msg); }
        Proj4js.defs['WGS84경위도'] = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
        Proj4js.defs['UTMK'] = '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs'
        var wgs84 = new Proj4js.Proj('WGS84경위도');
        var bessel = new Proj4js.Proj('UTMK');
        var p = new Proj4js.Point(position.coords.longitude, position.coords.latitude);
        Proj4js.transform(wgs84, bessel, p);
        getSiDoList(p.x , p.y),
        function(){
            // 아이피를 위치정보로 변경
            // 크롬 정책 변경으로 https 보안 프로토콜이 아닌경우 지원하지 않으므로  개발 테스트를 위한 처리

                // leekh 20190213 개발에선 이부분을 주석 해지해야 함
                //getSiDoList('989250.9032516365' , '1818781.8791059735'); // djlee 2019-07-15 수정
                // leekh 20190213 운영에는 이부분 주석 풀어야 함.
                /*$.get("https://ipinfo.io/geo", function(response) {
                    var utmkXY = new sop.LatLng(response.loc.split(",")[0], response.loc.split(",")[1]);
                    center = [ utmkXY.x, utmkXY.y ];
                    getSiDoList(utmkXY.x , utmkXY.y);
                }, "jsonp");*/
            };
        }
    function error(e){
        getSiDoList("955092.625","1950388.5");//차단일때는 서울로 위치를 잡음
    }
    //2019-03-14 박길섭 끝

    function getSiDoList(x , y){
        var sopPortalAccessTokenObj = {};
        sopPortalAccessTokenObj["consumer_key"] = "590a2718c58d41d9ae3b";
        sopPortalAccessTokenObj["consumer_secret"] = "ab7fe94f9fb64336abd3";
        $.ajax({
            method : "GET",
            async : false,
            url : openApiPath + "/OpenAPI3/auth/authentication.json",
            data : sopPortalAccessTokenObj ,
            success : function(res){

                var result = res.result;
                if (res.errCd == "0") {
                    accessToken = result.accessToken;

                    //accessToken 쿠키를 소멸시킨다.
                    document.cookie = "accessToken=; expires=0; path=/";

                    date = new Date(); // 오늘 날짜
                    // 만료시점 : 오늘날짜+10 설정
                    var validity = 1;
                    date.setDate(date.getDate() + validity);
                    document.cookie = "accessToken=" + escape(accessToken) + ';expires=' + date.toGMTString() + "; path=/";

                    var data = "?accessToken="+accessToken+"&addr_type=20"+"&x_coor="+x+"&y_coor="+y;
                    $.ajax({
                        url : "https://sgisapi.kostat.go.kr/OpenAPI3/addr/rgeocode.json" + data    ,
//                        url : openApiPath + "/OpenAPI3/addr/rgeocode.json" + data    ,
                        type : "GET",
                        async : false,
                        dataType : "json",
                        success : function(resBody) {

                            var sopPortalAllAddressObj = {};
                            sopPortalAllAddressObj["sido_cd"] = resBody.result[0].sido_cd;
                            sopPortalAllAddressObj["sgg_cd"] = resBody.result[0].sgg_cd;
                            sopPortalAllAddressObj["dong_cd"] = resBody.result[0].dong_cd;
                            sopPortalAllAddressObj["base_year"] = param_year;
                            $.ajax({
                                method : "POST",
                                async : true,
                                url : contextPath + "/ServiceAPI/map/allAddressList.json",
                                data : sopPortalAllAddressObj ,
                                success : function(res){
                                    var html = "<ul>";
                                    if (res.errCd == "0") {
                                        var result = res.result;
                                        for ( var i = 0; i < result.sidoList.length; i++) {
                                            var elem = result.sidoList[i];
                                            if (elem.sido_cd == result.sido_cd) {
                                                html += "            <li class='li-on' data-sido='"+elem.sido_cd+"' data-sidotitle='"+elem.sido_nm+"'>";
                                                html += "                <a class='li-alink on' id='" + elem.sido_cd + "/" + elem.x_coor + "/" + elem.y_coor + "'>";
                                                html += "                    <strong class='li-strong on'>" + elem.sido_nm + "</strong>";
                                                html += "                </a>";
                                                html += "            </li>";
                                                sido_elem = elem;
                                            }
                                            else {
                                                html += "            <li data-sido='"+elem.sido_cd+"' data-sidotitle='"+elem.sido_nm+"'>";
                                                  html += "                <a class='li-alink' id='" + elem.sido_cd + "/" + elem.x_coor + "/" + elem.y_coor + "'>";
                                                html += "                    <strong class='li-strong'>" + elem.sido_nm + "</strong>";
                                                html += "                </a>";
                                                html += "            </li>";
                                            }
                                        }
                                        html += "</ul>";
                                        $("#sido").empty();
                                        $("#sido").html(html);

                                        html = "";
                                        html = "<ul>";
                                        if (result.sggList != undefined) {
                                            for ( var i = 0; i < result.sggList.length; i++) {
                                                var elem = result.sggList[i];
                                                if (elem.sgg_cd == result.sgg_cd) {
                                                    html += "            <li class='li-on' data-sgg='"+elem.sgg_cd+"' data-sggtitle='"+elem.sgg_nm+"'>";
                                                    html += "                <a class='li-alink on' id='" + elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor + "'>";
                                                    html += "                    <strong class='li-strong on'>" + elem.sgg_nm + "</strong>";
                                                    html += "                </a>";
                                                    html += "            </li>";
                                                    sgg_elem = elem;
                                                }
                                                else {
                                                    html += "            <li data-sgg='"+elem.sgg_cd+"' data-sggtitle='"+elem.sgg_nm+"'>";
                                                    html += "                <a class='li-alink' id='" + elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor + "'>";
                                                    html += "                    <strong class='li-strong'>" + elem.sgg_nm + "</strong>";
                                                    html += "                </a>";
                                                    html += "            </li>";
                                                }
                                            }
                                        }
                                        html += "</ul>";
                                        $("#sgg").empty();
                                        $("#sgg").html(html);

                                        var sido , sido_title , sgg , sgg_title;

                                        $(".navi-content .scrl-first li").each(function(index , elem){
                                            if($(elem).hasClass("li-on")){
                                                sido = $(elem).data("sido");
                                                sido_title = $(elem).data("sidotitle");
                                            }
                                        });
                                        $(".navi-content .scrl-second li").each(function(index , elem){
                                            if($(elem).hasClass("li-on")){
                                                sgg = $(elem).data("sgg");
                                                sgg_title = $(elem).data("sggtitle");
                                            }
                                        });

                                        $(".section_select").text(sido_title + " " + sgg_title);
                                        positionClick(sido , sgg);
                                    }
                                }
                            });
                        },
                        error: function(x,o,e){
                            console.log("error");
                        },
                    });

                } else {
                	//messageAlert.open("알림", res.errMsg);
                }
            }
        });
    };

    function getSggList(sido){

        var sopPortalSggObj = {};
        sopPortalSggObj["sido_cd"] = sido;
        sopPortalSggObj["base_year"] = param_year;
        $.ajax({
            method : "POST",
            async : true,
            url : contextPath + "/ServiceAPI/map/sggAddressList.json",
            data : sopPortalSggObj,
            options : {
                target : this
            },success : function(res){
                var result = res.result;
                if (res.errCd == "0") {
                    if (result.sggList != undefined) {
                        var html = "";
                        for ( var i = 0; i < result.sggList.length; i++) {
                            var elem = result.sggList[i];
                            if (i == 0) {
                                html += "<li class='li-on' data-sgg='"+elem.sgg_cd+"' data-sggtitle='"+elem.sgg_nm+"'>";
                                html += "    <a class='li-alink on' id='" + elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor + "'>";
                                html += "        <strong class='li-strong on'>" + elem.sgg_nm + "</strong>";
                                html += "    </a>";
                                html += "</li>";
                                sgg_elem = elem;
                            }
                            else {
                                html += "<li data-sgg='"+elem.sgg_cd+"' data-sggtitle='"+elem.sgg_nm+"'>";
                                html += "    <a class='li-alink' id='" + elem.sgg_cd + "/" + elem.x_coor + "/" + elem.y_coor + "'>";
                                html += "        <strong class='li-strong'>" + elem.sgg_nm + "</strong>";
                                html += "    </a>";
                                html += "</li>";
                            }
                        }
                    }
                    html += "</ul>";
                    $("#sgg").empty();
                    $("#sgg").html(html);
                }
                else {
                    messageAlert.open("알림", res.errMsg);
                }
            }
        });
    }

    $.ajax({
	    type : "POST",
	    url : '/ServiceAPI/thematicMap/GetCategory.json',
	    data : {cate_id : "allAtOnce"},
	    success : function(data) {
	    	var $div = null;
	        $(data.result.cateList).each(function(index, elem) {

	            if( index % 3 == 0){
	                $div = $("<div>").addClass("cont clearFix");

	                //mng_s 20200730 이진호
	                //환경과 안전이 우선으로 나오게
	                //if (index != 0) $div.css("display", "none");
	                if (index != 12) $div.css("display", "none");
	                //mng_e 20200730 이진호

	                $(".mainTabCont").append($div);
	            }

	            var expData = elem.thema_exp.split("- ");
	            expData = expData[0].split("※");
	            var div = $("<div>");
	            div.append($("<strong>").css({
	                                "white-space"   : "nowrap",
	                                "width"         : "100%",
	                                "display"       : "inline-block",
	                                "overflow"      : "hidden",
	                                "text-overflow" : "ellipsis"})
	                        .attr("id",elem.stat_thema_map_id)
	                        .css("cursor","pointer")
	                        .html(elem.title)
	                        .on("click",function() {
	                        	window.location.href = $("#move_"+ $(this).attr("id")).attr("href");
	                        })
	            );

	            var p = $("<p>");
	            p.attr("id",elem.stat_thema_map_id).css({
	                        "white-space" : "nowrap",
	                        "width" : "100%",
	                        "display" : "inline-block",
	                        "overflow" : "hidden",
	                        "text-overflow" : "ellipsis",
	                        "white-space" : "normal",
	                        "line-height" : "1.2",
	                        "height" : "4.8em",
	                        "text-align" : "left",
	                        "word-wrap" : "break-word",
	                        "display" : "-webkit-box",
	                        "-webkit-line-clamp" : "4",
	                        "-webkit-box-orient" : "vertical",
	                        "cursor" : "pointer"
	            });

	            p.on("click",function() {
	                window.location.href = $("#move_"+ $(this).attr("id")).attr("href");
	            });

	            var p_txt = expData[0].replace(eval("/&lt;br [/]&gt;/gi")," ");
	            p_txt = p_txt.replace(eval("/&lt;br[/]&gt;/gi")," ");
	            div.append(p.html( p_txt ));

	            var boxDiv = $("<div>").addClass("tag");
	            var a1 = $("<a>");
	            if (elem.max_expnsn_level == '01') a1.addClass("spbox type01").text("시도").attr("id",elem.stat_thema_map_id);
	            else if (elem.max_expnsn_level == '02') a1.addClass("spbox type02").text("시군구").attr("id",elem.stat_thema_map_id);
	            else if (elem.max_expnsn_level == '03') a1.addClass("spbox type03").text("읍면동").attr("id",elem.stat_thema_map_id);
	            else if (elem.max_expnsn_level == '04') a1.addClass("spbox type04").text("집계구").attr("id",elem.stat_thema_map_id);

	            var a2 = $("<a>");
	            if (elem.thema_map_type == '02') {
	                if (elem.disp_method == '색상') a2.addClass('spbox type05').attr("id",elem.stat_thema_map_id);
	                else if (elem.disp_method == '증감') a2.addClass('spbox type06').attr("id",elem.stat_thema_map_id);
	                else if (elem.disp_method == '시계열') a2.addClass('spbox type07').attr("id",elem.stat_thema_map_id);
	                else if (elem.disp_method == '분할뷰') a2.addClass('spbox type09').attr("id",elem.stat_thema_map_id);
	                else if (elem.disp_method == 'POI') a2.addClass('spbox type10').attr("id",elem.stat_thema_map_id);
	                a2.text(elem.disp_method);
	            } else {
	                if (elem.thema_map_type == '03') a2.addClass('spbox type05').text("색상").attr("id",elem.stat_thema_map_id);
	                else if (elem.thema_map_type == '04') a2.addClass('spbox type06').text("증감  ").attr("id",elem.stat_thema_map_id);
	                else if (elem.thema_map_type == '05') a2.addClass('spbox type07').text("시계열").attr("id",elem.stat_thema_map_id);
	                else if (elem.thema_map_type == '06') a2.addClass('spbox type09').text("분할뷰").attr("id",elem.stat_thema_map_id);
	                else if (elem.thema_map_type == '07') a2.addClass('spbox type10').text("POI    ").attr("id",elem.stat_thema_map_id);
	            }

	            var a3 = $("<a>").attr("id",elem.stat_thema_map_id).addClass("spbox type08").text(elem.year_info);
	            var a4 = $("<a>").attr("id","move_"+ elem.stat_thema_map_id);
	            if (elem.thema_map_type == "03"){
	                a4.attr("href",'/view/thematicMap/thematicMapMain?stat_thema_map_id='+ elem.stat_thema_map_id + '&theme=' + elem.category + '&mapType='+ elem.thema_map_type);
	                //mng_s 20210615 이진호, 웹 접근성 점검 오류 수정
	                //a태그에 텍스트 제공, 텍스트 숨기기 위해 size 0
	                a4.text('이동');
	                a4.css('font-size','0px');
	                //mng_e 20210615 이진호
	            } else {
	                a4.attr("href",'/view/thematicMap/thematicMapMain?stat_thema_map_id='+ elem.stat_thema_map_id + '&theme=' + elem.category + '&mapType=' + elem.thema_map_type);
	                //mng_s 20210615 이진호, 웹 접근성 점검 오류 수정
	                //a태그에 텍스트 제공, 텍스트 숨기기 위해 size 0
	                a4.text('이동')
	                a4.css('font-size','0px');
	                //mng_e 20210615 이진호
	            }
	            boxDiv.append(a1);
	            boxDiv.append(a2);
	            boxDiv.append(a3);
	            boxDiv.append(a4);
	            div.append(boxDiv);
	            $div.append(div);

	            if( index % 3 == 0){
	                var $li = $("<li>");

	                //mng_s 20200727 이진호
	                //환경과 안전이 기본으로 변경
	                //if (index == 0) $li.addClass("active");
	                if (index == 12) $li.addClass("active");
	                //mng_e 20200727 이진호

	                var $a = $("<a>").css({});
	                var logWriteStr = "javascript:void(0)";

	                if(index == 0){
	                    logWriteStr = "javascript:srvLogWrite(\"A0\", \"04\", \"01\", \"02\", \"\", \"\");";
	                }else if(index == 1){
	                    logWriteStr = "javascript:srvLogWrite(\"A0\", \"04\", \"01\", \"03\", \"\", \"\");";
	                }else if(index == 2){
	                    logWriteStr = "javascript:srvLogWrite(\"A0\", \"04\", \"01\", \"04\", \"\", \"\");";
	                }else if(index == 3){
	                    logWriteStr = "javascript:srvLogWrite(\"A0\", \"04\", \"01\", \"05\", \"\", \"\");";
	                }else if(index == 4){
	                    logWriteStr = "javascript:srvLogWrite(\"A0\", \"04\", \"01\", \"06\", \"\", \"\");";
	                }

	                $a.attr('href', logWriteStr);
	                $li.append($a);
	                var $span = $("<span>").css({
	                    "box-sizing" : "border-box",
	                    "line-height" : "32px",
	                    " height" : "32px",
	                    "vertical-align" : "top",
	                    "white-space" : "nowrap",
	                    "width" : "100%",
	                    "min-width" : "90px",
	                    "display" : "inline-block",
	                    "overflow" : "hidden",
	                    "text-overflow" : "ellipsis"
	                });
	                $span.text(elem.category_nm);
	                $a.append($span);
	                $(".mainTab .clearFix").append($li);
	            }
	        });
	        $(".mainTab .clearFix").append('<li class="btnMore"><a href="javascript:logWriteAndMove(\'A0\', \'04\', \'01\', \'07\', \'\', \'\', \'/view/thematicMap/categoryList\', \'\');"><span class="hidden">더보기</span></a></li>');
	    },
	    error : function(data) {
	    }
	});

    var body = $("body");
    /*$('.exList01, .exList02, .sbList').slick({
        dots : true,
        autoplay : true,
        autoplaySpeed : 3000,
        pauseOnDotsHover : true
    });*/
    body.on("mouseover focus", ".evtLatest", function() {
        var ck = $(this).parents("dt").attr("class");
        $(".latestList dd.tm, .latestList dd.im").css("z-index", "1");
        $(".latestList dd." + ck).css("z-index", "2");
    });
    // 배너 재생/일시정지
    $(".bannerPlayer").on(
            'click',
            function() {
                if ($(".bannerPlayer").hasClass("on")) {
                    $(".bannerPlayer").removeClass("on");
                    $(".bannerPlayer").css("background-image", "url('/img/ico/play_on.png')");
                    $(".sbList").slick('slickSetOption', 'autoplay', false)
                                .slick('slickPause');
                } else {
                    $(".bannerPlayer").addClass("on");
                    $(".bannerPlayer").css("background-image", "url('/img/ico/play.png')");
                    $(".sbList").slick('slickSetOption', 'autoplay', true)
                                .slick('slickPlay');
                }
            });
    // 최근 게시물 -통계주제도
    body.on("mouseover focus", "#themaLists", function() {
        $(".roundBox").html($(this).html());
        $("#themaTilte").css("width", "270px");
        $("#themaColor").css("color", "#fff");
    });
    // 최근 게시물 -대화형통계지도
    body.on("mouseover focus", "#interLists", function() {
        $(".roundBox2").html($(this).html());
        $("#interTilte").css("width", "270px");
        $("#interColor").css("color", "#fff");
    });

    body.on("mouseover focus", ".latestList dt ul li a", function() {
        $(this).css("text-decoration", "underline");
        $(this).css("font-weight", "bold");
    });
    body.on("mouseout focus", ".latestList dt ul li a", function() {
        $(this).css("text-decoration", "none");
        $(this).css("font-weight", "normal");
    });

    body.on("mouseover focus", ".cbwBox ul li a", function() {
        var cbwBoxId = $(this).parent("li").parent("ul").parent(".cbwBox").attr("id");
        switch (cbwBoxId) {
        case 'board001':
        case 'board003':
        case 'board002':
        case 'board000':
        case 'board004':
        case 'shareTable':
        case 'shortcut':
        case 'eduKidz':
        case 'developer':
            $(this).css("text-decoration", "underline");
            $(this).css("font-weight", "bold");
            break;
        default:
        }
    });

    body.on("mouseout focus", ".cbwBox ul li a", function() {
        $(this).css("text-decoration", "none");
        $(this).css("font-weight", "normal");
    });

    body.on("keydown", ".ulDiv ul li a", function(e) {
        var key = e.keyCode;
        switch (key) {
        case 37:
            $(this).parent().prev().find("a").focus();
            break;
        case 38:
            $(this).parent().prev().find("a").focus();
            break;
        case 39:
            $(this).parent().next().find("a").focus();
            break;
        case 40:
            $(this).parent().next().find("a").focus();
            break;
        default:
        }
    });

    body.on("keydown", ".gnb li a", function(e) {
        var key = e.keyCode;
        switch (key) {
        case 37:
            $(this).parent().prev().find("a").focus();
            break;
        case 38:
            $(this).parent().prev().find("a").focus();
            break;
        case 39:
            $(this).parent().next().find("a").focus();
            break;
        case 40:
            $(this).parent().next().find("a").focus();
            break;
        break;
    default:
    }
}    );

    body.on("keydown", ".headerEtc a", function(e) {
        var key = e.keyCode;
        switch (key) {
        case 37:
            $(this).parent().prev().find("a").focus();
            break;
        case 38:
            $(this).parent().prev().find("a").focus();
            break;
        case 39:
            $(this).parent().next().find("a").focus();
            break;
        case 40:
            $(this).parent().next().find("a").focus();
            break;
        default:
        }
    });

    body.on("keydown", ".ca ul li a", function(e) {
        var key = e.keyCode;
        switch (key) {
        case 37:
            $(this).parent().prev().find("a").focus();
            break;
        case 38:
            $(this).parent().prev().find("a").focus();
            break;
        case 39:
            $(this).parent().next().find("a").focus();
            break;
        case 40:
            $(this).parent().next().find("a").focus();
            break;
        default:
        }
    });

    body.on("keydown", ".ma ul li a", function(e) {
        var key = e.keyCode;
        switch (key) {
        case 37:
            $(this).parent().prev().find("a").focus();
            break;
        case 38:
            $(this).parent().prev().find("a").focus();
            break;
        case 39:
            $(this).parent().next().find("a").focus();
            break;
        case 40:
            $(this).parent().next().find("a").focus();
            break;
        default:
        }
    });
    body.on("click", "#developer h3 a", function(e) {
        apiLogWrite2("G0", "G40", "메인페이지 화면", $(this).text(), "00", "없음");
        window.open("/developer/html/home.html");
    });
    body.on("click", "#developer .type02 a:eq(0)", function(e) {
        apiLogWrite2("G0", "G41", "메인페이지 화면", $(this).text(), "00", "없음");
        window.open("/developer/html/develop/dvp_2.html");
    });
    body.on("click", "#developer .type02 a:eq(1)", function(e) {
        apiLogWrite2("G0", "G43", "메인페이지 화면", $(this).text(), "00", "없음");
        window.open("/developer/html/openApi/api/data.html");
    });
    body.on("click", "#developer .type02 a:eq(2)", function(e) {
        apiLogWrite2("G0", "G42", "메인페이지 화면", $(this).text(), "00", "없음");
        window.open("/developer/html/openApi/api/map.html");
    });

    body.on("click", "#shortcut h3", function(e) {
        apiLogWrite2("G0", "G30", "메인페이지 화면", $(this).text(), "00", "없음");
        window.location.href = contextPath
                + "/contents/shortcut/shortcut_05_02.jsp";
    });
    body.on("click", "#shortcut a:eq(0)", function(e) {
        apiLogWrite2("G0", "G31", "메인페이지 화면", $(this).text(), "00", "없음");
        e.stopPropagation();
        window.location.href = contextPath
                + "/contents/shortcut/shortcut_05.jsp";
    });
    body.on("click", "#shortcut a:eq(1)", function(e) {
        apiLogWrite2("G0", "G32", "메인페이지 화면", $(this).text(), "00", "없음");
        e.stopPropagation();
        window.location.href = contextPath
                + "/contents/shortcut/shortcut_05_03_step01.jsp";
    });
    body.on("click", "#shortcut a:eq(2)", function(e) {
        apiLogWrite2("G0", "G33", "메인페이지 화면", $(this).text(), "00", "없음");
        e.stopPropagation();
        window.location.href = contextPath
                + "/contents/shortcut/shortcut_05_01.jsp";
    });
    body.on("click", ".Popup_close1", function(e) {
        $(".Popup_main").remove();
    });
    body.on("click", ".Popup_close2", function(e) {
        $(".Popup_main").remove();
    });
    body.on("click", ".Popup_close3", function(e) {
        closeWin('Popup_main', 1);
    });

    // 활용사례 슬라이드
    $(".icoSlide").slick({
        slidesToShow : 4,
        slidesToScroll : 2,
        arrows : false,
        infinite : false,
        dots : false
    });
    $("body").on("click", ".micoPrev", function(e) {
        $('.icoSlide').slick("slickPrev");
    });
    $("body").on("click", ".micoNext", function(e) {
        $('.icoSlide').slick("slickNext");
    });

    // 메인화면 최근목록 조회
    $.ajax({
        method : "POST",
        async : false,
        url : contextPath + "/ServiceAPI/common/MainRecentLists.json",
        success : function(res){
            if (res.errCd == "0") setMainRecentLists(res.result);
            else messageAlert.open("알림", res.errMsg);
        }
    });

    setBoardViewAll();

    // 2019.08.09 생성
    function setBoardViewAll() {
        jQuery.ajax({
            type : "POST",
            url : "/ServiceAPI/main/mainBBoardInfo.json",
            data : {"gubun" : "allAtOnce"},
            success : function(data) {
                var cont_board_001 = "<strong>공지사항</strong><ul>";
                var cont_board_002 = "<strong>FAQ</strong><ul>";
                var cont_board_003 = "<strong>Q&A</strong><ul>";
                var cont_cmmnty    = "<strong>지역현안 소통지도</strong>";
                var cont_gallery   = "<strong>통계갤러리</strong>";

                var board_cd   = "";
                var post_no    = "";
                var post_title = "";
                var reg_ts     = "";
                var etc        = "";

                var url        = "";

                for (var i = 0; i < data.result.length; i++) {
                    board_cd   = data.result[i].board_cd.trim();
                    post_no    = data.result[i].post_no;
                    post_title = data.result[i].post_title;
                    reg_ts     = data.result[i].reg_ts_de;
                    etc        = data.result[i].etc;

                    if(board_cd == "BOARD_001"){  // 공지
                        url = "/view/board/expAndNoticeView?post_no="+post_no;
                        url = "javascript:logWriteAndMove(\'A0\', \'05\', \'01\', \'02\', \'\', \'\', \'" + url + "\', false)";

                        cont_board_001 += "<li>"
                                        + "    <a href=\"" + url + "\">"  + post_title + "</a>"
                                        + "    <span>" + reg_ts + "</span>"
                                        + "</li>";

                    }else if(board_cd == "BOARD_002"){ // FAQ
                        cont_board_002 += "<li>";

                        url = "/view/board/faqView?post_no=" + post_no + "&board_cd=BOARD_002";
                        url = "javascript:logWriteAndMove(\'A0\', \'05\', \'03\', \'02\', \'\', \'\', \'" + url + "\', false)";

                        cont_board_002 += "<a href=\"" + url + "\">"  + post_title + "</a>"
                                        + "<span>" + reg_ts + "</span>"
                                        + "</li>";

                    }else if(board_cd == "BOARD_003"){ // Q&A
                        cont_board_003 += "<li>";

                        if (data.result[i].etc == "THEMRQ")
                            url = "/view/board/qnaThemaView?post_no=" + post_no + "&boardType=Qna";
                        else
                            url = "/view/board/qnaView?post_no="       + post_no + "&boardType=Qna";

                        url = "javascript:logWriteAndMove(\'A0\', \'05\', \'02\', \'02\', \'\', \'\', \'" + url + "\', false)";

                        cont_board_003 += "<a href=\"" + url + "\">"  + post_title + "</a>"
                                        + "<span>" + reg_ts + "</span>"
                                        + "</li>";

                    }else if(board_cd == "cmmnty"){ // 지역현안소통지도
                        cont_cmmnty += "<div class='imgArticle clearFix'> ";

                        var map_id    = data.result[i].cmmnty_map_id;
                        var map_nm    = data.result[i].cmmnty_map_nm;
                        var open_date = data.result[i].reg_ts;
                        var path_nm   = data.result[i].imagepath;

                        var save_file_nm = data.result[i].save_file_nm;
                        var url = "/view/community/view?cmmnty_map_id=" + map_id;

                        url = "javascript:logWriteAndMove(\'A0\', \'05\', \'04\', \'02\', \'\', \'\', \'" + url + "\', false)";

                        cont_cmmnty += "<div style='height:114px;overflow:hidden;'><a style='height:100%;width:100%' href=\"" + url + "\">"
                                     + "    <img src='" + path_nm + "' onerror=\"this.src='/img/common/testimg01.png'\" alt='지도' width='100%;' height='100%;'></a></div> "
                                     + "    <div> "
                                     + "        <strong><a href=\"" + url + "\">" + map_nm    + "</a></strong> "
                                     + "    </div> "
                                     + "</div> ";

                    }else if(board_cd == "gallery"){ // 통계갤러리
                        var sgis_use_board_seq   = data.result[i].data_id;
                        var sgis_use_board_title = data.result[i].post_title;
                        var sgis_use_reg_dt      = data.result[i].reg_ts;
                        var sgis_use_param_info  = JSON.parse(data.result[i].param_info);

                        if (sgis_use_board_title != null && sgis_use_board_title.length > 40){
                        	sgis_use_board_title = sgis_use_board_title.substring(0, 38) + "";
                        }

                        var url = "/view/gallery/resultGallery?id=" + data.result[i].data_id + "&srv_type=" + data.result[i].srv_type;

                        url = "javascript:logWriteAndMove(\'A0\', \'05\', \'05\', \'02\', \'\', \'\', \'" + url + "\', false)";

                        cont_gallery += "<div class='imgArticle clearFix'>"
                                      + "    <div style='height:114px;overflow:hidden;'><a style='height:100%;width:100%' href=\"" + url + "\">"
                                      + "        <img src='/upload/gallery/preView/" + sgis_use_param_info.preViewImg.saveFileName + "' onerror=\"this.src='/img/common/testimg01.png'\" alt='지도' width='100%;' height='100%;'></a></div>"
                                      + "    <div>"
                                      + "        <strong><a href=\"" + url + "\">" + sgis_use_board_title + "</a></strong>"
                                      + "    </div>"
                                      + "</div>";
                    }
                } // for

                cont_board_001 += "<a href='javascript:logWriteAndMove(\"A0\", \"05\", \"01\", \"01\", \"\", \"\", \"/view/board/expAndNotice\", false);' class='btn_more'><span class='hidden'>더보기</span></a>";
                cont_board_002 += "<a href='javascript:logWriteAndMove(\"A0\", \"05\", \"03\", \"01\", \"\", \"\", \"/view/board/qnaAndRequestFaq?gubun=BOARD_002\", false);' class='btn_more'><span class='hidden'>더보기</span></a>";
                cont_board_003 += "<a href='javascript:logWriteAndMove(\"A0\", \"05\", \"02\", \"01\", \"\", \"\", \"/view/board/qnaAndRequestQna?gubun=BOARD_003\", false);' class='btn_more'><span class='hidden'>더보기</span></a>";
                cont_cmmnty    += "<a href='javascript:logWriteAndMove(\"A0\", \"05\", \"04\", \"01\", \"\", \"\", \"/view/community/intro\", false);' class='btn_more'><span class='hidden'>더보기</span></a>";
                cont_gallery   += "<a href='javascript:logWriteAndMove(\"A0\", \"05\", \"05\", \"01\", \"\", \"\", \"/view/gallery/resultGallery\", false);' class='btn_more'><span class='hidden'>더보기</span></a>";

                $("#board001"  ).html(cont_board_001 + "</ui>");
                $("#board002"  ).html(cont_board_002 + "</ui>");
                $("#board003"  ).html(cont_board_003 + "</ui>");
                $("#board000"  ).html(cont_cmmnty    ); // 지역현안 소통지도
                $("#shareTable").html(cont_gallery   ); // 통계갤러리

            },
            error : function(data) {
                console.log(":::::> error");
            }
        });
    }

    // 창열기
    function openWin(winName) {
        var blnCookie = getCookie(winName);
        var obj = eval("window." + winName);
        if (!blnCookie) {
            obj.style.display = "block";
        }
    }
    // 창닫기
    function closeWin(winName, expiredays) {
        setCookie(winName, "done", expiredays);
        var obj = eval("window." + winName);
        obj.style.display = "none";
    }
    function closeWinAt00(winName, expiredays) {
        setCookieAt00(winName, "done", expiredays);
        var obj = eval("window." + winName);
        obj.style.display = "none";
    }
    // 쿠키 가져오기
    function getCookie(name) {
        var nameOfCookie = name + "=";
        var x = 0;
        while (x <= document.cookie.length) {
            var y = (x + nameOfCookie.length);
            if (document.cookie.substring(x, y) == nameOfCookie) {
                if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                    endOfCookie = document.cookie.length;
                return unescape(document.cookie.substring(y, endOfCookie));
            }
            x = document.cookie.indexOf(" ", x) + 1;
            if (x == 0)
                break;
        }
        return "";
    }
    // 24시간 기준 쿠키 설정하기
    function setCookie(name, value, expiredays) {
        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
    }
    // 00:00 시 기준 쿠키 설정하기
    function setCookieAt00(name, value, expiredays) {
        var todayDate = new Date();
        todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);
        if (todayDate > new Date()) expiredays = expiredays - 1;
        todayDate.setDate(todayDate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
    }

});
