package kostat.sop.ServiceAPI.api.dt.workRoadMnbyStats;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.workRoadMnbyStats.mapper.WorkRoadMnbyStatsAddressDao;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 *
 * @ClassName GetWorkRoadMnbyStatsAddressList
 * @Description 행정구역 목록 조회
 *
 * @author hjh
 * @date 2021.06.10
 * @version V1.0
 *
 */
@SuppressWarnings("rawtypes")
public class GetWorkRoadMnbyStatsAddressList extends AbsGridQuery<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(GetWorkRoadMnbyStatsAddressList.class);
	@Resource
	private WorkRoadMnbyStatsAddressDao workRoadMnbyStatsAddressDao;

	@Override
	public String getApiId() {
		return "workroadmnbystats_address";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);

			String addressType = String.valueOf(paramMap.get("ADDRESS_TYPE"));

			if ("SIDO".equals(addressType)) {
				return workRoadMnbyStatsAddressDao.getSidoList(paramMap);
			} else if ("SGG".equals(addressType)) {
				return workRoadMnbyStatsAddressDao.getSggList(paramMap);
			} else {
				return workRoadMnbyStatsAddressDao.getEmdongList(paramMap);
			}

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
		ADDRESS_TYPE
	}

	private enum OptionParam {
		BASE_YEAR, SIDO_CD, SGG_CD
	}

}