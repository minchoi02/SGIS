
(function(W,D){
	W.$guideDetailView = W.$guideDetailView || {};
	
	$(document).ready(function(){
		$guideDetailView.event.setUIEvent();
	});
	
	//UI 내용작성
	$guideDetailView.ui = {
			
			/**
			 * 
			 * @name         : setBoardContent
			 * @description  : 이용안내 상세정보를 세팅한다.
			 * @date         : 2018. 07. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data   : 데이터
			 */
			setBoardContent : function(data) {
				$("#guideDetailView").show();
				$("#guideListView").hide();
				
				var areaId = $("#guideDetailView");
				areaId.find("#postTitle").html(data.title);
				areaId.find("#postWriterNm").html(data.user_nm);
				areaId.find("#postRegDt").html(data.reg_ts);
				areaId.find("#postViewCnt").html(data.view_cnt);
				
				//첨부파일 추가
				if (data.fileList != undefined && data.fileList.length > 0) {
					var html = "";
					var rowSpan = data.fileList.length;
					for (var i=0; i<data.fileList.length; i++) {
						html += "<tr class='guideAttachFileArea'>";
						if (i==0) {
							html += "<th rowspan='"+rowSpan+"'>첨부파일</th>";
						}
						html += 	"<td class='pLeft' colspan='3'>"+data.fileList[i].file_nm+"</td>";
						html += 	"<th>파일크기</th>";
						html += 	"<td>"+data.fileList[i].file_size+"</td>";
						html += "</tr>";
					}
					areaId.find("table").append(html);
				}
				
				//CKEDITOR 적용
				if (CKEDITOR.instances.guideDetailContentArea != undefined) {
					CKEDITOR.instances.guideDetailContentArea.destroy(true);
				}
				CKEDITOR.replace('guideDetailContentArea', {
					resize_enabled : false,									
					readOnly : true,
					removePlugins : 'toolbar,elementspath,resize',
					extraPlugins : 'autogrow',
					autoGrow_onStartup :true,
					//contentsCss : 'body {overflow:hidden}'
				});
	        	
				var content = data.content.replace(/&quot;/gi, "'"); 
				areaId.find('#guideDetailContentArea').html(content);	
			}
	};
	
	//AJAX 내용작성
	$guideDetailView.request = {
			
			/**
			 * 
			 * @name         : doReqGuideDetailInfo
			 * @description  : 이용안내 상세정보를 조회한다.
			 * @date         : 2018. 07. 16. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param postNo : 게시물 번호
			 */
			doReqGuideDetailInfo : function(postNo) {
				var options = {
					params : {
						postNo : postNo
					}
				};
			
				$ajax.requestApi(contextPath + "/api/use/guide/getGuideDetailInfo.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							$guideDetailView.ui.setBoardContent(result);
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			}
	};
	
	//EVENT 내용작성
	$guideDetailView.event = {
			
			setUIEvent : function(){
				
			}
	};
	
}(window,document));