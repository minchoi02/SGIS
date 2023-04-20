package egovframework.sgis.m2021.catchmentarea.service.impl;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.sgis.cmmn.util.StringUtils;
import egovframework.sgis.m2021.catchmentarea.service.catchmentareaService;
import egovframework.sgis.m2021.catchmentarea.service.mapper.kairos.catchmentareaMapper;

@Service("catchmentareaService")
public class catchmentareaServiceImpl extends EgovAbstractServiceImpl implements catchmentareaService{
	private final static Log logger = LogFactory.getLog(StringUtils.class);
	
	@Autowired
	private Environment env;
	
	@Resource(name="catchmentareaMapper")
	private catchmentareaMapper catchmentareaMapper;
	
	public List<HashMap<String,Object>> selectFacilityTypeList() throws SQLException {
		return catchmentareaMapper.selectFacilityTypeList();
	}
	
	

}
