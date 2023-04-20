package egovframework.sgis.map.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface HouseService {
	public Map<String,Object> getMlsfcLists();
	public Map<String,Object> getIdealTypeLists();
	public List<HashMap<String,Object>> selectLifeStyleLists();
}
