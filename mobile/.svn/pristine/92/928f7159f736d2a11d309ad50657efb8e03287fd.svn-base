<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %> 
<!DOCTYPE html>
<html lang="ko">
<head>
<title>생활권역 통계지도</title>
<meta name="title" content="생활권역 통계지도">

	<link rel="stylesheet" href="${ctx }/resources/m2020/plugins/swiper.css" />
	
	<script src="${ctx }/resources/m2020/plugins/swiper.min.js" type="text/javascript"></script>
	<script src="${ctx }/resources/m2020/plugins/jquery.touchSwipe.min.js" type="text/javascript"></script>
	<script src="${ctx }/resources/m2020/js/jquery.touchFlow.js" type="text/javascript"></script>
	
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport"/>
	<link rel="stylesheet" href="${ctx }/resources/m2021/css/style.css" />
	<link rel="stylesheet" href="${ctx }/resources/m2021/css/catchmentArea/map-report.css" />

	<script src="${ctx }/resources/m2020/plugins/Swiper-3.3.1/js/swiper.min.js" type="text/javascript"></script>
	<script src="${ctx }/resources/m2021/js/catchmentArea/common.js"></script>
	<script src="${ctx }/resources/m2021/js/catchmentArea/map.js"></script>
	<script src="${ctx }/resources/plugins/highcharts/highcharts-3d.src.js"></script>
	<script src="${ctx }/resources/plugins/highcharts/modules/exporting.js"></script>
	<script src="${ctx }/resources/m2021/js/catchmentArea/plugin/solid-gauge.js"></script>
	<script src="${ctx }/resources/plugins/highcharts/highchart.drag.js"></script>
	<!--PDF관련 .js  -->
	<script type="text/javascript" src="${ctx }/resources/m2021/js/catchmentArea/plugin/jsPDF/jspdf.min.js"></script>
	<script type="text/javascript" src="${ctx }/resources/m2021/js/catchmentArea/plugin/imageCapture/rgbcolor.js"></script>
	<script type="text/javascript" src="${ctx }/resources/m2021/js/catchmentArea/plugin/imageCapture/canvg.js"></script> <!-- 2017.03.13 pdf저장 이슈  -->
    <script type="text/javascript" src="${ctx }/resources/m2021/js/catchmentArea/plugin/imageCapture/html2canvas.js"></script>

<script>
//<![CDATA[
//]]>
</script>
	<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaApi.js"></script>
	<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaMap.js"></script>
	<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaObj.js"></script>
	<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaBtn.js"></script>
	<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaMenu.js"></script>
	<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaMsgCommon.js"></script>
	<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaLegendInfo.js"></script>	
	<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaMask.js"></script>
	<script src="${ctx }/resources/m2021/js/catchmentArea/catchmentAreaReport.js"></script>
	<script src="${ctx }/resources/m2021/js/catchmentArea/gis.service.absAPI.js"></script>
