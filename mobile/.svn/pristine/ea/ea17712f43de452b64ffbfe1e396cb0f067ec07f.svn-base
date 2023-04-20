package egovframework.sgis.m2020.thematic.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.sgis.cmmn.util.EgovStringUtil;
import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.cmmn.util.StringUtils;
import egovframework.sgis.m2020.thematic.service.thematicServiceNew;
import egovframework.sgis.map.service.mapper.kairos.ThematicMapper;

@Service("thematicServiceNew")
public class ThematicServiceImpl extends EgovAbstractServiceImpl implements thematicServiceNew{
	
	@Resource(name="thematicMapper")
	private ThematicMapper thematicMapper;
	
	@Override
	public String getThematicCategory(ModelMap model, String stat_thema_map_id, String ref_adm_id) {
		HashMap<String,Object> category = new HashMap<String,Object>(); 
		
		HashMap<String,Object> paramMap = new HashMap<String,Object>();
		paramMap.put("ref_adm_id", ref_adm_id);

		for(int i=1;i<=6;i++){
			paramMap.put("CTGR" , "CTGR_00"+i );
			category.put("CTGR_00"+i,thematicMapper.selectThematicList(paramMap));
		}
		model.addAttribute("category",category);
		return "m2020/map/thematic/thematicMap2";
	}


