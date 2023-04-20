$(function(){    
	
	fnObj.calendar();  
	fnObj.common(); 
	fnObj.gnb();

	fnObj.selectbox();
	$("html").stop().animate({opacity:1},1000);
	$(window).on("load resize", fnObj.isMobile);
});   
var isFrist = true;
fnObj = {   
	gnb:function(){ 
		$("body").on("click",".totalMenu",function(){
			var ck = $(this).hasClass("on"); 
			if(ck){
				$(this).removeClass("on");
				$("nav").hide();
			}else{
				$(this).addClass("on");
				$("nav").show();
			}
		}); 
	},
	isMobile:function(){
		var _width = window.innerWidth; 
		if(_width > 1024){ 
			$("nav").show(); 
			$(".totalMenu").addClass("on");
		}else{
			$("nav").hide(); 
			$(".totalMenu").removeClass("on");
		}
	},
	common:function(){  
		$("body").on("click",".btnTimeSetting",function(){
			var ck = $(this).hasClass("on");
			if(ck){
				$(this).removeClass("on");
				$(".timeSettingBox").removeClass("on");
			}else{
				$(this).addClass("on");
				$(".timeSettingBox").addClass("on");
				if(isFrist){
					isFrist =false;
					$(".timeSetter").focus();
					$(".timeSetter").focus();
					$(".ui-timepicker-wrapper").hide();
					$(".ui-timepicker-wrapper").css("opacity","1");
				}
				
			}
		});
		$("body").on("click",".sRight .sboxItem02 .fr .hCont .btnSwicth",function(){
			var ck = $(this).hasClass("on");
			if(ck){
				$(this).removeClass("on");
				$(".sRight .sboxItem02 .fr .hCont .btnSwicth span").text("ON");
			}else{
				$(this).addClass("on");
				$(".sRight .sboxItem02 .fr .hCont .btnSwicth span").text("OFF");
			}
		});
		
		$("body").on("mouseover","nav>ul>li>a",function(){
			$("nav ul li").removeClass("on");
			$(this).parents("li").eq(0).addClass("on");
		});
		$("body").on("mouseleave","nav",function(){
			$("nav ul li").removeClass("on"); 
		});
	 
		$("body").on("click",".analyticsBox .analyticsHeader ul li a",function(){
			$(".analyticsBox .analyticsHeader ul li a").removeClass("on");
			$(this).addClass("on");
		});
		$("body").on("click",".sLeft .sboxItem02 ul li a",function(){
			$(".sLeft .sboxItem02 ul li a").removeClass("on");
			$(this).addClass("on");
		});
		$(".chartSlide").slick({
			dots: true, slidesToShow: 3,
			responsive: [
				{
				  breakpoint: 1024,
				  settings: {
					slidesToShow: 1
				  }
				}
			]
		}); 
		$("body").on("click",".slideLeft",function(e){		
			$('.chartSlide').slick("slickPrev");	
		});		
		$("body").on("click",".slideRight",function(e){		
			$('.chartSlide').slick("slickNext");	
		});		
 
		
	},
	calendar:function(){ 
		$('.datepicker').datepicker({
			'format': 'yyyy-m-d',
			'autoclose': true
		});  
		$('.timeSetter').timepicker({ 'timeFormat': 'H:i:s' });
		  
	},  
	selectbox:function(){
		$(".select").attr("active","off");
		$("body").on("click",".select",function(){  // 셀렉트박스 style01 구현
			var sltActive = $(this).attr("active");
			if(sltActive=="off"){
				$(this).attr("active", "on");
				var sltName = $(this).attr("name");
				var sltWidth = $(this).innerWidth();
				var sltLeft = $(this).position().left;
				var sltTop = $(this).position().top+20;
				$("#"+sltName+"").css({"position":"absolute", "left":sltLeft+"px", "top":sltTop+"px", "width":sltWidth+"px"});
				$("#"+sltName+"").show();
			}else if(sltActive=="on"){
				$(this).attr("active", "off");
				var sltName = $(this).attr("name"); 
				$("#"+sltName+"").hide();
			} 
		});
		$("body").on("click",".selectOtion ul li",function(){ // 셀렉트리스트 구현
			$(this).parent().parent().prev('div.select').attr("active", "off");
			var sltValue = $(this).text();   
			$(this).parent().parent().prev('div.select').text(sltValue);
			$(".selectOtion").hide(); 
		});
		$(document).mousedown(function(event){   // 필요외 부분 클릭시 레이어 숨김 이벤트 
			for(a=0; a<$(".select").length; a++){
				var selectActive = $(".select:eq("+a+")").attr("active"); 
				if(selectActive == "on"){ 
					if(event.target.tagName == "LI"){ 
						return;
					}else if( event.target.className == "select"){
						return;
					}else{ 
						$(".select").attr("active","off");
						$(".selectOtion").hide();
					}
				}
			}     
		});
	}
}  

function popOpen(o){
	$(o).show();
}
function popClose(o){
	$(o).hide();
} 
