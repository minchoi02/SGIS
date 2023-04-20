(function(W,D){
	W.$eduSearchApi = W.$eduSearchApi || {};

	$(document).ready(function() {

		srvLogWrite('T0','05','02','00','H','kwrd='+$eduSearchApi.kwrd);
		
		//검색어 입력 시 연관검색어
		$("#searchInput").keyup(function(key){
			if(key.keyCode != 38 && key.keyCode != 40 ){
				if("" != $("#searchInput").val() && null != $("#searchInput").val()){
				    $(".searchForm ul").addClass("on");
				    if(!keyTmp){
				    	$eduSearchApi.eduRelationKwrdList();
				    	relKwrdCnt = 0;
				    }
				}else{
					$(".searchForm ul").removeClass("on");
				}
			}
		});
		
		//연관검색어 선택 시 이벤트
		$(".searchForm ul li").click(function(){
		    $(".search").val($(this).text());
		    $(".searchForm ul").removeClass("on");
		});
		
		
		//검색어 입력
		$("#searchInput").keydown(function(key){
			
			keyTmp = false;
			
			if("" != $("#searchInput").val().trim() && null != $("#searchInput").val().trim() ){
				//enter
				if(key.keyCode == 13){
//					if(relKwrdCnt != 0){
//						$("#searchInput").val($("#rel_"+relKwrdCnt).text());
//						relKwrdCnt = 0;
//					}else{
					$eduSearchApi.kwrd = $("#searchInput").val();
						location.href="/view/edu/high/searchClass?kwrd="+$("#searchInput").val();
//					}
				}
				//up
				else if(key.keyCode == 38){
					keyTmp = true;
					if(relKwrdCnt > 1){
						relKwrdCnt--;
						$("#relationKwrdDiv li").removeClass("on");
						$("#rel_"+relKwrdCnt).addClass("on");
						$("#searchInput").val($("#rel_"+relKwrdCnt).text());
						$("#rel_"+relKwrdCnt).get(0).scrollIntoView(false);
					}else if(relKwrdCnt == 1){
						relKwrdCnt = 0;
						$("#relationKwrdDiv li").removeClass("on");
						//$(".searchForm ul").removeClass("on");
					}
				//down
				}else if(key.keyCode == 40){
					keyTmp = true;
					if(relKwrdCnt < $("#relationKwrdDiv a").length){
						relKwrdCnt++; 
						$("#relationKwrdDiv li").removeClass("on");
						$("#rel_"+relKwrdCnt).addClass("on");
						$("#searchInput").val($("#rel_"+relKwrdCnt).text());
					}
					$("#rel_"+relKwrdCnt).get(0).scrollIntoView(false);
				}
			}else {
				relKwrdCnt = 0 ;
			}
			
		});

		$eduSearchApi.eduSearchClassResult();
		
	});
	
	$eduSearchApi = {
		//검색결과 바인딩
		kwrd : new URL(window.location.href).searchParams.get("kwrd"),	
		currentPageIndex : 1,			// 현재 페이지 인덱스
		totalCount : null,
		themaId : new URL(window.location.href).searchParams.get("thema_id"),
		list : null,
		// 콘텐츠 목록 생성
		eduSearchClassResult : function () {
			$("#searchInput").val($eduSearchApi.kwrd);
		
			var html = "";
			$.ajax({
				url: '/ServiceAPI/edu/eduSearch.json',
				type:  'POST',
				data:  {
					'school_grade' : 'H',
					'all_yn' : 'N',
					'kwrd' : $eduSearchApi.kwrd,
					'search_type' : 'class',
					'currentPageIndex' : $eduSearchApi.currentPageIndex
				},
				dataType: 'json'
			}).success(function(res){
				if('0' != res.result.contentsListCnt){
					$eduSearchApi.list = res.result.resultList;
					$eduSearchApi.totalCount = res.result.contentsListCnt;
					$.each(res.result.contentsList, function(i, val){
						html += "<li class=''> ";
						html += "<a href='/view/edu/high/classDetail?contents_id="+val.contents_id+"'> ";
						html += "<div class='cardImg'> ";
						html += "<img src='"+val.body_file_nm+"'> ";
						html += "</div> ";
						html += "<div class='cardTxt'> ";
						html += "<span class='contTag'>"+val.thema_nm+"</span> ";
						html += "<em class='cardTi'>"+val.contents_title+"</em> ";
						$.each(val.tagList, function(j, tag){
							html += "<i class='hashTag'>"+tag.kwrd+"</i> ";
						})
						html += "</div> ";
						html += "</a> ";
						html += "</li> ";
					});
					$("#contentsResultDiv").html(html);	
				}else {
					$("#contentsResultDiv").addClass("null")
				}
				$(".contentsCnt").text(res.result.contentsListCnt);
				$(".tchpgmCnt").text(res.result.tchpgmListCnt);
				$(".withMapCnt").text(res.result.withMapListCnt);
				$(".allCnt").text(res.result.withMapListCnt+ res.result.contentsListCnt+ res.result.tchpgmListCnt);
				
			}).fail(function(res){
				console.log(res);
			}).done(function(){
				$eduSearchApi.contentsPaging();
			})
		},
		// 콘텐츠 목록 페이징 처리
		contentsPaging : function () {
			var pageSize = 9;										// 페이지 당
			var totalPage = Math.ceil( $eduSearchApi.totalCount / pageSize);	// 전체 페이지수
			$('.pagenation .paging').paging({
				current : $eduSearchApi.currentPageIndex,
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
					$eduSearchApi.currentPageIndex = page;
					$eduSearchApi.eduSearchClassResult();
				}
			});
		},
		
		//연관검색어 조회
		eduRelationKwrdList : function(){
			var kwrd = $("#searchInput").val();
			var html = "";
			$.ajax({
				url: '/ServiceAPI/edu/eduRelationKwrdList.json',
				type:  'POST',
				data:  {
					'kwrd' : kwrd
				},
				dataType: 'json'
			}).success(function(res){
				$.each(res.result.resultList, function(i, val){
//					html += "<a href='/view/edu/high/searchClass?kwrd="+val.kwrd+"'><li>"+val.kwrdtag+"</li></a>";
					html += "<a href='/view/edu/high/searchClass?kwrd="+val.kwrd+"'><li id='rel_"+(i+1)+"'>"+val.kwrd+"</li></a>";
					
				})
				$("#relationKwrdDiv").html(html);
			})
		},
		
		goSearch : function(menu){
			
			location.href ='/view/edu/high/search'+menu+'?kwrd='+$eduSearchApi.kwrd ;
		}
	}
	
}(window, document));


