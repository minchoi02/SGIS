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
import kostat.lbdms.ServiceAPI.controller.service.FaqService;
import kostat.lbdms.ServiceAPI.exception.AuthFailedException;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;

/**
 * 1. 기능 : 프로젝트 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 최인섭
 *  </pre>
 *  
 * @author 최종 수정자 : 최인섭, 최은총
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/prjMng")
public class ProjectController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(ProjectController.class);
	
	@Resource(name="faqService")
	private FaqService faqService;
	
	/**
	 * 업무자동화 설정
	 * @param request
	 * @param response
	 * @return workSet
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/workSet")
	public ModelAndView workSet(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("prjMng/workSet");
	}
	
	
	/**
	 * 자료제공 서비스 자동화 설정
	 * @param request
	 * @param response
	 * @return workSet
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/dataSvcMng")
	public ModelAndView dataSvcMng(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("prjMng/dataSvcMng");
	}
	
	/**
	 * 자료제공 서비스 자동화 설정 상세
	 * @param request
	 * @param response
	 * @return workSet
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/dataSvcNew")
	public ModelAndView dataSvcNew(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("prjMng/dataSvcNew");
	}
	
	/**
	 * 자료제공 서비스 자동화 설정 상세
	 * @param request
	 * @param response
	 * @return workSet
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/dataSvcDetail")
	public ModelAndView dataSvcDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("prjMng/dataSvcDetail");
	}
	
	/**
	 * 업무자동화 설정 - 새업무
	 * @param request
	 * @param response
	 * @return workSetNew
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/workSetNew")
	public ModelAndView workSetNew(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("prjMng/workSetNew");
	}
	
	/**
	 * 업무자동화 설정 - 상세/수정
	 * @param request
	 * @param response
	 * @return workSetNew
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/workSetDetail")
	public ModelAndView workSetDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String job_setup_seq = (String)request.getParameter("job_setup_seq");
		if (job_setup_seq == null || job_setup_seq.length() == 0) {
			return new ModelAndView("common/errorCode");
		}
		model.addAttribute("job_setup_seq", job_setup_seq);
		
		return new ModelAndView("prjMng/workSetDetail");
	}
	
	/**
	 * 프로젝트 설정
	 * @param request
	 * @param response
	 * @return prjSet
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/prjSet")
	public ModelAndView prjSet(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("prjMng/prjSet");
	}
	
	/**
	 * 프로젝트 설정 신규
	 * @param request
	 * @param response
	 * @return prjSetForm
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/prjSetNew")
	public ModelAndView prjSetForm(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("prjMng/prjSetNew");
	}
	
	/**
	 * 프로젝트 설정 수정
	 * @param request
	 * @param response
	 * @return prjSetMod
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/prjSetDetail")
	public ModelAndView prjSetMod(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String project_id = (String)request.getParameter("project_id");
		if (project_id == null || project_id.length() == 0) {
			return new ModelAndView("common/errorCode");
		}
		model.addAttribute("project_id", project_id);
		return new ModelAndView("prjMng/prjSetDetail");
	}
	
	/**
	 * 프로젝트 실행
	 * @param request
	 * @param response
	 * @return prjExec
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/prjExec")
	public ModelAndView prjExec(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("prjMng/prjExec");
	}
	
	/**
	 * 업무자동화 설정 - 상세/수정
	 * @param request
	 * @param response
	 * @return workSetNew
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/prjUnitModify")
	public ModelAndView prjUnitModify(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String prj_master_hst_seq = (String)request.getParameter("prj_master_hst_seq");
		String job_order = (String)request.getParameter("job_order");
		model.addAttribute("prj_master_hst_seq", prj_master_hst_seq);
		model.addAttribute("job_order", job_order);
		return new ModelAndView("prjMng/prjUnitModify");
	}
		
		
	/**
	 * 프로젝트 실행이력
	 * @param request
	 * @param response
	 * @return prjExecHst
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/prjExecHst")
	public ModelAndView prjExecHst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("prjMng/prjExecHst");
	}

	/**
	 * 통계청 관리자용 지오코딩
	 * @param request
	 * @param response
	 * @return geocoding
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/geocoding")
	public ModelAndView geocoding(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String db_type = (String)request.getParameter("db_type");
		if (db_type==null || db_type.equalsIgnoreCase("")) db_type = "pg";
		model.addAttribute("db_type", db_type);
		return new ModelAndView("prjMng/geocoding");
	}
	
	
	/**
	 * 통계청데이터 관리
	 * @param request
	 * @param response
	 * @return sgisDataMng
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/sgisDataMng")
	public ModelAndView sgisDataMng(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String db_type = (String)request.getParameter("db_type");
		if (db_type==null || db_type.equalsIgnoreCase("")) db_type = "pg";
		model.addAttribute("db_type", db_type);
		return new ModelAndView("prjMng/dataMng");
	}
	
	/**
	 * 통계청데이터 관리(하이브)
	 * @param request
	 * @param response
	 * @return sgisHiveDataMng
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/sgisHiveDataMng")
	public ModelAndView sgisHiveDataMng(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("prjMng/sgisHiveDataMng");
	}
	
	
	/**
	 * 통계청데이터 점검
	 * @param request
	 * @param response
	 * @return sgisDataMng
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/verifyData")
	public ModelAndView verifyData(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("prjMng/verifyData");
	}
	
	/**
	 * 통계청데이터 전송
	 * @param request
	 * @param response
	 * @return sgisDataMove
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/sgisDataMove")
	public ModelAndView sgisDataMove(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("prjMng/sgisDataMove");
	}
	
	/**
	 * 통계청데이터 전송(하이브)
	 * @param request
	 * @param response
	 * @return sgisHiveDataMove
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/sgisHiveDataMove")
	public ModelAndView sgisHiveDataMove(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("prjMng/sgisHiveDataMove");
	}
	
	/**
	 * 통계청데이터 전송(서비스)
	 * @param request
	 * @param response
	 * @return sgisServiceDataMove
	 */
	@Interceptor("sgisServiceDataMove")
	@RequestMapping(value="/sgisServiceDataMove")
	public ModelAndView sgisServiceDataMove(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("prjMng/sgisServiceDataMove");
	}
	
	/**
	 * FAQ 상세화면
	 * @param request
	 * @param response
	 * @return guide/faq
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/faqDetailView")
	public ModelAndView faqDetailView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String post_no = (String)request.getParameter("post_no");
		if (post_no == null || post_no.length() == 0) {
			return new ModelAndView("common/errorCode");
		}
		model.addAttribute("post_no", post_no);
		
		return new ModelAndView("useGuide/faq/faqDetailView");
	}
	
}