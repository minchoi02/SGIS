<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<%@page contentType="text/html; charset=UTF-8" %>
<style type="text/css">
#new-mobile-2021 .m-popup{
          top: -10px;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999999;
        position: fixed;
    }
#new-mobile-2021 .dimmed{
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999999;
        overflow: hidden;
        position: fixed;
        background: #000;
        opacity: 0.6;
    }

#new-mobile-2021 .m-content{
        height: 100%;
        text-align: center;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        padding: 0 12px;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
    }

#new-mobile-2021 .m-container:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }

#new-mobile-2021 .m-content{
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin: 0 auto;
        text-align: left;
        z-index: 505;
    }
#new-mobile-2021 .m-dialog{
      max-width:750px;margin: 0 auto;position: relative;
    }
#new-mobile-2021 .m-dialog img{display: block;width: 100%;}

#new-mobile-2021 .m-dialog .m-popup-close,
#new-mobile-2021 .m-dialog .link-1,
#new-mobile-2021 .m-dialog .link-2,
#new-mobile-2021 .m-dialog .link-3,
#new-mobile-2021 .m-dialog .link-4,
#new-mobile-2021 .m-dialog .link-5,
#new-mobile-2021 .m-dialog .link-6{
      display: block;
      position: absolute;
      font-size: 0;
    }
#new-mobile-2021 .m-dialog .m-popup-close{
        width: 5%;height: 3%;
        right: 3%;
        top: 2%;
    }
#new-mobile-2021 .m-dialog .link-1,
#new-mobile-2021 .m-dialog .link-2,
#new-mobile-2021 .m-dialog .link-3{
      bottom: 3.5%;
      width: 20%;
      height: 3.5%;
    }
#new-mobile-2021 .m-dialog .link-4,
#new-mobile-2021 .m-dialog .link-5,
#new-mobile-2021 .m-dialog .link-6{
        height: 28%;bottom:8%;width:29%;
    }
#new-mobile-2021 .m-dialog .link-3{}
#new-mobile-2021 .m-dialog .link-1{left: 9%;}
#new-mobile-2021 .m-dialog .link-2{left: 40%;}
#new-mobile-2021 .m-dialog .link-3{left: 71%;}
#new-mobile-2021 .m-dialog .link-4{left: 5%;}
#new-mobile-2021 .m-dialog .link-5{left: 36%;}
#new-mobile-2021 .m-dialog .link-6{right:5%}
</style>
 
<div id="new-mobile-2021" style="display:none;">
	<!-- <div class="dimmed"></div>-->
	<!-- 
	<div class="m-popup">
		<div class="m-container">
	        <div class="m-content">
	            <div class="m-dialog">
	                <img src="${ctx }/resources/m2021/popup/img.png" alt="SGIS 모바일 신규콘텐츠 시범서비스 오픈">
	                <button type="button" title="팝업닫힘" class="m-popup-close" onclick="$('#new-mobile-2021').hide();">닫기</button>
	                <a href="${ctx }/m2021/map/catchmentareaMap.sgis" title="페이지 이동" class="link-1">생활권역 통계지도 바로가기</a>
					<a href="${ctx }/m2021/map/totSurv.sgis?theme=population" title="페이지 이동" class="link-2">총조사 바로가기</a>
					<a href="${ctx }/m2021/map/administStats.sgis?theme=newly" title="페이지 이동" class="link-3">행정통계 시각화 바로가기</a>
	                <a href="${ctx }/m2021/map/catchmentareaMap.sgis" title="페이지 이동" class="link-4">사이트이동</a>
	                <a href="${ctx }/m2021/map/totSurv.sgis?theme=population" title="페이지 이동" class="link-5">사이트이동</a>
	                <a href="${ctx }/m2021/map/administStats.sgis?theme=newly" title="페이지 이동" class="link-6">사이트이동</a>
	            </div>
	        </div>
	    </div>
	          --> 
<!-- 		<div class="m-container"> -->
<!-- 			<div class="m-content"> -->
<!-- 				<div class="m-dialog"> -->
<%-- 					<img src="${ctx }/resources/m2021/popup/img.png" alt="SGIS 모바일 신규콘텐츠 시범서비스 오픈"> --%>
<!-- 					<button type="button" title="팝업닫힘" class="m-popup-close" onclick="$('#new-mobile-2021').hide();">닫기</button> -->
<%-- 					<a href="${ctx }/m2021/map/catchmentareaMap.sgis" title="페이지 이동" class="link-1">생활권역 통계지도 바로가기</a> --%>
<%-- 					<a href="${ctx }/m2021/map/totSurv.sgis?theme=population" title="페이지 이동" class="link-2">총조사 바로가기</a> --%>
<%-- 					<a href="${ctx }/m2021/map/administStats.sgis?theme=newly" title="페이지 이동" class="link-3">행정통계 시각화 바로가기</a> --%>
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 		</div> -->
	<!-- </div> -->
	  
</div>
<!--
<div style="position:fixed;right:10px;top:25%;z-index:1000;">
	<button onclick="location.href='${ctx }/researchPOP.jsp'" type="button" style="color: #fff;background-color: #dc3545;border-color: #dc3545;display: inline-block;font-weight: 400;text-align: center;white-space: nowrap;vertical-align: middle;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;border: 1px solid transparent;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;border-radius: .25rem;transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;">의견등록</button>
</div>
-->