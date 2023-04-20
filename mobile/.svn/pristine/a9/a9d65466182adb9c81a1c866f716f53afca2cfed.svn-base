package egovframework.sgis.m2019.login.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import egovframework.sgis.cmmn.util.JsonData;

public interface LoginService {
	
	//로그인 처리
	public String loginProcess(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	//쿠키 조회
	public JsonData getCookie(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	//쿠키 저장
	public JsonData setCookie(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	//쿠키 삭제
	public JsonData removeCookie(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
	//사용자 정보 조회
	public JsonData selectSrvDtMemberinfo(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params);
	
}