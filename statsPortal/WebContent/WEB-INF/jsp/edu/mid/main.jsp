<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGIS 에듀 > 중학</title>
	<link rel="stylesheet" href="/sgis_edu/resource/css/base.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/common.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/main_mid.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/mid.css">
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
	<script type="text/javascript" src="/sgis_edu/resource/js/mid/main.js"></script>
</head>
<body>
	<!-- START::: 에듀  Header -->
    <jsp:include page="/view/edu/mid/header"></jsp:include>
	<!-- END::::: 에듀  Header -->
	
	<div>
        <section class="sect sect01 slideWrap">
                <div class="slideBox" id="slideBox">
                    <div class="slideObj">
                        <div class="inner">
                            <div class="slideNum">
                                <strong>1</strong><i>6</i>
                            </div>
                            <p></p>
                            <span></span>
                            <button type="button" onclick="location.href='class_list.html'" class="btn btnN02 btnArr">지금 스토리 알아보기</button>
                        </div>
                        <article class="sect sect02">
                            <div class="inner">
                                <ul class="card card01">
                                    <li>
                                        <a>
                                            <em class="cardTi"></em>
                                            <i class="hashTag"></i>
                                            <i class="hashTag"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <em class="cardTi"></em>
                                            <i class="hashTag"></i>
                                            <i class="hashTag"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <em class="cardTi"></em>
                                            <i class="hashTag"></i>
                                            <i class="hashTag"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </div>
                </div>
<!--                 <a class="btnPage01 prev"> -->
<!--                     <em>PREV</em> -->
<!--                     <i>이전<br/>주제보기</i> -->
<!--                 </a> -->
<!--                 <a class="btnPage01 next"> -->
<!--                     <em>NEXT</em> -->
<!--                     <i>다음<br/>주제보기</i> -->
<!--                 </a> -->
        </section>
        <section class="sect sect02">
            <div class="inner">
                <p class="sectTi"><strong>배우는 지도</strong>로 선생님, 친구들과 공부를!</p>
                <ul class="card card03" id="tchpgmDiv">
                    <li class="new">
                        <a>
                            <em class="cardTi"></em>
                            <i class="hashTag"></i>
                            <i class="hashTag"></i>
                            <span class="cardInfo">
                                <i class="userId"></i>
                                <i class="date">2021.12.31</i>
                                <i class="viewer"></i>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <em class="cardTi"></em>
                            <i class="hashTag"></i>
                            <i class="hashTag"></i>
                            <span class="cardInfo">
                                <i class="userId"></i>
                                <i class="date">2021.12.31</i>
                                <i class="viewer">112</i>
                            </span>
                        </a>
                    </li>
                </ul>
                <button type="button" onclick="javascript:logWriteAndMove('/view/edu_gallery/resultGallery?param_ss_school_grade=M','T0','04','01','04','M','')" class="btn btnN01 btnArr">지금 배우러가기</button>
            </div>
        </section>
        <section class="sect sect03">
            <div class="inner">
                <p class="sectTi"><strong>함께하는 지도</strong>로 우리 지역 현안을!</p>
                <ul class="card card02" id="withMapDiv">
                <!-- 
                    <li class="new">
                        <a>
                            <span class="cardHead">
                                <i class="level level01"></i>
                            </span>
                            <em class="cardTi">둘이 먹다 한 명 죽는 떡볶이집 같이 지도로 만들어보아요</em>
                            <i class="hashTag">맛집 지도</i>
                            <i class="hashTag">맛집 지도</i>
                            <span class="cardInfo">
                                <i class="userId">superguest</i>
                                <i class="date">2021.12.31</i>
                                <i class="viewer">112</i>
                            </span>
                            <span class="people">352</span>
                        </a>
                    </li>
                 -->
                </ul>
                <button type="button"  onclick="javascript:logWriteAndMove('/view/edu/mid/community/together_list','T0','04','01','06','M','')" class="btn btnN01 btnArr">지금 함께하기</button>
            </div>
        </section>
        <section class="sect sect04">
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
                    <a href="javascript:logWriteAndMove('/view/edu/mid/boardList?board_cd=BOARD_012','T0','04','01','08','M','')" class="more">더보기</a>
                </article>
                <article class="board faq">
                    <em class="sectTi">궁금해요</em>
                    <ul id="board13List">
                    </ul>
                    <a href="javascript:logWriteAndMove('/view/edu/mid/boardList?board_cd=BOARD_013','T0','04','01','10','M','')" class="more">더보기</a>
                </article>
            </div>
        </section>
    </div>
	
    <!-- START::: 에듀  Footer -->
	<jsp:include page="/view/edu/footer"></jsp:include>
	<!-- END::::: 에듀  Footer -->
</body>

 <script type="text/javascript">
    $('.slideBox').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.slideNum strong').text(Math.ceil(i / 1));
        $(".slideNum i").text(slick.slideCount / 1);
    });

    $('.slideBox').slick({
        infinite: true,
        slidesToShow: 1,
        prevArrow : $(".btnPage01.prev"),
        nextArrow : $(".btnPage01.next"),
        slidesToScroll: 1,
        dots:false,
        fade: true,
        speed : 500,
        cssEase : "linear",
        customPaging: function (slider, i) {
                console.log(slider);
                return  (i + 1) + '/' + slider.slideCount;
            }
    });
    </script>
</html>