
(function(W,D){
	W.$guideMain = W.$guideMain || {};
	
	$(document).ready(function(){
		$guideMain.event.setUIEvent();
	});
	
	//UI 내용작성
	$guideMain.ui = {
			doChangeView : function(type) {
				switch(type) {
					case "notice": //공지사항
						$noticeView.ui.initView();
						$noticeView.request.doReqNoticeList(0);
						break;
					case "faq": //FAQ
						$faqView.ui.initView();
						$faqView.request.doReqFaqList(0);
						break;
					case "qna": //Q&A
						$qnaView.ui.initView();
						$qnaView.request.doReqQnaList(0);
						break;
					case "guide": //이용안내
						$guideView.ui.initView();
						//$guideView.request.doReqGuideList(0);
						break;
					default:
						break;
				}
				$(".boardArea").hide();
				$("#"+type+"Area").show();
			}
 	};
	
	//EVENT 내용작성
	$guideMain.event = {
			
			setUIEvent : function(){
				
				//게시판 타입
				$(".boardType").on("click", function() {
					$(".boardType").removeClass("on");
					$(this).addClass("on");
		
					var type = $(this).attr("id");
					window.location.href = contextPath + "/view/use/guideMain/" + type;
				});
			}
	};
	
}(window,document));