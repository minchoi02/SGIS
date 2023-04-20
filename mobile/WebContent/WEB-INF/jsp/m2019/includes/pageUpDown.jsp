<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script>
var scrollTimeoutId;
$(window).scroll(function(){
	if(scrollTimeoutId ){
		clearTimeout(scrollTimeoutId );  
	}
	scrollTimeoutId = setTimeout(function(){
		var path = contextPath+"/resources/images/map/icon/";
		if($(window).scrollTop()>0){
			$("div[data-id=scroll-up-down].Btn_viewchange img").attr("src",path+"icon_up.png");
		}else{
			$("div[data-id=scroll-up-down].Btn_viewchange img").attr("src",path+"icon_down.png");
		}
	}, 100);
});
$(document).ready(function(){
	//위아래 스크롤 이벤트
	$("div[data-id=scroll-up-down].Btn_viewchange").click(function(){
		if($(window).height()!=$(document).height()){
			var img = $("div[data-id=scroll-up-down].Btn_viewchange").children("img");
			var scrollTop = 0;
			if(img.attr("src")==contextPath+"/resources/images/map/icon/icon_down.png"){
				scrollTop = $(document).height();
			}
			$("html,body").stop().animate({
				scrollTop: scrollTop
			}, 300);
		}
		return false;
	});
});
</script>
<!-- 
<div class="Btn_viewchange" data-id="scroll-up-down">
	<img src="${ctx }/resources/images/map/icon/icon_down.png" alt="페이지 하단으로 이동">
</div>
 -->