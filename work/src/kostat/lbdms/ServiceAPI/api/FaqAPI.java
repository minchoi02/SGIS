package kostat.lbdms.ServiceAPI.api;

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
 * 1. 기능 : FAQ 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱 1.0, 2017/07/03  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 권차욱
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/api/use/faq")
public class FaqAPI {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(FaqAPI.class);
	
	@Resource(name="faqService")
	private FaqService faqService;
	
	/**
	 * FAQ 조회
	 * @param request
	 * @param response
	 * @return /view/faq/getFaqList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getFaqList.do")
	public ModelAndView getFaqList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String startIdx = (String)request.getParameter("startIdx");
			String resultCnt = (String)request.getParameter("resultCnt");
			String sort = (String)request.getParameter("sort");
			String order = (String)request.getParameter("order");
			String type = (String)request.getParameter("type");
			String searchText = (String)request.getParameter("searchText");
			
			startIdx = Security.cleanXss(startIdx);
			resultCnt = Security.cleanXss(resultCnt);
			sort = Security.cleanXss(sort);
			order = Security.cleanXss(order);
			type = Security.cleanXss(type);
			searchText = Security.cleanXss(searchText);
			
			//시작 인덱스
			if (startIdx == null) {
				startIdx = "0";
			}
			
			//한페이지당 결과 수
			if (resultCnt == null) {
				resultCnt = "5";
			}
			
			//정렬 칼럼
			if (sort != null) {
				mapParameter.put("sort", sort);
			}
			
			//정렬 방법
			if (order != null) {
				mapParameter.put("order", order);
			}
			
			//검색어
			if (type != null) {
				mapParameter.put("type", type);
				mapParameter.put("searchText", searchText);
				mapParameter.put("searchTitle", searchText);
			}
			
			mapParameter.put("startIdx", Integer.parseInt(startIdx));
			mapParameter.put("resultCnt", Integer.parseInt(resultCnt));
			
			List faqList = (List)faqService.getFaqList(mapParameter);
			
			model.put("id", "G2G12001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", faqList);
			
		} catch (Exception e) {
			model.put("id", "G2G12001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * FAQ 상세 조회
	 * @param request
	 * @param response
	 * @return /view/faq/getFaqDetailInfo.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getFaqDetailInfo.do")
	public ModelAndView getFaqDetailInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String postNo = (String)request.getParameter("postNo");
			postNo = Security.cleanXss(postNo);
			
			if (postNo == null) {
				throw new AuthorityException ("게시물정보가 정확하지 않습니다.");
			}
			
			mapParameter.put("post_no", Long.parseLong(postNo));
			
			Map faqDetailInfo = (Map)faqService.getFaqDetailInfo(mapParameter);
			
			model.put("id", "G2G12001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", faqDetailInfo);
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G12001");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G12001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
}