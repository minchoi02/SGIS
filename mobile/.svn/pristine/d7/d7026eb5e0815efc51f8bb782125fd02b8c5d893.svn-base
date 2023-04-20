package egovframework.sgis.m2020.thematic.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.ui.ModelMap;

import egovframework.sgis.cmmn.util.JsonData;

public interface thematicServiceNew {
	String getThematicCategory(ModelMap model,String stat_thema_map_id, String ref_adm_id);
	
	// 통계주제도 정보 목록 조회
	public JsonData selectThematicList(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	// 통계주제도 ID에 해당하는 맵정보 조회
	public JsonData selectThematicMapData(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	/** 2020.09.15[한광희] 코로나19 추가 START */
	// 코로나19 맵정보 조회
	public JsonData selectCovid19ThematicMapData(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	// 코로나19 일정보 조회
	public JsonData selectCovid19DayData(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	// 코로나19 현황판 조회
	public JsonData selectCovid19Stats(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	/** 2020.09.15[한광희] 코로나19 추가 END */

	// 코로나19 예방접종 현황판 조회
	public JsonData selectCovid19VaccStats(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);

	// 코로나19 맵정보 조회
	public JsonData selectCovid19VaccThematicMapData(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	// 코로나19 일정보 조회
	public JsonData selectCovid19VaccDayData(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	// 개인카드 사용금액 월정보 조회
	public JsonData selectCreditCardMonthData(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
}
