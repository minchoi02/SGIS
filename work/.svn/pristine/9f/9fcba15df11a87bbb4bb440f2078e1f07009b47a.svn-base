package kostat.lbdms.ServiceAPI.api;

import java.security.SecureRandom;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.security.AES128util;
import kostat.lbdms.ServiceAPI.common.security.Security;
import kostat.lbdms.ServiceAPI.controller.service.QnaService;
import kostat.lbdms.ServiceAPI.controller.service.AttachFileService;
import kostat.lbdms.ServiceAPI.exception.AuthFailedException;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * 1. 기능 : 회원 관련 컨트롤러.<p>
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
@RequestMapping(value="/api/file")
public class AttachFileAPI {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(AttachFileAPI.class);
	
	private static final String PROPERTY_PATH = "/globals.properties";

	@Resource(name="attachFileService")
	private AttachFileService attachFileService;
	
	/**
	 * 파일다운로드
	 * @param request
	 * @param response
	 * @return /view/qna/getQnaList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/download.do")
	public ModelAndView download(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String postNo = (String)request.getParameter("postNo");
			String attach = (String)request.getParameter("attach");
			String path = (String)request.getParameter("path");

			postNo = Security.cleanXss(postNo);
			attach = Security.cleanXss(attach);
			path = Security.cleanXss(path);
			

			mapParameter.put("post_no", Integer.parseInt(postNo));
			mapParameter.put("attach", attach);
			mapParameter.put("path", path);
			
			Map fileInfo = (Map)attachFileService.getAttachFile(mapParameter);
			if (fileInfo == null) {
				throw new AuthFailedException("첨부파일이 존재하지 않습니다.");
			}

			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String filePath = props.getProperty("Globals.Board.fileUpload.Path");
			filePath += path;
		
			String ext = (String)fileInfo.get("ext");
			String originFileNm = (String)fileInfo.get("file_nm");
			
			Map resultMap = new HashMap();
			Map attachParameter = new HashMap();
			attachParameter.put("file_id", "attach");
			attachParameter.put("file_nm", attach);
			attachParameter.put("origin_file_nm", originFileNm);
			attachParameter.put("file_path", filePath);
			attachParameter.put("file_extension", ext);
			resultMap.put("params", attachParameter);
			
			model.addAttribute("result", resultMap);
	        
		} 
		catch (AuthFailedException e) {
			model.put("id", "G2G90001");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			//model.put("id", "G2G90001");
			//model.put("errCd", "-1");
			//model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("download", model);
	}
}