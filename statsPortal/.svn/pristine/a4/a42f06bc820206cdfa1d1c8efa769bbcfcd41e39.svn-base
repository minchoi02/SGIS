<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    
<!doctype html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes">

<link rel="stylesheet" type="text/css" href="/css/oxquiz/ox_quiz_style.css" />

<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
<script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>

<script type='text/javascript' src='/js/plugins/jquery-ui-1.10.3.custom.js'></script>
<script type="text/javascript" src="/js/common/includeHead.js"></script>
<script type="text/javascript" src="/js/common/common.js"></script>

<title>리서치</title>
<style>
    body,html,pre{font-family: "Nanum Gothic", "나눔고딕", "맑은 고딕", "Malgun Gothic", Dotum, sans-serif;font-size:14px;color: #000;letter-spacing:-0.045em !important;}
	.clearFix:after{content: "";display: block;clear: both;}
	.hidden{margin: 0;padding: 0;width: 0;height: 0;overflow: hidden;font-size: 0;line-height: 0;}
	html,body,#warp{width:100%;height:100%;min-width:50px !important;}
	.notoBold{font-family: 'Noto Sans Medium';}
</style>
<script language="javascript">
var browse = navigator.userAgent.toLowerCase(); 

if((navigator.appName == 'Netscape' && browse.indexOf('trident') != -1) || (browse.indexOf("msie") != -1)){
	window.resizeTo(670,1000);
}else{
	window.resizeTo(670,1030);
}

function researchSubmit(){
	// 유효성 점검
	var formData = new FormData();
	formData.append("files",$("#fileUpload")[0].files[0]);
	formData.append("TEL_NO" , $("#tel_no2").val());
	formData.append("NAME" , $("#name").val());
	formData.append("DEPT" , $("#dept").val());
	formData.append("PW" , $("#pw2").val());
	formData.append("ADM_BIGO" , $("#bigo").val());
	formData.append("AGREEMENT" , $("input[name='agreement']:checked").val());
	formData.append("Q1", $("#q1").val());
	formData.append("Q2", $("#q2").val());
	formData.append("Q3", $("#q3").val());
	formData.append("S1", $("#s1").val());
	formData.append("S2", $("#s2").val());
	formData.append("S3", $("#s3").val());
	
	data = {
		TEL_NO : $("#tel_no2").val(),
		NAME : $("#name").val(),
		DEPT : $("#dept").val(),
		PW : $("#pw2").val(),
		ADM_BIGO : $("#bigo").val(),
		AGREEMENT : $("input[name='agreement']:checked").val(),
		Q1 : $("#q1").val(),
		Q2 : $("#q2").val(),
		Q3 : $("#q3").val(),
		S1 : $("#s1").val(),
		S2 : $("#s2").val(),
		S3 : $("#s3").val(),
	};

	$.ajax({
		type : "POST",
		//dataType : "json",
		url : "/view/kosisApi/researchInsert.do",
		contentType: false,
		processData: false,
 		data: formData,
 		success:function(data){
 			if(data.length == 0){
				alert("제출이 완료되었습니다.");
 			}else{
	 			alert("동일한 전화번호로 여러번 제출은 불가능합니다.");
 			}
			//window.close();
		},
 		error:function(data){
 			//window.close();
 		}
 	});
}

function updateSubmit(){
	// 유효성 점검
	var check;
	var SERIAL_NO = $("#SERIAL_NO").val();
	console.log(check);
	
	if($("input[name='agreement']:checked").val()=='N'){
		check = true;
	}else{
		check = oxValidation();;
	}
	
	if(check){
		if(SERIAL_NO == '' || typeof SERIAL_NO == 'undefined' ){
			researchSubmit();
		}else{
			
			var formData = new FormData();
			formData.append("files",$("#fileUpload")[0].files[0]);
			formData.append("TEL_NO" , $("#tel_no2").val());
			formData.append("NAME" , $("#name").val());
			formData.append("DEPT" , $("#dept").val());
			formData.append("PW" , $("#pw2").val());
			formData.append("ADM_BIGO" , $("#bigo").val());
			formData.append("AGREEMENT" , $("input[name='agreement']:checked").val());
			formData.append("Q1", $("#q1").val());
			formData.append("Q2", $("#q2").val());
			formData.append("Q3", $("#q3").val());
			formData.append("S1", $("#s1").val());
			formData.append("S2", $("#s2").val());
			formData.append("S3", $("#s3").val());
			formData.append("SERIAL_NO", $("#SERIAL_NO").val());
			
			data = {
				SERIAL_NO : $("#SERIAL_NO").val(),
				TEL_NO : $("#tel_no2").val(),
				NAME : $("#name").val(),
				DEPT : $("#dept").val(),
				PW : $("#pw2").val(),
				ADM_BIGO : $("#bigo").val(),
				AGREEMENT : $("input[name='agreement']:checked").val(),
				Q1 : $("#q1").val(),
				Q2 : $("#q2").val(),
				Q3 : $("#q3").val(),
				S1 : $("#s1").val(),
				S2 : $("#s2").val(),
				S3 : $("#s3").val()
			};
		
			$.ajax({
				type : "POST",
				//dataType : "json",
				contentType: false,
				processData: false,
				url : "/view/kosisApi/researchUpdate.do",
		 		data: formData,
		 		success:function(data){
					alert("수정이 완료되었습니다.");
					
					//window.close();
				},
		 		error:function(data){
		 		//	alert("정확하지 않거나 범위를 넘어선 값이 있습니다. 다시 실행해주세요.");
		 			window.close();
		 		}
		 	});
		}
	}
}

function deleteSubmit(){
	// 유효성 점검
	var SERIAL_NO = $("#SERIAL_NO").val();
	
	var formData = new FormData();
	formData.append("files",$("#fileUpload")[0].files[0]);
	formData.append("TEL_NO" , $("#tel_no2").val());
	formData.append("SERIAL_NO", $("#SERIAL_NO").val());
	
	$.ajax({
		type : "POST",
		//dataType : "json",
		contentType: false,
		processData: false,
		url : "/view/kosisApi/delete.do",
 		data: formData,
 		success:function(data){
			alert("파일 삭제가 완료되었습니다.");
			
			$("#fileNm").html("");
			$("#btnDel").attr("style","display:none;border: 1px solid #a07f7f;padding: 5px 15px 7px 15px;border-radius: 7px;background-color: #a07f7f;color: white;font-size: 14px;font-family: 맑은 고딕;");
			//window.close();
		},
 		error:function(data){
 		//	alert("정확하지 않거나 범위를 넘어선 값이 있습니다. 다시 실행해주세요.");
 			window.close();
 		}
 	});
}

function searchSubmit() {
	var tel_no = $("#TEL_NO").val();
	var check = true;
	if( tel_no == '' || typeof tel_no == 'undefined' ){
		alert("휴대전화번호를 작성해주세요.");
		check = false;
	} else {
		pattern = /^[0-9]*$/;
		
		if( !pattern.test( tel_no ) ){
			alert("휴대전화번호는 숫자만 입력해주세요.");
			check = false;
		}
		if( tel_no.length > 40 ){
			alert("휴대전화번호는 11자리까지 입력 가능합니다.");
			check = false;
		}
	}
	
	if(check){
		data = {
			TEL_NO : $("#TEL_NO").val(),
			PW : $("#PW").val(),
		};
	
		$.ajax({
			type : "POST",
			dataType : "json",
			url : "/view/kosisApi/research.do",
			data : data,
			success : function(data) {
				console.log(data);
				console.log(data[0].adm_bigo);
				$("#tel_no2").val(data[0].tel_no);
				$("#name").val(data[0].nm);
				$("#dept").val(data[0].dept);
				$("#pw2").val(data[0].pw);
				$("#bigo").val(data[0].adm_bigo);
				$("#q1").val(data[0].srv_nm1);
				$("#q2").val(data[0].srv_nm2);
				$("#q3").val(data[0].srv_nm3);
				$("#s1").val(data[0].srv_exp1);
				$("#s2").val(data[0].srv_exp2);
				$("#s3").val(data[0].srv_exp3);
				$("#SERIAL_NO").val(data[0].serial_no);
				$(":radio[name='agreement'][value='Y']").attr('checked', true);
				
				console.log(data[0]);
				if(typeof data[0].file_nm != 'undefined'){
					$("#fileNm").text("등록된 파일의 이름 : "+data[0].file_nm);
					$("#btnDel").attr("style","display:block;border: 1px solid #a07f7f;padding: 5px 15px 7px 15px;border-radius: 7px;background-color: #a07f7f;color: white;font-size: 14px;font-family: 맑은 고딕;");
				}
				$("#").val()
				
				$(".agreey").css("display","").show();
			},
			error : function(data) {
				window.close();
			}
		});
	}
}	

function agreeCheck( agree ){
	console.log($("input[name='agreement']:checked").val());
	if( agree ){
		$("#ag1").css("display","").show();
		$("#ag2").css("display","").show();
	} else {
		$("#ag1").css("display","none").hide();
		$("#ag2").css("display","none").hide();
	}
}

function oxValidation(){
	var valid = 0;
	
	if( $("#bigo").val().length > 1000 ){
		alert("비고는 1000자리까지 입력 가능합니다. ");
		return false;
	}
	
	/*
	if( $("input[name=agreement]:checked").val() !="Y" ){
		alert("개인정보수집에 동의해 주세요");
		return false;
	}
	*/
	
	var name = $("#name").val();
	var tel_no = $("#tel_no2").val();
	var dept = $("#dept").val();
	var PW = $("#pw2").val();
	
	//공백제거
	name = name.replace(/\s/g,'');
	tel_no = tel_no.replace(/[-]|\s/gi,'');
	
	$("#name").val( name );
	$("#phone").val( tel_no );
	
	var pattern;
	
	if( dept == '' || typeof dept == 'undefined' ){
		alert("소속을 작성해주세요.");
		return false;
	} 
	
	if( name == '' || typeof name == 'undefined' ){
		alert("성명을 작성해주세요.");
		return false;
	} else {
		pattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|\*]+$/
		
		if( !pattern.test( name ) ){
			alert("성명은 한글과 영문만 입력해주세요.");
			return false;
		}
		if( name.length > 6 ){
			alert("성명은 6자리까지 입력 가능합니다.");
			return false;
		}
	}
	
	if( tel_no == '' || typeof tel_no == 'undefined' ){
		alert("휴대전화번호를 작성해주세요.");
		return false;
	} else {
		pattern = /^[0-9]*$/;
		
		if( !pattern.test( tel_no ) ){
			alert("휴대전화번호는 숫자만 입력해주세요.");
			return false;
		}
		if( tel_no.length != 11 ){
			alert("휴대전화번호는 11자리를 입력해주세요.");
			return false;
		}
	}
	
	if( PW == '' || typeof PW == 'undefined' ){
		alert("비밀번호를 작성해주세요.");
		return false;
	} 
	
	return true;
}

