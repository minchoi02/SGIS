// menu 
$(function(){       
    var depth = $('nav .depth');
    var headerBg = $('.headerBg')

    $('.headerBg').css({ height: depth.outerHeight(true) + 45 });
    $('header').mouseleave(function(){
        $(this).css({ height: 100 });
        $(this).removeClass('on');

    });

    $('header').mouseenter(function(){
        $(this).css({ height: headerBg.outerHeight(true) + 100 });
        $(this).addClass('on');
    });
    
});

// popup
$(function(){   
    $(".popup .btnClose").click(function(){
        $(".popup").removeClass("on");
    });

    $(".cmntWrap .btnClose").click(function(){
        $(".cmntWrap").removeClass("on");
    });

    $("button").click(function(){
        if($(this).text() == "닫기" || $(this).text() == "취소"){
            $(".popup").removeClass("on");
        }
    });
});

//select box
$(function(){  
    $(".select ul li").click(function(){
        $(this).closest('.select').find("span").text($(this).text());
        $(this).closest('.select').find("input").prop("checked",false);
    });

});

