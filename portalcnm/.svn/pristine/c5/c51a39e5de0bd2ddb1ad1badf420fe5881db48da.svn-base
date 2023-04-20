/**   
 *
 * @JSName: totUseStat.js
 * @Description: 
 *
 * @author: LeeKH   
 * @date: 2016/04/05/ 10:30:00    
 * @version V1.0      
 *    
 */
$(function () {
	
	srvLogWrite("L0", "01", "03", "01", "", "");
	
	 $("#searchBtn").on('click',(function(e){
		 srvLogWrite("L0", "01", "03", "01", "", "");
		 getServiceUseView();
	 }));
	 
	 $("#cancel").on('click',(function(e){
		 $('.popupWrapper').css('display','none');
	 }));
	 
	 $("#excelBtn2").on('click',(function(e){
		 
		 var serviceTable2HTML = $("#serviceTable2").html();
		 
		 $("#serviceTable2 th:hidden").remove();
		 $("#serviceTable2 td:hidden").remove();
		 
		 excelDownload("serviceUseStat.xls", "serviceTable2");

		 $("#serviceTable2").html(serviceTable2HTML);
	 }));
	 
	 $("#PrintBtn").on('click',(function(e){
		var printHtml = "";
		$("#PrintBtn").hide();
		$("#cancel").hide();
		$("#popTitle").hide();
		$("#memoText").html($("#memoText").val());
		printHtml += "<html><head></head><title></title>";
		printHtml += "<style>";
		printHtml += ".popupWrapper{background:rgba(0,0,0,0.8); position: absolute; top: 0; width: 100%; height: 200%; display:none;}";
		printHtml += ".myPopupWrapper{width:546px; height:auto; overflow:hidden; margin: 0 auto; margin-top: 11%; border:1px solid #3f66bf; background: #fff;}";
		printHtml += ".myPopupTitle{background:#1f2b60; height:48px; line-height:48px; }";
		printHtml += ".myTitleFont{color:#fff; font-size:20px; float:left; padding-left:27px;font-family:NanumGothic;}";
		printHtml += ".myXbtn{padding-right:17px; float:right; padding-top: 15px; }";
		printHtml += ".popupTable{ border-top:1px solid #cacaca; width:90%; margin:0 auto; margin-top:22px;  }";
		printHtml += "caption{ visibility:hidden; height:10px;}";
		printHtml += ".popupTable tr th{ color:#4a4a4a; text-align:left; padding:5px 15px; background:#fafafa; border-left:1px solid #cacaca; border-right:1px solid #cacaca; border-bottom:1px solid #cacaca; font-size: 12px; height:36px;}";
		printHtml += ".popupTable tr td{ padding:5px 15px; border-bottom:1px solid #cacaca;  border-right:1px solid #cacaca;  font-size: 12px; color:#6e6e6e;}";
		printHtml += ".popupTable tr td img{vertical-align: middle; margin-left: 5px; margin-right: 10px; display: inline;}";
		printHtml += ".apiTableD1{ border-top:2px solid #1c2e63; margin-top:11px; clear: both; }";
		printHtml += ".apiTableD1 tr th{ color:#4a4a4a; text-align:center;  background:#f8f8f8;  border-left:1px solid #cacaca; border-bottom:1px solid #cacaca; font-size: 12px; height:35px; font-weight:bold;}";
		printHtml += ".apiTableD1 tr th:first-child{border-left:0px;}";
		printHtml += ".apiTableD1 tr th a{color:#4a4a4a;}";
		printHtml += ".apiTableD1 tr th a:hover{color:#4a4a4a;}";
		printHtml += ".apiTableD1 tr td{ padding:5px 15px;  border-left:1px solid #cacaca; border-bottom:1px solid #cacaca;  font-size: 12px; color:#4a4a4a;  text-align:left; height:35px;}";
		printHtml += ".apiTableD1 tr td:first-child{ border-left:0px; }";
		printHtml += ".apiTableD1 tr td a{color:#4a4a4a;}";
		printHtml += ".apiTableD1 tr td a:hover{color:#4a4a4a; text-decoration: underline;}";
		printHtml += ".apiTableD1 tr td span{float:right;}";
		printHtml += ".printCSS {background-color:rgba(255, 0, 0, 0.2);}";
		printHtml += "</style>";
		printHtml += "<body>";
		printHtml += document.getElementById("reportPrint").innerHTML;
		printHtml += "</body></html>";
		win = window.open(); 
		self.focus(); 
		win.document.open();
		win.document.write(printHtml);
		win.document.close();
		win.print();
		$("#PrintBtn").show();
		$("#cancel").show();
		$("#popTitle").show();
		win.close();
	 }));
	 
	 
	 $("#reportBtn").on('click', (function(e) {
		 $('.popupWrapper').css('display','block');
		 $("#memoText").val("");
		 $(document.body).scrollTop($('.popupWrapper').offset().top);
		 var today = new Date();
		 var yyyy = today.getFullYear();
		 var mm = today.getMonth()+1;
		 var dd = today.getDate();
		 var hh = today.getHours();
		 var mi = today.getMinutes();
		 today = yyyy + '년 ' + mm + '월 ' + dd + '일 ' + hh + '시 ' + mi + '분';
		 $("#title").text("주요 서비스별 이용현황");
		 $("#date").text(today);
	 }));
});

