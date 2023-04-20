package kostat.sop.ServiceAPI.sbr.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;
import kostat.sop.ServiceAPI.sbr.vo.SbrVo;

/**
 *  2022년 SGIS고도화 4차 
 *  @Description 기업생태분석지도
 *  @author ParkSangeon
 */
@Repository( "SbrStatsMapper" )
public class SbrStatsMapper extends EgovAbstractMapper
{
	
	public List<Map<String, Object>> selectCensusBigThemeInfo() {
		return selectList("SbrStatsXsql.selectCensusBigThemeInfo");
	}
	
	public List<Map<String, Object>> selectCensusSmallThemeInfo(String b_theme_cd) {
		HashMap<String, Object> parameter = new HashMap<>();
		parameter.put("b_theme_cd", b_theme_cd);
		return selectList("SbrStatsXsql.selectCensusSmallThemeInfo",parameter);
	}

	public String selectTestData() {
		return selectOne("SbrStatsXsql.selectTestData");
	}

	public List<Map<String, Object>> selectCodeList(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectCodeList",sbrVo);
	}
	
	public Map<String, Object> selectActiveCompanyCount(SbrVo sbrVo) {
		return selectOne("SbrStatsXsql.activeCompanyCount", sbrVo);
	}

	public List<Map<String, String>> selectOpenCloseCompanyCount() {
		return selectList("SbrStatsXsql.opneCloseCompanyCount");
	}

	public List selectBizCodeList() {
		return selectList("SbrStatsXsql.selectBizeCodeList");
	}

	public Map<String, Object> selectAreaInfo(SbrVo sbrVo) {
		return selectOne("SbrStatsXsql.selectAreaInfo",sbrVo);
	}

	public List selectRanklistInfo(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectRankListInfo",sbrVo);
	}

	public List<?> selectSbrCompanyInfoList(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectSbrCompanyInfoList",sbrVo);
	}

	public List<Map<String, String>> selectSbrGrowthList(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectSbrGrowthList",sbrVo);
	}

	public Map<String, String> selectSbrAvgData(SbrVo sbrVo) {
		return selectOne("SbrStatsXsql.selectSbrAvgData",sbrVo);
	}

	public Map<String, String> selectCompanyAnalysis(SbrVo sbrVo) {
		return selectOne("SbrStatsXsql.selectCompanyAnalysis",sbrVo);
	}

	public List<Map<String, String>> selectCompanyMainList(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectCompanyMainList",sbrVo);
	}

	public List<Map<String, String>> selectAreaDataList(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectAreaDataList",sbrVo);
	}

	public List innersearchpopulationForBorough(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.innersearchpopulationForBorough",sbrVo);
	}

	public List selectRegionSignalDataList(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectLeftDataList", sbrVo);
	}

	public List selectSbrAreaData(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectSbrAreaData",sbrVo);
	}

	public List selectRanklistInfo2(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectRankListInfo2",sbrVo);
	}

	public List<Map<String, String>> selectRegionSignalDataChartData(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectRegionSignalDataChartData",sbrVo);
	}
	
	public List selectRegionSignalDataChartDataCompany(SbrVo sbrVo) {
		return  selectList("SbrStatsXsql.selectRegionSignalDataChartDataCompany", sbrVo);
	}

	public Map selectRegionSignalDataChartDataCompanyPeople(SbrVo sbrVo) {
		return  selectOne("SbrStatsXsql.selectRegionSignalDataChartDataCompanyPeople", sbrVo);
	}

	public List<Map<String, String>> selectRegionSignalDataChartDataArea(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectRegionSignalDataChartDataArea", sbrVo);
	}

	public List selectComPanyInfoList(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectComPanyInfoList", sbrVo);
	}

	public List selecthousehold(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selecthousehold", sbrVo);
	}

	public List seleHouse(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.seleHouse", sbrVo);
	}

	public List selectFarmhousehold(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectFarmhousehold", sbrVo);
	}

	public List selectjobList(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectjobList", sbrVo);
	}

	public Map selectSbrAreaMax(SbrVo sbrVo) {
		return selectOne("SbrStatsXsql.selectSbrAreaMax", sbrVo);
	}

	public List<?> selectSbrCompanyInfoListAll(SbrVo sbrVo) {
		// TODO Auto-generated method stub
		return selectList("SbrStatsXsql.selectSbrCompanyInfoListAll", sbrVo);
	}
	
	public Map<String, String> selectSignalYouthPeopleCount(SbrVo sbrVo) {
		return selectOne("SbrStatsXsql.selectSignalYouthPeopleCount", sbrVo);
	}

	public List<?> selectLndAvgOlnlp(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectLndAvgOlnlp", sbrVo);
	}

	public List selectCompayRankList(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectCompayRankList", sbrVo);
	}

	public List selectForestryhousehold(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectForestryhousehold", sbrVo);
	}
	public List selectFisheryhousehold(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectFisheryhousehold", sbrVo);
	}

	public List selectFarmhouseholdSigungu(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectFarmhousehold", sbrVo);
	}

	public List innersearchpopulationForBoroughEmd(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.innersearchpopulationForBorough_emd", sbrVo);
	}

	public List seleHouseEmd(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.seleHouse_emd", sbrVo);
	}

	public List selecthouseholdEmd(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selecthousehold_emd", sbrVo);
	}

	public Map<String, String> selectSbrAreaAdmCode(SbrVo sbrVo) {
		return selectOne("SbrStatsXsql.selectSbrAreaAdmCode", sbrVo);
	}

	public List selectArearDataInfo(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectArearDataInfo", sbrVo);
	}

	// 대세 업종 전체를 가져와서 Top 1 만 넘겨준다.
	public List<Map<String, Object>> selectSignalTrendBiz(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectSignalTrendBiz", sbrVo);	
	}

	public List selectBizDataList(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectBizDataList", sbrVo);
	}

	public Map<String, Object> selectMaketInfo(SbrVo sbrVo) {
		// TODO Auto-generated method stub
		return selectOne("SbrStatsXsql.selectSbrMaketInfo", sbrVo);
	}

	public List selectBizOpenClose(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectSignalBizOpenClose", sbrVo);
	}

	public List selectBannerList() {
		return selectList("SbrStatsXsql.selectBannerList");
	}
	
	public List<Map<String, Object>> selectSignalYouthCount(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectSignalYouthPeopleCount", sbrVo);
	}
	
	public Map<String, String> selectSignalLandPrice(SbrVo sbrVo) {
		return selectOne("SbrStatsXsql.selectSignalLandPrice", sbrVo);
	}

	public List selectSearchComPanyInfoList(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectSearchComPanyInfoList", sbrVo);
	}

	public List selectSimilarAreaList(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectSimilarAreaList", sbrVo);
	}

	public List selectTrenBiz(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectTrenBiz", sbrVo);
	}

	public List selectResultSignal(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectResultSignal", sbrVo);
	}
	public List selectSbrInfoBizeCodeList(SbrVo sbrVo) {
		return selectList("SbrStatsXsql.selectSbrInfoBizeCodeList", sbrVo);
	}

}
