<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko"> 
<head>
<meta charset="utf-8" />  
<meta name="format-detection" content="telephone=no" /> 
<title>SGIS 공개강의실 동영상</title>
<link rel="stylesheet" type="text/css" href="/jsp/board/css/video.css"/>
<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
<script type="text/javascript" src="/jsp/board/js/video.js"></script> 
</head>
<body>
   <div class="wrapper">
   		<div style="margin: 20px 0px 0px 20px;font-weight: bold;color: white;">본 동영상은 통계교육원 열린교육방의 [공개강의실] 콘텐츠를 동영상으로 변환하여 제공하고 있습니다.
   		</div>
		<div class="content">
		  <div class="bgimg"> 
			<img src="/jsp/board/img/bgimg.png" alt="지도"/>
		  </div>
			<div class="left">
				<video id="video" style="width:680px; height:441px;" controls>
					<source src="/play/openEdu1.mp4" type="video/mp4">
				</video>
			</div>
			
			<div class="right"> 
					<div class="title">
						<div class="fl">	
							<div style="background-image: url('/jsp/board/img/subj.png'); width:370px; height:38px;"></div>
							<ul>
								<li id="li_1" title="- 통계지리정보소개">통계지리정보소개</li>
								<li id="li_2" title="- 통계지리정보 검색하기(대화형 통계지도)">통계지리정보 검색하기(대화형 통계지도)</li>
								<li id="li_3" title="- 대화형 통계지도 고급기능">대화형 통계지도 고급기능</li>
								<li id="li_4" title="- 통계주제도와 분석지도">통계주제도와 분석지도</li>
								<li id="li_5" title="- 통계지리정보 활용서비스">통계지리정보 활용서비스</li>
								<li id="li_6" title="- 자료제공 서비스">자료제공 서비스</li>
								<li id="li_7" title="- SGIS Open API 이용">SGIS Open API 이용</li>
							</ul>
						</div>
					</div>
			</div>
		</div>
	</div>
</body>
</html>