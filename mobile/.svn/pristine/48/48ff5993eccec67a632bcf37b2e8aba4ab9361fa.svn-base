package egovframework.sgis.map.service.mapper.kairos;

import java.util.HashMap;
import java.util.List;
import java.util.Map;	// 2020.09.15[한광희] 코로나19 추가

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Mapper("thematicMapper")
public interface ThematicMapper {
	//List<EgovMap> selectThematicList(String thema_map_category);
	List<EgovMap> selectThematicList(HashMap thema_map_category);
	EgovMap selectThematicInfo(String stat_thema_map_id);
	List<String> selectThemaMapBaseYearType04(String thema_map_data_id);
	List<String> selectThemaMapBaseYearType05(String thema_map_data_id);
	
	/** 2020.09.15[한광희] 코로나19 추가 START */
	// 코로나19 정보 조회
	EgovMap selectThematicInfoCovid19(String stat_thema_map_id);
	// 코로나19 기준연도 조회 
	List<String> selectThemaMapBaseMonthYear05Covid19(String thema_map_data_id);
	// 코로나19 기준월 조회
	List<String> selectThemaMapBaseMonthType05Covid19(String base_year);
	// 코로나19 기준일 조회
	List<String> selectThemaMapBaseDayType05Covid19(String base_year_month);
	// 코로나19 맵정보 조회
	List<Map<String, Object>> selectCovid19ThematicMapData(Map<String, Object> params);
	// 코로나19 예방접종 정보 조회
	EgovMap selectThematicInfoCovid19Vacc(String stat_thema_map_id);
	// 코로나19 예방접종 기준연도 조회 
	List<String> selectThemaMapBaseMonthYear05Covid19Vacc(String thema_map_data_id);
	// 코로나19 예방접종 기준월 조회
	List<String> selectThemaMapBaseMonthType05Covid19Vacc(String base_year);
	// 코로나19 예방접종 기준일 조회
	List<String> selectThemaMapBaseDayType05Covid19Vacc(String base_year_month);
	// 코로나19 예방접종 맵정보 조회
	List<Map<String, Object>> selectCovid19VaccThematicMapData(Map<String, Object> params);
	// 개인카드 기준연도 조회 
	List<String> selectThemaMapBaseMonthYear05CreditCard(String thema_map_data_id);
	// 개인카드 기준월 조회
	List<String> selectThemaMapBaseMonthType05CreditCard(String base_year);
	
	// 코로나19 현황판 조회
	List<String> selectCovid19Stats();
	/** 2020.09.15[한광희] 코로나19 추가 END */
	// 코로나19 예방접종 현황판 조회
	List<String> selectCovid19VaccStats();
}
