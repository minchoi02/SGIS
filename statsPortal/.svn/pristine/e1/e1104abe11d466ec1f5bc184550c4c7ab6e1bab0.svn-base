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
					out.println("location.href='/html/survey/2021_1/m/indexMobile.html';");
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
	String bDate = "20210317";

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
    <link rel="stylesheet" href="./styleWeb.css">

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
				location.href = '/html/survey/2021_1/m/indexMobile.html';
			}

			srvLogWrite( "A0", "15", "03", "00", "이벤트", "2021년 SGIS 이용자 설문조사 View" );
			apiLogWrite2('R0', 'R07', "이벤트", "2021년 SGIS 이용자 설문조사 View",  '00', '없음');

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
			        url : "/ServiceAPI/map/sggAddressList.json",
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
			        url : "/ServiceAPI/map/admAddressList.json",
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

			$('input').focusin(function(){
				if( !(this.id == "etc11" || this.id == "etc5") ){//(중복응답 가능)
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

				if( qNum == "11" || qNum == "5"){ //중복 체크 가능
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
			if( qNum == "1" && val == "5" ){
				if( $("input:radio[name=agreement]:checked").val() == "Y" ){
					notItems = ".nohidden";
				} else {
					notItems = ".nohidden";
				}
				$("h2, h5, .answer, .answer_wrap").not(".nohidden").css("display","none").hide();
				$(".agree_wrap, .user_info_wrap").hide();

			} else if( qNum == "1" && val != "5" ){
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
			}
			$(".btn_cancel").show();

			if( obj && $(obj).closest(".answer_wrap").find("input") && $(obj).closest(".answer_wrap").find("input").val() != "" ){
				$(obj).closest(".answer_wrap").find("input").val("");
			}

			if( qNum == '11' || qNum == '5' ){
				if( $( obj ).hasClass('select') ){
					$( obj ).removeClass('select');
				} else {
					$( obj ).addClass('select');
				}
			} else {
				if( qNum == '6' ){
					if( val == '1' || val == '2' ){
						$(".srv61").css("display","").show();
						$(".srv62").css("display","none").hide();
						$("#srv62 button").removeClass("select");
						$("#etc62").val("");
					} else if( val == '3' || val == '4' ){
						$(".srv62").css("display","").show();
						$(".srv61").css("display","none").hide();
						$("#srv61 button").removeClass("select");
						$("#etc61").val("");
					} else {
						$(".srv61, .srv62").css("display","none").hide();
						$("#srv61 button, #srv62 button").removeClass("select");
						$("#etc61, #etc62").val("");
					}

					$("#srv"+qNum+" button").removeClass('select');
					$("#srv"+qNum+" button").eq(aNum-1).addClass('select');
				} else {
					if( qNum == "3" && aNum != 5 ){ $("#etc31").val(""); }
					else if( qNum == "31" && aNum != 5 ){ $("#etc31").val(""); }
					else if( qNum == "4" && aNum != 9 ){ $("#etc4").val(""); }
					else if( qNum == "41" && aNum != 5 ){ $("#etc41").val(""); }
					else if( qNum == "61" && aNum != 5 ){ $("#etc61").val(""); }
					else if( qNum == "62" && aNum != 5 ){ $("#etc62").val(""); }

					$("#srv"+qNum+" button").removeClass('select');
					$("#srv"+qNum+" button").eq(aNum-1).addClass('select');
				}
			}
		}

		function surveyEnter(){
			if(confirm("제출하시겠습니까?") == true){
				var params = {};
				params.survay1 = $("#srv1 button.select").text(); if( !isValid("1",params.survay1) ) return false; ;

				if( params.survay1 != "5" ){
					params.survay2 = dupText( $("#srv11") ); if( !isValid("1-1",params.survay2) ) return false;;
					params.survay3 = $("#srv2 button.select").text(); if( !isValid("2",params.survay3) ) return false;
					params.survay4 = $("#srv21 button.select").text(); if( !isValid("2-1",params.survay4) ) return false;
					params.survay5 = $("#srv22 button.select").text(); if( !isValid("2-2",params.survay5) ) return false;
					params.survay6 = $("#srv3 button.select").text(); if( !isValid("3",params.survay6) ) return false;
					params.survay7 = $("#srv31 button.select").text(); if( !isValid("3-1",params.survay7) ) return false;
					params.survay8 = $("#srv4 button.select").text(); if( !isValid("4",params.survay8) ) return false;
					params.survay9 = $("#srv41 button.select").text(); if( !isValid("4-1",params.survay9) ) return false;
					params.survay10 = dupText( $("#srv5") ); if( !isValid("5",params.survay10) ) return false;

					params.survay11 = $("#srv6 button.select").text(); if( !isValid("6",params.survay11) ) return false;
					if( params.survay11 == '1' || params.survay11 == '2' ){
						params.survay12 = $("#srv61 button.select").text(); if( !isValid("6-1",params.survay12) ) return false;
					} else if( params.survay11 == '3' || params.survay11 == '4' ){
						params.survay13 = $("#srv62 button.select").text(); if( !isValid("6-2",params.survay13) ) return false;
					}

// 					// '기타' 선택시, 값입력 체크
// 					if( !etcNullCheck(11, "1-1") ) return false;
// 					if( !etcNullCheck(3 , "3"  ) ) return false;
// 					if( !etcNullCheck(31, "3-1") ) return false;
// 					if( !etcNullCheck(4 , "4"  ) ) return false;
// 					if( !etcNullCheck(41, "4-1") ) return false;
// 					if( !etcNullCheck(5 , "5"  ) ) return false;
// 					if( !etcNullCheck(61, "6-1") ) return false;
// 					if( !etcNullCheck(62, "6-2") ) return false;
// 					if( !etcNullCheck(10, "직업" ) ) return false;

				}

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

				params.sex = $("#srv8 button.select").text(); if( !params.sex ){ alert("성별을 선택해주세요."); return false; }
				params.sex = (params.sex=="1" ? "M" : "F");
				params.survay15 = $("#srv9 button.select").text(); if( !params.survay15 ){ alert("연령을 선택해주세요."); return false; }
				params.survay16 = $("#srv10 button.select").text(); if( !params.survay16 ){ alert("직업을 선택해주세요."); return false; }

				if( $("#srv11 input").val() ) params.etc1 = $("#srv11 input").val();
				if( $("#srv3  input").val() ) params.etc2 = $("#srv3  input").val();
				if( $("#srv31 input").val() ) params.etc3 = $("#srv31 input").val();
				if( $("#srv4  input").val() ) params.etc4 = $("#srv4  input").val();
				if( $("#srv41 input").val() ) params.etc5 = $("#srv41 input").val();
				if( $("#srv5  input").val() ) params.etc6 = $("#srv5  input").val();
				if( $("#srv61 input").val() ) params.etc7 = $("#srv61 input").val();
				if( $("#srv62 input").val() ) params.etc8 = $("#srv62 input").val();
				if( $("#srv10 input").val() ) params.etc9 = $("#srv10 input").val();
				params.etc10 = "Web";
				if( $("#srv7").val() ) params.etc11 = $("#srv7").val();

				if( $("#sidoSel").val() == "" ){ alert("시도를 선택해주세요."); return false; }
				if( $("#sggSel").val() == "" ){ alert("시군구를 선택해주세요."); return false; }
				params.survay17 = $("#sidoSel option:selected").text() + " " + $("#sggSel option:selected").text(); //시도, 시군구
				params.survay18 = $("#sidoSel").val() + $("#sggSel").val(); //(코드값)시도, 시군구

				//Q0, R06 로그 등록??
				$.ajax({
			 		type:"POST",
			 		url: "/ServiceAPI/quiz/survey.json",
			 		data: params,
			 		success:function(data){
			 			if(data.result.resultCnt > 0){
		 					alert("수정되었습니다.");
			 			} else {
	 						srvLogWrite( "A0", "15", "04", "00", "이벤트", "2021년 SGIS 이용자 설문조사 등록" );
	 						apiLogWrite2('R0', 'R08', "이벤트", "2021년 SGIS 이용자 설문조사 등록",  '00', '없음' );

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
			<!-- mng_s 20210316 이진호, 김책임님께서 이미지 파일 변경 하라고 하셔서 변경-->
			<!--<img src="/html/survey/2021_1/img/notice.png" style="width:500px; height:700px; margin-bottom:20px;">-->
			<img src="/html/survey/2021_1/img/notice_20210316.png" style="width:500px; height:700px; margin-bottom:20px;">
			<!-- mng_e 20210316 이진호-->
		</div>

		<%
// 		System.out.println("idx === " + idx );
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


        <div id="survey_content" class="tit"></div>
	    <div class="top">
	      <img src="/html/survey/2021_1/img/top_img.png" alt="">
	    </div>
   		<div class="cont_wrap">
			<div class="cont">

				<h2 class="nohidden">Ⅰ. 인지도 및 이용현황</h2>
				<h5 class="nohidden">1. 통계지리정보서비스(이하 “SGIS”라 함)를 알고 계십니까?</h5>
				<div id="srv1" class="answer_wrap nohidden">
				    <p class="answer nohidden"><label><button class="num" onclick="setVal(1,1,1)">1</button>매우 잘 알고 있다.</label></p>
				    <p class="answer nohidden"><label><button class="num" onclick="setVal(1,2,2)">2</button>잘 알고 있다.</label></p>
				    <p class="answer nohidden"><label><button class="num" onclick="setVal(1,3,3)">3</button>알고 있다.</label></p>
				    <p class="answer nohidden"><label><button class="num" onclick="setVal(1,4,4)">4</button>잘은 모르지만 들어는 봤다.</label></p>
				    <p class="answer nohidden"><label><button class="num" onclick="setVal(1,5,5)">5</button>처음 들어봤다. <span class="sub_txt">＊설문을 종료하시고, SGIS를 이용하신 후 다시 설문조사에 참여해 주세요.</span></label></p>
				</div>

				<h5>1-1. SGIS를 어떻게 알게 되셨습니까? (중복응답 가능)</h5>
				<div id="srv11" class="answer_wrap layout_style01">
				    <p class="answer"><label><button class="num" onclick="setVal(11,1,1,this)">1</button>통계청 홈페이지</label></p>
				    <p class="answer"><label><button class="num" onclick="setVal(11,2,2,this)">2</button>KOSIS(국가통계포털)</label></p>
				    <p class="answer"><label><button class="num" onclick="setVal(11,3,3,this)">3</button>통계청 블로그 및 정책메일</label></p>
				    <p class="answer"><label><button class="num" onclick="setVal(11,4,4,this)">4</button>뉴스 및 신문기사</label></p>
				    <p class="answer"><label><button class="num" onclick="setVal(11,5,5,this)">5</button>일반 포털</label></p>
				    <p class="answer"><label><button class="num" onclick="setVal(11,6,6,this)">6</button>통계간행물</label></p>
				    <p class="answer"><label><button class="num" onclick="setVal(11,7,7,this)">7</button>이벤트</label></p>
				    <p class="answer"><label><button class="num etc" onclick="setVal(11,8,8,this)">8</button>기타&nbsp;</label><input type="text" id="etc11" class="etcInput" maxlength="100"></p>
				</div>

                <h5>2. SGIS를 얼마나 자주 이용하십니까?</h5>
                <div id="srv2" class="answer_wrap">
                    <p class="answer"><label><button class="num" onclick="setVal(2,1,1)">1</button>하루에 여러 번(2회 이상)</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(2,2,2)">2</button>하루에 한번</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(2,3,3)">3</button>일주일에 2~3회</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(2,4,4)">4</button>한 달에 2~3회</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(2,5,5)">5</button>한 달에 1회</label></p>
                </div>

                <h5>2-1. SGIS 한 번 이용 시 이용시간은 얼마나 되십니까?</h5>
                <div id="srv21" class="answer_wrap">
                    <p class="answer"><label><button class="num" onclick="setVal(21,1,1)">1</button>5분 이내</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(21,2,2)">2</button>10분 이내</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(21,3,3)">3</button>30분 이내</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(21,4,4)">4</button>1시간 이내</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(21,5,5)">5</button>1시간 이상</label></p>
                </div>

                <h5>2-2. SGIS 이용시간대는 언제입니까?</h5>
                <div id="srv22" class="answer_wrap">
                    <p class="answer"><label><button class="num" onclick="setVal(22,1,1)">1</button>오전 9시 이전</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(22,2,2)">2</button>오전 9시～오전 11시</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(22,3,3)">3</button>오후 12시～오후 6시</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(22,4,4)">4</button>오후 6시～오후 10시</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(22,5,5)">5</button>오후 10시 이후</label></p>
                </div>

                <h5>3. SGIS 이용 장소는 어떻게 되십니까?</h5>
                <div id="srv3" class="answer_wrap">
                    <p class="answer"><label><button class="num" onclick="setVal(3,1,1)">1</button>집</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(3,2,2)">2</button>사무실</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(3,3,3)">3</button>카페, 음식점 </label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(3,4,4)">4</button>기차, 지하철, 버스 등</label></p>
                    <p class="answer"><label><button class="num etc" onclick="setVal(3,5,5)">5</button>기타&nbsp;</label><input type="text" id="etc3" class="etcInput" maxlength="100"></p>
                </div>

                <h5>3-1. SGIS를 이용하실 때 주로 사용하는 기기는 무엇입니까?</h5>
                <div id="srv31" class="answer_wrap">
                    <p class="answer"><label><button class="num" onclick="setVal(31,1,1)">1</button>PC(데스크톱)</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(31,2,2)">2</button>PC(노트북)</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(31,3,3)">3</button>패드(갤럭시 탭, 아이패드 등)</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(31,4,4)">4</button>스마트폰</label></p>
                    <p class="answer"><label><button class="num etc" onclick="setVal(31,5,5)">5</button>기타 </label><input type="text" id="etc31" class="etcInput" maxlength="100"></p>
                </div>

                <h2>Ⅱ. 이용 목적 및 이용 콘텐츠</h2>
                <h5>4. SGIS를 이용하시는 주된 목적은 무엇입니까?</h5>
                <div id="srv4" class="answer_wrap layout_style01">
                    <p class="answer"><label><button class="num" onclick="setVal(4,1,1)">1</button>연구분석(논문)</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(4,2,2)">2</button>정책수립</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(4,3,3)">3</button>교육용 자료(실습, 강의 등)</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(4,4,4)">4</button>보고서 작성(시각화목적)</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(4,5,5)">5</button>상권분석</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(4,6,6)">6</button>프로그램 개발 및 DB구축</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(4,7,7)">7</button>단순 정보 파악</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(4,8,8)">8</button>업무용</label></p>
                    <p class="answer"><label><button class="num etc" onclick="setVal(4,9,9)">9</button>기타&nbsp;</label><input type="text" id="etc4" class="etcInput" maxlength="100"></p>
                </div>

                <h5>4-1. SGIS를 이용하실 때 가장 중요하다고 생각하시는 것은 무엇입니까?</h5>
                <div id="srv41" class="answer_wrap layout_style01">
                    <p class="answer"><label><button class="num" onclick="setVal(41,1,1)">1</button>직관성(한눈에 알아보기)</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(41,2,2)">2</button>편리성(쉽게 활용하기)</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(41,3,3)">3</button>유용성(다양한 정보 찾기)</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(41,4,4)">4</button>상호성(서로 소통하기)</label></p>
                    <p class="answer"><label><button class="num etc" onclick="setVal(41,5,5)">5</button>기타&nbsp;</label><input type="text" id="etc41" class="etcInput" maxlength="100"></p>
                </div>

                <h5>5. SGIS 서비스 중 자주 이용하시는 콘텐츠는 무엇입니까? (중복응답 가능)</h5>
                <div id="srv5" class="answer_wrap layout_style01">
                    <p class="answer"><label><button class="num" onclick="setVal(5,1,1,this)">1</button>통계주제도</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,2,2,this)">2</button>대화형 통계지도</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,3,3,this)">3</button>일자리맵</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,4,4,this)">4</button>정책통계지도</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,5,5,this)">5</button>살고싶은 우리동네</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,6,6,this)">6</button>업종통계지도</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,7,7,this)">7</button>지역현안소통지도</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,8,8,this)">8</button>통계지도체험</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,9,9,this)">9</button>월간통계</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,10,10,this)">10</button>인구피라미드</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,11,11,this)">11</button>고령화 현황보기</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,12,12,this)">12</button>성씨분포</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,13,13,this)">13</button>지방의 변화보기</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,14,14,this)">14</button>자료제공</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,15,15,this)">15</button>개발지원센터(OpenAPI)</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,16,16,this)">16</button>SGIS에듀</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,17,17,this)">17</button>My통계로</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,18,18,this)">18</button>생활권역 통계지도</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(5,19,19,this)">19</button>총조사 시각화 지도</label></p>
                    <p class="answer"><label><button class="num etc" onclick="setVal(5,20,20,this)">20</button>기타&nbsp;</label><input type="text" id="etc5" class="etcInput" maxlength="100"></p>
                </div>


                <h2>Ⅲ. 만족도 및 개선의견</h2>
                <h5>6. 귀하께서는 SGIS에 대해 전반적으로 얼마나 만족하십니까?</h5>
                <div id="srv6" class="answer_wrap">
                    <table class="table_style01">
                    <tr>
                      <th>매우<br />만족한다</th>
                      <th>만족하는<br />편이다</th>
                      <th>보통이다</th>
                      <th>만족하지 않는<br />편이다</th>
                      <th>전혀<br />만족하지 않는다</th>
                    </tr>
                    <tr>
                      <td><label><button class="num" onclick="setVal(6,1,1)">1</button></td>
                      <td><label><button class="num" onclick="setVal(6,2,2)">2</button></td>
                      <td><label><button class="num" onclick="setVal(6,3,3)">3</button></td>
                      <td><label><button class="num" onclick="setVal(6,4,4)">4</button></td>
                      <td><label><button class="num" onclick="setVal(6,5,5)">5</button></td>
                    </tr>
                    </table>
                </div>

                <h5 class="srv61" style="display:none;">6-1. (6번 문항에서 ①, ②번 응답자만 해당) 만족한 이유는 무엇입니까?</h5>
                <div id="srv61" class="answer_wrap srv61" style="display:none;">
                    <p class="answer"><label><button class="num" onclick="setVal(61,1,1)">1</button>지도와 통계가 융합되어 통계를 직관적으로 이해하는데 도움</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(61,2,2)">2</button>제공하는 콘텐츠 다양</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(61,3,3)">3</button>읍면동보다도 더 작은 단위의 소지역 통계 제공</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(61,4,4)">4</button>자료공개(자료제공, Open API)로 공간통계 활용 유용</label></p>
                    <p class="answer"><label><button class="num etc" onclick="setVal(61,5,5)">5</button>기타&nbsp;</label><input type="text" id="etc61" class="etcInput" maxlength="100"></p>
                </div>

                <h5 class="srv62" style="display:none;">6-2. (6번 문항에서 ③, ④번 응답자만 해당) 만족하지 않는 이유는 무엇입니까?</h5>
                <div id="srv62" class="answer_wrap srv62" style="display:none;">
                    <p class="answer"><label><button class="num" onclick="setVal(62,1,1)">1</button>수록 통계자료가 다양하지 않음</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(62,2,2)">2</button>이용절차 복잡</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(62,3,3)">3</button>이용방법에 대한 설명 부족</label></p>
                    <p class="answer"><label><button class="num" onclick="setVal(62,4,4)">4</button>홈페이지 디자인이나 구성 불만족</label></p>
                    <p class="answer"><label><button class="num etc" onclick="setVal(62,5,5)">5</button>기타&nbsp;</label><input type="text" id="etc62" class="etcInput" maxlength="100"></p>
                </div>

                <h5>7. SGIS 서비스 향상을 위해 바라시는 점 또는 개선의견을 자유롭게 작성하여 주시기 바랍니다.</h5>
                <div class="answer_wrap">
                    <textarea id="srv7" name="name" rows="8" cols="70"></textarea>
                </div>

                <div class="line"></div>

                <div class="agree_wrap">
                    <p class="agree_txt">개인정보 수집항목(성명, 휴대전화번호)은 추첨을 통한 상품권 지급 및 분석 목적으로만 사용되며, 경품 지급 후 파기됩니다. 개인정보 수집에 동의하지 않으시면 설문에 참여하실 수 없습니다.</p>
                    <div class="agree_chk_wrap">
                        <input type="radio" name="agree" onclick="fnAgree('Y');" value="Y" id="agree"><label for="agree">동의</label>
                        <input type="radio" name="agree" onclick="fnAgree('N');" value="N" id="disagree" checked="checked" style="margin-left:10px;"><label for="disagree">비동의</label>
                    </div>
                </div>


	            <div class="user_info_wrap" style="width:580px !important;">
	                <h3 class="user_info_tit">아래의 정보는 사은품 제공 및 결과분석 목적으로만 활용합니다. </h3>
	                <table class="table_style01" style="table-layout:fixed !important;">
	                    <colgroup>
	                        <col width="11%" />
	                    </colgroup>
	                    <tr>
	                        <th>핸드폰번호</th>
	                        <td style="text-align:left;"><p style="margin-left: 20px;"><input type="text" id="tel_no" maxlength="11" onkeydown="onlyNumber(this);" class=""/></p></td>
	                    </tr>
	                    <tr>
	                        <th>성명</th>
	                        <td style="text-align:left;"><p style="margin-left: 20px;"><input type="text" id="name" maxlength="10" class=""/></p></td>
	                    </tr>
	                    <tr>
	                        <th>성별</th>
	                        <td>
	                            <div id="srv8" class="answer_wrap layout_style02">
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(8,1,1)">1</button>남자</label></p>
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(8,2,2)">2</button>여자</label></p>
	                            </div>
	                        </td>
	                    </tr>
	                    <tr>
	                        <th>연령</th>
	                        <td>
	                            <div id="srv9" class="answer_wrap layout_style03">
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(9,1,1)">1</button>19세 이하</label></p>
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(9,2,2)">2</button>20~29세</label></p>
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(9,3,3)">3</button>30~39세</label></p>
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(9,4,4)">4</button>40~49세</label></p>
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(9,5,5)">5</button>50~59세</label></p>
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(9,6,6)">6</button>60~69세</label></p>
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(9,7,7)">7</button>70~79세</label></p>
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(9,8,8)">8</button>80세 이상</label></p>
	                            </div>
	                        </td>
	                    </tr>
	                    <tr>
	                        <th>직업</th>
	                        <td>
	                            <div id="srv10" class="answer_wrap layout_style02">
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(10,1,1)">1</button>생산직</label></p>
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(10,2,2)">2</button>사무직</label></p>
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(10,3,3)">3</button>연구직</label></p>
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(10,4,4)">4</button>영업직</label></p>
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(10,5,5)">5</button>공무원</label></p>
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(10,6,6)">6</button>교직(교수, 교사 등)</label></p>
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(10,7,7)">7</button>자영업</label></p>
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(10,8,8)">8</button>학생(초중고)</label></p>
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(10,9,9)">9</button>대학(원)생</label></p>
	                                <p class="answer"><label class="f15"><button class="num" onclick="setVal(10,10,10)">10</button>전업주부</label></p>
	                                <p class="" style="text-align:left;width:300px;"><label class="f15"><button class="num" onclick="setVal(10,11,11)">11</button>기타&nbsp;</label><input id="etc10" type="text" class="etc" maxlength="100"></p>
	                            </div>
	                        </td>
	                    </tr>
	                    <tr>
	                        <th>주소</th>
	                        <td>
	                            <div id="srv11" class="answer_wrap layout_style02">
	                                <p class="answer">
	                                    <select class="addrSel" id="sidoSel">
	                                        <option value="">시도</option>
	                                    </select>
	                                </p>
	                                <p class="answer">
	                                    <select class="addrSel" id="sggSel">
	                                        <option value="">시군구</option>
	                                    </select>
	                                </p>
	                            </div>
	                        </td>
	                    </tr>
	                </table>
	                <p id="ment" style="display:none;">※ 설문에 참여해 주셔서 감사합니다. 앞으로도 SGIS 많은 이용 부탁드립니다.</p>
	                <div class="btn_wrap" style="display:none;">
	                    <a onclick="surveyEnter();"  class="btn_submit">제출하기</a>
	                    <a onclick="surveyCansle();" class="btn_cancel">취소</a>
	                </div>
	                &nbsp;
	            </div>

			</div>
        </div>
		<%
			}
		%>
    </div>
</body></html>
