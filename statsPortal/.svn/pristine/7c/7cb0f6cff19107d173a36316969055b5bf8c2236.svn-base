<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

 <%
    
    	//======================== 테스트용 세션값 세팅 운영 갈때 주석 요망 ============================
		//session.setAttribute("ss_grant_state", "ASSENT");
		//session.setAttribute("ss_school_grade", "M");
		//session.setAttribute("member_id", "bombjak1");
    	//session.setAttribute("member_id", "USER3");
    	//session.setAttribute("member_id", "USER2");
    	//=====================================================================================
    
		
	%>   

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>SGIS 에듀 > ${ ss_school_grade_nm }</title>

<link rel="stylesheet" href="/sgis_edu/resource/css/together.css">
<script type="text/javascript" src="/sgis_edu/resource/js/jqueryMin.js"></script>

<script type="text/javascript" src="/js/plugins/jquery.sha256.js"></script>
<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>

<script type="text/javascript" src="/js/common/common.js"></script>
<script type="text/javascript" src="/js/communityMap/communityCommon.js"></script>

<script src="/js/board/jquery.paging.js"></script>
<link rel="shortcut icon" href="/sgis_edu/resource/images/favicon.ico">

<style>
	.paging a{width:36px; height:36px; border-radius: 36px; margin: 0 5px;}
	.paging .num{color:rgba(24,24,24,0.7); line-height: 36px; text-align: center;}
	.paging .num.on, .paging .num:hover{color:rgba(24,24,24,1); font-weight: 600;}
	.paging a:not(.num){font-size:0; border:1px solid rgba(0,0,0,0.1)}
	.paging a:not(.num)::after{content:""; display:block; width:100%; height:100%; background: no-repeat 50%; opacity: .3;}
	.paging a:not(.num):hover::after{opacity: .8;}
	.paging a.first::after, .paging a.last::after{background-image: url(/sgis_edu/resource/images/icon_btnPage03_2.png);}
	.paging a.first::after, .paging a.prev::after{transform: rotate(180deg);}
	.paging a.prev::after, .paging a.next::after{background-image: url(/sgis_edu/resource/images/icon_btnPage03_1.png);}
</style>
<script type="text/javascript">
	$communityMapCommon.cmmnty_from_ce = '<c:out value="${cmmnty_from_ce}"/>';
</script>
</head>
<body>
	<!-- START::: 에듀  Header -->
    <header>
		<jsp:include page="/view/edu/${ss_school_level}/community/header"></jsp:include>
		<script type="text/javascript" src="/sgis_edu/resource/js/communityMap/together_list.js"></script>
	</header>
	<!-- END::::: 에듀  Header -->
	
    <div class="sub list">
        <div class="lnb">
            <h2 class="lnbTi">함께하기</h2>
            <ul class="menu">
            	<c:if test="${ ss_grant_state eq 'ASSENT'}">
	                <li><a href="/view/edu_gallery/resultGallery?param_ss_page_info=T&param_ss_school_grade=${ ss_school_grade}">가르치는 지도</a></li>
            	</c:if>
                <li><a href="/view/edu_gallery/resultGallery?param_ss_page_info=${ss_page_info}&param_ss_school_grade=${ ss_school_grade }">배우는 지도</a></li>
                <li><a href="/view/edu/${ss_school_level}/community/together_list" class="on">함께하는 지도</a></li>
            </ul>
        </div>
        <main>
            <h3 class="contTi">함께하는 지도</h3>
            <div class="filterWrap">
                <div class="legend">
                    <i class="level level01"><span>모두</span></i>
                    <i class="level level02"><span>비밀번호</span></i>
                    <i class="level level03"><span>로그인</span></i>
                    <i class="level level04"><span>로그인/개설자 승인</span></i>
                </div>
                <form>
                    <fieldset>
                        <div class="select">
                            <span>전체</span>
                            <input type="checkbox" id="chk1">
                            <label for="chk1"></label>
                            <ul id="searchType">
                                <li>전체</li>
                                <li data-searchtype="cmmnty_map_nm">제목</li>
                                <li data-searchtype="cmmnty_map_cn">내용</li>
                                <li data-searchtype="usr_id">작성자ID</li>
                            </ul>
                        </div>
                        <input id="searchText" type="search" class="search" placeholder="검색어를 입력하세요">
                        <button id="searchBtn" type="button" class="btnSearch">검색</button>
                    </fieldset>
                </form>
            </div>
            
            <ul class="card card02">
            </ul>
            <div class="btnWrap paging">
            </div>
            <div class="btnRight">
                <button id="createBtn" type="button" class="btn btnN02 btnArr">새로운 주제 만들기</button>
            </div>
        </main>
    </div>
</body>
</html>