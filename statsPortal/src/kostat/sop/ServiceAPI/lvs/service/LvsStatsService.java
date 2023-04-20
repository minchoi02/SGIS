package kostat.sop.ServiceAPI.lvs.service;

import java.util.List;
import java.util.Map;

import org.springframework.ui.ModelMap;

import kostat.sop.ServiceAPI.lvs.vo.LvsSeekVO;
import kostat.sop.ServiceAPI.lvs.vo.LvsVO;
import kostat.sop.ServiceAPI.sbr.vo.SbrVo;

public interface LvsStatsService {
	public List<Map<String, Object>>  selectMainDataList(LvsVO vo) throws Exception;
	public List<Map<String, Object>>  selectMainDataCompRegionInfoInfo(LvsVO vo) throws Exception;	
	public List<Map<String, Object>>  selectRecDataList(LvsVO vo) throws Exception;
	public List<Map<String, Object>>  selectRecDataListByReg(LvsVO vo) throws Exception;//집계구별 데이터
	public List<Map<String, Object>>  selectRecDataListByYear(LvsVO vo) throws Exception; //년도별 데이터	
	public List<Map<String, Object>>  selectCensusIndexList(LvsVO vo) throws Exception;
	public List<Map<String, Object>>  selectCensusIndexYearList(LvsVO vo) throws Exception;
	public List<Map<String, Object>>  selectAllDataList(LvsSeekVO vo) throws Exception;	
}
