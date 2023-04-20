<%
/**************************************************************************************************************************
* Program Name  : 사업체 전개도 JSP  
* File Name     : indoorMap.jsp
* Comment       : 
* History       : 네이버시스템 김성현 2015-09-17
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE>
<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<link rel="stylesheet" type="text/css" href="/SgisProject_Publisher/html/indoor/indoor.css" />
		<link rel="stylesheet" type="text/css" href="/css/idm/common.css" />
		<link rel="stylesheet" type="text/css" href="/css/idm/layout.css" />
		<link rel="stylesheet" type="text/css" href="/css/idm/im.css" />
		<link rel="stylesheet" type="text/css" href="/css/idm/sop.css" />
		<link rel="stylesheet" type="text/css" href="/SgisProject_Publisher/include/css/jquery.mCustomScrollbar.css">
		
		<script type="text/javascript" src="/js/indoor/libs/jquery-1.11.1.min.js"></script>
		<script type="text/javascript" src="/js/indoor/ui.js"></script>
		<script type="text/javascript" src="/js/indoor/sop-src.js"></script>
		<script type="text/javascript" src="/SgisProject_Publisher/include/js/jquery.mCustomScrollbar.concat.min.js"></script>
		<script type="text/javascript" src="/js/plugins/jquery.sha256.js"></script>
		<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
		<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>
		<script type="text/javascript" src="/js/common/common.js"></script>
		
		<script type="text/javascript" src="/js/indoor/indoorMap.js"></script>
		<script type="text/javascript" src="/js/indoor/indoorMapView.js"></script>
		<script type="text/javascript" src="/js/common/themeCdCommon.js"></script> <!-- 2020년 SGIS고도화 3차(테마코드 - 운영요청사항) - 이미지 안나옴 -->
		
		<title>인터랙티브 맵 :: 통계지리정보서비스</title>

		<script type="text/javascript">
			$(function(){
				$(".scrollBox").mCustomScrollbar({ axis: "xy" });
			});
			
			$(document).ready(function() {
				$(".aside-close").click(function(){
					var display = $("#inside").css('display');
					$("#content #floor-map-area #map").empty();
					$("#content #floor-map-area #map").removeClass('sop-container');
					$("#content #floor-map-area #map").removeClass('sop-fade-anim');
					if(display == 'none') {
						$("#inside").show();
						$('#floor-map-aside').css('width', 250);
						$('.mCSB_container').css('width', 250);
						
						$('#content').css('left', 250);
						
						$.mapViewChange(400);
						
					}
					else {
						$("#inside").hide();
						$('#floor-map-aside').css('width', 0);
						
						$('#content').css('left', 0);
						
						$.mapViewChange(650);
					}
				});
			});
		</script>
	</head>
	<body>
		<div class="by-floor">
			<div class="floor-Info">
				<h2 class="view-title">&nbsp;</h2>
				<a id="help_tooltip" href="javascript:void(0)" style="position: absolute;top: 10px;right: 15px;"class="ar" data-subj="사업체전개도" title="전개도는 전국사업체조사를 통해 현장조사 지원에 필요한 &#10;건물을 대상으로 평면도를 제공하고 있으며,&#10;일부 층은 작성에 필요한 정보가 부족하여&#10;전개도 서비스가 제공되지 않을 수 있음을 양해바랍니다.&#10;(자료기준일 : 2018.12.31.)"><img src="/images/bizStatsPopup/btn_off.png" alt="물음표" /></a><!--2019-04-08 박길섭 -->
			</div>
			<div id="floor-map">
				<div id="floor-map-aside">
					<div id="inside" class="panel-content">
						<div class="header">
							<h3 class="floor-number">&nbsp;</h3>
						</div>
						<div class="scrollBox">
							<div class="infor-list-box">
								<!-- <ul>
									<li><a href="$indoorMapView.ui.selectCorp('0003727364');"><span>(주)이레렌탈</span> 기업(서비스)</a></li>
									<li><a href="# "><span>주식회사 코엑스</span> 기업(서비스)</a></li>
									<li><a href="# "><span>(주)모둘</span> 기업(판매/유통)</a></li>
									<li><a href="# "><span>(주)엑스코</span> 기업(서비스)</a></li>
									<li><a href="# "><span>(주)엑스컴인터내셔널</span> 기업(제조/화학)</a></li>
									<li><a href="# "><span>(주)동일항공여행사</span> 기업(서비스)</a></li>
									<li><a href="# "><span>(주)플러스커리어</span> 기업(서비스)</a></li>
									<li><a href="# "><span>(주)월드전람</span> 기업(서비스)</a></li>
									<li><a href="# "><span>법무사 이정래 사무소</span> 기업(서비스)</a></li>
									<li><a href="# "><span>주식회사파노라마미디어</span> 기타</a></li>
									<li><a href="# "><span>(주)리더스뱅크앤컨설팅</span> 기타</a></li>
									<li><a href="# "><span>비투엑스포(주)</span> 기업(서비스)</a></li>
									<li><a href="# "><span>이엑스프로모션</span> 기업(서비스)</a></li>
									<li><a href="# "><span>인앤아웃컴퍼니 주식회사</span> 기업(서비스)</a></li>
									<li><a href="# "><span>주식회사 지엘엠피</span> 기업(서비스)</a></li>
									<li><a href="# "><span>아이오글로벌</span> 기업(판매/유통)</a></li>
									<li><a href="# "><span>스페이스 나인</span> 기타</a></li>
									<li><a href="# "><span>(주)한국스탠다드차타드은행무역센터지점</span> 편의/문화(은행)</a></li>
									<li><a href="# "><span>인스토리（In story）</span> 기업(판매/유통)</a></li>
								</ul> -->
							</div>
						</div>
						<div class="aside-line "></div>
					</div>
					
					<!-- mng_s 20201208 이진호 -->
					<!-- 사업체 리스트 접기 버튼 주석처리, 추후 필요할 시 주석 풀고 사용 가능 -->
					<!-- <a href="javascript:void(0);" class="aside-close" title="접기">접기</a> -->
					<!-- mng_e 20201208 이진호 -->
					
				</div>
				<div id="content">
					<h2 class="blind ">지도영역</h2>
					<div id="floor-map-area">
						<div class="floor-plan-area" id="map">
							<!-- <img src="/images/idm/floor-plan.png" /> -->
							<!-- <div id="pointer" class="infor-box">
								<div class=" tooltip-layer arrow">
									<div class="infor-content">
										<dl>
											<dt>토즈코리아 토즈 코엑스</dt>
											<dd>도소매(의류)</dd>
										</dl>
									</div>
									<div class="infor-close">
										<a href="#" class="infor layer-close" title="레이어 닫기">레이어 닫기</a>
									</div>
								</div>
							</div> -->
						</div>
						<div class=" msg-box" id="noneMap" style="display: none;">
							<!-- 평면도 없을시 메세지 -->
							<dl>
								<dt><img src="/images/idm/Floor-plan-none.png" alt="해당 층은 평면도가 없습니다"></dt>
								<dd>"해당 층은 평면도가 없습니다.”</dd>
								<dd>전개도는 전국사업체조사를 통해 평면도를<br>
									작성하고 있으며,일부 층은 전개도 작성에 필요한 정보가<br>
									부족하여 제공하지 못할 수도 있음을 양해바랍니다.</dd>
							</dl>
							<!--// 평면도 없을시 메세지 -->
						</div>
						<div class="indoor-topright">
							<a href="javascript:void(0);" class="btn-floor" onclick="$indoorMapView.ui.goMainFloor();">
								<span class="marker">대표층 보기</span>
							</a>
							<div class="indoor-zoom-controler undefined ">
								<button class="indoor-zoom-controler-in" onclick="$indoorMapView.ui.setZoom(1);">＋</button>
								<button class="indoor-zoom-controler-out" onclick="$indoorMapView.ui.setZoom(-1);">－</button>
							</div>
						</div>
						<div class="indoor-middleright">
							<div class="indoor-floor-controler" id="va-accordion">
								<a href="javascript:void(0);" onclick="$indoorMapView.event.highPlus();" class="floor-arrow floor-prev" title="위로"></a>
								<ul class="floor-list">
									<!-- <li class="on" id="va-title4"><a href="#">4F</a></li>
									<li><a href="#">3F</a></li>
									<li><a href="#">2F</a></li>
									<li><a href="#">1F</a></li>
									<li><a href="#">B1</a></li>
									<li><a href="#">B2</a></li>
									<li><a href="#">B3</a></li> -->
								</ul>
								<a href="javascript:void(0);" onclick="$indoorMapView.event.lowPlus();" class="floor-arrow floor-next" title="아래로"></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>