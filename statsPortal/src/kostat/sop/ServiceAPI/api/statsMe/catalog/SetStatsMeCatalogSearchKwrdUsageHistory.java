package kostat.sop.ServiceAPI.api.statsMe.catalog;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.statsMe.catalog.SetStatsMeCatalogAccCntDataAdd.MustParam;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

public class SetStatsMeCatalogSearchKwrdUsageHistory extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(SetStatsMeCatalogSearchKwrdUsageHistory.class);

	@Override
	public String getApiId() {
		return "115101";
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
		return "statsMeCatalog.insertCtlgSearchKwrdUsgHist";
	}

	enum MustParam{
		searchKwrd
	}

	enum OptionParam{
		lifeCycleItem1Id,
		lifeCycleItem2Id,
		interestRealmItem1Id,
		interestRealmItem2Id,
		recomendKwrd,
		my_location_yn,
		my_sido_cd,
		my_sgg_cd,
		my_emdong_cd		
	}
	
	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		httpSession = req.getSession();
		//리턴 변수 선언
		HashMap<String,Object> result = new HashMap<String,Object>();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map<String,Object> mapParameter = getParameterMap(req);
			optimizeParameterMap(mapParameter);
						
			int cnt = session.insert(getQueryStr(), mapParameter);
			result.put("seq", mapParameter.get("seq"));
			
			logger.info("END Query - TXID[" + getApiId() + "] " + "Cnt: " + cnt);
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
	
	protected void optimizeParameterMap(Map mapParameter) throws Exception
	{
		String my_location_yn = (String) mapParameter.get(OptionParam.my_location_yn.name());
		if(!(my_location_yn != null && "Y".equals(my_location_yn))) {
			mapParameter.put(OptionParam.my_sido_cd.name(), null);
			mapParameter.put(OptionParam.my_sgg_cd.name(), null);
			mapParameter.put(OptionParam.my_emdong_cd.name(), null);
		}
	}
}
