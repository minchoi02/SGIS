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
	
	<script type="text/javascript" src="/js/plugins/jquery.sha256.js"></script>
	<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
	<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>
	
	<script type="text/javascript" src="/js/common/common.js"></script>
	<script type="text/javascript" src="/sgis_edu/resource/js/common.js?ver=123"></script>
	<script src='/js/plugins/ckeditor/ckeditor.js'></script>
	
	<script type="text/javascript" src="/sgis_edu/resource/js/board/boardView.js"></script>
	
	<style>
		.view .atch+.viewBody{overflow-y:auto;overflow-wrap:break-word;}
		.cke_show_borders {overflow:hidden !important;}
	</style>
	
	<script type="text/javascript">
		$(document).ready(function(){
			$boardView.board_cd = '<c:out value="${board_cd}"/>';
			$boardView.post_no = '<c:out value="${post_no}"/>';
			$boardView.ss_school_level = '<c:out value="${ss_school_level}"/>';
			
			if( $boardView.board_cd != 'BOARD_012' && 
					$boardView.board_cd != 'BOARD_013' && $boardView.board_cd != 'BOARD_014' ){
				alert("잘못된 접근입니다.");
				location.href = '/view/edu/'+$boardView.ss_school_level+'/boardView?board_cd=BOARD_012';
			} else {
				//조회수
				$.ajax({
					url : '/ServiceAPI/board/boardListsHitAdd.json',
					type : 'POST',
					data : {
						board_cd : $boardView.board_cd,
						post_no : $boardView.post_no
					},
					async : false,
					success : function(data) {}
				});
				
				$("#left_"+$boardView.board_cd).addClass("on");
				$(".contTi").html( $("#left_"+$boardView.board_cd).html() );
				
				var opt = { post_no : $boardView.post_no };
				$boardView.makeView( opt );
				
			}
			
			//mng_s 20211208 게시판 보기화면에서 마우스를 올려놓으면 Rich Text Editor 가 떠서 수정
			$("#cke_1_contents > div").attr("title", "");
			
			var log_title = $("#cke_1_contents > div").attr("title", "");
			console.log("log_title 1 [" + log_title);
			setTimeout(function () {
				$("#cke_1_contents > div").attr("title", "");
				console.log("log_title 2 [" + log_title);
	        }, 1500);
			setTimeout(function () {
				$("#cke_1_contents > div").attr("title", "");
				console.log("log_title 3 [" + log_title);
	        }, 3000);
			//좀 늦게 되는 현상이 있어 타임아웃 추가함. 코드가 좀 이상하긴 한데 젤 위의 한문장으로 않되고 타임아웃도 500정도 줘도 않되서 이렇게함. 추후 변경가능
			
			//mng_s 20220323 srv로그 추가
			if(null!=$boardView.ss_school_level && ''!=$boardView.ss_school_level){
				switch($boardView.ss_school_level){
					case 'ele': $boardView.ss_school_level_cd = 'E'; break;
					case 'mid': $boardView.ss_school_level_cd = 'M'; break;
					case 'high': $boardView.ss_school_level_cd = 'H'; break;
					default: ;
				}
			}
			
			if('BOARD_012' == $boardView.board_cd){ /*에듀소식*/ srvLogWrite('T0','02','06','02',$boardView.ss_school_level_cd,'post_no='+$boardView.post_no); }
			if('BOARD_013' == $boardView.board_cd){ /*궁금해요*/ srvLogWrite('T0','02','06','04',$boardView.ss_school_level_cd,'post_no='+$boardView.post_no); }
			if('BOARD_014' == $boardView.board_cd){ /*질문하기*/ srvLogWrite('T0','02','06','06',$boardView.ss_school_level_cd,'post_no='+$boardView.post_no); }
			//mng_e 20220323 srv로그 추가
		});
	</script>

</head>
<body>
	<!-- START::: 에듀  Header -->
	<jsp:include page="/view/edu/${ss_school_level}/header"></jsp:include>
	<!-- END::::: 에듀  Header -->
	
    <div class="sub view">
        <div class="lnb">
            <h2 class="lnbTi">소통공간</h2>
            <ul class="menu">
                <li><a id="left_BOARD_012" href="/view/edu/${ss_school_level}/boardList?board_cd=BOARD_012">에듀소식</a></li>
                <li><a id="left_BOARD_013" href="/view/edu/${ss_school_level}/boardList?board_cd=BOARD_013">궁금해요</a></li>
                <li><a id="left_BOARD_014" href="/view/edu/${ss_school_level}/boardList?board_cd=BOARD_014">질문하기</a></li>
            </ul>
        </div>
        <main>
            <h3 class="contTi">에듀소식</h3>
            <div class="viewWrap">
            </div>
        </main>
    </div>
</body>
</html>