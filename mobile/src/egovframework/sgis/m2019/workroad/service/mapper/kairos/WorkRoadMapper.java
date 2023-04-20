package egovframework.sgis.m2019.workroad.service.mapper.kairos;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("workRoadMapper")
public interface WorkRoadMapper {
	//공통코드 조회
	List<Map<String, Object>> selectCmmCdComcd(Map<String, Object> params);
	
	//일자리맞춤형서비스정보 조회
	List<Map<String, Object>> selectSrvDtJobClmserInfo(Map<String, Object> params);
	
	//일자리맞춤형서비스정보 수정
	int updateSrvDtJobClmserInfo(Map<String, Object> params);
	
	//일자리맞춤형서비스정보 등록
	int insertSrvDtJobClmserInfo(Map<String, Object> params);
	
	// 시도코드 조회
	List<Map<String, Object>> selectSidoCd(Map<String, Object> params);
	
	// 시군구코드 조회
	List<Map<String, Object>> selectSggCd(Map<String, Object> params);
	
	// 지역정보 조회 (시군구/시도/읍면동)
	Map<String, Object> selectAdmInfo(Map<String, Object> params);
	
	// 일자리 맵 서비스 통계 데이터 조회 - 2018.10.17	ywKim	신규
	List<Map<String, Object>> selectJobStatData(Map<String, Object> params);

	// 2019.12.03[한광희] 일자리 맵 서비스 통계 데이터 base_year 조회
	String selectJobStatDataBaseYear(Map<String, Object> params);
	
	// 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경
	List<Map<String, Object>> selectJobStatDataCommonCd(Map<String, Object> params);
}
