package kostat.sop.ServiceAPI.controller.service.mapper;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository("catchmentAreaMapper")
public class CatchmentAreaMapper extends EgovAbstractMapper {

	/**
	 * 테스트 정보 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectTestInfo(Map mapParameter) throws SQLException {
		return selectList("catchmentArea.selectTestInfo", mapParameter);
	}
	
	public List<HashMap<String,Object>> selectFacilityTypeList() throws SQLException {
		return selectList("catchmentArea.selectFacilityTypeList");
	}
	
	public List<HashMap<String, Object>> selectLargeClassList() throws SQLException {
		return selectList("catchmentArea.selectLargeClassList");
	}
	
	public List<HashMap<String, Object>> selectCensusGroupByLClass(Map paramMap) throws SQLException {
		return selectList("catchmentArea.selectCensusGroupByLClass", paramMap);
	}
	
	public List<HashMap<String, Object>> selectKsicThirdCdAndNameGroupByKSIC2(Map paramMap) throws SQLException {
		return selectList("catchmentArea.selectKsicThirdCdAndNameGroupByKSIC2", paramMap);
	}
	
	public List<HashMap<String,Object>> selectGridLevelList() throws SQLException {
		return selectList("catchmentArea.selectGridLevelList");
	}
}
