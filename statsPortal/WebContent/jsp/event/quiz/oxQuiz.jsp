<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat" %> 
<%@ page import="java.util.Calendar" %> 
<%@ page import="java.util.Date" %> 
<%@ page import="java.util.HashMap" %> 
<%@ page import="java.util.Map" %> 
    
<%
	String bDate = "20190927";

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
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes">

<link rel="stylesheet" type="text/css" href="./css/common.css" />
<link rel="stylesheet" type="text/css" href="./css/ox_quiz_style.css" />

<script src="./js/jquery-1.11.1.min.js"></script>
<script src="./js/default.js"></script>

<script type='text/javascript' src='/js/plugins/jquery-ui-1.10.3.custom.js'></script>
<script type="text/javascript" src="/js/common/includeHead.js"></script>
<script type="text/javascript"  src="/js/common/common.js"></script>

<title>OX퀴즈 문제</title>
<script language="javascript">

window.resizeTo(682,950);
srvLogWrite( "A0", "15", "03", "00", "OX퀴즈 이벤트 뷰", "2019년 SGIS OX퀴즈 대잔치 View" ); //jrj 로그
apiLogWrite2('R0', 'R07', "이벤트", "2019년 SGIS OX퀴즈 대잔치 View",  '00', '없음');

function oxSubmit(){
	var data = oxValidation();
	
	if( data ){
		$.ajax({
	 		type:"POST",
	 		url: "/ServiceAPI/quiz/quiz.json",
	 		data: data,
	 		success:function(data){
				alert("제출이 완료되었습니다.");
				
				srvLogWrite( "A0", "15", "04", "00", "OX퀴즈 등록 및 수정", "2019년 SGIS OX퀴즈 대잔치 등록 및 수정" ); //jrj 로그
				apiLogWrite2('R0', 'R08', "이벤트", "2019년 SGIS OX퀴즈 대잔치 등록 및 수정",  '00', '없음' );
				
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

function oxValidation(){
	var data = {};
	
	var valid = 0;
	
	for( var i=1; i<=7; i++ ){
		if( !$("input:radio[name='q"+i+"']").is(":checked") && valid == 0 ){
			valid = i;
		} else if( valid == 0 ){
			data["ox_"+i] = $(":radio[name='q"+i+"']:checked").val();
		}
	}
	
	if( valid != 0 ){
		alert(valid+"번 퀴즈를 풀지 않았습니다.");
		return false;
	}
	
	if( $("#bigo").val().length > 1000 ){
		alert("비고는 1000자리까지 입력 가능합니다. ");
		return false;
	}
	
	if( $("input[name=agreement]:checked").val() !="Y" ){
		alert("개인정보수집에 동의해 주세요");
		return false;
	}
	
	var sex = $("input[name=sex]:checked").val();
	if(sex !="M" && sex != "F"){
		alert("성별을 선택해주세요");
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
	
	data.sex = sex;
	data.name = name;
	data.tel_no = tel_no;
	data.bigo1 = ( $("#bigo").val() == "" ? " " : $("#bigo").val() );
	
	return data;
}

function imgOnload(){
	
}

</script>
</head>
<body>
	<p>
		<img src="/jsp/event/quiz/img/notice.jpg" style="margin-left: 75px;">
	</p>
	<%
		System.out.println("idx:" + idx +", bDate:"+bDate);
		if( idx < 1 || idx > 19 ){
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
	});
	</script>
	<div class="wrap">
        <div id="quiz_content" class="tit"></div>
        <div class="quiz-box">
           <ul>
                <li class="quiz-list">
                    <div class="quiz">
						<div class="no">1.</div>
                        <div class="question">
							SGIS의 『통계주제도』 서비스에는 “응급의료시설 접근현황” 지표가 있다.
						</div>
                    </div>
                    <div class="answer">
                        <label>
                            <input name="q1" type="radio" value="O"><span>O</span>
                        </label>
                        <label>
                            <input name="q1" type="radio" value="X"><span>X</span>
                        </label>
                    </div>
                    <div class="hint">
						☞ (힌트) 통계주제도>복지와 문화 분야의 세부지표에서 확인<br/>
						☞ (해설) 통계주제도 “응급의료시설 접근현황” 지표에서는 응급의료시설로부터 차로 이동시간별<br/>
						<span style="padding-left: 38px;"></span>(5분/10분/30분)인구현황을 확인할 수 있다.
                    </div>
                </li>
                <li class="quiz-list">
                    <div class="quiz">
                        <div class="no">2.</div>
                        <div class="question">
							SGIS의 『업종통계지도』 서비스의 “업종밀집도 변화”를 보면 숙박업(3종) 중 호텔 수는 2016년 총사업체 760개에서 2017년 800개로 늘어났다.
                        </div>
                    </div>
                    <div class="answer">
                        <label>
                            <input name="q2" type="radio" value="O"><span>O</span>
                        </label>
                        <label>
                            <input name="q2" type="radio" value="X"><span>X</span>
                        </label>
                    </div>
                    <div class="hint">
						☞ (힌트) 활용서비스>업종통계지도>생활업종현황>업종밀집도 변화>숙박(3종)>호텔 검색항목 확인<br/>
						☞ (해설) “생활업종현황” 중 “업종밀집도 변화” 서비스를 보면 음식점(11종), 도소매(11종),<br/>
						<span style="padding-left: 38px;"></span>서비스(11종), 숙박(3종)의 업종밀집도 변화를 확인할 수 있다.
                    </div>
                </li>
                <li class="quiz-list">
                    <div class="quiz">
                        <div class="no">3.</div>
                        <div class="question">
                        	SGIS의 『활용서비스』 중 “살고싶은 우리동네”의 지표설정 시, 자연 분야는 대기오염도, 생활날씨, 녹지비율, 수질오염도 등 4개 세부지표로 구성되어 있다.
                        </div>
                    </div>
                    <div class="answer">
                        <label>
                            <input name="q3" type="radio" value="O"><span>O</span>
                        </label>
                        <label>
                            <input name="q3" type="radio" value="X"><span>X</span>
                        </label>
                    </div>
                    <div class="hint">
						☞ (힌트) 활용서비스>살고싶은 우리동네>추천지역찾기>지표설정>자연<br/>
						☞ (해설) “살고싶은 우리동네”의 지표설정 시 자연 분야는 대기오염도, 생활날씨, 녹지비율 등 3개<br/>
						<span style="padding-left: 38px;"></span>세부지표로 구성되어 있다.
                    </div>
                </li>
                <li class="quiz-list">
                    <div class="quiz">
                        <div class="no">4.</div>
                        <div class="question">
							SGIS의 『분석지도』메뉴에는 “월간통계”, “인구피라미드”, “고령화 현황보기”, “성씨분포”, “정책통계지도” 서비스가 있다.
                        </div>
                    </div>
                    <div class="answer">
                        <label>
                            <input name="q4" type="radio" value="O"><span>O</span>
                        </label>
                        <label>
                            <input name="q4" type="radio" value="X"><span>X</span>
                        </label>
                    </div>
                    <div class="hint">
						☞ (힌트) 분석지도> 검색항목 확인<br/>
						☞ (해설) 정책통계지도는 활용서비스에 포함됨. 분석지도에는 월간통계, 인구피라미드, 고령화 현황보기,<br/>
						<span style="padding-left: 38px;"></span>성씨분포, 지방의 변화보기 서비스가 있다.
                    </div>
                </li>
                <li class="quiz-list">
                    <div class="quiz">
                        <div class="no">5.</div>
                        <div class="question">
							2019년 6월 기준, 서울시 출생아 수는 5,331명이다.
                        </div>
                    </div>
                    <div class="answer">
                        <label>
                            <input name="q5" type="radio" value="O"><span>O</span>
                        </label>
                        <label>
                            <input name="q5" type="radio" value="X"><span>X</span>
                        </label>
                    </div>
                    <div class="hint">
						☞ (힌트) 월간통계>인구동향>출생아 수 지표 확인<br/>
						☞ (해설) SGIS의 월간통계 중 출생아 수 지표를 선택한 후, 데이터보드의 선택지역에서 “서울”을 선택하면<br/>
						<span style="padding-left: 38px;"></span>서울시 출생아 수가 4,331명임을 확인할 수 있다.
                    </div>
                </li>
                <li class="quiz-list">
                    <div class="quiz">
                        <div class="no">6.</div>
                        <div class="question">
							전국인구추계 피라미드에서 인구성장을 중위로 가정했을 때 2067년의 평균연령은 57세이다.
                        </div>
                    </div>
                    <div class="answer">
                        <label>
                            <input name="q6" type="radio" value="O"><span>O</span>
                        </label>
                        <label>
                            <input name="q6" type="radio" value="X"><span>X</span>
                        </label>
                    </div>
                    <div class="hint">
						☞ (힌트) 분석지도>인구피라미드>전국인구추계 피라미드<br/>
						☞ (해설) 인구성장가정을 중위로 하고 기준연도를 2067년으로 할 때 평균연령은 57세이다.
                    </div>
                </li>
                <li class="quiz-list">
                    <div class="quiz">
                        <div class="no">7.</div>
                        <div class="question">
							SGIS의『분석지도』메뉴 중 “고령화현황보기”를 보면, 2017년 인구주택총조사 기준, 경상북도의 노인인구비율은 19.0%이다.
                        </div>
                    </div>
                    <div class="answer">
                        <label>
                            <input name="q7" type="radio" value="O"><span>O</span>
                        </label>
                        <label>
                            <input name="q7" type="radio" value="X"><span>X</span>
                        </label>
                    </div>
                    <div class="hint">
						☞ (힌트) 분석지도>고령화현황보기>고령화주제도>노인인구비율<br/><span style="padding-left: 38px;"></span>
						☞ (해설) 고령화현황보기 중 고령화주제도의 노인인구비율은 2017년 기준, 전국 14.2%이고<br/>경북은 19.0%임을 확인할 수 있다.
                    </div>
                </li>
                <li class="memo">
					※ SGIS 서비스를 이용하면서 느낀 점 또는 개선해야할 것이 있다면 자유롭게 적어 주시기 바랍니다. 
                    <textarea id="bigo" cols="30" rows="5"></textarea>
                </li>
            </ul>
           <div class="bg">
                <div class="bg-1">
                    <img src="./img/leaf_1.png" alt=""/>
                </div>
                <div class="bg-2">
                    <img src="./img/leaf_2.png" alt="" />
                </div>
                <div class="bg-3">
                    <img src="./img/leaf_3.png" alt="" />
                </div>
            </div>
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
                    <input name="agreement" type="radio" value="Y" onclick="javascript:agreeCheck(true);">
                    <span>동의</span>
                </label>
                <label>
                    <input name="agreement" type="radio" value="N" onclick="javascript:agreeCheck(false);" checked="checked">
                    <span>비동의</span>
                </label>
            </p>
            <p class="agreey p0" style="display:none;">
                성별 :
                <label>
                    <input name="sex" type="radio" value="M">
                    <span>남</span>
                </label>
                <label>
                    <input name="sex" type="radio" value="F">
                    <span>여</span>
                </label>
            </p>
            <p class="agreey p4" style="display:none;">
                성명 : <input id="name" type="text" placeholder="">
            </p>
            <p class="agreey p4" style="display:none;">
                휴대전화번호 : <input id="tel_no" type="text" placeholder="">
            </p>
			<div class="agreey" style="width: 100%;text-align: center;margin-top: 20px; display:none;">
				<button onclick="javascript:oxSubmit();" 
					style="border: 1px solid #a07f7f;padding: 5px 15px 7px 15px;
					border-radius: 7px;background-color: #a07f7f;color: white;font-size: 14px;font-family: 맑은 고딕;">
					제출완료
				</button>
			</div>
        </div>
    </div>
    <%
		}
	%>
</body>
</html>
