package kostat.sop.ServiceAPI.api.dt.ststistics.web;

import java.util.HashMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kostat.sop.ServiceAPI.api.common.StstisticsUtils;
import kostat.sop.ServiceAPI.api.dt.ststistics.mapper.StstisticsCommonDao;

@Controller
public class StstisticsUSSubKeyWordMngController {

	@Resource
	private StstisticsCommonDao dao;
	
	/**
	 * @comment	통계거리 페이지 호출
	 * @param 	request
	 * @param 	response
	 * @return
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSSubKeyWordMng.do")
	public String pageCall(ModelMap map) {
		map.addAttribute("keyWord", 	dao.select("ststisticsCmmn.getStstisticsUSKeyWord",new HashMap<String, Object>()));/*19년수정*/
		return "ststistics/ststisticsUSSubKeyWordMng";
	}
	
	/**
	 * @comment	통계거리 목록을 조회 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSSubKeyWordMng.do")
	public HashMap<String, Object> getStstisticsUSSubKeyWordMng(@RequestParam HashMap<String, Object> paramMap) 	{
		StstisticsUtils.pageOperation(paramMap, dao.selectInt("ststistics.getStstisticsUSSubKeyWordTotal",paramMap));
		paramMap.put("data", dao.select("ststistics.getStstisticsUSSubKeyWordMng",paramMap));
		return paramMap;
	}
	
	/**
	 * @comment	통계거리 목록을 등록 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/registerStstisticsUSSubKeyWordMng.do")
	public HashMap<String, Object> registerStstisticsUSSubKeyWordMng(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap = StstisticsUtils.addSessionMap(paramMap);
		if(dao.selectInt("ststistics.getStstisticsUSSubKeyWordIsExists", paramMap) == 0) {
			paramMap.put("code",(dao.register("ststistics.registerStstisticsUSSubKeyWordMng", paramMap) < 1) ? -1 : 0);
		}else {
			paramMap.put("code",(dao.edit("ststistics.editStstisticsUSSubKeyWordMng", paramMap) < 1) ? -1 : 0);
		}
		return paramMap;
	}
	
	/**
	 * @comment ID 중복을 체크합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/idcheckStstisticsUSSubKeyWordMng.do")
	public HashMap<String, Object> idcheckStstisticsUSSubKeyWordMng(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("code",(dao.selectInt("ststistics.idcheckStstisticsUSSubKeyWordMng", paramMap) < 1) ? 0 : -1);
		return paramMap;
	}
}
