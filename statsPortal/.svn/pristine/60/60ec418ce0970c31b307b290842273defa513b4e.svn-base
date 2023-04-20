package kostat.sop.ServiceAPI.api.workRoad.statsAnls;

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

public class GetStatsAnlsEconomicSituationMain extends AbsQuery<List> {
	private static final Log logger = LogFactory.getLog(GetStatsAnlsEconomicSituationMain.class);

	@Override
	public String getApiId() {
		return "114411";
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
	public List executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {

		httpSession = req.getSession();	
		List<Map> result =  new ArrayList();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
						
			result = session.selectList("wrStatsAnls.getStatsAnlsEconomicSituationMain", mapParameter);
			//2019-01-04 지표 명 또는 지표 수치 옆에 (년), (분기), (월)에 대한 작은 아이콘을 두어 구분.
			for (Map map : result) {
				String lvLinkId = StringUtil.isNullToString(map.get("link_id"));
				map.put("link_id", lvLinkId.replaceAll("_1", ""));
				List<Map> selectJobStatsDataInfo = session.selectList("workRoad.selectJobStatsDataInfo",map);
				if (selectJobStatsDataInfo != null && selectJobStatsDataInfo.size() > 0) {
					map.put("updt_cycle", StringUtil.isNullToString(selectJobStatsDataInfo.get(0).get("updt_cycle")));
				}
				else map.put("updt_cycle", "");
				map.put("link_id", lvLinkId);
			}
			
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
