<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGIS 에듀 > ${ ss_school_grade_nm } > 주제보기 </title>
	
	<link rel="stylesheet" href="/sgis_edu/resource/css/base.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/common.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/main_${ss_school_level}.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/${ss_school_level}.css">
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
	<script type="text/javascript" src="/sgis_edu/resource/js/issue/issueList.js"></script>
	<script src="/sgis_edu/resource/js/jquery.paging.js"></script>
	
</head>
<body>
	<!-- START::: 에듀  Header -->
	<jsp:include page="/view/edu/${ss_school_level}/header"></jsp:include>
	<!-- END::::: 에듀  Header -->
    <div class="sub list">
        <div class="lnb">
            <h2 class="lnbTi">주제보기</h2>
            <ul class="menu" id="menuList">
                <li><a class="on">인문 환경과 인간 생활</a></li>
                <li><a>지속 가능한 세계</a></li>
                <li><a>자연 환경과 인간 생활</a></li>
            </ul>
        </div>
        <main>
            <h3 class="contTi"></h3>
            <ul class="card card04" id="contentsList">
                <li>
                    <a>
                        <div class="cardImg">
                            <img src="">
                        </div>
                        <div class="cardTxt">
                            <em class="cardTi"></em>
                            <i class="hashTag"></i>
                        </div>
                    </a>
                </li>
                <li>
                    <a>
                        <div class="cardImg">
                            <img src="">
                        </div>
                        <div class="cardTxt">
                            <em class="cardTi"></em>
                            <i class="hashTag"></i>
                        </div>
                    </a>
                </li>
                <li>
                    <a>
                        <div class="cardImg">
                            <img src="">
                        </div>
                        <div class="cardTxt">
                            <em class="cardTi"></em>
                            <i class="hashTag"></i>
                        </div>
                    </a>
                </li>
            </ul>
            <div class="pagenation" style="width: 100%;text-align:center;">
            <span class="paging btnWrap" >
<!--                 <a class="first">처음</a> -->
<!--                 <a class="prev">이전</a> -->
<!--                 <a class="num on">1</a> -->
<!--                 <a class="num">2</a> -->
<!--                 <a class="num">3</a> -->
<!--                 <a class="next">다음</a> -->
<!--                 <a class="last">마지막</a> -->
            </span>
            </div>
        </main>
    </div>
</body>
</html>