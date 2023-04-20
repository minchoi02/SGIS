package egovframework.sgis.m2019.workroad.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import egovframework.sgis.cmmn.util.JsonData;

public interface StatsAnlsService {
	// 업종선택
	public JsonData selectStatsAnalsTypeOfIndustry(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	// 업종선택(중분류)
	public JsonData selectStatsAnalsTypeOfIndustryMiddleClassification(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	// 사업체수&종사자수 조회
	public JsonData selectStatsAnalsMapDataCount(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
		
	// 일자리 추이 조회
	public JsonData selectStatsAnalsJobTransition(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	// 일자리 만족도 조회
	public JsonData selectStatsAnalsJobSatisfactionDegree(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
}