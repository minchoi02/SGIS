// 모두 옮길것 !!!

$(document).ready(function(e){
	//menuDropdown();
	tabMenu();

	// 확장 
//	$('.btn-extend-open').on('click', function(){
//		$('#wrap').addClass('_extend')
//	})
//	$('.btn-extend-close').on('click', function(){
//		$('#wrap').removeClass('_extend')
//	})

//	$('.since-button a').on('click', function(){
//		if($(this).is('.active')){
//			$(this).removeClass('active')	
//			$('.time-graph-pop').removeClass('active');
//			return false;
//		} else {
//			$(this).addClass('active')
//			$('.time-graph-pop').addClass('active');
//		}
//		return false;
//	})

//	var slider = new Slider("#history_slder", {
//		min: 1,
//		max: 9,
//		step: 1,
//		value: 1,
//		ticks: [1,2,3,4,5,6,7,8,9],
//		ticks_labels: ["2000", "2005", "2010", "2015", "2016", "2017", "2018", "2019", "2020"],
//	});
	
//	$('.btn-since-close').on('click', function(){
//		$('.time-graph-pop').hide();
//		$('.since-button a').removeClass('active')
//		return false;
//	})

//	$('.gnb-li > a').click(function(){
//
//		var _idx = $(this).parent().index() + 1;
//
//		if($(this).parent().is('.active')){
//
//		} else {
//			$(this).parent().addClass("active")
//			$(this).parent().siblings().removeClass("active");
//
//			$('.menu').show();
//			$('.menu-content').hide()
//			$('.menu-content-'+_idx+'').show()
//		}
//
//		return false;
//	})

//	$('.menu-close').click(function(){
//
//		$('.gnb-li').removeClass('active')
//	
//		$('.menu').show();
//		$('.menu').hide()
//		
//		
//
//		return false;
//	})

//	$('.time-graph-conbox .control').click(function(){
//		$(this).toggleClass('stop');	
//	})
});

//function menuDropdown(){
//	$('.menu-toggle').on('click',function(e){
//		$(this).parent('.menu-group').toggleClass('active');
//		$(this).next('.menu-list').stop().slideToggle();
//	});
//}

function tabMenu(){
	//$('.tab-con').hide().first().show();
	$('.tab-menu > li').on('click',function(e){
		var cnt = $(this).index();
		$(this).addClass('on');
		$('.tab-con').hide().eq(cnt).stop().fadeIn();
		$('.tab-menu > li').not(this).removeClass('on');
	});
}