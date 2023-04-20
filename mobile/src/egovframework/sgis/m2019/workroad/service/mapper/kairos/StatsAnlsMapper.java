package egovframework.sgis.m2019.workroad.service.mapper.kairos;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("statsAnlsMapper")
public interface StatsAnlsMapper {
	// 업종선택
	List<Map<String, Object>> selectStatsAnalsTypeOfIndustry(Map<String, Object> params);
	
	// 업종선택(중분류)
	List<Map<String, Object>> selectStatsAnalsTypeOfIndustryMiddleClassification(Map<String, Object> params);
	
	// 사업체수&종사자수 조회
	List<Map<String, Object>> selectStatsAnalsMapDataCount(Map<String, Object> params);
		
	// 일자리 추이 조회
	List<Map<String, Object>> selectStatsAnalsJobTransition(Map<String, Object> params);
	
	// 일자리 만족도 조회
	List<Map<String, Object>> selectStatsAnalsJobSatisfactionDegree(Map<String, Object> params);
}
