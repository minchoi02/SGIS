
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
 * 1. 기능 : 일자리 맵 > 일자리 통계 분석 관련 컨트롤러.<p>
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
@RequestMapping(value="/view/workRoad/statsAnls")
public class WorkRoadStatsAnlsController {
	private final Log logger = LogFactory.getLog(WorkRoadStatsAnlsController.class);
	
	/**
	 * 일자리 맵 > 프레임 > Map
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaMap
	 */
	@RequestMapping(value="/ssaMap")
	public ModelAndView ssaMap(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaMap");
	}

	/**
	 * 일자리 맵 > 프레임 > 우측 데이터보드
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaDataboard
	 */
	@RequestMapping(value="/ssaDataBoard")
	public ModelAndView ssaDataBoard(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaDataBoard");
	}
	
	/**
	 * 일자리 맵 > 일자리 통계 분석 > 서브메뉴
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaSubmenu
	 */
	@RequestMapping(value="/ssaSubMenu")
	public ModelAndView SubMenu(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaSubMenu");
	}
	
	/**
	 * 일자리 맵 > 일자리 통계 분석 > 일자리 현황 > 주요지표
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaJobStatus
	 */
	@RequestMapping(value="/ssaJobStatus")
	public ModelAndView JobStatus(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaJobStatus");
	}

	/**
	 * 일자리 맵 > 일자리 통계 분석 > 일자리 현황 > 조회 조건 팝업
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaSearchPopup
	 */
	@RequestMapping(value="/ssaSearchPopup")
	public ModelAndView SearchPopup(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaSearchPopup");
	}
	
	/**
	 * 일자리 맵 > 일자리 통계 분석 > 일자리 현황 > 상세 팝업
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaDetailPopup
	 */
	@RequestMapping(value="/ssaDetailPopup")
	public ModelAndView DetailPopup(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaDetailPopup");
	}
	
	/**
	 * 일자리 맵 > 일자리 통계 분석 > 일자리 증감 > 주요지표
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaJobGrowth
	 */
	@RequestMapping(value="/ssaJobGrowth")
	public ModelAndView JobGrowth(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaJobGrowth");
	}
	
	/**
	 * 일자리 맵 > 일자리 통계 분석 > 일자리 증감 > 상세지표
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaJobGrowth
	 */
	@RequestMapping(value="/ssaJobGrowthDetailPopup")
	public ModelAndView ssaJobGrowthDetailPopup(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaJobGrowthDetailPopup");
	}

	/**
	 * 일자리 맵 > 일자리 통계 분석 > 일자리 질 > 주요지표
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaJobQuality
	 */
	@RequestMapping(value="/ssaJobQuality")
	public ModelAndView JobQuality(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaJobQuality");
	}
	
	/**
	 * 일자리 맵 > 일자리 통계 분석 > 일자리 질 > 주요지표
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaJobQuality
	 */
	@RequestMapping(value="/ssaJobQualityDetailPopup")
	public ModelAndView JobQualityDetailPopup(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaJobQualityDetailPopup");
	}

	/**
	 * 일자리 맵 > 일자리 통계 분석 > 경제상황 > 주요지표
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaEconomicSituation
	 */
	@RequestMapping(value="/ssaEconomicSituation")
	public ModelAndView EconomicSituation(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaEconomicSituation");
	}
	
	/**
	 * 일자리 맵 > 일자리 통계 분석 > 경제상황 > 상세지표
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaJobGrowth
	 */
	@RequestMapping(value="/ssaEconomicSituationDetailPopup")
	public ModelAndView ssaEconomicSituationDetailPopup(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaEconomicSituationDetailPopup");
	}

	/**
	 * 일자리 맵 > 일자리 통계 분석 > 삶의 질 > 주요지표
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaLifeQuality
	 */
	@RequestMapping(value="/ssaLifeQuality")
	public ModelAndView LifeQuality(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaLifeQuality");
	}
	
	/**
	 * 일자리 맵 > 일자리 통계 분석 > 삶의 질 > 상세지표
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaLifeQuality
	 */
	@RequestMapping(value="/ssaLifeQualityDetailPopup")
	public ModelAndView LifeQualityDetailPopup(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaLifeQualityDetailPopup");
	}
	
	/**
	 * 일자리 맵 > 일자리 통계 분석  > 서브 레이어
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaSub
	 */
	@RequestMapping(value="/ssaSub")
	public ModelAndView Sub(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaSub");
	}
	
	
	
	
	
	
	
	
	

	/**
	 * 일자리 맵 > 일자리 통계 분석 > 샘플 레이어
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaSampleLayer
	 */
	@RequestMapping(value="/ssaSampleLayer")
	public ModelAndView SampleLayer(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaSampleLayer");
	}
	
	// 2019-05-16 [한광희] 일자리 통계분석 > 용어 설명 팝업 호출 기능 개선 추가. START
	/**
	 * 일자리 맵 > 일자리 통계분석  > 주요지표 용어 설명 팝업 호출
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaDetailInfoPopup
	 */
	@RequestMapping(value="/ssaDetailInfoPopup")
	public ModelAndView ssaDetailInfoPopup(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaDetailInfoPopup");
	}
	// 2019-05-16 [한광희] 일자리 통계분석 > 용어 설명 팝업 호출 기능 개선추가. END
	
	// 2019-05-30 [한광희] 일자리 통계분석 > 일자리 현황 > 조회 버튼 클릭시 조회 조건 팝업 호출 추가. START
	/**
	 * 일자리 맵 > 일자리 통계분석 > 일자리 현황 > 조회 버튼 클릭시 조회 조건 팝업 호출
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaJobStatusSearchPopup
	 */
	@RequestMapping(value="/ssaJobStatusSearchPopup")
	public ModelAndView ssaJobStatusSearchPopup(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaJobStatusSearchPopup");
	}
	// 2019-05-30 [한광희] 일자리 통계분석 > 일자리 현황 > 조회 버튼 클릭시 조회 조건 팝업 호출 추가. END
	// 2020-05-15 [곽제욱] 일자리 통계분석 > 일자리 증감 > 조회 버튼 클릭시 조회 조건 팝업 호출 추가. START
	/**
	 * 일자리 맵 > 일자리 통계분석 > 일자리 증감 > 조회 버튼 클릭시 조회 조건 팝업 호출
	 * @param request
	 * @param response
	 * @return workRoad/statsAnls/ssaJobStatusSearchPopup
	 */
	@RequestMapping(value="/ssaJobGrowthSearchPopup")
	public ModelAndView ssaJobGrowthSearchPopup(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("workRoad/statsAnls/ssaJobGrowthSearchPopup");
	}
	// 2020-05-15 [곽제욱] 일자리 통계분석 > 일자리 증감 > 조회 버튼 클릭시 조회 조건 팝업 호출 추가. END
}
