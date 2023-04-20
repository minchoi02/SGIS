//2020-08-05 [곽제욱] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석)
package kostat.sop.ServiceAPI.api.totSurv.houseHold;

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

public class GetTotHouseHold extends AbsQuery<Map> {
	
	private static final Log logger = LogFactory.getLog(GetTotHouseHold.class);
	
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
		return "116200";
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
			// 총가구수, 가구 증감율 
			List<Map> totalData = session.selectList("totSurvHouseHold.getTotHouseHold", mapParameter);
			
			List<Map> totalRatioData = session.selectList("totSurvHouseHold.getTotHouseHoldRatio", mapParameter);
			// 1인 가구의 수(총계)
			List<Map> onePeopleInfo = session.selectList("totSurvHouseHold.getTotOnePeopleData", mapParameter);
			// 1인 가구의 수
			List<Map> onePeople = session.selectList("totSurvHouseHold.getTotOnePeople", mapParameter);
			// 65세 이상 가구의 수sixtyFiveOver
			List<Map> sixtyFiveOver = session.selectList("totSurvHouseHold.getTotSixtyFiveOver", mapParameter);
			// 가구별 자녀의 수
			List<Map> children = session.selectList("totSurvHouseHold.getTotChildren", mapParameter);
			// 성별, 연력별 가구의 주택
			List<Map> sexAgeHouse = session.selectList("totSurvHouseHold.getSexAgeHouse", mapParameter);
			
			result.put("totalData", totalData);
			result.put("totalRatioData", totalRatioData);
			result.put("onePeopleInfo", onePeopleInfo);
			result.put("onePeople", onePeople);
			result.put("sixtyFiveOver", sixtyFiveOver);
			result.put("children", children);
			result.put("sexAgeHouse", sexAgeHouse);
			
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
