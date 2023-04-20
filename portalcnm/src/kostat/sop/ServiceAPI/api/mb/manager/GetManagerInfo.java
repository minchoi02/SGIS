package kostat.sop.ServiceAPI.api.mb.manager;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.mb.manager.mapper.ManagerDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: GetManagerInfo
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月28日 下午7:02:42    
 * @version V1.0      
 *   
 */
public class GetManagerInfo extends AbsAuth<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(GetManagerInfo.class);
	@Resource
	private ManagerDao managerDao;
	@Override
	public String getApiId() {
		return "manager_getinfo";
	}
	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			return managerDao.getManagerInfo(req.getParameter(MustParam.MANAGER_ID.name()));
		}  catch (AbsAPIException e) {
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
		MANAGER_ID
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "조회";
	}
	
}
