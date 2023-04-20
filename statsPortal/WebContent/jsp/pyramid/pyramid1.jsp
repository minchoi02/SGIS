<%@ page language="java" contentType="text/html;charset=utf-8" %>

<!-- 
*
* 인구피라미드
* author : jrj
*
//-->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>움직이는 인구피라미드 | 분석지도</title>

    
	<link rel="stylesheet" type="text/css" href="/jsp/pyramid/include/css/legend.css">
	<link rel="stylesheet" type="text/css" href="/jsp/pyramid/include/css/sop.css">
	<link rel="stylesheet" type="text/css" href="/jsp/pyramid/include/css/common.css">
	<link rel="stylesheet" type="text/css" href="/jsp/pyramid/include/css/default.css">
	<link rel="stylesheet" type="text/css" href="/jsp/pyramid/include/plugin/slick/slick.css">
	<link rel="stylesheet" type="text/css" href="/jsp/pyramid/include/plugin/slick/slick-theme.css">
	<link rel="stylesheet" type="text/css" href="/jsp/pyramid/include/css/jquery.mCustomScrollbar.css">
	<link rel="stylesheet" type="text/css" href="/jsp/pyramid/include/plugin/slider-Pips/jquery-ui-slider-pips.min.css">
	<link rel="stylesheet" type="text/css" href="/jsp/pyramid/include/plugin/slider-Pips/jqueryui.min.css">
	
	<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
    <script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script> 
	<script type="text/javascript" src="/jsp/pyramid/include/js/jquery.mCustomScrollbar.concat.min.js"></script>
	<script type="text/javascript" src="/jsp/pyramid/include/plugin/highchart/highcharts.js"></script>
	<script type="text/javascript" src="/js/plugins/imageCapture/rgbcolor.js"></script>
	<script type="text/javascript" src="/js/plugins/imageCapture/canvg.js"></script> <!-- 2017.03.13 pdf저장 이슈  -->
    <script type="text/javascript" src="/js/plugins/imageCapture/html2canvas.js"></script>
	    
	<script type="text/javascript" src="/js/plugins/jquery.sha256.js"></script>
	<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
	<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>
	
	<script type="text/javascript" src="/js/common/common.js"></script>

	<script type="text/javascript" src="/jsp/pyramid/include/plugin/slider-Pips/jquery-ui-slider-pips.js"></script>
	
	<script type="text/javascript" src="/jsp/pyramid/include/js/pyramid/pyramidApi.js"></script>
	<script type="text/javascript" src="/jsp/pyramid/include/js/pyramid/pyramid1.js"></script>
	<script type="text/javascript" src="/jsp/pyramid/include/js/pyramid/pyramidDataBoard.js"></script>
	<script type="text/javascript" src="/jsp/pyramid/include/js/pyramid/pyramidLeftMenu.js"></script>
</head>

<body>
	<input type="hidden" value="1" id="pyramidType">
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
			<script type="text/javascript" src="https://sgis.kostat.go.kr/contents/include/header/header_anal.js"></script>
		</header>
	<!--//header-->
	<hr class="hidden" />
	<!--contents-->
	<div class="containerBox">
		<div class="rela">
			<div class="sceneBox on" id="view1">
				<div class="sceneRela">
					<div class="toolBar">
						<h2>
							인구피라미드
							<a href="javascript:void(0);" title="ㅇ 총인구: 7월 1일 기준 대한민국에 상주하는 내국인과 외국인

ㅇ 추계 가정 : 인구변동요인(출생, 사망, 국제이동) 가정을 조합해 고위, 중위, 저위 추계인구 작성
  - 고위(최대인구) : 높은 출산율, 높은 기대수명, 높은 국제순이동
  - 중위(기본추계) : 중간 출산율, 중간 기대수명, 중간 국제순이동
  - 저위(최소인구) : 낮은 출산율, 낮은 기대수명, 낮은 국제순이동

ㅇ 기준시점 : 2020년 인구를 기준으로 작성해 2020년 이전 인구는  실적치*이며, 2021년 이후로는 추계치임
   * 총조사인구(11월 1일 기준)에 7∼10월 사이 발생한 인구변동요인(출생, 사망, 국제이동)을 가감하여 작성한 인구(7월 1일 기준)


