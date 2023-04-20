<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>내주변통계</title>
<meta name="title" content="내주변통계">
<%-- <link rel="stylesheet" href="${ctx }/resources/m2020/plugins/swiper.css" /> --%>
<%-- <script src="${ctx }/resources/m2020/plugins/swiper.min.js" type="text/javascript"></script>
<!-- 하단 리스트 위 아래 Swipe 이벤트 -->
<%-- <script src="${ctx }/resources/m2020/plugins/jquery.touchSwipe.min.js" type="text/javascript"></script> --%>
<%-- <script src="${ctx }/resources/m2020/js/jquery.touchFlow.js" type="text/javascript"></script> --%>

<%-- <link rel="stylesheet" href="${ctx }/resources/m2020/plugins/swiper.css" />--%>
<link rel="stylesheet" href="${ctx }/resources/m2020/css/subpage.css" />
<script src="${ctx }/resources/m2020/js/subpage.js" type="text/javascript"></script>
<%-- <script src="${ctx }/resources/m2020/js/jquery-1.12.0.min.js" type="text/javascript"></script> --%>

<script>
//<![CDATA[
$(document).ready(function() {
	/* // 스와이프
	$("#touchFlow").touchFlow({
		axis: "x",
		page: $("#touchFlow li.on").index()
	});
	
	$("#lifeFlow").touchFlow({
		axis: "x",
		page: $("#lifeFlow li.on").index()
	});
	
	
	srvLogWrite('M0','11','01','00','',''); // 일자리 통계정보 메인
	*/
});
//]]>
</script>

<%-- <script src="${ctx }/resources/m2020/js/statsMe/statsMeMap.js"></script> --%>
<%-- <script src="${ctx }/resources/js/map/sample/sampleMap.js"></script> --%>
</head>



<body>
    <!-- header영역 --> 
    <div class="datatit">
        <h2>데이터보드</h2>
    </div> 
    <div class="sub_Wrap">
    <!-- Swiper -->
    <div class="swiper-container gallery-thumbs02">
      <div class="swiper-wrapper" style="margin-bottom: 15px;">
        <div class="swiper-slide tabDataboard02">
          <p>그래프</p>
        </div>
        <div class="swiper-slide tabDataboard02">
          <p>표</p>
        </div> 
      </div>
    </div>

    <div class="swiper-container gallery-top" style="height: 620px; position: absolute; overflow: auto;">
      <div class="swiper-wrapper">
        <div class="swiper-slide Con">
          <div class="conTit mlr16">
            <h5>총인구(명)[출처:통계청, 인구주택총조사(2018)]</h5>
          </div>
          <div class="conWrap">
            <p class="subtit">가산동_01</p>
            <p class="num">1,250<span>명</span></p>
            <div class="graphArea">
              <img src="${ctx }/resources/m2020/images/sub/sample.png" />
            </div>
            <div class="mapBtnWrap">
              <a href="${ctx }/m2020/map/current/currentMap.sgis">지도보기</a>
            </div>
          </div>
        </div>
        <div class="swiper-slide Con">
          <div class="conTit mlr16">
            <h5>총인구(명)[출처:통계청, 인구주택총조사(2018)]</h5>
          </div>
          <div class="conWrap">
              <div class="tb_wrap">
                <div class="tb_box">
                  <table class="tb">
                    <tr class="fixed_top">
                      <th class="cell1" scope="col">항목</th>
                      <th class="cell2" scope="col">집계구번호</th>
                      <th class="cell3" scope="col">순위</th>
                      <th class="cell3" scope="col">총 인구</th>
                      <th class="cell4" scope="col">비율(%)</th>
                    </tr>
                    <tr>
                      <th class="cell1" scope="row">가산동_01</th>
                      <td class="cell2">1118051020001</td>
                      <td class="cell3">1</td>
                      <td class="cell4">1,294</td>
                      <td class="cell4">6.7</td>
                    </tr>
                    <tr>
                      <th class="cell1" scope="row">가산동_02</th>
                      <td class="cell2">1118051040009</td>
                      <td class="cell3">1</td>
                      <td class="cell4">889</td>
                      <td class="cell4">4.6</td>
                    </tr>
                    <tr>
                      <th class="cell1" scope="row">가산동_03</th>
                      <td class="cell2">1118051040003</td>
                      <td class="cell3">1</td>
                      <td class="cell4">761</td>
                      <td class="cell4">3.9</td>
                    </tr>
                    <tr>
                      <th class="cell1" scope="row">가산동_04</th>
                      <td class="cell2">1118051030001</td>
                      <td class="cell3">1</td>
                      <td class="cell4">693</td>
                      <td class="cell4">3.6</td>
                    </tr>
                    <tr>
                      <th class="cell1" scope="row">가산동_05</th>
                      <td class="cell2">1118051030005</td>
                      <td class="cell3">1</td>
                      <td class="cell4">609</td>
                      <td class="cell4">3.2</td>
                    </tr>
                    <tr>
                      <th class="cell1" scope="row">가산동_06</th>
                      <td class="cell2">1118051030706</td>
                      <td class="cell3">1</td>
                      <td class="cell4">601</td>
                      <td class="cell4">3.1</td>
                    </tr>
                    <tr>
                      <th class="cell1" scope="row">가산동_07</th>
                      <td class="cell2">1118051030703</td>
                      <td class="cell3">1</td>
                      <td class="cell4">588</td>
                      <td class="cell4">3.0</td>
                    </tr>
                    <tr>
                      <th class="cell1" scope="row">가산동_08</th>
                      <td class="cell2">1118051030707</td>
                      <td class="cell3">1</td>
                      <td class="cell4">573</td>
                      <td class="cell4">3.0</td>
                    </tr>
                    <tr>
                      <th class="cell1" scope="row">가산동_09</th>
                      <td class="cell2">1118051030401</td>
                      <td class="cell3">1</td>
                      <td class="cell4">570</td>
                      <td class="cell4">2.9</td>
                    </tr>
                    <tr>
                      <th class="cell1" scope="row">가산동_10</th>
                      <td class="cell2">1118051010002</td>
                      <td class="cell3">1</td>
                      <td class="cell4">557</td>
                      <td class="cell4">2.9</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="mapBtnWrap">
              <a href="${ctx }/m2020/map/current/currentMap.sgis">지도보기</a>
            </div>
          </div>
        </div> 
        </div>
      </div>
    </div> 
    
    <!-- Initialize Swiper -->
    <script>
      var galleryThumbs = new Swiper('.gallery-thumbs02', {
        spaceBetween: 0,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });
      var galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        thumbs: {
          swiper: galleryThumbs
        }
      });
    </script>
</div>
 
</body>