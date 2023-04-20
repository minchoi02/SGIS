package kostat.sop.ServiceAPI.api.dt.ststistics.web;

import java.io.FileInputStream;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.apache.poi.ss.usermodel.Workbook;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
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
public class StstisticsUSDataMngController {
	@Resource
	private StstisticsCommonDao dao;
	
	/**
	 * @comment	통계거리 페이지 호출
	 * @param 	request
	 * @param 	response
	 * @return
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSDataMng.do")
	public String ststisticsUSDataMng(ModelMap map) {
		map.addAttribute("keyWord", 	dao.select("ststisticsCmmn.getStstisticsUSKeyWord",new HashMap<String, Object>()));/*19년수정*/
		map.addAttribute("datainterests", 	dao.select("ststisticsCmmn.getStstisticsUSInterestsData",new HashMap<String, Object>()));/*19년수정*/
		return "ststistics/ststisticsUSDataMng";
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
	@RequestMapping(value = "/api/ststistics/excelParseData.do" , method=RequestMethod.POST)
	public HashMap<String, Object> excelParseData(MultipartHttpServletRequest request) throws IllegalStateException, IOException, InstantiationException, IllegalAccessException, NoSuchMethodException, SecurityException, IllegalArgumentException, InvocationTargetException 	{
		HashMap<String, Object> fileInfoMap = StstisticsUtils.excelParse(request);
		Workbook wb = StstisticsUtils.getWorkbook((FileInputStream)fileInfoMap.get("stream") , (String)fileInfoMap.get("name"));
		List<HashMap<String, Object>> list = StstisticsUtils.excelDataParse(wb);
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		int result = 0;
		if(list != null && list.size() > 0) {
			for(HashMap<String, Object> map  :list) {
				result += dao.edit("ststisticsData.registerOrEditExcelDataMng", StstisticsUtils.addSessionMap(map));
			}
			resultMap.put("code", (result < 1) ? -1 : 0);
		}else {
			resultMap.put("code" , -1);
		}
		return resultMap;
	}
	
	/**
	 * @comment 서비스 목록을 조회 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSDataMng.do")
	public HashMap<String, Object> getStstisticsUSDataMng(@RequestParam HashMap<String, Object> paramMap) 	{
		//페이징 연산
		StstisticsUtils.pageOperation(paramMap, dao.selectInt("ststisticsData.getStstisticsUSDataMngTotal",paramMap));
		//목록 조회
		paramMap.put("data", dao.select("ststisticsData.getStstisticsUSDataMng",paramMap));
		return paramMap;
	}
	/**
	 * @comment	통계자료설명을 갱신합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/proccessExpUpload.do")
	public HashMap<String, Object> proccessExpUpload(@RequestParam HashMap<String, Object> paramMap) 	{
		List<HashMap<String, Object>> str = dao.select("ststisticsData.proccessExpUploadData",paramMap);
		String expRelId = "";
		String expRelExpCol = "";
		String expRelIdCol = "";
		String expRelTb = "";
		for(HashMap<String, Object> map : str) {
			for(String key  : map.keySet()) {
				if(key.toString().equals("expRelId")) {
					expRelId = (String) map.get(key);
					paramMap.put("expRelId",expRelId);
				}
				else if(key.toString().equals("expRelExpCol")) {
					expRelExpCol = (String) map.get(key);
					paramMap.put("expRelExpCol",expRelExpCol);
				}
				else if(key.toString().equals("expRelIdCol")) {
					expRelIdCol = (String) map.get(key);
					paramMap.put("expRelIdCol",expRelIdCol);
				}
				else if(key.toString().equals("expRelTb")) {
					expRelTb = (String) map.get(key);
					paramMap.put("expRelTb",expRelTb);
				}
			}
			dao.edit("ststisticsData.proccessExpUpload",paramMap);
		}
		return paramMap;
	}
	/**
	 * @comment	신규서비스를 등록 및 수정 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/registerOrEditStstisticsUSDataMng.do")
	public HashMap<String, Object> registerOrEditStstisticsUSDataMng(@RequestParam HashMap<String, Object> paramMap) 	{
		String type = (String)paramMap.get("statDataId");
		String menuNm = (String)paramMap.get("menuNm");
		String menuNmType  = "";
		if(menuNm.equals("대화형 통계지도")) {
			menuNmType = "CV";
		}
		else if(menuNm.equals("살고싶은 우리동네")) {
			menuNmType = "HA";
		}
		else if(menuNm.equals("업종통계지도: 기술업종통계지도")) {
			menuNmType = "BS";
		}
		else if(menuNm.equals("업종통계지도: 생활업종통계지도")) {
			menuNmType = "BS";
		}
		else if(menuNm.equals("일자리 맵")) {
			menuNmType = "WR";
		}
		else if(menuNm.equals("정책통계지도")) {
			menuNmType = "PS";
		}
		else if(menuNm.equals("통계주제도")) {
			menuNmType = "TM";
		}
		//int idx = menuNmType.indexOf("_");
		//String menuNm = menuNmType.substring(0,idx);
		//menuNmType = menuNmType.substring(idx+1);
		//paramMap.put("menuNm",menuNm);
		if(type.length()==0) {
			int val = 0;
			val = dao.selectInt("ststisticsData.getStstisticsStatDataIdTotal",paramMap);
			String total = Integer.toString(val+1);
			if(val>=0 && val<10) {
				menuNmType = menuNmType+"000"+total;
			}
			else if(val>10 && val<100){
				menuNmType = menuNmType+"00"+total;
			}
			else if(val>100 && val<1000){
				menuNmType = menuNmType+"0"+total;
			}
			else if(val>1000 && val<10000){
				menuNmType = menuNmType+total;
			}
			paramMap.put("statDataId",menuNmType);
		}
		paramMap.put("code",(dao.edit("ststisticsData.registerOrEditStstisticsUSDataMng", StstisticsUtils.addSessionMap(paramMap)) < 1) ? -1 : 0);
		return paramMap;
	}
	/**
	 * @comment ID 중복을 체크합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/idcheckStstisticsUSDataMng.do")
	public HashMap<String, Object> idcheckStstisticsUSDataMng(@RequestParam HashMap<String, Object> paramMap) 	{
		//목록 조회
		paramMap.put("code",(dao.selectInt("ststisticsData.idcheckStstisticsUSDataMng", paramMap) < 1) ? 0 : -1);
		System.out.println(paramMap);
		return paramMap;
	}
	/**
	 * @comment	데이터를 편집 합니다.
	 * @param 	paramMap
	 * @return
	 */
	/*@RequestMapping(value = "/ststistics/editStstisticsUSDataMng.do")
	public void editStstisticsUSDataMng(@RequestParam HashMap<String, Object> paramMap){
		paramMap.put("data", dao.edit("ststisticsData.editStstisticsUSDataMng",paramMap));
		
	}*/
}
