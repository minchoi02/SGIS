$(document).ready(function(e){
    modalClose();
    optionCon();
    //pointSelect();  //지도에서 지점 선택
    swipeBtn();
    //resultList();
    noticeBtn();
    //selfSelect();
    lifeIndustry();
});

//modal 닫기
function modalClose(){
	$('.btn__cancel').on('click', function(e){
		$("#information_check").attr("disabled", false);
		$("#interval_table .modal__body div p:eq(0)").hide();
		$("#interval_table .modal__body div p:eq(1)").hide();
		$('.modal').hide();
		$('.dim').hide();
        $('.map-info').hide();
        
	});
    $('.btn__submit').on('click', function(e){
    	$('.dim').hide();
    	$('.modal').hide();
	});
    $('.map__spot--close').on('click', function(e){
		$('.map__spot__tooltip').hide();
	});
    $('.btn__check').on('click', function(e){
    	$('.modal').hide();
    	$('.dim').hide();
    })
}

//fillter
function optionCon(){
	$('.btn__option').on('click', function(e){
		$('.option').css("display","block");
	});
	$('.map__option--close').on('click',function(e){
		$('.option').css("display","none");
	});
}

//지도에서 지점 선택 radio
function pointSelect() {
    $('.btn__spot').on('click', function(e){
        $('.point__select').stop().fadeIn(500);
    });
  
}

//하단 메뉴 (map__search)
function swipeBtn() { 
	$('#slide-area').on('click', function (e) {
		$('#slide-area .btn-slideup span').hide();
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			 $(".map__below").animate({
                 'height' : '50px'
             },400,function(){
            	 $(".map__slideup").prop("style","box-shadow: none;");
                 $(".map__form.active").css("display", "block");
                 $(".map__result__con.active").css("display", "block");
                 $(".life-industry.active").css("display", "block");
             });
			$(".map__search").animate({
				'height' : '50px'
			},400,function(){
				$(".map__slideup").prop("style","box-shadow: none;");
				$(".map__form").css("display", "none");
				$(".map__result__con").css("display", "none");
				$(".life-industry").css("display", "none");
			});
			$('.slide_up').css("display","block");
		} else {
			$('.modal.point__confirm').hide();
			$(this).addClass('on');
			$(".map__search").animate({
				'height' : '95%'
			},400,function(){
				$(".map__slideup").prop("style","box-shadow: none;");
				$(".map__form.active").css("display", "block");
				$(".map__result__con.active").css("display", "block");
				$(".life-industry.active").css("display", "block");
			});
			 $(".map__below").animate({
	                'height' : '90%'
	            },400,function(){
	                $(".swiper_menu.active").css("display", "block");
	                $(".map__facility__con").css("height", $(".map__search").css("height")*0.8);
	            });   
			 $('.sop-tooltip.sop-zoom-animated.sop-tooltip-right').remove();
			 $('#grid_click').hide();
			 $('.slide_down').css("display","block");
		}
	});


}

//검색결과 후
function resultList(){
    $('.map__result__list li').on('click', function (e) {
        if($(this).hasClass('on')){
            $(this).removeClass('on');
            $(this).children().find('img').attr('src','/mobile/resources/m2021/images/map/i_pin--off.png');
        }else{
            $(this).addClass('on');
            $(this).children().find('img').attr('src','/mobile/resources/m2021/images/map/i_pin--on.png');
            $('.map__result__list li').not(this).removeClass('on');
            $('.map__result__list li').not(this).children().find('img').attr('src','/mobile/resources/m2021/images/map/i_pin--off.png');
        }	
    });
}

//고정 값 선택 (영역 설정 안내)
function noticeBtn(){
    $('.area-notice__btn').on('click', function (e) {
        if($(this).hasClass('on')){
            $(this).removeClass('on');
            $(this).find('img').css('transform','rotate(0deg)');
            $(this).prev('.area-notice__con').css('height','0');
            $(this).prev().prev('.area-notice__tit').css('height','100%');
        }else{
            $(this).addClass('on');
            $(this).find('img').css('transform','rotate(180deg)');
            $(this).prev('.area-notice__con').css('height','100%');
            $(this).prev().prev('.area-notice__tit').css('height','0');
        }	
    });
}
//생활권역 설정 (직접입력)
function selfSelect(){
    $('.self-select__con')
        .hide()
        .first()
        .show();
    $('.self-select__tab li').on('click', function (e) {
        var cnt = $(this).index();
        $(this).addClass('on');
        $('.self-select__tab li').not(this).removeClass('on');
        $('.self-select__con')
            .hide()
            .eq(cnt)
            .stop()
            .fadeIn();
    });
    $('.self-select__form').on('click', function (e) {

    });
}

//사업체 주요 생활 업종
function lifeIndustry(){
    $('.life-industry__change__layer .btn__cancel').on('click', function (e) {
        $('.life-industry__change__layer').hide();
    })

    $('.life-industry__select').on('click', function (e) {
        $('.life-industry__select__layer').show();
    });
    $('.life-industry__select__layer .btn__cancel').on('click', function (e) {
        $('.life-industry__select__layer').hide();
    });

    $('.life-industry__select__result input').on('click', function (e) {
        if($(this).parent().parent().parent().hasClass('on')){
            $(this).parent().parent().parent().removeClass('on');
            $(this).parent().parent().next().find('img').css('transform','rotate(-90deg)');
            $(this).parent().parent().next().find('.detail').hide();
        }else{
            $(this).parent().parent().parent().addClass('on');
            $('.life-industry__select__result input').not(this).parent().parent().parent().removeClass('on');
            $(this).parent().parent().next().find('img').css('transform','rotate(0deg)');
            $('.life-industry__select__result input').not(this).parent().parent().next().find('img').css('transform','rotate(-90deg)');
            $(this).parent().parent().next().find('.detail').show();
            $('.life-industry__select__result input').not(this).parent().parent().next().find('.detail').hide();
        }	
    });
}