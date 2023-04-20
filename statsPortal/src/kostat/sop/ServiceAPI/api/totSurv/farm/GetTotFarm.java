//2020-08-05 [곽제욱] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석)
package kostat.sop.ServiceAPI.api.totSurv.farm;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
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

public class GetTotFarm extends AbsQuery<Map> {
	
	private static final Log logger = LogFactory.getLog(GetTotFarm.class);
	
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
		return "116400";
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
			logger.info("regionCd = " + regionCd);
//			if(regionCd.equals("99")) {
//				List<Map> worldData = session.selectList("totSurvFarm.getPopulationWorld", mapParameter);
//				result.put("worldData", worldData);
//			}
			
			// 농업총조사 농가 인구 조회	getTotFarm
			List<Map> totFarmData = session.selectList("totSurvFarm.getTotFarm", mapParameter);
			// 농업총조사 농가 2010 대비  itmCd T00   :: now_year,befor_year, total, rt
			mapParameter.put("itmCd", "T00"); // 2020.11.09  가구			
			List<Map> totFarmRtData = session.selectList("totSurvFarm.getTotFramRt", mapParameter);
			// 농가(가구)수  증감율 조회  T01  :: now_year,befor_year, total, rt
			mapParameter.put("itmCd", "T01"); // 2020.11.09  명
			List<Map> totFarmHouseRtData = session.selectList("totSurvFarm.getTotFramRt", mapParameter);
			
			// 농업총조사 농가(가구) 조회   getTotHouseFram
			//List<Map> totFarmHouseData = session.selectList("totSurvFarm.getTotHouseFram", mapParameter);
			// 농업총조사 농가 인구 중 고령인 인구 조회  
			List<Map> totFarmOldPeoData = session.selectList("totSurvFarm.getTotFarmOldPeople", mapParameter);
			
			// 차트
			// 경영주 연령별 분류 현황  
			List<Map> ownerAge = session.selectList("totSurvFarm.getOwnerAge", mapParameter);
			// 경영주 교육 정도  getOwnerEducate
			List<Map> ownerEducat = session.selectList("totSurvFarm.getOwnerEducate", mapParameter);
			// 가구원수별 농가  getHouseFarmChart
			List<Map> houseFarm = session.selectList("totSurvFarm.getHouseFarmChart", mapParameter);
			// 인구와 농가인구의 연령대별 분포  getPeopleFarmAge
			List<Map> peopleFarmAge = session.selectList("totSurvFarm.getPeopleFarmAge", mapParameter);
			// 농축산물 판매 금액별  
//			List<Map> farmSale = session.selectList("totSurvFarm.getFarmSale", mapParameter);
//			for (Iterator iterator = farmSale.iterator(); iterator.hasNext();) {
//				Map map = (Map) iterator.next();
//				if(map.get("itm_nm").toString().indexOf(":") > 0) {
//					map.put("itm_nm", map.get("itm_nm").toString().split(":")[1]);
//				}	
//			}
			
			List<Map> getTotFramHouseRt = session.selectList("totSurvFarm.getTotFramHouseRt", mapParameter); //20201117 박은식 농가가구 증감율 계산 데이터 조회 
			// 경영형태별 농가 (ownerKindFarm)  노지
			List<Map> ownerKindFarmLand = session.selectList("totSurvFarm.getKindLandSum", mapParameter); // 2020-11-20 [곽제욱] 조회쿼리 변경
			// 경영형태별 농가 (ownerKindFarm)  시설
			//List<Map> ownerKindFarmFacility = session.selectList("totSurvFarm.getKindFarmFacility", mapParameter); // 2020-11-17 [곽제욱] 농총과 요청에따라 로직 삭제
			
			// 농축산물 판매금액별 농가 (기존)
			List<Map> farmSale = session.selectList("totSurvFarm.getFarmSale", mapParameter);
			for (Iterator iterator = farmSale.iterator(); iterator.hasNext();) {
				Map map = (Map) iterator.next();
				if(map.get("itm_nm").toString().indexOf(":") > 0) {
					map.put("itm_nm", map.get("itm_nm").toString().split(":")[1]);
				}	
			}
			
			// 경영주 규모별 농가
			List<Map> ownerFarmScale = session.selectList("totSurvFarm.getOwnerFarmScale", mapParameter);
			
			// 경영주 연령별 농가  getOwnerAgeCal
			List<Map> ownerAgeCal = session.selectList("totSurvFarm.getOwnerAgeCal", mapParameter);
			
			// 경영주 경력기간별 농가  getOwnerCareer
			List<Map> ownerCareer = session.selectList("totSurvFarm.getOwnerCareer", mapParameter);
			
			
			result.put("getTotFramHouseRt", getTotFramHouseRt);//20201117 박은식 농가가구 증감율 계산 데이터 조회 START
			result.put("totFarmData", totFarmData);
			result.put("totFarmRtData", totFarmRtData);
			result.put("totFarmHouseRtData", totFarmHouseRtData);
			result.put("totFarmOldPeoData", totFarmOldPeoData);
			
			//차트
			result.put("ownerAge", ownerAge);
			result.put("ownerEducat", ownerEducat);
			result.put("houseFarm", houseFarm);
			result.put("peopleFarmAge", peopleFarmAge);
			//result.put("farmSale", farmSale);
			
			// new
			result.put("ownerKindFarmLand", ownerKindFarmLand);			// 노지
			//result.put("ownerKindFarmFacility", ownerKindFarmFacility);	// 시설 //2020-11-17 [곽제욱] 농총과 요청으로 노지+시설 합산으로 삭제
			result.put("farmSale", farmSale);	// 농축산물 판매금액별 농가
			result.put("ownerFarmScale", ownerFarmScale);	// 경영주 규모별 농가
			result.put("ownerAgeCal", ownerAgeCal);			// 경영주 연령별 농가
			result.put("ownerCareer", ownerCareer);			// 경영주 경력기간별 농가
			
			
			
			
			
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
