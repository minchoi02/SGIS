package kostat.sop.ServiceAPI.api.dt.workRoadStatsItemManage;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.workRoadStatsItemManage.mapper.WorkRoadStatsItemManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: SearchWorkRoadStatsItemManage
 * @Description： 일자리 통계항목 관리 조회
 *
 * @author 한광희
 * @date：2019.07.31    
 * @version V1.0      
 *     
 */
public class SearchWorkRoadStatsItemManage extends AbsGridQuery<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(SearchWorkRoadStatsItemManage.class);
	@Resource
	private WorkRoadStatsItemManageDao workRoadStatsItemManageDao;
	@Override
	public String getApiId() {
		return "workroadstatsitemmanage_searchWorkRoadStatsItemManage";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {	
			logger.debug("시작==================================");
			Map paramMap = getParameterMap(req);
			logger.debug("끝===================================");
			String SEARCH_TYPE = (String) paramMap.get("SEARCH_TYPE");
			String SEARCH_WORD = (String) paramMap.get("SEARCH_WORD");
			if(SEARCH_WORD != null && SEARCH_WORD.getBytes().length > 50)
				throw new ApiException("입력값을 체크 해 주세요");
			_transPagging(paramMap);
			if(SEARCH_WORD !=null){
				paramMap.put("SEARCH_TYPE", SEARCH_TYPE);
				paramMap.put("SEARCH_WORD", "%"+SEARCH_WORD+"%");
			}
			
			return workRoadStatsItemManageDao.searchWorkRoadStatsItemManage(paramMap);
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
		rows,page
	}
	private enum OptionParam{
		SEARCH_TYPE,SEARCH_WORD
	}
}
