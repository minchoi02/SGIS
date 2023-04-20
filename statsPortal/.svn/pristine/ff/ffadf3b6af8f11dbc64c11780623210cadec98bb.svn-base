
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Map" %>
<%
    String bDate = "20200108";

    Calendar calendar = Calendar.getInstance();
    Date date = calendar.getTime();
    String today = (new SimpleDateFormat("yyyyMMdd").format(date));

    SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
    Date beginDate = formatter.parse( bDate );
    Date endDate = formatter.parse( today );

    long diff = endDate.getTime() - beginDate.getTime();
    long idx = ( diff / ( 24 * 60 * 60 * 1000 ) ) + 1; 
%>


<!DOCTYPE html>
<html lang="ko">
    <head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="format-detection" content="telephone=no">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10,user-scalable=yes">
        <link rel="stylesheet" type="text/css" href="./css/common.css"/>
        <link rel="stylesheet" type="text/css" href="./css/default.css"/>
        <title>2020년 SGIS 신규 콘텐츠 '이름 고르기' 이벤트</title>

        <script type="text/javascript" src="/js/plugins/jquery.min.js"></script>

        <script>
        
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
        
        $(document).ready(function(){
            srvLogWrite( "A0", "15", "03", "00", "이벤트", "2020년 SGIS 신규 콘텐츠 '이름 고르기' 이벤트" );
            apiLogWrite2('R0', 'R07', "이벤트", "2020년 SGIS 신규 콘텐츠 '이름 고르기' 이벤트",  '00', '없음');

        });

        function showEx(){
            var offset = $("#desig_content").offset();
            if( offset ){
                $("html, body").animate({scrollTop : offset.top }, 200);
            }
        }

        function setVal(survayNum, val, aNum, obj){
            $("#survay"+survayNum).val(val);
//             $("#srv" + (survayNum) + " label>button").removeClass('on');
//             $("#srv" + (survayNum) + " label>button").eq(aNum-1).attr('class', 'on');
        }

        function delVal(survayNum){
            $("#srv" + (survayNum) + " label>button").removeClass('on');
        }

        function fnAgree(val){
            $("input:radio[name=agreement]:input[value=" +val+"]").prop("checked", true);

//             if(val == "Y"){
//                 $(".quizBtn").show();
//                 $("#info-1").show();
//             } else {
//                 $(".quizBtn").hide();
//                 $("#info-1").hide();
//             } 
        }


        function surveyEnter(){
            var commitYn = "N";
            
            if($("#survay1").val() == ""){ alert("[공모명칭]을 선택해 주세요"); return false; }

            if($("input:radio[name=agreement]:input[value=N]").prop("checked")){
            	
                if(confirm("개인정보 수집에 동의하지 않으시면\n경품에 응모하실 수 없습니다.\n제출하시겠습니까?")){
                	commitYn = "Y";
                	$("#s_tel_no").val("<%=date%>");
                    $("#s_name").val("none");
                } else {
                	return false;	
                }
                
            } else {               
                if($("#tel_no").val()==""){
                    alert("[핸드폰 번호]를 입력해주세요");
                    $("#tel_no").focus();
                    return false;
                }
                if($("#name").val()==""){ 
                    alert("[이름]을 입력해주세요");
                    $("#name").focus();
                    return false;
                }
            	if(confirm("제출하시겠습니까?") == true){
                    commitYn = "Y";  
                    $("#s_tel_no").val($("#tel_no").val());
                    $("#s_name").val($("#name").val());
            	} else {
                    commitYn = "N"; 
            		return false;
            	}
            }
 
            if(commitYn == "Y"){
	            jQuery.ajax({
	                type:"POST",
	                url: "/ServiceAPI/common/APILogWrite.json",
	                data:{  "type": "Q0",
	                        "api_id" : "R06",
	                        "title" : "통계Me 콘텐츠 명칭 설문",
	                        "parameter" : "없음",
	                        "zoomLevel" : "00",
	                        "adm_nm" : "전국"
	                },
	                async: true,
	                success:function(data){
	                    $.ajax({
	                        type:"POST",
	                        url: "/ServiceAPI/quiz/quiz2017.json",
	                        data:{
	                            "gubun"    : "survey",
	                            "name"     : $("#s_name").val(),
	                            "tel_no"   : $("#s_tel_no").val(),
	                            "survay1"  : $("#survay1").val()
	                        },
	                        success:function(data){
	                            if(data.result.resultCnt > 0){
	                                alert("등록된 연락처입니다.");
	                            } else {
                                    srvLogWrite( "A0", "15", "04", "00", "이벤트", "2020년 SGIS 신규 콘텐츠 '이름 고르기' 이벤트" );
                                    apiLogWrite2('R0', 'R08', "이벤트", "2020년 SGIS 신규 콘텐츠 '이름 고르기' 이벤트",  '00', '없음' );

	                                alert("등록되었습니다.");
	                                self.close();
	                            }
	                        },
	                        error:function(data){
	                            console.log(data);
	                        }
	                    }); 
	                },
	                error:function(data) {
	                    console.log("실패" + data);
	                }
	            });
	            
            } else { 
            	return;
            }
           

        }
        
        function onlyNumber(obj){
            $(obj).keyup(function(){
                $(this).val($(this).val().replace(/[^0-9]/g,""));
            });
        }
        
        function surveyTop(obj){
            var offset = $("#desig_top").offset();
            if( offset ){
                $("html, body").animate({scrollTop : offset.top }, 200);
            }
        }
        
        function surveyClose(){
            self.close();
        }
        </script>
    </head> 

    <body style="overflow-x:hidden;">
        <input type="hidden" id="survay1"  value="">
        <input type="hidden" id="s_tel_no" value="">
        <input type="hidden" id="s_name"   value="">

        <%
        //System.out.println("이벤트 몇일째? " + idx +"일째");
        if( idx < 1 || idx > 10 ){
        %>
            <script type="text/javascript">
                alert("이벤트 기간이 아닙니다.");
                window.close();
            </script>
        <% 
        } else {
        %>
	     <div class="wrap" id="desig_top">
	         <div class="title">
	             <div class="closeBtn"><button onClick="surveyClose();"><img src="./img/close.png" alt=""></button></div>
	         </div>
	         <div class="contBox">  
	             <ul>
	                 <li class="contList">
	                     <div class="listTit mb20">
	                         <div class="dot"></div>
	                         <div class="tit">신규 콘텐츠란?</div>
	                         <div class="cont">통계청에서는 SGIS 신규 콘텐츠로 기존 공급자 관점 서비스에서 탈피하여 생활통계정보를 사용자가 보다 쉽게 이용할 수 있도록 신규 콘텐츠를 기획함</div>
	                         <br>
	                         <div class="cont" style="color:; font-size:14px;"></div>
	                     </div>
	                     <div><img src="./img/step.png" alt=""></div>
	                 </li>
	                 <li class="contList">
	                     <div class="listTit mb15">
	                         <div class="dot"></div>
	                         <div class="tit">명칭(안) : <span>명칭과 설명글을 참고하여 5개 중 1개를 선택해주세요</span></div>
	                     </div>  
	                      
	                     <div id="srv1">
	                     <table class="select info ml20">
	                         <colgroup>  
                                 <col style="width: 30px" />
	                             <col style="width: 168px" />
	                             <col style="width: 540px" /> 
	                         </colgroup>
	                         <thead>
	                             <tr>
                                     <th style="font-size:14px;">선택</th>
	                                 <th style="font-size:14px;">명칭(안)</th>
	                                 <th style="font-size:14px;">설명</th>
	                             </tr>
	                         </thead>
	                         <tbody>
	                             <tr> 
                                     <td><input type="radio" name="num" onclick="setVal(1,1,1)"></td>
	                                 <td style="font-size:14px;"><p onclick="setVal(1,1,1)">My통계로(路)</p></td>
	                                 <td style="font-size:14px;">‘路(길 로)’는 지도와 관련있는 단어로서 내가 원하는 통계정보를 지도 상에서 볼 수 있음</td>
	                             </tr>
	                             <tr>  
                                     <td><input type="radio" name="num" onclick="setVal(1,2,2)"></td>
	                                 <td style="font-size:14px;"><p onclick="setVal(1,2,2)">My통계맵(map)</p></td>
	                                 <td style="font-size:14px;">내가 원화는 통계를 지도 상에서 볼 수 있음</td>
	                             </tr>
	                             <tr> 
                                     <td><input type="radio" name="num" onclick="setVal(1,3,3)"></td>
	                                 <td style="font-size:14px;"><p onclick="setVal(1,3,3)">알기쉬운 통계지도</p></td>
	                                 <td style="font-size:14px;">신규 이용자들도 SGIS 포털서비스를 보다 간편하게 이용할 수 있음</td>
	                             </tr>
	                             <tr>
                                     <td><input type="radio" name="num" onclick="setVal(1,4,4)"></td>
	                                 <td style="font-size:14px;"><p onclick="setVal(1,4,4)">우리동네 통계로(路)</p></td>
	                                 <td style="font-size:14px;">내 위치를 중심으로 내가 원하는 통계정보를 지도 상에서 볼 수 있음</td>
	                             </tr> 
	                             <tr>
                                     <td><input type="radio" name="num" onclick="setVal(1,5,5)"></td>
	                                 <td style="font-size:14px;"><p onclick="setVal(1,5,5)">우리동네 통계지도</p></td>
	                                 <td style="font-size:14px;">나와 내 주변(동네, 마을)을 중심으로 내가 원하는 통계지도를 볼 수 있음</td>
	                             </tr>
	                         </tbody>
	                     </table> 
	                     </div>
	                 </li>
	                 <li class="contList mb0">
	                     <div class="listTit">
	                         <div class="dot"></div>
	                         <div class="tit">사은품 : <span>참여하신 분들 중 100명을 추첨하여 경품(모바일 상품권 5천원) 지급</span></div>
	                     </div>
	                     <div class="cont ml20">개인정보 수집항목(성명, 휴대전화번호)은 추첨을 통한 상품권 지급 및 분석 목적으로만 사용되며, 경품 지급 후 파기됩니다. <br>개인정보 수집에 동의하지 않으시면 경품추첨에 응모되지 않습니다.</div>
	
	                     <div class="check">
	                         <input type="radio" name="agreement" value="Y"  onclick="fnAgree('Y');"/>동의
	                         <input type="radio" name="agreement" value="N"  onclick="fnAgree('N');" class="ml20"checked="checked">비동의
	                     </div>
	                     <div class="cont ml20 mb10">※ 아래의 정보는 경품지급 및 결과분석 목적으로만 활용합니다.
	                     </div> 
	                     <table class="info ml20">
	                         <colgroup>
	                             <col style="width: 100px" />
	                             <col style="width: 450px" />
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
	                         </tbody>
	                     </table>
	                 </li>
	             </ul>
	             <div class="btn">
	                 <button class="sub" onclick="surveyEnter();">제출하기</button>
	                 <button onclick="showEx();">활용사례 보기</button>
	             </div> 
	         </div>
	         
	         <div class="contBox2">
	             <div class="mb50">
	                 <div class="listTit mb20" id="desig_content">&nbsp;<br>
	                     <div class="dot">&nbsp;</div>
	                     <div class="tit">통계ME<sup>가칭</sup> 활용 사례</div>
	                 </div> 
	                 <div class="cont ml20">대전 서구 둔산2동에 사는 조ㅇㅇ씨(26세, 1인 가구)는 평소 약속장소로 이동할 때 ‘타슈(대전시 공공자전거)’를 이용하다가 <br>내가 살고 있는 동네에는 공공자전거 관련 시설이 어느 정도로 마련되어 있는지 궁금해졌다. <br> 통계ME<sup>가칭</sup> 검색 결과 둔산2동이 대전에서 공공자전거수 대비 보관소가 제일 많은 것을 확인한 조ㅇㅇ씨는 앞으로 타슈를 더 자주 이용하겠다고 생각했다. </div>
	             </div> 
	
	             <ul>
	                 <li class="contList2"> 
	                     <div class="cont2Tit"><span>①</span>생애주기 ‘청년’과 ‘1인 가구’를 선택</div>
	                     <div class="img-box"><img src="./img/designationImg1.png" alt=""></div>
	                 </li>
	                 <li class="contList2">
	                     <div class="cont2Tit"><span>②</span>관심 있는 ‘탈거리’ 선택</div>
	                     <div class="img-box"><img src="./img/designationImg2.png" alt=""></div>
	                 </li>
	                 <li class="contList2">
	                     <div class="cont2Tit"><span>③</span>‘공공자전거수 대비 보관소 분포 현황’ 등 통계정보 목록 표출됨 </div>
	                     <div class="img-box"><img src="./img/designationImg3.png" alt=""></div>
	                 </li>
	                 <li class="contList2">
	                     <div class="cont2Tit"><span>④</span>(지도 보기) 좀 더 자세히 보려면 서비스 출처인 ‘정책통계지도 바로가기’ 클릭</div>
	                     <div class="img-box"><img src="./img/designationImg4.png" alt=""></div>
	                 </li>
	                 <li class="contList2">
	                     <div class="cont2Tit"><span>⑤</span>(상세정보 보기) 데이터출처 등 메타 정보를 볼 수 있고, 지역 범주별 지도를 새 창으로 확인 가능</div>
	                     <div class="img-box"><img src="./img/designationImg5.png" alt=""></div>
	                 </li>
	             </ul>
	             <div class="closeBtn2"><button onClick="surveyTop();">맨 위로</button></div>
	         </div>
	     </div>

        <%
        }
        %>
    </body>
</html>