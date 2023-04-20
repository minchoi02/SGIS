<%@page contentType="text/html; charset=UTF-8" %>
<%@include file="/WEB-INF/jsp/m2020/includes/taglib.jsp" %>

<!-- mng_s 20201120 이진호 -->
<!-- W3C 웹 표준 수정 -->
<!-- <meta charset="utf-8"> -->
<!-- mng_e 20201120 이진호 -->

<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport"/>
<link rel="shortcut icon" href="${ctx }/resources/m2020/images/common/n_favicon.png"/>
<link rel="stylesheet" href="${ctx }/resources/m2020/css/common.css"/>
<link rel="stylesheet" href="${ctx }/resources/m2020/css/main.css"/>
<link rel="stylesheet" href="${ctx }/resources/m2020/css/style.css"/>
<link rel="stylesheet" href="${ctx }/resources/m2020/css/swiper.min.css"/>
<!-- 알림마당 css 추가  start-->
<link rel="stylesheet" href="${ctx }/resources/m2020/css/board.css"/>
<link rel="stylesheet" href="${ctx }/resources/m2021/css/menu.css"/>
<!-- 알림마당 css 추가 end -->
<script src="${ctx }/resources/plugins/jquery/jquery-1.12.0.min.js"></script>
<script src="${ctx }/resources/plugins/jquery/jquery-migrate-1.2.1.min.js"></script>
<script src="${ctx }/resources/plugins/jquery.sha256.js"></script>
<script src="${ctx }/resources/plugins/durian-v2.0.js"></script>
<script src="${ctx }/resources/js/common/sop.portal.absAPI.js"></script>
<script src="${ctx }/resources/js/common/common.js"></script>
<script src="${ctx }/resources/m2020/js/common/common.js"></script>
<script src="${ctx }/resources/m2020/js/swiper.min.js"></script>
<script>
sop.isLogin = ${loggedIn};
<c:if test="${loggedIn}">
	sop.member_id = "${loginUsername}";
</c:if>
var contextPath = "${ctx}";//mobile 사이트 context
//var contextPath = "https://sgisapi.kostat.go.kr";//mobile 사이트 context
/* var sgisContextPath = "";//desktop 사이트 context */
//var sgisContextPath = "//sgis.neighbor21.co.kr:8080"; //desktop 사이트 context
//var sgisContextPath = "http://sgissmart.iptime.org:9090";
//var sgisContextPath = "https://sgis.kostat.go.kr";
//var sgisContextPath = "http://sgissmart.iptime.org:9099";	// 2020.03.31[한광희] 운영 반영 금지
var sgisContextPath = "";	// 2020.03.31[한광희] 운영 반영 금지

var csrf_name = "${_csrf.parameterName }";
var csrf_token = "${_csrf.token}";
var documentId = "sgis-"+uuid();
var sgisServiceApiRegexp = new RegExp("^"+sgisContextPath+"/ServiceAPI/")
$.ajaxSetup({
	beforeSend: function(xhr, settings) {
		var csrfSafeMethod = function(method) {
			return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
		}
		if (!sgisServiceApiRegexp.test(settings.url)&&!csrfSafeMethod(settings.type) && !this.crossDomain) {
			xhr.setRequestHeader("_csrf", "${_csrf.token}");
			if(settings.data){
				if(settings.data instanceof FormData){
					xhr.setRequestHeader("X-CSRF-TOKEN", csrf_token);
				}else{
					if(settings.data.indexOf(csrf_name+"=")==-1){
						settings.data+="&"+csrf_name+"="+csrf_token;
					}
				}
			}else{
				settings.data+=csrf_name+"="+csrf_token;
			}
		}
	},
	error: function(xhr, status,  errorThrown){
		$(".loading-"+documentId).remove();
	}
});
</script>