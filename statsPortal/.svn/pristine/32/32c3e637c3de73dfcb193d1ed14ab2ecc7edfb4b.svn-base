package kostat.sop.ServiceAPI.api.board;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.security.Security;
import kostat.sop.ServiceAPI.common.util.CaptchaServiceSingleton;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

public class BoardQnARegistForm extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(BoardQnARegistForm.class);
	private static final String PROPERTY_PATH = "/globals.properties";
	private FileOutputStream fos;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "8017";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.ALL;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}
	
	enum MustParam
	{	
		board_cd,
		post_depth,
		post_order,
		post_title,
		post_content,
		priority_disp_yn
	}
	
	enum OptionParam
	{
		post_title_en,
		low_rank_s_class_cd,
		parent_post_id,
		file_yn,
		secret_yn
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map resultData = new HashMap();
		Boolean isResponseCorrect = false;
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			String captchaId = httpSession.getId();
			
			
			String hostName = InetAddress.getLocalHost().getHostName();
			if("sgis_dev".equals(hostName) || "mangWASZ".equals(hostName)) {
				isResponseCorrect = true; //개발서버
			} else {
				//isResponseCorrect = CaptchaServiceSingleton.getInstance().validateResponseForID(captchaId, response); //운영
			}
			
				String regMemberId = (String)httpSession.getAttribute("member_id");
				if(regMemberId == null) {
					regMemberId = "guest";
				}
				
				Map tempMap = new HashMap();
				tempMap.put("board_cd", "MQNA_999");
				
				Integer postNo = (Integer) session.selectOne("board.getTopPostNumber", tempMap);
				if(postNo == null) {
					postNo = 0;
				}
//				++postNo;
				String fileYn = (String) mapParameter.get(OptionParam.file_yn.name());
				if(fileYn != null && fileYn.equals("Y")) {
					MultipartHttpServletRequest multiReq = (MultipartHttpServletRequest) req;
					MultipartFile multiFile;
					
					multiFile = multiReq.getFile("file");
					if(multiFile == null) {
						multiFile = multiReq.getFile("thema_file");
					}
					
					if(multiFile != null) {	
						String originName = multiFile.getOriginalFilename();
						System.out.println(originName);
						// 2016.12.02 시큐어코딩 삭제
						String fileExtension = originName.substring(originName.lastIndexOf(".") + 1);
						String fileName = originName.substring(0, originName.lastIndexOf("."));
						
						//20171121 시큐어코딩
						if( fileName != null && !"".equals(fileName)){
							fileName = fileName.replace("/", "");
							//fileName = fileName.replace("\\", "");
							fileName = fileName.replace(".", "");
							fileName = fileName.replace("&", "");
							fileName = fileName.replace("%2e", "");
							fileName = fileName.replace("%2f", "");
						}
						
						System.out.println("[boardQnARegistForm.java] fileName [" + fileName);
						
						
						long fileSize = multiFile.getSize();
						int count = 0;
						String strTemp = fileExtension.toLowerCase();
						if("sgis_dev".equals(hostName) || "mangWASZ".equals(hostName)) { //개발
							if(fileSize > 1943718400) { //개발
								throw new ApiException("첨부파일 제한 용량은 20MB 입니다.");
							} else {
								for(String extd : getAllowExtension()) {
									if(strTemp.equalsIgnoreCase(extd)) {
										count++;
										break;
									}
								}
							}
						} else { //운영
							if(fileSize > 22020096) { //운영
								throw new ApiException("첨부파일 제한 용량은 20MB 입니다.");
							} else {
								for(String extd : getAllowExtension()) {
									
									if(strTemp.equalsIgnoreCase(extd)) {
										count++;
										break;
									}
								}
							}
						}
						
						
						ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
						Properties props = PropertiesLoaderUtils.loadProperties(resource);
						String filePath = props.getProperty("Globals.Board.File.Path");
						//String filePath = "C:\\files"; 
//						String filePath = "/upload/board/";
						filePath += "MQNA_999"/*(String) mapParameter.get(MustParam.board_cd.name())*/;
						
						long curTime = System.currentTimeMillis();
						String fileId = fileName + "_" + Long.toString(curTime);
						String fileContentType = multiFile.getContentType();
						
						if (logger.isDebugEnabled()) {
							logger.debug("Name          : [ " + multiFile.getName() + " ]");
							logger.debug("Original Name : [ " + multiFile.getOriginalFilename() + " ]");
							logger.debug("Extension     : [ " + originName.substring(originName.lastIndexOf(".") + 1) + " ]");
							logger.debug("Content-Type  : [ " + multiFile.getContentType() + " ]");
							logger.debug("Size          : [ " + multiFile.getSize() + " ]");
						} else {
							logger.info("Name          : [ " + multiFile.getName() + " ]");
							logger.info("Original Name : [ " + multiFile.getOriginalFilename() + " ]");
							logger.info("Extension     : [ " + originName.substring(originName.lastIndexOf(".") + 1) + " ]");
							logger.info("Content-Type  : [ " + multiFile.getContentType() + " ]");
							logger.info("Size          : [ " + multiFile.getSize() + " ]");
							logger.info("ParamMap      : [ " + req.getParameterMap() + " ]");
						}
						
						fileExtension = strTemp;
						if(writeFile(multiFile, filePath, fileId, fileExtension)) {
							Map tempParam = new HashMap();
							tempParam.put("board_cd", "MQNA_999");
							tempParam.put("post_no", postNo);
							tempParam.put("file_id", fileId);
							tempParam.put("file_path", filePath.replaceAll("/DATA/docs/statsPotal", ""));
							tempParam.put("file_nm", fileName);
							tempParam.put("file_extension", fileExtension);
							tempParam.put("file_content_type", fileContentType);
							
							session.insert("board.boardQnARegistFile", tempParam);
						} else {
							throw new ApiException("파일 업로드에 실패 하였습니다.");
						}
					}				
					
				mapParameter.put("board_cd", "MQNA_999");
				mapParameter.put("post_no", postNo);
				mapParameter.put("reg_member_id", regMemberId);
				
				Integer depth = Integer.parseInt((String) mapParameter.get(MustParam.post_depth.name()));
				Integer order = Integer.parseInt((String) mapParameter.get(MustParam.post_order.name()));
				
				mapParameter.put(MustParam.post_depth.name(), depth);
				mapParameter.put(MustParam.post_order.name(), order);
				
				String boardTitle = "";
				boardTitle = mapParameter.get(MustParam.post_title.name()).toString();
				boardTitle = Security.cleanXss(boardTitle);
				mapParameter.put(MustParam.post_title.name(), boardTitle);
				
				String boardContent = "";
				boardContent = mapParameter.get(MustParam.post_content.name()).toString();
				boardContent = Security.cleanXss(boardContent);
				mapParameter.put(MustParam.post_content.name(), boardContent);
				
				//session.insert("board.boardRegist", mapParameter);
			}
		
			logger.info("END Query - TXID[" + getApiId() + "] ");
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		return resultData;
	}

	private void decodeParams(Map mapParameter) {
		Set<String> keySet = mapParameter.keySet();
		Iterator<String> itr = keySet.iterator();
		
		while(itr.hasNext()) {
			String key = itr.next();
			String value = (String) mapParameter.get(key);
			
			try {
				mapParameter.put(key, URLDecoder.decode(value, "UTF-8"));
			} catch (UnsupportedEncodingException e) {
				logger.error(e);
				throw new ApiException(StringUtil.getErrMsg());
			}
		}
	}
	
	private Boolean writeFile(MultipartFile file, String path, String fileName, String extension){
		File f = new File(path);
		if(!f.exists()) {
			// 2016.12.02 시큐어코딩
			f.setExecutable(false, true);
			f.setReadable(true);
			f.setWritable(false, true);
			
			f.mkdirs();
		}
		
		Boolean returnValue = false;
		try {
			
			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String slash = props.getProperty("Globals.Board.File.Path.slash");
			
			byte fileData[] = file.getBytes();
			fos = new FileOutputStream(path + slash + fileName + "." + extension);
			fos.write(fileData);
			
			returnValue = true;
		} catch(FileNotFoundException e){
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} catch(IOException e){
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}catch(Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		} finally {
			if(fos != null) {
				try{
					fos.close();
				} catch(IOException e){
					logger.error(e);
					throw new ApiException(StringUtil.getErrMsg());
				}

			}
		}
		
		return returnValue;
	}
}
