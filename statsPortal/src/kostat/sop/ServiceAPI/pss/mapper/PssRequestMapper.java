package kostat.sop.ServiceAPI.pss.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository("pssRequestMapper")
public class PssRequestMapper extends EgovAbstractMapper {
	
	public List selectCategoryCodeList(Map<String, Object> mapParameter) {
		return selectList("pssRequest.selectCategoryCode", mapParameter);
	}

	public List selectCensusCodeList(Map<String, Object> mapParameter) {
		return selectList("pssRequest.selectCemsusCode", mapParameter);
	}
	
	public List selectCensusDataList(Map<String, Object> mapParameter) {
		return selectList("pssRequest.selectCemsusData", mapParameter);
	}

	public List selectCensusYearList(Map<String, Object> mapParameter) {
		return selectList("pssRequest.selectCemsusYear", mapParameter);
	}

	public List selectCensusDetailList(Map<String, Object> mapParameter) {
		// TODO Auto-generated method stub
		return selectList("pssRequest.selectCemsusDetail", mapParameter);
	}

	public List selectCensusSigunguList(Map<String, Object> mapParameter) {
		// TODO Auto-generated method stub
		return selectList("pssRequest.selectCemsusSigungu", mapParameter);
	}

	public List selectCensusSidoList(Map<String, Object> mapParameter) {
		// TODO Auto-generated method stub
		return selectList("pssRequest.selectCemsusSido", mapParameter);
	}

	public List<Object> selectcodeList(HashMap<String, Object> map) {
		// TODO Auto-generated method stub
		return selectList("pssRequest.selectCodeList", map);
	}

	public List<Object> selectAreaCodeList(HashMap<String, Object> map) {
		// TODO Auto-generated method stub
		return selectList("pssRequest.selectAreaCodeList", map);
	}

}
