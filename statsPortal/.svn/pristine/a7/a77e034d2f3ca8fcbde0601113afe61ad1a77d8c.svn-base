<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="java.text.SimpleDateFormat" %> 
<%@ page import="java.util.Calendar" %> 
<%@ page import="java.util.Date" %> 
<%@ page import="java.util.HashMap" %> 
<%@ page import="java.util.Map" %> 
<%
	String bDate = "20191105";
	
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
 <html lang="ko" style="min-width:700px;"> 

 <head> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes">
     
	<script type='text/javascript' src='/js/plugins/jquery-1.11.1.min.js'></script>
	
	<script type='text/javascript' src='/js/plugins/jquery-ui-1.10.3.custom.js'></script>
	<script type="text/javascript" src="/js/common/includeHead.js"></script>  
	<script type="text/javascript"  src="/js/common/common.js"></script>
	
    <link rel="stylesheet" type="text/css" href="./css/common.css" />
    <link rel="stylesheet" type="text/css" href="./css/default.css" />
		
    <title>SGIS 통계지리정보서비스</title>
    
    <script type="text/javascript">    
		var wsize = 700;
     	var hsize = 3227;
     	
     	document.onreadystatechange=resizeFrame;
     	function resizeFrame(){
	    	 try{
	    		 self.resizeTo(wsize, hsize);
	    	 }catch(e){
    	 	}
	   	 }
	     	
		$(document).ready(function(){
			srvLogWrite( "A0", "15", "03", "00", "이벤트", "2019년 SGIS 이용자 설문조사" );
			apiLogWrite2('R0', 'R07', "이벤트", "2019년 SGIS 이용자 설문조사",  '00', '없음');
						
			$(".quizBtn").hide();
			$("#info-1").hide();
			$("#srv41").parent().hide();
			$("#srv42").parent().hide();

			$('input').focusin(function(){
				if(this.id == "etc2" ){ $("#srv2  li label>button").eq( 7).attr('class', 'on');  $("#survay2").val("8");}
				else if(this.id == "etc31"){ $("#srv31 li label>button").eq( 7).attr('class', 'on'); $("#survay31").val("8");}
				else if(this.id == "etc32"){ $("#srv32 li label>button").eq(16).attr('class', 'on'); $("#survay32").val("17");}
				else if(this.id == "etc41"){ $("#srv41 li label>button").removeClass('on'); $("#srv41 li label>button").eq( 4).attr('class', 'on');  $("#survay41").val("5");}
				else if(this.id == "etc42"){ $("#srv42 li label>button").eq( 4).attr('class', 'on');  $("#survay42").val("5");}
				else if(this.id == "etc5" ){ $("#srv5  li label>button").eq( 7).attr('class', 'on');  $("#survay5").val("8");}
			}); 
			$('input').focusout(function(){
				if(this.id == "etc2" ){ if(this.value == "") $("#srv2  li label>button").eq( 7).removeClass('on'); }
				else if(this.id == "etc31"){ if(this.value == "") $("#srv31 li label>button").eq( 7).removeClass('on'); }
				else if(this.id == "etc32"){ if(this.value == "") $("#srv32 li label>button").eq(16).removeClass('on'); }
				else if(this.id == "etc41"){ if(this.value == "") $("#srv41 li label>button").eq( 4).removeClass('on'); }
				else if(this.id == "etc42"){ if(this.value == "") $("#srv42 li label>button").eq( 4).removeClass('on'); }
				else if(this.id == "etc5" ){ if(this.value == "") $("#srv5  li label>button").eq( 7).removeClass('on'); }
			}); 
		
			apiLogWrite3("R05","2019년 설문조사 view");

			var offset = $("#survey_content").offset();
			if( offset ){
				$("html, body").animate({scrollTop : offset.top }, 200);
			}
		});
		
		function fnAgree(val){
			$("input:radio[name=agreement]:input[value=" +val+"]").prop("checked", true);
			
			if(val == "Y"){
				$(".quizBtn").show();
				$("#info-1").show();
			} else {
				$(".quizBtn").hide();
				$("#info-1").hide();
			}
		}

		function setEtcVal(survayNum, val, aNum, obj){
			if($(obj).parent().children().hasClass('on')){
				$(obj).parent().children().removeClass('on');
			} else {
				$(obj).parent().children('button').attr('class', 'on');
				// 기타 포커스 
				if((survayNum == "2" || survayNum == "31" || survayNum == "5") && val == "8"){ 
		 			$("#etc"+ survayNum).focus(); 
		 		} else if(val == "13"){  
		 			$("#etc"+ survayNum).focus();
	 			} else if(survayNum == "41" || survayNum == "42"){
	 				$("#survay"+survayNum).val(val);
	 				
					$("#srv" + (survayNum) + " li label>button").removeClass('on');
					$("#srv" + (survayNum) + " li label>button").eq(aNum-1).attr('class', 'on');
	 			}
			}
		}
		
		function setVal(survayNum, val, aNum, obj){
			
			if(survayNum == "2" || survayNum == "31" || survayNum == "32" || survayNum == "5"){
		 		if($(obj).hasClass('on')){
					$(obj).removeClass('on');
				} else {
					$(obj).attr('class', 'on');
		 		}
		 		
	// 			$("#srv" + (survayNum) + " li>a").eq(aNum-1).toggleClass('on');
		 		return false;
			}
			else 
			if(survayNum == "3"){
				if(val == "5"){
					$("#srv31").parent().hide();
					$("#survay31").val("");
					$("#srv31 li label>button").removeClass('on');

					$("#srv32").parent().hide();
					$("#survay32").val("");
					$("#srv32 li label>button").removeClass('on');

					$("#srv4").parent().hide();
					$("#survay4").val("");
					$("#srv4 li label>button").removeClass('on');

					$("#srv41").parent().hide();
					$("#survay41").val("");
					$("#srv41 li label>button").removeClass('on');

					$("#srv42").parent().hide();
					$("#survay42").val("");
					$("#srv42 li label>button").removeClass('on');

					$("#srv5").parent().hide();
					$("#survay5").val("");
					$("#srv5 li label>button").removeClass('on');
				}
				else {
					$("#srv31").parent().show();
					$("#srv32").parent().show();
					$("#srv4").parent().show();
					$("#srv5").parent().show();
					$("#srv4 li label>button").removeClass('on');
				}
			}
			else if(survayNum == "4"){
				$("#srv41 li label>button").removeClass('on');
				$("#srv42 li label>button").removeClass('on');
				$("#survay41").val("");
				$("#survay42").val("");
				$("#etc41").val("");
				$("#etc42").val("");
				if(val == "1" || val == "2"){
					$("#srv41").parent().show();
					$("#srv42").parent().hide();
				}else{
					$("#srv41").parent().hide();
					$("#srv42").parent().show();
				}
			}
			else if(survayNum == "41" && aNum !=  5){
				$("#etc41").val("");
			}
			else if(survayNum == "42" && aNum !=  5){
				$("#etc42").val("");
			}

			$("#survay"+survayNum).val(val);
			$("#srv" + (survayNum) + " li label>button").removeClass('on');
			$("#srv" + (survayNum) + " li label>button").eq(aNum-1).attr('class', 'on'); 
			
		}
		
		function surveyEnter(){
			
			$("#survay2").val($("#srv2 li label>button.on").text());
			$("#survay31").val($("#srv31 li label>button.on").text());
			var srv32val = "";
			for(var i = 0 ; i < $("#srv32 li label>button").length ; i++ ){
				if($("#srv32 li label>button").eq(i).hasClass("on")){
					srv32val +=  $("#srv32 li label>button").eq(i).text() + "|";
				}
			}
			$("#survay32").val(srv32val);
			$("#survay5").val($("#srv5 li label>button.on").text());
			$("#survay6").val($("#srv6 li label>button.on").text());
	
			$("#survay7").val($("#srv7text").val());
			$("#survay9").val($("#srv9 li label>button.on").text());
			$("#survay10").val($("#srv10 li label>button.on").text());
			

			if($("#survay1").val() == ""){ alert("1번 문항을 선택해 주세요"); return false; }
			if($("#survay2").val() == ""){ alert("2번 문항을 선택해 주세요"); return false; }
			if($("#survay3").val() == ""){ alert("3번 문항을 선택해 주세요"); return false; }
			if($("#survay3").val() != "5"){
				if($("#survay31").val() == ""){  alert("3-1번 문항을 선택해 주세요"); return false; }
				if($("#survay32").val() == ""){ alert("3-2번 문항을 선택해 주세요"); return false; }
				if($("#survay4").val() == ""){ alert("4번 문항을 선택해 주세요"); return false; }
				if($("#survay4").val() == "1" || $("#survay4").val() == "2"){
					if($("#survay41").val() == ""){ alert("4-1번 문항을 선택해 주세요"); return false; }
				} else if($("#survay4").val() == "3" || $("#survay4").val() == "4"){
					if($("#survay42").val() == ""){ alert("4-2번 문항을 선택해 주세요"); return false; }
				}
				if($("#survay5").val() == ""){ alert("5번 문항을 선택해 주세요"); return false; }
			}
			if($("#survay6").val() == ""){ alert("6번 문항을 선택해 주세요"); return false; }

			
			if($("#tel_no").val()==""){
				alert("이동전화번호(휴대폰)를 입력해주세요");
				$("#tel_no").focus();
				return false;
			} 
			if($("#name").val()==""){
				alert("이름을 입력해주세요");
				$("#name").focus();
				return false;
			}
			
			if($("#survay9").val() == ""){ alert("[성별]을 선택해 주세요"); return false; }
			if($("#survay10").val() == ""){ alert("[연령]을 선택해 주세요"); return false; }

			if($("#survay3" ).val() == "") $("#survay3" ).val("-");
			if($("#survay31").val() == "") $("#survay31").val("-");
			if($("#survay32").val() == "") $("#survay32").val("-");
			if($("#survay4" ).val() == "") $("#survay4" ).val("-");
			if($("#survay41").val() == "") $("#survay41").val("-");
			if($("#survay42").val() == "") $("#survay42").val("-");
			if($("#survay5" ).val() == "") $("#survay5" ).val("-");
			if($("#survay7" ).val() == "") $("#survay7" ).val("-");
			if($("#survay10").val() == "") $("#survay10").val("-");

			
			$("#survay9").val($("#survay9").val()=="1"? "M" : "F");
						
			if(confirm("제출하시겠습니까?") == true){				
				jQuery.ajax({
			 		type:"POST",
			 		url: "/ServiceAPI/common/APILogWrite.json",
			 		data:{	"type": "Q0",
				 			"api_id" : "R06",
				 			"title" : "2019년 설문조사 등록 및 수정",
				 			"parameter" : "없음",
				 			"zoomLevel" : "00",
				 			"adm_nm" : "전국"
			 		},
					async: true,
			 		success:function(data){ 
						$.ajax({
					 		type:"POST",
					 		url: "/ServiceAPI/quiz/quiz2017.json",
					 		data:{
					 			"gubun"    : "survey",	
					 			"name"     : $("#name").val(),
					 			"tel_no"   : $("#tel_no").val(),
					 			"survay1"  : $("#survay1").val(),
					 			"survay2"  : $("#survay2").val(),
					 			"survay3"  : $("#survay3").val(),
					 			"survay4"  : $("#survay31").val(),
					 			"survay5"  : $("#survay32").val(),
					 			"survay7"  : $("#survay4").val(),
					 			"survay8"  : $("#survay41").val(),
					 			"survay9"  : $("#survay42").val(),
					 			"survay10" : $("#survay5").val(),
					 			"survay11" : $("#survay6").val(),
					 			"etc1" : $("#etc2" ).val() == "" ? "-" : $("#etc2").val(),
					 			"etc2" : $("#etc31" ).val() == "" ? "-" : $("#etc31").val(),
					 			"etc3" : $("#etc32" ).val() == "" ? "-" : $("#etc32").val(),
					 			"etc4" : $("#etc41" ).val() == "" ? "-" : $("#etc41").val(),
					 			"etc5" : $("#etc42" ).val() == "" ? "-" : $("#etc42").val(),
					 			"etc6" : $("#etc5" ).val() == "" ? "-" : $("#etc5").val(),
					 			"etc7" : $("#survay7" ).val() == "" ? "-" : $("#survay7").val(),
					 			"etc9" : $("#survay9").val(),
					 			"etc10": $("#survay10").val()
					 		},
					 		success:function(data){
					 			if(data.result.resultCnt > 0){
				 					alert("등록된 연락처입니다.");
					 			}
			 					else {
			 						
			 						srvLogWrite( "A0", "15", "04", "00", "이벤트", "2019년 SGIS 이용자 설문조사" ); 
			 						apiLogWrite2('R0', 'R08', "이벤트", "2019년 SGIS 이용자 설문조사",  '00', '없음' );
			 						
									alert("등록되었습니다.");
					 				self.close();
			 					}
				 			},
					 		error:function(data){
					 			console.log(data);
					 		}
				 		});
			 		},
			 		error:function(data) {
						console.log("실패" + data); 
			 		}
				});
					
				
			} else
				return;
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
					console.log("성공");
		 		},
		 		error:function(data) {
					console.log("실패" + data); 
		 		}
			});
		}
	</script>

