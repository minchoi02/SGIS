<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>[총조사시각화지도] SGIS plus mobile</title>
	<%@include file="/WEB-INF/jsp/m2021/includes/includeHeaderFile.jsp" %>
	<script>
		$(document).ready(function(){
			$("#menu-depth1-a").click(function(){
				const target = $("#"+$(this).attr("id").replace("-a",""));
				if($("#"+$(this).attr("id").replace("-a","")).is(":visible")){
					$(this).find("img").css({
						"-webkit-transform": "rotate(0deg)",
						"transform":"rotate(0deg)"
					});
				}else{
					$(this).find("img").css({
						"-webkit-transform": "rotate(180deg)",
						"transform":"rotate(180deg)"
					});
				}
				target.toggle();
				return false;
			});
		});
	</script>
</head>
<body>
	<div id="header">
	<header class="header">
		<div class="logo"><p>개인정보 처리방침</p></div>
			<div>
				<a href="#n" class="btn-menu" onclick="$('#nav').animate({'left':'0'});return false;"><img src="${ctx }/resources/m2021/img/i_menu.png" alt="메뉴"></a>
			</div>
		</header>
		<jsp:include page="/WEB-INF/jsp/m2021/includes/includeMenu.jsp"/>
	</div>
	<div class="navi">
		<div class="d-flex align-items-center">
			<a href="#" class="home" onclick="location.href='${ctx}/';"><img src="${ctx }/resources/m2021/img/i_home.png" alt="홈"></a>
			<div class="path">
				<a id="menu-depth1-a" href="#n" style="font-size:min(3vw, 14px);">
					<span>개인정보 처리방침</span>
					<span><img src="${ctx }/resources/m2021/img/i_select--ui.png" alt="생활권역 통계지도"></span>
				</a>
				<div id="menu-depth1" class="path__con" style="display: none;">
					<a href="${ctx }/m2021/rule.sgis">이용약관</a>
					<a href="${ctx }/m2021/privacy.sgis">개인정보 처리방침</a>
				</div>
			</div>
		</div>
	</div>
	<div class="privacy__info">
		통계청은 통계지리정보서비스(이하 “당 사이트”)은 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
	</div>
	<div class="privacy">
		<ul class="privacy__list">
			<li><a href="#privacy01">제1조. 개인정보의 처리 목적</a></li>
			<li><a href="#privacy02">제2조. 개인정보의 처리 및 보유 기간</a></li>
			<li><a href="#privacy03">제3조. 개인정보의 제3자 제공</a></li>
			<li><a href="#privacy04">제4조. 개인정보처리의 위탁</a></li>
			<li><a href="#privacy05">제5조. 정보주체 권리·의무 및 행사 방법</a></li>
			<li><a href="#privacy06">제6조. 처리하는 개인정보 항목</a></li>
			<li><a href="#privacy07">제7조. 개인정보의 파기</a></li>
			<li><a href="#privacy08">제8조. 개인정보의 안전성 확보 조치</a></li>
			<li><a href="#privacy09">제9조. 개인정보 보호책임자</a></li>
			<li><a href="#privacy10">제10조. 개인정보 열람 청구</a></li>
			<li><a href="#privacy11">제11조. 권익 침해 구제 방법</a></li>
			<li><a href="#privacy12">제12조. 개인정보 처리방침 변경</a></li>
		</ul>
		<div class="privacy__con">
			<div id="privacy01">
				<h3>제1조. 개인정보의 처리 목적</h3>
				<p>당 사이트는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다. </p>
				<br>
				<p>1. 홈페이지 회원 가입 및 관리</p>
				<p>회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 제한적 본인확인제 시행에 따른 본인 확인, 서비스 부정이용 방지, 만 14세 미만 아동의 개인정보 처리시 법정대리인의 동의 여부 확인, 홈페이지 이용에 관한 문의사항 확인 및 결과 통보, 홈페이지 서비스 개선을 위한 이용자 의견 수렴, 각종 고지·통지 등을 목적으로 개인정보를 처리합니다.</p>
				<br>
				<p>당 사이트가 개인정보 보호법 제32조에 따라 등록ㆍ공개하는 개인정보파일의 처리 목적은 다음과 같습니다.</p>
				<ul>
					<li>
						개인정보파일의 명칭<br>
						 : 통계지리정보서비스 회원명부<span class="color-red">*</span>
					</li>
					<li>
						운영근거/처리목적<br>
						 : 이용약관/홈페이지 가입의사 확인 및 회원제 서비스 제공
					</li>
					<li>
						개인정보파일에 기록되는 개인정보의 항목<br>
						 : 이름, 생년월일, 성별, 휴대폰 번호, 이메일주소, 전화번호(선택), 주소(선택)
					</li>
					<li>보유기간 : 2년</li>
				</ul>
				<br>
				<p><span class="color-red">*</span> KOSIS(국가통계포털), SGIS+(통계지리정보서비스), MDIS(마이크로데이터 통합서비스), 국가지표체계(e-나라지표/국가주요지표), 통계빅데이터센터 등 통계정보사이트 회원을 통합회원으로 운영함</p>
				<p>※ 좀더 상세한 통계청의 개인정보파일 등록사항 공개는 행정안전부 개인정보보호 종합포털 (<a href="www.privacy.go.kr" target="_blank">www.privacy.go.kr</a>)→ 민원마당 → 개인정보 열람 등 요구 → 개인정보파일 목록검색 메뉴를 활용해주시기 바랍니다.</p>
			</div>



			<div id="privacy02">
				<h3>제2조. 개인정보의 처리 및 보유 기간</h3>
				<p>당 사이트는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
				<br>
				<p>
					각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.<br>
					1. 보유근거 : 이용약관<br>
					2. 개인정보 보유 목적: 홈페이지 회원 가입 및 관리<br>
					3. 보유기간 : 2년<span class="color-red">*</span> (단, 회원탈퇴 시 개인정보를 보유하지 아니합니다.)<br>
					<span class="color-red">*</span> 2년을 주기로 정보주체의 재동의 절차를 거쳐 동의한 경우에만 계속하여 보유합니다.<br>
					마지막 동의일자로부터 2년이 경과한 회원은 휴면회원으로 전환하여 별도 테이블에서 개인정보를 보관하고, 휴면회원 전환 이후 180일간 재동의가 없는 경우 파기합니다.
				</p>
			</div>
			<div id="privacy03">
				<h3>제3조. 개인정보의 제3자 제공</h3>
				<p>통계청은 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
			</div>
			<div id="privacy04">
				<h3>제4조. 개인정보처리의 위탁</h3>
				<p>통계청은 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
				<br>
				<ul>
					<li>위탁업무 : 통계지리정보서비스(SGIS) 유지관리</li>
					<li>위탁받는 자 (수탁자) : (주) 네이버시스템</li>
					<li>위탁업무 내용 : 회원정보 수집 프로그램 및 데이터베이스 유지관리</li>
				</ul>
				<br>
				<ul>
					<li>위탁업무 : 가상식별 실명확인서비스</li>
					<li>위탁받는 자 (수탁자) : SCI 서울신용평가정보(주)</li>
					<li>위탁업무 내용 : 회원가입시 본인 확인 서비스</li>
				</ul>
				<br>
				<ul>
					<li>위탁업무 : I-PIN(아이핀)서비스</li>
					<li>위탁받는 자 (수탁자) : SCI 서울신용평가정보(주)</li>
					<li>위탁업무 내용 : 회원가입시 본인 확인 서비스</li>
				</ul>
			</div>
			<div id="privacy05">
				<h3>제5조. 정보주체 권리·의무 및 행사 방법</h3>
				<p>
					정보주체는 통계청에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.<br>
					1. 개인정보 열람요구<br>
					2. 오류 등이 있을 경우 정정 요구<br>
					3. 삭제요구<br>
					4. 처리정지 요구
				</p>
				<br>
				<p>제1항에 따른 권리 행사는 통계청에 대해 개인정보 보호법 시행규칙 별지 제8호 서식에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 통계청은 이에 대해 지체없이 조치하겠습니다.</p>
				<br>
				<p>정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 통계청은 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.</p>
				<br>
				<p>제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</p>
			</div>
			<div id="privacy06">
				<h3>제6조. 처리하는 개인정보 항목</h3>
				<p>홈페이지 회원 가입 및 관리</p>
				<ul>
					<li>필수항목 : 아이디, 비밀번호, 이름, 생년월일, 성별, 휴대폰 번호, 이메일주소</li>
					<li>선택항목 : 전화번호, 주소</li>
				</ul>
				<br>
				<p>인터넷 서비스 이용과정에서 아래 개인정보 항목이 자동으로 생성되어 수집될 수 있습니다.</p>
				<ul>
					<li>IP주소, 서비스 이용기록, 방문기록</li>
				</ul>
			</div>
			<div id="privacy07">
				<h3>제7조. 개인정보의 파기</h3>
				<p>통계청은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
				<br>
				<p>정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보(또는 개인정보파일)을 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.</p>
				<br>
				<p>개인정보 파기의 절차 및 방법은 다음과 같습니다.</p>
				<p>
					1. 파기절차<br>
					통계청은 파기하여야 하는 개인정보(또는 개인정보파일)에 대해 개인정보 파기계획을 수립하여 파기합니다. 통계청은 파기 사유가 발생한 개인정보(또는 개인정보파일)를 선정하고, 통계청의 개인정보 보호책임자의 승인을 받아 개인정보(또는 개인정보파일)를 파기합니다.
				</p>
				<p>
					2. 파기방법<br>
					통계청은 전자적 파일 형태로 기록ㆍ저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록ㆍ저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
				</p>
			</div>
			<div id="privacy08">
				<h3>제8조. 개인정보의 안전성 확보 조치</h3>
				<p>
					통계청은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.<br>
					1. 관리적 조치 : 내부관리계획 수립ㆍ시행, 정기적 직원 교육 등<br>
					2. 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치<br>
					3. 물리적 조치 : 전산실, 자료보관실 등의 접근통제
				</p>
			</div>
			<div id="privacy09">
				<h3>제9조. 개인정보 보호책임자</h3>
				<p>통계청은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
				<br>
				<p>개인정보 보호책임자</p>
				<ul>
					<li>성명 : 안형준</li>
					<li>직책 : 통계데이터허브국장</li>
					<li>직급 : 일반직 고위공무원</li>
				</ul>
				<br>
				<p>개인정보 보호 담당부서</p>
				<ul>
					<li>부서명 : 통계데이터기획과</li>
					<li>담당자 : 장미란</li>
					<li>연락처 : ☎ 042-481-2062, FAX: 042-481-2474, jmr9832@korea.kr</li>
				</ul>
			</div>
			<div id="privacy10">
				<h3>제10조. 개인정보 열람 청구</h3>
				<p>정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. 통계청은 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.</p>
				<br>
				<p>개인정보 열람청구 접수·처리 부서</p>
				<ul>
					<li>관련서비스: 통계지리정보서비스(SGIS)</li>
					<li>부서명 : 공간정보서비스과</li>
					<li>담당자 : 허정란</li>
					<li>연락처 : ☎ 042-481-2342, FAX: 042-481-2371, dfd303@korea.kr</li>
				</ul>
				<br>
				<p>정보주체는 제1항의 열람청구 접수ㆍ처리부서 이외에, 행정안전부의 ‘개인정보보호 종합지원 포털’ 홈페이지(<a href="http://www.privacy.go.kr" target="_blank">http://www.privacy.go.kr</a>)를 통하여서도 개인정보 열람청구를 하실 수 있습니다.</p>
				<br>
				<p>행정안전부 개인정보보호 종합포털 → 민원마당 → 개인정보 열람등 요구 (본인확인을 위하여 아이핀(I-PIN) 또는 본인명의 휴대폰이 있어야 함)</p>
			</div>
			<div id="privacy11">
				<h3>제11조. 권익 침해 구제 방법</h3>
				<p>정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.</p>
				<br>
				<p>&lt;아래의 기관은 통계청과는 별개의 기관으로서, 통계청의 자체적인 개인정보 불만처리, 피해구제 결과에 만족하지 못하시거나 보다 자세한 도움이 필요하시면 문의하여 주시기 바랍니다.&gt;</p>
				<br>
				<p>개인정보 침해신고센터 (한국인터넷진흥원 운영)</p>
				<ul>
					<li>소관업무 : 개인정보 침해사실 신고, 상담 신청</li>
					<li>홈페이지 : privacy.kisa.or.kr</li>
					<li>전화 : (국번없이) 118</li>
					<li>주소 : 전라남도 나주시 진흥길 9 한국인터넷진흥원</li>
				</ul>
				<br>
				<p>개인정보 분쟁조정위원회</p>
				<ul>
					<li>소관업무 : 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)</li>
					<li>홈페이지 : www.kopico.go.kr</li>
					<li>전화 : 1833-6972</li>
					<li>주소 : 서울특별시 종로구 세종대로 209 정부서울청사 4층</li>
				</ul>
				<br>
				<p>대검찰청 사이버범죄수사단</p>
				<ul>
					<li>전화 : (국번없이) 1301, cid@spo.go.kr (www.spo.go.kr)</li>
				</ul>
				<br>
				<p>경찰청 사이버안전국</p>
				<ul>
					<li>전화 : (국번없이) 182 (cyberbureau.police.go.kr)</li>
				</ul>
				<br>
				<p>
					또한, 개인정보의 열람, 정정·삭제, 처리정지 등에 대한 정보주체자의 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익을 침해 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.<br>
					☞ 중앙행정심판위원회(<a href="www.simpan.go.kr" target="_blank">www.simpan.go.kr</a>)의 전화번호 안내 참조
				</p>
			</div>
			<div id="privacy12">
				<h3>제12조. 개인정보 처리방침 변경</h3>
				<p>이 개인정보 처리방침은 2018. 11. 22.부터 적용됩니다.</p>
			</div>
		</div>
		<div class="text-center"><a href="https://kosis.kr/oneid/common/pravacyPolicy.html" target="_blank" class="dashboard__notice__btn">통합회원 개인정보 처리방침</a></div>
	</div>
	<div class="btn-scroll">
		<a href="#n" class="btn-scroll--top" onclick="$('html, body').animate({scrollTop: '0'}, 500);return false;"><img src="${ctx}/resources/m2021/img/i_top.png" alt="top"></a>
		<a href="#n" class="btn-scroll--bottom" onclick="$('html, body').animate({scrollTop: $(document).height()}, 1000);return false;"><img src="${ctx}/resources/m2021/img/i_bottom.png" alt="bottom"></a>
	</div>
	<jsp:include page="/WEB-INF/jsp/m2021/includes/includeFooter.jsp"/>
</body>
</html> 