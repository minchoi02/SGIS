package kostat.sop.ServiceAPI.api.dt.workRoadMnbyStats;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.workRoadMnbyStats.mapper.WorkRoadMnbyStatsDao;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 *
 * @ClassName SearchWorkRoadMnbyStats
 * @Description 일자리 월별 집계 목록 페이징 조회
 *
 * @author hjh
 * @date 2021.06.10
 * @version V1.0
 *
 */
@SuppressWarnings("rawtypes")
public class SearchWorkRoadMnbyStats extends AbsGridQuery<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(SearchWorkRoadMnbyStats.class);
	@Resource
	private WorkRoadMnbyStatsDao workRoadMnbyStatsDao;

	@Override
	public String getApiId() {
		return "workroadmnbystats_search";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);

			// 페이징
			_transPagging(paramMap);

			return workRoadMnbyStatsDao.searchWorkRoadMnbyStats(paramMap);
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

	private enum MustParam {
		rows, page
	}

	private enum OptionParam {
		SEARCH_REG_YEAR, SEARCH_REG_MONTH, SEARCH_STDR_SE,
		SEARCH_SIDO_CD, SEARCH_SGG_CD, SEARCH_EMDONG_CD, SEARCH_ADDR_CD,
		SEARCH_CORP_CNT_MTCH_YN, SEARCH_LOGIC_OPRTOR, SEARCH_RCRIT_PSN_CNT_MTCH_YN
	}

}