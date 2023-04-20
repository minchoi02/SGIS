package kostat.sop.ServiceAPI.controller.view;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;

/**
 * 1. 기능 : 일자리 맵 > 오늘의 구인 현황 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     2018.09.01	ywKim	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 :
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/workRoad/todayStatus")
public class WorkRoadTodayStatusController {
	private final Log logger = LogFactory.getLog(WorkRoadTodayStatusController.class);
	
	/**
	 * 일자리 맵 > 프레임 > Map
	 * @param request
	 * @param response
	 * @return workRoad/todayStatus/tsMap
	 */
	@RequestMapping(value="/tsMap")
	public ModelAndView tsMap(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/todayStatus/tsMap");
	}

	/**
	 * 일자리 맵 > 프레임 > 우측 데이터보드
	 * @param request
	 * @param response
	 * @return workRoad/todayStatus/tsDataboard
	 */
	@RequestMapping(value="/tsDataBoard")
	public ModelAndView tsDataBoard(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/todayStatus/tsDataBoard");
	}
	
	/**
	 * 일자리 맵 > 오늘의 구인 현황  > 메인 레이어
	 * @param request
	 * @param response
	 * @return workRoad/todayStatus/tsMain
	 */
	@RequestMapping(value="/tsMain")
	public ModelAndView Main(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/todayStatus/tsMain");
	}

	/**
	 * 일자리 맵 > 오늘의 구인 현황  > 서브 레이어
	 * @param request
	 * @param response
	 * @return workRoad/todayStatus/tsSub
	 */
	@RequestMapping(value="/tsSub")
	public ModelAndView Sub(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/todayStatus/tsSub");
	}

	
	
	
	
	
	
	
	
	/**
	 * 일자리 맵 > 오늘의 구인 현황 > 샘플 레이어 
	 * @param request
	 * @param response
	 * @return workRoad/todayStatus/tsSampleLayer
	 */
	@RequestMapping(value="/tsSampleLayer")
	public ModelAndView SampleLayer(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/todayStatus/tsSampleLayer");
	}

}
