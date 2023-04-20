package kostat.lbdms.ServiceAPI.controller.view;

import java.security.SecureRandom;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.security.AES128util;
import kostat.lbdms.ServiceAPI.common.security.Security;
import kostat.lbdms.ServiceAPI.controller.service.QnaService;
import kostat.lbdms.ServiceAPI.controller.service.AttachFileService;
import kostat.lbdms.ServiceAPI.exception.AuthFailedException;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

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
@RequestMapping(value="/view/use/qna")
public class QnaController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(QnaController.class);
	
	private static final String PROPERTY_PATH = "/globals.properties";
	
	@Resource(name="qnaService")
	private QnaService qnaService;
	
	/**
	 * Q&A 목록
	 * @param request
	 * @param response
	 * @return guide/qna
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/qnaView")
	public ModelAndView qnaView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		HttpSession session = request.getSession();
		String user_id = (String)session.getAttribute("user_id");
		if (user_id != null) {
			model.addAttribute("user_id", user_id);
		}
		return new ModelAndView("useGuide/qna/qnaView");
	}
	
	/**
	 * Q&A 상세화면
	 * @param request
	 * @param response
	 * @return guide/qna
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/qnaDetailView")
	public ModelAndView qnaDetailView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		HttpSession session = request.getSession();
		String user_id = (String)session.getAttribute("user_id");
		String post_no = (String)request.getParameter("post_no");
		
		if (user_id != null) {
			model.addAttribute("user_id", user_id);
		}
		
		if (post_no == null || post_no.length() == 0) {
			return new ModelAndView("common/errorCode");
		}
		model.addAttribute("post_no", post_no);
		
		return new ModelAndView("useGuide/qna/qnaDetailView");
	}
	
	/**
	 * Q&A 글쓰기
	 * @param request
	 * @param response
	 * @return guide/qna
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/qnaWriteView")
	public ModelAndView qnaWriteView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		HttpSession session = request.getSession();
		String user_id = (String)session.getAttribute("user_id");
		
		if (user_id != null) {
			model.addAttribute("user_id", user_id);
		}
		
		return new ModelAndView("useGuide/qna/qnaWriteView");
	}
	
	/**
	 * Q&A 수정
	 * @param request
	 * @param response
	 * @return guide/qna
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/qnaModifyView")
	public ModelAndView qnaModifyView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		HttpSession session = request.getSession();
		String user_id = (String)session.getAttribute("user_id");
		String post_no = (String)request.getParameter("post_no");
		
		if (user_id != null) {
			model.addAttribute("user_id", user_id);
		}
		
		if (post_no == null || post_no.length() == 0) {
			return new ModelAndView("common/errorCode");
		}
		model.addAttribute("post_no", post_no);
		
		return new ModelAndView("useGuide/qna/qnaModifyView");
	}

}