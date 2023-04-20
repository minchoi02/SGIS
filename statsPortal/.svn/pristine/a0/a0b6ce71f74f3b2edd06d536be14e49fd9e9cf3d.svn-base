package kostat.sop.ServiceAPI.controller.service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface CatchmentAreaService {

	/**
	 * 테스트 정보 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectTestInfo(Map mapParameter) throws SQLException;
	
	public List<HashMap<String,Object>> selectFacilityTypeList() throws SQLException;
	
	public List<HashMap<String, Object>> selectLargeClassList() throws SQLException;
	
	public List<HashMap<String, Object>> selectCensusGroupByLClass(Map paramMap) throws SQLException;
	
	public List<HashMap<String, Object>> selectKsicThirdCdAndNameGroupByKSIC2(Map paramMap) throws SQLException;
	
	public List<HashMap<String,Object>> selectGridLevelList() throws SQLException;
}
