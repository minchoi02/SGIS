package kostat.sop.ServiceAPI.api.totSurv.farm;

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

public class GetTotFarmRank extends AbsQuery<Map>{
	
	private static final Log logger = LogFactory.getLog(GetTotFarmRank.class);
	
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
		return "116401";
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
			List<Map> totalFarmData = new ArrayList<Map>();
			String regionCd = ""; 
			if(mapParameter.get("rank") != null && !mapParameter.get("rank").equals("")) {
				String level = mapParameter.get("level").toString();
				String type = mapParameter.get("type").toString();
				switch(type) {
					case "totalFarm" : //itm_cd = T140 surv_id = PH0001
						//외국인부터 조회
						totalFarmData = session.selectList("totSurvFarm.getTotFarmRank", mapParameter);
						break;
					default :
						break;
				}
				result.put("totalFarmData", totalFarmData);
				
			} else if(!mapParameter.get("regionCd").equals("") && mapParameter.get("regionCd") != null) {
				List<Map> tempData = new ArrayList<Map>();
				mapParameter.put("type", "totalFarm");
				totalFarmData = session.selectList("totSurvFarm.getTotFarmRank", mapParameter);
				
				result.put("totalFarmData", totalFarmData);

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
