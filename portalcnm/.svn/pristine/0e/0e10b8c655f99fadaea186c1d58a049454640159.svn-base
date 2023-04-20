<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="kr.co.offton.jdf.util.*"%>
<%@page import="kr.co.offton.pdf.basis.*"%>
<%@page import="kr.co.offton.jdf.cfg.ConfigManager" %>
<%@page import="kr.co.offton.pdf.*"%>
<%
  ConfigManager.getInstance();
  request.setCharacterEncoding("UTF-8");
  String funny_domain = "http://sgis.nso.go.kr";
  /*******************************/
  /* lData의 구분자를 지정해주는 경우.<input type="hidden" name="seperate" value="|" > */
  /*******************************/
  String seperate = StringUtil.fromDB(request.getParameter("seperate"));
  LData lData     = null;

  if(seperate.equals("")) lData     = new LData( request );
  else lData     = new LData( request,seperate);

  /*************************/
  /* 공통변수 */
  /*************************/
  String sc_toDay = DateTime.getShortDateString();							//금일 (예:20081104)
//	String sc_webUrl = "http://127.0.0.1:8080";								//local web url
  String sc_webUrl = ConfigManager.getScWebUrl();							//web url
//	String sc_absouteRoot = "C:/projects/sgis/web";							//local absolute path
  String sc_absouteRoot = ConfigManager.getScAbsouteRoot();					//absolute path
  
  String sc_userid=(String)session.getAttribute("sc_userid");				//session user id
  		 sc_userid=(String)session.getAttribute("member_id"); //SOP
  
  String sc_userkey = (String)session.getAttribute("sc_userkey");			//session user key
  		 //sc_userkey = (String)session.getAttribute("member_key");
  
  String sc_username=(String)session.getAttribute("sc_username");			//session user name
  		 sc_username=(String)session.getAttribute("member_nm");
  
  String sc_authid = (String)session.getAttribute("sc_userlevel");			//session level
  		 sc_authid = (String)session.getAttribute("member_grade");
  
  String sc_telephone = (String)session.getAttribute("sc_telephone");		//session telephone
  		 sc_telephone = (String)session.getAttribute("sc_telephone"); //SOP
  
   
  
  
  // 20140508 add by joonha
  //String sc_mobile_phone = (String)session.getAttribute("sc_mobile_phone");	//session sc_mobile_phone
  String sc_email = (String)session.getAttribute("sc_email");					//session sc_email
  
  //String sc_company_name = (String)session.getAttribute("sc_company_name");	//session company
  String sc_aoi = (String)session.getAttribute("sc_aoi");						//session interest location
  String pop_status = (String)session.getAttribute("pop_status");				//승인된 게시물 알림여부
  
  // 
  String countURL = ConfigManager.getStatisticsURL();					//승인된 게시물 알림여부

//	String sc_filePath = "C:/projects/sgis/upload";																//local file path
  String sc_filePath = ConfigManager.getScFilePath();		  //file path
  String sc_pageTitle=ConfigManager.getScPageTitle();																			//title
  String loginYn = ConfigManager.getLoginYn();																																				//login Y : N
  int fileSizeLimit = ConfigManager.getFileSizeLimit();																									//최대 첨부파일 용량 (default:5M)

  // 메일설정
  String mail_host = ConfigManager.getMailHost();
  String mail_name = ConfigManager.getMailFromName();
  String mail_from = ConfigManager.getMailFromAddress();

  // 실명인증 서비스키
  String srvID = ConfigManager.getNameCheckServiceID();
  String srvNno = ConfigManager.getNamecheckServiceNO();

  // 관리자 허용IP
  String sc_ip1 = ConfigManager.getIpCheckip1();
  String sc_ip2 = ConfigManager.getIpCheckip2();
  String sc_ip3 = ConfigManager.getIpCheckip3();
  String sc_ip4 = ConfigManager.getIpCheckip4();
  String sc_ip5 = ConfigManager.getIpCheckip5();
  
  // 메인화면 설정
  String mainCode = (String)session.getAttribute("mainCode");
  String sgisKey  =  ConfigManager.getApiKey();
  //로그인되었을 경우 Y, 아니면 N

  String wasId = ConfigManager.getWasId();
  if(!StringUtil.isEmpty(sc_userid)) loginYn="Y";
  
	
	/* ============== 시작 쿠키 하이제킹 보안 관련 조치 20140729 ================== */
	//로컬 개발시 주석처리
	/*
	if("Y".equals(loginYn)){
		String jsession_id = "";
		Cookie[] cookies = request.getCookies();
		if ( cookies != null) {
			for( int i=0; i<cookies.length; i++) {
			 jsession_id += cookies[i].getValue();
			}
		}
		if ( session.getAttribute("jsession_id") == null ) {		
			session.setAttribute("jsession_id", jsession_id + request.getRemoteAddr());
		} else {
			if ( ((String)session.getAttribute("jsession_id")).equals(jsession_id + request.getRemoteAddr()) ) {
			} else {
				if( ((String)session.getAttribute("jsession_id")).indexOf(request.getRemoteAddr()) > -1 ){
					session.setAttribute("jsession_id", jsession_id + request.getRemoteAddr());
				}else{
					loginYn="N";
					session.invalidate();
				}		
			}
		}
	}
	*/
	
	/* ============== 끝 쿠키 하이제킹 보안 관련 조치 20140729 ================== */

%>



