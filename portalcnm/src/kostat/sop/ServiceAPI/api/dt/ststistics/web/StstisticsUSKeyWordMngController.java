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

@Controller
public class StstisticsUSKeyWordMngController {
	
	@Resource
	private StstisticsCommonDao dao;

	/**
	 * @comment	키워드 목록을 조회 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSKeyWordMng.do")
	public String ststisticsUSKeyWordMng(ModelMap map) {
		map.addAttribute("Service", 	dao.select("ststisticsCmmn.getStstisticsUSData",new HashMap<String, Object>()));/*19년수정*/
		return "ststistics/ststisticsUSKeyWordMng";
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
	@RequestMapping(value = "/api/ststistics/excelParseKeyWord.do" , method=RequestMethod.POST)
	public HashMap<String, Object> excelParse(MultipartHttpServletRequest request) throws IllegalStateException, IOException, InstantiationException, IllegalAccessException, NoSuchMethodException, SecurityException, IllegalArgumentException, InvocationTargetException 	{
		HashMap<String, Object> fileInfoMap = StstisticsUtils.excelParse(request);
		Workbook wb = StstisticsUtils.getWorkbook((FileInputStream)fileInfoMap.get("stream") , (String)fileInfoMap.get("name"));
		List<HashMap<String, Object>> list = StstisticsUtils.excelDataParse(wb);
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		int result = 0;
		for(HashMap<String, Object> map :list) {
			map.put("useYn" , map.get("column0"));
			map.put("ctlgMainKwrd" , map.get("column1"));
			if(dao.register("ststistics.registerStstisticsUSKeyWordMngConfirm", map) == 0) {
				result += dao.register("ststistics.registerStstisticsUSKeyWordMng", StstisticsUtils.addSessionMap(map));
			}
		}
		resultMap.put("code",(result < 1) ? -1 : 0);
		return resultMap;
	}
	
	/**
	 * @comment	키워드 목록을 조회 합니다.
	 * 
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSKeyWordMng.do" , method=RequestMethod.POST)
	public HashMap<String, Object> getStstisticsUSInterestsMng(@RequestParam HashMap<String, Object> paramMap) 	{
		StstisticsUtils.pageOperation(paramMap, dao.selectInt("ststistics.getStstisticsUSKeyWordMngTotal",paramMap));
		paramMap.put("data", dao.select("ststistics.getStstisticsUSKeyWordMng",paramMap));
		return paramMap;
		
	}
	
	/**
	 * @comment	키워드 목록을 등록 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/registerStstisticsUSKeyWordMng.do" , method=RequestMethod.POST)
	public HashMap<String, Object> registerStstisticsUSKeyWordMng(@RequestParam HashMap<String, Object> paramMap) 	{
		//목록 등록
		paramMap = StstisticsUtils.addSessionMap(paramMap);
		if(dao.selectInt("ststistics.getStstisticsUSKeyWordIsExists", paramMap) == 0) {
			paramMap.put("code",(dao.register("ststistics.registerStstisticsUSKeyWordMng", paramMap) < 1) ? -1 : 0);
		}else {
			paramMap.put("code",(dao.edit("ststistics.editStstisticsUSKeyWordMng", paramMap) < 1) ? -1 : 0);
		}
		return paramMap;
	}
	
	/**
	 * @comment	키워드를 삭제 합니다.(매핑도 같이 삭제합니다.)
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/removeKeyword.do" , method=RequestMethod.POST)
	public int removeKeyword(@RequestParam HashMap<String, Object> paramMap) 	{
		int result = 0;
		paramMap.put("code",(dao.remove("ststistics.removeKeyword",paramMap) < 1) ? -1 : 0);
		paramMap.put("code",(dao.remove("ststistics.removeKeywordMapping",paramMap) < 1) ? -1 : 0);
		
		return result;
	}
	
}
