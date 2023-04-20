package kostat.sop.ServiceAPI.api.workRoad.todayStatus;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.DateUtil;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.WorkRoadTodayStatusService;
import kostat.sop.ServiceAPI.exception.ApiException;

public class GetTodayStatusDetail extends AbsQuery<Map> {
	
	private static final Log logger = LogFactory.getLog(GetTodayStatusDetail.class);
	
	@Resource(name = "workRoadTodayStatusService")
	private WorkRoadTodayStatusService workRoadTodayStatusService;

	enum MustParam {
	}
	
	enum OptionParam {
		today,
		search_type,
		sido_cd,
		sgg_cd,
		series,
		seriesIndex
		
		// 2019.07.03[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용):정보를 가지고 있는 날짜를 담은 변수 추가
		, data_today
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "111101";
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

		HashMap<String,Object> result =  new HashMap<String,Object>();
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);

			// today 파라미터가 없는 경우 최신데이터등록일로 설정 - 2018.11.07	ywKim	추가
			if (mapParameter.get("today") == null) {
				String dt = session.selectOne("wrTodayStatus.getLatestRegDate");
				mapParameter.put("today", dt);
			}
			
			//2019-06-19 [김남민] search_type 1주 1달 인 경우 날짜 변경. START
			String today = StringUtil.isNullToString(mapParameter.get("today"));
			String search_type = StringUtil.isNullToString(mapParameter.get("search_type"));
			// 1주
			if("W".equals(search_type)) {
				String todayYYYYWW = today;
				//YYYYWW 인경우 YYYYMMDD 로 변경해줘야함
				if(today.length() == 6) {
					String lvTempToday = today.substring(0,4)+"0101";
					int lvTempTodayCnt = StringUtil.zeroConvert(today.substring(4));
					for(int i = 0; i < lvTempTodayCnt; i++) {
						lvTempToday = DateUtil.addDay(lvTempToday, 7);
					}
					lvTempToday = DateUtil.addDay(lvTempToday, -1);
					today = lvTempToday;
					mapParameter.put("today", today);
				}
				//YYYYMMDD 인경우 YYYYWW계산
				else if(today.length() == 8) {
					String lvTempToday = today.substring(0,4)+"0101";
					int lvTempTodayCnt = 0;
					while(lvTempToday.compareTo(today) <= 0) {
						lvTempToday = DateUtil.addDay(lvTempToday, 7);
						lvTempTodayCnt++;
					}
					if(lvTempTodayCnt < 10) {
						todayYYYYWW = today.substring(0,4)+"0"+lvTempTodayCnt;
					} else {
						todayYYYYWW = today.substring(0,4)+lvTempTodayCnt;
					}
				}
				result.put("todayYYYYWW", todayYYYYWW);
			}
			else if ("M".equals(search_type)) {
				//YYYYMM 인경우 YYYYMMDD 로 변경해줘야함
				if(today.length() == 6) {
					today += "01";
					mapParameter.put("today", today);
				}
			}
			//2019-06-19 [김남민] search_type 1주 1달 인 경우 날짜 변경. END

			result.put("todayStatusList", workRoadTodayStatusService.getTodayStatusDetail(mapParameter));
			result.put("today", mapParameter.get("today"));
			
			// 데이터 작성일 조회 - 2018.11.05	ywKim	추가
			String dt = session.selectOne("wrTodayStatus.getLatestRegDate");
			if (dt.length() == 8) {
				dt = dt.substring(0, 4) + "." + dt.substring(4, 6) + "." + dt.substring(6, 8);
			}
			result.put("latestDate", dt);
			
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
