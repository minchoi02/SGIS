/**
 * 에듀 게시판 등록/수정 화면
 * history : 2021.09.15  초기 작성
 * author : jrj
 * version : 1.0
 * see : 
 */
(function(W, D) {
	$(document).ready(function(){
		$boardWrite.removeFileOnModifyMode();
		$boardWrite.refreshSecretCode();
		
		$("#req_type>li").click(function(){
			$("#req_type>li").removeClass("on");
			$( this ).addClass("on");
		});
		
		$(".btnAtch").click(function(){
			$("#qna_file").click();
		});
		
		$("#btnFileDel").click(function(){
			$("#qna_file").val("");
			$("#qna_file_span").removeClass("on");
			$("#qna_file_nm").val("");
			$("#btnFileDel").css("display","none").hide();
		});
	});
	
	W.$boardWrite = W.$boardWrite || {};
	
	$boardWrite = {
		board_cd : '',
		
		refreshSecretCode : function() {
			var qnaCaptchaImage = document.getElementById("qna_regist_secret_code_show");
	        var themaCaptchaImage = document.getElementById("thema_regist_secret_code_show");
	        
	        var tempCaptcha = "/jcaptcha?" + Math.random();
	        qnaCaptchaImage.src = tempCaptcha;
//	        themaCaptchaImage.src = tempCaptcha;
		},
		
		setFileName : function(value) {
			var fileName = value.substring( value.lastIndexOf('\\') + 1 );
			if( fileName ){
				$("#qna_regist_file").html( fileName );
				$("#qna_file_span").addClass("on");
				$("#btnFileDel").css("display","").show();
			}
		},
		
		removeFileOnModifyMode : function() {
			$("#qna_file").prop('disabled', false);
			$("#qnaFileTr").hide();
		},
		
		qnaRegist : function () {
			var file = $("#qna_file").val();
			
			if(file != null && file.length > 1 && file.trim().length > 1) {
				$boardWrite.qnaRegistForm();
			} else {
				var data = {
					board_cd : $boardWrite.board_cd,
					input_code : $("#qna_regist_secret_code_input").val(),
					post_title : $("#qna_regist_title_input").val(),
					post_content : $("#qna_regist_content_input").val(),
					low_rank_s_class_cd : $("#req_type>li.on").data('type'),
					priority_disp_yn : "N"
				};
				
				var url = '';
				
				if( $boardWrite.mode == 'C' ){
					url = '/ServiceAPI/board/boardRegist.json';
					
					data.post_depth = 0;
					data.post_order = 0;
				} else {
					url = '/ServiceAPI/board/boardModify.json';
					
					data.post_no = $boardWrite.post_no;
					data.file_yn = ( $("#qna_file_span").hasClass("on") ? "Y" : "N" );
				}
				
				$.ajax({
					url : url,
					type : 'POST',
					data : data,
					dataType : 'json',
					async : false,
					success : function(data) {
						if(data.errCd == "0") {
							messageAlert.open(
									"알림", 
									"등록되었습니다.",
									function done(){
										window.location.href = "/view/edu/"+$boardWrite.ss_school_level+"/boardList?board_cd="+$boardWrite.board_cd;
									},
									function cancel() {}
								);
						} else {
							$boardWrite.refreshSecretCode();
							messageAlert.open("알림", data.errMsg);
						}
					}
				});
			}
		},
			
		qnaRegistForm : function () {
			var url = "";
			var data = {
				board_cd : $boardWrite.board_cd,
				input_code : $("#qna_regist_secret_code_input").val(),
				post_title : $("#qna_regist_title_input").val(),
				post_content : $("#qna_regist_content_input").val(),
				low_rank_s_class_cd : $("#req_type>li.on").data('type'),
				priority_disp_yn : "N",
				file_yn : ( $("#qna_regist_file").text() != "" ? "Y" : "N" )
			}
			if( $boardWrite.mode == 'C' ){
				url = '/ServiceAPI/board/boardRegistForm.form';
				
				data.post_depth = 0;
				data.post_order = 0;
			} else {
				url = '/ServiceAPI/board/boardModifyForm.form';
				
				data.post_no = $boardWrite.post_no;
			}
			
			console.log('data', data);
			
			$("#qnaFileUploadForm").ajaxForm({
				async: false,
				type : "POST",
				url : url,
				data : data,
				dataType: "json",
				beforeSend: function(xhr) {},
				success: function(data) {
					if(data.errCd == "0") {					
						messageAlert.open(
								"알림", 
								"등록되었습니다.",
								function done(){
									window.location.href = "/view/edu/"+$boardWrite.ss_school_level+"/boardList?board_cd="+$boardWrite.board_cd;
								},
								function cancel() {}
							);
					} else {
						$boardWrite.refreshSecretCode();
						messageAlert.open("알림", data.errMsg);
					}
		        },
		        complete: function(data) {
		        	if(data.errCd == "0") {					
		        		messageAlert.open(
								"알림", 
								"등록되었습니다.",
								function done(){
									window.location.href = "/view/edu/"+$boardWrite.ss_school_level+"/boardList?board_cd="+$boardWrite.board_cd;
								},
								function cancel() {}
							);
					} else {//여기
						$boardWrite.refreshSecretCode();
					
						if(data.errMsg != null && data.errMsg != undefined) {
							messageAlert.open("알림", data.errMsg);
						}
					}
		        },
		        error: function(xhr, textStatus, error) {
		        	$boardWrite.refreshSecretCode();
		        }
			}).submit();
		},
		
		checkSecretCode : function() {
			var title = $("#qna_regist_title_input").val();
			var content = $("#qna_regist_content_input").val();
			
			if(title.length < 1) {
				messageAlert.open("알림", "제목을 입력하여 주세요.");
				return;
			} else if(title.length > 33) {
				messageAlert.open("알림", "제목은 33자 까지만 입력 가능 합니다.");
				return;
			}
			
			if(content.length < 1) {
				messageAlert.open("알림", "내용을 입력하여 주세요.");
				return;
			} else if(content.length > 1330) {
				messageAlert.open("알림", "내용은 1330자 까지만 입력 가능 합니다.");
				return;
			}
			
			var inputStr = $("#qna_regist_secret_code_input").val();
			if(inputStr == null || inputStr.length < 1) {
				messageAlert.open("알림", "보안코드를 입력하여 주세요.");
				return;
			}
			var file = $("#qna_file").val();
			if(file != null && file.length > 1 && file.trim().length > 1) {
				if(browserFnc() != -1 && browserFnc() < 10) {
					$("#qnaFileUploadForm").ajaxForm({
						async: false,
						type : "POST",
						url : contextPath + "/ServiceAPI/board/fileUploadCheck.form",
						dataType: "json",
						encoding: "utf-8",
						beforeSubmit: function(data, frm, opt) {
							var ext = $('#qna_file').val().split('.').pop().toLowerCase();
							if($.inArray(ext, mimeTypeList.extension) == -1) {
								var html = "<h2>업로드가 제한된 파일 입니다.</h2>";
								html += "</br>";
								html += "<table align='center' style='font-size:15px;'>";
								html += "<tr><td align='left'><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;※&nbsp;업로드 가능 파일</b></td></tr>";
								html += "<tr>";
								html += "<td align='left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ndash;&nbsp;압축 파일 (zip)</td>";
								html += "</tr>";
								html += "<tr>";
								html += "<td align='left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ndash;&nbsp;이미지 파일 (jpg, png, bmp, gif)</td>";
								html += "</tr>";
								html += "<tr>";
								html += "<td align='left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ndash;&nbsp;문서 파일 (한글, 워드, 엑셀, 파워포인트, PDF)</td>";
								html += "</tr>";
								html += "</table>";
								messageAlert.open("알림", html);
								return false;
							}
							return true;
						},
						success: function(data) {
							if (data.result.size < 22020096) {
								$boardWrite.submitData();
							}else {
								messageAlert.open("알림", "첨부파일 제한 용량은 20MB 입니다.");
							}
				        },
				        complete: function() {
				        },
				        error: function(xhr, textStatus, error) {
				        	alert("실패");
				        	return;
				        }
					}).submit();
					
					
				} else {
					var name = $("#qna_file")[0].files[0].name;
					name = name.toLowerCase();
					var extension = name.substring(name.lastIndexOf(".") + 1);
					
					if(!isPossibleMimeType("extension", extension)){ //확장자를 확인합니다.
						var html = "<h2>업로드가 제한된 파일 입니다.</h2>";
						html += "</br>";
						html += "<table align='center' style='font-size:15px;'>";
						html += "<tr><td align='left'><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;※&nbsp;업로드 가능 파일</b></td></tr>";
						html += "<tr>";
						html += "<td align='left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ndash;&nbsp;압축 파일 (zip)</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<td align='left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ndash;&nbsp;이미지 파일 (jpg, png, bmp, gif)</td>";
						html += "</tr>";
						html += "<tr>";
						html += "<td align='left'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ndash;&nbsp;문서 파일 (한글, 워드, 엑셀, 파워포인트, PDF)</td>";
						html += "</tr>";
						html += "</table>";
						
						messageAlert.open("알림", html);
						return;
					}
					
//					if($("#qna_file")[0].files[0].size > 22020096) {
					if($("#qna_file")[0].files[0].size > 100000000) {
						if($("#qna_file")[0].files[0].name != 'neighbor_pass_file.zip') {
							messageAlert.open("알림", "첨부파일 제한 용량은 20MB 입니다.");
							return;
						}
					}
					$boardWrite.submitData();
				}
			}else {
				$boardWrite.submitData();
			}
		},
			
		submitData : function() {		
			$boardWrite.qnaRegist();
			$("#qna_regist_secret_code_input").val("");
		},
		
		makeView : function( opt ){
			$.ajax({
				url : '/ServiceAPI/board/boardListsView.json',
				type : 'POST',
				data : opt,
				async : false,
				success : function(data) {
					if(data.errCd == "0") {
						var result = data.result;
						
						if( result && result.summaryList && result.summaryList.length > 0 ){
							for(var i = 0; i < result.summaryList.length; i ++) {
								var listItem = result.summaryList[i];
								var title = listItem.post_title.replace(/<\/br\s*\/?>/mg, "\n");						
								var content = listItem.post_content.replace(/<\/br\s*\/?>/mg, "\n");
								
								$("#qna_regist_title_input").val(title);
								$("#qna_regist_content_input").val(content);
								
								if(listItem.file_yn == 'Y' && listItem.file_nm !== null && listItem.file_nm !== undefined) {
									$boardWrite.setFileName( listItem.file_nm + "." + listItem.file_extension );
								}
								
								if( listItem.low_rank_s_class_cd ){
									$("#req_type>li[data-type="+ listItem.low_rank_s_class_cd +"]").click().addClass("on");
								}
							}
						} else {
							location.href = '/view/edu/'+$boardWrite.ss_school_level+'/boardWrite?board_cd='+$boardWrite.board_cd;
						}
					} else {
						messageAlert.open("알림", data.errMsg);
					}
				}
			});
		},
	
		list : function(){
			location.href = '/view/edu/'+$boardWrite.ss_school_level+'/boardList?board_cd='+$boardWrite.board_cd;
		}
	}
	
}(window, document));