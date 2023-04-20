/**   
 *
 * @JSName: totUseStat.js
 * @Description: 
 *
 * @author: LeeKH   
 * @date: 2016/05/03/ 10:30:00    
 * @version V1.0      
 *    
 */

//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  start
var viewGubn = [0, 0, 0, 0, 0, 0, 0]; //표, 그래프 전환 확인용 - 0 : 표, 1 : 그래프
var chartSeriesArray1 = ["페이지뷰", "방문자수", "연간 페이지뷰", "연간 방문자수"]; //column
var chartSeriesArray2 = ["주거현황보기", "추천지역찾기"]; //bar
var chartSeriesArray3 = ["페이지뷰", "연간 페이지뷰"]; //bar
var chartSeriesArray4 = ["주거현황보기", "연간 추천지역찾기"]; //bar
var chartSeriesArray5 = ["검색횟수"]; //bar
var chartSeriesArray6 = ["방문건수"]; //bar
var chartSeriesArray7 = ["검색건수"]; //bar
var chartCategoriesArray1 = [];
var chartCategoriesArray2 = [];
var chartCategoriesArray3 = [];
var chartCategoriesArray4 = [];
var chartCategoriesArray5 = [];
var chartCategoriesArray6 = [];
var chartCategoriesArray7 = [];
var chartDataArray1 = [];
var chartDataArray2 = [];
var chartDataArray3 = [];
var chartDataArray4 = [];
var chartDataArray5 = [];
var chartDataArray6 = [];
var chartDataArray7 = [];
//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  end

$(function () {
	//init();
	
	
	srvLogWrite("L0", "01", "03", "04", "", "");
	
	 $("#searchBtn").on('click',(function(e){
		 srvLogWrite("L0", "01", "03", "04", "", "");
		 getHouseAnalMapMenu();
		 getPopCondi();
		 getPopCondiMix();
		 getInterestArea();	
		 gethousePoiSear();	
		 
		 getDirectCall();
		 getLifeStyle();
  	  }));
	 
	 
	 $("#houseAnaMapTableExcelBtn").on('click',(function(e){
		 excelDownload("houseAnaMapTableExcel.xls", "houseAnaMapTable");
  	  }));
	 
	 $("#popCondiTblExcelBtn").on('click',(function(e){
		 excelDownload("popCondiTblExcel.xls", "popCondiTbl");
	 }));
	 
	 $("#popCondiMixTblExcelBtn").on('click',(function(e){
		 excelDownload("popCondiMixTblExcel.xls", "popCondiMixTbl");
	 }));
	 
	 $("#interestAreaTblExcelBtn").on('click',(function(e){
		 excelDownload("interestAreaTblExcel.xls", "interestAreaTbl");
	 }));
	 
	 $("#poiTblExcelBtn").on('click',(function(e){
		 excelDownload("poiTblExcel.xls", "poiTbl");
	 }));
	 
	 $("#directCallExcelBtn").on('click',(function(e){
		 excelDownload("directCallTblExcel.xls", "directCallTable");
	 }));
	 $("#lifeStyleExcelBtn").on('click',(function(e){
		 excelDownload("lifeStyleTblExcel.xls", "lifeStyleTable");
	 }));
	 
	 $("#totExcelBtn").on('click',(function(e){
		 var tblArray = ["houseAnaMapTable", "popCondiTbl", "popCondiMixTbl", "interestAreaTbl", "poiTbl", "directCallTable", "lifeStyleTable"];
		 excelDownload2("houseAnalysisTotal.xls", tblArray);
  	  }));
});





function init(){
	setFormAction();
	nowYearMonth();
	getHouseAnalMapMenu();		//메뉴별 이용현황
	setTimeout(function(){
		getPopCondi();				//인기지표(주거현황보기+추천지역찾기
	},500);
	setTimeout(function(){
		getPopCondiMix();			//인기지표조합(추천지역 찾기)
	},800);
	setTimeout(function(){
		getInterestArea();			//인기관심지역
	},1000);
	setTimeout(function(){
		gethousePoiSear();			//POI별 검색
	},1200);
	setTimeout(function(){
		getDirectCall();			//직접 호출검색
	},1400);
	setTimeout(function(){
		getLifeStyle();			//라이프스타일 호출검색
	},1400);
	//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  start
	$("#houseAnaMapGraphView").hide();
	$("#popCondiGraphView").hide();
	$("#popCondiMixGraphView").hide();
	$("#interestAreaGraphView").hide();
	$("#poiGraphView").hide();
	$("#directCallGraphView").hide();
	$("#lifeStyleGraphView").hide();
	//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  end
}


