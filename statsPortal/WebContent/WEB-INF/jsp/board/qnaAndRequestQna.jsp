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
			var menuType = 'qna';
			$(document).ready(function() {
				srvLogWrite('A0', '14', '03', '02', '', '');

				var opt = new Object();
				opt.board_cd = 'BOARD_003';
				opt.page_num = 1;
				
				$.makeQnaLists(opt);
				
				$('input[name=searchBtn]').click(function() {
					if($('input[id=qna_search_title_text]').val() == null || $('input[id=qna_search_title_text]').val() == '') {
						alert('검색어를 입력하세요.');
						return false;
					}
					else {
						var word = $('input[id=qna_search_title_text]').val();
						var type = $('select[id=qna_search_select]').val();
						if('post_title' == type) opt.post_title = word;
						else if('post_content' == type) opt.post_content = word;
						else if('post_all' == type) opt.post_all = word;
						$.makeQnaLists(opt);
					}
				});
			});
			
			/* $.setSession = function() {
				$.ajax({
					url : '/ServiceAPI/member/memberInfo.json',
					type : 'POST',
					async : false,
					success : function(res) {
						var result = res.result;
						if (res.errCd == "0") {
							if (result.memberInfo[0].member_id == null) {
								Authobj = {
									authStatus : false,
									member_id : ""
								}
							}
							else {
								Authobj = {
									authStatus : true,
									member_id : result.memberInfo[0].member_id
								}
							}
							AuthInfo = Authobj;
						}
						else {
							messageAlert.open("알림", res.errMsg);
						}
					}
				});
			}; */
			
			$.makeQnaLists = function(opt) {
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
							// mng_s 20211214 김건민
							if(user_id.length > 7){
								user_id = user_id.substr(0,6);
							}
							// mng_e 20211214 김건민
							user_id = id.charAt().concat(user_id.concat(id.charAt(id.length-1)));
							var tempStr = content.split("</br>");
							
							listElement += '<tr>';
							listElement += '<td>' + list[i].boardnum + '</td>';
							listElement += '<td class="subject">';
							listElement += '<a href="javascript:$.controlListItem(' + list[i].post_no + ');">' + list[i].post_title + '</a>';
							if(list[i].file_yn && list[i].file_yn == "Y") listElement += '<img src="/publish_2018/include/images/board/ico_file.gif" alt="new" class="file">';
							if(list[i].low_rank_s_class_cd == "REQST") listElement += '<span class="tag st01">일반문의</span>';
							if(list[i].low_rank_s_class_cd == "QUERY") listElement += '<span class="tag st02">개선요청</span>';
							if(AuthInfo.member_id == list[i].reg_member_id) listElement += '<span class="tag st03">내가 작성한 글</span>';
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
								opt.page_num = page;
								
								var word = $('input[id=qna_search_title_text]').val();
								var type = $('select[id=qna_search_select]').val();
								
								if(word != null && word != '' && 'post_title' == type) opt.post_title = word;
								else if(word != null && word != '' && 'post_content' == type) opt.post_content = word;
								else if(word != null && word != '' && 'post_all' == type) opt.post_all = word;
								
								$.makeQnaLists(opt);
							}
						});
					}
				});
			};
			
			$.controlInputWrite = function() {
				if(AuthInfo.authStatus) {
					window.location.href = "/view/board/qnaWrite";
				} else {
					if(confirm("로그인 하시겠습니까? \n 취소버튼 클릭시 글쓰기 모드로 글을 쓸수 있습니다")) {
						var url = statsPotalDomain + "/view/board/qnaAndRequestQna"
						if(statsPotalDomain == "https://sgis.kostat.go.kr") {
							url = statsPotalDomain + "/view/board/qnaAndRequestQna"
						}
						window.location.href = "/view/member/login_new?returnPage=" + encodeURI(url);
					} else {
						window.location.href = "/view/board/qnaWrite";
					}
				}
			};
			
			$.controlListItem = function(post_no) {
				window.location.href = "/view/board/qnaView?post_no=" + post_no + "&boardType=Qna";
			};
		</script>
		
		<!-- mng_s 20210616 이진호, 웹 접근성 오류 수정 -->
		<script>
		$(document).ready(function(){
			$(".textbox-icon.combo-arrow").html("comboArrow");
			$(".textbox-icon.combo-arrow").css('font-size', '0px');
		});
		</script>
		<!-- mng_e 20210616 이진호 -->
		
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
							<li><a href="/view/view/index"><img src="/images/common/location_home.gif" alt="메인페이지 이동아이콘" /></a></li>
							<li><a href="/view/board/sopBoardMain">알림마당</a></li>
							<li><a href="/view/board/qnaAndRequestFaq">질문과 개선요청</a></li>
							<li><a href="/view/board/qnaAndRequestQna"><em>Q&A</em></a></li>
						<!-- 190313 방민정 수정 끝 -->
						</ul>
						<h1 class="sub-title" style="margin-bottom: 10px;">Q&A</h1>
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
				        				<span class="el-h blind"> <label for="qna_search_select">검색항목</label> </span>
				        				<span class="el-b select-box">
				        					
				        					<!-- mng_s 202010615 이진호 , 웹 접근성 점검 오류 수정 -->
				        					<!-- label 태그 추가 -->
				        					<label>
					        					<select id="qna_search_select" class="easyui-combobox" data-options="editable:false" name="qna_search_select" style="width: 128px; height: 36px; cursor: pointer;">
					        						<option value="post_title">제목</option>
					        						<option value="post_content">내용</option>
					        						<option value="post_all" selected="selected">제목 + 내용</option>
					        					</select>
				        					</label>
				        					<!-- mng_e 20210615 이진호 -->
				        					
				        				</span>
			        				</div>
									<div class="f-el">
										<span class="el-h"> <label for="qna_search_title_text">검색어입력</label> </span>
										<span class="el-b">
											
											<!-- mng_s 20210615 이진호, 웹 접근성 점검 오류 수정 -->
											<label>
												<input id="qna_search_title_text" class="easyui-textbox" type="text" name="qna_search_title_text" style="width: 292px;" data-options="required:true" />
											</label>
											<!-- mng_e 20210615 이진호 -->
											
										</span>
									</div>
									</fieldset>
									<div class="btn-search">
										<input name="searchBtn" style="cursor: pointer;" type="button" value="검색" />
									</div>
								</form>
							</div>
							<!-- //검색 끝 -->
							<!-- 질문등록 button-->
							<div id="qna-button" class="btn-area" style="margin-bottom: 10px;">
								<button type="button" class="default-color" value="질문등록" onclick="$.controlInputWrite();">
									<span>질문등록</span>
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