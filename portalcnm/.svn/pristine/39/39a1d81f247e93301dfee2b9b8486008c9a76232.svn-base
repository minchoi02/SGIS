package kostat.sop.ServiceAPI.api.dt.ststistics.web;

import java.io.FileInputStream;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
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

/**
 * @author 	djlee
 * @date	2019-07-10
 * @comment	통계거리 관리
 */
@Controller
public class StstisticsUSInterestsMngController {

	@Resource
	private StstisticsCommonDao dao;
	
	/**
	 * @comment	통계거리 페이지 호출
	 * @param 	request
	 * @param 	response
	 * @return
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSInterestsMng.do")
	public String pageCall(ModelMap map) {
		map.addAttribute("lifecycle", 	dao.select("ststisticsCmmn.getStstisticsUSLifeCycle",new HashMap<String, Object>()));/*19년수정*/
		return "ststistics/ststisticsUSInterestsMng";
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
	@RequestMapping(value = "/api/ststistics/excelParseInterests.do" , method=RequestMethod.POST)
	public HashMap<String, Object> excelParseInterests(MultipartHttpServletRequest request) throws IllegalStateException, IOException, InstantiationException, IllegalAccessException, NoSuchMethodException, SecurityException, IllegalArgumentException, InvocationTargetException 	{
		HashMap<String, Object> fileInfoMap = StstisticsUtils.excelParse(request);
		Workbook wb = StstisticsUtils.getWorkbook((FileInputStream)fileInfoMap.get("stream") , (String)fileInfoMap.get("name"));
		List<HashMap<String, Object>> list = StstisticsUtils.excelDataParse(wb);
		HashMap<String, Object> resultMap = new HashMap<String, Object>();

		for(HashMap<String, Object> map : list) {
			map = StstisticsUtils.addSessionMap(map);
			int result = dao.register("ststistics.excelUploadInterests",map);
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
	@RequestMapping(value = "/api/ststistics/getStstisticsUSInterestsMng.do")
	public HashMap<String, Object> getStstisticsUSInterestsMng(@RequestParam HashMap<String, Object> paramMap) 	{
		//페이징 연산
		StstisticsUtils.pageOperation(paramMap, dao.selectInt("ststistics.getStstisticsUSInterestsMngTotal",paramMap));
		//목록 조회
		paramMap.put("data", dao.select("ststistics.getStstisticsUSInterestsMng",paramMap));
		return paramMap;
	}
	
	/**
	 * @comment	통계거리 목록을 등록 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/registerStstisticsUSInterestsMng.do" , method=RequestMethod.POST)
	public HashMap<String, Object> registerStstisticsUSInterestsMng(MultipartHttpServletRequest request) throws IllegalStateException, IOException 	{
		
		HashMap<String, Object> paramMap = StstisticsUtils.convertRequestToMap(request);
        
		paramMap.putAll(StstisticsUtils.fileUpload(request));
		
		paramMap = StstisticsUtils.addSessionMap(paramMap);
		
		if(dao.selectInt("ststistics.getStstisticsUSInterestsIsExists", paramMap) == 0) {
			paramMap.put("code",(dao.register("ststistics.registerStstisticsUSInterestsMng", paramMap) < 1) ? -1 : 0);
		}else {
			paramMap.put("code",(dao.edit("ststistics.editStstisticsUSInterestsMng", paramMap) < 1) ? -1 : 0);
		}
		return paramMap;
	}
	
	/**
	 * @comment ID 중복을 체크합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/idcheckStstisticsUSInterestsMng.do")
	public HashMap<String, Object> idcheckStstisticsUSInterestsMng(@RequestParam HashMap<String, Object> paramMap) 	{
		//목록 조회
		paramMap.put("code",(dao.selectInt("ststistics.idcheckStstisticsUSInterestsMng", paramMap) < 1) ? 0 : -1);
		return paramMap;
	}
	
	/**
	 * @comment	통계거리를 삭제 합니다.(매핑도 같이 삭제합니다.)
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/removeDistance.do" , method=RequestMethod.POST)
	public int removeLfeCycle(@RequestParam HashMap<String, Object> paramMap) 	{
		int result = 0;
		paramMap.put("code",(dao.remove("ststistics.removeDistanceData",paramMap) < 1) ? -1 : 0);
		paramMap.put("code",(dao.remove("ststistics.removeDistanceDataMapping",paramMap) < 1) ? -1 : 0);
		
		return result;
	}
	
}
