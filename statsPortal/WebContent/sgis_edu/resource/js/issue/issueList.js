(function(W, D) {
	
	W.contents = W.contents || {};

	$(document).ready(function() {
		sessionInfo();
		contents.makeSchoolGradeCd();
		srvLogWrite('T0','02','04','01',contents.schoolGradeCd,'issue_id='+contents.issueId);
		contents.makeIssueContentsList();
		contents.makeIssueList();
		
	});

	contents = {
		currentPageIndex : 1,			// 현재 페이지 인덱스
		totalCount : null,
		issueId : new URL(window.location.href).searchParams.get("issue_id"),
		list : null,
		schoolGradeCd : null,
		// 콘텐츠 목록 생성
		makeIssueContentsList : function () {
			var html = "";
			$.ajax({
				url: '/ServiceAPI/edu/eduIssueContentsList.json',
				type: 'POST',
				data: {'issue_id' : contents.issueId,
					   'currentPageIndex' : contents.currentPageIndex
					  },
				dataType: 'json'
			}).success(function(res){
				contents.list = res.result.resultList;
				contents.totalCount = res.result.totalCount;
				$.each(res.result.resultList, function(i, val){
					html += "<li><a href='/view/edu/"+$("#school_grade").val()+"/issueDetail?contents_id="+val.contents_id+"'>";
					html += "<div class='cardImg'><img src='"+val.body_file_nm+"'></div>";
					html += "<div id='tag_"+val.contents_id+"' class='cardTxt'>";
					html += "<em class='cardTi'>"+val.contents_title+"</em>";
					html += "</div></a></li>";
				});
				
			}).fail(function(res){
				console.log(res);
			}).done(function(){
				//console.log(html);
				$("#contentsList").html(html);
				contents.makeContentsHashTagList();
				contents.contentsPaging();
			})
		},
		
		makeContentsHashTagList : function () {
			for(i = 0 ; i < contents.list.length ; i++){
				var contents_id =  contents.list[i].contents_id;
				var html = "";
				$.ajax({
					url: '/ServiceAPI/edu/eduContentsHashtag.json',
					type: 'POST',
					data: {'contents_id' : contents.list[i].contents_id},
					dataType: 'json'
				}).success(function(res){
					html = "";
					$.each(res.result.resultList, function(j, val){
						html = "<i class='hashTag'>"+val.kwrd+"</i>";
						$("#tag_"+val.contents_id).append(html);
					});
				}).fail(function(res){
					console.log(res);
				}).done(function(){
					
				})
				}
		},
		
		// 콘텐츠 목록 페이징 처리
		contentsPaging : function () {
			var pageSize = 6;										// 페이지 당
			var totalPage = Math.ceil( contents.totalCount / pageSize);		// 전체 페이지수
			
			$('.pagenation .paging').paging({
				current : contents.currentPageIndex,
				max : totalPage,
				itemClass : 'num',
				itemCurrent : 'on',
				format : '{0}',
				showPrevious : true,
				showNext : true,
				next  : '<a class="next"><img src="/sgis_edu/resource/images/icon_btnPage03_1.png"  alt="다음"/></a>',
				prev  : '<a class="prev"><img src="/sgis_edu/resource/images/icon_btnPage03_1.png"  alt="이전"/></a>',
				first : '<a class="first"><img src="/sgis_edu/resource/images/icon_btnPage03_2.png"  alt="처음"/></a>',
				last  : '<a class="last"><img src="/sgis_edu/resource/images/icon_btnPage03_2.png"  alt="마지막"/></a>',
				onclick : function(e,page){							// 페이지 선택시
					contents.currentPageIndex = page;
					contents.makeIssueContentsList();
				}
			});
		},
		
		// 주제 목록 생성
		makeIssueList : function () {
			$.ajax({
				url: '/ServiceAPI/edu/eduIssueList.json',
				type: 'GET',
				data: '',
				dataType: 'json'
			}).success(function(res){
				var html = "";
				$.each(res.result.resultList, function(i, val){
					if( val.issue_id == contents.issueId ){
						html += "<li><a class='"+val.issue_id+" on' href='/view/edu/"+$("#school_grade").val()+"/issueList?issue_id="+val.issue_id+"'>"+val.issue_nm+"</a></li>";
						$(".contTi").text(val.issue_nm);
					}else {
						html += "<li><a class='"+val.issue_id+"' href='/view/edu/"+$("#school_grade").val()+"/issueList?issue_id="+val.issue_id+"'>"+val.issue_nm+"</a></li>";
					}
				});
				$("#menuList").html(html);
				
			}).fail(function(res){
				console.log(res);
			})
		},
		//학교등급 코드 생성
		makeSchoolGradeCd : function () {
			if("ele" == $("#school_grade").val()){ contents.schoolGradeCd = 'E';
			}else if("mid" == $("#school_grade").val()){ contents.schoolGradeCd = 'M';
			}else if("high" == $("#school_grade").val()){ contents.schoolGradeCd = 'H';
			}
		}

	};
	

	
}(window, document));
