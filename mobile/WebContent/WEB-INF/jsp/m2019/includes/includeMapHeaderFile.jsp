<%@page contentType="text/html; charset=UTF-8" %>
<!-- 운영 -->
<!-- 
<script>var tilePath = "https://sgisapi.kostat.go.kr";</script>
 -->
<!-- 2019-09-10 [김남민] 모바일 > 지도 공통 > 청사 운영소스 sop-mobile.js 에서 contextPath 사용이 추가되어서 맞춰서 수정함 START -->
<script>var contextPath = "${ctx}";var tilePath = "https://sgisapi.kostat.go.kr";</script>
<!-- 2019-09-10 [김남민] 모바일 > 지도 공통 > 청사 운영소스 sop-mobile.js 에서 contextPath 사용이 추가되어서 맞춰서 수정함 END -->
<!-- 로컬
 -->

<script src="${ctx }/resources/plugins/sop/mobile/sop-mobile.js"></script>
<link rel="stylesheet" href="${ctx }/resources/plugins/sop/mobile/sop.css" />
<%@include file="/WEB-INF/jsp/m2019/includes/includeHeaderFile.jsp" %>
<link rel="stylesheet" href="${ctx }/resources/plugins/colorpicker/css/colpick.css">
<link rel="stylesheet" href="${ctx }/resources/plugins/colorpicker/css/wheelcolorpicker.css">
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
<script src="${ctx }/resources/js/common/chart.js"></script>
<script src="${ctx }/resources/js/common/map.js"></script>
<script src="${ctx }/resources/js/common/censusApi.js"></script>
<script src="${ctx }/resources/js/common/legendInfo.js"></script>
<script src="${ctx }/resources/js/common/mapNavigation.js"></script>
<script src="${ctx }/resources/js/common/chart.js"></script>
<script src="${ctx }/resources/js/common/poi.js"></script>
<link rel="stylesheet" href="${ctx }/resources/css/map/map.css" />


