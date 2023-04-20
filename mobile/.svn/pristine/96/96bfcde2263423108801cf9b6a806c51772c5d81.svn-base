<%@page contentType="text/html; charset=UTF-8" %>
<%@include file="/WEB-INF/jsp/m2020/includes/taglib.jsp" %>

<!-- mng_s 20201120 이진호 -->
<!-- W3C 웹 표준 수정 -->
<!-- <meta charset="utf-8"> -->
<!-- mng_e 20201120 이진호 -->
<script>
	var contextPath = "${ctx}";
	var tilePath = "https://sgisapi.kostat.go.kr";
	//var contextPath = "https://sgisapi.kostat.go.kr";//mobile 사이트 context
	/* var sgisContextPath = "";//desktop 사이트 context */
	//var sgisContextPath = "//sgis.neighbor21.co.kr:8080"; //desktop 사이트 context
	//var sgisContextPath = "http://sgissmart.iptime.org:9090";
	//var sgisContextPath = "https://sgis.kostat.go.kr";
	//var sgisContextPath = "http://sgissmart.iptime.org:9099";	// 2020.03.31[한광희] 운영 반영 금지
	var sgisContextPath = "";	// 2020.03.31[한광희] 운영 반영 금지
	//2022-02-04[이영호] 운영개발 반영시 Porxy 제거
	//var sgis4thApiPath = "https://link.kostat.go.kr/view/kosisApi/TotsurvStatData.do?";
	//2022-02-04[이영호] 운영운영 또는 개발개발 사용시 Proxy 활용
	var sgis4thApiPath = sgisContextPath+"/view/totSurv/proxy?http://link.kostat.go.kr/view/kosisApi/TotsurvStatData.do?";
</script>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes" name="viewport"/>
<link rel="shortcut icon" href="${ctx }/resources/m2021/img/n_favicon.png"/>
<link rel="stylesheet" href="${ctx }/resources/m2021/css/swiper.css" />
<link rel="stylesheet" href="${ctx }/resources/m2021/css/slick.css" />
<link rel="stylesheet" href="${ctx }/resources/m2021/css/style.css" />
<link rel="stylesheet" href="${ctx }/resources/m2021/css/main.css" /> <!-- 메인 -->
<link rel="stylesheet" href="${ctx }/resources/m2021/css/map.css" /> <!-- 생활권역 -->
<link rel="stylesheet" href="${ctx }/resources/m2021/css/dashboard.css" /> <!-- 총조사 시각화 지도 -->
<link rel="stylesheet" href="${ctx }/resources/m2021/css/administration.css" /> <!-- 행정통계 -->
<link rel="stylesheet" href="${ctx }/resources/m2021/css/swiper.min.css" />
<!-- 알림마당 css 추가  start-->
<link rel="stylesheet" href="${ctx }/resources/m2020/css/board.css"/>
<!-- 알림마당 css 추가 end -->
<script src="${ctx }/resources/plugins/jquery/jquery-1.12.0.min.js"></script>
<script src="${ctx }/resources/plugins/jquery/jquery-migrate-1.2.1.min.js"></script>
<script src="${ctx }/resources/plugins/jquery.sha256.js"></script>
<script src="${ctx }/resources/plugins/durian-v2.0.js"></script>
<script src="${ctx }/resources/js/common/sop.portal.absAPI.js"></script>
<script src="${ctx }/resources/js/common/common.js"></script>
<script>
sop.isLogin = ${loggedIn};
<c:if test="${loggedIn}">
	sop.member_id = "${loginUsername}";
</c:if>

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
<script src="${ctx }/resources/m2021/js/common/common.js"></script>
<script src="${ctx }/resources/m2021/plugins/swiper.min.js"></script>
<script src="${ctx }/resources/m2021/js/common/heum.js"></script>
<script src="${ctx }/resources/m2021/plugins/d3.min.js"></script>
<script src="${ctx }/resources/m2021/js/chart.js"></script>
<script src="${ctx }/resources/m2021/js/menu.js"></script>
<script>
	common_loading(true);
</script>
<style>
.nav{
	z-index:1001;
}
.dashboard__box{
	position: relative;
}
.dashboard-layer {
	top: calc(50% - 45px);
}
.chart-tab{
	text-align: center;
	margin-top:10px;
}
.chart-tab a{
	color:#333;
	margin:0 5px;
}
.chart-tab a.active{
	color:blue;
}
.legend-container{
	text-align: center;
}
.legend-container .legend-box .legend-box{
	width: 10px;
	height: 10px;
	display: inline-block;
}
.legend-container .legend-box .legend-label{
	font-weight: 600;
	margin-left: 5px;
	font-size: 12px;
	white-space: nowrap;
}
.legend-container .legend-box .legend-value {
	margin-left: 8px;
	color: #627182;
	font-size: 12px;
}
.legend-container .legend-box .legend-box.male{
	background-color: #21AEF1;
}
.legend-container .legend-box .legend-label.male{
	color: #21AEF1;
}

.legend-container .legend-box .legend-box.female{
	background-color: #FE5959;
}
.legend-container .legend-box .legend-label.female{
	color: #FE5959;
}
*{word-break:keep-all}
</style>
