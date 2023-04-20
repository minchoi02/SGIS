<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat" %> 
<%@ page import="java.util.Calendar" %> 
<%@ page import="java.util.Date" %> 
<%@ page import="java.util.HashMap" %> 
<%@ page import="java.util.Map" %> 
    
<%
	String bDate = "20200828"; //2020.08.28~09.16

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
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="stylesheet" href="resources/css/base.css">
    <link rel="stylesheet" href="resources/css/common.css">

	<script src="./resources/js/jquery-1.11.1.min.js"></script>
	<script src="./resources/js/default.js"></script>
	
	<script type='text/javascript' src='/js/plugins/jquery-ui-1.10.3.custom.js'></script>
	<script type="text/javascript" src="/js/common/includeHead.js"></script>
	<script type="text/javascript"  src="/js/common/common.js"></script>

<title>2020년 [My통계로] 길라잡이 퀴즈 이벤트</title>
<script language="javascript">	
	srvLogWrite( "A0", "15", "03", "00", "OX퀴즈 이벤트 뷰", "2020년 [My통계로] 길라잡이 퀴즈 이벤트" ); 
	apiLogWrite2('R0', 'R07', "이벤트", "2020년 [My통계로] 길라잡이 퀴즈 이벤트",  '00', '없음');

	function oxSubmit(){
		var data = oxValidation();
		
		if( data ){
			$.ajax({
				type:"POST",
				url: "/ServiceAPI/quiz/quiz.json",
				data: data,
				success:function(data){
					alert("제출이 완료되었습니다.");
					
					srvLogWrite( "A0", "15", "04", "00", "OX퀴즈 등록 및 수정", "2020년 [My통계로] 길라잡이 퀴즈 이벤트 등록 및 수정" ); //jrj 로그
					apiLogWrite2('R0', 'R08', "이벤트", "2020년 [My통계로] 길라잡이 퀴즈 이벤트 등록 및 수정",  '00', '없음' );
					
					window.close();
				},
				error:function(data){
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
<body style="overflow-X:hidden">
	<p style="margin-bottom:120px; width:720px; text-align:center;">
		<img src="./resources/images/notice.png">
	</p>
<%
	//System.out.println("idx:" + idx +", bDate:"+bDate);
	if(idx < 1 || idx > 20){
%>
	<script type="text/javascript">  
		alert("이벤트 기간이 아닙니다.");
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
		
		function call_parent(){
			window.opener.location.href =  window.location.protocol+"//"+window.location.host + '/view/statsMe/statsMeMain';
		}
	</script>

	
    <div class="wrap" style="margin: 0px;">
        <div id="quiz_content" class="tit"><h1></h1></div>
        <div class="quizBox">
            <div class="txt">
                <div class="tBox">통계청에서는 일반 국민들이 쉽고 편리하게 공간통계정보를 이용할 수 있도록 &nbsp;「MY통계로」를 개발하여 2020년 2월 21일부터 서비스 중에 있습니다. &nbsp;「MY통계로」&nbsp; 홍보와 이용 활성화를 위해 '2020년 &nbsp;「MY통계로」&nbsp; 길라잡이 퀴즈 이벤트'를 개최하오니 많은 참여 바랍니다. </div>
                <div class="subTxt">※ 문제의 정답은 SGIS &nbsp;「MY통계로」&nbsp;에 접속하시어 우측상단에 있는 <a onclick="call_parent();" style="color:#26bfd7;cursor:pointer;"><u>'슬기로운 My통계로 사용법'</u></a>을 참고하시기 바랍니다.</div>
            </div>
            <ul>
                <li class="qList" data-quizno="1"> 
                    <h2>첫 번째 문제</h2>
                    <div class="quiz">
                        혼자사는 여성 A씨가 근무지 이동에 따라 불가피하게 이사할 예정이다. A씨가 1단계 '생애주기'에서 선택해야 할 대상은?
                    </div>
                    <ul class="answer">
                        <li>
                            <button>
                                <p>1</p> 1인가구  
                            </button> 
                        </li>
                        <li>
                            <button>
                                <p>2</p> 육아여성  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>3</p> 청년  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>4</p> 중장년
                            </button>
                        </li>
                    </ul>
                    <div class="hint"><span class="bold2">☞ 힌트</span>  MY통계로>슬기로운 MY통계로 사용법 1회>생애주기</div>
                </li>
                <li class="qList" data-quizno="2">
                    <h2>두 번째 문제</h2>
                    <div class="quiz">
                        혼자 사는 사람이 많고 주거환경이 안전한 지역을 선택하기 위해 A씨가 선택해야 할 2단계 '관심분야'는 무엇인가?
                    </div>
                    <ul class="answer">
                        <li>
                            <button>
                                <p>1</p> 살거리    
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>2</p> 일거리    
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>3</p> 보고놀거리    
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>4</p> 안전거리
                            </button>
                        </li>
                    </ul>
                    <div class="hint"><span class="bold2">☞ 힌트</span> MY통계로>슬기로운 MY통계로 사용법 1회>관심분야</div>
                </li>
                <li class="qList" data-quizno="3">
                    <h2>세 번째 문제</h2>
                    <div class="quiz">
                        생애주기와 관심분야는 각각 최대 몇개까지 선택이 가능한가?
                    </div>
                    <ul class="answer">
                        <li>
                            <button>
                                <p>1</p> 2개    
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>2</p> 1개    
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>3</p> 3개    
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>4</p> 제한없음
                            </button>
                        </li>
                    </ul>
                    <div class="hint"><span class="bold2">☞ 힌트</span> MY통계로>슬기로운 MY통계로 사용법 1회>생애주기와 관심분야 우측하단</div>
                </li>
                <li class="qList" data-quizno="4">
                    <h2>네 번째 문제</h2>
                    <div class="quiz">
                        카탈로그에서 통계지리정보 중 '안전'관련정보를 보다 빠르게 검색하기 위해서 이용하면 좋은 것은?
                    </div>
                    <ul class="answer">
                        <li>
                            <button>
                                <p>1</p> 추천키워드    
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>2</p> 결과내 검색  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>3</p> 우리동 인기 키워드  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>4</p> 제한없음
                            </button>
                        </li>
                    </ul>
                    <div class="hint"><span class="bold2">☞ 힌트</span> MY통계로>슬기로운 MY통계로 사용법 1회>카탈로그</div>
                </li>
                <li class="qList" data-quizno="5">
                    <h2>다섯 번째 문제</h2>
                    <div class="quiz">
                        편찮으신 부모님을 위해 B씨는 부모님의 요양시설을 찾아보려고 한다. 2단계 관심분야에서 '건강거리'의 통계정보내용이 아닌 것은?
                    </div>
                    <ul class="answer">
                        <li>
                            <button>
                                <p>1</p> 병의원    
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>2</p> 노인    
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>3</p> 교육기관    
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>4</p> 문화시설 수
                            </button>
                        </li>
                    </ul>
                    <div class="hint"><span class="bold2">☞ 힌트</span> MY통계로>슬기로운 MY통계로 사용법 2회>관심분야</div>
                </li>
                <li class="qList" data-quizno="6">
                    <h2>여섯 번째 문제</h2>
                    <div class="quiz">
                        B씨는 75개의 카탈로그 중에서 '결과 내 검색'을 이용하여 요양시설과 관련된 1개의 정보를 확인할 수 있었다. 그 내용이 옳은 것은?
                    </div>
                    <ul class="answer">
                        <li>
                            <button>
                                <p>1</p> 노인요양시설 분포 현황  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>2</p> 고령인구 비율  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>3</p> 노령화 지수  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>4</p> 응급의료시설
                            </button>
                        </li>
                    </ul>
                    <div class="hint"><span class="bold2">☞ 힌트</span> MY통계로>슬기로운 MY통계로 사용법 2회>카탈로그>결과내검색>요양시설</div>
                </li>
                <li class="qList" data-quizno="7">
                    <h2>일곱 번째 문제</h2>
                    <div class="quiz">
                        K씨는 부산에서 10∼20대를 대상으로 하는 외식업을 창업하려 한다. 외식업 관련 공간통계정보를 검색하기 위해 K씨가 선택해야 할 2단계 '관심분야'는 무엇인가?
                    </div>
                    <ul class="answer">
                        <li>
                            <button>
                                <p>1</p> 탈거리   
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>2</p> 먹거리  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>3</p> 배울거리  
                            </button>
                        </li>
                        <li>
                            <button>
                                <p>4</p> 건강거리
                            </button>
                        </li>
                    </ul>
                    <div class="hint"><span class="bold2">☞ 힌트</span> MY통계로>슬기로운 MY통계로 사용법 3회>관심분야</div>
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
                        <col style="width: 120px" />
                        <col style="width: 398px" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>개인정보수집</th>
                            <td style="height:39px;">
                                <label><input name="sChk" type="radio" value="Y">동의</label> &nbsp;&nbsp;&nbsp;&nbsp; 
                                <label><input name="sChk" type="radio" value="N">비동의</label>                                
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
