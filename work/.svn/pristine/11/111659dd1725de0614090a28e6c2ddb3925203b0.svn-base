
(function(W,D){
	W.$noticeDetailView = W.$noticeDetailView || {};
	
	$(document).ready(function(){
		$noticeDetailView.event.setUIEvent();
	});
	
	//UI 내용작성
	$noticeDetailView.ui = {

			/**
			 * 
			 * @name         : setBoardContent
			 * @description  : 공지사항 상세정보를 세팅한다.
			 * @date         : 2018. 07. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data   : 데이터
			 */
			setBoardContent : function(data) {
				$("#noticeDetailView").show();
				$("#noticeListView").hide();
				
				var areaId = $("#noticeDetailView");
				var detailInfo = data.reg_ts + "  조회수 : " + data.view_cnt;
				areaId.find("#postTitle").html(data.title);
				areaId.find("#postRegDt").html(detailInfo);
				
				//첨부파일 추가
				if (data.fileList != undefined && data.fileList.length > 0) {
					$("#noticeAttachFileArea").show();
					var html = "";
					for (var i=0; i<data.fileList.length; i++) {
						html +=	"<a href='"+ contextPath +"/api/file/download.do?postNo="+data.post_no+"&attach="+data.fileList[i].attach+"&path="+data.fileList[i].path+"' download>" + data.fileList[i].file_nm + "("+data.fileList[i].file_size+")" + "</a>";
					}
					$(".attachFileArea").html(html);
				}
				
				//CKEDITOR 적용
				if (CKEDITOR.instances.noticeDetailContentArea != undefined) {
					CKEDITOR.instances.noticeDetailContentArea.destroy(true);
				}
				CKEDITOR.replace('noticeDetailContentArea', {
					resize_enabled : false,									
					readOnly : true,
					removePlugins : 'toolbar,elementspath,resize',
					extraPlugins : 'autogrow',
					autoGrow_onStartup :true,
					//contentsCss : 'body {overflow:hidden}'
				});
	        	
				var content = data.content.replace(/&quot;/gi, "'"); 
				areaId.find('#noticeDetailContentArea').html(content);	
			}
	};
	
	//AJAX 내용작성
	$noticeDetailView.request = {
			
			/**
			 * 
			 * @name         : doReqNoticeDetailInfo
			 * @description  : 공지사항 상세정보를 조회한다.
			 * @date         : 2018. 07. 16. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param postNo : 게시물 번호
			 */
			doReqNoticeDetailInfo : function(postNo) {
				var options = {
					params : {
						postNo : postNo
					}
				};
			
				$ajax.requestApi(contextPath + "/api/use/notice/getNoticeDetailInfo.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							$noticeDetailView.ui.setBoardContent(result);
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			}
	};
	
	//EVENT 내용작성
	$noticeDetailView.event = {
			
			setUIEvent : function(){
				
			}
	};
	
}(window,document));