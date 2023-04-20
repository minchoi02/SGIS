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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.api.dt.ststistics.mapper.StstisticsCommonDao;

@Controller
public class StstisticsUSInterestingTopicMngController {

	@Resource
	private StstisticsCommonDao dao;
	
	/**
	 * @comment	관심주제 이용현황 페에지 조회
	 * @param 	request
	 * @return
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSInterestingTopicMng.do", method=RequestMethod.GET)
	public String pageCall(ModelMap map) {
		return "ststistics/ststisticsUSInterestingTopicMng";
	}
	
	/**
	 * @comment	관심주제 이용현황 페에지에 필요한 데이터를 불러온다.
	 * @param 	paramMap
	 * @return  HashMap<String,Object>
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSInterestingTopicMng.do")
	public HashMap<String, Object> getStstisticsUSInterestingTopicMng(@RequestParam HashMap<String, Object> paramMap) {
		
		paramMap.put("lifeCycleList", dao.select("ststisticsInterestingTopic.getStstisticsUSInterestingTopicLifeCycleList", paramMap));
		paramMap.put("statDistanceList", dao.select("ststisticsInterestingTopic.getStstisticsUSInterestingTopicDistanceList", paramMap));
		
		return paramMap;
	}
	
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/interestingTopicExcelDataDownLoad.do")
	public ModelAndView  statusExcelDataDownLoad(@RequestParam HashMap<String, Object> paramMap) throws JsonParseException, JsonMappingException, IOException 	{
		System.out.println(paramMap);
		ModelAndView mav = new ModelAndView("excelView");
	    Map<String, Object> dataMap = new HashMap<String, Object>();
	    String type = (String)paramMap.get("type");
	    String filename = "";
	    String[] columnArr = null;
	    String[] columnVarArr = null;
	    
	    List<HashMap<String, Object>> list = null;
	    
	    if(type.equals("interestingTopic")) {
			list = dao.select("ststisticsInterestingTopic.interestingTopicExcelDataDownLoad", paramMap);
	    	
	    	filename = "관심주제 이용현황 ";
	    	columnArr = new String[]{"순번", "생애주기", "선택 비율(%)", "통계거리", "선택 비율(%)"};
			columnVarArr = new String[]{"rn", "lfeCycleNm", "lfePercentage", "statDistanceNm","dstncPercentage"};
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
