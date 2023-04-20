package kostat.sop.ServiceAPI.api.workRoad.statusAnls;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
*
* @ClassName GetStatusAnlsMnbyRegMonthList
* @Description 일자리 월별 집계 등록월 목록 조회
*
* @author hjh
* @date 2021.06.10
* @version V1.0
*
*/
@SuppressWarnings("rawtypes")
public class GetStatusAnlsMnbyRegMonthList extends AbsQuery<List> {

	private static final Log logger = LogFactory.getLog(GetStatusAnlsMnbyRegMonthList.class);

	enum MustParam {
	}

	enum OptionParam {
		searchRegYear
	}

	@Override
	public String getApiId() {
		return "113009_02";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}

	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		httpSession = req.getSession();
		List result = new ArrayList();

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
			result = session.selectList("wrStatusAnls.getStatusAnlsMnbyRegMonthList", mapParameter);
			logger.info("END Query - TXID[" + getApiId() + "] ");
		} catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		return result;
	}

}