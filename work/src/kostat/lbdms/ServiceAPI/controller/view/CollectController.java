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
 * 1. 기능 : 주소DB/수집 컨트롤러.<p>
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
@RequestMapping(value="/view/collectData")
public class CollectController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(CollectController.class);
	
	@Resource(name="faqService")
	private FaqService faqService;
	
	/**
	 * 주소DB 총괄현황
	 * @param request
	 * @param response
	 * @return addrDbSts
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/addrDbSts")
	public ModelAndView addrDbSts(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("collectData/addrDbSts");
	}
	
	/**
	 * 주소DB 관리
	 * @param request
	 * @param response
	 * @return addrDbMng
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/addrDbMng")
	public ModelAndView addrDbMng(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String addr_type = (String)request.getParameter("addr_type");
		if (addr_type==null || addr_type.equalsIgnoreCase("")) addr_type = "road";
		model.addAttribute("addr_type", addr_type);
		return new ModelAndView("collectData/addrDbMng");
	}
	
	/**
	 * 유의어 관리
	 * @param request
	 * @param response
	 * @return addrSynMng
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/addrSynMng")
	public ModelAndView addrSynMng(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("collectData/addrSynMng");
	}
	
	/**
	 * 주소DB 수집현황
	 * @param request
	 * @param response
	 * @return collectAddrDb
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/collectAddrDb")
	public ModelAndView collectAddrDb(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("collectData/collectAddrDb");
	}
	
	/**
	 * 국통데이터 수집현항
	 * @param request
	 * @param response
	 * @return collectMolitDb
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/collectMolitDb")
	public ModelAndView collectMolitDb(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String code = (String)request.getParameter("code");
		if (code==null || code.equalsIgnoreCase("")) code = "";
		model.addAttribute("code", code);
		return new ModelAndView("collectData/collectMolitDb");
	}
	/**
	 * 품질 데이터 목록
	 * @param request
	 * @param response
	 * @param collectCareer
	 * @return
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/collectCareer")
	public ModelAndView collectCareer(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("collectData/collectCareer");
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/gridInfo")
	public ModelAndView gridInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("collectData/gridInfo");
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/collectCareer2")
	public ModelAndView collectCareer2(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("collectData/collectCareer2");
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/collectCareer3")
	public ModelAndView collectCareer3(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("collectData/collectCareer3");
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/collectKosis")
	public ModelAndView collectKosis(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String yy = (String)request.getParameter("yy");
		model.addAttribute("yy", yy);
		return new ModelAndView("collectData/collectKosis");
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/collectKosisNew")
	public ModelAndView collectKosisNew(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("collectData/collectKosisNew");
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/collectKosisDetail")
	public ModelAndView collectKosisDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String seq = (String)request.getParameter("seq");
		if (seq == null || seq.length() == 0) {
			return new ModelAndView("comm on/errorCode");
		}
		model.addAttribute("seq", seq);
		return new ModelAndView("collectData/collectKosisDetail");
	}
	
	
	
	
	/**
	 * 국통데이터 수집현항 상세
	 * @param request
	 * @param response
	 * @return collectMolitDbView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/collectMolitDbView")
	public ModelAndView collectMolitDbView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("collectData/collectMolitDbView");
	}
	
	/**
	 * 일자리 수집현황
	 * @param request
	 * @param response
	 * @return collectJobDb
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/collectJobDb")
	public ModelAndView collectJobDb(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("collectData/collectJobDb");
	}
	
	/**
	 * SNS워드 수집현황
	 * @param request
	 * @param response
	 * @return collectSnsDb
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/collectSnsDb")
	public ModelAndView collectSnsDb(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("collectData/collectSnsDb");
	}
	
	/**
	 * 법정동 수집현황
	 * @param request
	 * @param response
	 * @return addrDbSts
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/collectLegDb")
	public ModelAndView collectLegDb(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("collectData/collectLegDb");
	}
	
	/**
	 * 법정동 수집현황 상세
	 * @param request
	 * @param response
	 * @return addrDbSts
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/collectLegDbView")
	public ModelAndView collectLegDbView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("collectData/collectLegDbView");
	}
	
	/**
	 * 법정동 수집현황 등록
	 * @param request
	 * @param response
	 * @return addrDbSts
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/collectLegDbForm")
	public ModelAndView collectLegDbForm(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("collectData/collectLegDbForm");
	}
}