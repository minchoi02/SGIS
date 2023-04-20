package kostat.sop.ServiceAPI.controller.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface WorkRoadViewJobsService {
	public Map<String, Object> selectJobInfoDetail(Map<String, Object> mapParameter) throws SQLException;
	/*
	 * 2018.10.17	ywKim	사용정지 : selectJobStatData 에 통합
	 */
	public List selectFirstCollegeGraduateJobStat(Map<String, Object> mapParameter) throws SQLException;
	
	public List selectJobStatData(Map<String, Object> mapParameter) throws SQLException;
	
	public String selectToday(Map<String, Object> mapParameter) throws SQLException;
	
	/* 임시 */
	public String jo_auth_no_exists(Map<String, Object> mapParameter) throws SQLException;
	
	/** 2019.12.03[한광희] 일자리 맵 서비스 통계 데이터 base_year 조회 및 변경 START */
	public String selectJobStatDataBaseYear(Map<String, Object> mapParameter) throws SQLException;
	/** 2019.12.03[한광희] 일자리 맵 서비스 통계 데이터 base_year 조회 및 변경 END */
	
	/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 START */
	public List selectJobStatDataCommonCd(Map<String, Object> mapParameter) throws SQLException;
	/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 END */
}
