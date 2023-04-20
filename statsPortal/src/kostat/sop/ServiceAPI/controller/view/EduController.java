package kostat.sop.ServiceAPI.controller.view;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.controller.service.EduService;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;




@Controller
@Interceptor("CallLogger")
public class EduController {
	private final Log logger = LogFactory.getLog(EduController.class);
	
	@Resource(name="eduService")
	private EduService eduService;
	
	/**
	 * INDEX
	 * @param request
	 * @param response
	 * @return index
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/index")
	public ModelAndView index(HttpServletRequest req, HttpServletResponse res) {
		
		HttpSession session = req.getSession();
		Map mapParameter = new HashMap();
		Map result = new HashMap();
		//회원 권한 조회
		if(session.getAttribute("member_id") !=null){
			mapParameter.put("member_id",(String)session.getAttribute("member_id"));
			result = eduService.selectTeacherInfo(mapParameter);
			
			if(result != null && !result.isEmpty()){
				//권한신청 정보가 있을 때 
				session.setAttribute("ss_grant_state", result.get("grant_state"));
			}else{
				//권한신청 정보가 없을 때
				session.setAttribute("ss_grant_state", "");
			}
		}else {
			session.setAttribute("ss_grant_state", "");
		}
		
		return new ModelAndView("edu/index");
	}
	
	/**
	 * Main
	 * @param request
	 * @param response
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/{level}/main")
	public ModelAndView MainView(@PathVariable("level") String level, HttpServletRequest req, HttpServletResponse res) {
		
		checkLevel(level, req);
		HttpSession session = req.getSession();
		//session.setAttribute("ss_grant_state", "NONE");
		
		return new ModelAndView("edu/"+level+"/main");
		
		
	}
	
	/**
	 * Common Header
	 * @param request
	 * @param response
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/{level}/header")
	public ModelAndView header(@PathVariable("level") String level, HttpServletRequest req, HttpServletResponse res) {
		checkLevel(level, req);
		return new ModelAndView("edu/"+level+"/header");
	}

	
	/**
	 * Common Footer
	 * @param request
	 * @param response
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/footer")
	public ModelAndView footer(HttpServletRequest req, HttpServletResponse res) {
		
		return new ModelAndView("edu/footer");
	}
	
	
	/**
	 * 수업하기 목록 화면
	 * @param level
	 * @param themaId
	 * @param req
	 * @param res
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/{level}/classList")
	public ModelAndView classListView(@PathVariable("level") String level, @RequestParam(value="thema_id") String themaId
			                        , HttpServletRequest req, HttpServletResponse res) {
		checkLevel(level, req);
		return new ModelAndView("edu/"+level+"/classList");
	}
	
	
	/**
	 * 스스로하기-통계갤러리 화면
	 * @param level
	 * @param themaId
	 * @param req
	 * @param res
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/{level}/myself/gallery")
	public ModelAndView myselfGalleryView(@PathVariable("level") String level, HttpServletRequest req, HttpServletResponse res) {
		checkLevel(level, req);
		return new ModelAndView("edu/myself/gallery");
	}
	
	
	/**
	 * 스스로하기-통계지도체험 화면
	 * @param level
	 * @param themaId
	 * @param req
	 * @param res
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/{level}/myself/mapExp")
	public ModelAndView myselfMapExpView(@PathVariable("level") String level, HttpServletRequest req, HttpServletResponse res) {
		checkLevel(level, req);
		return new ModelAndView("edu/myself/mapExp");
	}
	
	
	
	/**
	 * 스스로하기-나의데이터 화면
	 * @param level
	 * @param themaId
	 * @param req
	 * @param res
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/{level}/myself/myData")
	public ModelAndView myselfMydataView(@PathVariable("level") String level, HttpServletRequest req, HttpServletResponse res) {
		checkLevel(level, req);
		return new ModelAndView("edu/myself/myData");
	}
	
	/**
	 * 수업하기 상세 메인
	 * @param level
	 * @param contentsId
	 * @param req
	 * @param res
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/contents/body/{contentsId}")
	public ModelAndView contentsMainView(@PathVariable("contentsId") String contentsId
			                        , HttpServletRequest req, HttpServletResponse res) {
		//checkLevel(contentsId, req);
		return new ModelAndView("edu/body/"+contentsId);
	}
	
	
	
	/**
	 * 수업하기 상세 화면
	 * @param level
	 * @param themaId
	 * @param req
	 * @param res
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/{level}/classDetail")
	public ModelAndView classDetailView(@PathVariable("level") String level, @RequestParam(value="contents_id") String contentsId
			                        , HttpServletRequest req, HttpServletResponse res) {
		
		checkLevel(level, req);
		req.setAttribute("contents_id", contentsId);
		return new ModelAndView("edu/"+level+"/classDetail");
	}
	
	/**
	 * 수업하기 상세 자세한 설명보기 화면 > 기능 소거
	 * @param level
	 * @param contentsId
	 * @param req
	 * @param res
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/{level}/linkDetail")
	public ModelAndView linkDetailView(@PathVariable("level") String level, @RequestParam(value="contents_id") String contentsId
			                        , HttpServletRequest req, HttpServletResponse res) {
		
		return new ModelAndView("edu/link_detail/"+contentsId);
	}
	
	
	/**
	 * 수업하기 상세 sgis 활용하기 화면
	 * @param level
	 * @param contentsId
	 * @param req
	 * @param res
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/{level}/linkSgis")
	public ModelAndView linkSgisView(@PathVariable("level") String level, @RequestParam(value="contents_id") String contentsId
			                        , HttpServletRequest req, HttpServletResponse res) {
		
		return new ModelAndView("edu/link_sgis/"+contentsId);
	}
	
	
	/**
	 * 검색결과 전체
	 * @param level
	 * @param kwrd
	 * @param req
	 * @param res
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/{level}/searchAll")
	public ModelAndView searchAllView(@PathVariable("level") String level, @RequestParam(value="kwrd") String kwrd, HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		checkLevel(level, req);
		req.setAttribute("kwrd", kwrd);
		
		return new ModelAndView("edu/search/searchAll");
	}
	
	
	/**
	 * 검색결과 수업하기
	 * @param level
	 * @param kwrd
	 * @param req
	 * @param res
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/{level}/searchClass")
	public ModelAndView searchClassView(@PathVariable("level") String level, @RequestParam(value="kwrd") String kwrd, HttpServletRequest req, HttpServletResponse res) {
		
		checkLevel(level, req);
		req.setAttribute("kwrd", kwrd);
		
		return new ModelAndView("edu/search/searchClass");
	}
	
	/**
	 * 검색결과 배우는 지도
	 * @param level
	 * @param kwrd
	 * @param req
	 * @param res
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/{level}/searchTchpgm")
	public ModelAndView searchTchpgmView(@PathVariable("level") String level, @RequestParam(value="kwrd") String kwrd, HttpServletRequest req, HttpServletResponse res) {
		
		checkLevel(level, req);
		req.setAttribute("kwrd", kwrd);
		
		return new ModelAndView("edu/search/searchTchpgm");
	}
	
	/**
	 * 검색결과 함께하는 지도
	 * @param level
	 * @param kwrd
	 * @param req
	 * @param res
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/{level}/searchWithMap")
	public ModelAndView searchWithMapView(@PathVariable("level") String level, @RequestParam(value="kwrd") String kwrd, HttpServletRequest req, HttpServletResponse res) {
		
		checkLevel(level, req);
		req.setAttribute("kwrd", kwrd);
		
		return new ModelAndView("edu/search/searchWithMap");
	}
	
	/**
	 * 이슈보기 목록화면 
	 * @param request
	 * @param model
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/{level}/issueList")
	public ModelAndView issueListView(@PathVariable("level") String level, HttpServletRequest request, ModelMap model ) {
		
		checkLevel(level, request);
		try {
			getGrade( request.getSession(), model );
			
		} catch (Exception e) {
			return new ModelAndView("redirect:/view/edu/index");
		}
		
		return new ModelAndView("edu/issue/issueList", model);
	}
	
	/**
	 * 이슈보기 상세화면
	 * @param request
	 * @param model
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/{level}/issueDetail")
	public ModelAndView boardView(@PathVariable("level") String level, HttpServletRequest request, ModelMap model ) {
		
		checkLevel(level, request);
		try {
			getGrade( request.getSession(), model );
			model.addAttribute("contents_id", request.getParameter("contents_id"));
		} catch (Exception e) {
			return new ModelAndView("redirect:/view/edu/index");
		}
		
		return new ModelAndView("edu/issue/issueDetail", model);
	}
	
	/**
	 * 학교 등급/회원 권한 조회
	 * @param level
	 * @return
	 */
	public boolean checkLevel(String level,HttpServletRequest req){
		HttpSession session = req.getSession();
		
		Map mapParameter = new HashMap();
		Map result = new HashMap();
		
		//회원 권한 조회
		if(session.getAttribute("member_id") !=null){
			mapParameter.put("member_id",(String)session.getAttribute("member_id"));
			result = eduService.selectTeacherInfo(mapParameter);
			
			if(result != null && !result.isEmpty()){
				//권한신청 정보가 있을 때 
				session.setAttribute("ss_grant_state", result.get("grant_state"));
			}else{
				//권한신청 정보가 없을 때
				session.setAttribute("ss_grant_state", "");
			}
		}else {
			session.setAttribute("ss_grant_state", "");
		}
		
		//사이트 학교 등급 조회
		if("ele".equals(level) || "mid".equals(level) || "high".equals(level) ) {
			
			if("ele".equals(level)){
				session.setAttribute("ss_school_level", "ele");	
				session.setAttribute("ss_school_grade", "E");	
			}else if("mid".equals(level)){
				session.setAttribute("ss_school_level", "mid");
				session.setAttribute("ss_school_grade", "M");
			}else if("high".equals(level)){
				session.setAttribute("ss_school_level", "high");
				session.setAttribute("ss_school_grade", "H");
			}
			return true;
		}else {
			return false;
		}
	}
	

	public ModelMap getGrade( HttpSession session, ModelMap model ){
		String grade = "";
		String grade_nm = "";
		
		if( session.getAttribute("ss_school_grade") != null && !"".equals( session.getAttribute("ss_school_grade") ) ){
			grade = (String) session.getAttribute("ss_school_grade");
			
			if( "E".equals( grade ) ){
				model.addAttribute("ss_school_level", "ele");	
			} else if( "M".equals( grade ) ){
				model.addAttribute("ss_school_level", "mid");
			} else if( "H".equals( grade ) ){
				model.addAttribute("ss_school_level", "high");
			} else {
				model.addAttribute("ss_school_level", "cmmnty");
			}
			
			if( !"E".equals( grade ) && !"M".equals( grade ) && !"H".equals( grade ) ){
				throw new ApiException("잘못된 세션 정보 입니다.");
			} else {
				grade_nm = ( "E".equals( grade ) ? "초등" : ( "M".equals( grade ) ? "중학" : "고교" ) );
			}
		} else {
			throw new ApiException("잘못된 세션 정보 입니다.");
		}
		
		model.addAttribute("ss_school_grade_nm", grade_nm);
		
		return model;
	}
}