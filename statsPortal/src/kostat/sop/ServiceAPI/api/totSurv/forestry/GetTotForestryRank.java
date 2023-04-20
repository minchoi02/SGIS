package kostat.sop.ServiceAPI.api.totSurv.forestry;

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

public class GetTotForestryRank extends AbsQuery<Map>{
	
	private static final Log logger = LogFactory.getLog(GetTotForestryRank.class);
	
	enum MustParam
	{
		year
	}

	enum OptionParam
	{
		rank,
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

			List<Map> forestryHouseRank  = new ArrayList<Map>();
			List<Map> forestryHouseRatio  = new ArrayList<Map>();
			List<Map> totOldForestry = new ArrayList<Map>();
			List<Map> forestryRatio = new ArrayList<Map>();
			// 2021-08-05 [이영호] 임가현황 임가 가구수로 변경
			List<Map> forestryHouseHoldRatio = new ArrayList<Map>();
			String regionCd = ""; 
			if(mapParameter.get("regionCd") != null &&!mapParameter.get("regionCd").equals("")) {
				String level = mapParameter.get("level").toString();
				forestryHouseRank = session.selectList("totSurvForestry.getTotForestryRank", mapParameter);
				totOldForestry = session.selectList("totSurvForestry.getTotOldForesty", mapParameter);
				forestryRatio = session.selectList("totSurvForestry.getTotForestryRaito", mapParameter);
				forestryHouseRatio = session.selectList("totSurvForestry.getTotForestryHouseRatio", mapParameter);
				// 2021-08-05 [이영호] 임가현황 임가 가구수 추가
				forestryHouseHoldRatio = session.selectList("totSurvForestry.getForestryHouseHoldRatio", mapParameter);
			} else if(mapParameter.get("rank") != null && !mapParameter.get("rank").equals("")) {
				forestryHouseRank = session.selectList("totSurvForestry.getTotForestryRank", mapParameter);
				
				String region = forestryHouseRank.get(0).get("region_cd").toString();
				mapParameter.put("regionCd", region);
				
				totOldForestry = session.selectList("totSurvForestry.getTotOldForesty", mapParameter);
				forestryRatio = session.selectList("totSurvForestry.getTotForestryRaito", mapParameter);
				forestryHouseRatio = session.selectList("totSurvForestry.getTotForestryHouseRatio", mapParameter);
				// 2021-08-05 [이영호] 임가현황 임가 가구수 추가
				forestryHouseHoldRatio = session.selectList("totSurvForestry.getForestryHouseHoldRatio", mapParameter);
			}
			
			result.put("forestryHouseRank", forestryHouseRank);
			result.put("totOldForestry", totOldForestry);
			result.put("forestryRatio", forestryRatio);
			result.put("forestryHouseRatio", forestryHouseRatio);
			// 2021-08-05 [이영호] 임가현황 임가 가구수 추가
			result.put("forestryHouseHoldRatio", forestryHouseHoldRatio);
			
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
