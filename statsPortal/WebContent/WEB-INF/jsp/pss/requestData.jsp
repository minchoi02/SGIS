<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%
	String leftMenu="shortcut";

	//자료제공 파일에 오류가 있어서 서비스 정지함. 20191126
	//out.print("<script type='text/javascript'> alert('집계구별 자료 제공관련, 코드 정비 및 개선을 위하여 인구/사업체 부문 서비스를 잠시 중단하오니 양해바랍니다. 기간 : 11.26.(화)  ~ 12월 (개선완료시점까지)'); location.href='/contents/shortcut/shortcut_05_02.jsp'; </script> ");
	//out.print("<script type='text/javascript'> alert('‘18년 센서스 내용을 반영하여 최초 제공(’19.11.8.)되었던 자료에 대한 점검을 완료하여 서비스를 다시 시작하며, 점검결과 내용이 일부 변경되었을 수 있음을 알려드립니다.'); </script> ");
	//out.println("<script type='text/javascript'> alert('SGIS포털 자료제공 서비스 중단 안내문\\n\\n통계지리정보서비스(SGIS) 집계구 경계 및 통계자료 개선을 위하여 다음과 같이 서비스가 중단되오니 양해 바랍니다.\\n\\n- (중단서비스) 자료신청, 신청자료 다운로드\\n- (중단기간) 2020. 9. 29.(화) 14시 ~ 10. 8.(목) 18시\\n\\n서비스 이용에 불편을 드린 점에 대해서는 다시 한번 양해를 부탁 드리며 앞으로 SGIS 서비스 개선을 위해 더욱 노력하겠습니다.'); location.href='/contents/shortcut/shortcut_05_02.jsp'; </script> ");
	//자료제공 점검 후 멘트

	System.out.println("[shortcut_0503_step01.jsp] loginYn [" + loginYn);

	if(loginYn.equals("N")) {
		//return URL
		session.setAttribute("returnUrl", "/view/pss/requestData");
		out.print("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>");
		out.print("<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='ko' lang='ko'>");
		out.print("<head>");
		out.print("<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />");
		out.print("<title>센서스 공간통계 자료신청:통계지리 정보서비스</title>");
		out.print("</head>");
		out.print("<body>");
		out.print("<script type='text/javascript'> alert('로그인 후 이용할 수 있습니다.'); location.href='/view/member/login_new?returnPage=//sgis.kostat.go.kr/view/pss/requestData'; </script> ");
	}
	else {
		GeneralBroker broker = null;
		DbManager dmg = null;
		RecordModel rm = null;
		RecordModel rm1 = null;
		RecordModel rm2 = null;

		String sgis_census_id = "";
		String sgis_census_name = "";
		String sgis_census_data_id = "";
		String sgis_census_data_name = "";
		String sgis_census_req_company = request.getParameter("sgis_census_req_company")==null? "":request.getParameter("sgis_census_req_company");

		String sgis_census_req_email = "";
		String sgis_census_req_sosok = request.getParameter("sgis_census_req_sosok")==null? "":request.getParameter("sgis_census_req_sosok");

		String sgis_census_req_mokjuk = request.getParameter("sgis_census_req_mokjuk")==null? "":request.getParameter("sgis_census_req_mokjuk");
		String census_output_area_year = "";
		if(request.getParameter("census_output_area_year") != null && request.getParameter("census_output_area_year") != "") {
			census_output_area_year = request.getParameter("census_output_area_year");
			census_output_area_year = census_output_area_year.replaceAll("<", "");
		}
		String sgis_census_req_kwaje = request.getParameter("sgis_census_req_kwaje")==null? "":request.getParameter("sgis_census_req_kwaje");

		String sgis_census_req_tel = "";
		String sgis_census_req_goal = request.getParameter("sgis_census_req_goal")==null? "":request.getParameter("sgis_census_req_goal");
		String sgis_census_req_file = "";
		String sgis_census_req_status = "";
		String sgis_census_req_reject = "";
		String sgis_census_location = "";
		String sgis_census_req_app_date = "";

		String sgis_census_req_year = "";
		String sgis_census_sido_id = "";
		String sgis_census_sido_nm = "";
		String sgis_census_sigungu_id = "";
		String sgis_census_sigungu_nm = "";

		// 2017.11.03 [개발팀] 추가
		String sgis_census_detail_data_id = "";
		String sgis_census_detail_data_nm = "";

		String years = "";
		String cnt = "0";

		//CODE
		String r_sgis_census_id = "";
		String r_sgis_census_name = "";

		int count = 0;

		//if(StringUtil.isEmpty(sc_company_name)) sc_company_name = "";
		String sc_company_name = "";

		/**************************************/
		/* 조회일 경우 */
		/**************************************/
		/* if(lData.getString("aT").equals("RET")) {
			try {
				broker = new GeneralBroker("ceaa00");
				lData.setString("PARAM", "CENSUS_APPLY_INFO");
				rm = broker.getList(lData);

				if(rm.next()) {
					sgis_census_id = String.valueOf((BigDecimal)rm.get("sgis_census_id"));
					sgis_census_name = StringUtil.verify((String)rm.get("sgis_census_code_name"));
					sgis_census_data_id = String.valueOf((BigDecimal)rm.get("sgis_census_data_id"));
					sgis_census_data_name = StringUtil.verify((String)rm.get("sgis_census_data_name"));
					sgis_census_req_company = StringUtil.verify((String)rm.get("sgis_census_req_company"));
					sgis_census_req_company = sgis_census_req_company.replaceAll("&apos;","\'").replaceAll("&quot;","\"").replaceAll("&amp;","&");

					sgis_census_req_email = StringUtil.verify((String)rm.get("sgis_census_req_email"));
					sgis_census_req_sosok = StringUtil.verify((String)rm.get("sgis_census_req_sosok"));
					sgis_census_req_mokjuk = StringUtil.verify((String)rm.get("sgis_census_req_mokjuk"));
					census_output_area_year = StringUtil.verify((String)rm.get("census_output_area_year"));
					sgis_census_req_kwaje = StringUtil.verify((String)rm.get("sgis_census_req_kwaje"));

					sgis_census_req_tel = StringUtil.verify((String)rm.get("sgis_census_req_tel"));
					sgis_census_req_goal = StringUtil.verify((String)rm.get("sgis_census_req_goal"));
					sgis_census_req_goal = sgis_census_req_goal.replaceAll("&apos;","\'").replaceAll("&quot;","\"").replaceAll("&amp;","&");
					sgis_census_req_file = StringUtil.verify((String)rm.get("sgis_census_req_file"));
					sgis_census_location = StringUtil.verify((String)rm.get("sgis_census_location"));
					if(sgis_census_req_file.equals("null")) sgis_census_req_file="";
					sgis_census_req_status = String.valueOf((Character)rm.get("sgis_census_req_status"));	//A : 승인 , B : 반려
					sgis_census_req_reject = StringUtil.verify((String)rm.get("sgis_census_req_reject"));
					sgis_census_req_reject = sgis_census_req_reject.replaceAll("&apos;","\'").replaceAll("&quot;","\"").replaceAll("&amp;","&");
					sgis_census_req_app_date = StringUtil.verify((String)rm.get("sgis_census_req_app_date"));

					sgis_census_req_year = StringUtil.verify((String)rm.get("sgis_census_req_year"));
					sgis_census_sido_id = StringUtil.verify((String)rm.get("sgis_census_req_sido"));
					sgis_census_sido_nm = StringUtil.verify((String)rm.get("sido_nm"));
					sgis_census_sigungu_id = StringUtil.verify((String)rm.get("sgis_census_req_sigungu"));
					sgis_census_sigungu_nm = StringUtil.verify((String)rm.get("sigungu_nm"));

					// 2017.11.03 [개발팀] 추가
					sgis_census_detail_data_id = StringUtil.verify((String)rm.get("sgis_census_detail_data_id"));
					sgis_census_detail_data_nm = StringUtil.verify((String)rm.get("sgis_census_detail_data_nm"));
				}
				// 센서스 신청 자료 개수
				lData.setString("PARAM", "CENSUS_REQ_DATA_CNT");
				rm2 = broker.getList(lData);
				if(rm2.next()) cnt = StringUtil.verify((String)rm2.get("cnt"));
			}
			catch(IllegalArgumentException e) {
				System.out.print("조회에러");//System.out.print("[shortcut_05_03.jsp] sgisWebError : [" + e.toString() );
				//2015-12-03 시큐어코딩
				//e.printStackTrace();
				//logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
			}
		}

		//승인 또는 반려인경우 수정불가
		String tag="";
		if(sgis_census_req_status.equals("A") || sgis_census_req_status.equals("B")) {
			tag = "readonly=\"readonly\"";
		} */
%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="utf-8">
		<meta name="format-detection" content="telephone=no" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<script type="text/javascript" language="javascript" src="/contents/scripts/common.js"></script>
		<script type="text/javascript" language="javascript" src="/contents/scripts/javascript.js"></script>
		<script type="text/javascript" language="javascript" src="/contents/scripts/flash.js"></script>
		<script type="text/javascript" language="javascript" src="/js/plugins/durian-v2.0.js"></script>

		<script src="/js/common/includeHead.js"></script>
		<script src="/js/common/common.js"></script>
		<script type="text/javascript" language="javascript" src="/publish_2018/include/js/markData.js?ver=1"></script>

		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/common.css">
		<!--알림마당 컨텐츠 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/contents.css">
		<!--게시판 css 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/board.css">

		<title>자료제공|통계지리정보서비스</title>
		<script>
			var menuType = 'sc0503past';

			var leveVar1;
			var leveVar2;
			var selectMapData = new Array(); //
			var selectBoxData = new Array(); //
			var selectflag = true;

			$(function(){
				//apiLogWrite2("E2","E21",$(".ctit").text(),"없음","00","없음");
				srvLogWrite("A0", "14", "04", "03", "", "");
				leveVar1 = $('#sgis_leve_ul_1').html();
				leveVar2 = $('#sgis_leve_ul_2').html();
				onChangeDataType();
			});

			//pageCallReg();
			//2021년 SGIS4_자료제공 시작
			function selectDetailData2(val, val2, val3, val4) {
				var sgis_census_id = $('input:radio[name='+val2+']:checked').val();

				//selectBoxData = new Array();
				//selectMapData = new Array();

				//closeMapBtn();
				//
				$.ajax({
					type: "POST",
					url: "/view/pss/requestOptionData",
					data: {
						"sgis_census_id": $('input:radio[name='+val2+']:checked').val(),
						"sgis_census_data_name": val,
						"sgis_census_year": val3,
						"sgis_census_data_id": val4,
						"mode" : 1

					},
					success:function(data){
						$('#option_data').html(data);


						var flag1 = $("input[name='census_output_data_type']:checked").val();
						var flag2 = $("input[name='sgis_census_id']:checked").val();

						selectBoxData = new Array(); //
						if(flag1 == 2 && flag2 == 7){


							$('#sgsi_year_tr').show();
							$('.data_type_2').show();

							$('#sgis_map_div').show();
							$('.sgis_map_code_tr').show();

							$('.sgis_Levle_ul').show();

							 $('#sgis_leve_ul_1').html(leveVar1);
							 $('#sgis_leve_ul_2').html(leveVar2);
							 $('#map_close_btn').click();



						}else if(flag1 == 2 && flag2 == 8){

							$("#option_year").empty();

							$('#sgis_leve_ul_1').empty();
							$('#sgis_leve_ul_2').empty();

							$('#sggi_Levle_tr').hide();
							$('.sgis_Levle_ul').hide();

							$('#sgsi_year_tr').hide();
							$('.data_type_2').hide();

							$('#sgis_map_div').hide();
							$('#map_close_btn').click();



						}

						if(sgis_census_id == "5"){
							$("#sgis_census_devided_grid_tr").show();
							$("#sgis_census_devided_grid_ul").hide();
							$('#option_detail_data_sido_tr').hide();
							$('#option_detail_data_sido_th').hide();
							$('#option_detail_data_sido_td').remove();

						}else{
						 	$("#sgis_census_devided_grid_tr").hide();
						}
					},
					error:function(data) {}
				});

				$("#option_grid").empty();
				$("#option_year").empty();
				$("#option_detail_data").empty();
				$("#option_sido").empty();
				$("#option_sigungu").empty();

				$("#option_year").attr("class", "");
				$('#option_sido').attr("class", "");
				$('#option_sigungu').attr("class", "");
			}
			//2021년 SGIS4_자료제공 끝

			function onChange_coa_year(what_year) {
				onChangeDataType();

				if($(what_year).val() == "2021")$('#txt_data_info').html("[2021년 6월 30일 경계기준]");
				else                   $('#txt_data_info').html("[2020년 12월 31일 경계기준]");
			}


			jQuery(function(){

				<%
				    if("2021".equals(census_output_area_year) || "".equals(census_output_area_year)) { //최초로딩시 및 2021 선택시 경계기준표시(나중에 년도 바뀌면 이부분 수정요망)
			    %>
				    	jQuery("#txt_data_info").html(" [2021년 6월 30일 경계기준]");
			    <%
				    } else if("2020_4".equals(census_output_area_year) ) { //2020_4 선택시 경계기준표시(나중에 년도 바뀌면 이부분 수정요망)
			    %>
				    	jQuery("#txt_data_info").html(" [2020년 12월 31일 경계기준]");
				<%
				    } else {
				%>
				    	jQuery("#txt_data_info").html("");
				<%
				    }
				%>
			});


			var ison="0";

			function applyClicked() {
				var fm = document.censusFm;
				var myTable = document.getElementById("sgis_census_table");
				var myTbody = myTable.getElementsByTagName("tbody")[0];
				var len = myTbody.rows.length;

				if(document.getElementById("sgis_census_req_sosok").value == "") {
					alert("소속구분을 선택하세요.");
					document.getElementById("sgis_census_req_sosok").focus();
					return false;
				}
				if(fm.sgis_census_req_company.value.trim() == "") {
					alert("소속을 입력하세요.");
					fm.sgis_census_req_company.focus();
					return false;
				}
				if(fm.sgis_census_req_tel_1.value.trim() == "" || fm.sgis_census_req_tel_2.value.trim() == "" || fm.sgis_census_req_tel_3.value.trim() == "") {
					alert("연락처를 입력하세요.");
					fm.sgis_census_req_tel_1.focus();
					return false;
				}
				if(document.getElementById("email_id").value == "" || document.getElementById("email_addr").value == "") {
					alert("메일주소를 입력하세요.");
					document.getElementById("email_id").focus();
					return false;
				}
				if(document.getElementById("sgis_census_req_mokjuk").value == "") {
					alert("요청목적을 선택하세요.");
					document.getElementById("sgis_census_req_mokjuk").focus();
					return false;
				}
				if(fm.sgis_census_req_goal.value.trim() == "") {
					alert("활용목적을 입력하세요.");
					fm.sgis_census_req_goal.focus();
					return false;
				} else if (getLength(fm.sgis_census_req_goal.value) > 500) {
					alert("입력가능한 글자수는 한글 250자, 영문 500자로 제한되어 있습니다.");
					fm.sgis_census_req_goal.focus();
					return false;
				}
				if(document.getElementById("sgis_census_req_kwaje").value == "") {
					alert("수행과제를 입력하세요.");
					document.getElementById("sgis_census_req_kwaje").focus();
					return false;
				}
				if(!$("input:checkbox[id='concur']").is(":checked")) {
					alert("제출 동의에 동의하셔야 신청하실 수 있습니다.");
					return false;
				}
				if(len < 1) {
					alert("자료를 하나이상 선택하세요.");

					//mng_s 20210609 이진호
					//addTble(); 주석처리, 추가 후 테이블에서 삭제 -> 신청완료 누를 시 자동으로 테이블에 추가 되는데 추가 될 때 세부자료명이
					//undefined가 되는 문제 && 사용자가 삭제 하였는데 자동으로 추가가 할 필요가 없다는 김책임님 의견
					//addTable();
					//mng_e 20210609 이진호

					return false;

				}

				$('input[id=sgis_census_req_mokjuk_nm]').val($("#sgis_census_req_mokjuk option:selected").text());
				$('input[id=sgis_census_req_sosok_nm]').val($("#sgis_census_req_sosok option:selected").text());

				//통계갤러리 추가
				//유효성 검사가 끝난후
				//sgis_census_req_mokjuk 요청목적
				//sgis_census_req_kwaje 수행과제
				//sgis_census_req_goal 활용목적
				//sgis_census_id sgis_census_data_id sgis_census_year_id sgis_census_sido_id sgis_census_sigungu_id
				//sgis_census_req_tel_1 sgis_census_req_tel_2 sgis_census_req_tel_3 전화번호
				//sgis_census_req_company 소속
				//sgis_census_req_email 메일주소
				//sgis_census_req_sosok 소속 구분
				//concur 제출동의 체크
				var object = new Object();
				//2017.03.15 최재영 수정
				object.census_output_area_year = $("#census_output_area_year").val();//집계구 기준년도 추가 (20170619)
				object.sgis_census_req_mokjuk = $("#sgis_census_req_mokjuk_nm").val();//가져가는 값 수정
				object.sgis_census_req_kwaje = $("#sgis_census_req_kwaje").val();
				object.sgis_census_req_goal = $("#sgis_census_req_goal").val();
				object.sgis_census_req_tel = $("#sgis_census_req_tel").val();
				object.sgis_census_req_company = $("#sgis_census_req_company").val();
				object.sgis_census_req_email = $("#sgis_census_req_email").val();
				object.sgis_census_req_sosok = $("#sgis_census_req_sosok_nm").val();
				object.content = $("#sgis_census_req_goal").val();
				object.section = "OpenAPI";
				object.census_output_area_year2 = $("#census_output_area_year").val(); //20170619
				object.usePurpose = $("#sgis_census_req_mokjuk_nm").val();
				object.applicationField = "기타";
				object.sgisCensusList = new Array();

				var rowLength = $("input[name='sgis_census_id_new']").length;
				for(var i = 0; i < rowLength; i++) {
					var rowObject = new Object();
					rowObject.sgis_census_id = $("input[name='sgis_census_id_new']").eq(i).val();
					rowObject.sgis_census_data_id = $("input[name='sgis_census_data_id_new']").eq(i).val();
					rowObject.sgis_census_year_id = $("input[name='sgis_census_year_id_new']").eq(i).val();
					rowObject.sgis_census_sido_id = $("input[name='sgis_census_sido_id_new']").eq(i).val();
					rowObject.sgis_census_sigungu_id = $("input[name='sgis_census_sigungu_id_new']").eq(i).val();
					rowObject.sgis_census_detail_data_id = $("input[name='sgis_census_detail_data_id_new']").eq(i).val();
					object.sgisCensusList.push(rowObject);
				}

				if($("input:checkbox[id='concur']").is(":checked")) object.concur = true;
				else object.concur = false;



				var object2 = new Object();
				//2017.03.15 최재영 수정
				object2.census_output_area_year = $("#census_output_area_year").val();//집계구 기준년도 추가 (20170619)
				object2.sgis_census_req_mokjuk = $("#sgis_census_req_mokjuk_nm").val();//가져가는 값 수정
				object2.sgis_census_req_kwaje = $("#sgis_census_req_kwaje").val();
				object2.sgis_census_req_goal = $("#sgis_census_req_goal").val();
				object2.sgis_census_req_tel = $("#sgis_census_req_tel").val();
				object2.sgis_census_req_company = $("#sgis_census_req_company").val();
				object2.sgis_census_req_email = $("#sgis_census_req_email").val();
				object2.sgis_census_req_sosok = $("#sgis_census_req_sosok_nm").val();
				object2.content = $("#sgis_census_req_goal").val();
				object2.section = "OpenAPI";
				object2.census_output_area_year2 = $("#census_output_area_year").val(); //20170619
				object2.usePurpose = $("#sgis_census_req_mokjuk_nm").val();
				object2.applicationField = "기타";

				$.ajax({
					type : "POST",
					url : "/view/gallery/galleryAdd",
					data : {
						title : $("#sgis_census_req_kwaje").val(),
						content : $("#sgis_census_req_goal").val(),
						tag : "",
						srv_type : "6",
						survey_surv_start_dt : "",
						survey_surv_end_dt : "",
						surveyData : "",
						param : JSON.stringify(object2),
						supportType : 'sgis_census_req',
					},
					success : function(data) {},
					error : function(xhr,textStatus,error) {},
					complete : function(data) {}
				});
				//통계갤러리 추가 끝
				//fm.encoding = "application/x-www-form-urlencoded";
				//fm.action = "/view/shortcut/saveData";

				if(document.censusFm.sgis_census_id_new == null) { // 2021년 SGIS4_자료제공
					alert("신청자료 선택 후 추가 버튼을 클릭하세요.");
					return false;
				}

				var c = confirm("신청하시겠습니까?");
				if(c == 1) {
					//============================ 연락처 세션비교후 반영 =========================
					//var sgis_telephone = document.censusFm.sgis_census_req_tel.value;
					var sc_tele = "<%=sc_telephone%>";
					fm.aT.value = "INS";
					var params = $(fm).serialize() ;

					$.ajax({
						type : "POST",
						url : "/view/pss/saveRequestData",
						data : params,
						success : function(data) {
						},
						error : function(xhr,textStatus,error) {
							//alert(textStatus);
						},
						complete : function(data) {
							//msg = "센서스경계 자료신청이 승인(반려) 되었습니다. 수정하실 수 있는 권한이 없습니다.";
							if(data.responseText == "1"){
								alert("센서스경계 자료가 신청되었습니다. \n\n승인확인은 \"알림마당 > 자료신청 > 신청내역\" 에서 확인 하시면 됩니다.");	
								location.href = "/view/pss/requstDataList";
							}else if(data.responseText == "2"){
								alert("저장되었습니다. \n\n승인확인은 \"자료신쳥청> 신청내역\" 에서 확인 하시면 됩니다.");	
								location.href = "/view/pss/requstDataList";
							}else{
								alert(data.responseText);
							}
						} 

					});
					//fm.submit();

					//return true;
				} else {
					//return false;
				}
			}

			function chkNumber(elem) {
				if(!elem.value.isInteger() && elem.value != '') {
					alert("숫자만 입력가능합니다.");
					elem.value = "";
					return;
				}
			}

			function in_email_addr(elem) {
				var val = elem.value;
				if(val != null && val != '' && val == 'write') {
					document.censusFm.email_addr.value = '';
					document.censusFm.email_addr.focus();
					return;
				}
				else if(val != null && val != '' && val != 'write') {
					document.censusFm.email_addr.value = val;
					return;
				}
			}

			function len_chk2(len) {
				var fm = document.censusFm.sgis_census_req_goal;
				if(getLength(fm.value) > len) {
					alert("입력가능한 글자수는 한글 "+len/2+"자, 영문 " +len+ "자로 제한되어 있습니다.")
					fm.value = fm.value.substring(0, len / 2);
					fm.focus();
				}
			}

			function check_dup() {

				var fm=document.censusFm;
				var myTable = document.getElementById("sgis_census_table");



				var myTbody = myTable.getElementsByTagName("tbody")[0];
				var len = myTbody.rows.length;


				//자료선택  통계자료, 세종시 특별센서스
				var census_output_data_type = $("input[name='census_output_data_type']:checked").val();        //자료형태

				var sgis_census_id = $("input[name='sgis_census_id']:checked").val();                          //자료구분
				var sgis_census_data_id = $("input[name='sgis_census_data_id']:checked").val();                //자료대상
				var sgis_census_year_id = $("select[name='sgis_census_year_id']").val();                        //년도
				var sgis_census_detail_data_id = $("input[name='sgis_census_detail_data_id']:checked").val();  //세부자료명
				var sgis_census_sido_id = $("select[name='sgis_census_sido_id']").val();                        //시도
				var sgis_census_sigungu_id = $("select[name='sgis_census_sigungu_id']").val();                  //시군구

				var flag = true;
				$('#sgis_census_table tr').each(function(){

					//테이블 row 데이터
					var sgis_census_id_new = $(this).find("input[name='sgis_census_id_new']").val();                          //자료구분
					var sgis_census_data_id_new = $(this).find("input[name='sgis_census_data_id_new']").val();                //재상자료명
					var sgis_census_year_id_new = $(this).find("input[name='sgis_census_year_id_new']").val();                //대상년도
					var sgis_census_detail_data_id_new = $(this).find("input[name='sgis_census_detail_data_id_new']").val();  //세부자료명
					var census_output_data_type_new = $(this).find("input[name='census_output_data_type_new']").val();        //자료형태
					var sgis_census_req_map_level = $(this).find("input[name='sgis_census_req_map_level']").val();            //격자레벨
					var sgis_census_sido_id_new = $(this).find("input[name='sgis_census_sido_id_new']").val();                //시도코드
					var sgis_census_req_map_code = $(this).find("input[name='sgis_census_req_map_code']").val();              //격자코드
					var sgis_census_sigungu_id_new = $(this).find("input[name='sgis_census_sigungu_id_new']").val();          //시군구코드

					var sgis_census_req_map_level = $(this).find("input[name='sgis_census_req_map_level']").val();          //격자레벨
					var sgis_census_req_map_code = $(this).find("input[name='sgis_census_req_map_code']").val();          //격자코드



					if(sgis_census_id ==1 || sgis_census_id ==4){


						$("input[name='sgis_census_detail_data_id']:checked").each(function(){
							var checkFlag = 0;
							if(census_output_data_type_new == census_output_data_type)checkFlag++;
							if(sgis_census_id_new == sgis_census_id)checkFlag++;
							if(sgis_census_data_id_new == sgis_census_data_id)checkFlag++;
							if(sgis_census_year_id_new == sgis_census_year_id)checkFlag++;
							if(sgis_census_detail_data_id_new == $(this).val())checkFlag++;
							if(sgis_census_sido_id_new == sgis_census_sido_id)checkFlag++;
							if(sgis_census_sigungu_id_new == sgis_census_sigungu_id)checkFlag++;
							if(checkFlag == 7){
								flag= false;
							}

						});


					}else if(sgis_census_id ==2){

						var checkFlag = 0;

						if(sgis_census_id_new == sgis_census_id)checkFlag++;
						if(sgis_census_data_id_new == sgis_census_data_id)checkFlag++;
						if(sgis_census_year_id_new == sgis_census_year_id)checkFlag++;
						if(census_output_data_type_new == census_output_data_type)checkFlag++;
						if(sgis_census_sido_id_new == sgis_census_sido_id)checkFlag++;
						if(sgis_census_sigungu_id_new == sgis_census_sigungu_id)checkFlag++;

						if(checkFlag == 6){
							flag= false;
						}
					}else if(sgis_census_id ==7){

						var checkFlag = 0;
						//var sgis_census_level_area

						var f1 = false;
						var f2 = false;
						if(sgis_census_id_new == sgis_census_id)checkFlag++;                    //자료구분
						if(sgis_census_data_id_new == sgis_census_data_id)checkFlag++;          //자료대상
						if(sgis_census_year_id_new == sgis_census_year_id)checkFlag++;          //년도
						if(census_output_data_type_new == census_output_data_type)checkFlag++;  //자료형태

						$("input[name='sgis_census_level_area']:checked").each(function(){
							if(sgis_census_req_map_level == $(this).val())f1 = true;
						});


						selectBoxData.forEach(function(item,index,arr2){
							if(mapCodesR[item] == sgis_census_req_map_code) f2= true;
						});

						if(f1) checkFlag++;
						if(f2) checkFlag++;

						if(checkFlag == 6){
							flag= false;
						}

					}else if(sgis_census_id ==8){
						var checkFlag = 0;
					
						var f1 = false;
						if(sgis_census_id_new == sgis_census_id)checkFlag++;                    //자료구분
						if(sgis_census_data_id_new == sgis_census_data_id)checkFlag++;          //자료대상
						if(census_output_data_type_new == census_output_data_type)checkFlag++;  //자료형태

						if(sgis_census_data_id == 1){
							if(sgis_census_year_id_new == sgis_census_year_id)checkFlag++;          //년도
						}else{

							selectBoxData.forEach(function(item,index,arr2){
								if(mapCodesR[item] == sgis_census_req_map_code) f1= true;
							});
							if(f1) checkFlag++;
						}

						if(checkFlag == 4){
							flag= false;
						}



					}

				});
				return flag;

			}

			function fromToAdd() {
				if(check_dup() == false) {
					alert("신청 목록에 같은 분류의 신청이 있습니다.");
					return false;
				}

				//return ;

				var radioVal = $("input[name='census_output_data_type']:checked").val();
				var radioVal2 = $("input[name='sgis_census_id']:checked").val();

				if($('input:radio[name=sgis_census_id]:checked').val() == "" || $('input:radio[name=sgis_census_id]:checked').val() == undefined) {
					alert("자료구분을 선택하세요.");
					return false;
				}
				if($('input:radio[name=sgis_census_data_id]:checked').val() == "" || $('input:radio[name=sgis_census_data_id]:checked').val() == undefined) {
					alert("대상자료명을 선택하세요.");
					return false;
				}
				if(radioVal2 != 8 ){
					if($('#sgis_census_year1').val() == "") {
						alert("년도를 선택하세요.");
						return false;
					}
				}

				var checkeValues = $("input[name='census_output_data_type']:checked").val();

				if(checkeValues !=2){

						//2021년 SGIS4_자료제공 시작
						if($('input:radio[name=sgis_census_data_id]:checked').val() == "0" && $('input:radio[name=sgis_census_id]:checked').val() == "5" && $("input:checkbox[name='sgis_grid_data_id']:checked").val() == null
								||  $('input:radio[name=sgis_census_id]:checked').val() == "5" &&  $('input[name=sgis_grid_data_id]:checked').val() == null){
							alert("격자경계를 선택하세요.");
							return false;
						}
						if((checkeValues != 2 )&& ($('input:radio[name=sgis_census_id]:checked').val() == "1" && $('input:checkbox[name=sgis_census_detail_data_id]:checked').length < 1
								|| $('input:radio[name=sgis_census_id]:checked').val() == "5" && $('input:checkbox[name=sgis_census_detail_data_id]:checked').length < 1)) {
							alert("세부자료명을 선택하세요.");
							return false;
						//2021년 SGIS4_자료제공 끝

						//mng_s 20210216 이진호
						//세부자료명을 체크하여도 undefined 값이 넘어오는 현상이 있어서 수정
						//undefined 값 넘어온 후에 사용자가 신청완료를 눌러 자료를 다운하려고 하면 안받아지는 현상이 있다고 하였음..
						}else if($('input:radio[name=sgis_census_id]:checked').val() == "1" || $('input:radio[name=sgis_census_id]:checked').val() == "4"){
							if($('input:checkbox[name=sgis_census_detail_data_id]:checked').val() == undefined){
								alert("세부자료명을 다시 선택하세요.");
								return false;
							}
						}
						//mng_e 20210216 이진호

						if($('#sgis_census_sido1').val() == "") {
							alert("시도를 선택하세요.");
							return false;
						}
						if($('#sgis_census_sigungu1').val() == "") {
							alert("시군구를 선택하세요.");
							return false;
						}

				}
				//2021년 SGIS4_자료제공 시작
				if($('input:radio[name=sgis_census_data_id]:checked').val() == "0" && $('input:radio[name=sgis_census_id]:checked').val() == "5" && $("input:checkbox[name='sgis_grid_data_id']:checked").val() == null  ){
					alert("격자경계를 선택하세요.");
					return false;
				}


				if(radioVal == 2 ){

					var d1 = $('input[name=sgis_census_id]:checked').val();
					var d2 = $('input[name=sgis_census_data_id]:checked').val();

					if(d1 ==7){
						if($('input:checkbox[name=sgis_census_level_area]:checked').length<1){
							alert("격자레벨을 선택하세요.");
							return false;
						}
					}


					if(d1 ==7 || d2 == 0){
						if(selectBoxData.length <1){
							alert("격자를 선택하세요.");
							return false;
						}
					}


					if(d1 == 8 && d2 == 1){
						if($('#sgis_census_year1').val() == "") {
							alert("년도를 선택하세요.");
							return false;
						}
					}

				}


				//2021년 SGIS4_자료제공 끝
				var len = 0;


				if(radioVal ==1){

					if($('input:checkbox[name=sgis_census_detail_data_id]').is(":checked")){//세부자료명이 체크 되었을시
						$('input:checkbox[name=sgis_census_detail_data_id]:checked').each(function(i, e) {
							if(e.value != 'all') {
								addTable(e.value, $('label[id=sgis_census_detail_data_id'+e.value+']').text(),"","");
								len++;
							}
						});
					}
					else{//세부자료명이 체크 안되어 있을시
						addTable("","","",""); // 세부자료명 체크 필요없을 시 주석해제 // 2021년 SGIS4_자료제공
					}
				}else if(radioVal ==2){


					var check1 = $("input[name='sgis_census_id']:checked").val();
					var check2 = $("input[name='sgis_census_data_id']:checked").val();

					if(check1 == 8 && check2 ==1){
						addTable("","","","");
					}else{
						selectBoxData.forEach(function(data){
							addDataForm(data);
						});
					}

				}else{
					addTable("","","","");
				}


				//2019-03-12 박길섭 끝
				//2021년 SGIS4_자료제공 시작
				var len = $('#sgis_census_table tr').length - 1;
				$('strong[id=listCnt]').text(len);
				//2021년 SGIS4_자료제공 끝
			}

			function addDataForm(data){


				var radioVal = $("input[name='sgis_census_id']:checked").val();

				var selectMapData = mapCodesR[data];
				//var selectMapCode =

				if(radioVal ==7 ){

					var check3 = $("input[name='sgis_census_level_area_check']:checked").val();


					if($('input:checkbox[name=sgis_census_level_area]').is(":checked")){//세부자료명이 체크 되었을시
						$('input:checkbox[name=sgis_census_level_area]:checked').each(function(i, e) {
							if(e.value != 'all') {
								addTable(e.value,e.value,selectMapData,selectMapData);

							}
						});

					}
					//selectMapData
					if(check3 == "Y"){
						addTableArea(selectMapData,selectMapData);
					}

				}else{
					addTable("","",selectMapData,selectMapData);
				}

			}

			var idx = 9999;
			//2021년 SGIS4_자료제공 시작
			function addTable_grid(sgis_census_detail_data_id, sgis_census_detail_data_nm){
				var myTable = document.getElementById("sgis_census_table");
				var myTbody = myTable.getElementsByTagName("tbody")[0];
				idx++;
				var row = document.createElement("tr");
				var cell = document.createElement("td");
				var input, span, label;
				var iframeName = "detailMenuIfr"+idx;
				var iframeId = "sgis_census_data_id"+idx;
				var selectId = "sgis_census_id"+idx;
				var yearId = "sgis_census_year"+idx;
				var inUseId = "inUse"+idx;
				var yearsId = "years"+idx;
				try {
					input = document.createElement("<span class='board-choice-check check-area'><input type='checkbox' name='cbox' id='a"+idx+"' class='check'/><label for='a"+idx+"'>선택</label></span>");

					cell.appendChild(input);
					row.appendChild(cell);
				} catch(e) {
					span = document.createElement("span");
					span.setAttribute("class", "board-choice-check check-area");

					input = document.createElement("input");
					input.setAttribute("type", "checkbox");
					input.setAttribute("name", "cbox");
					input.setAttribute("id", "a"+idx);
					input.setAttribute("class", "check");

					label = document.createElement("label");
					label.setAttribute("for", "a"+idx);

					labelText = document.createTextNode("선택");

					label.appendChild(labelText);

					span.appendChild(input);
					span.appendChild(label);

					cell.appendChild(span);
					row.appendChild(cell);
				}

				//============================== 시작 자료구분 ====================================
				cell = document.createElement("td");

				var sgis_census_id = $('input:radio[name=sgis_census_id]:checked').val();
				var sgis_census_nm = $('label[for=sgis_census_id'+sgis_census_id+']').text();//2019-03-12 박길섭
				try {
					input = document.createTextNode(sgis_census_nm);
				} catch(e) {
					input = document.createTextNode(sgis_census_nm);
				}
				cell.appendChild(input);

				try {
					input = document.createElement(
							"<input type='hidden' name='sgis_census_id_new' id='sgis_census_id" + idx + "'" + " value='" + sgis_census_id + "'/>"
						);
				} catch(e) {
					input = document.createElement("input");
					input.setAttribute("type", "hidden");
					input.setAttribute("name", "sgis_census_id_new");
					input.setAttribute("id", "sgis_census_id"+idx);
					input.setAttribute("value", 5);
				}
				cell.appendChild(input);
				row.appendChild(cell);
				//============================== 끝 자료구분 ====================================

				//============================== 시작 대상자료명 ====================================
				cell = document.createElement("td");

				var sgis_census_data_id = $('input:radio[name=sgis_census_data_id]:checked').val();
				var sgis_census_data_nm = $('label[for=sgis_grid_data_id'+sgis_census_data_id+']').text();// 0729 수정

				try {
					input = document.createTextNode(sgis_census_data_nm);
				} catch(e) {
					input = document.createTextNode(sgis_census_data_nm);
				}
				cell.appendChild(input);

				try {
					input = document.createElement(
							"<input type='hidden' name='sgis_census_data_id_new' id='sgis_census_data_id" + idx + "'" + " value='" + sgis_census_data_id + "'/>"
						);
				} catch(e) {
					input = document.createElement("input");
					input.setAttribute("type", "hidden");
					input.setAttribute("name", "sgis_census_data_id_new");
					input.setAttribute("id", "sgis_census_data_id"+idx);
					input.setAttribute("value", 0);
				}
				cell.appendChild(input);
				row.appendChild(cell);
				//============================== 끝 대상자료명 ====================================

				//============================시작 년도  ===============================

				/* cell = document.createElement("td");
				row.appendChild(cell); */
				cell = document.createElement("td");

				try {
					input = document.createElement(
							"<input type='hidden' name='sgis_census_year_id_new' id='sgis_census_year_id_new" + idx + "'" + " value='-'/>"
						);
				} catch(e) {
					input = document.createElement("input");
					input.setAttribute("type", "hidden");
					input.setAttribute("name", "sgis_census_year_id_new");
					input.setAttribute("id", "sgis_census_year_id"+idx);
					input.setAttribute("value", "-");
				}
				cell.appendChild(input);

				row.appendChild(cell);
				//============================끝 년도  ===============================

				// =================시작 세부자료명===================
				cell = document.createElement("td");

				/* try {
					input = document.createTextNode(sgis_census_detail_data_nm);
				} catch(e) {
					input = document.createTextNode(sgis_census_detail_data_nm);
				}
				cell.appendChild(input); */
				var sgis_census_detail_id = $('input:radio[name=sgis_census_data_id]:checked').val();
				try {
					input = document.createElement(
							"<input type='hidden' name='sgis_grid_detail_data_id_new' id='sgis_grid_detail_data_id" + idx + "'" + " value='-'/>"
						);
				} catch(e) {
					input = document.createElement("input");
					input.setAttribute("type", "hidden");
					input.setAttribute("name", "sgis_census_detail_data_id_new");
					input.setAttribute("id", "sgis_census_detail_data_id"+idx);
					input.setAttribute("value", sgis_census_data_id);
				}
				cell.appendChild(input);
				row.appendChild(cell);
				// =================끝 세부자료명 ===================

				// =================시작 시도 ===================
				cell = document.createElement("td");
				try {
					input = document.createElement(
							"<input type='hidden' name='sgis_census_sido_id_new' id='sgis_census_sido_id" + idx + "'"
							+ " value='--' >"
						);
				} catch(e) {
					input = document.createElement("input");
					input.setAttribute("type", "hidden");
					input.setAttribute("name", "sgis_census_sido_id_new");
					input.setAttribute("id", "sgis_census_sido_id"+idx);
					input.setAttribute("value", sgis_census_data_id);
				}
				cell.appendChild(input);
				row.appendChild(cell);
				// =================끝 시도 ===================

				// =================시작 시군구 ===================
				cell = document.createElement("td");

				try {
					input = document.createElement(
							"<input type='hidden' name='sgis_census_sigungu_id_new' id='sgis_census_sigungu_id" + idx + "'"
							+ " value='-' >");
				} catch(e) {
					input = document.createElement("input");
					input.setAttribute("type", "hidden");
					input.setAttribute("name", "sgis_census_sigungu_id_new");
					input.setAttribute("id", "sgis_census_sigungu_id"+idx);
					input.setAttribute("value", "-");
				}
				cell.appendChild(input);
				row.appendChild(cell);
				// =================끝 시군구 ===================
				// ================= 추가/삭제 시작 ===================
				cell = document.createElement("td");

				try {
					input = document.createElement("<img src='/contents/design_2015/images/button_delete2.png' style='cursor:hand;' alt='삭제' onclick=\"document.getElementById('a" + idx + "').checked = true; delTable(); return false;\" />");
				} catch(e) {
					input = document.createElement("img");
					input.setAttribute("src", "/contents/design_2015/images/button_delete2.png");
					input.setAttribute("alt", "삭제");
					input.setAttribute("style", "cursor:hand");
					input.setAttribute("onclick", "document.getElementById('a" + idx + "').checked = true; delTable(); return false;");
				}
				cell.appendChild(input);
				row.appendChild(cell);
				// ================= 추가/삭제 끝 ===================

				myTbody.appendChild(row);
				}
			//2021년 SGIS4_자료제공 끝
			//자료선택추가
			function addTable(sgis_census_detail_data_id, sgis_census_detail_data_nm,map_code,map_code_nm) {
				var myTable = document.getElementById("sgis_census_table");
				var myTbody = myTable.getElementsByTagName("tbody")[0];
				idx++;
				var row = document.createElement("tr");
				var cell = document.createElement("td");
				var input, span, label;
				var iframeName = "detailMenuIfr"+idx;
				var iframeId = "sgis_census_data_id"+idx;
				var selectId = "sgis_census_id"+idx;
				var yearId = "sgis_census_year"+idx;
				var inUseId = "inUse"+idx;
				var yearsId = "years"+idx;


				try {
					input = document.createElement("<span class='board-choice-check check-area'><input type='checkbox' name='cbox' id='a"+idx+"' class='check'/><label for='a"+idx+"'>선택</label></span>");
					cell.appendChild(input);
					row.appendChild(cell);
				} catch(e) {
					span = document.createElement("span");
					span.setAttribute("class", "board-choice-check check-area");

					input = document.createElement("input");
					input.setAttribute("type", "checkbox");
					input.setAttribute("name", "cbox");
					input.setAttribute("id", "a"+idx);
					input.setAttribute("class", "check");

					label = document.createElement("label");
					label.setAttribute("for", "a"+idx);

					labelText = document.createTextNode("선택");

					label.appendChild(labelText);

					span.appendChild(input);
					span.appendChild(label);

					cell.appendChild(span);
					row.appendChild(cell);
				}

				//============================== 시작 자료구분 ====================================
				cell = document.createElement("td");

				var sgis_census_id = $('input:radio[name=sgis_census_id]:checked').val();
				/* var sgis_census_nm = $('label[for=sgis_census_id'+sgis_census_id+']').text();//2019-03-12 박길섭 */
				//var sgis_census_nm = $("label[for='"+$('input:radio[name=sgis_census_id]:checked').attr("id")+"']").text();
				var sgis_census_nm ="경계";
				if(sgis_census_id == 1|| sgis_census_id == 4|| sgis_census_id == 7){
					sgis_census_nm ="통계";
				}


				try {
					input = document.createTextNode(sgis_census_nm);
				} catch(e) {
					input = document.createTextNode(sgis_census_nm);
				}
				cell.appendChild(input);

				try {
					input = document.createElement(
							"<input type='hidden' name='sgis_census_id_new' id='sgis_census_id" + idx + "'" + " value='" + sgis_census_id + "'/>"
						);
				} catch(e) {
					input = document.createElement("input");
					input.setAttribute("type", "hidden");
					input.setAttribute("name", "sgis_census_id_new");
					input.setAttribute("id", "sgis_census_id"+idx);
					input.setAttribute("value", sgis_census_id);
				}

				cell.appendChild(input);
				row.appendChild(cell);
				//============================== 끝 자료구분 ====================================

				//============================== 시작 대상자료명 ====================================
				cell = document.createElement("td");

				var sgis_census_data_id = $('input:radio[name=sgis_census_data_id]:checked').val();
				var data_id = $('input:radio[name=sgis_census_data_id]:checked').attr("id");
				var sgis_census_data_nm = $('label[for='+data_id+']').text();//2019-03-12 박길섭



				//sgis_census_data_nm

				try {
					input = document.createTextNode(sgis_census_data_nm);
				} catch(e) {
					input = document.createTextNode(sgis_census_data_nm);
				}
				cell.appendChild(input);

				try {
					input = document.createElement(
							"<input type='hidden' name='sgis_census_data_id_new' id='sgis_census_data_id" + idx + "'" + " value='" + sgis_census_data_id + "'/>"
						);
				} catch(e) {
					input = document.createElement("input");
					input.setAttribute("type", "hidden");
					input.setAttribute("name", "sgis_census_data_id_new");
					input.setAttribute("id", "sgis_census_data_id"+idx);
					input.setAttribute("value", sgis_census_data_id);
				}
				cell.appendChild(input);
				row.appendChild(cell);
				//============================== 끝 대상자료명 ====================================

				// ================= 시작 년도  ===================
				cell = document.createElement("td");
				var sgis_census_id = $('input:radio[name=sgis_census_id]:checked').val();
				var grid_base_year = $('#grid_base_year').html();

				if(sgis_census_id != 8){

					try {
						input = document.createTextNode(document.censusFm.sgis_census_year_id.options[document.censusFm.sgis_census_year_id.selectedIndex].text);
					} catch(e) {
						input = document.createTextNode(document.censusFm.sgis_census_year_id.options[document.censusFm.sgis_census_year_id.selectedIndex].text);
					}
				}else if(sgis_census_id == 8 && $("input[name='sgis_census_data_id']:checked").val() ==1){
					input =  document.createTextNode(document.censusFm.sgis_census_year_id.options[document.censusFm.sgis_census_year_id.selectedIndex].text);
				}else if(sgis_census_id == 8 && $("input[name='sgis_census_data_id']:checked").val() ==0){
					input =  document.createTextNode(grid_base_year);
				}else{
					input =  document.createTextNode("--");
				}
				cell.appendChild(input);

				try {
					input = document.createElement(
							"<input type='hidden' name='sgis_census_year_id_new' id='sgis_census_year_id" + idx + "'"
							+ " value='" + document.censusFm.sgis_census_year_id.options[document.censusFm.sgis_census_year_id.selectedIndex].value + "' >"
						);
				} catch(e) {
					input = document.createElement("input");
					input.setAttribute("type", "hidden");
					input.setAttribute("name", "sgis_census_year_id_new");
					input.setAttribute("id", "sgis_census_year_id"+idx);

					var sgis_census_id = $('input:radio[name=sgis_census_id]:checked').val();
					if(sgis_census_id != 8) input.setAttribute("value", document.censusFm.sgis_census_year_id.options[document.censusFm.sgis_census_year_id.selectedIndex].value);
					else if(sgis_census_id == 8 && $("input[name='sgis_census_data_id']:checked").val() ==1)input.setAttribute("value", document.censusFm.sgis_census_year_id.options[document.censusFm.sgis_census_year_id.selectedIndex].value);
					else if(sgis_census_id == 8 && $("input[name='sgis_census_data_id']:checked").val() ==0)input.setAttribute("value", grid_base_year);
					else 					 input.setAttribute("value", "");
				}
				cell.appendChild(input);

				

				row.appendChild(cell);
				// ================= 끝 년도   ===================

				//============================== 시작 세부자료명 ====================================
				cell = document.createElement("td");

				var census_output_data_type = $('input:radio[name="census_output_data_type"]:checked').val();

				var title = sgis_census_detail_data_nm;
				var spanText;

				if(census_output_data_type == 2 && sgis_census_id ==  7){
					title =  map_code_nm+" "+title;
				}else if(census_output_data_type == 2 && sgis_census_id ==  8 &&  sgis_census_data_id ==  0 ) {

					title =  map_code_nm;
					var input2;
					spanText = document.createElement("div");
					input2 = document.createElement("span");
					input2.setAttribute("style", "font-size:10px");
					input2.appendChild(document.createTextNode("(100K,10K,1K,500M,100M)"));
					spanText.appendChild(input2);

				}

				if(title == "")title = "-";


				input = document.createTextNode(title);
				cell.appendChild(input);

				if(census_output_data_type == 2 && sgis_census_id ==  8  && sgis_census_data_id ==  0 ){
					cell.appendChild(spanText);
				}





				if(census_output_data_type == 1 || census_output_data_type == 7 || census_output_data_type == 4){

					if(sgis_census_detail_data_id == "" || sgis_census_detail_data_id == null)sgis_census_detail_data_id ="-";

					try {
						input = document.createElement(
								"<input type='hidden' name='sgis_census_detail_data_id_new' id='sgis_census_detail_data_id" + idx + "'" + " value='" + sgis_census_detail_data_id + "'/>"
							);
					} catch(e) {
						input = document.createElement("input");
						input.setAttribute("type", "hidden");
						input.setAttribute("name", "sgis_census_detail_data_id_new");
						input.setAttribute("id", "sgis_census_detail_data_id"+idx);
						input.setAttribute("value", sgis_census_detail_data_id);
					}
					cell.appendChild(input);

					try {
						input = document.createElement(
								"<input type='hidden' name='census_output_data_type_new' id='census_output_data_type" + idx + "'" + " value='" + census_output_data_type + "'/>"
							);
					} catch(e) {
						input = document.createElement("input");
						input.setAttribute("type", "hidden");
						input.setAttribute("name", "census_output_data_type_new");
						input.setAttribute("id", "census_output_data_type"+idx);
						input.setAttribute("value", census_output_data_type);
					}
					cell.appendChild(input);

					try {
						input = document.createElement(
								"<input type='hidden' name='sgis_census_req_map_level' id='sgis_census_req_map_level" + idx + "'" + " value='-'/>"
							);
					} catch(e) {
						input = document.createElement("input");
						input.setAttribute("type", "hidden");
						input.setAttribute("name", "sgis_census_req_map_level");
						input.setAttribute("id", "sgis_census_req_map_level"+idx);
						input.setAttribute("value", "-");
					}
					cell.appendChild(input);


				}else{

					try {
						input = document.createElement(
								"<input type='hidden' name='sgis_census_detail_data_id_new' id='sgis_census_detail_data_id" + idx + "'" + " value='-'/>"
							);
					} catch(e) {
						input = document.createElement("input");
						input.setAttribute("type", "hidden");
						input.setAttribute("name", "sgis_census_detail_data_id_new");
						input.setAttribute("id", "sgis_census_detail_data_id"+idx);
						input.setAttribute("value", "-");
					}
					cell.appendChild(input);

					try {
						input = document.createElement(
								"<input type='hidden' name='census_output_data_type_new' id='census_output_data_type" + idx + "'" + " value='" + census_output_data_type + "'/>"
							);
					} catch(e) {
						input = document.createElement("input");
						input.setAttribute("type", "hidden");
						input.setAttribute("name", "census_output_data_type_new");
						input.setAttribute("id", "census_output_data_type"+idx);
						input.setAttribute("value", census_output_data_type);
					}
					cell.appendChild(input);

					try {
						input = document.createElement(
								"<input type='hidden' name='sgis_census_req_map_level' id='sgis_census_req_map_level" + idx + "'" + " value='" + sgis_census_detail_data_nm + "'/>"
							);
					} catch(e) {
						input = document.createElement("input");
						input.setAttribute("type", "hidden");
						input.setAttribute("name", "sgis_census_req_map_level");
						input.setAttribute("id", "sgis_census_req_map_level"+idx);
						input.setAttribute("value", sgis_census_detail_data_nm);
					}
					cell.appendChild(input);

				}



				row.appendChild(cell);
				//============================== 끝 세부자료명 ====================================

				// ================= 시도 td 시작 ===================
				cell = document.createElement("td");
				//2021년 SGIS4_자료제공 시작
				var sgis_census_data_id = $('input:radio[name="sgis_census_id"]:checked').val();


				if(sgis_census_data_id == 5){
					try {
						input = document.createTextNode("--");
					} catch(e) {
						input = document.createTextNode("--");
					}
					cell.appendChild(input);

					try {
						input = document.createElement(
								"<input type='hidden' name='sgis_census_sido_id_new' id='sgis_census_sido_id" + idx + "'"
								+ " value='--' >"
							);
					} catch(e) {
						input = document.createElement("input");
						input.setAttribute("type", "hidden");
						input.setAttribute("name", "sgis_census_sido_id_new");
						input.setAttribute("id", "sgis_census_sido_id"+idx);
						input.setAttribute("value", "--");
					}
					cell.appendChild(input);

					try {
						input = document.createElement(
								"<input type='hidden' name='sgis_census_req_map_code' id='sgis_census_req_map_code" + idx + "'"+ " value='-' >"
							);
					} catch(e) {
						input = document.createElement("input");
						input.setAttribute("type", "hidden");
						input.setAttribute("name", "sgis_census_req_map_code");
						input.setAttribute("id", "sgis_census_req_map_code"+idx);
						input.setAttribute("value", "-");
					}

				}else if(census_output_data_type == 2){

					try {
						input = document.createTextNode("--");
					} catch(e) {
						input = document.createTextNode("--");
					}
					cell.appendChild(input);

					try {
						input = document.createElement(
								"<input type='hidden' name='sgis_census_sido_id_new' id='sgis_census_sido_id" + idx + "'"+ " value='-' >"
							);
					} catch(e) {
						input = document.createElement("input");
						input.setAttribute("type", "hidden");
						input.setAttribute("name", "sgis_census_sido_id_new");
						input.setAttribute("id", "sgis_census_sido_id"+idx);
						input.setAttribute("value", "--");
					}

					cell.appendChild(input);

					try {
						input = document.createElement(
								"<input type='hidden' name='sgis_census_req_map_code' id='sgis_census_req_map_code" + idx + "'"+ " value='"+map_code+"' >"
							);
					} catch(e) {
						input = document.createElement("input");
						input.setAttribute("type", "hidden");
						input.setAttribute("name", "sgis_census_req_map_code");
						input.setAttribute("id", "sgis_census_req_map_code"+idx);
						input.setAttribute("value", map_code);
					}



				}else{
					try {
						input = document.createTextNode(document.censusFm.sgis_census_sido_id.options[document.censusFm.sgis_census_sido_id.selectedIndex].text);
					} catch(e) {
						input = document.createTextNode(document.censusFm.sgis_census_sido_id.options[document.censusFm.sgis_census_sido_id.selectedIndex].text);
						//input = document.createTextNode("--");
					}
					cell.appendChild(input);

					try {
						input = document.createElement(
								"<input type='hidden' name='sgis_census_sido_id_new' id='sgis_census_sido_id" + idx + "'"
								+ " value='" + document.censusFm.sgis_census_sido_id.options[document.censusFm.sgis_census_sido_id.selectedIndex].value + "' >"
							);
					} catch(e) {
						input = document.createElement("input");
						input.setAttribute("type", "hidden");
						input.setAttribute("name", "sgis_census_sido_id_new");
						input.setAttribute("id", "sgis_census_sido_id"+idx);
						input.setAttribute("value", document.censusFm.sgis_census_sido_id.options[document.censusFm.sgis_census_sido_id.selectedIndex].value);
						//input.setAttribute("value","");
					}
					cell.appendChild(input);

					try {
						input = document.createElement(
								"<input type='hidden' name='sgis_census_req_map_code' id='sgis_census_req_map_code" + idx + "'"+ " value='-' >"
							);
					} catch(e) {
						input = document.createElement("input");
						input.setAttribute("type", "hidden");
						input.setAttribute("name", "sgis_census_req_map_code");
						input.setAttribute("id", "sgis_census_req_map_code"+idx);
						input.setAttribute("value", "-");
					}

				}
				cell.appendChild(input);
				row.appendChild(cell);
				//2021년 SGIS4_자료제공 끝
				// ================= 시도 td 끝 ===================

				// ================= 시군구 td 시작 ===================
				cell = document.createElement("td");
				//2021년 SGIS4_자료제공 시작
				if(sgis_census_data_id == 5 || census_output_data_type ==2){
					try {
						input = document.createTextNode("--");
					} catch(e) {
						input = document.createTextNode("--");
					}
					cell.appendChild(input);

					try {
						input = document.createElement(
								"<input type='hidden' name='sgis_census_sigungu_id_new' id='sgis_census_sigungu_id" + idx + "'"
								+ " value='--' >"
							);
					} catch(e) {
						input = document.createElement("input");
						input.setAttribute("type", "hidden");
						input.setAttribute("name", "sgis_census_sigungu_id_new");
						input.setAttribute("id", "sgis_census_sigungu_id"+idx);
						input.setAttribute("value", "--");
					}
				}else{

				try {
					input = document.createTextNode(document.censusFm.sgis_census_sigungu_id.options[document.censusFm.sgis_census_sigungu_id.selectedIndex].text);
				} catch(e) {
					//input = document.createTextNode(document.censusFm.sgis_census_sigungu_id.options[document.censusFm.sgis_census_sigungu_id.selectedIndex].text);
					input = document.createTextNode("--");
				}
				cell.appendChild(input);
				try {

					input = document.createElement(
							"<input type='hidden' name='sgis_census_sigungu_id_new' id='sgis_census_sigungu_id" + idx + "'"
							+ " value='" + document.censusFm.sgis_census_sigungu_id.options[document.censusFm.sgis_census_sigungu_id.selectedIndex].value + "' >");
				} catch(e) {
					input = document.createElement("input");
					input.setAttribute("type", "hidden");
					input.setAttribute("name", "sgis_census_sigungu_id_new");
					input.setAttribute("id", "sgis_census_sigungu_id"+idx);
					input.setAttribute("value", document.censusFm.sgis_census_sigungu_id.options[document.censusFm.sgis_census_sigungu_id.selectedIndex].value);
					//input.setAttribute("value", "");
					}
				}
				cell.appendChild(input);
				row.appendChild(cell);
				//2021년 SGIS4_자료제공 끝

				// ================= 시군구 td 끝 ===================
					
				// ================= 집계년도 td 시작 ===================
				cell = document.createElement("td");
				//2021년 SGIS4_자료제공 시작
	
				
				//var census_output_area_dts_year = $('#census_output_area_year:selected').text();
				var census_output_area_dts_year_text = $("#census_output_area_year option:checked").text();
				var census_output_area_dts_year_value = $("#census_output_area_year option:checked").val();
				
				
				if(sgis_census_id == 7 || sgis_census_id ==8){
					census_output_area_dts_year_text = "-";
					census_output_area_dts_year_value = "-";
				}
				
				if(sgis_census_id == 2 && $("input[name='sgis_census_data_id']:checked").val() ==7){
					census_output_area_dts_year_text = "-";
					census_output_area_dts_year_value = "-";
				}
				input = document.createTextNode(census_output_area_dts_year_text);
				cell.appendChild(input);
				
				input = document.createElement("input");
				input.setAttribute("type", "hidden");
				input.setAttribute("name", "census_output_area_dts_year_new");
				input.setAttribute("id", "census_output_area_dts_year_new"+idx);
				input.setAttribute("value", census_output_area_dts_year_value);
				cell.appendChild(input);
				
				row.appendChild(cell);
				//2021년 SGIS4_자료제공 끝

				// ================= 집계년도 td 끝 ===================

				// ================= 추가/삭제 시작 ===================
				cell = document.createElement("td");

				try {
					input = document.createElement("<img src='/contents/design_2015/images/button_delete2.png' style='cursor:hand;' alt='삭제' onclick=\"document.getElementById('a" + idx + "').checked = true; delTable(); return false;\" />");
				} catch(e) {
					input = document.createElement("img");
					input.setAttribute("src", "/contents/design_2015/images/button_delete2.png");
					input.setAttribute("alt", "삭제");
					input.setAttribute("style", "cursor:hand");
					input.setAttribute("onclick", "document.getElementById('a" + idx + "').checked = true; delTable(); return false;");
				}
				cell.appendChild(input);
				row.appendChild(cell);
				// ================= 추가/삭제 끝 ===================

				myTbody.appendChild(row);
			}

			function addTableArea(map_code,map_code_nm) {
				var myTable = document.getElementById("sgis_census_table");
				var myTbody = myTable.getElementsByTagName("tbody")[0];
				idx++;
				var row = document.createElement("tr");
				var cell = document.createElement("td");
				var input, span, label;
				var iframeName = "detailMenuIfr"+idx;
				var iframeId = "sgis_census_data_id"+idx;
				var selectId = "sgis_census_id"+idx;
				var yearId = "sgis_census_year"+idx;
				var inUseId = "inUse"+idx;
				var yearsId = "years"+idx;
				
				var sgis_census_id = 8;
				var sgis_census_data_id = 0;
				var census_output_data_type = 2;
				
				//증복체크 추가
				var flag = false;
				
				
				
				$('#sgis_census_table tr').each(function(){
					
					var checkFlag = 0;
					
					var sgis_census_id_new = $(this).find("input[name='sgis_census_id_new']").val();                          //자료구분
					var sgis_census_data_id_new = $(this).find("input[name='sgis_census_data_id_new']").val();                //재상자료명
					var census_output_data_type_new = $(this).find("input[name='census_output_data_type_new']").val();        //자료형태
					var sgis_census_req_map_code = $(this).find("input[name='sgis_census_req_map_code']").val();              //격자코드
					
					if(sgis_census_id_new == sgis_census_id)checkFlag++;                    //자료구분
					if(sgis_census_data_id_new == sgis_census_data_id)checkFlag++;          //자료대상
					if(census_output_data_type_new == census_output_data_type)checkFlag++;  //자료형태

					if(sgis_census_data_id == 1){
						if(sgis_census_year_id_new == sgis_census_year_id)checkFlag++;          //년도
					}else{
						if(map_code == sgis_census_req_map_code) checkFlag++;
					}

					if(checkFlag == 4){
						flag= true;
					}
					
				});
				
				if(flag){
					return "";
				}


				try {
					input = document.createElement("<span class='board-choice-check check-area'><input type='checkbox' name='cbox' id='a"+idx+"' class='check'/><label for='a"+idx+"'>선택</label></span>");
					cell.appendChild(input);
					row.appendChild(cell);
				} catch(e) {
					span = document.createElement("span");
					span.setAttribute("class", "board-choice-check check-area");

					input = document.createElement("input");
					input.setAttribute("type", "checkbox");
					input.setAttribute("name", "cbox");
					input.setAttribute("id", "a"+idx);
					input.setAttribute("class", "check");

					label = document.createElement("label");
					label.setAttribute("for", "a"+idx);

					labelText = document.createTextNode("선택");

					label.appendChild(labelText);

					span.appendChild(input);
					span.appendChild(label);

					cell.appendChild(span);
					row.appendChild(cell);
				}

				//============================== 시작 자료구분 ====================================
				cell = document.createElement("td");

				
				var sgis_census_nm = $("label[for='"+$('input:radio[name=sgis_census_id]:checked').attr("id")+"']").text();

				input = document.createTextNode("경계");
				cell.appendChild(input);

				input = document.createElement("input");
				input.setAttribute("type", "hidden");
				input.setAttribute("name", "sgis_census_id_new");
				input.setAttribute("id", "sgis_census_id"+idx);
				input.setAttribute("value", "8");

				cell.appendChild(input);
				row.appendChild(cell);
				//============================== 끝 자료구분 ====================================

				//============================== 시작 대상자료명 ====================================
				cell = document.createElement("td");

				
				var data_id = $('input:radio[name=sgis_census_data_id]:checked').attr("id");
				var sgis_census_data_nm = $('label[for='+data_id+']').text();//2019-03-12 박길섭

				input = document.createTextNode("격자경계");
				cell.appendChild(input);

				input = document.createElement("input");
				input.setAttribute("type", "hidden");
				input.setAttribute("name", "sgis_census_data_id_new");
				input.setAttribute("id", "sgis_census_data_id"+idx);
				input.setAttribute("value", "0");

				cell.appendChild(input);
				row.appendChild(cell);
				//============================== 끝 대상자료명 ====================================

				// ================= 시작 년도  ===================
					
				var grid_base_year =  $('#grid_base_year').html();	
				cell = document.createElement("td");
				input = document.createTextNode(grid_base_year);
				cell.appendChild(input);

				input = document.createElement("input");
				input.setAttribute("type", "hidden");
				input.setAttribute("name", "sgis_census_year_id_new");
				input.setAttribute("id", "sgis_census_year_id"+idx);
				input.setAttribute("value", grid_base_year);
				cell.appendChild(input);


				row.appendChild(cell);
				// ================= 끝 년도   ===================

				//============================== 시작 세부자료명 ====================================
				cell = document.createElement("td");

				

				var title = map_code;


				var spanText;

				var input2;
				spanText = document.createElement("div");
				input2 = document.createElement("span");
				input2.setAttribute("style", "font-size:10px");
				input2.appendChild(document.createTextNode("(100K,10K,1K,500M,100M)"));
				spanText.appendChild(input2);

				input = document.createTextNode(title);
				cell.appendChild(input);



				cell.appendChild(spanText);

				input = document.createElement("input");
				input.setAttribute("type", "hidden");
				input.setAttribute("name", "sgis_census_detail_data_id_new");
				input.setAttribute("id", "sgis_census_detail_data_id"+idx);
				input.setAttribute("value", "-");


				cell.appendChild(input);


				input = document.createElement("input");
				input.setAttribute("type", "hidden");
				input.setAttribute("name", "census_output_data_type_new");
				input.setAttribute("id", "census_output_data_type"+idx);
				input.setAttribute("value", "2");
				cell.appendChild(input);

				input = document.createElement("input");
				input.setAttribute("type", "hidden");
				input.setAttribute("name", "sgis_census_req_map_level");
				input.setAttribute("id", "sgis_census_req_map_level"+idx);
				input.setAttribute("value", "");
				cell.appendChild(input);

				row.appendChild(cell);

				//============================== 끝 세부자료명 ====================================

				// ================= 시도 td 시작 ===================
				cell = document.createElement("td");
				//2021년 SGIS4_자료제공 시작
				var sgis_census_data_id = $('input:radio[name="sgis_census_id"]:checked').val();

				input = document.createTextNode("--");
				cell.appendChild(input);

				input = document.createElement("input");
				input.setAttribute("type", "hidden");
				input.setAttribute("name", "sgis_census_sido_id_new");
				input.setAttribute("id", "sgis_census_sido_id"+idx);
				input.setAttribute("value", "--");

				cell.appendChild(input);

				input = document.createElement("input");
				input.setAttribute("type", "hidden");
				input.setAttribute("name", "sgis_census_req_map_code");
				input.setAttribute("id", "sgis_census_req_map_code"+idx);
				input.setAttribute("value", map_code);

				cell.appendChild(input);
				row.appendChild(cell);
				//2021년 SGIS4_자료제공 끝
				// ================= 시도 td 끝 ===================

				// ================= 시군구 td 시작 ===================
				cell = document.createElement("td");
				//2021년 SGIS4_자료제공 시작
				input = document.createTextNode("--");
				cell.appendChild(input);

				input = document.createElement("input");
				input.setAttribute("type", "hidden");
				input.setAttribute("name", "sgis_census_sigungu_id_new");
				input.setAttribute("id", "sgis_census_sigungu_id"+idx);
				input.setAttribute("value", "--");

				cell.appendChild(input);
				row.appendChild(cell);
				//2021년 SGIS4_자료제공 끝

				// ================= 시군구 td 끝 ===================
					
				// ================= 집계년도 td 시작 ===================
				cell = document.createElement("td");
				//2021년 SGIS4_자료제공 시작
	
				
				var census_output_area_dts_year = $("#census_output_area_year option:checked").text();
				var yearValue = $('#census_output_area_year').val();
				
				if(sgis_census_id == 7 || sgis_census_id ==8){
					census_output_area_dts_year = "-";
					yearValue ="-";
				}
				
				input = document.createTextNode(census_output_area_dts_year);
				cell.appendChild(input);
				
				input = document.createElement("input");
				input.setAttribute("type", "hidden");
				input.setAttribute("name", "census_output_area_dts_year_new");
				input.setAttribute("id", "census_output_area_dts_year_new"+idx);
				input.setAttribute("value", "-");
				cell.appendChild(input);
				
				row.appendChild(cell);
				//2021년 SGIS4_자료제공 끝

				// ================= 집계년도 td 끝 ===================

				// ================= 추가/삭제 시작 ===================
				cell = document.createElement("td");

				try {
					input = document.createElement("<img src='/contents/design_2015/images/button_delete2.png' style='cursor:hand;' alt='삭제' onclick=\"document.getElementById('a" + idx + "').checked = true; delTable(); return false;\" />");
				} catch(e) {
					input = document.createElement("img");
					input.setAttribute("src", "/contents/design_2015/images/button_delete2.png");
					input.setAttribute("alt", "삭제");
					input.setAttribute("style", "cursor:hand");
					input.setAttribute("onclick", "document.getElementById('a" + idx + "').checked = true; delTable(); return false;");
				}
				cell.appendChild(input);
				row.appendChild(cell);
				// ================= 추가/삭제 끝 ===================

				myTbody.appendChild(row);
			}

			function delTable() {
				var mss = true;
				var myTable = document.getElementById("sgis_census_table");
				var myTbody = myTable.getElementsByTagName("tbody")[0];
				var len = myTbody.rows.length;

				if(document.getElementsByName("cbox")[0] == "undefined" || document.getElementsByName("cbox")[0] == null) {
					alert("자료추가 후 삭제할 체크박스를 선택하세요");
					return false;
				}

				for(var i = 0; i < len; i++) {
					if(document.getElementsByName("cbox")[i].checked == true) {
						myTbody.deleteRow(i);
						i--;
						len--;
						mss = false;
					}
				}
				//2021년 SGIS4_자료제공 시작
				var len = $('#sgis_census_table tr').length - 1;
				$('strong[id=listCnt]').text(len);
				//2021년 SGIS4_자료제공 끝
				document.getElementById("sgis_all").checked = false;

				if(mss == true) {
					alert("삭제할 체크박스를 선택하세요");
				}
			}

			function allCheck(){
				var len = document.getElementsByName("cbox").length;
				if(document.getElementById("sgis_all").checked == true) {
					for(var i = 0; i<len; i++) {
						document.getElementsByName("cbox")[i].checked = true;
					}
				} else {
					for(var i = 0; i<len; i++) {
						document.getElementsByName("cbox")[i].checked = false;
					}
				}
			}

			var toggle_cbox = "1";
			function toggleCheck() {
				if(toggle_cbox == "1") {
					document.getElementById("sgis_all").checked = true;
					allCheck();
					toggle_cbox = "2";
				} else if(toggle_cbox == "2") {
					document.getElementById("sgis_all").checked = false;
					allCheck();
					toggle_cbox = "1";
				}
			}

			function onChangeDataType(){

				var obj = $("input[name='census_output_data_type']:checked").val();
			 	if(obj == 2){

			 		$('.data_type_1').hide();
			 		$('.data_type_2').hide();
			 		$('#sgsi_year_tr').hide();
			 		$('#sgis_map_div').show();
			 		$('#census_output_Year_tr').hide();

					$('.select_Type_1').hide();
					$('.select_Type_2').show();

					/* $("lable[for=changeLable1]").text("자료대상"); */
					$('#changeLable1').hide();
					$('#changeLable2').show();
					
					//$('#census_output_area_year').reset();
					//$('#census_output_area_year').prop("selected", false); 

			 		setSgisMap();
			 		//$('#map_code_input_list').hide();
					//$('#sgis_map_div').hide();

			 	}else if(obj == 1){

			 		$('.data_type_1').show();
			 		$('.data_type_2').hide();

			 		$('#sgsi_year_tr').show();
			 		$('#sgis_map_div').empty();
			 		$('#sgis_map_div').hide();

			 		$('.select_Type_1').show();
					$('.select_Type_2').hide();

			 		$('#sgis_map_select_data_tr').empty();
			 		$('#sgis_map_select_data_tr').hide();
			 		$('#census_output_Year_tr').show();

			 		//$("lable[for=changeLable1]").text("자료대상(집계구별)");
			 		$('#changeLable1').show();
					$('#changeLable2').hide();

			 		//selectMapData = new Array(); //
					selectBoxData = new Array(); //


			 		/* 세부자료명,시도/시군구 초기화 */
			 		//$("#option_detail_data").empty();
					//$("#option_detail_data").attr("class", "");
			 		//$("#option_sido").empty();
					//$("#option_sigungu").empty();
					//$('#option_sido').attr("class", "");
					//$('#option_sigungu').attr("class", "");

			 	}else{
			 		$('.data_type_2').show();
			 		$('.data_type_1').hide();
			 	}

			 	$("input[name='sgis_census_id']:checked").prop("checked",false);
				$("#option_data").empty();
	 			$("#option_grid").empty();
				$("#option_year").empty();
				$("#option_detail_data").empty();
				$("#option_sido").empty();
				$("#option_sigungu").empty();
				$('#sgis_leve_ul_1').empty();
				$('#sgis_leve_ul_2').empty();

				$('.sggi_Levle_tr').hide();
				$('.sgis_Levle_ul').hide();
				$('.sgis_map_code_tr').hide();

				//$('.sgis_Levle_ul').hide();

				$("#option_year").attr("class", "");
				$('#option_sido').attr("class", "");
				$('#option_sigungu').attr("class", "");

			}

			function setSgisMap(){

				$('#sgis_map_select_data_tr').empty();
				$('#sgis_map_div').empty();

				$.ajax({
					type: "POST",
					url: "/view/pss/requestGridMap",
					success:function(data){
						$('#sgis_map_div').hide();
						$('#sgis_map_div').html(data);
					},
					error:function(data) {}
				});

				$.ajax({
					type: "POST",
					url: "/view/pss/requestGridMapSub",
					success:function(data){
						$('#sgis_map_select_data_tr').show();
						$('#sgis_map_select_data_tr').html(data);
					},
					error:function(data) {}
				});




			}

			function arearallCheck(t){
				var value = $(t).val();
				if(value == "all"){
					if($(t).is(':checked')) {
						$('input:checkbox[name=sgis_census_level_area]').prop('checked', true);
					}else{
						$('input:checkbox[name=sgis_census_level_area]').prop('checked', false);
					}
				}else{
					if(!$(t).is(':checked')) {
						$('input:checkbox[name=sgis_census_level_area]').eq(0).prop('checked', false);
					}else{
						if($('input:checkbox[name=sgis_census_level_area]:checked').length>=5){
							$('input:checkbox[name=sgis_census_level_area]').eq(0).prop('checked', true);
						}
					}
				}
			}
		</script>

		<!-- mng_s 20200723 이진호 / 자료제공 서비스 개편 -->
		<!-- location 마지막 꺽쇠 제거 -->
		<style>
			#title-area .location li:nth-child(3):after {
				content : none;
			}
		</style>
		<!-- mng_e 20200723 이진호 -->

	</head>
	<body>
		<!--wrap-->
		<div id="wrap">
			<!--header-->
			<header>
				<jsp:include page="/view/common/includeSearch"></jsp:include>
			</header>
			<!--//header-->
			<!--contents-->
			<div id="container" class="sub">

				<!-- mng_s 20200721 이진호 / 자료제공 서비스 개편 -->
				<!--lnb 시작-->
				<%--<jsp:include page="/jsp/board/includeLeftMenu.jsp"></jsp:include> --%>
				<jsp:include page="/jsp/board/includeLeftMenu_shortcut.jsp"></jsp:include>
				<!--//lnb 끝-->
				<!-- mng_e 20200721 이진호 -->

				<div id="content">
					<div id="title-area">
						<ul class="location">
						<!-- 190313 방민정 수정 시작 -->
							<li><a href="/view/view/index"><img src="/images/common/location_home.gif"/></a></li>

							<!-- mng_s 20200723 이진호 / 자료제공 서비스 개편 -->
							<!--<li><a href="/view/board/sopBoardMain">알림마당</a></li> -->
							<!--<li><a href="/contents/shortcut/shortcut_05_02.jsp">자료신청 서비스</a></li> -->
							<li><a href="/contents/shortcut/shortcut_05_02.jsp">자료제공</a></li>
							<li><a href="/contents/shortcut/shortcut_05_03_step01.jsp"><em>자료신청</em></a></li>
							<!-- mng_e 20200723 이진호 -->

						<!-- 190313 방민정 수정 끝 -->
						</ul>
						<h1 class="sub-title">자료신청</h1>
					</div>

					<!--
					<div class="step-box">
						<ul>
							<li>
								<p class="num">01</p>
								<p class="text">기본정보 입력 및 약관동의</p>
							</li>
							<li class="on">
								<p class="num">02</p>
								<p class="text">자료선택  및 신청완료</p>
							</li>
						</ul>
					</div>
					 -->

					<!--view-->
					<div id="contents" class="view">
						<form id="censusFm_id" name="censusFm" method="post" action="shortcut_05_03_apply.jsp" onsubmit="return applyClicked();">
							<input type="hidden" name="param_userkey" value="<%= sc_userkey %>" />
							<input type="hidden" name="aT" value="<%=lData.getString("aT") %>" />
							<input type="hidden" name="sgis_census_req_id" value="<%=lData.getString("sgis_census_req_id") %>" />
							<input type="hidden" name="old_census_file" value="<%=sgis_census_req_file %>" />
							<input type="hidden" name="inUse" id="inUse1" />
							<input type="hidden" name="years" id="years1" />
							<input type="hidden" name="sgis_census_req_sosok_nm" id="sgis_census_req_sosok_nm"/>
							<input type="hidden" name="sgis_census_req_mokjuk_nm" id="sgis_census_req_mokjuk_nm"/>

							<h2>기본정보</h2>
							<div class="table-type">
								<p class="required"><em title="필수 항목">*</em> 는 필수 입력 항목입니다.</p>
								<table class="table-style type02">
									<colgroup>
										<col style="width:160px;">
										<col style="width:auto;">
									</colgroup>
									<tbody>
										<tr>
											<th scope="row"><label>성명(신청인)</label></th>
											<td><%=sc_username %></td>
										</tr>
										<tr>
											<th scope="row"><label for="sgis_census_req_sosok">소속<em>*</em></label></th>
											<td>
												<div class="select-wrap">
													<select name="sgis_census_req_sosok" id="sgis_census_req_sosok" style="width:250px;" title="기관유형 선택">
														<option value="">소속구분 선택</option>
														<c:forEach var="codeList" items="${sgisCensusCode}">
															<option value="${codeList.sclas_cl}" <c:if test="${codeList.sclas_cl eq sgis_census_req_sosok}"> selected</c:if> >${codeList.sclas_nm}</option>
														</c:forEach>
													</select>
												</div>
												<span>
													<input type="text" name="sgis_census_req_company" id="sgis_census_req_company" title="소속" style="width:200px;" maxlength="20" value="<%=sgis_census_req_company %>" />
												</span>
											</td>
										</tr>
										<tr>
											<th scope="row"><label for="sgis_census_req_tel_1">연락처<em>*</em></label></th>
											<td>
												<%
													String tel_1 = "";
													String tel_2 = "";
													String tel_3 = "";
													if(sgis_census_req_tel.split("-").length == 3) { //자료신청이 있을 경우
														tel_1 = sgis_census_req_tel.substring(0, sgis_census_req_tel.indexOf("-"));
														tel_2 = sgis_census_req_tel.substring(sgis_census_req_tel.indexOf("-")+1, sgis_census_req_tel.lastIndexOf("-"));
														tel_3 = sgis_census_req_tel.substring(sgis_census_req_tel.lastIndexOf("-")+1);
													} else { //자료신청을 아직 하지 않은 경우 로그인 세션 정보로 처리
														if(sc_telephone != null) {
															if(sc_telephone.split("-").length == 3 ) {
																tel_1 = sc_telephone.substring(0, sc_telephone.indexOf("-"));
																tel_2 = sc_telephone.substring(sc_telephone.indexOf("-")+1, sc_telephone.lastIndexOf("-"));
																tel_3 = sc_telephone.substring(sc_telephone.lastIndexOf("-")+1);
															}
														}
													}
												%>
												<span class="input_area"><input type="text" name="sgis_census_req_tel_1" id="sgis_census_req_tel_1" style="width: 97px;" title="연락처 앞번호" maxlength="3" class="inp" value="<%=tel_1 %>" onkeyup="chkNumber(this);"></span> -
												<span class="input_area"><input type="text" name="sgis_census_req_tel_2" id="sgis_census_req_tel_2" style="width: 97px;" title="연락처 가운데번호" maxlength="4" class="inp" value="<%=tel_2 %>" onkeyup="chkNumber(this);"></span> -
												<span class="input_area"><input type="text" name="sgis_census_req_tel_3" id="sgis_census_req_tel_3" style="width: 97px;" title="연락처 뒷번호" maxlength="4" value="<%=tel_3 %>" onkeyup="chkNumber(this);"></span>
											</td>
										</tr>
										<tr>
											<th scope="row"><label for="email_id">메일주소<em>*</em></label></th>
											<td>
												<%
													String email_id = "";
													String email_addr = "";
													if(sgis_census_req_email != null && sgis_census_req_email != "") {
														email_id = sgis_census_req_email.substring(0, sgis_census_req_email.indexOf("@"));
														email_addr = sgis_census_req_email.substring(sgis_census_req_email.indexOf("@")+1);
													}
													else if(!StringUtil.isEmpty(sc_email) && sc_email.split("@").length == 2) {
														email_id = sc_email.substring(0, sc_email.indexOf("@"));
														email_addr = sc_email.substring(sc_email.indexOf("@")+1);
													}
												%>
										        <span><input type="text" name="email_id" id="email_id" title="메일주소" style="width:120px;" maxlength="200" value="<%=email_id %>"/></span>
							                	@
							                	<span><input type="text" id="email_addr" name="email_addr" style="width:120px;"  maxlength="200" value="<%=email_addr %>" /></span>

													<div class="select-wrap">
														<select name="email_addr_select" id="email_addr_select" style="width: 155px;" onchange="in_email_addr(this)">
								                			<option value="">= 선택 =</option>
								                			<option value="naver.com" <% if("naver.com".equals(email_addr)) { %>selected="selected"<% } %>>naver.com</option>
								                			<option value="nate.com" <% if("nate.com".equals(email_addr)) { %>selected="selected"<% } %>>nate.com</option>
								                			<option value="hanmail.net" <% if("hanmail.net".equals(email_addr)) { %>selected="selected"<% } %>>hanmail.net</option>
								                			<option value="gmail.com" <% if("gmail.com".equals(email_addr)) { %>selected="selected"<% } %>>gmail.com</option>
								                			<option value="hotmail.com" <% if("hotmail.com".equals(email_addr)) { %>selected="selected"<% } %>>hotmail.com</option>
								                			<option value="yahoo.co.kr" <% if("yahoo.co.kr".equals(email_addr)) { %>selected="selected"<% } %>>yahoo.co.kr</option>
								                			<option value="empal.com" <% if("empal.com".equals(email_addr)) { %>selected="selected"<% } %>>empal.com</option>
								                			<option value="dreamwiz.com" <% if("dreamwiz.com".equals(email_addr)) { %>selected="selected"<% } %>>dreamwiz.com</option>
								                			<option value="freechal.com" <% if("freechal.com".equals(email_addr)) { %>selected="selected"<% } %>>freechal.com</option>
								                			<option value="netian.com" <% if("netian.com".equals(email_addr)) { %>selected="selected"<% } %>>netian.com</option>
								                			<option value="write">직접입력</option>
								                		</select>
													</div>
											</td>
										</tr>
										<tr>
											<th scope="row"><label for="sgis_census_req_mokjuk">요청목적<em>*</em></label></th>
											<td>
												<span class="select-wrap">
													<select name="sgis_census_req_mokjuk" id="sgis_census_req_mokjuk" style="width: 250px;" title="요청목적" >
														<option value="">= 선택 =</option>

														<c:forEach var="codeList" items="${purposeCode}">
															<option value="${codeList.sclas_cl}" <c:if test="${codeList.sclas_cl eq sgis_census_req_mokjuk}"> selected</c:if>>${codeList.sclas_nm}</option>
														</c:forEach>

													</select>
												</span>
											</td>
										</tr>
										<tr>
											<th scope="row"><label for="sgis_census_req_goal">활용목적<em>*</em></label></th>
											<td class="color">
												<!-- onmouseover="tooltip.show('100자이상 구체적으로&lt;br/&gt; 작성해주세요',180,10,-70)" onmouseout="tooltip.hide();" onfocus="tooltip.hide();" -->
												<textarea name="sgis_census_req_goal" id="sgis_census_req_goal" onkeyup="len_chk2('500');"><%=sgis_census_req_goal %></textarea>
												<div class="coment mt8 mb5">※ 100자 이상 구체적으로 작성해 주세요.</div>
											</td>
										</tr>
										<tr>
											<th scope="row"><label for="sgis_census_req_kwaje">수행과제<em>*</em></label></th>
											<td>
												<div>
													<input type="text" name="sgis_census_req_kwaje" id="sgis_census_req_kwaje" title="수행과제" maxlength="66" value="<%=sgis_census_req_kwaje%>" />
												</div>
												<div class="coment mt15 mb5">예시)도시디자인과 교통안전과의 연관성을 실증 분석하고자 함</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<h2>제출동의 및 자료제공기간<em>(필수)</em></h2>
							<div class="table-type">
								<table class="table-style type02">
									<colgroup>
										<col style="width:160px;">
										<col style="width:auto;">
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">제출동의</th>
											<td>
												<ul>
													<li>제공된 자료에 대한 출처를 반드시 명시하고, 결과물이 완성되었을 때 통계청에<span>사본 1부를 제출할 것을 동의합니다. (논문, URL 등)</span></li>
													<li>※ 동의하지 않을 경우 신청이 불가합니다.</li>
													<li>※ 자료제공 신청 시, 신청된 정보는 <strong>통계갤러리 서비스에 비공개 저장</strong>됩니다.</li>
												</ul>
											</td>
										</tr>
										<tr>
											<th scope="row"><label>자료제공기간</label></th>
											<td>
												<ul>
													<li>※ 자료 다운로드는<strong>승인 후 일주일 동안</strong>만 가능합니다.</li>
												</ul>
											</td>
										</tr>
									</tbody>
								</table>
								<div class="agree">
									<input type="checkbox" name="concur" id="concur" <% if(sgis_census_req_sosok != "") { %>checked="checked"<% } %> class="check"/>
									<label for="concur"><span>위 내용에 동의합니다.</span></label>
								</div>
							</div>
							<h2>자료선택(필수)</h2>
							<div class="table-type">
								<table class="table-style type02">
									<caption></caption>
									<colgroup>
										<col style="width:160px;">
										<col style="width:auto;">
									</colgroup>
									<tbody>
										<tr>
											<th scope="row"><label for="census_output_data_type1">자료형태</label></th>
											<td>
												<span class="radio-area">
														<input type="radio" class="radio" name="census_output_data_type" id="census_output_data_type1" value="1" onclick="onChangeDataType();" checked="checked"/>
														<label for="census_output_data_type1">집계구</label>
												</span>
												<span class="radio-area">
														<input type="radio" class="radio" name="census_output_data_type" id="census_output_data_type2" value="2" onclick="onChangeDataType();"/>
														<label for="census_output_data_type2">격자</label>
												</span>
											</td>
										</tr>
										<tr id="census_output_Year_tr">
											<th scope="row"><label for="census_output_area_year">집계구 기준년도</label></th>
											<td>
												<span class="select-wrap">
													<select name="census_output_area_year" id="census_output_area_year" style="width: 250px;" title="집계구 기준년도" onChange="onChange_coa_year(this);">
														<!-- 테스트용 -->
														<%-- <option value="2015" <%if("2015".equals(census_output_area_year)) { %>selected="selected"<%} %>>2015</option> --%>

														<!-- 서버적용시 바꺼져야함 -->
														<option value="2021" <%if("2021".equals(census_output_area_year)) { %>selected="selected"<%} %>>2021</option>
														<option value="2020_4" <%if("2020_4".equals(census_output_area_year)) { %>selected="selected"<%} %>>2020</option>

														<!--
														<option value="2019" <%if("2019".equals(census_output_area_year)) { %>selected="selected"<%} %>>2019</option>
														<option value="2018_4" <%if("2018_4".equals(census_output_area_year)) { %>selected="selected"<%} %>>2018</option>
														 -->
													</select>
												</span>
												&nbsp;&nbsp;
												<span id="txt_data_info">[2021년 6월 30일 경계기준]</span><br/>
												<!-- --------------격자 통계 기준년도는 반드시 아래값을 넣어야 함.   ----------------- -->
													<!-- --------------   ----------------- -->													
													<span id="grid_base_year" style="display: none;">2021</span>
													<!-- --------------   ----------------- -->
													<!-- --------------   ----------------- -->													
													<!-- --------------   ----------------- -->
													<!-- --------------   ----------------- -->		
												<!-- mng_s 20201008 김건민 (문구 추가함.) -->
												<!-- mng_s 20201013 김준하 (문구 주석처리) -->
												<!-- <span id="txt_data_info">* 2018년 경계기준 제공용 자료는 10월 중순반영될 예정입니다. (2018년4분기경계포함)<br/>* 집계구 기준년도 2019년에서 2018년 경계는 2018년 2분기 경계입니다</span> -->
												<!-- mng_e 20201008 김건민 -->
											</td>
										</tr>
										<tr>
											<th scope="row"><label>자료구분</label></th>
											<td>
												<ul>

													<!-- mng_s 20191127 자료제공용 파일에 문제가 있어서 경계만 일단 서비스한다. 추후 정상화시킬경우 이곳 주석해제요망 -->

													<li>
													<c:forEach var="codeItem" items="${censusCode}"  varStatus="status">
														<span class="radio-area <c:if test="${codeItem.sgis_census_id == 1 || codeItem.sgis_census_id == 2  || codeItem.sgis_census_id == 4 }">select_Type_1</c:if><c:if test="${codeItem.sgis_census_id == 7 || codeItem.sgis_census_id == 8}">select_Type_2</c:if>" >
															<input type="radio" class="radio" name="sgis_census_id" id="sgis_census_id${status.index}" value="${codeItem.sgis_census_id }" onclick="selectDetailData2('sgis_census_data_id', 'sgis_census_id', 'sgis_census_year1', '');" />
															<label for="sgis_census_id${status.index}" class="<c:if test="${codeItem.sgis_census_id == 1 || codeItem.sgis_census_id == 2  || codeItem.sgis_census_id == 4 }">select_Type_1</c:if><c:if test="${codeItem.sgis_census_id == 7 || codeItem.sgis_census_id == 8}">select_Type_2</c:if>">${codeItem.sgis_census_code_name }</label>
														</span>
													</c:forEach>
													</li>

													<!-- mng_s 20191127 자료제공용 파일에 문제가 있어서 경계만 일단 서비스한다. 추후 정상화시킬경우 이곳 삭제요망 -->
													<!--
													<li>
													<span class="radio-area">
														<input type="radio" class="radio" name="sgis_census_id" id="sgis_census_id2" value="2" onclick="selectDetailData2('sgis_census_data_id', 'sgis_census_id', 'sgis_census_year1', '');">
														<label for="sgis_census_id2">통계지역경계</label>
													</span>
													</li>
													 -->


												</ul>
											</td>
										</tr>
										<tr>
											<th scope="row"><label id="changeLable1">자료대상(집계구별)</label><label id="changeLable2">자료대상</label></th>
											<td>
												<ul>
													<li id="option_data"><!-- shortcut_05_03_data.jsp --></li>
												</ul>
											</td>
										</tr>
										<!-- 2021년 SGIS4_자료제공 시작 -->
									 	<tr id = "option_grid"></tr>
										<!-- 2021년 SGIS4_자료제공 끝 -->
										<tr id="sgsi_year_tr">
											<th scope="row"><label>년도</label></th>
											<td>
												<div class="" id="option_year"><!-- shortcut_05_03_year.jsp --></div>
											</td>
										</tr>
										<!-- 2021년 SGIS4_자료제공 시작 -->
										<!-- <tr id = "sgis_census_devided_grid_tr" style = "display : none;">
												<th scope="row"><label>격자구분</label></th>
												<td>
													<ul id = "sgis_census_devided_grid_ul"> style = "display : none;"
													<li id= "sgis_census_devided_grid_li"></li>
													</ul>
												</td>
										</tr> -->

										<!-- 집계구 선택 -->
										<tr id = "option_detail_task_tr" class="data_type_1">
											<th  scope="row"><label>세부자료명</label></th>
											<td id="option_detail_data"><!-- shortcut_05_03_detail_data_id.jsp --></td>
										</tr>
										 <tr id ="option_detail_data_sido_tr" class="data_type_1">
											<th id ="option_detail_data_sido_th" scope="row"><label>시도/시군구</label></th>
											<td id ="option_detail_data_sido_td">
												<div class="" id="option_sido"></div><!-- shortcut_05_03_sido.jsp -->
												<div class="" id="option_sigungu"></div><!-- shortcut_05_03_sigungu.jsp -->
											</td>
										</tr>

										<!-- 격자 선택 -->

										<tr  class="data_type_2 sgis_map_code_tr">
											<th  scope="row" rowspan="2"><label>격자레벨</label></th>
											<td id="">
												<ul id="sgis_leve_ul_1" class="sgis_Levle_ul">
													<li >
														<span class="check-area">
															<input type="checkbox" class="check" name="sgis_census_level_area" id="sgis_census_level_area_1" value="all"  onclick="arearallCheck(this);"/>
															<label for="sgis_census_level_area_1">전체</label>
														</span>
														<span class="check-area">
															<input type="checkbox" class="check" name="sgis_census_level_area" id="sgis_census_level_area_2" value="100K" onclick="arearallCheck(this);"/>
															<label for="sgis_census_level_area_2">100K</label>
														</span>
														<span class="check-area">
															<input type="checkbox" class="check" name="sgis_census_level_area" id="sgis_census_level_area_3" value="10K" onclick="arearallCheck(this);"/>
															<label for="sgis_census_level_area_3">10K</label>
														</span>
													</li>
													<li >
														<span class="check-area">
															<input type="checkbox" class="check" name="sgis_census_level_area" id="sgis_census_level_area_4" value="1K" onclick="arearallCheck(this);"/>
															<label for="sgis_census_level_area_4">1K</label>
														</span>
														<span class="check-area">
															<input type="checkbox" class="check" name="sgis_census_level_area" id="sgis_census_level_area_5" value="500M" onclick="arearallCheck(this);"/>
															<label for="sgis_census_level_area_5">500M</label>
														</span>
														<span class="check-area">
															<input type="checkbox" class="check" name="sgis_census_level_area" id="sgis_census_level_area_6" value="100M" onclick="arearallCheck(this);"/>
															<label for="sgis_census_level_area_6">100M</label>
														</span>
													</li>
												</ul>
											</td>
										</tr>
										<tr id = "" class="data_type_2 sgis_map_code_tr">
											<td >
												<ul id="sgis_leve_ul_2" class="all-check sgis_Levle_ul"  style="width: 180px;">
													<li >
														<span class="check-area"" style="width: 180px;">
															<input type="checkbox" class="check" name="sgis_census_level_area_check" id="sgis_census_level_area_check" value="Y" onclick=""/>
															<label for="sgis_census_level_area_check" style="width: 100%;">격자경계 포함</label>
														</span>
													</li>
												</ul>
											</td>
										</tr>
										 <tr id ="map_code_input_list" class="data_type_2">
											<th id ="" scope="row"><label>격자코드</label></th>
											<td>
												<div id ="sgis_map_select_data_tr">
												</div>
											</td>
										</tr>

										<!-- 2021년 SGIS4_자료제공 끝 -->
									</tbody>
								</table>

								<!-- 격자 지도 -->
								<div id="sgis_map_div"></div>


								<div class="btn-area mt20">
									<button type="button" class="default-color" onclick="fromToAdd(); return false;"><span>추가</span></button>
								</div>
							</div>
							<p class="count">총 <strong id="listCnt">0</strong>건</p>
							<div class="table-type">
								<table class="table-style type01" id="sgis_census_table" >
									<colgroup>
										<col style="width:30px;">
										<col style="width:70px;">
										<col style="width:100px;">
										<col style="width:70px;">
										<col style="width:100px;">
										<col style="width:50px;">
										<col style="width:60px;">
										<col style="width:45px;">										
										<col style="width:55px;"> <!-- 2021년 SGIS4_자료제공 -->
									</colgroup>
									<thead>
										<tr>
											<th class="first" >
												<span class="board-all-check check-area">
													<input type="checkbox" id="sgis_all" class="check" name="sgis_all" onclick="allCheck();"/>
													<label for="sgis_all">전체선택</label>
												</span>
											</th>
											<th><label>통계/경계</label></th>
											<th><label>대상자료명</label></th>
											<th><label>년도</label></th>
											<th><label>세부자료명</label></th>
											<!-- 2021년 SGIS4_자료제공 시작-->
											<th class = "sido-sigungu"><label>시도</label></th>
											<th class = "sido-sigungu"><label>시군구</label></th>
											<th class = "sido-sigungu"><label>집계년도</label></th>
											<th class="last"><label>삭제</label></th>
											<!-- 2021년 SGIS4_자료제공 끝 -->
										</tr>
									</thead>
									<tbody><!-- 상단 스크립트에서 처리 --></tbody>
								</table>
								<div class="btn-borad left">
									<button type="button" class="btn-allchoice" onclick="toggleCheck(); return false;"><span>전체선택</span></button>
									<button type="button" class="btn-del" onclick="delTable(); return false;"><span>선택삭제</span></button>
								</div>
								<div class="btn-area">
									<button type="button" class="default-color btn-left-mg" name="sucess" onclick="applyClicked();"><span>신청완료</span></button>
								</div>
							</div>
							<h2>자료구분별 상세정보</h2>
							<div class="table-type">
								<!-- S_20190304 김성연
									해당 테이블 안에  style="border-left:1px solid #e5e6e7;" 추가
									Css에서 순서 오류로 인해 border이 안나옴
								 -->
								<table class="table-style type01 td-data">
									<colgroup>
										<col width="110px">
										<col width="175px">
										<col width="235px">
										<col width="235px"> <!--2021년 SGIS4_자료제공 -->
										<col width="*">
									</colgroup>
									<thead>
										<tr>
											<th>자료구분</th>
											<th>대상자료명</th>
											<th>년도</th>
											<th colspan="2">세부자료명</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td rowspan="4">집계구 통계</td>
											<td>집계구 통계(인구)</td>
											<td rowspan="3">
												1년단위: 2020~2016<br />
												5년단위: 2015~2000
											</td>
											<td class="txtL"  colspan="2">전체, 성연령별 인구, 인구총괄(총인구), 인구총괄(평균나이), 인구총괄(인구밀도), 인구총괄(노령화지수), 인구총괄(노년부양비), 인구총괄(유년부양비)</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">집계구 통계(가구)</td>
											<td class="txtL"  colspan="2">전체, 세대구성별가구, 가구총괄</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">집계구 통계(주택)</td>
											<td class="txtL"  colspan="2">전체, 건축년도별 주택, 노후년수별주택, 주택유형별주택, 연건평별주택, 주택총괄_총주택(거처수)</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">집계구 통계(사업체)</td>
											<td>2019~2000</td>
											<td class="txtL"  colspan="2">전체, 산업분류별(10차_대분류)_종사자수, 산업분류별(10차_대분류)_사업체수,  산업분류별(10차_대분류)_총괄사업체수</td>
										</tr>
										<!-- 2021년 SGIS4_자료제공 끝-->
										<tr>
											<td rowspan="3">집계구 통계<br />(세종시 특별센서스)</td>
											<td>집계구 통계(인구)</td>
											<td rowspan="3">2013</td>
											<td class="txtL" colspan="2">전체, 교육정보별인구, 성연령별 인구, 성_혼인상태별 인구, 인구총괄(총인구), 인구총괄(평균나이), 인구총괄(인구밀도), 인구총괄(노령화지수), 인구총괄(노년부양비), 인구총괄(유년부양비)</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">집계구 통계(가구)</td>
											<td class="txtL" colspan="2">전체, 세대구성별가구, 가구총괄</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">집계구 통계(주택)</td>
											<td class="txtL" colspan="2">전체, 주택유형별주택, 연건평별주택, 주택총괄_총주택(거처수)</td>
										</tr>


										<!-- 2021년 SGIS4_자료제공 시작 -->
										<tr>
											<td rowspan="6">격자통계</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">격자통계(인구)</td>
											<td rowspan = "3">
												1년단위: 2020~2016<br />
												5년단위: 2015~2000
											</td>
											<td class="txtL" colspan="2">전체, 성연령별 인구, 인구총괄(총인구, 남여인구)</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">격자통계(가구)</td>
											<td class="txtL" colspan="2">전체, 세대구성별가구, 가구총괄(총가구)</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">격자통계(주택)</td>
											<td class="txtL" colspan="2">전체, 건축년도별주택, 주택유형별주택,연건평별주택,<br/>주택총괄_총주택(거처수)</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">격자통계(사업체)</td>
											<td rowspan = "2">2019~2000</td>
											<td class="txtL" colspan="2">총사업체수, 산업분류별 사업체수</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">격자 통계(종사자)</td>
											<td class="txtL" colspan="2">총 종사자수, 산업분류별 종사자수</td>
										</tr>




										<tr>
											<td rowspan="10">통계지역경계</td> <!-- 2021년 SGIS4_자료제공 -->
											<td>센서스용 행정구역경계(전체)</td>
											<td rowspan="4">
												1년단위: 2021~2001<br />
														5년단위: 2000~1975
											</td>
											<td  colspan="2">-</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">센서스용 행정구역경계(시도)</td>
											<td colspan="2">-</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">센서스용 행정구역경계(시군구)</td>
											<td  colspan="2">-</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">센서스용 행정구역경계(읍면동)</td>
											<td  colspan="2">-</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">도시화지역(기초단위구)</td>
											<td>2021</td>
											<td  colspan="2">-</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">도시권경계</td>
											<td>2005</td>
											<td  colspan="2">-</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">집계구경계</td>
											<td>2021</td>
											<td colspan="2">-</td>
										</tr>
										 <!-- 2021년 SGIS4_자료제공 시작-->
										<tr>
											<td style="border-left:1px solid #e5e6e7;">격자경계</td>
											<td>2021</td>
											<td colspan="2">-</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">도시화경계(격자)</td>
											<td>
												1년단위: 2020~2016<br />
												5년단위: 2015~2000
											</td>
											<td colspan="2">-</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">기초단위구</td>
											<td>2021</td>
											<td colspan="2">-</td>
										</tr>

										<!--2021년 SGIS4_자료제공 끝  -->
									</tbody>
								</table>
								<!-- E_20190304 김성연 -->
							</div>
						</form>
					</div>
					<!--//view-->
				</div>
			</div>
			<!--//contents-->
			<!--footer-->
			<div id="footer"><jsp:include page="/view/common/includeBottom"></jsp:include></div>
			<!--//footer-->
		</div>
		<!--//wrap-->
<% } %>
	</body>
</html>