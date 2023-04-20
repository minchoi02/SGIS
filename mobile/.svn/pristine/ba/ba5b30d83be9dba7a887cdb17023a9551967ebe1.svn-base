<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    
<!DOCTYPE html>
<html>
<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
<script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>
<head>
    <meta charset="utf-8" />
    <title>SGIS plus mobile</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
</head>

<body>

<script language="javascript">
var referrer = document.referrer;

function moveHref(){
	window.location.href = referrer;
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
	
	data = {
		TEL_NO : $("#tel_no2").val(),
		NAME : $("#name").val(),
		DEPT : $("#dept").val(),
		PW : $("#pw2").val(),
		ADM_BIGO : $("#bigo").val(),
		AGREEMENT : $("input[name='agreement']:checked").val(),
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
		},
 		error:function(data){
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
			formData.append("SERIAL_NO", $("#SERIAL_NO").val());
			
			data = {
				SERIAL_NO : $("#SERIAL_NO").val(),
				TEL_NO : $("#tel_no2").val(),
				NAME : $("#name").val(),
				DEPT : $("#dept").val(),
				PW : $("#pw2").val(),
				ADM_BIGO : $("#bigo").val(),
				AGREEMENT : $("input[name='agreement']:checked").val(),
			};
		
			$.ajax({
				type : "POST",
				//dataType : "json",
				contentType: false,
				processData: false,
				url : "/view/kosisApi/researchUpdate.do",
		 		data: formData,
		 		success:function(data){
		 			
				},
		 		error:function(data){
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
				$("#SERIAL_NO").val(data[0].serial_no);
				$(":radio[name='agreement'][value='Y']").attr('checked', true);
				
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

</script>

<style>
.w-header{
   padding: 15px 15px 10px;
   border-bottom: 1px solid #365375;
   background-color: #133761;
   display: flex;
   align-content: center;
   margin-bottom: 20px;
}
.w-header h1{
   text-align: center;    color: #fff;
   font-size: 18px;
   font-weight: 500;
}

.w-grid{padding-left: 15px;padding-right: 15px;}
.w-grid h3{
   color: #000;
   font-size: 13px;
   font-weight: 600;
}
.textarea{
   width: 100%;
   padding: 10px;
   border: 1px solid #c4c4c4;
   font-size: 13px;
   overflow-y: auto;
   height: 100px;
   resize: none;
   margin-top: 10px;
}
.w-grid .files{margin-top: 10ox;}
.w-grid .files p{color: #666;font-size: 12px;}
.inputs{}
.frm-btn a{border: 1px solid #444548;
    background-color: #444548;
    color: #fff;
    box-shadow: 0px 2px 5px 0px rgb(115 115 115 / 65%);
    width: calc((100% - 4px) / 2);
    padding: 5px 25px;
    border-radius: 30px;
    font-size: 15px;
    border: 1px solid #666;
    color: #fff;
}
.w-grid + .w-grid{padding-top: 20px;margin-top: 20px;border-top: 1px solid #ddd;}
.pr-box{border: 1px solid #ddd;padding: 10px;font-size: 12px;line-height: 1.4;border-radius: 3px;}
.frm-input+.frm-input{margin-top: 5px;}
.frm-btn{text-align: center;padding-top: 25px;}
.m-popup-close{
	width: 4%;height: 2.5%;
	right: 3%;
	top: 1.5%;
	display: block;
    position: absolute;
    color: white;
    background: #133761;
    
}
</style>

<div class="w-header">
   <h1>의견등록</h1>
   <button type="button" onclick="javascript:moveHref();" title="팝업닫힘" class="m-popup-close">X</button>
</div>

<div class="w-grid">
   <h3>모바일 서비스의 불편 및 개선 사항을 자유롭게 적어주세요.</h3>
   <textarea name="" id="bigo" class="textarea"></textarea>
   <div class="files">
      <p>업로드할 파일이 있다면, 함께 올려주세요.</p>
      <input type="file" id="fileUpload">
   </div>
</div>

<div class="w-grid">
   <div class="pr-box">
      개인정보 수집항목(성명, 휴대전화번호)은 추첨을 통한 상품권 지급 및 분석 목적으로만
      사용되며, 경품 지급 후 파기됩니다. <br>
      개인정보 수집에 동의하지 않으시면 이벤트에 참여하실 수 없습니다.
   </div>
   
   <div>
   <br>
      개인정보수집 :
      <label>
          <input name="agreement" type="radio" value="Y" onclick="javascript:agreeCheck(true);" checked="checked">
          <span>동의</span>
      </label>
      <label>
          <input name="agreement" type="radio" value="N" onclick="javascript:agreeCheck(false);">
          <span>비동의</span>
      </label>
   </div>
</div>

<div class="w-grid">
<input id="SERIAL_NO" type="hidden" placeholder="">
   <div class="frm-input">
      <label>소속</label>
      &emsp;&emsp;&emsp;&emsp;<input type="text" id="dept" class="form-input" placeholder="소속">
   </div>
   <div class="frm-input">
      <label>성명</label>
      &emsp;&emsp;&emsp;&emsp;<input type="text" id="name" class="form-input" placeholder="성명">
   </div>
   <div class="frm-input">
      <label>휴대전화번호</label>
      &nbsp;<input type="text" id="tel_no2" class="form-input" placeholder="휴대전화번호" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" maxlength="11">
   </div>
   <div class="frm-input">
      <label>비밀번호</label>
      &emsp;&emsp;<input type="password" id="pw2" class="form-input" placeholder="비밀번호">
   </div>
</div>

<div class="frm-btn">
   <a href="#" onclick="javascript:updateSubmit();">제출</a>
</div>
<div class="frm-btn">
 	<p>등록한 설문을 수정하려면 전화번호, 비밀번호를 입력 후 수정버튼을 클릭해주세요.</p>	
 	<br>
</div>
<div class="w-grid">
  <div class="frm-input">
     <label>휴대전화번호</label>
     &nbsp;<input type="text" id="TEL_NO" class="form-input" placeholder="휴대전화번호" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" maxlength="11">
  </div>
  <div class="frm-input">
     <label>비밀번호</label>
      &emsp;&emsp;<input type="password" id="PW" class="form-input" placeholder="비밀번호">
  </div>
</div>
<div class="frm-btn">
   <a href="#" onclick="javascript:searchSubmit();">수정</a>
</div>
</body>

</html>

