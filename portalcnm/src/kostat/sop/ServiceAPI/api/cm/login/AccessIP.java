package kostat.sop.ServiceAPI.api.cm.login;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.neighborsystem.durian.restapi.model.NFData;

import kostat.sop.ServiceAPI.api.cm.login.mapper.LoginDao;
import kostat.sop.ServiceAPI.common.controller.AbsCnm;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;

/**
 *
 * @ClassName: SetSession
 * @Description：
 *
 * @author xuliguo
 * @date：2014年11月28日 上午9:13:12
 * @version V1.0
 * 
 */
public class AccessIP extends AbsCnm<Map> {
	private static final Log logger = LogFactory.getLog(AccessIP.class);

	@Override
	public String getApiId() {
		return "1005";
	}

	@Resource
	private LoginDao loginDao;

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.GET;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			Map mapParameter = getParameterMap(req);
			int ipCount = loginDao.ipAccessCheck(mapParameter);
			Map resultData = new HashMap();
			Boolean isAccess = false;
			if (ipCount > 0) {
				isAccess = true;
			}
			resultData.put("isAccess", ipCount);
			return resultData;
		} catch (AbsException e) {
			logger.error(e);
			throw e;
		}

	}
	
	@Override
	public void successExecute(HttpServletRequest req, HttpServletResponse res, NFData data) {
		
	}
	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return null;
	}

	private enum OptionParam {

	}

	private enum MustParam {
		IP
	}

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return null;
	}

}
