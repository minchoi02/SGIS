package egovframework.sgis.m2020.thematic.web;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.m2020.thematic.service.thematicServiceNew;

@Controller
public class thematicController {
	private final String PRODUCES = "application/json; charset=UTF-8;";
		
	@Resource(name = "thematicServiceNew")
	private thematicServiceNew thematicServiceNew;
		
	// 통계지리 정보 목록 조회
	@RequestMapping(value = "/m2020/thematic/selectThematicList.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData selectThematicList(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		
		System.out.println(">>>>>>> /m2020/thematic/selectThematicList.json");
		
		return thematicServiceNew.selectThematicList(request, response, params);
	}
	
	// 통계주제도 ID에 해당하는 맵정보 조회
	@RequestMapping(value = "/m2020/thematic/selectThematicMapData.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData selectThematicMapData(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		
		System.out.println(">>>>>>> /m2020/thematic/selectThematicMapData.json");
		
		return thematicServiceNew.selectThematicMapData(request, response, params);
	}
	
	/** 2020.09.15[한광희] 코로나19 추가 START */
	// 코로나19 맵정보 조회
	@RequestMapping(value = "/m2020/thematic/selectCovid19ThematicMapData.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData selectCovid19ThematicMapData(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		
		System.out.println(">>>>>>> /m2020/thematic/selectCovid19ThematicMapData.json");
		
		return thematicServiceNew.selectCovid19ThematicMapData(request, response, params);
	}
	
	// 코로나19 일정보 조회
	@RequestMapping(value = "/m2020/thematic/selectCovid19DayData.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData selectCovid19DayData(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		
		System.out.println(">>>>>>> /m2020/thematic/selectCovid19DayData.json");
		
		return thematicServiceNew.selectCovid19DayData(request, response, params);
	}
	/** 코로나19 예방접종 추가 START */
	// 코로나19 예방접종 맵정보 조회
	@RequestMapping(value = "/m2020/thematic/selectCovid19VaccThematicMapData.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData selectCovid19VaccThematicMapData(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		
		System.out.println(">>>>>>> /m2020/thematic/selectCovid19VaccThematicMapData.json");
		
		return thematicServiceNew.selectCovid19VaccThematicMapData(request, response, params);
	}
	
	// 코로나19 일정보 조회
	@RequestMapping(value = "/m2020/thematic/selectCovid19VaccDayData.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData selectCovid19VaccDayData(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		
		System.out.println(">>>>>>> /m2020/thematic/selectCovid19VaccDayData.json");
		
		return thematicServiceNew.selectCovid19VaccDayData(request, response, params);
	}
	// 코로나19 현황판 조회
	@RequestMapping(value = "/m2020/thematic/selectCovid19Stats.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData selectCovid19Stats(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		
		System.out.println(">>>>>>> /m2020/thematic/selectCovid19Stats.json");
		
		return thematicServiceNew.selectCovid19Stats(request, response, params);
	}
	
	// 코로나19 예방접종 현황판 조회
	@RequestMapping(value = "/m2020/thematic/selectCovid19VaccStats.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData selectCovid19VaccStats(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		
		System.out.println(">>>>>>> /m2020/thematic/selectCovid19VaccStats.json");
		
		return thematicServiceNew.selectCovid19VaccStats(request, response, params);
	}
	
	// 개인카드사용금액 월정보 조회
	@RequestMapping(value = "/m2020/thematic/selectCreditCardMonthData.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData selectCreditCardMonthData(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		
		System.out.println(">>>>>>> /m2020/thematic/selectCreditCardMonthData.json");
		
		return thematicServiceNew.selectCreditCardMonthData(request, response, params);
	}
	
	/** 2020.09.15[한광희] 코로나19 추가 END */
}
