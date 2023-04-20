<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<title>공지사항</title>
		<meta name="title" content="모바일 OX퀴즈 이벤트">
		<link rel="stylesheet" href="${ctx }/resources/css/event.css" />
		<script src="${ctx }/resources/js/etc/event.js"></script>
		<script>
			$(document).ready(function() {
				
			});
		</script>
	</head>
	<body> 
		<div id="wrap" style="min-height: 100%;">
			<img id="titleImg" src="${ctx }/resources/images/event/title.png" alt="title" style="width:100%; height:90%;"/>
			<div id="question1" class="qdiv">
				<div class="question mt50">
					<p class="mb20 font-a">	1.SGIS 모바일 서비스의 전체 메뉴에는 현재 내 위치를 중심으로 주변의 통계정보를 쉽게 알 수 있는<span> 『내 주변 통계』</span>서비스가 있다.</p>
					<div class="mb20 mt20">
						<button class="oxo btnOX" value="O"><img src="${ctx }/resources/images/event/o.png" alt="O"/></button>
						<button class="oxx btnOX" value="X"><img src="${ctx }/resources/images/event/x.png" alt="X"/></button>
						<input type="hidden" id="ox_val1" name="ox_val" value=""/>
					</div>
					<p class="mt10 hint font-b">(힌트) 전체메뉴 확인</p>
				</div>
			</div>
			<div id="question2" class="qdiv" style="display: none;">
				<div class="question mt30">
					<p class="mb20 font-a">	2.<span>『내 주변 통계』</span> 서비스는 선택한 지역의 연령별, 성별 인구 비율(%)을 그래프로 제공한다.</p>
					<div class="mb20 mt20">
						<button class="oxo btnOX" value="O"><img src="${ctx }/resources/images/event/o.png" alt="O"/></button>
						<button class="oxx btnOX" value="X"><img src="${ctx }/resources/images/event/x.png" alt="X"/></button>
						<input type="hidden" id="ox_val2" name="ox_val" value=""/>
					</div>
					<p class="mt10 hint font-b"> (힌트) 내 주변통계>데이터보드 확인</p>
				</div>
			</div>
			<div id="question3" class="qdiv" style="display: none;">
				<div class="question mt30 mb50">
					<p class="mb20 font-a">	3.<span>『대화형 통계지도』</span>서비스의 검색 항목에서 사업체수 통계는 조회할 수 없다.</p>
					<div class="mb20 mt20">
						<button class="oxo btnOX" value="O"><img src="${ctx }/resources/images/event/o.png" alt="O"/></button>
						<button class="oxx btnOX" value="X"><img src="${ctx }/resources/images/event/x.png" alt="X"/></button>
						<input type="hidden" id="ox_val3" name="ox_val" value=""/>
					</div>
					<p class="mt10 hint font-b">(힌트) 대화형 통계지도>검색항목 확인</p>
				</div>
			</div>
			<div id="question4" class="qdiv" style="display: none;">
				<div class="question mt30 mb50">
					<p class="mb20 font-a">	4.<span>『살고싶은 우리동네』</span>의 지표 설정 중 안전 지표에는 화재안전, 교통사고 안전, 범죄 안전 등 6개의 지표가 있다.</p>
					<div class="mb20 mt20">
						<button class="oxo btnOX" value="O"><img src="${ctx }/resources/images/event/o.png" alt="O"/></button>
						<button class="oxx btnOX" value="X"><img src="${ctx }/resources/images/event/x.png" alt="X"/></button>
						<input type="hidden" id="ox_val4" name="ox_val" value=""/>
					</div>
					<p class="mt10 hint font-b">(힌트) 살고싶은 우리동네>지표설정>안전 확인</p>
				</div>
			</div>
			<div id="question5" class="qdiv" style="display: none;">
				<div class="question mt30 mb50">
					<p class="mb20 font-a">	5.대전광역시에서 서점이 가장 많은 지역은 유성구이다.</p>
					<div class="mb20 mt20">
						<button class="oxo btnOX" value="O"><img src="${ctx }/resources/images/event/o.png" alt="O"/></button>
						<button class="oxx btnOX" value="X"><img src="${ctx }/resources/images/event/x.png" alt="X"/></button>
						<input type="hidden" id="ox_val5" name="ox_val" value=""/>
					</div>
					<p class="mt10 hint font-b">(힌트) 우리동네 생활업종>도소매>서점 확인</p>
				</div>
			</div>
			<div class="improvement qdiv" style="display: none;">
				<div class="question mt30 mb50 ta-l">
					<p class="mb20 font-b">SGIS 모바일 서비스를 이용하면서 느낀 불편한 점이나 개선해야 할 점, 오류 등을 자유롭게 적어주시면 보다 나은 서비스가 되도록 노력하겠습니다.</p>
					<div style="width: 100%; min-height: 100px;">
						<textarea id="bigo1"></textarea>
					</div>
					<div class="ta-c" style="width: 100%; margin-top: 20px;"><button class="btnOX">다음</button></div>
				</div>
			</div>
			<div class="improvement qdiv" style="display: none;">
				<div class="question mt30 mb50 ta-l">
					<h1 class="mt30">개인정보수집</h1>
					<p class="mt10 font-b">개인 정보 수집항목(성별, 성명, 휴대전화번호)은 추첨을 통한 상품권 지급 및 분석 목적으로만 사용되며, 경품 지급 후 파기됩니다. 개인 정보 수집에 동의하지 않으시면 설문에 참여하실 수 없습니다.</p>
					<ul class="mt20">
						<li>
							<input type="radio" name="agreement" class="mr5" value="O"/>동의   
							<input type="radio" name="agreement" class="ml5 mr5" value="X" checked="checked"/>비동의
						</li>
					</ul>
					<div class="ta-c" style="width: 100%; margin-top: 20px;"><button class="btnOX">다음</button></div>
				</div>
			</div>
			<div class="improvement qdiv" style="display: none;">
				<div class="question mt30 mb50 ta-l">
					<ul class="mt20 font-b">
						<li class="mt10">
							성별 :<input type="radio" name="sex" class="ml5" value="M" checked="checked"/>남 
							<input type="radio" name="sex" class="ml5 mr5" value="F"/>여
						</li>
						<li>
							성명 :<input type="text" class="input" id="user_name" name="user_name" value="" style="width:150px;"/>
						</li>
						<li>
							휴대전화번호 :<input type="text" id="user_hp" name="user_hp" class="input" value="" maxlength="13" style="width:150px;"/>
						</li>
					</ul>
					<div class="ta-c" style="width: 100%; margin-top: 20px;"><button class="btnOX">참여완료</button></div>
				</div>
			</div>
		</div>
	</body>
</html>