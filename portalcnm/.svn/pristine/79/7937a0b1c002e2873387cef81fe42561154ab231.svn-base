package kostat.sop.ServiceAPI.api.mb.manager;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;

import kostat.sop.ServiceAPI.api.mb.manager.mapper.ManagerDao;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: SearchManage
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月28日 下午3:26:25    
 * @version V1.0      
 *   
 */
public class SearchManager extends AbsGridQuery<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(SearchManager.class);
	@Resource
	private ManagerDao managerDao;
	
	@Override
	public String getApiId() {
		return "manager_search";
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);
			String MANAGER_NM = (String) paramMap.get("MANAGER_NM");
			if(MANAGER_NM != null && MANAGER_NM.getBytes().length > 100)
				throw new ApiException("입력값을 체크 해 주세요");
			_transPagging(paramMap);
			return managerDao.searchManager(paramMap);
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
		return OptionParam.class;
	}
	private enum MustParam{
		order,sort,rows,page
	}
	private enum OptionParam{
		MANAGER_ID,MANAGER_NM
	}
}
