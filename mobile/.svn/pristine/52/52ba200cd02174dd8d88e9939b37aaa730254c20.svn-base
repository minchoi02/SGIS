<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>설정 및 알림</title>
<meta name="title" content="설정 및 알림">
	<style type="text/css">
		/* header footer 안씀 */
		body > div.Wrap > div.Header {display: none !important;}
		body > div.Wrap > div.Content > div.Footer {display: none !important;}
		
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
	<!-- 기본 js -->
	<script src="${ctx }/resources/m2019/js/login/loginSetupNotification.js"></script>
</head>
<body>
	<div class="Header" style="z-index: 2100;">
		<header id="headerArea">
			<div class="gnb">
				<button id="form_back" class="btn_forward2" type="button">이전</button>
				<h2>설정 및 알림</h2>
			</div>
		</header>
	</div>
	<div class="searchFormWrap" style="background-color: #F3F3F4;">
		<div class="sfbFooter">
			<button id="form_cancel" class="btn_reset" type="button">취소</button>
			<button id="form_submit" class="btn_search" type="button">설정완료</button>
		</div>
		<div class="searchFormBox" style="background-color: #F3F3F4; padding-top: 42px;">
			<div style="position: relative; width:100%; font-size: 1.4em; padding: 20px 15px 15px 40px; background: url('${ctx }/resources/m2019/images/icon_current_position.png') no-repeat left 15px top 20px; background-size: 1em;">사용자 위치 관리</div>
			<div style="width: 100%; height: 80px; background-color: #FFFFFF;">
				<div style="width:calc(100% - 100px); height: 100%; float: left;">
					<div style="width:100%;height: 60%;padding-top: 23px;padding-left: 20px;font-size: 1.6em;color:#000000;">사용자 위치동의</div>
					<div id="data1_text" style="width:100%;height: 40%;padding-top: 0px;padding-left: 20px;font-size: 1em;color:#2B69B3;">동의</div>
				</div>
				<div style="width:100px; height: 100%; float: left; padding: 23px 20px;">
					<label class="switch">
					  <input type="checkbox" id="data1">
					  <span class="slider round"></span>
					</label>
				</div>
			</div>
			<div style="position: relative; width:100%; font-size: 1.4em; padding: 20px 15px 15px 40px; background: url('${ctx }/resources/m2019/images/icon_push.png') no-repeat left 15px top 20px; background-size: 1em;">알림</div>
			<div style="width: 100%; height: 80px; background-color: #FFFFFF; margin-bottom: 3px;">
				<div style="width:calc(100% - 100px); height: 100%; float: left;">
					<div style="width:100%;height: 60%;padding-top: 23px;padding-left: 20px;font-size: 1.6em;color:#000000;">마감임박 알림메세지 창</div>
					<div id="data2_text" style="width:100%;height: 40%;padding-top: 0px;padding-left: 20px;font-size: 1em;color:#2B69B3;">동의</div>
				</div>
				<div style="width:100px; height: 100%; float: left; padding: 23px 20px;">
					<label class="switch">
					  <input type="checkbox" id="data2">
					  <span class="slider round"></span>
					</label>
				</div>
			</div>
			<div style="width: 100%; height: 80px; background-color: #FFFFFF;">
				<div style="width:calc(100% - 100px); height: 100%; float: left;">
					<div style="width:100%;height: 60%;padding-top: 23px;padding-left: 20px;font-size: 1.6em;color:#000000;">마감임박 알림뱃지</div>
					<div id="data3_text" style="width:100%;height: 40%;padding-top: 0px;padding-left: 20px;font-size: 1em;color:#2B69B3;">동의</div>
				</div>
				<div style="width:100px; height: 100%; float: left; padding: 23px 20px;">
					<label class="switch">
					  <input type="checkbox" id="data3">
					  <span class="slider round"></span>
					</label>
				</div>
			</div>
		</div>
	</div>
</body>
</html>