/**
 * 에듀 게시판 상세 화면
 * history : 2021.09.15  초기 작성
 * author : jrj
 * version : 1.0
 * see : 
 */
(function(W, D) {
	W.$boardView = W.$boardView || {};
	
	$boardView = {
		board_cd : '',
		
		makeView : function( opt ){
			opt.board_cd = $boardView.board_cd;
			
			$.ajax({
				url : '/ServiceAPI/board/boardListsView.json',
				type : 'POST',
				data : opt,
				async : false,
				success : function(data) {
					if(data.errCd == "0") {
						var result = data.result;
						var html = '';
						
						if( result.summaryList && result.summaryList.length > 0 ){
							var listItem = result.summaryList[0];
							
							var title = listItem.post_title.replace(/\n/gim, "</br>");
							var content = listItem.post_content.replace(/\n/gim, "</br>");
							
							html += '<div class="viewHead">';
							html += '	<span class="title">'+ title +'</span>';
							
							if( $boardView.board_cd == 'BOARD_014' ){
								html += '<span class="writer">'+ listItem.reg_member_id +'</span>';
							}
							html += '	<span class="date">'+ listItem.reg_ts.replaceAll('-','.').split(' ')[0] +'</span>';
							if( $boardView.board_cd != 'BOARD_013' ){
								html += '	<span class="viewer">'+ listItem.post_hits +'</span>';
							}
							html += '</div>';
								
							if(listItem.file_yn == 'Y' && listItem.file_nm ) {
								html += '<div class="atch on">';
								for(var i = 0; i < result.summaryList.length; i ++) {
									var fileItem = result.summaryList[i];
									
									html += '<a href="javascript:$boardView.downloadFile(\''+i+'\',\'' + fileItem.file_path + '\', \'' + fileItem.file_id + '\', \'' + fileItem.file_extension + '\');">';
									html += fileItem.file_nm + "." + fileItem.file_extension + "</a>";
								}
								html += '</div>';
							} else {
								html += '<div class="atch"><a href="javascript:void(0);"></a></div>';
							}
							
							html += '<div class="viewBody">';
							html += "<textarea id='POST_CONTENT0' style='width:777px;height:300px;'></textarea>";
//		                    html += result.summaryList[i].post_content.replace(/\n/gim, "</br>");
							html += '</div>';
							
							if(listItem.reply_content != null) {
								html += '<div class="answer">';
								html += '    <p>'+ listItem.reply_content.replace(/\n/gim, "</br>") +'</p>';
								html += '</div>';
							}
							
							html += '<div class="btnRight">';
							if(listItem.modifyMode) {
								html += '<button type="button" onclick="$boardView.fnModify();" class="btn btnN01" title="수정">수정</button>';
								html += '<button type="button" onclick="$boardView.fnDelete();" class="btn btnN01" title="삭제">삭제</button>';
							}
							var param = 'board_cd='+$boardView.board_cd;
							html += '<button type="button" onclick="javascript:location.href=\'/view/edu/'+$boardView.ss_school_level+'/boardList?'+ param +'\'" class="btn btnN01">목록으로</button>';
							html += '</div>';
								
							$(".viewWrap").empty();
							$(".viewWrap").html(html);					
							
							var editor = CKEDITOR.replace('POST_CONTENT0', {
								resize_enabled : false,									
								readOnly : true,
								removePlugins : 'toolbar,elementspath,resize',
								extraPlugins : 'divarea,autogrow',
								autoGrow_onStartup : true,
								contentsCss : 'body {overflow:hidden}',
								style : {'overflow-y':'auto'}
							});
							
							if(editor != null) {
								var content = listItem.post_content;//.replace(/\n/gim, "</br>");
								$('#POST_CONTENT0').html(content);								
								editor.setData($('#POST_CONTENT0').text());
							} else {
								var content = listItem.post_content.replace(/\n/gim, "</br>");
								
								//mng_s 20201130  이진호
								//content = content.replace(/&lt;/gim,"<").replace(/&gt;/gim,">").replace(/&quot;/gim,"'").replace(/&amp;quot;/gim,"'").replace(/&nbsp;/gim," ").replace(/&amp;nbsp;/gim," ");
								content = content.replace(/&lt;/gim,"<").replace(/&gt;/gim,">").replace(/&quot;/gim,"'").replace(/&amp;quot;/gim,"'").replace(/&nbsp;/gim," ").replace(/&amp;nbsp;/gim," ").replace(/&amp;lsquo;/gim,"'").replace(/&amp;rsquo;/gim,"'").replace(/&amp;gt;/gim,">").replace(/&amp;middot;/gim,"·");
								//mng_e 20201130 이진호
								
								$('#mobile_pcversion').html(content);
								//$('#mobile_pcversion').html("<a href='aaa'>aaa</a>");
							}
						}
					} else {
						messageAlert.open("알림", data.errMsg);
					}
				}
			});
			/* debugger;
			$('div.cke_contents_ltr').css('height', '300px'); */
		},
		
		fnModify : function() {
			window.location.href = "/view/edu/"+$boardView.ss_school_level+"/boardWrite?board_cd="+$boardView.board_cd+"&post_no="+$boardView.post_no;
		},
		
		fnDelete : function() {
			if(confirm("글을 삭제 하시겠습니까?\r\n댓글도 함께 삭제 됩니다.")) {
				$.ajax({
					url : '/ServiceAPI/board/boardDelete.json',
					type : 'POST',
					data : {
							board_cd : $boardView.board_cd,
							post_no : $boardView.post_no
					},
					async : false,
					success : function(data) {
						if(data.errCd == "0") {
							window.location.href = "/view/edu/"+$boardView.ss_school_level+"/boardList?board_cd="+$boardView.board_cd;
						}
					}
				});
			}
		},
		
		downloadFile : function(index, file_path, file_id, file_extension) {
			var openNewWindow = window.open("about:blank");
			openNewWindow.location.href = "/upload/board/" + $boardView.board_cd + "/" + file_id + "." + file_extension;
		},
		
		list : function(){
			location.href = '/view/edu/'+$boardView.ss_school_level+'/boardList?board_cd='+$boardView.board_cd;
		}
	}
}(window, document));
