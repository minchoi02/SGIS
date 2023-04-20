<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>
<%
	String bDate = "20211014"; //2021.10.14(목)~10.28(목), 15일간

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
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes">

	<script type='text/javascript' src='/js/plugins/jquery-1.11.1.min.js'></script>
	<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery-ui-1.10.3.custom.js'></script>

	<script src='/js/plugins/durian-v2.0.js'></script>
	<script src='/js/common/sop.portal.absAPI.js'></script>
	<script type='text/javascript' src='/js/plugins/jquery.sha256.js'></script>

    <title>SGIS 통계지리정보서비스</title>
    <link rel="stylesheet" href="./css/common.css">
    <script src="/js/plugins/jquery.min.js"></script>
    <script src="./js/common.js"></script>

    <script type="text/javascript">    
     	var contextPath = "";
		var limit_cnt = 3; //중복 선택시, 최대 선택 가능한 수
  
		$(document).ready(function(){
			
//	         ● 설문조사
	         srvLogWrite( "A0", "15", "11", "00", "설문조사 view", "2021년 SGIS 설문조사 View" );
	         apiLogWrite2('R0', 'R11',            "설문조사 view", "2021년 SGIS 설문조사 View",  '00', '없음');

//	     	   ● OX퀴즈 이벤트
//	         srvLogWrite( "A0", "15", "13", "00", "OX퀴즈 이벤트 view", "2021년 SGIS OX퀴즈 이벤트 View" );
//	         apiLogWrite2('R0', 'R13',            "OX퀴즈 이벤트 view", "2021년 SGIS OX퀴즈 이벤트 View",  '00', '없음');

//	         ● 기타 이벤트
//	         srvLogWrite( "A0", "15", "15", "00", "기타 이벤트 view", "2021년 SGIS 기타 이벤트 View" );
//	         apiLogWrite2('R0', 'R15',            "기타 이벤트 view", "2021년 SGIS 기타 이벤트 View",  '00', '없음');


			$('input').focusin(function(){
				if( this.id == "etc3" || this.id == "etc7" ){//(중복응답 가능)
					if( !(limit_cnt <  $( "#srv3" ).find("button.select").length + 1 || limit_cnt <  $( "#srv7" ).find("button.select").length + 1)) { //(limit_cnt보다 큼) '기타' 선택시 동작없음
						$(this).closest("p").find("button").attr("class","num etc select");
					}
				
				} else if (this.id == "etc6") {
					$(this).closest(".answer_wrap").find("button").removeClass("select");
					$(this).closest(".answer_wrap").find("button").eq(4).attr("class","num etc select");
					 
				} else {   
					$(this).closest("p").find("button").removeClass("select");
					$(this).closest("p").find("button").attr("class","num etc select");
				} 
			});  
   
			apiLogWrite3("R05","2021년 설문조사 view");
  
		});

	    function fnOnLoad(){
			var offset = $("#survey_content").offset();
			if( offset ){
				$("html, body").animate({scrollTop : offset.top }, 200);
			} 
	    }
		function fnAgree(val){
			$("input:radio[name=agreement]:input[value=" +val+"]").prop("checked", true);

			if(val == "Y"){
				$("#ment").css("display","").show();
				$(".btn_wrap").css("display","").show();
			} else {
				$("#ment").css("display","none").hide();
				$(".btn_wrap").css("display","none").hide();
			}
		} 

		function setVal( qNum, val, aNum, obj ){
			this.event.preventDefault(); //이벤트 전파 중지

		    //번호를 선택하면 기존 입력을 초기화v
			if( obj && $(obj).closest(".answer_wrap").find("input") && $(obj).closest(".answer_wrap").find("input").val() != "" ){
				$(obj).closest(".answer_wrap").find("input").val("");
			}

			if( qNum == '3' || qNum == '7' ){ //중복선택 
				if( $("#srv"+qNum+" button").eq(aNum-1).hasClass('select') ){
					$("#srv"+qNum+" button").eq(aNum-1).removeClass('select');
					if (qNum == '3' && val == '20'){ $("#etc3").val(""); }//'기타' 취소
					if (qNum == '7' && val == '8' ){ $("#etc7").val(""); }
				} else {
					if(chkLimit(qNum, limit_cnt)) { //선택 갯수 제한	
						alert(limit_cnt+"개 문항까지 중복응답 가능합니다.");
					} else {				
						$("#srv"+qNum+" button").eq(aNum-1).addClass('select');  
					} 
				}	
			} else if( qNum == "41" || qNum == "42" || qNum == "43" || qNum == "51" || qNum == "52" || qNum == "53"){ // 단일선택 및 삭제 가능
				if( $("#srv"+qNum+" button").eq(aNum-1).hasClass('select') ){
					$("#srv"+qNum+" button").eq(aNum-1).removeClass('select');
				} else {
					$("#srv"+qNum+" button").removeClass('select'); 
					$("#srv"+qNum+" button").eq(aNum-1).addClass('select');
				}
			} else if (qNum == "6" ){ 
				if( $("#srv"+qNum+" button").eq(aNum-1).hasClass('select') ){
					$("#srv"+qNum+" button").eq(aNum-1).removeClass('select');
					if (val == '5'){ $("#etc6").val(""); }//'기타' 취소
				} else {
					$("#srv"+qNum+" button").removeClass('select'); 
					$("#srv"+qNum+" button").eq(aNum-1).addClass('select');  
				}	
			} else { // 단일선택만 가능
				if( qNum == "6" && val != 5 ) $("#etc6").val(""); 
				$("#srv"+qNum+" button").removeClass('select');
				$("#srv"+qNum+" button").eq(aNum-1).addClass('select');
			}
		}

		function surveyEnter(){
			if(confirm("제출하시겠습니까?") == true){
				var params = {};
				params.survay1 = $("#srv1  button.select").text(); if( !isValid("1"  ,params.survay1) ) return false;

				params.survay2 = $("#srv21 button.select").text(); if( !isValid("2-1",params.survay2) ) return false;
				params.survay3 = $("#srv22 button.select").text(); if( !isValid("2-2",params.survay3) ) return false;
				params.survay4 = $("#srv23 button.select").text(); if( !isValid("2-3",params.survay4) ) return false;
				params.survay5 = $("#srv24 button.select").text(); if( !isValid("2-4",params.survay5) ) return false;


				params.survay6 = dupText( $("#srv3") ); if( !isValid("3",params.survay6) ) return false;
				if( $("#etc3").val() ) params.etc1 = $("#etc3").val();	// '기타' 선택시, 값입력 체크

				if( $("#srv41 button.select").text() != "" || $("#srv42 button.select").text() != "" || $("#srv43 button.select").text() != "" ){
					params.survay7 = $("#srv41 button.select").text(); if( !isValid("4-1",params.survay7) ) return false;
					params.survay8 = $("#srv42 button.select").text(); if( !isValid("4-2",params.survay8) ) return false;
					params.survay9 = $("#srv43 button.select").text(); if( !isValid("4-3",params.survay9) ) return false;
				}

				if( $("#srv51 button.select").text() != "" || $("#srv52 button.select").text() != "" || $("#srv53 button.select").text() != "" ){
					params.survay10 = $("#srv51 button.select").text(); if( !isValid("5-1",params.survay10) ) return false;
					params.survay11 = $("#srv52 button.select").text(); if( !isValid("5-2",params.survay11) ) return false;
					params.survay12 = $("#srv53 button.select").text(); if( !isValid("5-3",params.survay12) ) return false;
				}

				if( params.survay1 == "2" || params.survay1 == "1" ) { //SGIS 서비스에 만족하지 못할 경우
					params.survay13 = $("#srv6  button.select").text(); if( !isValid("6"  ,params.survay13) ) return false;
				}
				if( $("#etc6").val() ) params.etc2 = $("#etc6").val();

				params.survay14 = dupText( $("#srv7") ); if( !isValid("7",params.survay14) ) return false;
				if( $("#etc7").val() ) params.etc3 = $("#etc7").val();


				if( $("#srv8").val() ) params.etc4 = $("#srv8").val();


				if($("#tel_no").val()==""){
					alert("핸드폰 번호를 입력해주세요");
					$("#tel_no").focus();
					return false;
				}
				params.tel_no = $("#tel_no").val();

				if($("#name").val()==""){
					alert("성명을 입력해주세요");
					$("#name").focus();
					return false;
				}
				params.name = $("#name").val();

				params.sex = $("#srv9 button.select").text(); if( !params.sex ){ alert("성별을 선택해주세요."); return false; }
				params.sex = (params.sex=="1" ? "M" : "F");


				params.survay15 = $("#srv10 button.select").text(); if( !params.survay15 ){ alert("연령을 선택해주세요."); return false; }


				//Q0, R06 로그 등록??
				$.ajax({
			 		type:"POST",
			 		url: "/ServiceAPI/quiz/survey.json",
			 		data: params,
			 		success:function(data){
			 			if(data.result.resultCnt > 0){
		 					alert("수정되었습니다.");
			 			} else {
//	                        ● 설문조사
                           srvLogWrite( "A0", "15", "12", "00", "설문조사 등록 및 수정", "2021년 SGIS 설문조사 등록 및 수정" );
                           apiLogWrite2('R0', 'R12',            "설문조사 등록 및 수정", "2021년 SGIS 설문조사 등록 및 수정",  '00', '없음' );

//                            ● OX퀴즈 이벤트
//                            srvLogWrite( "A0", "15", "14", "00", "OX퀴즈 이벤트 등록 및 수정", "2021년 SGIS OX퀴즈 이벤트 등록 및 수정" );
//                            apiLogWrite2('R0', 'R14',            "OX퀴즈 이벤트 등록 및 수정", "2021년 SGIS OX퀴즈 이벤트 등록 및 수정",  '00', '없음' );

//                            ● 기타 이벤트
//                            srvLogWrite( "A0", "15", "16", "00", "기타 이벤트 등록 및 수정", "2021년 SGIS 기타 이벤트 등록 및 수정" );
//                            apiLogWrite2('R0', 'R16',            "기타 이벤트 등록 및 수정", "2021년 SGIS 기타 이벤트 등록 및 수정",  '00', '없음' );

							alert("등록되었습니다.");
			 				self.close();
	 					}
		 			},
			 		error:function(data){
			 			console.log(data);
			 		}
		 		});
			} else {
				return;
			}
		}
		function etcNullCheck(num,txt){
			if($("#srv"+num+" button.num.etc").hasClass("select") && $("input#etc"+num+".etcInput").val() == "") {
				alert("["+txt+"] 기타 내용을 입력해주세요.");
				$("input#etc"+num+".etcInput").focus();
				return false;
			}  else {
				return true;
			}
		}

		function isValid( num, val ){
			if( val == "" || !val ){
				alert( num + "번 문항을 선택해주세요.");
				num = num.replace("-","");
				$(document).scrollTop( $("#srv"+num).position().top - 50 );

				return false;
			} else {
				return true;
			}
		}

		function dupText( button ){
			var text = '';
			$.each( $( button ).find("button.select"), function( i , item ){
				text += (i==0?"":",")+"|"+$( item ).text()+"|";
			});
			return text;
		}

 
		function chkLimit( qNum , limit_cnt){  
			if(limit_cnt <  $( "#srv"+qNum ).find("button.select").length + 1) {
				return true;
			}else {
				return false;
			}  
		}

		function onlyNumber(obj){
			$(obj).keyup(function(){
				$(this).val($(this).val().replace(/[^0-9]/g,""));
			});
		} 

		function surveyCancel(){
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

        /** Log 추가 이금은 2020.01.07 start**/
        function srvLogWrite(fClass1Cd, fClass2Cd, fClass3Cd, fClass4Cd, detCd, param) {
            var srvParam = { fClass1Cd: fClass1Cd, fClass2Cd: fClass2Cd, fClass3Cd: fClass3Cd, fClass4Cd: fClass4Cd};

            if((detCd != null && detCd != '') && (param != null && param != '')){
                srvParam = { fClass1Cd: fClass1Cd, fClass2Cd: fClass2Cd, fClass3Cd: fClass3Cd, fClass4Cd: fClass4Cd, detCd: detCd, param: param };
            } else if (detCd != null && detCd != ''){
                srvParam = { fClass1Cd: fClass1Cd, fClass2Cd: fClass2Cd, fClass3Cd: fClass3Cd, fClass4Cd: fClass4Cd, detCd: detCd };
            } else if (param != null && param != ''){
                srvParam = { fClass1Cd: fClass1Cd, fClass2Cd: fClass2Cd, fClass3Cd: fClass3Cd, fClass4Cd: fClass4Cd, param: param };
            }

            jQuery.ajax({
                type:"POST",
                url: "/ServiceAPI/common/SRVLogWrite.json",
                data: srvParam,
                dataType:"json",
                async: true,
                success:function(data){
                },
                error:function(data) {
                }
            });
        }

        function apiLogWrite2(type, api_id, title, parameter, zoomLevel, adm_nm) {
            var srvParam = { type: type, api_id: api_id, title: title, parameter: parameter, zoomLevel: zoomLevel, adm_nm: adm_nm};

            jQuery.ajax({
                type:"POST",
                url: "/ServiceAPI/common/APILogWrite.json",
                data: srvParam,
                dataType:"json",
                async: true,
                success:function(data){
                },
                error:function(data) {
                }
            });
		}
        /** Log 추가 이금은 2020.01.07 end**/
	</script>

</head>

<body onload="fnOnLoad();">
    <div class="wrap_all">
		<div align="center">
			<img src="./img/notice.jpg" style="margin-bottom:20px;">
		</div>

		<%
// 		System.out.println("idx === " + idx );
		if( idx < 1 || idx > 15 ){
		%>
			<script type="text/javascript">
				alert("이벤트 기간이 아닙니다.");
// 				window.close();
			</script>
		<%
		} else {
		%>

      <div id="survey_content" class="tit"></div>
      <img src="./img/header_banner.jpg" alt="">
	  <div class="wrap">
	    <div class="survey_wrap">
	      <section class="sec01">
	        <h3>1. 귀하께서는 SGIS 서비스에 대해 전반적으로 만족하십니까?</h3>
	        <table>
	          <thead>
	            <tr>
	              <th>매우 만족한다</th>
	              <th>만족하는 편이다</th>
	              <th>보통이다</th>
	              <th>만족하지 않는 편이다</th>
	              <th>전혀 만족하지 않는다</th>
	            </tr>
	          </thead>
	          <tbody>
				<tr id="srv1" class="answer_wrap">
				  <td><p class="answer"><label><button class="num" onclick="setVal(1,5,1)">5</button></label></td>
				  <td><p class="answer"><label><button class="num" onclick="setVal(1,4,2)">4</button></label></td>
				  <td><p class="answer"><label><button class="num" onclick="setVal(1,3,3)">3</button></label></td>
				  <td><p class="answer"><label><button class="num" onclick="setVal(1,2,4)">2</button></label></td>
				  <td><p class="answer"><label><button class="num" onclick="setVal(1,1,5)">1</button></label></td>
				</tr>
			  </tbody>
			</table>
	      </section>
	      <section>
            <h3>2. SGIS 서비스 만족도를 평가항목별로 말씀해 주십시오.<span>다음 각 항목별로 ‘매우 그렇다’는 5점, ‘그런 편이다’는 4점, ‘보통이다’는 3점, ‘그렇지 않은 편이다’는 2점, ‘전혀 그렇지 않다’는 1점으로 말씀해 주십시오.</span></h3>
	        <table>
	          <thead>
	            <tr>
	              <th>만족도 평가 항목</th>
	              <th>매우 그렇다</th>
	              <th>그런 편이다</th>
	              <th>보통이다</th>
	              <th>그렇지 않은 편이다</th>
	              <th>전혀 그렇지 않다</th>
	            </tr>
	          </thead>
	          <tbody>
	            <tr id="srv21" class="answer_wrap">
	              <td>2-1. 지도와 통계가 융합되어 통계 이해에 도움이 된다.</td>
	              <td><p class="answer"><button class="num" onclick="setVal(21,5,1)">5</button></td>
	              <td><p class="answer"><button class="num" onclick="setVal(21,4,2)">4</button></td>
	              <td><p class="answer"><button class="num" onclick="setVal(21,3,3)">3</button></td>
	              <td><p class="answer"><button class="num" onclick="setVal(21,2,4)">2</button></td>
	              <td><p class="answer"><button class="num" onclick="setVal(21,1,5)">1</button></td>
	            </tr>
	            <tr id="srv22" class="answer_wrap">
	              <td>2-2. 이용 화면 디자인과 구성이 적절하다.</td>
	              <td><p class="answer"><button class="num" onclick="setVal(22,5,1)">5</button></td>
	              <td><p class="answer"><button class="num" onclick="setVal(22,4,2)">4</button></td>
	              <td><p class="answer"><button class="num" onclick="setVal(22,3,3)">3</button></td>
	              <td><p class="answer"><button class="num" onclick="setVal(22,2,4)">2</button></td>
	              <td><p class="answer"><button class="num" onclick="setVal(22,1,5)">1</button></td>
	            </tr>
	            <tr id="srv23" class="answer_wrap">
	              <td>2-3. 서비스 내용이 업무 등에 도움이 된다.</td>
	              <td><p class="answer"><button class="num" onclick="setVal(23,5,1)">5</button></td>
	              <td><p class="answer"><button class="num" onclick="setVal(23,4,2)">4</button></td>
	              <td><p class="answer"><button class="num" onclick="setVal(23,3,3)">3</button></td>
	              <td><p class="answer"><button class="num" onclick="setVal(23,2,4)">2</button></td>
	              <td><p class="answer"><button class="num" onclick="setVal(23,1,5)">1</button></td>
	            </tr>
	            <tr id="srv24" class="answer_wrap">
	              <td>2-4. 제공하는 콘텐츠가 다양하다.</td>
	              <td><p class="answer"><button class="num" onclick="setVal(24,5,1)">5</buttonn></td>
	              <td><p class="answer"><button class="num" onclick="setVal(24,4,2)">4</buttonn></td>
	              <td><p class="answer"><button class="num" onclick="setVal(24,3,3)">3</buttonn></td>
	              <td><p class="answer"><button class="num" onclick="setVal(24,2,4)">2</buttonn></td>
	              <td><p class="answer"><button class="num" onclick="setVal(24,1,5)">1</buttonn></td>
	            </tr>
	          </tbody>
	        </table>
	      </section>
	      <section>
	        <h3>3. SGIS 서비스 중 만족도가 가장 높은 콘텐츠는 무엇입니까? <span class="no_block">(3개 문항까지 중복응답 가능)</span></h3>
	        <div id="srv3" class="answer_wrap chk_wrap">
	          <form class="">
	            <p class="answer"><label><button class="num" onclick="setVal(3,1,1)"  >1</button>통계주제도</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,2,2)"  >2</button>대화형 통계지도</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,3,3)"  >3</button>생활권역 통계지도</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,4,4)"  >4</button>My통계로</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,5,5)"  >5</button>일자리맵</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,6,6)"  >6</button>정책통계지도</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,7,7)"  >7</button>살고싶은 우리동네</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,8,8)"  >8</button>업종통계지도</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,9,9)"  >9</button>지역현안소통지도</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,10,10)">10</button>통계지도체험</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,11,11)">11</button>총조사 시각화 지도</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,12,12)">12</button>월간통계</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,13,13)">13</button>인구피라미드</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,14,14)">14</button>고령화 현황보기</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,15,15)">15</button>성씨분포</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,16,16)">16</button>지방의 변화보기</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,17,17)">17</button>자료제공</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,18,18)">18</button>개발지원센터</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,19,19)">19</button>SGIS에듀</label></p>
	            <p class="answer"><label><button class="num" onclick="setVal(3,20,20)">20</button>기타 </label><input type="text" id="etc3" class="etcInput" maxlength="100"></p>
	          </form>
	        </div>
	      </section>
	      <section>
	        <h3>4. 2021년 3월부터 서비스 중인 ‘생활권역 통계지도’에 대해 말씀해 주십시오.</h3>
	        <p class="notice">☞ ‘생활권역 통계지도’ 서비스를 이용한 적이 없는 경우 5번 문항으로 이동</p>
	        <table>
	          <thead>
	            <tr>
	              <th>만족도 평가 항목</th>
	              <th>매우 그렇다</th>
	              <th>그런 편이다</th>
	              <th>보통이다</th>
	              <th>그렇지 않은 편이다</th>
	              <th>전혀 그렇지 않다</th>
	            </tr>
	          </thead>
	          <tbody>
				<tr id="srv41" class="answer_wrap">
				  <td>4-1. 이용 화면 디자인과 구성이 적절하다.</td>
				      <td><p class="answer"><button class="num" onclick="setVal(41,5,1)">5</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(41,4,2)">4</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(41,3,3)">3</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(41,2,4)">2</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(41,1,5)">1</button></p></td>
				</tr>
				<tr id="srv42" class="answer_wrap">
				  <td>4-2. 서비스 이용이 편리하다.</td>
				      <td><p class="answer"><button class="num" onclick="setVal(42,5,1)">5</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(42,4,2)">4</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(42,3,3)">3</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(42,2,4)">2</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(42,1,5)">1</button></p></td>
				</tr>
				<tr id="srv43" class="answer_wrap">
				  <td>4-3. 서비스 내용이 국민에게 도움이 된다.</td>
				      <td><p class="answer"><button class="num" onclick="setVal(43,5,1)">5</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(43,4,2)">4</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(43,3,3)">3</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(43,2,4)">2</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(43,1,5)">1</button></p></td>
				</tr>
	          </tbody>
	        </table>
	      </section>
	      <section>
	        <h3>5. 2021년 3월부터 서비스 중인 ‘총조사 시각화 지도’ 서비스에 대해 말씀해 주십시오.</h3>
	        <p class="notice">☞ ‘총조사 시각화 지도’ 서비스를 이용한 적이 없는 경우 6번 문항으로 이동</p>
	        <table>
	          <thead>
	            <tr>
	              <th>만족도 평가 항목</th>
	              <th>매우 그렇다</th>
	              <th>그런 편이다</th>
	              <th>보통이다</th>
	              <th>그렇지 않은 편이다</th>
	              <th>전혀 그렇지 않다</th>
	            </tr>
	          </thead>
	          <tbody>
				<tr id="srv51" class="answer_wrap">
				  <td>5-1. 이용 화면 디자인과 구성이 적절하다.</td>
				      <td><p class="answer"><button class="num" onclick="setVal(51,5,1)">5</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(51,4,2)">4</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(51,3,3)">3</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(51,2,4)">2</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(51,1,5)">1</button></p></td>
				</tr>
				<tr id="srv52" class="answer_wrap">
				  <td>5-2. 서비스 이용이 편리하다.</td>
				      <td><p class="answer"><button class="num" onclick="setVal(52,5,1)">5</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(52,4,2)">4</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(52,3,3)">3</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(52,2,4)">2</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(52,1,5)">1</button></p></td>
				</tr>
				<tr id="srv53" class="answer_wrap">
				  <td>5-3. 서비스 내용이 국민에게 도움이 된다.</td>
				      <td><p class="answer"><button class="num" onclick="setVal(53,5,1)">5</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(53,4,2)">4</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(53,3,3)">3</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(53,2,4)">2</button></p></td>
				      <td><p class="answer"><button class="num" onclick="setVal(53,1,5)">1</button></p></td>
				</tr>
	          </tbody>
	        </table>
	      </section>
	      <section id="srv6" class="answer_wrap sec01">
	        <h3>6. SGIS 서비스에 ‘만족하지 않는다’면 그 이유는 무엇입니까?</h3>
                <p class="answer"><label><button class="num" onclick="setVal(6,1,1)">1</button>수록 통계자료가 다양하지 않음</label></p>
                <p class="answer"><label><button class="num" onclick="setVal(6,2,2)">2</button>이용절차 복잡</label></p>
                <p class="answer"><label><button class="num" onclick="setVal(6,3,3)">3</button>이용방법에 대한 설명 부족</label></p>
                <p class="answer"><label><button class="num" onclick="setVal(6,4,4)">4</button>홈페이지 디자인이나 구성 불만족</label></p>
                <p class="answer"><label><button class="num" onclick="setVal(6,5,5)">5</button>기타&nbsp;</label><input type="text" id="etc6" class="etcInput" maxlength="100"></p>
	      </section>

	      <section id="srv7" class="answer_wrap">
	        <h3>7. SGIS 서비스에서 개선할 부문은 무엇이라고 생각하십니까? <span class="no_block">(3개 문항까지 중복응답 가능)</span></h3>
	        <form class="check_limit2">
				<p class="answer"><label><button class="num" onclick="setVal(7,1,1)">1</button>다양한 방법으로 지속적인 홍보</label></p>
				<p class="answer"><label><button class="num" onclick="setVal(7,2,2)">2</button>서비스 이용 편의성 확대 및 절차 간소화</label></p>
				<p class="answer"><label><button class="num" onclick="setVal(7,3,3)">3</button>통계 수록자료 및 제공범위 확대</label></p>
				<p class="answer"><label><button class="num" onclick="setVal(7,4,4)">4</button>홈페이지(SGIS) 구성 및 사이트맵 개선</label></p>
				<p class="answer"><label><button class="num" onclick="setVal(7,5,5)">5</button>다양한 서비스 개발</label></p>
				<p class="answer"><label><button class="num" onclick="setVal(7,6,6)">6</button>공간분석 및 시각화 기능 강화</label></p>
				<p class="answer"><label><button class="num" onclick="setVal(7,7,7)">7</button>개발자 지원기능 강화</label></p>
				<p class="answer"><label><button class="num" onclick="setVal(7,8,8)">8</button>기타&nbsp;</label><input type="text" id="etc7" class="etcInput" maxlength="100"></p>
	        </form>
	      </section>
	      <section>
	        <h3>8. SGIS 서비스에 대한 개선의견 등을 자유롭게 적어 주시기 바랍니다.</h3>
               <textarea id="srv8" rows="8" cols="70"></textarea>
	      </section>

	    </div>

		    <section class="done">
		      <h4>아래 사항은 조사결과 분석 및 추첨을 통한<br>상품권 지급 목적으로만 활용됩니다.</h4>
		      	<div class="agree_wrap">
	                <p class="agree_txt">개인정보 수집항목(성명, 휴대전화번호)은 추첨을 통한 상품권 지급 및 분석 목적으로만 사용되며, 경품 지급 후 파기됩니다. 개인정보 수집에 동의하지 않으시면 설문에 참여하실 수 없습니다.</p>
	                <div class="agree_chk_wrap">
	                    <label><input type="radio" name="agree" onclick="fnAgree('Y');" value="Y" id="agree">동의</label>&nbsp;&nbsp;
	                    <label><input type="radio" name="agree" onclick="fnAgree('N');" value="N" id="disagree" checked="checked" style="margin-left:10px;"><label for="disagree">비동의</label>
	                </div>
	            </div>
		        <table>
		          <tbody>
		            <tr>
		              <th>핸드폰 번호</th>
		              <td><input type="text" id="tel_no" maxlength="11" onkeydown="onlyNumber(this);" placeholder="' - ' 없이 숫자만 입력"></td>
		            </tr>
		            <tr>
		              <th>성명</th>
		              <td><input type="text" id="name" maxlength="10" placeholder="홍길동"> </td>
		            </tr>
		            <tr>
		              <th>성별</th>
		              <td>
		                <div id="srv9" class="answer_wrap">
		                  <p class="answer"><label><button class="num" onclick="setVal(9,1,1)">1</button>남자</label></p>
		                  <p class="answer"><label><button class="num" onclick="setVal(9,2,2)">2</button>여자</label></p>
		                </div>
		              </td>
		            </tr>
		            <tr>
		              <th>연령</th>
		              <td>
		                <div id="srv10" class="answer_wrap">
		                  <p class="answer"><label><button class="num" onclick="setVal(10,1,1)">1</button>19세 이하</label></p>
		                  <p class="answer"><label><button class="num" onclick="setVal(10,2,2)">2</button>20~29세 </label></p>
		                  <p class="answer"><label><button class="num" onclick="setVal(10,3,3)">3</button>30~39세 </label></p>
		                  <p class="answer"><label><button class="num" onclick="setVal(10,4,4)">4</button>40~49세 </label></p>
		                  <p class="answer"><label><button class="num" onclick="setVal(10,5,5)">5</button>50~59세 </label></p>
		                  <p class="answer"><label><button class="num" onclick="setVal(10,6,6)">6</button>60세 이상</label></p>
		                </div>
		              </td>
		            </tr>
		          </tbody>
		        </table>

                <p id="ment" style="display:none;">* 설문에 응답해 주셔서 대단히 감사합니다.</p>
                <div class="btn_wrap" style="display:none;">
        			<button type="button" onclick="surveyEnter();"  class="btn_submit">제출하기</button>
        			<button type="button" onclick="surveyCancel();" class="btn_cancel">취소</button>
                </div>
		      </section>

	    </div>

		<%
			}
		%>
    </div>
</body>
</html>
