<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/gsks/include/header.jsp" %>

<script type="text/javascript" src="./../scripts/main/jquery-1.5.1.min.js"></script>
<script type="text/javascript" src="/s-portalcnm/js/plugins/highcharts/highcharts.js"></script>

<script type="text/javascript">

srvLogWrite("L0", "03", "07", "08", "", "");

function jo_year() {
	srvLogWrite("L0", "03", "07", "09", "", "");
	if ( jQuery('#retrieve_year').val() == "" ) {
		alert("년도를 입력하세요.(예: 2014)");
		return false;
	}
	
	jQuery.ajax({
		type:"POST",
		url:"gsks_01_04_05_excel.jsp",
		data:{"what_year": jQuery('#retrieve_year').val() },
		success:function(data){
			//alert("조회가 완료되었습니다.");
			jQuery('#result').html(data);
		},
		error:function(data) {
			
		}
	});
	
}

function jo_month() {
	srvLogWrite("L0", "03", "07", "10", "", "");
	if ( jQuery('#retrieve_month').val() == "" ) {
		alert("년도월을 입력하세요.(예: 201405)");
		return false;
	}
	
	var year_month= jQuery('#retrieve_month').val();
	year_month = year_month.substr(0,4) + "-" + year_month.substr(4,2);
	jQuery.ajax({
		type:"POST",
		url:"gsks_01_04_05_excel.jsp",
		data:{"what_year": year_month },
		success:function(data){
			//alert("조회가 완료되었습니다.");
			jQuery('#result').html(data);
		},
		error:function(data) {
			
		}
	});
	
}

function jo_yearAnalysis() {
	srvLogWrite("L0", "03", "07", "12", "", "");
	if ( jQuery('#retrieve_year').val() == "" ) {
		alert("년도를 입력하세요.(예: 2014)");
		jQuery('#retrieve_year').focus();
		return false;
	}
	
	jQuery.ajax({
		type:"POST",
		url:"gsks_01_04_05_analysis.jsp",
		data:{"what_year": jQuery('#retrieve_year').val() },
		success:function(data){
			//alert("조회가 완료되었습니다.");
			jQuery('#result').html(data);
		},
		error:function(data) {
			
		}
	});
	
}

</script>

<form name="censusFm" method="post">
     	
	<!-- cls:header end -->
	<div class="contents">
		<!-- cls:left start -->
		<div class="lefitMenuWrapper">
			<div class="leftTitle">서비스관리</div>
			<div class="leftMenu">
				<ul>
					<li><a href="./../DT/policyMapManager.html">정책통계지도</a></li>
					<li><a href="../../html/DT/themaMapManage.html">주제도</a>
					<li><a href="../../html/DT/Community.html">통계 커뮤니티맵</a></li>	
					<li><a href="../../html/DT/KOSISManage.html">KOSIS목록 관리</a></li>
					<li><a href="../../html/DT/PUBDataManage.html">공공데이터 관리</a></li>
					<li><a href="../../html/DT/BannerManage.html">배너관리</a></li>
					<li><a class="on">자료제공 관리</a>
						<ul class="sub">
							<li><a href="/s-portalcnm/contents/gsks/gsks_01_04.jsp">요청목록</a></li>
							<!-- <li><a href="/s-portalcnm/contents/gsks/gsks_01_04_01.jsp">자료제공</a></li> --><!-- mng_s 20220324사용하지않는 기능인데 쿼리가 오려걸려 주석처리함  -->
							<li><a href="/s-portalcnm/contents/gsks/gsks_01_04_05.jsp" class="on">자료제공 현황</a></li>
							<li><a href="/s-portalcnm/contents/gsks/gsks_01_04_06.jsp">결제관리</a></li>
							<li><a href="/s-portalcnm/ststistics/ststisticsUSProvideDataMng.do">자료제공서비스 자동화</a></li><!-- SGIS_4 자료제공서비스 자동화 추가 -->
							<li><a href="/s-portalcnm/ststistics/ststisticsUSGridInfo.do">격자자료 제공서비스 자동화</a></li><!-- SGIS_4 자료제공서비스 자동화 추가 -->
						</ul>
					</li>
					<li><a href="../../html/DT/Gallerylist.html">통계갤러리 관리</a></li>	
					<li><a href="../../html/DT/MobileManage.html">모바일 서비스 관리</a></li>
				</ul>
			</div>
		</div>
		<!-- cls:left end -->
		
		<div class="acticle">
			<div class="location">
				<p>
					<a href="#"><img src="/s-portalcnm/html/include/img/ico/ico_home.png" alt="home"/></a>
					<span><img src="/s-portalcnm/html/include/img/ico/ico_navi.png" alt="다음" /></span> 
					<span>서비스관리</span>
					<span><img src="/s-portalcnm/html/include/img/ico/ico_navi.png" alt="다음" /></span>
					<span class="fontS"> 자료제공 관리</span>
				</p>
			</div>
			
			<p class="title01">자료제공 현황</p>
			<br>

			<table class="popupTable05" summary="" style="width:720px; cellpadding:0px; cellspacing:0px; margin-left:10px;">
				<tr bgcolor="#FFFFFF">
					<th class="td_top" align="left" width="150px">연도별 엑셀다운로드 </th>
					<td class="td_top td_end">
						<input type="text" id="retrieve_year" name="retrieve_year" value="" class="inp w30 bg_g" maxlength="4"/>
						<a href="#" target="_blank" onclick="javascript:jo_year(); return false;">
			            	<img src="images/buton_data_search.gif" alt="자료조회"  title="자료조회" height="20px" align="middle" border="0" />
			            </a>
					</td>
				</tr>
				<tr bgcolor="#FFFFFF">
					<th align="left">월별 엑셀다운로드</th>
					<td class="td_end">
						<input type="text" id="retrieve_month" name="retrieve_month" value="" class="inp w30 bg_g" maxlength="6" />
						<a href="#" target="_blank" onclick="javascript:jo_month(); return false;">
			                <img src="images/buton_data_search.gif" alt="자료조회"  title="자료조회"  height="20px" align="middle" border="0" />
			            </a>
					</td>
				</tr>
			</table>
			
			
			<a href="#" target="_blank" onclick="javascript:jo_yearAnalysis(); return false;" style="float:right; margin-top: 10px; margin-right: 14px;">
				<img src="images/btn_analysis.png" alt="현황분석"  title="현황분석" />
			</a>
			
			<input type="hidden" id="excel_down" name="excel_down" />
			<span id='result'></span>
			<div class="clear"></div>
		</div>	
	</div>
</form>

<div class="clear"></div>
<div class="clear"></div>
</div>

<!-- cls:footer start -->
<div class="footerWrapper" id="gsksFooterWrapper"></div>
	
</body>
</html>