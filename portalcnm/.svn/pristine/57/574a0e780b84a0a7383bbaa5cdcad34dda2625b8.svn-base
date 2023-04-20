package kostat.sop.ServiceAPI.api.dt.ststistics.web;

import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kostat.sop.ServiceAPI.api.dt.ststistics.mapper.StstisticsCommonDao;

/**
 * @author wavus
 *
 */
@Controller
public class StstisticsUSRecmdKwrdMngController {
	
	@Resource
	private StstisticsCommonDao dao;
	
	
	/**
	  * @Method Name : pageCall
	  * @작성일 : 2020. 4. 27.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : 추천키워드 페이지 호출
	*/
	@RequestMapping(value = "/ststistics/ststisticsUSRecmdKwrdMng.do")
	public String pageCall(ModelMap map) {
		return "ststistics/ststisticsUSRecmdKwrdMng";
	}
	
	/**
	  * @Method Name : getStstisticsUSLifeCycleList
	  * @작성일 : 2020. 4. 27.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : 생애주기 검색조건 조회
	*/
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSLifeCycleList.do")
	public HashMap<String, Object> getStstisticsUSLifeCycleList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("data", dao.select("ststistics.getStstisticsUSLifeCycleList",paramMap));
		return paramMap;
	}
	
	/**
	  * @Method Name : getMappingInterestsList
	  * @작성일 : 2020. 4. 27.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : 생애주기에 매핑된 통계거리 검색조건 조회
	*/
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getMappingInterestsList.do")
	public HashMap<String, Object> getMappingInterestsList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("data", dao.select("ststistics.getMappingInterestsList",paramMap));
		return paramMap;
	}
	
	/**
	  * @Method Name : getRecmdKwrdList
	  * @작성일 : 2020. 4. 28.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : 추천키워드, 검색키워드, 트렌드키워드 목록 조회
	*/
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getRecmdAndSearchKwrdList.do")
	public HashMap<String, Object> getRecmdKwrdList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("recmd", dao.selectMap("ststistics.getRecmdKwrdList",paramMap));
		paramMap.put("search", dao.select("ststistics.getSearchKwrdList",paramMap));
		//paramMap.put("trend", dao.select("ststistics.getTrendKwrdList",paramMap));
		paramMap.put("mainKwrd", dao.select("ststistics.getCtlgMainKwrdList",paramMap));
		
		return paramMap;
	}
}
