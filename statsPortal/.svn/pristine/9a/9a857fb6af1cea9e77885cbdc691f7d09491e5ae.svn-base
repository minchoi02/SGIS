/**
 * 총조사시각화 메인
 * 
 * history : 
 * 2020.08.04			총조사시각화 메인
 * 
 * 
 * author : 곽제욱
 * version : 1.0
 * see : 
 *
 */

//bndYear = "2018";

var menuChangeFlag = true;

(function(W, D) {
	W.$totSurvLeft = W.$totSurvLeft || {};
	
	$totSurvLeft.ui = {
		defaultSurvGb : "인구",					// 기본 조사 구분 : 인구
		defaultSidoCd : null,
		
		/**
		 * @name             : 메뉴 이동
		 * @description      : 
		 * @date             : 2020.08.03
		 * @author	         : juKwak
		 * @history 	     : 
		 */
		moveMenu : function(idx){
			$totSurvMain.ui.loading(true);
			$totSurvMain.ui.selectedArea = "00";
			$totSurvMain.ui.tileChangeYn = "Y"; //20201120 박은식 대시보드 진입 시 타일차트 그려주도록 처리 
			if ($totSurvMain.ui.prevIndex != idx) {
				var lvGetParameters = "";
    			if(
            			gv_year != ""
            			|| gv_sido_cd != ""
            			|| gv_sgg_cd != ""
            			|| gv_type != ""
            		){
    				if(lvGetParameters == "") lvGetParameters += "?";
        			else lvGetParameters += "&";
        			//lvGetParameters += "year="+encodeURIComponent(gv_year); // 2020-11-10 [곽제욱] 주석처리
        			//lvGetParameters += "&sido_cd="+encodeURIComponent(gv_sido_cd); // 2020-11-10 [곽제욱] 주석처리
        			//lvGetParameters += "&sgg_cd="+encodeURIComponent(gv_sgg_cd); // 2020-11-10 [곽제욱] 주석처리
        			lvGetParameters += "type="+encodeURIComponent(gv_type); // 2020-11-10 [곽제욱] type만 유지
    			}
    			
    			if(gv_type!=""){
    				switch (idx) {
			            case 1: location.href = '/view/totSurv/populationDashLoc'+lvGetParameters; break;
			            // 2020-10-29 [곽제욱] 각 대시보드 분기 START
			            case 2: location.href = '/view/totSurv/houseHoldDashLoc'+lvGetParameters; break; 
			            case 3: location.href = '/view/totSurv/houseDashLoc'+lvGetParameters; break;
			            case 4: location.href = '/view/totSurv/farmDashLoc'+lvGetParameters; break;
			            // 임업 대쉬보드 추가 2020-10-13 jhs
			            case 5: location.href = '/view/totSurv/forestryDashLoc'+lvGetParameters; break;
			            case 6: location.href = '/view/totSurv/fisheryDashLoc'+lvGetParameters; break;			            
			            // 2020-10-29 [곽제욱] 각 대시보드 분기 END
			            case 7: location.href = '/view/totSurv/ecnmyDash'; break;
			            case 8: location.href = '/view/totSurv/inMoreDetail'; break;
			            default : $totSurvMain.ui.changeMenu(idx); break;
    				}
    			} else {
	    			switch (idx) {
	    				case 0: location.href = document.location.origin; break; // 2020-11-13 [곽제욱] 상세 url 분기
			            case 1: location.href = '/view/totSurv/populationDash'; break;
			            case 2: location.href = '/view/totSurv/houseHoldDash'; break;
			            case 3: location.href = '/view/totSurv/houseDash'; break;
			            case 4: location.href = '/view/totSurv/farmDash'; break;
			            // 임업 대쉬보드 추가 2020-10-13 jhs
			            case 5: location.href = '/view/totSurv/forestryDash'; break;			            
			            case 6: location.href = '/view/totSurv/fisheryDash'; break;
			            case 7: location.href = '/view/totSurv/ecnmyDash'; break;
			            case 8: location.href = '/view/totSurv/inMoreDetail'; break;
			            default : $totSurvMain.ui.changeMenu(idx); break;
	    			}
    			}
			} else {
				if(idx == 1){
					$totSurvMain.ui.changeMenu(1);
				} else {
					$totSurvMain.ui.changeMenu(idx);
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
		 * @date             : 2020.08.03
		 * @author	         : juKwak
		 * @history 	     : 
		 */
		selectTms : function(){
			// 선택된 주제(default : 인구)
			$totSurvMain.ui.loading(true);
			var thema = $totSurvMain.ui.selectedThema;
			
			// 선택된 주제가 '상세'가 아닐경우에만 시계열 표출
			if(thema != "상세" && thema != "더보기" && thema != "경제") {
				$.ajax({
					method: "POST",
					async: false,	// 반드시 동기처리 해야 함
					url: contextPath + "/ServiceAPI/totSurv/common/getTotTms.json",
					data: { thema: thema }, // 
					dataType: "json",
					success: function(res) {
						if (res.errCd == "0") {
							if(thema==='농업'){
								//res.result.tmsData[0].end_year = '2020';
							}
							var tmsData = res.result.tmsData;
							
							$totSurvLeft.ui.createTms(tmsData);
						}
					},
					error: function(e) {
						alert('failed');
					}
				});
			} else if(thema == "경제") {
				$.ajax({
					method: "POST",
					async: false,	// 반드시 동기처리 해야 함
					url: contextPath + "/ServiceAPI/totSurv/common/getTotTms2021.json",
					data: { "thema": thema, "ecnmyType": $ecnmyDash.ecnmyType }, // 
					dataType: "json",
					success: function(res) {
						if (res.errCd == "0") {
							var tmsData = res.result.tmsData;
							$ecnmyMap.ui.totTms = tmsData;
							if(thema == "경제") {
								$totSurvLeft.ui.createTms(tmsData);
							}							
						}
					},
					error: function(e) {
						alert('failed');
					}
				});
			} else if(thema == "더보기") {
				$(".chartTitle").parent().hide();
				$(".DataNone").show();
			}
		},
		
		/**
		 * @name             : 시계열 영역 생성
		 * @description      : 해당 주제에 맞는 시계열영역을 생성한다
		 * @date             : 2020.08.03
		 * @author	         : juKwak
		 * @history 	     : 
		 */
		createTms : function(data){
			$(".yearBtn").remove();
			
			var startYear = Number(data[0].start_year);
			var endYear = Number(data[0].end_year);
			var updtCycle = data[0].updt_cycle;
			
			if($totSurvMain.ui.selectedYear=="" || $totSurvMain.ui.selectedYear==null || $totSurvMain.ui.selectedYear > endYear ){
				$totSurvMain.ui.selectedYear =  endYear;
			} else if($totSurvMain.ui.selectedYear=="" || $totSurvMain.ui.selectedYear==null || $totSurvMain.ui.selectedYear < startYear){
				$totSurvMain.ui.selectedYear =  startYear;
			}
			
			var html = "";

			if(updtCycle=="년"){
				updtCycle = 1;
			} else if(updtCycle=="5년") {
				updtCycle = 5;
			}
			
			for(var i=endYear; i>=startYear; i=i-Number(updtCycle)){
				if($totSurvMain.ui.selectedYear==i){
					html += '<li><a href="#" class="yearBtn on" id="'+i+'" data-id="'+i+'">'+ i +'</a></li>'; //2020.11.11[신예리] li 추가
				} else {
					html += '<li><a href="#" class="yearBtn" id="'+i+'" data-id="'+i+'">'+ i +'</a></li>'; //2020.11.11[신예리] li 추가
				}
			}
			if($totSurvMain.ui.selectedThema == "인구"){
				html += '<li><a href="#" id="tms" data-id="11" class="yearBtn">시계열</a></li>'; //2020.10.23[신예리] 시계열 버튼 cursor style 삭제 / 2020.11.11[신예리] li 추가
			} 
			$("#leftMenu").append(html);
			$("#inMoreDetail").remove();
			if(gv_url.indexOf("Loc") == -1) {
				//$("#leftMenu").append("<li><a href='#' class='menu thema new' id='inMoreDetail'></a></li>"); //mng_s 20220315 더보기 임시 막음
			}
		},
		
		/**
		 * @name             : 년도 선택
		 * @description      : 해당 주제 - 년도에 맞는 화면을 새로 그려준다
		 * @date             : 2020.08.09
		 * @author	         : juKwak
		 * @history 	     : 
		 */
		leftTmsSelect : function(clickYear){
			if(clickYear == "11"){
				$("#leftMenu .yearBtn").removeClass("on");
				$("#tms").addClass("on");
				$totSurvMain.ui.changeMenu(12); // 2020-10-07 [곽제욱] 인구시계열 인덱스 변경
			} else {
			// 	선택년도 세팅
				$totSurvMain.ui.selectedYear = clickYear;
				// changeMenu 를 위한 활성화 주제 index 찾기
				var pIndex = $("#leftMenu .thema.on").index();
				
				$("#leftMenu .yearBtn").removeClass("on");
				$("#"+clickYear).addClass("on");
				
				//if(gv_type!='locgov'){ // 2020-10-13 [곽제욱] 주석처리
				$totSurvMain.ui.yearChangeYn = "Y";					
				//} // 2020-10-13 [곽제욱] 주석처리
				$totSurvMain.ui.tileChangeYn = "Y";
				
				//2020-11-03 [곽제욱] 메뉴변경 index에서 각 id별로 변경 START
				var id=$("#leftMenu .thema.on").attr("id");
				if(id=="populationMenu"){
					pIndex = 1;
				} else if(id=="houseHoldMenu"){
					pIndex = 2;
				} else if(id=="houseMenu"){
					pIndex = 3;
				} else if(id=="farmMenu"){
					pIndex = 4;
				} else if(id=="forestryMenu"){
					pIndex = 5;
				} else if(id=="fisheryMenu"){
					pIndex = 6;
				} else if(id=="ecnmyMenu") {
					pIndex = 7;
				}
				
				//2020-11-03 [곽제욱] 메뉴변경 index에서 각 id별로 변경 END
				$totSurvMain.ui.changeMenu(pIndex);
				
				// 히든 콤보박스 :: 시도 / 시군구 정보 해당년도로 조회
				if($totSurvMain.ui.selectedArea != null){
					$totSurvMain.ui.getAreaSido($totSurvMain.ui.selectedArea);
				}
			}

		}
	};
	
	$totSurvLeft.event = {
		setUIEvent: function() {
			console.log("$totSurvLeft.event.setUIEvent() called.");
			// 메뉴 카테고리 선택
			$totSurvMain.event.set("click", ".thema", function() {
				$totSurvMain.ui.loading(true);
				$totSurvMap.ui.mapToggleId='';
				if( !$("#tms").hasClass("on") ){
					//srvLogWrite('P0','02','01','00',$totSurvMain.ui.selectedThema);
				}

				$(".thema").removeClass("on");
				$(this).addClass("on");
	            
	            // 메뉴 변경 처리 - 2018.09.20	ywKim	추가 [v180901]
	            var idx = $(this).parent().find('a').index(this);
	            
	          //2020-11-03 [곽제욱] 메뉴변경 index에서 각 id별로 변경 START
				var id=$("#leftMenu .thema.on").attr("id");
				
				if(id=="detail"){
					idx = 0;
				} else if(id=="populationMenu"){
					idx = 1;
				} else if(id=="houseHoldMenu"){
					idx = 2;
				} else if(id=="houseMenu"){
					idx = 3;
				} else if(id=="farmMenu"){
					idx = 4;
				} else if(id=="forestryMenu"){
					idx = 5;
				} else if(id=="fisheryMenu"){
					idx = 6;
				} else if(id=="ecnmyMenu") {
					idx = 7;
				} else if(id=="inMoreDetail") {
					idx = 8;
				}
				
				//2020-11-03 [곽제욱] 메뉴변경 index에서 각 id별로 변경 END
	            $totSurvLeft.ui.moveMenu(idx);
			});
			
			$totSurvMain.event.set("click", "#tms", function() {
				$("#leftMenu .yearBtn").removeClass("on");
				$(this).addClass("on");
				//$totSurvMain.ui.changeMenu(21);
			});
			
			$("body").on("click", ".yearBtn", function(){
				var id = $(this).data("id");
				
				//$totSurvMain 의 changeMenu 가 끝나기 전까진 더블클릭 방지
				if(menuChangeFlag){
					if( id == "11" ){//시계열메뉴 클릭
						srvLogWrite('P0','03','01','00',$totSurvMain.ui.selectedThema);
					} else {
						srvLogWrite('P0','01','03','00',$totSurvMain.ui.selectedThema,'year='+id);
					}
					$totSurvLeft.ui.leftTmsSelect(id);
					menuChangeFlag = false;
				}
			});
			//20201027 박은식 - 사이드 토글버튼 이벤트 추가 START
			$("body").on("click", ".sideMenuToggleBtn", function(){
				if($("#sideMenuArea").is(":visible") == false){
					$("#sideMenuArea").show();
					$("#totSurvDetailDataDiv").css("width","calc(100% - 500px)");
					
					$(".sideMenuToggleBtn").removeClass("on");
					$totSurvDetail.ui.detailDivResize();
				} else {
					$("#sideMenuArea").hide();
					$("#totSurvDetailDataDiv").css("width","100%");
					
					$(".sideMenuToggleBtn").addClass("on");
					$totSurvDetail.ui.detailDivResize();
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

