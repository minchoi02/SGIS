package kostat.sop.ServiceAPI.api.dt.ststistics.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kostat.sop.ServiceAPI.api.dt.ststistics.mapper.StstisticsCommonDao;
import kostat.sop.ServiceAPI.batch.run.LanguageAnalysisMgr;

/**
 * @author 	SangeonPark
 * @date	2020-09-14
 * @comment	유의어 기반 메인키워드 등록
 */
@Controller
public class StstisticsUSSynonymBasedMainKeywordMng {

	@Resource
	private StstisticsCommonDao dao;
	
	/**
	 * 페이지 호출
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSSynonymBasedMainKeywordMng.do")
	public String pageCall(ModelMap map) {
		List<HashMap<String, Object>> list = dao.select("ststisticsUsSynonym.getStstisticsUsGroupNm",null);
		map.addAttribute("BClassNms", list);
		return "ststistics/ststisticsUSSynonymBasedMainKeywordMng";
	}
	
	/**
	 * 대표 키워드 검색 결과를 반환
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSDelegatedKwrds.do")
	public HashMap<String, Object> getStstisticsUSDelegatedKwrds(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("rows", dao.select("ststisticsUsSynonym.getDelegatedKwrds",paramMap));
		return paramMap;
	}
	
	/**
	 * 대표키워드 명으로부터 뽑아낸 명사 목록을 반환
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSNouns.do")
	public HashMap<String, Object> getStstisticsUSNouns(@RequestParam HashMap<String, Object> paramMap) 	{
	
		
		if(null == paramMap.get("mainKwrd") || ((String)paramMap.get("mainKwrd")).equals("")) {
			HashMap<String,Object> result = new HashMap<>();
			result.put("rows", new ArrayList<>());// 빈 List반환
			return result;
		}
		
		List<HashMap<String, String>> list = LanguageAnalysisMgr.analyzeLanguage((String)paramMap.get("mainKwrd"));
		paramMap.put("rows", list);
		
		return paramMap;
	}
	
	
	/**
	 * 특정 명사에 대한 유의어들을 반환
	 * @param 	paramMap
	 * @return  HashMap
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSSynonyms.do")
	public HashMap<String, Object> getStstisticsUSSynonyms(@RequestParam HashMap<String, Object> paramMap) 	{
		
		String pKwrd = (String)paramMap.get("pKwrd");
		String pScd = (String)paramMap.get("pScd");
		
		if( null == pKwrd || null == pScd || "".equals(pKwrd) || "".equals(pScd) ) {
			HashMap<String,Object> result = new HashMap<>();
			result.put("rows", new ArrayList<>());// 빈 List반환
			return result;
		}
		
		List<HashMap<String, String>> list = LanguageAnalysisMgr.collectSynonym(pKwrd,pScd);
		paramMap.put("rows", list);
		
		return paramMap;
	}
	
	
	/**
	 * 유의어를 SRV_DT_CTLG_MAIN_KWRD_LIST 테이블에 메인 키워드로 등록하고, 이 메인키워드를 SRV_DT_CTLG_DATA_LIST 테이블에 대표키워드와 매핑하여 등록하는 메소드
	 * @param 	paramMap
	 * @return  HashMap
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/insertStstisticsUSSynonyms.do", method=RequestMethod.POST)
	@Transactional
	public String insertStstisticsUSSynonyms(@RequestParam String statDataId,
											 @RequestParam String synonymArr) throws JsonParseException, JsonMappingException, IOException 	{
		
		synonymArr = synonymArr.replaceAll("&quot;", "\""); // HTMLTagFilterRequestWrapper 의 cleanXSS 때문에 어쩔 수 없이 다시 원래 모양대로 변경한다.
		ObjectMapper mapper = new ObjectMapper();			// JSON.stringify 메소드에 의해서 보내진 String을 Java에서 사용하는 Object로 변환하기 위한 객체를 생성한다.
		
		List<HashMap<String, Object>> synonymList 
					= mapper.readValue(synonymArr, new TypeReference<ArrayList<HashMap<String, Object>>>(){});
		
		
		
		// 1. DB에 입력하려는 메인키워드들(=synonyms)가 SRV_DT_CTLG_MAIN_KWRD_LIST (메인키워드 테이블) 에 이미 존재한다면 해당하는 값은 제외하고,
		// SRV_DT_CTLG_MAIN_KWRD_LIST 없는 메인키워드들만 넣는다.
		for(HashMap<String, Object> synMap : synonymList) {
			
			// 1-1. 중복 체크
			HashMap<String, Object> tempMap = dao.selectMap("ststisticsUsSynonym.mainKwrdDuplicateCk", synMap);
			if(null == tempMap) {
				// 1-1-1.중복이 아니면 insert
				dao.register("ststisticsUsSynonym.mainKwrdInsert", synMap);
			} else {
				// 1-1-2 중복이면 pk값을 읽어서 synMap에 넣어준다.
				synMap.put("serialNumber", tempMap.get("ctlgMainKwrdSerial"));
			}
			
			synMap.put("statDataId", statDataId);
			
			// 1-2. SRV_DT_CTLG_MAIN_KWRD_DATA 테이블 에도 중복값이 있는지 체크, 중복되는 매핑 데이터가 있다면 패스한다.
			if( dao.selectInt("ststisticsUsSynonym.mappingDataDuplicateCk",synMap) > 0) {
				continue;
			};
			
			
			// 1-3. SRV_DT_CTLG_MAIN_KWRD_DATA에 중복되는 매핑 정보가 아니면 insert 한다.
			dao.register("ststisticsUsSynonym.mappingDataInsert", synMap);
			
		}
		
		return "Success";
	}
	
	
}
