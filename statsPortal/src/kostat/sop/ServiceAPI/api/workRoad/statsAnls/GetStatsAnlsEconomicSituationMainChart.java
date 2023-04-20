package kostat.sop.ServiceAPI.api.workRoad.statsAnls;

import java.util.HashMap;
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

public class GetStatsAnlsEconomicSituationMainChart extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(GetStatsAnlsEconomicSituationMainChart.class);

	@Override
	public String getApiId() {
		return "114412";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class<?> getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class<?> getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}

	enum MustParam{
				// 공통코드에서 분류코드 값
	}

	enum OptionParam{
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {

		httpSession = req.getSession();	
		HashMap<String,Object> result =  new HashMap<String,Object>();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
						
			List<Map> mainChart = session.selectList("wrStatsAnls.getStatsAnlsEconomicSituationMainChart", mapParameter);
			List<Map> yearCategory = session.selectList("wrStatsAnls.selectDetailCategoryYear", mapParameter);
			List<Map> monthCategory = session.selectList("wrStatsAnls.selectDetailCategoryMonth", mapParameter);
			
			result.put("mainChart", mainChart);
			result.put("yearCategory", yearCategory);
			result.put("monthCategory", monthCategory);
			
			logger.info("END Query - TXID[" + getApiId() + "] ");
			
		}catch (AbsAPIException e) {
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