	@Override
	public JsonData selectThematicList(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			
			HashMap<String,Object> paramMap = new HashMap<String,Object>();
			
			System.out.println(params.toString());
			String cate_id = EgovStringUtil.isNullToString(params.get("cate_id"));
			String title = EgovStringUtil.isNullToString(params.get("title"));
			String sort_type = EgovStringUtil.isNullToString(params.get("sort_type"));
			// id 추가
			String id = EgovStringUtil.isNullToString(params.get("id"));
			String ref_adm_id = EgovStringUtil.isNullToString(params.get("ref_adm_id"));	// 현재위치 정보
			
			paramMap.put("CTGR", cate_id);
			paramMap.put("title", title);
			paramMap.put("sort_type", sort_type);
			paramMap.put("id", id);
			if(ref_adm_id != "" && !"".equals(ref_adm_id)) {
				paramMap.put("ref_adm_id", ref_adm_id);	// 현재위치 정보
			}
			
			/** 2020.09.16[한광희] 메인 조회시 limit 관련 변수 추가 START */
			String mainType = EgovStringUtil.isNullToString(params.get("mainType"));	// 현재위치 정보
			
			if(mainType != "" && !"".equals(mainType)) {
				paramMap.put("mainType", mainType);	// 현재위치 정보
			}
			/** 2020.09.16[한광희] 메인 조회시 limit 관련 변수 추가 END */
			
			//if(request.getAttribute("sort_type") == null) paramMap.put("sort_type", "favorite");

			List themeMapInfoList = thematicMapper.selectThematicList(paramMap);
			
			result.put("themeMapInfoList", themeMapInfoList);
			result.put("category",cate_id);
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			//logger.error(e);
			System.err.println(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}

	// 통계주제도 ID에 해당하는 맵정보 조회
	@Override
	public JsonData selectThematicMapData(HttpServletRequest request, HttpServletResponse response,	Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			
			String stat_thema_map_id = EgovStringUtil.isNullToString(params.get("stat_thema_map_id"));
			
			/** 2020.09.15[한광희] 코로나19 추가 START */
			EgovMap thematicInfo =  null;
			if("sAXkcVzk5V202007141335257355ued9032uw".equals(stat_thema_map_id)) {
				thematicInfo = thematicMapper.selectThematicInfoCovid19(stat_thema_map_id);
			}else if("kmOpHLH5cK202106100936161097g5G9nLCFE".equals(stat_thema_map_id)) {
					thematicInfo = thematicMapper.selectThematicInfoCovid19Vacc(stat_thema_map_id);
			} else {
				thematicInfo = thematicMapper.selectThematicInfo(stat_thema_map_id);
			}
			/** 2020.09.15[한광희] 코로나19 추가 END */
			if(thematicInfo !=null){
				if(thematicInfo.get("themaMapDataId")!=null){
					List<String> yearList = new ArrayList<String>();
					/** 2020.09.15[한광희] 코로나19 추가 START */
					List<String> monthList = new ArrayList<String>();
					List<String> dayList = new ArrayList<String>();
					/** 2020.09.15[한광희] 코로나19 추가 END */
					
					if("04".equals(thematicInfo.get("themaMapType"))){
						yearList = thematicMapper.selectThemaMapBaseYearType04(thematicInfo.get("themaMapDataId").toString());
					}

					// mng_s 2020. 12. 24 j.h.Seok 통계주제도 통합
					else if("05".equals(thematicInfo.get("themaMapType")) || "15".equals(thematicInfo.get("themaMapType"))){
//					else if("05".equals(thematicInfo.get("themaMapType"))){
					// mng_e 2020. 12. 24 j.h.Seok 통계주제도 통합
						/** 2020.09.15[한광희] 코로나19 추가 START */
						if("sAXkcVzk5V202007141335257355ued9032uw".equals(stat_thema_map_id)) {
							yearList = thematicMapper.selectThemaMapBaseMonthYear05Covid19(thematicInfo.get("themaMapDataId").toString());
							monthList = thematicMapper.selectThemaMapBaseMonthType05Covid19(thematicInfo.get("statDataBaseYear").toString());
							dayList = thematicMapper.selectThemaMapBaseDayType05Covid19(thematicInfo.get("statDataBaseYear").toString()+thematicInfo.get("statDataBaseMonth").toString());
							
							if(monthList!=null&&monthList.size()>0) {
								thematicInfo.put("monthList", monthList);
							}
							if(dayList!=null&&dayList.size()>0) {
								thematicInfo.put("dayList", dayList);
							}
						}else if("kmOpHLH5cK202106100936161097g5G9nLCFE".equals(stat_thema_map_id)) {
								yearList = thematicMapper.selectThemaMapBaseMonthYear05Covid19Vacc(thematicInfo.get("themaMapDataId").toString());
								monthList = thematicMapper.selectThemaMapBaseMonthType05Covid19Vacc(thematicInfo.get("statDataBaseYear").toString());
								dayList = thematicMapper.selectThemaMapBaseDayType05Covid19Vacc(thematicInfo.get("statDataBaseYear").toString()+thematicInfo.get("statDataBaseMonth").toString());
								
								if(monthList!=null&&monthList.size()>0) {
									thematicInfo.put("monthList", monthList);
								}
								if(dayList!=null&&dayList.size()>0) {
									thematicInfo.put("dayList", dayList);
								}
						}else if("onb6f4rRh320190902160751679iQUr3aVwTT".equals(stat_thema_map_id)) {
								yearList = thematicMapper.selectThemaMapBaseMonthYear05CreditCard(thematicInfo.get("themaMapDataId").toString());
								monthList = thematicMapper.selectThemaMapBaseMonthType05CreditCard(thematicInfo.get("statDataBaseYear").toString().substring(0,2));
								
								if(monthList!=null&&monthList.size()>0) {
									thematicInfo.put("monthList", monthList);
								}
						} else {
							yearList = thematicMapper.selectThemaMapBaseYearType05(thematicInfo.get("themaMapDataId").toString());							
						}
						/** 2020.09.15[한광희] 코로나19 추가 END */
					}
					if(yearList!=null&&yearList.size()>0){
						thematicInfo.put("yearList", yearList);
					}
				}
				result.put("themeMapInfoList", thematicInfo);
			}
			else {
				result.put("themeMapInfoList", "");
			}
			
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	/** 2020.09.15[한광희] 코로나19 추가 START */
	// 코로나19 맵정보 조회
	@Override
	public JsonData selectCovid19ThematicMapData(HttpServletRequest request, HttpServletResponse response,	Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			HashMap<String,Object> paramMap = new HashMap<String,Object>();
			Map<String,Object> mapParameter = params;
					
			String stat_data_base_year = (String) mapParameter.get("stat_data_base_year");
			String stat_data_base_month = (String) mapParameter.get("stat_data_base_month");
			String stat_data_base_day = (String) mapParameter.get("stat_data_base_day");
			paramMap.put("stat_data_base_year", stat_data_base_year);
			paramMap.put("stat_data_base_month", stat_data_base_month);
			paramMap.put("stat_data_base_day", stat_data_base_day);
			
			List<Map<String, Object>> detailInfo = thematicMapper.selectCovid19ThematicMapData(paramMap);
			
			result.put("detailInfo", detailInfo);
			
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	// 코로나19 예방접종 맵정보 조회
	@Override
	public JsonData selectCovid19VaccThematicMapData(HttpServletRequest request, HttpServletResponse response,	Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			HashMap<String,Object> paramMap = new HashMap<String,Object>();
			Map<String,Object> mapParameter = params;
			
			String stat_data_base_year = (String) mapParameter.get("stat_data_base_year");
			String stat_data_base_month = (String) mapParameter.get("stat_data_base_month");
			String stat_data_base_day = (String) mapParameter.get("stat_data_base_day");
			String covid_vacc_cd = (String) mapParameter.get("covid_vacc_cd");
			paramMap.put("stat_data_base_year", stat_data_base_year);
			paramMap.put("stat_data_base_month", stat_data_base_month);
			paramMap.put("stat_data_base_day", stat_data_base_day);
			paramMap.put("covid_vacc_cd", covid_vacc_cd);
			
			List<Map<String, Object>> detailInfo = thematicMapper.selectCovid19VaccThematicMapData(paramMap);
			
			result.put("detailInfo", detailInfo);
			
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	// 코로나19 일정보 조회
	@Override
	public JsonData selectCovid19DayData(HttpServletRequest request, HttpServletResponse response,	Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			Map<String,Object> mapParameter = params;
					
			String stat_data_base_year = (String) mapParameter.get("stat_data_base_year");
			String stat_data_base_month = (String) mapParameter.get("stat_data_base_month");
			
			List<String> dayList = thematicMapper.selectThemaMapBaseDayType05Covid19(stat_data_base_year+stat_data_base_month);
			
			result.put("dayList", dayList);
			
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	// 코로나19 예방접종 일정보 조회
	@Override
	public JsonData selectCovid19VaccDayData(HttpServletRequest request, HttpServletResponse response,	Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			Map<String,Object> mapParameter = params;
			
			String stat_data_base_year = (String) mapParameter.get("stat_data_base_year");
			String stat_data_base_month = (String) mapParameter.get("stat_data_base_month");
			
			List<String> dayList = thematicMapper.selectThemaMapBaseDayType05Covid19Vacc(stat_data_base_year+stat_data_base_month);
			
			result.put("dayList", dayList);
			
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	public JsonData selectCreditCardMonthData(HttpServletRequest request, HttpServletResponse response,	Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			Map<String,Object> mapParameter = params;
			
			String stat_data_base_year = (String) mapParameter.get("stat_data_base_year");
			
			List<String> monthList = thematicMapper.selectThemaMapBaseMonthType05CreditCard(stat_data_base_year);
			
			result.put("monthList", monthList);
			
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	// 코로나19 현황판 조회
	@Override
	public JsonData selectCovid19Stats(HttpServletRequest request, HttpServletResponse response,	Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			
			List<String> covid19Stats = thematicMapper.selectCovid19Stats();
			
			result.put("covid19Stats", covid19Stats);
			
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	/** 2020.09.15[한광희] 코로나19 추가 END */
	
	// 코로나19 예방접종 현황판 조회
	@Override
	public JsonData selectCovid19VaccStats(HttpServletRequest request, HttpServletResponse response,	Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			
			List<String> covid19VaccStats = thematicMapper.selectCovid19VaccStats();
			
			result.put("covid19VaccStats", covid19VaccStats);
			
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
}
