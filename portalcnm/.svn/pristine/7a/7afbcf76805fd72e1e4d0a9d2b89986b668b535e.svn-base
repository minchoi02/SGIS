package kostat.sop.ServiceAPI.api.dt.workRoadMnbyStats;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.workRoadMnbyStats.mapper.WorkRoadMnbyStatsResveDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 *
 * @ClassName AddWorkRoadMnbyStatsResve
 * @Description 일자리 경계 현행화 관리 등록
 *
 * @author hjh
 * @date 2021.06.22
 * @version V1.0
 *
 */
public class AddWorkRoadMnbyStatsResve extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AddWorkRoadMnbyStatsResve.class);
	@Resource
	private WorkRoadMnbyStatsResveDao workRoadMnbyStatsResveDAO;

	@Override
	public String getApiId() {
		return "workroadmnbystatsresve_add";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);
			return workRoadMnbyStatsResveDAO.addWorkRoadMnbyStatsResve(paramMap);
		} catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		}
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	private enum MustParam {
		BNDRY_YEAR
	}

	private enum OptionParam {
//		, OVERWRITE_YN
	}

	@Override
	public String getWorkNm() {
		return "입력";
	}

}