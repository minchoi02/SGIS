/**
 * 생활업종 통계지도 데이터보드에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/11/05  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$bizStatsDataBoard = W.$bizStatsDataBoard || {};
	
	$(document).ready(function() {
		$bizStatsDataBoard.event.setUIEvent();	//UI에 사용되는 이벤트를 설정한다.
		$bizStatsDataBoard.ui.mapDataSetting();	//지도별 데이터 형식 세팅ysettingList
		
		Highcharts.setOptions({
			lang: {
				thousandsSep: ','
			}
		});
		
	});
	/******************************박길섭추가******************************/
	$bizStatsDataBoard.util = {
			
			/**
			  * 
			  * @name         : tableSortable
			  * @description  : 테이블 정렬 수행
			  * @date         : 2018. 01. 15. 
			  * @author	      : 권차욱 
			  * @history 	  :
			  * @param id	  : 엘리먼트 아이디
			  */		
			tableSortable : function(id) {
				var table = $(id);
				table.find(".th").click(function() {
					var n = $(this).index();
					var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
					  switching = true;
					  dir = "asc"; 
					  while (switching) {
					    switching = false;
					    rows = table.find("tr");

					    for (i = 1; i < (rows.length - 1); i++) {
					      shouldSwitch = false;
					      x = $(rows[i]).find("td").eq(n);
					      y = $(rows[i + 1]).find("td").eq(n);

					      if (dir == "asc") {
					        if (parseFloat(x.html()) > parseFloat(y.html())) {
					          shouldSwitch= true;
					          break;
					        }
					      } else if (dir == "desc") {
					        if (parseFloat(x.html()) < parseFloat(y.html())) {
					          shouldSwitch= true;
					          break;
					        }
					      }
					    }
					    if (shouldSwitch) {
					      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
					      switching = true;
					      switchcount ++; 
					    } else {
					      if (switchcount == 0 && dir == "asc") {
					        dir = "desc";
					        switching = true;
					      }
					    }
					  }
				});
			}
		};
	/***********************************************************************************/
	$bizStatsDataBoard.ui = {
			mapData : [],				//지도별 데이터
			map : null,				//지도 (sMap.map)
			map_id : "0",				//지도 ID (0, 1, 2)
			chartDataList : [],
			miniGeojson : null,
			theme_nm:"",
			
			/**
			 * 
			 * @name         : mapDataSetting
			 * @description  : 지도별 데이터 형식 세팅
			 * @date         : 2015. 10. 28. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			mapDataSetting : function() {
				var tempObj = {};
				for(var i = 0; i < 3; i ++) {
					tempObj = {
							"options" : {},
							"type" : ""
					}
					this.mapData.push(tempObj);					
				}
			},
			/**
			 * 
			 * @name         : doLqMapValue
			 * @description  : 업종별 입지계수 지도 생활업종 값 정보 세팅
			 * @date         : 2018. 09. 19. 
			 * @author	     : 박길섭
			 * @history 	 :
			 */
			doLqMapValue : function(mapInfo){
				var lqLayerInfo=$bizStatsMap.ui.lqMap.lqLayerInfo;
				var adm_cd=$bizStatsMap.ui.lqMap.adm_cd;
				var themeCd=$bizStatsMap.ui.lqMap.theme_cd;
				var year=$bizStatsMap.ui.lqMap.year;
				var adm_nm=$bizStatsMap.ui.lqMap.adm_nm;
				
				
				this.mapData[this.map_id].options.params.type=mapInfo;
				var theme_cd=this.mapData[this.map_id].options.params.theme_cd;
				var theme_nm=this.mapData[this.map_id].options.params.theme_nm;
				if(lqLayerInfo!="sgg"){
					$bizStatsMap.ui.doLqMap(theme_cd,theme_nm,mapInfo);
				}
				else{
					$bizStatsMap.ui.deDoGetSggLq(adm_cd,adm_nm,themeCd,mapInfo,0,"",$bizStatsMap.ui.lqMap.region);
				}
			},
			/**
			 * 
			 * @name         : reDraw
			 * @description  : 데이터보드 다시 그리기 (지도 삭제, 보고있는 지도 변경일 경우)
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @param	: map_id
			 * @history 	 :
			 */
			reDraw : function(map_id) {
				//데이터가 조회되지 않은 지도는 데이터보드를 열지 않음
				if (map_id != this.map_id) {
					if(this.mapData[map_id].options != "") {
						var sceneInx = $(".sceneBox.on").length;
						if(sceneInx > 1) {
							this.updateDataBoard(this.mapData[map_id].options, this.mapData[map_id].type);	
						}
					}
				}
			},
			
			/**
			 * @name		: initDataBoard
			 * @description	: 데이터보드 초기화
			 * @date		: 2016.11.22
			 * @author		: 김재상 
			*/
			initDataBoard : function(){
				$(".dataBoardDiv").hide();
				
				// 집어넣기.. 추가할지말지 고민
				$(".sop-right").stop().animate({"right":"0px"},200);//20년수정반영
				$(".dataSideBox").stop().animate({"right":"-1500px"},200);
				$(".bizStatsDataBoard").removeClass("on").stop().animate({"right":"0"},200);
			},
			
			/**
			 * 
			 * @name         : updateDataBoard
			 * @description  : 데이터보드 업데이트
			 * @date         : 2015. 10. 28. 
			 * @author	     : 김성현
			 * @param	: options, type
			 * @history 	 :
			 */
			/**
			 * @param options
			 * @param type
			 */
			updateDataBoard : function(options, type) {
				
				//2016.04.14 주용민
				//버블 지도 시각화시 타 경계 클릭 막기
				$bizStatsLeftMenu.ui.curSelectedStatsType = type;
				
				//메모리에 저장
				this.map = options.params.map;
				this.map_id = options.params.map.id;
				this.mapData[this.map_id].type = type;
				
				//창업지역검색이 아닐 경우만 options를 저장
				if(type != "areaSearch") {
					//데이터보드의 조회조건은 여기에 모두 저장
					this.mapData[this.map_id].options = options;
				} else {	//창업지역검색일 경우 params를 저장
					this.mapData[this.map_id].options.params = options.params;
				}
				
				//데이터보드 조회조건이 undefined일 경우 초기화
				if(this.mapData[this.map_id].options.dataBoard == undefined) {
					this.mapData[this.map_id].options.dataBoard = {};
				}
				
				//보고서 차트정보 초기화
				this.chartDataList[options.params.map.id] = null;
				
				//데이터보드 열기
				var sceneInx = $(".sceneBox.on").length;
				if(sceneInx == 1) {
					$bizStatsDataBoard.event.dataBoardOpen();	
				}
				
				//Intro) 17개 시도별 생활업종현황
				if(type == "intro") {
					// mng_s 20201119 김건민 (업종별 입지계수 현황 그래프 때문에 추가함.)
					$(".sidoFeatureChartArea").hide();
					// mng_e 20201119 김건민
					this.updateIntro(options);
					
					
				//업종별 지역현황
				} else if(type == "jobArea") {
					this.updateJobArea(options);
					
				//업종별 입지계수 지도 박길섭추가
				} else if(type == "lqMap") {
					this.updateLqMap(options);
					
					//업종밀집도 변화
				} else if(type == "jobChange") {
					this.updateJobChange(options);
				
				//지자체 인허가 업종별 개업 현황
				} else if(type == "jobOpen") {
					this.updateJobOpen(options);
					
				//업종별 뜨는 지역
				} else if(type == "jobBest") {
					this.updateJobBest(options);
					
				//지역 종합정보
				} else if(type == "areaInfo") {
					this.updateAreaInfo(options);
					
				//창업지역검색
				} else if(type == "areaSearch") {
					this.updateAreaSearch(options);
					
				//상권정보
				} else if(type == "trade") {
					this.updateTrade(options);
				}
				
				
			},
			
			/**
			 * 
			 * @name         : updateIntro
			 * @description  :	인트로 데이터보드
			 * @date         : 2015. 11. 05. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			updateIntro : function(options) {
				$(".dataBoardDiv").hide();
				$("#introSidoDiv").show();
				$("#introSidoDetailChart").hide();
				$("#introSidoChart").show();
				$(".bizCateMenu").find("a").removeClass("on");
				$("#introMainTabDiv a:eq(0)").addClass("on");//박길섭 추가
				//테마코드 초기화
				options.params.theme_cd = null;
				options.params.map_information_type = $bizStatsMap.ui.lqMap.type;
				//명칭
			//	$(".seoulBox").html(options.params.adm_nm+" <span>2015</span>");
				
				//사업체 2016 반영 20180220 leekh
				
				// mng_s 20210514 김건민 (사업체 적용)
				$(".seoulBox").html(options.params.adm_nm+" <span>" + companyDataYear + " (17개 주요 시도별 생활업종현황)</span>");//20019-04-17 박길섭
				// mng_e 20210514 김건민
				$(".areaSpan").text(options.params.adm_nm);
				$("#introMainTabDiv").show();//2019-04-19 박길섭
				
				//////////////////////////박길섭////////////////////////
				if(options.params.charttype==1){
					//생활편의업종 분류별 사업체 비율 차트
					$(".businessOrWorker").text("사업체"); // 사업체 or 종사자
					$("#sidoFeatureMajorBtn02").removeClass("on");///업종별특성현황으로 초기화되게
					$("#sidoFeatureMajorBtn01").addClass("on");///업종별특성현황으로 초기화되게
					$("#sidodataBoard").show();///업종별특성현황으로 초기화되게
					$bizStatsDataBoardApi.request.introSidoPieChart(options);	//시도 Pie차트
					$bizStatsDataBoardApi.request.introCountryPieChart(options);	//전국 Pie차트
				}
				if(options.params.charttype==2){
					//생활편의업종 분류별 종사자 비율 차트
					$(".businessOrWorker").text("종사자"); // 사업체 or 종사자
					$("#sidoFeatureMajorBtn02").removeClass("on");///업종별특성현황으로 초기화되게
					$("#sidoFeatureMajorBtn01").addClass("on");///업종별특성현황으로 초기화되게
					$("#sidodataBoard").show();///업종별특성현황으로 초기화되게
					$bizStatsDataBoardApi.request.introSidoWorkerPieChart(options);	//시도 Pie차트
					$bizStatsDataBoardApi.request.introCountryWorkerPieChart(options);	//전국 Pie차트
				}
				//생활편의업종 현황
				$bizStatsDataBoardApi.request.introSidoRank(options);
				
				this.changeIntroChartType(options.params.charttype);
			},
			
			changeIntroChartType : function(idx){
				$("#introChartType a").removeClass("on");
				$("#introChartType a:eq("+(idx-1)+")").addClass("on");
				
				this.changeIntroChartContent(1);
			},
			
			changeIntroChartContent : function(idx){
				$("#introChartContent a").removeClass("on");
				$("#introChartContent a:eq("+(idx-1)+")").addClass("on");
				//mng_s 20190329 김건민
				if($("#introChartType a").hasClass("on")){
					var srvLogPatType = $('#introChartType').children('.on')[0].text;
					
					var srvLogParValue = $("#introChartContent a:eq("+(idx-1)+")").text();
				
				}
				
				//srvLogWrite('G1', '03', '02', '04', '', srvLogPatType + "/" +srvLogParValue);
				//mng_e 20190329 김건민
				
				var activateChartNum = 0;
				var id = $("#introChartType a.on").attr("id");
				
				switch(id){
					case "icType01": activateChartNum = idx; break;
					case "icType02": activateChartNum = idx + 3; break;
					default: activateChartNum = 1; break;
				}
				
				$(".introRankChart").hide();
				$(".introRankChart0"+activateChartNum).show();
				
			},
			
			/**
			 * 
			 * @name         : introPieChartClick
			 * @description  :	인트로 데이터보드 Pie차트 선택 시
			 * @date         : 2015. 11. 05. 
			 * @author	     : 김성현
			 * @param	: themeNm 테마
			 * @history 	 :
			 */
			introPieChartClick : function(themeCd) {
				$(".dataBoardDiv").hide();
				$("#introSidoDiv").show();
				$("#introSidoChart").hide();
				$("#introSidoDetailChart").show();
				
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존코드 주석처리 (pse) 
				/*
				//탭 선택 삭제
				$("#introTabDiv").find("a").removeClass("on");

				switch (themeCd) {
					case "10":	//서비스
						$("#introTabDiv").find("a:eq(2)").addClass("on");
						this.introSidoThemeTabClick(2);
						break;
					case "20":	//도소매
						$("#introTabDiv").find("a:eq(3)").addClass("on");
						this.introSidoThemeTabClick(3);
						break;
					case "40":	//숙박업
						$("#introTabDiv").find("a:eq(4)").addClass("on");
						this.introSidoThemeTabClick(4);
						break;
					case "50":	//음식점
						$("#introTabDiv").find("a:eq(1)").addClass("on");
						this.introSidoThemeTabClick(1);
						break;
					default:
						break;
				}
				*/
				// 2020년 SGIS고도화 3차(테마코드) 끝 - 기존코드 주석처리 (pse) 
				
				this.introSidoThemeTabClick(themeCd);	// 2020년 SGIS고도화 3차(테마코드) - introSidoThemeTabClick 메서드 내용을 수정함 (pse)
				
				this.mapData[this.map_id].options.params.theme_cd = themeCd;	//테마코드
				
				var options = this.mapData[this.map_id].options;
				//////////////////박길섭
				if(options.params.charttype==1){
					$bizStatsDataBoardApi.request.introSidoDetailChart(options);	//시도 세부업종 차트
					$bizStatsDataBoardApi.request.introCountryDetailChart(options);	//전국 세부업종 차트
				}
				if(options.params.charttype==2){
					$bizStatsDataBoardApi.request.introSidoDetailWorkerChart(options);	//시도 세부업종 차트
					$bizStatsDataBoardApi.request.introCountryDetailWorkerChart(options);	//전국 세부업종 차트
				}
//				$bizStatsDataBoardApi.request.introSidoDetailRank(options);	//세부업종 세분류
				$bizStatsDataBoardApi.request.introSidoRank(options);	//세부업종 세분류
				
				this.changeIntroChartType(1);
			},
			
			/**
			 * @name         : introSidoThemeTabClick
			 * @description  : 시도별 생활업종현황 테마 탭 클릭시 호출
			 * @date         : 2016. 06. 22.
			 * @author	     : 김성현
			 * @param :	 idx	(1:음식점, 2:도소매, 3:서비스, 4:숙박업) 
			 * @modify:  idx를 쓰는 방식은 값이 0인 것을 제외하고는 쓰지 않음 ( 2020-07-28 작성, PSE )
			 */
			introSidoThemeTabClick : function(bigThemeCd) {	 // 2020년 SGIS고도화 3차(테마코드) - 파라미터 명 변경 (pse)
				//탭 초기화 후 선택
				$(".bizCateMenu").find("a").removeClass("on");
				// 2020년 SGIS고도화 3차(테마코드) 시작 - if분기문 추가 (pse) 
				if(bigThemeCd == 0) {
					$(".bizCateMenu").find("a:eq("+(bigThemeCd)+")").addClass("on");
				} else {
					$(".bizCateMenu").find('a[data-big-theme-cd="'+bigThemeCd+'"]').addClass("on");	
				}
				// 2020년 SGIS고도화 3차(테마코드) 끝 (pse)
				//업종별 탭 show/hide
				$(".introSidoThemeTab").hide();
				//$("#introSidoThemeTab0"+idx).show();	// 2020년 SGIS고도화 3차(테마코드) - 기존 코드 주석처리, 어디에서도 쓰이지 않음.(pse)
			},
	
			/**
			 * 
			 * @name         : introSidoThemeDetailClick
			 * @description  :	인트로 데이터보드 시도에서 테마 선택 시
			 * @date         : 2016. 06. 22. 
			 * @author	     : 김성현
			 * @param	: themeCd, themeNm
			 */
			introSidoThemeDetailClick : function(themeCd, themeNm) {
				this.mapData[this.map_id].options.dataBoard.jobAreaThemeCd = themeCd;	//테마코드
				$bizStatsLeftMenu.ui.doCompanySidoIntro();	//업종별 지역현황 정보를 보여준다.
				//업종별 지역현황 정보를 요청한다.
				setTimeout(function() {
					$bizStatsMap.ui.doReqSidoCompany(adm_cd, themeCd, themeNm);
				}, 1000);
			},
			
			/**
			 * 
			 * @name         : pageBack
			 * @description  :	세부현황에서 뒤로 가기 버튼 클릭 시
			 * @date         : 2015. 11. 06. 
			 * @author	     : 김성현
			 * @param	: type
			 * @history 	 :
			 */
			pageBack : function(type) {
				//탭 선택 삭제
				$("#introMainTabDiv").find("a").removeClass("on");
				//종합현황 탭 선택
				$("#introMainTabDiv").find("a:eq(0)").addClass("on");
				//데이터보드 재 호출
				this.introSidoThemeTabClick(0);
				
				this.updateDataBoard(this.mapData[this.map_id].options, type);
				
			},
			/**
			 * 
			 * @name         : sidocharorLq
			 * @description  : 시도별 업종별 특성 및 입지계수 선택
			 * @date         : 2018. 08. 20. 
			 * @author	     : 박길섭
			 * @param	: 
			 * @history 	 :
			 */
			sidocharorLq : function(type) {
				
				$("#sidoFeatureMajorBtn a").removeClass("on");
				$(".sidoFeatureChartArea").hide();
				this.mapData[this.map_id].options.chartSeq = type;
				if(type == 1){
					$("#sidodataBoard").show();
					$("#sidoFeatureMajorBtn02").removeClass("on");
					$("#sidoFeatureMajorBtn01").addClass("on");
					this.introSidoThemeTabClick(0);
					this.updateDataBoard(this.mapData[this.map_id].options, 'intro');
				}else if(type ==3){
					
					$("#sidodataBoard").hide();
					$(".sidoFeatureChartArea").show();
					$("#sidoFeatureMajorBtn02").addClass("on");
					$bizStatsDataBoardApi.request.introSidoFeatureLctChart(this.mapData[this.map_id].options);
					
				}
				
				/*//탭 선택 삭제
				$("#introMainTabDiv").find("a").removeClass("on");
				//종합현황 탭 선택
				$("#introMainTabDiv").find("a:eq(0)").addClass("on");
				//데이터보드 재 호출
				this.introSidoThemeTabClick(0);
				
				this.updateDataBoard(this.mapData[this.map_id].options, type);*/
				
			},
			/**
			 * 
			 * @name         : sggcharorLq
			 * @description  : 시군구별 업종별 특성 및 입지계수 선택
			 * @date         : 2018. 08. 22. 
			 * @author	     : 박길섭
			 * @param	: 
			 * @history 	 :
			 */
			sggcharorLq : function(type) {
				$("#sggFeatureMajorBtn a").removeClass("on");
				$("#sigunguLctTab").hide();
				this.mapData[this.map_id].options.chartSeq = type;
				if(type == 1){
					$(".view").show();
					// 2020년 SGIS고도화 3차(테마코드) 시작 - 데이터보드 가장 상단의 탭 클릭시 대분류 탭 유무 코드 변경 (pse)
					//$("#sigunguTabs").show();	// 기존 코드 주석 
					$(".bizCateMenu").show();	// 새로운 코드 추가
					// 2020년 SGIS고도화 3차(테마코드) 끝
					//$(".view2").show();
					$("#sigunguClassChartArea01").show();
					$("#sigunguClassChartArea02").show();
					$(".divChartMiddle").show();
					$("#sigunguClassChartArea03").show();
					$("#sigunguClassChartArea04").show();
					$("#sggFeatureMajorBtn02").removeClass("on");
					$("#sggFeatureMajorBtn01").addClass("on");
					$bizStatsDataBoard.ui.jobAreaTabClick('0');
				}else if(type ==3){
					//$(".view").hide();
					$(".bizCateMenu").hide();
					$(".jobAreaTab").hide();
					$("#sggFeatureMajorBtn").show();
					$("#sigunguClassChartArea01").hide();
					$("#sigunguClassChartArea02").hide();
					$(".divChartMiddle").hide();
					$("#sigunguClassChartArea03").hide();
					$("#sigunguClassChartArea04").hide();
					$("#sigunguLctTab").show();
					//$(".view2").hide();
					//$("#sigunguLctTab").show();
					$("#sggFeatureMajorBtn02").addClass("on");
					this.mapData[this.map_id].options.params.region='country';//전국대비 옵션
					$bizStatsDataBoardApi.request.sggFeatureLctChart(this.mapData[this.map_id].options);
					
				}
			},
			////박길섭 추가 시도대비 전국대비
			changeSigunguLctChart : function(region){
				/*//console.log("changeSigunguLctChart");
				//console.log(region);*/
				this.mapData[this.map_id].options.params.region=region;//전국대비 or 시도대비를 선택하기 위한 옵션
				
				if(region == "country"){
					$(".noneAreaBox .dbTabs a").eq(0).addClass("on");
					$(".noneAreaBox .dbTabs a").eq(1).removeClass("on");
					$bizStatsDataBoardApi.request.sggFeatureLctChart(this.mapData[this.map_id].options);
				}else{
					$(".noneAreaBox .dbTabs a").eq(1).addClass("on");
					$(".noneAreaBox .dbTabs a").eq(0).removeClass("on");
					$bizStatsDataBoardApi.request.sggFeatureLctChart(this.mapData[this.map_id].options);
				}
				
			},
			/**
			 * @name         : changeLqChart
			 * @description  : 업종별 입지계수 지도 전국 대비, 시도 대비 입지계수차트 표 전환
			 * @date         : 2018.10.01
			 * @author	     : 박길섭
			 * @history 	 :
			 */
			changeLqChart : function(region){
				
				var adm_cd=$bizStatsMap.ui.lqMap.adm_cd;
				var adm_nm=$bizStatsMap.ui.lqMap.adm_nm;
				var theme_cd=$bizStatsMap.ui.lqMap.theme_cd;
				var theme_nm=$bizStatsMap.ui.lqMap.theme_nm;
				var mapInfo=$bizStatsMap.ui.lqMap.type;
				var year=$bizStatsMap.ui.lqMap.year;
				if(region=='country'){
					$("#countryOrSido").find(".dbTabs a").eq(0).addClass("on");
					$("#countryOrSido").find(".dbTabs a").eq(1).removeClass("on");
					$bizStatsDataBoardApi.request.sggLqOfLqMap(adm_cd,theme_nm,theme_cd,mapInfo,region,year);
					$bizStatsMap.ui.deDoGetSggLq(adm_cd,adm_nm,theme_cd,mapInfo,0,theme_nm,region);
				}
				else{
					$bizStatsMap.ui.lqMap.region=region;
					$("#countryOrSido").find(".dbTabs a").eq(1).addClass("on");
					$("#countryOrSido").find(".dbTabs a").eq(0).removeClass("on");
					$bizStatsDataBoardApi.request.sggLqOfLqMap(adm_cd,theme_nm,theme_cd,mapInfo,region,year);
					$bizStatsMap.ui.deDoGetSggLq(adm_cd,adm_nm,theme_cd,mapInfo,0,theme_nm,region);
				}
			},
			/**
			 * @name         : changeShowChartTable
			 * @description  : 시도, 시군구 입지계수차트 표 전환
			 * @date         : 2018.08.20
			 * @author	     : 박길섭
			 * @history 	 :
			 */
			changeShowChartTable : function(id,idx){
				

				var showId = "";
				var hideId = "";
				/*//console.log($(".noneAreaBox .dbTabs a").length);
				//console.log("idx = " + idx);
					$(".noneAreaBox .dbTabs a").eq(0).addClass("on");
					$(".noneAreaBox .dbTabs a").eq(1).removeClass("on");*/
				// mng_s 20190402 김건민
				if(idx == "1"){
					showId = "#"+id+"_"+idx;
					hideId = "#"+id+"_2";
					$(hideId).hide();
					$(showId).show();
					$("#sidoFeatureChart03_2").hide();
					$("#sigunguLctChart_2").hide();
					$("#lqMapFeatureChart03_2").hide();
					$("#lqMapFeatureChart03").show();
					//$("#countryOrSido").hide();
					$(".combineGrid").hide();//엑셀다운로드
					$(showId).parent().find(".ar").css("margin-left", "35px"); //2018.01.15 [개발팀]
					$(showId).parents(".compareBox").find(".combineGrid").hide();
				}else{
					showId = "#"+id+"_"+idx;
					hideId = "#"+id+"_1";
					$("#sidoFeatureChart03_2").show();
					$("#sigunguLctChart_2").show();
					$("#lqMapFeatureChart03_2").show();
					$("#lqMapFeatureChart03").hide();
					//$("#countryOrSido").show();
					$(".combineGrid").show();//엑셀다운로드
					$(showId).parent().find(".ar").css("margin-left", "-20px"); //2018.01.15 [개발팀]
					$(showId).parents(".compareBox").find(".combineGrid").show();
				}
				$(hideId).hide();
				$(showId).show();
			},
			
			/**
			 * 
			 * @name         : updateJobArea
			 * @description  :	업종별 지역현황 데이터보드
			 * @date         : 2015. 11. 05. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			updateJobArea : function(options) {
				$(".dataBoardDiv").hide();
				$("#jobAreaDiv").show();
				
				//조회시 기존에 선택된 테마코드가 있으면 다시 선택해준다
				if(options.dataBoard.jobAreaThemeCd != undefined) {
					$(".totalResult.tr01 input").each(function() {
						$(this).removeAttr("checked");
						if($(this).val() == options.dataBoard.jobAreaThemeCd) {
							$(this).attr("checked", "checked");
						}
					});
				}
				
				var themeCd = "";
				var themeNm = "";
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존코드 주석처리 (pse)
				/*
				var jobAreaTab = "";
				var tab = 0;
				
				//Left메뉴에서 선택되어 있는 조회조건 찾기
				$("input[name='rd_service']").each(function() {		//서비스
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobAreaTab = "jobAreaTab03";
						tab = '10';
					}
				});
				$("input[name='rd_retail']").each(function() {		//도소매
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobAreaTab = "jobAreaTab02";
						tab = '20';
					}
				});
				$("input[name='rd_hotel']").each(function() {		//숙박업
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobAreaTab = "jobAreaTab04";
						tab = '40';
					}
				});
				$("input[name='rd_food']").each(function() {		//음식점
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobAreaTab = "jobAreaTab01";
						tab = '50';
					}
				});
				*/
				// 2020년 SGIS고도화 3차(테마코드) 끝 - 기존코드 주석처리 (pse)
				
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 좌측메뉴의 값이 데이터보드에 영향을 미쳐서  코드 추가, 위의 if 분기문을 모두 대체한다. (pse)
				var checkedInput = $("input[type='checkbox'][name^='rd_theme_'][checked='checked']");
				themeCd = checkedInput.val();
				themeNm = checkedInput.next().text();
				// 2020년 SGIS고도화 3차(테마코드) 끝 - 좌측메뉴의 값이 데이터보드에 영향을 미쳐서  코드 추가, 위의 if 분기문을 모두 대체한다. (pse)
				
				//전체 탭 숨기고 선택한 탭만 열기
				/*$(".jobAreaTab").hide();
				$("#"+jobAreaTab).show();*/
				if($("#bizCateMenu0").hasClass("on")){//종합현황 때문에
					themeCd='0000';
				}
				this.mapData[this.map_id].options.params.theme_cd = themeCd;
				// 탭 초기화
				this.jobAreaTypeClick("corp_cnt",themeCd);
				//업종별 지역현황 테마코드별 조회
				this.jobAreaThemeClick("circleClick", themeCd, themeNm);
			},
			/**
			 * @name         : categoryYearChangeTabClick				// 2020년 SGIS고도화 3차(테마코드) - 메서드 명 맞게 수정 (pse)
			 * @description  : 업종별 년도별 입지계수 - 카테고리 탭 클릭시 호출
			 * @date         : 2018. 09. 06
			 * @author	     : 박길섭 
			 * @param 		 : themeCd 
			 */
			categoryYearChangeTabClick : function(categoryCd, fromDataBoardTab){	// 2020년 SGIS고도화 3차(테마코드) - 파라미터명 변경 및 추가 (pse)
				
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존코드 주석 처리 (pse)
				/*
				var cateCd = categoryCd.substring(0,2);
				$(".bizYearCateMenu").find("a").removeClass("on");
				$(".bizYearCateMenu").find("a#categoryYearChangeType"+cateCd).addClass("on");
				$(".categoryYearChangeTab").hide();
				$("#categoryYearChangeTab"+cateCd).show();
				//탭 초기화 후 선택
			if (categoryCd == '50') {
				this.categoryYearDetailTabClick('5000', '음식점');
			} else if (categoryCd == '20') {
				this.categoryYearDetailTabClick('2000', '도소매');
			} else if (categoryCd == '10') {
				this.categoryYearDetailTabClick('1000', '서비스');
			} else if (categoryCd == '40') {
				this.categoryYearDetailTabClick('4000', '숙박업');
			}
			*/
				// 2020년 SGIS고도화 3차(테마코드) 끝 - 기존코드 주석 처리 (pse)
				
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 새로운 코드 작성 (pse)
				var cateCd;
			    var cateName;
			    if($themeCdCommon.isBigThemeCd(categoryCd)) {

			        cateCd = categoryCd;
			        cateName = $themeCdCommon.findBigThemeName(cateCd);

			    } else {

			        var smallThemeInfo = $themeCdCommon.findSmallThemeDetail(categoryCd); 
			        cateCd = smallThemeInfo.b_theme_cd;
			        cateName = smallThemeInfo.b_theme_cd_nm;

			    }
			    $(".bizYearCateMenu").find("a").removeClass("on");
			    $(".bizYearCateMenu").find("a#categoryYearChangeType_"+cateCd).addClass("on");	
			    $(".categoryYearChangeTab").hide();
			    $("#categoryYearChangeTab_"+cateCd).show();									

			    if(fromDataBoardTab) {	// 좌측메뉴에서 클릭하는 것과 오른쪽 데이터보드에서 클릭할 때의 동작의 차이가 있어서 이렇게 되었다.
			        this.categoryYearDetailTabClick(cateCd, cateName);
			    }
			    // 2020년 SGIS고도화 3차(테마코드) 끝 - 새로운 코드 작성 (pse)
			},
			/**
			 * 
			 * @name         : categoryYearDetailTabClick
			 * @description  :	업종별 년도별 입지계수 - 카테고리 별 테마코드 탭 선택 시
			 * @date         : 2018. 10. 01. 
			 * @author	     : 박길섭
			 * @param	: themeCd, themeNm
			 * @history 	 :
			 */
			categoryYearDetailTabClick : function(themeCd,themeNm,adm_cd,adm_nm){
				//var type=this.mapData[this.map_id].options.params.type;
				$(".categoryYearChangeTab li a").removeClass("on");
				$("#categoryYearDetail_"+themeCd).addClass("on");
				//this.mapData[this.map_id].options.params.theme_cd = themeCd;//테마코드
				//this.mapData[this.map_id].options.params.theme_nm = themeNm;//테마코드명
				//var options = this.mapData[this.map_id].options;
				////console.log(options.params.theme_cd);
				var id = "#lqColumCharts02";
				
				$(id).highcharts({
					chart: { zoomType: 'xy' },
			        colors: ['#9dc3e6', '#ff6969'],
			        title: { text: '' },
			        subtitle: {
			            text: ''
			        },
			        xAxis: [{
			            crosshair: true
			        }],
			        yAxis: [{ // Secondary yAxis
			            title: {
			                text: ''
			            },
			            labels: {
			            	enabled : false 
			            }
			        }],
			        tooltip: {
			            shared: true
			        },
			        legend: {
			        	enabled : false
			        },
			        series: []
			    });
				//하이차트 프린트 버튼 삭제
				$(".highcharts-button").remove();
				$bizStatsMap.ui.lqMap.yearTheme_cd=themeCd;
				$bizStatsMap.ui.lqMap.yearTheme_nm=themeNm;
				if(adm_cd!=undefined){
					$bizStatsMap.ui.lqMap.yearlq="second";
				}
				
				
				if($bizStatsMap.ui.lqMap.yearlq=="first"||$bizStatsMap.ui.lqMap.yearlq==null){
					var sgg_nm=$bizStatsMap.ui.lqMap.adm_nm.split(" ");
					var options = {
							params : {
								theme_cd : themeCd,
								sido_cd : $bizStatsMap.ui.lqMap.adm_cd.slice(0,2),
								sgg_cd : "000",
								sido_nm : sgg_nm[0],
							},
						};

					$bizStatsDataBoardApi.request.lqChartOfYear(options,null);
					// mng_s 20190619 김건민(이전 버튼 클릭시 데이터보드 시도명 보여주기)
					$(".areaNameBox").html(sgg_nm[0]+" "+"<span style='font-size:13px;'>" +($bizStatsMap.ui.lqMap.year).replace("9016","2016")+"</span>");//2019-04-16 박길섭
					$(".areaNameBox").css("font-size","22px");
					// mng_e 20190619 김건민
				}
				else{
					var sgg_nm=$bizStatsMap.ui.lqMap.adm_nm.split(" ");
					var option = {
							params : {
								theme_cd : themeCd,
								sido_cd : $bizStatsMap.ui.lqMap.adm_cd.slice(0,2),
								sgg_cd : "000",
								sido_nm : sgg_nm[0],
							},
						};
					// mng_s 20201126 김건민
					if(sgg_nm[1]!=undefined){
						sgg_nm=sgg_nm[1];
					}
					else{
						sgg_nm=sgg_nm[0];
					}
					// mng_e 20201126 김건민
					var options = {
							params : {
								theme_cd : themeCd,
								sido_cd : $bizStatsMap.ui.lqMap.adm_cd.slice(0,2),
								sgg_cd : $bizStatsMap.ui.lqMap.adm_cd.slice(2,5),
								sido_nm : sgg_nm,
								
							},
						};
					var callback=$bizStatsDataBoardApi.request.lqChartOfYear(option,null);
					setTimeout(function() {
						$bizStatsDataBoardApi.request.lqChartOfYear(options,callback);
					},500);

					// mng_s 20200218 김건민(데이터보드 시도, 시군구명 보여주기)
					if(adm_nm == undefined){
						$(".areaNameBox").html(sgg_nm+" "+"<span style='font-size:13px;'>" +($bizStatsMap.ui.lqMap.year).replace("9016","2016")+"</span>");//2019-04-16 박길섭
					}else{
						$(".areaNameBox").html(adm_nm+" "+"<span style='font-size:13px;'>" +($bizStatsMap.ui.lqMap.year).replace("9016","2016")+"</span>");//2019-04-16 박길섭
					}
					$(".areaNameBox").css("font-size","22px");
					// mng_e 20200218 김건민
				}
			},
			/**
			 * @name		: lqColumnHide
			 * @description	: 입지계수 데이터 보드 년도 변겯
			 * @date		: 2018.10.04
			 * @author		: 최재영, 박길섭 추가
			 */
			lqColumnHide : function(hideIdx1,hideIdx2){
				var chart = $("#lqColumCharts02").highcharts();
				
				var series1 = chart.series[hideIdx1];
				var series2 = chart.series[hideIdx2]; 
				
				 if (series1.visible) {
				        series1.hide();
				        series2.hide();
				        $("#ckbtn_"+hideIdx1).removeClass("on");
				    } else {
				    	series1.show();
				        series2.show();
				        $("#ckbtn_"+hideIdx1).addClass("on");
				    }
				 
				
			},
			/**
			 * 
			 * @name         : changeLqInfoYearDataBoard
			 * @description  :	업종별 년도별 입지계수 
			 * @date         : 2018. 10. 01. 
			 * @author	     : 박길섭
			 * @param	: year
			 * @history 	 :
			 */
			// 2019-04-13 djlee 수정 시작
			changeLqInfoYearDataBoard : function(year){
				 $("#lqInfoYearSettingList > li > a , #lqInfoYearSettingList2 > li > a ").removeClass("on")
				 $("#lqInfoYear_"+year +" > a").addClass("on");
				 // 2020년 SGIS고도화 3차(테마코드) 시작 - 9차 산업에는 민박이라는 테마코드가 없다. 대신 9차에서는 펜션(민박)의 형태로 존재한다. 테마코드를 펜션(민박)에 맞춰준다.(pse)
				 if(($bizStatsMap.ui.lqMap.theme_cd == "G001") && (year == "2016")) {
					 $bizStatsMap.ui.lqMap.theme_cd = "4003";
					 $(".categoryChangeTab li a").removeClass("on");
					 $('#categoryDetail_4003').addClass("on");
				 }
				 // 2020년 SGIS고도화 3차(테마코드) 끝 - 9차 산업에는 민박이라는 테마코드가 없다. 대신 9차에서는 펜션(민박)의 형태로 존재한다. 테마코드를 펜션(민박)에 맞춰준다. (pse)
				 var options = {
						 params : {
							 theme_cd : $bizStatsMap.ui.lqMap.theme_cd,
							 year : year,
						 },
				 	};
//				 if(year!="2015"){
//					 alert("연도데이터 받으면 수정 필요");
//				 }
				 $bizStatsMap.ui.lqMap.year=year;
				 if($bizStatsMap.ui.lqMap.type==null){
					 $bizStatsMap.ui.lqMap.type=="corp_lq";
				 }
				 if($bizStatsMap.ui.lqMap.lqLayerInfo == "sgg"){
					 var sidoNm=$bizStatsMap.ui.lqMap.adm_nm.split(" ");//2019-04-16 박길섭
					 $(".areaNameBox").html(sidoNm[0]+" "+"<span style='font-size:13px;'>" +($bizStatsMap.ui.lqMap.year).replace("9016","2016")+"</span>");//2019-04-16 박길섭
					 $(".areaNameBox").css("font-size","22px");
					 $bizStatsDataBoardApi.request.sggLqOfLqMap($bizStatsMap.ui.lqMap.adm_cd,$bizStatsMap.ui.lqMap.theme_nm,$bizStatsMap.ui.lqMap.theme_cd,"",$bizStatsMap.ui.lqMap.region,year);
					 $bizStatsMap.ui.deDoGetSggLq($bizStatsMap.ui.lqMap.adm_cd,$bizStatsMap.ui.lqMap.adm_nm,$bizStatsMap.ui.lqMap.theme_cd,$bizStatsMap.ui.lqMap.type,0,$bizStatsMap.ui.lqMap.theme_nm,$bizStatsMap.ui.lqMap.region);//여기 할차례
					
					
				 }else{ 
					 $(".areaNameBox").html("전국"+" "+"<span style='font-size:13px;'>" +($bizStatsMap.ui.lqMap.year).replace("9016","2016")+"</span>");
					 $(".areaNameBox").css("font-size","22px");
					 $bizStatsMap.ui.doLqMap($bizStatsMap.ui.lqMap.theme_cd, $bizStatsMap.ui.lqMap.theme_nm,$bizStatsMap.ui.lqMap.type,year);
					 $bizStatsDataBoardApi.request.sidoLqOfLqMap(options);
				 }
			},
			// 2019-04-13 djlee 수정 끝
			/**
			 * @name         : categoryChangeTabClick
			 * @description  : 업종별 입지계수지도 카테고리 탭 클릭시 호출
			 * @date         : 2018. 09. 06
			 * @author	     : 박길섭 
			 * @param 		 : themeCd, fromDataBoardTab					// 2020년 SGIS고도화 3차(테마코드) - 파라미터명 변경 및 추가 (pse)
			 */
			categoryChangeTabClick : function(themeCd, fromDataBoardTab){	// 2020년 SGIS고도화 3차(테마코드) - 파라미터명 변경 및 추가, categoryCd ==> themeCd(pse)
				
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존코드 주석처리 (pse)
				/*
				var cateCd = categoryCd.substring(0,2);
				$(".bizCateMenu").find("a").removeClass("on");
				$(".bizCateMenu").find("a#categoryChangeType"+cateCd).addClass("on");
				$(".categoryChangeTab").hide();
				$("#categoryChangeTab"+cateCd).show();
				//탭 초기화 후 선택
			if (categoryCd == '50') {
				this.categoryDetailTabClick('5000', '음식점');
			} else if (categoryCd == '20') {
				this.categoryDetailTabClick('2000', '도소매');
			} else if (categoryCd == '10') {
				this.categoryDetailTabClick('1000', '서비스');
			} else if (categoryCd == '40') {
				this.categoryDetailTabClick('4000', '숙박업');
			}
				*/
				// 2020년 SGIS고도화 3차(테마코드) 끝 - 기존코드 주석처리 (pse)
				
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 대체 코드 추가, 대분류를 알아내서 해당 코드값으로 cateCd으로 사용 (pse)
				var cateCd;
				var cateName;
				if($themeCdCommon.isBigThemeCd(themeCd)) {
				
					cateCd = themeCd;
					cateName = $themeCdCommon.findBigThemeName(cateCd);
				
				} else {
					
					var smallThemeInfo = $themeCdCommon.findSmallThemeDetail(themeCd); 
					cateCd = smallThemeInfo.b_theme_cd;
					cateName = smallThemeInfo.b_theme_cd_nm;
					
				}
				$(".bizCateMenu").find("a").removeClass("on");
				$(".bizCateMenu").find("a#categoryChangeType_"+cateCd).addClass("on");	// 기존코드의 categoryChangeType ==> categoryChangeType_ 로 수정 (pse)
				$(".categoryChangeTab").hide();
				$("#categoryChangeTab_"+cateCd).show();									// 기존코드의 categoryChangeTab ==> categoryChangeTab_ 로 수정 (pse)
				
				if(fromDataBoardTab) {	// 좌측메뉴에서 클릭하는 것과 오른쪽 데이터보드에서 클릭할 때의 동작의 차이가 있어서 이렇게 되었다.
					this.categoryDetailTabClick(cateCd, cateName,"dataBoardTab");	// 하드코딩된 if문 분기를 통한 categoryDetailTabClick 호출을 대체할 코드 추가 (pse)
				}
				// 2020년 SGIS고도화 3차(테마코드) 끝 - 대체 코드 추가, 대분류를 알아내서 해당 코드값으로 cateCd으로 사용 (pse)
				
			},
			/**
			 * @name         : jobAreaTabClick
			 * @description  : 시도별 생활업종현황 테마 탭 클릭시 호출
			 * @date         : 2016. 06. 22.,2018. 08. 30
			 * @author	     : 김성현, 박길섭 수정
			 * @param 		 : themeCd 
			 */
			jobAreaTabClick : function(themeCd) {
				if(!themeCd) themeCd = "5001"; //기본값 한식
				var cateCd = themeCd.substring(0,2);
				$("#sigunguClassChart01").remove;
				$("#sigunguClassChart02").remove;
				$("#sigunguClassChart03").remove;
				$("#sigunguClassChart04").remove;
				// mng_s 20200619 김건민 (문구 수정함.)
				if(themeCd=='0'||cateCd=='00'){
					this.mapData[this.map_id].options.dataBoard.themeCd="0";
					$bizStatsDataBoard.ui.theme_nm="종합현황";
					themeCd="0000";
					cateCd='0';
				}
				else if(themeCd=='50'||themeCd=='5000'){
					this.mapData[this.map_id].options.dataBoard.themeCd="5000";
					$bizStatsDataBoard.ui.theme_nm="음식점";
					$(".jobAreaTab li a").removeClass("on");
					$(".jobAreaTab").find("a#jobArea_5000").addClass("on");
					themeCd="5000";
				}
				else if(themeCd=='20'||themeCd=='2000'){
					this.mapData[this.map_id].options.dataBoard.themeCd="2000";
					$bizStatsDataBoard.ui.theme_nm="소매업";
					$(".jobAreaTab li a").removeClass("on");
					$(".jobAreaTab").find("a#jobArea_2000").addClass("on");
					themeCd="2000";
				}
				else if(themeCd=='10'||themeCd=='1000'){
					this.mapData[this.map_id].options.dataBoard.themeCd="1000";
					$bizStatsDataBoard.ui.theme_nm="생활서비스";
					$(".jobAreaTab li a").removeClass("on");
					$(".jobAreaTab").find("a#jobArea_1000").addClass("on");
					themeCd="1000";
				}
				else if(themeCd=='40'||themeCd=='4000'){
					this.mapData[this.map_id].options.dataBoard.themeCd="4000";
					$bizStatsDataBoard.ui.theme_nm="숙박업";
					$(".jobAreaTab li a").removeClass("on");
					$(".jobAreaTab").find("a#jobArea_4000").addClass("on");
					themeCd="4000";
				}
				// mng_e 20200619 김건민
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 새로운 테마코드 대분류 코드에 대한 if문 분기 추가 (pse)
				if($themeCdCommon.isBigThemeCd(themeCd)){
					this.mapData[this.map_id].options.dataBoard.themeCd=themeCd;
					//$bizStatsDataBoard.ui.theme_nm = $themeCdCommon.bigThemeCdList.filter(function(item){ return item.b_theme_cd === themeCd; })[0].b_theme_cd_nm;
					$bizStatsDataBoard.ui.theme_nm = $themeCdCommon.findBigThemeName(themeCd);
					$(".jobAreaTab li a").removeClass("on");
					$(".jobAreaTab").find("a#jobArea_"+themeCd).addClass("on");
				} else {
					if(themeCd != 0) { 
						var themeDetail = $themeCdCommon.findSmallThemeDetail(themeCd);
						cateCd = themeDetail.b_theme_cd;
					}
				}
				// 2020년 SGIS고도화 3차(테마코드) 끝
				
				this.mapData[this.map_id].options.params.theme_nm=$bizStatsDataBoard.ui.theme_nm;
				this.mapData[this.map_id].options.dataBoard.jobAreaThemeCd = themeCd;
				// 대분류 탭 초기화 후 선택
				$(".bizCateMenu").find("a").removeClass("on");
				$(".bizCateMenu").find("a#bizCateMenu"+cateCd).addClass("on");	// 지우지 말것,bizCateMenu0 때문임 (pse) 
				$(".bizCateMenu").find("a#bizCateMenu_"+cateCd).addClass("on"); // 2020년 SGIS고도화 3차(테마코드) - 테마코드 대분류 탭 색 칠하기 (pse)
				// 중분류 탭 show/hide
				$(".jobAreaTab").hide();
				//2019-04-17 박길섭 시작
				if(!$("#sggFeatureMajorBtn02").hasClass("on")){
					$("#jobAreaTab"+cateCd).show();		
					$("#jobAreaTab_"+cateCd).show(); 	// 2020년 SGIS고도화 3차(테마코드) - 테마코드 소분류에 보여주기 코드 추가 (pse)
				}
				//2019-04-17 박길섭 끝
				// 중분류 선택 (한식, 중식, 일식 ...)
				/*$(".jobAreaTab li a").removeClass("on");
				$("#jobArea_"+themeCd).addClass("on");*/
				this.mapData[this.map_id].options.params.theme_cd = themeCd;//2019-04-12 박길섭
				var sido_nm=this.mapData[this.map_id].options.params.adm_nm;
				sido_nm=sido_nm.split(" ");//도, 광역시, 특별시 값을 얻기위해 split
				this.mapData[this.map_id].options.params.sido_nm=sido_nm[0];
				//this.mapData[this.map_id].options.params.category = "corp_cnt";//막대차트는 항상 사업체 수 보기로 초기화
				if(cateCd=="0"||cateCd=='00'){
					$bizStatsDataBoardApi.request.sigunguPieChart(this.mapData[this.map_id].options);
					$bizStatsDataBoardApi.request.sggAllPieChart(this.mapData[this.map_id].options);
					$bizStatsDataBoardApi.request.sggBarChart(this.mapData[this.map_id].options);
					this.jobAreaTypeClick('corp_cnt',themeCd);
				}
				else{
					$bizStatsDataBoardApi.request.sggDetailPieChart(this.mapData[this.map_id].options);
					//mng_s 20180320_김건민
					this.mapData[this.map_id].options.params.region='country';
					$bizStatsDataBoardApi.request.sggFeatureLctChart(this.mapData[this.map_id].options);
					//mng_e 20180320_김건민
					$bizStatsDataBoardApi.request.averagePieChart(this.mapData[this.map_id].options);
					if(themeCd.slice(2,4)=='00'||themeCd.slice(2,4)==undefined||themeCd.slice(2,4)==null || $themeCdCommon.isBigThemeCd(themeCd)){ // 2020년 SGIS고도화 3차(테마코드) - 테마코드 대분류 조건 추가(pse)
						$bizStatsDataBoardApi.request.sggBarChart(this.mapData[this.map_id].options);
					}
					this.jobAreaTypeClick('corp_cnt',themeCd);
				}
				
				
			},
			
			/**
			 * 
			 * @name		: jobAreaTypeClick
			 * @description	: 시도별 생활업종현황 차트 타입 클릭이벤트
			 * @date		: 2016.08.24, 2018. 09.10
			 * @author		: 김재상, 박길섭 수정
			*/
			jobAreaTypeClick : function(type,themeCd) {
				var typeList = ["corp_cnt","corp_per","resid_ppltn_cnt","work_population_cnt","households_cnt","worker_cnt","avg_worker_cnt"];
				//탭 초기화 후 선택
				var idx=0;
				for(var i =0; i<typeList.length; i++){
					if(type!=typeList[i]){
						$("#jobAreaTypeCont_"+typeList[i] +" a").addClass("on");
						$("#rankChart_"+typeList[i]).hide();
					}
					else{
						idx=i;
					}
				}
				/*$("#rankChart_").find("a").removeClass("on");
				$(".jobAreaType").find("a:eq("+(idx)+")").addClass("on");
				//업종별 탭 show/hide
				$(".jobAreaTypeCont").hide();
				$("#jobAreaTypeCont0"+(idx+1)).show();*/
				////console.log(options.params.adm_cd,",", options.dataBoard.themeCd,",", options.dataBoard.themeNm)
				//this.mapData[this.map_id].options.params.category = type;
				//$bizStatsMap.ui.doReqSidoCompany(options.params.adm_cd, options.dataBoard.themeCd, options.dataBoard.themeNm, idx);
				
				/*var theme = this.mapData[this.map_id].options.params.theme_cd;
				
				if(themeCd==null){
				theme_cd = parseInt(theme);
				theme_cd = theme.slice(0,2);
				}
				else{
					theme_cd=parseInt(themeCd);
				}*/
				if(themeCd==undefined){
					themeCd=this.mapData[this.map_id].options.dataBoard.themeCd;
				}
				var theme_nm="";
				if(themeCd==1000||themeCd==10){
					themeCd="1000";//2019-04-12 박길섭
					theme_nm="서비스";
					$bizStatsMap.ui.doReqSggMap(themeCd, theme_nm, type);
					var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
					$bizStatsMap.ui.setTitle("시군구 생활업종 현황 > "+theme_nm, viewId);
					
				}
				else if(themeCd==2000||themeCd==20){
					themeCd="2000";//2019-04-12 박길섭
					theme_nm="도소매";
					$bizStatsMap.ui.doReqSggMap(themeCd, theme_nm, type);
					var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
					$bizStatsMap.ui.setTitle("시군구 생활업종 현황 > "+theme_nm, viewId);
					
				}
				else if(themeCd==4000||themeCd==40){
					themeCd="4000";//2019-04-12 박길섭
					theme_nm="숙박";
					$bizStatsMap.ui.doReqSggMap(themeCd, theme_nm, type);
					var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
					$bizStatsMap.ui.setTitle("시군구 생활업종 현황 > "+theme_nm, viewId);
					
				}
				else if(themeCd==5000||themeCd==50){
					themeCd="5000";//2019-04-12 박길섭
					theme_nm="음식점";
					$bizStatsMap.ui.doReqSggMap(themeCd, theme_nm, type);
					var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
					$bizStatsMap.ui.setTitle("시군구 생활업종 현황 > "+theme_nm, viewId);
					
					
				}
				else if(themeCd==0){
					themeCd="00";
					theme_nm="종합현황";
					$bizStatsMap.ui.doReqSggMap(themeCd, theme_nm, type);
					var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
					$bizStatsMap.ui.setTitle("시군구 생활업종 현황 > "+theme_nm, viewId);
					
					
				}
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 테마코드 대분류에 대한 새로운 분기문 추가 (pse) 
				else if($themeCdCommon.isBigThemeCd(themeCd)) {
					theme_nm = $themeCdCommon.findBigThemeName(themeCd);
					$bizStatsMap.ui.doReqSggMap(themeCd, theme_nm, type);
					var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
					$bizStatsMap.ui.setTitle("시군구 생활업종 현황 > "+theme_nm, viewId);
				}
				// 2020년 SGIS고도화 3차(테마코드) 끝
				else{
					$bizStatsMap.ui.doReqSidoCompany("", themeCd, "", idx);//지도에 범례함수 띄움 
					
				}
				//var viewId = parseInt($bizStatsMap.ui.curMapId)+1;
				//$bizStatsMap.ui.setTitle("시군구 생활업종 현황 > "+theme_nm, viewId);
				//$bizStatsDataBoardApi.request.sggBarChart(this.mapData[this.map_id].options);
			},
			
			/**
			 * 
			 * @name         : jobAreaThemeClick
			 * @description  :	업종별 지역현황 테마코드별 조회
			 * @date         : 2015. 11. 05. 
			 * @author	     : 김성현
			 * @param	: type (circleClick : 지도 서클 클릭 시,		 tabClick : 테마코드 탭 클릭 시) 
			 * @param	: themeCd, themeNm
			 * @history 	 :
			 */
			jobAreaThemeClick : function(type, themeCd, themeNm) {	
				
				if(!themeNm) themeNm = $("#jobArea_"+themeCd).html(); 
				
				$(".jobAreaTab li a").removeClass("on");
				$("#jobArea_"+themeCd).addClass("on");
				
				var themeNm = $("#jobArea_"+themeCd).html();
				
				var title = "시군구 생활업종 현황 > " + themeNm;
				$(".helperText").html(title);
				
				// 레프트메뉴 테마 체크박스 동기화
				$(".totalResult.tr01 input").each(function() {
					$(this).removeAttr("checked");
					if($(this).val() == themeCd) {
						$(this).attr("checked", "checked");
					}
				});
				
				// 명칭
				var options = this.mapData[this.map_id].options;
				$(".jobAreaTitle").html(themeNm+"/"+options.params.adm_nm+" <span>"+companyDataYear+"</span>");//박길섭 수정
				// mng_s 20210514 김건민 (사업체 년도 수정)
				$(".jobAreaTitle").html(options.params.adm_nm+" <span>" +companyDataYear+"</span>");//2019-04-17 박길섭
				// mng_e 20210514 김건민 
				$(".sggSpan").html(options.params.adm_nm.split(" ")[0]);
				$(".sggSpan02").html(options.params.adm_nm.split(" ")[1]);
				$(".jobAreaThemeNmSpan").html(themeNm);
				
				this.mapData[this.map_id].options.dataBoard.jobAreaThemeCd = themeCd;
				this.mapData[this.map_id].options.dataBoard.themeCd = themeCd;
				this.mapData[this.map_id].options.dataBoard.themeNm = themeNm;
				//this.mapData[this.map_id].options.params.category = "corp_cnt";
				// 파라미터
				var paramObj = {
						params : {
							adm_cd : options.params.adm_cd,
							adm_nm : options.params.adm_nm,
							theme_cd : themeCd,
							theme_nm : themeNm,
							map : options.params.map
						}
				}
				//지도 서클 클릭 시
				if(type == "circleClick" && themeCd.slice(2,4)!="00" && !$themeCdCommon.isBigThemeCd(themeCd)) { // 2020년 SGIS고도화 3차(테마코드) 새로운 대분류를 true로 받아들임. 이를 제외 시키는 코드 추가  (pse)
					srvLogWrite('G1', '04', '03', '00', '', '');
					$bizStatsMap.ui.doReqSidoCompany("", themeCd, themeNm, 0);//지도에 범례함수 띄움 
					$bizStatsDataBoardApi.request.sggBarChart(paramObj);//2019-04-16 박길섭
					//return;
					//시군구 생활업종정보 정보
					//$bizStatsDataBoardApi.request.jobAreaTotalInfo(paramObj);
					//시군구 생활업종정보 Bar차트 호출
					//$bizStatsDataBoardApi.request.jobAreaBarChart(paramObj);	
				}

				//데이터보드의 테마를 선택 시에 지도 재호출
				if(type == "tabClick" && themeCd.slice(2,4)!="00" && !$themeCdCommon.isBigThemeCd(themeCd)) { // 2020년 SGIS고도화 3차(테마코드) 새로운 대분류를 true로 받아들임. 이를 제외 시키는 코드 추가  (pse)
					$bizStatsMap.ui.doReqSidoCompany("", themeCd, themeNm, 0);//지도에 범례함수 띄움 
					$bizStatsDataBoardApi.request.sggBarChart(paramObj);//2019-04-16 박길섭
					//$bizStatsDataBoardApi.request.jobAreaTotalInfo(paramObj);
					//return;
					//$bizStatsMap.ui.doReqSidoCompany(options.params.adm_cd, themeCd, themeNm);
					//시군구 생활업종정보 정보
					//$bizStatsDataBoardApi.request.jobAreaTotalInfo(paramObj);
					//시군구 생활업종정보 Bar차트 호출
					//$bizStatsDataBoardApi.request.jobAreaBarChart(paramObj);
				}
				
				// 선택된 테마코드로 탭 활성화
				this.jobAreaTabClick(themeCd);
				//this.jobAreaTypeClick("corp_cnt",themeCd);
				
				setTimeout(function() {
					var tmpOptions = {
								url: "none",
								api_id : "none",
								themeCd : themeCd,
								themeNm : themeNm,
								dataBoard : {
									jobAreaThemeCd : options.dataBoard.jobAreaThemeCd
								},
								params : {
									adm_cd : options.params.adm_cd,
									adm_nm : options.params.adm_nm
								}
					}
					$bizStatsMapApi.request.setStatsData("", tmpOptions);
				},2000);
				
			},
			/**
			 * 
			 * @name         : updateLqMap
			 * @description  :	 데이터보드
			 * @date         : 2018. 09. 03. 
			 * @author	     : 박길섭
			 * @param	: options
			 * @history 	 :
			 */
			updateLqMap : function(options) {
				$(".dataBoardDiv").hide();
				$("#lqMapDiv").show();
				$bizStatsDataBoard.ui.changePensionAndMinbakUI('10');		// 2020년 SGIS고도화 3차(테마코드) - 민박과 펜션를 10차 산업에 맞게 UI를 조금 바꾸는 메서드 호출 (pse);
				//조회시 기존에 선택된 테마코드가 있으면 다시 선택해준다
				//테마코드 초기화
				$(".areaNameBox").html("전국"+" "+"<span style='font-size:13px;'>" +($bizStatsMap.ui.lqMap.year).replace("9016","2016")+"</span>");// 2019-04-14 djlee 수정
				$(".areaNameBox").css("font-size","22px");
				if(options.etc.themeCd != undefined) {
					$(".totalResult.tr01 input").each(function() {
						$(this).removeAttr("checked");
						if($(this).val() == options.etc.themeCd) {
							$(this).attr("checked", "checked");
						}
					});
				}
				
				//default
				var themeCd = "";
				var themeNm = "";
				var jobChangeTab = "";
				var categoryChangeTab = ""; 		// 2020년 SGIS고도화 3차(테마코드) - 기존코드에 변수 추가가 안되어 있어서 추가 (pse)
				//Left메뉴에서 선택되어 있는 조회조건 찾기
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 하드 코딩 주석 처리 (pse)
				/*
				$("input[name='rd_service']").each(function() {		//서비스
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						categoryChangeTab = "categoryChangeTab03";
					}
				});
				$("input[name='rd_retail']").each(function() {		//도소매
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						categoryChangeTab = "categoryChangeTab02";
					}
				});
				$("input[name='rd_hotel']").each(function() {		//숙박업
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						categoryChangeTab = "categoryChangeTab04";
					}
				});
				$("input[name='rd_food']").each(function() {		//음식점
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						categoryChangeTab = "categoryChangeTab01";
					}
				});
				*/
				// 2020년 SGIS고도화 3차(테마코드) 끝 (pse)
				
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 하드코딩 해소 (pse)
				var checkedInput = $("input[type='checkbox'][name^='rd_theme_'][checked='checked']");
			    var bigThemeCd = "";
				themeCd = checkedInput.val();
			    themeNm = checkedInput.next().text();
			    /*if(!$themeCdCommon.isBigThemeCd) {	// 대분류 테마코드가 아니면 대분류 테마코드를 찾아낸다.
			    	bigThemeCd = $themeCdCommon.findSmallThemeDetail(themeCd).b_theme_cd;
			    }*/
			    // 2020년 SGIS고도화 3차(테마코드) 끝 (pse)
				
				//전체 탭 숨기고 선택한 탭만 열기
				//$(".categoryChangeTab").hide();		// 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리, categoryChangeTabClick에서 같은 코드가 있음 (pse)
				//$("#"+categoryChangeTab).show();		// 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리, categoryChangeTabClick에서 같은 코드가 있음  (pse)
				//$("#jobChangeTab50").show();
				//최신년도 설정
				/*$(".ysettingList a").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						$(this).removeClass("on");
					}
				})*/
				//$(".ysettingList>li:last").find("input").attr("checked", "checked");
				//$(".ysettingList a:last").addClass("on");
				
				//업종입지계수 변화 테마코드 탭 선택
				
				var from= options.etc.from;
				this.categoryChangeTabClick(themeCd);
				this.categoryDetailTabClick(themeCd, themeNm,from);
				$bizStatsMap.ui.setTitle("업종별 입지계수 지도 > "+themeNm, this.map.id+1);
			},
			
			changeIntroChartType : function(idx){
				$("#introChartType a").removeClass("on");
				$("#introChartType a:eq("+(idx-1)+")").addClass("on");
				
				this.changeIntroChartContent(1);
			},
			
			/**
			 * @name         : jobChangeTabClick
			 * @description  : 업종밀집도 탭 클릭시 호출
			 * @date         : 2016. 06. 22.
			 * @author	     : 김성현
			 * @param :	 bigThemeCd (대분류 테마코드)		// 2020년 SGIS고도화 3차(테마코드), 파라미터 정보 변경 (pse)
			 */
			jobChangeTabClick : function(bigThemeCd) {	// 2020년 SGIS고도화 3차(테마코드) - 파라미터명 수정, themeCd ==> bigThemeCd (pse)
				//탭 초기화 후 선택
				$(".bizCateMenu a").removeClass("on");
				$(".bizCateMenu a#jobChangeType_"+bigThemeCd).addClass("on");	// 2020년 SGIS고도화 3차(테마코드) - jobChangeType ==> jobChangeType_ 로 수정 + themeCd ==> bigThemeCd 로 수정 (pse)
				//$(".bizCateMenu a#jobChangeType"+themeCd).addClass("on");		// 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리
				// mng_s 20190423 김건민
				//$bizStatsDataBoard.ui.theme_nm = $(".bizCateMenu a#jobChangeType"+themeCd)[0].text;	// 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리
				$bizStatsDataBoard.ui.theme_nm = $(".bizCateMenu a#jobChangeType_"+bigThemeCd)[0].text;	// 2020년 SGIS고도화 3차(테마코드) - jobChangeType ==> jobChangeType_ 로 수정 + themeCd ==> bigThemeCd 로 수정  (pse)
				// mng_g 20190423 김건민
				//업종별 탭 show/hide
				$(".jobChangeTab").hide();
				//$("#jobChangeTab"+themeCd).show(); // 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리
				$("#jobChangeTab_"+bigThemeCd).show();// 2020년 SGIS고도화 3차(테마코드) - themeCd ==> bigThemeCd 로 수정 + jobChangeTab ==> jobChangeTab_ 로 수정(pse) 
			},
			
			/**
			 * 
			 * @name         : updateJobChange
			 * @description  :	업종밀집도 변화 데이터보드
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			updateJobChange : function(options) {
				$(".dataBoardDiv").hide();
				$("#jobChangeDiv").show();
				
				$bizStatsDataBoard.ui.changePensionAndMinbakUI('10');		// 2020년 SGIS고도화 3차(테마코드) - 민박과 펜션를 10차 산업에 맞게 UI를 조금 바꾸는 메서드 호출 (pse)
				//조회시 기존에 선택된 테마코드가 있으면 다시 선택해준다
				if(options.etc.themeCd != undefined) {
					$(".totalResult.tr01 input").each(function() {
						$(this).removeAttr("checked");
						if($(this).val() == options.etc.themeCd) {
							$(this).attr("checked", "checked");
						}
					});
				}
				
				//default
				var themeCd = "";
				var themeNm = "";
				var jobChangeTab = "";
				
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 하드코딩 주석처리 (pse)
				/*
				//Left메뉴에서 선택되어 있는 조회조건 찾기
				$("input[name='rd_service']").each(function() {		//서비스
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobChangeTab = "jobChangeTab03";
					}
				});
				$("input[name='rd_retail']").each(function() {		//도소매
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobChangeTab = "jobChangeTab02";
					}
				});
				$("input[name='rd_hotel']").each(function() {		//숙박업
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobChangeTab = "jobChangeTab04";
					}
				});
				$("input[name='rd_food']").each(function() {		//음식점
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobChangeTab = "jobChangeTab01";
					}
				});
				*/
				// 2020년 SGIS고도화 3차(테마코드) 끝 - 기존 하드코딩 주석처리 (pse)

				// 2020년 SGIS고도화 3차(테마코드) 시작 - 하드코딩 해소 (pse);
				var checkedInput = $("input[type='checkbox'][name^='rd_theme_'][checked='checked']");
			    var bigThemeCd = "";
				themeCd = checkedInput.val();
			    themeNm = checkedInput.next().text();
			    bigThemeCd = $themeCdCommon.findSmallThemeDetail(themeCd).b_theme_cd;
			    jobChangeTab = "jobChangeTab_"+bigThemeCd;
			    // 2020년 SGIS고도화 3차(테마코드) 끝 (pse);
			    
				//전체 탭 숨기고 선택한 탭만 열기
				$(".jobChangeTab").hide();
				$("#"+jobChangeTab).show();
				
				//최신년도 설정
				/*$(".ysettingList a").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						$(this).removeClass("on");
					}
				})*/
				//$(".ysettingList>li:last").find("input").attr("checked", "checked");
				//$(".ysettingList a:last").addClass("on");
				
				//업종밀집도 변화 테마코드 탭 선택
				//this.jobChangeTabClick(themeCd.substring(0,2)); // 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리
				this.jobChangeTabClick(bigThemeCd);	// 2020년 SGIS고도화 3차(테마코드) - themeCd.substring(0,2) ==> bigThemeCd 로 인자값 변경 (pse)
				this.jobChangeThemeClick(themeCd, themeNm);
				$bizStatsMap.ui.setTitle("업종밀집도 변화 > "+themeNm, this.map.id+1);

				
			},
			/**
			 * 
			 * @name         : categoryDetailTabClick
			 * @description  :	업종별 입지계수 지도 카테고리 별 테마코드 탭 선택 시
			 * @date         : 2018. 09. 06. 
			 * @author	     : 박길섭
			 * @param	: themeCd, themeNm
			 * @history 	 :
			 */
			categoryDetailTabClick : function(themeCd,themeNm,from){
				//var type=this.mapData[this.map_id].options.params.type;
				var type=$bizStatsMap.ui.lqMap.type;
				$(".categoryChangeTab li a").removeClass("on");
				$("#categoryDetail_"+themeCd).addClass("on");
				this.mapData[this.map_id].options.params.theme_cd = themeCd;//테마코드
				this.mapData[this.map_id].options.params.theme_nm = themeNm;//테마코드명
				var options = this.mapData[this.map_id].options;
				
				options.params.year=$bizStatsMap.ui.lqMap.year;//년도 설정
				$bizStatsMap.ui.lqMap.theme_cd=themeCd;
				$bizStatsMap.ui.lqMap.theme_nm=themeNm;
				
				if($bizStatsMap.ui.lqMap.lqLayerInfo=="sgg"){
					
					$bizStatsMap.ui.deDoGetSggLq($bizStatsMap.ui.lqMap.adm_cd,$bizStatsMap.ui.lqMap.adm_nm,themeCd,type,0,themeNm,$bizStatsMap.ui.lqMap.region);
					$bizStatsDataBoardApi.request.sggLqOfLqMap($bizStatsMap.ui.lqMap.adm_cd,themeNm,themeCd,$bizStatsMap.ui.lqMap.type,$bizStatsMap.ui.lqMap.region,$bizStatsMap.ui.lqMap.year);
				}
				else{
					$bizStatsDataBoardApi.request.sidoLqOfLqMap(options);
				if(from!="leftmenu"){
					$bizStatsMap.ui.doLqMap(themeCd, themeNm,type);
				}
				}
				$(".lqMapFeatureChartArea").show();
				$bizStatsMap.ui.setTitle("업종별 입지계수 지도 > "+themeNm, this.map.id+1);
			},
			/**
			 * 
			 * @name         : jobChangeThemeClick
			 * @description  :	업종밀집도 변화 테마코드 탭 선택 시
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @param	: themeCd, themeNm
			 * @history 	 :
			 */
			//2019-04-13 djlee 수정 시작
			jobChangeThemeClick : function(themeCd, themeNm, callback) {
				
				// mng_s 20190401 김건민
				//var srvLogChangeNm = $bizStatsDataBoard.ui.theme_nm;
				
				//탭 선택된 상태로 만들기
				$(".jobChangeTab li a").removeClass("on");
				$("#jobChange_"+themeCd).addClass("on");

				var themeNm = $("#jobChange_"+themeCd).html();
				
				//srvLogWrite('G1', '03', '04', '08', '', srvLogChangeNm + "/" + themeNm);
				
				// mng_e 20190401 김건민
				
				var title = "업종밀집도 변화 > " + themeNm;
				$(".helperText").html(title);
				
				var options = this.mapData[this.map_id].options;
				var year = companyDataYear;
				
				
				$(".ysettingList a").each(function() {
					if ($(this).hasClass("on")) {
						// mng_s 20210514 김건민
						if($(this).data("year") != '2021'){
							year = $(this).data("year");
						}
						// mng_e 20210514 김건민
						//alert("[bizStatsDataBoard.js] $(this).html() [" + $(this).html());
						
						// 우측 데이터 보드의 ==> 한식/전국 2014 와 같이 [지표/시도시군구 년도] 형태로 나오는데
						// 이 부분에서 년도가 companyDataYear보다 크면 companyDataYear로 세팅한다.
						// .ysettingList 는 데이터 보드의 맨 아래 동그라미 안의 년도이다.
						// 2019-04-13 센서스 10차의 2016년이 9018로 변경 되면서 해당 부분 주석
//						if(year > companyDataYear) {
//							console.log(companyDataYear);
//							year = companyDataYear;
//							$("#div_y"+year).addClass("on");
//						}
						
					}
				});
				
				//파라미터
				var paramObj = {
						params : {
							adm_cd : options.params.adm_cd,
							adm_nm : options.params.adm_nm,
							year : year,
							theme_cd : themeCd,
							theme_nm : themeNm,
							map : options.params.map
						}
				};
				
				
				//열지도 조회
				options.etc.themeCd = deepCopy(themeCd);
				options.etc.curPolygonCode = deepCopy(options.params.map.curPolygonCode);
				options.etc.year = deepCopy(options.params.year);;
				options.dataBoard.themeCd = themeCd;
				options.dataBoard.themeNm = themeNm;
				options.etc.themeCd = themeCd;
				options.params.year = year;
  				$bizStatsMap.ui.doReqCompanyDensity (themeCd, themeNm, year, options.params);
				
  				
  				//타이틀
				$(".jobChangeTitle").html(themeNm+"/"+options.params.adm_nm+" <span>"+(options.params.year+"").replace("9016","2016")+"</span>");
  				
				//시계열별 데이터 Bar차트 호출
				$bizStatsDataBoardApi.request.jobChangeBarChart(paramObj);
				
				if (callback != null && callback instanceof Function) {
					callback.call(undefined, null);
				}
				
				setTimeout(function() {
					$bizStatsMapApi.request.setStatsData("", paramObj);
				},2000);
				
			},
			//20190413 djlee 수정 끝
			
			//======================================== start of 지자체 ==============================================
			/**
			 * @name         : jobOpenTabClick
			 * @description  : 왼쪽 메뉴에서 처음으로 메뉴 클릭해서 오른쪽 데이터 보드의 탭 하일라이트 하는 부분을 처리함.
			 * @date         : 2017. 05. 10.
			 * @author	     : 
			 * @param :	 idx	() 
			 */
			jobOpenTabClick : function(themeCd) {
				
				var tab_open_cd = "";
				
				if(    themeCd == "41_36_01_P" 
					|| themeCd == "21_06_01_P" 
					|| themeCd == "23_11_01_P" 
					|| themeCd == "23_12_01_P" 
					|| themeCd == "22_09_01_P" 
					|| themeCd == "22_14_01_P" 
					|| themeCd == "23_06_01_P" 
					
				  ) {
						tab_open_cd = "10";
					}
					
					
				if(    themeCd == "16_19_01_P" 
					|| themeCd == "41_43_01_P" 
					|| themeCd == "41_13_01_P" 
					|| themeCd == "41_16_01_P" 
					|| themeCd == "41_17_01_P" 
					|| themeCd == "41_14_01_P" 
					|| themeCd == "41_15_01_P" 
					
				  ) {
						tab_open_cd = "20";
					}
					
					
				if(    themeCd == "24_68_01_P" 
					|| themeCd == "24_70_01_P" 
					|| themeCd == "24_71_01_P" 
					|| themeCd == "24_32_01_P" 
					|| themeCd == "24_76_01_P" 
					|| themeCd == "24_30_01_P" 
					|| themeCd == "24_03_01_P" 
					|| themeCd == "24_15_01_P" 
					|| themeCd == "24_20_01_P" 
					|| themeCd == "24_14_01_P" 
					|| themeCd == "24_05_01_P" 
					|| themeCd == "24_06_01_P" 
					|| themeCd == "24_16_01_P" 
					|| themeCd == "24_18_01_P" 
					|| themeCd == "24_04_01_P" 
					|| themeCd == "24_45_01_P" 
					|| themeCd == "24_07_01_P" 
					|| themeCd == "24_02_01_P" 
					|| themeCd == "24_19_01_P" 
					|| themeCd == "24_12_01_P" 
					|| themeCd == "24_43_01_P" 
					|| themeCd == "24_01_01_P" 
					|| themeCd == "24_48_01_P" 
					|| themeCd == "24_81_01_P" 
					|| themeCd == "24_44_01_P" 
					|| themeCd == "24_42_01_P" 
				  ) {
						tab_open_cd = "30";
					}
					
					
				if(    themeCd == "41_19_01_P" 
					|| themeCd == "41_22_01_P" 
					|| themeCd == "41_21_01_P" 
					|| themeCd == "41_20_01_P" 
					|| themeCd == "41_40_01_P" 
					|| themeCd == "41_42_01_P" 
					|| themeCd == "41_41_01_P" 
					|| themeCd == "41_24_01_P"
					
					|| themeCd == "41_40_02_P"
					|| themeCd == "41_40_03_P"
					|| themeCd == "41_40_04_P"
					|| themeCd == "41_40_05_P"
					|| themeCd == "41_40_06_P"
					|| themeCd == "41_41_05_P"
					|| themeCd == "41_40_08_P"
					|| themeCd == "41_40_09_P"
					|| themeCd == "41_41_02_P"
					|| themeCd == "41_41_03_P"
					|| themeCd == "41_41_04_P"
					|| themeCd == "41_40_07_P"
					
				  ) {
						tab_open_cd = "40";
					}
					
					
				if(    themeCd == "42_03_01_P" 
					|| themeCd == "42_08_07_P" 
					|| themeCd == "42_08_06_P" 
					|| themeCd == "42_08_05_P" 
					|| themeCd == "42_08_03_P" 
					|| themeCd == "42_08_04_P" 
					|| themeCd == "42_08_02_P" 
					
				  ) {
						tab_open_cd = "50";
					}
				
				
				//탭 초기화 후 선택
				$(".bizCateMenu a").removeClass("on");
				$(".bizCateMenu a#jobOpenType"+tab_open_cd).addClass("on");
				//업종별 탭 show/hide
				$(".jobOpenTab").hide();
				$("#jobOpenTab"+tab_open_cd).show();
			},
			
			//======================================== start of 뜨는 지역 ==============================================
			/**
			 * @name         : jobBestTabClick
			 * @description  : 왼쪽 메뉴에서 처음으로 메뉴 클릭해서 오른쪽 데이터 보드의 탭 하일라이트 하는 부분을 처리함.
			 * @date         : 2017. 095. 18.
			 * @author	     : 
			 * @param :	 idx	() 
			 */
			jobBestTabClick : function(themeCd) {
				
				var tab_open_cd = "";
				
				if(    themeCd == "41_36_01_P" 
					|| themeCd == "21_06_01_P" 
					|| themeCd == "23_11_01_P" 
					|| themeCd == "23_12_01_P" 
					|| themeCd == "22_09_01_P" 
					|| themeCd == "22_14_01_P" 
					|| themeCd == "23_06_01_P" 
					
				  ) {
						tab_open_cd = "10";
					}
					
					
				if(    themeCd == "16_19_01_P" 
					|| themeCd == "41_43_01_P" 
					|| themeCd == "41_13_01_P" 
					|| themeCd == "41_16_01_P" 
					|| themeCd == "41_17_01_P" 
					|| themeCd == "41_14_01_P" 
					|| themeCd == "41_15_01_P" 
					
				  ) {
						tab_open_cd = "20";
					}
					
					
				if(    themeCd == "24_68_01_P" 
					|| themeCd == "24_70_01_P" 
					|| themeCd == "24_71_01_P" 
					|| themeCd == "24_32_01_P" 
					|| themeCd == "24_76_01_P" 
					|| themeCd == "24_30_01_P" 
					|| themeCd == "24_03_01_P" 
					|| themeCd == "24_15_01_P" 
					|| themeCd == "24_20_01_P" 
					|| themeCd == "24_14_01_P" 
					|| themeCd == "24_05_01_P" 
					|| themeCd == "24_06_01_P" 
					|| themeCd == "24_16_01_P" 
					|| themeCd == "24_18_01_P" 
					|| themeCd == "24_04_01_P" 
					|| themeCd == "24_45_01_P" 
					|| themeCd == "24_07_01_P" 
					|| themeCd == "24_02_01_P" 
					|| themeCd == "24_19_01_P" 
					|| themeCd == "24_12_01_P" 
					|| themeCd == "24_43_01_P" 
					|| themeCd == "24_01_01_P" 
					|| themeCd == "24_48_01_P" 
					|| themeCd == "24_81_01_P" 
					|| themeCd == "24_44_01_P" 
					|| themeCd == "24_42_01_P" 
				  ) {
						tab_open_cd = "30";
					}
					
					
				if(    themeCd == "41_19_01_P" 
					|| themeCd == "41_22_01_P" 
					|| themeCd == "41_21_01_P" 
					|| themeCd == "41_20_01_P" 
					|| themeCd == "41_40_01_P" 
					|| themeCd == "41_42_01_P" 
					|| themeCd == "41_41_01_P" 
					|| themeCd == "41_24_01_P"
					
					|| themeCd == "41_40_02_P"
					|| themeCd == "41_40_03_P"
					|| themeCd == "41_40_04_P"
					|| themeCd == "41_40_05_P"
					|| themeCd == "41_40_06_P"
					|| themeCd == "41_41_05_P"
					|| themeCd == "41_40_08_P"
					|| themeCd == "41_40_09_P"
					|| themeCd == "41_41_02_P"
					|| themeCd == "41_41_03_P"
					|| themeCd == "41_41_04_P"
					|| themeCd == "41_40_07_P"
					
				  ) {
						tab_open_cd = "40";
					}
					
					
				if(    themeCd == "42_03_01_P" 
					|| themeCd == "42_08_07_P" 
					|| themeCd == "42_08_06_P" 
					|| themeCd == "42_08_05_P" 
					|| themeCd == "42_08_03_P" 
					|| themeCd == "42_08_04_P" 
					|| themeCd == "42_08_02_P" 
					
				  ) {
						tab_open_cd = "50";
					}
				
				
				//탭 초기화 후 선택
				$(".bizCateMenu a").removeClass("on");
				$(".bizCateMenu a#jobBestType"+tab_open_cd).addClass("on");
				//업종별 탭 show/hide
				$(".jobBestTab").hide();
				$("#jobBestTab"+tab_open_cd).show();
			},
			
			
			
			/**
			 * @name         : jobOpenTabClick2
			 * @description  : 데이터 보드의 탭 클릭시 호출
			 * @date         : 2017. 05. 10.
			 * @author	     : 
			 * @param :	 idx	() 
			 */
			jobOpenTabClick2 : function(tabCd) {
				
				//탭 초기화 후 선택
				$(".bizCateMenu a").removeClass("on");
				$(".bizCateMenu a#jobOpenType"+tabCd).addClass("on");
				//업종별 탭 show/hide
				$(".jobOpenTab").hide();
				$("#jobOpenTab"+tabCd).show();
			},
			
			/**
			 * @name         : jobBestTabClick2
			 * @description  : 업종별 뜨는 지역 데이터 보드의 탭 클릭시 호출
			 * @date         : 2017. 09. 20.
			 * @author	     : 
			 * @param :	 idx	() 
			 */
			//mng_s
			jobBestTabClick2 : function(tabCd) {
				
				//탭 초기화 후 선택
				$(".bizCateMenu a").removeClass("on");
				$(".bizCateMenu a#jobBestType"+tabCd).addClass("on");
				//업종별 탭 show/hide
				$(".jobBestTab").hide();
				$("#jobBestTab"+tabCd).show();
			},
			
			/**
			 * 
			 * @name         : updateJobOpen
			 * @description  : 지자체 인허가 업종별 개업현황 데이터보드
			 * @date         : 2017. 5. 10. 
			 * @author	     : 
			 * @param	: options
			 * @history 	 :
			 */
			updateJobOpen : function(options) {
				$(".dataBoardDiv").hide();
				$("#jobOpenDiv").show();
				
				//조회시 기존에 선택된 테마코드가 있으면 다시 선택해준다
				if(options.etc.themeCd != undefined) {
					$(".totalResult.tr08 input").each(function() {
						$(this).removeAttr("checked");
						if($(this).val() == options.etc.themeCd) {
							$(this).attr("checked", "checked");
						}
					});
				}
				
				//default
				var themeCd = "";
				var themeNm = "";
				var jobOpenTab = "";
				
				//Left메뉴에서 선택되어 있는 조회조건 찾기
				//bizStatsLeftMenu.jap에서 jj_ 이름을 맞추어 주어야 한다.
				$("input[name='jj_culture']").each(function() {		//문화체육
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobOpenTab = "jobOpenTab01";
					}
				});
				$("input[name='jj_tour']").each(function() {		//관광
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobOpenTab = "jobOpenTab02";
					}
				});
				$("input[name='jj_food']").each(function() {		//식품
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobOpenTab = "jobOpenTab03";
					}
				});
				$("input[name='jj_service']").each(function() {		//소상공인
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobOpenTab = "jobOpenTab04";
					}
				});
				$("input[name='jj_sanup']").each(function() {		//산업고용
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobOpenTab = "jobOpenTab05";
					}
				});
				
				//전체 탭 숨기고 선택한 탭만 열기
				$(".jobOpenTab").hide();
				$("#"+jobOpenTab).show();
				
				//최신년도 설정
				/*$(".ysettingList a").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						$(this).removeClass("on");
					}
				})*/
				//$(".ysettingList>li:last").find("input").attr("checked", "checked");
				//$(".ysettingList a:last").addClass("on");
				
				//업종밀집도 변화 테마코드 탭 선택
				//this.jobOpenTabClick(themeCd.substring(0,2)); // 이 부분은 코드 매핑 체계가 틀려서 앞 두자리를 잘라서 탭을 하일라이트 하는것은 어렵고 코드 자체로 매핑해야 될 듯 하다.
				this.jobOpenTabClick(themeCd); // 이 부분은 코드 매핑 체계가 틀려서 앞 두자리를 잘라서 탭을 하일라이트 하는것은 어렵고 코드 자체로 매핑해야 될 듯 하다.
				
				this.jobOpenThemeClick(themeCd, themeNm);
				$bizStatsMap.ui.setTitle("업종별 개업 현황 > "+themeNm, this.map.id+1);

				
			},
			
			/**
			 * 
			 * @name         : jobOpenThemeClick
			 * @description  : 업종별 개업 현황 탭 선택 시, 좌측 메뉴에서 들어갈 때도 이 함수가 호출됨.
			 * @date         : 2017. 5. 10. 
			 * @author	     : 김준하
			 * @param	: themeCd, themeNm
			 * @history 	 :
			 */
			//djlee 2019-04-13 수정 시작
			jobOpenThemeClick : function(themeCd, themeNm, callback) {
				// mng_s 20190403 김건민
				//srvLogWrite('G1', '03', '07', '02', '', themeNm);
				// mng_e 20190403 김건민
				//탭 선택된 상태로 만들기
				$(".jobOpenTab li a").removeClass("on");
				$("#jobOpen_"+themeCd).addClass("on");

				var themeNm = $("#jobOpen_"+themeCd).html();
				
				var title = "업종별 개업 현황 > " + themeNm;
				$(".helperText").html(title);
				
				var options = this.mapData[this.map_id].options;
				
				var year = parseInt(companyDataYear,10) + 1; //companyDataYear는 common.js에 세팅하는데, 지자체는 companyDataYear + 1 이다.
				/*
				var year = '2015'; //지자체 새로 만들면서 2015로 일단 세팅함.
				if( year < '2015' ) {
					year = '2015';
				}
				*/
				
				//alert("[bizStatsDataBoard.js] options.params.year [" + options.params.year);
				//alert("[bizStatsDataBoard.js] this.map_id [" + this.map_id);
				
				
				$(".ysettingList a").each(function() {
					if ($(this).hasClass("on")) {
						
						//alert("[bizStatsDbataBoard.js] $(this).hasClass(\"on\") [" + $(this).hasClass("on"));
						
						year = $(this).data("year");
						
						// 우측 데이터 보드의 ==> 한식/전국 2015 와 같이 [지표/시도시군구 년도] 형태로 나오는데
						// 이 부분에서 년도가 companyDataYear+1보다 작으면 companyDataYear+1로 세팅한다.
						if(year < (parseInt(companyDataYear,10)+1)) {
							year = parseInt(companyDataYear,10)+2;
							$("#div_y"+year).addClass("on");
						}
						
					}
				});
				
				//alert("[bizStatsDataBoard.js] year [" + year);
				
				//파라미터
				var paramObj = {
						params : {
							adm_cd : options.params.adm_cd,
							adm_nm : options.params.adm_nm,
							year : year,
							theme_cd : themeCd,
							theme_nm : themeNm,
							map : options.params.map
						}
				};
				
				
				
				//열지도 조회
				options.etc.themeCd = deepCopy(themeCd);
				options.etc.curPolygonCode = deepCopy(options.params.map.curPolygonCode);
				options.etc.year = deepCopy(options.params.year);;
				options.dataBoard.themeCd = themeCd;
				options.dataBoard.themeNm = themeNm;
				options.etc.themeCd = themeCd;
				options.params.year = year;
				
				//타이틀
				$(".jobOpenTitle").html(themeNm+"/"+options.params.adm_nm+" <span>"+options.params.year+"</span>");
  				
				$bizStatsMap.ui.doReqCompanyOpen (themeCd, themeNm, year, options.params);
				
				//시계열별 데이터 Bar차트 호출
				$bizStatsDataBoardApi.request.jobOpenBarChart(paramObj);
				
				if (callback != null && callback instanceof Function) {
					callback.call(undefined, null);
				}
				
				setTimeout(function() {
					$bizStatsMapApi.request.setStatsData("", paramObj);
				},2000);
				
			},
			//======================================== end of 지자체 ==============================================
			
			//======================================== start of 업종별 뜨는 지역 ==============================================
			/**
			 * 
			 * @name         : updateJobBest
			 * @description  : 업종별 뜨는 지역 데이터보드
			 * @date         : 2017. 9. 18. 
			 * @author	     : 
			 * @param	: options
			 * @history 	 :
			 */
			updateJobBest : function(options) {
				$(".dataBoardDiv").hide();
				$("#jobBestDiv").show();
				
				//조회시 기존에 선택된 테마코드가 있으면 다시 선택해준다
				if(options.etc.themeCd != undefined) {
					$(".totalResult.tr10 input").each(function() {
						$(this).removeAttr("checked");
						if($(this).val() == options.etc.themeCd) {
							$(this).attr("checked", "checked");
						}
					});
				}
				
				//default
				var themeCd = "";
				var themeNm = "";
				var jobBestTab = "";
				
				//Left메뉴에서 선택되어 있는 조회조건 찾기
				//bizStatsLeftMenu.jap에서 jj_ 이름을 맞추어 주어야 한다.
				$("input[name='jj_culture']").each(function() {		//문화체육
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobBestTab = "jobBestTab01";
					}
				});
				$("input[name='jj_tour']").each(function() {		//관광
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobBestTab = "jobBestTab02";
					}
				});
				$("input[name='jj_food']").each(function() {		//식품
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobBestTab = "jobBestTab03";
					}
				});
				$("input[name='jj_service']").each(function() {		//소상공인
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobBestTab = "jobBestTab04";
					}
				});
				$("input[name='jj_sanup']").each(function() {		//산업고용
					if($(this).attr("checked") == "checked") {
						themeCd = $(this).val();
						themeNm = $(this).next().text();
						jobBestTab = "jobBestTab05";
					}
				});
				
				//전체 탭 숨기고 선택한 탭만 열기
				$(".jobBestTab").hide();
				$("#"+jobBestTab).show();
				
				//최신년도 설정
				/*$(".ysettingList a").each(function() {
					var on = $(this).hasClass("on");
					if (on) {
						$(this).removeClass("on");
					}
				})*/
				//$(".ysettingList>li:last").find("input").attr("checked", "checked");
				//$(".ysettingList a:last").addClass("on");
				
				//업종밀집도 변화 테마코드 탭 선택
				//this.jobOpenTabClick(themeCd.substring(0,2)); // 이 부분은 코드 매핑 체계가 틀려서 앞 두자리를 잘라서 탭을 하일라이트 하는것은 어렵고 코드 자체로 매핑해야 될 듯 하다.
				this.jobBestTabClick(themeCd); // 이 부분은 코드 매핑 체계가 틀려서 앞 두자리를 잘라서 탭을 하일라이트 하는것은 어렵고 코드 자체로 매핑해야 될 듯 하다.
				
				this.jobBestThemeClick(themeCd, themeNm);
				$bizStatsMap.ui.setTitle("업종별 뜨는 지역 > "+themeNm, this.map.id+1);

				
			},
			
			/**
			 * 
			 * @name         : jobBestThemeClick
			 * @description  : 업종별 뜨는 지역 탭 선택 시, 좌측 메뉴에서 들어갈 때도 이 함수가 호출됨.
			 * @date         : 2017. 9. 18. 
			 * @author	     : 김준하
			 * @param	: themeCd, themeNm
			 * @history 	 :
			 */
			// djlee 2019-04-13 수정 시작
			jobBestThemeClick : function(themeCd, themeNm, callback) {
				//탭 선택된 상태로 만들기
				$(".jobBestTab li a").removeClass("on");
				$("#jobBest_"+themeCd).addClass("on");

				var themeNm = $("#jobBest_"+themeCd).html();
				
				var title = "업종별 뜨는 지역 > " + themeNm;
				$(".helperText").html(title);
				
				var options = this.mapData[this.map_id].options;
				
				var year = parseInt(companyDataYear,10) + 1; //companyDataYear는 common.js에 세팅하는데, 지자체는 companyDataYear + 1 이다.
				/*
				var year = '2015'; //지자체 새로 만들면서 2015로 일단 세팅함.
				if( year < '2015' ) {
					year = '2015';
				}
				*/
				
				//alert("[bizStatsDataBoard.js] options.params.year [" + options.params.year);
				//alert("[bizStatsDataBoard.js] this.map_id [" + this.map_id);
				
				
				$(".ysettingList a").each(function() {
					if ($(this).hasClass("on")) {
						
						//alert("[bizStatsDbataBoard.js] $(this).hasClass(\"on\") [" + $(this).hasClass("on"));
						
						year = $(this).data("year");
						
						// 우측 데이터 보드의 ==> 한식/전국 2015 와 같이 [지표/시도시군구 년도] 형태로 나오는데
						// 이 부분에서 년도가 companyDataYear+1보다 작으면 companyDataYear+1로 세팅한다.
						// mng_s 20200710 김건민
						if(year < (parseInt(companyDataYear,10)+1)) {
							year = parseInt(companyDataYear,10)+2;
							$("#div_y"+year).addClass("on");
						}
						// mng_e 20200710 김건민
					}
				});
				
				//alert("[bizStatsDataBoard.js] year [" + year);
				
				//파라미터
				var paramObj = {
						params : {
							adm_cd : options.params.adm_cd,
							adm_nm : options.params.adm_nm,
							year : year,
							theme_cd : themeCd,
							theme_nm : themeNm,
							map : options.params.map,
							param_sido_cd : options.params.param_sido_cd,
							param_sgg_cd : options.params.param_sgg_cd,
							param_job_best_from : options.params.param_job_best_from,
							param_job_best_to : options.params.param_job_best_to
						}
				};
				
				
				
				//열지도 조회
				/*
				options.etc.themeCd = deepCopy(themeCd);
				options.etc.curPolygonCode = deepCopy(options.params.map.curPolygonCode);
				options.etc.year = deepCopy(options.params.year);;
				options.dataBoard.themeCd = themeCd;
				options.dataBoard.themeNm = themeNm;
				options.etc.themeCd = themeCd;
				options.params.year = year;
				*/
				
				
				$bizStatsMap.ui.doReqCompanyBest (themeCd, themeNm, year, options.params);
				
				
				//타이틀
				$(".jobBestTitle").html(themeNm+" 뜨는 지역");
				//개업기간
				$(".areaEtcTextBox").html("개업기간 : " 
						+ options.params.param_job_best_from.substr(0,4)+ "년 " 
						+ options.params.param_job_best_from.substr(4,2)+ "월 " 
						+ options.params.param_job_best_from.substr(6,2)+ "일" 
						+ " ~ " 
						+ options.params.param_job_best_to.substr(0,4)+ "년 " 
						+ options.params.param_job_best_to.substr(4,2)+ "월 "
						+ options.params.param_job_best_to.substr(6,2)+ "일");
				
				$("#jb_interest_area").html("관심지역 : " +  $bizStatsLeftMenu.ui.jobBestSido + " " + $bizStatsLeftMenu.ui.jobBestSgg );
				//$bizStatsDataBoardApi.request.jobBestBarChart(paramObj);
				
				/*
				//시계열별 데이터 Bar차트 호출
				$bizStatsDataBoardApi.request.jobBestBarChart(paramObj);
				
				if (callback != null && callback instanceof Function) {
					callback.call(undefined, null);
				}
				
				setTimeout(function() {
					$bizStatsMapApi.request.setStatsData("", paramObj);
				},2000);
				*/
				
				
			},
			// djlee 2019-04-13 수정 끝
			//======================================== end of 업종별 뜨는 지역 ==============================================
			
			
			
			/**
			 * 
			 * @name         : updateAreaInfo
			 * @description  :	지역 종합정보 데이터보드
			 * @date         : 2015. 11. 11. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			updateAreaInfo : function(options) {
				$(".dataBoardDiv").hide();
				$("#areaInfoDiv").show();
				
				//후보지 검색결과 숨김 (지역검색에서 넘어올 경우만 보여진다.)
				$("#areaSearchMinimap01").hide();
				$("#areaSearchMinimap02").hide();
				
				//default 총사업체
				var areaInfoTab = "company";
				this.mapData[this.map_id].options.dataBoard.indecreaseThemeCd = "5001";		//사업체 증감 테마코드 (한식) 2017.04.05 수정
				this.mapData[this.map_id].options.dataBoard.indecreaseThemeNm = "한식";		//사업체 증감 테마명 (한식) 2017.04.05 수정
				this.mapData[this.map_id].options.dataBoard.priceRadio = "apt";		//주택 거래가격 (아파트)
				this.mapData[this.map_id].options.dataBoard.tradeRadio = "apt";		//주택 거래동향 (아파트)
				
				//지역 종합정보 탭 선택
				this.areaInfoTabClick(areaInfoTab);
				
				//지역 총사업체, 총인구, 총가구, 총주택 조회
				$bizStatsDataBoardApi.request.allCompanyPplHouse(options.params.adm_cd);
				
				//지역 특성정보 스파이더웹차트 호출
				$bizStatsDataBoardApi.request.areaInfoSpiderwebChart(options.params);
				$bizStatsMap.ui.setTitle("지역종합정보 > "+options.params.adm_nm, this.map.id+1);
			},
			
			/**
			 * 
			 * @name         : areaInfoTabClick
			 * @description  :	지역 종합정보 탭 선택 시
			 * @date         : 2015. 11. 11. 
			 * @author	     : 김성현
			 * @param	: type (company, population, household, house)
			 * @history 	 :
			 */
			areaInfoTabClick : function(type) {
				
				//탭 선택된 상태로 만들기
				$(".areaInfoTab li a").removeClass("on");
				$(".areaInfoTab_"+type).addClass("on");
				
				//명칭
				var options = this.mapData[this.map_id].options;
				if(options.params.x && options.params.y && options.params.zoomLevel){
					this.map.mapMove([options.params.x, options.params.y], options.params.zoomLevel);
				}
				$(".areaInfoTitle").html(options.params.adm_nm);
				
				//지역 종합현황정보 전체 숨김
				$(".areaInfoAllDiv").hide();
				$(".areaInfoDT").hide();
				
				// mng_s 20190401 김건민
				//총사업체일 경우
				if(type == "company") {
					$("#areaInfoCompanyDiv").prev().show();
					$("#areaInfoCompanyDiv").show();
					//업종별 비율
					$bizStatsDataBoardApi.request.areaInfoCompanyRate(options.params);
					//업종별 증감
					$bizStatsDataBoardApi.request.areaInfoCompanyIndecrease(options.params);
					//주요시설물 현황
					$bizStatsDataBoardApi.request.areaInfoMainFacility(options.params);
					
					$bizStatsDataBoard.ui.areaInfoChartTab("company",0);	// 2020년 SGIS고도화 3차(테마코드) - ex) 조건별 지역찾기로 조회를 하다보면 지역 종합현황정보 보기란이 화면에 표출된다. 그 이후에 후보지 정보 보기 메뉴를 클릭해서 조회하면 조건별 지역찾기에서 누른 탭이 그대로 남음. (pse)
				}
				
				//총인구
				else if(type == "population") {
					$("#areaInfoPopulationDiv").prev().show();
					$("#areaInfoPopulationDiv").show();
					//연령별 인구비율
					$bizStatsDataBoardApi.request.areaInfoPopulationAge(options.params);
					//성별 인구비율
					$bizStatsDataBoardApi.request.areaInfoPopulationGender(options.params);
				}
				
				//총가구
				else if(type == "household") {
					$("#areaInfoHouseholdDiv").prev().show();
					$("#areaInfoHouseholdDiv").show();
					//점유형태별 가구비율
					$bizStatsDataBoardApi.request.areaInfoHouseholdOccupy(options.params);
					//가구유형별 가구비율
					$bizStatsDataBoardApi.request.areaInfoHouseholdType(options.params);
				}
				
				//총주택
				else if(type == "house") {
					$("#areaInfoHouseDiv").prev().show();
					$("#areaInfoHouseDiv").show();
					//주택 거래가격
					$bizStatsDataBoardApi.request.areaInfoHousePrice(options.params);
					//주택 거래 동향
					$bizStatsDataBoardApi.request.areaInfoHouseTrade(options.params);
					//공시지가
					$bizStatsDataBoardApi.request.areaInfoHousePnilp(options.params);
				}
				// mng_e 20190401 김건민
				
				//통계조회
				options["year"] = $(".ysettingList").find("input:checked").val();
				options["reqType"] = type;
				if (this.map.geojson) {
					this.map.geojson.remove();
				}
				this.map.undoDropLayerBounds();
				$bizStatsMap.ui.requestOpenApi(options);
				
				
				//this.map.openApiReverseGeoCode(this.map.center);
				
			},
			
			/**
			 * 
			 * @name         : areaInfoChartTab
			 * @description  :	지역 종합현황정보 보기 탭 선택 시
			 * @date         : 2016. 06. 22. 
			 * @author	     : 김성현
			 * @param	: type (company, population, household, house)
			 * @param	: idx 차트순번
			 */
			areaInfoChartTab : function(type, idx) {
				$('.bizCateMenu').hide();
				$('.areaInfoChangeTab').hide();
				if(type == "company") {	//총사업체
					$("#areaInfoChartTabDiv01 .dbTabs").find("a").removeClass("on");
					$("#areaInfoChartTabDiv01 .dbTabs").find("a:eq("+idx+")").addClass("on");
					$(".areaInfoCompany").hide();
					// mng_s 20210514 김건민 (2019년으로 문구 수정)
					if(idx == 0) {
						//$(".origin_txt_2").empty();
						//$(".origin_txt_2").text("출처 : 통계청, 전국사업체조사 (2019)");
						$("#areaInfoCompanyChartTitle").html("소상공인 업종별 사업체 비율(%)");
						$("#areaInfoCompanyDiv01").show();
						$('.bizCateMenu').show();
						this.areaInfoCateClick(1);
					} else if(idx == 1) {
						$("#areaInfoCompanyChartTitle").html("소상공인 업종별 증감 (개)");	
						$("#areaInfoCompanyDiv02").show();
						$('.bizCateMenu').show();
						this.areaInfoCateClick(1);
					} else if(idx == 2) {
						//$(".origin_txt_2").empty();
						//$(".origin_txt_2").text("출처 : 통계청, 전국사업체조사 (2019)");
						$("#areaInfoCompanyChartTitle").html("주요시설물 현황 (개)");	
						$("#areaInfoCompanyDiv03").show();
					}
					// mng_e 20200219 김건민
					
				} else if(type == "population") {		//총인구
					$("#areaInfoChartTabDiv02 .dbTabs").find("a").removeClass("on");
					$("#areaInfoChartTabDiv02 .dbTabs").find("a:eq("+idx+")").addClass("on");
					if(idx == 0) {
						$("#areaInfoPopulationChartTitle").html("연령별 인구비율(%)");
						$("#areaInfoPopulationDiv01").show();
						$("#areaInfoPopulationDiv02").hide();
					} else if(idx == 1) {
						$("#areaInfoPopulationChartTitle").html("성별 인구비율");
						$("#areaInfoPopulationDiv01").hide();
						$("#areaInfoPopulationDiv02").show();
					}
					
				} else if(type == "household") {		//총가구
					$("#areaInfoChartTabDiv03 .dbTabs").find("a").removeClass("on");
					$("#areaInfoChartTabDiv03 .dbTabs").find("a:eq("+idx+")").addClass("on");
					if(idx == 0) {
						$("#areaInfoHouseholdChartTitle").html("점유형태별 가구비율(%)");
						$("#areaInfoHouseholdDiv01").show();
						$("#areaInfoHouseholdDiv02").hide();
					} else if(idx == 1) {
						$("#areaInfoHouseholdChartTitle").html("거처유형별 가구비율(%)");
						$("#areaInfoHouseholdDiv01").hide();
						$("#areaInfoHouseholdDiv02").show();
					}
					
				} else if(type == "house") {		//총주택
					$("#areaInfoChartTabDiv04 .dbTabs").find("a").removeClass("on");
					$("#areaInfoChartTabDiv04 .dbTabs").find("a:eq("+idx+")").addClass("on");
					if(idx == 0) {
						$("#areaInfoHouseChartTitle").html("㎡당 주택 거래가격 (만원)");
						$("#areaInfoHouseDiv01").show();
						$("#areaInfoHouseDiv02").hide();
						$("#areaInfoHouseDiv03").hide();
					} else if(idx == 1) {
						$("#areaInfoHouseChartTitle").html("주택 거래 동향 (건)");
						$("#areaInfoHouseDiv01").hide();
						$("#areaInfoHouseDiv02").show();
						$("#areaInfoHouseDiv03").hide();
					} else if(idx == 2) { //공시지가
						$("#areaInfoHouseChartTitle").html("공시지가 (원/㎡)");
						$("#areaInfoHouseDiv01").hide();
						$("#areaInfoHouseDiv02").hide();
						$("#areaInfoHouseDiv03").show();
					}
				}
				// mng_e 20190401 김건민
			},
			
			/**
			 * @name         : areaInfoCompanyPrev
			 * @description  :	지역 종합정보 총사업체 차트 (이전 버튼 클릭 시)
			 * @date         : 2015. 12. 31. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			areaInfoCompanyPrev : function() {
				$("#areaInfoChartTabDiv01 ul").find("li > a").removeClass("on");
				if($("#areaInfoCompanyDiv01").is(":visible")) {	//사업체 비율이 열려있을 경우
					$("#areaInfoCompanyChartTitle").html("주요시설물 현황 (개)");	
					$(".areaInfoCompany").hide();
					$("#areaInfoCompanyDiv03").show();
					$("#areaInfoChartTabDiv01 ul").find("li:eq(2) > a").addClass("on");
				} else if($("#areaInfoCompanyDiv02").is(":visible")) {	//업종별 증감이 열려있을 경우
					$("#areaInfoCompanyChartTitle").html("소상공인 업종별 사업체 비율(%)");
					$(".areaInfoCompany").hide();
					$("#areaInfoCompanyDiv01").show();
					$("#areaInfoChartTabDiv01 ul").find("li:eq(0) > a").addClass("on");
				} else if($("#areaInfoCompanyDiv03").is(":visible")) {	//주요시설물 현황이 열려있을 경우
					$("#areaInfoCompanyChartTitle").html("소상공인 업종별 증감 (개)");	
					$(".areaInfoCompany").hide();
					$("#areaInfoCompanyDiv02").show();
					$("#areaInfoChartTabDiv01 ul").find("li:eq(1) > a").addClass("on");
				}
			},
			
			/**
			 * @name         : areaInfoCompanyNext
			 * @description  :	지역 종합정보 총사업체 차트 (다음 버튼 클릭 시)
			 * @date         : 2015. 12. 31. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			areaInfoCompanyNext : function() {
				$("#areaInfoChartTabDiv01 ul").find("li > a").removeClass("on");
				if($("#areaInfoCompanyDiv01").is(":visible")) {	//사업체 비율이 열려있을 경우
					$("#areaInfoCompanyChartTitle").html("소상공인 업종별 증감 (개)");	
					$(".areaInfoCompany").hide();
					$("#areaInfoCompanyDiv02").show();
					$("#areaInfoChartTabDiv01 ul").find("li:eq(1) > a").addClass("on");
				} else if($("#areaInfoCompanyDiv02").is(":visible")) {	//업종별 증감이 열려있을 경우
					$("#areaInfoCompanyChartTitle").html("주요시설물 현황 (개)");	
					$(".areaInfoCompany").hide();
					$("#areaInfoCompanyDiv03").show();
					$("#areaInfoChartTabDiv01 ul").find("li:eq(2) > a").addClass("on");
				} else if($("#areaInfoCompanyDiv03").is(":visible")) {	//주요시설물 현황이 열려있을 경우
					$("#areaInfoCompanyChartTitle").html("소상공인 업종별 사업체 비율(%)");
					$(".areaInfoCompany").hide();
					$("#areaInfoCompanyDiv01").show();
					$("#areaInfoChartTabDiv01 ul").find("li:eq(0) > a").addClass("on");
				}
			},
			
			/**
			 * 
			 * @name         : areaInfoPopulationChange
			 * @description  :	지역 종합정보 총인구 차트 (이전, 다음 버튼)
			 * @date         : 2015. 11. 11. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			areaInfoPopulationChange : function() {
				$("#areaInfoChartTabDiv02 ul").find("li > a").removeClass("on");
				if($("#areaInfoPopulationDiv01").is(":visible")) {	//연령 비율이 열려있을 경우
					$("#areaInfoPopulationChartTitle").html("성별 인구비율");
					$("#areaInfoPopulationDiv01").hide();
					$("#areaInfoPopulationDiv02").show();
					$("#areaInfoChartTabDiv02 ul").find("li:eq(1) > a").addClass("on");
				} else {
					$("#areaInfoPopulationChartTitle").html("연령별 인구비율(%)");
					$("#areaInfoPopulationDiv01").show();
					$("#areaInfoPopulationDiv02").hide();
					$("#areaInfoChartTabDiv02 ul").find("li:eq(0) > a").addClass("on");
				}
			},
			
			/**
			 * 
			 * @name         : areaInfoHouseholdChange
			 * @description  :	지역 종합정보 총가구 차트 (이전, 다음 버튼)
			 * @date         : 2015. 11. 12. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			areaInfoHouseholdChange : function() {
				$("#areaInfoChartTabDiv03 ul").find("li > a").removeClass("on");
				if($("#areaInfoHouseholdDiv01").is(":visible")) {	//점유형태별 가구비율이 열려있을 경우
					$("#areaInfoHouseholdChartTitle").html("거처유형별 가구비율(%)");
					$("#areaInfoHouseholdDiv01").hide();
					$("#areaInfoHouseholdDiv02").show();
					$("#areaInfoChartTabDiv03 ul").find("li:eq(1) > a").addClass("on");
				} else {
					$("#areaInfoHouseholdChartTitle").html("점유형태별 가구비율(%)");
					$("#areaInfoHouseholdDiv01").show();
					$("#areaInfoHouseholdDiv02").hide();
					$("#areaInfoChartTabDiv03 ul").find("li:eq(0) > a").addClass("on");
				}
			},
			
			/**
			 * 
			 * @name         : areaInfoHouseChange
			 * @description  :	지역 종합정보 총주택 차트 (이전, 다음 버튼)
			 * @date         : 2015. 11. 13. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			areaInfoHouseChange : function() {
				$("#areaInfoChartTabDiv04 ul").find("li > a").removeClass("on");
				if($("#areaInfoHouseDiv01").is(":visible")) {	//주택 거래가격이 열려있을 경우
					$("#areaInfoHouseChartTitle").html("주택 거래 동향 (건)");
					$("#areaInfoHouseDiv01").hide();
					$("#areaInfoHouseDiv02").show();
					$("#areaInfoChartTabDiv04 ul").find("li:eq(1) > a").addClass("on");
				} else {
					$("#areaInfoHouseChartTitle").html("㎡당 주택 거래가격 (만원)");
					$("#areaInfoHouseDiv01").show();
					$("#areaInfoHouseDiv02").hide();
					$("#areaInfoChartTabDiv04 ul").find("li:eq(0) > a").addClass("on");
				}
			},
			
			/**
			 * 
			 * @name         : updateAreaSearch
			 * @description  :	창업지역검색 데이터보드
			 * @date         : 2015. 11. 13. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			updateAreaSearch : function(options) {
				$(".dataBoardDiv").hide();
				$("#areaSearchDiv").show();
				$(".optionListInfo").empty();
				$bizStatsDataBoard.ui.changePensionAndMinbakUI('10');				// 2020년 SGIS고도화 3차(테마코드) - 민박과 펜션를 10차 산업에 맞게 UI를 조금 바꾸는 메서드 호출 (pse);
				$bizStatsDataBoard.ui.areaInfoChartTab('company', 0);				// 2020년 SGIS고도화 3차(테마코드) - ex) 데이터보드에서 소상공인 업종별 증감을 누른 후 다시 데이터 보드를 업데이트하면 여전히 버튼이 눌린상태이며 아래 차트가 나오지 않음. 이를 방지하기 위한 코드(pse);
				var conditions = $bizStatsLeftMenu.ui.getCurSearchParam().one.conditions;
				
				for(var i=0; i<conditions.length; i++){
					var html = '';
					html += '<div class="condition">';
					html += '	<p class="on">'+conditions[i].category+'</p>';
					html += '	<p>'+conditions[i].value+'</p>';
					html += '</div>';
					$(".optionListInfo").append(html);
				}
				
				//메모리에 있는 후보지역
				var candidateList = this.mapData[this.map_id].options.dataBoard.candidateList;
				
				//후보 지역이 없을경우 초기화
				if(candidateList == undefined) {
					this.mapData[this.map_id].options.dataBoard.candidateList = [];
				} /*else if(candidateList.length > 3) {
					messageAlert.open("알림", "최대 3개까지 가능합니다.");
					return;
				}*/
				
				//중복 체크
				/*if(candidateList != undefined) {
					for(var  i = 0; i < candidateList.length; i ++) {
						if(candidateList[i].adm_cd == options.params.adm_cd) {
//							messageAlert.open("알림", options.params.adm_nm + " 은(는) 중복입니다.");
							return; 	//중복일 경우 리턴
						}
					}
				}
				*/
				//후보지역 초기화
				$(".huboAreaList").empty();
				$(".spyChartTitleClass").empty();
				this.mapData[this.map_id].options.dataBoard.spyChartList = [];		//차트 초기화
				this.mapData[this.map_id].options.dataBoard.barChartList = [];		//차트 초기화

				//메모리에 저장 (최대 3개)
				//this.mapData[this.map_id].options.dataBoard.candidateList.push(options.params);
				
				candidateList = this.mapData[this.map_id].options.dataBoard.candidateList;
				for(var  i = 0; i < candidateList.length; i ++) {
					this.areaSearchCandidateAdd((i+1), candidateList[i]);
				}
				
			},
			
			/**
			 * 
			 * @name         : areaSearchCandidateAdd
			 * @description  :	후보지역 추가
			 * @date         : 2015. 11. 13. 
			 * @author	     : 김성현

			 * @param	: idx 순번, paramObj 파라미터
			 * @history 	 :
			 */
			areaSearchCandidateAdd : function(idx, paramObj) {
				
				var html = "";
				html += "<li>";
				html += "	<div class='rela'>";
				html += "		<a class='round on' id='" + paramObj.adm_cd + "' ";
				html += "			href='javascript:$bizStatsDataBoard.ui.areaSearchToggle(\""+paramObj.adm_cd+"\",\""+paramObj.adm_nm+"\",\""+paramObj.total+"\");'>";
				html += "			<span class='ss'>" + paramObj.adm_nm + "</span>";
				html += "			<span class='es' ";
				html += "				onclick='$bizStatsDataBoard.ui.areaSearchDetailInfo(\"first\", \""+paramObj.adm_cd+"\", \""+paramObj.adm_nm+"\", \""+paramObj.x+"\", \""+paramObj.y+"\");'>";
				html += "				지역상세정보보기";
				html += "			</span>";
				html += "		</a>";
				html += "	</div>";
				html += "</li>";
				$(".huboAreaList").append(html);
				
				//창업지역검색 스파이더웹차트 호출
				$bizStatsDataBoardApi.request.areaSearchSpiderwebChart(paramObj);
			},
			
			/**
			 * 
			 * @name         : areaSearchDetailInfo
			 * @description  :	지역 상세정보 보기
			 * @date         : 2015. 11. 18. 
			 * @author	     : 김성현
			 * @param	: type(first-최초검색, none-이후검색), adm_cd, adm_nm, x, y
			 * @history 	 :
			 */
			areaSearchDetailInfo : function(type, adm_cd, adm_nm, x, y) {
				if(type == 'none'){
					srvLogWrite('G1', '07', '03', '02', '', '');
				}
				
				$(".es").addClass("on");
				var zoomLevel = 0;
				if(adm_cd.length >= 7) {
					zoomLevel = 8;
				} else if(adm_cd.length >= 5) {
					zoomLevel = 5;
				}
				//지도 이동
				// 2016. 04. 25 j.h.Seok
//				this.map.mapMove([x, y], zoomLevel);
				
				if (x == "undefined" || y == "undefined") {
					if (this.map.dataGeojson) {
						this.map.dataGeojson.eachLayer(function(layer) {
							if (layer.feature.properties.adm_cd == adm_cd) {
								x = layer.feature.properties.x;
								y = layer.feature.properties.y;
							}
						});
					}
				}
				
				if (x == "undefined" || y == "undefined") {
					return;
				}
				
				this.map.dropInfo = {
						center : [x, y],
						zoom : zoomLevel
				};
				
				this.mapData[this.map_id].options.type = "areaInfo";
				this.mapData[this.map_id].options.params.adm_cd = adm_cd;
				this.mapData[this.map_id].options.params.adm_nm = adm_nm;
				this.mapData[this.map_id].options.params.x = x;
				this.mapData[this.map_id].options.params.y = y;
				this.mapData[this.map_id].options.params.zoomLevel = zoomLevel
				
				//최초 한번만 레이어 저장
				if(type == "first") {
					this.miniGeojson = this.map.dataGeojsonLayer;	
				}
				
				//데이터보드 호출
				this.updateDataBoard(this.mapData[this.map_id].options, "areaInfo");
				
				//후보지 검색결과 표출
				$("#areaSearchMinimap01").show();
				$("#areaSearchMinimap02").show();	
				
				//후보지 초기화
				$("#areaInfoCandidateCnt").text("0");
				$("#areaInfoCandidateList").html("");
				
				//미니맵 생성
				this.createMiniMap(this.map, 0);
				
				//mng_s 20190403 조건별 지역찾기의 결과에서 데이터보드에서 지역상세정보보기 클릭시 좌측메뉴의 후부지 정보보기 클릭상태로 하기위해수정함.
				$bizStatsLeftMenu.ui.setDetailStatsPanel2('areaInfo');
			},
			
			/**
			 * 
			 * @name         : areaSearchToggle
			 * @description  : 후보지역 선택 토글
			 * @date         : 2016. 12. 22
			 * @author	     : 김재상
			 * @param		 : adm_cd, adm_nm, total
			 * @history 	 :
			 */
			areaSearchToggle : function(adm_cd, adm_nm, total){
				
				//mng_s 20190403 조건별 지역찾기의 결과에서 데이터보드에서 지역상세정보보기 클릭시 좌측메뉴의 후부지 정보보기 클릭상태로 하기위해수정함.
				//$bizStatsLeftMenu.ui.setDetailStatsPanel2('areaInfo');
				
				$('#'+adm_cd).toggleClass('on');
				
				var candidateList = this.mapData[this.map_id].options.dataBoard.candidateList;
				var tmpList = [];

				if($('#'+adm_cd).hasClass('on')){
					//선택한 객체 추가
					candidateList.push({
						adm_cd : adm_cd,
						adm_nm : adm_nm,
						total : total
					});
					tmpList = $.sort(candidateList, 1, "adm_cd");
				}else{
					//지우려는 객체를 제외하고 나머지를 push해서 새로운 리스트를 만든다.
					for(var  i = 0; i < candidateList.length; i ++) {
						if(adm_cd != candidateList[i].adm_cd) {
							tmpList.push(candidateList[i]);
						}
					}
				}
				
				this.mapData[this.map_id].options.dataBoard.candidateList = tmpList;
				this.mapData[this.map_id].options.dataBoard.spyChartList = [];
				this.mapData[this.map_id].options.dataBoard.barChartList = [];
				//남은 후보지역으로 차트를 다시 그린다.
				candidateList = this.mapData[this.map_id].options.dataBoard.candidateList;
				for(var  i = 0; i < candidateList.length; i ++) {
					$bizStatsDataBoardApi.request.areaSearchSpiderwebChart(candidateList[i]);
				}
				
				if (candidateList.length == 0) {
					var chart = $("#spyCharts02").highcharts();
					//console.log(chart);
					if (chart.series.length > 1) {
						chart.series[1].hide();
						$("#spyChartsArea04").hide();
					}
				}
			},
			
			/**
			 * 
			 * @name         : createMiniMap
			 * @description  :	미니맵 생성
			 * @date         : 2015. 11. 18. 
			 * @author	     : 김성현
			 * @param	: map, map_id
			 * @history 	 :
			 */
			createMiniMap : function(map, map_id) {
				if (map.miniMap.gMap == null) {
					//첫 지도만 미니맵 생성
					if(map_id == 0) {
						var miniMap = map.miniMap;
						miniMap.id = map_id;
						miniMap.createMap(map.delegate, "miniMap_01");
					}
					//더블클릭 줌 막기
					miniMap.gMap.doubleClickZoom.disable();
				} else {
					this.map.miniMap.geojson.remove();
				}
				
				//지도 이동
				this.map.miniMap.mapMove([989674, 1818313], 8, false);
				this.map.miniMap.addPolygonGeoJson(this.miniGeojson, "mini");
				
				//레이어만큼 each
				var html = "";
				var dataCnt = 0;
				this.map.miniMap.geojson.eachLayer(function(layer) {
					//데이터가 있는 레이어만 추출
					if(layer.feature.info.length > 0) {
						var property = layer.feature.properties;
						html += "<li><a href='javascript:$bizStatsDataBoard.ui.areaSearchDetailInfo(" +
										"\"none\"," +
										"\"" + property.adm_cd +"\"," +
										"\"" + property.adm_nm +"\"," +
										"\"" + property.x +"\"," +
										"\"" + property.y +"\"" +
									")'>"+property.adm_nm+"</a></li>";
						
						dataCnt++;
					}
				});
				
				//후보지 개수
				$("#areaInfoCandidateCnt").text(dataCnt);
				//후보지 리스트
				$("#areaInfoCandidateList").html(html);
			},
			
			/**
			 * 
			 * @name         : updateTrade
			 * @description  :	상권정보 데이터보드
			 * @date         : 2015. 12. 04. 
			 * @author	     : 김성현
			 * @param	: options
			 * @history 	 :
			 */
			updateTrade : function(options) {
				$(".dataBoardDiv").hide();
				$("#tradeDiv").show();
				//지역상권 타이틀
				$(".tradeAreaTitle").text(options.params.data.properties.tradearea_nm + " 상권");
				
				var tradearea_id = options.params.data.properties.tradearea_id;
				//영역 내 업종 비율
				$bizStatsDataBoardApi.request.tradeThemeRatioPieChart(tradearea_id);
				//상권정보 데이터보드 Pie차트 선택
				$bizStatsDataBoard.ui.tradePieChartClick(tradearea_id, "음식"); // 2020년 SGIS고도화 3차(테마코드) - 2번째 인자값을 "음식점"에서 "음식"으로 변경, 2020 테마코드의 변화 때문임
			},
			
			/**
			 * 
			 * @name         : tradePieChartClick
			 * @description  :	상권정보 데이터보드 Pie차트 선택 시
			 * @date         : 2015. 12. 04. 
			 * @author	     : 김성현
			 * @param	: tradearea_id, themeNm
			 * @history 	 :
			 */
			tradePieChartClick : function(tradearea_id, themeNm, type) {	
				// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존코드 주석처리 및 새로운 코드 추가, 하드코딩 해소를 위함
				var themeCd = "";
				/*
				if(themeNm == "서비스") {
					themeCd = "10";
				} else if(themeNm == "도소매") {
					themeCd = "20";
				} else if(themeNm == "숙박업") {
					themeCd = "40";
				} else if(themeNm == "음식점") {
					themeCd = "50";
				}*/
				themeCd = $themeCdCommon.findBigThemeCd(themeNm);
				// 2020년 SGIS고도화 3차(테마코드) 끝 - 기존코드 주석처리 및 새로운 코드 추가, 하드코딩 해소를 위함
				this.mapData[this.map_id].options.params.theme_cd = themeCd;	//테마코드
				
				//명칭
				$("#tradeThemeNmSpan").text(themeNm);
				//테마별 상권 상세정보 Bar 차트 조회
				$bizStatsDataBoardApi.request.tradeThemeBarChart(tradearea_id, themeCd);
			},
			
			/**
			 * @name         : reset
			 * @description  :	생활업종지도 데이터보드 초기화
			 * @date         : 2015. 11. 26.
			 * @author	     : 김성현
			 * @param	: map_id
			 * @history 	 :
			 */
			reset : function(map_id) {
				$(".dataBoardDiv").hide();
				this.chartDataList[map_id] = null;
				
				this.mapData[map_id].options = {};
				this.mapData[map_id].type = "";
				if(this.map != null) {
					if (this.map.miniMap) {
//						this.map.miniMap = null;
						if(this.map.miniMap.geojson) {
							this.map.miniMap.geojson.remove();
						}
					}
				}
			},
			
			/**
			 * @name         : setReportData
			 * @description  : 보고서 데이터를 저장한다.
			 * @date         : 2015. 11. 26.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setReportData : function(category, type, data, id) {
				if ($bizStatsDataBoard.ui.chartDataList[id] == null) {
					$bizStatsDataBoard.ui.chartDataList[id] = [];
				}
				
				var e = {
						category: category,
						type: type,
						data: data
				};
				
				if(p = $.pick($bizStatsDataBoard.ui.chartDataList[id], {category: category, type: type})){
					var idx = $.indexOf($bizStatsDataBoard.ui.chartDataList[id], p);
					$bizStatsDataBoard.ui.chartDataList[id][idx].data = data;
				}else{
					$bizStatsDataBoard.ui.chartDataList[id].push(e);
				}
			},
			
			// djlee 2019-04-14 수정 시작
			areaInfoCateClick : function(idx) {
				
				$bizStatsLeftMenu.ui.srvLogAreaInfoNm = idx;
				//탭 초기화 후 선택
				$(".bizCateMenu").find("a").removeClass("on");
				//$(".bizCateMenu").find("a:eq("+(idx-1)+")").addClass("on");		// 2020년 SGIS고도화 3차(테마코드) - 기존코드 주석처리 (pse)
				$("#forBizAreaTabIndex").find("a:eq("+(idx-1)+")").addClass("on");	// 2020년 SGIS고도화 3차(테마코드) - 코드 추가 (pse)
				
				// 소상공인 업종별 사업체 비율
				if($("#areaInfoCompanyDiv01").is(":visible")){
					$(".areaInfoChart").hide();
					$(".areaInfoTable").hide();

					$(".chartsSizingBox:eq("+(idx-1)+")").show();
					$(".areaInfoTable:eq("+(idx-1)+")").show();
				// 소상공인 업종별 증감
				}else if($("#areaInfoCompanyDiv02").is(":visible")){
					//업종별 탭 show/hide
					$(".areaInfoChangeTab").hide();
					$("#areaInfoChangeTab0"+idx).show();
					
					setTimeout(function(){
						$(".areaInfoChangeTab li").each(function(index,elem){
							if($(elem).find("a").hasClass("on")){
								eval($(elem).find("a").attr("href").replace("javascript:" , ""));
								return false;
							}
						});
					},400);
				}
				
			},
			// djlee 2019-04-14 수정 끝
			
			areaInfoThemeClick : function(themeCd, themeNm){
				
				// 2020년 SGIS고도화 3차(테마코드) 시작 -  9차 산업에는 민박이라는 테마코드가 없다. 대신 9차에서는 펜션(민박)의 형태로 존재한다. 테마코드를 펜션(민박)에 맞춰준다.(pse)
				if( ($('#areaInfoCompanyDiv02 .censusTabs').find('a.on').data('value') == '9') && (themeCd == 'G001')) {
                    themeCd = '4003';
                    themeNm = '펜션';
                }
				// 2020년 SGIS고도화 3차(테마코드) 끝 -  9차 산업에는 민박이라는 테마코드가 없다. 대신 9차에서는 펜션(민박)의 형태로 존재한다. 테마코드를 펜션(민박)에 맞춰준다.(pse)
				
				switch($bizStatsLeftMenu.ui.srvLogAreaInfoNm){
					case "1":
						$(".areaInfoChangeTab li>a").removeClass("on");
						$("#areaInfo_"+themeCd).addClass("on");
						$bizStatsLeftMenu.ui.srvLogAreaInfoNm = "5";
						break;
					case "2":
						$(".areaInfoChangeTab li>a").removeClass("on");
						$("#areaInfo_"+themeCd).addClass("on");
						$bizStatsLeftMenu.ui.srvLogAreaInfoNm = "5";
						break;
					case "3":
						$(".areaInfoChangeTab li>a").removeClass("on");
						$("#areaInfo_"+themeCd).addClass("on");
						$bizStatsLeftMenu.ui.srvLogAreaInfoNm = "5";
						break;
					case "4":
						$(".areaInfoChangeTab li>a").removeClass("on");
						$("#areaInfo_"+themeCd).addClass("on");
						$bizStatsLeftMenu.ui.srvLogAreaInfoNm = "5";
						break;
					case "5":
						$(".areaInfoChangeTab li>a").removeClass("on");
						$("#areaInfo_"+themeCd).addClass("on");
						srvLogWrite('G1', '08', '03', '01', themeNm, '');
						break;
					default :
						$(".areaInfoChangeTab li>a").removeClass("on");
						$("#areaInfo_"+themeCd).addClass("on");
						break;
					
				}

				$(".chartsTitleBox img").attr("src", "/img/ico/bizStats/ico_sector_img_"+themeCd+".png");
				$(".chartsTitleBox span").text(themeNm);
				
				// 2019-04-14 djlee 수정 시작
				$("#areaInfoCompanyDiv02 .censusTabs a").each(function(index,elem){
					if($(this).hasClass("on")){
						$bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.params["census"] =  $(this).data("value");
					}
				});
				// 2019-04-14 djlee 수정 끝
				//선택한 테마코드를 메모리에 저장
				$bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.indecreaseThemeCd = themeCd;
				$bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.indecreaseThemeNm = themeNm;
				
				//업종별 증감 차트 재 호출
				$bizStatsDataBoardApi.request.areaInfoCompanyIndecrease($bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.params);
			},
			
			/**
			 * @name         : areaInfoComparePopup
			 * @description  : 후보지역 비교 다이얼로그 팝업
			 * @date         : 2016. 9. 6.
			 * @author	     : 김재상
			 * @history 	 :
			 */
			areaInfoComparePopup : function(){
				$('.dialogbox').css('left', '0px');
				$(".dialogbox .dimAreaScroll").mCustomScrollbar({axis:"xy"});
	        	
				//후보지역 비교 팝업 표/차트 전환 이벤트
				$(".dialogbox .typeBox>a").click(function(){
					$(".dialogbox .typeBox>a").removeClass('on');
					$(this).addClass("on");
					var idx = $(this).index(".dialogbox .typeBox>a");
					$(".dialogbox .tables").css("position", "absolute");
					$(".dialogbox .charts").css("position", "absolute");
					if(idx == 0){
						$(".dialogbox .tables").css("position", "static");
					}else if(idx == 1){
						$(".dialogbox .charts").css("position", "static");
					}
				});
			},
			
			areaInfoComparePopupClose : function(){
				$('.dialogbox').css('left', '-20000px');
			},
			
			/**
			 * @name         : changeLegend
			 * @description  : 시군구별 생활업종현황 범례설정 버블<->색상
			 * @date         : 2016. 10. 13.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			changeLegend : function(type) {
				if (type == "color") {
					$bizStatsMap.ui.setChangeColorMode();
				}else {
					$bizStatsMap.ui.setChangeBubbleMode();
				}
			},
			// 2020년 SGIS고도화 3차(테마코드) 시작 - 9차에는 펜션(민박) , 10차에는 펜션과  민박을 분리되어서 화면에 표출되도록 하는 메서드 (pse)
            changePensionAndMinbakUI: function (censusNumber) {
            	
            	var themeCdPension = $themeCdCommon.findSmallThemeDetailByName('펜션').theme_cd;
            	var themeCdMinbak = $themeCdCommon.findSmallThemeDetailByName('민박').theme_cd;
            	var menu = ["jobChange","categoryDetail","categoryYearDetail","areaInfo"];	// [ 업종 밀집도 변화(jobChange), 업종별 입지계수(categoryDetail, categoryYearDetail)  , 조건별 지역찾기(areaInfo) ] 메뉴
            	if (censusNumber == '9') {
            		
            		menu.forEach(function(item,index){
            			$('#'+item+'_'+themeCdMinbak).hide();
            			$('#'+item+'_'+themeCdPension).text('펜션(민박)');
            		});
                   
                } else if (censusNumber == '10') {
                	
                	menu.forEach(function(item,index){
            			$('#'+item+'_'+themeCdMinbak).show();
            			$('#'+item+'_'+themeCdPension).text('펜션');
            		});
                    
                }
            }
			//  2020년 SGIS고도화 3차(테마코드) 끝 
	};

	$bizStatsDataBoard.event = {
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : 데이터보드 UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2015. 10. 28. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */	
			setUIEvent : function() {
				var body = $("body");
				
				//투명도 설정 바
				$("#dataSlider").slider({
			    	range: "min",
			        min: 5,
			        max: 10,
			        value: 10,
			        slide: function( event, ui ) {  //ui.value
			        	$(".dataSideBox, .bizStatsDataBoard").css("opacity", ui.value*0.1);
				    }
			    });
				$(".dataSideBox, .bizStatsDataBoard").css( "opacity", $("#dataSlider").slider( "value" ) );
				
				//닫기 버튼
				body.on("click",".dataSideBox .bar>a",function(){ 
					$(".dataSideBox").stop().animate({"right":"-1500px"},200);
					$(".sop-right").stop().animate({"right":"0px"},200);//20년수정반영
					$(".bizStatsDataBoard").removeClass("on").stop().animate({"right":"0"},200);
					$("#mapDataStandard").stop().animate({"right":"135px"},200);///////박길섭추가
				});
				
				//탭 열고 닫기
				body.on("click",".dscList dt>a",function(){
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).parents("dt").next("dd").show();
					}else{
						$(this).removeClass("on");
						$(this).parents("dt").next("dd").hide();
					}
				});
				//탭 열고 닫기 박길섭 추가
				/*body.on("click",".sggdscList dt>a",function(){
					var ck = $(this).hasClass("on");
					if(!ck){
						$(".sggdscList dt>a").removeClass("on");
						$(".sggdscList dd").hide();
						
						$(this).addClass("on");
						$(this).parents("dt").next("dd").slideDown(500);
					}else{
						$(this).removeClass("on");
						$(this).parents("dt").next("dd").slideUp(300);
					}
				});*/
				body.on("click",".sggdscList dt>a",function(){
					$(this).toggleClass("on");
					$(this).parents("dt").next("dd").slideToggle();
				});
				
				//데이터보드 열고 닫기
				body.on("click",".bizStatsDataBoard",function(){ 
					var ck = $(this).hasClass("on");
					$("#mapDataStandard").stop().animate({"right" : "605px"}, 200);/////////박길섭 추가
					if(!ck){
						//일반 데이터보드
						//20년수정반영 시작
						$(".dataSideBox").stop().animate({"right":"0px"},200);
						$(".sop-right").stop().animate({"right":"558px"},200);
						$(this).addClass("on").stop().animate({"right":"430px"},200);
						//20년수정반영 시작
					}else{
						//데이터보드 닫기
						$(".dataSideBox").stop().animate({"right":"-1500px"},200);
						$(".sop-right").stop().animate({"right":"0px"},200);//20년수정반영
						$(this).removeClass("on").stop().animate({"right":"0"},200);
						$("#mapDataStandard").stop().animate({"right" : "135px"}, 200);/////////박길섭 추가
					}
				});
				
				//차트/표 토글
				body.on("click",".typeBox>a",function(){ 
					$(this).parents(".compareBox").eq(0).find(".typeBox a").removeClass("on");//박길섭 수정 차트표
					$(this).addClass("on");
					var ck = $(this).index(".typeBox>a")+1;
					$(this).parents(".compareBox").eq(0).find(".charts").css("position","absolute");
					$(this).parents(".compareBox").eq(0).find(".tables").css("position","absolute");
					if(ck%2){
						$(this).parents(".compareBox").eq(0).find(".charts").css("position","static");
					}else{
						$(this).parents(".compareBox").eq(0).find(".tables").css("position","static");
					}
			    });
				
				//업종밀집도 변화 년도 설정
				body.on("click", ".ysettingList a", function() {
					//전체 체크 해제
					$(".ysettingList input").prop("checked", false);
					$(this).prev().prop("checked", true);
					
					//선택 체크
					$(".ysettingList a").removeClass("on");
					$(this).addClass("on");
					
					// 2020년 SGIS고도화 3차(테마코드) 시작  - 9차 산업에는 민박이라는 테마코드가 없다. 대신 9차에서는 펜션(민박)의 형태로 존재한다. 테마코드를 펜션(민박)에 맞춰준다.(pse)
					if( ($bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.themeCd === "G001") && ($(".ysettingList").find("input:checked").val() == "2016")) {
						$bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.themeCd = "4003";	// 펜션 테마코드 값 주입
						$bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.themeNm = "펜션(민박)";
					}
					// 2020년 SGIS고도화 3차(테마코드) 끝 - 9차 산업에는 민박이라는 테마코드가 없다. 대신 9차에서는 펜션(민박)의 형태로 존재한다. 테마코드를 펜션(민박)에 맞춰준다.(pse)
					
					//메모리에 있는 조회정보 가져오기
					var themeCd = $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.themeCd;
					var themeNm = $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.themeNm;
					var params = $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.params;
					var year = $(".ysettingList").find("input:checked").val();
					
					// mng_s 20190401 김건민
					//srvLogWrite('G1', '03', '04', '09', '', year);
					// mng_e 20190401 김건민
					//alert("[bizStatsDataBoard.js] themeCd.length [" + themeCd.length);
					if (themeCd.length == 10) { //지자체 코드 길이는 10
						//지자체 인허가 재 조회
						$bizStatsDataBoard.ui.jobOpenThemeClick(themeCd, themeNm);
					} else {
						//업종밀집도 변화 재 조회
						$bizStatsDataBoard.ui.jobChangeThemeClick(themeCd, themeNm);
					}
				});
				
				//업종별 증감 테마 슬라이더 (IE10 이하일 경우 fade)
				if(browserFnc() != -1 && browserFnc() < 11) {
					$(".bxslider").bxSlider({
						infiniteLoop: false,
						hideControlOnEnd: true,
						mode : "fade"
					});
				} else {
					//테마 슬라이더
					$(".bxslider").bxSlider({
						infiniteLoop: false,
						hideControlOnEnd: true
					});
				}
				
				//테마코드 클릭 이벤트 (업종별 증감)
				$(".theme_icon").click(function() {
					var imgLen = $(this).find("img").attr("src").length;
					var currThemeCd = $(this).find("img").attr("src").substring(imgLen-8, imgLen-4);
					var currThemeNm = $(this).find(".themeIconSpan").text();
					$("#areaInfoCompanyBxslider").find("span").each(function(i, b){
						$(b).css("color", "#999999");
					});
					$(this).css("color", "#00bcd4");
					
					//선택한 테마코드를 메모리에 저장
					$bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.indecreaseThemeCd = currThemeCd;
					$bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.indecreaseThemeNm = currThemeNm;
					
					//업종별 증감 차트 재 호출
					$bizStatsDataBoardApi.request.areaInfoCompanyIndecrease($bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.params);
				});
				
				//주택 거래가격 라디오버튼 선택 시
				$("input:radio[name='priceRadio']").click(function() {
					//선택한 주택을 메모리에 저장
					$bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.priceRadio = $(this).val();
					//주택 거래가격 차트 재 호출
					$bizStatsDataBoardApi.request.areaInfoHousePrice($bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.params);
				});
				
				//주택 거래 동향 라디오버튼 선택 시
				$("input:radio[name='tradeRadio']").click(function() {
					//선택한 주택을 메모리에 저장
					$bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.tradeRadio = $(this).val();
					//주택 거래가격 차트 재 호출
					$bizStatsDataBoardApi.request.areaInfoHouseTrade($bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.params);
				});
				
				//공시지가 라디오버튼 선택 시
				$("input:radio[name='pnilpRadio']").click(function() {
					//선택한 주택을 메모리에 저장
					$bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.dataBoard.pnilpRadio = $(this).val();
					//주택 거래가격 차트 재 호출
					$bizStatsDataBoardApi.request.areaInfoHousePnilp($bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id].options.params);
				});
				
				//인트로 시도별 생활업종의 테마를 선택 시
				body.on("click", ".introSidoThemeTab li", function() {
					$(".introSidoThemeTab li a").removeClass("on");
					$(this).find("a").addClass("on");
				});
				
				//시군구별 생활업종현황 데이터보드 색상<->버블
				body.on("click", ".bizLegendBox>div", function() {
					var id = $(this).attr("id");
					$(this).addClass("on");
					if (id == "bizLegend_color") {
						if ($(".bizLegend_bubble").hasClass("on")) {
							// mng_s 20190329 김건민
							srvLogWrite('G1', '04', '04', '00', '', '');
							// mng_e 20190329 김건민
							$(".bizLegend_bubble").removeClass("on");
						}
						$bizStatsDataBoard.ui.changeLegend("color");
					}else {
						if ($(".bizLegend_color").hasClass("on")) {
		       				// mng_s 20190329 김건민
							srvLogWrite('G1', '04', '04', '00', '', '');
							// mng_e 20190329 김건민
							$(".bizLegend_color").removeClass("on");
						}
						$bizStatsDataBoard.ui.changeLegend("bubble");
					}
				});
				//////////////////////데이터보기 엑셀 다운로드 박길섭 추가 엑셀 다운로드//////////////////////////////
				body.on("click",".btn_excelDownload", function(){
					if($bizStatsLeftMenu.ui.srvLogLeftMenuNm == 'intro'){
						srvLogWrite('G1', '03', '05', '03', '', '');
					}else if($bizStatsLeftMenu.ui.srvLogLeftMenuNm == 'lqMap'){
						srvLogWrite('G1', '06', '04', '03', '', '');
					}
					var myForm = document.excelDownForm;
					$("#excelDownForm").html("");
					
					/*var titleData = [];
					$(this).parents(".compareBox").eq(0).find('table').eq(0).find(".addSideLine.th").each(function(){
						if($(this).css("display")!= "none"){
							titleData.push($(this).html());
						}
					});
					
					var excelDataElement = document.createElement("input");
					excelDataElement.type = "hidden";
					excelDataElement.name = "excelData";
					excelDataElement.value = titleData;
					myForm.appendChild(excelDataElement);*/
					
					$(this).parents(".compareBox").eq(0).find('table').eq(0).find("tr:not(.th)").each(function(){
						var contentData = [];
						
						$(this).find(".addSideLine").each(function(i){
							var tmpContentData = $(this).html();
								tmpContentData = tmpContentData.replace(/,/gi, "");
							contentData.push(tmpContentData);
						});
						var excelDataElement = document.createElement("input");
						excelDataElement.type = "hidden";
						excelDataElement.name = "excelData";
						excelDataElement.value = contentData;
						myForm.appendChild(excelDataElement);
						
					});
					
					var url = "/view/technicalBiz/excelDown";
					//var url = "/view/bizStats/excelDown";
					window.open("" , "_self", "enabled"); 
					myForm.action = url; 
					myForm.method="post";
					myForm.target="_self";
					myForm.submit();
					
				});
				/////////////////////////////////////////////////////////////////////////////
				//업종밀집도 읍면동 셀렉트박스 이벤트 
				body.on("change", ".emdongSelect", function(e){
					var emdong_cd = $(this).find(":selected").val();
					var emdong_nm = $(this).find(":selected").text();
					var curMapData = $bizStatsDataBoard.ui.mapData[$bizStatsDataBoard.ui.map_id];
					
					if(curMapData.options && curMapData.type){
						if(curMapData.options.params){
							var params = curMapData.options.params;
							if(params.adm_cd.length > 4){
								curMapData.options.params.adm_cd = params.adm_cd.substr(0,5) + emdong_cd;
								curMapData.options.params.adm_nm = params.adm_nm + " " + emdong_nm;
								$bizStatsDataBoard.ui.updateDataBoard(curMapData.options, curMapData.type);
							}
						}
					}
				});
				//더보기 or 원래대로 메뉴 클릭시 원래대로 or 더보기  
				body.on("click", "#intro3dChartArea01>.typelabel>.btn-more>a", function(){
					if($("#intro3dChartArea01>.hideable").css("display")=="none"){
						$(this).text("원래대로..");
					}
					else if($("#intro3dChartArea01>.hideable").css("display")=="block"){
						$(this).text("더보기..");
					}
				});
				//더보기 or 원래대로 메뉴 클릭시 원래대로 or 더보기  
				body.on("click", "#intro3dChartArea02>.typelabel>.btn-more>a", function(){
					if($("#intro3dChartArea02>.hideable").css("display")=="none"){
						$(this).text("원래대로..");
					}
					else if($("#intro3dChartArea02>.hideable").css("display")=="block"){
						$(this).text("더보기..");
					}
				});
				//더보기 or 원래대로 메뉴 클릭시 원래대로 or 더보기  
				body.on("click", "#sigunguClassChartArea02>.typelabel>.btn-more>a", function(){
					if($("#sigunguClassChartArea02>.hideable").css("display")=="none"){
						$(this).text("원래대로..");
					}
					else if($("#sigunguClassChartArea02>.hideable").css("display")=="block"){
						$(this).text("더보기..");
					}
				});
				//더보기 or 원래대로 메뉴 클릭시 원래대로 or 더보기  
				body.on("click", "#sigunguClassChartArea04>.typelabel>.btn-more>a", function(){
					if($("#sigunguClassChartArea04>.hideable").css("display")=="none"){
						$(this).text("원래대로..");
					}
					else if($("#sigunguClassChartArea04>.hideable").css("display")=="block"){
						$(this).text("더보기..");
					}
				});
				
			},
			
			// 2019-04-21 djlee 추가 시작
			// 9차 10차 분기  추가 
			sensusCheck : function(checkVal , obj , type , className){
				$(obj).parent().find("a").removeClass("on");
				$(".sensus9 , .sensus10").find("a").removeClass("on");
				$(".sensus9,.sensus10").hide();
				$bizStatsDataBoard.ui.changePensionAndMinbakUI(checkVal);	// 2020년 SGIS고도화 3차(테마코드) 시작 - 9차에는 민박이 없으므로, 민박을 숨기고 대신 펜션을  펜션(민박)으로 바꾼다. (pse)
				if(checkVal == 9){
					$bizStatsMap.ui.lqMap.censusCheck="censusNine";// 2019-04-15 박길섭
					$(".sensus9").show();
					$(obj).parent().find("a").eq(0).addClass("on");
					// mng_s 20200218 김건민 (2018년 사업체 들어오면서 주석 처리함)
//					$(".sensus9 li").last().find("a").addClass("on");
//					$(".sensus9 a").each(function(i , elem){
//						if($(this).html()== '2017'){
//							$(this).addClass("on");
//						}
//					});
					// mng_e 20200218 김건민
					if(type == 1){
						$("."+className+" .sensus9 li").last().find("a").click();
					}else if(type == 2){
						$bizStatsDataBoard.ui.changeLqInfoYearDataBoard('2016');
					}else if(type == 3){
						$(".origin_txt_2").empty();
						$(".origin_txt_2").text("출처 : 통계청, 전국사업체조사 (2007 ~ 2016)");
						setTimeout(function(){
							$(".areaInfoChangeTab li").each(function(index,elem){
								if($(elem).find("a").hasClass("on")){
									eval($(elem).find("a").attr("href").replace("javascript:" , ""));
									return false;
								}
							});
						},400);
					}
					
					
				}else if(checkVal == 10){
					$bizStatsMap.ui.lqMap.censusCheck="censusTen";// 2019-04-15 박길섭
					$(".sensus10").show();
					console.log("$(obj).parent() = ");
					console.log($(obj).parent().html());
					$(obj).parent().find("a").eq(1).addClass("on");
					// mng_s 202020218 김건민 (2018년 사업체 추가 하면서 주석 처리함)
/*					$(".sensus10 a").each(function(i , elem){
						console.log($(this).html());
						if($(this).html()== '2017'){
							console.log("if");
							$(this).addClass("on");
						}
					});*/
					// mng_e 202020218 김건민
					if(type == 1){
						$("."+className+" .sensus10 li").last().find("a").click();
					}else if(type == 2){
						// mng_s 20210514 김건민 (사업체 2019년으로 변경)
						$bizStatsDataBoard.ui.changeLqInfoYearDataBoard('2019');
						// mng_s 20210514 김건민 (사업체 2019년으로 변경)
					}else if(type == 3){
						$(".origin_txt_2").empty();
						// mng_s 20210514 김건민 
						//$(".origin_txt_2").text("출처 : 통계청, 전국사업체조사 (2007 ~ 2016)");
						$(".origin_txt_2").text("출처 : 통계청, 전국사업체조사 (2019)");
						// mng_e 20210514 김건민
						setTimeout(function(){
							$(".areaInfoChangeTab li").each(function(index,elem){
								if($(elem).find("a").hasClass("on")){
									eval($(elem).find("a").attr("href").replace("javascript:" , ""));
									return false;
								}
							});
						},400);
					}
					
				}
				//2019-04-16 박길섭 시작
				if($("#lqIncreaseTab").css("display")=="block"){
					var theme_cd = $bizStatsMap.ui.lqMap.yearTheme_cd;
					var theme_nm = $bizStatsMap.ui.lqMap.yearTheme_nm;
					//var adm_cd = $bizStatsMap.ui.lqMap.adm_cd;
					var adm_nm = $bizStatsMap.ui.lqMap.adm_nm;
					$bizStatsDataBoard.ui.categoryYearDetailTabClick(theme_cd,theme_nm,null,adm_nm);
				}
				//2019-04-16 박길섭 끝
			},
			// 2019-04-21 djlee 추가 끝
			
			/**
			 * 
			 * @name         : dataBoardOpen
			 * @description  : 데이터보드를 오픈한다. 
			 * @date         : 2015. 11. 10. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */	
			dataBoardOpen : function() {
				pageCallReg();
				//데이터 보드가 닫혀있을 경우 오픈한다.
				if(!$(".bizStatsDataBoard").hasClass("on")) {
					$(".bizStatsDataBoard").click();
					$("#dataBoard").show();
				}
			}
	};
}(window, document));