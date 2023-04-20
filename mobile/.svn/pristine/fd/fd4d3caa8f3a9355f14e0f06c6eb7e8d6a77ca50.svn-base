(function(W, D) {
	W.$communityIntro = W.$communityIntro || {};
	$(document).ready(function(){
		srvLogWrite('M0','08', '01', '00', '', '');
		$communityIntro.event.setUIEvent();
	});
	$communityIntro.ui = {
		all:{//전체
			page : 1,
			pageSize : 10,
			keywords : null,
			makeLists : function(){
				$communityIntro.ui.getList("all");
			}
		},
		open:{//개설
			page : 1,
			pageSize : 10,
			keywords : null,
			makeLists : function(){
				$communityIntro.ui.getList("open");
			}
		},
		join:{//가입
			page : 1,
			pageSize : 10,
			keywords : null,
			makeLists : function(){
				$communityIntro.ui.getList("join");
			}
		},
		/**
		 * @name        : createList
		 * @description : 리스트 생성
		 * @date        : 2016. 03. 21. 
		 * @author      : 나광흠
		 * @history     :
		 * @param type  : 타입
		 * @param res   : response
		 * @param list  : list element
		 */
		createList : function(type,res,list){
			$.each(res.result.list,function(cnt,node){
				var image = $("<dd/>",{"class":"Image","text":node.cmmnty_map_nm+" 대표이미지"});
				var approval = "";
				if(type!="hot"&&node.cmmnty_partcptn_grant_yn=="Y"){
					if(node.approval_distinct){
						if(node.approval_distinct=='WA'){
							approval = $("<img/>",{"src":contextPath+"/resources/images/community/icon_approve_standby.png","alt":"승인대기"});
						}else if(node.approval_distinct=='A'){//승인
							approval = $("<img/>",{"src":contextPath+"/resources/images/community/icon_approve_finish.png","alt":"승인완료"});
						}else if(node.approval_distinct=='D'){//탈퇴
							approval = $("<img/>",{"src":contextPath+"/resources/images/community/icon_approve_return.png","alt":"승인반려"});
						}
					}
				}
				list.append(
					$("<dl/>",{"class":(type=="hot"?(cnt==0?"M_on":""):(node.cmmnty_partcptn_grant_yn=="Y"?"lock":"")),style:(type=="hot"?(cnt==0?"":"display:none;"):"")}).append(
						$("<dt/>").append($("<a/>",{"href":contextPath+"/map/community.sgis?id="+node.cmmnty_map_id,"text":node.cmmnty_map_nm}),approval),
						$("<dd/>",{"class":"InfoMember"}).append(
							$("<p/>",{"class":"subtitle","text":node.intrcn}),
							$("<p/>",{"class":"Info"}).append(
								$("<span/>",{"class":"InfoBasic","text":"개설자:"+node.usr_id+" | 개설일:"+node.reg_date}),
								$("<span/>",{"class":"Member","html":"<strong>참여인원</strong> "+node.join_cnt+" 명"}),
								$("<span/>",{"class":"Count","html":"<strong>게시글</strong> "+node.poi_cnt+" 명"})
							)
						),
						image	
					).click(function(){
						apiLogWrite2("K1",node.cmmnty_map_id,node.cmmnty_map_nm,"없음","00","없음");
						
						srvLogWrite("M0", "08", "03", "01", node.cmmnty_map_id, "");		
						
						location.href = contextPath+"/map/community.sgis?id="+node.cmmnty_map_id;
					})
				);
				$("<img/>",{src:sgisContextPath+node.path_nm+"thumbnail/thumbnail-L-"+node.save_file_nm}).load(function(){
					image.css({"background-image":"url("+sgisContextPath+node.path_nm+"thumbnail/thumbnail-L-"+node.save_file_nm+")"});
				});
			});
		},
		/**
		 * @name        : setList
		 * @description : 리스트 내용 셋팅
		 * @date        : 2016. 03. 21. 
		 * @author      : 나광흠
		 * @history     :
		 * @param type  : 타입
		 * @param res   : response
		 */
		setList : function(type,res){
			$("#"+type+"-count").text(res.result.total);
			var list = $("#"+type+"-community-list");
			list.empty();
			if(res.result.total>0){
				$communityIntro.ui.createList(type,res,list);
			}else{
				var emptyText = "소통지도가 존재하지 않습니다"; 
				if(type=="open"){
					emptyText = "개설한 "+emptyText;
				}else if(type=="join"){
					emptyText = "가입한 "+emptyText;
				}
				list.append($("<dl/>").append("<dd/>",{style:"padding-left:0px;"}).append($("<a/>",{"class":"NoData","text":emptyText})))
			}
			
		},
		/**
		 * @name        : getList
		 * @description : 리스트
		 * @date        : 2016. 03. 21. 
		 * @author      : 나광흠
		 * @history     :
		 * @param type  : 타입
		 */
		getList : function(type){
			if(!type){
				type = "all";
			}
			var obj = new sop.openApi.communityList.api();
			obj.addParam("bnd_year", bndYear);
			obj.addParam("page", $communityIntro.ui[type].page);
			obj.addParam("from_ce", "C");
			if($communityIntro.ui[type].keywords){
				obj.addParam("keywords", $communityIntro.ui[type].keywords);
			}
			obj.addParam("pageSize", $communityIntro.ui[type].pageSize);
			obj.addParam("type", type);
			obj.request({
				method: "POST",
				async: false,
				url: contextPath + "/communityList.json",
				options:{
					type : type
				}
			});
		}
	};
	$communityIntro.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 03. 30. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			$communityIntro.ui.getList("all");
			if(sop.isLogin){
				$communityIntro.ui.getList("open");
				$communityIntro.ui.getList("join");
			}
			$("#community-tab a").click(function(){
				$("#community-tab a").removeClass("M_on");
				$(this).addClass("M_on");
				$(".CommunityList>.List>div").hide();
				$("#community-keyword").val($communityIntro.ui[$(this).data("type")].keywords);
				$("#"+$(this).data("type")+"-community").show();
				return false;
			});
			$("#community-search").submit(function(){
				
				srvLogWrite("M0","08", "02", "00", "", $("#community-keyword").val());
				
				var obj = $communityIntro.ui[$("#community-tab a.M_on").data("type")];
				obj.page = 1;
				obj.keywords = $("#community-keyword").val();
				obj.makeLists();
				return false;
			});
			$(".SearchBtn_fst").click(function(){
				$(".ListSearch_cm").toggleClass('Open');
			});
			$(".SearchClose").click(function(){
				$(".ListSearch_cm").removeClass('Open');
			});
		}
	};
	/*********** 소통지도 리스트 시작 **********/
	(function() {
		$class("sop.openApi.communityList.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if(res.errCd == "0") {
					$communityIntro.ui.setList(options.type,res);
					createPaging("#"+options.type+"-community-list-page", res.result.total, $communityIntro.ui[options.type], "page");
				}else{
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail: function(status) {
				messageAlert.open("알림", errorMessage);
			}
		});
	}());
	/*********** 소통지도 리스트 종료 **********/
}(window, document));