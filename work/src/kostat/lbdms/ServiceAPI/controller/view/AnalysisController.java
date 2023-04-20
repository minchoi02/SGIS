package kostat.lbdms.ServiceAPI.controller.view;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.ui.ModelMap;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.neighborsystem.durian.exception.AbsAPIException;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.security.SecureDB;
import kostat.lbdms.ServiceAPI.common.security.Security;
import kostat.lbdms.ServiceAPI.common.util.StringUtil;
import kostat.lbdms.ServiceAPI.controller.service.AnalysisService;
import kostat.lbdms.ServiceAPI.controller.service.AnalysisUserService;
import kostat.lbdms.ServiceAPI.controller.service.DataCreateService;
import kostat.lbdms.ServiceAPI.exception.ApiException;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;

/**
 * 1. 기능 : 대화형통계지도 관련 컨트롤러.<p>
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
@RequestMapping(value="/view/analysis")
public class AnalysisController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(AnalysisController.class);
	
	@Resource(name="analysisService")
	private AnalysisService analysisService;
	
	@Resource(name="analysisUserService")
	private AnalysisUserService analysisUserService;
	
	@Resource(name = "dataCreateService")
	private DataCreateService dataCreateService;
	
	/**
	 * 활용사례
	 * @param request
	 * @param response
	 * @return guide/guideMain
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/analysisGuide")
	public ModelAndView analysisGuide(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("dataAnalysis/analysisGuide");
	}
	
	
	/**
	 * 데이터 분석
	 * @param request
	 * @param response
	 * @return map/interactiveMap
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/analysisMain")
	public ModelAndView interactiveMap(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String type = (String)request.getParameter("type");
		if (type != null) {
			model.addAttribute("type", type);
		}else {
			model.addAttribute("type", "");
		}
		return new ModelAndView("dataAnalysis/analysisMain");
	}
	
	/**
	 * 데이터 분석-조건설정
	 * @param request
	 * @param response
	 * @return map/interactiveMap
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/setting/{type}")
	public ModelAndView analysisDetailView(@PathVariable String type, HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		if (type == null || 
		   (!type.equals("boundary")  && //경계분석 
		    !type.equals("voronoi")   && //보로노이다이어그램
		    !type.equals("buffer")    && //버퍼분석
		    !type.equals("location")  && //입지계수
		    !type.equals("operation") && //데이터간연산분석
		    !type.equals("spatial"))) {  //공간자기상관분석
			return new ModelAndView("common/errorCode");
		}

		return new ModelAndView("dataAnalysis/analysisDetailView");
	}
	
	/**
	 * 데이터 분석-결과화면
	 * @param request
	 * @param response
	 * @return map/interactiveMap
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/resultMap")
	public ModelAndView analysisResultView(/*@PathVariable String type, */HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String resourceId = (String)request.getParameter("id");
		if (resourceId == null) {
			return new ModelAndView("common/errorCode");
		}
		
		HttpSession session = request.getSession();
		String user_id = (String)session.getAttribute("user_id");
		if (user_id == null) {
			return new ModelAndView("common/errorCode");
		}
		
		try {
			
			//분석결과 메인정보 조회
			Map mapParameter = new HashMap();
			mapParameter.put("resource_id", Long.parseLong(resourceId));
			Map analysisInfo = (Map)analysisService.getAnalysisInfo(mapParameter);
			
			if (analysisInfo == null) {
				return new ModelAndView("common/errorCode");
			}
			
			String dataNm = (String)analysisInfo.get("data_name");
			String posColumnDesc = (String)analysisInfo.get("pos_column_desc");
			String tmpUserId = (String)analysisInfo.get("user_id");
			
			//분석실행정보 조회
			Map tmpParam = new HashMap();
			tmpParam.put("data_nm", dataNm);
			tmpParam.put("user_id", tmpUserId);
			Map analysisExecuteInfo = (Map)analysisService.getAnalysisExecuteInfoFromId(tmpParam);
			
			if (analysisExecuteInfo == null) {
				return new ModelAndView("common/errorCode");
			}
			
			String executeId = (String)analysisExecuteInfo.get("execute_id");
			String startTime = (String)analysisExecuteInfo.get("start_time");
			String endTime = (String)analysisExecuteInfo.get("end_time");
			
			if (posColumnDesc != null) {
				JSONObject posColumnDescJson = new JSONObject(posColumnDesc);
				analysisInfo.put("pos_column_desc", posColumnDescJson);
			}
			
			analysisInfo.put("start_time", startTime);
			analysisInfo.put("end_time", endTime);
			JSONObject info = new JSONObject(analysisInfo);
			model.addAttribute("info", info.toString());
			
			//분석파라미터정보 조회
			tmpParam.put("execute_id", executeId);
			Map analysisParamInfo = (Map)analysisService.getAnalysisParamInfo(tmpParam);
			
			if (analysisParamInfo == null) {
				return new ModelAndView("common/errorCode");
			}
			
			String params = (String)analysisParamInfo.get("param");
			JSONObject paramJson = new JSONObject(params);
			analysisParamInfo.put("param", paramJson);
			JSONObject paramInfo = new JSONObject(analysisParamInfo);
			model.addAttribute("paramInfo", paramInfo.toString());			
		}catch(Exception e) {
			return new ModelAndView("common/errorCode");
		}
		
		return new ModelAndView("dataAnalysis/analysisResultView");
	}
	
	/**
	 * 데이터 분석-데이터보드
	 * @param request
	 * @param response
	 * @return analysis/analysisDataBoard
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/analysisDataBoard")
	public ModelAndView analysisDataBoard(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("dataAnalysis/analysisDataBoard");
	}
		
}