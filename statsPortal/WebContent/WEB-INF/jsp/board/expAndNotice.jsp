<%
/**************************************************************************************************************************
* Program Name  : 설명과 공지 상세화면 JSP  
* File Name     : qnaAndRequest.jsp
* Comment       : 
* History       : 네이버시스템 이동형 2015-10-27
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
			var menuType = 'notice';
			$(document).ready(function() {
				srvLogWrite('A0', '14', '02', '01', '', '');
				
				var opt = new Object();
				opt.board_cd = 'BOARD_001';
				opt.page_num = 1;
				
				$.makeNoticeLists(opt);
				
				$('input[id=search_Btn]').click(function() {
					if($('input[id=notice_search_title_text]').val() == null || $('input[id=notice_search_title_text]').val() == '') {
						alert('검색어를 입력하세요.');
						return false;
					}
					else {
						var word = $('input[id=notice_search_title_text]').val();
						var type = $('select[id=notice_search_select]').val();
						if('post_title' == type) opt.post_title = word;
						else if('post_content' == type) opt.post_content = word;
						else if('post_all' == type) opt.post_all = word;
						$.makeNoticeLists(opt);
					}
				});
			});
			
			$.makeNoticeLists = function(opt) {
				$.ajax({
					url : '/ServiceAPI/board/boardLists.json',
					type : 'POST',
					data : opt,
					success : function(data) {
						$('tbody[id=list] *').remove();
						var list = data.result.summaryList;
						var listElement = '';
						for(var i = 0; i < list.length; i++) {
							var hits = list[i].post_hits;
							if(hits == null || hits == '') hits = 0;
							listElement += '<tr>';
							listElement += '<td>' + list[i].boardnum + '</td>';
							listElement += '<td class="subject"><a href="javascript:$.controlListItem(' + list[i].post_no + ');">' + list[i].post_title + '</a></td>';
							listElement += '<td class="date">' + list[i].reg_ts + '</td>';
							listElement += '<td>' + hits + '</td>';
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
								opt.board_cd = 'BOARD_001';
								opt.page_num = page;
								
								var word = $('input[id=notice_search_title_text]').val();
								var type = $('select[id=notice_search_select]').val();
								
								if(word != null && word != '' && 'post_title' == type) opt.post_title = word;
								else if(word != null && word != '' && 'post_content' == type) opt.post_content = word;
								else if(word != null && word != '' && 'post_all' == type) opt.post_all = word;
								
								$.makeNoticeLists(opt);
							}
						});
					}
				});
			};
			
			$.controlListItem = function(post_no) {
				window.location.href = "/view/board/expAndNoticeView?post_no=" + post_no;
			};
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
							<li><a href="/view/view/index"><img src="/images/common/location_home.gif" alt="홈"/></a></li>
							<li><a href="/view/board/sopBoardMain">알림마당</a></li>
							<li><a href="/view/board/expAndNotice">설명과 공지</a></li>
							<li><a href="/view/board/expAndNotice"><em>공지사항</em></a></li>
						<!-- 190313 방민정 수정 끝 -->
						</ul>
						<h1 class="sub-title">공지사항</h1>
					</div>
					<div id="contents" class="view">
						<!--board 시작-->
						<div id="board-type">
							<!-- 게시물 검색-->
							<div class="search-box">
								<form name="searchFrm" method="POST">
									<fieldset>
									<legend class="blind">
										게시물 검색
									</legend>
									<div class="f-el f-el-select">
										<span class="el-h blind"> <label>검색항목</label> </span>
										<span class="el-b select-box">
											<select id="notice_search_select" class="easyui-combobox" data-options="editable:false" name="searchsel" style="width: 128px; height: 36px; cursor: pointer;">
												<option value="post_title">제목</option>
												<option value="post_content">내용</option>
												<option value="post_all" selected="selected">제목 + 내용</option>
											</select>
										</span>
									</div>
									<div class="f-el">
										<span class="el-h"> <label for="notice_search_title_text">검색어입력</label> </span>
										<span class="el-b">
											<input id="notice_search_title_text" class="easyui-textbox" type="text" name="search" style="width: 292px;" data-options="required:true" />
										</span>
									</div>
									</fieldset>
									<div class="btn-search">
										<input id="search_Btn" style="cursor: pointer;" type="button" value="검색" />
									</div>
								</form>
							</div>
							<!-- //검색 끝 -->
							<!-- board 리스트 -->
							<div id="board-thema" class="list">
								<table class="board-list">
									<caption>공지사항 목록</caption>
									<colgroup>
										<col style="width:60px;">
										<col style="width:525px;">
										<col style="width:145px;">
										<col style="width:75px;">
									</colgroup>
									<thead>
										<tr>
											<th scope="col">순번</th>
											<th scope="col">제목</th>
											<th scope="col">등록일시</th>
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
								<!-- <a href="#none" class="first"  title="목록 처음으로 이동">목록 처음으로 이동</a>
								<a href="#none" class="prev" title="이전 페이지로 이동">이전 페이지로 이동</a> 
								<span class="list"> 
									<a href="#none" class="strong">1</a>
									<a href="#none">2</a>
									<a href="#none">3</a>
									<a href="#none">4</a>
									<a href="#none">5</a>
									<a href="#none">6</a>
									<a href="#none">7</a>
									<a href="#none">8</a>
								</span>
								<a href="#none" class="next" title="다음 페이지로 이동">다음 페이지로 이동</a>
								<a href="#none" class="last" title="목록 마지막으로 이동">목록 마지막으로 이동</a> -->
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