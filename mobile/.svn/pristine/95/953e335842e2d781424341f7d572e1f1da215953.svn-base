package egovframework.sgis.m2019.workroad.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.sgis.cmmn.util.EgovStringUtil;	// 2020.09.16[한광희] 메인화면 조회 속도 향상 수정
import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.cmmn.util.StringUtils;
import egovframework.sgis.m2019.workroad.service.TodayStatusService;
import egovframework.sgis.m2019.workroad.service.mapper.kairos.TodayStatusMapper;


@Service("todayStatusService")
@PropertySource("classpath:globals.properties")
public class TodayStatusServiceImpl extends EgovAbstractServiceImpl implements TodayStatusService {
	private final static Log logger = LogFactory.getLog(StringUtils.class);
	
	@Autowired
	private Environment env;
	
	@Resource(name="todayStatusMapper")
	private TodayStatusMapper todayStatusMapper;
	
	/**
	 * 오늘의 전체 일자리현황 팝업 조회
	 * @date 2019. 6. 28.
	 * @author (주)엘티메트릭 김남민
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData todayAllJobStatusPopupSelect(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			
			/** 2020.09.16[한광희] 메인화면 조회 속도 향상 수정 START */
			String mainType = EgovStringUtil.isNullToString(params.get("mainType"));
			if(mainType != "" && !"".equals(mainType)) {
				result.put("resultList", todayStatusMapper.mainTodayAllJobStatusSelect(params));
			} else {
				result.put("resultList", todayStatusMapper.todayAllJobStatusPopupSelect(params));				
			}
			/** 2020.09.16[한광희] 메인화면 조회 속도 향상 수정 END */
			
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	/**
	 * 오늘의 구인현황 조회
	 * @date 2019. 07. 04.
	 * @author 한광희
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData selectTodayStatus(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			// 오늘의 구인현황 최신일자 조회
			String today = todayStatusMapper.selectTodayStatusLastDate(params);
			params.put("today", today);
			
			// 오늘의 구인현황 기준년도 조회
			String base_year = todayStatusMapper.selectTodayStatusBaseYear(params);
			params.put("base_year", base_year);
			
			// 오늘의 구인현황 기간범위 조회
			Map<String, Object> dateRangeInfo = todayStatusMapper.selectDateRangeInfo(params);
			params.put("from_yyyymmdd", dateRangeInfo.get("from_yyyymmdd"));
			params.put("to_yyyymmdd", dateRangeInfo.get("to_yyyymmdd"));
			
			HashMap<String,Object> result = new HashMap<String,Object>();
			result.put("resultList", todayStatusMapper.selectTodayStatus(params));				// 오늘의 구인현황 조회
			result.put("resultDetailList", todayStatusMapper.selectTodayStatusDetail(params));	// 오늘의 구인현황 상세내역 조회
			result.put("resultDateStatusList", todayStatusMapper.selectDateStatus(params));		// 오늘의 구인현황 기간별 상세내역 조회
			result.put("data_range", dateRangeInfo);											// 기간범위 값
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 START */
	/**
	 * 차트 날짜 선택 구인현황 조회
	 * @date 2020.09.22
	 * @author 한광희
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData getChartSelectDayStatus(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			
			HashMap<String,Object> result = new HashMap<String,Object>();
			result.put("resultDetailList", todayStatusMapper.selectTodayStatusDetail(params));	// 오늘의 구인현황 상세내역 조회
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 END */
}	