//moreViewBtn



function getHouseAnalMapMenu(){
	
	 var year = $("#yearSel").val();
	 var month = $("#monthSel").val();
	 
	 
	 //메뉴 조회
	 jQuery.ajax({
 		type:"POST",
 		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
 		dataType:'json', 
 		data:{
 				"gubun" 				: "getMenuView",
 				"year"					:	year	,
				"month"					:	month	,
				"type"					:	"J0"
 			  },
 		success:function(data){

 			
 			var swt = true;
 			$("#houseAnaMapTable tr").each(function(){
 				if(swt){
 					swt = false;
 				}else{
 					$(this).remove();
 				}
 			});
 			
 				
 	//			nowYear = data.result.getTotStatView[0].NOWYEAR;
 			
 			//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray1 = []; 
 			chartDataArray1 = [];
 			var visitViewArray = [];
 			var pageViewArray = [];
 			var monthVisitViewArray = [];
 			var monthPageViewArray = [];
 			
 			for(var i=0; i<data.result.getMenuView.length; i++){
 				var s_code_nm = data.result.getMenuView[i].S_CODE_NM;
 				var visitView = data.result.getMenuView[i].VISITVIEW;
 				var pageView = data.result.getMenuView[i].PAGEVIEW;
 				var monthVisitView = data.result.getMenuView[i].MONTHVISITVIEW;
 				var monthPageView = data.result.getMenuView[i].MONTHPAGEVIEW;

 				//tot.api_id,  count(0) as visitview, sum(count)as pageview, nvl(monthuse.visitview,0) as monthvisitview, nvl(monthuse.pageview,0) as monthpageview

 				var str = "";

 				str += "<tr>";
	 				str += "<td >" + s_code_nm + "</td>";
	 				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(monthPageView) + "</td>";
	 				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(monthVisitView) + "</td>";
	 				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(pageView) + "</td>";
	 				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(visitView) + "</td>";
 				str += "</tr>";
 				
 				$("#houseAnaMapBody").append(str);
 				
 				//차트 데이터 담기
 				chartCategoriesArray1.push(s_code_nm);
 				visitViewArray.push(Number(visitView));
 				pageViewArray.push(Number(pageView));
 				monthVisitViewArray.push(Number(monthVisitView));
 				monthPageViewArray.push(Number(monthPageView));
 			}
 			
 			var map = [];
 			map.push(monthPageViewArray);
 			map.push(monthVisitViewArray);
 			map.push(pageViewArray);
 			map.push(visitViewArray);
 			
 			//chart Series
 			for(var j=0; j<chartSeriesArray1.length; j++) {
 				var obj = 
 					{
 						name : chartSeriesArray1[j],
 						data : map[j]
 					};
 				
 				chartDataArray1.push(obj);
 			}
 			createChart("column", "houseAnaMapGraphView");
 			//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  end
 		},beforeSend:function(){
  	        $('.wrap-loading').removeClass('display-none');
  	    },complete:function(){
  	        $('.wrap-loading').addClass('display-none');
  	    },error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}
	});
}

