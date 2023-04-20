package kostat.sop.ServiceAPI.api.dt.ststistics.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kostat.sop.ServiceAPI.api.dt.ststistics.mapper.StstisticsCommonDao;

@Controller
public class StstisticsUSTrendKwrdMngController {
	
	@Resource
	private StstisticsCommonDao dao;
	

	@RequestMapping(value = "/ststistics/ststisticsUSTrendKwrdMng.do")
	public String pageCall(ModelMap map) {
		map.addAttribute("Service", 	dao.select("ststisticsCmmn.getStstisticsUSData",new HashMap<String, Object>()));/*19년수정*/
		return "ststistics/ststisticsUSTrendKwrdMng";
	}
	
	/**
	 * @comment	트렌드키워드 목록을 조회 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSTrendKwrdList.do")
	public HashMap<String, Object> getStstisticsUSTrendKwrdList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("rows", dao.select("ststistics.getStstisticsUSTrendKwrdList",paramMap));
		return paramMap;
	}
	
	/**
	 * @comment 서비스 목록을 조회합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSMainKwrdList.do")
	public HashMap<String, Object> getStstisticsUSMainKwrdList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("rows", dao.select("ststistics.getStstisticsUSMainKwrdList",paramMap));
		return paramMap;
	}
	
	/**
	 * @comment 유사도에 따른 메인 키워드을 조회합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/selectCtlgRelWordList.do")
	public HashMap<String, Object> selectCtlgRelWordList(@RequestParam(value="trendSrchwrdSeqs[]") List<String> trendSrchwrdSeqs, @RequestParam(value="simildeger") String simildeger) 	{
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("trendSrchwrdSeqs",trendSrchwrdSeqs);
		resultMap.put("simildeger",simildeger);
		resultMap.put("rows", dao.select("ststistics.selectCtlgRelWordList",resultMap));
		
		return resultMap;
	}	
	
	/**
	 * @comment 트렌드 키워드와 메인키워드에 대한 서비스를 매핑합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/registerStstisticsUSTrendKwrdMapping.do")
	public HashMap<String, Object> registerStstisticsUSTrendKwrdMapping(
			@RequestParam(value="trendSrchwrdSeqs[]") List<String> trendSrchwrdSeqs, 
            @RequestParam(value="ctlgMainKwrdSerials[]") List<String> ctlgMainKwrdSerials) 	{
		
		HashMap<String, Object> paramMap = new HashMap<String, Object>();

		int loopCnt = trendSrchwrdSeqs.size();
		for(int i=0; i<loopCnt; i++) {
			HashMap<String, Object> tempMap = new HashMap<>();
			tempMap.put("ctlgMainKwrdSerials", ctlgMainKwrdSerials);
			tempMap.put("trendSrchwrdSeq", trendSrchwrdSeqs.get(i));

			int result = dao.register("ststistics.insertKeywordMapping",tempMap);
			paramMap.put("index" , i);
			paramMap.put("code" , result < 1 ? -1 : 0);			
		}

//		HashMap<String, Object> TrendMappingMap = new HashMap<String, Object>();
//		HashMap<String, Object> statDataIds = new HashMap<String, Object>();
//		statDataIds.put("ctlgMainKwrdSerials", ctlgMainKwrdSerials);
//		statDataIds.put("trendSrchwrdSeqs", trendSrchwrdSeqs);
//
//		for(int i=0; i<trendSrchwrdSeqs.size(); i++) {
//			TrendMappingMap.put("statDataIdList", dao.select("ststistics.selectCtlgstatDataIdList",statDataIds));
//			
//			ArrayList<HashMap<String, Object>> templist = (ArrayList)TrendMappingMap.get("statDataIdList");
//			System.out.println(templist);
//			
//			for(int j = 0; j <templist.size(); j++) {
//				HashMap<String, Object> tempMap = new HashMap<>();
//				tempMap.put("statDataId", templist.get(j).get("statDataId"));
//				tempMap.put("trendSrchwrdSeq", trendSrchwrdSeqs.get(i));
//
//				int result = dao.register("ststistics.insertTrendMapping",tempMap);
//				paramMap.put("index" , j);
//				paramMap.put("code" , result < 1 ? -1 : 0);
//			}
//		}

		return paramMap;

	}
	
	

}
 