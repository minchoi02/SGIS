<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat" %> 
<%@ page import="java.util.Calendar" %> 
<%@ page import="java.util.Date" %> 
<%@ page import="java.util.HashMap" %> 
<%@ page import="java.util.Map" %> 

<%
	String bDate = "20200805"; // 이벤트 시작일

	Calendar calendar = Calendar.getInstance();
	Date date = calendar.getTime();
	
	String today = (new SimpleDateFormat("yyyyMMdd").format(date));
	
	SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
	Date beginDate = formatter.parse( bDate );
	Date endDate = formatter.parse( today );
	
	long diff = endDate.getTime() - beginDate.getTime();
	long idx = ( diff / ( 24 * 60 * 60 * 1000 ) ) + 1;
	System.out.println("diff:" + diff);
%>


<!doctype html>
<html lang="ko">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    
    <link rel="stylesheet" href="resources/css/base.css">
    <link rel="stylesheet" href="resources/css/common.css">
    
	<script src="${pageContext.request.contextPath}/jsp/event/summer_quiz/resources/js/jquery-1.11.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/jsp/event/summer_quiz/resources/js/default.js"></script>
    
	
	<script src="${pageContext.request.contextPath}/js/plugins/jquery-ui-1.10.3.custom.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/common.js"></script>
	
	<title>SGIS 여름휴가 퀴즈 이벤트</title>
	
	<script language="javascript">
		
		srvLogWrite( "A0", "15", "03", "00", "2020년 SGIS 여름휴가 퀴즈 이벤트 뷰", "2020년 SGIS 여름휴가 퀴즈 이벤트 View" );
		apiLogWrite2('R0', 'R07', "이벤트", "2020년 SGIS 여름휴가 퀴즈 이벤트 View",  '00', '없음');	
		
		function oxSubmit(){
			var data = oxValidation();
				
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
		}
		
		
		function agreeCheck( agree ){
			if( agree ){
				$(".agreey").css("display","").show();
			} else {
				$(".agreey").css("display","none").hide();
			}
		}
	
		
		//유효성 검사 
		function oxValidation(){
			var data = {};
			
			var valid = 0;
			
			for( var i=1; i<=7; i++ ){
				if( !$(".qList[data-quizno="+i+"]").find("button").hasClass("on") && valid == 0 ){
					valid = i;
				} else if( valid == 0 ){
					//button 의 자식요소 p 값을 가져와서 insert
					data["ox_"+i] = $(".qList[data-quizno="+i+"]").find("button.on").find('p').text();
				}
			}
			
			if( valid != 0 ){
				alert(valid+"번 퀴즈를 풀지 않았습니다.");
				return false;
			}
			
			var name = $("#name").val();
			var tel_no = $("#tel_no").val();
			
			//공백제거
			name = name.replace(/\s/g,'');
			tel_no = tel_no.replace(/[-]|\s/gi,'');
			
			$("#name").val( name );
			$("#phone").val( tel_no );
			
			var pattern;
			
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
				if( tel_no.length > 40 ){
					alert("휴대전화번호는 30자리까지 입력 가능합니다.");
					return false;
				}
			}
			
			data.name = name;
			data.tel_no = tel_no;
			
			return data;
		}
	</script>
</head>

