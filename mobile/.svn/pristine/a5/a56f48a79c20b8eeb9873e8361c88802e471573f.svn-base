(function(W, D) {
	W.$communityView = W.$communityView || {};
	$(document).ready(function(){
		$communityView.event.setUIEvent();
	});
	$communityView.ui = {
		all:{//전체
			page : 1,
			pageSize : 3,
			keywords : null,
			makeLists : function(){
				$communityMapPoi.ui.getList("all");
			}
		},
		my:{//로그인한 사용자
			page : 1,
			pageSize : 3,
			keywords : null,
			makeLists : function(){
				$communityMapPoi.ui.getList("my");
			}
		}
	};
	$communityView.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 03. 31. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			$communityMapPoi.ui.getList("markers");
			$communityMapPoi.ui.getList("all");
			if(sop.isLogin){
				$communityMapPoi.ui.getList("my");
			}
			$("a[data-tab=true]").click(function(){
				
				srvLogWrite("M0", "08", "03", "05", "", "");		//등록자료 목록보기
				
				$(this).toggleClass("M_on");
				$("#"+$(this).data('type')+"-community").children(".OpenArea").toggleClass('Open');
				$("#community-keyword").val($communityView.ui[$(this).data("type")].keywords);
				return false;
			}); 
			$("#community-search").submit(function(){
//				srvLogWrite("M0", "08", "03", "06", "", "");		//등록자료 검색
				
				var obj = $communityView.ui[$("a[data-tab=true]").data("type")];
				obj.page = 1;
				obj.keywords = $("#community-keyword").val();
				obj.makeLists();
				return false;
			});
			$("#poi-login-button").click(function(){
				loginConform(contextPath+"/map/community/form.sgis?id="+getParameter("id"));
			});
			$("#poi-register-end-button").click(function(){
				messageAlert.open("알림", "기간이 종료된 소통지도입니다.");
			});
			$("#poi-register-wait-button").click(function(){
				messageAlert.open("알림", "승인대기중입니다");
			});
			$("#poi-register-join-button").click(function(){
				messageConfirm.open("알림","참여승인 요청하시겠습니까?",[{
					title:"승인요청",
					func : function() {
						$.ajax({
							type: "POST",
							url: contextPath+"/community/join.json",
							data:{
								id : getParameter("id")
							},
							dataType: "json",
							async : false,
							success: function(res) {
								if(res.errCd=="0"){
									messageAlert.open("알림", "가입 승인요청 되었습니다.",function(){
										location.reload(true);
									});
								}else{
									messageAlert.open("알림", res.errMsg);
								}
							},
							error: function(xhr, status, errorThrown) {
								messageAlert.open("알림", errorMessage);
							}
						});
					}
				},{title:"취소"}]);
			});
			$("#poi-register-button").click(function(){
			
				location.href=contextPath+"/map/community/form.sgis?id="+getParameter("id");
			});
			$("#reply-write").submit(function(){
				var idName = (communityMapInfo.cmmnty_partcptn_grant_yn=="A"?"별명":"아이디");
				if(sop.isLogin||/M|P|A/.test(communityMapInfo.cmmnty_partcptn_grant_yn)){
					var stamp = uuid();
					if($("#reply_content").val()){
						function submit(id,pw){
							var cmmnty_poi_id = $("#detail-container").data("cmmnty_poi_id");
							var data = {
								cmmnty_map_id : getParameter("id"),
								cmmnty_poi_id : cmmnty_poi_id,
								content : $("#reply_content").val()
							};
							if(/M|P|A/.test(communityMapInfo.cmmnty_partcptn_grant_yn)){
								if(id==undefined||id==null||id.replace(/ /gi,"")==""){
									messageAlert.open("알림", getComleteWordByJongsung(idName,"을","를")+" 입력해주세요",function(){
										$("#reply-write").submit();
									});
									return false;
								}else if(pw==undefined||id==null||pw.replace(/ /gi,"")==""){
									messageAlert.open("알림", "비밀번호를 입력해주세요",function(){
										$("#reply-write").submit();
									});
									return false;
								}
								if(id){
									data.id = id;
								}
								if(pw){
									data.pw = pw;
								}
							}
							$.ajax({
								type: "POST",
								url: contextPath+"/community/reply/regist.json",
								data:data,
								dataType: "json",
								async : false,
								success: function(res) {
									if(res.errCd=="0"){
										messageAlert.open("알림", "등록되었습니다");
										$communityMapPoi.ui.getDetail(cmmnty_poi_id);
									}else{
										messageAlert.open("알림", res.errMsg,function(){
											if(res.errCd===-403){
												$("#reply-write").submit();
											}
										});
									}
								},
								error: function(xhr, status, errorThrown) {
									messageAlert.open("알림", errorMessage);
								}
							});
						}
						if(/M|P|A/.test(communityMapInfo.cmmnty_partcptn_grant_yn)&&communityMapInfo.usr_id!==sop.member_id){
							var ok = {
								title:"등록",
								func : function(opt) {
									var id=$(this).find("#id-"+stamp).val();
									var pw=$(this).find("#pw-"+stamp).val();
									submit(id,pw);
								}
							};
							var cancel = {
								title:"취소",
								func : function(opt) {}
							};
							var html ="";
							html+='<div style="text-align: left;font-size:15px;">';
							html+='	<label for="id-'+stamp+'">'+idName+'</label><input type="text" id="id-'+stamp+'" class="alertInputBox" placeholder="'+getComleteWordByJongsung(idName,"을","를")+' 입력하세요">';
							html+='</div>';
							html+='<div style="text-align: left;font-size:15px;">';
							html+='	<label for="pw-'+stamp+'">비밀번호</label><input type="password" id="pw-'+stamp+'" class="alertInputBox" placeholder="비밀번호를 입력하세요">';
							html+='</div>';
							messageConfirm.open("알림",html,[ok,cancel]);
						}else{
							submit();
						}
					}else{
						messageAlert.open("알림", "댓글 내용을 입력해주세요",function(){
							$("#reply_content").focus();
						});
					}
				}else{
					loginConform();
				}
				return false;
			});
		}
	};
	/**
	 * @name         : loginConform
	 * @description  : 로그인 하라고 메시지창 띄움
	 * @date         : 2016. 01. 03.
	 * @author	     : 나광흠
	 * @history 	 :
	 * @param url    : 로그인 후 돌아올 url
	 */
	function loginConform(url){
		messageConfirm.open("알림","로그인이 필요합니다.<br>이동하시겠습니까?",[{
			title:"확인",
			func : function() {
				login(url);
			}
		},{title:"취소"}]);
	}
}(window, document));