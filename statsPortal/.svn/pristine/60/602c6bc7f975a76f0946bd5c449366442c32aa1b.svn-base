package kostat.sop.ServiceAPI.controller.service.mapper;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Repository("administStatsDetailMapper")
public class AdministStatsDetailMapper extends EgovAbstractMapper  {
	public List<EgovMap> getStatsItemList(HashMap<String, Object> params) {
		return selectList("administStatsDetail.getStatsItemList", params);
	}

	public List<EgovMap> getChartsInfo(HashMap<String, Object> params) {
		return selectList("administStatsDetail.getChartsInfo", params);
	}
}
