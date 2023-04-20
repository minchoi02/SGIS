<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
    
    <%
    
    	//======================== 테스트용 세션값 세팅 운영 갈때 주석 요망 ============================
//     	session.setAttribute("ss_grant_state", "ASSENT");
    	//session.setAttribute("ss_school_grade", "H");
//     	session.setAttribute("member_id", "bombjak1");
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
	
	<title>SGIS 에듀 > 스스로하기 > 통계지도 체험하기</title>
	
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
                <li><a href="/view/edu/<%= link_sg %>/myself/mapExp" class="on">통계지도 체험하기</a></li>
                <li><a href="/view/edu/<%= link_sg %>/myself/myData">나만의 통계지도 만들기</a></li>
            </ul>
        </div>
        <main>
            <h3 class="contTi">통계지도 체험하기</h3>
            <div class="slideWrap">
                <div class="slideBox">
                    <div class="slideObj">
	                    <div class="bodyDiv">
	                    	<h1  class='title'>1. '통계지도 만들기' 할 수 있을까?</h1>
	                    	<p class="cn">통계지도 체험은 이용자가 직접 통계 데이터를 입력하여 색채지도를 제작할 수 있으며, 이용방법이 간단하고 데이터 입력이 쉬워서 누구나 쉽게 활용 가능한 서비스입니다.
							<br/>여러분들도 아래의 그림과 같이 다양한 형태의 통계지도를 만들어 보세요. 
							</p>
	                    	<div class="imgWrap" style="height:47vh;">
						        <figure class="">
						            <figcaption><그림> 통계지도 체험을 이용한 통계지도 예시 </figcaption>
						            <img class="" src="/sgis_edu/resource/images/mapExp/mapExp_00.png" alt=""/>
						        </figure>
						    </div>
	                    	<button class="dirctBtn" onclick="window.open('/statexp/view/index')">통계지도 체험 바로가기</button>
							<button class="dirctBtn" onclick="window.open('/statexp/view/index?tutorial_mode')">통계지도 체험 튜토리얼 바로가기</button>
    	                </div>
                    </div>
                   	<div class="slideObj">
                     	<div class="bodyDiv">
                    	<h1 class='title'>2. 통계지도 체험 이용방법</h1>
                    	<p class="cn">통계지도 체험을 이용해서 지도를 만드는 방법에는 이용자가 화면에서 직접 데이터를 입력하는 방법과 엑셀로 데이터를 입력하여 업로드하는 방법이 있습니다. 지도를 제작하고자 하는 행정구역을 선택하고 데이터를 직접 입력하거나 엑셀파일을 업로드하여 색채지도를 만듭니다.</p>
                    	<h2 class="subTitle">1단계. 데이터입력하여 통계지도 만들기</h2>
                    	<div class="bodyCn">
	                    	<p class="cn">가장 간단한 방법으로 통계체험 레벨과 행정구역을 선택하고, 간단히 데이터를 입력하여 색채지도를 만들어봅니다.</p>
    	                	<p class="tip">전국지도에서 시도 통계체험뿐만 아니라 시군구/읍면동 통계체험도 해볼 수 있습니다. 이럴 경우 많은 개수의 데이터 입력이 필요합니다.</p>
                    	</div>
                    		<table class="myselfTable">
	                    		<tr>
		                    		<th>통계지도 체험 화면</th>
		                    		<td class="nextTd" rowspan="3"><img src="/sgis_edu/resource/images/icon_btnPage03_1.png"></td>
		                    		<th>시군구 통계체험 설정 (대전광역시)</th>
		                    		<td class="nextTd" rowspan="3"><img src="/sgis_edu/resource/images/icon_btnPage03_1.png"></td>
		                    		<th>데이터 입력 결과 (대전광역시)</th>
	                    		</tr>
	                    		<tr>
	                    			<td class="imgTd"><img src="/sgis_edu/resource/images/mapExp/mapExp_01.PNG"/></td>
	                    			<td class="imgTd"><img src="/sgis_edu/resource/images/mapExp/mapExp_02.PNG"/></td>
	                    			<td class="imgTd"><img src="/sgis_edu/resource/images/mapExp/mapExp_03.PNG"/></td>
	                    		</tr>
	                    		<tr>
		                    		<td class="cnTd">첫 화면에 전국 시도 통계체험-직접입력 기준으로 화면이 구성됨</td>
		                    		<td class="cnTd">대전광역시 지도화면 생성(작업선택에서 시군구 통계체험 선택 →시도목록에서 대전광역시 선택 →전국or시도에서 시도 선택)</td>
		                    		<td class="cnTd">시군구 통계체험 설정 후 5개의 시군구 입력칸에 숫자 입력 후 입력결과 '적용'버튼을 클릭하면 입력값이 반영되어 색채지도가 표출됨. 동시에 지도범례도 확인됨.</td>
	                    		</tr>
                    		</table>
                    	</div>
                    </div>
                    <div class="slideObj">
                     	<div class="bodyDiv">
	                    	<h2 class="subTitle">2단계. 엑셀 업로드하여 통계지도 만들기</h2>
	                    	<div class="bodyCn">
	                    		<p class="cn">엑셀파일을 업로드하여 통계지도를 만들기 위해 샘플데이터를 다운로드 받고 다시 업로드하여 통계지도가 만들어지는 과정을 확인해봅니다.</p>
	                    		<p class="tip">양식파일 또는 샘플파일 다운로드 후 파일에서 하는 원하는 통계값을 수정한 후에 다시 업로드 하는 방식이 일반적입니다.</p>
	                    	</div>
	                    	<table class="myselfTable">
	                    		<tr>
		                    		<th>샘플 다운로드 화면(시군구 총인구)</th>
		                    		<td class="nextTd" rowspan="3"><img src="/sgis_edu/resource/images/icon_btnPage03_1.png"></td>
		                    		<th>데이터 업로드 (시군구 총인구)</th>
		                    		<td class="nextTd" rowspan="3"><img src="/sgis_edu/resource/images/icon_btnPage03_1.png"></td>
		                    		<th>데이터 입력 결과 (시군구 총인구)</th>
	                    		</tr>
	                    		<tr>
	                    			<td class="imgTd"><img src="/sgis_edu/resource/images/mapExp/mapExp_04.PNG"/></td>
	                    			<td class="imgTd"><img src="/sgis_edu/resource/images/mapExp/mapExp_05.PNG"/></td>
	                    			<td class="imgTd"><img src="/sgis_edu/resource/images/mapExp/mapExp_06.PNG"/></td>
	                    		</tr>
	                    		<tr>
		                    		<td class="cnTd">입력방식에서 '엑셀로 입력' 선택 후 샘플파일 ('시군구 총인구' 버튼 클릭)을 다운로드 파일을 열어보면 시군구별 총인구 통계값 확인</td>
		                    		<td class="cnTd">'데이터 업로드' 버튼 클릭 후 엑셀파일 선택하여 업로드. 후에 지도화면이 전국 시군구단위로 변경되고, 입력창에 값이 들어있는 것을 확인할 수 있음.</td>
		                    		<td class="cnTd">'입력결과 적용'버튼을 클릭하면 엑셀 파일에 있던 통계값이 반영되어 통계지도가 표출됨. 동시에 지도범례도 확인 할 수 있음.</td>
	                    		</tr>
                    		</table>
                    	</div>
                    </div>
                    <div class="slideObj">
                     	<div class="bodyDiv">
	                    	<h2 class="subTitle">3단계. 범례 설정</h2>
	                    	<div class="bodyCn">
	                    		<p class="cn">지도화면의 범례창 우상단의 범례설정 버튼(톱니바퀴 버튼)을 누르면 범례설정 창이 나타나고, 다양한 범례설정을 할 수 있습니다.
	                    		아래의 설명에 따라 전국지도 기반에서 범례 색상설정, 범례구간 설정 등을 해보도록 합니다.</p>
	                    		<p class="tip">범례 색상, 구간, 범례값 수정 등 외에 범례역순, 라벨색상, 배경색상, 라벨표시여부, 폰트설정 등을 할 수 있습니다.</p>
	                    	</div>
	                    	<table class="myselfTable">
	                    		<tr>
		                    		<th>범례 색상 설정(사용자지정)</th>
		                    		<td class="nextTd" rowspan="3"></td>
		                    		<th>범례 구간수 설정(7단계) 및 범례 직접입력</th>
	                    		</tr>
	                    		<tr>
	                    			<td class="imgTd"><img class="img80" src="/sgis_edu/resource/images/mapExp/mapExp_07.PNG"/></td>
	                    			<td class="imgTd"><img class="img80" src="/sgis_edu/resource/images/mapExp/mapExp_08.PNG"/></td>
	                    		</tr>
	                    		<tr>
		                    		<td class="cnTd">범례설정 화면에서 지도범례색상 부분의 사용자 지정을 선택한 후 색상 버튼을 누르면 원하는 색상을 설정할 수 있음. 색상 설정 후 법례설정 화면 하단의 '적용'버튼을 누르면 지도화면의 색상이 변경되는 것을 볼 수 있음.</td>
		                    		<td class="cnTd">범례 구간은 기본값이 5레벨이고, 2~10레벨 사이에서 설정할 수 있음. 범례 간격은 기본이 등간격인데, 각 구간의 범례값을 원하는대로 변경할 수 있음. 범례구간 또는 법례값을 변경한 후 범례설정 화면 하단의 '적용'버튼을 누르면 설정에 따라 지도화면이 바뀌는 것을 확인할 수 있음.</td>
	                    		</tr>
	                   		</table>
                    	</div>
                    </div>
                    <div class="slideObj">
	                    <div class="bodyDiv">
	                   	<h1 class='title'>3. 이렇게 이용해 보세요!!</h1>
	                   	<div class="bodyCn">
	                    	<h2 class="subTitle">하나. 기본 사용법 익히기</h2>
	                    	<p class="cn">다음 페이지의 '예제 따라해보기'를 통해서 통계지도 체험 서비스의 기본적인 사용방법을 익혀보세요.</p>
							<p class="cn">예제 따라하기 통해서 기본적인 사용법을 익힌 후에는 통계지도 체험 서비스의 튜토리얼 기능을 사용해보세요.. 통계지도 체험 서비스의 전체적인 기능을 둘러볼 수 있어요.</p>
							<p class="tip">통계지도 체험 첫 페이지에 통계지도 체험 바로가기와 튜토리얼 바로가기가 있어요.</p>
	                   	</div>
	                   	<div class="bodyCn">
	                    	<h2 class="subTitle">둘. 내가 살고 있는 지역의 통계지도 만들어보기</h2>
	                    	<p class="cn">내가 살고 있는 지역의 통계지도를 만들어보세요. 시도, 시군구, 읍면동 단위의 통계지도를 모두 만들어 볼 수 있어요.</p>
							<p class="cn">통계는 인구 수, 인구밀도, 사업체 수 등 기본적인 통계를 활용해도 되고, 임의의 통계값을 입력해서 나만의 통계지도를 만들 수도 있어요</p>
							<p class="tip">SGIS의 대화형 통계지도, 통계주제도 등의 서비스를 이용하면 인구, 사업체 등의 기본적인 통계를 확인할 수 있어요.</p>
						</div>
	                    </div>
                    </div>
                <div class="slideObj">
                    <div class="bodyDiv">
	                  	<h1 class='title'>4. 예제 따라해보기</h1>
	                  	<div class="bodyCn">
	                   	<p class="cn">아래의 그림은 SGIS 서비스(대화형 통계지도)에서 대구광역시 시군구 단위의 인구통계를 조회한 통계 색상지도 화면입니다. 
						<br/>통계지도 체험 서비스를 이용해서 아래의 그림과 같은 통계지도를 만들 수 있어요. 예제를 따라해보면서 통계지도를 만들어 보세요.
						</p>
	                   	<div class="imgWrap" style="height:47vh;">
					        <figure class="">
					            <figcaption><그림> 대화형 통계지도 인구통계 조회 화면(대구광역시)</figcaption>
					            <img class="" src="/sgis_edu/resource/images/mapExp/ex_00.png" alt=""/>
					        </figure>
					    </div>
					    <button class="dirctBtn" onclick="window.open('/statexp/view/index')">통계지도 체험 바로가기</button>
					    <button class="dirctBtn" onclick="window.open('/view/map/interactiveMapMain')">대화형 통계지도 바로가기</button>
                  	</div>
                  </div>
                </div>
				<div class="slideObj">
					<div class="bodyDiv">
						<h2 class='subTitle'>1) 지역 단위 선택하기</h2>
						<div class="imgWrap">
							<figure class="">
								<img class="" src="/sgis_edu/resource/images/mapExp/ex_01.png"
									alt="" />
							</figure>
						</div>
						<ul class="classExp">
							<li>통계지도 체험 서비스를 실행하면 위의 그림과 같이 서비스 첫 화면이 나타납니다.</li>
							<li>먼저 행정구역 단위를 선택해야 하는데, 우리는 대구광역시 <span class="accent">시군구</span> 단위의 통계지도를 만들 예정이므로 시군구를 선택합니다</li>
						</ul>
					</div>
				</div>
				
				<div class="slideObj">
					<div class="bodyDiv">
						<h2 class='subTitle'>2) 대상지역 선택하기</h2>
						<div class="imgWrap">
							<figure class="">
								<img class="" src="/sgis_edu/resource/images/mapExp/ex_02.png" alt="" />
							</figure>
						</div>
						<ul class="classExp">
							<li>시군구를 선택하면 위의 그림과 같이 전국지도에서 기본값인 서울특별시의 시군구 단위 지도가 보여집니다.</li>
							<li>여기서 우리가 만들려고 하는 지역으로 변경해야 합니다. 지역을 <span class="accent">대구광역시</span>로 변경해주세요.</li>
						</ul>
					</div>
				</div>
				
				<div class="slideObj">
					<div class="bodyDiv">
						<h2 class='subTitle'>3) 대상지역 파일 다운로드하기 </h2>
						<div class="imgWrap">
							<figure class="">
								<img class="" src="/sgis_edu/resource/images/mapExp/ex_03.png" alt="" />
							</figure>
						</div>
						<ul class="classExp">
							<li>지역을 대구광역시로 변경하면 위의 그림과 같이 대구광역시 시군구 단위의 지도화면이 보여집니다. 이제 각 지역에 통계값을 적용해 봅니다.</li>
							<li>지도화면 바로 왼쪽의 시군구 목록에 값을 직접 입력해도 되지만, 엑셀파일을 이용해서 해보겠습니다. <span class="accent">다운로드</span> 버튼을 클릭해주세요.</li>
						</ul>
					</div>
				</div>
				
				<div class="slideObj">
					<div class="bodyDiv">
						<h2 class='subTitle'>4) 대상지역 파일 다운로드하기 - 엑셀 선택</h2>
						<div class="imgWrap">
							<figure class="">
								<img class="" src="/sgis_edu/resource/images/mapExp/ex_04.png" alt="" />
							</figure>
						</div>
						<ul class="classExp">
							<li>다운로드 파일 유형을 선택하는 팝업창이 나옵니다. 여기서 <span class="accent"> 엑셀</span>을 선택해주세요.</li>
						</ul>
					</div>
				</div>
				
				<div class="slideObj">
					<div class="bodyDiv">
						<h2 class='subTitle'>5) 통계값 입력하기</h2>
						<div class="imgWrap">
							<figure class="">
								<img class="" src="/sgis_edu/resource/images/mapExp/ex_05.png"alt="" />
							</figure>
						</div>
						<ul class="classExp">
							<li>다운로드 받은 엑셀 파일을 열어보면 대구광역시 시군구목록과 각 시군구의 통계값을 입력할 수 있도록 구성되어 있습니다.</li>
							<li>통계값 입력 위치에 위의 그림과 같이 <span class="accent">숫자를 입력</span>하고 수정사항을 저장하세요. 위의 그림의 통계값은 실제 인구 통계값의 만단위 숫자입니다.</li>
						</ul>
					</div>
				</div>
				
				<div class="slideObj">
					<div class="bodyDiv">
						<h2 class='subTitle'>6) 파일 업로드하기</h2>
						<div class="imgWrap">
							<figure class="">
								<img class="" src="/sgis_edu/resource/images/mapExp/ex_06.png"alt="" />
							</figure>
						</div>
						<ul class="classExp">
							<li>이제 통계값을 입력한 엑셀파일을 업로드합니다. 먼저 등록방식에서 <span class="accent">파일업로드</span>를 선택합니다.</li>
							<li>이후 '내 컴퓨터 파일 찾기' 에서 <span class="accent">파일찾기</span> 버튼을 클릭하고, 이전 단계에서 저장한 엑셀파일을 선택해주세요.</li>
						</ul>
					</div>
				</div>
				
				<div class="slideObj">
					<div class="bodyDiv">
						<h2 class='subTitle'>7) 통계값 적용하기</h2>
						<div class="imgWrap">
							<figure class="">
								<img class="" src="/sgis_edu/resource/images/mapExp/ex_07.png" alt="" />
							</figure>
						</div>
						<ul class="classExp">
							<li>파일을 선택한 후 <span class="accent">데이터업로드</span> 버튼을 클릭하면 '데이터 입력정보' 영역에 통계값이 입력된 것을 볼 수 있습니다.</li> 
							<li>이제 지도화면에 입력된 통계값을 적용하겠습니다. <span class="accent">입력적용</span> 버튼을 클릭하세요.</li>
						</ul>
					</div>
				</div>
				
				<div class="slideObj">
					<div class="bodyDiv">
						<h2 class='subTitle'>8) 통계지도 생성하기</h2>
						<div class="imgWrap">
							<figure class="">
								<img class="" src="/sgis_edu/resource/images/mapExp/ex_08.png" alt="" />
							</figure>
						</div>
						<ul class="classExp">
							<li>위의 그림과 같이 기본적인 통계 색상지도가 만들어졌습니다. 현재 상태로도 충분히 통계지도 모습을 갖추고 있지만 여기에 배경지도를 추가해보겠습니다.</li>
							<li>지도화면 왼쪽의 설정 창은 <span class="accent">닫기</span> 버튼(◀ 모양)을 클릭해서 닫습니다. 그리고, 배경지도를 추가하기 위해 지도화면 우측 상단에 <span class="accent">지도</span> 아이콘을 클릭합니다.</li>
						</ul>
					</div>
				</div>
				
				<div class="slideObj">
					<div class="bodyDiv">
						<h2 class='subTitle'>9) 배경지도 선택하기</h2>
						<div class="imgWrap">
							<figure class="">
								<img class="" src="/sgis_edu/resource/images/mapExp/ex_09.png"alt="" />
							</figure>
						</div>
						<ul class="classExp">
							<li>지도 아이콘 클릭 후 나타나는 지도유형에서 <span class="accent">일반</span>을 선택해주세요. 그러면 위의 그림과 같이 통계지도에 배경지도가 적용됩니다.</li>
							<li>이 외에도 지도화면 우측의 여러 가지 옵션을 이용해서 통계지도를 다양하게 바꿀 수 있습니다. 그리고, 색상 패턴은 지도화면 좌측 하단의 범례창의 색상목록에서 변경할 수 있습니다.</li>
						</ul>
					</div>
				</div>
				
				<div class="slideObj">
					<div class="bodyDiv">
						<h2 class='subTitle'>10) 통계지도 꾸미기</h2>
						<div class="imgWrap">
							<figure class="">
								<img class="" src="/sgis_edu/resource/images/mapExp/ex_10.png" alt="" />
							</figure>
						</div>
						<ul class="classExp">
							<li>여러 가지 옵션을 이용해서 위의 그림과 같이 통계지도 모습을 바꿔보았습니다.</li> 
							<li>여러분들도 각자 원하는 형태로 통계지도 만들어보세요.</li>
						</ul>
					</div>
				</div>
			</div>
            <a class="btnPage02 prev">이전</a>
            <a class="btnPage02 next">다음</a>
            </div>
        </main>
    </div>
    
<script type="text/javascript">
var schoolGradeCd = '';  
makeSchoolGrade();
srvLogWrite('T0','02','05','02',schoolGradeCd,'ctgr=mapExp');

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