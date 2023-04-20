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
import kostat.sop.ServiceAPI.controller.service.UrbanService;
import kostat.sop.ServiceAPI.controller.service.mapper.UrbanMapper;

@Service("urbanService")
public class UrbanServiceImpl extends EgovAbstractServiceImpl implements UrbanService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UrbanServiceImpl.class);

	@Resource(name="urbanMapper")
	private UrbanMapper urbanMapper;
	
	/**
	 * 테스트 정보 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List selectTestInfo(Map mapParameter) throws SQLException {
		return urbanMapper.selectTestInfo(mapParameter);
	}

}
