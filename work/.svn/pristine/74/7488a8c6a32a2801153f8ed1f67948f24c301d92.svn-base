$(function(){
	menu(); 
	content();
	set();
	faq();

	$('#charset01, #charset02, #charset03, .select, .select01, .chkAll, .chkEtc, .rdEtc').styler({
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
	$("body").on("click", ".sortLink a", function(){
		var dataValue = $(this).attr("data-value");
		$(".sortLink a").removeClass("on");
		$(this).addClass("on");
		$("#sortType").val(dataValue);
	});

	$("body").on("click", ".josabox a", function(){
		var ck = $(this).hasClass("on");
		if(ck){
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
		}
	});
	$("body").on("click", ".tgbox01 a", function(){
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
	$("body").on("click",".chkAll.jq-checkbox",function(){
		var ck = $(this).hasClass("checked"); 
		if(ck){
			$(".listTable02").find(".jq-checkbox").addClass("checked");
			$(".listTable02").find(".chkEtc").prop("checked", true);
		}else{
			$(".listTable02").find(".jq-checkbox").removeClass("checked");
			$(".listTable02").find(".chkEtc").prop("checked", false);
		}  
	}); 
	$("body").on("click",".tabBox a",function(){ 
		$(".tabBox a").removeClass("on");
		$(this).addClass("on");
	}); 
	$("body").on("click",".themaCategoryList dt a",function(){  
		var ck = $(this).hasClass("on");
		if(ck){
			$(".themaCategoryList dt a").removeClass("on");
			$(".themaCategoryList dd").hide();	
		}else{
			$(this).addClass("on");
			$(this).parents("dt").eq(0).next("dd").show();
		} 
	}); 
	$("body").on("click",".analysisTypeList a",function(){  
		$(".analysisTypeList a").removeClass("on");
		$(this).addClass("on");
	}); 

	$("body").on("mouseover",".btnUploadLink",function(){   
		$(this).parents(".rela").eq(0).find(".cont").show();
	}); 
	$("body").on("click",".contClose",function(){   
		$(this).parents(".cont").eq(0).hide();
	}); 

	$("body").on("click",".dbItemList dt a",function(){  
		var ck = $(this).hasClass("on");
		if(ck){
			$(".dbItemList dt a").removeClass("on");
			$(".dbItemList dd").show();	
		}else{
			$(this).addClass("on");
			$(this).parents("dt").eq(0).next("dd").hide();
		} 
	}); 
	$("body").on("click",".dataBoard .dbHeader a",function(){   
		$(".dataBoard").hide();
	});
	$("body").on("click",".analysisBufferList li a",function(){  
		$(".analysisBufferList li a").removeClass("on");
		$(this).addClass("on");
	}); 
	$("body").on("click",".chkList li a",function(){  
		$(".chkList li a").removeClass("on");
		$(this).addClass("on");
	}); 
	
	
	
	

	
	
	
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
			$(this).css("background","url(./img/btn_down.png) no-repeat center center")
			$(this).removeClass("on");  // 클래스 on 지운다.
		}else{
			$(this).parent().siblings(".box").show();
			$(this).css("background","url(./img/btn_up.png) no-repeat center center")
			$(this).addClass("on");    // 클래스 on 넣는다.
		}
	});
	
}
function selectSetter(id, setValue){
	var target1 = document.getElementById(id); 
	target1.value= setValue;
	var selectValue = target1.options[target1.selectedIndex].text;
	var target2 = "#"+id+"-styler"; 
	$(target2+ " .jq-selectbox__select-text").text(selectValue);
}