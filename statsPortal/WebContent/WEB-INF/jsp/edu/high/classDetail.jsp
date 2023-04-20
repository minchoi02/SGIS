<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SGIS 에듀 > 고교 > 수업하기</title>

<link rel="stylesheet" href="/sgis_edu/resource/css/base.css">
<link rel="stylesheet" href="/sgis_edu/resource/css/common.css">
<link rel="stylesheet" href="/sgis_edu/resource/css/class.css">
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
<script type="text/javascript" src="/sgis_edu/resource/js/high/classDetail.js"></script>
</head>
<body>
	<!-- START::: 에듀  Header -->
    <jsp:include page="/view/edu/high/header"></jsp:include>
	<!-- END::::: 에듀  Header -->
	
 	<div class="sub view">
        <div class="lnb">
            <h2 class="menuTi"><a href=""></a></h2>
            <h3 class="lnbTi"></h3>
            <p id="contentsExp"></p>
            <div class="hashTagWrap" id="contentsHashTagWrap">
            </div>
        </div>
        <main>
            <div class="slideWrap">
                <div class="slideBox">

                </div>
                <a class="btnPage02 prev">이전</a>
                <a class="btnPage02 next">다음</a>
            </div>
            <button type="button" class="btn btnS01" id="sgisExp" onclick="sgisExp()">SGIS 활용하기</button>
            <a href="javascript:quiz()" class="btnPage01 next">
                <em>NEXT</em>
                <i>퀴즈 풀고 <br/>다음 스토리</i>
            </a>
        </main>
        <div class="moreCont"> <!-- on 클래스 시 열림 -->
            <button type="button" class="btnFold btnArr">추천 해시태그 보기</button>
            <article>
                <div class="inner" id="recommendTagDiv">
                    <ul class="hashTagWrap">
                        <li><a class="hashTag" id="recommendTag0"></a></li>
                        <li><a class="hashTag" id="recommendTag1"></a></li>
                        <li><a class="hashTag" id="recommendTag2"></a></li>
                        <li><a class="hashTag" id="recommendTag3"></a></li>
                        <li><a class="hashTag" id="recommendTag4"></a></li>
                    </ul>
                    <ul class="hashTagWrap">
                        <li><a class="hashTag" id="recommendTag5"></a></li>
                        <li><a class="hashTag" id="recommendTag6"></a></li>
                        <li><a class="hashTag" id="recommendTag7"></a></li>
                        <li><a class="hashTag" id="recommendTag8"></a></li>
                        <li><a class="hashTag" id="recommendTag9"></a></li>
                    </ul>
                </div>
            </article>
        </div>
    </div>
    <div class="popup quiz">  <!-- on 클래스 시 열림 -->
        <section>
            <h3>퀴즈 타임!</h3>
            <article>
                <p class="quizTi" id="question"></p>
                <ul class="answer">
                    <li class="opt1" onclick="wrong1()">1960년대</li>
                    <li class="opt2" onclick="wrong2()">1960년대</li>
                    <li class="opt3" onclick="wrong3()">1960년대</li>
                    <li class="opt4" onclick="wrong4()">1960년대</li>
                </ul>
            </article>
            <button type="button" class="btn btnClose">닫기</button>
<!--             <div class="ready">  -->
<!-- 	            <article class="exp" > -->
<!-- 	                <p class="">문제를 풀어보세요!</p> -->
<!-- 	            </article> -->
<!--             </div> -->
            <div class="incrt"> 
	            <article class="exp " >
	                <p class="quizTi">정답이에요!</p>
	                <img class="quizExpImg" style="display:none;" src="/sgis_edu/resource/images/img_quiz01.png">
	                <ul class="">
	                	<li class="quizCn">
	                </ul>
	            </article>
            </div>
            <div class="wrong a1">
	            <article class="exp" >
	                <p class="quizTi">앗, 아쉽게 틀렸어요.</p>
	                <img class="quizExpImg" style="display:none;" src="/sgis_edu/resource/images/img_quiz01.png">
<!-- 	                <ul class=""> -->
<!-- 	                	<li class="quizCn"> -->
<!-- 	                </ul> -->
	            </article>
            </div>
            <div class="wrong a2">
	            <article class="exp" >
	                <p class="quizTi">앗, 아쉽게 틀렸어요.</p>
	                <img class="quizExpImg" style="display:none;" src="/sgis_edu/resource/images/img_quiz01.png">
<!-- 	                <ul class=""> -->
<!-- 	                	<li class="quizCn"> -->
<!-- 	                </ul> -->
	            </article>
            </div>
            <div class="wrong a3">
	            <article class="exp" >
	                <p class="quizTi">앗, 아쉽게 틀렸어요.</p>
	                <img class="quizExpImg" style="display:none;" src="/sgis_edu/resource/images/img_quiz01.png">
<!-- 	                <ul class=""> -->
<!-- 	                	<li class="quizCn"> -->
<!-- 	                </ul> -->
	            </article>
            </div>
            <div class="wrong a4">
	            <article class="exp" >
	                <p class="quizTi">앗, 아쉽게 틀렸어요.</p>
	                <img class="quizExpImg" style="display:none;" src="/sgis_edu/resource/images/img_quiz01.png">
<!-- 	                <ul class=""> -->
<!-- 	                	<li class="quizCn"> -->
<!-- 	                </ul> -->
	            </article>
            </div>
            <div class="btnWrap">
                <button type="button" class="btn btnN01">닫기</button>
                <button type="button" class="btn btnN02 btnArr nextContents">다음 스토리로 가기</button>
            </div>
        </section>
    </div>
<!--     <div class="popup detailExp" id="popupDetail">  on 클래스 시 열림 -->
<%--    	<jsp:include page="/view/edu/ele/linkDetail"></jsp:include> --%>
<!--     </div> -->
    <div class="popup sgisExp" id="popupSgis">  <!-- on 클래스 시 열림 -->
<%--     	<jsp:include page="/view/edu/ele/linkSgis"></jsp:include> --%>
    </div>
	
</body>
</html>