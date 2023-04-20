<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
    
    <%
    
    	//======================== 테스트용 세션값 세팅 운영 갈때 주석 요망 ============================
		//session.setAttribute("ss_grant_state", "ASSENT");
    	//session.setAttribute("ss_school_grade", "H");
		//session.setAttribute("member_id", "bombjak1");
    	//session.setAttribute("member_id", "USER3");
    	//session.setAttribute("member_id", "USER2");
    	//=====================================================================================
    
		response.setHeader("Cache-Control","no-store");   
		response.setHeader("Pragma","no-cache");   
		response.setDateHeader("Expires",0);   
		if (request.getProtocol().equals("HTTP/1.1")) response.setHeader("Cache-Control", "no-cache");
		
		
		String param_ss_page_info = request.getParameter("param_ss_page_info")==null? "S":request.getParameter("param_ss_page_info"); //파라미터가 널일 경우 배우는지도(S)를 디폴트로 세팅한다. 그렇지 않으면 쿼리에서 문제가 생김 
		if("T".equals(param_ss_page_info)) {
			session.setAttribute("ss_page_info", "T");
		} else if ("S".equals(param_ss_page_info)) {
			session.setAttribute("ss_page_info", "S");
		} 
		
		String ss_school_grade = session.getAttribute("ss_school_grade")==null?"":(String)session.getAttribute("ss_school_grade"); //mng_s 20210802
		String ss_grant_state  = session.getAttribute("ss_grant_state")==null?"":(String)session.getAttribute("ss_grant_state"); //mng_s 20210802
		String ss_page_info    = session.getAttribute("ss_page_info")==null?"":(String)session.getAttribute("ss_page_info"); //mng_s 20210802
		String ss_member_id    = session.getAttribute("member_id")==null?"":(String)session.getAttribute("member_id");
	%>   

<!DOCTYPE html>
<html lang="ko">
<head>
 	<meta charset="utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<title>SGIS 에듀 > 스스로하기 > 나만의 통계지도 만들기</title>
	
    <link rel="stylesheet" href="/sgis_edu/resource/css/base.css">
    <link rel="stylesheet" href="/sgis_edu/resource/css/common.css">
    <link rel="stylesheet" href="/sgis_edu/resource/css/myself.css">
    <link rel="stylesheet" href="/sgis_edu/resource/css/slick.css">
    <link rel="shortcut icon" href="resource/images/favicon.ico">	

	<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
	<script type="text/javascript" src='/js/plugins/jquery.form.js'></script>
	
	<script type="text/javascript" src="/js/plugins/jquery.sha256.js"></script>
	<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
	<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>
	
	<script type="text/javascript" src="/js/common/common.js"></script>
	<script type="text/javascript" src="/sgis_edu/resource/js/common.js?ver=123"></script>

    <script type="text/javascript" src="/sgis_edu/resource/js/slick.min.js"></script>
	
	<%
		String style_sg = "";
		
		if("E".equals(ss_school_grade)) {
			style_sg = "<link rel=\"stylesheet\" href=\"/sgis_edu/resource/css/ele.css\">";
		} else if ("M".equals(ss_school_grade)) {
			style_sg = "<link rel=\"stylesheet\" href=\"/sgis_edu/resource/css/mid.css\">";
		} else if ("H".equals(ss_school_grade)) {
			style_sg = "<link rel=\"stylesheet\" href=\"/sgis_edu/resource/css/high.css\">";
		} else {
			style_sg = "<link rel=\"stylesheet\" href=\"/sgis_edu/resource/css/ele.css\">";
		}
	%>
	<%= style_sg %>
	
</head>

