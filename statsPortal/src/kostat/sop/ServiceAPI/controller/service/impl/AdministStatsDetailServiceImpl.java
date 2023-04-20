package kostat.sop.ServiceAPI.controller.service.impl;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import kostat.sop.ServiceAPI.controller.service.AdministStatsDetailService;
import kostat.sop.ServiceAPI.controller.service.mapper.AdministStatsDetailMapper;

@Service("administStatsDetailService")
public class AdministStatsDetailServiceImpl extends EgovAbstractServiceImpl implements AdministStatsDetailService {

	private static final Logger LOGGER = LoggerFactory.getLogger(AdministStatsDetailServiceImpl.class);
	
	@Resource(name="administStatsDetailMapper")
	private AdministStatsDetailMapper administStatsDetailMapper;
	
	@Override
	public List<EgovMap> getStatsItemList(HashMap<String, Object> params) throws SQLException {
		return administStatsDetailMapper.getStatsItemList(params);
	}

	@Override
	public List<EgovMap> getChartsInfo(HashMap<String, Object> params) {
		return administStatsDetailMapper.getChartsInfo(params);
	}

}
