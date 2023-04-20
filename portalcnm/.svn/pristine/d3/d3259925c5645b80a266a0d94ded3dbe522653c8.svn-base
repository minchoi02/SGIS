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
public class StstisticsUSProvideDataMngController {
	@Resource
	private StstisticsCommonDao dao;
	
	/**
	 * @comment	자료제공서비스 자동화 페이지 호출
	 * @param 	request
	 * @param 	response
	 * @return
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSProvideDataMng.do")
	public String pageCall(ModelMap map) {
		return "ststistics/ststisticsUSProvideDataMng";
	}
	
	
	/**
	 * @comment	목록을 조회 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSProvideDataMng.do")
	public HashMap<String, Object> getStstisticsUSProvideDataMng(@RequestParam HashMap<String, Object> paramMap) 	{
		//페이징 연산
		StstisticsUtils.pageOperation(paramMap, dao.selectInt("ststistics.getStstisticsUSProvideDataMngTotal",paramMap));
		//목록 조회
		paramMap.put("data", dao.select("ststistics.getStstisticsUSProvideDataMng",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment	업무 목록 중복 조회
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/duplicateStstisticsUSProvideDataMng.do")
	public int duplicateStstisticsUSProvideDataMng(@RequestParam HashMap<String, Object> paramMap) 	{
		//중복 조회
		int result = dao.selectInt("ststistics.duplicateUSProvideDataMng",paramMap);
		return result;
	}
	
	/**
	 * @comment	업무 등록.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/registerStstisticsUSProvideDataMng.do" , method=RequestMethod.POST)
	public HashMap<String, Object> registerStstisticsUSProvideDataMng(@RequestParam HashMap<String, Object> paramMap) throws IllegalStateException, IOException 	{
		
		
		if(dao.selectInt("ststistics.getStstisticsUSProvideDataIsExists", paramMap) == 0) {
			paramMap.put("code", (dao.register("ststistics.registerStstisticsUSProvideDataMng", paramMap)< 1) ? -1 : 0);
		}else {
			paramMap.put("code", (dao.edit("ststistics.editStstisticsUSProvideDataMng", paramMap)< 1) ? -1 : 0);
		}
		
		return paramMap;
	}
	
	/**
	 * @comment	작업 정지.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/updateStopDt.do" , method=RequestMethod.POST)
	public int updateStopDt(@RequestParam HashMap<String, Object> paramMap) {
		int result = 0;
		dao.edit("ststistics.updateStopDt", paramMap);
		
		return result;
	}
	
	/**
	 * @comment	즉시 실행.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/updateExcuteNow.do" , method=RequestMethod.POST)
	public int updateExcuteNow(@RequestParam HashMap<String, Object> paramMap)	{
		int result = 0;
		dao.register("ststistics.updateExcuteNow", paramMap);
		
		return result;
	}
	
	/**
	 * @comment	 업무를 삭제 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/removeProvideData.do" , method=RequestMethod.POST)
	public int removeProvideData(@RequestParam HashMap<String, Object> paramMap) 	{
		int result = 0;
		dao.remove("ststistics.removeProvideData",paramMap);

		return result;
	}
	
}