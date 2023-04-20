package kostat.sop.ServiceAPI.api.qa.devfaqmanage;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
 * @ClassName: AddBoardFile
 * @Description：
 * 
 * @author xuliguo
 * @date：2014年11月24日 下午2:59:01
 * @version V1.0
 * 
 */
public class DevAddFAQFile extends AbsAuth<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(DevAddFAQFile.class);

	@Override
	public String getApiId() {
		return "boardmanage_addboardfile";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {
			Map resultMap = new HashMap();
			Boolean f = false;
			DiskFileItemFactory factory = new DiskFileItemFactory();
			ServletFileUpload fileUpload = new ServletFileUpload(factory);
			fileUpload.setSizeMax(20000000);
			List items = fileUpload.parseRequest(req);
			Iterator iterator = items.iterator();
			while (iterator.hasNext()) {
				FileItem file = (FileItem) iterator.next();
				if (!file.isFormField() && "FILE".equals(file.getFieldName()) && file.getSize() > 0) {
					String originName = file.getName();
					// originName = new String (originName.getBytes
					// ("iso-8859-1"), "UTF-8");
					String FILE_EXTENSION = originName.substring(originName.lastIndexOf(".") + 1);
					String FILE_NM = originName.substring(originName.lastIndexOf("\\") + 1, originName.lastIndexOf("."));
					long curTime = System.currentTimeMillis();
					String FILE_ID = FILE_NM + Long.toString(curTime);
					String FILE_CONTENT_TYPE = file.getContentType();
					// String FILE_PATH =
					// req.getSession().getServletContext().getRealPath("/upload/BOARD_001");
					ClassPathResource resource = new ClassPathResource(getPerpertyPath());
					Properties props = PropertiesLoaderUtils.loadProperties(resource);
					String FILE_PATH = props.getProperty("Globals.File.Board.Path");
					if (RequestUtil.writeFile(file, FILE_PATH, FILE_ID, FILE_EXTENSION)) {
						f = true;
						Map fileMap = new HashMap();
						fileMap.put("FILE_ID", FILE_ID);
						fileMap.put("FILE_PATH", FILE_PATH);
						fileMap.put("FILE_NM", FILE_NM);
						fileMap.put("FILE_EXTENSION", FILE_EXTENSION);
						fileMap.put("FILE_CONTENT_TYPE", FILE_CONTENT_TYPE);
						resultMap.put("FILE", fileMap);
					} else {
						throw new ApiException(Prompt.UPLOADERROR);
					}
				}
			}
			resultMap.put("success", f);
			return resultMap;
		} catch (AbsAPIException e) {
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
		return null;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return null;
	}

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "등록";
	}

}
