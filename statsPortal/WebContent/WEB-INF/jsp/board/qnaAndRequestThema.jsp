<%
/**************************************************************************************************************************
* Program Name  : 질문과 개선요청 JSP  
* File Name     : expAndNotice.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="utf-8">
		<meta name="format-detection" content="telephone=no" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		
		<script src="/js/common/includeHead.js"></script>
		<script src="/js/common/common.js"></script>

		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/common.css">
		<!--알림마당 컨텐츠 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/contents.css">
		<!--게시판 css 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/board.css">
		<script src='/js/plugins/jquery.form.js'></script>
		<script src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
		
		<script src="/js/board/jquery.paging.js"></script>
		<script src="/js/board/holder.js"></script>
		<script src='/js/plugins/ckeditor/ckeditor.js'></script>
		<script src='/js/plugins/google_recaptcha.js'></script>
		<title>알림마당|통계지리정보서비스</title>
		
		<script>
			var menuType = 'thema';
			$(document).ready(function() {
				srvLogWrite('A0', '14', '03', '03', '', '');

				var opt = new Object();
				opt.board_cd = 'BOARD_003';
				opt.low_rank_s_class_cd = "THEMRQ";
				opt.page_num = 1;
				
				$.makeThemaLists(opt);
				
				$('input[name=searchBtn]').click(function() {
					if($('input[id=thema_search_title_text]').val() == null || $('input[id=thema_search_title_text]').val() == '') {
						//alert('검색어를 입력하세요.'); 190313 방민정 수정
						return false;
					}
					else {
						var word = $('input[id=thema_search_title_text]').val();
						var type = $('select[id=thema_search_select]').val();
						if('post_title' == type) opt.post_title = word;
						else if('post_content' == type) opt.post_content = word;
						else if('post_all' == type) opt.post_all = word;
						$.makeThemaLists(opt);
					}
				});
				
				$.setSession();
			});
			
			$.setSession = function() {
				if (AuthInfo.authStatus) {
					$('div#qna-login-box').show();
					$('div#qna-button').hide();
				}
				else {
					$('div#qna-login-box').hide();
					$('div#qna-button').show();
				}
			};
			
			$.makeThemaLists = function(opt) {
				$.ajax({
					url : '/ServiceAPI/board/boardLists.json',
					type : 'POST',
					data : opt,
					success : function(data) {
						$('tbody[id=list] *').remove();
						var list = data.result.summaryList;
						var listElement = '';
						for(var i = 0; i < list.length; i++) {
							var replyyn =  list[i].replyyn;
							var title =  list[i].post_title.replace(/\n/gim, "</br>");
							var content =  list[i].post_content.replace(/\n/gim, "</br>");
							var id =  list[i].reg_member_id;
							if(id == "ysjh8501"){
								id = "guest";
							}
							var ast = id.slice(1, id.length-1);
							var user_id = "";
							for(var j=0; j < ast.length; j++) {
								user_id = user_id.concat(ast[j].replace(ast[j], "*"));
							}
							// mng_s 20211215 김건민
							if(user_id.length > 7){
								user_id = user_id.substr(0,6);
							}
							// mng_e 20211215 김건민
							user_id = id.charAt().concat(user_id.concat(id.charAt(id.length-1)));
							var tempStr = content.split("</br>");
							
							listElement += '<tr>';
							listElement += '<td>' + list[i].boardnum + '</td>';
							listElement += '<td class="subject">';
							listElement += '<a href="javascript:$.controlListItem(' + list[i].post_no + ');">' + list[i].post_title + '</a>';
							if(list[i].file_yn && list[i].file_yn == "Y") listElement += '<img src="/publish_2018/include/images/board/ico_file.gif" alt="new" class="file">';
							//listElement += '<span class="tag st03">통계주제도 신규 요청</span>';
							if(AuthInfo.member_id == list[i].reg_member_id) listElement += '<span class="tag st01">내가 작성한 글</span>';
							listElement += '</td>';
							if(replyyn == "Y") listElement += '<td><span class="answer end">답변완료</span></td>';
							else listElement += '<td><span class="answer ing">진행중</span></td>';
							listElement += '<td>' + user_id + '</td>';
							listElement += '<td class="date">' + list[i].reg_ts + '</td>';
							listElement += '<td>' + list[i].post_hits + '</td>';
							listElement += '</tr>';
						}
						$('tbody[id=list]').append(listElement);
						
						var totalCount = data.result.total_count;
						var currentIndex = data.result.curPage;
						var pageSize = 10; // 페이지 당 항목 개수
						var totalPage = Math.ceil(totalCount / pageSize); // 전체 페이지 수
						$('.pagenation .list').paging({
							current : currentIndex,
							max : totalPage,
							itemClass : 'page',
							itemCurrent : 'strong',
							format : '{0}',
							next : '&gt;',
							prev : '&lt;',
							first : '&lt;&lt;',
							last : '&gt;&gt;',
							nextClass : 'next',
							prevClass : 'prev',
							firstClass : 'first',
							lastClass : 'last',
							onclick : function(e, page) { // 페이지 선택 시
								var opt = new Object();
								opt.board_cd = 'BOARD_003';
								opt.low_rank_s_class_cd = "THEMRQ";
								opt.page_num = page;
								
								var word = $('input[id=thema_search_title_text]').val();
								var type = $('select[id=thema_search_select]').val();
								
								if(word != null && word != '' && 'post_title' == type) opt.post_title = word;
								else if(word != null && word != '' && 'post_content' == type) opt.post_content = word;
								else if(word != null && word != '' && 'post_all' == type) opt.post_all = word;
								
								$.makeThemaLists(opt);
							}
						});
					}
				});
			};
			
			/* 190313 방민정 수정
			$.controlInputWrite = function() {
				window.location.href = "/view/board/qnaThemaWrite";
			};
			*/
			
			$.controlListItem = function(post_no) {
				window.location.href = "/view/board/qnaView?post_no=" + post_no + "&boardType=Thema";
			};
			//190313 방민정 수정 시작
			$.controlInputWrite = function() {
				if(AuthInfo.authStatus) {
					window.location.href = "/view/board/qnaThemaWrite";
				} else {
					if(confirm("로그인 하시겠습니까? \n 로그인을  하셔야 주제도 요청이 가능합니다.")) {
						var url = statsPotalDomain + "/view/board/qnaAndRequestThema";
						if(statsPotalDomain == "https://sgis.kostat.go.kr") {
							url = statsPotalDomain + "/view/board/qnaAndRequestThema";
						}
						window.location.href = "/view/member/login_new?returnPage=" + encodeURI(url);
					} else {
						window.location.href = "/view/board/qnaAndRequestThema";
					}
				}
			};
			
			/*$.moveLogin = function() {
				//var statsPotalDomain = "//sgis.kostat.go.kr";
				//var statsPotalDomain = "//sgis.neighbor21.co.kr:8080";
				var statsPotalDomain = "//localhost:8080";
				var url = statsPotalDomain + "/view/board/qnaAndRequestThema"
				if(statsPotalDomain == "https://sgis.kostat.go.kr") {
					url = statsPotalDomain + "/view/board/qnaAndRequestThema"
				}
				window.location.href = "/view/member/login_new?returnPage=" + encodeURI(curUrl);
			};*/
			//190313 방민정 수정 끝
		</script>
	</head>
	<body>
		<div id="wrap">
			<!-- header // -->
			<header>
				<!-- Top Include -->
				<jsp:include page="/view/common/includeSearch"></jsp:include>
			</header>
			<!--contents-->
			<div id="container" class="sub">
				<%@include file="/jsp/board/includeLeftMenu.jsp" %>
				<div id="content">
					<div id="title-area">
						<ul class="location">
						<!-- 190313 방민정 수정 시작 -->
							<li><a href="/view/view/index"><img src="/images/common/location_home.gif" alt="홈" /></a></li>
							<li><a href="/view/board/sopBoardMain">알림마당</a></li>
							<li><a href="/view/board/qnaAndRequestFaq">질문과 개선요청</a></li>
							<li><a href="/view/board/qnaAndRequestThema"><em>통계주제도 신규 요청</em></a></li>
						<!-- 190313 방민정 수정 끝 -->
						</ul>
						<h1 class="sub-title" style="margin-bottom: 10px;">통계주제도 신규 요청</h1>
					</div>
					<div id="contents" class="view">
						<!--board 시작-->
						<div id="board-type">
							<!-- 게시물 검색-->
							<div class="search-box" style="margin-bottom: 10px;">
								<form name="searchFrm" method="POST">
									<fieldset>
									<legend class="blind">
										게시물 검색
									</legend>
									<div class="f-el f-el-select">
				        				<span class="el-h blind"> <label for="thema_search_select">검색항목</label> </span>
				        				<span class="el-b select-box">
				        					<select id="thema_search_select" class="easyui-combobox" data-options="editable:false" name="thema_search_select" style="width: 128px; height: 36px; cursor: pointer;">
				        						<option value="post_title">제목</option>
				        						<option value="post_content">내용</option>
				        						<option value="post_all" selected="selected">제목 + 내용</option>
				        					</select>
				        				</span>
			        				</div>
									<div class="f-el">
										<span class="el-h"> <label for="thema_search_title_text">검색어입력</label> </span>
										<span class="el-b">
											<input id="thema_search_title_text" class="easyui-textbox" type="text" name="thema_search_title_text" style="width: 292px;" data-options="required:true" />
										</span>
									</div>
									</fieldset>
									<div class="btn-search">
										<input name="searchBtn" style="cursor: pointer;" type="button" value="검색" />
									</div>
								</form>
							</div>
							<!-- //검색 끝 -->
							<!-- ( loginbox ) -->
							<div id="qna-login-box" class="board-login-box" style="margin-bottom: 10px;">
								<p>로그인을 하셔야 의견작성이 가능합니다.</p>
								<div class="btn-area mb0">
									<a href="javascript:$.moveLogin();" class=" default-color" title="로그인"><span>로그인</span></a>
									<a href="javascript:memberRegister();" class="btn-left-mg dark-gray" title="목록"><span>회원가입</span></a>
								</div>
							</div>
							<!-- //( loginbox ) -->
							<!-- 질문등록 button-->
							<div id="qna-button" class="btn-area" style="margin-bottom: 10px;">
								<button type="button" class="default-color" value="신규 요청 등록" onclick="$.controlInputWrite();">
								<span>신규 요청 등록</span>
							</button>
							</div>
							<!-- //질문등록 button-->
							<!-- board 리스트 -->
							<div id="board-thema" class="faq-list">
								<table class="board-list">
									<caption>공지사항 목록</caption>
									<colgroup>
								        <col style="width:60px;">
								        <col style="width:auto;">
								        <col style="width:75px;">
								        <col style="width:75px;">
								        <col style="width:125px;">
								        <col style="width:55px;">
								    </colgroup>
								    <thead>
								        <tr>
								            <th scope="col">순번</th>
								            <th scope="col">제목</th>
								            <th scope="col">답변유형</th>
								            <th scope="col">작성자</th>
								            <th scope="col">등록일</th>
								            <th scope="col">조회수</th>
								        </tr>
								    </thead>
									<tbody id="list">
										<!-- ajax처리 -->
									</tbody>
								</table>
							</div>
							<!-- //board 리스트 끝 -->			
							<!-- 페이지 네비 시작 -->        	
							<div class="paging pagenation">
								<span class="list"></span>
							</div>
							<!--//페이지 네비 끝 -->
						<!--//view-->
						</div>
					</div>
				</div>
			</div>
			<!--//contents-->
            <!-- footer// -->
		    <footer id="footer">
		    	<!-- Bottom Include -->
				<jsp:include page="/view/common/includeBottom"></jsp:include>
		    </footer>
        </div>
    </body>
</html>