<body>   
	
	<% 
		if("E".equals(ss_school_grade)) {
	%>
			<jsp:include page="/view/edu/ele/header"></jsp:include>
	<%
		} else if ("M".equals(ss_school_grade)) {
	%>
			<jsp:include page="/view/edu/mid/header"></jsp:include>
	<%
		} else if ("H".equals(ss_school_grade)) {
	%>
			<jsp:include page="/view/edu/high/header"></jsp:include>
	<%
		} else {
	%>
			<jsp:include page="/view/edu/mid/header"></jsp:include>
	<%
		}
	%>

	<!-- body -->
	<input type="hidden" value="${ss_school_level}" id="school_grade"/>
	<div class="sub list">
        <div class="lnb">
            <h2 class="lnbTi">스스로하기</h2>
			<%
				String link_sg = "";
				
				if("E".equals(ss_school_grade)) {
					link_sg = "ele";
				} else if ("M".equals(ss_school_grade)) {
					link_sg = "mid";
				} else if ("H".equals(ss_school_grade)) {
					link_sg = "high";
				} else {
					link_sg = "ele";
				}
			%>
			            
            <ul class="menu">
                <li><a href="/view/edu/<%= link_sg %>/myself/gallery" >통계갤러리 살펴보기</a></li>
                <li><a href="/view/edu/<%= link_sg %>/myself/mapExp">통계지도 체험하기</a></li>
                <li><a href="/view/edu/<%= link_sg %>/myself/myData"  class="on">나만의 통계지도 만들기</a></li>
            </ul>
        </div>
        <main>
            <h3 class="contTi">나만의 통계지도 만들기</h3>
            <div class="slideWrap">
                <div class="slideBox">
                    <div class="slideObj">
	                    <div class="bodyDiv">
	                    	<h1  class='title'>1. 나의 데이터를 보여줄 수 있을까 ?</h1>
	                    	<p class="cn">대화형 통계지도의 '나의 데이터'를 이용하면 내가 가지고 있는 위치자료를 서버에 업로드 할 수 있고, 위치보기, 열지도 등 다양하게 시각화가 가능합니다.<br/>
							'나의 데이터' 기능을 이용해서 아래의 그림과 같이 통계지도를 만들고, 다양하게 시각화 해보세요.  <span class="accent">※ SGIS로그인이 필요합니다.</span>
	                    	</p>
	                    	<div class="imgWrap" style="height:45vh;">
						        <figure class="">
						            <figcaption><그림> '나의 데이터'를 이용한 통계지도 시각화 예시</figcaption>
						            <img src="/sgis_edu/resource/images/myData/myData_00.png" alt=""/>
						        </figure>
						    </div>
	                    	<button class="dirctBtn" onclick="window.open('/view/map/interactiveMap/userDataView')">나의 데이터 바로가기</button>
	                    	<button class="dirctBtn" onclick="window.open('/html/popup/mypage/guide.jsp','_blank','top=100 , left=120, width=1247,height=820')">나의 데이터 상세 이용가이드 보기</button>
	                    	<button class="dirctBtn" onclick="window.open('/jsp/sample/dataUpload.jsp')">나의 데이터 체험하기 바로가기</button>
	                    	
    	                </div>
                    </div>
                    <div class="slideObj">
                     	<div class="bodyDiv">
                    	<h1 class='title'>2. 나의 데이터 이용방법</h1>
                    	<p class="cn">학생들이 주소정보를 포함한 자료를 가지고 있는 경우 해당자료를 엑셀양식에 맞춰 정리한 후 대화형 통계지도에 업로드하면 주소가 지도좌표로 변환되어 화면에 마커 또는 열지도로 표시할 수 있다.</p>
                    	<h2 class="subTitle">1단계. '나의 데이터' 목록 확인</h2>
                    	<div class="bodyCn">
	                   		<p class="cn">먼저 로그인을 하고, '마이페이지 > 나의 데이터' 메뉴 버튼을 누르면 직접 업로드한 데이터 목록을 확인할 수 있다.</p>
							<p class="tip">마이페이지 메뉴는 기본적으로 나타나지 않고, 로그인을 한 후에 볼 수 있다.</p>
							<p class="tip">저장된 데이터는 대화형통계지도 또는 생활업종통계지도 서비스에서 활용 가능하다.</p>
                    	</div>
                    	<table class="myselfTable">
                    		<tr>
	                    		<th>마이페이지 메뉴</th>
	                    		<td class="nextTd" rowspan="3"><img src="/sgis_edu/resource/images/icon_btnPage03_1.png"></td>
	                    		<th>나의 데이터 목록</th>
                    		</tr>
                    		<tr>
                    			<td class="imgtd"><img src="/sgis_edu/resource/images/myData/myData_01.PNG"/></td>
                    			<td class="imgtd"><img src="/sgis_edu/resource/images/myData/myData_02.PNG"/></td>
                    		</tr>
                    		<tr>
	                    		<td class="cnTd">로그인을 하면 화면 최상단에 마이페이지 메뉴가 나타나고, 마이페이지 버튼을 누르면 마이페이지 사용자 관리 화면으로 이동하고 나의 데이터 메뉴를 확인할 수 있음.</td>
	                    		<td class="cnTd">나의 데이터 목록에는 이전에 업로드한 데이터 목록이 표출됨. 업로드된 데이터는 지도보기, 다운로드, 데이터 설정 등을 할 수 있음.</td>
                    		</tr>
                   		</table>
                    	</div>
                    </div>
                    <div class="slideObj">
	                    <div class="bodyDiv">
	                    	<h2 class="subTitle">2단계. 데이터 업로드</h2>
	                    	<div class="bodyCn">
		                   		<p class="cn">데이터 업로드를 위해 예제 파일을 다운로드 하여 파일형식을 확인하고, 이에 맞게 데이터를 생성하여 업로드 해본다.</p>
								<p class="tip">1회 데이터 업로드 시 제한이 있다. 3500row /10 column (엑셀, CSV, TXT)</p>
								<p class="tip">지정정보는 엑셀, CSV, TXT 파일 형식을 이용하고, 마커/라인/폴리곤 등의 정보는 KML 파일 형식을 이용하도록 한다.</p>
	                    	</div>
	                    	<table class="myselfTable">
                    		<tr>
	                    		<th>내 파일 업로드하기</th>
	                    		<td class="nextTd" rowspan="3"><img src="/sgis_edu/resource/images/icon_btnPage03_1.png"></td>
	                    		<th>데이터 업로드 (엑셀 파일)</th>
                    		</tr>
                    		<tr>
                    			<td class="imgtd"><img class="img80" src="/sgis_edu/resource/images/myData/myData_03.PNG"/></td>
                    			<td class="imgtd"><img class="img80" src="/sgis_edu/resource/images/myData/myData_04.PNG"/></td>
                    		</tr>
                    		<tr>
	                    		<td class="cnTd">'내 파일 업로드하기'버튼을 누르면 '나의 데이터 업로드'페이지로 이동하고, 파일을 선택해서 업로드 할 수 있음. 데이터 생성 시 예제 파일을 다운로드 하여 확인이 필요하고, 이에 맞게 데이터를 생성해야 함</td>
	                    		<td class="cnTd">엑셀파일의 경우 명칭과 정확한 주소는 반드시 있어야 하며, 그 외 필드는 마음대로 추가하거나 제거할 수 있음.</td>
                    		</tr>
                   		</table>
	                   	</div>
                    </div>
                    <div class="slideObj">
                    	<div class="bodyDiv">
	                    	<h2 class="subTitle">3단계. 지오코딩 및 지도표출 설정</h2>
	                    	<div class="bodyCn">
	                    	<p class="cn">지도에 표출하기 위한 좌표 생성을 위해 지오코딩을 실행하고, 그 후에 지도 표출 방식을 설정한다.</p>
							<p class="tip">주소는 지번주소와 도로명주소 모두 사용 가능하고, 데이터에 X, Y 좌표값이 포함되어 있으면 주소는 없어도 된다.</p>
							<p class="tip">지도표출 설정 시 데이터 시각화 유형으로 마커를 이용한 위치표시 방식과 열지도 표출 방식이 있다.</p>
							</div>
                    	<table class="myselfTable">
                    		<tr>
	                    		<th>위치조회(지오코딩) 실행</th>
	                    		<td class="nextTd" rowspan="3"><img src="/sgis_edu/resource/images/icon_btnPage03_1.png"></td>
	                    		<th>지도표출 설정</th>
                    		</tr>
                    		<tr>
                    			<td class="imgtd"><img class="img80" src="/sgis_edu/resource/images/myData/myData_05.PNG"/></td>
                    			<td class="imgtd"><img class="img80" src="/sgis_edu/resource/images/myData/myData_06.PNG"/></td>
                    		</tr>
                    		<tr>
	                    		<td class="cnTd">위치조회(지오코딩) 실행한 후에 X, Y 필드를 선택하거나, 주소 필드를 선택하면 입력한 주소를 바탕으로 지도에 표시할 X, Y좌표를 자동으로 찾아준다. 주소가 정확하지 않을 시 실패할 수 있다.</td>
	                    		<td class="cnTd">지도표출 설정 버튼을 눌러서 지도화면에 표출될 기본 설정을 할 수 있음. 기본적으로 표시될 대표명칭, 마우스로 클릭할 때 보일 데이터, 시각화유형(열지도 또는 위치표시) 설정이 가능함.</td>
                    		</tr>
                   		</table>
	                   	</div>
                    </div>
                    <div class="slideObj">
                     <div class="bodyDiv">
                    	<h2 class="subTitle">4단계. 서비스에서 내 데이터 활용</h2>
                     	<div class="bodyCn">
                    		<p class="cn">업로드가 완료된 내 데이터를 대화형 통계지도 서비스에서 확인해보도록 한다.</p>
							<p class="tip">데이터보드의 위치정보 목록에서 항목을 체크하여 각 항목별로 표출여부를 설정할 수 있다.</p>
						</div>
                    	<table class="myselfTable">
                    		<tr>
	                    		<th>대화형 통계지도에서 표출(위치보기 타입)</th>
	                    		<td class="nextTd" rowspan="3"><img src="/sgis_edu/resource/images/icon_btnPage03_1.png"></td>
	                    		<th>대화형 통계지도에서 표출(열지도 타입)</th>
                    		</tr>
                    		<tr>
                    			<td class="imgtd"><img class="" src="/sgis_edu/resource/images/myData/myData_07.PNG"/></td>
                    			<td class="imgtd"><img class="" src="/sgis_edu/resource/images/myData/myData_08.PNG"/></td>
                    		</tr>
                    		<tr>
	                    		<td class="cnTd">'대화형 통계지도>나의 데이터'에서 데이터 항목을 선택하면, 지도화면에 내 데이터 위치가 마커 형태로 표출되고, 데이터보드에서 데이터 상세정보를 확인 할 수 있음.</td>
	                    		<td class="cnTd">데이터 조회 방식을 열지도로 선택하면 그림과 같이 열지도 형태로 표출됨. 지도레벨을 변경하여 바뀌는 열지도를 확인해볼 수 있음.</td>
                    		</tr>
                   		</table>
                     </div>
                    </div>
                    <div class="slideObj">
                     <div class="bodyDiv">
                    	<h1 class='title'>3. 이렇게 이용해 보세요!!</h1>
                    	<div class="bodyCn">
	                    	<h2 class="subTitle">하나. 기본 사용법 익히기</h2>
	                    	<p class="cn">다음 페이지의 '예제 따라해보기'를 통해서 나의 데이터 메뉴의  기본적인 사용방법을 익혀보세요.</p>
							<p class="cn">예제 따라해보기를 통해서 기본적인 사용법을 익힌 후에는 나의 데이터 상세 이용가이드를 확인해보세요. 나의 데이터 기능을 모두 둘러볼 수 있어요.</p>
							<p class="tip">예제 따라하기를 이용할 때 SGIS 로그인 없이 이용하려면 나의 데이터 체험하기를 활용해보세요.</p>
                    	</div>
                    	<div class="bodyCn">
                    		<h2 class="subTitle">둘. 공공데이터 포털에서 나만의 데이터를 수집해서 활용해보세요.</h2>
                    		<p class="cn">예제 따라해보기에서 알려드린 공공데이터 포털 사이트에 들어가 보면 무궁무진한 통계데이터를 확인할 수 있어요.</p>
							<p class="cn">본인의 관심 있는 주제를 선정해서 데이터 수집하고, 나의 데이터 메뉴를 이용해서 지도에 표출할 수 있는 데이터로 만들어 보세요.</p>
							<p class="tip">인터넷에서 데이터를 수집할 때는 상세 주소데이터가 포함된 자료를 수집하세요. 주소 정보가 없으면 지도에 표출할 수가 없어요.</p>
                    	</div>
                     </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h1 class='title'>4. 예제 따라해보기</h1>
		                   	<div class="bodyCn">
		                    	<p class="cn">아래의 그림은 SGIS 서비스 중 대화형 통계지도 '나의 데이터' 기능을 이용해서 만든 대전광역시 서구 중학교 현황지도입니다. 
								<br/>'나의 데이터' 기능을 이용해서 아래의 그림과 같이 내가 가지고 있는 데이터를 통계지도를 만들 수 있어요.  먼저 <span class="accent"> SGIS 로그인</span>을 하고 예제를 따라해보면서 만들어 보세요.
		                    	
								</p>
		                    	<div class="imgWrap" style="height:47vh;">
							        <figure class="">
							            <figcaption><그림> 통계갤러리 항목 상세화면 예시(대전 유성구 13세~15세 인구 지도)</figcaption>
							            <img class="" src="/sgis_edu/resource/images/myData/ex_00.png" alt=""/>
							        </figure>
							    </div>
							    <button class="dirctBtn" onclick="window.open('/view/map/interactiveMap/userDataView')">나의 데이터 바로가기</button>
		                   	</div>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>1) 데이터 준비하기 - 데이터 검색</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/myData/ex_01.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>우리가 만들 지도는 대전광역시 서구 중학교 현황 지도입니다. 공공데이터 포털 사이트에서 필요한데이터를 찾을 수 있습니다.</li>
								<li>공공데이터 포털(www.data.go.kr)에 접속 후 <span class="accent">대전광역시 서구 중학교</span>를 검색해서 데이터를 찾아보세요. 데이터를 찾으면 <span class="accent">다운로드</span> 합니다.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
	                    <a href="" class="faq-btn dl"></a>
		                   	<h2 class='subTitle'>2) 데이터 준비하기 - 데이터 편집 <a href="/contents/include/download.jsp?filename=대전광역시_서구_중학교_현황.csv&path=/myData/&type=edu"  class="btn dl bp-long"><span>대전광역시 서구_중학교 현황.csv</span></a></h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/myData/ex_02.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>다운로드 후 파일을 열어보면 각각의 중학교 단위로 많은 컬럼(속성)정보가 포함되어 있습니다. '나의 데이터' 기능을 이용하려면 컬럼(속성)정보가 10개 이하 이어야 합니다.</li>
								<li>여기서 위의 그림과 같이 학교명, <span class="accent">학교도로명 주소, 전화번호, 홈페이지 주소, 남녀공학 구분</span> 등 5개의 컬럼만 남기고, 나머지 컬럼은 삭제합니다. </li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>3) 나의 데이터 메뉴 실행하기</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/myData/ex_03.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>마이페이지의 나의 데이터 메뉴를 실행하면 위의 그림과 같이 나의 데이터 목록이 보여집니다.</li>
								<li><span class="accent">내 파일 업로드 하기</span> 버튼을 클릭합니다.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>4) 파일 업로드 하기</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/myData/ex_04.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>내 컴퓨터 파일 찾기 화면이 나타나면 <span class="accent">파일찾기</span> 버튼을 클릭하고, 이전 단계에서 편집한 '대전광역시 서구 중학교 현황' 엑셀 파일을 선택합니다.</li>
								<li>그러면 위의 그림과 같이 선택된 파일의 정보가 표 형태로 보여집니다. 여기서 <span class="accent">나의 데이터를 POI로 표출하기</span> 버튼을 클릭하세요.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>5) 데이터 위치정보 생성하기 - 위치 생성방법 선택</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/myData/ex_05.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>우리가 업로드한 파일에는 '학교도로명 주소' 정보가 포함되어 있고, 이 주소 정보를 이용해서 지도에 표시할 위치 정보인 X, Y 좌표값을 생성하게 됩니다.</li>
								<li><span class="accent">주소 필드 선택</span> 버튼을 클릭하세요.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>6) 데이터 위치정보 생성하기 - 주소 필드 선택</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/myData/ex_06.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>'학교도로명 주소' 정보는 E 필드에 있습니다. <span class="accent">E 필드</span>를 선택하고, 확인을 클릭해주세요.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>7) 데이터 위치정보 생성하기 - 결과 확인</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/myData/ex_07.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>잠시 동안 지오코딩(주소 정보를 이용한 X, Y 좌표값 생성) 작업이 진행되고나면 위의 그림과 같이 X, Y 좌표값을 포함한 위치정보 관련된 데이터가 추가됩니다.</li> 
								<li>이제 각 학교의 위치정보가 생성되었으니 지도화면에서 볼 수 있습니다. <span class="accent">지도표출설정</span> 버튼을 클릭하세요.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>8) 지도 표출 설정하기</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/myData/ex_08.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>지도표출설정 화면에서는 우측 지도화면에 중학교 위치가 아이콘 형태로 표출됩니다. </li>
								<li>여기서 <span class="accent">학교 아이콘을 클릭</span>해보면 그림과 같이 툴팁정보에 학교명이 표출됩니다. 툴팁 표출정보를 바꿔보겠습니다.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>9) 지도 표출 설정하기 - 툴팁 표출 설정</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/myData/ex_09.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>좌측에 '툴팁 표출 설정' 에서 학교명은 선택 해제하고, <span class="accent">학교도로명 주소, 전화번호, 홈페이지 주소</span> 등 3가지 항목을 선택하고 <span class="accent">미리보기</span> 버튼을 클릭합니다.</li>
								<li>이제 다시 <span class="accent">학교 아이콘을 클릭</span>해보면 툴팁정보가 변경된 것을 확인할 수 있습니다.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>10) 저장하기</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/myData/ex_10.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>이제 지금까지 만든 데이터를 저장해보겠습니다. <span class="accent">저장</span> 버튼을 클릭하세요.</li>
								<li>팝업창이 표출되면 <span class="accent">제목을 입력</span>하고, 다시 <span class="accent">저장</span> 버튼을 클릭합니다.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>11) 저장하기 - 나의 데이터 목록 확인</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/myData/ex_11.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>다시 처음의 나의 데이터 첫 화면으로 돌아왔습니다. 그리고, 지금까지 업로드하여 저장한 데이터가 목록에 추가된 것을 확인할 수 있습니다.</li> 
								<li>이제 나의 데이터를 대화형 통계지도 서비스 화면에서 열어보겠습니다.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>12) 대화형 통계지도의 나의 데이터 실행하기</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/myData/ex_12.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>대화형 통계지도의 <span class="accent">나의 데이터</span> 메뉴를 실행합니다.</li>
								<li>그러면 좌측에 나의 데이터 목록이 표출되고, 이전 단계에서 추가된 항목도 확인할 수 있습니다. <span class="accent">대전 서구 중학교 지도</span> 항목을 클릭하세요.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>13) 나의 데이터 상세보기</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/myData/ex_13.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>위의 그림에서와 같이 중학교 위치가 아이콘으로 표출되고, 학교 아이콘을 클릭하면 직접 설정한 툴팁정보가 표출되는 것을 확인할 수 있습니다.</li>
								<li>추가로 우측의 데이터보드 영역에서 지도 설정을 바꿔볼 수 있습니다. </li>
						    </ul>
	                    </div>
                    </div>
                    
                </div>
                    
                <a class="btnPage02 prev">이전</a>
                <a class="btnPage02 next">다음</a>

            </div>
        </main>
    </div>
    
  <script>
	
	
	$.sample = function(url) {
		var openNewWindow = window.open("about:blank");
		openNewWindow.location.href = url;
	}
	
	var schoolGradeCd = '';  
	makeSchoolGrade();
	srvLogWrite('T0','02','05','03',schoolGradeCd,'ctgr=myData');
	
    $('.slideBox').slick({
      dots: true,
      infinite: false,
      speed: 300,
      prevArrow : $(".btnPage02.prev"),
      nextArrow : $(".btnPage02.next"),
      slidesToShow: 1,
      adaptiveHeight: false,
      dotsClass:'naviSlide'
    });
    </script>
</body>
</html>