function getPopCondi(){
	
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	
	
	//메뉴 조회
	jQuery.ajax({
		type:"POST",
		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
		dataType:'json', 
		data:{
			"gubun" 				: "getPopCondi",
			"year"					:	year	,
			"month"					:	month	,
		},
		success:function(data){
			
//			select condition
//			   ,min(decode(type, 'J01',cnt)) as J01
//			   ,min(decode(type, 'J02',cnt)) as J02
//			   ,(min(decode(type, 'J01',cnt)) + min(decode(type, 'J02',cnt))) as totsum
			
			
			var swt = true;
			$("#popCondiTbl tr").each(function(){
				if(swt){
					swt = false;
				}else{
					$(this).remove();
				}
			});
			
			//			nowYear = data.result.getTotStatView[0].NOWYEAR;
			
			//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray2 = []; 
 			chartDataArray2 = [];
 			var j01Array = [];
 			var j02Array = [];
 			
			for(var i=0; i<data.result.getPopCondi.length; i++){
				var j01 = data.result.getPopCondi[i].J01;
				var condition = data.result.getPopCondi[i].CONDITION;
				var j02 = data.result.getPopCondi[i].J02;
				var totSum = data.result.getPopCondi[i].TOTSUM;
				
				//tot.api_id,  count(0) as visitview, sum(count)as pageview, nvl(monthuse.visitview,0) as monthvisitview, nvl(monthuse.pageview,0) as monthpageview
				
				var str = "";
				str += "<tr>";
				str += "<td >" + (i+1) + " 순위</td>";
				str += "<td >" + condition + "</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(j01) + "</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(j02) + "</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(totSum) + "</td>";
				str += "</tr>";
				
				$("#popCondiBody").append(str);
				
				//차트 데이터 담기
 				chartCategoriesArray2.push(condition);
 				j01Array.push(Number(j01));
 				j02Array.push(Number(j02));
 			}
 			
 			var map = [];
 			map.push(j01Array);
 			map.push(j02Array);
 			
 			//chart Series
 			for(var j=0; j<chartSeriesArray2.length; j++) {
 				var obj = 
 					{
 						name : chartSeriesArray2[j],
 						data : map[j]
 					};
 				
 				chartDataArray2.push(obj);
 			}
 			createChart("bar", "popCondiGraphView");
 			//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  end
		},beforeSend:function(){
  	        $('.wrap-loading').removeClass('display-none');
  	    },complete:function(){
  	        $('.wrap-loading').addClass('display-none');
  	    },error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}
	});
}



function getPopCondiMix(){
	
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	
	
	//메뉴 조회
	jQuery.ajax({
		type:"POST",
		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
		dataType:'json', 
		data:{
			"gubun" 				: "getPopCondiMix",
			"year"					:	year	,
			"month"					:	month	,
		},
		success:function(data){
			
			var swt = true;
			$("#popCondiMixTbl tr").each(function(){
				if(swt){
					swt = false;
				}else{
					$(this).remove();
				}
			});
			
			//			nowYear = data.result.getTotStatView[0].NOWYEAR;
			
			//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray3 = []; 
 			chartDataArray3 = [];
 			var monCntArray = [];
 			var yrCntArray = [];
 			
			for(var i=0; i<data.result.getPopCondiMix.length; i++){
				var conditionMix = data.result.getPopCondiMix[i].CONDITION_MIX;
				var yrCnt = data.result.getPopCondiMix[i].YRCNT;
				var monCnt = data.result.getPopCondiMix[i].MONCNT;
				
				//tot.api_id,  count(0) as visitview, sum(count)as pageview, nvl(monthuse.visitview,0) as monthvisitview, nvl(monthuse.pageview,0) as monthpageview
				
				var str = "";
				str += "<tr>";
				str += "<td >" + (i+1) + " 순위</td>";
				str += "<td >" + conditionMix + "</td>";
				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(monCnt) + "</td>";
				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(yrCnt) + "</td>";
				str += "</tr>";
				
				$("#popCondiMixBody").append(str);
				
				//차트 데이터 담기
				//길이 20자로 제한
				if(conditionMix.length > 20) {
					conditionMix = conditionMix.substr(0, 20) + "..";
				}
 				chartCategoriesArray3.push(conditionMix);
 				monCntArray.push(Number(monCnt));
 				yrCntArray.push(Number(yrCnt));
 			}
 			
 			var map = [];
 			map.push(monCntArray);
 			map.push(yrCntArray);
 			
 			//chart Series
 			for(var j=0; j<chartSeriesArray3.length; j++) {
 				var obj = 
 					{
 						name : chartSeriesArray3[j],
 						data : map[j]
 					};
 				
 				chartDataArray3.push(obj);
 			}
 			createChart("bar", "popCondiMixGraphView");
 			//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  end
		},beforeSend:function(){
  	        $('.wrap-loading').removeClass('display-none');
  	    },complete:function(){
  	        $('.wrap-loading').addClass('display-none');
  	    },error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}
	});
}


