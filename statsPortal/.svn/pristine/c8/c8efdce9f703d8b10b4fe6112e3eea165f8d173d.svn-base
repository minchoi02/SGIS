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
	
	<script src="/js/board/jquery.paging.js"></script>
	<script type="text/javascript" src="/sgis_edu/resource/js/board/boardList.js"></script>
	
	<script type="text/javascript">
		$(document).ready(function(){
			$boardList.board_cd = '<c:out value="${board_cd}"/>';
			$boardList.ss_school_level = '<c:out value="${ss_school_level}"/>';
			
			if( $boardList.board_cd != 'BOARD_012' && 
					$boardList.board_cd != 'BOARD_013' && $boardList.board_cd != 'BOARD_014' ){
				alert("잘못된 접근입니다.");
				location.href = '/view/edu/'+$boardList.ss_school_level+'/boardList?board_cd=BOARD_012';
			} else {
				$("#left_"+$boardList.board_cd).addClass("on");
				$(".contTi").html( $("#left_"+$boardList.board_cd).html() );
				
				var opt = { page_num : '<c:out value="${page}"/>' };
				$boardList.makeList( opt );
			}
			//mng_s 20220323 srv로그 추가
			if(null!=$boardList.ss_school_level && ''!=$boardList.ss_school_level){
				switch($boardList.ss_school_level){
					case 'ele': $boardList.ss_school_level_cd = 'E'; break;
					case 'mid': $boardList.ss_school_level_cd = 'M'; break;
					case 'high': $boardList.ss_school_level_cd = 'H'; break;
					default: ;
				}
			}
			
			if('BOARD_012' == $boardList.board_cd){ /*에듀소식*/ srvLogWrite('T0','02','06','01',$boardList.ss_school_level_cd,''); }
			if('BOARD_013' == $boardList.board_cd){ /*궁금해요*/ srvLogWrite('T0','02','06','03',$boardList.ss_school_level_cd,''); }
			if('BOARD_014' == $boardList.board_cd){ /*질문하기*/ srvLogWrite('T0','02','06','05',$boardList.ss_school_level_cd,''); }
			//mng_e 20220323 srv로그 추가
		});
	</script>
	
	<style>
		.btnRight{position: absolute;bottom:10px;right:50px;}
		.tbl th, .tbl td{padding: 12px 7px !important;}
		.btnWrap.paging{margin-top:45px !important;}
		.paging a{width:36px; height:36px; border-radius: 36px; margin: 0 5px;}
		.paging .num{color:rgba(24,24,24,0.7); line-height: 36px; text-align: center;}
		.paging .num.on, .paging .num:hover{color:rgba(24,24,24,1); font-weight: 600;}
		.paging a:not(.num){font-size:0; border:1px solid rgba(0,0,0,0.1)}
		.paging a:not(.num)::after{content:""; display:block; width:100%; height:100%; background: no-repeat 50%; opacity: .3;}
		.paging a:not(.num):hover::after{opacity: .8;}
		.paging a.first::after, .paging a.last::after{background-image: url(/sgis_edu/resource/images/icon_btnPage03_2.png);}
		.paging a.first::after, .paging a.prev::after{transform: rotate(180deg);}
		.paging a.prev::after, .paging a.next::after{background-image: url(/sgis_edu/resource/images/icon_btnPage03_1.png);}
		.alertPopupWrapper .btnStyle01{padding:1px 10px !important;}
	</style>

</head>
<body>
	<!-- START::: 에듀  Header -->
	<jsp:include page="/view/edu/${ss_school_level}/header"></jsp:include>
	<!-- END::::: 에듀  Header -->
	<input type="hidden" value="${ss_school_level}" id="school_grade"/>
    <div class="sub list">
        <div class="lnb">
            <h2 class="lnbTi">소식듣기</h2>
            <ul class="menu">
                <li><a id="left_BOARD_012" href="/view/edu/${ss_school_level}/boardList?board_cd=BOARD_012">에듀소식</a></li>
                <li><a id="left_BOARD_013" href="/view/edu/${ss_school_level}/boardList?board_cd=BOARD_013">궁금해요</a></li>
                <li><a id="left_BOARD_014" href="/view/edu/${ss_school_level}/boardList?board_cd=BOARD_014">질문하기</a></li>
            </ul>
        </div>
        <main>
            <h3 class="contTi"></h3>
            <div class="filterWrap">
                <form>
                    <fieldset>
                        <div class="select">
                            <span>전체</span>
                            <input type="checkbox" id="chk1">
                            <label for="chk1"></label>
                            <ul id="search_post_type">
                                <li data-type="post_all" class="on">전체</li>
                                <li data-type="post_title">제목</li>
                                <li data-type="post_content">내용</li>
                            </ul>
                        </div>
                        <input id="search_text" onkeypress="if(event.keyCode==13){javascript:$boardList.search( event );}" type="search" class="search" placeholder="검색어를 입력하세요">
                        <button id="search_btn" type="button" class="btnSearch">검색</button>
                    </fieldset>
                </form>
            </div>
            <div class="tbl">
                <table>
                     <colgroup>
                        <col width="7%">
                     	<c:if test="${board_cd eq 'BOARD_014' }">
							<col width="10%">
						</c:if>
						<col width="">
						<c:if test="${board_cd eq 'BOARD_014' }">
							<col width="10%">
							<col width="10%">
						</c:if>
						<c:if test="${board_cd ne 'BOARD_013' }">
							<col width="10%">
							<col width="10%">
						</c:if>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>NO</th>
                            <c:if test="${board_cd eq 'BOARD_014' }">
	                            <th>질문유형</th>
                            </c:if>
                            <th>제목</th>
                            <c:if test="${board_cd eq 'BOARD_014' }">
								<th>진행</th>
                         		<th>작성자</th>
							</c:if>
							<c:if test="${board_cd ne 'BOARD_013' }">
								<th>날짜</th>
								<th>조회수</th>
							</c:if>
                       </tr>
                    </thead>
                    <tbody id="boardList">
                    </tbody>
                </table>
            </div>
            
            <div class="btnWrap paging">
            </div>
            
            <c:if test="${board_cd eq 'BOARD_014' }">
	            <div class="btnRight">
	                <button id="create_btn" type="button" onclick="javascript:void();" class="btn btnN02 btnArr">질문하기</button>
	            </div>
			</c:if>
        </main>
    </div>
</body>
</html>