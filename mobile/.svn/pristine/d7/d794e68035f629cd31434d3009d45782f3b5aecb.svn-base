(function(W, D) {
	$(document).ready(function() {
		$biz.menu.event.setUIEvent();
	});
	W.$biz = W.$biz || {};
	$biz.menu = {
	};
	$biz.menu.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : 메뉴 UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2017. 02. 06. 
		 * @author	     : 김도형
		 * @history 	 :
		 */
		setUIEvent: function() {
			//라디오스타일변경이벤트
			$(".list-style input[type=radio]").change(function(){
				$(this).parents(".list-style").find("li").removeClass("Check");
				if($(this).is(":checked")){
					$(this).parent("li").addClass("Check");
				}
			});
			//li클릭시 radio 선택
			$(".list-style .jobArea_stepBox li").click(function(){
				$(this).children("input[type=radio]").prop("checked",true).trigger("change");
			});
			//탭변경이벤트
			$("#itemSubject a").click(function(){
				$("#itemSubject a").removeClass("M_on");
				$(this).addClass("M_on");
				$(".MenuBox>div").hide();
				$("#"+$(this).data("type")).show();
			});
			//a태그변경이벤트
			$(".roundTextBox").click(function(){
				
				$(".roundTextBox").css("background", "#fff url(/mobile/resources/images/house/icon_box_arrow_top.png) no-repeat 95% center");

				$(this).css("background", "#fff url(/mobile/resources/images/house/icon_box_arrow_bottom.png) no-repeat 95% center");
				
				$(this).parents(".list-style").find(".joinDefault").hide();
				$(this).next(".joinDefault").show();
			});
			this.proposedSite();
		},
		/**
		 * @name         : proposedSite
		 * @description  : 생활업종 후보지검색
		 * @date         : 2017. 02. 06. 
		 * @author	     : 김도형
		 * @history 	 :
		 */
		proposedSite : function(){
			//검색조건 a태그변경이벤트
			$("#wonList01 a").click(function(){
				if(!$(this).hasClass("on")&&$("#wonList01 a.on").length >= 5){
					messageAlert.open("알림", "최대 5개까지만 선택 가능합니다.");
					return false;
				}
				$(this).toggleClass("on");
				if($(this).hasClass("on")) {
					$("#"+$(this).data("type")).show();
					//직장인구일 경우 거주인구, 성별, 연령별 해제
					if($(this).data("type") == "jobPeople") {
						$("#stayPeopleAtag,#genderPeopleAtag,#agePeopleAtag").removeClass("on");
						$("#stayPeople,#genderPeople,#agePeople").hide();
					//거주인구, 성별, 연령별일 경우 직장인구 해제
					} else if(/^(stayPeople|genderPeople|agePeople)$/.test($(this).data("type"))){
						$("#jobPeopleAtag").removeClass("on");
						$("#jobPeople").hide();
					}
				} else {
					$("#"+$(this).data("type")).hide();
				}
				//사업체수, 사업체증감이 선택되어 있을경우
				if($("#companyCountAtag,#companyIncreaseAtag").hasClass("on")) {
					$("#companyTabDiv").show();		//사업체 업종 선택 필수
				} else {
					$("#companyTabDiv,#companyCount,#companyIncrease").hide();
				}
					
				//거주주택, 노후주택이 선택되어 있을 경우
				if($("#houseTypeAtag,#oldHouseAtag").hasClass("on")){
					$("#houseLivingTypeDiv").show();
				} else {
					$("#houseLivingTypeDiv,#houseType,#oldHouse").hide();
				}
			});
			//사업체 탭 이벤트 
			$("#companyTab>a").click(function(){
				var box = $("#companyTab>div:eq("+$("#companyTab>a").index($(this))+")");
				$("#companyTab>div").hide();
				box.show();
				$("#companyTab>a").removeClass("M_on");
				$(this).addClass("M_on");
				box.find("input:radio:first").prop("checked",true);
			});
		}
	};
}(window, document));