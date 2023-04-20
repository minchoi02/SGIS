/**
 * 행정통계시각화 메인
 *
 * history :
 * 2021.08.04			행정통계시각화 메인 상세
 *
 *
 * author : hjh
 * version : 1.0
 * see :
 *
 */

//bndYear = "2018";

var menuChangeFlag = true;

(function(W, D) {
	W.$administStatsLeft = W.$administStatsLeft || {};

	$administStatsLeft.ui = {
		defaultSurvGb : "신혼부부",					// 기본 조사 구분 : 신혼부부
		defaultSidoCd : null,

		/**
		 * @name             : 메뉴 이동
		 * @description      :
		 * @date             : 2021.08.03
		 * @author	         : 곽제욱
		 * @history 	     :
		 */
		moveMenu : function(idx){
			$administStatsMain.ui.tileChangeYn = "Y"; //20201120 박은식 대시보드 진입 시 타일차트 그려주도록 처리
			/* 임시 수정 @@ if ($administStatsMain.ui.prevIndex != idx) {*/
			if ($administStatsMain.ui.prevIndex != "") {
				var lvGetParameters = "";
				if(gv_year != "" || gv_sido_cd != "" || gv_sgg_cd != "" || gv_type != ""){
					if(lvGetParameters == "") lvGetParameters += "?";
					else lvGetParameters += "&";
					lvGetParameters += "type="+encodeURIComponent(gv_type); // 2020-11-10 [곽제욱] type만 유지
				}
				switch (idx) {
					case 1: location.href = '/view/administStatsDetail/bubu'; break;
					case 2: location.href = '/view/administStatsDetail/jutak'; break;
					case 3: location.href = '/view/administStatsDetail/jungjan'; break;
					case 4: location.href = '/view/administStatsDetail/kinong'; break;
					case 5: location.href = '/view/administStatsDetail/more1Dash'; break; //행정통계 메뉴이동 추가
					case 6: location.href = '/view/administStatsDetail/more2Dash'; break; //퇴직연금 메뉴이동 추가
					case 7: location.href = '/view/administStatsDetail/more3Dash'; break; //임금근로 메뉴이동 추가
					default : $administStatsMain.ui.changeMenu(idx); break;
				}
			} else {
				if(idx == 1){
					$administStatsMain.ui.changeMenu(1);
				} else {
					$administStatsMain.ui.changeMenu(idx);
				}
			}
			//20201027  박은식 - 사이드 토글버튼 상세페이지에서만 보이도록 처리  START
			if(idx == "0"){
				$(".sideMenuToggleBtn").show();
			} else {
				$(".sideMenuToggleBtn").hide();
			}
			//20201027  박은식 - 사이드 토글버튼 상세페이지에서만 보이도록 처리  END
		},

		/**
		 * @name             : 주제별 시계열 정보 조회
		 * @description      : 해당 주제에 맞는 시계열정보를 가져온다.
		 * @date             : 2021.08.03
		 * @author	         : 곽제욱
		 * @history 	     :
		 */
		selectTms : function(){
			// 선택된 주제(default : 신혼부부)
			var thema = $administStatsMain.ui.selectedThema;

			// 선택된 주제가 '상세'가 아닐경우에만 시계열 표출
			if(thema!="상세"){
				$.ajax({
					method: "POST",
					async: false,	// 반드시 동기처리 해야 함
					url: contextPath + "/ServiceAPI/administStats/common/getTotTms.json",
					data: { thema: thema }, //
					dataType: "json",
					success: function(res) {
						if (res.errCd == "0") {
							var tmsData = res.result.tmsData;

							$administStatsLeft.ui.createTms(tmsData);
						}
					},
					error: function(e) {
						alert('failed');
					}
				});
			}
		},

		/**
		 * @name             : 시계열 영역 생성
		 * @description      : 해당 주제에 맞는 시계열영역을 생성한다
		 * @date             : 2021.08.03
		 * @author	         : 곽제욱
		 * @history 	     :
		 */
		createTms : function(data){
			$(".yearBtn").remove();
			// TODO 2021.08.27[hjh] 추후 DB에서 불러오기
			var startYear = 2019;
			$administStatsMain.ui.selectedYear =  startYear;
			var html = "";
			html += '<li style="display: none;"><a href="#" class="yearBtn on" id="'+startYear+'" data-id="'+startYear+'">'+ startYear +'</a></li>';
			$("#leftMenu").append(html);
		},

		/**
		 * @name             : 년도 선택
		 * @description      : 해당 주제 - 년도에 맞는 화면을 새로 그려준다
		 * @date             : 2021.08.09
		 * @author	         : 곽제욱
		 * @history 	     :
		 */
		leftTmsSelect : function(clickYear){
			if(clickYear == "11"){
				$("#leftMenu .yearBtn").removeClass("current");
				$("#tms").addClass("current");
				$administStatsMain.ui.changeMenu(12); // 2020-10-07 [곽제욱] 신혼부부시계열 인덱스 변경
			} else {
			// 	선택년도 세팅
				$administStatsMain.ui.selectedYear = clickYear;
				// changeMenu 를 위한 활성화 주제 index 찾기
				var pIndex = $("#leftMenu .thema.current").index();

				$("#leftMenu .yearBtn").removeClass("current");
				$("#"+clickYear).addClass("current");

				//if(gv_type!='locgov'){ // 2020-10-13 [곽제욱] 주석처리
				$administStatsMain.ui.yearChangeYn = "Y";
				//} // 2020-10-13 [곽제욱] 주석처리
				$administStatsMain.ui.tileChangeYn = "Y";

				//2020-11-03 [곽제욱] 메뉴변경 index에서 각 id별로 변경 START
				var id=$("#leftMenu .thema.current").attr("id");
				if(id=="newlyMenu"){
					pIndex = 1;
				} else if(id=="houseMenu"){
					pIndex = 2;
				} else if(id=="middlMenu"){
					pIndex = 3;
				} else if(id=="retunMenu"){
					pIndex = 4;
				} else if(id=="more1Menu"){ //일자리행정통계 
					pIndex = 5;
				} else if(id=="more2Menu"){ //퇴직연금 
					pIndex = 6;
				} else if(id=="more3Menu"){ //임금근로일자리동향
					pIndex = 7;
				}

				//2020-11-03 [곽제욱] 메뉴변경 index에서 각 id별로 변경 END
				$administStatsMain.ui.changeMenu(pIndex);

				// 히든 콤보박스 :: 시도 / 시군구 정보 해당년도로 조회
				if($administStatsMain.ui.selectedArea != null){
					$administStatsMain.ui.getAreaSido($administStatsMain.ui.selectedArea);
				}
			}

		}
	};

	$administStatsLeft.event = {
		setUIEvent: function() {
			console.log("$administStatsLeft.event.setUIEvent() called.");

			// 메뉴 카테고리 선택
			$administStatsMain.event.set("click", ".thema", function() {
				if( !$("#tms").hasClass("current") ){
					//srvLogWrite('P0','02','01','00',$administStatsMain.ui.selectedThema);
				}

				$(".thema").removeClass("current");
				$(this).addClass("current");

	            // 메뉴 변경 처리 - 2018.09.20	ywKim	추가 [v180901]
	            var idx = $(this).parent().find('a').index(this);

	          //2020-11-03 [곽제욱] 메뉴변경 index에서 각 id별로 변경 START
				var id=$("#leftMenu .thema.current").attr("id");
				if(id=="detail"){
					idx = 0;
				} else if(id=="newlyMenu"){
					idx = 1;
				} else if(id=="houseMenu"){
					idx = 2;
				} else if(id=="middlMenu"){
					idx = 3;
				} else if(id=="retunMenu"){
					idx = 4;
				} else if(id=="more1Menu"){
					idx = 5;
				} else if(id=="more2Menu"){
					idx = 6;
				} else if(id=="more3Menu"){
					idx = 7;
				} 

				//2020-11-03 [곽제욱] 메뉴변경 index에서 각 id별로 변경 END
	            $administStatsLeft.ui.moveMenu(idx);
			});

			$administStatsMain.event.set("click", "#tms", function() {
				$("#leftMenu .yearBtn").removeClass("current");
				$(this).addClass("current");
				//$administStatsMain.ui.changeMenu(21);
			});

			$("body").on("click", ".yearBtn", function(){
				var id = $(this).data("id");

				//$administStatsMain 의 changeMenu 가 끝나기 전까진 더블클릭 방지
				if(menuChangeFlag){
					if( id == "11" ){//시계열메뉴 클릭
						//srvLogWrite('P0','03','01','00',$administStatsMain.ui.selectedThema);
					} else {
						//srvLogWrite('P0','01','03','00',$administStatsMain.ui.selectedThema,'year='+id);
					}
					$administStatsLeft.ui.leftTmsSelect(id);
					menuChangeFlag = false;
				}
			});
			//20201027 박은식 - 사이드 토글버튼 이벤트 추가 START
			$("body").on("click", ".sideMenuToggleBtn", function(){
				if($("#sideMenuArea").is(":visible") == false){
					$("#sideMenuArea").show();
					$("#administStatsDetailDataDiv").css("width","calc(100% - 500px)");

					$(".sideMenuToggleBtn").removeClass("current");
					$administStatsDetail.ui.detailDivResize();
				} else {
					$("#sideMenuArea").hide();
					$("#administStatsDetailDataDiv").css("width","100%");

					$(".sideMenuToggleBtn").addClass("current");
					$administStatsDetail.ui.detailDivResize();
				}
			});
			//20201027 박은식 - 사이드 토글버튼 이벤트 추가 END
			//20210223 박은식 LEFT 매뉴 마우스 오버 이벤트 추가 START
			$("body").on("mouseover", ".sidenav > li", function(){
				$(this).css("cursor", "pointer");
			});
			//20210223 박은식 LEFT 매뉴 마우스 오버 이벤트 추가 END
		},

	}

	$(document).ready(function() {
	});


}(window, document));