function getInterestArea(){
	
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	
	
	//메뉴 조회
	jQuery.ajax({
		type:"POST",
		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
		dataType:'json', 
		data:{
			"gubun" 				: "getInterestArea",
			"year"					:	year	,
			"month"					:	month	,
		},
		success:function(data){
			
			var swt = true;
			$("#interestAreaTbl tr").each(function(){
				if(swt){
					swt = false;
				}else{
					$(this).remove();
				}
			});
			
			//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray4 = []; 
 			chartDataArray4 = [];
 			var j01Array = [];
 			var j02Array = [];
			
			for(var i=0; i<data.result.getInterestArea.length; i++){
				var j01 = data.result.getInterestArea[i].J01;
				var j02 = data.result.getInterestArea[i].J02;
				var admNm = data.result.getInterestArea[i].ADM_NM;
				var totSUm = data.result.getInterestArea[i].TOTSUM;
				
				//tot.api_id,  count(0) as visitview, sum(count)as pageview, nvl(monthuse.visitview,0) as monthvisitview, nvl(monthuse.pageview,0) as monthpageview
				
				var str = "";
				str += "<tr>";
				str += "<td >" + (i+1) + " 순위</td>";
				str += "<td >" + admNm + "</td>";
				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(j01) + "</td>";
				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(j02) + "</td>";
				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(totSUm) + "</td>";
				str += "</tr>";
				
				$("#interestAreaBody").append(str);
				
				//차트 데이터 담기
 				chartCategoriesArray4.push(admNm);
 				j01Array.push(Number(j01));
 				j02Array.push(Number(j02));
 			}
 			
 			var map = [];
 			map.push(j01Array);
 			map.push(j02Array);
 			
 			//chart Series
 			for(var j=0; j<chartSeriesArray4.length; j++) {
 				var obj = 
 					{
 						name : chartSeriesArray4[j],
 						data : map[j]
 					};
 				
 				chartDataArray4.push(obj);
 			}
 			createChart("bar", "interestAreaGraphView");
 			//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  end
		},beforeSend:function(){
  	        $('.wrap-loading').removeClass('display-none');
  	    },complete:function(){
  	        $('.wrap-loading').addClass('display-none');
  	    },error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}
	});
}


