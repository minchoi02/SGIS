package kostat.sop.ServiceAPI.controller.view;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@Interceptor("CallLogger")
public class EduBoardController {
	/**
	 * 에듀 게시판 목록 화면
	 * @param request
	 * @param response
	 * @param board_cd
	 * @return
	 */
	@RequestMapping(value="/view/edu/{level}/boardList")
	public ModelAndView boardList( @PathVariable("level") String level, HttpServletRequest request, ModelMap model ) {
		try {
			getGrade( request.getSession(), model, level );
			model.addAttribute("board_cd", request.getParameter("board_cd"));
		} catch (Exception e) {
			return new ModelAndView("redirect:/view/edu/index");
		}
		
		return new ModelAndView("edu/board/boardList", model);
	}
	
	/**
	 * 에듀 게시판 상세화면
	 * @param request
	 * @param response
	 * @param board_cd
	 * @param post_no
	 * @return
	 */
	@RequestMapping(value="/view/edu/{level}/boardView")
	public ModelAndView boardView( @PathVariable("level") String level, HttpServletRequest request, ModelMap model ) {
		try {
			getGrade( request.getSession(), model, level );
			model.addAttribute("board_cd", request.getParameter("board_cd"));
			model.addAttribute("post_no", request.getParameter("post_no"));
		} catch (Exception e) {
			return new ModelAndView("redirect:/view/edu/index");
		}
		
		return new ModelAndView("edu/board/boardView", model);
	}
	
	/**
	 * 에듀 게시판 등록/수정 화면
	 * @param request
	 * @param response
	 * @param board_cd
	 * @param post_no
	 * @return
	 */
//	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/edu/{level}/boardWrite")
	public ModelAndView boardWrite( @PathVariable("level") String level, HttpServletRequest request, ModelMap model ) {
		try {
			getGrade( request.getSession(), model, level );
			model.addAttribute("board_cd", request.getParameter("board_cd"));
			model.addAttribute("post_no", request.getParameter("post_no"));
			
		} catch (Exception e) {
			return new ModelAndView("redirect:/view/edu/index");
		}
		
		return new ModelAndView("edu/board/boardWrite", model);
	}
	
	
	public ModelMap getGrade( HttpSession session, ModelMap model, String level ){
		String grade_nm = "";
		String grade = "";
		
		if( level != null && !"".equals( level ) ){
			grade_nm = ( "ele".equals( level ) ? "초등" : ( "mid".equals( level ) ? "중학" : "고교" ) );
			grade = ( "ele".equals( level ) ? "E" : ( "mid".equals( level ) ? "M" : "H" ) );
			
			if( ( !"ele".equals( level ) && !"mid".equals( level ) && !"high".equals( level ) ) ){
				throw new ApiException("잘못된 세션 정보 입니다.");
			}
		} else {
			throw new ApiException("잘못된 세션 정보 입니다.");
		}
		
		System.out.println("================================== grade >> " + grade);
		
		model.addAttribute("ss_school_level", level);
		model.addAttribute("ss_school_grade", grade);
		model.addAttribute("ss_school_grade_nm", grade_nm);
		
		return model;
	}
	
}