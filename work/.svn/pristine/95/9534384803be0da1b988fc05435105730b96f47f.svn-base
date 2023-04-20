package kostat.lbdms.ServiceAPI.controller.view;

import java.util.ArrayList;
//import java.security.Security;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.controller.service.AuthentionService;
import kostat.lbdms.ServiceAPI.controller.service.MemberService;
import kostat.lbdms.ServiceAPI.exception.AuthFailedException;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;

import kostat.lbdms.ServiceAPI.common.security.AES128util;
import kostat.lbdms.ServiceAPI.common.security.Security;

/**
 * 1. 기능 : 회원 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱, 김성현, 1.0, 2015/09/03  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/member")
public class MemberController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(MemberController.class);
	
	@Resource(name="memberService")
	private MemberService memberService;
	
	@Resource(name="authentionService")
	private AuthentionService authentionService;
	
	/**
	 * 이용약관 (회원정보 호출)
	 * @param request
	 * @param response
	 * @return member/clause
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/myPageMain")
	public ModelAndView clause(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		// 소속 정보 불러오기		
		Map mapParameter = new HashMap();
		try {
			List<Map> institutionList = (List)authentionService.getInstitutionList(mapParameter);
			model.addAttribute("institutionList", institutionList);
			
			//어느 페이지에 접근하는지 확인
			String pageInfo = "main";
			model.addAttribute("pageInfo", pageInfo);
			
		} catch (Exception e) {
			logger.error(e);
		}
		
		return new ModelAndView("member/myPageMain", model);
	}
	
	/**
	 * 회원정보 그룹 관리 호출
	 * @param request
	 * @param response
	 * @return member/clause
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/myPageGroup")
	public ModelAndView clauseGroup(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		// 소속 정보 불러오기		
		Map mapParameter = new HashMap();
		try {
			List<Map> institutionList = (List)authentionService.getInstitutionList(mapParameter);
			model.addAttribute("institutionList", institutionList);
			
			//어느 페이지에 접근하는지 확인
			String pageInfo = "group";
			model.addAttribute("pageInfo", pageInfo);
			
		} catch (Exception e) {
			logger.error(e);
		}
		
		return new ModelAndView("member/myPageGroup", model);
	}
	
}