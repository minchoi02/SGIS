package kostat.sop.ServiceAPI.api.dt.srvAreaManager.web;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.api.common.StstisticsUtils;
import kostat.sop.ServiceAPI.api.dt.ststistics.mapper.StstisticsCommonDao;

@Controller
public class SrvAreaFacilityTypeMngController {
	
	@Resource
	private StstisticsCommonDao dao;
	

	@RequestMapping(value = "/srvAreaMng/srvAreaFacilityTypeMng.do")
	public ModelAndView pageCall(@RequestParam HashMap<String, Object> paramMap) {
		HashMap<String, Object> paramInfo = new HashMap<String, Object>();
		paramInfo.put("data", dao.select("srvAreaMng.getSrvareaFactypeLclasList", paramMap));
		paramInfo.put("dflt", dao.select("srvAreaMng.getStatDfltList", paramMap));
		paramInfo.put("corpType01", dao.select("srvAreaMng.getCorpType01", paramMap));
		return new ModelAndView("srvAreaMng/srvAreaFacilityTypeMng", "paramInfo", paramInfo);
	}
	
	/**
	 * @comment	생활권역 통계지도 시설유형 목록을 조회 합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/getSrvAreaFacilityTypeList.do")
	public HashMap<String, Object> getSrvAreaFacilityTypeList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("rows", dao.select("srvAreaMng.getSrvAreaFacilityTypeList",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment	생활권역 통계지도 시설 상세정보를 조회합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/getSrvAreaFacilityTypeDetailData.do")
	public HashMap<String, Object> getSrvAreaFacilityTypeDetailData(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("data", dao.select("srvAreaMng.getSrvAreaFacilityTypeDetailData",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment	생활권역 통계지도 시설을 저장합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/updataFactypeList.do")
	public HashMap<String, Object> updataFactypeList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap = StstisticsUtils.addSessionMap(paramMap);
		
		if(dao.selectInt("srvAreaMng.getfactypeCdExists", paramMap) == 0) {
			int result = dao.register("srvAreaMng.insertSrvAreaFacilityTypeMng", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
			
			String factypeCd = dao.selectString("srvAreaMng.getfactypeCd" ,paramMap);
			//default 값 넣어주기! T1, T2, T3, T4, D1, D2, D3, R1, R2, R3
			for(int t=0; t<4; t++) {
				HashMap<String, Object> tt = new HashMap<String, Object>();
				tt.put("factypeCd", factypeCd);
				tt.put("scopeCd", "T0"+(t+1));
				tt.put("scopeType", "01");
				tt.put("dfltSlctnYn", "Y");
				tt.put("orderNo", (t+1));
				tt.put("useYn", "Y");
				dao.register("srvAreaMng.defaultScopeMappingMng", tt);
			}
			
			for(int d=0; d<3; d++) {
				HashMap<String, Object> dd = new HashMap<String, Object>();
				dd.put("factypeCd", factypeCd);
				dd.put("scopeCd", "D0"+(d+1));
				dd.put("scopeType", "02");
				dd.put("dfltSlctnYn", "Y");
				dd.put("orderNo", (d+1));
				dd.put("useYn", "Y");
				dao.register("srvAreaMng.defaultScopeMappingMng", dd);
			}
			
			for(int r=0; r<3; r++) {
				HashMap<String, Object> rr = new HashMap<String, Object>();
				rr.put("factypeCd", factypeCd);
				rr.put("scopeCd", "R0"+(r+1));
				rr.put("scopeType", "03");
				rr.put("dfltSlctnYn", "Y");
				rr.put("orderNo", (r+1));
				rr.put("useYn", "Y");
				dao.register("srvAreaMng.defaultScopeMappingMng", rr);
			}
		}else {
			int result = dao.edit("srvAreaMng.editSrvAreaFacilityTypeMng", paramMap);
			paramMap.put("code", result < 1 ? -1 : 0);
		}

		return paramMap;
	}
	
	/**
	 * @comment	생활권역 통계지도 연결 팝업 산업분류(분류2) 검색조건 조회
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/getCorpListData01.do")
	public HashMap<String, Object> getCorpListData01(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("data", dao.select("srvAreaMng.getCorpType02",paramMap));
		
		return paramMap;
	}
	/**
	 * @comment	생활권역 통계지도 연결 팝업 산업분류(분류3) 검색조건 조회
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/getCorpListData02.do")
	public HashMap<String, Object> getCorpListData02(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("data", dao.select("srvAreaMng.getCorpType03",paramMap));
		
		return paramMap;
	}
	/**
	 * @comment	생활권역 통계지도 연결 팝업 산업분류(분류4) 검색조건 조회
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/getCorpListData03.do")
	public HashMap<String, Object> getCorpListData03(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("data", dao.select("srvAreaMng.getCorpType04",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment 생활권역 통계지도 연결 팝업(업종) 시설유형을 조회합니다
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/getPopupFactypeLclasList.do")
	public HashMap<String, Object> getPopupFactypeLclasList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("rows", dao.select("srvAreaMng.getSrvareaFactypeLclasList",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment 생활권역 통계지도 연결 팝업(POI) 시설유형을 조회합니다
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/getPopupFacilityList.do")
	public HashMap<String, Object> getPopupFacilityList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("rows", dao.select("srvAreaMng.getPopupFacilityTypeList",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment 생활권역 통계지도 연결 팝업(업종) 산업분류을 조회합니다
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/getPopupUpperCorpList.do")
	public HashMap<String, Object> getPopupUpperCorpList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("rows", dao.select("srvAreaMng.getPopupUpperCorpList",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment 생활권역 통계지도 연결 팝업(업종) 시설유형과 산업분류 매핑된 정보를 조회합니다
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/getPopupUpperCorpMappingList.do")
	public HashMap<String, Object> getPopupUpperCorpMappingList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("rows", dao.select("srvAreaMng.getPopupUpperCorpMappingList",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment 생활권역 통계지도 연결 팝업(POI) 산업분류을 조회합니다
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/getPopupFacilityCorpList.do")
	public HashMap<String, Object> getPopupFacilityCorpList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("rows", dao.select("srvAreaMng.getPopupFacilityCorpList",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment 생활권역 통계지도 연결 팝업(POI)  시설유형과 산업분류 매핑된 정보를 조회합니다
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/getPopupFacilityPoiMappingList.do")
	public HashMap<String, Object> getPopupFacilityPoiMappingList(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("rows", dao.select("srvAreaMng.getPopupFacilityPoiMappingList",paramMap));
		
		return paramMap;
	}
	
	/**
	 * @comment 생활권역 통계지도 업종연결 매핑 정보를 등록합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/addCorpMappingData.do")
	public HashMap<String, Object> addCorpMappingData(@RequestParam String factype,
			 @RequestParam String corp) throws JsonParseException, JsonMappingException, IOException 	{

		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("factypeCd", factype);
		
		int result01 = dao.remove("srvAreaMng.removeCorpMapping", resultMap);
		resultMap.put("code01" , result01 < 1 ? -1 : 0);
		
		corp = corp.replaceAll("&quot;", "\"");
		ObjectMapper mapper = new ObjectMapper();
		List<HashMap<String, Object>> corpDataList = mapper.readValue(corp, new TypeReference<ArrayList<HashMap<String, Object>>>(){});
		int result02 = 0;
		for(HashMap<String, Object> corpMap : corpDataList) {
			corpMap = StstisticsUtils.addSessionMap(corpMap);
			corpMap.put("factypeCd", factype);
			corpMap.put("classDeg", 10);
			result02  = dao.register("srvAreaMng.registerCorpMappingMng", corpMap);
			resultMap.put("code02", result02 < 1 ? -1 : 0);
		}
		
		return resultMap;
	}
	
	/**
	 * @comment 생활권역 통계지도 업종연결 매핑 정보를 등록합니다.
	 * @param 	paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/srvAreaMng/addPoiMappingData.do")
	public HashMap<String, Object> addPoiMappingData(@RequestParam String factype,
			 @RequestParam String poi) throws JsonParseException, JsonMappingException, IOException 	{

		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("factypeCd", factype);

		int result01 = dao.remove("srvAreaMng.removePoiMapping", resultMap);
		resultMap.put("code01" , result01 < 1 ? -1 : 0);
		
		poi = poi.replaceAll("&quot;", "\"");

		ObjectMapper mapper = new ObjectMapper();
		List<HashMap<String, Object>> poiDataList = mapper.readValue(poi, new TypeReference<ArrayList<HashMap<String, Object>>>(){});
		int result02 = 0;
		for(HashMap<String, Object> poiMap : poiDataList) {
			poiMap = StstisticsUtils.addSessionMap(poiMap);
			poiMap.put("factypeCd", factype);
			poiMap.put("classDeg", 10);

			result02  = dao.register("srvAreaMng.registerPoiMappingMng", poiMap);
			resultMap.put("code02", result02 < 1 ? -1 : 0);
		}
		
		return resultMap;
	}
}
 