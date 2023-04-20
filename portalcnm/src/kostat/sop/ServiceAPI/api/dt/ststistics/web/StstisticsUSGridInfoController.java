package kostat.sop.ServiceAPI.api.dt.ststistics.web;

import java.io.IOException;
import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kostat.sop.ServiceAPI.api.common.StstisticsUtils;
import kostat.sop.ServiceAPI.api.dt.ststistics.mapper.StstisticsCommonDao;

@Controller
public class StstisticsUSGridInfoController {
	@Resource
	private StstisticsCommonDao dao;
	
	/**
	 * @comment	선택형 격자자료 제공서비스 자동화 페이지 호출
	 * @param 	request
	 * @param 	response
	 * @return
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSGridInfo.do")
	public String pageCall(ModelMap map) {
		return "ststistics/ststisticsUSGridInfo";
	}
	
	/**
	 * @comment	목록을 조회 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSGridInfo.do")
	public HashMap<String, Object> getStstisticsUSGridInfo(@RequestParam HashMap<String, Object> paramMap) 	{
		//페이징 연산
		StstisticsUtils.pageOperation(paramMap, dao.selectInt("ststistics.getStstisticsUSGridInfoTotal",paramMap));
		//목록 조회
		paramMap.put("data", dao.select("ststistics.getStstisticsUSGridInfo",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment	코드를 조회 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSGridInfoCode.do")
	public HashMap<String, Object> getStstisticsUSGridInfoCode(@RequestParam HashMap<String, Object> paramMap) 	{
		//코드 조회
		paramMap.put("data", dao.select("ststistics.getStstisticsUSGridInfoCode",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment	업무 등록.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/registerStstisticsUSGridInfo.do" , method=RequestMethod.POST)
	public HashMap<String, Object> registerStstisticsUSGridInfo(@RequestParam HashMap<String, Object> paramMap) throws IllegalStateException, IOException 	{
		
		
		if(dao.selectInt("ststistics.getStstisticsUSGridInfoIsExists", paramMap) == 0) {
			paramMap.put("code", (dao.register("ststistics.registerStstisticsUSGridInfo", paramMap)< 1) ? -1 : 0);
		}else {
			paramMap.put("code", (dao.edit("ststistics.editStstisticsUSGridInfo", paramMap)< 1) ? -1 : 0);
		}
		
		return paramMap;
	}
	
	/**
	 * @comment	 업무를 삭제 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/removeGridInfo.do" , method=RequestMethod.POST)
	public int removeGridInfo(@RequestParam HashMap<String, Object> paramMap) 	{
		dao.remove("ststistics.removeGridInfo",paramMap);

		return 0;
	}
}
