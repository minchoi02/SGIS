$(function(){
	menu(); 
	content();
	set();
	faq();

	$('#charset01, #charset02, #charset03, .select, .select01, .chkAll, .chkEtc').styler({
		select: { 
			search: {limit: 10}
		}
	});
	$("body").on("click", ".btnGps, .btnTree, .btnFolder, .btnChk", function(){
		var ck = $(this).hasClass("on");
		if(ck){
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
		}
	});
	$("body").on("click",".chkAll.jq-checkbox",function(){
		var ck = $(this).hasClass("checked"); 
		if(ck){
			$(".listTable01").find(".jq-checkbox").addClass("checked");
			$(".listTable01").find(".chkEtc").prop("checked", true);
		}else{
			$(".listTable01").find(".jq-checkbox").removeClass("checked");
			$(".listTable01").find(".chkEtc").prop("checked", false);
		}  
	}); 
	/*$("body").on("click",".tabBox a",function(){ 
		$(".tabBox a").removeClass("on");
		$(this).addClass("on");
	}); */
});

function popClose(id){	
	$(id).hide();
}
function menu(){
	/**/
	
	$("body").on("mouseover",".topMenu ",function(){
		$(".subMenuWrap").stop().animate({"top":"95"},300);
		$(".subMenuWrap").css("display","block"); 
	});
	$("body").on("mouseleave",".subMenuWrap",function(){
		$(".subMenuWrap").stop().animate({"top":"85"},300);
		$(".subMenuWrap").css("display","none"); 
	});
	
	
}

function content(){
	/**/
	
	$("body").on("mouseover",".box01,.box02,.box03",function(){
		$(this).find(".contentBox").css("display","none");
		$(this).find(".contentBox_over").css("display","block"); 
	});
	$("body").on("mouseleave",".box01,.box02,.box03",function(){		
		$(this).find(".contentBox_over").css("display","none"); 
		$(this).find(".contentBox").css("display","block"); 
	});
	
	
}
function set(){
	/**/
	$(".dashbordTile button").click(function(){
		var ck = $(this).hasClass("on"); ///  클래스 on이 있으면 true  없으면 false 반환
		if(ck){ // true 이면
			$(".dashbordSet").hide();
			$(this).removeClass("on");  // 클래스 on 지운다.
		}else{
			$(".dashbordSet").show();
			$(this).addClass("on");    // 클래스 on 넣는다.
		}
	});
	
}
function faq(){
	/**/
	$(".faqBox button").click(function(){
		var ck = $(this).hasClass("on"); ///  클래스 on이 있으면 true  없으면 false 반환
		if(ck){ // true 이면
			$(this).parent().siblings(".box").hide();
			$(this).css("background","url(./img/btn_down.png)no-repeat center center")
			$(this).removeClass("on");  // 클래스 on 지운다.
		}else{
			$(this).parent().siblings(".box").show();
			$(this).css("background","url(./img/btn_up.png)no-repeat center center")
			$(this).addClass("on");    // 클래스 on 넣는다.
		}
	});
	
}
