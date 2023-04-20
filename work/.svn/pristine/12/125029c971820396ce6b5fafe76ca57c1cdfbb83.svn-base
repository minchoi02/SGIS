package kostat.lbdms.ServiceAPI.controller.view;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.json.JSONException;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;

import kostat.lbdms.ServiceAPI.common.util.JSONConvertUtil;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;

import kostat.lbdms.ServiceAPI.controller.service.MemberService;
import kostat.lbdms.ServiceAPI.controller.service.MyDataService;

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
 * @author 최종 수정자 : 최재영
 * @version 1.0
 * @see
 *      <p/>
 */
@Controller
@Interceptor("CallLogger")
@RequestMapping(value = "/view/myData")
public class MyDataController {
	private final Log		logger		= LogFactory.getLog(MyDataController.class);
	
	@Resource(name = "myDataService")
	private MyDataService	myDataService;
	
	@Resource(name = "memberService")
	private MemberService	memberService;
	
	String					charsets[]	= { "UTF8", "CP949" };
	
	/**
	 * 나의 데이터 생성 화면 이동
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/myDataCreate
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value = "/myDataCreate")
	public ModelAndView myDataCreate(HttpServletRequest request, HttpServletResponse response, ModelAndView mav) {
		HttpSession session = request.getSession();
		String user_id = (String) session.getAttribute("user_id");
		
		String resource_id = request.getParameter("resource_id");
		if (resource_id != null) {
			mav.addObject("resource_id", resource_id);
			mav.addObject("modifyData", true);
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("resource_id", resource_id);
			try {
				Map<String, Object> info = myDataService.searchMyDataInfo(paramMap);
				mav.addObject("output_table_name", info.get("data_nm"));
				mav.addObject("schema", user_id);
			} catch (SQLException e) {
				
			}
			
		} else {
			String randomString = "";
			boolean exist = true;
			int wCnt = 0;
			while (exist) {
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
				randomString = user_id + formatter.format(new java.util.Date());
				
				try {
					int count = myDataService.dataNameExists(user_id, randomString);
					if (count == 0) {
						exist = false;
					} else {
						wCnt++;
					}
					
					if (wCnt > 3) {
						break;
					}
				} catch (SQLException e) {
					logger.error(e);
				}
			}
			
			String show_output_table_name = user_id;
			mav.addObject("show_output_table_name", randomString);
			mav.addObject("modifyData", false);
		}
		
		mav.addObject("user_id", user_id);
		mav.setViewName("myData/myDataCreate");
		return mav;
	}
	
	/**
	 * 데이터 생성 및 관리
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/myDataManagement
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value = "/myDataManagement")
	public ModelAndView myDatamanagement(HttpServletRequest request, HttpServletResponse response, ModelAndView mav) {
		HttpSession session = request.getSession();
		String user_id = (String) session.getAttribute("user_id");
		
		String search_standard = request.getParameter("standard");
		
		mav.addObject("user_id", user_id);
		mav.addObject("search_standard", search_standard);
		mav.setViewName("myData/myDataManagement");
		return mav;
	}
	
	/**
	 * 나의 데이터 상세보기
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/myDataDetail.do
	 * @throws SQLException
	 * @throws JSONException
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value = "/myDataDetail")
	public ModelAndView myDataDetail(HttpServletRequest request, HttpServletResponse response, ModelAndView mav) throws SQLException, JSONException {
		String resource_id = request.getParameter("resource_id");
		String prevPageNumber = request.getParameter("prevPageNumber");
		String prevViewCnt = request.getParameter("prevViewCnt");
		String prevSearchStandard = request.getParameter("prevSearchStandard");
		String prevSerarchWord = request.getParameter("prevSerarchWord");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		
		paramMap.put("resource_id", resource_id);
		
		Map<String, Object> info = myDataService.searchMyDataInfo(paramMap);
		
		String user_id = info.get("user_id").toString();
		String data_nm = info.get("data_nm").toString();
		
		if (!info.containsKey("kor_column_desc")) {
			org.json.JSONArray jarry = myDataService.createKorColumnGridData(user_id, data_nm, resource_id);
			info.put("kor_column_desc", jarry.toString());
		}
		
		paramMap.put("user_id", user_id);
		paramMap.put("data_nm", data_nm);
		paramMap.put(RequestKey.OFFSET, 0);
		paramMap.put(RequestKey.LIMIT, 10);
		paramMap.put(RequestKey.SORT_COLUMN, "rid");
		paramMap.put(RequestKey.SORT_TYPE, "asc");
		Map<String, Object> resourceInfo = myDataService.selectResourceInfo(paramMap);
		List<Map<String, Object>> columnDataType = myDataService.selectColumnsDataType(paramMap);
		
		mav.addObject("resource_id", resource_id);
		mav.addObject("prevPageNumber", prevPageNumber);
		mav.addObject("prevViewCnt", prevViewCnt);
		mav.addObject("prevSearchStandard", prevSearchStandard);
		mav.addObject("prevSerarchWord", prevSerarchWord);
		// resource
		
		mav.addObject("resourceInfo", JSONConvertUtil.mapToJson((Map<String, Object>) resourceInfo.get("info")));
		mav.addObject("resourceList", JSONConvertUtil.ListToJSONArray((List<Map<String, Object>>) resourceInfo.get("resource")));
		mav.addObject("columnDataType", JSONConvertUtil.ListToJSONArray(columnDataType));
		
		mav.setViewName("myData/myDataDetail");
		return mav;
	}
	
	/**
	 * 나의 데이터 지도
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/resultMap
	 * @throws SQLException
	 * @throws JSONException
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value = "/resultMap")
	public ModelAndView resultMap(HttpServletRequest request, HttpServletResponse response, ModelAndView mav) {
		String resource_id = request.getParameter("resource_id");
		String limit = request.getParameter("limit");
		String page = request.getParameter("page");
		
		
		// resource_id = > resource 정보
		// user_id + data_nm => talbe 정보
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("resource_id", resource_id);
		
		if (limit != null) {
			paramMap.put("LIMIT", limit);
			if (page != null) {
				int offset = (Integer.parseInt(page) - 1) * Integer.parseInt(limit);
				paramMap.put("OFFSET", offset);
			}
		}
		
		try {
			Map<String, Object> info = myDataService.searchMyDataInfo(paramMap);
			String user_id = info.get("user_id").toString();
			String data_nm = info.get("data_nm").toString();
			paramMap.put("user_id", user_id);
			paramMap.put("data_nm", data_nm);
			
			if (!info.containsKey("kor_column_desc")) {
				org.json.JSONArray jarry = myDataService.createKorColumnGridData(user_id, data_nm, resource_id);
				info.put("kor_column_desc", jarry.toString());
			}
			
			Map<String, Object> resourceInfo = myDataService.selectResourceInfo(paramMap);
			List<Map<String, Object>> columnDataType = myDataService.selectColumnsDataType(paramMap);
			mav.addObject("resourceInfo", JSONConvertUtil.mapToJson((Map<String, Object>) resourceInfo.get("info")));
			mav.addObject("resourceList", JSONConvertUtil.ListToJSONArray((List<Map<String, Object>>) resourceInfo.get("resource")));
			mav.addObject("columnDataType", JSONConvertUtil.ListToJSONArray(columnDataType));
			
		} catch (SQLException e) {
			mav.addObject("errorMessage", e);
		} catch (JSONException e) {
			mav.addObject("errorMessage", e);
		}
		mav.setViewName("myData/myDataResultView");
		return mav;
	}
	
	/**
	 * 나의 데이터 상세보기 지오코딩 화면
	 * 
	 * @param request
	 * @param response
	 * @return /view/myData/myDataDetailGeoCoding
	 * @throws SQLException
	 * @throws JSONException
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value = "/myDataDetailGeoCoding")
	public ModelAndView dataDetailAnalysis(HttpServletRequest request, HttpServletResponse response, ModelAndView mav) {
		
		HttpSession session = request.getSession();
		String user_id = (String) session.getAttribute("user_id");
		String resource_id = request.getParameter("resource_id");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("resource_id", resource_id);
		Map<String, Object> info = null;
		try {
			info = myDataService.searchMyDataInfo(paramMap);
			mav.addObject("info", JSONConvertUtil.mapToJson(info));
		} catch (SQLException e) {
			mav.addObject("errorMessage", e);
		} catch (JSONException e) {
			mav.addObject("errorMessage", e);
		}
		String data_nm = info.get("data_nm").toString();
		
		mav.addObject("schema", user_id);
		mav.addObject("data_nm", data_nm);
		mav.addObject("resultCnt", 10);
		mav.addObject("startIdx", 0);
		mav.addObject("resource_id", resource_id);
		mav.addObject("status", true);
		
		mav.setViewName("myData/myDataDetailGeoCoding");
		return mav;
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value = "/myDataBoard")
	public ModelAndView myDataBoard(HttpServletRequest request, HttpServletResponse response, ModelAndView mav) {
		mav.setViewName("myData/myDataBoard");
		return mav;
	}
	
	
}
