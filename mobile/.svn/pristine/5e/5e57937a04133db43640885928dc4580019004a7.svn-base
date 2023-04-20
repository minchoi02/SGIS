$(document).ready(function(e){
    gnb();
});

function gnb(){
    //$('.sub-gnb').hide();
    $('.btn-menu').on('click', function(e){
		$('.nav').stop().animate({'right':'0'},500);
	});
	$('.btn-close').on('click',function(e){
		$('.nav').stop().animate({'right':'-100%'},500);
	});
    /*$('.gnb> li > a').on('click', function (e) {
        if($(this).hasClass('on')){
            $(this).removeClass('on');
            $(this).children().find('img').css('transform','rotate(0deg)');
            $(this).next().stop().slideUp();
        }else{
            $(this).addClass('on');
            $(this).next().stop().slideDown();
            $(this).children().find('img').css('transform','rotate(90deg)');
            $('.gnb> li > a').not(this).next().stop().slideUp();
            $('.gnb> li > a').not(this).removeClass('on');
            $('.gnb> li > a').not(this).children().find('img').css('transform','rotate(0deg)');
        }	
    });*/
}