package egovframework.sgis.m2020.statsMe.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import egovframework.sgis.cmmn.util.JsonData;

public interface StateMeService {
	//공통코드 조회
	public JsonData selectCmmCdComcd(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	// 통계지리 정보 목록 조회
	public JsonData selectCatalogData(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	// 통계지리 정보 목록 조회
	public JsonData getStatsMeCatalogData(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	// 카탈로그 1,2차 키워드검색 목록 조회
	public JsonData selectCtlgKwrdList(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	// 메인화면 생애주기/관심분야 조회
	public JsonData getMainStatsMe(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
}
