package egovframework.sgis.m2019.workroad.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import egovframework.sgis.cmmn.util.JsonData;

public interface WorkRoadService {
	//공통코드 조회
	public JsonData selectCmmCdComcd(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
	//공통코드 조회(한번에 불러오기)
	public JsonData selectCmmCdComcdAll(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
	//일자리맞춤형서비스정보 조회
	public JsonData selectSrvDtJobClmserInfo(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	//일자리맞춤형서비스정보 수정/등록
	public JsonData mergeSrvDtJobClmserInfo(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	// 시도코드 조회
	public JsonData selectSidoCd(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	// 시군구코드 조회
	public JsonData selectSggCd(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	// 일자리 맵 서비스 통계 데이터 조회 - 2018.10.17	ywKim	신규
	public JsonData selectJobStatData(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
}
