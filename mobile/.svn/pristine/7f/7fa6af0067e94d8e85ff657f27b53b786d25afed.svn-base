<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<%@page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!-- begin::header -->
   <div id="header">
      <header class="header">
         <div class="logo"><p>생활권역 통계지도</p></div>
         <div>
            <a href="#n" class="btn-menu">
            	<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M26.25 7H3.75" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M26.25 15H3.75" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M26 23H4" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
            </a>
         </div>
      </header>
            <nav class="nav">
         <div class="bg-blue">
            <div class="d-flex justify-content-between align-items-center">
               <div class="logo"><img src="${ctx }/resources/m2021/images/logo.png" alt="SGIS plus 통계지리정보서비스"></div>
               <a href="#n" class="btn-close"><img src="${ctx }/resources/m2021/images/i_close.png" alt="닫기"></a>
            </div>
            <ul class="gnb">
               <li>
                  <a href="#n">
                     <span>통계 주제도</span>
                     <span><img src=" ${ctx }/resources/m2021/images/i_menu--arrow.png" alt="통계 주제도"></span>
                  </a>
                  <ul class="sub-gnb">
                     <li><a href="#n">인구와 가구</a></li>
                     <li><a href="#n">주거와 교통</a></li>
                     <li><a href="#n">노동과 경제</a></li>
                     <li><a href="#n">환경과 안전</a></li>
                     <li><a href="#n">복지와 문화</a></li>
                     <li><a href="#n"></a></li>
                  </ul>
               </li>
               <li>
                  <a href="#n">
                     <span>내 주변 통계</span>
                     <span><img src="${ctx }/resources/m2021/images/i_menu--arrow.png" alt="내 주변 통계"></span>
                  </a>
               </li>
               <li>
                  <a href="#n">
                     <span>My 통계로</span>
                     <span><img src="${ctx }/resources/m2021/images/i_menu--arrow.png" alt="My 통계로"></span>
                  </a>
               </li>
               <li>
                  <a href="#n">
                     <span class="on">생활권역 통계지도</span>
                  </a>
               </li>
               <li>
                  <a href="#n">
                     <span class="on">총조사 시각화 지도</span>
                     <span><img src="${ctx }/resources/m2021/images/i_menu--arrow.png" alt="총조사 시각화 지도"></span>
                  </a>
               </li>
               <li>
                  <a href="#n">
                     <span class="on">행정통계 시각화 지도</span>
                     <span><img src="${ctx }/resources/m2021/images/i_menu--arrow.png" alt="행정통계 시각화 지도"></span>
                  </a>
               </li>
               <li>
                  <a href="#n">
                     <span>일자리 맵</span>
                     <span><img src="${ctx }/resources/m2021/images/i_menu--arrow.png" alt="일자리 맵"></span>
                  </a>
               </li>
               <li>
                  <a href="#n">
                     <span>지역 현안 소통 지도</span>
                  </a>
               </li>
               <li>
                  <a href="#n">
                     <span>살고 싶은 우리 동네</span>
                     <span><img src="${ctx }/resources/m2021/images/i_menu--arrow.png" alt="살고 싶은 우리 동네"></span>
                  </a>
               </li>
            </ul>
         </div>
         <div class="search">
            <ul class="search__list">
               <li><a href="#n">공지사항</a></li>
               <li><a href="#n">용어설명</a></li>
               <li><a href="#n">서비스소개</a></li>
            </ul>
            <div class="search__form">
               <input type="text" class="form-input" placeholder="검색어 입력">
               <button type="button" class="search__btn"><img src="${ctx }/resources/m2021/images/i_search--form.png" alt="검색"></button>
            </div>
         </div>
         <div class="info">
            <a href="#n">PC버전</a>
            <p>Copyright ⓒStatistics Korea. All Rights Reserved.</p>
         </div>
      </nav>
   </div>
   <!-- end::header -->

   <!-- begin::sub menu -->
   <div class="navi">
      <div class="d-flex align-items-center">
		<a href="${ctx }" class="home"><img src="${ctx }/resources/m2021/img/i_home.png" alt="홈"></a>
		<div class="path">
			<a id="menu-depth1-a" href="#n">
				<span id="menu-depth1-text"></span>
				<span><img src="${ctx }/resources/m2021/img/i_select--ui.png" alt="생활권역 통계지도"></span>
			</a>
			<div id="menu-depth1" class="path__con" style="display: none;">
			</div>
		</div>
		<div class="path sub-path">
			<a id="menu-depth2-a" href="#n">
				<span id="menu-depth2-text"></span>
				<span><img src="${ctx }/resources/m2021/img/i_select--ui.png" alt="생활권역 통계지도"></span>
			</a>
			<div class="path__con" id="menu-depth2" style="display: none;">
				</div>
			</div>
		</div>
   </div>
   <!-- end::sub menu -->
   
   <script>
		$("#menu-depth1,#menu-depth2").empty();
		globalMenu.forEach((item,index)=>{
			const parent = item;
			$("#menu-depth1").append(
				$("<a/>",{"href":$.heum.hasData(item.children)?item.children[0].url:item.url,"text":item.name}).click(function(){
					if(parent.use!==true){
						alert("해당메뉴는 시범서비스 대상 항목이 아닙니다.");
						return false;
					}
				})
			);
			if(item.name==$("meta[name=title]").attr("content")){
				$("#menu-depth1-text").text(item.name);
			}
			if(item.children&&item.name==$("meta[name=title]").attr("content")){
				item.children.forEach((item,index)=>{
					$("#menu-depth2").append(
						$("<a/>",{"href":item.url,"text":item.name}).click(function(){
							if(parent.use!==true){
								alert("해당메뉴는 시범서비스 대상 항목이 아닙니다.");
								return false;
							}
						})
					);
					if(item.name==$("meta[name=sub-title]").attr("content")){
						$("#menu-depth2-text").text(item.name);
					}
				});
			}
		});
		$("#menu-depth1-a,#menu-depth2-a").click(function(){
			const target = $("#"+$(this).attr("id").replace("-a",""));
			if($("#"+$(this).attr("id").replace("-a","")).is(":visible")){
				$(this).find("img").css({
					"-webkit-transform": "rotate(0deg)",
					"transform":"rotate(0deg)"
				});
			}else{
				$(this).find("img").css({
					"-webkit-transform": "rotate(180deg)",
					"transform":"rotate(180deg)"
				});
			}
			target.toggle();
			return false;
		});
	</script>