</head>

<body>
    <div class="wrap">
		<input type="hidden" id="survay1"  value="">
		<input type="hidden" id="survay2"  value="">
		<input type="hidden" id="survay3"  value="">
		<input type="hidden" id="survay31" value="">
		<input type="hidden" id="survay32" value="">
		<input type="hidden" id="survay4"  value="">
		<input type="hidden" id="survay41" value="">
		<input type="hidden" id="survay42" value="">
		<input type="hidden" id="survay5"  value="">
		<input type="hidden" id="survay6"  value="">
		<input type="hidden" id="survay7"  value="">
		<input type="hidden" id="survay8"  value="">
		<input type="hidden" id="survay9"  value="">
		<input type="hidden" id="survay10"  value="">
			    
		<div align="center">
			<img src="/html/survey/2019/img/notice.jpg" style="width:500px; height:710px;">
		</div>
		
		<%
		System.out.println("idx === " + idx );
		if( idx < 1 || idx > 15 ){
		%>
			<script type="text/javascript">
				alert("이벤트 기간이 아닙니다.");
				window.close();
			</script>
		<%
		} else
			{
		%>
			    
        <div  id="survey_content" class="tit"></div>
        <div class="quizBox">
            <ul>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">1.</span>
                        통계지리정보서비스(SGIS)에 대해 얼마나 알고 계십니까?
                    </div>
					<div id="srv1">
	                    <ul class="row">
							<li class="answerList"><label><button onclick="setVal(1,1,1)">1</button><span>매우 잘 알고 있음</span></label></li> 
							<li class="answerList"><label><button onclick="setVal(1,2,2)">2</button><span>잘 알고 있음</span></label></li>
							<li class="answerList"><label><button onclick="setVal(1,3,3)">3</button><span>잘은 모르지만 들어는 봤음</span></label></li>
							<li class="answerList"><label><button onclick="setVal(1,4,4)">4</button><span>이번에 처음 알게 됨</span></label></li>
	                    </ul>
	                </div>   
                </li>
                <li class="quizList"> 
                    <div class="quiz">
                        <span class="no">2.</span>
                        통계지리정보서비스(SGIS)를 어떻게 알게 되셨습니까?
                        <span class="parenthesis">(중복응답 가능)</span>
                    </div>
					<div id="srv2">
	                    <ul class="row">
	                        <li class="answerList"><label><button onclick="setVal(2,1,1,this)">1</button> 통계청 홈페이지</label></li>
	                        <li class="answerList"><label><button onclick="setVal(2,2,2,this)">2</button> KOSIS 국가통계포털</label></li>
	                        <li class="answerList"><label><button onclick="setVal(2,3,3,this)">3</button> 통계청 블로그 및 정책메일</label></li>
	                        <li class="answerList"><label><button onclick="setVal(2,4,4,this)">4</button> 뉴스 및 신문기사</label></li>
	                        <li class="answerList"><label><button onclick="setVal(2,5,5,this)">5</button> 일반 포털</label></li>
	                        <li class="answerList"><label><button onclick="setVal(2,6,6,this)">6</button> 통계간행물</label></li>
	                        <li class="answerList"><label><button onclick="setVal(2,7,7,this)">7</button> 이벤트</label></li>
	                        <li class="answerList"><label><button onclick="setVal(2,8,8,this)">8</button><span onclick="setEtcVal(2,8,8,this);">기타</span><input type="text" id="etc2" maxlength="100"/></label></li>
	                    </ul>
                    </div>
                </li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">3.</span>
                        통계지리정보서비스(SGIS)를 얼마나 자주 이용하십니까?
                    </div>
					<div id="srv3">
	                    <ul class="row">
	                        <li class="answerList"><label><button onclick="setVal(3,1,1)">1</button> 수시로 이용</label></li>
	                        <li class="answerList"><label><button onclick="setVal(3,2,2)">2</button> 한 달에 1회</label></li>
	                        <li class="answerList"><label><button onclick="setVal(3,3,3)">3</button> 한 달에 2~3회</label></li>
	                        <li class="answerList"><label><button onclick="setVal(3,4,4)">4</button> 분기에 1회</label></li>
	                        <li class="answerList"><label><button onclick="setVal(3,5,5)">5</button> 거의 이용하지 않음     ☞ 6번 문항으로 이동</label></li>
	                    </ul>
                    </div>
                </li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">3-1.</span>
                        이용하시는 주된 목적은 무엇입니까? <span class="parenthesis">(중복응답 가능)</span>  
                    </div>
					<div id="srv31">
	                    <ul class="row">
	                        <li class="answerList"><label><button onclick="setVal(31,1,1,this)">1</button> 연구분석(논문)</label></li>
	                        <li class="answerList"><label><button onclick="setVal(31,2,2,this)">2</button> 정책수립</label></li>
	                        <li class="answerList"><label><button onclick="setVal(31,3,3,this)">3</button> 교육용 자료(실습, 강의 등)</label></li>
	                        <li class="answerList"><label><button onclick="setVal(31,4,4,this)">4</button> 보고서 작성(시각화목적)</label></li>
	                        <li class="answerList"><label><button onclick="setVal(31,5,5,this)">5</button> 상권분석</label></li>
	                        <li class="answerList"><label><button onclick="setVal(31,6,6,this)">6</button> 프로그램 개발 및 DB구축</label></li>
	                        <li class="answerList"><label><button onclick="setVal(31,7,7,this)">7</button> 단순 정보 파악</label></li>
	                        <li class="answerList"><label><button onclick="setVal(31,8,8,this)">8</button><span onclick="setEtcVal(31,8,8,this)">기타</span></label><input type="text" id="etc31" maxlength="100"/></li>
	                    </ul>
                    </div>
                </li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">3-2.</span>
                        자주 이용하시는 콘텐츠는 무엇입니까?
                        <span class="parenthesis">(중복응답 가능)</span>
                    </div>
					<div id="srv32">
	                    <ul class="row">
	                        <li class="answerList"><label><button onclick="setVal(32,1,1,this)">1</button> 통계주제도</label></li>
	                        <li class="answerList"><label><button onclick="setVal(32,2,2,this)">2</button> 대화형 통계지도</label></li>
	                        <li class="answerList"><label><button onclick="setVal(32,3,3,this)">3</button> 일자리맵</label></li>
	                        <li class="answerList"><label><button onclick="setVal(32,4,4,this)">4</button> 정책통계지도</label></li>
	                        <li class="answerList"><label><button onclick="setVal(32,5,5,this)">5</button> 살고싶은 우리동네</label></li>
	                        <li class="answerList"><label><button onclick="setVal(32,6,6,this)">6</button> 업종통계지도</label></li>
	                        <li class="answerList"><label><button onclick="setVal(32,7,7,this)">7</button> 지역현안소통지도</label></li>
	                        <li class="answerList"><label><button onclick="setVal(32,8,8,this)">8</button> 통계지도체험</label></li>
	                        <li class="answerList"><label><button onclick="setVal(32,9,9,this)">9</button> 월간통계</label></li>
	                        <li class="answerList"><label><button onclick="setVal(32,10,10,this)">10</button> 인구피라미드</label></li>
	                        <li class="answerList"><label><button onclick="setVal(32,11,11,this)">11</button> 고령화 현황보기</label></li>
	                        <li class="answerList"><label><button onclick="setVal(32,12,12,this)">12</button> 성씨분포</label></li>
	                        <li class="answerList"><label><button onclick="setVal(32,13,13,this)">13</button> 지방의 변화보기</label></li>
	                        <li class="answerList"><label><button onclick="setVal(32,14,14,this)">14</button> 자료제공</label></li>
	                        <li class="answerList"><label><button onclick="setVal(32,15,15,this)">15</button> 개발지원센터(Open API)</label></li>
	                        <li class="answerList"><label><button onclick="setVal(32,16,16,this)">16</button> SGIS에듀</label></li>
	                        <li class="answerList"><label><button onclick="setVal(32,17,17,this)">17</button><span onclick="setEtcVal(32,17,17,this)">기타</span></label><input type="text" id="etc32" maxlength="100"></li>
	                        </li>
	                    </ul>
                    </div>
                </li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">4.</span>
                        통계지리정보서비스(SGIS)에 대해 전반적으로 얼마나 만족하십니까?
                    </div>
					<div id="srv4">
	                    <ul class="row">
	                        <li class="answerList"><label><button onclick="setVal(4,1,1)">1</button> 매우 만족     ☞ 4-1번 문항으로 이동</label></li>
	                        <li class="answerList"><label><button onclick="setVal(4,2,2)">2</button> 만족          ☞ 4-1번 문항으로 이동</label></li>
	                        <li class="answerList"><label><button onclick="setVal(4,3,3)">3</button> 불만족        ☞ 4-2번 문항으로 이동</label></li>
	                        <li class="answerList"><label><button onclick="setVal(4,4,4)">4</button> 매우 불만족   ☞ 4-2번 문항으로 이동</label></li>
	                    </ul>
                    </div>
                </li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">4-1.</span>
                        <span class="parenthesis">(4번 문항에서 ①, ②번 응답자만 해당)
                        </span>
                        만족한 이유는 무엇입니까?
                    </div>
					<div id="srv41">
	                    <ul class="row">	                        
	                        <li class="answerList anFull"><label><button onclick="setVal(41,1,1,this)">1</button> 지도와 통계가 융합되어 통계를 직관적으로 이해하는데 도움</label></li>
	                        <li class="answerList"><label><button onclick="setVal(41,2,2,this)">2</button> 제공하는 콘텐츠 다양</label></li>
	                        <li class="answerList"><label><button onclick="setVal(41,3,3,this)">3</button> 읍면동보다도 더 작은 단위의 소지역 통계 제공</label></li>
	                        <li class="answerList"><label><button onclick="setVal(41,4,4,this)">4</button> 자료공개(자료제공, Open API)로 공간통계 활용 유용</label></li>
	                        <li class="answerList"><label><button onclick="setVal(41,5,5,this)">5</button><span onclick="setEtcVal(41,5,5,this)">기타</span></label><input type="text" id="etc41" maxlength="100"></li>
	                    </ul>
                    </div>
                </li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">4-2.</span>
                        <span class="parenthesis">(4번 문항에서 ③, ④번 응답자만 해당) </span>만족하지 않는 이유는 무엇입니까?
                    </div>
					<div id="srv42">
	                    <ul class="row">	                        
	                        <li class="answerList"><label><button onclick="setVal(42,1,1,this)">1</button> 수록 통계자료가 다양하지 않음</label></li>
	                        <li class="answerList"><label><button onclick="setVal(42,2,2,this)">2</button> 이용절차 복잡</label></li>
	                        <li class="answerList"><label><button onclick="setVal(42,3,3,this)">3</button> 이용방법에 대한 설명 부족</label></li>
	                        <li class="answerList"><label><button onclick="setVal(42,4,4,this)">4</button> 홈페이지 디자인이나 구성 불만족</label></li>
	                        <li class="answerList"><label><button onclick="setVal(42,5,5,this)">5</button><span onclick="setEtcVal(42,5,5,this)">기타</span></label><input type="text" id="etc42" maxlength="100"></li>
	                    </ul>
                    </div>
                </li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">5.</span>
                        통계지리정보서비스(SGIS)가 개선해야 할 부분은 무엇이라고 생각하십니까?
                        <span class="parenthesis">(중복응답 가능)</span>
                    </div>
					<div id="srv5">
	                    <ul class="row">
	                        <li class="answerList"><label><button onclick="setVal(5,1,1,this)">1</button> 다양한 방법으로 지속적인 홍보</label></li>
	                        <li class="answerList"><label><button onclick="setVal(5,2,2,this)">2</button> 서비스 이용 편의성 확대 및 절차 간소화</label></li> 
	                        <li class="answerList"><label><button onclick="setVal(5,3,3,this)">3</button> 통계 수록자료 및 제공범위 확대</label></li>
	                        <li class="answerList"><label><button onclick="setVal(5,4,4,this)">4</button> 홈페이지(SGIS) 구성 및 사이트맵 개선</label></li>
	                        <li class="answerList"><label><button onclick="setVal(5,5,5,this)">5</button> 다양한 서비스 개발</label></li>
	                        <li class="answerList"><label><button onclick="setVal(5,6,6,this)">6</button> 공간분석 및 시각화 기능 강화</label></li>
	                        <li class="answerList"><label><button onclick="setVal(5,7,7,this)">7</button> 개발자 지원기능 강화</label></li>
	                        <li class="answerList"><label><button onclick="setVal(5,8,8,this)">8</button><span onclick="setEtcVal(5,8,8,this);">기타</span><input type="text" id="etc5" maxlength="100"/></label></li>
	                    </ul> 
                    </div>
                </li>   
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">6.</span>
                        귀하는 앞으로도 통계지리정보서비스(SGIS)를 계속 이용하시겠습니까?
                    </div>
					<div id="srv6">					
	                    <ul class="row">
	                        <li class="answerList"><label><button onclick="setVal(6,1,1,this)">1</button> 꼭 이용할 것</label></li>
	                        <li class="answerList"><label><button onclick="setVal(6,2,2,this)">2</button> 이용할 생각이 조금 있음</label></li>
	                        <li class="answerList"><label><button onclick="setVal(6,3,3,this)">3</button> 별로 이용할 생각없음</label></li>
	                        <li class="answerList"><label><button onclick="setVal(6,4,4,this)">4</button> 전혀 이용할 생각없음</label></li>
	                    </ul>
                    </div>
                </li>
                <li class="quizList">
                   <div class="quiz">
                        <span class="no">7.</span>
                        SGIS 홈페이지의 서비스 향상을 위해 개선의견, 바라는 점 등을 자유롭게 제안하여 주시기 바랍니다.
                    </div>
					<div id="srv7">
						<textarea id="srv7text" cols="30" rows="5" maxlength="2000"></textarea>
                    </div>
                </li>                
                <li class="quizList">
                   <div class="quiz">
						<div class="content-1">
							<p>개인정보 수집항목(성명, 휴대전화번호)은 <br/>
							추첨을 통한 상품권 지급 및 분석 목적으로만 사용되며,<br/>
							경품 지급 후 파기됩니다. 개인정보 수집에 동의하지 않으시면 <br/>
							설문에 참여하실 수 없습니다.</p>
							<div  style="width:100%; height:30px;">
								<ul class="squre-type1" style="margin-left: 160px; align:center;">
									<li onclick="fnAgree('Y');"><input type="radio" name="agreement" value="Y" />동의</li>
									<li onclick="fnAgree('N');"><input type="radio" name="agreement" value="N" checked="checked"/>비동의</li>
								</ul>
							</div>
						</div>		
					</div>
                </li>
                   
                <li class="quizList"  id="info-1" >
                   <div class="quiz">
                        <span class="no">☆</span>
                        아래의 정보는 경품지급 및 결과분석 목적으로만 활용합니다. 
                    </div>  
                    <table>
                          <colgroup>
                              <col style="width: 96px"/>
                              <col style="width: 484px"/>
                          </colgroup>
                          <tbody>
                              <tr>
                                  <th>핸드폰 번호</th>
                                  <td><input type="text" id="tel_no" maxlength="11" onkeydown="onlyNumber(this);" class=""/></td>
                              </tr>
                              <tr>
                                  <th>성명</th>
                                  <td><input type="text" id="name" maxlength="10" class=""/></td>
                              </tr>
                              <tr>
                                  <th>성별</th>
                                  <td>
									<div id="srv9">	
				 						<ul class="row">
											<li class="answerList"><label><button onclick="setVal(9,1,1)">1</button><span>남자</span></label></li>
											<li class="answerList"><label><button onclick="setVal(9,2,2)">2</button><span>여자</span></label></li>
										</ul>
									</div>         
                                  </td>
                              </tr>
                              <tr>
                                  <th>연령</th>
                                  <td>
			 						<div id="srv10">
				 						<ul class="row">
											<li  class="answerList"><label><button onclick="setVal(10,1,1)">1</button><span>19세 이하</span></li>
											<li  class="answerList"><label><button onclick="setVal(10,2,2)">2</button><span>20~29세</span></li>
											<li  class="answerList"><label><button onclick="setVal(10,3,3)">3</button><span>30~39세</span></li>
											<li  class="answerList"><label><button onclick="setVal(10,4,4)">4</button><span>40~49세</span></li>
											<li  class="answerList"><label><button onclick="setVal(10,5,5)">5</button><span>50~59세</span></li>
											<li  class="answerList"><label><button onclick="setVal(10,6,6)">6</button><span>60세 이상</span></li>
										</ul>
									</div>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                </li>
                <li class="quizBtn"> 
                   <div class="quiz">
                        <span class="no">※</span>
                        설문에 참여해 주셔서 감사합니다. 앞으로도 SGIS 많은 이용 부탁드립니다.
                   </div>		
                   
					<div class="quiz" style="top:420px;">
						<a onclick="surveyEnter();" class="btnType01">제출하기</a>
						<a onclick="surveyCansle();" class="btnType02">취소</a>
					</div>
					
                </li> 
            </ul>
        </div>
		<%
			}
		%>       
    </div>
</body></html>
