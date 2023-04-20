package kostat.lbdms.ServiceAPI.controller.view;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import kostat.lbdms.ServiceAPI.controller.service.NoticeService;
import kostat.lbdms.ServiceAPI.exception.AuthFailedException;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;

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
@RequestMapping(value="/view/use/notice")
public class NoticeController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(NoticeController.class);
	
	@Resource(name="noticeService")
	private NoticeService noticeService;
	
	/**
	 * 공지사항 목록
	 * @param request
	 * @param response
	 * @return guide/notice
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/noticeView")
	public ModelAndView noticeView(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("useGuide/notice/noticeView");
	}
	
	/**
	 * 공지사항 상세화면
	 * @param request
	 * @param response
	 * @return guide/notice
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/noticeDetailView")
	public ModelAndView noticeDetailView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String post_no = (String)request.getParameter("post_no");
		if (post_no == null || post_no.length() == 0) {
			return new ModelAndView("common/errorCode");
		}
		model.addAttribute("post_no", post_no);
		
		return new ModelAndView("useGuide/notice/noticeDetailView");
	}
}