<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>SGIS 통계지리정보서비스</title>
<link rel="stylesheet" type="text/css" href="./css/common.css" />
<link rel="stylesheet" type="text/css" href="./css/marster.css" />
<script type='text/javascript' src='/js/plugins/jquery-1.11.1.min.js'></script>
<script type='text/javascript' src='/js/plugins/jquery-ui-1.10.3.custom.js'></script>

<script type="text/javascript">
	
		var wsize = 1050;
     	var hsize = 3227;
     	document.onreadystatechange=resizeFrame;
     	function resizeFrame(){
	    	 try{
	    		 self.resizeTo(wsize, hsize);
	    	 }catch(e){
    	 	}
   	 }
     	
	$(document).ready(function(){
		$(".quizBtn").hide();
		
		$("#srv41").parent().hide();
		$("#srv42").parent().hide();
		
		apiLogWrite3("R05","2018년 설문조사 view");
		
	});
	
	function fnAgree(val){
		$("input:radio[name=agreement]:input[value=" +val+"]").prop("checked", true);
		
		if(val == "Y"){
			$(".quizBtn").show();
		} else {
			$(".quizBtn").hide();
		}
	}
	
	function setEtcVal(survayNum, val, aNum, obj){
		if($(obj).parent().children().hasClass('on')){
			$(obj).parent().children().removeClass('on');
			$(obj).parent().find("input").prop("readonly","readonly");
		} else {
			$(obj).parent().children('a').attr('class', 'on')
			$(obj).parent().find("input").prop("readonly","");
			
			// 기타 포커스
			if((survayNum == "2" || survayNum == "31" || survayNum == "5") && val == "8"){
	 			$("#etc"+ survayNum).focus();
	 		} else if(val == "13"){
	 			$("#etc"+ survayNum).focus();
 			} else if(survayNum == "41" || survayNum == "42"){
				$("#srv" + (survayNum) + " li>a").removeClass('on');
				$("#srv" + (survayNum) + " li>a").eq(aNum-1).attr('class', 'on');
 			}
		}
	}
	
	function setVal(survayNum, val, aNum, obj){
		if(survayNum == "2" || survayNum == "31" || survayNum == "32" || survayNum == "5"){
	 		if($(obj).children().hasClass('on')){
				$(obj).children().removeClass('on');
			} else {
				$(obj).children().attr('class', 'on');
	 		}
	 		return false;
		} else if(survayNum == "3"){
			if(val == "5"){
				$("#srv31").parent().hide();
				$("#srv32").parent().hide();
				$("#srv4").parent().hide();
				$("#srv5").parent().hide();
				$("#srv41").parent().hide();
				$("#srv42").parent().hide();
			}
			else {
				$("#srv31").parent().show();
				$("#srv32").parent().show();
				$("#srv4").parent().show();
				$("#srv5").parent().show();
				$("#srv4 li>a").removeClass('on');
			}
		} else if(survayNum == "4"){
			$("#srv41 li>a").removeClass('on');
			$("#srv42 li>a").removeClass('on');
			$("#survay41").val("");
			$("#survay42").val("");
			$("#etc41").val("");
			$("#etc42").val("");
			
			if(val == "1" || val == "2"){
				$("#srv41").parent().show();
				$("#srv42").parent().hide();
			} else {
				$("#srv41").parent().hide();
				$("#srv42").parent().show();
			}
		}
		
		$("#srv" + (survayNum) + " li>a").removeClass('on');
		$("#srv" + (survayNum) + " li>a").eq(aNum-1).attr('class', 'on');
		
	}
	
	function surveyEnter(){
		var jsonData = { gubun : "survey" };
		var valid = "";
		
		//문항
		$.each( $(".question:visible"), function( idx,el ){
			if( valid == "" ){
				var num = $(el).data("num"); //1~6번 문항까지만 있음
				var seq = $(el).data("seq");
				
				if( typeof num != "undefined" ){
					var answer = "";
					
					$.each( $( el ).find('ul>li>a.on'), function( a, b ){
						var sel = 
						answer += ( answer == "" ? "" : ",") + $( b ).text();
						
						var $input = $(b).closest('li').find('.input_etc');
						
						if( $input.length > 0 && $input.val() != "" ){
							jsonData['etc'+seq] = $input.val();
						}
					});
					
					if( answer == "" ){
						valid = num;
					}
					
					jsonData['survay'+seq] = answer;
				}
			}
		});
		
		if( valid != "" ){
			alert( valid + "번 문항을 선택해 주세요");
			return false;
		}
		
		if( $("#srv7text").val() != "" ){
			jsonData['etc1'] = $("#srv7text").val();
		}
		
		var name = $("#name").val().replace(/\s/g,'');
		var tel_no = $("#tel_no").val().replace(/[-]|\s/gi,'');
		
		$("#name").val( name );
		$("#tel_no").val( tel_no );
		
		jsonData['name'] = name;
		jsonData['tel_no'] = tel_no;
		
		var pattern;
		
		if( tel_no == '' || typeof tel_no == 'undefined' ){
			alert("휴대전화번호를 작성해주세요.");
			return false;
		} else {
			pattern = /^[0-9]*$/;
			
			if( !pattern.test( tel_no ) ){
				alert("휴대전화번호는 숫자만 입력해주세요.");
				return false;
			}
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
		}
		
		if( $("#srv9 li > a.on").text() == "" ){ alert("성별을 선택해 주세요"); return false; }
		if( $("#srv10 li > a.on").text() == "" ){ alert("연령을 선택해 주세요"); return false; }
		
		jsonData['survay12'] = $("#srv9 li > a.on").text();
		jsonData['survay13'] = $("#srv10 li > a.on").text();
		
		console.log( 'jsonDataddd', jsonData );
		
		if(confirm("제출하시겠습니까?") == true){
			/*jQuery.ajax({
		 		type:"POST",
		 		url: "/ServiceAPI/common/APILogWrite.json",
		 		data:{	"type": "Q0",
		 			"api_id" : "R06",
		 			"title" : "2018년 설문조사 등록 및 수정",
		 			"parameter" : "없음",
		 			"zoomLevel" : "00",
		 			"adm_nm" : "전국"
		 		},
				async: true,
		 		success:function(data){ */
					$.ajax({
				 		type:"POST",
				 		url: "/ServiceAPI/quiz/quiz2017.json",
				 		data: jsonData,
				 		success:function(data){
				 			if(data.result.resultCnt > 0){
			 					alert("등록된 연락처입니다.");
				 			}
		 					else {
								alert("등록되었습니다.");
				 				self.close();
		 					}
			 			},
				 		error:function(data){
				 			console.log(data);
				 		}
			 		});
		 		/*},
		 		error:function(data) {
					console.log("실패" + data); 
		 		}
			});*/
		} else {
			return;
		}
	}
	
	function onlyNumber(obj){
		$(obj).keyup(function(){
			$(this).val($(this).val().replace(/[^0-9]/g,""));
		});
	}
	
	function surveyCansle(){
		self.close();
	}
	
	function apiLogWrite3(api_id, title){
		jQuery.ajax({
	 		type:"POST",
	 		url: "/ServiceAPI/common/APILogWrite.json",
	 		data:{	"type": "Q0",
	 			"api_id" : api_id,
	 			"title" : title,
	 			"parameter" : "없음",
	 			"zoomLevel" : "00",
	 			"adm_nm" : "전국"
	 		},
			async: true,
	 		success:function(data){ 
// 				console.log("성공");
	 		},
	 		error:function(data) {
// 				console.log("실패" + data); 
	 		}
		});
	}
	
