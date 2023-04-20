package egovframework.sgis.m2020.main.service.mapper.kairos;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("mainMapper")
public interface MainMapper {
	// 메인화면 공지사항 조회
	List<Map<String, Object>> selectMainBoardList(Map<String, Object> params);
	
	// 메인화면 통계주제도 조회
	List<Map<String, Object>> selectMainThematicList(Map<String, Object> params);
	
	// 메인화면 생활환경종합 조회
	List<Map<String, Object>> selectMainLivingEnvironment(Map<String, Object> params);
}
