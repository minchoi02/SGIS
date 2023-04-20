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

public class GetTotPopulation extends AbsQuery<Map> {
	
	private static final Log logger = LogFactory.getLog(GetTotPopulation.class);
	
	enum MustParam
	{
		year
	}

	enum OptionParam
	{
		region_cd
	}  

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "116100";
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

			String regionCd = mapParameter.get("region_cd").toString();
			
			String level = "sido";
			if(!regionCd.equals("99") && !regionCd.equals("00") && regionCd.length()==2) {
				level = "sgg";
			} else if(regionCd.length()==5) {
				level = "emdong";
			}
			
			mapParameter.put("level", level);
			
			logger.info("regionCd = " + regionCd);
			if(regionCd.equals("99")||regionCd.equals("00")) {
				List<Map> worldData = session.selectList("totSurvPopulation.getPopulationWorld", mapParameter);
				String worldMaxRank = session.selectOne("totSurvPopulation.getPopulationWorldMaxRank", mapParameter);
				String currentYear = session.selectOne("totSurvPopulation.getPopulationWorldAllData", mapParameter);
				mapParameter.put("beforeGb", "Y");
				String beforeYear = session.selectOne("totSurvPopulation.getPopulationWorldAllData", mapParameter);
				if(worldData.size()>0) {
					worldData.get(0).put("maxRank", worldMaxRank);
					if(currentYear!="") {
						worldData.get(0).put("currentYear", currentYear);
					} 
					if(beforeYear!="") {
						worldData.get(0).put("beforeYear", beforeYear);
					}
				}
				
				result.put("worldData", worldData);
			}
			
			mapParameter.put("regionLength", ""+regionCd.length());
			
			List<Map> totalData = session.selectList("totSurvPopulation.getTotPopulation", mapParameter);
			List<Map> genderData = session.selectList("totSurvPopulation.getTotGenderPopulation", mapParameter); // 2020-10-13 [곽제욱] 남녀성비 조회 추가
			List<Map> localPeople = session.selectList("totSurvPopulation.getTotLocalPopulation", mapParameter);
			List<Map> foreignPeople = session.selectList("totSurvPopulation.getTotForeignPopulation", mapParameter);
			List<Map> foreignRt = session.selectList("totSurvPopulation.getTotForeignRt", mapParameter);
			List<Map> ageData = session.selectList("totSurvPopulation.getAgePopulation", mapParameter);
			List<Map> moveHomeData = session.selectList("totSurvPopulation.getMoveHomeChange", mapParameter);
			List<Map> populationForTimeData = session.selectList("totSurvPopulation.getPopulationForTime", mapParameter);//총조사인구
			if(!regionCd.equals("99") && !regionCd.equals("") && regionCd != null) {
				List<Map> multiculData = session.selectList("totSurvPopulation.getPopulationMulticul", mapParameter);//다문화가구
				result.put("multiculData", multiculData);
			}
			
			result.put("totalData", totalData);
			result.put("genderData", genderData); // 2020-10-13 [곽제욱] 남녀성비 조회 추가 
			result.put("localData", localPeople);
			result.put("foreignData", foreignPeople);
			result.put("foreignRt", foreignRt);
			result.put("ageData", ageData);
			result.put("moveHomeData", moveHomeData);
			result.put("populationForTimeData", populationForTimeData);
			
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
