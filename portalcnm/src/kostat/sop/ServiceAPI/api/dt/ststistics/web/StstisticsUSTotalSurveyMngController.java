package kostat.sop.ServiceAPI.api.dt.ststistics.web;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.api.common.StstisticsUtils;
import kostat.sop.ServiceAPI.api.dt.ststistics.mapper.StstisticsCommonDao;

/**
 * @author 	djlee
 * @date	2019-07-10
 * @comment	통계거리 관리
 */
@Controller
public class StstisticsUSTotalSurveyMngController {

	@Resource
	private StstisticsCommonDao dao;
	
	/**
	 * 총조사시각화 통계표 관리 페이지를 보여준다.
	 * @param 	request
	 * @param 	response
	 * @return  String
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSTotalStblMng.do")
	public String ststisticsUSTotalStblMng(ModelMap map) {
		return "ststistics/ststisticsUSTotalStblMng";
	}
	
	/**
	 * 총조사시각화 통계표 관리 페이지를 보여준다.
	 * @param 	request
	 * @param 	response
	 * @return  String
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSTotalStblDetailMng.do")
	public String ststisticsUSTotalStblDetailMng(ModelMap map) {
		return "ststistics/ststisticsUSTotalStblDetailMng";
	}
	
	/**
	 * 총조사시각화 항목 테이블의 목록을 조회 합니다.
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSTotalStblList.do")
	public HashMap<String, Object> getStstisticsUSTotalStblList(@RequestParam HashMap<String, Object> paramMap) 	{
		//페이징 연산
		StstisticsUtils.pageOperation(paramMap, dao.selectInt("ststisticsUsTotalSurvey.getStstisticsUSTotalStblMngTotal",paramMap));
		//목록 조회
		paramMap.put("data", dao.select("ststisticsUsTotalSurvey.getStstisticsUSTotalStblList",paramMap));
		return paramMap;
	}
	
	/**
	 * 총조사시각화 항목 테이블의 목록을 조회 합니다.
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/ststisticsUSTotalStblDetailList.do")
	public HashMap<String, Object> getStstisticsUSTotalStblDetailList(@RequestParam HashMap<String, Object> paramMap) 	{
		//페이징 연산
		StstisticsUtils.pageOperation(paramMap, dao.selectInt("ststisticsUsTotalSurvey.getStstisticsUSTotalStblDetailMngTotal",paramMap));
		//목록 조회
		paramMap.put("data", dao.select("ststisticsUsTotalSurvey.getStstisticsUSTotalStblDetailList",paramMap));
		return paramMap;
	}
	
	/**
	 * 총조사시각화 항목 테이블의 목록을 조회 합니다.
	 * @param 	paramMap
	 * @return  ModelAndView
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/ststisticsUsTotalSurveyExcelDownload.do")
	public ModelAndView  statusExcelDataDownLoad(@RequestParam HashMap<String, Object> paramMap) throws JsonParseException, JsonMappingException, IOException 	{
		System.out.println(paramMap);
		ModelAndView mav = new ModelAndView("excelView");
	    Map<String, Object> dataMap = new HashMap<String, Object>();
	    String filename = "";
	    String[] columnArr = null;
	    String[] columnVarArr = null;
	    
	    List<HashMap<String, Object>> list = null;
	    
		list = dao.select("ststisticsUsTotalSurvey.ststisticsUsTotalSurveyExcelDownload", paramMap);
    	
    	filename = "총조사시각화";
    	/*columnArr = new String[]{"항목순번", "분류명", "조사 ID", "항목명", "표출순위", "등록일자", "수정일자"};
		columnVarArr = new String[]{"itemSeq", "itemClassNm", "survId", "dataNm","dispRank", "regDt", "modDt"};
	    
	    dataMap.put("columnArr", columnArr);
	    dataMap.put("columnVarArr", columnVarArr);
	    dataMap.put("sheetNm", "총조사시각화 관리 조회");
	    dataMap.put("list", list);
	    mav.addObject("dataMap", dataMap);
	    mav.addObject("filename", filename);*/
    	
    	columnArr = new String[]{"항목순번", "통계구분", "통계시기", "통계정보", "출처", "표출순위"};
		columnVarArr = new String[]{"rnum", "stattbDiv", "stattbYear", "tblNm","stattbSourc", "stattbOrder"};
		dataMap.put("columnArr", columnArr);
	    dataMap.put("columnVarArr", columnVarArr);
	    dataMap.put("sheetNm", "총조사시각화 관리 조회");
	    dataMap.put("list", list);
	    mav.addObject("dataMap", dataMap);
	    mav.addObject("filename", filename);
		
