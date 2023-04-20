<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
 
<%
	String bDate = "20200917"; //2020.09.17~10.31

	Calendar calendar = Calendar.getInstance();
	Date date = calendar.getTime();
	String today = (new SimpleDateFormat("yyyyMMdd").format(date));

	SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
	Date beginDate = formatter.parse( bDate );
	Date endDate = formatter.parse( today );

	long diff = endDate.getTime() - beginDate.getTime();
	long idx = ( diff / ( 24 * 60 * 60 * 1000 ) ) + 1;
%>

<!doctype html> 
<html lang="ko"> 
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta charset="utf-8"> 
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<script src="/publish_2018/include/plugin/jquery-1.11.3.min.js" type="text/javascript"></script>
		<script src="/publish_2018/include/plugin/slick/slick.min.js" type="text/javascript"></script>
		<script src="/publish_2018/include/js/ui.js" type="text/javascript"></script>
		 
		<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
		<script type='text/javascript' src='/js/plugins/jquery-ui-1.10.3.custom.js'></script> 
		<script src='/js/plugins/durian-v2.0.js'></script> 
		<script src='/js/common/sop.portal.absAPI.js'></script> 
		<script type='text/javascript' src='/js/plugins/jquery.sha256.js'></script> 
		<script type='text/javascript' src='/js/plugins/common.js'></script> 
		<script type='text/javascript' src='/js/plugins/ui.js'></script> 
		<script type='text/javascript' src='/js/plugins/html5shiv.js'></script> 
	
		<script src="/js/common/common.js"></script>
		
		
        <script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
		<script type="text/javascript" src='/js/plugins/jquery.form.js'></script>
		<script type="text/javascript" src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
		 
		<link rel="stylesheet" href="./resources/css/base.css">
		<link rel="stylesheet" href="./resources/css/common.css">
		<title>2020 SGIS 활용 우수사례 아이디어 공모전</title>

		<script language="javascript">
	        
			srvLogWrite( "A0", "15", "03", "00", "이벤트 뷰", "2020년 SGIS 활용 우수사례 공모전" );
			apiLogWrite2('R0', 'R07', "이벤트", "2020년 SGIS 활용 우수사례 공모전",  '00', '없음');
	
	
			var menuType = 'Ex';
			$(document).ready(function() {
				var opt = new Object();
				opt.board_cd = 'BOARD_011'; //활용 우수사례 공모
				
				$.removeFileOnModifyMode();
// 				$.refreshSecretCode();
	
				 
// 				var offset = $(".popup").offset();
// 				if( offset ){
// 					$("html, body").animate({scrollTop : offset.top }, 200);
// 				} 
				
				//개인정보수집 동의 또는 미동의에 따라 설정
				$("input[name=privacy]").click(function(){
					console.log("::::: "+$(this).val());
					if( $(this).val() == "Y" ){
						$("#agreey").css("display","").show();
					} else {
						$("#agreey").css("display","none").hide();
					}
				});
				
	 		});
					
			
// 			$.refreshSecretCode = function() {
// 				var qnaCaptchaImage = document.getElementById("qna_regist_secret_code_show");
// 		        var themaCaptchaImage = document.getElementById("thema_regist_secret_code_show");
		        
