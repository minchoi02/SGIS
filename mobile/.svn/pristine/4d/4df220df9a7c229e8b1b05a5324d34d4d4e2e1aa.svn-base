package egovframework.sgis.m2019.workroad.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import egovframework.sgis.cmmn.util.JsonData;

public interface TodayStatusService {
	//오늘의 전체 일자리현황 팝업 조회
	public JsonData todayAllJobStatusPopupSelect(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	// 오늘의 구인현황 조회
	public JsonData selectTodayStatus(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 START */
	// 차트 날짜 선택 구인현황 조회
	public JsonData getChartSelectDayStatus(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 END */
}