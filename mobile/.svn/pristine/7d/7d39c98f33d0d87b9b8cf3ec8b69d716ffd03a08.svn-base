package egovframework.sgis.m2020.main.web;

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
import egovframework.sgis.m2020.main.service.MainService;

@Controller
public class MainController {
	private final String PRODUCES = "application/json; charset=UTF-8;";
		
	@Resource(name = "mainService")
	private MainService mainService;
		
		
	@ExceptionHandler(ValidExceptionToJson.class)
	@ResponseBody
	public String handleMethodArgumentNotValidException(ValidExceptionToJson errors) {
		return errors.getMessage();
	}	
	
	// 메인화면 공지사항 조회
	@RequestMapping(value = "/m2020/main/getMainBoard.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData getMainBoard(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return mainService.getMainBoard(request, response, params);
	}
	
	// 메인화면 통계주제도 조회
	@RequestMapping(value = "/m2020/main/getMainThematicList.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData getMainThematicList(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return mainService.getMainThematicList(request, response, params);
	}
	
	// 메인화면 생활환경종합 조회
	@RequestMapping(value = "/m2020/main/getMainLivingEnvironment.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData getMainLivingEnvironment(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return mainService.getMainLivingEnvironment(request, response, params);
	}
}
