package kostat.sop.ServiceAPI.controller.service.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.controller.service.WorkRoadViewJobsService;
import kostat.sop.ServiceAPI.controller.service.mapper.WorkRoadViewJobsMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;


@Service("workRoadViewJobsService")
public class WorkRoadViewJobsServiceImpl extends EgovAbstractServiceImpl implements WorkRoadViewJobsService {

	private static final Logger logger = LoggerFactory.getLogger(WorkRoadViewJobsServiceImpl.class);
	
	@Resource(name="workRoadViewJobsMapper")
	private WorkRoadViewJobsMapper workRoadViewJobsMapper;
	
	@Override
	public Map<String, Object> selectJobInfoDetail(Map<String, Object> mapParameter) throws SQLException {
		return workRoadViewJobsMapper.selectJobInfoDetail(mapParameter);
	}
	/*
	 * 2018.10.17	ywKim	사용정지 : selectJobStatData 에 통합
	 */
	@Override
	public List selectFirstCollegeGraduateJobStat(Map<String, Object> mapParameter) throws SQLException {
		return workRoadViewJobsMapper.selectFirstCollegeGraduateJobStat(mapParameter);
	}
	@Override
	public List selectJobStatData(Map<String, Object> mapParameter) throws SQLException {
		return workRoadViewJobsMapper.selectJobStatData(mapParameter);
	}
	@Override
	public String selectToday(Map<String, Object> mapParameter) throws SQLException {
		return (String)workRoadViewJobsMapper.selectToday(mapParameter);
	}
	@Override
	public String jo_auth_no_exists(Map<String, Object> mapParameter) throws SQLException {
		return (String)workRoadViewJobsMapper.jo_auth_no_exists(mapParameter);
	}
	
	/** 2019.12.03[한광희] 일자리 맵 서비스 통계 데이터 base_year 조회 및 변경 START */
	public String selectJobStatDataBaseYear(Map<String, Object> mapParameter) throws SQLException {
		return workRoadViewJobsMapper.selectJobStatDataBaseYear(mapParameter);
	}
	/** 2019.12.03[한광희] 일자리 맵 서비스 통계 데이터 base_year 조회 및 변경 END */
	
	/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 START */
	public List selectJobStatDataCommonCd(Map<String, Object> mapParameter) throws SQLException {
		return workRoadViewJobsMapper.selectJobStatDataCommonCd(mapParameter);
	}
	/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 END */
}