</script>
</head>
<body>
	<div id="wrapper">
		<div class="wrap">
			<div class="header">
				<p>2018<br>통계지리정보서비스<br>(SGIS)<b style="color:#ec1946;"> 이용자 설문조사</b></p>
			</div>

			<div class="content">
			    <!--문제1-->
				<div class="content-top">
					 <div class="content-1 question" id="srv1" data-num="1" data-seq="1">
						<p>1. 통계지리정보서비스(SGIS)에 대해 알고 있었습니까?</p>
							<ul>
								<li onclick="setVal(1,1,1)"><a>1</a><span>매우 잘 알고 있음</span></li> 
								<li onclick="setVal(1,2,2)"><a>2</a><span>잘 알고 있음</span></li>
								<li onclick="setVal(1,3,3)"><a>3</a><span>잘은 모르지만 들어는 봤음</span></li>
								<li onclick="setVal(1,4,4)"><a>4</a><span>이번에 처음 알게 됨</span></li>
							</ul>
					 </div>
				</div>
				<!--문제end-->
				<!--문제2-->
				<div class="content-top">
					 <div class="content-1 question" id="srv2" data-num="2" data-seq="2">
						<p>2. 통계지리정보서비스(SGIS)를 어떻게 알게 되셨습니까? (중복응답 가능)</p>
							<div class="content-2">
								<ul>
									<li onclick="setVal(2,1,1,this)"><a>1</a><span>통계청 홈페이지</span></li> 
									<li onclick="setVal(2,4,2,this)"><a>4</a><span>뉴스 및 신문기사</span></li>
									<li onclick="setVal(2,7,3,this)"><a>7</a><span>이벤트</span></li>
								</ul>
								<ul>
									<li onclick="setVal(2,2,4,this)"><a>2</a><span>KOSIS 국가통계포털</span></li> 
									<li onclick="setVal(2,5,5,this)"><a>5</a><span>일반 포털</span></li>
									<li>
										<a onclick="setEtcVal(2,8,6,this);">8</a><span onclick="setEtcVal(2,8,6,this);">기타</span>
										<input type="text" id="etc2" maxlength="100" class="ml15 input_etc" readonly/>
									</li>
								</ul>
								<ul>
									<li onclick="setVal(2,3,7,this)"><a>3</a><span>통계청 블로그 및 정책메일</span></li> 
									<li onclick="setVal(2,6,8,this)"><a>6</a><span>통계간행물</span></li>
								</ul>
						    </div>
					 </div>
				</div>
				<!--문제end-->
				<!--문제3-->
				<div class="content-top">
					 <div class="content-1 question" id="srv3" data-num="3" data-seq="3">
						<p>3. 통계지리정보서비스(SGIS)를 얼마나 자주 이용하십니까?</p>
							<ul>
								<li onclick="setVal(3,1,1)"><a>1</a><span>수시로 이용</span></li> 
								<li onclick="setVal(3,2,2)"><a>2</a><span>한 달에 1회</span></li>
								<li onclick="setVal(3,3,3)"><a>3</a><span>한 달에 2~3회</span></li>
								<li onclick="setVal(3,4,4)"><a>4</a><span>분기에 1회</span></li>
								<li onclick="setVal(3,5,5)"><a>5</a><span>거의 이용하지 않음</span> ☞ 6번 문항으로 이동</li>
							</ul>
					 </div>
				</div>
			</div>
			<!--end-->
			<!--문제4-->
				<div class="content-top">
					 <div class="content-1 question" id="srv31" data-num="3-1" data-seq="4">
						<p>3-1. 이용하시는 주된 목적은 무엇입니까?(중복응답 가능)</p>
							<div class="content-2">
								<ul>
									<li onclick="setVal(31,1,1,this)"><a>1</a><span>연구분석(논문)</span></li> 
									<li onclick="setVal(31,4,2,this)"><a>4</a><span>보고서 작성(시각화목적)</span></li>
									<li onclick="setVal(31,7,3,this)"><a>7</a><span>단순 정보 파악</span></li>
								</ul>
								<ul>
									<li onclick="setVal(31,2,4,this)"><a>2</a><span>정책수립</span></li> 
									<li onclick="setVal(31,5,5,this)"><a>5</a><span>상권분석</span></li>
									<li>
										<a onclick="setEtcVal(31,8,6,this)">8</a><span onclick="setEtcVal(31,8,6,this)">기타</span>
										<input type="text" id="etc31" maxlength="100" class="ml15 input_etc" readonly/>
									</li>
								</ul>
								<ul>
									<li onclick="setVal(31,3,7,this)"><a>3</a><span>교육용 자료(실습, 강의 등)</span></li> 
									<li onclick="setVal(31,6,8,this)"><a>6</a><span>프로그램 개발 및 DB구축</span></li>
								</ul>
						    </div>
					 </div>
				</div>
			<!--문제end-->
			<!--문제5-->
				<div class="content-top">
					 <div class="content-1 question" id="srv32" data-num="3-2" data-seq="5">
						<p>  3-2. 자주 이용하시는 콘텐츠는 무엇입니까? (중복응답 가능)</p>
							<div class="content-2">
								<ul>
									<li onclick="setVal(32,1,1,this)"><a>1</a><span>통계주제도</span></li> 
									<li onclick="setVal(32,5,2,this)"><a>5</a><span>지역현안 소통지도</span></li>
									<li onclick="setVal(32,9,3,this)"><a>9</a><span>움직이는 인구피라미드</span></li>
									<li>
										<a onclick="setEtcVal(32,13,4,this)">13</a><span onclick="setEtcVal(32,13,4,this)">기타</span>
										<input type="text" id="etc32" maxlength="100" class="ml15 input_etc" readonly/>
									</li>
								</ul>
								<ul>
									<li onclick="setVal(32,2,5,this)"><a>2</a><span>대화형통계지도</span></li> 
									<li onclick="setVal(32,6,6,this)"><a>6</a><span>통계지도체험</span></li>
									<li onclick="setVal(32,10,7,this)"><a>10</a><span>성씨분포</span></li>
								</ul>
								<ul>
									<li onclick="setVal(32,3,8,this)"><a>3</a><span>살고싶은 우리동네</span></li> 
									<li onclick="setVal(32,7,9,this)"><a>7</a><span>고령화 현황보기</span></li>
									<li onclick="setVal(32,11,10,this)"><a>11</a><span>자료제공</span></li>
								</ul>
								<ul>
									<li onclick="setVal(32,4,11,this)"><a>4</a><span>우리동네 생활업종</span></li> 
									<li onclick="setVal(32,8,12,this)"><a>8</a><span>지방의 변화보기</span></li>
									<li onclick="setVal(32,12,13,this)"><a>12</a><span>개발자지원센터(Open API)</span></li>
								</ul>
						    </div>
					 </div>
				</div>
			<!--문제end-->
			<!--문제6-->
				<div class="content-top">
					 <div class="content-1 question" id="srv4" data-num="4" data-seq="7">
						<p>4. 통계지리정보서비스(SGIS)에 대해 전반적으로 얼마나 만족하십니까?</p>
							<ul>
								<li onclick="setVal(4,1,1)"><a>1</a><span>매우 만족</span>    ☞ 4-1번 문항으로 이동</li> 
								<li onclick="setVal(4,2,2)"><a>2</a><span>만족</span>          ☞ 4-1번 문항으로 이동</li>
								<li onclick="setVal(4,3,3)"><a>3</a><span>불만족</span>        ☞ 4-2번 문항으로 이동</li>
								<li onclick="setVal(4,4,4)"><a>4</a><span>매우 불만족</span>   ☞ 4-2번 문항으로 이동</li>
							</ul>
					 </div>
				</div>
			<!--문제end-->
			<!--문제7-->
				<div class="content-top">
					 <div class="content-1 question" id="srv41" data-num="4-1" data-seq="8">
						<p>4-1. (4번 문항에서 ①, ②번 응답자만 해당) 만족한 이유는 무엇입니까?</p>
							<ul>
								<li onclick="setVal(41,1,1)"><a>1</a><span>지도와 통계가 융합되어 통계를 직관적으로 이해하는데 도움</span></li> 
								<li onclick="setVal(41,2,2)"><a>2</a><span>제공하는 콘텐츠 다양</span></li>
								<li onclick="setVal(41,3,3)"><a>3</a><span>읍면동보다도 더 작은 단위의 소지역 통계 제공</span></li>
								<li onclick="setVal(41,4,4)"><a>4</a><span>자료공개(자료제공, Open API)로 공간통계 활용 유용</span></li>
								<li>
									<a onclick="setEtcVal(41,5,5,this)">5</a><span onclick="setEtcVal(41,5,5,this)">기타</span>
									<input type="text" id="etc41" maxlength="100" class="ml15 input_etc" readonly/>
								</li>
							</ul>
					 </div>
				</div>
			<!--문제end-->
			<!--문제8-->
				<div class="content-top">
					 <div class="content-1 question" id="srv42" data-num="4-2" data-seq="9">
						<p> 4-2. (4번 문항에서 ③, ④번 응답자만 해당) 만족하지 않는 이유는 무엇입니까?</p>
							<ul>
								<li onclick="setVal(42,1,1)"><a>1</a><span>수록 통계자료가 다양하지 않음</span></li> 
								<li onclick="setVal(42,2,2)"><a>2</a><span>이용절차 복잡</span></li>
								<li onclick="setVal(42,3,3)"><a>3</a><span>이용방법에 대한 설명 부족</span></li>
								<li onclick="setVal(42,4,4)"><a>4</a><span>홈페이지 디자인이나 구성 불만족</span></li>
								<li>
									<a onclick="setEtcVal(42,5,5,this)">5</a><span onclick="setEtcVal(42,5,5,this)">기타</span>
									<input type="text" id="etc42" maxlength="100" class="ml15 input_etc" readonly/>
								</li>
							</ul>
					 </div>
				</div>
		   <!--문제end-->
		   <!--문제9-->
				<div class="content-top">
					 <div class="content-1 question" id="srv5" data-num="5" data-seq="10">
						<p>5. 통계지리정보서비스(SGIS)가 개선해야 할 부분은 무엇이라고 생각하십니까?(중복응답 가능) </p>
							<ul>
								<li onclick="setVal(5,1,1,this)"><a>1</a><span>다양한 방법으로 지속적인 홍보</span></li> 
								<li onclick="setVal(5,2,2,this)"><a>2</a><span>서비스 이용 편의성 확대 및 절차 간소화</span></li>
								<li onclick="setVal(5,3,3,this)"><a>3</a><span>통계 수록자료 및 제공범위 확대</span></li>
								<li onclick="setVal(5,4,4,this)"><a>4</a><span>홈페이지(SGIS) 구성 및 사이트맵 개선</span></li>
								<li onclick="setVal(5,5,5,this)"><a>5</a><span>다양한 서비스 개발</span></li>
								<li onclick="setVal(5,6,6,this)"><a>6</a><span>공간분석 및 시각화 기능 강화</span></li>
								<li onclick="setVal(5,7,7,this)"><a>7</a><span>개발자 지원기능 강화</span></li>
								<li>
									<a onclick="setEtcVal(5,8,8,this)">8</a>
									<span onclick="setEtcVal(5,8,8,this)">기타</span>
									<input type="text" id="etc5" maxlength="100" class="ml15 input_etc" readonly/>
								</li>
							</ul>
					 </div>
				</div>
		   <!--문제end-->
		   <!--문제10-->
				<div class="content-top">
					 <div class="content-1 question" id="srv6" data-num="6" data-seq="11">
						<p> 6. 귀하는 앞으로도 통계지리정보서비스(SGIS)를 계속 이용하시겠습니까?</p>
							<div class="content-2">
								<ul>
									<li onclick="setVal(6,1,1)"><a>1</a><span>꼭 이용할 것</span></li> 
									<li onclick="setVal(6,4,2)"><a>4</a><span>전혀 이용할 생각없음</span></li>
								</ul>
								<ul>
									<li onclick="setVal(6,2,3)"><a>2</a><span>이용할 생각이 조금 있음</span></li> 
								</ul>
								<ul>
									<li onclick="setVal(6,3,5)"><a>3</a><span>별로 이용할 생각없음</span></li> 
								</ul>
						    </div>
					 </div>
				</div>
			<!--문제end-->
			<!--문제11-->
				<div class="content-top">
					 <div class="content-1" id="srv7">
						<p>7. SGIS 홈페이지의 서비스 향상을 위해 개선의견, 바라는 점 등을 자유롭게<br/>제안하여 주시기 바랍니다.</p>
							<div class="content-3">
								<textarea id="srv7text" maxlength="2000" class="content-squre"></textarea>
							</div>
					 </div>
				</div>
			<!--문제end-->
			
			<!--문제15-->
				<div class="content-top">
					 <div class="content-1">
						<p>개인정보 수집항목(성명, 휴대전화번호)은 추첨을 통한 상품권 지급 및 분석 목적으로만 사용되며,
						경품 지급 후 파기됩니다. 개인정보 수집에 동의하지 않으시면 설문에 참여하실 수 없습니다.</p>
						
						<ul class="squre-type1" style="margin-left: 360px">
							<li onclick="fnAgree('Y');" style="padding-right:15px;"><input type="radio" name="agreement" value="Y" />동의</li>
							<li onclick="fnAgree('N');"><input type="radio" name="agreement" value="N" checked="checked"/>비동의</li>
						</ul>
					 </div>
				</div>
			<!--문제end-->
			
			<div class="content-top">
				<div class="content-1">
					<table class="apiTable02">
						<colgroup>
							<col width="200px;"></col>
							<col width=""></col>
						</colgroup>
						<tbody>
							<tr>
								<th>핸드폰 번호</th>
								<td>
									<input type="text" class="ml15 w300" value="" id="tel_no" maxlength="20">
								</td>
							</tr>
							<tr>
								<th>성 명</th>
								<td>
									<input type="text" class="ml15 w300" value="" id="name" maxlength="20">
								</td>
							</tr>
							<tr>
								<th>성 별</th>
								<td>
									<ul id="srv9" class="ojj">
										<li onclick="setVal(9,1,1)"><a>1</a><span>남자</span></li> 
										<li onclick="setVal(9,2,2)"><a>2</a><span>여자</span></li> 
									</ul>
								</td>
							</tr>
							<tr>
								<th>연 령</th>
								<td>
									<ul id="srv10" class="ojj">
										<li onclick="setVal(10,1,1)"><a>1</a><span>19세 이하</span></li> 
										<li onclick="setVal(10,2,2)"><a>2</a><span>20~29세</span></li> 
										<li onclick="setVal(10,3,3)"><a>3</a><span>30~39세</span></li> 
										<li onclick="setVal(10,4,4)"><a>4</a><span>40~49세</span></li> 
										<li onclick="setVal(10,5,5)"><a>5</a><span>50~59세</span></li> 
										<li onclick="setVal(10,6,6)"><a>6</a><span>60세 이상</span></li> 
									</ul>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			
			<div class="quizBtn" style="top:420px;">
				<a onclick="surveyEnter();" class="btnType01">제출하기</a>
				<a onclick="surveyCansle();" class="btnType02">취소</a>
			</div>
			
			<div class="last">※설문에 참여해 주셔서 감사합니다. 앞으로도 SGIS 많은 이용 부탁드립니다.</div>
			
		</div>
	</div>
</body>
</html>
