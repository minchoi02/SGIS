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
public class StstisticsUSKwrdContentMngController {

	@Resource
	private StstisticsCommonDao dao;
	
	
	/**
	  * @Method Name : pageCall
	  * @작성일 : 2020. 4. 27.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : 추천키워드 페이지 호출
	*/
	@RequestMapping(value = "/ststistics/ststisticsUSKwrdContentMng.do")
	public String pageCall(ModelMap map) {
		return "ststistics/ststisticsUSKwrdContentMng";
	}
	
	
	/**
	  * @Method Name : getStstisticsUSKwrdRecmdserviceList
	  * @작성일 : 2020. 5. 22.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : 키워드에 대한 추천서비스 현황 조회
	*/
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSKwrdRecmdserviceList.do")
	public HashMap<String, Object> getStstisticsUSKwrdRecmdserviceList(@RequestParam HashMap<String, Object> paramMap) 	{
		StstisticsUtils.pageOperation(paramMap, dao.selectInt("ststistics.getStstisticsUSKwrdRecmdserviceListTotal",paramMap));
		paramMap.put("data", dao.select("ststistics.getStstisticsUSKwrdRecmdserviceList",paramMap));
		
		return paramMap;
	}
	
	/**
	  * @Method Name : getStstisticsUSKwrdRecmdserviceList
	  * @작성일 : 2020. 5. 22.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : 키워드에 대한 추천서비스 상세정보 조회
	*/
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSKwrdRecmdserviceDetail.do")
	public HashMap<String, Object> getStstisticsUSKwrdRecmdserviceDetail(@RequestParam HashMap<String, Object> paramMap) 	{
		//StstisticsUtils.pageOperation(paramMap, dao.selectInt("ststistics.getStstisticsUSKwrdRecmdserviceDetailTotal",paramMap));
		paramMap.put("rows", dao.select("ststistics.getStstisticsUSKwrdRecmdserviceDetail",paramMap));
		
		return paramMap;
	}
	
	/**
	  * @Method Name : getStstisticsUSKwrdMaptypeList
	  * @작성일 : 2020. 5. 22.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : 키워드에 대한 지도유형 현황 조회
	*/
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSKwrdMaptypeList.do")
	public HashMap<String, Object> getStstisticsUSKwrdMaptypeList(@RequestParam HashMap<String, Object> paramMap) 	{
		StstisticsUtils.pageOperation(paramMap, dao.selectInt("ststistics.getStstisticsUSKwrdMaptypeListTotal",paramMap));
		paramMap.put("data", dao.select("ststistics.getStstisticsUSKwrdMaptypeList",paramMap));
		
		return paramMap;
	}
	
	/**
	  * @Method Name : getStstisticsUSKwrdLifecycleList
	  * @작성일 : 2020. 5. 22.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : 키워드에 대한 생애주기 현황 조회
	*/
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSKwrdLifecycleList.do")
	public HashMap<String, Object> getStstisticsUSKwrdLifecycleList(@RequestParam HashMap<String, Object> paramMap) 	{
		StstisticsUtils.pageOperation(paramMap, dao.selectInt("ststistics.getStstisticsUSKwrdRecmdLifecycleListTotal",paramMap));
		paramMap.put("data", dao.select("ststistics.getStstisticsUSKwrdLifecycleList",paramMap));
		
		return paramMap;
	}
	
	/**
	  * @Method Name : getStstisticsUSKwrdInterestsList
	  * @작성일 : 2020. 5. 22.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : 키워드에 대한 통계거리 현황 조회
	*/
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSKwrdInterestsList.do")
	public HashMap<String, Object> getStstisticsUSKwrdInterestsList(@RequestParam HashMap<String, Object> paramMap) 	{
		StstisticsUtils.pageOperation(paramMap, dao.selectInt("ststistics.getStstisticsUSKwrdRecmdInterestsListTotal",paramMap));
		paramMap.put("data", dao.select("ststistics.getStstisticsUSKwrdInterestsList",paramMap));
		
		return paramMap;
	}
	
}
