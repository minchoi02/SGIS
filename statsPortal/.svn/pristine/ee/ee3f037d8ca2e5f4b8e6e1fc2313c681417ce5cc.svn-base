/**
 * 에듀 게시판 목록 화면
 * history : 2021.09.15  초기 작성
 * author : jrj
 * version : 1.0
 * see : 
 */
(function(W, D) {
	$(document).ready(function(){
		
		$("#search_post_type>li").click(function(){
			$("#search_post_type>li").removeClass("on");
			$( this ).addClass("on");
		});
		
		$("#search_btn").click(function( e ) {
			$boardList.search( e );
		});
		
		$("#create_btn").click(function( e ){
			if(AuthInfo.authStatus) {
				window.location.href = "/view/edu/"+$boardList.ss_school_level+"/boardWrite?board_cd=BOARD_014";
			} else {
				messageConfirm.open(
		    			 "SGIS 에듀 알림", 
		    			 "로그인 하시겠습니까? \n 취소버튼 클릭시 글쓰기 모드로 글을 쓸수 있습니다",
		    			 btns = [
							{
							    title : "로그인",
							    fAgm : null,
							    disable : false,
							    func : function(opt) {
							    	var url = statsPotalDomain + "/view/edu/"+$boardList.ss_school_level+"/boardWrite?board_cd=BOARD_014"
							    	window.location.href = "/view/member/login_new?returnPage=" + encodeURI(url);
							    }
							 },
							 
		    			     {
							   title : "취소",
							   fAgm : null,
							   disable : false,
							   func : function(opt) {
								   window.location.href = "/view/edu/"+$boardList.ss_school_level+"/boardWrite?board_cd=BOARD_014";
							   }
		    			     }   
		    			     
		    			 ]
		    	);
			}
		});
	});
	
	W.$boardList = W.$boardList || {};
	
	$boardList = {
		board_cd : '',
		search_yn : false,
		curPage : 1,
		makeList : function( opt ){
			opt = ( opt ? opt : {} );
			opt.board_cd = $boardList.board_cd;
			opt.page_num = ( opt.page_num ? opt.page_num : 1 );
			
			if( $boardList.search_yn ){
				opt[ $("#search_post_type>li.on").data("type") ] = $('input[id=search_text]').val();
			}
			
			$.ajax({
				url : '/ServiceAPI/board/boardLists.json',
				type : 'POST',
				data : opt,
				success : function(data) {
					$('tbody[id=boardList] *').remove();
					var list = data.result.summaryList;
					var listElement = '';
					
					if( list.length > 0 ){
						for(var i = 0; i < list.length; i++) {
							var atch = ((list[i].file_yn && list[i].file_yn == "Y" && $boardList.board_cd == 'BOARD_014' ) ? "atch" : "" );
							
							listElement += '<tr class="'+ atch +'">';
							listElement += '<td class="num">' + list[i].boardnum + '</td>';
							
							if( $boardList.board_cd == 'BOARD_014' ){
								if(list[i].low_rank_s_class_cd == "REQST") listElement += '<td class="cate">일반문의</td>';
								if(list[i].low_rank_s_class_cd == "QUERY") listElement += '<td class="cate cate02">개선요청</td>';
							}
							
							listElement += '<td class="title"><a href="javascript:$boardList.view(' + list[i].post_no + ');">' + list[i].post_title + '</a></td>';
							
							if( $boardList.board_cd == 'BOARD_014' ){
								if( list[i].replyyn == "Y"){
									listElement += '<td class="state complete"><span>답변완료</span></td>';
								} else {
									listElement += '<td class="state"><span>진행중</span></td>';
								}
								
								var id =  list[i].reg_member_id;
								if(id == "ysjh8501"){
									id = "guest";
								}
								var ast = id.slice(1, id.length-1);
								var user_id = "";
								for(var j=0; j < ast.length; j++) {
									user_id = user_id.concat(ast[j].replace(ast[j], "*"));
								}
								user_id = id.charAt().concat(user_id.concat(id.charAt(id.length-1)));
								
								listElement += '<td class="writer"><span>'+ user_id +'</span></td>';
							}
							
							if( $boardList.board_cd != 'BOARD_013' ){
								listElement += '<td class="date">' + list[i].reg_ts.replaceAll('-','.').split(' ')[0] + '</td>';
								listElement += '<td class="viewer">' + ( list[i].post_hits ? list[i].post_hits : 0 ) + '</td>';
							}
							listElement += '</tr>';
						}
					} else {
						var thLen = $('tbody[id=boardList]').closest('table').find('thead>tr>th').length;
						listElement += '<td colspan="'+ thLen +'">데이터가 존재하지 않습니다.</td>';
					}
					
					$('tbody[id=boardList]').append(listElement);
					
					var totalCount = data.result.total_count;
					var currentIndex = data.result.curPage;
					var pageSize = 10; // 페이지 당 항목 개수
					var totalPage = Math.ceil(totalCount / pageSize); // 전체 페이지 수
					
					$('.paging').paging({
						current : currentIndex,
						max : totalPage,
						itemClass : 'num',
						itemCurrent : 'on',
						format : '{0}',
						showPrevious : true,
						showNext : true,
						nextClass : 'next',
						prevClass : 'prev',
						firstClass : 'first',
						lastClass : 'last',
						onclick : function(e, page) { // 페이지 선택 시
							$boardList.makeList({ page_num : page });
						}
					});
				}
			});
		},
		
		search : function( e ){
			e.preventDefault();
			
			if( $('input[id=search_text]').val() ){
				$boardList.search_yn = true;
			} else {
				$boardList.search_yn = false;
			}
			
			$boardList.makeList();
			return false;
		},
		
		view : function( id ){
			location.href = '/view/edu/'+$boardList.ss_school_level+'/boardView?board_cd='+$boardList.board_cd+'&post_no='+id;
		}
	}
}(window, document));
