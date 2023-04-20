package kostat.sop.ServiceAPI.api.urban;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.exceptions.PersistenceException;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.DurianSQLException;
import kostat.sop.ServiceAPI.exception.NoResultException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;

public class UrbarsFacilitySearch extends AbsQuery<HashMap<String, Object>> {

	private static final Log logger = LogFactory.getLog(UrbarsFacilitySearch.class);

	@Override
	public String getApiId() {
		return "API_220830";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public HashMap<String, Object> executeAPI(HttpServletRequest req, HttpServletResponse res, String trId)
			throws AbsException {
		httpSession = req.getSession();
		HashMap<String, Object> resultMap = new HashMap<>();
		List<?> result = null;

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);
			logger.info("Query INFO - ApiID[" + getApiId() + "] Info : " + mapParameter.toString());
			_checkNullParameterValue(mapParameter);

			optimizeParameterMap(mapParameter);

			String strFormat = _getViewType(req, res);

			if (strFormat.equals("geojson") || strFormat.equals("kml")) {
				throw new NotSupportFormatException("Not Support Format[" + strFormat + "]");
			}
			String ksic = StringUtil.isNullToString(mapParameter.get("ksic_5_cd"));
			String urbanId = StringUtil.isNullToString(mapParameter.get("urban_id"));
			String admCd = StringUtil.isNullToString(mapParameter.get("adm_cd"));

			 if ("87210".equals(ksic) && "Center_019".equals(urbanId) && "undefined".equals(admCd) ) {
				result = session.selectList("urban.selectFacilitySearchList1", mapParameter);
			} else if ("85110".equals(ksic) && "Center_019".equals(urbanId) && "undefined".equals(admCd) ) {
				result = session.selectList("urban.selectFacilitySearchList2", mapParameter);
			}else if(admCd !="") {
				result = session.selectList("urban.selectFacilitySearchList", mapParameter);
			}else {
				result = session.selectList("urban.selectFacilitySearchList", mapParameter);
			}

			resultMap.put("list", result);

			logger.info("END Query - TXID[" + getApiId() + "] ");

		} catch (PersistenceException e) {
			logger.error(e);
			throw new DurianSQLException("SQL ERROR");
		} catch (ApiException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요.", COMM_ERR_CODE.ERR_PARAM);
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.", COMM_ERR_CODE.EXECUTE_FAILE);
		}
		return resultMap;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	protected void optimizeParameterMap(Map mapParameter) {

	}

	@Override
	protected String getQueryStr() {
		return "";
	}

	enum MustParam {
		work_gb
	}

	enum OptionParam {
		accessToken, urban_id, urban_type, base_year, ksic_5_cd,urban_sido_cd,urban_sgg_cd,adm_cd
	}
}
