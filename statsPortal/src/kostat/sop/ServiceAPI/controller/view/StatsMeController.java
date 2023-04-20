package kostat.sop.ServiceAPI.controller.view;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.common.security.Security;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.MapService;
import kostat.sop.ServiceAPI.controller.service.StatsMeService;

/**
 * 1. 기능 : My통계로 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     2019.08.08	김남민	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김남민
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/statsMe")
public class StatsMeController {
	
	private final Log logger = LogFactory.getLog(StatsMeController.class);
	
	@Resource(name="mapService")
	private MapService mapService;
	
	@Resource(name="statsMeService")
	private StatsMeService statsMeService;
	
	/**
	 * My통계로 Main
	 * @param request
	 * @param response
	 * @return statsMe/statsMeMain
	 * @throws SQLException 
	 * @throws JSONException 
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 * @throws Exception 
	 */
	@RequestMapping(value="/statsMeMain")
	public ModelAndView statsMeMain(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws SQLException, JSONException, JsonParseException, JsonMappingException, IOException {
		
		//mng_s 20200221 통계로가 첫페이지가 아니므로 모바일로 변경되는 부분은 필요없어서 주석처리함.
		/*
		//모바일 체크
		String userAgent = request.getHeader("User-Agent");
		String[] mobileOs = {"iPhone","iPod","BlackBerry","Android","Windows CE", "Nokia", "LG", "MOT", "SAMSUNG", "SonyEricsson", "Webos","Mobile", "Symbian", "Opera Mobi", "Opera Mini", "IEmobile"};
		String param = StringUtil.isNullToString(request.getParameter("param"));
		if(!"0".equals(param)){
			int j = -1;
			if(userAgent != null && !userAgent.equals("")){
				for(int i = 0; i < mobileOs.length; i++){
					j = userAgent.indexOf(mobileOs[i]);
					if(j > -1 ){
						return new ModelAndView("redirect:/mobile");
					}
				}
			}
		}
		*/
		
		//파라미터 불러오기
		String type = StringUtil.isNullToString(request.getParameter("type"));
		String lfe_cycle_id = StringUtil.isNullToString(request.getParameter("lfe_cycle_id"));
		String stat_dstnc_det_id = StringUtil.isNullToString(request.getParameter("stat_dstnc_det_id"));
		String stat_data_id = StringUtil.isNullToString(request.getParameter("stat_data_id"));
		String stat_data_nm = StringUtil.isNullToString(request.getParameter("stat_data_nm"));
		/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 START */
		String stat_data_srv_nm = StringUtil.isNullToString(request.getParameter("stat_data_srv_nm"));
		/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 END */
		
		//즐겨찾기 데이터 불러오기
		String bookmark_yn = "N";
		String id = StringUtil.isNullToString(request.getParameter("id"));
		if(!"".equals(id)) {
			String hist_id = id;
			hist_id = Security.cleanXss(hist_id);
			hist_id = Security.sqlInjectionCheck(hist_id);
			
			Map<String, Object> mapParameter = new HashMap<String, Object>();
			mapParameter.put("hist_id", hist_id);
			List bookmarkList = mapService.getStatistcsHistoryParamInfo(mapParameter);
			
			JSONArray tmpbookmarkList = new JSONArray();
			JSONObject bookmarkInfo;
			for (int i=0; i<bookmarkList.size(); i++) {
				Map<String, Object> tmpBookmarkInfo = (Map<String, Object>) bookmarkList.get(i);
				bookmarkInfo = new JSONObject();
				bookmarkInfo.put("hist_type",tmpBookmarkInfo.get("hist_type"));
				bookmarkInfo.put("hist_id",tmpBookmarkInfo.get("hist_id"));
				bookmarkInfo.put("hist_nm",tmpBookmarkInfo.get("hist_nm"));
				bookmarkInfo.put("map_type",tmpBookmarkInfo.get("map_type"));
				bookmarkInfo.put("seq",tmpBookmarkInfo.get("seq"));
				bookmarkInfo.put("api_call_url",tmpBookmarkInfo.get("api_call_url"));
				bookmarkInfo.put("param_info",tmpBookmarkInfo.get("param_info"));
				tmpbookmarkList.put(bookmarkInfo.toString());
				ObjectMapper mapper = new ObjectMapper();
				String param_info_string = StringUtil.isNullToString(tmpBookmarkInfo.get("param_info"));
				if(!"".equals(param_info_string)) {
					Map<String, Object> param_info = mapper.readValue(StringUtil.isNullToString(tmpBookmarkInfo.get("param_info")), new TypeReference<Map<String, Object>>(){});
					Map<String, Object> paramInfo = (Map<String, Object>) param_info.get("paramInfo");
					if(paramInfo != null) {
						stat_data_id = StringUtil.isNullToString(paramInfo.get("stat_data_id"));
						stat_data_nm = StringUtil.isNullToString(paramInfo.get("stat_data_nm"));
						/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 START */
						stat_data_srv_nm = StringUtil.isNullToString(paramInfo.get("stat_data_srv_nm"));
						/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 END */
					}
				}
			}
			bookmark_yn = "Y";
			model.addAttribute("id", id);
			model.addAttribute("stat_data_nm", stat_data_nm);
			model.addAttribute("bookmark_params", tmpbookmarkList.toString());
		}
		model.addAttribute("bookmark_yn", bookmark_yn);
		
		//파라미터 리턴
		model.addAttribute("type", type);
		model.addAttribute("lfe_cycle_id", lfe_cycle_id);
		model.addAttribute("stat_dstnc_det_id", stat_dstnc_det_id);
		model.addAttribute("stat_data_id", stat_data_id);
		model.addAttribute("stat_data_nm", stat_data_nm);
		/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 START */
		model.addAttribute("stat_data_srv_nm", stat_data_srv_nm);
		/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 END */
		return new ModelAndView("statsMe/statsMeMain");
	}
	
	/**
	 * My통계로 네비게이션
	 * @param request
	 * @param response
	 * @return statsMe/statsMeNavigation
	 */
	@RequestMapping(value="/statsMeNavigation")
	public ModelAndView statsMeNavigation(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("statsMe/statsMeNavigation");
	}
	
	/**
	 * My통계로 팝업
	 * @param request
	 * @param response
	 * @return statsMe/statsMeNavigation
	 */
	@RequestMapping(value="/statsMePopup")
	public ModelAndView statsMePopup(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("statsMe/statsMePopup");
	}
	
	/**
	 * My통계로 (생애주기)
	 * @param request
	 * @param response
	 * @return statsMe/statsMeLifeCycle
	 */
	@RequestMapping(value="/statsMeLifeCycle")
	public ModelAndView statsMeLifeCycle(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("statsMe/statsMeLifeCycle");
	}
	
	/**
	 * My통계로 (관심분야)
	 * @param request
	 * @param response
	 * @return statsMe/statsMeInterestRealm
	 */
	@RequestMapping(value="/statsMeInterestRealm")
	public ModelAndView statsMeInterestRealm(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("statsMe/statsMeInterestRealm");
	}
	
	/**
	 * My통계로 (카탈로그)
	 * @param request
	 * @param response
	 * @return statsMe/statsMeCatalog
	 */
	@RequestMapping(value="/statsMeCatalog")
	public ModelAndView statsMeCatalog(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("statsMe/statsMeCatalog");
	}
	
	/**
	 * My통계로 (지도)
	 * @param request
	 * @param response
	 * @return statsMe/statsMeCatalog
	 */
	@RequestMapping(value="/statsMeMap")
	public ModelAndView statsMeMap(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("statsMe/statsMeMap");
	}
	
	/**
	 * My통계로 (상세정보)
	 * @param request
	 * @param response
	 * @return statsMe/statsMeCatalog
	 */
	@RequestMapping(value="/statsMeDetailInfo")
	public ModelAndView statsMeDetailInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("statsMe/statsMeDetailInfo");
	}
	
	/**
	 * My통계로 SNS 이미지
	 * @param request
	 * @param response
	 * @return 이미지
	 * @throws IOException 
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping(value="/statsMeImage")
	public void statsMeImage(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws IOException  {
		//파라미터
		String id = StringUtil.isNullToString(request.getParameter("id"));
		
		//파라미터 확인
		if(!"".equals(id)) {
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
	
	/**
	 * My통계로 데이터마트 생성 (단건)
	 * @param request
	 * @param response
	 * @return jsonV
	 */
	@ResponseBody
	@RequestMapping(value="/makeSrvDtCtlgDtwrhOne", produces="text/plain;charset=UTF-8")
	public ModelAndView makeSrvDtCtlgDtwrhOne(HttpServletRequest request, ModelMap model) {
		String stat_data_id = StringUtil.isNullToString(request.getParameter("stat_data_id"));
		Map<String,Object> temp_params = new HashMap<String,Object>();
		temp_params.put("stat_data_id", stat_data_id);
		
		try {
			statsMeService.makeSrvDtCtlgDtwrhOne(temp_params);
			model.addAttribute( "success", true );
			model.addAttribute( "result", "성공" );
		} catch (Exception e) {
			model.addAttribute( "success", false );
			model.addAttribute( "result", e.getMessage() );
		}
		
		return new ModelAndView("jsonV", model);
	}
	
	// 2020.04.02[한광희] SGIS 포털 검색 시 My통계로 지도로 확인 화면으로 이동 START
	/**
	 * SGIS 포털 검색 시 My통계로 지도로 확인 화면으로 이동
	 * @param request
	 * @param response
	 * @return statsMe/statsMeMain
	 * @throws SQLException 
	 * @throws JSONException 
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 * @throws Exception 
	 */
	@RequestMapping(value="/potalSearchStatsMeMap")
	public ModelAndView potalStatsMeMap(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws SQLException, JSONException, JsonParseException, JsonMappingException, IOException {
		String stat_data_id = StringUtil.isNullToString(request.getParameter("stat_data_id"));
		String stat_data_srv_nm = StringUtil.isNullToString(request.getParameter("stat_data_srv_nm"));
		// 파라미터 리턴
		model.addAttribute("potal_search_type", "Y");
		model.addAttribute("stat_data_id", stat_data_id);
		model.addAttribute("stat_data_srv_nm", stat_data_srv_nm);
		return new ModelAndView("statsMe/statsMeMain");
	}
	// 2020.04.02[한광희] SGIS 포털 검색 시 My통계로 지도로 확인 화면으로 이동 END
}