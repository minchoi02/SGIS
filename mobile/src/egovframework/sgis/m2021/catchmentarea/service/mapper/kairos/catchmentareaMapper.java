package egovframework.sgis.m2021.catchmentarea.service.mapper.kairos;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("catchmentareaMapper")
public class catchmentareaMapper extends EgovAbstractMapper {
	public List<HashMap<String,Object>> selectFacilityTypeList() throws SQLException {
		return selectList("catchmentArea.selectFacilityTypeList");
	}}
