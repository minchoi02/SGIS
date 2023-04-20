<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title>통계용어설명</title>
		<meta name="title" content="알림마당">
		<link rel="stylesheet" href="${ctx }/resources/plugins/sop/mobile/sop.css">
		<script src="https://unpkg.com/hangul-js" type="text/javascript"></script>
		<script>
			$(document).ready(function() {
				srvLogWrite('O0', '11', '02', '01', '', '');
				$board.init("BOARD_005");
				$('#krInitSrch').hide();
				$('#EnInitSrch').hide();
				//색인검색 click 이벤트. 활성화 비활성화 처리 박은식 20200702
				$("#krSrch").click(function(target){
					if($("#krInitSrch").css("display") == "none"){
						$('#krInitSrch').show();
						$(this).attr("class","on")
					}else{
						$('#krInitSrch').hide();
						$(this).removeClass("on");
					}
					if($("#enSrch").hasClass("on")){
						$('#EnInitSrch').hide();
						$('#enSrch').removeClass("on");
					}
				});
				$("#enSrch").click(function(){
					if($("#EnInitSrch").css("display") == "none"){
						$('#EnInitSrch').show();
						$(this).addClass("on");
					}else{
						$('#EnInitSrch').hide();
						$(this).removeClass("on");
					}
					if($("#krSrch").hasClass("on")){
						$('#krInitSrch').hide();
						$('#krSrch').removeClass("on");
					}
				});
				//색인검색 click 이벤트 end
			});
		</script>
	</head>
	<body>
		<!--2022-11-10 추가 -->
		<div class="nav-2022">
			<div class="leftCol">
				<span id="btnNavTitle">통계용어설명
					<svg width="12" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z" /></svg>
				</span>		
			</div>
		</div>
		<%@include file="/WEB-INF/jsp/m2020/map/board/navigation.jsp" %>
		<div class="ListSearch" style="padding-top:110px">
			<form id="board-search-form" class="search-result">
				<label for="notice_search_title_text" class="Hidden">검색어입력</label> <!-- 2020.09.08 [신예리] 레이블 추가 -->
				<input type="text" id="notice_search_title_text" placeholder="검색어를 입력해주세요." title="검색 영역"> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
				<button type="submit" class="search-btn" title="검색 버튼"  onclick="javascript:srvLogWrite('O0', '11', '02', '02', $('#notice_search_title_text').val(), '');"></button> <!-- 2020.09.08 [신예리] 대체텍스트 추가 -->
			</form>
			<!-- 색인별 검색 단어를 담기위한 테그 박은식 20200702 -->
			<input type="hidden" id="notice_search_initial_text">
			<ul class="ListTopsearch">
				<li>
					<a href="javascript:void(0)" id="krSrch" >가나다 검색</a>
				</li>
				<li>
					<a href="javascript:void(0)" id="enSrch" >ABC 검색</a>
				</li>
			</ul>
			<!-- 색인별 검색 button 박은식 20200702 start -->
			<div class="krSrch" id="krInitSrch" >
				<ul>
					<li onclick="$board.preWordFilter('가나',this);"><a href="javascript:void(0)" >ㄱ</a></li>
					<li onclick="$board.preWordFilter('나다',this);"><a href="javascript:void(0)" >ㄴ</a></li>
					<li onclick="$board.preWordFilter('다라',this);"><a href="javascript:void(0)" >ㄷ</a></li>
					<li onclick="$board.preWordFilter('라마',this);"><a href="javascript:void(0)" >ㄹ</a></li>
					<li onclick="$board.preWordFilter('마바',this);"><a href="javascript:void(0)" >ㅁ</a></li>
					<li onclick="$board.preWordFilter('바사',this);"><a href="javascript:void(0)" >ㅂ</a></li>
					<li onclick="$board.preWordFilter('사아',this);"><a href="javascript:void(0)" >ㅅ</a></li>
				</ul>
				<ul>
					<li onclick="$board.preWordFilter('아자',this);"><a href="javascript:void(0)" >ㅇ</a></li>
					<li onclick="$board.preWordFilter('자차',this);"><a href="javascript:void(0)" >ㅈ</a></li>
					<li onclick="$board.preWordFilter('차카',this);"><a href="javascript:void(0)" >ㅊ</a></li>
					<li onclick="$board.preWordFilter('카타',this);"><a href="javascript:void(0)" >ㅋ</a></li>
					<li onclick="$board.preWordFilter('타파',this);"><a href="javascript:void(0)" >ㅌ</a></li>
					<li onclick="$board.preWordFilter('파하',this);"><a href="javascript:void(0)" >ㅍ</a></li>
					<li onclick="$board.preWordFilter('하힣',this);"><a href="javascript:void(0)" >ㅎ</a></li>
				</ul>
			</div >
			<div  class="EnSrch" id="EnInitSrch">
				<ul>
					<li onclick="$board.preWordFilter('A',this);"><a href="javascript:void(0)" >A</a></li>
					<li onclick="$board.preWordFilter('B',this);"><a href="javascript:void(0)" >B</a></li>
					<li onclick="$board.preWordFilter('C',this);"><a href="javascript:void(0)" >C</a></li>
					<li onclick="$board.preWordFilter('D',this);"><a href="javascript:void(0)" >D</a></li>
					<li onclick="$board.preWordFilter('E',this);"><a href="javascript:void(0)" >E</a></li>
					<li onclick="$board.preWordFilter('F',this);"><a href="javascript:void(0)" >F</a></li>
					<li onclick="$board.preWordFilter('G',this);"><a href="javascript:void(0)" >G</a></li>
				</ul>
				 <ul>
 					<li onclick="$board.preWordFilter('H',this);"><a href="javascript:void(0)" >H</a></li>
 					<li onclick="$board.preWordFilter('I',this);"><a href="javascript:void(0)" >I</a></li>
 					<li onclick="$board.preWordFilter('J',this);"><a href="javascript:void(0)" >J</a></li>
 					<li onclick="$board.preWordFilter('K',this);"><a href="javascript:void(0)" >K</a></li>
 					<li onclick="$board.preWordFilter('L',this);"><a href="javascript:void(0)" >L</a></li>
 					<li onclick="$board.preWordFilter('N',this);"><a href="javascript:void(0)" >N</a></li>
 					<li onclick="$board.preWordFilter('M',this);"><a href="javascript:void(0)" >M</a></li>
 				</ul>
 				<ul>
 					<li onclick="$board.preWordFilter('O',this);"><a href="javascript:void(0)" >O</a></li>
 					<li onclick="$board.preWordFilter('P',this);"><a href="javascript:void(0)" >P</a></li>
 					<li onclick="$board.preWordFilter('Q',this);"><a href="javascript:void(0)" >Q</a></li>
 					<li onclick="$board.preWordFilter('R',this);"><a href="javascript:void(0)" >R</a></li>
 					<li onclick="$board.preWordFilter('S',this);"><a href="javascript:void(0)" >S</a></li>
 					<li onclick="$board.preWordFilter('T',this);"><a href="javascript:void(0)" >T</a></li>
 					<li onclick="$board.preWordFilter('U',this);"><a href="javascript:void(0)" >U</a></li>
 				</ul>
 				<ul>
 					<li onclick="$board.preWordFilter('V',this);"><a href="javascript:void(0)" >V</a></li>
 					<li onclick="$board.preWordFilter('W',this);"><a href="javascript:void(0)" >W</a></li>
 					<li onclick="$board.preWordFilter('X',this);"><a href="javascript:void(0)" >X</a></li>
 					<li onclick="$board.preWordFilter('Y',this);"><a href="javascript:void(0)" >Y</a></li>
 					<li onclick="$board.preWordFilter('Z',this);"><a href="javascript:void(0)" >Z</a></li>
 				</ul>
			</div>
			<!-- 색인별 검색 button end -->
		</div>
		<div class="ContArea" style="margin-top:10px; height:calc(100% - 220px); overflow-y:auto;">
			<div class="Term">
				<div id="board-list"></div>
				<div id="board-list-page" class="Pasing"></div>
			</div>
		</div>
	</body>
</html>
