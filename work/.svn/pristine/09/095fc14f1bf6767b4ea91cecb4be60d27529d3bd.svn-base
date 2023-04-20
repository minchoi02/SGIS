package kostat.lbdms.ServiceAPI.view;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.servlet.view.AbstractView;

import com.neighborsystem.durian.restapi.api.CommonTag;

import kostat.lbdms.ServiceAPI.common.util.StringUtil;
import kostat.lbdms.ServiceAPI.exception.ApiException;

public class DownloadView extends AbstractView {
	private static final String PROPERTY_PATH = "/globals.properties";
	
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, 
			HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException, IOException  {
		//		setContentType("applicaiton/download;charset=utf-8");

		Map result = model;
		File file = null;

		Map<String, Object> mapResult = (Map<String, Object>) result.get(CommonTag.result.name());
		mapResult = (Map<String, Object>) mapResult.get("params");

		String fileId = (String) mapResult.get("file_id");
		String fileName = (String) mapResult.get("file_nm");
		String filePath = (String) mapResult.get("file_path");
		String fileExtension = (String) mapResult.get("file_extension");
		String fileContenType = (String) mapResult.get("file_content_type");
		

		logger.debug("fileId :: " + fileId);
		logger.debug("fileName :: " + fileName);
		logger.debug("filePath :: " + filePath); 
		logger.debug("fileExtension :: " + fileExtension);

		if(fileId.equals("tempUserForm")) {
			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			filePath = props.getProperty("Globals.Map.File.Path");
			
			file = new File(filePath + "userDataForm.xlsx");

			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			response.setContentLength((int)file.length());

			response.setHeader("Content-Disposition", "attachment;filename=\"userDataForm.xlsx\";");
			response.setHeader("Content-Transfer-Encoding", "binary");

			OutputStream out = response.getOutputStream();
			FileInputStream fis = null;
			
			try {
				fis = new FileInputStream(file);
				FileCopyUtils.copy(fis, out);
				out.flush();
			} catch (FileNotFoundException e) {
				logger.error(e);
				throw new ApiException(StringUtil.getErrMsg());
			} catch(IOException e) {
				logger.error(e);
				throw new ApiException(StringUtil.getErrMsg());
			} finally {
				if (fis != null) { 
					try { 
						fis.close(); 
					} catch (IOException e) {
						// 2015-12-03 시큐어코딩
						logger.error(e);
						
						if(fis != null) {
							fis = null;
						}
					}
				}
				
				if (out != null) { 
					try { 
						out.close(); 
					} catch (IOException e) {
						// 2015-12-03 시큐어코딩
						logger.error(e);
						out = null;
					}
				}
				
				if(file != null) {
					file = null;
				}
				
				if(result != null) {
					result.clear();
					result = null;
				}
			}
		} 
		else if (fileId.equals("attach")) {
			String originFileNm = (String) mapResult.get("origin_file_nm");
			fileName = filePath + "/" + fileName + "." + fileExtension;
			file = new File(fileName);
			
			setContentType("application/download; utf-8");
			response.setContentLength((int)file.length());
			
			String userAgent = request.getHeader("User-Agent");   
	        boolean ie = userAgent.indexOf("MSIE") > -1;
  
	        if(ie){
	        	originFileNm = URLEncoder.encode(originFileNm, "utf-8");                
	        } else { 
	        	originFileNm = URLEncoder.encode(originFileNm, "utf-8");  // 190220 qna 첨부파일 오류 수정
	        	//originFileNm = new String(originFileNm.getBytes("utf-8"));
	        }
	  
	        response.setHeader("Content-Disposition", "attachment; filename=\"" + originFileNm + "\";");
	        response.setHeader("Content-Transfer-Encoding", "binary");
	         
	        OutputStream out = response.getOutputStream();
	        FileInputStream fis = null;

	        try {
	            fis = new FileInputStream(file);
	            FileCopyUtils.copy(fis, out);  
	        } catch(Exception e){
	            e.printStackTrace();
	        }finally{
	            if(fis != null){
	                try{
	                    fis.close();
	                }catch(Exception e){}
	            }
	        }
	        out.flush();
		}
	}
}

