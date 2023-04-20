<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>	
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>관심주제 이용현황</title>
	<%@include file="/jsp/include/ststisticsScript.jsp" %>
	<style>
		
		/*============ 차트 관련 스타일링 시작  ============*/
		#chartWrapper {
			width: 745px;
			margin: 0 auto;
			/* position 속성 highcharts를 사용하면 내부에서 쓰이기 clearfix hack을 사용하지 않고  hidden을 줘야 갑자기 아래로 툭 떨어지지 않습니다 */
			overflow: hidden;		
		}
		
		
		/* 2개의 파이 차트는 옆으로 나열된다. */
		div[id^=pieChartFor] {
			float: left;
			width: 50%;
			height:350px;
		}
		
		/* 2개의 가로 막대 차트는 위, 아래로 나열된다. */
		div[id^=spileChartFor] {
			width: 100%;
		    margin-top: 40px;
		    margin-bottom: 20px;
		}
		
		.ChartInterestWrapper, .ChartPieWrapper  {
			margin-top: 3rem;
			display: none;
		}
		
		.ChartInterestWrapper.on, .ChartPieWrapper.on {
			display: block;
		}
		
		/* 차트 제목 크기가 .tilte03와 크기를 같게 함 */
		.highcharts-title > tspan {
			font-size: 18px; 
		}
		/*============ 차트 관련 스타일링 끝  ============*/
		
		
		/* 조회조건 - 차트 유형 스타일링 시작  */
		input[type=radio][name=ChartSelect] {
			vertical-align:middle;
		}
		
		input[type=radio][name=ChartSelect] + label {
			margin:0px 15px 0px 5px;
		}
		
		
		input[type=radio][name=ChartSelect]:checked + label {
			font-weight:bold;
		}
		/* 조회조건 - 차트 유형 스타일링 끝 */
		
		
		
	</style>
	<script>
	
		// 코드 분석시에는 위에서부터 읽으시면 됩니다. 실제 작성 순서도 위에서 아래입니다.
		
		
		// 이용현황 테이블에 있는 컬럼의 값들을 배열로 저장해서 반환하는 함수
		function getColumnArray(columnClassName) {
			var arr = [];
			$('#lifeCycleAndInterestTable td.'+columnClassName).each(function(a,b){
				var cellValue = b.innerText;
				
				// 공백에 대한 처리
				// 참고) jquery의 each loop에서는 return true가  for loop의 continue와 같다.
				if(cellValue.length === 0) return true; 
				
				// 숫자에 대한 처리
				if(isFinite(cellValue)) {			
					cellValue = parseFloat(cellValue);//.toFixed(1);
				}
				
				arr.push(cellValue);
				
			});
			return arr;
		}
		
		
		// 파이 차트에 맞는 data 값을 생성하는 메서드, 중첩 배열을 생성 및 반환한다.
		// ex)
		/*
		[
	      ['한글', 45.0],
	      ['IE', 26.8],
	      ['Safari', 8.5],
	      ['Opera', 6.2],
	      ['Others', 0.7]
	    ]
		*/
		function mkPieData(names,percentages) {
			
			if(!(Array.isArray(names) && Array.isArray(percentages))) {
				console.error('the parameter must be type of Array');
				return;
			}
			
			var arr = [];
			var length =  0;
			
			if(names.length === percentages.length) {
				length = names.length;
			} else {
				console.error('parameter [names] and [percentages] array must have the SAME LENGTH');
			}
			
			
			for(var i = 0 ; i < length ; i++) {
			    arr.push([names[i],percentages[i]]);
			}
			
			return arr;
		}
		
		
		// 가로 막대 차트에 맞는 data 값을 생성하는 메서드, names과 values 속성을 가진 객체를 생성 및 반환한다.
		// ex)
		/*
			{
				names : ['a','b','c','b'],
				values: [14.0, 97.2, 79.2, 6.3]
			}
		*/
		function mkSplineData(names,percentages) {
			
			if(!(Array.isArray(names) && Array.isArray(percentages))) {
				console.error('the parameter must be type of Array');
				return;
			}
			
			// 반환하는 객체가 파라미터로 넘어오는 원본 배열를 참조하는 것을 방지하기 위한 slice() 사용
			return {
				names : names.slice(),
				values : percentages.slice()
			}	
		}
		
		
		// 막대 차트 그리는 함수
		function drawSpileChart(target,title,data) {
			
			if(!data.hasOwnProperty('names') || !data.hasOwnProperty('values')) {
				console.error('the parameter \'data\' object must have [names] and [values] property!');
				return;
			}
			
			var chartOptions = {
	            chart: {
	                renderTo: target,
	                type: 'spline'
	            },
	            plotOptions: {
	            	spline: {
	              		 showInLegend: false,		// 가로막대 차트는 밑에 기본으로 나오는 legend를 쓰지 않겠다.
	                }
	            },
	            title: {
	                text: title
	            },
	            xAxis: {
	                categories: data.names
	            },
	            yAxis: {
	                title: 'Value'
	            },
	            series: [{
	                name: '선택 비율(%)',
	                data: data.values
	            }]
	        }
			
			return new Highcharts.Chart(chartOptions);
			
		}
		
		
		
		// 파이 차트 그리는 함수
		function drawPieChart(target,title,data) {
			
			// 들어온 data가 적절한지를 확인합니다.
			if(!Array.isArray(data)){
				var notRightData = data.filter(function(arr){
					return !Array.isArray(arr) || arr.length !== 2;
				})
				
				if(notRightData.length) { // "맞지 않는 데이터가 하나로도 있으면 안된다" 라고 이해하면 된다.
					console.error('the parameter \'data\' must be Array which has it\'s own array elements having length 2');
					return;
				}
			}
			
			
			// pie 차트 옵션 지정
			var chartOptions = {
	               chart: {
	            	   type: 'pie',
	                   renderTo: target, 
	                   plotBackgroundColor: null,
	                   //plotBorderWidth: null,
	                   borderColor: 'black',
        			   borderWidth: 0.5,
	                   plotShadow: false,
	                   events: {		 	
	                	   load: function () {	// 파이차트의 로딩이 끝나면 호출되는 콜백이다.
	                			// 통계거리 pie 차트는 lengend 박스와의 거리차이가 생애주기와 비슷하지 않아서 수정했다. css로 수정을 시도했으나 되지 않아서, 어쩔 수 없이 이렇게 했다.
	                			$('#pieChartForInterest svg > g.highcharts-legend').attr("transform","translate(220,90)");
	                			//$('#pieChartForInterest text.highcharts-title > tspan').attr("x","213");
	                	   }
	                   }
	               },
	
	               title: {
	                   text: title,
	                   y:50
	               },
	               tooltip: {
	                   //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	                   // 마우스 포인트를 갔다 댔을 대 보이는 이름과 값이다.
	                   formatter: function () {
	                       if (this.point.y == 0) {	//0일 경우 N/A로 처리
	                           return "";
	                       } else {
	                           //return this.point.name + ' <b>' + this.point.y + '%</b>';
	                       	return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.point.y, 1) + '%';
	                       }
	                   }
	               },
					plotOptions: {
						pie: {
							allowPointSelect: true, // pie를 클릭할때 반응하는 것에대한 것이다. 별로 의미가 없다.
							size: 170,              // 이 값을 차트 주변에 다른 것들(legend, label 등)을 넣어도 차트의 크기는 고정된 크기를 유지한다.
	                       							// 기본적으로 차트 주변에 다른것들이 그려지면 차트는 그에 맞게 줄어드는 특성을 방지하는 것이다.
							/* center: ["50%", "50%"], */
							showInLegend: true,		//범례를 보여준다.
							dataLabels: {
								enabled: false // 기본값은 true인듯하며, 
							},
							point: {
	                    	   events: { // legend가 눌려도 반응하지 않도록 했다. legend가 눌리면, legend를 감싸고 있는 박스가 오른쪽으로 치워쳐진다.
	                    	    	legendItemClick: function(){
		                    	     this.slice(null);
		                    	     return false;
	                    	    	}
								}
							}
	                   }
	               },
	               legend: {
	                    align: 'right',
	                    layout: 'vertical',
	                    verticalAlign: 'top',
	                    itemMarginTop: 5,	//범례 하나당 위의 여유 공간을 둔다.
	                    itemMarginBottom: 5,//범례 하나당 아래의 여유공간을 둔다.
	                    x: 0,				// 오른쪽 기준에서 0 만큼의 위치
	                    y: 80,				// 오른쪽 위에서 80만큼 내려온 위치
	                    MarginLeft : 0,
	                    borderWidth:0,
	                    labelFormatter: function () {
	                        return this.name + ' : ' + (this.y ? this.y : 0)+ '%'
	                    }
	                },
	                series: [{
	                   //type: 'pie',
	                   name: '',
	                   colors: ['#3366CC','#DC3912','#FF9900','#109618','#990099','#0099C6','#DD4477','#66AA00'],
	                   colorByPoint: true,
	                   data: data
	               }]
	           }// end of chartOptions
	
			return new Highcharts.Chart(chartOptions);
		}
		
		// 함수를 역할별로 나눈건 좋았지만, drawPieChart 함수를 사용하기까지 준비해야할 데이터가 많아서 
		// drawPieChart 함수보다 간략한 사용할 수 있는 함수를 하나 더 생성한다.
		function DrawPieChartShortcut() {
			// 1. 생애주기와 생애주기 선택 비율 컬럼 값들을 통해서 PieChart에 사용할 데이터를 수집한다.
			var pieChartDataForInterest = mkPieData(getColumnArray('interest'),getColumnArray('interestSelectPercentage'));
			
			// 2. 통계거리와 통계거리 선택 비율 컬럼 값들을 통해서 PieChart에 사용할 데이터를 수집한다.
			var pieChartDataForLifeCycle =  mkPieData(getColumnArray('lifeCycle'),getColumnArray('lifeCycleSelectPercentage'));
			
			// 3. 파이차트를 그려주는 함수 호출, 파라미터 ==> 1.차트를 그릴 div의 id 값  , 2.차트 위에 나올 제목 , 3.차트를 그리기 위한 데이터  
			drawPieChart('pieChartForLifeCycle','생애주기',pieChartDataForLifeCycle);
			drawPieChart('pieChartForInterest','관심분야',pieChartDataForInterest);
		}
		
		// 위와 비슷한 함수이다. 단지 그리는 차트가 가로 막대 차트라는 차이뿐이다.
		function DrawSplineShortcut() {
			var splineChartDataForLifeCycle =  mkSplineData(getColumnArray('lifeCycle'),getColumnArray('lifeCycleSelectPercentage'));
			var splineChartDataForInterest = mkSplineData(getColumnArray('interest'),getColumnArray('interestSelectPercentage'));
			drawSpileChart('spileChartForLifeCycle','생애주기',splineChartDataForLifeCycle);
			drawSpileChart('spileChartForInterest','관심분야',splineChartDataForInterest);
		}
		
		
		//<table> 의 <tbody> 내용 수정하는 메서드
		function insertDataToTable(response) { 
			$('#lifeCycleAndInterestTable tbody').remove();
			var html = '<tbody>';
			response.statDistanceList.forEach(function(a,b){ // statDistanceList 가 8개 ,  lfeCycleList가 7개여서 더 긴것을 기준으로 for문을 돌림
			    html += '<tr>';
			    html += '<th class="number">'+(b+1)+'</th>';
			    html += '<td class="lifeCycle">'+(response.lifeCycleList[b] ? response.lifeCycleList[b].lfeCycleNm : '')+'</td>';
			    html += '<td class="lifeCycleSelectPercentage">'+(response.lifeCycleList[b] ? response.lifeCycleList[b].percentage: '')+'</td>';
			    html += '<td class="interest">'+a.statDistanceNm+'</td>'
			    html += '<td class="interestSelectPercentage">'+a.percentage+'</td>'
			    html += '</tr>';
			})
			html += '</tbody>';
			$('#lifeCycleAndInterestTable').append(html);
		}
		
		
		
		
		// AJAX를 통해서 받은 데이터로 <table> 의 내용을 수정한다. 
		/* function updateTableData() {
			
			// 01. 테이블에 있던 데이터 제거
			$('#lifeCycleAndInterestTable tbody').remove();
			
			// 02. AJAX 요청
			ststistics.asynchronous(
			    {
					url : '/api/ststistics/getStstisticsUSInterestingTopicMng.do' , 
					callback : function(response){
						insertDataToTable(response);	// 1. 테이블에 response를 통해서 실제 데이터를 <table> 에 넣고 화면에 표출합니다.
						
						// 2. 강제적으로 "파이 차트" 라디오 버튼을 클릭합니다. 이렇게 함으로써 테이블에 있는 데이터를 기반으로 파이 차트를 다시 그립니다.
						// 참고. 3-1)dummySelect style="display:none" 을 해서 보이지 않습니다.
						//			dummySelect 의 역할은 그저 #ChartPieSelect 가 선택되어 있는 상태에서 클릭을 못하기 때문에
						//			잠시 radio 버튼이 체크 된것을 dummySelect 에 뒀다가 다시 ChartPieSelect에 두는 것입니다.
						$('#dummySelect').click();
						$('#ChartPieSelect').click();
					}
					
			    }
			);
			
		} */
		
		
		
		
		
		/*--------- <table> 의 <tbody> 내용 수정하는 메서드 작성 (시작) ----------*/
		
		
		$(document).ready(function(){
			
			// 달력 세팅
			setDatepickerDefaultRangeNew('startDate','endDate');
			
			ststistics.asynchronous(
			    {
			        url : '/api/ststistics/getStstisticsUSInterestingTopicMng.do' , 
			        /* 
			        data 넘기는 2가지 방식
			        
			        1. {'some1':'some1','some2':'some2'}
					2.  ststistics.serialize("#resetForm")
			        
					*/
			        callback : function(response){
			           insertDataToTable(response);
			           DrawPieChartShortcut(); // 이 부분을 radioButton 클릭으로 바꾼다.
			        }
			    }
			);
			
			
			$('.radioBtnWrapper').on('change','input[type=radio]',function(e){
				//console.log(this);
				console.log(e.target.value);
				var targetValue = e.target.value;
			    var SelectedChart = targetValue.substring(0,targetValue.indexOf('Select'));
				var chart = $('.'+SelectedChart+'Wrapper');
				
				if(this.id === 'dummySelect') return;
				
				console.log(chart);
				// 어느 차트를 보여주 건 일단 모든 차트를  보이지 않게 한다.
				$('#chartWrapper > div[class*="on"]').removeClass("on");
				// 현재 선택한 차트를 화면에 보여준다.
				// 주의: chart.addClass("on"); 를 DrawPieChartShortcut(); 이후에 호출하면 화면이 이상하게 보입니다.
				//      반드시 chart.addClass("on");를   DrawPieChartShortcut(); 보다 먼저 호출하십쇼.
				chart.addClass("on"); 
				
				if(chart.hasClass('ChartInterestWrapper')) {
					console.log('drawing ChartInterest');
					DrawSplineShortcut();
					
				} else if(chart.hasClass('ChartPieWrapper')) {
					console.log('drawing ChartPie');
					DrawPieChartShortcut();
					$('#pieChartForInterest svg > g.highcharts-legend').attr("transform","translate(220,90)"); // 이걸 안하면 legend가 살짝 오른쪽으로 밀린다. 보기 안 좋음.
				}
				
			});
			
			//검색 버튼 클릭시 날짜를 파라미터로 보낸다.
			$('.searchBtn04').on("click", function(e){
				
				console.log("clicked searchBtn");
				
				var startDate = $('#resetForm #startDate').val();
				var endDate = $('#resetForm #endDate').val();
				if(!startDate || !endDate) {
					alert("기간 검색을 하시려면 시작과 끝 모두 입력해주셔야 합니다.");
					return;
				}
				$.ajax({
					url:"/s-portalcnm/api/ststistics/getStstisticsUSInterestingTopicMng.do" ,
					data:{startDate:startDate, endDate:endDate},
					method : 'post',
					success : function(response){
						console.log(response);
						$('#excel_download-1').attr('href','/s-portalcnm/api/ststistics/interestingTopicExcelDataDownLoad.do?type=interestingTopic&startDate='+$('#startDate').val()+'&endDate='+$('#endDate').val());
						insertDataToTable(response);
						$('#dummySelect').click();
						$('#ChartPieSelect').click();
				    },
				    error : function(){
				    	alert("데이터 수신 실패");
				    }
				});
				
			});
			
		});
	</script>
