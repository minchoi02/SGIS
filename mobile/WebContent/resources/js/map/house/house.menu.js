(function(W, D) {
	$(document).ready(function() {
		$house.menu.event.setUIEvent();
		$house.menu.event.lifeStyle();
	});
	W.$house = W.$house || {};
	$house.menu = {
		lookAbodeNavigator : null,//주거현황보기 지역 네비게이터
		standRecommend : null,//추천지역 기준지역
		interRecommend : null,//추천지역 관심지역
		getRecommendIndicatorInfo : function(mClassId){
			var element = $("a.indecator-item[data-id="+mClassId+"]");
			if(element){
				var importance=$(element).parent().find(".SetStepSelect").val();
				var importance_name;
				if(importance=="1"){
					importance_name = "하";
				}else if(importance=="2"){
					importance_name = "중";
				}else if(importance=="3"){
					importance_name = "상";
				}
				return {
					tooltip : "<div style='text-align:left;white-space: nowrap;'>지표명 : "+$(element).data("subj")+"<br>중요도 : "+$(element).parent().find(".SetStart>button.M_on").text()+"<br>가중치 : "+importance_name+"</div>",
					title : $(element).data("subj"),
//					image : sgisContextPath+"/img/house/icon_"+mClassId+".png",
					image : contextPath+"/resources/images/house/icon_"+mClassId+".png",
					image_over : contextPath+"/resources/images/house/icon_"+mClassId+".png",
					m_class_idx_id : $(element).data("id"),
					b_class_idx_id : $(element).data("parent-id")
				}
			}else{
				return null;
			}
		}
	};

	$house.menu.event = {
		/**
		 * 
		 * @name         : $house.menu.event.setUIEvent
		 * @description  : 메뉴 UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2015. 10. 26. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param
		 */
		setUIEvent: function() {
			createNavigator("look-abode-");
			createNavigator("stand-recommend-");
			createNavigator("inter-recommend-");
			createNavigator("ideal-type-");
			//탭 클릭
			$("#search-item-box .Subject.SubjectB a").click(function(){
				$(this).parent().find("a").removeClass("M_on");
				$(this).addClass("M_on");
				$("#search-box>.Detail2_1").hide();
				$("#search-box>.Detail2_1:eq("+$(this).index()+")").show();
				if($(this).index()==2){
					$house.idealtype.init();
				}
			});
			//주거현황 보기 지역 선택 체크박스 변경시
			$("#look-select-location").change(function(){
				$("#look-abode-sido").prop("disabled",!$(this).is(":checked"));
				if($(this).is(":checked")){
					$("#look-abode-location").removeClass("disabled");
					if($("#look-abode-sido").val()!="00"){
						$("#look-abode-sgg").prop("disabled",false);
					}
				}else{
					$("#look-abode-location").addClass("disabled");
				}
			});
			//주거현황 보기 지표 선택 체크박스 변경시
			$("#look-select-type").change(function(){
				if($(this).is(":checked")){
					$("#look-abode-box").removeClass("UnSelect");
					if($("#look-abode-sido option[value=00]").length<=0){
						$("#look-abode-sido").prepend($("<option/>",{"value":"00","data-x":"990480.875","data-y":"1815839.375","text":"전국"}));
					}
				}else{
					$("#look-abode-box").addClass("UnSelect");
					$("#look-abode-sido option[value=00]").remove();
					$("#look-abode-sido").trigger("change");
				}
			});
			//대분류 클릭
			$(".IndexSelect li[class^=index]>a").click(function(){
				var continueStatus = true;
				if($(this).parents(".IndexSelect").attr("id")=="look-abode-box"&&!$("#look-select-type").is(":checked")){
					continueStatus = false;
				}
				if(continueStatus){
					if($(this).parents(".IndexSelect").attr("id")!="recommend-box"){
						$(this).parents(".IndexSelect").find("li[class^=index]").removeClass("M_on");
						$(this).parent("li").addClass("M_on");
						$(this).parents(".IndexSelect").find("li[class^=index]>ul>li").removeClass("M_on");
						//TODO 오승찬 주무관이 주거현황보기 지표선택에서 자연은 디폴트로 녹지비율로 해달라고 해서 현재 이렇게 개발 되어있음 필요 없으면 else 안에 있는 녀석만 밖으로 빼주고 if else 지워주시면 됩니다.
						if($(this).parents("li.index1").children("a").data("id")=="HML0001"){
							$(this).parents(".IndexSelect").find("li[class^=index].M_on>ul>li a.indecator-item[data-id=HMM0003]").parent("li").addClass("M_on");
						}else{
							$(this).parents(".IndexSelect").find("li[class^=index].M_on>ul>li:eq(0)").addClass("M_on");
						}
					}else{
						$(this).parents(".IndexSelect").find("li[class^=index]").not($(this).parent("li")).removeClass("M_on");
						$(this).parent("li").toggleClass("M_on");
					}
				}
				return false;
			});
			//주거현황보기 중분류 클릭
			$("#look-abode-box li[class^=index]>ul>li>a").click(function(){
				if($("#look-select-type").is(":checked")){
					$("#look-abode-box li[class^=index]>ul>li").removeClass("M_on");
					$(this).parent("li").addClass("M_on");
				}
				return false;
			});
			//추천지역 중분류 클릭
			$("#recommend-box li[class^=index]>ul>li>a").click(function(e,isLifeStyle){
				if(isLifeStyle!==true){
					$("#LifeStyleSelect>li").removeClass("M_on");
				}
				var li = $(this).parent("li");
				if(!li.hasClass("M_on")&&$("#recommend-box li[class^=index]>ul>li.M_on").length>9){
					messageAlert.open("알림","최대 9개까지 선택하실 수 있습니다");
					return;
				}
				var itembox = $(this).parents("li[class^=index]").find("div.m-class-items");
				li.toggleClass("M_on");
				if(li.hasClass("M_on")){
					var info = $house.menu.getRecommendIndicatorInfo($(this).data("id"));
					if(info!=null){
						itembox.append(
							$("<img/>",{
								"src":info.image,
								"style":"width:24px; height:24px;",
								"alt":info.title,
								"title":info.tooltip,
								"data-id":info.m_class_idx_id,
								"data-html":true
							}).tooltip()
						);
					}
				}else{
					itembox.find("img[data-id="+$(this).data("id")+"]").remove();
				}
				li.find(".SetStepSelect").prop("disabled",!li.hasClass("M_on"));
				return false;
			});
			//추천지역찾기 기준지역 변경시
			$("#stand-recommend-location select").change(function(){
				$.ajax({
					url : sgisContextPath+"/ServiceAPI/house/standardAreaLists.json",
					type:"POST",
					data: {
						sido_cd : $("#stand-recommend-sido").val(),
						sgg_cd : $("#stand-recommend-sgg").val()
					},
					async: true,
					dataType:"json",
					success: function(res){
						if(res.errCd=="0"){
							$.each(res.result.summaryList,function(cnt,node){
								var parent = $("#recommend-box .indecator-item[data-id="+node.m_class_idx_id+"]").parent();
								var step = parent.children(".SetStepSelect");
								var orderStrong = parent.find(".bagic strong");
								parent.find(".bagic").data("value",node.order);
								if(node.order=="1"){
									orderStrong.text(" 하");
								}else if(node.order=="2"){
									orderStrong.text(" 중");
								}else if(node.order=="3"){
									orderStrong.text(" 상");
								}
							});
						}
					},
					error: function(data){
						messageAlert.open("알림",errorMessage);
						return false;
					}
				});
			});
			//추천지역 찾기 정렬 기준 버튼 클릭 이벤트
			$("#recommend-box .SetStart button").click(function(){
				if($(this).parents("li.sub-class").hasClass("M_on")){
					$(this).parent().find("button").removeClass("M_on");
					$(this).addClass("M_on");
				}
				changeImageTooltip($(this).data("id"));
			});
			$("#recommend-box .SetStepSelect").change(function(){
				changeImageTooltip($(this).data("id"));
			});
			
			$("#lifeStyle").click(function(){
				$("#lifeStyle-box").show();
				return false;
			});
		},
		lifeStyle : function(){
			$("#LifeStyleSelect>li>a").click(function(){
				srvLogWrite('M0','06', '01', '03', '', '');		//
				var on = $(this).parent("li").hasClass("on");
				$("#recommend-box.IndexSelect li[class^=index]>ul>li.M_on a").trigger("click");
				$("#LifeStyleSelect>li").removeClass("M_on");
				$("#lifeStyle-box").hide();
				if(!on){
					$(this).parent("li").addClass("M_on");
					var items = $(this).data("items");
					var allLi = "#recommend-box.IndexSelect li[class^=index]";
					$.each(items,function(cnt,node){
						if(cnt==0 && !$(allLi+">a[data-id="+node.b_class_idx_id+"]").parent("li").hasClass("M_on")){
							$(allLi+">a[data-id="+node.b_class_idx_id+"]").trigger("click");
						}
						$(allLi+">ul>li>a[data-id="+node.m_class_idx_id+"]").trigger("click",true);
						$(allLi+">ul>li .SetStepSelect[data-id="+node.m_class_idx_id+"] option[value="+node.wghtval+"]").attr("selected",true);
						$(allLi+">ul>li>span:"+(node.order_base_disp=='2'&&node.default_value=='0'?'first':'last')).trigger("click");
					});
				}
				return false;
			});
		}
	};
	/**
	 * @name        : createNavigator
	 * @description : 지역 네비게이터 생성
	 * @date        : 2016. 07. 05.
	 * @author	    : 나광흠
	 * @history 	:
	 * @param id    : html tag id
	 */
	function createNavigator(id){
		if(id&&id.replace(/ /gi,"")!=""){
			var navigatorName = changePipeToUpperCase(id)+"Navigator";
			$house.menu[navigatorName] = new mapNavigation.UI();
			$house.menu[navigatorName].navigatorId = id;
			$house.menu[navigatorName].initialize();
		}else{
			console.error("네비게이터의 아이디를 넣어주세요");
		}
	}
	function changeImageTooltip(mClassId){
		var info = $house.menu.getRecommendIndicatorInfo(mClassId);
		$(".m-class-items>img[data-id="+mClassId+"]").attr("title",info.tooltip).tooltip("fixTitle");
	}
	function listDelete(){
		$("#LifeStyleSelect>li").removeClass("M_on");
		$("#search-box .IndexSelect li[class^=index]>ul>li").removeClass("M_on");//중분류 class 제거
		$("#search-box .IndexSelect li[class^=index]>ul>li").addClass("UnSelect");//중분류 class 추가
		if(typeof callback === "function"){
			callback();
		}
	}
}(window, document));