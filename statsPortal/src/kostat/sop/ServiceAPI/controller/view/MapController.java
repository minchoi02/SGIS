package kostat.sop.ServiceAPI.controller.view;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.neighborsystem.durian.exception.AbsAPIException;

import kostat.sop.ServiceAPI.api.common.ThemeCdCommon;	// 2020년 SGIS고도화 3차(테마코드)
import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.common.security.SecureDB;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.MapService;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.common.security.Security;

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
@RequestMapping(value="/view/map")
public class MapController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(MapController.class);
	
	@Resource(name="mapService")
	private MapService mapService;
	
	// 2020년 SGIS고도화 3차(테마코드) 시작 - 테마코드 공통기능 빈객체 추가 (pse)
	@Resource(name = "themeCdCommon")
	private ThemeCdCommon themeCdCommon;
	// 2020년 SGIS고도화 3차(테마코드) 끝
	
	/**
	 * 대화형 통계지도
	 * @param request
	 * @param response
	 * @return map/interactiveMap
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/interactiveMap")
	public ModelAndView interactiveMap(HttpServletRequest request, HttpServletResponse response) {
		// 2020년 SGIS고도화 3차(테마코드) 시작  - bizStatsLeftMenu, bizStatsDataBoard, bizStatsHelper 에서 공통으로 사용할 변수 선언, 왼쪽메뉴 및 데이터보드를 위해서는 필수이다. (pse)
		List<Map<String, Object>> allThemeCdInfo = themeCdCommon.selectAllCensusThemeInfo();
		request.setAttribute("allThemeCdInfo", allThemeCdInfo);
		// 2020년 SGIS고도화 3차(테마코드) 끝 (pse)
		return new ModelAndView("map/interactiveMap");
	}
	
	/**
	 * 대화형 통계지도 서브메인
	 * @param request
	 * @param response
	 * @return map/interactiveMap
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/interactiveMapMain")
	public ModelAndView interactiveMapMain(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("interactiveMapMain");
		return new ModelAndView("map/interactiveMapMain");
	}
	
	/**
	 * 대화형 통계지도 연관검색
	 * @param request
	 * @param response
	 * @return map/interactiveMap/{type}
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/interactiveMap/{type}")
	public ModelAndView census(@PathVariable String type, HttpServletRequest request, HttpServletResponse response) {
		SqlSession session = null;
		Map paramInfo = new HashMap();
		try {
			logger.info("START Query - select interactiveMap param Info");
			
			//2017.12.06 [개발팀] 취약점점검
			type = Security.cleanXss(type);
			
			if (type.equals("bookmark") || type.equals("sharedata")) {
				
				String hist_id = request.getParameter("id");
				hist_id = Security.cleanXss(hist_id);
				hist_id = Security.sqlInjectionCheck(hist_id);
				
				
				Map mapParameter = new HashMap();
				mapParameter.put("hist_id", hist_id);
				List bookmarkList = mapService.getStatistcsHistoryParamInfo(mapParameter);
				
				JSONArray tmpbookmarkList = new JSONArray();
				JSONObject bookmarkInfo;
				for (int i=0; i<bookmarkList.size(); i++) {
					HashMap tmpBookmarkInfo = (HashMap)bookmarkList.get(i);
					bookmarkInfo = new JSONObject();
					bookmarkInfo.put("hist_type",tmpBookmarkInfo.get("hist_type"));
					bookmarkInfo.put("hist_id",tmpBookmarkInfo.get("hist_id"));
					bookmarkInfo.put("hist_nm",tmpBookmarkInfo.get("hist_nm"));
					bookmarkInfo.put("map_type",tmpBookmarkInfo.get("map_type"));
					bookmarkInfo.put("seq",tmpBookmarkInfo.get("seq"));
					bookmarkInfo.put("api_call_url",tmpBookmarkInfo.get("api_call_url"));
					bookmarkInfo.put("param_info",tmpBookmarkInfo.get("param_info"));
					tmpbookmarkList.put(bookmarkInfo.toString());
				}
				paramInfo.put("type", type);
				paramInfo.put("paramObj", tmpbookmarkList.toString());
				
			}
			else if(type.equals("recentdata")){
				String hist_id = request.getParameter("id");
				
				hist_id = Security.cleanXss(hist_id);
				hist_id = Security.sqlInjectionCheck(hist_id);
				
				Map mapParameter = new HashMap();
				mapParameter.put("hist_id", hist_id);
				List bookmarkList = mapService.getMainRecentParamInfo(mapParameter);
				
				JSONArray tmpbookmarkList = new JSONArray();
				JSONObject bookmarkInfo;
				for (int i=0; i<bookmarkList.size(); i++) {
					HashMap tmpBookmarkInfo = (HashMap)bookmarkList.get(i);
					bookmarkInfo = new JSONObject();
					bookmarkInfo.put("hist_id",tmpBookmarkInfo.get("hist_id"));
					bookmarkInfo.put("hist_nm",tmpBookmarkInfo.get("title"));
					bookmarkInfo.put("ex_type",tmpBookmarkInfo.get("ex_type"));
					bookmarkInfo.put("seq",tmpBookmarkInfo.get("seq"));
					bookmarkInfo.put("api_call_url",tmpBookmarkInfo.get("api_call_url"));
					bookmarkInfo.put("param_info",tmpBookmarkInfo.get("param_info"));
					tmpbookmarkList.put(bookmarkInfo.toString());
				}
				paramInfo.put("type", type);
				paramInfo.put("paramObj", tmpbookmarkList.toString());
			}
			else if (type.equals("userdata")) {
				String id = request.getParameter("id");
				String title = request.getParameter("title");
				
				id = Security.cleanXss(id);
				title = Security.cleanXss(title);
				id = Security.sqlInjectionCheck(id);
				id = Security.sqlInjectionCheck(id);
				title = Security.sqlInjectionCheck(title);
				
				JSONArray tmpUserDataList = new JSONArray();
				JSONObject userDataInfo = new JSONObject();
				userDataInfo.put("id", id);
				userDataInfo.put("title",title);
				tmpUserDataList.put(userDataInfo.toString());
				
				paramInfo.put("type", type);
				paramInfo.put("paramObj", tmpUserDataList.toString());
			}
			else {
				String params = request.getParameter("params");
				params = Security.cleanXss(params);
				params = Security.sqlInjectionCheck(params);
				
				JSONArray searchParamList = new JSONArray();
				JSONObject searchParamInfo = new JSONObject();
				
				Map tempMap = request.getParameterMap();
				Iterator<String> itr = tempMap.keySet().iterator();
				while(itr.hasNext()) {
					String key = itr.next();
					String data = request.getParameter(key);
					
					if (key.equals("params")) {
						String[] tempVal = data.split("=");
						
						key = tempVal[0];
						data = tempVal[1];
					}
					
//					if (key.equals("title")) {
//						data = StringUtil.encodingChange(request, data);
//					}
					searchParamInfo.put(key, data);
				}
			
				searchParamList.put(searchParamInfo.toString());
				paramInfo.put("type", type);
				paramInfo.put("paramObj", searchParamList.toString());
			}
			
			// 2020년 SGIS고도화 3차(테마코드) 시작  - bizStatsLeftMenu, bizStatsDataBoard, bizStatsHelper 에서 공통으로 사용할 변수 선언, 왼쪽메뉴 및 데이터보드를 위해서는 필수이다. (pse)
			List<Map<String, Object>> allThemeCdInfo = themeCdCommon.selectAllCensusThemeInfo();
			request.setAttribute("allThemeCdInfo", allThemeCdInfo);
			// 2020년 SGIS고도화 3차(테마코드) 끝 (pse)
			
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
			throw new ApiException(StringUtil.getErrMsg());
		} finally {
		}		
		
		return new ModelAndView("map/interactiveMap", "paramInfo", paramInfo);
	}
	
	/**
	 * 대화형 통계지도 Left 메뉴
	 * @param request
	 * @param response
	 * @return map/interactiveLeftMenu
	 */
	@RequestMapping(value="/interactiveLeftMenu")
	public ModelAndView interactiveLeftMenu(HttpServletRequest request, HttpServletResponse response) {
		SqlSession session = null;
		Map paramInfo = new HashMap();
		try {
			Map mapParameter = new HashMap();
			Map tooltipInfo = new HashMap();
			mapParameter.put("menu_class_cd", "A0");
			List tooltipList = mapService.selectTooltipInfo(mapParameter);
			
			for (int i=0; i<tooltipList.size(); i++) {
				Map map = (HashMap)tooltipList.get(i);
				String classCd = (String)map.get("menu_class_cd");
				String ttpId = (String)map.get("ttip_id");
				String exp = (String)map.get("ttip_exp");
				tooltipInfo.put(classCd + ttpId, exp);
			}
			paramInfo.put("tooltipList", tooltipInfo);
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} finally {
		}		
		return new ModelAndView("map/interactiveLeftMenu", "paramInfo", paramInfo);
	}
	
	/**
	 * 대화형 통계지도 데이터보드
	 * @param request
	 * @param response
	 * @return map/interactiveDataBoard
	 */
	@RequestMapping(value="/interactiveDataBoard")
	public ModelAndView interactiveDataBoard(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("map/interactiveDataBoard");
	}
	
	/**
	 * 공공데이터 조회 - 데이터보드
	 * @param request
	 * @param response
	 * @return map/publicDataBoard
	 */
	@RequestMapping(value="/publicDataBoard")
	public ModelAndView publicDataBoard(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("map/publicDataBoard");
	}
	
	/**
	 * 나의데이터 조회 - 데이터보드
	 * @param request
	 * @param response
	 * @return map/mydataDataBoard
	 */
	@RequestMapping(value="/mydataDataBoard")
	public ModelAndView mydataDataBoard(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("map/mydataDataBoard");
	}
	
	/**
	 * 대화형 통계지도 범례결합창
	 * @param request
	 * @param response
	 * @return map/interactiveDataBoard
	 */
	@RequestMapping(value="/interactiveCombineMap")
	public ModelAndView interactiveCombineMap(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("map/interactiveCombineMap");
	}
	
	/**
	 *갤러리 등록
	 * @param request
	 * @param response
	 * @return map/gallaryDialog
	 */
	@RequestMapping(value="/gallaryDialog")
	public ModelAndView gallaryDialog(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("common/gallaryDialog");
	}
	
}