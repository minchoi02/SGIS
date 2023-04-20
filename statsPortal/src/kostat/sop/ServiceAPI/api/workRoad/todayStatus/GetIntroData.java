package kostat.sop.ServiceAPI.api.workRoad.todayStatus;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
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

//2019.06.17[한광희] 오늘의 구인현황 기간조회 기능 활성화에 따른 주석 처리
import kostat.sop.ServiceAPI.common.util.DateUtil;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.WorkRoadTodayStatusService;
import kostat.sop.ServiceAPI.exception.ApiException;

public class GetIntroData extends AbsQuery<Map>{

	private static final Log logger = LogFactory.getLog(GetIntroData.class);

	@Resource(name = "workRoadTodayStatusService")
	private WorkRoadTodayStatusService workRoadTodayStatusService;

	enum MustParam {
	}
	
	enum OptionParam {
		today,
		search_type,
		sido_cd,
		sgg_cd
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "111200";
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
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String arg2) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();
		HashMap<String,Object> result =  new HashMap<String,Object>();
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
	
			String today = "";
			
			// today 파라미터가 없는 경우 최신데이터등록일로 설정 - 2018.11.07	ywKim	추가
			if (mapParameter.get("today") == null) {
				today = session.selectOne("wrTodayStatus.getLatestRegDate");
				mapParameter.put("today", today);
			} else {
				today = (String) mapParameter.get("today");
			}
			
			Map mapParams = new HashMap();
			if (mapParameter.get(OptionParam.search_type.name()) != null) {
				String searchType = (String) mapParameter.get(OptionParam.search_type.name());
				mapParams.put("search_type", searchType);
				
				DateFormat df = new SimpleDateFormat("yyyyMMdd");
				Calendar cal = Calendar.getInstance();

				if (searchType.equals("W")) {// 이전주의 마지막 날짜 선택 (일요일)
					/* 2019.06.17[한광희] 오늘의 구인현황 기간조회 기능 활성화에 따른 주석 처리
					 * Date date = df.parse(today);
			        cal.setTime(date);
			        int dayNum = cal.get(Calendar.DAY_OF_WEEK);
			        dayNum = (dayNum - 1) * -1;
			        cal.add(Calendar.DATE, dayNum);*/
			        Date date = df.parse(today);
					cal.setTime(date);
					
					String lvTempToday = today;
					String lvTempToday2 = lvTempToday.substring(0,4)+"0101";
					lvTempToday = DateUtil.addDay(lvTempToday, -(7*9));
					while(!DateUtil.addYMDtoWeek(lvTempToday,0,0,0).equals(DateUtil.addYMDtoWeek(lvTempToday2,0,0,0))) {
						lvTempToday = DateUtil.addDay(lvTempToday, -1);
					}
					mapParams.put("today2", lvTempToday);
				}
				/* 2019.06.17[한광희] 오늘의 구인현황 기간조회 기능 활성화에 따른 주석 처리
				 * else if (searchType.equals("M")) {// 이전월의 마지막 날짜 선택
					Date date = df.parse(today.substring(0, 6) + "01");
			        cal.setTime(date);
			        cal.add(Calendar.DATE, -1);
				}*/ else {
					Date date = df.parse(today);
					cal.setTime(date);
				}

		        today = df.format(cal.getTime());
				mapParams.put("today", today);
			} else {
				mapParams.put("search_type", "D");
				mapParams.put("today", today);
			}
			
			mapParams.put("term", 9);
			Map<String, Object> dataRangeInfo = session.selectOne("workRoad.getDateRangeInfo", mapParams);
			result.put("data_range", dataRangeInfo);
			
			mapParameter.put("from_yyyymmdd", dataRangeInfo.get("from_yyyymmdd"));
			mapParameter.put("to_yyyymmdd", dataRangeInfo.get("to_yyyymmdd"));
			List<Map> dataList = workRoadTodayStatusService.getIntroData(mapParameter);
			
			// 자료가 없는 날은 전날과 동일한 수치로 설정
			// 2018.11.26	ywKim	추가
			for (int i = 4; i < dataList.size(); i++) {
				Integer corp_irdsrate = (Integer) dataList.get(i).get("corp_irdsrate");
				
				if (corp_irdsrate <= 0) {
					Integer prev_corp_irdsrate = (Integer) dataList.get(i - 4).get("corp_irdsrate");
					dataList.get(i).put("corp_irdsrate", prev_corp_irdsrate);
				}
			}
			
			result.put("introData", dataList);
			result.put("today", today);
			
			String search_type = (String) mapParameter.get(OptionParam.search_type.name());
			result.put("search_type", search_type);
			logger.info("search_type[" + search_type + "] ");
			if(!search_type.equals("none")){
				if(search_type.equals("btn1")){
					result.put("btnValue", "2");
				}else if(search_type.equals("btn2")){
					result.put("btnValue", "7");
				}else if(search_type.equals("btn3")){
					result.put("btnValue", "30");
				}else if(search_type.equals("btn4")){
					result.put("btnValue", "90");
				}else if(search_type.equals("btn5")){
					result.put("btnValue", "180");
				}
			} else {
				result.put("btnValue", "1");
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