/*
// 파일 업로드 change 이벤트
$("#fileUpload").change(() => {
	var sFromData = new FormData();
	sFile = #('#fileUpload')[0].files[0];
	sFormData.append('file',sFile);
	
	$("#fileUpload").value ='';
})
*/

</script>

</head>
<body>
	<script type="text/javascript">
	
	$(document).ready(function() {
		$(".agreey").css("display","").show();
	});
	</script>
	
	<div class="wrap">
        <div id="quiz_content">
        	<div>
        		<br>
        			<div style="text-align:center;font-size: 25px;">
        				의견등록
        			</div>
        		<br><br><br>
				<br><br>
			</div>
        </div>
        <div class="quiz-box">
           <ul>
                <li>
                	<h1 style="font-weight:700;font-size:14px;">
                	(의견1) '행정통계 시각화 지도(가칭)'에 어울리는 명칭을 자유롭게 적어주세요. (다수 제안 가능)
                	</h1>
                	<br>
                	<table style="border-collapse:collapse; border:1px gray solid;"> 
                		<tr align="center" height="30px" style="font-size:14px;font-family: 맑은 고딕;font-weight: bold;background-color: #D9E5FF;border:1px gray solid;">
                			<th width="20%" style="border:1px gray solid;">신규 서비스명</th>
                			<th width="40%">사유</th>
                		</tr>
                		<tr height="35px">
                			<td style="border:1px gray solid;">(예시) 행정통계 시각화 지도</td>
                			<td>행정통계 결과를 지도와 차트를 통해 직관적으로 이해할 수 있는 시각화 콘텐츠임 </td>
                		</tr>
                		<tr style="border:1px gray solid;" height="30px">
                			<td style="border:1px gray solid;" height="30px">
						        <input id="q1" type="text" value="1." style="width: 100%;height:100%; border:1px;">
                			</td>
                			<td height="30px">
						        <textarea id="s1" style="width: 100%;height:100%; border:1px;"></textarea>
                			</td>
                		</tr>
                		<tr style="border:1px gray solid;" height="30px">
                			<td style="border:1px gray solid;" height="30px">
					        	<input id="q2" type="text" value="2." style="width: 100%;height:100%; border:1px;">
                			</td>
                			<td height="30px">
					         	<textarea id="s2" style="width: 100%;height:100%; border:1px;"></textarea>
                			</td>
                		</tr>
                		<tr style="border:1px gray solid;">
                			<td style="border:1px gray solid;" height="30px">
						        <input id="q3" type="text" value="3." style="width: 100%;height:100%; border:1px;">
                			</td>
                			<td height="30px">
						        <textarea id="s3" style="width: 100%;height:100%; border:1px;"></textarea>
                			</td>
                		</tr>
                	</table>
                <br>
                </li>
                <li>
                	<h1 style="font-weight:700;font-size:14px;">
					(의견2) '행정통계 시각화 지도(가칭)'의 불편 및 개선 사항을 자유롭게 적어주세요.
					</h1> 
                </li>
                <br>
                <li>
                    <textarea style="width:543px;padding: 5px;" id="bigo" cols="30" rows="5"></textarea>
                <br><br>
                	<h1 style="font-weight:700;font-size:14px;">
						업로드할 파일이 있다면, 함께 올려주세요.&emsp;
	                	<input type="file" id="fileUpload"/>
					</h1> 
                	<label id="fileNm"></label>
                	<button id="btnDel" style="display: none;" onclick="javascript:deleteSubmit();">파일 삭제</button>
                </li>
            </ul>
        </div>

        <div class="p-i">
            <p class="p1">&lt;개인정보수집&gt;</p>
            <p class="p2">
            	개인정보 수집항목(성명, 휴대전화번호)은 추첨을 통한 상품권 지급 및 분석 목적으로만<br/>사용되며, 경품 지급 후 파기됩니다. <br>
                개인정보 수집에 동의하지 않으시면 이벤트에 참여하실 수 없습니다.
			</p>
            <p class="p3">
                개인정보수집 :
                <label>
                    <input name="agreement" type="radio" value="Y" onclick="javascript:agreeCheck(true);" checked="checked">
                    <span>동의</span>
                </label>
                <label>
                    <input name="agreement" type="radio" value="N" onclick="javascript:agreeCheck(false);">
                    <span>비동의</span>
                </label>
            </p>
            
            <input id="SERIAL_NO" type="hidden" placeholder="">
            <p class="agreey p4" id="ag1" style="display:none;">
                                소속 : <input id="dept" type="text" placeholder="">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;
                                성명 : <input id="name" type="text" placeholder="">
            </p>
            <p class="agreey p4" id="ag2" style="display:none;">
                휴대전화번호 : <input id="tel_no2" type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" maxlength="11">&emsp;&emsp;&emsp;
                비밀번호 : <input id="pw2" type="password" placeholder="">
            </p>
			<div class="agreey" style="width: 100%;text-align: center;margin-top: 20px; display:none;">
				<button onclick="javascript:updateSubmit();" 
					style="border: 1px solid #a07f7f;padding: 5px 15px 7px 15px;
					border-radius: 7px;background-color: #a07f7f;color: white;font-size: 14px;font-family: 맑은 고딕;">
					제출
				</button>
			</div>
        </div>
		<div >
			<ul style="width:615px; height: 100px; background-color: #fff; color: #000; display: block; margin: 0 auto; margin-top: -57px; padding: 10px 10px; box-sizing: border-box;">
				<li>
				&nbsp;&nbsp;&nbsp; 
					등록한 설문을 수정하려면 전화번호, 비밀번호를 입력 후 수정버튼을 클릭해주세요.<br><br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
		          	전화번호 : <input type="text" id="TEL_NO" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" maxlength="11">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
		          	비밀번호 : <input id="PW" type="password" placeholder="">
				&nbsp;&nbsp;&nbsp;&nbsp;
				<button id="btn_search" onclick="javascript:searchSubmit();" 
					style="border: 1px solid #a07f7f;padding: 5px 15px 7px 15px;
					border-radius: 7px;background-color: #a07f7f;color: white;font-size: 14px;font-family: 맑은 고딕;">
					수정
				</button>
				</li>
			</ul>
			<br>
		</div>
    </div>
</body>
</html>
