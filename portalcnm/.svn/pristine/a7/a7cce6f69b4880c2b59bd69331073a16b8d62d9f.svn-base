package kostat.sop.ServiceAPI.api.dt.ststistics.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.api.common.StstisticsPaging;
import kostat.sop.ServiceAPI.api.common.StstisticsUtils;
import kostat.sop.ServiceAPI.api.dt.ststistics.mapper.StstisticsCommonDao;

@Controller
public class StstisticsUSInterestSelectPatternMngController {

	@Resource
	private StstisticsCommonDao dao;
	
	/**
	 * @comment	관심주제 선택패턴 현황 페이지 조회
	 * @param 	request
	 * @param 	response
	 * @return
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSInterestSelectPatternMng.do")
	public String pageCall(ModelMap map) {
		//map.addAttribute("keyWord", 	dao.select("ststisticsCmmn.getStstisticsUSKeyWord",new HashMap<String, Object>()));/*19년수정*/
		return "ststistics/ststisticsUSInterestSelectPatternMng";
	}
	
	
	/**
	 * @comment	관심주제 선택패턴 통계 데이터 조회
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSSelectPatternGeneral.do")
	public HashMap<String, Object> getStstisticsUSSelectPatternGeneral(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("general", dao.select("ststisticsUSInterestSelectPattern.getStstisticsUSSelectPatternGeneral", paramMap));
		return paramMap;
	}
	
	/**
	 * @comment	생애주기 & 통계거리 통계 데이터 조회
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSSelectPatternDetailLifeAndDstnc.do")
	public HashMap<String, Object> getStstisticsUSSelectPatternDetailLifeAndDstnc(@RequestParam HashMap<String, Object> paramMap) 	{
//		int total = dao.selectInt("ststisticsUSInterestSelectPattern.getDetailLifeAndDstncTotal", paramMap);
//		paramMap.put("total", total);
//		PageInfo pageInfo = new PageInfo(paramMap.get("pageNo"), total);
//		paramMap.put("pageInfo", new PageInfo(1, 10));
		
		StstisticsUtils.pageOperation(paramMap, dao.selectInt("ststisticsUSInterestSelectPattern.getDetailLifeAndDstncTotal",paramMap));
		paramMap.put("lifeAndDstnc", dao.select("ststisticsUSInterestSelectPattern.getStstisticsUSSelectPatternDetailLifeAndDstnc", paramMap));
		return paramMap;
	}
	
	
	/**
	 * @comment	생애주기 & 생애주기 통계 데이터 조회
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSSelectPatternDetailLife.do")
	public HashMap<String, Object> getStstisticsUSSelectPatternDetailLife(@RequestParam HashMap<String, Object> paramMap) 	{
		
		StstisticsUtils.pageOperation(paramMap,dao.selectInt("ststisticsUSInterestSelectPattern.getDetailLifeTotal",paramMap));
		paramMap.put("life", dao.select("ststisticsUSInterestSelectPattern.getStstisticsUSSelectPatternDetailLife", paramMap));
		return paramMap;
	}
	
	/**
	 * @comment	통계거리 & 통계거리 통계 조회
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSSelectPatternDetailDstnc.do")
	public HashMap<String, Object> getStstisticsUSSelectPatternDetailDstnc(@RequestParam HashMap<String, Object> paramMap) 	{
		
		StstisticsUtils.pageOperation(paramMap,dao.selectInt("ststisticsUSInterestSelectPattern.getDetailDstncTotal",paramMap));
		paramMap.put("dstnc", dao.select("ststisticsUSInterestSelectPattern.getStstisticsUSSelectPatternDetailDstnc", paramMap));
		return paramMap;
	}
	
	
	
	
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/selectPatternExcelDataDownLoad.do")
	public ModelAndView  statusExcelDataDownLoad(@RequestParam HashMap<String, Object> paramMap) throws JsonParseException, JsonMappingException, IOException 	{
		System.out.println(paramMap);
		ModelAndView mav = new ModelAndView("excelView");
	    Map<String, Object> dataMap = new HashMap<String, Object>();
	    String type = (String)paramMap.get("type");
	    String filename = "";
	    String[] columnArr = null;
	    String[] columnVarArr = null;
	    System.out.println(paramMap);
	    List<HashMap<String, Object>> list = null;
	    StstisticsPaging paging = new StstisticsPaging();
    	paging.setStartRows(0);
    	paging.setEndRows(99999999);
    	paramMap.put("paging", paging);
	    
	    
	    if(type.equals("general")) {
			list = dao.select("ststisticsUSInterestSelectPattern.getStstisticsUSSelectPatternGeneral", paramMap);
	    	
			filename = "관심주제 선택패턴 - "+paramMap.get("startDate")+" - "+paramMap.get("endDate");
	    	columnArr = new String[]{"순번", "생애주기 선택수", "관심거리 선택수", "패턴 총회수", "패턴 비율(%)"};
			columnVarArr = new String[]{"rowNum", "lfeCycleSlctnCnt", "statDstncSlctnCnt", "count","percentage"};
	   
	    } else if(type.equals("LifeCycleAndInterest")) {
	    	
	    	list = dao.select("ststisticsUSInterestSelectPattern.getStstisticsUSSelectPatternDetailLifeAndDstnc", paramMap);
	    	
	    	filename = "관심주제 선택패턴 상세(생애주기+통계거리) - "+paramMap.get("startDate")+" - "+paramMap.get("endDate");
	    	columnArr = new String[]{"생애주기1", "생애주기2", "통계거리1", "통계거리2", "패턴 조회수"};
			columnVarArr = new String[]{"lfeCycle1Name", "lfeCycle2Name", "statDstnc1Name", "statDstnc2Name","count"};
	    	
	    } else if(type.equals("LifeCycleAndLifeCycle")) {
	    	list = dao.select("ststisticsUSInterestSelectPattern.getStstisticsUSSelectPatternDetailLife", paramMap);
	    	
	    	filename = "관심주제 선택패턴 상세(생애주기+생애주기) - "+paramMap.get("startDate")+" - "+paramMap.get("endDate");
	    	columnArr = new String[]{"번호", "생애주기1", "생애주기2", "패턴 조회수", "패턴 선택비율(%)"};
			columnVarArr = new String[]{"rowNum", "lfeCycle1Name", "lfeCycle2Name", "count","percentage"};
	    	
	    } else if(type.equals("InterestAndInterest")) {
	    	list = dao.select("ststisticsUSInterestSelectPattern.getStstisticsUSSelectPatternDetailDstnc", paramMap);
	    	
	    	filename = "관심주제 선택패턴 상세(통계거리+통계거리) - "+paramMap.get("startDate")+" - "+paramMap.get("endDate");
	    	columnArr = new String[]{"번호", "통계거리1", "통계거리2", "패턴 조회수", "패턴 선택비율(%)"};
			columnVarArr = new String[]{"rowNum", "statDstnc1Name", "statDstnc2Name", "count","percentage"};
	    	
	    }
	    
	    dataMap.put("columnArr", columnArr);
	    dataMap.put("columnVarArr", columnVarArr);
	    dataMap.put("sheetNm", "게시물 목록");    
	    dataMap.put("list", list);
	    mav.addObject("dataMap", dataMap);
	    mav.addObject("filename", filename);
	    return mav;
	}
	
}
