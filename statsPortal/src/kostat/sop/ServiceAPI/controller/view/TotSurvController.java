package kostat.sop.ServiceAPI.controller.view;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONString;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import egovframework.rte.psl.dataaccess.util.EgovMap;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.TotSurvDetailService;

/**
 * 1. 기능 : 총조사 시각화 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     2020.08.03	juKwak	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : juKwak
 * @version 1.0
 * @see
 * <p/>
 */
@Controller
@RequestMapping(value="/view/totSurv")
public class TotSurvController {

	private final Log logger = LogFactory.getLog(TotSurvController.class);
	
	@Resource(name="totSurvDetailService")
	private TotSurvDetailService totSurvDetailService;
	
	@RequestMapping(value="/apiTest")
	public ModelAndView apiTest(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("totSurv/apiTest");
	}
	/**
	 * 총조사시각화 > 프레임 > Main
	 * @param request
	 * @param response
	 * @return totSurv/totSurvMain
	 */
	@RequestMapping(value="/totSurvMain")
	public ModelAndView main(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		
		model.addAttribute("url", "population");
		//model.addAttribute("screen", screen);
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "main");
	
		return new ModelAndView("totSurv/totSurvMain");
	}
	
	/**
	 * 총조사시각화 > 프레임 > header
	 * @param request
	 * @param response
	 * @return totSurv/totSurvHeader
	 */
	@RequestMapping(value="/inMoreDetail/inMoreDetailHeader")
	public ModelAndView inMoreDetailheader(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		request.getAttribute("survGb");
	
		return new ModelAndView("totSurv/inMoreDetail/inMoreDetailHeader");
	}
	
	/**
	 * 총조사시각화 > 프레임 > header
	 * @param request
	 * @param response
	 * @return totSurv/totSurvHeader
	 */
	@RequestMapping(value="/totSurvHeader")
	public ModelAndView header(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		request.getAttribute("survGb");
	
		return new ModelAndView("totSurv/totSurvHeader");
	}
	
	/**
	 * 총조사시각화 > 경제총조사 > header
	 * @param request
	 * @param response
	 * @return totSurv/totSurvHeader
	 */
	@RequestMapping(value="/ecnmy/totSurvHeader")
	public ModelAndView ecnmyHeader(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		request.getAttribute("survGb");
	
		return new ModelAndView("totSurv/ecnmy/totSurvHeader");
	}

	@RequestMapping(value="/population/totSurvHeader")
	public ModelAndView populationHeader(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		request.getAttribute("survGb");
	
		return new ModelAndView("totSurv/population/totSurvHeader");
	}
	@RequestMapping(value="/farm/totSurvHeader")
	public ModelAndView farmHeader(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		request.getAttribute("survGb");
	
		return new ModelAndView("totSurv/farm/totSurvHeader");
	}
	@RequestMapping(value="/fishery/totSurvHeader")
	public ModelAndView fisheryHeader(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		request.getAttribute("survGb");
	
		return new ModelAndView("totSurv/fishery/totSurvHeader");
	}
	
	@RequestMapping(value="/forestry/totSurvHeader")
	public ModelAndView forestHeader(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		request.getAttribute("survGb");
	
		return new ModelAndView("totSurv/forestry/totSurvHeader");
	}
	
	/**
	 * 총조사시각화 > 프레임 > left
	 * @param request
	 * @param response
	 * @return totSurv/totSurvLeft
	 */
	@RequestMapping(value="/totSurvLeft")
	public ModelAndView leftMenu(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		request.getAttribute("survGb");
	
		return new ModelAndView("totSurv/totSurvLeft");
	}
	
	/**
	 * 총조사시각화 > 프레임 > Map
	 * @param request
	 * @param response
	 * @return totSurv/totSurvMap
	 */
	@RequestMapping(value="/totSurvMap")
	public ModelAndView totSurvMap(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("totSurv/totSurvMap");
	}
		
	/**
	 * 총조사시각화 > 대쉬보드 프레임(인구) > Main
	 * @param request
	 * @param response
	 * @return totSurv/populationDash
	 */
	@RequestMapping(value="/populationDash")
	public ModelAndView population(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		
		model.addAttribute("url", "population");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "population");
		
				
		return new ModelAndView("totSurv/population/totSurvMain");
	}
	
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(인구) > Main(지자체)
	 * @param request
	 * @param response
	 * @return totSurv/populationDash
	 */
	@RequestMapping(value="/populationDashLoc")
	public ModelAndView populationDashLoc(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		String gv_type = StringUtil.isNullToString(request.getParameter("type")); // 2020-10-29 [곽제욱] 대시보드 분기를 위한 변수 추가
		
		model.addAttribute("url", "populationloc");
		model.addAttribute("year", year);
		// 2020-10-29 [곽제욱] 대시보드 분기를 위한 로직변경 START
		if(gv_type!= null && !gv_type.equals("")) {
			model.addAttribute("type", gv_type);
		} else {			
			model.addAttribute("type", StringUtil.isNullToString("locgov"));
		}
		// 2020-10-29 [곽제욱] 대시보드 분기를 위한 로직변경 END
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "populationloc");		
				
		return new ModelAndView("totSurv/totSurvMain");
	}
		
	/**
	 * 총조사시각화 > 대쉬보드 프레임(인구) > Main(지자체)
	 * @param request
	 * @param response
	 * @return totSurv/populationDash
	 */
	@RequestMapping(value="/ecnmyDashLoc")
	public ModelAndView ecnmyDashLoc(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		String gv_type = StringUtil.isNullToString(request.getParameter("type")); // 2020-10-29 [곽제욱] 대시보드 분기를 위한 변수 추가
		
		model.addAttribute("url", "ecnmyDashLoc");
		model.addAttribute("year", year);
		// 2020-10-29 [곽제욱] 대시보드 분기를 위한 로직변경 START
		if(gv_type!= null && !gv_type.equals("")) {
			model.addAttribute("type", gv_type);
		} else {			
			model.addAttribute("type", StringUtil.isNullToString("locgov"));
		}
		// 2020-10-29 [곽제욱] 대시보드 분기를 위한 로직변경 END
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "ecnmyDashLoc");		
				
		return new ModelAndView("totSurv/ecnmy/totSurvMain");
	}
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(인구) > Main
	 * @param request
	 * @param response
	 * @return totSurv/populationDash
	 */
	@RequestMapping(value="/populationDash/main")
	public ModelAndView populationMain(HttpServletRequest request, HttpServletResponse response, ModelMap model) {		
		return new ModelAndView("totSurv/population/populationDash");
	}
	
	/**
	 * 총조사시각화 > 인구 시계열 > Main
	 * @param request
	 * @param response
	 * @return totSurv/populationDash
	 */
	@RequestMapping(value="/populationDash/tms")
	public ModelAndView populatioTms(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		return new ModelAndView("totSurv/populationTms");
	}
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(경제) > Main
	 * @param request
	 * @param response
	 * @return totSurv/houseDash
	 */
	@RequestMapping(value="/ecnmyDash/main")
	public ModelAndView ecnmyMain(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("totSurv/ecnmyDash");
	}
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(경제) > Main
	 * @param request
	 * @param response
	 * @return totSurv/ecnmyDash
	 * @throws SQLException 
	 */
	@RequestMapping(value="/ecnmyDash")
	public ModelAndView ecnmy(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws SQLException {
		//2021-08-02 [이영호] 지자체 활용 확산을 위한 맞춤형 총조사시각화 개발. START
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		
		if(request.getHeader("REFERER") != null) {
			if(request.getHeader("REFERER").indexOf("ststisticsStblDashBoardMng") != -1) {
				if(!request.getParameter("serviceKey").equals("%ED%86%B5%EA%B3%84%EC%A7%80%EB%A6%AC%EC%A0%95%EB%B3%B4%EC%84%9C%EB%B9%84%EC%8A%A4%EA%B4%80%EB%A6%AC")) {
					return new ModelAndView("redirect:" + request.getHeader("REFERER"));
				} else {
					model.addAttribute("mngMode", "Y");
				}
			}
		}
		model.addAttribute("url", "ecnmy");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "ecnmy");
	
		return new ModelAndView("totSurv/ecnmy/totSurvMain");
	}
	
	/**
	 * 총조사시각화 > 대쉬보드 > Main
	 * @param request
	 * @param response
	 * @return totSurv/ecnmyDash
	 * @throws SQLException 
	 */
	@RequestMapping(value="/getDispSrvList")
	public @ResponseBody HashMap<String, Object> getDispSrvList(HttpServletRequest request, HttpServletResponse response, ModelMap model
			, @RequestParam HashMap<String, Object> params) throws SQLException {
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<EgovMap> list = totSurvDetailService.getDispSrvList(params);		
		result.put("dispOptions", list);
		return result;
	}
	
	/**
	 * 총조사시각화 > 더보기 > Main
	 * @param request
	 * @param response
	 * @return totSurv/ecnmyDash
	 * @throws SQLException 
	 */
	@RequestMapping(value="/getDispSrvDetailList")
	public @ResponseBody HashMap<String, Object> getDispSrvDetailList(HttpServletRequest request, HttpServletResponse response, ModelMap model
			, @RequestParam HashMap<String, Object> params) throws SQLException {
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<EgovMap> list = totSurvDetailService.getDispSrvDetailList(params);		
		result.put("dispOptions", list);
		return result;
	}
	
	/**
	 * 총조사시각화 > 상세페이지 > Main
	 * @param request
	 * @param response
	 * @return totSurv/totSurvDetail
	 * @throws SQLException 
	 */
	@RequestMapping(value="/totSurvDetail/main")
	public ModelAndView totSurvDetailMain(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws SQLException {
		String totLastYear = totSurvDetailService.getTotLastYear();
		model.addAttribute("totLastYear", totLastYear);
		//return new ModelAndView("totSurv/totSurvDetail");
		return new ModelAndView("totSurv/totSurvDetail");
	}
	
	/**
	 * 총조사시각화 > 더보기 > Main 2021-10-07 [이영호]
	 * @param request
	 * @param response
	 * @return totSurv/inMoreDetail/inMoreDetail
	 * @throws SQLException 
	 */
	@RequestMapping(value="/inMoreDetail/main")
	public ModelAndView totSurvInMoreDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws SQLException {
		String totLastYear = totSurvDetailService.getTotLastYear();
		model.addAttribute("totLastYear", totLastYear);
		return new ModelAndView("totSurv/inMoreDetail/inMoreDetail");
	}
	
	/** 2020-10-07 [곽제욱] 각 대시보드 프레임 추가 START */
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(가구) > Main
	 * @param request
	 * @param response
	 * @return totSurv/houseHoldDash
	 */
	@RequestMapping(value="/houseHoldDash/main")
	public ModelAndView houseHoldDash(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		request.getAttribute("survGb");
	
		return new ModelAndView("totSurv/houseHoldDash");
	}
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(가구) > Main
	 * @param request
	 * @param response
	 * @return totSurv/populationDash
	 */
	@RequestMapping(value="/houseHoldDash")
	public ModelAndView houseHold(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		//2020-09-07 [곽제욱] 지자체 활용 확산을 위한 맞춤형 총조사시각화 개발. START
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		
		model.addAttribute("url", "houseHold");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "houseHold");
		//2020-09-07 [곽제욱] 지자체 활용 확산을 위한 맞춤형 총조사시각화 개발. END
		
				
		return new ModelAndView("totSurv/totSurvMain");
	}
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(어업) > Main
	 * @param request
	 * @param response
	 * @return totSurv/fisheryDash
	 */
	@RequestMapping(value="/fisheryDash")
	public ModelAndView fishery(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		
		model.addAttribute("url", "fishery");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "fishery");
				
		return new ModelAndView("totSurv/fishery/totSurvMain");
	}
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(어업) > Main
	 * @param request
	 * @param response
	 * @return totSurv/fisheryDash
	 */
	@RequestMapping(value="/fisheryDash/main")
	public ModelAndView fisheryDash(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		request.getAttribute("survGb");
	
		return new ModelAndView("totSurv/fisheryDash");
	}
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(주택) > Main
	 * @param request
	 * @param response
	 * @return totSurv/houseDash
	 */
	@RequestMapping(value="/houseDash/main")
	public ModelAndView houseMain(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		request.getAttribute("survGb");
	
		return new ModelAndView("totSurv/houseDash");
	}
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(주택) > Main
	 * @param request
	 * @param response
	 * @return totSurv/houseDash
	 */
	@RequestMapping(value="/houseDash")
	public ModelAndView house(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		//2020-09-07 [곽제욱] 지자체 활용 확산을 위한 맞춤형 총조사시각화 개발. START
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
	
		return new ModelAndView("totSurv/totSurvMain");
	}
	
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(농업) > Main
	 * @param request
	 * @param response
	 * @return totSurv/houseHoldDash
	 */
	@RequestMapping(value="/farmDash/main")
	public ModelAndView farmDash(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		request.getAttribute("survGb");
	
		return new ModelAndView("totSurv/farmDash");
	}
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(농업) > Main
	 * @param request
	 * @param response
	 * @return totSurv/farmDash
	 */
	@RequestMapping(value="/farmDash")
	public ModelAndView farm(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		//2020-09-07 [곽제욱] 지자체 활용 확산을 위한 맞춤형 총조사시각화 개발. START
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		
		model.addAttribute("url", "farm");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "farm");
		//2020-09-07 [곽제욱] 지자체 활용 확산을 위한 맞춤형 총조사시각화 개발. END
		
				
		return new ModelAndView("totSurv/farm/totSurvMain");
	}
	
	
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(임업) > Main
	 * @param request
	 * @param response
	 * @return totSurv/forestryDash
	 */
	@RequestMapping(value="/forestryDash/main")
	public ModelAndView forestryDash(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		request.getAttribute("survGb");
	
		return new ModelAndView("totSurv/forestryDash");
	}
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(임업) > Main
	 * @param request
	 * @param response
	 * @return totSurv/populationDash
	 */
	@RequestMapping(value="/forestryDash")
	public ModelAndView forestry(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		//2020-09-07 [곽제욱] 지자체 활용 확산을 위한 맞춤형 총조사시각화 개발. START
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		
		model.addAttribute("url", "forestry");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "forestry");
		//2020-09-07 [곽제욱] 지자체 활용 확산을 위한 맞춤형 총조사시각화 개발. END
		
		return new ModelAndView("totSurv/forestry/totSurvMain");
	}
	
	/** 2020-10-26 [주형식] SNS 이미지 가져오기 추가 START */
	/**
	 * 총조사시각화 SNS 이미지
	 * @param request
	 * @param response
	 * @return 이미지
	 * @throws IOException 
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping(value="/totSurvImage")
	public void statsMeImage(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws IOException  {
		//파라미터
		String id = StringUtil.isNullToString(request.getParameter("id"));
		
		//파라미터 확인
		if(!"".equals(id)) {
			id = id.replaceAll("\\.", "").replaceAll("/", "").replaceAll("\\\\", ""); 			//2020-11-23 [곽제욱] 시큐어코딩을 위해 id값 replace 처리 
			//파일 읽기
			String PROPERTY_PATH = "/globals.properties";
			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String file_path = props.getProperty("Globals.GalleryData.galleryViewFile.Path");
			File file = new File(file_path+"/"+id+".png");
			
			//파일 있으면 파일 리턴
			if(file.exists()) {
				BufferedImage image = ImageIO.read(file);
				ImageIO.write(image, "PNG", response.getOutputStream());
			}
			//없으면 기본 로고 리턴
			else {
				URL url = new URL("https://sgis.kostat.go.kr/images/main/logo.png");
				BufferedImage image = ImageIO.read(url);
				ImageIO.write(image, "PNG", response.getOutputStream());
			}
		}
		//파라미터 없으면 기본 로고 리턴
		else {
			URL url = new URL("https://sgis.kostat.go.kr/images/main/logo.png");
			BufferedImage image = ImageIO.read(url);
			ImageIO.write(image, "PNG", response.getOutputStream());
		}
	}
	/** 2020-10-26 [주형식] SNS 이미지 가져오기 추가 END */
	
	/** 2020-10-07 [곽제욱] 각 대시보드 프레임 추가 END */
	
	/** 2020-10-29 [곽제욱] 인구주택총조사, 농림어업총조사 카테고리별 구분 분기 START */
	/**
	 * 총조사시각화 > 대쉬보드 프레임(인구주택총조사) > Main(지자체)
	 * @param request
	 * @param response
	 * @return totSurv/populationDash
	 */
	@RequestMapping(value="/totPopulationDashLoc")
	public ModelAndView totPopulationDashLoc(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		
		model.addAttribute("url", "totPopulationloc");
		model.addAttribute("year", year);
		model.addAttribute("type", StringUtil.isNullToString("totPeopleLocgov"));
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "totPopulationloc");		
				
		return new ModelAndView("totSurv//totSurvMain");
	}
	
	/** 2020-10-29 [곽제욱] 인구주택총조사, 농림어업총조사 카테고리별 구분 분기 START */
	/**
	 * 총조사시각화 > 대쉬보드 프레임(인구주택총조사) > Main(지자체)
	 * @param request
	 * @param response
	 * @return totSurv/populationDash
	 */
	@RequestMapping(value="/totFarmDashLoc")
	public ModelAndView totFarmDashLoc(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		
		model.addAttribute("url", "totFarmloc");
		model.addAttribute("year", year);
		model.addAttribute("type", StringUtil.isNullToString("totFarmLocgov"));
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "totPopulationloc");		
				
		return new ModelAndView("totSurv/totSurvMain");
	}
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(가구) > Main(지자체)
	 * @param request
	 * @param response
	 * @return totSurv/houseHoldDashLoc
	 */
	@RequestMapping(value="/houseHoldDashLoc")
	public ModelAndView houseHoldDashLoc(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		String gv_type = StringUtil.isNullToString(request.getParameter("type"));
		
		model.addAttribute("url", "houseHoldDashLoc");
		model.addAttribute("year", year);
		if(gv_type!= null && !gv_type.equals("")) {
			model.addAttribute("type", gv_type);
		} else {			
			model.addAttribute("type", StringUtil.isNullToString("locgov"));
		}
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "houseHoldDashLoc");		
				
		return new ModelAndView("totSurv/totSurvMain");
	}
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(주택) > Main(지자체)
	 * @param request
	 * @param response
	 * @return totSurv/houseDashLoc
	 */
	@RequestMapping(value="/houseDashLoc")
	public ModelAndView houseDashLoc(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		String gv_type = StringUtil.isNullToString(request.getParameter("type")); 
		
		model.addAttribute("url", "houseDashLoc");
		model.addAttribute("year", year);
		if(gv_type!= null && !gv_type.equals("")) {
			model.addAttribute("type", gv_type);
		} else {			
			model.addAttribute("type", StringUtil.isNullToString("locgov"));
		}
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "houseDashLoc");		
				
		return new ModelAndView("totSurv/totSurvMain");
	}
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(농업) > Main(지자체)
	 * @param request
	 * @param response
	 * @return totSurv/farmDashLoc
	 */
	@RequestMapping(value="/farmDashLoc")
	public ModelAndView farmDashLoc(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		String gv_type = StringUtil.isNullToString(request.getParameter("type")); 

		
		
		model.addAttribute("url", "farmDashLoc");
		model.addAttribute("year", year);
		if(gv_type!= null && !gv_type.equals("")) {
			model.addAttribute("type", gv_type);
		} else {			
			model.addAttribute("type", StringUtil.isNullToString("locgov"));
		}  
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "farmDashLoc");		
				
		return new ModelAndView("totSurv/totSurvMain");
	}
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(임업) > Main(지자체)
	 * @param request
	 * @param response
	 * @return totSurv/forestryDashLoc
	 */
	@RequestMapping(value="/forestryDashLoc")
	public ModelAndView forestryDashLoc(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		String gv_type = StringUtil.isNullToString(request.getParameter("type")); 

		
		model.addAttribute("url", "forestryDashLoc");
		model.addAttribute("year", year);
		if(gv_type!= null && !gv_type.equals("")) {
			model.addAttribute("type", gv_type);
		} else {			
			model.addAttribute("type", StringUtil.isNullToString("locgov"));
		}  
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "forestryDashLoc");		
				
		return new ModelAndView("totSurv/forestry/totSurvMain");
	}
	
	/**
	 * 총조사시각화 > 대쉬보드 프레임(어업) > Main(지자체)
	 * @param request
	 * @param response
	 * @return totSurv/fisheryDashLoc
	 */
	@RequestMapping(value="/fisheryDashLoc")
	public ModelAndView fisheryDashLoc(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		String gv_type = StringUtil.isNullToString(request.getParameter("type")); 

		
		model.addAttribute("url", "fisheryDashLoc");
		model.addAttribute("year", year);
		if(gv_type!= null && !gv_type.equals("")) {
			model.addAttribute("type", gv_type);
		} else {			
			model.addAttribute("type", StringUtil.isNullToString("locgov"));
		}  
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "fisheryDashLoc");		
				
		return new ModelAndView("totSurv/totSurvMain");
	}
	/** 2020-10-29 [곽제욱] 인구주택총조사, 농림어업총조사 카테고리별 구분 분기 END */
	
	/** 2020-11-13 [곽제욱] 상세메뉴 url 분기 START */
	/**
	 * 총조사시각화 > 상세 프레임 > Main
	 * @param request
	 * @param response
	 * @return totSurv/populationDash
	 */
	@RequestMapping(value="/detail")
	public ModelAndView detail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		//2020-09-07 [곽제욱] 지자체 활용 확산을 위한 맞춤형 총조사시각화 개발. START
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		
		model.addAttribute("url", "detail");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "detail");
		//2020-09-07 [곽제욱] 지자체 활용 확산을 위한 맞춤형 총조사시각화 개발. END
		
				
		return new ModelAndView("totSurv/totSurvMain");
	}
	
	/**
	 * 총조사시각화 > 상세화면 개선 2021-10-07 [이영호]
	 * @param request
	 * @param response
	 * @return totSurv/populationDash
	 */
	@RequestMapping(value="/inMoreDetail")
	public ModelAndView inMoreDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		//2020-09-07 [곽제욱] 지자체 활용 확산을 위한 맞춤형 총조사시각화 개발. START
		String year = StringUtil.isNullToString(request.getParameter("year"));
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String sido_cd = StringUtil.isNullToString(request.getParameter("sido_cd"));
		String sgg_cd = StringUtil.isNullToString(request.getParameter("sgg_cd"));
		
		model.addAttribute("url", "inMoreDetail");
		model.addAttribute("year", year);
		model.addAttribute("type", type);
		model.addAttribute("sido_cd", sido_cd);
		model.addAttribute("sgg_cd", sgg_cd);
		model.addAttribute("mode", "inMoreDetail");
		//2020-09-07 [곽제욱] 지자체 활용 확산을 위한 맞춤형 총조사시각화 개발. END
		
				
		return new ModelAndView("totSurv/inMoreDetail/inMoreDetailMain");
	}
	/** 2020-11-13 [곽제욱] 상세메뉴 url 분기 END */
	
	@RequestMapping(value="/getStblInfo")
	public @ResponseBody HashMap<String, Object> getStblInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model
			, @RequestParam HashMap<String, Object> params) throws SQLException {
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<EgovMap> list = totSurvDetailService.getStblInfo(params);		
		result.put("defaultParams", list);
		return result;
	}
	
	@RequestMapping(value="/getAllStblList")
	public @ResponseBody HashMap<String, Object> getAllStblList(HttpServletRequest request, HttpServletResponse response, ModelMap model
			, @RequestParam HashMap<String, Object> params) throws SQLException {
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<EgovMap> tblIdList = totSurvDetailService.getAllTblList();
		List<EgovMap> listIdList = totSurvDetailService.getAllListIdList();
		result.put("allTblIdList", tblIdList);
		result.put("allListIdList", listIdList);
		return result;
	}
	
	@RequestMapping(value="/getTblIdFromSurvId")
	public @ResponseBody HashMap<String, Object> getTblIdFromSurvId(HttpServletRequest request, HttpServletResponse response, ModelMap model
			, @RequestParam HashMap<String, Object> params) throws SQLException {
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<EgovMap> tblId = totSurvDetailService.getTblIdFromSurvId(params);
		result.put("tblId", tblId);
		return result;
	}
	
	/**
	 * Cross Domain 해결을 위한 proxy
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping(value="/proxy")
	public void proxy(HttpServletRequest request, HttpServletResponse response, ModelMap model, @RequestParam HashMap<String, Object> paramMap) throws IOException {
		String[] allowedHosts = {
		//local
				request.getServerName()+":"+request.getServerPort(), 
				"kosis.kr",
				"link.kostat.go.kr",
				"sgis.kostat.go.kr",
				"sgisapi.kostat.go.kr",
				"localhost"
		};
		HttpURLConnection con = null;
		try {
			String reqUrl = request.getQueryString();
			String decodedUrl = "";
			if (reqUrl != null) {

			} else {
				response.setStatus(400);
				logger.error("ERROR 400: No target specified for proxy.");
			}
			reqUrl = reqUrl.replaceAll(" ", "%20");
			
			String host = "";
			host = reqUrl.split("\\/")[2];
			boolean allowed = false;
			
			for (String surl : allowedHosts) {
				if (host.equalsIgnoreCase(surl)) {
					allowed = true;
					break;
				}
			}
			
			if(allowed) {
				String[] subUrl = reqUrl.split("\\/");
				String modifyUrl = subUrl[0] + "/" + subUrl[1] + "/" + subUrl[2];
				
				for(int i=0; i<subUrl.length; i++){
					if(i>2){
						modifyUrl = modifyUrl + "/" + URLEncoder.encode(subUrl[i], "UTF-8");
					}
				}
				
				URL url = new URL(reqUrl);

				con = (HttpURLConnection)url.openConnection();
				con.setRequestMethod("POST"); // HTTP POST 메소드 설정
				con.setDoOutput(true); // POST 파라미터 전달을 위한 설정
				con.setConnectTimeout(10000);
				con.setReadTimeout(10000);
				String reqContenType = request.getContentType();
				if(reqContenType != null) {
					//con.setRequestProperty("Content-Type", reqContenType);
					con.setRequestProperty("Content-Type", "application/json");
				}
				else {
					con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
					//con.setRequestProperty("Content-Type", "application/json");
				}
				
				int clength = request.getContentLength();
				if(clength > 0) {
					con.setDoInput(true);
					byte[] idata = new byte[clength];
					request.getInputStream().read(idata, 0, clength);
					con.getOutputStream().write(idata, 0, clength);
				}

				response.setContentType(con.getContentType());
				BufferedInputStream bis = new BufferedInputStream(con.getInputStream());
				int bytesRead;
				byte[] buffer = new byte[256];
				
				while((bytesRead = bis.read(buffer)) > 0){
					response.getOutputStream().write(buffer, 0, bytesRead);
				}
				response.getOutputStream().flush();
				bis.close();
			}
			else {
				response.setStatus(502);
				logger.error("ERROR 502: This proxy does not allow you to access that location.");
			}
		} catch(Exception e) {
			System.out.println(response);
			response.setStatus(500);
			byte[] idata = new byte[5000];
			
			if(con.getErrorStream() != null) {
				con.getErrorStream().read(idata, 0, 5000);
			}
			
			logger.error("ERROR 500: An internal server error occured. " + e.getMessage() + " " + new String(idata));
		}
	}
	
	@RequestMapping(value="/research")
	public ModelAndView research(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("totSurv/research");
	}
	@RequestMapping(value="/researchPOP")
	public ModelAndView researchPop(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("totSurv/researchPOP");
	}
}