ㅇ 출처 : 장래인구추계 2020~2070(2021년 12월 공표)">
<img src="/img/ico/ico_i.gif" alt="주제도 설명" style="margin-left:7px;">
							</a>
						</h2>
						<div class="viewTitle"> </div>
						
						<div class="tb_right" id="btnList_1">
							<div class="left">
							</div>
							<!-- 가로툴바 -->
							<ul>
								<li><a onclick="javascript:$pyramidLeftMenu.doMaxSize(1);" class="tb_sizing" title="전체 화면 확대"><img src="../../jsp/pyramid/include/images/ico/ico_toolbars01.png"alt="전체 화면 확대"></a></li>
								<li><a onclick="javascript:$pyramidLeftMenu.reportDataSet();" class="tb_report" title="보고서 보기"><img src="../../jsp/pyramid/include/images/ico/ico_toolbars09.png"alt="보고서 보기"></a></li>
							</ul>
						</div>
						<!-- 가로툴바 end --> 
					</div>
					<!-- 도움말 -->
					<div class="interactiveBar">
						<h3 class="h3" id="barTitle" style="left:90px;"></h3>
						<input id="hiddenTip" value="그래프에 마우스를 올려놓으시면 통계정보를 볼 수 있습니다.">
					</div>
					<!-- 분석지도 맵 컨텐츠 시작 -->
					<div id="container" class="column-map clearfix">
						<div class="inner-wrap" id="wrap1">
							<div id="map-content">
								<!-- 년월 선택 -->
								<div id="ui-header-picker" class="clearfix" style="margin-left:-150px;">
									<div class="picker-year">
										<div class="button-group" class="clearfix">
											<button type="button" class="prev-button button default left left-arrow changebtn" title="전연도" data-title="전연도" onclick="javascript:$pyramid.changeYear('1', true); return false;"></button>
											<button type="button" class="next-button button default right right-arrow changebtn" title="다음연도" data-title="다음연도" onclick="javascript:$pyramid.changeYear('2', true); return false;"></button>
											
											<div class="ui-center">
												<h2 id="selYear"></h2>
											</div>
										</div>
									</div>
								</div>
								<!--// 년월 선택 끝-->
								<div class="archive-notice">
									<span>1999년 이전 데이터는 <strong>80세 이상</strong>, 2000년 이후 데이터는 <strong>100세 이상</strong>까지 있습니다.</span>
									<!-- <button onclick="javascript:$pyramid.ui.colorPopup();" style="background-color: skyblue; border-radius: 3px;">색상변경</button> -->
								</div>
								<div class="archive-box clearfix">
									<div class="pyramid-place">
										<ul>
											<li class="chart-area">
												<div id="pyramid-container" class="pcon">
												</div>
												<div id="pyramid-container2" class="pcon">
												</div>
											</li>
											<li>
												<div class="tabs-content">
													<div class="pip-slider-box">
														<ul class="pip-slider-box-ul">
															<!-- <li style="width:38px; bottom:8px;" class="first-button-box">
																<button class="changebtn first" onclick="javascript:$pyramid.changeYear('3'); return false;" title="맨처음" data-title="맨처음"></button>
															</li> -->
															<li style="width:85%;"><div id="flat-slider"></div></li>
															<!-- <li style="width:38px; bottom:8px;" class="first-button-box">
																<button class="changebtn last" onclick="javascript:$pyramid.changeYear('4'); return false;" title="맨끝" data-title="맨끝"></button>
															</li> -->
														</ul>
														<ul class="play-button-box">
															<li><button class="changebtn" onclick="javascript:$pyramid.ui.playSlider(this,'1'); return false;" title="역재생" data-title="역재생"></button></li>
															<li><button onclick="javascript:$pyramid.ui.playSlider(this,'0'); return false;" title="정지"></button></li>
															<li><button class="changebtn" onclick="javascript:$pyramid.ui.playSlider(this,'2'); return false;" title="재생" data-title="재생"></button></li>
														</ul>
													</div>
												</div>
											</li>
										</ul>
									</div>
									<div class="item-text" style="float:right;">
										<ul>
											<li>
												<div class="title"><span class="selYear">2018</span>연도 합계정보</div>
												<div class="total-data">
													<dl>
														<dt>총인구 </dt>
														<dd><span id="totAll"></span>&nbsp;명 </dd>
														<dl class="cunt">
															<dt>남자인구 </dt>
															<dd><em id="totMan"></em>&nbsp;명</dd>
															<dt>여자인구 </dt>
															<dd><em id="totWoman"></em>&nbsp;명</dd>
															</dd>
														</dl>
														<dl>
															<dt>성비 (여자1백명당) </dt>
															<dd><span id="sexRatio"></span></dd>
														</dl>
														<dl>
															<dt>평균연령 </dt>
															<dd><span id="avgAge"></span>세</dd>
														</dl>
													</dl>
												</div>
											</li>
											<li>
												<div class="title">인구 추계 범례 설명</div>
												<div class="exp">
													<dl>
														<dt>고위</dt>
														<dd>고위값은 높은 정도의 출산율과 기대수명을
															<br /> 예상하여 계산한 것입니다.</dd>
													</dl>
													<dl>
														<dt>중위</dt>
														<dd>중위값은 고위와 저위의 중간치의 출산율과
															<br /> 기대수명을 예상하여 계산한 것입니다.</dd>
													</dl>
													<dl>
														<dt>저위</dt>
														<dd>저위값은 낮은 정도의 출산율과 기대수명을
															<br /> 예상하여 계산한 것입니다</dd>
													</dl>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<!-- content 끝-->
					</div>
					<!-- inner-wrap 끝-->
				</div>
				<!-- container 끝-->
			</div>
			<!--// sceneRela -->
		<a href="javascript:void(0)" class="sideQuick sq02 on" id="map_left_btn" tabindex="97" style="top:35px;">
			<span>통계메뉴</span><img src="../../jsp/pyramid/include/images/ico_totalmenu.gif"alt="통계메뉴"/>
		</a>
		<!-- 왼쪽메뉴  -->
		<div class="leftArea">
			<jsp:include page="/jsp/pyramid/pyramidLeftMenu.jsp"/>
		</div>
		<!-- 왼쪽메뉴  end -->
		<!-- 데이터보드 -->
		<div id="dataBoard">
			<jsp:include page="/jsp/pyramid/pyramidDataBoard.jsp"></jsp:include>
		</div>
		<!-- //데이터보드 end -->
	</div>
	<!--//wrap-->
	</div>
	<footer></footer>
	<!--//container-->
	</div>
	<!--//wrap-->
</body>
</html>