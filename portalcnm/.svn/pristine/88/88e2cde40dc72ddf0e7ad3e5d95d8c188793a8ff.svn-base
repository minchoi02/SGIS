package kostat.sop.ServiceAPI.common.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.sql.*;
import java.io.*;
import java.net.*;
import java.util.*;

/**
 * 1. 기능 : 로그인 세션이 있어야만 접근 가능한 페이지 필터.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2014/08/08  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */
public class AuthenticationFilter implements Filter {
	
	private static final Log logger = LogFactory.getLog(AuthenticationFilter.class);
	
    @Override
    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) req;
		HttpServletResponse httpResponse = (HttpServletResponse) res;
		
		// start of =====================  접근 IP 필터링 ==========================
		/*
		if(	"125.128.71.121".equals(req.getRemoteAddr()) ||
			"125.128.71.121".equals(req.getRemoteAddr())) {
			httpResponse.sendRedirect("/s-portalcnm/html/CM/login.jsp");
		}
		*/
		String accessIP=(String)req.getRemoteAddr();
		
		try{
		 	String sql = "SELECT count(*) FROM mng_dt_accessmng WHERE IP=? AND PERMIT_YN='Y' ";	
		 	Class.forName("kr.co.realtimetech.kairos.jdbc.kairosDriver");
		 	Connection con = DriverManager.getConnection("jdbc:kairos://10.184.95.10:50002/SGISDB;dbmeta=upper","root","root");
		 	//Connection con = DriverManager.getConnection("jdbc:kairos://10.184.95.10:50000/SGISDB;dbmeta=upper","root","sopkairos");
	        //Connection con = DriverManager.getConnection("jdbc:kairos://211.41.186.150:5000/SGISDB;dbmeta=upper","root","root");
		 	PreparedStatement pstmt = con.prepareStatement(sql);
	       	pstmt.setString(1, accessIP);
	       	//pstmt.setString(1, "test");
	       	ResultSet rs=pstmt.executeQuery();
	        int count=0;
	        while(rs.next()) { 
			    int i=1;
			    count = Integer.parseInt(rs.getString(i++));
			    //Logger.debug.println(this,"count" + count);
	  		} 
	  		
	  		if (rs!=null) { 
			   try {
			      rs.close();
			   } catch (SQLException e) {
				   logger.error("서버 처리중 오류가 발생했습니다."); //2017.12.04 [개발팀] 시큐어코딩
			   }
			}
	  
			if(pstmt!=null) {
			   try {
			      pstmt.close();
			   } catch (SQLException e) {
				   logger.error("서버 처리중 오류가 발생했습니다."); //2017.12.04 [개발팀] 시큐어코딩
			   }
			}
			  
			if(con!=null) {
			   try {
			      con.close();
			   } catch (SQLException e) {
				   logger.error("서버 처리중 오류가 발생했습니다."); //2017.12.04 [개발팀] 시큐어코딩
			   }
			}
	        //Logger.debug.println(this,rs);	
	         Boolean isAccess= true;
		 	if(count== 0){
		 		httpResponse.sendRedirect("/html/common/noAuth.html");
			}
		}
		//2017.12.04 [개발팀] 시큐어코딩
        catch (IllegalArgumentException e) {
			logger.error("서버 처리중 오류가 발생했습니다.");
		}
		catch (Exception e) {
			logger.error("서버 처리중 오류가 발생했습니다.");
				//Logger.debug.println(this,e);	
		}
		// end of =====================  접근 IP 필터링 ==========================
		
		
		
		HttpSession session = httpRequest.getSession();
		String manager_id = (String) session.getAttribute("manager_id");
		
		if (manager_id == null ) {
			httpResponse.sendRedirect("/s-portalcnm/html/CM/login.jsp");
		} else {
			chain.doFilter(req, res);
		}
	}

    @Override
    public void init(FilterConfig arg0) throws ServletException {
    }

}