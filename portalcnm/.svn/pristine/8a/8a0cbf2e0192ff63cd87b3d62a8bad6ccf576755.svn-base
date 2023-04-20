package kostat.sop.ServiceAPI.api.cm.login;

import org.apache.log4j.Logger;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import kostat.sop.ServiceAPI.api.cm.login.mapper.LoginDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsNoAuth;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.security.SecureDB;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: GPKI 회원등록
 * @Description： 
 *
 * @author 이동형   
 * @date：2014    
 * @version V1.0      
 *    
 */
public class GpkiInfoReg extends AbsQuery<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(GpkiInfoReg.class);
	@Resource
	private LoginDao loginDao;

	@Override
	public String getApiId() {
		return "gpkiInfoReg";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {		
		
		try {			
			Map resultData = new HashMap();								
			Map mapParameter = getParameterMap(req);			
			
			int OverlapCheck = loginDao.getManagerOverlapCheck(mapParameter);
			if(OverlapCheck != 0){
				throw new ApiException("이미 등록된 사용자 입니다.");
			}
			
			loginDao.gpkiManagerKeyUpdate(mapParameter);
			
			/*암호화적용필드*/
			String cp_no = (String)mapParameter.get(MustParam.cp_no.name());
			String tel_no = (String)mapParameter.get(MustParam.tel_no.name());
			String ext_no = (String)mapParameter.get(OptionParam.ext_no.name());
			String email = (String)mapParameter.get(MustParam.email.name());
			String manager_nm = (String)mapParameter.get(MustParam.manager_nm.name());
			String grade = "NN";
			
			cp_no = SecureDB.encryptAria256(cp_no);
			tel_no = SecureDB.encryptAria256(tel_no);
			ext_no = SecureDB.encryptAria256(ext_no);
			email = SecureDB.encryptAria256(email);
			
			//manager_nm = SecureDB.encryptAria256(manager_nm);
			/*암호화적용필드*/			
			
			mapParameter.put("cp_no", cp_no);
			mapParameter.put("tel_no", tel_no);
			mapParameter.put("ext_no", ext_no);
			mapParameter.put("email", email);
			mapParameter.put("manager_no", email);
			mapParameter.put("manager_grade", grade);
			
			loginDao.gpkiInsert(mapParameter);
			
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
		
		return OptionParam.class;
	}

	private enum MustParam{
		manager_id, manager_nm, gpki_key, manager_grade, dept, job_pos, tel_no, cp_no, email;	    	    	  	 	  
	}
	private enum OptionParam{
		ext_no;	    	    	  	 	  
	}

}
