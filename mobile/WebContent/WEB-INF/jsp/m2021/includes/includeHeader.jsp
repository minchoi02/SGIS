<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<%@page contentType="text/html; charset=UTF-8" %>
<div id="header">
	<header class="header">
		<div class="">
			<a href="#" class="home" onclick="location.href='${ctx}/';">
				<svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M14.9987 2.12098L27.3281 11.7213H24.412C24.0176 11.7213 23.6979 12.0165 23.6979 12.3809V23.681H19.0616V16.5923C19.0616 16.2282 18.7419 15.9329 18.3475 15.9329H11.6496C11.255 15.9329 10.9353 16.2282 10.9353 16.5923V23.681H6.29928V12.3809C6.29928 12.0165 5.97954 11.7213 5.58517 11.7213H2.6693L14.9987 2.12098ZM0.714269 13.0403H4.8708V24.3404C4.8708 24.7048 5.19053 25 5.58517 25H11.6496C12.044 25 12.3637 24.7048 12.3637 24.3404V17.2519H17.6331V24.3404C17.6331 24.7048 17.9529 25 18.3475 25H24.412C24.8066 25 25.1261 24.7048 25.1261 24.3404V13.0403H29.2829H29.2856C29.6803 13.0403 30 12.7451 30 12.3809C30 12.1612 29.8838 11.967 29.7053 11.8472L15.4592 0.754154C15.1929 0.547159 14.8043 0.547159 14.538 0.754154L0.253817 11.8767C0.0246886 12.0552 -0.0595858 12.3471 0.0434117 12.6073C0.146409 12.8674 0.414364 13.0403 0.714269 13.0403Z" fill="white"/>
				</svg>	
			</a>
		</div>
		<div class="logo"><p><sitemesh:write property='meta.title'/></p></div>
		<div>
			<a href="#n" class="btn-menu" onclick="$('#nav').animate({'right':'0'});return false;">
				<svg width="30" height="30" viewBox="0 0 30 30" fill="#000" xmlns="http://www.w3.org/2000/svg">
					<path d="M26.25 7H3.75" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M26.25 15H3.75" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M26 23H4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</a>
		</div>
	</header>
	<jsp:include page="/WEB-INF/jsp/m2021/includes/includeMenu.jsp"/>
</div>
<div class="navi" style="display:none">
	<div class="d-flex align-items-center">
		<a href="#" class="home" onclick="location.href='${ctx}/';"><img src="${ctx }/resources/m2021/img/i_home.png" alt="홈"></a>
		<div class="path">
			<a id="menu-depth1-a" href="#n" style="font-size:min(3vw, 14px);">
				<span id="menu-depth1-text"></span>
				<span><img src="${ctx }/resources/m2021/img/i_select--ui.png" alt="생활권역 통계지도"></span>
			</a>
			<div id="menu-depth1" class="path__con" style="display: none;">
			</div>
		</div>
		<div class="path sub-path">
			<a id="menu-depth2-a" href="#n" style="font-size:min(3vw, 14px);">
				<span id="menu-depth2-text"></span>
				<span><img src="${ctx }/resources/m2021/img/i_select--ui.png" alt="생활권역 통계지도"></span>
			</a>
			<div class="path__con" id="menu-depth2" style="display: none;z-index:1001;">
			</div>
		</div>
	</div>
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
</div>