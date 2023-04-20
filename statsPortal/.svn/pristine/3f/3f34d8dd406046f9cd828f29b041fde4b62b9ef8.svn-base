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
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>통계지리정보서비스</title>
    <script type="text/javascript" src="/js/common/includeHead.js"></script>
    <script type="text/javascript" src="/js/plugins/slick.min.js"></script>    
    <script type="text/javascript" src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>
    <script type="text/javascript" src="/js/common/common.js"></script>
    <script type="text/javascript" src="/js/index.js"></script>        
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
			
			console.log($("#gnb ul li").css("font-size"));
		});
    </script>
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
        	<jsp:include page="/view/common/includeSearch"></jsp:include>
        </header>
        <!--//header-->
        <hr class="hidden" />
        <!--contents-->
        <div id="container">
            <h2 class="hidden">본문시작</h2>
            <!--topCont-->
            <div class="topCont">
                <!--topGraph-->
                <div class="topGraph">
                    <!--inner-->
                    <div class="inner">
                        <!--rollGraphBox-->
                        <div class="rollGraphArea">
                            <h3>일자리통계 주요지표</h3>
                            <!--rollGraph-->
                            <div class="rollGraph">
                                <div class="cont clearFix">
                                    <div class="txtInfo">
                                        <p><strong>고용률</strong><span>('18.06 기준)</span></p>
                                        <div class="percent">76%<span class="ico_up">3.1</span></div>
                                    </div>
                                    <div>그래프영역 1</div>
                                </div>
                                <div class="cont clearFix" style="display:none;">
                                    <div class="txtInfo">
                                        <p><strong>취업률</strong><span>('18.06 기준)</span></p>
                                        <div class="percent">60%<span class="ico_down">4.1</span></div>
                                    </div>
                                    <div>그래프영역 2</div>
                                </div>
                                <div class="cont clearFix" style="display:none;">
                                    <div class="txtInfo">
                                        <p><strong>퇴사율</strong><span>('18.06 기준)</span></p>
                                        <div class="percent">20%<span class="ico_up">3.1</span></div>
                                    </div>
                                    <div>그래프영역 3</div>
                                </div>
                            </div>
                            <!--//rollGraph-->
                            <!--controllBox-->
                            <div class="controllBox">
                                <div class="controller">
                                    <button type="button" class="btn_prev"><span class="hidden">이전</span></button><button type="button" class="btn_pause"><span class="hidden">자동넘김 중지</span></button><button type="button" class="btn_next"><span class="hidden">다음</span></button>
                                </div>
                                <div class="pagination">
                                    <a href="/" class="active"><span class="hidden">1</span></a><a href="/"><span class="hidden">2</span></a><a href="/"><span class="hidden">3</span></a>
                                </div>
                            </div>
                            <!--//controllBox-->
                        </div>
                        <!--//rollGraphBox-->
                        <!--ad_banner-->
                        <div class="ad_banner">
                            <div class="main_slick">
                                <div><a href="/"><img src="/publish_2018/include/images/dummy/img_banner.png" alt="ucc 공모전"></a></div>
                                <div><a href="/"><img src="/publish_2018/include/images/dummy/img_banner.png" alt="국가승인통계 활용"></a></div>
                                <div><a href="/"><img src="/publish_2018/include/images/dummy/img_banner.png" alt="KOSIS"></a></div>
                            </div>
                            <ul class="pagination">
                                <li><a href="/"><span class="hidden">1</span></a></li>
                                <li><a href="/" class="active"><span class="hidden">2</span></a></li>
                                <li><a href="/"><span class="hidden">3</span></a></li>
                            </ul>
                        </div>
                        <!--//ad_banner-->
                    </div>
                    <!--//inner-->
                </div>
                <!--//topGraph-->

            </div>
            <!--//topCont-->
            <!--inner-->
            <div class="inner clearFix">
                <!--boxCont-->
                <div class="boxCont">
                    <!--row-->
                    <div class="row type01">
                        <div class="rowTit"><strong>통계주제도</strong></div>
                        <!--tabArea-->
                        <div class="tabArea">
                            <!--mainTab-->
                            <div class="mainTab">
                                <ul class="clearFix">
<!--                                     <li class="active"><a href="/">인구와 가구</a></li> -->
<!--                                     <li><a href="/">주거와 교통</a></li> -->
<!--                                     <li><a href="/">복지와 문화</a></li> -->
<!--                                     <li><a href="/">노동과 경제</a></li> -->
<!--                                     <li><a href="/">환경과 안전</a></li> -->
<!--                                     <li class="btnMore"><a href="/view/thematicMap/categoryList"><span class="hidden">더보기</span></a></li> -->
                                </ul>
                            </div>
                            <!--//mainTab-->
                            <!--mainTabCont-->
                            <div class="mainTabCont clearFix">
                                <!--cont-->
<!--                                 <div class="cont clearFix"> -->
<!--                                     <div> -->
<!--                                         <strong>1인 가구 변화</strong> -->
<!--                                         <p>2000년 대비 2016년의 1인 가구 증감률을 행정구역별로 비교하는 주제도</p> -->
<!--                                         <div class="tag"> -->
<!-- 	                                        <a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=oqrEJzwryv201601211158069778qDoxqxpMF&theme=CTGR_001&mapType=04" class="blue">읍면동</a> -->
<!-- 	                                        <a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=oqrEJzwryv201601211158069778qDoxqxpMF&theme=CTGR_001&mapType=04" class="green">증감</a> -->
<!-- 	                                        <a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=oqrEJzwryv201601211158069778qDoxqxpMF&theme=CTGR_001&mapType=04" class="orange">2000~2016</a> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                     <div> -->
<!--                                         <strong>인구변화</strong> -->
<!--                                         <p>200년 대비 2016년의 인구수와 증감 현황을 행정구역별로 비교하는 주제도</p> -->
<!--                                         <div class="tag"> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=tzvK4xEuFD20160121115806965LnKnzJtJ7F&theme=CTGR_001&mapType=04" class="blue">읍면동</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=tzvK4xEuFD20160121115806965LnKnzJtJ7F&theme=CTGR_001&mapType=04" class="sky">시계열</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=tzvK4xEuFD20160121115806965LnKnzJtJ7F&theme=CTGR_001&mapType=04" class="orange">2000~2016</a> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                     <div> -->
<!--                                         <strong>인구이동</strong> -->
<!--                                         <p>인구의 순이동자(전입-전출) 현황과 총인구 대비 이동자 수의 비율을 행정구역별로 비교하여 지자체별 인구유입 현황을 파악 할 수 있는 주제도</p> -->
<!--                                         <div class="tag"> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=uwGrLn6xJp20160202203129219tIGyEvtDpH&theme=CTGR_001&mapType=03" class="blue">시군구</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=uwGrLn6xJp20160202203129219tIGyEvtDpH&theme=CTGR_001&mapType=03" class="purple">색상</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=uwGrLn6xJp20160202203129219tIGyEvtDpH&theme=CTGR_001&mapType=03" class="orange">2016</a> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                 </div> -->
                                <!--//cont-->
                                <!--cont-->
<!--                                 <div class="cont" style="display:none;"> -->
<!--                                     <div> -->
<!--                                         <strong>인구 천명당 주택 수 증감 현황</strong> -->
<!--                                         <p>2000년 대비 2016년의 주택수 증감률을 행정구역별로 비교하여 주택변화를 파악해 볼 수 있는 주제도</p> -->
<!--                                         <div class="tag"> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=pEGKMpJMur20160121115806982swMnroIsrv&theme=CTGR_002&mapType=04" class="blue">읍면동</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=pEGKMpJMur20160121115806982swMnroIsrv&theme=CTGR_002&mapType=04" class="green">증감</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=pEGKMpJMur20160121115806982swMnroIsrv&theme=CTGR_002&mapType=04" class="orange">2016</a> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                     <div> -->
<!--                                         <strong>주택당 평균 가구원 현황</strong> -->
<!--                                         <p>행정구역별로 주택당 평균 가구원수를 비교해 볼 수 있는 주제도</p> -->
<!--                                         <div class="tag"> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=IpuF2oqH6L20160121115806984w4uCvEzJru&theme=CTGR_002&mapType=05" class="blue">읍면동</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=IpuF2oqH6L20160121115806984w4uCvEzJru&theme=CTGR_002&mapType=05" class="sky">시계열</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=IpuF2oqH6L20160121115806984w4uCvEzJru&theme=CTGR_002&mapType=05" class="orange">2000~2016</a> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                     <div> -->
<!--                                         <strong>아파트 현황</strong> -->
<!--                                         <p>아파트 수와 총 주택 중 아파트 비율, 증감률을 행정구역별로 비교할 수 있는 주제도</p> -->
<!--                                         <div class="tag"> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=rLvGnxrtvo20160121115806982pvp4FKMFFn&theme=CTGR_002&mapType=05" class="blue">읍면동</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=rLvGnxrtvo20160121115806982pvp4FKMFFn&theme=CTGR_002&mapType=05" class="purple">시계열</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=rLvGnxrtvo20160121115806982pvp4FKMFFn&theme=CTGR_002&mapType=05" class="orange">2000~2016</a> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                 </div> -->
                                <!--//cont-->
                                <!--cont-->
<!--                                 <div class="cont" style="display:none;"> -->
<!--                                     <div> -->
<!--                                         <strong>보육업체 취약인구현황</strong> -->
<!--                                         <p>행정구역별 보육업체 취약인구를 조회할 수 있는 주제도</p> -->
<!--                                         <div class="tag"> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=mtjKxt2Zkb20171109101132537k7SYSI50kn&theme=CTGR_003&mapType=03" class="blue">읍면동</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=mtjKxt2Zkb20171109101132537k7SYSI50kn&theme=CTGR_003&mapType=03" class="green">색상</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=mtjKxt2Zkb20171109101132537k7SYSI50kn&theme=CTGR_003&mapType=03" class="orange">2016</a> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                     <div> -->
<!--                                         <strong>보건시설 1개당 65세이상 노인인구</strong> -->
<!--                                         <p>보건시설1개당 65세 이상 노인인구수를 행정구역별로 비교해 볼 수 있는 주제도</p> -->
<!--                                         <div class="tag"> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=H3Gn9rLznD20141030095228163Lo1DnuEFuL&theme=CTGR_003&mapType=03" class="blue">읍면동</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=H3Gn9rLznD20141030095228163Lo1DnuEFuL&theme=CTGR_003&mapType=03" class="sky">색상</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=H3Gn9rLznD20141030095228163Lo1DnuEFuL&theme=CTGR_003&mapType=03" class="orange">2016</a> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                     <div> -->
<!--                                         <strong>인구 천명당 의료기관 병상수 및 의사 수</strong> -->
<!--                                         <p>인구천명당 의료기관 병상 수와 종사 의사수를 확인할수 있으며, 행정구역별로 분할뷰로 비교 ... </p> -->
<!--                                         <div class="tag"> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=KzoL6n1vsK20160127192530684FqFDJMDyF8&theme=CTGR_003&mapType=06" class="blue">시군구</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=KzoL6n1vsK20160127192530684FqFDJMDyF8&theme=CTGR_003&mapType=06" class="purple">분할뷰</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=KzoL6n1vsK20160127192530684FqFDJMDyF8&theme=CTGR_003&mapType=06" class="orange">2015</a> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                 </div> -->
                                <!--//cont-->
                                <!--cont-->
<!--                                 <div class="cont" style="display:none;"> -->
<!--                                     <div> -->
<!--                                         <strong>사업체수 분포 현황</strong> -->
<!--                                         <p>2010년에서 2016년 사이에 전국의 사업체수 분포를 파악할 수 있으며, 행정구역별로 사업체수를 비교할수 있는 주제도</p> -->
<!--                                         <div class="tag"> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=LoH2vstuwK20160121115806988uq2MvKFwMw&theme=CTGR_004&mapType=05" class="blue">읍면동</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=LoH2vstuwK20160121115806988uq2MvKFwMw&theme=CTGR_004&mapType=05" class="green">시계열</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=LoH2vstuwK20160121115806988uq2MvKFwMw&theme=CTGR_004&mapType=05" class="orange">2000~2016</a> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                     <div> -->
<!--                                         <strong>종사자수 분포 현황</strong> -->
<!--                                         <p>사업체에 종사하는 종사자수의 분포를 파악할 수 있으며, 지역별로 종사자 수를 비교할 수 있는 주제도</p> -->
<!--                                         <div class="tag"> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=JouDrDrEIF201601211158069886Mv8uqz22x&theme=CTGR_004&mapType=05" class="blue">읍면동</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=JouDrDrEIF201601211158069886Mv8uqz22x&theme=CTGR_004&mapType=05" class="sky">시계열</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=JouDrDrEIF201601211158069886Mv8uqz22x&theme=CTGR_004&mapType=05" class="orange">2000~2016</a> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                     <div> -->
<!--                                         <strong>인구천명당 사업체 전체산업 현황</strong> -->
<!--                                         <p>인구 천명당 사업체(전체산업)의 수를 읍면동별로 비교해 볼 수 있는 주제도</p> -->
<!--                                         <div class="tag"> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=nnxnIHsHuC201601211158069883D4EKponMJ&theme=CTGR_004&mapType=03" class="blue">읍면동</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=nnxnIHsHuC201601211158069883D4EKponMJ&theme=CTGR_004&mapType=03" class="purple">색상</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=nnxnIHsHuC201601211158069883D4EKponMJ&theme=CTGR_004&mapType=03" class="orange">2016</a> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                 </div> -->
                                <!--//cont-->
                                <!--cont-->
<!--                                 <div class="cont" style="display:none;"> -->
<!--                                     <div> -->
<!--                                         <strong>지진발생 분포지역</strong> -->
<!--                                         <p>기상청에서 매년 발행하는 지진연보 간행물의 지진발생 현황</p> -->
<!--                                         <div class="tag"> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=41d1dhxBgx20180627145739008kXnl0kFaa8&theme=CTGR_005&mapType=05" class="blue">시도</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=41d1dhxBgx20180627145739008kXnl0kFaa8&theme=CTGR_005&mapType=05" class="green">시계열</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=41d1dhxBgx20180627145739008kXnl0kFaa8&theme=CTGR_005&mapType=05" class="orange">2001~2017</a> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                     <div> -->
<!--                                         <strong>미세먼지 대기오염도 현황</strong> -->
<!--                                         <p>대기오염물질에 대한 오염도 현황을 파악할수 있는 미세먼지 (PM-10) 연평균 농도를 행정구역별로 조회 할 수 있는 주제도</p> -->
<!--                                         <div class="tag"> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=9pyrpJvwHw20160121115806991GvpLyuuwDt&theme=CTGR_005&mapType=05" class="blue">시군구</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=9pyrpJvwHw20160121115806991GvpLyuuwDt&theme=CTGR_005&mapType=05" class="sky">시계열</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=9pyrpJvwHw20160121115806991GvpLyuuwDt&theme=CTGR_005&mapType=05" class="orange">2014~2016</a> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                     <div> -->
<!--                                         <strong>일산화탄소 대기오염도 현황</strong> -->
<!--                                         <p>대기오염물질에 대한 오염도 현황을 파악할수 있는 일산화탄소 (CO) 연평균 농도를 행정구역별로 조회 할 수 있는 주제도</p> -->
<!--                                         <div class="tag"> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=EItIIxKpqw20160121115806992KLww5xGJKJ&theme=CTGR_005&mapType=03" class="blue">시군구</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=EItIIxKpqw20160121115806992KLww5xGJKJ&theme=CTGR_005&mapType=03" class="purple">색상</a> -->
<!--                                         	<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=EItIIxKpqw20160121115806992KLww5xGJKJ&theme=CTGR_005&mapType=03" class="orange">2016</a> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                 </div> -->
                                <!--//cont-->
                            </div>
                            <!--//mainTabCont-->
                        </div>
                        <!--//tabArea-->
                    </div>
                    <!--//row-->
                    <!--row-->
                    <div class="row type02">
                        <div class="rowTit"><strong>대화형<br />통계지도</strong></div>
                        <div class="menustats">
                            <div class="menuRoll">
                                <ul class="clearFix">
                                    <li class="menu_01"><a href="/view/map/interactiveMap/mainIndexView">주요자료<br />총조사</a></li>
                                    <li class="menu_02"><a href="/view/map/interactiveMap/populationHouseView">인구주택<br />총조사</a></li>
                                    <li class="menu_03"><a href="/view/map/interactiveMap/3fView">농림어업<br />총조사</a></li>
                                    <li class="menu_04"><a href="/view/map/interactiveMap/companyView">전국사업체<br />조사</a></li>
                                    <li class="menu_05"><a href="/view/map/interactiveMap/kosisView">KOSIS<br />(지역통계)</a></li>
                                    <li class="menu_06"><a href="/view/map/interactiveMap/publicDataView">공공<br />데이터</a></li>
                                    <li class="menu_07"><a href="/view/map/interactiveMap/userDataView">나의<br />데이터</a></li>
                                </ul>
                            </div>
                            <div>
                                <button class="btn_prev"><span class="hidden">이전</span></button>
                                <button class="btn_next"><span class="hidden">다음</span></button>
                            </div>
                        </div>
                    </div>
                    <!--//row-->
                    <!--row-->
                    <div class="row type03">
                        <div class="rowTit"><strong>분석지도</strong></div>
                        <div class="menuMap">
                            <ul class="clearFix">
                                <li class="menu_01"><a href="https://analysis.kostat.go.kr/funny_month/month/sta_month_main.do">월간통계</a></li>
                                <li class="menu_02"><a href="https://sgis.kostat.go.kr/jsp/pyramid/pyramid1.jsp">인구<br />피라미드</a></li>
                                <li class="menu_03"><a href="https://analysis.kostat.go.kr/publicsmodel/">고령화<br />현황보기</a></li>
                                <li class="menu_04"><a href="https://sgis.kostat.go.kr/statbd/family_01.vw">성씨분포</a></li>
                                <li class="menu_05"><a href="https://sgis.kostat.go.kr/statbd/future_01.vw">지방의<br />변화보기</a></li>
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
                            <strong>활용서비스</strong>
                            <div class="btnService">
                                <button type="button" class="btn_prev"><span class="hidden">이전</span></button>
                                <button type="button" class="btn_next"><span class="hidden">다음</span></button>
                            </div>
                        </div>
                        <div class="serviceCont">
                            <ul class="clearFix">
                                <li class="menu_01"><a href="/view/map/policyStaticMap">정책<br />통계지도</a></li>
                                <li class="menu_02"><a href="/view/technicalBiz/technicalBizMap">기술업종<br />통계지도</a></li>
                                <li class="menu_05"><a href="/view/community/intro">지역현안<br />소통지도</a></li>
                                <li class="menu_03"><a href="/view/house/houseAnalysisMap">살고싶은<br />우리동네</a></li>
                                <li class="menu_04"><a href="/view/bizStats/bizStatsMap">우리동네<br />생활업종</a></li>
                                <li class="menu_06"><a href="https://sgis.kostat.go.kr/statexp/index.vw">통계<br />지도체험</a></li>
                                <li class="menu_07"></li>
                                <li class="menu_08"><a href="/view/gallery/resultGallery">통계<br />갤러리</a></li>
                            </ul>
                        </div>
                        <div class="pagination">
                            <a href="/" class="active"><span class="hidden">1</span></a><a href="/"><span class="hidden">2</span></a>
                        </div>
                    </div>
                    <div class="boardLink"><a href="/contents/shortcut/shortcut_05_02.jsp"><strong>자료제공 신청서비스</strong><span>통계청에서 생산한 <br/> 통계지리정보 자료를 제공·신청하는 서비스입니다.</span></a></div>
                </div>
                <!--//serviceArea-->
            </div>
            <!--//inner-->
            <!--listArea-->
            <div class="listArea clearFix">
                <!--inner-->
                <div class="inner">
                    <ul class="clearFix">
                        <li id="board001">
<!--                             <strong>공지사항</strong> -->
<!--                             <ul> -->
<!--                                 <li><a href="/">SGIS 의견수렴 이벤트 당첨자입니다.</a><span>05.08</span></li> -->
<!--                                 <li><a href="/">SGIS 모바일 ox퀴즈 이벤트...</a><span>05.08</span></li> -->
<!--                                 <li><a href="/">SGIS 의견수렴 이벤트 알림...</a><span>05.08</span></li> -->
<!--                                 <li><a href="/">SGIS 의견수렴 이벤트 알림...</a><span>05.08</span></li> -->
<!--                             </ul> -->
<!--                             <a href="/" class="btn_more"><span class="hidden">더보기</span></a> -->
                        </li>
                        <li id="board003">
<!--                             <strong>Q&A</strong> -->
<!--                             <ul> -->
<!--                                 <li><a href="/">SGIS 의견수렴 이벤트 당첨자입니다.</a><span>05.08</span></li> -->
<!--                                 <li><a href="/">SGIS 모바일 ox퀴즈 이벤트...</a><span>05.08</span></li> -->
<!--                                 <li><a href="/">SGIS 의견수렴 이벤트 알림...</a><span>05.08</span></li> -->
<!--                                 <li><a href="/">SGIS 의견수렴 이벤트 알림...</a><span>05.08</span></li> -->
<!--                             </ul> -->
<!--                             <a href="/" class="btn_more"><span class="hidden">더보기</span></a> -->
                        </li>
                        <li id="board002">
                            <strong>FAQ</strong>
<!--                             <ul> -->
<!--                                 <li><a href="/">SGIS 의견수렴 이벤트 당첨자입니다.</a><span>05.08</span></li> -->
<!--                                 <li><a href="/">SGIS 모바일 ox퀴즈 이벤트...</a><span>05.08</span></li> -->
<!--                                 <li><a href="/">SGIS 의견수렴 이벤트 알림...</a><span>05.08</span></li> -->
<!--                                 <li><a href="/">SGIS 의견수렴 이벤트 알림...</a><span>05.08</span></li> -->
<!--                             </ul> -->
<!--                             <a href="/" class="btn_more"><span class="hidden">더보기</span></a> -->
                        </li>
                        <li id="board000">
                            <strong>지역현안 소통지도</strong>
<!--                             <div class="imgArticle clearFix"> -->
<!--                                 <div><img src="/publish_2018/include/images/dummy/img_sun.png" alt="밀양"></div> -->
<!--                                 <div> -->
<!--                                     <strong>밀양중학교 1-6</strong> -->
<!--                                     <span>2018.06.26</span> -->
<!--                                 </div> -->
<!--                             </div> -->
<!--                             <a href="/view/community/intro" class="btn_more"><span class="hidden">더보기</span></a> -->
                        </li>
                        <li id="shareTable">
<!--                             <strong>통계갤러리</strong> -->
<!--                             <div class="imgArticle clearFix"> -->
<!--                                 <div><img src="/publish_2018/include/images/dummy/img_map.png" alt="지도"></div> -->
<!--                                 <div> -->
<!--                                     <strong>세종 65세이상 1인가구 분포</strong> -->
<!--                                     <span>2018.06.26</span> -->
<!--                                 </div> -->
<!--                             </div> -->
<!--                             <a href="/view/gallery/resultGallery" class="btn_more"><span class="hidden">더보기</span></a> -->
                        </li>
                        <li>
                            <ul class="sgs clearFix">
                                <li><a href="/edu/jsp/main.jsp">SGS에듀</a></li>
                                <li><a href="/developer/html/home.html">개발지원센터</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <!--//inner-->
            </div>
            <!--//listArea-->
        </div>
        <!--//contents-->
        <hr class="hidden" />
        <!--footer-->
        <footer id="footer" class="main">
	    	<!-- Bottom Include -->
	    	<div>
		         <div class="inner">
		             <h2><a href="/view/board/sopIntro"><img src="/publish_2018/include/images/common/img_logoFooter.png" alt="SGIS 소개"></a></h2>
		             <ul class="otherLink">
		                 <li class="menu_01"><a href="http://sti.kostat.go.kr/coresti/site/board/StudentBoardViewList.do?gmenu=3&rmenu=03&cmenu=0305&pageIndex=1&level1=&lecture_code=2482&kisu_code=6127&pageUnit=20&searchText=&searchField=lecture_name&select=0" target="_blank">SGIS* 공개강의실</a></li>
		                 <li class="menu_02"><a href="/view/board/mediaIntro">언론소개자료</a></li>
		                 <li class="menu_03"><a href="javascript:video();">SGIS* 홍보동영상</a></li>
		                 <li class="menu_04"><a href="/view/newhelp/us_help_10_0.jsp">서비스사용법</a></li>
		             </ul>
		         </div>
		    </div>
			<jsp:include page="/view/common/includeBottom"></jsp:include>
	    </footer>
    </div>
    <!--//wrap-->
</body>
</html>
