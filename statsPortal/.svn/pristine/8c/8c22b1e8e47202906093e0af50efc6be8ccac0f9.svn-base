package kostat.sop.ServiceAPI.api.administStats;

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

import kostat.sop.ServiceAPI.api.totSurv.population.GetTotPopulation;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

@SuppressWarnings("rawtypes")
public class GetYearList extends AbsQuery<Map> {

	private static final Log logger = LogFactory.getLog(GetTotPopulation.class);

	enum MustParam {
		org_id_list, tbl_id_list
	}

	enum OptionParam {
	}

	@Override
	public String getApiId() {
		return "116700";
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

	@SuppressWarnings("unchecked")
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		httpSession = req.getSession();
		HashMap<String, Object> result = new HashMap<String, Object>();

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);

			String tblIdList = (String) mapParameter.get("tbl_id_list");
			String[] tbl_id_list = null;
			if (tblIdList != null && !tblIdList.equals("")) {
				tbl_id_list = tblIdList.split(",");
			}
			mapParameter.put("tbl_id_list", tbl_id_list);

			List<Map> resultList = session.selectList("administStats.getYearList", mapParameter);

			result.put("resultList", resultList);

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
