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
import egovframework.sgis.m2019.workroad.service.StatsAnlsService;

@Controller
public class StatsAnlsJsonController {
	private final String PRODUCES = "application/json; charset=UTF-8;";
	
	@Resource(name = "statsAnlsService")
	private StatsAnlsService statsAnlsService;
	
	
	@ExceptionHandler(ValidExceptionToJson.class)
	@ResponseBody
	public String handleMethodArgumentNotValidException(ValidExceptionToJson errors) {
		return errors.getMessage();
	}	
	
	// 업종선택
	@RequestMapping(value = "/m2019/workroad/getStatsAnalsTypeOfIndustry.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData getStatsAnalsTypeOfIndustry(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return statsAnlsService.selectStatsAnalsTypeOfIndustry(request, response, params); 
	}
	
	// 업종선택
	@RequestMapping(value = "/m2019/workroad/getStatsAnalsTypeOfIndustryMiddleClassification.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData getStatsAnalsTypeOfIndustryMiddleClassification(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return statsAnlsService.selectStatsAnalsTypeOfIndustryMiddleClassification(request, response, params); 
	}
	
	// 사업체수&종사자수 조회
	@RequestMapping(value = "/m2019/workroad/getStatsAnalsMapDataCount.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData getStatsAnalsMapDataCount(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return statsAnlsService.selectStatsAnalsMapDataCount(request, response, params); 
	}
	
	// 일자리 추이 조회
	@RequestMapping(value = "/m2019/workroad/getStatsAnalsJobTransition.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData getStatsAnalsJobTransition(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return statsAnlsService.selectStatsAnalsJobTransition(request, response, params); 
	}
	
	// 일자리 만족도 조회
	@RequestMapping(value = "/m2019/workroad/getStatsAnalsJobSatisfactionDegree.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData getStatsAnalsJobSatisfactionDegree(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return statsAnlsService.selectStatsAnalsJobSatisfactionDegree(request, response, params); 
	}
}
