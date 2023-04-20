package egovframework.sgis.m2019.workroad.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import egovframework.sgis.cmmn.util.JsonData;

public interface MyNeighberhoodJobService {
	
	//내 주변 일자리 건수
	public JsonData myNeighberhoodJobListCount(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	//내 주변 일자리 목록
	public JsonData myNeighberhoodJobList(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	//내 주변 일자리 조회
	public JsonData myNeighberhoodJobSelect(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	//생활환경 정보 조회
	public JsonData livingEnvironmentSelect(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	/** 2020.09.21[한광희] 생활환경종합 팝업 상세조회 추가 START */
	//생활환경 정보 상세 조회
	public JsonData livingEnvironmentDetailSelect(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	/** 2020.09.21[한광희] 생활환경종합 팝업 상세조회 추가 END */
	
}