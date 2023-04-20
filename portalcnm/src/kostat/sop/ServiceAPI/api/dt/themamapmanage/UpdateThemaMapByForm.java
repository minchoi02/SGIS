package kostat.sop.ServiceAPI.api.dt.themamapmanage;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.dt.themamapmanage.mapper.ThemaMapManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.RequestUtil;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.common.util.ZipUtils;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: UpdateThemaMapByForm
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年11月14日 下午7:12:31    
 * @version V1.0      
 *    
 */
public class UpdateThemaMapByForm extends AbsQuery<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(UpdateThemaMapByForm.class);
	@Resource
	private ThemaMapManageDao themaMapManageDao;
	@Override
	public String getApiId() {
		return null;
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {
			Map paramMap = new HashMap();
			FileItem file = null;
			DiskFileItemFactory factory = new DiskFileItemFactory();      
	        ServletFileUpload fileUpload = new ServletFileUpload(factory);
	        fileUpload.setSizeMax(200000);
	        List items = fileUpload.parseRequest(req);
	        Iterator iterator = items.iterator();
	        while(iterator.hasNext()){
	            FileItem fileItem = (FileItem) iterator.next();
	            if(fileItem.isFormField()){
	                paramMap.put(fileItem.getFieldName(),fileItem.getString());
	            } else if("FILE".equals(fileItem.getFieldName()) && fileItem.getSize() > 0) file = fileItem;
	        }
	        if(file != null && file.getSize()>200000){
        			throw new ApiException("THE MAXSIZE OF FILE IS 20MB.");
	        }else if(file != null && file.getSize() > 0){
	        		/*
	        		 * delete the old file
	        		 */
//	        		File oldFile = new File("");
//	        		oldFile.delete();
	            	String originName = file.getName();
	    			originName = new String (originName.getBytes ("iso-8859-1"), "UTF-8"); 
	    			String FILE_EXTENSION = originName.substring(originName.lastIndexOf(".") + 1);
	    			String FILE_NM = originName.substring(0, originName.lastIndexOf("."));
	    			String FILE_PATH = req.getSession().getServletContext().getRealPath("/upload/themamap");
	    			ClassPathResource resource = new ClassPathResource(getPerpertyPath());
				Properties props = PropertiesLoaderUtils.loadProperties(resource);
//				String FILE_PATH = props.getProperty("Globals.File.themaMap.Path");
	    			if(RequestUtil.writeFile(file, FILE_PATH,FILE_NM,FILE_EXTENSION)){
	    				try {
		    					File upFile = new File(FILE_PATH,FILE_NM+ "." + FILE_EXTENSION);
	    						ZipUtils.decompress(upFile);
	    						String upFilePath = upFile.getAbsolutePath();
	    						String scanPath = upFilePath.substring(originName.lastIndexOf("\\")+1,upFilePath.lastIndexOf("."));
	    						String scanPathResult = RequestUtil.getHtmlName(scanPath);
	    				        paramMap.put("STAT_THEMA_MAP_FILE_URL",scanPathResult.substring(scanPath.indexOf(FILE_PATH),scanPathResult.length()));
	    						upFile.delete();
						} catch (FileNotFoundException e) {
							throw new ApiException("파일이 없습니다.");
						} catch (IOException e) {
							throw new ApiException("IOException");
						}catch (Exception e) {
							throw new ApiException("UNZIP FAIL!");
						}
	    			}else
	    				throw new ApiException("UPLOAD FAIL!");
	        }
	        themaMapManageDao.updateThemaMapt(paramMap);
	        return new Success(true,"UPDATE SUCCESS!");
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
		return null;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return null;
	}
}
