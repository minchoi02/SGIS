<%@page import="kr.co.offton.pdf.Const"%>
<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@ page import="com.oreilly.servlet.MultipartRequest,
                 com.oreilly.servlet.multipart.DefaultFileRenamePolicy,
                 java.util.*" %>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>

<%
	String savePath = sc_filePath + "/census/reqdoc";			//저장 위치
	//int sizeLimit   = fileSizeLimit ; 		//5메가까지 제한 넘어서면 예외발생
	int sizeLimit   = 10*1024*1024 ; 		//10메가까지 제한 넘어서면 예외발생

	GeneralBroker broker = null;
	RecordModel rm = null;
	RecordModel rmmod = null; // 수정

	String[] sgis_census_data_id = null;
	String[] sgis_census_id = null;
	String sgis_census_req_company = "";
	String sgis_census_req_tel = "";
	String sgis_census_req_goal = "";
	String sgis_census_req_id = "";

	String sgis_census_req_sosok = "";
	String sgis_census_req_mokjuk = "";
	String sgis_census_req_kwaje = "";
	String sgis_census_req_email = "";
	
	String[] inUse = null;
	String[] years = null;
	String[] sido = null;
	String[] sigungu = null;
	String aT = "";
	String formName = "";
	String fileName = "";
	String oldfileName = "";
	int resultFlag =  0;
	
	try {

		broker = new GeneralBroker("ceaa00");

		/**
		 * @constructor parameter
		 *  	HttpServletRequest req
		 *  	String directory
		 *  	int maxsize
		 *  	String encoding
		 *  	FileRenamePolicy policy(파일명중복여부))
		 */
		//MultipartRequest multi = new MultipartRequest(request, savePath, sizeLimit, "UTF-8", new DefaultFileRenamePolicy());
		//Enumeration formNames  = multi.getFileNames();

		aT = request.getParameter("aT");		//처리구분
		sgis_census_req_id = lData.getString("sgis_census_req_id");
		sgis_census_data_id = request.getParameterValues("sgis_census_data_id_new");	//대상자료
		sgis_census_id  = request.getParameterValues("sgis_census_id_new");
		sgis_census_req_company = request.getParameter("sgis_census_req_company");		//회사명
		sgis_census_req_tel = request.getParameter("sgis_census_req_tel_1") + "-" + request.getParameter("sgis_census_req_tel_2") + "-" + request.getParameter("sgis_census_req_tel_3");
		sgis_census_req_goal = request.getParameter("sgis_census_req_goal");	//요청목적
		//years = request.getParameter("years").split(",");	//전체년도
		//inUse = request.getParameter("inUse").split(",");	//전체년도	 사용여부
		years = request.getParameterValues("sgis_census_year_id_new");
		inUse = request.getParameterValues("inUse");
		sido = request.getParameterValues("sgis_census_sido_id_new");
		sigungu = request.getParameterValues("sgis_census_sigungu_id_new");
		oldfileName = request.getParameter("old_census_file");
		sgis_census_req_id = request.getParameter("sgis_census_req_id");						//신청id(수정시)
		
		sgis_census_req_sosok  = request.getParameter("sgis_census_req_sosok");
		sgis_census_req_mokjuk = request.getParameter("sgis_census_req_mokjuk");
		sgis_census_req_kwaje  = request.getParameter("sgis_census_req_kwaje");
		sgis_census_req_email  = request.getParameter("sgis_census_req_email");

		//formName = (String)formNames.nextElement();														//file tag명
		fileName = request.getParameter("old_census_file");	
		
		// 개인정보 노출 점검
		String privacy01 = sgis_census_req_company + " " + sgis_census_req_goal;   // 점검 데이터
		String privacy02 = StringUtil.privacy(privacy01);               // 점검
		
			/***************************************/
			/* 센서스 신청 */
			/***************************************/
			if (privacy02.equals("")) { // 개인정보 노출 점검
				if(aT.equals("INS")) {
					/*lData.setString("PARAM", "CENSUS_EDIT");
					lData.setString("sgis_census_req_id", sgis_census_req_id);
					lData.setString("sgis_census_req_company", sgis_census_req_company);
					lData.setString("sgis_census_req_tel", sgis_census_req_tel.replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", "").replaceAll("\'", "&apos;").replaceAll("\"","&quot;").replaceAll("&","&amp;"));
					lData.setString("sgis_census_req_goal", sgis_census_req_goal);
					lData.setString("fileName", fileName);
					lData.setString("sc_userkey", sc_userkey);
					lData.setString("sgis_census_req_reject", "");
	
					resultFlag = broker.process(Const.P_UPD, lData);*/
					
					
					lData.setString("PARAM", "CENSUS_APPLY_MAXNUM");
	   			    rm = broker.getList(lData);
					if(rm.next()) sgis_census_req_id = String.valueOf((BigDecimal)rm.get("maxnum"));
					
					
					for(int i = 0; i < sgis_census_id.length; i++){
						
						lData.setString("PARAM", "CENSUS_APPLY");
						lData.setString("sgis_census_req_id", sgis_census_req_id);
						lData.setString("sgis_census_data_id", sgis_census_data_id[i]);
						lData.setString("sgis_census_id", sgis_census_id[i]);
						lData.setString("sc_userkey", sc_userkey);
						lData.setString("sgis_census_req_company", sgis_census_req_company);
						lData.setString("sgis_census_req_tel", sgis_census_req_tel.replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", "").replaceAll("\'", "&apos;").replaceAll("\"","&quot;").replaceAll("&","&amp;"));
						lData.setString("sgis_census_req_goal", sgis_census_req_goal);
						lData.setString("fileName", fileName);
						lData.setString("sc_userkey", sc_userkey);
						
						lData.setString("sgis_census_req_sosok", sgis_census_req_sosok);
						lData.setString("sgis_census_req_mokjuk", sgis_census_req_mokjuk);
						lData.setString("sgis_census_req_kwaje", sgis_census_req_kwaje);
						lData.setString("sgis_census_req_email", sgis_census_req_email);
						
						// 2018. 01. 04 mng_s
						lData.setString("detail_data_seq", Integer.toString(i));
						// 2018. 01. 04 mng_e
		
						resultFlag = broker.process(Const.P_INS, lData);
						
						/******************************/
						/* 센서스 년도 신청 등록 */
						/******************************/
							
						
						lData.setString("PARAM", "CENSUS_APPLY_YEAR");
						lData.setString("years", years[i]);
						lData.setString("sgis_census_id", sgis_census_id[i]);
						lData.setString("sgis_census_data_id", sgis_census_data_id[i]);
						lData.setString("sgis_census_req_id", sgis_census_req_id);
						if ( !"".equals(sido[i])) {
							lData.setString("sido", sido[i].substring(4));
						}
						lData.setString("sigungu", sigungu[i]);
						lData.setString("inUse", "Y");
						
						// 2018. 01. 04 mng_s
						lData.setString("detail_data_seq", Integer.toString(i));
						// 2018. 01. 04 mng_e

						broker.process(Const.P_INS, lData);
						
					}
	
					/*
					if(resultFlag > 0) {
							out.print("<script>alert('센서스경계 자료가 신청되었습니다. \\n\\n승인확인은 \"마이페이지 > 알림정보\" 에서 확인 하시면 됩니다.'); location.href ='shortcut_05_03_01.jsp'</script> 센서스경계 자료가 신청되었습니다. \\n\\n승인확인은 \"마이페이지 > 알림정보\" 에서 확인 하시면 됩니다. <a href='shortcut_05_03_01.jsp'>내역보기</a>");
					} else {
							out.print("<script>alert('센서스경계 자료신청이 정상적으로 처리되지 않았습니다. 신청 내용을 확인해 주세요.'); history.back();</script> 센서스경계 자료신청이 정상적으로 처리되지 않았습니다. 신청 내용을 확인해 주세요. <a href='shortcut_05_03.jsp'>돌아가기</a>");
					}
					*/
					//업무로직 변경으로 인하여 DB입력시 duplicate 이 일어날수밖에 없다. 
					//그래서 일단 상단 resultFlag는 무시하고 아래와같이 처리함.
					out.print("<script>alert('센서스경계 자료가 신청되었습니다. \\n\\n승인확인은 \"마이페이지 > 알림정보\" 에서 확인 하시면 됩니다.'); location.href ='shortcut_05_03_01.jsp'</script> 센서스경계 자료가 신청되었습니다. \\n\\n승인확인은 \"마이페이지 > 알림정보\" 에서 확인 하시면 됩니다. <a href='shortcut_05_03_01.jsp'>내역보기</a>");
	
				/***************************************/
				/* 센서스 수정 */
				/***************************************/
				
				} else if(aT.equals("RET")){
					/****************************************/
					/* 승인, 반려된 경우 수정할 수 있는 권한이 없다.*/
					/* 화면상에서 1차점검후 재차 수정권한 점검*/
					/****************************************/
					lData.setString("PARAM", "ISEDIT");
					lData.setString("sgis_census_req_id", sgis_census_req_id);
					rm = broker.getList(lData);
					String status="";
					if(rm.next()) status = String.valueOf((Character)rm.get("sgis_census_req_status"));

					if((status.equals("A") || status.equals("B")) && !aT.equals("")) {
						out.print("<script>alert('센서스경계 자료신청이 승인(반려) 되었습니다. 수정하실 수 있는 권한이 없습니다.'); location.href='shortcut_05_03_01.jsp'; </script> 센서스경계 자료신청이 승인(반려) 되었습니다. 수정하실 수 있는 권한이 없습니다. <a href='shortcut_05_03_01.jsp'>돌아가기</a>");
					} else if(status.equals("S")){
						/*
						/**********************************/
						/* 아직 신청중이라면 수정 가능 */
						/**********************************/
						/*lData.setString("PARAM", "CENSUS_EDIT");
						lData.setString("sgis_census_req_company", sgis_census_req_company.replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", "").replaceAll("\'", "&apos;").replaceAll("\"","&quot;").replaceAll("&","&amp;"));
						lData.setString("sgis_census_req_tel", sgis_census_req_tel.replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", "").replaceAll("\'", "&apos;").replaceAll("\"","&quot;").replaceAll("&","&amp;"));
						lData.setString("sgis_census_req_goal", sgis_census_req_goal.replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", "").replaceAll("\'", "&apos;").replaceAll("\"","&quot;").replaceAll("&","&amp;"));
						lData.setString("sc_userkey", sc_userkey);
						lData.setString("fileName", fileName);
						lData.setString("sgis_census_req_id", sgis_census_req_id);
						resultFlag = broker.process(Const.P_UPD, lData);*/

						/******************************/
						/* 센서스 년도 삭제후 재등록 */
						/******************************/
						
						/*lData.setString("PARAM", "REMOVE_CENSUS_REQ_YEAR_CODE");
						lData.setString("sgis_census_id", sgis_census_id);
						lData.setString("sgis_census_data_id", sgis_census_data_id);
						lData.setString("sgis_census_req_id", sgis_census_req_id);

						broker.process(Const.P_DEL, lData);
						for(int i=0; i < years.length; i++) {

							lData.setString("PARAM", "CENSUS_APPLY_YEAR");
							lData.setString("years", years[i]);
							lData.setString("sgis_census_id", sgis_census_id);
							lData.setString("sgis_census_data_id", sgis_census_data_id);
							lData.setString("sgis_census_req_id", sgis_census_req_id);
							lData.setString("inUse", inUse[i]);

							resultFlag = broker.process(Const.P_INS, lData);
						}*/
						if(!oldfileName.equals("")){
							fileName = oldfileName;
						}
						
						/******************************/
						/* 센서스 년도 삭제후 재등록 */
						/******************************/
						lData.setString("PARAM", "REMOVE_CENSUS_REQ_YEAR_CODE2");
						broker.process(Const.P_DEL, lData);
					    // 센서스자료신청 삭제
						lData.setString("PARAM", "REMOVE_CENSUS_REQ");
						broker.process(Const.P_DEL, lData);
						
						for(int i = 0; i < sgis_census_id.length; i++){
							
							lData.setString("PARAM", "CENSUS_APPLY");
							lData.setString("sgis_census_req_id", sgis_census_req_id);
							lData.setString("sgis_census_id", sgis_census_id[i]);
							lData.setString("sgis_census_data_id", sgis_census_data_id[i]);
							lData.setString("sc_userkey", sc_userkey);
							lData.setString("sgis_census_req_company", sgis_census_req_company);
							lData.setString("sgis_census_req_tel", sgis_census_req_tel.replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", "").replaceAll("\'", "&apos;").replaceAll("\"","&quot;").replaceAll("&","&amp;"));
							lData.setString("sgis_census_req_goal", sgis_census_req_goal);
							lData.setString("fileName", fileName);
							lData.setString("sc_userkey", sc_userkey);
							
							lData.setString("sgis_census_req_sosok", sgis_census_req_sosok);
							lData.setString("sgis_census_req_mokjuk", sgis_census_req_mokjuk);
							lData.setString("sgis_census_req_kwaje", sgis_census_req_kwaje);
							lData.setString("sgis_census_req_email", sgis_census_req_email);
							
							// 2018. 01. 04 mng_s
							lData.setString("detail_data_seq", Integer.toString(i));
							// 2018. 01. 04 mng_e
			
							resultFlag = broker.process(Const.P_INS, lData);
							
							/******************************/
							/* 센서스 년도 신청 등록 */
							/******************************/
								
							
							lData.setString("PARAM", "CENSUS_APPLY_YEAR");
							lData.setString("years", years[i]);
							lData.setString("sgis_census_id", sgis_census_id[i]);
							lData.setString("sgis_census_data_id", sgis_census_data_id[i]);
							lData.setString("sgis_census_req_id", sgis_census_req_id);
							if ( !"".equals(sido[i])) {
								lData.setString("sido", sido[i].substring(4));
							}
							lData.setString("sigungu", sigungu[i]);
							lData.setString("inUse", "Y");
							
							// 2018. 01. 04 mng_s
							lData.setString("detail_data_seq", Integer.toString(i));
							// 2018. 01. 04 mng_e
							
							broker.process(Const.P_INS, lData);
							
						}
						
					}
						
						/*
						if(resultFlag == 1) {
								out.print("<script>alert('저장되었습니다. \\n\\n승인확인은 \"자료신청> 신청내역\" 에서 확인 하시면 됩니다.'); location.href='shortcut_05_03_01.jsp'</script> 저장되었습니다. \\n\\n승인확인은 \"자료신쳥청> 신청내역\" 에서 확인 하시면 됩니다. <a href='shortcut_05_03_01.jsp'>돌아가기</a>");
						} else {
								out.print("<script>alert('정상적으로 처리되지 않았습니다. 신청 내용을 확인해 주세요.'); location.href='shortcut_05_03.jsp'</script> 정상적으로 처리되지 않았습니다. 신청 내용을 확인해 주세요. <a href='shortcut_05_03.jsp'>돌아가기</a>");
						}
						*/
						//업무로직 변경으로 인하여 DB입력시 duplicate 이 일어날수밖에 없다. 
						//그래서 일단 상단 resultFlag는 무시하고 아래와같이 처리함.
						out.print("<script>alert('저장되었습니다. \\n\\n승인확인은 \"자료신청> 신청내역\" 에서 확인 하시면 됩니다.'); location.href='shortcut_05_03_01.jsp'</script> 저장되었습니다. \\n\\n승인확인은 \"자료신쳥청> 신청내역\" 에서 확인 하시면 됩니다. <a href='shortcut_05_03_01.jsp'>돌아가기</a>");
						
				}
			}else{
				out.print("<script>alert('개인정보 노출  (주민번호, 사업자번호, 법인번호, 신용카드번호, 핸드폰번호) 제거 후 등록 하세요.\\n"+""+privacy02+"'); history.back('');</script> 개인정보 노출  (주민번호, 사업자번호, 법인번호, 신용카드번호, 핸드폰번호) 제거 후 등록 하세요.\\n"+""+privacy02+" <a href='/'>메인화면</a> ");				
			}

	}catch(Exception e) {
			System.out.print("sgisWebError : ");
			out.print("<script>alert('정상적으로 처리되지 않았습니다. 신청내역을 다시 한번 확인해 주세요.'); history.back();</script> 정상적으로 처리되지 않았습니다. 신청내역을 다시 한번 확인해 주세요. <a href='shortcut_05_03.jsp'>돌아가기</a>");
			e.printStackTrace();
	}
%>

