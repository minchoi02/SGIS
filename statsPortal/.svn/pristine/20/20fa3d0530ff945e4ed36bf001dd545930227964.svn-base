package kostat.sop.ServiceAPI.controller.service.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 *  2020년 SGIS고도화 3차(테마코드) 
 *  @Description 테마코드 공통기능 클래스
 *  @author ParkSangeon
 */
@Repository( "ThemeCdCommonMapper" )
public class ThemeCdCommonMapper extends EgovAbstractMapper
{
	
	public String selectBigThemeCd( String parameter )
	{
		return selectOne("themeCdCommon.selectBigThemeCd", parameter);
	}
	
	public List<String> selectBigThemeCdList() {
		return selectList("themeCdCommon.selectBigThemeCdList");
	}
	
	public List<Map<String, Object>> selectBigThemeInfo() {
		return selectList("themeCdCommon.selectBigThemeInfo");
	}
	
	public List<Map<String, Object>> selectSmallThemeInfo(String b_theme_cd) {
		HashMap<String, Object> parameter = new HashMap<>();
		parameter.put("b_theme_cd", b_theme_cd);
		return selectList("themeCdCommon.selectSmallThemeInfo",parameter);
	}

	public List<Map<String, Object>> selectCensusBigThemeInfo() {
		return selectList("themeCdCommon.selectCensusBigThemeInfo");
	}
	
	public List<Map<String, Object>> selectCensusSmallThemeInfo(String b_theme_cd) {
		HashMap<String, Object> parameter = new HashMap<>();
		parameter.put("b_theme_cd", b_theme_cd);
		return selectList("themeCdCommon.selectCensusSmallThemeInfo",parameter);
	}
	
	public List<Map<String, Object>> selectSmallThemeDetail() {
		return selectList("themeCdCommon.selectSmallThemeDetail");
	}
	
	public List<Map<String, Object>> selectSmallThemeDetailGroupByBigThemeCd(String b_theme_cd) {
		return selectList("themeCdCommon.selectSmallThemeDetailGroupByBigThemeCd",b_theme_cd);
	}
	
	public List<Map<String, Object>> selectCensusCdAndNmByThemeCd(String theme_cd) {
		return selectList("themeCdCommon.selectCensusCdAndNmByThemeCd",theme_cd);
	}
	
	// 추가
	public List<Map<String, Object>> selectBigCensusThemeInfo() {
		return selectList("themeCdCommon.selectBigCensusThemeInfo");
	}
	
	// 추가
	public List<Map<String, Object>> selectSmallCensusThemeDetail() {
		return selectList("themeCdCommon.selectSmallCensusThemeDetail");
	}
}
