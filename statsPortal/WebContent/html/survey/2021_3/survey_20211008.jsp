<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>
<%
	String userAgent = request.getHeader("User-Agent");
	String[] mobileOs = {"iPhone","iPod","BlackBerry","Android","Windows CE", "Nokia", "LG", "MOT", "SAMSUNG", "SonyEricsson", "Webos",
				"Mobile", "Symbian", "Opera Mobi", "Opera Mini", "IEmobile"};

	String param = request.getParameter("param");
	if(param == null || !param.equals("0")){
		int j = -1;
		if(userAgent != null && !userAgent.equals("")){
			for(int i = 0; i < mobileOs.length; i++){
				j = userAgent.indexOf(mobileOs[i]);
				if(j > -1 ){
					out.println("");
					out.println("");
					out.println("<script>");
					out.println("location.href='/html/survey/2021_3/m/indexMobile.html';");
					out.println("</script>");
					out.println("");
					out.println("");
					break;
				}
			}
		}
	}
%>
<%
	String bDate = "20211005"; //2021.10.14(목)~10.28(목), 15일간

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
		var wsize = 740;
     	var hsize = 3227;
     	var contextPath = "";

     	document.onreadystatechange=resizeFrame;
     	function resizeFrame(){
	    	 try{
	    		 self.resizeTo(wsize, hsize);
	    	 }catch(e){
    	 	}
	   	}

		$(document).ready(function(){
// 			if(navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad|)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
// 				console.log('========= mobile');
// 				debugger;
// 				location.href = '/html/survey/2021_3/m/indexMobile.html';
// 			}

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
				if( !(this.id == "etc3" || this.id == "etc7") ){//(중복응답 가능)
					$(this).closest("div").find("button").removeClass("select");
				}
				$(this).closest("p").find("button").attr("class","num etc select");
			});

			apiLogWrite3("R05","2021년 설문조사 view");

			var offset = $("#survey_content").offset();
			if( offset ){
				$("html, body").animate({scrollTop : offset.top }, 200);
			}
		});

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

		function setEtcVal( qNum, val, aNum, obj ){
			this.event.preventDefault(); //이벤트 전파 중지

			if($(obj).closest("label").find("button").hasClass('select')){
				if( obj && $(obj).closest(".answerList").find("input") && $(obj).closest(".answerList").find("input").val() != "" ){
					$(obj).closest(".answerList").find("input").val("");
				}
				$(obj).closest("label").find("button").removeClass('select');


			} else {
				$(obj).closest("label").find("button").addClass('select');

				if( qNum == "3" || qNum == "7"){ //중복 체크 가능
		 			$("#etc"+ qNum).focus();
	 			} else if( qNum == "41"){ //----------------
					$("#srv"+(qNum)+" label>button").removeClass('select');
					$("#srv"+(qNum)+" label>button").eq(aNum-1).addClass('select');

					if( !$("#srv"+(qNum)+" input") ){
						$("#srv"+(qNum)).find("input").val("");
					}
	 			}
			}
		}

		function setVal( qNum, val, aNum, obj ){
			var notItems = "";
// 			if( qNum == "1" && val == "5" ){
// 				if( $("input:radio[name=agreement]:checked").val() == "Y" ){
// 					notItems = ".nohidden";
// 				} else {
// 					notItems = ".nohidden";
// 				}
// 				$("h2, h5, .answer, .answer_wrap").not(".nohidden").css("display","none").hide();
// 				$(".agree_wrap, .user_info_wrap").hide();

// 			} else if( qNum == "1" && val != "5" ){
// 				if( $("#srv6 button.select").text() == "5" || $("#srv6 button.select").text() == "" || !$("#srv6 button.select").text()){
// 					notItems = ".srv61, .srv62";
// 				} else if( $("#srv6 button.select").text() == "1" || $("#srv6 button.select").text() == "2" ){
// 					notItems = ".srv62";
// 				} else if( $("#srv6 button.select").text() == "3" || $("#srv6 button.select").text() == "4" ){
// 					notItems = ".srv61";
// 				}

// 				if( $("input:radio[name=agreement]:checked").val() != "Y" ){
// 					notItems += ", .user_info_wrap";
// 				}

// 				$("h5, .answer, .answer_wrap").not( notItems ).css("display","").show();
// 				$(".agree_wrap, .user_info_wrap").show();
// 			}
			$(".btn_cancel").show();

			if( obj && $(obj).closest(".answer_wrap").find("input") && $(obj).closest(".answer_wrap").find("input").val() != "" ){
				$(obj).closest(".answer_wrap").find("input").val("");
			}

			if( qNum == '3' || qNum == '7' ){
				if( $( obj ).hasClass('select') ){
					$( obj ).removeClass('select');
				} else {
					$( obj ).addClass('select');
				}
			} else {
// 				if( qNum == '6' ){
// 					if( val == '1' || val == '2' ){
// 						$(".srv61").css("display","").show();
// 						$(".srv62").css("display","none").hide();
// 						$("#srv62 button").removeClass("select");
// 						$("#etc62").val("");
// 					} else if( val == '3' || val == '4' ){
// 						$(".srv62").css("display","").show();
// 						$(".srv61").css("display","none").hide();
// 						$("#srv61 button").removeClass("select");
// 						$("#etc61").val("");
// 					} else {
// 						$(".srv61, .srv62").css("display","none").hide();
// 						$("#srv61 button, #srv62 button").removeClass("select");
// 						$("#etc61, #etc62").val("");
// 					}

// 					$("#srv"+qNum+" button").removeClass('select');
// 					$("#srv"+qNum+" button").eq(aNum-1).addClass('select');
// 				} else {
					if( qNum == "3" && aNum != 20 ){ $("#etc3").val(""); }
					else if( qNum == "6" && aNum != 5 ){ $("#etc6").val(""); }

					$("#srv"+qNum+" button").removeClass('select');
					$("#srv"+qNum+" button").eq(aNum-1).addClass('select');
// 				}
			}
		}

		function surveyEnter(){
			if(confirm("제출하시겠습니까?") == true){
				var params = {};
				params.survay1 = $("#srv1  button.select").text(); if( !isValid("1"  ,params.survay1) ) return false; ;

				params.survay2 = $("#srv21 button.select").text(); if( !isValid("2-1",params.survay2) ) return false;
				params.survay3 = $("#srv22 button.select").text(); if( !isValid("2-2",params.survay3) ) return false;
				params.survay4 = $("#srv23 button.select").text(); if( !isValid("2-3",params.survay4) ) return false;
				params.survay5 = $("#srv24 button.select").text(); if( !isValid("2-4",params.survay5) ) return false;
				
				params.survay6 = $("#srv3  button.select").text(); if( !isValid("3"  ,params.survay6) ) return false;
				if( $("#etc3").val() ) params.etc3 = $("#etc3").val();	// '기타' 선택시, 값입력 체크			
				
// 				params.survay7 = $("#srv41 button.select").text(); if( !isValid("4-1",params.survay7) ) return false;
// 				params.survay8 = $("#srv42 button.select").text(); if( !isValid("4-2",params.survay8) ) return false;
// 				params.survay9 = $("#srv43 button.select").text(); if( !isValid("4-3",params.survay9) ) return false;
				
// 				params.survay10 = $("#srv51 button.select").text(); if( !isValid("5-1",params.survay10) ) return false;
// 				params.survay11 = $("#srv52 button.select").text(); if( !isValid("5-2",params.survay11) ) return false;
// 				params.survay12 = $("#srv53 button.select").text(); if( !isValid("5-3",params.survay12) ) return false;

				params.survay13 = $("#srv6  button.select").text(); if( !isValid("6"  ,params.survay13) ) return false;
				if( $("#etc6").val() ) params.etc6 = $("#etc6").val();				

				params.survay14 = $("#srv7  button.select").text(); if( !isValid("7"  ,params.survay14) ) return false;
				if( $("#etc7").val() ) params.etc7 = $("#etc7").val();				
				
				params.survay15 = dupText( $("#srv8") ); if( !isValid("8",params.survay15) ) return false;


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

				params.sex = $("#srv16 button.select").text(); if( !params.sex ){ alert("성별을 선택해주세요."); return false; }
				params.sex = (params.sex=="1" ? "M" : "F");
				
				if( $("#srv3 input").val() ) params.etc1 = $("#srv3 input").val();
				if( $("#srv6 input").val() ) params.etc2 = $("#srv6 input").val();
				if( $("#srv7 input").val() ) params.etc3 = $("#srv7 input").val();

				if( $("#srv8").val() ) params.etc4 = $("#srv8").val();
				params.etc5 = "Web";

// 				if( $("#sidoSel").val() == "" ){ alert("시도를 선택해주세요."); return false; }
// 				if( $("#sggSel").val() == "" ){ alert("시군구를 선택해주세요."); return false; }
// 				params.survay17 = $("#sidoSel option:selected").text() + " " + $("#sggSel option:selected").text(); //시도, 시군구
// 				params.survay18 = $("#sidoSel").val() + $("#sggSel").val(); //(코드값)시도, 시군구

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

<body>
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
				window.close();
			</script>
		<%
		} else 
			{
		%>

      <img src="./img/banner.jpg" alt="">
	  <div class="wrap">
	    <div class="survey_wrap">
	      <h2 class="title">Ⅰ. 통계지리정보서비스(이하 “SGIS”) 이용자 만족도</h2>
	      <section class="sec01">
	        <h3>1. 귀하께서는 SGIS 서비스에 대해 전반적으로 만족하십니까?</h3>
	        <input type="radio" id="v_sat"  name="sub01" value="v_sat" > <label for="v_sat" ><span class="num v_sat" >5</span>매우 만족한다</label>
	        <input type="radio" id="sat"    name="sub01" value="sat"   > <label for="sat"   ><span class="num sat"   >4</span>만족하는 편이다</label>
	        <input type="radio" id="nomal"  name="sub01" value="nomal" > <label for="nomal" ><span class="num nomal" >3</span>보통이다</label>
	        <input type="radio" id="n_sat"  name="sub01" value="n_sat" > <label for="n_sat" ><span class="num n_sat" >2</span>만족하지 않는 편이다</label>
	        <input type="radio" id="vn_sat" name="sub01" value="vn_sat"> <label for="vn_sat"><span class="num vn_sat">1</span>전혀 만족하지 않는다</label>
	      </section>
	      <section>
	        <h3>2. SGIS 서비스 만족도를 평가항목별로 말씀해 주십시오.</h3>
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
	            <tr>
	              <td>test</td>

					  <td><label><button class="num" onclick="setVal(1,5,1)"><span class="num sub02-1-1">5</span></button></td>
					  <td><label><button class="num" onclick="setVal(1,4,2)"><span class="num sub02-1-2">4</span></button></td>
					  <td><label><button class="num" onclick="setVal(1,3,3)"><span class="num sub02-1-3">3</span></button></td>
					  <td><label><button class="num" onclick="setVal(1,2,4)"><span class="num sub02-1-4">2</span></button></td>
					  <td><label><button class="num" onclick="setVal(1,1,5)"><span class="num sub02-1-5">1</span></button></td>	              
	            </tr>
	            <tr id='srv1'> 
	              <td>test</td>
	              <td><input type="radio" id="sub02-1-1" name="sub02-1" onclick="setVal(1,1,1)><label for="sub02-1-1"><span class="num sub02-1-1">5</span></label></td>
	              <td><input type="radio" id="sub02-1-2" name="sub02-1" onclick="setVal(1,2,2)><label for="sub02-1-2"><span class="num sub02-1-2">4</span></label></td>
	              <td><input type="radio" id="sub02-1-3" name="sub02-1" onclick="setVal(1,3,3)><label for="sub02-1-3"><span class="num sub02-1-3">3</span></label></td>
	              <td><input type="radio" id="sub02-1-4" name="sub02-1" onclick="setVal(1,4,4)><label for="sub02-1-4"><span class="num sub02-1-4">2</span></label></td>
	              <td><input type="radio" id="sub02-1-5" name="sub02-1" onclick="setVal(1,5,5)><label for="sub02-1-5"><span class="num sub02-1-5">1</span></label></td>
	            </tr>
	            <tr> 
	              <td>2-1. 지도와 통계가 융합되어 통계 이해에 도움이 된다.</td>
	              <td><input type="radio" id="sub02-1-1" name="sub02-1" value="v_sat"><label for="sub02-1-1"><span class="num sub02-1-1">5</span></label></td>
	              <td><input type="radio" id="sub02-1-2" name="sub02-1" value="sat"><label for="sub02-1-2"><span class="num sub02-1-2">4</span></label></td>
	              <td><input type="radio" id="sub02-1-3" name="sub02-1" value="nomal"><label for="sub02-1-3"><span class="num sub02-1-3">3</span></label></td>
	              <td><input type="radio" id="sub02-1-4" name="sub02-1" value="n_sat"><label for="sub02-1-4"><span class="num sub02-1-4">2</span></label></td>
	              <td><input type="radio" id="sub02-1-5" name="sub02-1" value="vn_sat"><label for="sub02-1-5"><span class="num sub02-1-5">1</span></label></td>
	            </tr>
	            <tr>
	              <td>2-2. 이용 화면 디자인과 구성이 적절하다.</td>
	              <td><input type="radio" id="sub02-2-1" name="sub02-2" value="v_sat"><label for="sub02-2-1"><span class="num sub02-2-1">5</span></label></td>
	              <td><input type="radio" id="sub02-2-2" name="sub02-2" value="sat"><label for="sub02-2-2"><span class="num sub02-2-2">4</span></label></td>
	              <td><input type="radio" id="sub02-2-3" name="sub02-2" value="nomal"><label for="sub02-2-3"><span class="num sub02-2-3">3</span></label></td>
	              <td><input type="radio" id="sub02-2-4" name="sub02-2" value="n_sat"><label for="sub02-2-4"><span class="num sub02-2-4">2</span></label></td>
	              <td><input type="radio" id="sub02-2-5" name="sub02-2" value="vn_sat"><label for="sub02-2-5"><span class="num sub02-2-5">1</span></label></td>
	            </tr>
	            <tr>
	              <td>2-3. 서비스 내용이 업무 등에 도움이 된다.</td>
	              <td><input type="radio" id="sub02-3-1" name="sub02-3" value="v_sat"><label for="sub02-3-1"><span class="num sub02-3-1">5</span></label></td>
	              <td><input type="radio" id="sub02-3-2" name="sub02-3" value="sat"><label for="sub02-3-2"><span class="num sub02-3-2">4</span></label></td>
	              <td><input type="radio" id="sub02-3-3" name="sub02-3" value="nomal"><label for="sub02-3-3"><span class="num sub02-3-3">3</span></label></td>
	              <td><input type="radio" id="sub02-3-4" name="sub02-3" value="n_sat"><label for="sub02-3-4"><span class="num sub02-3-4">2</span></label></td>
	              <td><input type="radio" id="sub02-3-5" name="sub02-3" value="vn_sat"><label for="sub02-3-5"><span class="num sub02-3-5">1</span></label></td>
	            </tr>
	            <tr>
	              <td>2-4. 제공하는 콘텐츠가 다양하다.</td>
	              <td><input type="radio" id="sub02-4-1" name="sub02-4" value="v_sat"><label for="sub02-4-1"><span class="num sub02-4-1">5</span></label></td>
	              <td><input type="radio" id="sub02-4-2" name="sub02-4" value="sat"><label for="sub02-4-2"><span class="num sub02-4-2">4</span></label></td>
	              <td><input type="radio" id="sub02-4-3" name="sub02-4" value="nomal"><label for="sub02-4-3"><span class="num sub02-4-3">3</span></label></td>
	              <td><input type="radio" id="sub02-4-4" name="sub02-4" value="n_sat"><label for="sub02-4-4"><span class="num sub02-4-4">2</span></label></td>
	              <td><input type="radio" id="sub02-4-5" name="sub02-4" value="vn_sat"><label for="sub02-4-5"><span class="num sub02-4-5">1</span></label></td>
	            </tr>
	          </tbody>
	        </table>
	      </section>
	      <section>
	        <h3>3. SGIS 서비스 중 만족도가 가장 높은 콘텐츠는 무엇입니까? <span>(3개 문항까지 중복응답 가능)</span></h3>
	        <div class="chk_wrap">
	          <form class="check_limit1">
	            <p><input type="checkbox" id="sub03-1-1" name="sub03-1" value="sub03-1-1"> <label for="sub03-1-1"><span class="num sub03-1-1">1</span>통계주제도</label></p>
	            <p><input type="checkbox" id="sub03-1-2" name="sub03-1" value="sub03-1-2"> <label for="sub03-1-2"><span class="num sub03-1-2">2</span>대화형 통계지도</label></p>
	            <p><input type="checkbox" id="sub03-1-3" name="sub03-1" value="sub03-1-3"> <label for="sub03-1-3"><span class="num sub03-1-3">3</span>생활권역 통계지도</label></p>
	            <p><input type="checkbox" id="sub03-1-4" name="sub03-1" value="sub03-1-4"> <label for="sub03-1-4"><span class="num sub03-1-4">4</span>My통계로</label></p>
	            <p><input type="checkbox" id="sub03-1-5" name="sub03-1" value="sub03-1-5"> <label for="sub03-1-5"><span class="num sub03-1-5">5</span>일자리맵</label></p>
	            <p><input type="checkbox" id="sub03-1-6" name="sub03-1" value="sub03-1-6"> <label for="sub03-1-6"><span class="num sub03-1-6">6</span>정책통계지도</label></p>
	            <p><input type="checkbox" id="sub03-1-7" name="sub03-1" value="sub03-1-7"> <label for="sub03-1-7"><span class="num sub03-1-7">7</span>살고싶은 우리동네 </label></p>
	            <p><input type="checkbox" id="sub03-1-8" name="sub03-1" value="sub03-1-8"> <label for="sub03-1-8"><span class="num sub03-1-8">8</span>업종통계지도</label></p>
	            <p><input type="checkbox" id="sub03-1-9" name="sub03-1" value="sub03-1-9"> <label for="sub03-1-9"><span class="num sub03-1-9">9</span>지역현안소통지도</label></p>
	            <p><input type="checkbox" id="sub03-1-10" name="sub03-1" value="sub03-1-10"> <label for="sub03-1-10"><span class="num sub03-1-10">10</span>통계지도체험</label></p>
	            <p><input type="checkbox" id="sub03-1-11" name="sub03-1" value="sub03-1-11"> <label for="sub03-1-11"><span class="num sub03-1-11">11</span>총조사 시각화 지도</label></p>
	            <p><input type="checkbox" id="sub03-1-12" name="sub03-1" value="sub03-1-12"> <label for="sub03-1-12"><span class="num sub03-1-12">12</span>월간통계</label></p>
	            <p><input type="checkbox" id="sub03-1-13" name="sub03-1" value="sub03-1-13"> <label for="sub03-1-13"><span class="num sub03-1-13">13</span>인구피라미드</label></p>
	            <p><input type="checkbox" id="sub03-1-14" name="sub03-1" value="sub03-1-14"> <label for="sub03-1-14"><span class="num sub03-1-14">14</span>고령화 현황보기</label></p>
	            <p><input type="checkbox" id="sub03-1-15" name="sub03-1" value="sub03-1-15"> <label for="sub03-1-15"><span class="num sub03-1-15">15</span>성씨분포</label></p>
	            <p><input type="checkbox" id="sub03-1-16" name="sub03-1" value="sub03-1-16"> <label for="sub03-1-16"><span class="num sub03-1-16">16</span>지방의 변화보기</label></p>
	            <p><input type="checkbox" id="sub03-1-17" name="sub03-1" value="sub03-1-17"> <label for="sub03-1-17"><span class="num sub03-1-17">17</span>자료제공</label></p>
	            <p><input type="checkbox" id="sub03-1-18" name="sub03-1" value="sub03-1-18"> <label for="sub03-1-18"><span class="num sub03-1-18">18</span>개발지원센터</label></p>
	            <p><input type="checkbox" id="sub03-1-19" name="sub03-1" value="sub03-1-19"> <label for="sub03-1-19"><span class="num sub03-1-19">19</span>SGIS에듀</label></p>
	            <p><input type="checkbox" id="sub03-1-20" name="sub03-1" value="sub03-1-20"> <label for="sub03-1-20" class="etc" ><span class="num sub03-1-20">20</span>기타<input type="text" name="sub03-1"></label></p>
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
	            <tr>
	              <td>4-1. 이용 화면 디자인과 구성이 적절하다.</td>
	              <td><input type="radio" id="sub04-1-1" name="sub04-1" value="v_sat"><label for="sub04-1-1"><span class="num sub04-1-1">5</span></td>
	              <td><input type="radio" id="sub04-1-2" name="sub04-1" value="sat"><label for="sub04-1-2"><span class="num sub04-1-2">4</span></td>
	              <td><input type="radio" id="sub04-1-3" name="sub04-1" value="nomal"><label for="sub04-1-3"><span class="num sub04-1-3">3</span></td>
	              <td><input type="radio" id="sub04-1-4" name="sub04-1" value="n_sat"><label for="sub04-1-4"><span class="num sub04-1-4">2</span></td>
	              <td><input type="radio" id="sub04-1-5" name="sub04-1" value="vn_sat"><label for="sub04-1-5"><span class="num sub04-1-5">1</span></td>
	            </tr>
	            <tr>
	              <td>4-2. 서비스 이용이 편리하다.</td>
	              <td><input type="radio" id="sub04-2-1" name="sub04-2" value="v_sat"><label for="sub04-2-1"><span class="num sub04-2-1">5</span></td>
	              <td><input type="radio" id="sub04-2-2" name="sub04-2" value="sat"><label for="sub04-2-2"><span class="num sub04-2-2">4</span></td>
	              <td><input type="radio" id="sub04-2-3" name="sub04-2" value="nomal"><label for="sub04-2-3"><span class="num sub04-2-3">3</span></td>
	              <td><input type="radio" id="sub04-2-4" name="sub04-2" value="n_sat"><label for="sub04-2-4"><span class="num sub04-2-4">2</span></td>
	              <td><input type="radio" id="sub04-2-5" name="sub04-2" value="vn_sat"><label for="sub04-2-5"><span class="num sub04-2-5">1</span></td>
	            </tr>
	            <tr>
	              <td>4-3. 서비스 내용이 국민에게 도움이 된다.</td>
	              <td><input type="radio" id="sub04-3-1" name="sub04-3" value="v_sat"><label for="sub04-3-1"><span class="num sub04-3-1">5</span></td>
	              <td><input type="radio" id="sub04-3-2" name="sub04-3" value="sat"><label for="sub04-3-2"><span class="num sub04-3-2">4</span></td>
	              <td><input type="radio" id="sub04-3-3" name="sub04-3" value="nomal"><label for="sub04-3-3"><span class="num sub04-3-3">3</span></td>
	              <td><input type="radio" id="sub04-3-4" name="sub04-3" value="n_sat"><label for="sub04-3-4"><span class="num sub04-3-4">2</span></td>
	              <td><input type="radio" id="sub04-3-5" name="sub04-3" value="vn_sat"><label for="sub04-3-5"><span class="num sub04-3-5">1</span></td>
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
	            <tr>
	              <td>5-1. 이용 화면 디자인과 구성이 적절하다.</td>
	              <td><input type="radio" id="sub05-1-1" name="sub05-1" value="v_sat"><label for="sub05-1-1"><span class="num sub05-1-1">5</span></td>
	              <td><input type="radio" id="sub05-1-2" name="sub05-1" value="sat"><label for="sub05-1-2"><span class="num sub05-1-2">4</span></td>
	              <td><input type="radio" id="sub05-1-3" name="sub05-1" value="nomal"><label for="sub05-1-3"><span class="num sub05-1-3">3</span></td>
	              <td><input type="radio" id="sub05-1-4" name="sub05-1" value="n_sat"><label for="sub05-1-4"><span class="num sub05-1-4">2</span></td>
	              <td><input type="radio" id="sub05-1-5" name="sub05-1" value="vn_sat"><label for="sub05-1-5"><span class="num sub05-1-5">1</span></td>
	            </tr>
	            <tr>
	              <td>5-2. 서비스 이용이 편리하다.</td>
	              <td><input type="radio" id="sub05-2-1" name="sub05-2" value="v_sat"><label for="sub05-2-1"><span class="num sub05-2-1">5</span></td>
	              <td><input type="radio" id="sub05-2-2" name="sub05-2" value="sat"><label for="sub05-2-2"><span class="num sub05-2-2">4</span></td>
	              <td><input type="radio" id="sub05-2-3" name="sub05-2" value="nomal"><label for="sub05-2-3"><span class="num sub05-2-3">3</span></td>
	              <td><input type="radio" id="sub05-2-4" name="sub05-2" value="n_sat"><label for="sub05-2-4"><span class="num sub05-2-4">2</span></td>
	              <td><input type="radio" id="sub05-2-5" name="sub05-2" value="vn_sat"><label for="sub05-2-5"><span class="num sub05-2-5">1</span></td>
	            </tr>
	            <tr>
	              <td>5-3. 서비스 내용이 국민에게 도움이 된다.</td>
	              <td><input type="radio" id="sub05-3-1" name="sub05-3" value="v_sat"><label for="sub05-3-1"><span class="num sub05-3-1">5</span></td>
	              <td><input type="radio" id="sub05-3-2" name="sub05-3" value="sat"><label for="sub05-3-2"><span class="num sub05-3-2">4</span></td>
	              <td><input type="radio" id="sub05-3-3" name="sub05-3" value="nomal"><label for="sub05-3-3"><span class="num sub05-3-3">3</span></td>
	              <td><input type="radio" id="sub05-3-4" name="sub05-3" value="n_sat"><label for="sub05-3-4"><span class="num sub05-3-4">2</span></td>
	              <td><input type="radio" id="sub05-3-5" name="sub05-3" value="vn_sat"><label for="sub05-3-5"><span class="num sub05-3-5">1</span></td>
	            </tr>
	          </tbody>
	        </table>
	      </section>
	      <section class="sec01">
	        <h3>6. SGIS 서비스에 ‘만족하지 않는다’면 그 이유는 무엇입니까?</h3>
	        <input type="radio" id="sub06-1" name="sub06" value="sub06-1"> <label for="sub06-1"><span class="num sub06-1">1</span>수록 통계자료가 다양하지 않음</label>
	        <input type="radio" id="sub06-2" name="sub06" value="sub06-2"> <label for="sub06-2"><span class="num sub06-2">2</span>이용절차 복잡</label>
	        <input type="radio" id="sub06-3" name="sub06" value="sub06-3"> <label for="sub06-3"><span class="num sub06-3">3</span>이용방법에 대한 설명 부족</label>
	        <input type="radio" id="sub06-4" name="sub06" value="sub06-4"> <label for="sub06-4"><span class="num sub06-4">4</span>홈페이지 디자인이나 구성 불만족</label>
	        <input type="radio" id="sub06-5" name="sub06" value="sub06-5"> <label for="sub06-5" class="etc"><span class="num sub06-5">5</span>기타<input type="text" name="sub06"></label>
	      </section>
	
	      <h2 class="title">Ⅱ. SGIS 서비스 개선사항</h2>
	      <section>
	        <h3>7. SGIS 서비스에서 개선할 부문은 무엇이라고 생각하십니까? <span>(3개 문항까지 중복응답 가능)</span></h3>
	        <form class="check_limit2">
	          <p><input type="checkbox" id="sub07-1" name="sub07" value="sub07-1"> <label for="sub07-1"><span class="num sub07-1">1</span>다양한 방법으로 지속적인 홍보</label></p>
	          <p><input type="checkbox" id="sub07-2" name="sub07" value="sub07-2"> <label for="sub07-2"><span class="num sub07-2">2</span>서비스 이용 편의성 확대 및 절차 간소화</label></p>
	          <p><input type="checkbox" id="sub07-3" name="sub07" value="sub07-3"> <label for="sub07-3"><span class="num sub07-3">3</span>통계 수록자료 및 제공범위 확대</label></p>
	          <p><input type="checkbox" id="sub07-4" name="sub07" value="sub07-4"> <label for="sub07-4"><span class="num sub07-4">4</span>홈페이지(SGIS) 구성 및 사이트맵 개선</label></p>
	          <p><input type="checkbox" id="sub07-5" name="sub07" value="sub07-5"> <label for="sub07-5"><span class="num sub07-5">5</span>다양한 서비스 개발</label></p>
	          <p><input type="checkbox" id="sub07-6" name="sub07" value="sub07-6"> <label for="sub07-6"><span class="num sub07-6">6</span>공간분석 및 시각화 기능 강화</label></p>
	          <p><input type="checkbox" id="sub07-7" name="sub07" value="sub07-7"> <label for="sub07-7"><span class="num sub07-7">7</span>개발자 지원기능 강화</label></p>
	          <p><input type="checkbox" id="sub07-8" name="sub07" value="sub07-8"> <label for="sub07-8" class="etc"><span class="num sub07-8">8</span>기타</label><input type="text" name="sub06"></p>
	        </form>
	      </section>
	      <section>
	        <h3>8. SGIS 서비스에 대한 개선의견 등을 자유롭게 적어 주시기 바랍니다.</h3>
	        <textarea name="opi"></textarea>
	      </section>
	
	
	    </div>
		    <section class="done">
		      <h4>아래 사항은 조사결과 분석 및 추첨을 통한<br>상품권 지급 목적으로만 활용됩니다.</h4>
		        <table>
		          <tbody>
		            <tr>
		              <th>핸드폰 번호</th>
		              <td><input type="text" name="call" placeholder="' - ' 없이 숫자만 입력"></td>
		            </tr>
		            <tr>
		              <th>성명</th>
		              <td><input type="text" name="name" placeholder="홍길동"> </td>
		            </tr>
		            <tr>
		              <th>성별</th>
		              <td>
		                <div>
		                  <p><input type="radio" id="man" name="sex" value="man"><label for="man">남자</label></p>
		                  <p><input type="radio" id="woman" name="sex" value="woman"><label for="woman">여자</label></p>
		                </div>
		              </td>
		            </tr>
		            <tr>
		              <th>연령</th>
		              <td>
		                <div>
		                  <p><input type="radio" id="age19" name="age" onclick="setVal(9,1,1)"><label for="age19">19세 이하</label></p>
		                  <p><input type="radio" id="age20" name="age" onclick="setVal(9,2,2)"><label for="age20">20~29세</label></p>
		                  <p><input type="radio" id="age30" name="age" onclick="setVal(9,3,3)"><label for="age30">30~39세</label></p>
		                  <p><input type="radio" id="age40" name="age" onclick="setVal(9,4,4)"><label for="age40">40~49세</label></p>
		                  <p><input type="radio" id="age50" name="age" onclick="setVal(9,5,5)"><label for="age50">50~59세</label></p>
		                  <p><input type="radio" id="age60" name="age" onclick="setVal(9,6,6)"><label for="age60">60세 이상</label></p>
		                </div>
		              </td>
		            </tr>
		          </tbody>
		        </table>

                <p id="ment" style="display:none;">* 설문에 응답해 주셔서 대단히 감사합니다.</p>
                <div class="btn_wrap" style="display:none;">
                    <a onclick="surveyEnter();"  class="btn_submit">제출하기</a>
                    <a onclick="surveyCancel();" class="btn_cancel">취소</a>
                </div>		        

		      </section>	
		
	    </div>

		<%
			}
		%>
    </div>
</body></html>
