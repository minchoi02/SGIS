<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGIS 에듀 > 고교 </title>
	<link rel="stylesheet" href="/sgis_edu/resource/css/base.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/common.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/main_high.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/high.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/slick.css">
	<link rel="shortcut icon" href="/sgis_edu/resource/images/favicon.ico">
	
	<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
	<script type="text/javascript" src='/js/plugins/jquery.form.js'></script>
	
	<script type="text/javascript" src="/js/plugins/jquery.sha256.js"></script>
	<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
	<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>
	
	<script type="text/javascript" src="/js/common/common.js"></script>
	<script type="text/javascript" src="/sgis_edu/resource/js/common.js?ver=123"></script>
	
	<script type="text/javascript" src="/sgis_edu/resource/js/slick.min.js"></script>
	<script type="text/javascript" src="/sgis_edu/resource/js/high/main.js"></script>
</head>
<body>
	<!-- START::: 에듀  Header -->
    <jsp:include page="/view/edu/high/header"></jsp:include>
	<!-- END::::: 에듀  Header -->
	<div>
        <section class="sect sect01">
               <div class="inner">
                    <form class="searchForm" onsubmit="return false;" autocomplete="off" >
                        <fieldset>
                            <i class="hashTag"></i>
                            <input type="search" class="search" id="searchInput" placeholder="를 찾고 싶으세요?">
                            <button type="button" class="btnSearch">검색</button>
                            <ul id="relationKwrdDiv" class=""><!-- addClass on 시 보임  -->
<!--                                 <li>인구</li> -->
                            </ul>
                        </fieldset>
                    </form>
                    <ul class="hashTagWrap">
                        <li><a href="javascript:logWriteAndMove('/view/edu/high/searchAll?kwrd=다문화','T0','05','01','03','H','kwrd=다문화')" class="hashTag">다문화</a></li>
                        <li><a href="javascript:logWriteAndMove('/view/edu/high/searchAll?kwrd=1인가구','T0','05','01','03','H','kwrd=1인가구')" class="hashTag">1인가구</a></li>
                        <li><a href="javascript:logWriteAndMove('/view/edu/high/searchAll?kwrd=다문화','T0','05','01','03','H','kwrd=노령화지수')" class="hashTag">노령화지수</a></li>
                        <li><a href="javascript:logWriteAndMove('/view/edu/high/searchAll?kwrd=다문화','T0','05','01','03','H','kwrd=인구피라미드')" class="hashTag">인구피라미드</a></li>
                    </ul>
               </div>
        </section>
        <section class="sect sect02">
            <div class="inner">
                <div>
                    <p class="sectTi">주제별<br/>인기 검색어</p>
                    <div class="slideNum">
                        <strong></strong><i></i>
                    </div>
                </div>
                <div class="slideWrap" style="width:960px;">
                    <div class="slideBox" id="slideBox">
                    </div>
                </div>
            </div>
        </section>
        <section class="sect sect03">
            <div class="inner">
                <p class="sectTi"><strong>배우는 지도</strong>로 선생님, 친구들과 공부를!</p>
                <ul class="card card03" id="tchpgmDiv">
<!--                     <li class="new"> -->
<!--                         <a> -->
<!--                             <em class="cardTi">둘이 먹다 한 명 죽는 떡볶이집 같이 지도로 만들어보아요</em> -->
<!--                             <i class="hashTag">맛집 지도</i> -->
<!--                             <i class="hashTag">맛집 지도</i> -->
<!--                             <span class="cardInfo"> -->
<!--                                 <i class="userId">superguest</i> -->
<!--                                 <i class="date">2021.12.31</i> -->
<!--                                 <i class="viewer">112</i> -->
<!--                             </span> -->
<!--                         </a> -->
<!--                     </li> -->
                </ul>
                <button type="button" onclick="javascript:logWriteAndMove('/view/edu_gallery/resultGallery?param_ss_school_grade=H','T0','05','01','05','H','')" class="btn btnN01 btnArr">지금 배우러가기</button>
            </div>
        </section>
        <section class="sect sect04">
            <div class="inner">
                <p class="sectTi"><strong>함께하는 지도</strong>로 우리 지역 현안을!</p>
                <ul class="card card02" id="withMapDiv">
<!--                     <li class="new"> -->
<!--                         <a> -->
<!--                             <span class="cardHead"> -->
<!--                                 <i class="level level01"></i> -->
<!--                             </span> -->
<!--                             <em class="cardTi">둘이 먹다 한 명 죽는 떡볶이집 같이 지도로 만들어보아요</em> -->
<!--                             <i class="hashTag">맛집 지도</i> -->
<!--                             <i class="hashTag">맛집 지도</i> -->
<!--                             <span class="cardInfo"> -->
<!--                                 <i class="userId">superguest</i> -->
<!--                                 <i class="date">2021.12.31</i> -->
<!--                                 <i class="viewer">112</i> -->
<!--                             </span> -->
<!--                             <span class="people">352</span> -->
<!--                         </a> -->
<!--                     </li> -->
                  
                </ul>
                <button type="button"  onclick="javascript:logWriteAndMove('/view/edu/high/community/together_list','T0','05','01','07','H','')" class="btn btnN01 btnArr">지금 함께하기</button>
            </div>
        </section>
        <section class="sect sect05">
            <div class="inner boardWrap">
                <article class="board notice">
                    <em class="sectTi">에듀 소식</em>
                    <ul id="board12List">
<!--                         <li> -->
<!--                             <a> -->
<!--                                 <span>[오픈] 7일 끝 All-in-One 문항 강좌 오픈 안내[오픈] 7일 끝 All-in-One 문항 강좌 오픈 안내</span> -->
<!--                                 <span class="date">2021.12.31</span> -->
<!--                             </a> -->
<!--                         </li> -->
                    </ul>
                    <a href="javascript:logWriteAndMove('/view/edu/high/boardList?board_cd=BOARD_012','T0','05','01','09','','')" class="more">더보기</a>
                </article>
                <article class="board faq">
                    <em class="sectTi">궁금해요</em>
                    <ul id="board13List">
                    </ul>
                    <a href="javascript:logWriteAndMove('/view/edu/high/boardList?board_cd=BOARD_013','T0','05','01','11','','')" class="more">더보기</a>
                </article>
            </div>
        </section>
    </div>
	
	<!-- START::: 에듀  Footer -->
	<jsp:include page="/view/edu/footer"></jsp:include>
	<!-- END::::: 에듀  Footer -->
</body>

</html>