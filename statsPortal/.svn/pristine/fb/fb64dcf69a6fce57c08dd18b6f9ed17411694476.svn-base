package kostat.sop.ServiceAPI.controller.service.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository("workRoadViewJobsMapper")
public class WorkRoadViewJobsMapper extends EgovAbstractMapper {

	/**
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map<String, Object> selectJobInfoDetail(Map<String, Object> mapParameter){
		return selectOne("wrViewJobs.selectJobInfoDetail", mapParameter);
	}
	/**
	 * 2018.10.17	ywKim	사용정지 : selectJobStatData 에 통합 
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectFirstCollegeGraduateJobStat(Map<String, Object> mapParameter){
		return selectList("wrViewJobs.selectFirstCollegeGraduateJobStat", mapParameter);
	}
	/**
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectJobStatData(Map<String, Object> mapParameter){
		return selectList("wrViewJobs.selectJobStatData", mapParameter);
	}
	/**
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public String selectToday(Map<String, Object> mapParameter){
		return (String)selectOne("wrViewJobs.getLatestRegDate", mapParameter);
	}
	/**
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public String jo_auth_no_exists(Map<String, Object> mapParameter){
		return (String)selectOne("wrViewJobs.jo_auth_no_exists", mapParameter);
	}
	/** 2019.12.03[한광희] 일자리 맵 서비스 통계 데이터 base_year 조회 및 변경 START */
	/**
	 * 
	 * @param mapParameter
	 * @exception Exception
	 */
	public String selectJobStatDataBaseYear(Map<String, Object> mapParameter) {
		return selectOne("wrViewJobs.selectJobStatDataBaseYear", mapParameter);
	}
	/** 2019.12.03[한광희] 일자리 맵 서비스 통계 데이터 base_year 조회 및 변경 END */
	
	/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 START */
	/**
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectJobStatDataCommonCd(Map<String, Object> mapParameter) {
		return selectList("wrViewJobs.selectJobStatDataCommonCd", mapParameter);
	}
	/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 END */
}