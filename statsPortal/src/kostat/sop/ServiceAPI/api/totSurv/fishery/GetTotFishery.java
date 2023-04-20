package kostat.sop.ServiceAPI.api.totSurv.fishery;

import java.math.BigDecimal;
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

public class GetTotFishery extends AbsQuery<Map> {
	
	private static final Log logger = LogFactory.getLog(GetTotFishery.class);
	
	enum MustParam
	{
		year,
		fisheryType
	}

	enum OptionParam
	{
		region_cd
	}  

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "116600";
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
			String fisheryType =  mapParameter.get("fisheryType").toString();
			String year = mapParameter.get("year").toString();
			
			// 어업총조사 인구 조회
			List<Map> totalData = session.selectList("totSurvFishery.getTotFishery", mapParameter);
			
			if(fisheryType.equals("sea")) {
				// 해수면 판매 금액별 어가
				List<Map> totPriceFish = session.selectList("totSurvFishery.getTotSeaPriceFish", mapParameter);
				// 해수면 경영주 연령 분포 현황
				List<Map> totFisheryAge = session.selectList("totSurvFishery.getTotSeaFisheryAge", mapParameter);
				// 해수면  경영 형태별 어가
				List<Map> totFisheryOperationType = session.selectList("totSurvFishery.getTotSeaFisheryOperationType", mapParameter);
				// 해수면 경영주 어업 경력기간별 어가
				List<Map> totFisheryCareer = session.selectList("totSurvFishery.getTotSeaFisheryCareer", mapParameter);
				if(year.equals("2015") || year.equals("2020")) {
					List<Map> totFisheryTotal = session.selectList("totSurvFishery.getTotFisheryTotal2015", mapParameter); //20201117 박은식 해수면 어로어업 방법별 어가 전체 추가
					// 해수면 어로어업 방법별 어가 근해어업
					List<Map> totInshoreFishery = session.selectList("totSurvFishery.getTotSeaInshoreFishery2015", mapParameter);
					// 해수면 어로어업 방법별 어가 구획어업
					List<Map> totBlockFishery = session.selectList("totSurvFishery.getTotSeaBlockFishery2015", mapParameter);
					// 해수면 어로어업 방법별 어가 연안어업
					List<Map> totCoastalFishery = session.selectList("totSurvFishery.getTotSeaCoastalFishery2015", mapParameter);
					// 해수면 어로어업 방법별 어가 기타어업
					List<Map> totOthersFishery = session.selectList("totSurvFishery.getTotSeaOthersFishery2015", mapParameter);
					result.put("totFisheryTotal", totFisheryTotal); //20201117 박은식 해수면 어로어업 방법별 어가 전체 추가
					result.put("totInshoreFishery", totInshoreFishery);
					result.put("totBlockFishery", totBlockFishery);
					result.put("totCoastalFishery", totCoastalFishery);
					result.put("totOthersFishery", totOthersFishery);
				} else if(year.equals("2010")) {
					List<Map> totFisheryTotal = session.selectList("totSurvFishery.getTotFisheryTotal2010", mapParameter); //20201117 박은식 해수면 어로어업 방법별 어가 전체 추가
					// 해수면 어로어업 방법별 어가 근해어업
					List<Map> totInshoreFishery = session.selectList("totSurvFishery.getTotSeaInshoreFishery2010", mapParameter);
					// 해수면 어로어업 방법별 어가 구획어업
					List<Map> totBlockFishery = session.selectList("totSurvFishery.getTotSeaBlockFishery2010", mapParameter);
					// 해수면 어로어업 방법별 어가 연안어업
					List<Map> totCoastalFishery = session.selectList("totSurvFishery.getTotSeaCoastalFishery2010", mapParameter);
					// 해수면 어로어업 방법별 어가 기타어업
					List<Map> totOthersFishery = session.selectList("totSurvFishery.getTotSeaOthersFishery2010", mapParameter);
					result.put("totFisheryTotal", totFisheryTotal); //20201117 박은식 해수면 어로어업 방법별 어가 전체 추가
					result.put("totInshoreFishery", totInshoreFishery);
					result.put("totBlockFishery", totBlockFishery);
					result.put("totCoastalFishery", totCoastalFishery);
					result.put("totOthersFishery", totOthersFishery);
				}
				
				result.put("totPriceFish", totPriceFish);
				result.put("totFisheryAge", totFisheryAge);
				result.put("totFisheryOperationType", totFisheryOperationType);
				result.put("totFisheryCareer", totFisheryCareer);
			} else if(fisheryType.equals("inland")) {
				List<Map> totGetFishTotal = session.selectList("totSurvFishery.getTotInlandGetFhshTotal", mapParameter);//20201117 박은식 내수면 어획 풍좀별(전체) 어가 추가
				// 내수면 어획 풍좀별(어류) 어가
				List<Map> totGetFish = session.selectList("totSurvFishery.getTotInlandGetFhsh", mapParameter);
				// 내수면 어획 풍좀별(기타류) 어가
				List<Map> totGetOthersFish = session.selectList("totSurvFishery.getTotInlandGetOthersFhsh", mapParameter);
				// 내수면 판매 금액별 어가
				List<Map> totPriceFish = session.selectList("totSurvFishery.getTotInlandPriceFish", mapParameter);
				// 내수면 경영주 연령 분포 현황
				List<Map> totFisheryAge = session.selectList("totSurvFishery.getTotInlandFisheryAge", mapParameter);
				// 내수면 경영주 경영형태별 어가
				List<Map> totFisheryOperationType = session.selectList("totSurvFishery.getTotInlandFisheryOperationType", mapParameter);
				// 내수면 경영주 어업 경력기간별 어가
				List<Map> totFisheryCareer = session.selectList("totSurvFishery.getTotInlandFisheryCareer", mapParameter);
				result.put("totGetFishTotal", totGetFishTotal);//20201117 박은식 내수면 어획 풍좀별(전체) 어가 추가
				result.put("totGetFish", totGetFish);
				result.put("totGetOthersFish", totGetOthersFish);
				result.put("totPriceFish", totPriceFish);
				result.put("totFisheryAge", totFisheryAge);
				result.put("totFisheryOperationType", totFisheryOperationType);
				result.put("totFisheryCareer", totFisheryCareer);
			}

			result.put("totalData", totalData);
			
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
