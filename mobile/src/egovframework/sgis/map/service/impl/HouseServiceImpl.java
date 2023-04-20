package egovframework.sgis.map.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.sgis.map.service.HouseService;
import egovframework.sgis.map.service.mapper.kairos.HouseMapper;


@Service("houseService")
public class HouseServiceImpl extends EgovAbstractServiceImpl implements HouseService {
	
	@Resource(name="houseMapper")
	private HouseMapper houseMapper;
	
	/**
	 * @description 살고싶은 우리동네 지표
	 * @date 2016. 7. 7.
	 * @author (주)유코아시스템 나광흠 대리
	 * @return
	 */
	@Override
	public Map<String,Object> getMlsfcLists(){
		HashMap<String,Object> result = new HashMap<String,Object>();
		List<HashMap<String,Object>> list = houseMapper.selectHouseMlsfcLists();
		Iterator<HashMap<String,Object>> iter = list.iterator();
		while(iter.hasNext()){
			HashMap<String,Object> data = iter.next();
			if(result.get(data.get("b_class_idx_id").toString())==null){
				HashMap<String,Object> getd = new HashMap<String,Object>();
				HashMap<String,Object> indicator = new HashMap<String,Object>();
				indicator.put(data.get("m_class_idx_id").toString(),data);
				getd.put("indicator", indicator);
				result.put(data.get("b_class_idx_id").toString(),getd);
				HashMap<String,Object> bClassInfo = (HashMap<String, Object>) result.get(data.get("b_class_idx_id").toString());
				HashMap<String,Object> info = new HashMap<String,Object>();
				info.put("b_class_idx_id", data.get("b_class_idx_id"));
				info.put("b_class_idx_nm", data.get("b_class_idx_nm"));
				info.put("recmd_region_search_disp_yn", data.get("recmd_region_search_disp_yn"));
				bClassInfo.put("info", info);
			}else{
				HashMap<String,Object> getObj = (HashMap<String, Object>) result.get(data.get("b_class_idx_id").toString());
				HashMap<String,Object> indicator = (HashMap<String, Object>) getObj.get("indicator");
				indicator.put(data.get("m_class_idx_id").toString(),data);
			}
		}
		Iterator<String> keys = result.keySet().iterator();
		while( keys.hasNext() ){
			String key = keys.next();
			HashMap<String,Object> bClass = (HashMap<String,Object>)result.get(key);
			bClass.put("indicator", new TreeMap<String, Object>((HashMap<String,Object>)bClass.get("indicator")));
		}
		return new TreeMap<String, Object>(result);
	}
	@Override
	public Map<String, Object> getIdealTypeLists() {
		HashMap<String,Object> result = new HashMap<String,Object>();
		List<HashMap<String,Object>> lClasslist = houseMapper.selectLclasSearchList();
		List<HashMap<String,Object>> mClassList = houseMapper.selectMclasSearchList();
		List<HashMap<String,Object>> sClassList = houseMapper.selectSclasSearchList();
		Iterator<HashMap<String,Object>> iter = lClasslist.iterator();
		while(iter.hasNext()){
			HashMap<String,Object> data = iter.next();
			List<HashMap<String, Object>> removeCaseList = new ArrayList<HashMap<String, Object>>();
			HashMap<String, Object> addCase = new HashMap<String, Object>();
			Iterator<HashMap<String,Object>> childrenIter = mClassList.iterator();
			while(childrenIter.hasNext()){
				HashMap<String,Object> item = childrenIter.next();
				if(data.get("b_class_search_serial").equals(item.get("b_class_search_serial"))){
					removeCaseList.add(item);
					List<HashMap<String, Object>> removeSCaseList = new ArrayList<HashMap<String, Object>>();
					HashMap<String, Object> addSCase = new HashMap<String, Object>();
					Iterator<HashMap<String,Object>> sIter = sClassList.iterator();
					while(sIter.hasNext()){
						HashMap<String,Object> sClass = sIter.next();
						if(item.get("m_class_search_serial").equals(sClass.get("m_class_search_serial"))){
							removeSCaseList.add(sClass);
							addSCase.put(sClass.get("s_class_search_serial").toString(), sClass);
						}
					}
					item.put("children",new TreeMap<String, Object>(addSCase));
					addCase.put(item.get("m_class_search_serial").toString(),item);
					sClassList.removeAll(removeSCaseList);
				}
			}
			data.put("children", new TreeMap<String, Object>(addCase));
			mClassList.removeAll(removeCaseList);
			result.put(data.get("b_class_search_serial").toString(), data);
		}
		return new TreeMap<String, Object>(result);
	}
	@Override
	public List<HashMap<String, Object>> selectLifeStyleLists() {
		List<HashMap<String,Object>> list = houseMapper.selectResIdLists();
		List<HashMap<String,Object>> caseList = houseMapper.selectResIdCaseLists();
		Iterator<HashMap<String,Object>> iter = list.iterator();
		while(iter.hasNext()){
			HashMap<String,Object> data = iter.next();
			List<HashMap<String, Object>> addCaseList = new ArrayList<HashMap<String, Object>>();
			Iterator<HashMap<String,Object>> caseIter = caseList.iterator();
			while(caseIter.hasNext()){
				HashMap<String,Object> item = caseIter.next();
				if(data.get("serial")==item.get("serial")){
					addCaseList.add(item);
				}
			}
			data.put("children", addCaseList);
			caseList.removeAll(addCaseList);
		}
		return list;
	}
}
