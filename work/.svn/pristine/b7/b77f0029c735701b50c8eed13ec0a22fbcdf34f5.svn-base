(function(W, D) {
	W.$systemSts = W.$systemSts || {};
	
	$(document).ready(function() {
		$systemSts.request.getManageStatusCount();
		$systemSts.request.selectCollectJobHistory();
		$systemSts.request.selectApproveReq();
		$systemSts.request.selectNotice5(); 
		$systemSts.request.selectQNA5(); 
		$systemSts.request.selectPopNotice5();
		$systemSts.request.selectReqTransDataSts();
		$(".deem").hide();
		
		$log.srvLogWrite("Z1", "01", "01", "01", "", "");
		
		$(function() {
		    $(".dialog").dialog({
		      autoOpen: false,
		      width: 'auto',
		      height: 'auto',
		      modal: true,
		      resizable: false,
		      minimizable: false,
		      minimizeIcon: 'ui-icon-minus'
		    });
		});
	});
	
	$systemSts.ui = {
			
	};
	
	//AJAX 내용작성
	$systemSts.request = {
			/**
			 * 
			 * @name         : getManageStatusCount
			 * @description  : 운영현황 건수를 조회한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 */
			getManageStatusCount : function() {
				var options = {};
			
				$ajax.requestApi(contextPath + "/api/sysmgt/getManageStatusCount.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							$("#qna_cnt").html(result.qna_cnt+"건");
							$("#down_cnt").html(result.down_cnt+"건");
							$("#dat_cnt").html(result.dat_cnt+"건");
							$("#join_cnt").html(result.join_cnt+"건");
							break;
						default:
							$messageNew.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : selectCollectJobHistory
			 * @description  : 수집현황을 조회한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 */
			selectCollectJobHistory : function() {
				var options = {};
				var params = {};
				params.resultCnt = 5;
				options.params = params;
				
				$ajax.requestApi(contextPath + "/api/collect/getCollectJobSts.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var data = res.result;
							var html = "";
							for (var i=0; i<data.length; i++) {
								html +=	"<tr>";
								html +=	"<td>"+data[i].collect_dt+"</td>";
								if (data[i].worknet_cnt>0) {
									html +=	"<td>"+data[i].worknet_cnt+"</td>";
								} else {
									html +=	"<td>실패</td>";
								}
								if (data[i].incruit_cnt>0) {
									html +=	"<td>"+data[i].incruit_cnt+"</td>";
								} else {
									html +=	"<td>실패</td>";
								}
								if (data[i].transfer_dt!=null || data[i].transfer_dt!='') {
									html +=	"<td>"+data[i].transfer_dt+"</td>";
								} else {
									html +=	"<td>실패</td>";
								}
								
								html +=	"</tr>";
							}
							$('#collect_sts_tbl > tbody:last').append(html);
							break;
						default:
							$messageNew.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : selectApproveReq
			 * @description : 승인요청을 조회한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 */
			selectApproveReq : function() {
				var options = {};
			
				$ajax.requestApi(contextPath + "/api/sysmgt/selectMemberSts.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var data = res.result;
							var html = "";
							for (var i=0; i<data.length; i++) {
								html +=	"<tr>";
								html +=	"<td>"+data[i].user_nm+"</td>"; 
								html +=	"<td>"+data[i].reg_ts+"</td>";
								html +=	"<td>가입</td>"; 
								html +=	"<td><span class='label c2'>요청</span></td>";
								html +=	"</tr>";
							}
							 
							break;
						default:
							$messageNew.open("알림", res.errMsg);
							break;
					}
				});

			},
			/**
			 * 
			 * @name         : selectReqTransDataSts
			 * @description : 승인요청을 조회한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 */
			selectReqTransDataSts : function() {
				var options = {};

				$ajax.requestApi(contextPath + "/api/sysmgt/selectReqTransDataSts.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var data = res.result;
							var html = "";
							for (var i=0; i<data.length; i++) {
								html +=	"<tr>";
								html +=	"<td>"+data[i].user_nm+"</td>"; 
								html +=	"<td>"+data[i].reg_ts+"</td>";
								html +=	"<td>전송</td>"; 
								html +=	"<td><span class='label c2'>요청</span></td>";
								html +=	"</tr>";
							}
							$('#approve_tbl > tbody:last').append(html);
							break;
						default:
							$('#approve_tbl > tbody:last').append(html);
							$messageNew.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : selectNotice5
			 * @description  : 공지사항을 조회한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 */
			selectNotice5 : function() {
				var options = {};
			
				$ajax.requestApi(contextPath + "/api/sysmgt/selectNotice5.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var data = res.result;
							var html = "";
							for (var i=0; i<data.length; i++) {
								html +=	"<tr>";
								html +=	"<td>"+data[i].title+"</td>"; 
								html +=	"<td>"+data[i].reg_ts+"</td>";
								html +=	"</tr>";
							}
							$('#notice_tbl > tbody:last').append(html);
							break;
						default:
							$messageNew.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : selectQNA5
			 * @description  : 질문/답변 조회한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 */
			selectQNA5 : function() {
				var options = {};
			
				$ajax.requestApi(contextPath + "/api/sysmgt/selectQNA5.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var data = res.result;
							var html = "";
							for (var i=0; i<data.length; i++) {
								html +=	"<tr>";
								html +=	"<td>"+data[i].title+"</td>"; 
								html +=	"<td>"+data[i].reg_ts+"</td>";
								html +=	"</tr>";
							}
							$('#qna_tbl > tbody:last').append(html);
							break;
						default:
							$messageNew.open("알림", res.errMsg);
							break;
					}
				});
			},
			
			/**
			 * 
			 * @name         : selectPopNotice5
			 * @description  : 팝업공지를 조회한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 */
			selectPopNotice5 : function() {
				var options = {};
			
				$ajax.requestApi(contextPath + "/api/sysmgt/selectPopNotice5.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var data = res.result;
							var html = "";
							for (var i=0; i<data.length; i++) {
								html +=	"<tr>";
								html +=	"<td>"+data[i].title+"</td>"; 
								html +=	"<td>"+data[i].reg_ts+"</td>";
								html +=	"</tr>";
							}
							$('#popup_tbl > tbody:last').append(html);
							break;
						default:
							$messageNew.open("알림", res.errMsg);
							break;
					}
				});
			}
	}; 
	
	$systemSts.event = {
			setUIEvent : function() {
				

			}
	};
}(window, document));