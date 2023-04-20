package kostat.sop.ServiceAPI.api.dt.ststistics.web;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.api.dt.ststistics.mapper.StstisticsCommonDao;

@Controller
public class StstisticsUSAccessAreaMngController  {

	
	@Resource
	private StstisticsCommonDao dao;
	
	/**
	 * @comment	접속지역별 이용현황
	 * @param 	request
	 * @param 	response
	 * @return
	 */
	@RequestMapping(value = "/ststistics/ststisticsUSAccessAreaMng.do")
	public String pageCall(Model map) {
		map.addAttribute("sidoList", dao.select("ststisticsUSAccessAreaMng.getAccessAreaSidoCd",null));
		map.addAttribute("yearList", dao.select("ststisticsUSAccessAreaMng.getYearList",null));
		return "ststistics/ststisticsUSAccessAreaMng";
	}
	
	/**
	  * @Method Name : getSidoCd
	  * @작성일 : 2020. 4. 27.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : 시도 검색조건 조회
	*/
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getAccessAreaSidoCd.do")
	public HashMap<String, Object> getAccessAreaSidoCd(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("data", dao.select("ststisticsUSAccessAreaMng.getAccessAreaSidoCd",paramMap));
		return paramMap;
	}
	
	/**
	  * @Method Name : getSggCd
	  * @작성일 : 2020. 4. 27.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : 시군구 검색조건 조회
	*/
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getAccessAreaSggCd.do")
	public HashMap<String, Object> getAccessAreaSggCd(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("data", dao.select("ststisticsUSAccessAreaMng.getAccessAreaSggCd",paramMap));
		return paramMap;
	}
	
	
	/**
	  * @작성일 : 2020. 6. 03.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : (기간+행정구역)별 이용현황 
	*/
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsUSServiceUsedCntByAreaAndDate.do")
	public HashMap<String, Object> getStstisticsUSServiceUsedCntByAreaAndDate(@RequestParam HashMap<String, Object> paramMap) 	{
		inputDateArrayList(paramMap);
		paramMap.put("serviceUsedCnt", dao.select("ststisticsUSAccessAreaMng.getStstisticsUSServiceUsedCntByAreaAndDate", paramMap));
		return paramMap;
	}
	
	
	/**
	  * @작성일 : 2020. 6. 03.
	  * @작성자 : wavus
	  * @변경이력 : 
	  * @Method 설명 : (기간+행정구역)별 이용현황 
	*/
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/getStstisticsSubDatas.do")
	public HashMap<String, Object> getStstisticsSubDatas(@RequestParam HashMap<String, Object> paramMap) 	{
		paramMap.put("serviceRank", dao.select("ststisticsUSAccessAreaMng.getStstisticsSubServiceRank", paramMap));
		paramMap.put("kwrdUsedRank", dao.select("ststisticsUSAccessAreaMng.getStstisticsSubKwrdUsedRank", paramMap));
		paramMap.put("searchWrdUsedRank", dao.select("ststisticsUSAccessAreaMng.getStstisticsSubSearchWrdUsedRank", paramMap));
		return paramMap;
	}
	
	
	
	private void inputDateArrayList(HashMap<String, Object> paramMap) {
		
		String searchDate = (String)paramMap.get("searchDate");
		String searchDateType = (String)paramMap.get("searchDateType");
		
		if("".equals(searchDateType)) {
			throw new Error("No DateType");
		} else if(searchDateType.equals("yearType")) {
			return;
		}
		
		Date date_ = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String dt1 = df.format(date_);
		//LocalDateTime dt1 = LocalDateTime.now();
		int currentMonth = Integer.parseInt(dt1.toString().substring(5,7));
		ArrayList<Integer> dateList = new ArrayList<>();
		
		
		// 현재 년도라면
		if(searchDate.equals(dt1.toString().substring(0,4))) {
			
			if("quarterType".equals(searchDateType)) { // 현재 갖고 있는 분기까지
				int quarterCount = 0;
				quarterCount = (int)(Math.ceil(currentMonth/3.0));
				for(int i = 1 ; i <= quarterCount ; i++) {
					dateList.add(i);
				}
			} else if("monthType".equals(searchDateType)) { // 현재 갖고 있는 월까지
				for(int i = 1 ; i <= currentMonth ; i++) {
					dateList.add(i);
				}
			}
			
		} else { // 현재 년도가 아니라면
			
			if("quarterType".equals(searchDateType)) { 
				for(int i = 1 ; i <= 4 ; i++) {
					dateList.add(i);
				}
			} else if("monthType".equals(searchDateType)) {
				for(int i = 1 ; i <= 12 ; i++) {
					dateList.add(i);
				}
			}
		}
		
		paramMap.put("dateList", dateList);
	}
	
	@ResponseBody
	@RequestMapping(value = "/api/ststistics/accessAreaExcelDataDownLoad.do")
	public ModelAndView  statusExcelDataDownLoad(@RequestParam HashMap<String, Object> paramMap) throws JsonParseException, JsonMappingException, IOException 	{
		System.out.println(paramMap);
		ModelAndView mav = new ModelAndView("excelView");
	    Map<String, Object> dataMap = new HashMap<String, Object>();
	    String type = (String)paramMap.get("type");
	    String filename = "";
	    String[] columnArr = null;
	    String[] columnVarArr = null;
	    
	    List<HashMap<String, Object>> list = null;
	    
	    if(type.equals("accessArea")) {
			inputDateArrayList(paramMap);
			list = dao.select("ststisticsUSAccessAreaMng.getStstisticsUSServiceUsedCntByAreaAndDate", paramMap);
//	    	list = dao.select("ststisticsCmmn.getKwrdContentServiceExcelDownload",paramMap);
	    	
	    	filename = "접속지역별 이용현황 - "+paramMap.get("searchDateType")+"+"+paramMap.get("searchDate");
	    	columnArr = new String[]{"순번", "기간", "행정구역명", "서비스 조회수"};
			columnVarArr = new String[]{"rowNum", "date", "locationName", "count"};
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
