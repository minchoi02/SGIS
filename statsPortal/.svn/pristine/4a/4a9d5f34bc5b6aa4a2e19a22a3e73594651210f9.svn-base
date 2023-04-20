/**
 * 직업전망
 * vjJobProspectingInfo
 * 경로 : 일자리 맵 서비스 > 일자리 보기 > 데이터보드 > 직업전망 
 * 
 * history : 
 *	2018.10.17	ywKim	신규
 *
 * author : ywKim
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$vjJobProspectingInfo = W.$vjJobProspectingInfo || {};
	
	$vjJobProspectingInfo.ui = {
		selectedItem : null,		// 선택된 항목
//		selectedCode : null,		// 선택된 직업전망 코드
		selectedSummaryIdex : -1,	// 선택된 요약 탭 인덱스
		
		/**
		 * @name         : 
		 * @description  : 
		 * @date         : 2018.10.17
		 * @author	     : ywKim
		 * @history 	 :
		 * @params 	pJobClassificationCode	: 모집직종 코드
		 * 			pJobClassificationName	: 모집직종 이름 
		 */
		init : function(pJobClassificationCode, pJobClassificationName) {
			$('#vjJobProspectingInfo #vjAbout').text(pJobClassificationName + ' 관련직');
			$vjJobProspectingInfo.ui.loadCodeList(pJobClassificationCode);
		},
		/**
		 * @name         : 코드 목록 조회
		 * @description  : 
		 * @date         : 2018.10.17
		 * @author	     : ywKim
		 * @history 	 :
		 * @params pJobClassificationCode	: 모집직종 코드 
		 */
		loadCodeList : function(pJobClassificationCode) {

			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/viewJobs/selectJobProspectingCodeList.json",
				async: false,
				dataType: "json",
				data: {rcrjss: pJobClassificationCode},
				success: function(res) {
					if(res.errCd == 0){
						/*
						var dataList = res.result.dataList;
						$vjJobProspectingInfo.ui.drawCodeList('#vjJobProspectingInfo #vjDataList', dataList);
						*/

						//2019-01-03 openAPI 조회 ajax로 변경
						var lvCodeList = res.result.codeList;
						var lvDataList = [];
						var completedCnt = 0;	// ajax 호출 완료 카운팅
						if(lvCodeList != null && lvCodeList.length > 0) {
							for(var i = 0; i < lvCodeList.length; i++) {
								var lvCode = lvCodeList[i].cd;
								var lvUrl = "http://openapi.work.go.kr/opi/opi/opia/korJobProspectApi.do?authKey=WNJCQWWNSBJ0Y7F16CGHU2VR1HK&returnType=XML&target=fJobCD&srchType=O&occupation="+lvCode;
								//워크넷 Open API 호출
								$.ajax({
									crossOrigin: true,
									url: lvUrl,
									type: 'get',
									dataType: 'xml',
									async: false, // 크로스 도메인은 비동기 false가 안됨.
						            success: function(data) {
						            	//$(data).find("total"); 항목 개수
						            	$(data).find("fJobList").each(function(){
						            		//명시적 데이터 입력
						            		var lvDataMap = {
						            			fJobClCd : $(this).find("fJobClCd").text()
						            			,fJobCd : $(this).find("fJobCd").text()
						            			,fJobNm : $(this).find("fJobNm").text()
						            		};
						            		/*
						            		//명시 없이 일괄로 넣을때 사용 
						            		$(this).children().each(function() {
						            			console.log(this);
						            			console.log(this.tagName);
						            			console.log(this.nodeName);
						            			lvDataMap[this.tagName.toLowerCase()] = $(this).text();
						            		});
						            		*/
											lvDataList.push(lvDataMap);
										});
						            	// 리스트 처리(가장 마지막으로 조회된 내용으로 덮어 씌워짐)
						            	$vjJobProspectingInfo.ui.drawCodeList('#vjJobProspectingInfo #vjDataList', lvDataList);
						            },
									complete:function(){
										completedCnt++;
										if (completedCnt == lvCodeList.length) {
											$workRoad.ui.hideLoading();
										}
									},
						        });
							}
						} else {
							$workRoad.ui.hideLoading();
						}
					} else {
						$workRoad.ui.hideLoading();
						alert('failed!');
					}
				},
				error:function(err) {
					$workRoad.ui.hideLoading();
					alert(err.responseText);
				},
	            beforeSend:function(){
					$workRoad.ui.showLoading();
				},  
			});
		},
		drawCodeList: function (pId, pDataList) {
			var html = '';
			
			for(var  i = 0; i < pDataList.length; i ++) {
				html += '<li>';
				html += '<input type="checkbox" name="condition" id="rb' + (i+1) + '" value="' + pDataList[i].fJobCd + '" />';
				html += '<label for="rb' + (i+1) + '">' + pDataList[i].fJobNm + '</label>';
//				html += '<label for="rb' + (i+1) + '">' + pDataList[i].fJobNm + ' (' + pDataList[i].fJobCd + ')</label>';
//				html += pDataList[i].fJobNm + ' (' + pDataList[i].fJobCd + ')';
				html += '</li>';
			}

			$(pId).html(html);
		},
		/**
		 * @name         : 요약 조회
		 * @description  : 
		 * @date         : 2018.10.18
		 * @author	     : ywKim
		 * @history 	 :
		 * @params pJobCode	: 모집직종 코드 
		 */
		loadSummary : function(pJobCode) {
			
			// openApi 호출을 js버전으로 변경 - 2019.01.04	ywKim	변경
			var lvUrl = "http://openapi.work.go.kr/opi/opi/opia/korJobProspectApi.do?authKey=WNJCQWWNSBJ0Y7F16CGHU2VR1HK&returnType=XML&target=fJobDTL&fJobCd=" + pJobCode;			
			$.ajax({
				crossOrigin: true,
				url: lvUrl,
				type: 'get',
				dataType: 'xml',
				async: false, // 크로스 도메인은 비동기 false가 안됨.
	            success: function(data) {
	            	var summary = {
	            			fJobCd : $(data).find("fJobCd").text(),
	            			fJobClCd : $(data).find("fJobClCd").text(),
	            			eduTranning : $(data).find("eduTranning").text(),
	            			fJobNm : $(data).find("fJobNm").text(),
	            			fJobProspect : $(data).find("fJobProspect").text(),
	            			fJobStatus : $(data).find("fJobStatus").text(),
	            			whatWork : $(data).find("whatWork").text()
	            	};

					$vjJobProspectingInfo.ui.drawSummary(summary);
	            },
	            beforeSend:function(){
					$workRoad.ui.showLoading();
				},
				complete:function(){
					$workRoad.ui.hideLoading();
				},
	        });
//			$.ajax({
//				type: "POST",
//				url : contextPath + "/ServiceAPI/workRoad/viewJobs/selectJobProspectingSummary.json",
//				async: false,
//				dataType: "json",
//				data: {job_cd: pJobCode},
//				success: function(res) {
//					if(res.errCd == 0){
//						var data = res.result.data;
//						console.log(data);
//						$vjJobProspectingInfo.ui.drawSummary(data);
//					} else {
//						alert('failed!');
//					}
//				} ,
//				error:function(err) {
//					alert(err.responseText);
//				}  
//			});
		},
		drawSummary: function (pData) {
			if ($.trim(pData.fJobNm).length == 0) {
				$('#vjJobProspectingInfo #vjSummaryTitle').html('&nbsp;');
			} else {
				$('#vjJobProspectingInfo #vjSummaryTitle').html(pData.fJobNm);
			}
			
			var $this = $('#vjJobProspectingInfo #vjSummaryContent');
			$this.children('div').eq(0).html(pData.whatWork);
			$this.children('div').eq(1).html(pData.eduTranning);
			$this.children('div').eq(2).html(pData.fJobStatus);
			$this.children('div').eq(3).html(pData.fJobProspect);
		},
		
		/**
		 * @name         : (다중선택)항목 체크
		 * @description  : 
		 * @date         : 2018.10.02
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		toggleItem : function(pSender) {
			
			var ck = $(pSender).hasClass('on');
			if(!ck){
				$(pSender).addClass('on');
//				$(pSender).prev().prop("checked", true);
//				$(pSender).prev().attr('checked', 'checked');
			}else{
				$(pSender).removeClass('on');
//				$(pSender).prev().prop("checked", false);
//				$(pSender).prev().removeAttr('checked');
			}
			
		},
		selectItem : function(pSender) {
			
			if ($vjJobProspectingInfo.ui.selectedItem == pSender) return;
				
			if ($vjJobProspectingInfo.ui.selectedItem != null) {
				$vjJobProspectingInfo.ui.toggleItem($vjJobProspectingInfo.ui.selectedItem);
			}
			$vjJobProspectingInfo.ui.toggleItem(pSender);
			$vjJobProspectingInfo.ui.selectedItem = pSender;
			
			var code = $(pSender).prev().val();
			$vjJobProspectingInfo.ui.loadSummary(code);
			$vjJobProspectingInfo.ui.changeSummary(0);
		},
		changeSummary : function(pIndex) {

			if ($vjJobProspectingInfo.ui.selectedSummaryIdex == pIndex) return;
			
			var prevIdx = $vjJobProspectingInfo.ui.selectedSummaryIdex;
			var $this = $('#vjJobProspectingInfo .pcTabs li');
			var $that = $('#vjJobProspectingInfo #vjSummaryContent div');
			
			if (prevIdx >= 0) {
				$this.eq(prevIdx).find('a').removeClass("on");
				$that.eq(prevIdx).css({display: 'none'});
			}
			$this.eq(pIndex).find('a').addClass("on");
			$that.eq(pIndex).css({display: 'block'});
			
			$vjJobProspectingInfo.ui.selectedSummaryIdex = pIndex;
		},
	};	
	
	$vjJobProspectingInfo.event = {
			/**
			 * @name		 : setUIEvent 
			 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
			 * @date		 : 2018.09.17
			 * @author		 : ywKim
			 * @history 	 :
			 * 		2018.09.17	ywKim	신규
			 */
			setUIEvent: function() {
				console.log("$vjJobProspectingInfo.event.setUIEvent() called.");
				
				$workRoad.event.set("click", "#vjJobProspectingInfo #vjDataList label", function() {
					$vjJobProspectingInfo.ui.selectItem(this);
				});

				$workRoad.event.set("click", "#vjJobProspectingInfo .pcTabs li", function() {
					var idx = $(this).index();
					$vjJobProspectingInfo.ui.changeSummary(idx);
				});		
			},			
	}		
		
}(window, document));