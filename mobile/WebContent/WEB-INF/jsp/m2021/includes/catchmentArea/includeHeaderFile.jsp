<%@page contentType="text/html; charset=UTF-8" %>
<%@include file="/WEB-INF/jsp/m2021/includes/taglib.jsp" %>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport"/>
<link rel="shortcut icon" href="${ctx }/resources/images/common/n_favicon.png">

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
	var sgis4thApiPath = "https://link.kostat.go.kr/view/kosisApi/TotsurvStatData.do?";
	//2022-02-04[이영호] 운영운영 또는 개발개발 사용시 Proxy 활용
	//var sgis4thApiPath = sgisContextPath+"/view/totSurv/proxy?https://link.kostat.go.kr/view/kosisApi/TotsurvStatData.do?";
	var contextPath = "/mobile";
</script>

<script src="${ctx }/resources/plugins/sop/mobile/sop-mobile.js"></script>
<link rel="stylesheet" href="${ctx }/resources/plugins/sop/mobile/sop.css" />
<link rel="stylesheet" href="${ctx }/resources/css/common.css" />
<link rel="stylesheet" href="${ctx }/resources/m2021/css/style.css" />
<%-- <%@include file="/WEB-INF/jsp/m2020/includes/includeHeaderFile.jsp" %> --%>
<script src="${ctx }/resources/plugins/jquery/jquery-1.12.0.min.js"></script>
<script src="${ctx }/resources/plugins/jquery/jquery-migrate-1.2.1.min.js"></script>
<script src="${ctx }/resources/plugins/jquery.sha256.js"></script>
<script src="${ctx }/resources/plugins/durian-v2.0.js"></script>
<script src="${ctx }/resources/js/common/sop.portal.absAPI.js"></script>
<script src="${ctx }/resources/js/common/common.js"></script>
<script src="${ctx }/resources/m2021/js/common/catchmentArea/common.js"></script>
<script src="${ctx }/resources/m2021/js/catchmentArea/plugin/swiper.min.js"></script>

<script src="${ctx }/resources/plugins/jquery-ui-1.12.0.custom/jquery-ui.min.js"></script>
<script src="${ctx }/resources/plugins/jquery-ui-1.12.0.custom/jquery-ui.js"></script>
<script src="${ctx }/resources/plugins/jquery.ui.touch-punch.min.js"></script>
<script>$.widget.bridge('uitooltip', $.ui.tooltip);</script>
<script src="${ctx }/resources/plugins/bootstrap/tooltip/bootstrap-tooltip.min.js"></script>
<link rel="stylesheet" href="${ctx }/resources/plugins/bootstrap/tooltip/bootstrap-tooltip.min.css">
<script src="${ctx }/resources/plugins/colorpicker/js/colpick.js"></script>
<script src="${ctx }/resources/plugins/colorpicker/js/jquery.wheelcolorpicker.js"></script>
<script src="${ctx }/resources/plugins/colorpicker/js/jquery.xcolor.js"></script>
<script src="${ctx }/resources/plugins/highcharts/highcharts.js"></script>
<script src="${ctx }/resources/plugins/highcharts/highcharts-more.js"></script>
<%-- <script src="${ctx }/resources/m2020/js/common/map/map.js"></script>
 --%>
<script src="${ctx }/resources/m2021/js/common/catchmentArea/map/map.js"></script>
<script src="${ctx }/resources/js/common/censusApi.js"></script>
<script src="${ctx }/resources/m2021/js/common/catchmentArea/map/legendInfo.js"></script>
<script src="${ctx }/resources/js/common/mapNavigation.js"></script>
<script src="${ctx }/resources/m2021/js/common/heum.js"></script>
<script src="${ctx }/resources/js/common/chart.js"></script>
<script src="${ctx }/resources/m2021/js/menu.js"></script>
<!-- <script src="${ctx }/resources/js/common/poi.js"></script>  -->
<script src="${ctx }/resources/m2021/js/common/catchmentArea/poi.js"></script> <!-- POI 추가 20200717 박은식 -->



<script>
sop.isLogin = ${loggedIn};
<c:if test="${loggedIn}">
	sop.member_id = "${loginUsername}";
</c:if>
var csrf_name = "${_csrf.parameterName }";
var csrf_token = "${_csrf.token}";
var documentId = "sgis-"+uuid();
var sgisServiceApiRegexp = new RegExp("^"+sgisContextPath+"/ServiceAPI/");

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



