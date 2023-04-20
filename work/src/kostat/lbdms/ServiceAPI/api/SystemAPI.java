package kostat.lbdms.ServiceAPI.api;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.security.SecureRandom;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONException;
import org.postgresql.copy.CopyManager;
import org.postgresql.core.BaseConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.util.DateUtil;
import kostat.lbdms.ServiceAPI.common.util.FileUtils;
import kostat.lbdms.ServiceAPI.common.util.http.HttpJSONConnector;
import kostat.lbdms.ServiceAPI.common.util.http.HttpMultipartConnector;
import kostat.lbdms.ServiceAPI.common.util.http.HttpRequestKey;
import kostat.lbdms.ServiceAPI.common.util.http.HttpResponseConnector;
import kostat.lbdms.ServiceAPI.common.util.http.IResponseHandler;
import kostat.lbdms.ServiceAPI.common.web.core.network.process.FileWriteResponseHandler;
import kostat.lbdms.ServiceAPI.common.web.core.network.process.NormalResponseHandler;
import kostat.lbdms.ServiceAPI.common.web.db.DBConnector;
import kostat.lbdms.ServiceAPI.common.web.db.OpenPGSql;
import kostat.lbdms.ServiceAPI.common.web.exception.FileSystemException;
import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.util.ConfigUtil;
import kostat.lbdms.ServiceAPI.common.web.util.FileUtil;
import kostat.lbdms.ServiceAPI.common.web.util.LoginUtil;
import kostat.lbdms.ServiceAPI.controller.service.AttachFileService;
import kostat.lbdms.ServiceAPI.controller.service.PrjMngService;
import kostat.lbdms.ServiceAPI.controller.service.SystemService;
import kostat.lbdms.ServiceAPI.exception.AuthFailedException;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;
import net.sf.json.JSONObject;

/**
 * 1. 기능 : Mydata 컨트롤러
 * <p>
 * 2. 처리개요 :
 * <p>
 * 3. 주의사항 :
 * <p>
 * 
 * <pre>
 *  <b>History:</b> 
 *     작성자 : 최재영, 1.0, 2018/07/02  초기 작성
 * </pre>
 * 
 * @author 최종 수정자 : 최은총
 * @version 1.0
 * @see
 *      <p/>
 */
@Controller
@Interceptor("CallLogger")
@RequestMapping(value = "/api/sysmgt")
public class SystemAPI {
	private final Log	logger = LogFactory.getLog(MyDataAPI.class);
	private static final String PROPERTY_PATH = "/globals.properties";
	
    @Autowired
    private RestService restService;
    
	@Resource(name = "systemService")
	private SystemService		systemService;
	
	@Resource(name="prjMngService")
	private PrjMngService prjMngService;
	
	@Resource(name="attachFileService")
	private AttachFileService attachFileService;
	
	String	charsets[]	= { "UTF8", "CP949" };
	
	/**
	 * 공지사항 조회
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/getNotice
	 * @throws IOException
	 */
	@RequestMapping(value = "/getNoticeLst.do")
	@ResponseBody
	public ModelAndView noticeLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String searchText = (String)request.getParameter("searchText");
			String searchType = (String)request.getParameter("searchType");

			int searchPage = 1;
			if (request.getParameter("searchPage") != null && !request.getParameter("searchPage").equals("")) 
				searchPage = Integer.parseInt(request.getParameter("searchPage"));
			int display = 10;
			if (request.getParameter("selectViewCount") != null && !request.getParameter("selectViewCount").equals("")) 
				display = Integer.parseInt(request.getParameter("selectViewCount"));
			int start = display  * (searchPage - 1);
			
			mapParameter.put("start", start);
			mapParameter.put("display", display);
			mapParameter.put("searchPage", searchPage);
			mapParameter.put("searchText", searchText);
			mapParameter.put("searchType", searchType);
			List<Map> noticeLst = (List)systemService.getNoticeLst(mapParameter);
			
			model.addAttribute("noticeLst", noticeLst);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	@RequestMapping(value = "/getNoticeDetail.do")
	@ResponseBody
	public ModelAndView noticeDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int post_no = Integer.parseInt(request.getParameter("post_no"));
			mapParameter.put("post_no", post_no);
			List<Map> noticeView = (List)systemService.getNoticeDetail(mapParameter);
			
