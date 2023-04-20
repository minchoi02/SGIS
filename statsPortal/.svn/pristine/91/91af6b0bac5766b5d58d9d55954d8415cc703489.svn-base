<%
/**************************************************************************************************************************
* Program Name  : 메인 JSP  
* File Name     : index.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
					out.println("location.href='/mobile';");
					out.println("</script>");
					out.println("");
					out.println("");
					break;
				}
			}
		}
	}
%>
<!-- Top Include -->
<jsp:include page="/view/common/common"></jsp:include>
<!DOCTYPE html>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"> -->
<html lang="ko">
<head>
    <meta charset="utf-8">
<!--     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi"> -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>통계지리정보서비스</title>
    <script  src="/js/common/includeHead.js"></script>
<!--     <script type="text/javascript" src="/js/plugins/slick.min.js"></script>     -->
    <script  src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>
    <script  src="/js/common/common.js"></script>
<!--     <script  src="/js/index.js"></script> -->
    <link href="/jsp/english/css/default.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="/css/layout.css" />
    <link rel="stylesheet" type="text/css" href="/jsp/english/css/main.css" />
    
	<script type="text/javascript">
		$(document).ready(function(){
		    srvLogWrite('A0', '09', '01', '00', '', '');
		});
		/** SRVLog 추가 이금은 2019.04.02 start**/
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
		/** SRVLog 추가 이금은 2019.04.02 end**/
	</script>
    <script>
	    $(function(){	
	    	$(".slickList").mCustomScrollbar({axis:"xy"}); 
		});
	    function video(){
	    	var url = '/html/videoPopup/popup.html';
		    var options = 'toolbar=no,scrollbars=no,resizable=no,copyhistory=no,'+
		                  'status=no,location=no,menubar=no,width=821,height=461'; 
		   window.open(url, 'video', options);
	    }
		
		function Pop_close(){
			$("#Popup_main").hide();
		}
		function gridPop(){
			var url = '/view/board/gridWrite';
		    var options = 'toolbar=no,scrollbars=no,resizable=no,copyhistory=no,'+
		                  'status=no,location=no,menubar=no,top=200,left=200'; 
		   window.open(url, '', options);
		}
        $(document).ready(function(){
            $(".select-box").on("click",function(){
                $(".navi-content").toggle();
                $(".map_stop").trigger("click");
            });
        });
    </script>
   


    <style>
    	.navi-content{
   		    background: #fff;
		    width: 246px;
		    position: absolute;
		    top: 89px;
		    left: 0;
		    border: 2px solid #1878CC;
		    z-index: 3000;
		    height: 168px;
		    max-height: 300px;
		    line-height: 22px;
		    display: none;
    	}
    	.addr_box{
    		display: inline-block;
		    text-align: left;
		    width: 49%;
		    height: 132px; 
		    max-height: 263px;
		    overflow:hidden;
		    overflow-y: auto;
    	}
    	.addr_box .li-on{
    		background: #1878CC;
    		color: #fff
    	}
    	.navi-action{
    		/**padding: 7px;**/
    	}
    	.topGraph .rollGraph .txtInfo strong{
    		font-family: 'Nanum Gothic'
    	}
    	#container {
    		max-width: 1080px;
    		width:1080px;
    	}
    	.boxCont .row.type02 .rowTit + div , .boxCont .row.type01 .rowTit + div{
    		width: 300px;
		    float: left;
		    font-size: 15px;
		    /* border: 1px solid #000; */
		    line-height: 1.5;
		    margin: 45px 0 30px 20px;
		    color: #6e6e6e;
    	}
    	.boxCont .row.type01 .rowTit , .boxCont .row.type02 .rowTit {
   		    height: 167px;
	        background-position: 77px 79px;
    	}
    	.boxCont .row.type02 .rowTit{
    		background-position: 77px 105px;
    	}
    	header{
    		bottom: 0;
    	}
    	.row.type01{
    	    z-index: 9;
		    top: 0;
		    background: #fff url(/img/bg/bg_im.png) no-repeat 265px 20px;
		    box-sizing: border-box;
		    background-position: 520px 18px;
    	}
    	.row.type02{
    	    z-index: 9;
		    top: 0;
		        background: #fff url(/img/bg/bg_tm.png) no-repeat 265px 20px;
		    box-sizing: border-box;
		    background-position: 496px -17px;
    	}
    	.serviceArea .serviceCont li a{
    		font-size: 12px;
    	}
    	.serviceArea .boardLink strong{
    		font-size: 15px;
    	}
    	.serviceArea .boardLink:nth-child(2) , .serviceArea .boardLink:nth-child(3){
    		background-position: 27px 12px;
    	}
    	.serviceArea .boardLink:nth-child(3) a{
    		padding: 99px 7px 30px 26px;
    	}
    	.serviceArea .boardLink:nth-child(2) a{
    		padding: 89px 7px 30px 22px;
    	}
    </style>
</head>

