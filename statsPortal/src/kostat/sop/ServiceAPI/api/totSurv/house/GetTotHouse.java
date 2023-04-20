package kostat.sop.ServiceAPI.api.totSurv.house;

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

public class GetTotHouse extends AbsQuery<Map> {

	private static final Log logger = LogFactory.getLog(GetTotHouse.class);
	
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
		return "116300";
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

			String regionCd = mapParameter.get("region_cd").toString();
			
			String level = "sido";
			if(!regionCd.equals("99") && !regionCd.equals("00") && regionCd.length()==2) {
				level = "sgg";
			} else if(regionCd.length()==5) {
				level = "emdong";
			}
			
			mapParameter.put("level", level);

			List<Map> totalData = session.selectList("totSurvHouse.getTotHouse", mapParameter);
			List<Map> totalRatioData = session.selectList("totSurvHouse.getTotHouseRatio", mapParameter);
			List<Map> kindHouseData = session.selectList("totSurvHouse.getKindHouse", mapParameter);
			List<Map> emptyHouse = session.selectList("totSurvHouse.getEmptyHouse", mapParameter);
			List<Map> timeEmptyHouse = session.selectList("totSurvHouse.getTimeEmptyHouse", mapParameter);
			List<Map> initRank = session.selectList("totSurvHouse.getTotHouseinitRank", mapParameter);
			List<Map> houseInRoomCount = session.selectList("totSurvHouse.getHouseInRoomCount", mapParameter); //20210226 박은식 차트 데이터 가져오기위해 주석 해제
			
			result.put("houseInRoomCount", houseInRoomCount);//20210226 박은식 차트 데이터 가져오기위해 추가 
			result.put("totalData", totalData);
			result.put("totalRatioData", totalRatioData);
			result.put("kindHouseData", kindHouseData);
			result.put("emptyHouse", emptyHouse);
			result.put("timeEmptyHouse", timeEmptyHouse);
			result.put("initRank", initRank);
			//result.put("houseInRoomCount", houseInRoomCount);
			
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
