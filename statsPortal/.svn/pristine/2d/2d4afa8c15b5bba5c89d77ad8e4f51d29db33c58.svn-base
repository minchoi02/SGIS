<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGIS 에듀 > 고교 > 검색결과 > 수업하기</title>
	<link rel="stylesheet" href="/sgis_edu/resource/css/base.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/common.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/main_high.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/high.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/search_result.css">
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
	<script type="text/javascript" src="/sgis_edu/resource/js/search/searchClass.js"></script>
	<script src="/sgis_edu/resource/js/jquery.paging.js"></script>
</head>
<body>
	<!--헤더삽입 -->
    <jsp:include page="/view/edu/high/header"></jsp:include>

    <div>
        <section class="sect sect01">
 			<div class="inner">
                    <form class="searchForm" onsubmit="return false;"  autocomplete="off" >
                        <fieldset>
                            <i class="hashTag"></i>
                            <input type="search" id="searchInput" class="search" placeholder="를 찾고 싶으세요?">
                            <button type="button" class="btnSearch">검색</button>
                            <ul class="" id="relationKwrdDiv"><!-- addClass on 시 보임  -->
                                <li>인구</li>
                            </ul>
                        </fieldset>
                    </form>
                    <ul class="hashTagWrap">
                        <li><a href="/view/edu/high/searchClass?kwrd=다문화" class="hashTag">다문화</a></li>
                        <li><a href="/view/edu/high/searchClass?kwrd=1인가구" class="hashTag">1인가구</a></li>
                        <li><a href="/view/edu/high/searchClass?kwrd=노령화지수" class="hashTag">노령화지수</a></li>
                        <li><a href="/view/edu/high/searchClass?kwrd=인구피라미드" class="hashTag">인구피라미드</a></li>
                    </ul>
               </div>
        </section>
        <main>
            <div class="inner">
                <ul class="tab">
                    <li><a href="javascript:$eduSearchApi.goSearch('All')">전체 <span class="allCnt"></span></a></li>
                    <li class="on"><a href="javascript:$eduSearchApi.goSearch('Class')">수업하기 <span class="contentsCnt"></span></a></li>
                    <li><a href="javascript:$eduSearchApi.goSearch('Tchpgm')">배우는 지도 <span class="tchpgmCnt"></span></a></li>
                    <li><a href="javascript:$eduSearchApi.goSearch('WithMap')">함께하는 지도 <span class="withMapCnt"></span></a></li>
                </ul>
               <section class="result on">
                    <p class="sectTi"><strong>수업하기</strong> 검색 결과 총 <i class="contentsCnt"></i>건</p>
                    <ul class="card card04" id="contentsResultDiv">
                       <!-- 
                        <li>
                            <a href="class_view.html">
                                <div class="cardImg">
                                    <img src="../resource/images/ele/img_class_card01.png">
                                </div>
                                <div class="cardTxt">
                                    <span class="contTag">지속 가능한 세계</span>
                                    <em class="cardTi">그 많던 아이들은 어디로 갔을까?</em>
                                    <i class="hashTag">해쉬태그</i>
                                    <i class="hashTag">해쉬태그</i>
                                </div>
                            </a>
                        </li>
                        -->
                    </ul>
                    <div class="pagenation" style="width: 100%; margin-bottom:50px; text-align:center;">
                    <span class="btnWrap paging">
<!--                         <a class="first">처음</a> -->
<!--                         <a class="prev">이전</a> -->
<!--                         <a class="num on">1</a> -->
<!--                         <a class="num">2</a> -->
<!--                         <a class="num">3</a> -->
<!--                         <a class="next">다음</a> -->
<!--                         <a class="last">마지막</a> -->
                    </span>
                    </div>
                    <button type="button" class="btn btnN01 btnArr">더보기</button>
                </section>
            </div>
        </main>
    </div>

</body>
</html>