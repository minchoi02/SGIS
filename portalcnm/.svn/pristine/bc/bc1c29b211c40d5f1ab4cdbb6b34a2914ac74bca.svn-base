package kostat.sop.ServiceAPI.api.cm;

import org.apache.log4j.Logger;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.neighborsystem.durian.restapi.model.NFData;

import kostat.sop.ServiceAPI.api.cm.mapper.MyPageDao;

import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsNoAuth;

import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: Logout
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年11月20日 下午3:51:33    
 * @version V1.0      
 *    
 */
public class Logout extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(Logout.class);
	@Resource
	private MyPageDao myPageDao;
	@Override
	public String getApiId() {
		return "mypage_logout";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			String MANAGER_ID = getSession(req, "manager_id");
			if(MANAGER_ID != null)
				req.getSession().removeAttribute("manager_id");
			return myPageDao.Logout(MANAGER_ID);
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
		return null;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return null;
	}

	@Override
	public void prepareExecute(HttpServletRequest req, HttpServletResponse res) throws AbsException {
		// TODO Auto-generated method stub
		super.successExecute(req, res, null);
	}

	@Override
	public void successExecute(HttpServletRequest req, HttpServletResponse res, NFData data) {
		// TODO Auto-generated method stub
		//super.successExecute(req, res, data);
	}

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "로그아웃";
	}

}
