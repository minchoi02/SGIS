package egovframework.sgis.m2019.workroad.web;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.sgis.cmmn.exception.ValidExceptionToJson;
import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.m2019.workroad.service.TodayStatusService;

@Controller
public class TodayStatusJsonController {
	private final String PRODUCES = "application/json; charset=UTF-8;";
	
	@Resource(name = "todayStatusService")
	private TodayStatusService todayStatusService;
	
	
	@ExceptionHandler(ValidExceptionToJson.class)
	@ResponseBody
	public String handleMethodArgumentNotValidException(ValidExceptionToJson errors) {
		return errors.getMessage();
	}	
	
	//오늘의 전체 일자리현황 팝업 조회
	@RequestMapping(value = "/m2019/workroad/todayAllJobStatusPopupSelect.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData todayAllJobStatusPopupSelect(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return todayStatusService.todayAllJobStatusPopupSelect(request, response, params);
	}
	
	// 오늘의 구인현황 조회
	@RequestMapping(value = "/m2019/workroad/getTodayStatus.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData getTodayStatus(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return todayStatusService.selectTodayStatus(request, response, params); 
	}
	
	/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 START */
	// 차트 날짜 선택 구인현황 조회
	@RequestMapping(value = "/m2019/workroad/getChartSelectDayStatus.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData getChartSelectDayStatus(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return todayStatusService.getChartSelectDayStatus(request, response, params); 
	}
	/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 END */
}