<body class="main">
	 <!-- 스킵네비게이션 -->
    <div class="accNav">
        <p><a href="#gnb">주메뉴 바로가기</a></p>
        <p><a href="#container">본문 바로가기</a></p>
    </div>
    <!-- 스킵네비게이션 -->
    <!--wrap-->
    <div id="wrap">
        <!--header-->
        <header>
			<jsp:include page="/jsp/english/includeSearch.jsp"></jsp:include>
		</header>
        <!--//header-->
        <hr class="hidden" />
        <!--contents-->
        <div id="container">
            <h2 class="hidden">본문시작</h2>
            <!--topCont-->
            <!--inner-->
            <div class="inner clearFix">
                <!--boxCont-->
                <div class="boxCont">
                    <!--row-->
                    <div class="row type01">
                        <div class="rowTit"><strong><a href="javascript:logWriteAndMove('A0', '09', '03', '00', '', '', '/jsp/english/thematic.jsp', false);">Thematic Maps</a></strong></div>
                        <!--tabArea-->
                        <div class="tabArea">
                            <!--//mainTabCont-->
                            You can easily view statistical maps of topics that you are interested in without setting them up.
                        </div>
                        <!--//tabArea-->
                    </div>
                    <!--//row-->
                    <!--row-->
                    <div class="row type02">
                        <div class="rowTit"><strong><a href="javascript:logWriteAndMove('A0', '09', '04', '00', '', '', '/jsp/english/interactive.jsp', false);">Interactive <br />Statistical Map</a></strong></div>
                        <div class="tabArea">
                            <!--//mainTabCont-->
                            Various data such as population, household, house, business, etc. can be displayed on the map according to user's condition.
                        </div>
                    </div>
                    <!--//row-->
                    <!--row-->
                    <div class="row type03">
                        <div class="rowTit"><strong><a href="javascript:logWriteAndMove('A0', '09', '06', '00', '', '', '/jsp/english/analysis.jsp', false);">Analysis<br />Map</a></strong></div>
                        <div class="menuMap">
                            <ul class="clearFix">
                                <li class="menu_01"><a href="javascript:logWriteAndMove('A0', '09', '06', '00', '', '', '/jsp/english/analysis.jsp?analysis1', false);"><span>Monthly<br/>Statistics</span></a></li>
                                <li class="menu_02"><a href="javascript:logWriteAndMove('A0', '09', '06', '00', '', '', '/jsp/english/analysis.jsp?analysis2', false);"><span>Population<br/>Pyramid</span></a></li>
                                <li class="menu_03"><a href="javascript:logWriteAndMove('A0', '09', '06', '00', '', '', '/jsp/english/analysis.jsp?analysis3', false);"><span>Viewing<br/>Aging Status</span></a></li>
                                <li class="menu_04"><a href="javascript:logWriteAndMove('A0', '09', '06', '00', '', '', '/jsp/english/analysis.jsp?analysis4', false);"><span>Sumame<br/>Distribution</span></a></li>
                                <li class="menu_05"><a href="javascript:logWriteAndMove('A0', '09', '06', '00', '', '', '/jsp/english/analysis.jsp?analysis5', false);"><span>Change Of<br/>Province</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <!--//row-->
                </div>
                <!--//boxCont-->
                <!--serviceArea-->
                <div class="serviceArea">
                    <div class="serviceBox">
                        <div class="serviceTit">
                            <strong><a href="javascript:logWriteAndMove('A0', '09', '05', '00', '', '', '/jsp/english/application.jsp', false);">Application</a></strong>
                            <div class="btnService">
                                <button type="button" class="btn_prev" onClick="javascript:srvLogWrite('A0', '09', '05', '00', '', '');"><span class="hidden">이전</span></button>
                                <button type="button" class="btn_next" onClick="javascript:srvLogWrite('A0', '09', '05', '00', '', '');"><span class="hidden">다음</span></button>
                            </div>
                        </div>
						<div class="serviceCont">
							<ul class="clearFix">
								<li class="menu_01"><a href="javascript:logWriteAndMove('A0', '09', '05', '00', '', '', '/jsp/english/application.jsp?application1', false);">Job Map</a></li>
								<li class="menu_02"><a href="javascript:logWriteAndMove('A0', '09', '05', '00', '', '', '/jsp/english/application.jsp?application2', false);">My Statistics Road</a></li>
								<li class="menu_03"><a href="javascript:logWriteAndMove('A0', '09', '05', '00', '', '', '/jsp/english/application.jsp?application4', false);">Sectors<br>Statistical Map</a></li>
								<li class="menu_04"><a href="javascript:logWriteAndMove('A0', '09', '05', '00', '', '', '/jsp/english/application.jsp?application7', false);">Communication<br/>Map</a></li>
								<li class="menu_05"><a href="javascript:logWriteAndMove('A0', '09', '05', '00', '', '', '/jsp/english/application.jsp?application3', false);">Policy Statistical Map</a></li>
								<li class="menu_06"><a href="javascript:logWriteAndMove('A0', '09', '05', '00', '', '', '/jsp/english/application.jsp?application5', false);">Where We Want<br /> To Live In</a></li>
								<li class="menu_07"><a href="javascript:logWriteAndMove('A0', '09', '05', '00', '', '', '/jsp/english/application.jsp?application9', false);">Statistical<br/> Gallery</a></li>
							</ul>
						</div>
						
						
                      	<!-- <div class="pagination">
                            <a href="/" class="active"><span class="hidden">1</span></a><a href="/"><span class="hidden">2</span></a>
                        </div> -->
                       </div>
                    <div class="boardLink"><a href="javascript:logWriteAndMove('A0', '09', '06', '00', '', '', '/jsp/english/application.jsp?application8', false);"><strong>Statistics Map Experience</strong></a></div>
                    <div class="boardLink"><a href="javascript:logWriteAndMove('A0', '09', '05', '00', '', '', '/jsp/english/application.jsp', false);"><strong>Application</strong></a></div>
                </div>
                <!--//serviceArea-->
            </div>
            <!--//inner-->
        </div>
    </div>
    <!--//wrap-->
</body>
</html>
