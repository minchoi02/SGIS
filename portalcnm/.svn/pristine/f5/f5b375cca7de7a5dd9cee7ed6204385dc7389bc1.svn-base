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
	 $("#searchBtn").on('click',(function(e){
		 getServiceUseView();
	 }));
	 
	 $("#cancel").on('click',(function(e){
		 $('.popupWrapper').css('display','none');
	 }));
	 
	 $("#excelBtn2").on('click',(function(e){
		 excelDownload("serviceUseStat.xls", "serviceTable2");
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
	getServiceUseView();
}

//moreViewBtn
function getServiceUseView(){
	 var year = $("#yearSel").val();
	 var month = $("#monthSel").val();
	 
	 jQuery.ajax({
 		type:"POST",
 		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
 		dataType:'json', 
 		data:{
 				"gubun" 				: "getServiceUseView2",
 				"year"					:	year	,
				"month"					:	month	,
 			  },
 		success:function(data){
 			var sunser = 0;
 			var rowNumId = 0;
 			
 			var swt = 0;
				$("#serviceTable2Body tr").each(function(){
					if(swt < 2 ){
						swt++;
					}else{
						$(this).remove();
					}
				});
 			
 			for(var i=0; i<data.result.getDirectCallStat2.length ; i++){
 				var htmlData = "";
 				htmlData += "<tr>";
 				var rownumCnt;
 				if(sunser != data.result.getDirectCallStat2[i].SUNSER){
 					rowNumId++;
 					sunser++;
 					rownumCnt = 1;
 					htmlData += "<td rowspan='" + rownumCnt + "' id='rownumId" + rowNumId + "'>" + data.result.getDirectCallStat2[i].B_CODE_NM + "</td>";
 					htmlData += "<td>" + data.result.getDirectCallStat2[i].S_CODE_NM + "</td>";
 					htmlData += "<td id='pageA" + data.result.getDirectCallStat2[i].S_CODE + "'>" + data.result.getDirectCallStat2[i].PAGECNT + "</td>";
 					htmlData += "<td id='visitA" + data.result.getDirectCallStat2[i].S_CODE + "'>" + data.result.getDirectCallStat2[i].VISITCNT + "</td>";
 					htmlData += "<td id='pageB" + data.result.getDirectCallStat2[i].S_CODE + "'></td>";
 					htmlData += "<td id='visitB" + data.result.getDirectCallStat2[i].S_CODE + "'></td>";
 					htmlData += "<td></td>";
 					htmlData += "<td></td>";
 					htmlData += "</tr>";
 					jQuery("#serviceTable2Body").append(htmlData);
 				}else{
 					rownumCnt++;
 					jQuery("#rownumId"+rowNumId).attr("rowspan", rownumCnt)
 					htmlData += "<td style='border-left: 1px solid #cacaca;'>" + data.result.getDirectCallStat2[i].S_CODE_NM + "</td>";
 					htmlData += "<td id='pageA" + data.result.getDirectCallStat2[i].S_CODE + "'>" + data.result.getDirectCallStat2[i].PAGECNT + "</td>";
 					htmlData += "<td id='visitA" + data.result.getDirectCallStat2[i].S_CODE + "'>" + data.result.getDirectCallStat2[i].VISITCNT + "</td>";
 					htmlData += "<td id='pageB" + data.result.getDirectCallStat2[i].S_CODE + "'></td>";
 					htmlData += "<td id='visitB" + data.result.getDirectCallStat2[i].S_CODE + "'></td>";
 					htmlData += "<td></td>";
 					htmlData += "<td></td>";
 					htmlData += "</tr>";
 					jQuery("#serviceTable2Body").append(htmlData);
 				}
 				
 				/*
			<tr>
			<th>합계
				</th>
				<th></th>
					<th><span id="servicegba100"></span></th>
					<th><span id="servicegbb100"></span></th>
					<th><span id="servicegbc100"></span></th>
					<th><span id="servicegbd100"></span></th>
					<th><span id="servicegbe100"></span></th>
					<th><span id="servicegbf100"></span></th>
			</tr>
			
			*/
 			}
 			
 			
 			for(var i=0; i<data.result.getServiceUseView.length; i++){
 				
/* 				M0	M03	메인페이지	활용서비스 메인	
 				M0	M04	메인페이지	분석서비스 메인	
 				M0	M05	메인페이지	Header 클릭 로그	
 				M0	M06	메인페이지	메인페이지 클릭 로그	
 				M0	M07	메인페이지	기타	
 				M0	M08	대화형통계지도	대화형통계지도	
 				M0	M09	통계주제도	통계주제도	
 				M0	M10	살고싶은우리동네	살고싶은우리동네	
 				M0	M11	생활업종통계지도	생활업종통계지도	
 				M0	M12	통계소통지도	통계소통지도	
 				M0	M13	인구피라미드	인구피라미드	
 				M0	M14	지방의변화보기	지방의변화보기	
 				M0	M15	월간통계	월간통계	
 				M0	M16	통계지도체험	통계지도체험	
 				M0	M17	고령화현황보기	고령화현황보기	
 				M0	M18	성씨분포	성씨분포	
 				M0	M19	우수활용사례	우수활용사례	
 				M0	M20	개발자지원센터	개발자지원센터	
 				M0	M21	도움말	도움말	
 				M0	M22	모바일	모바일	
 				M0	M23	알림마당	알림마당 메인	
 				M0	M24	알림마당	SGIS PLUS 소개	
 				M0	M25	알림마당	설명과 공지	
 				M0	M26	알림마당	자료신청	
 				M0	M27	알림마당	질문과 개선요청	
 				M0	M28	검색	검색	
 				M0	M29	마이페이지	마이페이지	
 				M0	M30	로그인	ID/PW찾기, 개인처리방침, Email처리방침 포함	
 				M0	M31	정책통계지도	정책통계지도	
 				M0	M32	기술업종통계지도	기술업종통계지도	
 				M0	M33	홍보동영상	홍보동영상	
*/
 				
					var pageCount = data.result.getServiceUseView[i].MONTHPAGEVIEW;
					var visitCount = data.result.getServiceUseView[i].MONTHVISITVIEW;
					var type = data.result.getServiceUseView[i].TYPE;
					if(type == "F0"){
						jQuery("#pageBM05").html(pageCount);
						jQuery("#visitBM05").html(visitCount);
					}else if(type == "G0"){
						
					}else if(type == "A0"){
					}else if(type == "C0"){
					}else if(type == "J0"){
					}else if(type == "B0"){
					}else if(type == "K0" || type == "K3"){
					}else if(type == "D4"){
					}else if(type == "D1"){
					}else if(type == "D2"){
					}else if(type == "E1"){
					}else if(type == "D3"){
					}else if(type == "D5"){
					}else if(type == "N0"){
					}else if(type == "O0"){
					}else if(type == "L0" || type == "K4"|| type == "K1"){
						//	serviceGbC20 = serviceGbC20 + parseInt(data.result.getServiceUseView[i].MONTHPAGEVIEW);
						//	serviceGbD20 = serviceGbD20 + parseInt(data.result.getServiceUseView[i].MONTHVISITVIEW);
					}else if(type == "E2"){
					}else if(type == "H0"){
					}else if(type == "E3"){
					}else if(type == "S0"){
					}else if(type == "T0"){
					}else if(type == "P0"){
					}else if(type == "M0"){
						// 		 			fromOutToinViewCnt = data.result.getServiceUseView[i].MONTHPAGEVIEW;
						// 		 			fromOutToinVisitCnt = data.result.getServiceUseView[i].MONTHVISITVIEW;
					}
				}
 			
 			
 			
 			
 			
 			
 		},
 		error:function(data) {
 			alert("ajaxFail");
 			alert(data);
 		}
	});
}

function replaceAll(find, replace, str){
	 return str.replace(new RegExp(find, 'g'), replace);
}

function getServiceUseViewExcel(){
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	alert(year);
	
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
		},
		error:function(data) {
			
			alert("ajaxFail");
			alert(data);
		}
	});
}

function serviceMatching(str) {
	var serviceNm = "";
	switch(str) {
		case 1: serviceNm = "메인페이지"; break;
		case 2: serviceNm = "활용서비스 메인"; break;
		case 3: serviceNm = "분석지도 메인"; break;
		case 4: serviceNm = "Header 클릭 로그"; break;
		case 5: serviceNm = "메인페이지 클릭 로그"; break;
		case 6: serviceNm = "대화형통계지도"; break;
		case 7: serviceNm = "통계주제도"; break;
		case 8: serviceNm = "살고싶은우리동네"; break;
		case 9: serviceNm = "생활업종통계지도"; break;
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
		case 31: serviceNm = "홍보동영상"; break;
	}
	return serviceNm;
}