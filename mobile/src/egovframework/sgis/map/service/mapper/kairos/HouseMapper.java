package egovframework.sgis.map.service.mapper.kairos;

import java.util.HashMap;
import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("houseMapper")
public interface HouseMapper {
	public List<HashMap<String,Object>> selectHouseMlsfcLists();
	public List<HashMap<String,Object>> selectLclasSearchList();
	public List<HashMap<String,Object>> selectMclasSearchList();
	public List<HashMap<String,Object>> selectSclasSearchList();
	public List<HashMap<String,Object>> selectResIdLists();
	public List<HashMap<String,Object>> selectResIdCaseLists();
}
