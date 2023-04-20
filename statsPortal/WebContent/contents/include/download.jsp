<%@ page import="java.util.*,java.io.*" contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%

String queryString = request.getQueryString();

String filename = request.getParameter("filename");
String path = request.getParameter("path");

//System.out.println("=================== path 1111======== [" +  path + "]");

//S_20190304 김성연
//로컬 테스트일 경우 패스앞에 C:// 추가이후 패스안에 해당 파일 추가 이후 테스트 필요
String type = request.getParameter("type");
if("board".equals(type)) sc_filePath = "/DATA/docs/statsPotal/upload/";
//E_20190304 김성연

if("edu".equals(type)) sc_filePath = "/DATA/docs/statsPotal/upload/";


//filename = new String(filename.getBytes("8859_1"), "MS949");

//if(queryString.contains("%")) {
//	filename = new String(filename.getBytes("8859_1"), "UTF-8");
//}

//if(null != path) {
//	path += new String(path.getBytes("8859_1"), "MS949");
//}
//File file = new File(path+filename);
if (StringUtils.contains(path,"..") || StringUtils.contains(filename,"..") || StringUtils.contains(path,"passwd")  || StringUtils.contains(filename,"passwd")) {
    response.setContentType("text/html; charset=utf-8");
    out.print("<script>alert('정상적인 요청이 아닙니다!'); history.back();</script> 정상적인 요청이 아닙니다! <a href='/index.jsp'>홈으로</a>");
}else{
	
	/*
	if(filename != null && !"".equals(filename)) {
		filename = filename.replaceAll("/","");
		// 190307 방민정 수정 시작
		//filename = filename.replaceAll("\\","");
		filename = filename.replaceAll("\\\\","");
		// 190307 방민정 수정 끝
		//filename = filename.replaceAll(".","");
		filename = filename.replaceAll("&","");
		filename = filename.replaceAll("\\r","");
		filename = filename.replaceAll("\\n","");
	}
	
	if(path != null && !"".equals(path)) {
		
		//System.out.println("=================== path 2222======== [" +  path + "]");
		
		// 190307 방민정 수정 시작
		//path = path.replaceAll("\\\\","/");
		path = path.replaceAll("\\\\","/");
		System.out.println("=================== path 3333======== [" +  path + "]");
		
		// 190307 방민정 수정 끝
		//path = path.replaceAll(".","");
		
		//System.out.println("=================== path 4444======== [" +  path + "]");
		path = path.replaceAll("&","");
		
		//System.out.println("=================== path 5555======== [" +  path + "]");
		path = path.replaceAll("\\r","");
		
		//System.out.println("=================== path 6666======== [" +  path + "]");
		path = path.replaceAll("\\n","");
		
		//System.out.println("=================== path 7777======== [" +  path + "]");
		
	}
	*/
	
    File file = new File(sc_filePath + path + filename);
    
    
    System.out.println("=================== sc_filePath [" + sc_filePath  + "]");
    System.out.println("=================== path [" +  path + "]");
    System.out.println("=================== filename [" +  filename +"]");
	System.out.println("=================== file [" + sc_filePath + path + filename +"]");

    if (file.isFile()){
        byte b[] = new byte[10 * 1024 * 1024];
        String strClient=request.getHeader("User-Agent");

        if(strClient.indexOf("MSIE 5.5")>-1) {
            response.setHeader("Content-Disposition", "filename=" + java.net.URLEncoder.encode(filename, "utf-8") + ";");
        }else {
            response.setHeader("Content-Disposition", "attachment; filename=\"" + java.net.URLEncoder.encode(filename, "utf-8") + "\";");
        }
       	BufferedInputStream fin = new BufferedInputStream(new FileInputStream(file));
        BufferedOutputStream outs = new BufferedOutputStream(response.getOutputStream());
        try {
            int read = 0;
            while ((read = fin.read(b)) != -1){
                        outs.write(b,0,read);
            }
            outs.close();
            fin.close();
            out.clear();
            out = pageContext.pushBody();
        }
        catch(IllegalArgumentException e) {
        	System.out.println("처리중 에러가 발생하였습니다.");
        }
        catch(Exception e) {
        	System.out.println("처리중 에러가 발생하였습니다.");
        }
        finally {
        	outs.close();
            fin.close();
            out.clear();
        }
    } else {
         response.setContentType("text/html; charset=utf-8");
         // 2016. 03. 25 j.h.Seok 수정
         out.print("<script>alert('선택하신 파일을 찾을 수 없습니다!');</script> 선택하신 파일을 찾을 수 없습니다. <a href='/view/newhelp/us_help_20_10'>돌아가기</a>");
//          out.print("<script>alert('선택하신 파일을 찾을 수 없습니다!');</script> 선택하신 파일을 찾을 수 없습니다. <a href='/contents/search/search_04.jsp'>돌아가기</a>");
    }
}
%>