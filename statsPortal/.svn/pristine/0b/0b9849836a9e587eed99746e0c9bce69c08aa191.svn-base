<%
/**************************************************************************************************************************
* Program Name  : 질문과 개선요청 JSP  
* File Name     : expAndNotice.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String post_no = (String) request.getParameter("post_no");
if ( post_no != null  ){  
	post_no = post_no.replaceAll("<","&lt;");  
	post_no = post_no.replaceAll(">","&gt;"); 
}
String boardType = (String) request.getParameter("boardType");
if ( boardType != null  ){  
	boardType = boardType.replaceAll("<","&lt;");  
	boardType = boardType.replaceAll(">","&gt;"); 
}
%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="utf-8">
		<meta name="format-detection" content="telephone=no" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		
		<script src="/js/common/includeHead.js"></script>
		<script src="/js/common/common.js"></script>

		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/common.css">
		<!--알림마당 컨텐츠 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/contents.css">
		<!--게시판 css 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/board.css">
		<script src='/js/plugins/jquery.form.js'></script>
		<script src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
		
		<script src="/js/board/jquery.paging.js"></script>
		<script src="/js/board/holder.js"></script>
		<script src='/js/plugins/ckeditor/ckeditor.js'></script>
		<script src='/js/plugins/google_recaptcha.js'></script>
		<title>알림마당|통계지리정보서비스</title>
		
		<script>
			var menuType = '<%=boardType%>';
			$(document).ready(function() {
				
				$.refreshSecretCode(); //mng_s 20200512 글 수정시 보안코드를 다시 입력해야되서 강제적으로 새로고침 하도록 수정
				
				var opt = new Object();
				opt.board_cd = 'BOARD_003';
				opt.post_no = '<%=post_no%>';
				
				$.boardListsView(opt);
			});
			
			$.boardListsView = function(opt) {
				$.ajax({
					url : '/ServiceAPI/board/boardListsView.json',
					type : 'POST',
					data : opt,
					success : function(data) {
						if(data.errCd == "0") {
							var result = data.result;
							for(var i = 0; i < result.summaryList.length; i ++) {
								var listItem = result.summaryList[i];
								var title = listItem.post_title.replace(/<\/br\s*\/?>/mg, "\n");						
								var content = listItem.post_content.replace(/<\/br\s*\/?>/mg, "\n");
								$("#qna_regist_title_input").val(title);
								$("#qna_regist_content_input").val(content);
								
								if(listItem.file_nm !== null && listItem.file_nm !== undefined) {
									$("#qna_file").prop('disabled', true);
									$("#qnaFileTrName").html(listItem.file_nm + "." + listItem.file_extension);
									$("#qnaFileTr").show();
								}
							}
						} else {
							messageAlert.open("알림", data.errMsg);
						}
					}
				});
			};
			
			$.refreshSecretCode = function() {
				var qnaCaptchaImage = document.getElementById("qna_regist_secret_code_show");
		        var themaCaptchaImage = document.getElementById("thema_regist_secret_code_show");
		        
		        var tempCaptcha = "/jcaptcha?" + Math.random();
		        qnaCaptchaImage.src = tempCaptcha;
		        themaCaptchaImage.src = tempCaptcha;
			};
			
			$.setFileName = function(value) {
				var fileName = value.substring(value.lastIndexOf('\\') + 1);
				$("#qna_regist_file").val(fileName);
				var file = $("#qna_file").val();
			};
			
			$.removeFileOnModifyMode = function() {
				$("#qna_file").prop('disabled', false);
				$("#qnaFileTr").hide();
			};
			
			$.qnaModify = function () {
				var inputStr = $("#qna_regist_secret_code_input").val();
				var file = $("#qna_file").val();
				var low_rank_s_class_cd = $("#qna_regist_category_selects").val();
				
				if(file != null && file.length > 1 && file.trim().length > 1) {
					$.qnaModifyForm(low_rank_s_class_cd);
				} else {
					//var title = encodeURIComponent($("#qna_regist_title_input").val());
					//var content = encodeURIComponent($("#qna_regist_content_input").val());
					
					var dataObj = new Object();
					dataObj.post_no = '<%=post_no%>';
					dataObj.post_title = $("#qna_regist_title_input").val();
					dataObj.post_content = $("#qna_regist_content_input").val();
					dataObj.low_rank_s_class_cd = low_rank_s_class_cd;
					dataObj.priority_disp_yn = 'N';
					dataObj.input_code = inputStr;
					$.ajax({
						url : '/ServiceAPI/board/boardModify.json',
						type : 'POST',
						data : dataObj,
						async : false,
						success : function(data) {
							if(data.errCd == "0") {
								messageAlert.open("알림", "수정되었습니다.");
								window.location.href = "/view/board/qnaView?post_no=<%=post_no%>&boardType=<%=boardType%>";
							} else {
								messageAlert.open("알림", data.errMsg);
							}
						}
					});
				}
			};
				
			$.qnaModifyForm = function (low_rank_s_class_cd) {		
				$("#qnaFileUploadForm").ajaxForm({
					async: false,
					type : "POST",
					url : "/ServiceAPI/board/boardModifyForm.form",
					data : {
						input_code : $("#qna_regist_secret_code_input").val(),
						post_no : '<%=post_no%>',
						post_title : $("#qna_regist_title_input").val(),
						post_content : $("#qna_regist_content_input").val(),
						low_rank_s_class_cd : low_rank_s_class_cd,
						priority_disp_yn : "N",
						file_yn : 'Y',
					},
					dataType: "json",
					encoding: "utf-8",
					beforeSend: function(xhr) {},
					success: function(data) {
						if(data.errCd == "0") {					
							messageAlert.open("알림", "수정되었습니다.");
							window.location.href = "/view/board/qnaView?post_no=<%=post_no%>&boardType=<%=boardType%>";
						} else {
							messageAlert.open("알림", data.errMsg);
							$.refreshSecretCode();
						}
			        },
			        complete: function(data) {
			        	if(data.errCd == "0") {					
							messageAlert.open("알림", "수정되었습니다.");
							window.location.href = "/view/board/qnaView?post_no=<%=post_no%>&boardType=<%=boardType%>";
						} else {
							
							$.refreshSecretCode();
							if(data.errMsg != null && data.errMsg != undefined) {
								messageAlert.open("알림", data.errMsg);
							}
						}
			        },
			        error: function(xhr, textStatus, error) {
						$.refreshSecretCode();
			        }
				}).submit();
			};
			
			$.checkSecretCode = function() {
				var title = $("#qna_regist_title_input").val();
				var content = $("#qna_regist_content_input").val();
				
				if(title.length < 1) {
					messageAlert.open("알림", "제목을 입력하여 주세요.");
					return;
				} else if(title.length > 65) {
					messageAlert.open("알림", "제목은 65자 까지만 입력 가능 합니다.");
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
									html += "</br>"
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
									$.submitData();
								}else {
									messageAlert.open("알림", "첨부파일 제한 용량은 20MB 입니다.");
								}
					        },
					        complete: function() {
					        },
					        error: function(xhr, textStatus, error) {
					        	alert("실패")
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
						
						if($("#qna_file")[0].files[0].size > 22020096) {
							if($("#qna_file")[0].files[0].name != 'neighbor_pass_file.zip') {
								messageAlert.open("알림", "첨부파일 제한 용량은 20MB 입니다.");
								return;
							}
						}
						$.submitData();
					}
				}else {
					$.submitData();
				}
			};
				
			$.submitData = function() {		
				$.qnaModify();
				$("#qna_regist_secret_code_input").val("");
			};
		</script>
	</head>
	<body>
		<div id="wrap">
			<!-- header // -->
			<header>
				<!-- Top Include -->
				<jsp:include page="/view/common/includeSearch"></jsp:include>
			</header>
			<!--contents-->
			<div id="container" class="sub">
				<%@include file="/jsp/board/includeLeftMenu.jsp" %>
				<div id="content">
					<div id="title-area">
						<ul class="location">
							<li><a href="/view/board/sopBoardMain">알림마당</a></li>
							<li><a href="/view/board/qnaAndRequestFaq">질문과 개선요청</a></li>
							<% if(boardType.equals("Qna")) { %>
								<li><a href="/view/board/qnaAndRequestQna"><em>Q&A</em></a></li>
							<% } else if(boardType.equals("Thema")) { %>
								<li><a href="/view/board/qnaAndRequestThema"><em>통계주제도 신규 요청</em></a></li>
							<% } %>
						</ul>
						<h1 class="sub-title"><% if(boardType.equals("Qna")) { %>Q&A<% } else if(boardType.equals("Thema")) { %>통계주제도 신규 요청<% } %></h1>
					</div>
					<div id="contents" class="view">
						<div class="table-type">
                            <table class="table-style type02">
                                <colgroup>
                                    <col style="width:160px;">
                                    <col style="width:auto;">
                                </colgroup>
                                <tbody>
                                	<% if(boardType.equals("Qna")) { %>
										<tr>
											<th scope="row"><label for="qna_regist_category_selects">질문유형</label></th>
											<td>
												<div class="select-wrap">
													<select id="qna_regist_category_selects" name="qna_regist_category_selects" style="width:180px;">
														<option value="REQST">일반문의</option>
														<option value="QUERY">개선요청</option>
													</select>
												</div>
											</td>
										</tr>
									<% } %>
									<tr>
										<th scope="row"><label for="qna_regist_secret_code_input">보안코드</label></th>
										<td>
                                            <span><input id="qna_regist_secret_code_input" type="text" name="qna_regist_secret_code_input" style="width: 250px;" /></span>
                                           	<a href="javascript:$.refreshSecretCode();void(0);" class="anc-btn black qnaboardclose" style="width:80px; margin-left: 120px; line-height: 30px;">Reload</a>
                                           	<img id="qna_regist_secret_code_show" src="/jcaptcha" style="margin-left: -194px; vertical-align: middle;" alt="보안코드"/>
											<img id="thema_regist_secret_code_show" src="/jcaptcha?0.15319027588702738" style="margin-left: 10px; vertical-align: middle;display: none;" alt="보안코드">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><label for="qna_regist_title_input">글제목</label></th>
                                        <td>
                                            <span class="input_area"><input type="text" name="qna_regist_title_input" id="qna_regist_title_input" title="제목" /></span>
                                        </td>
                                    </tr>
									<tr>
										<th scope="row"><label for="qna_regist_content_input">글내용</label></th>
										<td>
											<span>
												<textarea id="qna_regist_content_input" name="qna_regist_content_input" style="width: 670px; height: 186px; padding-left: 10px;"></textarea>
											</span>
										</td>
									</tr>
									<tr>
	                                    <th scope="row">
	                                        <label for="qna_regist_file">파일첨부</label>
	                                    </th>
	                                    <td>
	                                   		<form id="qnaFileUploadForm" name="qnaFileUploadForm" method="post" enctype="multipart/form-data">
												<input id="qna_regist_file" class="file_input_textbox" type="text" style="width: 280px;" readonly="readonly"/>
												<div class="file_input_div" style="width:400px;">
													<input id="qna_file" type="file" name="qna_file" style="cursor: pointer;" onchange="$.setFileName(this.value);">
												</div>
											</form>
	                                    </td>
	                                </tr>
	                                <tr hidden id="qnaFileTr">
										<th scope="row"><span></span></th>
										<td>
											<div id="qnaFileTrName" style="float: left; margin-left: 7px;">testFile.zip</div>
											<img src="/img/pm/btn_layer_close.gif" style="cursor: pointer; margin-left: 20px;" alt="파일제거" onclick="$.removeFileOnModifyMode();"/>
											&nbsp;&nbsp;&nbsp;※이전 파일을 제거 후 등록 가능 합니다.
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="btn-area">
							<button type="button" name="next" class="default-color" value="수정" onclick="$.checkSecretCode();"><span>글 수정</span></button>
						</div>
					</div>
				</div>
			</div>
			<!--//contents-->
            <!-- footer// -->
		    <footer id="footer">
		    	<!-- Bottom Include -->
				<jsp:include page="/view/common/includeBottom"></jsp:include>
		    </footer>
        </div>
    </body>
</html>