function init(){
	setFormAction();
	nowYearMonth();
	//getServiceUseView();
	
	//서비스 직접호출과 그냥 호출 구분된 영역 안보이게 수정. 99는 기타 100은 합계임
/*	for(i=1; i<=36; i++){		
		$("#servicegba"+i).parents("td").hide();
		$("#servicegbb"+i).parents("td").hide();
		$("#servicegbc"+i).parents("td").hide();
		$("#servicegbd"+i).parents("td").hide();
	}
	$("#servicegba99").parents("td").hide();
	$("#servicegbb99").parents("td").hide();
	$("#servicegbc99").parents("td").hide();
	$("#servicegbd99").parents("td").hide();
	$("#servicegba100").parents("th").hide();
	$("#servicegbb100").parents("th").hide();
	$("#servicegbc100").parents("th").hide();
	$("#servicegbd100").parents("th").hide();
	
	$(".hiddenCell").hide();
 */
}

//moreViewBtn
function getServiceUseView(){
	 var year = $("#yearSel").val();
	 var month = $("#monthSel").val();
	 
	 jQuery("#servicegbc99").html("0");
	 jQuery("#servicegbd99").html("0");
	 
	 jQuery.ajax({
 		type:"POST",
 		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
 		dataType:'json', 
 		data:{
 				"gubun" 				: "getServiceUseView",
 				"year"					:	year	,
				"month"					:	month	,
 			  },
 		success:function(data){
 			var swt = true;
 			$("#serviceTableBody tr").each(function(){
 				if(swt){
 					swt = false;
 				}else{
 					$(this).remove();
 				}
 			});
 			//type, sum(monthpageview) as monthpageview, sum(monthvisitview) as monthvisitview
 			
 			var totsum1 = 0
 			var totsum2 = 0;
 			
 			//페이지 방문통계 메뉴 늘릴때 마다 i 범위 값 늘려줄것
			//패이지의 방문자수가 없을 때 0으로 초기화 해주는 부분
 			for(i=1; i<=41; i++){
 				jQuery("#servicegbc" + i).html(0);
 				jQuery("#servicegbd" + i).html(0);
 			}
 			
 			
 			for(var i=0; i< data.result.getServiceUseView.length; i++){
 				
 				var type = data.result.getServiceUseView[i].TYPE;
 				
 				var monthPageView = data.result.getServiceUseView[i].MONTHPAGEVIEW;
 				var monthVisitView = data.result.getServiceUseView[i].MONTHVISITVIEW;
 				
 				
 				
 				if(monthPageView == null || monthPageView == undefined){
					monthPageView = 0;
				}
				if(monthVisitView == null || monthVisitView == undefined){
					monthVisitView = 0;
				}
 				
 				totsum1 += parseInt(monthPageView);
 				totsum2 += parseInt(monthVisitView);
 				
 				if(type == "메인페이지"){
 					jQuery("#servicegbc1").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd1").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "활용서비스 메인"){
 					jQuery("#servicegbc2").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd2").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "분석지도 메인"){
 					jQuery("#servicegbc3").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd3").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "F0"){	//헤더 클릭 로그
 					jQuery("#servicegbc4").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd4").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "MAINCLICKLOG"){	//메인페이지 클릭 로그
 					jQuery("#servicegbc5").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd5").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "기타"){	
 					jQuery("#servicegbc99").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd99").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "A0"){	
 					jQuery("#servicegbc6").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd6").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "C0"){	
 					jQuery("#servicegbc7").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd7").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "J0"){	
 					jQuery("#servicegbc8").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd8").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "B0"){	
 					jQuery("#servicegbc9").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd9").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "K0" || type == "K3"){	
 					var pageCnt = jQuery("#servicegbc10").html();
 					var visitCnt = jQuery("#servicegbd10").html();
 					if(pageCnt == ""){
 						pageCnt = 0;
 					}else{
 						pageCnt = parseInt(pageCnt);
 					}
 					if(visitCnt == ""){
 						visitCnt = 0;
 					}else{
 						visitCnt = parseInt(visitCnt);
 					}
 					pageCnt += parseInt(monthPageView);
 					visitCnt += parseInt(monthVisitView);
 					
 					jQuery("#servicegbc10").html(appendCommaToNumber(pageCnt));
 					jQuery("#servicegbd10").html(appendCommaToNumber(visitCnt));
 					
 				}else if(type == "D4"){	
 					jQuery("#servicegbc11").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd11").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "D1"){	
 					jQuery("#servicegbc12").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd12").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "D2"){	
 					jQuery("#servicegbc13").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd13").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "E1" || type == "I0"){	
 					var pageCnt = jQuery("#servicegbc10").html();
 					var visitCnt = jQuery("#servicegbd10").html();
 					if(pageCnt == ""){
 						pageCnt = 0;
 					}else{
 						pageCnt = parseInt(pageCnt);
 					}
 					if(visitCnt == ""){
 						visitCnt = 0;
 					}else{
 						visitCnt = parseInt(visitCnt);
 					}
 					pageCnt += parseInt(monthPageView);
 					visitCnt += parseInt(monthVisitView);
 					
 					jQuery("#servicegbc14").html(appendCommaToNumber(pageCnt));
 					jQuery("#servicegbd14").html(appendCommaToNumber(visitCnt));
 					
 				}else if(type == "D3"){	
 					jQuery("#servicegbc15").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd15").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "D5"){	
 					jQuery("#servicegbc16").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd16").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "우수활용사례"){	
 					jQuery("#servicegbc17").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd17").html(appendCommaToNumber(monthVisitView));
				
				//mng_s 20220210 이진호, 개발지원센터 SRVLOG -> "SRV_A0_07", f_class_1_cd = 'A0', f_class_2_cd = '07' 이여서	
 				}else if(type == "N0" || type =="SRV_A0_07"){
 					jQuery("#servicegbc18").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd18").html(appendCommaToNumber(monthVisitView));
 				//mng_e 20220210 이진호	
 					
 				}else if(type == "O0"){	
 					jQuery("#servicegbc19").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd19").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "L0"){	
 					jQuery("#servicegbc20").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd20").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "알림마당 메인"){	
 					jQuery("#servicegbc21").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd21").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "SGIS+소개"){	
 					jQuery("#servicegbc22").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd22").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "설명과 공지"){	
 					jQuery("#servicegbc23").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd23").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "E2"){	
 					jQuery("#servicegbc24").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd24").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "질문과 개선요청"){	
 					jQuery("#servicegbc25").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd25").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "H0"){	
 					jQuery("#servicegbc26").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd26").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "마이페이지"){	
 					jQuery("#servicegbc27").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd27").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "로그인"){	
 					jQuery("#servicegbc28").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd28").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "S0"){	
 					jQuery("#servicegbc29").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd29").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "T0"){	
 					jQuery("#servicegbc30").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd30").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "통계갤러리"){	
 					jQuery("#servicegbc31").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd31").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "R0" || type == "EVENT"){	
 					var pageCnt = jQuery("#servicegbc32").html();
 					var visitCnt = jQuery("#servicegbd32").html();
 					if(pageCnt == ""){
 						pageCnt = 0;
 					}else{
 						pageCnt = parseInt(pageCnt);
 					}
 					if(visitCnt == ""){
 						visitCnt = 0;
 					}else{
 						visitCnt = parseInt(visitCnt);
 					}
 					pageCnt += parseInt(monthPageView);
 					visitCnt += parseInt(monthVisitView);
 					
 					jQuery("#servicegbc32").html(appendCommaToNumber(pageCnt));
 					jQuery("#servicegbd32").html(appendCommaToNumber(visitCnt));
 					
 				}else if(type == "Q0"){	
 					jQuery("#servicegbc33").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd33").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "P0"){	
 					jQuery("#servicegbc34").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd34").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "P0"){	
 					jQuery("#servicegbc34").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd34").html(appendCommaToNumber(monthVisitView));
 				}else if(type == "U0" || type == "PUBLIC"){	
 					var pageCnt = jQuery("#servicegbc35").html();
 					var visitCnt = jQuery("#servicegbd35").html();
 					if(pageCnt == "" || pageCnt == "0"){
 						pageCnt = 0;
 					}else{
 						pageCnt = parseInt(pageCnt);
 					}
 					if(visitCnt == "" || visitCnt == "0"){
 						visitCnt = 0;
 					}else{
 						visitCnt = parseInt(visitCnt);
 					}
 					
 					if(monthPageView == null || monthPageView == undefined){
 						monthPageView = 0;
 					}
 					if(monthPageView == null || monthPageView == undefined){
 						monthVisitView = 0;
 					}
 					
 					pageCnt += parseInt(monthPageView);
 					visitCnt += parseInt(monthVisitView);

 					
 					jQuery("#servicegbc35").html(appendCommaToNumber(pageCnt));
 					jQuery("#servicegbd35").html(appendCommaToNumber(visitCnt));
 					
 					
 					
 				}else if(type == "D0"){	
 					jQuery("#servicegbc36").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd36").html(appendCommaToNumber(monthVisitView));
 				
 				//mng_s 20200226 이진호
				//My통계로 type은 원래 N0 이나 위에서 개발자지원센터의 type 또한 N0 이기 때문에 'SRV_NO'로 임시변경
 				}else if(type == "SRV_N0"){	
 					jQuery("#servicegbc37").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd37").html(appendCommaToNumber(monthVisitView));
 				}
 				//mng_e 20200226 이진호
 				
 				//mng_s 20201102 이진호
 				//서비스별 이용현황에 총조사 시각화 추가
 				else if(type == "SRV_P0"){	
 					jQuery("#servicegbc38").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd38").html(appendCommaToNumber(monthVisitView));
 				}
 				//mng_e 20201102 이진호
 				
 				//mng_s 20210319 이진호
 				//서비스별 이용현황에 총조사 시각화 추가
 				else if(type == "SRV_Q0"){	
 					jQuery("#servicegbc39").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd39").html(appendCommaToNumber(monthVisitView));
 				}
 				//mng_e 20210319 이진호
 				
 				//mng_s 20220217
 				//서비스별 이용현황에 도시화 분석 지도 추가
 				else if(type == "SRV_R0"){	
 					jQuery("#servicegbc40").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd40").html(appendCommaToNumber(monthVisitView));
 				}
 				//mng_e 20210319 이진호
 				
 				//mng_s 20220217
 				//서비스별 이용현황에 행정통계 시각화지도 추가
 				else if(type == "SRV_S0"){	
 					jQuery("#servicegbc41").html(appendCommaToNumber(monthPageView));
 					jQuery("#servicegbd41").html(appendCommaToNumber(monthVisitView));
 				}
 				//mng_e 20210319 이진호
 			
 				 
 				/*F0	헤더 클릭 로그
				G0	메인페이지 클릭 로그
				A0	대화형통계지도
				C0	통계주제도
				D4	인구피라미드
				D1	지방의변화보기
				D2	월간통계
				E1  I0	통계지도체험
				D3	고령화현황보기
				D5	성씨분포
				N0	개발자지원센터
				O0	도움말
				L0	K4 K1도움말
				K0 K3	지역현안 소통지도
				E2	자료신청
				H0	검색
				S0 정책통계지도
				T0	기술업종통계지도
				R0 EVENT 이벤트
				Q0	SGIS에듀
				P0	홍보동영상
				U0 PUBLIC 공개강의실
				B0	생활업종통계지도
				J0	살고싶은우리동네
				MAINCLICKLOG	메인페이지 클릭 로그
				D0	일자리맵
				SRV_N0		My통계로 -> 원래는 N0임.*/
 				
 				
 			
 			}
 			
 			
 			
 			
 			
 			//appendCommaToNumber(serviceGbC1)
 				
 			
 			
 			
 			var totalview = new Array();
 			var gridTotal = new Array(32);
 			var gridTotalTemp = new Array(32);
 			
 			for(var i=1; i<=41; i++){
 				
 				//보고서 팝업 관련
 				gridTotal[i] = new Array(3);
 				gridTotalTemp[i] = new Array(3);
				gridTotal[i][1] = serviceMatching(i);
				gridTotal[i][2] = Number(jQuery("#servicegbc"+i).text().replace(",",""));
				gridTotal[i][3] = Number(jQuery("#servicegbd"+i).text().replace(",",""));
 			}
 			
 			
 			jQuery("#servicegbc100").html(appendCommaToNumber(totsum1));
 			jQuery("#servicegbd100").html(appendCommaToNumber(totsum2));
 			
 			
 			//버블정렬
 			for(var i=1; i<=41; i++){
 				for(var j=1; j<=40; j++){
 	 				if(gridTotal[j][2]>gridTotal[j+1][2]) {
 	 					gridTotalTemp[j][1] = gridTotal[j][1];
 	 					gridTotalTemp[j][2] = gridTotal[j][2];
 	 					gridTotalTemp[j][3] = gridTotal[j][3];
 	 					gridTotal[j][1] = gridTotal[j+1][1];
 	 					gridTotal[j][2] = gridTotal[j+1][2];
 	 					gridTotal[j][3] = gridTotal[j+1][3];
 	 					gridTotal[j+1][1] = gridTotalTemp[j][1];
 	 					gridTotal[j+1][2] = gridTotalTemp[j][2];
 	 					gridTotal[j+1][3] = gridTotalTemp[j][3];
 	 				}
 	 			}
 			}
 			
 			//보고서 팝업 표
 			var tempHtml = "";
 			var tempChartDate = [];
 			var tempCnt = 1;
 			tempHtml += "<tr>";
 			tempHtml += "<th colspan='2'>주요 서비스명</th>";
 			tempHtml += "<th>페이지뷰(건)</th>";
 			tempHtml += "<th>방문자수(명)</th>";
 			tempHtml += "</tr>";
 			for(var i=41; i>=16; i--){
 				if(i >= 25) {
 					tempHtml += "<tr class='printCSS' style='background-color:rgba(255, 0, 0, 0.2);'>";
 				} else {
 					tempHtml += "<tr>";
 				}
 				tempHtml += "<td style='text-align: center;'>"+tempCnt+"</td>";
 	 			tempHtml += "<td>"+gridTotal[i][1]+"</td>";
 	 			tempHtml += "<td style='text-align: right;'>"+appendCommaToNumber(gridTotal[i][2])+"</td>";
 	 			tempHtml += "<td style='text-align: right;'>"+appendCommaToNumber(gridTotal[i][3])+"</td>";
 	 			tempHtml += "</tr>";
 	 			tempCnt++;
 	 			
 	 			tempChartDate.push([gridTotal[i][1], gridTotal[i][2]]);
 			}
 			jQuery("#serviceTable3Body").html(tempHtml);
 			
 			
 			//보고서 Popup Highchart
 			$('#chart').highcharts({
			        chart: {
			            type: 'bar'
			        },
			        title: {
			            text: ''
			        },
			        subtitle: {
			            text: ''
			        },
			        xAxis: {
			            type: 'category',
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
			            }
			        },
			        legend: {
			            enabled: false
			        },
			        tooltip: {
			            pointFormat: '<b>{point.y} 건</b>'
			           
			        },
			        series: [{
			            name: '서비스명',
			            data: tempChartDate,
			            dataLabels: {
			                enabled: true,
			            }
			        }]
			    });
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

function replaceAll(find, replace, str){
	 return str.replace(new RegExp(find, 'g'), replace);
}

function checkNal(num){
	if(isNaN(num)){
		return 0;
	}
	return num;
}

function getServiceUseViewExcel(){
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	
	//활용사례 상세조회
	jQuery.ajax({
		type:"GET",
		url: "/s-portalcnm/ServiceAPI/EXCEL/useCurrentStateExcel.excel",
		dataType:'json', 
		data:{
			"gubun" 				: "getServiceUseViewExcel",
			"year"					:	year	,
			"month"					:	month	,
		},
		success:function(data){
			
			
			var swt = true;
			$("#serviceTableBody tr").each(function(){
				if(swt){
					swt = false;
				}else{
					$(this).remove();
				}
			});
			
			
			//			nowYear = data.result.getTotStatView[0].NOWYEAR;
			for(var i=0; i<data.result.getServiceUseView.length; i++){
				var type = data.result.getServiceUseView[i].TYPE;
				var visitview = data.result.getServiceUseView[i].VISITVIEW;
				var pageview = data.result.getServiceUseView[i].PAGEVIEW;
				var monthview = data.result.getServiceUseView[i].MONTHVISITVIEW;
				var monthpageview = data.result.getServiceUseView[i].MONTHPAGEVIEW;
				
				
				var str = "";
				
				str += "<tr>";
				str += "<td style='border:1px solid #cacaca;'>" + type + "</td>";
				str += "<td style='border:1px solid #cacaca;'>" + visitview + "</td>";
				str += "<td style='border:1px solid #cacaca;'>" + pageview + "</td>";
				str += "<td style='border:1px solid #cacaca;'>" + monthview + "</td>";
				str += "<td style='border:1px solid #cacaca;'>" + monthpageview + "</td>";
				str += "</tr>";
				
				$("#serviceTableBody").append(str);
				
				
			}
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

//mng_s 20200309 이진호
//serviceNm에 따른 이름이 길면 보고서 보기에서 차트의 항목이름이 나오지 않을 수 있음
//그래서 Header 클릭 로그 --> Header클릭로그
//			 메인페이지 클릭 로그 --> 메인페이지클릭로그
//로 변경 하였음.
function serviceMatching(str) {
	var serviceNm = "";
	switch(str) {
		case 1: serviceNm = "메인페이지"; break;
		case 2: serviceNm = "활용서비스 메인"; break;
		case 3: serviceNm = "분석지도 메인"; break;
		case 4: serviceNm = "Header클릭로그"; break;
		case 5: serviceNm = "메인페이지클릭로그"; break;
		case 6: serviceNm = "대화형통계지도"; break;
		case 7: serviceNm = "통계주제도"; break;
		case 8: serviceNm = "살고싶은우리동네"; break;
		case 9: serviceNm = "우리동네생활업종"; break;
		case 10: serviceNm = "통계소통지도"; break;
		case 11: serviceNm = "인구피라미드"; break;
		case 12: serviceNm = "지방의변화보기"; break;
		case 13: serviceNm = "월간통계"; break;
		case 14: serviceNm = "통계지도체험"; break;
		case 15: serviceNm = "고령화현황보기"; break;
		case 16: serviceNm = "성씨분포"; break;
		case 17: serviceNm = "우수활용사례"; break;
		case 18: serviceNm = "개발자지원센터"; break;
		case 19: serviceNm = "도움말"; break;
		case 20: serviceNm = "모바일"; break;
		case 21: serviceNm = "알림마당 메인"; break;
		case 22: serviceNm = "SGIS+ 소개"; break;
		case 23: serviceNm = "설명과 공지"; break;
		case 24: serviceNm = "자료신청"; break;
		case 25: serviceNm = "질문과 개선요청"; break;
		case 26: serviceNm = "검색"; break;
		case 27: serviceNm = "마이페이지"; break;
		case 28: serviceNm = "로그인"; break;
		case 29: serviceNm = "정책통계지도"; break;
		case 30: serviceNm = "기술업종통계지도"; break;
		case 31: serviceNm = "통계갤러리"; break;
		case 32: serviceNm = "이벤트"; break;
		case 33: serviceNm = "SGIS에듀"; break;
		case 34: serviceNm = "홍보동영상"; break;
		case 35: serviceNm = "SGIS+공개강의실"; break;
		case 36: serviceNm = "일자리맵"; break;
		
		//mng_s 20200227 이진호 - My통계로 추가
		case 37: serviceNm = "My통계로"; break;
		//mng_e 20200227 이진호
		
		//mng_s 20201102 이진호
		//총조사시각화 추가
		case 38: serviceNm = "총조사시각화"; break;
		//mng_e 20201102 이진호
		
		//mng_s 20210319 이진호
		//총조사시각화 추가
		case 39: serviceNm = "생활권역통계지도"; break;
		//mng_e 20210319 이진호
		
		//mng_s 20220217 이진호
		//행정통계 시각화지도 추가
		case 40: serviceNm = "도시화 분석 지도"; break;
		//mng_e 20210319 이진호
		
		//mng_s 20220217 이진호
		//행정통계 시각화지도 추가
		case 41: serviceNm = "행정통계 시각화지도"; break;
		//mng_e 20210319 이진호
		
		
		
	}
	//mng_e 20200309 이진호
	return serviceNm;
}