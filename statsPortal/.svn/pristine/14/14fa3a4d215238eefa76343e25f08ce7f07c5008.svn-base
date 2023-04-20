(function(W, D) {

	W.contents = W.contents || {};

	$(document).ready(function() {
		
		srvLogWrite('T0','02','03','01','H','thema_id='+contents.themaId);
		contents.makeContentsList();
		contents.makeThemaList();
		
	});

	contents = {
		currentPageIndex : 1,			// 현재 페이지 인덱스
		totalCount : null,
		themaId : new URL(window.location.href).searchParams.get("thema_id"),
		list : null,
		// 콘텐츠 목록 생성
		makeContentsList : function () {
			var html = "";
			$.ajax({
				url: '/ServiceAPI/edu/eduContentsList.json',
				type: 'POST',
				data: {'thema_id' : contents.themaId,
					   'currentPageIndex' : contents.currentPageIndex
					  },
				dataType: 'json'
			}).success(function(res){
				contents.list = res.result.resultList;
				contents.totalCount = res.result.totalCount;
				$.each(res.result.resultList, function(i, val){
					html += "<li><a href='/view/edu/high/classDetail?contents_id="+val.contents_id+"'>";
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
						//해시태그 7개까지만 
						if(j <= 6){
							html = "<i class='hashTag'>"+val.kwrd+"</i>";
							$("#tag_"+val.contents_id).append(html);
						}
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
					contents.makeContentsList();
				}
			});
		},
		
		// 주제 목록 생성
		makeThemaList : function () {
			$.ajax({
				url: '/ServiceAPI/edu/eduThemaList.json',
				type: 'GET',
				data: '',
				dataType: 'json'
			}).success(function(res){
				var html = "";
				$.each(res.result.resultList, function(i, val){
					if( val.thema_id == contents.themaId ){
						html += "<li><a class='"+val.thema_id+" on' href='/view/edu/high/classList?thema_id="+val.thema_id+"'>"+val.thema_nm+"</a></li>";
						$(".contTi").text(val.thema_nm);
					}else {
						html += "<li><a class='"+val.thema_id+"' href='/view/edu/high/classList?thema_id="+val.thema_id+"'>"+val.thema_nm+"</a></li>";
					}
				});
				$("#menuList").html(html);
				
				
				
			}).fail(function(res){
				console.log(res);
			})
		},

	};
	

	
}(window, document));

function chngThema(themaId){
	
}