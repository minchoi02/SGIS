package kostat.sop.ServiceAPI.api.dt.ststistics.web;

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
public class StstisticsUSAccumulateKeyWordMngController {
	
	@Resource
	private StstisticsCommonDao dao;
	
	private String baseYear = "2018";

	/**
	 * @comment	누적 키워드 목록을 조회 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSAccumulateKeyWordMng.do")
	public String ststisticsUSKeyWordMng(ModelMap map) {
		HashMap<String, Object> paramMap = new HashMap<>();
		paramMap.put("base_year", baseYear);
		map.put("sido", dao.select("ststisticsCmmn.getSido",paramMap));
		return "ststistics/ststisticsUSAccumulateKeyWordMng";
	}
	
	/**
	 * @comment	누적 키워드 목록을 조회 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSAccumulateKeyWordMng.do" , method=RequestMethod.POST)
	public HashMap<String, Object> getStstisticsUSInterestsMng(@RequestParam HashMap<String, Object> paramMap) 	{
		//페이징 연산
		StstisticsUtils.pageOperation(paramMap, dao.selectInt("ststisticsAccumulate.getStstisticsUSAccumulateKeyWordMngTotal",paramMap));
		//목록 조회
		paramMap.put("data", dao.select("ststisticsAccumulate.getStstisticsUSAccumulateKeyWordMng",paramMap));
		
		return paramMap;
		
	}
	
	/**
	 * @comment	시군구 목록을 조회 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getSgg.do" , method=RequestMethod.POST)
	public HashMap<String, Object> getSgg(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("base_year", baseYear);
		paramMap.put("data", dao.select("ststisticsCmmn.getSgg",paramMap));
		return paramMap;
	}
	
	/**
	 * @comment	읍면동 목록을 조회 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getEmdong.do" , method=RequestMethod.POST)
	public HashMap<String, Object> getEmdong(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("base_year", baseYear);
		paramMap.put("data", dao.select("ststisticsCmmn.getEmdong",paramMap));
		return paramMap;
	}
	
}
