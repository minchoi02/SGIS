<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>

<%
	String bDate = "20210429"; //21.4.29.(목)∼5.18.(화), 20일간

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
    <link rel="stylesheet" href="./css/style.css">

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
			
			srvLogWrite( "A0", "15", "03", "00", "이벤트", "2021년 상반기 SGIS 퀴즈 이벤트  View" );
			apiLogWrite2('R0', 'R07', "이벤트", "2021년 상반기 SGIS 퀴즈 이벤트  View",  '00', '없음');

			apiLogWrite3("R05","2021년 설문조사 view");

			var offset = $(".top").offset(); 
			if( offset ){
				$("html, body").animate({scrollTop : offset.top }, 200);
			}
		});

		function fnAgree(val){
			$("input:radio[name=agreement]:input[value=" +val+"]").prop("checked", true);

			if(val == "Y"){
				$(".btn_wrap").css("display","").show();
			} else {
				$(".btn_wrap").css("display","none").hide();
			}
		} 

		function setVal( qNum, val, aNum, obj ){
			var notItems = "";
			
				if( $("#srv6 button.select").text() == "5" || $("#srv6 button.select").text() == "" || !$("#srv6 button.select").text()){
					notItems = ".srv61, .srv62";
				} else if( $("#srv6 button.select").text() == "1" || $("#srv6 button.select").text() == "2" ){
					notItems = ".srv62";
				} else if( $("#srv6 button.select").text() == "3" || $("#srv6 button.select").text() == "4" ){
					notItems = ".srv61";
				}

				if( $("input:radio[name=agreement]:checked").val() != "Y" ){
					notItems += ", .user_info_wrap";
				}

				$("h5, .answer, .answer_wrap").not( notItems ).css("display","").show();
				$(".agree_wrap, .user_info_wrap").show();

			$(".btn_cancel").show();

			if( obj && $(obj).closest(".answer_wrap").find("input") && $(obj).closest(".answer_wrap").find("input").val() != "" ){
				$(obj).closest(".answer_wrap").find("input").val("");
			}


			$("#ans"+qNum+" button").removeClass('select');
			$("#ans"+qNum+" button").eq(aNum-1).addClass('select');
		}

		function quizSubmit(){
			if(confirm("제출하시겠습니까?") == true){
				
				var data = {};
				data.ox_1 = $("#ans1 button.select").text(); if( !isValid("1",data.ox_1) ) return false; ;
				data.ox_2 = $("#ans2 button.select").text(); if( !isValid("2",data.ox_2) ) return false; ;
				data.ox_3 = $("#ans3 button.select").text(); if( !isValid("3",data.ox_3) ) return false; ;
				data.ox_4 = $("#ans4 button.select").text(); if( !isValid("4",data.ox_4) ) return false; ;
				data.ox_5 = $("#ans5 button.select").text(); if( !isValid("5",data.ox_5) ) return false; ;
				data.ox_6 = $("#ans6 button.select").text(); if( !isValid("6",data.ox_6) ) return false; ;
				data.ox_7 = $("#ans7 button.select").text(); if( !isValid("7",data.ox_7) ) return false; ;

				if($("#name").val()==""){
				    alert("성명을 입력해주세요");
				    $("#name").focus();
				    return false;
				}
				data.name = $("#name").val();

				if($("#tel_no").val()==""){
				    alert("핸드폰 번호를 입력해주세요");
				    $("#tel_no").focus();
				    return false;
				}
				data.tel_no = $("#tel_no").val();

					
				if( data ){
					$.ajax({
				 		type:"POST",
				 		url: "/ServiceAPI/quiz/quiz.json",
				 		data: data,
				 		success:function(data){
							
							
							srvLogWrite( "A0", "15", "04", "00", " 2020년 SGIS 여름휴가 퀴즈 등록 및 수정", "2020년 SGIS 여름휴가 퀴즈 등록 및 수정" ); //jrj 로그
							apiLogWrite2('R0', 'R08', "이벤트", "2020년 SGIS 여름휴가 퀴즈 등록 및 수정",  '00', '없음' );
							alert("제출이 완료되었습니다.");
							window.close();
						},
				 		error:function(data){
				 		//	alert("정확하지 않거나 범위를 넘어선 값이 있습니다. 다시 실행해주세요.");
				 			window.close();
				 		}
				 	});
				}
				
			} else {
				return;
			}
		}

		function quizCancel(){
			self.close();
		}

		function isValid( num, val ){
			if( val == "" || !val ){
				alert( num + "번 문항을 선택해주세요.");
				num = num.replace("-","");
				$(document).scrollTop( $("#ans"+num).position().top - 5 );

				return false;  
			} else {
				return true;
			}
		}

		function onlyNumber(obj){
			$(obj).keyup(function(){
				$(this).val($(this).val().replace(/[^0-9]/g,""));
			});
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
			<img src="./img/notice.jpg" style="width:500px; height:700px; margin-bottom:20px;">
		</div>

		<%
// 		System.out.println("idx === " + idx );
		if( idx < 1 || idx > 20 ){
		%>
			<script type="text/javascript">
				alert("이벤트 기간이 아닙니다.");
				window.close();
			</script>
		<%
		} else
			{
		%>


	    <div class="wrap" style="center;">
	      <div class="top">
	        <img src="./img/topimg.png" alt="">
	      </div>
	      <div class="cont_wrap">
	        <div class="cont">
				<div id="ans1">
					<h5><span>1.</span> <span>2019년 기준, 경기도에서 발생한 A형 간염 발생건수는 몇 건 일까요?</h5>
					<div class="answer_wrap">  
						  <p class="answer"><label class=""><button class="num" onclick="setVal(1,1,1)">1</button>5,406건</label></p>
						  <p class="answer"><label class=""><button class="num" onclick="setVal(1,2,2)">2</button>1,079건</label></p>
						  <p class="answer"><label class=""><button class="num" onclick="setVal(1,3,3)">3</button>3,139건 </label></p>
						  <p class="answer"><label class=""><button class="num" onclick="setVal(1,4,4)">4</button>558건</label></p>
					</div>  
					<p class="hint">SGIS> 통계주제도> 환경과 안전> 지역별 감염병 발생 현황</p>
				</div>
				<div id="ans2" style="margin-top:40px;"> 
					<h5><span>2.</span> <span>A씨는 10∼20대를 대상으로 외식업을 창업하려고 My통계로를 검색하였습니다.&nbsp;&nbsp; 생애주기(청소년, 청년)와 관심분야(먹거리)를 선택한 경우 몇 건의 통계지리정보를 참고할 수 있을까요?</h5>
					<div class="answer_wrap"> 
						<p class="answer"><label class=""><button class="num" onclick="setVal(2,1,1)">1</button>85건</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(2,2,2)">2</button>86건</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(2,3,3)">3</button>87건</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(2,4,4)">4</button>88건</label></p>
					</div>
					<p class="hint">SGIS> My통계로> 생애주기(청소년, 청년)> 관심분야(먹거리)> 카탈로그</p>
				</div>
				<div id="ans3" style="margin-top:40px;">
					<h5><span>3.</span> <span>일자리 맵 서비스에서 제공하는 삶의 질 주요지표가 아닌 것은?</h5>
					<div class="answer_wrap">
						<p class="answer"><label class=""><button class="num" onclick="setVal(3,1,1)">1</button>일자리만족도</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(3,2,2)">2</button>상대적빈곤율</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(3,3,3)">3</button>고용보험 가입률</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(3,4,4)">4</button>지니계수</label></p>
					</div>
					<p class="hint">SGIS> 일자리 맵> 일자리통계분석> 삶의 질</p>
				</div>
				<div id="ans4" style="margin-top:40px;">
					<h5><span>4.</span> <span>생활권역 통계지도에서 관심 지점을 설정하고 영역을 선택할 때 반경기준 최대 몇 Km까지 선택이 가능할까요?</span></h5>
					<div class="answer_wrap">
						<p class="answer"><label class=""><button class="num" onclick="setVal(4,1,1)">1</button>2Km</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(4,2,2)">2</button>3Km</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(4,3,3)">3</button>4Km</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(4,4,4)">4</button>5Km</label></p>
					</div>
					<p class="hint">SGIS> 생활권역 통계지도> 관심지점 설정> 영역설정</p>
				</div>
				<div id="ans5" style="margin-top:40px;">	
					<h5><span>5.</span> <span>서울특별시청을 기준으로 주행시간 5분 영역 내 통계정보(인구/가구/주택)를 검색하였습니다. 2019년 기준, 영역 내 전체 인구 중 50∼59세 인구는 몇 % 일까요?</span></h5>
					<div class="answer_wrap">
						<p class="answer"><label class=""><button class="num" onclick="setVal(5,1,1)">1</button>60.1%</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(5,2,2)">2</button>70.6%</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(5,3,3)">3</button>26.4%</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(5,4,4)">4</button>19.6%</label></p>
					</div>
					<p class="hint">SGIS> 생활권역 통계지도> 위치검색(서울특별시)> 검색 또는 지도에서 지점선택(서울특별시청)> 영역설정(주행시간 5분)</p>
				</div>
				<div id="ans6" style="margin-top:40px;">
					<h5><span>6.</span> <span>농림어업총조사 2015년 기준, 경상남도에서 과수를 재배하는 농가는 몇 가구 일까요?</span></h5>
					<div class="answer_wrap">
						<p class="answer"><label class=""><button class="num" onclick="setVal(6,1,1)">1</button>53,178가구</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(6,2,2)">2</button>11,878가구</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(6,3,3)">3</button>21,691가구</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(6,4,4)">4</button>1,915가구</label></p>
					</div>
					<p class="hint">SGIS> 분석지도> 총조사 시각화 지도> 농업> 경영형태별 농가</p>
				</div>
				<div id="ans7" style="margin-top:40px;">	
					<h5><span>7.</span> <span>인구주택총조사 2019년 기준, 강원도의 외국인 수는 몇 명일까요?</span></h5>
					<div class="answer_wrap" id="ans7">
						<p class="answer"><label class=""><button class="num" onclick="setVal(7,1,1)">1</button>27,008명</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(7,2,2)">2</button>100,174명</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(7,3,3)">3</button>104,018명</label></p>
						<p class="answer"><label class=""><button class="num" onclick="setVal(7,4,4)">4</button>105,908명</label></p>
					</div> 
					<p class="hint">SGIS> 분석지도> 총조사 시각화 지도> MENU> 총조사 통계표> 외국인> 성별외국인_시군구</p>
				</div>
				
	          <div class="user_info_wrap">
	            <h3 class="user_info_tit">개인정보수집</h3>
	            <p class="user_info_txt">개인정보 수집항목(성명, 휴대전화번호)은 추첨을 통한 상품권 지급 및 분석 목적으로만 사용되며, 경품 지급 후 파기됩니다. 개인정보 수집에 동의하지 않으시면 이벤트에 참여하실 수 없습니다.</p>
	            <table class="table_style01">
	              <colgroup>
	                <col width="25%" />
	              </colgroup>
	              <tr>
	                <th>개인정보수집</th> 
	                <td>
	                  <div class="answer_wrap">
                        <p class="answer"><input type="radio" name="agree" onclick="fnAgree('Y');" value="Y" id="agree"><label for="agree">&nbsp;동의</label></p>
                        <p class="answer"><input type="radio" name="agree" onclick="fnAgree('N');" value="N" id="disagree" checked="checked" style="margin-left:20px;"><label for="disagree">&nbsp;비동의</label></p>
                        
	                  </div>
	                </td>
	              </tr>
	              <tr>
	                <th>성명</th>
	                <td><p style="margin-left: 10px;"><input type="text" id="name" maxlength="10" class=""/></p></td>
	              </tr>
	              <tr>
	                <th>핸드폰번호</th>
	                <td><p style="margin-left: 10px;"><input type="text" id="tel_no" maxlength="11" onkeydown="onlyNumber(this);" class=""/></p></td>
	              </tr>
	            </table>
	            <!-- <p>※ 설문에 참여해 주셔서 감사합니다. 앞으로도 SGIS 많은 이용 부탁드립니다.</p> -->
                <div class="btn_wrap" style="display:none;">
                    <a onclick="quizSubmit();"  class="btn_submit">제출하기</a>
                    <a onclick="quizCancel();" class="btn_cancel">취소</a>
                </div>
                &nbsp;
	          </div>
	
	        </div>
	      </div>
	    </div>

		<%
			}
		%>
    </div>
</body></html>
