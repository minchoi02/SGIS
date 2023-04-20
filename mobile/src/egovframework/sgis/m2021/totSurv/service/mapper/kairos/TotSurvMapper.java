package egovframework.sgis.m2021.totSurv.service.mapper.kairos;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("totSurvMapper")
public interface TotSurvMapper {
	List<String> selectSggListJsonList(
		@Param("base_year")String base_year, 
		@Param("sido_cd")String sido_cd 
	);
}