</head>
<body>
	<div class="wrapper">
		<!-- cls:header start -->
		<%@include file="/jsp/include/ststisticsHeader.jsp" %>
		<!-- cls:header end -->
		<div class="contents">
			<!-- cls:left start -->
			<div class="lefitMenuWrapper" style="width: 200px;box-sizing: border-box"> <!-- 2020-06-22 박상언 - 브라우저 줌아웃할 시에 .acticle이 아래로 밀림, 이를 위한 css 수정 -->
				<script type="text/javascript">
					makeLeftMenu("3", "10", "8");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
				</script>
			</div>
			<!-- cls:left end -->
			<div class="acticle">
				<div class="location">
					<p>
						<a><img src="/s-portalcnm/html/include/img/ico/ico_home.png" alt="home"></a>
						<span><img src="/s-portalcnm/html/include/img/ico/ico_navi.png" alt="다음"></span>
						<span>서비스 관리</span> 
						<span><img src="/s-portalcnm/html/include/img/ico/ico_navi.png" alt="다음"></span> 
						<span> My통계로</span><!--2020-02-19 수정  -->
						<span><img src="/s-portalcnm/html/include/img/ico/ico_navi.png" alt="다음"></span> 
						<span class="fontS">관심주제 이용현황</span>
					</p>
				</div>
				<p class="title01" style="margin-bottom: 30px;">관심주제 이용현황</p>
				
				<div class="tilte03">조회조건</div>
				<div class="searchBtn04" id="search">
					<a style="cursor: pointer"><img src="/s-portalcnm/html/include/img/btn/btn_search.png" alt="검색"></a>
				</div>
				<form id="resetForm" method="post" style="margin-bottom: 1rem">
				    <table class="apiTable02" summary="조회조건">
				        <caption>조회조건</caption>
				        <colgroup>
				            <col width="141">
				            <col width="230">
				            <col width="141">
				            <col width="230">
				        </colgroup>
				        <tbody>
				            <tr>
								<th>검색기간</th>
																
								<td colspan="3" id="DATE">
									<div class="searchBtn02">
										<a>
											<input type="text" class="input_use06" id="startDate" style="width:90px; margin-right: 5px" readonly>
										</a>
									</div>
									<div class="searchBtn02">
										<a>
											<input type="text" class="input_use06" id="endDate" style="width:90px; margin-right: 5px" readonly>
										</a>
									</div>
	                             </td>
							</tr>
							<tr>
								<th>차트 유형</th>
								<td>
									<div class="radioBtnWrapper">
										<input type="radio" name="ChartSelect" id="ChartPieSelect" value="ChartPieSelect" checked="checked"><label for="ChartPieSelect">파이 차트</label>
										<input type="radio" name="ChartSelect" id="ChartInterestSelect" value="ChartInterestSelect"><label for="ChartInterestSelect">라인 차트</label>
										<input type="radio" name="ChartSelect" id="dummySelect" value="ChartInterestSelect" style="display:none"><label for="dummySelect" style="display:none">막대 차트</label>
									</div>
								</td>
							</tr>
				        </tbody>
				    </table>
				</form><!-- end of #resetForm -->
				
				<div id="chartWrapper">
					<div class="ChartInterestWrapper">
						<div id="spileChartForLifeCycle"></div>
						<div id="spileChartForInterest"></div>
					</div>
					<div class="ChartPieWrapper on">
						<div id="pieChartForLifeCycle"></div>
						<div id="pieChartForInterest"></div>
					</div>
				</div>
				
				<div class="tilte03" style="margin-top:3rem">생애주기 및 관심분야 이용현황</div>
				<div class="searchBtn04-1" style="margin-top:3rem;float:right">
				    <a id="excel_download-1" href="/s-portalcnm/api/ststistics/interestingTopicExcelDataDownLoad.do?type=interestingTopic" style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
				        <label style="cursor: pointer;" for="excel_download">엑셀 다운로드</label>
				    </a>
				</div>
				<table class="apiTable17" id="lifeCycleAndInterestTable" summary="생애주기 및 관심분야 이용현황">
			        <caption>생애주기 및 관심분야 이용현황</caption>
			        <colgroup>
			            <col width="50px">
			            <col width="170px">
			            <col width="170px">
			            <col width="170px">
			            <col width="170px">
			        </colgroup>
			        <thead>
			            <tr>
			                <th>순번</th>
			                <th>생애주기</th>
			                <th>선택 비율(%)</th>
			                <th>관심분야</th>
			                <th>선택 비율(%)</th>
			            </tr>
			        </thead>
			    </table>
			</div><!-- end of article -->
		</div>
		<!-- cls:footer start -->
		<div class="footerWrapper"></div>
		<!-- cls:footer end -->
		<div class="popupWrapper" id="popup" style="position:fixed;left: 0">
			<div class="popupWrapper">
				<div class="aplPopupWrapper">
					<div class="aplPopupTitle">
						<div class="myTitleFont" id="popTitle">신규등록</div>
						<div class="myXbtn">
							<a style="cursor: pointer">
								<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
							</a>
						</div>
					</div>
					<!-- 2017.07.19 [개발팀] khc 표출순위 추가  start -->		
					<form id="popupForm">
						<input type="hidden" id="CATEGORY_ID" />
						<table class="popupTable" summary="연관어 상세정보popup">
							<caption>연관어 상세정보popup</caption>
							<tbody>
								<tr>
									<th class="right" style="width:100px;'">서비스 여부</th>
									<td>
										<select class="input_use08" id="useYn" name="useYn">
											<option value="">선택하세요</option>
											<option value="Y">활성</option>
											<option value="N">비활성</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>키워드명</th>
									<td>
										<input type="text" id="ctlgSimilrKwrd" name="ctlgSimilrKwrd" maxlength="50" class="input_use13" />
										<input type="hidden" id="ctlgSimilrKwrdSerial" name="ctlgSimilrKwrdSerial" maxlength="50" class="input_use13" />
									</td>
								</tr>
							</tbody>
						</table>
					</form>
					<div class="btnbox">
						<a id="save" class="save" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="save">저장</label></a> 
						<a id="cancel" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a>
<%-- 						<a id="save" class="register" style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_regist02.png"/>' alt="저장" /></a>  --%>
<%-- 						<a class="cancel" style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_cancel.png"/>' alt="취소" /></a> --%>
					</div>
				</div>
			</div>
		</div>
		<form id="excel_download_form" style="display: none;">
			
		</form>
		<%@include file="/jsp/include/ststisticsEtal.jsp" %>
	</div>
</body>
</html>