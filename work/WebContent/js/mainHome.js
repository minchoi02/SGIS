/**
 * Date : 2018.04.27
 * Author : 최재영
 * Etc : ext js 제거로 인해 기존에 있던 함수를 새로 작성   
 */
(function(W,D){
	W.$homeMain = W.$homeMain || {};
	$(document).ready(function(){
		$homeMain.event.setUIEvent();
		$homeMain.request.doReqNoticeList();
		$homeMain.request.doReqGuideList();
		$homeMain.request.doReqQnaList();
		$homeMain.request.doReqFaqList();		
		
		$homeMain.request.doReqMyDataList();
		$homeMain.request.doReqDashBoardList();
	});
	
	//UI 내용작성
	$homeMain.ui = {
			
			/**
			 * 
			 * @name         : setNoticeList
			 * @description  : 공지사항 정보를 설정한다.
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data	 : 공지사항 정보
			 */
			setNoticeList : function(data) {
				
				var html  = '<h1>공지사항</h1>';
					html += '<button onclick = "location.href =\''+ contextPath + '/view/use/guideMain/notice\'"><img src="'+contextPath+'/img/common/btn_plus.png" alt=""/>더보기</button>';
					html +=	'<table>';
					html +=		'<colgroup>';
					html += 		'<col style=""/>'
					html +=			'<col style="width:130px;"/>';
					html +=		'</colgroup>';
					html +=	'<tbody>'
				if(data.length > 0){
					for(var i=0; i<data.length; i++){
						var title = data[i].title;
						if (title.length > 30){
							title = title.substring(0,30) + "..." ;
						}
						html +=		'<tr>'
						html +=			'<td>'
						html +=				'<a tabindex="-1" href="'+ contextPath +'/view/use/notice/noticeDetailView?post_no='+data[i].post_no+'" title="'+data[i].title+'" target="_self">'+title+'</a>';
						html +=			'</td>'
						html +=			'<td>' + data[i].reg_ts + '</td>'
						html +=		'</tr>'
					}
				}else{
						html +=		'<tr>'
						html +=			'<td>'
						html +=				'<a tabindex="-1" " title="공지사항이 없습니다." target="_self">공지사항이 없습니다.</a>';
						html +=			'</td>'
						html +=			'<td></td>'
						html +=		'</tr>'
				}		
				
					
					html +=	'</tbody>'
					html +=	'</table>'
					
				$("#ntc-list").html(html);
			},
			
			/**
			 * 
			 * @name         : setGuideList
			 * @description  : 이용정보를 설정한다.
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data	 : 이용정보
			 */
			setGuideList : function(data) {
				var html  = '<div class="col-md-12 sts-grid">';
					html += '<table>';
					html +=	'<colgroup>';
					html +=		'<col style="width:500px">';
					html +=		'<col style="width:"">';
					html +=	'</colgroup>';
					html +=	'<tbody>'
						
				for(var i=0; i<data.length; i++){
					var title = data[i].title;
					if (title.length > 30){
						title = title.substring(0,30) + "..." ;
					}
					html +=		'<tr>'
					html +=			'<td style="text-align:left;">'
					html +=				'<a tabindex="-1" href="' + contextPath + '/view/use/guide/guideDetailView?post_no='+data[i].post_no+'" title="'+data[i].title+'" target="_self">'+title+'</a>';
					html +=			'</td>'
					html +=			'<td style="width: 170px;">' + data[i].reg_ts + '</td>'
					html +=		'</tr>'
				}
					
					html +=	'</tbody>'
					html +=	'</table>'
					html += '</div>'
					
				$("#help-list").html(html);
			},
			
			/**
			 * 
			 * @name         : setQnaList
			 * @description  : qna를 설정한다.
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data	 : 이용정보
			 */
			setQnaList : function(data) {
			var html  = '<h1>Q&A</h1>';
				html += '<button onclick = "location.href =\''+ contextPath +'/view/use/guideMain/qna\'"><img src="'+contextPath+'/img/common/btn_plus.png" alt=""/>더보기</button>';
				html += '<table>';
				html +=	'<colgroup>';
				html += 		'<col style=""/>'
				html +=			'<col style="width:130px;"/>';
				html +=	'</colgroup>';
				html +=	'<tbody>'
			
			if(data.length > 0){
				for(var i=0; i<data.length; i++){
					var title = data[i].title;
					if (title.length > 30){
						title = title.substring(0,30) + "..." ;
					}
					html +=		'<tr>'
					html +=			'<td style="text-align:left;">'
					html +=				'<a tabindex="-1" href="'+ contextPath +'/view/use/qna/qnaDetailView?post_no='+data[i].post_no+'" title="'+data[i].title+'" target="_self">'+title+'</a>';
					html +=			'</td>'
					html +=			'<td style="width: 170px;">' + data[i].reg_ts + '</td>'
					html +=		'</tr>'
				}
			}else{
					html +=		'<tr>'
					html +=			'<td style="text-align:left;">'
					html +=				'<a tabindex="-1"  title="Q&A가 없습니다." target="_self">Q&A가 없습니다.</a>';
					html +=			'</td>'
					html +=			'<td style="width: 170px;"></td>'
					html +=		'</tr>'
			}
			
				
				html +=	'</tbody>'
				html +=	'</table>'
				html += '</div>'
						
						
				$("#qna-list").html(html);
			},
			
			/**
			 * 
			 * @name         : setFaqList
			 * @description  : faq를 설정한다.
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data	 : 이용정보
			 */
			setFaqList : function(data) {
				var html  = '<h1>FAQ</h1>';
					html += '<button onclick = "location.href =\''+ contextPath +'/view/use/guideMain/faq\'"><img src="'+contextPath+'/img/common/btn_plus.png" alt=""/>더보기</button>';
					html +=	'<table>';
					html +=		'<colgroup>';
					html += 		'<col style=""/>'
					html +=			'<col style="width:130px;"/>';
					html +=		'</colgroup>';
					html +=	'<tbody>'
				
				if(data.length > 0){
					for(var i=0; i<data.length; i++){
						html +=		'<tr>'
						html +=			'<td>'
						html +=				'<a tabindex="-1" href="'+ contextPath +'/view/use/guideMain/faq?post_no='+data[i].post_no+'" title="'+data[i].title+'" target="_self">'+data[i].title+'</a>';	
						//html +=				'<a tabindex="-1" href="' + contextPath + '/view/use/faq/faqDetailView?post_no='+data[i].post_no+'" title="'+data[i].title+'" target="_self">'+title+'</a>';
						html +=			'</td>'
						html +=			'<td>' + data[i].reg_ts + '</td>'
						html +=		'</tr>'
					}
				}else{
						html +=		'<tr>'
						html +=			'<td>'
						html +=				'<a tabindex="-1" title="FAQ가 없습니다." target="_self">FAQ가 없습니다.</a>';	
						html +=			'</td>'
						html +=			'<td></td>'
						html +=		'</tr>'
				}
						
				
					
					html +=	'</tbody>'
					html +=	'</table>'						
					
				$("#faq-list").html(html);
			},
			
			/**
			 * 
			 * @name         : setMydataList
			 * @description  : 나의데이터 정보를 설정한다.
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data	 : 이용정보
			 */
			setMyDataList : function(data) {
				var html  = '<h1>나의 데이터</h1>';
					html += '<button onclick = "location.href =\''+ contextPath +'/view/myData/myDataManagement\'"><img src="'+contextPath+'/img/common/btn_plus.png" alt=""/>더보기</button>';
					html +=	'<table>';
					html +=		'<colgroup>';
					html += 		'<col style=""/>'
					html +=			'<col style="width:130px;"/>';
					html +=		'</colgroup>';
					/*
					html += '<thead>';
					html +=		'<th style="text-align:center;">데이터명</th>';
					html +=		'<th style="text-align:center;">크기</th>';
					html +=	'</thead>';
					*/
					html +=	'<tbody>'
				if(data.length > 0){
					for(var i=0; i<data.length; i++){
						html +=		'<tr>'
						html +=			'<td>'
						if(data[i].category4 == "SOP2016" || data[i].category4 == "ANALYSIS_2016"){
							html +=			'<a tabindex="-1" href="'+ contextPath +'/view/analysis/resultMap?id='+data[i].resource_id+'" title="'+data[i].data_name+'" target="_self">'+data[i].description+'</a>';
						}else{
							html +=			'<a tabindex="-1" href="'+ contextPath +'/view/myData/myDataDetail?resource_id='+data[i].resource_id+'" title="'+data[i].data_name+'" target="_self">'+data[i].description+'</a>';
						}
						html +=			'</td>'
						//html +=			'<td>' + data[i].data_size + '</td>'
						var data_create_time = (data[i].data_create_time).substring(0,10); // 날짜까지만 표시
						html +=			'<td>' + data_create_time + '</td>'
						html +=		'</tr>'
					}
				}else{
						html +=		'<tr>'
						html +=			'<td>'
						html +=				'<a tabindex="-1" target="_self">데이터가 없습니다.</a>';
						html +=			'</td>'
						html +=			'<td></td>'
						html +=		'</tr>'
				}
					
					html +=	'</tbody>'
					html +=	'</table>'			
					
				$("#my-list").html(html);
			},
			
			/**
			 * 
			 * @name         : setDashBoardList
			 * @description  : 대시보드 내용 표출
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data	 : 이용정보
			 */
			setDashBoardList : function(data) {
				var data = data.dashDataList;
				
				var dataCnt = data.orgdatacnt; 					// 원본, 사용자 데이터
				var lcDataCnt = data.lcdatacnt; 				// 위치데이터
				var analysisDataCnt = data.analysisdatacnt; 	// 분석데이터
				var shareDataCnt = data.sharedatacnt;			// 공유데이터
				var favDataCnt = data.favdatacnt;				// 관심컨텐츠
				
				var dataCntHtml = $homeMain.ui.setDashHtml(dataCnt);			//사용자, 원본 데이터
				var lcDataCntHtml =	$homeMain.ui.setDashHtml(lcDataCnt);		//위치데이터 
				var shareDataCntHtml = $homeMain.ui.setDashHtml(shareDataCnt);	//공유데이터
				var analysisDataCntHtml = $homeMain.ui.setDashHtml(analysisDataCnt);//분석데이터
				var favDataCntHtml = $homeMain.ui.setDashHtml(favDataCnt);		//관심 컨텐츠
				
				
				$("#dataCnt").html(dataCntHtml); // 원본, 사용자 데이터
				$("#lcDataCnt").html(lcDataCntHtml); // 위치 데이터
				$("#shareDataCnt").html(shareDataCntHtml); // 공유 데이터
				$("#analysisDataCnt").html(analysisDataCntHtml); // 분석 데이터
				$("#favCnt").html(favDataCntHtml); // 관심컨텐츠

				$("#dashBoard").show(); // 대시보드 표시 (깜빡임 방지)
				
			},
			
			/**
			 * 
			 * @name         : setDashBoardOptList
			 * @description  : 대시보드 설정창 제어
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data	 : 이용정보
			 */
			setDashBoardOptList : function(data) {
				var data = data.dashOptList;
				
				// 사용공간/ 저장공간 수치 표시 start
				var useSz = data.use_sz; 		// 저장 공간
				var usedSz = data.used_sz; 		// 사용중인 공간
				
				if(usedSz == 0 || usedSz == null){
					usedSz = '미사용 <span> /</span>';
				}else{
					usedSz = $homeMain.ui.number_to_human_size(usedSz); // 파일 사이즈 단위 변환
				}
				
				useSz = useSz + ""; // 저장공간 한자리일 경우 앞자리 '0' 추가
				if(useSz.length == 1 ){ 
					useSz = "0"+useSz;
				}

				var html
					html = usedSz +"<br>" + useSz + " <span>GB</span>"
				$("#saveSpacial").html(html); // 사용공간/ 저장공간 수치 표시
				// 사용공간/ 저장공간 수치 표시 end
				
				//원본 데이터 , 사용자 데이터
				if (data.usr_data_yn == "Y"){
					$("#checkbox01").prop("checked", true);
					$("#dashBox_1").show();
				}else{
					$("#checkbox01").prop("checked", false);
					$("#dashBox_1").hide();
				}
				
				// 위치 데이터
				if (data.lc_data_yn == "Y"){
					$("#checkbox03").prop("checked", true);
					$("#dashBox_2").show();
				}else{
					$("#checkbox03").prop("checked", false);
					$("#dashBox_2").hide();
				}
				
				// 분석 데이터
				if (data.analysis_data_yn == "Y"){
					$("#checkbox05").prop("checked", true);
					$("#dashBox_3").show();
				}else{
					$("#checkbox05").prop("checked", false);
					$("#dashBox_3").hide();
				}
				
				// 공유 데이터
				if (data.share_data_yn == "Y"){
					$("#checkbox06").prop("checked", true);
					$("#dashBox_4").show();
				}else{
					$("#checkbox06").prop("checked", false);
					$("#dashBox_4").hide();
				}
				
				// 관심 컨텐츠
				if (data.fav_yn == "Y"){
					$("#checkbox02").prop("checked", true);
					$("#dashBox_5").show();
				}else{
					$("#checkbox02").prop("checked", false);
					$("#dashBox_5").hide();
				}
				
				// 남은공간/저장공간
				if (data.save_spacial_yn == "Y"){
					$("#checkbox04").prop("checked", true);
					$("#dashBox_6").show();
				}else{
					$("#checkbox04").prop("checked", false);
					$("#dashBox_6").hide();
				}
				
				
			},
			
			
			/**
			 * @name         : setDashBoardOptList
			 * @description  : 대시보드 용량 표시 계산
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data	 : 이용정보
			 */
			number_to_human_size : function(x) {
				  var s = ['<span>B /</span>', '<span>KB /</span>', '<span>MB /</span>', '<span>GB /</span>', '<span>TB /</span>', '<span>PB /</span>'];
				  var e = Math.floor(Math.log(x) / Math.log(1024));
				  return (x / Math.pow(1024, e)).toFixed(1) + " " + s[e];
			},
			
			
			/**
			 * @name         : setDashBoardList
			 * @description  : 대시보드 html 생성
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data	 : 이용정보
			 */
			setDashHtml : function(cnt) {
				cnt = cnt + ""; 
				if(cnt.length == 1 ){ 
					cnt = "0"+cnt;
				}

				var html  = cnt;
				if (html == 0){
					html = "00 <span>건</span>";
				}else {
					html = html + " <span>건</span>";
				}
				return html;
			}
			
			
			
	};
	
	
	
	//AJAX 내용작성
	$homeMain.request = {
			
			/**
			 * 
			 * @name         : doReqNoticeList
			 * @description  : 공지사항정보를 조회한다.
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReqNoticeList : function() {
				var options = {
					isBeforSend : false,
					params : {
						startIdx : 0,
						resultCnt : 5
					}
				};
				$ajax.requestApi(contextPath + "/api/use/notice/getNoticeList.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (res.result.length > 0) {
								$homeMain.ui.setNoticeList(res.result);
							}else{
								$homeMain.ui.setNoticeList(res.result);
							}
							break;
						default:
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqGuideList
			 * @description  : 이용정보를 조회한다.
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReqGuideList : function() {
				var options = {
					isBeforSend : false,
					params : {
						startIdx : 0,
						resultCnt : 3
					}
				};
				$ajax.requestApi(contextPath + "/api/use/guide/getGuideList.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (res.result.length > 0) {
								$homeMain.ui.setGuideList(res.result);
							}else{
								$homeMain.ui.setGuideList(res.result);
							}
							break;
						default:
							break;
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : doReqQnaList
			 * @description  : qna를 조회한다.
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReqQnaList : function() {
				var options = {
					isBeforSend : false,
					params : {
						startIdx : 0,
						resultCnt : 5
					}
				};
				$ajax.requestApi(contextPath + "/api/use/qna/getQnaList.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (res.result.length > 0) {
								$homeMain.ui.setQnaList(res.result);
							}else{
								$homeMain.ui.setQnaList(res.result);
							}
							break;
						default:
							break;
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : doReqFaqList
			 * @description  : faq를 조회한다.
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReqFaqList : function() {
				var options = {
					isBeforSend : false,
					params : {
						startIdx : 0,
						resultCnt : 5
					}
				};
				$ajax.requestApi(contextPath + "/api/use/faq/getFaqList.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (res.result.length > 0) {
								$homeMain.ui.setFaqList(res.result);
							}else{
								$homeMain.ui.setFaqList(res.result);
							}
							break;
						default:
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : doReqMyDataList
			 * @description  : 나의데이터 정보를 조회한다.
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReqMyDataList : function() {
				var options = {
					isBeforSend : false,
					params : {
						startIdx : 0,
						resultCnt : 5
					}
				};
				$ajax.requestApi(contextPath + "/api/myData/getMyDataList.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (res.result.length > 0) {
								$homeMain.ui.setMyDataList(res.result);
							}else{
								$homeMain.ui.setMyDataList(res.result);
							}
							break;
						case -100:
							$message.open("알림", res.errMsg);
							break;
						default:
							break;
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : doReqDashBoardList
			 * @description  : 대시보드 정보를 조회한다.
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReqDashBoardList : function() {
				var options = {
					isBeforSend : false,
					params : {
					}
				};
				$ajax.requestApi(contextPath + "/api/index/getDashBoardList.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (res.result.length > 0) {
								$homeMain.ui.setDashBoardList(res.result);
								$homeMain.ui.setDashBoardOptList(res.result);
							}else{
								$homeMain.ui.setDashBoardList(res.result);
								$homeMain.ui.setDashBoardOptList(res.result);
							}
							
							break;
						case -100:
							$message.open("알림", res.errMsg);
							break;
						default:
							break;
					}
				});
			},
			
			
			/**
			 * 
			 * @name         : doReqSaveDashBoardOptList
			 * @description  : 대시보드 설정 정보를 저장한다.
			 * @date         : 2018. 07. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReqSaveDashBoardOptList : function() {
				var dashCnt = 0; // 대시보드 표출 항목 5개 제한
				
				//사용자 데이터, 원본데이터
				var usr_data_yn = "Y"
				dashCnt = dashCnt + 1;
			
				//관심 컨텐츠
				var fav_yn = "Y"
				dashCnt = dashCnt + 1;
				
				//위치 데이터
				var lc_data_yn = "Y"
				dashCnt = dashCnt + 1;
				
				//남은공간/저장공간
				
				//분석데이터
				var analysis_data_yn = "Y"
				dashCnt = dashCnt + 1;
				
				//공유 데이터
				var share_data_yn = "Y"
				dashCnt = dashCnt + 1;
				
				var options = {
					isBeforSend : false,
					params : {
						usr_data_yn : usr_data_yn ,
						fav_yn : fav_yn , 
						lc_data_yn : lc_data_yn ,
						save_spacial_yn : save_spacial_yn ,
						analysis_data_yn : analysis_data_yn ,
						share_data_yn : share_data_yn
					}
				};
				$ajax.requestApi(contextPath + "/api/index/saveDashBoardOpt.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							// 정상 완료 시 대시보드 재설정
							$homeMain.request.doReqDashBoardList();
							
							// 옵션 창 닫기
							$(".dashbordSet").hide();
							$("#dashButton").removeClass("on");  // 클래스 on 지운다.
							
							break;
						case -100:
							$message.open("알림", res.errMsg);
							break;
						default:
							break;
					}
				});
			},
			
			
			
	};
	
	//EVENT 내용작성
	$homeMain.event = {

			setUIEvent : function(){
				
				/**
				 * @name         : doReqSaveDashBoardOptList
				 * @description  : 대시보드 설정창 이외 영역 클릭시 닫음
				 * @date         : 2018. 07. 11. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */
				$('html').click(function(e) {
					if(!$(e.target).hasClass("dashbordSet")) {
						var depth_1 = $(e.target).parent().hasClass("dashbordSet");
						var depth_2 = $(e.target).parent().parent().hasClass("dashbordSet");
						var depth_3 = $(e.target).parent().parent().parent().hasClass("dashbordSet");
						
						if(depth_1 == false && depth_2 == false && depth_3 == false){
							if($(e.target).attr('id') != 'dashButton'){
								$(".dashbordSet").hide();
								$("#dashButton").removeClass("on");  // 클래스 on 지운다.
							}
						}
					} 
				}); 
				
				//대시보드 옵션 버튼
				$("#dashButton").click(function(){
					var ck = $(this).hasClass("on"); ///  클래스 on이 있으면 true  없으면 false 반환
					if(ck){ // true 이면
						$(".dashbordSet").hide();
						$(this).removeClass("on");  // 클래스 on 지운다.
					}else{
						$(".dashbordSet").show();
						$(this).addClass("on");    // 클래스 on 넣는다.
					}
				});
				
				//메인메뉴 컨텐츠 마우스 오버
				$("body").on("mouseover",".box01,.box02,.box03",function(){
					$(this).find(".contentBox").css("display","none");
					$(this).find(".contentBox_over").css("display","block"); 
				});
				$("body").on("mouseleave",".box01,.box02,.box03",function(){		
					$(this).find(".contentBox_over").css("display","none"); 
					$(this).find(".contentBox").css("display","block"); 
				});
				

				/**
				 * @name         : doReqSaveDashBoardOptList
				 * @description  : 대시보드 표출 옵션 저장 버튼
				 * @date         : 2018. 07. 11. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */
				$("#dashSaveBtn").click(function(){
					if(confirm("대시보드 설정을 저장하시겠습니까?") == true){
						$homeMain.request.doReqSaveDashBoardOptList();
						
						// mng_s 2019. 06. 03 j.h.Seok
						$log.srvLogWrite("Z0", "02", "02", "00", "", "");
					}else{
						return;
					}
				});
				
				/**
				 * @name         : doReqSaveDashBoardOptList
				 * @description  : 대시보드 항목 클릭 링크
				 * @date         : 2018. 07. 11. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */
				$(".dashbordBox").click(function(){
					var searchId = $(this).find(".boxInfo").attr("id");
					if(searchId == 'dataCnt'){
						searchId = 'userData'
					}else if(searchId == 'lcDataCnt'){
						searchId = 'geoCoding'
					}else if(searchId == 'analysisDataCnt'){
						searchId = 'analysis'
					}else if(searchId == 'shareDataCnt'){
						searchId = 'inst_share_yn'
					}else if(searchId == 'favCnt'){
						searchId = 'fav_yn'
					}

					if(searchId =='saveSpacial'){
						location.href= contextPath+'/view/member/myPageMain';
					}else{
						location.href= contextPath+'/view/myData/myDataManagement?standard='+searchId;
					}
					
				});
				
				
				/**
				 * 
				 * @name         : doReqSaveDashBoardOptList
				 * @description  : 대시보드 표출 옵션 체크박스 제어 (최대 5 항목)
				 * @date         : 2018. 07. 11. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */
			    $("input[name=set]:checkbox").change(function() {// 체크박스들이 변경됬을때
			        var cnt = 5; // 최대 5 항목
			        if( cnt==$("input[name=set]:checkbox:checked").length ) {
			            $(":checkbox:not(:checked)").attr("disabled", "disabled");
			        } else {
			            $("input[name=set]:checkbox").removeAttr("disabled");
			        }
			    });
			
			}
	};

}(window,document));