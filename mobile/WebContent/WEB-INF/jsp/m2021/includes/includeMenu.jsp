<%@page contentType="text/html; charset=UTF-8" %>
<%@include file="/WEB-INF/jsp/m2020/includes/taglib.jsp" %>
<nav id="nav" class="nav" style="">
	<div class="bg-white">
		<div class="d-flex justify-content-between align-items-center">
			<div class="logo"><img src="${ctx }/resources/m2021/img/img2022/logo2022.png" alt="SGIS plus 통계지리정보서비스"></div>
			<a href="#" class="btn-close" onclick="javascript:srvLogWrite('O0', '51', '01', '02', '', '');$('#nav').animate({'right':'-100%'});return false;">
				<svg width="30" height="30" viewBox="0 0 30 30" fill="#000" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 1L13 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
					<path d="M13 1L1 13" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
				</svg>
			
			</a>
		</div>
		<ul id="gnb" class="gnb"></ul>
	</div>
	<%-- <form action="${ctx }/m2020/map/search.sgis">
		<div class="search">
<!-- 			<ul class="search__list"> -->
				<li><a href="${ctx }/m2020/map/board/notice.sgis">공지사항</a></li>
				<li><a href="${ctx }/m2020/map/board/term.sgis">주요 용어 설명</a></li>
				<li><a href="${ctx }/m2020/map/board/introduction.sgis">SGIS플러스 소개</a></li>
<!-- 			</ul> -->
			<div class="search__form">
<!-- 				<label for="Searchkeywords" class="sr_only">검색어 입력</label> -->
				<input type="text" name="keywords" class="form-input" id="Searchkeywords" title="검색어입력" placeholder="검색어 입력">
				<button type="submit" class="search__btn" onclick="javascript:srvLogWrite('O0', '51', '01', '14', $('#Searchkeywords').val(), '');"><img src="${ctx }/resources/m2021/img/i_search--form.png" alt="검색"></button>
			</div>
		</div>
	</form> --%>
	<div class="info">
	<%-- <a href="${sgisContextPath }/view/index?param=0;" onclick="javascript:srvLogWrite('O0', '51', '01', '14', '', '');">PC버전</a> --%>
	<p>Copyright ⓒStatistics Korea. All Rights Reserved.</p>
	</div>
</nav>
<script>
	$("#gnb").empty();
	globalMenu.forEach(menu=>{
		const parent = menu;
		const hasChildren = Array.isArray(menu.children)&&menu.children.length>0;
		let children = $("<ul/>",{"class":"sub-gnb","style":"display:none;"});
		if(hasChildren){
			menu.children.forEach(c=>{
				children.append(
					$("<li/>").append($("<a/>",{"href":c.url,"text":c.name,"onclick":c.srvlog}).click(function(){
						if(parent.use!==true){
							alert("해당메뉴는 시범서비스 대상 항목이 아닙니다.");
							return false;
						}
					}))
				);
			});
			if(menu.children.length%2!=0){
				children.append(
					$("<li/>").append($("<a/>"))
				);
			}
		};
		$("#gnb").append(
			$("<li/>").append(
				$("<a/>",{"href":hasChildren?"#":menu.url,"onclick":menu.srvlog,"data-children":hasChildren}).append(
					$("<span/>",{"class":(menu.isNew===true?"on":""),"text":(menu.name=="행정통계 시각화"?"행정통계 시각화 지도":menu.name)}),
					(hasChildren?$("<span/>").append($('<svg width="15" height="10" viewBox="0 0 14 8" fill="#000" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>')):null)
				).click(function(){
					if($(this).data("children")==true){
						let rotate;
						const subGnb = $(this).parent().children(".sub-gnb");
						if(subGnb.is(":visible")){
							rotate = '180deg';
						}else{
							rotate = '0deg';
						}
						subGnb.slideToggle();
						$(this).find('svg').css({transform: 'rotate('+rotate+')'});
						return false;
					}else{
						if(parent.use!==true){
							alert("해당메뉴는 시범서비스 대상 항목이 아닙니다.");
							return false;
						}
					}
				}),
				hasChildren?children:null
			)
		)
	});
</script>