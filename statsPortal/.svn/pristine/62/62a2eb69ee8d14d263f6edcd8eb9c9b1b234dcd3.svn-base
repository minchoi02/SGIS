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
	
	<title>SGIS 에듀 > 스스로하기 > 통계갤러리 살펴보기</title>
	
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
                <li><a href="/view/edu/<%= link_sg %>/myself/gallery" class="on">통계갤러리 살펴보기</a></li>
                <li><a href="/view/edu/<%= link_sg %>/myself/mapExp">통계지도 체험하기</a></li>
                <li><a href="/view/edu/<%= link_sg %>/myself/myData">나만의 통계지도 만들기</a></li>
            </ul>
        </div>
        <main>
            <h3 class="contTi">통계갤러리 살펴보기</h3>
            <div class="slideWrap">
                <div class="slideBox">
                    <div class="slideObj">
	                    <div class="bodyDiv">
	                    	<h1  class='title'>1. 나의 통계 이미지를 갤러리로 만들 수 있을까 ?</h1>
	                    	<p class="cn">통계갤러리는 사용자가 SGIS를 이용해서 검색한 다양한 통계정보 또는 사용자가 생성한 통계정보를 공유하며 함께 소통할 수 있는 서비스입니다.
							<br/>여러분들도 아래의 그림과 같이 통계갤러리 항목을 직접 만들어보고 공유해보세요.  <span class='accent'>※ SGIS로그인이 필요합니다.</span>
	                    	</p>
	                    	<div class="imgWrap" style="height:47vh;">
						        <figure class="">
						            <figcaption><그림> 통계갤러리 항목 예시 </figcaption>
						            <img class="" src="/sgis_edu/resource/images/gallery/gallery_00.png" alt=""/>
						        </figure>
						    </div>
	                    	<button class="dirctBtn" onclick="window.open('/view/gallery/resultGallery')">통계갤러리 바로가기</button>
    	                </div>
                    </div>
                    <div class="slideObj">
                     	<div class="bodyDiv">
                     	<h1 class='title'>2. 통계갤러리 이용방법</h1>
                    	<h2 class="subTitle">1단계. 기존서비스 이용하여 통계갤러리 등록하기</h2>
                    	<div class="bodyCn">
	                    	<p class="cn">갤러리 이미지 등록 방법은 기존 서비스(기술업종 통계지도, 대화형 통계지도, 살고 싶은 우리동네, 생활업종 통계지도, 통계주제도)를 조회하여 첨부하는 방법과 사용자 계정에 추가된 즐겨찾기 이미지를 첨부하는 방법이 있습니다.
	                    	기존 서비스로 통계 정보를 조회하여, 통계지도 이미지를 갤러리로 등록하여 공유할 수 있습니다.</p>
                    	</div>
                    		<table class="myselfTable">
	                    		<tr>
		                    		<th>통계갤러리 등록 안내 팝업</th>
		                    		<td class="nextTd" rowspan="3"><img src="/sgis_edu/resource/images/icon_btnPage03_1.png"></td>
		                    		<th>기존 서비스에서 이미지 등록</th>
		                    		<td class="nextTd" rowspan="3"><img src="/sgis_edu/resource/images/icon_btnPage03_1.png"></td>
		                    		<th>통계갤러리 정보 등록 화면</th>
	                    		</tr>
	                    		<tr>
	                    			<td class="imgtd"><img class="" src="/sgis_edu/resource/images/gallery/gallery_01.PNG"/></td>
	                    			<td class="imgtd"><img class="" src="/sgis_edu/resource/images/gallery/gallery_04.PNG"/></td>
	                    			<td class="imgtd"><img class="" src="/sgis_edu/resource/images/gallery/gallery_05.PNG"/></td>
	                    		</tr>
	                    		<tr>
		                    		<td class="cnTd">통계갤러리 메인페이지에서 [갤러리 등록] 버튼을 클릭 후 갤러리 등록 안내 화면에서 [기존 서비스를 조회하여 갤러리등록]에 제시된 메뉴를 선택하여 해당 메뉴로 이동</td>
		                    		<td class="cnTd">이동한 화면에서 통계정보 조회 후, 우측 상단 [★]클릭하여 조회된  등록 팝업화면의 [갤러리 등록] 버튼 클릭</td>
		                    		<td class="cnTd">이미지가 등록 화면에 표시되는 것 확인 후, 갤러리 정보를 입력하여 [갤러리 등록]버튼 클릭</td>
	                    		</tr>
                    		</table>
                    	</div>
                    </div>
                    <div class="slideObj">
                     	<div class="bodyDiv">
                    	<h2 class="subTitle">2단계. 즐겨찾기 이용하여 갤러리 등록하기 </h2>
                    	<div class="bodyCn">
	                    	<p class="cn">갤러리 이미지 등록 방법은 기존 서비스를 조회하여 첨부하는 방법과 사용자 계정에 추가된 즐겨찾기 이미지를 첨부하는 방법이 있습니다.</p>
                    	</div>
                    		<table class="myselfTable">
	                    		<tr>
		                    		<th>통계갤러리 등록 안내 팝업</th>
		                    		<td class="nextTd" rowspan="3"><img src="/sgis_edu/resource/images/icon_btnPage03_1.png"></td>
		                    		<th>통계갤러리 등록 팝업</th>
		                    		<td class="nextTd" rowspan="3"><img src="/sgis_edu/resource/images/icon_btnPage03_1.png"></td>
		                    		<th>즐겨찾기 목록 화면</th>
	                    		</tr>
	                    		<tr>
	                    			<td class="imgtd"><img src="/sgis_edu/resource/images/gallery/gallery_01.PNG"/></td>
	                    			<td class="imgtd"><img src="/sgis_edu/resource/images/gallery/gallery_10.PNG"/></td>
	                    			<td class="imgtd"><img src="/sgis_edu/resource/images/gallery/gallery_02.PNG"/></td>
	                    		</tr>
	                    		<tr>
		                    		<td class="cnTd">즐겨찾기에 등록된 이미지를 활용하기 위해, [갤러리 등록]버튼 클릭</td>
		                    		<td class="cnTd">이미지를 첨부하기 위해, 갤러리 등록 화면에서 [+]버튼 클릭</td>
		                    		<td class="cnTd">즐겨찾기 목록에서 이미지 선택 후, 정보를 입력하고 갤러리 등록</td>
		                    		
	                    		</tr>
                    		</table>
                    	</div>
                    </div>
                    <div class="slideObj">
                     	<div class="bodyDiv">
                    	<h2 class="subTitle">3단계. 활용사례 등록하기</h2>
                    	<div class="bodyCn">
	                    	<p class="cn">이용자가 직접 통계정보를 수급하고 활용사례를 공유할 수있습니다.</p>
                    	</div>
                    		<table class="myselfTable">
	                    		<tr>
		                    		<th>통계갤러리 등록 안내 팝업</th>
		                    		<td class="nextTd" rowspan="3"><img src="/sgis_edu/resource/images/icon_btnPage03_1.png"></td>
		                    		<th>활용사례 등록 화면</th>
		                    		<td class="nextTd" rowspan="3"><img src="/sgis_edu/resource/images/icon_btnPage03_1.png"></td>
		                    		<th>활용사례 상세 화면</th>
	                    		</tr>
	                    		<tr>
	                    			<td class="imgtd"><img src="/sgis_edu/resource/images/gallery/gallery_01.PNG"/></td>
	                    			<td class="imgtd"><img src="/sgis_edu/resource/images/gallery/gallery_06.PNG"/></td>
	                    			<td class="imgtd"><img src="/sgis_edu/resource/images/gallery/gallery_07.PNG"/></td>
	                    		</tr>
	                    		<tr>
		                    		<td class="cnTd">통계갤러리 메인페이지의 [갤러리 등록]버튼 클릭하여 등록 팝업 조회. 팝업에서 [활용사례등록] 클릭</td>
		                    		<td class="cnTd">등록 화면에 제시된 입력 정보를 입력 후 [등록] 클릭 시 활용사례 등록</td>
		                    		<td class="cnTd">목록에서 활용사례 게시글을 클릭하면 등록된 정보 조회</td>
	                    		</tr>
                    		</table>
                    	</div>
                    </div>
                    <div class="slideObj">
                     	<div class="bodyDiv">
                    	<h2 class="subTitle">4단계. 통계갤러리 조회하기</h2>
                    	<div class="bodyCn">
	                    	<p class="cn">SGIS 통계지리정보서비스에 접속하여, '활용서비스 > 통계갤러리' 메뉴 버튼을 누르면 등록된 갤러리 목록을 볼 수 있습니다.</p>
							<p class="tip">갤러리는 모든 이용자가 조회 가능하나, 갤러리 등록은 로그인 한 사용자에게 한하여 제공됩니다.</p>
							<p class="tip">등록된 갤러리에 다른 사용자가 댓글로 소통할 수 있습니다.</p>
                    	</div>
                    		<table class="myselfTable">
	                    		<tr>
		                    		<th>통계갤러리 목록 화면</th>
		                    		<td class="nextTd" rowspan="3"><img src="/sgis_edu/resource/images/icon_btnPage03_1.png"></td>
		                    		<th>통계갤러리 상세 화면 </th>
	                    		</tr>
	                    		<tr>
	                    			<td class="imgtd"><img class="" src="/sgis_edu/resource/images/gallery/gallery_08.PNG"/></td>
	                    			<td class="imgtd"><img class="" src="/sgis_edu/resource/images/gallery/gallery_09.PNG"/></td>
	                    		</tr>
	                    		<tr>
		                    		<td class="cnTd">목록에서 게시물을 클릭하여 상세페이지 팝업 조회</td>
		                    		<td class="cnTd">갤러리의 상세 내용이 조회</td>
	                    		</tr>
                    		</table>
                    	</div>
                    </div>
                    <div class="slideObj">
                     <div class="bodyDiv">
                    	<h1 class='title'>3. 이렇게 이용해 보세요!!</h1>
                    	<div class="bodyCn">
	                    	<h2 class="subTitle">하나. 기본 사용법 익히기</h2>
	                    	<p class="cn">다음 페이지의 '예제 따라해보기'를 통해서 통계갤러리 서비스의 기본적인 사용방법을 익혀보세요.</p>
							<p class="tip">'예제 따라해보기'는 통계갤러리 사용방법을 학습하는 가장 빠른 방법이에요.</p>
                    	</div>
                    	<div class="bodyCn">
	                    	<h2 class="subTitle">둘. 통계지도 공유해보기</h2>
	                    	<p class="cn">내가 관심 있는 주제의 통계지도를 수집하여 갤러리로 만들고 공유해보세요.
							<p class="tip">'기존서비스를 이용하여 통계갤러리 등록하기'를 이용하면 관심있는 주제의 통계지도를 만들거나 찾을 수 있어요.
							</p>
						</div>
                     </div>
                    </div>
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h1 class='title'>4. 예제 따라해보기</h1>
		                   	<div class="bodyCn">
		                    	<p class="cn">아래의 그림은 SGIS 서비스(대화형 통계지도)를 이용해서 생성한 통계갤러리 항목의 상세 화면 입니다. 
									<br/>통계갤러리 서비스를 이용해서 아래의 그림과 같은 통계갤러리 항목을 만들 수 있어요. 먼저<span class='accent'> SGIS 로그인</span>을 하고예제를 따라해보면서 만들어 보세요.
								</p>
		                    	<div class="imgWrap" style="height:47vh;">
							        <figure class="">
							            <figcaption><그림> 통계갤러리 항목 상세화면 예시(대전 유성구 13세~15세 인구 지도)</figcaption>
							            <img class="" src="/sgis_edu/resource/images/gallery/ex_01.png" alt=""/>
							        </figure>
							    </div>
							    <button class="dirctBtn" onclick="window.open('/view/gallery/resultGallery')">통계갤러리 바로가기</button>
							    <button class="dirctBtn" onclick="window.open('/view/map/interactiveMapMain')">대화형 통계지도 바로가기</button>
		                   	</div>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>1) 통계갤러리 서비스 실행하기</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/gallery/ex_02.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>'SGIS > 활용서비스 > 통계갤러리' 메뉴를 실행해주세요. 위 그림은 통계갤러리 첫 화면으로 통계지도 항목들이 목록으로 보여지고 있습니다.</li>
								<li>통계갤러리 항목을 추가하기 위해 <span class="accent">갤러리 등록</span> 버튼을 클릭해주세요.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>2) 통계갤러리 등록 방법 선택하기</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/gallery/ex_03.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>갤러리 등록 팝업화면입니다. 갤러리 등록을 위한 다양한 메뉴가 보여지고 있습니다.</li>
								<li>대화형 통계지도 서비스를 이용해서 통계지도를 만들 예정이므로 '기존 서비스를 조회하여 갤러리 등록'  메뉴 중 <span class="accent">대화형 통계지도</span>  버튼을 클릭합니다.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>3) 통계지도 생성하기 - 통계메뉴 선택</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/gallery/ex_04.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>대화형 통계지도 서비스화면으로 이동되었습니다. 대화형 통계지도는 지도 중심의 통계조회 서비스로 다양한 통계를 조회할 수 있습니다.</li> 
								<li><span class="accent">통계메뉴</span> 버튼을 클릭해주세요.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>4) 통계지도 생성하기 - 연령 항목 선택</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/gallery/ex_05.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>통계메뉴 선택 후 보여지는 왼쪽 메뉴에서 <span class="accent">인구주택 총조사</span> 를 클릭하면, 그림과 같이 인구주택총조사 조건설정 화면이 나타납니다.
								<li>기본적으로 인구조건 설정화면이 보여지고, 하단에 <span class="accent">연령(선택)</span>을 체크합니다.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>5) 통계지도 생성하기 - 통계조회 버튼 생성</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/gallery/ex_06.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>'연령(선택)' 체크 후 '구간선택' 설정화면이 나타납니다. 여기서 <span class="accent">목록선택</span> 메뉴를 클릭하세요.</li>
								<li>나이 연령대 목록에서 우리가 만들려고 하는 <span class="accent">13세~16세 미만</span> 항목을 클릭하고, 최하단에 <span class="accent">인구조건 버튼생성</span> 버튼을 클릭합니다.</li>
						    </ul>
	                    </div>
                    </div>
                    
                     <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>6) 통계지도 생성하기 - 지도 레벨 설정</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/gallery/ex_07.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>위의 그림과 같이 좌측상단에 통계조회 버튼이 생성되었습니다. 이제 원하는 지역에 통계버튼을 드래그앤드롭하면 통계를 조회할 수 있습니다.</li>
								<li>지도화면 우측에 <span class="accent">지도레벨 축소버튼을 3번 클릭</span>해서 대전광역시 유성구 지역이 나오도록 합니다.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>7) 통계지도 생성하기 - 통계 조회</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/gallery/ex_08.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>대전광역시 시군구 단위의 지역경계가 보여지고 있고, 유성구 지역도 확인할 수 있습니다.</li>
								<li>대전광역시 유성구 통계를 조회하기 위해서 마우스를 이용해서 통계조회 버튼을 <span class="accent"> 해당 지역 경계로 드래그앤드롭 </span>해보세요. </li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>8) 갤러리 등록하기 - 즐겨찾기로 저장하기</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/gallery/ex_09.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>통계조회 결과 그림과 같이 대전광역시 유성구 지역의 13세~16세미만 인구 현황 통계 색상지도가 보여지고 있습니다.</li>
								<li>통계갤러리에 등록하기 위해 지도화면 우측 상단의 ★ 모양의 <span class="accent">즐겨찾기로 저장하기</span>  버튼을 클릭하세요.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>9) 갤러리 등록하기 - 갤러리 등록</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/gallery/ex_10.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>통계갤러리에 등록하기 위해  <span class="accent">갤러리 등록</span>  버튼을 클릭하세요.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>10) 갤러리 등록하기 - 갤러리 등록정보 입력</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/gallery/ex_11.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>그림과 같이 통계갤러리 등록화면이 보여집니다. 여기서 제목, 상세정보, 해시태그 등을 입력하고, 공개여부를 설정하면 갤러리 등록을 할 수 있습니다.</li>
								<li><span class="accent">갤러리 등록</span> 버튼을 클릭하세요.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>11) 갤러리 등록결과 확인하기 - 마이 갤러리</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/gallery/ex_12.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>갤러리 항목이 등록되면 위의 그림과 같이 마이 갤러리의 작성 갤러리 목록에 추가됩니다.</li>
								<li>통계갤러리 메인화면에 등록되었는지 보기 위해 화면 상단에 <span class="accent">통계갤러리</span>  명칭을 클릭하세요.</li>
						    </ul>
	                    </div>
                    </div>
                    
                    
                    <div class="slideObj">
	                    <div class="bodyDiv">
		                   	<h2 class='subTitle'>12) 갤러리 등록결과 확인하기 - 통계갤러리 메인화면</h2>
	                    	<div class="imgWrap">
						        <figure class="">
						            <figcaption> </figcaption>
						            <img class="" src="/sgis_edu/resource/images/gallery/ex_13.png" alt=""/>
						        </figure>
						    </div>
						    <ul class="classExp">
						        <li>위의 그림과 같이 통계갤러리 메인화면에 갤러리 항목이 추가되었고, 내가 만든 통계갤러리 항목이 다른 사람과 공유되었습니다.</li>
								<li>이상으로 통계갤러리 등록을 마쳤습니다.</li>
						    </ul>
	                    </div>
                    </div>
                    
                </div>
                <a class="btnPage02 prev">이전</a>
                <a class="btnPage02 next">다음</a>
                <!-- <div class="naviSlide">
                    <button type="button" class="on">1</button>
                    <button type="button">2</button>
                    <button type="button">3</button>
                    <button type="button">4</button>
                </div>  -->
            </div>
        </main>
    </div>
    
<script type="text/javascript">
var schoolGradeCd = '';  
makeSchoolGrade();
srvLogWrite('T0','02','05','01',schoolGradeCd,'ctgr=gallery');

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