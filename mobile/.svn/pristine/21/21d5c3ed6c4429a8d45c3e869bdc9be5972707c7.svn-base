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
import egovframework.sgis.m2019.workroad.service.MyNeighberhoodJobService;

@Controller
public class MyNeighberhoodJobJsonController {
	private final String PRODUCES = "application/json; charset=UTF-8;";
	
	@Resource(name = "myNeighberhoodJobService")
	private MyNeighberhoodJobService myNeighberhoodJobService;
	
	
	@ExceptionHandler(ValidExceptionToJson.class)
	@ResponseBody
	public String handleMethodArgumentNotValidException(ValidExceptionToJson errors) {
		return errors.getMessage();
	}
	
	//내 주변 일자리 건수
	@RequestMapping(value = "/m2019/workroad/myNeighberhoodJobListCount.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData myNeighberhoodJobListCount(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return myNeighberhoodJobService.myNeighberhoodJobListCount(request, response, params); 
	}
	
	//내 주변 일자리 목록
	@RequestMapping(value = "/m2019/workroad/myNeighberhoodJobList.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData myNeighberhoodJobList(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return myNeighberhoodJobService.myNeighberhoodJobList(request, response, params); 
	}
	
	//내 주변 일자리 조회
	@RequestMapping(value = "/m2019/workroad/myNeighberhoodJobSelect.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData myNeighberhoodJobSelect(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return myNeighberhoodJobService.myNeighberhoodJobSelect(request, response, params); 
	}
	
	//생활환경 정보 조회
	@RequestMapping(value = "/m2019/workroad/livingEnvironmentSelect.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData livingEnvironmentSelect(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return myNeighberhoodJobService.livingEnvironmentSelect(request, response, params); 
	}
	
	/** 2020.09.21[한광희] 생활환경종합 팝업 상세 조회 추가 START */
	//생활환경 정보 상세 조회
	@RequestMapping(value = "/m2019/workroad/livingEnvironmentDetailSelect.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData livingEnvironmentDetailSelect(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return myNeighberhoodJobService.livingEnvironmentDetailSelect(request, response, params); 
	}
	/** 2020.09.21[한광희] 생활환경종합 팝업 상세 조회 추가 END */
}
