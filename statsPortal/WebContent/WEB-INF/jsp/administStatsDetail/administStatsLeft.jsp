<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<script src="/js/administStatsDetail/administStatsLeft.js"></script>
<div id="aside">
	<h1 class="logo">
		<a href="/" title="통계청">
			<img src="/images/administStats/more1/sgisLogo2022.png" alt="">
		</a>
	</h1>
	<nav class="nav" id="leftMenu">
		<ul id="gnb">
			<li id="newlyMenu" class="mn1 thema <c:if test="${checkmenu == 'bubu'}">current</c:if>">
				<div class="mn_wrapper">
					<a href="#" onclick="javascript: return false;" <c:if test="${checkmenu == 'bubu'}">title="신혼부부 선택됨"</c:if>>
						<img src="/images/administStats/more1/menuicon1off.png" class="menuicon1off" /><br />
						신혼부부<br>통계
					</a>
				</div>
			</li>
			<li id="houseMenu" class="mn2 thema <c:if test="${checkmenu == 'jutak'}">current</c:if>">
				<div class="mn_wrapper">
					<a href="#" onclick="javascript: return false;" <c:if test="${checkmenu == 'jutak'}">title="주택소유 선택됨"</c:if>>
						<img src="/images/administStats/more1/menuicon2off.png" class="menuicon2off" /><br />
						주택소유<br>통계
					</a>
				</div>	
			</li>
			<li id="middlMenu" class="mn3 thema <c:if test="${checkmenu == 'jungjan'}">current</c:if>">
				<div class="mn_wrapper">
					<a href="#" onclick="javascript: return false;" <c:if test="${checkmenu == 'jungjan'}">title="중장년층 선택됨"</c:if>>
						<img src="/images/administStats/more1/menuicon3off.png" class="menuicon3off" /><br />
						중장년층<br>통계
					</a>
				</div>	
			</li>
			<li id="retunMenu" class="mn4 thema <c:if test="${checkmenu == 'kinong'}">current</c:if>">
				<div class="mn_wrapper">
					<a href="#" onclick="javascript: return false;" <c:if test="${checkmenu == 'kinong'}">title="귀농어·귀촌인 선택됨"</c:if>>
						<img src="/images/administStats/more1/menuicon4off.png" class="menuicon4off" /><br />
						귀농어 · 귀촌인<br>통계
					</a>
				</div>	
			</li>
			<li id="more1Menu" class="mn5 thema <c:if test="${checkmenu == 'more1'}">current</c:if>">
				<div class="mn_wrapper">
					<a href="#" onclick="javascript: return false;" <c:if test="${checkmenu == 'more1'}">title="일자리행정 통계 선택됨"</c:if>>
						<img src="/images/administStats/more1/menuicon6off.png" class="menuicon4off" /><br />
						일자리행정<br>통계
					</a>
				</div>	
			</li>
			<li id="more2Menu" class="mn6 thema <c:if test="${checkmenu == 'more2'}">current</c:if>">
				<div class="mn_wrapper">
					<a href="#" onclick="javascript: return false;" <c:if test="${checkmenu == 'more2'}">title="퇴직연금 선택됨"</c:if>>
						<img src="/images/administStats/more1/menuicon7off.png" class="menuicon4off" /><br />
						퇴직연금<br>통계
					</a>
				</div>	
			</li>
			<li id="more3Menu" class="mn7 thema <c:if test="${checkmenu == 'more3'}">current</c:if>">
				<div class="mn_wrapper">
					<a href="#" onclick="javascript: return false;" <c:if test="${checkmenu == 'more3'}">title="임금근로 일자리동향 선택됨"</c:if>>
						<img src="/images/administStats/more1/menuicon8off.png" class="menuicon4off" /><br />
						임금근로<br>일자리동향
					</a>
				</div>	
			</li>
		</ul>
	</nav>
</div>