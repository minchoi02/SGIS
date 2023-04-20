package kostat.sop.ServiceAPI.api.workRoad.todayStatus;

import java.util.ArrayList;
import java.util.List;
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

public class GetTodayStatusSidoDataBoard extends AbsQuery<List> {
	
	private static final Log logger = LogFactory.getLog(GetTodayStatusSidoDataBoard.class);
	
	@Resource(name = "workRoadTodayStatusService")
	private WorkRoadTodayStatusService workRoadTodayStatusService;

	enum MustParam
	{
		year
	}

	enum OptionParam
	{
		adm_cd,
		gender,
		low_search,
		area,
		age_from,
		age_to,
		edu_level,
		mrg_state,
		accessToken,
		bnd_year,
		area_type,
		zoom, //mng_s
		bnd_grid, //mng_s 20180220
		today,
		search_type,	// 2019.01.15	ywKim	추가
		sido_cd,
		sgg_cd,
		detail_type,
		
		//2019-01-22 (전체 조회 시) 지도에 마우스 오버시 나오는 툴팁에 구인자수 추가.
		show_data2,
		unit2,
		
		// 2019.05.14[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용):정보를 가지고 있는 날짜를 담은 변수 추가
		data_today
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "API_WORK";
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
	public List executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		httpSession = req.getSession();	
		List<Map<String, Object>> result =  new ArrayList<Map<String, Object>>();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
			
			logger.info(">> Parameters =============================== ");
			logger.info("adm_cd : " + req.getParameter("adm_cd"));
			logger.info("gender : " + req.getParameter("gender"));
			logger.info("low_search : " + req.getParameter("low_search"));
			logger.info("area : " + req.getParameter("area"));
			logger.info("age_from : " + req.getParameter("age_from"));
			logger.info("age_to : " + req.getParameter("age_to"));
			logger.info("edu_level : " + req.getParameter("edu_level"));
			logger.info("mrg_state : " + req.getParameter("mrg_state"));
			logger.info("accessToken : " + req.getParameter("accessToken"));
			logger.info("bnd_year : " + req.getParameter("bnd_year"));
			logger.info("area_type : " + req.getParameter("area_type"));
			logger.info("zoom : " + req.getParameter("zoom"));
			logger.info("bnd_grid : " + req.getParameter("bnd_grid"));
			logger.info("today : " + req.getParameter("today"));
			logger.info("search_type : " + req.getParameter("search_type"));
			logger.info("sido_cd : " + req.getParameter("sido_cd"));
			logger.info("sgg_cd : " + req.getParameter("sgg_cd"));
			logger.info("detail_type : " + req.getParameter("detail_type"));
			logger.info("data_today : " + req.getParameter("data_today"));	// 2019.05.14[한광희] 일자리 정보 누락 처리(값이 Null일 경우 전일 데이터 사용):정보를 가지고 있는 날짜를 담은 변수 추가
			logger.info(">> ========================================== ");
			
			//2019-06-19 [김남민] search_type 1주 1달 인 경우 날짜 변경. START
			String today = StringUtil.isNullToString(mapParameter.get("today"));
			String search_type = StringUtil.isNullToString(mapParameter.get("search_type"));
			// 1주
			if("W".equals(search_type)) {
				// 8자리인경우 (YYYYMMDD 형태)
				if(today.length() == 8) {
					String lvTempToday = today; //to날짜
					String lvTempToday2 = lvTempToday; //from날짜
					String lvTempTodayStart = lvTempToday2.substring(0,4)+"0101";
					
					//오늘부터 1월1일과 요일이 같을 때 까지 하루씩 뺌
					while(!DateUtil.addYMDtoWeek(lvTempToday2,0,0,0).equals(DateUtil.addYMDtoWeek(lvTempTodayStart,0,0,0))) {
						lvTempToday2 = DateUtil.addDay(lvTempToday2, -1);
					}
					
					mapParameter.put("today",lvTempToday); //to날짜
					mapParameter.put("today2", lvTempToday2); //from날짜
				}
				// 6자리인경우 (YYYYWW 형태)
				else if(today.length() == 6) {
					String lvTempToday = today.substring(0,4)+"0101";//to날짜
					String lvTempTodayLast = session.selectOne("wrTodayStatus.getLatestRegDate");
					int lvTempTodayCnt = StringUtil.zeroConvert(today.substring(4));
					
					//주차 만큼 1월 1일에서 7을 더함.
					for(int i = 0; i < lvTempTodayCnt; i++) {
						lvTempToday = DateUtil.addDay(lvTempToday, 7);
					}
					//하루를 뺌.
					lvTempToday = DateUtil.addDay(lvTempToday, -1);
					
					//최대값 제한
					if(lvTempToday.compareTo(lvTempTodayLast) > 0) lvTempToday = lvTempTodayLast;
					
					//주 시작일 계산
					String lvTempToday2 = lvTempToday;//from날짜
					String lvTempTodayStart = lvTempToday2.substring(0,4)+"0101";
					
					//오늘부터 1월1일과 요일이 같을 때 까지 하루씩 뺌
					while(!DateUtil.addYMDtoWeek(lvTempToday2,0,0,0).equals(DateUtil.addYMDtoWeek(lvTempTodayStart,0,0,0))) {
						lvTempToday2 = DateUtil.addDay(lvTempToday2, -1);
					}
					
					mapParameter.put("today",lvTempToday); //to날짜
					mapParameter.put("today2", lvTempToday2); //from날짜
				}
			}
			if("M".equals(search_type)) {
				//해당월 1일
				String lvTempToday2 = today.substring(0,6)+"01";//from날짜
				
				//해당월 말일 (1일에서 1일 빼고 1개월 더함)
				String lvTempToday = DateUtil.addMonth(DateUtil.addDay(lvTempToday2, -1),1);//to날짜
				
				//최대값 제한
				String lvTempTodayLimit = session.selectOne("wrTodayStatus.getLatestRegDate");
				if(lvTempToday.compareTo(lvTempTodayLimit) > 0) lvTempToday = lvTempTodayLimit;
				
				mapParameter.put("today",lvTempToday);//to날짜
				mapParameter.put("today2", lvTempToday2);//from날짜
			}
			//2019-06-19 [김남민] search_type 1주 1달 인 경우 날짜 변경. END
			
			// 일,주,월,분기,반기에 따른 데이터 범위(기간) 구하기 - 2019.01.15	ywKim	추가
			Map<String, Object> dataRangeInfo = session.selectOne("workRoad.getDateRange", mapParameter);
			mapParameter.put("from_yyyymmdd", dataRangeInfo.get("from_yyyymmdd"));
			mapParameter.put("to_yyyymmdd", dataRangeInfo.get("to_yyyymmdd"));
			
			logger.info(">> 데이터 범위 (" + req.getParameter("today") + ") ================");
			logger.info("from_yyyymmdd : " + mapParameter.get("from_yyyymmdd"));
			logger.info("to_yyyymmdd : " + mapParameter.get("to_yyyymmdd"));
			logger.info(">> ========================================== ");

			result = session.selectList("wrTodayStatus.getTodayStatusSidoDataBoard", mapParameter);
			
			//2019-01-22 (전체 조회 시) 지도에 마우스 오버시 나오는 툴팁에 구인자수 추가.
			String show_data2 = StringUtil.isNullToString(mapParameter.get("show_data2"));
			String unit2 = StringUtil.isNullToString(mapParameter.get("unit2"));
			for (Map<String, Object> resultMap : result) {
				resultMap.put("showData2", show_data2);
				resultMap.put("unit2", unit2);
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