</head>
<body class="wrap" >
	<div id="mask" style="background:#ffffff;z-index:10000;width:100%;height:100%; display:none;">
		<div id="AlertMessage">보고서 생성중입니다. 잠시만 기다려주세요.</div>
	</div>
	<div id="wrap">
    <!-- begin::header -->
    <header class="header">
        <div class="logo"><img src="${ctx }/resources/m2021/images/logo.png" alt="SGIS plus 통계지리정보서비스"></div>
        <h1 id = "reportTitle"><a href="javascript:$catchmentAreaReport.ui.reportPdfDown();" id="pdfdown"></a></h1>
    </header>
    <!-- end::header -->
	
    
    <!-- begin::container -->
    <div class="container" >
        <div class="inner">
            <table>
                <colgroup>
                    <col style="width: 30%;">
                    <col style="width: 20%;">
                    <col style="width: 20%;">
                    <col style="width: 30%;">
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">선택 지점</th>
                        <th scope="col">선택 영역</th>
                        <th scope="col">총 면적</th>
                        <th scope="col">기준 연도</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <!-- <b>롯대백화점 강남점</b><br>고쳐야되 -->
                            <p id= "statLocation"></p><!-- 서울특별시 강남구 도곡로 41 -->
                        </td>
                        <td><p id = "statRange"></p>
                           <!--  주행거리 기준<br> -->
                            <b id = "indexText"><!-- 0.5km --></b>
                        </td>
                        <td><p id = "areaSize"></p><!-- 0.35km <sup>2</sup>--></td>
                        <td><p id = "statYear"></p>
                       <!--      인구/가구/주택 : 2019년<br>
                            사업체/종사자 : 2019년 -->
                        </td>
                    </tr>
                </tbody>
            </table>
    
            <div class="map">
                <h2>생활권역 통계지도</h2>
                <div class="map__con" id="reportMapDiv">
                </div>
            </div>
    
            <div class="line">
                <h3 class="chart__tit" id="base_year_pop">년 인구</h3>
                <div class="col-2">
                    <div class="chart">
                        <h4>성별</h4>
                        <div class="chart__wrap srvAreaChat" id="genderChart">
                          <!--   <div class="chart__con srvAreaChart" id='sa01_pntChart02' style="min-height: 200px; background-color: #dfdfdf;">
                          	 	 <div id='sa01_pieChartDiv02'></div></div>
                            </div> -->
                            <div class="chart__table">
                                <table>
                                    <colgroup>
                                        <col style="width: 40%;">
                                        <col style="width: 30%;">
                                        <col style="width: 30%;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th scope="col">구분</th>
                                            <th scope="col">인구 수(명)</th>
                                            <th scope="col">구성비(%)</th>
                                        </tr>
                                    </thead>
                                    <tbody id = "tbody_gender">
                                        <!-- <tr class="on">
                                            <td>전체</td>
                                            <td>17,453</td>
                                            <td>100.0</td>
                                        </tr>
                                        <tr>
                                            <td>남자</td>
                                            <td>8,282</td>
                                            <td>47.5</td>
                                        </tr>
                                        <tr>
                                            <td>여자</td>
                                            <td>9,174</td>
                                            <td>52.6</td>
                                        </tr> -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="chart">
                        <h4 class="chart__tit">연령별</h4>
                        <div class="chart__wrap srvAreaChat" id="popsChart">
                            <!-- <div class="chart__con srvAreaChart" id= "sa01_pntChart01" style="min-height: 200px; background-color: #dfdfdf;">
                       			<div id='sa01_pieChartDiv01'></div>
                            </div> -->
                            <div class="chart__table">
                                <table>
                                    <colgroup>
                                        <col style="width: 40%;">
                                        <col style="width: 30%;">
                                        <col style="width: 30%;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th scope="col">구분</th>
                                            <th scope="col">인구 수(명)</th>
                                            <th scope="col">구성비(%)</th>
                                        </tr>
                                    </thead>
                                    <tbody id = "tbody_age">
                                       <!--  <tr class="on">
                                            <td>전체</td>
                                            <td>17,453</td>
                                            <td>100.0</td>
                                        </tr>
                                        <tr>
                                            <td>0~9세</td>
                                            <td>1,142</td>
                                            <td>6.5</td>
                                        </tr>
                                        <tr>
                                            <td>10~19세</td>
                                            <td>3,202</td>
                                            <td>18.3</td>
                                        </tr>
                                        <tr>
                                            <td>20~29세</td>
                                            <td>2,017</td>
                                            <td>11.6</td>
                                        </tr>
                                        <tr>
                                            <td>30~39세</td>
                                            <td>1,941</td>
                                            <td>11.1</td>
                                        </tr>
                                        <tr>
                                            <td>40~49세</td>
                                            <td>4,268</td>
                                            <td>24.5</td>
                                        </tr>
                                        <tr>
                                            <td>50~59세</td>
                                            <td>2,765</td>
                                            <td>15.8</td>
                                        </tr>
                                        <tr>
                                            <td>60~69세</td>
                                            <td>1,092</td>
                                            <td>6.3</td>
                                        </tr>
                                        <tr>
                                            <td>70~79세</td>
                                            <td>784</td>
                                            <td>4.5</td>
                                        </tr>
                                        <tr>
                                            <td>80세 이상</td>
                                            <td>246</td>
                                            <td>1.4</td>
                                        </tr> -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="col-2">
                <div class="chart line">
                    <h3 class="chart__tit" id="base_year_family">년 가구</h3>
                    <div class="chart__wrap srvAreaChat" id="familyChart">
                       <!--  <div class="chart__con srvAreaChart" id='sa01_pntChart03' style="min-height: 200px; background-color: #dfdfdf;">
                  		   <div id='sa01_pieChartDiv03'></div>
                        </div> -->
                        <div class="chart__table">
                            <table>
                                <colgroup>
                                    <col style="width: 40%;">
                                    <col style="width: 30%;">
                                    <col style="width: 30%;">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th scope="col">구분</th>
                                        <th scope="col">인구 수(명)</th>
                                        <th scope="col">구성비(%)</th>
                                    </tr>
                                </thead>
                                <tbody id="tbody_family">
                                   <!--  <tr class="on">
                                        <td>전체</td>
                                        <td>6.729</td>
                                        <td>100.0</td>
                                    </tr>
                                    <tr>
                                        <td>혈연 가구</td>
                                        <td>4,783</td>
                                        <td>71.1</td>
                                    </tr>
                                    <tr>
                                        <td>비혈연 가구</td>
                                        <td>169</td>
                                        <td>2.5</td>
                                    </tr>
                                    <tr>
                                        <td>1인 가구</td>
                                        <td>1,778</td>
                                        <td>26.4</td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="chart line">
                    <h3 class="chart__tit" id="base_year_house">년 주택</h3>
                    <div class="chart__wrap srvAreaChat" id="houseChart">
                       <!--  <div class="chart__con srvAreaChart" id='sa01_pntChart04' style="min-height: 200px; background-color: #dfdfdf;">
                         	 <div id='sa01_pieChartDiv04'></div>
                        </div> -->
                        <div class="chart__table">
                            <table>
                                <colgroup>
                                    <col style="width: 40%;">
                                    <col style="width: 30%;">
                                    <col style="width: 30%;">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th scope="col">구분</th>
                                        <th scope="col">인구 수(명)</th>
                                        <th scope="col">구성비(%)</th>
                                    </tr>
                                </thead>
                                <tbody id = "tbody_house">
                                   <!--  <tr class="on">
                                        <td>전체</td>
                                        <td>4,993</td>
                                        <td>100.0</td>
                                    </tr>
                                    <tr>
                                        <td>아파트</td>
                                        <td>2,823</td>
                                        <td>56.5</td>
                                    </tr>
                                    <tr>
                                        <td>단독주택</td>
                                        <td>263</td>
                                        <td>5.3</td>
                                    </tr>
                                    <tr>
                                        <td>연립주택</td>
                                        <td>154</td>
                                        <td>3.1</td>
                                    </tr>
                                    <tr>
                                        <td>다세대주택</td>
                                        <td>1,691</td>
                                        <td>33.9</td>
                                    </tr>
                                    <tr>
                                        <td>비거주용 건물 내주택</td>
                                        <td>60</td>
                                        <td>1.2</td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="col-2">
                <div class="chart line">
                    <h3 class="chart__tit" id = "copr_base_year">년 사업체</h3>
                    <div class="chart__wrap srvAreaChat" id="coprChart">
                       <!--  <div class="chart__con srvAreaChart" id='sa01_pntChart05' style="min-height: 200px; background-color: #dfdfdf;">
                      		 <div id='sa01_pieChartDiv05'></div>
                        </div> -->
                        <div class="chart__table">
                            <table>
                                <colgroup>
                                    <col style="width: 40%;">
                                    <col style="width: 30%;">
                                    <col style="width: 30%;">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th scope="col">구분</th>
                                        <th scope="col">인구 수(명)</th>
                                        <th scope="col">구성비(%)</th>
                                    </tr>
                                </thead>
                                <tbody id = "tbody_corp">
                                   <!--  <tr class="on">
                                        <td>전체</td>
                                        <td>1,632</td>
                                        <td>100.0</td>
                                    </tr>
                                    <tr>
                                        <td>일반 교습학원</td>
                                        <td>347</td>
                                        <td>21.3</td>
                                    </tr>
                                    <tr>
                                        <td>음식점업</td>
                                        <td>186</td>
                                        <td>11.4</td>
                                    </tr>
                                    <tr>
                                        <td>기타 교육기관</td>
                                        <td>104</td>
                                        <td>6.4</td>
                                    </tr>
                                    <tr>
                                        <td>기타 사업체</td>
                                        <td>995</td>
                                        <td>61.0</td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="chart line">
                    <h3 class="chart__tit" id = "work_base_year">년 종사자</h3>
                    <div class="chart__wrap srvAreaChat" id="workChart">
                     <!--    <div class="chart__con srvAreaChart" id='sa01_pntChart06' style="min-height: 200px; background-color: #dfdfdf;">
                    		  <div id='sa01_pieChartDiv06'>
                        </div> -->
                        <div class="chart__table">
                            <table>
                                <colgroup>
                                    <col style="width: 40%;">
                                    <col style="width: 30%;">
                                    <col style="width: 30%;">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th scope="col">구분</th>
                                        <th scope="col">인구 수(명)</th>
                                        <th scope="col">구성비(%)</th>
                                    </tr>
                                </thead>
                                <tbody id = "tbody_worker">
                                    <!-- <tr class="on">
                                        <td>전체</td>
                                        <td>7,887</td>
                                        <td>100.0</td>
                                    </tr>
                                    <tr>
                                        <td>일반 교습학원</td>
                                        <td>1,935</td>
                                        <td>24.5</td>
                                    </tr>
                                    <tr>
                                        <td>음식점업</td>
                                        <td>923</td>
                                        <td>11.7</td>
                                    </tr>
                                    <tr>
                                        <td>의원</td>
                                        <td>473</td>
                                        <td>6.0</td>
                                    </tr>
                                    <tr>
                                        <td>기타 사업체</td>
                                        <td>4,556</td>
                                        <td>57.8</td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- begin::container -->
    
    <div class="info">
        <div class="inner">
            <h4>격자 단위 통계정보 안내</h4>
            <ul>
                <li>조회한 생활권역(영역)에 포함되는 격자를 기준으로 통계정보를 제공합니다.</li>
                <li>기초자료를 기반으로 비밀 보호 기법(BSCA)을 적용하여  값을 계산하므로 화면에 표출된 격자 값의  합계가  총합계와  차이가 있을 수  있습니다.</li>
            </ul>
        </div>
    </div>

    <footer class="footer">
        <div class="inner">
            <div class="logo"><img src="${ctx }/resources/m2021/images/footer__logo.png" alt="통계청"></div>
            <p id= "date">
                통계지리정보서비스 (<a href='https://sgis.kostat.go.kr' target='_blank'>https://sgis.kostat.go.kr</a>)<br>
                제공 일자 : <!-- 2021년 06월 25일 20시 51분  -->
            </p>
        </div>
    </footer>
    </div>
</body>
</html>