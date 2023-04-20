(function(W, D) {

	W.thema = W.thema || {};

	$(document).ready(function() {
		
		sessionInfo();
		thema.makeThemaList();
		thema.makeIssueList();
		

		// menu
		$(function() {
			var depth = $('nav .depth');
			var headerBg = $('.headerBg');
			
		    $('.headerBg').css({ height: depth.outerHeight(true) + 190 });
		    $('header').mouseleave(function(){
		        $(this).css({ height: 100 });
		        $(this).removeClass('on');

		    });

		    $('header').mouseenter(function(){
		        $(this).css({ height: headerBg.outerHeight(true) + 100 });
		        $(this).addClass('on');
		    });

		});
	});

	thema = {
		// 주제 목록 생성
		makeThemaList : function() {
			$.ajax({
				url: '/ServiceAPI/edu/eduThemaList.json',
				type: 'GET',
				data: {'school_grade' : 'H'},
				dataType: 'json'
			}).success(function(res){
				var html = "";
				$.each(res.result.resultList, function(i, val){
					html+= "<li><a href=\"javascript:logWriteAndMove('/view/edu/high/classList?thema_id="+val.thema_id+"','T0','02','02','01','H','thema_id="+val.thema_id+"')\">"+val.thema_nm+"</a></li>";
				});
				$("#themaList").html(html);
			}).fail(function(res){
				console.log(res);
			})	
		},
		makeIssueList : function() {
			$.ajax({
				url: '/ServiceAPI/edu/eduIssueList.json',
				type: 'GET',
				data: '',
				dataType: 'json'
			}).success(function(res){
				var html = "";
				
				$.each(res.result.resultList, function(i, val){
					html+= "<li><a href=\"javascript:logWriteAndMove('/view/edu/high/issueList?issue_id="+val.issue_id+"','T0','02','02','04','H','issue_id="+val.issue_id+"')\">"+val.issue_nm+"</a></li>";
				});
				$("#issueList").html(html);
				
			}).fail(function(res){
				console.log(res);
			})	
		},
	};


	
}(window, document));

