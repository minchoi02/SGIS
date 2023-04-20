package kostat.sop.ServiceAPI.controller.service.impl;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.controller.service.CatchmentAreaService;
import kostat.sop.ServiceAPI.controller.service.mapper.CatchmentAreaMapper;

@Service("catchmentAreaService")
public class CatchmentAreaServiceImpl extends EgovAbstractServiceImpl implements CatchmentAreaService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CatchmentAreaServiceImpl.class);

	@Resource(name="catchmentAreaMapper")
	private CatchmentAreaMapper catchmentAreaMapper;
	
	/**
	 * 테스트 정보 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectTestInfo(Map mapParameter) throws SQLException {
		return catchmentAreaMapper.selectTestInfo(mapParameter);
	}
	
	public List<HashMap<String,Object>> selectFacilityTypeList() throws SQLException {
		return catchmentAreaMapper.selectFacilityTypeList();
	}
	
	public List<HashMap<String, Object>> selectLargeClassList() throws SQLException {
		return catchmentAreaMapper.selectLargeClassList();
	}
	
	public List<HashMap<String, Object>> selectCensusGroupByLClass(Map paramMap) throws SQLException {
		return catchmentAreaMapper.selectCensusGroupByLClass(paramMap);
	}
	
	public List<HashMap<String, Object>> selectKsicThirdCdAndNameGroupByKSIC2(Map paramMap) throws SQLException {
		return catchmentAreaMapper.selectKsicThirdCdAndNameGroupByKSIC2(paramMap);
	}
	
	public List<HashMap<String,Object>> selectGridLevelList() throws SQLException {
		return catchmentAreaMapper.selectGridLevelList();
	}
}