	    return mav;
	}
	
	/**
	 * 총조사시각화 등록/수정 페이지에서 하단에서 설정할 수 있는 C3 목록들을 조회해서 가져옵니다.
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSTotalSurveyDataNmAndExpRank.do")
	public HashMap<String, Object> getStstisticsUSTotalSurveyDataNmAndExpRank(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("rows", dao.select("ststisticsUsTotalSurvey.searchNmAndExpRank",paramMap));
		return paramMap;
	}
	
	/**
	 * 총조사시각화 항목 테이블의 목록을 조회 합니다.
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSTotalSurveyThemaList.do")
	public HashMap<String, Object> get_SRV_DT_TOT_SURV_INFO_THEMAS(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("themaList", dao.select("ststisticsUsTotalSurvey.getSurveyThemaList",paramMap));
		return paramMap;
	}
	
	
	/**
	 * 총조사시각화 등록 및 수정(=삭제) 페이지에서 "통계정보" 선택란에서 첫번째 SelectBox에 넣을 테마들을 조회한다.<br>
	 * SRV_DT_TOT_SURV_INFO 테이블의 THEMA 컬럼을 읽어온다. [ 인구, 가구, 주택, 농업, 임업, 어업 ]이 있다.
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSTotalSurveySurvIdList.do")
	public HashMap<String, Object> getSurvIdGroupByThema(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("survIdList", dao.select("ststisticsUsTotalSurvey.getSurvIdGroupByThema",paramMap));
		return paramMap;
	}
	
	
	
	/**
	 * 총조사시각화 등록/수정 페이지에서 하단에서 설정할 수 있는 아이템 목록들을 조회해서 가져옵니다.
	 * 가져오는 기준은 "통계정보선택"에서 선택한 조사 ID를 기준으로 조회합니다.
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSTotalSurveyItemSelectList.do")
	public HashMap<String, Object> getStstisticsUSTotalSurveyItemSelectList(@RequestParam HashMap<String, Object> paramMap) 	{
		List<HashMap<String, Object>> rows = new ArrayList<>();
		
		rows =  dao.select("ststisticsUsTotalSurvey.getStstisticsUSTotalSurveyItemSelectList",paramMap);
		paramMap.put("rows", rows);
		return paramMap;
	}
	
	/**
	 * 총조사시각화 등록/수정 페이지에서 하단에서 설정할 수 있는 C1 목록들을 조회해서 가져옵니다.
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSTotalSurveyContent_1_SelectList.do")
	public HashMap<String, Object> getStstisticsUSTotalSurveyContent_1_SelectList(@RequestParam HashMap<String, Object> paramMap) 	{
		
		paramMap.put("rows", dao.select("ststisticsUsTotalSurvey.getStstisticsUSTotalSurveyContent_1_SelectList",paramMap));			
		return paramMap;
	}
	
	/**
	 * 총조사시각화 등록/수정 페이지에서 하단에서 설정할 수 있는 C2 목록들을 조회해서 가져옵니다.
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSTotalSurveyContent_2_SelectList.do")
	public HashMap<String, Object> getStstisticsUSTotalSurveyContent_2_SelectList(@RequestParam HashMap<String, Object> paramMap) 	{
		
		paramMap.put("rows", dao.select("ststisticsUsTotalSurvey.getStstisticsUSTotalSurveyContent_2_SelectList",paramMap));
		return paramMap;
	}
	
	/**
	 * 총조사시각화 등록/수정 페이지에서 하단에서 설정할 수 있는 C3 목록들을 조회해서 가져옵니다.
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSTotalSurveyContent_3_SelectList.do")
	public HashMap<String, Object> getStstisticsUSTotalSurveyContent_3_SelectList(@RequestParam HashMap<String, Object> paramMap) 	{
		
		paramMap.put("rows", dao.select("ststisticsUsTotalSurvey.getStstisticsUSTotalSurveyContent_3_SelectList",paramMap));
		return paramMap;
	}
	
	/**
	 * 등록 페이지에서 입력한 모든 데이터들을 입력한다.
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/insertAllStstisticsUsTotalSurvey.do", method=RequestMethod.POST)
	@Transactional
	public HashMap<String, Object> insertAllStstisticsUsTotalSurvey(
				@RequestParam(value="configuration") String configuration,
				@RequestParam(value="configurationDetails") String configurationDetails
				) throws JsonParseException, JsonMappingException, IOException 	{
		
		// 1. 필요 변수 미리 설정
		HashMap<String, Object> result = new HashMap<>();
		String configurationStr = configuration.replaceAll("&quot;", "\"");	// HTMLTagFilterRequestWrapper 의 cleanXSS 때문에 어쩔 수 없이 다시 원래 모양대로 변경한다.
		String detailsStr = configurationDetails.replaceAll("&quot;", "\"");// HTMLTagFilterRequestWrapper 의 cleanXSS 때문에 어쩔 수 없이 다시 원래 모양대로 변경한다.
		ObjectMapper mapper = new ObjectMapper();							// JSON.stringify 메소드에 의해서 보내진 String을 Java에서 사용하는 Object로 변환하기 위한 객체를 생성한다.
		
		
		
		// 2. JSON.stringify에 의한 String 값을 Java 에서 사용할 수 있는 객체로 만든다.
		mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES,true);
		HashMap<String, Object> configureMap = mapper.readValue(configurationStr, new TypeReference<HashMap<String, Object>>(){});		
		List<HashMap<String, Object>> detailList = mapper.readValue(detailsStr, new TypeReference<ArrayList<HashMap<String, Object>>>(){});
		System.out.println(configureMap);
		System.out.println(detailList);
		
		
		// 3. SRV_DT_TOT_SURV_ITEM 에 이미 넣으려는 데이터와 일치하는 항목이 있으면 이를 대입하지 못하게 한다. 
		// 중복 기준은 항목 대분류,중분류,소분로 그리고 그 분류에 해당하는 항목명 혹은 표출순위이다.
		
		if( checkDuplicateConfigure(configureMap, result) != null) {
			return result;
		}
		
		
		// 도움말이 존재한다면 도움말의 줄바꿈에 대한 처리가 필요하다.
		String forNewLine = (String)configureMap.get("EXP");
		forNewLine = forNewLine.replaceAll("\n", "\\\\n");
		configureMap.put("EXP", forNewLine);
		
		
		// 4. SRV_DT_TOT_SURV_ITEM 테이블에 데이터 주입
		dao.register("ststisticsUsTotalSurvey.insertAllStstisticsUsTotalSurvey",configureMap);
		Integer itemSeq = (Integer)configureMap.get("ITEM_SEQ");
		
		
		// 5. SRV_DT_TOT_SURV_ITEM_DETAIL 테이블에 데이터 주입
		for(HashMap<String, Object> mappedItem : detailList) {
			mappedItem.put("itemSeq", itemSeq);
			dao.register("ststisticsUsTotalSurvey.insertAllDetailStstisticsUsTotalSurvey",mappedItem);
		}
		
		
		// 6. 데이터를 넣어서 브라우저로 반환한다.
		result.put("configureMap", configureMap);
		result.put("detailList", detailList);
		
		return result;
	}

	/**
	 * 총조사시각화 관리 등록 페이지를 보여줍니다.
	 * @param 	request
	 * @param 	response
	 * @return  String
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSTotalStblRegister.do", method=RequestMethod.GET)
	public String ststisticsUSTotalStblRegister(@RequestParam HashMap<String, Object> paramMap, ModelMap map) throws IOException {
		return "ststistics/ststisticsUSTotalStblRegister";
	}
	/**
	 * 총조사시각화 관리 상세 등록 페이지를 보여줍니다.
	 * @param 	request
	 * @param 	response
	 * @return  String
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSTotalStblDetailRegister.do", method=RequestMethod.GET)
	public String ststisticsUSTotalStblDetailRegister(@RequestParam HashMap<String, Object> paramMap, ModelMap map) throws IOException {
		return "ststistics/ststisticsUSTotalStblDetailRegister";
	}

	/**
	 * 총조사시각화 통계표 정보를 삭제합니다.
	 * @param 	request
	 * @param 	response
	 * @return  String
	 */	
	@ResponseBody
	@Transactional
	@RequestMapping(value = "/ststistics/deleteStstisticsUSTotalStblInfo.do", method=RequestMethod.POST)
	public HashMap<String, Object> deleteStstisticsUSTotalStblInfo(@RequestParam HashMap<String, Object> paramMap, ModelMap map) throws IOException {
		HashMap<String, Object> result = new HashMap<String, Object>();
		int delTblCnt = dao.remove("ststisticsUsTotalSurvey.deleteStstisticsUSTotalStblInfo", paramMap);
		if(delTblCnt > 0) {
			result.put("result", "success");
		}
		return result;
	}
	
	/**
	 * 총조사시각화 통계표 상세 관리에서 통계표 상세 정보를 삭제합니다.
	 * @param 	request
	 * @param 	response
	 * @return  String
	 */
	@ResponseBody
	@Transactional
	@RequestMapping(value = "/ststistics/deleteStstisticsUSTotalStblDetailList.do", method=RequestMethod.POST)
	public HashMap<String, Object> deleteStstisticsUSTotalStblDetailList(@RequestParam HashMap<String, Object> paramMap, ModelMap map) throws IOException {
		HashMap<String, Object> result = new HashMap<String, Object>();
		dao.remove("ststisticsUsTotalSurvey.deleteStstisticsUSTotalStblDetailItmList", paramMap);
		int delCharCnt = dao.remove("ststisticsUsTotalSurvey.deleteStstisticsUSTotalStblDetailCharItmList", paramMap);
		if(delCharCnt > 0) {
			result.put("result", "success");
		}
		return result;
	}
	
	/**
	 * 총조사시각화 관리 통계표 상세 페이지를 보여줍니다.
	 * 하나의 jsp로 등록, 수정, 삭제가 모두 이루어집니다.
	 * @param 	request
	 * @param 	response
	 * @return  String
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSTotalStblInfo.do", method=RequestMethod.POST)
	public String ststisticsUSTotalStblInfo(@RequestParam HashMap<String, Object> paramMap, ModelMap map) throws IOException {
		HashMap<String, Object> result = new HashMap<String, Object>();
		map.put("requestParam", paramMap);
		List<HashMap<String, Object>> resultList = new ArrayList<HashMap<String, Object>>();
		resultList = dao.select("ststisticsUsTotalSurvey.selectStstisticsUSTotalStblInfo", paramMap);
		map.put("resultList", resultList);
		
		return "ststistics/ststisticsUSTotalStblInfo";
	}
	
	/**
	 * 총조사시각화 관리 통계표 상세 페이지를 보여줍니다.
	 * 하나의 jsp로 등록, 수정, 삭제가 모두 이루어집니다.
	 * @param 	request
	 * @param 	response
	 * @return  String
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSAdministStatsStblInfo.do", method=RequestMethod.POST)
	public String ststisticsUSAdministStatsStblInfo(@RequestParam HashMap<String, Object> paramMap, ModelMap map) throws IOException {
		HashMap<String, Object> result = new HashMap<String, Object>();
		map.put("requestParam", paramMap);
		List<HashMap<String, Object>> resultList = new ArrayList<HashMap<String, Object>>();
		resultList = dao.select("ststisticsUsTotalSurvey.selectStstisticsUSTotalStblInfo", paramMap);
		map.put("resultList", resultList);
		
		return "ststistics/ststisticsUSAdministStatsStblInfo";
	}
	
	/**
	 * 총조사시각화 관리 통계표 항목 상세 페이지를 보여줍니다.
	 * 하나의 jsp로 등록, 수정, 삭제가 모두 이루어집니다.
	 * @param 	request
	 * @param 	response
	 * @return  String
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSTotalStblDetailInfo.do", method=RequestMethod.POST)
	public String ststisticsUSTotalStblDetailInfo(@RequestParam HashMap<String, Object> paramMap, ModelMap map) throws IOException {
		map.put("requestParam", paramMap);
		List<HashMap<String, Object>> resultList = new ArrayList<HashMap<String, Object>>();
		resultList = dao.select("ststisticsUsTotalSurvey.selectStstisticsUSTotalStblDetailInfo", paramMap);
		map.put("resultList", resultList);
		map.put("requestParam", paramMap);
		map.put("isModify", paramMap.get("isModify"));
		
		return "ststistics/ststisticsUSTotalStblDetailInfo";
	}
	
	/**
	 * 총조사시각화 관리 통계표 항목 상세 페이지를 보여줍니다.
	 * 하나의 jsp로 등록, 수정, 삭제가 모두 이루어집니다.
	 * @param 	request
	 * @param 	response
	 * @return  String
	 */
	@ResponseBody
	@RequestMapping(value = "/ststistics/getStstisticsUSTotalStblDetailInfo.do", method=RequestMethod.POST)
	public HashMap<String, Object> getStstisticsUSTotalStblDetailInfo(@RequestParam HashMap<String, Object> paramMap, ModelMap map) throws IOException {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		result.put("requestParam", paramMap);
		List<HashMap<String, Object>> resultList = new ArrayList<HashMap<String, Object>>();
		resultList = dao.select("ststisticsUsTotalSurvey.selectStstisticsUSTotalStblDetailInfo", paramMap);
		result.put("resultList", resultList);
		
		return result;
	}
	
	
	/**
	 * 신규 통계표 등록.
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/insertStstisticsUSTotalStblList.do", method=RequestMethod.POST)
	@Transactional
	public HashMap<String, Object> insertStstisticsUSTotalStblList(@RequestBody List<HashMap<String, Object>> stblInfoMapList) throws JsonParseException, JsonMappingException, IOException 	{
		HashMap<String, Object> result = new HashMap<String, Object>();
		HashMap<String, Object> param = new HashMap<String, Object>();
		int rtnResult = 0;
		for(int i=0; i<stblInfoMapList.size(); i++) {
			 dao.register("ststisticsUsTotalSurvey.insertStstisticsUSTotalStblList", stblInfoMapList.get(i));
			 rtnResult++;
		}
		
		if(rtnResult != 0) {
			result.put("result", "success");
		}
		return result;
	}
	
	/**
	 * 통계표 수정.
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/updateStstisticsUSTotalStblList.do", method=RequestMethod.POST)
	@Transactional
	public HashMap<String, Object> updateStstisticsUSTotalStblList(@RequestBody List<HashMap<String, Object>> stblInfoMapList) throws JsonParseException, JsonMappingException, IOException 	{
		HashMap<String, Object> result = new HashMap<String, Object>();
		HashMap<String, Object> param = new HashMap<String, Object>();
		int rtnResult = 0;
		for(int i=0; i<stblInfoMapList.size(); i++) {
			 dao.register("ststisticsUsTotalSurvey.updateStstisticsUSTotalStblList", stblInfoMapList.get(i));
			 rtnResult++;
		}
		
		if(rtnResult != 0) {
			result.put("result", "success");
		}
		return result;
	}
	
	/**
	 * 통계표 상세 정보 수정.
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/updateStstisticsUSTotalStblDetailList.do", method=RequestMethod.POST)
	@Transactional
	public HashMap<String, Object> updateStstisticsUSTotalStblDetailList(@RequestBody List<HashMap<String, Object>> stblInfoMapList) throws JsonParseException, JsonMappingException, IOException 	{
		HashMap<String, Object> result = new HashMap<String, Object>();
		HashMap<String, Object> param = new HashMap<String, Object>();
		int rtnResult = 0;
		dao.edit("ststisticsUsTotalSurvey.updateStstisticsUSTotalStblChartInfo", stblInfoMapList.get(0));
		
		for(int i=0; i<stblInfoMapList.size(); i++) {
			 dao.register("ststisticsUsTotalSurvey.updateStstisticsUSTotalStblChartItmInfo", stblInfoMapList.get(i));
			 rtnResult++;
		}
		
		if(rtnResult != 0) {
			result.put("result", "success");
		}
		return result;
	}
	
	/**
	 * SURV_ID에 해당하는 항목 설정 및 항목 상세 설정 데이터들을 모두 지우는 메소드이다. 말이 지운다는 것일뿐, 사실은 DEL_YN 을 'Y'로 수정하는 것이다.
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/deleteStstisticsUSTotalSurvey.do", method=RequestMethod.POST)
	@Transactional
	public HashMap<String, Object> deleteStstisticsUSTotalSurvey(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("deletedRowCnt", dao.edit("ststisticsUsTotalSurvey.deleteStstisticsUSTotalSurveyConfigure",paramMap));
		paramMap.put("deletedDetailRowCnt", dao.edit("ststisticsUsTotalSurvey.deleteDetailStstisticsUSTotalSurveyConfigure",paramMap));
		return paramMap;
	}
	
	

	/**
	 * 수정 페이지에서 "항목 설정"의 수정 버튼을 눌렀을 때 보내는 데이터를 실제로 적용하는 메소드
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/updateConfigureStstisticsUSTotalSurvey.do", method=RequestMethod.POST)
	public HashMap<String, Object> updateConfigureStstisticsUSTotalSurvey(@RequestParam HashMap<String, Object> paramMap) {
		
		// 도움말(설명)의 경우 이미 줄바꿈 문자열이 들어간 상태이므로, 중복 비교를 위해서는 미리 바꾸고 DB에 있는 기존 데이터와 비교해야 한다.
		String forNewLine = (String)paramMap.get("EXP");
		forNewLine = forNewLine.replaceAll("\n", "\\\\n");
		paramMap.put("EXP", forNewLine);
		
		// 1. 수정하려는 값과 이미 자기가 갖고 있는 값들이 완전히 동일하면 이를 수정하지 않는다.
		if(dao.selectInt("ststisticsUsTotalSurvey.updateConfigureSelfCheck", paramMap) > 0) {
			paramMap.put("notSuccess","duplicateWithSelf");
			return paramMap;
		}
		
		// 2. 수정 결과물이 이미 SRV_DT_TOT_SURV_ITEM 테이블에  존재한다면 중복이 되므로 이를 방지한다
		HashMap<String, Object> errorMap = new HashMap<>();
		if( checkDuplicateConfigure(paramMap, errorMap) != null ) {
			paramMap.putAll(errorMap);
			return paramMap;
		}
		
		
		
//		if(dao.selectInt("ststisticsUsTotalSurvey.updateConfigureDuplicateCheck", paramMap) > 0) {
//			paramMap.put("notSuccess","duplicateWithOther");
//			return paramMap;
//		}
		
		// 3. 위의 2가지 사항과 부합되는 게 없다면 수정을 해도 된다.
		paramMap.put("successCnt",dao.edit("ststisticsUsTotalSurvey.updateConfigureStstisticsUSTotalSurvey",paramMap));
		System.out.println(paramMap);
		return paramMap;
	}
	

	/**
	 * 수정 페이지에서 "항목 상세 설정"의  수정 버튼을 눌렀을 때 보내는 데이터를 실제로 적용하는 메소드
	 * @param 	paramMap
	 * @return  HashMap
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/updateDetailStstisticsUSTotalSurvey.do", method=RequestMethod.POST)
	@Transactional
	public HashMap<String, Object> updateDetailStstisticsUSTotalSurvey(@RequestParam String itemSeq, @RequestParam String detailString) 
			throws JsonParseException, JsonMappingException, IOException 	{
		
		// 1. 필요한 변수들을 준비한다.
		detailString = detailString.replaceAll("&quot;", "\"");// HTMLTagFilterRequestWrapper 의 cleanXSS 때문에 어쩔 수 없이 다시 원래 모양대로 변경한다.
		ObjectMapper mapper = new ObjectMapper();			   // JSON.stringify 메소드에 의해서 보내진 String을 Java에서 사용하는 Object로 변환하기 위한 객체를 생성한다.
		HashMap<String, Object> result = new HashMap<>();
		
		// 2. JSON.stringify로 브라우저에서 온 데이터를 Java에서 사용할 수 있는 객체로 변환한다.
		List<HashMap<String, Object>> detailList = mapper.readValue(detailString, new TypeReference<ArrayList<HashMap<String, Object>>>(){});
		
		// 3. update처리를 시작한다.
		for(HashMap<String, Object> item : detailList) {
			item.put("itemSeq", itemSeq);
			
			// 3-1. 기존에 있던 데이터지만 삭제한 경우에는 DEL_YN = 'Y' 처리해준다.
			if(null != item.get("delYn")) {
				dao.edit("ststisticsUsTotalSurvey.updateDetail_delete", item);
			
			// 3-2. 기존에 있던 데이터와 완전히 동일한 경우는 아무처리하지 않고, 변화가 있거나 혹은 완전히 새로운 데이터이면 이를 반영한다.
			} else if(null == item.get("nochange")) {
				// ** 변한 것과 새로 추가 된것들만 이 if문에 들어오게 된다 **
				dao.edit("ststisticsUsTotalSurvey.updateDetail_mergeInto", item);
			}
		}
		
		// 4. 성공 메시지를 날려준다. 굳이 없어도 되지만 디버깅용을 위해서 남긴다.
		result.put("success", "Y");
		return result;
	}
	
	
	
	private HashMap<String, Object> checkDuplicateConfigure(HashMap<String, Object> configureMap, HashMap<String, Object> result) {
		List<HashMap<String, Object>> checkDuplicateList = dao.select("ststisticsUsTotalSurvey.selectConfigurationByClass", configureMap);
		if(checkDuplicateList.size() != 0) {
			
			String errorMsg = "[항목 설정 > 항목 분류]에 이미 동일한 ";
			for(int i = 0 ; i < checkDuplicateList.size(); i++) {
				HashMap<String, Object> map = checkDuplicateList.get(i);
				String dataNmFromDB = (String)map.get("DATA_NM");
				String dispRankFromDB = Integer.toString((Integer)map.get("DISP_RANK"));
				String dataNmFromBrowser = (String)configureMap.get("DATA_NM");
				String dispRankFromBrowser = (String)configureMap.get("DISP_RANK");
				
				
				if(dataNmFromBrowser.equals(dataNmFromDB)) {
					errorMsg += "자료명이 있습니다.";
					result.put("error",errorMsg);
					return result;
				} else if(dispRankFromBrowser.equals(dispRankFromDB)) {
					errorMsg += "표출순위가 있습니다.";
					result.put("error",errorMsg);
					return result;
				}
			}
		}
		return null;
	}
	
	
	/**
	 * 수정 페이지에서 "항목 상세 설정"의  수정 버튼을 눌렀을 때 보내는 데이터를 실제로 적용하는 메소드
	 * @param 	paramMap
	 * @return  HashMap
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	@ResponseBody
	@RequestMapping(value = "/ststistics/registeredStblList.do", method=RequestMethod.POST)
	@Transactional
	public HashMap<String, Object> registeredStblList(@RequestParam HashMap<String, Object> paramMap) 
			throws IOException 	{
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<HashMap<String, Object>> resultList = dao.select("ststisticsUsTotalSurvey.selectRegisteredStblList", paramMap);
		result.put("resultList", resultList);
		
		result.put("success", "Y");
		return result;
	}
	
	/**
	 * 2021-12-16 lyh
	 * 총조사시각화 통계표 관리자 - 검색
	 * @param 	paramMap
	 * @return  HashMap
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	@ResponseBody
	@RequestMapping(value = "/ststistics/selectStstisticsUSTotalStblList.do", method=RequestMethod.POST)
	@Transactional
	public HashMap<String, Object> selectStstisticsUSTotalStblList(@RequestParam HashMap<String, Object> paramMap) 
			throws IOException 	{
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<HashMap<String, Object>> resultList = dao.select("ststisticsUsTotalSurvey.selectStstisticsUSTotalStblList", paramMap);
		result.put("resultList", resultList);
		
		result.put("success", "Y");
		return result;
	}
	
	/**
	 * 2021-12-16 lyh
	 * 총조사시각화 통계표 관리자 - 통계 분류
	 * @param 	paramMap
	 * @return  HashMap
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	@ResponseBody
	@RequestMapping(value = "/ststistics/selectStattbDiv.do", method=RequestMethod.POST)
	@Transactional
	public HashMap<String, Object> selectStattbDiv(@RequestParam HashMap<String, Object> paramMap) 
			throws IOException 	{
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<HashMap<String, Object>> resultList = dao.select("ststisticsUsTotalSurvey.selectStattbDiv", paramMap);
		result.put("resultList", resultList);
		
		result.put("success", "Y");
		return result;
	}
	
	/**
	 * 2021-12-16 lyh
	 * 총조사시각화 통계표 관리자 상세 - 통계 분류 상
	 * @param 	paramMap
	 * @return  HashMap
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	@ResponseBody
	@RequestMapping(value = "/ststistics/selectItmBClass.do", method=RequestMethod.POST)
	@Transactional
	public HashMap<String, Object> selectItmBClass(@RequestParam HashMap<String, Object> paramMap) 
			throws IOException 	{
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<HashMap<String, Object>> resultList = dao.select("ststisticsUsTotalSurvey.selectItmBClass", paramMap);
		result.put("resultList", resultList);
		
		result.put("success", "Y");
		return result;
	}
	
	/**
	 * 2021-12-16 lyh
	 * 총조사시각화 통계표 관리자 상세 - 통계 분류 중
	 * @param 	paramMap
	 * @return  HashMap
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	@ResponseBody
	@RequestMapping(value = "/ststistics/selectItmMClass.do", method=RequestMethod.POST)
	@Transactional
	public HashMap<String, Object> selectItmMClass(@RequestParam HashMap<String, Object> paramMap) 
			throws IOException 	{
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<HashMap<String, Object>> resultList = dao.select("ststisticsUsTotalSurvey.selectItmMClass", paramMap);
		result.put("resultList", resultList);
		
		result.put("success", "Y");
		return result;
	}
	
	/**
	 * 총조사시각화 통계표 관리자 상세 - 통계 분류 하
	 * @param 	paramMap
	 * @return  HashMap
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	@ResponseBody
	@RequestMapping(value = "/ststistics/selectItmSClass.do", method=RequestMethod.POST)
	@Transactional
	public HashMap<String, Object> selectItmSClass(@RequestParam HashMap<String, Object> paramMap) 
			throws IOException 	{
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<HashMap<String, Object>> resultList = dao.select("ststisticsUsTotalSurvey.selectItmSClass", paramMap);
		result.put("resultList", resultList);
		
		result.put("success", "Y");
		return result;
	}
	
	/**
	 * 총조사시각화 통계표 차트 시퀀스 가져오기
	 * @param 	paramMap
	 * @return  HashMap
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	@ResponseBody
	@RequestMapping(value = "/ststistics/getStblInfo.do", method=RequestMethod.POST)
	@Transactional
	public HashMap<String, Object> getStblChartOrd(@RequestParam HashMap<String, Object> paramMap) 
			throws IOException 	{
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<HashMap<String, Object>> resultList = dao.select("ststisticsUsTotalSurvey.selectStblInfo", paramMap);
		result.put("resultList", resultList);
		
		result.put("success", "Y");
		return result;
	}
	
	/**
	 * 총조사시각화 통계표 차트 시퀀스 가져오기
	 * @param 	paramMap
	 * @return  HashMap
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	@ResponseBody
	@RequestMapping(value = "/ststistics/insertStstisticsUSTotalStblDetailList.do", method=RequestMethod.POST)
	@Transactional
	public HashMap<String, Object> insertStstisticsUSTotalStblDetailList(@RequestBody List<HashMap<String, Object>> paramMapList) 
			throws IOException {
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<HashMap<String, Object>> resultList = new ArrayList<HashMap<String, Object>>();
		dao.register("ststisticsUsTotalSurvey.insertStstisticsUSTotalStblChartItmSetup", paramMapList.get(0));
		
		int resultCnt = 0;
		for(int i=0; i<paramMapList.size(); i++) {
			 dao.register("ststisticsUsTotalSurvey.insertStstisticsUSTotalStblChartDetItmSetup", paramMapList.get(i));
			 resultCnt++;
		}
		
		if(resultCnt > 0) {
			HashMap<String, Object> complete = new HashMap<String, Object>();
			complete.put("result", "success");
			resultList.add(complete);
		}
		result.put("resultList", resultList);
		
		result.put("success", "Y");
		return result;
	}
	
	/**
	 * 총조사시각화 통계표 레이아웃 -> 경제총조사
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping(value="/ststistics/ststisticsStblDashBoardMng.do")
	public String ststisticsStblDashBoardMng(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws IOException {
		return "ststistics/layout/ststisticsStblDashBoardMng";
	}
	
	/**
	 * Cross Domain 해결을 위한 proxy
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping(value="/api/proxy.do")
	public void proxy(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws IOException {
		String[] allowedHosts = {
		//local
				request.getServerName()+":"+request.getServerPort(), 
				"kosis.kr",
				"sgisapi.kostat.go.kr",
				"sgissmart.kro.kr",
				"link.kostat.go.kr",
				"localhost",
				"lbdms.bplace.kr:9093"
		};
		HttpURLConnection con = null;
		try {
			String reqUrl = request.getQueryString();
			String decodedUrl = "";
			if (reqUrl != null) {

			} else {
				response.setStatus(400);
			}
			reqUrl = reqUrl.replaceAll(" ", "%20");
			
			String host = "";
			host = reqUrl.split("\\/")[2];
			boolean allowed = false;
			
			for (String surl : allowedHosts) {
				if (host.equalsIgnoreCase(surl)) {
					allowed = true;
					break;
				}
			}
			
			if(allowed) {
				String[] subUrl = reqUrl.split("\\/");
				String modifyUrl = subUrl[0] + "/" + subUrl[1] + "/" + subUrl[2];
				
				for(int i=0; i<subUrl.length; i++){
					if(i>2){
						modifyUrl = modifyUrl + "/" + URLEncoder.encode(subUrl[i], "UTF-8");
					}
				}
				
				URL url = new URL(reqUrl);

				con = (HttpURLConnection)url.openConnection();
				con.setDoOutput(true);
				con.setRequestMethod(request.getMethod());
				con.setConnectTimeout(10000);
				con.setReadTimeout(10000);
				String reqContenType = request.getContentType();
				con.setRequestProperty("Content-Type", "application/json");
								
				int clength = request.getContentLength();
				if(clength > 0) {
					con.setDoInput(true);
					byte[] idata = new byte[clength];
					request.getInputStream().read(idata, 0, clength);
					con.getOutputStream().write(idata, 0, clength);
				}

				response.setContentType(con.getContentType());
				//response.setContentType("application/json");				
				BufferedInputStream bis = new BufferedInputStream(con.getInputStream());
				int bytesRead;
				byte[] buffer = new byte[256];
				
				while((bytesRead = bis.read(buffer)) > 0){
					response.getOutputStream().write(buffer, 0, bytesRead);
				}
				response.getOutputStream().flush();
				bis.close();
			}
			else {
				response.setStatus(502);
			}
		} catch(Exception e) {
			System.out.println(response);
			response.setStatus(500);
			byte[] idata = new byte[5000];
			
			if(con.getErrorStream() != null) {
				con.getErrorStream().read(idata, 0, 5000);
			}
		}
	}
}
