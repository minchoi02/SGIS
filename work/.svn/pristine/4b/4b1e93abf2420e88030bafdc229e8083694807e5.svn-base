package kostat.lbdms.ServiceAPI.controller.view;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Properties;
import java.awt.image.BufferedImage;

import javax.imageio.ImageIO;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.security.AES128util;
import kostat.lbdms.ServiceAPI.common.security.Security;
import kostat.lbdms.ServiceAPI.common.util.FileUtils;
import kostat.lbdms.ServiceAPI.common.util.JSONConvertUtil;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.controller.service.AnalysisService;
import kostat.lbdms.ServiceAPI.controller.service.MyDataService;
import kostat.lbdms.ServiceAPI.controller.service.ShareBoardService;
import kostat.lbdms.ServiceAPI.exception.AuthFailedException;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;

/**
 * 1. 기능 : 공유게시판 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱 1.0, 2017/08/07  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 권차욱
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/shareBoard")
public class ShareBoardController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(ShareBoardController.class);
	private static final String PROPERTY_PATH = "/globals.properties";
	
	@Resource(name="shareBoardService")
	private ShareBoardService shareBoardService;
	
	@Resource(name="myDataService")
	private MyDataService myDataService;
	
	@Resource(name="analysisService")
	private AnalysisService analysisService;

	/**
	 * 공유게시판 메인
	 * @param request
	 * @param response
	 * @return guide/guideMain
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/shareBoardMain")
	public ModelAndView shareBoardMain(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("shareBoard/shareBoardMain");
	}
	
	
	/**
	 * 공유 데이터 상세 보기
	 * @param request
	 * @param response
	 * @return guide/guideMain
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/shareDataDetail")
	public ModelAndView shareDataDetail(HttpServletRequest request , HttpServletResponse response , ModelMap model) {
		/*String resource_id = request.getParameter("resource_id");
	    mav.addObject("resource_id", request.getParameter("resource_id"));
	    Map<String , Object> paramMap = new HashMap<String,Object>();
	    paramMap.put("resource_id", resource_id);
	    
	    Map<String, Object> info;
		try {
			info = myDataService.searchMyDataInfo(paramMap);
			String user_id = info.get("user_id").toString();
			String data_nm = info.get("data_nm").toString();
			
			if(!info.containsKey("kor_column_desc")) {
			    org.json.JSONArray jarry = myDataService.createKorColumnGridData(user_id, data_nm,resource_id);
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
			mav.addObject("resourceInfo", JSONConvertUtil.mapToJson((Map<String, Object>) resourceInfo.get("info")));
			mav.addObject("resourceList",JSONConvertUtil.ListToJSONArray((List<Map<String, Object>>) resourceInfo.get("resource")));
			mav.addObject("columnDataType", JSONConvertUtil.ListToJSONArray(columnDataType));

			
		} catch (SQLException e) {
			logger.error(e);
		} catch (JSONException e) {
			logger.error(e);
		}
	    
	    
	    
	    mav.setViewName("shareBoard/shareDetail");
	    return mav;*/
		
		
		String resourceId = (String)request.getParameter("resource_id");
		String postNo = (String)request.getParameter("no");
		String type = (String)request.getParameter("type");
		
		resourceId = Security.cleanXss(resourceId);
		postNo = Security.cleanXss(postNo);
		type = Security.cleanXss(type);
		
		if (resourceId == null) {
			return new ModelAndView("common/errorCode");
		}
		
		if (postNo == null) {
			return new ModelAndView("common/errorCode");
		}
		
		if (type == null) {
			return new ModelAndView("common/errorCode");
		}
		
		try {
			
			//분석결과 메인정보 조회
			Map mapParameter = new HashMap();
			mapParameter.put("resource_id", Long.parseLong(resourceId));
			mapParameter.put("no", Long.parseLong(postNo));
			mapParameter.put("type", type);
			
			//공유게시판 정보 조회
			Map shareBoardInfo = (Map)shareBoardService.getShareBoardDetailInfo(mapParameter);
			if (shareBoardInfo != null) {
				
				//분석데이터일 경우
				if (type.equals("analysis")) {
					
					Map analysisInfo = (Map)analysisService.getAnalysisInfo(mapParameter);
					
					if (analysisInfo == null) {
						return new ModelAndView("common/errorCode");
					}
					
					
					String posColumnDesc = (String)analysisInfo.get("pos_column_desc");
					String tmpUserId = (String)analysisInfo.get("user_id");
					
					String dataNm = (String)shareBoardInfo.get("data_nm");
					String fileNm = "";
					if (shareBoardInfo.containsKey("file_nm") && shareBoardInfo.get("file_nm") != null) fileNm = (String)shareBoardInfo.get("file_nm");
					
					shareBoardInfo.put("data_nm", dataNm);
					shareBoardInfo.put("user_id", tmpUserId);
					
					if (!fileNm.equalsIgnoreCase("")) {
						//썸네일정보 조회
						ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
						Properties props = PropertiesLoaderUtils.loadProperties(resource);
						String filePath = props.getProperty("Globals.Board.fileUpload.Path");
				
						byte[] arrReaded = FileUtils.getImageFile(request, filePath, null, "share", fileNm);
						if (arrReaded != null) {
							String imageData = "data:image/png;base64," + Base64.encodeBase64String( arrReaded );
							shareBoardInfo.put("image_data", imageData);
							
							InputStream file = new ByteArrayInputStream(arrReaded);
							BufferedImage buf = ImageIO.read(file);
					        int height = buf.getHeight();
					        int width = buf.getWidth();
					        shareBoardInfo.put("image_width", width);
					        shareBoardInfo.put("image_height", height);
						}
					}
					//분석실행정보 조회
					Map tmpParam = new HashMap();
					tmpParam.put("data_nm", dataNm);
					tmpParam.put("user_id", tmpUserId);
					Map analysisExecuteInfo = (Map)analysisService.getAnalysisExecuteInfoFromId(tmpParam);
					
					if (analysisExecuteInfo == null) {
						return new ModelAndView("common/errorCode");
					}
					
					//분석파라미터정보 조회
					String executeId = (String)analysisExecuteInfo.get("execute_id");				
					tmpParam.put("execute_id", executeId);
					Map analysisParamInfo = (Map)analysisService.getAnalysisParamInfo(tmpParam);
					
					if (analysisParamInfo == null) {
						return new ModelAndView("common/errorCode");
					}
					
					String analysisType = (String)analysisParamInfo.get("analysis_type");
					shareBoardInfo.put("analysis_type", analysisType);
					
				}
				
				JSONObject paramInfo = new JSONObject(shareBoardInfo);
				model.addAttribute("paramInfo", paramInfo.toString());
				model.addAttribute("type", type);			
				
				//조회수 증가
				shareBoardService.updateViewCnt(mapParameter);
				
			}
			
		}catch(Exception e) {
			return new ModelAndView("common/errorCode");
		}
		
		return new ModelAndView("shareBoard/shareBoardDetail");
	}
}