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
			var menuType = 'faq';
			$(document).ready(function() {
				srvLogWrite('A0', '14', '03', '01', '', '');

				var opt = new Object();
				opt.board_cd = 'BOARD_002';
				opt.page_num = 1;
				
				$.makeFaqLists(opt);
				
				$('input[id=search_btn]').click(function() {
					if($('input[id=faq_search_title_text]').val() == null || $('input[id=faq_search_title_text]').val() == '') {
						alert('검색어를 입력하세요.');
						return false;
					}
					else {
						var word = $('input[id=faq_search_title_text]').val();
						opt.post_all = word;
						$.makeFaqLists(opt);
					}
				});
			});
			
			$.makeFaqLists = function(opt) {
				$.ajax({
					url : '/ServiceAPI/board/boardLists.json',
					type : 'POST',
					data : opt,
					success : function(data) {
						$('tbody[id=list] *').remove();
						var list = data.result.summaryList;
						var listElement = '';
						for(var i = 0; i < list.length; i++) {
							listElement += '<tr>';
							listElement += '<td>' + list[i].boardnum + '</td>';
							listElement += '<td class="subject"><a href="javascript:$.controlListItem(' + list[i].post_no + ');">' + list[i].post_title + '</a></td>';
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
								opt.board_cd = 'BOARD_002';
								opt.page_num = page;
								
								var word = $('input[id=faq_search_title_text]').val();
								
								if(word != null && word != '') opt.post_all = word;
								
								$.makeFaqLists(opt);
							}
						});
					}
				});
			};
			
			$.controlListItem = function(post_no) {
				window.location.href = "/view/board/faqView?post_no=" + post_no;
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
							<li><a href="/view/view/index"><img src="/images/common/location_home.gif"/></a></li>
							<li><a href="/view/board/sopBoardMain">알림마당</a></li>
							<li><a href="/view/board/qnaAndRequestFaq">질문과 개선요청</a></li>
							<li><a href="/view/board/qnaAndRequestFaq"><em>FAQ</em></a></li>
						<!-- 190313 방민정 수정 끝 -->
						</ul>
						<h1 class="sub-title">FAQ</h1>
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
									<div class="f-el">
										<span class="el-h"> <label for="faq_search_title_text">검색어입력</label> </span>
										<span class="el-b">
											<input id="faq_search_title_text" class="easyui-textbox" type="text" name="faq_search_title_text" style="width: 292px;" data-options="required:true" />
										</span>
									</div>
									</fieldset>
									<div class="btn-search">
										<input id="search_btn" style="cursor: pointer;" type="button" value="검색" />
									</div>
								</form>
							</div>
							<!-- //검색 끝 -->
							<!-- board 리스트 -->
							<div id="board-thema" class="faq-list">
								<table class="board-list">
									<caption>공지사항 목록</caption>
									<colgroup>
										<col style="width:60px;"/>
										<col style="width:auto;"/>
									</colgroup>
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