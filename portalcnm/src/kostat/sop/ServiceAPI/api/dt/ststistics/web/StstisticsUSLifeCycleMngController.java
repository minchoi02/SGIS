package kostat.sop.ServiceAPI.api.dt.ststistics.web;

import java.io.FileInputStream;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kostat.sop.ServiceAPI.api.common.StstisticsUtils;
import kostat.sop.ServiceAPI.api.dt.ststistics.mapper.StstisticsCommonDao;

@Controller
public class StstisticsUSLifeCycleMngController {
	
	@Resource
	private StstisticsCommonDao dao;
	

	@RequestMapping(value = "/ststistics/ststisticsUSLifeCycleMng.do")
	public String pageCall(ModelMap map) {
		map.addAttribute("interests", 	dao.select("ststisticsCmmn.getStstisticsUSInterests",new HashMap<String, Object>()));/*19년수정*/
		return "ststistics/ststisticsUSLifeCycleMng";
	}
	
	/**
	 * @param request
	 * @return
	 * @throws IllegalStateException
	 * @throws IOException
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 * @throws NoSuchMethodException
	 * @throws SecurityException
	 * @throws IllegalArgumentException
	 * @throws InvocationTargetException
	 * @comment 엑셀 일괄 업로드 처리
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/excelParseLifeCycle.do" , method=RequestMethod.POST)
	public HashMap<String, Object> excelParseLifeCycle(MultipartHttpServletRequest request) throws IllegalStateException, IOException, InstantiationException, IllegalAccessException, NoSuchMethodException, SecurityException, IllegalArgumentException, InvocationTargetException 	{
		HashMap<String, Object> fileInfoMap = StstisticsUtils.excelParse(request);
		Workbook wb = StstisticsUtils.getWorkbook((FileInputStream)fileInfoMap.get("stream") , (String)fileInfoMap.get("name"));
		List<HashMap<String, Object>> list = StstisticsUtils.excelDataParse(wb);
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		for(HashMap<String, Object> map : list) {
			map = StstisticsUtils.addSessionMap(map);
			int result = dao.register("ststistics.excelUploadLifeCycle",map);
			resultMap.put("code" , result < 1 ? -1 : 0);
		}

		return resultMap;
	}
	
	/**
	 * @comment	통계거리 목록을 조회 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSLifeCycleMng.do")
	public HashMap<String, Object> getStstisticsUSLifeCycleMng(@RequestParam HashMap<String, Object> paramMap) 	{
		StstisticsUtils.pageOperation(paramMap, dao.selectInt("ststistics.getStstisticsUSLifeCycleMngTotal",paramMap));
//		List<HashMap<String, Object>> list = dao.select("ststistics.getStstisticsUSLifeCycleMng",paramMap);
//		for(HashMap<String, Object> map : list) {
//			StstisticsUtils.extend(map , dao.selectMap("ststistics.getStstisticsUSLifeCycleRecmdkwrd",map));
//		}
		paramMap.put("data", dao.select("ststistics.getStstisticsUSLifeCycleMng",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment	통계거리 목록을 조회 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSLifeCycleRecmdkwrd.do")
	public HashMap<String, Object> getStstisticsUSLifeCycleRecmdkwrd(@RequestParam HashMap<String, Object> paramMap) 	{
		return dao.selectMap("ststistics.getStstisticsUSLifeCycleRecmdkwrd",paramMap);
	}
	
	/**
	 * @comment	통계거리 목록을 등록 합니다.
	 * @param 	paramMap
	 * @return
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/registerStstisticsUSLifeCycleMng.do" , method=RequestMethod.POST)
	public HashMap<String, Object> registerStstisticsUSLifeCycleMng(MultipartHttpServletRequest request) throws IllegalStateException, IOException 	{
		
		HashMap<String, Object> paramMap = StstisticsUtils.convertRequestToMap(request);
		
		paramMap.putAll(StstisticsUtils.fileUpload(request));
	
		paramMap = StstisticsUtils.addSessionMap(paramMap);
		
		if(dao.selectInt("ststistics.getStstisticsUSLifeCycleIsExists", paramMap) == 0) {
			int result = dao.register("ststistics.registerStstisticsUSLifeCycleMng", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
//			if(result > 0 ) {
//				paramMap.put("code",(dao.register("ststistics.registerStstisticsUSLifeCycleRecmdkwrd", paramMap)< 1) ? -1 : 0);
//			}
		}else {
			int result = dao.edit("ststistics.editStstisticsUSLifeCycleMng", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
//			if(result > 0) {
//				if(dao.selectInt("ststistics.getStstisticsUSLifeCycleRecmdkwrdIsExists", paramMap) == 0) {
//					paramMap.put("code",(dao.register("ststistics.registerStstisticsUSLifeCycleRecmdkwrd", paramMap)< 1) ? -1 : 0);
//				}else {
//					paramMap.put("code",(dao.edit("ststistics.editStstisticsUSLifeCycleRecmdkwrd", paramMap) < 1) ? -1 : 0);
//				}
//				
//			}
		}
		return paramMap;
	}
	/**
	 * @comment	통계거리 목록을 등록 합니다.
	 * @param 	paramMap
	 * @return
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/registerStstisticsUSLifeCycleRecmdkwrd.do" , method=RequestMethod.POST)
	public HashMap<String, Object> registerStstisticsUSLifeCycleMng(@RequestParam HashMap<String, Object> paramMap) throws IllegalStateException, IOException 	{
		paramMap = StstisticsUtils.addSessionMap(paramMap);
		for(String key : paramMap.keySet()) {
			System.out.println("key = " + key + " , value = " + paramMap.get(key) );
		}
		if(dao.selectInt("ststistics.getStstisticsUSLifeCycleRecmdkwrdIsExists", paramMap) == 0) {
			paramMap.put("code",(dao.register("ststistics.registerStstisticsUSLifeCycleRecmdkwrd", paramMap)< 1) ? -1 : 0);
		}else {
			paramMap.put("code",(dao.edit("ststistics.editStstisticsUSLifeCycleRecmdkwrd", paramMap) < 1) ? -1 : 0);
		}
				
		return paramMap;
	}
	
	/**
	 * @comment ID 중복을 체크합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/idcheckStstisticsUSLifeCycleMng.do")
	public HashMap<String, Object> idcheckStstisticsUSLifeCycleMng(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("code",(dao.selectInt("ststistics.idcheckStstisticsUSLifeCycleMng", paramMap) < 1) ? 0 : -1);
		return paramMap;
	}
	
	/**
	 * @comment	생애주기를 삭제 합니다.(매핑도 같이 삭제합니다.)
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/removeLfeCycle.do" , method=RequestMethod.POST)
	public int removeLfeCycle(@RequestParam HashMap<String, Object> paramMap) 	{
		int result = 0;
		paramMap.put("code",(dao.remove("ststistics.removeLfeCycleData",paramMap) < 1) ? -1 : 0);
		paramMap.put("code",(dao.remove("ststistics.removeLfeCycleDataMapping",paramMap) < 1) ? -1 : 0);
		
		return result;
	}
	
}
