//2020-10-19 [박은식] 
package kostat.sop.ServiceAPI.api.totSurv.house;

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

public class GetTotHouseRank extends AbsQuery<Map>{
	
	private static final Log logger = LogFactory.getLog(GetTotHouseRank.class);

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
		return "116301";
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
			
			
			List<Map> houseRankData  = new ArrayList<Map>();
			List<Map> houseRatioRankData = new ArrayList<Map>();
			List<Map> emptyRankData = new ArrayList<Map>();
			String regionCd = ""; 
			if(mapParameter.get("rank") != null && !mapParameter.get("rank").equals("")) {
				String level = mapParameter.get("level").toString();
				String type = mapParameter.get("type").toString();
				switch(type) {
					case "house" :

						houseRankData = session.selectList("totSurvHouse.getTotHouseRank", mapParameter);
						regionCd = houseRankData.get(0).get("region_cd").toString();
						
						mapParameter.remove("rank");
						mapParameter.put("regionCd", regionCd);
						mapParameter.put("type", "houseRatio");
						houseRatioRankData = session.selectList("totSurvHouse.getTotHouseRank", mapParameter);
						
						mapParameter.put("type", "empty");
						emptyRankData = session.selectList("totSurvHouse.getTotHouseRank", mapParameter);
						
						break;
					case "empty" : 
						//외국인부터 조회
						emptyRankData = session.selectList("totSurvHouse.getTotHouseRank", mapParameter);
						regionCd = emptyRankData.get(0).get("region_cd").toString();
						
						mapParameter.remove("rank");
						mapParameter.put("regionCd", regionCd);
						mapParameter.put("type", "house");
						houseRankData = session.selectList("totSurvHouse.getTotHouseRank", mapParameter);
						
						mapParameter.put("type", "houseRatio");
						houseRatioRankData = session.selectList("totSurvHouse.getTotHouseRank", mapParameter);
						
						break;
					default :
						break;
				}
				
				result.put("houseRankData", houseRankData);
				result.put("houseRatioRankData", houseRatioRankData);
				result.put("emptyRankData", emptyRankData);
				
			} else if(!mapParameter.get("regionCd").equals("") && mapParameter.get("regionCd") != null) {
				List<Map> tempData = new ArrayList<Map>();
				mapParameter.put("type", "house");
				houseRankData = session.selectList("totSurvHouse.getTotHouseRank", mapParameter);
				regionCd = houseRankData.get(0).get("region_cd").toString();
				
				mapParameter.remove("rank");
				mapParameter.put("regionCd", regionCd);
				mapParameter.put("type", "houseRatio");
				houseRatioRankData = session.selectList("totSurvHouse.getTotHouseRank", mapParameter);
				
				mapParameter.put("type", "empty");
				emptyRankData = session.selectList("totSurvHouse.getTotHouseRank", mapParameter);
				
				result.put("houseRankData", houseRankData);
				result.put("houseRatioRankData", houseRatioRankData);
				result.put("emptyRankData", emptyRankData);

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
