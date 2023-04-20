package kostat.sop.ServiceAPI.api.dt.themamapmanage;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Prompt;
import kostat.sop.ServiceAPI.common.util.RequestUtil;
import kostat.sop.ServiceAPI.common.util.Security;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.common.util.ZipUtils;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 
 * @ClassName: AddThemaMapFile
 * @Description：
 * 
 * @author xuliguo
 * @date：2014年11月24日 下午4:18:55
 * @version V1.0
 * 
 */
public class AddThemaMapFile extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(AddThemaMapFile.class);

	@Override
	public String getApiId() {
		return "themamapmanage_addfile";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "파일등록";
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {
			Success success = new Success(false, Prompt.UPLOADSUCCESS);
			DiskFileItemFactory factory = new DiskFileItemFactory();
			ServletFileUpload fileUpload = new ServletFileUpload(factory);
			fileUpload.setSizeMax(20000000);
			List items = fileUpload.parseRequest(req);
			Iterator iterator = items.iterator();
			FileItem fileItem = null;
			while (iterator.hasNext()) {
				FileItem item = (FileItem) iterator.next();
				if (item.isFormField() && "STAT_THEMA_MAP_FILE_URL".equals(item.getFieldName())) {
					String STAT_THEMA_MAP_FILE_URL = item.getString();
					ClassPathResource resource = new ClassPathResource(getPerpertyPath());
					Properties props = PropertiesLoaderUtils.loadProperties(resource);
					String FILE_PATH = props.getProperty("Globals.File.themaMap.Path");
					String tempPath = FILE_PATH
							+ STAT_THEMA_MAP_FILE_URL.substring(STAT_THEMA_MAP_FILE_URL.lastIndexOf("/other") + 6, STAT_THEMA_MAP_FILE_URL.length());					
					String deletePath = tempPath.substring(0, tempPath.lastIndexOf("/"));
					logger.info("deletePath: "+ deletePath);
					RequestUtil.deleteDirectory(deletePath);
				}
				if (!item.isFormField() && "FILE".equals(item.getFieldName()) && item.getSize() > 0) {
					fileItem = item;
					// String FILE_PATH =
					// req.getSession().getServletContext().getRealPath("/upload/themamap/html/thematicMap/other");
					// originName = new String (originName.getBytes
					// ("iso-8859-1"), "UTF-8");
				}
			}
			if (fileItem != null) {
				String originName = fileItem.getName();
				String FILE_EXTENSION = originName.substring(originName.lastIndexOf(".") + 1);
				String FILE_NM = originName.substring(originName.lastIndexOf("\"") + 1, originName.lastIndexOf("."));
				ClassPathResource resource = new ClassPathResource(getPerpertyPath());
				Properties props = PropertiesLoaderUtils.loadProperties(resource);
				String FILE_PATH = props.getProperty("Globals.File.themaMap.Path");
				logger.debug("file.. = "+fileItem+"//"+FILE_PATH+"//"+FILE_NM+"//"+FILE_EXTENSION);
				if (RequestUtil.writeFile(fileItem, FILE_PATH, FILE_NM, FILE_EXTENSION)) {
					try {
						//시큐어코딩(2016-12-05) 경로조작 및 자원삽입
						if(FILE_PATH != null && !"".equals(FILE_PATH)) {
							FILE_PATH = Security.cleanXss(FILE_PATH); //외부 입력값 필터링 
						}
						if(FILE_NM != null && !"".equals(FILE_NM)) {
							FILE_NM = Security.cleanXss(FILE_NM); //외부 입력값 필터링 
						}
						if(FILE_EXTENSION != null && !"".equals(FILE_EXTENSION)) {
							FILE_EXTENSION = Security.cleanXss(FILE_EXTENSION); //외부 입력값 필터링 
						}
						File upFile = new File(FILE_PATH, FILE_NM + "." + FILE_EXTENSION);
						ZipUtils.decompress(upFile);
						String upFilePath = upFile.getAbsolutePath();
						String scanPath = upFilePath.substring(0, upFilePath.lastIndexOf("."));
						String scanPathResult = RequestUtil.getHtmlName(scanPath);
						logger.info("scanPath : " + scanPath);
						logger.info("scanPathResult : " + scanPathResult);
						//window
//						success.setMsg(scanPathResult.substring(scanPath.lastIndexOf("\\html"),scanPathResult.length()));
						//linux		
						logger.debug("0");
						success.setMsg(scanPathResult.substring(scanPath.lastIndexOf("/html"),scanPathResult.length()));
						logger.debug("1");
						upFile.delete();
						logger.debug("2");
						success.setSuccess(true);
						logger.debug("3");
					} catch (IOException e) {
						success.setMsg("IO ERROR!");
					} catch (Exception e) {
						logger.info(e);
						success.setMsg(Prompt.ZIPERROR);
					}
				} else
					success.setMsg(Prompt.UPLOADERROR);
			}
			return success;
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
	public static void main(String[] args) {
		String url="/DATA/docs/statsPotal/html/thematicMap/other/culureTest";
		
	}

}
