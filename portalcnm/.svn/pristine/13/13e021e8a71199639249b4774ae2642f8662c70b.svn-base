package kostat.sop.ServiceAPI.api.mn.relstat;

import org.apache.log4j.Logger;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.mn.relstat.mapper.RELStatDao;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.common.util.RequestUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: SearchREL
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年10月19日 下午2:50:30    
 * @version V1.0      
 *   
 */
public class RELAreaStat extends AbsGridQuery<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(RELAreaStat.class);
	@Resource
	private RELStatDao relSearchDao;

	@Override
	public String getApiId() {
		return "relstat_relstat";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);
			_transPagging(paramMap);
			RequestUtil.transSearchDate(paramMap);
			String SEARCH_AREA = (String) paramMap.get("SEARCH_AREA");
			if(SEARCH_AREA != null && SEARCH_AREA.getBytes().length > 50)
				throw new ApiException("입력값을 체크 해 주세요");
			return relSearchDao.getRELAreaStat(paramMap);
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
		STARTDATE,ENDDATE,TIMETYPE,page,rows
	}
	private enum OptionParam{
		SEARCH_AREA
	}

}
