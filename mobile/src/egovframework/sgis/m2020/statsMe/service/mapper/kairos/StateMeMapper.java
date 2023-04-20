package egovframework.sgis.m2020.statsMe.service.mapper.kairos;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("stateMeMapper")
public interface StateMeMapper {
	//공통코드 조회
	List<Map<String, Object>> selectCmmCdComcd(Map<String, Object> params);

	// 통계지리 정보 목록 조회
	List<Map<String, Object>> selectStatsGrphInfoList(Map<String, Object> params);
	
	// 통계지리 정보 관련 SGIS 서비스 목록 조회
	List<Map<String, Object>> selectStatsGrphInfoSgisSrvList(Map<String, Object> params);
	
	// 카탈로그 1,2차 키워드검색 목록 조회
	List<Map<String, Object>> selectCtlgKwrdList(Map<String, Object> params);
	
	// 검색화면 조회시 통계지리 정보 목록 조회
	List<Map<String, Object>> selectMainSearchStatsInfoList(Map<String, Object> params);
	
	// 메인화면 생애주기/관심분야 조회
	List<Map<String, Object>> selectMainStatsMeList(Map<String, Object> params);
	
	/** 2020.09.16[한광희] 통계지리목록 건수 추가 START */
	// 통계지리목록 건수 조회
	int selectStatsGrphInfoListCount(Map<String, Object> params);
	/** 2020.09.16[한광희] 통계지리목록 건수 추가 END */
}
