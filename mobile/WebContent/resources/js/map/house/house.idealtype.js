(function(W, D) {
	$(document).ready(function() {
		$house.idealtype.event.setUIEvent();
	});
	W.$house = W.$house || {};
	var searchItem = [];//검색조건 담기
	$house.idealtype = {
		/**
		 * @name		  : init
		 * @description   : 초기화
		 * @date		  : 2016. 12. 05. 
		 * @author		  : 나광흠
		 * @history 	  :
		 */
		init : function(){
			$("#idealtype-navigator>a").removeClass("M_on");
			$("#idealtype-navigator>a:first").addClass("M_on");
			$("#ideal-type-step2,#ideal-type-step3").hide();
			$("#ideal-type-step1").show();
			for(var i=1;i<=3;i++){
				$house.idealtype["step"+i+"init"]();
			}
		},
		/**
		 * @name		: step1init
		 * @description : step1 초기화
		 * @date		: 2017. 01. 19. 
		 * @author		: 나광흠
		 * @history 	:
		 */
		step1init : function(){
			$.each($house.ui.getUniqName($("#ideal-type-step input[data-type=radio]:checkbox"),"name"),function(cnt,node){
				$("#ideal-type-step input[data-type=radio][name="+node+"]:checkbox:checked").prop("checked",false).trigger("change");
				$("#ideal-type-step input[data-type=radio][name="+node+"][data-default=Y]:checkbox").prop("checked",true).trigger("change");
			});
			$.each($house.ui.getUniqName($("#ideal-type-step input:radio"),"name"),function(cnt,node){
				$("#ideal-type-step input[name="+node+"]").prop("checked",false).trigger("change");
				$("#ideal-type-step input[name="+node+"][data-default=Y]").prop("checked",true).trigger("change");
			});
			$.each($house.ui.getUniqName($("#ideal-type-step a[data-type=radio]"),"data-name"),function(cnt,node){
				$("#ideal-type-step a[data-name="+node+"][data-default=Y]").trigger("click");
			});
			$.each($house.ui.getUniqName($("#ideal-type-step select:not(#ideal-type-sido,#ideal-type-sgg)"),"data-name"),function(cnt,node){
				$("#ideal-type-step select[data-name="+node+"]>option[data-default=Y]").prop("selected",true);
			});
		},
		/**
		 * @name		: step2init
		 * @description : step2 초기화
		 * @date		: 2017. 01. 19. 
		 * @author		: 나광흠
		 * @history 	:
		 */
		step2init : function(){
			searchItem = [];
			$("#ideal-type-search-item-list ul").empty();
		},
		/**
		 * @name		: step3init
		 * @description : step3 초기화
		 * @date		: 2017. 01. 20. 
		 * @author		: 나광흠
		 * @history 	:
		 */
		step3init : function(){
			$("#ideal-type-final-search-item-list span,#ideal-type-final-search-item-list button").remove();
			$("#ideal-type-final-search-item-list li").removeClass();
		},
		/**
		 * @name		: setSearchItemStep2
		 * @description : step2에 조건 리스트 생성하기
		 * @date		: 2017. 01. 20. 
		 * @author		: 나광흠
		 * @history 	:
		 */
		setSearchItemStep2 : function(){
			$house.idealtype.step2init();
			$("#ideal-type-step1 a[data-type=radio][data-search-item=true].M_on,#ideal-type-step1 input[data-search-item=true]:checked,#ideal-type-step select:not(#ideal-type-sido,#ideal-type-sgg)").each(function(){
				var element;
				if($(this).is("select")){
					element = $(this).children("option:selected");
				}else{
					element = $(this);
				}
				$.each(idealTypeInfoList[$(element).data("parent-id")].children[$(element).data("id")].children,function(cnt,node){
					$("#"+node.type+"-list").append(
						$("<li/>",{
							"data-b_class_search_serial":node.b_class_search_serial,
							"data-m_class_search_serial":node.m_class_search_serial,
							"data-s_class_search_serial":node.s_class_search_serial,
							"data-type":node.type,
							"text":node.det_exp
						}).click(function(){
							if(!$(this).hasClass("M_on")&&$("#ideal-type-search-item-list li.M_on").length>=6){
								messageAlert.open("알림","조회 할수있는 조건은 최대 6개까지입니다");
								return false;
							}
							if($(this).hasClass("M_on")){
								$(this).removeClass("M_on");
								var item = $(this);
								$.each(searchItem,function(cnt,node){
									if($(node).is(item)){
										searchItem.splice(cnt, 1);
										return false;
									}
								});
							}else{
								$(this).addClass("M_on");
								searchItem.push($(this));
							}
						})
					);
				});
			});
			$("#ideal-type-step2").show();
			$("#ideal-type-step1").hide();
		},
		/**
		 * @name		: setSearchItemStep3
		 * @description : step3에 조건 리스트 생성하기
		 * @date		: 2017. 01. 20. 
		 * @author		: 나광흠
		 * @history 	:
		 */
		setSearchItemStep3 : function(){
			if($("#ideal-type-search-item-list li.M_on").length>0){
				$house.idealtype.step3init();
				$.each(searchItem,function(cnt,node){
					$("#ideal-type-final-search-item-list li:eq("+cnt+")").addClass("This "+$(node).data("type")).data({
						"b_class_search_serial":$(node).data("b_class_search_serial"),
						"m_class_search_serial":$(node).data("m_class_search_serial"),
						"s_class_search_serial":$(node).data("s_class_search_serial")
					}).append(
						$("<span/>",{"class":"title","text":$(node).text()}),
						$("<button/>",{"type":"button","text":"삭제"}).click(function(){
							$(this).parents("li").removeClass().data({
								"b_class_search_serial":"",
								"m_class_search_serial":""
							});
							$(this).parents("li").find("span,button").remove();
						})
					);
				});
			}else{
				messageAlert.open("알림","조회하실 조건을 선택해주세요");
				return false;
			}
		}
	};
	
	$house.idealtype.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2017. 01. 19. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			//a 태그 라디오 이벤트
			$("#ideal-type-step a[data-type=radio]").click(function(){
				var element = $(this);
				$.each($("#ideal-type-step a[data-type=radio][data-name="+$(this).data("name")+"]"),function(){
					var addImagePath = "";
					if($(this).is(element)){
						$(this).addClass("M_on");
					}else{
						$(this).removeClass("M_on");
					}
					$(this).children("span").css("background-image","url("+contextPath+"/resources/images/house/liketown_icon"+$(this).data("parent-id")+"_"+$(this).data("id")+".png)");
				});
				return false;
			}).mouseover(function(){
				$(this).children("span").css("background-image","url("+contextPath+"/resources/images/house/liketown_icon"+$(this).data("parent-id")+"_"+$(this).data("id")+".png)");
			}).mouseout(function(){
				if(!$(this).hasClass("M_on")){
					$(this).children("span").css("background-image","url("+contextPath+"/resources/house/liketown_icon"+$(this).data("parent-id")+"_"+$(this).data("id")+".png)");
				}
			});
			//라디오,체크박스 라디오 이벤트
			$("#ideal-type-step input:radio,#ideal-type-step input[data-type=radio]:checkbox").change(function(){
				$("#ideal-type-step label[data-name="+$(this).attr("name")+"]").removeClass("on");
				if($(this).is(":checked")){
					$("#ideal-type-step label[for="+$(this).attr("id")+"]").addClass("on");
					if($(this).is(":checkbox")){
						$("#ideal-type-step input[name="+$(this).attr("name")+"]:checkbox").not($(this)).prop("checked",false);
					}
				}
			});
			//다음,이전 버튼
			$(".ideal-type-next,.ideal-type-prev").click(function(){
				var boxindex = $("#ideal-type-step>.ContBox").index($(this).parents(".ContBox"));
				var currentindex;
				if($(this).hasClass("ideal-type-next")){
					currentindex = boxindex+1;
					if(currentindex>0&&typeof $house.idealtype["setSearchItemStep"+(currentindex+1)]==="function"){
						if($house.idealtype["setSearchItemStep"+(currentindex+1)]()===false){
							return false;
						}
					}
				}else if($(this).hasClass("ideal-type-prev")){
					currentindex = boxindex-1;
				}else{
					return false;
				}
				$("#idealtype-navigator>a").removeClass("M_on");
				$("#ideal-type-step>.ContBox").hide();
				$("#ideal-type-step>.ContBox:eq("+currentindex+")").show();
				$("#idealtype-navigator>a:eq("+currentindex+")").addClass("M_on");
			});
			//step3에서 순서 변경
			$("#ideal-type-final-search-item-list").sortable({
				update: function(event, ui) {
					$("#ideal-type-final-search-item-list li").each(function(cnt,node){
						$(node).find("b").text(cnt+1);
					});
				}
			});
		    $("#ideal-type-final-search-item-list").disableSelection();
		}
	}
}(window, document));
