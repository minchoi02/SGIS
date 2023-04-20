<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="java.text.SimpleDateFormat" %> 
<%@ page import="java.util.Calendar" %> 
<%@ page import="java.util.Date" %> 
<%@ page import="java.util.HashMap" %> 
<%@ page import="java.util.Map" %> 
<%
	String bDate = "20200318";
	
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
		var wsize = 820;
     	var hsize = 3227;
     	
     	document.onreadystatechange=resizeFrame;
     	function resizeFrame(){
	    	 try{
	    		 self.resizeTo(wsize, hsize);
	    	 }catch(e){
    	 	}
	   	}
	     	
		$(document).ready(function(){
			srvLogWrite( "A0", "15", "03", "00", "이벤트", "2020년 SGIS 이용자 설문조사 View" );
			apiLogWrite2('R0', 'R07', "이벤트", "2020년 SGIS 이용자 설문조사 View",  '00', '없음');
			
			$.ajax({
				method : "POST",
		        async : true,
		        url : contextPath + "/ServiceAPI/map/allAddressList.json",
		        data : {
		        	sido_cd : 11,
		        	base_year : 2019
		        },
		        success : function(res){
					if (res.errCd == "0") {
						var result = res.result;
						if( result && result.sidoList ){
							var html = '<option value="">시도</option>';
							for( var i=0; i<result.sidoList.length; i++ ){
								html += '<option value="'+ result.sidoList[i].sido_cd+'">'+result.sidoList[i].sido_nm+'</option>';
							}
			                $("#sidoSel").html( html );
						}
					}
				}
			});
			
			$("#sidoSel").on("change",function(){
				$.ajax({
					method : "POST",
			        async : true,
			        url : contextPath + "/ServiceAPI/map/sggAddressList.json",
			        data : {
			        	sido_cd : $(this).val(),
			        	base_year : 2019
			        },
			        success : function(res){
						if (res.errCd == "0") {
							var result = res.result;
							if( result && result.sggList ){
								var html = '<option value="">시군구</option>';
								for( var i=0; i<result.sggList.length; i++ ){
									html += '<option value="'+ result.sggList[i].sgg_cd+'">'+result.sggList[i].sgg_nm+'</option>';
								}
				                $("#sggSel").html( html );
				                $("#admSel option").not("[value='']").remove()
							}
						}
					}
				});
			});
			
			$("#sggSel").on("change",function(){
				$.ajax({
					method : "POST",
			        async : true,
			        url : contextPath + "/ServiceAPI/map/admAddressList.json",
			        data : {
			        	sido_cd : $("#sidoSel").val(),
			        	sgg_cd : $(this).val(),
			        	base_year : 2019
			        },
			        success : function(res){
						if (res.errCd == "0") {
							var result = res.result;
							if( result && result.admList ){
								var html = '<option value="">읍면동</option>';
								for( var i=0; i<result.admList.length; i++ ){
									html += '<option value="'+ result.admList[i].emdong_cd+'">'+result.admList[i].emdong_nm+'</option>';
								}
				                $("#admSel").html( html );
							}
						}
					}
				});
			});
			
			$("input:radio[name=srv10]").on("change", function(){
				if( $(this).val() != "11" ){
					$("#etc8").val("");
				}
			});
			
			$('input').focusin(function(){
				if( this.id == "etc8" ){
					$("input:radio[name=srv10]:input[value='11']").prop("checked", true);
				} else {
					if( !(this.id == "etc11" || this.id == "etc5") ){
						$(this).closest(".quizList").find("button").removeClass("on");
					}
					$(this).closest(".answerList").find("button").attr("class","on");
				}
			});
			
			apiLogWrite3("R05","2020년 설문조사 view");

			var offset = $("#survey_content").offset();
			if( offset ){
				$("html, body").animate({scrollTop : offset.top }, 200);
			}
		});
		
		function fnAgree(val){
			$("input:radio[name=agreement]:input[value=" +val+"]").prop("checked", true);
			
			if(val == "Y"){
				$(".quizBtn,#info-1").css("display","").show();
			} else {
				$(".quizBtn,#info-1").css("display","none").hide();
			}
		}

		function setEtcVal( qNum, val, aNum, obj ){
			this.event.preventDefault(); //이벤트 전파 중지
			
			if($(obj).closest("label").find("button").hasClass('on')){
				if( obj && $(obj).closest(".answerList").find("input") && $(obj).closest(".answerList").find("input").val() != "" ){
					$(obj).closest(".answerList").find("input").val("");
				}
				$(obj).closest("label").find("button").removeClass('on');
			} else {
				$(obj).closest("label").find("button").addClass('on');

				if( qNum == "11" || qNum == "5"){ 
		 			$("#etc"+ qNum).focus();
	 			} else if( qNum == "41" || qNum == "42" || qNum == "11" ){
					$("#srv"+(qNum)+" li label>button").removeClass('on');
					$("#srv"+(qNum)+" li label>button").eq(aNum-1).addClass('on');

					if( !$("#srv"+(qNum)+" input") ){
						$("#srv"+(qNum)).find("input").val("");
					}
	 			}
			}
		}
		
		function setVal( qNum, val, aNum, obj ){
			var notItems = "";
			if( qNum == "1" && val == "5" ){
				if( $("input:radio[name=agreement]:checked").val() == "Y" ){
					notItems = ".nohidden, #info-1";
				} else {
					notItems = ".nohidden";
				}
				$(".quizList, .quizTit").not(notItems).css("display","none").hide();
			} else if( qNum == "1" && val != "5" ){
				if( $("#srv6 button.on").text() == "5" || $("#srv6 button.on").text() == "" || !$("#srv6 button.on").text()){
					notItems = ".srv61, .srv62";
				} else if( $("#srv6 button.on").text() == "1" || $("#srv6 button.on").text() == "2" ){
					notItems = ".srv62";
				} else if( $("#srv6 button.on").text() == "3" || $("#srv6 button.on").text() == "4" ){
					notItems = ".srv61";
				}
				
				if( $("input:radio[name=agreement]:checked").val() != "Y" ){
					notItems += ",#info-1";
				}
				
				$(".quizList, .quizTit").not( notItems ).css("display","").show();
			}
			
			if( obj && $(obj).closest(".answerList").find("input") && $(obj).closest(".answerList").find("input").val() != "" ){
				$(obj).closest(".answerList").find("input").val("");
			}
			
			if( qNum == '11' || qNum == '5' ){
				if( $( obj ).hasClass('on') ){
					$( obj ).removeClass('on');
				} else {
					$( obj ).addClass('on');
				}
			} else {
				if( qNum == '6' ){
					if( val == '1' || val == '2' ){
						$("#srv61").closest('.quizList').css("display","").show();
						$("#srv62").closest('.quizList').css("display","none").hide();
						$("#srv62 button").removeClass("on");
						$("#etc62").val("");
					} else if( val == '3' || val == '4' ){
						$("#srv61").closest('.quizList').css("display","none").hide();
						$("#srv62").closest('.quizList').css("display","").show();
						$("#srv61 button").removeClass("on");
						$("#etc61").val("");
					} else {
						$("#srv61, #srv62").closest('.quizList').css("display","none").hide();
						$("#srv61 button, #srv62 button").removeClass("on");
						$("#etc61, #etc62").val("");
					}
					
					$("#srv"+qNum+" button").removeClass('on');
					$("#srv"+qNum+" button").eq(aNum-1).addClass('on');
				} else {
					/* if( qNum == "3" && aNum != 5 ){ $("#etc31").val(""); }
					else if( qNum == "31" && aNum != 5 ){ $("#etc31").val(""); }
					else if( qNum == "4" && aNum != 9 ){ $("#etc4").val(""); }
					else if( qNum == "41" && aNum != 5 ){ $("#etc41").val(""); }
					else if( qNum == "61" && aNum != 5 ){ $("#etc61").val(""); }
					else if( qNum == "62" && aNum != 5 ){ $("#etc62").val(""); } */
					
					$("#srv"+qNum+" button").removeClass('on');
					$("#srv"+qNum+" button").eq(aNum-1).addClass('on');
				}
			}
		}
		
		function surveyEnter(){
			if(confirm("제출하시겠습니까?") == true){
				var params = {};
				params.survay1 = $("#srv1 button.on").text(); if( !isValid("1",params.survay1) ) return false; ;
				
				if( params.survay1 != "5" ){
					params.survay2 = dupText( $("#srv11") ); if( !isValid("1-1",params.survay2) ) return false;;
					params.survay3 = $("#srv2 button.on").text(); if( !isValid("2",params.survay3) ) return false;
					params.survay4 = $("#srv21 button.on").text(); if( !isValid("2-1",params.survay4) ) return false;
					params.survay5 = $("#srv22 button.on").text(); if( !isValid("2-2",params.survay5) ) return false;
					params.survay6 = $("#srv3 button.on").text(); if( !isValid("3",params.survay6) ) return false;
					params.survay7 = $("#srv31 button.on").text(); if( !isValid("3-1",params.survay7) ) return false;
					params.survay8 = $("#srv4 button.on").text(); if( !isValid("4",params.survay8) ) return false;
					params.survay9 = $("#srv41 button.on").text(); if( !isValid("4-1",params.survay9) ) return false;
					params.survay10 = dupText( $("#srv5") ); if( !isValid("5",params.survay10) ) return false;
					
					params.etc7 =  $("#srv51").val(); if( !params.etc7 ){ alert("5-1문항을 입력해주세요."); return false; }
					
					params.survay11 = $("#srv6 button.on").text(); if( !isValid("6",params.survay11) ) return false;
					if( params.survay11 == '1' || params.survay11 == '2' ){
						params.survay12 = $("#srv61 button.on").text(); if( !isValid("6-1",params.survay12) ) return false;
					} else if( params.survay11 == '3' || params.survay11 == '4' ){
						params.survay13 = $("#srv62 button.on").text(); if( !isValid("6-2",params.survay13) ) return false;
					}
				}
				
				if($("#tel_no").val()==""){
					alert("이동전화번호(휴대폰)를 입력해주세요");
					$("#tel_no").focus();
					return false;
				} 
				params.tel_no = $("#tel_no").val();
				if($("#name").val()==""){
					alert("이름을 입력해주세요");
					$("#name").focus();
					return false;
				}
				params.name = $("#name").val();
				params.sex = $(":input:radio[name=srv8]:checked").val(); if( !params.sex ){ alert("성별을 선택해주세요."); return false; }
				params.survay14 = $(":input:radio[name=srv9]:checked").val(); if( !params.survay14 ){ alert("연령을 선택해주세요."); return false; }
				params.survay15 = $(":input:radio[name=srv10]:checked").val(); if( !params.survay15 ){ alert("직업을 선택해주세요."); return false; }
				
				if( $("#srv11 input").val() ) params.etc1 = $("#srv11 input").val();
				if( $("#srv3 input").val() ) params.etc2 = $("#srv3 input").val();
				if( $("#srv31 input").val() ) params.etc3 = $("#srv31 input").val();
				if( $("#srv4 input").val() ) params.etc4 = $("#srv4 input").val();
				if( $("#srv41 input").val() ) params.etc5 = $("#srv41 input").val();
				if( $("#srv5 input").val() ) params.etc6 = $("#srv5 input").val();
				if( $("#srv61 input").val() ) params.etc8 = $("#srv61 input").val();
				if( $("#srv62 input").val() ) params.etc9 = $("#srv62 input").val();
				
				if( $("#srv7").val() ) params.etc10 = $("#srv7").val();
				if( $("#etc8").val() ) params.etc11 = $("#etc8").val();
				if( $("#sidoSel").val() == "" ){ alert("시도를 선택해주세요."); return false; }
				if( $("#sggSel").val() == "" ){ alert("시군구를 선택해주세요."); return false; }
				if( $("#admSel").val() == "" ){ alert("읍면동을 선택해주세요."); return false; }
				params.etc12 = $("#sidoSel").val() + $("#sggSel").val() + $("#admSel").val();
				
				//Q0, R06 로그 등록??
				$.ajax({
			 		type:"POST",
			 		url: "/ServiceAPI/quiz/survey.json",
			 		data: params,
			 		success:function(data){
			 			if(data.result.resultCnt > 0){
		 					alert("수정되었습니다.");
			 			} else {
	 						srvLogWrite( "A0", "15", "04", "00", "이벤트", "2020년 SGIS 이용자 설문조사 등록" ); 
	 						apiLogWrite2('R0', 'R08', "이벤트", "2020년 SGIS 이용자 설문조사 등록",  '00', '없음' );
	 						
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
				return false;
			} else {
				return true;
			}
		}
		
		function dupText( button ){
			var text = '';
			$.each( $( button ).find("button.on"), function( i , item ){
				text += (i==0?"":",")+"|"+$( item ).text()+"|";
			});
			return text;
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
		<div align="center">
			<img src="/html/survey/2020/img/notice.png" style="width:500px; height:710px; margin-bottom:20px;">
		</div>
		
		<%
		System.out.println("idx === " + idx );
		if( idx < 1 || idx > 17 ){
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
                <li class="quizTit nohidden">Ⅰ. 인지도 및 이용현황</li>
                <li class="quizList nohidden">
                    <div class="quiz">
                        <span class="no">1.</span>
                        통계지리정보서비스(이하 “SGIS”라 함)를 알고 계십니까?
                    </div>
                    <ul id="srv1" class="row">
                        <li class="answerList"><label><button onclick="setVal(1,1,1)">1</button> 매우 잘 알고 있다.</label></li>
                        <li class="answerList"><label><button onclick="setVal(1,2,2)">2</button> 잘 알고 있다.</label></li>
                        <li class="answerList"><label><button onclick="setVal(1,3,3)">3</button> 알고 있다.</label></li>
                        <li class="answerList"><label><button onclick="setVal(1,4,4)">4</button> 잘은 모르지만 들어는 봤다.</label></li>
                        <li class="answerList" style="width:100%;"><label><button onclick="setVal(1,5,5)">5</button> 처음 들어봤다.</label>
                        <span class="redspan">&emsp; ☞ &emsp; 설문을 종료하시고, SGIS를 이용하신 후 다시 설문조사에 참여해 주세요.</span></li>
                    </ul>
                </li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">1-1.</span>
                        SGIS를 어떻게 알게 되셨습니까?
                        <span class="parenthesis">(중복응답 가능)</span>
                    </div>
                    <ul id="srv11" class="row">
                        <li class="answerList"><label><button onclick="setVal(11,1,1,this)">1</button> 통계청 홈페이지</label></li>
                        <li class="answerList"><label><button onclick="setVal(11,2,2,this)">2</button> KOSIS(국가통계포털)</label></li>
                        <li class="answerList"><label><button onclick="setVal(11,3,3,this)">3</button> 통계청 블로그 및 정책메일</label></li>
                        <li class="answerList"><label><button onclick="setVal(11,4,4,this)">4</button> 뉴스 및 신문기사</label></li>
                        <li class="answerList"><label><button onclick="setVal(11,5,5,this)">5</button> 일반 포털</label></li>
                        <li class="answerList"><label><button onclick="setVal(11,6,6,this)">6</button> 통계간행물</label></li>
                        <li class="answerList"><label><button onclick="setVal(11,7,7,this)">7</button> 이벤트</label></li>
                        <li class="answerList">
                        	<label><button onclick="setVal(11,8,8,this)">8</button>
                        	<span onclick="setEtcVal(11,8,8,this)">기타</span></label><input type="text" id="etc11" maxlength="100">
                        </li>
                    </ul>
                </li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">2.</span>
                        SGIS를 얼마나 자주 이용하십니까?
                    </div>
                    <ul id="srv2" class="row">
                        <li class="answerList"><label><button onclick="setVal(2,1,1)">1</button> 하루에 여러 번(2회 이상)</label></li>
                        <li class="answerList"><label><button onclick="setVal(2,2,2)">2</button> 하루에 한번</label></li>
                        <li class="answerList"><label><button onclick="setVal(2,3,3)">3</button> 일주일에 2~3회</label></li>
                        <li class="answerList"><label><button onclick="setVal(2,4,4)">4</button> 한 달에 2~3회</label></li>
                        <li class="answerList"><label><button onclick="setVal(2,5,5)">5</button> 한 달에 1회</label></li>
                    </ul>
                </li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">2-1.</span>
                        SGIS 한 번 이용 시 이용시간은 얼마나 되십니까?
                    </div>
                    <ul id="srv21" class="row">
                        <li class="answerList"><label><button onclick="setVal(21,1,1)">1</button> 5분 이내</label></li>
                        <li class="answerList"><label><button onclick="setVal(21,2,2)">2</button> 10분 이내</label></li>
                        <li class="answerList"><label><button onclick="setVal(21,3,3)">3</button> 30분 이내</label></li>
                        <li class="answerList"><label><button onclick="setVal(21,4,4)">4</button> 1시간 이내</label></li>
                        <li class="answerList"><label><button onclick="setVal(21,5,5)">5</button> 1시간 이상</label></li>
                    </ul>
                </li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">2-2.</span>
                        SGIS 이용시간대는 언제입니까?
                    </div>
                    <ul id="srv22" class="row">
                        <li class="answerList"><label><button onclick="setVal(22,1,1)">1</button> 오전 9시 이전</label></li>
                        <li class="answerList"><label><button onclick="setVal(22,2,2)">2</button> 오전 9시～오전 11시</label></li>
                        <li class="answerList"><label><button onclick="setVal(22,3,3)">3</button> 오후 12시～오후 6시</label></li>
                        <li class="answerList"><label><button onclick="setVal(22,4,4)">4</button> 오후 6시～오후 10시</label></li>
                        <li class="answerList"><label><button onclick="setVal(22,5,5)">5</button> 오후 10시 이후</label></li>
                    </ul>
                </li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">3.</span>
                        SGIS 이용 장소는 어떻게 되십니까?
                    </div>
                    <ul id="srv3" class="row">
                        <li class="answerList"><label><button onclick="setVal(3,1,1)">1</button> 집</label></li>
                        <li class="answerList"><label><button onclick="setVal(3,2,2)">2</button> 사무실</label></li>
                        <li class="answerList"><label><button onclick="setVal(3,3,3)">3</button> 카페, 음식점 등</label></li>
                        <li class="answerList"><label><button onclick="setVal(3,4,4)">4</button> 기차, 지하철, 버스 등</label></li>
                        <li class="answerList">
                        	<label><button onclick="setVal(3,5,5,this)">5</button>
                        	<span onclick="setEtcVal(3,5,5,this)">기타</span></label><input type="text" id="etc3" maxlength="100">
                        </li>
                    </ul>
                </li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">3-1.</span>
                        SGIS를 이용하실 때 주로 사용하는 기기는 무엇입니까?
                    </div>
                    <ul id="srv31" class="row">
                        <li class="answerList"><label><button onclick="setVal(31,1,1)">1</button> PC(데스크톱)</label></li>
                        <li class="answerList"><label><button onclick="setVal(31,2,2)">2</button> PC(노트북)</label></li>
                        <li class="answerList"><label><button onclick="setVal(31,3,3)">3</button> 패드(갤럭시 탭, 아이패드 등)</label></li>
                        <li class="answerList"><label><button onclick="setVal(31,4,4)">4</button> 스마트폰</label></li>
                        <li class="answerList">
                        	<label><button onclick="setVal(31,5,5,this)">5</button>
                        	<span onclick="setEtcVal(31,5,5,this)">기타</span></label><input type="text" id="etc31" maxlength="100">
                        </li>
                    </ul>
                </li>

                <li class="quizTit">Ⅱ. 이용 목적 및 이용 콘텐츠</li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">4.</span>
                        SGIS를 이용하시는 주된 목적은 무엇입니까?
                    </div>
                    <ul id="srv4" class="row">
                        <li class="answerList"><label><button onclick="setVal(4,1,1)">1</button> 연구분석(논문)</label></li>
                        <li class="answerList"><label><button onclick="setVal(4,2,2)">2</button> 정책수립</label></li>
                        <li class="answerList"><label><button onclick="setVal(4,3,3)">3</button> 교육용 자료(실습, 강의 등)</label></li>
                        <li class="answerList"><label><button onclick="setVal(4,4,4)">4</button> 보고서 작성(시각화목적)</label></li>
                        <li class="answerList"><label><button onclick="setVal(4,5,5)">5</button> 상권분석</label></li>
                        <li class="answerList"><label><button onclick="setVal(4,6,6)">6</button> 프로그램 개발 및 DB구축</label></li>
                        <li class="answerList"><label><button onclick="setVal(4,7,7)">7</button> 단순 정보 파악</label></li>
                        <li class="answerList"><label><button onclick="setVal(4,8,8)">8</button> 업무용</label></li>
                        <li class="answerList">
                        	<label><button onclick="setVal(4,9,9,this)">9</button>
                        	<span onclick="setEtcVal(4,9,9,this)">기타</span></label><input type="text" id="etc4" maxlength="100">
                        </li>
                    </ul>
                </li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">4-1.</span>
                        SGIS를 이용하실 때 가장 중요하다고 생각하시는 것은 무엇입니까?
                    </div>
                    <ul id="srv41" class="row">
                        <li class="answerList"><label><button onclick="setVal(41,1,1)">1</button> 직관성(한눈에 알아보기)</label></li>
                        <li class="answerList"><label><button onclick="setVal(41,2,2)">2</button> 편리성(쉽게 활용하기)</label></li>
                        <li class="answerList"><label><button onclick="setVal(41,3,3)">3</button> 유용성(다양한 정보 찾기)</label></li>
                        <li class="answerList"><label><button onclick="setVal(41,4,4)">4</button> 상호성(서로 소통하기)</label></li>
                        <li class="answerList">
                        	<label><button onclick="setVal(41,5,5,this)">5</button>
                        	<span onclick="setEtcVal(41,5,5,this)">기타</span></label><input type="text" id="etc41" maxlength="100">
                        </li>
                    </ul>
                </li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">5.</span>
                        자주 이용하시는 콘텐츠는 무엇입니까?
                        <span class="parenthesis">(중복응답 가능)</span>
                    </div>
                    <ul id="srv5" class="row">
                        <li class="answerList"><label><button onclick="setVal(5,1,1,this)">1</button> 통계주제도</label></li>
                        <li class="answerList"><label><button onclick="setVal(5,2,2,this)">2</button> 대화형 통계지도</label></li>
                        <li class="answerList"><label><button onclick="setVal(5,3,3,this)">3</button> 일자리맵</label></li>
                        <li class="answerList"><label><button onclick="setVal(5,4,4,this)">4</button> 정책통계지도</label></li>
                        <li class="answerList"><label><button onclick="setVal(5,5,5,this)">5</button> 살고싶은 우리동네</label></li>
                        <li class="answerList"><label><button onclick="setVal(5,6,6,this)">6</button> 업종통계지도</label></li>
                        <li class="answerList"><label><button onclick="setVal(5,7,7,this)">7</button> 지역현안소통지도</label></li>
                        <li class="answerList"><label><button onclick="setVal(5,8,8,this)">8</button> 통계지도체험</label></li>
                        <li class="answerList"><label><button onclick="setVal(5,9,9,this)">9</button> 월간통계</label></li>
                        <li class="answerList"><label><button onclick="setVal(5,10,10,this)">10</button> 인구피라미드</label></li>
                        <li class="answerList"><label><button onclick="setVal(5,11,11,this)">11</button> 고령화 현황보기</label></li>
                        <li class="answerList"><label><button onclick="setVal(5,12,12,this)">12</button> 성씨분포</label></li>
                        <li class="answerList"><label><button onclick="setVal(5,13,13,this)">13</button> 지방의 변화보기</label></li>
                        <li class="answerList"><label><button onclick="setVal(5,14,14,this)">14</button> 자료제공</label></li>
                        <li class="answerList"><label><button onclick="setVal(5,15,15,this)">15</button> 개발지원센터(Open API)</label></li>
                        <li class="answerList"><label><button onclick="setVal(5,16,16,this)">16</button> SGIS에듀</label></li>
                        <li class="answerList"><label><button onclick="setVal(5,17,17,this)">17</button> My통계로</label></li>
                        <li class="answerList">
                        	<label><button onclick="setVal(5,18,18,this)">18</button>
                        	<span onclick="setEtcVal(5,18,18,this)">기타</span></label><input type="text" id="etc5" maxlength="100">
                        </li>
                        <li class="answerList" style="width:100%;">
                            <span class="redspan">&emsp; ☞ &emsp;문5-1.에서 자주 이용하시는 콘텐츠 중 세부내용 기술</span>
                        </li>
                    </ul>
                </li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">5-1.</span>
                        SGIS 서비스에서 자주 이용하는 세부콘텐츠는 무엇입니까?
                    </div>
                    <textarea id="srv51" cols="30" rows="5" maxlength="1000" 
                    placeholder="(작성 예) 문5에서 “통계주제도” 선택 시에는 세부지표 중 “1인 가구 변화”, “응급의료시설 접근현황” 등 자주 이용하시는 세부지표 기술"></textarea>
                    <br>
                </li>

                <li class="quizTit">Ⅲ. 만족도 및 개선의견</li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">6.</span>
                        통계지리정보서비스(SGIS)에 대해 전반적으로 얼마나 만족하십니까?
                    </div>
                    <table class="satisfy">
                        <tbody>
                            <tr>
                                <th><label onclick="setVal(6,1,1,this)">매우 만족한다</label></th>
                                <th><label onclick="setVal(6,2,2,this)">만족하는 편이다</label></th>
                                <th><label onclick="setVal(6,3,3,this)">보통이다</label></th>
                                <th><label onclick="setVal(6,4,4,this)">만족하지 않는 편이다</label></th>
                                <th><label onclick="setVal(6,5,5,this)">전혀 만족하지 않는다</label></th>
                            </tr>
                            <tr id="srv6">
                                <td><button onclick="setVal(6,1,1,this)">1</button></td>
                                <td><button onclick="setVal(6,2,2,this)">2</button></td>
                                <td><button onclick="setVal(6,3,3,this)">3</button></td>
                                <td><button onclick="setVal(6,4,4,this)">4</button></td>
                                <td><button onclick="setVal(6,5,5,this)">5</button></td>
                            </tr>
                        </tbody>
                    </table>
                </li>


                <li class="quizList srv61" style="display:none;">
                    <div class="quiz">
                        <span class="no">6-1.</span>
                        <span class="parenthesis">(6번 문항에서 ①, ②번 응답자만 해당)
                        </span>
                        만족한 이유는 무엇입니까?
                    </div>
                    <ul id="srv61" class="row">
                        <li class="answerList anFull"><label><button onclick="setVal(61,1,1,this)">1</button> 지도와 통계가 융합되어 통계를 직관적으로 이해하는데 도움</label></li>
                        <li class="answerList"><label><button onclick="setVal(61,2,2,this)">2</button> 제공하는 콘텐츠 다양</label></li>
                        <li class="answerList"><label><button onclick="setVal(61,3,3,this)">3</button> 읍면동보다도 더 작은 단위의 소지역 통계 제공</label></li>
                        <li class="answerList"><label><button onclick="setVal(61,4,4,this)">4</button> 자료공개(자료제공, Open API)로 공간통계 활용 유용</label></li>
                        <li class="answerList">
                        	<label><button onclick="setVal(61,5,5,this)">5</button>
                        	<span onclick="setEtcVal(61,5,5,this)">기타</span></label><input type="text" id="etc61" maxlength="100">
                        </li>
                    </ul>
                </li>
                <li class="quizList srv62" style="display:none;">
                    <div class="quiz">
                        <span class="no">6-2.</span>
                        <span class="parenthesis">(6번 문항에서 ③, ④번 응답자만 해당) </span>만족하지 않는 이유는 무엇입니까?
                    </div>
                    <ul id="srv62" class="row">
                        <li class="answerList"><label><button onclick="setVal(62,1,1,this)">1</button> 수록 통계자료가 다양하지 않음</label></li>
                        <li class="answerList"><label><button onclick="setVal(62,2,2,this)">2</button> 이용절차 복잡</label></li>
                        <li class="answerList"><label><button onclick="setVal(62,3,3,this)">3</button> 이용방법에 대한 설명 부족</label></li>
                        <li class="answerList"><label><button onclick="setVal(62,4,4,this)">4</button> 홈페이지 디자인이나 구성 불만족</label></li>
                        <li class="answerList">
                        	<label><button onclick="setVal(62,5,5,this)">5</button>
                        	<span onclick="setEtcVal(62,5,5,this)">기타</span></label><input type="text" id="etc62" maxlength="100">
                        </li>
                    </ul>
                </li>
                <li class="quizList">
                    <div class="quiz">
                        <span class="no">7.</span>
                        SGIS 서비스 향상을 위해 바라시는 점 또는 개선의견을 자유롭게 작성하여 주시기 바랍니다.
                    </div>
                    <textarea id="srv7" cols="30" rows="5" maxlength="1000"></textarea>
                </li>
                 <li class="quizList nohidden">
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
                <li id="info-1" class="quizList table" style="display:none;">
                    <div class="quiz">
                        <span class="no">☆</span>
                        아래의 정보는 경품지급 및 결과분석 목적으로만 활용합니다.
                    </div>
                    <table>
                        <colgroup>
                            <col style="width: 90px" />
                            <col style="width: 490px" />
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
                                    <input name="srv8" type="radio" value="M">남성
                                    <input name="srv8" type="radio" value="F">여성
                                </td>
                            </tr>
                            <tr>
                                <th>연령</th>
                                <td>
                                    <input name="srv9" type="radio" value="1">19세 이하
                                    <input name="srv9" type="radio" value="2">20~29세
                                    <input name="srv9" type="radio" value="3">30~39세
                                    <input name="srv9" type="radio" value="4">40~49세
                                    <input name="srv9" type="radio" value="5">50~59세
                                    <input name="srv9" type="radio" value="6">60세 이상
                                </td>
                            </tr>
                            <tr>
                                <th>직업</th>
                                <td class="pt10 pb10">
                                    <input name="srv10" type="radio" value="1"> 생산직
                                    <input name="srv10" type="radio" value="2"> 사무직
                                    <input name="srv10" type="radio" value="3"> 연구직
                                    <input name="srv10" type="radio" value="4"> 영업직
                                    <input name="srv10" type="radio" value="5"> 공무원
                                    <input name="srv10" type="radio" value="6"> 교직(교수,교사 등)<br>
                                    <input name="srv10" type="radio" value="7"> 자영업
                                    <input name="srv10" type="radio" value="8"> 학생(초중고)
                                    <input name="srv10" type="radio" value="9"> 대학(원)생
                                    <input name="srv10" type="radio" value="10"> 전업주부
                                    <input name="srv10" type="radio" value="11"> 기타 <input id="etc8" type="text" class="etc" maxlength="100">
                                </td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td>
                                    <div id="srv11">
	                                    <select class="addrSel" id="sidoSel">
											<option value="">시도</option>
										</select>
										<select class="addrSel" id="sggSel">
											<option value="">시군구</option>
										</select>
										<select class="addrSel" id="admSel">
											<option value="">읍면동</option>
										</select>
                                    </div>
								</td>
                            </tr>
                        </tbody>
                    </table>
                </li>
                <li class="quizBtn" style="display:none;"> 
                   <div class="quiz">
                        <span class="no">※</span>
                        설문에 참여해 주셔서 감사합니다. 앞으로도 SGIS 많은 이용 부탁드립니다.
                   </div>		
					<div class="quiz" style="margin-top:10px;">
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
