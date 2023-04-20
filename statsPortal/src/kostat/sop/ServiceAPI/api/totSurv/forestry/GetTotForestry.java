//2020-08-05 [곽제욱] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석)
package kostat.sop.ServiceAPI.api.totSurv.forestry;

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

public class GetTotForestry extends AbsQuery<Map> {
	
	private static final Log logger = LogFactory.getLog(GetTotForestry.class);
	
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
		return "116500";
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
			
			// 인구주택농림어업 총조사 임가 인구 조회	getTotForestry
			List<Map> totForestryData = session.selectList("totSurvForestry.getTotForestry", mapParameter);
			// 인구주택농림어업 총조사 임가 2010 대비  itmCd T00   :: now_year,befor_year, total, rt
			mapParameter.put("itmCd", "T00");			
			List<Map> totForestryRtData = session.selectList("totSurvForestry.getTotForestryRt", mapParameter);
			List<Map> totForestrHouseRtData = session.selectList("totSurvForestry.getTotForestryRt", mapParameter);
			
			// 차트 start
			// 경영주 연령별 분류 현황  getTotForestryMngmtAge
			List<Map> forestryMngmtAge = session.selectList("totSurvForestry.getForestryMngmtAge", mapParameter);
			// 경영주 교육 정도  getforestryMngmtCareerPd
			List<Map> forestryMngmtCareerPd = session.selectList("totSurvForestry.getForestryMngmtCareerPd", mapParameter);
			
			// 임업경영형태   getBusinessChart
			List<Map> businessChart = session.selectList("totSurvForestry.getBusinessChartSum", mapParameter); // 2020-11-23 [곽제욱] 조회쿼리 변경
			// 임산물 판매 금액별  
			List<Map> forestrySale = session.selectList("totSurvForestry.getForestrySale", mapParameter);
			for (Iterator iterator = forestrySale.iterator(); iterator.hasNext();) {
				Map map = (Map) iterator.next();
				if(map.get("itm_nm").toString().indexOf(":") > 0) {
					map.put("itm_nm", map.get("itm_nm").toString().split(":")[1]);
				}	
			}
			
			// 임산물 재배 작물별 임가
			List<Map> fsrcsCtvtCropsForestry_0 = session.selectList("totSurvForestry.getFsrcsCtvtCropsForestry_0",mapParameter);	// 2020-11-17 [곽제욱] 전체 추가
			List<Map> fsrcsCtvtCropsForestry_1 = session.selectList("totSurvForestry.getFsrcsCtvtCropsForestry_1",mapParameter);	// 산나물
			List<Map> fsrcsCtvtCropsForestry_2 = session.selectList("totSurvForestry.getFsrcsCtvtCropsForestry_2",mapParameter);	// 약용작물
			List<Map> fsrcsCtvtCropsForestry_3 = session.selectList("totSurvForestry.getFsrcsCtvtCropsForestry_3",mapParameter);	// 관상작물
			List<Map> fsrcsCtvtCropsForestry_4 = session.selectList("totSurvForestry.getFsrcsCtvtCropsForestry_4",mapParameter);	// 표고버섯
			List<Map> fsrcsCtvtCropsForestry_5 = session.selectList("totSurvForestry.getFsrcsCtvtCropsForestry_5",mapParameter);	// 유실수
			// 차트 end
			
			// 임가(가구)수  증감율 조회  T01  :: now_year,befor_year, total, rt
			mapParameter.put("itmCd", "T01");
			// 인구주택농림어업총조사 임가 인구 중 고령인 인구 조회  
			List<Map> totForestryOldPeoData = session.selectList("totSurvForestry.getTotForestryOldPeople", mapParameter);
			
			result.put("totForestryData", totForestryData);
			result.put("totForestryRtData", totForestryRtData);
			result.put("totForestrHouseRtData", totForestrHouseRtData);
			result.put("totForestryOldPeoData", totForestryOldPeoData);
			
			//차트
			result.put("forestryMngmtAge", forestryMngmtAge);
			result.put("forestryMngmtCareerPd", forestryMngmtCareerPd);
			result.put("businessChart", businessChart);
			result.put("forestrySale", forestrySale);
			result.put("fsrcsCtvtCropsForestry_0", fsrcsCtvtCropsForestry_0); // 2020-11-17 [곽제욱] 전체 추가
			result.put("fsrcsCtvtCropsForestry_1", fsrcsCtvtCropsForestry_1);
			result.put("fsrcsCtvtCropsForestry_2", fsrcsCtvtCropsForestry_2);
			result.put("fsrcsCtvtCropsForestry_3", fsrcsCtvtCropsForestry_3);
			result.put("fsrcsCtvtCropsForestry_4", fsrcsCtvtCropsForestry_4);
			result.put("fsrcsCtvtCropsForestry_5", fsrcsCtvtCropsForestry_5);
			
			
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
