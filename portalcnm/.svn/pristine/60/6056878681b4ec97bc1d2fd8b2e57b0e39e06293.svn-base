package kostat.sop.ServiceAPI.api.ak.uploaddata;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

/**   
 *
 * @ClassName: DownLoadFile
 * @Description： 
 *
 * @author xuliguo   
 * @date：2014年11月14日 上午9:39:16    
 * @version V1.0      
 *    
 */
public class DownLoadFile extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(DownLoadFile.class);
	
	@Override
	public String getApiId() {
		return "uploaddata_download";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}
	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		try {			
			Map paramMap = getParameterMap(req);
			Boolean f = false;
			String FILE_PATH = java.net.URLDecoder.decode(paramMap.get("FILE_PATH").toString());
			String FILE_NM_REAL = java.net.URLDecoder.decode(paramMap.get("FILE_NM_REAL").toString());
			String FILE_NM_LOGIC = java.net.URLDecoder.decode(paramMap.get("FILE_NM_LOGIC").toString());
			//String FILE_EXTENSION =paramMap.get("FILE_EXTENSION").toString();		
			//String FILE_ID = java.net.URLDecoder.decode((paramMap.get("FILE_ID").toString()));
			//String FILE_CONTENT_TYPE = paramMap.get("FILE_CONTENT_TYPE").toString();
			 InputStream inStream  = null;
			 if(FILE_NM_REAL != null && !"".equals(FILE_NM_REAL)) {
				try {
					inStream = new FileInputStream(new File(FILE_PATH,FILE_NM_LOGIC));
					res.reset();
					//res.setContentType(FILE_CONTENT_TYPE);
					res.addHeader("Content-Disposition", "attachment; filename=\"" + paramMap.get("FILE_NM_REAL").toString() + "\"");
			        byte[] b = new byte[100];
			        int len;
			        try {
			            while ((len = inStream.read(b)) > 0)
			            		res.getOutputStream().write(b, 0, len);
			            f = true;
			        } catch (IOException e) {
			        		logger.error("IO ERROE!");
						throw new ApiException("IO ERROR!");
			        } finally{
						inStream.close();		
					}
				} catch (FileNotFoundException e1) {
					logger.error("NOT FOUND FILE!");
					throw new ApiException("NOT FOUND FILE!");
				} finally{
					inStream.close();		
				}
			 }
			if(f)
				return new Success(true,"DOWNLOAD SUCCESS!");
			else 
				return new Success(false,"DOWNLOAD FAIL!");
		}   catch (AbsAPIException e) {
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
		FILE_PATH,FILE_NM_REAL,FILE_NM_LOGIC
	}
	private enum OptionParam{
		
	}
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "다운로드";
	}

}
