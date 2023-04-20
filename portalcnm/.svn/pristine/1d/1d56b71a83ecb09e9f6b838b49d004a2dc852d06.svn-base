<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>
<%
	GeneralBroker broker = null;
	RecordModel rm = null;
	
	String r_sgis_census_id = "";
	String r_sgis_census_name = "";
%>
<html>
	<%@ include file="/contents/gsks/include/header.jsp" %>

	<script language=javascript src="/s-portalcnm/contents/scripts/prototype.js"></script>
	<script type="text/javascript" src="/s-portalcnm/html/include/js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" language="javascript">
		$(document).ready(function() {
			srvLogWrite("L0", "03", "07", "17", "", "");
			$('button[id=createBtn]').click(function() {
				srvLogWrite("L0", "03", "07", "18", "", "");
				if($('input:radio[name=sgis_census_id]:checked').val() == "" || $('input:radio[name=sgis_census_id]:checked').val() == undefined) {
					alert("자료구분을 선택하세요.");
					return false;
				}
				else if($('input:radio[name=sgis_census_data_id]:checked').val() == "" || $('input:radio[name=sgis_census_data_id]:checked').val() == undefined) {
					alert("대상자료명을 선택하세요.");
					return false;
				}
				else if($('#sgis_census_year1').val() == "") {
					alert("년도를 선택하세요.");
					return false;
				}
				else if($('input:radio[name=sgis_census_id]:checked').val() == "1" && $('input:checkbox[name=sgis_census_detail_data_id]:checked').length < 1) {
					alert("세부자료명을 선택하세요.");
					return false;
				}
				else if($('#sgis_census_sido1').val() == "") {
					alert("시도를 선택하세요.");
					return false;
				}
				else if($('#sgis_census_sigungu1').val() == "") {
					alert("시군구를 선택하세요.");
					return false;
				}
				else if(confirm('자료를 생성 하시겠습니까?')) {
					$('.wrap-loading').css("display", "block");
					var arrParam = "";
					$("input[name='sgis_census_detail_data_id']:checked").each(function(i, v) {
						//debugger;// 2019년반영
						arrParam += $(this).val();
						if($("input[name='sgis_census_detail_data_id']:checked").length - 1 != i) arrParam += ",";
					});
					// 2019년반영 시작
					setTimeout(function() {
						$.ajax({
							type : 'POST',
							url : '/s-portalcnm/ServiceAPI/Common/newMakeZipFile.json',
							async : false,
							data : {
								"SGIS_CENSUS_ID" : $('input:radio[name=sgis_census_id]:checked').val(),
								"SGIS_CENSUS_DATA_ID" : $('input:radio[name=sgis_census_data_id]:checked').val(),
								"SGIS_CENSUS_YEAR" : $('#sgis_census_year1').val(),
								"SGIS_CENSUS_DETAIL_DATA_ID" : arrParam,
								"SGIS_CENSUS_SIDO" : $('#sgis_census_sido1').val(),
								"SGIS_CENSUS_SIGUNGU" : $('#sgis_census_sigungu1').val(),
								"CENSUS_OUTPUT_AREA_YEAR" : $('#census_output_area_year').val()
							
							},
							success : function(data) {
								$('.wrap-loading').css("display", "none");
							},
							error : function() {}
						});
					},200);
					// 2019년반영 끝
				}
				else {
					
				}
			});
			// 2019년반영 시작
			$('.createAllBtn').click(function() {
				if($('input:radio[name=sgis_census_id]:checked').val() == "" || $('input:radio[name=sgis_census_id]:checked').val() == undefined) {
					alert("자료구분을 선택하세요.");
					return false;
				}
				else if($('input:radio[name=sgis_census_data_id]:checked').val() == "" || $('input:radio[name=sgis_census_data_id]:checked').val() == undefined) {
					alert("대상자료명을 선택하세요.");
					return false;
				}
				else if(confirm('자료를 생성 하시겠습니까?')) {
					$('.wrap-loading').css("display", "block");
					var arrParam = "";
					$("input[name='sgis_census_detail_data_id']:checked").each(function(i, v) {
						arrParam += $(this).val();
						if($("input[name='sgis_census_detail_data_id']:checked").length - 1 != i) arrParam += ",";
					});
					setTimeout(function() {
						$.ajax({
							type : 'POST',
							url : '/s-portalcnm/ServiceAPI/Common/allMakeZipFile.json',
							async : false,
							data : {
								"SGIS_CENSUS_ID" : $('input:radio[name=sgis_census_id]:checked').val(),
								"SGIS_CENSUS_DATA_ID" : $('input:radio[name=sgis_census_data_id]:checked').val(),
								//"SGIS_CENSUS_YEAR" : $('#sgis_census_year1').val(),
								//"SGIS_CENSUS_DETAIL_DATA_ID" : arrParam,
								"CENSUS_OUTPUT_AREA_YEAR" : $('#census_output_area_year').val()
							
							},
							success : function(data) {
								$('.wrap-loading').css("display", "none");
							},
							error : function() {}
						});
					},200);
				}
			});
			// 2019년반영 끝
		});
		
		function selectDetailData2(val, val2, val3, val4) {
			jQuery.ajax({
				type: "POST",
				url: "gsks_01_08_data.jsp",
				data: {
					"sgis_census_id": $('input:radio[name='+val2+']:checked').val(),
					"sgis_census_data_name": val,
					"sgis_census_year": val3,
					"sgis_census_data_id": val4
				},
				success:function(data){
					$('#option_data').html(data);
				},
				error:function(data) {}
			});
			
			$("#option_year").empty();
			$("#option_detail_data").empty();
			$("#option_sido").empty();
			$("#option_sigungu").empty();
			
			$("#option_year").attr("class", "");
			$('#option_sido').attr("class", "");
			$('#option_sigungu').attr("class", "");
		}
	</script>
	
	<style>
		.wrap-loading{z-index:1;}/************************************************2019년반영*/
		.table-type{position:relative;width:100%;border-top:1px solid #213967;}
		.table-type .required{position:absolute;right:0;top:-40px;font-size:13px;color:#555;padding:0;}
		.table-type .required em{color:#ed1a1a;font-family:'Nanum Gothic Blod';font-style:normal;vertical-align:middle;font-size:15px;}
		
		.table-type{margin-bottom:45px;}
		.table-style{border-bottom:1px solid #e0e0e0;width:100%;}
		.table-style th{line-height:130%;padding:13px 0 12px;font-style:normal;background-color:#f6f7f8;font-family:'Nanum Gothic Bold';text-align:center;color:#777;font-size:14px;}
		.table-style td{line-height:160%;min-height:25px;height:25px;padding:10px 15px;color:#555;font-size:14px;}
		.table-style.type02 .coment{line-height:120%;font-size:12px;font-style:normal;color:#5e83b9;}
		.table-style.type02 .block{display:block;}
		.table-style.type02 tr + tr th,
		.table-style.type02 tr + tr td{border-top:1px solid #d6d6d6;}
		.table-style.type02 tbody tr th em{font-weight:bold;color:#e40000;padding-left:5px;}
		.table-style.type02 tbody tr td{font-family:'Nanum Gothic';border-left:1px solid #d6d6d6;}
		.table-style.type02 tbody tr td fieldset{padding:4px 5px}
		.table-style.type02 tbody tr td textarea{height:83px;width:100%;box-sizing:border-box;padding:5px;border:1px solid #d1d4d7;background:#fff;resize:none;-webkit-appearance:none;color:#555;}
		.table-style.type02 tbody tr td input[type=text]{width:100%;padding:0 5px;height:32px;box-sizing:border-box;border:1px solid #d1d4d7;line-height:30px;color:#555;}
		.table-style.type02 + h2{margin-top:45px;}
		.table-style.type02 + h2 > em{font-style:normal;color:#555;font-size:20px;}
		.table-style.type02 td ul > li{line-height:160%;}
		.table-style.type02 td ul > li:nth-of-type(2){padding-top:5px;}
		.table-style.type02 td ul > li span{display:block;}
		.table-style.type02 td  ul > li strong{color:#356fc5}
		
		/* radio */
		.radio-area{position:relative;display:inline-block!important;}
		.radio-area .radio + label{padding-left:23px;text-indent:0;padding-top:1px\9;line-height:1.3\9;}
		.radio-area label{width:120px;display:inline-block;padding-left:5px;line-height:20px;vertical-align:middle;}
		.radio{position:absolute;left:-999px;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;}
		.radio + label{position:relative;display:inline-block;min-width:15px;text-indent:-999px;font-size:13px;font-family:'Nanum Gothic';letter-spacing:-1px;vertical-align:middle;line-height:17px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;color:#666;}
		.radio + label:before{background:url(images/ico_radio.png)no-repeat;}
		.radio[type="radio"]:checked + label:before{background:url(images/ico_radio_on.png)no-repeat;}
		.radio + label:before{position:absolute;top:0;left:0;content:'';width:18px;height:18px;}
		
		/* select */
		.select-wrap{display:inline-block;vertical-align:baseline;position:relative;z-index:1;height:32px;box-sizing:border-box;background:#fff url(images/search_arr.png) no-repeat 95% 50%;border:1px solid #d1d4d7;}
		.select-wrap.focus{outline:1px solid #6470b7}
		.select-wrap select{font-size:14px;cursor:pointer;display:inline-block;background:transparent!important;padding-right:5px;min-width:100px;width:100%;height:100%;color:#555;border:0;-webkit-appearance:none;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0.8)";filter:alpha(opacity=0.8);opacity:0.8;padding-left:5px;font-family:'Nanum Gothic';}
		
		/* radio, label */
		.check-area li > label{width:130px;}
		.check-area:first-child{margin-left:0}
		.check-area{position:relative;display:inline-block!important;}
		.check-area .check + label{padding-left:26px;text-indent:0;padding-top:1px\9;line-height:1.3\9;}
		.check-area label{width:125px;display:inline-block;padding-left:5px;line-height:20px;vertical-align:middle;}
		.check{position:absolute;left:-999px;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}
		.check + label{position:relative;display:inline-block;min-width:15px;text-indent:-999px;font-size:13px;font-family:'Nanum Gothic';letter-spacing:-1px;vertical-align:middle;line-height:17px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;color:#666;}
		.check + label:before{position:absolute;top:0;left:0;content:'';width:18px;height:17px}
		.check + label:before{background-position:0 0}
		.check[type="checkbox"]:checked + label:before{background-position:-20px 0}
		.check + label:before{display:inline-block;vertical-align:middle;background:url(images/btn_bg.png)no-repeat #fff;}
		.chek-right{width:510px;display:inline-block;float:right;vertical-align:top;}
		.all-check{display:inline-block;line-height:120%;width:80px;}
		.all-check span > label{padding-left:5px;}
		.check-area-all li > label{width:130px;}
		.check-area-all:first-child{margin-left:0}
		.check-area-all{position:relative;display:inline-block!important;}
		.check-area-all .check + label{padding-left:26px;text-indent:0;padding-top:1px\9;line-height:1.3\9;}
		.check-area-all label{width:70px;display:inline-block;padding-left:5px;line-height:20px;vertical-align:middle;}
		
		.btn-area{position:relative;text-align:center;margin-bottom:45px;}
		.btn-area button{display:inline-block;border-radius:3px;border:1px solid transparent;color:#fff;box-sizing:border-box;min-width:90px;display:inline-block;cursor:pointer;}
		.btn-area button span{box-sizing:border-box;display:block;border:1px solid transparent;font-size:15px;text-shadow:none!important;vertical-align:middle;text-align:center;transition:background 0.3s;height:42px;line-height:42px;}
		.btn-area .default-color{background-color:#356fc5;}
	</style>

	<body>
		<!-- cls:header end -->
		<div class="contents">
			<!-- cls:left start -->
			<div class="lefitMenuWrapper">
				<div class="leftTitle">서비스관리</div>
				<div class="leftMenu">
					<ul>
						<li><a href="../../html/DT/themaMapManage.html">주제도</a>
						<li><a href="./../DT/Community.html">통계 커뮤니티맵</a></li>	
						<li><a href="../../html/DT/KOSISManage.html">KOSIS목록 관리</a></li>
						<li><a href="../../html/DT/PUBDataManage.html">공공데이터 관리</a></li>
						<li><a href="./../DT/BannerManage.html">배너관리</a></li>
						<li><a class="on">자료제공 관리</a>
							<ul class="sub">
								<li><a href="/s-portalcnm/contents/gsks/gsks_01_04.jsp" class="on">요청목록</a></li>
								<!-- <li><a href="/s-portalcnm/contents/gsks/gsks_01_04_01.jsp">자료제공</a></li> --><!-- mng_s 20220324사용하지않는 기능인데 쿼리가 오려걸려 주석처리함  -->
								<li><a href="/s-portalcnm/contents/gsks/gsks_01_04_05.jsp">자료제공 현황</a></li>
								<li><a href="/s-portalcnm/contents/gsks/gsks_01_04_06.jsp">결제관리</a></li>
								<li><a href="/s-portalcnm/contents/gsks/gsks_01_08.jsp">실시간 자료 관리</a></li>
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
						<a href="#"><img src="/s-portalcnm/html/include/img/ico/ico_home.png"alt="home" /></a>
						<span><img src="/s-portalcnm/html/include/img/ico/ico_navi.png" alt="다음" /></span> <span>서비스관리</span>
						<span><img src="/s-portalcnm/html/include/img/ico/ico_navi.png" alt="다음" /></span>
						<span class="fontS"> 자료제공 관리</span>
					</p>
				</div>
				<p class="title01">실시간 자료 관리</p>
				<br />
				<div class="table-type">
					<form id="censusFm_id" name="censusFm" method="post">
						<input type="hidden" name="sgis_census_req_id" value="" />
						<!-- ============  신규 데이터 추가시 해당 기준년도를 여기서 바꾸어 주어야 한다.  ============ -->
						<input type="hidden" id="census_output_area_year" name="census_output_area_year" value="2019" /><!------------------------------------------------------------2019년반영  -->
						<table class="table-style type02" summary="자료선택(필수)">
							<colgroup>
								<col width="120px">
								<col width="*">
							</colgroup>
							<tbody>
								<%-- <tr>
									<th scope="row"><label for="census_output_area_year">집계구 기준년도</label></th>
									<td>
										<span class="select-wrap">
											<select name="census_output_area_year" id="census_output_area_year" style="width: 250px;" title="집계구 기준년도" onChange="onChange_coa_year(document.getElementById('census_output_area_year').value);">
												<option value="2015" <%if("2015".equals(census_output_area_year)) { %>selected="selected"<%} %>>2015</option>
											</select>
										</span>
									</td>
								</tr> --%>
								<tr>
									<th scope="row"><label for="sgis_census_id1">자료구분</label></th>
									<td>
										<ul>
											<li>
											<%
												try {
													broker = new GeneralBroker("ceaa00");
													lData.setString("PARAM", "CODE");
													rm = broker.getList(lData);
													
													while(rm != null && rm.next()) {
														r_sgis_census_id = String.valueOf((BigDecimal)rm.get("sgis_census_id"));
														r_sgis_census_name = StringUtil.verify((String)rm.get("sgis_census_code_name"));
														if("1".equals(r_sgis_census_id)) {
											%>
											<span class="radio-area">
												<input type="radio" class="radio" name="sgis_census_id" id="sgis_census_id<%=r_sgis_census_id %>" value="<%=r_sgis_census_id %>" onclick="selectDetailData2('sgis_census_data_id', 'sgis_census_id', 'sgis_census_year1', '');"/>
												<label for="sgis_census_id<%=r_sgis_census_id %>" id="sgis_census_id<%=r_sgis_census_id %>"><%=r_sgis_census_name %></label>
											</span>
											<%
														}
													}
												} catch(Exception e) {
													System.out.print("sgisWebError : ");
												}
											%>
											</li>
										</ul>
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="sgis_census_data_id0">자료대상(집계구별)</label></th>
									<td>
										<ul>
											<li id="option_data"><!-- shortcut_05_03_data.jsp --></li>
										</ul>
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="sgis_census_year1">년도</label></th>
									<td>
										<div class="" id="option_year"><!-- shortcut_05_03_year.jsp --></div>
									</td>
								</tr>
								<tr>
									<th scope="row"><label for="sgis_census_detail_data_id1">세부자료명</label></th>
									<td id="option_detail_data"><!-- shortcut_05_03_detail_data_id.jsp --></td>
								</tr>
								<tr>
									<th scope="row"><label for="sgis_census_sido1">시도/시군구</label></th>
									<td>
										<div class="" id="option_sido"><!-- shortcut_05_03_sido.jsp --></div>
										<div class="" id="option_sigungu"><!-- shortcut_05_03_sigungu.jsp --></div>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
					<div class="btn-area mt20">
						<button type="button" class="default-color" id="createBtn"><span>자료생성</span></button>
						<button type="button" class="createAllBtn" id="createAllBtn" style="background-color: #356fc5;"><span>통합자료생성</span></button><!---------------------------(해당버튼 클릭시 자료대상 별 모든 년도별, 세부자료명, 시도, 시군구 별 자료대상 파일이 출력된다)-- 2019년반영-->					
					</div>
				</div>
				<table>
					<tr>
						<td height="10px;"></td>
					</tr>
				</table>
			</div>
		</div>
		<!-- dim처리 문구 출력 -->
		<div class="wrap-loading" style="display:none">
   			<div style="background-color: rgb(255, 255, 255); border: 3px solid rgb(0, 0, 0); position: absolute; height: 10px; line-height: 50px; padding-bottom: 40px; width: 400px; top: 50%; left: 50%; z-index: 11000; cursor: wait; margin: -5px 0px 0px -200px; text-align: center;">자료 생성 중 입니다...</div>
		</div>
		<!-- cls:footer start -->
		<div class="footerWrapper" id="gsksFooterWrapper"></div>
	</body>
</html>