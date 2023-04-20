package egovframework.sgis.member.service.impl;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.cmmn.util.PagedListHolder;
import egovframework.sgis.cmmn.util.StringUtils;
import egovframework.sgis.member.model.StatsearchhistoryVO;
import egovframework.sgis.member.service.MemberService;
import egovframework.sgis.member.service.mapper.kairos.MemberMapper;


@Service("memberService")
public class MemberServiceImpl extends EgovAbstractServiceImpl implements MemberService {
	private final static Log logger = LogFactory.getLog(MemberServiceImpl.class);

	@Resource(name="memberMapper")
	private MemberMapper memberMapper;
	/**
	 * 강제로 로그인 시키기
	 * @date 2016. 3. 21.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @return
	 */
	private boolean forceLogin(
			HttpServletRequest request,
			HttpServletResponse response){
		String USR_ID = request.getParameter("USR_ID");
		if(StringUtils.hasText(USR_ID)){
			Authentication authentication = new UsernamePasswordAuthenticationToken(
					USR_ID, 
					USR_ID,
					AuthorityUtils.createAuthorityList("ROLE_LOGINUSER")
					);

			SecurityContext securityContext = SecurityContextHolder.getContext();
			securityContext.setAuthentication(authentication);
			HttpSession session = request.getSession(true);
			session.setAttribute("SPRING_SECURITY_CONTEXT", securityContext);
			if("on".equals(request.getParameter("save-me"))){
				StringUtils.setCookie(request, response, "save-me", USR_ID, 365);
			}else{
				StringUtils.removeCookie(request, "save-me");
			}
			return true;
		}else{
			return false;
		}
	}
	/**
	 * messageAlert 창 띄운 후 로그인페이지로 이동
	 * @date 2016. 3. 21.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param message : 에러 메세지
	 * @return
	 */
	@Override
	public String redirectErrorPage(
			HttpServletRequest request, 
			HttpServletResponse response, 
			String message
			) {
		String query = "";
		if(StringUtils.hasText(request.getParameter("CUR_URL"))){
			query+="&returnPage="+request.getParameter("CUR_URL");
		}
		if(StringUtils.hasText(request.getParameter("USR_ID"))){
			query+="&id="+request.getParameter("USR_ID");
		}
		if(StringUtils.hasText(query)){
			query="?"+query;
		}
		HttpSession session = request.getSession(false);
		if(session != null){
			session.setAttribute("errorMessage", message);
			session.setMaxInactiveInterval(60*10);//10분
		}
		return "redirect:/kosis/login.sgis"+query;
	}
	/**
	 * @description 로그인 프로세스
	 * @date 2016. 9. 22.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @return
	 */
	@Override
	public String loginProcess(HttpServletRequest request, HttpServletResponse response){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(auth != null){//로그인 되어있다면 이전 로그인 되어있는거 로그아웃 시킴
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		if(request.getParameter("LOGIN_YN").equals("Y")){
			if(this.forceLogin(request,response)){
				if(
					request.getParameter("CUR_URL")!=null&&
					!request.getParameter("CUR_URL").contains("loginprocess.sgis")&&
					!request.getParameter("CUR_URL").contains("logout.sgis")&&
					!request.getParameter("CUR_URL").contains("login.sgis")){
					String redirectPage = request.getParameter("CUR_URL");
					if(!redirectPage.startsWith("/")){
						redirectPage = "/"+redirectPage;
					}
					return "redirect:"+redirectPage.replaceAll(request.getContextPath(),"");
				}else{
					return "redirect:/";
				}
			}else{
				return this.redirectErrorPage(request, response, "로그인을 실패하였습니다");
			}
		}else{
			return this.redirectErrorPage(request, response, request.getParameter("MSG").replaceAll("\\|", "<br>"));
		}
	}
	/**
	 * 북마크 정보
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param id : 북마크 아이디
	 * @return
	 */
	@Override
	public StatsearchhistoryVO getBookmark(String id) {
		if(StringUtils.hasText(id)){
			return memberMapper.selectHistparaminfo(id);
		}else{
			return null;
		}
	}
	/**
	 * @description 북마크 셋팅
	 * @date 2016. 6. 28.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param response
	 * @param principal
	 * @param holder
	 * @param map_type
	 */
	@Override
	public void setBookmark(
			HttpServletResponse response,
			Principal principal, 
			PagedListHolder holder,
			String map_type) {
		if(principal==null){
			response.setContentType("text/plain;charset=UTF-8");
			try {
				response.sendError(HttpServletResponse.SC_FORBIDDEN,"로그인이 필요합니다");
			} catch (IOException e) {
				logger.error(e);
			}
		}else{
			holder.setTotal(memberMapper.selectHistoryCount(holder,principal.getName(), "BMARK", map_type));
			holder.setSource(memberMapper.selectHistoryList(holder,principal.getName(), "BMARK", map_type));
		}
	}
	/**
	 * 히스토리 등록
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param principal
	 * @param history
	 * @return
	 */
	@Override
	public JsonData insertHistoryJson(
			HttpServletRequest request,
			HttpServletResponse response,
			Principal principal,
			StatsearchhistoryVO history
			) {
		if(principal==null){
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_ANONYMOUS, "로그인을 필요한 기능입니다", null);
		}else{
			history.setMember_id(principal.getName());
			String id = UUID.randomUUID().toString()+(int)(Math.random()*9);
			history.setHist_id(id);
			if(
					StringUtils.hasText(history.getMember_id())&&
					StringUtils.hasText(history.getMap_type())&&
					StringUtils.hasText(history.getHist_type())&&
					StringUtils.hasText(history.getHist_nm())
					){
				history.setParam_info(StringUtils.insertHtmlTag(history.getParam_info()));
				memberMapper.insertHistoryInfo(history);
				memberMapper.insertHistoryParameter(history);
				return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, null);
			}else{
				return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
			}
		}
	}
	/**
	 * 로컬 로그인 체크
	 * @date 2016. 9. 22.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param principal
	 * @param history
	 * @return
	 */
	@Override
	public JsonData localLoginCheck(
			HttpServletRequest request,
			HttpServletResponse response
			) {
		HashMap<String,Object> result = new HashMap<String,Object>();
		try {
			Document doc = Jsoup.connect("http://kosis.kr/oneid/cmmn/login/ItgrUsrInfoChk.do").data("SYS_CD", "S").data("SYS_USR_ID",request.getParameter("id")).post();
			result.put("ITGR_CHK_VAL",doc.getElementById("ITGR_CHK_VAL").val());
			result.put("ITGR_CHK_MSG",doc.getElementById("ITGR_CHK_MSG").val().replaceAll("\n", "<br/>"));
		} catch (IOException e) {
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
		return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
	}
}
