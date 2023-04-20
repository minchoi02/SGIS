package egovframework.sgis.m2019.workroad.service.mapper.kairos;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("todayStatusMapper")
public interface TodayStatusMapper {
	
	//오늘의 전체 일자리현황 팝업 조회
	List<Map<String, Object>> todayAllJobStatusPopupSelect(Map<String, Object> params);
	
	// 오늘의 구인현황 최신등록일 조회
	String selectTodayStatusLastDate(Map<String, Object> params);
	
	// 오늘의 구인현황 기준년도 조회
	String selectTodayStatusBaseYear(Map<String, Object> params);
	
	// 오늘의 구인현황 조회
	List<Map<String, Object>> selectTodayStatus(Map<String, Object> params);
	
	// 오늘의 구인현황 상세내역 조회
	List<Map<String, Object>> selectTodayStatusDetail(Map<String, Object> params);
	
	// 오늘의 구인현황 기간범위 조회
	Map<String, Object> selectDateRangeInfo(Map<String, Object> params);
	
	// 오늘의 구인현황 기간별 상세내역 조회
	List<Map<String, Object>> selectDateStatus(Map<String, Object> params);
	
	/** 2020.09.16[한광희] 메인화면 조회 속도 향상 수정 START */
	// 메인 오늘의 전체 일자리현황 조회
	List<Map<String, Object>> mainTodayAllJobStatusSelect(Map<String, Object> params);
	/** 2020.09.16[한광희] 메인화면 조회 속도 향상 수정 END */
}
