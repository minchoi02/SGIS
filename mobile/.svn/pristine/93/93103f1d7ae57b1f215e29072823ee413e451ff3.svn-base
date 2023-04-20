package egovframework.sgis.member.service;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.cmmn.util.PagedListHolder;
import egovframework.sgis.member.model.StatsearchhistoryVO;

public interface MemberService {
	public String redirectErrorPage(HttpServletRequest request, HttpServletResponse response, String message);
	public String loginProcess(HttpServletRequest request, HttpServletResponse response);
	public StatsearchhistoryVO getBookmark(String id);
	public void setBookmark(HttpServletResponse response,Principal principal,PagedListHolder holder,String map_tpe);
	public JsonData insertHistoryJson(HttpServletRequest request,HttpServletResponse response,Principal principal,StatsearchhistoryVO history);
	public JsonData localLoginCheck(HttpServletRequest request,HttpServletResponse response);
}
