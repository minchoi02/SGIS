<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
    <head>
		<meta charset="utf-8">
		<meta name="format-detection" content="telephone=no" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		
		<script src="/js/common/includeHead.js"></script>
		<script src="/js/common/common.js"></script>
		<script src="/js/util/fontplus.js"></script>

		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/common.css">
		<!--알림마당 컨텐츠 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/contents.css">
		<!--게시판 css 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/board.css">
		
		<title>알림마당|통계지리정보서비스</title>
		
		<style type="text/css">
			.intro-guid li .guid-text{width:374px;float:left;height:279px;}
			.intro-guid li .guid-text dd{ word-break: break-all; color:#888;font-size:14px;margin-bottom:19px;line-height:22px;}
		</style>
		
		<script>
			var menuType = 'intro2';
			$(document).ready(function() {
				srvLogWrite('A0', '14', '01', '00', 'SGIS플러스 소개', 'SGIS플러스 주요 서비스 안내');
				$fontplus.item = $(".guid-text dd dt, .guid-text dd dd");
				$fontplus.box = $(".guid-text");
			});
		</script>
	</head>
	<body>
		<div id="wrap">
			<!-- header // -->
			<header>
				<!-- Top Include -->
				<jsp:include page="/view/common/includeSearch"></jsp:include>
			</header>
			
			<!--contents-->
			<div id="container" class="sub">
				<%@include file="/jsp/board/includeLeftMenu.jsp" %>
				<div id="content">
					<div id="title-area">
						<ul class="location">
						<!-- 190313 방민정 수정 시작 -->
							<li><a href="/view/view/index"><img src="/images/common/location_home.gif"/></a></li>
							<li><a href="/view/board/sopBoardMain">알림마당</a></li>
							<li><a href="/view/board/sopIntro01">SGIS플러스 소개</a></li>
							<li><a href="/view/board/sopIntro01"><em>SGIS플러스 주요서비스 안내</em></a></li>
						<!-- 190313 방민정 수정 끝 -->
						</ul>
						<h1 class="sub-title">SGIS플러스 주요 서비스 안내</h1>
					</div>
					<div id="contents" class="view">
						<!--view-->
						<div class="header-infor" style="margin-bottom:20px !important;">
							<h2 style="margin-bottom:10px !important;">SGIS플러스 서비스 안내</h2> 
							<div id="fontplusbtn"></div>
						</div>
						<ul class="intro-guid">
							<!-- 2020-02-13 [김남민] My통계로 서비스 설명자료 작성 START -->
							<li>
								<div class="guid-image"><img src="/img/nm/nm_picture_renewal_09.png" alt="My통계로 안내" style="width: 100%;"></div><!-- 190312 방민정 수정 -->
								<dl class="guid-text">
									<!-- 2020-02-19 [김남민] 통계로-39 : 서비스 설명자료 수정. -->
									<dt style="font-family: 'Nanum Gothic'; font-weight: bold !important;">My통계로(路)</dt>
									<dd class="service-button"> <a href="/view/statsMe/statsMeMain"><span>서비스 바로가기</span></a> <a href="/view/newhelp/mystatslo_help_10_0"><span>서비스 안내</span></a> </dd><!-- 190312 방민정 수정 -->
									<dd style="margin-bottom: 0;">
										<dl>
											<!-- 2020-02-19 [김남민] 통계로-39 : 서비스 설명자료 수정. START -->
											<dt style="word-break: keep-all;">개인 관심주제에 맞는 공간통계정보를 제공하기 위한 서비스입니다.</dt>
											<dd style="word-break: keep-all;">국민 모두를 대상으로 개인화 서비스를 제공할 수 있도록 구성된 맞춤형 공간통계정보 서비스 입니다.</dd>
											<dd style="word-break: keep-all;">개인 생애주기와 관심분야에 맞추어 SGIS 통계지리정보서비스의 데이터를 서비스합니다. 사용자 중심으로 설계된 맞춤형 인터페이스는 누구나 손쉽게 이용할 수 있도록 단순하고, 복잡한 절차 없이 간결하게 구성되어 있으며 즐겨찾기 및 SNS 공유기능을 통해 일상 생활에 더 가깝게 통계를 제공합니다.</dd>
											<!-- 2020-02-19 [김남민] 통계로-39 : 서비스 설명자료 수정. END -->
										</dl>
									</dd>
								</dl>
							</li>
							<!-- 2020-02-13 [김남민] My통계로 서비스 설명자료 작성 END -->
							<li>
								<div class="guid-image"><img src="/img/nm/nm_picture_renewal_01_2.png" alt="대화형 통계지도 안내" style="width: 100%;"></div><!-- 190312 방민정 수정 -->
								<dl class="guid-text">
									<dt>대화형 통계지도</dt>
									<dd class="service-button"> <a href="/view/map/interactiveMapMain"><span>서비스 바로가기</span></a> <a href="/view/newhelp/in_help_10_0"><span>서비스 안내</span></a> </dd><!-- 190312 방민정 수정 -->
									<dd style="margin-bottom: 0;">
										<dl>
											<dt>공간통계 정보를 쉽고 빠르게 조회할 수 있습니다.</dt>
											<dd>인구,주택,가구,농림어업,사업체 센서스 및 행정구역통계 등 다양한 통계항목을 지역단위로 자유롭게 조회할 수 있는 통계지리정보 서비스입니다.</dd>
											<dd>다양한 통계항목을 조건별로 세분화하여 사용자 관심항목에 따라 조회할 수 있습니다. 원하는 통계 항목을 미리 설정하고 이를 지도상의 지역에 끌어서 놓기(drag&drop) 하는 방식으로 통계 조회가 가능합니다.</dd>
										</dl>
									</dd>
								</dl>
							</li>
							<li>
								<div class="guid-image"><img src="/img/nm/nm_picture_renewal_02_2.png" alt="업종통계지도 안내" style="width: 100%;"></div><!-- 190312 방민정 수정 -->
								<dl class="guid-text"> <dt>업종통계지도</dt>
									<dd class="service-button"> <a href="/view/bizStats/bizStatsMap"><span>서비스 바로가기</span></a> <a href="/view/newhelp/so_help_10_0"><span>서비스 안내</span></a> </dd> 
									<dd style="margin-bottom: 0;">
										<dl>
										<!-- 190312 방민정 수정 시작 -->
											<dd>생활, 기술 업종별로 다양한 통계를 조회할 수 있습니다. 사용자에게 업종별 통계정보를 다양한 형태로 제공하는 의사결정지원서비스입니다. 업종별 통계정보 및 사용자가 고려할 수 있는 조건을 설정하여, 해당 후보지역을 검색할 수 있습니다.</dd>
											<dd>검색된 결과로 지역의 특성을 파악하고, 지역간 통계정보도 비교할 수 있으며, 미니맵을 통해 해당 후보지역으로 쉽게 이동할 수 있습니다.</dd>
										<!-- 190312 방민정 수정 끝 -->
										</dl>
									</dd>
								</dl>
							</li>
							<li>
								<div class="guid-image"><img src="/img/nm/nm_picture_renewal_03_2.png" alt="통계주제도 안내" style="width: 100%;"></div><!-- 190312 방민정 수정 -->
								<dl class="guid-text"> <dt>통계주제도</dt>
									<dd class="service-button"> <a href="/view/thematicMap/categoryList"><span>서비스 바로가기</span></a> <a href="/view/newhelp/su_help_10_0"><span>서비스 안내</span></a> </dd>
									<dd style="margin-bottom: 0;">
										<dl>
											<dt>사회적 이슈 및 트렌드를 반영한 주제별 통계를 쉽게 이용 할 수 있습니다.</dt>
											<dd>인구·주거, 복지·문화, 일·산업, 환경·안전의 4가지 카테고리에 따라 관심 있는 통계를 주제도화한 서비스입니다. 데이터 분포 조회, 화면분할을 통한 비교, 조회 등 다양한 방식의 통계주제도가 제공됩니다.</dd>
										</dl>
									</dd>
								</dl>
							</li>
							<li>
							 	<!-- mng_s 20220107 이진호, 개발지원센터 개편으로 인한 이미지 수정 및 서비스 안내 url 변경 -->
								<!-- <div class="guid-image"><img src="/img/nm/nm_picture_renewal_04_1_new.png" alt="개발자 지원 안내"></div> -->
								<div class="guid-image"><img src="/img/nm/nm_picture_latest_04_1_new.png" alt="개발지원센터 메인"></div>
								<dl class="guid-text"> <dt>개발지원센터</dt>
									<!-- <dd class="service-button"> <a href="javascript:;" onclick="window.open('/developer/html/main.html')" title="새창으로 열림"><span>서비스 바로가기</span></a> <a href="/view/board/sopDeveloper"><span>서비스 안내</span></a> </dd> -->
									<dd class="service-button"> <a href="/developer/html/main.html" title="개발지원센터 바로가기"><span>서비스 바로가기</span></a> <a href="/view/newhelp/de_help_10_0"><span>서비스 안내</span></a> </dd>
									<dd style="margin-bottom: 0;">
										<dl>
											<dt>개발자들의 놀이터! OpenAPI를 활용해 나의 아이디어를 실현합니다.</dt>
											<dd>지도,경계,통계 API를 활용해 다양한 공간통계 서비스 개발이 가능하도록 풍부한 예시와 함께 사용자 가이드를 제공합니다.</dd>
											<dd> 실시간으로 API 소스를 변경해 보면서 테스트 할 수 있는 환경을 제공합니다.</dd>
										</dl>
									</dd>
								</dl>
								<!-- mng_e 20210107 이진호 -->
							</li>
							<li>
								<div class="guid-image"><img src="/img/nm/nm_picture_renewal_05_1.png" alt="모바일 홈페이지 안내"></div>
								<dl class="guid-text"> <dt>모바일 홈페이지</dt>
									<dd class="service-button"><!-- <a href="#"><span>서비스 바로가기</span></a> <a href="#"><span>서비스 안내</span> </a>190312 방민정 수정--> </dd>
									<dd style="margin-bottom: 0;">
										<dl>
											<dt style="margin-top: 16px;">내 손안의 통계,통계를 쉽고 편하게 만날수 있습니다.</dt><!-- 190312 방민정 수정 -->
											<dd>내 주변 통계와 홈페이지에서 제공하던 통계주제도,대화형 통계지도,지역현안 소통지도를 모바일 환경에서 제공합니다.</dd>
											<dd> <img src="/img/pic/0jx8R.png" alt="모바일 QR code"> </dd>
										</dl>
									</dd>
								</dl>
							</li>
							<li>
								<div class="guid-image"><img src="/img/nm/nm_picture_renewal_06_1.png" alt="지역현안 소통지도 안내"></div>
								<dl class="guid-text"><dt>지역현안 소통지도</dt>
									<dd class="service-button"> <a href="/view/community/intro"><span>서비스 바로가기</span></a> <a href="/view/newhelp/community_help_1"><span>서비스 안내</span></a> </dd>
									<dd style="margin-bottom: 0;">
										<dl>
											<!-- <dt>우리 주변의 이슈를 통계로 만들어 지도에 그려보자.</dt> -->
											<dt>우리 주변의 이슈를 통계로 만들어 지도에 그릴 수 있습니다.</dt>
											<dd>소통지도 개설자는 대화형 통계지도 또는 나의 데이터를 이용해서 자유롭게 맵을 개설할수 있습니다.</dd>
											<dd> 개설된 소통지도는 지역사회 구성원이 직접 참여해 이슈를 찾아내고,객관적인 지표인 관련 통계를 제공하고,이를 기반으로 한 커뮤니티 매핑을 가능하게 하는 서비스입니다.</dd>
										</dl>
									</dd>
								</dl>
							</li>
							<li>
								<div class="guid-image"><img src="/img/nm/nm_picture_renewal_07_2.png" alt="살고싶은 우리동네 안내" style="width: 100%;"></div><!-- 190312 방민정 수정 -->
								<dl class="guid-text"> <dt>살고싶은 우리동네</dt>
									<dd class="service-button"> <a href="/view/house/houseAnalysisMap"><span>서비스 바로가기</span></a> <a href="/view/newhelp/house_help_10_0"><span>서비스 안내</span></a> </dd>
									<dd style="margin-bottom: 0;">
										<dl>
											<dt>통계에 기반한 주거지 분석서비스 '살고싶은 우리동네'</dt>
											<dd>생활편의 시설 현황, 교육환경 등 33종의 주거지 선정 조건에 해당하는 추천지역 리스트 및 통계정보를 클릭 몇번으로 확인해보세요.</dd>
											<dd> 원하는 조건에 맞는 주거지역을 추천해주는 서비스입니다.</dd>
										</dl>
									</dd>
								</dl>
							</li>
							<!-- 190314 방민정  수정  시작 -->
							<li>
								<div class="guid-image"><img src="/img/nm/nm_picture_renewal_08.png" alt="통계지도체험 안내" style="width: 100%; height: 100%;"></div><!-- 190312 방민정 수정 -->
								<dl class="guid-text"> <dt>통계지도체험</dt>
									<dd class="service-button"> <a href="/statexp/view/index"><span>서비스 바로가기</span></a> <a href="/view/newhelp/ex_help_10_0"><span>서비스 안내</span></a> </dd>
									<dd style="margin-bottom: 0;">
										<dl>
											<dt>사용자 통계데이터를 자유롭게 시각적으로 활용할 수 있습니다.</dt>
											<dd>통계지도 체험은 이용자가 필요에 따라 지도상의 행정경계를 바탕으로 시각적, 공간적 통계값을 표현해 볼 수 있는 서비스 입니다.</dd>
											<dd>통계자료를 직접 입력하거나 엑셀 등의 자료를 이용하여 행정구역별 색채지도를 작성할 수 있으며 제작된 행정구역별 통계지도를 보고서로 출력할 수 있습니다.</dd>
										</dl>
									</dd>
								</dl>
							</li>
							<!-- 190314 방민정 수정끝  -->
							<!-- 2020년 SGIS고도화 3차 시작 -->
							<li>
								<div class="guid-image"><img src="/img/nm/nm_picture_renewal_10.png" alt="생활권역 안내" style="width: 100%; height: 100%;"></div>
								<dl class="guid-text"> <dt>생활권역 통계지도</dt>
									<dd class="service-button"> <a href="/view/catchmentArea/main"><span>서비스 바로가기</span></a> <a href="/view/newhelp/catchmentArea_help_10_0"><span>서비스 안내</span></a> </dd>
									<dd style="margin-bottom: 0;">
										<dl>
											<dt>도로 정보를 활용한 생활권역의 통계자료를 제공하는 서비스입니다.</dt>
											<dd>도로 정보·특성을 담고 있는 도로네트워크를 이용하여 특정시설(지점)의 위치로부터 단위 시간 내 도달 가능한 생활권역을 설정하고, 그 특성을 직관적으로 파악할 수 있으며, 행정구역 간 경계를 구애 받지 않는 생활 권역에 대한 통계정보를 표준화된 격자단위로 보여주는 서비스 입니다.</dd>
										</dl>
									</dd>
								</dl>
							</li>
							<!-- 2020년 SGIS고도화 3차 끝 -->
							<!-- 20210223 박은식 SGIS플러스 서비스 안내 추가 START -->
							<li>
								<div class="guid-image"><img src="/img/nm/nm_picture_renewal_12.png" alt="총조사 시각화 지도 안내" style="width: 100%; height: 100%;"></div>
								<dl class="guid-text" style="height:260px"> <dt>총조사 시각화 지도</dt>
									<dd class="service-button"> <a href="/view/totSurv/populationDash"><span>서비스 바로가기</span></a> <a href="/view/newhelp/totSurv_help_10_0"><span>서비스 안내</span></a> </dd>
									<dd style="margin-bottom: 0;">
										<dl>
											<!-- 20210315 박은식 텍스트 수정 START -->
											<dt>통계청에서 실시하는 총조사 결과를 지도와 차트 등을 활용하여 <br/>직관적이고 쉽게 확인할 수 있는 대시보드형 시각화 서비스입니다.</dt>
											<dd >KOSIS(국가통계포털)를 통하여 공표된 통계결과를 바탕으로 이용자의 관심지역, 통계주제, 조사시점 등을 선택하여 해당 정보를 쉽게 확인 할 수 있도록 구성된 서비스입니다.<br>공간정보를 확인 할 수 있는 지도와 통계결과를 확인할 수 있는 차트가 상호반응하여 원하는 지역별, 주제별 통계를 직관적으로 확인이 가능합니다. 이용자가 데이터를 탐색하며 정보를 획득하는 몰입형 시각화 서비스 입니다.</dd>
											<!-- 20210315 박은식 텍스트 수정 END -->
										</dl>
									</dd>
								</dl>
							</li>
							<!-- 20210223 박은식 SGIS플러스 서비스 안내 추가 END -->
							<!-- 20220328 김건민 SGIS플러스 서비스 안내 추가 START -->
							<li>
								<div class="guid-image"><img src="/img/nm/nm_picture_renewal_13.png" alt="행정통계 시각화 지도 안내" style="width: 100%; height: 100%;"></div>
								<dl class="guid-text" style="height:347px"> <dt>행정통계 시각화 지도</dt>
									<dd class="service-button"> <a href="/view/administStats/newlyDash"><span>서비스 바로가기</span></a> <a href="/view/newhelp/adminisStats_help_10_0"><span>서비스 안내</span></a> </dd>
									<dd style="margin-bottom: 0;">
										<dl>
											<dt>통계청에서 공표하는 다양한 행정통계 데이터를 이용자가 이해하기 <br/>쉽게 지도와 차트로 시각화하여 제공하는 서비스입니다.</dt>
											<dd >정부부처 및 공공기관에서 수집, 보유하고 있는 행정자료 등을 상호 연계하여 작성한 행정통계 7종의 KOSIS(국가통계포털) 데이터를 바탕으로 구성하였습니다.<br>공간정보를 확인 할 수 있는 지도와 통계결과를 확인할 수 있는 차트가 상호반응하여 원하는 지역별, 주제별 통계를 직관적으로 확인이 가능합니다. 이용자가 데이터를 탐색하며 정보를 획득하는 몰입형 시각화 서비스 입니다.<br><br>
												* 행정통계 7종: 신혼부부통계, 주택소유통계, 중·장년층행정통계, 귀농어·귀촌인통계, 일자리행정통계, 퇴직연금통계, 임금근로 일자리 동향</dd>
										</dl>
									</dd>
								</dl>
							</li>
							<!-- 20220328 김건민 SGIS플러스 서비스 안내 추가 END -->
							<!-- 20220328 김건민 SGIS플러스 서비스 안내 추가 START -->
							<li>
								<div class="guid-image"><img src="/img/nm/nm_picture_renewal_14.png" alt="도시화 분석 지도 안내" style="width: 100%; height: 100%;"></div>
								<dl class="guid-text" style="height:347px"> <dt>도시화 분석 지도</dt>
									<dd class="service-button"> <a href="/view/urban/main"><span>서비스 바로가기</span></a> <a href="/view/newhelp/urBan_help_10_0"><span>서비스 안내</span></a> </dd>
									<dd style="margin-bottom: 0;">
										<dl>
											<dt>‘UN 도시분류’ 기준을 적용한 인구변화에 따른 도시화 권역의 변화 모습과 격자 통계정보 및 분석 지표를 제공하는 서비스입니다.</dt>
											<dd >이용자가 관심 있는 지역의 2000년 이후 동적 시계열 변화 모습을 지도로  확인할 수 있고, 선택한 도시화 권역의 2015년 이후 연도별 격자 통계데이터 (면적, 인구, 가구, 주택, 사업체, 종사자)를 조회할 수 있으며, 도시화 관련 지표(인구밀도, 평균나이, 노령화지수, 1인가구 비율, 아파트 비율)의 시계열 변화와 권역 순위, 다른 권역과의 비교, 분석이 가능합니다.</dd>
										</dl>
									</dd>
								</dl>
							</li>
							<!-- 20220328 김건민 SGIS플러스 서비스 안내 추가 END -->
						</ul>
						<!--//view-->
					</div>
				</div>
			</div>
			<!--//contents-->
            <!-- footer// -->
		    <footer id="footer">
		    	<!-- Bottom Include -->
				<jsp:include page="/view/common/includeBottom"></jsp:include>
		    </footer>
        </div>
    </body>
</html>