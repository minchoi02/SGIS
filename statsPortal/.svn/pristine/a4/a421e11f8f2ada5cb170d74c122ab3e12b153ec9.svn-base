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

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

public class SetStatsMeCatalogSrvUsageHistory extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(SetStatsMeCatalogSrvUsageHistory.class);

	@Override
	public String getApiId() {
		return "115102";
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
		return "statsMeCatalog.insertCtlgSrvUsgHist";
	}

	enum MustParam{
		statDataId
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
		my_emdong_cd,
		cntntsType,
		searchKwrdSeq
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
						
			int cnt1 = session.insert(getQueryStr(), mapParameter);
			result.put("seq", mapParameter.get("seq"));
			
			//지도로 보기일때
			int cnt2 = 0;
			if(cnt1 > 0 && "01".equals((String) mapParameter.get(OptionParam.cntntsType.name()))) {
				mapParameter.put("slctnKwrdSeq", mapParameter.get("seq"));
				cnt2 = session.insert("statsMeCatalog.insertCtlgMapSrvUsgHistDirectly", mapParameter);
			}
			
			logger.info("END Query - TXID[" + getApiId() + "] " + "Cnt1: " + cnt1 + ", Cnt2: " + cnt2);
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
		
		String lifeCycleItem1Id = (String) mapParameter.get(OptionParam.lifeCycleItem1Id.name());
		String lifeCycleItem2Id = (String) mapParameter.get(OptionParam.lifeCycleItem2Id.name());
		String interestRealmItem1Id = (String) mapParameter.get(OptionParam.interestRealmItem1Id.name());
		String interestRealmItem2Id = (String) mapParameter.get(OptionParam.interestRealmItem2Id.name());
		int lfeCycleSlctnCnt = 0;
		int statDstncSlctnCnt = 0;
		if(lifeCycleItem1Id != null && !"".equals(lifeCycleItem1Id)) {
			lfeCycleSlctnCnt = lfeCycleSlctnCnt + 1;
		}
		if(lifeCycleItem2Id != null && !"".equals(lifeCycleItem2Id)) {
			lfeCycleSlctnCnt = lfeCycleSlctnCnt + 1;
		}
		if(interestRealmItem1Id != null && !"".equals(interestRealmItem1Id)) {
			statDstncSlctnCnt = statDstncSlctnCnt + 1;
		}
		if(interestRealmItem2Id != null && !"".equals(interestRealmItem2Id)) {
			statDstncSlctnCnt = statDstncSlctnCnt + 1;
		}		
		mapParameter.put("lfeCycleSlctnCnt", lfeCycleSlctnCnt);
		mapParameter.put("statDstncSlctnCnt", statDstncSlctnCnt);
	}
}
