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

import kostat.lbdms.ServiceAPI.common.util.FileUtils;
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
 * 1. 기능 : Q&A 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱 1.0, 2018/07/03  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 권차욱
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/api/use/qna")
public class QnaAPI {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(QnaAPI.class);
	
	private static final String PROPERTY_PATH = "/globals.properties";
	
	@Resource(name="qnaService")
	private QnaService qnaService;
	
	@Resource(name="attachFileService")
	private AttachFileService attachFileService;
	
	/**
	 * Q&A 조회
	 * @param request
	 * @param response
	 * @return /view/qna/getQnaList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getQnaList.do")
	public ModelAndView getQnaList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String startIdx = (String)request.getParameter("startIdx");
			String resultCnt = (String)request.getParameter("resultCnt");
			String sort = (String)request.getParameter("sort");
			String order = (String)request.getParameter("order");
			String type = (String)request.getParameter("type");
			String searchText = (String)request.getParameter("searchText");
			
			startIdx = Security.cleanXss(startIdx);
			resultCnt = Security.cleanXss(resultCnt);
			sort = Security.cleanXss(sort);
			order = Security.cleanXss(order);
			type = Security.cleanXss(type);
			searchText = Security.cleanXss(searchText);
			
			//시작 인덱스
			if (startIdx == null) {
				startIdx = "0";
			}
			
			//한페이지당 결과 수
			if (resultCnt == null) {
				resultCnt = "5";
			}
			
			//정렬 칼럼
			if (sort != null) {
				mapParameter.put("sort", sort);
			}
			
			//정렬 방법
			if (order != null) {
				mapParameter.put("order", order);
			}
			
			//검색어
			if (type != null) {
				mapParameter.put("type", type);
				mapParameter.put("searchText", searchText);
				mapParameter.put("searchTitle", searchText);
			}
			
			mapParameter.put("startIdx", Integer.parseInt(startIdx));
			mapParameter.put("resultCnt", Integer.parseInt(resultCnt));
			
			List qnaList = (List)qnaService.getQnaList(mapParameter);
			
			model.put("id", "G2G13001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", qnaList);
			
		} catch (Exception e) {
			model.put("id", "G2G13001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * Q&A 상세정보 조회
	 * @param request
	 * @param response
	 * @return /view/qna/getQnaDetailInfo.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getQnaDetailInfo.do")
	public ModelAndView getQnaDetailInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String postNo = (String)request.getParameter("postNo");
			postNo = Security.cleanXss(postNo);
			
			if (postNo == null) {
				throw new AuthorityException ("게시물정보가 정확하지 않습니다.");
			}
			
			mapParameter.put("post_no", Long.parseLong(postNo));
			
			//조회수 업데이트 
			qnaService.updateViewCnt(mapParameter);
			
			//상세정보 조회
			Map faqDetailInfo = (Map)qnaService.getQnaDetailInfo(mapParameter);
			List fileList = (List)qnaService.getFileList(mapParameter);
			
			if (fileList.size() > 0) {
				faqDetailInfo.put("fileList", fileList);
			}
			
			HttpSession session = request.getSession();
			String user_id = (String) session.getAttribute("user_id");
			
			if (user_id == null) {
				faqDetailInfo.put("isMyData", "N");
			}else {
				if (user_id.equals((String)faqDetailInfo.get("user_id"))) {
					faqDetailInfo.put("isMyData", "Y");
				}else {
					faqDetailInfo.put("isMyData", "N");
				}
			}

			model.put("id", "G2G13002");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", faqDetailInfo);
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G13002");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G13002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * Q&A 등록
	 * @param request
	 * @param response
	 * @return /view/qna/insertQnaInfo.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="insertQnaInfo.do")
	public ModelAndView insertQnaInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		HttpSession session = request.getSession();
		Map mapParameter = new HashMap();
		
		try {
			
			String user_id = (String)session.getAttribute("user_id");
			if (user_id == null) {
				throw new AuthorityException ("세션정보가 만료되었습니다.");
			}
			
			String title = (String)request.getParameter("title");
			String content = (String)request.getParameter("content");
			
			title = Security.cleanXss(title);
			content = Security.cleanXss(content);
			
			//aes 복호화
			AES128util aes = new AES128util(AES128util.KEY_SIZE, AES128util.ITERATION_COUNT);
			title = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, title);
			content = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, content);

			mapParameter.put("user_id", user_id);
			mapParameter.put("title", title);
			mapParameter.put("content", content);
			
			MultipartHttpServletRequest multiReq = (MultipartHttpServletRequest) request;
			MultipartFile multiFile = multiReq.getFile("searchTextFile");

			if(multiFile != null) {
				String originName = multiFile.getOriginalFilename();
				
				//시큐어코딩 삭제
				String fileExtension = originName.substring(originName.lastIndexOf(".") + 1);
				String fileName = originName.substring(0, originName.lastIndexOf("."));
				
				if( fileName != null && !"".equals(fileName)){
					fileName = fileName.replace("/", "");
					fileName = fileName.replace(".", "");
					fileName = fileName.replace("&", "");
					fileName = fileName.replace("%2e", "");
					fileName = fileName.replace("%2f", "");
				}
					
				long fileSize = multiFile.getSize();
				int count = 0;
				
				//확장자 체크
				String[] ExtList = {"png","jpg","jpeg", "bmp", "gif","tif","tiff","zip","alz","7z","hwp","hwt","doc","docx","ppt","pptx","pdf","xls","xlsx", "csv"};
				for(String extd : ExtList) {
					if(fileExtension.equals(extd)) {
						count++;
						break;
					}
				}
				if (count == 0) {
					throw new AuthFailedException("허용되지 않는 확장자입니다.");
				}
				
				//파일용량 체크(3MB)
				if(fileSize > 3145728) {
					throw new AuthFailedException("첨부파일 제한 용량은 20MB 입니다.");
				}
				
				
				ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
				Properties props = PropertiesLoaderUtils.loadProperties(resource);
				String filePath = props.getProperty("Globals.Board.fileUpload.Path");
				filePath += "qna";
				
				// time + random number
				String fileId = FileUtils.getDateNum() + FileUtils.randomNum();
				
				//게시글 저장
				Map qnaInfo = (Map)qnaService.insertQnaInfo(mapParameter);
				if (qnaInfo != null) {
					long postNo = (long)qnaInfo.get("post_no");
					
					//파일 업로드
					if(FileUtils.writeFile(multiFile, filePath, fileId, fileExtension)) {
						Map attachParameter = new HashMap();
						attachParameter.put("post_no", postNo);
						attachParameter.put("user_id", user_id);
						attachParameter.put("attach", fileId);
						attachParameter.put("file_nm", originName);
						attachParameter.put("path", "qna");
						attachParameter.put("ext", fileExtension);
						attachParameter.put("file_size", fileSize);
						
						attachFileService.insertAttachFile(attachParameter);
						
					} else {
						throw new AuthFailedException("파일 업로드에 실패 하였습니다.");
					}
				}
			}else {
				//게시글 저장
				qnaService.insertQnaInfo(mapParameter);
			}
			
		
			model.put("id", "G2G13003");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G13003");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G13003");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * Q&A 수정
	 * @param request
	 * @param response
	 * @return /view/qna/updateQnaInfo.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="updateQnaInfo.do")
	public ModelAndView updateQnaInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		HttpSession session = request.getSession();
		Map mapParameter = new HashMap();
		
		try {
			
			String user_id = (String)session.getAttribute("user_id");
			if (user_id == null) {
				throw new AuthorityException ("세션정보가 만료되었습니다.");
			}
			
			String title = (String)request.getParameter("title");
			String content = (String)request.getParameter("content");
			String postNo = (String)request.getParameter("postNo");
			String attach = (String)request.getParameter("attach");
			
			title = Security.cleanXss(title);
			content = Security.cleanXss(content);
			postNo = Security.cleanXss(postNo);
			
			if (attach != null) {
				attach = Security.cleanXss(attach);
			}
			
			//aes 복호화
			AES128util aes = new AES128util(AES128util.KEY_SIZE, AES128util.ITERATION_COUNT);
			title = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, title);
			content = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, content);
			
			if (attach != null) {
				attach = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, attach);
			}

			mapParameter.put("user_id", user_id);
			mapParameter.put("title", title);
			mapParameter.put("content", content);
			mapParameter.put("post_no", Long.parseLong(postNo));
			
			if (attach != null) {
				mapParameter.put("attach", attach);
			}
			
			mapParameter.put("path", "qna");
			
			MultipartHttpServletRequest multiReq = (MultipartHttpServletRequest) request;
			MultipartFile multiFile = multiReq.getFile("searchTextFile");

			if(multiFile != null) {
				String originName = multiFile.getOriginalFilename();
				
				//시큐어코딩 삭제
				String fileExtension = originName.substring(originName.lastIndexOf(".") + 1);
				String fileName = originName.substring(0, originName.lastIndexOf("."));
				
				if( fileName != null && !"".equals(fileName)){
					fileName = fileName.replace("/", "");
					fileName = fileName.replace(".", "");
					fileName = fileName.replace("&", "");
					fileName = fileName.replace("%2e", "");
					fileName = fileName.replace("%2f", "");
				}
					
				long fileSize = multiFile.getSize();
				int count = 0;
				
				//확장자 체크
				String[] ExtList = {"png","jpg","jpeg", "bmp", "gif","tif","tiff","zip","alz","7z","hwp","hwt","doc","docx","ppt","pptx","pdf","xls","xlsx", "csv"};
				for(String extd : ExtList) {
					if(fileExtension.equals(extd)) {
						count++;
						break;
					}
				}
				if (count == 0) {
					throw new AuthFailedException("허용되지 않는 확장자입니다.");
				}
				
				//파일용량 체크(3MB)
				if(fileSize > 3145728) {
					throw new AuthFailedException("첨부파일 제한 용량은 20MB 입니다.");
				}
				
				
				ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
				Properties props = PropertiesLoaderUtils.loadProperties(resource);
				String filePath = props.getProperty("Globals.Board.fileUpload.Path");
				filePath += "qna";
				
				// time + random number
				String fileId = FileUtils.getDateNum()+FileUtils.randomNum();
				
				//게시글 저장
				int qnaInfo = (int)qnaService.updateQnaInfo(mapParameter);
				if (qnaInfo > 0) {
					//파일 업로드
					if(FileUtils.writeFile(multiFile, filePath, fileId, fileExtension)) {
						Map attachParameter = new HashMap();
						attachParameter.put("post_no", Long.parseLong(postNo));
						attachParameter.put("user_id", user_id);
						attachParameter.put("attach", fileId);
						attachParameter.put("file_nm", originName);
						attachParameter.put("path", "qna");
						attachParameter.put("ext", fileExtension);
						attachParameter.put("file_size", fileSize);
						
						if (attach != null) {
							attachFileService.deleteAttachFile(attachParameter);
						}
						attachFileService.insertAttachFile(attachParameter);
						
					} else {
						throw new AuthFailedException("파일 업로드에 실패 하였습니다.");
					}
				}
			}else {
				//게시글 저장
				if (attach != null) {
					attachFileService.deleteAttachFile(mapParameter);
				}
				qnaService.updateQnaInfo(mapParameter);
			}
			
		
			model.put("id", "G2G13004");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G13004");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G13004");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	/**
	 * Q&A 삭제
	 * @param request
	 * @param response
	 * @return /view/qna/deleteQnaInfo.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="deleteQnaInfo.do")
	public ModelAndView deleteQnaInfo(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		HttpSession session = request.getSession();
		Map mapParameter = new HashMap();
		
		try {
			
			String user_id = (String)session.getAttribute("user_id");
			if (user_id == null) {
				throw new AuthorityException ("세션정보가 만료되었습니다.");
			}
			
			String postNo = (String)request.getParameter("postNo");
			String attach = (String)request.getParameter("attach");
			
			postNo = Security.cleanXss(postNo);
			
			if (attach != null) {
				attach = Security.cleanXss(attach);
			}
			
			//aes 복호화
			if (attach != null) {
				AES128util aes = new AES128util(AES128util.KEY_SIZE, AES128util.ITERATION_COUNT);
				attach = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, attach);
			}

			mapParameter.put("user_id", user_id);
			mapParameter.put("post_no", Long.parseLong(postNo));
			mapParameter.put("path", "qna");
			
			if (attach != null) {
				mapParameter.put("attach", attach);
			}
			
			//게시글 저장
			if (attach != null) {
				attachFileService.deleteAttachFile(mapParameter);
			}
			qnaService.deleteQnaInfo(mapParameter);
			
			model.put("id", "G2G13005");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			
		}
		catch (AuthFailedException e) {
			model.put("id", "G2G13005");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G13005");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	
	
	
	
	
	
	
	
	

}