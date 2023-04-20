package kostat.sop.ServiceAPI.api.dt.themamapmanage;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.themamapmanage.mapper.ThemaMapManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: GetThemaMapParam
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年11月11日 上午11:42:15    
 * @version V1.0      
 *    
 */
public class GetThemaMapParam extends AbsAuth<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(GetThemaMapParam.class);
	@Resource
	private ThemaMapManageDao themaMapManageDao;
	@Override
	public String getApiId() {
		return "themamapmanage_getthemamapparam";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}
	
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "조회";
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			return themaMapManageDao.getThemaMapParam(req.getParameter(MustParam.STAT_THEMA_MAP_ID.name()));
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
		STAT_THEMA_MAP_ID
	}

}
