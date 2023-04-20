package kostat.sop.ServiceAPI.api.qa.reqBoard;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.qa.reqBoard.mapper.ReqBoardDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.RequestUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**   
 *
 * @ClassName: AddReqBoard
 * @Description： 
 *
 * @author jrj
 * @date：2018.01.30    
 * @version V1.0      
 *    
 */
public class AddReqBoardFile extends AbsAuth<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AddReqBoardFile.class);
	@Resource
	private ReqBoardDao reqBoardDao;
	@Override
	public String getApiId() {
		return "reqboard_addreqboard";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);
            Map resultMap = new HashMap();
			Boolean f = false;
			
			String REQ_SEQ = paramMap.get("REQ_SEQ").toString();
			
			DiskFileItemFactory factory = new DiskFileItemFactory();
			ServletFileUpload fileUpload = new ServletFileUpload(factory);
			fileUpload.setSizeMax(20000000);
			
			List items = fileUpload.parseRequest(req);
			Iterator iterator = items.iterator();
			
			while (iterator.hasNext()) {
				FileItem file = (FileItem) iterator.next();
				
				if ( !file.isFormField() && "FILE".equals( file.getFieldName() ) && file.getSize() > 0 ) {
					String originName = file.getName();
					
					String FILE_EXTN = originName.substring(originName.lastIndexOf(".") + 1);
					String FILE_NM = originName.substring(originName.lastIndexOf("\\") + 1, originName.lastIndexOf("."));
					
					long curTime = System.currentTimeMillis();
					String FILE_SAVE_NM = "reqboard_" + Long.toString(curTime);
					String FILE_CONTENT_TYPE = file.getContentType();
					
					ClassPathResource resource = new ClassPathResource(getPerpertyPath());
					Properties props = PropertiesLoaderUtils.loadProperties(resource);
//					String FILE_PATH = "D:/";
					String FILE_PATH = props.getProperty("Globals.Req.File.Path");
					
					if (RequestUtil.writeFile(file, FILE_PATH, FILE_SAVE_NM, FILE_EXTN)) {
						f = true;
						
						resultMap.put("REQ_SEQ", REQ_SEQ);
						resultMap.put("FILE_SAVE_NM", FILE_SAVE_NM);
						resultMap.put("FILE_PATH", FILE_PATH);
						resultMap.put("FILE_NM", FILE_NM);
						resultMap.put("FILE_EXTN", FILE_EXTN);
						resultMap.put("FILE_CONTENT_TYPE", FILE_CONTENT_TYPE);
						resultMap.put("REQ_PRGRS_STATS_CD", "01");
					} else {
						throw new ApiException(Prompt.UPLOADERROR);
					}
				}
			}
			
			reqBoardDao.updateFile( resultMap );
			resultMap.put("msg", Prompt.REQSUCCESS);
			resultMap.put("success", f);
			
			return resultMap;
		}  catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		}
	}
	
	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}
	
	private enum MustParam{
		REQ_SEQ
	}
	
	private enum OptionParam{
		FILE_SAVE_NM, FILE_PATH, FILE_NM, FILE_EXTN, FILE_CONTENT_TYPE
	}
	
	@Override
	public String getWorkNm() {
		return "추가";
	}
	
}
