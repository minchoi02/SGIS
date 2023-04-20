var CommonUi = function(){
    this.gnbUi = function(){
        var $gnb = $("#gnb");
        var $subMenu = $(".subMenu");
        $gnb.find("li").on({
            mouseenter:function(){
               $(this).addClass("active");
               $(this).siblings().removeClass("active");
               $subMenu.show();
            }
        });
        $subMenu.find("a").on({
            mouseenter:function(){
                var idx = $(this).closest("ul").index();
                $gnb.find("li").eq(idx).addClass("active").siblings().removeClass("active");
            }
        })
        $subMenu.on({
            mouseleave:function(){
                $subMenu.hide();
                $gnb.find("li").removeClass("active");
            }
        })
    };

    this.searchBoxUi = function(){
        var $searchArea = $(".searchArea");
        var $btnSubmit = $(".btn_submit");
        var $btnSizeCtr = $(".btn_sizeCtr");
        var $inputTxt = $(".inputTxt");
        $btnSubmit.on({
            mouseenter:function(){
                $inputTxt.show();
            }
        });
        $btnSizeCtr.on({
            click:function(){
                $(this).closest(".searchArea").toggleClass("expand");
            }
        });
        $searchArea.on({
            mouseleave:function(){
                $inputTxt.hide();
                $(this).removeClass("expand");
            }
        });
    };

    this.mainTabUi = function(){
        var $mainTab = $(".mainTab");
        var $mainTabCont = $(".mainTabCont");
        $mainTab.find("a").on({
            click:function(e){
                var $li = $(this).closest("li");
                var idx = $li.index();
                var $mainTabCont = $(".mainTabCont");
                var $cont = $mainTabCont.find(".cont");

                if(!$li.hasClass("btnMore")) {
                    e.preventDefault();
                    $li.addClass("active").siblings().removeClass("active");
                }
                $cont.eq(idx).show().siblings().hide();
            }
        });
    };

    this.rollGraphUi = function(setTime){
        var $rollGraphArea = $(".rollGraphArea");
        var $controllBox = $rollGraphArea.find(".controllBox");
        var $rollGraph = $(".rollGraph");
        var $cont = $rollGraph.find(".cont");
        var idx = 0;

        var autoGraph = setInterval(function(){
            idx >= $cont.length-1 ? idx = 0 : idx = idx+1;
            $cont.eq(idx).show().siblings().hide();
            $controllBox.find(".pagination a").eq(idx).addClass("active").siblings().removeClass("active");
        }, setTime);

        $controllBox.find(".pagination a").on({
            click:function(){
                idx = $(this).index();
                $cont.eq(idx).show().siblings().hide();
            }
        });
        $controllBox.find(".controller button").on({
            click:function(){
                if($(this).hasClass("btn_prev")) idx <= 0 ? idx=$cont.length-1 : idx = idx-1;
                if($(this).hasClass("btn_next")) idx >= $cont.length-1 ? idx = 0 : idx = idx+1;
                if($(this).hasClass("btn_pause")) clearTimeout(autoGraph);                ;

                $controllBox.find(".pagination a").eq(idx).addClass("active").siblings().removeClass("active");
                $cont.eq(idx).show().siblings().hide();
            }
        })
    };

    this.serviceBannernUi = function(){
        var $serviceArea = $(".serviceArea");
        var $btnService = $serviceArea.find(".btnService");
        var $serviceCont = $serviceArea.find(".serviceCont ul");
        var $pagination = $serviceArea.find(".pagination");
        var idx = 0;
        $btnService.find("button").on({
            click:function(){
                if($(this).hasClass("btn_prev")){
                    $serviceCont.css("margin-left") == "-43px" ? $serviceCont.animate({"margin-left":"-281px"}) : $serviceCont.animate({"margin-left":"-43px"});
                }
                if($(this).hasClass("btn_next")){
                    $serviceCont.css("margin-left") == "-281px" ? $serviceCont.animate({"margin-left":"-43px"}) : $serviceCont.animate({"margin-left":"-281px"});
                }
                idx == 1 ? idx = 0 : idx = 1;
                $pagination.find("a").eq(idx).addClass("active").siblings().removeClass("active");
            }
        });
        $pagination.find("a").on({
           click:function(){
               if(idx==1){
                   $serviceCont.animate({"margin-left":"-43px"});
                   idx=0;
               }else{
                   $serviceCont.animate({"margin-left":"-281px"});
                   idx=1;
               }
           }
        });
    };

    this.swipeUi = function(){
        var $menuStatus = $(".row.type02");
        $menuStatus.find("button").on({
            click:function(){
                if($(this).hasClass("btn_prev")){
                    $menuStatus.find("ul li").last().clone().prependTo($menuStatus.find("ul"));
                    $menuStatus.find("ul li").last().remove();
                }

                if($(this).hasClass("btn_next")){
                    $menuStatus.find("ul li").first().clone().appendTo($menuStatus.find("ul"));
                    $menuStatus.find("ul li").first().remove();
                }
            }
        })
    };

    this.paginationUi = function(){
        var $pagination = $(".pagination");
        $pagination.find("a").on({
            click:function(e){
                e.preventDefault();
                $(this).addClass("active").siblings().removeClass("active");
            }
        })
    };

    this.paginationUi();
};
$(document).ready(function(){
    var commonUi = new CommonUi();
    commonUi.gnbUi(); //메인메뉴 영역
    commonUi.searchBoxUi(); //검색박스 영역
    commonUi.mainTabUi(); //메인탭 영역
    commonUi.rollGraphUi(5000); //메인 그래프 영역
    commonUi.swipeUi(); //대화형 통계지도 메뉴 영역
    commonUi.serviceBannernUi(); //활용서비스 영역

    if (typeof $('.main_slick').slick != 'undefined') {// Validation 추가 - 2018.10.22	ywKim	변경: 오류발생
	    $('.main_slick').slick({ //참조문서 : http://kenwheeler.github.io/slick/
	        dots: true,
	        rtl: false,
	        autoplay: true,
	        autoplaySpeed: 2000,
	    });
    } else {
    	console.log("★★★ $('.main_slick').slick not defined. ★★★")
    }

    $(".btnTop").on({
        click:function(e){
            e.preventDefault();
            $("html, body").animate({scrollTop:0});
        }
    })
});

$(document).ready(function() {
    $(".aside > ul > li > a").each(function() {
        $(this).click(function(e) {
            if ($(this).parent().hasClass("nochild")) {} else {
                if ($(this).hasClass("on")) {
                    //                  $(this).next("ul").slideUp(150).end().removeClass("on"); // 161114 netive G-Daerigon
                } else {
                    e.preventDefault();
                    $(".aside a.on + ul").slideUp(150);
                    $(".aside > ul > li > a").removeClass("on");
                    $(this).next("ul").slideDown(150).end().addClass("on");
                }
            }
        });
    });
});