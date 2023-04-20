<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="java.text.SimpleDateFormat" %> 
<%@ page import="java.util.Calendar" %> 
<%@ page import="java.util.Date" %> 
<%@ page import="java.util.HashMap" %> 
<%@ page import="java.util.Map" %> 
<%
	int    page_size = 5; // 목록 페이지 수
	String bDate = "20201210"; //2020.12.10(목) ~ 2020.12.17(목) 8일간 
	
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
	
	<link rel="stylesheet" type="text/css" href="./css/common.css" />
	<link rel="stylesheet" type="text/css" href="./css/default.css" />		 

   	<title>2020년 SGIS 이용자를 위한 연말 나눔 이벤트</title>
    
    <script type="text/javascript">    
		var wsize = 740;
     	var hsize = 1500;
     	var page_size = <%=page_size%>;
     	
     	
     	document.onreadystatechange=resizeFrame;
     	function resizeFrame(){
	    	 try{
	    		 self.resizeTo(wsize, hsize);
	    	 }catch(e){
    	 	}
	   	}
	     	
		$(document).ready(function(){
			srvLogWrite( "A0", "15", "03", "00", "이벤트", "2020년 멘트 등록 이벤트 View" );
			apiLogWrite2('R0', 'R07', "이벤트", "2020년 멘트 등록 이벤트 View",  '00', '없음');

			apiLogWrite3("R05","2020년 멘트 등록 이벤트 view");

			showSurveyList(1);

			var offset = $("#surveyList").offset();
			if( offset ){
				$("html, body").animate({scrollTop : offset.top }, 1000);
			}		
			
			
		});
		
		function fnAgree(val){
			$("input:radio[name=agreement]:input[value=" +val+"]").prop("checked", true);
		}
		function surveyEnter(){
			if(!$('#agreementY').is(':checked')){
				alert("개인정보 수집에 동의하지 않으시면 이벤트에 참여하실 수 없습니다.");
				return false;
				
			}
			if(confirm("제출하시겠습니까?") == true){
				var params = {};

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
				
				if($("#etc1").val()==""){
					alert("멘트를 입력해주세요");
					$("#etc1").focus();
					return false;
				} 
				if( 100 < $("#etc1").val().length){
					alert("100자 이내로 입력해주세요");
					$("#etc1").focus();
					return false;					
				}
				params.etc1 = $("#etc1").val();
				
								
				$.ajax({
			 		type:"POST",
			 		url: "/ServiceAPI/quiz/survey.json",
			 		data: params,
			 		success:function(data){
			 			if(data.result.resultCnt > 0){
		 					alert("수정되었습니다.");
			 			} else {
	 						srvLogWrite( "A0", "15", "04", "00", "이벤트", "2020년 멘트 등록 이벤트 등록" ); 
	 						apiLogWrite2('R0', 'R08', "이벤트", "2020년 멘트 등록 이벤트 등록",  '00', '없음' );
	 						
							alert("등록되었습니다.");							
	 					}

			 			var offset = $("#surveyList").offset();
			 			if( offset ){
			 				$("html, body").animate({scrollTop : offset.top }, 200);
			 			}		
			 			
						showSurveyList(1);				
		 			},
			 		error:function(data){
			 			console.log(data);
			 		}
		 		});
			} else {
				return;				
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
		
		function showSurveyList(page_num){
			
			var params = {};

			params.page_num  = page_num;
			params.page_size = <%=page_size%>;


			$.ajax({
		 		type:"POST",
		 		url: "/ServiceAPI/quiz/SurveyList.json",
		 		data: params,
		 		success:function(data){
		 			$('tbody[id=list] *').remove();
					
		 			if(data.result.total_count < 1){
						listElement += '<tr>';
						listElement += '<td colspan="2" style="text-align:center">조회 목록이 없습니다.</td>';
						listElement += '</tr>';
						
		 			} else {
 						srvLogWrite( "A0", "15", "04", "00", "이벤트", "2020년 멘트 등록 이벤트 등록" ); 
 						apiLogWrite2('R0', 'R08', "이벤트", "2020년 멘트 등록 이벤트 등록",  '00', '없음' );
 						 						

 						var list = data.result.surveyList;
 						var listElement = '';
 						var name, tel_no, content, regDate;

							listElement += '<tr><th>내용</th><th>작성자</th></tr>';
 						
 						for(var i = 0; i < list.length; i++) {
<%--  							if((page_num-1)*<%=page_size%> < i+1){ --%>
	 							name    = list[i].name; 
// 	 							tel_no  = list[i].tel_no;
// 	  							content = list[i].etc1.replace(/\n/gim, "</br>"); // 줄바꿈 제외 지시(PL)
	 							content = list[i].etc1;
// 	 							regDate = list[i].regdate;
 
	 							listElement += '<tr>';
	 							listElement += '<td>' + content + '</td>';
	 							listElement += "<td style='text-align:center;'>" + name.substr(0,1)+'*'+name.substr(2,3) + '</td>';
	 							listElement += '</tr>';
<%-- 							} --%>
 						} 
 					}

					$('tbody[id=list]').append(listElement);
					
					var totalCount   = data.result.total_count;
					var currentIndex = data.result.curPage;
					var pageSize     = <%=page_size%>; // 페이지 당 항목 개수
					var totalPage    = Math.ceil(totalCount / pageSize); // 전체 페이지 수
					$('.pagenation .list').paging({
						current : currentIndex,
						max : totalPage,
						length : <%=page_size%>, //페이지  link 표출 갯수
						itemClass : 'page',
						itemCurrent : 'strong',
						format : '{0}',
						next : '&gt;',
						prev : '&lt;',
						first : '&lt;&lt;',
						last : '&gt;&gt;',
						nextClass : 'next',
						prevClass : 'prev', 
						firstClass : 'first',
						lastClass : 'last',
						onclick : function(e, page) { // 페이지 선택 시					
							showSurveyList(page);

				 			var offset = $("#surveyList").offset();
				 			if( offset ){
				 				$("html, body").animate({scrollTop : offset.top }, 200);
				 			}	
						}
					});

// 					$("#surveyList").css("display", "block");
						
	 			},
		 		error:function(data){
		 			console.log(data);
		 		}
	 		});
						
			
		}
	</script>

</head>

<body>
    <div class="wrap">
         <div class="tit">
             <img src="./img/B.png"  style="width:600px; height:800px; margin-bottom:20px;">
         </div>
		
		<%
// 		System.out.println("idx === " + idx );
		if( idx < 1 || idx > 8 ){
		%>
			<script type="text/javascript">
				alert("이벤트 기간이 아닙니다.");
				window.close();
			</script>
		<%
		} else {
		%>
			    

         <div class="quizBox">
             <ul>
                 <li><p class="" style="width:600px;font-size: 13px;">
                     <b>*개인정보동의 문구 내용</b><br/>
                                                        개인정보 수집항목(이름, 전화번호)은 추첨을 통한 상품권 지급 목적으로만 사용되며,<br/> 사은품 지급 후 파기됩니다.<br/>
                                                        개인정보 수집에 동의하지 않으시면 이벤트에 참여하실 수 없습니다.</p>
                 </li> 
                 <li class=" table">
                     <table>
                         <colgroup>
                             <col style="width: 100px" />
                             
                             
                             <col style="width: 500px" />
                         </colgroup>
                         <tbody>
                             <tr>
                                 <th>개인정보동의</th> 
                                 <td>
                                     <label onclick="fnAgree('Y');"><input type="radio" id="agreementY" name="agreement" value="Y" />동의</label>
                                     <label onclick="fnAgree('N');"><input type="radio" id="agreementN" name="agreement" value="N" />비동의</label>
                                 </td>
                             </tr>
                             <tr>
                                 <th>이름</th>
                                 <td><input type="text" id="name" maxlength="10" ></td>
                             </tr>
                             <tr>
                                 <th>전화번호</th>
                                 <td><input type="text" id="tel_no" maxlength="11" onkeydown="onlyNumber(this);"></td>
                             </tr>

                         </tbody>
                     </table>
                 </li>
				<li><textarea id="etc1" cols="30" rows="5" maxlength="100" placeholder="여기에 입력해주세요"></textarea></li>
                 <li style="text-align: center;">&nbsp;
                    <div id="info-1" style="text-align: center;">
                    	<button onclick="surveyEnter();">등록</button>
                    </div>&nbsp;
                 </li>
             </ul>
         </div>
         <div id="surveyList">
             <ul>
                 <li class="table table2"> 
                 	<div>
	                     <table>
	                         <colgroup>
	                             <col style="width: 500px" />
	                             <col style="width: 100px" />
	                         </colgroup>
	                         
							 <tbody id="list">
							     <!-- ajax처리 -->
							 </tbody>
	                     </table>
                 	</div>
					<div class="paging pagenation">
						<span class="list"></span>
					</div>
                 </li>
             </ul>
         </div>

		<%
			}
		%>       
    </div>
</body>
</html>
