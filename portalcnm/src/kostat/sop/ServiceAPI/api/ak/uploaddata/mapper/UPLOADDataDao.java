package kostat.sop.ServiceAPI.api.ak.uploaddata.mapper;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.api.ak.uploaddata.SearchUser;
import kostat.sop.ServiceAPI.api.dt.thmetamanage.DelMetaData;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;






//import org.apache.ibatis.binding.MapperMethod.ParamMap;
import org.apache.log4j.Logger;
import org.apache.taglibs.standard.tag.common.core.ParamSupport.ParamManager;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Component;

import com.ksign.securedb.api.util.SDBException;

import kostat.sop.ServiceAPI.common.security.SecureDB;

/**   
 *
 * @ClassName: UPLOADData
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月22日 下午7:08:22    
 * @version V1.0      
 *     
 */
@Component
public class UPLOADDataDao extends SqlSessionDaoSupport{
	@Resource
	public void setSuperSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		super.setSqlSessionTemplate(sqlSessionTemplate);
	}
	String perpertyPath = "/globals.properties";
	public String getPerpertyPath() {
		return perpertyPath;
	}
	
	private String Driver = null;
	private String URL = null;
	private String user = null;
	private String passwd = null;
	private Connection con = null;
	
	Properties pt = new Properties();
	
	public Map searchUser(Map paramMap) throws SQLException, ClassNotFoundException, FileNotFoundException, IOException, NullPointerException, SDBException {
		
		Map resultMap = new HashMap();
		
		try {
			ClassPathResource resource = new ClassPathResource(getPerpertyPath());
			pt = PropertiesLoaderUtils.loadProperties(resource);
//			pt.load(new FileInputStream(ptPath));
			Driver = pt.getProperty("Driver");
			URL = pt.getProperty("URL");
			user = pt.getProperty("user");;
			passwd = pt.getProperty("pw");
			
			//시큐어코딩(2016-12-05) 하드코드된 비밀번호, 취약한 비밀번호
			passwd = SecureDB.decryptAria256(passwd);

//			System.out.println(SecureDB.decryptAria256("apEDizp+jROXdVkMUYlY0Q==")); //sop1234
//			System.out.println(SecureDB.decryptAria256("Oi8lq0H4mXBP8ax0hWMmQQ==")); //ustatgis_ps$
//			System.out.println(SecureDB.encryptAria256("sop1234"));
//			System.out.println(SecureDB.encryptAria256("ustatgis_ps$"));
			
			Class.forName(Driver);
			con = DriverManager.getConnection(URL,user,passwd);
		 	
			PreparedStatement pstmt = null;
			ResultSet rs  = null;
			String sql = "";
		 	
		 	// SEARCH_WORD 
		 	String searchWord = (String) paramMap.get("SEARCH_WORD");
		 	String shareYn = (String) paramMap.get("SHARE_YN");
			String page = (String) paramMap.get("page");
					 	
		 	int end = Integer.parseInt(page) * 10;
		 	int start = end - 9;

		 	// user total count
		 	int count = selectCountUser(searchWord, shareYn);
		 	
		 	// user list
		 	List arr = selectUserList(searchWord, shareYn, start, end);
	       	
	    	resultMap.put("total", count);
	    	resultMap.put("rows", arr);

		} catch (SQLException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} catch (ClassNotFoundException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} catch (FileNotFoundException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} catch (IOException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} finally{
			if (con != null ) con.close();		
		}
		
		return resultMap;
	}
	
	public Map searchUserData(Map paramMap) throws SQLException, ClassNotFoundException, IOException, NullPointerException, SDBException {
		Map resultMap = new HashMap();
		
		try {
			ClassPathResource resource = new ClassPathResource(getPerpertyPath());
			pt = PropertiesLoaderUtils.loadProperties(resource);
			Driver = pt.getProperty("Driver");
			URL = pt.getProperty("URL");
			user = pt.getProperty("user");;
			passwd = pt.getProperty("pw");
			
			//시큐어코딩(2016-12-05) 하드코드된 비밀번호, 취약한 비밀번호
			passwd = SecureDB.decryptAria256(passwd);
			
			Class.forName(Driver);
			con = DriverManager.getConnection(URL,user,passwd);
			
			PreparedStatement pstmt = null;
			ResultSet rs  = null;
			String sql = "";	
			
		 	String userId = (String) paramMap.get("USER_ID");
		 	String shareYn = (String) paramMap.get("SHARE_YN");
		 	String searchDiv = (String) paramMap.get("SEARCH_DIV");
		 	String searchWord = (String) paramMap.get("SEARCH_WORD");
		 	
		 	String page = (String) paramMap.get("page");
		 	
		 	int end = Integer.parseInt(page) * 10;
		 	int start = end - 9;
		 	
		 	// user data total count
	 	 	int count = selectCountUserData(userId, shareYn, searchDiv ,searchWord);
		 	 	
	 	 	// user data list
	 	 	List arr = selectUserDataList(userId, shareYn, searchDiv ,searchWord, start, end);
	        
	 	 	// 활설용량
	 	 	int activeMB = selectUserActiveData(userId);
	 	 	
	 	 	// 누적총용량
	 	 	int totalMB = selectUserTotalData(userId);
	        
	 	 	// 사용자이름
	 	 	String userNm = selectGetUserNm(userId);
	 	 	
	    	resultMap.put("total", count);
	    	resultMap.put("rows", arr);
	    	
	    	resultMap.put("usrid", userId);
	    	resultMap.put("usrnm", userNm);
	    	resultMap.put("activemb", activeMB);
	    	resultMap.put("totalmb", totalMB);
		} catch (SQLException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} catch (ClassNotFoundException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} catch (IOException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");	
		} finally{
			if (con != null ) con.close();		
		}
    	return resultMap;
	}
	
	public Success deleteUserData(String[] list) throws SQLException, ClassNotFoundException, IOException, NullPointerException, SDBException {
		Success success = new Success(false,Prompt.DELETEFAIL);
		
		try {
			ClassPathResource resource = new ClassPathResource(getPerpertyPath());
			pt = PropertiesLoaderUtils.loadProperties(resource);
			Driver = pt.getProperty("Driver");
			URL = pt.getProperty("URL");
			user = pt.getProperty("user");;
			passwd = pt.getProperty("pw");
			
			//시큐어코딩(2016-12-05) 하드코드된 비밀번호, 취약한 비밀번호
			passwd = SecureDB.decryptAria256(passwd);
			
			Class.forName(Driver);
			con = DriverManager.getConnection(URL,user,passwd);
			int count = 0;
			
			for(int i=0; i<list.length; i++) {
				String dataId = list[i];
				int delCnt = deleteData(dataId);
				count += delCnt;
			}
			
			if(count > 0){
				success.setSuccess(true);
				success.setMsg(Prompt.DELETESUCCESS);
			}
		} catch (SQLException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} catch (ClassNotFoundException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} catch (IOException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} finally{
			if (con != null ) con.close();		
		}
		return success;
	}
	
	public Success updateUserData(Map paramMap) throws SQLException, ClassNotFoundException, IOException, NullPointerException, SDBException {
		Success success = new Success(false,Prompt.UPDATEFAIL);
		try {
			ClassPathResource resource = new ClassPathResource(getPerpertyPath());
			pt = PropertiesLoaderUtils.loadProperties(resource);
			Driver = pt.getProperty("Driver");
			URL = pt.getProperty("URL");
			user = pt.getProperty("user");;
			passwd = pt.getProperty("pw");
			
			//시큐어코딩(2016-12-05) 하드코드된 비밀번호, 취약한 비밀번호
			passwd = SecureDB.decryptAria256(passwd);
			
			Class.forName(Driver);
			con = DriverManager.getConnection(URL,user,passwd);
			
			int count = 0;
			
			String dataId = (String) paramMap.get("DATA_ID");
			String endDt = (String) paramMap.get("END_DT");
			endDt = endDt.substring(0,4)+endDt.substring(5,7)+endDt.substring(8,10);
			String shareYn = (String) paramMap.get("SHARE_YN");
			String shareYnOld = (String) paramMap.get("SHARE_YN_OLD");
			String useHistory = (String) paramMap.get("USE_HISTORY");
			
			// grantdt update set
			String grantYn = "N"; 
			if(shareYnOld != null && shareYn != null) {
				if(!shareYnOld.equals("Y") && shareYn.equals("Y")) {
					grantYn = "Y";
				}
			}
			
			count = updateData(dataId, endDt, shareYn, grantYn,useHistory);
			
			if(count > 0){
				success.setSuccess(true);
				success.setMsg(Prompt.UPDATESUCCESS);
			}
		} catch (SQLException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} catch (ClassNotFoundException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} catch (IOException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} finally{
			if (con != null ) con.close();		
		}
		return success;
	}	
	
	public int selectCountUser(String searchWord, String shareYn) {
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql ="";
		int count = 0;
		try {
			sql  = "SELECT count(*) as CNT ";	
		 	sql += "FROM SRV_DT_USER_UPLOAD_STATUS ";
		 	sql += "WHERE USR_ID IN(SELECT USR_ID FROM SRV_DT_USER_DATA_UPLOAD_MAIN";
	 		if(shareYn != null && !shareYn.equals("ALL")) {
	 			sql += " where SHARE_YN = ? )";
		 	} else {
		 		sql += " ) ";
		 	}
		 	if(searchWord != null && searchWord.getBytes().length > 1) {
		 		sql += " and usr_nm like ? ";
		 	}
		 	logger.debug(sql);
			ps = con.prepareStatement(sql);
			if(shareYn != null && !shareYn.equals("ALL")) {
				ps.setString(1, shareYn);
				if(searchWord != null && searchWord.getBytes().length > 1) {
					ps.setString(2, searchWord);
				}
			} else {
				if(searchWord != null && searchWord.getBytes().length > 1) {
					ps.setString(1, searchWord);
				}
			}
			
	       	rs = ps.executeQuery();
	       
	        while(rs.next()) { 
			    int i=1;
			    count = Integer.parseInt(rs.getString("CNT"));
	  		} 
			
		} catch (SQLException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} finally {    		
			try {
				if (ps != null) ps.close();
				if (rs != null) rs.close();
			} catch (SQLException ee) {
				logger.error(ee);
				throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
			}
		}		
		return count;
	}
	
	public List selectUserList(String searchWord, String shareYn, int start, int end) {
		List arr = new ArrayList();
		
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql ="";		
		try {			
			sql  = "SELECT * FROM ( ";	
			sql += "    SELECT ROWNUM AS R, usr_id, acc_tot_sz, usr_nm ";
			sql += "    FROM ( ";
			sql += "        SELECT * FROM SRV_DT_USER_UPLOAD_STATUS ";
			sql += "		WHERE USR_ID IN(SELECT USR_ID FROM SRV_DT_USER_DATA_UPLOAD_MAIN";
	 		if(shareYn != null && !shareYn.equals("ALL")) {
	 			sql += " where SHARE_YN = ? )";
		 	} else {
		 		sql += " ) ";
		 	}
			if(searchWord != null && searchWord.getBytes().length > 1) {
		 		sql += " and usr_nm like ? ";
		 	}	
			sql += "        and ROWNUM <= ?";
	        sql += "        ORDER BY usr_id )   ";
	        sql += "    ) where R >= ?";
	        
			logger.debug(sql);
			ps = con.prepareStatement(sql);
			if(shareYn != null && !shareYn.equals("ALL")) {
				if(searchWord != null && searchWord.getBytes().length > 1) {
					ps.setString(1, shareYn);
					ps.setString(2, searchWord);
					ps.setInt(3, end);
					ps.setInt(4, start);
				} else {
					ps.setString(1, shareYn);
					ps.setInt(2, end);
					ps.setInt(3, start);
				}
			} else {
				if(searchWord != null && searchWord.getBytes().length > 1) {
					ps.setString(1, searchWord);
					ps.setInt(2, end);
					ps.setInt(3, start);
				} else {
					ps.setInt(1, end);
					ps.setInt(2, start);
				}
			}
			rs = ps.executeQuery();
			
	        while(rs.next()){
	        	Map temp = new HashMap();
	        	temp.put("USER_NM",rs.getString("usr_nm"));
	        	temp.put("USER_ID",rs.getString("usr_id"));
	        	temp.put("ACC_TOT_SZ",rs.getString("acc_tot_sz"));
	        	temp.put("R",rs.getString("R"));
				arr.add(temp);	
			}
		} catch (SQLException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} finally {    		
			try {				
				if (ps != null) ps.close();
				if (rs != null) rs.close();
			} catch (SQLException ee) {
				logger.error(ee);
				throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
			}
		}		
		return arr;
	}
	
	public int selectCountUserData(String userId, String shareYn, String searchDiv, String searchWord) {
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql ="";
		int count = 0;
		try {
			sql =  "SELECT count(DATA_ID) as CNT ";	
	        sql += " FROM SRV_DT_USER_DATA_UPLOAD_MAIN ";
	        if(userId != null && userId.getBytes().length > 1) {
		 		sql += " WHERE USR_ID = ? ";
		 	}
	        if(shareYn != null && !shareYn.equals("ALL")) {
	        	
		 		sql += " and SHARE_YN = ? ";
		 	}
	        if(searchWord != null && searchWord.getBytes().length > 1) {
	        	if(searchDiv != null && searchDiv.equals("ALL")) {
	        		sql += " and (DATA_TITLE like ? or FILE_NM_REAL like ? ) ";
	    	 	} else if(searchDiv != null && searchDiv.equals("TITLE")) {
	    	 		sql += " and DATA_TITLE like ? ";
	    	 	} else if(searchDiv != null && searchDiv.equals("FILE")) {
	    	 		sql += " and FILE_NM_REAL like ? ";
	    	 	}
		 	}
	        logger.debug(sql);
	        ps = con.prepareStatement(sql);
	        if(userId != null && userId.getBytes().length > 1) {
	        	ps.setString(1, userId);
	        	if(shareYn != null && !shareYn.equals("ALL")) {
        			ps.setString(2, shareYn);
	        		if(searchWord != null && searchWord.getBytes().length > 1) {
	        			ps.setString(3, searchWord);
	        			if(searchDiv != null && searchDiv.equals("ALL")) {
		        			ps.setString(4, searchWord);
	    	        	} 
	        		} 
				} else {
					if(searchWord != null && searchWord.getBytes().length > 1) {
	        			ps.setString(2, searchWord);
	        			if(searchDiv != null && searchDiv.equals("ALL")) {
		        			ps.setString(3, searchWord);
	    	        	} 
	        		} 
				}
			} else {
				if(shareYn != null && !shareYn.equals("ALL")) {
					ps.setString(1, shareYn);
					if(searchWord != null && searchWord.getBytes().length > 1) {
	        			ps.setString(2, searchWord);
	        			if(searchDiv != null && searchDiv.equals("ALL")) {
		        			ps.setString(3, searchWord);
	    	        	} 
	        		} 
				} else {
					if(searchWord != null && searchWord.getBytes().length > 1) {
	        			ps.setString(1, searchWord);
	        			if(searchDiv != null && searchDiv.equals("ALL")) {
		        			ps.setString(2, searchWord);
	    	        	} 
	        		} 
				}
			}
	       	rs = ps.executeQuery();
	        while(rs.next()) { 
			    int i=1;
			    count = Integer.parseInt(rs.getString("CNT"));
	  		}
		} catch (SQLException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} finally {    		
			try {
				if (ps != null) ps.close();
				if (rs != null) rs.close();
			} catch (SQLException ee) {
				logger.error(ee);
				throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
			}
		}		
		return count;
	}
	
	public List selectUserDataList(String userId, String shareYn, String searchDiv, String searchWord, int start, int end) {
		List arr = new ArrayList();
		
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql ="";		
		try {
			sql =  "select * from (  ";
			sql += " SELECT ROWNUM R, A.DATA_ID, A.USR_ID, A.SHARE_YN, A.DATA_TITLE, ";
			sql += " to_char(A.UPLOAD_DT,'yyyy-mm-dd') as UPLOAD_DT, ";
	        sql += " to_char(A.START_DT,'yyyy-mm-dd') as START_DT, ";
	        sql += " to_char(A.END_DT,'yyyy-mm-dd') as END_DT, ";
	        sql += " A.FILE_PATH, A.FILE_NM_REAL, A.FILE_NM_LOGIC, ";
	        sql += " A.FILE_SZ, A.MAP_DISP_TYPE, A.SHARE_GRANT_MANAGER_ID, ";
	        sql += " to_char(A.GRANT_DT,'yyyy-mm-dd') as GRANT_DT, ";
	        sql += " A.USE_HISTORY, ";
	        sql += " B.usr_nm ";
	        sql += " FROM SRV_DT_USER_DATA_UPLOAD_MAIN A, SRV_DT_USER_UPLOAD_STATUS B ";
	        sql += " WHERE A.USR_ID = B.USR_ID";
	        if(userId != null && userId.getBytes().length > 1) {
		 		sql += " and A.USR_ID = ? ";
		 	}
	        if(shareYn != null && !shareYn.equals("ALL")) {
	        	
		 		sql += " and A.SHARE_YN = ? ";
		 	}
	        if(searchWord != null && searchWord.getBytes().length > 1) {
	        	if(searchDiv != null && searchDiv.equals("ALL")) {
	        		sql += " and (A.DATA_TITLE like ? or A.FILE_NM_REAL like ? ) ";
	    	 	} else if(searchDiv != null && searchDiv.equals("TITLE")) {
	    	 		sql += " and A.DATA_TITLE like ? ";
	    	 	} else if(searchDiv != null && searchDiv.equals("FILE")) {
	    	 		sql += " and A.FILE_NM_REAL like ? ";
	    	 	}
		 	}
	        sql += " and ROWNUM <= " + end + " ) ";
	        sql += " WHERE R >= " + start;
	        sql += " ORDER BY DATA_TITLE ";
	        
	        /*
			sql =  "SELECT DATA_ID, USR_ID, SHARE_YN, DATA_TITLE, ";	
	        sql += " to_char(UPLOAD_DT,'yyyy-mm-dd') as UPLOAD_DT, ";
	        sql += " to_char(START_DT,'yyyy-mm-dd') as START_DT, ";
	        sql += " to_char(END_DT,'yyyy-mm-dd') as END_DT, ";
	        sql += " FILE_PATH, FILE_NM_REAL, FILE_NM_LOGIC, ";
	        sql += " FILE_SZ, MAP_DISP_TYPE, SHARE_GRANT_MANAGER_ID, ";
	        sql += " to_char(GRANT_DT,'yyyy-mm-dd') as GRANT_DT ";
	        sql += " FROM SRV_DT_USER_DATA_UPLOAD_MAIN ";
	        if(userId != null && userId.getBytes().length > 1) {
		 		sql += " WHERE USR_ID = '" + userId + "' ";
		 	}
	        if(shareYn != null && !shareYn.equals("ALL")) {
	        	
		 		sql += " and SHARE_YN = '" + shareYn + "' ";
		 	}
	        if(searchWord != null && searchWord.getBytes().length > 1) {
	        	if(searchDiv != null && searchDiv.equals("ALL")) {
	        		sql += " and (DATA_TITLE like '" + searchWord + "' or FILE_NM_REAL like '" + searchWord + "') ";
	    	 	} else if(searchDiv != null && searchDiv.equals("TITLE")) {
	    	 		sql += " and DATA_TITLE like '" + searchWord + "' ";
	    	 	} else if(searchDiv != null && searchDiv.equals("FILE")) {
	    	 		sql += " and FILE_NM_REAL like '" + searchWord + "' ";
	    	 	}
		 	}
	        sql += " ORDER BY DATA_TITLE ";
	        */
	        logger.debug(sql);
	        ps = con.prepareStatement(sql);
	        if(userId != null && userId.getBytes().length > 1) {
	        	ps.setString(1, userId);
	        	if(shareYn != null && !shareYn.equals("ALL")) {
        			ps.setString(2, shareYn);
	        		if(searchWord != null && searchWord.getBytes().length > 1) {
	        			ps.setString(3, searchWord);
	        			if(searchDiv != null && searchDiv.equals("ALL")) {
		        			ps.setString(4, searchWord);
	    	        	} 
	        		} 
				} else {
					if(searchWord != null && searchWord.getBytes().length > 1) {
	        			ps.setString(2, searchWord);
	        			if(searchDiv != null && searchDiv.equals("ALL")) {
		        			ps.setString(3, searchWord);
	    	        	} 
	        		} 
				}
			} else {
				if(shareYn != null && !shareYn.equals("ALL")) {
					ps.setString(1, shareYn);
					if(searchWord != null && searchWord.getBytes().length > 1) {
	        			ps.setString(2, searchWord);
	        			if(searchDiv != null && searchDiv.equals("ALL")) {
		        			ps.setString(3, searchWord);
	    	        	} 
	        		} 
				} else {
					if(searchWord != null && searchWord.getBytes().length > 1) {
	        			ps.setString(1, searchWord);
	        			if(searchDiv != null && searchDiv.equals("ALL")) {
		        			ps.setString(2, searchWord);
	    	        	} 
	        		} 
				}
			}
	        rs = ps.executeQuery();
	        
	        while(rs.next()){
	        	Map temp = new HashMap();
	        	temp.put("USR_NM",rs.getString("USR_NM"));
	        	temp.put("DATA_ID",rs.getString("DATA_ID"));
	        	temp.put("USR_ID",rs.getString("USR_ID"));
	        	temp.put("SHARE_YN",rs.getString("SHARE_YN"));
	        	temp.put("DATA_TITLE",rs.getString("DATA_TITLE"));
	        	temp.put("UPLOAD_DT",rs.getString("UPLOAD_DT"));
	        	temp.put("START_DT",rs.getString("START_DT"));
	        	temp.put("END_DT",rs.getString("END_DT"));
	        	temp.put("FILE_PATH",rs.getString("FILE_PATH"));
	        	temp.put("FILE_NM_REAL",rs.getString("FILE_NM_REAL"));
	        	temp.put("FILE_NM_LOGIC",rs.getString("FILE_NM_LOGIC"));
	        	temp.put("FILE_SZ",rs.getString("FILE_SZ"));
	        	temp.put("MAP_DISP_TYPE",rs.getString("MAP_DISP_TYPE"));
	        	temp.put("SHARE_GRANT_MANAGER_ID",rs.getString("SHARE_GRANT_MANAGER_ID"));
	        	temp.put("GRANT_DT",rs.getString("GRANT_DT"));
	        	temp.put("USE_HISTORY", rs.getString("USE_HISTORY"));
				arr.add(temp);	
			}
		} catch (SQLException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} finally {    		
			try {				
				if (ps != null) ps.close();
				if (rs != null) rs.close();
			} catch (SQLException ee) {
				logger.error(ee);
				throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
			}
		}		
		return arr;
	}
	
	public int selectUserActiveData(String searchWord) {
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql ="";
		int activeMB=0;
		try {
			sql =  "SELECT sum(FILE_SZ) as ACTIVE_MB ";	
			sql += " FROM SRV_DT_USER_DATA_UPLOAD_MAIN ";
			if(searchWord != null && searchWord.getBytes().length > 1) {
				sql += " WHERE USR_ID = ? ";
			}
			sql += " and END_DT > sysdate ";
			ps = con.prepareStatement(sql);
			if(searchWord != null && searchWord.getBytes().length > 1) {
				ps.setString(1, searchWord);
			}
			rs = ps.executeQuery();
			
			while(rs.next()) { 
				int i=1;
				if(rs.getString("ACTIVE_MB") == null) {
					activeMB = 0;
				} else {
					activeMB = Integer.parseInt(rs.getString("ACTIVE_MB"));
				}
			}
			
		} catch (SQLException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} finally {    		
			try {
				if (ps != null) ps.close();
				if (rs != null) rs.close();
			} catch (SQLException ee) {
				logger.error(ee);
				throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
			}
		}		
		return activeMB;
	}
	
	public int selectUserTotalData(String searchWord) {
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql ="";
		int totalMB=0;
		try {
			sql  = "SELECT acc_tot_sz ";	
			sql += " FROM SRV_DT_USER_UPLOAD_STATUS ";
			if(searchWord != null && searchWord.getBytes().length > 1) {
				sql += " WHERE USR_ID = ? ";
			}
			logger.debug(sql);
			ps = con.prepareStatement(sql);
			if(searchWord != null && searchWord.getBytes().length > 1) {
				ps.setString(1, searchWord);
			}
			rs = ps.executeQuery();

			while(rs.next()) { 
				int i=1;
				if(rs.getString("acc_tot_sz") == null) {
					totalMB = 0;
				} else {
					totalMB = Integer.parseInt(rs.getString("acc_tot_sz"));
				}
			}
			
		} catch (SQLException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} finally {    		
			try {
				if (ps != null) ps.close();
				if (rs != null) rs.close();
			} catch (SQLException ee) {
				logger.error(ee);
				throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
			}
		}		
		return totalMB;
	}
	public String selectGetUserNm(String searchWord) {
		PreparedStatement ps = null;
		ResultSet rs = null;
		String sql ="";
		String ret = "";
		try {
			sql  = "SELECT USR_NM ";	
		 	sql += " FROM SRV_DT_USER_UPLOAD_STATUS ";
		 	if(searchWord != null && searchWord.getBytes().length > 1) {
		 		sql += " WHERE usr_id like ? ";
		 	}
		 	logger.debug(sql);
			ps = con.prepareStatement(sql);
			if(searchWord != null && searchWord.getBytes().length > 1) {
				ps.setString(1, searchWord);
			}
	       	rs = ps.executeQuery();
	       
	        while(rs.next()) { 
			    int i=1;
			    if(rs.getString("USR_NM") == null) {
			    	 ret = "";
				} else {
					 ret = rs.getString("USR_NM");
				}
			    ret = rs.getString("USR_NM");
	  		} 
			
		} catch (SQLException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} finally {    		
			try {
				if (ps != null) ps.close();
				if (rs != null) rs.close();
			} catch (SQLException ee) {
				logger.error(ee);
				throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
			}
		}		
		return ret;
	}
	
	public int deleteData(String dataId) {
		PreparedStatement ps = null;
		String sql ="";
		int count=0;
		try {
			sql  = "DELETE FROM SRV_DT_USER_UPLOAD_DATA ";
			sql += " WHERE USR_DATA_ID = ? ";
			
			logger.debug(sql);
			ps = con.prepareStatement(sql);
			ps.setString(1, dataId);
			ps.executeUpdate();
			
			sql  = "DELETE FROM SRV_DT_USER_META_DATA ";
			sql += " WHERE DATA_ID = ? ";
			
			logger.debug(sql);
			ps = con.prepareStatement(sql);
			ps.setString(1, dataId);
			ps.executeUpdate();
			
			sql  = "DELETE FROM SRV_DT_USER_DATA_UPLOAD_MAIN ";
			sql += " WHERE DATA_ID = ? ";
			
			logger.debug(sql);
			ps = con.prepareStatement(sql);
			ps.setString(1, dataId);
			count = ps.executeUpdate();
			
		} catch (SQLException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} finally {    		
			try {
				if (ps != null) ps.close();
			} catch (SQLException ee) {
				logger.error(ee);
				throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
			}
		}		
		return count;
	}
	
	public int updateData(String dataId, String endDt, String shareYn, String grantYn,String useHistory) {
		PreparedStatement ps = null;
		String sql ="";
		int count=0;
		try {
			sql  = "UPDATE SRV_DT_USER_DATA_UPLOAD_MAIN set ";	
			sql += " END_DT = to_date(?,'YYYYMMDDHH24') , ";
			if(grantYn != null && grantYn.equals("Y")) {
				sql += " GRANT_DT = sysdate, ";
			}
			sql += " SHARE_YN = ? , ";
			sql += " USE_HISTORY = ? ";
			sql += " WHERE DATA_ID = ? ";
			
			logger.debug(sql);
			ps = con.prepareStatement(sql);
			ps.setString(1, endDt);
			ps.setString(2, shareYn);
			ps.setString(3, useHistory);
			ps.setString(4, dataId);
			count = ps.executeUpdate();
			
		} catch (SQLException e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		} finally {    		
			try {
				if (ps != null) ps.close();
			} catch (SQLException ee) {
				logger.error(ee);
				throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
			}
		}		
		return count;
	}
}