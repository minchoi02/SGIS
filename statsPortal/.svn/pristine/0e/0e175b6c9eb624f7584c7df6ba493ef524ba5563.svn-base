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
					out.println("location.href='/html/survey/2021_2/surveyMobile.html';");
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
	String bDate = "20210512"; // 5.12 ~ 5.27 (16일간)

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
<html lang="kr" style="min-width:700px;">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="format-detection" content="telephone=no">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes">
	
  <title>SGIS 개발지원센터 개선 의견수렴</title>
  <link rel="stylesheet" href="./css/style.css">
  <script src="/js/workRoad/jquery.min.js"></script>
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
			if(navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad|)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
				console.log('========= mobile');
				debugger;
				location.href = '/html/survey/2021_2/surveyMobile.html';
			}

			srvLogWrite( "A0", "15", "03", "00", "이벤트", "2021년 SGIS 개발지원센터 개선 의견수렴 설문조사 View" );
			apiLogWrite2('R0', 'R07', "이벤트", "2021년 SGIS 개발지원센터 개선 의견수렴 설문조사 View",  '00', '없음');

			apiLogWrite3("R05","2021년 SGIS 개발지원센터 개선 의견수렴 view");

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

			if($(obj).closest(".answer_wrap").find("button").hasClass('select')){
				if( obj && $(obj).closest(".answer_wrap").find("input") && $(obj).closest(".answer_wrap").find("input").val() != "" ){
					$(obj).closest(".answer_wrap").find("input").val("");
				}
				$(obj).closest(".answer_wrap").find("button").removeClass('select');
			} 
			$(obj).closest("p").find("button").addClass('select');
			$("#srv"+(qNum)).find("input").val("");
		}
		
		function setVal( qNum, val, aNum, obj ){

			if( obj && $(obj).closest(".answer_wrap").find("input") && $(obj).closest(".answer_wrap").find("input").val() != "" ){
				$(obj).closest(".answer_wrap").find("input").val("");
			}
			if( qNum == '4'){ // 중복가능
				if( $( obj ).hasClass('select') ){
					$( obj ).removeClass('select');
				} else {
					$( obj ).addClass('select');
				}
			} else { // 단일선택 
				if( qNum == "2" && aNum != 5 ){ $("#etc2").val(""); }
				else if( qNum == "6" && aNum != 5 ){ $("#etc6").val(""); }
				else if( qNum == "7" && aNum != 6 ){ $("#etc7").val(""); }
				else if( qNum == "8" && aNum != 6 ){ $("#etc8").val(""); }
			  
				$("#srv"+qNum+" button").removeClass('select');
				$("#srv"+qNum+" button").eq(aNum-1).addClass('select');
			}
			
		}

		function surveyEnter(){
			if(confirm("제출하시겠습니까?") == true){
				var params = {}; 
				params.survay1 = $("#srv1 button.select").text(); if( !isValid("1",params.survay1) ) return false; 
				params.survay2 = $("#srv2 button.select").text(); if( !isValid("2",params.survay2) ) return false;
				params.survay3 = $("#srv3 button.select").text(); if( !isValid("3",params.survay3) ) return false;
				params.survay4 = dupText( $("#srv4") ); if( !isValid("4",params.survay4) ) return false; //중복가능
				params.survay5 = $("#srv5 button.select").text(); if( !isValid("5",params.survay5) ) return false;
				params.survay6 = $("#srv6 button.select").text(); if( !isValid("6",params.survay6) ) return false;
				params.survay7 = $("#srv7 button.select").text(); if( !isValid("7",params.survay7) ) return false;
				params.survay8 = $("#srv8 button.select").text(); if( !isValid("8",params.survay8) ) return false;

				// '기타' 선택시, 값입력 체크
				if( !etcNullCheck(2, "2") ) return false;
				if( !etcNullCheck(6, "6") ) return false;
				if( !etcNullCheck(7, "7") ) return false;
				if( !etcNullCheck(8, "8") ) return false;

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
				params.survay9  = $("#srv10 button.select").text(); if( !params.survay9  ){ alert("연령을 선택해주세요."); return false; }
				params.survay10 = $("#srv11 button.select").text(); if( !params.survay10 ){ alert("소속을 선택해주세요."); return false; } 
				if( !etcNullCheck(11, "소속") ) return false; // '기타' 선택시, 값입력 체크
			
				if( $("#srv2  input").val() ) params.etc1 = $("#srv2  input").val();
				if( $("#srv6  input").val() ) params.etc2 = $("#srv6  input").val();
				if( $("#srv7  input").val() ) params.etc3 = $("#srv7  input").val();
				if( $("#srv8  input").val() ) params.etc4 = $("#srv8  input").val();
				
				if( $("#etc9 ").val() ) params.etc5 = $("#etc9 ").val();
				if( $("#etc10").val() ) params.etc6 = $("#etc10").val();
				if( $("#etc11").val() ) params.etc7 = $("#etc11").val();
				if( $("#etc12").val() ) params.etc8 = $("#etc12").val();
 
				params.etc9 = "Web";

				$.ajax({
			 		type:"POST",
			 		url: "/ServiceAPI/quiz/survey.json",
			 		data: params,
			 		success:function(data){
			 			if(data.result.resultCnt > 0){
		 					alert("수정되었습니다.");
			 			} else {
	 						srvLogWrite( "A0", "15", "04", "00", "이벤트", "2021년 SGIS 개발지원센터 개선 의견수렴 설문조사 등록" );
	 						apiLogWrite2('R0', 'R08', "이벤트", "2021년 SGIS 개발지원센터 개선 의견수렴 설문조사 등록",  '00', '없음' );

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
				$(document).scrollTop( $("#srv"+num).position().top + 950 );

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
  <div class="wrap">
	<div align="center">
		<img src="/html/survey/2021_2/img/notice.jpg" style="width:500px; height:700px; margin-bottom:20px;">
	</div>
  <%
// 		System.out.println("idx === " + idx );
  if( idx < 1 || idx > 16 ){
  %>
	  <script type="text/javascript">
		  alert("이벤트 기간이 아닙니다.");
		  window.close();
	  </script>
  <%
  } else {
  %>

    <div id="survey_content" class="tit"></div>  
    <div class="top">
      <img src="./img/topimg.png" alt="">
    </div>
    <div class="cont_wrap">
      <div class="cont">
        <img src="./img/bg01.png" alt="" class="bg01">
        <h2>Ⅰ. 이용현황</h2>
        <h5><span>1.</span> <span>귀하의 개발경력은 얼마입니까?</h5>
		<div id="srv1" class="answer_wrap">
		  <p class="answer"><label><button class="num" onclick="setVal(1,1,1)">1</button>1년 미만</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(1,2,2)">2</button>1년 이상〜5년 미만</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(1,3,3)">3</button>5년 이상〜10년 미만</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(1,4,4)">4</button>10년 이상</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(1,5,5)">5</button>경력없음</label></p>
		</div>

		<h5><span>2.</span> <span>SGIS OpenAPI를 이용하는 목적은 무엇입니까?</h5>
		<div id="srv2" class="answer_wrap">
		  <p class="answer"><label><button class="num" onclick="setVal(2,1,1, this)">1</button>상업적 이용</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(2,2,2, this)">2</button>연구에 이용</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(2,3,3, this)">3</button>교육에 이용</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(2,4,4, this)">4</button>공공에 이용</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(2,5,5, this)">5</button>기타&nbsp;</label><input onclick="setEtcVal(2,5,5,this)" type="text" id="etc2" class="etcInput" maxlength="100"></p>
		</div>

		<h5><span>3.</span> <span>SGIS 개발지원센터의 가장 최근 이용은 언제입니까?</h5>
		<div id="srv3" class="answer_wrap">
		  <p class="answer"><label><button class="num" onclick="setVal(3,1,1)">1</button>1개월 이내</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(3,2,2)">2</button>3개월 이내</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(3,3,3)">3</button>6개월 이내</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(3,4,4)">4</button>1년 이내</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(3,5,5)">5</button>1년 이상</label></p>
		</div>

		<h5><span>4.</span> <span>SGIS 개발지원센터에서 주로 이용하는 서비스는 무엇입니까? (중복 가능)</span></h5>
		<div id="srv4" class="answer_wrap">
		  <p class="answer"><label><button class="num" onclick="setVal(4,1,1,this)">1</button>지도 API</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(4,2,2,this)">2</button>데이터 API</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(4,3,3,this)">3</button>모바일 SDK</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(4,4,4,this)">4</button>체험하기</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(4,5,5,this)">5</button>알림마당</label></p>
		</div>
  
		<h2>Ⅱ. 만족도 및 개선 의견</h2>
		<h5><span>5.</span> <span>SGIS 개발지원센터에 대해 전반적으로 얼마나 만족하십니까?</span></h5>
		<div id="srv5" class="answer_wrap">
		  <p class="answer"><label><button class="num" onclick="setVal(5,1,1)">1</button>매우 만족한다</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(5,2,2)">2</button>만족하는 편이다</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(5,3,3)">3</button>보통이다</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(5,4,4)">4</button>만족하지 않는 편이다</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(5,5,5)">5</button>전혀 만족하지 않는다</label></p>
		</div>

		<h5><span>6.</span> <span>SGIS 개발지원센터 메인 페이지 이용 시 가장 불편한 사항은 무엇입니까?</span></h5>
		<div id="srv6" class="answer_wrap">
		  <p class="answer"><label><button class="num" onclick="setVal(6,1,1, this)">1</button>메인화면의 직관적 안내 부족</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(6,2,2, this)">2</button>API 검색기능</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(6,3,3, this)">3</button>한 눈에 볼 수 없는 메뉴 구조</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(6,4,4, this)">4</button>이용안내 및 매뉴얼 부족</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(6,5,5, this)">5</button>기타&nbsp;</label><input onclick="setEtcVal(6,5,5,this)" type="text" id="etc6" class="etcInput" maxlength="100"></p>
		</div>

		<h5><span>7.</span> <span>SGIS OpenAPI 이용 시 가장 불편한 사항은 무엇입니까?</span></h5>
		<div id="srv7" class="answer_wrap">
		  <p class="answer"><label><button class="num" onclick="setVal(7,1,1, this)">1</button>인증키 발급절차가 복잡함</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(7,2,2, this)">2</button>API 검색이 어려움</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(7,3,3, this)">3</button>API 서비스 종류가 적음</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(7,4,4, this)">4</button>이용안내 및 사용설명 부족</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(7,5,5, this)">5</button>SGIS OpenAPI의 특수성(예: 인증루프코딩 등)</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(7,6,6, this)">6</button>기타&nbsp;</label><input onclick="setEtcVal(7,6,6,this)" type="text" id="etc7" class="etcInput" maxlength="100"></p>
		</div>

		<h5><span>8.</span> <span>SGIS 개발지원센터에서 추가적으로 필요한 사항은 무엇입니까?</span></h5>
		<div id="srv8" class="answer_wrap">
		  <p class="answer"><label><button class="num" onclick="setVal(8,1,1, this)">1</button>보다 다양한 데이터 API 제공</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(8,2,2, this)">2</button>이용의 편의성을 고려한 메뉴의 재구성</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(8,3,3, this)">3</button>SGIS OpenAPI를 활용한 사례 제공</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(8,4,4, this)">4</button>API 활용 안내 및 예제</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(8,5,5, this)">5</button>이용안내 및 매뉴얼 제공</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(8,6,6, this)">6</button>기타&nbsp;</label><input onclick="setEtcVal(8,6,6,this)" type="text" id="etc8" class="etcInput" maxlength="100"></p>
        </div>  
  
        <h5><span>9.</span> <span>SGIS OpenAPI를 활용하여 개발한 사례가 있으면 구체적으로 적어 주시기 바랍니다.</span></h5>
        <div class="answer_wrap">
          <textarea id="etc9" rows="8" cols="80" placeholder="(개발물 명칭, 활용산업 또는 활용분야, 이용목적, 상용화 여부, 사용기간 등)"></textarea>
        </div> 

        <h5><span>10.</span> <span>SGIS 개발지원센터에서 제공하길 바라는 OpenAPI가 있으면 구체적으로 적어 주시기 바랍니다.</span></h5>
        <div class="answer_wrap">
          <textarea id="etc10" rows="8" cols="80" placeholder="(통계자료 명칭, 활용분야, 이용목적, 필요성, 상용화 여부 등)"></textarea>
        </div>

        <h5><span>11.</span> <span>이용자 중심의 SGIS 개발지원센터 서비스 개편을 위해 바라는 점 또는 개선의견을 자유롭게 작성하여 주시기 바랍니다.</span></h5>
        <div class="answer_wrap">
          <textarea id="etc11" rows="8" cols="80"></textarea>
        </div>


        <div class="line"></div>
  
        <div class="agree_wrap">
            <p class="agree_txt">&nbsp;&nbsp;&nbsp;&nbsp;개인정보 수집항목(성명, 휴대전화번호)은 추첨을 통한 상품권 지급 및 분석 목적으로만 사용되며, 경품 지급 후 파기됩니다. 개인정보 수집에 동의하지 않으시면 설문에 참여하실 수 없습니다.</p>
            <div class="agree_chk_wrap">
                <input type="radio" name="agree" onclick="fnAgree('Y');" value="Y" id="agree"><label for="agree">동의</label>
                <input type="radio" name="agree" onclick="fnAgree('N');" value="N" id="disagree" checked="checked" style="margin-left:10px;"><label for="disagree">비동의</label>
            </div>
        </div>
                
        <div class="user_info_wrap">
          <h3 class="user_info_tit">아래의 정보는 사은품 제공 및 결과분석 목적으로만 활용합니다.</h3>
          <table class="table_style01">
            <colgroup>
              <col width="11%" />
            </colgroup>
            <tr>
              <th>핸드폰번호</th>
	          <td style="text-align:left;"><p style="margin-left: 10px;"><input type="text" id="tel_no" maxlength="11" onkeydown="onlyNumber(this);" class=""/></p></td>
            </tr>
            <tr>
              <th>성명</th>
              <td style="text-align:left;"><p style="margin-left: 10px;"><input type="text" id="name" maxlength="10" class=""/></p></td>
            </tr>
            <tr>
              <th>성별</th>
              <td>
                <div id="srv9" class="answer_wrap layout_style02">
                    <p class="answer"><label class=""><button class="num" onclick="setVal(9,1,1)">1</button>남자</label></p>
                    <p class="answer"><label class=""><button class="num" onclick="setVal(9,2,2)">2</button>여자</label></p>
                </div>   
              </td>
            </tr>   
            <tr>
              <th>연령</th>
              <td>
                <div id="srv10" class="answer_wrap layout_style03">
                    <p class="answer"><label class=""><button class="num" onclick="setVal(10,1,1)">1</button>19세 이하</label></p>
                    <p class="answer"><label class=""><button class="num" onclick="setVal(10,2,2)">2</button>20~29세</label></p>
                    <p class="answer"><label class=""><button class="num" onclick="setVal(10,3,3)">3</button>30~39세</label></p>
                    <p class="answer"><label class=""><button class="num" onclick="setVal(10,4,4)">4</button>40~49세</label></p>
                    <p class="answer"><label class=""><button class="num" onclick="setVal(10,5,5)">5</button>50~59세</label></p>
                    <p class="answer"><label class=""><button class="num" onclick="setVal(10,6,6)">6</button>60세 이상</label></p>
                </div> 
              </td>
            </tr>
            <tr>
              <th>소속</th> 
              <td> 
                <div id="srv11" class="answer_wrap layout_style02">
                    <p class="answer"><label class=""><button class="num" onclick="setVal(11,1,1, this)">1</button>공공기관</label></p>
                    <p class="answer"><label class=""><button class="num" onclick="setVal(11,2,2, this)">2</button>민간기관</label></p>
                    <p class="answer"><label class=""><button class="num" onclick="setVal(11,3,3, this)">3</button>교육기관</label></p>
                    <p class="answer"><label class=""><button class="num" onclick="setVal(11,4,4, this)">4</button>학생</label></p> 
                    <p class="answer"><label class=""><button class="num" onclick="setVal(11,5,5, this)">5</button>개인</label></p>
                    <p class="answer" style="text-align:left;width:240px;"><label class=""><button class="num" onclick="setVal(11,6,6)">6</button>기타&nbsp;</label><input onclick="setEtcVal(11,6,6,this)" id="etc12" type="text" class="etc" maxlength="100" style="width:140px;"></p>
                </div>
              </td>
            </tr> 
          </table>
          <p id="ment" style="display:none;">* 설문에 응답해 주셔서 대단히 감사합니다.</p>
          <div class="btn_wrap" style="display:none;">
              <a onclick="surveyEnter();"  class="btn_submit">제출하기</a>
              <a onclick="surveyCancel();" class="btn_cancel">취소</a>
          </div>  
        </div> 

      </div>   
    </div>
	<%
		}
	%>
  </div>

</body>

</html>
