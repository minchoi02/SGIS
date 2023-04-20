package kostat.sop.ServiceAPI.api.totSurv.fishery;

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

public class GetTotFisheryRank extends AbsQuery<Map> {
	
	private static final Log logger = LogFactory.getLog(GetTotFisheryRank.class);
	
	enum MustParam
	{
		year,
		fisheryType
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
		return "116601";
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
			String fisheryType =  mapParameter.get("fisheryType").toString();
			String year =  mapParameter.get("year").toString();
			List<Map> totFisheryRatio = new ArrayList<Map>();
			List<Map> totOldFishery = new ArrayList<Map>();
			List<Map> totFisheryHouseRnak = new ArrayList<Map>();
			List<Map> totFisheryHouseRatio = new ArrayList<Map>();
			if(fisheryType.equals("sea")) {
				if(mapParameter.get("regionCd") != null &&!mapParameter.get("regionCd").equals("")) {
					// 해수면 어가 인구 증감데이터 조회
					totFisheryRatio = session.selectList("totSurvFishery.getTotSeaFisheryRatio", mapParameter);
					// 해수면 고령인구 데이터 조회
					totOldFishery = session.selectList("totSurvFishery.getTotSeaOldFishery", mapParameter);
					// 해수면 어가 랭크 조회
					totFisheryHouseRnak = session.selectList("totSurvFishery.getTotSeaFisheryHouseRnak", mapParameter);
					// 해수면 어가 가구 증감데이터 조회
					totFisheryHouseRatio = session.selectList("totSurvFishery.getTotSeaFisheryHouseRatio", mapParameter);
				} else {
					// 해수면 어가 랭크 조회
					totFisheryHouseRnak = session.selectList("totSurvFishery.getTotSeaFisheryHouseRnak", mapParameter);
					
					String region = totFisheryHouseRnak.get(0).get("region_cd").toString();
					mapParameter.put("regionCd", region);
					
					// 해수면 어가 인구 증감데이터 조회
					totFisheryRatio = session.selectList("totSurvFishery.getTotSeaFisheryRatio", mapParameter);
					// 해수면 고령인구 데이터 조회
					totOldFishery = session.selectList("totSurvFishery.getTotSeaOldFishery", mapParameter);
					// 해수면 어가 가구 증감데이터 조회
					totFisheryHouseRatio = session.selectList("totSurvFishery.getTotSeaFisheryHouseRatio", mapParameter);
				}
			} else if(fisheryType.equals("inland")) {
				if(mapParameter.get("regionCd") != null &&!mapParameter.get("regionCd").equals("")) {
					// 내수면 어가 인구 증감데이터 조회	
					totFisheryRatio = session.selectList("totSurvFishery.getTotInlandFisheryRatio", mapParameter);
					// 내수면 고령인구 데이터 조회
					totOldFishery = session.selectList("totSurvFishery.getTotInlandOldFishery", mapParameter);
					// 내수면 어가 랭크 조회
					totFisheryHouseRnak = session.selectList("totSurvFishery.getTotInlandFisheryHouseRnak", mapParameter);
					// 내수면 어가 가구 증감데이터 조회	
					totFisheryHouseRatio = session.selectList("totSurvFishery.getTotInlandFisheryHouseRatio", mapParameter);
				} else {
					// 내수면 어가 랭크 조회
					totFisheryHouseRnak = session.selectList("totSurvFishery.getTotInlandFisheryHouseRnak", mapParameter);
					
					String region = totFisheryHouseRnak.get(0).get("region_cd").toString();
					mapParameter.put("regionCd", region);
					
					// 내수면 어가 인구 증감데이터 조회	
					totFisheryRatio = session.selectList("totSurvFishery.getTotInlandFisheryRatio", mapParameter);
					// 내수면 고령인구 데이터 조회
					totOldFishery = session.selectList("totSurvFishery.getTotInlandOldFishery", mapParameter);
					// 내수면 어가 가구 증감데이터 조회	
					totFisheryHouseRatio = session.selectList("totSurvFishery.getTotInlandFisheryHouseRatio", mapParameter);
				}
			}
			
			result.put("totFisheryRatio", totFisheryRatio);
			result.put("totOldFishery", totOldFishery);
			result.put("totFisheryHouseRnak", totFisheryHouseRnak);
			result.put("totFisheryHouseRatio", totFisheryHouseRatio);
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
