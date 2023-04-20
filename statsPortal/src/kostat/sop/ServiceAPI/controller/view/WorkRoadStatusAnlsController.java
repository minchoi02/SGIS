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
 * 1. 기능 : 일자리 맵 > 구인 현황 분석 관련 컨트롤러.<p>
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
@RequestMapping(value="/view/workRoad/statusAnls")
public class WorkRoadStatusAnlsController {
	private final Log logger = LogFactory.getLog(WorkRoadStatusAnlsController.class);
	
	/**
	 * 일자리 맵 > 프레임 > Map
	 * @param request
	 * @param response
	 * @return workRoad/statusAnls/saMap
	 */
	@RequestMapping(value="/saMap")
	public ModelAndView saMap(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statusAnls/saMap");
	}

	/**
	 * 일자리 맵 > 프레임 > 우측 데이터보드
	 * @param request
	 * @param response
	 * @return workRoad/statusAnls/saDataboard
	 */
	@RequestMapping(value="/saDataBoard")
	public ModelAndView saDataBoard(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statusAnls/saDataBoard");
	}
	
	/**
	 * 일자리 맵 > 구인 현황 분석 > 서브메뉴
	 * @param request
	 * @param response
	 * @return workRoad/statusAnls/saSubmenu
	 */
	@RequestMapping(value="/saSubMenu")
	public ModelAndView SubMenu(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statusAnls/saSubMenu");
	}

	
	
	
	
	
	
	
	
	
	
	
	/**
	 * 일자리 맵 > 구인 현황 분석 > 샘플 레이어
	 * @param request
	 * @param response
	 * @return workRoad/statusAnls/saSampleLayer
	 */
	@RequestMapping(value="/saSampleLayer")
	public ModelAndView SampleLayer(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statusAnls/saSampleLayer");
	}	
}
