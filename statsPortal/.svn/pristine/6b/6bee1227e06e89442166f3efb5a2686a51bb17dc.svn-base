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

/**
 * 1. 기능 : 일자리 맵 서비스 > 일자리 통계분석 > 일자리현황 조회 <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 손원웅 , 2018.10.25
 *  </pre>
 *  
 * @author 최종 수정자 : 손원웅
 * @version 1.0
 * @see
 * <p/>
 */
public class GetSsaJobStatusMainData extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(GetSsaJobStatusMainData.class);

	@Override
	public String getApiId() {
		return "114001";
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
	}

	enum OptionParam{
	}
	
	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {

		httpSession = req.getSession();
		HashMap<String,Object> resultData = new HashMap<String,Object>();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			List<Map> ssaJobStatusMainData = session.selectList("wrStatsAnls.selectSsaJobStatusMainData");
			//2019-01-04 지표 명 또는 지표 수치 옆에 (년), (분기), (월)에 대한 작은 아이콘을 두어 구분.
			for (Map map : ssaJobStatusMainData) {
				String lvLinkId = StringUtil.isNullToString(map.get("link_id"));
				map.put("link_id", lvLinkId.replaceAll("_1", ""));
				List<Map> selectJobStatsDataInfo = session.selectList("workRoad.selectJobStatsDataInfo",map);
				if (selectJobStatsDataInfo != null && selectJobStatsDataInfo.size() > 0) {
					map.put("updt_cycle", StringUtil.isNullToString(selectJobStatsDataInfo.get(0).get("updt_cycle")));
				}
				else map.put("updt_cycle", "");
				map.put("link_id", lvLinkId);
			}
			
			List<Map> ssaJobStatusMainChart = session.selectList("wrStatsAnls.selectSsaJobStatusMainChart");
			List<Map> ssaDetailCategory = session.selectList("wrStatsAnls.selectSsaDetailCategory");
			List<Map> ssaindicatorTitle = session.selectList("wrStatsAnls.selectSsaindicatorTitle");
			List<Map> ssaCategoryQuerter = session.selectList("wrStatsAnls.selectDetailCategoryQuarter");
			
			resultData.put("mainData", ssaJobStatusMainData);
			resultData.put("mainChart", ssaJobStatusMainChart);	//ChartData
			resultData.put("Category", ssaDetailCategory);	//Category
			resultData.put("indicator_Title", ssaindicatorTitle);	//indicator_Title
			resultData.put("ssaCategoryQuerter", ssaCategoryQuerter);	//일자리현황 - 청년실업률 전용 분기 카테고리
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
		
		return resultData;
	}
}
