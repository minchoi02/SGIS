package kostat.sop.ServiceAPI.controller.view;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.AdministStatsDetailService;

/**
 * 1. 기능 : 행정통계 시각화 관련 컨트롤러.
 * <p>
 * 2. 처리개요 :
 * <p>
 * 3. 주의사항 :
 * <p>
 *
 * <pre>
 *  <b>History:</b>
 *     2021.08.17	hjh	초기 작성
 * </pre>
 *
 * @author 최종 수정자 : hjh
 * @version 1.0
 * @see
 *      <p/>
 */
@Controller
@RequestMapping(value = "/view/administStatsDetail")
public class AdministStatsDetailController {

	private final Log logger = LogFactory.getLog(AdministStatsDetailController.class);

	@Resource(name="administStatsDetailService")
	private AdministStatsDetailService administStatsDetailService;
	
	/**
	 * 행정통계시각화 > 프레임 > header
	 *
	 * @param request
	 * @param response
	 * @return administStats/administStatsHeader
	 */
	@RequestMapping(value = "/administStatsHeader")
	public ModelAndView header(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		request.getAttribute("survGb");
		return new ModelAndView("administStatsDetail/administStatsHeader");
	}

	/**
	 * 행정통계시각화 > 프레임 > left
	 *
	 * @param request
	 * @param response
	 * @return administStats/administStatsLeft
	 */
	@RequestMapping(value = "/administStatsLeft")
	public ModelAndView leftMenu(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		request.getAttribute("survGb");
		return new ModelAndView("administStatsDetail/administStatsLeft");
	}

	
	/**
	 * 행정통계시각화 > 대쉬보드 프레임(주택소유) > Main
	 * @param request
	 * @param response
	 * @return administStats/houseDash
	 */
	@RequestMapping(value="/houseDash")
	public ModelAndView house(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));

		model.addAttribute("url", "house");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "house");
		model.addAttribute("checkmenu", "bubu");
		
		return new ModelAndView("administStatsDetail/administStatsMain");
	}

	@RequestMapping(value="/bubu")
	public ModelAndView bubu(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));

		model.addAttribute("url", "house");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "house");
		model.addAttribute("checkmenu", "bubu");
		
		return new ModelAndView("administStatsDetail/administStatsMain");
	}
	
	/**
	 * 행정통계시각화 자세히 보는 통계 > 프레임(신혼부부) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/newlyDash
	 */
	@RequestMapping(value = "/newlyDash")
	public ModelAndView newly(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));

		model.addAttribute("url", "newly");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("mode", "newly");

		return new ModelAndView("administStats/administStatsMain");
	}
	
	@RequestMapping(value="/jutak")
	public ModelAndView jutak(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));

		model.addAttribute("url", "house");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "house");
		model.addAttribute("checkmenu", "jutak");
		
		return new ModelAndView("administStatsDetail/administStatsMain");
	}
	
	@RequestMapping(value="/jungjan")
	public ModelAndView jungjan(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));

		model.addAttribute("url", "house");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "house");
		model.addAttribute("checkmenu", "jungjan");
		
		return new ModelAndView("administStatsDetail/administStatsMain");
	}
	
	@RequestMapping(value="/kinong")
	public ModelAndView kinong(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		
		model.addAttribute("url", "house");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "house");
		model.addAttribute("checkmenu", "kinong");
		
		return new ModelAndView("administStatsDetail/administStatsMain");
	}
	
	
	/**
	 * 행정통계시각화 > 대쉬보드 프레임(신혼부부) > Main
	 * @param request
	 * @param response
	 * @return administStats/newlyDash
	 */
	@RequestMapping(value="/houseDash/main")
	public ModelAndView houseMain(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("administStatsDetail/houseDash");
	}

	/**
	 * 행정통계시각화 > 대쉬보드 프레임(일자리) > Main
	 * @param request
	 * @param response
	 * @return administStatsDetail/more1DashDetail
	 */
	@RequestMapping(value="/moreDash/main")
	public ModelAndView moreMain(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("administStatsDetail/more1DashDetail");
	}
	
	@RequestMapping(value="/more2Dash/main")
	public ModelAndView moreMain2(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("administStatsDetail/more2DashDetail");
	}
	
	@RequestMapping(value="/more3Dash/main")
	public ModelAndView moreMain3(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("administStatsDetail/more3DashDetail");
	}
	
	/**
	 * 행정통계시각화 > 대쉬보드 프레임(중장년) > Main
	 *
	 * @param request
	 * @param response
	 * @return administStats/middlDash
	 */
	@RequestMapping(value = "/middlDash")
	public ModelAndView middl(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));

		model.addAttribute("url", "middl");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "middl");

		return new ModelAndView("administStatsDetail/administStatsMain");
	}

	/**
	 * 행정통계시각화 > 대쉬보드 프레임(중장년) > Main
	 *
	 * @param request
	 * @param response
	 * @return administStats/middlDash
	 */
	@RequestMapping(value = "/middlDash/main")
	public ModelAndView middlMain(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("administStatsDetail/middlDash");
	}
	
	@RequestMapping(value="/getStatsItemList")
	public @ResponseBody HashMap<String, Object> getStatsItemList(HttpServletRequest request, HttpServletResponse response, ModelMap model
			, @RequestParam HashMap<String, Object> params) throws SQLException{
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<EgovMap> list = administStatsDetailService.getStatsItemList(params);
		result.put("list",list);
		return result;
	}
	
	@RequestMapping(value="/getChartsInfo")
	public @ResponseBody HashMap<String, Object> getChartsInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model
			, @RequestParam HashMap<String, Object> params) throws SQLException{
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<EgovMap> list = administStatsDetailService.getChartsInfo(params);
		result.put("list",list);
		return result;
	}
	
	/**
	 * 행정통계시각화 대쉬보드 > 프레임(통계더보기_일자리) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/more1Dash
	 */
	@RequestMapping(value = "/more1Dash")
	public ModelAndView more1Dash(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));

		model.addAttribute("url", "more1");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("mode", "more1");
		model.addAttribute("checkmenu", "more1");

		return new ModelAndView("administStatsDetail/administStatsMain");
	}
	/**
	 * 행정통계시각화 대쉬보드 > 프레임(통계더보기_퇴직연금) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/more2Dash
	 */
	@RequestMapping(value = "/more2Dash")
	public ModelAndView more2(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));

		model.addAttribute("url", "more2");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("mode", "more2");
		model.addAttribute("checkmenu", "more2");

		return new ModelAndView("administStatsDetail/administStatsMain");
	}
		/**
	 * 행정통계시각화 대쉬보드 > 프레임(통계더보기_임근근로 일자리 동향) > Main
	 *
	 * @param request
	 * @param response
	 * @return /view/administStats/more3Dash
	 */
	@RequestMapping(value = "/more3Dash")
	public ModelAndView more3(HttpServletRequest request, HttpServletResponse response, ModelMap model) {

		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));

		model.addAttribute("url", "more3");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("mode", "more3");
		model.addAttribute("checkmenu", "more3");

		return new ModelAndView("administStatsDetail/administStatsMain");
	}
}