<body>

	<%
		System.out.println("idx:" + idx +", bDate:"+bDate);
		if( idx < 1 || idx > 17 ){ //이벤트 종료일을 수정 시 idx 값의 범위를 조정해주면 됨.
	%>
		<script type="text/javascript">
			alert("이벤트 기간이 아닙니다.");
			window.close();
		</script>
	<%
		} else {
	%>
	
	
	<script type="text/javascript">
		$(document).ready(function() {
			
			var offset = $("#quiz_content").offset();
			if( offset ){
				$("html, body").animate({scrollTop : offset.top }, 200);
			}
			
			
			//답변 클릭시 class에 on 붙이기 
			$(".qList li").click(function(e){
				e.preventDefault();
				
				var $list = $(this).closest(".qList");
				
				if( $list.find("button").hasClass("on") ){
					$list.find("button").removeClass("on");
				} 
				 
				$(this).find("button").addClass("on");
			});
			
			//개인정보수집 동의 또는 미동의에 따라 설정
			$("input[name=sChk]").click(function(){
				if( $(this).val() == "Y" ){
					$(".agreey").css("display","").show();
					$("#phoneNumber").css("display", "").show();
					$("#userName").css("display", "").show();
				} else {
					$(".agreey").css("display","none").hide();
					$("#phoneNumber").css("display", "none").hide();
					$("#userName").css("display", "none").hide();
				}
			});
		});
	</script>
	
    <div class="wrap">
    	<p style="margin-bottom:20px;">
			<img src="${pageContext.request.contextPath}/jsp/event/summer_quiz/resources/images/A.png" style="width: 700px">
		</p>
        <div class="tit" id="quiz_content">
            <h1></h1>
        </div>
        <div class="quizBox">
            <div class="txt">
                <div class="tBox">서울에 사는 홍 대리는 이번 여름휴가를 강원도에서 보내기로 하였다. 초등학교 5학년인 둘째 딸과 함께 통계지리정보서비스(SGIS)를 이용하여 출발 전에 여름휴가에 필요한 이런저런 정보를 알아보고 있는 중이다.</div>
                <div class="subTxt">※ 문제의 정답은 SGIS 포털(’18년 기준 전국사업체조사)에서 문제 힌트를 참고하여 찾아 보시기 바랍니다!</div>
            </div>
            <ul>
                <li class="qList" data-quizno="1">
                    <h2>첫 번째 문제</h2>
                    <div class="quiz">
                        우선, 여름휴가 첫날은 강원도 지역에서 <span class="bold">문화재가 가장 많은 (________)시 또는 군</span>을 방문하기로 하였다.
                    </div>
                    <ul class="answer">
                        <li>
                            <button>
                                <p>1</p> 원주시
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>2</p> 춘천시
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>3</p> 강릉시
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>4</p> 속초시
                            </button>
                        </li>
                    </ul>
                    <div class="hint"><span class="bold2">☞ 힌트</span>  SGIS > 통계주제도 > 복지와 문화 > 문화재현황 선택</div>
                </li>
                <li class="qList" data-quizno="2">
                    <h2>두 번째 문제</h2>
                    <div class="quiz">
                        홍 대리 가족은 강릉시에서 관광하다가 강릉시에서 <span class="bold">펜션이 가장 많은 (________)읍·면·동</span>에서 1박을 하기로 결정하였다.
                    </div>
                    <ul class="answer">
                        <li>
                            <button>
                                <p>1</p> 사천면  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>2</p> 옥계면  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>3</p> 연곡면  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>4</p> 경포동
                            </button>
                        </li>
                    </ul>
                    <div class="hint"><span class="bold2">☞ 힌트</span> SGIS > 대화형 통계지도 > 전국 사업체조사 > 테마업종 > 숙박 > 펜션 선택</div>
                </li>
                <li class="qList" data-quizno="3">
                    <h2>세 번째 문제</h2>
                    <div class="quiz">
                        둘째날은 춘천시 소양호에서 놀다가 춘천시에서 <span class="bold">분식점이 가장 많은 (________)읍·면·동</span>에서 점심을 먹기로 하였다.
                    </div>
                    <ul class="answer">
                        <li>
                            <button>
                                <p>1</p> 석사동  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>2</p> 퇴계동  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>3</p> 소양동  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>4</p> 후평2동
                            </button>
                        </li>
                    </ul>
                    <div class="hint"><span class="bold2">☞ 힌트</span> SGIS > 대화형 통계지도 > 전국 사업체조사 > 테마업종 > 음식점 > 분식 선택</div>
                </li>
                <li class="qList" data-quizno="4">
                    <h2>네 번째 문제</h2>
                    <div class="quiz">
                        춘천에서 점심을 먹은 후, 홍 대리 가족은 오후에 강원도에서 <span class="bold">유원지 및 기타 오락 관련 서비스업 사업체가 가장 많은 (________)시·군</span>으로 이동하기로 하였다.
                    </div>
                    <ul class="answer">
                        <li>
                            <button>
                                <p>1</p> 동해시  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>2</p> 원주시  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>3</p> 영월군  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>4</p> 태백시
                            </button>
                        </li>
                    </ul>
                    <div class="hint"><span class="bold2">☞ 힌트</span> SGIS > 대화형 통계지도 > 전국 사업체조사 > 스포츠 및 오락관련 서비스업 >  유원지 및 기타 오락관련 서비스업</div>
                </li>
                <li class="qList" data-quizno="5">
                    <h2>다섯 번째 문제</h2>
                    <div class="quiz">
                        홍 대리 가족은 원주시의 유원지에서 놀다가 저녁은 <span class="bold">한식점이 가장 많은 (________)읍·면·동</span>에서 하기로 하였다.
                    </div>
                    <ul class="answer">
                        <li>
                            <button>
                                <p>1</p> 개운동  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>2</p> 일산동  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>3</p> 단구동  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>4</p> 흥업면
                            </button>
                        </li>
                    </ul>
                    <div class="hint"><span class="bold2">☞ 힌트</span> SGIS > 대화형 통계지도 > 전국 사업체조사 > 테마업종 > 음식점 > 한식 선택</div>
                </li>
                <li class="qList" data-quizno="6">
                    <h2>여섯 번째 문제</h2>
                    <div class="quiz">
                        홍 대리 가족은 강원도에서 휴식을 마치고 귀경하다가 서울시에서 <span class="bold">꽃집 사업체가 제일 많은 (________)구</span>에 있는 한 꽃집에서 거실 화분에 꽂아 둘 장미꽃을 사기로 하였다.
                    </div>
                    <ul class="answer">
                        <li>
                            <button>
                                <p>1</p> 서초구  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>2</p> 강남구  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>3</p> 종로구  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>4</p> 노원구
                            </button>
                        </li>
                    </ul>
                    <div class="hint"><span class="bold2">☞ 힌트</span> SGIS > 활용서비스 > 업종통계지도 > 생활업종통계지도 > 시군구별 현황 > 소매업 > 꽃집</div>
                </li>
                <li class="qList" data-quizno="7">
                    <h2>일곱 번째 문제</h2>
                    <div class="quiz">
                        꽃을 사고 나서 서울시에서 카페업체가 <span class="bold">제일 많은 (________)구</span>에서 아이스커피를 마시며 여름 휴가를 마치기로 하였다.
                    </div>
                    <ul class="answer">
                        <li>
                            <button>
                                <p>1</p> 서대문구  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>2</p> 마포구  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>3</p> 서초구  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>4</p> 강남구
                            </button>
                        </li>
                    </ul>
                    <div class="hint"><span class="bold2">☞ 힌트</span> SGIS > 활용서비스 > 업종통계지도 > 생활업종통계지도 > 시군구별 현황 > 음식점 > 카페</div>
                </li>
            </ul>
            
            <div class="psnl">
                <h3> 개인정보수집 </h3>
                <div class="tCont">
                    개인정보 수집항목(성명, 휴대전화번호)은 추첨을 통한 상품권 지급 및 분석 목적으로만 사용되며, 경품 지급 후 파기됩니다.
                    개인정보 수집에 동의하지 않으시면 이벤트에 참여하실 수 없습니다.
                </div>

                <table>
                    <colgroup>
                        <col style="width: 90px" />
                        <col style="width: 490px" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>개인정보수집</th>
                            <td>
                                <input name="sChk" type="radio" value="Y" id="A"><label for="A">동의</label>
                                <input name="sChk" type="radio" value="N" id="D"><label for="D">비동의</label>
                                
                            </td>
                        </tr>
                        <tr id="userName" style="display: none;">
                            <th>성명</th>
                            <td><input id="name" type="text" placeholder=""></td>
                        </tr>
                        <tr id="phoneNumber" style="display: none;">
                            <th>핸드폰 번호</th>
                            <td><input id="tel_no" type="text" placeholder=""></td>
                        </tr>

                    </tbody>
                </table>
                <div class="agreey" style="width: 100%;text-align: center;margin-top: 20px;display:none;">
						<button onclick="javascript:oxSubmit();" 
							style="border: 1px solid #386ae8;padding: 5px 15px 7px 15px;
							border-radius: 7px;background-color: #386ae8;color: white;font-size: 14px;font-family: 맑은 고딕;">
							제출완료
						</button>
				</div>
            </div>
        </div>

    </div>
    <%
		}
	%>

</body>

</html>
