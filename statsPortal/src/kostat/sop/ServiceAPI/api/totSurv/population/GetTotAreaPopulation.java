//2020-08-05 [곽제욱] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석)
package kostat.sop.ServiceAPI.api.totSurv.population;

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

public class GetTotAreaPopulation extends AbsQuery<Map> {
	
	private static final Log logger = LogFactory.getLog(GetTotAreaPopulation.class);
	
	enum MustParam
	{
		year
	}

	enum OptionParam
	{
		region_cd,
		surv_id,
		itm_cd,
		isAtdrc,
		c1
	}  

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "116101";
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
			String trId) throws AbsException {
		httpSession = req.getSession();	
		HashMap<String, Object> result =  new HashMap<String, Object>();

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
			
			String regionGb = mapParameter.get("region_cd").toString();
			String atdrcStr = mapParameter.get("isAtdrc").toString();
			
			String level = "sido";
			if(!regionGb.equals("99") && !regionGb.equals("00") && regionGb.length()==2) {
				level = "sgg";
			} else if(regionGb.length()==5) {
				// 비자치구 여부 
				if(atdrcStr.equals("true")) {
					level = "sgg";
				}
				else {
					level = "emdong";
				}
			} 
			
			mapParameter.put("level", level);
			mapParameter.put("regionLength", regionGb.length());
						
			List<Map> areaData = session.selectList("totSurvPopulation.getAreaPopulation", mapParameter);
			List<Map> maxRank = session.selectList("totSurvPopulation.getMaxRank", mapParameter); //20200915 박은식 비자치구 개수 추가 조회
			
			result.put("areaData", areaData);
			result.put("maxRank", maxRank);
			
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