function gethousePoiSear(){
	
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	
	
	//메뉴 조회
	jQuery.ajax({
		type:"POST",
		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
		dataType:'json', 
		data:{
			"gubun" 				: "gethousePoiSear",
			"year"					:	year	,
			"month"					:	month	,
		},
		success:function(data){
			var totalVal1 = 0;		//학구도
			var totalVal2 = 0;		//생활변화교통
			var totalVal3 = 0;		//교육
			var totalVal4 = 0;		//복지문화
			
			
			
			
			
			var totalV1_1 = 0;		// 초등학고
			var totalV1_2 = 0;		// 중학교
			var totalV1_3 = 0;		// 고등학교
			
			var totalV2_1 = 0;		// 편의시설
			var totalV2_2 = 0;		// 쇼핑시설
			var totalV2_3 = 0;		// 외식시설
			var totalV2_4 = 0;		// 버스정류장
			var totalV2_5 = 0;		// 지하철
			
			var totalV3_1 = 0;		// 전문대학
			var totalV3_2 = 0;		// 대학교
			var totalV3_3 = 0;		// 대학원
			var totalV3_4 = 0;		// 교습학원
			var totalV3_5 = 0;		// 어학원
			var totalV3_6 = 0;		// 예체능학원

			var totalV4_1 = 0;		// 유치원(어린이보육업)
			var totalV4_2 = 0;		// 어린이집
			var totalV4_3 = 0;		// 병원
			var totalV4_4 = 0;		// 노인복지시설
			var totalV4_5 = 0;		// 사회복지시설
			var totalV4_6 = 0;		// 극장/영화관
			var totalV4_7 = 0;		// 도서관/박물관
			var totalV4_8 = 0;		// 공연단체
			var totalV4_9 = 0;		// 스포츠/서비스업
			
			for(var i=0; i<data.result.gethousePoiSear.length; i++){
				var parameter = data.result.gethousePoiSear[i].PARAMETER;
				var cnt = data.result.gethousePoiSear[i].CNT;
				
				//학구도
				if("초등학교" == parameter){
					totalVal1 = totalVal1 + cnt;
					totalV1_1 = totalV1_1 + cnt;
					
					
				}else if("중학교" == parameter){
					totalVal1 = totalVal1 + cnt;
					totalV1_2 = totalV1_1 + cnt;
					
				}else if("고등학교" == parameter){
					totalVal1 = totalVal1 + cnt;
					totalV1_3 = totalV1_1 + cnt;
					
				}
				
				
				//생활편의교통
				//편의시설
				else if("행정기관" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_1 = totalV2_1 + cnt
				}else if("우체국" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_1 = totalV2_1 + cnt
					
				}else if("경찰" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_1 = totalV2_1 + cnt
					
				}else if("소방서" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_1 = totalV2_1 + cnt
					
				}else if("은행" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_1 = totalV2_1 + cnt
					
				//쇼핑시설
				}else if("백화점/중대형마트" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_2 = totalV2_2 + cnt
					
				}else if("슈퍼마켓" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_2 = totalV2_2 + cnt
					
				}else if("편의점" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_2 = totalV2_2 + cnt
					
				}else if("식료품점" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_2 = totalV2_2 + cnt
					
				//외식시설
				}else if("한식" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_3 = totalV2_3 + cnt
					
				}else if("중식" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_3 = totalV2_3 + cnt
					
				}else if("일식" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_3 = totalV2_3 + cnt
					
				}else if("분식" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_3 = totalV2_3 + cnt
					
				}else if("서양식" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_3 = totalV2_3 + cnt
					
				}else if("제과점" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_3 = totalV2_3 + cnt
					
				}else if("패스트푸드" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_3 = totalV2_3 + cnt
					
				}else if("치킨" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_3 = totalV2_3 + cnt
					
				}else if("호프및간이주점" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_3 = totalV2_3 + cnt
					
				}else if("호프및간이주점" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_3 = totalV2_3 + cnt
					
				}else if("카페" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_3 = totalV2_3 + cnt
					
				}else if("기타외국식" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_3 = totalV2_3 + cnt
					
				}else if("버스정류장" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_4 = totalV2_4 + cnt
					
				}else if("지하철" == parameter){
					totalVal2 = totalVal2 + cnt;
					totalV2_5 = totalV2_5 + cnt
					
					
				//교육
				}else if("전문대학" == parameter){
					totalVal3 = totalVal3 + cnt;
					totalV3_1 = totalV3_1 + cnt
					
				}else if("대학교" == parameter){
					totalVal3 = totalVal3 + cnt;
					totalV3_2 = totalV3_2 + cnt
					
				}else if("대학원" == parameter){
					totalVal3 = totalVal3 + cnt;
					totalV3_3 = totalV3_3 + cnt
					
				}else if("교습학원" == parameter){
					totalVal3 = totalVal3 + cnt;
					totalV3_4 = totalV3_4 + cnt
					
				}else if("어학원" == parameter){
					totalVal3 = totalVal3 + cnt;
					totalV3_5 = totalV3_5 + cnt
					
				}else if("예체능학원" == parameter){
					totalVal3 = totalVal3 + cnt;
					totalV3_6 = totalV3_6 + cnt
				
				//복지문화
				}else if("유치원(어린이보육업)" == parameter){
					totalVal4 = totalVal4 + cnt;
					totalV4_1 = totalV4_1 + cnt
					
				}else if("어린이집" == parameter){
					totalVal4 = totalVal4 + cnt;
					totalV4_2 = totalV4_2 + cnt
					
				}else if("병원" == parameter){
					totalVal4 = totalVal4 + cnt;
					totalV4_3 = totalV4_3 + cnt
					
				}else if("노인복지시설" == parameter){
					totalVal4 = totalVal4 + cnt;
					totalV4_4 = totalV4_4 + cnt
					
				}else if("사회복지시설" == parameter){
					totalVal4 = totalVal4 + cnt;
					totalV4_5 = totalV4_5 + cnt
					
				}else if("극장/영화관" == parameter){
					totalVal4 = totalVal4 + cnt;
					totalV4_6 = totalV4_6 + cnt
					
				}else if("도서관/박물관" == parameter){
					totalVal4 = totalVal4 + cnt;
					totalV4_7 = totalV4_7 + cnt
					
				}else if("공연단체" == parameter){
					totalVal4 = totalVal4 + cnt;
					totalV4_8 = totalV4_8 + cnt
					
				}else if("스포츠서비스업" == parameter){
					totalVal4 = totalVal4 + cnt;
					totalV4_9 = totalV4_9 + cnt
					
				}
				
				
				
				
			}
			
			$("#totalVal1").html(totalVal1);
			$("#totalVal2").html(totalVal2);
			$("#totalVal3").html(totalVal3);
			$("#totalVal4").html(totalVal4);
			
			
			$("#totalV1_1").html(totalV1_1);
			$("#totalV1_2").html(totalV1_2);
			$("#totalV1_3").html(totalV1_3);

			$("#totalV2_1").html(totalV2_1);
			$("#totalV2_2").html(totalV2_2);
			$("#totalV2_3").html(totalV2_3);
			$("#totalV2_4").html(totalV2_4);
			$("#totalV2_5").html(totalV2_5);
			
			$("#totalV3_1").html(totalV3_1);
			$("#totalV3_2").html(totalV3_2);
			$("#totalV3_3").html(totalV3_3);
			$("#totalV3_4").html(totalV3_4);
			$("#totalV3_5").html(totalV3_5);
			$("#totalV3_6").html(totalV3_6);
			
			$("#totalV4_1").html(totalV4_1);
			$("#totalV4_2").html(totalV4_2);
			$("#totalV4_3").html(totalV4_3);
			$("#totalV4_4").html(totalV4_4);
			$("#totalV4_5").html(totalV4_5);
			$("#totalV4_6").html(totalV4_6);
			$("#totalV4_7").html(totalV4_7);
			$("#totalV4_8").html(totalV4_8);
			$("#totalV4_9").html(totalV4_9);
			
			//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray5 = 
 				["초등학고", "중학교", "고등학교", 
 				 "편의시설", "쇼핑시설", "외식시설", "버스정류장", "지하철", 
 				 "전문대학", "대학교", "대학원", "교습학원", "어학원", "예체능학원", 
 				 "유치원(어린이보육업)", "어린이집", "병원", "노인복지시설", "사회복지시설", "극장/영화관", "도서관/박물관", "공연단체", "스포츠/서비스업"]; 
 			chartDataArray5 = [];
			
 			var map = [];
 			//차트 데이터 담기
 			map.push(Number(totalV1_1));
 			map.push(Number(totalV1_2));
 			map.push(Number(totalV1_3));
 			map.push(Number(totalV2_1));
 			map.push(Number(totalV2_2));
 			map.push(Number(totalV2_3));
 			map.push(Number(totalV2_4));
 			map.push(Number(totalV2_5));
 			map.push(Number(totalV3_1));
 			map.push(Number(totalV3_2));
 			map.push(Number(totalV3_3));
 			map.push(Number(totalV3_4));
 			map.push(Number(totalV3_5));
 			map.push(Number(totalV3_6));
 			map.push(Number(totalV4_1));
 			map.push(Number(totalV4_2));
 			map.push(Number(totalV4_3));
 			map.push(Number(totalV4_4));
 			map.push(Number(totalV4_5));
 			map.push(Number(totalV4_6));
 			map.push(Number(totalV4_7));
 			map.push(Number(totalV4_8));
 			map.push(Number(totalV4_9));
 			
 			//chart Series
 			for(var j=0; j<chartSeriesArray5.length; j++) {
 				var obj = 
 					{
 						name : chartSeriesArray5[j],
 						data : map
 					};
 				
 				chartDataArray5.push(obj);
 			}
 			createChart("bar", "poiGraphView");
 			//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  end
		},beforeSend:function(){
  	        $('.wrap-loading').removeClass('display-none');
  	    },complete:function(){
  	        $('.wrap-loading').addClass('display-none');
  	    },error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}
	});
}




