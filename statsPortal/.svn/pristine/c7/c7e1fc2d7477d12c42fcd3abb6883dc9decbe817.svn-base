<%@page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%
	String leftMenu="shortcut";

	if(loginYn.equals("N")) {
		session.setAttribute("returnUrl", "/contents/shortcut/shortcut_05_03.jsp");out.print("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>");
		out.print("<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='ko' lang='ko'>");
		out.print("<head>");
		out.print("<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />");
		out.print("<title>센서스 공간통계 자료신청:통계지리 정보서비스</title>");
		out.print("</head>");
		out.print("<body>");
		out.print("<script type='text/javascript'> alert('로그인 후 이용할 수 있습니다.'); location.href='/view/member/login_new?returnPage=/contents/shortcut/shortcut_05_03.jsp'; </script> ");
	} else {
		GeneralBroker broker = null;
		DbManager dmg = null;
		RecordModel rm = null;
		RecordModel rm1 = null;
		RecordModel rm2 = null;
		
		String sgis_census_id = "";
		String sgis_census_name = "";
		String sgis_census_data_id = "";
		String sgis_census_data_name = "";
		
		String sgis_census_req_company = request.getParameter("sgis_census_req_company") == null ? "" : request.getParameter("sgis_census_req_company");
		if ( sgis_census_req_company != null  ){  
			sgis_census_req_company = sgis_census_req_company.replaceAll("<","&lt;");  
			sgis_census_req_company = sgis_census_req_company.replaceAll(">","&gt;"); 
		}
		
		String email_id = request.getParameter("email_id") == null ? "" : request.getParameter("email_id");
		if ( email_id != null  ){  
			email_id = email_id.replaceAll("<","&lt;");  
			email_id = email_id.replaceAll(">","&gt;"); 
		}
		String email_addr = request.getParameter("email_addr") == null ? "" : request.getParameter("email_addr");
		if ( email_addr != null  ){  
			email_addr = email_addr.replaceAll("<","&lt;");  
			email_addr = email_addr.replaceAll(">","&gt;"); 
		}
		
		String sgis_census_req_email = email_id + "@" + email_addr;
		
		String sgis_census_req_sosok = request.getParameter("sgis_census_req_sosok") == null ? "" : request.getParameter("sgis_census_req_sosok");
		if ( sgis_census_req_sosok != null  ){  
			sgis_census_req_sosok = sgis_census_req_sosok.replaceAll("<","&lt;");  
			sgis_census_req_sosok = sgis_census_req_sosok.replaceAll(">","&gt;"); 
		}
		String sgis_census_req_sosok_nm = request.getParameter("sgis_census_req_sosok_nm") == null ? "" : request.getParameter("sgis_census_req_sosok_nm");
		if ( sgis_census_req_sosok_nm != null  ){  
			sgis_census_req_sosok_nm = sgis_census_req_sosok_nm.replaceAll("<","&lt;");  
			sgis_census_req_sosok_nm = sgis_census_req_sosok_nm.replaceAll(">","&gt;"); 
		}
		String sgis_census_req_mokjuk = request.getParameter("sgis_census_req_mokjuk") == null ? "" : request.getParameter("sgis_census_req_mokjuk");
		if ( sgis_census_req_mokjuk != null  ){  
			sgis_census_req_mokjuk = sgis_census_req_mokjuk.replaceAll("<","&lt;");  
			sgis_census_req_mokjuk = sgis_census_req_mokjuk.replaceAll(">","&gt;"); 
		}
		String sgis_census_req_mokjuk_nm = request.getParameter("sgis_census_req_mokjuk_nm") == null ? "" : request.getParameter("sgis_census_req_mokjuk_nm");
		if ( sgis_census_req_mokjuk_nm != null  ){  
			sgis_census_req_mokjuk_nm = sgis_census_req_mokjuk_nm.replaceAll("<","&lt;");  
			sgis_census_req_mokjuk_nm = sgis_census_req_mokjuk_nm.replaceAll(">","&gt;"); 
		}
		String census_output_area_year = request.getParameter("census_output_area_year") == null ? "" : request.getParameter("census_output_area_year");
		if ( census_output_area_year != null  ){  
			census_output_area_year = census_output_area_year.replaceAll("<","&lt;");  
			census_output_area_year = census_output_area_year.replaceAll(">","&gt;"); 
		}
		String sgis_census_req_kwaje = request.getParameter("sgis_census_req_kwaje") == null ? "" : request.getParameter("sgis_census_req_kwaje");
		if ( sgis_census_req_kwaje != null  ){  
			sgis_census_req_kwaje = sgis_census_req_kwaje.replaceAll("<","&lt;");  
			sgis_census_req_kwaje = sgis_census_req_kwaje.replaceAll(">","&gt;"); 
		}
		
		String sgis_census_req_tel_1 = request.getParameter("sgis_census_req_tel_1") == null ? "" : request.getParameter("sgis_census_req_tel_1");
		if ( sgis_census_req_tel_1 != null  ){  
			sgis_census_req_tel_1 = sgis_census_req_tel_1.replaceAll("<","&lt;");  
			sgis_census_req_tel_1 = sgis_census_req_tel_1.replaceAll(">","&gt;"); 
		}
		String sgis_census_req_tel_2 = request.getParameter("sgis_census_req_tel_2") == null ? "" : request.getParameter("sgis_census_req_tel_2");
		if ( sgis_census_req_tel_2 != null  ){  
			sgis_census_req_tel_2 = sgis_census_req_tel_2.replaceAll("<","&lt;");  
			sgis_census_req_tel_2 = sgis_census_req_tel_2.replaceAll(">","&gt;"); 
		}
		String sgis_census_req_tel_3 = request.getParameter("sgis_census_req_tel_3") == null ? "" : request.getParameter("sgis_census_req_tel_3");
		if ( sgis_census_req_tel_3 != null  ){  
			sgis_census_req_tel_3 = sgis_census_req_tel_3.replaceAll("<","&lt;");  
			sgis_census_req_tel_3 = sgis_census_req_tel_3.replaceAll(">","&gt;"); 
		}
		
		String sgis_census_req_tel = sgis_census_req_tel_1 + "-" + sgis_census_req_tel_2 + "-" + sgis_census_req_tel_3;
		
		String sgis_census_req_goal = request.getParameter("sgis_census_req_goal") == null ? "" : request.getParameter("sgis_census_req_goal");
		if ( sgis_census_req_goal != null  ){  
			sgis_census_req_goal = sgis_census_req_goal.replaceAll("<","&lt;");  
			sgis_census_req_goal = sgis_census_req_goal.replaceAll(">","&gt;"); 
		}
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
		
		String sc_company_name = "";
		
		String tag = "";
%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="utf-8">
		<meta name="format-detection" content="telephone=no" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		
		<script src="/js/common/includeHead.js"></script>
		<script src="/js/common/common.js"></script>
		
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/common.css">
		<!--알림마당 컨텐츠 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/contents.css">
		<!--게시판 css 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/board.css">
		<title>알림마당|통계지리정보서비스</title>
		<script>
			var menuType = 'sc0503';
			$(function(){
				//apiLogWrite2("E2","E21",$(".ctit").text(),"없음","00","없음");
			});
			
			pageCallReg();

			function selectDetailData2(val, val2, val3, val4) {
				jQuery.ajax({
					type: "POST",
					url: "shortcut_05_03_data.jsp",
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

			var ison="0";

			function applyClicked() {
				var fm = document.censusFm;
				var myTable = document.getElementById("sgis_census_table");
				var myTbody = myTable.getElementsByTagName("tbody")[0];
				var len = myTbody.rows.length;
			
				if(len < 1) {
					alert("자료를 하나이상 선택하세요.");
					//addTable(); //mng_s 20190812 세부자료명에 undefined로 추가되는 현상때문에 주석처리
					return false;
				}
			  
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
			
				object.concur = true;
				
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
						param : JSON.stringify(object),
						supportType : 'sgis_census_req',
					},
					success : function(data) {},
					error : function(xhr,textStatus,error) {},
					complete : function(data) {}
				});
				//통계갤러리 추가 끝
				fm.encoding = "application/x-www-form-urlencoded";
				fm.action = "/contents/shortcut/shortcut_05_03_apply2.jsp";
			
				if(document.censusFm.sgis_census_year_id_new == null) {
					alert("신청자료 선택 후 추가 버튼을 클릭하세요.");
					return false;
				}
				
				var c = confirm("신청하시겠습니까?");
				if(c == 1) {
					//============================ 연락처 세션비교후 반영 =========================
					var sgis_telephone = document.censusFm.sgis_census_req_tel.value;
					var sc_tele = "<%=sc_telephone%>";
					fm.aT.value = "INS";
					fm.submit();
					return true;
				} else {
					return false;
				}
			}

			function check_dup() {
				var fm=document.censusFm;
				var myTable = document.getElementById("sgis_census_table");
				var myTbody = myTable.getElementsByTagName("tbody")[0];
				var len = myTbody.rows.length;
				for(var j = 0; j < len-1; j++) {
					if(len > 1) {
						var temp_check = false;
						var isChecked = false;
						$("input:checkbox[name=sgis_census_detail_data_id]:checked").each(function(i, e) {
							if(e.value == "all") isChecked = true;
						});
						var sgis_census_id = $('input:radio[name=sgis_census_id]:checked').val();
						var sgis_census_data_id = $('input:radio[name=sgis_census_data_id]:checked').val();
						if(isChecked) {
							$(function() {
								$("input:checkbox[name=sgis_census_detail_data_id]:checked").each(function(index, element){
									if(temp_check) {
										return 1;
									}
									if(index > 1) {
										if(document.getElementsByName("sgis_census_id_new")[j].value == sgis_census_id &&
												document.getElementsByName("sgis_census_data_id_new")[j].value == sgis_census_data_id &&
												document.getElementsByName("sgis_census_year_id_new")[j].value == $("#sgis_census_year1").val() &&
												document.getElementsByName("sgis_census_sido_id_new")[j].value == $("#sgis_census_sido1").val() &&
												document.getElementsByName("sgis_census_sigungu_id_new")[j].value == $("#sgis_census_sigungu1").val() &&
												document.getElementsByName("sgis_census_detail_data_id_new")[j].value == element.value) {
											alert("신청 목록에 같은 분류의 신청이 있습니다.");
											temp_check = true;
											return 1;
										}
									}
								});
							});
						} else {
							if(document.getElementsByName("sgis_census_id_new")[j].value == sgis_census_id &&
									document.getElementsByName("sgis_census_data_id_new")[j].value == sgis_census_data_id &&
									document.getElementsByName("sgis_census_year_id_new")[j].value == $("#sgis_census_year1").val() &&
									document.getElementsByName("sgis_census_sido_id_new")[j].value == $("#sgis_census_sido1").val() &&
									document.getElementsByName("sgis_census_sigungu_id_new")[j].value == $("#sgis_census_sigungu1").val() &&
									document.getElementsByName("sgis_census_detail_data_id_new")[j].value == $("input:checkbox[name=sgis_census_detail_data_id]:checked").val()) {
								alert("신청 목록에 같은 분류의 신청이 있습니다.");
								return 1;
							}
						}
						if(temp_check) {
							return 1;
						}
					}
				}
			}


			function fromToAdd() {
				if(check_dup() == 1) {
					return false;
				}
				if($('input:radio[name=sgis_census_id]:checked').val() == "" || $('input:radio[name=sgis_census_id]:checked').val() == undefined) {
					alert("자료구분을 선택하세요.");
					return false;
				}
				if($('input:radio[name=sgis_census_data_id]:checked').val() == "" || $('input:radio[name=sgis_census_data_id]:checked').val() == undefined) {
					alert("대상자료명을 선택하세요.");
					return false;
				}
				if($('#sgis_census_year1').val() == "") {
					alert("년도를 선택하세요.");
					return false;
				}
				if($('input:radio[name=sgis_census_id]:checked').val() == "1" && $('input:checkbox[name=sgis_census_detail_data_id]:checked').length < 1) {
					alert("세부자료명을 선택하세요.");
					return false;
				}
				if($('#sgis_census_sido1').val() == "") {
					alert("시도를 선택하세요.");
					return false;
				}
				if($('#sgis_census_sigungu1').val() == "") {
					alert("시군구를 선택하세요.");
					return false;
				}
				
				var len = $('strong[id=listCnt]').text();
				if($('input:radio[name=sgis_census_id]:checked').val() == "2") {
					addTable('', '');
					len++;
				}
				else {
					$('input:checkbox[name=sgis_census_detail_data_id]:checked').each(function(i, e) {
						if(e.value != 'all') {
							addTable(e.value, $('label[id=sgis_census_detail_data_id'+e.value+']').text());
							len++;
						}
					});
				}
				$('strong[id=listCnt]').text(len);
			}

			var idx = 9999;
			//자료선택추가
			function addTable(sgis_census_detail_data_id, sgis_census_detail_data_nm) {
				var myTable = document.getElementById("sgis_census_table");
				var myTbody = myTable.getElementsByTagName("tbody")[0];
				idx++;
				var row = document.createElement("tr");
				var cell = document.createElement("td");
				var input, span, label, labelText;
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
				var sgis_census_nm = $('label[for=sgis_census_id'+sgis_census_id+']').text();//20160304 김성연 수정
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
				var sgis_census_data_nm = $('label[for=sgis_census_data_id'+sgis_census_data_id+']').text();//20160304 김성연 수정
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
				
				try {
					input = document.createTextNode(document.censusFm.sgis_census_year_id.options[document.censusFm.sgis_census_year_id.selectedIndex].text);
				} catch(e) {
					input = document.createTextNode(document.censusFm.sgis_census_year_id.options[document.censusFm.sgis_census_year_id.selectedIndex].text);
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
					input.setAttribute("value", document.censusFm.sgis_census_year_id.options[document.censusFm.sgis_census_year_id.selectedIndex].value);
				}
				cell.appendChild(input);
				row.appendChild(cell);
				// ================= 끝 년도   ===================
			
				//============================== 시작 세부자료명 ====================================
				cell = document.createElement("td");
				
				try {
					input = document.createTextNode(sgis_census_detail_data_nm);
				} catch(e) {
					input = document.createTextNode(sgis_census_detail_data_nm);
				}
				cell.appendChild(input);
				
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
				row.appendChild(cell);
				//============================== 끝 세부자료명 ====================================
				
				// ================= 시도 td 시작 ===================
				cell = document.createElement("td");
				
				try {
					input = document.createTextNode(document.censusFm.sgis_census_sido_id.options[document.censusFm.sgis_census_sido_id.selectedIndex].text);
				} catch(e) {
					input = document.createTextNode(document.censusFm.sgis_census_sido_id.options[document.censusFm.sgis_census_sido_id.selectedIndex].text);
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
				}
				cell.appendChild(input);
				row.appendChild(cell);
				// ================= 시도 td 끝 ===================
			
				// ================= 시군구 td 시작 ===================
				cell = document.createElement("td");
				
				try {
					input = document.createTextNode(document.censusFm.sgis_census_sigungu_id.options[document.censusFm.sgis_census_sigungu_id.selectedIndex].text);
				} catch(e) {
					input = document.createTextNode(document.censusFm.sgis_census_sigungu_id.options[document.censusFm.sgis_census_sigungu_id.selectedIndex].text);
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
				}
				cell.appendChild(input);
				row.appendChild(cell);
				// ================= 시군구 td 끝 ===================
			
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
				
				$('strong[id=listCnt]').text(len);
			
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
			
			function fnBack() {
				$('form[id=censusFm_id]').attr('encoding', 'application/x-www-form-urlencoded');
				$('form[id=censusFm_id]').attr('action', '/contents/shortcut/shortcut_05_03_step01.jsp');
			
				var c = confirm("선택하신 자료는 초기화 됩니다.\n이전페이지로 이동하시겠습니까?");
				if(c == 1) {
					$('form[id=censusFm_id]').submit();
				}
			}
		</script>
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
				<!--lnb 시작-->
				<jsp:include page="/jsp/board/includeLeftMenu.jsp"></jsp:include>
				<!--//lnb 끝--> 
				<div id="content">
					<div id="title-area">
						<ul class="location">
						<!-- 190313 방민정 수정 시작 -->
							<li><a href="/view/view/index"><img src="/images/common/location_home.gif"/></a></li>
							<li><a href="/view/board/sopBoardMain">알림마당</a></li>
							<li><a href="/contents/shortcut/shortcut_05_02.jsp">자료신청 서비스</a></li>
							<li><a href="/contents/shortcut/shortcut_05_03_step01.jsp"><em>자료신청</em></a></li>
						<!-- 190313 방민정 수정 끝 -->
						</ul>
						<h1 class="sub-title">자료신청</h1>
					</div>
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
					<!--view-->
					<div id="contents" class="view">
						<form id="censusFm_id" name="censusFm" method="post" action="shortcut_05_03_apply2.jsp">
							<input type="hidden" name="param_userkey" value="<%= sc_userkey %>" />
							<input type="hidden" name="aT" value="<%=lData.getString("aT") %>" />
							<input type="hidden" name="sgis_census_req_id" value="<%=lData.getString("sgis_census_req_id") %>" />
							<input type="hidden" name="old_census_file" value="<%=sgis_census_req_file %>" />
							<!-- ============  신규 데이터 추가시 해당 기준년도를 여기서 바꾸어 주어야 한다.  ============ -->
							<input type="hidden" id="census_output_area_year" name="census_output_area_year" value="<%=census_output_area_year%>" />
							<!-- ============  1단계에서 넘어온 데이터  ============ -->
							<input type="hidden" id="sgis_census_req_company" name="sgis_census_req_company" value="<%=sgis_census_req_company %>" />
							<input type="hidden" id="sgis_census_req_email" name="sgis_census_req_email" value="<%=sgis_census_req_email %>" />
							<input type="hidden" id="sgis_census_req_sosok" name="sgis_census_req_sosok" value="<%=sgis_census_req_sosok %>" />
							<input type="hidden" id="sgis_census_req_sosok_nm" name="sgis_census_req_sosok_nm" value="<%=sgis_census_req_sosok_nm %>" />
							<input type="hidden" id="sgis_census_req_mokjuk" name="sgis_census_req_mokjuk" value="<%=sgis_census_req_mokjuk %>" />
							<input type="hidden" id="sgis_census_req_mokjuk_nm" name="sgis_census_req_mokjuk_nm" value="<%=sgis_census_req_mokjuk_nm %>" />
							<input type="hidden" id="sgis_census_req_kwaje" name="sgis_census_req_kwaje" value="<%=sgis_census_req_kwaje %>" />
							<input type="hidden" id="sgis_census_req_tel" name="sgis_census_req_tel" value="<%=sgis_census_req_tel %>" />
							<input type="hidden" id="sgis_census_req_goal" name="sgis_census_req_goal" value="<%=sgis_census_req_goal %>" />
							
							<input type="hidden" name="inUse" id="inUse1" />
							<input type="hidden" name="years" id="years1" />
							<h2>기본정보</h2>
							<div class="table-type">
								<span class="required"><em title="필수 항목">*</em> 는 필수 입력 항목입니다.</span>
								<table class="table-style type02">
									<colgroup>
										<col style="width:160px;">
										<col style="width:auto;">
									</colgroup>
									<tbody>
										<tr>
											<th scope="row"><label>자료구분<em>*</em></label></th>
											<td>
												<ul>
													<!-- mng_s 20191127 자료제공용 파일에 문제가 있어서 경계만 일단 서비스한다.  추후 정상화시킬경우 이곳 주석해제요망 -->
													
													<li>
													<%
														try {
															broker = new GeneralBroker("ceaa00");
															lData.setString("PARAM", "CODE");
															rm = broker.getList(lData);
															
															while(rm != null && rm.next()) {
																r_sgis_census_id = String.valueOf((BigDecimal)rm.get("sgis_census_id"));
																r_sgis_census_name = StringUtil.verify((String)rm.get("sgis_census_code_name"));
													%>
													<span class="radio-area">
														<input type="radio" class="radio" name="sgis_census_id" id="sgis_census_id<%=r_sgis_census_id %>" value="<%=r_sgis_census_id %>" onclick="selectDetailData2('sgis_census_data_id', 'sgis_census_id', 'sgis_census_year1', '');"/>
														<label for="sgis_census_id<%=r_sgis_census_id %>"><%=r_sgis_census_name %></label>
													</span>
													<%
															}
														} catch(IllegalArgumentException e) {
															System.out.print("sgisWebError : ");
														}
													%>
													</li>
													
													
													<!-- mng_s 20191127 자료제공용 파일에 문제가 있어서 경계만 일단 서비스한다. 추후 정상화시킬경우 이곳 삭제요망 -->
													<!-- 
													<li>
													<span class="radio-area">
														<input type="radio" class="radio" name="sgis_census_id" id="sgis_census_id2" value="2" onclick="selectDetailData2('sgis_census_data_id', 'sgis_census_id', 'sgis_census_year1', '');">
														<label for="sgis_census_id2">통계지역경계</label>
													</span>
													
													<span>
													<br />* 집계구별 자료 제공관련, 코드 정비 및 개선을 위하여 인구/사업체 부문 서비스를 잠시 중단하오니 양해바랍니다. 기간 : 11.26.(화)  ~ 12월 (개선완료시점까지)
													</span>
													</li>
													 -->
													
													
													
													
													
													
													
												</ul>
											</td>
										</tr>
										<tr>
											<th scope="row"><label>자료대상(집계구별)<em>*</em></label></th>
											<td>
												<ul>
													<li id="option_data"><!-- shortcut_05_03_data.jsp --></li>
												</ul>
											</td>
										</tr>
										<tr>
											<th scope="row"><label>년도<em>*</em></label></th>
											<td>
												<div class="" id="option_year"><!-- shortcut_05_03_year.jsp --></div>
											</td>
										</tr>
										<tr>
											<th scope="row"><label>세부자료명<em>*</em></label></th>
											<td id="option_detail_data"><!-- shortcut_05_03_detail_data_id.jsp --></td>
										</tr>
										<tr>
											<th scope="row"><label>시도/시군구<em>*</em></label></th>
											<td>
												<div id="option_sido"><!-- shortcut_05_03_sido.jsp --></div>
												<div id="option_sigungu"><!-- shortcut_05_03_sigungu.jsp --></div>
											</td>
										</tr>
									</tbody>
								</table>
								<div class="btn-area mt20">
									<button type="button" class="default-color" onclick="fromToAdd(); return false;"><span>추가</span></button>
								</div>
							</div>
							<p class="count">총 <strong id="listCnt">0</strong>건</p>
							<div class="table-type">
								<table class="table-style type01" id="sgis_census_table" >
									<caption></caption>
									<colgroup>
										<col style="width:30px;">
										<col style="width:70px;">
										<col style="width:120px;">
										<col style="width:50px;">
										<col style="width:100px;">
										<col style="width:50px;">
										<col style="width:70px;">
										<col style="width:50px;">
									</colgroup>
									<thead>
										<tr>
											<th class="first" >
												<span class="board-all-check check-area">
													<input type="checkbox" id="sgis_all" class="check" name="sgis_all" onclick="allCheck();"/>
													<label for="sgis_all">전체선택</label>
												</span>
											</th>
											<th><label>자료구분</label></th>
											<th><label>대상자료명</label></th>
											<th><label>년도</label></th>
											<th><label>세부자료명</label></th>
											<th><label>시도</label></th>
											<th><label>시군구</label></th>
											<th class="last"><label>삭제</label></th>
										</tr>
									</thead>
									<tbody><!-- 상단 스크립트에서 처리 --></tbody>
								</table>
								<div class="btn-borad left">
									<button type="button" class="btn-allchoice" onclick="toggleCheck(); return false;"><span>전체선택</span></button>
									<button type="button" class="btn-del" onclick="delTable(); return false;"><span>선택삭제</span></button>
								</div>
								<div class="btn-area">
									<button type="button" class="line-gray" name="bcak" onclick="fnBack();"><span>이전</span></button>
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
										<col width="*">
									</colgroup>
									<thead>
										<tr>
											<th>자료구분</th>
											<th>대상자료명</th>
											<th>년도</th>
											<th>세부자료명</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td rowspan="4">통계자료</td>
											<td>집계구별 통계(인구)</td>
											<td>2018, 2017, 2016, 2015, 2010, 2005, 2000</td>
											<td class="txtL">전체, 성연령별 인구, 인구총괄(총인구), 인구총괄(평균나이), 인구총괄(인구밀도), 인구총괄(노령화지수), 인구총괄(노년부양비), 인구총괄(유년부양비)</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">집계구별 통계(가구)</td>
											<td>2018, 2017, 2016, 2015, 2010, 2005, 2000</td>
											<td class="txtL">전체, 서대구성별가구, 가구총괄</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">집계구별 통계(주택)</td>
											<td>2018, 2017, 2016, 2015, 2010, 2005, 2000</td>
											<td class="txtL">전체, 노후년수별주택, 주택유형별주택, 연건평별주택, 주택총괄_총주택(거처)수</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">집계구별 통계(사업체)</td>
											<td>2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003., 2002, 2001, 2000</td>
											<td class="txtL">전체, 산업분류별(10차_대분류)_종사자수, 산업분류별(10차_대분류)_사업체수,  산업분류별(10차_대분류)_총괄사업체수</td>
										</tr>
										<tr>
											<td rowspan="7">통계지역경계</td>
											<td>센서스용 행정구역경계(전체)</td>
											<td rowspan="4">2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003., 2002, 2001, 2000, 1995, 1990</td>
											<td>-</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">센서스용 행정구역경계(시도)</td>
											<td>-</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">센서스용 행정구역경계(시군구)</td>
											<td>-</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">센서스용 행정구역경계(읍면동)</td>
											<td>-</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">도시화지역</td>
											<td>2019</td>
											<td>-</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">도시권경계</td>
											<td>2005</td>
											<td>-</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">집계구경계</td>
											<td>2019</td>
											<td>-</td>
										</tr>
										 
										<tr>
											<td rowspan="3">세종시 특별센서스</td>
											<td>집계구별 통계(인구)</td>
											<td rowspan="3">2013</td>
											<td class="txtL">전체, 교육정보별인구, 성연령별 인구, 성_혼인상태별 인구, 인구총괄(총인구), 인구총괄(평균나이), 인구총괄(인구밀도), 인구총괄(노령화지수), 인구총괄(노년부양비), 인구총괄(유년부양비)</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">집계구별 통계(가구)</td>
											<td class="txtL">전체, 세대구성별가구, 가구총괄</td>
										</tr>
										<tr>
											<td style="border-left:1px solid #e5e6e7;">집계구별 통계(주택)</td>
											<td class="txtL">전체, 주택유형별주택, 연건평별주택, 주택총괄_총주택(거처)수</td>
										</tr>
										
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