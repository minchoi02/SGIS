<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="java.text.SimpleDateFormat" %> 
<%@ page import="java.util.Calendar" %> 
<%@ page import="java.util.Date" %> 
<%@ page import="java.util.HashMap" %> 
<%@ page import="java.util.Map" %> 
<%
	String bDate = "20210108"; //2020.12.10(목) ~ 2020.12.17(목) 8일간 
	
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
 <html lang="ko" style="min-width:820px;"> 

	<head> 
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta charset="utf-8"> 
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	<script src="/publish_2018/include/plugin/jquery-1.11.3.min.js" type="text/javascript"></script>
	<script src="/publish_2018/include/plugin/slick/slick.min.js" type="text/javascript"></script>
	<script src="/publish_2018/include/js/ui.js" type="text/javascript"></script>
	 
	<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery-ui-1.10.3.custom.js'></script>
	<script type='text/javascript' src='/js/plugins/jquery.sha256.js'></script>  
	<script src='/js/plugins/durian-v2.0.js'></script> 
	<script src='/js/common/sop.portal.absAPI.js'></script> 
	<script type='text/javascript' src='/js/plugins/common.js'></script> 
	<script type='text/javascript' src='/js/plugins/ui.js'></script> 
	<script type='text/javascript' src='/js/plugins/html5shiv.js'></script> 

	<script src="/js/common/common.js"></script>
	 
    <script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
	<script type="text/javascript" src='/js/plugins/jquery.form.js'></script>