function getDirectCall(){
	
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	
	
	//메뉴 조회
	jQuery.ajax({
		type:"POST",
		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
		dataType:'json', 
		data:{
			"gubun" 				: "getDirectCall",
			"year"					:	year	,
			"month"					:	month	,
		},
		success:function(data){
			
			var swt = true;
			$("#directCallTable tr").each(function(){
				if(swt){
					swt = false;
				}else{
					$(this).remove();
				}
			});
			
			//			nowYear = data.result.getTotStatView[0].NOWYEAR;
			
			//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray6 = []; 
 			chartDataArray6 = [];
 			var cntArray = [];
 			
			for(var i=0; i<data.result.getDirectCall.length; i++){
				var cnt = data.result.getDirectCall[i].CNT;
				var address = data.result.getDirectCall[i].ADDRESS;
				
				//tot.api_id,  count(0) as visitview, sum(count)as pageview, nvl(monthuse.visitview,0) as monthvisitview, nvl(monthuse.pageview,0) as monthpageview
				
				var str = "";
				str += "<tr>";
				str += "<td style=\"text-align:left;\">" + address + "</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(cnt) + "</td>";
				str += "</tr>";
				
				$("#directCallBody").append(str);
					
				//차트 데이터 담기
 				chartCategoriesArray6.push(address);
 				cntArray.push(Number(cnt));
 			}
	 			
	 			//chart Series
	 			for(var j=0; j<chartSeriesArray6.length; j++) {
	 				var obj = 
	 					{
	 						name : chartSeriesArray6[j],
	 						data : cntArray
	 					};
	 				
	 				chartDataArray6.push(obj);
	 			}
	 			createChart("bar", "directCallGraphView");
	 			//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  end
		},beforeSend:function(){
  	        $('.wrap-loading').removeClass('display-none');
  	    },complete:function(){
  	        $('.wrap-loading').addClass('display-none');
  	    },error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}
	});
}
//mng_s 201710109 lifestyle 추가 leekh
function getLifeStyle(){
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	
	
	//메뉴 조회
	jQuery.ajax({
		type:"POST",
		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
		dataType:'json', 
		data:{
			"gubun" 				: "getLifeStyle",
			"year"					:	year	,
			"month"					:	month	,
		},
		success:function(data){
			
			var swt = true;
			$("#lifeStyleTable tr").each(function(){
				if(swt){
					swt = false;
				}else{
					$(this).remove();
				}
			});
			//data Array 생성 및 초기화
			chartCategoriesArray7 = []; 
 			chartDataArray7 = [];
 			var cntArray = [];
 			
			var totalSum = 0;
			//			nowYear = data.result.getTotStatView[0].NOWYEAR;
			for(var i=0; i<data.result.getLifeStyle.length; i++){
				var cnt = data.result.getLifeStyle[i].CNT;
				var parameter = data.result.getLifeStyle[i].PARAMETER;
				
				
				
				totalSum += parseInt(cnt);
				
				//tot.api_id,  count(0) as visitview, sum(count)as pageview, nvl(monthuse.visitview,0) as monthvisitview, nvl(monthuse.pageview,0) as monthpageview
				
				if("LF1" == parameter){
					parameter = "대학생활을 시작하는 새내기";
				}else if("LF2" == parameter){
					parameter = "문화생활이 좋은 1인가구";
					
				}else if("LF3" == parameter){
					parameter = "육아에 열중하는 신혼부부";
					
				}else if("LF4" == parameter){
					parameter = "어린이를 키우는 맞벌이 부부";
					
				}else if("LF5" == parameter){
					parameter = "중고생을 키우는 학부모";
					
				}else if("LF6" == parameter){
					parameter = "왕성한 액티브 시니어";
					
				}else if("LF7" == parameter){
					parameter = "편안한 휴식이 좋은 은퇴세대";
					
				}			
				
				var str = "";
				str += "<tr>";
				str += "<td style=\"text-align:left;\">" + parameter + "</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(cnt) + "</td>";
				str += "</tr>";
				
				$("#lifeStyleBody").append(str);
				
				//차트 데이터 담기
				chartCategoriesArray7.push(parameter);
 				cntArray.push(Number(cnt));
				
			}
			//chart Series
 			for(var j=0; j<chartSeriesArray7.length; j++) {
 				var obj = 
 					{
 						name : chartSeriesArray7[j],
 						data : cntArray
 					};
 				
 				chartDataArray7.push(obj);
 			}
 			createChart("bar", "lifeStyleGraphView");
 			
			var str = "";
			str += "<tr>";
			str += "<td style=\"text-align:left;\"> 합계</td>";
			str += "<td style=\"text-align:right;\">" + appendCommaToNumber(totalSum) + "</td>";
			str += "</tr>";
			
			$("#lifeStyleBody").append(str);
			
 			
 			
		},
		error:function(data) {
			
			alert("ajaxFail");
			alert(data);
		}
	});
	
	
}
//mng_e 201710109 lifestyle 추가 leekh

