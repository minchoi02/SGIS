
(function(W, D){
	W.$board = W.$board || {};

	var boardList = {
		"BOARD_001":"공지사항",
		"BOARD_005":"통계용어설명",
		/*"MQNA_999":"개선사항"*/ //20200915 박은식 개선사항 삭제
	};
	
	$board = {
			
			pageSize : 10,
			currentPageIndex : 1, // 현재 페이지 인덱스
			prevHtmlSouce : null, // 글 항목 생성 HTML 소스 임시저장
			receiveLists : null, // 조회 항목들
			selectIndex : null, // 사용자 선택 항목 인덱스
			searchType : null, // 검색 항목 ( 제목, 내용, 제목+내용 )
			searchWord : null, // 검색어
			searchInitial : null, // 초성검색
			receiveType : null, // 개발자 사이트에서 호출한 파라미터 ( 게시판 종류 )
			receivePostNo : null, // 개발자 사이트에서 호출한 파라미터 ( 게시글 번호 )
			lastData : false, // 마지막 데이터 체크
			/*fileYn : null, *///20200825 박은식 QnA 파일 업로드 여부 체크 //20200915 박은식 개선사항 삭제 

			boardCd : null, // 게시판 코드 ( 고정으로 사용 )
			
			init : function(boardCd){
				this.boardCd = boardCd;
				if(boardList[boardCd]){
					$(".ContArea>h1").text(boardList[boardCd]);
					$board.makeLists();
				}else{
					common_alert("잘못된 접근입니다", "");
				}
			},
			/**
			 * @name : preWordFilter
			 * @description : 색인별 검색
			 * @date : 2020.07.02
			 * @author : 박은식
			 * @history :
			 * @param initial : 통계용어설명 색인별 검색 단어
			 */
			preWordFilter : function (initial, target){
				$board.lastData = false;
				if($(target).hasClass('on')){ //색인 검색으로 클릭한 이니셜을 다시 클릭하면 검색 초기화
					$(".krSrch ul li, .EnSrch ul li").removeClass("on");
					$("#board-list").empty();
					$('#notice_search_initial_text').val('');
					$board.searchBoardLists();
					return;
				}
				$("#board-list").empty();// 기존 리스트를 지우기 위함
				$('#notice_search_initial_text').val(initial);
				$(".krSrch ul li, .EnSrch ul li").removeClass("on");
				$(target).attr("class", "on");
				$board.currentPageIndex = 1; // 검색 시에 pageIndex를 1로 초기화.
				$board.searchBoardLists();
			},
			// 게시판 목록 생성
			makeLists : function() {
				var sopPortalNoticeObj = new sop.portal.expAndNotice.api();

				sopPortalNoticeObj.addParam("board_cd", $board.boardCd);
				sopPortalNoticeObj.addParam("page_num", $board.currentPageIndex);
				if($board.searchInitial != null && $board.searchInitial != ""){
					sopPortalNoticeObj.addParam("initial_srch", $initialSrch.makeSql(this.searchInitial));
				}
				if ($board.searchWord != null && $board.searchWord.length > 0) {
					sopPortalNoticeObj.addParam($board.searchType==undefined?"post_all":$board.searchType, $board.searchWord.toUpperCase());
				}
				sopPortalNoticeObj.request({
					method : "POST",
					async : false,
					url : sgisContextPath + "/ServiceAPI/board/boardLists.json"
				});
			},

			// 게시판 검색
			searchBoardLists : function() {
				$board.searchType = $("#notice_search_select").val();
				$board.searchWord = $("#notice_search_title_text").val();
				if($("#notice_search_initial_text").val() != null && 
				   $("#notice_search_initial_text").val() != undefined && 
				   ($("#notice_search_initial_text").val()).trim() != ""){ //색인검색 체크
					$board.searchInitial = $("#notice_search_initial_text").val();
				} else {
					$board.searchInitial = null;
				}
				if ($board.searchWord.length != 0 && $board.searchWord.length < 2) {
					common_alert( "최소 2자 이상의 검색어가 필요합니다.", "");
					return;
				}

				if (!IsValid("formInput", $board.searchWord)) {
					return;
				}

				$board.makeLists($board.boardCd);
			},

			downloadFile : function(index) {
				var target;

				target = $('body');
				target.prepend("<form id='tempForm'></form>");

				target = $('#tempForm');
				target.attr("method", "post");
				target.attr("style", "top:-3333333333px;");
				target.attr("action", sgisContextPath + "/ServiceAPI/board/downloadFile.download");
				target.append("<input type='hidden' id='file_id'>");
				target.append("<input type='hidden' id='file_nm'>");
				target.append("<input type='hidden' id='file_path'>");
				target.append("<input type='hidden' id='file_extension'>");
				target.append("<input type='hidden' id='file_content_type'>");

				target = $('#file_id');
				target.attr('name', 'file_id');
				target.attr('value', $board.receiveLists[index].file_id);

				target = $('#file_nm');
				target.attr('name', 'file_nm');
				target.attr('value', $board.receiveLists[index].file_nm);

				target = $('#file_path');
				target.attr('name', 'file_path');
				target.attr('value', $board.receiveLists[index].file_path);

				target = $('#file_extension');
				target.attr('name', 'file_extension');
				target.attr('value', $board.receiveLists[index].file_extension);

				target = $('#file_content_type');
				target.attr('name', 'file_content_type');
				target.attr('value', $board.receiveLists[index].file_content_type);

				$('#tempForm').submit();
				$('#tempForm').remove();
			},
			//20200915 박은식 개선사항 삭제 start
			/*//20200825 박은식 QnA 등록 start
			retgistQna : function (post_depth, post_order) {
				var title = $("input[name=post_title]").val(); //20200827 박은식 selector 변경
				var content = $("#cmmnt_opinion_state").val();
				var telNumber = $("input[name=post_title_en]").val();//20200827 박은식 selector 변경
				var fileYn = (!$('#cmmnt-insert-file').val()) ? 'N' : 'Y';
				
				if(title.length < 1) {
					alert("제목을 입력하여 주세요.");
					return;
				}
				
				if(content.length < 1) {
					alert("내용을 입력하여 주세요.");
					return;
				}
				
				
				var sopPortalBoardObj = new sop.portal.boardRegist.api();
				sopPortalBoardObj.addParam("board_cd", 'MQNA_999');
				sopPortalBoardObj.addParam("post_depth", '0');
				sopPortalBoardObj.addParam("post_order", '0');
				sopPortalBoardObj.addParam("post_title", title);
				sopPortalBoardObj.addParam("post_title_en", telNumber);
				sopPortalBoardObj.addParam("post_content", content);
				sopPortalBoardObj.addParam("file_yn", fileYn);
				sopPortalBoardObj.addParam("priority_disp_yn", 'N');
				sopPortalBoardObj.request({
					method : "POST",
					async : false,
					url : sgisContextPath + "/ServiceAPI/board/boardQnARegist.json"
				});	
			}*/
			//20200825 박은식 QnA 등록 End
			//20200915 박은식 개선사항 삭제 start
	};

	$board.ui = {
			/**
			 * @name : navigation
			 * @description : navigation menu 클릭 시 button 활성화
			 * @date : 2020.07.02
			 * @author : 박은식
			 * @history :
			 * @param 
			 */
			navigation : function() {
				if((window.location.pathname).indexOf("introduction") > 0){
					$("#nav_introduction").addClass("on");
					$("#nav_term").removeClass("on");
					$("#nav_notice").removeClass("on");
					$("#nav_qna").removeClass("on");
				}else if((window.location.pathname).indexOf("term") > 0){
					$("#nav_term").addClass("on");
					$("#nav_notice").removeClass("on");
					$("#nav_introduction").removeClass("on");
					$("#nav_qna").removeClass("on");
				} else if((window.location.pathname).indexOf("notice") > 0){
					$("#nav_notice").addClass("on");
					$("#nav_term").removeClass("on");
					$("#nav_introduction").removeClass("on");
					$("#nav_qna").removeClass("on");
				} 
				//20200915 박은식 개선사항 삭제 start
				/*else{
					$("#nav_qna").addClass("on");
					$("#nav_term").removeClass("on");
					$("#nav_introduction").removeClass("on");
					$("#nav_notice").removeClass("on");
				}*/
				//20200915 박은식 개선사항 삭제 start
			},

	};
	
	$initialSrch = {
			check_kor : /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, // 한글 정합성 체크
			check_eng :  /^[a-zA-Z]+$/, // 영어 정합성 체크

			/**
			 * @name : makeSql
			 * @description : 색인별 검색 SQL 생성
			 * @date : 2020.07.02
			 * @author : 박은식
			 * @history :
			 * @param initial : 통계용어설명 색인별 검색 단어
			 */
			makeSql : function(initial){
				if($initialSrch.check_kor.test(initial)){
					return " AND a.post_title >= '"+initial[0]+"' and a.post_title < '"+initial[1]+"'";
				} else if($initialSrch.check_eng.test(initial)) {
					return "AND SUBSTRING(a.post_title_en, 0, 1) = '"+initial+"'";
				}
				return "";
			}
	};
	/*********** Receive Lists Start **********/
	(function() {
		$class("sop.portal.expAndNotice.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {

				var sopAbs = new sop.portal.absAPI();
				var tableName = "board-list";
				if (res.errCd == "0") {
					$board.receiveLists = res.result.summaryList;
					sopAbs.onBlockUIPopup();
					if($board.boardCd=="BOARD_005"){
						//통게용어설명
						$.each(res.result.summaryList,function(cnt,result){
							if(cnt == 9){ //스크롤이 하단에 닿아 다음데이터를 추가로 가져올 경우 cnt 수에 따라 추가데이터가 있는지 없는지 체크
								$board.lastData = false;
								if( ($board.currentPageIndex*10) == res.result.total_count){
									$board.lastData = true;
								}
							} else {
								$board.lastData = true;
							}
							var title = $("<a/>",{html : "<strong>"+result.post_title+"</strong>"});
							var fileList = "";
							$("#"+tableName).append(
								$("<dl/>",{"class":result.priority_disp_yn.toLowerCase() == "y"?"Important":""}).append(
									$("<dt/>").append(title),
									$("<dd/>",{style:"display:none; word-break: keep-all;",html:decodeEntities(result.post_content)}),	// 2020.09.15[한광희] 개행 수정
									fileList
								)
							);
						});
					}else if($board.boardCd=="BOARD_001"){ //20200825 박은식 Q&A 매뉴 추가로 조건문 추가
						$.each(res.result.summaryList,function(cnt,result){
							if(cnt == 9){//스크롤이 하단에 닿아 다음데이터를 추가로 가져올 경우 cnt 수에 따라 추가데이터가 있는지 없는지 체크
								$board.lastData = false;
								if(($board.currentPageIndex*10) == res.result.total_count){
									$board.lastData = true;
								}
							} else {
								$board.lastData = true;
							}
							var title = $("<a/>",{html : "<strong>"+result.post_title+"</strong>"+result.reg_ts,href:"#"});
							var fileList = "";
							if(result.file_yn.toLowerCase() == "y"){
								fileList = $("<dd/>",{"class":"File",style:"display:none",html:$("<a/>",{href:"javascript:$board.downloadFile(" + cnt + ");",text:result.file_nm + "." + result.file_extension})});
							}
							$("#"+tableName).append(
								$("<dl/>",{"class":result.priority_disp_yn.toLowerCase() == "y"?"Important":""}).append(
									$("<dt/>").append(title),
									$("<dd/>",{style:"display:none",html:decodeEntities(result.post_content)}),
									fileList
								)
							);
						});
					}
					//20200915 박은식 개선사항 삭제 start
					/*else{ //20200825 박은식 Q&A 매뉴 추가로 조건문 추가
						console.log(res.result)
						$.each(res.result.summaryList,function(cnt,result){
							if(cnt == 9){//스크롤이 하단에 닿아 다음데이터를 추가로 가져올 경우 cnt 수에 따라 추가데이터가 있는지 없는지 체크
								$board.lastData = false;
								if(($board.currentPageIndex*10) == res.result.total_count){
									$board.lastData = true;
								}
							} else {
								$board.lastData = true;
							}
							var title = $("<a/>",{html : "<strong>"+result.post_title+"</strong>"+result.reg_ts,href:"#"});
							var fileList = "";
							if(result.file_yn.toLowerCase() == "y"){
								fileList = $("<dd/>",{"class":"File",style:"display:none",html:$("<a/>",{href:"javascript:$board.downloadFile(" + cnt + ");",text:result.file_nm + "." + result.file_extension})});
							}
							$("#"+tableName).append(
								$("<dl/>",{"class":result.priority_disp_yn.toLowerCase() == "y"?"Important":""}).append(
									$("<dt/>").append(title),
									$("<dd/>",{style:"display:none;"}).append($("<textarea/>",{style:"word-break: keep-all; width:90%; height:100px; resize : none;",html:decodeEntities(result.post_content), readonly:"readonly"})),//20200904 박은식 리스트 개행 처리 및  textarea 변경
									//$("<dd/>",{style:"display:none; font-size: 13px;",html:decodeEntities("연락처: "+result.post_title_en)}), //20200904 박은식 연락처 삭제요청으로 주석처리
									fileList
								)
							);
						});
					}*/
					//20200915 박은식 개선사항 삭제 end
				} else {
					common_alert(res.errMsg, "");
				}
				sopAbs.onBlockUIClose();
			},
			onFail : function(status) {
			},
		});
	}());
