<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>SGIS 관리자사이트(CNM)</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<link rel="stylesheet" href='<c:url value="/html/include/css/login.css"/>'/>
	<link rel="stylesheet" href='<c:url value="/html/include/css/default.css"/>' />
	<link rel="stylesheet" href='<c:url value="/js/plugins/select2.css"/>'/>
	<link rel="stylesheet" href='<c:url value="/css/jquery-ui-1.10.4.custom.css"/>'/>
	<script type="text/javascript" src='<c:url value="/html/include/js/jquery-1.11.0.min.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/html/include/js/default.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/js/common/includeHead.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/js/common/common.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/js/common/jquery.form.min.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/js/common/ststistics.js"/>'></script>
	<script type="text/javascript" src='<c:url value="/js/plugins/select2.js"/>'></script>
	<!-- 2020년 SGIS고도화 3차 시작 -->
	<script type="text/javascript" src='<c:url value="/js/plugins/jquery-ui-1.10.3.custom.js"/>'></script>
	<link rel="stylesheet" href='<c:url value="/css/jquery-ui-1.10.4.custom.css"/>' />
	<script type="text/javascript" src='<c:url value="/js/plugins/jquery-ui-timepicker-addon.js"/>'></script>
	 <!-- HighChart -->
	<script type="text/javascript" src='<c:url value="/js/plugins/highcharts/highcharts.js"/>'></script>
	<!-- 2020년 SGIS고도화 3차 끝 -->
	<script>
		/* 2022-03-11 [이영호] 운영 Proxy 설정  Start */
		var proxyURL = '/s-portalcnm/api/proxy.do?';
		/* 2022-03-11 [이영호] 운영 Proxy 설정  End */
		/* 2022-03-11 [이영호] 개발 Proxy 설정  Start */
		//var proxyURL = '';
		/* 2022-03-11 [이영호] 개발 Proxy 설정  End */
		var pageContext = '${pageContext.request.contextPath}';
	</script>
	<script type="text/javascript" src='<c:url value="/js/common/escapeRegExp.js"/>'></script>
	<script>
		function ch2pattern(ch) {
			const offset = 44032; /* '가'의 코드 */
			// 한국어 음절
			if (/[가-힣]/.test(ch)) {
				const chCode = ch.charCodeAt(0) - offset;
				// 종성이 있으면 문자 그대로를 찾는다.
				if (chCode % 28 > 0) {
					return ch;
				}
				const begin = Math.floor(chCode / 28) * 28 + offset;
				const end = begin + 27;
				return "[\\u".concat(begin.toString(16), "-\\u").concat(end.toString(16), "]");
			}
			// 한글 자음
			if (/[ㄱ-ㅎ]/.test(ch)) {
				const con2syl = {
					'ㄱ': '가'.charCodeAt(0),
					'ㄲ': '까'.charCodeAt(0),
					'ㄴ': '나'.charCodeAt(0),
					'ㄷ': '다'.charCodeAt(0),
					'ㄸ': '따'.charCodeAt(0),
					'ㄹ': '라'.charCodeAt(0),
					'ㅁ': '마'.charCodeAt(0),
					'ㅂ': '바'.charCodeAt(0),
					'ㅃ': '빠'.charCodeAt(0),
					'ㅅ': '사'.charCodeAt(0)
				};
	    	    const _begin = con2syl[ch] || ( ( ch.charCodeAt(0) - 12613 /* 'ㅅ'의 코드 */ ) * 588 + con2syl['ㅅ'] );
	    	    const _end = _begin + 587;
	    	    return "[".concat(ch, "\\u").concat(_begin.toString(16), "-\\u").concat(_end.toString(16), "]");
			}
			// 그 외엔 그대로 내보냄
			// escapeRegExp는 lodash에서 가져옴
			return _.escapeRegExp(ch);
		}
	    
	    function createFuzzyMatcher(input) {
			const pattern = input.split('').map(ch2pattern).join('.*?');
			return new RegExp(pattern);
		}
	</script>