			model.addAttribute("noticeView", noticeView);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}

	
	@RequestMapping(value = "/getFaqDetail.do")
	@ResponseBody
	public ModelAndView faqDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int post_no = Integer.parseInt(request.getParameter("post_no"));
			mapParameter.put("post_no", post_no);
			Map faqView = (Map)systemService.getFaqDetail(mapParameter);
			
			model.addAttribute("faqView", faqView);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	@RequestMapping(value = "/deletePost.do")
	@ResponseBody
	public ModelAndView deleteNotice(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String ids = request.getParameter("ids");
			String table = request.getParameter("table");
			mapParameter.put("ids", ids);
			mapParameter.put("table", table);
			
			int result = systemService.deletePost(mapParameter);

			model.addAttribute("result", result);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	@RequestMapping(value = "/updateViewCnt.do")
	@ResponseBody
	public ModelAndView updateViewCnt(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int post_no = Integer.parseInt(request.getParameter("post_no"));
			String table = request.getParameter("table");
			mapParameter.put("post_no", post_no);
			mapParameter.put("table", table);
			
			int result = systemService.updateViewCnt(mapParameter);
			
			model.addAttribute("result", result);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	@RequestMapping(value = "/getQnaLst.do")
	@ResponseBody
	public ModelAndView qnaLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String searchText = (String)request.getParameter("searchText");
			String searchType = (String)request.getParameter("searchType");

			int searchPage = 1;
			if (request.getParameter("searchPage") != null && !request.getParameter("searchPage").equals("")) 
				searchPage = Integer.parseInt(request.getParameter("searchPage"));
			int display = 10;
			if (request.getParameter("selectViewCount") != null && !request.getParameter("selectViewCount").equals("")) 
				display = Integer.parseInt(request.getParameter("selectViewCount"));
			int start = display  * (searchPage - 1);
			
			mapParameter.put("start", start);
			mapParameter.put("display", display);
			mapParameter.put("searchText", searchText);
			mapParameter.put("searchType", searchType);
			List<Map> qnaLst = (List)systemService.getQnaLst(mapParameter);
			
			model.addAttribute("qnaLst", qnaLst);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	@RequestMapping(value = "/getQnaDetail.do")
	@ResponseBody
	public ModelAndView qnaDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int post_no = Integer.parseInt(request.getParameter("post_no"));
			mapParameter.put("post_no", post_no);
			List<Map> result = (List)systemService.getQnaDetail(mapParameter);
			
			model.addAttribute("result", result);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	@RequestMapping(value = "/getFaqLst.do")
	@ResponseBody
	public ModelAndView faqLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			
			List<Map> faqLst = (List)systemService.getFaqLst();
			
			model.addAttribute("faqLst", faqLst);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	@RequestMapping(value = "/updateOrderFaq.do")
	@ResponseBody
	public ModelAndView updateOrderFaq(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int post_no = Integer.parseInt(request.getParameter("post_no"));
			int order_no = Integer.parseInt(request.getParameter("order_no"));
			int last_no = Integer.parseInt(request.getParameter("last_no"));
			int order_no_prev = order_no;
			String upOrDown = request.getParameter("updown_check");
			mapParameter.put("post_no", post_no);
			int result = 0;
			
			mapParameter.put("order_no_prev", order_no_prev);
			
			if (upOrDown.equalsIgnoreCase("up")) {
				order_no--;
				if (order_no <= 0) {
					order_no = 1;
				}
			} else {
				order_no++;
				if (order_no > last_no) order_no = last_no;
			}
			
			mapParameter.put("order_no", order_no);
			result = systemService.updateOrderFaq(mapParameter);
			model.addAttribute("result",result);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	@RequestMapping(value = "/getUseInfoLst.do")
	@ResponseBody
	public ModelAndView useInfoLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String searchText = (String)request.getParameter("searchText");
			String searchType = (String)request.getParameter("searchType");

			int searchPage = 1;
			if (request.getParameter("searchPage") != null && !request.getParameter("searchPage").equals("")) 
				searchPage = Integer.parseInt(request.getParameter("searchPage"));
			int display = 10;
			if (request.getParameter("selectViewCount") != null && !request.getParameter("selectViewCount").equals("")) 
				display = Integer.parseInt(request.getParameter("selectViewCount"));
			int start = display  * (searchPage - 1);
			
			mapParameter.put("start", start);
			mapParameter.put("display", display);
			mapParameter.put("searchText", searchText);
			mapParameter.put("searchType", searchType);
			List<Map> useInfoLst = (List)systemService.getUseInfoLst(mapParameter);
			
			model.addAttribute("useinfoLst", useInfoLst);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	@RequestMapping(value = "/getUseInfoDetail.do")
	@ResponseBody
	public ModelAndView useInfoDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int post_no = Integer.parseInt(request.getParameter("post_no"));
			mapParameter.put("post_no", post_no);
			List<Map> result = (List)systemService.getUseInfoDetail(mapParameter);
			
			model.addAttribute("result", result);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	@RequestMapping(value = "/getPopAlimLst.do")
	@ResponseBody
	public ModelAndView popAlimLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String searcText = (String)request.getParameter("searcText");
			String searchType = (String)request.getParameter("searchType");

			int searchPage = 1;
			if (request.getParameter("searchPage") != null && !request.getParameter("searchPage").equals("")) 
				searchPage = Integer.parseInt(request.getParameter("searchPage"));
			int display = 10;
			if (request.getParameter("selectViewCount") != null && !request.getParameter("selectViewCount").equals("")) 
				display = Integer.parseInt(request.getParameter("selectViewCount"));
			int start = display  * (searchPage - 1);
			
			mapParameter.put("start", start);
			mapParameter.put("display", display);
			mapParameter.put("searchText", searcText);
			mapParameter.put("searchType", searchType);
			List<Map> popAlimLst = (List)systemService.getPopAlimLst(mapParameter);
			
			model.addAttribute("popalimLst", popAlimLst);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	@RequestMapping(value = "/getPopAlimDetail.do")
	@ResponseBody
	public ModelAndView popAlimDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int post_no = Integer.parseInt(request.getParameter("post_no"));
			mapParameter.put("post_no", post_no);
			List<Map> result = (List)systemService.getPopAlimDetail(mapParameter);
			
			model.addAttribute("result", result);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	@RequestMapping(value = "/getUseGuideLst.do")
	@ResponseBody
	public ModelAndView useGuideLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String searchText = (String)request.getParameter("searchText");
			String searchType = (String)request.getParameter("searchType");

			int searchPage = 1;
			if (request.getParameter("searchPage") != null && !request.getParameter("searchPage").equals("")) 
				searchPage = Integer.parseInt(request.getParameter("searchPage"));
			int display = 10;
			if (request.getParameter("selectViewCount") != null && !request.getParameter("selectViewCount").equals("")) 
				display = Integer.parseInt(request.getParameter("selectViewCount"));
			int start = display  * (searchPage - 1);
			
			mapParameter.put("start", start);
			mapParameter.put("display", display);
			mapParameter.put("searchText", searchText);
			mapParameter.put("searchType", searchType);
			List<Map> useGuideLst = (List)systemService.getUseGuideLst(mapParameter);
			
			model.addAttribute("useGuideLst", useGuideLst);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	@RequestMapping(value = "/getUseGuideDetail.do")
	@ResponseBody
	public ModelAndView useGuideDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int post_no = Integer.parseInt(request.getParameter("post_no"));
			mapParameter.put("post_no", post_no);
			List<Map> result = (List)systemService.getUseGuideDetail(mapParameter);
			
			model.addAttribute("result", result);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	@RequestMapping(value = "/getUseCopyLst.do")
	@ResponseBody
	public ModelAndView useCopyLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String searchText = (String)request.getParameter("searchText");
			String searchType = (String)request.getParameter("searchType");

			int searchPage = 1;
			if (request.getParameter("searchPage") != null && !request.getParameter("searchPage").equals("")) 
				searchPage = Integer.parseInt(request.getParameter("searchPage"));
			int display = 10;
			if (request.getParameter("selectViewCount") != null && !request.getParameter("selectViewCount").equals("")) 
				display = Integer.parseInt(request.getParameter("selectViewCount"));
			int start = display  * (searchPage - 1);
			
			mapParameter.put("start", start);
			mapParameter.put("display", display);
			mapParameter.put("searchText", searchText);
			mapParameter.put("searchType", searchType);
			List<Map> useCopyLst = (List)systemService.getUseCopyLst(mapParameter);
			
			model.addAttribute("useCopyLst", useCopyLst);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	@RequestMapping(value = "/getUseCopyDetail.do")
	@ResponseBody
	public ModelAndView useCopyDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int post_no = Integer.parseInt(request.getParameter("post_no"));
			mapParameter.put("post_no", post_no);
			List<Map> result = (List)systemService.getUseCopyDetail(mapParameter);
			
			model.addAttribute("result", result);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	@RequestMapping(value = "/getSampleLst.do")
	@ResponseBody
	public ModelAndView sampleLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String searchText = (String)request.getParameter("searchText");
			String searchType = (String)request.getParameter("searchType");

			int searchPage = 1;
			if (request.getParameter("searchPage") != null && !request.getParameter("searchPage").equals("")) 
				searchPage = Integer.parseInt(request.getParameter("searchPage"));
			int display = 10;
			if (request.getParameter("selectViewCount") != null && !request.getParameter("selectViewCount").equals("")) 
				display = Integer.parseInt(request.getParameter("selectViewCount"));
			int start = display  * (searchPage - 1);
			
			mapParameter.put("start", start);
			mapParameter.put("display", display);
			mapParameter.put("searchText", searchText);
			mapParameter.put("searchType", searchType);
			List<Map> sampleLst = (List)systemService.getSampleLst(mapParameter);
			
			model.addAttribute("sampleLst", sampleLst);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	@RequestMapping(value = "/getSampleDetail.do")
	@ResponseBody
	public ModelAndView sampleDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int post_no = Integer.parseInt(request.getParameter("post_no"));
			mapParameter.put("post_no", post_no);
			List<Map> result = (List)systemService.getSampleDetail(mapParameter);
			
			model.addAttribute("result", result);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	@RequestMapping(value = "/getShareLst.do")
	@ResponseBody
	public ModelAndView shareLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String searchText = (String)request.getParameter("searchText");
			String searchType = (String)request.getParameter("searchType");

			int searchPage = 1;
			if (request.getParameter("searchPage") != null && !request.getParameter("searchPage").equals("")) 
				searchPage = Integer.parseInt(request.getParameter("searchPage"));
			int display = 10;
			if (request.getParameter("selectViewCount") != null && !request.getParameter("selectViewCount").equals("")) 
				display = Integer.parseInt(request.getParameter("selectViewCount"));
			int start = display  * (searchPage - 1);
			
			mapParameter.put("start", start);
			mapParameter.put("display", display);
			mapParameter.put("searchText", searchText);
			mapParameter.put("searchType", searchType);
			List<Map> shareLst = (List)systemService.getShareLst(mapParameter);
			
			model.addAttribute("shareLst", shareLst);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	@RequestMapping(value = "/getShareDetail.do")
	@ResponseBody
	public ModelAndView shareDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int post_no = Integer.parseInt(request.getParameter("post_no"));
			mapParameter.put("post_no", post_no);
			List<Map> result = (List)systemService.getShareDetail(mapParameter);
			
			model.addAttribute("result", result);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	@RequestMapping(value = "/deleteShareBoard.do")
	@ResponseBody
	public ModelAndView deleteShareBoard(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String ids = request.getParameter("ids");
			mapParameter.put("ids", ids);
			
			int result = systemService.deleteShareBoard(mapParameter);

			model.addAttribute("result", result);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	@RequestMapping(value = "/updateShareBoardHits.do")
	@ResponseBody
	public ModelAndView updateShareBoardHits(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			int post_no = Integer.parseInt(request.getParameter("post_no"));
			mapParameter.put("post_no", post_no);
			
			int result = systemService.updateShareBoardHits(mapParameter);
			
			model.addAttribute("result", result);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	@RequestMapping(value = "/insertShareBoard.do")
	@ResponseBody
	public ModelAndView updateShareBoard(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String title = request.getParameter("title");
			String content = request.getParameter("content");
			String fileList = request.getParameter("fileList");
			String boardType = (String)request.getParameter("boardType");
			int post_no = -1; 
					
			mapParameter.put("title", title);
			mapParameter.put("content", content);
			mapParameter.put("fileList", fileList);
			MultipartHttpServletRequest multiReq = (MultipartHttpServletRequest) request;
			MultipartFile multiFile = multiReq.getFile("searchTextFile");
			
			if(request.getParameterMap().containsKey("post_no")) {
				post_no = Integer.parseInt(request.getParameter("post_no"));
				mapParameter.put("post_no", post_no);
			}else {
				int result = systemService.insertShareBoard(mapParameter);
				model.addAttribute("result", result);
			}
			
			if(multiFile != null) {
				String originName = multiFile.getOriginalFilename();
				
				//시큐어코딩 삭제
				String fileExtension = originName.substring(originName.lastIndexOf(".") + 1);
				String fileName = originName.substring(0, originName.lastIndexOf("."));
				
				if( fileName != null && !"".equals(fileName)){
					fileName = fileName.replace("/", "");
					fileName = fileName.replace(".", "");
					fileName = fileName.replace("&", "");
					fileName = fileName.replace("%2e", "");
					fileName = fileName.replace("%2f", "");
				}
					
				long fileSize = multiFile.getSize();
				int count = 0;
				
				//확장자 체크
				String[] ExtList = {"png","jpg","jpeg", "bmp", "gif","tif","tiff","zip","alz","7z","hwp","hwt","doc","docx","ppt","pptx","pdf","xls","xlsx", "csv"};
				for(String extd : ExtList) {
					if(fileExtension.equals(extd)) {
						count++;
						break;
					}
				}
				if (count == 0) {
					throw new AuthFailedException("허용되지 않는 확장자입니다.");
				}
				
				//파일용량 체크(3MB)
				if(fileSize > 2048000000) {
					throw new AuthFailedException("첨부파일 제한 용량은 2GB 입니다.");
				}
				
				
				ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
				Properties props = PropertiesLoaderUtils.loadProperties(resource);
				String filePath = props.getProperty("Globals.Board.fileUpload.Path");
				filePath += boardType.replaceAll("_", "");
				
				// time + random number
				String fileId = FileUtils.getDateNum() + FileUtils.randomNum();
				
				// 첨부파일정보 저장
				if (fileList != null) {
					FileUtils.writeFile(multiFile, filePath, fileId, fileExtension);
					mapParameter.put("post_no", post_no);
					attachFileService.insertAttachFile(mapParameter);
				}
			}
			
			if(request.getParameterMap().containsKey("post_no")) {
				mapParameter.put("post_no", post_no);
				int result = systemService.updateShareBoard(mapParameter);
				model.addAttribute("result", result);
			}else {
				int result = systemService.insertShareBoard(mapParameter);
				model.addAttribute("result", result);
			}
			
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	

	/**
	 * 대시보드 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	@RequestMapping(value = "/getManageStatusCount.do")
	@ResponseBody
	public ModelAndView getWorkSetList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		 Map mapParameter = new HashMap();
			try {
				String user_id = (String)request.getSession().getAttribute("user_id");
				if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
				mapParameter.put("user_id", user_id);
				
				HashMap WorkSet = (HashMap)systemService.getManageStatusCount(mapParameter);
				
				model.put("id", "G2G11001");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
				model.put("result", WorkSet);
				
			} catch (Exception e) {
				model.put("id", "G2G11001");
				model.put("errCd", "-1");
				model.put("errMsg", "처리 중 에러가 발생하였습니다.");
				logger.info(e);
			}
			finally {
			}
			return new ModelAndView("jsonV", model);
	}

	/**
	 * 일자리 수집현황을 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	@RequestMapping(value = "/selectCollectJobHistory.do")
	@ResponseBody
	public ModelAndView selectCollectJobHistory(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		 Map mapParameter = new HashMap();
			try {
				String user_id = (String)request.getSession().getAttribute("user_id");
				if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
				mapParameter.put("user_id", user_id);
				
				List WorkSet = (List)systemService.selectCollectJobHistory(mapParameter);
				
				model.put("id", "G2G11001");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
				model.put("result", WorkSet);
				
			} catch (Exception e) {
				model.put("id", "G2G11001");
				model.put("errCd", "-1");
				model.put("errMsg", "처리 중 에러가 발생하였습니다.");
				logger.info(e);
			}
			finally {
			}
			return new ModelAndView("jsonV", model);
	}

	/**
	 * 가입신청 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	@RequestMapping(value = "/selectMemberSts.do")
	@ResponseBody
	public ModelAndView selectMemberSts(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		 Map mapParameter = new HashMap();
			try {
				String user_id = (String)request.getSession().getAttribute("user_id");
				if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
				mapParameter.put("user_id", user_id);
				
				List WorkSet = (List)systemService.selectMemberSts(mapParameter);
				
				model.put("id", "G2G11001");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
				model.put("result", WorkSet);
				
			} catch (Exception e) {
				model.put("id", "G2G11001");
				model.put("errCd", "-1");
				model.put("errMsg", "처리 중 에러가 발생하였습니다.");
				logger.info(e);
			}
			finally {
			}
			return new ModelAndView("jsonV", model);
	}

	/**
	 * 전송승인 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	@RequestMapping(value = "/selectReqTransDataSts.do")
	@ResponseBody
	public ModelAndView selectReqTransDataSts(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		 Map mapParameter = new HashMap();
			try {
				String user_id = (String)request.getSession().getAttribute("user_id");
				if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
				mapParameter.put("user_id", user_id);
				
				List WorkSet = (List)systemService.selectReqTransDataSts(mapParameter);
				
				model.put("id", "G2G11001");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
				model.put("result", WorkSet);
				
			} catch (Exception e) {
				model.put("id", "G2G11001");
				model.put("errCd", "-1");
				model.put("errMsg", "처리 중 에러가 발생하였습니다.");
				logger.info(e);
			}
			finally {
			}
			return new ModelAndView("jsonV", model);
	}

	/**
	 * 공지사항5를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	@RequestMapping(value = "/selectNotice5.do")
	@ResponseBody
	public ModelAndView selectNotice5(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		 Map mapParameter = new HashMap();
			try {
				List WorkSet = (List)systemService.selectNotice5(mapParameter);
				
				model.put("id", "G2G11001");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
				model.put("result", WorkSet);
				
			} catch (Exception e) {
				model.put("id", "G2G11001");
				model.put("errCd", "-1");
				model.put("errMsg", "처리 중 에러가 발생하였습니다.");
				logger.info(e);
			}
			finally {
			}
			return new ModelAndView("jsonV", model);
	}

	/**
	 * QNA5 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	@RequestMapping(value = "/selectQNA5.do")
	@ResponseBody
	public ModelAndView selectQNA5(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		 Map mapParameter = new HashMap();
			try {
				List WorkSet = (List)systemService.selectQNA5(mapParameter);
				
				model.put("id", "G2G11001");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
				model.put("result", WorkSet);
				
			} catch (Exception e) {
				model.put("id", "G2G11001");
				model.put("errCd", "-1");
				model.put("errMsg", "처리 중 에러가 발생하였습니다.");
				logger.info(e);
			}
			finally {
			}
			return new ModelAndView("jsonV", model);
	}

	/**
	 * PopNotice5 상태를 조회한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	@RequestMapping(value = "/selectPopNotice5.do")
	@ResponseBody
	public ModelAndView selectPopNotice5(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		 Map mapParameter = new HashMap();
			try {
				List WorkSet = (List)systemService.selectPopNotice5(mapParameter);
				
				model.put("id", "G2G11001");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
				model.put("result", WorkSet);
				
			} catch (Exception e) {
				model.put("id", "G2G11001");
				model.put("errCd", "-1");
				model.put("errMsg", "처리 중 에러가 발생하였습니다.");
				logger.info(e);
			}
			finally {
			}
			return new ModelAndView("jsonV", model);
	}
	
	/**
	 * 나의 데이터 업로드 미리 보기
	 * 
	 * @param request
	 * @param response
	 * @return /api/sysmgt/getNotice
	 * @throws IOException
	 */
	@RequestMapping(value = "/previewData.do")
	@ResponseBody
	public ModelAndView previewData(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String searchText = (String)request.getParameter("searchText");
			String searchType = (String)request.getParameter("searchType");

			int searchPage = 1;
			if (request.getParameter("searchPage") != null && !request.getParameter("searchPage").equals("")) 
				searchPage = Integer.parseInt(request.getParameter("searchPage"));
			int display = 10;
			if (request.getParameter("selectViewCount") != null && !request.getParameter("selectViewCount").equals("")) 
				display = Integer.parseInt(request.getParameter("selectViewCount"));
			int start = display  * (searchPage - 1);
			
			mapParameter.put("start", start);
			mapParameter.put("display", display);
			mapParameter.put("searchPage", searchPage);
			mapParameter.put("searchText", searchText);
			mapParameter.put("searchType", searchType);
			List<Map> noticeLst = (List)systemService.getNoticeLst(mapParameter);
			
			model.addAttribute("noticeLst", noticeLst);
			
			//어느 페이지에 접근하는지 확인
			String pageInfo = "main";
			model.addAttribute("pageInfo", pageInfo);
			
			model.addAttribute("result", pageInfo);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("sysmgt/noticeLst",model);
	}	
	
	/**
	 * sns 워드 수집 조회
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/getLegal
	 * @throws IOException
	 */
	@RequestMapping(value = "/getCollectSnsDb.do")
	@ResponseBody
	public ModelAndView getCollectSnsDb(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);

			String searchText = request.getParameter("searchText");
			mapParameter.put("searchText", searchText);
			
			int searchPage = 1;
			if (request.getParameter("searchPage") != null && !request.getParameter("searchPage").equals("")) 
				searchPage = Integer.parseInt(request.getParameter("searchPage"));
			int display = 10;
			if (request.getParameter("selectViewCount") != null && !request.getParameter("selectViewCount").equals("")) 
				display = Integer.parseInt(request.getParameter("selectViewCount"));
			int start = display  * (searchPage - 1);
			
			mapParameter.put("start", start);
			mapParameter.put("display", display);
			List<Map> DataLst = (List)systemService.getCollectSnsDb(mapParameter);
			
			model.addAttribute("result", DataLst);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * 법정동 조례 수집 조회
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/getLegal
	 * @throws IOException
	 */
	@RequestMapping(value = "/getLegalLst.do")
	@ResponseBody
	public ModelAndView getDataLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);

			int searchPage = 1;
			if (request.getParameter("searchPage") != null && !request.getParameter("searchPage").equals("")) 
				searchPage = Integer.parseInt(request.getParameter("searchPage"));
			int display = 10;
			if (request.getParameter("selectViewCount") != null && !request.getParameter("selectViewCount").equals("")) 
				display = Integer.parseInt(request.getParameter("selectViewCount"));
			int start = display  * (searchPage - 1);
			
			mapParameter.put("start", start);
			mapParameter.put("display", display);
			List<Map> DataLst = (List)systemService.getLegalLst(mapParameter);
			
			model.addAttribute("result", DataLst);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * 법정동 조례 상세
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/getLegalDetail
	 * @throws IOException
	 */
	@RequestMapping(value = "/getLegalDetail.do")
	@ResponseBody
	public ModelAndView getLegalDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int post_no = Integer.parseInt(request.getParameter("post_no"));
			mapParameter.put("post_no", post_no);
			Map dataView = systemService.getLegalDetail(mapParameter);
			
			model.addAttribute("result", dataView);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * 게시물 저장
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/savePost
	 * @throws IOException
	 */
	@RequestMapping(value = "/savePost.do")
	@ResponseBody
	public ModelAndView savePost(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String table = request.getParameter("table");
			String post_no = request.getParameter("post_no");
			String title = request.getParameter("title");
			String content = request.getParameter("content");
			mapParameter.put("title", title);
			mapParameter.put("content", content);
			mapParameter.put("table", table);
			
			int result = 0;
			int postNo = 0;
			if (post_no == null || post_no.equals("")) {
				postNo = systemService.getPostNo();
				mapParameter.put("post_no", postNo);
				result = systemService.insertPost(mapParameter);
			} else {
				postNo = Integer.parseInt(post_no);
				mapParameter.put("post_no", postNo);
				result = systemService.updatePost(mapParameter);
			}
			
			MultipartHttpServletRequest multiReq = (MultipartHttpServletRequest) request;
			MultipartFile multiFile = multiReq.getFile("searchFile");

			if(multiFile != null) {
				String originName = multiFile.getOriginalFilename();
				
				//시큐어코딩 삭제
				String fileExtension = originName.substring(originName.lastIndexOf(".") + 1);
				String fileName = originName.substring(0, originName.lastIndexOf("."));
				
				if( fileName != null && !"".equals(fileName)){
					fileName = fileName.replace("/", "");
					fileName = fileName.replace(".", "");
					fileName = fileName.replace("&", "");
					fileName = fileName.replace("%2e", "");
					fileName = fileName.replace("%2f", "");
				}
					
				long fileSize = multiFile.getSize();
				int count = 0;
				
				//확장자 체크
				String[] ExtList = {"png","jpg","jpeg", "bmp", "gif","tif","tiff","zip","alz","7z","hwp","hwt","doc","docx","ppt","pptx","pdf","xls","xlsx", "csv"};
				for(String extd : ExtList) {
					if(fileExtension.equals(extd)) {
						count++;
						break;
					}
				}
				if (count == 0) {
					throw new AuthFailedException("허용되지 않는 확장자입니다.");
				}
				
				//파일용량 체크(2GB)
				if(fileSize > 2048000000) {
					throw new AuthFailedException("첨부파일 제한 용량은 2GB 입니다.");
				}
				
				
				ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
				Properties props = PropertiesLoaderUtils.loadProperties(resource);
				String filePath = props.getProperty("Globals.Board.fileUpload.Path") + "/" + table + "/";
				
				// time + random number
				String fileId = FileUtils.getDateNum() + FileUtils.randomNum();
				
				//파일 업로드
				if(FileUtils.writeFile(multiFile, filePath, fileId, fileExtension)) {
					Map attachParameter = new HashMap();
					attachParameter.put("post_no", postNo);
					attachParameter.put("user_id", user_id);
					attachParameter.put("attach", fileId);
					attachParameter.put("file_nm", originName);
					attachParameter.put("path", table);
					attachParameter.put("ext", fileExtension);
					attachParameter.put("file_size", fileSize);
					attachFileService.deleteAttachFile(mapParameter);
					attachFileService.insertAttachFile(attachParameter);
					
				} else {
					throw new AuthFailedException("파일 업로드에 실패 하였습니다.");
				}
			}
			model.addAttribute("errCd", "0");
			model.addAttribute("result", result);
			
		} catch (Exception e) {
			model.addAttribute("errCd", "-1");
			model.addAttribute("errMsg", e.getMessage());
			logger.error(e);
		}
		return new ModelAndView("jsonV",model);
	}

	/**
	 * 게시물 답변
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/savePost
	 * @throws IOException
	 */
	@RequestMapping(value = "/saveAnswer.do")
	@ResponseBody
	public ModelAndView saveAnswer(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String table = request.getParameter("table");
			String post_no = request.getParameter("post_no");
			String comment = request.getParameter("comment");
			mapParameter.put("comment", comment);
			mapParameter.put("table", table);
			
			int result = 0;
			int postNo = 0;
			postNo = Integer.parseInt(post_no);
			mapParameter.put("post_no", postNo);
			result = systemService.updateAnswer(mapParameter);
			
			model.addAttribute("errCd", "0");
			model.addAttribute("result", result);
		} catch (Exception e) {
			model.addAttribute("errCd", "-1");
			model.addAttribute("errMsg", e.getMessage());
			logger.error(e);
		}
		return new ModelAndView("jsonV",model);
	}
	/**
	 * 소속기관 조회
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/getInstitutionLst
	 * @throws IOException
	 */
	@RequestMapping(value = "/getInstitutionLst.do")
	@ResponseBody
	public ModelAndView getInstitutionLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String searchText = request.getParameter("searchText");
			mapParameter.put("searchText", searchText);
			
			int searchPage = 1;
			if (request.getParameter("searchPage") != null && !request.getParameter("searchPage").equals("")) 
				searchPage = Integer.parseInt(request.getParameter("searchPage"));
			int display = 50;
			if (request.getParameter("selectViewCount") != null && !request.getParameter("selectViewCount").equals("")) 
				display = Integer.parseInt(request.getParameter("selectViewCount"));
			int start = display  * (searchPage - 1);
			
			mapParameter.put("start", start);
			mapParameter.put("display", display);
			List<Map> DataLst = (List)systemService.getInstitutionLst(mapParameter);
			
			model.addAttribute("result", DataLst);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * 소속기관 상세
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/getInstitutionDetail
	 * @throws IOException
	 */
	@RequestMapping(value = "/getInstitutionDetail.do")
	@ResponseBody
	public ModelAndView getInstitutionDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int inst_seq = Integer.parseInt(request.getParameter("inst_seq"));
			mapParameter.put("inst_seq", inst_seq);
			Map dataView = systemService.getInstitutionDetail(mapParameter);
			
			model.addAttribute("result", dataView);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * 소속기관 삭제
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/deleteInstitution
	 * @throws IOException
	 */
	@RequestMapping(value = "/deleteInstitution.do")
	@ResponseBody
	public ModelAndView deleteInstitution(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String inst_seq = request.getParameter("inst_seq");
			
			int instSeq = Integer.parseInt(inst_seq);
			mapParameter.put("inst_seq", instSeq);
			int result = systemService.deleteInstitution(mapParameter);
			
			model.addAttribute("errCd", "0");
			model.addAttribute("result", result);
		} catch (Exception e) {
			model.addAttribute("errCd", "-1");
			model.addAttribute("errMsg", e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * 소속기관 저장
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/saveInstitution
	 * @throws IOException
	 */
	@RequestMapping(value = "/saveInstitution.do")
	@ResponseBody
	public ModelAndView saveInstitution(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String inst_seq = request.getParameter("inst_seq");
			String inst_nm = request.getParameter("inst_nm");
			String inst_desc = request.getParameter("inst_desc");
			mapParameter.put("inst_nm", inst_nm);
			mapParameter.put("inst_desc", inst_desc);
			
			int result = 0;
			int instSeq = 0;
			if (inst_seq == null || inst_seq.equals("")) {
				result = systemService.insertInstitution(mapParameter);
			} else {
				instSeq = Integer.parseInt(inst_seq);
				mapParameter.put("inst_seq", instSeq);
				result = systemService.updateInstitution(mapParameter);
			}
			
			model.addAttribute("errCd", "0");
			model.addAttribute("result", result);
			
		} catch (Exception e) {
			model.addAttribute("errCd", "-1");
			model.addAttribute("errMsg", e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * 표준단어 조회
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/getStdWordLst
	 * @throws IOException
	 */
	@RequestMapping(value = "/getStdWordLst.do")
	@ResponseBody
	public ModelAndView getStdWordLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String searchText = request.getParameter("searchText");
			mapParameter.put("searchText", searchText);

			int searchPage = 1;
			if (request.getParameter("searchPage") != null && !request.getParameter("searchPage").equals("")) 
				searchPage = Integer.parseInt(request.getParameter("searchPage"));
			int display = 50;
			if (request.getParameter("selectViewCount") != null && !request.getParameter("selectViewCount").equals("")) 
				display = Integer.parseInt(request.getParameter("selectViewCount"));
			int start = display  * (searchPage - 1);
			
			mapParameter.put("start", start);
			mapParameter.put("display", display);
			List<Map> DataLst = (List)systemService.getStdWordLst(mapParameter);
			
			model.addAttribute("result", DataLst);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * 표준단어 상세
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/getStdWordDetail
	 * @throws IOException
	 */
	@RequestMapping(value = "/getStdWordDetail.do")
	@ResponseBody
	public ModelAndView getStdWordDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int wrd_seq = Integer.parseInt(request.getParameter("wrd_seq"));
			mapParameter.put("wrd_seq", wrd_seq);
			Map dataView = systemService.getStdWordDetail(mapParameter);
			
			model.addAttribute("result", dataView);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * 표준단어 삭제
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/deleteStdWord
	 * @throws IOException
	 */
	@RequestMapping(value = "/deleteStdWord.do")
	@ResponseBody
	public ModelAndView deleteStdWord(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String wrd_seq = request.getParameter("wrd_seq");
			
			int instSeq = Integer.parseInt(wrd_seq);
			mapParameter.put("wrd_seq", instSeq);
			int result = systemService.deleteStdWord(mapParameter);
			
			model.addAttribute("errCd", "0");
			model.addAttribute("result", result);
		} catch (Exception e) {
			model.addAttribute("errCd", "-1");
			model.addAttribute("errMsg", e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * 표준단어 저장
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/saveStdWord
	 * @throws IOException
	 */
	@RequestMapping(value = "/saveStdWord.do")
	@ResponseBody
	public ModelAndView saveStdWord(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String wrd_seq = request.getParameter("wrd_seq");
			String korean_wrd_nm = request.getParameter("korean_wrd_nm");
			String eng_wrd_nm = request.getParameter("eng_wrd_nm");
			String eng_abrv_nm = request.getParameter("eng_abrv_nm");
			String wrd_desc = request.getParameter("wrd_desc");
			String wrd_type = request.getParameter("wrd_type");
			String rm = request.getParameter("rm");
			
			mapParameter.put("wrd_seq", wrd_seq);
			mapParameter.put("korean_wrd_nm", korean_wrd_nm);
			mapParameter.put("eng_wrd_nm", eng_wrd_nm);
			mapParameter.put("eng_abrv_nm", eng_abrv_nm);
			mapParameter.put("wrd_desc", wrd_desc);
			mapParameter.put("wrd_type", wrd_type);
			mapParameter.put("rm", rm);
			
			int result = 0;
			int wordSeq = 0;
			if (wrd_seq == null || wrd_seq.equals("")) {
				result = systemService.insertStdWord(mapParameter);
			} else {
				wordSeq = Integer.parseInt(wrd_seq);
				mapParameter.put("wrd_seq", wordSeq);
				result = systemService.updateStdWord(mapParameter);
			}
			
			model.addAttribute("errCd", "0");
			model.addAttribute("result", result);
		} catch (Exception e) {
			model.addAttribute("errCd", "-1");
			model.addAttribute("errMsg", e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * 전송승인 조회
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/getAprovMoveLst
	 * @throws IOException
	 */
	@RequestMapping(value = "/getAprovMoveLst.do")
	@ResponseBody
	public ModelAndView getAprovMoveLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int searchPage = 1;
			if (request.getParameter("searchPage") != null && !request.getParameter("searchPage").equals("")) 
				searchPage = Integer.parseInt(request.getParameter("searchPage"));
			int display = 10;
			if (request.getParameter("selectViewCount") != null && !request.getParameter("selectViewCount").equals("")) 
				display = Integer.parseInt(request.getParameter("selectViewCount"));
			int start = display  * (searchPage - 1);
			
			String grant_yn = request.getParameter("grant_yn");
			if (grant_yn != null && grant_yn.equals("O")) {
				mapParameter.put("grant_yn", "");
			} else if (grant_yn != null && !grant_yn.equals("O") && !grant_yn.equals("")) {
				mapParameter.put("grant_yn", grant_yn);
			} 
			
			mapParameter.put("start", start);
			mapParameter.put("display", display);
			List<Map> DataLst = (List)systemService.getAprovMoveLst(mapParameter);
			
			model.addAttribute("result", DataLst);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * 전송승인 상세
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/getAprovMoveDetail
	 * @throws IOException
	 */
	@RequestMapping(value = "/getAprovMoveDetail.do")
	@ResponseBody
	public ModelAndView getAprovMoveDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int req_seq = Integer.parseInt(request.getParameter("req_seq"));
			mapParameter.put("req_seq", req_seq);
			Map dataView = systemService.getAprovMoveDetail(mapParameter);
			
			model.addAttribute("result", dataView);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}

	/**
	 * 전송승인 저장
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/saveAprovMove
	 * @throws IOException
	 */
	@RequestMapping(value = "/saveAprovMove.do")
	@ResponseBody
	public ModelAndView saveAprovMove(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String req_seq = request.getParameter("req_seq");
			String grant_yn = request.getParameter("grant_yn");
			String procs_content = request.getParameter("procs_content");
			
			mapParameter.put("grant_yn", grant_yn);
			mapParameter.put("procs_content", procs_content);
			
			int reqSeq = Integer.parseInt(req_seq);
			int result = 0;
			mapParameter.put("req_seq", reqSeq);
			result = systemService.updateAprovMove(mapParameter);
			
			model.addAttribute("errCd", "0");
			model.addAttribute("result", result);
		} catch (Exception e) {
			model.addAttribute("errCd", "-1");
			model.addAttribute("errMsg", e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}

	/**
	 * 회원정보 조회
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/getUserMngLst
	 * @throws IOException
	 */
	@RequestMapping(value = "/getUserMngLst.do")
	@ResponseBody
	public ModelAndView getUserMngLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String grant_yn = request.getParameter("grant_yn");
			if (grant_yn != null && grant_yn.equals("O")) {
				mapParameter.put("grant_yn", grant_yn);
			} else if (grant_yn != null && !grant_yn.equals("O") && !grant_yn.equals("")) {
				mapParameter.put("grant_yn", grant_yn);
			} 
			
			String searchText = request.getParameter("searchText");
			mapParameter.put("searchText", searchText);
			
			int searchPage = 1;
			if (request.getParameter("searchPage") != null && !request.getParameter("searchPage").equals("")) 
				searchPage = Integer.parseInt(request.getParameter("searchPage"));
			int display = 10;
			if (request.getParameter("selectViewCount") != null && !request.getParameter("selectViewCount").equals("")) 
				display = Integer.parseInt(request.getParameter("selectViewCount"));
			int start = display  * (searchPage - 1);
			
			if (user_id.equalsIgnoreCase("sdc99")) {
				mapParameter.put("use_div", "s");
			}
			mapParameter.put("start", start);
			mapParameter.put("display", display);
			List<Map> DataLst = (List)systemService.getUserMngLst(mapParameter);
			
			model.addAttribute("result", DataLst);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * 회원정보 상세
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/getUserMngDetail
	 * @throws IOException
	 */
	@RequestMapping(value = "/getUserMngDetail.do")
	@ResponseBody
	public ModelAndView getUserMngDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int user_no = Integer.parseInt(request.getParameter("user_no"));
			mapParameter.put("user_no", user_no);
			Map dataView = systemService.getUserMngDetail(mapParameter);
			
			String email = "";
			if (dataView.get("email")!=null) email = LoginUtil.Decrypt(dataView.get("email").toString());
			String tel_no = "";
			if (dataView.get("tel_no")!=null) tel_no = LoginUtil.Decrypt(dataView.get("tel_no").toString());
			String tel_no2 ="";
			if (dataView.get("tel_no2")!=null) tel_no2 = LoginUtil.Decrypt(dataView.get("tel_no2").toString());
			String userId = dataView.get("user_id").toString();
			
			dataView.put("email", email);
			dataView.put("tel_no", tel_no);
			dataView.put("tel_no2", tel_no2);
			
			Map<String, Object> mapParameter2 = new HashMap<String, Object>();
			mapParameter2.put("start", 0);
			mapParameter2.put("display", 1000000000);
			List<Map> instLst = (List)systemService.getInstitutionLst(mapParameter2);
			
			model.addAttribute("result", dataView);
			model.addAttribute("result2", instLst);
			try {
				Map<String, Object> mapParameter3 = new HashMap<String, Object>();
				mapParameter3.put("user_id", userId);
				List<Map> loginLst = (List)systemService.getLoginLst(mapParameter3);
				model.addAttribute("result3", loginLst);
			} catch (Exception ee) {
				model.addAttribute("result3", null);
			}
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}

	/**
	 * 회원정보 삭제
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/deleteUserMng
	 * @throws IOException
	 */
	@RequestMapping(value = "/deleteUserMng.do")
	@ResponseBody
	public ModelAndView deleteUserMng(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String user_no = request.getParameter("user_no");
			int userNo = Integer.parseInt(user_no);
			mapParameter.put("user_no", userNo);
			int result = systemService.deleteUserMng(mapParameter);
			
			model.addAttribute("errCd", "0");
			model.addAttribute("result", result);
		} catch (Exception e) {
			model.addAttribute("errCd", "-1");
			model.addAttribute("errMsg", e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * 회원 정지/해지
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/stopUserMng
	 * @throws IOException
	 */
	@RequestMapping(value = "/stopUserMng.do")
	@ResponseBody
	public ModelAndView stopUserMng(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String user_no = request.getParameter("user_no");
			String use_yn = request.getParameter("use_yn");
			
			int userNo = Integer.parseInt(user_no);
			mapParameter.put("use_yn", use_yn);
			mapParameter.put("user_no", userNo);
			int result = systemService.stopUserMng(mapParameter);
			
			model.addAttribute("errCd", "0");
			model.addAttribute("result", result);
		} catch (Exception e) {
			model.addAttribute("errCd", "-1");
			model.addAttribute("errMsg", e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * 회원정보 저장
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/saveUserMng
	 * @throws IOException
	 */
	@RequestMapping(value = "/saveUserMng.do")
	@ResponseBody
	public ModelAndView saveUserMng(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			
			int userNo = 0;
			String user_no = request.getParameter("user_no");
			userNo = Integer.parseInt(user_no);
			mapParameter.put("user_no", userNo);
			
			String user_id_m = null2empty(request.getParameter("user_id"));
			String user_nm = null2empty(request.getParameter("user_nm"));
			String imsi_pw = null2empty(request.getParameter("user_pw"));;
			String user_pw = null;
			if (imsi_pw != null && user_id_m != null) user_pw = LoginUtil.toHash(user_id_m, imsi_pw);
			String inst_seq = null2empty(request.getParameter("inst_seq"));
			String inst_manager_yn = null2empty(request.getParameter("inst_manager_yn"));
			String dept = null2empty(request.getParameter("dept"));
			String job_pos = null2empty(request.getParameter("job_pos"));
			String email = LoginUtil.Encrypt(request.getParameter("email").toString());
			String tel_no = LoginUtil.Encrypt(request.getParameter("tel_no").toString());
			String tel_no2 = LoginUtil.Encrypt(request.getParameter("tel_no2").toString());
			String login_fail_cnt = null2empty(request.getParameter("login_fail_cnt"));
			String restrict_ip = null2empty(request.getParameter("restrict_ip"));
			String multi_connect_lmtt_yn = null2empty(request.getParameter("multi_connect_lmtt_yn"));
			String use_start_date = null2empty(request.getParameter("use_start_date"));
			String use_end_date = null2empty(request.getParameter("use_end_date"));
			String user_div = null2empty(request.getParameter("user_div"));
			
			//mapParameter.put("user_nm", user_nm);
			if (user_pw != null && !user_pw.equalsIgnoreCase("")) {
				mapParameter.put("user_pw", user_pw);
			}
			if (inst_seq != null && !inst_seq.equalsIgnoreCase("")) {
				mapParameter.put("inst_seq", Integer.parseInt(inst_seq));
			}
			mapParameter.put("inst_manager_yn", inst_manager_yn);
			mapParameter.put("dept", dept);
			mapParameter.put("user_div", user_div);
			mapParameter.put("job_pos", job_pos);
			mapParameter.put("email", email);
			mapParameter.put("tel_no", tel_no);
			mapParameter.put("tel_no2", tel_no2);
			mapParameter.put("login_fail_cnt", login_fail_cnt);
			mapParameter.put("restrict_ip", restrict_ip);
			mapParameter.put("multi_connect_lmtt_yn", multi_connect_lmtt_yn);
			mapParameter.put("use_start_date", use_start_date);
			mapParameter.put("use_end_date", use_end_date);
			
			int result = 0;
			result = systemService.updateUserMng(mapParameter);
			
			model.addAttribute("errCd", "0");
			model.addAttribute("result", result);
			
		} catch (Exception e) {
			model.addAttribute("errCd", "-1");
			model.addAttribute("errMsg", e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * 회원 승인/반려
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/saveUserMng
	 * @throws IOException
	 */
	@RequestMapping(value = "/saveGrantYN.do")
	@ResponseBody
	public ModelAndView saveGrantYN(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			int userNo = 0;
			String user_no = request.getParameter("user_no");
			userNo = Integer.parseInt(user_no);
			mapParameter.put("user_no", userNo);
			
			String grant_user = request.getParameter("grant_user");
			String grant_yn = request.getParameter("grant_yn");
			String return_msg = request.getParameter("return_msg");
			
			mapParameter.put("grant_user", user_id);
			mapParameter.put("grant_yn", grant_yn);
			mapParameter.put("return_msg", return_msg);
			
			int result = 0;
			result = systemService.approveUserMng(mapParameter);
			
			model.addAttribute("errCd", "0");
			model.addAttribute("result", result);
			
		} catch (Exception e) {
			model.addAttribute("errCd", "-1");
			model.addAttribute("errMsg", e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	
	/**
	 * 회원정보 패스워드 초기화
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/initPassword
	 * @throws IOException
	 */
	@RequestMapping(value = "/initPassword.do")
	@ResponseBody
	public ModelAndView initPassword(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			
            StringBuffer buffer = new StringBuffer();
            SecureRandom random = new SecureRandom();

            String chars[] = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9".split(",");

            for (int i = 0; i < 8; i++) {
                buffer.append(chars[random.nextInt(chars.length)]);
            }
            
            String userId = request.getParameter("user_id");
            String imsiPw = buffer.toString().replaceAll(" ", "");
            String userPasswd = LoginUtil.toHash(userId, imsiPw);
            
            mapParameter.put("user_id", userId);
			mapParameter.put("user_pw", userPasswd);
			int result = systemService.initPassword(mapParameter);
			
			model.addAttribute("errCd", "0");
			model.addAttribute("result", imsiPw);
		} catch (Exception e) {
			model.addAttribute("errCd", "-1");
			model.addAttribute("errMsg", e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}

	/**
	 * 회원 데이터 초기화
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/initPassword
	 * @throws IOException
	 */
	@RequestMapping(value = "/initData.do")
	@ResponseBody
	public ModelAndView initData(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			
            
            String userId = request.getParameter("user_id");
            
            mapParameter.put("user_id", userId);
			int result = systemService.initData(mapParameter);
			
			model.addAttribute("errCd", "0");
			model.addAttribute("result", result);
		} catch (Exception e) {
			model.addAttribute("errCd", "-1");
			model.addAttribute("errMsg", e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	

	/**
	 * 기관접속정보 통계
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/getUserMngLst
	 * @throws IOException
	 */
	@RequestMapping(value = "/selectCountByUserInstGrp.do")
	@ResponseBody
	public ModelAndView selectCountByUserInstGrp(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			mapParameter.put("user_id", user_id);
			
			String instSeq = request.getParameter("instSeq");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");
			String term = request.getParameter("term");
			if (instSeq != null && !instSeq.equals("")) {
				mapParameter.put("instSeq", Integer.parseInt(instSeq));	
			} else {
				mapParameter.put("instSeq", 0);	
			}
			
			mapParameter.put("startDate", startDate);
			mapParameter.put("endDate", endDate);
			mapParameter.put("term", term);
			List<Map> DataLst = (List)systemService.selectCountByUserInstGrp(mapParameter);
			Map<String, Object> resultMap = systemService.selectStatByUserAuth(mapParameter);
			List<Map> instLst = (List)systemService.getInstitutionLst(mapParameter);
			
			model.addAttribute("result", DataLst);
			model.addAttribute("instLst", instLst);
			model.addAttribute("dataSum", resultMap);
			model.addAttribute("startDate", startDate);
			model.addAttribute("endDate", endDate);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * 통계청 데이터분석 현황
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/getCountByDataUsed
	 * @throws IOException
	 */
	@RequestMapping(value = "/getCountByDataUsed.do")
	@ResponseBody
	public ModelAndView getCountByDataUsed(
			@RequestParam(value="userDiv", required=false) String userDiv,
			@RequestParam(value="instSeq", required=false, defaultValue="0") int instSeq ,
			@RequestParam(value="startDate", required=false) String startDate,
			@RequestParam(value="endDate", required=false) String endDate,
			@RequestParam(value="selectTypeVal", required=false) String selectTypeVal,
			@RequestParam(value="term", required=false) String term,
			HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			
			mapParameter.put("instSeq", instSeq);
			mapParameter.put("startDate", startDate);
			mapParameter.put("endDate", endDate);
			
			List<Map> DataLst = (List)systemService.selectDataUsedTotalCount(mapParameter);
			List<Map> instLst = (List)systemService.getInstitutionLst(mapParameter);
			model.addAttribute("startDate", startDate);
			model.addAttribute("endDate", endDate);
			
			model.addAttribute("result", DataLst);
			model.addAttribute("instLst", instLst);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}

	/**
	 * 통계청 데이터분석 현황
	 * 
	 * @param request	
	 * @param response
	 * @return /api/sysmgt/getCountByDataUsed
	 * @throws IOException
	 */
	@RequestMapping(value = "/getSystemMonitor.do")
	@ResponseBody
	public ModelAndView getSystemMonitor(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		Map<String, Object> mapParameter = new HashMap<String, Object>();
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			
			List<Map> DataLst = (List)systemService.getSystemMonitor(mapParameter);
			List<Map> AgentLst = (List)systemService.getAgentMonitor(mapParameter);
			
			model.addAttribute("result", DataLst);
			model.addAttribute("agentLst", AgentLst);
			model.addAttribute("errCd","0");
		} catch (Exception e) {
			model.addAttribute("errCd","-1");
			model.addAttribute("errMsg",e.getMessage());
		}
		return new ModelAndView("jsonV",model);
	}
	
	/**
	 * @brief HDFS 파일 다운로드
	 * @param resVo
	 * @param downloadFileName
	 * @return
	 * @throws IllegalArgumentException
	 * @throws IOException
	 * @throws FileSystemException
	 * @throws InterruptedException 
	 * @throws JSONException 
	 */
	@RequestMapping(value = "/collectfiledownload")
	@ResponseBody
	public void downloadHDFS(HttpServletRequest request,
			@RequestParam(value="fn", required=false) String fileName, 
			@RequestParam(value="collect_seq", required=false) int collectSeq,
			@RequestParam(value="code", required=false) String code,
			HttpServletResponse response) 
	{
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
		try {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			
			HashMap<String,Object> parameterMap = new HashMap<String,Object>();
			JSONObject paramObj = new JSONObject();
			paramObj.put("FILE_NAME", fileName);
			paramObj.put("DATA_PATH", "/user/sop/users/kostat/collect/" + fileName);
			parameterMap.put( "PARAM", paramObj.toString() );
					
			//다운로드 로그
			Map<String, Object> mapParameter = new HashMap<String, Object>();
			mapParameter.put("file_name", fileName);
			mapParameter.put("collect_seq", collectSeq);
			mapParameter.put("code", code);
			mapParameter.put("user_id", user_id);
			int result = systemService.insertDownLog(mapParameter); 
			
			
			HttpResponseConnector client = new HttpResponseConnector( ConfigUtil.getString("rest.url") + "/downloadFile", HttpRequestKey.POST,  parameterMap);
			IResponseHandler handler = new FileWriteResponseHandler( response, fileName );
			client.setResponseHandler( handler );
			client.connect();
			
			/*
			//하둡파일 다운로드
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
	
			String hdpUser = props.getProperty("Globals.hadoop_user"); 
			String hdpDefault = props.getProperty("Globals.hadoop_location"); 
			System.setProperty("hadoop.home.dir", props.getProperty("Globals.hadoop_home"));
			System.setProperty("javax.xml.parsers.DocumentBuilderFactory", "com.sun.org.apache.xerces.internal.jaxp.DocumentBuilderFactoryImpl");
			
			org.apache.hadoop.conf.Configuration conf = new org.apache.hadoop.conf.Configuration();
		    conf.addResource(new Path("/usr/local/hadoop/etc/hadoop/core-site.xml"));
		    conf.addResource(new Path("/usr/local/hadoop/etc/hadoop/hdfs-site.xml"));
			conf.set("fs.defaultFS", hdpDefault);
			
			org.apache.hadoop.fs.FileSystem dfs = org.apache.hadoop.fs.FileSystem.get(URI.create(hdpDefault), conf, hdpUser);
	
			//System.out.println("Home Path : " + dfs.getHomeDirectory());
			//System.out.println("Work Path : " + dfs.getWorkingDirectory());
			
			String fileDown = props.getProperty("Globals.collect_path") + fileName;
			
			org.apache.hadoop.fs.Path filenamePath = new org.apache.hadoop.fs.Path(fileDown);
			org.apache.hadoop.fs.FSDataInputStream inputStream = dfs.open(filenamePath);
			
			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition","attachment;filename=\"" +fileName+"\";");
			
			ServletOutputStream out = response.getOutputStream();
			 
			byte[] outputByte = new byte[4096];
			while(inputStream.read(outputByte, 0, 4096) != -1)
			{
				out.write(outputByte, 0, 4096);
				out.flush();
			}
			if (out!=null) out.close();
			if (inputStream!=null) inputStream.close();
			*/
		} catch (IllegalArgumentException | SQLException e1) {
			logger.info(e1.getMessage());
		}
	}

	/**
	 * <pre>
	 * 내 데이터 파일을 업로드한다. 
	 * </pre>
	 * @param Model model
	 * @param ResourceData rData
	 * 
	 * @param HttpServletRequest request
	 * @param HttpServletResponse response
	 * @return
	 */
	@RequestMapping(value="/fileupload", method = RequestMethod.POST, produces="text/html")
	public String upload(
			Model model,
			MultipartHttpServletRequest fileRequest,
			HttpServletRequest request,
			HttpServletResponse response) throws IOException{
		
		logger.info( "=== 내 데이터 파일 업로드 === " );
		
		JSONObject res = new JSONObject();
		
		String login_id = (String)request.getSession().getAttribute("user_id");
		try {
			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String restUrl = props.getProperty("Globals.restUrl");
			
			Iterator<String> iter = fileRequest.getFileNames();
			
			HashMap<String,Object> parameterMap = new HashMap<String,Object>();
			JSONObject paramObj = new JSONObject();
			
			while( iter.hasNext() ) {
				String filename = iter.next();

				paramObj.put("FILE_NAME", filename);
				parameterMap.put( "PARAM", paramObj.toString() );
				
				MultipartFile file = fileRequest.getFile( filename );
				
				HttpMultipartConnector client = new HttpMultipartConnector(restUrl + "/data/upload", parameterMap, file.getInputStream() );
				IResponseHandler handler = new NormalResponseHandler( response, false );
				
				client.setResponseHandler(handler);
				client.connect();
			}
			
			model.addAttribute("success", true);
		} catch (IOException e) {
			model.addAttribute("success", false);
			res.put("error", e.getMessage());
		} catch (NumberFormatException e) {
			model.addAttribute("success", false);
			res.put("error", "저장공간의 남은 용량을 확인하던 중 에러가 발생하였습니다.");
		}
		
		model.addAttribute("data", res);
			
		return "uploadTpl";
	}
	
    /**
     * @brief PG 테이블 다운로드
     * @param resVo
     * @param downloadFileName
     * @return
     * @throws ClassNotFoundException
     * @throws SQLException
     * @throws IOException
     * http://localhost:8080/api/sysmgt/downloadPG.do?schemaNm=kostat&tableNm=legcode
     */
	@RequestMapping(value = "/downloadPG.do")
	@ResponseBody
    public void downloadPGToCSV(
    		@RequestParam(value="schemaNm", required=false) String schemaNm, 
    		@RequestParam(value="tableNm", required=false) String tableNm,
    		@RequestParam(value="qryTxt", required=false) String qryTxt,
    		@RequestParam(value="work_no", required=false) String workNo, 
    		HttpServletRequest request, HttpServletResponse response)
	    throws ClassNotFoundException, SQLException, IOException {
		String query = "";
		String fileName = "";
		if (schemaNm == null) {
			String user_id = (String)request.getSession().getAttribute("user_id");
			if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
			schemaNm = user_id;
		}
		if (tableNm == null && qryTxt == null && workNo == null) {
			throw new AuthorityException ("잘못된 접근입니다.");
		} else {
			if (tableNm != null && !tableNm.trim().equals("")) {
				query = "select * from " + schemaNm + "." + tableNm ;
				fileName = tableNm + ".csv";
			} else if (workNo != null && !workNo.trim().equals("")) {
				Map mapParameter = new HashMap();
				mapParameter.put("work_no", Integer.parseInt(workNo));
				
				Map result = prjMngService.getGridInfoDetail(mapParameter);
				
				query = ("" + result.get("query")).replaceAll("&apos;", "'").replaceAll("km'", "k'");
				
				fileName = DateUtil.getGenerateId("encoding") + ".txt";
			} else {
				query = qryTxt.replaceAll(";", "");
				fileName = DateUtil.getGenerateId("") + ".csv";
			}
		}
		
		
		String outPath = ConfigUtil.getString("fileUpload.defaultPath");
		FileWriter pgWriter = new FileWriter(outPath + fileName);
		DBConnector pgConn = new OpenPGSql();
	
		String database = ConfigUtil.getString("jdbc.userdb.url") + "/" + ConfigUtil.getString("jdbc.userdb.database");
		String pass = ConfigUtil.getString("jdbc.userdb.password");
		String dbname = ConfigUtil.getString("jdbc.userdb.username");
	
		BufferedReader inputStream = null;
	
		try {
		    pgConn.openConn(database, dbname, pass);
		    CopyManager copyManager = new CopyManager((BaseConnection) pgConn.getConn());
		    String copyQuery = "COPY (" + query + ") TO STDOUT WITH DELIMITER AS '|' NULL AS '' CSV HEADER ";
	
		    //logger.info("쿼리 : " + copyQuery);
		    copyManager.copyOut(copyQuery, pgWriter);
		    pgWriter.close();
		    
		    //String fileName2 = DateUtil.getGenerateId("encoding") + ".txt";
		    //FileUtil.changeEncoding("UTF-8", outPath + fileName, "UTF-8", outPath + fileName2);
		    inputStream = new BufferedReader(
			    new InputStreamReader(new FileInputStream(new File(outPath + fileName)), "UTF-8"));
		    
		    response.setHeader("Content-Disposition", "attachment;filename=" + fileName);
		    response.setContentType("text/plain");
		    response.setCharacterEncoding("UTF-8");
	
		    OutputStream out = response.getOutputStream();
			FileInputStream fis = new FileInputStream(outPath + fileName);
			FileCopyUtils.copy(fis, out);
			out.flush();
			
			if (fis != null) fis.close();
			if (out != null) out.close();
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		} finally {
		    pgConn.closeConn();
		    if (pgWriter != null)
			pgWriter.close();
		    File file = new File(outPath + fileName);
		    file.delete();
		    file = new File(outPath + fileName);
		    file.delete();
		    if (inputStream != null) {
			inputStream.close();
		    }
		}

    }
	
    /**
     * @brief PG 테이블 다운로드
     * @param resVo
     * @param downloadFileName
     * @return
     * @throws ClassNotFoundException
     * @throws SQLException
     * @throws IOException
     * http://localhost:8080/api/sysmgt/downloadPG.do?schemaNm=kostat&tableNm=legcode
     */
	@RequestMapping(value = "/downloadUser.do")
	@ResponseBody
    public void downloadUser(
    		HttpServletRequest request, HttpServletResponse response)
	    throws ClassNotFoundException, SQLException, IOException {
		String query = "SELECT user_no, user_id, user_nm, (SELECT inst_nm FROM institution WHERE inst_seq = member.inst_seq) institute, dept, job_pos, CASE WHEN user_div = 'e' THEN '타기관사용자' WHEN user_div = 'i' THEN '통계청사용자' WHEN user_div = 'd' THEN '데이터관리자' WHEN user_div = 'i' THEN '통계청사용자' WHEN user_div = 's' THEN '통계데이터센터' WHEN user_div = 'o' THEN '플랫폼운영자' WHEN user_div = 'a' THEN '서비스관리자' END user_div, TO_CHAR(reg_ts, 'YYYY-MM-DD') as reg_ts FROM member ORDER BY reg_ts DESC";
		String fileName = "userlist.csv";
		String user_id = (String)request.getSession().getAttribute("user_id");
		if (user_id == null) throw new AuthorityException ("세션정보가 만료되었습니다.");
		
		
		String outPath = ConfigUtil.getString("fileUpload.defaultPath");
		FileWriter pgWriter = new FileWriter(outPath + fileName);
		DBConnector pgConn = new OpenPGSql();
	
		String database = ConfigUtil.getString("jdbc.system.url") + "/" + ConfigUtil.getString("jdbc.system.database");
		String pass = ConfigUtil.getString("jdbc.system.password");
		String dbname = ConfigUtil.getString("jdbc.system.username");
	
		BufferedReader inputStream = null;
	
		try {
		    pgConn.openConn(database, dbname, pass);
		    CopyManager copyManager = new CopyManager((BaseConnection) pgConn.getConn());
		    String copyQuery = "COPY (" + query + ") TO STDOUT WITH DELIMITER AS ',' NULL AS '' CSV HEADER ";
	
		    //logger.info("쿼리 : " + copyQuery);
		    copyManager.copyOut(copyQuery, pgWriter);
		    pgWriter.close();
		    
		    String fileName2 = DateUtil.getGenerateId("encoding") + ".csv";
		    FileUtil.changeEncoding("UTF-8", outPath + fileName, "MS949", outPath + fileName2);
		    inputStream = new BufferedReader(
			    new InputStreamReader(new FileInputStream(new File(outPath + fileName2)), "MS949"));
		    
		    response.setHeader("Content-Disposition", "attachment;filename=" + fileName);
		    response.setContentType("text/plain");
		    response.setCharacterEncoding("MS949");
	
		    OutputStream out = response.getOutputStream();
			FileInputStream fis = new FileInputStream(outPath + fileName2);
			FileCopyUtils.copy(fis, out);
			out.flush();
			
			if (fis != null) fis.close();
			if (out != null) out.close();
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		} finally {
		    pgConn.closeConn();
		    if (pgWriter != null)
			pgWriter.close();
		    File file = new File(outPath + fileName);
		    file.delete();
		    file = new File(outPath + fileName);
		    file.delete();
		    if (inputStream != null) {
			inputStream.close();
		    }
		}

    }

	@RequestMapping(value="/new_daum_api.do")
	@ResponseBody
	public JSONObject daumApi(HttpServletRequest request, HttpServletResponse response) {
		String query = (String)request.getParameter("query");
		String key = (String)request.getParameter("key");
		
		String outerPath = "http://10.134.2.101:20000";
		HashMap<String, Object> data = new HashMap<String, Object>();
		data.put("query", query);
		data.put("key", key);
		
		//System.out.println("outerPath>>" + outerPath);
		//System.out.println("query>>" + query);
		//System.out.println("key>>" + key);
		
		HttpJSONConnector htc = new HttpJSONConnector(outerPath + "/new_daum_api", "POST", data);
		JSONObject result = htc.connectWithParse();
		
		return result;
	}
	
	@RequestMapping(value="/api/worknet")
	@ResponseBody
	public JSONObject innerWorknetApi(@RequestParam( value="PageCount", required=false, defaultValue = "1" ) int pageCount) throws Exception {
		JSONObject result = new JSONObject();
		String outerPath = ConfigUtil.getString("inner.url");
		HashMap<String, Object> requestData;
		HttpJSONConnector connector;
		int tryCount;
		
		requestData = new HashMap<String, Object>();
		requestData.put("PageCount", pageCount);
		
		tryCount = 0;
		
		while (true) {
			try {
				connector = new HttpJSONConnector(outerPath + "/api/worknet", "POST", requestData);
				result = connector.connectWithParse();
				
				if (result == null) {
					throw new Exception("Connect Failed: " + outerPath + "/api/worknet");
				}
				
				break;
			} catch (Exception e) {
				e.printStackTrace();
				
				if (tryCount > 5) {
					break;
				}
				
				tryCount++;
				Thread.sleep(60000);
			}
		}
		
		return result;
	}
	
	@RequestMapping(value="/api/worknetTotal")
	@ResponseBody
	public JSONObject innerWorknetApiTotal(@RequestParam( value="PageCount", required=false, defaultValue = "1" ) int pageCount) throws Exception {
		JSONObject result = new JSONObject();
		String outerPath = ConfigUtil.getString("inner.url");
		HashMap<String, Object> requestData;
		HttpJSONConnector connector;
		JSONObject resultJson;
		int tryCount;
		
		
		requestData = new HashMap<String, Object>();
		requestData.put("PageCount", pageCount);
		
		tryCount = 0;
		
		while (true) {
			try {
				connector = new HttpJSONConnector(outerPath + "/api/worknetTotal", "POST", requestData);
				result = connector.connectWithParse();
				
				if (result == null) {
					throw new Exception("Connect Failed: " + outerPath + "/api/worknetTotal");
				}
				
				break;
			} catch (Exception e) {
				e.printStackTrace();
				
				if (tryCount > 5) {
					break;
				}
				
				tryCount++;
				Thread.sleep(60000);
			}
		}
		
		return result;
	}
	
	
	@RequestMapping(value="/api/saramin")
	@ResponseBody
	public JSONObject innerSararminApi(@RequestParam( value="PageCount", required=false, defaultValue = "1" ) int pageCount) throws Exception {
		JSONObject result = new JSONObject();
		String outerPath = ConfigUtil.getString("inner.url");
		HashMap<String, Object> requestData;
		HttpJSONConnector connector;
		int tryCount;
		
		requestData = new HashMap<String, Object>();
		requestData.put("PageCount", pageCount);
		
		tryCount = 0;
		
		while (true) {
			try {
				connector = new HttpJSONConnector(outerPath + "/api/saramin", "POST", requestData);
				result = connector.connectWithParse();
				
				if (result == null) {
					throw new Exception("Connect Failed: " + outerPath + "/api/saramin");
				}
				
				break;
			} catch (Exception e) {
				e.printStackTrace();
				
				if (tryCount > 5) {
					break;
				}
				
				tryCount++;
				Thread.sleep(60000);
			}
		}
		
		return result;
	}

	@RequestMapping(value="/api/saraminTotal")
	@ResponseBody
	public JSONObject innerSaraminApiTotal(@RequestParam( value="PageCount", required=false, defaultValue = "1" ) int pageCount) throws Exception {
		JSONObject result = new JSONObject();
		String outerPath = ConfigUtil.getString("inner.url");
		HashMap<String, Object> requestData;
		HttpJSONConnector connector;
		JSONObject resultJson;
		int tryCount;
		
		
		requestData = new HashMap<String, Object>();
		requestData.put("PageCount", pageCount);
		
		tryCount = 0;
		
		while (true) {
			try {
				connector = new HttpJSONConnector(outerPath + "/api/saraminTotal", "POST", requestData);
				result = connector.connectWithParse();
				
				if (result == null) {
					throw new Exception("Connect Failed: " + outerPath + "/api/saraminTotal");
				}
				
				break;
			} catch (Exception e) {
				e.printStackTrace();
				
				if (tryCount > 5) {
					break;
				}
				
				tryCount++;
				Thread.sleep(60000);
			}
		}
		
		return result;
	}

	@RequestMapping(value="/api/incruit")
	@ResponseBody
	public JSONObject innerIncruitApi() throws Exception {
		JSONObject result = new JSONObject();
		String outerPath = ConfigUtil.getString("inner.url");
		HashMap<String, Object> requestData;
		HttpJSONConnector connector;
		JSONObject resultJson;
		int tryCount;
		
		requestData = new HashMap<String, Object>();
		
		tryCount = 0;
		
		while (true) {
			try {
				connector = new HttpJSONConnector(outerPath + "/api/incruit", "POST", requestData);
				result = connector.connectWithParse();
				
				System.out.println("자료 수신이 완료 되었습니다");
				
				if (result == null) {
					throw new Exception("Connect Failed: " + outerPath + "/api/incruit");
				}
				
				break;
			} catch (Exception e) {
				e.printStackTrace();
				
				if (tryCount > 5) {
					break;
				}
				
				tryCount++;
				Thread.sleep(60000);
			}
		}
		
		return result;
	}
	

	@RequestMapping(value="/hivejob.do")
	@ResponseBody
	public JSONObject hiveJob(HttpServletRequest request, HttpServletResponse response) {
		String prj_master_hst_seq = (String)request.getParameter("prj_master_hst_seq");
		String job_setup_seq = (String)request.getParameter("job_setup_seq");
		String qry_txt = (String)request.getParameter("qry_txt");
		
		String outerPath = ConfigUtil.getString("rest.url");
		HashMap<String, Object> data = new HashMap<String, Object>();
		data.put("prj_master_hst_seq", prj_master_hst_seq);
		data.put("job_setup_seq", job_setup_seq);
		data.put("qry_txt", qry_txt);
		
		HttpJSONConnector htc = new HttpJSONConnector(outerPath + "/hiveJob", "POST", data);
		JSONObject result = htc.connectWithParse();
		
		return result;
	}
	

	@RequestMapping(value="/kairosMv.do")
	@ResponseBody
	public JSONObject kairosMv(HttpServletRequest request, HttpServletResponse response) {
		String table = (String)request.getParameter("table");
		String kairosTbl = (String)request.getParameter("kairosTbl");
		
		String outerPath = ConfigUtil.getString("rest.url");
		HashMap<String, Object> data = new HashMap<String, Object>();
		data.put("table", table);
		data.put("kairosTbl", kairosTbl);
		
		HttpJSONConnector htc = new HttpJSONConnector(outerPath + "/kairosMv", "POST", data);
		
		System.out.println(outerPath + "/kairosMv?table=" + table + "&kairosTbl=" + kairosTbl);
		JSONObject result = htc.connectWithParse();
		System.out.println(result.toString());
		return result;
	}
	
	private String null2empty(String str) {
		if (str == null) return "";
		return str;
	}
}
	