<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>
<%
	String bDate = "20220111"; // 2022. 1. 11.(화)∼1. 21.(금)

	Calendar calendar = Calendar.getInstance();
	Date date = calendar.getTime();
	String today = (new SimpleDateFormat("yyyyMMdd").format(date));

	SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
	Date beginDate = formatter.parse( bDate );
	Date endDate = formatter.parse( today );

	long diff = endDate.getTime() - beginDate.getTime();
	long idx = ( diff / ( 24 * 60 * 60 * 1000 ) ) + 1;

    String s_now = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(date);
%>

<!doctype html>
<html lang="kr" style="min-width:720px;">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="format-detection" content="telephone=no">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes">

  <title>SGIS에듀 개편서비스(안) 시범적용 결과 피드백</title>
  <link rel="stylesheet" href="./css/style.css">
  <script src="/js/workRoad/jquery.min.js"></script>
  <script type="text/javascript">
		var wsize = 820;
     	var hsize = 1500;
     	var contextPath = "";

     	document.onreadystatechange=resizeFrame;
     	function resizeFrame(){
	    	 try{
	    		 self.resizeTo(wsize, hsize);
	    	 }catch(e){
    	 	}
	   	}

		$(document).ready(function(){

//	         ● 설문조사
	         srvLogWrite( "A0", "15", "11", "00", "설문조사 view", "SGIS에듀 개편서비스(안) 시범적용 결과 설문조사 View" );
	         apiLogWrite2('R0', 'R11',            "설문조사 view", "SGIS에듀 개편서비스(안) 시범적용 결과 설문조사 View",  '00', '없음');

			apiLogWrite3("R05","SGIS에듀 개편서비스(안) 시범적용 결과 설문조사 view");
		});

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

			// 단일선택
			$("#srv"+qNum+" button").removeClass('select');
			$("#srv"+qNum+" button").eq(aNum-1).addClass('select');
		}

		function surveyEnter(){
			if(confirm("제출하시겠습니까?") == true){
				var params = {};
				params.survay1 = $("#srv1 button.select").text(); if( !isValid("1",params.survay1) ) return false;
				params.survay2 = $("#srv2 button.select").text(); if( !isValid("2",params.survay2) ) return false;
				params.survay3 = $("#srv3 button.select").text(); if( !isValid("3",params.survay3) ) return false;
				params.survay4 = $("#srv4 button.select").text(); if( !isValid("4",params.survay4) ) return false;

				// '기타' 선택시, 값입력 체크
				if( !etcNullCheck(1, "1") ) return false;
				if( !etcNullCheck(3, "3") ) return false;

				if( $("#srv1  input").val() ) params.etc1 = $("#srv1  input").val();
				if( $("#srv3  input").val() ) params.etc2 = $("#srv3  input").val();

				if( $("#etc3").val() ) params.etc3 = $("#etc3").val();
				if( $("#etc4").val() ) params.etc4 = $("#etc4").val();
				if( $("#etc5").val() ) params.etc5 = $("#etc5").val();

				params.tel_no = "<%=s_now%>";
				params.name  = "(none)";

				$.ajax({
			 		type:"POST",
			 		url: "/ServiceAPI/quiz/survey.json",
			 		data: params,
			 		success:function(data){
			 			if(data.result.resultCnt > 0){
//	                        ● 설문조사
	                           srvLogWrite( "A0", "15", "12", "00", "설문조사 등록 및 수정", "SGIS에듀 개편서비스(안) 시범적용 결과 설문조사 수정" );
	                           apiLogWrite2('R0', 'R12',            "설문조사 등록 및 수정", "SGIS에듀 개편서비스(안) 시범적용 결과 설문조사 수정",  '00', '없음' );
		 					alert("수정되었습니다.");
			 			} else {
//	                        ● 설문조사
	                           srvLogWrite( "A0", "15", "12", "00", "설문조사 등록 및 수정", "SGIS에듀 개편서비스(안) 시범적용 결과 설문조사 등록" );
	                           apiLogWrite2('R0', 'R12',            "설문조사 등록 및 수정", "SGIS에듀 개편서비스(안) 시범적용 결과 설문조사 등록",  '00', '없음' );

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
				$(document).scrollTop( $("#srv"+num).position().top + 680 );

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
	</div>
  <%
// 		System.out.println("idx === " + idx );
  if( idx < 1 || idx > 11 ){
  %>
	  <script type="text/javascript">
		  alert("이벤트 기간이 아닙니다.");
		  window.close();
	  </script>
  <%
  } else {
  %>

    <div class="cont_wrap">
      <div class="notice_cont">
    	<h3>
			<div class="notice_wrap">
			  <p class="notice">안녕하십니까?</p>
			  <p class="notice">먼저, 바쁜신 와중에도 통계청에서는 개발 중인 SGIS에듀 개편서비스(안)을 2021년 교육활동에 시범적용해 주신 초·중·고 선생님과 학교 관계자 여러분께 감사 말씀드립니다.</p>
			  <p class="notice">SGIS에듀 서비스 개편은 ‘코로나19’로 대면수업에 어려움을 겪고 있는 각급 학교에 도움을 주고자, 사회과목 등의 학교수업에 직접 활용될 수 있는 통계지리정보를 제공하기 위해 추진되었습니다. 이에 개편서비스(안)을 만들어 대전 지역 초·중·고를 대상으로 먼저 시범적용하였습니다.</p>
			  <p class="notice">통계청과 대전광역시교육청에서는 이번 시범적용에 참여하신 선생님들을 대상으로 SGIS에듀 개편서비스(안)에 대한 피드백을 받고자 합니다. 이번에 피드백 받은 내용은 ’22년 2∼3월 중에 서비스에 반영하여 4월에는 본격적으로 서비스를 시작하고자 합니다. </p>
			  <p class="notice">업무로 바쁘시겠지만, SGIS에듀를 학교현장에서 필요한 통계지리정보 교육콘텐츠로 만든다는 의미에서 피드백 작성에 참여하여 주시면 감사하겠습니다.</p>
			  <p class="notice"><B>○ 작성기간: 2022. 1. 11.(화)∼2022. 1. 21.(금)<br>○ 작성방법: 아래 양식에 따라 작성, 제출</B></p>
			  <p class="notice sub_txt">※ 피드백 및 SGIS에 관한 문의사항이 있으시면 042-481-2568(최윤라 주무관),<br>&nbsp;&nbsp;&nbsp; 042-481-3602(박범선 사무관)로 연락주시기 바랍니다.</p>
			  <p class="notice sub_txt2">통     계     청<br/>대전광역시교육청</p>
			</div>
    	</h3>
      </div>
    </div>
    <div class="cont_wrap">
      <div class="cont">
        <h2>SGIS에듀 개편서비스(안) 시범적용 피드백 작성문항</h2>
        <h5><span>Q1.</span> <span>SGIS에듀 개편서비스(안)은 언제 사용하셨습니까?</h5>
		<div id="srv1" class="answer_wrap">
		  <p class="answer"><label><button class="num" onclick="setVal(1,1,1)">1</button>정규수업 시간</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(1,2,2)">2</button>창의적 체험활동</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(1,3,3)">3</button>자율동아리</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(1,4,4)">4</button>기타&nbsp;</label><input onclick="setEtcVal(1,4,4,this)" type="text" id="etc1" class="etcInput" maxlength="100"></p>
		</div>

		<h5><span>Q2.</span> <span>시범적용 기간 중 SGIS에듀 개편서비스(안)의 사용횟수는 얼마나 되십니까?</h5>
		<div id="srv2" class="answer_wrap">
		  <p class="answer"><label><button class="num" onclick="setVal(2,1,1, this)">1</button>1회</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(2,2,2, this)">2</button>2~5회</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(2,3,3, this)">3</button>6~9회</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(2,4,4, this)">4</button>10회 이상</label></p>
		</div>

		<h5><span>Q3.</span> <span>SGIS에듀 개편서비스(안) 중 가장 많이 사용한 메뉴는?</h5>
		<div id="srv3" class="answer_wrap">
		  <p class="answer"><label><button class="num" onclick="setVal(3,1,1)">1</button>수업하기</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(3,2,2)">2</button>함께하기</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(3,3,3)">3</button>스스로하기</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(3,4,4)">4</button>기타&nbsp;</label><input onclick="setEtcVal(3,4,4,this)" type="text" id="etc2" class="etcInput" maxlength="100"></p>
		</div>

		<h5><span>Q4.</span> <span>SGIS에듀 개편서비스(안)에 대해 전반적으로 얼마나 만족하십니까?</span></h5>
		<div id="srv4" class="answer_wrap">
		  <p class="answer"><label><button class="num" onclick="setVal(4,1,1,this)">1</button>매우 만족</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(4,2,2,this)">2</button>만족</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(4,3,3,this)">3</button>보통</label></p>
		  <p class="answer"><label><button class="num" onclick="setVal(4,4,4,this)">4</button>불만족</label></p>
		</div>

		<h5><span>Q5.</span> <span>SGIS에듀 개편서비스(안)에 대해 가장 불편했던 점은 무엇입니까?</span></h5>
		<div id="srv5" class="answer_wrap">
          <textarea id="etc3" rows="8" cols="80"></textarea>
		</div>

		<h5><span>Q6.</span> <span>SGIS에듀 개편서비스(안)에 추가적으로 필요한 서비스는 무엇입니까?</span></h5>
		<div id="srv6" class="answer_wrap">
          <textarea id="etc4" rows="8" cols="80"></textarea>
		</div>

		<h5><span>Q7.</span> <span>SGIS에듀 개편(안)의 서비스 향상을 위해 바라시는 점 또는 개선의견을 자유롭게 작성하여 주시기 바랍니다.</span></h5>
		<div id="srv7" class="answer_wrap">
          <textarea id="etc5" rows="8" cols="80"></textarea>
		</div>

        <div class="user_info_wrap">
          <p id="ment" class="ment">※ 피드백 작성에 참여해 주셔서 감사합니다.</p>
          <div class="btn_wrap">
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
