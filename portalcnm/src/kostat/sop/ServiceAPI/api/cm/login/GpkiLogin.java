package kostat.sop.ServiceAPI.api.cm.login;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kostat.sop.ServiceAPI.api.cm.login.mapper.LoginDao;
import kostat.sop.ServiceAPI.common.controller.AbsNoAuth;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**   
 *
 * @ClassName: GPKI LOGIN
 * @Description： 
 *
 * @author 이동형   
 * @date：2014    
 * @version V1.0      
 *    
 */
public class GpkiLogin extends AbsNoAuth<Map>{
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(GpkiLogin.class);
	@Resource
	private LoginDao loginDao;

	@Override
	public String getApiId() {
		return "gpkiLogin";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {				
		
		HttpSession httpSession = null;
		httpSession = req.getSession();
		try {
			
			Map resultData = new HashMap();								
			Map mapParameter = getParameterMap(req);					
			
			//Login			
			List managerInfo = loginDao.gpkiManagerInfoLogin(mapParameter);			
			if(managerInfo.size() == 0){
				throw new ApiException("등록된 사용자가 아닙니다. 인증서 등록후 이용해주세요");
			}			
			/*관리자 승인*/
			Map managerInfoGrade = loginDao.gpkiManagerInfo(mapParameter);
			if(managerInfoGrade == null){
				throw new ApiException("관리자 승인후 이용가능합니다.");
			}
			
			String keyfromDB = (String) managerInfoGrade.get("GPKI_KEY");
			String keyfromGPKI = (String) mapParameter.get("gpki_key");
			
			if(keyfromDB == null) {}
			if(keyfromGPKI == null) {}
			
			if(logger.isDebugEnabled()) {
				logger.debug("keyfromDB = [" + keyfromDB + "]");
				logger.debug("keyfromGPKI = [" + keyfromGPKI + "]");
			}
			
			if(!keyfromGPKI.equalsIgnoreCase(keyfromDB)) {
				throw new ApiException("인증서 키번호가 일치 하지 않습니다 재 등록해주세요.");
			}		
			
			//세션등록
			String sessionId = req.getSession().getId();
			String manager_id = (String)mapParameter.get("manager_id");	
			req.getSession().setAttribute("sessionId", sessionId);
			req.getSession().setAttribute("manager_id", (String) manager_id);
			req.getSession().setAttribute("manager_nm", (String) managerInfoGrade.get("MANAGER_NM"));
			req.getSession().setAttribute("manager_grade", (String) managerInfoGrade.get("MANAGER_GRADE"));
			req.getSession().setAttribute("last_access_ip", req.getRemoteAddr());
			
			if (logger.isDebugEnabled()) {
				logger.debug("================================================================");			
				logger.debug("manager_id      = " + req.getSession().getAttribute("manager_id"));
				logger.debug("manager_nm      = " + req.getSession().getAttribute("manager_nm"));
				logger.debug("manager_grade   = " + req.getSession().getAttribute("manager_grade"));
				logger.debug("last_access_ip  = " + req.getSession().getAttribute("last_access_ip"));
				logger.debug("================================================================");
			}
			
			mapParameter.put("LAST_ACCESS_TS", new Timestamp(System.currentTimeMillis()));			
			mapParameter.put("LAST_ACCESS_IP", req.getRemoteAddr());								
					
			mapParameter.put("MANAGER_ID", manager_id);
									 			
			
			
			
		//	req.getSession().setAttribute("sessionId", httpSession.getId());	//세션 고유 ID			
		//	req.getSession().setAttribute("manager_id", manager_id);			//Manager_id
		//	req.getSession().setAttribute("DUPL_LOGIN_SESSION_KEY", httpSession.getId());//세션 고유 ID									
		//	String duplSessionKey = httpSession.getId();
			
			mapParameter.put("DUPL_LOGIN_SESSION_KEY", sessionId);
			loginDao.loginSuccess(mapParameter);
							
			return resultData;
		} catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		}
		
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return null;
	}

	private enum MustParam{
		manager_id, manager_nm, gpki_key;	    	    	  	 	  
	}

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "로그인";
	}
}