//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  start
//차트보기 - str1 : chart 구분, str2 : div id
function createChart(str1, str2) {
	var tempCategories = []; tempSeries = []; tempPlotOptions = { visible: false };
	
	if(str2 == "houseAnaMapGraphView") {
		tempCategories = chartCategoriesArray1;
		tempSeries = chartDataArray1;
	} else if(str2 == "popCondiGraphView") {
		tempCategories = chartCategoriesArray2;
		tempSeries = chartDataArray2;
		tempPlotOptions = {
		        series: {
		            stacking: 'normal'
		        }
		    };
	} else if(str2 == "popCondiMixGraphView") {
		tempCategories = chartCategoriesArray3;
		tempSeries = chartDataArray3;
	} else if(str2 == "interestAreaGraphView") {
		tempCategories = chartCategoriesArray4;
		tempSeries = chartDataArray4;
		tempPlotOptions = {
		        series: {
		            stacking: 'normal'
		        }
		    };
	} else if(str2 == "poiGraphView") {
		tempCategories = chartCategoriesArray5;
		tempSeries = chartDataArray5;
	}else if(str2 == "lifeStyleGraphView"){
		tempCategories = chartCategoriesArray7;
		tempSeries = chartDataArray7;
	} else {
		tempCategories = chartCategoriesArray6;
		tempSeries = chartDataArray6;
	}
	
	$("#"+str2).highcharts({
    chart: {
        type: str1
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
    	categories : tempCategories,
        labels: {
            rotation: 0,
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        },
        labels: {
            rotation: 0,
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    legend: {
        enabled: true
    },
    plotOptions: tempPlotOptions,
    series: tempSeries
});
}

//표 <-> 그래프 전환
//gubn : 0(메뉴별 이용현황) 1(인기지표 (주거현황보기 + 추천지역찾기)) 2(인기지표조합(추천지역 찾기)) 3(인기 관심지역) 4(POI별 검색) 5(외부 호출) 6(라이프스타일별 지표설정)
//str1 : 표 id, str2 : 그래프 id, str3 : 버튼 id
function changeType(gubn, str1, str2, str3) {
	if(viewGubn[gubn] == 0) { // 현재 표 -> 그래표 전환
		 viewGubn[gubn] = 1;
		 $("#"+str1).hide();
		 $("#"+str2).show();
		 $("#"+str3).html('<img style="margin-top:5px;" src="./../include/img/btn/btn_grid_view.png" alt="표보기" />');
	 } else { // 현재 그래프 -> 표 전환
		 viewGubn[gubn] = 0;
		 $("#"+str1).show();
		 $("#"+str2).hide();
		 $("#"+str3).html('<img style="margin-top:5px;" src="./../include/img/btn/btn_graph_view.png" alt="그래프보기" />');
	 }
}
//2017.07.18 [개발팀] khc 살고싶은 우리동네 이용현황 그래프보기 추가  end