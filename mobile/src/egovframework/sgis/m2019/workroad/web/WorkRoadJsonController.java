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
import egovframework.sgis.m2019.workroad.service.WorkRoadService;

@Controller
public class WorkRoadJsonController {
	private final String PRODUCES = "application/json; charset=UTF-8;";
	
	@Resource(name = "workRoadService")
	private WorkRoadService workRoadService;
	
	
	@ExceptionHandler(ValidExceptionToJson.class)
	@ResponseBody
	public String handleMethodArgumentNotValidException(ValidExceptionToJson errors) {
		return errors.getMessage();
	}	
	
	//공통코드 조회
	@RequestMapping(value = "/m2019/workroad/selectCmmCdComcd.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData selectCmmCdComcd(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return workRoadService.selectCmmCdComcd(request, response, params);
	}
	
	//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
	//공통코드 조회(한번에 불러오기)
	@RequestMapping(value = "/m2019/workroad/selectCmmCdComcdAll.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData selectCmmCdComcdAll(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return workRoadService.selectCmmCdComcdAll(request, response, params);
	}
	//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
	
	//일자리맞춤형서비스정보 조회
	@RequestMapping(value = "/m2019/workroad/selectSrvDtJobClmserInfo.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData selectSrvDtJobClmserInfo(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return workRoadService.selectSrvDtJobClmserInfo(request, response, params);
	}
	
	//일자리맞춤형서비스정보 수정/등록
	@RequestMapping(value = "/m2019/workroad/mergeSrvDtJobClmserInfo.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData mergeSrvDtJobClmserInfo(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return workRoadService.mergeSrvDtJobClmserInfo(request, response, params);
	}
	
	// 시도코드 조회
	@RequestMapping(value = "/m2019/workroad/getSidoCd.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData getSidoCd(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return workRoadService.selectSidoCd(request, response, params); 
	}
	
	// 시군구코드 조회
	@RequestMapping(value = "/m2019/workroad/getSggCd.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData getSggCd(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return workRoadService.selectSggCd(request, response, params); 
	}
	
	// 일자리 맵 서비스 통계 데이터 조회 - 2018.10.17	ywKim	신규
	@RequestMapping(value = "/m2019/workroad/selectJobStatData.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData selectJobStatData(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return workRoadService.selectJobStatData(request, response, params); 
	}
}