<!-- 	<script type="text/javascript" src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script> -->
		 
	<script src="/js/board/jquery.paging.js"></script>	
	
    <link rel="stylesheet" href="./resources/css/base.css">
    <link rel="stylesheet" href="./resources/css/common.css">
    
   	<title>2021년 통계지리정보(SGIS) 신규 콘텐츠 이름고르기 이벤트</title>
    
    <script type="text/javascript">    
		var wsize = 800;
     	var hsize = 1500;
     	
     	
     	document.onreadystatechange=resizeFrame;
     	function resizeFrame(){
	    	 try{
	    		 self.resizeTo(wsize, hsize);
	    	 }catch(e){
    	 	}
	   	}
	     	
		$(document).ready(function(){
			srvLogWrite( "A0", "15", "03", "00", "이벤트", "2021년 통계지리정보(SGIS) 신규 콘텐츠 이름고르기 이벤트 View" );
			apiLogWrite2('R0', 'R07', "이벤트", "2021년 통계지리정보(SGIS) 신규 콘텐츠 이름고르기 이벤트 View",  '00', '없음');

			apiLogWrite3("R05","2021년 통계지리정보(SGIS) 신규 콘텐츠 이름고르기 이벤트 view");

			var offset = $("#surveyList").offset();
			if( offset ){
				$("html, body").animate({scrollTop : offset.top }, 1000);
			}		
		});
		
		function fnAgree(val){
			$("input:radio[name=agreement]:input[value=" +val+"]").prop("checked", true);

// 			if(val == "Y"){
// 				$("#info-1").show();
// 			} else {
// 				$("#info-1").hide();
// 			}
		}

		
		function setVal( qNum, val, aNum, obj ){
			var notItems = ".nohidden";

// 			if( obj && $(obj).closest(".answerList").find("input") && $(obj).closest(".answerList").find("input").val() != "" ){
// 				$(obj).closest(".answerList").find("input").val("");
// 			}
			
			$("#srv"+qNum+" button").removeClass('on');
			$("#srv"+qNum+" button").eq(aNum-1).addClass('on');
					
		}
		
		function surveyEnter(){
			if(!$('#agreementY').is(':checked')){
				alert("개인정보 수집에 동의하지 않으시면 이벤트에 참여하실 수 없습니다.");
				return false;
				
			}
			if(confirm("제출하시겠습니까?") == true){
				var params = {};
			
				params.survay1 = $("#srv1 button.on p").text(); if( !isValid("1",params.survay1) ) return false;				
				if( $("#etc1").val() ) params.etc1 = $("#etc1").val();

				params.survay2 = $("#srv2 button.on p").text(); if( !isValid("3",params.survay2) ) return false;
				if( $("#etc2").val() ) params.etc2 = $("#etc2").val();

				if($("#name").val()==""){
					alert("성명을 입력해주세요");
					$("#name").focus();
					return false;
				}
				params.name = $("#name").val();
				
				if($("#tel_no").val()==""){
					alert("핸드폰 번호를 입력해주세요");
					$("#tel_no").focus();
					return false;
				} 
				params.tel_no = $("#tel_no").val();
				
				
				$.ajax({
			 		type:"POST",
			 		url: "/ServiceAPI/quiz/survey.json",
			 		data: params,
			 		success:function(data){
			 			if(data.result.resultCnt > 0){
		 					alert("수정되었습니다.");
			 			} else {
	 						srvLogWrite( "A0", "15", "04", "00", "이벤트", "2021년 통계지리정보(SGIS) 신규 콘텐츠 이름고르기 이벤트" ); 
	 						apiLogWrite2('R0', 'R08', "이벤트", "2021년 통계지리정보(SGIS) 신규 콘텐츠 이름고르기 이벤트",  '00', '없음' );
	 						
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
			$.each( $( button ).find("button.on p"), function( i , item ){
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
		
		// 이건 언제 생긴건가요??? 갸웃~*()
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
// 					console.log("apiLogWrite3 등록 성공");
		 		},
		 		error:function(data) {
// 					console.log("apiLogWrite3 등록 실패" + data); 
		 		}
			});
		}
		
	</script>

</head>

<body>

    <div class="wrap">
        <div class="tit">
            <h1></h1>
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
			    

        <div class="Box">

            <div class="tit">
                <div class="tit01"> 배후권 통계지도 서비스 (가칭) 
                </div>
                <button class="tit_btn" onclick="javascript:window.open('/jsp/event/2021_name/resources/a.mp4', '', 'width=1220,height=680');">소개 영상 보기</button>
            </div>
            <div class="cont">
                <div class="cont01">

                    <div class="screen">
                        <img src="./resources/images/img01.png" alt="">
                    </div>
                    <img src="./resources/images/img03.png" alt="">
                </div>
                <div class="quizbox">
                    <div class="quiz">
                        1. 콘텐츠에 어울리는 이름을 선택하세요. <span class="green">(필수)</span>
                    </div>
                    <ul>
                        <li class="quizList" id="srv1">
                            <table>
                                <colgroup>
                                    <col style="width: 64px" />
                                    <col style="width: 160px" />
                                    <col style="width: 416px" />

                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>후보</th>
                                        <th>서비스명</th>
                                        <th>의미</th>
                                    </tr>
                                    <tr onclick="setVal(1,1,1)">
                                        <td class="answerList"><button onclick="setVal(1,1,1)"><p>1</p></button></td>
                                        <td> 생활반경 통계지도</td>
                                        <td> 실제 생활반경 내에 있는 통계정보를 제공한다는 의미 </td>
                                    </tr>
                                    <tr onclick="setVal(1,2,2)">
                                        <td class="answerList"><button onclick="setVal(1,2,2)"><p>2</p></button></td>
                                        <td> 생활권역 통계지도</td>
                                        <td> 생활반경이라는 말보다 생활권역이라는 용어가 더 친숙함 </td>
                                    </tr>
                                    <tr onclick="setVal(1,3,3)">
                                        <td class="answerList"><button onclick="setVal(1,3,3)"><p>3</p></button></td>
                                        <td> 길따라 통계지도</td>
                                        <td> 영향권 내에서 길을 따라 정보를 제공하는 지도 서비스 </td>
                                    </tr>
                                    <tr onclick="setVal(1,4,4)">
                                        <td class="answerList"><button onclick="setVal(1,4,4)"><p>4</p></button></td>
                                        <td> 생활둘레 통계지도</td>
                                        <td> 사용자가 선택한 지점에서 어떤 둘레까지 영향권인지를 제공하는 지도 서비스 </td>
                                    </tr>
                                    <tr onclick="setVal(1,5,5)">
                                        <td class="answerList"><button onclick="setVal(1,5,5)"><p>5</p></button></td>
                                        <td> 배후권역 통계지도</td>
                                        <td> “배후상권, 배후단지”처럼 배후 뒤에 권역을 넣어서, 어떤 목적의 서비스인지 명확히 나타냄</td>
                                    </tr>
                                    <tr>
                                </tbody>
                            </table>
                        </li>
                    </ul>
                    <div class="quiz">
                        2. 보기에 없는 새로운 콘텐츠명을 제안하거나, 기타 의견을 입력하세요. <span class="green">(선택)</span>
                    </div>

                    <textarea id="etc1" cols="30" rows="5"></textarea>

                </div>
            </div>
        </div>
        <div class="Box">

            <div class="tit">
                <div class="tit01">총조사 시각화 지도 서비스 (가칭)</div>
                <button class="tit_btn" onclick="javascript:window.open('/jsp/event/2021_name/resources/c.mp4', '', 'width=1220,height=680');">소개 영상 보기</button>
            </div>
            <div class="cont">
                <div class="cont01">

                    <div class="screen">
                        <img src="./resources/images/img02.png" alt="">
                    </div>
                    <img src="./resources/images/img04.png" alt="">
                </div>
                <div class="quizbox">
                    <div class="quiz">
                        3. 콘텐츠에 어울리는 이름을 선택하세요. <span class="green">(필수)</span>
                    </div>
                    <ul>
                        <li class="quizList" id="srv2">
                            <table>
                                <colgroup>
                                    <col style="width: 64px" />
                                    <col style="width: 160px" />
                                    <col style="width: 416px" />

                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>후보</th>
                                        <th>서비스명</th>
                                        <th>의미</th>
                                    </tr>
                                    <tr onclick="setVal(2,1,1)">
                                        <td class="answerList"><button onclick="setVal(2,1,1)"><p>1</p></button></td>
                                        <td> 총조사 시각화 지도</td>
                                        <td> 총조사 결과를 지도와 함께 시각화한 서비스 </td>
                                    </tr>
                                    <tr onclick="setVal(2,2,2)">
                                        <td class="answerList"><button onclick="setVal(2,2,2)"><p>2</p></button></td>
                                        <td> 총조사 지도 시각화</td>
                                        <td> 총조사 결과를 지도와 함께 시각화한 서비스 </td>
                                    </tr>
                                    <tr onclick="setVal(2,3,3)">
                                        <td class="answerList"><button onclick="setVal(2,3,3)"><p>3</p></button></td>
                                        <td> 총조사 대시보드</td>
                                        <td> 총조사 결과를 대시보드 형태로 구성한 서비스</td>
                                    </tr>
                                    <tr onclick="setVal(2,4,4)">
                                        <td class="answerList"><button onclick="setVal(2,4,4)"><p>4</p></button></td>
                                        <td> 총조사 통계 시각화 지도</td>
                                        <td> 총조사 통계자료를 지도형태로 시각화한 서비스 </td>
                                    </tr>
                                    <tr onclick="setVal(2,5,5)">
                                        <td class="answerList"><button onclick="setVal(2,5,5)"><p>5</p></button></td>
                                        <td> 총조사로 보는 한국</td>
                                        <td> 총조사 결과를 통해 한국의 변화를 확인하는 서비스</td>
                                    </tr>
                                    <tr> 
                                </tbody>
                            </table>
                        </li>
                    </ul>
                    <div class="quiz">
                        4. 보기에 없는 새로운 콘텐츠명을 제안하거나, 기타 의견을 입력하세요. <span class="green">(선택)</span>
                    </div>

                    <textarea id="etc2" cols="30" rows="5"></textarea>

                </div>
            </div>
        </div>
        
        <div class="psnBox">
            <div class="quiz">
                □ 개인정보 수집 및 활용 동의 안내
            </div>
            <div class="txt">
               【개인정보 수집 및 활용】<br><br>
                개인정보 수집항목(성명, 휴대전화번호)은 추첨을 통한 상품권 지급 및 분석 목적으로만 사용되며, 경품 지급 후 파기됩니다. <br>
                개인정보 수집에 동의하지 않으시면 이벤트에 참여하실 수 없습니다.

            </div>
            <table class="psnTable">
                <colgroup>
                    <col style="width: 150px" />
                    <col style="width: 500px" />
                </colgroup>
                <tbody>
                    <tr>
                        <th>개인정보 수집</th>
                        <td>
                            <label onclick="fnAgree('Y');"><input type="radio" id="agreementY" name="agreement" value="Y" />동의</label>
                            <label onclick="fnAgree('N');"><input type="radio" id="agreementN" name="agreement" value="N" />비동의</label>
                        </td>
                    </tr>
                    <tr>
                        <th>성명</th>
                        <td><input type="text" id="name"></td>
                    </tr>
                    <tr>
                        <th>휴대전화번호</th>
                        <td><input type="text" id="tel_no" maxlength="11" onkeydown="onlyNumber(this);"></td>
                    </tr>

                </tbody>
            </table>
            <div id="info-1">
            	<button class="btn" onclick="surveyEnter();">제출하기</button>
            </div>
        </div>

    </div>


		<%
			}
		%>       
    </div>
&nbsp;<br>&nbsp;<br>    
</body>
</html>