/*********** Receive Lists End **********/

//20200915 박은식 개선사항 삭제 Start	
/*//20200825 박은식 QnA 등록 Start
(function() {
	$class("sop.portal.boardRegist.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res) {

		},
		onFail : function(status) {
		},
	});
}());

//20200825 박은식 QnA 등록 End
//20200915 박은식 개선사항 삭제 end

*/}(window, document))


$(document).ready(function(){
	$board.ui.navigation();
	
	//초최 리스트를 append한 후 스크롤이 생기지 않으면 다음 리스트 10개를 추가로 불러옴 (스크롤 이벤트 발생을 위함)
	while(1){
		if(document.location.href.split('board/')[1] == 'term.sgis' && $('body').prop("scrollHeight") > 813*$board.currentPageIndex){ // 통계용어 설명일 경우
			$board.currentPageIndex++;
		    $board.searchBoardLists();
		}else if(document.location.href.split('board/')[1] == 'notice.sgis' && $('body').prop("scrollHeight") > 1026){ // 공지사항일 경우
			$board.currentPageIndex++;
			$board.searchBoardLists();
		}else{
			break;
		}	
	}
	
	$("#board-search-form").submit(function(){
		var srchKeyword = $("#notice_search_title_text").val(); //알림마당, 공지사항 검색 keyword가 1개 단어일 경우 bordList가 지워지는 문제 처리(조건문 포함)
		if(srchKeyword == null || srchKeyword == ""){
			$("#board-list").empty();
		}else{
			if(srchKeyword.length >= 2){
				$("#board-list").empty();
			}
		}

		$board.currentPageIndex = 1;
		$board.lastData = false;
		$board.searchInitial = null;
		$("#notice_search_initial_text").val(null)

		$board.searchBoardLists();
		$(".krSrch ul li, .EnSrch ul li").removeClass("on");
		return false;
	});

	//스크롤 이벤트 (스크롤이 하단에 닿으면 추가로 리스트를 불러옴)
	$('body').scroll(function(){ 
		 if($board.lastData == true){
			 return ;
		 }
		 
		 if($(this).prop('scrollHeight') == ($(this).scrollTop()+$(this).innerHeight())){
			 $board.currentPageIndex++;
		     $board.searchBoardLists();
	     }
    });

	$("#board-list").on('click', 'dl dt',function(){
			if($(this).parents("dl").children("dd").is(":visible")){
				$(this).parents("dl").children("dd").slideUp("fast");
				$(this).parents("dl").children("dt").removeClass("show");	//20200825 박은식 공지사항 및 통계용어설명 리스트 클릭 시 화살표 변경 처리
			}
			else {
				$(this).parents("dl").children("dd").slideDown("fast");
				$(this).parents("dl").children("dt").addClass("show");		//20200825 박은식 공지사항 및 통계용어설명 리스트 클릭 시 화살표 변경 처리
				
			}
		return false;
	});
	//20201915 박은식 개선사항 삭제   start
	/*//20200825 박은식 QnA 등록 추가 (추후 삭제예정) start
	
	$("#registBtnArea").click(function(){
		javascript:srvLogWrite('O0', '11', '04', '03', '', '');
		$("#comments-form").hide();
	})
	
	$("body").on("change","#community-file input:file",function(){
				if($("#file-list li").length>=5){
					$(this).val(null);
					common_alert("이미지는 최대 5개까지 등록하실 수 있습니다.","");
				}else{
					console.log($(this)[0].files[0].name)
					$("#filePathField").val($(this)[0].files[0].name)
					$("#file-list ul").append($("<li/>",{"data-id":$(this).attr("id")}).append($("<div/>",{"text":$(this)[0].files[0].name}),$("<button/>",{"data-id":$(this).attr("id"), text:"X"}).click(function(){
						$("#cmmnt-insert-file").val('');
						
						// 첨부파일 없을 경우 첨부파일 목록 영역 숨김 처리
						if($("#file-list li").length == 0){
							$("#file-list").hide();
						}
					})));
				}
			});
//	$("#insert-form").heumValidation({autoValidation:false},function(errors){
//		if(errors.length>0){
//			var labelName = "";
//			if($(errors[0].element).data("error-message")){
//				labelName = $(errors[0].element).data("error-message");
//			}
//			common_alert(labelName+errors[0].message,function done(){
//				$(errors[0].element).focus();
//			});
//		}else{
//			var fileYn = (!$('#cmmnt-insert-file').val()) ? 'N' : 'Y';
//			var formData = new FormData($("#insert-form")[0]);
//			formData.encType = "multipart/form-data";
//			$('#board_cd').val('MQNA_999');
//			$('#post_depth').val('0');
//			$('#post_order').val('0');
//			$('#file_yn').val(fileYn);
//			$('#priority_disp_yn').val('N');
//			common_alert("등록되었습니다.", function(){
//				$("#insert-form")[0].action = sgisContextPath+"/ServiceAPI/board/boardQnARegistForm.json";
//				$("#insert-form")[0].submit(function(event){
//					return false;
//				});
//			});
//			
//		}
//		return false;
//	});
	
	$("#filePathField").click(function(){
		$(this).val('');
		$("#cmmnt-insert-file").attr('type', 'text');
		$("#cmmnt-insert-file").attr('type', 'file');
	})
	
	$("#insert-form").heumValidation({autoValidation:false},function(errors){
		if(errors.length>0){
			var labelName = "";
			if($(errors[0].element).data("error-message")){
				labelName = $(errors[0].element).data("error-message");
			}
			common_alert(labelName+errors[0].message,function done(){
				$(errors[0].element).focus();
			});
		}else{
			var fileYn = (!$('#cmmnt-insert-file').val()) ? 'N' : 'Y';
			var formData = new FormData($("#insert-form")[0]);
			formData.encType = "multipart/form-data";
			$('#board_cd').val('MQNA_999');
			$('#post_depth').val('0');
			$('#post_order').val('0');
			$('#file_yn').val(fileYn);
			$('#priority_disp_yn').val('N');
			$("#insert-form")[0].action = sgisContextPath+"/ServiceAPI/board/boardQnARegistForm.json"
			$("#insert-form")[0].submit(function(){
				return false
			});
			$board.retgistQna();
			common_alert("등록되었습니다.", function(){					
					location.reload();
			});
		}
		
		return false;
	});
	
	//20200825 박은식 QnA 등록 추가 (추후 삭제예정) end
	//20201915 박은식 개선사항 삭제   end*/
});


	