<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGIS 에듀 > ${ ss_school_grade_nm }</title>
	
	<link rel="stylesheet" href="/sgis_edu/resource/css/notice.css">
	<link rel='stylesheet' type='text/css' href='/css/common.css'>
	<link rel="stylesheet" href="/sgis_edu/resource/css/base.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/common.css">
	<link rel="stylesheet" href="/sgis_edu/resource/css/${ss_school_level}.css">
	<link rel="shortcut icon" href="/sgis_edu/resource/images/favicon.ico">
	
	<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
	<script type="text/javascript" src='/js/plugins/jquery.form.js'></script>
	
	<script type="text/javascript" src="/js/plugins/jquery.sha256.js"></script>
	<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
	<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>
	
	<script type="text/javascript" src="/js/common/common.js"></script>
	<script type="text/javascript" src="/sgis_edu/resource/js/common.js?ver=123"></script>
	
	<script type="text/javascript" src="/js/common/board.js"></script>
	<script type="text/javascript" src="/js/board/holder.js"></script>
	<script type="text/javascript" src="/sgis_edu/resource/js/board/boardWrite.js"></script>
	
	<script type="text/javascript">
		$(document).ready(function(){
			$boardWrite.board_cd = '<c:out value="${board_cd}"/>';
			$boardWrite.post_no = '<c:out value="${post_no}"/>';
			$boardWrite.ss_school_level = '<c:out value="${ss_school_level}"/>';
			$boardWrite.mode = 'C';
			
			if( $boardWrite.board_cd != 'BOARD_012' && 
					$boardWrite.board_cd != 'BOARD_013' && $boardWrite.board_cd != 'BOARD_014' ){
				alert("잘못된 접근입니다.");
				location.href = '/view/edu/boardWrite?board_cd=BOARD_012';
			} else {
				$("#left_"+$boardWrite.board_cd).addClass("on");
				$(".contTi").html( $("#left_"+$boardWrite.board_cd).html() );
				
				if( $boardWrite.post_no ){
					$boardWrite.mode = 'M';
					
					var opt = { board_cd : $boardWrite.board_cd, post_no : $boardWrite.post_no };
					$boardWrite.makeView( opt );
				}
			}
			
			//mng_s 20220323 srv로그 추가
			if(null!=$boardWrite.ss_school_level && ''!=$boardWrite.ss_school_level){
				switch($boardWrite.ss_school_level){
					case 'ele': $boardWrite.ss_school_level_cd = 'E'; break;
					case 'mid': $boardWrite.ss_school_level_cd = 'M'; break;
					case 'high': $boardWrite.ss_school_level_cd = 'H'; break;
					default: ;
				}
			}
			
			if('BOARD_014' == $boardWrite.board_cd){ /*질문하기*/ srvLogWrite('T0','02','06','07',$boardWrite.ss_school_level_cd,''); }
			//mng_e 20220323 srv로그 추가
		});
	</script>

</head>
<body>
	<!-- START::: 에듀  Header -->
	<jsp:include page="/view/edu/${ss_school_level}/header"></jsp:include>
	<!-- END::::: 에듀  Header -->
	
    <div class="sub write">
    	<input type="hidden" id="edu_yn" value="Y"/>
        <div class="lnb">
            <h2 class="lnbTi">소통공간</h2>
            <ul class="menu">
                <li><a id="left_BOARD_012" href="/view/edu/${ss_school_level}/boardList?board_cd=BOARD_012">에듀소식</a></li>
                <li><a id="left_BOARD_013" href="/view/edu/${ss_school_level}/boardList?board_cd=BOARD_013">궁금해요</a></li>
                <li><a id="left_BOARD_014" href="/view/edu/${ss_school_level}/boardList?board_cd=BOARD_014">질문하기</a></li>
            </ul>
        </div>
        <main>
            <h3 class="contTi">질문하기</h3>
            <form id="qnaFileUploadForm">
                <fieldset>
                    <ul>
                        <li class="row">
                            <div>
                                <label class="formTi">질문유형</label>
                                <div class="select">
                                    <span>일반문의</span>
                                    <input type="checkbox" id="chk1">
                                    <label for="chk1"></label>
                                    <ul id="req_type">
                                        <li data-type="REQST" class="on">일반문의</li>
										<li data-type="QUERY">개선요청</li>
                                    </ul>
                                </div> 
                            </div>
                            <div class="scrt">
                                <label class="formTi">보안코드</label>
                                <input id="qna_regist_secret_code_input" type="number" placeholder="보안코드를 입력하세요."> 
								<img id="qna_regist_secret_code_show" src="/jcaptcha?0.9854355936871224" style="margin-left: 10px; vertical-align: middle;" alt="보안코드">
                                <button type="button" onclick="javascript:$boardWrite.refreshSecretCode();" class="refresh">새로고침</button> 
                            </div>
                        </li>
                        <li class="title">
                            <label class="formTi">제목</label>
                            <input id="qna_regist_title_input" type="text" maxlength="33" placeholder="타이틀을 입력하세요."> 
                            <span class="maxLength">33자 이내</span>
                        </li>
                        <li class="exp">
                            <label class="formTi">내용</label>
                            <textarea id="qna_regist_content_input" rows="10" maxlength="1330" placeholder="내용을 입력하세요."></textarea>
                            <span class="maxLength">1330자 이내</span>
                        </li>
                        <li>
                            <label class="formTi">첨부파일 <i>제한 용량 10MB</i></label>
                            <input id="qna_file" type="file" name="qna_file" style="display:none;" onchange="$boardWrite.setFileName(this.value);">
                            <button type="button" class="btnAtch">파일선택</button>
                            <!-- 파일 선택 시 span에 addClass="on" -->
                            <span id="qna_file_span"><span id="qna_regist_file"></span><button id="btnFileDel" type="button" style="display:none;" class="btn btnDel">삭제</button></span>
                        </li>
                    </ul>
                </fieldset>
                
            </form>
            
            <div class="btnRight">
            	<c:choose>
            		<c:when test="${ not empty post_no}">
            			<button type="button" onclick="javascript:location.href='/view/edu/${ss_school_level}/boardView?board_cd=${board_cd}&post_no=${post_no}'" class="btn btnN01">취소</button>
		                <button type="button" onclick="javascript:$boardWrite.checkSecretCode();" class="btn btnN02">질문 수정하기</button>
            		</c:when>
            		<c:otherwise>
		                <button type="button" onclick="javascript:location.href='/view/edu/${ss_school_level}/boardList?board_cd=${board_cd}'" class="btn btnN01">취소</button>
		                <button type="button" onclick="javascript:$boardWrite.checkSecretCode();" class="btn btnN02">질문 등록하기</button>
            		</c:otherwise>
            	</c:choose>
            </div>
        </main>
    </div>
</body>
</html>