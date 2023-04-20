
(function(W,D){
	W.$analysisGuideMain = W.$analysisGuideMain || {};
	
	$(document).ready(function(){
		$analysisGuideMain.event.init();
		$analysisGuideMain.event.setUIEvent();
	});
	
	//UI 내용작성
	$analysisGuideMain.ui = {
			
			
			/**
			 * 
			 * @name         : setAnalysisGuideList
			 * @description  : 활용사례 페이지 설정
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 : 2018.11.09. 권차욱 수정
			 */
			setAnalysisGuideList : function(list){
				var html = "";
				var total = 0;
				var imgChk = 0;
				var colorChk = 0;
				var action_type = "";
				
				for(var i = 0; i < list.length; i++){
					
					// 활용사례 얼굴 이미지 번호 1~6 로테이션
					imgChk = i+1;
					if (imgChk % 6 == 0){ //6번을 넘어갈 경우 1번부터 다시 불러옴
						imgChk = 6;
					}else{
						imgChk = imgChk % 6;
					}
					
					//백그라운드 색 설정 1~2 로테이션
					colorChk = i+1;
					if (colorChk % 2 == 1){
						colorChk = 1;
					}else{
						colorChk = 2;
					}
					
					// 활용사례 항목 생성
					html += '<li style="background: url(../../img/analysis/use/use_li_bg0'+imgChk+'.png)no-repeat left bottom;"><h1>'+(i+1)+'</h1>';
					html += 	'<div class="normal">';
					html += 		'<div class="normal_tilte">';
					html +=				'<span class="mr5">';
					html += 			'<img src="'+contextPath+'/img/analysis/use/use_icon0'+colorChk+'_up.png" alt=""/></span>';
					html += 			list[i].title+'<span class="ml10">';
					html += 			'<img src="'+contextPath+'/img/analysis/use/use_icon0'+colorChk+'_down.png" alt=""/></span>';
					html += 	'</div>';
					
					html += 	'<div class="normal_cont">';
					html += 		list[i].report_info
					html += 	'</div>';
					
					html += 	'<div class="hover">';
					html += 		'<div class="hover_tilte">';
					html +=				'<span class="mr5">';
					html += 			'<img src="'+contextPath+'/img/analysis/use/use_icon03_up.png" alt=""/></span>';
					html += 			list[i].title+'<span class="ml10">';
					html += 			'<img src="'+contextPath+'/img/analysis/use/use_icon03_down.png" alt=""/></span>';
					html += 	'</div>';
					
					html += 	'<div class="hover_cont">';
					html += 		'<p>'+list[i].content+'</p>'
					
					if(list[i].action_type == "VORONOI"){
						action_type = "보로노이 다이어그램 보기"
					}else if(list[i].action_type == "OPERATION"){
						action_type = "데이터 간 연산 분석 보기"
					}else if(list[i].action_type == "LQ"){
						action_type = "입지 계수 보기"
					}else if(list[i].action_type == "SPATIAL"){
						action_type = "공간자기상관 분석 보기"
					}else if(list[i].action_type == "BOUNDARY"){
						action_type = "경계 분석 보기"
					}else if(list[i].action_type == "BUFFER"){
						action_type = "버퍼 분석 보기"
					}
					
					if (colorChk == 1){
						html += 		'<button class="pbtn01" value="'+list[i].resource_id+'">추천분석 : '+action_type+'</button>'
					}else{
						html += 		'<button class="blue pbtn02" value="'+list[i].resource_id+'">추천분석 : '+action_type+'</button>'
					}
					html += 	'</div>';
					
				}
				
				$("#guideContetnBox").empty();
				$("#guideContetnBox").html(html);
				
				//상세페이지 분석 데이터 이동 링크 리소스 아이디 부여
				for(var i = 0; i < list.length; i++){
					var	resourceIdDetail = list[i].resource_id;
					var resourceIdHtml = 'javascript:window.location.href="' + contextPath + '/view/analysis/resultMap?id='+resourceIdDetail+'";' ;
					$("#"+resourceIdDetail).find(".usePopupB").find(":button").attr("onclick", resourceIdHtml);
				}
				
				//이벤트 생성
				$analysisGuideMain.event.setUIEvent();
				
				//css 조정
				$(".useBox li:first-child").css("margin-left","0");
				for(var i = 1; i < list.length; i++){ // 각 열 첫 항목마다 마진값 맞춤
					if (i > 3 && i % 3 == 1){
						$(".useBox li:nth-child("+i+")").css("margin-left","0");
					}
				}
				
				
				
				
			}
			
	};
	
	//AJAX 내용작성
	$analysisGuideMain.request = {
			/**
			 * 
			 * @name         : doReqAnalysisGuideList
			 * @description  : 활용사례 정보를 조회한다.
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			doReqAnalysisGuideList : function(){
				var options = {
						isBeforSend : false,
						params : {}
				};
				
				$ajax.requestApi(contextPath+"/api/analysis/getAnalysisGuideList.do",options,function(res){
					
					switch(parseInt(res.errCd)){
						case 0 : 
							$(".useBox").show();
							var result = res.result;
							if (result.length > 0) {
								$analysisGuideMain.ui.setAnalysisGuideList(result);
							}else {
								//$(".useBox").hide();
							}
							break;
						default :
							$message.open("알림",res.errMsg);
							break;
					}
				});
			}
	
	
	};
	
	//EVENT 내용작성
	$analysisGuideMain.event = {
			
			init : function(){
				$analysisGuideMain.request.doReqAnalysisGuideList();
				
			},
			
			setUIEvent : function(){
				
				
				// 활용사례 페이지 버튼 시작
				$(".useBox li").on("mouseover",function(){  
					$(this).find(".hover").css("display","block");
				}); 
				$(".useBox li").on("mouseleave",function(){  
					$(this).find(".hover").css("display","none");
				}); 		
				
				// 상세 페이지 호출
				$(".pbtn01, .pbtn02").on("click",function(){  
					var resourceId = $(this).val();
					$(".usePopup").css("display","none");		
					$(".usePopupWrap").css("display","block");
					$("#"+resourceId).css("display","block");
				});	
				
				// 상세 페이지 닫기
				$(".usePopupTitle button").on("click",function(){  
					$(".usePopupWrap, .usePopup").css("display","none");
				});
				
				/*$(".pbtn01").on("click",function(){  
					$(".usePopupWrap, .p01").css("display","block");
					$(".p02, .p03, .p04,  .p05, .p06").css("display","none");
				});	
				$(".pbtn02").on("click",function(){  
					$(".usePopupWrap, .p02").css("display","block");		
					$(".p01, .p03, .p04, .p05, .p06").css("display","none");
				});	
				$(".pbtn03").on("click",function(){  
					$(".usePopupWrap, .p03").css("display","block");
					$(".p01, .p02, .p04, .p05, .p06").css("display","none");
				});	
				$(".pbtn04").on("click",function(){  
					$(".usePopupWrap, .p04").css("display","block");
					$(".p01, .p02, .p03, .p05, .p06").css("display","none");
				});	
				$(".pbtn05").on("click",function(){  
					$(".usePopupWrap, .p05").css("display","block");
					$(".p01, .p02, .p03, .p04, .p06").css("display","none");
				});	
				$(".pbtn06").on("click",function(){  
					$(".usePopupWrap, .p06").css("display","block");
					$(".p01, .p02, .p03, .p04, .p05").css("display","none");
				});	
				$(".usePopupTitle button").on("click",function(){  
					$(".usePopupWrap, .p01, .p02, .p03, .p04, .p05, .p06").css("display","none");
				});*/
				// 활용사례 페이지 버튼 종료
				
				
			}
	};
	
}(window,document));