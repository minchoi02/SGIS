(function(W, D) {
	W.$communityIntro = W.$communityIntro || {};
	$(document).ready(function(){ //ready
		$communityIntro.event.setUIEvent();	
	});
	
	/**
	 * 뒤로가기 시 검색은 초기화 되어 검색, 
	 * select box는 초기화 되지 않음 
	 * 이를 처리하기 위한 뒤로가기 이벤트 감지 function
	 * 박은식 20200715*/
	window.onpageshow = function (event) { 
		if (event.persisted) { 
			$("#communityList-sorting option:eq(0)").attr("selected", "selected");
		} else { 
			$("#communityList-sorting option:eq(0)").attr("selected", "selected"); 
		} 
		
	};
	
	$communityIntro = {
			page : 1,
			pageSize : 10,
			lastData : false,
			listType : 'all',
			cmmntyAlign: null,
			submitAction : false
	}
	$communityIntro.overlap =  { //중복실행 방지 체크
			bool : true
	};
	$communityIntro.ui = {
		all:{//전체
			page : 1,
			pageSize : 10,
			keywords : null,
			cmmntyAlign: null,
			makeLists : function(){
				$communityIntro.ui.getList("all");
			}
		},
		open:{//개설
			page : 1,
			pageSize : 10,
			keywords : null,
			cmmntyAlign: null,
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
		//리스트생성
		createList : function(type,res,list){
			var dataCnt = 0;
			var typePage = (type == 'all') ? $communityIntro.ui.all.page : 
						   (type == 'open') ? $communityIntro.ui.all.open : $communityIntro.ui.join;
			$.each(res.result.list,function(cnt,node){
				if(dataCnt == 9){
					$communityIntro.lastData = false;
					if(typePage*10 == res.result.total){
						$communityIntro.lastData = true;
					}
				} else {
					$communityIntro.lastData = true;
				}
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
						$("<dt/>").append($("<a/>",{"href":"#"+ contextPath+"/m2020/map/community/map/communityMap.sgis?id="+node.cmmnty_map_id,"text":node.cmmnty_map_nm}),approval),
						$("<dd/>",{"class":"InfoMember"}).append(
							$("<p/>",{"class":"subtitle","text":node.intrcn}), 
							$("<p/>",{"class":"Info"}).append(
								$("<span/>",{"class":"InfoBasic","text" : "개설자:"+node.usr_id+""}),
								$("<span/>",{"class":"InfoBasic02","text" : "개설일:"+node.reg_date}),
								$("<span/>",{"class":"Member","html":"<strong>참여인원</strong> "+node.join_cnt}),
								$("<span/>",{"class":"Count","html":"<strong>게시글</strong> "+node.poi_cnt})
							)
						),
						image
					).click(function(){
						javascript:srvLogWrite('O0', '10', '02', '01', '', '');
						apiLogWrite2("K1",node.cmmnty_map_id,node.cmmnty_map_nm,"없음","00","없음");

						location.href = contextPath+"/m2020/map/community/map/communityMap.sgis?id="+node.cmmnty_map_id;
					})
				);
				$("<img/>",{src:sgisContextPath+node.path_nm+"thumbnail/thumbnail-L-"+node.save_file_nm}).load(function(){
					image.css({"background-image":"url("+sgisContextPath+node.path_nm+"thumbnail/thumbnail-L-"+node.save_file_nm+")"});
				});
				dataCnt++;
			});
		},

		setList : function(type,res){
			$("#"+type+"-count").text(res.result.total);
			var list = $("#"+type+"-community-list");
			if($communityIntro.listType != type || $communityIntro.submitAction == true){//페이징에서 스크롤로 변경하면서 empty처리
				list.empty();
			}
			
			$communityIntro.listType = type;
			
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
			$communityIntro.submitAction = false;
		},

		getList : function(type){
			
			if(!type){
				type = "all";
			}
			var obj = new sop.openApi.communityList.api();
			obj.addParam("bnd_year", bndYear);
			obj.addParam("page", $communityIntro.ui[type].page);
			obj.addParam("from_ce", "C");
			console.log($communityIntro.ui[type].page)
			if($communityIntro.ui[type].keywords){
				obj.addParam("keywords", $communityIntro.ui[type].keywords);
			}
			obj.addParam("pageSize", $communityIntro.ui[type].pageSize);
			console.log($communityIntro.ui[type].cmmntyAlign)
			if($communityIntro.ui[type].cmmntyAlign == null || $communityIntro.ui[type].cmmntyAlign == undefined){
				obj.addParam("cmmnty_align", '');
			} else{
				obj.addParam("cmmnty_align", $communityIntro.ui[type].cmmntyAlign);
			}
			
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
		// UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		setUIEvent: function() {
			$communityIntro.ui.getList("all");
			if(sop.isLogin){
				$communityIntro.ui.getList("open");
				$communityIntro.ui.getList("join");
			}
			if($('body').prop("scrollHeight") > 1320){ //초최 리스트 조회시 스크롤이 생성 되지 않는 경우 바로 다음 리스트를 불러옴 
				$communityIntro.ui.getList("all");
				if(sop.isLogin){
					$communityIntro.ui.getList("open");
					$communityIntro.ui.getList("join");
				}
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
				srvLogWrite('O0', '10', '01', '03', $("#community-keyword").val(), '');
				$communityIntro.submitAction = true;
				$(".ContArea").scrollTop(0);
				var obj = $communityIntro.ui[$("#community-tab p.M_on").data("type")];
				obj.page = 1;
				obj.keywords = $("#community-keyword").val();
				obj.cmmntyAlign = $("#communityList-sorting option:selected").val();
				obj.makeLists();
				return false;
			});
			$(".SearchBtn_fst").click(function(){
				$(".ListSearch_cm").toggleClass('Open');
			});
			$(".SearchClose").click(function(){
				$(".ListSearch_cm").removeClass('Open');
			});
			
			// 정렬 select change event 
			$("#communityList-sorting").change(function(){
				if($("#communityList-sorting option:selected").val() == ""){
					srvLogWrite('O0', '10', '01', '02', '등록일', '');
				}else if($("#communityList-sorting option:selected").val() == "name"){
					srvLogWrite('O0', '10', '01', '02', '소통지도명', '');
				}else if($("#communityList-sorting option:selected").val() == "count"){
					srvLogWrite('O0', '10', '01', '02', '자료건수', '');
				}
				$("#community-search").submit();
				return false
			});
			
			//스크롤 이벤트
			$('body').scroll(function(){
				//중복실행 방지 로직 수정 
				if($(this).prop('scrollHeight') <= ($(this).scrollTop()+$(this).innerHeight())){
					timer = setTimeout(function() {
						 $communityIntro.overlap.bool = true;
					        timer = null;
					 },500);
					if($communityIntro.overlap.bool && !$communityIntro.lastData){
						$communityIntro.ui.all.page++;
						$communityIntro.ui.getList();
						$communityIntro.overlap.bool = false;
					}
					 
				}
		    });
		}
	};
	/*********** 소통지도 리스트 시작 **********/
	(function() {
		$class("sop.openApi.communityList.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if(res.errCd == "0") {
					$communityIntro.ui.setList(options.type,res);
				}else{
					common_alert(res.errMsg);
				}
			},
			onFail: function(status) {
				common_alert(errorMessage);
			}
		});
	}());
	/*********** 소통지도 리스트 종료 **********/
}(window, document));
