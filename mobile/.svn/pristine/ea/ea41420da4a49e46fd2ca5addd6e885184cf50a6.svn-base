<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>로그인 후 화면</title>
<meta name="title" content="로그인 후 화면">
	<style type="text/css">
		/* header footer 안씀 */
		.Header {display: none !important;}
		.Content {padding-top: 0px !important;}
		.Footer {display: none !important;}
		
		/* The switch - the box around the slider */
		.switch {
		  position: relative;
		  display: inline-block;
		  width: 60px;
		  height: 34px;
		}
		
		/* Hide default HTML checkbox */
		.switch input {
		  opacity: 0;
		  width: 0;
		  height: 0;
		}
		
		/* The slider */
		.slider {
		  position: absolute;
		  cursor: pointer;
		  top: 0;
		  left: 0;
		  right: 0;
		  bottom: 0;
		  background-color: #ccc;
		  -webkit-transition: .4s;
		  transition: .4s;
		}
		
		.slider:before {
		  position: absolute;
		  content: "";
		  height: 26px;
		  width: 26px;
		  left: 4px;
		  bottom: 4px;
		  background-color: white;
		  -webkit-transition: .4s;
		  transition: .4s;
		}
		
		input:checked + .slider {
		  background-color: #2B69B3;
		}
		
		input:focus + .slider {
		  box-shadow: 0 0 1px #2B69B3;
		}
		
		input:checked + .slider:before {
		  -webkit-transform: translateX(26px);
		  -ms-transform: translateX(26px);
		  transform: translateX(26px);
		}
		
		/* Rounded sliders */
		.slider.round {
		  border-radius: 34px;
		}
		
		.slider.round:before {
		  border-radius: 50%;
		}
	</style>
	<!-- 페이지 전역변수 -->
	<script type="text/javascript">
		var gv_return_page = "${params.returnPage}";
		var gv_full_context_path = "${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${ctx }";
	</script>
	<!-- 기본 js -->
	<script src="${ctx }/resources/m2019/js/login/loginInfoMap.js"></script>
	<script>
        if(sop.isLogin) srvLogWrite('M0','12','01','00','',''); // 사용자 정보 메인
	</script>
</head>
<body>
	<!-- 지도 영역 START -->
	<div class="MapArea" style="display: none;">
		<div class="Map">
			<div id="map"></div>
		</div>
	</div>
	<!-- 지도 영역 END -->
	
	<div class="myArea">
		<h3>내주변 일자리 찾기</h3>
		<button id="loginInfo_back" class="btn_menuClose" type="button">닫기</button>
		<div class="myName">
			<div class="myPhoto">
				<img src="${ctx }/resources/m2019/images/photo_hong.png">
			</div>
			<div id="loginInfo_name" class="nameText">${member_info.member_nm}</div>
		</div>
		<div class="myInfo">
			<ul>
				<li style="width: 35%; cursor: pointer;" id="loginInfo_count1">
					<div class="i_new" style="display: none;"></div>
					<p style="letter-spacing: -1px;">내주변 채용공고</p>
					<span class="count">-</span>
				</li>
				<li style="width: 35%; cursor: pointer;" id="loginInfo_count2">
					<div class="i_new" style="display: none;"></div>
					<p>맞춤 채용공고</p>
					<span class="count">-</span>
				</li>
				<li style="width: 30%; cursor: pointer;" id="loginInfo_count3">
					<div class="i_new" style="display: none;"></div>
					<p>마감임박</p>
					<span class="count">-</span>
				</li>
			</ul>
		</div>
	</div>
	<div class="myMenu">
		<ul>
			<%-- <li><a href="javascript:void(0);">회원정보수정</a></li>
			<li><a href="${ctx }/m2019/login/loginSetupNotification.sgis">설정 및 알림</a></li> --%>
			<li>
				<div style="width: 100%; height: 80px; background-color: #FFFFFF;">
					<div style="width:calc(100% - 100px); height: 100%; float: left;">
						<div style="width:100%;height: 60%;padding-top: 23px;padding-left: 20px;font-size: 1.4em; color: #666; font-weight: bold;">사용자 위치동의</div>
						<!-- 2019-09-26 [김남민] 모바일 > 로그인 후 화면 > 사용자 위치동의 문구 수정 '동의' => '미동의'. START -->
						<div id="lc_info_agree_yn_text" style="width:100%;height: 40%;padding-top: 0px;padding-left: 20px;font-size: 1em;color:#2B69B3;">미동의</div>
						<!-- 2019-09-26 [김남민] 모바일 > 로그인 후 화면 > 사용자 위치동의 문구 수정 '동의' => '미동의'. END -->
					</div>
					<div style="width:100px; height: 100%; float: left; padding: 23px 20px;">
						<label class="switch">
						  <input type="checkbox" id="lc_info_agree_yn">
						  <span class="slider round"></span>
						</label>
					</div>
				</div>
			</li>
			<li><a href="${ctx }/m2019/workroad/myNeighberhoodJobMap.sgis?list_gubun=A">맞춤형 채용공고 서비스 설정</a></li>
		</ul>
	</div>
	<div class="logout">
		<button id="loginInfo_logout" class="btn_logout" type="button">로그아웃</button>
	</div>
	<div class="copy">ⓒStatistics Korea. All rights reserved.</div>
</body>
</html>



