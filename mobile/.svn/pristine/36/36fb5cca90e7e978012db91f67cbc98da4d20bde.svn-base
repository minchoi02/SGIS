package egovframework.sgis.m2020.statsMe.web;

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
import egovframework.sgis.m2020.statsMe.service.StateMeService;

@Controller
public class StatsMeController {
	private final String PRODUCES = "application/json; charset=UTF-8;";
		
	@Resource(name = "statsMeService")
	private StateMeService statsMeService;
		
		
	@ExceptionHandler(ValidExceptionToJson.class)
	@ResponseBody
	public String handleMethodArgumentNotValidException(ValidExceptionToJson errors) {
		return errors.getMessage();
	}	
		
	//공통코드 조회
	@RequestMapping(value = "/m2020/statsMe/selectCmmCdComcd.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData selectCmmCdComcd(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return statsMeService.selectCmmCdComcd(request, response, params);
	}
	
	// 통계지리 정보 목록 조회
	@RequestMapping(value = "/m2020/statsMe/selectCatalogData.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData selectCatalogData(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return statsMeService.selectCatalogData(request, response, params);
	}
	
	// 카탈로그 1,2차 키워드검색 목록 조회
	@RequestMapping(value = "/m2020/statsMe/selectCtlgKwrdList.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData selectCtlgKwrdList(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return statsMeService.selectCtlgKwrdList(request, response, params);
	}
	
	// 통계지리 정보 목록 조회
	@RequestMapping(value = "/m2020/statsMe/getStatsMeCatalogData.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData getStatsMeCatalogData(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return statsMeService.getStatsMeCatalogData(request, response, params);
	}
	
	// 메인화면 생애주기/관심분야 조회
	@RequestMapping(value = "/m2020/statsMe/getMainStatsMe.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData getMainStatsMe(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return statsMeService.getMainStatsMe(request, response, params);
	}
}
