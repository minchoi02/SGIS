package kostat.sop.ServiceAPI.api.totSurv.houseHold;

import java.util.ArrayList;
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

public class GetTotHouseHoldRank extends AbsQuery<Map>{
	
	private static final Log logger = LogFactory.getLog(GetTotHouseHoldRank.class);
	
	enum MustParam
	{
		year
	}

	enum OptionParam
	{
		rank,
		type,
		level,
		regionCd,
		up_regionCd
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "116201";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, 
			String arg2) throws AbsException {
		httpSession = req.getSession();	
		HashMap<String, Object> result =  new HashMap<String, Object>();

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
			
			
			List<Map> totalRankData  = new ArrayList<Map>();
			List<Map> totalRatioRankData = new ArrayList<Map>();
			List<Map> oneHouseRankData = new ArrayList<Map>();
			String regionCd = ""; 
			if(mapParameter.get("rank") != null && !mapParameter.get("rank").equals("")) {
				String level = mapParameter.get("level").toString();
				String type = mapParameter.get("type").toString();
				switch(type) {
					case "total" : //itm_cd = T100 surv_id = PH0001
						//총인구 부터 조회
						totalRankData = session.selectList("totSurvHouseHold.getTotHouseHoldRank", mapParameter);
						regionCd = totalRankData.get(0).get("region_cd").toString();
						
						mapParameter.remove("rank");
						mapParameter.put("regionCd", regionCd);
						mapParameter.put("type", "totalRatio");
						totalRatioRankData = session.selectList("totSurvHouseHold.getTotHouseHoldRank", mapParameter);
						
						mapParameter.put("type", "oneHouse");
						oneHouseRankData = session.selectList("totSurvHouseHold.getTotHouseHoldRank", mapParameter);
						
						break;
					case "totalRatio" : //itm_cd = T03 surv_id = PH0002 c1 = 000 
						//성비부터 조회
						totalRatioRankData = session.selectList("totSurvHouseHold.getTotHouseHoldRank", mapParameter);
						regionCd = totalRatioRankData.get(0).get("region_cd").toString();
						
						mapParameter.remove("rank");
						mapParameter.put("regionCd", regionCd);
						mapParameter.put("type", "total");
						totalRankData = session.selectList("totSurvHouseHold.getTotHouseHoldRank", mapParameter);
						
						mapParameter.put("type", "oneHouse");
						oneHouseRankData = session.selectList("totSurvHouseHold.getTotHouseHoldRank", mapParameter);
												
						break;
					case "oneHouse" : //itm_cd = T140 surv_id = PH0001
						//외국인부터 조회
						oneHouseRankData = session.selectList("totSurvHouseHold.getTotHouseHoldRank", mapParameter);
						regionCd = oneHouseRankData.get(0).get("region_cd").toString();
						
						mapParameter.remove("rank");
						mapParameter.put("regionCd", regionCd);
						mapParameter.put("type", "total");
						totalRankData = session.selectList("totSurvHouseHold.getTotHouseHoldRank", mapParameter);
						
						mapParameter.put("type", "totalRatio");
						totalRatioRankData = session.selectList("totSurvHouseHold.getTotHouseHoldRank", mapParameter);
						
						break;
					default :
						break;
				}
				
				result.put("totalRankData", totalRankData);
				result.put("totalRatioRankData", totalRatioRankData);
				result.put("oneHouseRankData", oneHouseRankData);
				
			} else if(!mapParameter.get("regionCd").equals("") && mapParameter.get("regionCd") != null) {
				List<Map> tempData = new ArrayList<Map>();
				mapParameter.put("type", "total");
				totalRankData = session.selectList("totSurvHouseHold.getTotHouseHoldRank", mapParameter);
				regionCd = totalRankData.get(0).get("region_cd").toString();
				
				mapParameter.remove("rank");
				mapParameter.put("regionCd", regionCd);
				mapParameter.put("type", "totalRatio");
				totalRatioRankData = session.selectList("totSurvHouseHold.getTotHouseHoldRank", mapParameter);
				
				mapParameter.put("type", "oneHouse");
				oneHouseRankData = session.selectList("totSurvHouseHold.getTotHouseHoldRank", mapParameter);
				
				result.put("totalRankData", totalRankData);
				result.put("totalRatioRankData", totalRatioRankData);
				result.put("oneHouseRankData", oneHouseRankData);

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