// 		        var tempCaptcha = "/jcaptcha?" + Math.random();
// 		        qnaCaptchaImage.src = tempCaptcha;
// 		        themaCaptchaImage.src = tempCaptcha;
// 			};
			
			$.setFileName = function(value) {
				var fileName = value.substring(value.lastIndexOf('\\') + 1);
				$("#qna_regist_file").val(fileName);
			};
			
			$.removeFileOnModifyMode = function() {
				$("#qna_file").prop('disabled', false);
				$("#qnaFileTr").hide();
			};
			
			$.qnaRegist = function () {
				var file = $("#qna_file").val();
				
				if(file != null && file.length > 1 && file.trim().length > 1) {
					$.qnaRegistForm();
				} else {
					$.ajax({
						url : '/ServiceAPI/board/boardRegist2.json',
						type : 'POST',
						data : {
							input_code : '011',
							board_cd   : 'BOARD_011',
							post_depth : 0,
							post_order : 0,
							post_title : $("#qna_regist_title_input").val(),
							post_content : $("#qna_regist_userName_input").val() + ", " + $("#qna_regist_telNo_input").val(),
							low_rank_s_class_cd : $("#qna_regist_category_selects").val(),
							priority_disp_yn : "N"
						},
						dataType : 'json',
						async : false,
						success : function(data) {
							if(data.errCd == "0") {
	
								alert("제출이 완료되었습니다.");
								
								srvLogWrite( "A0", "15", "04", "00", "공모전 등록 및 수정", "2020년 SGIS 활용 우수사례 공모전 등록 및 수정" ); //jrj 로그
								apiLogWrite2('R0', 'R08', "이벤트", "2020년 SGIS 활용 우수사례 공모전 등록 및 수정",  '00', '없음' );
								
								window.close();
								
							} else {
								messageAlert.open("알림", data.errMsg);
							}
						}
					});
				}
			};
				
			$.qnaRegistForm = function () {		
				$("#qnaFileUploadForm").ajaxForm({
					async: false,
					type : "POST",
					url : "/ServiceAPI/board/boardRegistForm2.form",
					data : {
						input_code : '011',
						board_cd   : 'BOARD_011',
						post_depth : 0,
						post_order : 0,
						post_title : $("#qna_regist_title_input").val(),
						post_content : $("#qna_regist_userName_input").val() + ", " + $("#qna_regist_telNo_input").val(),
						low_rank_s_class_cd : $("#qna_regist_category_selects").val(),
						priority_disp_yn : "N",
						file_yn : 'Y'
					},
					dataType: "json",
					beforeSend: function(xhr) {},
					success: function(data) {
						if(data.errCd == "0") {	
							alert("제출이 완료되었습니다.");
							window.close();	
							
						} else {
							$.refreshSecretCode();
						}
			        },
			        complete: function(data) {
			        	if(data.errCd == "0") {
							alert("제출이 완료되었습니다.");
							window.close();	
						} else {//여기
							//messageAlert.open("알림", data.errMsg);
							$.refreshSecretCode();
						}
			        },
			        error: function(xhr, textStatus, error) {
						$.refreshSecretCode();
			        }
				}).submit();
			};
			
			$.checkSecretCode = function() {
				
			
	// 			var inputStr = $("#qna_regist_secret_code_input").val();
	// 			if(inputStr == null || inputStr.length < 1) {
	// 				alert("보안코드를 입력하여 주세요.");
	// 				return;
	// 			}
				
				var title = $("#qna_regist_title_input").val();	
				
				if(title.length < 1) {
					alert("제목을 입력하여 주세요.");
					$("#qna_regist_title_input").focus()
					return;
				} else if(title.length > 65) {
					alert("제목은 65자 까지만 입력 가능 합니다.");
					$("#qna_regist_title_input").focus()
					return;
				}
				var up_file = $("#qna_regist_file").val();
				if(up_file.length < 1) {
					alert("파일을 첨부하여 주세요.");
					$("#qna_regist_file").focus()
					return;
				}
				
	
	// 			var content = $("#qna_regist_content_input").val();	
	// 			if(content.length < 1) {
	// 				alert("내용을 입력하여 주세요.");
	// 				return;
	// 			} else if(content.length > 1330) {
	// 				alert("내용은 1330자 까지만 입력 가능 합니다.");
	// 				return;
	// 			}
	
				var user_name = $("#qna_regist_userName_input").val();
				var tel_no    = $("#qna_regist_telNo_input").val();
				
				
				//공백제거
				user_name = user_name.replace(/\s/g,'');
				tel_no    = tel_no.replace(/[-]|\s/gi,'');
				
				$("#qna_regist_userName_input").val( user_name );
				$("#qna_regist_telNo_input").val( tel_no );
				
				var pattern;
				
				if( user_name == '' || typeof user_name == 'undefined' ){
					alert("이름을 입력하여 주세요.");
					$("#qna_regist_userName_input").focus()
					return false;
				} else {
					pattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|\*]+$/
					
					if( !pattern.test( user_name ) ){
						alert("성명은 한글과 영문만 입력하여 주세요.");
						$("#qna_regist_userName_input").focus()
						return false;
					}
					if( user_name.length > 6 ){
						alert("성명은 6자리까지 입력 가능합니다.");
						$("#qna_regist_userName_input").focus()
						return false;
					}
				}
				
				if( tel_no == '' || typeof tel_no == 'undefined' ){
					alert("휴대전화번호를 입력하여 주세요.");
					$("#qna_regist_telNo_input").focus()
					return false;
				} else {
					pattern = /^[0-9]*$/;
					
					if( !pattern.test( tel_no ) ){
						alert("휴대전화번호는 숫자만 입력하여 주세요.");
						$("#qna_regist_telNo_input").focus()
						return false;
					}
					if( tel_no.length > 40 ){
						alert("휴대전화번호는 30자리까지 입력 가능합니다.");
						$("#qna_regist_telNo_input").focus()
						return false;
					}
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
									$.submitData();
								}else {
									alert("첨부파일 제한 용량은 20MB 입니다.");
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
								alert("첨부파일 제한 용량은 20MB 입니다.");
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
				$.qnaRegist();
	// 			$("#qna_regist_secret_code_input").val("");
			};
		</script>
			
	</head>
	<body style="width:586px;">

		<header>
			<h1>2020년 SGIS 활용 우수사례 아이디어 공모전</h1>
		</header>
		<main>
			<section>
				<article>
					<ul class="summary">
						<li><h2>공모개요</h2></li>
						<li><i>공모명</i>2020년 통계지리정보서비스(SGIS)활용 우수사례 공모전</li>
						<li><i>참가대상</i>공공기관, 민간기관, 학술연구기관 및 개인(* 누구나 응모 가능)</li>
						<li><i>공모기간</i>'20.9.17.(목)~10.30.(금) </li>
						<li><i>심사절차</i>온라인 국민평가 -> 1차 서면심사 -> 2차 발표심사(11월중)</li>
						<li><i></i>※ 결과발표('20.12월 중) </li>
					</ul> 
					<ul class="contents">
						<li><h2>공모내용</h2></li>
						<li><i>창업등 사례</i>SGIS를 활용한 창업사례 및 사업(업무) 등에 반영한 사례</li>
						<li><i>정책사례</i>SGIS를 중앙정부·지자체 및 공공기관에서 정책 기초자료 등 활용 사례</li>
						<li><i>연구사례</i>SGIS 자료와 이용자 보유 데이터 등을 연계·분석하여 연구·개발한 사례</li>
						<li><i>기타사례</i>SGIS를 활용하여 업무·생활 등에 도움이 되어 공유하고 싶은 사례 등</li>
					</ul>
					<h2>시상</h2> 
					<div class="tbl">
						<table class="tblList">
							<colgroup>
								<col width="20%">
								<col width="20%">
								<col width="20%">
								<col width="20%">
								<col width="20%">
							</colgroup>
							<thead>
								<tr>
									<th>구분</th>
									<th>대상(1)</th>
									<th>최우수(1)</th>
									<th>우수(2)</th>
									<th>장려(2)</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>포상</td>
									<td class="ac" colspan="4">통계청장표창</td>
								</tr>
								<tr>
									<td>상금</td>
									<td>100만원</td>
									<td>70만원</td>
									<td>50만원</td>
									<td>20만원</td>
								</tr>
							</tbody>
						</table>
						<p>※ 입상자에게 모바일상품권으로 시상금 지급</p>
					</div>
					<h2>참가방법</h2>
					<p>신청서 및 우수사례 작성 후, SGIS 홈페이지 온라인 접수창구 제출</p>
					<h2>문의전화</h2>
					<p>042-481-2342(통계청 공간정보서비스과)<a href="/jsp/event/aCaseOfEx_2020/2020년 SGIS활용 우수사례 공모(홍길동).zip"><button class="download">신청서 다운로드</button></a></p>
					<h2>주의사항</h2>
					<p>  
					기관 또는 개인 참여 가능, 기관 수상 시 대표 1인에게 표창장 및 시상금 수여<br /> 
					복수 응모 가능하나 수상은 기관(개인)당 1개 출품작에게 한함<br /> 
					입상 기준을 충족하는 작품이 없을 경우, 사전 공모한 입상 개수보다 적을 수 있음<br />
					출품작의 표절이나 도용 등과 관련된 분쟁 발생시 책임은 출품자에게 귀속됨<br />	
					수상작은 통계청 기준에 따라 수정하여 사용 가능하고 SGIS 홈페이지에 게재됨
					</p>
				</article>	

<%
	//System.out.println("idx:" + idx +", bDate:"+bDate);
	if(idx < 1 || idx > 45){
%>
	<script type="text/javascript">
		alert("이벤트 기간이 아닙니다.");
	</script>
<%
	} else {
%>				

	<script type="text/javascript">
	    function onFindFile(){
			$("#qna_file").trigger("click");
		}
	</script>
				
		<article class="popup on">
			<h3>활용 우수사례 공모전 접수</h3>
			<div class="tbl">
				<table class="tblWrite">	
					<tbody>
						<tr>
							<th>제목</th>
							<td><input type="text"  id="qna_regist_title_input" name="qna_regist_title_input"></td>
						</tr>
						<tr style="display:none;">
							<th>내용</th>
							<td><textarea id="qna_regist_content_input" name="qna_regist_content_input"></textarea></td>
						</tr>
						<tr>
							<th>파일첨부</th>
							<td> 
	                           	<form id="qnaFileUploadForm" name="qnaFileUploadForm" method="post" enctype="multipart/form-data">
									<div class="file_input_div" style="width:400px;">
									<input id="qna_regist_file" class="file_input_textbox" type="text" style="width: 280px;" readonly="readonly"/>
										<input type="file" id="qna_file"  name="qna_file" style="cursor: pointer;border:0px; width:85px;" onchange="$.setFileName(this.value);" >
									</div>  
								</form>
								<span>* 20Mb 이상일 경우,  dfd303@korea.kr로 제출해 주십시오.<br/>* 신청서 다운로드 후 붙임1, 2 자료를 작성하여 첨부하십시오.<span>
							</td>
						</tr>
						<tr>  
							<th>이름</th>
							<td><input type="text" name="qna_regist_name_input" id="qna_regist_userName_input" ></td>
						</tr>
						<tr>
							<th>전화번호</th>
							<td><input type="text" name="qna_regist_telNo_input" id="qna_regist_telNo_input"></td>
						</tr>  
						<tr>
							<th></th>
							<td><p class="privacy">개인정보수집<input type="radio" id="agree" name="privacy" value="Y"><label for="agree">동의</label><input type="radio" id="disagree" name="privacy" value="N"><label for="disagree">비동의</label></p></p> 
							</td>
						</tr>  
						<tr>
							<td colspan="2"><button class="submit" id="agreey" onclick='$.checkSecretCode();' style="display:none;">제출</button></td>
						</tr>  
					</tbody>
				</table> 
		</article>
    <%
		}
	%>		 
			</section>
		</main>	
	</body>
</html>