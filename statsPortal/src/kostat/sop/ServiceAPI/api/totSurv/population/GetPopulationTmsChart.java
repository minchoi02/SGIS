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

public class GetPopulationTmsChart extends AbsQuery<Map>{
	
	private static final Log logger = LogFactory.getLog(GetTotPopulationRank.class);
	
	enum MustParam
	{
		region_cd
	}

	enum OptionParam
	{
		startYear,
		endYear,
		leftYear,
		rightYear
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "116004";
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
			
			if(mapParameter.get("leftYear") != null && !mapParameter.get("leftYear").equals("") ) {
				mapParameter.put("year", mapParameter.get("leftYear"));
				List<Map> leftTimeGenderAgePopulation = session.selectList("totSurvMain.getTimeGenderAgePopulation", mapParameter);//시계열 남녀 연도별 인구비교
				
				result.put("leftTimeGenderAgePopulation", leftTimeGenderAgePopulation);
				
			} 
			if(mapParameter.get("rightYear") != null && !mapParameter.get("rightYear").equals("")){
				mapParameter.put("year", mapParameter.get("rightYear"));
				List<Map> rightTimeGenderAgePopulation = session.selectList("totSurvMain.getTimeGenderAgePopulation", mapParameter);//시계열 남녀 연도별 인구비교
				
				result.put("rightTimeGenderAgePopulation", rightTimeGenderAgePopulation);
			} 
			
			if(mapParameter.get("startYear") != null &&!mapParameter.get("startYear").equals("") && mapParameter.get("endYear") != null && !mapParameter.get("startYear").equals("")){
				List<Map> timeTotalPopulation = session.selectList("totSurvMain.getTimeTotalPopulation", mapParameter); //시계열 총인구
				List<Map> timeGenderChangePopulation = session.selectList("totSurvMain.getTimeGenderChangePopulation", mapParameter);//시계열 남녀성비 비율 변화
				List<Map> timeForeignPopulation = session.selectList("totSurvMain.getTimeForeignPopulation", mapParameter);//시계열 외국인 수 변화
				
				result.put("timeTotalPopulation", timeTotalPopulation);
				result.put("timeGenderChangePopulation", timeGenderChangePopulation);
				result.put("timeForeignPopulation", timeForeignPopulation);
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
